// poker-ts exports the facade as a named `Table`, not a default export.
import pokerPkg from 'poker-ts'
const { Table: Poker } = pokerPkg as any
import { decide, emitTell, betRange, readBet, readTell, type Action, type Decision } from './decide.js'
import { handStrength, preflopStrength, equityVs, shownStrength, drawOuts, boardWetness, RANGE_LOOSE, type Card } from './equity.js'
import type { Personality } from './personality.js'
import { seededShuffle } from './rng.js'
import { assertPatchedEngine } from './engine-guard.js'

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
  checks: number
  folds: number
  foldsToAggression: number
  facedAggression: number
  wins: number
  showdowns: number
  /** Hands turned over at showdown after betting or raising after the flop... */
  shownBets: number
  /** ...and their strength summed (shownStrength): what this seat's bets have been seen to mean. */
  shownBetStrength: number
  /** Hands turned over at showdown after raising before the flop... */
  shownRaises: number
  /** ...and their strength scores summed (preflopStrength). */
  shownRaiseStrength: number
}

export const newStats = (): Stats => ({
  hands: 0,
  profit: 0,
  vpip: 0,
  pfr: 0,
  bets: 0,
  calls: 0,
  checks: 0,
  folds: 0,
  foldsToAggression: 0,
  facedAggression: 0,
  wins: 0,
  showdowns: 0,
  shownBets: 0,
  shownBetStrength: 0,
  shownRaises: 0,
  shownRaiseStrength: 0,
})

/**
 * The average player, where every read of a seat starts (Game.read): how
 * often a player bets or raises when they act, and how often they fold to a
 * bet. Measured over the eight story tables (96 four-handed tournaments,
 * ENGINE_VERSION 9): 0.224 and 0.408. READ_PRIOR is how many actions of
 * evidence the average is worth to an unskilled reader; skill shrinks it.
 */
const BET_FREQ = 0.22
const FOLD_RATE = 0.4
const READ_PRIOR = 30
/**
 * What a hand turned over at showdown is worth (shownStrength) when its player
 * bet or raised after the flop: the cast's average, 0.627 (ENGINE_VERSION 15,
 * the eight story tables, ~2,000 such showdowns; the same on every street).
 * SHOWN_PRIOR is how many showdowns of evidence the average is worth to an
 * unskilled reader; skill shrinks it, as READ_PRIOR.
 */
const SHOWN_BET = 0.627
const SHOWN_PRIOR = 10
/**
 * Before the flop the same two reads, on the preflop raise alone: how often a
 * player raises (PFR, a share of hands dealt) and the strength score of the
 * raises turned over at showdown. The cast's: 0.228 and 0.417 (ENGINE_VERSION
 * 15, the eight story tables, ~1,500 showdowns).
 */
const PFR = 0.228
const SHOWN_RAISE = 0.417

export type BlindLevel = { smallBlind: number; bigBlind: number; ante?: number }

/** poker-ts reports a hand ranking as an enum ordinal; these are its names. */
export const RANKINGS = [
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
  /**
   * A hand begins. Fired after the blinds are posted and before any action,
   * so it is the one safe moment to say something at the table: no cards
   * have been looked at, so nothing said here can leak a hand.
   */
  | {
      type: 'hand'
      hand: number
      button: number
      bigBlind: number
      /** Personality id per seat; null for an empty chair. */
      seats: (string | null)[]
      stacks: number[]
    }
  /** The human seat's own hole cards. Never fired for anyone else. */
  | { type: 'deal'; seat: number; hole: Card[] }
  | { type: 'street'; street: string; board: Card[]; stacks: number[] }
  /**
   * A tell, shown just before the action it leaks. `correlate` and `honest`
   * are hidden information -- what the tell is supposed to mean, and whether
   * it meant it this time -- for the director to use after a showdown, never
   * for the screen to show while the hand is live.
   */
  | {
      type: 'tell'
      seat: number
      signal: string
      text: string
      correlate: 'strong' | 'weak' | 'bluffing' | 'tilted'
      honest: boolean
    }
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
        /**
         * e.g. "two pair". Absent when the pot was never contested: everyone
         * else folded, or only one player still in had put in enough to
         * reach it.
         */
        ranking?: string
        /** The five cards that actually won it, for highlighting. */
        cards?: Card[]
        /**
         * Not won at all: chips one player bet that nobody could match, going
         * back to them. A side pot only they reached, made of only their own
         * chips. Never a win, never a showdown.
         */
        returned?: boolean
      }[]
    }
  /**
   * The hand is completely over: pots paid, busts swept, arrivals seated.
   * The one moment it is always safe to talk -- no cards are live.
   */
  | { type: 'handEnd'; hand: number; stacks: number[] }
  /** `place` is the finishing position: 1 is the winner, so 4 busts first. */
  | { type: 'eliminated'; seat: number; id: string; place: number }
  /**
   * A late arrival takes an empty chair between hands, bringing chips of
   * their own. See Arrival.
   *
   * `cause: 'banishment'` is the other way a chair changes hands: the chair
   * was never empty, its occupant was removed by the house a moment ago (see
   * 'banished'), and the newcomer brings no chips -- they sit behind the
   * ones already there. No cause is an ordinary late arrival.
   */
  | {
      type: 'arrival'
      seat: number
      id: string
      stack: number
      replaces: string | null
      cause?: 'banishment'
    }
  /**
   * The house removes a player between hands (see Banishment). NOT an
   * elimination: no finishing place, no knockout, nobody's bust. Their chips
   * stay on the felt, and an 'arrival' with cause 'banishment' follows at
   * once for whoever takes the chair.
   */
  | { type: 'banished'; seat: number; id: string; stack: number; by: string }

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
  /** What they already have in front of them this street. */
  bet: number
  stack: number
  bigBlind: number
  street: 'preflop' | 'flop' | 'turn' | 'river'
  legal: Action[]
  minRaise: number
  maxRaise: number
}

