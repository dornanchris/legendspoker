// The launch screen's moving figures, as sprite sheets the page can play with
// CSS alone: the app shows them the moment the web view paints, before the
// game's script has even been read (index.html, #boot).
//
// Each figure plays one clip from rest back to rest (a clip ends where it
// started, so the loop has no seam), drawn frame by frame from the puppet bench
// with its idle life switched off, cropped to what moves above its own table
// line, laid out eight frames to a row, a frame that repeats the one before it
// kept once and held longer (launch.css times each one):
//   node web/build.mjs && node art-tools/build/launch_frames.cjs
// writes web/art/launch/<id>.webp, sheets.json and launch.css.
const { chromium } = require('/opt/node22/lib/node_modules/playwright')
const fs = require('fs')
const path = require('path')

// who, doing what. Death shuffles in the middle; one guest each side is
// picked at launch from the rest. A clip the tells hold is held here too.
const CAST = [
  { id: 'death', clip: 'shuffle', rest: 0.5 },
  { id: 'lincoln', clip: 'hat_tip', rest: 1.2 },
  { id: 'arthur', clip: 'cup', rest: 1.2 },
  { id: 'blackbeard', clip: 'smoke', rest: 1.2 },
  { id: 'cheshire_cat', clip: 'fade', rest: 1 },
  { id: 'socrates', clip: 'ceiling', rest: 1.2 },
  { id: 'dracula', clip: 'swirl', rest: 1.2 },
  { id: 'cyclops', clip: 'look_at_you', rest: 1.2 },
  { id: 'medusa', clip: 'look_at_you', rest: 1.2 },
]
const FPS = 12
const SCALE = 0.8           // of the full-size rig: a figure about 300 px tall, sharp on a phone
const COLS = 8
const BLINK_AT = 0.35       // a blink a little into the rest, so nobody stares

const root = path.resolve(__dirname, '../..')
const out = path.join(root, 'web/art/launch')
const PORT = 5199

;(async () => {
  fs.mkdirSync(out, { recursive: true })
  // served, not opened from disk: a canvas that draws file:// images cannot be read back
  const server = require('child_process').spawn(process.execPath, [path.join(root, 'web/serve.mjs')],
    { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' })
  await new Promise((ok) => setTimeout(ok, 800))
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch())
  const p = await b.newPage({ viewport: { width: 1400, height: 800 } })
  const errs = []
  p.on('pageerror', (e) => errs.push(String(e)))
  const sheets = {}
  for (const c of CAST) {
    await p.goto(`http://localhost:${PORT}/?launch=${c.id}#/puppet/${c.id}`)
    await p.waitForFunction(() => window.__puppet, null, { timeout: 30000 })
    const res = await p.evaluate(({ c, FPS, SCALE, COLS, BLINK_AT }) => {
      const pl = window.__puppet
      const step = pl.update.bind(pl)
      pl.update = () => {}          // the bench's own loop stops driving it
      pl.face.idle = false
      pl.face.gaze = 'ahead'
      pl.stop()
      const rig = pl.entry.rig
      const W = Math.round(rig.canvas.w * SCALE), H = Math.round(rig.tableLine * SCALE)   // the table hides the rest
      const dt = 1 / FPS
      const frames = []
      const draw = () => {
        const cv = document.createElement('canvas')
        cv.width = W; cv.height = H
        const ctx = cv.getContext('2d')
        ctx.imageSmoothingQuality = 'high'
        pl.puppet.draw(ctx, [SCALE, 0, 0, SCALE, 0, 0], { table: false })
        frames.push(cv)
      }
      // settle at rest, then the clip, then rest with one blink
      step(0.5)
      pl.play(c.clip)
      for (let t = 0; pl.timeOf(c.clip) >= 0 && t < 12; t += dt) { draw(); step(dt) }
      let blinked = false
      for (let t = 0; t < c.rest; t += dt) {
        if (!blinked && t >= BLINK_AT) { pl.face.blink(); blinked = true }
        draw(); step(dt)
      }
      // what any frame covers
      let x0 = W, y0 = H, x1 = 0, y1 = 0
      for (const cv of frames) {
        const d = cv.getContext('2d').getImageData(0, 0, W, H).data
        for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
          if (d[(y * W + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
        }
      }
      x0 = Math.max(0, x0 - 2); y0 = Math.max(0, y0 - 2); x1 = Math.min(W, x1 + 3); y1 = H
      const cw = x1 - x0, ch = y1 - y0
      // a frame like the one before it is that one held a tick longer
      const unique = [], hold = []
      let prev = null
      for (const cv of frames) {
        const d = cv.getContext('2d').getImageData(x0, y0, cw, ch).data
        let diff = 0
        if (prev) for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i + 3] - prev[i + 3]) > 24 || Math.abs(d[i] - prev[i]) > 24) diff++
        if (prev && diff < 12) { hold[hold.length - 1]++; continue }
        unique.push(cv); hold.push(1); prev = d
      }
      const rows = Math.ceil(unique.length / COLS)
      const sheet = document.createElement('canvas')
      sheet.width = cw * Math.min(COLS, unique.length); sheet.height = ch * rows
      const sx = sheet.getContext('2d')
      unique.forEach((cv, i) => sx.drawImage(cv, x0, y0, cw, ch, (i % COLS) * cw, Math.floor(i / COLS) * ch, cw, ch))
      return {
        data: sheet.toDataURL('image/webp', 0.82),
        meta: { frames: unique.length, cols: Math.min(COLS, unique.length), rows, w: cw, h: ch, fps: FPS, hold,
          // where the figure's own table line falls, from the top of a frame
          line: Math.round(rig.tableLine * SCALE - y0),
          // where the rig's own middle falls, from the left of a frame: a seat is placed by it
          cx: Math.round(rig.canvas.w / 2 * SCALE - x0), scale: SCALE },
      }
    }, { c, FPS, SCALE, COLS, BLINK_AT })
    fs.writeFileSync(path.join(out, c.id + '.webp'), Buffer.from(res.data.split(',')[1], 'base64'))
    sheets[c.id] = res.meta
    console.log(c.id, c.clip, JSON.stringify(res.meta), Math.round(fs.statSync(path.join(out, c.id + '.webp')).size / 1024) + ' KB')
  }
  fs.writeFileSync(path.join(out, 'sheets.json'), JSON.stringify(sheets) + '\n')
  fs.writeFileSync(path.join(out, 'launch.css'), css(sheets))
  console.log('errors', errs)
  await b.close()
  server.kill()
})()

