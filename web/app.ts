import { Game, type HandEvent, type TurnView } from '../src/game.js'
import { CAST, HUMAN } from '../src/personality.js'
import type { Action, Decision } from '../src/decide.js'
import type { Card } from '../src/equity.js'
import { mulberry32 } from '../src/rng.js'
import { fromJson, toJson, type SaveGame } from '../src/save.js'

/**
 * PHASE 3b — human seat + throwaway DOM table. No art, no Rive, no 3D.
 *
 * Exit test: play 20 hands voluntarily and be able to name each character's
 * style without reading the code.
 *
 * The one piece of architecture worth keeping: the PRESENTATION QUEUE below.
 * The engine resolves a hand as fast as it can and pushes events; the UI plays
 * them back on its own clock. The two clocks never touch, which is the
 * non-negotiable that fast-forward depends on later -- speeding up playback
 * must not change a single card or decision.
 */

const HUMAN_SEAT = 0
const SEATS = [HUMAN, ...CAST]
const BUY_IN = 2000

const params = new URLSearchParams(location.search)
/**
 * One slot, in localStorage. A real save UI is Phase 4's job; this exists so
 * the schema can be exercised by hand -- save mid-hand, close the tab, come
 * back -- which is the only way to find out whether it holds up.
 */
const SAVE_KEY = 'legends.save'

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

// Presentation clock only. Nothing here is allowed to reach the game loop.
// ?pace=0.2 speeds playback up for testing; it scales these delays and NOTHING
// else, which is the same separation Phase 6's fast-forward will need: the hand
// must resolve identically however fast it is drawn.
const PACE_SCALE = Math.max(0, Number(new URLSearchParams(location.search).get('pace') ?? 1))
const BASE = { action: 620, street: 700, reveal: 1300, showdown: 2600, result: 1000, level: 900 }
const PACE = Object.fromEntries(
  Object.entries(BASE).map(([k, v]) => [k, v * PACE_SCALE]),
) as typeof BASE

/**
 * The running game, so the Save button can reach it. Also how the
 * presentation queue knows a restored hand is replaying: those events are
 * catching the display up to a position the player was already at, so they
 * are drawn instantly rather than acted out.
 */
let game: Game

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const els = {
  table: $('table'),
  opponents: $('opponents'),
  board: $('board'),
  pot: $('pot-value'),
  level: $('level'),
  youStack: $('you-stack'),
  youCards: $('you-cards'),
  youPosition: $('you-position'),
  prompt: $('prompt'),
  buttons: $('buttons'),
  raiseRow: $('raise-row'),
  slider: $('raise-slider') as unknown as HTMLInputElement,
  raiseValue: $('raise-value'),
  raiseConfirm: $('raise-confirm'),
  raiseCancel: $('raise-cancel'),
  save: $<HTMLButtonElement>('save'),
  saveNote: $('save-note'),
  log: $('log'),
}

// ---------------------------------------------------------------- presentation

type Step = { apply: () => void; delay: number }
const queue: Step[] = []
let draining = false
let waiters: (() => void)[] = []

function step(apply: () => void, delay: number) {
  // Still presentation only: replaying changes the CLOCK, never the events.
  queue.push({ apply, delay: game?.isReplaying() ? 0 : delay })
  void drain()
}

