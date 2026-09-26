/**
 * THE UNINVITED GUEST, FORCED: the hidden six-seven banishment, checked.
 *
 * Win a pot holding a six and a seven and the house shows one opponent out;
 * Loki sits down in that chair behind the same chips (Banishment in game.ts,
 * the script in data/dialogue/uninvited.json). It is rare on purpose, so it
 * cannot be left to a playtest. This drives every table with a scripted
 * player who never lets go of a six-seven, searches seeds until the event
 * fires, and checks, per table:
 *
 *   - exactly one banishment, of a seated opponent who was dealt into the
 *     hand -- never the champion, the dealer, or anyone a late arrival waits
 *     on -- and only after the player won chips holding a six and a seven;
 *   - Loki in the SAME chair with the EXACT stack, and playing from then on;
 *   - chips conserved at that hand and at the end of the table;
 *   - no elimination, no finishing place and no knockout for the one shown
 *     out, and no second banishment however many six-sevens follow;
 *   - the table saw the cards: the dealer turns them up when nobody did;
 *   - a save taken mid-hand AFTER the event resumes identically, and the
 *     whole decision log replays identically.
 *
 * Then: never at the finale, open tables work, a rule with nobody eligible
 * draws nothing and stays armed for later, the ROSTER and the marks treat the
 * guest correctly.
 *
 *   npm run check:loki
 */
import { Game, type HandEvent, type TurnView, type Arrival, type Banishment } from './game.js'
import { HUMAN } from './personality.js'
import type { Decision } from './decide.js'
import { preflopStrength, type Card } from './equity.js'
import { mulberry32 } from './rng.js'
import { TABLES, TABLE_BY_ID, DIALOGUE, UNINVITED, ROSTER, CHARACTERS, MARKS, personality, banishmentFor, type TableData } from './content.js'
import { TableRun, type Beat } from './director.js'
import { openTableCast } from './tour.js'
import { freshSave, characterRecord } from './save.js'
import { marksForCareer, handRank } from './marks.js'

const HAND_CAP = 400
const SEARCH = 120
const GUEST = UNINVITED.guest
const TRIGGER = [...UNINVITED.trigger.hole_ranks].sort().join()
const is67 = (hole: Card[] | null) => !!hole && hole.map((c) => c.rank as string).sort().join() === TRIGGER

let failures = 0
const fail = (msg: string) => {
  failures++
  console.log(`     FAIL ${msg}`)
}

/**
 * The scripted player: replay-check's sensible amateur, except that a
 * six-seven is never folded -- half the time it is shoved, otherwise it is
 * called down. Shoves win uncontested (the dealer must turn the cards up);
 * call-downs win at showdown. Deterministic per (seed, decision number).
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

  if (is67(view.hole)) return raise && x < 0.5 ? act(raise, view.maxRaise) : passive()

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
  if (raise && view.toCall === 0 && x < 0.08) return act(raise, sized(0.5))
  return giveUp()
}

type Run = {
  transcript: string[]
  events: HandEvent[]
  /** Director beats, by index of the event that produced them. */
  beats: Map<number, Beat[]>
  decisions: Decision[]
  /** decisions.length when the banishment fired, or -1. */
  cutAtEvent: number
  /** Hand numbers the player won chips holding the trigger ranks. */
  triggerWins: number[]
  knockoutsAtEvent: string[] | null
  chipsAtEvent: boolean
  chipsOk: boolean
  eliminated: string[]
  hands: number
  won: boolean
}

