/**
 * TABLE CHATTER: the words that go in with the chips, and the needling after.
 *
 * "Raise." "I'll see that." Dracula folding: "Too rich for my blood." A
 * table that talks while it plays is most of what makes it feel like people
 * rather than a solver. It is also the one kind of dialogue spoken while
 * cards are live, which makes it the one kind that could leak a hand. So:
 *
 * 1. PUBLIC INFORMATION ONLY. A callout is chosen from what everyone at the
 *    table has just seen: the action, whether it emptied the stack, the
 *    street, and whose bet it answered. Never equity, never hole cards, never
 *    the decision's `reason` (which is built from strength). The words are
 *    held to the same rule by check:data: a callout may pun on the ACTION,
 *    never claim or deny a hand, or it becomes a tell outside the
 *    signal-plus-noise system.
 *
 * 2. RATIONED. The design doc warns that generic chatter goes stale in twenty
 *    minutes. Not every action speaks: a chance per action (an all in almost
 *    always, a check hardly ever), a quiet spell for whoever just spoke, one
 *    callout per street for the whole table, and a shuffle-bag per character
 *    and action, so no line comes round again until the rest have been said.
 *
 * 3. ITS OWN STREAM. Choosing words draws from a generator seeded from the
 *    table's seed and nothing else -- never the game's RNG, and not the
 *    director's main stream either, so adding a callout cannot change which
 *    banter is picked later. A resumed game replays the same events into it
 *    and says the same things in the same places.
 *
 * Needles are the between-hands half: when one tablemate folds to another's
 * bet or raise and the one who bet takes the pot, the winner may needle the
 * folder -- if the dialogue file has words for that pair. The trigger is
 * public (who bet, who folded, who was paid), and it is spoken at the hand
 * boundary, after the cards are gone.
 *
 * Nothing here branches on who anyone is. Who says what is data.
 */
import { mulberry32 } from './rng.js'
import { CHARACTERS, type CalloutAction, type Callouts, type Line } from './content.js'
import type { Action } from './decide.js'

export type CalloutBeat = {
  kind: 'callout'
  speaker: string
  text: string
  /** A gesture rather than speech: the data wraps it in [brackets]. */
  stage: boolean
  /** Which pool it came from: the public action, or all_in. */
  action: CalloutAction
}

export const CALLOUT_ACTIONS: CalloutAction[] = ['fold', 'check', 'call', 'bet', 'raise', 'all_in']

/** Chance an action speaks, before the cooldowns. */
export const CALLOUT_CHANCE: Record<CalloutAction, number> = {
  fold: 0.14,
  check: 0.06,
  call: 0.14,
  bet: 0.22,
  raise: 0.28,
  all_in: 0.7,
}
/** Folds and calls before the flop are most of all actions: half as chatty. */
const PREFLOP_ROUTINE = 0.5
/**
 * A short table has fewer actions per hand, so each one speaks a little more
 * readily: heads-up, the champion should not go quiet for eight hands at a
 * time. Keyed by players at the table, the player included.
 */
const SHORT_TABLE: Record<number, number> = { 2: 1.8, 3: 1.3 }
/** Whoever just spoke keeps quiet for this many whole hands. An all in may break it. */
export const CALLOUT_QUIET_HANDS = 2
/** Chance a needle is said when one is earned, and the hands between two of them. */
export const NEEDLE_CHANCE = 0.6
export const NEEDLE_GAP_HANDS = 3

/** Everything a callout may know. All of it was just seen by everyone at the table. */
export type PublicAction = {
  id: string
  hand: number
  street: string
  action: Action
  /** The action emptied the stack: the chips are there on the felt for all to see. */
  allIn: boolean
  /** Players at the table, the player included: the chairs are in plain sight. */
  seated: number
}

export const isStage = (text: string) => /^\[[^\]]*\]$/.test(text.trim())