async function drain() {
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

// ---------------------------------------------------------------- rendering

const SUIT = { clubs: '♣', diamonds: '♦', hearts: '♥', spades: '♠' } as const
const isRed = (c: Card) => c.suit === 'hearts' || c.suit === 'diamonds'

function cardEl(c: Card | null, small = false): HTMLElement {
  const d = document.createElement('div')
  d.className = `card${small ? ' small' : ''}${c && isRed(c) ? ' red' : ''}${c ? '' : ' back'}`
  d.textContent = c ? `${c.rank}${SUIT[c.suit]}` : '??'
  if (c) {
    d.setAttribute('aria-label', `${c.rank} of ${c.suit}`)
    d.dataset.card = `${c.rank}${c.suit[0]}`
  }
  return d
}

type SeatUI = {
  root: HTMLElement
  stack: HTMLElement
  cards: HTMLElement
  last: HTMLElement
  tell: HTMLElement
}
const seatUI = new Map<number, SeatUI>()

function buildOpponents() {
  els.opponents.replaceChildren()
  for (let i = 0; i < SEATS.length; i++) {
    if (i === HUMAN_SEAT) continue
    const root = document.createElement('div')
    root.className = 'seat'
    root.innerHTML =
      `<div class="name"><span>${SEATS[i].name}</span><span class="stack">0</span></div>` +
      `<div class="cards"></div><div class="last"></div><div class="tell"></div>`
    els.opponents.append(root)
    seatUI.set(i, {
      root,
      stack: root.querySelector('.stack')!,
      cards: root.querySelector('.cards')!,
      last: root.querySelector('.last')!,
      tell: root.querySelector('.tell')!,
    })
  }
}

function setStacks(stacks: number[]) {
  for (const [i, ui] of seatUI) ui.stack.textContent = String(stacks[i] ?? 0)
  els.youStack.textContent = String(stacks[HUMAN_SEAT] ?? 0)
}

function log(text: string, cls = '') {
  const li = document.createElement('li')
  if (cls) li.className = cls
  li.textContent = text
  els.log.append(li)
  els.log.parentElement!.scrollTop = els.log.parentElement!.scrollHeight
}

const key = (c: Card) => `${c.rank}${c.suit[0]}`
const cardText = (c: Card) => `${c.rank}${SUIT[c.suit]}`
const handText = (cards: Card[]) => cards.map(cardText).join(' ')

function clearWinHighlights() {
  for (const el of document.querySelectorAll('.card.win')) el.classList.remove('win')
  for (const el of document.querySelectorAll('.seat.winner')) el.classList.remove('winner')
}

/** Gold-outline the exact five cards that took the pot, wherever they sit. */
function highlightCards(cards: Card[]) {
  for (const c of cards) {
    for (const el of document.querySelectorAll(`[data-card="${key(c)}"]`)) {
      el.classList.add('win')
    }
  }
}

const nameOf = (seat: number) => SEATS[seat].name

/** "You and Dracula" / "Dracula, Cleopatra and You" */
function joinNames(seats: number[]): string {
  const names = seats.map(nameOf)
  if (names.length <= 1) return names[0] ?? ''
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

const TELL_TEXT: Record<string, string> = {
  steeples_fingers: 'steeples his fingers',
  glances_at_exit: 'glances toward the exit',
  stares_blankly: 'stares blankly at the board',
  shifts_forward: 'shifts forward in his seat',
  adjusts_headdress: 'adjusts her headdress',
  goes_still: 'goes completely still',
}

/**
 * The human seat is called "You", so everything about it has to read in the
 * second person or the log says "You folds" and "You is out".
 */
function describe(d: Decision, you = false): string {
  const v = (third: string, second: string) => (you ? second : third)
  switch (d.action) {
    case 'fold': return v('folds', 'fold')
    case 'check': return v('checks', 'check')
    case 'call': return v('calls', 'call')
    case 'bet': return `${v('bets', 'bet')} ${d.betSize}`
    case 'raise': return `${v('raises', 'raise')} to ${d.betSize}`
  }
}

// ---------------------------------------------------------------- game state

const folded = new Set<number>()
const out = new Set<number>()
let handNo = 0

function clearForNewHand() {
  folded.clear()
  clearWinHighlights()
  for (const [i, ui] of seatUI) {
    ui.cards.replaceChildren(cardEl(null, true), cardEl(null, true))
    ui.last.textContent = ''
    ui.tell.textContent = ''
    ui.root.classList.remove('folded', 'acting')
    if (out.has(i)) ui.root.classList.add('out')
  }
  els.board.replaceChildren()
  els.youCards.replaceChildren()
  els.pot.textContent = '0'
}

function onEvent(e: HandEvent) {
  switch (e.type) {
    case 'street': {
      step(() => {
        setStacks(e.stacks)
        els.board.replaceChildren(...e.board.map((c) => cardEl(c)))
        if (e.street !== 'preflop') log(`— ${e.street} —`, 'head')
        for (const ui of seatUI.values()) ui.tell.textContent = ''
      }, e.street === 'preflop' ? 0 : PACE.street)
      break
    }
    case 'tell': {
      const ui = seatUI.get(e.seat)
      if (!ui) break
      step(() => { ui.tell.textContent = `${SEATS[e.seat].name} ${TELL_TEXT[e.signal] ?? e.signal}` }, 340)
      break
    }
    case 'action': {
      const you = e.seat === HUMAN_SEAT
      const ui = seatUI.get(e.seat)
      // The seat card is always an opponent, so it stays third person; only
      // the log has to agree with "You".
      const text = describe(e.decision)
      const logText = describe(e.decision, you)
      step(() => {
        for (const u of seatUI.values()) u.root.classList.remove('acting')
        if (ui) {
          ui.root.classList.add('acting')
          ui.last.textContent = text
        }
        if (e.decision.action === 'fold') {
          folded.add(e.seat)
          ui?.root.classList.add('folded')
          // Mucked cards are gone, not face-down: leaving backs up reads as
          // "still in the hand".
          ui?.cards.replaceChildren()
          if (e.seat === HUMAN_SEAT) els.youCards.replaceChildren()
        }
        setStacks(e.stacks)
        els.pot.textContent = String(e.pot)
        log(`${SEATS[e.seat].name} ${logText}`, you ? 'you' : '')
      }, e.seat === HUMAN_SEAT ? 220 : PACE.action)
      break
    }
    case 'showdown': {
      // Beat one: turn the cards over and let them sit there.
      step(() => {
        for (const u of seatUI.values()) u.root.classList.remove('acting')
        // Show the full run-out. On an all-in the board finished without any
        // further action, so this is the first chance to draw the last cards.
        els.board.replaceChildren(...e.board.map((c) => cardEl(c)))
        for (const { seat, hole } of e.revealed) {
          const ui = seatUI.get(seat)
          if (ui) ui.cards.replaceChildren(...hole.map((c) => cardEl(c, true)))
        }
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
          clearWinHighlights()
          if (pot.cards) highlightCards(pot.cards)
          for (const w of pot.winners) seatUI.get(w)?.root.classList.add('winner')

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
        log(`  ${SEATS[e.seat].name} ${sign}${e.delta}`, e.seat === HUMAN_SEAT ? 'you' : '')
      }, 0)
      break
    }
    case 'level': {
      step(() => {
        els.level.textContent = `blinds ${e.smallBlind}/${e.bigBlind}`
        log(`Blinds up: ${e.smallBlind}/${e.bigBlind}`, 'head')
      }, PACE.level)
      break
    }
    case 'eliminated': {
      step(() => {
        out.add(e.seat)
        seatUI.get(e.seat)?.root.classList.add('out')
        const ord = `${e.place}${['st', 'nd', 'rd', 'th'][e.place - 1] ?? 'th'}`
        log(`${SEATS[e.seat].name} ${e.seat === HUMAN_SEAT ? 'are' : 'is'} out (${ord})`, 'big')
      }, PACE.result)
      break
    }
  }
}

// ---------------------------------------------------------------- your turn

let resolveTurn: ((d: Decision) => void) | null = null

function button(label: string, cls: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button')
  b.textContent = label
  if (cls) b.className = cls
  b.addEventListener('click', onClick)
  return b
}

function endTurn(d: Decision) {
  els.buttons.replaceChildren()
  els.raiseRow.hidden = true
  els.prompt.textContent = ''
  const r = resolveTurn
  resolveTurn = null
  r?.(d)
}

async function onHumanTurn(view: TurnView): Promise<Decision> {
  // Do not ask for a decision until the player has actually SEEN what led to
  // it. This is the only place the two clocks meet, and it is a one-way wait:
  // presentation never feeds back into how the hand resolves.
  await settled()

  for (const u of seatUI.values()) u.root.classList.remove('acting')
  setStacks(view.stacks)
  els.youCards.replaceChildren(...view.hole.map((c) => cardEl(c)))
  els.pot.textContent = String(view.pot)
  els.prompt.textContent =
    view.toCall > 0 ? `${view.toCall} to call` : 'Check or bet'

  const b = els.buttons
  b.replaceChildren()

  if (view.legal.includes('fold')) {
    b.append(button('Fold', 'danger', () => endTurn({ action: 'fold', reason: 'human' })))
  }
  if (view.legal.includes('check')) {
    b.append(button('Check', '', () => endTurn({ action: 'check', reason: 'human' })))
  }
  if (view.legal.includes('call')) {
    const amount = Math.min(view.toCall, view.stack)
    const label = amount >= view.stack ? `Call all in (${amount})` : `Call ${amount}`
    b.append(button(label, 'primary', () => endTurn({ action: 'call', reason: 'human' })))
  }

  const raise: Action | null = view.legal.includes('raise')
    ? 'raise'
    : view.legal.includes('bet')
      ? 'bet'
      : null

  if (raise && view.maxRaise >= view.minRaise) {
    b.append(
      button(raise === 'bet' ? 'Bet…' : 'Raise…', '', () => {
        els.raiseRow.hidden = false
        const s = els.slider
        s.min = String(view.minRaise)
        s.max = String(view.maxRaise)
        s.step = '1'
        s.value = String(Math.min(view.maxRaise, Math.max(view.minRaise, Math.round(view.pot * 0.6))))
        const sync = () => {
          const v = Number(s.value)
          els.raiseValue.textContent = v >= view.maxRaise ? `${v} (all in)` : String(v)
        }
        s.oninput = sync
        sync()
        s.focus()
      }),
    )
  }

  els.raiseConfirm.onclick = () => {
    if (!raise) return
    endTurn({ action: raise, betSize: Number(els.slider.value), reason: 'human' })
  }
  els.raiseCancel.onclick = () => { els.raiseRow.hidden = true }

  return new Promise<Decision>((resolve) => { resolveTurn = resolve })
}

// ---------------------------------------------------------------- driver

async function main() {
  buildOpponents()
  els.table.hidden = false

  const saved = readSave()
  if (saved) {
    game = Game.load(saved, SEATS, { onHumanTurn, onEvent })
    // Eliminations happened in hands this session never saw, so the busted
    // seats are read back from the chips rather than from past events.
    game.stacks().forEach((chips, i) => { if (chips === 0) out.add(i) })
    handNo = game.handCount()
    log(`Resumed at hand ${handNo + 1}.`, 'head')
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

  els.save.onclick = () => {
    localStorage.setItem(SAVE_KEY, toJson(game.save()))
    els.saveNote.textContent = 'Saved.'
    setTimeout(() => { els.saveNote.textContent = '' }, 2500)
  }

  els.level.textContent = `blinds ${game.bigBlind() / 2}/${game.bigBlind()}`
  setStacks(game.stacks())

  while (!game.isComplete()) {
    handNo++
    clearForNewHand()
    log(`Hand ${handNo}`, 'head')
    els.youPosition.textContent = `hand ${handNo}`
    await game.playHand()
    await settled()
    setStacks(game.stacks())
    if (out.has(HUMAN_SEAT)) break
    await sleep(500 * PACE_SCALE)
  }

  await settled()
  // A finished table must not resume: the save would restore a game with
  // nothing left to play.
  localStorage.removeItem(SAVE_KEY)
  els.save.disabled = true
  els.buttons.replaceChildren()
  els.raiseRow.hidden = true
  const won = game.survivors()[0] === HUMAN_SEAT
  els.prompt.textContent = won
    ? 'You hold every chip. Table cleared.'
    : 'You are out.'
  log(won ? 'You win the table.' : 'You are out.', 'big')
}

void main()
