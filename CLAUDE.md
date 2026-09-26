# CLAUDE.md — Legends Poker: Death's Invitational

Read this before touching anything. It is the short version of the decisions
that are already settled, so we don't re-litigate them every session.

## WHAT THIS IS

A single-player, character-driven Texas Hold'em "world tour". Eight themed
tables of recognizable legends, one recurring dealer (Death), who is revealed
as the final opponent. Spiritual successor to *Imagine Poker* (Candywriter,
2008). Full design rationale lives in `character-poker-design-doc.md` — read
it before proposing anything about roster, story, or tone.

**Context that governs scope:** $0 budget, solo dev, side project, not
expected to make money. Prefer the cheap, boring, working solution. Do not
add infrastructure for problems we don't have yet.

## NON-NEGOTIABLE RULES

1. **`decide()` NEVER branches on character identity.** There is exactly one
   decision function shared by every character. Personality lives entirely in
   data (dials + quirks). If you find yourself writing `if (id === 'dracula')`
   in `decide.ts`, the answer is a new dial or a quirk, not a branch. This is
   what makes 40 characters affordable.

2. **Tells are signal-plus-noise, never deterministic.** No single animation
   means anything on its own. Meaning lives only in *combinations* that pay
   off *during a live hand*. Everything else is deliberate ambient noise. A
   tell the player can learn once and be done with is a bug.

3. **Multiplayer avatar emotes must have ZERO correlation to the player's
   hand.** In single-player, tells are honest signals. In multiplayer, a tell
   tied to your real cards is an information leak that plays you against
   yourself. Cosmetic loop only, and ideally a different animation set so
   players don't try to read noise.

4. **Landscape orientation only.** Locked. Four opponents plus dealer plus
   your seat plus board plus controls does not fit portrait. Do not design,
   lay out, or prototype for portrait.

5. **Public domain only.** Every character must be verifiably out of
   copyright. Modern franchises (Star Wars, Star Trek, Alien, Doctor Who,
   Terminator, HAL 9000) are forbidden. See `ASSETS.md`.

6. **Fast-forward is PRESENTATION ONLY — never simulation.** The hand must
   resolve identically whether or not the player is fast-forwarding: same RNG
   draws, same decisions, same order. Speed scales the *presentation clock*
   (chip tweens, card timing, thinking pauses), never the game loop. Coupling
   these will produce desyncs and non-reproducible hands — this is a bug
   waiting to happen, so keep the two clocks separate from the start.
   - Voice lines are **cut** (not sped up or truncated) while fast-forwarding.
     Half-played speech sounds broken; silence reads as intentional.
   - Auto-cancels at the **showdown reveal** — NOT at pot collection. The
     reveal is where the player learns how an opponent played a hand they
     folded to, and it's the main source of reads on opponents. Also cancels
     when new cards are dealt.
   - Idle animations keep running at normal rate. Characters breathe normally
     while the chips fly.
   - Rationale: folded hands are the only pressure-free time the player has
     to study tells. A control that blanks the table would quietly gut the
     core mechanic. It's a fast-forward, not a skip.

## NOT BUILDING (do not add these back)

No chat, no quick chat, no emote button, no XP/levels/reputation score, no
reward-progress bars, no daily rewards, no energy, no currency, no IAP, no ads,
no leaderboards, no separate tutorial mode. These came from AI-generated
concept mockups importing free-to-play scaffolding from other poker apps.
Progression is **respect** (diegetic, per-table); unlocks come from beating
characters. If a UI element doesn't serve reading opponents, the tour, or the
story, it's noise on an already-busy landscape screen.

## REPO LAYOUT

