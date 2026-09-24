import { STORY, TABLE_BY_ID } from '../../src/content.js'
import * as store from '../store.js'
import { h, go } from '../dom.js'

/**
 * Title / home (BUILD-PLAN screen 2). Continue, the tour, the ledger,
 * settings. No multiplayer entry: multiplayer is unscoped (Phase 10), and a
 * button that leads nowhere is noise.
 */
export function titleScreen(root: HTMLElement): void {
  const save = store.get()
  const menu = h('nav', { class: 'menu', 'aria-label': 'Main menu' })
  const item = (label: string, route: string, cls = '', sub = '') =>
    h('button', { type: 'button', class: `menu-item ${cls}`, onclick: () => go(route) },
      h('span', null, label), sub ? h('small', null, sub) : null)

  if (!save.player) {
    menu.append(item('Accept the invitation', '/invite', 'primary', 'Eight tables. One dealer.'))
  } else if (save.active) {
    const t = TABLE_BY_ID[save.active.table]
    menu.append(item('Return to your seat', '/table', 'primary', `${t?.name ?? ''}${save.active.mode === 'open' ? ' · open table' : ''}`))
    menu.append(item('The Tour', '/tour'))
  } else {
    menu.append(item('Continue the tour', '/tour', 'primary', `as ${save.player.name}`))
  }
  if (save.player) menu.append(item('The Ledger', '/ledger'))
  menu.append(item('Settings', '/settings'), item('About', '/about'))

  root.append(
    h('div', { class: 'screen title-screen' },
      h('div', { class: 'title-block' },
        h('p', { class: 'brand' }, 'Legends Poker'),
        h('h1', null, 'Death’s Invitational'),
        h('p', { class: 'epigraph' }, STORY.epigraph)),
      menu),
  )
}

/**
 * The first screen a new player sees: an invitation, and a line to sign.
 * Onboarding without a tutorial (BUILD-PLAN 2B: "The White House is the
 * tutorial"). The name signed here is what the tables will eventually call
 * you -- once you have earned it.
 */
export function invitationScreen(root: HTMLElement): void {
  const save = store.get()
  const inv = STORY.invitation
  const input = h('input', {
    type: 'text', maxlength: '24', autocomplete: 'off', spellcheck: 'false',
    placeholder: 'your name', 'aria-label': inv.sign_prompt, value: save.player?.name ?? '',
  }) as HTMLInputElement
  const accept = h('button', { type: 'submit', class: 'primary' }, inv.accept)
  const error = h('p', { class: 'error', 'aria-live': 'polite' })

  const form = h('form', { class: 'sign' },
    h('label', null, h('span', null, inv.sign_prompt), input),
    accept, error)
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const name = input.value.replace(/\s+/g, ' ').trim()
    if (!name) {
      error.textContent = 'An invitation must be signed.'
      input.focus()
      return
    }
    store.update((s) => {
      s.player = { name, invitedAt: s.player?.invitedAt ?? new Date().toISOString() }
    })
    go('/tour')
  })

  root.append(
    h('div', { class: 'screen invitation-screen' },
      h('article', { class: 'invitation' },
        h('h1', null, inv.heading),
        inv.body.map((p) => h('p', null, p)),
        h('p', { class: 'signature' }, inv.signature),
        form),
      h('button', { type: 'button', class: 'ghost small corner', onclick: () => go('/') }, '‹ Not yet')),
  )
  setTimeout(() => input.focus(), 50)
}
