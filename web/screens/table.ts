import { Game, type HandEvent, type TurnView } from '../../src/game.js'
import { HUMAN } from '../../src/personality.js'
import type { Action, Decision } from '../../src/decide.js'
import type { Card } from '../../src/equity.js'
import { mulberry32 } from '../../src/rng.js'
import { CHARACTERS, DIALOGUE, DEALER, TABLE_BY_ID, personality, arrivalRules, type Line } from '../../src/content.js'
import { TableRun, type Beat } from '../../src/director.js'
import { applyOutcome, fillLine, type TableOutcome } from '../../src/tour.js'
import { tableRecord, ENGINE_VERSION } from '../../src/save.js'
import { marksForCareer } from '../../src/marks.js'
import * as store from '../store.js'
import { h, go, sleep, formatChips, ordinal } from '../dom.js'
import * as sound from '../sound.js'
import { fly, flipOver, centre, chipDisc, flightColours, drawPile, chipCount, type Pt } from '../fx.js'
import { setResult } from './results.js'
import { markTitle } from './shared.js'

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
const isRed = (c: Card) => c.suit === 'hearts' || c.suit === 'diamonds'
const cardKey = (c: Card) => `${c.rank}${c.suit[0]}`
const cardText = (c: Card) => `${c.rank === 'T' ? '10' : c.rank}${SUIT[c.suit]}`
const handText = (cards: Card[]) => cards.map(cardText).join(' ')

