import { h } from '../dom.js'
import { ROOMS } from '../puppet/cast.js'
import { Stage, PRIO } from '../puppet/stage.js'
import { ikEnabled } from '../puppet/player.js'

/**
 * #/iktest: the IK prototype on the real stage (not part of the game). The
 * White House with Lincoln in seat 1 and again in seat 4, mirrored, both
 * checking every 1.4 s. ?ik=1 plays the IK check, ?ik=0 the old one, so the
 * two can be compared at the same size. window.__ik holds the stage, for the
 * measuring script (art-tools/build/ik_shots.cjs).
 */
export function ikTestScreen(root: HTMLElement): () => void {
  const canvas = h('canvas', { class: 'stage', style: 'position:absolute;inset:0;width:100%;height:100%' }) as HTMLCanvasElement
  const label = h('p', { style: 'position:absolute;left:8px;top:4px;margin:0;color:#ddd;font:12px sans-serif;z-index:2' },
    `IK prototype: ${ikEnabled() ? 'on (?ik=1)' : 'off (?ik=0)'}`)
  root.append(h('div', { style: 'position:fixed;inset:0;background:#000' }, canvas, label))
  const stage = new Stage(canvas, ROOMS.white_house, 4)
  let timer = 0
  stage.onReady = () => {
    ;(window as any).__ik = { stage, ready: true }
    if (new URLSearchParams(location.search).get('loop') !== '0') {
      timer = window.setInterval(() => { stage.cue(1, 'check', PRIO.act); stage.cue(4, 'check', PRIO.act) }, 1400)
    }
  }
  stage.load([null, 'lincoln', 'roosevelt', 'fdr', 'lincoln']).catch((e) => { label.textContent = String(e) })
  return () => { clearInterval(timer); stage.destroy() }
}
