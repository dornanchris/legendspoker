import { STORY } from '../../src/content.js'
import type { Pace } from '../../src/save.js'
import * as store from '../store.js'
import { h, go } from '../dom.js'
import { header } from './shared.js'

/**
 * Settings (BUILD-PLAN screen 10). Only controls that do something today:
 * there is no audio yet, so there are no volume sliders pretending otherwise.
 */
export function settingsScreen(root: HTMLElement): void {
  const save = store.get()
  const s = save.settings

  const toggle = (label: string, hint: string, key: 'showLog' | 'reduceMotion' | 'fastForward' | 'largeText') => {
    const input = h('input', { type: 'checkbox', checked: s[key] }) as HTMLInputElement
    input.addEventListener('change', () => {
      store.update((x) => { x.settings[key] = input.checked })
      store.applySettings()
    })
    return h('label', { class: 'setting' }, input, h('span', null, h('b', null, label), h('small', null, hint)))
  }

  const paces: [Pace, string][] = [['unhurried', 'Unhurried'], ['normal', 'Normal'], ['brisk', 'Brisk']]
  const pace = h('div', { class: 'segmented', role: 'radiogroup', 'aria-label': 'Table pace' },
    paces.map(([v, label]) => {
      const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(s.pace === v), class: s.pace === v ? 'on' : '' }, label)
      b.addEventListener('click', () => {
        store.update((x) => { x.settings.pace = v })
        for (const o of pace.children) { o.classList.remove('on'); o.setAttribute('aria-checked', 'false') }
        b.classList.add('on')
        b.setAttribute('aria-checked', 'true')
      })
      return b
    }))

  const nameInput = h('input', { type: 'text', maxlength: '24', value: save.player?.name ?? '', 'aria-label': 'Your name' }) as HTMLInputElement
  nameInput.addEventListener('change', () => {
    const name = nameInput.value.replace(/\s+/g, ' ').trim()
    if (!name || !save.player) { nameInput.value = save.player?.name ?? ''; return }
    store.update((x) => { if (x.player) x.player.name = name })
  })

  const erase = h('button', { type: 'button', class: 'danger' }, 'Forget everything')
  erase.addEventListener('click', () => {
    if (!confirm('Erase your whole Invitational — every table, every name, every line in the ledger? This cannot be undone.')) return
    store.erase()
    go('/')
  })

  root.append(h('div', { class: 'screen settings-screen' },
    header('Settings'),
    h('div', { class: 'settings-body' },
      !store.isDurable()
        ? h('p', { class: 'warning' }, 'This browser is not letting the game save. Progress will last until the page is closed.')
        : null,
      save.player ? h('label', { class: 'setting stacked' }, h('b', null, 'Your name, as signed'), nameInput) : null,
      h('div', { class: 'setting stacked' }, h('b', null, 'Table pace'),
        h('small', null, 'How quickly the table is shown to you. It never changes how a hand plays.'), pace),
      toggle('Fast-forward', 'Offer a fast-forward once you are out of a hand. Stops by itself at the showdown.', 'fastForward'),
      toggle('Show the log', 'Every action and every word, written down beside the table.', 'showLog'),
      toggle('Larger text', 'Everything a size bigger.', 'largeText'),
      toggle('Reduce motion', 'No sliding, fading or glowing.', 'reduceMotion'),
      save.player ? h('div', { class: 'setting stacked danger-zone' }, h('b', null, 'Start over'),
        h('small', null, 'Tear up the invitation and begin again from the first table.'), erase) : null)))
}

export function aboutScreen(root: HTMLElement): void {
  root.append(h('div', { class: 'screen about-screen' },
    header('About'),
    h('div', { class: 'about-body' },
      h('p', { class: 'brand' }, 'Legends Poker'),
      h('h2', null, 'Death’s Invitational'),
      h('p', { class: 'epigraph' }, STORY.epigraph),
      h('p', null, 'A single-player Texas Hold’em tour of eight tables of legends from history, myth and literature, with one dealer at every one of them. A spiritual successor to Imagine Poker (Candywriter, 2008).'),
      h('p', null, 'Made by one person, on no budget. This is a work in progress: the characters are names and words for now, and faces come later.'),
      h('h3', null, 'The legends'),
      h('p', null, 'Every character is a public-domain figure: people from history, figures of myth and folklore, and characters from literature old enough to belong to everyone. None is drawn from any film, show or modern book.'),
      h('h3', null, 'Built with'),
      h('ul', { class: 'plain-list' },
        h('li', null, h('b', null, 'poker-ts'), ' — the rules of the table. © 2021 Claudijo Borovic, MIT licence.'),
        h('li', null, h('b', null, 'pokersolver'), ' — hand evaluation. © 2016 James Simpson and GoldFire Studios, Inc., MIT licence.')),
      h('p', { class: 'dim small' }, 'Full licence texts ship in node_modules/poker-ts/LICENSE and node_modules/pokersolver/LICENSE.md.'))))
}
