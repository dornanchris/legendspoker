/**
 * SAVE/RESUME EXIT TEST: save mid-hand, restore, play on, and the table must
 * resolve identically.
 *
 * A saved table is a seed plus the human's decisions (src/save.ts). This
 * drives every table in data/tables with a scripted "human" and checks three
 * runs against each other, event for event and line for line:
 *
 *   A  the table played straight through;
 *   B  the whole of A's decision log replayed from the seed;
 *   C  a save taken part-way through -- mid-hand, at a random decision --
 *      restored by replay, then played on live.
 *
 * All three must produce the same transcript: every engine event, every line
 * the director chose, every respect flip and mark. The scripted human decides
 * from (seed, decision number) alone, so C's live half makes the same choices
 * A did. Any divergence means something in a hand depends on more than the
 * seed and the decisions -- a presentation leak into the simulation, which is
 * exactly what non-negotiable #6 forbids.
 *
 * Also checks chip conservation, late arrivals included.
 *
 *   npm run check:replay [seeds-per-table]
 */
import { Game, type HandEvent, type TurnView } from './game.js'
import { HUMAN } from './personality.js'
import type { Decision } from './decide.js'
import { mulberry32 } from './rng.js'
import { TABLES, DIALOGUE, personality, arrivalRules, type TableData } from './content.js'
import { TableRun } from './director.js'
import { preflopStrength } from './equity.js'
import { handRank } from './marks.js'

const SEEDS = Number(process.argv[2] ?? 2)
const HAND_CAP = 400

/**
 * The scripted player: a sensible amateur who looks only at their own cards.
 * Deterministic per (seed, decision number), which is what lets a resumed
 * run make the same choices the original did.
 */
function policy(seed: number, index: number, view: TurnView): Decision {
  const r = mulberry32((seed * 7919 + index * 104729) >>> 0)
  const x = r()
  const thinkMs = Math.round(500 + r() * 9000)
  const raise = view.legal.includes('raise') ? 'raise' : view.legal.includes('bet') ? 'bet' : null
  const act = (action: Decision['action'], betSize?: number): Decision => ({ action, betSize, reason: 'script', thinkMs })
  const passive = () => (view.legal.includes('check') ? act('check') : view.legal.includes('call') ? act('call') : act('fold'))
  const giveUp = () => (view.legal.includes('check') ? act('check') : act('fold'))
  const sized = (frac: number) => Math.max(view.minRaise, Math.min(view.maxRaise, Math.round(view.pot * frac)))

  // 0 weak, 1 medium, 2 strong.
  let tier: number
  if (view.board.length === 0) {
    const s = preflopStrength(view.hole)
    tier = s >= 0.62 ? 2 : s >= 0.42 ? 1 : 0
  } else {
    const rank = handRank([...view.hole, ...view.board]).rank
    tier = rank >= 2 ? 2 : rank === 1 ? 1 : 0
  }
  const cheap = view.toCall <= Math.max(view.bigBlind * 3, view.pot * 0.35)
  if (tier === 2) return raise && x < 0.55 ? act(raise, sized(0.6 + r() * 0.6)) : passive()
  if (tier === 1) return cheap || view.toCall === 0 ? passive() : x < 0.25 ? act('call') : giveUp()
  if (raise && view.toCall === 0 && x < 0.08) return act(raise, sized(0.5)) // the odd bluff
  return giveUp()
}

type Run = { transcript: string[]; decisions: Decision[]; chipsOk: boolean; hands: number; won: boolean }

/**
 * Plays a table. With `replay`, the first decisions come from that log --
 * exactly as a resumed save does -- and the scripted player takes over when
 * it runs out, which is the player carrying on after loading.
 */
