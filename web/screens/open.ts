import { CHARACTERS, TABLE_BY_ID, type TableData } from '../../src/content.js'
import { openTablePool, openTableCast, isOpenCast, OPEN_TABLE_CHAIRS } from '../../src/tour.js'
import * as store from '../store.js'
import { h } from '../dom.js'
import { face } from './shared.js'

const COUNT = ['Seat at least one opponent.', 'Heads up.', 'Two opponents.', 'Three opponents.', 'A full table.']

const half = (id: string) => CHARACTERS[id]?.other?.character

export type ChairPicker = {
  el: HTMLElement
  /** Who sits in each of the room's chairs, seat 1 (the player's left) first; null is an empty chair. */
  chairs: () => (string | null)[]
}

/**
 * The open table's chairs, for the player to fill (the owner: "mix and match
 * at each location"). The room's four chairs as they stand around Death's
 * table, seat 1 on the player's left, each showing who sits there, with
 * arrows to go through everyone the player has played against, an empty
 * chair among them. Under them, everyone at once by the table they came
 * from: a tap seats them in the chair picked out, or stands them up again.
 * One to four opponents; heads up against anyone is allowed. The table seats
 * them in the chairs they were put in (Stage.chairsFor), and the picks are
 * kept for the next visit (TableRecord.openChairs).
 */
