import { PUPPETS, type RoomEntry } from './cast.js'
import { PuppetPlayer } from './player.js'
import { type Mat, mul, translate, scale } from './rig.js'

/**
 * The room behind the table screen: its backdrop, the puppets in their chairs
 * and Death in the middle, the room's table across their waists, and their
 * hands on the felt. One canvas under the table's DOM, which keeps the whole
 * game (plates, cards, chips, buttons) on top of it.
 *
 * Laid out in the room's DESIGN space (1600x900, 16:9), its bottom on the
 * screen's bottom. A wide screen shows more of the room at the sides, a
 * narrow one more above; a short one (a phone held sideways under the table's
 * bar) may lose up to `crop` design px of ceiling off the top first, so the
 * figures stay big enough to read.
 *
 * Back to front, as art-tools/mock_screen.py stacks it:
 *   backdrop; every puppet; the table; each puppet again above its OWN table
 *   line (where the rim curves up above it, near the table's ends, the strip
 *   between stays the puppet's); then the parts that rest on the table, again,
 *   only below the rim -- so forearms run under the rail onto the felt and a
 *   hand lifted above it is in front.
 *
 * Pure presentation. It only ever hears what the screen already shows (an
 * action, a line, the words of a tell) and draws with Math.random, never the
 * game's RNG.
 */

/** How much a clip matters: an idle gives way to anything; nothing cuts a tell or an action short. */
/** Seconds a figure takes to fade from the table once out (and its last clip, if any, is done). */
const FADE = 0.8

export const PRIO = { idle: 0, tell: 1, act: 2 } as const
export type Prio = (typeof PRIO)[keyof typeof PRIO]

/**
 * In a sequence (Stage.cue), a pause in which the figure holds perfectly still
 * (a line that says they do not move): no clip, no blink, no sway.
 */
export const STILL = '@still'
/** A clip named with this after it plays briskly: its held pose held only a moment (PuppetPlayer.play). */
export const BRISKLY = '~'
const bare = (n: string) => (n.endsWith(BRISKLY) ? n.slice(0, -1) : n)
const STILL_SECS = 2.2
/** The room's lights failing and coming up again (the Station's turn), and a fire sinking to embers (s). */
const LIGHTS = { dark: 0.12, hold: 0.95, up: 1.5 }
const EMBERS = 2.8

/** A clip that had to wait for another is dropped if it is this stale by then (ms). */
const STALE = 2500
/** ... and a gesture to read (a tell, an idle, a fidget: `keep`), this stale: it plays after the one before it. */
const KEEP = 6000
export const DEALER = -1

type Actor = {
  id: string
  player: PuppetPlayer
  x: number
  scale: number
  flip: boolean
  /** The table line, in design px: the rim at the seat's centre, plus its sink. */
  line: number
  current: { name: string; prio: Prio } | null
  pending: Cued | null
  /** The rest of a sequence being played, in order. */
  after: string[]
  afterPrio: Prio
  /** Busy holding still until this time (stage clock, s): a STILL in a sequence. */
  waitUntil: number
  /** Frozen until this time: no blink, no glance, no sway (Face.frozen), and no fidget starts. */
  stillUntil: number
  /** Out of the table: drawn until the clip it left on is over, then faded out (the owner: a line, then gone). */
  leaving: boolean
  /** 1 seated; falls to 0 once they have left and their last clip is over. */
  fade: number
}

export type SeatSpot = {
  /** Centre, in CSS px from the canvas's top left. */
  x: number
  /** The table line. */
  line: number
  /** The top of the head (a hat included), for speech. */
  head: number
  /** Which side of the table, as the player sees it. */
  side: 'l' | 'r' | 'c'
}

export type Geometry = {
  /** CSS px per design px. */
  k: number
  seats: Map<number, SeatSpot>
  deck: { x: number; y: number }
}

type Img = HTMLImageElement
type Cued = { names: string[]; prio: Prio; at: number; keep: boolean }

function image(src: string): Promise<Img> {
  return new Promise((ok, fail) => {
    const im = new Image()
    im.onload = () => ok(im)
    im.onerror = () => fail(new Error(`room image not found: ${src}`))
    im.src = src
  })
}

