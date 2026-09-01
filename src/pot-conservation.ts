/**
 * REGRESSION GUARD: poker-ts must not destroy chips when side pots form.
 *
 * This started as a repro. Phase 3a's chip-conservation check caught poker-ts
 * losing a whole pot in roughly 1 hand in 300 with uneven stacks; the fix now
 * lives in patches/poker-ts+1.5.0.patch and is applied on npm install.
 *
 * The bug: Pot.collectBetsFrom() fixes a pot's eligible-player list when its
 * bets are collected. A player who folds in a LATER betting round is never
 * removed from that list, and their hole cards are never cleared -- so
 * showdown could evaluate a folded player, decide they had the best hand, and
 * pay them via:
 *
 *   this._players[seatIndex]?.addToStack(payout)
 *
 * Folding is the one thing that sets _players[seat] = null, so the optional
 * chaining silently swallowed the payout and the pot ceased to exist.
 *
 * Why it hid for so long: the cash sim resets every stack to the buy-in each
 * hand, so all-ins are for equal amounts and side pots essentially never form.
 * Uneven stacks are the whole point of a tournament, which is what exposed it.
 *
 * There is no engine code below -- this drives poker-ts directly with random
 * legal actions, exactly as its own README documents. If this ever fails
 * again, the patch did not apply.
 *
 * Run: npm run check:pots [hands]
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
if (leaks === 0) {
  console.log('PASS: chips conserved. The poker-ts patch is applied and working.')
} else {
  console.log('FAIL: every one of these is a pot that no player received.')
  console.log('Check that patches/poker-ts+1.5.0.patch applied -- try npm install.')
  process.exit(1)
}
