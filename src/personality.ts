import type { DecisionContext, Decision } from './decide.js'
import { buildQuirks } from './quirks.js'

/**
 * The dials. Every character shares one decision function; only these
 * numbers differ. All values 0..1.
 */
export type Personality = {
  id: string
  name: string

  /** Bet/raise frequency when ahead. High = pushes, low = calls along. */
  aggression: number
  /** Equity threshold multiplier for entering a pot. High = folds more. */
  tightness: number
  /** How often they fire with nothing. */
  bluffFrequency: number
  /** How much a bad beat degrades their play, and for how long. */
  tiltSensitivity: number
  /** How much they adjust to observed opponent patterns. */
  adaptivity: number
  /**
   * Noise-to-signal: how much ambient, meaningless movement buries the real
   * tells. The second difficulty axis -- skill goes UP through the dials
   * above, legibility goes DOWN through this one. Early tables fire clean
   * clusters (low noise); late tables bury them; Death has no tells at all.
   * Presentation-only: it drives the idle scheduler, never a decision.
   */
  noise: number

  /**
   * 1-2 rules that break the pattern. This is what makes a character
   * memorable rather than a slightly different set of numbers — dials
   * alone converge on same-y bots.
   *
   * Return null to defer to the general decision function.
   */
  quirks: Quirk[]

  /** Observable signals, correlated with hidden state plus noise. */
  tells: Tell[]
  /**
   * Pure ambient vocabulary: things they do that never mean anything. The
   * idle scheduler draws from these AND the tells, which is what camouflages
   * a real tell among fidgeting.
   */
  idles?: string[]
}

export type Quirk = {
  name: string
  apply: (ctx: DecisionContext) => Decision | null
}

export type Tell = {
  /** Animation/state key. In Phase 3 this is a console string. */
  signal: string
  /** How the tell reads in words, third person: "steeples his fingers". */
  text: string
  correlate: 'strong' | 'weak' | 'bluffing' | 'tilted'
  /** 0..1 — how often it's honest. 1.0 is a beginner, 0.6 is a good player. */
  reliability: number
}

// ---------------------------------------------------------------------------

export const DRACULA: Personality = {
  id: 'dracula',
  name: 'Dracula',
  aggression: 0.35,
  tightness: 0.78,
  bluffFrequency: 0.12,
  tiltSensitivity: 0.05,
  adaptivity: 0.55,
  noise: 0,
  // Traps: with a monster before the river, just call and let them hang
  // themselves rather than raising them off the hand.
  quirks: buildQuirks([{ type: 'trap', minEquity: 0.82 }]),
  tells: [
    { signal: 'steeples_fingers', text: 'steeples his fingers', correlate: 'strong', reliability: 0.72 },
    { signal: 'glances_at_exit', text: 'glances toward the exit', correlate: 'bluffing', reliability: 0.6 },
  ],
}

export const YETI: Personality = {
  id: 'yeti',
  name: 'Abominable Snowman',
  aggression: 0.2,
  tightness: 0.38,
  bluffFrequency: 0.02,
  tiltSensitivity: 0.3,
  adaptivity: 0.05,
  noise: 0,
  // The calling station. Will not fold to a single small bet, ever. You
  // cannot bluff him -- which is exactly what makes him a good teacher for
  // value betting.
  quirks: buildQuirks([{ type: 'calls_small', maxBB: 2 }]),
  tells: [
    { signal: 'stares_blankly', text: 'stares blankly at the board', correlate: 'weak', reliability: 0.45 },
    { signal: 'shifts_forward', text: 'shifts forward in his seat', correlate: 'strong', reliability: 0.85 },
  ],
}

export const CLEOPATRA: Personality = {
  id: 'cleopatra',
  name: 'Cleopatra',
  aggression: 0.72,
  tightness: 0.5,
  bluffFrequency: 0.34,
  tiltSensitivity: 0.15,
  adaptivity: 0.9,
  noise: 0,
  // Punishes passivity. If opponents have been folding to aggression, she
  // attacks regardless of her cards.
  quirks: buildQuirks([
    { type: 'punish_passivity', foldRate: 0.55, chance: 0.6, potFraction: 0.66 },
  ]),
  tells: [
    { signal: 'adjusts_headdress', text: 'adjusts her headdress', correlate: 'bluffing', reliability: 0.55 },
    { signal: 'goes_still', text: 'goes completely still', correlate: 'strong', reliability: 0.68 },
  ],
}

/**
 * The human seat. Its dials are never read: Game routes that seat to
 * onHumanTurn instead of decide(). It exists because a Seat still needs a
 * name and somewhere to keep stats, like every other seat at the table.
 */
export const HUMAN: Personality = {
  id: 'human',
  name: 'You',
  aggression: 0,
  tightness: 0,
  bluffFrequency: 0,
  tiltSensitivity: 0,
  adaptivity: 0,
  noise: 0,
  quirks: [],
  tells: [],
}

/**
 * The Phase 2 balance instrument. These three are NOT the tour roster -- the
 * Snowman and Cleopatra are not in it at all -- and the tour's Dracula lives
 * in data/characters/dracula.json. They stay here, frozen, because every
 * tuning number in CLAUDE.md was measured against exactly this cast, and
 * changing them would make old and new runs incomparable.
 */
export const CAST = [DRACULA, YETI, CLEOPATRA]
