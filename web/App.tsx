import { useEffect, useState, useSyncExternalStore } from 'react'
import { TABLES } from '../src/roster.js'
import { WorldMap } from './Map.js'
import {
  goMap,
  hasProgress,
  markState,
  newTour,
  snapshot as tourSnapshot,
  subscribe as tourSubscribe,
} from './tour.js'
import type { Card } from '../src/equity.js'
import type { Action, Decision } from '../src/decide.js'
import type { TurnView } from '../src/game.js'
import { click } from './audio.js'
import {
  act,
  cardKey,
  leave,
  saveGame,
  snapshot,
  start,
  subscribe,
  type LogLine,
  type PuppetView,
  type SeatView,
  type TableView,
} from './table.js'

/**
 * The Phase 4 table. Still the ugly one -- art is Phase 5 -- but now it is
 * React over Vite, which is what the phone build needs.
 *
 * React renders; it does not drive. The engine and the presentation queue in
 * table.ts own the loop, and this subscribes to the view they produce. Same
 * separation as before, one layer up.
 */

const SUIT = { clubs: '♣', diamonds: '♦', hearts: '♥', spades: '♠' } as const
const isRed = (c: Card) => c.suit === 'hearts' || c.suit === 'diamonds'

function CardEl({ card, small, won }: { card: Card | null; small?: boolean; won?: boolean }) {
  const cls = [
    'card',
    small ? 'small' : '',
    card && isRed(card) ? 'red' : '',
    card ? '' : 'back',
    won ? 'win' : '',
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <div
      className={cls}
      aria-label={card ? `${card.rank} of ${card.suit}` : 'face down'}
      data-card={card ? cardKey(card) : undefined}
    >
      {card ? `${card.rank}${SUIT[card.suit]}` : '??'}
    </div>
  )
}

function Cards({
  cards,
  winning,
  small,
}: {
  cards: (Card | null)[]
  winning: ReadonlySet<string>
  small?: boolean
}) {
  return (
    <>
      {cards.map((c, i) => (
        <CardEl key={i} card={c} small={small} won={!!c && winning.has(cardKey(c))} />
      ))}
    </>
  )
}

/**
 * The state machine inputs, as the rig will read them (BUILD-PLAN section 4).
 * Debug only, behind ?puppet=1 -- but it is what lets the contract be watched
 * against a real hand before a single .riv file exists.
 */
function Puppet({ p }: { p: PuppetView }) {
  const flags = [
    p.isInHand ? 'HAND' : '',
    p.isTurn ? 'TURN' : '',
    p.isThinking ? 'THINK' : '',
  ].filter(Boolean)
  return (
    <div className="puppet">
      {(['mood', 'tilt', 'attention'] as const).map((k) => (
        <div className="bar" key={k} title={`${k} ${p[k].toFixed(2)}`}>
          <span className="k">{k[0]}</span>
          <i style={{ width: `${Math.round(p[k] * 100)}%` }} data-k={k} />
        </div>
      ))}
      <div className="flags">
        {flags.join(' ') || '—'}
        {p.fired.length > 0 && <b> {p.fired.join(' ')}</b>}
      </div>
    </div>
  )
}

function Seat({
  seat,
  winning,
  puppet,
}: {
  seat: SeatView
  winning: ReadonlySet<string>
  puppet?: PuppetView
}) {
  const cls = [
    'seat',
    seat.acting ? 'acting' : '',
    seat.folded ? 'folded' : '',
    seat.out ? 'out' : '',
    seat.winner ? 'winner' : '',
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={cls}>
      <div className="name">
        <span>{seat.name}</span>
        <span className="stack">{seat.stack}</span>
      </div>
      <div className="cards">
        <Cards cards={seat.cards} winning={winning} small />
      </div>
      <div className="last">{seat.last}</div>
      <div className="tell">{seat.tell}</div>
      {puppet && <Puppet p={puppet} />}
    </div>
  )
}

function Log({ lines }: { lines: LogLine[] }) {
  // The log is the non-visual channel -- it carries every action, and is the
  // accessibility fallback for a game built on watching faces -- so it follows
  // the hand rather than making the player chase it.
  useEffect(() => {
    const panel = document.getElementById('log-panel')
    if (panel) panel.scrollTop = panel.scrollHeight
  }, [lines])
  return (
    <aside id="log-panel" aria-label="Hand log">
      <h2>Log</h2>
      <ol id="log" aria-live="polite">
        {lines.map((l) => (
          <li key={l.id} className={l.kind || undefined}>
            {l.text}
          </li>
        ))}
      </ol>
    </aside>
  )
}

