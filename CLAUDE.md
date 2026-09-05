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
  personality.ts  the dials + quirks + tells; characters as DATA
  roster.ts       THE TOUR: 8 tables, 36 seats, dials. Locked roster as data.
  decide.ts       THE shared decision function. Read this first.
  game.ts         loop over poker-ts; stats (VPIP/PFR/AF), tilt, events
  rng.ts          the one seeded RNG; state() is what makes saves resumable
  save.ts         THE SAVE SCHEMA: checkpoint + journal. Read its header.
  puppet.ts       THE STATE MACHINE INPUT CONTRACT (BUILD-PLAN s4). Read it
                  before touching anything animation-shaped.
  sim.ts          `npm run sim [hands]` — the balance/exit test (cash)
  play.ts         `npm run play [hands]` — watchable CLI with tells
  tourney.ts      `npm run tourney [tables]` — the Phase 3a exit test
  pot-conservation.ts `npm run check:pots` — guards the poker-ts pot patch
  save-fidelity.ts    `npm run check:save` — guards the save schema
  puppet-contract.ts  `npm run check:puppet` — guards the rig contract
  roster-check.ts     `npm run check:roster` — the casting rule, measured
data/
  dialogue/       one file per table; schema is established and working
web/
  table.ts        THE PRESENTATION QUEUE + the view React renders. Read it.
  tour.ts         screen routing + unlock state; progression is RESPECT only
  App.tsx         home, the table, and the router; renders, never drives
  Map.tsx         the world tour chart (placeholder art, real navigation)
  public/         drop-in chart art: chart.webp replaces the drawn map
  CHART-ART.md    what replacement chart art has to be, and how to place it
  main.tsx        mount, audio unlock on first gesture
  audio.ts        one synthesised sound; the point of it is the UNLOCK
  index.html      Vite entry; style.css is landscape-only by design
  shims/          browser stand-ins for the node builtins poker-ts needs
vite.config.ts    root is web/, output is dist/, aliases the shims
capacitor.config.ts  the Android wrapper; webDir is dist/
android/          generated ONCE by `cap add android`, then committed
art-tools/
  split_parts.py  cuts an AI-generated parts sheet into layers + parts.json
  build_puppet.py init/render a layout to preview puppet assembly
  dracula_parts/  41 split Dracula layers (incomplete — see gaps)
