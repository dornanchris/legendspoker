import { CHARACTERS, DEALER, DIALOGUE, TABLES, TABLE_BY_ID, fullCast, type Line, type TableData } from '../../src/content.js'
import { tableState, isVisible, earnedName, canPlayOpenTable, fillLine } from '../../src/tour.js'
import * as store from '../store.js'
import { h, go } from '../dom.js'
import { header, medallion, startTable, isArrivalHidden } from './shared.js'

const NUMERALS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']

/**
 * One line of dialogue off the table: Death's in quotes, the room's staging
 * as plain italics, anyone else with their name.
 */
export function lineEl(l: Line, names: { tier_1?: string; tier_3?: string } | undefined, playerName: string): HTMLElement {
  const t = fillLine(l.text, names, playerName).replace(/^\[|\]$/g, '')
  if (l.speaker === 'narration' || l.type === 'stage_direction') {
    const who = l.speaker === 'narration' ? '' : `${CHARACTERS[l.speaker]?.short ?? l.speaker} `
    return h('p', { class: 'staging reveal' }, who + t)
  }
  if (l.speaker === 'death') return h('p', { class: 'death-says reveal' }, `“${t}”`)
  return h('p', { class: 'says reveal' }, h('b', null, `${CHARACTERS[l.speaker]?.short ?? l.speaker}: `), `“${t}”`)
}

/** Fields the writers have not filled yet read as absent, never as "TODO". */
export const text = (s: string | null | undefined) => (s && s !== 'TODO' ? s : '')

/**
 * The World Tour map (BUILD-PLAN screen 3) -- the progression spine. Eight
 * destinations with sealed / open / cleared state, replay entry, and the
 * champions' tables beyond. The finale does not appear until it is open.
 */
export function mapScreen(root: HTMLElement): void {
  const save = store.get()
  if (!save.player) { go('/invite'); return }
  const name = save.player.name

  const card = (t: TableData) => {
    const state = tableState(save, t.id)
    const rec = save.tables[t.id]
    const called = rec ? earnedName(rec.respectTier, DIALOGUE[t.id]?.earned_names, name) : null
    const isActive = save.active?.table === t.id
    const el = h('article', {
      class: `tour-card ${state} kind-${t.kind}${isActive ? ' active' : ''}`,
      tabindex: state === 'sealed' ? '-1' : '0',
      'aria-disabled': state === 'sealed' ? 'true' : null,
      dataset: { table: t.id },
    },
      h('div', { class: 'card-top' },
        h('span', { class: 'numeral' }, NUMERALS[t.position] ?? ''),
        h('span', { class: `state ${state}` }, isActive ? 'in progress' : state)),
      h('h3', null, state === 'sealed' && t.kind !== 'tour' ? 'Sealed' : t.name),
      h('p', { class: 'place' }, state === 'sealed' && t.kind !== 'tour' ? '' : text(t.place)),
      h('p', { class: 'teaser' }, state === 'sealed' ? '' : text(t.teaser)),
    )
    const foot = h('div', { class: 'card-foot' },
      called ? h('p', { class: 'called' }, 'They call you ', h('b', null, called)) : h('span'))
    el.append(foot)
    if (state !== 'sealed') {
      const open = () => go(`/intro/${t.id}`)
      el.addEventListener('click', open)
      el.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open() } })
    }
    if (canPlayOpenTable(save, t)) {
      foot.append(h('button', {
        type: 'button', class: 'ghost small open-table',
        onclick: (ev: Event) => { ev.stopPropagation(); go(`/intro/${t.id}/open`) },
      }, 'Open table'))
    }
    return el
  }

  const tour = TABLES.filter((t) => t.kind === 'tour')
  const beyond = TABLES.filter((t) => t.kind !== 'tour' && isVisible(save, t.id))

  const greeting = h('div', { class: 'map-greeting' })
  if (!save.story.firstMapSeen) {
    const lines = (DEALER.first_map ?? []) as Line[]
    greeting.append(...lines.map((l) => lineEl(l, undefined, name)))
    store.update((s) => { s.story.firstMapSeen = true })
  }

  root.append(
    h('div', { class: 'screen map-screen' },
      header('The Tour', '/', h('button', { type: 'button', class: 'ghost small', onclick: () => go('/ledger') }, 'Ledger ›')),
      greeting,
      h('section', { class: 'tour-grid', 'aria-label': 'The eight tables' }, tour.map(card)),
      beyond.length ? h('h2', { class: 'beyond' }, 'Beyond the tour') : null,
      h('section', { class: 'tour-grid beyond-grid' }, beyond.map(card))),
  )
}

