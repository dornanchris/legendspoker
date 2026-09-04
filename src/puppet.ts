import type { HandEvent } from './game.js'

/**
 * THE STATE MACHINE INPUT CONTRACT (BUILD-PLAN section 4).
 *
 * "The single most important interface in the project, because it lets rigging
 * and programming proceed in parallel instead of blocking each other."
 *
 * Every character's Rive state machine exposes these same inputs. The game
 * derives them from engine events and fires them; what any of them MEANS is
 * decided inside the .riv file. `tellA` is Dracula's chalice pause and Van
 * Helsing's brim tilt -- the game just fires tellA. Adding a character means
 * producing a .riv that conforms to this, and no code changes at all.
 *
 * This mirrors the decide() rule exactly: one shared interface, all the
 * per-character meaning in data.
 *
 * TWO THINGS THIS FILE IS CAREFUL ABOUT:
 *
 * 1. It runs on the PRESENTATION clock, not the engine's. The engine resolves
 *    a hand as fast as it can; the queue plays it back. A puppet must react
 *    when the player SEES the event, not when the engine computed it -- so
 *    the director is fed from inside the queue and ticked with the same
 *    delays. Nothing in here may reach back into the game.
 * 2. It draws no randomness. Everything is a pure function of events already
 *    determined by the seed, so two runs of the same hand animate the same.
 */

/** One-shot triggers. Fired, never held. */
export type PuppetTrigger =
  | 'fireBet'
  | 'fireFold'
  | 'fireCall'
  | 'fireCheck'
  | 'fireWin'
  | 'fireLose'
  | 'fireReact'
  | 'tellA'
  | 'tellB'
  | 'tellC'

/** The tell vocabulary, indexed by slot. A character has at most three. */
export const TELL_TRIGGERS = ['tellA', 'tellB', 'tellC'] as const satisfies readonly PuppetTrigger[]

/** Continuous and boolean inputs. Held, and read every frame by the rig. */
export type CharacterInputs = {
  /** 0..1, losing to winning. Chip position at the table, eased so a single
   *  hand does not snap the face from despair to triumph. */
  mood: number
  /** 0..1, straight from the engine's tilt system. */
  tilt: number
  /** 0..1, how much they are watching the player. Bumped by events, decays. */
  attention: number
  /** Gates whether tell clusters can fire at all: a folded seat leaks nothing. */
  isInHand: boolean
  /** Deliberating: from the moment the turn lands on them until they act. */
  isThinking: boolean
  /** The spotlight is on them. Stays lit through their action, unlike
   *  isThinking, so the rig can hold a lean-in across the bet itself. */
  isTurn: boolean
}

export type Fired = { seat: number; trigger: PuppetTrigger }

/**
 * Presentation-level markers the engine does not emit, because they are about
 * pacing rather than poker. The queue knows them; the engine does not need to.
 */
export type PuppetEvent =
  | HandEvent
  | { type: 'handStart'; stacks: number[] }
  /** Settled, with the stacks the next hand starts from. Where mood moves. */
  | { type: 'handEnd'; stacks: number[] }
  /** The turn has landed on this seat and the thinking beat has begun. */
  | { type: 'turn'; seat: number }

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)

/** How fast attention falls back to its floor, as a half-life in ms. */
const ATTENTION_HALF_LIFE = 1800
/** How much of the gap to its target mood closes each hand. */
const MOOD_EASE = 0.3

const ATTENTION_FLOOR_IDLE = 0.12
const ATTENTION_FLOOR_IN_HAND = 0.35

type SeatState = CharacterInputs & { out: boolean }

export type DirectorOptions = {
  /** The human's seat. Attention means watching THEM, so it has to be known. */
  humanSeat?: number
}

export class PuppetDirector {
  private seats: SeatState[]
  private humanSeat: number | undefined
  /** Total chips in play, for the mood denominator. Set at the first hand. */
  private totalChips = 0
  private stacks: number[]

  constructor(seatCount: number, opts: DirectorOptions = {}) {
    this.humanSeat = opts.humanSeat
    this.stacks = new Array(seatCount).fill(0)
    this.seats = Array.from({ length: seatCount }, () => ({
      mood: 0.5,
      tilt: 0,
      attention: ATTENTION_FLOOR_IDLE,
      isInHand: false,
      isThinking: false,
      isTurn: false,
      out: false,
    }))
  }

