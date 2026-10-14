/**
 * THE HIDDEN VISITOR, FORCED: JFK at the White House, checked.
 *
 * Win a pot at the White House holding a three and a five while a chair
 * stands empty, and the thirty-fifth president walks in and sits down in it
 * (TableData.visitor; an Arrival with `onHumanWin` in game.ts). It is rare on
 * purpose, so it cannot be left to a playtest. This drives the table with a
 * scripted player who never lets go of a three-five, searches seeds until he
 * arrives, and checks:
 *
 *   - he arrives once, the hand after the player won chips holding a three
 *     and a five, into a chair a bust left empty (never the player's);
 *   - never on a three-five win with every chair full, never after the
 *     player's win ended the table;
 *   - his entrance is played, and chips are conserved;
 *   - the whole decision log replays identically;
 *   - an open table that already deals him in never seats him twice, and no
 *     other table has a visitor rule.
 *
 *   npm run check:visitor
 */
import { Game, type HandEvent, type TurnView } from './game.js'
import { HUMAN } from './personality.js'
import type { Decision } from './decide.js'
import { preflopStrength, type Card } from './equity.js'
import { mulberry32 } from './rng.js'
import { TABLES, TABLE_BY_ID, DIALOGUE, personality, arrivalRules, type TableData } from './content.js'
import { TableRun } from './director.js'
import { handRank } from './marks.js'

const HAND_CAP = 400
const SEARCH = 200
const table = TABLE_BY_ID.white_house
const visitor = table.visitor!
const TRIGGER = [...visitor.holeRanks].sort().join()
const isTrigger = (hole: Card[] | null) => !!hole && hole.map((c) => c.rank as string).sort().join() === TRIGGER

let failures = 0
const fail = (msg: string) => {
  failures++
  console.log(`     FAIL ${msg}`)
}

/** check:loki's scripted amateur, except a three-five is never folded. */
function policy(seed: number, index: number, view: TurnView): Decision {
  const r = mulberry32((seed * 7919 + index * 104729) >>> 0)
  const x = r()
  const raise = view.legal.includes('raise') ? 'raise' : view.legal.includes('bet') ? 'bet' : null
  const act = (action: Decision['action'], betSize?: number): Decision => ({ action, betSize, reason: 'script' })
  const passive = () => (view.legal.includes('check') ? act('check') : view.legal.includes('call') ? act('call') : act('fold'))
  const giveUp = () => (view.legal.includes('check') ? act('check') : act('fold'))
  const sized = (frac: number) => Math.max(view.minRaise, Math.min(view.maxRaise, Math.round(view.pot * frac)))
  if (isTrigger(view.hole)) return raise && x < 0.5 ? act(raise, view.maxRaise) : passive()
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
  return giveUp()
}

type Run = {
  transcript: string[]
  decisions: Decision[]
  /** For each hand: did the player win chips holding the trigger, and how many chairs were empty after it. */
  hands: { no: number; triggerWin: boolean; seatedAfter: number; tableOver: boolean }[]
  arrivals: { hand: number; seat: number; id: string }[]
  entrance: string[]
  chipsOk: boolean
}

