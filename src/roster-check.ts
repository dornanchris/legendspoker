import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Game } from './game.js'
import { mulberry32 } from './rng.js'
import {
  ROSTER,
  TABLES,
  byId,
  castFor,
  personalityFor,
  sharpen,
  tableOf,
  type RosterEntry,
} from './roster.js'

/**
 * `npm run check:roster` — the casting rule, as a measurement.
 *
 * The design doc's most important rule is that a table is a PLACE, not a
 * PROFESSION: four seats must be four people in the room for four DIFFERENT
 * reasons, and "different reasons produce different temperaments, and
 * different temperaments are exactly what the personality dials turn into
 * distinct play". That last clause is a claim about numbers, and it is
 * checkable without a single line of art.
 *
 * So this does two things:
 *
 * 1. Validates the roster structurally — every seat resolves, one champion per
 *    table, dials in range, dialogue speakers exist. Failures exit non-zero.
 * 2. PLAYS every table and reports whether its cast actually reads as distinct
 *    players, flagging any pair that blurs.
 *
 * Finding out that two characters play identically costs nothing today. It
 * costs a rig each once they are animated, which is roughly ninety hours of a
 * skill the project has not tested yet.
 *
 * Caveat, and it is the same one as always: VPIP, PFR and AF settle quickly,
 * but bb/100 does not. This measures whether characters are DIFFERENT, not
 * whether they are balanced. Do not tune dials on what it prints.
 */

const HANDS = Number(process.argv[2] ?? 2000)

// Speakers that are not roster characters.
const NON_ROSTER_SPEAKERS = new Set(['death', 'player', 'narrator'])

const errors: string[] = []
const warnings: string[] = []
const err = (s: string) => errors.push(s)
const warn = (s: string) => warnings.push(s)

// ------------------------------------------------------------- structure

const seen = new Map<string, RosterEntry>()
for (const e of ROSTER) {
  if (seen.has(e.id)) err(`duplicate character id "${e.id}"`)
  seen.set(e.id, e)
  if (!tableOf(e.table)) err(`${e.id} sits at unknown table "${e.table}"`)
  for (const [k, v] of Object.entries(e.dials)) {
    if (!Number.isFinite(v) || v < 0 || v > 1) err(`${e.id}.${k} is ${v}, outside 0..1`)
  }
  if (!e.why.trim()) err(`${e.id} has no casting reason`)
  const p = personalityFor(e)
  if (p.tells.length > 3) err(`${e.id} declares ${p.tells.length} tells; the rig contract has three slots`)
}

const positions = new Set<number>()
for (const t of TABLES) {
  if (positions.has(t.position)) err(`two tables claim tour position ${t.position}`)
  positions.add(t.position)
  if (t.seats.length !== 4) err(`${t.id} has ${t.seats.length} seats, expected 4`)
  for (const s of t.seats) if (!byId(s)) err(`${t.id} seats unknown character "${s}"`)
  const champ = byId(t.champion)
  if (!champ) err(`${t.id} names unknown champion "${t.champion}"`)
  else if (!champ.champion) err(`${t.champion} is ${t.id}'s champion but is not flagged as one`)
  const champs = castFor(t.id).filter((e) => e.champion)
  if (champs.length !== 1) err(`${t.id} has ${champs.length} champions`)
  if (t.entrance === 'seated' && !t.seats.includes(t.champion)) {
    err(`${t.id}'s champion is seated from hand one but holds no seat`)
  }
  if (t.entrance !== 'seated' && t.seats.includes(t.champion)) {
    err(`${t.id}'s champion arrives late but already holds a seat`)
  }
}
if (positions.size !== TABLES.length) err('tour positions are not contiguous')

// The legibility axis has to actually rise across the tour, or the second
// difficulty axis is decorative.
const noiseByTable = TABLES.map((t) => {
  const cast = castFor(t.id).filter((e) => !e.caution?.includes('Do NOT raise'))
  const avg = cast.reduce((n, e) => n + sharpen(e, t.position).noiseToSignal, 0) / cast.length
  return { table: t.displayName, position: t.position, noise: avg }
})
const first = noiseByTable[0].noise
const last = noiseByTable[noiseByTable.length - 1].noise
if (last <= first) err(`legibility does not fall across the tour: ${first.toFixed(2)} -> ${last.toFixed(2)}`)

// -------------------------------------------------------------- dialogue

