/**
 * CONTENT CHECK: every character, table, line of dialogue and mark in data/
 * is well-formed and consistent with the rest.
 *
 * Content is data (non-negotiable #1 pushes all personality there, and the
 * dialogue was always data), which means a typo in a JSON file is a bug the
 * type checker cannot see. This is the type checker for content. It also
 * enforces the design doc's rules that CAN be checked mechanically: one
 * dealer plant per table, speakers who are actually in the room, placeholders
 * the game knows how to fill, and the copyright tripwires.
 *
 *   npm run check:data
 */
import { CHARACTERS, TABLES, DIALOGUE, DEALER, MARKS, STORY, UNINVITED, fullCast, type Line } from './content.js'
import { QUIRKS } from './quirks.js'
import { CONDITION_TYPES, conditionErrors } from './marks.js'

const errors: string[] = []
const warnings: string[] = []
const err = (where: string, msg: string) => errors.push(`${where}: ${msg}`)
const warn = (where: string, msg: string) => warnings.push(`${where}: ${msg}`)

const TODO = (v: unknown) => v === 'TODO' || (Array.isArray(v) && v.includes('TODO'))

// ---------------------------------------------------------------- characters

const DIALS = ['aggression', 'tightness', 'bluffFrequency', 'tiltSensitivity', 'adaptivity', 'noise'] as const
const CORRELATES = new Set(['strong', 'weak', 'bluffing', 'tilted'])
const PROFILE = ['ledger', 'ledger_beaten', 'history', 'at_the_table', 'look', 'prop', 'public_domain'] as const

for (const c of Object.values(CHARACTERS)) {
  const w = `character ${c.id}`
  if (c.role === 'guest') {
    // On a table, he would be on the map, in the intro and in the ledger.
    if (c.table !== null) err(w, 'a guest belongs to no table: "table" must be null')
    if (c.arrives) err(w, 'a guest is not a late arrival')
  } else if (!TABLES.some((t) => t.id === c.table)) err(w, `unknown table "${c.table}"`)
  if (!['he', 'she', 'it', 'they'].includes(c.pronoun)) err(w, `bad pronoun "${c.pronoun}"`)
  for (const d of DIALS) {
    const v = c.dials?.[d]
    if (typeof v !== 'number' || v < 0 || v > 1) err(w, `dial ${d} must be a number in 0..1 (got ${v})`)
  }
  for (const q of c.quirks ?? []) if (!QUIRKS[q.type]) err(w, `unknown quirk "${q.type}"`)
  if (c.role !== 'dealer' && (c.quirks ?? []).length === 0) warn(w, 'no quirk: dials alone converge on same-y bots')
  const signals = new Set<string>()
  for (const t of c.tells ?? []) {
    if (!t.signal || !t.text) err(w, 'a tell needs a signal and text')
    if (signals.has(t.signal)) err(w, `duplicate tell signal "${t.signal}"`)
    signals.add(t.signal)
    if (!CORRELATES.has(t.correlate)) err(w, `tell "${t.signal}" has unknown correlate "${t.correlate}"`)
    if (t.reliability < 0 || t.reliability > 1) err(w, `tell "${t.signal}" reliability out of range`)
  }
  if (c.role === 'dealer' && (c.tells?.length || c.dials.noise > 0)) {
    err(w, 'the dealer must have no tells and no noise: he is the endpoint of the legibility curve')
  }
  if (c.epithet === 'TODO' || !c.epithet) warn(w, 'no epithet')
  for (const k of PROFILE) {
    const v = (c.profile as any)?.[k]
    if (v === undefined || TODO(v) || (Array.isArray(v) ? v.length === 0 : !String(v).trim())) {
      err(w, `profile.${k} is not written`)
    }
  }
}

// ---------------------------------------------------------------- tables

const positions = new Set<number>()
for (const t of TABLES) {
  const w = `table ${t.id}`
  if (positions.has(t.position)) err(w, `duplicate position ${t.position}`)
  positions.add(t.position)
  for (const id of t.seats) if (!CHARACTERS[id]) err(w, `seat "${id}" is not a character`)
  for (const id of fullCast(t)) {
    if (CHARACTERS[id]?.role === 'guest') err(w, `"${id}" is a guest: seating him here puts him on the map`)
  }
  if (t.champion && !fullCast(t).includes(t.champion)) err(w, `champion "${t.champion}" never sits at this table`)
  if (t.arrival) {
    const a = t.arrival
    if (!CHARACTERS[a.character]) err(w, `arrival "${a.character}" is not a character`)
    if (a.afterEliminationOf && !t.seats.includes(a.afterEliminationOf)) err(w, `arrival waits on "${a.afterEliminationOf}", who is not seated`)
    if (!a.afterEliminationOf && !a.afterEliminations) err(w, 'arrival has no trigger')
    if (!t.presence) warn(w, 'late arrival but no presence line')
  }
  if (t.seats.length + 1 > 6) err(w, 'more than five opponents will not fit a landscape phone')
  for (const k of ['place', 'region', 'era', 'teaser', 'hook', 'room', 'music', 'entrance'] as const) {
    if (!t[k] || TODO(t[k])) err(w, `${k} is not written`)
  }
  if (!t.ambience?.length || TODO(t.ambience)) err(w, 'ambience is not written')
  if (!DIALOGUE[t.id]) err(w, 'no dialogue file')
}

