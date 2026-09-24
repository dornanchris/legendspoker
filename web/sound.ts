/**
 * THE SOUND LAYER: cards and chips, synthesised.
 *
 * No files. Every sound is built from noise and a few sine partials at the
 * moment it plays, which buys three things on a $0 budget: nothing to
 * license, nothing to load (the game still opens from disk), and variation
 * for free -- BUILD-PLAN §6.2 wants 4-5 variants per sound with pitch jitter
 * or repetition "becomes maddening within ten minutes", and here every chip
 * that lands is a slightly different chip.
 *
 * Recordings can replace any of these later without touching the table: the
 * table only ever asks for a sound by what happened ("chips", "knock"), never
 * for a file.
 *
 * Presentation side only. Draws from Math.random, never the game RNG.
 */

type Ctx = AudioContext

let ctx: Ctx | null = null
let master: GainNode | null = null
let noise: AudioBuffer | null = null
let volume = 0.8

const jitter = (v: number, by: number) => v * (1 + (Math.random() * 2 - 1) * by)
const rand = (a: number, b: number) => a + Math.random() * (b - a)

/**
 * Browsers (iOS above all) refuse to play sound until the page has been
 * touched. Called on every tap and key press: the first one creates the
 * context, later ones wake it if the OS suspended it (a phone call, the app
 * going to the background).
 */
export function unlock(): void {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as any).webkitAudioContext
    if (!AC) return
    try {
      ctx = new AC() as Ctx
    } catch {
      return
    }
    master = ctx.createGain()
    master.gain.value = volume
    // A limiter at the end of the chain: a shove is a dozen chips landing on
    // top of each other, and summed they would clip.
    const limit = ctx.createDynamicsCompressor()
    limit.threshold.value = -8
    limit.knee.value = 6
    limit.ratio.value = 12
    limit.attack.value = 0.002
    limit.release.value = 0.12
    master.connect(limit).connect(ctx.destination)
    // One second of white noise, read from a random offset each time.
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
    const d = noise.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  }
  if (ctx.state === 'suspended') void ctx.resume().catch(() => {})
}

/** 0 is silent. From settings; takes effect at once. */
export function setVolume(v: number): void {
  volume = Math.max(0, Math.min(1, v))
  if (master && ctx) master.gain.setTargetAtTime(volume, ctx.currentTime, 0.02)
}

/** The context, if sound can play right now. */
function live(): Ctx | null {
  if (!ctx || !master || !noise || volume === 0 || ctx.state !== 'running') return null
  if (typeof document !== 'undefined' && document.hidden) return null
  return ctx
}

// ------------------------------------------------------------------ voices

type NoiseOpts = {
  filter: BiquadFilterType
  freq: number
  q?: number
  /** Sweep the filter to this frequency over the sound's length. */
  to?: number
  gain: number
  attack?: number
  decay: number
}

/** A burst of filtered noise: the paper-and-felt half of every sound here. */
function hiss(c: Ctx, at: number, o: NoiseOpts): void {
  const src = c.createBufferSource()
  src.buffer = noise
  const f = c.createBiquadFilter()
  f.type = o.filter
  f.frequency.setValueAtTime(o.freq, at)
  if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, at + (o.attack ?? 0.002) + o.decay)
  f.Q.value = o.q ?? 0.8
  const g = c.createGain()
  const attack = o.attack ?? 0.002
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(o.gain, at + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, at + attack + o.decay)
  src.connect(f).connect(g).connect(master!)
  const len = attack + o.decay + 0.02
  src.start(at, Math.random() * (1 - len), len)
}

/** A decaying sine: the ring of clay, the thump of a knuckle. */
function ring(c: Ctx, at: number, freq: number, gain: number, decay: number, drop = 1): void {
  const o = c.createOscillator()
  o.type = 'sine'
  o.frequency.setValueAtTime(freq, at)
  if (drop !== 1) o.frequency.exponentialRampToValueAtTime(freq * drop, at + decay)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(gain, at + 0.002)
  g.gain.exponentialRampToValueAtTime(0.0001, at + decay)
  o.connect(g).connect(master!)
  o.start(at)
  o.stop(at + decay + 0.02)
}

/** One clay chip landing on another: a click, then a short dull ring. */
function clack(c: Ctx, at: number, gain: number): void {
  const f0 = rand(2100, 3300)
  hiss(c, at, { filter: 'highpass', freq: 3200, gain: gain * 0.55, decay: 0.012 })
  ring(c, at, f0, gain * 0.32, rand(0.025, 0.045))
  ring(c, at, f0 * rand(1.52, 1.68), gain * 0.18, rand(0.015, 0.03))
  ring(c, at, f0 * rand(2.3, 2.6), gain * 0.08, 0.012)
}

