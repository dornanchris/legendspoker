# PLAYTEST.md — a full playthrough, and what to improve

October 2026. The game was played end to end in a real browser (Chromium,
landscape phone 844x390, plus 667x375 and 1920x1080), through the real UI:
a bot read the cards off the screen, decided with the game's own equity code,
and clicked the buttons. It played with tells learned the way a player learns
them: from the poses, which the screen reader's log names. Alongside it, about
5,000 tournament sittings were run headless with six probe bots in the human
seat (tag, tag + tells, maniac, pusher, station, nit), and the puppets and all
~3,400 lines of dialogue were audited. Nothing in the game was changed.

The numbers and scripts are not in the repo (they were scratch work); every
finding below says where in the code it lives, so it can be checked.

<!-- RESULTS -->

---

## 1. The ten things that matter most

Ranked by how much a player would feel them.

1. **Tells fire before almost every decision, and are learned once (breaks
   rule 2).** `emitTell` (`src/decide.ts`, called from `src/game.ts`) shows a
   tell whenever the character HAS one for its current state, so anyone with
   weak / strong / bluffing tells shows one before 95-100% of decisions, folds
   included. In play: FDR "taps the ash from his holder" before nearly every
   action, Washington "rests one hand flat on the table" before nearly every
   action, Odysseus "looks toward the door" before ten decisions in a row.
   About 85% of decisions are "weak", so a decoy almost never lands on the
   weak text: "weak tell shown" meant "not strong" 90-100% of the time at every
   table (Lincoln, Washington 0% strong; Odysseus 1%). Characters with no weak
   tell (Roosevelt, Blackbeard, Spartacus, Cerberus, Javert, Jekyll, the Wolf
   Man, the AI) show one only 18-25% of the time, and when they show NONE the
   hand was never strong (0 in thousands). Learning the tell texts once is
   worth +20 points against the Phoenix (69% vs 49%), +7 at the Station, +8 at
   Rome. And because every tell is a pose held 2.5 s, the table is a constant
   parade of poses.
   *Fix (data plus that one function):* a `tellRate` dial so a tell fires on
   a share of decisions regardless of the hand; draw decoys so any one text
   sits near the base rate; give every character a tell for every state so
   silence says nothing. Then re-measure the legibility curve.

