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

export type LoadedRig = RigData & {
  images: Map<string, HTMLImageElement>
  /** Each part's rest matrix, mapping its image's pixels to canvas pixels. */
  rest: Map<string, Mat>
  bone: Map<string, RigBone>
  /** Bones parents-first, so one pass computes them all. */
  order: RigBone[]
}

/** Load a rig's images from `base` (a URL ending in "/"). */
export async function loadRig(data: RigData, base: string): Promise<LoadedRig> {
  const images = new Map<string, HTMLImageElement>()
  const load = (src: string) => new Promise<void>((ok, fail) => {
    if (images.has(src)) return ok()
    const im = new Image()
    im.onload = () => ok()
    im.onerror = () => fail(new Error(`puppet image not found: ${base}${src}`))
    im.src = base + src
    images.set(src, im)
  })
  await Promise.all([...data.parts.map((p) => load(p.img)), load(data.table)])

  const rest = new Map<string, Mat>()
  for (const p of data.parts) {
    const im = images.get(p.img)!
    let m = translate(p.cx, p.cy)
    m = mul(m, rotate(-p.rot))                     // PIL's counter-clockwise is canvas's negative
    m = mul(m, scale(p.scale * (p.flip ? -1 : 1), p.scale))
    m = mul(m, translate(-im.naturalWidth / 2, -im.naturalHeight / 2))
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
