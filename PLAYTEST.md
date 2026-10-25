# PLAYTEST.md — a full playthrough, what was fixed, and what to do next

October 2026. The game was played end to end in a real browser (Chromium;
landscape phone 844x390, also 667x375 and 1920x1080) through its real UI: a
bot read the cards off the screen, decided with the game's own equity code,
and pressed the buttons. Its last version plays like a solid tight-aggressive
player and reads tells the way a player who has learned them would (from the
poses, which the screen reader's log names). Alongside it, about 5,000
tournament sittings were run headless with six probe bots in the player's
seat (tag, tag + tells, maniac, pusher, station, nit), and every puppet and all
~3,400 lines of dialogue were audited.

## What the playthrough did

Every table was cleared, the finale included, and 37 of the 49 marks written.
Tries to first clear a table:

| table | tries | | table | tries |
|---|---|---|---|---|
| White House | 1 | | Baker Street | 6 |
| Athens | 2 | | Transylvania | 14 |
| Pirate Cove | 2 | | The Station | 1 |
| Camelot | 26 | | Champions I | 8 |
| Rome | 1 | | Champions II | 8 |
| | | | **The Last Crossing (Death)** | **1, in 13 hands** |

(Camelot's 26 is partly the bot: its first two versions counted the pot
twice. The probes, which had no such bug, found Camelot ordinary.) 2,013
hands; 11 tables won, 59 lost. Loki was met at the Pirate Cove (the six-seven
event fired naturally). Not reached: the Phoenix (2 of 8 second places), JFK,
Hyde (met, not beaten), Holmes's deerstalker, "Again", and the luck marks
(royal flush, a chip and a chair, losing a showdown with a full house).

The headline: **the final boss went down on the first try, in 13 hands.**

---

## Fixed in this pass (ENGINE_VERSION 15)

### 1. Death is a final boss now
Before: a plain tight-aggressive player beat him 44% of the time, a
player who shoved every hand 42%. In the hand that ended the finale he called
a 3-bet with Q-6 suited, then bet 1,236 and 2,719 on a board of A-K-Q-J with
one pair. The causes and the fixes, all scaled by the `skill` dial so the
early tables (skill 0) play exactly as before:

- **He paid off a tight player's late bets.** The cast bluffs, so the plain
  read of a bet is wide; a player who only bets real hands was read as if
  they bluffed like Blackbeard. Now a skilled reader keeps two more reads of
  the player, from public information only: **what their bets after the flop
  turned out to be at showdown** (`shownStrength`, against the cast's 0.627)
  and, before the flop, **how often they raise and what their raises showed**
  (PFR against the cast's 0.228, strength score against 0.417). A player who
  bets only real hands is believed; one seen bluffing is called down.
- **Raise wars before the flop read every re-raise as an open.** `readBet`
  now narrows a 3-bet x0.6 and every raise after it x0.6 again (J-J 5-bet
  184bb believing it had 70%).
- **Widening for a loose player was a multiple**, so a player shoving every
  hand was still read as top-40%; it is now a power, which opens a narrow
  range much more than a wide one.
- **Heads-up blinds:** with only the blind to call, equity was the Chen-style
  score (40% of hands under 0.30, though most win over 40% one on one), and
  the tight player's entry floor ignored that there was one opponent. In a
  hand DEALT heads up (the finale, the Pyre, the end of a sitting) a skilled
  player now moves toward real heads-up equity, and the floor falls away
  with skill. (Applied to every pot folded round to the blinds, it loosened
  the cast by up to twelve points of VPIP, so it is not.)
- **Death's own dials:** `heads_up_pressure` came out. The search showed every
  extra bit of pressure made him worse against a solid player (at its widest
  he lost 60%).

Result, 300-600 finales per measurement: the TAG bot 46% → **42%**, TAG +
tells 49% → **38%** (about 40% together, over 600 finales; 100 is ±5), a
maniac 33% → 31%, a nit 22% → 17%. Better, not done: see What next. Against a player
who shoves every hand 34-36% is about the floor: at equal stacks the first
called all-in decides the match, and any two cards win ~40% of those.
The Phoenix (same treatment, bluffs 0.24 → 0.12, aggression 0.74 → 0.65):
TAG + tells 69% → **48%** (the tell fix did most of it); the plain TAG bot
still wins about half (see What next).

### 2. Tells no longer give themselves away (rule 2)
`emitTell` showed a tell before EVERY decision whenever the character had one
for its state: FDR tapped his ash and Washington laid a hand flat before
nearly every action, Odysseus looked at the door ten decisions running, the
table was a parade of held poses, and a character with no "weak" tell gave
himself away by keeping still (silence meant "not strong", every time).
Now a tell shows on `TELL_RATE` (35%) of decisions whatever the hand; silence
carries the base rate (10-17% strong) for everyone; each tell's own
reliability, and so the legibility curve, is untouched (Lincoln's strong tell
88%, Roosevelt's 99% at the first table). The tells bot's edge is gone where
tells were unreliable (Pyre 69% → 48%).

### 3. Mouths move
For 41 of 44 puppets the `talk` clip played with every line swapped in a
whole-figure drawing with its own still head, and the action clips did the
same to callouts: a third of every line was spoken by a face that could not
move. Now:
- speech **waits for the moving head** (`Face.heldBack`, set by the player
  from `Puppet.mouthVisible()`), so a callout said over a `call` pose starts
  its mouth the moment the head is back;
- a `talk` gesture that would hide the mouth is skipped (`hidesMouth`);
  Lincoln's, Washington's and FDR's, which keep the moving head, still play;
- the mouth **stops when the bubble comes down** (it ran on for a second or
  more on 302 lines and most callouts).
Checked on the bench: Socrates and Leonidas now mouth the line after their
pose; Lincoln and Roosevelt throughout.

### 4. AI leaks a player would find
- **The river nuts are bet.** Jekyll, Lincoln, Dracula, the Green Knight and
  Merlin checked near-certain winners through on the river 59-71% of the
  time; a hand over the value bar on the river is now always bet (the
  character's passivity shows in the size).
- **`patient` no longer makes the big blind free to steal**: it now tests only
  raises over three big blinds to call, so an open of up to four is defended
  like anyone's (Lincoln, Scipio, Van Helsing, Jekyll, Javert and the Robot
  folded 93-99% to a 4bb raise). At four the patient stopped being patient
  (Javert's VPIP 25 → 38), so it stays at three.
- **`committed` minds the price**: stubborn, not suicidal (Leonidas called
  69bb on the river with nothing).
- **Blackbeard** (the weakest player at his own table, -136 bb/100) and
  **Caesar** (lost to his own table) re-dialled: Blackbeard aggression 0.78 →
  0.68, bluffs 0.24 → 0.18, skill 0.35 → 0.45; Caesar bluffs 0.26 → 0.18,
  skill 0.6 → 0.65.
- **AI bets come in round numbers** (fives, then 25s and 50s as the blinds
  grow) instead of "raises to 49" and "bets 72".
- Baker Street was the easiest table in the game (36% for the TAG bot); with
  the above it is 16-22%.

### 5. Screen bugs
- Seat 1's speech bubble ran under the Menu and off the left edge on a phone:
  bubbles are nudged back into view, pointer still over the speaker.
- **The winning hand is named on the felt** ("Roosevelt: straight") at a
  showdown; it was only in the screen reader's log.
- Losing heads up no longer reads "Second place ... Every seat at this table
  has been the first to go at least once": it is "Death holds every chip.
  Heads up, N hands."
- Places no longer repeat on the curtain call when someone sits down
  mid-table (Rome's "Spartacus out 5th, Cerberus out 5th").
- "Closed in the ledger" shows their portraits, not letter discs.
- "1 entries written" → "1 entry".
- Plates and the player's banner start with a capital ("The Cat",
  "Tenderfoot").
- Tells written "his ears flatten" keep their subject in the screen reader's
  log ("Wolf Man: His ears flatten").
- The two `confirm()` popups (give up a seat, erase everything) are the game's
  own panel now (`ask` in dom.ts).

All checks pass (`npm run check`, check:visitor, check:phoenix, check:other,
check:look); the cast's styles were checked with `npm run sim 3000 all`.

---

## What to change next, by how often a player will feel it

### Every hand
1. **The talk gestures need redrawing with the moving head.** 41 puppets now
   simply don't gesture while they speak. Lincoln's way (`frames.talk`: the
   master head riding on the drawn frame) is the fix, per puppet; or a plain
   head-bob clip as a stopgap.
2. **Voice.** ~2,955 spoken lines, 25.3k words. At $0: Web Audio "barks"
   (Animal Crossing-style gibberish driven by the beats `Face.say()` already
   makes, pitch and timbre per character in anim.json), creature sounds for
   the wordless (Cerberus, the Phoenix, the Horseman's horse, the Grey, the
   Robot), then ~40 key Death lines recorded yourself. Give callouts stable
   ids first, or nothing can be matched to a recording.
3. **Telling, not showing.** 76 stage directions in the dialogue have no
   animation at all (`pc_p0_05` "[sets a pistol on the table]" while
   Blackbeard's `pistol_up`/`pistol_down` are built and unused); 134 built
   clips are never cued (`big_bet` on 41 puppets, `laugh` on 10, Death's
   `watch_that`, Pravuil's `quill`). A line-to-clip map in anim.json,
   checked by `check:data`, would let a line play its business. Cue
   `watch_that` (and light the seat) on Death's lessons, `big_bet` on everyone
   still in when someone shoves (public, so rule 2 holds).
4. **Repetition.** 97 of 101 `beat_` pools hold one line and fire at 0.85
   (Merlin's `beat_green_knight` 1.4 times a sitting); every `reraised` pool has
   2; Death has 3 callouts per action at the finale (the table replayed most).
   Say a `beat_` line once a sitting; give Death 6-8 per action; keep the
   shuffle bags in the save so a rematch hears new lines first.
5. **Death's jaw** is too small a movement to read at table size; open it
   wider (his lessons and the finale are the game's most important lines).
6. **Brows** exist on 19 puppets and are only ever moved on the bench.

### Every sitting
6a. **Death is better, not yet hard.** A solid player still beats him about
   40% of the time (par heads up is 50%). His remaining leaks are in the
   decision model itself: equity against a range, with no sense of position
   or of playing a hand on later streets. The cheapest next steps: give
   skill a postflop defence floor against a player who bets too often, and
   let the showdown read also widen a player seen bluffing on the river. Use
   the probe bots on 600+ finales to judge any change; 100 is ±5 points.
   On the bot-vs-bot ladder he is no longer clearly first (see CLAUDE.md):
   `heads_up_pressure` won against the cast's bots and lost against a solid
   player, and the player is who he has to beat.
7. **Sittings are long for a phone**: 42-50 hands at a table, 65 (p90 93) at
   the finale, which starts 250bb deep; 20-35 minutes at normal pace, with
   banter holding the next deal for up to ~15 s. Consider a shallower finale,
   faster levels once heads up, banter that plays over the next deal.
8. **The Phoenix is still about even** for a solid player (50%), and the
   Pyre is the reward for the game's hardest grind. Give it Death's
   treatment in its own dials (or skill 1).
9. **The difficulty curve after this pass** (TAG / TAG + tells, first
   places per 100; par 20, 17 where a sixth player arrives, 50 heads up):
   White House 23/27, Athens 21/23, Pirate Cove 29/25, Camelot 16/19, Rome
   18/13, Baker Street 16/22, Transylvania 20/20, Station 7/12, Champions I
   16/20, Champions II 16/13, finale 36/38, Pyre 53/48. It now rises, but
   unevenly (the Pirate Cove is the easiest table; Rome and Champions II are
   harder than Transylvania). Retune on 300+ sittings a table: 100 is ±4.
10. **Table intros are a text page** describing a room that is painted. Put
    the room's backdrop (and the cast's portraits, already there) behind it.
11. **Long lines on a phone**: 23 lines run past 140 characters (mostly
    Holmes, `bs_sh_jv_05d` at 207); cap callouts near 56, seated lines near 110.

### Now and then
12. **The Phoenix is undiscoverable.** Eight deliberate second places, then
    the Station again, then one heads-up sitting; nothing hints at it until
    the eighth, and a loss wipes all eight. A visible sign per second place
    (a feather on the map's marker) would let a player notice the pattern.
13. **Marks to look at**: "The Return Blow" fires whenever the Green Knight
    returns, even if the player never knocked him out; "The Great Leveller"
    (a split pot) came 22 times in 96 sittings; "Royalty" is about one in
    30,000 hands (fine if tough is the point, but say so); the open-table
    heads-up bonus mark (NEXT.md 8a) is still owed.
14. **Content edit pass**: Death uses contractions in 5 lines (`wh_death_06`,
    `ro_cer_02c`, `bs_intro_03`, `bs_death_03`, `bs_death_05`; check:data only
    tests his callouts); Hyde's `tv_hy_wm_01b` "I just come.", the Wolf Man's
    "Literally.", FDR's leg joke (the owner's call), `wh_p0_03` still genders
    the player; duplicate jokes between lines and callouts (Scipio's Cannae,
    Spartacus's "same share", the Cat's "see me there").
15. **The AI's portrait is the Robot's**: on the Station's curtain call they
    read as one face listed twice.
16. Small: the title screen after the animated launch screen is a plain text
    menu (keep the room behind it); opponents' chip counts are ~9px at
    844x390; several "Entered in the ledger" toasts stack at a table's end;
    `check:data` should also check that every tell has a cue (the converse
    of today's check).

### Engine follow-ups (measured, not yet fixed)
- **Stack-offs against the price**: of 8,111 all-in calls costing 40%+ of a
  stack, 2,626 had under 25% equity (the Green Knight 49% of his, Lancelot
  45%, Kidd 43%, the Cat 42%), partly by design (betRespect), partly a leak.
- **Bluffs don't adapt to a station**: `river_bluff` never reads fold rate
  (Loki, FDR, the Pope and Odysseus bluff a never-folder 26-30%).
- **Calling-station dials make big preflop re-raises** (Roosevelt shoving 8-5
  offsuit from 175bb): the re-raise bar is equity only; add a strength floor.
- `needle` min-bets junk hundreds of times a sitting (the AI, Socrates, the
  Cat); raising those wins.
- Three times in ~5,000 sittings the engine offered `[fold, call]` with
  nothing to call ("Call 0").
- Re-measure `readBet` and `readTell` (CLAUDE.md says to after big changes).

The probe, tell and heads-up scripts used here are simple to rebuild from
`src/replay-check.ts` (a scripted human seat) and are worth keeping as
`npm run probe <table> <bot>`: they found most of the above in minutes.
