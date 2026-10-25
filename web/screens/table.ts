import { Game, type HandEvent, type TurnView } from '../../src/game.js'
import { HUMAN } from '../../src/personality.js'
import type { Action, Decision } from '../../src/decide.js'
import type { Card } from '../../src/equity.js'
import { mulberry32 } from '../../src/rng.js'
import { CHARACTERS, DIALOGUE, DEALER, TABLE_BY_ID, UNINVITED, personality, arrivalRules, banishmentFor, tellLine, type Line } from '../../src/content.js'
import { TableRun, type Beat } from '../../src/director.js'
import { applyOutcome, fillLine, type TableOutcome } from '../../src/tour.js'
import { tableRecord, ENGINE_VERSION } from '../../src/save.js'
import { marksForCareer } from '../../src/marks.js'
import * as store from '../store.js'
import { h, go, sleep, formatChips, ordinal } from '../dom.js'
import * as sound from '../sound.js'
import { fly as launch, flipOver as turnOver, centre, chipDisc, flightColours, drawPile, drawTower, chipCount, type Pt } from '../fx.js'
import { setResult, curtainCall, type Sitting } from './results.js'
import { ROOMS, PUPPETS, RETURNED, LOOKS } from '../puppet/cast.js'
import { Stage, PRIO, DEALER as DEATH, type Prio, type SeatSpot } from '../puppet/stage.js'
import { markTitle, avatarPuppet } from './shared.js'
import { toggleSetting, choiceSetting, PACES, DIALOGUE_LEVELS, DIALOGUE_HINT, LOG_HINT, canLog } from './settings.js'

/**
 * THE TABLE.
 *
 * The piece of Phase 3b worth keeping is kept: the PRESENTATION QUEUE. The
 * engine resolves as fast as it can and pushes events; this screen plays them
 * back on its own clock; the only place the two meet is a one-way wait before
 * the player is asked to act. Everything added since -- dialogue, respect,
 * fast-forward, ambient fidgeting -- lives on the presentation side of that
 * line, which is why none of it can change a card (non-negotiable #6).
 */

const HUMAN_SEAT = 0
const PACE_BY_SETTING = { unhurried: 1.35, normal: 1, brisk: 0.6 }
const BASE = { action: 620, street: 700, reveal: 1300, showdown: 2600, result: 1000, level: 900, tell: 340 }
/**
 * How long things take to MOVE, on the same presentation clock. Every one is
 * scaled by pace and fast-forward exactly as the queue's delays are, so a
 * flight never outlasts the step that launched it.
 */
const MOVE = {
  shuffle: 420, dealFlight: 260, dealGap: 70, flip: 240, chips: 300, sweep: 360,
  boardFlight: 300, boardGap: 70, flopGap: 190, muck: 320, collect: 560, runout: 800, uncontested: 1300,
}
/** Fast-forward scales the presentation clock by this. Never the game loop. */
const FF_SCALE = 0.12
const THINKING_LONG_MS = 25000

const SUIT = { clubs: '♣', diamonds: '♦', hearts: '♥', spades: '♠' } as const
const cardKey = (c: Card) => `${c.rank}${c.suit[0]}`
const cardText = (c: Card) => `${c.rank === 'T' ? '10' : c.rank}${SUIT[c.suit]}`
const handText = (cards: Card[]) => cards.map(cardText).join(' ')

export function cardEl(c: Card | null, size: '' | 'small' | 'tiny' = ''): HTMLElement {
  const d = h('div', {
    // a four-colour deck (spades black, hearts red, diamonds blue, clubs green): no suit is mistaken for its twin
    class: `card${size ? ' ' + size : ''}${c ? ' ' + c.suit : ' back'}`,
  })
  if (c) {
    d.append(h('span', { class: 'rank' }, c.rank === 'T' ? '10' : c.rank), h('span', { class: 'suit' }, SUIT[c.suit]))
    d.setAttribute('aria-label', `${c.rank === 'T' ? '10' : c.rank} of ${c.suit}`)
    d.dataset.card = cardKey(c)
  }
  return d
}

/**
 * SB or BB beside a name, for the seats that posted the blinds. There is no
 * dealer button: Death deals every hand, so no seat is the dealer.
 */
function blindChip(): HTMLElement {
  return h('span', { class: 'blind-chip', hidden: true })
}

/** A bet in front of a seat: a small pile and what it adds up to. Always takes its space. */
function betSpot(): HTMLElement {
  return h('div', { class: 'bet empty' }, h('span', { class: 'pile' }), h('span', { class: 'amt' }))
}

/** A name on a plate begins with a capital ("the Cat" is written for the middle of a sentence). */
const capital = (s: string) => s[0].toUpperCase() + s.slice(1)

const nudge = (p: Pt, by: number): Pt => ({ x: p.x + (Math.random() * 2 - 1) * by, y: p.y + (Math.random() * 2 - 1) * by })

function readingTime(text: string): number {
  return Math.max(1500, Math.min(5200, 900 + text.length * 48))
}

/** A callout's time on screen, before pace: long enough to read, short enough to keep up. */
function calloutTime(text: string): number {
  return Math.max(1400, Math.min(3000, 700 + text.length * 40))
}

/** How long a spoken line, a narration and Death's line stay up: their animations' lengths in style.css. */
const BUBBLE_MS = { say: 5200, narration: 6000, dealer: 5200 }

type SeatUI = {
  id: string
  root: HTMLElement
  name: HTMLElement
  stack: HTMLElement
  /** Their chips as a stack on the felt (fx.ts drawTower). */
  tower: HTMLElement
  /** The stack and its count together: what bets fly out of and pots into. */
  purse: HTMLElement
  cards: HTMLElement
  /** Chips pushed out this street, sitting in front of the seat. */
  bet: HTMLElement
  /** SB or BB when this seat posted a blind this hand. */
  blind: HTMLElement
  last: HTMLElement
  tell: HTMLElement
  say: HTMLElement
  tellUntil: number
}

