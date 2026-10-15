import { h } from '../dom.js'
import { ROOMS } from '../puppet/cast.js'
import { Stage, PRIO } from '../puppet/stage.js'
import { ikEnabled } from '../puppet/player.js'

/**
 * #/iktest: the IK prototype on the real stage (not part of the game). The
 * White House with Lincoln in seat 1 (IK cut from his pose drawings) and
 * Washington in seat 4, mirrored (IK from hands drawn as parts), both playing
 * the same clip every 1.4 s or so. ?ik=1 plays the IK clips, ?ik=0 the old
 * ones, so the two can be compared at the same size.
 *   ?seats=washington,roosevelt,fdr,washington  who sits in chairs 1-4
 *   ?clip=call                                  the clip cued (default check)
 *   ?loop=0                                     no cueing (for scrubbing)
 * window.__ik holds the stage, for the measuring scripts
 * (art-tools/build/ik_shots.cjs, ik_clips.cjs).
 */
export function ikTestScreen(root: HTMLElement): () => void {
  const q = new URLSearchParams(location.search)
  const seats = (q.get('seats') ?? 'lincoln,roosevelt,fdr,washington').split(',').map((s) => s || null)
  const clip = q.get('clip') ?? 'check'
  const canvas = h('canvas', { class: 'stage', style: 'position:absolute;inset:0;width:100%;height:100%' }) as HTMLCanvasElement
  const label = h('p', { style: 'position:absolute;left:8px;top:4px;margin:0;color:#ddd;font:12px sans-serif;z-index:2' },
    `IK prototype: ${ikEnabled() ? 'on (?ik=1)' : 'off (?ik=0)'}, ${clip}`)
  root.append(h('div', { style: 'position:fixed;inset:0;background:#000' }, canvas, label))
  const stage = new Stage(canvas, ROOMS.white_house, 4)
  let timer = 0
  stage.onReady = () => {
    ;(window as any).__ik = { stage, ready: true }
    if (q.get('loop') !== '0') {
      const every = Math.max(1400, 1000 * Math.max(...[1, 4].map((s) => stage.player(s)?.duration(clip) ?? 0)) + 400)
      timer = window.setInterval(() => { for (const s of [1, 4]) if (stage.player(s)?.has(clip)) stage.cue(s, clip, PRIO.act) }, every)
    }
  }
  stage.load([null, ...seats]).catch((e) => { label.textContent = String(e) })
  return () => { clearInterval(timer); stage.destroy() }
}
