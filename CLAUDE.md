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
  decide.ts       THE shared decision function. Read this first.
  game.ts         loop over poker-ts; stats (VPIP/PFR/AF), tilt, events
  rng.ts          the one seeded RNG; state() is what makes saves resumable
  save.ts         THE SAVE SCHEMA: checkpoint + journal. Read its header.
  sim.ts          `npm run sim [hands]` — the balance/exit test (cash)
  play.ts         `npm run play [hands]` — watchable CLI with tells
  tourney.ts      `npm run tourney [tables]` — the Phase 3a exit test
  pot-conservation.ts `npm run check:pots` — guards the poker-ts pot patch
  save-fidelity.ts    `npm run check:save` — guards the save schema
data/
  dialogue/       one file per table; schema is established and working
web/
  table.ts        THE PRESENTATION QUEUE + the view React renders. Read it.
  App.tsx         the table, as components; renders, never drives
  main.tsx        mount, audio unlock on first gesture, start the loop
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
— three distinct play profiles emerge from one shared function. Representative
1000-hand run: Dracula VPIP 33.7 / AF 0.66 (tight trapper), Snowman VPIP 74.5
/ AF 0.24 (calling station), Cleopatra VPIP 62.7 / AF 3.18 (aggressive).

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

**Not started:** Rive integration, dialogue system, audio, the platform shell
(Vite/React/Capacitor — Phase 4 steps 3 and 4).

## KNOWN GAPS AND SIMPLIFICATIONS

- **No noise-to-signal dial.** Difficulty runs on two axes: skill UP (dials)
  and legibility DOWN (tells). The second axis needs a per-character
  noise-to-signal ratio in `personality.ts`. Doesn't exist yet.
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
3. ~~**Vite + React, then Capacitor scaffolding.**~~ DONE. The presentation
   queue moved to `web/table.ts` intact and the save schema came across
   unchanged; the DOM rendering did not survive, as planned. `npm run web` is
   now the Vite dev server, listening on the LAN so a phone can open it
   directly. `npm run android:sync` builds and copies into `android/`.
   **The APK has never been built here** — no Android SDK in the dev
   container — so the first `npm run android:open` is where that gets found
   out.

**Dev machine is Windows, so iOS is not available** — Capacitor's iOS target
needs a Mac with Xcode plus $99/yr. Android is $25 one-off and works from
Windows. BUILD-PLAN section 1 already argues web-first on a $0 budget, so
Phase 4 in practice means web + Android, with iOS deferred.

## HOUSE STYLE

- Small, readable, boring code. No frameworks we don't need.
- Characters, dialogue, and rosters are **data**, not code.
- If a decision contradicts the design doc, stop and flag it rather than
  silently overriding — the doc records *why*, and the why usually matters.