```
src/
  equity.ts       hand strength: Chen-ish preflop, Monte Carlo postflop
  personality.ts  Personality/Quirk/Tell types + the FROZEN Phase 2 cast
  quirks.ts       the generic, parameterised quirk library (data picks them)
  decide.ts       THE shared decision function. Read this first.
  game.ts         loop over poker-ts; stats, tilt, events, late ARRIVALS
  rng.ts          the one seeded RNG; state() is what makes saves resumable
  content.ts      loads data/ and builds Personalities; the only file that
                  knows where content lives (explicit imports, see gotchas)
  tour.ts         pure tour rules: unlocks, respect tiers, earned names
  director.ts     one sitting as the ROOM sees it: dialogue, respect flips,
                  marks, observations. Own seeded RNG. Event-driven.
  marks.ts        mark (achievement) conditions, generic over data/marks.json
  save.ts         the save schema; mid-table state = seed + decision log
  sim.ts          `npm run sim [hands] [table|all]` — balance test (cash)
  play.ts         `npm run play [hands]` — watchable CLI with tells
  tourney.ts      `npm run tourney [tables] [table]` — every table must end
  pot-conservation.ts `npm run check:pots` — guards the poker-ts pot patch:
                  chips conserved AND paid to the right player
  hand-check.ts   `npm run check:hands` — poker-ts ranks hands as pokersolver does
  data-check.ts   `npm run check:data` — the type checker for content
  replay-check.ts `npm run check:replay` — save mid-hand, resume, identical
  roster.ts       `npm run roster` — regenerates ROSTER.md from data/
  reads.ts        `npm run reads` — how each character reads a bet (a report)
data/
  characters/     one file per character: dials, quirks, tells, idles, profile
  tables/         one file per table: seats, champion, arrival, room, hook
  dialogue/       one file per table + dealer.json (Death's general lines)
  marks.json      the ledger's marks (achievements), with generic conditions
  story.json      the invitation, the ending, the epigraph
web/
  app.ts          boot + hash router (#/tour, #/ledger/..., works from file://)
  store.ts        the Save in localStorage, guarded; live-only persistence
  screens/        title, invitation, map+intro, table, results, ledger,
                  settings+about, ending. table.ts keeps the 3b presentation queue
  fx.ts           flights: cards out of Death's hands, chips across the felt
  sound.ts        card/chip sounds SYNTHESISED with Web Audio (no files)
  index.html      markup; style.css is landscape-only by design
  shims/          browser stand-ins for the node builtins poker-ts needs
  build.mjs       esbuild -> web/bundle.js (gitignored, regenerate it)
  serve.mjs       dependency-free static server; Phase 4 replaces it with Vite
ROSTER.md         GENERATED casting book: never edit by hand
art-tools/
  split_parts.py  cuts an AI-generated parts sheet into layers + parts.json
  build_puppet.py init/render a layout to preview puppet assembly
  dracula_parts/  41 split Dracula layers (incomplete — see gaps)
MOTION-SPEC.md    the animation parts list, tagged MECH/IDLE/BEAT/TELL
ASSETS.md         every free/CC0 source + licensing traps
```

Stack: Node 22, TypeScript, ESM, run via `tsx`. `poker-ts` v1.5.0 for rules
(exports a **named** `Table`, not default), `pokersolver` v2.1.4 for eval.

## CURRENT STATE

**Working:** the engine. Phases 1 and 2 are complete and pass their exit test
— three distinct play profiles emerge from one shared function. Representative
1000-hand run: Dracula VPIP 33.7 / AF 0.66 (tight trapper), Snowman VPIP 74.5
/ AF 0.24 (calling station), Cleopatra VPIP 62.7 / AF 3.18 (aggressive).
After bets started being read (ENGINE_VERSION 3), `npm run sim 2000`: Dracula
35.2 / 0.73, Snowman 75.1 / 0.23, Cleopatra 63.7 / 3.54 -- same three people.

**Phase 3a is complete: the tournament model.** Stacks persist, players are
eliminated, blinds climb every 25 hands, and a table ends when one player
holds every chip. 100/100 tables terminate with zero stalls. `decide()` now
has a stack-depth term, so short stacks widen and push instead of folding
their way to death; it is neutral above 20bb, which is why the cash profiles
above are unchanged.

**Phase 3b is built: human seat + throwaway DOM table.** (It was played
against the frozen Phase 2 cast; the tour tables have since replaced that
cast in the web build — see below.) Action buttons are built from the
engine's legal actions, and the engine rejects an illegal action outright
rather than trusting the UI.

The piece worth keeping when this UI is thrown away is the **presentation
queue**, now in `web/screens/table.ts`: the engine resolves as fast as it can and pushes
events, the UI plays them back on its own clock, and the only place they meet
is a one-way wait before the player is asked to act. That is the separation
Phase 6's fast-forward needs. `?pace=0.1` scales the presentation clock and
nothing else — the hand resolves identically at any speed.

**Phase 3b's exit test is PASSED.** Played voluntarily, the three read as
different people without reading the code: Cleopatra smart, Dracula patient,
the Snowman calls everything — which maps exactly onto loose-aggressive-
adaptive, tight-passive trapper, and calling station. That is the whole
data-driven personality thesis confirmed by a person rather than a stats
table, and it is what makes character #33 nearly free.