  inputs(seat: number): CharacterInputs {
    const s = this.seats[seat]
    return {
      mood: s.mood,
      tilt: s.tilt,
      attention: s.attention,
      isInHand: s.isInHand,
      isThinking: s.isThinking,
      isTurn: s.isTurn,
    }
  }

  /**
   * Advances the PRESENTATION clock. Called with the delay of each queue step,
   * so a fast-forwarded hand decays attention over the same events but in less
   * wall-clock time -- which is correct: the character is reacting to what is
   * on screen.
   */
  tick(ms: number): void {
    if (ms <= 0) return
    const keep = Math.pow(0.5, ms / ATTENTION_HALF_LIFE)
    for (const s of this.seats) {
      const floor = s.out ? 0 : s.isInHand ? ATTENTION_FLOOR_IN_HAND : ATTENTION_FLOOR_IDLE
      s.attention = floor + (s.attention - floor) * keep
    }
  }

  /** Feeds one presentation event. Returns the triggers to fire, in order. */
  apply(e: PuppetEvent): Fired[] {
    const fired: Fired[] = []
    switch (e.type) {
      case 'handStart': {
        this.stacks = [...e.stacks]
        if (!this.totalChips) this.totalChips = e.stacks.reduce((a, b) => a + b, 0)
        for (let i = 0; i < this.seats.length; i++) {
          const s = this.seats[i]
          s.isInHand = !s.out && e.stacks[i] > 0
          s.isThinking = false
          s.isTurn = false
        }
        break
      }

      case 'handEnd': {
        this.stacks = [...e.stacks]
        for (const s of this.seats) {
          s.isThinking = false
          s.isTurn = false
        }
        // Mood moves once per hand, at settlement -- not per action. A face
        // that tracked the pot would be a readout, and the whole design says
        // no single signal may be one.
        this.easeMood()
        break
      }

      case 'turn': {
        this.beginTurn(e.seat)
        break
      }

      case 'tell': {
        // A tell arrives BEFORE the action it leaks, so it is also the first
        // sign the turn has landed. Beginning the turn here rather than
        // demanding a marker first keeps the director robust to the order the
        // queue happens to play beats in.
        this.beginTurn(e.seat)
        // Only a live hand can leak. An idle flourish from a folded seat is
        // ambient noise and belongs to the rig, not to the tell system.
        const s = this.seats[e.seat]
        if (s?.isInHand) {
          const trigger = TELL_TRIGGERS[e.slot]
          if (trigger) fired.push({ seat: e.seat, trigger })
        }
        break
      }

      case 'action': {
        const s = this.seats[e.seat]
        if (!s) break
        // A seat can act without a preceding tell or marker; the turn still
        // began, it just had no visible deliberation.
        this.beginTurn(e.seat)
        s.isThinking = false
        this.stacks = [...e.stacks]

        const act = e.decision.action
        // No fireRaise in the contract: a raise IS a bet, performed. The
        // difference is size, which the rig reads from the chips, not a flag.
        const trigger: PuppetTrigger =
          act === 'fold' ? 'fireFold'
          : act === 'call' ? 'fireCall'
          : act === 'check' ? 'fireCheck'
          : 'fireBet'
        fired.push({ seat: e.seat, trigger })

        if (act === 'fold') {
          s.isInHand = false
          s.isTurn = false
        }

        // Everyone still in the hand reacts to aggression -- that is the beat
        // where the table looks at whoever just fired.
        if (act === 'bet' || act === 'raise') {
          for (let i = 0; i < this.seats.length; i++) {
            if (i === e.seat || !this.seats[i].isInHand) continue
            fired.push({ seat: i, trigger: 'fireReact' })
            this.bump(i, 0.35)
          }
        }
        // The player acting is the thing opponents are watching for.
        if (e.seat === this.humanSeat) {
          for (let i = 0; i < this.seats.length; i++) {
            if (i !== e.seat && this.seats[i].isInHand) this.bump(i, 0.5)
          }
        }
        break
      }

      case 'showdown': {
        for (const s of this.seats) {
          s.isThinking = false
          s.isTurn = false
        }
        // Cards on the table: everyone at the table is looking.
        for (let i = 0; i < this.seats.length; i++) if (!this.seats[i].out) this.bump(i, 0.6)
        const won = new Set<number>()
        for (const pot of e.pots) for (const w of pot.winners) won.add(w)
        for (const seat of won) {
          if (this.seats[seat]) fired.push({ seat, trigger: 'fireWin' })
        }
        break
      }

      case 'result': {
        const s = this.seats[e.seat]
        if (!s) break
        s.tilt = clamp01(e.tilt)
        // Only a seat that was still in the hand performs a loss. Folding and
        // losing your blind is not a beat, it is Tuesday.
        if (e.delta < 0 && s.isInHand) fired.push({ seat: e.seat, trigger: 'fireLose' })
        break
      }

      case 'eliminated': {
        const s = this.seats[e.seat]
        if (!s) break
        s.out = true
        s.isInHand = false
        s.isThinking = false
        s.isTurn = false
        s.attention = 0
        s.mood = 0
        // The survivors register that a chair just emptied.
        for (let i = 0; i < this.seats.length; i++) {
          if (i === e.seat || this.seats[i].out) continue
          fired.push({ seat: i, trigger: 'fireReact' })
          this.bump(i, 0.5)
        }
        break
      }

      case 'street': {
        this.stacks = [...e.stacks]
        for (let i = 0; i < this.seats.length; i++) if (!this.seats[i].out) this.bump(i, 0.25)
        break
      }
    }
    return fired
  }

