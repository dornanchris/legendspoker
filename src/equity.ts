import pkg from 'pokersolver'
const { Hand } = pkg as any

export type Card = {
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A'
  suit: 'clubs' | 'diamonds' | 'hearts' | 'spades'
}

const SUIT_CHAR: Record<Card['suit'], string> = {
  clubs: 'c',
  diamonds: 'd',
  hearts: 'h',
  spades: 's',
}

const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] as const
const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'] as const

/** poker-ts card -> pokersolver string, e.g. {rank:'A',suit:'spades'} -> 'As' */
export const toStr = (c: Card): string => c.rank + SUIT_CHAR[c.suit]

const rankValue = (r: Card['rank']): number => RANKS.indexOf(r) + 2

/**
 * Preflop strength, 0..1. Chen-formula-ish heuristic, normalised.
 * Cheap enough to call in a tight loop, which matters — Monte Carlo
 * preflop would dominate the simulation runtime for very little accuracy.
 */
export function preflopStrength(hole: Card[]): number {
  const [a, b] = hole
  const hi = Math.max(rankValue(a.rank), rankValue(b.rank))
  const lo = Math.min(rankValue(a.rank), rankValue(b.rank))
  const paired = hi === lo
  const suited = a.suit === b.suit
  const gap = hi - lo

  // Base: high card value
  let score = hi === 14 ? 10 : hi === 13 ? 8 : hi === 12 ? 7 : hi === 11 ? 6 : hi / 2

  if (paired) score = Math.max(5, score * 2)
  if (suited) score += 2
  if (!paired) {
    if (gap === 1) score += 1
    else if (gap === 2) score -= 1
    else if (gap === 3) score -= 2
    else if (gap >= 4) score -= 4
    if (gap <= 2 && hi < 12) score += 1 // connected low cards make straights
  }

  // Chen tops out around 20 (AA); map to a rough win-probability feel.
  return Math.max(0.05, Math.min(0.95, (score + 4) / 26))
}

/**
 * Postflop equity by Monte Carlo: deal random opponent hands and runouts,
 * count how often we win. `rollouts` trades accuracy for speed.
 */
export function equityVs(
  hole: Card[],
  board: Card[],
  numOpponents: number,
  rollouts = 60,
  /**
   * Must be the same seeded source the game loop uses. A hand has to resolve
   * identically every time it is replayed from a seed -- if the rollouts pull
   * from Math.random, two runs of the same seed diverge, and a fast-forwarded
   * hand would not match the one the player watched.
   */
  rng: () => number = Math.random,
): number {
  const known = new Set([...hole, ...board].map(toStr))
  const deck: string[] = []
  for (const r of RANKS) {
    for (const s of SUITS) {
      const str = r + SUIT_CHAR[s]
      if (!known.has(str)) deck.push(str)
    }
  }

  // Comparing hands by a single numeric score is meaningfully faster than
  // Hand.winners(), and equivalent: rank first, then kickers in order.
  const score = (h: any): number =>
    h.cards.reduce((a: number, c: any) => a * 15 + c.rank, h.rank)

  const heroStr = hole.map(toStr)
  const boardStr = board.map(toStr)
  const needed = 5 - board.length
  let wins = 0
  let ties = 0

  for (let i = 0; i < rollouts; i++) {
    // Partial Fisher-Yates: we only need the first few cards.
    const draws = needed + numOpponents * 2
    for (let j = 0; j < draws; j++) {
      const k = j + Math.floor(rng() * (deck.length - j))
      ;[deck[j], deck[k]] = [deck[k], deck[j]]
    }

    const runout = deck.slice(0, needed)
    const fullBoard = [...boardStr, ...runout]
    const heroScore = score(Hand.solve([...heroStr, ...fullBoard]))

    let bestOpp = -1
    for (let o = 0; o < numOpponents; o++) {
      const oc = deck.slice(needed + o * 2, needed + o * 2 + 2)
      const oppScore = score(Hand.solve([...oc, ...fullBoard]))
      if (oppScore > bestOpp) bestOpp = oppScore
    }

    if (heroScore > bestOpp) wins++
    else if (heroScore === bestOpp) ties++
  }

  return (wins + ties * 0.5) / rollouts
}

export function handStrength(
  hole: Card[],
  board: Card[],
  numOpponents: number,
  rollouts = 60,
  rng: () => number = Math.random,
): number {
  if (board.length === 0) return preflopStrength(hole)
  return equityVs(hole, board, numOpponents, rollouts, rng)
}
