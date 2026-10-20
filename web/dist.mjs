// Assembles dist/: only what the game loads, for the app (Capacitor copies
// dist/ into the iOS project). web/ itself is ~800 MB, nearly all of it the
// full-size puppet images the bench (#/puppet/<id>) uses for close-ups; the
// table loads the half-size copies. So the app has no bench.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const WEB = resolve(fileURLToPath(new URL('.', import.meta.url)))
const OUT = resolve(WEB, '..', 'dist')

if (!existsSync(join(WEB, 'bundle.js'))) {
  console.error('web/bundle.js is missing: run npm run build:web first.')
  process.exit(1)
}

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
const copy = (rel) => cpSync(join(WEB, rel), join(OUT, rel), { recursive: true })

for (const f of ['index.html', 'style.css', 'bundle.js']) copy(f)
copy('art/rooms')
// Each puppet: its half-size images (with the Stranger's accent masks) and
// the curtain call's portrait. rig.json and anim.json are in the bundle.
for (const id of readdirSync(join(WEB, 'art'))) {
  if (id === 'rooms' || !statSync(join(WEB, 'art', id)).isDirectory()) continue
  for (const rel of [`art/${id}/half`, `art/${id}/portrait.webp`]) {
    if (existsSync(join(WEB, rel))) copy(rel)
  }
}

const size = (dir) => readdirSync(dir, { withFileTypes: true })
  .reduce((n, e) => n + (e.isDirectory() ? size(join(dir, e.name)) : statSync(join(dir, e.name)).size), 0)
console.log(`dist/ ready: ${(size(OUT) / 1e6).toFixed(0)} MB`)
