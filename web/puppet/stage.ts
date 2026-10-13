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
export const PRIO = { idle: 0, tell: 1, act: 2 } as const
export type Prio = (typeof PRIO)[keyof typeof PRIO]

/** A clip that had to wait for another is dropped if it is this stale by then (ms). */
const STALE = 2500
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
  pending: { name: string; prio: Prio; at: number } | null
  /** Out of the table: drawn until the clip it left on is over, then not at all. */
  leaving: boolean
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
  private table: Img | null = null
  private rimPath: Path2D
  /** Clips play at this rate (the presentation clock's pace); the face and idles never change speed. */
  speed = 1
  /** Reduce motion: no sway or breath. */
  still = false
  onReady: (() => void) | null = null

  constructor(readonly canvas: HTMLCanvasElement, readonly room: RoomEntry, readonly seatCount: number) {
    this.ctx = canvas.getContext('2d')!
    const r = room.data.rim
    const p = new Path2D()
    const xs = r.y.map((_, i) => r.x0 + i * r.step)
    p.moveTo(xs[0], 5000)
    r.y.forEach((y, i) => p.lineTo(xs[i], y ?? 5000))
    p.lineTo(xs[xs.length - 1], 5000)
    p.closePath()
    this.rimPath = p
  }

  /** The seats this room has chairs for: one spot per opponent at this count. */
  static fits(room: RoomEntry, seatCount: number): boolean {
    return !!room.data.seats[String(seatCount)]
  }

  /** Load the room and whoever is seated (index 0 is the player and has no figure). */
  async load(seatIds: (string | null)[]): Promise<void> {
    const base = this.room.base
    const [bd, tb] = await Promise.all([image(base + this.room.data.backdrop.img), image(base + this.room.data.table.img)])
    this.backdrop = bd
    this.table = tb
    await Promise.all([this.seat(DEALER, 'death'), ...seatIds.map((id, i) => (i > 0 && id ? this.seat(i, id) : null))])
    if (!this.alive) return
    this.last = performance.now()
    this.raf = requestAnimationFrame((t) => this.frame(t))
    this.onReady?.()
  }

  /** Put someone in a chair (null empties it). Someone with no puppet leaves it empty. */
  async seat(seat: number, id: string | null): Promise<void> {
    this.actors.delete(seat)
    const entry = id ? PUPPETS[id] : undefined
    if (!id || !entry) return
    const player = await PuppetPlayer.load(entry, true)
    if (!this.alive) return
    player.face.still = this.still
    const [x, sc, sink] = seat === DEALER ? this.room.data.dealer : this.room.data.seats[String(this.seatCount)][seat - 1]
    const [w] = this.room.data.design
    this.actors.set(seat, {
      id, player, x, scale: sc, flip: x > w / 2 + 1, line: this.rimAt(x) + sink,
      current: null, pending: null, leaving: false,
    })
  }

  /** Who is drawn in a chair (null: nobody, or someone with no puppet). */
  idAt(seat: number): string | null {
    return this.actors.get(seat)?.id ?? null
  }

  has(seat: number): boolean {
    return this.actors.has(seat)
  }

  /** The figure in a chair, for its face (speech). */
  face(seat: number) {
    return this.actors.get(seat)?.player.face ?? null
  }

  /**
   * Play a clip on someone. An idle never interrupts anything and is dropped
   * if they are busy; anything else cuts an idle short, or waits for the clip
   * playing to end (one waiting at most: the newest).
   */
  cue(seat: number, clip: string, prio: Prio): boolean {
    const a = this.actors.get(seat)
    if (!a || a.leaving || !a.player.has(clip)) return false
    const busy = a.current !== null && a.player.timeOf(a.current.name) >= 0
    if (busy && prio === PRIO.idle) return false
    if (busy && a.current!.prio !== PRIO.idle) {
      a.pending = { name: clip, prio, at: performance.now() }
      return true
    }
    this.start(a, clip, prio)
    return true
  }

  busy(seat: number): boolean {
    const a = this.actors.get(seat)
    return !!a && a.current !== null && a.player.timeOf(a.current.name) >= 0
  }

  /** They have left the table: finish what they are doing, then the chair is empty. */
  leave(seat: number): void {
    const a = this.actors.get(seat)
    if (a) { a.leaving = true; a.pending = null }
  }

  private start(a: Actor, clip: string, prio: Prio) {
    a.player.stop()
    a.player.speed = this.speed
    a.player.play(clip)
    a.current = { name: clip, prio }
    a.pending = null
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
    d.seats[String(this.seatCount)].forEach((s, i) => spot(i + 1, s))
    const dl = this.rimAt(d.dealer[0]) + d.dealer[2]
    return { k, seats, deck: { x: ox + (d.dealer[0] + d.deck[0]) * k, y: oy + (dl + d.deck[1]) * k } }
  }

  // ------------------------------------------------------------ the loop

  private frame(now: number) {
    if (!this.alive) return
    const dt = Math.min(0.05, (now - this.last) / 1000)
    this.last = now
    for (const [seat, a] of this.actors) {
      if (a.current && a.player.timeOf(a.current.name) < 0) a.current = null
      if (!a.current && a.leaving) { this.actors.delete(seat); continue }
      if (!a.current && a.pending) {
        const p = a.pending
        a.pending = null
        if (now - p.at < STALE) this.start(a, p.name, p.prio)
      }
      a.player.update(dt)
    }
    this.draw()
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
    // above it (a tall window) dark, rather than a room blown up to fill it
    if (this.backdrop) {
      const s = Math.max(1, cw / k / d.backdrop.w)
      const bw = d.backdrop.w * s, bh = d.backdrop.h * s
      set(D)
      ctx.drawImage(this.backdrop, d.design[0] / 2 - bw / 2, d.design[1] - bh, bw, bh)
    }

    // Death first: he sits furthest back
    const order = [...this.actors.entries()].sort(([a], [b]) => (a === DEALER ? -1 : b === DEALER ? 1 : a - b)).map(([, a]) => a)
    const views = order.map((a) => {
      const r = a.player.puppet.rig
      let v = mul(D, translate(a.x, a.line))
      v = mul(v, scale(a.flip ? -a.scale : a.scale, a.scale))
      return mul(v, translate(-r.canvas.w / 2, -r.tableLine))
    })
    order.forEach((a, i) => a.player.puppet.paint(ctx, views[i]))

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
      a.player.puppet.paint(ctx, views[i])
      ctx.restore()
    })
    // and what rests on the table, over it, only where the table is
    ctx.save()
    set(D)
    ctx.clip(this.rimPath)
    order.forEach((a, i) => a.player.puppet.paint(ctx, views[i], true))
    ctx.restore()
  }

  destroy() {
    this.alive = false
    cancelAnimationFrame(this.raf)
  }
}
