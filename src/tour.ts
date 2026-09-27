/**
 * The tour's rules: what is unlocked, how respect is earned, and what a
 * finished table changes. Pure functions over a Save -- no DOM, no storage --
 * so they can be checked from node.
 *
 * Progression is RESPECT, per table, and it is diegetic (design doc: "Respect
 * IS the progression system -- no XP, no levels"). There is no number on
 * screen. What the player sees is what the table CALLS them, which changes
 * as they climb, and is announced explicitly when it flips.
 */
import { TABLES, TOUR, TABLE_BY_ID, ROSTER, GUESTS, fullCast, type TableData } from './content.js'
import { characterRecord, tableRecord, type Save } from './save.js'

export type TableState = 'sealed' | 'open' | 'cleared'

export function tableState(save: Save, id: string): TableState {
  const t = TABLE_BY_ID[id]
  if (save.tables[id]?.cleared) return 'cleared'
  if (!t) return 'sealed'
  if (t.kind === 'tour') {
    if (t.position === 1) return 'open'
    const prev = TOUR.find((x) => x.position === t.position - 1)
    return prev && save.tables[prev.id]?.cleared ? 'open' : 'sealed'
  }
  if (t.id === 'champions_1') return tourComplete(save) ? 'open' : 'sealed'
  const prev = TABLES.find((x) => x.position === t.position - 1)
  return prev && save.tables[prev.id]?.cleared ? 'open' : 'sealed'
}

/**
 * Whether the map shows a table at all. The finale stays off the map until it
 * is open: the misdirection is that the tour appears to climb toward the
 * grandest room, and a locked ninth door marked "Death" would spend the
 * ending on the first screen.
 */
export function isVisible(save: Save, id: string): boolean {
  const t = TABLE_BY_ID[id]
  if (!t) return false
  if (t.kind === 'finale') return tableState(save, id) !== 'sealed'
  return true
}

export function tourComplete(save: Save): boolean {
  return TOUR.every((t) => save.tables[t.id]?.cleared)
}

/** Where the tour goes next: the first open table not yet cleared. */
export function nextTable(save: Save): TableData | null {
  return TABLES.find((t) => tableState(save, t.id) === 'open') ?? null
}

// ---------------------------------------------------------------- respect

/**
 * Points needed for each tier. Earned at the table by winning pots worth
 * something, winning showdowns (the table SAW your cards), and knocking
 * players out. Tuned so a table you win usually reaches tier 3 near its end,
 * and a table you lose leaves you somewhere in the middle for the rematch.
 */
export const RESPECT_THRESHOLDS = [0, 4, 10, 18]

export const RESPECT_POINTS = {
  /** Net gain in a hand of at least 10 big blinds. */
  pot: 1,
  /** ...and again for 30 or more. */
  bigPot: 1,
  showdownWin: 1,
  knockout: 3,
}

export function tierFor(points: number): number {
  let tier = 0
  RESPECT_THRESHOLDS.forEach((t, i) => { if (points >= t) tier = i })
  return tier
}

/**
 * What the table calls you. Nobody, then a dismissive nickname, then your
 * actual name, then a title -- the design doc's escalation. null at tier 0:
 * contempt means not being addressed at all.
 */
export function earnedName(
  tier: number,
  names: { tier_1?: string; tier_3?: string } | undefined,
  playerName: string,
): string | null {
  if (tier <= 0) return null
  if (tier === 1) return names?.tier_1 ?? null
  if (tier === 2) return playerName
  return names?.tier_3 ?? playerName
}

/** Fill {name}, {nickname} and {title} in a line of dialogue. */
export function fillLine(
  text: string,
  names: { tier_1?: string; tier_3?: string } | undefined,
  playerName: string,
): string {
  return text
    .replaceAll('{name}', playerName)
    .replaceAll('{nickname}', names?.tier_1 ?? 'stranger')
    .replaceAll('{title}', names?.tier_3 ?? playerName)
}

// ---------------------------------------------------------------- open tables

/** Chairs at an open table, besides the player's. */
export const OPEN_TABLE_CHAIRS = 3

