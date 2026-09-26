/**
 * THE SAVE SCHEMA.
 *
 * Everything the game remembers between sessions, in one versioned object.
 * The browser keeps it in localStorage (web/store.ts); nothing here touches
 * storage, so node scripts can build and check saves too.
 *
 * MID-TABLE STATE IS A SEED PLUS A DECISION LOG. A table's deal, every bot
 * decision and every equity rollout come from one seeded RNG (src/rng.ts),
 * and the only other input is what the human did. So `active` stores the
 * seed and the human's decisions, and resuming REPLAYS the table silently up
 * to the next decision the player has not made. That reconstructs, exactly
 * and for free: stacks, blind level, button, whose turn it is, the pot, the
 * board, every tilt value, respect, and which lines have already been said --
 * the whole list CLAUDE.md says a save must capture -- without a single
 * field that could drift out of sync with the engine. `npm run check:replay`
 * is the test that it holds.
 */
import type { Action } from './decide.js'
import type { Card } from './equity.js'

export const SAVE_VERSION = 1

/**
 * Bump this whenever a change would make an old decision log replay
 * differently: engine rules, decide(), a quirk, any character's dials, the
 * cast of a table, or anything else that draws from the game's RNG. A seat
 * saved under a different number is not replayed -- it would deal different
 * cards and the "save" would be a lie -- and the player is told why.
 *
 * 2: poker-ts's hand ranking and side pots fixed (two sets of trips, the
 *    quads kicker, all-in players dropped from pots). Some pots now go to a
 *    different player, so the stacks after them differ.
 * 3: bets are read (equity against the bettor's range, the `betRespect`
 *    dial), the `committed` quirk counts chips put in, cheap all-ins get called.
 * 4: the Green Knight keeps his appointment -- knocked out, he retakes his
 *    own chair 50 hands later. Built on a branch that numbered it 2; merged
 *    on top of 2 and 3 above, so every older save is released.
 * 5: the uninvited guest (the six-seven banishment and Loki) and the table's
 *    callouts, from the same branch, which numbered them 3.
 */
export const ENGINE_VERSION = 5

export type Pace = 'unhurried' | 'normal' | 'brisk'

export type Settings = {
  /** Presentation clock only. Never reaches the game loop. */
  pace: Pace
  showLog: boolean
  reduceMotion: boolean
  /** Offer the fast-forward control while you are out of a hand. */
  fastForward: boolean
  /** Larger text across the whole game. */
  largeText: boolean
  /** Card and chip sounds. */
  sound: boolean
  /** 0..1. */
  volume: number
}

export type TableRecord = {
  attempts: number
  wins: number
  losses: number
  /** 1 is a win. null until a sitting has finished. */
  bestPlace: number | null
  respectTier: number
  respectPoints: number
  cleared: boolean
  firstClearedAt: string | null
  fastestWin: number | null
}

/**
 * What the player has SEEN of a character: public actions only, never their
 * hole cards unless shown down. The ledger turns these into words.
 */
export type CharacterRecord = {
  met: string | null
  beaten: string | null
  /** Hands dealt in while the player was at the table with them. */
  hands: number
  vpip: number
  pfr: number
  bets: number
  calls: number
  faced: number
  foldsToBet: number
  showdowns: number
  /** Mannerisms the player has seen them make, in words. */
  habits: string[]
  youKnockedOut: number
  knockedYouOut: number
}

export type CareerRecord = {
  hands: number
  potsWon: number
  biggestPot: number
  knockouts: number
  showdownsWon: number
  allInsWon: number
  /** Best hand the player has won a showdown with. rank indexes RANKINGS. */
  bestHand: { rank: number; cards: Card[]; table: string } | null
  tablesWon: number
  tablesLost: number
  deathLosses: number
  deathWins: number
  secondsPlayed: number
}

export type SavedDecision = { action: Action; betSize?: number; thinkMs?: number }

