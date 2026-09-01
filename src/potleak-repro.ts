/**
 * MINIMAL REPRO: poker-ts loses a pot when side pots form.
 *
 * Found by the chip-conservation check in tourney.ts. Roughly 1 hand in 300
 * with uneven stacks ends with chips destroyed -- the main pot is never
 * awarded to anyone. There is no personality or engine code below: this is
 * poker-ts driven directly with random legal actions, so the defect is in
 * the dependency, not in ours.
 *
 * Mechanism, in poker-ts/dist/lib/dealer.js showdown():
 *
 *   this._players[seatIndex]?.addToStack(payout)
 *
 * When a pot's eligible-player list still names a seat whose player object
 * is gone, the optional chaining silently drops the payout and the chips
 * cease to exist. The early-return above it only covers a SINGLE pot with
 * one eligible player, so a main-pot/side-pot split walks into it.
 *
 * Why this never showed up before Phase 3a: the cash sim resets every stack
 * to the buy-in each hand, so all-ins are for equal amounts and side pots
 * essentially never form. Uneven stacks are the whole point of a tournament,
 * which is what exposed it.
 *
 * Run: npm run repro:potleak
 */
import pokerPkg from 'poker-ts'
const { Table: Poker } = pokerPkg as any

const TRIALS = Number(process.argv[2] ?? 4000)
const STACKS = [1952, 3574, 474] // uneven, so side pots form

let leaks = 0
let worst = 0
for (let trial = 0; trial < TRIALS; trial++) {
  const t = new Poker({ smallBlind: 10, bigBlind: 20 }, STACKS.length)
  STACKS.forEach((chips, seat) => t.sitDown(seat, chips))
  const total = () => t.seats().reduce((a: number, s: any) => a + (s?.totalChips ?? 0), 0)
  const before = total()

  let pots = '-'
  t.startHand()
  while (t.isHandInProgress()) {
    while (t.isBettingRoundInProgress()) {
      const { actions, chipRange } = t.legalActions()
      const action = actions[Math.floor(Math.random() * actions.length)]
      let size: number | undefined
      if ((action === 'bet' || action === 'raise') && chipRange) {
        size = chipRange.min + Math.floor(Math.random() * (chipRange.max - chipRange.min + 1))
      }
      t.actionTaken(action, size)
    }
    t.endBettingRound()
    if (t.areBettingRoundsCompleted()) {
      pots = t.pots().map((p: any) => `${p.size}@[${p.eligiblePlayers}]`).join(' ')
      t.showdown()
    }
  }

  const lost = before - total()
  if (lost !== 0) {
    leaks++
    worst = Math.max(worst, Math.abs(lost))
    if (leaks <= 3) console.log(`  hand ${trial}: lost ${lost} chips.  pots at showdown: ${pots}`)
  }
}

const rate = ((leaks / TRIALS) * 100).toFixed(2)
console.log(`\n${leaks}/${TRIALS} hands destroyed chips (${rate}%), worst ${worst} chips.`)
console.log(
  leaks === 0
    ? 'No leak in this run -- it is intermittent, try more trials.'
    : 'Chips must be conserved. Every one of these is a pot that no player received.',
)
