/**
 * One sound, synthesised. No asset, and so no licence question -- ASSETS.md
 * governs anything we ship, and a chip click is not worth a sourcing hunt yet.
 *
 * The reason this file exists at all is the UNLOCK. Mobile browsers create an
 * AudioContext in a suspended state and only allow it to start inside a real
 * user gesture; a game that builds its context on load is silent on a phone
 * forever, and silent in a way that works perfectly on a desktop. So the
 * context is created on the first pointer event and resumed there.
 */

let ctx: AudioContext | null = null

/** Call from a real user gesture. Safe to call repeatedly. */
export function unlock(): void {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return
    ctx = new Ctor()
  }
  // Suspends again when the app is backgrounded, so this is not just a
  // first-run concern.
  if (ctx.state !== 'running') void ctx.resume()
}

/** A chip click: a short, hard-edged blip. Does nothing if audio is locked. */
export function click(): void {
  if (!ctx || ctx.state !== 'running') return
  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(1400, t)
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.05)
  gain.gain.setValueAtTime(0.18, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.1)
}

/** True once audio has actually started, for the on-device check. */
export function isUnlocked(): boolean {
  return ctx?.state === 'running'
}
