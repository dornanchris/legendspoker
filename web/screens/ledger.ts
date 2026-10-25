import { CHARACTERS, MARKS, TABLES, TABLE_BY_ID, TOUR, DIALOGUE, ROSTER, GUESTS, fullCast, type CharacterData, type TableData } from '../../src/content.js'
import { tableState, isVisible, earnedName, beatenCount } from '../../src/tour.js'
import { RANKINGS } from '../../src/game.js'
import type { CharacterRecord } from '../../src/save.js'
import type { Card } from '../../src/equity.js'
import * as store from '../store.js'
import { h, go, formatDate, formatChips, ordinal } from '../dom.js'
import { header, pronoun, face, portraitUrl, avatarChoices, avatarPuppet, avatarPuppetOf } from './shared.js'
import { colourPicker } from './settings.js'
import { cardEl } from './table.js'
import { text } from './map.js'
import { markArt } from './mark-art.js'

/**
 * THE LEDGER -- Death's record of the Invitational, and the game's notebook.
 *
 * BUILD-PLAN screen 7, and screen 12 folded into it: the design doc wants
 * achievements framed in-world, "not a trophy cabinet", so they are entries
 * in this book. It is also where three designed systems become visible --
 * the per-table respect tier, the earned names, and who you have beaten
 * (the future avatar unlocks). Without it, the Odysseus skip reads as a bug.
 *
 * Spoilers are handled by what the page is allowed to know: late arrivals
 * stay out of the book until they have sat down, sealed tables keep their
 * guests to themselves, and the finale is not listed until it is open. A
 * guest nobody invited, and a secret mark, are not in the book at all --
 * not even as a blank or in a count -- until they have happened.
 */

type Tab = 'invited' | 'tour' | 'marks' | 'account' | 'rules'
const TABS: [Tab, string][] = [
  ['invited', 'The Invited'],
  ['tour', 'The Tour'],
  ['marks', 'Marks'],
  ['account', 'Your Account'],
  ['rules', 'House Rules'],
]

type Visibility = 'hidden' | 'unmet' | 'met' | 'beaten'

function visibility(c: CharacterData): Visibility {
  const save = store.get()
  const rec = save.characters[c.id]
  if (rec?.beaten) return 'beaten'
  if (rec?.met) return 'met'
  if (c.role === 'dealer') return 'met' // he has dealt every hand you have played
  // Nobody invited him, so until he sits down there is nothing to show.
  if (c.role === 'guest' || c.table === null) return 'hidden'
  const state = tableState(save, c.table)
  if (c.arrives) {
    // A late champion's existence is the surprise. The exception is a missed
    // one: once you clear their table without them, their absence is the
    // point, and the book shows it.
    return state === 'cleared' ? 'unmet' : 'hidden'
  }
  return state === 'sealed' ? 'hidden' : 'unmet'
}

export function ledgerScreen(root: HTMLElement, params: string[]): () => void {
  const save = store.get()
  if (!save.player) { go('/invite'); return () => {} }
  const tab = (TABS.some(([t]) => t === params[0]) ? params[0] : 'invited') as Tab
  const id = params[1]

  const nav = h('nav', { class: 'ledger-tabs', role: 'tablist' },
    TABS.map(([t, label]) => h('button', {
      type: 'button', role: 'tab', class: t === tab ? 'on' : '', 'aria-selected': String(t === tab),
      onclick: () => go(`/ledger/${t}`),
    }, label)))

  const book = h('div', { class: `ledger-book tab-${tab}` })
  let done: (() => void) | void = undefined
  if (tab === 'invited') done = invited(book, id)
  else if (tab === 'tour') done = tourTab(book, id)
  else if (tab === 'marks') marksTab(book, id)
  else if (tab === 'account') account(book)
  else rules(book)

  root.append(h('div', { class: 'screen ledger-screen' },
    header('The Ledger', '/', h('span', { class: 'ledger-sub' }, 'Death’s record of the Invitational')),
    nav, book))
  return () => { if (done) done() }
}