/** The raise control is the only piece of local UI state on the page. */
function Controls({ view }: { view: TableView }) {
  const { turn } = view
  const [raising, setRaising] = useState(false)
  const [size, setSize] = useState(0)

  // A new turn is a new decision: never carry a half-set slider into it.
  useEffect(() => {
    setRaising(false)
    if (turn) {
      setSize(Math.min(turn.maxRaise, Math.max(turn.minRaise, Math.round(turn.pot * 0.6))))
    }
  }, [turn])

  const commit = (d: Decision) => {
    click()
    act(d)
  }

  const raise: Action | null = turn?.legal.includes('raise')
    ? 'raise'
    : turn?.legal.includes('bet')
      ? 'bet'
      : null
  const canRaise = !!turn && !!raise && turn.maxRaise >= turn.minRaise

  return (
    <section id="controls" aria-label="Your actions">
      <div id="prompt">{view.prompt}</div>
      <div id="buttons">
        {turn?.legal.includes('fold') && (
          <button type="button" className="danger" onClick={() => commit({ action: 'fold', reason: 'human' })}>
            Fold
          </button>
        )}
        {turn?.legal.includes('check') && (
          <button type="button" onClick={() => commit({ action: 'check', reason: 'human' })}>
            Check
          </button>
        )}
        {turn?.legal.includes('call') && (
          <button type="button" className="primary" onClick={() => commit({ action: 'call', reason: 'human' })}>
            {callLabel(turn)}
          </button>
        )}
        {canRaise && !raising && (
          <button type="button" onClick={() => { click(); setRaising(true) }}>
            {raise === 'bet' ? 'Bet…' : 'Raise…'}
          </button>
        )}
      </div>

      <div id="save-row">
        <button
          id="save"
          type="button"
          className="ghost"
          disabled={view.status !== 'playing'}
          onClick={() => { click(); saveGame() }}
        >
          Save
        </button>
        <span id="save-note">{view.saveNote}</span>
      </div>

      {turn && canRaise && (
        <div id="raise-row" hidden={!raising}>
          <input
            type="range"
            id="raise-slider"
            aria-label="Bet size"
            min={turn.minRaise}
            max={turn.maxRaise}
            step={1}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <output id="raise-value">{size >= turn.maxRaise ? `${size} (all in)` : size}</output>
          <button type="button" onClick={() => commit({ action: raise!, betSize: size, reason: 'human' })}>
            Confirm
          </button>
          <button type="button" className="ghost" onClick={() => { click(); setRaising(false) }}>
            Cancel
          </button>
        </div>
      )}
    </section>
  )
}

function callLabel(turn: TurnView): string {
  const amount = Math.min(turn.toCall, turn.stack)
  return amount >= turn.stack ? `Call all in (${amount})` : `Call ${amount}`
}

/**
 * The title screen. A Phase 4 STUB by design: BUILD-PLAN 3B says stand
 * navigation up early and fill the screens in late, because retrofitting
 * routing into a single-view app is the expensive way round.
 *
 * Journal, Settings and Multiplayer are listed here because the doc lists
 * them, and disabled because they do not exist. Showing where they will go is
 * cheaper than discovering later that there was never room for them.
 */
function Home() {
  const tour = useSyncExternalStore(tourSubscribe, tourSnapshot)
  const next = TABLES.find((t) => markState(t.id) === 'current')
  return (
    <main id="home">
      <div className="titles">
        <h1>Legends Poker</h1>
        <p className="sub">Death&rsquo;s Invitational</p>
      </div>
      <nav>
        {hasProgress() && (
          <button type="button" className="primary" onClick={() => { click(); goMap() }}>
            Continue
          </button>
        )}
        <button type="button" onClick={() => { click(); newTour() }}>
          {hasProgress() ? 'New tour' : 'Begin the tour'}
        </button>
        <button type="button" className="ghost" disabled>Journal</button>
        <button type="button" className="ghost" disabled>Settings</button>
        <button type="button" className="ghost" disabled>Multiplayer</button>
      </nav>
      <p className="whereami">
        {tour.beaten.length > 0
          ? `${tour.beaten.length} of ${TABLES.length} cleared — next: ${next?.displayName ?? 'the last crossing'}`
          : 'Eight tables. One dealer. He has been at every one of them before.'}
      </p>
    </main>
  )
}

function Table() {
  const view = useSyncExternalStore(subscribe, snapshot)
  const tour = useSyncExternalStore(tourSubscribe, tourSnapshot)

  // The engine loop is started here and owned by table.ts. React does not
  // drive it; it only says which destination to deal.
  useEffect(() => { void start(tour.playing) }, [tour.playing])

  return (
    <>
      <main id="table">
        <header id="table-head">
          <button type="button" className="ghost" onClick={() => { click(); leave() }}>
            ‹ Map
          </button>
          <span>{view.title}</span>
        </header>
        <section id="opponents" aria-label="Opponents">
          {view.opponents.map((s) => (
            <Seat key={s.seat} seat={s} winning={view.winning} puppet={view.puppets[s.seat]} />
          ))}
        </section>

        <section id="middle">
          <div id="board" aria-label="Community cards">
            <Cards cards={view.board} winning={view.winning} />
          </div>
          <div id="pot">
            <span className="label">POT</span> <span id="pot-value">{view.pot}</span>
          </div>
          <div id="level">{view.blinds}</div>
        </section>

        <section id="you">
          <div id="you-info">
            <span id="you-name">{view.you.name}</span>
            <span id="you-stack" className="stack">{view.you.stack}</span>
            <span id="you-position">{view.handNo ? `hand ${view.handNo}` : ''}</span>
          </div>
          <div id="you-cards" aria-label="Your cards">
            <Cards cards={view.you.cards} winning={view.winning} />
          </div>
        </section>

        <Controls view={view} />
      </main>
      <Log lines={view.log} />
    </>
  )
}

export function App() {
  const tour = useSyncExternalStore(tourSubscribe, tourSnapshot)
  if (tour.screen === 'home') return <Home />
  if (tour.screen === 'map') return <WorldMap />
  return <Table />
}
