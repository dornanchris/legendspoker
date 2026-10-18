// A tour table as the game stages it, with a save that has cleared the tables
// before it: serve web/ first (PORT=5181 node web/serve.mjs), then
//   node art-tools/build/table_shot.cjs rome out.png [wait ms] [width] [height] [calls]
// ('calls': how many times to call or check first, to get cards on the board)
const { chromium } = require('/opt/node22/lib/node_modules/playwright')
;(async () => {
  const [table, out, wait = 8000, w = 1280, h = 720, calls = 0] = process.argv.slice(2)
  const order = ['white_house', 'athens', 'pirate_cove', 'camelot', 'rome', 'baker_street', 'transylvania', 'station']
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
  const p = await b.newPage({ viewport: { width: +w, height: +h } })
  const errs = []; p.on('pageerror', e => errs.push(e.message))
  await p.goto('http://localhost:5181/')
  const rec = { attempts: 1, wins: 1, losses: 0, bestPlace: 1, respectTier: 3, respectPoints: 20, cleared: true, firstClearedAt: '2026-01-01', fastestWin: 40 }
  await p.evaluate(([rec, order, table]) => localStorage.setItem('legends-poker/save', JSON.stringify({
    player: { name: 'Tester', invitedAt: '2026-01-01' },
    tables: Object.fromEntries(order.slice(0, Math.max(0, order.indexOf(table))).map((t) => [t, rec])), settings: { showLog: false } })), [rec, order, table])
  await p.goto('http://localhost:5181/?pace=0.3#/intro/' + table); await p.waitForTimeout(800)
  console.log(p.url())
  await p.click('button.primary'); await p.waitForTimeout(+wait)
  for (let i = 0; i < +calls; i++) {
    const b_ = p.locator('.buttons button', { hasText: /^(Call|Check)/ }).first()
    if (await b_.count()) { await b_.click(); await p.waitForTimeout(+wait) }
  }
  await p.screenshot({ path: out }); console.log('errors', errs); await b.close()
})()
