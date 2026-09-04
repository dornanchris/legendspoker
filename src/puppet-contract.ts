import { Game, type HandEvent } from './game.js'
import { CAST, HUMAN } from './personality.js'
import type { Decision } from './decide.js'
import { mulberry32 } from './rng.js'
import { PuppetDirector, beats, type Fired, type PuppetTrigger } from './puppet.js'

/**
 * `npm run check:puppet` — guards the state machine input contract.
 *
 * BUILD-PLAN section 4 calls this interface "the single most important in the
 * project, because it lets rigging and programming proceed in parallel". That
 * only holds if the inputs are actually TRUE: a rig built against a contract
 * that lies is worse than no contract, because the lie is discovered after
 * ~90 hours of animation rather than before any of it.
 *
 * So this plays whole tables, feeds every event through the director on the
 * same beats the web table uses, and checks the claims the rig will rely on.
 * No art is required, and none exists yet -- that is the point.
 */

const SEATS = [HUMAN, ...CAST]
const HUMAN_SEAT = 0
const TABLES = Number(process.argv[2] ?? 12)
const HAND_CAP = 2000

type Violation = { seed: number; what: string }
const violations: Violation[] = []
let framesChecked = 0
let triggersFired = 0
const firedCount = new Map<PuppetTrigger, number>()

/** A stand-in player: pure, so it never touches the shared RNG. */
function scripted(view: { legal: string[]; toCall: number; stack: number; pot: number }): Decision {
  const can = (a: string) => view.legal.includes(a)
  if (view.toCall === 0) return can('check') ? { action: 'check', reason: 's' } : { action: 'fold', reason: 's' }
  if (view.toCall * 4 <= view.stack && can('call')) return { action: 'call', reason: 's' }
  if (can('fold')) return { action: 'fold', reason: 's' }
  return can('check') ? { action: 'check', reason: 's' } : { action: 'call', reason: 's' }
}

