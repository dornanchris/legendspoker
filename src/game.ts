// poker-ts exports the facade as a named `Table`, not a default export.
import pokerPkg from 'poker-ts'
const { Table: Poker } = pokerPkg as any
import { decide, emitTell, type Action, type Decision } from './decide.js'
import { handStrength, type Card } from './equity.js'
import type { Personality } from './personality.js'
import { seededShuffle } from './rng.js'

export type Seat = {
  personality: Personality
  /** 0..1, decays each hand. Raised by losing a big pot. */
  tilt: number
  stats: Stats
}

export type Stats = {
  hands: number
  profit: number
  vpip: number // voluntarily put money in pot (preflop)
  pfr: number // preflop raise
  bets: number
  calls: number
  folds: number
  foldsToAggression: number
  facedAggression: number
  wins: number
  showdowns: number
}

export const newStats = (): Stats => ({
  hands: 0,
  profit: 0,
  vpip: 0,
  pfr: 0,
  bets: 0,
  calls: 0,
  folds: 0,
  foldsToAggression: 0,
  facedAggression: 0,
  wins: 0,
  showdowns: 0,
})

export type BlindLevel = { smallBlind: number; bigBlind: number; ante?: number }

/** poker-ts reports a hand ranking as an enum ordinal; these are its names. */
const RANKINGS = [
  'high card', 'a pair', 'two pair', 'three of a kind', 'a straight',
  'a flush', 'a full house', 'four of a kind', 'a straight flush', 'a royal flush',
]

/**
 * Levels climb until the big blind is a large share of the chips in play,
 * which is what guarantees a table actually ends rather than grinding on
 * forever. The last level is deliberately brutal: at 5000/hand against a
 * 4-handed table of 2000-chip stacks, somebody is all-in immediately.
 */
export const DEFAULT_LEVELS: BlindLevel[] = [
  { smallBlind: 10, bigBlind: 20 },
  { smallBlind: 15, bigBlind: 30 },
  { smallBlind: 25, bigBlind: 50 },
  { smallBlind: 50, bigBlind: 100 },
  { smallBlind: 75, bigBlind: 150 },
  { smallBlind: 100, bigBlind: 200 },
  { smallBlind: 150, bigBlind: 300 },
  { smallBlind: 250, bigBlind: 500 },
  { smallBlind: 400, bigBlind: 800 },
  { smallBlind: 600, bigBlind: 1200 },
  { smallBlind: 1000, bigBlind: 2000 },
  { smallBlind: 1500, bigBlind: 3000 },
  { smallBlind: 2500, bigBlind: 5000 },
]

export type HandEvent =
  | { type: 'deal'; seat: number; hole: Card[] }
  | { type: 'street'; street: string; board: Card[]; stacks: number[] }
  | { type: 'tell'; seat: number; signal: string }
  /** Emitted AFTER the table applies the action, so pot and stacks are the result of it. */
  | {
      type: 'action'
      seat: number
      decision: Decision
      equity: number
      pot: number
      stacks: number[]
    }
  | { type: 'result'; seat: number; delta: number; won: boolean }
  | { type: 'level'; level: number; smallBlind: number; bigBlind: number }
  /**
   * Fired when cards are actually turned over. This is where the player finds
   * out how someone played a hand they folded to, which the design doc calls
   * the main source of reads -- so it is a first-class event, not a detail of
   * 'result'.
   *
   * Structured PER POT, deliberately. Flattening to "who got paid" makes a
   * split pot and a main-pot/side-pot pair indistinguishable, which is
   * exactly the question a player asks when two names come up as winners.
   */
  | {
      type: 'showdown'
      /**
       * The complete final board. When everyone is all-in early, poker-ts runs
       * the remaining cards out internally and no further 'street' events
       * fire -- there is nobody left to act -- so a display driven only by
       * those events would still be showing a flop at showdown.
       */
      board: Card[]
      revealed: { seat: number; hole: Card[] }[]
      pots: {
        amount: number
        /** More than one seat here means the pot was SPLIT. */
        winners: number[]
        /** e.g. "two pair". Absent when the pot was never contested. */
        ranking?: string
        /** The five cards that actually won it, for highlighting. */
        cards?: Card[]
      }[]
    }
  /** `place` is the finishing position: 1 is the winner, so 4 busts first. */
  | { type: 'eliminated'; seat: number; place: number }

