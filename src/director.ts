/**
 * THE DIRECTOR: one sitting at one table, as the table experiences it.
 *
 * The engine resolves hands and emits events. The director reads those same
 * events and decides what the ROOM does about them: who says what, when the
 * table's respect for you flips, which lines of Death's ledger you just
 * earned, and what you have learned about each opponent by watching.
 *
 * Three rules keep it honest:
 *
 * 1. It never talks while cards are live, except to react to something the
 *    player just did in public (going all in). Banter, needling and respect
 *    all happen at hand boundaries, so nothing said can leak a hand -- the
 *    design doc's hardest dialogue rule.
 *
 * 2. It has its OWN seeded RNG. Choosing a line must never consume a draw
 *    from the game's RNG, or saying something would change the next card.
 *    Its seed derives from the table's, so a resumed game says the same
 *    things in the same places -- "dialogue lines already used" survives a
 *    save for free.
 *
 * 3. It knows only what the player could know: public actions, cards shown
 *    down, and the player's OWN hole cards. Opponents' observations are built
 *    from what they did, never from what they held.
 *
 * Nothing in here branches on a character's identity. Who speaks is data:
 * the dialogue file names the speakers and the table file names the champion.
 */
import { mulberry32 } from './rng.js'
import { RANKINGS, type HandEvent } from './game.js'
import { CHARACTERS, type TableData, type DialogueData, type Line } from './content.js'
import { preflopStrength, type Card } from './equity.js'
import { fillLine, tierFor, RESPECT_POINTS, RESPECT_THRESHOLDS, earnedName } from './tour.js'
import { handRank, marksForHand, marksForTable, type HandFacts, type TableFacts } from './marks.js'

export type Beat =
  | { kind: 'line'; id: string; speaker: string; text: string; stage: boolean }
  /** The table's name for you just changed. Always announced. */
  | { kind: 'respect'; tier: number; name: string | null }
  | { kind: 'mark'; id: string }

export type ObservationDelta = {
  hands: number
  vpip: number
  pfr: number
  bets: number
  calls: number
  faced: number
  foldsToBet: number
  showdowns: number
}

/** What one finished hand changes in the player's permanent record. */
export type HandSummary = {
  hand: number
  facts: HandFacts
  observations: Record<string, ObservationDelta>
  /** Pot the player won at showdown with their best hand, for the record. */
  showdownWins: { rank: number; cards: Card[]; amount: number }[]
  /** Opponents the player knocked out, and whether the player was knocked out. */
  knockouts: string[]
  bustedBy: string[]
}

export type RunOptions = {
  table: TableData
  dialogue: DialogueData
  mode: 'tour' | 'open'
  seed: number
  playerName: string
  respectTier: number
  respectPoints: number
  earnedMarks: Iterable<string>
  buyIn: number
}

const HUMAN = 0
const newObs = (): ObservationDelta => ({
  hands: 0, vpip: 0, pfr: 0, bets: 0, calls: 0, faced: 0, foldsToBet: 0, showdowns: 0,
})

/** Chance a given aside fires when its trigger occurs. Rationing, in data-ish form. */
const ASIDE_CHANCE: Record<string, number> = {
  first_elimination: 1,
  headsup_start: 1,
  player_eliminates: 0.6,
  player_bad_beat: 0.75,
  player_wins_big_pot: 0.5,
  champion_loses_pot: 0.35,
  player_all_in: 0.45,
  blinds_up: 0.35,
}

const median = (xs: number[]) => {
  if (!xs.length) return 0
  const s = [...xs].sort((a, b) => a - b)
  return s[Math.floor(s.length / 2)]
}

export class TableRun {
  readonly table: TableData
  readonly dialogue: DialogueData
  readonly mode: 'tour' | 'open'
  readonly playerName: string
  tier: number
  points: number
  handNo = 0
  /** Everyone who has sat at this table during the sitting. */
  readonly sat = new Set<string>()
  lastSummary: HandSummary | null = null

  private rng: () => number
  private used = new Set<string>()
  private earned: Set<string>
  private seats: (string | null)[] = []
  private buyIn: number
  private headsUpAnnounced = false
  private firstElimDone = false
  private plantDone = false
  private lastBanterHand = 0
  private lastOptionalHand = 0
  private minStackBB = Infinity
  private neverBelowStart = true
  private eliminationOrder: string[] = []
  private arrived = new Set<string>()

