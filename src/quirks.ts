import { raiseTo, type DecisionContext, type Decision } from './decide.js'
import type { Quirk } from './personality.js'

/**
 * THE QUIRK LIBRARY.
 *
 * A quirk is a small rule that overrides the shared decision function when
 * its condition holds. Every quirk here is GENERIC: it knows nothing about who
 * is using it, only the numbers it was configured with. A character picks
 * quirks by name in its data file and tunes them with parameters:
 *
 *   "quirks": [{ "type": "trap", "minEquity": 0.82 }]
 *
 * This is non-negotiable #1 carried one step further. decide() never branches
 * on identity, and neither does anything in here, so a new character is a
 * JSON file and never a code change. If a character needs behaviour none of
 * these can express, the answer is a NEW generic quirk with parameters -- not
 * a branch on an id.
 *
 * Thresholds on hand quality read ctx.strength, the scale they were tuned on;
 * a question about the PRICE reads ctx.equity (see DecisionContext).
 *
 * Each quirk returns a Decision to force it, or null to defer to decide().
 * decide() drops any forced action that is not legal, so a quirk may be
 * optimistic about legality but must never assume it.
 */

export type QuirkSpec = { type: string } & Record<string, number | string | boolean>

type Factory = (params: Record<string, any>) => (ctx: DecisionContext) => Decision | null

/**
 * A bet of `fraction` of the pot; facing a bet, a raise that calls first and
 * then adds that fraction of the pot (see raiseTo). Clamped to the table.
 */
const potSized = (ctx: DecisionContext, fraction: number): number => raiseTo(ctx, fraction)

const raiseVerb = (ctx: DecisionContext) =>
  ctx.legal.includes('raise') ? 'raise' : 'bet'

const canRaise = (ctx: DecisionContext) =>
  ctx.legal.includes('raise') || ctx.legal.includes('bet')