// ---------------------------------------------------------------- one entry at a time

/** Fills one entry's two halves: its picture and title, and what it says. */
type Spread = (side: HTMLElement, body: HTMLElement, id: string) => string | void

type Viewer = { el: HTMLElement; open: (id: string) => void; cleanup: () => void }

/**
 * An entry over the whole screen (the owner: the ledger was "small and hard to
 * read"), chosen from the sea of faces, rooms or marks under it and then turned
 * left and right without going back: a swipe, the arrows at its sides, the
 * arrow keys. Its picture and title on the left, what it says on the right,
 * scrolling on its own. The address follows (#/ledger/<tab>/<id>), so an entry
 * can be linked to and the back button closes it. `spread` may return a class
 * for the card (a mark's state).
 */
function viewer(tab: string, ids: string[], kind: string, spread: Spread): Viewer {
  let at = -1
  const side = h('div', { class: 'lv-side' })
  const body = h('div', { class: 'lv-body' })
  const card = h('article', { class: `lv-card lv-${kind}` }, side, body)
  const where = h('span', { class: 'lv-where' })
  const prev = h('button', { type: 'button', class: 'lv-turn prev', 'aria-label': 'Previous', onclick: () => show(at - 1) }, '‹')
  const next = h('button', { type: 'button', class: 'lv-turn next', 'aria-label': 'Next', onclick: () => show(at + 1) }, '›')
  const shut = h('button', { type: 'button', class: 'ghost small lv-close', 'aria-label': 'Close', onclick: () => close() }, '✕ Close')
  const el = h('div', { class: 'leaf-view', hidden: true, role: 'dialog', 'aria-modal': 'true' },
    h('div', { class: 'lv-top' }, where, shut), prev, card, next)
  el.addEventListener('click', (e) => { if (e.target === el) close() })

  function show(i: number) {
    if (i < 0 || i >= ids.length || i === at) return
    const dir = at < 0 ? '' : i > at ? 'from-right' : 'from-left'
    at = i
    side.replaceChildren()
    body.replaceChildren()
    card.className = `lv-card lv-${kind} ${spread(side, body, ids[at]) ?? ''}`
    body.scrollTop = 0
    side.scrollTop = 0
    if (dir) { void card.offsetWidth; card.classList.add(dir) }
    prev.disabled = at === 0
    next.disabled = at === ids.length - 1
    where.textContent = `${at + 1} of ${ids.length}`
    history.replaceState(null, '', `#/ledger/${tab}/${encodeURIComponent(ids[at])}`)
  }
  function open(id: string) {
    const i = ids.indexOf(id)
    if (i < 0) return
    el.hidden = false
    show(i)
    shut.focus()
  }
  function close() {
    el.hidden = true
    at = -1
    history.replaceState(null, '', `#/ledger/${tab}`)
  }

  // a swipe: mostly sideways and far enough; up and down still scroll the page
  let x0 = 0, y0 = 0, down = false
  card.addEventListener('pointerdown', (e) => { down = true; x0 = e.clientX; y0 = e.clientY })
  card.addEventListener('pointerup', (e) => {
    if (!down) return
    down = false
    const dx = e.clientX - x0, dy = e.clientY - y0
    if (Math.abs(dx) > 50 && Math.abs(dx) > 1.6 * Math.abs(dy)) show(at + (dx < 0 ? 1 : -1))
  })
  card.addEventListener('pointercancel', () => { down = false })
  const key = (e: KeyboardEvent) => {
    if (el.hidden) return
    if (e.key === 'ArrowRight') show(at + 1)
    else if (e.key === 'ArrowLeft') show(at - 1)
    else if (e.key === 'Escape') { e.stopPropagation(); close() }
  }
  window.addEventListener('keydown', key)
  return { el, open, cleanup: () => window.removeEventListener('keydown', key) }
}

// ---------------------------------------------------------------- the invited