export class Stage {
  private actors = new Map<number, Actor>()
  private ctx: CanvasRenderingContext2D
  private raf = 0
  private last = 0
  private alive = true
  private backdrop: Img | null = null
  /** The room after its turn (the Station's amber light), if it has one. */
  private backdropAfter: Img | null = null
  private table: Img | null = null
  private pieces = new Map<string, Img>()
  private loading = new Map<string, Promise<PuppetPlayer>>()
  private early = new Map<number, Cued>()
  /** Which presence piece stands in the room: before the late champion, after, or none. */
  private presence: 'before' | 'after' | null = null
  /** The presence before its last change, and when that change was seen happening (live; -Infinity on a resume). */
  private wasPresence: 'before' | 'after' | null = null
  private turnAt = -Infinity
  /** Each loop spot's frame and when it next changes (s). */
  private flicker: { frame: number; next: number }[][] = []
  /** Each loop spot guttering until this time (s): a lamp dimming beside a tell. */
  private gutters: number[][] = []
  private clock = 0
  private rimPath: Path2D
  /** Each seat's chair, [centre x, scale, sink], seat 1 first. */
  private chairs: [number, number, number][]
  /** Clips play at this rate (the presentation clock's pace); the face and idles never change speed. */
  speed = 1
  /** Reduce motion: no sway or breath. */
  still = false
  /** The player's colour (web/puppet/accent.ts), for the figure that is them: set before load. */
  accent: string | undefined
  /**
   * Where the player is seen, [centre x, scale, sink], and as whom: the room's
   * own (the finale's `you`), or a heads-up sitting's (table.ts); null where
   * the player is not drawn. Set before load.
   */
  youAt: [number, number, number] | null
  youAs: string
  onReady: (() => void) | null = null
  /** What each frame costs (update + draw, ms), for measuring (the IK prototype's test page). */
  readonly stats = { frames: 0, total: 0, max: 0 }

  constructor(readonly canvas: HTMLCanvasElement, readonly room: RoomEntry, readonly seatCount: number, chairs?: number[]) {
    this.ctx = canvas.getContext('2d')!
    this.chairs = Stage.chairsFor(room, seatCount, chairs)!
    this.youAt = room.data.you ?? null
    this.youAs = room.data.youAs ?? 'stranger'
    const r = room.data.rim
    const p = new Path2D()
    const xs = r.y.map((_, i) => r.x0 + i * r.step)
    p.moveTo(xs[0], 5000)
    r.y.forEach((y, i) => p.lineTo(xs[i], y ?? 5000))
    p.lineTo(xs[xs.length - 1], 5000)
    p.closePath()
    this.rimPath = p
  }

  /** Whether this room has chairs for this many opponents (or for these chairs of its own: see chairsFor). */
  static fits(room: RoomEntry, seatCount: number, chairs?: number[]): boolean {
    return !!Stage.chairsFor(room, seatCount, chairs)
  }

  /**
   * Where each seat sits: the room's own spots for this many opponents, or,
   * given `chairs` (an open table: the chairs the player put them in), those
   * of its full set of chairs, the rest left empty. A count the room has no
   * spots for sits in its first chairs. null if they do not fit.
   */
  static chairsFor(room: RoomEntry, seatCount: number, chairs?: number[]): [number, number, number][] | null {
    const s = room.data.seats
    if (!chairs && s[String(seatCount)]) return s[String(seatCount)]
    const all = Object.values(s).reduce((a, b) => (b.length > a.length ? b : a), [])
    const at = chairs ?? [...Array(seatCount).keys()]
    return at.length === seatCount && new Set(at).size === at.length && at.every((i) => all[i]) ? at.map((i) => all[i]) : null
  }