export function cardEl(c: Card | null, size: '' | 'small' | 'tiny' = ''): HTMLElement {
  const d = h('div', {
    class: `card${size ? ' ' + size : ''}${c && isRed(c) ? ' red' : ''}${c ? '' : ' back'}`,
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

const nudge = (p: Pt, by: number): Pt => ({ x: p.x + (Math.random() * 2 - 1) * by, y: p.y + (Math.random() * 2 - 1) * by })

function readingTime(text: string): number {
  return Math.max(1500, Math.min(5200, 900 + text.length * 48))
}

type SeatUI = {
  id: string
  root: HTMLElement
  name: HTMLElement
  stack: HTMLElement
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
  const paceScale = urlPace !== null ? Math.max(0, Number(urlPace)) : PACE_BY_SETTING[settings.pace]

  let alive = true
  const timers = new Set<ReturnType<typeof setTimeout>>()
  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(() => { timers.delete(t); if (alive) fn() }, ms)
    timers.add(t)
    return t
  }

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
    pot: h('span', { class: 'pot-value' }, '0'),
    potPile: h('span', { class: 'pile', 'aria-hidden': 'true' }),
    dealerName: h('span', { class: 'dealer-name' }, 'Death'),
    fx: h('div', { class: 'fx', 'aria-hidden': 'true' }),
    youBet: betSpot(),
    youName: h('span', { class: 'you-name' }),
    youStack: h('span', { class: 'stack' }),
    youCards: h('div', { class: 'you-cards', 'aria-label': 'Your cards' }),
    youBlind: blindChip(),
    prompt: h('div', { class: 'prompt' }, 'Death shuffles.'),
    buttons: h('div', { class: 'buttons' }),
    raiseRow: h('div', { class: 'raise-row', hidden: true }),
    slider: h('input', { type: 'range', class: 'raise-slider', 'aria-label': 'Bet size' }) as HTMLInputElement,
    raiseValue: h('output', { class: 'raise-value' }, '0'),
    quick: h('div', { class: 'quick-sizes' }),
    raiseConfirm: h('button', { type: 'button', class: 'primary' }, 'Confirm'),
    raiseCancel: h('button', { type: 'button', class: 'ghost' }, 'Cancel'),
    toasts: h('div', { class: 'toasts', 'aria-live': 'polite' }),
    log: h('ol', { class: 'log', 'aria-live': 'polite' }),
    logPanel: h('aside', { class: 'log-panel', 'aria-label': 'Hand log' }),
    logToggle: h('button', { type: 'button', class: 'ghost small' }, 'Log'),
  }
  els.raiseRow.append(els.quick, els.slider, els.raiseValue, els.raiseConfirm, els.raiseCancel)
  els.logPanel.append(h('h2', null, 'Log'), els.log)
  // On a phone held sideways the log would sit on top of a seat, so there it
  // starts closed and opens as a drawer.
  const narrow = window.innerWidth < 900
  if (!settings.showLog || narrow) els.logPanel.classList.add('collapsed')

  const leave = h('button', { type: 'button', class: 'ghost small', onclick: () => go('/') }, '‹ Leave')
  root.append(
    h('div', { class: 'table-screen' },
      h('header', { class: 'table-bar' },
        leave,
        h('div', { class: 'where' },
          h('b', null, table.name),
          active.mode === 'open' ? h('span', { class: 'tag' }, 'open table') : null,
          ' · ', els.hand, ' · ', els.blinds),
        els.ff,
        els.logToggle),
      h('main', { class: 'felt', dataset: { table: table.id } },
        els.opponents,
        h('div', { class: 'dealer' }, els.dealerName, h('span', { class: 'dealer-role' }, 'deals'), els.dealerLine),
        h('section', { class: 'middle' },
          els.presence, els.board,
          h('div', { class: 'pot' }, els.potPile, h('span', { class: 'label' }, 'POT'), ' ', els.pot)),
        h('section', { class: 'you' },
          h('div', { class: 'you-info' }, els.youBlind, els.youName, els.youStack),
          els.youCards, els.youBet),
        h('section', { class: 'controls', 'aria-label': 'Your actions' }, els.prompt, els.buttons, els.raiseRow),
        els.narration,
        els.toasts,
        els.fx),
      els.logPanel),
  )
  els.logToggle.addEventListener('click', () => {
    els.logPanel.classList.toggle('collapsed')
    els.logPanel.scrollTop = els.logPanel.scrollHeight
    if (!narrow) store.update((s) => { s.settings.showLog = !els.logPanel.classList.contains('collapsed') })
  })

  // ------------------------------------------------------------ presentation queue

  type Step = { apply: () => void; delay: number; line?: boolean; cancelFF?: boolean }
  const queue: Step[] = []
  let draining = false
  let waiters: (() => void)[] = []
  let ff = false

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

  async function drain() {
    if (draining) return
    draining = true
    while (queue.length && alive) {
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

  function buildSeat(i: number) {
    const id = seatIds[i]!
    const c = CHARACTERS[id]
    const isChamp = table.champion === id || (table.kind === 'champions')
    const ui: SeatUI = {
      id,
      root: h('div', { class: `seat${isChamp ? ' champion' : ''}`, dataset: { id } }),
      name: h('span', { class: 'seat-name' }, c?.short ?? id),
      stack: h('span', { class: 'stack' }, '0'),
      cards: h('div', { class: 'cards' }),
      bet: betSpot(),
      blind: blindChip(),
      last: h('div', { class: 'last' }),
      tell: h('div', { class: 'tell' }),
      say: h('div', { class: 'say', role: 'status' }),
      tellUntil: 0,
    }
    ui.root.append(
      h('div', { class: 'seat-head' },
        ui.blind,
        ui.name,
        isChamp && table.kind === 'tour' ? h('span', { class: 'crown', title: 'Champion' }, '♛') : null,
        ui.stack),
      h('div', { class: 'hand-row' }, ui.cards, ui.bet),
      ui.last, ui.tell, ui.say)
    const old = seatUI.get(i)
    if (old) old.root.replaceWith(ui.root)
    else els.opponents.append(ui.root)
    seatUI.set(i, ui)
    return ui
  }

  for (let i = 1; i < seatIds.length; i++) buildSeat(i)
  if (table.presence && active.mode === 'tour' && table.arrival) els.presence.textContent = table.presence

  /** The stacks as drawn. Chips landing from a pot add to these until the engine's figure arrives. */
  let shownStacks: number[] = []
  /** Bumped on every authoritative redraw, so a late-landing pot cannot count twice. */
  let stackGen = 0

  function setStacks(stacks: number[]) {
    shownStacks = stacks.slice()
    stackGen++
    for (const [i, ui] of seatUI) ui.stack.textContent = formatChips(stacks[i] ?? 0)
    els.youStack.textContent = formatChips(stacks[HUMAN_SEAT] ?? 0)
  }

  function drawStack(seat: number) {
    const el = stackEl(seat)
    if (el) el.textContent = formatChips(shownStacks[seat] ?? 0)
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
    const to = centre(els.dealerName, felt())
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

  function log(text: string, cls = '') {
    const li = h('li', cls ? { class: cls } : null, text)
    els.log.append(li)
    els.logPanel.scrollTop = els.logPanel.scrollHeight
  }

  function clearWin() {
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
    els.youName.textContent = n ?? 'You'
    els.youName.classList.toggle('earned', !!n)
    els.youName.title = n ? `The table calls you ${n}` : 'The table does not address you'
  }

  function showTell(seat: number, text: string, real: boolean) {
    const ui = seatUI.get(seat)
    if (!ui) return
    ui.tell.textContent = `${nameOf(seat)} ${text}`
    ui.tell.classList.remove('fade')
    void ui.tell.offsetWidth
    ui.tell.classList.add('fade')
    if (real) ui.tellUntil = Date.now() + 2600
    if (!replaying) store.sawHabit(ui.id, text)
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

  function sayLine(b: Extract<Beat, { kind: 'line' }>) {
    const speaker = b.speaker
    const who = speaker === 'death' ? 'Death' : speaker === 'narration' ? '' : CHARACTERS[speaker]?.short ?? speaker
    const logText = speaker === 'narration' ? b.text.replace(/^\[|\]$/g, '') : b.stage ? `${who} ${b.text.replace(/^\[|\]$/g, '')}` : `${who}: “${b.text}”`
    step(() => {
      log(logText, `say${speaker === 'death' ? ' death' : ''}${b.stage ? ' stage' : ''}`)
      if (ff) return
      if (speaker === 'death') {
        els.dealerLine.textContent = `“${b.text}”`
        els.dealerLine.classList.remove('show')
        void els.dealerLine.offsetWidth
        els.dealerLine.classList.add('show')
      } else if (speaker === 'narration') {
        els.narration.textContent = b.text.replace(/^\[|\]$/g, '')
        els.narration.classList.remove('show')
        void els.narration.offsetWidth
        els.narration.classList.add('show')
      } else {
        const seat = seatIds.indexOf(speaker)
        const ui = seatUI.get(seat)
        if (ui) {
          ui.say.textContent = b.stage ? b.text.replace(/^\[|\]$/g, '') : `“${b.text}”`
          ui.say.classList.toggle('stage', b.stage)
          ui.say.classList.remove('show')
          void ui.say.offsetWidth
          ui.say.classList.add('show')
        } else {
          // Not seated (a watcher, or someone just knocked out): the room hears it.
          els.narration.textContent = b.stage ? `${who} ${b.text.replace(/^\[|\]$/g, '')}` : `${who}: “${b.text}”`
          els.narration.classList.remove('show')
          void els.narration.offsetWidth
          els.narration.classList.add('show')
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

  function presentBeat(b: Beat) {
    if (b.kind === 'line') return sayLine(b)
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
      out.delete(e.seat)
      buildSeat(e.seat)
      els.presence.textContent = ''
    } else if (e.type === 'eliminated') {
      out.add(e.seat)
      if (e.seat === HUMAN_SEAT) humanPlace = e.place
      seatUI.get(e.seat)?.root.classList.add('out')
      // Whatever blind they posted on the way out is not theirs any more.
      const blind = blindEl(e.seat)
      if (blind) blind.hidden = true
    } else if (e.type === 'level') {
      els.blinds.textContent = `blinds ${formatChips(e.smallBlind)}/${formatChips(e.bigBlind)}`
    }
  }

  function onEvent(e: HandEvent) {
    const beats = run.onEvent(e)
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
    present(e, false)
    for (const b of beats) presentBeat(b)
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
          const flight = move(MOVE.dealFlight)
          if (flight > 0) for (const backs of slots.values()) for (const b of backs) b.style.visibility = 'hidden'
          const from = centre(els.dealerName, felt())
          const lead = move(MOVE.shuffle)
          if (loud && !ff) sound.shuffle()
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
              void pushChips(stackEl(i), betEl(i), put, ms, i * ms * 0.25).then(() => drawBet(i))
              if (loud) sound.chips(chipCount(put, bigBlind), (i * ms * 0.25 + ms) / 1000)
            })
            setStacks(e.stacks)
            els.pot.textContent = formatChips(blinds.reduce((a, b) => a + b, 0))
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
        const act = e.decision.action
        const inFront = (chipsAt.handStart[e.seat] ?? 0) - (e.stacks[e.seat] ?? 0) - (chipsAt.swept[e.seat] ?? 0)
        const added = act === 'fold' || act === 'check' ? 0 : inFront - (chipsAt.bets[e.seat] ?? 0)
        if (added > 0) chipsAt.bets[e.seat] = inFront
        step(() => {
          for (const u of seatUI.values()) u.root.classList.remove('acting')
          if (ui) {
            ui.root.classList.add('acting')
            ui.last.textContent = describe(e.decision)
          }
          if (act === 'fold') {
            folded.add(e.seat)
            ui?.root.classList.add('folded')
            // Mucked cards are gone, not face-down: backs read as "still in".
            muckCards(e.seat, move(MOVE.muck))
            if (loud) sound.muck()
          } else if (act === 'check') {
            if (loud) sound.knock()
          } else if (added > 0) {
            shown.bets[e.seat] = inFront
            const ms = move(MOVE.chips)
            void pushChips(stackEl(e.seat), betEl(e.seat), added, ms).then(() => drawBet(e.seat))
            if (loud) {
              const allIn = e.stacks[e.seat] === 0
              sound.chips(chipCount(added, bigBlind) + (allIn ? 5 : 0), ms / 1000)
            }
          }
          setStacks(e.stacks)
          els.pot.textContent = formatChips(e.pot)
          log(`${nameOf(e.seat)} ${describe(e.decision, you)}`, you ? 'you' : '')
          if (you && act !== 'fold' && e.stacks[HUMAN_SEAT] === 0) humanAllIn = true
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
          step(() => dealBoard(cards), room(boardTime(cards.length) + MOVE.runout, BASE.street))
        }
        // Beat two, once per pot: light the five cards that won it, and push
        // the chips to whoever won them. A bet nobody could call goes back
        // first, and quietly: it was never won, so it is not called a pot.
        const real = e.pots.filter((p) => !p.returned)
        const ordered = [...e.pots.filter((p) => p.returned), ...real]
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
              void pushChips(els.potPile, stackEl(w), pot.amount, ms).then(() => {
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
              void pushChips(els.potPile, stackEl(w), share, ms, lead + k * ms * 0.2).then(() => {
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
          applyStructural(e)
          log(`${nameOf(e.seat)} ${e.seat === HUMAN_SEAT ? 'are' : 'is'} out (${ordinal(e.place)})`, 'big')
        }, t(BASE.result))
        break
      }
      case 'arrival': {
        step(() => {
          applyStructural(e)
          const ui = seatUI.get(e.seat)
          ui?.root.classList.add('arriving')
          if (ui) ui.stack.textContent = formatChips(e.stack)
          const who = CHARACTERS[e.id]?.short ?? e.id
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
      const from = centre(els.dealerName, felt())
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
    if (!alive || replaying || document.hidden) return
    for (const [i, ui] of seatUI) {
      if (out.has(i) || Date.now() < ui.tellUntil) continue
      const c = CHARACTERS[ui.id]
      if (!c) continue
      const vocab = [...c.idles, ...c.tells.map((t) => t.text)]
      if (!vocab.length || Math.random() > c.dials.noise * 0.3) continue
      showTell(i, vocab[Math.floor(Math.random() * vocab.length)], false)
      ui.tellUntil = Date.now() + 2200
    }
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
    els.raiseRow.hidden = true
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
      b.append(button('Fold', 'danger', 'f', () => endTurn({ action: 'fold', reason: 'human' })))
    }
    if (view.legal.includes('check')) {
      b.append(button('Check', '', 'c', () => endTurn({ action: 'check', reason: 'human' })))
    }
    if (view.legal.includes('call')) {
      const amount = Math.min(view.toCall, view.stack)
      const label = amount >= view.stack ? `Call all in (${formatChips(amount)})` : `Call ${formatChips(amount)}`
      b.append(button(label, 'primary', 'c', () => endTurn({ action: 'call', reason: 'human' })))
    }
    const raise: Action | null = view.legal.includes('raise') ? 'raise' : view.legal.includes('bet') ? 'bet' : null
    if (raise && view.maxRaise >= view.minRaise) {
      b.append(button(raise === 'bet' ? 'Bet…' : 'Raise…', '', 'r', () => openRaise(view, raise)))
    }
    els.raiseConfirm.onclick = () => {
      if (!raise) return
      endTurn({ action: raise, betSize: Number(els.slider.value), reason: 'human' })
    }
    els.raiseCancel.onclick = () => { els.raiseRow.hidden = true }

    turnStarted = performance.now()
    thinkingTimer = later(() => {
      const beat = run.thinkingLong()
      if (beat) presentBeat(beat)
    }, THINKING_LONG_MS)

    return new Promise<Decision>((resolve) => { resolveTurn = resolve })
  }

  function openRaise(view: TurnView, raise: Action) {
    els.raiseRow.hidden = false
    const s = els.slider
    s.min = String(view.minRaise)
    s.max = String(view.maxRaise)
    s.step = '1'
    const clamp = (v: number) => Math.min(view.maxRaise, Math.max(view.minRaise, Math.round(v)))
    // Sizes are "raise TO", as the engine takes them: call first, then add a
    // share of the pot as it would stand after the call.
    const to = (frac: number) =>
      clamp(raise === 'bet' ? view.pot * frac : view.toCall + frac * (view.pot + view.toCall))
    const sizes: [string, number][] = [['½ pot', to(0.5)], ['Pot', to(1)], ['All in', view.maxRaise]]
    s.value = String(to(0.6))
    const sync = () => {
      const v = Number(s.value)
      els.raiseValue.textContent = v >= view.maxRaise ? `${formatChips(v)} (all in)` : formatChips(v)
    }
    els.quick.replaceChildren(...sizes.map(([label, v]) =>
      h('button', { type: 'button', class: 'ghost small', onclick: () => { s.value = String(v); sync() } }, label)))
    s.oninput = sync
    sync()
    s.focus()
  }

  keyHandler = (ev: KeyboardEvent) => {
    if (!resolveTurn || ev.metaKey || ev.ctrlKey || ev.altKey) return
    if ((ev.target as HTMLElement)?.tagName === 'INPUT' && ev.key !== 'Enter' && ev.key !== 'Escape') return
    const k = ev.key.toLowerCase()
    if (k === 'enter' && !els.raiseRow.hidden) { els.raiseConfirm.click(); ev.preventDefault(); return }
    if (k === 'escape' && !els.raiseRow.hidden) { els.raiseRow.hidden = true; return }
    const btn = els.buttons.querySelector<HTMLButtonElement>(`button[data-key="${k}"]`)
    if (btn) { btn.click(); ev.preventDefault() }
  }
  window.addEventListener('keydown', keyHandler)

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
    while (!game.isComplete() && alive) {
      await game.playHand()
      if (!replaying) await settled()
      if (out.has(HUMAN_SEAT) || !alive) break
      if (!replaying) await sleep(450 * paceScale)
    }
    if (!alive) return
    if (replaying) finishReplay()
    await settled()
    finishTable()
  }

  function finishTable() {
    els.buttons.replaceChildren()
    els.raiseRow.hidden = true
    setFF(false)
    const won = game.survivors()[0] === HUMAN_SEAT && game.isComplete()
    const missed = game.missedArrivals()
    const { beats, facts } = run.finish(won, game.handCount(), missed)
    for (const b of beats) presentBeat(b)

    const outcome: TableOutcome = {
      table: table.id,
      mode: active!.mode,
      won,
      place: won ? 1 : humanPlace || game.getSeats().length,
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
    setResult({ outcome, effects: effects!, marks: newMarks, facts, name: run.earnedName() })
    els.prompt.textContent = won ? 'You hold every chip.' : 'You are out.'
    log(won ? 'You win the table.' : 'You are out.', 'big')
    void settled().then(() => {
      if (!alive) return
      els.buttons.replaceChildren(
        h('button', { type: 'button', class: 'primary', onclick: () => go('/results') }, 'Continue'))
    })
  }

  void main()

  return () => {
    alive = false
    clearInterval(ambient)
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