MOTION-SPEC.md    the animation parts list, tagged MECH/IDLE/BEAT/TELL
ASSETS.md         every free/CC0 source + licensing traps
```

Stack: Node 22, TypeScript, ESM, run via `tsx`. `poker-ts` v1.5.0 for rules
(exports a **named** `Table`, not default), `pokersolver` v2.1.4 for eval.
The app is Vite 8 + React 19, wrapped for Android by Capacitor 8.

## CURRENT STATE

**Working:** the engine. Phases 1 and 2 are complete and pass their exit test
— three distinct play profiles emerge from one shared function. 10,000-hand
run: Dracula VPIP 33.0 / AF 0.75 (tight trapper), Snowman VPIP 74.7 / AF 0.24
(calling station), Cleopatra VPIP 68.2 / AF 2.71 (aggressive). The three have
stayed recognisably themselves through every change since Phase 1, which is
the point of them — position awareness moved Cleopatra's AF from 3.23 to 2.71
because a loose-aggressive player who respects position is less
indiscriminate, not less aggressive.

**Phase 3a is complete: the tournament model.** Stacks persist, players are
eliminated, blinds climb every 25 hands, and a table ends when one player
holds every chip. 100/100 tables terminate with zero stalls. `decide()` now
has a stack-depth term, so short stacks widen and push instead of folding
their way to death; it is neutral above 20bb, which is why the cash profiles
above are unchanged.

**Phase 3b is built: human seat + throwaway DOM table.** `npm run web` serves
a playable landscape table at localhost:5173 — you sit at seat 0 against the
three characters, in the tournament model from 3a. Action buttons are built
from the engine's legal actions, and the engine rejects an illegal action
outright rather than trusting the UI.

The piece worth keeping when this UI is thrown away is the **presentation
queue** in `web/app.ts`: the engine resolves as fast as it can and pushes
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

**Phase 4 steps 1 and 2 are done: the deal is seeded and the game saves.**
One seed determines cards, decisions and rollouts together. A save is a
CHECKPOINT (the state at the start of the hand in progress, RNG state
included) plus a JOURNAL (the human's decisions since), so restoring replays
at most one hand — ~16ms — and lands on exactly the decision the player was
looking at. `npm run check:save` is the invariant: save mid-hand, restore,
play the table out, and every event must match the run that was never
interrupted. 80 saves restored across 5672 replayed hands, zero mismatches.
The throwaway web table has a Save button and resumes from localStorage, so
the schema can be tried by hand as well as by test.

**Phase 5 has begun on the code side: the rig contract exists.**
`src/puppet.ts` implements BUILD-PLAN section 4 — the inputs every character's
Rive state machine exposes (mood, tilt, attention, isInHand, isThinking,
isTurn, and the fire*/tell* triggers). It is derived from engine events on the
PRESENTATION clock, draws no randomness, and never reaches back into the game.
`npm run check:puppet` plays whole tables and checks the promises a rig will
rely on: 0 violations over 87k frames and 47k triggers. `?puppet=1` draws the
live inputs on each seat, so the contract can be watched against a real hand
before a single .riv file exists. **Rigging can start against it now.**

**The game is no longer one screen.** `npm run web` opens on a title screen,
which leads to a world tour chart, which leads to a table. BUILD-PLAN 3B calls
for exactly this in Phase 4 — "stand navigation up early and fill the screens
in late, because retrofitting routing into a single-view app is the expensive
way round" — so the routing, the unlock state and the persistence are real and
the chart's art is a placeholder (its illustrated version is Phase 7).
Entering a destination seats that table's ROSTER cast; `?cast=proto` still
seats the prototype three, which are the only characters with authored quirks
and tells and the instrument every tuning baseline is measured against.

**The tour exists as data.** `src/roster.ts` carries the design doc's LOCKED
v4 roster — eight tables, every seat, every champion and entrance, each
character's casting reason, temperament, dials and licensing caution.
`npm run check:roster` validates the structure, cross-checks every dialogue
speaker against who is actually in the room, and then PLAYS every table to
report whether its cast reads as distinct players. It found 13 blurred pairs
on the first run and now reports none — the fixes were making the numbers
agree with the temperament already written beside them, which is the cheapest
possible time to find that out.

**Not started:** Rive files themselves, dialogue system, audio beyond the one
unlock sound.

## KNOWN GAPS AND SIMPLIFICATIONS

- ~~**No noise-to-signal dial.**~~ DONE. `personality.noiseToSignal` is the
  second difficulty axis: skill UP through the dials, legibility DOWN through
  this. Dracula 0.2, Snowman 0.1, Cleopatra 0.45. Death, with no tells at all,
  is where the curve ends.
- **The playable CAST is not the shipping roster.** `personality.ts` exports
  Dracula, the Abominable Snowman and Cleopatra, and every tuning baseline in
  this file is measured on those three. Only Dracula is in the locked roster:
  the Snowman appears nowhere in the design doc, and Cleopatra is explicitly
  moved to the sequel (she is Egyptian, never Roman). **They are test
  fixtures, and they should stay that way** — they are the instrument the
  numbers are comparable against. Roster characters get a `Personality` from
  `personalityFor()` instead.
  Note that roster-Dracula's dials match `personality.ts` exactly, but
  `sharpen()` raises his adaptivity and noise for table 7. Reconcile
  deliberately when he is brought into play.
- **Roster gaps carried from the design doc, not invented here:** Imperial
  Rome names only three seats but Caesar arrives late, so its fourth chair is
  `rome_fourth_tbd` and is flagged `uncast`. And the doc's "32 characters"
  is its own arithmetic — it holds for seated champions, but the four late
  champions need a fourth NPC each, so the named cast is 36.
- **Every roster character has ZERO quirks and ZERO tells.** Quirks are
  functions, so they belong in `personality.ts` when a character is brought
  into play; a tell's index is its rig slot, so authoring one before the art
  exists binds an animation to a number nobody has drawn. `signatureRule`
  carries the intent for both in prose.
- **Seven of the eight dialogue files do not exist.** Only
  `table-01-white-house.json` is authored; `check:roster` warns about the
  rest and validates the one that is.
- **`tellC` has never fired**, because no character has a third tell yet.
  `personality.tells` is capped at three because the contract exposes exactly
  tellA/B/C, and a tell's INDEX is its slot. Authoring the clusters is
  MOTION-SPEC layer 3, still an empty template.
- ~~**Cleopatra loses, consistently.**~~ FIXED, and not by tuning her dials.
  She ran -188, -111 and -42 bb/100 across three 6000-hand streams. Position
  awareness plus the per-opponent fold read put her at +5, -1, -1 across the
  same three, and moved the losses onto the calling station (-118, -152, -116)
  where they belong: Dracula +113, +153, +117. The table now reads correctly —
  the trapper wins, the aggressive player breaks even against a station she
  cannot bluff, and the station pays for it. Finishing positions over 60
  tournaments: Dracula 29 firsts, Cleopatra 18, Snowman 13.
  **No dial was touched**, which was the right outcome: the imbalance was a
  missing concept, not a wrong number.
- ~~**No position awareness.**~~ DONE. `DecisionContext.position` is 0 for
  first to act after the flop and 1 on the button, and it moves effective
  tightness, aggression and bluff frequency. Dracula and Cleopatra enter a pot
  ~13 points wider on the button than first to act; the Snowman is unmoved,
  because his never-folds quirk fires before any of it — which is exactly what
  a calling station should do with position.
  **Simplification:** postflop order is used preflop too. The blinds really
  act last preflop, so their true preflop position is better than this
  reports. Modelling it properly means special-casing heads-up, and the thing
  position is mostly worth is captured either way.
- ~~Adaptivity is table-wide, not per-opponent.~~ PARTLY DONE. The fold-rate
  read now covers only the opponents still in the hand, so heads-up in a pot
  it is exactly the one player being played against. It is still their rate
  across the whole session, not per-matchup or per-street — a real opponent
  model is the next step, not this one.
- **poker-ts destroyed chips when side pots formed — FIXED via a patch.**
  A pot's eligible-player list is fixed when its bets are collected, so a
  player who folded on a later street stayed eligible, could be judged the
  winner, and was paid via `_players[seat]?.addToStack()` — null for a
  folder, so the pot silently ceased to exist. Roughly 1 hand in 300 with
  uneven stacks. Fix lives in `patches/poker-ts+1.5.0.patch`, applied by
  `patch-package` on `npm install`; `npm run check:pots` is the regression
  guard. 1.5.0 is the latest release, so there is no upgrade to take instead.
  **If you ever bump poker-ts, re-run `npm run check:pots` AND
  `npm run check:save`** — the patch is pinned to 1.5.0 and will refuse to
  apply to a different version, and it now carries three fixes, not one.
- **Deals are reproducible — FIXED, same patch file.** poker-ts shuffled with
  `crypto.randomInt` and `Table` hardcoded its own `Deck`, so nothing was
  seedable. `Deck` already accepted a shuffle; `Table` just never passed one
  through. The patch adds an optional third constructor argument, and `Game`
  injects a Fisher-Yates drawing from `opts.rng`. One seed now determines
  cards, decisions and rollouts together — a 298-event transcript replays
  byte-identical. This is what non-negotiable #6 rested on, and what makes
  replay-from-save possible.
- **The deck carried its order between hands — FIXED, same patch file.**
  `Deck.fillAndShuffle` only reset the size counter and re-shuffled whatever
  order the previous hand left behind, so the deck's contents were cross-hand
  state: the same RNG position dealt different cards depending on how many
  hands had been played before it. A checkpoint would have had to carry all
  52 cards to reproduce one deal. The patch keeps the canonical order the
  deck was built in and refills from it before shuffling — Fisher-Yates
  gives a uniform permutation from any starting order, so this is not a
  weaker shuffle, it just makes the result a function of the RNG alone.
- `src/rng.ts` is the only RNG. `mulberry32(seed).state()` returns the whole
  generator state as one integer, so a save can resume the exact stream —
  without that, a restored game deals different cards and the save is a lie.
- Cash mode still resets stacks to the buy-in each hand. That is deliberate
  and must stay: it is what keeps the tuning numbers comparable.
- **Save/resume captures MID-HAND state — BUILT, see `src/save.ts`.** Whose
  turn, pot and board are not stored: they are reproduced by replaying the
  hand from its checkpoint, which is why the schema does not have to
  serialise poker-ts's private deck and pot state. Respect tier and dialogue
  already used have a slot (`tour`) that nothing reads yet — Phase 5 defines
  its shape without having to retrofit the container.
  **Anything that is game state and not derivable from the checkpoint has to
  be added to the schema**, and `npm run check:save` is what catches it if it
  isn't.
- Monte Carlo equity is ±6% at 60 rollouts.
- `MOTION-SPEC.md` layer 3 (per-character vocabulary) is an empty template.
  No character has an authored tell cluster yet.
- Dracula's parts are incomplete: **no chalice** (his signature prop and half
  his tell cluster), only three mouth shapes (needs a talking set and a
  losing face), one brow pair, and fixed pupils (need separate pupil layers
  for look-direction).

## GOTCHAS THAT COST TIME BEFORE

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
- **`Table.button()` asserts a hand is in progress**, so it cannot be read at
  the moment a save is written between hands. `Game` records it during the
  hand instead, and derives the next one on restore.
- **A game built without a seeded RNG cannot be saved** — there is no stream
  position to write down. `Game.save()` throws rather than write a save that
  would deal different cards on resume. Construct with
  `{ seed, rng: mulberry32(seed) }`.
- **Nothing on the human's turn may draw from the game RNG.** A restored hand
  answers earlier human turns from the journal instead of asking again, so
  anything that consumed the shared stream there would leave the replay at a
  different generator position. This is why the scripted player in
  `save-fidelity.ts` is a pure function of what it can see.
- **Anything that draws from the RNG must draw UNCONDITIONALLY.** `emitTell`
  used to be called inside `if (onEvent)`, so the same seed played a different
  game depending on whether the UI was attached — seed 4242 ran 10 hands
  headless and 77 with a listener, with a different winner. It also meant the
  sim and tourney tuning numbers were measured on a stream the real game never
  ran. If a draw is conditional on presentation, presentation is deciding the
  hand, and non-negotiable #6 is broken. Draw first, branch after.
- **A derived animation input has to be right at the EXTREMES**, because that
  is where the player is looking hardest. The first mood formula read "twice
  an even stack is 1.0", which is unreachable heads-up: the player who had
  just won every chip at the table read 0.39 — miserable, at the moment of
  winning. `check:puppet` asserts the anchors now.
- Any new chip-handling code needs a conservation check. `tourney.ts` has one,
  and it is the only reason the poker-ts pot bug was found rather than shipped.
- `patches/` is load-bearing. `npm install` runs `patch-package` via
  postinstall; if that step is ever skipped, chips start vanishing again.
- **Dev machine is Windows.** `new URL('.', import.meta.url).pathname` gives
  `/D:/...` there — a leading slash that path-joins into `\D:\...` and 404s
  everything. Use `fileURLToPath`. Node scripts must not assume POSIX paths or
  that npm runs them from the repo root.
- After pulling, `npm install` before `npm run web` — the toolchain moved from
  esbuild to Vite, and older checkouts do not have it.
- **Audio must be created inside a real user gesture.** A browser makes an
  AudioContext suspended and only lets it start from a gesture, so building
  one at load is silent on a phone and perfect on a desktop — the worst kind
  of bug. `web/audio.ts` builds it on the first `pointerdown`. Note that
  `element.click()` from a script is NOT a gesture, which is why a headless
  test has to drive real mouse events to exercise this.
- **React does not drive the game.** `table.ts` owns the engine loop and the
  presentation queue and publishes a view; `App.tsx` subscribes. Nothing is
  in StrictMode, because double-invoking the driver would deal two games into
  one view.
- `#root` is `display: contents`. The body is the landscape grid and its two
  columns are the table and the log, so the React mount point must not
  introduce a box between them.
