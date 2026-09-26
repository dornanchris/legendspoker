# Legends Poker: Death's Invitational

A single-player, character-driven Texas Hold'em "world tour". Eight themed
tables of legends from history, myth and public-domain literature, one dealer
at every table — Death — and a finale where the dealer sits down. Spiritual
successor to *Imagine Poker* (Candywriter, 2008).

The design lives in [`character-poker-design-doc.md`](character-poker-design-doc.md),
the build order in [`BUILD-PLAN.md`](BUILD-PLAN.md), and the rules every session
must follow in [`CLAUDE.md`](CLAUDE.md). The casting book — every character's
dials, tells, history and art notes — is [`ROSTER.md`](ROSTER.md).

## Play it

```bash
npm install          # also applies patches/ -- do not skip it
npm run web          # build + serve at http://localhost:5173
```

Landscape only. Add `?pace=0.2` to the URL to speed the presentation up for
testing; it scales the display clock and nothing else.

What is in it today:

- **The whole tour, playable.** Eight story tables, two Champions' Tables and
  the finale, each an elimination tournament. Late champions arrive the way the
  design doc stages them: Odysseus ten hands after the first bust (clear Athens
  first and you miss him), Caesar the moment a chair empties, Dracula after two
  eliminations, and the station's intelligence in the Robot's body.
- **Dialogue.** ~940 lines: Death's table intros, the one "the dealer arranged
  it" plant per table, banter between pairs who have history, lines aimed at
  you that change as the table's respect for you grows, bust-out lines, and
  Holmes reading *your* habits back to you. All of it is **draft**: written,
  checked, but not yet edited by a human.
- **Respect, not XP.** Each table calls you nothing, then a nickname, then your
  name, then a title — announced when it flips, remembered per table.
- **The Ledger.** Death's book: a page for everyone you meet (who they were,
  how they play, what you have seen them do), the tables, your account, the
  house rules, and **marks** — the game's achievements, written as entries in
  his book rather than a trophy cabinet.
- **Save and resume, mid-hand.** Leave any table and come back to exactly the
  same card. A saved seat is a seed plus your decisions; resuming replays it.
- **Fast-forward** once you are out of a hand. Presentation only; it stops by
  itself at the showdown.

Not yet: art (characters are initials in a medallion until the Rive puppets
exist), audio, the Capacitor phone build, multiplayer.

## Checks

```bash
npm run check          # typecheck + all four checks below
npm run check:data     # every character, table, line and mark is well-formed
npm run check:pots     # the poker-ts side-pot patch is applied and working
npm run check:replay   # save mid-hand, restore, play on: identical to the end
npm run check:loki     # a hidden event, forced and checked (spoilers inside)
```

## Tuning and tools

```bash
npm run sim 5000               # the Phase 2 balance instrument (frozen cast)
npm run sim 5000 white_house   # one tour table's whole cast, cash mode
npm run sim 3000 all           # every tour table
npm run tourney 100            # Phase 3a exit test: every table must end
npm run tourney 100 athens     # one tour table as it is played, arrivals included
npm run play 5                 # watch a few hands in the terminal, with tells
npm run roster                 # regenerate ROSTER.md from data/
```

Read the spread, not the absolute numbers, and **never tune on fewer than a
few thousand hands** — win rates swing wildly below that.

The four archetype targets (VPIP = % of hands played, AF = raises per call):

| Style | VPIP | AF |
|---|---|---|
| Tight-passive rock | 15–25 | < 1 |
| Calling station | 60–80 | < 0.5 |
| Loose-aggressive | 50–70 | > 2.5 |
| Tight-aggressive | 20–30 | > 2 |

## How characters work

**One decision function for everyone.** `src/decide.ts` never branches on who
is playing. Personality is data: five dials (`aggression`, `tightness`,
`bluffFrequency`, `tiltSensitivity`, `adaptivity`), a `noise` dial for how much
meaningless fidgeting buries their real tells, one or two **quirks** from the
generic library in `src/quirks.ts`, and a vocabulary of tells and idles. A new
character is a JSON file in `data/characters/` and one import line in
`src/content.ts`.

**Tells are signal plus noise.** Each tell has a reliability below 1, so some
fire honestly and some mislead; idles and ambient repeats of the tells
themselves fire at a rate set by `noise`. Early tables fidget little, so their
real tells stand out; late tables bury them; Death has none at all.

## Layout

```
src/          engine (poker-ts wrapper, decide, quirks, equity, rng) and the
              pure game logic around it: content loader, tour rules, the
              director (dialogue/respect/marks), marks, save schema, checks
data/         characters/, tables/, dialogue/, marks.json, story.json
web/          the shell: app.ts (router), store.ts (saves), screens/, style.css
art-tools/    parts-sheet splitter and puppet preview for the Rive pipeline
patches/      the poker-ts fixes (side pots, seedable deck) -- load-bearing
```