  /**
   * Load the room and whoever is seated. Index 0 is the player, who has no
   * figure except where they are seen (`youAt`: the finale, a heads-up table).
   */
  async load(seatIds: (string | null)[]): Promise<void> {
    const base = this.room.base
    const [bd, tb] = await Promise.all([image(base + this.room.data.backdrop.img), image(base + this.room.data.table.img)])
    this.backdrop = bd
    this.table = tb
    if (this.room.data.backdropAfter) this.backdropAfter = await image(base + this.room.data.backdropAfter)
    await Promise.all(Object.entries(this.room.data.pieces ?? {}).map(async ([name, p]) => {
      this.pieces.set(name, await image(base + p.img))
    }))
    this.flicker = (this.room.data.loops ?? []).map((l) => l.spots.map(() => ({ frame: 0, next: 0 })))
    this.gutters = (this.room.data.loops ?? []).map((l) => l.spots.map(() => 0))
    const d = this.room.data
    await Promise.all([
      this.seat(DEALER, d.dealerId ?? 'death'),
      this.youAt ? this.seat(0, this.youAs) : null,
      ...seatIds.map((id, i) => (i > 0 && id ? this.seat(i, this.figure(id)) : null)),
    ])
    if (!this.alive) return
    this.last = performance.now()
    this.raf = requestAnimationFrame((t) => this.frame(t))
    this.onReady?.()
  }

  /** Who someone is drawn as in this room (the finale: Death as a player, not the dealer). */
  figure(id: string): string {
    return this.room.data.cast?.[id] ?? id
  }

  /** Someone who will sit down later (a late champion): their images load now, so they appear the moment they do. */
  preload(id: string): void {
    const entry = PUPPETS[id]
    if (entry && !this.loading.has(id)) this.loading.set(id, PuppetPlayer.load(entry, true, undefined, this.accent))
  }

  /** Put someone in a chair (null empties it). Someone with no puppet leaves it empty. */
  async seat(seat: number, id: string | null): Promise<void> {
    this.actors.delete(seat)
    const entry = id ? PUPPETS[id] : undefined
    if (!id || !entry) return
    const ready = this.loading.get(id)
    this.loading.delete(id)
    const player = await (ready ?? PuppetPlayer.load(entry, true, undefined, this.accent))
    if (!this.alive) return
    player.face.still = this.still
    const d = this.room.data
    const [x, sc, sink] = seat === DEALER ? d.dealer : seat === 0 ? this.youAt! : this.chairs[seat - 1]
    const [w] = this.room.data.design
    this.actors.set(seat, {
      id, player, x, scale: sc, flip: x > w / 2 + 1, line: this.rimAt(x) + sink,
      current: null, pending: null, after: [], afterPrio: PRIO.act, waitUntil: 0, stillUntil: 0, leaving: false, fade: 1,
    })
    // a clip asked for before the figure was loaded (an arrival's entrance)
    const early = this.early.get(seat)
    this.early.delete(seat)
    if (early && performance.now() - early.at < STALE * 2) this.cue(seat, early.names, early.prio, early.keep)
  }

  /**
   * The room's story piece: 'before' the late champion comes, 'after', or
   * none (an open table). `live`: the change is happening now, in front of
   * the player, so the room plays its turn (room.json `turn`: the Station's
   * lights failing, Transylvania's fire sinking); otherwise (a resume, the
   * first draw) the room is simply as it is by then.
   */
  setPresence(state: 'before' | 'after' | null, live = false): void {
    if (state === this.presence) return
    this.wasPresence = this.presence
    this.presence = state
    this.turnAt = live ? this.clock : -Infinity
  }

  /**
   * Everyone holds perfectly still for a while (a line that says nobody at
   * the table moves), but those in `except`: no blink, no sway, no fidget.
   */
  freeze(secs: number, except: number[] = []): void {
    for (const [seat, a] of this.actors) if (!except.includes(seat)) a.stillUntil = Math.max(a.stillUntil, this.clock + secs)
  }

  /** Who is drawn in a chair (null: nobody, or someone with no puppet). */
  idAt(seat: number): string | null {
    return this.actors.get(seat)?.id ?? null
  }

  has(seat: number): boolean {
    return this.actors.has(seat)
  }

  /** The figure in a chair (the IK test page seeks its clips). */
  player(seat: number) {
    return this.actors.get(seat)?.player ?? null
  }

  /** The figure in a chair, for its face (speech). */
  face(seat: number) {
    return this.actors.get(seat)?.player.face ?? null
  }

