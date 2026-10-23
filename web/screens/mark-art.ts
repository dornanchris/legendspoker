import { CHARACTERS, TABLE_BY_ID, type MarkData } from '../../src/content.js'
import { tableState } from '../../src/tour.js'
import type { Card } from '../../src/equity.js'
import * as store from '../store.js'
import { h } from '../dom.js'
import { PUPPETS } from '../puppet/cast.js'
import { cardEl } from './table.js'

/**
 * A picture for each mark in the ledger (the owner: "images or something for
 * each one"), made from art the game already has: the face of whoever the
 * mark is about, the room of the table it was won at, the cards it was won
 * with, the chips, or a small emblem drawn in gold. A mark about a person or a
 * table works out its own picture from its condition, so a new mark of that
 * kind needs nothing here; the rest are listed below by id.
 *
 * Nothing is shown that the ledger would not show: a face nobody has met yet,
 * or a sealed room, is a question mark or a veil until it is.
 */

type Art =
  | { kind: 'face'; id: string }
  | { kind: 'room'; table: string }
  | { kind: 'image'; url: string }
  | { kind: 'cards'; cards: string[] }
  | { kind: 'backs'; n: number; deck?: boolean }
  | { kind: 'chips'; how: 'pile' | 'tower' | 'rising' }
  | { kind: 'glyph'; glyph: keyof typeof GLYPHS }
  | { kind: 'name' }

const ART: Record<string, Art> = {
  pulled_up_a_chair: { kind: 'glyph', glyph: 'chair' },
  first_pot: { kind: 'chips', how: 'pile' },
  one_fewer: { kind: 'glyph', glyph: 'skull' },
  two_for_one: { kind: 'glyph', glyph: 'skulls' },
  // black aces and eights, as Hickok held them
  dead_mans_hand: { kind: 'cards', cards: ['As', 'Ac', '8s', '8c'] },
  // the ace of spades is the death card; he is the fourth
  four_horsemen: { kind: 'cards', cards: ['Ah', 'Ad', 'Ac', 'As'] },
  royalty: { kind: 'cards', cards: ['Th', 'Jh', 'Qh', 'Kh', 'Ah'] },
  nothing_at_all: { kind: 'cards', cards: ['7c', '2d'] },
  nerve: { kind: 'backs', n: 2 },
  all_of_it: { kind: 'chips', how: 'tower' },
  the_cards_do_not_care: { kind: 'cards', cards: ['Ks', 'Kh', 'Kd', '7c', '7s'] },
  a_chip_and_a_chair: { kind: 'glyph', glyph: 'chipChair' },
  never_in_doubt: { kind: 'chips', how: 'rising' },
  brief_acquaintance: { kind: 'glyph', glyph: 'watch' },
  known_by_name: { kind: 'name' },
  titled: { kind: 'glyph', glyph: 'laurel' },
  alea_iacta_est: { kind: 'glyph', glyph: 'die' },
  eight_tables: { kind: 'image', url: 'art/map.webp' },
  the_deck: { kind: 'backs', n: 5, deck: true },
  again: { kind: 'face', id: 'death_player' },
  regulars: { kind: 'image', url: 'art/rooms/table.webp' },
  nothing_but_time: { kind: 'glyph', glyph: 'hourglass' },
  full_ledger: { kind: 'glyph', glyph: 'ledger' },
  nice: { kind: 'cards', cards: ['6h', '9d'] },
  number_of_the_beast: { kind: 'cards', cards: ['6s', '6h', '6c'] },
  fortunes_wheel: { kind: 'cards', cards: ['Ad', '2c', '3h', '4s', '5d'] },
  great_leveller: { kind: 'glyph', glyph: 'scales' },
  a_promising_start: { kind: 'cards', cards: ['Ah', 'As'] },
  good_dog: { kind: 'cards', cards: ['Ks', '9h'] },
  sailboats: { kind: 'cards', cards: ['4h', '4c'] },
  // the bird itself, not its room
  from_the_ashes: { kind: 'face', id: 'phoenix' },
}

/** The second looks a mark is about: the one he came back in, the hat he earned. */
const LOOK_FOR: Record<string, string> = { the_return_blow: 'green_knight_bare', the_deerstalker: 'sherlock_deerstalker' }

/** What a mark's picture is: listed above, or read off its condition. */
function artFor(m: MarkData, earned: boolean): Art | null {
  if (ART[m.id]) return ART[m.id]
  const w = m.when as { type: string; character?: string; table?: string }
  // the look itself is what the mark gives: until then, the man as he was
  if (LOOK_FOR[m.id] && earned) return { kind: 'face', id: LOOK_FOR[m.id] }
  if (w.character) return { kind: 'face', id: w.character }
  if (w.table) return { kind: 'room', table: w.table }
  return null
}