function invited(book: HTMLElement, selected?: string): () => void {
  const save = store.get()
  const groups: { title: string; numeral?: string; ids: string[] }[] = TOUR.map((t) => ({ title: t.name, numeral: String(t.position), ids: fullCast(t) }))
  groups.push({ title: 'The dealer', ids: ['death'] })
  // No heading, no "unknown" row, nothing, until one of them has been met.
  const guests = GUESTS.map((c) => c.id).filter((id) => visibility(CHARACTERS[id]) !== 'hidden')
  if (guests.length) groups.push({ title: 'Uninvited', ids: guests })

  const order = groups.flatMap((g) => g.ids).filter((id) => visibility(CHARACTERS[id]) !== 'hidden')
  const view = viewer('invited', order, 'person', (side, body, id) => characterPage(side, body, CHARACTERS[id]))

  // Everyone at once, by table: a face to touch for each, a blank for a
  // chair at a sealed table. A late arrival is not even a blank until met.
  const sea = h('div', { class: 'sea' }, groups.map((g) => {
    const faces = g.ids.flatMap((id) => {
      const c = CHARACTERS[id]
      const v = visibility(c)
      if (v === 'hidden') return c.arrives ? [] : [h('li', { class: 'sea-face hidden' }, face(c, 'hidden'), h('span', null, 'Unknown'))]
      return [h('li', { class: `sea-face ${v}` }, h('button', { type: 'button', class: 'plain', onclick: () => view.open(id) },
        face(c, v), h('span', null, c.short)))]
    })
    return h('section', { class: 'sea-group' },
      h('h3', null, g.numeral ? h('span', { class: 'numeral' }, g.numeral) : null, g.title),
      h('ul', { class: 'sea-faces' }, faces))
  }))
  book.append(h('p', { class: 'sea-count' }, `${beatenCount(save)} of ${ROSTER.length} beaten. Touch a face to read their page.`), sea, view.el)
  if (selected) view.open(selected)
  return view.cleanup
}

function characterPage(side: HTMLElement, page: HTMLElement, c: CharacterData) {
  const save = store.get()
  const rec = save.characters[c.id]
  const v = visibility(c)
  const table = c.table ? TABLE_BY_ID[c.table] : undefined
  const p = c.profile
  const role = c.role === 'dealer' ? 'The dealer' : c.role === 'champion' ? 'Champion' : c.role === 'guest' ? 'Uninvited' : 'Seated'
  const tableName = c.role === 'dealer' ? 'Every table' : c.role === 'guest' ? 'Not on the tour' : table?.name ?? ''

  side.append(
    h('div', { class: `page-face ${v}` }, face(c, v === 'hidden' ? 'hidden' : v)),
    h('h2', null, c.name),
    ...(text(c.epithet) ? [h('p', { class: 'epithet' }, c.epithet)] : []),
    h('p', { class: 'meta' }, `${role} · ${tableName}`),
    h('p', { class: 'meta dim' }, [c.origin, c.era].filter(Boolean).join(' · ')),
  )

  let status: string
  if (v === 'beaten') status = `Beaten ${formatDate(rec?.beaten)}.`
  else if (c.role === 'dealer') status = 'Has dealt every hand you have played.'
  else if (v === 'met') status = `Met ${formatDate(rec?.met)}. Not yet beaten.`
  else if (c.arrives && c.table && tableState(save, c.table) === 'cleared') {
    const obj = c.pronoun === 'she' ? 'her' : c.pronoun === 'it' ? 'it' : c.pronoun === 'they' ? 'them' : 'him'
    status = `Never sat down: the table was over before ${pronoun(c)} arrived. Play it again to meet ${obj}.`
  }
  else status = 'You have not sat with them yet.'
  side.append(h('p', { class: `status ${v}` }, status))

  if (text(p.ledger)) page.append(h('blockquote', { class: 'ledger-entry' }, text(p.ledger)))
  if (v === 'beaten' && text(p.ledger_beaten)) page.append(h('blockquote', { class: 'ledger-entry beaten' }, text(p.ledger_beaten)))

  const history = p.history.map(text).filter(Boolean)
  if (history.length) page.append(h('h3', null, 'Who they were'), ...history.map((para) => h('p', null, para)))

  if ((v === 'met' || v === 'beaten') && text(p.at_the_table)) {
    page.append(h('h3', null, 'At the table'), h('p', null, text(p.at_the_table)))
  }

  if (rec && rec.hands > 0 && c.role !== 'dealer') {
    page.append(h('h3', null, 'What you have seen'))
    const words = tendencies(rec, c)
    page.append(h('p', { class: 'dim' },
      `${rec.hands} hand${rec.hands === 1 ? '' : 's'} at a table together` +
      (rec.showdowns ? `; ${pronoun(c)} has shown down ${rec.showdowns} in front of you.` : '.')))
    if (words.length) page.append(h('ul', { class: 'tendencies' }, words.map((w) => h('li', null, w))))
    else page.append(h('p', { class: 'dim' }, 'Too few hands to say anything useful yet.'))
    if (rec.habits.length) {
      page.append(h('p', { class: 'habits-label' }, 'Habits noted — what they mean, if anything, is for you to work out:'),
        h('ul', { class: 'habits' }, rec.habits.map((t) => h('li', null, t))))
    }
    const ko: string[] = []
    if (rec.youKnockedOut) ko.push(`You have knocked ${c.pronoun === 'she' ? 'her' : c.pronoun === 'it' ? 'it' : 'him'} out ${rec.youKnockedOut} time${rec.youKnockedOut === 1 ? '' : 's'}.`)
    if (rec.knockedYouOut) ko.push(`${pronoun(c, true)} has knocked you out ${rec.knockedYouOut} time${rec.knockedYouOut === 1 ? '' : 's'}.`)
    if (ko.length) page.append(h('p', null, ko.join(' ')))
  }
}