/**
 * What a human seat is handed on their turn. Deliberately NOT a
 * DecisionContext: it carries no equity estimate and no opponent hole cards,
 * because handing those to the player would solve the game for them. They get
 * exactly what someone sitting at the table can see.
 */
export type TurnView = {
  seat: number
  hole: Card[]
  /** Every seat's chips, so the view the player acts on is self-consistent. */
  stacks: number[]
  board: Card[]
  pot: number
  toCall: number
  stack: number
  bigBlind: number
  street: 'preflop' | 'flop' | 'turn' | 'river'
  legal: Action[]
  minRaise: number
  maxRaise: number
}

export type GameOptions = {
  smallBlind: number
  bigBlind: number
  buyIn: number
  rollouts: number
  rng: () => number
  onEvent?: (e: HandEvent) => void

  /**
   * 'cash' resets every stack to the buy-in before each hand, which measures
   * decision quality rather than survivorship and is what keeps the tuning
   * numbers in sim.ts comparable across runs. It is the balance instrument;
   * leave it alone.
   *
   * 'tournament' is how a table is actually played: stacks persist, busted
   * players are removed, blinds climb, and the table ends when one player
   * holds every chip.
   */
  mode: 'cash' | 'tournament'

  /**
   * Seat played by a human. That seat never calls decide() -- it awaits
   * onHumanTurn instead -- so it needs no dials, and no equity is computed
   * for it.
   */
  humanSeat?: number
  /** Resolves with the human's action. Awaited, so it can take as long as it likes. */
  onHumanTurn?: (view: TurnView) => Promise<Decision>

  /** Tournament only. */
  levels: BlindLevel[]
  /**
   * Levels advance on hands played, never on wall-clock time. Presentation
   * speed must never change how a hand resolves, and a clock-driven schedule
   * would make a fast-forwarded table play differently from a watched one.
   *
   * 25 puts the median 3-handed table near 68 hands. A fourth seat lengthens
   * it, so revisit once the roster has four.
   */
  handsPerLevel: number
}

export class Game {
  private table: any
  private seats: Seat[]
  private button = 0
  private opts: GameOptions
  private handsPlayed = 0
  private level = 0
  /** Seat indexes in bust order, first out first. */
  private bustOrder: number[] = []

  constructor(personalities: Personality[], opts: Partial<GameOptions> = {}) {
    this.opts = {
      smallBlind: 10,
      bigBlind: 20,
      buyIn: 2000,
      rollouts: 60,
      rng: Math.random,
      mode: 'cash',
      levels: DEFAULT_LEVELS,
      handsPerLevel: 25,
      ...opts,
    }
    this.seats = personalities.map((p) => ({
      personality: p,
      tilt: 0,
      stats: newStats(),
    }))
    const opening =
      this.opts.mode === 'tournament'
        ? this.opts.levels[0]
        : { smallBlind: this.opts.smallBlind, bigBlind: this.opts.bigBlind }
    this.table = new Poker(
      { smallBlind: opening.smallBlind, bigBlind: opening.bigBlind },
      personalities.length,
      // The deal draws from the same seeded stream as decisions and equity
      // rollouts, so one seed determines an entire hand. Without this the
      // cards came from crypto.randomInt and nothing was reproducible.
      seededShuffle(this.opts.rng),
    )
    // A tournament seats everyone once and never re-seats: that is the whole
    // point. Cash mode re-seats per hand, in playHand.
    if (this.opts.mode === 'tournament') {
      for (let i = 0; i < this.seats.length; i++) {
        this.table.sitDown(i, this.opts.buyIn)
      }
    }
  }

  getSeats(): Seat[] {
    return this.seats
  }

  /** The big blind currently in force. */
  bigBlind(): number {
    return this.opts.mode === 'tournament'
      ? this.opts.levels[this.level].bigBlind
      : this.opts.bigBlind
  }

  /** Chip counts by seat; 0 for a player who has busted. */
  stacks(): number[] {
    const seated = this.table.seats()
    return this.seats.map((_, i) => seated[i]?.totalChips ?? 0)
  }