// ---------------------------------------------------------------- dialogue

const TRIGGERS = new Set([
  'table_open', 'champion_arrival', 'champion_missed', 'headsup_start', 'player_wins_pot',
  'player_thinking_long', 'player_bad_beat', 'champion_loses_pot', 'first_elimination',
  'player_eliminates', 'player_wins_big_pot', 'player_all_in', 'blinds_up',
])
const READS = new Set(['loose', 'tight', 'aggressive', 'passive', 'bluffed', 'folds_fast', 'thinks_long'])
const PLACEHOLDER = /\{(\w+)\}/g
const KNOWN_PLACEHOLDERS = new Set(['name', 'nickname', 'title'])
/** Phrases that belong to someone else's copyright or to the wrong century. */
const TRIPWIRES = [
  /i am spartacus/i, /this is sparta/i, /\bHAL\b/, /\bdave\b/i, /larry talbot/i,
  /elementary, my dear/i, /flying dutchman/i, /\barchimedes\b/i, /\bmerlyn\b/i,
  /\bnasa\b/i, /\bklaatu\b/i, /\brobby\b/i, /one does not simply/i,
  /god of mischief/i, /glorious purpose/i, /puny god/i, /\bavengers?\b/i, /\bmarvel\b/i,
]
/**
 * The one meme in the game, allowed in exactly one place: the line that gets
 * its speaker shown out (uninvited.json, offence). Anywhere else it is the
 * anachronistic wink the design doc bans.
 */
const SIX_SEVEN = /\b(six|6)\W*(seven|7)\b/i
TRIPWIRES.push(SIX_SEVEN)

const ids = new Map<string, string>()
function checkLine(l: Line, where: string, speakers: Set<string>, allow: RegExp[] = []) {
  if (!l || typeof l !== 'object') return err(where, 'not a line object')
  if (!l.id) err(where, 'line without id')
  else if (ids.has(l.id)) err(where, `duplicate line id "${l.id}" (also in ${ids.get(l.id)})`)
  else ids.set(l.id, where)
  if (!l.text?.trim()) err(where, `line ${l.id} has no text`)
  if (!speakers.has(l.speaker)) err(where, `line ${l.id}: speaker "${l.speaker}" is not at this table`)
  if (l.trigger && !TRIGGERS.has(l.trigger) && !/^hand_\d+_start$/.test(l.trigger)) {
    err(where, `line ${l.id}: unknown trigger "${l.trigger}"`)
  }
  for (const m of (l.text ?? '').matchAll(PLACEHOLDER)) {
    if (!KNOWN_PLACEHOLDERS.has(m[1])) err(where, `line ${l.id}: unknown placeholder {${m[1]}}`)
  }
  for (const re of TRIPWIRES) if (!allow.includes(re) && re.test(l.text ?? '')) err(where, `line ${l.id}: tripwire ${re}`)
  if (l.type === 'stage_direction' && !/^\[.*\]$/.test(l.text.trim())) warn(where, `line ${l.id}: stage direction without [brackets]`)
}