/** Stacks of chips, by colour and height: a pot's mixed heap, everything, a lead that only grew. */
const CHIPS: Record<'pile' | 'tower' | 'rising', [string, number][]> = {
  pile: [['green', 3], ['black', 5], ['red', 2], ['purple', 4]],
  tower: [['black', 8], ['gold', 9], ['purple', 8]],
  rising: [['red', 2], ['green', 4], ['gold', 7]],
}

const SUITS: Record<string, Card['suit']> = { s: 'spades', h: 'hearts', d: 'diamonds', c: 'clubs' }
const card = (k: string): Card => ({ rank: k[0], suit: SUITS[k[1]] } as Card)

/**
 * The picture for a mark, in a round gilt frame, with its wax seal pressed on
 * the rim once it is written. `state` is the tile's: written, still open, or a
 * hidden one not yet written (a blank, whatever it is about).
 */
export function markArt(m: MarkData, state: 'earned' | 'open' | 'hidden'): HTMLElement {
  const art = state === 'hidden' ? null : artFor(m, state === 'earned')
  const frame = h('span', { class: `mark-art ${art ? 'k-' + art.kind : 'k-none'}`, 'aria-hidden': 'true' })
  if (art) fill(frame, art, state === 'earned')
  else frame.append(h('span', { class: 'mark-q' }, '?'))
  if (state === 'earned') frame.append(h('span', { class: 'mark-seal' }, m.title.replace(/^(The|A) /, '')[0]))
  return frame
}

function fill(frame: HTMLElement, art: Art, earned: boolean) {
  const save = store.get()
  switch (art.kind) {
    case 'face': {
      const c = CHARACTERS[art.id.replace(/_(bare|deerstalker|player)$/, '')]
      const rec = c && save.characters[c.id]
      // a face is shown once they have been met, or once their table is open to you
      const known = earned || !!rec?.met || (!!c && c.role !== 'guest' && c.table !== null && !c.arrives
        && tableState(save, c.table) !== 'sealed') || c?.role === 'dealer'
      const base = PUPPETS[art.id]?.base
      if (!known || !base) { frame.classList.replace('k-face', 'k-none'); frame.append(h('span', { class: 'mark-q' }, '?')); return }
      frame.classList.add(`t-${c?.table ?? 'none'}`)
      frame.style.backgroundImage = `url(${base}portrait.webp)`
      return
    }
    case 'room': {
      frame.style.backgroundImage = `url(art/rooms/${art.table}/backdrop.webp)`
      const t = TABLE_BY_ID[art.table]
      if (!earned && (!t || tableState(save, art.table) === 'sealed')) frame.classList.add('veiled')
      return
    }
    case 'image':
      frame.style.backgroundImage = `url(${art.url})`
      return
    case 'cards': {
      const n = art.cards.length
      const fan = h('span', { class: 'mark-fan' }, ...art.cards.map((k, i) => {
        const el = cardEl(card(k), 'tiny')
        const t = n === 1 ? 0 : i / (n - 1) - 0.5
        el.style.transform = `translate(${t * (n > 3 ? 30 : 18)}px, ${Math.abs(t) * 5}px) rotate(${t * (n > 3 ? 36 : 24)}deg)`
        return el
      }))
      frame.append(fan)
      return
    }
    case 'backs': {
      const fan = h('span', { class: `mark-fan${art.deck ? ' deck' : ''}` }, ...Array.from({ length: art.n }, (_, i) => {
        const el = cardEl(null, 'tiny')
        el.style.transform = art.deck
          ? `translate(${i * 1.2 - 3}px, ${-i * 1.6 + 3}px)`
          : `translate(${(i - 0.5) * 14}px, 0) rotate(${(i - 0.5) * 18}deg)`
        return el
      }))
      frame.append(fan)
      return
    }
    case 'chips': {
      const pile = h('span', { class: `pile ${art.how}` }, ...CHIPS[art.how].map(([c, k]) =>
        h('span', { class: 'col' }, ...Array.from({ length: k }, () => h('i', { class: `chip-side ${c}` })))))
      frame.append(pile)
      return
    }
    case 'glyph':
      frame.innerHTML = GLYPHS[art.glyph]
      return
    case 'name':
      frame.append(h('span', { class: 'mark-name-tag' }, save.player?.name || 'You'))
      return
  }
}

// ---------------------------------------------------------------- emblems
// Drawn in gold on enamel, on a 48-unit square: line work, like a jeweller's.

