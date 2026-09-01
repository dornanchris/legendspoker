// poker-ts exports the facade as a named `Table`, not a default export.
import pokerPkg from 'poker-ts'
const { Table: Poker } = pokerPkg as any
import { decide, emitTell, type Action, type Decision } from './decide.js'
import { handStrength, type Card } from './equity.js'
import type { Personality } from './personality.js'

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
  | { type: 'street'; street: string; board: Card[] }
  | { type: 'tell'; seat: number; signal: string }
  | { type: 'action'; seat: number; decision: Decision; equity: number }
  | { type: 'result'; seat: number; delta: number; won: boolean }
  | { type: 'level'; level: number; smallBlind: number; bigBlind: number }
  /** `place` is the finishing position: 1 is the winner, so 4 busts first. */
  | { type: 'eliminated'; seat: number; place: number }

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
   * Plays one hand. Stacks are reset to the buy-in each hand so we measure
   * decision quality rather than tournament survivorship — that keeps the
   * win-rate numbers clean and comparable.
   */
  playHand(): void {
    const { rng, buyIn, rollouts, onEvent, mode } = this.opts
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
        const potsTotal = this.table
          .pots()
          .reduce((a: number, p: any) => a + p.size, 0)
        const liveBets = seatState
          .filter(Boolean)
          .reduce((a: number, x: any) => a + x.betSize, 0)
        const pot = potsTotal + liveBets

        const key = `${seat}:${street}`
        let equity = equityCache.get(key)
        if (equity === undefined) {
          equity = handStrength(
            hole,
            board,
            Math.max(1, this.table.numActivePlayers() - 1),
            rollouts,
            rng,
          )
          equityCache.set(key, equity)
        }

        const legalRaw = this.table.legalActions()
        const legal: Action[] = legalRaw.actions
        const range = legalRaw.chipRange

        const foldRate = this.tableFoldRate(seat)

        const decision = decide({
          personality: s.personality,
          equity,
          pot,
          toCall,
          stack: seatState[seat].stack,
          bigBlind,
          effectiveStackBB: seatState[seat].stack / bigBlind,
          minRaise: range?.min ?? bigBlind,
          maxRaise: range?.max ?? seatState[seat].stack,
          street: street as any,
          legal,
          numOpponents: Math.max(1, this.table.numActivePlayers() - 1),
          tilt: s.tilt,
          opponentFoldRate: foldRate,
          rng,
        })

        if (onEvent) {
          const tell = emitTell(
            s.personality,
            { equity, decision, tilt: s.tilt },
            rng,
          )
          if (tell) onEvent({ type: 'tell', seat, signal: tell.signal })
          onEvent({ type: 'action', seat, decision, equity })
        }

        // Stats
        if (toCall > 0) s.stats.facedAggression++
        if (decision.action === 'fold') {
          s.stats.folds++
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
      }

      this.table.endBettingRound()

      if (this.table.areBettingRoundsCompleted()) {
        for (let i = 0; i < this.seats.length; i++) {
          if (this.table.holeCards()[i]) wentToShowdown.add(i)
        }
        this.table.showdown()
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