  // Per-hand state, reset on every 'hand' event.
  private h = this.freshHand(0, 0, [])

  // The player's own habits this sitting, for anyone who reads people.
  private me = {
    hands: 0, vpip: 0, bets: 0, calls: 0, checks: 0, folds: 0,
    foldMs: [] as number[], otherMs: [] as number[], betMs: [] as number[], passiveMs: [] as number[],
    lastHandBluff: false,
  }

  constructor(o: RunOptions) {
    this.table = o.table
    this.dialogue = o.dialogue
    this.mode = o.mode
    this.playerName = o.playerName
    this.buyIn = o.buyIn
    this.earned = new Set(o.earnedMarks)
    this.tier = Math.max(o.respectTier, o.table.respectStart)
    this.points = Math.max(o.respectPoints, RESPECT_THRESHOLDS[this.tier])
    // Offset so the director's stream never coincides with the game's.
    this.rng = mulberry32((o.seed ^ 0x5eed1e55) >>> 0)
    // Open tables have no champion and no plot: no plant, no arrival.
    if (o.mode === 'open') this.plantDone = true
  }

  /** The name the table currently calls you, or null (not addressed). */
  earnedName(): string | null {
    return earnedName(this.tier, this.dialogue.earned_names, this.playerName)
  }

  private freshHand(no: number, bigBlind: number, stacks: number[]) {
    return {
      no,
      bigBlind,
      startStacks: stacks,
      /**
       * Who sat where when the hand began. A chair can change hands before the
       * hand is over (the Robot busts, the ship takes its chair), so anything
       * credited to a seat for THIS hand uses this, not the live seating.
       */
      ids: [...this.seats],
      /** Chips the player has put in this hand, blinds included. */
      humanIn: 0,
      hole: null as Card[] | null,
      board: [] as Card[],
      folded: new Set<number>(),
      streetIn: [] as number[],
      behind: [] as number[],
      street: 'preflop',
      humanBet: false,
      humanAllIn: false,
      vpip: new Set<number>(),
      pfr: new Set<number>(),
      obs: new Map<string, ObservationDelta>(),
      revealed: new Set<number>(),
      showdown: null as Extract<HandEvent, { type: 'showdown' }> | null,
      deltas: new Map<number, number>(),
      busted: [] as { seat: number; id: string }[],
      /** Knocked-out characters who came back at the end of this hand. */
      returned: [] as string[],
    }
  }

  // ------------------------------------------------------------ helpers

  private present(speaker: string): boolean {
    if (speaker === 'death' || speaker === 'narration') return true
    return this.seats.includes(speaker)
  }

  /**
   * A late champion who is IN the room before they sit down -- the station
   * speaking as the room -- may talk. One who is simply late (Odysseus) or
   * watching in silence (Dracula) may not. The table's data says which, with
   * the arrival's `watching` flag.
   */
  private canSpeak(speaker: string): boolean {
    if (this.present(speaker)) return true
    const a = this.table.arrival
    return !!a && a.character === speaker && !this.arrived.has(speaker) &&
      this.mode === 'tour' && !!a.watching
  }

  private say(l: Line): Beat {
    this.used.add(l.id)
    return {
      kind: 'line',
      id: l.id,
      speaker: l.speaker,
      text: fillLine(l.text, this.dialogue.earned_names, this.playerName),
      stage: l.type === 'stage_direction' || l.speaker === 'narration',
    }
  }

  private pick(lines: Line[] | undefined, ok: (l: Line) => boolean = () => true): Line | null {
    const pool = (lines ?? []).filter((l) => !this.used.has(l.id) && this.canSpeak(l.speaker) && ok(l))
    if (!pool.length) return null
    return pool[Math.floor(this.rng() * pool.length)]
  }

  private aside(trigger: string): Beat[] {
    const chance = ASIDE_CHANCE[trigger] ?? 0.5
    const line = this.pick(this.dialogue.death_asides, (l) => l.trigger === trigger)
    if (!line) return []
    // Draw only when there is something to say, so an exhausted trigger
    // costs no randomness and cannot shift what is said later.
    if (chance < 1 && this.rng() > chance) return []
    return [this.say(line)]
  }

  private opponents(): string[] {
    return this.seats.filter((s, i): s is string => s !== null && i !== HUMAN)
  }