/**
 * Turns what the player has watched into plain words. Thresholds only -- no
 * percentages on screen: the ledger is a notebook, not a poker tracker, and
 * reading people is supposed to stay the player's job.
 */
function tendencies(r: CharacterRecord, c: CharacterData): string[] {
  if (r.hands < 15) return []
  const P = pronoun(c, true)
  const s = c.pronoun === 'they' ? '' : 's'
  const out: string[] = []
  const vpip = r.vpip / r.hands
  if (vpip < 0.2) out.push(`${P} play${s} very few hands.`)
  else if (vpip < 0.35) out.push(`${P} choose${s} hands carefully.`)
  else if (vpip < 0.55) out.push(`${P} play${s} a good many hands.`)
  else out.push(`${P} play${s} almost every hand.`)
  if (r.bets + r.calls >= 10) {
    const af = r.bets / Math.max(1, r.calls)
    if (af < 0.7) out.push(`${P} call${s} far more often than ${c.pronoun === 'they' ? 'they raise' : pronoun(c) + ' raises'}.`)
    else if (af < 1.6) out.push(`${P} mix${c.pronoun === 'they' ? '' : 'es'} calls and raises.`)
    else out.push(`${P} raise${s} far more often than ${c.pronoun === 'they' ? 'they call' : pronoun(c) + ' calls'}.`)
  }
  if (r.faced >= 10) {
    const f = r.foldsToBet / r.faced
    if (f > 0.6) out.push(`${P} give${s} up when pushed.`)
    else if (f < 0.3) out.push(`${P} ${c.pronoun === 'they' ? 'are' : 'is'} hard to push off a hand.`)
    else out.push(`${P} fold${s} to pressure about as often as not.`)
  }
  return out
}

// ---------------------------------------------------------------- the tour

