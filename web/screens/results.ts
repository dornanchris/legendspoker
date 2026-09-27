import { CHARACTERS, DIALOGUE, MARKS, TABLE_BY_ID } from '../../src/content.js'
import type { TableOutcome, OutcomeEffects } from '../../src/tour.js'
import type { TableFacts } from '../../src/marks.js'
import { fillLine } from '../../src/tour.js'
import * as store from '../store.js'
import { h, go, ordinal } from '../dom.js'
import { medallion, startTable } from './shared.js'
import { dealerLine } from './table.js'

export type Result = {
  outcome: TableOutcome
  effects: OutcomeEffects
  marks: string[]
  facts: TableFacts
  /** What the table was calling the player when it ended. */
  name: string | null
}

let last: Result | null = null

export function setResult(r: Result): void {
  last = r
}

/**
 * Post-table results (BUILD-PLAN screen 9): the outcome, who is now closed
 * in the ledger, what the table calls you, what opened on the map.
 */
export function resultsScreen(root: HTMLElement): void {
  const r = last
  const save = store.get()
  if (!r || !save.player) {
    go('/tour')
    return
  }
  const { outcome: o, effects } = r
  const table = TABLE_BY_ID[o.table]
  const finale = table.kind === 'finale'

  let headline: string
  if (o.won) headline = finale ? 'The last hand is yours' : o.mode === 'open' ? 'The house game is yours' : 'Table cleared'
  else headline = `Out in ${ordinal(o.place)}`

  let closing: string | null = null
  if (!o.won) {
    closing = finale
      ? null
      : dealerLine('player_loses_table', save.player.name)
  } else if (o.mode === 'open') {
    closing = dealerLine('table_won', save.player.name)
  }

  const missedChamp = o.missed.filter((id) => id === table.champion)
  const body = h('div', { class: 'results-body' })

  body.append(
    h('p', { class: 'kicker' }, table.name),
    h('h2', { class: `headline ${o.won ? 'won' : 'lost'}` }, headline),
    h('p', { class: 'dim' }, `${o.hands} ${o.hands === 1 ? 'hand' : 'hands'}${o.won ? '' : ` · you finished ${ordinal(o.place)}`}`),
  )
  if (closing) body.append(h('blockquote', { class: 'death-says' }, `“${closing}”`, h('cite', null, 'Death')))

  if (finale && !o.won) {
    const lost = save.tables[table.id]?.losses ?? 1
    body.append(h('p', { class: 'note' },
      lost === 1
        ? 'There is no second chance at most tables in the world. This is not most tables.'
        : `You have sat across from him ${lost} times now. He has started to remember.`))
  }

  if (r.name) {
    body.append(h('p', { class: 'respect-line' }, 'The table calls you ', h('b', null, r.name), '.'))
  }

  if (effects.newlyBeaten.length) {
    body.append(
      h('h3', null, o.won ? 'Closed in the ledger' : 'Beaten'),
      h('ul', { class: 'beaten-list' },
        effects.newlyBeaten.map((id) => {
          const c = CHARACTERS[id]
          return h('li', null, medallion(c, 'beaten'),
            h('span', null, h('b', null, c?.name ?? id), h('small', null, c?.epithet ?? '')))
        })),
    )
  }

  if (missedChamp.length) {
    const c = CHARACTERS[missedChamp[0]]
    body.append(h('p', { class: 'note' },
      `${c?.name ?? 'The champion'} never sat down. His page in the ledger stays open until you come back for him.`))
  }

  if (r.marks.length) {
    body.append(
      h('h3', null, 'Entered in the ledger'),
      h('ul', { class: 'marks-earned' },
        r.marks.map((id) => {
          const m = MARKS.find((x) => x.id === id)
          return m ? h('li', null, h('b', null, m.title), h('span', null, m.text)) : null
        })),
    )
  }

  if (effects.unlocked) {
    const u = effects.unlocked
    body.append(h('p', { class: 'unlocked' },
      u.kind === 'finale' ? 'One more table has appeared on the map.' : `Now open: ${u.name}${u.place && u.place !== 'TODO' && !u.name.includes(u.place) ? ` — ${u.place}` : ''}.`))
  }
  if (o.won && o.mode === 'tour' && table.kind === 'tour' && effects.firstClear) {
    body.append(h('p', { class: 'dim small' }, `Open tables at ${table.name} are now available from the map.`))
  }

  const actions = h('div', { class: 'actions' })
  if (finale && o.won) {
    actions.append(h('button', { type: 'button', class: 'primary', onclick: () => go('/ending') }, 'Take the deck'))
  } else {
    actions.append(h('button', { type: 'button', class: 'primary', onclick: () => go('/tour') }, 'Onward'))
    actions.append(h('button', { type: 'button', onclick: () => {
      if (o.mode === 'tour') go(`/intro/${o.table}`)
      else startTable(o.table, 'open')
    } }, o.won ? 'Play it again' : 'Rematch'))
  }
  actions.append(h('button', { type: 'button', class: 'ghost', onclick: () => go('/ledger') }, 'The Ledger'))
  body.append(actions)

  // The last words said at the table, for anyone who fast-forwarded past them.
  const d = DIALOGUE[table.id]
  if (o.won && o.mode === 'tour' && d?.champion_defeat?.length && !missedChamp.length && table.champion) {
    const deathLine = d.champion_defeat.find((l) => l.speaker === 'death')
    if (deathLine) body.insertBefore(
      h('blockquote', { class: 'death-says' }, `“${fillLine(deathLine.text, d.earned_names, save.player.name)}”`, h('cite', null, 'Death')),
      body.children[3] ?? null)
  }

  root.append(h('div', { class: 'screen results' }, body))
}
