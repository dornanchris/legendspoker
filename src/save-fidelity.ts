import { Game, type HandEvent, type TurnView } from './game.js'
import { CAST, HUMAN } from './personality.js'
import type { Decision } from './decide.js'
import { mulberry32 } from './rng.js'
import { fromJson, toJson, type SaveGame } from './save.js'

/**
 * `npm run check:save` — the save/restore regression guard.
 *
 * The invariant, and the only one worth having: SAVE MID-HAND, RESTORE, PLAY
 * ON, AND THE GAME MUST RESOLVE IDENTICALLY TO THE RUN THAT WAS NEVER
 * INTERRUPTED. Same cards, same decisions, same pots, same eliminations, in
 * the same order.
 *
 * Anything weaker -- "the stacks look right", "it didn't crash" -- passes
 * happily while a save quietly deals a different river. This is the test the
 * seeded deck was built to make possible; without it the schema is a guess.
 *
 * Mechanically: play a table once, taking saves at chosen moments along the
 * way, and record the events hand by hand. Then, for each save, rebuild a
 * game from it and play THAT to the end. The restored run must reproduce the
 * saved hand from its start and every hand after it, event for event.
 *
 * The scripted human is a pure function of what it can see, deliberately: it
 * must not draw from the game's RNG. A restored hand answers the human's
 * earlier turns from the journal instead of calling the policy, so a policy
 * that consumed the shared stream would leave the two runs holding different
 * generator positions and the test would fail for a reason that has nothing
 * to do with saving.
 */

const SEATS = [HUMAN, ...CAST]
const HUMAN_SEAT = 0
const HAND_CAP = 2000
const SEEDS = Number(process.argv[2] ?? 12)

// ------------------------------------------------------------ scripted human

