import { type LoadedRig, type Mat, IDENTITY, mul, translate, rotate, scale } from './rig.js'
import { type ClipData, type Channel, sample, swapAt } from './clip.js'

/**
 * One puppet on screen: its pose this frame, and how to draw it.
 *
 * The pose is rebuilt every frame from zero: each controller (the idle
 * motion, the face, a playing clip) ADDS its bone channels and claims its own
 * slots. Nothing is stored between frames, so a clip that ends at zero leaves
 * the puppet exactly at rest, and controllers never fight: the face owns the
 * head and the eyes, brows and mouth; an arm clip owns the arm and the hand.
 */

export type BonePose = { rot: number; x: number; y: number; sx: number; sy: number; len: number }

export class Puppet {
  readonly pose = new Map<string, BonePose>()
  /** Slot -> state shown this frame (the part `${slot}.${state}`); null is none. */
  readonly slots = new Map<string, string | null>()
  private bySlot = new Map<string, string[]>()

  /** Each bone's direction (unit x, y) and length, to its first child bone. */
  private axes = new Map<string, [number, number, number]>()

  constructor(readonly rig: LoadedRig) {
    for (const b of rig.bones) {
      const child = rig.bones.find((c) => c.parent === b.name)
      if (!child) continue
      const dx = child.pivot[0] - b.pivot[0], dy = child.pivot[1] - b.pivot[1]
      const l = Math.hypot(dx, dy)
      if (l > 0 && b.parent) this.axes.set(b.name, [dx / l, dy / l, l])
    }
    for (const p of rig.parts) {
      const list = this.bySlot.get(p.slot) ?? []
      list.push(p.name)
      this.bySlot.set(p.slot, list)
    }
    this.reset()
  }

  /** Back to rest: start of every frame. */
  reset(): void {
    for (const b of this.rig.bones) this.pose.set(b.name, { rot: 0, x: 0, y: 0, sx: 0, sy: 0, len: 0 })
    this.slots.clear()
  }

  add(bone: string, ch: Channel, v: number): void {
    const p = this.pose.get(bone)
    if (p) p[ch] += v
  }

  /** Show `${slot}.${state}` in a slot; null shows nothing there. */
  show(slot: string, state: string | null): void {
    this.slots.set(slot, state)
  }

  /** A clip's pose at time t, added on top of what is there. */
  applyClip(clip: ClipData, t: number): void {
    for (const [bone, chans] of Object.entries(clip.tracks)) {
      for (const [ch, keys] of Object.entries(chans)) this.add(bone, ch as Channel, sample(keys!, t))
    }
    for (const [slot, swaps] of Object.entries(clip.swaps ?? {})) {
      const s = swapAt(swaps, t)
      if (s !== null) this.show(slot, s === '-' ? null : s)
    }
  }

  /**
   * Each bone's matrices, rest canvas pixels -> posed canvas pixels: `parts`
   * for what hangs on the bone, `frame` for the bones it carries. They differ
   * only by `len`: the bone's own parts shorten along its length (from its
   * pivot toward its first child's), its children just move to its new end.
   */
  boneMatrices(): Map<string, Mat> {
    return this.solve().parts
  }

  private solve(): { parts: Map<string, Mat>; frame: Map<string, Mat> } {
    const parts = new Map<string, Mat>(), frame = new Map<string, Mat>()
    for (const b of this.rig.order) {
      const p = this.pose.get(b.name)!
      const [px, py] = b.pivot
      let m = b.parent ? frame.get(b.parent)! : IDENTITY
      m = mul(m, translate(px + p.x, py + p.y))
      m = mul(m, rotate(p.rot))
      m = mul(m, scale(1 + p.sx, 1 + p.sy))
      const len = Math.min(0, p.len)
      const axis = this.axes.get(b.name)
      if (len && axis) {
        const [ux, uy, l] = axis
        // shorten along the bone's own direction: I + len * u u^T
        parts.set(b.name, mul(mul(m, [1 + len * ux * ux, len * ux * uy, len * ux * uy, 1 + len * uy * uy, 0, 0]), translate(-px, -py)))
        frame.set(b.name, mul(mul(m, translate(len * l * ux, len * l * uy)), translate(-px, -py)))
      } else {
        m = mul(m, translate(-px, -py))
        parts.set(b.name, m)
        frame.set(b.name, m)
      }
    }
    return { parts, frame }
  }

  /** The parts drawn this frame, back to front. */
  visibleParts() {
    const shown = this.rig.parts.filter((p) => {
      if (!this.slots.has(p.slot)) return p.visible
      const s = this.slots.get(p.slot)
      return s !== null && p.name === `${p.slot}.${s}`
    })
    const names = new Set(shown.map((p) => p.name))
    return shown.filter((p) => !p.with || names.has(p.with)).sort((a, b) => a.z - b.z)
  }

  /**
   * Draw into a 2D context. `view` maps rig pixels to the context's pixels
   * (position, scale, and a mirror for a seat on the table's right). With a
   * table, it is drawn over the body below the table line, and the parts that
   * rest on the table are drawn again over it there: so a forearm runs under
   * the rail's far edge onto the felt, and a hand lifted above it is in front.
   */
  draw(ctx: CanvasRenderingContext2D, view: Mat, opts: { table?: boolean } = {}): void {
    ctx.save()
    this.paint(ctx, view)
    if (opts.table) {
      ctx.setTransform(view[0], view[1], view[2], view[3], view[4], view[5])
      ctx.drawImage(this.rig.images.get(this.rig.table)!, 0, this.rig.tableLine)
      ctx.beginPath()
      // from a pixel above the line, so the clip's soft edge never shows the table through a hand
      ctx.rect(0, this.rig.tableLine - 4, this.rig.canvas.w, this.rig.canvas.h - this.rig.tableLine + 4)
      ctx.clip()
      this.paint(ctx, view, true)
    }
    ctx.restore()
  }

  /**
   * Paint this frame's parts with `view`, and nothing else: the room's own
   * table is drawn by whoever owns the room (web/puppet/stage.ts). With
   * `onTable`, only the parts that rest on the table, to be drawn again over it.
   */
  paint(ctx: CanvasRenderingContext2D, view: Mat, onTable = false): void {
    const bones = this.boneMatrices()
    for (const p of this.visibleParts()) {
      if (onTable && !p.onTable) continue
      const m = mul(mul(view, bones.get(p.bone)!), this.rig.rest.get(p.name)!)
      ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])
      ctx.drawImage(this.rig.images.get(p.img)!, 0, 0)
    }
  }

  /** The top of the head at rest, in rig pixels (a hat included): where speech goes. */
  headTop(): number {
    let top = Infinity
    for (const p of this.rig.parts) {
      if (p.bone !== 'head' || !p.visible) continue
      const m = this.rig.rest.get(p.name)!
      const im = this.rig.images.get(p.img)!
      for (const [x, y] of [[0, 0], [im.naturalWidth, 0], [0, im.naturalHeight], [im.naturalWidth, im.naturalHeight]]) {
        top = Math.min(top, m[1] * x + m[3] * y + m[5])
      }
    }
    return Number.isFinite(top) ? top : this.rig.tableLine - 400
  }

  /** Bone pivots as they are posed, for a debug overlay. */
  pivots(): { name: string; x: number; y: number }[] {
    const bones = this.solve().frame
    return this.rig.bones.map((b) => {
      const m = bones.get(b.name)!
      const [x, y] = b.pivot
      return { name: b.name, x: m[0] * x + m[2] * y + m[4], y: m[1] * x + m[3] * y + m[5] }
    })
  }
}