const svg = (body: string) =>
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`

const CHAIR = '<path d="M15 25V8.5Q15 6 17.5 6h13Q33 6 33 8.5V25"/><path d="M20 9.5v13M24 9.5v13M28 9.5v13"/>'
  + '<path d="M11 25h26l-2 6H13z"/><path d="M14 31v11M34 31v11M17 31v7M31 31v7"/>'

function skull(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + '<path d="M-12 -2a12 12 0 1 1 24 0c0 5-2 8-5 9v6H-7v-6c-3-1-5-4-5-9z"/>'
    + '<circle cx="-5" cy="-1" r="3.4" fill="currentColor" stroke="none"/><circle cx="5" cy="-1" r="3.4" fill="currentColor" stroke="none"/>'
    + '<path d="M0 3l-2 4h4z" fill="currentColor" stroke-width="1"/><path d="M-3.5 13v-3.5M0 13v-3.5M3.5 13v-3.5"/></g>'
}

function laurel(): string {
  // two sprays up from the bottom, a leaf either side of the stem at each step
  let leaves = ''
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const th = (256 - i * 25) * Math.PI / 180
      const cx = 24 + side * 15 * Math.cos(th), cy = 26 - 15 * Math.sin(th)
      const along = Math.atan2(Math.cos(th), Math.sin(th)) * 180 / Math.PI // the stem's way up, on screen
      for (const out of [-1, 1]) {
        const nx = side * -Math.cos(th) * out * 3, ny = Math.sin(th) * out * 3
        const x = (cx - nx).toFixed(1), y = (cy - ny).toFixed(1)
        const deg = (side < 0 ? along : 180 - along) + side * out * 32
        leaves += `<ellipse cx="${x}" cy="${y}" rx="4.8" ry="2" transform="rotate(${deg.toFixed(0)} ${x} ${y})" fill="currentColor" stroke="none"/>`
      }
    }
  }
  return `<path d="M21 40.5C11 37 7 28 10.5 15M27 40.5C37 37 41 28 37.5 15" stroke-width="1.4"/>${leaves}<path d="M20 42.5l4-3 4 3" stroke-width="1.8"/>`
}

const GLYPHS = {
  chair: svg(CHAIR),
  chipChair: svg(CHAIR + '<ellipse cx="24" cy="22.5" rx="6.5" ry="2.6" fill="#b3312b" stroke="#f3ecdf" stroke-width="1.4"/>'),
  skull: svg(skull(24, 22, 1.05)),
  skulls: svg(skull(15, 24, 0.72) + skull(33, 24, 0.72)),
  watch: svg('<circle cx="24" cy="28" r="14"/><path d="M22 11h4v3h-4z"/><circle cx="24" cy="7.5" r="2.6"/>'
    + '<path d="M24 28v-8M24 28l5.5 3.5"/><path d="M24 16.5v2M24 37.5v2M12.5 28h2M33.5 28h2" stroke-width="1.6"/>'),
  hourglass: svg('<path d="M13 6h22M13 42h22"/><path d="M16 6c0 10 7 12 7 18s-7 8-7 18M32 6c0 10-7 12-7 18s7 8 7 18"/>'
    + '<path d="M18.5 40c1-5 4-7 5.5-8 1.5 1 4.5 3 5.5 8z" fill="currentColor" stroke="none"/><path d="M20 13h8l-4 6z" fill="currentColor" stroke="none"/>'),
  laurel: svg(laurel()),
  die: svg('<g transform="rotate(-12 24 24)"><rect x="10" y="10" width="28" height="28" rx="5"/>'
    + ['17,17', '31,17', '24,24', '17,31', '31,31'].map((p) => { const [x, y] = p.split(','); return `<circle cx="${x}" cy="${y}" r="2.6" fill="currentColor" stroke="none"/>` }).join('')
    + '</g>'),
  ledger: svg('<path d="M24 13C18 9 11 9 6 11v27c5-2 12-2 18 2 6-4 13-4 18-2V11c-5-2-12-2-18 2z"/><path d="M24 13v27"/>'
    + '<path d="M10 17h10M10 22h10M10 27h10M28 17h10M28 22h10M28 27h7" stroke-width="1.5"/>'
    + '<path d="M9 17h12M9 22h12M9 27h12M27 17h12M27 22h12" stroke="#b3312b" stroke-width="1.1"/>'),
  scales: svg('<path d="M24 9v31M16 41h16M9 15h30"/><circle cx="24" cy="8" r="2"/>'
    + '<path d="M9 15l-4 13M9 15l4 13M39 15l-4 13M39 15l4 13"/><path d="M4 28q5 6 10 0zM34 28q5 6 10 0z" fill="currentColor" fill-opacity=".25"/>'),
}