/** FNV-1a. Any stable hash will do; this one is four lines. */
function hash(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/**
 * A stand-in player. Not a good one -- it only has to be varied enough to
 * produce folds, calls and raises, and reproducible enough to be replayed.
 */
function scriptedHuman(view: TurnView): Decision {
  const h = hash(
    [
      view.street,
      view.pot,
      view.toCall,
      view.stack,
      ...view.hole.map((c) => `${c.rank}${c.suit}`),
      ...view.board.map((c) => `${c.rank}${c.suit}`),
    ].join('|'),
  )
  const can = (a: Decision['action']) => view.legal.includes(a)
  const raise: Decision['action'] | null = can('raise') ? 'raise' : can('bet') ? 'bet' : null

  if (view.toCall === 0) {
    if (raise && h % 4 === 0 && view.maxRaise >= view.minRaise) {
      return { action: raise, betSize: view.minRaise, reason: 'scripted' }
    }
    if (can('check')) return { action: 'check', reason: 'scripted' }
  } else {
    if (raise && h % 11 === 0 && view.maxRaise >= view.minRaise) {
      return { action: raise, betSize: view.minRaise, reason: 'scripted' }
    }
    if (view.toCall * 3 <= view.stack && can('call')) {
      return { action: 'call', reason: 'scripted' }
    }
    if (can('fold')) return { action: 'fold', reason: 'scripted' }
    if (can('call')) return { action: 'call', reason: 'scripted' }
  }
  if (can('check')) return { action: 'check', reason: 'scripted' }
  return { action: 'fold', reason: 'scripted' }
}

// --------------------------------------------------------------- run harness

type Run = {
  /** Events grouped by hand, in order. Hand 0 is the first hand of the run. */
  hands: string[][]
  /** Final chip counts, and the finishing order. */
  stacks: number[]
  standings: number[]
}

/** Where a save is taken. */
type Trigger =
  | { at: 'between'; hand: number }
  | { at: 'humanTurn'; hand: number; turn: number }
  | { at: 'action'; hand: number; index: number }

type Capture = { trigger: Trigger; hand: number; save: SaveGame }

function play(
  makeGame: (onEvent: (e: HandEvent) => void, onHuman: (v: TurnView) => Promise<Decision>) => Game,
  triggers: Trigger[] = [],
): Promise<{ run: Run; captures: Capture[] }> {
  const run: Run = { hands: [], stacks: [], standings: [] }
  const captures: Capture[] = []
  let hand = -1
  let humanTurns = 0
  let actions = 0

  const onEvent = (e: HandEvent) => {
    if (e.type === 'action') {
      actions++
      for (const t of triggers) {
        if (t.at === 'action' && t.hand === hand && t.index === actions) {
          captures.push({ trigger: t, hand, save: game.save() })
        }
      }
    }
    run.hands[hand]?.push(JSON.stringify(e))
  }

  const onHuman = async (view: TurnView): Promise<Decision> => {
    humanTurns++
    for (const t of triggers) {
      if (t.at === 'humanTurn' && t.hand === hand && t.turn === humanTurns) {
        captures.push({ trigger: t, hand, save: game.save() })
      }
    }
    return scriptedHuman(view)
  }

  const game = makeGame(onEvent, onHuman)

  return (async () => {
    let played = 0
    while (!game.isComplete() && played < HAND_CAP) {
      hand++
      humanTurns = 0
      actions = 0
      run.hands[hand] = []
      for (const t of triggers) {
        if (t.at === 'between' && t.hand === hand) {
          captures.push({ trigger: t, hand, save: game.save() })
        }
      }
      await game.playHand()
      played++
    }
    run.stacks = game.stacks()
    run.standings = game.standings()
    return { run, captures }
  })()
}

// ------------------------------------------------------------------ the test

function describe(t: Trigger): string {
  if (t.at === 'between') return `between hands, before hand ${t.hand}`
  if (t.at === 'humanTurn') return `hand ${t.hand}, human turn ${t.turn}`
  return `hand ${t.hand}, after action ${t.index}`
}

let checked = 0
let failures = 0
let replayedHands = 0

for (let i = 0; i < SEEDS; i++) {
  const seed = 20260901 + i * 7919
  // Two shapes of table: one with a human seat (so mid-hand saves have a
  // journal to replay) and one all-AI (so a mid-hand save replays the hand
  // with an EMPTY journal, which is the other half of the mechanism).
  for (const withHuman of [true, false]) {
    const cast = withHuman ? SEATS : CAST
    const build = (
      onEvent: (e: HandEvent) => void,
      onHuman: (v: TurnView) => Promise<Decision>,
    ) =>
      new Game(cast, {
        mode: 'tournament',
        buyIn: 2000,
        rollouts: 60,
        handsPerLevel: 25,
        seed,
        rng: mulberry32(seed),
        humanSeat: withHuman ? HUMAN_SEAT : undefined,
        onHumanTurn: withHuman ? onHuman : undefined,
        onEvent,
      })

    const triggers: Trigger[] = withHuman
      ? [
          { at: 'between', hand: 2 },
          { at: 'humanTurn', hand: 4, turn: 1 },
          { at: 'humanTurn', hand: 7, turn: 2 },
          { at: 'humanTurn', hand: 11, turn: 1 },
        ]
      : [
          { at: 'between', hand: 3 },
          { at: 'action', hand: 6, index: 3 },
          { at: 'action', hand: 9, index: 1 },
        ]

    const { run: straight, captures } = await play(build, triggers)

    for (const cap of captures) {
      // Through JSON and back: a save that only works in memory is not a save.
      const json = toJson(cap.save)
      const { run: resumed } = await play((onEvent, onHuman) =>
        Game.load(fromJson(json), cast, {
          onEvent,
          onHumanTurn: withHuman ? onHuman : undefined,
        }),
      )

      const expected = straight.hands.slice(cap.hand)
      checked++
      replayedHands += expected.length

      const label = `seed ${seed} ${withHuman ? 'human' : 'ai-only'} — save ${describe(cap.trigger)}`
      let bad: string | null = null

      if (resumed.hands.length !== expected.length) {
        bad = `played ${resumed.hands.length} hands, expected ${expected.length}`
      } else {
        for (let h = 0; h < expected.length && !bad; h++) {
          const a = expected[h]
          const b = resumed.hands[h]
          if (a.length !== b.length) {
            bad = `hand ${cap.hand + h}: ${b.length} events, expected ${a.length}`
            break
          }
          for (let e = 0; e < a.length; e++) {
            if (a[e] !== b[e]) {
              bad = `hand ${cap.hand + h}, event ${e}:\n      expected ${a[e]}\n      got      ${b[e]}`
              break
            }
          }
        }
      }
      if (!bad && JSON.stringify(resumed.stacks) !== JSON.stringify(straight.stacks)) {
        bad = `final stacks ${resumed.stacks} != ${straight.stacks}`
      }
      if (!bad && JSON.stringify(resumed.standings) !== JSON.stringify(straight.standings)) {
        bad = `standings ${resumed.standings} != ${straight.standings}`
      }
      const total = resumed.stacks.reduce((a, b) => a + b, 0)
      if (!bad && total !== cast.length * 2000) {
        bad = `chips leaked: ${total} of ${cast.length * 2000}`
      }

      if (bad) {
        failures++
        console.log(`  FAIL  ${label}\n        ${bad}`)
      }
    }
  }
}

const C = { dim: (s: string) => `\x1b[2m${s}\x1b[0m`, bad: (s: string) => `\x1b[31m${s}\x1b[0m` }

console.log(`
Save fidelity
-------------
saves restored      ${checked}
hands replayed      ${replayedHands}
mismatches          ${failures === 0 ? '0' : C.bad(String(failures))}
`)

console.log(
  C.dim(`Each restored save replays its hand from the checkpoint and plays the table
out. Every event after the save point -- cards, actions, pots, eliminations --
must match the uninterrupted run exactly. A single mismatch means the schema
is missing state, and the save is a lie about the game it claims to hold.`),
)

if (failures > 0) process.exit(1)
