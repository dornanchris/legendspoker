import type { Accent } from './accent.js'

/**
 * A puppet rig, as art-tools/seat_puppet.py exports it (web/art/<id>/rig.json):
 * bones with pivots, and parts (images) hung on them in their rest pose.
 *
 * Everything is in the rig's own canvas pixels, y down. A part's rest
 * transform is the one the art tools drew it with: flipped, scaled, then
 * rotated about its centre (rot is counter-clockwise, as PIL rotates), centred
 * at (cx, cy). A bone's pose is a change FROM rest, about its pivot, so the
 * rest pose is every bone at zero.
 *
 * Slots are swap groups: at most one part of a slot shows at a time.
 */

export type RigPart = {
  name: string
  bone: string
  img: string
  cx: number
  cy: number
  rot: number
  scale: number
  flip: boolean
  z: number
  slot: string
  visible: boolean
  onTable: boolean
  /** Shown only while this other part is (a face layer: only on the head it was drawn for). */
  with?: string
}

export type RigBone = { name: string; parent: string | null; pivot: [number, number] }

export type RigData = {
  id: string
  name: string
  canvas: { w: number; h: number }
  tableLine: number
  table: string
  bones: RigBone[]
  face: Record<string, string[]>
  parts: RigPart[]
}

/** 2D affine matrix [a, b, c, d, e, f], as canvas setTransform takes it. */
export type Mat = [number, number, number, number, number, number]

export const IDENTITY: Mat = [1, 0, 0, 1, 0, 0]

export function mul(m: Mat, n: Mat): Mat {
  return [
    m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
    m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
  ]
}
export const translate = (x: number, y: number): Mat => [1, 0, 0, 1, x, y]
export const scale = (sx: number, sy: number): Mat => [sx, 0, 0, sy, 0, 0]
/** Clockwise on screen (y down), in degrees. */
export function rotate(deg: number): Mat {
  const r = (deg * Math.PI) / 180
  return [Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0]
}
export const apply = (m: Mat, x: number, y: number): [number, number] =>
  [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]

/** An image as the puppet draws it: as loaded, or tinted onto a canvas (the player's accent). */
export type Pic = HTMLImageElement | HTMLCanvasElement
export const picSize = (p: Pic): [number, number] =>
  p instanceof HTMLCanvasElement ? [p.width, p.height] : [p.naturalWidth, p.naturalHeight]

/** An image with its accent (mask white where the teal is) recoloured: see web/puppet/accent.ts. */
function tint(im: Pic, mask: HTMLImageElement, a: Accent): HTMLCanvasElement {
  const [w, h] = picSize(im)
  const out = document.createElement('canvas')
  out.width = w
  out.height = h
  const g = out.getContext('2d')!
  g.drawImage(im, 0, 0)
  const layer = (fill: string, alpha = 1) => {
    const t = document.createElement('canvas')
    t.width = w
    t.height = h
    const tg = t.getContext('2d')!
    tg.drawImage(mask, 0, 0, w, h)
    tg.globalCompositeOperation = 'source-in'
    tg.fillStyle = fill
    tg.globalAlpha = alpha
    tg.fillRect(0, 0, w, h)
    return t
  }
  g.globalCompositeOperation = 'color'                 // the hue and colour of the accent, the drawing's lightness
  g.drawImage(layer(a.color), 0, 0)
  if (a.lift > 0) {
    g.globalCompositeOperation = 'screen'              // a pale accent on a dark scarf needs lifting
    g.drawImage(layer(a.liftColor ?? '#ffffff', a.lift), 0, 0)
  }
  g.globalCompositeOperation = 'source-over'
  return out
}

export type LoadedRig = RigData & {
  images: Map<string, Pic>
  /** Each part's rest matrix, mapping its image's pixels to canvas pixels. */
  rest: Map<string, Mat>
  bone: Map<string, RigBone>
  /** Bones parents-first, so one pass computes them all. */
  order: RigBone[]
}

/**
 * Load a rig's images from `base` (a URL ending in "/"). With `up`, the
 * images there are that many times smaller than the rig was drawn with
 * (the table's half-size copies, art-tools/web_half.py) and are scaled back
 * up; `table: false` skips the bench's preview table.
 */
export async function loadRig(data: RigData, base: string, opts: { up?: number; table?: boolean; accent?: Accent } = {}): Promise<LoadedRig> {
  const up = opts.up ?? 1
  const images = new Map<string, Pic>()
  const img = (src: string) => new Promise<HTMLImageElement>((ok, fail) => {
    const im = new Image()
    im.onload = () => ok(im)
    im.onerror = () => fail(new Error(`puppet image not found: ${src}`))
    im.src = src
  })
  const load = async (src: string) => {
    if (images.has(src)) return
    images.set(src, await img(base + src))
  }
  await Promise.all([...data.parts.map((p) => load(p.img)), opts.table === false ? null : load(data.table)])
  const a = opts.accent
  if (a) {
    await Promise.all(a.masks.filter((src) => images.has(src)).map(async (src) => {
      images.set(src, tint(images.get(src)!, await img(base + 'accent/' + src), a))
    }))
  }

  const rest = new Map<string, Mat>()
  for (const p of data.parts) {
    const [iw, ih] = picSize(images.get(p.img)!)
    let m = translate(p.cx, p.cy)
    m = mul(m, rotate(-p.rot))                     // PIL's counter-clockwise is canvas's negative
    m = mul(m, scale(p.scale * up * (p.flip ? -1 : 1), p.scale * up))
    m = mul(m, translate(-iw / 2, -ih / 2))
    rest.set(p.name, m)
  }
  const bone = new Map(data.bones.map((b) => [b.name, b]))
  const order: RigBone[] = []
  const seen = new Set<string>()
  const visit = (b: RigBone) => {
    if (seen.has(b.name)) return
    if (b.parent) visit(bone.get(b.parent)!)
    seen.add(b.name)
    order.push(b)
  }
  data.bones.forEach(visit)
  return { ...data, images, rest, bone, order }
}