export function chairPicker(table: TableData, onChange: (chairs: (string | null)[]) => void): ChairPicker {
  const save = store.get()
  const pool = openTablePool(save)
  const dealt = () => {
    const ids = openTableCast(table, save, Math.random)
    return Array.from({ length: OPEN_TABLE_CHAIRS }, (_, i) => ids[i] ?? null)
  }
  const kept = save.tables[table.id]?.openChairs
  let chairs: (string | null)[] =
    kept?.length === OPEN_TABLE_CHAIRS && isOpenCast(save, kept.filter((id) => !!id) as string[]) ? [...kept] : dealt()
  let focus = Math.max(0, chairs.indexOf(null))

  /** Who may not sit in chair i: whoever sits elsewhere, and their other halves. */
  const taken = (i: number) => {
    const out = new Set<string>()
    chairs.forEach((id, j) => { if (id && j !== i) { out.add(id); const o = half(id); if (o) out.add(o) } })
    return out
  }

  // ---- the chairs, as they stand around the table
  const seats = chairs.map((_, i) => {
    const pic = h('span', { class: 'chair-face' })
    const name = h('b')
    const epithet = h('small')
    const stand = h('button', {
      type: 'button', class: 'stand', title: 'Leave this chair empty',
      onclick: () => { chairs[i] = null; focus = i; update() },
    }, '×')
    const pick = h('button', { type: 'button', class: 'plain chair-pick', onclick: () => { focus = i; update() } }, pic)
    const step = (by: number) => () => {
      const no = taken(i)
      const options = [null, ...pool.filter((id) => !no.has(id))]
      const at = Math.max(0, options.indexOf(chairs[i]))
      chairs[i] = options[(at + by + options.length) % options.length]
      focus = i
      update()
    }
    const root = h('li', { class: 'chair' },
      h('div', { class: 'chair-row' },
        h('button', { type: 'button', class: 'arrow', 'aria-label': `Chair ${i + 1}: the one before`, onclick: step(-1) }, '‹'),
        h('div', { class: 'chair-frame' }, pick, stand),
        h('button', { type: 'button', class: 'arrow', 'aria-label': `Chair ${i + 1}: the next one`, onclick: step(1) }, '›')),
      h('p', { class: 'who' }, name, epithet))
    return { root, pic, name, epithet, pick, stand }
  })
  const row = h('ol', { class: 'chairs', 'aria-label': 'The chairs, from your left' },
    seats[0].root, seats[1].root,
    h('li', { class: 'chair deals', 'aria-hidden': 'true' },
      h('div', { class: 'chair-row' }, h('div', { class: 'chair-frame' }, h('span', { class: 'chair-face' }, face(CHARACTERS.death)))),
      h('p', { class: 'who' }, h('b', null, 'Death'), h('small', null, 'deals'))),
    seats[2].root, seats[3].root)

  // ---- everyone the player has played against, by the table they came from
  const groups = new Map<string, string[]>()
  for (const id of pool) {
    const t = CHARACTERS[id]?.table
    const where = t && TABLE_BY_ID[t]?.kind === 'tour' ? TABLE_BY_ID[t].name : 'Beyond the tour'
    groups.set(where, [...(groups.get(where) ?? []), id])
  }
  const faces = new Map<string, HTMLButtonElement>()
  const tap = (id: string) => {
    const at = chairs.indexOf(id)
    const o = half(id)
    if (at >= 0) {                                         // seated: stand them up
      chairs[at] = null
      focus = at
    } else if (o && chairs.includes(o)) {                  // the other half sits there: change places
      chairs[chairs.indexOf(o)] = id
    } else {
      chairs[focus] = id
      // on to the next empty chair, going round to the right
      const next = chairs.map((_, k) => (focus + 1 + k) % chairs.length).find((k) => !chairs[k])
      if (next !== undefined) focus = next
    }
    update()
  }
  const everyone = h('div', { class: 'pool' },
    [...groups].map(([where, ids]) => h('section', { class: 'pool-group' },
      h('h4', null, where),
      h('div', { class: 'pool-faces' }, ids.map((id) => {
        const c = CHARACTERS[id]
        const b = h('button', { type: 'button', class: 'plain pool-face', onclick: () => tap(id) },
          face(c, save.characters[id]?.beaten ? 'beaten' : 'met'),
          h('span', { class: 'badge' }),
          h('span', { class: 'pool-name' }, c?.short ?? id))
        faces.set(id, b)
        return b
      })))))

  const count = h('p', { class: 'chair-count', 'aria-live': 'polite' })
  const actions = h('div', { class: 'pick-actions' },
    count,
    h('button', { type: 'button', class: 'ghost small', onclick: () => { chairs = dealt(); focus = Math.max(0, chairs.indexOf(null)); update() } }, 'Deal me a table'),
    h('button', { type: 'button', class: 'ghost small', onclick: () => { chairs = chairs.map(() => null); focus = 0; update() } }, 'Clear the chairs'))

  function update() {
    seats.forEach((s, i) => {
      const c = chairs[i] ? CHARACTERS[chairs[i]!] : undefined
      s.root.classList.toggle('empty', !c)
      s.root.classList.toggle('focus', i === focus)
      s.pic.replaceChildren(c ? face(c, save.characters[c.id]?.beaten ? 'beaten' : 'met') : h('span', { class: 'empty-chair' }))
      s.name.textContent = c ? c.short : 'An empty chair'
      s.epithet.textContent = c ? c.epithet : i === focus ? 'tap a face below' : ''
      s.stand.hidden = !c
      s.pick.setAttribute('aria-label', `Chair ${i + 1}: ${c ? c.short : 'empty'}${i === focus ? ', picked out' : ''}`)
      s.pick.setAttribute('aria-pressed', String(i === focus))
    })
    const no = taken(-1)
    for (const [id, b] of faces) {
      const at = chairs.indexOf(id)
      b.classList.toggle('seated', at >= 0)
      b.classList.toggle('blocked', at < 0 && no.has(id))
      b.querySelector('.badge')!.textContent = at >= 0 ? String(at + 1) : ''
      b.setAttribute('aria-pressed', String(at >= 0))
      b.title = at >= 0 ? `${CHARACTERS[id]?.short}: chair ${at + 1}` : no.has(id) ? 'One chair, two men: they change places' : CHARACTERS[id]?.short ?? id
    }
    const n = chairs.filter(Boolean).length
    count.textContent = n === 1 ? `Heads up against ${CHARACTERS[chairs.find(Boolean)!]?.short}.` : COUNT[n]
    onChange([...chairs])
  }

  const el = h('section', { class: 'chair-picker', 'aria-label': 'Who sits at the table' }, row, actions, everyone)
  update()
  return { el, chairs: () => [...chairs] }
}