- **A grid track's and a grid/flex item's automatic minimum is MIN-CONTENT.**
  This broke the phone layout three separate ways: `1fr` would not shrink past
  the table's widest row, `#table` would not shrink past its own content, and
  the seats would not shrink past the longest word in a character's name. The
  symptom is not a scrollbar — the body is `overflow: hidden` — it is one
  column silently painting underneath the other. `minmax(0, 1fr)` on tracks
  and `min-width: 0` on items, at every level, or it comes back.
- **`scrollWidth`/`scrollHeight` cannot detect overflow on an `overflow:
  hidden` element** — they are clamped to the client box, so a broken layout
  measures as a perfect fit. Compare `getBoundingClientRect()` against the
  viewport AND against the containing column; a control can be on screen and
  still be painted over by the log panel. A screenshot found this when the
  numbers said everything was fine.
- **`aspect-ratio` yields to a definite size, so `max-width` never clamps it.**
  The chart sized with `aspect-ratio` + `height: 100%` + `max-width: 100%`
  simply grew past the edge of a narrow screen and took a destination mark
  with it — the ratio wins over the clamp. `width: min(100%, calc(100cqh *
  W / H))` with `container-type: size` on the parent computes it instead of
  hoping. The related trap: an SVG sized `width/height: 100%` letterboxes
  inside its box, so anything positioned in percentages OVER it drifts off the
  drawing. Give the wrapper the viewBox's exact ratio.
