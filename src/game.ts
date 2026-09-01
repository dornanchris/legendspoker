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

export type HandEvent =
  | { type: 'deal'; seat: number; hole: Card[] }
  | { type: 'street'; street: string; board: Card[] }
  | { type: 'tell'; seat: number; signal: string }
  | { type: 'action'; seat: number; decision: Decision; equity: number }
  | { type: 'result'; seat: number; delta: number; won: boolean }

export type GameOptions = {
  smallBlind: number
  bigBlind: number
  buyIn: number
  rollouts: number
  rng: () => number
  onEvent?: (e: HandEvent) => void
}

export class Game {
  private table: any
  private seats: Seat[]
  private button = 0
  private opts: GameOptions

  constructor(personalities: Personality[], opts: Partial<GameOptions> = {}) {
    this.opts = {
      smallBlind: 10,
      bigBlind: 20,
      buyIn: 2000,
      rollouts: 60,
      rng: Math.random,
      ...opts,
    }
    this.seats = personalities.map((p) => ({
      personality: p,
      tilt: 0,
      stats: newStats(),
    }))
    this.table = new Poker(
      { smallBlind: this.opts.smallBlind, bigBlind: this.opts.bigBlind },
      personalities.length,
    )
  }

  getSeats(): Seat[] {
    return this.seats
  }

  /**
   * Plays one hand. Stacks are reset to the buy-in each hand so we measure
   * decision quality rather than tournament survivorship — that keeps the
   * win-rate numbers clean and comparable.
   */
  playHand(): void {
    const { rng, buyIn, bigBlind, rollouts, onEvent } = this.opts

    // Players who busted out are auto-removed; re-seat anyone missing.
    const occupied = this.table.seats()
    for (let i = 0; i < this.seats.length; i++) {
      if (!occupied[i]) this.table.sitDown(i, buyIn)
    }

    this.table.startHand(this.button)
    this.button = (this.button + 1) % this.seats.length

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

    // Settle: compare final stack against buy-in.
    const final = this.table.seats()
    for (let i = 0; i < this.seats.length; i++) {
      const s = this.seats[i]
      if (putMoneyIn.has(i)) s.stats.vpip++
      if (raisedPreflop.has(i)) s.stats.pfr++
      const delta = (final[i]?.stack ?? 0) - buyIn
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
      if (final[i]) this.table.standUp(i)
    }
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
