/**
 * MARKS -- the game's achievements, as entries in Death's ledger.
 *
 * Design doc: "Achievements: keep, but frame them in-world. Not a trophy
 * cabinet." So there are no badges, no points and no progress bars (BUILD-PLAN
 * 2B cuts reward-progress bars outright). A mark is a line Death writes in
 * his book about something you did. The words live in data/marks.json; this
 * file only knows how to test the conditions, and the conditions are generic
 * -- a new mark is a new JSON entry, not new code, unless it needs a new KIND
 * of condition.
 */
import pkg from 'pokersolver'
const { Hand } = pkg as any
import { MARKS, TOUR, ROSTER, type MarkCondition } from './content.js'
import { RANKINGS } from './game.js'
import { toStr, type Card } from './equity.js'
import type { Save } from './save.js'

/** Everything a mark might want to know about one finished hand. */
export type HandFacts = {
  table: string
  mode: 'tour' | 'open'
  hole: Card[] | null
  board: Card[]
  bigBlind: number
  /** The player's net change over the hand. */
  net: number
  wonPots: { amount: number; rank: number | null; cards: Card[] | null; showdown: boolean }[]
  /** The player was all in and won chips. */
  allInWon: boolean
  /** Character ids the player knocked out this hand. */
  knockouts: string[]
  /** The player's hand rank when they LOST a showdown, else null. */
  lostShowdownRank: number | null
  /** Won uncontested by betting with a weak hand. */
  bluffWon: boolean
  /** The player tied at showdown and shared a pot with another hand. */
  splitPot: boolean
  /** Characters who came back to the table at the end of this hand. */
  returned: string[]
}

export type TableFacts = {
  table: string
  mode: 'tour' | 'open'
  won: boolean
  hands: number
  /** Lowest stack the player held, in big blinds of the level at the time. */
  minStackBB: number
  /** The player never dropped below the chips they sat down with. */
  neverBelowStart: boolean
  missed: string[]
  respectTier: number
}

const rankIndex = (name: string) => RANKINGS.indexOf(name)

/** Rank (index into RANKINGS) of the best five from these cards. */
export function handRank(cards: Card[]): { rank: number; best: Card[] } {
  const solved = Hand.solve(cards.map(toStr))
  const rank = solved.descr === 'Royal Flush' ? 9 : solved.rank - 1
  const best: Card[] = solved.cards.map((c: any) => ({
    rank: c.value as Card['rank'],
    suit: ({ s: 'spades', h: 'hearts', d: 'diamonds', c: 'clubs' } as const)[c.suit as 's'],
  }))
  return { rank, best }
}

function countRanks(cards: Card[]): Map<string, number> {
  const m = new Map<string, number>()
  for (const c of cards) m.set(c.rank, (m.get(c.rank) ?? 0) + 1)
  return m
}

/** True if `cards` contain at least the multiset `ranks` (e.g. A A 8 8). */
function containsRanks(cards: Card[], ranks: string[]): boolean {
  const have = countRanks(cards)
  const need = countRanks(ranks.map((r) => ({ rank: r as Card['rank'], suit: 'spades' })))
  for (const [r, n] of need) if ((have.get(r) ?? 0) < n) return false
  return true
}

/** The player's two hole cards are exactly `w.ranks`, in either order. */
function holeMatches(w: MarkCondition, hole: Card[] | null): boolean {
  if (!hole) return false
  const [a, b] = hole
  const want = [...w.ranks].sort().join('')
  if ([a.rank, b.rank].sort().join('') !== want) return false
  if (w.offsuit && a.suit === b.suit) return false
  if (w.suited && a.suit !== b.suit) return false
  return true
}

function handCondition(w: MarkCondition, h: HandFacts): boolean {
  if (w.table && w.table !== h.table) return false
  switch (w.type) {
    case 'pot_win':
      return h.wonPots.some((p) => p.amount >= (w.minBB ?? 0) * h.bigBlind)
    case 'showdown_win':
      return h.wonPots.some(
        (p) =>
          p.showdown &&
          p.rank !== null &&
          (w.minRank === undefined || p.rank >= rankIndex(w.minRank)) &&
          (w.rank === undefined || p.rank === rankIndex(w.rank)) &&
          (!w.ranks || (p.cards !== null && containsRanks(p.cards, w.ranks))),
      )
    case 'hole_win':
      return h.wonPots.length > 0 && holeMatches(w, h.hole)
    case 'hole_loss':
      return h.lostShowdownRank !== null && holeMatches(w, h.hole)
    case 'split_pot':
      return h.splitPot
    case 'returned':
      return w.character ? h.returned.includes(w.character) : h.returned.length > 0
    case 'all_in_win':
      return h.allInWon
    case 'knockout':
      return w.character ? h.knockouts.includes(w.character) : h.knockouts.length > 0
    case 'knockouts_in_hand':
      return h.knockouts.length >= w.count
    case 'showdown_loss':
      return h.lostShowdownRank !== null && h.lostShowdownRank >= rankIndex(w.minRank)
    case 'bluff_win':
      return h.bluffWon
    default:
      return false
  }
}