const dialogueDir = fileURLToPath(new URL('../data/dialogue/', import.meta.url))
let dialogueFiles = 0
let linesChecked = 0
for (const file of readdirSync(dialogueDir).filter((f) => f.endsWith('.json'))) {
  dialogueFiles++
  let doc: any
  try {
    doc = JSON.parse(readFileSync(dialogueDir + file, 'utf8'))
  } catch (e) {
    err(`${file} is not valid JSON: ${(e as Error).message}`)
    continue
  }
  const table = TABLES.find((t) => t.id === doc.table)
  if (!table) {
    err(`${file} is for table "${doc.table}", which is not in the tour`)
    continue
  }
  if (doc.tour_position !== table.position) {
    err(`${file} claims tour position ${doc.tour_position}; the roster says ${table.position}`)
  }
  if (doc.champion !== table.champion) {
    err(`${file} names champion "${doc.champion}"; the roster says "${table.champion}"`)
  }
  // Every speaker has to be somebody who is actually in the room.
  const cast = new Set(castFor(table.id).map((e) => e.id))
  const walk = (node: any) => {
    if (Array.isArray(node)) return node.forEach(walk)
    if (!node || typeof node !== 'object') return
    if (typeof node.speaker === 'string') {
      linesChecked++
      if (!cast.has(node.speaker) && !NON_ROSTER_SPEAKERS.has(node.speaker)) {
        err(`${file}: line ${node.id ?? '(no id)'} is spoken by "${node.speaker}", who is not at that table`)
      }
    }
    Object.values(node).forEach(walk)
  }
  walk(doc)
}
for (const t of TABLES) {
  const has = readdirSync(dialogueDir).some((f) => {
    try { return JSON.parse(readFileSync(dialogueDir + f, 'utf8')).table === t.id } catch { return false }
  })
  if (!has) warn(`${t.displayName} has no dialogue file yet`)
}

// -------------------------------------------------- do they play differently

type Profile = { id: string; name: string; uncast: boolean; vpip: number; pfr: number; af: number }

async function profileTable(id: (typeof TABLES)[number]['id']): Promise<Profile[]> {
  const cast = castFor(id)
  const seed = 40260901 + TABLES.findIndex((t) => t.id === id) * 977
  const game = new Game(cast.map(personalityFor), {
    mode: 'cash',
    buyIn: 2000,
    bigBlind: 20,
    smallBlind: 10,
    rollouts: 60,
    seed,
    rng: mulberry32(seed),
  })
  for (let i = 0; i < HANDS; i++) await game.playHand()
  return game.getSeats().map((s, i) => ({
    id: cast[i].id,
    name: cast[i].name,
    uncast: !!cast[i].uncast,
    vpip: (s.stats.vpip / s.stats.hands) * 100,
    pfr: (s.stats.pfr / s.stats.hands) * 100,
    af: s.stats.calls > 0 ? s.stats.bets / s.stats.calls : s.stats.bets,
  }))
}

/** Two characters blur if a player could not tell them apart from play alone. */
function blurs(a: Profile, b: Profile): boolean {
  if (a.uncast || b.uncast) return false
  return Math.abs(a.vpip - b.vpip) < 8 && Math.abs(a.pfr - b.pfr) < 8 && Math.abs(a.af - b.af) < 0.5
}

const C = {
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bad: (s: string) => `\x1b[31m${s}\x1b[0m`,
  warn: (s: string) => `\x1b[33m${s}\x1b[0m`,
}

console.log(`\nRoster: ${ROSTER.length} characters across ${TABLES.length} tables`)
console.log(C.dim(`${HANDS} hands per table. VPIP/PFR/AF settle fast; bb/100 does not, and is
not shown, because this measures whether characters are DIFFERENT rather than
whether they are balanced.\n`))

let blurred = 0
for (const t of TABLES) {
  const profiles = await profileTable(t.id)
  console.log(`${t.position}. ${t.displayName}`)
  console.log(C.dim('   character                  VPIP    PFR     AF'))
  for (const p of profiles) {
    console.log(
      `   ${p.name.padEnd(26)}${p.vpip.toFixed(1).padStart(4)}  ${p.pfr.toFixed(1).padStart(5)}  ${p.af.toFixed(2).padStart(5)}`,
    )
  }
  for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      if (blurs(profiles[i], profiles[j])) {
        blurred++
        console.log(C.warn(`   ! ${profiles[i].name} and ${profiles[j].name} play the same`))
      }
    }
  }
  console.log()
}

console.log(`Structure   ${errors.length === 0 ? 'ok' : C.bad(`${errors.length} errors`)}`)
for (const e of errors) console.log(`  ${C.bad('x')} ${e}`)
console.log(`Dialogue    ${dialogueFiles} file(s), ${linesChecked} lines, every speaker in the room`)
console.log(`Casting     ${blurred === 0 ? 'every seat reads as a different player' : C.warn(`${blurred} pair(s) blur`)}`)
for (const w of warnings) console.log(`  ${C.warn('-')} ${w}`)

console.log(
  C.dim(`
A blurred pair is a CASTING problem, not a tuning one: the design doc's test is
whether four people would be in that room for four different reasons. If two of
them play the same, one of the reasons is not real yet. Fix the reason, then
the dials.`),
)

if (errors.length > 0) process.exit(1)