2. **Mouths don't move for much of what is said.** For 33 of 37 speaking
   puppets, the `talk` clip that `sayLine` (`web/screens/table.ts`) cues with
   every line swaps in whole-figure drawings with their own still heads from
   0.22 s to 1.8 s, and the mouth layers only draw on the moving head
   (`"with": "head.rest"`). Callouts are hidden the same way by the action clip
   they ride on. 36% of lines and 24% of callouts lose more than half their
   lip-sync; worst are the Grey (68%), the Cyclops (67%), Leonidas (64%). Seen
   in play: FDR's "Check, my friends." spoken entirely by the drawn head of his
   check pose; Teddy's "Sit down, tenderfoot" by a shouting fist pose, then by
   his closed rest mouth while the bubble is still up. Death's jaw shapes are
   too small to read at table size (frame diffs over a whole lesson line show
   only body sway). `win_small` forces a smile mouth over showdown lines.
   Lincoln, Washington and FDR are the exceptions, because their `talk` keeps
   the moving head.
   *Fix:* make every `talk` keep the moving head (Lincoln's offset way) or turn
   it into a plain head bob; start a callout's lip-sync when the action clip
   hands the head back; stop the mouth when the bubble comes down (lip-sync
   outlasts the bubble on 302 lines and 1,113 of 1,260 callouts); make Death's
   jaw open wider.

3. **The final boss isn't hard.** Death tops the bot-vs-bot heads-up ladder
   (64%), but a plain tight-aggressive player beats him 44% of the time, and a
   bot that shoves EVERY hand beats him 42%. The Phoenix loses 51% to the TAG
   bot and 60% to a maniac. Causes, from fixed-spot tests:
   - Heads up, the small blind folds far too much for half a blind: Death 35%,
     Washington 60%, Dracula 58%, Arthur 52%. The tight player's entry floor
     (`decide.ts`) ignores how many players are in the hand, and with only the
     blind to call, equity is the Chen-style strength score, which rates 40% of
     hands under 0.30 although 64% of those win over 40% heads up.
   - Against a deep shove they call far too rarely: correct is about 52% of
     hands against any-two; Death calls 22%, the Phoenix 30%, Lincoln 2%,
     Scipio 1%. A shove reads as the top 12% (`betRange` in decide.ts), and
     reading a player who shoves every hand barely widens it (the adjustment
     is capped in `Game.read`).
   - Death folds 46% to a half-pot flop bet, where 33% would already make the
     bet profitable.
   *Fix:* scale the entry floor by players in the hand; use real heads-up
   equity for the blind; let the player read widen a shover's range much
   further with skill; give Death a fold-to-c-bet ceiling.

4. **The difficulty curve is flat, with one dip and one spike.** First
   places for the TAG and tells bots combined, as a multiple of par: White
   House 1.2, Athens 1.3, Pirate Cove 1.4, Camelot 1.2, Rome 1.1, **Baker
   Street 1.45** (the easiest table in the game), Transylvania 1.1, **Station
   0.75**, Champions I 1.25, Champions II 0.9, finale 0.93, Pyre 1.18. Only the
   Station feels harder. Baker Street: the Cheshire Cat loses 94 bb/100 and
   calls 71% of deep shoves; Javert, Nemo and Holmes fold 93% / 89% / 79% to
   one; Javert folds his big blind 94% of the time to a 4 bb raise.
   *Fix:* re-tune Baker Street's folders (see 6) and the champions (see 5),
   then re-run the probes table by table.

5. **Two champions are the weakest player at their own table.** Profit against
   the TAG / tells bots (bb/100): **Blackbeard -136** at the Pirate Cove (Davy
   Jones +31) and -133 in the Hall of Doors (he raises 37% of decisions, makes
   the most deep weak all-ins, at skill 0.35); **Caesar -25** (Scipio +67).
   Arthur (+71) and the AI (+43) do play like champions.
   *Fix (data):* Blackbeard's aggression to ~0.65 or drop his steal quirk,
   skill up; every champion's skill clearly above the table's, not +0.05.

6. **Big leaks a player will find without trying.**
   - **`patient` makes stealing the big blind free** (`quirks.ts`): facing a 4
     bb raise in the big blind, Lincoln folds 98%, Scipio 99%, Van Helsing
     98%, Jekyll 97%, Javert 94%, the Robot 93%. Its threshold (0.56-0.58) is
     the top 3% of hands. Lower it to ~0.45, or scale it by the raise.
   - **They check the nuts on the river when last to act**: holding near-sure
     winners they bet only Jekyll 29%, Lincoln 33%, Dracula 34%, Green Knight
     36%, Merlin 41% of the time; 1,970 of 2,570 river checks at 85%+ equity
     checked through. The value branch bets with probability = aggression even
     on the river. On the river, always bet over the value bar; aggression
     sets the size.
   - **Stack-offs against the price**: of 8,111 calls of an all-in costing
     40%+ of the stack, 2,626 had under 25% real equity (Green Knight 49% of
     his, Lancelot 45%, Kidd 43%, Cheshire Cat 42%). The `committed` quirk calls
     at any price with 20% equity: 499 of its 1,229 calls lost money by the
     price (Leonidas called 69 bb on the river with 0%). Require pot odds, not
     a flat 0.2. Seen in play: the Green Knight called a 2,000-chip all-in on
     hand 1 at Camelot with J-4, busting.
   - **Bluffs don't adapt to a station**: river bluffs when checked to are
     9.3% into a never-fold bot vs 13.2% into a TAG; `river_bluff` never reads
     fold rate, so Loki, FDR, the Pope and Odysseus bluff a station 26-30%.
   - **Calling-station dials turn into big preflop re-raises**: 599 all-ins at
     40 bb+ with weak hands (Roosevelt shoving 8-5 offsuit from 175 bb). The
     re-raise bar is equity only; add a hand-strength floor.
   - `needle` min-bets junk constantly (the AI 692 times, Socrates 651, the
     Cat 548): raising those wins.

7. **Telling, not showing.** 198 stage directions in the dialogue; 76 of them
   have no animation at all (e.g. `pc_p0_05` "[sets a pistol on the table]",
   while Blackbeard's `pistol_up` / `pistol_down` clips are built and never
   used). 94 more ride on a generic action clip while the words describe the
   business ("[barks three times, in three keys]"). The mute characters are
   almost entirely text: Cerberus 51, the Horseman 47, the Phoenix 24. **134
   built clips are never cued**: `big_bet` on 41 puppets (MOTION-SPEC's
   "react to a big bet"), `laugh` on 10, Death's `watch_that` (his lessons are
   said with no gesture), Pravuil's `quill` and `wings`. Also told, not shown:
   - Death's lessons describe a tell in words after the hand ("Roosevelt
     grins, all teeth. I noticed."), with no gesture and no light on the seat.
   - The Phoenix's gauntlet is announced as text ("A single warm feather
     drifts down onto the felt") on the results panel; no feather is drawn.
   - Table intros describe the room in a paragraph on a black page, though
     all 12 backdrops are painted (the screen even says "until there is a
     painted still").
   - The winner's hand is never named on the felt: "FDR wins the pot with
     three of a kind" is only in the screen reader's log; the screen lights
     five cards. A beginner can't learn hand ranks from the game.
   *Fix:* a line-to-clip map in anim.json, checked by `check:data`; cue
   `watch_that` on lessons (and light the seat), `quill` on "Entered in the
   ledger" at the finale, `big_bet` on everyone still in when someone shoves
   (public, so rule 2 holds); a hand-name label at showdown; the room's
   backdrop behind the intro text.

8. **Voice.** About 2,955 spoken lines, 25.3k words (Death 3,484; the eight
   champions ~7.2k). BUILD-PLAN 6.3 assumes AI voice at $20-50 a month, which
   breaks the $0 rule. A $0 plan, in order:
   1. **Web Audio "barks"**: Animal-Crossing-style gibberish driven by the
      beats `Face.say()` already makes, pitch and timbre per character in
      anim.json, synthesised like `web/sound.ts`. It also fixes "the mouth
      moves in silence". Plus creature sounds for the wordless: Cerberus's
      barks, the Phoenix's trill, the Horseman's spurs and horse, the Grey's
      hum, the Robot's beeps.
   2. **Record ~40 key Death lines yourself** (intro, lessons, the finale).
   3. Optional: offline open-licence TTS for the champions only.
   First, give callouts stable ids (they are bare strings now), or nothing can
   be matched to a recording.

9. **Repetition.** Callouts run 0.47-0.68 per hand (CLAUDE.md says ~1).
   97 of 101 `beat_` pools hold ONE line and fire at 0.85: Merlin's
   `beat_green_knight` came up 1.4 times a sitting. Every `reraised` pool has 2
   lines. Death has only 3 callouts per action at the finale (5.5 repeats a
   sitting). On a third sitting at one table, 36-55% of callouts and 43-68% of
   lines are repeats (the finale 79% / 89%); the dealer's plant and the
   finale's 7 `champion_headsup` lines play in full every attempt. Since the
   finale is the table most often replayed, it repeats the most.
   *Fix:* a `beat_` line at most once a sitting; 6-8 lines per action for
   Death; keep the shuffle bags in the save so a rematch hears unheard lines
   first.

10. **Sittings are long for a phone.** Median 42-50 hands (p90 65-76) at a
    story table, 65 (p90 93) at the finale, which starts 250 big blinds deep.
    At normal pace a hand with talk takes 20-45 s: one White House hand ended
    with four lines of Teddy/FDR banter, ~15 s, before the next deal. That's
    20-35 minutes a table. Consider a shallower finale, faster levels after
    heads-up begins, and banter that plays over the next deal instead of
    holding it.

---

## 2. Characters and AI, one by one

The ones to look at first (from the probes and from play):

| who | problem |
|---|---|
| Blackbeard (champion) | weakest player at his own table and in the Hall of Doors; reckless deep all-ins |
| Caesar (champion) | loses to his own table (Scipio +67) |
| Death (finale) | small blind folds 35% heads up; calls 22% of shoves; folds 46% to a half-pot c-bet |
| The Phoenix | 51% vs a plain TAG, 60% vs a maniac; tells only 0.58 reliable yet still worth +20 points |
| Green Knight | calls off stacks with nothing (49% of his all-in calls are against the price); J-4 for 2,000 chips, hand 1 |
| Lancelot, Kidd, the Cat | the same, 42-45% |
| The Cheshire Cat | -94 bb/100; calls 71% of deep shoves; the reason Baker Street is the easiest table |
| Javert, Nemo, Holmes | fold 93% / 89% / 79% to a deep shove; Javert folds his big blind 94% to a 4 bb raise |
| Lincoln, Scipio, Van Helsing, Jekyll, the Robot | `patient`: fold the big blind 93-99% to a 4 bb raise |
| Jekyll, Lincoln, Dracula, Green Knight, Merlin | check the nuts on the river 59-71% of the time |
| Leonidas | `committed` calls 69 bb on the river with 0% equity |
| Roosevelt | 8-5 offsuit shoved from 175 bb |
| The AI, Socrates, the Cat | `needle` min-bets with junk hundreds of times a sitting |
| Odysseus, Washington, Lincoln, FDR, the Astronaut | tells fully readable (weak text = never strong) |
| Death | 3 callouts per action: repeats 5.5 times a finale |

AI bet sizes are odd numbers ("raises to 49", "53", "199", "647", "bets 72"),
where the player's slider snaps to fives. Round AI sizes to fives (or to
blinds) so a bet reads as a person's.

