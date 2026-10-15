import { type Mat, mul, translate, rotate, scale, apply } from './rig.js'

/**
 * Two-bone inverse kinematics for an arm (the prototype: Lincoln's right arm,
 * web/art/<id>/ik.json, written by art-tools/<id>_parts/ik_split.py).
 *
 * The arm is three images cut from a drawing the rig already has: the upper
 * arm (shoulder to elbow), the forearm with its cuff (elbow to wrist) and the
 * hand. A clip moves the WRIST, as an offset from where it rests, and turns
 * the hand about it; the solver finds the elbow. Each image turns about its
 * own joint, and each joint is where the image before it ends, so the arm
 * cannot come apart: the upper arm and forearm overlap in the bend, the hand
 * runs under the cuff.
 *
 * Everything is in rig pixels. The rig's table line sits on the seat's table
 * line, so rig pixels are table space: a wrist target is a point on the felt
 * in front of that seat, mirrored with it on the right of the table.
 */

export type IkPartData = { img: string; x: number; y: number; z: number; onTable: boolean }

export type IkChainData = {
  chain: string
  /** The bone the shoulder rides (the torso, so the arm sways and breathes with him). */
  bone: string
  shoulder: [number, number]
  elbow: [number, number]
  wrist: [number, number]
  /** The pointing finger's tip, for checks that it reaches the felt. */
  tip?: [number, number]
  /** Which way the elbow bends: the side of the shoulder-wrist line it lies on (from the rest pose if absent). */
  bend?: 1 | -1
  /** Slots the chain stands in for while it shows a hand. */
  hides: string[]
  parts: { upper: IkPartData; fore: IkPartData; hands: Record<string, IkPartData> }
}

export type IkData = { note?: string; chains: IkChainData[] }

/** A chain's pose this frame: the wrist's offset from rest, the hand's turn (degrees, clockwise), and which hand shows (null: the chain is off, the rig's own arm shows). */
export type IkPose = { x: number; y: number; rot: number; state: string | null }

export const IK_CHANNELS = ['x', 'y', 'rot'] as const
export type IkChannel = (typeof IK_CHANNELS)[number]

const deg = (r: number) => (r * 180) / Math.PI

/**
 * The elbow for a wrist at `t`: upper arm and forearm directions (radians,
 * y down). Out of reach, the arm points straight at the target; too close,
 * the elbow folds as far as the lengths allow. Never stretches.
 */
export function solve(s: [number, number], l1: number, l2: number, t: [number, number], bend: number) {
  const dx = t[0] - s[0], dy = t[1] - s[1]
  const d = Math.min(l1 + l2 - 1e-6, Math.max(Math.abs(l1 - l2) + 1e-6, Math.hypot(dx, dy)))
  const a = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))))
  const upper = Math.atan2(dy, dx) + bend * a
  const ex = s[0] + l1 * Math.cos(upper), ey = s[1] + l1 * Math.sin(upper)
  const fore = Math.atan2(t[1] - ey, t[0] - ex)
  return { upper, fore, elbow: [ex, ey] as [number, number] }
}

export class IkChain {
  readonly l1: number
  readonly l2: number
  readonly bend: number
  private rest: { upper: number; fore: number }

  constructor(readonly data: IkChainData) {
    const [s, e, w] = [data.shoulder, data.elbow, data.wrist]
    this.l1 = Math.hypot(e[0] - s[0], e[1] - s[1])
    this.l2 = Math.hypot(w[0] - e[0], w[1] - e[1])
    const cross = (w[0] - s[0]) * (e[1] - s[1]) - (w[1] - s[1]) * (e[0] - s[0])
    this.bend = data.bend ?? (cross >= 0 ? 1 : -1)
    // the rest angles come from the same solve, so a zero offset gives exactly the rest pose
    this.rest = solve(s, this.l1, this.l2, w, this.bend)
  }

  /**
   * Each image's matrix, rig pixels -> posed rig pixels, under `parent` (the
   * bone the shoulder rides). At a zero offset and turn, every one is `parent`.
   */
  matrices(p: IkPose, parent: Mat): { upper: Mat; fore: Mat; hand: Mat; elbow: [number, number]; wrist: [number, number] } {
    const { shoulder: s, elbow: e, wrist: w } = this.data
    const t: [number, number] = [w[0] + p.x, w[1] + p.y]
    const r = solve(s, this.l1, this.l2, t, this.bend)
    const du = deg(r.upper - this.rest.upper), df = deg(r.fore - this.rest.fore)
    const about = (pivot: [number, number], to: [number, number], d: number): Mat =>
      mul(mul(translate(to[0], to[1]), rotate(d)), translate(-pivot[0], -pivot[1]))
    // the wrist where the forearm ends: the target, unless it was out of reach
    const wrist: [number, number] = [r.elbow[0] + this.l2 * Math.cos(r.fore), r.elbow[1] + this.l2 * Math.sin(r.fore)]
    return {
      upper: mul(parent, about(s, s, du)),
      fore: mul(parent, about(e, r.elbow, df)),
      hand: mul(parent, about(w, wrist, df + p.rot)),
      elbow: r.elbow,
      wrist,
    }
  }

  /** Where the fingertip is for a pose (rig pixels), or null without one. */
  tip(p: IkPose): [number, number] | null {
    const tp = this.data.tip
    return tp ? apply(this.matrices(p, [1, 0, 0, 1, 0, 0]).hand, tp[0], tp[1]) : null
  }
}

/** An IK image's rest matrix: its crop placed in the rig (scaled back up from a half-size copy). */
export const ikRest = (p: IkPartData, up: number): Mat => mul(translate(p.x, p.y), scale(up, up))