  /** Seats that still have chips. */
  survivors(): number[] {
    return this.stacks()
      .map((chips, i) => (chips > 0 ? i : -1))
      .filter((i) => i >= 0)
  }

  /** A table is over when one player holds every chip. */
  isComplete(): boolean {
    return this.opts.mode === 'tournament' && this.survivors().length <= 1
  }

  /** Seat indexes best-to-worst: the chip leader first, first-out last. */
  standings(): number[] {
    return [...this.survivors(), ...[...this.bustOrder].reverse()]
  }

  handCount(): number {
    return this.handsPlayed
  }

  /**
   * Chips still BEHIND each player -- not yet pushed in. Distinct from
   * stacks(), which reports totalChips (behind + current bet). Between hands
   * the two agree; mid-hand they do not, and mixing them up double-counts the
   * live bets, because potTotal() already includes them.
   *
   * Display uses this; survivorship and settlement use stacks().
   */
  stacksBehind(): number[] {
    const seated = this.table.seats()
    return this.seats.map((_, i) => seated[i]?.stack ?? 0)
  }

  /** Everything in the middle: settled pots plus the bets still on the felt. */
  private potTotal(): number {
    const settled = this.table
      .pots()
      .reduce((a: number, p: any) => a + p.size, 0)
    const live = this.table
      .seats()
      .filter(Boolean)
      .reduce((a: number, x: any) => a + x.betSize, 0)
    return settled + live
  }