export type ActiveTable = {
  table: string
  /** 'open' is random play at a cleared table, with a drawn cast. */
  mode: 'tour' | 'open'
  /** Opponent ids in chair order; the player is always chair 0. */
  seats: string[]
  seed: number
  decisions: SavedDecision[]
  startedAt: string
  /** Respect the sitting started from, so a replay starts from the same place. */
  respectTier: number
  respectPoints: number
  /** ENGINE_VERSION when the seat was taken. */
  engine: number
}

export type Save = {
  version: number
  player: { name: string; invitedAt: string } | null
  settings: Settings
  tables: Record<string, TableRecord>
  characters: Record<string, CharacterRecord>
  /** Mark id -> when and where it was entered in the ledger. */
  marks: Record<string, { at: string; table: string | null }>
  record: CareerRecord
  active: ActiveTable | null
  story: { firstMapSeen: boolean; endingSeen: boolean; lastPlayed: string | null }
}

export const defaultSettings = (): Settings => ({
  pace: 'normal',
  showLog: true,
  reduceMotion: false,
  fastForward: true,
  largeText: false,
  sound: true,
  volume: 0.8,
})

export const newTableRecord = (): TableRecord => ({
  attempts: 0,
  wins: 0,
  losses: 0,
  bestPlace: null,
  respectTier: 0,
  respectPoints: 0,
  cleared: false,
  firstClearedAt: null,
  fastestWin: null,
})

export const newCharacterRecord = (): CharacterRecord => ({
  met: null,
  beaten: null,
  hands: 0,
  vpip: 0,
  pfr: 0,
  bets: 0,
  calls: 0,
  faced: 0,
  foldsToBet: 0,
  showdowns: 0,
  habits: [],
  youKnockedOut: 0,
  knockedYouOut: 0,
})

export const newCareer = (): CareerRecord => ({
  hands: 0,
  potsWon: 0,
  biggestPot: 0,
  knockouts: 0,
  showdownsWon: 0,
  allInsWon: 0,
  bestHand: null,
  tablesWon: 0,
  tablesLost: 0,
  deathLosses: 0,
  deathWins: 0,
  secondsPlayed: 0,
})

export function freshSave(): Save {
  return {
    version: SAVE_VERSION,
    player: null,
    settings: defaultSettings(),
    tables: {},
    characters: {},
    marks: {},
    record: newCareer(),
    active: null,
    story: { firstMapSeen: false, endingSeen: false, lastPlayed: null },
  }
}

/**
 * Accepts anything that came out of storage and returns a valid Save. Unknown
 * or missing fields fall back to defaults field by field, so an older save
 * gains new fields instead of being thrown away. A save from a NEWER version
 * than this build is kept as-is rather than silently downgraded.
 */
export function migrate(raw: unknown): Save {
  const base = freshSave()
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<Save>
  const tables: Record<string, TableRecord> = {}
  for (const [id, t] of Object.entries(r.tables ?? {})) tables[id] = { ...newTableRecord(), ...t }
  const characters: Record<string, CharacterRecord> = {}
  for (const [id, c] of Object.entries(r.characters ?? {})) {
    characters[id] = { ...newCharacterRecord(), ...c, habits: [...(c?.habits ?? [])] }
  }
  return {
    version: Math.max(SAVE_VERSION, Number(r.version) || 0),
    player: r.player && typeof r.player.name === 'string' ? r.player : null,
    settings: { ...base.settings, ...(r.settings ?? {}) },
    tables,
    characters,
    marks: { ...(r.marks ?? {}) },
    record: { ...base.record, ...(r.record ?? {}) },
    active: r.active && Array.isArray(r.active.decisions) ? r.active : null,
    story: { ...base.story, ...(r.story ?? {}) },
  }
}

export function tableRecord(save: Save, id: string): TableRecord {
  return (save.tables[id] ??= newTableRecord())
}

export function characterRecord(save: Save, id: string): CharacterRecord {
  return (save.characters[id] ??= newCharacterRecord())
}
