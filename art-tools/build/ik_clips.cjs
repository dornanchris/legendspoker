// Every _ik clip of one puppet, photographed on the real stage at phone size,
// in seat 1 and mirrored in seat 4. Serve web/ first (PORT=5181 node web/serve.mjs), then
//   node art-tools/build/ik_clips.cjs <id> out_dir [clip ...]
// For each clip: a strip per seat of the arm and the felt in front of him at
// eight times through the clip, ?ik=1 above, the old clip (?ik=0) below.
const { chromium } = require('/opt/node22/lib/node_modules/playwright')
const fs = require('fs')
;(async () => {
  const [id = 'washington', out = '/tmp/ikc', ...only] = process.argv.slice(2)
  fs.mkdirSync(out, { recursive: true })
  const anim = JSON.parse(fs.readFileSync(`${__dirname}/../../web/art/${id}/anim.json`, 'utf8'))
  const clips = (only.length ? only : Object.keys(anim.clips).filter((c) => c.endsWith('_ik')).map((c) => c.slice(0, -3)))
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
  for (const ik of ['1', '0']) {
    const ctx = await b.newContext({ viewport: { width: 667, height: 375 }, deviceScaleFactor: 2 })
    const p = await ctx.newPage()
    p.on('pageerror', (e) => console.log('pageerror', e.message))
    await p.goto(`http://localhost:5181/?ik=${ik}&loop=0&seats=${id},roosevelt,fdr,${id}#/iktest`)
    await p.waitForFunction(() => window.__ik && window.__ik.ready, null, { timeout: 60000 })
    const geo = await p.evaluate(() => { const st = window.__ik.stage; st.setStill(true); const g = st.geometry(); return [1, 4].map((i) => g.seats.get(i)) })
    for (const clip of clips) {
      const dur = await p.evaluate((c) => window.__ik.stage.player(1).duration(c), clip)
      for (let k = 0; k < 8; k++) {
        const t = (dur * k) / 7
        await p.evaluate(([c, t]) => { const st = window.__ik.stage; for (const s of [1, 4]) { st.player(s).stop(); st.player(s).seek(c, t) } }, [clip, t])
        await p.waitForTimeout(120)
        for (const [i, g] of geo.entries()) {
          const w = 170, hgt = 130
          const x = g.side === 'l' ? g.x - 70 : g.x - w + 70
          await p.screenshot({ path: `${out}/${clip}_ik${ik}_s${i ? 4 : 1}_${k}.png`, clip: { x: Math.max(0, x), y: g.line - 90, width: w, height: hgt } })
        }
      }
    }
    await ctx.close()
  }
  await b.close()
  console.log('shots in', out)
})()