  private isChampionSeat(id: string): boolean {
    // Champions' tables and the finale have no single champion; there every
    // opponent is one.
    return this.table.champion ? this.table.champion === id : this.table.kind !== 'tour'
  }

  private obs(id: string): ObservationDelta {
    let o = this.h.obs.get(id)
    if (!o) this.h.obs.set(id, (o = newObs()))
    return o
  }

  // ------------------------------------------------------------ events

  onEvent(e: HandEvent): Beat[] {
    switch (e.type) {
      case 'hand': return this.onHand(e)
      case 'deal':
        this.h.hole = e.hole
        return []
      case 'street': {
        this.h.street = e.street
        this.h.board = e.board
        if (e.street === 'preflop') {
          // The blinds are already in: what went in is the difference
          // between total chips and chips behind.
          this.h.streetIn = e.stacks.map((behind, i) => (this.h.startStacks[i] ?? 0) - behind)
          this.h.humanIn = this.h.streetIn[HUMAN] ?? 0
        } else {
          this.h.streetIn = e.stacks.map(() => 0)
        }
        this.h.behind = [...e.stacks]
        return []
      }
      case 'action': return this.onAction(e)
      case 'showdown': {
        this.h.showdown = e
        this.h.board = e.board
        for (const r of e.revealed) this.h.revealed.add(r.seat)
        return []
      }
      case 'result':
        this.h.deltas.set(e.seat, e.delta)
        return []
      case 'level':
        return this.handNo > 1 ? this.aside('blinds_up') : []
      case 'eliminated': return this.onEliminated(e)
      case 'arrival': return this.onArrival(e)
      case 'handEnd': return this.onHandEnd(e)
      default:
        return []
    }
  }

  private onHand(e: Extract<HandEvent, { type: 'hand' }>): Beat[] {
    this.handNo = e.hand
    this.seats = e.seats.map((s, i) => (i === HUMAN ? (s ? 'human' : null) : s))
    for (const id of this.opponents()) this.sat.add(id)
    this.h = this.freshHand(e.hand, e.bigBlind, e.stacks)
    for (const id of this.opponents()) this.obs(id).hands++
    if (this.seats[HUMAN]) this.me.hands++

    const beats: Beat[] = []

    // The one "the dealer arranged it" beat, when its hand comes round and
    // everyone in it is at the table. It waits rather than playing half a
    // conversation to an empty chair.
    if (!this.plantDone) {
      const plant = this.dialogue.dealer_plant ?? []
      const m = plant[0]?.trigger?.match(/^hand_(\d+)_start$/)
      if (m && e.hand >= Number(m[1]) && plant.every((l) => this.canSpeak(l.speaker))) {
        this.plantDone = true
        for (const l of plant) beats.push(this.say(l))
        this.lastOptionalHand = e.hand
        return beats
      }
      if (!m) this.plantDone = !plant.length || plant[0]?.trigger !== 'champion_arrival'
    }

    const opp = this.opponents()
    const headsUp = opp.length === 1 && this.seats[HUMAN] !== null
    if (headsUp && !this.headsUpAnnounced && this.isChampionSeat(opp[0])) {
      this.headsUpAnnounced = true
      // At least tier 2: the last one standing has to take you seriously.
      if (this.points < RESPECT_THRESHOLDS[2]) this.points = RESPECT_THRESHOLDS[2]
      beats.push(...this.flipRespect())
      const open = this.pick(this.dialogue.champion_headsup, (l) => l.trigger === 'headsup_start' && l.speaker === opp[0])
        ?? this.pick(this.dialogue.champion_headsup, (l) => l.trigger === 'headsup_start' && l.speaker === 'death')
      if (open) beats.push(this.say(open))
      beats.push(...this.aside('headsup_start'))
      this.lastOptionalHand = e.hand
      return beats
    }

    // At most one unprompted line per hand boundary, and not every hand.
    if (e.hand < 2 || e.hand - this.lastOptionalHand < 2) return beats
    const roll = this.rng()

    if (this.dialogue.reads_you && e.hand >= 10) {
      const bluff = this.me.lastHandBluff
      if ((bluff && roll < 0.6) || roll < 0.14) {
        const line = this.readYou()
        if (line) {
          this.lastOptionalHand = e.hand
          return [...beats, this.say(line)]
        }
      }
    }

    if (headsUp && this.isChampionSeat(opp[0])) {
      if (roll < 0.3) {
        const line = this.pick(this.dialogue.champion_headsup, (l) => !l.trigger && (l.speaker === opp[0] || l.speaker === 'death'))
        if (line) {
          this.lastOptionalHand = e.hand
          beats.push(this.say(line))
        }
      }
      return beats
    }

    if (roll < 0.16) {
      const line = this.pick(this.dialogue.player_directed?.[`tier_${this.tier}`])
      if (line) {
        this.lastOptionalHand = e.hand
        beats.push(this.say(line))
      }
    }
    return beats
  }