  /**
   * Plays one hand. Stacks are reset to the buy-in each hand so we measure
   * decision quality rather than tournament survivorship — that keeps the
   * win-rate numbers clean and comparable.
   */
  async playHand(): Promise<void> {
    const { rng, buyIn, rollouts, onEvent, mode, humanSeat, onHumanTurn } = this.opts
    const tournament = mode === 'tournament'
    if (tournament && this.isComplete()) return

    const bigBlind = this.bigBlind()

    if (tournament) {
      this.applyBlindLevel()
    } else {
      // Cash mode: players who busted are auto-removed, so re-seat anyone
      // missing to put every stack back to the buy-in.
      const occupied = this.table.seats()
      for (let i = 0; i < this.seats.length; i++) {
        if (!occupied[i]) this.table.sitDown(i, buyIn)
      }
    }

    // Stacks going in, so a tournament hand can be settled against them.
    const before = this.stacks()

    if (tournament) {
      // No seat argument: poker-ts then advances the button itself, skipping
      // the seats of players who have busted. Doing it by hand would land the
      // button on an empty chair.
      this.table.startHand()
    } else {
      this.table.startHand(this.button)
      this.button = (this.button + 1) % this.seats.length
    }
    this.handsPlayed++

    // Cache equity per (seat, street) — recomputing it on every action is
    // where a naive implementation burns all its time.
    const equityCache = new Map<string, number>()
    const contributed = new Array(this.seats.length).fill(0)
    let lastStreet = ''
    const wentToShowdown = new Set<number>()
    /**
     * Tracked here rather than read back from poker-ts: it never clears
     * _holeCards on a fold, so holeCards() still returns a mucked hand. Using
     * it to decide who is still in would expose folded players' cards at
     * showdown -- free reads the player has not earned.
     */
    const foldedSeats = new Set<number>()
    // VPIP is a per-hand statistic, not a per-action one.
    const putMoneyIn = new Set<number>()
    const raisedPreflop = new Set<number>()

    for (const s of this.seats) s.stats.hands++

    while (this.table.isHandInProgress()) {
      while (this.table.isBettingRoundInProgress()) {
        const seat: number = this.table.playerToAct()
        const s = this.seats[seat]
        const street: string = this.table.roundOfBetting()

        if (street !== lastStreet) {
          lastStreet = street
          onEvent?.({
            type: 'street',
            street,
            board: this.table.communityCards(),
            // Carries stacks so the display picks up the posted blinds, which
            // are not an 'action' and would otherwise show stale.
            stacks: this.stacksBehind(),
          })
        }

        const seatState = this.table.seats()
        const board: Card[] = this.table.communityCards()
        const hole: Card[] = this.table.holeCards()[seat] ?? []

        const maxBet = Math.max(
          ...seatState.filter(Boolean).map((x: any) => x.betSize),
        )
        const myBet = seatState[seat].betSize
        const toCall = maxBet - myBet
        const pot = this.potTotal()

        // The human seat never gets an equity number -- they read the board
        // like anyone else -- so there is nothing to roll out for them.
        const isHuman = seat === humanSeat && onHumanTurn !== undefined
        const key = `${seat}:${street}`
        let equity = 0
        if (!isHuman) {
          const cached = equityCache.get(key)
          if (cached === undefined) {
            equity = handStrength(
              hole,
              board,
              Math.max(1, this.table.numActivePlayers() - 1),
              rollouts,
              rng,
            )
            equityCache.set(key, equity)
          } else {
            equity = cached
          }
        }

        const legalRaw = this.table.legalActions()
        const legal: Action[] = legalRaw.actions
        const range = legalRaw.chipRange
        const minRaise = range?.min ?? bigBlind
        const maxRaise = range?.max ?? seatState[seat].stack

        let decision: Decision
        if (isHuman) {
          decision = await onHumanTurn!({
            seat,
            hole,
            stacks: this.stacksBehind(),
            board,
            pot,
            toCall,
            stack: seatState[seat].stack,
            bigBlind,
            street: street as any,
            legal,
            minRaise,
            maxRaise,
          })
          // Never trust the UI: a stale button or a hand-edited slider must not
          // be able to put the table into an illegal state.
          if (!legal.includes(decision.action)) {
            throw new Error(
              `illegal action from human seat ${seat}: ${decision.action} (legal: ${legal.join(', ')})`,
            )
          }
          if (decision.betSize !== undefined) {
            decision.betSize = Math.max(minRaise, Math.min(maxRaise, Math.round(decision.betSize)))
          }
        } else {
          decision = decide({
            personality: s.personality,
            equity,
            pot,
            toCall,
            stack: seatState[seat].stack,
            bigBlind,
            effectiveStackBB: seatState[seat].stack / bigBlind,
            minRaise,
            maxRaise,
            street: street as any,
            legal,
            numOpponents: Math.max(1, this.table.numActivePlayers() - 1),
            tilt: s.tilt,
            opponentFoldRate: this.tableFoldRate(seat),
            rng,
          })

          if (onEvent) {
            // The tell precedes the action: it is a leak about the decision
            // already made, which is what makes it readable at all.
            const tell = emitTell(
              s.personality,
              { equity, decision, tilt: s.tilt },
              rng,
            )
            if (tell) onEvent({ type: 'tell', seat, signal: tell.signal })
          }
        }

        // Stats
        if (toCall > 0) s.stats.facedAggression++
        if (decision.action === 'fold') {
          s.stats.folds++
          foldedSeats.add(seat)
          if (toCall > 0) s.stats.foldsToAggression++
        } else if (decision.action === 'call') {
          s.stats.calls++
          if (street === 'preflop') putMoneyIn.add(seat)
        } else if (decision.action === 'bet' || decision.action === 'raise') {
          s.stats.bets++
          if (street === 'preflop') {
            putMoneyIn.add(seat)
            raisedPreflop.add(seat)
          }
        }

        const before = seatState[seat].stack + seatState[seat].betSize
        this.table.actionTaken(decision.action, decision.betSize)
        const after = this.table.seats()[seat]
        if (after) contributed[seat] += before - (after.stack + after.betSize)

        onEvent?.({
          type: 'action',
          seat,
          decision,
          equity: isHuman ? 0 : equity,
          pot: this.potTotal(),
          stacks: this.stacksBehind(),
        })
      }

      this.table.endBettingRound()

      if (this.table.areBettingRoundsCompleted()) {
        const hole = this.table.holeCards()
        const finalBoard: Card[] = this.table.communityCards()
        const revealed: { seat: number; hole: Card[] }[] = []
        for (let i = 0; i < this.seats.length; i++) {
          if (hole[i] && !foldedSeats.has(i)) {
            wentToShowdown.add(i)
            revealed.push({ seat: i, hole: hole[i]! })
          }
        }
        // Pot sizes have to be read BEFORE the showdown pays them out.
        const potsBefore = this.table
          .pots()
          .map((p: any) => ({ size: p.size, eligible: p.eligiblePlayers as number[] }))
        this.table.showdown()
        if (onEvent) {
          const perPot: any[] = this.table.winners() ?? []
          const pots = potsBefore.map((p: any, i: number) => {
            const won = perPot[i]
            if (!won || won.length === 0) {
              // No winners recorded means the pot was uncontested -- poker-ts
              // pays the lone eligible player without evaluating a hand.
              //
              // eligiblePlayers is the stale list that caused the pot bug in
              // the first place: it can still name someone who folded later.
              // Only seats that reached showdown with cards are real
              // candidates, or we would announce the wrong winner.
              const live = p.eligible.filter((seat: number) =>
                revealed.some((r) => r.seat === seat),
              )
              return { amount: p.size, winners: (live.length ? live : p.eligible).slice(0, 1) }
            }
            return {
              amount: p.size,
              winners: won.map((w: any) => w[0] as number),
              ranking: RANKINGS[won[0][1].ranking] ?? 'a hand',
              cards: won[0][1].cards as Card[],
            }
          })
          onEvent({ type: 'showdown', board: finalBoard, revealed, pots })
        }
      }
    }

    // Settle. Cash compares the final stack against the buy-in; a tournament
    // compares it against the stack the player started the hand with.
    const after = this.stacks()
    const final = this.table.seats()
    for (let i = 0; i < this.seats.length; i++) {
      const s = this.seats[i]
      if (putMoneyIn.has(i)) s.stats.vpip++
      if (raisedPreflop.has(i)) s.stats.pfr++
      const delta = tournament ? after[i] - before[i] : (final[i]?.stack ?? 0) - buyIn
      s.stats.profit += delta
      if (delta > 0) s.stats.wins++
      if (wentToShowdown.has(i)) s.stats.showdowns++

      // Tilt: a big loss rattles them, proportional to sensitivity.
      const lossInBB = -delta / bigBlind
      if (lossInBB > 20) {
        s.tilt = Math.min(1, s.tilt + 0.4 * s.personality.tiltSensitivity)
      }
      s.tilt *= 0.85 // decay

      onEvent?.({ type: 'result', seat: i, delta, won: delta > 0 })
      // Cash mode tears the table down between hands. A tournament must not:
      // standing a player up would hand back their stack and the table would
      // never end.
      if (!tournament && final[i]) this.table.standUp(i)
    }

    if (tournament) this.removeBustedPlayers(before)
  }