// Where they sit: the White House room's own chairs (Death at his place, the
// guests at the 4-seat table's middle chairs), so the launch is the real
// table's camera. Design units are the room's 1600 x 900.
const SLOTS = { c: [800, 0.5, 2], l: [470, 0.52, 2], r: [1130, 0.52, 2] }

/** Each sheet as a class and its keyframes (a frame shown as many ticks as it holds), and its place in each chair. */
function css(sheets) {
  const room = JSON.parse(fs.readFileSync(path.join(root, 'web/art/rooms/white_house/room.json'), 'utf8'))
  const [DW, DH] = room.design
  const rimAt = (x) => {
    const r = room.rim, i = (x - r.x0) / r.step, a = Math.floor(i), f = i - a
    return r.y[a] * (1 - f) + r.y[Math.min(r.y.length - 1, a + 1)] * f
  }
  const pc = (v, of) => +(v / of * 100).toFixed(3) + '%'
  const t = room.table
  let o = '/* GENERATED by art-tools/build/launch_frames.cjs: the launch screen\'s figures and where they sit. */\n'
  o += `#boot .boot-table{left:${pc(t.x, DW)};top:${pc(t.y, DH)};width:${pc(t.w, DW)}}\n`
  for (const [id, m] of Object.entries(sheets)) {
    const ticks = m.hold.reduce((a, b) => a + b, 0)
    const pos = (i) => {
      const c = i % m.cols, r = Math.floor(i / m.cols)
      return `${m.cols > 1 ? +(c / (m.cols - 1) * 100).toFixed(3) : 0}% ${m.rows > 1 ? +(r / (m.rows - 1) * 100).toFixed(3) : 0}%`
    }
    o += `.lf-${id}{aspect-ratio:${m.w}/${m.h};background-image:url(${id}.webp);`
      + `background-size:${m.cols * 100}% ${m.rows * 100}%;animation:lf-${id} ${(ticks / m.fps).toFixed(2)}s step-end infinite}\n`
    o += `@keyframes lf-${id}{`
    let at = 0
    m.hold.forEach((n, i) => { o += `${+(at / ticks * 100).toFixed(3)}%{background-position:${pos(i)}}`; at += n })
    o += `100%{background-position:${pos(m.hold.length - 1)}}}\n`
    for (const [slot, [x, sc, sink]] of Object.entries(SLOTS)) {
      if ((slot === 'c') !== (id === 'death')) continue
      const k = sc / m.scale                       // sheet px -> design units
      const cx = slot === 'r' ? m.w - m.cx : m.cx  // the right chair is mirrored about the rig's middle
      o += `#boot .s-${slot}.lf-${id}{left:${pc(x - cx * k, DW)};top:${pc(rimAt(x) + sink - m.line * k, DH)};width:${pc(m.w * k, DW)}}\n`
    }
  }
  return o
}
