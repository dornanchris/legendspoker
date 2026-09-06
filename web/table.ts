import { Game, type HandEvent, type TurnView } from '../src/game.js'
import { CAST, HUMAN, type Personality } from '../src/personality.js'
import { castFor, personalityFor, tableOf, type TableId } from '../src/roster.js'
import { adoptFromSave, beat, forSave, goMap } from './tour.js'
import type { Decision } from '../src/decide.js'
import type { Card } from '../src/equity.js'
import { mulberry32 } from '../src/rng.js'
import { fromJson, toJson, type SaveGame } from '../src/save.js'
import {
  PuppetDirector,
  beats,
  type CharacterInputs,
  type PuppetEvent,
  type PuppetTrigger,
} from '../src/puppet.js'

/**
 * THE PRESENTATION QUEUE, and the view model it writes into.
 *
 * This is the piece that survived the throwaway DOM table, and the reason it
 * survived: the engine resolves a hand as fast as it can and pushes events;
 * the queue plays them back on its own clock. The two clocks never touch. The
 * ONLY place they meet is a one-way wait before the player is asked to act --
 * presentation never feeds back into how a hand resolves.
 *
 * That separation is non-negotiable #6's whole basis. Phase 6's fast-forward
 * scales the delays below and nothing else; `?pace=0.1` already does exactly
 * that, and the hand resolves identically at any speed.
 *
 * React sits downstream of all this. It subscribes, it renders, and it hands
 * decisions back -- it does not own the loop. Deliberate: the game is a state
 * machine driven by an async engine, and making React the driver would put a
 * render clock in the middle of the simulation.
 */

const HUMAN_SEAT = 0
const BUY_IN = 2000

/**
 * Who is at the table. Set when a table is entered, because that is now a
 * choice made on the map rather than a constant.
 *
 * By default a destination seats its ROSTER cast. `?cast=proto` seats the
 * prototype three instead -- Dracula, the Snowman and Cleopatra -- which are
 * the tuning fixtures every baseline in CLAUDE.md is measured against, and
 * the only characters with authored quirks and tells. Keeping that switch is
 * what stops the roster quietly replacing the instrument.
 */
let seats: Personality[] = [HUMAN, ...CAST]

function castForTable(id: TableId | null): Personality[] {
  if (!id || params.get('cast') === 'proto') return [HUMAN, ...CAST]
  // The champion of a late-entrance table is NOT seated: they arrive after an
  // elimination, and that beat is Phase 7. Only the four chairs are dealt in.
  const table = tableOf(id)
  const npcs = castFor(id).filter((e) => table && table.seats.includes(e.id))
  return [HUMAN, ...npcs.map(personalityFor)]
}

const params = new URLSearchParams(location.search)

/**
 * Presentation clock only. Nothing here is allowed to reach the game loop.
 * ?pace=0.2 speeds playback up for testing; it scales these delays and
 * NOTHING else.
 */
const PACE_SCALE = Math.max(0, Number(params.get('pace') ?? 1))
const BASE = { action: 620, street: 700, reveal: 1300, showdown: 2600, result: 1000, level: 900 }
const PACE = Object.fromEntries(
  Object.entries(BASE).map(([k, v]) => [k, v * PACE_SCALE]),
) as typeof BASE

/** One slot, in localStorage. A real save UI is not this phase's job. */
const SAVE_KEY = 'legends.save'

/**
 * ?puppet=1 shows the live state machine inputs on every seat.
 *
 * This is how the contract in BUILD-PLAN section 4 gets watched before a
 * single .riv file exists: the values a rig will consume, changing in real
 * time against a real hand. If mood reads miserable while a character is
 * winning, that is visible here rather than after ninety hours of animation.
 */
const SHOW_PUPPET = params.get('puppet') === '1'

// ------------------------------------------------------------------- the view

export type SeatView = {
  seat: number
  name: string
  stack: number
  /** null is a face-down back; an empty array is a mucked hand. */
  cards: (Card | null)[]
  last: string
  tell: string
  folded: boolean
  out: boolean
  acting: boolean
  winner: boolean
}

export type LogLine = { id: number; text: string; kind: '' | 'head' | 'you' | 'big' }

/** What a rig would be reading, per seat. Debug view only. */
export type PuppetView = CharacterInputs & { fired: PuppetTrigger[] }

