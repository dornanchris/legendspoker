import type { IkData } from './ik.js'
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
import washingtonIk from '../art/washington/ik.json'
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
import silverRig from '../art/silver/rig.json'
import silverAnim from '../art/silver/anim.json'
import davyJonesRig from '../art/davy_jones/rig.json'
import davyJonesAnim from '../art/davy_jones/anim.json'
import merlinRig from '../art/merlin/rig.json'
import merlinAnim from '../art/merlin/anim.json'
import lancelotRig from '../art/lancelot/rig.json'
import lancelotAnim from '../art/lancelot/anim.json'
import greenKnightRig from '../art/green_knight/rig.json'
import greenKnightAnim from '../art/green_knight/anim.json'
import greenKnightBareRig from '../art/green_knight_bare/rig.json'
import greenKnightBareAnim from '../art/green_knight_bare/anim.json'
import arthurRig from '../art/arthur/rig.json'
import arthurAnim from '../art/arthur/anim.json'
import cerberusRig from '../art/cerberus/rig.json'
import cerberusAnim from '../art/cerberus/anim.json'
import scipioRig from '../art/scipio/rig.json'
import scipioAnim from '../art/scipio/anim.json'
import spartacusRig from '../art/spartacus/rig.json'
import spartacusAnim from '../art/spartacus/anim.json'
import popeRig from '../art/pope/rig.json'
import popeAnim from '../art/pope/anim.json'
import caesarRig from '../art/caesar/rig.json'
import caesarAnim from '../art/caesar/anim.json'
import nemoRig from '../art/nemo/rig.json'
import nemoAnim from '../art/nemo/anim.json'
import javertRig from '../art/javert/rig.json'
import javertAnim from '../art/javert/anim.json'
import sherlockRig from '../art/sherlock/rig.json'
import sherlockAnim from '../art/sherlock/anim.json'
import sherlockDeerstalkerRig from '../art/sherlock_deerstalker/rig.json'
import sherlockDeerstalkerAnim from '../art/sherlock_deerstalker/anim.json'
import cheshireCatRig from '../art/cheshire_cat/rig.json'
import cheshireCatAnim from '../art/cheshire_cat/anim.json'
import vanHelsingRig from '../art/van_helsing/rig.json'
import vanHelsingAnim from '../art/van_helsing/anim.json'
import wolfManRig from '../art/wolf_man/rig.json'
import wolfManAnim from '../art/wolf_man/anim.json'
import horsemanRig from '../art/headless_horseman/rig.json'
import horsemanAnim from '../art/headless_horseman/anim.json'
import draculaRig from '../art/dracula/rig.json'
import draculaAnim from '../art/dracula/anim.json'
import astronautRig from '../art/astronaut/rig.json'
import astronautAnim from '../art/astronaut/anim.json'
import robotRig from '../art/robot/rig.json'
import robotAnim from '../art/robot/anim.json'
import martianRig from '../art/martian/rig.json'
import martianAnim from '../art/martian/anim.json'
import theAiRig from '../art/the_ai/rig.json'
import theAiAnim from '../art/the_ai/anim.json'
import jekyllRig from '../art/jekyll/rig.json'
import jekyllAnim from '../art/jekyll/anim.json'
import hydeRig from '../art/hyde/rig.json'
import hydeAnim from '../art/hyde/anim.json'
import jfkRig from '../art/jfk/rig.json'
import jfkAnim from '../art/jfk/anim.json'
import lokiRig from '../art/loki/rig.json'
import lokiAnim from '../art/loki/anim.json'
import whiteHouse from '../art/rooms/white_house/room.json'
import athens from '../art/rooms/athens/room.json'
import pirateCove from '../art/rooms/pirate_cove/room.json'
import camelot from '../art/rooms/camelot/room.json'
import rome from '../art/rooms/rome/room.json'
import bakerStreet from '../art/rooms/baker_street/room.json'
import transylvania from '../art/rooms/transylvania/room.json'
import station from '../art/rooms/station/room.json'

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
  /**
   * What a winner plays: `small` for an ordinary pot, `big` for one worth most
   * of the stack they began the hand with (art-tools/build/win_small.py).
   */
  win?: { small: string; big: string }
  /** What a player who lost a contested pot plays: `big` when it was worth more than their stack. */
  lose?: { small: string; big: string }
  /** Clips during which the room's lamp nearest the seat gutters (Davy Jones's flickering lamp). */
  gutter?: string[]
}

/** `ik`: the IK prototype's arm chains (web/puppet/ik.ts), Lincoln only for now. */
export type CastEntry = { rig: RigData; anim: AnimData; base: string; ik?: IkData }

/**
 * Someone who comes back changed (the Green Knight, beaten and bareheaded):
 * the figure the stage seats when they retake their own chair.
 */
export const RETURNED: Record<string, string> = { green_knight: 'green_knight_bare' }

