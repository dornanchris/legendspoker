import { Game, type HandEvent } from './game.js'
import { CAST } from './personality.js'
import { toStr } from './equity.js'

/**
 * Watch a few hands with tells and reasoning printed.
 *
 * This is the "does it feel like anything" check. Read the tells column
 * and see whether you could learn to read these three characters. If the
 * reasoning strings all look the same, the dials aren't doing their job.
 */

const HANDS = Number(process.argv[2] ?? 3)

const C = {
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
}

const NAMES = CAST.map((p) => p.name)
const width = Math.max(...NAMES.map((n) => n.length))

const TELL_TEXT: Record<string, string> = {
  steeples_fingers: 'steeples his fingers',
  glances_at_exit: 'glances toward the exit',
  stares_blankly: 'stares blankly at the board',
  shifts_forward: 'shifts forward in his seat',
  adjusts_headdress: 'adjusts her headdress',
  goes_still: 'goes completely still',
}

let handNo = 0

const onEvent = (e: HandEvent) => {
  switch (e.type) {
    case 'street': {
      const board = e.board.map(toStr).join(' ')
      if (e.street === 'preflop') {
        console.log(C.bold(`\n─── Hand ${++handNo} ───`))
      } else {
        console.log(C.dim(`\n  ${e.street.toUpperCase()}  [${board}]`))
      }
      break
    }
    case 'tell': {
      const text = TELL_TEXT[e.signal] ?? e.signal
      console.log(C.dim(`  ${NAMES[e.seat].padEnd(width)}  ${C.cyan(text)}`))
      break
    }
    case 'action': {
      const d = e.decision
      const amt = d.betSize ? ` $${d.betSize}` : ''
      const verb =
        d.action === 'fold'
          ? C.red('folds')
          : d.action === 'check'
            ? C.dim('checks')
            : d.action === 'call'
              ? C.yellow('calls')
              : C.green(`${d.action}s${amt}`)
      console.log(
        `  ${C.bold(NAMES[e.seat].padEnd(width))}  ${verb}` +
          C.dim(`   ${d.reason}`),
      )
      break
    }
    case 'result': {
      if (e.delta !== 0) {
        const sign = e.delta > 0 ? '+' : ''
        const col = e.delta > 0 ? C.green : C.red
        console.log(`  ${NAMES[e.seat].padEnd(width)}  ${col(sign + e.delta)}`)
      }
      break
    }
  }
}

const game = new Game(CAST, {
  bigBlind: 20,
  smallBlind: 10,
  buyIn: 2000,
  rollouts: 200, // slower but more accurate; we're only playing a few hands
  onEvent,
})

for (let i = 0; i < HANDS; i++) await game.playHand()

console.log(
  C.dim(`
Tells fire before the action. Each has a reliability below 1.0, so some
are honest and some mislead — that's what makes them learnable rather
than a readout. Reasoning strings are printed here for debugging; in the
real build the player only sees the tell.`),
)
