/**
 * The whole "framework": one element builder. Screens are plain functions
 * that build DOM and return a cleanup. BUILD-PLAN pencils in React for Phase
 * 4; every screen here is a render function with no shared mutable DOM, so
 * each ports to a component one-for-one when that happens.
 */
type Child = Node | string | number | null | undefined | false
type Props = Record<string, any>

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Props | null = null,
  ...children: (Child | Child[])[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag)
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v === undefined || v === null || v === false) continue
      if (k === 'class') el.className = String(v)
      else if (k === 'text') el.textContent = String(v)
      else if (k.startsWith('on') && typeof v === 'function') {
        el.addEventListener(k.slice(2).toLowerCase(), v)
      } else if (k === 'dataset') Object.assign(el.dataset, v)
      else if (v === true) el.setAttribute(k, '')
      else el.setAttribute(k, String(v))
    }
  }
  for (const c of children.flat()) {
    if (c === null || c === undefined || c === false) continue
    el.append(c instanceof Node ? c : String(c))
  }
  return el
}

export const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector(sel) as T | null

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export function go(route: string): void {
  location.hash = route.startsWith('#') ? route : `#${route}`
}

export function formatChips(n: number): string {
  return n.toLocaleString('en-US')
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`
}

/**
 * Ask before something that cannot be undone, in the game's own panel (the
 * Menu's): the browser's confirm() was the only native dialog in the game,
 * and in the app it shows the app's name over the felt. Resolves true for yes.
 */
export function ask(question: string, yes: string, no = 'Not now'): Promise<boolean> {
  return new Promise((done) => {
    const close = (answer: boolean) => {
      veil.remove()
      window.removeEventListener('keydown', onKey, true)
      done(answer)
    }
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') { ev.stopPropagation(); close(false) }
    }
    const keep = h('button', { type: 'button', class: 'primary', onclick: () => close(false) }, no)
    const veil = h('div', { class: 'table-menu ask', role: 'alertdialog', 'aria-modal': 'true', 'aria-label': question },
      h('div', { class: 'menu-panel' },
        h('p', null, question),
        h('div', { class: 'ask-actions' },
          keep,
          h('button', { type: 'button', class: 'danger', onclick: () => close(true) }, yes))))
    veil.addEventListener('click', (ev) => { if (ev.target === veil) close(false) })
    window.addEventListener('keydown', onKey, true)
    document.body.append(veil)
    keep.focus()
  })
}