**The shell, the tour and the save schema are built — ahead of the plan's
order, at the owner's request.** This is Phase 4's "screen shell early"
plus a first pass of Phase 7 and 9 *content*, all still without art:

- **Screens:** title → invitation (sign your name; onboarding without a
  tutorial) → tour map → table intro (Death's narration) → table → results →
  ledger / settings / about → ending. Hash-routed plain DOM, no framework.
- **All 11 tables playable:** the 8 story tables, Champions' Tables I and II
  ("The Hall of Doors"), and the finale ("The Last Crossing", hidden from the
  map until it opens). 35 roster characters + Death, all data. Late champions
  arrive per the design doc via `Arrival` rules in `game.ts`; Odysseus is
  missable. The Green Knight keeps his appointment: knocked out, he retakes
  his chair 50 hands later if the table is still going, at any table he sits
  at (`returns` in his character file; an Arrival whose `afterEliminationOf`
  is himself, so the event has `replaces === id`). Open tables (random play) unlock at cleared tables and seat a mix of anyone
  the player has beaten, champions included, one chair kept for the room.
- **Dialogue system:** `src/director.ts` plays the established schema — intro,
  the one plant, pair banter, tiered player-directed lines, Death's asides,
  arrivals, heads-up, bust-outs, defeat — plus Holmes's `reads_you` (lines
  keyed to the PLAYER's observed habits: his signature, as data). ~940 lines,
  **all draft**, written to the design doc's rules, not yet human-edited.
- **Respect:** per table, points from pots / showdowns / knockouts, tiers at
  4 / 10 / 18, heads-up with the champion forces tier 2, a win forces tier 3.
  The name flip is always announced (toast + the tier's first line).
- **The Ledger:** character pages (history, how they play in Death's voice,
  what YOU have seen them do in words, habits noted), venues, account,
  house rules, and **marks** — 36 achievements framed as Death's entries.
- **Save/resume:** `npm run check:replay` is the exit test the plan asked
  for — save mid-hand, restore, play on, identical — and it passes on every
  table. Saved seats carry `ENGINE_VERSION`; see gotchas.
- **Noise dial:** exists (`noise`, 0–1). Presentation-only: an ambient idle
  scheduler shows idles and tell texts at that rate. Death is 0 with no tells.
- **Fast-forward:** offered when folded / all in; presentation clock only;
  lines are cut, not sped; cancels at the showdown reveal and new deals.
- **Table motion and sound (an early slice of Phase 6):** Death shuffles and
  deals every card to every seat; blinds and bets slide from a stack to a
  chip pile in front of the seat; each street rakes them into the pot; the
  flop lands as three and turns one at a time; showdown hands flip over; an
  all-in is revealed FIRST and the board then runs out a street at a time;
  the pot slides to the winner. Every movement is on the presentation clock
  (pace and fast-forward scale it), zero in a resume replay and under
  Reduce motion. Sounds (riffle, deal, flip, chip clacks scaled to the bet,
  a knock for a check, muck, rake, your-turn) are generated, not recorded,
  with pitch jitter on every play; Settings has Sound and Volume. Audio
  unlocks on the first tap or key press anywhere.
- A pot nobody called is won **without showing**: the winner's cards stay
  face down. (The screen used to turn them up, a free read.)

**Not started:** Rive integration, recorded audio and music, Capacitor + a
real device.

## KNOWN GAPS AND SIMPLIFICATIONS

- **The tell model is still one-signal-per-decision** (`emitTell`) plus
  ambient noise. The design doc's real model — meaning only in COMBINATIONS
  during a live hand — is Phase 7's cluster logic and needs the Rive rig.
- **All content is draft.** Profiles, table text and dialogue were written to
  the design doc's rules and pass `check:data`, but no human has edited them.
  Facts writers flagged to spot-check: Kidd's exclusion from the 1698 pardon,
  Javert's mother as a "tireuse de cartes", the Transylvania references
  (Lucy's four transfusions, "King Laugh", Van Helsing's rifle).
- **Roster count is 35, not 32.** The v4 table lists 5 characters at Athens,
  Transylvania and the Station (4 seats + a late champion). And Rome has only
  3 seated NPCs where the "late champion needs a fourth NPC holding the
  chair" rule implies 4 — Caesar takes the first vacated chair instead.
- **Dials are tuned on 3000-hand cash sims** per table (`npm run sim 3000
  all`) — enough for VPIP/AF, not for win rates. Retune on more hands. The
  early tables keep deliberate caricatures (Roosevelt, Lancelot, the Cyclops
  lose heavily to bots) because beginner tables should be exploitable.
- **Tight play dominates heads-up in this engine.** Every aggressive Death
  lost to Lincoln 2:1. The tuned Death is tight and patient with a
  check-raise (dials in `data/characters/death.json`). Heads-up at the
  finale's 5000 buy-in, 60 matches each, ENGINE_VERSION 3: Death beats
  Lincoln 65%, Washington 62%, Roosevelt 77%, and is level with Arthur (47%,
  inside the noise of 60 matches). Under version 2 it was 60/58/43/57. The
  finale buy-in is 5000 so the match runs long enough for skill to show.
- **Tightness saturates.** Above ~0.75 the dial barely moves VPIP; the
  quirks (`patient`, `calls_small`, `steal`) move it far more. Tune with them.
- **An existing White House line genders the player** (`wh_p0_03`, "the look
  of a man who has read about poker"). Every newer line avoids it; this one is
  the owner's to change.
- **No position awareness.** Adding a position term to effective tightness is
  the single highest-value realism improvement available.
- Adaptivity is table-wide, not per-opponent.
- **poker-ts destroyed chips when side pots formed — FIXED via a patch.**
  A pot's eligible-player list is fixed when its bets are collected, so a
  player who folded on a later street stayed eligible, could be judged the
  winner, and was paid via `_players[seat]?.addToStack()` — null for a
  folder, so the pot silently ceased to exist. Roughly 1 hand in 300 with
  uneven stacks. Fix lives in `patches/poker-ts+1.5.0.patch`, applied by
  `patch-package` on `npm install`; `npm run check:pots` is the regression
  guard. 1.5.0 is the latest release, so there is no upgrade to take instead.
  **If you ever bump poker-ts, re-run `npm run check:pots` and
  `npm run check:hands`** — the patch is pinned to 1.5.0 and will refuse to
  apply to a different version.
- **poker-ts paid side pots to the wrong player — FIXED, same patch file.**
  Every betting round it REPLACED the last pot's eligible list with whoever
  bet that round (or, if nobody bet, whoever could still act), and both
  leave out anyone all in. An all-in called for exactly their stack was
  dropped from the only pot they could win as soon as a later street was
  checked through; the chip-loss fix above then skipped anyone all in from an
  earlier street at showdown. Chips were conserved -- just paid to someone
  else -- so the conservation check never saw it: about 1 showdown in 240 at
  the tour tables, 1 hand in 20 with random play. The dealer now rebuilds the
  pots from what each player put in after every collection (the textbook
  method), and pays winners through its own record of who was dealt in.
  `check:pots` now settles every hand independently and compares.
- **poker-ts misranked hands — FIXED, same patch file.** Two sets of trips
  among seven cards (9-9-9 and 4-4-4) was scored three of a kind, not a full
  house, so nines full lost to fours full; four of a kind took the wrong
  kicker. `npm run check:hands` compares poker-ts with pokersolver.
- **A bet nobody could call is RETURNED, not won.** poker-ts makes it a side
  pot only the bettor reached and "wins" it with their hand, which read as
  "Arthur wins side pot 1 with two pair". `game.ts` marks such a pot
  `returned`; the table says "takes back", and the director does not count
  it as a pot won.
- **Bets are READ -- ENGINE_VERSION 3.** Equity used to be measured against
  any two cards, so a pair of eights was a 65% favourite against a pot-sized
  bet and the AI called it down: on calls into big bets the AI estimated 46%
  and actually held 10% against the bettor's real hand. Now, facing a bet,
  the bettor is dealt from a range (`betRange` in decide.ts: bigger bets and
  river bets narrower, a short stack's preflop shove wide), and each
  character believes it as far as its `betRespect` dial says -- low is
  the calling station, and Green Knight and Alice keep that job. Clearly bad
  calls into bets of 40%+ of the pot fell from 1180 to 759 per 4800 hands,
  on the river from 285 to 105.
  Calibrated against what AI bettors actually held: preflop the estimate
  matches (48% vs 46%); pot-sized and river bets needed the extra narrowing.
  Half-pot bets read PESSIMISTIC against AI bettors, because the AI's own
  "probe" bets weak hands at about half pot. That is left alone on purpose:
  people do not bet like that, and matching it would make the AI call the
  player's half-pot bets more.
- **Facing a raise before the flop, equity is real Monte Carlo** against the
  raiser's range, not the Chen strength score -- which rated 7-2 at 19%
  against a short stack's shove it beats 40% of the time, so big stacks
  folded for pennies. With nothing but the blind to call it is still the
  strength score. Quirks read `ctx.strength` (the scale they were tuned on)
  for hand quality and `ctx.equity` for prices.
- **A cheap call against an all-in needs only the price.** A tight player's
  margin shrinks with the share of their stack the call risks, and `patient`
  no longer folds to an all-in costing under 10% of the stack. A 5bb shove
  costing the big blind 5% of their chips: called 2-18% before, 71-77% now.
- **`committed` counts chips put in -- FIXED.** `contributed` in `game.ts`
  summed the change in stack + betSize per action, which a bet never
  changes, so it held only the blinds and the quirk never fired. It now
  measures the stack, and the quirk has a `minEquity` floor (default 0.2):
  stubborn, not suicidal. The "won't fold 8-3" calls were NOT this quirk --
  they were the any-two-cards equity above.
- **Still odd, not yet addressed:** the AI "probes" -- checked to with
  anything over ~20% equity it bets about half the pot at a rate set by its
  aggression, so many half-pot bets are air.
- **Deals are reproducible — FIXED, same patch file.** poker-ts shuffled with
  `crypto.randomInt` and `Table` hardcoded its own `Deck`, so nothing was
  seedable. `Deck` already accepted a shuffle; `Table` just never passed one
  through. The patch adds an optional third constructor argument, and `Game`
  injects a Fisher-Yates drawing from `opts.rng`. One seed now determines
  cards, decisions and rollouts together — a 298-event transcript replays
  byte-identical. This is what non-negotiable #6 rested on, and what makes
  replay-from-save possible.
- `src/rng.ts` is the only RNG. `mulberry32(seed).state()` returns the whole
  generator state as one integer, so a save can resume the exact stream —
  without that, a restored game deals different cards and the save is a lie.
- Cash mode still resets stacks to the buy-in each hand. That is deliberate
  and must stay: it is what keeps the tuning numbers comparable.
- **Save/resume captures MID-HAND state — DONE, by replay.** `active` in the
  save is the seed plus the human's decision log (with think times). Resuming
  replays silently to the next undecided action, which reconstructs stacks,
  blinds, button, pot, board, tilt, respect and dialogue-already-used exactly.
  No field can drift from the engine because there are no such fields.
- Monte Carlo equity is ±6% at 60 rollouts.
- **Sounds are synthesised placeholders**, tuned from recipes, not by ear.
  Recordings (Kenney's CC0 casino pack, or our own chips and deck) can
  replace any of them by name in `web/sound.ts`; the table only ever asks for
  "chips" or "knock", never a file. Bundle them (esbuild `binary` loader)
  rather than fetch them, or file:// stops working.
- `MOTION-SPEC.md` layer 3 (per-character vocabulary) is an empty template.
  No character has an authored tell cluster yet.
- Dracula's parts are incomplete: **no chalice** (his signature prop and half
  his tell cluster), only three mouth shapes (needs a talking set and a
  losing face), one brow pair, and fixed pupils (need separate pupil layers
  for look-direction).

## GOTCHAS THAT COST TIME BEFORE

- **Bump `ENGINE_VERSION` in `src/save.ts`** whenever a change would make an
  old decision log replay differently: engine rules, decide(), a quirk, ANY
  dial, a table's cast, anything that draws from the game RNG. A seat saved
  under another version is released with an explanation rather than replayed
  into different cards; a replay that hits an illegal action does the same.
- **Nothing on the presentation side may touch the game RNG.** The director
  has its own seeded stream (seed XOR a constant); ambient idles and
  "thinking long" use Math.random. Picking a line from the game RNG would
  change the next card. `check:replay` catches it.
- **The table keeps TWO copies of where the chips are.** The engine runs
  ahead of the screen within a hand, so `chipsAt` in `table.ts` follows the
  events (updated as each arrives) and `shown` follows the screen (updated
  as each step plays). Work out what a step shows at EVENT time, draw it at
  STEP time. Reading event-time state inside a step, or step-time state
  while queueing, puts the next street's bets on the felt early.
- **Persist only LIVE hands.** During a resume replay the web layer records
  nothing (it was recorded the first time); marks earned in replay are
  written with earnMark, which dedups.
- `src/content.ts` imports every data file explicitly — no glob — so the
  bundle opens from disk. A new character/table/dialogue file needs an import
  line there, and `npm run check:data` must pass.
- The default `npm run sim` / `tourney` never import data/: they run the
  frozen Phase 2 cast so old and new numbers stay comparable. Table args load
  content lazily.
- A late arrival marked `"watching": true` (only the Station's AI) may speak
  and banter before sitting down. Dracula watches from the fire in SILENCE:
  the Transylvania notes forbid his lines before the arrival.

- Win rates swing wildly under a few thousand hands. **Do not tune dials on
  fewer than several thousand hands** — you will be chasing variance, not
  bugs.
- `poker-ts` exports `Table` as a named export.
- Guard seat occupancy before `standUp` on busted players.
- Track VPIP per-hand, not per-action, or it double-counts.
- `poker-ts` calls `standUpBustedPlayers()` only inside `showdown()`, so a
  player who busts posting a blind into an all-fold hand is left sitting there
  with an empty stack. The tournament loop removes them itself.
- Call `startHand()` with NO seat argument in a tournament: poker-ts then
  advances the button past eliminated seats. Passing a button by hand lands it
  on an empty chair.
- **poker-ts never clears `_holeCards` on a fold**, so `holeCards()` still
  returns a mucked hand. Same root cause as the pot bug. Do not use it to ask
  "who is still in" — the game loop tracks folds itself, or showdown exposes
  folded players' cards and hands the player free reads.
- **`street` events stop when nobody can act.** With everyone all-in, poker-ts
  runs the board out internally and no further street fires, so a display
  driven only by those events freezes on the flop. The showdown event carries
  the final board for exactly this reason.
- **Conserved is not correct.** Chips can add up and still go to the wrong
  player; that is how the side-pot bug hid behind a passing conservation
  check. Chip-handling code needs a check of WHO is paid, not only how much.
- Any new chip-handling code needs a conservation check. `tourney.ts` has one,
  and it is the only reason the poker-ts pot bug was found rather than shipped.
- `patches/` is load-bearing. `npm install` runs `patch-package` via
  postinstall; if that step is ever skipped, chips start vanishing again.
- **Dev machine is Windows.** `new URL('.', import.meta.url).pathname` gives
  `/D:/...` there — a leading slash that path-joins into `\D:\...` and 404s
  everything. Use `fileURLToPath`. Node scripts must not assume POSIX paths or
  that npm runs them from the repo root.
- After pulling, `npm install` before `npm run web`. The web build needs
  esbuild, which older checkouts do not have.

## NEXT MILESTONE

Phase 4 — the platform shell. What is left of it: Capacitor, a real device,
and checking the safe-area handling and the audio unlock on hardware (the
unlock is built; iOS is where it breaks if it breaks).
The screen shell and the save schema are done. **Vite + React is now a
choice, not a given:** every screen is a plain render function, so porting is
one-for-one, but the shell works without either — decide whether they still
earn their place.

**Its exit test needs a physical phone, so it is yours to run**, the same way
3b's was: the ugly DOM game running on a real device in landscape with one
sound on a button press.

Order within the phase, cheapest-risk first:
1. ~~Seedable deck.~~ Done (patch).
2. ~~Save schema, capturing MID-HAND state.~~ Done (seed + decision log;
   `npm run check:replay`).
3. Capacitor scaffolding (and Vite/React only if they earn it), then the
   device test.

Also owed before Phase 5: a human edit pass on the draft dialogue, and the
open naming decisions (the AI, the Pope, and "The Wolf Man" — see ASSETS.md).

**Dev machine is Windows, so iOS is not available** — Capacitor's iOS target
needs a Mac with Xcode plus $99/yr. Android is $25 one-off and works from
Windows. BUILD-PLAN section 1 already argues web-first on a $0 budget, so
Phase 4 in practice means web + Android, with iOS deferred.

## HOUSE STYLE

- Small, readable, boring code. No frameworks we don't need.
- Characters, dialogue, and rosters are **data**, not code.
- If a decision contradicts the design doc, stop and flag it rather than
  silently overriding — the doc records *why*, and the why usually matters.
