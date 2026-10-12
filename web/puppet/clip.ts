/**
 * Clips: keyframed bone motion and part swaps, as data (web/art/<id>/anim.json).
 *
 *   "check": {
 *     "duration": 1.3,
 *     "tracks": { "arm_near": { "rot": [[0, 0], [0.2, -14, "inOut"], ...] } },
 *     "swaps":  { "hand_near": [[0.12, "fist_up"], [1.0, null]] }
 *   }
 *
 * A key is [time s, value, ease]; the ease shapes the segment that ARRIVES at
 * that key. Channels are changes from rest: rot (degrees, clockwise), x and y
 * (canvas pixels), sx and sy (added to a scale of 1), and len: the bone
 * foreshortened along its own length (-0.1 is 10% shorter), as a forearm
 * looks when it points toward the viewer. len only ever shortens: a limb
 * never stretches. Its own parts shorten; the bones it carries (a hand) move
 * with its end and keep their shape. A swap shows the named
 * part of a slot from that time on; null puts the slot back to rest. A clip
 * that ends where it began (every channel 0, every slot null) leaves the
 * puppet exactly in its rest pose.
 */

export type Ease = 'linear' | 'in' | 'out' | 'inOut' | 'outBack' | 'hold'
export type Key = [number, number, Ease?]
export type Channel = 'rot' | 'x' | 'y' | 'sx' | 'sy' | 'len'
export type ClipData = {
  duration: number
  note?: string
  tracks: Record<string, Partial<Record<Channel, Key[]>>>
  swaps?: Record<string, [number, string | null][]>
}

export const EASE: Record<Ease, (u: number) => number> = {
  linear: (u) => u,
  in: (u) => u * u * u,
  out: (u) => 1 - (1 - u) ** 3,
  inOut: (u) => 0.5 - Math.cos(Math.PI * u) / 2,
  outBack: (u) => 1 + 2.2 * (u - 1) ** 3 + 1.2 * (u - 1) ** 2,
  hold: (u) => (u < 1 ? 0 : 1),
}

/** A channel's value at time t. */
export function sample(keys: Key[], t: number): number {
  if (!keys.length) return 0
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1, e = 'inOut'] = keys[i]
    if (t <= t1) {
      const [t0, v0] = keys[i - 1]
      const u = t1 > t0 ? (t - t0) / (t1 - t0) : 1
      return v0 + (v1 - v0) * EASE[e](u)
    }
  }
  return keys[keys.length - 1][1]
}

/** Which part a slot shows at time t: a state name, or null for rest. */
export function swapAt(swaps: [number, string | null][], t: number): string | null {
  let s: string | null = null
  for (const [t0, v] of swaps) if (t >= t0) s = v
  return s
}