  /** Holmes's trick, as data: a line that describes what the PLAYER does. */
  private readYou(): Line | null {
    const m = this.me
    const acts = m.bets + m.calls
    const holds: Record<string, boolean> = {
      loose: m.hands >= 12 && m.vpip / m.hands >= 0.45,
      tight: m.hands >= 12 && m.vpip / m.hands <= 0.18,
      aggressive: m.bets >= 6 && m.bets / Math.max(1, m.calls) >= 2.5,
      passive: m.calls >= 8 && acts > 0 && m.bets / Math.max(1, m.calls) <= 0.6,
      bluffed: m.lastHandBluff,
      folds_fast: m.foldMs.length >= 5 && m.otherMs.length >= 5 &&
        median(m.foldMs) < 0.5 * median(m.otherMs),
      thinks_long: m.betMs.length >= 4 && m.passiveMs.length >= 4 &&
        median(m.betMs) >= 1.8 * median(m.passiveMs),
    }
    // The bluff is the freshest thing to say; prefer it when it is true.
    if (holds.bluffed) {
      const l = this.pick(this.dialogue.reads_you, (x) => x.when === 'bluffed')
      if (l) return l
    }
    return this.pick(this.dialogue.reads_you, (x) => !!x.when && holds[x.when])
  }

  private onAction(e: Extract<HandEvent, { type: 'action' }>): Beat[] {
    const h = this.h
    const seat = e.seat
    const before = h.behind[seat] ?? 0
    const put = before - e.stacks[seat]
    const maxIn = Math.max(0, ...h.streetIn)
    const faced = (h.streetIn[seat] ?? 0) < maxIn
    h.streetIn[seat] = (h.streetIn[seat] ?? 0) + Math.max(0, put)
    if (seat === HUMAN) h.humanIn += Math.max(0, put)
    h.behind = [...e.stacks]

    const a = e.decision.action
    const aggressive = a === 'bet' || a === 'raise'
    if (a === 'fold') h.folded.add(seat)
    if (h.street === 'preflop' && (a === 'call' || aggressive)) h.vpip.add(seat)
    if (h.street === 'preflop' && aggressive) h.pfr.add(seat)

    const beats: Beat[] = []
    if (seat === HUMAN) {
      const ms = e.decision.thinkMs
      if (aggressive) { this.me.bets++; h.humanBet = true }
      if (a === 'call') this.me.calls++
      if (a === 'check') this.me.checks++
      if (a === 'fold') this.me.folds++
      if (ms !== undefined) {
        if (a === 'fold') this.me.foldMs.push(ms)
        else this.me.otherMs.push(ms)
        if (aggressive) this.me.betMs.push(ms)
        else if (a === 'call' || a === 'check') this.me.passiveMs.push(ms)
      }
      if (a !== 'fold' && e.stacks[HUMAN] === 0 && !h.humanAllIn) {
        h.humanAllIn = true
        beats.push(...this.aside('player_all_in'))
      }
    } else {
      const id = h.ids[seat]
      if (id) {
        const o = this.obs(id)
        if (faced) o.faced++
        if (a === 'fold' && faced) o.foldsToBet++
        if (a === 'call') o.calls++
        if (aggressive) o.bets++
      }
    }
    return beats
  }