/**
 * A champion who is not at the table when it opens. Odysseus is late, Caesar
 * waits for the first body, Dracula watches from the fireplace, and the
 * station's intelligence takes the Robot's chair when the Robot falls.
 *
 * A rule whose afterEliminationOf is the arriving character themselves is a
 * RETURN: the Green Knight retakes his own chair some hands after he falls.
 * The 'arrival' event then has replaces === id.
 *
 * This is table CONFIGURATION, keyed by ids in data -- it is not a branch on
 * identity inside a decision, which non-negotiable #1 forbids.
 */
export type Arrival = {
  personality: Personality
  /** Triggers once this many players have been eliminated... */
  afterEliminations?: number
  /** ...or once this character is eliminated, taking their chair... */
  afterEliminationOf?: string
  /**
   * ...or once the human seat wins chips in a hand holding exactly these two
   * ranks (any suits) WHILE a chair stands empty: a visitor (JFK at the White
   * House, for a three and a five). With no empty chair the win does nothing,
   * and a later one can still set it off. Never if they are already seated.
   */
  onHumanWin?: string[]
  /**
   * ...or, once this character has been knocked out, when the human seat
   * wins chips holding the same two ranks (any suits) as the hand that
   * knocked them out, WHILE a chair stands empty: the other half of a seat
   * (Jekyll's Hyde, Hyde's Jekyll). The hand that beat them is whoever took
   * the most chips in the hand they went out in. Never if already seated.
   */
  onHumanWinLike?: string
  /** Not before this character has sat down at the table (a late champion). */
  afterArrivalOf?: string
  /**
   * Hands to wait after the trigger. 0 seats them before the next hand, even
   * if the table would otherwise be over -- which is how the station's
   * intelligence still arrives when the Robot is the last to fall. Anything
   * larger can be MISSED: clear the table first and they never sit down.
   */
  delayHands: number
  /** Chips they bring. 'average' matches the average stack still in play. */
  stack: 'average' | number
}

/**
 * A house rule with teeth. When the human seat wins chips in a hand holding
 * exactly `holeRanks` (any suits), the house removes one opponent between
 * hands and `personality` takes that chair with that opponent's exact stack.
 * At most once per sitting; if nobody is eligible when it triggers, nothing
 * happens and a later win can still set it off.
 *
 * Like Arrival this is table CONFIGURATION built from data, not a branch on
 * identity: the engine knows ranks, seats and a list of ids to leave alone,
 * never who anybody is. Who may be removed:
 *  - seated opponents who were dealt into the hand and still have chips;
 *  - never anyone in `exclude` (the table's champion, the dealer);
 *  - never a character a late Arrival waits on (`afterEliminationOf`):
 *    removing them would silently cancel that arrival;
 *  - never the newcomer themselves.
 *
 * The pick draws once from the game RNG, and only when the rule fires, so a
 * replayed decision log removes the same player. Tournament mode only, and it
 * needs a human seat.
 */