// ------------------------------------------------------------------ sounds

/** Seconds from now. Every sound takes one, so a sound can land with its animation. */
const at = (c: Ctx, inSec: number) => c.currentTime + Math.max(0, inSec)

/** One card skimmed across the felt. */
export function deal(inSec = 0): void {
  const c = live()
  if (!c) return
  const t = at(c, inSec)
  hiss(c, t, { filter: 'bandpass', freq: jitter(2600, 0.2), to: jitter(4200, 0.15), q: 0.9, gain: 0.32, attack: 0.008, decay: jitter(0.07, 0.25) })
  hiss(c, t + 0.07, { filter: 'lowpass', freq: 900, gain: 0.18, decay: 0.03 })
}

/** A card turned face up: a snap. */
export function flip(inSec = 0): void {
  const c = live()
  if (!c) return
  const t = at(c, inSec)
  hiss(c, t, { filter: 'highpass', freq: jitter(2400, 0.15), gain: 0.3, decay: 0.014 })
  hiss(c, t + 0.028, { filter: 'bandpass', freq: jitter(1500, 0.2), q: 1.4, gain: 0.34, decay: jitter(0.05, 0.2) })
}

/** The riffle before a deal: a burst of cards falling together, then the bridge. */
export function shuffle(inSec = 0): void {
  const c = live()
  if (!c) return
  const t = at(c, inSec)
  const riffle = 0.42
  const n = 30
  for (let i = 0; i < n; i++) {
    const x = i / n
    const when = t + riffle * x + rand(-0.004, 0.004)
    const swell = Math.sin(Math.PI * Math.min(1, x * 1.15)) * 0.8 + 0.2
    hiss(c, when, { filter: 'bandpass', freq: rand(2400, 5200), q: 1.2, gain: 0.2 * swell, decay: rand(0.006, 0.014) })
  }
  hiss(c, t + riffle + 0.05, { filter: 'bandpass', freq: 1400, to: 3200, q: 0.7, gain: 0.16, attack: 0.05, decay: 0.2 })
}

/**
 * Chips hitting the felt. `n` is how many: the table scales it with the size
 * of the bet, so a min-raise ticks and a shove pours.
 */
export function chips(n: number, inSec = 0): void {
  const c = live()
  if (!c) return
  const count = Math.max(1, Math.min(14, Math.round(n)))
  let t = at(c, inSec)
  for (let i = 0; i < count; i++) {
    clack(c, t, rand(0.55, 1) * (i === 0 ? 1 : 0.8))
    // A handful of chips lands as a cascade, not a metronome.
    t += rand(0.018, 0.05) * (count > 6 ? 0.7 : 1)
  }
}

/** A check: two knuckle raps on the rail. */
export function knock(inSec = 0): void {
  const c = live()
  if (!c) return
  const t = at(c, inSec)
  const gap = rand(0.1, 0.13)
  for (const [dt, g] of [[0, 1], [gap, 0.75]] as const) {
    ring(c, t + dt, jitter(165, 0.08), 0.55 * g, 0.09, 0.55)
    hiss(c, t + dt, { filter: 'lowpass', freq: 1100, gain: 0.3 * g, decay: 0.025 })
  }
}

/** Cards slid back to the dealer, face down. */
export function muck(inSec = 0): void {
  const c = live()
  if (!c) return
  const t = at(c, inSec)
  hiss(c, t, { filter: 'bandpass', freq: jitter(2400, 0.15), to: 800, q: 0.6, gain: 0.2, attack: 0.03, decay: jitter(0.16, 0.2) })
}

/** Bets raked into the middle at the end of a street. */
export function sweep(n: number, inSec = 0): void {
  const c = live()
  if (!c) return
  const t = at(c, inSec)
  hiss(c, t, { filter: 'bandpass', freq: 1300, to: 2600, q: 0.7, gain: 0.14, attack: 0.04, decay: 0.22 })
  chips(Math.min(6, 2 + n), inSec + 0.2)
}

/** Your turn. Soft and low: the room is waiting on you, not alarmed. */
export function yourTurn(inSec = 0): void {
  const c = live()
  if (!c) return
  const t = at(c, inSec)
  ring(c, t, 392, 0.09, 0.9)
  ring(c, t, 784, 0.03, 0.5)
  ring(c, t + 0.11, 587.3, 0.07, 0.8)
}
