import { STORY } from '../../src/content.js'
import { fillLine } from '../../src/tour.js'
import * as store from '../store.js'
import { h, go } from '../dom.js'

/**
 * The ending. You won the last hand; Death hands you the deck. Story reward
 * and mechanical reward are the same event (design doc), so this is quiet:
 * a few paragraphs, one at a time, and then the book.
 */
export function endingScreen(root: HTMLElement): void {
  const save = store.get()
  if (!save.player || !save.tables.finale?.cleared) { go('/'); return }
  const name = save.player.name
  const paras = STORY.ending.paragraphs.map((p) => h('p', { class: 'reveal' }, fillLine(p, undefined, name)))
  const actions = h('div', { class: 'actions', hidden: true },
    h('button', { type: 'button', class: 'primary', onclick: () => go('/ledger') }, 'The Ledger'),
    h('button', { type: 'button', class: 'ghost', onclick: () => go('/') }, 'Title'))
  const body = h('div', { class: 'ending-body' }, h('h1', null, STORY.ending.title))
  root.append(h('div', { class: 'screen ending-screen' }, body))
  store.update((s) => { s.story.endingSeen = true })

  let i = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  const next = () => {
    clearTimeout(timer)
    if (!body.isConnected) return
    if (i < paras.length) {
      body.append(paras[i++])
      timer = setTimeout(next, 2600)
    } else if (actions.hidden) {
      body.append(actions)
      actions.hidden = false
    }
  }
  body.addEventListener('click', () => { if (i < paras.length) next() })
  timer = setTimeout(next, 800)
}
