import { CHARACTERS, DEALER, DIALOGUE, TABLES, TABLE_BY_ID, fullCast, ledgerId, type Line, type TableData } from '../../src/content.js'
import { tableState, isVisible, earnedName, canPlayOpenTable, fillLine } from '../../src/tour.js'
import * as store from '../store.js'
import { h, go } from '../dom.js'
import { header, face, startTable, isArrivalHidden } from './shared.js'
import { chairPicker } from './open.js'

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
 * Where each table sits on the world map (web/art/map.webp, 1536 x 1024; the
 * owner's painting, kept in art-tools/map/): `at` is the place itself and
 * `pin` where its marker stands, nudged into the sea where places crowd
 * (Britain holds two tables, the Mediterranean three) with a thread back to
 * `at`. Tables off the map sit on its compass roses: the Station on the north
 * rose (above the Earth), the Hall of Doors on the western one, the Last
 * Crossing on the south-eastern one, by the edge of everything. The
 * Station, above the Earth, floats out over the Pacific: a phone's screen is
 * wider than the map, and the top of it (the north rose) is cut off there.
 */
const MAP = { w: 1536, h: 1024 }
const SPOTS: Record<string, { at: [number, number]; pin?: [number, number] }> = {
  white_house: { at: [394, 304] },
  athens: { at: [792, 348], pin: [800, 372] },
  pirate_cove: { at: [420, 412] },
  camelot: { at: [664, 280], pin: [612, 292] },
  rome: { at: [744, 322], pin: [734, 348] },
  baker_street: { at: [676, 268], pin: [706, 222] },
  transylvania: { at: [808, 296], pin: [822, 276] },
  station: { at: [118, 330] },
  champions_1: { at: [186, 712], pin: [150, 680] },
  champions_2: { at: [186, 712], pin: [228, 746] },
  finale: { at: [1046, 762] },
  pyre: { at: [846, 396], pin: [884, 446] },
}

/**
 * The World Tour (BUILD-PLAN screen 3), on the owner's world map: a marker for
 * every table, sealed, open or cleared. Tap one for its card: where and when,
 * the hook, who sits there, the player's record, and the ways in (take your
 * seat, an open table, the ledger). Tables beyond the tour appear only once
 * visible. Room is kept in the corner for more modes (online) later.
 */
export function mapScreen(root: HTMLElement): (() => void) | void {
  const save = store.get()
  if (!save.player) { go('/invite'); return }
  const name = save.player.name

  const tables = TABLES.filter((t) => t.kind === 'tour' || isVisible(save, t.id)).filter((t) => SPOTS[t.id])
  const stage = h('div', { class: 'world-map' })
  const img = h('img', { class: 'world-map-img', src: 'art/map.webp', alt: '', draggable: 'false' }) as HTMLImageElement
  const threads = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  threads.setAttribute('class', 'map-threads')
  threads.setAttribute('aria-hidden', 'true')
  const pins = h('div', { class: 'map-pins' })
  const panel = h('aside', { class: 'map-panel', hidden: true, 'aria-live': 'polite' })
  stage.append(img, threads, pins)

  let chosen: string | null = null
  const pinEls = new Map<string, HTMLElement>()

  // two tables of one name (the Hall of Doors) are told apart by number
  const named = (t: TableData) => {
    const same = tables.filter((x) => x.name === t.name)
    return same.length > 1 ? `${t.name} ${NUMERALS[same.indexOf(t) + 1]}` : t.name
  }
  for (const t of tables) {
    const state = tableState(save, t.id)
    const active = save.active?.table === t.id
    const sealedBeyond = state === 'sealed' && t.kind !== 'tour'
    const label = sealedBeyond ? 'Sealed' : named(t)
    const pin = h('button', {
      type: 'button', class: `map-pin ${state} kind-${t.kind}${active ? ' active' : ''}`,
      'aria-label': `${label}${state === 'sealed' ? ', sealed' : state === 'cleared' ? ', cleared' : ''}${active ? ', in progress' : ''}`,
      dataset: { table: t.id },
      onclick: () => choose(t.id),
    }, h('span', { class: 'pin-mark' }, t.kind === 'tour' ? NUMERALS[t.position] ?? '' : t.kind === 'finale' ? '✦' : t.kind === 'hidden' ? '☼' : '◆'),
      h('span', { class: 'pin-name' }, label))
    pinEls.set(t.id, pin)
    pins.append(pin)
  }

  /** Lay the markers over the picture as it is drawn (it covers the screen, so some of it is cropped). */
  function layout() {
    const W = stage.clientWidth, H = stage.clientHeight
    const k = Math.max(W / MAP.w, H / MAP.h)
    const ox = (W - MAP.w * k) / 2, oy = (H - MAP.h * k) / 2
    const pad = 22
    const at = ([x, y]: [number, number]): [number, number] => [ox + x * k, oy + y * k]
    const clamp = ([x, y]: [number, number]): [number, number] =>
      [Math.min(W - pad, Math.max(pad, x)), Math.min(H - pad, Math.max(pad + 30, y))]
    threads.setAttribute('viewBox', `0 0 ${W} ${H}`)
    threads.replaceChildren()
    for (const [id, el] of pinEls) {
      const s = SPOTS[id]
      const p = clamp(at(s.pin ?? s.at))
      el.style.left = `${p[0]}px`
      el.style.top = `${p[1]}px`
      if (s.pin) {
        const q = at(s.at)
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('x1', String(q[0])); line.setAttribute('y1', String(q[1]))
        line.setAttribute('x2', String(p[0])); line.setAttribute('y2', String(p[1]))
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        dot.setAttribute('cx', String(q[0])); dot.setAttribute('cy', String(q[1])); dot.setAttribute('r', '2.5')
        threads.append(line, dot)
      }
    }
  }

  function choose(id: string | null) {
    chosen = id
    for (const [tid, el] of pinEls) el.classList.toggle('chosen', tid === id)
    if (!id) { panel.hidden = true; return }
    panel.replaceChildren(...card(TABLE_BY_ID[id]))
    panel.hidden = false
    panel.querySelector<HTMLElement>('button.primary, button')?.focus({ preventScroll: true })
  }

  /** Everything a table's marker says when it is tapped. */
  function card(t: TableData): Node[] {
    const state = tableState(save, t.id)
    const rec = save.tables[t.id]
    const active = save.active?.table === t.id
    const close = h('button', { type: 'button', class: 'ghost small panel-close', 'aria-label': 'Close', onclick: () => choose(null) }, '✕')
    if (state === 'sealed') {
      const before = t.kind === 'tour' ? TABLES.find((x) => x.kind === 'tour' && x.position === t.position - 1) : null
      return [close,
        h('p', { class: 'kicker' }, t.kind === 'tour' ? `Table ${NUMERALS[t.position]}` : 'Beyond the tour'),
        h('h2', null, t.kind === 'tour' ? t.name : 'Sealed'),
        t.kind === 'tour' ? h('p', { class: 'place' }, [text(t.place), text(t.region)].filter(Boolean).join(' · ')) : null,
        h('p', { class: 'sealed-note' }, before ? `Sealed. Clear ${before.name} to open it.` : 'Sealed. The tour has to take you further first.'),
      ].filter(Boolean) as Node[]
    }
    const called = rec ? earnedName(rec.respectTier, DIALOGUE[t.id]?.earned_names, name) : null
    const cast = fullCast(t)
    const actions = h('div', { class: 'panel-actions' },
      h('button', { type: 'button', class: 'primary', onclick: () => go(`/intro/${t.id}`) },
        active && save.active?.mode === 'tour' ? 'Return to your seat' : state === 'cleared' ? 'Play again' : 'Take your seat'),
      canPlayOpenTable(save, t)
        ? h('button', { type: 'button', class: 'open-table', onclick: () => go(`/intro/${t.id}/open`) },
          active && save.active?.mode === 'open' ? 'Back to the open table' : 'Open table')
        : null,
      h('button', { type: 'button', class: 'ghost', onclick: () => go(`/ledger/tour/${t.id}`) }, 'In the ledger'))
    const record = rec && rec.attempts
      ? h('p', { class: 'record-line' },
        `${rec.wins} of ${rec.attempts} won`,
        rec.bestPlace ? ` · best ${rec.bestPlace === 1 ? 'first' : ordinalWord(rec.bestPlace)}` : '',
        rec.fastestWin ? ` · fastest win ${rec.fastestWin} hands` : '')
      : null
    return [close,
      h('p', { class: 'kicker' },
        [t.kind === 'tour' ? `Table ${NUMERALS[t.position]}` : '', active ? 'in progress' : state === 'cleared' ? 'cleared' : ''].filter(Boolean).join(' · ')),
      h('h2', null, named(t)),
      h('p', { class: 'place' }, [text(t.place), text(t.region)].filter(Boolean).join(' · ')),
      text(t.era) ? h('p', { class: 'era' }, text(t.era)) : null,
      text(t.teaser) ? h('p', { class: 'teaser' }, text(t.teaser)) : null,
      h('ul', { class: 'panel-cast', 'aria-label': 'At this table' }, cast.map((id) => {
        const c = CHARACTERS[id]
        const hidden = isArrivalHidden(id)
        return h('li', { title: hidden ? 'An empty chair' : c?.short ?? id },
          face(c, hidden ? 'hidden' : save.characters[ledgerId(id)]?.beaten ? 'beaten' : 'met'))
      })),
      called ? h('p', { class: 'called' }, 'They call you ', h('b', null, called)) : null,
      record,
      actions,
    ].filter(Boolean) as Node[]
  }

  let greeting: HTMLElement | null = null
  if (!save.story.firstMapSeen) {
    greeting = h('div', { class: 'map-greeting' })
    const g = greeting
    const lines = (DEALER.first_map ?? []) as Line[]
    greeting.append(...lines.map((l) => lineEl(l, undefined, name)),
      h('button', { type: 'button', class: 'ghost small', onclick: () => g.remove() }, 'Look at the map'))
    store.update((s) => { s.story.firstMapSeen = true })
  }

  root.append(
    h('div', { class: 'screen map-screen' },
      stage,
      h('div', { class: 'map-bar' },
        h('button', { type: 'button', class: 'ghost small', onclick: () => go('/') }, '‹ Back'),
        h('h1', null, 'The Tour'),
        // more ways to play (online) go here later
        h('div', { class: 'map-modes' },
          h('button', { type: 'button', class: 'ghost small', onclick: () => go('/ledger') }, 'Ledger ›'))),
      panel,
      greeting),
  )

  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && chosen) choose(null) }
  window.addEventListener('keydown', onKey)
  stage.addEventListener('click', (e) => { if (e.target === img || e.target === threads) choose(null) })
  const ro = new ResizeObserver(layout)
  ro.observe(stage)
  img.addEventListener('load', layout)
  layout()
  // straight to the table in progress, if there is one
  if (save.active && pinEls.has(save.active.table)) choose(save.active.table)
  return () => { ro.disconnect(); window.removeEventListener('keydown', onKey) }
}