  /**
   * Play a clip on someone. An idle never interrupts anything and is dropped
   * if they are busy; anything else cuts an idle short, or waits for the clip
   * playing to end (one waiting at most: the newest).
   *
   * A held gesture (a clip with a hold: a tell, an idle, a fidget) is never
   * cut short, whatever its priority: if only the noise were ever cut off by
   * the next action, the ones played through would be the tells (rule 2).
   * `keep` marks a gesture: it waits longer, and nothing that is not a
   * gesture takes its place in the queue.
   */
  cue(seat: number, clip: string | string[], prio: Prio, keep = false): boolean {
    const a = this.actors.get(seat)
    const asked = Array.isArray(clip) ? clip : [clip]
    if (!a && prio !== PRIO.idle) {                        // still loading: played when they sit down
      this.early.set(seat, { names: asked, prio, at: performance.now(), keep })
      return false
    }
    if (!a || a.leaving) return false
    // a sequence plays what this figure has of it (`clip` may be several, in order: see `after`)
    const names = asked.filter((n) => n === STILL || a.player.has(bare(n)))
    if (!names.length) return false
    // holding still, a figure starts no fidget of its own
    if (prio === PRIO.idle && this.clock < a.stillUntil) return false
    const busy = this.isBusy(a) || a.after.length > 0
    if (busy && prio === PRIO.idle) return false
    if (busy && (!a.current || a.current.prio !== PRIO.idle || a.player.holds(a.current.name) || a.after.length)) {
      if (a.pending?.keep && !keep) return false
      a.pending = { names, prio, at: performance.now(), keep }
      return true
    }
    a.pending = null
    this.begin(a, names, prio)
    return true
  }

  busy(seat: number): boolean {
    const a = this.actors.get(seat)
    return !!a && this.isBusy(a)
  }

  private isBusy(a: Actor): boolean {
    return (a.current !== null && a.player.timeOf(a.current.name) >= 0) || this.clock < a.waitUntil
  }

  /**
   * They have left the table: finish what they are doing, play `clips` (their
   * way out, in order), then the chair is empty.
   */
  leave(seat: number, clips: string[] = []): void {
    const a = this.actors.get(seat)
    if (!a) return
    a.pending = null
    const names = clips.filter((n) => n === STILL || a.player.has(bare(n)))
    if (names.length && (this.isBusy(a) || a.after.length)) a.after.push(...names)
    else if (names.length) this.begin(a, names, PRIO.act)
    a.leaving = true
  }

  /** Start a sequence: its first clip now, the rest as each one ends. */
  private begin(a: Actor, names: string[], prio: Prio) {
    a.after = names.slice(1)
    a.afterPrio = prio
    this.next(a, names[0], prio)
  }

  private next(a: Actor, name: string, prio: Prio) {
    if (name !== STILL) return this.start(a, name, prio)
    a.player.stop()
    a.current = null
    a.waitUntil = this.clock + STILL_SECS / (this.speed || 1)
    a.stillUntil = Math.max(a.stillUntil, a.waitUntil)
  }

  private start(a: Actor, named: string, prio: Prio) {
    const clip = bare(named)
    a.player.stop()
    a.player.speed = this.speed
    a.player.play(clip, false, clip !== named)
    a.current = { name: clip, prio }
    const anim = PUPPETS[a.id]?.anim
    if (anim?.gutter?.includes(clip)) this.gutter(a.x, a.player.duration(clip) / (this.speed || 1))
  }

  /** The lamp nearest a chair (the room's first loop: its flames) gutters for a while. */
  private gutter(x: number, secs: number) {
    const spots = this.room.data.loops?.[0]?.spots
    if (!spots?.length || secs <= 0) return
    const line = this.rimAt(x)
    let best = 0
    spots.forEach(([sx, bottom], j) => {
      const [bx, bb] = spots[best]
      if (Math.abs(sx - x) + Math.abs(bottom - line) / 2 < Math.abs(bx - x) + Math.abs(bb - line) / 2) best = j
    })
    this.gutters[0][best] = this.clock + secs
  }

  setStill(still: boolean) {
    this.still = still
    for (const a of this.actors.values()) a.player.face.still = still
  }

  // ------------------------------------------------------------ layout

