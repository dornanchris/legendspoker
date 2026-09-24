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
import caesar from '../data/characters/caesar.json'
import nemo from '../data/characters/nemo.json'
import javert from '../data/characters/javert.json'
import alice from '../data/characters/alice.json'
import sherlock from '../data/characters/sherlock.json'
import vanHelsing from '../data/characters/van_helsing.json'
import monster from '../data/characters/monster.json'
import wolfMan from '../data/characters/wolf_man.json'
import headlessHorseman from '../data/characters/headless_horseman.json'
import dracula from '../data/characters/dracula.json'
import greyAlien from '../data/characters/grey_alien.json'
import martian from '../data/characters/martian.json'
import robot from '../data/characters/robot.json'
import astronaut from '../data/characters/astronaut.json'
import theAi from '../data/characters/the_ai.json'
import death from '../data/characters/death.json'

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
import dDealer from '../data/dialogue/dealer.json'

import marksData from '../data/marks.json'
import storyData from '../data/story.json'

// ---------------------------------------------------------------- types

export type Dials = {
  aggression: number
  tightness: number
  bluffFrequency: number
  tiltSensitivity: number
  adaptivity: number
  noise: number
}

export type CharacterData = {
  id: string
  name: string
  /** Nameplate at the table. */
  short: string
  epithet: string
  pronoun: 'he' | 'she' | 'it' | 'they'
  table: string
  role: 'seat' | 'champion' | 'dealer'
  /** A late arrival: kept out of the ledger until met, so it stays a surprise. */
  arrives: boolean
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
}

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
  kind: 'tour' | 'champions' | 'finale'
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
}

export type DialogueData = {
  table: string
  earned_names?: { tier_1?: string; tier_3?: string }
  table_intro?: Line[]
  dealer_plant?: Line[]
  banter_pairs?: Record<string, { relationship?: string; exchanges: Line[][] }>
  player_directed?: Record<string, Line[]>
  death_asides?: Line[]
  champion_arrival?: Line[]
  champion_missed?: Line[]
  champion_headsup?: Line[]
  eliminated?: Record<string, Line[]>
  player_busted?: Line[]
  champion_defeat?: Line[]
  reads_you?: Line[]
  rematch_ladder?: Record<string, Line[]>
}

export type DealerLines = Record<string, Line[]>

export type MarkCondition = { type: string } & Record<string, any>

export type MarkData = {
  id: string
  title: string
  /** Death's ledger line once earned. */
  text: string
  /** Shown while unearned. Hidden marks show nothing but a blank line. */
  hint: string
  hidden?: boolean
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
  spartacus, pope, cerberus, caesar,
  nemo, javert, alice, sherlock,
  vanHelsing, monster, wolfMan, headlessHorseman, dracula,
  greyAlien, martian, robot, astronaut, theAi,
  death,
] as unknown as CharacterData[]

const tableList = [
  tWhiteHouse, tAthens, tPirateCove, tCamelot, tRome, tBakerStreet,
  tTransylvania, tStation, tChampions1, tChampions2, tFinale,
] as unknown as TableData[]

const dialogueList = [
  dWhiteHouse, dAthens, dPirateCove, dCamelot, dRome, dBakerStreet,
  dTransylvania, dStation, dChampions1, dChampions2, dFinale,
] as unknown as DialogueData[]

export const CHARACTERS: Record<string, CharacterData> = Object.fromEntries(
  characterList.map((c) => [c.id, c]),
)

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

/** The roster the player can beat: everyone except the dealer. */
export const ROSTER = characterList.filter((c) => c.role !== 'dealer')

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

/** Every character who can sit at a table, arrivals included. */
export function fullCast(table: TableData): string[] {
  const cast = [...table.seats]
  if (table.arrival && !cast.includes(table.arrival.character)) cast.push(table.arrival.character)
  return cast
}
