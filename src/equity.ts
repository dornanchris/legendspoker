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
const SUIT_OF: Record<string, Card['suit']> = { c: 'clubs', d: 'diamonds', h: 'hearts', s: 'spades' }
const fromStr = (s: string): Card => ({ rank: s[0] as Card['rank'], suit: SUIT_OF[s[1]] })

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
 * Share of a narrowed range kept back for bluffs and draws: hands that bet
 * without holding anything yet. Without it, a range is all made hands and a
 * flush-draw bet reads as a monster.
 */
const RANGE_LOOSE = 0.2

/**
 * Equity by Monte Carlo: deal opponent hands and runouts, count how often we
 * win. `rollouts` trades accuracy for speed.
 *
 * `range` is how much of the deck the FIRST opponent -- the one betting into
 * us -- is assumed to hold: 1 is any two cards, 0.4 is the strongest 40% of
 * hands by what they make right now (with a slice of weaker ones kept for
 * bluffs and draws). Any other opponents are still any two cards: only the
 * bettor has told us something.
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
  range = 1,
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

  const shuffleFront = <T,>(cards: T[], n: number) => {
    for (let j = 0; j < n; j++) {
      const k = j + Math.floor(rng() * (cards.length - j))
      ;[cards[j], cards[k]] = [cards[k], cards[j]]
    }
  }

  // The bettor's range: deal a pool of candidate hands, rank them by what
  // they hold right now, keep the strongest share, and let a few weaker ones
  // through as the bluffs and draws a real bettor also has.
  let pool: string[][] | null = null
  if (range < 1 && numOpponents > 0) {
    const size = Math.max(40, rollouts)
    const strength = (oc: string[]) =>
      board.length === 0 ? preflopStrength(oc.map(fromStr)) : score(Hand.solve([...oc, ...boardStr]))
    const candidates: { oc: string[]; s: number }[] = []
    for (let i = 0; i < size; i++) {
      shuffleFront(deck, 2)
      const oc = [deck[0], deck[1]]
      candidates.push({ oc, s: strength(oc) })
    }
    candidates.sort((a, b) => b.s - a.s)
    const keep = Math.max(1, Math.round(size * range))
    const strong = Math.max(1, Math.round(keep * (1 - RANGE_LOOSE)))
    pool = candidates.slice(0, strong).map((c) => c.oc)
    const rest = candidates.slice(strong)
    shuffleFront(rest, Math.min(rest.length, keep - strong))
    for (const c of rest.slice(0, keep - strong)) pool.push(c.oc)
  }

  for (let i = 0; i < rollouts; i++) {
    let cards = deck
    const opps: string[][] = []
    if (pool) {
      const oc = pool[Math.floor(rng() * pool.length)]
      opps.push(oc)
      cards = deck.filter((c) => c !== oc[0] && c !== oc[1])
    }
    // Partial Fisher-Yates: we only need the first few cards.
    const random = numOpponents - opps.length
    shuffleFront(cards, needed + random * 2)
    for (let o = 0; o < random; o++) opps.push(cards.slice(needed + o * 2, needed + o * 2 + 2))

    const runout = cards.slice(0, needed)
    const fullBoard = [...boardStr, ...runout]
    const heroScore = score(Hand.solve([...heroStr, ...fullBoard]))

    let bestOpp = -1
    for (const oc of opps) {
      const oppScore = score(Hand.solve([...oc, ...fullBoard]))
      if (oppScore > bestOpp) bestOpp = oppScore
    }

    if (heroScore > bestOpp) wins++
    else if (heroScore === bestOpp) ties++
  }

  return (wins + ties * 0.5) / rollouts
}

/**
 * What decide() calls equity. Before the flop with nothing but the blinds to
 * call it is the Chen-style strength score (cheap, and what the dials were
 * tuned against). Facing a raise it is a real Monte Carlo equity against the
 * raiser's range, because a strength score is not a chance of winning: it
 * rated 7-2 at 19% against a short stack's shove that it beats 40% of the
 * time, so big stacks folded for pennies.
 */
export function handStrength(
  hole: Card[],
  board: Card[],
  numOpponents: number,
  rollouts = 60,
  rng: () => number = Math.random,
  range = 1,
): number {
  if (board.length === 0 && range >= 1) return preflopStrength(hole)
  return equityVs(hole, board, numOpponents, rollouts, rng, range)
}
