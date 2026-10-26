import { CHARACTERS, DIALOGUE, MARKS, TABLE_BY_ID, type CharacterData } from '../../src/content.js'
import type { TableOutcome, OutcomeEffects } from '../../src/tour.js'
import type { TableFacts } from '../../src/marks.js'
import type { Card } from '../../src/equity.js'
import { RANKINGS } from '../../src/game.js'
import { fillLine } from '../../src/tour.js'
import * as store from '../store.js'
import * as sound from '../sound.js'
import { h, go, ordinal, formatChips } from '../dom.js'
import { face, medallion, portraitUrl, startTable } from './shared.js'
import { dealerLine, cardEl } from './table.js'

/**
 * The sitting as the curtain call tells it: the player's best moments and who
 * fell around them, counted by the table screen from the events (table.ts).
 */
export type Sitting = {
  potsWon: number
  /** The most chips won in one hand. */
  biggestPot: number
  /** The best hand the player won a showdown with. */
  best: { rank: number; cards: Card[]; amount: number } | null
  /** Opponents the player knocked out themself. */
  knockouts: string[]
  /** Everyone who went out, in order, with their place. */
  fallen: { id: string; place: number }[]
  /** Who took the player's last chip, if anyone did. */
  bustedBy: string | null
  /** The player quit the table from the menu. */
  quit?: boolean
}

export type Result = {
  outcome: TableOutcome
  effects: OutcomeEffects
  marks: string[]
  facts: TableFacts
  /** What the table was calling the player when it ended. */
  name: string | null
  sitting?: Sitting
}

let last: Result | null = null

export function setResult(r: Result): void {
  last = r
}

/**
 * Post-table results (BUILD-PLAN screen 9) as a page of its own: the same
 * curtain call the table brings down over the felt, for a reload or a link.
 */
export function resultsScreen(root: HTMLElement): void {
  const r = last
  const save = store.get()
  if (!r || !save.player) {
    go('/tour')
    return
  }
  root.append(h('div', { class: 'screen results' }, panel(r, null)))
}

/**
 * The curtain call (the owner: "something that lets you feel good that you
 * won, and something that makes you feel good you lost"). It comes down over
 * the table the moment the last chip settles, the room still breathing behind
 * it, and plays in beats: the verdict, Death's word, the people who fell (in
 * the order they fell), the best of what the player did, and what the ledger
 * gained. A tap shows everything at once. Diegetic throughout: Death's
 * ledger and the table's respect, never points or bars (CLAUDE.md, NOT
 * BUILDING). Under Reduce motion every beat is simply there.
 */
export function curtainCall(r: Result, onLookAtTable: () => void): HTMLElement {
  const veil = h('div', { class: `curtain ${r.outcome.won ? 'won' : 'lost'}`, role: 'dialog', 'aria-label': 'The table is over' })
  veil.append(motes(r.outcome.won), panel(r, () => { veil.classList.add('lifted'); onLookAtTable() }))
  // A tap anywhere but a button lets the rest of the beats land at once.
  veil.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('button')) veil.classList.add('all')
  })
  // A flourish to go with it: chips raining in for a win, one card mucked for a loss.
  if (r.outcome.won) { sound.chips(14, 0.25); sound.sweep(10, 0.9) } else sound.muck(0.3)
  return veil
}

/** Gold dust drifting down for a win, ash drifting up for a loss. */
function motes(won: boolean): HTMLElement {
  const box = h('div', { class: 'motes', 'aria-hidden': 'true' })
  for (let i = 0; i < 22; i++) {
    const m = h('i')
    m.style.setProperty('--x', `${Math.random() * 100}%`)
    m.style.setProperty('--d', `${(Math.random() * 6).toFixed(2)}s`)
    m.style.setProperty('--t', `${(won ? 5 : 9) + Math.random() * 4}s`)
    m.style.setProperty('--z', (0.5 + Math.random() * 0.9).toFixed(2))
    box.append(m)
  }
  return box
}

/** A beat of the curtain call: appears after `n` beats (CSS --i). */
function beat<T extends HTMLElement>(el: T, n: number): T {
  el.classList.add('beat')
  el.style.setProperty('--i', String(n))
  return el
}

