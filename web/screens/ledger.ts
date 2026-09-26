import { CHARACTERS, MARKS, TABLES, TABLE_BY_ID, TOUR, DIALOGUE, ROSTER, GUESTS, fullCast, type CharacterData, type TableData } from '../../src/content.js'
import { tableState, isVisible, earnedName, beatenCount } from '../../src/tour.js'
import { RANKINGS } from '../../src/game.js'
import type { CharacterRecord } from '../../src/save.js'
import type { Card } from '../../src/equity.js'
import * as store from '../store.js'
import { h, go, formatDate, formatChips, ordinal } from '../dom.js'
import { header, medallion, pronoun } from './shared.js'
import { cardEl } from './table.js'
import { text } from './map.js'

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

export function ledgerScreen(root: HTMLElement, params: string[]): void {
  const save = store.get()
  if (!save.player) { go('/invite'); return }
  const tab = (TABS.some(([t]) => t === params[0]) ? params[0] : 'invited') as Tab
  const id = params[1]

  const nav = h('nav', { class: 'ledger-tabs', role: 'tablist' },
    TABS.map(([t, label]) => h('button', {
      type: 'button', role: 'tab', class: t === tab ? 'on' : '', 'aria-selected': String(t === tab),
      onclick: () => go(`/ledger/${t}`),
    }, label)))

  const book = h('div', { class: 'ledger-book' })
  if (tab === 'invited') invited(book, id)
  else if (tab === 'tour') tourTab(book, id)
  else if (tab === 'marks') marksTab(book)
  else if (tab === 'account') account(book)
  else rules(book)

  root.append(h('div', { class: 'screen ledger-screen' },
    header('The Ledger', '/', h('span', { class: 'ledger-sub' }, 'Death’s record of the Invitational')),
    nav, book))
}

// ---------------------------------------------------------------- the invited

function invited(book: HTMLElement, selected?: string) {
  const save = store.get()
  const groups: { table: TableData | null; title?: string; ids: string[] }[] = TOUR.map((t) => ({ table: t, ids: fullCast(t) }))
  groups.push({ table: null, ids: ['death'] })
  // No heading, no "unknown" row, nothing, until one of them has been met.
  const guests = GUESTS.map((c) => c.id).filter((id) => visibility(CHARACTERS[id]) !== 'hidden')
  if (guests.length) groups.push({ table: null, title: 'Uninvited', ids: guests })

  const firstVisible = groups.flatMap((g) => g.ids).find((id) => visibility(CHARACTERS[id]) !== 'hidden')
  const current = selected && CHARACTERS[selected] && visibility(CHARACTERS[selected]) !== 'hidden'
    ? selected : firstVisible

  const index = h('aside', { class: 'ledger-index' },
    h('p', { class: 'count' }, `${beatenCount(save)} of ${ROSTER.length} beaten`),
    groups.map((g) => {
      const sealed = g.table ? tableState(save, g.table.id) === 'sealed' : false
      const shown = g.ids.filter((id) => visibility(CHARACTERS[id]) !== 'hidden')
      return h('section', { class: 'index-group' },
        h('h4', null, g.title ?? (g.table ? (sealed ? 'A sealed table' : g.table.name) : 'The House')),
        h('ul', null,
          shown.map((id) => {
            const c = CHARACTERS[id]
            const v = visibility(c)
            return h('li', null, h('button', {
              type: 'button', class: `index-entry ${v}${id === current ? ' on' : ''}`,
              onclick: () => go(`/ledger/invited/${id}`),
            }, medallion(c, v === 'hidden' ? 'hidden' : v), h('span', null, c.short),
              v === 'beaten' ? h('span', { class: 'tick', title: 'Beaten' }, '✓') : null))
          }),
          // Only the chairs that are there from the start: counting a late
          // arrival would give the arrival away.
          sealed ? h('li', { class: 'more' }, `${g.table!.seats.length} unknown`) : null))
    }))

  const page = h('article', { class: 'ledger-page' })
  if (current) characterPage(page, CHARACTERS[current])
  book.append(index, page)
}