async function runTable(seed: number, withHuman: boolean) {
  const cast = withHuman ? SEATS : CAST
  const director = new PuppetDirector(cast.length, {
    humanSeat: withHuman ? HUMAN_SEAT : undefined,
  })
  const fail = (what: string) => violations.push({ seed, what })

  // Mirrors of the truth, rebuilt from raw engine events, to check the
  // director against rather than against itself.
  const folded = new Set<number>()
  const out = new Set<number>()
  let inHand = new Set<number>()
  let actions = 0
  let folds = 0
  const log: string[] = []

  const check = () => {
    framesChecked++
    let turns = 0
    for (let i = 0; i < cast.length; i++) {
      const v = director.inputs(i)
      for (const [name, n] of [['mood', v.mood], ['tilt', v.tilt], ['attention', v.attention]] as const) {
        if (!Number.isFinite(n) || n < 0 || n > 1) fail(`${name} out of range for seat ${i}: ${n}`)
      }
      if (v.isThinking && !v.isTurn) fail(`seat ${i} is thinking without holding the turn`)
      if (v.isTurn) turns++
      if (out.has(i) && (v.isInHand || v.isTurn || v.isThinking)) {
        fail(`eliminated seat ${i} is still live`)
      }
      if (folded.has(i) && v.isInHand) fail(`seat ${i} folded but is still in the hand`)
      if (inHand.has(i) !== v.isInHand && !folded.has(i) && !out.has(i)) {
        fail(`seat ${i} isInHand=${v.isInHand}, expected ${inHand.has(i)}`)
      }
    }
    if (turns > 1) fail(`${turns} seats hold the turn at once`)
  }

  const feed = (e: HandEvent) => {
    for (const beat of beats(e)) {
      const fired = director.apply(beat)
      for (const f of fired) {
        triggersFired++
        firedCount.set(f.trigger, (firedCount.get(f.trigger) ?? 0) + 1)
        log.push(`${f.seat}:${f.trigger}`)
        if (out.has(f.seat)) fail(`trigger ${f.trigger} fired for eliminated seat ${f.seat}`)
        if (f.trigger.startsWith('tell')) {
          const v = director.inputs(f.seat)
          if (!v.isInHand) fail(`${f.trigger} fired for seat ${f.seat} outside a live hand`)
          if (!v.isTurn) fail(`${f.trigger} fired for seat ${f.seat} when it was not their turn`)
        }
      }
      // The mirrors advance on the SAME beat as the director, then both are
      // compared. Updating them a beat later would just be reading the
      // director's own answer back to it.
      if (beat.type === 'action') {
        actions++
        if (beat.decision.action === 'fold') {
          folds++
          folded.add(beat.seat)
          inHand.delete(beat.seat)
        }
      }
      if (beat.type === 'eliminated') { out.add(beat.seat); inHand.delete(beat.seat) }

      // The director is fed on the presentation clock, so it is ticked on one
      // too. The exact figure does not matter here; that it decays does.
      director.tick(400)
      check()
    }
  }

  const game = new Game(cast, {
    mode: 'tournament',
    buyIn: 2000,
    rollouts: 60,
    handsPerLevel: 25,
    seed,
    rng: mulberry32(seed),
    humanSeat: withHuman ? HUMAN_SEAT : undefined,
    onHumanTurn: withHuman ? async (v) => scripted(v as any) : undefined,
    onEvent: feed,
  })

  let hands = 0
  while (!game.isComplete() && hands < HAND_CAP) {
    const stacks = game.stacks()
    folded.clear()
    inHand = new Set(stacks.map((c, i) => (c > 0 && !out.has(i) ? i : -1)).filter((i) => i >= 0))
    director.apply({ type: 'handStart', stacks })
    check()
    await game.playHand()
    director.apply({ type: 'handEnd', stacks: game.stacks() })
    check()
    hands++
  }

  // Mood has to mean something: the player holding every chip must not read as
  // miserable, and the busted seats must not read as thriving.
  const winner = game.survivors()[0]
  if (winner !== undefined) {
    const best = director.inputs(winner).mood
    for (let i = 0; i < cast.length; i++) {
      if (i === winner) continue
      if (director.inputs(i).mood > best) fail(`seat ${i} outranks the table winner in mood`)
    }
    if (best < 0.5) fail(`the winner's mood is ${best.toFixed(2)} holding every chip`)
  }

  return { hands, actions, folds, log: log.join('|') }
}

for (let i = 0; i < TABLES; i++) {
  const seed = 30260901 + i * 5171
  for (const withHuman of [true, false]) {
    const a = await runTable(seed, withHuman)
    // Same seed, same beats, same performance: the rig must not be at the
    // mercy of anything the director does not derive from the events.
    const b = await runTable(seed, withHuman)
    if (a.log !== b.log) violations.push({ seed, what: 'the same table animated differently twice' })
    const acts = ['fireBet', 'fireCall', 'fireCheck', 'fireFold'] as const
    const total = acts.reduce((n, t) => n + (firedCount.get(t) ?? 0), 0)
    if (total === 0) violations.push({ seed, what: 'no action triggers fired at all' })
  }
}

const C = { dim: (s: string) => `\x1b[2m${s}\x1b[0m`, bad: (s: string) => `\x1b[31m${s}\x1b[0m` }

console.log(`
Puppet contract
---------------
frames checked      ${framesChecked}
triggers fired      ${triggersFired}`)
for (const t of [...firedCount.keys()].sort()) {
  console.log(`  ${t.padEnd(18)}${firedCount.get(t)}`)
}
console.log(`violations          ${violations.length === 0 ? '0' : C.bad(String(violations.length))}
`)
for (const v of violations.slice(0, 20)) console.log(`  seed ${v.seed}: ${v.what}`)

console.log(
  C.dim(`Every input is derived from engine events on the presentation clock and
checked against mirrors rebuilt from those events independently. What the rig
is promised: a tell only fires during a live hand on that character's turn,
only one seat holds the turn, an eliminated seat goes quiet, and the same seed
animates the same way twice. No .riv file is needed to prove any of it.`),
)

if (violations.length > 0) process.exit(1)
