// Is node_modules patched with the patches/ in this checkout?
//
// The web build bundles poker-ts from node_modules, patches and all. When a
// pull changes patches/, `npm install` does not reinstall poker-ts -- the
// version is unchanged -- so patch-package tries to lay the NEW patch over
// the OLD one and fails (or, without --error-on-fail, exits 0 and the old
// engine ships: that is how a flush lost to a pair of tens after the side-pot
// fix had landed). So postinstall puts every patched package back as
// published before patching it again, and stamps node_modules with a digest
// of patches/ once they apply; the build refuses to run against any other
// stamp.
//
//   node web/patches.mjs install   (postinstall: restore if stale, patch, stamp)
import { createHash } from 'node:crypto'
import { execFileSync, execSync } from 'node:child_process'
import {
  mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gunzipSync } from 'node:zlib'

const root = fileURLToPath(new URL('..', import.meta.url))
const stampFile = join(root, 'node_modules', '.patches-applied')
const patchDir = join(root, 'patches')

const patchFiles = () => readdirSync(patchDir).filter((n) => n.endsWith('.patch')).sort()

function digest() {
  const hash = createHash('sha256')
  for (const name of patchFiles()) {
    // Line endings ignored: git on Windows may check the patches out CRLF.
    hash.update(name + '\n' + readFileSync(join(patchDir, name), 'utf8').replace(/\r\n/g, '\n'))
  }
  return hash.digest('hex')
}

function readStamp() {
  try {
    return readFileSync(stampFile, 'utf8').trim()
  } catch {
    return null
  }
}

export function patchesApplied() {
  return readStamp() === digest()
}

// patch-package names a patch <name>+<version>.patch (a scope's slash is a +).
function packages() {
  return patchFiles().map((file) => {
    const parts = file.slice(0, -'.patch'.length).split('+')
    return { name: parts.slice(0, -1).join('/'), version: parts.at(-1) }
  })
}

// Put a package back exactly as published: the tarball the lockfile names
// (npm's cache has it from the install), unpacked over the old copy.
function restore({ name, version }) {
  const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'))
  const spec = lock.packages?.[`node_modules/${name}`]?.resolved ?? `${name}@${version}`
  const tmp = mkdtempSync(join(tmpdir(), 'legends-patch-'))
  try {
    const out = execSync(`npm pack "${spec}" --json --pack-destination "${tmp}"`, {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'],
    })
    const tgz = join(tmp, JSON.parse(out)[0].filename)
    const dir = join(root, 'node_modules', name)
    // Its own node_modules, if npm nested any dependencies there, stays.
    for (const entry of readdirSync(dir)) {
      if (entry !== 'node_modules') rmSync(join(dir, entry), { recursive: true, force: true })
    }
    untar(gunzipSync(readFileSync(tgz)), dir)
    console.log(`Restored ${name}@${version} as published.`)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}

// Just enough tar for an npm tarball: plain files, ustar prefixes, pax paths,
// and the leading package/ folder stripped.
function untar(buf, dest) {
  const str = (at, len) => buf.toString('utf8', at, at + len).replace(/\0.*$/s, '')
  let paxPath = null
  for (let at = 0; at + 512 <= buf.length; ) {
    if (buf[at] === 0) break
    const size = parseInt(str(at + 124, 12).trim(), 8) || 0
    const type = String.fromCharCode(buf[at + 156])
    const body = buf.subarray(at + 512, at + 512 + size)
    const prefix = str(at + 345, 155)
    const path = paxPath ?? (prefix ? prefix + '/' : '') + str(at, 100)
    at += 512 + Math.ceil(size / 512) * 512
    if (type === 'x') {
      paxPath = /(?:^|\n)\d+ path=([^\n]*)\n/.exec(body.toString('utf8'))?.[1] ?? null
      continue
    }
    paxPath = null
    if (type !== '0' && type !== '\0') continue
    const rel = path.split('/').slice(1).join('/')
    if (!rel || rel.split('/').includes('..')) continue
    const file = join(dest, rel)
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, body)
  }
}

// quiet: keep patch-package's output back unless it succeeds (a first try
// that fails and is then put right needs no alarming ERROR in the log).
function patch(quiet = false) {
  const bin = join(root, 'node_modules', 'patch-package', 'index.js')
  const args = [bin, '--error-on-fail']
  if (!quiet) return execFileSync(process.execPath, args, { cwd: root, stdio: 'inherit' })
  process.stdout.write(execFileSync(process.execPath, args, { cwd: root, encoding: 'utf8', stdio: 'pipe' }))
}

if (process.argv[2] === 'install') {
  const stamp = readStamp()
  if (stamp && stamp !== digest()) {
    // Patched before, with other patches: the old ones are still in there.
    console.log('patches/ has changed since node_modules was patched.')
    packages().forEach(restore)
    patch()
  } else {
    try {
      patch(true)
    } catch {
      // No stamp, so no telling what is in there (a checkout from before the
      // stamp, or a patch half laid over another). Start from published.
      console.log('Patching failed; restoring the patched packages and trying again.')
      packages().forEach(restore)
      patch()
    }
  }
  writeFileSync(stampFile, digest() + '\n')
}
