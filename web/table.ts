import { Game, type HandEvent, type TurnView } from '../src/game.js'
import { CAST, HUMAN } from '../src/personality.js'
import type { Decision } from '../src/decide.js'
import type { Card } from '../src/equity.js'
import { mulberry32 } from '../src/rng.js'
import { fromJson, toJson, type SaveGame } from '../src/save.js'

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
const SEATS = [HUMAN, ...CAST]
const BUY_IN = 2000

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
}

export const cardKey = (c: Card) => `${c.rank}${c.suit[0]}`

const emptySeat = (seat: number): SeatView => ({
  seat,
  name: SEATS[seat].name,
  stack: 0,
  cards: [],
  last: '',
  tell: '',
  folded: false,
  out: false,
  acting: false,
  winner: false,
})

let view: TableView = {
  opponents: SEATS.map((_, i) => i).filter((i) => i !== HUMAN_SEAT).map(emptySeat),
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
}

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
    await sleep(s.delay)
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
const nameOf = (seat: number) => SEATS[seat].name

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
        setStacks(e.stacks)
        set({ board: e.board })
        if (e.street !== 'preflop') log(`— ${e.street} —`, 'head')
        eachSeat(() => ({ tell: '' }))
      }, e.street === 'preflop' ? 0 : PACE.street)
      break
    }
    case 'tell': {
      step(() => {
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
      step(() => {
        eachSeat((s) => ({ acting: s.seat === e.seat }))
        setSeat(e.seat, { last: text })
        if (e.decision.action === 'fold') {
          // Mucked cards are gone, not face-down: leaving backs up reads as
          // "still in the hand".
          setSeat(e.seat, { folded: true, cards: [] })
        }
        setStacks(e.stacks)
        set({ pot: e.pot })
        log(`${nameOf(e.seat)} ${logText}`, you ? 'you' : '')
      }, you ? 220 : PACE.action)
      break
    }
    case 'showdown': {
      // Beat one: turn the cards over and let them sit there.
      step(() => {
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
      if (e.delta === 0) break
      step(() => {
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

function readSave(): SaveGame | null {
  if (params.has('new')) return null
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return null
  try {
    return fromJson(raw)
  } catch (e) {
    // A save this build cannot read is dropped rather than half-applied.
    console.warn('discarding an unreadable save:', e)
    localStorage.removeItem(SAVE_KEY)
    return null
  }
}

/**
 * Writes the current game to localStorage. Available mid-hand, which is the
 * case the schema exists for: the save carries the human's decisions so far
 * and the restore replays them.
 */
export function saveGame(): void {
  localStorage.setItem(SAVE_KEY, toJson(game.save()))
  set({ saveNote: 'Saved.' })
  setTimeout(() => set({ saveNote: '' }), 2500)
}

// --------------------------------------------------------------------- driver

let started = false

export async function start(): Promise<void> {
  if (started) return
  started = true

  const saved = readSave()
  if (saved) {
    game = Game.load(saved, SEATS, { onHumanTurn, onEvent })
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
    game = new Game(SEATS, {
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
    setStacks(game.stacks())
    if (view.you.out) break
    await sleep(500 * PACE_SCALE)
  }

  await settled()
  // A finished table must not resume: the save would restore a game with
  // nothing left to play.
  localStorage.removeItem(SAVE_KEY)
  const won = game.survivors()[0] === HUMAN_SEAT
  set({
    status: won ? 'won' : 'lost',
    prompt: won ? 'You hold every chip. Table cleared.' : 'You are out.',
  })
  log(won ? 'You win the table.' : 'You are out.', 'big')
}

function newHand(handNo: number): void {
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
