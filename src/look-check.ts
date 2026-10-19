/**
 * AN EARNED LOOK, FORCED: Holmes's deerstalker, checked.
 *
 * Beat Holmes heads up once he is already beaten (unlocked) and the ledger
 * enters "The Deerstalker" (data/marks.json, a `table_won_heads_up` mark with
 * `rematch`); the table then seats him in it (LOOKS in web/puppet/cast.ts).
 * A heads-up win over him is not something a playtest can be trusted to
 * reach, so this drives Baker Street with a scripted player, searches seeds
 * for sittings the player wins, and checks:
 *
 *   - a win whose last hand was heads up with Holmes enters the mark when he
 *     was beaten before the sitting, and never the first time he is beaten;
 *   - a win over anyone else heads up, or a loss, never enters it;
 *   - the director's heads-up opponent is the last one standing.
 *
 *   npm run check:look
 */
import { Game, type HandEvent, type TurnView } from './game.js'
import { HUMAN } from './personality.js'
import type { Decision } from './decide.js'
import { preflopStrength } from './equity.js'
import { mulberry32 } from './rng.js'
import { TABLE_BY_ID, DIALOGUE, MARKS, personality, arrivalRules } from './content.js'
import { TableRun } from './director.js'
import { handRank, marksForTable } from './marks.js'

const MARK = 'the_deerstalker'
const WHO = 'sherlock'
const SEARCH = 400
const table = TABLE_BY_ID.baker_street

let failures = 0
const fail = (msg: string) => {
  failures++
  console.log(`     FAIL ${msg}`)
}

/** A solid scripted player: plays good hands hard, folds the rest. */
function policy(seed: number, index: number, view: TurnView): Decision {
  const r = mulberry32((seed * 7919 + index * 104729) >>> 0)
  const raise = view.legal.includes('raise') ? 'raise' : view.legal.includes('bet') ? 'bet' : null
  const act = (action: Decision['action'], betSize?: number): Decision => ({ action, betSize, reason: 'script' })
  const passive = () => (view.legal.includes('check') ? act('check') : view.legal.includes('call') ? act('call') : act('fold'))
  const giveUp = () => (view.legal.includes('check') ? act('check') : act('fold'))
  const sized = (frac: number) => Math.max(view.minRaise, Math.min(view.maxRaise, Math.round(view.pot * frac)))
  const tier = view.board.length === 0
    ? (preflopStrength(view.hole) >= 0.6 ? 2 : preflopStrength(view.hole) >= 0.4 ? 1 : 0)
    : (handRank([...view.hole, ...view.board]).rank >= 2 ? 2 : handRank([...view.hole, ...view.board]).rank === 1 ? 1 : 0)
  if (tier === 2) return raise ? act(raise, r() < 0.5 ? view.maxRaise : sized(0.8)) : passive()
  if (tier === 1) return view.toCall <= view.pot * 0.4 ? passive() : giveUp()
  return giveUp()
}

type Sitting = { won: boolean; last: string | null; headsUpWith: string | null; marks: { before: string[]; first: string[] } }

async function play(seed: number): Promise<Sitting> {
  // The same sitting twice over: once with Holmes already beaten, once not.
  // The director's facts differ only in who was beaten before.
  const runs = [[WHO], []].map((beaten) => new TableRun({
    table, dialogue: DIALOGUE[table.id], mode: 'tour', seed, playerName: 'Tester',
    respectTier: 0, respectPoints: 0, earnedMarks: [], buyIn: table.buyIn, beaten,
  }))
  const fell: string[] = []
  let humanOut = false
  const onEvent = (e: HandEvent) => {
    if (e.type === 'eliminated') {
      if (e.seat === 0) humanOut = true
      else fell.push(e.id)
    }
    for (const run of runs) run.onEvent(e)
  }
  let i = 0
  const onHumanTurn = async (view: TurnView) => policy(seed, i++, view)
  const game = new Game([HUMAN, ...table.seats.map(personality)], {
    mode: 'tournament', buyIn: table.buyIn, rollouts: 20, rng: mulberry32(seed),
    handsPerLevel: table.handsPerLevel, humanSeat: 0, onHumanTurn, onEvent,
    arrivals: arrivalRules(table, 'tour', table.seats),
  })
  while (!game.isComplete() && !humanOut) await game.playHand()
  const won = !humanOut && game.survivors()[0] === 0
  const [a, b] = runs.map((run) => run.finish(won, game.handCount(), game.missedArrivals()).facts)
  return {
    won,
    last: fell[fell.length - 1] ?? null,
    headsUpWith: a.headsUpWith,
    marks: { before: marksForTable(a, new Set()), first: marksForTable(b, new Set()) },
  }
}

console.log(`\nAn earned look: "${MARKS.find((m) => m.id === MARK)?.title}" at ${table.name}\n`)
if (!MARKS.some((m) => m.id === MARK)) fail(`no mark "${MARK}" in data/marks.json`)

let earned = 0, otherWins = 0, losses = 0
for (let seed = 1; seed <= SEARCH && (earned < 2 || otherWins < 2); seed++) {
  const s = await play(seed)
  const has = (l: string[]) => l.includes(MARK)
  if (!s.won) {
    losses++
    if (has(s.marks.before) || has(s.marks.first)) fail(`seed ${seed}: entered on a loss`)
    continue
  }
  // (null: the last hand was not heads up -- two went out in it)
  if (s.headsUpWith !== null && s.headsUpWith !== s.last) fail(`seed ${seed}: heads up with ${s.headsUpWith}, but ${s.last} went out last`)
  if (has(s.marks.first)) fail(`seed ${seed}: entered the first time ${WHO} was beaten`)
  if (s.headsUpWith === WHO) {
    if (!has(s.marks.before)) fail(`seed ${seed}: beat ${WHO} heads up, already beaten, and no mark`)
    else console.log(`ok   seed ${seed}: beat ${WHO} heads up -> "${MARK}" (and not on a first win)`)
    earned++
  } else {
    if (has(s.marks.before)) fail(`seed ${seed}: entered for beating ${s.headsUpWith} heads up`)
    else console.log(`ok   seed ${seed}: beat ${s.headsUpWith ?? 'two at once, not heads up'}${s.headsUpWith ? ' heads up' : ''} -> no mark`)
    otherWins++
  }
}
if (!earned) fail(`no seed in ${SEARCH} had the player beat ${WHO} heads up`)
console.log(`\n${earned} heads-up wins over ${WHO}, ${otherWins} over others, ${losses} losses.`)
console.log(failures ? `FAIL: ${failures} problem(s).` : 'PASS')
process.exit(failures ? 1 : 0)