---

## 3. Screen and flow bugs seen in play

- **Seat 1's speech bubble runs under the Menu button and off the left edge**
  on a phone (White House, Lincoln: "ha[Menu]here we were the enemy.").
- **Places repeat on the curtain call** when someone joins mid-table: Rome's
  showed Spartacus "Out 5th" and Cerberus "Out 5th"; at Athens "Medusa out
  4th ... You are out 4th"; at Camelot, after the Green Knight's return,
  "Lancelot out 4th ... You are out 4th". (CLAUDE.md lists it as "left as
  is"; players see it on the panel that sums up their night.)
- **The finale's loss reads "Second place"** with the generic line "Every seat
  at this table has been the first to go at least once": both are nonsense
  heads up.
- **"You outlasted The Cyclops"** (Athens, 4th) while the faces beside it show
  Medusa outlasted as well.
- The curtain call's **"Closed in the ledger" uses letter discs** (L, R, F, W)
  right beside "They fell to you", which uses their portraits; and at 390 px
  tall the last section ("Entered in the ledger") is cut off.
- **The AI's portrait is the Robot's**: on the Station's curtain call they
  read as one face listed twice.
- **Name casing**: the player's banner says "tenderfoot" lower case beside
  capitalised names; the Cheshire Cat's plate says "the Cat" beside "The
  Cyclops" and "The Pope".
- **Tells starting with a pronoun lose their subject** in the screen reader's
  log ("His ears flatten", "His eyes are a different colour for a moment"):
  16 tell texts start with his/her/its, so a blind player can't tell who.
- **Marks: "1 entries written of 46"** (singular).
- The ledger viewer's "1 of 5" sits over the dimmed Back button.
- **Starting a table while seated at another uses the browser's `confirm()`**
  (`startTable`, `web/screens/shared.ts`): a native alert, the only one in the
  game; in the iOS app it will carry the app's name. Use the game's own
  dialog (the Menu's styled panel).
- **Death's map greeting** ("Eight tables. I deal at every one of them...")
  pops on every visit, even with the tour complete. Vary it by progress or
  show it once.
- Several "Entered in the ledger" toasts stack at once over the top of the
  table (and over Death's narration) at a table's end.
- The title screen, after the animated launch screen (Death shuffling with two
  guests), is a plain text menu: a step down. Keep the room behind it.
- Opponents' chip counts and last actions are ~9 px at 844x390.
- Three times in ~5,000 sittings the engine offered `[fold, call]` with
  nothing to call: the buttons would read "Call 0".

---

## 4. Progression, marks and hidden content

- **The Phoenix is undiscoverable.** Eight deliberate second places across the
  tour, then win the Station again, then win one heads-up sitting; lose and
  all eight are forgotten. Nothing hints at it until the eighth second place.
  Give each second place a visible sign (a feather on the map's marker, one
  per table) so a player can notice the pattern; consider not wiping all
  eight on a loss (lose one, or keep them and reopen after N more).
- **"The Return Blow"** fires whenever the Green Knight returns, even if the
  player never knocked him out (6 times vs 2 for "A Year and a Day" in 96
  sittings), and it unlocks Bertilak.
- **"The Great Leveller"** (a split pot) came 22 times in 96 sittings: a mark
  nobody earns on purpose.
- **"Royalty"** (win a showdown with a royal flush) is about one in 30,000
  hands, i.e. unreachable for nearly everyone; a 100% run can't be planned.
  The same, less so, for "Four Horsemen" and "A Chip and a Chair".
- **"Brief Acquaintance"** (25 hands) and "The Return Blow" (the 20-hand
  return) are tied to the blind pace; re-check them if the pace changes.
- **The open-table heads-up bonus mark is still owed** (NEXT.md 8a): the end
  of table facts only hold the last hand's opponent; add the starting
  opponent count to `TableFacts` and a `maxOpponents` condition.
- Nothing reports which marks have ever been earned; a `npm run marks` report
  over the probe sittings would show any that can't be.

---

## 5. Content and tone

- **Death uses contractions** in 5 lines (`wh_death_06`, `ro_cer_02c`,
  `bs_intro_03`, `bs_death_03`, `bs_death_05`); `check:data` tests only his
  callouts.
- For the edit pass: Hyde's `tv_hy_wm_01b` "I just come." (an accidental double
  meaning); the Wolf Man's "Literally." (a modern wink); FDR's leg joke
  `fdr.lose.0` (the owner's call); `wh_p0_03` still genders the player.
- Duplicates: `cyclops.raise` holds "Raise!" and "RAISE."; Scipio's Cannae
  line, Spartacus's "Every man the same share" and the Cat's "You'll see me
  there" are each both a dialogue line and a callout.
- **Too long for a phone bubble**: ~27 characters fit per row; 79 lines need
  over 20 characters a second to read; 23 run past 140 characters, mostly
  Holmes (`bs_sh_jv_05d`, 207). Cap callouts near 56 characters, seated lines
  near 110.
- `check:data` checks that every tell and idle has a cue, but not the
  converse; add it so a new tell can never be invisible on the staged table.
- No callout leaks hand strength, and no real anachronism was found.

---

## 6. Faces, beyond the mouths

- **Brows**: 19 puppets have brows, but the face code sets them only on the
  bench; 16 never show them in play. Raise them on a raise, knit them on a
  loss.
- Never driven at all: the Phoenix's beak, the Horseman's carving light and
  Cerberus's growl mouth (all their lines are stage directions, and `speak()`
  skips those). Give stage directions a mouth or light cue of their own.
- Pravuil never speaks (the dealer's bubble is unused at the finale).
- No blink: Death, the Horseman, the AI, the Stranger (intentional for most).
