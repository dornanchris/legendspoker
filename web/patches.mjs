// Is node_modules patched with the patches/ in this checkout?
//
// The web build bundles poker-ts from node_modules, patches and all. When a
// pull changes patches/, `npm install` does not reinstall poker-ts -- the
// version is unchanged -- so patch-package tries to lay the NEW patch over
// the OLD one, fails, and (locally) still exits 0. The old engine then ships:
// that is how a flush lost to a pair of tens after the side-pot fix had
// landed. So postinstall stamps node_modules with a digest of patches/ once
// they apply, and the build refuses to run against any other stamp.
//
//   node web/patches.mjs stamp   (postinstall, after patch-package succeeds)
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const stampFile = join(root, 'node_modules', '.patches-applied')

function digest() {
  const hash = createHash('sha256')
  const dir = join(root, 'patches')
  for (const name of readdirSync(dir).filter((n) => n.endsWith('.patch')).sort()) {
    // Line endings ignored: git on Windows may check the patches out CRLF.
    hash.update(name + '\n' + readFileSync(join(dir, name), 'utf8').replace(/\r\n/g, '\n'))
  }
  return hash.digest('hex')
}

export function patchesApplied() {
  try {
    return readFileSync(stampFile, 'utf8').trim() === digest()
  } catch {
    return false
  }
}

if (process.argv[2] === 'stamp') writeFileSync(stampFile, digest() + '\n')
