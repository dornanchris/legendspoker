/**
 * ONE CHAIR, TWO MEN, FORCED: Jekyll and Hyde at Transylvania, checked.
 *
 * Seat 2 is Jekyll OR Hyde, 50/50 from the sitting's seed (sittingSeats).
 * Once the table's champion has sat down and the one dealt in has been
 * knocked out, the OTHER walks back in to an empty chair when the player wins
 * a pot holding the same two ranks as the hand that knocked him out
 * (CharacterData.other; an Arrival with `onHumanWinLike` in game.ts). Rare
 * on purpose, so this drives the table with a scripted player who, once he
 * has seen the knockout, never lets go of those two ranks, searches seeds
 * until the other half walks in, and checks:
 *
 *   - the coin is fair (about half of the sittings deal each man), and a
 *     sitting never deals both;
 *   - the other half arrives once, the hand the player won holding the
 *     knockout ranks, into a chair a bust left empty, never the player's,
 *     and never before the champion has sat down;
 *   - his scene is played, and chips are conserved;
 *   - the whole decision log replays identically;
 *   - both ways round: Hyde back for Jekyll, and Jekyll back for Hyde.
 *
 *   npm run check:other
 */
import { Game, type HandEvent, type TurnView } from './game.js'
import { HUMAN } from './personality.js'
import type { Decision } from './decide.js'
import { preflopStrength, type Card } from './equity.js'
import { mulberry32 } from './rng.js'
import { TABLE_BY_ID, DIALOGUE, CHARACTERS, personality, arrivalRules, sittingSeats } from './content.js'
import { TableRun } from './director.js'
import { handRank } from './marks.js'

const HAND_CAP = 400
const SEARCH = 600
const table = TABLE_BY_ID.transylvania
const champion = table.arrival!.character
const halves = table.seats.filter((id) => CHARACTERS[id]?.other)
const ranksOf = (hole: Card[] | null) => (hole ? hole.map((c) => c.rank as string).sort().join() : '')

let failures = 0
const fail = (msg: string) => {
  failures++
  console.log(`     FAIL ${msg}`)
}

if (halves.length !== 1) fail(`expected one two-man chair at ${table.name}, found ${halves.length}`)
const first = halves[0]
const pair = [first, CHARACTERS[first]!.other!.character]

/** check:visitor's scripted amateur, except the knockout ranks are never folded. */
function policy(seed: number, index: number, view: TurnView, ko: string): Decision {
  const r = mulberry32((seed * 7919 + index * 104729) >>> 0)
  const x = r()
  const raise = view.legal.includes('raise') ? 'raise' : view.legal.includes('bet') ? 'bet' : null
  const act = (action: Decision['action'], betSize?: number): Decision => ({ action, betSize, reason: 'script' })
  const passive = () => (view.legal.includes('check') ? act('check') : view.legal.includes('call') ? act('call') : act('fold'))
  const giveUp = () => (view.legal.includes('check') ? act('check') : act('fold'))
  const sized = (frac: number) => Math.max(view.minRaise, Math.min(view.maxRaise, Math.round(view.pot * frac)))
  if (ko && ranksOf(view.hole) === ko) return raise && x < 0.5 ? act(raise, view.maxRaise) : passive()
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
  cast: string[]
  /** The ranks of the hand that knocked the dealt half out, as the table saw it. */
  ko: string
  koHand: number
  championHand: number
  /** Hands the player won holding the knockout ranks, with chairs seated after. */
  hands: { no: number; triggerWin: boolean; seatedAfter: number; tableOver: boolean }[]
  arrivals: { hand: number; seat: number; id: string }[]
  scene: string[]
  chipsOk: boolean
}