export type Banishment = {
  /** Who takes the chair. */
  personality: Personality
  /** The two ranks the human must hold, e.g. ['6', '7']. Suits do not matter. */
  holeRanks: string[]
  /** Ids never removed. */
  exclude: string[]
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
   * for it. It is also the stranger at the table: the one player skilled
   * characters read by what they have seen them do (see the skill read).
   * A test may set it without onHumanTurn, to seat a stand-in who is read
   * the same way.
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
   * The default, 25, is only the frozen Phase 2 instrument's pace (`npm run
   * tourney` with no table), kept so its numbers stay comparable. Every tour
   * table sets its own in data/tables: 8-9 hands a level, 12 at the finale.
   * Five-handed that is under two orbits a level, while the first three
   * orbits are still dealt at 100bb and 67bb deep.
   */
  handsPerLevel: number

  /** Tournament only: champions who arrive mid-table. */
  arrivals?: Arrival[]

  /** Tournament only, with a human seat. See Banishment. */
  banishment?: Banishment
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
  /** Who busted, by character, in order -- a chair can be filled twice. */
  private busts: { seat: number; id: string; hand: number }[] = []
  /** Whether each chair's CURRENT occupant has been knocked out. */
  private seatBusted: boolean[] = []
  /** Every chip that has entered play, arrivals included. */
  private chipsTotal = 0
  private pending: { rule: Arrival; triggeredAt?: number; done: boolean }[] = []
  /** The two ranks of the hand that knocked each character out, kept only when a rule asks (onHumanWinLike). */
  private knockoutRanks = new Map<string, string[]>()
  /** Everyone who has sat down after the deal began (late arrivals). */
  private arrivedIds = new Set<string>()
  /** Set once the banishment rule has fired: it fires at most once a sitting. */
  private banishmentDone = false

  constructor(personalities: Personality[], opts: Partial<GameOptions> = {}) {
    assertPatchedEngine()
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
    this.seatBusted = this.seats.map(() => false)
    // A tournament seats everyone once and never re-seats: that is the whole
    // point. Cash mode re-seats per hand, in playHand.
    if (this.opts.mode === 'tournament') {
      for (let i = 0; i < this.seats.length; i++) {
        this.table.sitDown(i, this.opts.buyIn)
      }
      this.chipsTotal = this.opts.buyIn * this.seats.length
      this.pending = (this.opts.arrivals ?? []).map((rule) => ({ rule, done: false }))
    }
  }

  /**
   * Chips that should exist at the table: every buy-in plus every arrival's
   * stack. The conservation check compares against this, not a constant.
   */
  chipsInPlay(): number {
    return this.chipsTotal
  }

  /** Eliminations by character, first out first. */
  eliminations(): { seat: number; id: string; hand: number }[] {
    return [...this.busts]
  }

  /**
   * Late arrivals that will now never happen because the table ended first.
   * Only meaningful once isComplete().
   */
  missedArrivals(): string[] {
    // Someone due to come BACK has already sat here, whether they fell or
    // never did: a table that ends before their return has not missed them.
    const sat = (id: string) =>
      this.busts.some((b) => b.id === id) || this.seats.some((s) => s.personality.id === id)
    return this.pending
      .filter((p) => !p.done && !sat(p.rule.personality.id))
      .map((p) => p.rule.personality.id)
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

    // After the level is applied: read before it, the first hand of every
    // level was played on the previous level's big blind.
    const bigBlind = this.bigBlind()

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

    if (onEvent) {
      const seated = this.table.seats()
      onEvent({
        type: 'hand',
        hand: this.handsPlayed,
        button: this.table.button(),
        bigBlind,
        seats: this.seats.map((s, i) => (seated[i] ? s.personality.id : null)),
        stacks: this.stacks(),
      })
      if (humanSeat !== undefined && seated[humanSeat]) {
        const hole: Card[] | null = this.table.holeCards()[humanSeat]
        if (hole) onEvent({ type: 'deal', seat: humanSeat, hole })
      }
    }
    // Only the banishment rule, a visitor and an other half want these.
    // Reading them draws nothing.
    const humanHole: Card[] | null =
      tournament && humanSeat !== undefined &&
      (this.opts.banishment || this.pending.some((p) => p.rule.onHumanWin || p.rule.onHumanWinLike))
        ? this.table.holeCards()[humanSeat] ?? null
        : null
    // Everyone's cards as dealt, to know the hand that knocks someone out.
    const dealtHoles: (Card[] | null)[] | null =
      tournament && this.pending.some((p) => !p.done && p.rule.onHumanWinLike)
        ? this.table.holeCards().map((h: Card[] | null) => (h ? [...h] : null))
        : null

    // How many were dealt in: a hand dealt to two is heads up from the start
    // (the finale, the Pyre, the end of a sitting); one folded round to the
    // blinds at a full table is not, and is not played like one.
    const dealtIn = this.table.holeCards().filter(Boolean).length

    // Cache equity per (seat, street, what they are facing) -- recomputing it
    // on every action is where a naive implementation burns all its time.
    const equityCache = new Map<string, number>()
    // Chips each seat has put in this hand, starting from the posted blinds.
    const contributed: number[] = this.table
      .seats()
      .map((x: any) => x?.betSize ?? 0)
    while (contributed.length < this.seats.length) contributed.push(0)
    let lastStreet = ''
    // Who bet or raised last on this street, and who had done so on the one
    // before it: that player holds the initiative, and a bet from them now
    // carries on the story their raise began (a continuation bet).
    let aggressor = -1
    // Bets and raises: on this street by anyone, and this hand by each seat.
    // How a skilled player reads a bet in context (see readBet).
    let raisesThisStreet = 0
    const handBets: number[] = this.seats.map(() => 0)
    /** Seats that bet or raised after the flop this hand: a showdown says what those bets meant. */
    const betPostflop = new Set<number>()
    /** The tell each seat showed as they last acted this hand, if any. */
    const shownTell: ({ correlate: string; reliability: number } | null)[] = this.seats.map(() => null)
    let initiative = -1
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
          raisesThisStreet = 0
          initiative = aggressor
          aggressor = -1
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
        // Put all in by posting a blind: nothing is left to decide. poker-ts
        // still gives them a turn, and fold is always legal, so they (or the
        // player) could fold chips already posted and bust without a
        // showdown. A call moves no chips: everything they had is in.
        if (seatState[seat].stack === 0) {
          const legal: string[] = this.table.legalActions().actions
          this.table.actionTaken(legal.includes('check') ? 'check' : 'call')
          continue
        }
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
        // Who they are facing. Somebody who bets usually has something, so
        // equity is measured against the hands a bet like this comes from,
        // not against any two cards -- which is what made a pair of eights
        // look like a 65% favourite against a pot-sized bet. How far each
        // character believes it is their `betRespect` dial.
        let bettor = -1
        if (toCall > 0) {
          seatState.forEach((x: any, i: number) => {
            if (x && i !== seat && (bettor < 0 || x.betSize > seatState[bettor].betSize)) bettor = i
          })
        }
        const facingAllIn = bettor >= 0 && seatState[bettor].stack === 0
        let oppRange = 1
        /** The share of that range that is bluffs and draws (see equityVs). */
        let loose = RANGE_LOOSE
        if (!isHuman && bettor >= 0) {
          let base = betRange({
            street,
            toCall,
            pot,
            bigBlind,
            allIn: facingAllIn,
            bettorBB: contributed[bettor] / bigBlind,
          })
          // Skill reads a bet in context: a river probe is not a 4-bet. At 0
          // every bet of a size reads the same.
          //
          // The PLAYER is also read as a person. The legends know one another
          // by reputation -- that is the plain read -- but the player is a
          // stranger, learned by watching: the same bet from someone who bets
          // half the time comes from twice the hands it does from someone who
          // bets a quarter of the time. As far as the reader adjusts to people
          // at all (`adaptivity`). Only the stranger: reading one another this
          // way moved the cast's own styles by up to ten points of VPIP (the
          // Wolf Man, the Robot, Holmes), and a character must still play
          // like themselves.
          const skill = s.personality.skill
          if (skill > 0) {
            const context = readBet({
              street,
              raises: raisesThisStreet,
              bettorBets: handBets[bettor],
              overbet: toCall >= 1.1 * Math.max(1, pot - toCall),
              allIn: facingAllIn,
            })
            base *= Math.pow(context, skill)
            if (bettor === humanSeat) {
              // Someone who bets more than most widens their range; someone
              // who bets less narrows it. As a power, not a multiple: a player
              // who shoves every hand is shoving any two cards, and multiplying
              // a deep shove's 12% by a few still called it a top-40% hand, so
              // the champions folded most hands to a player who shoved every
              // one; a power opens a narrow range far more than a wide one.
              // Before the flop, how often they raise and what their raises have
              // been at showdown; after it, how often they bet at all and what
              // those bets turned out to be. A player who bets only real hands
              // is believed (the cast bluffs, so the plain read paid such a
              // player off), one seen bluffing is called down. Kept apart: a
              // tight player's continuation bets made their preflop raises
              // look loose.
              const seen = this.read(bettor, skill)
              const a = skill * s.personality.adaptivity
              const air = street === 'preflop' ? seen.raiseAir / (1 - SHOWN_RAISE) : seen.air / (1 - SHOWN_BET)
              const k = street === 'preflop'
                ? Math.pow(seen.pfr / PFR, a) * Math.pow(air, 2 * a)
                : Math.pow(seen.betFreq / BET_FREQ, a) * Math.pow(air, 2 * a)
              base = Math.pow(base, 1 / k)
              // and how much of that range is bluffs: a player whose bets have
              // always been real hands has few. The plain fifth of every range
              // let Death five-bet 6-6 into a four-bet as a 62% favourite.
              loose = Math.max(0.02, Math.min(0.5, RANGE_LOOSE * Math.pow(air, 2 * a)))
            }
            base = Math.max(0.05, Math.min(1, base))
          }
          // In steps of 5%, so a street's equity is worked out a few times at most.
          // The player has been READ (above), and a skilled reader believes
          // that read as far as their skill; the cast are known only by
          // reputation, and believed as far as `betRespect` says. Full belief
          // in everyone sank Death against the cast, who bluff.
          const belief = bettor === humanSeat ? Math.max(s.personality.betRespect, s.personality.skill) : s.personality.betRespect
          oppRange = Math.round((1 - belief * (1 - base)) * 20) / 20
        }
        const key = `${seat}:${street}:${oppRange}:${loose.toFixed(2)}`
        let equity = 0
        if (!isHuman) {
          const cached = equityCache.get(key)
          if (cached === undefined) {
            const opponents = Math.max(1, this.table.numActivePlayers() - 1)
            // The most skilled count more carefully: 60 rollouts are worth
            // +-6%, and a marginal call is decided inside that. Up to four
            // times as many at skill 1 (Death), none extra below 0.75.
            const careful = Math.round(rollouts * (1 + 12 * Math.max(0, s.personality.skill - 0.75)))
            equity = handStrength(hole, board, opponents, careful, rng, oppRange, Math.round(loose * 50) / 50)
            // Heads up before the flop with only the blind to call, the
            // strength score undersells most hands: it rates 40% of them below
            // 0.30, yet most of those win over 40% against one random hand,
            // and a small blind that folded them gave the blinds away. A
            // skilled player knows what any two cards are worth one on one:
            // their equity moves from the score toward the real figure.
            const skill = s.personality.skill
            if (skill > 0 && dealtIn === 2 && board.length === 0 && oppRange >= 1) {
              equity += skill * (equityVs(hole, board, 1, careful, rng, 1) - equity)
            }
            equityCache.set(key, equity)
          } else {
            equity = cached
          }
        }

        // Who is still in against them.
        const dealt = this.table.holeCards()
        const inHand: number[] = []
        this.seats.forEach((_, i) => {
          if (i !== seat && seatState[i] && dealt[i] && !foldedSeats.has(i)) inHand.push(i)
        })

        // Skill reads people too: the tell the player we are up against showed
        // as they last acted -- the bettor, or the one opponent left. Public:
        // it is the same tell the human sees. Believed as far as that
        // character's tells deserve (a coin-flip tell is worth nothing) and
        // as far as the reader's skill goes. Death shows none.
        const subject = bettor >= 0 ? bettor : inHand.length === 1 ? inHand[0] : -1
        const shown = subject >= 0 ? shownTell[subject] : null
        if (!isHuman && shown && s.personality.skill > 0) {
          equity = readTell(equity, shown.correlate, s.personality.skill * Math.max(0, 2 * shown.reliability - 1), street === 'preflop')
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
            bet: myBet,
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
            strength: board.length === 0 ? preflopStrength(hole) : equity,
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
            dealtIn,
            tilt: s.tilt,
            opponentFoldRate: this.foldRateFacing(seat, inHand, s.personality.skill),
            committed: contributed[seat],
            facingAllIn,
            bet: myBet,
            initiative: seat === initiative,
            outs: drawOuts(hole, board),
            wet: boardWetness(board),
            rng,
          })

          // A person bets in round numbers: "raises to 49" and "bets 72" read
          // as a machine's. Fives at the first levels, then a unit that grows
          // with the blind; the least raise and all in stay exact.
          if (decision.betSize !== undefined && decision.betSize > minRaise && decision.betSize < maxRaise) {
            const unit = bigBlind >= 400 ? 50 : bigBlind >= 100 ? 25 : bigBlind >= 20 ? 5 : 1
            decision.betSize = Math.max(minRaise, Math.min(maxRaise, Math.round(decision.betSize / unit) * unit))
          }

          // The tell precedes the action: it is a leak about the decision
          // already made, which is what makes it readable at all. Drawn
          // whether or not a screen is watching, because the table is.
          const tell = emitTell(
            s.personality,
            { equity, decision, tilt: s.tilt },
            rng,
          )
          shownTell[seat] = tell ? { correlate: tell.tell.correlate, reliability: tell.tell.reliability } : null
          if (onEvent) {
            if (tell) {
              onEvent({
                type: 'tell',
                seat,
                signal: tell.tell.signal,
                text: tell.tell.text,
                correlate: tell.tell.correlate,
                honest: tell.honest,
              })
            }
          }
        }

        // Stats
        if (toCall > 0) s.stats.facedAggression++
        if (decision.action === 'fold') {
          s.stats.folds++
          foldedSeats.add(seat)
          if (toCall > 0) s.stats.foldsToAggression++
        } else if (decision.action === 'check') {
          s.stats.checks++
        } else if (decision.action === 'call') {
          s.stats.calls++
          if (street === 'preflop') putMoneyIn.add(seat)
        } else if (decision.action === 'bet' || decision.action === 'raise') {
          s.stats.bets++
          aggressor = seat
          raisesThisStreet++
          handBets[seat]++
          if (street !== 'preflop') betPostflop.add(seat)
          if (street === 'preflop') {
            putMoneyIn.add(seat)
            raisedPreflop.add(seat)
          }
        }

        // Measured on the STACK: a bet moves chips from the stack to the bet
        // in front, which leaves stack + betSize unchanged. Measuring that sum
        // counted nothing but the blinds, so no one was ever pot-committed.
        const before = seatState[seat].stack
        this.table.actionTaken(decision.action, decision.betSize)
        const after = this.table.seats()[seat]
        if (after) contributed[seat] += before - after.stack

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
            // Public: the cards are face up. Only the player is read this way
            // (see the bettor's read above), so only theirs is worked out.
            if (i === humanSeat && betPostflop.has(i) && finalBoard.length === 5) {
              this.seats[i].stats.shownBets++
              this.seats[i].stats.shownBetStrength += shownStrength(hole[i]!, finalBoard)
            }
            if (i === humanSeat && raisedPreflop.has(i)) {
              this.seats[i].stats.shownRaises++
              this.seats[i].stats.shownRaiseStrength += preflopStrength(hole[i]!)
            }
          }
        }
        // What each seat put in this hand: every bet has been collected by
        // now, so it is simply what they had going in less what they hold.
        const putIn = this.stacks().map((chips, i) => (before[i] ?? 0) - chips)
        // Pot sizes have to be read BEFORE the showdown pays them out.
        const potsBefore = this.table
          .pots()
          .map((p: any) => ({ size: p.size, eligible: p.eligiblePlayers as number[] }))
        this.table.showdown()
        if (onEvent) {
          const perPot: any[] = this.table.winners() ?? []
          const pots = potsBefore.map((p: any, i: number) => {
            const won = perPot[i]
            // Only seats that reached showdown with cards can win a pot.
            const live = p.eligible.filter((seat: number) =>
              revealed.some((r) => r.seat === seat),
            )
            if (!won || won.length === 0 || live.length < 2) {
              // Nobody contested it. poker-ts either paid the one player
              // without evaluating a hand (no winners recorded) or evaluated
              // a hand against nobody -- which is how a bet nobody could call
              // came back announced as "wins side pot 1 with two pair".
              const winners: number[] = won?.length
                ? won.map((w: any) => w[0] as number)
                : (live.length ? live : p.eligible).slice(0, 1)
              const w = winners[0]
              const othersPut = Math.max(0, ...putIn.filter((_, seat) => seat !== w))
              const returned = i > 0 && p.size <= putIn[w] - othersPut
              return returned
                ? { amount: p.size, winners, returned: true }
                : { amount: p.size, winners }
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

    if (tournament) {
      this.removeBustedPlayers(before, dealtHoles)
      this.processBanishment(before, humanHole)
      this.processArrivals(before, humanHole)
    }
    onEvent?.({ type: 'handEnd', hand: this.handsPlayed, stacks: this.stacks() })
  }

  /**
   * poker-ts only sweeps busted players inside showdown(), so a player who
   * runs out of chips posting a blind into a hand everyone folds is left
   * sitting at the table with an empty stack. Guard on occupancy before
   * standing anyone up -- showdown may already have taken the seat.
   */
  private removeBustedPlayers(before: number[], holes: (Card[] | null)[] | null = null): void {
    const seated = this.table.seats()
    const out: number[] = []
    for (let i = 0; i < this.seats.length; i++) {
      const busted = (seated[i]?.totalChips ?? 0) === 0 && before[i] > 0
      if (!busted || this.seatBusted[i]) continue
      out.push(i)
    }
    // Places fill from the bottom: busting with k players left finishes kth.
    // Counted from who is left rather than from the seat count, because a
    // late arrival makes the field bigger than the table. Two out in one hand
    // are ranked by the chips they started it with, not by chair: the bigger
    // stack lasted longer and finishes higher.
    out.sort((a, b) => before[a] - before[b])
    const alive = this.survivors().length
    out.forEach((i, j) => {
      if (seated[i]) this.table.standUp(i)
      this.seatBusted[i] = true
      this.bustOrder.push(i)
      const id = this.seats[i].personality.id
      this.busts.push({ seat: i, id, hand: this.handsPlayed })
      if (holes) {
        // The hand that beat them: whoever took the most chips this hand.
        const gain = this.stacks().map((c, k) => (k === i ? -Infinity : c - (before[k] ?? 0)))
        const by = gain.indexOf(Math.max(...gain))
        const h = holes[by]
        if (h) this.knockoutRanks.set(id, h.map((c) => c.rank as string))
      }
      const place = alive + (out.length - j)
      this.opts.onEvent?.({ type: 'eliminated', seat: i, id, place })
    })
  }

  /**
   * Seat any late arrival whose moment has come. Runs after the busts are
   * swept, so an arrival with no delay beats the table-complete check: that
   * is the difference between "the Robot was the last to fall, so the ship
   * sits down" and "the table is over".
   */
  private processArrivals(before: number[] = [], hole: Card[] | null = null): void {
    // Once the player is out, the sitting is over. An arrival now would play
    // to an empty room -- and the first empty chair would be the player's
    // own: Caesar sat down in it at Rome and the player went on as him.
    const human = this.opts.humanSeat
    if (human !== undefined && this.seatBusted[human]) return
    for (const p of this.pending) {
      if (p.done) continue
      const { rule } = p
      if (p.triggeredAt === undefined) {
        if ((rule.onHumanWin || rule.onHumanWinLike) && this.seats.some((s) => s.personality.id === rule.personality.id)) {
          p.done = true // already at the table: an open table dealt them in
          continue
        }
        // A LATER win: the hand that knocked him out (the player's own, often) never counts.
        const out = rule.onHumanWinLike ? this.busts.find((b) => b.id === rule.onHumanWinLike) : undefined
        const like = out && out.hand < this.handsPlayed ? this.knockoutRanks.get(rule.onHumanWinLike!) : undefined
        const hit = rule.onHumanWin
          ? this.humanWonHolding(rule.onHumanWin, before, hole) && this.emptyChair() >= 0 &&
            this.survivors().length > 1 // a visitor never reopens a table just won
          : rule.onHumanWinLike
            ? !!like && (!rule.afterArrivalOf || this.arrivedIds.has(rule.afterArrivalOf)) &&
              this.humanWonHolding(like, before, hole) && this.emptyChair() >= 0 && this.survivors().length > 1
          : rule.afterEliminationOf
            ? this.busts.some((b) => b.id === rule.afterEliminationOf)
            : this.busts.length >= (rule.afterEliminations ?? Infinity)
        if (hit) p.triggeredAt = this.handsPlayed
      }
      if (p.triggeredAt === undefined) continue
      if (this.handsPlayed - p.triggeredAt < rule.delayHands) continue
      // A delayed arrival to a finished table never happens.
      if (rule.delayHands > 0 && this.survivors().length <= 1) continue

      const seated = this.table.seats()
      let chair = -1
      let replaces: string | null = null
      if (rule.afterEliminationOf) {
        const b = this.busts.find((x) => x.id === rule.afterEliminationOf)!
        if (!seated[b.seat] && b.seat !== human) chair = b.seat
        replaces = rule.afterEliminationOf
      }
      if (chair < 0) chair = this.emptyChair()
      if (chair < 0) continue // no empty chair yet; try again next hand

      const live = this.survivors().map((i) => this.stacks()[i])
      const stack =
        rule.stack === 'average'
          ? Math.round(live.reduce((a, b) => a + b, 0) / Math.max(1, live.length))
          : rule.stack
      this.seats[chair] = { personality: rule.personality, tilt: 0, stats: newStats() }
      this.seatBusted[chair] = false
      this.table.sitDown(chair, stack)
      this.chipsTotal += stack
      this.arrivedIds.add(rule.personality.id)
      p.done = true
      this.opts.onEvent?.({
        type: 'arrival',
        seat: chair,
        id: rule.personality.id,
        stack,
        replaces,
      })
    }
  }

  /** The first chair a bust left empty (never the player's), or -1. */
  private emptyChair(): number {
    const seated = this.table.seats()
    const human = this.opts.humanSeat
    return this.busts.find((b) => !seated[b.seat] && b.seat !== human)?.seat ?? -1
  }

  /** The human seat won chips this hand holding exactly these ranks, any suits. */
  private humanWonHolding(ranks: string[], before: number[], hole: Card[] | null): boolean {
    const human = this.opts.humanSeat
    if (human === undefined || !hole || this.seatBusted[human]) return false
    if (this.stacks()[human] <= (before[human] ?? Infinity)) return false
    return hole.map((c) => c.rank as string).sort().join() === [...ranks].sort().join()
  }

  /**
   * The house removes a player and someone else sits down in the same chair,
   * behind the same chips. Runs after the busts are swept and BEFORE the
   * arrivals, so it reacts to the hand just played -- and so a champion
   * seated this instant (who never saw that hand) is not in the running.
   *
   * No chip enters or leaves play: the stack changes owner, nothing more, so
   * chipsTotal is untouched. The removed player is not a bust -- no place, no
   * knockout, not in `busts` -- because nobody beat them.
   */
  private processBanishment(before: number[], hole: Card[] | null): void {
    const rule = this.opts.banishment
    const human = this.opts.humanSeat
    if (!rule || this.banishmentDone || human === undefined || !hole) return
    // Already at this table (an open table can seat him once he is met):
    // nobody needs showing out to let him in a second time.
    if (this.seats.some((s) => s.personality.id === rule.personality.id)) return
    const after = this.stacks()
    if (after[human] <= before[human]) return // the player has to have won chips
    const held = hole.map((c) => c.rank as string).sort().join()
    if (held !== [...rule.holeRanks].sort().join()) return

    // Characters a late arrival is waiting on: removing one would cancel it.
    const awaited = new Set(this.pending.map((p) => p.rule.afterEliminationOf).filter(Boolean))
    const eligible: number[] = []
    for (let i = 0; i < this.seats.length; i++) {
      if (i === human || this.seatBusted[i]) continue
      // Dealt into the hand just played, and still holding chips after it.
      if (before[i] <= 0 || after[i] <= 0) continue
      const id = this.seats[i].personality.id
      if (rule.exclude.includes(id) || awaited.has(id) || id === rule.personality.id) continue
      eligible.push(i)
    }
    // Nobody to remove: the rule stays armed for a later hand.
    if (eligible.length === 0) return

    const seat = eligible[Math.floor(this.opts.rng() * eligible.length)]
    const id = this.seats[seat].personality.id
    const stack = after[seat]
    this.banishmentDone = true
    this.opts.onEvent?.({ type: 'banished', seat, id, stack, by: rule.personality.id })
    this.table.standUp(seat)
    this.seats[seat] = { personality: rule.personality, tilt: 0, stats: newStats() }
    this.table.sitDown(seat, stack)
    this.opts.onEvent?.({
      type: 'arrival',
      seat,
      id: rule.personality.id,
      stack,
      replaces: id,
      cause: 'banishment',
    })
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

  /**
   * What the table has seen of one seat: how often they bet or raise when
   * they act, and how often they fold to a bet. Each starts at the average
   * player's and moves to what has actually been seen as it builds up, so a
   * dozen quiet hands do not make someone a rock. A skilled reader makes up
   * their mind sooner: the average is worth 30 actions at skill 0, 6 at 1.
   * The human seat is read like anyone else.
   */
  private read(seat: number, skill: number): { betFreq: number; foldRate: number; air: number; pfr: number; raiseAir: number } {
    const st = this.seats[seat].stats
    const acts = st.bets + st.calls + st.checks + st.folds
    const prior = READ_PRIOR * (1 - 0.8 * skill)
    const shown = SHOWN_PRIOR * (1 - 0.8 * skill)
    return {
      betFreq: (st.bets + BET_FREQ * prior) / (acts + prior),
      foldRate: (st.foldsToAggression + FOLD_RATE * prior) / (st.facedAggression + prior),
      /** How far short of the nuts their bets after the flop have been seen to be, at showdown. */
      air: Math.max(0.05, 1 - (st.shownBetStrength + SHOWN_BET * shown) / (st.shownBets + shown)),
      /** How often they raise before the flop, a share of hands dealt. */
      pfr: (st.pfr + PFR * prior) / (st.hands + prior),
      /** How far short of the best start their preflop raises have been seen to be. */
      raiseAir: Math.max(0.05, 1 - (st.shownRaiseStrength + SHOWN_RAISE * shown) / (st.shownRaises + shown)),
    }
  }

  /**
   * The fold rate a player bets into. Without skill it is the table's, and
   * only once the table has faced 20 bets (adaptivity's original read). With
   * skill it moves toward the players actually in this pot: a skilled
   * player bluffs the one who folds, not the room.
   */
  private foldRateFacing(seat: number, inHand: number[], skill: number): number {
    const table = this.tableFoldRate(seat)
    if (skill <= 0 || inHand.length === 0) return table
    const theirs = inHand.reduce((a, i) => a + this.read(i, skill).foldRate, 0) / inHand.length
    return table + skill * (theirs - table)
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
