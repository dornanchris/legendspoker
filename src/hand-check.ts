/**
 * REGRESSION GUARD: poker-ts must rank hands correctly.
 *
 * poker-ts decides who is paid at showdown with its own evaluator
 * (lib/hand.js), separate from the pokersolver the AI thinks with. Left
 * alone it gets two things wrong, both fixed in patches/poker-ts+1.5.0.patch:
 *
 *   - Two sets of trips (9-9-9 and 4-4-4 among the seven cards) were ranked
 *     THREE OF A KIND, not a full house, so a player holding nines full of
 *     fours lost to fours full of nines. It only asked whether the group after
 *     the trips was exactly a pair.
 *   - Four of a kind skipped the highest remaining card when picking the
 *     kicker (it took cards.slice(5) where it meant slice(4)), so AAAA-K
 *     could tie or lose to AAAA-Q.
 *
 * This deals random hands and asks both evaluators who wins. They must agree
 * every time. If this ever fails again, the patch did not apply.
 *
 * Run: npm run check:hands [pairs]
 */
import pkg from 'pokersolver'
import { createRequire } from 'node:module'

const { Hand: Solver } = pkg as any
const require = createRequire(import.meta.url)
const PtHand = require('poker-ts/dist/lib/hand.js').default
const PtCard = require('poker-ts/dist/lib/card.js').default

const PAIRS = Number(process.argv[2] ?? 200000)
const RANKS = '23456789TJQKA'
const SUITS = 'cdhs'
// Seeded, so a failure reproduces. Not the game RNG: this never deals a hand.
let s = 0x2f6e2b1
const rand = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32)

type C = { r: number; s: number }
const deck: C[] = []
for (let r = 0; r < 13; r++) for (let su = 0; su < 4; su++) deck.push({ r, s: su })

function draw(n: number): C[] {
  const d = deck.slice()
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(rand() * (d.length - i))
    ;[d[i], d[j]] = [d[j], d[i]]
  }
  return d.slice(0, n)
}

const pt = (cs: C[]) => PtHand.of(cs.map((c) => new PtCard(c.r, c.s)))
const ps = (cs: C[]) => Solver.solve(cs.map((c) => RANKS[c.r] + SUITS[c.s]))
const name = (cs: C[]) => cs.map((c) => RANKS[c.r] + SUITS[c.s]).join(' ')

/** <0: a wins, >0: b wins, 0: split. */
function solverOrder(a: C[], b: C[]): number {
  const ha = ps(a)
  const hb = ps(b)
  const w = Solver.winners([ha, hb])
  return w.length === 2 ? 0 : w[0] === ha ? -1 : 1
}

let bad = 0
const shown: string[] = []
const check = (a: C[], b: C[]) => {
  const want = solverOrder(a, b)
  const got = Math.sign(PtHand.compare(pt(a), pt(b)))
  if (want !== got) {
    bad++
    if (shown.length < 8) shown.push(`  ${name(a)}  vs  ${name(b)}: solver ${want}, poker-ts ${got}`)
  }
}

// Two players on one board, as at the table: kickers and board-plays matter.
for (let i = 0; i < PAIRS; i++) {
  const d = draw(9)
  const board = d.slice(4)
  check([d[0], d[1], ...board], [d[2], d[3], ...board])
}
// Hands built to hit the shapes that went wrong, which random deals rarely do.
for (let i = 0; i < PAIRS / 10; i++) {
  const [x, y] = draw(2).map((c) => c.r)
  if (x === y) continue
  const rest = deck.filter((c) => c.r !== x && c.r !== y)
  const pick = (r: number, n: number) => deck.filter((c) => c.r === r).sort(() => rand() - 0.5).slice(0, n)
  const one = rest[Math.floor(rand() * rest.length)]
  const twoTrips = [...pick(x, 3), ...pick(y, 3), one]
  const quads = [...pick(x, 4), ...draw(52).filter((c) => c.r !== x).slice(0, 3)]
  check(twoTrips, [...pick(y, 3), ...pick(x, 3), one])
  const other = draw(7)
  check(twoTrips, other)
  check(quads, other)
  // Same quads, different kickers.
  const q2 = [...quads.slice(0, 4), ...draw(52).filter((c) => c.r !== x).slice(0, 3)]
  check(quads, q2)
}

if (bad) {
  console.log(`FAIL: poker-ts disagreed with pokersolver on ${bad} hands. First few:`)
  for (const line of shown) console.log(line)
  process.exit(1)
}
console.log(`PASS: poker-ts ranked ${PAIRS + Math.round(PAIRS / 10) * 4} comparisons exactly as pokersolver does.`)
