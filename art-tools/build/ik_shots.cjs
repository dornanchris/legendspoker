// The IK prototype, measured and photographed on the real stage at phone size.
// Serve web/ first (PORT=5181 node web/serve.mjs), then
//   node art-tools/build/ik_shots.cjs out_dir
// For ?ik=0 (the old check) and ?ik=1 (the IK check): frame cost (update + draw)
// over 8 s of both Lincolns checking every 1.4 s, with the CPU slowed 4x as a
// stand-in for a phone; decoded image memory; then each Lincoln's arm at fixed
// times in the clip (seat 1, and seat 4 mirrored), as crops, and a whole screen.
const { chromium } = require('/opt/node22/lib/node_modules/playwright')
const fs = require('fs')
;(async () => {
  const [out = '/tmp/ik'] = process.argv.slice(2)
  fs.mkdirSync(out, { recursive: true })
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
  const report = {}
  for (const ik of ['0', '1']) {
    const ctx = await b.newContext({ viewport: { width: 667, height: 375 }, deviceScaleFactor: 2 })
    const p = await ctx.newPage()
    const errs = []; p.on('pageerror', (e) => errs.push(e.message))
    const cdp = await ctx.newCDPSession(p)
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
    await p.goto(`http://localhost:5181/?ik=${ik}#/iktest`)
    await p.waitForFunction(() => window.__ik && window.__ik.ready, null, { timeout: 60000 })
    await p.waitForTimeout(1500)
    await p.evaluate(() => { const s = window.__ik.stage.stats; s.frames = 0; s.total = 0; s.max = 0 })
    await p.waitForTimeout(8000)
    const r = await p.evaluate(() => {
      const st = window.__ik.stage
      return { frames: st.stats.frames, avgMs: st.stats.total / st.stats.frames, maxMs: st.stats.max,
        lincolnMB: st.player(1).decodedBytes() / 1048576, heapMB: performance.memory ? performance.memory.usedJSHeapSize / 1048576 : null }
    })
    report['ik=' + ik] = { ...r, errors: errs }
    // stills at fixed clip times: no sway, both seats seeked
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 })
    await p.goto(`http://localhost:5181/?ik=${ik}&loop=0#/iktest`)
    await p.waitForFunction(() => window.__ik && window.__ik.ready, null, { timeout: 60000 })
    const geo = await p.evaluate(() => { const st = window.__ik.stage; st.setStill(true); const g = st.geometry(); return [1, 4].map((i) => g.seats.get(i)) })
    report['seats'] = geo
    for (const t of [0, 0.1, 0.18, 0.24, 0.3, 0.35, 0.45, 0.52, 0.6, 0.65]) {
      await p.evaluate((t) => { const st = window.__ik.stage; for (const s of [1, 4]) st.player(s).seek('check', t) }, t)
      await p.waitForTimeout(150)
      // each Lincoln's arm and the felt in front of him (CSS px; the file is at the device's 2x)
      for (const [i, g] of geo.entries()) {
        const w = 170, hgt = 110
        const x = g.side === 'l' ? g.x - 70 : g.x - w + 70
        await p.screenshot({ path: `${out}/ik${ik}_seat${i ? 4 : 1}_t${String(Math.round(t * 1000)).padStart(3, '0')}.png`,
          clip: { x: Math.max(0, x), y: g.line - 70, width: w, height: hgt } })
      }
      if (t === 0.35) await p.screenshot({ path: `${out}/ik${ik}_screen_tap.png` })
    }
    await ctx.close()
  }
  console.log(JSON.stringify(report, null, 1))
  await b.close()
})()