  private onEliminated(e: Extract<HandEvent, { type: 'eliminated' }>): Beat[] {
    this.h.busted.push({ seat: e.seat, id: e.id })
    if (e.seat !== HUMAN) this.seats[e.seat] = null
    const beats: Beat[] = []
    if (e.seat === HUMAN) {
      const other = this.pick(this.dialogue.player_busted, (l) => l.speaker !== 'death')
      if (other) beats.push(this.say(other))
      const d = this.pick(this.dialogue.player_busted, (l) => l.speaker === 'death')
      if (d) beats.push(this.say(d))
      return beats
    }
    this.eliminationOrder.push(e.id)
    // Their parting words ignore presence: they are still in the room as
    // they get up.
    const own = (this.dialogue.eliminated?.[e.id] ?? []).filter((l) => !this.used.has(l.id))
    if (own.length) beats.push(this.say(own[Math.floor(this.rng() * own.length)]))
    if (!this.firstElimDone) {
      this.firstElimDone = true
      beats.push(...this.aside('first_elimination'))
    }
    return beats
  }

  private onArrival(e: Extract<HandEvent, { type: 'arrival' }>): Beat[] {
    this.arrived.add(e.id)
    this.seats[e.seat] = e.id
    this.sat.add(e.id)
    // Retaking your own chair is a RETURN, not the table's champion arriving:
    // it plays the returner's own scene, at any table, open ones included.
    if (e.replaces === e.id) return this.onReturn(e.id)
    if (this.mode === 'open') return []
    const beats: Beat[] = []
    // The entrance is a scene: play it in order, and stop at the first line
    // whose speaker has already left the table rather than have a knocked-out
    // player answer an arrival they did not see.
    for (const l of this.dialogue.champion_arrival ?? []) {
      if (!this.canSpeak(l.speaker)) break
      beats.push(this.say(l))
    }
    const plant = this.dialogue.dealer_plant ?? []
    if (!this.plantDone && plant[0]?.trigger === 'champion_arrival') {
      this.plantDone = true
      for (const l of plant) beats.push(this.say(l))
    }
    this.lastOptionalHand = this.handNo
    return beats
  }

  /** One line per speaker of the returner's scene, in order. */
  private onReturn(id: string): Beat[] {
    this.h.returned.push(id)
    const lines = CHARACTERS[id]?.returns?.lines ?? []
    const beats: Beat[] = []
    for (const speaker of new Set(lines.map((l) => l.speaker))) {
      if (!this.canSpeak(speaker)) continue
      const own = lines.filter((l) => l.speaker === speaker)
      beats.push(this.say(own[Math.floor(this.rng() * own.length)]))
    }
    this.lastOptionalHand = this.handNo
    return beats
  }

