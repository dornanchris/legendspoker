import { Game } from './game.js'
import { CAST } from './personality.js'
import { mulberry32 } from './rng.js'

/**
 * PHASE 2 EXIT TEST
 *
 * Run a lot of hands bot-vs-bot and look at the spread. What you want:
 *  - Distinct VPIP / PFR / AF per character (they play differently)
 *  - No single character dominating win rate (the dials are balanced)
 *  - Numbers that match the intent (Yeti's VPIP should be huge, etc.)
 *
 * If everyone converges, the dials aren't doing anything and no amount
 * of art will fix it. This is the phase that decides whether the project
 * has a reason to exist.
 */

const HANDS = Number(process.argv[2] ?? 2000)
const BB = 20

// Seeds everything: decisions, equity rollouts, and the deal. The same seed
// replays the same hands exactly, so a dial change can be measured against an
// identical set of cards rather than against fresh variance.

const game = new Game(CAST, {
  bigBlind: BB,
  smallBlind: BB / 2,
  buyIn: 100 * BB,
  rollouts: 60,
  rng: mulberry32(20260804),
})

const t0 = Date.now()
// playHand is async so a human seat can be awaited; the bots resolve
// immediately. Await it in sequence -- firing hands concurrently would
// interleave them on one table.
for (let i = 0; i < HANDS; i++) {
  await game.playHand()
  if ((i + 1) % 1000 === 0) {
    process.stdout.write(`\r  ${i + 1}/${HANDS} hands...`)
  }
}
process.stdout.write('\r' + ' '.repeat(40) + '\r')

const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
console.log(`\n${HANDS} hands in ${elapsed}s\n`)

const pad = (s: string, n: number) => s.padEnd(n)
const num = (s: string | number, n: number) => String(s).padStart(n)

console.log(
  pad('Character', 22) +
    num('VPIP', 7) +
    num('PFR', 7) +
    num('AF', 7) +
    num('Fold%', 8) +
    num('bb/100', 10),
)
console.log('-'.repeat(61))

for (const s of game.getSeats()) {
  const st = s.stats
  const vpip = (st.vpip / st.hands) * 100
  const pfr = (st.pfr / st.hands) * 100
  const af = st.calls === 0 ? st.bets : st.bets / st.calls
  const foldPct =
    st.facedAggression === 0
      ? 0
      : (st.foldsToAggression / st.facedAggression) * 100
  const bb100 = (st.profit / BB / st.hands) * 100

  console.log(
    pad(s.personality.name, 22) +
      num(vpip.toFixed(1), 7) +
      num(pfr.toFixed(1), 7) +
      num(af.toFixed(2), 7) +
      num(foldPct.toFixed(1), 8) +
      num(bb100.toFixed(2), 10),
  )
}

console.log(`
VPIP  = % of hands they voluntarily put money in preflop (looseness)
PFR   = % of hands they raise preflop (aggression preflop)
AF    = aggression factor: bets+raises / calls
Fold% = how often they fold when facing a bet
bb/100 = big blinds won per 100 hands (the bottom line)

Read the spread, not the absolute numbers. If VPIP and AF are far apart
per character, the personality system works. If bb/100 is wildly lopsided,
the dials need tuning before you spend a cent on art.`)
