import { TABLES, type TableId } from '../src/roster.js'

/**
 * THE TOUR: which screen you are on, and how far you have got.
 *
 * BUILD-PLAN 3B calls the map "the game's spine, not decoration" and puts its
 * ART in Phase 7 -- but it also says to stand navigation, back-navigation and
 * persistence up in Phase 4, "before there is anything pretty to lose".
 * That is what this is. The routing and the unlock state are real; the chart
 * they are drawn on is a placeholder.
 *
 * Progression is RESPECT, per the design doc: no XP, no levels, no stars. A
 * destination is locked, current, or beaten, and nothing else.
 */

export type Screen = 'home' | 'map' | 'table'

export type TourState = {
  screen: Screen
  /** Table ids already won, in the order they were won. */
  beaten: TableId[]
  /** The table the player is up to. Everything after it is locked. */
  current: TableId
  /** Set while a table is being played, so the map knows where to return to. */
  playing: TableId | null
}

const KEY = 'legends.tour'
const FIRST = TABLES[0].id

/** localStorage, defensively — see the note in table.ts. */
function read(): string | null {
  try { return localStorage.getItem(KEY) } catch { return null }
}
function write(value: string): void {
  try { localStorage.setItem(KEY, value) } catch { /* progress is not worth an exception */ }
}
function clear(): void {
  try { localStorage.removeItem(KEY) } catch { /* nothing to clear */ }
}

/** Just the progress, which is what gets persisted. Screen is session state. */
type Progress = { beaten: TableId[]; current: TableId }

function load(): Progress {
  const raw = read()
  if (!raw) return { beaten: [], current: FIRST }
  try {
    const p = JSON.parse(raw)
    const known = new Set(TABLES.map((t) => t.id))
    const beaten = (Array.isArray(p.beaten) ? p.beaten : []).filter((id: string) => known.has(id as TableId))
    const current = known.has(p.current) ? p.current : FIRST
    return { beaten, current }
  } catch {
    // A tour record this build cannot read is dropped rather than half-applied.
    clear()
    return { beaten: [], current: FIRST }
  }
}

let state: TourState = { screen: 'home', playing: null, ...load() }

const listeners = new Set<() => void>()
export const subscribe = (fn: () => void): (() => void) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
export const snapshot = (): TourState => state

function set(patch: Partial<TourState>): void {
  state = { ...state, ...patch }
  for (const fn of listeners) fn()
}

function persist(): void {
  write(JSON.stringify({ beaten: state.beaten, current: state.current }))
}

// ------------------------------------------------------------------ queries

export type MarkState = 'beaten' | 'current' | 'locked'

export function markState(id: TableId): MarkState {
  if (state.beaten.includes(id)) return 'beaten'
  return id === state.current ? 'current' : 'locked'
}

/** A beaten table can be replayed; a locked one cannot be entered. */
export const canEnter = (id: TableId): boolean => markState(id) !== 'locked'

export const hasProgress = (): boolean =>
  state.beaten.length > 0 || state.current !== FIRST

// ------------------------------------------------------------------ actions

export const goHome = (): void => set({ screen: 'home', playing: null })
export const goMap = (): void => set({ screen: 'map', playing: null })

export function enter(id: TableId): void {
  if (!canEnter(id)) return
  set({ screen: 'table', playing: id })
}

/** Won a table: unlock the next destination and return to the map. */
export function beat(id: TableId): void {
  const beaten = state.beaten.includes(id) ? state.beaten : [...state.beaten, id]
  const i = TABLES.findIndex((t) => t.id === id)
  const next = TABLES[i + 1]
  // The tour only ever moves forward. Replaying a beaten table cannot pull the
  // player's position backwards.
  const currentIndex = TABLES.findIndex((t) => t.id === state.current)
  const current = next && i + 1 > currentIndex ? next.id : state.current
  set({ beaten, current })
  persist()
}

export function newTour(): void {
  set({ beaten: [], current: FIRST, screen: 'map', playing: null })
  clear()
}

/**
 * Adopt progress carried inside a mid-table save. The standing record is the
 * source of truth; this only fills in when there isn't one, which is what
 * makes a save file self-contained if it ever moves between devices.
 */
export function adoptFromSave(tour: Record<string, unknown> | undefined): void {
  if (!tour || read()) return
  const beaten = Array.isArray(tour.beaten) ? (tour.beaten as TableId[]) : []
  const current = typeof tour.current === 'string' ? (tour.current as TableId) : FIRST
  set({ beaten, current })
  persist()
}

/** The snapshot written into a save's `tour` slot. */
export const forSave = (): Record<string, unknown> => ({
  beaten: state.beaten,
  current: state.current,
})