for (const t of TABLES) {
  const d = DIALOGUE[t.id]
  if (!d) continue
  const w = `dialogue ${t.id}`
  const speakers = new Set(['death', 'narration', ...fullCast(t)])
  const all = (xs: Line[] | undefined, sub: string) => (xs ?? []).forEach((l) => checkLine(l, `${w} ${sub}`, speakers))

  all(d.table_intro, 'table_intro')
  all(d.dealer_plant, 'dealer_plant')
  all(d.death_asides, 'death_asides')
  all(d.champion_arrival, 'champion_arrival')
  all(d.champion_missed, 'champion_missed')
  all(d.champion_headsup, 'champion_headsup')
  all(d.player_busted, 'player_busted')
  all(d.champion_defeat, 'champion_defeat')
  all(d.reads_you, 'reads_you')
  for (const [tier, lines] of Object.entries(d.player_directed ?? {})) all(lines, `player_directed.${tier}`)
  for (const [key, pair] of Object.entries(d.banter_pairs ?? {})) {
    for (const x of pair.exchanges ?? []) all(x, `banter ${key}`)
  }
  for (const [id, lines] of Object.entries(d.eliminated ?? {})) {
    if (!speakers.has(id)) err(w, `eliminated lines for "${id}", who is not at this table`)
    all(lines, `eliminated.${id}`)
  }
  for (const [n, lines] of Object.entries(d.rematch_ladder ?? {})) all(lines, `rematch_ladder.${n}`)

  if (!d.table_intro?.length) err(w, 'no table_intro')
  // The one "the dealer arranged it" beat. More than one sequence is a second plant.
  const plant = d.dealer_plant ?? []
  if (t.kind !== 'finale' && plant.length === 0) err(w, 'no dealer_plant')
  if (plant.length) {
    const tr = plant[0].trigger ?? ''
    if (!/^hand_\d+_start$/.test(tr) && tr !== 'champion_arrival') err(w, `dealer_plant must open with hand_NN_start or champion_arrival, not "${tr}"`)
    if (plant.slice(1).some((l) => l.trigger)) err(w, 'dealer_plant has a second trigger: that is a second plant')
  }
  if (t.kind !== 'finale') {
    for (const tier of ['tier_0', 'tier_1', 'tier_2', 'tier_3']) {
      if (!d.player_directed?.[tier]?.length) err(w, `player_directed.${tier} is empty`)
    }
  }
  if (!d.earned_names?.tier_1 || !d.earned_names?.tier_3) err(w, 'earned_names needs tier_1 and tier_3')
  const t1 = d.player_directed?.tier_1?.[0]
  const nick = d.earned_names?.tier_1 ?? ''
  if (t1 && !t1.text.includes('{nickname}') && !(nick && t1.text.toLowerCase().includes(nick.toLowerCase()))) {
    warn(w, 'the first tier_1 line never says the nickname: the flip goes unannounced')
  }
  const t2 = d.player_directed?.tier_2?.[0]
  if (t2 && !t2.text.includes('{name}')) warn(w, 'the first tier_2 line does not use {name}: the flip to your real name goes unspoken')
  for (const id of fullCast(t)) if (!d.eliminated?.[id]?.length) err(w, `no eliminated lines for ${id}`)
  if (!d.player_busted?.length) err(w, 'no player_busted lines')
  if (!d.champion_defeat?.length) err(w, 'no champion_defeat lines')
  if (t.arrival && !d.champion_arrival?.length) err(w, 'late arrival but no champion_arrival lines')
  if (t.arrival?.delayHands && !d.champion_missed?.length) err(w, 'a missable arrival needs champion_missed lines')
  if (t.champion && !(d.champion_headsup ?? []).some((l) => l.trigger === 'headsup_start')) err(w, 'no headsup_start line')
  for (const l of d.reads_you ?? []) if (!l.when || !READS.has(l.when)) err(w, `reads_you line ${l.id}: unknown "when" ${l.when}`)
  const foreshadow = Object.values(d).flat(3).filter((x: any) => x && typeof x === 'object' && x.foreshadow).length
  if (foreshadow > 4) warn(w, `${foreshadow} foreshadow lines: ration them (design doc)`)
}

const dealerSpeakers = new Set(['death'])
for (const [key, lines] of Object.entries(DEALER)) {
  if (!Array.isArray(lines)) continue
  lines.forEach((l) => checkLine(l, `dealer ${key}`, dealerSpeakers))
}
for (const k of ['first_map', 'player_loses_table', 'rematch_table', 'replay_cleared', 'open_table', 'resume', 'table_won']) {
  if (!DEALER[k]?.length) err('dealer', `no "${k}" lines`)
}

// ---------------------------------------------------------------- returns

for (const c of Object.values(CHARACTERS)) {
  const r = c.returns
  if (!r) continue
  const w = `character ${c.id} returns`
  if (!Number.isInteger(r.afterHands) || r.afterHands < 1) err(w, 'afterHands must be a whole number of hands, 1 or more')
  if (r.stack !== 'average' && !(typeof r.stack === 'number' && r.stack > 0)) err(w, 'stack must be "average" or a positive number')
  if (!r.lines?.some((l) => l.speaker === c.id)) err(w, 'the returner has nothing to say')
  for (const l of r.lines ?? []) checkLine(l, w, new Set(['death', 'narration', c.id]))
}

// ---------------------------------------------------------------- the uninvited guest

