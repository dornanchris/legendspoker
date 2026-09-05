import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute, so the aliases below resolve the same way regardless of platform
// or which directory npm happens to run from. On Windows,
// `new URL('.', import.meta.url).pathname` yields "/D:/..." -- a leading slash
// that path-joins into "\D:\..." and resolves nothing.
const here = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  // The app lives in web/; the engine in src/ is imported across that boundary
  // and Vite allows it because the workspace root is the repo, not web/.
  root: 'web',
  // RELATIVE, not '/'. GitHub Pages serves a project site from a subpath --
  // /legendspoker/ -- so absolute asset URLs 404 there while working perfectly
  // on localhost, which is the worst way to find out. Relative works for both,
  // and for a file:// open too.
  base: './',
  // Capacitor copies whatever webDir points at, so the build lands outside the
  // source tree rather than inside it.
  build: { outDir: '../dist', emptyOutDir: true, sourcemap: true },
  plugins: [react()],
  resolve: {
    alias: {
      // poker-ts is a node package; these are the only two builtins it reaches
      // for. util/array.js does `require("crypto")` at module load whether or
      // not the default shuffle is ever called, so the alias is load-bearing
      // even though the deal is seeded and that shuffle is never used.
      crypto: here('web/shims/crypto.ts'),
      assert: here('web/shims/assert.ts'),
    },
  },
  server: {
    // Listen on the LAN so a phone can open the dev server directly. Phase 4's
    // exit test is "the game running on a real device", and this is the
    // cheapest way to get there before an APK exists.
    host: true,
    port: 5173,
  },
})
