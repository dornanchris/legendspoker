import { CHARACTERS, MARKS, TABLE_BY_ID, type CharacterData } from '../../src/content.js'
import { applyOutcome, openTableCast } from '../../src/tour.js'
import { tableRecord, ENGINE_VERSION } from '../../src/save.js'
import * as store from '../store.js'
import { h, go } from '../dom.js'

export function markTitle(id: string): string {
  return MARKS.find((m) => m.id === id)?.title ?? id
}

/** Screen chrome: a back link and a title, the same on every menu screen. */
export function header(title: string, back: string | null = '/', extra: Node | null = null): HTMLElement {
  return h('header', { class: 'screen-bar' },
    back ? h('button', { type: 'button', class: 'ghost small back', onclick: () => go(back) }, '‹ Back') : h('span'),
    h('h1', null, title),
    extra ?? h('span'))
}

/**
 * Stand-in portrait until the Rive puppets exist: the character's initials
 * in a medallion tinted by their table. Deliberately plain -- it is a
 * placeholder, and a placeholder that looks finished gets shipped.
 */
export function medallion(c: CharacterData | undefined, state: 'unmet' | 'met' | 'beaten' | 'hidden' = 'met'): HTMLElement {
  if (!c || state === 'hidden') return h('div', { class: 'medallion hidden', 'aria-hidden': 'true' }, '?')
  const initials = c.short
    .replace(/^(The|Captain|Sir|King|Count|Inspector|Pope) /, '')
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
  return h('div', { class: `medallion t-${c.table} ${state}`, 'aria-hidden': 'true' }, initials)
}

function randomSeed(): number {
  // Seeds only need to differ between sittings. The seeded RNG takes it from
  // here, so every card of the sitting is reproducible from this one number.
  const buf = new Uint32Array(1)
  try {
    crypto.getRandomValues(buf)
    return buf[0]
  } catch {
    return (Math.random() * 2 ** 32) >>> 0
  }
}

/**
 * Give up the table in progress. Recorded as a loss at that table -- not a
 * punishment, just the truth of the ledger -- and the seat is cleared.
 */
export function forfeitActive(): void {
  const a = store.get().active
  if (!a) return
  store.update((s) => {
    applyOutcome(s, {
      table: a.table,
      mode: a.mode,
      won: false,
      place: a.seats.length + 1,
      hands: 0,
      sat: [],
      missed: [],
      respectTier: a.respectTier,
      respectPoints: a.respectPoints,
    })
    s.active = null
  })
}

/**
 * Take a seat. Returns false if the player declined to give up another table
 * already in progress.
 */
export function startTable(tableId: string, mode: 'tour' | 'open'): boolean {
  const s = store.get()
  const table = TABLE_BY_ID[tableId]
  if (!table || !s.player) return false
  if (s.active) {
    if (s.active.table === tableId && s.active.mode === mode) {
      go('/table')
      return true
    }
    const name = TABLE_BY_ID[s.active.table]?.name ?? 'another table'
    if (!confirm(`You still have a seat at ${name}. Give it up? The ledger will record it as a loss.`)) return false
    forfeitActive()
  }
  const seed = randomSeed()
  let seats = [...table.seats]
  if (mode === 'open') {
    let x = seed
    const rng = () => ((x = (x * 1664525 + 1013904223) >>> 0) / 2 ** 32)
    seats = openTableCast(table, s, rng)
  }
  const rec = tableRecord(s, tableId)
  store.update((st) => {
    st.active = {
      table: tableId,
      mode,
      seats,
      seed,
      decisions: [],
      startedAt: new Date().toISOString(),
      respectTier: Math.max(rec.respectTier, table.respectStart),
      respectPoints: rec.respectPoints,
      engine: ENGINE_VERSION,
    }
  })
  go('/table')
  return true
}

/** "he" / "she" / "it", capitalised when needed, for generated sentences. */
export function pronoun(c: CharacterData, cap = false): string {
  const p = c.pronoun === 'they' ? 'they' : c.pronoun
  return cap ? p[0].toUpperCase() + p.slice(1) : p
}

export function isArrivalHidden(id: string): boolean {
  const c = CHARACTERS[id]
  return !!c?.arrives && !store.get().characters[id]?.met
}
