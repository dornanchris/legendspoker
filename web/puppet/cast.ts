import type { RigData } from './rig.js'
import type { ClipData } from './clip.js'
import type { FaceConfig } from './face.js'
import lincolnRig from '../art/lincoln/rig.json'
import lincolnAnim from '../art/lincoln/anim.json'

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
}

export type CastEntry = { rig: RigData; anim: AnimData; base: string }

export const PUPPETS: Record<string, CastEntry> = {
  lincoln: { rig: lincolnRig as unknown as RigData, anim: lincolnAnim as unknown as AnimData, base: 'art/lincoln/' },
}
