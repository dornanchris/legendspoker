import { Puppet, type LoadedIk } from './puppet.js'
import { IkChain } from './ik.js'
import { type Channel, sample, swapAt, EASE } from './clip.js'
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

/**
 * A clip cut short, handing back to rest (IK puppets only): what it had added
 * to the bones and the chains when it stopped, faded out over `dur` on the
 * presentation clock, its hand kept until the chain is back. So a check cut by
 * the next action never snaps to rest first.
 */
type Release = {
  t: number
  dur: number
  bones: [string, string, number][]
  ik: [string, number, number, number, string | null][]
}

/**
 * The IK prototype is off unless asked for: `?ik=1` (or localStorage
 * legends-poker/ik = 1). With it, a puppet with IK chains plays `<clip>_ik`
 * in place of `<clip>` where it has one; the name the game asks for is unchanged.
 */
export function ikEnabled(): boolean {
  try {
    const q = new URLSearchParams(location.search).get('ik')
    if (q !== null) return q === '1'
    return localStorage.getItem('legends-poker/ik') === '1'
  } catch {
    return false
  }
}

export class PuppetPlayer {
  readonly face: Face
  readonly puppet: Puppet
  speed = 1
  /** Pause clips and hold their time (for scrubbing); the face runs on. */
  hold = false
  private playing: Playing[] = []
  private releases: Release[] = []
  /** Clips stand in for their `_ik` versions (an IK puppet, with the prototype on). */
  useIk = false

  private constructor(readonly entry: CastEntry, puppet: Puppet) {
    this.puppet = puppet
    this.face = new Face(entry.anim.face)
  }

  /** `small`: the half-size images, for the table (the bench keeps the full ones for its close-ups). */
  static async load(entry: CastEntry, small = false, ik = ikEnabled()): Promise<PuppetPlayer> {
    const rig = small
      ? await loadRig(entry.rig, entry.base + 'half/', { up: 2, table: false })
      : await loadRig(entry.rig, entry.base)
    let loaded: LoadedIk | null = null
    if (ik && entry.ik) {
      const base = entry.base + (small ? 'half/' : '')
      const images = new Map<string, HTMLImageElement>()
      const imgs = entry.ik.chains.flatMap((c) => [c.parts.upper.img, c.parts.fore.img, ...Object.values(c.parts.hands).map((h) => h.img)])
      await Promise.all(imgs.map((src) => new Promise<void>((ok, fail) => {
        const im = new Image()
        im.onload = () => ok()
        im.onerror = () => fail(new Error(`ik image not found: ${base}${src}`))
        im.src = base + src
        images.set(src, im)
      })))
      loaded = { chains: entry.ik.chains.map((c) => new IkChain(c)), images, up: small ? 2 : 1 }
    }
    const pl = new PuppetPlayer(entry, new Puppet(rig, loaded))
    pl.useIk = !!loaded
    return pl
  }

  /** The clip played for a name: its `_ik` version on an IK puppet. */
  private resolve(name: string): string {
    return this.useIk && `${name}_ik` in this.entry.anim.clips ? `${name}_ik` : name
  }

  /** Every image this puppet holds, as decoded RGBA bytes (width x height x 4): the cost in memory. */
  decodedBytes(): number {
    const ims = [...this.puppet.rig.images.values(), ...(this.puppet.ik?.images.values() ?? [])]
    return ims.reduce((n, im) => n + im.naturalWidth * im.naturalHeight * 4, 0)
  }

  has(name: string): boolean {
    return this.resolve(name) in this.entry.anim.clips
  }

  get clipNames(): string[] {
    return Object.keys(this.entry.anim.clips)
  }

  /** Start a clip from its beginning (a clip already playing restarts). */
  play(name: string, loop = false): void {
    const clip = this.entry.anim.clips[this.resolve(name)]
    if (!clip) throw new Error(`no clip "${name}"`)
    this.release(this.playing.filter((p) => p.name === name))
    this.playing = this.playing.filter((p) => p.name !== name)
    this.playing.push({ name, clip, t: 0, loop })
  }

  stop(name?: string): void {
    this.release(this.playing.filter((p) => !name || p.name === name))
    this.playing = name ? this.playing.filter((p) => p.name !== name) : []
  }

  /**
   * Clips cut short hand back to rest instead of snapping there (IK puppets
   * only; every other puppet keeps its old, exact behaviour).
   */
  private release(cut: Playing[]): void {
    if (!this.puppet.ik) return
    for (const p of cut) {
      if (p.t <= 0 || p.t >= p.clip.duration) continue
      const bones: Release['bones'] = []
      for (const [bone, chans] of Object.entries(p.clip.tracks)) {
        for (const [ch, keys] of Object.entries(chans)) bones.push([bone, ch, sample(keys!, p.t)])
      }
      const ik: Release['ik'] = []
      for (const [chain, chans] of Object.entries(p.clip.ik ?? {})) {
        const v = (c: 'x' | 'y' | 'rot') => (chans[c] ? sample(chans[c]!, p.t) : 0)
        const sw = p.clip.ikSwaps?.[chain]
        ik.push([chain, v('x'), v('y'), v('rot'), sw ? swapAt(sw, p.t) : null])
      }
      if (bones.length || ik.length) this.releases.push({ t: 0, dur: p.clip.release ?? 0.15, bones, ik })
    }
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
      for (const r of this.releases) r.t += dt * this.speed
      this.releases = this.releases.filter((r) => r.t < r.dur)
    }
    const pup = this.puppet
    pup.reset()
    this.face.apply(pup)
    for (const p of this.playing) pup.applyClip(p.clip, p.t)
    for (const r of this.releases) {
      const k = 1 - EASE.inOut(Math.min(1, r.t / r.dur))
      for (const [bone, ch, v] of r.bones) pup.add(bone, ch as Channel, v * k)
      for (const [chain, x, y, rot, state] of r.ik) pup.addIk(chain, x * k, y * k, rot * k, state)
    }
  }
}