function tourTab(book: HTMLElement, selected?: string): () => void {
  const save = store.get()
  const visible = TABLES.filter((t) => isVisible(save, t.id))
  const view = viewer('tour', visible.map((t) => t.id), 'venue', (side, body, id) => venuePage(side, body, TABLE_BY_ID[id]))
  // every table open to the book, as its painted room: touch one to read it
  const sea = h('ul', { class: 'sea-rooms' }, visible.map((t) => {
    const st = tableState(save, t.id)
    const veiled = st === 'sealed' && t.kind !== 'tour'
    const mark = t.kind === 'tour' ? String(t.position) : t.kind === 'finale' ? '✦' : t.kind === 'hidden' ? '☼' : '◆'
    return h('li', null, h('button', { type: 'button', class: `sea-room ${st}${veiled ? ' veiled' : ''}`, onclick: () => view.open(t.id) },
      h('span', { class: 'sea-room-img', style: `background-image:url(${roomImage(t.id)})` }),
      h('span', { class: 'sea-room-label' },
        h('span', { class: 'numeral' }, mark),
        h('b', null, veiled ? 'Sealed' : t.name),
        h('small', null, veiled ? 'Beyond the tour' : st === 'cleared' ? 'Cleared' : st === 'open' ? 'Open' : 'Sealed'))))
  }))
  book.append(h('p', { class: 'sea-count' }, `${TOUR.filter((t) => save.tables[t.id]?.cleared).length} of ${TOUR.length} tables cleared. Touch a room to read about it.`), sea, view.el)
  if (selected && isVisible(save, selected)) view.open(selected)
  return view.cleanup
}

/** A table's painted room (web/art/rooms/<id>/backdrop.webp): every table has one. */
const roomImage = (id: string) => `art/rooms/${id}/backdrop.webp`

function venuePage(side: HTMLElement, page: HTMLElement, t: TableData) {
  const save = store.get()
  const st = tableState(save, t.id)
  const rec = save.tables[t.id]
  const sealedBeyond = st === 'sealed' && t.kind !== 'tour'
  side.append(
    h('div', { class: `venue-plate ${st}${sealedBeyond ? ' veiled' : ''}`, style: `background-image:url(${roomImage(t.id)})`, role: 'img', 'aria-label': sealedBeyond ? 'A sealed room' : `The room at ${t.name}` }),
    h('p', { class: 'kicker' }, t.kind === 'tour' ? `Table ${t.position} of 8` : t.kind === 'champions' ? 'Beyond the tour' : t.kind === 'hidden' ? 'Off the map' : 'The end of the line'),
    h('h2', null, sealedBeyond ? 'Sealed' : t.name),
    ...(sealedBeyond ? [] : [h('p', { class: 'meta' }, [text(t.place), text(t.region)].filter(Boolean).join(' · '))]),
    ...(text(t.era) && !sealedBeyond ? [h('p', { class: 'meta dim' }, text(t.era))] : []),
    h('p', { class: `status ${st}` },
      st === 'cleared' ? `Cleared ${formatDate(rec?.firstClearedAt)}.` : st === 'open' ? 'Open. A chair is waiting.' : 'Sealed. Clear the table before it.'),
  )
  if (sealedBeyond) { page.append(h('p', { class: 'dim' }, 'Nothing is written here yet. Clear the tables before it.')); return }
  if (text(t.room)) page.append(h('h3', null, 'The room'), h('p', null, text(t.room)))
  if (st !== 'sealed' && text(t.hook)) page.append(h('h3', null, 'Why you are here'), h('p', null, text(t.hook)))

  const cast = fullCast(t)
  page.append(h('h3', null, 'At this table'),
    h('ul', { class: 'cast-row' }, cast.map((id) => {
      const c = CHARACTERS[id]
      const v = visibility(c)
      return h('li', { class: v },
        h('button', { type: 'button', class: 'plain', disabled: v === 'hidden', onclick: () => go(`/ledger/invited/${id}`) },
          face(c, v === 'hidden' ? 'hidden' : v),
          h('span', null, v === 'hidden' ? (c.arrives ? 'An empty chair' : 'Unknown') : c.short)))
    })))

  if (rec && (rec.attempts || rec.respectTier)) {
    const called = earnedName(rec.respectTier, DIALOGUE[t.id]?.earned_names, save.player!.name)
    const rows: [string, string][] = [
      ['Sittings', String(rec.attempts)],
      ['Won', String(rec.wins)],
      ['Best finish', rec.bestPlace ? ordinal(rec.bestPlace) : '—'],
      ['Fastest win', rec.fastestWin ? `${rec.fastestWin} hands` : '—'],
      ['They call you', called ?? 'nothing at all'],
    ]
    page.append(h('h3', null, 'Your record here'),
      h('dl', { class: 'record' }, rows.flatMap(([k, v]) => [h('dt', null, k), h('dd', null, v)])))
  }
}

