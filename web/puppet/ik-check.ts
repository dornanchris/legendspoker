/**
 * The IK prototype's numbers, without a browser:  npx tsx web/puppet/ik-check.ts [id ...]
 *
 * Every `_ik` clip of each puppet (washington by default; lincoln's retired arm
 * still checks by name), sampled every 5 ms: a zero offset gives exactly the rest matrices; the upper arm and
 * forearm meet at the elbow and the forearm and hand at the wrist at every
 * moment; the bones never stretch; every hand state the clip shows exists; the
 * clip ends at rest. Where the chain has a fingertip (Lincoln's), check_ik's
 * finger is on the felt at the tap and above it at the top of the lift.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { IkChain, type IkData } from './ik.js'
import { sample, swapAt, type ClipData } from './clip.js'
import { apply, type Mat } from './rig.js'

const I: Mat = [1, 0, 0, 1, 0, 0]
const near = (a: [number, number], b: [number, number]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['washington']
const fails: string[] = []

for (const id of ids) {
  const art = (f: string) => readFileSync(fileURLToPath(new URL(`../art/${id}/${f}`, import.meta.url)), 'utf8')
  const ik: IkData = JSON.parse(art('ik.json'))
  const anim = JSON.parse(art('anim.json'))
  const rig = JSON.parse(art('rig.json'))
  const chains = new Map(ik.chains.map((c) => [c.chain, new IkChain(c)]))
  const fail = (s: string) => fails.push(`${id}: ${s}`)

  // 1. rest is rest
  for (const [name, chain] of chains) {
    const z = chain.matrices({ x: 0, y: 0, rot: 0, state: 'rest' }, I)
    const worst = Math.max(...[z.upper, z.fore, z.hand].flatMap((m) => m.map((v, i) => Math.abs(v - I[i]))))
    if (worst > 1e-9) fail(`${name}: zero offset is not the rest pose (off by ${worst})`)
    if (near(z.elbow, chain.data.elbow) > 1e-6) fail(`${name}: the solver's rest elbow ${z.elbow} is not the rig's ${chain.data.elbow} (bend the wrong way?)`)
    console.log(`${id} ${name}: bend ${chain.bend}, upper arm ${chain.l1.toFixed(1)} px, forearm ${chain.l2.toFixed(1)} px`)
  }

  for (const [clipName, clip] of Object.entries(anim.clips as Record<string, ClipData>)) {
    if (!clip.ik) continue
    if (!clipName.endsWith('_ik')) fail(`${clipName} moves an IK chain but is not an _ik clip`)
    if (!anim.clips[clipName.slice(0, -3)]) fail(`${clipName} has no plain clip to fall back on`)
    for (const [name, k] of Object.entries(clip.ik)) {
      const chain = chains.get(name)
      if (!chain) { fail(`${clipName}: no chain ${name}`); continue }
      const pose = (t: number) => ({ x: sample(k.x ?? [], t), y: sample(k.y ?? [], t), rot: sample(k.rot ?? [], t), state: swapAt(clip.ikSwaps?.[name] ?? [], t) })
      // 2-4. joints, lengths, states
      const { shoulder: S, elbow: E, wrist: W } = chain.data
      let elbowGap = 0, wristGap = 0, stretch = 0, reach = 0
      for (let t = 0; t <= clip.duration + 1e-9; t += 0.005) {
        const p = pose(t)
        if (p.state !== null && !chain.data.parts.hands[p.state]) fail(`${clipName}: no hand '${p.state}' on ${name}`)
        const m = chain.matrices(p, I)
        elbowGap = Math.max(elbowGap, near(apply(m.upper, E[0], E[1]), apply(m.fore, E[0], E[1])))
        wristGap = Math.max(wristGap, near(apply(m.fore, W[0], W[1]), apply(m.hand, W[0], W[1])))
        stretch = Math.max(stretch, Math.abs(near(m.elbow, S) - chain.l1), Math.abs(near(m.wrist, m.elbow) - chain.l2))
        // how far short of its target the wrist fell (out of reach: the arm points straight at it)
        reach = Math.max(reach, near(m.wrist, [W[0] + p.x, W[1] + p.y]))
      }
      if (elbowGap > 1e-6) fail(`${clipName}: the arm opens at the elbow by ${elbowGap.toFixed(3)} px`)
      if (wristGap > 1e-6) fail(`${clipName}: the hand leaves the cuff by ${wristGap.toFixed(3)} px`)
      if (stretch > 1e-6) fail(`${clipName}: a bone stretched by ${stretch.toFixed(3)} px`)
      if (reach > 0.5) fail(`${clipName}: the wrist falls ${reach.toFixed(1)} px short of its target (out of reach)`)
      // 5. ends at rest
      const end = pose(clip.duration)
      if (end.x || end.y || end.rot || end.state !== null) fail(`${clipName}: does not end at rest: ${JSON.stringify(end)}`)
      for (const [slot, keys] of Object.entries(clip.swaps ?? {})) if (swapAt(keys, clip.duration) !== null) fail(`${clipName}: ${slot} does not end on its rest image`)

      // the finger on the felt (a chain with a fingertip, the check)
      if (chain.data.tip && clipName === 'check_ik') {
        const line = rig.tableLine
        const tap = chain.tip(pose(0.35))![1], lift = chain.tip(pose(0.16))![1]
        // the room's padded rail runs about 75 rig px below the line at Lincoln's seats (measured at 667x375)
        if (tap < line + 75) fail(`${clipName}: the finger does not reach past the rail onto the felt at the tap (tip y ${tap.toFixed(1)}, table line ${line})`)
        if (lift > line) fail(`${clipName}: the finger is not lifted off the felt at the top of the lift (tip y ${lift.toFixed(1)})`)
        console.log(`  fingertip y: lift ${lift.toFixed(1)}, tap ${tap.toFixed(1)} (table line ${line})`)
      }
      console.log(`  ${clipName} ${Math.round(clip.duration * 1000)} ms on ${name}: worst elbow gap ${elbowGap.toExponential(1)} px, wrist gap ${wristGap.toExponential(1)} px, stretch ${stretch.toExponential(1)} px`)
    }
  }
}
console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS')
process.exit(fails.length ? 1 : 0)