/**
 * Table intro (BUILD-PLAN screen 4): a still, Death's narration, and the
 * chair. The foreshadowing delivery surface. Lines arrive one at a time;
 * tapping hurries them.
 */
export function introScreen(root: HTMLElement, params: string[]): void {
  const save = store.get()
  const table = TABLE_BY_ID[params[0]]
  const mode: 'tour' | 'open' = params[1] === 'open' ? 'open' : 'tour'
  if (!save.player || !table || tableState(save, table.id) === 'sealed') { go('/tour'); return }
  if (mode === 'open' && !canPlayOpenTable(save, table)) { go('/tour'); return }
  const name = save.player.name
  const d = DIALOGUE[table.id]
  const rec = save.tables[table.id]
  const resuming = save.active?.table === table.id && save.active.mode === mode

  // Which words Death has for this visit.
  let lines: Line[] = []
  const dealer = (k: string) => {
    const pool = (DEALER[k] ?? []) as Line[]
    return pool.length ? [pool[Math.floor(Math.random() * pool.length)]] : []
  }
  if (resuming) lines = dealer('resume')
  else if (mode === 'open') lines = dealer('open_table')
  else if (table.kind === 'finale' && (rec?.losses ?? 0) > 0) {
    const n = Math.min(5, (rec?.losses ?? 0) + 1)
    lines = d?.rematch_ladder?.[String(n)] ?? d?.table_intro ?? []
  } else if (rec?.cleared) lines = dealer('replay_cleared')
  else if ((rec?.losses ?? 0) > 0) lines = dealer('rematch_table')
  else lines = d?.table_intro ?? []

  const quote = h('div', { class: 'intro-lines' })
  const seat = h('button', { type: 'button', class: 'primary', onclick: () => startTable(table.id, mode) },
    resuming ? 'Return to your seat' : table.kind === 'finale' ? 'Sit down' : 'Take your seat')

  const cast = mode === 'open' ? [] : fullCast(table)
  const castRow = cast.length
    ? h('ul', { class: 'cast-row', 'aria-label': 'At this table' },
      cast.map((id) => {
        const c = CHARACTERS[id]
        const hidden = isArrivalHidden(id) || (table.kind === 'finale' && !save.characters[id]?.met && false)
        return h('li', { class: hidden ? 'hidden' : '' },
          medallion(c, hidden ? 'hidden' : save.characters[id]?.beaten ? 'beaten' : 'met'),
          h('span', null, hidden ? 'An empty chair' : c?.short ?? id))
      }))
    : h('p', { class: 'dim' }, 'The regulars, without their champion. Who sits down is up to the evening.')

  root.append(
    h('div', { class: `screen intro-screen t-${table.id}` },
      header(mode === 'open' ? `${table.name} — open table` : table.name, '/tour'),
      h('div', { class: 'intro-body' },
        h('p', { class: 'kicker' },
          [NUMERALS[table.position] ? `Table ${NUMERALS[table.position]}` : '', text(table.place), text(table.region)]
            .filter(Boolean).join(' · ')),
        text(table.era) ? h('p', { class: 'era' }, text(table.era)) : null,
        // Until there is a painted still, the room description stands in for
        // it -- unless Death's intro already narrates the room itself.
        text(table.room) && !lines.some((l) => l.speaker === 'narration') ? h('p', { class: 'room' }, text(table.room)) : null,
        quote,
        mode === 'tour' && text(table.hook) ? h('p', { class: 'hook' }, text(table.hook)) : null,
        castRow,
        h('div', { class: 'actions' }, seat,
          h('button', { type: 'button', class: 'ghost', onclick: () => go(`/ledger/tour/${table.id}`) }, 'In the ledger'))),
    ),
  )

  // Reveal Death's lines one at a time. Any tap shows the next at once.
  let i = 0
  let timer: ReturnType<typeof setTimeout> | null = null
  const next = () => {
    if (timer) clearTimeout(timer)
    if (i >= lines.length || !quote.isConnected) return
    quote.append(lineEl(lines[i++], d?.earned_names, name))
    timer = setTimeout(next, 2400)
  }
  quote.addEventListener('click', next)
  setTimeout(next, 350)
}