  private onHandEnd(e: Extract<HandEvent, { type: 'handEnd' }>): Beat[] {
    const h = this.h
    const bb = h.bigBlind || 1
    const beats: Beat[] = []
    const net = h.deltas.get(HUMAN) ?? 0
    const sd = h.showdown
    const humanRevealed = h.revealed.has(HUMAN)
    const board = sd?.board ?? h.board

    // --- what the player won, and how
    const wonPots: HandFacts['wonPots'] = []
    const showdownWins: HandSummary['showdownWins'] = []
    if (sd) {
      sd.pots.forEach((p) => {
        if (!p.winners.includes(HUMAN)) return
        const contested = !!p.ranking && humanRevealed && sd.revealed.length > 1
        const rank = p.ranking ? RANKINGS.indexOf(p.ranking) : -1
        wonPots.push({
          amount: p.amount,
          rank: contested && rank >= 0 ? rank : null,
          cards: contested ? p.cards ?? null : null,
          showdown: contested,
        })
        if (contested && rank >= 0 && p.cards) showdownWins.push({ rank, cards: p.cards, amount: p.amount })
      })
    }
    if (!wonPots.length && net > 0) {
      // Won without a showdown: everyone folded. The pot is what they lost
      // plus what the player put in.
      wonPots.push({ amount: net + h.humanIn, rank: null, cards: null, showdown: false })
    }
    const wonShowdown = showdownWins.length > 0
    const uncontested = net > 0 && !wonShowdown

    let bluffWon = false
    if (uncontested && h.humanBet && h.hole) {
      bluffWon = board.length === 0
        ? preflopStrength(h.hole) < 0.42
        : handRank([...h.hole, ...board]).rank === 0
    }
    this.me.lastHandBluff = bluffWon

    let lostShowdownRank: number | null = null
    if (humanRevealed && h.hole && net < 0 && sd && sd.revealed.length > 1) {
      lostShowdownRank = handRank([...h.hole, ...board]).rank
    }

    // --- knockouts: the player won chips in the hand that emptied the chair
    const knockouts = net > 0 ? h.busted.filter((b) => b.seat !== HUMAN).map((b) => b.id) : []
    const bustedBy: string[] = []
    if (h.busted.some((b) => b.seat === HUMAN)) {
      for (const [seat, d] of h.deltas) {
        const id = h.ids[seat]
        if (seat !== HUMAN && d > 0 && id) bustedBy.push(id)
      }
    }

    // --- observations: what the player could see opponents do
    for (const seat of h.vpip) {
      const id = h.ids[seat]
      if (id && seat !== HUMAN) this.obs(id).vpip++
    }
    for (const seat of h.pfr) {
      const id = h.ids[seat]
      if (id && seat !== HUMAN) this.obs(id).pfr++
    }
    for (const seat of h.revealed) {
      const id = h.ids[seat]
      if (id && seat !== HUMAN && (sd?.revealed.length ?? 0) > 1) this.obs(id).showdowns++
    }
    if (h.vpip.has(HUMAN)) this.me.vpip++

    // --- the player's stack, for comeback / wire-to-wire marks
    const stack = e.stacks[HUMAN] ?? 0
    if (stack > 0) this.minStackBB = Math.min(this.minStackBB, stack / bb)
    if (stack < this.buyIn && h.no > 0) this.neverBelowStart = false

    // --- respect
    if (net >= 10 * bb) this.points += RESPECT_POINTS.pot
    if (net >= 30 * bb) this.points += RESPECT_POINTS.bigPot
    if (wonShowdown) this.points += RESPECT_POINTS.showdownWin
    this.points += RESPECT_POINTS.knockout * knockouts.length
    beats.push(...this.flipRespect())
    // Respect marks land when the name changes, not at the end of the table.
    for (const id of marksForTable(this.partialFacts(), this.earned)) {
      this.earned.add(id)
      beats.push({ kind: 'mark', id })
    }

    // --- Death's asides on what just happened
    if (knockouts.length) beats.push(...this.aside('player_eliminates'))
    else if (net >= 40 * bb) beats.push(...this.aside('player_wins_big_pot'))
    if (lostShowdownRank !== null && lostShowdownRank >= RANKINGS.indexOf('two pair')) {
      beats.push(...this.aside('player_bad_beat'))
    }
    const champ = this.table.champion
    if (champ && this.mode === 'tour') {
      const champSeat = h.ids.indexOf(champ)
      if (champSeat > 0 && (h.deltas.get(champSeat) ?? 0) <= -15 * bb) {
        beats.push(...this.aside('champion_loses_pot'))
      }
    }

    // --- heads-up with a champion: they notice when you take one off them
    const opp = this.opponents()
    if (net > 0 && this.headsUpAnnounced && opp.length === 1 && this.isChampionSeat(opp[0])) {
      const line = this.pick(this.dialogue.champion_headsup,
        (l) => l.trigger === 'player_wins_pot' && (l.speaker === opp[0] || l.speaker === 'death'))
      if (line && this.rng() < 0.4) beats.push(this.say(line))
    }

    // --- banter, between hands, from the two who just fought over a pot
    beats.push(...this.banter(e.hand))

    // --- marks
    const facts: HandFacts = {
      table: this.table.id,
      mode: this.mode,
      hole: h.hole,
      board,
      bigBlind: bb,
      net,
      wonPots,
      allInWon: h.humanAllIn && net > 0,
      knockouts,
      lostShowdownRank,
      bluffWon,
      splitPot: !!sd?.pots.some((p) => p.winners.length > 1 && p.winners.includes(HUMAN)),
      returned: h.returned,
    }
    for (const id of marksForHand(facts, this.earned)) {
      this.earned.add(id)
      beats.push({ kind: 'mark', id })
    }

    const observations: Record<string, ObservationDelta> = {}
    for (const [id, o] of h.obs) observations[id] = o
    this.lastSummary = { hand: h.no, facts, observations, showdownWins, knockouts, bustedBy }
    return beats
  }

  private flipRespect(): Beat[] {
    const next = Math.max(this.tier, tierFor(this.points))
    if (next <= this.tier) return []
    const beats: Beat[] = []
    for (let t = this.tier + 1; t <= next; t++) {
      this.tier = t
      beats.push({ kind: 'respect', tier: t, name: this.earnedName() })
      // The tier's first line is written as its announcement.
      const lines = this.dialogue.player_directed?.[`tier_${t}`] ?? []
      const first = lines.find((l) => !this.used.has(l.id) && this.canSpeak(l.speaker))
      if (first && t === next) beats.push(this.say(first))
    }
    return beats
  }