  /**
   * Idempotent: the turn may be announced by a marker, by a tell, or by the
   * action itself, whichever the queue reaches first. Re-announcing the seat
   * that already holds the turn must not restart its deliberation.
   */
  private beginTurn(seat: number): void {
    const s = this.seats[seat]
    if (!s || s.out || s.isTurn) return
    for (const other of this.seats) {
      other.isThinking = false
      other.isTurn = false
    }
    s.isThinking = true
    s.isTurn = true
    // Their turn, so they look up: at the board, and at you.
    this.bump(seat, 0.3)
  }

  private bump(seat: number, amount: number): void {
    const s = this.seats[seat]
    if (!s || s.out) return
    s.attention = clamp01(s.attention + amount)
  }

  /**
   * Mood is chip POSITION, not the last hand's result. The momentary reaction
   * to winning or losing a pot is what fireWin and fireLose are for.
   *
   * Three anchors, and all three have to hold or the face lies at exactly the
   * moments that matter most:
   *   busted            -> 0
   *   an even share     -> 0.5
   *   every chip at the table -> 1
   *
   * An earlier version used "twice an even stack reads 1.0", which looks
   * reasonable and is wrong at the end of a table: heads-up, twice an even
   * stack is more chips than exist, so the player who had just won everything
   * read 0.39 -- miserable, at the moment of winning.
   */
  private easeMood(): void {
    const alive = this.seats.filter((s) => !s.out).length
    if (!alive || !this.totalChips) return
    const even = 1 / alive
    for (let i = 0; i < this.seats.length; i++) {
      const s = this.seats[i]
      if (s.out) { s.mood = 0; continue }
      const share = (this.stacks[i] ?? 0) / this.totalChips
      const target =
        alive <= 1 ? 1
        : share <= even ? 0.5 * (share / even)
        : 0.5 + 0.5 * ((share - even) / (1 - even))
      s.mood = clamp01(s.mood + (clamp01(target) - s.mood) * MOOD_EASE)
    }
  }
}

/**
 * Splits one engine event into the presentation BEATS a puppet reacts to.
 *
 * An action is TWO beats: the turn landing on a seat, and the action itself.
 * That is the whole reason `isThinking` can be true for a measurable window --
 * the engine resolves both in the same instant, and the pause between them is
 * a thing the presentation invents. It is also where a tell lives.
 *
 * Shared by the web table and by `npm run check:puppet`, so the contract is
 * tested against the same beat structure the game actually plays.
 */
export function beats(e: HandEvent): PuppetEvent[] {
  if (e.type === 'action') return [{ type: 'turn', seat: e.seat }, e]
  return [e]
}
