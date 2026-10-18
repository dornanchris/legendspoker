// The IK prototype's hand-back: a check cut short by another check (or by a
// whole-figure clip) must not snap. Serve web/ first, then
//   node art-tools/build/ik_blend.cjs
// Records Lincoln's wrist offset every frame while a check plays and is restarted
// 300 ms in, and again cut by 'bet' (a whole-figure frame): the largest step
// between two frames, against the largest step of an uninterrupted check.
const { chromium } = require('/opt/node22/lib/node_modules/playwright')
;(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
  const p = await b.newPage({ viewport: { width: 667, height: 375 } })
  await p.goto('http://localhost:5181/?ik=1&loop=0#/iktest')
  await p.waitForFunction(() => window.__ik && window.__ik.ready, null, { timeout: 60000 })
  const run = (cut) => p.evaluate((cut) => new Promise((done) => {
    const pl = window.__ik.stage.player(1)
    const pose = () => pl.puppet.ikPose.get('arm_near')
    const rec = []
    pl.stop(); pl.play('check')
    const t0 = performance.now(); let cutDone = false
    const step = () => {
      const ms = performance.now() - t0
      if (cut && !cutDone && ms > 300) { cutDone = true; pl.stop(); pl.play(cut) }
      const q = pose(); rec.push([ms, q.x, q.y, q.state])
      if (ms < 1100) requestAnimationFrame(step); else done(rec)
    }
    requestAnimationFrame(step)
  }), cut)
  const maxStep = (rec) => Math.max(...rec.slice(1).map((r, i) => Math.hypot(r[1] - rec[i][1], r[2] - rec[i][2])))
  const plain = await run(null), again = await run('check'), bet = await run('bet')
  console.log(JSON.stringify({
    frames: plain.length,
    largestStepPlain: maxStep(plain).toFixed(2), largestStepRestarted: maxStep(again).toFixed(2), largestStepCutByBet: maxStep(bet).toFixed(2),
    endsAtRest: [plain, again, bet].map((r) => r[r.length - 1].slice(1)),
  }, null, 1))
  await b.close()
})()