const ordinalWord = (n: number) => ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth'][n] ?? `${n}th`

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
  } else if (table.kind === 'hidden') lines = d?.table_intro ?? [] // every sitting is its first
  else if (rec?.cleared) lines = dealer('replay_cleared')
  else if ((rec?.losses ?? 0) > 0) lines = dealer('rematch_table')
  else lines = d?.table_intro ?? []

  const quote = h('div', { class: 'intro-lines' })
  const seat = h('button', { type: 'button', class: 'primary', onclick: () => startTable(table.id, mode, picker?.chairs()) },
    resuming ? 'Return to your seat' : table.kind === 'finale' ? 'Sit down' : 'Take your seat')
  // An open table: the player picks who sits where (open.ts); a seat already
  // taken shows who is in it.
  const picker = mode === 'open' && !resuming ? chairPicker(table, (chairs) => { seat.disabled = !chairs.some(Boolean) }) : null

  const cast = mode === 'open' ? save.active?.seats ?? [] : fullCast(table)
  const castRow = picker ? picker.el
    : h('ul', { class: 'cast-row', 'aria-label': 'At this table' },
      cast.map((id) => {
        const c = CHARACTERS[id]
        const hidden = mode === 'tour' && isArrivalHidden(id)
        return h('li', { class: hidden ? 'hidden' : '' },
          face(c, hidden ? 'hidden' : save.characters[ledgerId(id)]?.beaten ? 'beaten' : 'met', mode === 'tour'),
          h('span', null, hidden ? 'An empty chair' : c?.short ?? id))
      }))

  root.append(
    h('div', { class: `screen intro-screen t-${table.id}` },
      header(mode === 'open' ? `${table.name} — open table` : table.name, '/tour'),
      h('div', { class: 'intro-body' },
        h('p', { class: 'kicker' },
          [NUMERALS[table.position] ? `Table ${NUMERALS[table.position]}` : '', text(table.place), text(table.region)]
            .filter(Boolean).join(' · ')),
        text(table.era) ? h('p', { class: 'era' }, text(table.era)) : null,
        // Until there is a painted still, the room description stands in for
        // it -- unless Death's intro already narrates the room itself. At an
        // open table the room has been seen; the chairs take its place.
        mode === 'tour' && text(table.room) && !lines.some((l) => l.speaker === 'narration') ? h('p', { class: 'room' }, text(table.room)) : null,
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