- **A save belongs to the table it was taken at.** `save.tour.table` records
  the destination; arriving anywhere else starts a new tournament rather than
  restoring someone else's. Without that check the map would deal you the
  White House's saved hand at Pirate Cove.
- **`localStorage` can throw, not just fail.** Reading the property throws
  when a browser blocks site data, and Safari in Private Browsing has thrown
  on `setItem`. `web/table.ts` wraps every access; an unguarded save turns the
  Save button into an uncaught error on the platform we cannot test here.

## NEXT MILESTONE

Phase 4 — the platform shell. Vite + React, Capacitor, a real device, audio
unlock on first tap, safe-area handling, and the save schema. **All four
steps are built; only the exit test is left, and it needs your phone.**

**Its exit test needs a physical phone, so it is yours to run**, the same way
3b's was: the ugly DOM game running on a real device in landscape with one
sound on a button press.

Order within the phase, cheapest-risk first:
1. ~~**Seedable deck.**~~ DONE. The `patches/` mechanism carried it; it did
   NOT remove the Web Crypto shim (see gotchas).
2. ~~**Save schema, capturing MID-HAND state.**~~ DONE, `src/save.ts`, with
   `npm run check:save` proving the hand resolves identically across a save.
4. **Phase 5's code half is started** — the rig contract is in and guarded.
   What is left there is art and Rive, which need a person: Dracula's missing
   parts (chalice, talking mouth set, brow variants, separate pupil layers),
   then rigging against the contract.