async function play(table: TableData, seed: number, replay: Decision[] | null): Promise<Run> {
  const transcript: string[] = []
  const decisions: Decision[] = []
  const arrivals = arrivalRules(table, 'tour', table.seats)
  const run = new TableRun({
    table,
    dialogue: DIALOGUE[table.id],
    mode: 'tour',
    seed,
    playerName: 'Tester',
    respectTier: 0,
    respectPoints: 0,
    earnedMarks: [],
    buyIn: table.buyIn,
  })
  let humanOut = false
  const onEvent = (e: HandEvent) => {
    if (e.type === 'eliminated' && e.seat === 0) humanOut = true
    transcript.push(JSON.stringify(e))
    for (const b of run.onEvent(e)) transcript.push('  ' + JSON.stringify(b))
  }
  const onHumanTurn = async (view: TurnView): Promise<Decision> => {
    const i = decisions.length
    const d: Decision = replay && i < replay.length ? { ...replay[i] } : policy(seed, i, view)
    decisions.push({ ...d })
    return d
  }
  const game = new Game([HUMAN, ...table.seats.map(personality)], {
    mode: 'tournament',
    buyIn: table.buyIn,
    rollouts: 60,
    rng: mulberry32(seed),
    handsPerLevel: table.handsPerLevel,
    humanSeat: 0,
    onHumanTurn,
    onEvent,
    arrivals,
  })
  let hands = 0
  while (!game.isComplete() && hands < HAND_CAP && !humanOut) {
    await game.playHand()
    hands++
  }
  const won = game.isComplete() && game.survivors()[0] === 0
  if (won || humanOut) {
    for (const b of run.finish(won, game.handCount(), game.missedArrivals()).beats) transcript.push('  ' + JSON.stringify(b))
  }
  const total = game.stacks().reduce((a, b) => a + b, 0)
  return { transcript, decisions, chipsOk: total === game.chipsInPlay(), hands, won }
}

let failures = 0
const t0 = Date.now()
for (const table of TABLES) {
  for (let k = 0; k < SEEDS; k++) {
    const seed = (20260924 + k * 1009 + table.position * 31) >>> 0
    const a = await play(table, seed, null)
    const b = await play(table, seed, a.decisions)
    // Resume part-way: somewhere in the middle third, which is mid-hand
    // almost always -- a decision is by definition taken inside a hand.
    const cut = Math.max(1, Math.floor(a.decisions.length * (0.3 + 0.4 * mulberry32(seed)())))
    const c = await play(table, seed, a.decisions.slice(0, cut))

    const same = (x: string[], y: string[]) => x.length === y.length && x.every((l, i) => l === y[i])
    const firstDiff = (x: string[], y: string[]) => x.findIndex((l, i) => l !== y[i])
    const okB = same(a.transcript, b.transcript)
    const okC = same(a.transcript, c.transcript)
    const ok = okB && okC && a.chipsOk && b.chipsOk && c.chipsOk
    if (!ok) failures++
    const lines = a.transcript.filter((l) => l.includes('"kind":"line"')).length
    const arrived = a.transcript.filter((l) => l.startsWith('{"type":"arrival"')).map((l) => JSON.parse(l).id)
    console.log(
      `${ok ? 'ok  ' : 'FAIL'} ${table.id.padEnd(14)} seed ${seed}  ${String(a.hands).padStart(4)} hands  ` +
      `${String(a.decisions.length).padStart(4)} decisions, resumed at #${cut}  ${lines} lines said  ` +
      `${a.won ? 'player won' : 'player out'}${arrived.length ? `  (${arrived.join(', ')} arrived)` : ''}`,
    )
    if (!okB) console.log(`     full replay diverged at transcript line ${firstDiff(a.transcript, b.transcript)}`)
    if (!okC) {
      const i = firstDiff(a.transcript, c.transcript)
      console.log(`     resume diverged at transcript line ${i}:\n       A: ${a.transcript[i]}\n       C: ${c.transcript[i]}`)
    }
    if (!a.chipsOk || !c.chipsOk) console.log('     chips were created or destroyed')
  }
}
console.log(`\n${failures ? 'FAIL' : 'PASS'}: ${TABLES.length * SEEDS} tables replayed in ${((Date.now() - t0) / 1000).toFixed(1)}s.`)
if (failures) process.exit(1)