/** A character's own drawn head (art-tools/build/portraits.py), or their medallion where there is no art yet. */
function portrait(c: CharacterData | undefined, stamp: string, cls: string, mine = false, worn = true): HTMLElement {
  const url = c && portraitUrl(c.id, worn)
  const face = url
    ? h('div', { class: `face t-${c!.table}`, style: `background-image:url(${url})` })
    : medallion(c, 'met')
  return h('figure', { class: `sitter ${cls}` },
    face,
    h('span', { class: 'stamp' }, stamp),
    h('figcaption', null, c?.short ?? '?', mine ? h('small', null, 'by your hand') : null),
  )
}

const HEADLINE_LOST = ['', '', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']

function panel(r: Result, lookAtTable: (() => void) | null): HTMLElement {
  const save = store.get()
  const player = save.player?.name ?? ''
  const { outcome: o, effects } = r
  const s = r.sitting
  const table = TABLE_BY_ID[o.table]
  const finale = table.kind === 'finale'
  const missedChamp = o.missed.filter((id) => id === table.champion)
  let n = 0

  // ---- the verdict
  // One across the table (the finale, the Pyre, a heads-up open table): there
  // is no "second place" of two, and nobody else to have gone first.
  const alone = o.sat.length === 1 ? CHARACTERS[o.sat[0]] : null
  const headline = o.won
    ? finale ? 'The last hand is yours' : o.mode === 'open' ? 'The house game is yours' : 'Table cleared'
    : alone ? `${alone.short[0].toUpperCase()}${alone.short.slice(1)} holds every chip`
    : `${HEADLINE_LOST[o.place] ?? ordinal(o.place)} place`
  const fallenBefore = s ? s.fallen.filter((f) => f.place > o.place) : []
  const sub = o.won
    ? `You hold every chip. ${o.hands} ${o.hands === 1 ? 'hand' : 'hands'}.`
    : s?.quit
      ? `You gave up your chair after ${o.hands} ${o.hands === 1 ? 'hand' : 'hands'}.${fallenBefore.length ? ` You had outlasted ${listNames(fallenBefore.map((f) => f.id))}.` : ''}`
    : fallenBefore.length
      ? `You outlasted ${listNames(fallenBefore.map((f) => f.id))}. ${o.hands} ${o.hands === 1 ? 'hand' : 'hands'}.`
      : alone
        ? `Heads up, ${o.hands} ${o.hands === 1 ? 'hand' : 'hands'}.`
        : `${o.hands} ${o.hands === 1 ? 'hand' : 'hands'}. Every seat at this table has been the first to go at least once.`

  let deathLine: string | null = null
  const d = DIALOGUE[table.id]
  if (o.won && o.mode === 'tour' && d?.champion_defeat?.length && !missedChamp.length && table.champion) {
    const l = d.champion_defeat.find((x) => x.speaker === 'death')
    if (l) deathLine = fillLine(l.text, d.earned_names, player)
  }
  if (!deathLine && !(finale && !o.won)) deathLine = dealerLine(o.won ? 'table_won' : 'player_loses_table', player)

  const crest = beat(h('div', { class: 'crest' }), n++)
  if (s?.best) {
    // The best hand they took a pot with, dealt in a fan.
    crest.append(h('div', { class: 'fan' }, s.best.cards.map((c, i) => {
      const el = cardEl(c)
      el.style.setProperty('--k', String(i - (s.best!.cards.length - 1) / 2))
      return el
    })))
    crest.append(h('p', { class: 'fan-label' }, `Best hand: ${RANKINGS[s.best.rank] ?? 'a hand'}`))
  } else {
    crest.append(h('div', { class: 'fan' }, (o.won ? ['A', 'K'] : ['?']).map((rank, i, all) => {
      const el = rank === '?' ? cardEl(null) : cardEl({ rank: rank as Card['rank'], suit: 'spades' })
      el.style.setProperty('--k', String(i - (all.length - 1) / 2))
      return el
    })))
  }

  const left = h('div', { class: 'verdict' },
    beat(h('p', { class: 'kicker' }, table.name), n++),
    crest,
    beat(h('h2', { class: `headline ${o.won ? 'won' : 'lost'}` }, headline), n++),
    beat(h('p', { class: 'subline' }, sub), n++),
    deathLine ? beat(h('blockquote', { class: 'death-says' }, `“${deathLine}”`, h('cite', null, 'Death')), n++) : null,
  )
  if (finale && !o.won) {
    const lost = save.tables[table.id]?.losses ?? 1
    left.append(beat(h('p', { class: 'note' },
      lost === 1
        ? 'There is no second chance at most tables in the world. This is not most tables.'
        : `You have sat across from him ${lost} times now. He has started to remember.`), n++))
  }

  // ---- the people, in the order they fell
  const right = h('div', { class: 'tally-col' })
  if (s && (s.fallen.length || s.bustedBy)) {
    const row = h('div', { class: 'sitters' })
    const mine = new Set(s.knockouts)
    const fell = [...s.fallen].sort((a, b) => b.place - a.place)
    for (const f of fell) {
      if (!o.won && f.place < o.place) continue // after the player was gone: not theirs to count
      const c = CHARACTERS[f.id]
      const last = o.won && f.place === 2
      row.append(beat(portrait(c, last ? 'Beaten' : o.won ? `Out ${ordinal(f.place)}` : 'Outlasted', last ? 'last' : '', mine.has(f.id), o.mode === 'tour'), n++))
    }
    if (!o.won && s.bustedBy) {
      row.append(beat(portrait(CHARACTERS[s.bustedBy], 'Outlasted you', 'victor', false, o.mode === 'tour'), n++))
    }
    right.append(beat(h('h3', null, o.won ? 'They fell to you' : 'Around you'), n++), row)
  }

  // ---- the best of what the player did
  if (s) {
    const tiles: [string, string][] = [['Hands', String(o.hands)], ['Pots won', String(s.potsWon)]]
    if (s.biggestPot > 0) tiles.push(['Biggest pot', `+${formatChips(s.biggestPot)}`])
    if (s.knockouts.length) tiles.push([s.knockouts.length === 1 ? 'Knockout' : 'Knockouts', String(s.knockouts.length)])
    right.append(beat(h('div', { class: 'tiles' }, tiles.map(([k, v]) => h('div', { class: 'tile' }, h('b', null, v), h('span', null, k)))), n++))
  }

  if (r.name) {
    right.append(beat(h('p', { class: 'respect-line' }, 'The table calls you ', h('b', null, r.name), '.'), n++))
  }

  // ---- what the ledger gained
  if (effects.newlyBeaten.length) {
    right.append(beat(h('div', null,
      h('h3', null, o.won ? 'Closed in the ledger' : 'Beaten'),
      h('ul', { class: 'beaten-list' },
        effects.newlyBeaten.map((id) => {
          const c = CHARACTERS[id]
          return h('li', null, face(c, 'beaten'),
            h('span', null, h('b', null, c?.name ?? id), h('small', null, c?.epithet ?? '')))
        }))), n++))
  }
  if (missedChamp.length) {
    const c = CHARACTERS[missedChamp[0]]
    right.append(beat(h('p', { class: 'note' },
      `${c?.name ?? 'The champion'} never sat down. His page in the ledger stays open until you come back for him.`), n++))
  }
  if (r.marks.length) {
    right.append(beat(h('div', null,
      h('h3', null, 'Entered in the ledger'),
      h('ul', { class: 'marks-earned' },
        r.marks.map((id) => {
          const m = MARKS.find((x) => x.id === id)
          return m ? h('li', null, h('b', null, m.title), h('span', null, m.text)) : null
        }))), n++))
  }
  if (effects.unlocked) {
    const u = effects.unlocked
    right.append(beat(h('p', { class: 'unlocked' },
      u.kind === 'finale' ? 'One more table has appeared on the map.'
        : u.kind === 'hidden' ? 'Something is burning on the map.' : `Now open: ${u.name}${u.place && u.place !== 'TODO' && !u.name.includes(u.place) ? ` — ${u.place}` : ''}.`), n++))
  }
  // The Phoenix's gauntlet (tour.ts). Nothing says it exists until the last
  // second place it needs; after that, the room tells you what it did.
  const PHOENIX: Record<string, string> = {
    stirring: 'A single warm feather drifts down onto the felt. Something has been keeping count of the times you came second.',
    open: 'The feather on the felt is burning now. Something has flown a very long way to sit across from you.',
    reset: 'The Phoenix forgets you, and every second place goes with it. The road starts again at the first table.',
  }
  if (effects.phoenix && PHOENIX[effects.phoenix]) right.append(beat(h('p', { class: 'note' }, PHOENIX[effects.phoenix]), n++))
  if (o.won && o.mode === 'tour' && table.kind === 'tour' && effects.firstClear) {
    right.append(beat(h('p', { class: 'dim small' }, `Open tables at ${table.name} are now available from the map.`), n++))
  }

  // ---- what next: a loss leads with the rematch, a win with the road on
  const actions = beat(h('div', { class: 'actions' }), Math.min(n, 4))
  const again = () => (o.mode === 'tour' ? go(`/intro/${o.table}`) : void startTable(o.table, 'open'))
  if (finale && o.won) {
    actions.append(h('button', { type: 'button', class: 'primary', onclick: () => go('/ending') }, 'Take the deck'))
  } else if (table.kind === 'hidden') {
    actions.append(h('button', { type: 'button', class: 'primary', onclick: () => go('/tour') }, 'Onward'))
  } else if (o.won) {
    actions.append(
      h('button', { type: 'button', class: 'primary', onclick: () => go('/tour') }, 'Onward'),
      h('button', { type: 'button', onclick: again }, 'Play it again'))
  } else {
    actions.append(
      h('button', { type: 'button', class: 'primary', onclick: again }, 'Rematch'),
      h('button', { type: 'button', onclick: () => go('/tour') }, 'Back to the map'))
  }
  if (o.mode === 'open') actions.append(h('button', { type: 'button', onclick: () => go(`/intro/${o.table}/open`) }, 'Change the chairs'))
  actions.append(h('button', { type: 'button', class: 'ghost', onclick: () => go('/ledger') }, 'The Ledger'))
  if (lookAtTable) actions.append(h('button', { type: 'button', class: 'ghost', onclick: lookAtTable }, 'Look at the table'))
  left.append(actions)

  return h('div', { class: 'results-body curtain-panel' }, left, right)
}

function listNames(ids: string[]): string {
  const names = ids.map((id) => CHARACTERS[id]?.short ?? id)
  if (names.length <= 1) return names.join('')
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

/**
 * #/curtain/won|lost/:table -- the curtain call over a room, from made-up
 * numbers, to look at it without playing a table to the end (like #/puppet,
 * not part of the game). Nothing is written to the save.
 */
export function curtainPreview(root: HTMLElement, params: string[]): void {
  const won = params[0] !== 'lost'
  const table = TABLE_BY_ID[params[1] ?? 'transylvania'] ?? TABLE_BY_ID.transylvania
  const cast = table.seats
  const place = won ? 1 : 3
  const fallen = cast.map((id, i) => ({ id, place: cast.length + 1 - i })).filter((f) => won || f.place !== place)
  const r: Result = {
    outcome: { table: table.id, mode: 'tour', won, place, hands: 47, sat: cast, missed: [], respectTier: 3, respectPoints: 20 },
    effects: { newlyBeaten: won ? cast.slice(0, 2) : [], firstClear: won, unlocked: null, phoenix: null },
    marks: won ? ['nice'] : [],
    facts: { table: table.id, mode: 'tour', won, hands: 47, minStackBB: 12, neverBelowStart: false, missed: [], respectTier: 3, headsUpWith: null, beatenBefore: [] },
    name: 'the Croupier',
    sitting: {
      potsWon: 14, biggestPot: 3150,
      best: { rank: 6, amount: 3150, cards: [
        { rank: 'Q', suit: 'hearts' }, { rank: 'Q', suit: 'spades' }, { rank: 'Q', suit: 'diamonds' },
        { rank: '9', suit: 'clubs' }, { rank: '9', suit: 'hearts' }] },
      knockouts: won ? [cast[1], cast[3]] : [cast[3]],
      fallen: won ? fallen : fallen.filter((f) => f.place > place),
      bustedBy: won ? null : cast[2],
    },
  }
  const room = h('div', { style: `position:fixed;inset:0;background:#000 url(art/rooms/${table.id}/backdrop.webp) center/cover` })
  root.append(room, curtainCall(r, () => {}))
}
