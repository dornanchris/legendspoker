// A staged table in a room, as the game shows it: serve web/ first
// (PORT=5181 node web/serve.mjs), then
//   node art-tools/build/room_shot.cjs rome out.png [table] [width] [height]
// stages TABLE (default white_house, whose cast is all built) in ROOM.
const { chromium } = require('/opt/node22/lib/node_modules/playwright')
;(async () => {
  const [room, out, table = 'white_house', w = 1280, h = 720] = process.argv.slice(2)
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch())
  const p = await b.newPage({ viewport: { width: +w, height: +h } })
  await p.goto('http://localhost:5181/')
  await p.evaluate(() => localStorage.setItem('legends-poker/save', JSON.stringify({
    player: { name: 'Tester', invitedAt: '2026-01-01' }, tables: {}, settings: { showLog: false } })))
  await p.goto(`http://localhost:5181/?pace=0.3&room=${room}#/intro/${table}`); await p.waitForTimeout(800)
  await p.click('button.primary'); await p.waitForTimeout(8000)
  await p.screenshot({ path: out }); await b.close()
})()
