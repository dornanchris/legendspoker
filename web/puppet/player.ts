import { Puppet } from './puppet.js'
import { Face } from './face.js'
import { loadRig } from './rig.js'
import type { CastEntry } from './cast.js'
import type { ClipData } from './clip.js'

/**
 * A puppet with its face and its clips, run on a clock: the piece a screen
 * owns. The table screen will hold one per seat; the preview holds one.
 *
 * Clips play on their own track per body part, so a check can play while he
 * talks and blinks: each frame the pose is rebuilt from rest, then the face
 * and every playing clip add to it.
 */

type Playing = { name: string; clip: ClipData; t: number; loop: boolean }

export class PuppetPlayer {
  readonly face: Face
  readonly puppet: Puppet
  speed = 1
  /** Pause clips and hold their time (for scrubbing); the face runs on. */
  hold = false
  private playing: Playing[] = []

  private constructor(readonly entry: CastEntry, puppet: Puppet) {
    this.puppet = puppet
    this.face = new Face(entry.anim.face)
  }

  /** `small`: the half-size images, for the table (the bench keeps the full ones for its close-ups). */
  static async load(entry: CastEntry, small = false): Promise<PuppetPlayer> {
    const rig = small
      ? await loadRig(entry.rig, entry.base + 'half/', { up: 2, table: false })
      : await loadRig(entry.rig, entry.base)
    return new PuppetPlayer(entry, new Puppet(rig))
  }

  has(name: string): boolean {
    return name in this.entry.anim.clips
  }

  get clipNames(): string[] {
    return Object.keys(this.entry.anim.clips)
  }

  /** Start a clip from its beginning (a clip already playing restarts). */
  play(name: string, loop = false): void {
    const clip = this.entry.anim.clips[name]
    if (!clip) throw new Error(`no clip "${name}"`)
    this.playing = this.playing.filter((p) => p.name !== name)
    this.playing.push({ name, clip, t: 0, loop })
  }

  stop(name?: string): void {
    this.playing = name ? this.playing.filter((p) => p.name !== name) : []
  }

  /** Where a clip is, or -1 when it is not playing. */
  timeOf(name: string): number {
    return this.playing.find((p) => p.name === name)?.t ?? -1
  }

  /** Put a clip at a time and hold it there (scrubbing). */
  seek(name: string, t: number): void {
    if (!this.playing.some((p) => p.name === name)) this.play(name)
    const p = this.playing.find((q) => q.name === name)!
    p.t = Math.max(0, Math.min(t, p.clip.duration))
    this.hold = true
  }

  setLoop(name: string, loop: boolean): void {
    const p = this.playing.find((q) => q.name === name)
    if (p) p.loop = loop
  }

  update(dt: number): void {
    this.face.update(dt)
    if (!this.hold) {
      for (const p of this.playing) {
        p.t += dt * this.speed
        if (p.t >= p.clip.duration && p.loop) p.t %= p.clip.duration
      }
      this.playing = this.playing.filter((p) => p.t < p.clip.duration || p.loop)
    }
    const pup = this.puppet
    pup.reset()
    this.face.apply(pup)
    for (const p of this.playing) pup.applyClip(p.clip, p.t)
  }
}