async function play(seed: number, replay: Decision[] | null = null): Promise<Run> {
  const cast = sittingSeats(table.seats, seed)
  const out: Run = {
    transcript: [], decisions: [], cast, ko: '', koHand: -1, championHand: -1,
    hands: [], arrivals: [], scene: [], chipsOk: true,
  }
  const run = new TableRun({
    table, dialogue: DIALOGUE[table.id], mode: 'tour', seed, playerName: 'Tester',
    respectTier: 0, respectPoints: 0, earnedMarks: [], buyIn: table.buyIn,
  })
  const dealt = cast.find((id) => pair.includes(id))!
  const other = CHARACTERS[dealt]!.other!.character
  let hole: Card[] | null = null
  let won = false
  let humanOut = false
  let arrivedNow = 0
  let revealed = new Map<number, Card[]>()
  let deltas = new Map<number, number>()
  const onEvent = (e: HandEvent) => {
    if (e.type === 'hand') { revealed = new Map(); deltas = new Map() }
    if (e.type === 'deal') hole = e.hole
    if (e.type === 'showdown') for (const r of e.revealed) revealed.set(r.seat, r.hole)
    if (e.type === 'result') {
      deltas.set(e.seat, e.delta)
      if (e.seat === 0) won = e.delta > 0
    }
    if (e.type === 'eliminated' && e.seat === 0) humanOut = true
    if (e.type === 'eliminated' && e.id === dealt) {
      // The hand that beat him: whoever took the most chips this hand (the engine's rule).
      const by = [...deltas.entries()].filter(([s]) => s !== e.seat).sort((a, b) => b[1] - a[1])[0]?.[0]
      const h = by === 0 ? hole : by !== undefined ? revealed.get(by) ?? null : null
      out.ko = ranksOf(h)
      out.koHand = run.handNo
    }
    if (e.type === 'arrival') {
      out.arrivals.push({ hand: run.handNo, seat: e.seat, id: e.id })
      if (e.id === champion) out.championHand = run.handNo
      arrivedNow++
    }
    out.transcript.push(JSON.stringify(e))
    const beats = run.onEvent(e)
    if (e.type === 'arrival' && e.id === other) {
      for (const b of beats) if (b.kind === 'line') out.scene.push(b.id)
    }
    for (const b of beats) out.transcript.push('  ' + JSON.stringify(b))
    if (e.type === 'handEnd') {
      const seated = e.stacks.filter((s) => s > 0).length - arrivedNow
      arrivedNow = 0
      out.hands.push({
        no: run.handNo,
        triggerWin: won && !!out.ko && out.koHand >= 0 && run.handNo > out.koHand && ranksOf(hole) === out.ko,
        seatedAfter: seated,
        tableOver: seated <= 1,
      })
      hole = null
      won = false
    }
  }
  const onHumanTurn = async (view: TurnView): Promise<Decision> => {
    const i = out.decisions.length
    const d: Decision = replay && i < replay.length ? { ...replay[i] } : policy(seed, i, view, out.ko)
    out.decisions.push({ ...d })
    return d
  }
  const game = new Game([HUMAN, ...cast.map(personality)], {
    mode: 'tournament', buyIn: table.buyIn, rollouts: 60, rng: mulberry32(seed),
    handsPerLevel: table.handsPerLevel, humanSeat: 0, onHumanTurn, onEvent,
    arrivals: arrivalRules(table, 'tour', cast),
  })
  let n = 0
  while (!game.isComplete() && n < HAND_CAP && !humanOut) {
    await game.playHand()
    n++
  }
  out.chipsOk = game.stacks().reduce((a, b) => a + b, 0) === game.chipsInPlay()
  return out
}

console.log(`\nOne chair, two men: ${pair.join(' / ')} at ${table.name}, after ${champion} sits down\n`)

// The coin.
{
  let firstCount = 0
  let both = 0
  const N = 4000
  for (let seed = 1; seed <= N; seed++) {
    const s = sittingSeats(table.seats, seed)
    if (s.includes(pair[0])) firstCount++
    if (s.includes(pair[0]) && s.includes(pair[1])) both++
  }
  const share = firstCount / N
  if (share < 0.45 || share > 0.55) fail(`the coin is not fair: ${pair[0]} dealt in ${(share * 100).toFixed(1)}% of sittings`)
  if (both) fail(`${both} sittings dealt both halves`)
  console.log(`  coin: ${pair[0]} ${(share * 100).toFixed(1)}%, ${pair[1]} ${(100 - share * 100).toFixed(1)}% of ${N} sittings; both at once: ${both}`)
}

let found = 0
const byHalf: Record<string, number> = {}
for (let seed = 1; seed <= SEARCH && (found < 4 || Object.keys(byHalf).length < 2); seed++) {
  const a = await play(seed)
  if (!a.chipsOk) fail(`seed ${seed}: chips not conserved`)
  const dealt = a.cast.find((id) => pair.includes(id))!
  const other = CHARACTERS[dealt]!.other!.character
  const back = a.arrivals.filter((x) => x.id === other)
  const eligible = a.hands.find((h) =>
    h.triggerWin && h.seatedAfter < a.cast.length + 1 && !h.tableOver && a.championHand >= 0 && h.no >= a.championHand)
  if (!eligible) {
    if (back.length) fail(`seed ${seed}: ${other} walked in without the trigger (ko ${a.ko || 'unseen'}, champion after hand ${a.championHand})`)
    continue
  }
  found++
  byHalf[other] = (byHalf[other] ?? 0) + 1
  if (back.length !== 1) { fail(`seed ${seed}: ${back.length} returns, expected one`); continue }
  const v = back[0]
  if (v.hand !== eligible.no) fail(`seed ${seed}: ${other} walked in after hand ${v.hand}, the trigger was hand ${eligible.no}`)
  if (v.seat === 0) fail(`seed ${seed}: ${other} took the player's chair`)
  if (v.hand < a.championHand) fail(`seed ${seed}: ${other} came back before ${champion} sat down`)
  if (!a.scene.length) fail(`seed ${seed}: no scene was played for ${other}`)
  const b = await play(seed, a.decisions)
  const same = a.transcript.length === b.transcript.length && a.transcript.every((l, i) => l === b.transcript[i])
  if (!same) fail(`seed ${seed}: the decision log does not replay identically`)
  console.log(`  seed ${String(seed).padStart(3)}  ${dealt} out on ${a.ko} (hand ${a.koHand}); ${champion} in after hand ${a.championHand}; ` +
    `${other} back after hand ${v.hand} in chair ${v.seat}; scene ${a.scene.length} lines; replay ${same ? 'identical' : 'DIFFERS'}`)
}
if (!found) fail(`no seed in ${SEARCH} brought the other half back`)
for (const id of pair) if (!byHalf[id]) fail(`no seed in ${SEARCH} brought ${id} back`)

console.log(failures ? `\nFAIL: ${failures} problem(s).` : '\nPASS.')
process.exit(failures ? 1 : 0)
