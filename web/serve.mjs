// A static file server so the table can be opened in a browser. Not a
// dependency, not a framework, and not shipped -- Phase 4 replaces it with
// Vite.
import { createServer } from 'node:http'
import { readFile, access } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

// fileURLToPath, NOT new URL(...).pathname: on Windows the latter yields
// "/D:/legendspoker/web/" with a leading slash, which path joins into
// "\D:\legendspoker\web\index.html" and every single request 404s.
const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)))
const PORT = Number(process.env.PORT ?? 5173)
const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.map': 'application/json', '.json': 'application/json',
}

createServer(async (req, res) => {
  const send = (code, body, type = 'text/plain') => {
    // Log every request. A bare "not found" in the browser with no way to see
    // what was asked for is a miserable thing to debug, especially across
    // platforms.
    console.log(`  ${code}  ${req.method} ${req.url}`)
    res.writeHead(code, { 'content-type': type })
    res.end(body)
  }
  let file
  try {
    const url = decodeURI((req.url ?? '/').split('?')[0])
    file = resolve(ROOT, '.' + (url === '/' ? '/index.html' : url))
  } catch {
    return send(400, 'bad request')
  }
  // Keep the server inside its own directory even if a path escapes upward.
  if (file !== ROOT && !file.startsWith(ROOT + sep)) return send(403, 'forbidden')

  try {
    const body = await readFile(file)
    send(200, body, TYPES[extname(file)] ?? 'application/octet-stream')
  } catch {
    send(404, 'not found')
  }
}).listen(PORT, async () => {
  // If ROOT is wrong, say so at boot rather than 404ing every request and
  // leaving the cause invisible.
  try {
    await access(resolve(ROOT, 'index.html'))
  } catch {
    console.error(`WARNING: no index.html under ${ROOT}`)
    console.error('The server is looking in the wrong place; every request will 404.')
  }
  console.log(`serving ${ROOT}`)
  console.log(`table at http://localhost:${PORT}`)
})
