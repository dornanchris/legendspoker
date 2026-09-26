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
  /**
   * Chips already in front of this player in THIS betting round, a posted
   * blind included. A raise is sized from here: call first, then add.
   */
  bet: number
  /**
   * This player made the last bet or raise of the previous street: a bet now
   * continues a story the table has already been told.
   */
  initiative: boolean
  /**
   * Cards that would complete a draw (see drawOuts): 9 a flush draw, 8 an
   * open-ender, 4 a gutshot, 0 without one. Chooses which hands semi-bluff.
   */
  outs: number
  /** How many draws the board offers, 0 dry to 1 wet (see boardWetness). */
  wet: number
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

  // Tightness decides which pots to enter, and a price does not change what a
  // tight player will play: to them 8-3 is not a hand at any discount. Pot
  // odds alone let it in -- a small blind's half-bet, a big blind facing a
  // small raise -- and Javert, one of the tightest at the table, was showing
  // down 8-3. So before the flop a tight player needs a hand worth playing,
  // whatever it costs. Against an all-in, or short-stacked, the price alone
  // decides (see below). A free check in the big blind is not an entry.
  // Tilt loosens it -- that is character -- but a stack of 12-20bb does not:
  // shortness is a reason to shove wider, not to call with rags. Capped so
  // the tightest can still play a small pair (0.35) or A-9.
  const entryFloor = Math.min(0.33, Math.max(0, (p.tightness - tiltEffect * 0.6 - 0.5) * 1.3))
  if (
    ctx.street === 'preflop' && ctx.toCall > 0 && !ctx.facingAllIn &&
    ctx.effectiveStackBB >= 12 && ctx.strength < entryFloor
  ) {
    return { action: 'fold', reason: `not a hand to play (${pct(ctx.strength)})` }
  }

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
  const bar = valueBar(ctx, required, margin, effectiveAggression)
  if (ctx.equity > bar) {
    if (canRaise && ctx.rng() < effectiveAggression) {
      return {
        action: raiseAction,
        betSize: sizeBet(ctx, effectiveAggression),
        reason: `value (${pct(ctx.equity)} vs ${pct(bar)} needed)`,
      }
    }
    if (ctx.toCall === 0 && ctx.legal.includes('check')) {
      return { action: 'check', reason: 'strong but passive this street' }
    }
    // An aggressive player opens some hands they would not limp with: raise
    // or fold, never a call the price does not justify.
    if (ctx.legal.includes('call') && ctx.equity >= required) {
      return { action: 'call', reason: `value call (${pct(ctx.equity)})` }
    }
  }

  // --- Bluff or semi-bluff --------------------------------------------------
  // A hand not good enough to bet for value. Checked to, it may bet instead of
  // checking; facing a bet, it may raise instead of folding -- or, holding a
  // real draw, instead of calling. Bluffing gets more attractive with fewer
  // opponents and on later streets, where the story is more believable and
  // there's more to win. WHICH hands bluff is bluffWeight's job.
  if (canRaise && (ctx.toCall === 0 || ctx.equity < required || ctx.outs >= 8)) {
    const streetBoost = { preflop: 0.4, flop: 0.8, turn: 1.0, river: 1.2 }[ctx.street]
    const oppPenalty = Math.pow(0.55, ctx.numOpponents - 1)
    const adaptBoost = 1 + (ctx.opponentFoldRate - 0.4) * p.adaptivity
    const bluffChance =
      p.bluffFrequency * streetBoost * oppPenalty * adaptBoost * bluffWeight(ctx)
    if (ctx.rng() < bluffChance) {
      return {
        action: raiseAction,
        betSize: sizeBet(ctx, effectiveAggression),
        reason: ctx.outs >= 4
          ? `bluff with a draw (${ctx.outs} outs, ${pct(ctx.equity)})`
          : `bluff (${pct(ctx.equity)} equity)`,
      }
    }
  }

  // --- Marginal: check, or call if the price is right ----------------------
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

  // --- Weak: check or fold ---------------------------------------------------
  if (ctx.toCall === 0 && ctx.legal.includes('check')) {
    return { action: 'check', reason: 'weak, checking' }
  }

  return { action: 'fold', reason: `fold (${pct(ctx.equity)} < ${pct(required)})` }
}

