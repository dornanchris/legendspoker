/**
 * Everything content-shaped, loaded from data/ and typed.
 *
 * Characters, tables, dialogue and the ledger's marks are DATA (BUILD-PLAN
 * section 7). This file is the only place that knows where they live, and
 * the only place that turns a character file into a Personality the engine
 * can seat. Adding character #37 is a JSON file plus one import line here.
 *
 * The imports are explicit on purpose: the web build bundles them, so the
 * game still opens straight from disk with no server and no fetch.
 */
import type { Personality, Tell } from './personality.js'
import type { Arrival } from './game.js'
import type { Banishment } from './game.js'
import { buildQuirks, type QuirkSpec } from './quirks.js'

import lincoln from '../data/characters/lincoln.json'
import roosevelt from '../data/characters/roosevelt.json'
import fdr from '../data/characters/fdr.json'
import washington from '../data/characters/washington.json'
import socrates from '../data/characters/socrates.json'
import leonidas from '../data/characters/leonidas.json'
import medusa from '../data/characters/medusa.json'
import cyclops from '../data/characters/cyclops.json'
import odysseus from '../data/characters/odysseus.json'
import kidd from '../data/characters/kidd.json'
import silver from '../data/characters/silver.json'
import davyJones from '../data/characters/davy_jones.json'
import blackbeard from '../data/characters/blackbeard.json'
import merlin from '../data/characters/merlin.json'
import lancelot from '../data/characters/lancelot.json'
import greenKnight from '../data/characters/green_knight.json'
import arthur from '../data/characters/arthur.json'
import spartacus from '../data/characters/spartacus.json'
import pope from '../data/characters/pope.json'
import cerberus from '../data/characters/cerberus.json'
import scipio from '../data/characters/scipio.json'
import caesar from '../data/characters/caesar.json'
import nemo from '../data/characters/nemo.json'
import javert from '../data/characters/javert.json'
import cheshire_cat from '../data/characters/cheshire_cat.json'
import sherlock from '../data/characters/sherlock.json'
import vanHelsing from '../data/characters/van_helsing.json'
import jekyll from '../data/characters/jekyll.json'
import hyde from '../data/characters/hyde.json'
import wolfMan from '../data/characters/wolf_man.json'
import headlessHorseman from '../data/characters/headless_horseman.json'
import dracula from '../data/characters/dracula.json'
import greyAlien from '../data/characters/grey_alien.json'
import martian from '../data/characters/martian.json'
import robot from '../data/characters/robot.json'
import astronaut from '../data/characters/astronaut.json'
import theAi from '../data/characters/the_ai.json'
import death from '../data/characters/death.json'
import loki from '../data/characters/loki.json'
import jfk from '../data/characters/jfk.json'
import phoenix from '../data/characters/phoenix.json'

import tWhiteHouse from '../data/tables/white_house.json'
import tAthens from '../data/tables/athens.json'
import tPirateCove from '../data/tables/pirate_cove.json'
import tCamelot from '../data/tables/camelot.json'
import tRome from '../data/tables/rome.json'
import tBakerStreet from '../data/tables/baker_street.json'
import tTransylvania from '../data/tables/transylvania.json'
import tStation from '../data/tables/station.json'
import tChampions1 from '../data/tables/champions_1.json'
import tChampions2 from '../data/tables/champions_2.json'
import tFinale from '../data/tables/finale.json'
import tPyre from '../data/tables/pyre.json'

import dWhiteHouse from '../data/dialogue/table-01-white-house.json'
import dAthens from '../data/dialogue/table-02-athens.json'
import dPirateCove from '../data/dialogue/table-03-pirate-cove.json'
import dCamelot from '../data/dialogue/table-04-camelot.json'
import dRome from '../data/dialogue/table-05-rome.json'
import dBakerStreet from '../data/dialogue/table-06-baker-street.json'
import dTransylvania from '../data/dialogue/table-07-transylvania.json'
import dStation from '../data/dialogue/table-08-station.json'
import dChampions1 from '../data/dialogue/table-09-champions-1.json'
import dChampions2 from '../data/dialogue/table-10-champions-2.json'
import dFinale from '../data/dialogue/table-11-finale.json'
import dPyre from '../data/dialogue/table-12-pyre.json'
import dDealer from '../data/dialogue/dealer.json'
import dUninvited from '../data/dialogue/uninvited.json'

import marksData from '../data/marks.json'
import storyData from '../data/story.json'

// ---------------------------------------------------------------- types