async function play(
  table: TableData,
  mode: 'tour' | 'open',
  cast: string[],
  seed: number,
  banishment: Banishment | undefined,
  replay: Decision[] | null = null,
): Promise<Run> {
  const out: Run = {
    transcript: [], events: [], beats: new Map(), decisions: [], cutAtEvent: -1, triggerWins: [],
    knockoutsAtEvent: null, chipsAtEvent: true, chipsOk: true, eliminated: [], hands: 0, won: false,
  }
  const arrivals: Arrival[] = mode === 'tour' && table.arrival
    ? [{
        personality: personality(table.arrival.character),
        afterEliminations: table.arrival.afterEliminations,
        afterEliminationOf: table.arrival.afterEliminationOf,
        delayHands: table.arrival.delayHands,
        stack: table.arrival.stack,
      }]
    : []
  const run = new TableRun({
    table,
    dialogue: DIALOGUE[table.id],
    mode,
    seed,
    playerName: 'Tester',
    respectTier: 0,
    respectPoints: 0,
    earnedMarks: [],
    buyIn: table.buyIn,
    uninvited: banishment ? UNINVITED : undefined,
  })
  let humanOut = false
  let hole: Card[] | null = null
  let game: Game
  let eventHand = -1
  const onEvent = (e: HandEvent) => {
    if (e.type === 'deal') hole = e.hole
    if (e.type === 'result' && e.seat === 0 && e.delta > 0 && is67(hole)) out.triggerWins.push(run.handNo)
    if (e.type === 'eliminated') {
      out.eliminated.push(e.id)
      if (e.seat === 0) humanOut = true
    }
    if (e.type === 'banished' && out.cutAtEvent < 0) {
      out.cutAtEvent = out.decisions.length
      eventHand = run.handNo
    }
    if (e.type === 'handEnd' && run.handNo === eventHand) {
      out.chipsAtEvent = e.stacks.reduce((a, b) => a + b, 0) === game.chipsInPlay()
    }
    out.events.push(e)
    out.transcript.push(JSON.stringify(e))
    const beats = run.onEvent(e)
    out.beats.set(out.events.length - 1, beats)
    for (const b of beats) out.transcript.push('  ' + JSON.stringify(b))
    if (e.type === 'handEnd' && run.handNo === eventHand) out.knockoutsAtEvent = run.lastSummary?.knockouts ?? []
    if (e.type === 'handEnd') hole = null
  }
  const onHumanTurn = async (view: TurnView): Promise<Decision> => {
    const i = out.decisions.length
    const d: Decision = replay && i < replay.length ? { ...replay[i] } : policy(seed, i, view)
    out.decisions.push({ ...d })
    return d
  }
  game = new Game([HUMAN, ...cast.map(personality)], {
    mode: 'tournament',
    buyIn: table.buyIn,
    rollouts: 60,
    rng: mulberry32(seed),
    handsPerLevel: table.handsPerLevel,
    humanSeat: 0,
    onHumanTurn,
    onEvent,
    arrivals,
    banishment,
  })
  while (!game.isComplete() && out.hands < HAND_CAP && !humanOut) {
    await game.playHand()
    out.hands++
  }
  out.won = game.isComplete() && game.survivors()[0] === 0
  if (out.won || humanOut) {
    for (const b of run.finish(out.won, game.handCount(), game.missedArrivals()).beats) out.transcript.push('  ' + JSON.stringify(b))
  }
  out.chipsOk = game.stacks().reduce((a, b) => a + b, 0) === game.chipsInPlay()
  return out
}

const same = (x: string[], y: string[]) => x.length === y.length && x.every((l, i) => l === y[i])
const firstDiff = (x: string[], y: string[]) => x.findIndex((l, i) => l !== y[i])
const lines = (bs: Beat[] | undefined) => (bs ?? []).filter((b): b is Extract<Beat, { kind: 'line' }> => b.kind === 'line')

/** Re-derived independently of the director: does this table only ever give them stage directions? */
function wordless(table: TableData, id: string): boolean {
  const mine: any[] = []
  const walk = (x: any): void => {
    if (Array.isArray(x)) x.forEach(walk)
    else if (x && typeof x === 'object') {
      if (typeof x.speaker === 'string' && typeof x.text === 'string') { if (x.speaker === id) mine.push(x) }
      else Object.values(x).forEach(walk)
    }
  }
  walk(DIALOGUE[table.id])
  return mine.length > 0 && mine.every((l) => l.type === 'stage_direction')
}