/**
 * The equity a hand needs to bet or raise with.
 *
 * Facing a bet it is the price plus a cushion. But with nothing to call the
 * price is zero, and a bar of "zero plus a cushion" made anything over ~20%
 * strong: 4-2 raised from the big blind, air bet the flop at the aggression
 * rate, bottom pair raised a bet. So the bar never drops below a real hand.
 *
 * Before the flop, with no raise yet, it is a hand worth opening with (the
 * strength score of a first-in call, plus the tightness margin), and wider
 * for an aggressive player: a good player opens by raising, not limping, and
 * an aggressive one opens more hands. After the flop, it is a clear share
 * above an even split of the pot among the players in it: heads-up about
 * two-thirds, which is top pair against any two cards or a bettor's range.
 * Tightness stays out of that one: it is about which pots to enter, and a
 * tight player who has entered bets a made hand like anyone else (with the
 * margin in, the tight characters checked their top pairs and lost value).
 */
function valueBar(ctx: DecisionContext, required: number, margin: number, aggression: number): number {
  if (ctx.street === 'preflop') {
    if (ctx.toCall > ctx.bigBlind) return required + 0.15
    return OPEN + margin - 0.2 * (aggression - 0.5)
  }
  const fair = 1 / (ctx.numOpponents + 1)
  return Math.max(required + 0.15, fair + (1 - fair) * VALUE_SHARE)
}

/** The strength score a first-in call costs: one big blind into the blinds. */
const OPEN = 0.4

/** How far above an even split a hand must be to bet for value after the flop. */
const VALUE_SHARE = 0.35

/**
 * Which hands bluff, as a multiplier on the bluff chance. Not uniformly any
 * hand below the line -- that is how 7-2 got raised and air got bet into
 * three players. Before the flop, hands with something to play for: the
 * strength score already rewards suited, connected and high cards, and gives
 * 7-2 nothing. On the flop and turn, draws first: called, they can still
 * win. Then the player who raised last street, whose bet now is the natural
 * next line of the story (a continuation bet). On the river, and with no
 * draw, only hands that cannot win a showdown -- a hand that can is a reason
 * to check, not to bet.
 */
function bluffWeight(ctx: DecisionContext): number {
  if (ctx.street === 'preflop') return clamp((ctx.strength - 0.2) / 0.2, 0, 1.5)
  if (ctx.outs >= 8) return 2.5
  if (ctx.outs >= 4) return 1.2
  const fair = 1 / (ctx.numOpponents + 1)
  if (ctx.equity >= fair) return 0.15
  if (ctx.initiative && ctx.toCall === 0 && ctx.street !== 'river') return 1.5
  // Raising a bettor with nothing needs them to fold a hand they chose to
  // bet; betting into a check only needs them to fold one they checked.
  const facing = ctx.toCall > 0 ? 0.4 : 1
  return (ctx.street === 'river' ? 1.2 : 0.5) * facing
}

/**
 * Bet and raise sizes. A raise calls first and then adds a share of the pot:
 * sizing it as a share of a pot that already holds the bet made nearly half
 * of all raises a min-raise, which offers every draw the price it wants.
 *
 * The share grows with aggression and with the draws the board offers (a
 * made hand charges them), and wobbles a little. It does NOT grow with the
 * hand: a size that tracks strength is a tell anyone can learn, so a bluff
 * is sized exactly like a value bet. Before the flop it is larger, so an
 * open is two and a half to three big blinds, not a min-raise.
 */
function sizeBet(ctx: DecisionContext, aggression: number): number {
  const base = ctx.street === 'preflop' ? 0.6 : 0.45
  const share = base + aggression * 0.25 + ctx.wet * 0.2 + (ctx.rng() - 0.5) * 0.15
  return raiseTo(ctx, share)
}

/**
 * The raise-to amount for a bet of `share` of the pot: call what is owed,
 * then add that share of the pot as it stands after the call. With nothing
 * owed it is simply that share of the pot. Clamped to what the table allows.
 */
export function raiseTo(ctx: DecisionContext, share: number): number {
  let target = Math.round(ctx.bet + ctx.toCall + share * (ctx.pot + ctx.toCall))

  // Leaving a stub behind is the worst of both worlds: the chips are
  // committed but there is not enough left to make anyone fold. If the bet
  // would leave under 1.5bb back, put the rest in. Deep stacks never reach
  // this branch, so it only bites where it should.
  if (target > ctx.maxRaise - ctx.bigBlind * 1.5) target = ctx.maxRaise

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