  /**
   * Design px to the canvas's CSS px: [k, ox, oy]. A screen taller than the
   * room spends the extra on more table first (the felt the game is played
   * on), and only then on the room above.
   */
  private fit(): [number, number, number] {
    const d = this.room.data
    const [w, h] = d.design
    const cw = this.canvas.clientWidth, ch = this.canvas.clientHeight
    const k = Math.min(cw / w, ch / (h - d.crop))
    const extra = ch / k - h
    const below = Math.max(0, Math.min(extra, d.table.y + d.table.h - h))
    return [k, (cw - w * k) / 2, (extra - below) * k]
  }

  /** The top of the table's far rim at design x (beyond the table, far below). */
  rimAt(x: number): number {
    const r = this.room.data.rim
    const i = (x - r.x0) / r.step
    const i0 = Math.floor(i)
    const a = r.y[i0], b = r.y[i0 + 1]
    if (a == null || b == null) return a ?? b ?? 5000
    return a + (b - a) * (i - i0)
  }

  /** Where the chairs, the heads and Death's deck are on screen, for the DOM laid over them. */
  geometry(): Geometry {
    const [k, ox, oy] = this.fit()
    const d = this.room.data
    const seats = new Map<number, SeatSpot>()
    const spot = (seat: number, [x, sc, sink]: [number, number, number]) => {
      const line = this.rimAt(x) + sink
      const a = this.actors.get(seat)
      const top = a ? a.player.puppet.headTop() : 500
      const rigLine = a ? a.player.puppet.rig.tableLine : 880
      seats.set(seat, {
        x: ox + x * k,
        line: oy + line * k,
        head: oy + (line - (rigLine - top) * sc) * k,
        side: Math.abs(x - d.design[0] / 2) < 2 ? 'c' : x < d.design[0] / 2 ? 'l' : 'r',
      })
    }
    spot(DEALER, d.dealer)
    if (this.youAt) spot(0, this.youAt)
    this.chairs.forEach((s, i) => spot(i + 1, s))
    const dl = this.rimAt(d.dealer[0]) + d.dealer[2]
    return { k, seats, deck: { x: ox + (d.dealer[0] + d.deck[0]) * k, y: oy + (dl + d.deck[1]) * k } }
  }

  // ------------------------------------------------------------ the loop

  private frame(now: number) {
    if (!this.alive) return
    const t0 = performance.now()
    const dt = Math.min(0.05, (now - this.last) / 1000)
    this.last = now
    this.clock += dt
    // lamp flames flicker on their own clock, still under Reduce motion
    ;(this.room.data.loops ?? []).forEach((l, i) => this.flicker[i]?.forEach((f) => {
      if (this.still || this.clock < f.next) return
      f.frame = (f.frame + 1 + Math.floor(Math.random() * (l.frames.length - 1))) % l.frames.length
      f.next = this.clock + l.every[0] + Math.random() * (l.every[1] - l.every[0])
    }))
    for (const [seat, a] of this.actors) {
      if (a.current && a.player.timeOf(a.current.name) < 0) a.current = null
      // the rest of a sequence, then their way out, then what was waiting
      if (!this.isBusy(a) && a.after.length) this.next(a, a.after.shift()!, a.afterPrio)
      if (!this.isBusy(a) && a.leaving) {
        a.fade -= this.still ? 1 : (dt * (this.speed || 1)) / FADE
        if (a.fade <= 0) { this.actors.delete(seat); continue }
      }
      if (!this.isBusy(a) && a.pending) {
        const p = a.pending
        a.pending = null
        if (now - p.at < (p.keep ? KEEP : STALE)) this.begin(a, p.names, p.prio)
      }
      a.player.face.frozen = this.clock < a.stillUntil
      a.player.update(dt)
    }
    this.draw()
    const ms = performance.now() - t0
    this.stats.frames++; this.stats.total += ms; this.stats.max = Math.max(this.stats.max, ms)
    this.raf = requestAnimationFrame((t) => this.frame(t))
  }