/** Everything that must hold about one run in which the guest arrived. */
function verify(label: string, table: TableData, cast: string[], a: Run, expectedExclusions: string[]) {
  const bans = a.events.flatMap((e, i) => (e.type === 'banished' ? [{ e, i }] : []))
  if (bans.length !== 1) return fail(`${label}: ${bans.length} banishments, expected exactly 1`)
  const { e: ban, i: bi } = bans[0] as { e: Extract<HandEvent, { type: 'banished' }>; i: number }

  // Who: seated, dealt in, not protected.
  const handEv = [...a.events.slice(0, bi)].reverse().find((e) => e.type === 'hand') as Extract<HandEvent, { type: 'hand' }>
  if (handEv.seats[ban.seat] !== ban.id) fail(`${label}: ${ban.id} was not dealt into the hand that triggered it`)
  if (ban.seat === 0) fail(`${label}: the player was banished`)
  if (expectedExclusions.includes(ban.id)) fail(`${label}: banished ${ban.id}, who is protected`)
  if (ban.by !== GUEST) fail(`${label}: replaced by ${ban.by}, not ${GUEST}`)
  if (!cast.includes(ban.id) && ban.id !== table.arrival?.character) fail(`${label}: ${ban.id} was never at this table`)

  // Why: the player won chips holding the trigger ranks, in that very hand.
  if (!a.triggerWins.includes(handEv.hand)) fail(`${label}: fired in hand ${handEv.hand} without a six-seven win`)
  if (a.triggerWins[0] !== handEv.hand) fail(`${label}: an earlier six-seven win (hand ${a.triggerWins[0]}) did not fire it`)

  // The chair: same seat, exact stack, the guest from then on.
  const arr = a.events[bi + 1]
  if (!arr || arr.type !== 'arrival' || arr.cause !== 'banishment') return fail(`${label}: no guest arrival straight after the banishment`)
  if (arr.id !== GUEST || arr.seat !== ban.seat || arr.stack !== ban.stack || arr.replaces !== ban.id) {
    fail(`${label}: guest arrival ${JSON.stringify(arr)} does not match ${JSON.stringify(ban)}`)
  }
  const end = a.events.slice(bi).find((e) => e.type === 'handEnd') as Extract<HandEvent, { type: 'handEnd' }> | undefined
  if (end && end.stacks[ban.seat] !== ban.stack) fail(`${label}: chair holds ${end.stacks[ban.seat]}, expected ${ban.stack}`)
  const next = a.events.slice(bi).find((e) => e.type === 'hand') as Extract<HandEvent, { type: 'hand' }> | undefined
  if (next && next.seats[ban.seat] !== GUEST) fail(`${label}: next hand seats ${next.seats[ban.seat]} in the chair`)
  if (next && !a.events.slice(a.events.indexOf(next)).some((e) => e.type === 'action' && e.seat === ban.seat)) {
    fail(`${label}: the guest never acted`)
  }
  if (!a.chipsAtEvent) fail(`${label}: chips not conserved at the banishment`)
  if (!a.chipsOk) fail(`${label}: chips not conserved at the end`)

  // Not an elimination.
  if (a.eliminated.includes(ban.id)) fail(`${label}: ${ban.id} recorded as eliminated`)
  if (a.knockoutsAtEvent?.includes(ban.id)) fail(`${label}: knockout credited for ${ban.id}`)
  if (a.events.some((e) => e.type === 'eliminated' && e.id === ban.id)) fail(`${label}: elimination event for ${ban.id}`)

  // What the room said.
  const said = [...lines(a.beats.get(bi)), ...lines(a.beats.get(bi + 1))]
  const sd = [...a.events.slice(0, bi)].reverse().find((e) => e.type === 'showdown' || e.type === 'hand')
  const seen = sd?.type === 'showdown' && sd.revealed.length > 1 && sd.revealed.some((r) => r.seat === 0)
  const revealed = said.some((l) => UNINVITED.reveal.some((r) => r.id === l.id))
  if (revealed === seen) fail(`${label}: cards ${seen ? 'were shown down but turned up again' : 'never shown to the table'}`)
  const mute = wordless(table, ban.id)
  const offence = said.find((l) => (mute ? UNINVITED.offence_mimed : UNINVITED.offence).some((o) => o.id === l.id))
  if (!offence || offence.speaker !== ban.id) fail(`${label}: the ${mute ? 'mimed ' : ''}offence did not come from ${ban.id}`)
  if (!said.some((l) => UNINVITED.banishment.some((o) => o.id === l.id))) fail(`${label}: Death never ruled`)
  if (!said.some((l) => l.speaker === GUEST)) fail(`${label}: the guest said nothing on arriving`)

  return { ban, seen }
}

