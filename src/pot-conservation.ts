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
 * Conserving chips is not enough: they must reach the RIGHT player. poker-ts
 * also built side pots wrongly. Each betting round it replaced the last pot's
 * eligible list with whoever bet that round -- or, if nobody bet, whoever
 * could still act -- and both leave out a player who is all in. An all-in
 * called for exactly their stack was dropped from the only pot they could
 * win as soon as a later street was checked through; one all in on an
 * earlier street was skipped at showdown. Chips were conserved, just paid to
 * someone else, which is why the check above never saw it. The patch now
 * rebuilds pots from what each player put in, so every hand here is also
 * settled by the textbook method, independently, and the two must agree.
 *
 * There is no engine code below -- this drives poker-ts directly with random
 * legal actions, exactly as its own README documents. If this ever fails
 * again, the patch did not apply.
 *
 * Run: npm run check:pots [hands]
 */
import pokerPkg from 'poker-ts'
import solverPkg from 'pokersolver'
const { Table: Poker } = pokerPkg as any
const { Hand } = solverPkg as any
const toStr = (c: { rank: string; suit: string }) => c.rank + c.suit[0]

/**
 * The textbook settlement: one pot per distinct amount the players still in
 * put in, contested by everyone still in who put in at least that much.
 * Returns each seat's chips after the hand. Odd chips are left fractional.
 */
function settle(start: number[], end: number[], folded: Set<number>, hole: any[], board: any[]): number[] {
  const put = start.map((s, i) => s - end[i])
  const live = put.map((_, i) => i).filter((i) => start[i] > 0 && !folded.has(i))
  const out = end.slice()
  if (live.length === 1) {
    out[live[0]] += put.reduce((a, b) => a + b, 0)
    return out
  }
  const hand = new Map(live.map((i) => [i, Hand.solve([...hole[i], ...board].map(toStr))]))
  const levels = [...new Set(live.map((i) => put[i]))].filter((l) => l > 0).sort((a, b) => a - b)
  let prev = 0
  levels.forEach((level, k) => {
    let pot = put.reduce((a, p) => a + Math.min(p, level) - Math.min(p, prev), 0)
    if (k === levels.length - 1) pot += put.reduce((a, p) => a + Math.max(0, p - level), 0)
    const eligible = live.filter((i) => put[i] >= level)
    const best = Hand.winners(eligible.map((i) => hand.get(i)))
    const winners = eligible.filter((i) => best.includes(hand.get(i)))
    for (const w of winners) out[w] += pot / winners.length
    prev = level
  })
  return out
}

const TRIALS = Number(process.argv[2] ?? 4000)
const STACKS = [1952, 3574, 474] // uneven, so side pots form

let leaks = 0
let worst = 0
let misPaid = 0
for (let trial = 0; trial < TRIALS; trial++) {
  const t = new Poker({ smallBlind: 10, bigBlind: 20 }, STACKS.length)
  STACKS.forEach((chips, seat) => t.sitDown(seat, chips))
  const total = () => t.seats().reduce((a: number, s: any) => a + (s?.totalChips ?? 0), 0)
  const before = total()
  const chips = () => t.seats().map((s: any) => s?.totalChips ?? 0)
  const start = chips()
  const folded = new Set<number>()
  let expected: number[] | null = null
  let spots = 0

  let pots = '-'
  t.startHand()
  while (t.isHandInProgress()) {
    while (t.isBettingRoundInProgress()) {
      const { actions, chipRange } = t.legalActions()
      const action = actions[Math.floor(Math.random() * actions.length)]
      if (action === 'fold') folded.add(t.playerToAct())
      let size: number | undefined
      if ((action === 'bet' || action === 'raise') && chipRange) {
        size = chipRange.min + Math.floor(Math.random() * (chipRange.max - chipRange.min + 1))
      }
      t.actionTaken(action, size)
    }
    t.endBettingRound()
    if (t.areBettingRoundsCompleted()) {
      pots = t.pots().map((p: any) => `${p.size}@[${p.eligiblePlayers}]`).join(' ')
      spots = t.pots().length
      expected = settle(start, chips(), folded, t.holeCards(), t.communityCards())
      t.showdown()
    }
  }

  const lost = before - total()
  if (lost !== 0) {
    leaks++
    worst = Math.max(worst, Math.abs(lost))
    if (leaks <= 3) console.log(`  hand ${trial}: lost ${lost} chips.  pots at showdown: ${pots}`)
  }
  // Odd chips: poker-ts gives them out one at a time, the textbook here
  // leaves them as fractions. Anything past one chip per pot is a wrong payout.
  const got = chips()
  if (expected && got.some((c: number, i: number) => Math.abs(c - expected![i]) > spots)) {
    misPaid++
    if (misPaid <= 3) {
      console.log(`  hand ${trial}: paid ${got.join('/')}, should be ${expected.map(Math.round).join('/')}.  pots: ${pots}`)
    }
  }
}

const rate = ((leaks / TRIALS) * 100).toFixed(2)
console.log(`\n${leaks}/${TRIALS} hands destroyed chips (${rate}%), worst ${worst} chips.`)
console.log(`${misPaid}/${TRIALS} hands paid a pot to the wrong player.`)
if (leaks === 0 && misPaid === 0) {
  console.log('PASS: chips conserved and paid to the right players. The poker-ts patch is applied and working.')
} else {
  if (leaks) console.log('FAIL: every lost chip is a pot that no player received.')
  if (misPaid) console.log('FAIL: side pots were built or paid wrongly.')
  console.log('Check that patches/poker-ts+1.5.0.patch applied -- try npm install.')
  process.exit(1)
}