  private draw() {
    const c = this.canvas, ctx = this.ctx
    const dpr = window.devicePixelRatio || 1
    const cw = c.clientWidth, ch = c.clientHeight
    if (!cw || !ch) return
    if (c.width !== Math.round(cw * dpr) || c.height !== Math.round(ch * dpr)) {
      c.width = Math.round(cw * dpr)
      c.height = Math.round(ch * dpr)
    }
    const [k, ox, oy] = this.fit()
    const d = this.room.data
    const D: Mat = [k * dpr, 0, 0, k * dpr, ox * dpr, oy * dpr]
    const set = (m: Mat) => ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = '#0b0a09'
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.imageSmoothingQuality = 'high'

    // the backdrop, standing on the floor; as wide as the screen asks, and
    // above it (a tall window) its ceiling fading into the dark, rather than
    // a room blown up to fill it
    if (this.backdrop) {
      const s = Math.max(1, cw / k / d.backdrop.w)
      const bw = d.backdrop.w * s, bh = d.backdrop.h * s
      set(D)
      // after the turn (the champion has come) the room may be drawn again,
      // lit otherwise; where the lights fail first, the room as it was until
      // the dark is complete
      const turn = d.turn
      const since = this.clock - this.turnAt
      const shows = turn?.lights && since < LIGHTS.dark ? this.wasPresence : this.presence
      const room = shows === 'after' && this.backdropAfter ? this.backdropAfter : this.backdrop
      const bx = d.design[0] / 2 - bw / 2, by = d.design[1] - bh
      ctx.drawImage(room, bx, by, bw, bh)
      // A window taller than the room: its ceiling carried on up and into the
      // dark, rather than a bare black band over it.
      const top = -oy / k
      if (by > top + 0.5) {
        ctx.drawImage(room, 0, 0, room.naturalWidth, room.naturalHeight * 0.02, bx, top, bw, by - top + 1)
        const g = ctx.createLinearGradient(0, top, 0, by)
        g.addColorStop(0, '#0b0a09')
        g.addColorStop(1, 'rgba(11, 10, 9, 0)')
        ctx.fillStyle = g
        ctx.fillRect(bx, top, bw, by - top + 1)
      }
      // the room's pieces, scaled with the backdrop about its foot
      set(mul(mul(mul(D, translate(d.design[0] / 2, d.design[1])), scale(s, s)), translate(-d.design[0] / 2, -d.design[1])))
      const piece = (name: string, x: number, bottom: number, h: number, alpha = 1) => {
        const im = this.pieces.get(name), p = d.pieces?.[name]
        if (!im || !p) return
        const w = h * p.aspect
        ctx.globalAlpha = alpha
        ctx.drawImage(im, x - w / 2, bottom - h, w, h)
        ctx.globalAlpha = 1
      }
      const story = shows && d.presence?.[shows]
      const sp = story ? d.pieces?.[story] : undefined
      if (story && sp?.x !== undefined) piece(story, sp.x, sp.bottom!, sp.h!)
      // a guttering lamp sinks low and stutters (only dims under Reduce motion)
      const dim = (until: number) => until <= this.clock ? 1
        : this.still ? 0.4 : 0.15 + 0.5 * Math.abs(Math.sin(this.clock * 31) * Math.sin(this.clock * 17))
      // a fire sunk to embers since the champion came (Transylvania): its
      // flames fade out over EMBERS seconds, and a low glow is left
      const sunk = turn?.embers !== undefined && this.presence === 'after' ? Math.min(1, Math.max(0, since / EMBERS)) : 0
      ;(d.loops ?? []).forEach((l, i) => l.spots.forEach(([x, bottom, h], j) => {
        const low = i === turn?.embers ? sunk : 0
        const a = dim(this.gutters[i]?.[j] ?? 0) * (1 - low)
        if (a > 0) piece(l.frames[this.flicker[i]?.[j]?.frame ?? 0], x, bottom, h, a)
        if (a < 1) {                                     // the flame painted on the backdrop goes dark with it
          const g = ctx.createRadialGradient(x, bottom - h / 2, 0, x, bottom - h / 2, h * 1.1)
          g.addColorStop(0, `rgba(8, 6, 5, ${0.85 * (1 - a)})`)
          g.addColorStop(1, 'rgba(8, 6, 5, 0)')
          ctx.fillStyle = g
          ctx.fillRect(x - h * 1.1, bottom - h / 2 - h * 1.1, h * 2.2, h * 2.2)
        }
        if (low > 0) this.embers(x, bottom, h, low)
      }))
    }

    // Death first: he sits furthest back
    const order = [...this.actors.entries()].sort(([a], [b]) => (a === DEALER ? -1 : b === DEALER ? 1 : a - b)).map(([, a]) => a)
    const views = order.map((a) => {
      const r = a.player.puppet.rig
      let v = mul(D, translate(a.x, a.line))
      v = mul(v, scale(a.flip ? -a.scale : a.scale, a.scale))
      return mul(v, translate(-r.canvas.w / 2, -r.tableLine))
    })
    order.forEach((a, i) => { ctx.globalAlpha = a.fade; a.player.puppet.paint(ctx, views[i]) })
    ctx.globalAlpha = 1

    if (this.table) {
      set(D)
      ctx.drawImage(this.table, d.table.x, d.table.y, d.table.w, d.table.h)
    }
    // each puppet above its own line, over the table
    order.forEach((a, i) => {
      ctx.save()
      set(D)
      ctx.beginPath()
      ctx.rect(-5000, -5000, 10000, a.line + 5000)
      ctx.clip()
      ctx.globalAlpha = a.fade
      a.player.puppet.paint(ctx, views[i])
      ctx.restore()
    })
    // and what rests on the table, over it, only where the table is
    ctx.save()
    set(D)
    ctx.clip(this.rimPath)
    order.forEach((a, i) => { ctx.globalAlpha = a.fade; a.player.puppet.paint(ctx, views[i], true) })
    ctx.restore()

    // the lights failing: the whole room goes dark, sputters, and comes up again in its other light
    const dark = this.lightsDark()
    if (dark > 0) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.fillStyle = `rgba(4, 4, 6, ${dark})`
      ctx.fillRect(0, 0, c.width, c.height)
    }
  }

  /** How dark the room is (0-1) while its lights fail and come up again (room.json `turn.lights`). */
  private lightsDark(): number {
    if (!this.room.data.turn?.lights) return 0
    const t = this.clock - this.turnAt
    const { dark, hold, up } = LIGHTS
    if (t < 0 || t >= dark + hold + up) return 0
    if (t < dark) return 0.94 * (t / dark)
    if (t < dark + hold) {
      // a lamp trying to catch, twice (a steady dark under Reduce motion)
      const u = t - dark
      if (!this.still && ((u > 0.38 && u < 0.45) || (u > 0.56 && u < 0.6))) return 0.6
      return 0.94
    }
    const u = (t - dark - hold) / up
    return 0.94 * (1 - u * u * (3 - 2 * u))
  }

  /**
   * What is left of a fire (`k`, 0-1, as it sinks): the light it threw on
   * the stone gone with it, and a low red glow on the grate, breathing.
   */
  private embers(x: number, bottom: number, h: number, k: number) {
    const ctx = this.ctx
    const r0 = h * 1.6, cy0 = bottom - h * 0.6
    const shade = ctx.createRadialGradient(x, cy0, 0, x, cy0, r0)
    shade.addColorStop(0, `rgba(10, 6, 5, ${0.6 * k})`)
    shade.addColorStop(0.6, `rgba(10, 6, 5, ${0.35 * k})`)
    shade.addColorStop(1, 'rgba(10, 6, 5, 0)')
    ctx.fillStyle = shade
    ctx.fillRect(x - r0, cy0 - r0, 2 * r0, 2 * r0)
    const breath = this.still ? 0.8 : 0.72 + 0.18 * Math.sin(this.clock * 1.7) + 0.1 * Math.sin(this.clock * 4.3 + 1)
    const cy = bottom - h * 0.1
    ctx.save()
    ctx.translate(x, cy)
    ctx.scale(1, 0.32)
    const r = h * 0.62
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r)
    g.addColorStop(0, `rgba(255, 120, 40, ${0.75 * k * breath})`)
    g.addColorStop(0.35, `rgba(200, 50, 15, ${0.5 * k * breath})`)
    g.addColorStop(1, 'rgba(120, 20, 5, 0)')
    ctx.fillStyle = g
    ctx.fillRect(-r, -r, 2 * r, 2 * r)
    ctx.restore()
  }

  destroy() {
    this.alive = false
    cancelAnimationFrame(this.raf)
  }
}