export const QUIRKS: Record<string, { summary: string; make: Factory }> = {
  trap: {
    summary: 'With a monster before the river, checks or flats instead of raising.',
    make: ({ minEquity = 0.82 }) => (ctx) => {
      if (ctx.street === 'river') return null
      if (ctx.strength < minEquity) return null
      if (ctx.toCall === 0) return { action: 'check', reason: 'trap: checking a monster' }
      if (ctx.legal.includes('call')) return { action: 'call', reason: 'trap: flatting a monster' }
      return null
    },
  },

  calls_small: {
    summary: 'Will not fold to a small bet (up to maxBB big blinds).',
    make: ({ maxBB = 2, chance = 1 }) => (ctx) => {
      if (ctx.toCall === 0) return null
      if (ctx.toCall > ctx.bigBlind * maxBB) return null
      if (!ctx.legal.includes('call')) return null
      // Checked before the draw so a certain quirk costs no randomness: the
      // Phase 2 sim numbers depend on the exact draw sequence.
      if (chance < 1 && ctx.rng() > chance) return null
      return { action: 'call', reason: 'never folds to a small bet' }
    },
  },

  punish_passivity: {
    summary: 'Bets into a table that has been folding too often.',
    make: ({ foldRate = 0.55, chance = 0.6, potFraction = 0.66 }) => (ctx) => {
      if (ctx.opponentFoldRate < foldRate) return null
      if (ctx.toCall > 0) return null
      if (!ctx.legal.includes('bet')) return null
      if (ctx.rng() > chance) return null
      const size = Math.min(
        ctx.stack,
        Math.max(ctx.minRaise, Math.round(ctx.pot * potFraction)),
      )
      return { action: 'bet', betSize: size, reason: 'punishing a folder' }
    },
  },

  charge: {
    summary: 'Facing a bet with a decent hand, raises rather than calls.',
    make: ({ minEquity = 0.6, chance = 0.7, potFraction = 1 }) => (ctx) => {
      if (ctx.toCall === 0 || ctx.strength < minEquity) return null
      if (!canRaise(ctx)) return null
      if (ctx.rng() > chance) return null
      return {
        action: raiseVerb(ctx),
        betSize: potSized(ctx, potFraction),
        reason: 'charge: raising instead of calling',
      }
    },
  },

  committed: {
    summary: 'Once a share of the stack is in the pot, will not fold a hand with a real chance.',
    // Stubborn, not suicidal: the floor is what keeps a busted 8-3 out. Until
    // the game loop counted chips put in correctly this never fired at all.
    make: ({ fraction = 0.35, minEquity = 0.2 }) => (ctx) => {
      if (ctx.toCall === 0) return null
      const invested = ctx.committed / Math.max(1, ctx.committed + ctx.stack)
      if (invested < fraction) return null
      if (ctx.equity < minEquity) return null
      if (!ctx.legal.includes('call')) return null
      return { action: 'call', reason: 'committed: will not back down' }
    },
  },

  river_bluff: {
    summary: 'Checked to on the river with nothing, tells a story.',
    make: ({ chance = 0.3, maxEquity = 0.35, potFraction = 0.75 }) => (ctx) => {
      if (ctx.street !== 'river' || ctx.toCall > 0) return null
      if (ctx.strength > maxEquity) return null
      if (!ctx.legal.includes('bet')) return null
      if (ctx.rng() > chance) return null
      return {
        action: 'bet',
        betSize: potSized(ctx, potFraction),
        reason: 'bluff: a river story',
      }
    },
  },

  check_raise: {
    summary: 'Checks strength on the flop and turn, then raises when bet into.',
    make: ({ minEquity = 0.75, chance = 0.6, potFraction = 1.1 }) => (ctx) => {
      if (ctx.street === 'preflop' || ctx.street === 'river') return null
      if (ctx.strength < minEquity) return null
      if (ctx.toCall === 0) {
        if (!ctx.legal.includes('check')) return null
        if (ctx.rng() > chance) return null
        return { action: 'check', reason: 'check-raise: lying in wait' }
      }
      if (!canRaise(ctx)) return null
      return {
        action: raiseVerb(ctx),
        betSize: potSized(ctx, potFraction),
        reason: 'check-raise: springing it',
      }
    },
  },

  overbet: {
    summary: 'With a strong hand, bets far more than the pot.',
    make: ({ minEquity = 0.75, potFraction = 1.5, chance = 0.7 }) => (ctx) => {
      if (ctx.strength < minEquity || !canRaise(ctx)) return null
      if (ctx.rng() > chance) return null
      return {
        action: raiseVerb(ctx),
        betSize: potSized(ctx, potFraction),
        reason: 'value: overbetting',
      }
    },
  },

  short_shove: {
    summary: 'Short-stacked, moves all in with any reasonable hand.',
    make: ({ maxBB = 12, minEquity = 0.4 }) => (ctx) => {
      if (ctx.effectiveStackBB > maxBB) return null
      if (ctx.strength < minEquity || !canRaise(ctx)) return null
      return { action: raiseVerb(ctx), betSize: ctx.maxRaise, reason: 'short stack: all in' }
    },
  },

  steal: {
    summary: 'Raises unopened pots before the flop with a wide range.',
    make: ({ chance = 0.5, minEquity = 0.3, bigBlinds = 2.5 }) => (ctx) => {
      if (ctx.street !== 'preflop') return null
      if (ctx.toCall > ctx.bigBlind) return null // someone has already raised
      if (ctx.strength < minEquity || !canRaise(ctx)) return null
      if (ctx.rng() > chance) return null
      const size = Math.max(ctx.minRaise, Math.min(ctx.maxRaise, Math.round(ctx.bigBlind * bigBlinds)))
      return { action: raiseVerb(ctx), betSize: size, reason: 'steal: raising an unopened pot' }
    },
  },

  needle: {
    summary: 'When checked to, makes small probing bets regardless of the hand.',
    make: ({ chance = 0.35 }) => (ctx) => {
      if (ctx.street === 'preflop' || ctx.toCall > 0) return null
      if (!ctx.legal.includes('bet')) return null
      if (ctx.rng() > chance) return null
      return { action: 'bet', betSize: ctx.minRaise, reason: 'needle: a small question' }
    },
  },

  snap: {
    summary: 'Never slow-plays: raises every strong hand at once.',
    make: ({ minEquity = 0.7, potFraction = 0.9 }) => (ctx) => {
      if (ctx.strength < minEquity || !canRaise(ctx)) return null
      return {
        action: raiseVerb(ctx),
        betSize: potSized(ctx, potFraction),
        reason: 'snap: no patience for a big hand',
      }
    },
  },

  whim: {
    summary: 'Now and then does something unaccountable, just to see.',
    make: ({ chance = 0.1 }) => (ctx) => {
      if (ctx.rng() > chance) return null
      const options = ctx.legal.filter((a) => a !== 'fold')
      if (options.length === 0) return null
      const action = options[Math.floor(ctx.rng() * options.length)]
      if (action === 'bet' || action === 'raise') {
        return { action, betSize: potSized(ctx, 0.5 + ctx.rng()), reason: 'whim: curious what happens' }
      }
      return { action, reason: 'whim: curious what happens' }
    },
  },

  heads_up_pressure: {
    summary: 'Alone in a pot with one opponent, applies relentless pressure.',
    // Pressure is betting when checked to and raising a hand that is ahead.
    // Facing a bet after the flop, strength is measured against the bettor's
    // range, and half of that is middle pair: raising it into a bet is not
    // pressure, it is a donation. So a raise there needs raiseEquity.
    make: ({ minEquity = 0.45, raiseEquity = 0.62, chance = 0.6, potFraction = 0.75 }) => (ctx) => {
      if (ctx.numOpponents !== 1) return null
      const need = ctx.toCall > 0 && ctx.street !== 'preflop' ? Math.max(minEquity, raiseEquity) : minEquity
      if (ctx.strength < need || !canRaise(ctx)) return null
      if (ctx.rng() > chance) return null
      return {
        action: raiseVerb(ctx),
        betSize: potSized(ctx, potFraction),
        reason: 'heads-up: pressing',
      }
    },
  },

  patient: {
    summary: 'Folds to any raise before the flop without a premium hand, unless it is an ordinary open against the big blind or an all-in that costs next to nothing.',
    make: ({ minEquity = 0.6, maxAllInCost = 0.1, openBB = 2 }) => (ctx) => {
      if (ctx.street !== 'preflop') return null
      // Only a real raise: more than openBB big blinds to call. An ordinary
      // 2.5-3bb open costs the big blind 1.5-2bb, and defending a pot it is
      // already in is not a test of patience. While every AI raise was a
      // min-raise this read "more than one big blind", which let the blind
      // defend; with real opens it would fold every blind to every open.
      if (ctx.toCall <= ctx.bigBlind * openBB) return null
      if (ctx.strength >= minEquity) return null
      if (ctx.effectiveStackBB < 12) return null // patience ends when the stack does
      // A short stack's shove for a sliver of their chips is not a test of patience.
      if (ctx.facingAllIn && ctx.toCall <= ctx.stack * maxAllInCost) return null
      return { action: 'fold', reason: 'patient: waiting for a better spot' }
    },
  },

  chaser: {
    summary: 'Calls cheap bets on the flop and turn to see another card.',
    make: ({ maxPotFraction = 0.5, minEquity = 0.2 }) => (ctx) => {
      if (ctx.street !== 'flop' && ctx.street !== 'turn') return null
      if (ctx.toCall === 0 || ctx.strength < minEquity) return null
      if (ctx.toCall > ctx.pot * maxPotFraction) return null
      if (!ctx.legal.includes('call')) return null
      return { action: 'call', reason: 'chasing: one more card' }
    },
  },

  berserk: {
    summary: 'Once rattled, stops thinking and moves in.',
    make: ({ tilt = 0.25, minEquity = 0.35 }) => (ctx) => {
      if (ctx.tilt < tilt) return null
      if (ctx.strength < minEquity || !canRaise(ctx)) return null
      return { action: raiseVerb(ctx), betSize: ctx.maxRaise, reason: 'berserk: all in' }
    },
  },
}

/** Builds a character's quirks from their data. Throws on an unknown name. */
export function buildQuirks(specs: QuirkSpec[]): Quirk[] {
  return specs.map((spec) => {
    const entry = QUIRKS[spec.type]
    if (!entry) throw new Error(`unknown quirk "${spec.type}"`)
    const { type, ...params } = spec
    return { name: type, apply: entry.make(params) }
  })
}
