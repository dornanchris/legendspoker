/**
 * The seeded RNG, in one place.
 *
 * `state()` is the point of this file. A closure-based generator hides its
 * internal counter, which is fine until you need to save a game mid-hand and
 * resume it: without the counter, the resumed hand deals different cards and
 * the save is not a save. mulberry32's whole state is one 32-bit integer, so
 * it costs one number in the schema.
 */
export type SeededRng = {
  (): number
  /** Current internal state. Pass it back to mulberry32 to resume the stream. */
  state(): number
}

export function mulberry32(seed: number): SeededRng {
  let s = seed | 0
  const rng = () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  rng.state = () => s
  return rng
}

/**
 * Fisher-Yates over a deck, drawing from a seeded source. Same algorithm
 * poker-ts uses, but it takes its randomness from us instead of
 * crypto.randomInt, which cannot be seeded.
 */
export function seededShuffle(rng: () => number) {
  return (cards: unknown[]): void => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))
      ;[cards[i], cards[j]] = [cards[j], cards[i]]
    }
  }
}
