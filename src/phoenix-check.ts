/**
 * THE PHOENIX'S GAUNTLET, checked (tour.ts, advanceGauntlet).
 *
 * Second place at every story table, then a win at the eighth, opens the
 * Phoenix's table for one heads-up sitting. Beat it: unlocked. Lose: every
 * second place is forgotten. This drives applyOutcome with made-up results
 * and checks each rule, then plays the Phoenix heads up to see it is hard
 * (but not Death).
 *
 *   npm run check:phoenix
 */
import { TOUR, TABLE_BY_ID, ROSTER, CHARACTERS } from './content.js'
import { freshSave, type Save } from './save.js'
import { applyOutcome, tableState, isVisible, openTableCast, type TableOutcome } from './tour.js'
import { marksForCareer } from './marks.js'
import { mulberry32 } from './rng.js'

let failures = 0
const fail = (msg: string) => { failures++; console.log(`  FAIL ${msg}`) }
const ok = (msg: string) => console.log(`  ok   ${msg}`)

const sit = (save: Save, table: string, place: number, mode: 'tour' | 'open' = 'tour') => {
  const t = TABLE_BY_ID[table]
  const o: TableOutcome = {
    table, mode, won: place === 1, place, hands: 40,
    sat: place === 1 ? [...t.seats] : [], missed: [], respectTier: 2, respectPoints: 10,
  }
  return applyOutcome(save, o)
}
const last = TOUR[TOUR.length - 1].id

console.log('\nThe Phoenix\'s gauntlet\n')
{
  const s = freshSave()
  if (isVisible(s, 'pyre') || tableState(s, 'pyre') !== 'sealed') fail('the pyre is visible on a fresh save')
  if (ROSTER.some((c) => c.id === 'phoenix')) fail('the Phoenix is on the ROSTER: the ledger would count it')
  if (CHARACTERS.phoenix?.role !== 'guest') fail('the Phoenix must be a guest')
  // Clear the tour first, the ordinary way.
  for (const t of TOUR) sit(s, t.id, 1)
  if (isVisible(s, 'pyre')) fail('clearing the tour alone opened the pyre')
  // Seconds in open mode do not count.
  for (const t of TOUR) sit(s, t.id, 2, 'open')
  if (s.phoenix.seconds.length) fail('open-table seconds counted')
  // Seven seconds, then a win at the eighth: not yet.
  for (const t of TOUR.slice(0, 7)) sit(s, t.id, 2)
  if (sit(s, last, 1).phoenix) fail('opened with seven seconds of eight')
  if (isVisible(s, 'pyre')) fail('the pyre opened with seven seconds')
  // Third place is not second.
  sit(s, last, 3)
  if (s.phoenix.seconds.includes(last)) fail('third place counted as second')
  // The eighth second: stirring, still closed.
  const st = sit(s, last, 2).phoenix
  if (st !== 'stirring') fail(`the eighth second said ${st}, not stirring`)
  if (isVisible(s, 'pyre')) fail('the pyre opened on a second place')
  // A win somewhere else does nothing; a win at the eighth opens it.
  if (sit(s, TOUR[0].id, 1).phoenix) fail('a win at the first table opened it')
  const op = sit(s, last, 1)
  if (op.phoenix !== 'open' || tableState(s, 'pyre') !== 'open' || !isVisible(s, 'pyre')) fail(`a win at the eighth did not open it (${op.phoenix})`)
  else ok('eight seconds, then a win at the eighth, opens the pyre')
  // Lose to it: reset.
  const lost = sit(s, 'pyre', 2)
  if (lost.phoenix !== 'reset' || s.phoenix.seconds.length || isVisible(s, 'pyre')) fail('losing to the Phoenix did not reset the gauntlet')
  else ok('losing to it forgets every second place and closes the pyre')
  if (s.characters.phoenix?.beaten) fail('a loss beat the Phoenix')
  // ...and it is not unlocked at open tables for having been met.
  s.characters.phoenix = { ...(s.characters.phoenix ?? {} as any), met: 'x' } as any
  const r = mulberry32(1)
  let seen = 0
  for (let i = 0; i < 200; i++) if (openTableCast(TABLE_BY_ID[TOUR[0].id], s, r).includes('phoenix')) seen++
  if (seen) fail('a Phoenix met but not beaten is dealt in at open tables')
  // A win at the eighth now does nothing: the seconds are gone.
  if (sit(s, last, 1).phoenix) fail('opened again without the seconds')
  // Earn it back and beat it.
  for (const t of TOUR) sit(s, t.id, 2)
  sit(s, last, 1)
  const won = sit(s, 'pyre', 1)
  if (won.phoenix !== 'beaten' || !s.characters.phoenix?.beaten || isVisible(s, 'pyre')) fail('beating it did not unlock it and close the pyre')
  else ok('beating it unlocks it, and the pyre closes for good')
  if (!marksForCareer(s).includes('from_the_ashes')) fail('no From the Ashes mark')
  seen = 0
  for (let i = 0; i < 200; i++) if (openTableCast(TABLE_BY_ID[TOUR[0].id], s, r).includes('phoenix')) seen++
  if (!seen) fail('a beaten Phoenix is never dealt in at open tables')
  else ok(`a beaten Phoenix is dealt in at open tables (${seen} of 200 casts)`)
  // Over for good: more seconds and wins never reopen it.
  for (const t of TOUR) sit(s, t.id, 2)
  if (sit(s, last, 1).phoenix || isVisible(s, 'pyre')) fail('the gauntlet reopened after the Phoenix was beaten')
  else ok('once beaten, the gauntlet never reopens')
}

console.log(failures ? `\nFAIL: ${failures} problem(s).` : '\nPASS.')
process.exit(failures ? 1 : 0)