export type Dials = {
  aggression: number
  tightness: number
  bluffFrequency: number
  tiltSensitivity: number
  adaptivity: number
  /** How far they believe a bet: low is a calling station. */
  betRespect: number
  /** Execution, not style: see Personality.skill. */
  skill: number
  noise: number
}

export type CharacterData = {
  id: string
  name: string
  /** Nameplate at the table. */
  short: string
  epithet: string
  pronoun: 'he' | 'she' | 'it' | 'they'
  /** null only for a guest, who belongs to no table. */
  table: string | null
  /**
   * 'guest' is someone the Invitational never invited: on no table, not in
   * the ROSTER, and invisible everywhere until met. See UninvitedData.
   */
  role: 'seat' | 'champion' | 'dealer' | 'guest'
  /** A late arrival: kept out of the ledger until met, so it stays a surprise. */
  arrives: boolean
  /** Comes back after being knocked out. See ReturnData. */
  returns?: ReturnData
  /** One chair, two men: see OtherData. */
  other?: OtherData
  /** His other looks, each a player of his own at an open table: see LookData. */
  looks?: LookData[]
  /** On a second look's entry only (SECOND_LOOKS): whose look it is, and the mark that unlocks it. */
  lookOf?: { id: string; mark: string }
  /**
   * A guest is unlocked (dealt in at open tables) once MET -- unless this
   * says 'beaten': the Phoenix has to be beaten, heads up, at the end of its
   * gauntlet (tour.ts).
   */
  unlockedBy?: 'met' | 'beaten'
  origin: string
  era: string
  dials: Dials
  quirks: QuirkSpec[]
  tells: Tell[]
  idles: string[]
  profile: {
    ledger: string
    ledger_beaten: string
    history: string[]
    at_the_table: string
    look: string
    prop: string
    public_domain: string
  }
  /**
   * What they say as they act -- "Raise.", "Too rich for my blood." -- keyed
   * by the PUBLIC action. Chosen from public information only (src/chatter.ts)
   * and never allowed to claim or deny strength. A line wholly in [brackets]
   * is a stage direction: a gesture, for those who do not speak.
   */
  callouts?: Callouts
}

/**
 * Another look of someone, seated as a player of his own at an open table
 * (the owner: two Green Knights at one table, helmed and bare, and Holmes
 * with and without his deerstalker). The same man -- dials, quirks, tells,
 * callouts -- under the look's id, which is its puppet's (web/art/<id>/), with
 * a nameplate of his own so the two can be told apart, open to pick once the
 * mark is in the ledger. Never on the ROSTER, never in a table's seats: the
 * ledger records him as the one he is a look of (ledgerId).
 */
export type LookData = { id: string; short: string; epithet: string; mark: string }

/**
 * A character who comes BACK after being knocked out: the Green Knight took
 * the first blow at Camelot and rides in again for his own. They retake their
 * old chair this many hands after they fell, if the table is still going.
 * It travels with the character, so it happens at any table they sit at.
 */
export type ReturnData = {
  afterHands: number
  stack: 'average' | number
  /** The scene: one line per speaker, in the order the speakers first appear. */
  lines: Line[]
}

/**
 * Two men in one chair (Jekyll and Hyde). Wherever this character is dealt
 * into a table's seats, each sitting seats him OR `character`, 50/50 from
 * the sitting's seed (sittingSeats). Once the one dealt in is knocked out,
 * the other walks back in to an empty chair when the player wins a pot
 * holding the same two ranks as the hand that knocked him out -- at a tour
 * table, only after its late champion has sat down. Both characters carry
 * an `other` naming each other; `lines` is the scene when THIS one's other
 * half comes back.
 */
export type OtherData = {
  character: string
  stack: 'average' | number
  lines: Line[]
}

/** The public actions a callout can answer. all_in is any action that empties the stack. */
export type CalloutAction = 'fold' | 'check' | 'call' | 'bet' | 'raise' | 'all_in'
/** Said after a showdown, when the cards are face up: taking the pot, or losing it. */
export type ShowdownPool = 'win' | 'lose'
/** The winning hand's name, as a showdown pool's suffix: `lose_flush` is said on losing to a flush. */
export type HandName =
  | 'high_card' | 'pair' | 'two_pair' | 'three_of_a_kind' | 'straight'
  | 'flush' | 'full_house' | 'four_of_a_kind' | 'straight_flush' | 'royal_flush'
export type HandPool = `${ShowdownPool}_${HandName}`
/** Said calling or raising when one's own bet or raise has just been raised over. */
export type ReraisedPool = 'reraised'
/** Said by the winner of a showdown when this character showed and lost to them: `beat_cyclops`. */
export type BeatPool = `beat_${string}`
export type Callouts = Partial<Record<CalloutAction | ReraisedPool | ShowdownPool | HandPool | BeatPool, string[]>>

