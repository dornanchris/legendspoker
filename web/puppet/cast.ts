import type { RigData } from './rig.js'
import type { ClipData } from './clip.js'
import type { FaceConfig } from './face.js'
import lincolnRig from '../art/lincoln/rig.json'
import lincolnAnim from '../art/lincoln/anim.json'
import washingtonRig from '../art/washington/rig.json'
import fdrRig from '../art/fdr/rig.json'
import fdrAnim from '../art/fdr/anim.json'
import roosRig from '../art/roosevelt/rig.json'
import roosAnim from '../art/roosevelt/anim.json'
import deathRig from '../art/death/rig.json'
import deathAnim from '../art/death/anim.json'
import washingtonAnim from '../art/washington/anim.json'
import socratesRig from '../art/socrates/rig.json'
import socratesAnim from '../art/socrates/anim.json'
import leonidasRig from '../art/leonidas/rig.json'
import leonidasAnim from '../art/leonidas/anim.json'
import cyclopsRig from '../art/cyclops/rig.json'
import cyclopsAnim from '../art/cyclops/anim.json'
import medusaRig from '../art/medusa/rig.json'
import medusaAnim from '../art/medusa/anim.json'
import odysseusRig from '../art/odysseus/rig.json'
import odysseusAnim from '../art/odysseus/anim.json'
import blackbeardRig from '../art/blackbeard/rig.json'
import blackbeardAnim from '../art/blackbeard/anim.json'
import kiddRig from '../art/kidd/rig.json'
import kiddAnim from '../art/kidd/anim.json'
import whiteHouse from '../art/rooms/white_house/room.json'
import athens from '../art/rooms/athens/room.json'
import pirateCove from '../art/rooms/pirate_cove/room.json'

/**
 * The puppets the web build knows: each one's rig (generated) and its anim
 * file (authored), imported explicitly, as src/content.ts does with data, so
 * the bundle still opens from file://. Images load from `base`, relative to
 * index.html.
 */

export type AnimData = {
  face: FaceConfig
  clips: Record<string, ClipData>
  reference?: Record<string, string>
  /**
   * The clip that acts out a line of the character's tells and idles
   * (data/characters/<id>.json), keyed by its words: the table screen plays it
   * whenever those words are shown, real tell or ambient noise alike, so the
   * figure never says more than the text does. check:data holds the keys to
   * the character's words.
   */
  cues?: Record<string, string>
  /** Clips with no words: fidgets and the decoys drawn beside each tell, played as ambient noise. */
  fidgets?: string[]
}

export type CastEntry = { rig: RigData; anim: AnimData; base: string }

export const PUPPETS: Record<string, CastEntry> = {
  lincoln: { rig: lincolnRig as unknown as RigData, anim: lincolnAnim as unknown as AnimData, base: 'art/lincoln/' },
  washington: { rig: washingtonRig as unknown as RigData, anim: washingtonAnim as unknown as AnimData, base: 'art/washington/' },
  fdr: { rig: fdrRig as unknown as RigData, anim: fdrAnim as unknown as AnimData, base: 'art/fdr/' },
  roosevelt: { rig: roosRig as unknown as RigData, anim: roosAnim as unknown as AnimData, base: 'art/roosevelt/' },
  socrates: { rig: socratesRig as unknown as RigData, anim: socratesAnim as unknown as AnimData, base: 'art/socrates/' },
  leonidas: { rig: leonidasRig as unknown as RigData, anim: leonidasAnim as unknown as AnimData, base: 'art/leonidas/' },
  cyclops: { rig: cyclopsRig as unknown as RigData, anim: cyclopsAnim as unknown as AnimData, base: 'art/cyclops/' },
  medusa: { rig: medusaRig as unknown as RigData, anim: medusaAnim as unknown as AnimData, base: 'art/medusa/' },
  odysseus: { rig: odysseusRig as unknown as RigData, anim: odysseusAnim as unknown as AnimData, base: 'art/odysseus/' },
  blackbeard: { rig: blackbeardRig as unknown as RigData, anim: blackbeardAnim as unknown as AnimData, base: 'art/blackbeard/' },
  kidd: { rig: kiddRig as unknown as RigData, anim: kiddAnim as unknown as AnimData, base: 'art/kidd/' },
  death: { rig: deathRig as unknown as RigData, anim: deathAnim as unknown as AnimData, base: 'art/death/' },
}

/**
 * A room the table screen can stage: its backdrop and table, and where the
 * chairs are (art-tools/room_web.py writes room.json). Keyed by table id.
 */
export type RoomData = {
  id: string
  design: [number, number]
  /** Design px of ceiling a short screen may lose off the top. */
  crop: number
  backdrop: { img: string; w: number; h: number }
  table: { img: string; x: number; y: number; w: number; h: number }
  rim: { x0: number; step: number; y: (number | null)[] }
  /** By the number of opponents: [centre x, scale, sink] for seat 1, 2, ... */
  seats: Record<string, [number, number, number][]>
  dealer: [number, number, number]
  deck: [number, number]
  /** Loose pieces of the room: placed ones have a centre x, a foot and a height (design px). */
  pieces?: Record<string, { img: string; aspect: number; x?: number; bottom?: number; h?: number }>
  /** The piece standing in the room until the late champion arrives, and the one after. */
  presence?: { before?: string; after?: string } | null
  /** Frames cycled at each spot ([centre x, foot, height]): lamp flames. */
  loops?: { frames: string[]; every: [number, number]; spots: [number, number, number][] }[]
}

export type RoomEntry = { data: RoomData; base: string }

export const ROOMS: Record<string, RoomEntry> = {
  white_house: { data: whiteHouse as unknown as RoomData, base: 'art/rooms/white_house/' },
  athens: { data: athens as unknown as RoomData, base: 'art/rooms/athens/' },
  pirate_cove: { data: pirateCove as unknown as RoomData, base: 'art/rooms/pirate_cove/' },
}