export class Chatter {
  private rng: () => number
  private lookup: (id: string) => Callouts | undefined
  /** The hand each character last spoke in. */
  private spoke = new Map<string, number>()
  /** `${hand}:${street}` of the last callout: one per street, table-wide. */
  private lastStreet = ''
  /** Shuffle-bags of line indices, per `${id}.${pool}`, and the last index drawn. */
  private bags = new Map<string, number[]>()
  private lastDrawn = new Map<string, number>()
  private lastNeedle = -Infinity
  // Per-hand, per-street bookkeeping for needles.
  private hand = -1
  private street = ''
  private aggressor = -1
  private foldedTo = new Map<number, number>()

  constructor(seed: number, lookup: (id: string) => Callouts | undefined = (id) => CHARACTERS[id]?.callouts) {
    this.rng = mulberry32((seed ^ 0xca11ab1e) >>> 0)
    this.lookup = lookup
  }

  /**
   * Note a public action, for the needles. Every seat's action goes through
   * here, the player's included: a folder can fold to anyone.
   */
  observe(seat: number, action: Action, faced: boolean, hand: number, street: string): void {
    if (hand !== this.hand) {
      this.hand = hand
      this.foldedTo.clear()
      this.street = ''
    }
    if (street !== this.street) {
      this.street = street
      // A new street starts with nobody's bet on the table. The blinds are
      // not a bet anyone chose, so folding to them needles nobody.
      this.aggressor = -1
    }
    if (action === 'bet' || action === 'raise') this.aggressor = seat
    else if (action === 'fold' && faced && this.aggressor >= 0 && this.aggressor !== seat) {
      this.foldedTo.set(seat, this.aggressor)
    }
  }

  /** This hand's folds, as [folder seat, the seat whose bet they folded to]. */
  foldsTo(hand: number): [number, number][] {
    return hand === this.hand ? [...this.foldedTo] : []
  }

  /** Maybe a callout for an action that just landed. Null most of the time, on purpose. */
  callout(a: PublicAction): CalloutBeat | null {
    const own = this.lookup(a.id)
    if (!own) return null
    const kind: CalloutAction = a.allIn && a.action !== 'fold' && a.action !== 'check' ? 'all_in' : a.action
    // No words for going all in: the action underneath still has some.
    const pool: CalloutAction = kind === 'all_in' && !own.all_in?.length ? a.action : kind
    const lines = own[pool]
    if (!lines?.length) return null
    const street = `${a.hand}:${a.street}`
    if (street === this.lastStreet) return null
    const last = this.spoke.get(a.id)
    if (kind !== 'all_in' && last !== undefined && a.hand - last <= CALLOUT_QUIET_HANDS) return null
    let chance = CALLOUT_CHANCE[kind] * (SHORT_TABLE[a.seated] ?? 1)
    if (a.street === 'preflop' && (kind === 'fold' || kind === 'call')) chance *= PREFLOP_ROUTINE
    // Draw only when something could be said, as the director does: a
    // character with nothing to say costs the stream nothing.
    if (this.rng() >= chance) return null
    const text = lines[this.draw(`${a.id}.${pool}`, lines.length)]
    this.lastStreet = street
    this.spoke.set(a.id, a.hand)
    return { kind: 'callout', speaker: a.id, text, stage: isStage(text), action: kind }
  }

  /** Maybe one of the needles on offer. The caller has already filtered them. */
  needle(hand: number, offered: Line[][]): Line[] | null {
    if (!offered.length || hand - this.lastNeedle < NEEDLE_GAP_HANDS) return null
    if (this.rng() >= NEEDLE_CHANCE) return null
    this.lastNeedle = hand
    return offered[Math.floor(this.rng() * offered.length)]
  }

  /** Every line once before any line twice, and never the same line twice running. */
  private draw(key: string, n: number): number {
    let bag = this.bags.get(key)
    if (!bag?.length) this.bags.set(key, (bag = [...Array(n).keys()]))
    const last = this.lastDrawn.get(key)
    const choices = bag.length === n && n > 1 && last !== undefined ? bag.filter((i) => i !== last) : bag
    const i = choices[Math.floor(this.rng() * choices.length)]
    bag.splice(bag.indexOf(i), 1)
    this.lastDrawn.set(key, i)
    return i
  }
}