{
  const w = 'uninvited'
  const u = UNINVITED
  const guest = CHARACTERS[u?.guest]
  if (!guest) err(w, `guest "${u?.guest}" is not a character`)
  else if (guest.role !== 'guest') err(w, `"${u.guest}" must have role "guest", or the ROSTER and the map give him away`)
  const ranks = u?.trigger?.hole_ranks ?? []
  const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
  if (ranks.length !== 2 || !ranks.every((r) => RANKS.includes(r))) err(w, 'trigger.hole_ranks must be two card ranks')
  const scene = new Set(['death', 'narration', u?.guest])
  const only = (...xs: string[]) => new Set(xs)
  const all = (xs: Line[] | undefined, sub: string, speakers: Set<string>, need = true, allow: RegExp[] = []) => {
    if (need && !xs?.length) err(w, `${sub} is empty`)
    ;(xs ?? []).forEach((l) => checkLine(l, `${w} ${sub}`, speakers, allow))
  }
  all(u?.reveal, 'reveal', only('narration', 'death'))
  // 'banished' is whoever is being shown out: any seated opponent.
  all(u?.offence, 'offence', only('banished'), true, [SIX_SEVEN])
  for (const l of u?.offence ?? []) {
    if (!SIX_SEVEN.test(l.text)) err(w, `offence ${l.id} must still say "six seven"`)
  }
  all(u?.offence_mimed, 'offence_mimed', only('banished'))
  for (const l of u?.offence_mimed ?? []) {
    if (l.type !== 'stage_direction') err(w, `offence_mimed ${l.id} must be a stage direction: it is for those who never speak`)
    if (!/\bsix\b/i.test(l.text) || !/\bseven\b/i.test(l.text)) err(w, `offence_mimed ${l.id} must still come to six, then seven`)
  }
  all(u?.banishment, 'banishment', only('death'))
  all(u?.entrance, 'entrance', scene)
  if (u?.entrance?.length && !u.entrance.some((l) => l.speaker === u.guest)) err(w, 'the guest never speaks in his own entrance')
  ;(u?.sitting ?? []).forEach((x, i) => all(x, `sitting[${i}]`, scene))
  all(u?.busted, 'busted', only(u?.guest))
  all(u?.farewell_won, 'farewell_won', scene)
  all(u?.farewell_lost, 'farewell_lost', only(u?.guest))
  for (const l of [...(u?.entrance ?? []), ...(u?.sitting ?? []).flat(), ...(u?.busted ?? []), ...(u?.farewell_won ?? []), ...(u?.farewell_lost ?? [])]) {
    if (l.trigger) err(w, `line ${l.id}: scene lines take no trigger`)
    if (PLACEHOLDER.test(l.text)) err(w, `line ${l.id}: the guest's scenes do not use the table's names`)
    PLACEHOLDER.lastIndex = 0
  }
}

// ---------------------------------------------------------------- marks, story

const markIds = new Set<string>()
for (const m of MARKS) {
  const w = `mark ${m.id}`
  if (markIds.has(m.id)) err(w, 'duplicate id')
  markIds.add(m.id)
  if (!m.title || !m.text || !m.hint) err(w, 'needs title, text and hint')
  if (!CONDITION_TYPES.has(m.when?.type)) err(w, `unknown condition "${m.when?.type}"`)
  if (m.when?.table && !TABLES.some((t) => t.id === m.when.table)) err(w, `unknown table "${m.when.table}"`)
  if (m.when?.character && !CHARACTERS[m.when.character]) err(w, `unknown character "${m.when.character}"`)
  if (m.when) for (const e of conditionErrors(m.when)) err(w, e)
  if (m.when?.type === 'met' && !m.when.character) err(w, '"met" needs a character')
  // Earned by meeting a guest, it would be a blank line hinting at him.
  if (m.when?.type === 'met' && CHARACTERS[m.when.character]?.role === 'guest' && !m.secret) {
    err(w, 'a mark for meeting a guest must be secret, or the ledger counts him before he exists')
  }
}

if (!STORY?.invitation?.heading || !STORY.invitation.body?.length) err('story', 'invitation is not written')
if (!STORY?.ending?.paragraphs?.length) err('story', 'ending is not written')
if (!STORY?.epigraph) err('story', 'no epigraph')
for (const p of [...(STORY?.invitation?.body ?? []), ...(STORY?.ending?.paragraphs ?? [])]) {
  for (const re of TRIPWIRES) if (re.test(p)) err('story', `tripwire ${re}`)
}

// ---------------------------------------------------------------- report

const cast = Object.values(CHARACTERS)
console.log(`${cast.length} characters, ${TABLES.length} tables, ${ids.size} lines of dialogue, ${MARKS.length} marks.`)
for (const x of warnings) console.log(`  warn  ${x}`)
for (const x of errors) console.log(`  ERROR ${x}`)
if (errors.length) {
  console.log(`\nFAIL: ${errors.length} error(s).`)
  process.exit(1)
}
console.log(`\nPASS${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`)