async function play(t: TableData, mode: 'tour' | 'open', cast: string[], seed: number, replay: Decision[] | null = null): Promise<Run> {
  const out: Run = { transcript: [], decisions: [], hands: [], arrivals: [], entrance: [], chipsOk: true }
  const run = new TableRun({
    table: t, dialogue: DIALOGUE[t.id], mode, seed, playerName: 'Tester',
    respectTier: 0, respectPoints: 0, earnedMarks: [], buyIn: t.buyIn,
  })
  let hole: Card[] | null = null
  let won = false
  let humanOut = false
  let arrivedNow = 0
  const onEvent = (e: HandEvent) => {
    if (e.type === 'deal') hole = e.hole
    if (e.type === 'result' && e.seat === 0) won = e.delta > 0
    if (e.type === 'eliminated' && e.seat === 0) humanOut = true
    if (e.type === 'arrival') {
      out.arrivals.push({ hand: run.handNo, seat: e.seat, id: e.id })
      arrivedNow++
    }
    out.transcript.push(JSON.stringify(e))
    const beats = run.onEvent(e)
    if (e.type === 'arrival' && e.id === visitor.character) {
      for (const b of beats) if (b.kind === 'line') out.entrance.push(b.id)
    }
    for (const b of beats) out.transcript.push('  ' + JSON.stringify(b))
    if (e.type === 'handEnd') {
      // Chairs filled as the hand ended, before anyone sat down in them.
      const seated = e.stacks.filter((s) => s > 0).length - arrivedNow
      arrivedNow = 0
      out.hands.push({ no: run.handNo, triggerWin: won && isTrigger(hole), seatedAfter: seated, tableOver: seated <= 1 })
      hole = null
      won = false
    }
  }
  const onHumanTurn = async (view: TurnView): Promise<Decision> => {
    const i = out.decisions.length
    const d: Decision = replay && i < replay.length ? { ...replay[i] } : policy(seed, i, view)
    out.decisions.push({ ...d })
    return d
  }
  const game = new Game([HUMAN, ...cast.map(personality)], {
    mode: 'tournament', buyIn: t.buyIn, rollouts: 60, rng: mulberry32(seed),
    handsPerLevel: t.handsPerLevel, humanSeat: 0, onHumanTurn, onEvent,
    arrivals: arrivalRules(t, mode, cast),
  })
  let n = 0
  while (!game.isComplete() && n < HAND_CAP && !humanOut) {
    await game.playHand()
    n++
  }
  out.chipsOk = game.stacks().reduce((a, b) => a + b, 0) === game.chipsInPlay()
  return out
}

console.log(`\nThe hidden visitor: ${visitor.character} at ${table.name}, on ${visitor.holeRanks.join(' and ')}\n`)

const others = TABLES.filter((t) => t.id !== table.id && arrivalRules(t, 'tour', t.seats).some((a) => a.onHumanWin))
if (others.length) fail(`other tables have a visitor rule: ${others.map((t) => t.id).join(', ')}`)

let found = 0
let fullChairWins = 0
for (let seed = 1; seed <= SEARCH && found < 3; seed++) {
  const a = await play(table, 'tour', table.seats, seed)
  if (!a.chipsOk) fail(`seed ${seed}: chips not conserved`)
  const visits = a.arrivals.filter((x) => x.id === visitor.character)
  // A trigger win with every opponent still seated must do nothing.
  const firstEligible = a.hands.find((h) => h.triggerWin && h.seatedAfter < 5 && !h.tableOver)
  for (const h of a.hands) if (h.triggerWin && h.seatedAfter === 5 && (!firstEligible || h.no < firstEligible.no)) fullChairWins++
  if (!firstEligible) {
    if (visits.length) fail(`seed ${seed}: he arrived without a three-five win at a table with an empty chair`)
    continue
  }
  found++
  if (visits.length !== 1) { fail(`seed ${seed}: ${visits.length} arrivals, expected one`); continue }
  const v = visits[0]
  if (v.hand !== firstEligible.no) fail(`seed ${seed}: arrived after hand ${v.hand}, the trigger was hand ${firstEligible.no}`)
  if (v.seat === 0) fail(`seed ${seed}: he took the player's chair`)
  if (!a.entrance.length) fail(`seed ${seed}: no entrance was played`)
  const b = await play(table, 'tour', table.seats, seed, a.decisions)
  const same = a.transcript.length === b.transcript.length && a.transcript.every((l, i) => l === b.transcript[i])
  if (!same) fail(`seed ${seed}: the decision log does not replay identically`)
  console.log(`  seed ${String(seed).padStart(3)}  arrived after hand ${v.hand} in chair ${v.seat}; entrance ${a.entrance.length} lines; replay ${same ? 'identical' : 'DIFFERS'}`)
}
if (!found) fail(`no seed in ${SEARCH} brought him in`)
console.log(`  three-five wins with every chair full (nothing happens): ${fullChairWins}`)

// Dealt in at an open table already: he must never sit down a second time.
{
  const cast = ['jfk', 'lincoln', 'fdr']
  let doubled = 0
  for (let seed = 1; seed <= 40; seed++) {
    const a = await play(table, 'open', cast, seed)
    if (a.arrivals.some((x) => x.id === visitor.character)) doubled++
    if (!a.chipsOk) fail(`open seed ${seed}: chips not conserved`)
  }
  if (doubled) fail(`an open table that dealt him in seated him again (${doubled} of 40)`)
  else console.log('  an open table that already deals him in never seats him again (40 seeds)')
}

console.log(failures ? `\nFAIL: ${failures} problem(s).` : '\nPASS.')
process.exit(failures ? 1 : 0)
