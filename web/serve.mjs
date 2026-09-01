// Twelve lines of static file server so the table can be opened in a browser.
// Not a dependency, not a framework, and not shipped -- Phase 4 replaces it
// with Vite.
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const ROOT = new URL('.', import.meta.url).pathname
const PORT = Number(process.env.PORT ?? 5173)
const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.map': 'application/json', '.json': 'application/json',
}

createServer(async (req, res) => {
  const rel = normalize(decodeURI((req.url ?? '/').split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  const file = join(ROOT, rel === '/' ? 'index.html' : rel)
  try {
    const body = await readFile(file)
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('not found')
  }
}).listen(PORT, () => console.log(`table at http://localhost:${PORT}`))