function shuffled<T>(xs: T[], rng: () => number): T[] {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Random play at a cleared table: a mix-and-match of everyone the player has
 * unlocked -- beaten, champions included, or a guest they have met. The design doc's original rule
 * kept the cast to "non-boss characters for that setting"; the owner widened
 * it to the whole roster, so Van Helsing or Blackbeard can turn up at
 * Camelot once you have beaten them.
 *
 * One chair always goes to someone from this room, so its own banter and
 * player-directed lines still have a speaker. The other chairs draw from
 * everyone unlocked -- this room's cast included -- so early in the tour,
 * with little unlocked, the table looks much as it always did.
 */
export function openTableCast(table: TableData, save: Save, rng: () => number): string[] {
  const beaten = (id: string) => !!save.characters[id]?.beaten
  const room = fullCast(table)
  // A missable champion who never sat down is not unlocked, and cannot host.
  const locals = shuffled(room.some(beaten) ? room.filter(beaten) : table.seats, rng)
  const host = locals.slice(0, 1)
  // A guest is unlocked by meeting him: nobody beats their way to Loki.
  const unlocked = [
    ...ROSTER.filter((c) => beaten(c.id)),
    ...GUESTS.filter((c) => save.characters[c.id]?.met),
  ].filter((c) => !host.includes(c.id)).map((c) => c.id)
  const pool = shuffled(unlocked, rng)
  // Fall back on the room's own cast if not enough is unlocked yet.
  for (const id of locals) if (!pool.includes(id) && !host.includes(id)) pool.push(id)
  return shuffled([...host, ...pool.slice(0, OPEN_TABLE_CHAIRS - host.length)], rng)
}

export function canPlayOpenTable(save: Save, table: TableData): boolean {
  return table.kind === 'tour' && tableState(save, table.id) === 'cleared'
}

// ---------------------------------------------------------------- results

export type TableOutcome = {
  table: string
  mode: 'tour' | 'open'
  won: boolean
  place: number
  hands: number
  /** Everyone who sat at the table during the sitting, arrivals included. */
  sat: string[]
  /** Late arrivals who never sat down because the table ended first. */
  missed: string[]
  respectTier: number
  respectPoints: number
}

export type OutcomeEffects = {
  /** First-time beaten: these legends are now closed in the ledger. */
  newlyBeaten: string[]
  firstClear: boolean
  /** A table the win opened on the map. */
  unlocked: TableData | null
}

/**
 * Apply a finished sitting to the save. Winning a table beats everyone who
 * sat at it -- you ended holding every chip they brought. A champion who
 * never sat down (Odysseus, if you clear Athens before he arrives) is NOT
 * beaten: the design doc's deliberate, visible cost.
 */
export function applyOutcome(save: Save, o: TableOutcome, now = new Date().toISOString()): OutcomeEffects {
  const before = new Set(TABLES.filter((t) => tableState(save, t.id) !== 'sealed').map((t) => t.id))
  const rec = tableRecord(save, o.table)
  const table = TABLE_BY_ID[o.table]
  const effects: OutcomeEffects = { newlyBeaten: [], firstClear: false, unlocked: null }

  if (o.mode === 'tour') {
    rec.attempts++
    rec.bestPlace = rec.bestPlace === null ? o.place : Math.min(rec.bestPlace, o.place)
  }
  // Respect never goes backwards, and open tables earn it too: it is the
  // same room and the same people.
  rec.respectTier = Math.max(rec.respectTier, o.respectTier)
  rec.respectPoints = Math.max(rec.respectPoints, o.respectPoints)

  if (o.won) {
    if (o.mode === 'tour') {
      rec.wins++
      if (!rec.cleared) {
        rec.cleared = true
        rec.firstClearedAt = now
        effects.firstClear = true
      }
      rec.fastestWin = rec.fastestWin === null ? o.hands : Math.min(rec.fastestWin, o.hands)
      rec.respectTier = Math.max(rec.respectTier, 3)
      rec.respectPoints = Math.max(rec.respectPoints, RESPECT_THRESHOLDS[3])
    }
    for (const id of o.sat) {
      const c = characterRecord(save, id)
      if (!c.beaten) {
        c.beaten = now
        effects.newlyBeaten.push(id)
      }
    }
    save.record.tablesWon++
    if (table?.kind === 'finale') save.record.deathWins++
  } else {
    if (o.mode === 'tour') rec.losses++
    save.record.tablesLost++
    if (table?.kind === 'finale') save.record.deathLosses++
  }

  const after = TABLES.filter((t) => tableState(save, t.id) !== 'sealed')
  effects.unlocked = after.find((t) => !before.has(t.id)) ?? null
  return effects
}

/** Everyone on the roster the player has beaten at least once. */
export function beatenCount(save: Save): number {
  return ROSTER.filter((c) => save.characters[c.id]?.beaten).length
}
