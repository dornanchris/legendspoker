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
 * part of a slot from that time on; null puts the slot back to rest, and "-"
 * shows nothing there (a whole-figure frame hides the body and arms). A clip
 * that ends where it began (every channel 0, every slot null) leaves the
 * puppet exactly in its rest pose.
 *
 * Swaps cut: shapes swap, never cross-fade (no mouth ghosts). A swap with a
 * third number fades instead, over that many seconds: what the slot showed
 * goes as the new part comes, so a figure can phase out of its chair and back
 * (the Cheshire Cat: [0.2, "fade", 0.5]).
 */

export type Ease = 'linear' | 'in' | 'out' | 'inOut' | 'outBack' | 'hold'
export type Key = [number, number, Ease?]
export type Channel = 'rot' | 'x' | 'y' | 'sx' | 'sy' | 'len'
/** [time s, part state (null rest, "-" none), seconds to fade in over (none: a cut)] */
export type Swap = [number, string | null, number?]
export type ClipData = {
  duration: number
  note?: string
  tracks: Record<string, Partial<Record<Channel, Key[]>>>
  swaps?: Record<string, Swap[]>
  /**
   * IK chains (web/puppet/ik.ts; a rig with an ik.json): the wrist's offset
   * from rest, x and y in rig pixels, and the hand's turn about it, rot in
   * degrees; keys as for tracks.
   */
  ik?: Record<string, Partial<Record<'x' | 'y' | 'rot', Key[]>>>
  /** Which hand a chain shows from a time on (null: the chain off, the rig's own arm back). */
  ikSwaps?: Record<string, [number, string | null][]>
  /** Seconds a clip takes to hand back to rest if it is cut short (IK puppets only; default 0.15). */
  release?: number
  /**
   * [at, secs]: the clip stops at `at` and holds that pose for `secs`, then
   * snaps back (the rest of the clip at SNAP times its speed, player.ts): the
   * tells, their decoys and every other gesture the table cues from words, all
   * alike, held long enough that the move is plain, and missed if you look
   * away (art-tools/build/tell_hold.py).
   */
  hold?: [number, number]
  /** How much faster than itself the clip plays once its hold is spent (default SNAP, player.ts; 1 plays it at its own pace). */
  snap?: number
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
export function swapAt(swaps: Swap[], t: number): string | null {
  let s: string | null = null
  for (const [t0, v] of swaps) if (t >= t0) s = v
  return s
}

/**
 * A fading swap's state at time t, while it fades: what the slot showed
 * before (null rest, "-" none), and how far the new part has come in (0-1).
 * Null when no swap is fading.
 */
export function fadeAt(swaps: Swap[], t: number): { from: string | null; u: number } | null {
  let i = -1
  for (let k = 0; k < swaps.length; k++) if (t >= swaps[k][0]) i = k
  const secs = i >= 0 ? swaps[i][2] : undefined
  if (!secs || t >= swaps[i][0] + secs) return null
  return { from: i > 0 ? swaps[i - 1][1] : null, u: (t - swaps[i][0]) / secs }
}