export type ArrivalData = {
  character: string
  afterEliminations?: number
  afterEliminationOf?: string
  delayHands: number
  stack: 'average' | number
  /**
   * Present and speaking before they sit down: the station's intelligence is
   * the room itself from hand one, so it may talk and banter while it waits.
   * A champion who is merely late (Odysseus), or who watches in silence
   * (Dracula by the fire), is not.
   */
  watching?: boolean
}

export type TableData = {
  id: string
  /** 'hidden' is the Phoenix's table: off the map until its gauntlet opens it. */
  kind: 'tour' | 'champions' | 'finale' | 'hidden'
  /** Order on the tour: 1-8 the story tables, 9-10 champions, 11 the finale. */
  position: number
  name: string
  seats: string[]
  champion: string | null
  arrival: ArrivalData | null
  handsPerLevel: number
  dialogue: string
  buyIn: number
  respectStart: number
  place: string
  region: string
  era: string
  teaser: string
  hook: string
  room: string
  music: string
  entrance: string
  ambience: string[]
  /** Shown at the table before a late champion arrives. */
  presence: string | null
  /**
   * The legibility curve's first steps: the chance, after a showdown, that
   * Death points out a tell that told the truth that hand (dealer.json
   * `lessons`). The first tables only; absent means never.
   */
  lessons?: number
  /**
   * A hidden visitor: someone the table never seats who walks in when the
   * player wins a pot holding `holeRanks` while a chair stands empty (JFK at
   * the White House, for a three and a five: the thirty-fifth president).
   * The character is a guest, invisible until met; tour and open alike.
   */
  visitor?: { character: string; holeRanks: string[]; stack: 'average' | number }
}

export type Line = {
  id: string
  speaker: string
  text: string
  trigger?: string
  foreshadow?: string
  note?: string
  type?: string
  sequence?: string
  /** reads_you only: the observed behaviour this line describes. */
  when?: string
  /** needles only, on an exchange's first line: the tablemate being needled. */
  to?: string
  /** dealer lessons only: what the tell being pointed out turned out to mean. */
  correlate?: 'strong' | 'weak' | 'bluffing' | 'tilted'
}

export type DialogueData = {
  table: string
  earned_names?: { tier_1?: string; tier_3?: string }
  table_intro?: Line[]
  dealer_plant?: Line[]
  banter_pairs?: Record<string, {
    relationship?: string
    exchanges: Line[][]
    /**
     * Old friends, needling. An exchange fires after a hand in which its first
     * speaker took the pot and its `to` folded to that speaker's bet or raise:
     * public facts only, said between hands. Only pairs with a relationship
     * have them, which is what keeps them from becoming "nice hand".
     */
    needles?: Line[][]
  }>
  player_directed?: Record<string, Line[]>
  death_asides?: Line[]
  champion_arrival?: Line[]
  /** The hidden visitor's entrance (TableData.visitor), played in order. */
  visitor_arrival?: Line[]
  champion_missed?: Line[]
  champion_headsup?: Line[]
  eliminated?: Record<string, Line[]>
  player_busted?: Line[]
  champion_defeat?: Line[]
  reads_you?: Line[]
  rematch_ladder?: Record<string, Line[]>
}

export type DealerLines = Record<string, Line[]>

/**
 * A tell or idle in words, as the seat shows it. Most read after the name
 * ("Lincoln strokes his beard"); some are about something else and read on
 * their own -- "Medusa the snakes in her hair go still" does not. The ledger
 * keeps the words as written.
 */
const STANDS_ALONE = /^(a|an|all|each|every|he|her|his|it|its|nothing|one|sea|she|something|somewhere|the|their|there|they|three|two)\b/i
export function tellLine(name: string, text: string): string {
  return STANDS_ALONE.test(text) ? text[0].toUpperCase() + text.slice(1) : `${name} ${text}`
}

/**
 * The uninvited guest's script: data/dialogue/uninvited.json. Win a pot
 * holding the trigger ranks and one opponent says something the house does
 * not allow, the dealer removes them, and the guest takes the chair. The
 * engine half is Banishment (game.ts); this is what the room says about it.
 *
 * Speakers are 'death', 'narration', the guest's id, and -- in the two
 * offence pools only -- 'banished', which stands for whoever is shown out.
 */
