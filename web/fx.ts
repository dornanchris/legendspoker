import { h } from './dom.js'

/**
 * Things that move across the felt: cards dealt out of Death's hands, chips
 * pushed in and raked back. Pure presentation. Nothing here knows about a
 * hand; it moves elements from one box to another and says when they land.
 *
 * Every flight is cosmetic. The table updates its own state the moment an
 * event arrives and only DRAWS the result when a flight lands, so a flight
 * that is cut short (a new hand, a screen change) can never leave the table
 * showing something false.
 */

export type Pt = { x: number; y: number }

/** An element's centre in the coordinates of `space` (the felt). */
export function centre(el: Element, space: Element): Pt {
  const a = el.getBoundingClientRect()
  const b = space.getBoundingClientRect()
  return { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2 }
}

type FlightOpts = {
  delay?: number
  /** Pixels the path bows upward at its midpoint. */
  arc?: number
  /** Degrees of turn picked up in the air. */
  spin?: number
  /** Scale at take-off; lands at 1. */
  from?: number
  /** Scale on landing, for things that vanish into a pile. */
  to?: number
  fade?: boolean
}

/**
 * Fly `el` across `layer` from `a` to `b`, then remove it. Resolves when it
 * lands -- at once when `ms` is 0, which is what reduced motion and a silent
 * replay ask for.
 */
export function fly(layer: HTMLElement, el: HTMLElement, a: Pt, b: Pt, ms: number, o: FlightOpts = {}): Promise<void> {
  if (ms <= 0 || !layer.isConnected) return Promise.resolve()
  el.classList.add('flyer')
  el.style.left = `${b.x}px`
  el.style.top = `${b.y}px`
  layer.append(el)
  const dx = a.x - b.x
  const dy = a.y - b.y
  const at = (x: number, y: number, s: number, r: number) =>
    `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${r}deg) scale(${s})`
  const s0 = o.from ?? 1
  const s1 = o.to ?? 1
  const spin = o.spin ?? 0
  const frames: Keyframe[] = [
    { transform: at(dx, dy, s0, -spin), opacity: 1 },
    { transform: at(dx / 2, dy / 2 - (o.arc ?? 0), (s0 + s1) / 2, -spin / 3), offset: 0.5 },
    { transform: at(0, 0, s1, 0), opacity: o.fade ? 0 : 1 },
  ]
  const anim = el.animate(frames, {
    duration: ms,
    delay: o.delay ?? 0,
    easing: 'cubic-bezier(.25,.7,.35,1)',
    // Held at both ends: waiting in Death's hand before its turn to fly, and
    // sitting on its spot until it is removed.
    fill: 'both',
  })
  return anim.finished.then(
    () => el.remove(),
    () => el.remove(),
  )
}

/**
 * Turn a face-down card over where it lies: the back narrows to an edge, the
 * face widens out of it. `back` is replaced by `face` at the midpoint.
 */
export function flipOver(back: HTMLElement, face: HTMLElement, ms: number, delay = 0): Promise<void> {
  if (ms <= 0 || !back.isConnected) {
    back.replaceWith(face)
    face.style.visibility = ''
    return Promise.resolve()
  }
  const half = ms / 2
  const a = back.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.02)' }], {
    duration: half, delay, easing: 'ease-in', fill: 'forwards',
  })
  return a.finished.then(() => {
    back.replaceWith(face)
    face.style.visibility = ''
    return face.animate([{ transform: 'scaleX(0.02)' }, { transform: 'scaleX(1)' }], {
      duration: half, easing: 'ease-out',
    }).finished.then(() => {}, () => {})
  }, () => {
    back.replaceWith(face)
    face.style.visibility = ''
  })
}

// ------------------------------------------------------------------ chips

/**
 * Denominations, largest first. Chip colours follow the usual casino
 * convention closely enough that a stack reads as money at a glance.
 */
const DENOMS: [number, string][] = [
  [5000, 'orange'], [1000, 'gold'], [500, 'purple'], [100, 'black'], [25, 'green'], [5, 'red'], [1, 'white'],
]

/** The chips an amount would be paid in, largest first. */
function breakdown(amount: number): string[] {
  const out: string[] = []
  let left = Math.max(0, Math.round(amount))
  for (const [v, colour] of DENOMS) {
    const n = Math.floor(left / v)
    for (let i = 0; i < n; i++) out.push(colour)
    left -= n * v
  }
  return out
}

/** One chip seen from above, for flights. */
export function chipDisc(colour: string): HTMLElement {
  return h('span', { class: `chip ${colour}` })
}

/** Colours for a flight of `n` chips carrying `amount`: the biggest ones first. */
export function flightColours(amount: number, n: number): string[] {
  const all = breakdown(amount)
  if (!all.length) return Array(n).fill('red')
  // Spread the picks across the breakdown so a big bet shows its big chips
  // and still has a few small ones rattling along behind.
  return Array.from({ length: n }, (_, i) => all[Math.min(all.length - 1, Math.floor((i / n) * all.length))])
}

/**
 * A pile of chips seen from the side: up to `cols` columns, one per
 * denomination, each up to `high` chips tall. Drawn from the amount, so the
 * pile has visible weight -- a pot of 3,000 looks it.
 */
export function drawPile(el: HTMLElement, amount: number, cols = 3, high = 7): void {
  const chips = breakdown(amount)
  const byColour = new Map<string, number>()
  for (const c of chips) byColour.set(c, (byColour.get(c) ?? 0) + 1)
  const columns = [...byColour].slice(0, cols)
  el.replaceChildren(...columns.map(([colour, n]) =>
    h('span', { class: 'col' }, ...Array.from({ length: Math.min(n, high) }, () => h('i', { class: `chip-side ${colour}` })))))
}

/** How many chips a flight of this size carries. Grows slowly: a shove pours, a blind ticks. */
export function chipCount(amount: number, bigBlind: number): number {
  if (amount <= 0) return 0
  const bb = amount / Math.max(1, bigBlind)
  return Math.max(1, Math.min(9, Math.round(1.5 + Math.log2(bb + 0.5) * 1.4)))
}
