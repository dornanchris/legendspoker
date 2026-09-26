import type { Personality, Tell } from './personality.js'

export type Action = 'fold' | 'check' | 'call' | 'bet' | 'raise'

export type Decision = {
  action: Action
  betSize?: number
  reason: string
  /**
   * Human seat only: how long the player took, in ms. Recorded with the
   * decision so a replayed game carries it too -- Holmes reads it.
   */
  thinkMs?: number
}

export type DecisionContext = {
  personality: Personality
  /**
   * 0..1 estimate of winning at showdown -- against the range a bet like the
   * one being faced comes from, not against any two cards (see betRange).
   */
  equity: number
  /**
   * The hand's quality on the scale the quirk thresholds were tuned on:
   * before the flop the Chen-style strength score, after it the same as
   * equity. For "is this a premium hand" questions; use equity for prices.
   */
  strength: number
  pot: number
  toCall: number
  stack: number
  bigBlind: number
  /**
   * The acting player's own stack measured in big blinds. Drives short-stack
   * play; in a cash game this is effectively constant, in a tournament it is
   * the number that matters most as the blinds climb.
   */
  effectiveStackBB: number
  minRaise: number
  maxRaise: number
  street: 'preflop' | 'flop' | 'turn' | 'river'
  legal: Action[]
  numOpponents: number
  /** 0..1, decays over hands. Set by the game loop after bad beats. */
  tilt: number
  /** Observed fold-to-aggression rate of the table, for adaptivity. */
  opponentFoldRate: number
  /**
   * Chips this player has already put into THIS hand, blinds included. Lets a
   * quirk know when someone is pot-committed. Read only by quirks.
   */
  committed: number
  /**
   * The bet being faced is someone's whole stack: calling ends the betting,
   * so there is nothing more to lose than the call itself.
   */
  facingAllIn: boolean
  rng: () => number
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

/**
 * How strong a bet says the bettor is: the share of hands, strongest first,
 * that a bet like this usually comes from. 1 is any two cards.
 *
 * Deliberately plain. A bigger bet comes from a stronger hand, and a bigger
 * raise before the flop from a narrower range -- but a SHORT stack moving all
 * in is shoving to survive, so its range is wide, and widest when shortest.
 * Each character believes this only as far as their `betRespect` dial says;
 * the game loop narrows equity with the result (see handStrength).
 */
export function betRange(b: {
  street: string
  toCall: number
  pot: number
  bigBlind: number
  allIn: boolean
  /** Everything the bettor has put in this hand, in big blinds. */
  bettorBB: number
}): number {
  if (b.toCall <= 0) return 1
  let range: number
  if (b.street === 'preflop') {
    if (b.toCall <= b.bigBlind) return 1 // only the blind to match
    range = clamp(0.55 - 0.06 * (b.toCall / b.bigBlind), 0.12, 0.5)
    if (b.allIn && b.bettorBB <= 20) range = Math.max(range, clamp(0.75 - 0.03 * b.bettorBB, 0.15, 0.7))
  } else {
    // Measured against what the bettor actually held (see the calibration
    // notes in CLAUDE.md): pot-sized bets and river bets are stronger than a
    // plain slope says -- by the river there are no draws left to bet.
    const before = Math.max(1, b.pot - b.toCall)
    range = clamp(0.8 - 0.4 * (b.toCall / before) - (b.street === 'river' ? 0.08 : 0), 0.2, 0.75)
  }
  return range
}

/**
 * ONE decision function, shared by every character. Personality lives
 * entirely in the numbers passed in, never in branches on character id.
 *
 * If you ever find yourself writing `if (personality.id === 'dracula')`
 * here, that logic belongs in a quirk instead.
 */
export function decide(ctx: DecisionContext): Decision {
  const p = ctx.personality

  // Quirks run first — they are the signature rules that break the pattern.
  for (const q of p.quirks) {
    const forced = q.apply(ctx)
    if (forced && ctx.legal.includes(forced.action)) return forced
  }

  // Tilt makes a player looser and more aggressive, scaled by sensitivity.
  const tiltEffect = ctx.tilt * p.tiltSensitivity

  // Stack depth. Below ~20bb, waiting for a premium stops being an option:
  // the blinds eat the stack faster than a better spot arrives, so a short
  // stack has to widen and lead rather than call. Neutral at 20bb and above,
  // which leaves deep play unchanged -- including the cash sim, which always
  // starts a hand at 100bb.
  const shortness = Math.max(0, 1 - ctx.effectiveStackBB / 20)

  const effectiveTightness = Math.max(
    0,
    p.tightness - tiltEffect * 0.6 - shortness * 0.35,
  )
  const effectiveAggression = Math.min(
    1,
    p.aggression + tiltEffect * 0.5 + shortness * 0.3,
  )

  // Pot odds: the equity we need for calling to break even.
  const potOdds = ctx.toCall === 0 ? 0 : ctx.toCall / (ctx.pot + ctx.toCall)

  // Tightness raises the bar for entering a pot. A tight player wants a
  // margin over the break-even point; a loose one will take it thin.
  let margin = (effectiveTightness - 0.5) * 0.25
  // Caution is about what a call risks. Against an all-in nothing can follow
  // the call, so when it costs a sliver of the stack -- a short stack's shove
  // into a big one -- the price alone decides, not a tight player's margin.
  if (ctx.facingAllIn && margin > 0) {
    const risk = ctx.toCall / Math.max(1, ctx.stack)
    margin *= Math.min(1, risk / 0.25)
  }
  const required = Math.max(0, potOdds + margin)

  const canRaise = ctx.legal.includes('raise') || ctx.legal.includes('bet')
  const raiseAction: Action = ctx.legal.includes('raise') ? 'raise' : 'bet'

  // --- Strong: value bet or raise -----------------------------------------
  if (ctx.equity > required + 0.15) {
    if (canRaise && ctx.rng() < effectiveAggression) {
      return {
        action: raiseAction,
        betSize: sizeBet(ctx, ctx.equity, effectiveAggression),
        reason:
          ctx.equity > 0.55
            ? `value (${pct(ctx.equity)} vs ${pct(required)} needed)`
            : `probe (${pct(ctx.equity)}, nobody has bet)`,
      }
    }
    if (ctx.toCall === 0 && ctx.legal.includes('check')) {
      return { action: 'check', reason: 'strong but passive this street' }
    }
    if (ctx.legal.includes('call')) {
      return { action: 'call', reason: `value call (${pct(ctx.equity)})` }
    }
  }

  // --- Marginal: call if the price is right --------------------------------
  if (ctx.equity >= required) {
    if (ctx.toCall === 0 && ctx.legal.includes('check')) {
      return { action: 'check', reason: 'marginal, taking a free card' }
    }
    if (ctx.legal.includes('call')) {
      return {
        action: 'call',
        reason: `pot odds (${pct(ctx.equity)} > ${pct(potOdds)})`,
      }
    }
  }

  // --- Weak: bluff, check, or fold -----------------------------------------
  // Bluffing gets more attractive with fewer opponents and on later streets,
  // where the story is more believable and there's more to win.
  const streetBoost = { preflop: 0.4, flop: 0.8, turn: 1.0, river: 1.2 }[ctx.street]
  const oppPenalty = Math.pow(0.55, ctx.numOpponents - 1)
  const adaptBoost = 1 + (ctx.opponentFoldRate - 0.4) * p.adaptivity
  const bluffChance = p.bluffFrequency * streetBoost * oppPenalty * adaptBoost

  if (canRaise && ctx.rng() < bluffChance) {
    return {
      action: raiseAction,
      betSize: sizeBet(ctx, 0.3, effectiveAggression),
      reason: `bluff (${pct(ctx.equity)} equity)`,
    }
  }

  if (ctx.toCall === 0 && ctx.legal.includes('check')) {
    return { action: 'check', reason: 'weak, checking' }
  }

  return { action: 'fold', reason: `fold (${pct(ctx.equity)} < ${pct(required)})` }
}

/** Bet sizing as a fraction of pot, scaled by strength and aggression. */
function sizeBet(ctx: DecisionContext, strength: number, aggression: number): number {
  const fraction = 0.4 + strength * 0.4 + aggression * 0.3
  let target = Math.round(ctx.pot * fraction)

  // Leaving a stub behind is the worst of both worlds: the chips are
  // committed but there is not enough left to make anyone fold. If the bet
  // would leave under 1.5bb back, put the rest in. Deep stacks never reach
  // this branch, so it only bites where it should.
  if (target > ctx.stack - ctx.bigBlind * 1.5) target = ctx.maxRaise

  return Math.max(ctx.minRaise, Math.min(ctx.maxRaise, target))
}

const pct = (n: number) => `${Math.round(n * 100)}%`

/**
 * Tells are derived from the same state that drove the decision — they are
 * not authored separately. `reliability` is how often the signal is honest;
 * the rest of the time it fires anyway and misleads.
 *
 * Design note: in the real build these should be *idle variants*, not
 * triggered one-shots. A tell that fires on cue can't be missed.
 */
export function emitTell(
  p: Personality,
  ctx: { equity: number; decision: Decision; tilt: number },
  rng: () => number,
): Tell | null {
  const state = ctx.tilt > 0.5
    ? 'tilted'
    : ctx.decision.reason.startsWith('bluff')
      ? 'bluffing'
      : ctx.equity > 0.65
        ? 'strong'
        : 'weak'

  const honest = p.tells.filter((t) => t.correlate === state)
  if (honest.length === 0) return null

  const tell = honest[Math.floor(rng() * honest.length)]
  if (rng() < tell.reliability) return tell

  // Unreliable: fire a different tell instead, misleading the player.
  const others = p.tells.filter((t) => t !== tell)
  return others.length ? others[Math.floor(rng() * others.length)] : null
}
