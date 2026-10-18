// Bundles the engine + UI into one classic script so web/index.html can be
// opened straight from disk. IIFE, not ESM, precisely so file:// works.
import * as esbuild from 'esbuild'
import { fileURLToPath } from 'node:url'
import { patchesApplied } from './patches.mjs'

// Absolute, so the alias below resolves the same way regardless of platform
// or which directory npm happens to run us from.
const here = (p) => fileURLToPath(new URL(p, import.meta.url))

// A stale poker-ts patch builds and runs fine -- and pays pots to the wrong
// player. See patches.mjs.
if (!patchesApplied()) {
  console.error(
    'node_modules/poker-ts is not patched with this checkout\'s patches/.\n' +
      'Delete node_modules/poker-ts and run npm install, then build again.',
  )
  process.exit(1)
}

const watch = process.argv.includes('--watch')
const opts = {
  entryPoints: [here('app.ts')],
  bundle: true,
  format: 'iife',
  target: 'es2022',
  outfile: here('bundle.js'),
  sourcemap: true,
  logLevel: 'info',
  // poker-ts is a node package; these are the only two builtins it reaches for.
  alias: {
    crypto: here('shims/crypto.ts'),
    assert: here('shims/assert.ts'),
  },
}

if (watch) {
  const ctx = await esbuild.context(opts)
  await ctx.watch()
  console.log('watching...')
} else {
  await esbuild.build(opts)
}