const t0 = Date.now()
let postEventTriggerWins = 0
let uncontested = 0
let contested = 0

// ---------------------------------------------------------------- every table but the finale, as toured

for (const table of TABLES) {
  if (table.kind === 'finale') continue
  const rule = banishmentFor(table)
  if (!rule) { fail(`${table.id}: no banishment rule`); continue }
  // The rule protects the dealer and the champion; the engine itself protects
  // anyone a late arrival waits on (the Station's Robot).
  const protectedIds = ['death', ...(table.champion ? [table.champion] : []), ...(table.arrival?.afterEliminationOf ? [table.arrival.afterEliminationOf] : [])]
  if (!rule.exclude.includes('death') || (table.champion && !rule.exclude.includes(table.champion))) {
    fail(`${table.id}: the rule does not protect the dealer and the champion`)
  }
  let found = false
  for (let k = 0; k < SEARCH && !found; k++) {
    const seed = (20260926 + k * 7717 + table.position * 131) >>> 0
    const a = await play(table, 'tour', table.seats, seed, rule)
    if (a.cutAtEvent < 0) continue
    found = true
    const v = verify(table.id, table, table.seats, a, protectedIds)
    if (!v) continue
    const later = a.triggerWins.filter((h) => h > a.triggerWins[0])
    postEventTriggerWins += later.length
    if (v.seen) contested++
    else uncontested++

    const b = await play(table, 'tour', table.seats, seed, rule, a.decisions)
    // Resume from a save taken mid-hand, after the event.
    const rest = a.decisions.length - a.cutAtEvent
    const cut = a.cutAtEvent + Math.floor(rest * (0.2 + 0.6 * mulberry32(seed)()))
    const c = await play(table, 'tour', table.seats, seed, rule, a.decisions.slice(0, cut))
    if (!same(a.transcript, b.transcript)) fail(`${table.id}: full replay diverged at line ${firstDiff(a.transcript, b.transcript)}`)
    if (!same(a.transcript, c.transcript)) {
      const i = firstDiff(a.transcript, c.transcript)
      fail(`${table.id}: resume after the event diverged at line ${i}\n       A: ${a.transcript[i]}\n       C: ${c.transcript[i]}`)
    }
    console.log(
      `ok   ${table.id.padEnd(14)} seed ${seed}  ${v.ban.id} shown out, ${GUEST} takes ${v.ban.stack} in chair ${v.ban.seat}` +
      `  (${v.seen ? 'showdown' : 'uncontested, cards turned up'}; ${later.length} later six-seven win${later.length === 1 ? '' : 's'}, no second event;` +
      ` resumed at #${cut} of ${a.decisions.length})`,
    )
  }
  if (!found) fail(`${table.id}: no seed in ${SEARCH} produced the event`)
}

// ---------------------------------------------------------------- open tables

for (const id of ['white_house', 'station']) {
  const table = TABLE_BY_ID[id]
  let found = false
  for (let k = 0; k < SEARCH && !found; k++) {
    const seed = (20261031 + k * 3301) >>> 0
    let x = seed
    const cast = openTableCast(table, () => ((x = (x * 1664525 + 1013904223) >>> 0) / 2 ** 32))
    const a = await play(table, 'open', cast, seed, banishmentFor(table))
    if (a.cutAtEvent < 0) continue
    found = true
    const v = verify(`open ${id}`, table, cast, a, ['death'])
    if (v) console.log(`ok   open ${id.padEnd(9)} seed ${seed}  ${v.ban.id} shown out at an open table, ${GUEST} sits down`)
  }
  if (!found) fail(`open ${id}: no seed in ${SEARCH} produced the event`)
}