export const PUPPETS: Record<string, CastEntry> = {
  lincoln: { rig: lincolnRig as unknown as RigData, anim: lincolnAnim as unknown as AnimData, base: 'art/lincoln/' },
  washington: { rig: washingtonRig as unknown as RigData, anim: washingtonAnim as unknown as AnimData, base: 'art/washington/', ik: washingtonIk as unknown as IkData },
  fdr: { rig: fdrRig as unknown as RigData, anim: fdrAnim as unknown as AnimData, base: 'art/fdr/' },
  roosevelt: { rig: roosRig as unknown as RigData, anim: roosAnim as unknown as AnimData, base: 'art/roosevelt/' },
  socrates: { rig: socratesRig as unknown as RigData, anim: socratesAnim as unknown as AnimData, base: 'art/socrates/' },
  leonidas: { rig: leonidasRig as unknown as RigData, anim: leonidasAnim as unknown as AnimData, base: 'art/leonidas/' },
  cyclops: { rig: cyclopsRig as unknown as RigData, anim: cyclopsAnim as unknown as AnimData, base: 'art/cyclops/' },
  medusa: { rig: medusaRig as unknown as RigData, anim: medusaAnim as unknown as AnimData, base: 'art/medusa/' },
  odysseus: { rig: odysseusRig as unknown as RigData, anim: odysseusAnim as unknown as AnimData, base: 'art/odysseus/' },
  blackbeard: { rig: blackbeardRig as unknown as RigData, anim: blackbeardAnim as unknown as AnimData, base: 'art/blackbeard/' },
  kidd: { rig: kiddRig as unknown as RigData, anim: kiddAnim as unknown as AnimData, base: 'art/kidd/' },
  silver: { rig: silverRig as unknown as RigData, anim: silverAnim as unknown as AnimData, base: 'art/silver/' },
  davy_jones: { rig: davyJonesRig as unknown as RigData, anim: davyJonesAnim as unknown as AnimData, base: 'art/davy_jones/' },
  merlin: { rig: merlinRig as unknown as RigData, anim: merlinAnim as unknown as AnimData, base: 'art/merlin/' },
  lancelot: { rig: lancelotRig as unknown as RigData, anim: lancelotAnim as unknown as AnimData, base: 'art/lancelot/' },
  green_knight: { rig: greenKnightRig as unknown as RigData, anim: greenKnightAnim as unknown as AnimData, base: 'art/green_knight/' },
  green_knight_bare: { rig: greenKnightBareRig as unknown as RigData, anim: greenKnightBareAnim as unknown as AnimData, base: 'art/green_knight_bare/' },
  arthur: { rig: arthurRig as unknown as RigData, anim: arthurAnim as unknown as AnimData, base: 'art/arthur/' },
  cerberus: { rig: cerberusRig as unknown as RigData, anim: cerberusAnim as unknown as AnimData, base: 'art/cerberus/' },
  scipio: { rig: scipioRig as unknown as RigData, anim: scipioAnim as unknown as AnimData, base: 'art/scipio/' },
  spartacus: { rig: spartacusRig as unknown as RigData, anim: spartacusAnim as unknown as AnimData, base: 'art/spartacus/' },
  pope: { rig: popeRig as unknown as RigData, anim: popeAnim as unknown as AnimData, base: 'art/pope/' },
  caesar: { rig: caesarRig as unknown as RigData, anim: caesarAnim as unknown as AnimData, base: 'art/caesar/' },
  nemo: { rig: nemoRig as unknown as RigData, anim: nemoAnim as unknown as AnimData, base: 'art/nemo/' },
  javert: { rig: javertRig as unknown as RigData, anim: javertAnim as unknown as AnimData, base: 'art/javert/' },
  sherlock: { rig: sherlockRig as unknown as RigData, anim: sherlockAnim as unknown as AnimData, base: 'art/sherlock/' },
  sherlock_deerstalker: { rig: sherlockDeerstalkerRig as unknown as RigData, anim: sherlockDeerstalkerAnim as unknown as AnimData, base: 'art/sherlock_deerstalker/' },
  cheshire_cat: { rig: cheshireCatRig as unknown as RigData, anim: cheshireCatAnim as unknown as AnimData, base: 'art/cheshire_cat/' },
  van_helsing: { rig: vanHelsingRig as unknown as RigData, anim: vanHelsingAnim as unknown as AnimData, base: 'art/van_helsing/' },
  jekyll: { rig: jekyllRig as unknown as RigData, anim: jekyllAnim as unknown as AnimData, base: 'art/jekyll/' },
  hyde: { rig: hydeRig as unknown as RigData, anim: hydeAnim as unknown as AnimData, base: 'art/hyde/' },
  wolf_man: { rig: wolfManRig as unknown as RigData, anim: wolfManAnim as unknown as AnimData, base: 'art/wolf_man/' },
  headless_horseman: { rig: horsemanRig as unknown as RigData, anim: horsemanAnim as unknown as AnimData, base: 'art/headless_horseman/' },
  dracula: { rig: draculaRig as unknown as RigData, anim: draculaAnim as unknown as AnimData, base: 'art/dracula/' },
  astronaut: { rig: astronautRig as unknown as RigData, anim: astronautAnim as unknown as AnimData, base: 'art/astronaut/' },
  robot: { rig: robotRig as unknown as RigData, anim: robotAnim as unknown as AnimData, base: 'art/robot/' },
  martian: { rig: martianRig as unknown as RigData, anim: martianAnim as unknown as AnimData, base: 'art/martian/' },
  the_ai: { rig: theAiRig as unknown as RigData, anim: theAiAnim as unknown as AnimData, base: 'art/the_ai/' },
  // the hidden guests: either may sit in any chair, at any table
  jfk: { rig: jfkRig as unknown as RigData, anim: jfkAnim as unknown as AnimData, base: 'art/jfk/' },
  loki: { rig: lokiRig as unknown as RigData, anim: lokiAnim as unknown as AnimData, base: 'art/loki/' },
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
  /** The same room once the late champion has come (the Station's turn), drawn in its place. */
  backdropAfter?: string
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
  camelot: { data: camelot as unknown as RoomData, base: 'art/rooms/camelot/' },
  rome: { data: rome as unknown as RoomData, base: 'art/rooms/rome/' },
  baker_street: { data: bakerStreet as unknown as RoomData, base: 'art/rooms/baker_street/' },
  transylvania: { data: transylvania as unknown as RoomData, base: 'art/rooms/transylvania/' },
  station: { data: station as unknown as RoomData, base: 'art/rooms/station/' },
}
