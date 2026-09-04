import type { Personality, Tell } from './personality.js'

export type Action = 'fold' | 'check' | 'call' | 'bet' | 'raise'

export type Decision = {
  action: Action
  betSize?: number
  reason: string
}

export type DecisionContext = {
  personality: Personality
  /** 0..1 estimate of winning at showdown. */
  equity: number
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
  rng: () => number
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
  const margin = (effectiveTightness - 0.5) * 0.25
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
/**
 * Which tell fires, and which SLOT it occupies in the character's vocabulary.
 * The slot is the tell's index in `personality.tells` -- 0, 1, 2 -- and it is
 * what the puppet contract fires as tellA/tellB/tellC. What a slot means is
 * decided inside the character's Rive file, never here.
 */
export type EmittedTell = { tell: Tell; slot: number }

/**
 * ALWAYS call this, listener or not: it draws from the shared RNG, so making
 * it conditional makes the same seed play a different game depending on
 * whether anything is watching. Returning null still costs its draws.
 */
export function emitTell(
  p: Personality,
  ctx: { equity: number; decision: Decision; tilt: number },
  rng: () => number,
): EmittedTell | null {
  const emit = (t: Tell | undefined): EmittedTell | null =>
    t ? { tell: t, slot: p.tells.indexOf(t) } : null
  const pick = (from: Tell[]): Tell | undefined =>
    from.length ? from[Math.floor(rng() * from.length)] : undefined

  // Draw first and unconditionally, so the number of draws does not depend on
  // which branch is taken -- the stream position has to be the same whatever
  // this character's dials say.
  const noiseRoll = rng()
  const honestRoll = rng()

  const state = ctx.tilt > 0.5
    ? 'tilted'
    : ctx.decision.reason.startsWith('bluff')
      ? 'bluffing'
      : ctx.equity > 0.65
        ? 'strong'
        : 'weak'

  // NOISE-TO-SIGNAL: the second difficulty axis (BUILD-PLAN 2.4). Skill goes
  // UP through the dials; legibility goes DOWN through this. A high-noise
  // character fires tells that correlate with nothing, so the player cannot
  // learn them by watching one signal -- only a coincident CLUSTER during a
  // live hand means anything. Death having no tells at all is the endpoint of
  // this curve, not a special case.
  if (noiseRoll < p.noiseToSignal) return emit(pick(p.tells))

  const honest = p.tells.filter((t) => t.correlate === state)
  if (honest.length === 0) return null

  const tell = pick(honest)
  if (!tell) return null
  if (honestRoll < tell.reliability) return emit(tell)

  // Unreliable: fire a different tell instead, misleading the player.
  return emit(pick(p.tells.filter((t) => t !== tell)))
}
