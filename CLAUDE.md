# CLAUDE.md — Legends Poker: Death's Invitational

Read this before touching anything. It is the short version of the decisions
that are already settled, so we don't re-litigate them every session.

**Art work (drawing and building the cast): read `ART-PIPELINE.md`** for the
workflow, the build steps and the queue.

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
  screens/        title, invitation, map+intro, table, results, ledger,
                  settings+about, ending. table.ts keeps the 3b presentation queue
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
ROSTER.md         GENERATED casting book: never edit by hand
ART-PIPELINE.md   the art workflow, step by step, and the queue of characters
art-tools/
  split_parts.py  cuts an AI-generated parts sheet into layers + parts.json
  cut_sheet.py    split_parts plus each kit's fixes as data (<id>_parts/cut.json):
                  pieces that touched, a prop drawn across the next head
  build_puppet.py init/render a layout to preview puppet assembly
  dracula_parts/  41 split Dracula layers (incomplete — see gaps)
  seat_puppet.py  builds a seated three-quarter puppet from a small spec
                  (<id>_parts/seat.json): trims the cuffs, writes the layout
  faces_preview.py  a strip of every head swap on the seated puppet
  fdr_parts/, roosevelt_parts/, washington_parts/  the White House cast, each
                  with seat.json and <id>_layout.json; see each README
  jfk_parts/      JFK, the White House's hidden visitor: POSES.md (the
                  style-locked redraw); jfk/ and jfk_rig/ are the old one-face kit
  phoenix_parts/  the Phoenix, the hidden heads-up opponent: POSES.md only
  avatar_parts/   the Stranger, the default ONLINE avatar (online is not
                  designed yet): POSES.md only, cosmetic, no tells (rule 3)
  socrates_parts/, leonidas_parts/, medusa_parts/, cyclops_parts/,
                  odysseus_parts/  the Athens table (seats 1-4 and its late
                  champion): pose sheets, face sheet, pose_rig.json;
                  blackbeard_parts/, kidd_parts/, silver_parts/, davy_jones_parts/: the
                  Pirate Cove, the same way; merlin_parts/, lancelot_parts/,
                  green_knight_parts/, green_knight_bare_parts/, arthur_parts/: Camelot;
                  cerberus_parts/, scipio_parts/, spartacus_parts/, pope_parts/,
                  caesar_parts/: Rome (all built); nemo_parts/, javert_parts/ (built), alice_parts/:
                  Baker Street
  lincoln_parts/  Lincoln's kit, three-quarter, hats on and off (the hat tip),
                  arms resting along the rim: the model for the next sheets
  death_parts/    Death's kit (front-on dealer: deal, shuffle, deck, his card
                  back); death_layout.json assembles him
  prompts/        generators for the two art-prompt files below
                  (characters.mjs + parts.mjs, rooms.mjs)
  rooms/          finished room art: table.webp (the one table every room
                  shares) and a folder per venue: its backdrop, and its
                  pieces (pieces.json: the cut, where they stand, story
                  pieces and loops). white_house/, athens/, pirate_cove/, camelot/, rome/,
                  baker_street/
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
  is himself, so the event has `replaces === id`). Open tables (random
  play) unlock at cleared tables and seat a mix of anyone the player has
  beaten, champions included, one chair kept for the room.
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
  (`banter_pairs.<pair>.needles`). Neither needs an ENGINE_VERSION bump.
- **Respect:** per table, points from pots / showdowns / knockouts, tiers at
  4 / 10 / 18, heads-up with the champion forces tier 2, a win forces tier 3.
  The name flip is always announced (toast + the tier's first line).
- **The Ledger:** character pages (history, how they play in Death's voice,
  what YOU have seen them do in words, habits noted), venues, account,
  house rules, and **marks** — 46 achievements framed as Death's entries,
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
- A pot nobody called is won **without showing**: the winner's cards stay
  face down. (The screen used to turn them up, a free read.)

**Not started:** Rive integration, recorded audio and music, Capacitor + a
real device.

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
opponent's action, peeking at the deal, showing and collecting at showdown,
losing a contested pot, going out, the heads-up lean; Death deals (from his
deck: the card flights start there), lays the flop and turn, pushes each pot
toward its winner, shows the guest out; lips move to callouts and lines; a
tell or idle is acted by its WORDS (`cues` in anim.json, held to the
character's data by check:data), real tell and ambient noise alike, plus
wordless fidgets and decoys (`fidgets`). Clips run at the pace setting, are
never started under fast-forward or in a resume's catch-up, and an idle
never interrupts anything; Reduce motion stops sway and breath. The table
loads half-size images (decoded, the five full-size puppets are ~350 MB).
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
face; `jfk_parts/POSES.md` is the style-locked redraw (6 images); until it is
built the staged table shows his plate in an empty chair.
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
  Facts writers flagged to spot-check: Kidd's exclusion from the 1698 pardon,
  Javert's mother as a "tireuse de cartes", the Transylvania references
  (Lucy's four transfusions, "King Laugh", Van Helsing's rifle). From the
  banter pass: Kidd's bucket, Silver's "immortal Hawke" (Treasure Island
  ch. 7), Crassus standing surety for Caesar's debts, Washington's 1776
  order against swearing, Lincoln's 1842 line on the name of Washington,
  the Sussex Vampire index entries, Alice's marmalade, the Long Island
  retreat.
- **The staged table (first pass) has gaps.** Someone without a puppet who
  sits down mid-table (the uninvited guest) leaves the chair empty, plate
  only. Two speech bubbles can overlap (a seat's line under Death's). Death's
  clips draw their own cards and chips, which double the game's flights for a
  moment. A window narrower than 16:9 shows the room low with dark above.
  Plates are fixed-size type, so on a large monitor the game reads small
  against the art.
- **"Reduce motion" hides the older speech bubbles.** With it on, `.say`
  and `.narration` only become visible through an animation the setting
  switches off, so those lines reach only the log. Callouts use a timer and
  are unaffected; the fix is the same timer for the older bubbles.
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