export function tableScreen(root: HTMLElement): () => void {
  const save = store.get()
  const active = save.active
  if (!active || !TABLE_BY_ID[active.table] || !save.player) {
    go('/tour')
    return () => {}
  }
  const table = TABLE_BY_ID[active.table]
  // A seat saved by a different build cannot be replayed faithfully: the
  // same decisions would meet different cards. Say so, and clear the chair
  // without holding it against the player.
  if ((active.engine ?? 0) !== ENGINE_VERSION && active.decisions.length > 0) {
    releaseSeat(root, table.name)
    return () => {}
  }
  const dialogue = DIALOGUE[table.id] ?? { table: table.id }
  const playerName = save.player.name
  const settings = save.settings
  const urlPace = new URLSearchParams(location.search).get('pace')
  // the menu can change the pace mid-sitting (unless ?pace pins it)
  let paceScale = urlPace !== null ? Math.max(0, Number(urlPace)) : PACE_BY_SETTING[settings.pace]

  let alive = true
  const timers = new Set<ReturnType<typeof setTimeout>>()
  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(() => { timers.delete(t); if (alive) fn() }, ms)
    timers.add(t)
    return t
  }

  // Everything still moving on the felt. A step's delay can be shorter than
  // the flights it launched (chips stagger in one after another), so the
  // player's turn waits for these too: never "20 to call" over an empty felt.
  const moving = new Set<Promise<void>>()
  const track = (p: Promise<void>) => {
    moving.add(p)
    void p.finally(() => moving.delete(p))
    return p
  }
  const fly = (...a: Parameters<typeof launch>) => track(launch(...a))
  const flipOver = (...a: Parameters<typeof turnOver>) => track(turnOver(...a))
  /** Resolves once everything in flight has landed -- or after 1.5s, whatever happens. */
  const landed = () => Promise.race([Promise.all([...moving]), sleep(1500)])

  // ------------------------------------------------------------ the room
  //
  // A table whose room is drawn, with a puppet for everyone dealt in, is
  // STAGED: the room and the figures on a canvas under the felt, the game's
  // plates, cards and chips laid over them where the figures sit. Anywhere
  // else (a room not drawn yet, someone without a puppet) keeps the plain
  // table. Everything here is presentation; the figures only ever act out what
  // the screen already says.

  // ?room=<id> stages this table in another drawn room: a preview of a room
  // before its own cast has puppets (like ?pace, a knob for looking, not a setting)
  const room = ROOMS[new URLSearchParams(location.search).get('room') ?? table.id]
  // Heads up, the finale's way (the owner): the player is seen in the left
  // chair, as the figure they chose (Your Account), the one opponent in the
  // right, Death dealing between them. The finale and the Pyre; an open table
  // with one opponent picked (more than one plays as normal, unseen).
  const headsUp = active.seats.length === 1
  const chairsAll = room ? Object.values(room.data.seats).reduce((a, b) => (b.length > a.length ? b : a), []) : []
  // a room with its own heads-up chair keeps it; elsewhere the third of its four chairs, across from the player
  const chairs = headsUp ? (room?.data.seats['1'] ? undefined : [2]) : active.chairs
  const youAt: [number, number, number] | null = room?.data.you ?? (headsUp ? chairsAll[1] ?? null : null)
  // an open table: in the chairs the player put them in
  const staged = !!room && Stage.fits(room, active.seats.length, chairs) && active.seats.every((id) => !!PUPPETS[id])
  /** The player is drawn in their own chair: their figure acts out what they do, as the others' do (never a tell). */
  const youSeen = staged && !!youAt
  const avatar = avatarPuppet(save)

  // ------------------------------------------------------------ DOM

  const els = {
    hand: h('span', { class: 'hand-no' }),
    blinds: h('span', { class: 'blinds' }),
    ff: h('button', { class: 'ff', type: 'button', hidden: true, title: 'Fast-forward (presentation only)' }, 'Fast-forward ▸▸'),
    opponents: h('section', { class: 'opponents', 'aria-label': 'Opponents' }),
    dealerLine: h('span', { class: 'dealer-line' }),
    narration: h('div', { class: 'narration', 'aria-live': 'polite' }),
    presence: h('div', { class: 'presence' }),
    board: h('div', { class: 'board', 'aria-label': 'Community cards' }),
    /** The winning hand, named on the felt at a showdown (it was only in the log). */
    handName: h('div', { class: 'hand-name', 'aria-hidden': 'true' }),
    pot: h('span', { class: 'pot-value' }, '0'),
    potPile: h('span', { class: 'pile', 'aria-hidden': 'true' }),
    dealerName: h('span', { class: 'dealer-name' }, room?.data.dealerName ?? 'Death'),
    fx: h('div', { class: 'fx', 'aria-hidden': 'true' }),
    youBet: betSpot(),
    youName: h('span', { class: 'you-name' }),
    youStack: h('span', { class: 'stack' }),
    youTower: h('span', { class: 'pile tower', 'aria-hidden': 'true' }),
    youPurse: h('div', { class: 'purse' }),
    youCards: h('div', { class: 'you-cards', 'aria-label': 'Your cards' }),
    youBlind: blindChip(),
    prompt: h('div', { class: 'prompt' }, 'Death shuffles.'),
    buttons: h('div', { class: 'buttons' }),
    raiseRow: h('div', { class: 'raise-row', hidden: true }),
    slider: h('input', { type: 'range', class: 'raise-slider', 'aria-label': 'Bet size' }) as HTMLInputElement,
    /** The slider, the ticks at the quick sizes under it and the amount riding over its chip. */
    sliderWrap: h('div', { class: 'raise-slider-wrap' }),
    sliderTicks: h('div', { class: 'raise-ticks', 'aria-hidden': 'true' }),
    sliderTag: h('span', { class: 'raise-tag', 'aria-hidden': 'true' }),
    quick: h('div', { class: 'quick-sizes' }),
    raiseConfirm: h('button', { type: 'button', class: 'act-bet' }, 'Confirm'),
    raiseCancel: h('button', { type: 'button', class: 'ghost', title: 'Cancel', 'aria-label': 'Cancel' }, '✕'),
    toasts: h('div', { class: 'toasts', 'aria-live': 'polite' }),
    /** The play-by-play, for screen readers only: the screen itself shows no log (the owner). */
    log: h('ol', { class: 'log sr-only', 'aria-live': 'polite', 'aria-label': 'Hand log' }),
    dealer: h('div', { class: 'dealer' }),
    stageCanvas: h('canvas', { class: 'stage', 'aria-hidden': 'true' }) as HTMLCanvasElement,
    /** Where Death's deck lies: cards fly out of it, and back into it. */
    deck: h('span', { class: 'deck-spot', 'aria-hidden': 'true' }),
  }
  els.dealer.append(els.dealerName, h('span', { class: 'dealer-role' }, 'deals'), els.dealerLine)
  els.sliderWrap.append(els.sliderTicks, els.slider, els.sliderTag)
  els.raiseRow.append(els.quick, els.sliderWrap, els.raiseConfirm, els.raiseCancel)
  els.youPurse.append(els.youTower, els.youStack)

  const menuButton = h('button', { type: 'button', class: 'ghost small leave', 'aria-haspopup': 'dialog', onclick: () => openMenu() },
    h('span', { class: 'burger', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')), 'Menu')
  // staged: on a phone the bar floats over the room instead of taking a row (style.css)
  const screenEl = h('div', { class: `table-screen${staged ? ' staged' : ''}` })
  /** Measures the notch's share of each side (safe-area insets) in pixels. */
  const safeProbe = h('div', { class: 'safe-probe', 'aria-hidden': 'true' })
  root.append(screenEl)
  screenEl.append(
      h('header', { class: 'table-bar' },
        menuButton,
        h('div', { class: 'where' },
          h('b', null, table.name),
          active.mode === 'open' ? h('span', { class: 'tag' }, 'open table') : null,
          h('span', { class: 'meta' }, els.hand, ' · ', els.blinds)),
        els.ff),
      h('main', { class: `felt${staged ? ' staged' : ''}`, dataset: { table: table.id } },
        staged ? els.stageCanvas : null,
        els.opponents,
        els.dealer,
        staged ? els.deck : null,
        h('section', { class: 'middle' },
          els.presence, els.board, els.handName,
          h('div', { class: 'pot' }, els.potPile, h('span', { class: 'label' }, 'POT'), ' ', els.pot)),
        h('section', { class: 'you' },
          h('div', { class: 'you-info' }, h('div', { class: 'you-tag banner' }, els.youBlind, els.youName), els.youPurse),
          els.youCards, els.youBet),
        h('section', { class: 'controls', 'aria-label': 'Your actions' }, els.prompt, els.buttons, els.raiseRow),
        els.narration,
        els.toasts,
        els.fx,
        els.log),
      safeProbe,
  )

  // ------------------------------------------------------------ presentation queue

  type Step = { apply: () => void; delay: number; line?: boolean; cancelFF?: boolean }
  const queue: Step[] = []
  let draining = false
  let waiters: (() => void)[] = []
  let ff = false
  /** While the menu is open: the presentation waits on it (the engine is already ahead or waiting on you). */
  let paused: Promise<void> | null = null
  let unpause = () => {}

  function setFF(on: boolean) {
    ff = on
    els.ff.classList.toggle('on', on)
    els.ff.setAttribute('aria-pressed', String(on))
  }
  els.ff.addEventListener('click', () => setFF(!ff))

  function step(apply: () => void, delay: number, opts: { line?: boolean; cancelFF?: boolean } = {}) {
    queue.push({ apply, delay, ...opts })
    void drain()
  }

  // Nothing plays until the room is drawn (or 5 s have passed, whatever
  // happens): the first hand was dealt over a black screen while the figures loaded.
  let roomDrawn = () => {}
  const roomUp = staged ? new Promise<void>((r) => { roomDrawn = r; setTimeout(r, 5000) }) : Promise.resolve()

  async function drain() {
    if (draining) return
    draining = true
    await roomUp
    while (queue.length && alive) {
      // the menu is open: the table waits for the player
      if (paused) await paused
      if (!queue.length || !alive) break
      const s = queue.shift()!
      // Fast-forward cancels itself at the showdown reveal and at a new deal:
      // the reveal is where reads come from, and a new hand is live again.
      if (s.cancelFF && ff) setFF(false)
      s.apply()
      // Voice is CUT while fast-forwarding, not sped up: a line appears in the
      // log and is gone. Everything else runs on a faster clock.
      const d = s.line ? (ff ? 0 : s.delay * paceScale) : s.delay * paceScale * (ff ? FF_SCALE : 1)
      if (d > 0) await sleep(d)
    }
    draining = false
    const w = waiters
    waiters = []
    for (const f of w) f()
  }

  function settled(): Promise<void> {
    if (!draining && queue.length === 0) return Promise.resolve()
    return new Promise((r) => waiters.push(r))
  }

  // ------------------------------------------------------------ seats

  const seatUI = new Map<number, SeatUI>()
  const out = new Set<number>()
  const folded = new Set<number>()
  const seatIds: (string | null)[] = ['human', ...active.seats]
  let humanInHand = false
  /** All in: nothing left to decide this hand, so fast-forward is fair. */
  let humanAllIn = false

  const nameOf = (seat: number) =>
    seat === HUMAN_SEAT ? 'You' : CHARACTERS[seatIds[seat] ?? '']?.short ?? '—'

  // ------------------------------------------------------------ the figures

  let stage = staged ? new Stage(els.stageCanvas, room!, active.seats.length, chairs) : null
  let stageReady = false

  /** The figures' clips follow the presentation clock's pace (2x at the quickest, half at the slowest). */
  function applyPace() {
    if (stage) stage.speed = paceScale > 0 ? Math.min(2, Math.max(0.5, 1 / paceScale)) : 2
  }

  /**
   * The cards, chips and plates were sized for a phone, where they are big
   * enough; on a monitor they were specks (the owner: "hard to see"). So the
   * game's pieces grow with the screen's height: --s, for the cards and the
   * chips, is 1 up to a phone's 385 px, about 2.8 at 1080 and 4 (the owner's
   * figure) from 1540 up; --s2, for the plates and their type, grows half as
   * fast, so they never swamp the figures. A straight 4x at 1080 laid the
   * board over your own cards and the plates over one another.
   */
  let plateScale = 1
  function scaleGame() {
    const s = Math.max(1, Math.min(4, window.innerHeight / 385))
    plateScale = 1 + (s - 1) / 2
    screenEl.style.setProperty('--s', s.toFixed(3))
    screenEl.style.setProperty('--s2', plateScale.toFixed(3))
  }

  /**
   * Lay the plates, Death's plate, his deck and the middle of the table over
   * the room as it is drawn at this size. Each plate sits on the felt just in
   * front of its figure; --lift is the height from the plate up to the top of
   * the head, where that seat's speech goes.
   */
  function layoutStage() {
    scaleGame()
    if (!stage) return
    const g = stage.geometry()
    // plates as wide as the chairs are apart allows, and never off the screen
    const xs = [...g.seats.entries()].filter(([i]) => i !== DEATH && i !== HUMAN_SEAT).map(([, s]) => s.x).sort((a, b) => a - b)
    const gap = Math.min(...xs.slice(1).map((x, i) => x - xs[i]))
    let plate = Math.max(104, Math.min(158 * plateScale, gap - 10))
    const width = els.stageCanvas.clientWidth
    // the room runs under the notch; the plates stay out of it
    const probe = getComputedStyle(safeProbe)
    const safeL = parseFloat(probe.paddingLeft) || 0
    const safeR = parseFloat(probe.paddingRight) || 0
    els.opponents.style.setProperty('--plate', `${plate}px`)
    // ... and never narrower than what lies under the banner (cards, chips, count): the spread keeps them apart
    for (const ui of seatUI.values()) {
      plate = Math.max(plate, (ui.cards.parentElement as HTMLElement).offsetWidth, (ui.name.parentElement as HTMLElement).offsetWidth)
    }
    els.opponents.style.setProperty('--plate', `${plate}px`)
    const place = (el: HTMLElement, at: SeatSpot, below: number) => {
      const top = at.line + below * g.k
      el.style.left = `${at.x}px`
      el.style.top = `${top}px`
      el.style.setProperty('--lift', `${Math.max(0, top - at.head)}px`)
      el.dataset.side = at.side
    }
    // Kept on screen, then spread so no two plates overlap: on a phone the
    // end chairs' plates are pushed in from the notch toward their neighbours.
    const lo = safeL + plate / 2 + 4
    const hi = width - safeR - plate / 2 - 4
    const row = [...seatUI.keys()].filter((i) => g.seats.has(i)).sort((a, b) => g.seats.get(a)!.x - g.seats.get(b)!.x)
    const spread = row.map((i) => Math.max(lo, Math.min(hi, g.seats.get(i)!.x)))
    for (let k = 1; k < spread.length; k++) spread[k] = Math.max(spread[k], spread[k - 1] + plate + 6)
    if (spread.length) spread[spread.length - 1] = Math.min(spread[spread.length - 1], hi)
    for (let k = spread.length - 2; k >= 0; k--) spread[k] = Math.min(spread[k], spread[k + 1] - plate - 6)
    row.forEach((i, k) => place(seatUI.get(i)!.root, { ...g.seats.get(i)!, x: spread[k] }, 18))
    const d = g.seats.get(DEATH)!
    place(els.dealer, d, 64)
    const mid = els.dealer.parentElement?.querySelector<HTMLElement>('.middle')
    // the board under the dealer's plate, however tall the plate has grown
    const below = els.dealer.offsetTop + els.dealer.offsetHeight + 6 * plateScale
    // ... and under any plate it would reach: on a phone the inner plates
    // come close to the middle (the board is five cards wide)
    const s = parseFloat(screenEl.style.getPropertyValue('--s')) || 1
    const reach = 2.5 * (boardCard() + 6 * s) + plate / 2
    let plates = 0
    for (const ui of seatUI.values()) {
      if (Math.abs(ui.root.offsetLeft - d.x) >= reach) continue
      plates = Math.max(plates, ui.root.offsetTop + ui.root.offsetHeight + 4)
    }
    if (mid) {
      mid.style.left = `${d.x}px`
      mid.style.top = `${Math.max(d.line + 128 * g.k, below, plates)}px`
      // ... and clear of your own cards: on a short screen they come up beside
      // it, so it moves right (as far as the screen allows) rather than under
      // them. Measured with five cards on the board, however many lie there now.
      const probes = Array.from({ length: Math.max(0, 5 - els.board.children.length) }, () => {
        const c = cardEl(null)
        c.style.visibility = 'hidden'
        return c
      })
      els.board.append(...probes)
      const you = (els.youCards.parentElement as HTMLElement).getBoundingClientRect()
      const at = els.board.getBoundingClientRect()
      const pot = (els.pot.parentElement as HTMLElement).getBoundingClientRect()
      const right = mid.getBoundingClientRect().right - els.fx.getBoundingClientRect().left
      for (const p of probes) p.remove()
      let dx = 0
      if (at.bottom > you.top - 4) dx = Math.max(dx, you.right + 10 - at.left)
      if (pot.bottom > you.top - 4 && pot.top < you.bottom) dx = Math.max(dx, you.right + 10 - pot.left)
      if (dx > 0) mid.style.left = `${d.x + Math.min(dx, Math.max(0, width - safeR - 8 - right))}px`
    }
    // Cards leave his deck from just under his plate, never across it (on a
    // short screen the plate is not drawn, and they leave his hands).
    els.deck.style.left = `${g.deck.x}px`
    els.deck.style.top = `${Math.max(g.deck.y, els.dealer.offsetHeight > 12 ? below + 14 * s : 0)}px`
    if (mid) clearUnder(mid)
  }

  /** How wide a card on the board is drawn at this size. */
  function boardCard(): number {
    const probe = cardEl(null)
    els.board.append(probe)
    const card = probe.offsetWidth
    probe.remove()
    return card
  }

  /**
   * Under each plate, the seat's bet, moved out toward its own side wherever
   * it would lie on the board. (No words under the plates: a tell is the
   * figure's pose, held, where the figures are drawn.)
   */
  function clearUnder(mid: HTMLElement) {
    const s = Number(screenEl.style.getPropertyValue('--s')) || 1
    const plates = [...seatUI.values()].map((ui) => {
      const w = ui.root.offsetWidth
      const left = parseFloat(ui.root.style.left) - w / 2
      return { ui, left, right: left + w, top: ui.root.offsetTop, bottom: ui.root.offsetTop + ui.root.offsetHeight }
    })
    // the board as wide as five cards, and the pot under it
    const card = boardCard()
    const boardHalf = (5 * card + 4 * 6 * s) / 2 + 10
    const mx = parseFloat(mid.style.left)
    const boardTop = mid.offsetTop, boardBottom = mid.offsetTop + Math.max(mid.offsetHeight, card * 1.4 + 30 * s)
    const box = els.fx.getBoundingClientRect(), mine = els.youCards.getBoundingClientRect()
    const cards = { left: mine.left - box.left, top: mine.top - box.top }
    for (const p of plates) {
      // the bet: just below the plate (from its foot: a plate shrinks when its cards are mucked), and off the board
      const top = p.bottom + 4
      p.ui.bet.style.top = `calc(100% + ${top - p.bottom}px)`
      // where the pile lies unmoved, as wide as two columns and a 5-figure amount
      const bet = p.ui.bet
      bet.style.setProperty('--bet-in', '0px')
      const pile = 2 * 18 * s + 2 * s + 4 + 6 * 0.62 * 0.78 * 14 * s
      const at = p.left + bet.offsetLeft
      const [a, b] = p.ui.root.dataset.side === 'r' ? [at + bet.offsetWidth - pile, at + bet.offsetWidth] : [at, at + pile]
      let shift = 0
      if (top < boardBottom && top + 24 * s > boardTop) {
        // never further out than its own plate, where the next seat's bet lies
        shift = p.ui.root.dataset.side === 'r'
          ? Math.max(b - (p.right - 4), Math.min(0, a - (mx + boardHalf)))
          : Math.max(p.left + 4 - a, Math.min(0, mx - boardHalf - b))
      }
      // ... and off your own cards (an end seat on a short screen): out toward its side, as far as its plate
      if (p.ui.root.dataset.side !== 'r' && top + 24 * s > cards.top && b + shift > cards.left - 4) {
        shift = Math.max(p.left + 4 - a, Math.min(shift, cards.left - 4 - b))
      }
      bet.style.setProperty('--bet-in', `${shift}px`)
    }
  }

  /** Everyone in the chair the engine says they are in; the chairs of those who are out empty. */
  /** Who sits in a chair as the stage draws them: the changed figure of someone who came back. */
  const changed = new Map<number, string>()
  function figureAt(seat: number): string {
    if (seat === HUMAN_SEAT) return youSeen ? avatar : ''
    const id = changed.get(seat) ?? seatIds[seat] ?? ''
    // a look the player has earned for them (Holmes's deerstalker), worn from the next sitting on;
    // at an open table the player picked the look (the second looks sit as players of their own)
    const look = LOOKS[id]
    if (look && active!.mode === 'tour' && save.marks[look.mark] && PUPPETS[look.puppet]) return look.puppet
    return room?.data.cast?.[id] ?? id
  }

  function syncStage() {
    if (!stage || !stageReady) return
    for (let i = 1; i < seatIds.length; i++) {
      const id = out.has(i) ? null : figureAt(i)
      if (stage.idAt(i) !== id && !(id && !PUPPETS[id] && stage.idAt(i) === null)) void stage.seat(i, id)
    }
  }

  /** The art did not load: the plain table, as at a room not drawn yet. */
  function unstage() {
    roomDrawn()
    stage?.destroy()
    stage = null
    stageReady = false
    els.stageCanvas.remove()
    els.deck.remove()
    els.opponents.parentElement?.classList.remove('staged')
    screenEl.classList.remove('staged')
    for (const el of [els.dealer, ...[...seatUI.values()].flatMap((u) => [u.root, u.tell, u.bet])]) el.removeAttribute('style')
    els.opponents.parentElement?.querySelector<HTMLElement>('.middle')?.removeAttribute('style')
  }

  /**
   * A clip on someone's figure. Live only, and never under fast-forward: half
   * a gesture reads as a glitch, the way half a spoken line does. Clips run
   * on the presentation clock's pace; faces and idles keep their own.
   */
  function cue(seat: number, clip: string, prio: Prio = PRIO.act) {
    if (!stage || !stageReady || replaying || ff) return
    stage.cue(seat, clip, prio)
  }

  /**
   * A seat's bubble is centred over its figure, and an end seat's ran off the
   * edge of a phone, or under the Menu (seat 1 at the White House). Move it
   * sideways into view; its pointer stays over the speaker (--shift, style.css).
   */
  function keepInView(el: HTMLElement) {
    el.style.removeProperty('--shift')
    const r = el.getBoundingClientRect()
    const box = screenEl.getBoundingClientRect()
    const pad = 8
    let dx = 0
    if (r.left < box.left + pad) dx = box.left + pad - r.left
    else if (r.right > box.right - pad) dx = box.right - pad - r.right
    const m = menuButton.getBoundingClientRect()
    if (m.width && r.top < m.bottom + pad && r.left + dx < m.right + pad && r.right + dx > m.left) dx = m.right + pad - r.left
    if (dx) el.style.setProperty('--shift', `${Math.round(dx)}px`)
  }

  /**
   * Lips for a spoken line (stage directions are not spoken). Cut under
   * fast-forward, like the voice will be. The mouth stops when the line's
   * bubble comes down (`ms`): it used to talk on for a second or more.
   */
  function speak(seat: number, text: string, ms: number) {
    if (!stage || !stageReady || replaying || ff) return
    stage.face(seat)?.say(text, ms / 1000)
  }

  /**
   * A gesture to read: a tell, an idle or a fidget. Unlike an action's clip it
   * plays under fast-forward too, at its own pace, as the figures breathe on:
   * folded hands are when the table is watched (rule 6), and on the staged
   * table the gesture is all there is to see. Never in a resume's catch-up.
   */
  function gesture(seat: number, clip: string, prio: Prio) {
    if (!stage || !stageReady || replaying) return
    stage.cue(seat, clip, prio, true)
  }

  /** How long a gesture takes on screen (ms), at the stage's pace; 0 where nobody is drawn. */
  function gestureMs(seat: number, clip: string | undefined): number {
    const p = clip && stage ? stage.player(seat) : null
    return p ? (1000 * p.duration(clip!)) / (stage!.speed || 1) : 0
  }

  /** The clip a character's tell or idle is acted with, by its words (anim.json "cues"). */
  const cueFor = (seat: number, text: string): string | undefined =>
    PUPPETS[figureAt(seat)]?.anim.cues?.[text]

  function buildSeat(i: number) {
    const id = seatIds[i]!
    const c = CHARACTERS[id]
    // an open table's champion defends nothing (Death: "They are only players again")
    const isChamp = active!.mode === 'tour' && (table.champion === id || table.kind === 'champions')
    const ui: SeatUI = {
      id,
      root: h('div', { class: `seat${isChamp ? ' champion' : ''}`, dataset: { id } }),
      name: h('span', { class: 'seat-name' }, capital(c?.short ?? id)),
      stack: h('span', { class: 'stack' }, '0'),
      tower: h('span', { class: 'pile tower', 'aria-hidden': 'true' }),
      purse: h('div', { class: 'purse' }),
      cards: h('div', { class: 'cards' }),
      bet: betSpot(),
      blind: blindChip(),
      last: h('div', { class: 'last' }),
      tell: h('div', { class: 'tell' }),
      say: h('div', { class: 'say', role: 'status' }),
      tellUntil: 0,
    }
    ui.purse.append(ui.tower, ui.stack)
    ui.root.append(
      h('div', { class: 'seat-head banner' },
        ui.blind,
        ui.name,
        isChamp && table.kind === 'tour' ? h('span', { class: 'crown', title: 'Champion' }, '♛') : null),
      h('div', { class: 'hand-row' }, ui.cards, ui.purse, ui.bet),
      ui.last, ui.tell, ui.say)
    const old = seatUI.get(i)
    if (old) old.root.replaceWith(ui.root)
    else els.opponents.append(ui.root)
    seatUI.set(i, ui)
    layoutStage()
    return ui
  }

  for (let i = 1; i < seatIds.length; i++) buildSeat(i)
  if (table.presence && active.mode === 'tour' && table.arrival) els.presence.textContent = table.presence
  if (stage) {
    stage.setStill(settings.reduceMotion)
    applyPace()
    // the room's story piece (Athens: the cup poured for Odysseus) stands until the late champion comes
    stage.setPresence(active.mode === 'tour' && table.arrival ? 'before' : null)
    stage.onReady = () => {
      stageReady = true
      syncStage()
      layoutStage()
      roomDrawn()
      if (active.mode === 'tour' && table.arrival) stage?.preload(table.arrival.character)
      for (const id of seatIds) if (id && RETURNED[id]) stage?.preload(RETURNED[id])
      // the other half of a two-man chair, so he is ready if he walks back in
      for (const id of seatIds) { const o = id ? CHARACTERS[id]?.other?.character : undefined; if (o) stage?.preload(o) }
    }
    layoutStage()
    stage.accent = settings.accent
    stage.youAt = youSeen ? youAt : null
    stage.youAs = avatar
    stage.load(seatIds.map((id, i) => (i > 0 && id ? figureAt(i) : id))).catch(unstage)
    ;(window as any).__stage = stage
  }
  const resized = new ResizeObserver(() => layoutStage())
  resized.observe(els.stageCanvas)
  window.addEventListener('resize', scaleGame)

  /** The stacks as drawn. Chips landing from a pot add to these until the engine's figure arrives. */
  let shownStacks: number[] = []
  /** Bumped on every authoritative redraw, so a late-landing pot cannot count twice. */
  let stackGen = 0

  /**
   * Every chip at the table, for how tall a stack stands: the most the stacks
   * have added up to (a visitor sits down with chips of his own).
   */
  let tableChips = 0

  function setStacks(stacks: number[]) {
    shownStacks = stacks.slice()
    stackGen++
    tableChips = Math.max(tableChips, stacks.reduce((a, b) => a + b, 0))
    for (let i = 0; i < stacks.length; i++) drawStack(i)
  }

  function drawStack(seat: number, amount = shownStacks[seat] ?? 0) {
    const el = stackEl(seat)
    if (el) el.textContent = formatChips(amount)
    const tower = seat === HUMAN_SEAT ? els.youTower : seatUI.get(seat)?.tower
    if (tower) drawTower(tower, amount, tableChips, seat === HUMAN_SEAT ? 4 : 3)
  }

  // ------------------------------------------------------------ chips and cards on the felt
  //
  // Two copies of where the chips are, on purpose. The engine runs ahead of
  // the screen within a hand, so `chipsAt` follows the EVENTS (updated as each
  // one arrives) and works out what each step has to show; `shown` follows
  // the SCREEN (updated as each step plays). Flights are drawn on top and only
  // reveal `shown` when they land, so a flight cut short, or landing late,
  // can never leave a wrong number on the felt.

  const felt = () => els.fx.parentElement as HTMLElement
  /** Where cards come from: Death's deck where he is drawn, else his name. */
  const dealFrom = (): HTMLElement => (stage ? els.deck : els.dealerName)
  const chipsAt = {
    /** Chips each seat had when the hand began, blinds included. */
    handStart: [] as number[],
    /** Chips each seat has already had raked into the middle this hand. */
    swept: [] as number[],
    /** Chips in front of each seat this street. */
    bets: [] as number[],
    /** Chips raked into the middle so far. */
    pot: 0,
    /** Board cards already dealt. */
    board: 0,
  }
  const shown = { bets: [] as number[], pot: 0 }
  let bigBlind = 20

  const stackEl = (seat: number): HTMLElement | null =>
    seat === HUMAN_SEAT ? els.youStack : seatUI.get(seat)?.stack ?? null
  /** Where someone's chips stand: bets leave from it, pots land on it. */
  const purseEl = (seat: number): HTMLElement | null =>
    seat === HUMAN_SEAT ? els.youPurse : seatUI.get(seat)?.purse ?? null
  const betEl = (seat: number): HTMLElement | null =>
    seat === HUMAN_SEAT ? els.youBet : seatUI.get(seat)?.bet ?? null
  const cardBox = (seat: number): HTMLElement | null =>
    seat === HUMAN_SEAT ? els.youCards : seatUI.get(seat)?.cards ?? null
  const cardSize = (seat: number) => (seat === HUMAN_SEAT ? '' : 'small')
  const blindEl = (seat: number): HTMLElement | null =>
    seat === HUMAN_SEAT ? els.youBlind : seatUI.get(seat)?.blind ?? null

  function drawBet(seat: number) {
    const el = betEl(seat)
    if (!el) return
    const v = shown.bets[seat] ?? 0
    el.classList.toggle('empty', v <= 0)
    drawPile(el.firstElementChild as HTMLElement, v, 2, 5)
    el.lastElementChild!.textContent = v > 0 ? formatChips(v) : ''
  }

  function drawPot() {
    drawPile(els.potPile, shown.pot, 3, 7)
  }

  /**
   * A stream of chips from one place to another. How many fly scales with the
   * amount in big blinds, so a limp ticks and a shove pours.
   */
  function pushChips(from: Element | null, to: Element | null, amount: number, ms: number, delay = 0): Promise<void> {
    if (!from || !to || amount <= 0 || ms <= 0) return Promise.resolve()
    const a = centre(from, felt())
    const b = centre(to, felt())
    const n = chipCount(amount, bigBlind)
    const gap = Math.min(34, ms * 0.1)
    return Promise.all(flightColours(amount, n).map((colour, i) =>
      fly(els.fx, chipDisc(colour), nudge(a, 5), nudge(b, 4), ms, { delay: delay + i * gap, arc: 14 + Math.random() * 12 }),
    )).then(() => {})
  }

  /** Face-down cards back to Death. */
  function muckCards(seat: number, ms: number) {
    const box = cardBox(seat)
    if (!box) return
    const to = centre(dealFrom(), felt())
    for (const card of [...box.children]) {
      if (ms > 0) {
        void fly(els.fx, cardEl(null, cardSize(seat)), centre(card, felt()), to, ms,
          { to: 0.45, fade: true, spin: (Math.random() - 0.5) * 50 })
      }
    }
    box.replaceChildren()
  }

  /** Mark the two seats that posted the blinds, and clear every other seat. */
  function setBlinds(sb: number, bb: number) {
    for (let seat = 0; seat < seatIds.length; seat++) {
      const el = blindEl(seat)
      if (!el) continue
      const which = seat === sb ? 'sb' : seat === bb ? 'bb' : ''
      el.hidden = !which
      el.className = `blind-chip ${which}`
      el.textContent = which.toUpperCase()
      el.title = which === 'sb' ? 'Small blind' : which === 'bb' ? 'Big blind' : ''
    }
  }

  /**
   * The log: on a computer, if the player turns it on (the owner), the
   * play-by-play in the corner of the room; otherwise it is for screen readers only.
   */
  let logShown = false
  function applyLog() {
    logShown = canLog() && !!store.get().settings.log
    els.log.classList.toggle('sr-only', !logShown)
    els.log.classList.toggle('table-log', logShown)
    if (logShown) els.log.scrollTop = els.log.scrollHeight
  }

  function log(text: string, cls = '') {
    const li = h('li', cls ? { class: cls } : null, text)
    els.log.append(li)
    while (els.log.children.length > 60) els.log.firstElementChild!.remove()
    if (logShown) els.log.scrollTop = els.log.scrollHeight
  }

  function clearWin() {
    els.handName.textContent = ''
    els.handName.classList.remove('show')
    for (const el of root.querySelectorAll('.card.win')) el.classList.remove('win')
    for (const el of root.querySelectorAll('.seat.winner')) el.classList.remove('winner')
  }

  function joinNames(seats: number[]): string {
    const names = seats.map(nameOf)
    if (names.length <= 1) return names[0] ?? ''
    return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
  }

  function describe(d: Decision, you = false): string {
    const v = (third: string, second: string) => (you ? second : third)
    switch (d.action) {
      case 'fold': return v('folds', 'fold')
      case 'check': return v('checks', 'check')
      case 'call': return v('calls', 'call')
      case 'bet': return `${v('bets', 'bet')} ${formatChips(d.betSize ?? 0)}`
      case 'raise': return `${v('raises', 'raise')} to ${formatChips(d.betSize ?? 0)}`
    }
  }

  function refreshName() {
    const n = run.earnedName()
    // a name on a banner, capitalised like the others ("tenderfoot" is said mid-sentence)
    els.youName.textContent = n ? n[0].toUpperCase() + n.slice(1) : 'You'
    els.youName.classList.toggle('earned', !!n)
    els.youName.title = n ? `The table calls you ${n}` : 'The table does not address you'
  }

  /** Until when the table is watching someone's gesture: no new ambient one starts (see the scheduler). */
  let quietUntil = 0

  /**
   * A tell or an idle. Where the figures are drawn, the figure acts it out and
   * the words are not shown (the owner: the pose, held a few seconds, is the
   * tell; miss it and it is missed); they go to the screen reader's log. On
   * the plain table the words are all there is. Returns until when (ms) the
   * table is watching it.
   */
  function showTell(seat: number, text: string, real: boolean): number {
    const ui = seatUI.get(seat)
    if (!ui) return 0
    const line = tellLine(nameOf(seat), text)
    const said = line[0].toUpperCase() + line.slice(1)
    // "the Cat blinks...": a line begins with a capital; in a span, so its backing hugs the words (style.css)
    ui.tell.replaceChildren(h('span', null, said))
    ui.tell.classList.remove('fade')
    void ui.tell.offsetWidth
    ui.tell.classList.add('fade')
    // The log is read with no seat beside it: "His ears flatten" says whose.
    if (stage && !replaying) log(said.startsWith(nameOf(seat)) ? said : `${nameOf(seat)}: ${said}`, 'tell')
    const clip = cueFor(seat, text)
    const until = Date.now() + Math.max(3600, gestureMs(seat, clip) + 400)
    if (real) ui.tellUntil = until
    quietUntil = until
    if (!replaying) store.sawHabit(ui.id, text)
    if (clip) gesture(seat, clip, real ? PRIO.tell : PRIO.idle)
    return until
  }

  function toast(title: string, body: string, cls = '') {
    const t = h('div', { class: `toast ${cls}` }, h('b', null, title), body ? h('span', null, body) : null)
    els.toasts.append(t)
    // Never bury the table: three at a time, oldest out first. The log keeps
    // every one of them.
    while (els.toasts.children.length > 3) els.toasts.firstElementChild!.remove()
    later(() => t.classList.add('leaving'), 4200)
    later(() => t.remove(), 4800)
  }

  // ------------------------------------------------------------ dialogue

  /**
   * Put a bubble up for `ms`, then take it down. On a timer as well as its
   * animation, so Reduce motion (which switches animations off) still shows
   * it, still, for as long. Any other bubble it would cover comes down first:
   * two lines never sit one over the other (the log keeps both).
   */
  let bubbleToken = 0
  function showBubble(el: HTMLElement, ms: number) {
    el.classList.remove('show')
    void el.offsetWidth
    el.classList.add('show')
    if (staged && el.closest('.seat')) keepInView(el)
    const r = el.getBoundingClientRect()
    for (const o of screenEl.querySelectorAll<HTMLElement>('.say.show, .callout.show, .dealer-line.show, .narration.show')) {
      if (o === el) continue
      const q = o.getBoundingClientRect()
      if (q.width && r.width && q.left < r.right && r.left < q.right && q.top < r.bottom && r.top < q.bottom) o.classList.remove('show')
    }
    const token = String(++bubbleToken)
    el.dataset.token = token
    later(() => { if (el.dataset.token === token) el.classList.remove('show') }, ms)
  }

  function sayLine(b: Extract<Beat, { kind: 'line' }>) {
    const speaker = b.speaker
    const who = speaker === 'death' ? 'Death' : speaker === 'narration' ? '' : CHARACTERS[speaker]?.short ?? speaker
    const logText = speaker === 'narration' ? b.text.replace(/^\[|\]$/g, '') : b.stage ? `${who} ${b.text.replace(/^\[|\]$/g, '')}` : `${who}: “${b.text}”`
    step(() => {
      log(logText, `say${speaker === 'death' ? ' death' : ''}${b.stage ? ' stage' : ''}`)
      if (ff) return
      // where Death plays (the finale) he speaks from his chair, like anyone seated
      if (speaker === 'death' && !seatIds.includes('death')) {
        speak(DEATH, b.text, BUBBLE_MS.dealer)
        els.dealerLine.textContent = `“${b.text}”`
        showBubble(els.dealerLine, BUBBLE_MS.dealer)
      } else if (speaker === 'narration') {
        els.narration.textContent = b.text.replace(/^\[|\]$/g, '')
        showBubble(els.narration, BUBBLE_MS.narration)
      } else {
        const seat = seatIds.indexOf(speaker)
        const ui = seatUI.get(seat)
        if (ui) {
          if (!b.stage) {
            speak(seat, b.text, BUBBLE_MS.say)
            // A talking gesture drawn as a whole figure brings a head of its
            // own, which cannot move its mouth: for most of the cast it hid
            // the moving one for most of the line. A face that talks reads
            // better than a hand that does; the gesture waits for a redraw
            // with the moving head riding on it (Lincoln's `talk`).
            if (!stage?.player(seat)?.hidesMouth('talk')) cue(seat, 'talk', PRIO.tell)
          }
          ui.say.textContent = b.stage ? b.text.replace(/^\[|\]$/g, '') : `“${b.text}”`
          ui.say.classList.toggle('stage', b.stage)
          showBubble(ui.say, BUBBLE_MS.say)
        } else {
          // Not seated (a watcher, or someone just knocked out): the room hears it.
          els.narration.textContent = b.stage ? `${who} ${b.text.replace(/^\[|\]$/g, '')}` : `${who}: “${b.text}”`
          showBubble(els.narration, BUBBLE_MS.narration)
        }
      }
    }, readingTime(b.text), { line: true })
  }

  /** Marks the director awarded that are not yet written to the save. */
  const pendingMarks: string[] = []

  function showMark(id: string) {
    step(() => {
      toast('Entered in the ledger', markTitle(id), 'mark')
      log(`Entered in the ledger: ${markTitle(id)}`, 'big mark')
    }, 0, { line: true })
  }

  // ------------------------------------------------------------ callouts

  /**
   * A callout rides on its action: its bubble goes up in the same instant as
   * the chips (so it is queued just BEFORE the action's step), lives on its
   * own short timer, and adds nothing to the queue -- the player's turn never
   * waits for one. Cut, not sped up, while fast-forwarding. One on screen at
   * a time. The words go in the log just AFTER the action, where they read.
   */
  function showCallout(b: Extract<Beat, { kind: 'callout' }>) {
    step(() => {
      if (ff) return
      const ui = seatUI.get(seatIds.indexOf(b.speaker))
      if (!ui) return
      for (const el of els.opponents.querySelectorAll('.callout.show')) el.classList.remove('show')
      const el = ui.root.querySelector<HTMLElement>('.callout') ?? h('div', { class: 'callout', 'aria-hidden': 'true' })
      if (!el.parentElement) ui.root.append(el)
      const text = b.stage ? b.text.replace(/^\[|\]$/g, '') : `“${b.text}”`
      const ms = Math.round(calloutTime(text) * paceScale)
      // It rides on the action, whose drawing may hide the moving head: the
      // mouth waits for the head to come back (Face.heldBack), within the bubble's time.
      if (!b.stage) speak(seatIds.indexOf(b.speaker), b.text, ms)
      el.textContent = text
      el.classList.toggle('stage', b.stage)
      el.style.animationDuration = `${ms}ms`
      // Any line this seat said earlier has had its reading time: the queue
      // waited for it. Do not stack two bubbles on one chair.
      ui.say.classList.remove('show')
      showBubble(el, ms)
    }, 0)
  }

  function logCallout(b: Extract<Beat, { kind: 'callout' }>) {
    const who = CHARACTERS[b.speaker]?.short ?? b.speaker
    step(() => log(b.stage ? `${who} ${b.text.replace(/^\[|\]$/g, '')}` : `${who}: “${b.text}”`, 'say callout'), 0)
  }

  /**
   * Whether this bit of table talk is shown: all of it, about a third of it,
   * or none (story only, or off). Presentation only, so Math.random: the
   * director has said it either way, and nothing the game deals depends on it.
   */
  function hearChatter(): boolean {
    const level = store.get().settings.dialogue ?? 'all'
    return level === 'all' || (level === 'less' && Math.random() < 0.35)
  }

  function presentBeat(b: Beat) {
    if (b.kind === 'callout') return logCallout(b)
    // Dialogue off: nobody speaks, story lines included (the chairs still change)
    if (b.kind === 'line') return (store.get().settings.dialogue ?? 'all') === 'off' ? undefined : sayLine(b)
    if (b.kind === 'respect') {
      step(() => {
        refreshName()
        const text = b.name
          ? b.tier === 2 ? `They know your name now: ${b.name}.` : `The table calls you “${b.name}” now.`
          : 'The table has noticed you.'
        toast('Respect', text, 'respect')
        log(text, 'big respect')
      }, 0, { line: true })
      return
    }
    if (b.kind === 'mark') {
      pendingMarks.push(b.id)
      showMark(b.id)
    }
  }

  // ------------------------------------------------------------ engine events

  let replaying = active.decisions.length > 0
  let replayBuffer: HandEvent[] = []
  let humanPlace = 0

  function applyStructural(e: HandEvent) {
    // Chair changes must reach the screen even for hands replayed silently.
    if (e.type === 'arrival') {
      seatIds[e.seat] = e.id
      if (e.replaces === e.id && RETURNED[e.id] && PUPPETS[RETURNED[e.id]]) changed.set(e.seat, RETURNED[e.id])
      else changed.delete(e.seat)
      out.delete(e.seat)
      buildSeat(e.seat)
      syncStage()
      // A chair that changed hands without emptying says nothing about a
      // champion who is still to come.
      if (e.cause !== 'banishment') els.presence.textContent = ''
      if (table.arrival && e.id === table.arrival.character && active!.mode === 'tour') stage?.setPresence('after')
    } else if (e.type === 'eliminated') {
      out.add(e.seat)
      stage?.leave(e.seat)
      if (e.seat === HUMAN_SEAT) humanPlace = e.place
      seatUI.get(e.seat)?.root.classList.add('out')
      // Their last fidget goes with them rather than lingering on an empty chair.
      const gone = seatUI.get(e.seat)
      if (gone) { gone.tell.textContent = ''; gone.tellUntil = 0 }
      // Whatever blind they posted on the way out is not theirs any more.
      const blind = blindEl(e.seat)
      if (blind) blind.hidden = true
    } else if (e.type === 'level') {
      els.blinds.textContent = `blinds ${formatChips(e.smallBlind)}/${formatChips(e.bigBlind)}`
    }
  }

  /**
   * The sitting as the curtain call tells it (results.ts): the player's best
   * moments and who fell around them. Counted from the events, live and in a
   * resume's catch-up alike, so a resumed sitting still has its whole story.
   * Presentation only: nothing here touches the game.
   */
  const sitting: Sitting = { potsWon: 0, biggestPot: 0, best: null, knockouts: [], fallen: [], bustedBy: null }
  function count(e: HandEvent) {
    if (e.type === 'result' && e.seat === HUMAN_SEAT && e.delta > 0) {
      sitting.potsWon++
      sitting.biggestPot = Math.max(sitting.biggestPot, e.delta)
    } else if (e.type === 'eliminated' && e.seat !== HUMAN_SEAT) {
      sitting.fallen.push({ id: e.id, place: e.place })
    } else if (e.type === 'arrival' && e.cause !== 'banishment') {
      // The field grew: everyone already out finishes a place lower, so no two
      // share one ("Spartacus out 5th, Cerberus out 5th" once Caesar sat down).
      // Someone coming back (the Green Knight) is not out after all.
      sitting.fallen = sitting.fallen.filter((f) => f.id !== e.id)
      for (const f of sitting.fallen) f.place++
    } else if (e.type === 'handEnd') {
      const sum = run.lastSummary
      if (!sum) return
      sitting.knockouts.push(...sum.knockouts)
      if (sum.bustedBy.length) sitting.bustedBy = sum.bustedBy[0]
      for (const w of sum.showdownWins) {
        if (!sitting.best || w.rank > sitting.best.rank || (w.rank === sitting.best.rank && w.amount > sitting.best.amount)) {
          sitting.best = { rank: w.rank, cards: w.cards, amount: w.amount }
        }
      }
    }
  }

  function onEvent(e: HandEvent) {
    if (conceded) return
    const beats = run.onEvent(e)
    count(e)
    // The uninvited guest is met the moment he sits down, live OR in a resume
    // replay, and off the presentation clock: his ledger page and his mark
    // hang off `met`, and career marks are checked when this hand's record is
    // written, before the queue gets round to showing him. Meeting someone
    // twice changes nothing, so a replay cannot double-count it.
    if (e.type === 'arrival' && (e.cause === 'banishment' || CHARACTERS[e.id]?.role === 'guest')) store.meet(e.id)
    if (e.type === 'arrival' || e.type === 'eliminated' || e.type === 'level') {
      if (replaying) applyStructural(e)
    }
    if (replaying) {
      if (e.type === 'hand') replayBuffer = []
      replayBuffer.push(e)
      // A mark earned in a hand whose record never reached the save (the app
      // closed first) is still earned.
      for (const b of beats) if (b.kind === 'mark') store.earnMark(b.id, table.id)
      return
    }
    // Table talk the player asked to hear less of (settings.dialogue): one
    // draw for the event, so an exchange is heard whole or not at all
    const talk = hearChatter()
    const heard = beats.filter((b) => talk || !(b.kind === 'callout' || (b.kind === 'line' && b.chatter)))
    for (const b of heard) if (b.kind === 'callout') showCallout(b)
    present(e, false)
    for (const b of heard) presentBeat(b)
    if (e.type === 'handEnd') recordLive()
  }

  /** The permanent record, from hands played live only. */
  function recordLive() {
    const summary = run.lastSummary
    const earned: string[] = []
    store.update((s) => {
      if (summary) store.recordHand(summary, table.id)
      for (const id of pendingMarks.splice(0)) store.earnMark(id, table.id)
      for (const id of marksForCareer(s)) if (store.earnMark(id, table.id)) earned.push(id)
      // Respect is kept as it is earned, so a table abandoned halfway still
      // remembers how far you got. It only ever goes up.
      const rec = tableRecord(s, table.id)
      rec.respectTier = Math.max(rec.respectTier, run.tier)
      rec.respectPoints = Math.max(rec.respectPoints, run.points)
      s.story.lastPlayed = new Date().toISOString()
    })
    for (const id of earned) showMark(id)
  }

  function present(e: HandEvent, instant: boolean) {
    const t = (ms: number) => (instant ? 0 : ms)
    /**
     * A movement's length on the clock the queue is running NOW: pace and
     * fast-forward scale it exactly as they scale the step's delay. Zero for a
     * silent catch-up after a resume, and under reduced motion.
     */
    const move = (ms: number) => (instant || settings.reduceMotion ? 0 : ms * paceScale * (ff ? FF_SCALE : 1))
    /** Sound only for what is happening live, never for a replayed catch-up. */
    const loud = !instant
    /** Room for motion in a step's delay; under reduced motion a short beat instead. */
    const room = (ms: number, still = 0) => t(settings.reduceMotion ? still : ms)
    /** A figure's clip, for what is happening live (never in a resume's catch-up). */
    const act = (seat: number, clip: string, prio: Prio = PRIO.act) => { if (!instant) cue(seat, clip, prio) }

    switch (e.type) {
      case 'hand': {
        const seated = e.seats.map((s, i) => (s !== null ? i : -1)).filter((i) => i >= 0)
        // Dealt clockwise from the seat after the button, two rounds.
        const first = Math.max(0, seated.findIndex((i) => i > e.button))
        const round = [...seated.slice(first), ...seated.slice(0, first)]
        const order = [...round, ...round]
        // The blinds as poker-ts posts them: the two seats after the button,
        // except heads-up, where the button is the small blind.
        const [sb, bb] = round.length === 2 ? [round[1], round[0]] : [round[0], round[1]]
        const dealTime = MOVE.shuffle + (order.length - 1) * MOVE.dealGap + MOVE.dealFlight
        chipsAt.handStart = e.stacks.slice()
        chipsAt.swept = e.stacks.map(() => 0)
        chipsAt.bets = e.stacks.map(() => 0)
        chipsAt.pot = 0
        chipsAt.board = 0
        step(() => {
          folded.clear()
          clearWin()
          els.fx.replaceChildren()
          humanInHand = e.seats[HUMAN_SEAT] !== null
          humanAllIn = false
          bigBlind = e.bigBlind
          shown.bets = e.stacks.map(() => 0)
          shown.pot = 0
          els.hand.textContent = `hand ${e.hand}`
          if (!els.blinds.textContent) els.blinds.textContent = `blinds ${formatChips(e.bigBlind / 2)}/${formatChips(e.bigBlind)}`
          for (const [i, ui] of seatUI) {
            ui.cards.replaceChildren()
            ui.last.textContent = ''
            ui.root.classList.remove('folded', 'acting')
            ui.root.classList.toggle('out', out.has(i))
          }
          els.youCards.replaceChildren()
          for (let i = 0; i < e.stacks.length; i++) drawBet(i)
          els.board.replaceChildren()
          drawPot()
          els.pot.textContent = '0'
          setBlinds(sb, bb)
          setStacks(e.stacks)
          updateFF()
          log(`Hand ${e.hand}`, 'head')

          // Two face-down cards to every seat still in the tournament, each
          // one waiting, unseen, for the card flying to it.
          const slots = new Map<number, HTMLElement[]>()
          for (const seat of seated) {
            const box = cardBox(seat)
            if (!box) continue
            const backs = [cardEl(null, cardSize(seat)), cardEl(null, cardSize(seat))]
            box.replaceChildren(...backs)
            slots.set(seat, backs)
          }
          // the plates have their cards again: lay out what lies under them
          layoutStage()
          const flight = move(MOVE.dealFlight)
          if (flight > 0) for (const backs of slots.values()) for (const b of backs) b.style.visibility = 'hidden'
          const from = centre(dealFrom(), felt())
          const lead = move(MOVE.shuffle)
          if (loud && !ff) sound.shuffle()
          // One pitch of the deal, its side by turns. The clip thumbs a card
          // off his deck and pitches it as the first flight leaves; a second
          // clip after it held up a card that never flew, beside the real ones.
          act(DEATH, e.hand % 2 ? 'deal_left' : 'deal_right')
          // each of them looks at what they were dealt, in their own time
          if (!instant) {
            for (const seat of seated) {
              if (seat !== HUMAN_SEAT || youSeen) later(() => cue(seat, 'peek', PRIO.tell), (dealTime + 300 + Math.random() * 1600) * paceScale)
            }
          }
          order.forEach((seat, k) => {
            const target = slots.get(seat)?.[k < round.length ? 0 : 1]
            if (!target || flight <= 0) return
            const delay = lead + k * move(MOVE.dealGap)
            void fly(els.fx, cardEl(null, cardSize(seat)), from, centre(target, felt()), flight,
              { delay, from: 0.55, arc: 10, spin: (Math.random() - 0.5) * 70 })
              .then(() => { target.style.visibility = '' })
            if (loud && (!ff || k % 4 === 0)) sound.deal((delay + flight * 0.6) / 1000)
          })
        }, room(dealTime), { cancelFF: true })
        break
      }
      case 'deal': {
        step(() => {
          // Your two cards, turned up where they landed.
          const backs = [...els.youCards.children] as HTMLElement[]
          const ms = move(MOVE.flip)
          e.hole.forEach((c, i) => {
            const face = cardEl(c)
            if (backs[i]) void flipOver(backs[i], face, ms, i * ms * 0.5)
            else els.youCards.append(face)
            if (loud && ms > 0) sound.flip((i * ms * 0.5 + ms / 2) / 1000)
          })
          if (ms <= 0) els.youCards.replaceChildren(...e.hole.map((c) => cardEl(c)))
        }, room(MOVE.flip * 1.5))
        break
      }
      case 'street': {
        if (e.street === 'preflop') {
          // The blinds go in: whatever each seat has put out since the hand began.
          const blinds = e.stacks.map((behind, i) => Math.max(0, (chipsAt.handStart[i] ?? 0) - behind))
          chipsAt.bets = blinds.slice()
          step(() => {
            const ms = move(MOVE.chips)
            blinds.forEach((put, i) => {
              if (put <= 0) return
              shown.bets[i] = put
              void pushChips(purseEl(i), betEl(i), put, ms, i * ms * 0.25).then(() => drawBet(i))
              if (loud) sound.chips(chipCount(put, bigBlind), (i * ms * 0.25 + ms) / 1000)
            })
            setStacks(e.stacks)
            els.pot.textContent = formatChips(blinds.reduce((a, b) => a + b, 0))
            // A blind can put you all in, and then you are never asked to act.
            if (blinds[HUMAN_SEAT] > 0 && e.stacks[HUMAN_SEAT] === 0) {
              humanAllIn = true
              updateFF()
            }
          }, room(MOVE.chips))
          break
        }
        rake()
        const fresh = e.board.slice(chipsAt.board)
        chipsAt.board = e.board.length
        step(() => {
          setStacks(e.stacks)
          log(`— ${e.street} —`, 'street')
          for (const ui of seatUI.values()) if (Date.now() > ui.tellUntil) ui.tell.textContent = ''
          dealBoard(fresh)
          if (fresh.length) act(DEATH, fresh.length >= 3 ? 'flop' : 'turn')
        }, room(boardTime(fresh.length), BASE.street))
        break
      }
      case 'tell': {
        step(() => showTell(e.seat, e.text, true), t(BASE.tell))
        break
      }
      case 'action': {
        const you = e.seat === HUMAN_SEAT
        const ui = seatUI.get(e.seat)
        const decision = e.decision.action
        const inFront = (chipsAt.handStart[e.seat] ?? 0) - (e.stacks[e.seat] ?? 0) - (chipsAt.swept[e.seat] ?? 0)
        const added = decision === 'fold' || decision === 'check' ? 0 : inFront - (chipsAt.bets[e.seat] ?? 0)
        if (added > 0) chipsAt.bets[e.seat] = inFront
        step(() => {
          for (const u of seatUI.values()) u.root.classList.remove('acting')
          if (ui) {
            ui.root.classList.add('acting')
            ui.last.textContent = describe(e.decision)
          }
          if (!you || youSeen) {
            act(e.seat, decision === 'fold' ? 'fold' : decision === 'check' ? 'check'
              : e.stacks[e.seat] === 0 ? 'all_in' : decision === 'call' ? 'call' : 'bet')
          }
          if (decision === 'fold') {
            folded.add(e.seat)
            ui?.root.classList.add('folded')
            // Mucked cards are gone, not face-down: backs read as "still in".
            muckCards(e.seat, move(MOVE.muck))
            if (loud) sound.muck()
          } else if (decision === 'check') {
            if (loud) sound.knock()
          } else if (added > 0) {
            shown.bets[e.seat] = inFront
            const ms = move(MOVE.chips)
            void pushChips(purseEl(e.seat), betEl(e.seat), added, ms).then(() => drawBet(e.seat))
            if (loud) {
              const allIn = e.stacks[e.seat] === 0
              sound.chips(chipCount(added, bigBlind) + (allIn ? 5 : 0), ms / 1000)
            }
          }
          setStacks(e.stacks)
          els.pot.textContent = formatChips(e.pot)
          log(`${nameOf(e.seat)} ${describe(e.decision, you)}`, you ? 'you' : '')
          if (you && decision !== 'fold' && e.stacks[HUMAN_SEAT] === 0) humanAllIn = true
          updateFF()
        }, t(you ? 220 : BASE.action))
        break
      }
      case 'showdown': {
        const contested = e.revealed.length > 1
        rake(e.pots.reduce((a, p) => a + p.amount, 0))
        // Beat one: turn the cards over and let them sit there. Only when
        // there was a CONTEST -- a pot nobody called is won without showing,
        // and the winner's cards go back to Death unseen.
        if (contested) {
          step(() => {
            for (const u of seatUI.values()) u.root.classList.remove('acting')
            const ms = move(MOVE.flip)
            let k = 0
            for (const { seat, hole } of e.revealed) {
              if (seat === HUMAN_SEAT) {
                if (!els.youCards.children.length) els.youCards.replaceChildren(...hole.map((c) => cardEl(c)))
                continue
              }
              const box = cardBox(seat)
              if (!box) continue
              act(seat, 'show')
              const backs = [...box.children] as HTMLElement[]
              hole.forEach((c, i) => {
                const face = cardEl(c, 'small')
                const delay = k * ms * 0.7 + i * ms * 0.25
                if (backs[i]) void flipOver(backs[i], face, ms, delay)
                else box.append(face)
                if (loud && ms > 0 && i === 0) sound.flip((delay + ms / 2) / 1000)
              })
              k++
            }
            log('— showdown —', 'street')
            for (const { seat, hole } of e.revealed) {
              log(`${nameOf(seat)} ${seat === HUMAN_SEAT ? 'show' : 'shows'} ${handText(hole)}`, seat === HUMAN_SEAT ? 'you' : '')
            }
          }, t(BASE.reveal), { cancelFF: true })
        } else {
          step(() => { for (const u of seatUI.values()) u.root.classList.remove('acting') }, 0)
        }
        // Everyone all in before the river: the rest of the board, a street
        // at a time, with the hands already face up. The runout is the drama.
        const rest = e.board.slice(chipsAt.board)
        const groups = chipsAt.board === 0 ? [3, 1, 1] : [1, 1]
        chipsAt.board = e.board.length
        let at = 0
        for (const n of groups) {
          const cards = rest.slice(at, at + n)
          at += n
          if (!cards.length) break
          step(() => {
            dealBoard(cards)
            act(DEATH, cards.length >= 3 ? 'flop' : 'turn')
          }, room(boardTime(cards.length) + MOVE.runout, BASE.street))
        }
        // Beat two, once per pot: light the five cards that won it, and push
        // the chips to whoever won them. A bet nobody could call goes back
        // first, and quietly: it was never won, so it is not called a pot.
        const real = e.pots.filter((p) => !p.returned)
        const ordered = [...e.pots.filter((p) => p.returned), ...real]
        // Each winner reacts once, to all they won: a nod for an ordinary pot,
        // the big win when it was most of what they sat down to the hand with.
        const wonBy = new Map<number, number>()
        for (const p of real) for (const w of p.winners) wonBy.set(w, (wonBy.get(w) ?? 0) + p.amount / p.winners.length)
        const reacted = new Set<number>()
        const winClip = (w: number) => {
          const win = PUPPETS[figureAt(w)]?.anim.win
          const big = (wonBy.get(w) ?? 0) >= 0.6 * Math.max(1, chipsAt.handStart[w] ?? 0)
          return (big ? win?.big : win?.small) ?? 'won_pot'
        }
        const loseClip = (s: number, amount: number) => {
          const lose = PUPPETS[figureAt(s)]?.anim.lose
          return (amount >= Math.max(1, chipsAt.handStart[s] ?? 0) ? lose?.big : lose?.small) ?? 'lost_pot'
        }
        ordered.forEach((pot) => {
          chipsAt.pot = Math.max(0, chipsAt.pot - pot.amount)
          const left = chipsAt.pot
          const i = real.indexOf(pot)
          if (pot.returned) {
            step(() => {
              const w = pot.winners[0]
              log(`${nameOf(w)} ${w === HUMAN_SEAT ? 'take' : 'takes'} back ${formatChips(pot.amount)} — more than anyone could call`)
              shown.pot = left
              drawPot()
              const ms = move(MOVE.collect)
              const gen = stackGen
              void pushChips(els.potPile, purseEl(w), pot.amount, ms).then(() => {
                if (gen !== stackGen) return
                shownStacks[w] = (shownStacks[w] ?? 0) + pot.amount
                drawStack(w)
              })
              if (loud) sound.chips(chipCount(pot.amount, bigBlind), ms / 1000)
              els.pot.textContent = formatChips(left)
            }, t(MOVE.collect + 200))
            return
          }
          step(() => {
            clearWin()
            if (pot.cards) {
              for (const c of pot.cards) {
                for (const el of root.querySelectorAll(`[data-card="${cardKey(c)}"]`)) el.classList.add('win')
              }
            }
            for (const w of pot.winners) seatUI.get(w)?.root.classList.add('winner')
            // Death pushes it over and the chips fly; the winner reacts (never
            // a hand raking the pot in: that is the chips' job); at a
            // showdown, the ones who lost the main pot take it as they take it.
            const to = pot.winners[0]
            const side = to === HUMAN_SEAT && !youSeen ? 'you' : stage?.geometry().seats.get(to)?.side === 'r' ? 'right' : 'left'
            act(DEATH, `push_${side}`)
            for (const w of pot.winners) {
              if ((w !== HUMAN_SEAT || youSeen) && !reacted.has(w)) { reacted.add(w); act(w, winClip(w)) }
            }
            if (contested && i === 0) {
              for (const { seat } of e.revealed) {
                if ((seat !== HUMAN_SEAT || youSeen) && !pot.winners.includes(seat)) act(seat, loseClip(seat, pot.amount), PRIO.tell)
              }
            }
            if (pot.ranking && contested) {
              const who = pot.winners.length > 1 ? 'Split' : nameOf(pot.winners[0])
              els.handName.textContent = `${who}: ${pot.ranking.replace(/^(a|an) /, '')}`
              els.handName.classList.add('show')
            }
            const label = real.length === 1 ? 'the pot' : i === 0 ? 'the main pot' : `side pot ${i}`
            const withWhat = pot.ranking
              ? ` with ${pot.ranking}${pot.cards ? ` — ${handText(pot.cards)}` : ''}`
              : ' uncontested'
            if (pot.winners.length > 1) {
              log(`${joinNames(pot.winners)} split ${label} (${formatChips(pot.amount)})${withWhat}`, 'big')
            } else {
              const w = pot.winners[0]
              log(`${nameOf(w)} ${w === HUMAN_SEAT ? 'win' : 'wins'} ${label} (${formatChips(pot.amount)})${withWhat}`, 'big')
            }
            // Out of the middle and across the felt.
            shown.pot = left
            drawPot()
            const ms = move(MOVE.collect)
            const lead = move(pot.ranking ? 380 : 120)
            const share = Math.floor(pot.amount / pot.winners.length)
            const gen = stackGen
            pot.winners.forEach((w, k) => {
              void pushChips(els.potPile, purseEl(w), share, ms, lead + k * ms * 0.2).then(() => {
                if (gen !== stackGen) return
                shownStacks[w] = (shownStacks[w] ?? 0) + share
                drawStack(w)
              })
              if (loud) sound.chips(chipCount(share, bigBlind) + 2, (lead + k * ms * 0.2 + ms) / 1000)
            })
            els.pot.textContent = formatChips(left)
          }, t(contested || pot.ranking ? BASE.showdown : MOVE.uncontested))
        })
        break
      }
      case 'result': {
        if (e.delta === 0) break
        step(() => {
          const sign = e.delta > 0 ? '+' : ''
          log(`  ${nameOf(e.seat)} ${sign}${formatChips(e.delta)}`, e.seat === HUMAN_SEAT ? 'you delta' : 'delta')
        }, 0)
        break
      }
      case 'level': {
        step(() => {
          els.blinds.textContent = `blinds ${formatChips(e.smallBlind)}/${formatChips(e.bigBlind)}`
          log(`Blinds up: ${formatChips(e.smallBlind)}/${formatChips(e.bigBlind)}`, 'head')
        }, t(BASE.level))
        break
      }
      case 'eliminated': {
        step(() => {
          if (e.seat !== HUMAN_SEAT) act(e.seat, 'knocked_out')
          applyStructural(e)
          log(`${nameOf(e.seat)} ${e.seat === HUMAN_SEAT ? 'are' : 'is'} out (${ordinal(e.place)})`, 'big')
          // down to two: the last of them leans in, and Death watches
          const left = seatIds.map((_, i) => i).filter((i) => i !== HUMAN_SEAT && seatIds[i] && !out.has(i))
          if (left.length === 1 && !out.has(HUMAN_SEAT)) {
            act(left[0], 'heads_up', PRIO.tell)
            act(DEATH, 'steeple', PRIO.tell)
          }
        }, t(BASE.result))
        break
      }
      case 'arrival': {
        if (e.cause === 'banishment') { presentGuestArrival(e, instant); break }
        step(() => {
          applyStructural(e)
          const ui = seatUI.get(e.seat)
          ui?.root.classList.add('arriving')
          if (ui) drawStack(e.seat, e.stack)
          const who = CHARACTERS[e.id]?.short ?? e.id
          act(e.seat, 'arrive', PRIO.tell)
          log(e.replaces === e.id
            ? `${who} is back, and takes the old chair again with ${formatChips(e.stack)} chips.`
            : `${who} takes the empty chair with ${formatChips(e.stack)} chips.`, 'big')
          if (!replaying) store.meet(e.id)
        }, t(BASE.level))
        break
      }
      case 'handEnd':
        // The engine's own count, now that every chip has landed.
        step(() => setStacks(e.stacks), 0)
        break
    }

    /** Time to deal `n` board cards and turn them over. */
    function boardTime(n: number): number {
      if (!n) return 0
      return MOVE.boardFlight + (n - 1) * MOVE.boardGap + (n - 1) * MOVE.flopGap + MOVE.flip
    }

    /**
     * New board cards: face down out of Death's hands, then turned. The flop
     * lands as three and turns one at a time -- its own beat, not a blink.
     */
    function dealBoard(cards: Card[]) {
      if (!cards.length) return
      const flight = move(MOVE.boardFlight)
      const flipMs = move(MOVE.flip)
      const from = centre(dealFrom(), felt())
      const backs = cards.map(() => cardEl(null))
      els.board.append(...backs)
      if (flight <= 0) {
        backs.forEach((b, i) => b.replaceWith(cardEl(cards[i])))
        return
      }
      for (const b of backs) b.style.visibility = 'hidden'
      const gap = move(MOVE.boardGap)
      const turnGap = move(MOVE.flopGap)
      const landed = backs.map((b, i) => {
        const delay = i * gap
        if (loud && (!ff || i === 0)) sound.deal((delay + flight * 0.6) / 1000)
        return fly(els.fx, cardEl(null), from, centre(b, felt()), flight, { delay, from: 0.6, arc: 12, spin: (Math.random() - 0.5) * 40 })
          .then(() => { b.style.visibility = '' })
      })
      void Promise.all(landed).then(() => {
        backs.forEach((b, i) => {
          void flipOver(b, cardEl(cards[i]), flipMs, i * turnGap)
          if (loud) sound.flip((i * turnGap + flipMs / 2) / 1000)
        })
      })
    }

    /**
     * End of a street: every bet in front of a seat slides into the middle.
     * `final` is the engine's own total at showdown, so an all-in that never
     * reached a street event still ends with the right pot in the middle.
     */
    function rake(final?: number) {
      const moving = chipsAt.bets.map((b, i) => [i, b] as const).filter(([, b]) => b > 0)
      for (const [i, b] of moving) {
        chipsAt.swept[i] = (chipsAt.swept[i] ?? 0) + b
        chipsAt.pot += b
        chipsAt.bets[i] = 0
      }
      if (final !== undefined) chipsAt.pot = final
      if (!moving.length && final === undefined) return
      const pot = chipsAt.pot
      step(() => {
        const ms = move(MOVE.sweep)
        for (const [i, b] of moving) {
          shown.bets[i] = 0
          drawBet(i)
          void pushChips(betEl(i), els.potPile, b, ms).then(drawPot)
        }
        shown.pot = pot
        if (ms <= 0 || !moving.length) drawPot()
        if (final !== undefined) els.pot.textContent = formatChips(final)
        if (loud && moving.length) sound.sweep(moving.length, (ms / 1000) * 0.6)
      }, moving.length ? room(MOVE.sweep) : 0)
    }
  }

  // ------------------------------------------------------------ the uninvited guest

  /**
   * The chair changes hands without ever standing empty for a hand. The
   * offender's words and the dealer's ruling have already been queued by the
   * director (the 'banished' beats); these are the two beats between them and
   * the guest's first line: the chair empties, and he is in it, behind the
   * very same chips. Both run on the presentation clock, so fast-forward
   * speeds them like anything else, and the lines around them are cut.
   */
  function presentGuestArrival(e: Extract<HandEvent, { type: 'arrival' }>, instant: boolean) {
    const t = (ms: number) => (instant ? 0 : ms)
    const leaving = e.replaces ? CHARACTERS[e.replaces]?.short ?? e.replaces : null
    step(() => {
      const ui = seatUI.get(e.seat)
      if (ui) {
        ui.root.classList.add('out')
        ui.cards.replaceChildren()
        ui.last.textContent = ''
        ui.tell.textContent = ''
      }
      if (leaving) log(`${leaving} is shown out of the Invitational. The chips stay where they are.`, 'big')
      if (!instant) cue(DEATH, 'way_out')
      stage?.leave(e.seat)
    }, t(BASE.result))
    step(() => {
      applyStructural(e)
      const ui = seatUI.get(e.seat)
      ui?.root.classList.add('arriving')
      if (ui) drawStack(e.seat, e.stack)
      if (!instant) cue(e.seat, 'arrive', PRIO.tell)
      log(`${CHARACTERS[e.id]?.short ?? e.id} is sitting in the chair, behind the same ${formatChips(e.stack)} chips.`, 'big')
    }, t(BASE.level))
  }

  // ------------------------------------------------------------ fast-forward

  function updateFF() {
    // Offered only when the player has nothing to decide: folded, all in, or
    // out of the tournament. It is a fast-forward, not a skip.
    const canFF = settings.fastForward &&
      (folded.has(HUMAN_SEAT) || humanAllIn || !humanInHand || out.has(HUMAN_SEAT))
    els.ff.hidden = !canFF
    if (!canFF && ff) setFF(false)
  }

  // ------------------------------------------------------------ ambient noise

  /**
   * The idle scheduler: meaningless fidgeting drawn from each character's
   * vocabulary, tells included, at a rate set by their `noise` dial. This is
   * the second difficulty axis made visible -- early tables fidget little and
   * their real tells stand out; late tables bury them. Runs on real time at a
   * normal rate even while fast-forwarding (characters breathe normally while
   * the chips fly), and draws from Math.random because nothing it does can
   * ever touch a hand.
   */
  const ambient = setInterval(() => {
    if (!alive || replaying || document.hidden || paused) return
    // One gesture at a time (the owner: too much moving at once to tell what
    // is what): while anyone's tell, idle or fidget is showing, nobody else
    // starts one. A real tell still plays when it happens; it is never queued.
    if (Date.now() < quietUntil) return
    for (const [i, ui] of seatUI) {
      if (out.has(i) || Date.now() < ui.tellUntil) continue
      const c = CHARACTERS[ui.id]
      if (!c) continue
      const vocab = [...c.idles, ...c.tells.map((t) => t.text)]
      if (!vocab.length || Math.random() > c.dials.noise * 0.3) continue
      ui.tellUntil = showTell(i, vocab[Math.floor(Math.random() * vocab.length)], false)
      return
    }
    // Where they are drawn, the figures also fidget without words: small
    // business, and the decoys drawn beside each tell (MOTION-SPEC), so that
    // a gesture alone means nothing. Death only ever looks weary.
    if (!stage) return
    for (const i of [...seatUI.keys(), ...(youSeen ? [HUMAN_SEAT] : [])]) {
      const fidgets = PUPPETS[figureAt(i)]?.anim.fidgets ?? []
      if (out.has(i) || !fidgets.length || Math.random() > 0.022) continue
      const fidget = fidgets[Math.floor(Math.random() * fidgets.length)]
      gesture(i, fidget, PRIO.idle)
      quietUntil = Date.now() + Math.max(3200, gestureMs(i, fidget) + 400)
      break
    }
    if (Math.random() < 0.012) cue(DEATH, Math.random() < 0.5 ? 'weary' : 'look_up', PRIO.idle)
  }, 1300)

  // ------------------------------------------------------------ your turn

  let resolveTurn: ((d: Decision) => void) | null = null
  let turnStarted = 0
  let thinkingTimer: ReturnType<typeof setTimeout> | null = null
  let keyHandler: ((ev: KeyboardEvent) => void) | null = null

  function endTurn(d: Decision) {
    if (!resolveTurn) return
    if (thinkingTimer) clearTimeout(thinkingTimer)
    els.buttons.replaceChildren()
    closeRaise()
    els.prompt.textContent = ''
    d.thinkMs = Math.round(performance.now() - turnStarted)
    // Write the decision down BEFORE the engine sees it: if the app dies in
    // the next millisecond, the save still knows what was done.
    store.update((s) => {
      if (s.active) s.active.decisions.push({ action: d.action, betSize: d.betSize, thinkMs: d.thinkMs })
    })
    const r = resolveTurn
    resolveTurn = null
    r(d)
  }

  function button(label: string, cls: string, key: string, onClick: () => void): HTMLButtonElement {
    const b = h('button', { type: 'button', class: cls, onclick: onClick }, label)
    if (key) b.dataset.key = key
    return b
  }

  let replayIndex = 0
  async function onHumanTurn(view: TurnView): Promise<Decision> {
    if (replaying && replayIndex < active!.decisions.length) {
      const d = active!.decisions[replayIndex++]
      if (!view.legal.includes(d.action)) {
        // The replay has left the path it was saved on. Stop here rather than
        // hand the engine an illegal move.
        alive = false
        releaseSeat(root, table.name)
        return new Promise<Decision>(() => {})
      }
      return { action: d.action, betSize: d.betSize, thinkMs: d.thinkMs, reason: 'human' }
    }
    if (replaying) finishReplay()

    // Do not ask for a decision until the player has SEEN what led to it.
    // The only place the two clocks meet, and a one-way wait.
    setFF(false)
    await settled()
    await landed()
    if (!alive) return new Promise<Decision>(() => {})
    sound.yourTurn()

    for (const u of seatUI.values()) u.root.classList.remove('acting')
    setStacks(view.stacks)
    els.youCards.replaceChildren(...view.hole.map((c) => cardEl(c)))
    els.pot.textContent = formatChips(view.pot)
    els.prompt.textContent = view.toCall > 0 ? `${formatChips(view.toCall)} to call` : 'Check or bet'
    const b = els.buttons
    b.replaceChildren()

    // Folding when a check is free is only ever a misclick, so it is not offered.
    if (view.legal.includes('fold') && !view.legal.includes('check')) {
      b.append(button('Fold', 'act-fold', 'f', () => endTurn({ action: 'fold', reason: 'human' })))
    }
    if (view.legal.includes('check')) {
      b.append(button('Check', 'act-stay', 'c', () => endTurn({ action: 'check', reason: 'human' })))
    }
    if (view.legal.includes('call')) {
      const amount = Math.min(view.toCall, view.stack)
      const label = amount >= view.stack ? `Call all in (${formatChips(amount)})` : `Call ${formatChips(amount)}`
      b.append(button(label, 'act-stay', 'c', () => endTurn({ action: 'call', reason: 'human' })))
    }
    const raise: Action | null = view.legal.includes('raise') ? 'raise' : view.legal.includes('bet') ? 'bet' : null
    if (raise && view.maxRaise >= view.minRaise) {
      b.append(button(raise === 'bet' ? 'Bet…' : 'Raise…', 'act-bet', 'r', () => openRaise(view)))
    }
    els.raiseConfirm.onclick = () => {
      if (!raise) return
      endTurn({ action: raise, betSize: Number(els.slider.value), reason: 'human' })
    }
    els.raiseCancel.onclick = closeRaise

    turnStarted = performance.now()
    thinkingTimer = later(() => {
      const beat = run.thinkingLong()
      if (beat && hearChatter()) presentBeat(beat)
    }, THINKING_LONG_MS)

    return new Promise<Decision>((resolve) => { resolveTurn = resolve })
  }

  /**
   * The sizing row takes the buttons' place while it is open, rather than
   * sitting under them: on a phone held sideways there is not the height for
   * both, and the extra row pushed the player's cards over the board.
   */
  function closeRaise() {
    els.raiseRow.hidden = true
    els.buttons.hidden = false
    clearOfRaise()
  }

  /**
   * On a staged table the raise panel stands at the bottom right; while it is
   * open, move the board and pot left just enough to stay clear of it (on a
   * phone they would meet), but not onto your cards. Closed, they go back.
   */
  function clearOfRaise() {
    const mid = els.board.parentElement as HTMLElement | null
    if (!mid || !stage) return
    mid.style.marginLeft = ''
    if (els.raiseRow.hidden) return
    const over = mid.getBoundingClientRect().right - els.raiseRow.getBoundingClientRect().left + 8
    // never onto your own cards, though: if both cannot be clear, the panel covers the pot's edge
    const free = els.board.getBoundingClientRect().left - els.youCards.getBoundingClientRect().right - 8
    const by = Math.min(over, Math.max(0, free))
    if (by > 0) mid.style.marginLeft = `${-by}px`
  }

  function openRaise(view: TurnView) {
    els.raiseRow.hidden = false
    els.buttons.hidden = true
    const s = els.slider
    s.min = String(view.minRaise)
    s.max = String(view.maxRaise)
    s.step = '1'
    const clamp = (v: number) => Math.min(view.maxRaise, Math.max(view.minRaise, Math.round(v)))
    // The slider snaps to fives (the owner); the least you may raise and all in stay reachable exactly.
    const snap = (v: number) => {
      if (v >= view.maxRaise) return view.maxRaise
      const r = Math.round(v / 5) * 5
      return r < view.minRaise ? view.minRaise : r > view.maxRaise ? view.maxRaise : r
    }
    // Sizes are "raise TO", as the engine takes them (decide's raiseTo): what
    // is already in front of you, the call, then a share of the pot as it
    // would stand after the call. Leaving out the chips in front made Pot from
    // the big blind a min-raise.
    const to = (frac: number) => clamp(view.bet + view.toCall + frac * (view.pot + view.toCall))
    const sizes: [string, number][] = [['½ pot', snap(to(0.5))], ['Pot', snap(to(1))], ['All in', view.maxRaise]]
    s.value = String(snap(to(0.6)))
    // the amount is on the button that commits it
    const verb = view.toCall > 0 || view.bet > 0 ? 'Raise to' : 'Bet'
    const span = Math.max(1, view.maxRaise - view.minRaise)
    const at = (v: number) => (v - view.minRaise) / span
    let last = Number(s.value)
    let tickAt = 0
    // Some life (the owner: "less stiff"): the bar fills green, through gold,
    // to an ember red as the bet nears all in; the handle is a chip of that
    // colour with the amount riding over it; a light chip tick as it moves.
    const sync = () => {
      const v = snap(Number(s.value))
      s.value = String(v)
      const p = at(v)
      const hue = 140 - 125 * p
      els.sliderWrap.style.setProperty('--p', `${(p * 100).toFixed(2)}%`)
      els.sliderWrap.style.setProperty('--f', p.toFixed(4))
      els.sliderWrap.style.setProperty('--fill', `hsl(${hue.toFixed(0)} 62% ${(44 + 8 * Math.sin(Math.PI * p)).toFixed(0)}%)`)
      els.sliderWrap.classList.toggle('all-in', v >= view.maxRaise)
      els.sliderTag.textContent = formatChips(v)
      els.raiseConfirm.textContent = v >= view.maxRaise ? `All in ${formatChips(v)}` : `${verb} ${formatChips(v)}`
      els.raiseConfirm.classList.toggle('all-in', v >= view.maxRaise)
      for (const b of els.quick.children) b.classList.toggle('on', Number((b as HTMLElement).dataset.v) === v)
      if (v !== last && performance.now() - tickAt > 55) { sound.tick(); tickAt = performance.now() }
      last = v
    }
    els.quick.replaceChildren(...sizes.map(([label, v]) =>
      h('button', { type: 'button', class: 'ghost small', dataset: { v: String(v) }, onclick: () => { s.value = String(v); sync() } }, label)))
    els.sliderTicks.replaceChildren(...sizes.slice(0, 2).filter(([, v]) => v > view.minRaise && v < view.maxRaise)
      .map(([, v]) => h('i', { style: `left:${(at(v) * 100).toFixed(2)}%` })))
    s.oninput = sync
    // the arrow keys move a notch of five, not one (which the snap would undo)
    s.onkeydown = (ev) => {
      const d = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 5 : ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' ? -5 : 0
      if (!d) return
      ev.preventDefault()
      s.value = String(snap(Number(s.value) + d))
      sync()
    }
    sync()
    clearOfRaise()
    s.focus()
  }

  keyHandler = (ev: KeyboardEvent) => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return
    // Escape: closes the menu, or the raise panel, or opens the menu
    if (ev.key === 'Escape' && (menu || els.raiseRow.hidden)) { if (menu) closeMenu(); else openMenu(); return }
    if (menu || !resolveTurn) return
    if ((ev.target as HTMLElement)?.tagName === 'INPUT' && ev.key !== 'Enter' && ev.key !== 'Escape') return
    const k = ev.key.toLowerCase()
    if (k === 'enter' && !els.raiseRow.hidden) { els.raiseConfirm.click(); ev.preventDefault(); return }
    if (k === 'escape' && !els.raiseRow.hidden) { closeRaise(); return }
    const btn = els.buttons.querySelector<HTMLButtonElement>(`button[data-key="${k}"]`)
    if (btn) { btn.click(); ev.preventDefault() }
  }
  window.addEventListener('keydown', keyHandler)

  // ------------------------------------------------------------ the menu

  /**
   * The menu, in the Leave button's place (the owner: cleaner, and better on
   * a phone): the settings that matter at the table, stepping away (the seat
   * is kept, to the very hand, as Leave did) and quitting, which ends the
   * sitting as a loss. While it is open the table waits.
   */
  let menu: HTMLElement | null = null
  /** The player quit the table: nothing more of it is shown. */
  let conceded = false

  function openMenu() {
    if (menu || !alive) return
    paused = new Promise((r) => { unpause = r })
    if (thinkingTimer) { clearTimeout(thinkingTimer); thinkingTimer = null }
    const live = !conceded && !!store.get().active
    const resume = h('button', { type: 'button', class: 'primary' }, live ? 'Back to the table' : 'Close')
    resume.addEventListener('click', closeMenu)
    const quitNote = h('small', null, 'End this sitting now. It counts as a loss, behind everyone still at the table.')
    const quit = h('button', { type: 'button', class: 'danger', disabled: replaying }, 'Quit the table')
    let armed = false
    quit.addEventListener('click', () => {
      if (!armed) {
        armed = true
        quit.textContent = 'Quit, and take the loss'
        quitNote.textContent = 'Sure? The ledger will record it as a loss.'
        return
      }
      closeMenu()
      concede()
    })
    const panel = h('div', { class: 'menu-panel' },
      h('header', { class: 'menu-head' },
        h('h2', null, table.name),
        h('button', { type: 'button', class: 'ghost small', 'aria-label': 'Close', onclick: closeMenu }, '✕')),
      h('div', { class: 'menu-cols' },
        h('section', { class: 'menu-settings', 'aria-label': 'Settings' },
          toggleSetting('Sound', 'Cards dealt, chips pushed, the knock of a check.', 'sound', (on) => { if (on) sound.chips(3) }),
          choiceSetting('Dialogue', DIALOGUE_HINT, 'dialogue', DIALOGUE_LEVELS),
          choiceSetting('Table pace', '', 'pace', PACES, (v) => {
            if (urlPace !== null) return
            paceScale = PACE_BY_SETTING[v]
            applyPace()
          }),
          canLog() ? toggleSetting('Log', LOG_HINT, 'log', applyLog) : null),
        h('section', { class: 'menu-actions', 'aria-label': 'Leave' },
          resume,
          h('div', { class: 'menu-action' },
            h('button', { type: 'button', onclick: () => go('/') }, live ? 'Step away' : 'Leave'),
            h('small', null, live ? 'Your seat is kept. Come back to this very hand.' : 'Back to the title.')),
          live ? h('div', { class: 'menu-action' }, quit, quitNote) : null)))
    menu = h('div', { class: 'table-menu', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Menu' }, panel)
    menu.addEventListener('click', (ev) => { if (ev.target === menu) closeMenu() })
    screenEl.append(menu)
    resume.focus()
  }

  function closeMenu() {
    if (!menu) return
    menu.remove()
    menu = null
    paused = null
    unpause()
    menuButton.focus()
  }

  /** Quit from the menu: the sitting ends here, as a loss. The hand in play is not shown out. */
  function concede() {
    if (conceded || !alive || !store.get().active) return
    conceded = true
    queue.length = 0
    els.fx.replaceChildren()
    if (thinkingTimer) { clearTimeout(thinkingTimer); thinkingTimer = null }
    resolveTurn = null
    finishTable(true)
  }

  // ------------------------------------------------------------ replay

  /**
   * The saved decisions have all been replayed and the engine is waiting on a
   * decision nobody has made yet: the table is exactly where it was left.
   * Show the current hand as it stands, instantly, and carry on live.
   */
  function finishReplay() {
    replaying = false
    const buffered = replayBuffer
    replayBuffer = []
    log('— you return to your seat —', 'head')
    for (const e of buffered) present(e, true)
    const back = pickDealer('resume')
    if (back) presentBeat({ kind: 'line', id: back.id, speaker: 'death', text: back.text, stage: false })
    refreshName()
  }

  function pickDealer(key: string): Line | null {
    const pool = DEALER[key] ?? []
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null
  }

  // ------------------------------------------------------------ the game

  const arrivals = arrivalRules(table, active.mode, active.seats)

  // The house rule that lets the uninvited guest in. Absent at the finale.
  const banishment = banishmentFor(table)

  const run = new TableRun({
    table,
    dialogue,
    mode: active.mode,
    seed: active.seed,
    playerName,
    respectTier: active.respectTier,
    respectPoints: active.respectPoints,
    earnedMarks: Object.keys(save.marks),
    buyIn: table.buyIn,
    uninvited: banishment ? UNINVITED : undefined,
    beaten: Object.keys(save.characters).filter((id) => save.characters[id].beaten),
  })

  const game = new Game([HUMAN, ...active.seats.map(personality)], {
    mode: 'tournament',
    buyIn: table.buyIn,
    rollouts: 60,
    rng: mulberry32(active.seed),
    handsPerLevel: table.handsPerLevel,
    humanSeat: HUMAN_SEAT,
    onHumanTurn,
    onEvent,
    arrivals,
    banishment,
  })

  refreshName()
  setStacks(game.stacks())
  els.blinds.textContent = `blinds ${formatChips(game.bigBlind() / 2)}/${formatChips(game.bigBlind())}`
  store.update(() => { for (const id of active.seats) store.meet(id) })

  const startedAt = Date.now()
  const flushTime = () => {
    const secs = Math.round((Date.now() - startedAt) / 1000)
    store.update((s) => { s.record.secondsPlayed += secs })
  }

  async function main() {
    if (replaying) {
      els.prompt.textContent = 'Death reshuffles, exactly as before…'
    }
    while (!game.isComplete() && alive && !conceded) {
      await game.playHand()
      if (!replaying) await settled()
      if (out.has(HUMAN_SEAT) || !alive || conceded) break
      if (!replaying) await sleep(450 * paceScale)
    }
    if (!alive || conceded) return
    if (replaying) finishReplay()
    await settled()
    finishTable()
  }

  /** `quit`: the player quit the table from the menu, and it ends here as a loss. */
  function finishTable(quit = false) {
    els.buttons.replaceChildren()
    closeRaise()
    setFF(false)
    // The table is over: nothing left to fast-forward, and nobody's blind.
    els.ff.hidden = true
    setBlinds(-1, -1)
    const won = !quit && game.survivors()[0] === HUMAN_SEAT && game.isComplete()
    const missed = game.missedArrivals()
    const { beats, facts } = run.finish(won, game.handCount(), missed)
    for (const b of beats) presentBeat(b)

    const outcome: TableOutcome = {
      table: table.id,
      mode: active!.mode,
      won,
      // quitting, you finish behind everyone still sitting
      place: won ? 1 : quit ? Math.max(2, game.survivors().length) : humanPlace || game.getSeats().length,
      hands: game.handCount(),
      sat: [...run.sat],
      missed,
      respectTier: run.tier,
      respectPoints: run.points,
    }
    const newMarks: string[] = []
    let effects: ReturnType<typeof applyOutcome> | null = null
    store.update((s) => {
      for (const id of pendingMarks.splice(0)) if (store.earnMark(id, table.id)) newMarks.push(id)
      effects = applyOutcome(s, outcome)
      for (const id of marksForCareer(s)) if (store.earnMark(id, table.id)) newMarks.push(id)
      s.active = null
    })
    flushTime()
    const result = { outcome, effects: effects!, marks: newMarks, facts, name: run.earnedName(), sitting }
    setResult(result)
    sitting.quit = quit
    const said = won ? 'You hold every chip.' : quit ? 'You leave the table.' : 'You are out.'
    els.prompt.textContent = said
    log(won ? 'You win the table.' : said, 'big')
    void settled().then(() => {
      if (!alive) return
      // The curtain call comes down over the table: the room keeps breathing
      // behind it, and the felt where it happened stays in view.
      els.buttons.replaceChildren(
        h('button', { type: 'button', class: 'primary', onclick: () => go('/results') }, 'Continue'))
      const veil = curtainCall(result, () => veil.remove())
      root.append(veil)
    })
  }

  applyLog()
  void main()

  return () => {
    alive = false
    clearInterval(ambient)
    stage?.destroy()
    resized.disconnect()
    window.removeEventListener('resize', scaleGame)
    for (const t of timers) clearTimeout(t)
    if (keyHandler) window.removeEventListener('keydown', keyHandler)
    store.flush()
    if (store.get().active) flushTime()
  }
}

/**
 * The saved seat cannot be restored exactly. Clear it -- no loss recorded,
 * this is not the player's fault -- and explain.
 */
function releaseSeat(root: HTMLElement, tableName: string) {
  store.update((s) => { s.active = null })
  root.replaceChildren(h('div', { class: 'screen results' }, h('div', { class: 'results-body' },
    h('p', { class: 'kicker' }, tableName),
    h('h2', { class: 'headline' }, 'The cards have been changed'),
    h('p', null, 'The game has been updated since you left this table, and the hand you left cannot be dealt again exactly as it was. Rather than deal you a different one and pretend otherwise, the dealer has cleared the table. Nothing is held against you.'),
    h('div', { class: 'actions' },
      h('button', { type: 'button', class: 'primary', onclick: () => go('/tour') }, 'Back to the tour')))))
}

/** Death's words from dealer.json, with the player's name filled in. */
export function dealerLine(key: string, playerName: string): string | null {
  const pool = DEALER[key] ?? []
  if (!pool.length) return null
  return fillLine(pool[Math.floor(Math.random() * pool.length)].text, undefined, playerName)
}
