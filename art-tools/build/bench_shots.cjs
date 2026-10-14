// Screenshots of a puppet's bench clips mid-play, from the built web page.
//   node web/build.mjs && node art-tools/build/bench_shots.cjs cerberus OUT_PREFIX bet yawn ...
// Needs Playwright (preinstalled in the cloud container at /opt/node22/lib/node_modules).
const { chromium } = require('/opt/node22/lib/node_modules/playwright')
const path = require('path')
;(async () => {
  const [id, out, ...clips] = process.argv.slice(2)
  const url = 'file://' + path.resolve(__dirname, '../../web/index.html') + '#/puppet/' + id
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch())
  const p = await b.newPage({ viewport: { width: 1400, height: 800 } })
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)))
  await p.goto(url); await p.waitForTimeout(2500)
  await p.screenshot({ path: `${out}_rest.png`, clip: { x: 10, y: 10, width: 1025, height: 780 } })
  for (const c of clips) {
    await p.getByRole('button', { name: c, exact: true }).first().click()
    await p.waitForTimeout(700)
    await p.screenshot({ path: `${out}_${c}.png`, clip: { x: 10, y: 10, width: 1025, height: 780 } })
    await p.waitForTimeout(2500)
  }
  console.log('errors', errs); await b.close()
})()
