// Bundles the engine + UI into one classic script so web/index.html can be
// opened straight from disk. IIFE, not ESM, precisely so file:// works.
import * as esbuild from 'esbuild'

const watch = process.argv.includes('--watch')
const opts = {
  entryPoints: ['web/app.ts'],
  bundle: true,
  format: 'iife',
  target: 'es2022',
  outfile: 'web/bundle.js',
  sourcemap: true,
  logLevel: 'info',
  // poker-ts is a node package; these are the only two builtins it reaches for.
  alias: {
    crypto: './web/shims/crypto.ts',
    assert: './web/shims/assert.ts',
  },
}

if (watch) {
  const ctx = await esbuild.context(opts)
  await ctx.watch()
  console.log('watching...')
} else {
  await esbuild.build(opts)
}