export type TableView = {
  opponents: SeatView[]
  you: SeatView
  board: Card[]
  pot: number
  blinds: string
  handNo: number
  /** Card keys to gold-outline: the five that actually took a pot. */
  winning: ReadonlySet<string>
  prompt: string
  /** Non-null exactly while the player is being asked to act. */
  turn: TurnView | null
  log: LogLine[]
  status: 'playing' | 'won' | 'lost'
  saveNote: string
  /** The destination being played, for the table header. */
  title: string
  /** Empty unless ?puppet=1. Indexed by seat. */
  puppets: PuppetView[]
}

export const cardKey = (c: Card) => `${c.rank}${c.suit[0]}`

const emptySeat = (seat: number): SeatView => ({
  seat,
  name: seats[seat].name,
  stack: 0,
  cards: [],
  last: '',
  tell: '',
  folded: false,
  out: false,
  acting: false,
  winner: false,
})

const blankView = (): TableView => ({
  opponents: seats.map((_, i) => i).filter((i) => i !== HUMAN_SEAT).map(emptySeat),
  you: emptySeat(HUMAN_SEAT),
  board: [],
  pot: 0,
  blinds: '',
  handNo: 0,
  winning: new Set(),
  prompt: 'Waiting…',
  turn: null,
  log: [],
  status: 'playing',
  saveNote: '',
  title: '',
  puppets: [],
})

let view: TableView = blankView()

const listeners = new Set<() => void>()

