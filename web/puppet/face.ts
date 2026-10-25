import type { Puppet } from './puppet.js'

/**
 * The face and the life in a puppet, separate from anything its arms do:
 * blinks, where it looks, its brows, its mouth when it speaks, and the small
 * idle motion of head and chest. It writes only the head bone, the torso's
 * breath, and the eyes / brows / mouth slots, so an arm clip never touches it.
 *
 * Shapes swap, they never cross-fade: two mouths (or two pairs of eyes) faded
 * into each other are a ghost. Motion between them comes from the timing, as
 * in drawn animation: a blink is open, half, closed, half, open.
 *
 * Tuned in anim.json ("face"); the randomness is Math.random, never the game
 * RNG (CLAUDE.md: nothing on the presentation side may touch it).
 */

export type FaceConfig = {
  blink: { every: [number, number]; double: number; frames: [string, number][] }
  gaze: { idle: [string, number][]; hold: [number, number]; tilt: Record<string, [number, number, number]> }
  /** `body`: degrees the whole upper body drifts, about the table line (a slow weight shift; the head sways on top). */
  sway: { rot: number; x: number; y: number; periods: [number, number, number]; follow: number; body?: number }
  breath: { period: number; sy: number }
  speech: {
    vowel: number; consonant: number; space: number; pause: number
    map: Record<string, string>
    /** No mouth to move (a closed helm): the head nods this far (degrees) on each open sound. */
    nod?: number
  }
}

type Beat = { t: number; shape: string | null }

const rand = (a: number, b: number) => a + Math.random() * (b - a)

export class Face {
  gaze = 'ahead'
  brows = 'neutral'
  mouth: string | null = null
  /** Idle life: random blinks, glances, sway, breath. */
  idle = true
  autoBlink = true
  /** No sway and no breath (Reduce motion); blinks, looks and speech go on. */
  still = false

  private time = 0
  private nextBlink = 1.5
  private blinkAt = -1
  private blinkFrames: [string, number][] = []
  private nextGlance = 3
  private glanceUntil = 0
  private idleGaze = 'ahead'
  private tilt = [0, 0, 0]
  private nod = 0
  private speech: Beat[] = []
  private speechAt = 0
  /** When the line must be done by, whatever held it back (the bubble's time). */
  private speechUntil = Infinity
  /**
   * The head the mouth is drawn on is not showing (a whole-figure frame with
   * its own drawn head, mid-gesture): the line waits for it, rather than be
   * spoken by a face that cannot move. Set by the player each frame.
   */
  heldBack = false
  onSpeechEnd: (() => void) | null = null

  constructor(readonly cfg: FaceConfig) {}

  blink(double = false): void {
    const f = this.cfg.blink.frames
    this.blinkFrames = double ? [...f, ['__open', 0.08], ...f] : f
    this.blinkAt = this.time
  }

  /**
   * Lip shapes for a line of text, from its letters (until there is recorded
   * audio). `maxSecs`: the line's time on screen; the mouth stops when its
   * bubble comes down, and a long line is cut there rather than outlast it.
   */
  say(text: string, maxSecs = Infinity): void {
    const s = this.cfg.speech
    const beats: Beat[] = []
    let t = 0
    let last: string | null = '__start'
    const lower = text.toLowerCase()
    for (let i = 0; i < lower.length; i++) {
      const c = lower[i]
      const pair = lower.slice(i, i + 2)
      if (/[.,;:!?—–-]/.test(c)) { beats.push({ t, shape: null }); t += s.pause; last = null; continue }
      if (c === ' ') { if (last !== 'rest') beats.push({ t, shape: 'rest' }); t += s.space; last = 'rest'; continue }
      const shape = s.map[pair] ?? s.map[c]
      if (!shape) continue
      if (s.map[pair]) i++
      if (shape !== last) beats.push({ t, shape })
      t += /[aeiouy]/.test(c) ? s.vowel : s.consonant
      last = shape
    }
    beats.push({ t, shape: null })
    const cut = beats.findIndex((b) => b.t >= maxSecs)
    if (cut >= 0) beats.splice(cut, beats.length, { t: maxSecs, shape: null })
    this.speech = beats
    this.speechAt = this.time
    this.speechUntil = this.time + maxSecs
  }