function tableCondition(w: MarkCondition, t: TableFacts): boolean {
  if (w.table && w.table !== t.table) return false
  if (w.mode && w.mode !== t.mode) return false
  switch (w.type) {
    case 'table_won':
      return t.won
    case 'table_won_missing':
      return t.won && t.missed.includes(w.character)
    case 'table_won_from_short':
      return t.won && t.minStackBB <= w.maxBB
    case 'table_won_leading':
      return t.won && t.neverBelowStart
    case 'table_won_fast':
      return t.won && t.hands <= w.maxHands
    case 'respect_tier':
      return t.respectTier >= w.tier
    default:
      return false
  }
}

function careerCondition(w: MarkCondition, s: Save): boolean {
  switch (w.type) {
    case 'hands_played':
      return s.record.hands >= w.count
    case 'tour_complete':
      return TOUR.every((t) => s.tables[t.id]?.cleared)
    case 'table_cleared':
      return !!s.tables[w.table]?.cleared
    case 'lost_to':
      return (s.tables[w.table]?.losses ?? 0) >= w.count
    case 'beaten_roster':
      return ROSTER.every((c) => s.characters[c.id]?.beaten)
    default:
      return false
  }
}

const HAND_TYPES = new Set([
  'pot_win', 'showdown_win', 'hole_win', 'hole_loss', 'all_in_win', 'knockout',
  'knockouts_in_hand', 'showdown_loss', 'bluff_win', 'split_pot', 'returned',
])
const TABLE_TYPES = new Set([
  'table_won', 'table_won_missing', 'table_won_from_short', 'table_won_leading',
  'table_won_fast', 'respect_tier',
])
const CAREER_TYPES = new Set(['hands_played', 'tour_complete', 'table_cleared', 'lost_to', 'beaten_roster'])

/** Every condition type this build understands. check:data uses it. */
export const CONDITION_TYPES = new Set([...HAND_TYPES, ...TABLE_TYPES, ...CAREER_TYPES])

const CARD_RANKS = new Set(['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'])

/**
 * What is wrong with a condition's parameters. A misspelt hand name is not a
 * crash but a silent match: rankIndex() gives -1, and every hand is >= -1.
 * check:data reports these.
 */
export function conditionErrors(w: MarkCondition): string[] {
  const out: string[] = []
  for (const k of ['rank', 'minRank']) {
    if (w[k] !== undefined && rankIndex(w[k]) < 0) out.push(`unknown ${k} "${w[k]}" (one of: ${RANKINGS.join(', ')})`)
  }
  if (w.ranks !== undefined && !(Array.isArray(w.ranks) && w.ranks.every((r: string) => CARD_RANKS.has(r)))) {
    out.push('ranks must be a list of card ranks: 2-9, T, J, Q, K, A')
  }
  if ((w.type === 'hole_win' || w.type === 'hole_loss') && w.ranks?.length !== 2) {
    out.push(`${w.type} needs exactly two ranks`)
  }
  return out
}

export function marksForHand(h: HandFacts, earned: Set<string>): string[] {
  return MARKS.filter((m) => !earned.has(m.id) && HAND_TYPES.has(m.when.type) && handCondition(m.when, h))
    .map((m) => m.id)
}

export function marksForTable(t: TableFacts, earned: Set<string>): string[] {
  return MARKS.filter((m) => !earned.has(m.id) && TABLE_TYPES.has(m.when.type) && tableCondition(m.when, t))
    .map((m) => m.id)
}

export function marksForCareer(s: Save): string[] {
  return MARKS.filter((m) => !s.marks[m.id] && CAREER_TYPES.has(m.when.type) && careerCondition(m.when, s))
    .map((m) => m.id)
}
