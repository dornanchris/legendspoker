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
import { TABLES, TOUR, TABLE_BY_ID, ROSTER, GUESTS, CHARACTERS, fullCast, ledgerId, type TableData, type CharacterData } from './content.js'
import { characterRecord, tableRecord, type Save } from './save.js'

export type TableState = 'sealed' | 'open' | 'cleared'

export function tableState(save: Save, id: string): TableState {
  const t = TABLE_BY_ID[id]
  // The Phoenix's table is open only while its gauntlet holds it open, and
  // sealed (off the map) the rest of the time, beaten or not.
  if (t?.kind === 'hidden') return save.phoenix?.open ? 'open' : 'sealed'
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
  if (t.kind === 'finale' || t.kind === 'hidden') return tableState(save, id) !== 'sealed'
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

/** Chairs at an open table, besides the player's: the room's four. */
export const OPEN_TABLE_CHAIRS = 4

function shuffled<T>(xs: T[], rng: () => number): T[] {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Who the player may seat at an open table (the owner: "characters that have
 * been played against at the tables"): everyone they have sat down with, from
 * any table, champions included once they have taken a chair -- so a late
 * champion never met (Odysseus, skipped) is not here. Each half of a two-man
 * chair counts on his own, and a second look (the Green Knight bare, Holmes in
 * his deerstalker) comes in by his mark. A guest comes in by meeting him too,
 * except the Phoenix, which has to be beaten (unlockedBy). In tour order,
 * table by table and chair by chair, each look beside its man, guests last.
 */
export function openTablePool(save: Save): string[] {
  const met = (id: string) => !!save.characters[id]?.met
  const open = (c: CharacterData) =>
    c.lookOf ? !!save.marks[c.lookOf.mark]
      : c.role === 'guest' ? (c.unlockedBy === 'beaten' ? !!save.characters[c.id]?.beaten : met(c.id))
      : c.role !== 'dealer' && met(c.id)
  const order: string[] = []
  const add = (id: string | undefined) => {
    if (!id || order.includes(id)) return
    order.push(id)
    for (const l of CHARACTERS[id]?.looks ?? []) order.push(l.id)
  }
  for (const t of TABLES) for (const id of fullCast(t)) { add(id); add(CHARACTERS[id]?.other?.character) }
  for (const c of [...ROSTER, ...GUESTS]) add(c.id)
  const pool = order.filter((id) => CHARACTERS[id] && open(CHARACTERS[id]))
  const guest = (id: string) => CHARACTERS[id].role === 'guest'
  return [...pool.filter((id) => !guest(id)), ...pool.filter(guest)]
}

/**
 * Whether these opponents can sit down together at an open table: one to
 * four of them (heads up against anyone is allowed), nobody twice, all from
 * the pool. Both halves of a two-man chair may sit at once, and a man beside
 * his own second look (the owner: "that's all perfectly fine").
 */
export function isOpenCast(save: Save, ids: string[]): boolean {
  const pool = openTablePool(save)
  return ids.length >= 1 && ids.length <= OPEN_TABLE_CHAIRS && new Set(ids).size === ids.length &&
    ids.every((id) => pool.includes(id))
}

/**
 * A table dealt at random, for a player who would rather not choose (the
 * picker's "Deal me a table"): a full table from the pool. One chair goes to
 * someone from this room, so its own banter and player-directed lines still
 * have a speaker; the others draw from everyone the player has played
 * against, this room included, so early in the tour, with few met, the table
 * looks much as it always did.
 */
export function openTableCast(table: TableData, save: Save, rng: () => number): string[] {
  const pool = openTablePool(save)
  const room = fullCast(table)
  // Fall back on the room's own chairs if nobody from it has been met (a check run's fresh save).
  const locals = shuffled(room.some((id) => pool.includes(id)) ? room.filter((id) => pool.includes(id)) : table.seats, rng)
  const host = locals.slice(0, 1)
  const rest = shuffled(pool.filter((id) => !host.includes(id)), rng)
  for (const id of locals) if (!rest.includes(id) && !host.includes(id)) rest.push(id)
  return shuffled([...host, ...rest].slice(0, OPEN_TABLE_CHAIRS), rng)
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
  /**
   * The Phoenix's gauntlet, when this sitting moved it: 'stirring' (the last
   * second place it needed), 'open' (it has come), 'reset' (it was lost to,
   * and every second place is forgotten), 'beaten'.
   */
  phoenix: 'stirring' | 'open' | 'reset' | 'beaten' | null
}

// ---------------------------------------------------------------- the Phoenix

/** The table where the gauntlet ends: the last story table. */
export const GAUNTLET_END = () => TOUR[TOUR.length - 1]

/**
 * The Phoenix's hidden gauntlet (the owner's design: "a hidden grind, and a
 * very rare character to unlock"). Finish SECOND at every story table, then
 * win the eighth, and the Phoenix opens its table: one heads-up sitting.
 * Beat it and it is unlocked; lose and the gauntlet resets -- every second
 * place forgotten. Seconds count in tour sittings only, and in any order;
 * once it is beaten the gauntlet is over for good.
 */
function advanceGauntlet(save: Save, o: TableOutcome, table: TableData | undefined): OutcomeEffects['phoenix'] {
  const g = save.phoenix
  if (!table || o.mode !== 'tour') return null
  if (table.kind === 'hidden') {
    g.attempts++
    g.open = false
    if (o.won) return 'beaten'
    g.seconds = []
    return 'reset'
  }
  if (table.kind !== 'tour' || save.characters[GAUNTLET_PHOENIX]?.beaten) return null
  const all = () => TOUR.every((t) => g.seconds.includes(t.id))
  if (o.place === 2 && !g.seconds.includes(table.id)) {
    g.seconds.push(table.id)
    if (all()) return 'stirring'
  }
  if (o.won && table.id === GAUNTLET_END().id && all() && !g.open) {
    g.open = true
    return 'open'
  }
  return null
}

const GAUNTLET_PHOENIX = 'phoenix'

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
  const effects: OutcomeEffects = { newlyBeaten: [], firstClear: false, unlocked: null, phoenix: null }

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
    // a second look's man is beaten under his own name (ledgerId)
    for (const id of new Set(o.sat.map(ledgerId))) {
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

  effects.phoenix = advanceGauntlet(save, o, table)
  const after = TABLES.filter((t) => tableState(save, t.id) !== 'sealed')
  effects.unlocked = after.find((t) => !before.has(t.id)) ?? null
  return effects
}

/** Everyone on the roster the player has beaten at least once. */
export function beatenCount(save: Save): number {
  return ROSTER.filter((c) => save.characters[c.id]?.beaten).length
}