  private banter(hand: number): Beat[] {
    const pairs = this.dialogue.banter_pairs
    if (!pairs || hand - this.lastBanterHand < 6 || hand - this.lastOptionalHand < 1) return []
    const exchanges = Object.values(pairs).flatMap((p) => p.exchanges)
    const usable = (x: Line[]) =>
      x.length > 0 && !x.some((l) => this.used.has(l.id)) && x.every((l) => this.canSpeak(l.speaker))

    // The pair who just contested a pot, heads-up, with the player out of it.
    const live = [...this.h.ids.keys()].filter(
      (i) => this.h.ids[i] && !this.h.folded.has(i) && this.h.deltas.has(i),
    )
    let pool: Line[][] = []
    if (live.length === 2 && !live.includes(HUMAN)) {
      const [a, b] = live.map((i) => this.h.ids[i]!)
      pool = exchanges.filter((x) => usable(x) &&
        x.some((l) => l.speaker === a) && x.some((l) => l.speaker === b))
    }
    // A long quiet spell lets any pair at the table speak up.
    if (!pool.length && hand - this.lastBanterHand >= 14) pool = exchanges.filter(usable)
    if (!pool.length) return []
    const x = pool[Math.floor(this.rng() * pool.length)]
    this.lastBanterHand = hand
    this.lastOptionalHand = hand
    return x.map((l) => this.say(l))
  }

  /**
   * Death noticing the player taking a long time. Wall-clock driven, so it is
   * PRESENTATION ONLY: it draws from Math.random, not the director's stream,
   * and is not remembered in a save. Replaying a game cannot reproduce how
   * long someone once stared at their cards, and must not need to.
   */
  thinkingLong(): Beat | null {
    const pool = (this.dialogue.death_asides ?? []).filter(
      (l) => l.trigger === 'player_thinking_long' && !this.used.has(l.id),
    )
    if (!pool.length) return null
    const l = pool[Math.floor(Math.random() * pool.length)]
    return {
      kind: 'line',
      id: l.id,
      speaker: l.speaker,
      text: fillLine(l.text, this.dialogue.earned_names, this.playerName),
      stage: false,
    }
  }

  private partialFacts(): TableFacts {
    return {
      table: this.table.id,
      mode: this.mode,
      won: false,
      hands: this.handNo,
      minStackBB: Number.isFinite(this.minStackBB) ? this.minStackBB : 0,
      neverBelowStart: this.neverBelowStart,
      missed: [],
      respectTier: this.tier,
    }
  }

  /**
   * The sitting is over. Returns the closing words and the table-level facts
   * for marks and the permanent record.
   */
  finish(won: boolean, hands: number, missed: string[]): { beats: Beat[]; facts: TableFacts } {
    const beats: Beat[] = []
    if (won && this.mode === 'tour') {
      if (this.tier < 3) {
        this.points = Math.max(this.points, RESPECT_THRESHOLDS[3])
        beats.push(...this.flipRespect())
      }
      const champ = this.table.champion
      const defeat = this.dialogue.champion_defeat ?? []
      if (champ && missed.includes(champ)) {
        // The champion never sat down. His exit line, then Death's count.
        for (const l of this.dialogue.champion_missed ?? []) beats.push(this.say(l))
        for (const l of defeat.filter((x) => x.speaker === 'death')) beats.push(this.say(l))
      } else if (champ) {
        for (const l of defeat) beats.push(this.say(l))
      } else {
        // A table of champions: the one you beat last concedes for them all.
        const last = this.eliminationOrder[this.eliminationOrder.length - 1]
        const own = defeat.find((l) => l.speaker === last)
        if (own) beats.push(this.say(own))
        for (const l of defeat.filter((x) => x.speaker === 'death')) beats.push(this.say(l))
      }
    }
    const facts: TableFacts = { ...this.partialFacts(), won, hands, missed }
    for (const id of marksForTable(facts, this.earned)) {
      this.earned.add(id)
      beats.push({ kind: 'mark', id })
    }
    return { beats, facts }
  }
}
