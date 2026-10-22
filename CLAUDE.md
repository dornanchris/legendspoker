# CLAUDE.md — Legends Poker: Death's Invitational

Read this before touching anything. It is the short version of the decisions
that are already settled, so we don't re-litigate them every session.

**Art work (drawing and building the cast): read `ART-PIPELINE.md`** for the
workflow, the build steps and the queue, and `FIX-LATER.md` for what is owed
(the owner: make the next characters as they are needed, then go back and
fix).

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
  engine-guard.ts refuses to deal on an unpatched poker-ts (plays two
                  stacked hands first; Game and the web boot both call it)
  content.ts      loads data/ and builds Personalities; the only file that
                  knows where content lives (explicit imports, see gotchas)
  tour.ts         pure tour rules: unlocks, respect tiers, earned names
  director.ts     one sitting as the ROOM sees it: dialogue, respect flips,
                  marks, observations. Own seeded RNG. Event-driven.
  chatter.ts      callouts (what they say as they act) and needles, from
                  PUBLIC information only; its own seeded stream
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
  loki-check.ts   `npm run check:loki` — the hidden six-seven event, forced (spoilers)
  visitor-check.ts `npm run check:visitor` — JFK's three-five arrival, forced (spoilers)
  phoenix-check.ts `npm run check:phoenix` — the Phoenix's gauntlet rules (spoilers)
  other-check.ts  `npm run check:other` — Jekyll/Hyde: the 50/50 chair and the other half's return, forced
  look-check.ts   `npm run check:look` — Holmes's deerstalker: earned by beating him heads up again, forced
  roster.ts       `npm run roster` — regenerates ROSTER.md from data/
  reads.ts        `npm run reads` — how each character reads a bet (a report)
  headsup.ts      `npm run headsup [matches] [ids]` — who beats whom one on one,
                  ranked by a Bradley-Terry fit (a report, for difficulty)