// ---------------------------------------------------------------- never at the finale

{
  const finale = TABLES.find((t) => t.kind === 'finale')!
  if (banishmentFor(finale)) fail('the finale has a banishment rule')
  // Even forced onto it, the only opponent there is the dealer, who is never shown out.
  const forced: Banishment = { personality: personality(GUEST), holeRanks: UNINVITED.trigger.hole_ranks, exclude: ['death'] }
  let wins = 0
  for (let k = 0; k < SEARCH && wins === 0; k++) {
    const seed = (20261111 + k * 911) >>> 0
    for (const rule of [banishmentFor(finale), forced]) {
      const a = await play(finale, 'tour', finale.seats, seed, rule)
      if (a.events.some((e) => e.type === 'banished' || (e.type === 'arrival' && e.cause === 'banishment'))) fail(`finale seed ${seed}: the dealer's table had a banishment`)
      if (rule) wins += a.triggerWins.length
    }
  }
  if (!wins) fail('finale: never saw a six-seven win to test against')
  else console.log(`ok   finale         six-seven won ${wins} time${wins === 1 ? '' : 's'} at the dealer's table; nothing happened`)
}

// ---------------------------------------------------------------- nobody eligible: no draw, still armed

{
  // A rule that protects everyone must be invisible: same cards, same words,
  // same everything as no rule at all, even through six-seven wins.
  const table = TABLE_BY_ID.white_house
  const all: Banishment = { personality: personality(GUEST), holeRanks: UNINVITED.trigger.hole_ranks, exclude: [...table.seats, 'death'] }
  let checked = false
  for (let k = 0; k < SEARCH && !checked; k++) {
    const seed = (20261205 + k * 577) >>> 0
    const a = await play(table, 'tour', table.seats, seed, all)
    if (!a.triggerWins.length) continue
    checked = true
    const b = await play(table, 'tour', table.seats, seed, undefined)
    if (a.cutAtEvent >= 0) fail('white_house: banished someone protected')
    if (!same(a.transcript, b.transcript)) fail(`white_house: a rule with nobody eligible changed the table (line ${firstDiff(a.transcript, b.transcript)})`)
    else console.log(`ok   nobody eligible: ${a.triggerWins.length} six-seven win${a.triggerWins.length === 1 ? '' : 's'}, table identical to one with no rule`)
  }
  if (!checked) fail('white_house: never saw a six-seven win with everyone protected')

  // Protect only the opening chairs: the late champion is the first person
  // who CAN be shown out, so a six-seven before he sits must leave the rule
  // armed for one after. (A test rule: the real one protects champions.)
  let armed = false
  for (const id of ['transylvania', 'rome', 'athens']) {
    const t = TABLE_BY_ID[id]
    const rule: Banishment = { personality: personality(GUEST), holeRanks: UNINVITED.trigger.hole_ranks, exclude: [...t.seats, 'death'] }
    for (let k = 0; k < SEARCH * 2 && !armed; k++) {
      const seed = (20261301 + k * 263 + t.position) >>> 0
      const a = await play(t, 'tour', t.seats, seed, rule)
      const arrivedAt = a.events.findIndex((e) => e.type === 'arrival' && !e.cause)
      if (a.cutAtEvent < 0 || arrivedAt < 0) continue
      const hands = a.events.slice(0, arrivedAt).filter((e) => e.type === 'hand').length
      if (!a.triggerWins.some((h) => h <= hands)) continue
      armed = true
      const ban = a.events.find((e) => e.type === 'banished') as Extract<HandEvent, { type: 'banished' }>
      if (ban.id !== t.arrival!.character) fail(`${id}: expected the late ${t.arrival!.character} to be shown out, got ${ban.id}`)
      else console.log(`ok   still armed: six-seven in hand ${a.triggerWins[0]} with nobody eligible; after ${ban.id} sat down, a later one fired it (${id}, seed ${seed})`)
    }
    if (armed) break
  }
  if (!armed) fail('never found a six-seven before the only eligible player sat down, followed by one after')
}