export function subscribe(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function snapshot(): TableView {
  return view
}

/** Replaces the view wholesale, so React can compare by identity. */
function set(patch: Partial<TableView>): void {
  view = { ...view, ...patch }
  for (const fn of listeners) fn()
}

/** Applies a change to one seat, wherever it sits. */
function setSeat(seat: number, patch: Partial<SeatView>): void {
  if (seat === HUMAN_SEAT) set({ you: { ...view.you, ...patch } })
  else set({ opponents: view.opponents.map((s) => (s.seat === seat ? { ...s, ...patch } : s)) })
}

function eachSeat(patch: (s: SeatView) => Partial<SeatView>): void {
  set({
    you: { ...view.you, ...patch(view.you) },
    opponents: view.opponents.map((s) => ({ ...s, ...patch(s) })),
  })
}

function setStacks(stacks: number[]): void {
  eachSeat((s) => ({ stack: stacks[s.seat] ?? s.stack }))
}

let logId = 0
function log(text: string, kind: LogLine['kind'] = ''): void {
  set({ log: [...view.log, { id: logId++, text, kind }] })
}

// -------------------------------------------------------------------- the queue

type Step = { apply: () => void; delay: number }
const queue: Step[] = []
let draining = false
let waiters: (() => void)[] = []
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

let game: Game

/**
 * The puppet director runs HERE, on the presentation clock, and not in the
 * engine. A character has to react when the player SEES an event, not when
 * the engine computed it -- the engine resolves a whole hand in about 16ms.
 * That is the same separation the queue itself exists for.
 *
 * It draws no randomness and never reaches back into the game, so having it
 * attached cannot change how a hand resolves.
 */
let director = new PuppetDirector(seats.length, { humanSeat: HUMAN_SEAT })
/** Triggers fired by the beat currently being shown, for the debug overlay. */
let firedNow: PuppetTrigger[][] = seats.map(() => [])

/** Feeds one beat to the director, from inside the step that displays it. */
function puppet(e: PuppetEvent): void {
  const fired = director.apply(e)
  firedNow = seats.map(() => [])
  for (const f of fired) firedNow[f.seat]?.push(f.trigger)
}

function publishPuppets(): void {
  if (!SHOW_PUPPET) return
  set({
    puppets: seats.map((_, i) => ({ ...director.inputs(i), fired: firedNow[i] ?? [] })),
  })
}

function step(apply: () => void, delay: number): void {
  // A restored hand is catching the display up to a position the player was
  // already at, so it is drawn instantly. Still presentation only: replaying
  // changes the CLOCK, never the events.
  queue.push({ apply, delay: game?.isReplaying() ? 0 : delay })
  void drain()
}

async function drain(): Promise<void> {
  if (draining) return
  draining = true
  while (queue.length) {
    const s = queue.shift()!
    s.apply()
    publishPuppets()
    await sleep(s.delay)
    // Ticked with the delay actually waited, so attention decays against what
    // the player watched rather than against how fast the engine ran.
    director.tick(s.delay)
    publishPuppets()
  }
  draining = false
  const w = waiters
  waiters = []
  for (const f of w) f()
}

/** Resolves once everything queued has actually been shown. */
function settled(): Promise<void> {
  if (!draining && queue.length === 0) return Promise.resolve()
  return new Promise((r) => waiters.push(r))
}

// -------------------------------------------------------------------- wording

const SUIT = { clubs: '♣', diamonds: '♦', hearts: '♥', spades: '♠' } as const
const cardText = (c: Card) => `${c.rank}${SUIT[c.suit]}`
const handText = (cards: Card[]) => cards.map(cardText).join(' ')
const nameOf = (seat: number) => seats[seat].name

const TELL_TEXT: Record<string, string> = {
  steeples_fingers: 'steeples his fingers',
  glances_at_exit: 'glances toward the exit',
  stares_blankly: 'stares blankly at the board',
  shifts_forward: 'shifts forward in his seat',
  adjusts_headdress: 'adjusts her headdress',
  goes_still: 'goes completely still',
}

/** "You and Dracula" / "Dracula, Cleopatra and You" */
function joinNames(seats: number[]): string {
  const names = seats.map(nameOf)
  if (names.length <= 1) return names[0] ?? ''
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

/**
 * The human seat is called "You", so everything about it has to read in the
 * second person or the log says "You folds" and "You is out".
 */
export function describe(d: Decision, you = false): string {
  const v = (third: string, second: string) => (you ? second : third)
  switch (d.action) {
    case 'fold': return v('folds', 'fold')
    case 'check': return v('checks', 'check')
    case 'call': return v('calls', 'call')
    case 'bet': return `${v('bets', 'bet')} ${d.betSize}`
    case 'raise': return `${v('raises', 'raise')} to ${d.betSize}`
  }
}

// --------------------------------------------------------------------- events

function onEvent(e: HandEvent): void {
  switch (e.type) {
    case 'street': {
      step(() => {
        puppet(e)
        setStacks(e.stacks)
        set({ board: e.board })
        if (e.street !== 'preflop') log(`— ${e.street} —`, 'head')
        eachSeat(() => ({ tell: '' }))
      }, e.street === 'preflop' ? 0 : PACE.street)
      break
    }
    case 'tell': {
      step(() => {
        puppet(e)
        setSeat(e.seat, { tell: `${nameOf(e.seat)} ${TELL_TEXT[e.signal] ?? e.signal}` })
      }, 340)
      break
    }
    case 'action': {
      const you = e.seat === HUMAN_SEAT
      // The seat card is always an opponent, so it stays third person; only
      // the log has to agree with "You".
      const text = describe(e.decision)
      const logText = describe(e.decision, you)
      const total = you ? 220 : PACE.action

      // ONE engine event, TWO presentation beats. The engine decides and acts
      // in the same instant; the pause between them is something the display
      // invents, and it is the only window in which a character can be seen
      // to be thinking -- which is where a tell lives. Splitting it is what
      // makes `isThinking` mean anything.
      //
      // The two delays sum to what the single step used to take, so the pace
      // of a hand is unchanged.
      const [thinking, acting] = beats(e)
      step(() => {
        puppet(thinking)
        eachSeat((s) => ({ acting: s.seat === e.seat }))
      }, total * 0.45)
      step(() => {
        puppet(acting)
        setSeat(e.seat, { last: text })
        if (e.decision.action === 'fold') {
          // Mucked cards are gone, not face-down: leaving backs up reads as
          // "still in the hand".
          setSeat(e.seat, { folded: true, cards: [] })
        }
        setStacks(e.stacks)
        set({ pot: e.pot })
        log(`${nameOf(e.seat)} ${logText}`, you ? 'you' : '')
      }, total * 0.55)
      break
    }
    case 'showdown': {
      // Beat one: turn the cards over and let them sit there.
      step(() => {
        puppet(e)
        eachSeat(() => ({ acting: false }))
        // Show the full run-out. On an all-in the board finished without any
        // further action, so this is the first chance to draw the last cards.
        set({ board: e.board })
        for (const { seat, hole } of e.revealed) setSeat(seat, { cards: hole })
        if (e.revealed.length > 1) {
          log('— showdown —', 'head')
          // Write out what everyone actually held. The log is the reviewable
          // record of the hand -- and the non-visual channel -- so it should
          // not need the table to be readable after the fact.
          for (const { seat, hole } of e.revealed) {
            const verb = seat === HUMAN_SEAT ? 'show' : 'shows'
            log(`${nameOf(seat)} ${verb} ${handText(hole)}`, seat === HUMAN_SEAT ? 'you' : '')
          }
        }
      }, PACE.reveal)

      // Beat two, once per pot: light up the five cards that actually won it
      // and say so. Separate beats because a side pot is a separate result,
      // and running them together is what made two winners look like one
      // confusing event.
      e.pots.forEach((pot, i) => {
        step(() => {
          set({ winning: new Set((pot.cards ?? []).map(cardKey)) })
          eachSeat((s) => ({ winner: pot.winners.includes(s.seat) }))

          const label =
            e.pots.length === 1 ? 'the pot' : i === 0 ? 'the main pot' : `side pot ${i}`
          const withWhat = pot.ranking
            ? ` with ${pot.ranking}${pot.cards ? ` — ${handText(pot.cards)}` : ''}`
            : ' uncontested'
          if (pot.winners.length > 1) {
            log(`${joinNames(pot.winners)} SPLIT ${label} (${pot.amount})${withWhat}`, 'big')
          } else {
            const w = pot.winners[0]
            const verb = w === HUMAN_SEAT ? 'win' : 'wins'
            log(`${nameOf(w)} ${verb} ${label} (${pot.amount})${withWhat}`, 'big')
          }
        }, PACE.showdown)
      })
      break
    }
    case 'result': {
      // Tilt rides on this event, so the director must see it even when there
      // is nothing worth writing in the log.
      if (e.delta === 0) {
        step(() => puppet(e), 0)
        break
      }
      step(() => {
        puppet(e)
        const sign = e.delta > 0 ? '+' : ''
        log(`  ${nameOf(e.seat)} ${sign}${e.delta}`, e.seat === HUMAN_SEAT ? 'you' : '')
      }, 0)
      break
    }
    case 'level': {
      step(() => {
        set({ blinds: `blinds ${e.smallBlind}/${e.bigBlind}` })
        log(`Blinds up: ${e.smallBlind}/${e.bigBlind}`, 'head')
      }, PACE.level)
      break
    }
    case 'eliminated': {
      step(() => {
        puppet(e)
        setSeat(e.seat, { out: true })
        const ord = `${e.place}${['st', 'nd', 'rd', 'th'][e.place - 1] ?? 'th'}`
        log(`${nameOf(e.seat)} ${e.seat === HUMAN_SEAT ? 'are' : 'is'} out (${ord})`, 'big')
      }, PACE.result)
      break
    }
  }
}

// ------------------------------------------------------------------ your turn

let resolveTurn: ((d: Decision) => void) | null = null

/** Called by the UI when the player commits to an action. */
export function act(d: Decision): void {
  const r = resolveTurn
  if (!r) return
  resolveTurn = null
  set({ turn: null, prompt: '' })
  r(d)
}

async function onHumanTurn(turn: TurnView): Promise<Decision> {
  // Do not ask for a decision until the player has actually SEEN what led to
  // it. This is the only place the two clocks meet, and it is a one-way wait.
  await settled()

  eachSeat(() => ({ acting: false }))
  setStacks(turn.stacks)
  setSeat(HUMAN_SEAT, { cards: turn.hole })
  set({
    pot: turn.pot,
    turn,
    prompt: turn.toCall > 0 ? `${turn.toCall} to call` : 'Check or bet',
  })

  return new Promise<Decision>((resolve) => { resolveTurn = resolve })
}

// --------------------------------------------------------------------- saving

/**
 * localStorage, defensively.
 *
 * Reading the `localStorage` property itself throws when a browser is set to
 * block site data, and Safari in Private Browsing has historically thrown on
 * setItem with a zero quota. Unguarded, that turns the Save button into an
 * uncaught error on the one platform this repo cannot test locally.
 */
function readStore(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStore(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function clearStore(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // Nothing to clean up if the store was never readable.
  }
}

/**
 * Is there a table part-way through? The home screen needs to know, or leaving
 * a table mid-hand strands you: Continue does not appear, and the only button
 * left says "Begin the tour" and wipes your progress to get back in.
 */
export function savedTable(): TableId | null {
  const raw = readStore(SAVE_KEY)
  if (!raw) return null
  try {
    const t = fromJson(raw).tour?.table
    return typeof t === 'string' ? (t as TableId) : null
  } catch {
    return null
  }
}

function readSave(): SaveGame | null {
  if (params.has('new')) return null
  const raw = readStore(SAVE_KEY)
  if (!raw) return null
  try {
    return fromJson(raw)
  } catch (e) {
    // A save this build cannot read is dropped rather than half-applied.
    console.warn('discarding an unreadable save:', e)
    clearStore(SAVE_KEY)
    return null
  }
}

/**
 * Writes the current game to localStorage. Available mid-hand, which is the
 * case the schema exists for: the save carries the human's decisions so far
 * and the restore replays them.
 */
export function saveGame(quiet = false): void {
  const save = game.save()
  // The campaign context rides along, so a save is self-contained: which
  // destination it belongs to, and the tour progress at the time.
  save.tour = { ...forSave(), table: playing }
  const ok = writeStore(SAVE_KEY, toJson(save))
  if (quiet) return
  // Say so when it did not work. A Save button that silently does nothing is
  // worse than no Save button.
  set({ saveNote: ok ? 'Saved.' : 'Could not save — storage is blocked.' })
  setTimeout(() => set({ saveNote: '' }), 2500)
}

// --------------------------------------------------------------------- driver

let started = false

/** Which destination is being played. Recorded in the save so a resume knows. */
let playing: TableId | null = null

/**
 * Leaves the table for the map. The game is written down first: a table is an
 * elimination tournament that can run three quarters of an hour, so walking
 * away from one has to be free.
 */
export function leave(): void {
  if (started && view.status === 'playing') saveGame(true)
  goMap()
}

export async function start(id: TableId | null): Promise<void> {
  if (started) return
  started = true
  playing = id
  seats = castForTable(id)
  view = blankView()
  set({ title: (id && tableOf(id)?.displayName) || 'Exhibition table' })

  // A restored game restarts the director from the seats it finds, not from a
  // saved copy: nothing in here is game state, it is all derived from the
  // events of the hand being replayed.
  director = new PuppetDirector(seats.length, { humanSeat: HUMAN_SEAT })

  const saved = readSave()
  // A save belongs to the table it was taken at. Arriving somewhere else is
  // not a resume, it is a new tournament.
  const belongsHere = saved && (saved.tour?.table ?? null) === playing
  if (saved && belongsHere) {
    adoptFromSave(saved.tour)
    game = Game.load(saved, seats, { onHumanTurn, onEvent })
    // Eliminations happened in hands this session never saw, so the busted
    // seats are read back from the chips rather than from past events.
    eachSeat((s) => ({ out: game.stacks()[s.seat] === 0 }))
    set({ handNo: game.handCount() })
    log(`Resumed at hand ${game.handCount() + 1}.`, 'head')
  } else {
    // Seeded, always. An unseeded game cannot be saved -- there would be no
    // stream position to write down -- so the table is seeded even when
    // nobody asked for a particular one.
    const seed = Number(params.get('seed') ?? Date.now() % 0x7fffffff)
    game = new Game(seats, {
      mode: 'tournament',
      buyIn: BUY_IN,
      rollouts: 60,
      seed,
      rng: mulberry32(seed),
      humanSeat: HUMAN_SEAT,
      onHumanTurn,
      onEvent,
    })
  }

  set({ blinds: `blinds ${game.bigBlind() / 2}/${game.bigBlind()}` })
  setStacks(game.stacks())

  while (!game.isComplete()) {
    const handNo = view.handNo + 1
    newHand(handNo)
    await game.playHand()
    await settled()
    // Mood moves once per hand, at settlement, against the stacks the next
    // hand will start from.
    director.apply({ type: 'handEnd', stacks: game.stacks() })
    publishPuppets()
    setStacks(game.stacks())
    if (view.you.out) break
    await sleep(500 * PACE_SCALE)
  }

  await settled()
  // A finished table must not resume: the save would restore a game with
  // nothing left to play.
  clearStore(SAVE_KEY)
  const won = game.survivors()[0] === HUMAN_SEAT
  // Progression is respect, per the design doc: beating the table is the
  // unlock, and there is no score attached to it.
  if (won && playing) beat(playing)
  set({
    status: won ? 'won' : 'lost',
    prompt: won ? 'You hold every chip. Table cleared.' : 'You are out.',
  })
  log(won ? 'You win the table.' : 'You are out.', 'big')
  started = false
}

function newHand(handNo: number): void {
  director.apply({ type: 'handStart', stacks: game.stacks() })
  publishPuppets()
  set({ board: [], pot: 0, winning: new Set(), handNo })
  eachSeat((s) => ({
    // Two backs for an opponent still in the hand; your own are dealt to you
    // when you are asked to act.
    cards: s.seat === HUMAN_SEAT || s.out ? [] : [null, null],
    last: '',
    tell: '',
    folded: false,
    acting: false,
    winner: false,
  }))
  log(`Hand ${handNo}`, 'head')
}