export type UninvitedData = {
  /** Character id of the guest (role 'guest'). */
  guest: string
  trigger: { hole_ranks: string[] }
  /** Said first when the pot was won uncontested: the table has to SEE the cards. */
  reveal: Line[]
  /** One of these, from the player about to be removed. */
  offence: Line[]
  /** ...or one of these, if the table only ever gives them stage directions. */
  offence_mimed: Line[]
  /** One of these, from Death. */
  banishment: Line[]
  /** Played in order once the guest is seated. */
  entrance: Line[]
  /** Exchanges spread over the rest of the sitting, in order. */
  sitting: Line[][]
  /** When the guest is knocked out. */
  busted: Line[]
  /** When the table ends with the guest having sat at it. */
  farewell_won: Line[]
  farewell_lost: Line[]
}

export type MarkCondition = { type: string } & Record<string, any>

export type MarkData = {
  id: string
  title: string
  /** Death's ledger line once earned. */
  text: string
  /** Shown while unearned. Hidden marks show nothing but a blank line. */
  hint: string
  hidden?: boolean
  /**
   * Stronger than hidden: until it is earned the Ledger does not list it at
   * all and does not count it in its total, so nothing gives away that it
   * exists. Once earned it reads like any other entry.
   */
  secret?: boolean
  when: MarkCondition
}

export type StoryData = {
  invitation: {
    heading: string
    body: string[]
    signature: string
    sign_prompt: string
    accept: string
  }
  ending: { title: string; paragraphs: string[] }
  epigraph: string
}

// ---------------------------------------------------------------- registries

const characterList = [
  lincoln, roosevelt, fdr, washington,
  socrates, leonidas, medusa, cyclops, odysseus,
  kidd, silver, davyJones, blackbeard,
  merlin, lancelot, greenKnight, arthur,
  spartacus, pope, cerberus, scipio, caesar,
  nemo, javert, cheshire_cat, sherlock,
  vanHelsing, jekyll, hyde, wolfMan, headlessHorseman, dracula,
  greyAlien, martian, robot, astronaut, theAi,
  death,
  loki, jfk, phoenix,
] as unknown as CharacterData[]

const tableList = [
  tWhiteHouse, tAthens, tPirateCove, tCamelot, tRome, tBakerStreet,
  tTransylvania, tStation, tChampions1, tChampions2, tFinale, tPyre,
] as unknown as TableData[]

const dialogueList = [
  dWhiteHouse, dAthens, dPirateCove, dCamelot, dRome, dBakerStreet,
  dTransylvania, dStation, dChampions1, dChampions2, dFinale, dPyre,
] as unknown as DialogueData[]

/**
 * The second looks as players (LookData): a copy of the one they are a look
 * of, without his comings and goings (no return, no other half, no late
 * arrival) -- at an open table he simply sits down.
 */
export const SECOND_LOOKS: CharacterData[] = characterList.flatMap((c) => (c.looks ?? []).map((l) => ({
  ...c, id: l.id, short: l.short, epithet: l.epithet, lookOf: { id: c.id, mark: l.mark },
  looks: undefined, returns: undefined, other: undefined, arrives: false,
})))

export const CHARACTERS: Record<string, CharacterData> = Object.fromEntries(
  [...characterList, ...SECOND_LOOKS].map((c) => [c.id, c]),
)

/** Whose record (the ledger's page) someone's play is kept on: a second look's is the one he is a look of. */
export function ledgerId(id: string): string {
  return CHARACTERS[id]?.lookOf?.id ?? id
}

/** Every table in tour order. */
export const TABLES: TableData[] = [...tableList].sort((a, b) => a.position - b.position)

export const TABLE_BY_ID: Record<string, TableData> = Object.fromEntries(
  TABLES.map((t) => [t.id, t]),
)

export const DIALOGUE: Record<string, DialogueData> = Object.fromEntries(
  dialogueList.map((d) => [d.table, d]),
)

export const DEALER = dDealer as unknown as DealerLines
export const MARKS = marksData as unknown as MarkData[]
export const STORY = storyData as unknown as StoryData

/** The eight story tables, in order. */
export const TOUR = TABLES.filter((t) => t.kind === 'tour')

/**
 * The roster the player can beat: everyone invited, except the dealer. A
 * guest is not on it, so counting it can never give one away.
 */
export const ROSTER = characterList.filter((c) => c.role !== 'dealer' && c.role !== 'guest')

/** Characters nobody invited. Kept out of every list until met. */
export const GUESTS = characterList.filter((c) => c.role === 'guest')

export const UNINVITED = dUninvited as unknown as UninvitedData

// ---------------------------------------------------------------- personalities

const personalityCache = new Map<string, Personality>()

