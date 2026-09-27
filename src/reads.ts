/**
 * `npm run reads [ids]` -- how each character reads a bet, in two spots
 * players notice. Not a pass/fail check; a report to read after touching
 * decide(), betRange(), equity or a `betRespect` dial.
 *
 *   1. A short stack shoves 5bb and it costs the big blind 5% of their chips.
 *      Calling nearly everything is right: the price is tiny and it can end
 *      someone's tournament. Before the fix most characters called 2-18%.
 *   2. A pot-sized bet on the flop into a hand with nothing -- no pair, no
 *      flush or straight draw. Folding is right; a bluff-raise is character.
 *      Before the fix most called it 30-40% of the time.
 *
 * Calling stations (low `betRespect`) are meant to stand out in column 2.
 */
import pkg from 'pokersolver'
import { decide, betRange, type DecisionContext } from './decide.js'
import { handStrength, preflopStrength, type Card } from './equity.js'
import * as content from './content.js'
import { mulberry32 } from './rng.js'

const { Hand } = pkg as any
const RANKS = '23456789TJQKA'
const SUITS: Card['suit'][] = ['clubs', 'diamonds', 'hearts', 'spades']
const fresh = (): Card[] => RANKS.split('').flatMap((r) => SUITS.map((suit) => ({ rank: r, suit }) as Card))
const rng = mulberry32(31337)
const draw = (d: Card[], n: number) => {
  for (let i = 0; i < n; i++) {
    const k = i + Math.floor(rng() * (d.length - i))
    ;[d[i], d[k]] = [d[k], d[i]]
  }
  return d.splice(0, n)
}
/** No pair and no four-flush or open-ended straight draw. */
function nothing(cards: Card[]): boolean {
  if (Hand.solve(cards.map((c) => c.rank + c.suit[0])).rank !== 1) return false
  if (SUITS.some((s) => cards.filter((c) => c.suit === s).length >= 4)) return false
  const v = [...new Set(cards.map((c) => RANKS.indexOf(c.rank)))]
  return !v.some((x) => [1, 2, 3].every((k) => v.includes(x + k)))
}

const ids = process.argv[2]?.split(',') ?? content.TOUR.flatMap((t) => content.fullCast(t)).concat('death')
const N = 400
const pc = (n: number, of: number) => `${Math.round((n / Math.max(1, of)) * 100)}%`.padStart(6)
console.log('character        bet respect | calls 5bb shove | nothing vs pot bet: calls raises')
for (const id of ids) {
  const p = content.personality(id)
  const range = (base: number) => Math.round((1 - p.betRespect * (1 - base)) * 20) / 20
  const ctx = (o: Partial<DecisionContext>): DecisionContext => ({
    personality: p, equity: 0, strength: 0, pot: 0, toCall: 0, stack: 0, bigBlind: 20,
    effectiveStackBB: 0, minRaise: 0, maxRaise: 0, street: 'preflop', legal: ['fold', 'call'],
    numOpponents: 1, tilt: 0, opponentFoldRate: 0.4, committed: 0, facingAllIn: false, bet: 0, initiative: false, outs: 0, wet: 0, rng, ...o,
  })
  let shove = 0
  let seen = 0
  let calls = 0
  let raises = 0
  for (let i = 0; i < N; i++) {
    let hole = draw(fresh(), 2)
    let r = range(betRange({ street: 'preflop', toCall: 80, pot: 130, bigBlind: 20, allIn: true, bettorBB: 5 }))
    const eq = handStrength(hole, [], 1, 60, rng, r)
    const d1 = decide(ctx({ equity: eq, strength: preflopStrength(hole), pot: 130, toCall: 80, stack: 1980, effectiveStackBB: 99, committed: 20, bet: 20, facingAllIn: true }))
    if (d1.action === 'call') shove++

    const deck = fresh()
    hole = draw(deck, 2)
    const board = draw(deck, 3)
    if (!nothing([...hole, ...board])) continue
    seen++
    r = range(betRange({ street: 'flop', toCall: 200, pot: 400, bigBlind: 20, allIn: false, bettorBB: 20 }))
    const e2 = handStrength(hole, board, 1, 60, rng, r)
    const d2 = decide(ctx({ equity: e2, strength: e2, pot: 400, toCall: 200, stack: 1600, effectiveStackBB: 80, minRaise: 400, maxRaise: 1600, street: 'flop', legal: ['fold', 'call', 'raise'], committed: 200 }))
    if (d2.action === 'call') calls++
    if (d2.action === 'raise') raises++
  }
  console.log(`${p.name.padEnd(20)} ${p.betRespect.toFixed(2).padStart(7)} | ${pc(shove, N).padStart(15)} | ${pc(calls, seen).padStart(25)} ${pc(raises, seen)}`)
}
