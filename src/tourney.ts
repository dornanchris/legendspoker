import { Game, DEFAULT_LEVELS, type Arrival } from './game.js'
import { CAST, type Personality } from './personality.js'
import { mulberry32 } from './rng.js'

/**
 * PHASE 3a EXIT TEST
 *
 * The sim measures whether characters play differently. This measures
 * whether a TABLE ENDS -- which is the thing the tournament model exists
 * to guarantee. What you want:
 *  - Every table completes. A single stall means the blind schedule can
 *    not outrun the stacks, and a player would sit there forever.
 *  - A sane spread of table lengths. All tables the same length means the
 *    blinds are steamrolling the poker; a long tail means they are too flat.
 *  - Finishing positions that track the dials, not noise.
 *
 * A table that never ends is not a slow table, it is a broken one, so the
 * stall count is the number that actually gates this phase.
 *
 * Note on seeds: each table is seeded, so a stall can be reproduced exactly
 * by re-running with the same seed rather than hunted for. The seeds differ
 * per table, so "every table ends" is still a claim about varied deals.
 */

const TABLES = Number(process.argv[2] ?? 100)
const HAND_CAP = 2000 // far past any sane table; only a stall reaches it

/**
 * Optional second argument: a table id from data/tables, to run that table
 * as the tour plays it -- its cast, its blind pace, and its late arrival.
 * Without one this is the Phase 3a test against the frozen Phase 2 cast.
 *
 *   npm run tourney 100 athens
 */
const TABLE_ID = process.argv[3]
let cast: Personality[] = CAST
let arrivals: Arrival[] = []
let HANDS_PER_LEVEL = 25
let BUY_IN = 2000
let title = ''
if (TABLE_ID) {
  const content = await import('./content.js')
  const t = content.TABLE_BY_ID[TABLE_ID]
  if (!t) {
    console.error(`no table "${TABLE_ID}". Tables: ${content.TABLES.map((x) => x.id).join(', ')}`)
    process.exit(1)
  }
  title = t.name
  cast = t.seats.map(content.personality)
  // The finale is you against the dealer: one seat. Measure it against a
  // stand-in -- the first champion of the tour -- in place of the player.
  if (cast.length < 2) {
    const standIn = content.TOUR[0].champion!
    cast = [content.personality(standIn), ...cast]
    title += ` (${content.CHARACTERS[standIn].short} standing in for the player)`
  }
  HANDS_PER_LEVEL = t.handsPerLevel
  BUY_IN = t.buyIn
  if (t.arrival) {
    arrivals = [{
      personality: content.personality(t.arrival.character),
      afterEliminations: t.arrival.afterEliminations,
      afterEliminationOf: t.arrival.afterEliminationOf,
      delayHands: t.arrival.delayHands,
      stack: t.arrival.stack,
    }]
  }
}
const everyone = [...cast, ...arrivals.map((a) => a.personality)]

const lengths: number[] = []
const finishes = new Map<string, number[]>()
for (const p of everyone) finishes.set(p.name, new Array(everyone.length).fill(0))
const arrived = new Map<string, number>()
let stalls = 0
let leaks = 0

const t0 = Date.now()
for (let table = 0; table < TABLES; table++) {
  // Finishing places come from the elimination events, by character: a chair
  // can be filled twice once someone arrives late.
  const placed: { name: string; place: number }[] = []
  const game: Game = new Game(cast, {
    mode: 'tournament',
    buyIn: BUY_IN,
    rollouts: 60,
    rng: mulberry32(20260901 + table),
    handsPerLevel: HANDS_PER_LEVEL,
    arrivals,
    onEvent: arrivals.length
      ? (e) => {
          if (e.type === 'eliminated') placed.push({ name: nameOf(e.id), place: e.place })
          if (e.type === 'arrival') arrived.set(nameOf(e.id), (arrived.get(nameOf(e.id)) ?? 0) + 1)
        }
      : undefined,
  })

  let hands = 0
  while (!game.isComplete() && hands < HAND_CAP) {
    await game.playHand()
    hands++
  }

  if (game.isComplete()) {
    lengths.push(hands)
    if (arrivals.length) {
      const winner = game.survivors()[0]
      placed.push({ name: game.getSeats()[winner].personality.name, place: 1 })
      for (const { name, place } of placed) finishes.get(name)![place - 1]++
    } else {
      game.standings().forEach((seat, place) => {
        finishes.get(cast[seat].name)![place]++
      })
    }
    // Chips are conserved: the winner must hold exactly what everyone
    // brought, late arrivals included. A mismatch means the settlement is
    // inventing or eating chips, which no amount of "it looked fine"
    // play-testing would surface.
    const total = game.stacks().reduce((a, b) => a + b, 0)
    if (total !== game.chipsInPlay()) leaks++
  } else {
    stalls++
  }

  if ((table + 1) % 10 === 0) {
    process.stdout.write(`\r  ${table + 1}/${TABLES} tables...`)
  }
}
process.stdout.write('\r' + ' '.repeat(40) + '\r')

const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
const sorted = [...lengths].sort((a, b) => a - b)
const at = (q: number) => sorted[Math.floor((sorted.length - 1) * q)]
const chips = BUY_IN * cast.length

function nameOf(id: string): string {
  return everyone.find((p) => p.id === id)?.name ?? id
}

if (title) console.log(`\n== ${title} ==`)
console.log(`\n${TABLES} tables in ${elapsed}s`)
console.log(`${cast.length}-handed, ${chips} chips at the start, ${DEFAULT_LEVELS.length} blind levels` +
  (arrivals.length ? `, plus ${arrivals.map((a) => a.personality.name).join(', ')} arriving late` : '') + '\n')

console.log(`Completed     ${lengths.length}/${TABLES}`)
console.log(`Stalled       ${stalls}${stalls ? '   <-- FAIL: a table never ended' : ''}`)
console.log(`Chip leaks    ${leaks}${leaks ? '   <-- FAIL: chips created or destroyed' : ''}`)
if (sorted.length) {
  console.log(`\nHands per table`)
  console.log(`  shortest    ${sorted[0]}`)
  console.log(`  p25         ${at(0.25)}`)
  console.log(`  median      ${at(0.5)}`)
  console.log(`  p75         ${at(0.75)}`)
  console.log(`  longest     ${sorted[sorted.length - 1]}`)
}

const pad = (s: string, n: number) => s.padEnd(n)
const num = (s: string | number, n: number) => String(s).padStart(n)

console.log(`\nFinishing position (count)`)
console.log(pad('Character', 22) + everyone.map((_, i) => num(`${i + 1}${['st','nd','rd','th'][i] ?? 'th'}`, 7)).join('') + (arrivals.length ? num('sat', 7) : ''))
console.log('-'.repeat(22 + 7 * everyone.length + (arrivals.length ? 7 : 0)))
for (const p of everyone) {
  const row = finishes.get(p.name)!
  const sat = arrivals.some((a) => a.personality === p) ? arrived.get(p.name) ?? 0 : TABLES
  console.log(pad(p.name, 22) + row.map((n) => num(n, 7)).join('') + (arrivals.length ? num(sat, 7) : ''))
}

console.log(`
A table ends when one player holds every chip in play. Blinds climb every
${HANDS_PER_LEVEL} hands and never come back down, so the schedule -- not the
players -- is what puts a floor under how long a table can run.

Chip leaks were a poker-ts defect that side pots trigger -- uneven tournament
stacks are the first thing to produce them. Fixed in
patches/poker-ts+1.5.0.patch; src/pot-conservation.ts guards it.

Stalls and chip leaks must both be zero. Everything else is a balance
question, not a correctness one.`)