/**
 * The engine's view of a character. Built once per id: quirks are closures,
 * but they close over nothing but their own parameters, so sharing one
 * Personality between tables is safe.
 */
export function personality(id: string): Personality {
  const cached = personalityCache.get(id)
  if (cached) return cached
  const c = CHARACTERS[id]
  if (!c) throw new Error(`no character "${id}"`)
  const p: Personality = {
    id: c.id,
    name: c.short,
    ...c.dials,
    quirks: buildQuirks(c.quirks),
    tells: c.tells,
    idles: c.idles,
  }
  personalityCache.set(id, p)
  return p
}

/** Who opens a table: its seated cast, in chair order. */
export function openingCast(table: TableData): string[] {
  return [...table.seats]
}

/** Everyone who may speak at a table: its full cast, the other halves of its seats, plus a hidden visitor. */
export function tableSpeakers(table: TableData): string[] {
  const cast = fullCast(table)
  for (const id of [...cast]) {
    const o = CHARACTERS[id]?.other?.character
    if (o && !cast.includes(o)) cast.push(o)
  }
  return table.visitor ? [...cast, table.visitor.character] : cast
}

/**
 * The chairs as one sitting deals them: anyone with an `other` is that man
 * or his other half, 50/50, decided by the sitting's seed so a resumed seat
 * (which keeps the seats it was dealt) and a check run agree. A list that
 * already holds both halves (it never should: openTableCast deals one) keeps
 * them apart by flipping the second.
 */
export function sittingSeats(seats: string[], seed: number): string[] {
  const out: string[] = []
  seats.forEach((id, i) => {
    const o = CHARACTERS[id]?.other?.character
    let pick = id
    if (o) {
      let x = (seed ^ Math.imul(i + 1, 0x9e3779b1)) >>> 0
      x = Math.imul(x ^ (x >>> 16), 0x45d9f3b) >>> 0
      pick = ((x ^ (x >>> 16)) & 1) ? o : id
      if (out.includes(pick)) pick = pick === id ? o : id
    }
    out.push(pick)
  })
  return out
}

/** Every character who can sit at a table, arrivals included. */
export function fullCast(table: TableData): string[] {
  const cast = [...table.seats]
  if (table.arrival && !cast.includes(table.arrival.character)) cast.push(table.arrival.character)
  return cast
}

/**
 * The late-arrival rules for one sitting: a tour table's own champion
 * arrival, plus a return for anyone seated whose data says they come back.
 * Returns are configuration keyed by ids in data, like arrivals -- never a
 * branch on identity in the engine.
 */
export function arrivalRules(table: TableData, mode: 'tour' | 'open', seats: string[]): Arrival[] {
  const a = mode === 'tour' ? table.arrival : null
  const rules: Arrival[] = []
  if (a) {
    rules.push({
      personality: personality(a.character),
      afterEliminations: a.afterEliminations,
      afterEliminationOf: a.afterEliminationOf,
      delayHands: a.delayHands,
      stack: a.stack,
    })
  }
  for (const id of a ? [...seats, a.character] : seats) {
    const r = CHARACTERS[id]?.returns
    if (r) rules.push({ personality: personality(id), afterEliminationOf: id, delayHands: r.afterHands, stack: r.stack })
  }
  // The other half of anyone dealt in (Hyde for Jekyll, Jekyll for Hyde).
  for (const id of seats) {
    const o = CHARACTERS[id]?.other
    if (!o || seats.includes(o.character)) continue
    rules.push({
      personality: personality(o.character),
      onHumanWinLike: id,
      afterArrivalOf: a?.character,
      delayHands: 0,
      stack: o.stack,
    })
  }
  const v = table.visitor
  if (v && !seats.includes(v.character)) {
    rules.push({ personality: personality(v.character), onHumanWin: [...v.holeRanks], delayHands: 0, stack: v.stack })
  }
  return rules
}

/**
 * The house rule that lets the uninvited guest in, configured for one table,
 * tour or open. Never at the finale: that is the dealer's own table, and he
 * is the only one at it. The champion and the dealer are never shown out;
 * the engine itself protects anyone a late arrival is waiting on.
 */
export function banishmentFor(table: TableData): Banishment | undefined {
  if (table.kind === 'finale' || table.kind === 'hidden') return undefined
  const exclude = characterList.filter((c) => c.role === 'dealer').map((c) => c.id)
  if (table.champion) exclude.push(table.champion)
  return {
    personality: personality(UNINVITED.guest),
    holeRanks: [...UNINVITED.trigger.hole_ranks],
    exclude,
  }
}