// ---------------------------------------------------------------- marks

function marksTab(book: HTMLElement, selected?: string) {
  const save = store.get()
  // A secret mark is not in the book, or in its total, until it is written.
  const listed = MARKS.filter((m) => !m.secret || save.marks[m.id])
  const earned = listed.filter((m) => save.marks[m.id])
  const detail = h('div', { class: 'mark-detail', hidden: true, role: 'dialog', 'aria-modal': 'true' })
  const close = () => { detail.hidden = true; history.replaceState(null, '', '#/ledger/marks') }
  detail.addEventListener('click', (e) => { if (e.target === detail) close() })

  // A mark is an entry to open (the owner: clickable achievements): its seal
  // on the grid, and what it says, when and where, on a card.
  function open(id: string) {
    const m = MARKS.find((x) => x.id === id)
    if (!m || (m.secret && !save.marks[m.id])) return
    const e = save.marks[m.id]
    const where = e?.table ? TABLE_BY_ID[e.table]?.name : null
    const hidden = !e && m.hidden
    detail.replaceChildren(h('div', { class: `mark-card ${e ? 'earned' : hidden ? 'hidden' : 'open'}` },
      h('button', { type: 'button', class: 'ghost small mark-close', 'aria-label': 'Close', onclick: close }, '✕'),
      markArt(m, e ? 'earned' : hidden ? 'hidden' : 'open'),
      h('h3', null, hidden ? '— — —' : m.title),
      h('p', { class: 'mark-text' }, e ? m.text : hidden ? 'An entry not yet written.' : m.hint),
      e ? h('p', { class: 'mark-when' }, 'Entered ' + [formatDate(e.at), where].filter(Boolean).join(' · '))
        : h('p', { class: 'mark-when' }, 'Not yet written.')))
    detail.hidden = false
    history.replaceState(null, '', `#/ledger/marks/${encodeURIComponent(id)}`)
    detail.querySelector<HTMLElement>('.mark-close')?.focus()
  }

  const page = h('article', { class: 'ledger-page wide marks-page' },
    h('header', { class: 'page-head' }, h('div', null,
      h('h2', null, 'Marks'),
      h('p', { class: 'meta' }, `${earned.length} ${earned.length === 1 ? 'entry' : 'entries'} written of ${listed.length}.`),
      h('p', { class: 'dim' }, 'What Death saw fit to write down about you. Not a trophy cabinet: a record. Touch one to read it.'))),
    // the ones written first: what you have earned leads, what is still to come follows
    h('ol', { class: 'marks-grid' }, [...earned, ...listed.filter((m) => !save.marks[m.id])].map((m) => {
      const e = save.marks[m.id]
      const hidden = !e && m.hidden
      return h('li', null, h('button', {
        type: 'button', class: `mark-tile ${e ? 'earned' : hidden ? 'hidden' : 'open'}`, onclick: () => open(m.id),
      }, markArt(m, e ? 'earned' : hidden ? 'hidden' : 'open'), h('span', { class: 'mark-name' }, hidden ? '— — —' : m.title)))
    })))
  book.append(page, detail)
  if (selected) open(selected)
}

// ---------------------------------------------------------------- account