  /**
   * poker-ts only sweeps busted players inside showdown(), so a player who
   * runs out of chips posting a blind into a hand everyone folds is left
   * sitting at the table with an empty stack. Guard on occupancy before
   * standing anyone up -- showdown may already have taken the seat.
   */
  private removeBustedPlayers(before: number[]): void {
    const seated = this.table.seats()
    for (let i = 0; i < this.seats.length; i++) {
      const busted = (seated[i]?.totalChips ?? 0) === 0 && before[i] > 0
      if (!busted || this.bustOrder.includes(i)) continue
      if (seated[i]) this.table.standUp(i)
      this.bustOrder.push(i)
      // Places fill from the bottom: the first player out finishes last.
      const place = this.seats.length - this.bustOrder.length + 1
      this.opts.onEvent?.({ type: 'eliminated', seat: i, place })
    }
  }

  /** Raise the blinds if this hand starts a new level. */
  private applyBlindLevel(): void {
    const target = Math.min(
      this.opts.levels.length - 1,
      Math.floor(this.handsPlayed / this.opts.handsPerLevel),
    )
    if (target === this.level) return
    this.level = target
    const { smallBlind, bigBlind, ante } = this.opts.levels[this.level]
    this.table.setForcedBets({ smallBlind, bigBlind, ante })
    this.opts.onEvent?.({ type: 'level', level: this.level, smallBlind, bigBlind })
  }

  /** Average fold-to-aggression across the other seats, for adaptivity. */
  private tableFoldRate(exclude: number): number {
    let faced = 0
    let folded = 0
    for (let i = 0; i < this.seats.length; i++) {
      if (i === exclude) continue
      faced += this.seats[i].stats.facedAggression
      folded += this.seats[i].stats.foldsToAggression
    }
    return faced < 20 ? 0.4 : folded / faced
  }
}
