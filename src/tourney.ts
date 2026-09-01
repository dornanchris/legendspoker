import { Game, DEFAULT_LEVELS } from './game.js'
import { CAST } from './personality.js'

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
 * Note on seeds: the rng below drives decisions and equity rollouts, but
 * poker-ts deals from crypto.randomInt and takes no seed, so runs are not
 * reproducible. That is fine here -- "every table ends" is a claim about
 * random deals, and fixed deals would prove less, not more.
 */

const TABLES = Number(process.argv[2] ?? 100)
const HAND_CAP = 2000 // far past any sane table; only a stall reaches it
const HANDS_PER_LEVEL = 25

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const lengths: number[] = []
const finishes = new Map<string, number[]>()
for (const p of CAST) finishes.set(p.name, new Array(CAST.length).fill(0))
let stalls = 0
let leaks = 0

const t0 = Date.now()
for (let table = 0; table < TABLES; table++) {
  const game = new Game(CAST, {
    mode: 'tournament',
    buyIn: 2000,
    rollouts: 60,
    rng: mulberry32(20260901 + table),
    handsPerLevel: HANDS_PER_LEVEL,
  })

  let hands = 0
  while (!game.isComplete() && hands < HAND_CAP) {
    game.playHand()
    hands++
  }

  if (game.isComplete()) {
    lengths.push(hands)
    game.standings().forEach((seat, place) => {
      finishes.get(CAST[seat].name)![place]++
    })
    // Chips are conserved: the winner must hold exactly what everyone
    // brought. A mismatch means the settlement is inventing or eating chips,
    // which no amount of "it looked fine" play-testing would surface.
    const total = game.stacks().reduce((a, b) => a + b, 0)
    if (total !== 2000 * CAST.length) leaks++
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
const chips = 2000 * CAST.length

console.log(`\n${TABLES} tables in ${elapsed}s`)
console.log(`${CAST.length}-handed, ${chips} chips in play, ${DEFAULT_LEVELS.length} blind levels\n`)

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
console.log(pad('Character', 22) + CAST.map((_, i) => num(`${i + 1}${['st','nd','rd','th'][i] ?? 'th'}`, 7)).join(''))
console.log('-'.repeat(22 + 7 * CAST.length))
for (const p of CAST) {
  const row = finishes.get(p.name)!
  console.log(pad(p.name, 22) + row.map((n) => num(n, 7)).join(''))
}

console.log(`
A table ends when one player holds all ${chips} chips. Blinds climb every
${HANDS_PER_LEVEL} hands and never come back down, so the schedule -- not the
players -- is what puts a floor under how long a table can run.

Chip leaks are NOT this model's doing: they are a poker-ts defect that side
pots trigger, which uneven tournament stacks are the first thing to produce.
See src/potleak-repro.ts.

Stalls and chip leaks must both be zero. Everything else is a balance
question, not a correctness one.`)
