/**
 * Persistence: the Save (src/save.ts) kept in localStorage.
 *
 * Storage can be missing or throw (private windows, blocked site data, some
 * WebViews on first launch), so every read and write is guarded and the game
 * carries on in memory if it has to. Settings say so when that happens.
 *
 * Capacitor's WebView keeps localStorage between launches, which is enough
 * for Phase 4; a native Preferences plugin can replace load()/persist()
 * later without touching anything that calls them.
 */
import { freshSave, migrate, characterRecord, type Save } from '../src/save.js'
import type { HandSummary } from '../src/director.js'
import { CHARACTERS } from '../src/content.js'

const KEY = 'legends-poker/save'

let save: Save = freshSave()
let durable = true
/** Changes made in memory that have not reached storage yet. */
let dirty = false

export function load(): Save {
  try {
    const raw = localStorage.getItem(KEY)
    save = migrate(raw ? JSON.parse(raw) : null)
  } catch {
    durable = false
    save = freshSave()
  }
  return save
}

export function get(): Save {
  return save
}

/** Whether saves survive a reload. False means storage is unavailable. */
export function isDurable(): boolean {
  return durable
}

export function persist(): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(save))
    durable = true
    dirty = false
  } catch {
    durable = false
  }
}

/**
 * Write only if something is waiting. Used on the way out of the page: an
 * unconditional write there would let a stale tab overwrite newer progress
 * saved by another.
 */
export function flush(): void {
  if (dirty) persist()
}

export function update(fn: (s: Save) => void): void {
  fn(save)
  persist()
}

export function erase(): void {
  save = freshSave()
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* nothing to remove */
  }
}

const MAX_HABITS = 16

/** A character was seated at the player's table. */
export function meet(id: string): void {
  const c = characterRecord(save, id)
  if (!c.met) {
    c.met = new Date().toISOString()
    dirty = true
  }
}

/** The player watched someone do something. The ledger lists what was seen. */
export function sawHabit(id: string, text: string): boolean {
  if (!CHARACTERS[id]) return false
  const c = characterRecord(save, id)
  if (c.habits.includes(text) || c.habits.length >= MAX_HABITS) return false
  c.habits.push(text)
  dirty = true
  return true
}

/**
 * Fold one finished hand into the permanent record. Called only for hands
 * played LIVE -- a replayed hand was already recorded the first time.
 */
export function recordHand(s: HandSummary, table: string): void {
  dirty = true
  const r = save.record
  r.hands++
  const net = s.facts.net
  if (net > 0) r.potsWon++
  for (const p of s.facts.wonPots) r.biggestPot = Math.max(r.biggestPot, p.amount)
  r.knockouts += s.knockouts.length
  if (s.facts.allInWon) r.allInsWon++
  for (const w of s.showdownWins) {
    r.showdownsWon++
    if (!r.bestHand || w.rank > r.bestHand.rank) r.bestHand = { rank: w.rank, cards: w.cards, table }
  }
  for (const [id, o] of Object.entries(s.observations)) {
    const c = characterRecord(save, id)
    c.hands += o.hands
    c.vpip += o.vpip
    c.pfr += o.pfr
    c.bets += o.bets
    c.calls += o.calls
    c.faced += o.faced
    c.foldsToBet += o.foldsToBet
    c.showdowns += o.showdowns
  }
  for (const id of s.knockouts) characterRecord(save, id).youKnockedOut++
  for (const id of s.bustedBy) characterRecord(save, id).knockedYouOut++
}

export function earnMark(id: string, table: string | null): boolean {
  if (save.marks[id]) return false
  save.marks[id] = { at: new Date().toISOString(), table }
  dirty = true
  return true
}

/** Settings that restyle the whole document rather than one screen. */
export function applySettings(): void {
  const s = save.settings
  const html = document.documentElement
  html.classList.toggle('large-text', s.largeText)
  html.classList.toggle('reduce-motion', s.reduceMotion)
}
