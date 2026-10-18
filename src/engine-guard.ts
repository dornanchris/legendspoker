/**
 * Refuse to deal on an unpatched poker-ts.
 *
 * Every fix to the rules lives in patches/poker-ts+1.5.0.patch, and nothing
 * stops the game running without it: patch-package cannot apply a NEW
 * version of the patch over an OLD one already in node_modules, says so in
 * the middle of `npm install`'s output, and npm still exits 0. The bundle is
 * then built from the old rules and the game quietly pays pots to the wrong
 * player. That reached a real table: an all-in for exactly the stack, called
 * twice and checked down, paid to a pair of tens over the shover's two pair.
 *
 * So before the first deal, play that hand (and one the old evaluator
 * misranked) on a throwaway table with the deck stacked, and stop with
 * instructions if either is settled wrongly. Its own table, its own deck:
 * it draws nothing from any game's RNG.
 */
import pokerPkg from 'poker-ts'
const { Table: Poker } = pokerPkg as any

const RANKS = '23456789TJQKA'
const SUITS = 'cdhs'

export const ENGINE_FIX =
  'poker-ts is missing its patch (patches/poker-ts+1.5.0.patch), so pots can be paid ' +
  'to the wrong player. Delete node_modules and run `npm install` again, then rebuild ' +
  '(`npm run web`).'

/** Deals `cards` in order (seat 0's two, seat 1's two, ..., then the board). */
function settle(stacks: number[], button: number, cards: string[], actions: [string, number?][]) {
  const stacked = (deck: { rank: number; suit: number }[]) => {
    // A plain copy: Deck extends Array, so deck.filter() would build a Deck.
    const all = Array.from(deck)
    const want = cards.map((c) => all.find((d) => d.rank === RANKS.indexOf(c[0]) && d.suit === SUITS.indexOf(c[1]))!)
    const rest = all.filter((d) => !want.includes(d))
    // poker-ts draws from the END of the deck.
    ;[...rest, ...want.reverse()].forEach((d, i) => (deck[i] = d))
  }
  const table = new Poker({ smallBlind: 15, bigBlind: 30 }, stacks.length, stacked)
  stacks.forEach((chips, seat) => table.sitDown(seat, chips))
  table.startHand(button)
  for (const [action, size] of actions) table.actionTaken(action, size)
  table.endBettingRound()
  while (!table.areBettingRoundsCompleted()) {
    while (table.isBettingRoundInProgress()) table.actionTaken('check')
    table.endBettingRound()
  }
  table.showdown()
  return table.seats().map((s: any) => s?.totalChips ?? 0)
}

let checked = false

export function assertPatchedEngine(): void {
  if (checked) return
  let ok = false
  try {
    // The hand from the table: seat 4 shoves 4-4 for 786 on the button, seats
    // 2 and 3 call, the board is checked down. Two pair, tens and fours,
    // takes all 2,403. Unpatched, seat 4 is dropped from the pot on the flop.
    const pots = settle(
      [2610, 1835, 2110, 2659, 786],
      4,
      ['As', 'Ks', 'Qc', 'Qd', '5s', 'Js', 'Kh', '9h', '4h', '4s', '2h', '3d', 'Ts', 'Td', '8s'],
      [['call'], ['call'], ['raise', 786], ['fold'], ['fold'], ['call'], ['call']],
    )
    // Two sets of trips is a full house: 9-9-9-4-4 beats the ace flush.
    // Unpatched, it was scored three of a kind and lost.
    const ranks = settle(
      [1000, 1000],
      0,
      ['9s', '4s', 'Ad', 'Kd', '9d', '9h', '4d', '4h', 'Qd'],
      [['raise', 1000], ['call']],
    )
    ok = pots[4] === 2403 && pots[3] === 2659 - 786 && ranks[0] === 2000
  } catch {
    ok = false
  }
  if (!ok) throw new Error(ENGINE_FIX)
  checked = true
}
