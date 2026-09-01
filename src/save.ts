import type { Decision } from './decide.js'
import type { BlindLevel, Stats } from './game.js'

/**
 * THE SAVE SCHEMA.
 *
 * A save is a CHECKPOINT plus a JOURNAL, not a photograph of the table.
 *
 * The checkpoint is the state at the START of the hand in progress: stacks,
 * blind level, button, tilt, stats, and the RNG state. The journal is the
 * human's decisions taken so far in that hand. Restoring replays the hand
 * from its start, answering the human's turns out of the journal, and lands
 * on exactly the state that was saved -- board, pot, whose turn, all of it.
 *
 * WHY NOT A STRAIGHT SNAPSHOT of the mid-hand table? Because "mid-hand" lives
 * inside poker-ts: the undealt deck order, the betting round, the per-pot
 * eligibility lists. Serialising those means reaching into private fields of
 * a library we already have to patch, and any drift between the copy and the
 * real thing is a silent corruption rather than a crash.
 *
 * WHY NOT REPLAY THE WHOLE GAME from the seed? It works -- the deal is
 * seeded, so it would -- but it costs ~16ms per hand on a desktop, so a
 * 94-hand table is 1.5s here and several seconds on a phone, every resume.
 * It also makes every save a hostage to the dials: retune `decide()` and an
 * old save replays into a different game.
 *
 * The checkpoint bounds both problems to ONE hand. A resume replays ~16ms,
 * and a mid-hand save written before a tuning change can at worst play that
 * one hand differently -- it cannot rewrite the tournament behind it.
 *
 * The cost is that this file has to be kept honest: anything that is game
 * state and not derivable from the checkpoint has to be added here, and
 * `npm run check:save` is what proves it, by playing a table twice -- once
 * straight through, once interrupted by a save and a restore -- and
 * demanding both produce the same events.
 */
export const SAVE_VERSION = 1

/** Game state at the start of the hand in progress. */
export type Checkpoint = {
  /**
   * The whole generator state as one integer. Without it a restored game
   * deals different cards, and a save that deals different cards is not a
   * save. mulberry32 keeps its state in a closure, which is why rng.ts
   * exposes state() at all.
   */
  rngState: number
  handsPlayed: number
  level: number
  /** Cash mode: the button Game passes to poker-ts. */
  button: number
  /**
   * Tournament mode: the button poker-ts used for the PREVIOUS hand, or -1
   * before the first. poker-ts advances the button itself and only exposes
   * it mid-hand, so the next one is derived from this on restore.
   */
  lastButton: number
  /** Total chips per seat; 0 for a player who has busted. */
  stacks: number[]
  tilt: number[]
  stats: Stats[]
  /** Seats in bust order, first out first. */
  bustOrder: number[]
}

export type SaveGame = {
  version: number
  /** ISO timestamp, for a save-slot list. Never read when restoring. */
  savedAt: string

  /**
   * The seed the game began from, carried for provenance only: the
   * checkpoint's rngState is what a restore actually resumes from. Keeping
   * both means a bug report can quote a seed that reproduces the whole game
   * from hand one.
   */
  seed: number

  /** Personality ids by seat. Binds seats to characters across versions. */
  cast: string[]
  humanSeat: number | null

  mode: 'cash' | 'tournament'
  buyIn: number
  rollouts: number
  smallBlind: number
  bigBlind: number
  handsPerLevel: number
  /**
   * The blind schedule is stored, not looked up. Re-tuning DEFAULT_LEVELS
   * must not change how an existing save plays out.
   */
  levels: BlindLevel[]

  checkpoint: Checkpoint
  /**
   * The human's decisions so far in the hand in progress; null when the save
   * was taken between hands. Replayed in order on restore.
   */
  journal: Decision[] | null

  /**
   * The campaign layer's state -- respect tier, dialogue already used, which
   * characters have been beaten -- passed through verbatim and never read
   * here. Phase 5 owns its shape; this is the slot so it does not have to
   * retrofit the container.
   */
  tour?: Record<string, unknown>
}

export function toJson(save: SaveGame): string {
  return JSON.stringify(save)
}

/**
 * Parses a save and refuses anything it cannot honestly restore. A save that
 * loads into a subtly wrong game is worse than one that fails loudly.
 */
export function fromJson(text: string): SaveGame {
  let raw: any
  try {
    raw = JSON.parse(text)
  } catch (e) {
    throw new Error(`save is not valid JSON: ${(e as Error).message}`)
  }
  if (raw?.version !== SAVE_VERSION) {
    throw new Error(
      `save version ${raw?.version} is not readable by this build (expected ${SAVE_VERSION})`,
    )
  }
  const c = raw.checkpoint
  if (!c || !Array.isArray(c.stacks) || !Array.isArray(c.stats) || !Array.isArray(c.tilt)) {
    throw new Error('save is missing its checkpoint')
  }
  if (!Array.isArray(raw.cast) || raw.cast.length !== c.stacks.length) {
    throw new Error('save cast does not match its seats')
  }
  if (!Number.isInteger(c.rngState)) {
    throw new Error('save has no RNG state, so it cannot deal the same cards')
  }
  return raw as SaveGame
}