// ---------------------------------------------------------------- someone with no voice

{
  // The Horseman has no mouth and Cerberus does not talk: whoever the table
  // only ever gives stage directions mimes it. A test rule that leaves only
  // Cerberus to be shown out (the real one leaves him in the running).
  const t = TABLE_BY_ID.rome
  const mute = t.seats.find((id) => wordless(t, id))
  if (!mute) fail('rome: nobody wordless to test the mimed offence with')
  else {
    const rule: Banishment = {
      personality: personality(GUEST), holeRanks: UNINVITED.trigger.hole_ranks,
      exclude: [...t.seats.filter((id) => id !== mute), t.champion!, 'death'],
    }
    let found = false
    for (let k = 0; k < SEARCH * 2 && !found; k++) {
      const seed = (20261401 + k * 419) >>> 0
      const a = await play(t, 'tour', t.seats, seed, rule)
      if (a.cutAtEvent < 0) continue
      found = true
      const v = verify(`rome (${mute})`, t, t.seats, a, ['death', t.champion!])
      const said = lines(a.beats.get(a.events.findIndex((e) => e.type === 'banished')))
      const mimed = said.find((l) => l.speaker === mute)
      if (v && mimed?.stage) console.log(`ok   wordless: ${mute} is shown out after ${JSON.stringify(mimed.text)}`)
      else fail(`rome: ${mute}'s offence was not a stage direction`)
    }
    if (!found) fail(`rome: no seed produced ${mute}'s banishment`)
  }
}

// ---------------------------------------------------------------- the guest in the ledger and the marks

{
  const guest = CHARACTERS[GUEST]
  if (!guest || guest.role !== 'guest') fail(`${GUEST} is not a guest`)
  if (ROSTER.some((c) => c.id === GUEST)) fail(`${GUEST} is on the ROSTER`)
  if (TABLES.some((t) => t.seats.includes(GUEST) || t.arrival?.character === GUEST)) fail(`${GUEST} is seated at a table`)
  const mark = MARKS.find((m) => m.when.type === 'met' && m.when.character === GUEST)
  if (!mark) fail(`no mark for meeting ${GUEST}`)
  else {
    if (!mark.secret) fail(`${mark.id} is not secret`)
    const s = freshSave()
    s.player = { name: 'Tester', invitedAt: '' }
    // Every legend beaten: the full-ledger mark must not wait for the guest.
    for (const c of ROSTER) characterRecord(s, c.id).beaten = 'x'
    const before = marksForCareer(s)
    if (before.includes(mark.id)) fail(`${mark.id} earned before meeting ${GUEST}`)
    if (!before.includes('full_ledger')) fail('the full ledger waits on the guest')
    characterRecord(s, GUEST).met = 'x'
    if (!marksForCareer(s).includes(mark.id)) fail(`${mark.id} not earned after meeting ${GUEST}`)
    console.log(`ok   ${GUEST} is off the ROSTER and every table; "${mark.title}" is secret and earned on meeting him`)
  }
}

if (!postEventTriggerWins) fail('no six-seven win after an event anywhere: "never fires twice" went untested')
if (!uncontested || !contested) fail(`need both kinds of win (showdown ${contested}, uncontested ${uncontested})`)
console.log(
  `\n${failures ? 'FAIL' : 'PASS'}: ${contested} showdown and ${uncontested} uncontested banishments, ` +
  `${postEventTriggerWins} later six-seven wins that did not fire again, in ${((Date.now() - t0) / 1000).toFixed(1)}s.`,
)
if (failures) process.exit(1)