data/
  characters/     one file per character: dials, quirks, tells, idles, profile
  tables/         one file per table: seats, champion, arrival, room, hook
  dialogue/       one file per table + dealer.json (Death's general lines)
                  + uninvited.json (the hidden guest's scenes; spoilers)
  marks.json      the ledger's marks (achievements), with generic conditions
  story.json      the invitation, the ending, the epigraph
web/
  app.ts          boot + hash router (#/tour, #/ledger/..., works from file://)
  store.ts        the Save in localStorage, guarded; live-only persistence
  screens/        title, invitation, map+intro, open (the open table's
                  chairs), table, results, ledger, settings+about, ending.
                  table.ts keeps the 3b presentation queue
  fx.ts           flights: cards out of Death's hands, chips across the felt
  puppet/         the puppet player: bones, clips, face (blink, gaze, brows,
                  speech, idle), table-rail layering; stage.ts draws a room
                  and its figures under the table screen; see its README
  art/<id>/       a puppet: rig.json + images (GENERATED by pose_rig.py),
                  half/ (the table's half-size copies, web_half.py) and
                  anim.json (authored: face timing, clips, tell cues)
  art/rooms/<id>/ a staged room: backdrop, table, room.json (room_web.py)
  sound.ts        card/chip sounds SYNTHESISED with Web Audio (no files)
  index.html      markup; style.css is landscape-only by design
  shims/          browser stand-ins for the node builtins poker-ts needs
  build.mjs       esbuild -> web/bundle.js (gitignored, regenerate it)
  serve.mjs       dependency-free static server; Phase 4 replaces it with Vite
  dist.mjs        assembles dist/ for the app: bundle, rooms, each puppet's
                  half/ and portrait (~120 MB of web/'s ~800; no bench)
ios/              the Capacitor iOS project (Xcode, Swift Package Manager);
                  landscape only. capacitor.config.json is at the root
ROSTER.md         GENERATED casting book: never edit by hand
ART-PIPELINE.md   the art workflow, step by step, and the queue of characters
FIX-LATER.md      what we go back to: redraws, layout bugs, owed decisions
art-tools/
  split_parts.py  cuts an AI-generated parts sheet into layers + parts.json
  cut_sheet.py    split_parts plus each kit's fixes as data (<id>_parts/cut.json):
                  pieces that touched, a prop drawn across the next head
  build_puppet.py init/render a layout to preview puppet assembly
  dracula_parts/  Dracula, Transylvania's champion (built; rig_spec.json);
                  old_parts/ is the pre-gothic parts kit
  seat_puppet.py  builds a seated three-quarter puppet from a small spec
                  (<id>_parts/seat.json): trims the cuffs, writes the layout
  faces_preview.py  a strip of every head swap on the seated puppet
  fdr_parts/, roosevelt_parts/, washington_parts/  the White House cast, each
                  with seat.json and <id>_layout.json; see each README
  jfk_parts/      JFK, the White House's hidden visitor (built; rig_spec.json);
                  jfk/ and sources/jfk_sheet_old.png are the old one-face kit
  phoenix_parts/  the Phoenix, the hidden heads-up opponent (built; rig_spec.json)
  loki_parts/     Loki, the uninvited guest (built; rig_spec.json; spoilers)
  avatar_parts/   the Stranger: the player's own figure at the finale, in
                  their colour (accent masks), and later the default ONLINE
                  avatar (built; cosmetic, no tells: rule 3)
  socrates_parts/, leonidas_parts/, medusa_parts/, cyclops_parts/,
                  odysseus_parts/  the Athens table (seats 1-4 and its late
                  champion): pose sheets, face sheet, pose_rig.json;
                  blackbeard_parts/, kidd_parts/, silver_parts/, davy_jones_parts/: the
                  Pirate Cove, the same way; merlin_parts/, lancelot_parts/,
                  green_knight_parts/, green_knight_bare_parts/, arthur_parts/: Camelot;
                  cerberus_parts/, scipio_parts/, spartacus_parts/, pope_parts/,
                  caesar_parts/: Rome (all built); nemo_parts/, javert_parts/, sherlock_parts/ (built),
                  sherlock_deerstalker_parts/, cheshire_cat_parts/:
                  Baker Street (all built); van_helsing_parts/, jekyll_parts/,
                  hyde_parts/, wolf_man_parts/,
                  headless_horseman_parts/ (built): Transylvania; monster_parts/ (rejected, a record);
                  astronaut_parts/, robot_parts/, the_ai_parts/ (built; the AI is
                  the Robot recoloured), martian_parts/, grey_alien_parts/ (built): the Station
  lincoln_parts/  Lincoln's kit, three-quarter, hats on and off (the hat tip),
                  arms resting along the rim: the model for the next sheets;
                  ik_split.py cuts his IK arm from a pose (the IK prototype)
  death_parts/    Death's kit (front-on dealer: deal, shuffle, deck, his card
                  back); death_layout.json assembles him
  angel_parts/    Pravuil, the Recording Angel, who deals the finale while Death plays
                  (the owner's call): built, front-on like Death's kit (two ferryman
                  draws rejected); death_avatar_parts/ is Death as a player
                  (built, three-quarter)
  prompts/        generators for the two art-prompt files below
                  (characters.mjs + parts.mjs, rooms.mjs)
  rooms/          finished room art: table.webp (the one table every room
                  shares) and a folder per venue: its backdrop, and its
                  pieces (pieces.json: the cut, where they stand, story
                  pieces and loops). white_house/, athens/, pirate_cove/, camelot/, rome/,
                  baker_street/, transylvania/
  mock_screen.py  draws the table screen with the current art: game first
  room_web.py     publishes a room to web/art/rooms/: its rim curve, chairs
                  and pieces (preview one: web/index.html?room=athens)
  web_half.py     the half-size puppet images the table screen loads
  face_rig.py     bakes a face-overlay sheet into seam-free eye/brow/mouth
                  layers on a master head
  build/          the build helpers: pose_boxes, corner_regs, fit_master,
                  frames_sheet (python), bench_shots, room_shot, table_shot
                  (playwright)
  pose_rig.py     builds a puppet from complete pose drawings: one-piece
                  forearm+hand assets on elbow pivots (the White House
                  table's and Death's game rigs)
MOTION-SPEC.md    the animation parts list, tagged MECH/IDLE/BEAT/TELL
ASSETS.md         every free/CC0 source + licensing traps
CHARACTER-ART-PROMPTS.md  image prompts per character: a reference portrait,
                  then face / body / hands / props parts sheets
ROOM-ART-PROMPTS.md       per venue: backdrop plate, table and chair, moving
                  and story pieces, and the layer order for a room
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
After bets got reasons (ENGINE_VERSION 7): Dracula 18.4 / 0.67, Snowman
76.0 / 0.11, Cleopatra 53.0 / 3.18 -- still three, all a little tighter.

**Phase 3a is complete: the tournament model.** Stacks persist, players are
eliminated, blinds climb on a hand count (each table's `handsPerLevel`: 9 at
a five-seat table, 8 where a sixth player arrives and at the champions'
tables, 12 at the finale; the frozen Phase 2 instrument keeps 25), and a
table ends when one player holds every chip. 100/100 tables terminate with
zero stalls. `decide()` now
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
- **All 12 tables playable:** the 8 story tables, Champions' Tables I and II
  ("The Hall of Doors"), the finale ("The Last Crossing", hidden from the
  map until it opens), and the Phoenix's hidden table (below). 36 roster characters + Death, all data. Late champions
  arrive per the design doc via `Arrival` rules in `game.ts`; Odysseus is
  missable. The Green Knight keeps his appointment: knocked out, he retakes
  his chair 20 hands later if the table is still going, at any table he sits
  at (`returns` in his character file; an Arrival whose `afterEliminationOf`
  is himself, so the event has `replaces === id`). **Open tables** unlock
  at cleared tables, and the PLAYER picks who sits (the owner: "mix and
  match at each location"): `web/screens/open.ts`, the open intro, shows
  the room's four chairs around Death, each a drawn portrait with arrows
  through everyone the player has PLAYED AGAINST (`met`; the owner's words,
  wider than the design doc's "beaten"; a never-met Odysseus is not there,
  the Phoenix still has to be beaten), and under them every face by table,
  tap to seat. One to four opponents; heads up against anyone is allowed;
  so is a man beside his other half or his own second look (the owner:
  Jekyll and Hyde, the Robot and the AI, two Green Knights, two Holmeses,
  "perfectly fine"; `isOpenCast` in tour.ts). **Second looks** sit as
  players of their own: `looks` in a character file (`LookData`) makes a
  copy under the look's puppet id, with its own nameplate and a mark that
  unlocks it -- the Green Knight unhelmed is **Bertilak** (his name in the
  poem; "The Return Blow"), Holmes in the deerstalker is **Sherlock** ("The
  Deerstalker"). Same dials, tells and callouts, no return or other half;
  never on the ROSTER or a table's seats (check:data); his play and his
  beating are kept on the original's ledger page (`ledgerId`). At an open
  table the earned hat is not put on Holmes: the pick says who wears it.
  "Deal me a table"
  deals a full one at random, one chair kept for the room. The picks are
  kept per table (`openChairs`), and the table is STAGED in its room with
  everyone in the chair they were put in, empty ones left empty
  (`chairs` in the active seat, `Stage.chairsFor`; presentation only, no
  ENGINE_VERSION bump). Nobody is crowned at an open table. Everything at
  the tour tables works there too (checked with both Holmeses and both
  halves seated, and with two chairs left empty): banners and chip stacks,
  tells held as poses with each look's own cues, the Menu (quitting ends the
  open sitting as a loss), the Dialogue setting.
- **Dialogue system:** `src/director.ts` plays the established schema — intro,
  the one plant, pair banter, tiered player-directed lines, Death's asides,
  arrivals, heads-up, bust-outs, defeat — plus Holmes's `reads_you` (lines
  keyed to the PLAYER's observed habits: his signature, as data). ~1,500
  lines, **all draft**, written to the design doc's rules, not yet
  human-edited. Plus **callouts**: 720 short lines characters say as they
  fold/check/call/bet/raise/go all in (`callouts` in each character file;
  mute characters get `[gestures]`), rationed in `src/chatter.ts` (~1 per
  hand at a full table, ~1 per 5 hands heads-up), shown as a seat bubble on
  its own timer and cut under fast-forward. **Needles**: a pair's one-off
  exchange when one folded to the other's bet and the other won
  (`banter_pairs.<pair>.needles`). **Showdown lines**: `win` and `lose`
  pools in `callouts`, said once two hands are turned over and nobody else
  has spoken (`showdownWord` in director.ts, about 0.45 of the time, never
  two hands running). The cards are public by then, so these, and only
  these, may name a hand: this is where the puns live (Lincoln's "I do
  proclaim: this pot is mine"). A pool can name the winning hand
  (`win_flush`, `lose_full_house`: FDR's "the only thing you have to fear
  is the flush draw", Lincoln's full house that CAN stand), preferred when
  it fits, and **`beat_<id>`** is the winner's line for one loser in
  particular (Odysseus to the Cyclops: "You lost to Nobody"), said far
  more readily (0.85). **`reraised`**: said calling or raising when one's own bet was
  just raised over on that street (Teddy's Panama ditch), a reply, so it
  may follow the raiser's words. Each joke comes from the character's own
  legend, never a modern wink; Death stays dry. Written for the whole tour:
  the White House (the owner's dial), Athens (new pairs: Medusa and the
  Cyclops, Leonidas and the Cyclops, Socrates and Odysseus), the Pirate
  Cove (Blackbeard's "I'm on fire"), and since then Camelot, Rome, Baker
  Street, Transylvania, the Station and the guests (Loki's "Once I had to be
  a horse"), with `beat_` lines for the champions who meet again in the Hall
  of Doors (Washington to Odysseus: "I did not get lost"). The Phoenix is
  mute. All draft. None of this needs an ENGINE_VERSION bump.
- **Respect:** per table, points from pots / showdowns / knockouts, tiers at
  4 / 10 / 18, heads-up with the champion forces tier 2, a win forces tier 3.
  The name flip is always announced (toast + the tier's first line).
- **The Ledger:** character pages (history, how they play in Death's voice,
  what YOU have seen them do in words, habits noted), venues, account,
  house rules, and **marks** — 49 achievements framed as Death's entries,
  including some for levity (six-nine is "Nice"; the owner's call, and the
  one meme-adjacent joke the tone rules allow). A `secret` mark is neither
  listed nor counted until earned; `hidden` (older) lists it as a blank.
- **The uninvited guest (hidden event — keep it out of every UI until it
  happens).** Win a pot holding a six and a seven and one eligible opponent
  says "six seven"; Death shows them out for the anachronism and Loki (role
  `guest`: on no table, off the ROSTER, Ledger page only once met) sits in
  that chair behind the same chips. `Banishment` in `game.ts`, built by
  `banishmentFor()`; lines in `data/dialogue/uninvited.json`; secret mark
  "Uninvited". Never at the finale, never the champion or the dealer, never
  anyone a late arrival waits on, once per sitting, never when Loki is
  already seated. Once met, he can be dealt in at open tables. He is the
  sequel's teaser (design doc, SEQUEL SLOT): he foreshadows, never explains.
- **Save/resume:** `npm run check:replay` is the exit test the plan asked
  for — save mid-hand, restore, play on, identical — and it passes on every
  table. Saved seats carry `ENGINE_VERSION`; see gotchas.
- **Noise dial:** exists (`noise`, 0–1). Presentation-only: an ambient idle
  scheduler shows idles and tell texts at that rate. Death is 0 with no tells.
- **The difficulty curve (ENGINE_VERSION 9): two axes, one idea -- reading.**
  (The owner: "each table should be harder ... Death needs to be #1 overall
  heads up ... without compromising the characters".) The style dials say
  what kind of player someone is; the **`skill`** dial (0-1) says how well
  they READ, and it rises table by table: 0 at the White House, 0.15 Athens,
  0.3 Pirate Cove, 0.45 Camelot, 0.55 Rome, 0.62 Baker Street, 0.68
  Transylvania, 0.74 the Station; a champion 0.05 above their table; Loki
  0.7; Death 1. At 0 a character plays exactly as ENGINE_VERSION 8 did. A
  skilled reader, in `game.ts` where equity is worked out:
  1. reads a bet in context (`readBet`): a first bet on the turn or river is
     a probe, far wider than its size says; barrels, flop raises, re-raises,
     overbets and postflop all-ins are narrower. Measured against what
     bettors really held; the plain read was off by 8-16 points of equity in
     raise wars (overrated) and 12 on river bets (underrated);
  2. reads the PLAYER (`Game.read`): how often you bet and fold, from a
     prior worth 30 actions at skill 0 and 6 at 1, as far as the reader
     adjusts to people at all (`adaptivity`). The player only: the legends
     know one another by reputation (the plain read). Reading one another
     this way moved the cast's own styles by up to ten points of VPIP (the
     Wolf Man tighter, the Robot looser, Holmes tighter). How often the
     players in a pot FOLD is read for everyone (it only sets bluffing,
     through adaptivity, and moved no style);
  3. reads tells (`readTell`): the same tell events the player sees, trusted
     by skill x (2 x reliability - 1). Death has none; nobody reads him;
  4. does not bluff again into someone who has raised them (`escalation` in
     decide: raise wars were where heads-up stacks were lost).
  Legibility runs the other way. The first three tables' tells were
  sharpened (reliability about 0.93 / 0.88 / 0.82, noise 0.05 / 0.1 / 0.15;
  later tables unchanged, down to about 0.55 and 0.5 at the Station), and
  there Death points out a tell that told the truth, once the cards are
  turned over (`lessons` in the table file: 0.9 / 0.5 / 0.25; the lines are
  `lessons` in dealer.json, filled with `{tell}`). One a hand, each
  character's tell once a sitting, never over the end of one. They teach a
  way of watching, never a rule.
  Nobody's style moved: in 3000-hand cash sims every character's VPIP is
  within about 3 points of ENGINE 8 and AF within about 0.2 (seed-to-seed
  noise is about 1).
  Result, heads-up ladder (`npm run headsup 24`): Death first at 63% (was
  8th at 53%), re-dialled for it (aggression 0.65, tightness 0.7, bluffs
  0.06; the design doc asks only that he be "unreadable, no tells,
  flawless"). Table averages: the White House 44%, tables 2-4 48-49%,
  tables 5-8 51-54%. Style still moves individuals by more than a table's
  step: Washington (51%) sits above Merlin, Lancelot and the Green Knight
  (45-48%); a calling station is weak one on one by nature. With a stand-in
  player in your chair who reads tells and bets like a skilled character,
  100 tables each: wins 33% at the White House, 15% at the Station (one in
  five is par).
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
- **The game's pieces grow with the screen** (the owner: cards and chips
  were "hard to see" on a monitor). `scaleGame` in table.ts sets `--s` from
  the window's height (1 up to a phone's 385 px, ~2.8 at 1080, the owner's
  4x from 1540 up) for the cards, chips and bet amounts, and `--s2` (half
  the growth) for the plates, their type, speech and the buttons; a straight
  4x at 1080 laid the board over your own cards. On the staged table your
  hand sits bottom left and the board starts under Death's plate. **A
  four-colour deck**: spades black, hearts red, diamonds blue, clubs green
  (a card's class is its suit).
- A pot nobody called is won **without showing**: the winner's cards stay
  face down. (The screen used to turn them up, a free read.)
- **The curtain call** (the owner: "something that lets you feel good that
  you won, and something that makes you feel good you lost"): the end of a
  table comes down OVER the felt (`curtainCall` in `web/screens/results.ts`),
  the room still breathing behind it, and plays in beats: the best hand the
  player took a pot with dealt in a fan, the verdict (gilded for a win), Death's
  word, the people who fell in the order they fell (their own drawn heads,
  `art-tools/build/portraits.py`, stamped Out 4th / Beaten / Outlasted, "by
  your hand" for a knockout), plain tallies (hands, pots, biggest pot,
  knockouts), the table's name for the player, then the ledger's gains. Gold
  dust falls on a win, ash rises on a loss; a loss leads with Rematch and what
  the player outlasted. A tap shows every beat at once; Reduce motion shows
  them still. The table screen counts the sitting from its events (`count` in
  table.ts, presentation only). `#/curtain/won|lost/:table` previews it from
  made-up numbers; `#/results` is the same panel as a page.

**Not started:** Rive integration, recorded audio and music, a real device.
**The table is laid out for a phone held sideways** (the owner, after the
first device test: "it is meant to be a mobile game"). **A Menu button, not
Leave** (the owner: cleaner, better on a phone): it pauses the table (the
presentation queue waits; the engine is ahead or waiting on you) and offers
Sound, Dialogue (All / Less / Story / Off), Table pace, the Log (a
computer only), Step away (the seat is kept, to the very hand) and Quit the
table (asks twice; the sitting ends as a loss, placed behind everyone still
seated, and the curtain call says you gave up your chair). Escape opens and
closes it. **Dialogue** filters table talk at presentation only: the director
marks asides, banter, needles and lines at the player `chatter` (Beat in
director.ts), and callouts are chatter too; Less shows about a third, one draw
per event so an exchange is heard whole; Story shows none; Off shows no line
at all, story lines included (arrivals and guests still take their chairs,
unexplained). **The log** is
off by default and offered only with a mouse (`canLog` in settings.ts:
`hover: hover` and `pointer: fine`); on, it sits in the room's top right
corner. It never shows tells, which are poses (below); otherwise it is a
screen-reader live region. On a staged table the room runs edge to edge, under the notch and the
home bar, and what the player touches keeps out of them (`--safe-*` in
style.css, `safeProbe` in table.ts). At phone height (460 px and under) the
bar floats over the ceiling, plates keep their height and are spread so none
overlap, the board sits below the plates it would reach, the pot beside it. **A seat is a
name-tag banner, not a box** (the owner: the boxes were "big character
blocks"; a box over the rim also hid the table edge and read as an empty
panel once its player folded): a gilt-edged ribbon with the name (gold while
they act), and under it their cards and their chips as a physical stack
(`drawTower` in fx.ts: a column per colour, as tall as the square root of
their share of the table's chips) with the count beside it, the last action
under that. A plate is as wide as what lies under its banner, and spread so
none overlap. Your own seat is the same at the bottom left, bigger: your
banner over your stack, your two cards overlapping as a hand is held, well up
from the board's (the board is a size up too); where your seat would reach
the board on a short screen, the board moves right, and a bet that would lie
on your cards slides out toward its own side (`layoutStage`, `clearUnder`).
There are **no words for tells on the staged table** (the owner): the figure's
pose, held, is the tell (below); the words go only to the screen reader's
log. The plain table, where nobody is drawn, still shows them. The
turn prompt ("Check or bet") is hidden while the buttons say it. The raise
panel is a narrow column at the bottom right at every size, the amount on its
button ("Raise to 459"); while it is open the board slides left to stay
clear. Spoken bubbles go up and come down on a timer, so Reduce motion shows
them still instead of hiding them. The app turns off the web view's
scrolling and zoom (capacitor.config.json, index.html, style.css).
**Capacitor's iOS project is scaffolded** (the owner has a Mac now): `npm run
build:app` builds `dist/`, `npx cap sync ios` copies it into `ios/`, and on
the Mac `npx cap open ios` opens Xcode (signing: pick a Team in Signing &
Capabilities and Xcode makes the profile). `npm run ios` does all three.
The app has no bench: `#/puppet/<id>` needs the full-size images, which
`dist/` leaves out. **The icon is jovial** (the owner: Death's card back was "way too freaky"
for one): Arthur raising a toast (the owner's pick), from his own drawn
frame, on the green felt with a fan of the four-colour deck behind him, a
gold ring, no words. The launch
screen is the same icon small on the felt. `python3 art-tools/build/app_icon.py`
writes both into the Xcode asset catalogue (`CHOSEN` picks the design;
`--preview OUT` draws every design: Lincoln laughing or tipping his hat,
Arthur's toast or cheer, Lancelot cheering or fixing his hair, Teddy
cheering).
**Rive is shelved** (the owner: a hired animator is not affordable). The
brief and parts prompts written for one stay as a record
(`art-tools/roosevelt_parts/RIVE_PARTS.md`, `ANIMATION_BRIEF.md`, and his
six drawn parts sheets in `sources/rive_*.png`, which can feed his IK arms).
Animation goes the way of Washington's IK arms (below).

**Art direction (the owner's calls, from the FDR and Lincoln tests):** 2D
cut-out puppets in the bright cartoon style of those tests, not the dark
look of the table mock-ups. Characters sit waist-up around a ROUND table;
nothing below the table edge is ever seen (props go on the felt, in the
hands or on the body). Every opponent is drawn once at three-quarter view,
facing the table's centre, and mirrored for the other side; Death, dealing
from the far side, is front-on. The table layer's curved edge hides each
torso's lower half; forearms and hands resting on it sit above it. A puppet keeps
its own layer order (a sleeve can tuck under a cape); parts marked
`on_table` are drawn again over the table where they lie on it
(`build_puppet.py`, `mock_screen.py`).
**One table in every room: it is Death's table** (the owner's call), and the
room texts say so (the Cove's rum-tun lid, Camelot's curve of the Round Table,
the Station's bolted table and the finale's small table were reworded; at
Camelot the Round Table stands beyond it). `art-tools/rooms/table.webp`,
published once as `web/art/rooms/table.webp`. Rooms differ in their backdrop,
their story pieces and their light (`ROOM-ART-PROMPTS.md`); each backdrop is
drawn to the White House plate's camera, so the table, rim and chairs line up.
**Athens's room is built** (backdrop, the cup poured for Odysseus that is
drained once he arrives, flickering lamps). **Socrates is built**
(`#/puppet/socrates`, 25 clips): rest plus whole-figure frames with their own
drawn heads, placed by each drawing's rail. **Leonidas is built** the same
way (`#/puppet/leonidas`, 24 clips), and **the Cyclops** (`#/puppet/cyclops`,
24 clips, built a quarter bigger: the giant), and **Medusa**
(`#/puppet/medusa`, 24 clips, her snakes the tell surface), and **Odysseus**
(`#/puppet/odysseus`, 24 clips): **Athens is complete on the real table
screen.** A late champion's images preload with the room (`Stage.preload`),
and an `arrive` clip, if he has one, plays as he sits down (a clip asked for
before a figure has loaded waits for it).
A master head now runs below the collar (`cut_below`), or the join shows as
a dark seam.
Athens stays the plain table until all five have puppets.
`?room=athens` stages any table in it, to look at a room before its cast.
**The Pirate Cove is complete on the real table screen** too: its room
(flickering lanterns, glints on the water, a gull), **Kidd**
(`#/puppet/kidd`, 24 clips, seat 1), **Silver** (`#/puppet/silver`, 24 clips,
seat 2; Captain Flint is a prop on his shoulder, cut by colour), **Davy
Jones** (`#/puppet/davy_jones`, 24 clips, seat 3, mirrored; when his face
sinks into shadow the lantern nearest him gutters: `gutter` in anim.json)
and **Blackbeard** (`#/puppet/blackbeard`, 25 clips, seat 4). Their prompts
came from `<id>_parts/poses_spec.json` by `art-tools/prompts/poses.py`.
**Camelot's room is built** (candle wheels and sconces flicker; the hearth
fire and its sparks at the far left, on screens wider than 16:9);
`?room=camelot` previews it. **Merlin is built** (`#/puppet/merlin`, 24
clips, seat 1; his staff a prop cut by colour, over his head), rebuilt from
the navy redraw (the owner's pick); **Lancelot is
built** (`#/puppet/lancelot`, 24 clips, seat 2), the first drawn under the
style lock; **the Green Knight is built** (`#/puppet/green_knight` and
`#/puppet/green_knight_bare`, 24 clips each, seat 3, a quarter bigger), in TWO
looks (the owner's, and the design doc's "green armour"): helmed in green
plate, eyes in the visor slit, no mouth (he talks with helm and hands), a
red nick at his neck as he is knocked out; and after his return
(`green_knight_bare_parts/`), helm gone, beaten and colder (a human face, no
green skin: the owner; a bandaged neck, battered armour; his return lines
rewritten colder), a separate puppet the table seats when he comes back
(`RETURNED` in `web/puppet/cast.ts`). The helm has no mouth: a face with
`speech.nod` nods as it speaks. **Arthur is built** (`#/puppet/arthur`, 24
clips, seat 4): **Camelot is complete on the real table screen.**
**Rome has begun: Cerberus is built** (`#/puppet/cerberus`, 24 clips, seat 3,
a quarter bigger, the snakes kept as drawn). His master is the rest pose's
own three heads (the face sheet spaced them differently), with eyes and
muzzles on the middle head only; every head change is a whole-figure frame.
**Scipio is built** (`#/puppet/scipio`, 24 clips, seat 4, mirrored), the
ivory elephant by his right hand; his skin is the drawn rail's orange, so
`rail_orange` takes thresholds (`scipio_parts/README.md`).
**Spartacus is built** (`#/puppet/spartacus`, 24 clips, seat 1), the
shackle scar on his left wrist.
**The Pope is built** (`#/puppet/pope`, 24 clips, seat 2), his master the
rest pose's own head, as Cerberus's; his gold embroidery is the rail's
colour, so the rail test takes only long thin strips (`rail_long`).
**Caesar is built** (`#/puppet/caesar`, 24 clips, any chair, mirrored as
the seat needs; `arrive` sets the wreath on his head as he sits down):
**Rome is complete on the real table screen.**
**Baker Street's room is built** (`?room=baker_street`): the two gas-lamp
flames flicker in the gaps between seats 1-2 and 3-4, the coal fire by
Holmes's armchair at the far right (wider than 16:9 only). The V R sits at
58% across, high: a short screen's ceiling crop (`crop` 140) can take its top.
**Nemo is built** (`#/puppet/nemo`, 24 clips, seat 1), the great pearl on
the felt by his right hand (`keep_white` keeps its highlight).
**Javert is built** (`#/puppet/javert`, 24 clips, seat 2), in a plain black
bicorne (the owner's call over a top hat: less recognisable).
**Holmes is built** (`#/puppet/sherlock`, 24 clips, seat 4, mirrored),
bareheaded in his own sitting room (Javert asks about it, in banter). **His
deerstalker look is built too** (`#/puppet/sherlock_deerstalker`, 24 clips,
`"of": "sherlock"` in its anim.json, like `green_knight_bare`): the owner's
unlockable second look: once Holmes is unlocked, beating him heads up earns
the hat (the owner). Earning it is a mark, "The Deerstalker"
(`table_won_heads_up` with `rematch`: the last hand dealt was heads up with
him, the player won, and he was beaten before the sitting began; the director
reports `headsUpWith` and `beatenBefore` in its TableFacts). Once it is in the
ledger he wears it wherever he sits, curtain-call portrait included (`LOOKS` in
`web/puppet/cast.ts`, by mark), from the next sitting on: presentation only, no
ENGINE_VERSION bump. At an open table he is bareheaded and the hat is a pick
of its own ("Sherlock", a second look), so two Holmeses can sit at once. `npm run check:look` forces it.
**The Cheshire Cat takes Alice's chair** (seat 3, mirrored; the owner's call,
ENGINE_VERSION 12: the Alice sheets drew as Disney's). The design doc had
rejected him as unreadable; his tells answer that: his tail, eyes blinking one
at a time, and vanishing tail first, grin last (reliability ~0.8, the reading
table's legible guest). Loose and aggressive (3000 cash hands: VPIP 50, AF
1.4), the table's donor at -180 to -240 bb/100 (Alice was -91). His
dialogue replaced hers line for line; draft like the rest. **He is built**
(`#/puppet/cheshire_cat`, 24 clips), redrawn gothic the Wolf Man's way (his
Cerberus-style sheets are in `sources/old_style/`), with the big win and the
crushing loss; vanished parts are drawn as plain white, the grin left alone is
placed where his mouth is at rest, and he talks through the grin:
**Baker Street is complete on the real table screen.**
**Transylvania has begun: Van Helsing is built** (`#/puppet/van_helsing`, 25
clips, seat 1), redrawn gothic like the rest of his table (his flat-cartoon
sheets are in `sources/old_style/`), his doctor's bag on the felt by his left
elbow, his spectacles the strong tell (off, polished, back on). **Transylvania's room is built**
(`?room=transylvania`): Dracula watches from the chair by the fire at 73%
across (a presence piece, mirrored to face the table) until he sits down;
the hearth fire flickers at the far right (wider than 16:9 only), the
candelabrum's three flames at 39%.
**Jekyll and Hyde take Frankenstein's Monster's chair** (seat 2; the owner's
call, ENGINE_VERSION 13: the Monster's gothic sheet read as a handsome actor,
kept in `monster_parts/sources/rejected/`). ONE chair, TWO men: each sitting
deals Jekyll OR Hyde, 50/50, tossed once from the sitting's seed
(`sittingSeats` in content.ts; the save keeps the seats it was dealt). At an
open table the player picks, and may seat both. Once Dracula has sat down and the one dealt
in is knocked out, the OTHER walks back in to an empty chair the next time
the player WINS a pot holding the same two ranks as the hand that knocked him
out, whoever's hand that was (the player's or an AI's; ranks, not suits; a
later win, never the knockout itself): `other` in both character files, an
Arrival with `onHumanWinLike` + `afterArrivalOf` in game.ts, `npm run
check:other` forces it both ways round. Jekyll is tight and apologetic (3000
cash hands: VPIP 24, AF 0.4), Hyde loose and aggressive (VPIP 62, AF 2.1);
`npm run sim` now runs a two-man chair's table twice, once with each. Both are
built (`#/puppet/jekyll`, `#/puppet/hyde`, 24 clips each), the first gothic
puppets (the Horseman's style); Hyde at 0.88 scale, small as Stevenson has
him, in Jekyll's coat; his sheets' table edge arcs up between his arms, cut by
pose_rig's `fill_rail`. **The Wolf Man is built** (`#/puppet/wolf_man`, 24
clips, seat 3, mirrored), redrawn gothic (his Cerberus-style sheets were never
built): a real wolf's head, his ears the tell surface, a howl for a big win.
**The Headless Horseman is built** (`#/puppet/headless_horseman`, 24 clips,
seat 4, mirrored): a pumpkin on his collar is his face, and its candle the tell
surface (burning brighter, guttering); he talks by the light in his own
carving brightening, and never blinks. **Count Dracula is built**
(`#/puppet/dracula`, 24 clips, any chair, mirrored as the seat needs), in the
owner's look (young, caped, red-eyed, fanged; the cape is the 1927 stage
play's, ASSETS.md), his chalice on the felt; `arrive` sweeps his cape back as he
sits. **Transylvania is complete on the real table screen**, his arrival
included.
**The Station has begun: the Astronaut is built** (`#/puppet/astronaut`, 24
clips, seat 4, mirrored), a man (the owner's call), his helmet on the felt; his
sheets are the Station's style baseline (the Grey's first sheets drew airbrushed).
**The Robot is built** (`#/puppet/robot`, 24 clips, seat 3, mirrored): its chest
lamp, eye lamps and grille are the tell surface; it talks by its own grille
lighting up. **The AI is built** (`#/puppet/the_ai`, 27 clips): the Robot taken
over (the owner: "just change its glow"), made from the Robot's built images by
`art-tools/the_ai_parts/recolour.py`: its chest lamp a pale, cold white lens
(never red: HAL), its eye-lamps dark; its tells are the lens narrowing and
dimming (two frames made from the Robot's), `arrive` the slumped body sitting
back up in the Robot's chair. **The Station's room is built** (`?room=station`):
the open ceiling lens stands in its socket while the AI watches, and at the turn
the room swaps to `after.webp` (lamps off, amber, never red; `backdropAfter` in
room.json, drawn once the presence is 'after', so a resumed sitting lands in
the right room). **The Martian is built** (`#/puppet/martian`, 24 clips, seat 2):
Wells's head in a brass seat, its two bunches of tentacles lying on the felt as
its forearms, its tentacles and odd blinking eyes the tell surface. **The Grey
is built** (`#/puppet/grey_alien`, 24 clips, seat 1), from the redrawn sheets:
its mouth never moves, so its face pieces are made from its own head
(`grey_alien_parts/eyes.py`): the sideways membrane (its blink, rare, and its
strong tell) and a glow in its eyes when it speaks. **The Station is complete on
the real table screen**, the turn included: the Robot knocked out, the room goes
amber and the AI sits down in its chair.
**The Phoenix is built** (`#/puppet/phoenix`, 24 clips, the Pyre's one chair):
the Station's graphic-novel style, its wings its forearms, its crest the tell
surface (flaring, dimming to embers), a beak that opens as Death translates, and
it burns down when knocked out. **Every room is built, and every table is
staged on the real table screen** (`#/intro/<table>`): the Pyre (heads up: the
Phoenix at seat 3's place, beside the rising sun), the Hall of Doors (two
plates of one room: `champions_1` with the left doors open, `champions_2` the
right), and the Last Crossing, in its own format (the owner's call): the one
time the player is SEEN, the Stranger (`#/puppet/stranger`) in the left chair
with the scarf, hat band and cuffs in the colour the player picks in Settings
("Your colour": baked masks tinted at load, `web/puppet/accent.ts`); Death as a
player (`#/puppet/death_player`, three-quarter, mirrored) in the right; and
**Pravuil, the Recording Angel** (`#/puppet/pravuil`, front-on, the dealer's
clips) dealing between them. "Pravuil keeps the books. Someone has to witness
this." The room says so in data (`dealerId`, `dealerName`, `cast`, `you`,
`youAs` in room.json, from pieces.json); Death's lines come from his chair
wherever he is seated, and the Stranger acts out the player's own actions,
peeks, wins and losses and fidgets at random: never a tell. A heads-up room
gives its own chairs in pieces.json (`seats`). The single-player game's art is
complete; Death and the Stranger as ONLINE avatars wait on online (FIX-LATER.md).
**Rome's room is built** (`?room=rome`), from the redrawn plate (the
first put both braziers behind seats 1 and 4; the prompt now gives exact
places): the brazier fires flicker in the gaps between seats 1-2 and 3-4,
and Caesar's wreath waits on the cushion in the niche by the door until he
arrives. The niche came out at 37%, behind seat 2's head, so the wreath
shows mostly once that chair is empty.
**The style lock** (the owner: Davy Jones and Merlin
drifted from the presidents' cartoon toward detailed illustration): each
character's first prompt used to borrow the LAST character's sheet, so the
style drifted a step each time. Now `poses.py` (`"style_lock": true`) names
one fixed style reference, Washington's pose sheet A, attached to every
prompt, and says the style in words (few lines, big smooth shapes, flat
colour, no texture). The redrawn Merlin is back in the presidents' style.
`CHARACTER-ART-PROMPTS.md` carries all of this, and every character is to be
redrawn under it. Lincoln was the first kit drawn that way (flat cartoon
style, the owner's pick); the whole White House table (Lincoln, FDR,
Roosevelt, Washington) is now built, all by `seat_puppet.py`, from
three-quarter expression sheets drawn to one layout (four heads each way,
cut by `cut_sheet.py`). Lincoln has his hatted heads and the same heads bare,
so he can tip his hat. **Arms rest along the table's edge, hands together
in front** (`"pose": "rim"`; the owner's sheets add seated reference poses
and draw forearms as plain tubes): all four are built that way, from rigging
sheets in Lincoln's layout. FDR has his naval cape back; Roosevelt has no
cigar (he did not smoke; FDR's holder is the table's one thing in a mouth).
**Animation has started: Lincoln (approved by the owner), then Washington.** `web/puppet/` is a generic canvas puppet
player: the pose is rebuilt from rest every frame and the face and each clip
add to it, so face and arms are independent and a clip that ends at zero
returns exactly to rest. Shapes swap, never cross-fade (no mouth ghosts);
limbs rotate about elbow and wrist and may only foreshorten, never stretch.
Lincoln has blinks, gaze, brows, letter-driven speech, idle sway and breath,
and 26 clips: every poker action, his three tells beside their decoys
(beard / chin, leaning back / stretching, the small smile / amused), the hat
tip and greeting, and his beats. There is no clock in the White House room
(the owner): his clock-glance idle, the room's mantel clock and its ticking
were cut. His laced hands mean any gesture moves both arms, so
apart from the check every pose is a whole-figure frame, with the master head
riding on it or, where a hand is at his face or hat, its own drawn head. His puppet is built by `art-tools/pose_rig.py` from
the complete pose drawings (the owner's call: they are the source of truth):
each forearm, cuff and hand is ONE piece turning about the elbow (no wrist
joint), alternate pieces from other poses registered to hang on the same
elbow, the upper arms drawn over the joints, the rest pose validated against
its drawing. The laced hands of his rest pose cannot be parted, so the check
changes arm pieces at the start and end of the lift. Sheets B and C were
drawn at other sizes, so their poses carry a hand-set placement (`reg`). Preview it at `#/puppet/lincoln` (the bench: trigger,
loop, slow, scrub, beside the reference pose).
Washington is built the same way from his four pose sheets and face sheet
(`#/puppet/washington`), with all 23 clips: every poker action, his three
tells beside their decoys, and his beats. His hands rest apart, so a one-arm
gesture changes only that forearm, in the air. Poses that move his whole body
(bet, all in, collect, the heads-up lean) are whole-figure frames placed by
the table, with the master head moved onto their neck. His master head
replaces the poses' head outright (`replace_head`). FDR is built the same
way (`#/puppet/fdr`, 23 clips), his cigarette holder its own piece on its own
bone so his strong tell (holder up) is a tilt; his sheet B was redrawn after
the first drew Washington's lace cuffs. Death, the dealer, is built the same
way (`#/puppet/death`, 26 clips: the deal to either side and to you, burn,
flop, turn, shuffle, cut, rake, the pot to each side, the lesson gesture, the
guest's way out, heads-up steepled fingers, head turns, and the finale's own
actions); front-on, under a robe, so every pose is a whole-figure frame with
his talking head riding on it (cut-out hands did not meet his sleeves), and
his jaw talks. Roosevelt is built the same way (`#/puppet/roosevelt`, 24
clips): the whole White House table and its dealer are now animated puppets.
**They play on the real table screen** (`web/puppet/stage.ts`): a table whose
room is drawn (`ROOMS` in `web/puppet/cast.ts`) with a puppet for everyone
dealt in is STAGED, the room and figures on a canvas under the felt and the
game's plates, cards and chips over them; anywhere else keeps the plain
table. The figures act out only what the screen already shows: each
opponent's action, peeking at the deal, showing at showdown, reacting to a
win by its size (the owner: raking the pot in is the chips' job, and lame; an
ordinary pot is `win_small`, a nod and a smile built from the head and mouth
every puppet has, `art-tools/build/win_small.py`; a pot worth most of the
stack is the big win, `win_big`, hands raised, from a reactions sheet E (every
puppet has one: `art-tools/build/reactions_sheet.py`, ART-PIPELINE.md)),
losing a contested pot (`lose_big`, the crushing loss, the same way), going out, the
heads-up lean; Death deals (from his
deck: the card flights start there), lays the flop and turn, pushes each pot
toward its winner, shows the guest out; lips move to callouts and lines; a
tell or idle is acted by its WORDS (`cues` in anim.json, held to the
character's data by check:data), real tell and ambient noise alike, **held
on their pose 2.5 s, then snapping back** (the owner: "held for a few seconds
so that it's obvious he moved, then snap back, and if you miss it, oh well";
`hold` in the clip, `art-tools/build/tell_hold.py`; after the hold the rest
of the clip plays at `SNAP` = 3x, player.ts): every cued clip and fidget
alike, never the tells alone, or length would be the tell. A held gesture is
never cut short by the next action (`cue` in stage.ts: the action waits, and
is dropped if stale), or the ones cut short would be the noise. One at a time
(no ambient gesture starts while another seat's is playing), plus
wordless fidgets and decoys (`fidgets`). Clips run at the pace setting and
are never started in a resume's catch-up; an action's clip is never started
under fast-forward, but a gesture is (`gesture` in table.ts: folded hands are
when the table is watched, rule 6); an idle never interrupts anything; Reduce motion stops sway and breath. **Every figure
is alive at rest** (the owner: "living figures"): blinks, glances, breathing
(1.3% of the torso), head sway (1.1 degrees) and a slow weight shift of the
whole upper body (0.45 degrees about the table line; `sway.body`), Death at
half that, all set by `art-tools/build/life.py`. Going out, a figure plays
its `knocked_out` clip if it has one, then **fades from the chair** (0.8 s,
stage.ts; the owner: a line, then gone); a puppet with no heads-up drawing
leans in from its rest pose (`art-tools/build/fallback_clips.py`).
`python3 art-tools/build/puppet_audit.py` holds all 43 puppets to the same
list and prints 0 missing. The table
loads half-size images (decoded, the five full-size puppets are ~350 MB).
**IK arms, the owner's pick: Washington's way.** A two-bone IK arm on the
same Canvas 2D puppet player (`web/puppet/ik.ts`, `web/puppet/README.md`),
ON by default (`?ik=0` for the old clips). Two ways to make the parts were
tried side by side, and the owner chose hands DRAWN AS PARTS: Washington's
rigging-parts sheet (`art-tools/washington_parts/RIG_PARTS.md`, built by
`ik_build.py`; eight `_ik` clips: check, tap, peek, call, fold, show,
square, talk) over Lincoln's arm cut from a pose drawing (retired: his cast
entry no longer loads it; `ik_split.py` and his `ik.json` stay as a record).
The elbow bends to put the hand on the felt and returns exactly to rest; a
cut-short clip hands back over 0.15 s instead of snapping; a chain's `under`
image covers the smear a pose-built body has where the resting arm lay.
`#/iktest` shows Washington in seats 1 and 4; `npx tsx web/puppet/ik-check.ts`
checks every `_ik` clip. Each next character needs a rigging-parts sheet.
**Layering rule for the table screen:** the room's table covers a puppet only
below the puppet's own table line as well as below the rim (see
`web/puppet/README.md`); the end seats' rim curves up above the drawn rail.
**JFK is the White House's hidden visitor (ENGINE_VERSION 11; the owner's
call, which settles the rule 5 question his 1963 death raised: a real person
is a likeness question, not a copyright one; see ASSETS.md).** Win a pot at
the White House holding a three and a five while a chair stands empty, and
the thirty-fifth president walks in and sits in it with an average stack
(`visitor` in the table file; an Arrival with `onHumanWin` in game.ts; his
entrance is `visitor_arrival` and his banter `jfk_table` in the White House
dialogue). Tour and open tables alike, once a sitting, never if he is already
seated, never if the win ended the table. Role `guest`: off the ROSTER and the
map, a Ledger page once met, dealt in at open tables after that, secret mark
"Thirty-Five". `npm run check:visitor` forces it. Always "thirty-five", never
"3/5", which at a table with Washington and Lincoln reads as the Three-Fifths
Clause; and nothing ever refers to his death. His old seat_puppet kit has one
face; **the style-locked redraw is built** (`#/puppet/jfk`, 25 clips, from
`jfk_parts/POSES.md`): hands empty, the big win (fists raised) and the
crushing loss (a hand over his eyes) among his 24 poses, an `arrive` clip as
he walks in, any chair, mirrored as the seat needs. **Loki is built** the same
way (`#/puppet/loki`, 26 clips; his half smile and amber eyes are face swaps)
and plays `arrive` as he takes the banished player's chair. Both guests'
kits are written by `art-tools/build/rig_from_spec.py` from a short
`rig_spec.json`, the master their rest pose's own head
(`art-tools/build/own_master.py`).
**The Phoenix is the hidden grind (the owner's design: "a very rare character
to unlock").** Finish SECOND at all eight story tables (tour sittings, any
order, `save.phoenix.seconds`), then win the eighth, and its table opens: The
Pyre (`kind: 'hidden'`, `data/tables/pyre.json`, the temple of the Sun at
Heliopolis), one heads-up sitting, dealt by Death. Beat it and it is unlocked
(a guest with `unlockedBy: 'beaten'`, so meeting it is not enough to deal it
in at open tables; secret mark "From the Ashes"); lose and the gauntlet
RESETS: every second place forgotten, the pyre closed. Once beaten it never
reopens. Rules in `advanceGauntlet` (tour.ts), checked by `npm run
check:phoenix`; the results screen marks each step (the eighth second, the
opening, the reset). It is mute (Death translates), never tilts, and is the
second-best heads-up player in the game: 55% against Death 58% (`npm run
headsup 30` with the late champions). Its prompts: `phoenix_parts/POSES.md`;
its room: ROOM-ART-PROMPTS.md.
Lincoln wears his hat at all times. Death wears a black hooded robe with a
purple lining and a gold skull brooch (the owner's call, over the drafted grey
shroud); rooms keep enough light behind him that the black reads.
**The screen is game first** (the owner): laid out for 16:9, wider phones
show more backdrop. Five figures across the top half (Death dead centre,
furthest back), each about a fifth of the width, so a face is ~40 points on a
small phone and tells must be big shapes (props, hands, head). The felt fills
the bottom half and carries the whole game. `art-tools/mock_screen.py` checks
new art against that layout.

## KNOWN GAPS AND SIMPLIFICATIONS

- **The tell model is still one-signal-per-decision** (`emitTell`) plus
  ambient noise. The design doc's real model — meaning only in COMBINATIONS
  during a live hand — is Phase 7's cluster logic and needs the Rive rig.
- **All content is draft.** Profiles, table text and dialogue were written to
  the design doc's rules and pass `check:data`, but no human has edited them.
  The facts below were checked against the primary texts (Gutenberg,
  Founders Online, Plutarch, Suetonius, the Eddas) and hold; four slips
  were fixed (the Edinburgh doctor came after the trampling; Washington's
  swearing order is 1775 as well as 1776; Caesar swam Alexandria's harbour;
  the kernels' smell hung in the air). JFK's "not the Republican answer"
  line was cut (the owner: no partisan lines about political parties, at all;
  history in a profile, like Teddy's third-party run, is not a line). Flagged were: Kidd's exclusion from the 1698 pardon,
  Javert's mother as a "tireuse de cartes", the Transylvania references
  (Lucy's four transfusions, "King Laugh", Van Helsing's rifle). From the
  banter pass: Kidd's bucket, Silver's "immortal Hawke" (Treasure Island
  ch. 7), Crassus standing surety for Caesar's debts, Washington's 1776
  order against swearing, Lincoln's 1842 line on the name of Washington,
  the Sussex Vampire index entries, the Long Island
  retreat. From Jekyll and Hyde's lines: Enfield's "about as emotional as a
  bagpipe" Sawbones, Dracula's Piccadilly house, the Count able to "grow and
  become small", Lanyon's phial of "blood-red liquor", "the smell of kernels"
  at Hyde's death.
- **The staged table (first pass) has gaps.** Someone without a puppet who
  sits down mid-table would leave the chair empty, plate only (both guests,
  JFK and Loki, now have puppets, and so does the Phoenix). Death's `rake`
  and `thumb` frames still draw chips and a card of their own; the deal now
  plays ONE deal clip a hand (its side by turns), timed so the thumbed card
  leaves as the first flight does, and the cards fly from just under his
  plate, never across it. Fixed since: every bubble (lines, narration,
  Death's line, callouts) is up on a timer as well as its animation, so
  Reduce motion shows it still, and a new bubble takes down any it would
  cover (`showBubble` in table.ts); bets lie under their plate, moved out
  toward their own side where they would lie on the board or your cards
  (`clearUnder`); the table bar grows with the screen; a window narrower
  than 16:9 carries the room's ceiling up into the dark (stage.ts); and
  nothing is dealt until the room is drawn (5 s at most). On the smallest
  phone (667x375) the board sits right of your cards, and at the river an
  open raise panel covers the pot (the board slides left only as far as
  your cards).
- **Roster count is 36, not 32.** The v4 table lists 5 characters at Athens,
  Transylvania and the Station (4 seats + a late champion), and Rome now has
  them too: **Scipio Africanus holds Rome's fourth chair** (the owner's call,
  ENGINE_VERSION 10), the "fourth NPC holding the chair" the design doc's rule
  asks for. Caesar still takes the first chair to come free. Scipio is the
  table's tight reader (3000 cash hands: VPIP 22, AF 1.2, against Spartacus
  44 / 1.6, the Pope 30 / 1.4, Cerberus 29 / 0.9, Caesar 39 / 1.8); his tell
  surface is an ivory elephant from Zama. His lines are draft like the rest.
- **Dials are tuned on 3000-hand cash sims** per table (`npm run sim 3000
  all`) — enough for VPIP/AF, not for win rates. Retune on more hands. The
  early tables keep deliberate caricatures (Roosevelt, Lancelot, the Cyclops
  lose heavily to bots) because beginner tables should be exploitable.
- **Bot-against-bot heads-up is mostly the cards.** Matches last 10-35
  hands and are settled by a few early all-ins. The ENGINE 8 ladder's spread
  (44-58%) was mostly noise: pairs differed by 11.4 points against 10.2 from
  luck alone. An experiment (never shipped) that let one side SEE the other's
  cards won only 68-80% of mirror matches; reading bets better was worth
  about nothing on its own; position awareness, thinner value against
  stations and trusting big bets more were tried as parts of skill and
  dropped (no gain in mirror or probe tests; position made Washington fold
  more to a maniac). What separates players here is reading tells, which is
  why the legibility curve and the skill curve had to move together. For
  "is this character hard to exploit", test against probes (a bully, a nit,
  a station, a regular) rather than against the cast.
- **Late arrivals never take the player's chair.** Caesar (Rome,
  `afterEliminations: 1`) took the first empty chair, so a player who went
  out first found Caesar in their seat and played on as him, no loss
  recorded; Dracula could do the same. Once the player is out, no arrival
  happens at all (`processArrivals`): the sitting is over.
- **Players out in the same hand are placed by the chips they started it
  with**, not by chair. Places still repeat when a late champion joins
  (Cerberus 4th, then Caesar 4th): the field grows mid-table. Left as is.
- **Known small presentation gaps (final playtest):** the uninvited guest's
  scene is cramped at 667x375; "Entered in the ledger" toasts sit over the
  opponents' names for ~5s; at 667x375 the intro's "Take your seat" starts
  just below the fold; reloading mid-way through the guest's scene restores
  him but skips the scene without a log line.
- **Blind pace (the owner: "blinds need to go up sooner").** Levels last 8-9
  hands (12 at the finale), under two orbits five-handed; the first three
  orbits are still 100bb/67bb deep. With a scripted player seated, tables
  take ~51 hands (were ~92) and the finale ~81 (was 140). The first bust
  comes at hand 5-9 at any pace -- the bots stack off deep -- so the pace
  only governs the 3-handed/heads-up back half. Anything counted in hands is
  coupled to this pace: the Green Knight's return (20), Odysseus's delay
  (10), Brief Acquaintance (25). `npm run tourney <table>` plays 4-handed
  with no player seat, so it understates real table length.
- **Tightness saturates.** Above ~0.75 the dial barely moves VPIP; the
  quirks (`patient`, `calls_small`, `steal`) move it far more. Tune with them.
- **An existing White House line genders the player** (`wh_p0_03`, "the look
  of a man who has read about poker"). Every newer line avoids it; this one is
  the owner's to change.
- **No position awareness.** Tried with ENGINE 9 as part of skill and dropped
  (see above): still the most realistic thing missing, but not a difficulty
  lever in this engine.
- Adaptivity scales bluffing by the fold rate a player bets into. Unskilled,
  that is the table's, once it has faced 20 bets; with skill it moves toward
  the players actually in the pot, read sooner.
- **`readBet` and `readTell` were measured in ENGINE 8's room.** Skilled
  players change what bets and tells mean (they re-bluff less, so a re-raise
  is stronger still). Re-measure after big changes: log, for every bet faced,
  equity against the plain range and against the bettor's real cards, and
  bucket by street, raises and the bettor's bets this hand.
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
- **Bets are READ (since ENGINE_VERSION 3).** Equity used to be measured against
  any two cards, so a pair of eights was a 65% favourite against a pot-sized
  bet and the AI called it down: on calls into big bets the AI estimated 46%
  and actually held 10% against the bettor's real hand. Now, facing a bet,
  the bettor is dealt from a range (`betRange` in decide.ts: bigger bets and
  river bets narrower, a short stack's preflop shove wide), and each
  character believes it as far as its `betRespect` dial says -- low is
  the calling station, and the Green Knight keeps that job. Clearly bad
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
- **Bets have reasons (ENGINE_VERSION 7; the owner's Baker Street notes:
  Javert tight yet raising bottom pair, Nemo raising 7-2, predictable
  sizing).** With nothing to call, the value bar used to fall to about 20%
  equity, so the AI raised junk from the big blind and bet air at its
  aggression rate. Now: before the flop, unraised, the bar is a hand worth
  opening; after it, a share above an even split of the pot (heads-up about
  top pair; tightness is kept out -- it decides which pots to enter, not
  whether to bet a made hand). `bluffWeight` chooses bluffs: by strength
  score before the flop (7-2 gets none), then draws, then continuation bets
  by the player with the initiative, and on the river only hands without
  showdown value. Raises call first and then add a share of the pot
  (`raiseTo`, also used by every quirk's `potFraction`): min-raises were 45%
  of all raises and handed draws their price. Size comes from aggression,
  board wetness and a wobble, never from hand strength, so a bluff is sized
  like a value bet. Checked to, how OFTEN they bet now follows the hand
  (air 9%, top pair 39%) where it used to be flat. Still true: equity when
  checked to is against random hands; fold-rate reading waits for 20 faced
  bets; check_raise / overbet / charge sizes are true pot raises now and
  were not retuned; no position awareness.
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

## GOTCHAS THAT COST TIME BEFORE

- **Bump `ENGINE_VERSION` in `src/save.ts`** whenever a change would make an
  old decision log replay differently: engine rules, decide(), a quirk, ANY
  dial, a table's cast, anything that draws from the game RNG. A seat saved
  under another version is released with an explanation rather than replayed
  into different cards; a replay that hits an illegal action does the same.
- **Tells are drawn from the game RNG in every game** (ENGINE 9), watched
  or not, because the table reads them. Before, only a game with an event
  listener drew them, so a sim and the web game dealt differently from the
  same seed. `tell` events carry `correlate` and `honest`: hidden
  information. The screen must never show them; the director reads them only
  for seats whose cards were turned over.
- **Nothing on the presentation side may touch the game RNG.** The director
  has its own seeded stream (seed XOR a constant); ambient idles and
  "thinking long" use Math.random. Picking a line from the game RNG would
  change the next card. `check:replay` catches it.
- **A tight player needs a hand worth playing before the flop, at any price**
  (ENGINE_VERSION 8; the owner: "Javert needs to play good cards, not shit
  like 8/3"). Pot odds alone let rags in -- a small blind's half-bet, a big
  blind facing a small raise -- so `decide()` has an entry floor on the
  strength score: (tightness - 0.5) x 1.3, capped at 0.33 so small pairs
  (0.35) and A-9 stay playable. Not against an all-in, not under 12bb, and a
  free big-blind check is not an entry. Javert's voluntary junk showdowns
  fell from 41 to 16 per ~2,800 hands dealt; most junk he still shows is a
  free big blind checked down, which is correct poker. Tight VPIPs (3000
  cash hands): Lincoln 16, Dracula 15, Washington 20, Javert 23, Arthur 25.
- `patient` only counts a raise costing more than `openBB` (2) big blinds to
  call: an ordinary open against the big blind is not a test of patience.
- A quirk's `potFraction` facing a bet is call + fraction x the pot after
  the call (`raiseTo`), not a fraction of a pot that already holds the bet.
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
- **Callouts key on PUBLIC information only** -- never `e.equity` or
  `decision.reason` in `src/chatter.ts`. check:data's leak-phrase list is
  the guard on wording ("nothing to", "bluff", "my cards"...), and a
  callout must never reuse the speaker's own tell text.
- **A banishment is not an elimination:** no place, no knockout, not in
  `busts`, no respect. The chips change owner and `chipsTotal` is untouched.
  A guest must never be put in a table's seats (data-check refuses it), and
  "six seven" may appear only in `uninvited.offence` (a data-check tripwire).
- In a mark condition `minRank` means "this or better"; use `rank` for an
  exact hand. data-check rejects unknown rank names, which used to match
  every hand silently.
- Any new chip-handling code needs a conservation check. `tourney.ts` has one,
  and it is the only reason the poker-ts pot bug was found rather than shipped.
- `patches/` is load-bearing. `npm install` runs `patch-package` via
  postinstall (`web/patches.mjs install`); if that step is ever skipped,
  chips start vanishing again.
- **Dev machine is Windows.** `new URL('.', import.meta.url).pathname` gives
  `/D:/...` there — a leading slash that path-joins into `\D:\...` and 404s
  everything. Use `fileURLToPath`. Node scripts must not assume POSIX paths or
  that npm runs them from the repo root.
- After pulling, `npm install` before `npm run web`. The web build needs
  esbuild, which older checkouts do not have.
- **A pull that changes `patches/` used to need `node_modules/poker-ts`
  deleted first.** `npm install` keeps the installed poker-ts (same version),
  so patch-package tries the new patch over the old one and fails -- and
  locally it used to exit 0, leaving the OLD engine in the bundle. That is
  how a player's nut flush lost a main pot to a pair of tens at Camelot,
  weeks after the side-pot fix. Now postinstall is `node web/patches.mjs
  install`: it stamps node_modules with a digest of `patches/`, and when the
  stamp is stale (or patching fails with no stamp) it puts each patched
  package back as published -- the lockfile's tarball, from npm's cache,
  unpacked over the old copy -- and patches again with `--error-on-fail`.
  So plain `npm install` is the cure. `npm run web` still refuses to build
  against any other stamp, and the game itself refuses to deal on the wrong
  rules (`src/engine-guard.ts` plays two stacked hands first). If you change
  the patch, check the guard's two hands still settle as it expects.

## NEXT MILESTONE

Phase 4 — the platform shell. What is left of it: a real device (Capacitor
is scaffolded for iOS; Android is `npx cap add android`),
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
3. ~~Capacitor scaffolding~~ (iOS done; Vite/React only if they earn it),
   then the device test.

Also owed before Phase 5: a human edit pass on the draft dialogue. The
naming decisions are settled (the owner): "The AI" stays the AI, the Pope is
Alexander VI, "The Wolf Man" stays (ASSETS.md).

**Dev machine is Windows; iOS builds happen on the owner's Mac** (Xcode
only runs there). A free Apple ID installs to the owner's own iPhone for 7
days at a time; TestFlight and the store need the $99/yr account. Android is
$25 one-off and works from Windows.

## HOUSE STYLE

- Small, readable, boring code. No frameworks we don't need.
- Characters, dialogue, and rosters are **data**, not code.
- **No line takes a side between political parties** (the owner), whatever
  its source: no "Republican answer", no party names in anything said. A
  profile's history may stay (Teddy's third-party run, Kidd's Whig backers).
  check:data's tripwires hold it.
- If a decision contradicts the design doc, stop and flag it rather than
  silently overriding — the doc records *why*, and the why usually matters.
