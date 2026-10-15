import { type LoadedRig, type Mat, IDENTITY, mul, translate, rotate, scale } from './rig.js'
import { type ClipData, type Channel, sample, swapAt } from './clip.js'
import { type IkPose, type IkPartData, IkChain, ikRest } from './ik.js'

/** A rig's IK chains with their images loaded (`up`: the images are that many times smaller than the rig). */
export type LoadedIk = { chains: IkChain[]; images: Map<string, HTMLImageElement>; up: number }

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

  /** Each IK chain's pose this frame (Lincoln's prototype arm; none for every other puppet). */
  readonly ikPose = new Map<string, IkPose>()

  constructor(readonly rig: LoadedRig, readonly ik: LoadedIk | null = null) {
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
    for (const c of this.ik?.chains ?? []) this.ikPose.set(c.data.chain, { x: 0, y: 0, rot: 0, state: null })
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
    for (const [chain, chans] of Object.entries(clip.ik ?? {})) {
      const p = this.ikPose.get(chain)
      if (!p) continue
      for (const [ch, keys] of Object.entries(chans)) p[ch as 'x' | 'y' | 'rot'] += sample(keys!, t)
    }
    for (const [chain, swaps] of Object.entries(clip.ikSwaps ?? {})) {
      const p = this.ikPose.get(chain)
      const s = swapAt(swaps, t)
      if (p && s !== null) p.state = s
    }
  }

  /** An IK chain's pose added to (a cut-short clip handing back to rest: player.ts). */
  addIk(chain: string, x: number, y: number, rot: number, state?: string | null): void {
    const p = this.ikPose.get(chain)
    if (!p) return
    p.x += x; p.y += y; p.rot += rot
    if (state !== undefined && p.state === null) p.state = state
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
    for (const d of this.drawables()) {
      if (onTable && !d.onTable) continue
      const m = mul(view, d.m)
      ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])
      ctx.drawImage(d.img, 0, 0)
    }
  }

  /**
   * What is drawn this frame, back to front: each image with its matrix (its
   * pixels -> posed rig pixels). An IK chain showing a hand stands in for its
   * slots (the rig's own forearm piece and upper-arm patch) with its three images.
   */
  drawables(): { img: HTMLImageElement; m: Mat; z: number; onTable: boolean }[] {
    const bones = this.boneMatrices()
    // a chain shows while it has a hand, unless a clip has emptied its slots (a whole-figure frame hides the arms)
    const emptied = (slot: string) => this.slots.has(slot) && this.slots.get(slot) === null
    const active = this.ik ? this.ik.chains.filter((c) => this.ikPose.get(c.data.chain)?.state && !c.data.hides.some(emptied)) : []
    const hidden = new Set(active.flatMap((c) => c.data.hides))
    const out = this.visibleParts().filter((p) => !hidden.has(p.slot)).map((p) => ({
      img: this.rig.images.get(p.img)!, m: mul(bones.get(p.bone)!, this.rig.rest.get(p.name)!), z: p.z, onTable: p.onTable,
    }))
    for (const c of active) {
      const pose = this.ikPose.get(c.data.chain)!
      const ms = c.matrices(pose, bones.get(c.data.bone)!)
      const hand = c.data.parts.hands[pose.state!]
      const add = (part: IkPartData | undefined, m: Mat) => {
        if (part) out.push({ img: this.ik!.images.get(part.img)!, m: mul(m, ikRest(part, this.ik!.up)), z: part.z, onTable: part.onTable })
      }
      add(c.data.parts.upper, ms.upper)
      add(c.data.parts.fore, ms.fore)
      add(hand, ms.hand)
    }
    return out.sort((a, b) => a.z - b.z)
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
