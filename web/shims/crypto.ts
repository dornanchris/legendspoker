/**
 * Browser stand-in for the two things poker-ts uses from node:crypto.
 *
 * Quality matters here -- this shuffles the deck -- so it draws from Web
 * Crypto rather than Math.random, and rejects out-of-range samples instead of
 * taking a modulus, which would bias low values.
 *
 * Still required even though the deal is now seeded: poker-ts's util/array.js
 * does `require("crypto")` at module load, so the import has to resolve in a
 * browser whether or not the default shuffle is ever called. The game injects
 * its own seeded shuffle and never reaches randomInt below.
 */
export function randomInt(max: number): number {
  if (max <= 0) throw new RangeError('max must be positive')
  const range = Math.ceil(max)
  // Smallest byte count that covers the range, then reject the tail so every
  // value is equally likely.
  const bytes = Math.ceil(Math.log2(range) / 8) || 1
  const limit = Math.floor(256 ** bytes / range) * range
  const buf = new Uint8Array(bytes)
  for (;;) {
    crypto.getRandomValues(buf)
    let n = 0
    for (const b of buf) n = n * 256 + b
    if (n < limit) return n % range
  }
}

export default { randomInt }