function account(book: HTMLElement) {
  const save = store.get()
  const r = save.record
  const hours = Math.floor(r.secondsPlayed / 3600)
  const mins = Math.round((r.secondsPlayed % 3600) / 60)
  const rows: [string, string][] = [
    ['Hands played', formatChips(r.hands)],
    ['Pots won', formatChips(r.potsWon)],
    ['Showdowns won', formatChips(r.showdownsWon)],
    ['Biggest pot', formatChips(r.biggestPot)],
    ['Players knocked out', formatChips(r.knockouts)],
    ['All-ins won', formatChips(r.allInsWon)],
    ['Tables won', formatChips(r.tablesWon)],
    ['Tables lost', formatChips(r.tablesLost)],
    ['Time at the table', hours ? `${hours}h ${mins}m` : `${mins}m`],
  ]
  if (isVisible(save, 'finale')) rows.push(['Against the dealer', `${r.deathWins} won, ${r.deathLosses} lost`])

  const echoes = h('ol', { class: 'echoes', 'aria-label': 'Echoes of your journey' },
    TOUR.map((t) => h('li', { class: tableState(save, t.id) }, h('span', null, t.name))))

  const best = r.bestHand
  book.append(h('article', { class: 'ledger-page wide' },
    h('header', { class: 'page-head' }, h('div', null,
      h('h2', null, save.player!.name),
      h('p', { class: 'meta' }, `Signed the invitation ${formatDate(save.player!.invitedAt)}.`))),
    h('h3', null, 'Your figure'), figurePicker(),
    h('h3', null, 'Echoes of your journey'), echoes,
    h('h3', null, 'The account'),
    h('dl', { class: 'record' }, rows.flatMap(([k, v]) => [h('dt', null, k), h('dd', null, v)])),
    best ? h('div', { class: 'best-hand' },
      h('h3', null, 'Best hand shown down'),
      h('p', null, `${cap(RANKINGS[best.rank])}${TABLE_BY_ID[best.table] ? `, at ${TABLE_BY_ID[best.table].name}` : ''}.`),
      h('div', { class: 'cards-row' }, best.cards.map((c: Card) => cardEl(c, 'small')))) : null,
  ))
}

/**
 * Who the player sits as where they are seen (a heads-up table, the last one):
 * the Stranger, or anyone they have beaten (the design doc: avatars are won by
 * beating them). The Stranger wears the player's colour.
 */
function figurePicker(): HTMLElement {
  const choices = avatarChoices()
  const name = (id: string) => (id === 'stranger' ? 'The Stranger' : CHARACTERS[id]?.short ?? id)
  const colour = h('div', { class: 'figure-colour' },
    h('p', { class: 'dim' }, 'The Stranger’s scarf, hat band and cuffs:'), colourPicker())
  const row = h('ul', { class: 'figure-row', role: 'radiogroup', 'aria-label': 'Your figure' })
  const draw = () => {
    const now = avatarPuppet()
    colour.hidden = now !== 'stranger'
    row.replaceChildren(...choices.map((id) => {
      const on = avatarPuppetOf(id) === now
      const url = portraitUrl(avatarPuppetOf(id), false)
      return h('li', null, h('button', {
        type: 'button', role: 'radio', 'aria-checked': String(on), class: `plain figure${on ? ' on' : ''}`,
        onclick: () => { store.update((x) => { x.settings.avatar = id }); draw() },
      }, h('span', { class: 'portrait', style: url ? `background-image:url(${url})` : '' }), h('span', null, name(id))))
    }))
  }
  draw()
  return h('div', { class: 'figure-picker' },
    h('p', { class: 'dim' }, choices.length > 1
      ? 'Where you are seen, across a heads-up table and at the last one, you sit as this.'
      : 'Where you are seen, across a heads-up table and at the last one, you sit as the Stranger. Beat someone to sit as them.'),
    row, colour)
}

const cap = (s: string) => s.replace(/^a /, '').replace(/^./, (m) => m.toUpperCase())

// ---------------------------------------------------------------- house rules

