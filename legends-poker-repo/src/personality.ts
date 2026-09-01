import type { DecisionContext, Decision } from './decide.js'

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
   * 1-2 rules that break the pattern. This is what makes a character
   * memorable rather than a slightly different set of numbers — dials
   * alone converge on same-y bots.
   *
   * Return null to defer to the general decision function.
   */
  quirks: Quirk[]

  /** Observable signals, correlated with hidden state plus noise. */
  tells: Tell[]
}

export type Quirk = {
  name: string
  apply: (ctx: DecisionContext) => Decision | null
}

export type Tell = {
  /** Animation/state key. In Phase 3 this is a console string. */
  signal: string
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
  quirks: [
    {
      // Traps: with a monster before the river, just call and let them hang
      // themselves rather than raising them off the hand.
      name: 'trap',
      apply: (ctx) => {
        if (ctx.street === 'river') return null
        if (ctx.equity < 0.82) return null
        if (ctx.toCall === 0) return { action: 'check', reason: 'trap: checking a monster' }
        if (ctx.legal.includes('call')) return { action: 'call', reason: 'trap: flatting a monster' }
        return null
      },
    },
  ],
  tells: [
    { signal: 'steeples_fingers', correlate: 'strong', reliability: 0.72 },
    { signal: 'glances_at_exit', correlate: 'bluffing', reliability: 0.6 },
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
  quirks: [
    {
      // The calling station. Will not fold to a single small bet, ever.
      // You cannot bluff him — which is exactly what makes him a good
      // teacher for value betting.
      name: 'never_folds_small',
      apply: (ctx) => {
        if (ctx.toCall === 0) return null
        if (ctx.toCall > ctx.bigBlind * 2) return null
        if (!ctx.legal.includes('call')) return null
        return { action: 'call', reason: 'never folds to a small bet' }
      },
    },
  ],
  tells: [
    { signal: 'stares_blankly', correlate: 'weak', reliability: 0.45 },
    { signal: 'shifts_forward', correlate: 'strong', reliability: 0.85 },
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
  quirks: [
    {
      // Punishes passivity. If an opponent has been folding to aggression,
      // she attacks regardless of her cards.
      name: 'punish_passivity',
      apply: (ctx) => {
        if (ctx.opponentFoldRate < 0.55) return null
        if (ctx.toCall > 0) return null
        if (!ctx.legal.includes('bet')) return null
        if (ctx.rng() > 0.6) return null
        const size = Math.min(
          ctx.stack,
          Math.max(ctx.minRaise, Math.round(ctx.pot * 0.66)),
        )
        return { action: 'bet', betSize: size, reason: 'punishing a folder' }
      },
    },
  ],
  tells: [
    { signal: 'adjusts_headdress', correlate: 'bluffing', reliability: 0.55 },
    { signal: 'goes_still', correlate: 'strong', reliability: 0.68 },
  ],
}

export const CAST = [DRACULA, YETI, CLEOPATRA]