  get speaking(): boolean {
    return this.speech.length > 0
  }

  update(dt: number): void {
    this.time += dt
    const c = this.cfg
    if (this.idle && this.autoBlink && this.time >= this.nextBlink && this.blinkAt < 0) {
      this.blink(Math.random() < c.blink.double)
      this.nextBlink = this.time + rand(...c.blink.every)
    }
    if (this.idle && this.time >= this.nextGlance) {
      // a glance somewhere else, then back to rest; a look changes on a blink
      // more often than not, as eyes do
      let r = Math.random()
      for (const [g, w] of c.gaze.idle) { r -= w; if (r <= 0) { this.idleGaze = g; break } }
      this.glanceUntil = this.time + rand(...c.gaze.hold) * (this.idleGaze === 'ahead' ? 2 : 0.6)
      this.nextGlance = this.glanceUntil
      if (Math.random() < 0.5 && this.blinkAt < 0) this.blink()
    }
    // the head turns a little toward where it looks, easing there
    const goal = c.gaze.tilt[this.currentGaze()] ?? [0, 0, 0]
    const k = 1 - Math.exp(-c.sway.follow * dt)
    for (let i = 0; i < 3; i++) this.tilt[i] += (goal[i] - this.tilt[i]) * k
    if (c.speech.nod) {                                   // a helm talks with its head
      const open = this.speaking && ['ah', 'oh', 'ee', 'oo'].includes(this.shapeNow() ?? '')
      this.nod += ((open ? c.speech.nod : 0) - this.nod) * (1 - Math.exp(-14 * dt))
    }
    // Held back, the line waits: its clock stands still while the head is away.
    if (this.speech.length && this.heldBack) this.speechAt += dt
    if (this.speech.length && (this.time - this.speechAt > this.speech[this.speech.length - 1].t || this.time > this.speechUntil)) {
      this.speech = []
      this.onSpeechEnd?.()
    }
  }

  /** The mouth shape now: the line being spoken, else the one set by hand. */
  private shapeNow(): string | null {
    let mouth = this.mouth
    if (this.speech.length) {
      const t = this.time - this.speechAt
      for (const b of this.speech) if (t >= b.t) mouth = b.shape
    }
    return mouth
  }

  /** The look in force: one set by hand wins over an idle glance. */
  private currentGaze(): string {
    return this.gaze !== 'ahead' ? this.gaze : this.idle ? this.idleGaze : 'ahead'
  }

  apply(p: Puppet): void {
    const c = this.cfg
    // eyes: a blink in progress, else where it looks ("ahead" is the head's own eyes)
    let eyes: string | null = this.currentGaze()
    if (this.blinkAt >= 0) {
      let t = this.time - this.blinkAt
      let shown: string | null = null
      for (const [shape, d] of this.blinkFrames) {
        if (t < d) { shown = shape; break }
        t -= d
      }
      if (shown === null) this.blinkAt = -1
      else if (shown !== '__open') eyes = shown
    }
    p.show('eyes', eyes === 'ahead' ? null : eyes)
    p.show('brows', this.brows === 'neutral' ? null : this.brows)

    p.show('mouth', this.shapeNow())

    p.add('head', 'rot', this.tilt[0] + this.nod)
    p.add('head', 'x', this.tilt[1])
    p.add('head', 'y', this.tilt[2])
    if (this.idle && !this.still) {
      const [pr, px, py] = c.sway.periods
      const t = this.time
      p.add('head', 'rot', c.sway.rot * Math.sin((2 * Math.PI * t) / pr))
      p.add('head', 'x', c.sway.x * Math.sin((2 * Math.PI * t) / px + 1.3))
      p.add('head', 'y', c.sway.y * Math.sin((2 * Math.PI * t) / py + 0.7))
      p.add('torso', 'sy', c.breath.sy * (0.5 - Math.cos((2 * Math.PI * t) / c.breath.period) / 2))
      if (c.sway.body) p.add('torso', 'rot', c.sway.body * Math.sin((2 * Math.PI * t) / (pr * 1.7) + 2.1))
    }
  }
}