const EXAMPLES: [string, string, Card[]][] = [
  ['Royal flush', 'A, K, Q, J, 10, all one suit.', cards('As Ks Qs Js Ts')],
  ['Straight flush', 'Five in a row, one suit.', cards('9h 8h 7h 6h 5h')],
  ['Four of a kind', 'Four cards of one rank.', cards('Qc Qd Qh Qs 4d')],
  ['Full house', 'Three of one rank and two of another.', cards('Kc Kd Kh 7s 7d')],
  ['Flush', 'Any five of one suit.', cards('Ad Jd 8d 5d 3d')],
  ['Straight', 'Five in a row, any suits.', cards('Tc 9d 8s 7h 6c')],
  ['Three of a kind', 'Three cards of one rank.', cards('8c 8d 8h Ks 2d')],
  ['Two pair', 'Two different pairs.', cards('Ac Ad 8c 8s 5h')],
  ['A pair', 'Two cards of one rank.', cards('Jc Jd 9s 6h 3c')],
  ['High card', 'Nothing else; the highest card plays.', cards('Ah Js 8d 6c 2s')],
]

function cards(s: string): Card[] {
  const SUITS = { c: 'clubs', d: 'diamonds', h: 'hearts', s: 'spades' } as const
  return s.split(' ').map((x) => ({ rank: x[0] as Card['rank'], suit: SUITS[x[1] as 'c'] }))
}

function rules(book: HTMLElement) {
  book.append(h('article', { class: 'ledger-page wide rules' },
    h('header', { class: 'page-head' }, h('div', null,
      h('h2', null, 'House Rules'),
      h('p', { class: 'meta' }, 'Texas Hold’em, the way the Invitational plays it.'))),
    h('h3', null, 'The game'),
    h('p', null, 'Every table is an elimination tournament. Everyone sits down with the same chips. The blinds climb as the hands go by and never come back down, so nobody can wait forever. A table is won when you hold every chip at it. Lose, and the chair will still be there when you come back: there is no permanent loss at the Invitational.'),
    h('p', null, 'Some champions are not at the table when it opens. Some arrive when a chair empties. One is simply late.'),
    h('h3', null, 'Respect'),
    h('p', null, 'The legends do not think much of you, at first. Win pots worth winning, win when your cards are turned over, and put players out, and the table will start to call you something. First something unflattering. Then your name. Then, if you earn it, a title. Each table keeps its own opinion of you, and remembers it.'),
    h('h3', null, 'Reading people'),
    h('p', null, 'Everyone at the table fidgets. Most of it means nothing at all. Some of it, sometimes, means something — but only while that player actually has a hand to play, and never the same thing every time. Nobody here can be read from one gesture. Later tables fidget more, and hide more in it.'),
    h('p', null, 'When cards are shown down, look at what people were holding. It is the one moment the table tells you the truth about how someone plays.'),
    h('h3', null, 'The ledger'),
    h('p', null, 'Death keeps a book. Everyone you meet has a page in it, with what you have seen them do. Everyone you beat is closed in it. When something you do is worth remembering, he writes that down too.'),
    h('h3', null, 'Hand rankings, best first'),
    h('ol', { class: 'rankings' }, EXAMPLES.map(([name, desc, c]) =>
      h('li', null, h('div', { class: 'cards-row' }, c.map((x) => cardEl(x, 'tiny'))), h('b', null, name), h('span', null, desc)))),
    h('h3', null, 'At the table'),
    h('ul', { class: 'plain-list' },
      h('li', null, h('b', null, 'F'), ' fold · ', h('b', null, 'C'), ' check or call · ', h('b', null, 'R'), ' bet or raise · ', h('b', null, 'Enter'), ' confirm · ', h('b', null, 'Esc'), ' cancel.'),
      h('li', null, 'Fast-forward appears once you are out of a hand. It speeds up how the hand is shown, never how it plays, and it stops by itself when cards are turned over.'),
      h('li', null, 'Leaving a table keeps your seat. Return to it from the title screen, exactly where you left it.'),
      h('li', null, 'The log records every action and every word said, if you would rather read than watch.')),
  ))
}
