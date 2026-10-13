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
  sway: { rot: number; x: number; y: number; periods: [number, number, number]; follow: number }
  breath: { period: number; sy: number }
  speech: {
    vowel: number; consonant: number; space: number; pause: number
    map: Record<string, string>
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
  private speech: Beat[] = []
  private speechAt = 0
  onSpeechEnd: (() => void) | null = null

  constructor(readonly cfg: FaceConfig) {}

  blink(double = false): void {
    const f = this.cfg.blink.frames
    this.blinkFrames = double ? [...f, ['__open', 0.08], ...f] : f
    this.blinkAt = this.time
  }

  /** Lip shapes for a line of text, from its letters (until there is recorded audio). */
  say(text: string): void {
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
    this.speech = beats
    this.speechAt = this.time
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
    if (this.speech.length && this.time - this.speechAt > this.speech[this.speech.length - 1].t) {
      this.speech = []
      this.onSpeechEnd?.()
    }
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

    let mouth = this.mouth
    if (this.speech.length) {
      const t = this.time - this.speechAt
      for (const b of this.speech) if (t >= b.t) mouth = b.shape
    }
    p.show('mouth', mouth)

    p.add('head', 'rot', this.tilt[0])
    p.add('head', 'x', this.tilt[1])
    p.add('head', 'y', this.tilt[2])
    if (this.idle && !this.still) {
      const [pr, px, py] = c.sway.periods
      const t = this.time
      p.add('head', 'rot', c.sway.rot * Math.sin((2 * Math.PI * t) / pr))
      p.add('head', 'x', c.sway.x * Math.sin((2 * Math.PI * t) / px + 1.3))
      p.add('head', 'y', c.sway.y * Math.sin((2 * Math.PI * t) / py + 0.7))
      p.add('torso', 'sy', c.breath.sy * (0.5 - Math.cos((2 * Math.PI * t) / c.breath.period) / 2))
    }
  }
}
