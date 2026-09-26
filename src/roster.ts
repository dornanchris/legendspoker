/**
 * Writes ROSTER.md: the casting book, generated from data/.
 *
 * The in-game Ledger is the player's notebook and deliberately hides the
 * machinery. This is the developer's: every character's dials, quirks, tell
 * vocabulary, art notes and copyright traps on one page, plus each table's
 * room and staging. Generated rather than hand-kept so it cannot drift from
 * the data the game actually plays.
 *
 *   npm run roster
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { CHARACTERS, TABLES, DIALOGUE, fullCast, type CharacterData } from './content.js'
import { QUIRKS } from './quirks.js'

const out: string[] = []
const w = (s = '') => out.push(s)

const dial = (n: number) => n.toFixed(2).replace(/^0/, '')
const quirkLine = (q: CharacterData['quirks'][number]) => {
  const { type, ...params } = q
  const args = Object.entries(params).map(([k, v]) => `${k} ${v}`).join(', ')
  return `\`${type}\`${args ? ` (${args})` : ''} — ${QUIRKS[type]?.summary ?? '?'}`
}

w('# ROSTER — the casting book')
w()
w('> Generated from `data/` by `npm run roster`. Do not edit by hand: edit the')
w('> JSON and regenerate. The player-facing version of this is the in-game Ledger.')
w()
w('Dials are 0–1. **noise** is the noise-to-signal dial (legibility goes DOWN as')
w('the tour goes on). A tell\'s reliability is how often it is honest; below 0.5')
w('it mostly lies. Everything under "Look" and "Public domain" is for the art')
w('pass and never appears in the game.')
w()

for (const t of TABLES) {
  const d = DIALOGUE[t.id]
  w(`## ${t.position}. ${t.name}`)
  w()
  w(`*${t.place} · ${t.region} · ${t.era}*`)
  w()
  w(`**Hook.** ${t.hook}`)
  w()
  w(`**Room.** ${t.room}`)
  w()
  w(`**Entrance.** ${t.entrance}`)
  if (t.presence) w(`\n**Before the arrival.** ${t.presence}`)
  w()
  w(`**Music.** ${t.music} **Ambience:** ${t.ambience.join(', ')}.`)
  w()
  const names = d?.earned_names
  if (names) w(`**Earned names.** nobody → “${names.tier_1}” → *your name* → “${names.tier_3}”`)
  w()
  w(`Buy-in ${t.buyIn}, blinds up every ${t.handsPerLevel} hands` +
    (t.arrival ? `. ${CHARACTERS[t.arrival.character]?.name} arrives ${t.arrival.afterEliminationOf
      ? `when ${CHARACTERS[t.arrival.afterEliminationOf]?.short} is eliminated`
      : `after ${t.arrival.afterEliminations} elimination${t.arrival.afterEliminations === 1 ? '' : 's'}`}` +
      `${t.arrival.delayHands ? ` + ${t.arrival.delayHands} hands (missable)` : ''}, bringing the average stack.` : '.'))
  w()
  if (t.kind !== 'tour') {
    w(`Seats: ${fullCast(t).map((id) => CHARACTERS[id]?.name).join(', ')}.`)
    w()
    continue
  }
  for (const id of fullCast(t)) {
    const c = CHARACTERS[id]
    const p = c.profile
    w(`### ${c.name}${c.epithet ? ` — *${c.epithet}*` : ''}`)
    w()
    w(`${c.role === 'champion' ? '**Champion.** ' : ''}${c.arrives ? '**Arrives late.** ' : ''}${c.origin} · ${c.era}`)
    w()
    w(`> ${p.ledger}`)
    w()
    for (const para of p.history) { w(para); w() }
    w(`**At the table.** ${p.at_the_table}`)
    w()
    const dl = c.dials
    w(`| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |`)
    w(`|---|---|---|---|---|---|---|`)
    w(`| ${dial(dl.aggression)} | ${dial(dl.tightness)} | ${dial(dl.bluffFrequency)} | ${dial(dl.tiltSensitivity)} | ${dial(dl.adaptivity)} | ${dial(dl.betRespect)} | ${dial(dl.noise)} |`)
    w()
    for (const q of c.quirks) w(`- Quirk: ${quirkLine(q)}`)
    for (const tl of c.tells) w(`- Tell (${tl.correlate}, ${tl.reliability}): *${tl.text}*`)
    if (c.idles.length) w(`- Idle noise: ${c.idles.map((x) => `*${x}*`).join('; ')}`)
    w()
    w(`**Look.** ${p.look} **Prop:** ${p.prop}.`)
    w()
    w(`**Public domain.** ${p.public_domain}`)
    w()
  }
}

const death = CHARACTERS.death
if (death) {
  w('## The Dealer')
  w()
  w(`### ${death.name}${death.epithet ? ` — *${death.epithet}*` : ''}`)
  w()
  w(`> ${death.profile.ledger}`)
  w()
  for (const para of death.profile.history) { w(para); w() }
  w(`**At the table.** ${death.profile.at_the_table}`)
  w()
  w(`No tells, no noise: the endpoint of the legibility curve. Quirks: ${death.quirks.map(quirkLine).join('; ')}.`)
  w()
  w(`**Look.** ${death.profile.look} **Prop:** ${death.profile.prop}.`)
  w()
  w(`**Public domain.** ${death.profile.public_domain}`)
  w()
}

const target = fileURLToPath(new URL('../ROSTER.md', import.meta.url))
writeFileSync(target, out.join('\n'))
console.log(`wrote ${target} (${Object.keys(CHARACTERS).length} characters, ${TABLES.length} tables)`)