3. ~~**Vite + React, then Capacitor scaffolding.**~~ DONE. The presentation
   queue moved to `web/table.ts` intact and the save schema came across
   unchanged; the DOM rendering did not survive, as planned. `npm run web` is
   now the Vite dev server, listening on the LAN so a phone can open it
   directly. `npm run android:sync` builds and copies into `android/`.
   **The APK has never been built here** — no Android SDK in the dev
   container — so the first `npm run android:open` is where that gets found
   out.

**An iPhone can run this today — a NATIVE iPhone build cannot.** The two are
worth keeping apart. `npm run web` listens on the LAN, so Safari on an iPhone
opens the same build over Wi-Fi and exercises landscape, the safe-area insets,
touch targets and the audio unlock — which is most of Phase 4's exit test, on
the strictest browser we target. What needs a Mac with Xcode plus $99/yr is
`cap add ios`: an installable app, and the App Store. Android is $25 one-off
and works from Windows. `capacitor.config.ts` already carries its `ios` block
so that day is one command, not a configuration exercise.

**iOS silences Web Audio when the ring/silent switch is on.** If the one sound
does not play on an iPhone, check the physical switch before the code — this
is the single most likely way that exit test fails for a reason that is not a
bug.

## HOUSE STYLE

- Small, readable, boring code. No frameworks we don't need.
- Characters, dialogue, and rosters are **data**, not code.
- If a decision contradicts the design doc, stop and flag it rather than
  silently overriding — the doc records *why*, and the why usually matters.
