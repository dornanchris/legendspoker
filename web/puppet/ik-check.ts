/**
 * The IK prototype's numbers, without a browser:  npx tsx web/puppet/ik-check.ts
 *
 * Lincoln's check_ik, sampled every 5 ms: a zero offset gives exactly the rest
 * matrices; the upper arm and forearm meet at the elbow and the forearm and
 * hand at the wrist at every moment; the bones never stretch; the finger is on
 * the felt at the tap and above it at the top of the lift; the clip ends at rest.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { IkChain, type IkData } from './ik.js'
import { sample, swapAt, type ClipData } from './clip.js'
import { apply, type Mat } from './rig.js'

const art = (f: string) => readFileSync(fileURLToPath(new URL(`../art/lincoln/${f}`, import.meta.url)), 'utf8')
const ik: IkData = JSON.parse(art('ik.json'))
const anim = JSON.parse(art('anim.json'))
const rig = JSON.parse(art('rig.json'))
const clip: ClipData = anim.clips.check_ik
const chain = new IkChain(ik.chains[0])
const I: Mat = [1, 0, 0, 1, 0, 0]
const fails: string[] = []
const near = (a: [number, number], b: [number, number]) => Math.hypot(a[0] - b[0], a[1] - b[1])

// 1. rest is rest
const z = chain.matrices({ x: 0, y: 0, rot: 0, state: 'point' }, I)
const worst = Math.max(...[z.upper, z.fore, z.hand].flatMap((m) => m.map((v, i) => Math.abs(v - I[i]))))
if (worst > 1e-9) fails.push(`zero offset is not the rest pose (off by ${worst})`)
const restElbow = ik.chains[0].elbow
if (near(z.elbow, restElbow) > 1e-6) fails.push(`the solver's rest elbow ${z.elbow} is not the rig's ${restElbow} (bend the wrong way?)`)

// 2-4. joints, lengths, the finger
const pose = (t: number) => {
  const k = clip.ik!.arm_near
  return { x: sample(k.x!, t), y: sample(k.y!, t), rot: sample(k.rot!, t), state: swapAt(clip.ikSwaps!.arm_near, t) }
}
let maxElbowGap = 0, maxWristGap = 0, maxStretch = 0, minTip = Infinity, maxTip = -Infinity, tipAtTap = 0, tipAtLift = 0
const { shoulder: S, elbow: E, wrist: W } = ik.chains[0]
for (let t = 0; t <= clip.duration + 1e-9; t += 0.005) {
  const p = pose(t)
  const m = chain.matrices(p, I)
  maxElbowGap = Math.max(maxElbowGap, near(apply(m.upper, E[0], E[1]), apply(m.fore, E[0], E[1])))
  maxWristGap = Math.max(maxWristGap, near(apply(m.fore, W[0], W[1]), apply(m.hand, W[0], W[1])))
  maxStretch = Math.max(maxStretch, Math.abs(near(m.elbow, S) - chain.l1), Math.abs(near(m.wrist, m.elbow) - chain.l2))
  const tip = chain.tip(p)!
  minTip = Math.min(minTip, tip[1]); maxTip = Math.max(maxTip, tip[1])
  if (Math.abs(t - 0.35) < 0.003) tipAtTap = tip[1]
  if (Math.abs(t - 0.16) < 0.003) tipAtLift = tip[1]
}
if (maxElbowGap > 1e-6) fails.push(`the arm opens at the elbow by ${maxElbowGap.toFixed(3)} px`)
if (maxWristGap > 1e-6) fails.push(`the hand leaves the cuff by ${maxWristGap.toFixed(3)} px`)
if (maxStretch > 1e-6) fails.push(`a bone stretched by ${maxStretch.toFixed(3)} px`)
const line = rig.tableLine
// the room's padded rail runs about 75 rig px below the line at Lincoln's seats (measured at 667x375)
if (tipAtTap < line + 75) fails.push(`the finger does not reach past the rail onto the felt at the tap (tip y ${tipAtTap.toFixed(1)}, table line ${line})`)
if (tipAtLift > line) fails.push(`the finger is not lifted off the felt at the top of the lift (tip y ${tipAtLift.toFixed(1)})`)

// 5. ends at rest
const end = pose(clip.duration)
if (end.x || end.y || end.rot || end.state !== null) fails.push(`does not end at rest: ${JSON.stringify(end)}`)
const farEnd = swapAt(clip.swaps!.arm_far, clip.duration)
if (farEnd !== null) fails.push('the left arm does not end on its rest image')
if (Object.keys(clip.tracks).length) fails.push('the clip moves a bone (the left arm and body should stay at rest)')

const e = chain.matrices(pose(0.35), I).elbow
console.log(`check_ik ${Math.round(clip.duration * 1000)} ms: bend ${chain.bend}, upper arm ${chain.l1.toFixed(1)} px, forearm ${chain.l2.toFixed(1)} px`)
console.log(`  elbow moves to (${e[0].toFixed(1)}, ${e[1].toFixed(1)}) at the tap (rest ${restElbow.join(', ')})`)
console.log(`  fingertip y: lift ${tipAtLift.toFixed(1)}, tap ${tipAtTap.toFixed(1)} (table line ${line}); range ${minTip.toFixed(1)}..${maxTip.toFixed(1)}`)
console.log(`  worst elbow gap ${maxElbowGap.toExponential(1)} px, wrist gap ${maxWristGap.toExponential(1)} px, stretch ${maxStretch.toExponential(1)} px`)
console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS')
process.exit(fails.length ? 1 : 0)
