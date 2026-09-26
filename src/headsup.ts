/**
 * `npm run headsup [matches] [ids]` -- who beats whom, one on one.
 *
 * Every pair plays `matches` heads-up tournaments (seats alternating, each
 * match its own seed) at the tour tables' structure: 2000 chips each, blinds
 * climbing every 9 hands. From the results it fits one strength per
 * character (a Bradley-Terry fit, the model behind chess ratings), so a
 * character can be ranked from their whole record rather than from any one
 * pairing -- which at a few dozen matches is mostly noise.
 *
 *   npm run headsup 30 death,lincoln,washington   (a few, quickly)
 *   npm run headsup 24                            (everyone: an hour or more)
 *
 * For tuning difficulty. Not a check: nothing fails.
 */
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Game } from './game.js'
import * as content from './content.js'
import { mulberry32 } from './rng.js'

export const BUY_IN = 2000
export const HANDS_PER_LEVEL = 9

/** One heads-up tournament. Seat order alternates with the seed. */
export async function match(a: string, b: string, seed: number): Promise<{ winner: string; hands: number }> {
  const cast = seed % 2 ? [b, a] : [a, b]
  const g = new Game(cast.map(content.personality), {
    mode: 'tournament',
    buyIn: BUY_IN,
    rollouts: 60,
    rng: mulberry32(seed),
    handsPerLevel: HANDS_PER_LEVEL,
  })
  for (let i = 0; i < 3000 && !g.isComplete(); i++) await g.playHand()
  return { winner: cast[g.survivors()[0]], hands: g.handCount() }
}

/** A fixed seed per pair and match, so a rerun of one pairing is the same cards. */
export const seedFor = (a: string, b: string, m: number) => {
  let h = 2166136261
  for (const ch of `${a}|${b}|${m}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return (h >>> 0) || 1
}

/** wins[a][b] = matches a won against b. */
export type Wins = Record<string, Record<string, number>>

/**
 * Bradley-Terry strengths by the standard MM iteration: each character's
 * strength is their wins over what the strengths expect of their schedule.
 * Returned as the expected win rate against an average field (0..1).
 */
export function strengths(ids: string[], wins: Wins): Record<string, number> {
  const games = (a: string, b: string) => (wins[a]?.[b] ?? 0) + (wins[b]?.[a] ?? 0)
  let p: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 1]))
  for (let it = 0; it < 500; it++) {
    const next: Record<string, number> = {}
    for (const a of ids) {
      const w = ids.reduce((s, b) => s + (wins[a]?.[b] ?? 0), 0) + 0.5 // a half win keeps 0 finite
      const d = ids.reduce((s, b) => (b === a ? s : s + (games(a, b) + 1) / (p[a] + p[b])), 0)
      next[a] = w / d
    }
    const mean = ids.reduce((s, id) => s + Math.log(next[id]), 0) / ids.length
    p = Object.fromEntries(ids.map((id) => [id, next[id] / Math.exp(mean)]))
  }
  // Against the geometric-mean opponent, whose strength is 1 after normalising.
  return Object.fromEntries(ids.map((id) => [id, p[id] / (p[id] + 1)]))
}

async function main() {
  const matches = Number(process.argv[2] ?? 20)
  const ids = process.argv[3]?.split(',') ??
    Object.values(content.CHARACTERS).filter((c) => c.role !== 'guest').map((c) => c.id)
  const wins: Wins = Object.fromEntries(ids.map((id) => [id, {}]))
  const pairs = ids.flatMap((a, i) => ids.slice(i + 1).map((b) => [a, b] as const))
  let done = 0
  for (const [a, b] of pairs) {
    for (let m = 0; m < matches; m++) {
      const { winner } = await match(a, b, seedFor(a, b, m))
      const loser = winner === a ? b : a
      wins[winner][loser] = (wins[winner][loser] ?? 0) + 1
    }
    process.stdout.write(`\r  ${++done}/${pairs.length} pairings...`)
  }
  process.stdout.write('\r' + ' '.repeat(40) + '\r')
  const s = strengths(ids, wins)
  const name = (id: string) => content.CHARACTERS[id]?.short ?? id
  console.log(`Heads-up, ${matches} matches a pairing, ${BUY_IN} chips, blinds every ${HANDS_PER_LEVEL} hands.\n`)
  console.log('Strength = expected win rate against an average opponent.\n')
  for (const id of [...ids].sort((x, y) => s[y] - s[x])) {
    const w = ids.reduce((t, o) => t + (wins[id][o] ?? 0), 0)
    const l = ids.reduce((t, o) => t + (wins[o]?.[id] ?? 0), 0)
    console.log(`${name(id).padEnd(20)} ${(s[id] * 100).toFixed(0).padStart(4)}%   ${w}-${l}`)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main()