function characterPage(page: HTMLElement, c: CharacterData) {
  const save = store.get()
  const rec = save.characters[c.id]
  const v = visibility(c)
  const table = c.table ? TABLE_BY_ID[c.table] : undefined
  const p = c.profile
  const role = c.role === 'dealer' ? 'The dealer' : c.role === 'champion' ? 'Champion' : c.role === 'guest' ? 'Uninvited' : 'Seated'
  const tableName = c.role === 'dealer' ? 'Every table' : c.role === 'guest' ? 'Not on the tour' : table?.name ?? ''

  page.append(
    h('header', { class: 'page-head' },
      medallion(c, v === 'hidden' ? 'hidden' : v),
      h('div', null,
        h('h2', null, c.name),
        text(c.epithet) ? h('p', { class: 'epithet' }, c.epithet) : null,
        h('p', { class: 'meta' }, `${role} · ${tableName}`),
        h('p', { class: 'meta dim' }, [c.origin, c.era].filter(Boolean).join(' · ')))),
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
  page.append(h('p', { class: `status ${v}` }, status))

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

function tourTab(book: HTMLElement, selected?: string) {
  const save = store.get()
  const visible = TABLES.filter((t) => isVisible(save, t.id))
  const current = selected && TABLE_BY_ID[selected] && isVisible(save, selected) ? selected : visible[0]?.id

  const index = h('aside', { class: 'ledger-index' },
    h('p', { class: 'count' }, `${TOUR.filter((t) => save.tables[t.id]?.cleared).length} of ${TOUR.length} tables cleared`),
    h('ul', null, visible.map((t) => {
      const st = tableState(save, t.id)
      return h('li', null, h('button', {
        type: 'button', class: `index-entry ${st}${t.id === current ? ' on' : ''}`,
        onclick: () => go(`/ledger/tour/${t.id}`),
      }, h('span', { class: 'numeral' }, String(t.position)),
        h('span', null, st === 'sealed' && t.kind !== 'tour' ? 'Sealed' : t.name),
        st === 'cleared' ? h('span', { class: 'tick' }, '✓') : null))
    })))

  const page = h('article', { class: 'ledger-page' })
  if (current) venuePage(page, TABLE_BY_ID[current])
  book.append(index, page)
}

function venuePage(page: HTMLElement, t: TableData) {
  const save = store.get()
  const st = tableState(save, t.id)
  const rec = save.tables[t.id]
  const sealedBeyond = st === 'sealed' && t.kind !== 'tour'
  page.append(
    h('header', { class: 'page-head venue' },
      h('div', null,
        h('p', { class: 'kicker' }, t.kind === 'tour' ? `Table ${t.position} of 8` : t.kind === 'champions' ? 'Beyond the tour' : 'The end of the line'),
        h('h2', null, sealedBeyond ? 'Sealed' : t.name),
        h('p', { class: 'meta' }, sealedBeyond ? '' : [text(t.place), text(t.region)].filter(Boolean).join(' · ')),
        text(t.era) && !sealedBeyond ? h('p', { class: 'meta dim' }, text(t.era)) : null)),
    h('p', { class: `status ${st}` },
      st === 'cleared' ? `Cleared ${formatDate(rec?.firstClearedAt)}.` : st === 'open' ? 'Open. A chair is waiting.' : 'Sealed. Clear the table before it.'),
  )
  if (sealedBeyond) return
  if (text(t.room)) page.append(h('h3', null, 'The room'), h('p', null, text(t.room)))
  if (st !== 'sealed' && text(t.hook)) page.append(h('h3', null, 'Why you are here'), h('p', null, text(t.hook)))

  const cast = fullCast(t)
  page.append(h('h3', null, 'At this table'),
    h('ul', { class: 'cast-row' }, cast.map((id) => {
      const c = CHARACTERS[id]
      const v = visibility(c)
      return h('li', { class: v },
        h('button', { type: 'button', class: 'plain', disabled: v === 'hidden', onclick: () => go(`/ledger/invited/${id}`) },
          medallion(c, v === 'hidden' ? 'hidden' : v),
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

function marksTab(book: HTMLElement) {
  const save = store.get()
  // A secret mark is not in the book, or in its total, until it is written.
  const listed = MARKS.filter((m) => !m.secret || save.marks[m.id])
  const earned = listed.filter((m) => save.marks[m.id])
  const page = h('article', { class: 'ledger-page wide' },
    h('header', { class: 'page-head' }, h('div', null,
      h('h2', null, 'Marks'),
      h('p', { class: 'meta' }, `${earned.length} entries written of ${listed.length}.`),
      h('p', { class: 'dim' }, 'What Death saw fit to write down about you. Not a trophy cabinet: a record.'))),
    h('ol', { class: 'marks-list' }, listed.map((m) => {
      const e = save.marks[m.id]
      if (e) {
        const where = e.table ? TABLE_BY_ID[e.table]?.name : null
        return h('li', { class: 'mark earned' },
          h('b', null, m.title), h('span', { class: 'mark-text' }, m.text),
          h('small', null, [formatDate(e.at), where].filter(Boolean).join(' · ')))
      }
      if (m.hidden) return h('li', { class: 'mark hidden' }, h('b', null, '— — —'), h('span', { class: 'mark-text' }, 'An entry not yet written.'))
      return h('li', { class: 'mark' }, h('b', null, m.title), h('span', { class: 'mark-text' }, m.hint))
    })))
  book.append(page)
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
    h('h3', null, 'Echoes of your journey'), echoes,
    h('h3', null, 'The account'),
    h('dl', { class: 'record' }, rows.flatMap(([k, v]) => [h('dt', null, k), h('dd', null, v)])),
    best ? h('div', { class: 'best-hand' },
      h('h3', null, 'Best hand shown down'),
      h('p', null, `${cap(RANKINGS[best.rank])}${TABLE_BY_ID[best.table] ? `, at ${TABLE_BY_ID[best.table].name}` : ''}.`),
      h('div', { class: 'cards-row' }, best.cards.map((c: Card) => cardEl(c, 'small')))) : null,
  ))
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
