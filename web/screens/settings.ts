import { STORY } from '../../src/content.js'
import type { Pace, DialogueLevel, Settings } from '../../src/save.js'
import * as store from '../store.js'
import { h, go } from '../dom.js'
import { header } from './shared.js'
import * as sound from '../sound.js'
import { ACCENTS, type AccentName } from '../puppet/accent.js'

type Flag = 'reduceMotion' | 'fastForward' | 'largeText' | 'sound' | 'log'

/** A switch for one setting, saved as it is flipped. Shared with the table's menu. */
export function toggleSetting(label: string, hint: string, key: Flag, after?: (on: boolean) => void): HTMLElement {
  const input = h('input', { type: 'checkbox', checked: store.get().settings[key] }) as HTMLInputElement
  input.addEventListener('change', () => {
    store.update((x) => { x.settings[key] = input.checked })
    store.applySettings()
    after?.(input.checked)
  })
  return h('label', { class: 'setting' }, input, h('span', null, h('b', null, label), h('small', null, hint)))
}

/** One of a few choices for a setting, as a row of buttons. Shared with the table's menu. */
export function choiceSetting<K extends 'pace' | 'dialogue'>(
  label: string, hint: string, key: K, options: [Settings[K], string][], after?: (v: Settings[K]) => void,
): HTMLElement {
  const now = store.get().settings[key]
  const row = h('div', { class: 'segmented', role: 'radiogroup', 'aria-label': label },
    options.map(([v, text]) => {
      const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(now === v), class: now === v ? 'on' : '' }, text)
      b.addEventListener('click', () => {
        store.update((x) => { x.settings[key] = v })
        for (const o of row.children) { o.classList.remove('on'); o.setAttribute('aria-checked', 'false') }
        b.classList.add('on')
        b.setAttribute('aria-checked', 'true')
        after?.(v)
      })
      return b
    }))
  return h('div', { class: 'setting stacked' }, h('b', null, label), hint ? h('small', null, hint) : null, row)
}

export const PACES: [Pace, string][] = [['unhurried', 'Unhurried'], ['normal', 'Normal'], ['brisk', 'Brisk']]
export const DIALOGUE_LEVELS: [DialogueLevel, string][] = [['all', 'All'], ['less', 'Less'], ['story', 'Story'], ['off', 'Off']]
export const DIALOGUE_HINT = 'Table talk: banter, asides, the words that go in with the chips. Story keeps only what the tour needs; Off says nothing at all.'
export const LOG_HINT = 'The play-by-play beside the table.'

/** A computer, not a phone: the log is offered only where there is a mouse and room for it. */
export const canLog = (): boolean => matchMedia('(hover: hover) and (pointer: fine)').matches

/**
 * Settings (BUILD-PLAN screen 10). Only controls that do something today:
 * sound is cards and chips, so there is one volume, not a music slider
 * pretending there is music.
 */
export function settingsScreen(root: HTMLElement): void {
  const save = store.get()
  const s = save.settings

  const toggle = (label: string, hint: string, key: Flag) => toggleSetting(label, hint, key, (on) => {
    if (key === 'sound') {
      volume.disabled = !on
      if (on) sound.chips(3)
    }
  })

  // Hear it as you set it: a few chips land at the new level.
  const volume = h('input', {
    type: 'range', min: '0', max: '100', step: '5', value: String(Math.round(s.volume * 100)),
    class: 'volume', 'aria-label': 'Volume', disabled: !s.sound,
  }) as HTMLInputElement
  volume.addEventListener('change', () => {
    store.update((x) => { x.settings.volume = Number(volume.value) / 100 })
    store.applySettings()
    sound.chips(3)
  })

  // the player's colour: free to choose, so their own figure is a little their own
  const colour = h('div', { class: 'segmented swatches', role: 'radiogroup', 'aria-label': 'Your colour' },
    (Object.entries(ACCENTS) as [AccentName, (typeof ACCENTS)[AccentName]][]).map(([v, a]) => {
      const on = (s.accent ?? 'teal') === v
      const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(on), class: on ? 'on' : '', title: a.label },
        h('i', { class: 'swatch', style: `background:${a.swatch}` }), a.label)
      b.addEventListener('click', () => {
        store.update((x) => { x.settings.accent = v })
        for (const o of colour.children) { o.classList.remove('on'); o.setAttribute('aria-checked', 'false') }
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
      h('div', { class: 'setting stacked' }, h('b', null, 'Your colour'), h('small', null, 'A colour of your own.'), colour),
      choiceSetting('Table pace', 'How quickly the table is shown to you. It never changes how a hand plays.', 'pace', PACES),
      choiceSetting('Dialogue', DIALOGUE_HINT, 'dialogue', DIALOGUE_LEVELS),
      toggle('Sound', 'Cards dealt, chips pushed, the knock of a check.', 'sound'),
      h('label', { class: 'setting stacked' }, h('b', null, 'Volume'), volume),
      toggle('Fast-forward', 'Offer a fast-forward once you are out of a hand. Stops by itself at the showdown.', 'fastForward'),
      toggle('Larger text', 'Everything a size bigger.', 'largeText'),
      toggle('Reduce motion', 'No sliding, fading or glowing.', 'reduceMotion'),
      canLog() ? toggle('Log', LOG_HINT, 'log') : null,
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
