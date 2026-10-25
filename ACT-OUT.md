# ACT-OUT: the shot list

Every place where the game's text TELLS what a character does and the table could SHOW it: stage directions in callouts (`[barks three times, in three keys]`), stage directions and narration in the dialogue files, Death's lessons, the arrivals, the exits and the rooms. One row per distinct action, near-duplicates merged (the several "[pushes chips forward with a paw]" lines are one clip).

**This is a menu, not a mandate.** Some of these are worth drawing; many are fine as words. Nothing here changes the game: every clip is presentation only, never the game RNG, and a held gesture follows the same rules as the tells (rule 2: a public line must not borrow a character's tell drawing, or it muddies the tell; rows that would are flagged).

**139 actions: 52 NEW, 44 PARTIAL, 43 EXISTS. Priority 33 A, 79 B, 27 C.** Sources: 94 bracketed callouts (`data/characters/*.json`), 115 stage directions and narration lines (97 and 18) in `data/dialogue/*.json`, Death's 18 lessons, the Phoenix gauntlet's lines in `web/screens/results.ts`, and the room texts in `data/tables/*.json`. `data/story.json`'s ending is prose on its own screen and is left out.

## How to read it

- **Clip**: a proposed name, snake_case, as it would sit in `web/art/<id>/anim.json`. Where a clip already exists, its real name.
- **Motion**: what the drawing or short sequence is, as an image prompt or animator needs it (pose, props). *Phone:* notes an action too small to read at a fifth of the screen width, with a bigger alternative.
- **Readability**: a figure is about a fifth of the screen wide and a face about 40 points on a small phone, so a wink, a fingernail, a tongue or "an inch" of anything is lost. Rows note it and suggest a bigger shape: the head, both hands, a prop held clear of the body, the whole torso.
- **Used by**: callout keys (`fold.2` is `callouts.fold[2]` in the character file) or dialogue line ids (`ro_cer_02b`), the number of lines, and one example.
- **Status**: **EXISTS** a built clip already does it (named; often built but never cued, or a dialogue line that plays no clip), **PARTIAL** a generic or nearby clip plays but not the described business, **NEW** nothing does it yet.
- **Priority**: **A** seen often (a callout on a common action, a story beat in most sittings of a tour table, Death's lessons at the first three tables); **B** now and then (showdown win/lose and all-in/re-raise callouts, eliminations, banter, respect-tier lines, the finale's and the Pyre's beats, the guests); **C** rare one-offs (needles, `beat_<id>`, `win_<hand>`, single exchanges).

Frequency is estimated from how the director rations lines: about one callout a hand at a full table (one per five heads up) spread over pools of 3-4 lines per action; one plant per sitting; a character's exit line once a sitting (one of two); a banter pair's exchanges and needles only when its condition fires.

**One wiring change unlocks most EXISTS rows.** Today a dialogue stage direction plays NO clip: `showLine` in `web/screens/table.ts` shows its words in the seat's bubble and skips the talk gesture, and a callout's words ride on whatever action clip plays. A `stage` map in anim.json (a line id or its words to a clip, checked by check:data the way `cues` are) would let the EXISTS rows play with no new art.

## Everyone (generic clips)

Generic moves many characters need: the shared version of rows that also appear under each character (so they are not counted again in the totals). Each could be generated per puppet from its own head and torso, as `art-tools/build/win_small.py` makes `win_small`, or done in code; making one of these once covers every row that points here.

### any puppet

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `look_toward` | Head and gaze turned to a named seat (or the dealer) and held 1-2 s, mirrored by side. Code (face gaze + head bone) for most; a turned head drawing for end seats. | wh_nd_06a, c1_gw_bb_03d, at_plant_04, ro_cer_07b, cerberus lose.3, horseman reraised.1, tv_hh_03b, st_ma_as_03d, st_ma_gr_01c (9): "[looks at FDR for a long moment, and says nothing at all]" | **NEW**: look_at_you covers the player only | B |
| `seated_bow` | A slow dip from the waist, head down, eyes closed, held 1 s. Generate from head + torso like win_small.py. *Phone: "inclines his head, very slightly" is invisible at 1/5 width: make it a real bow.* | washington lose.0, wh_gw_04b, wh_nd_07a, c1_nd_09c, washington reraised.1, ro_p3_04, tv_nd_24a, bs_out_nemo_02 (8): "[accepts it with a slight bow]" | **PARTIAL**: won_pot / win_small nods are too small | A |
| `rise_and_go` | Knocked out for the 16 seated characters with no knocked_out clip (Washington, FDR, Roosevelt, JFK, the Horseman, the Wolf Man, Dracula, Jekyll, Hyde, Van Helsing, the Robot, the AI, the Grey, the Martian, the Astronaut, Loki): torso rises ~30 px, turns away, fades. Generic, from the rest pose. | wh_gw_out_02, tv_elim_hh_01, st_elim_gr_02, tv_elim_wm_01, fn_end_05 (5): "[rises, bows to the table, and goes]" | **NEW**: today: a plain 0.8 s fade from the chair | B |
| `edge_away` | Torso slides/leans 10-15 px away from one neighbour and stays there for the rest of the hand. | pc_ls_bb_02d, tv_hy_wm_03d (2): "[moves his chair a little further from Blackbeard's]" | **NEW** | B |
| `hold_still` | Code: a direction that says they do NOTHING suspends that figure's idles, sway and the action clip for ~2 s. | leonidas reraised.2, horseman check.1, horseman lose.3, tv_hh_06b, tv_arrive_03 (whole table) (5): "[does not move an inch]" | **PARTIAL**: the call/raise clip currently plays over it | B |

## Death, Pravuil, the rooms and narration

### Death (dealer)

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `watch_that + the tell` | Lessons: Death's open hand toward the seat, then that seat replays the tell clip its words name (the cards are public by then). | dl_lesson_s1..s6, b1..b5, w1..w4, t1..t3 (dealer.json) (18): "Did you see it? {tell}, a moment before acting. There was the reason." | **EXISTS**: watch_that (built for this, never cued); the tell clips are cued already | A |
| `shuffle` | Riffle and square at the start of every hand, before the deal clip. | table prompt "Death shuffles.", dl_rematch_04 (2): "I shuffled while you were away. I do a great deal of shuffling." | **EXISTS**: shuffle, never cued (only the sound plays) | A |
| `way_out` | Shows the banished player the door. | uv_banish_01..04 (4): "We do not say that here. ... Out." | **EXISTS**: way_out (cued) | B |
| `turn_yours` | Reaches toward your seat and turns your two cards face up. | uv_reveal_01 (1): "[Before you can muck them, Death reaches over and turns your cards face up. A six. A seven.]" | **PARTIAL**: turn (board card) + push_you (reach) | B |

### Death (player, finale)

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `clock (rain)` | Looks up and aside, at the rain, not at you. | fn_p0_01 (1): "[looks at the rain instead of at the player]" | **EXISTS**: death_player clock | B |
| `last_card` | Looks down at the river card, long and still. | fn_end_01 (1): "[He looks at the last card for a long moment...]" | **PARTIAL**: heads_up (steeple, watching) | B |
| `deck_to_you` | Holds out a bone hand to the dealer; takes the deck; squares it once; slides it across to your chair. The deck must read as a big pale block. | fn_end_01 (1): "...he holds out his hand, and Pravuil gives him the deck. He squares it once ... and slides it across to you." | **NEW**: the ending: worth it beyond its frequency | B |
| `rise_into_rain` | Gets up slowly, turns his back, walks out (not the chair fade). | fn_end_05 (1): "[He gets up, slowly, and goes out into the rain without looking back...]" | **NEW** | B |

### Pravuil

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `shuffle` | Already shuffling for the next game when you bust. | fn_bust_04 (1): "[Pravuil is already shuffling for the next game. Death has not left his chair.]" | **EXISTS**: pravuil shuffle, never cued | B |
| `give_deck` | Pushes the deck to Death's side of the table. | fn_end_01 (1): "...Pravuil gives him the deck." | **PARTIAL**: push_left/push_right with the deck instead of chips | B |
| `write_close` | Quill from behind the ear, one line in the book, book shut, rises and follows. | fn_end_05 (1): "Pravuil writes one line in his book, closes it, and follows him." | **PARTIAL**: quill (takes the quill; plays today as his look_up idle) | B |

### Rooms

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `station_lights_fail` | Blackout ~0.3 s, a flicker, then the amber backdrop fades up. | st_arrive_01 (1): "The lights fail. Amber emergency lamps come up..." | **PARTIAL**: backdropAfter swap exists; it cuts, no blackout | A |
| `chips_float` | FX: every stack and the pot lift 20-40 px, drift, and drop back with a clatter; a single chip now and then as a room loop. | st_arrive_01, station room text (2): "...the gravity lets go, and every chip lifts off the felt. When it all falls back..." | **NEW** | A |
| `station_lights_restore` | The room goes back to its before backdrop when the AI is knocked out. | st_elim_ai_02 (1): "...and the room is only a room again" | **NEW**: code: the amber stays today | B |
| `fire_sinks` | Transylvania: the hearth loop dims to embers as the presence piece goes. | tv_arrive_01 (1): "The fire sinks to embers. The chair beside it is empty." | **PARTIAL**: presence swap exists; the fire keeps burning | A |
| `table_freezes` | Every figure stops breathing, blinking and swaying for ~3 s (hold_still, whole table). | tv_arrive_03 (1): "Nobody at the table moves. Outside, the wolves have gone quiet." | **NEW**: code only | A |
| `rome_secretary` | A scribe piece by the door holding up a wax tablet (text too small to read: keep the narration). | ro_plant_02, ro_arrive_01 (2): "The secretary consults his tablet and holds it up." | **PARTIAL**: Caesar's dictate clip; no secretary | A |
| `athens_door` | The street door piece swings open (and a doorway Odysseus for the missed version). | at_arr_01, at_miss_01 (2): "A weathered man stands in it, dripping, and looks at an empty table." | **NEW**: his arrive clip covers the sitting down | C |
| `pyre_ash` | Grey flakes drift across the felt and never settle (a loop). | py_intro_01 (1): "Ash drifts across the felt and never settles." | **PARTIAL**: the ember loop at one spot | B |
| `pyre_altar_bird` | Presence piece: the Phoenix on the altar, before it comes down, and again (eyes closed) after you bust. | py_intro_01, py_bust_02 (2): "On the altar at the back ... a red-and-gold bird watches you sit down." | **NEW** | B |
| `pyre_chick` | Presence piece on the empty chair after the win: a small bird in the ash, blinking. | py_end_01 (1): "By the time the sun clears the columns there is a small red-and-gold bird in it, blinking" | **NEW** | C |
| `finale_weather` | Loops: rain down the windows, the one lamp flickering, a lantern drifting slowly across the water. | fn_intro_01 (1): "Rain on the windows. One lamp. Far out on the black water, a ferryman's lantern..." | **NEW**: the finale room has no loops | B |
| `finale_rest` | Death in the chair, forearms on the wood; Pravuil winged, quill behind the ear, a deck under his hand. | fn_intro_02 (1): "[The dealer is already here — not in the dealer's place, but in the chair across from yours...]" | **EXISTS**: both rest poses | B |

### Screens

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `phoenix_feather` | Curtain call FX: one warm feather drifts down onto the felt; later the same feather burning. | results.ts PHOENIX.stirring, .open (2): "A single warm feather drifts down onto the felt." | **NEW** | C |
| `map_smoulder` | The Pyre's map marker smoulders when it opens. | results.ts unlocked (hidden) (1): "Something is burning on the map." | **NEW** | C |

## The White House (and Washington at the Champions' Tables)

### Washington

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `plain actions` | Fold, bet, all in as drawn. | fold.0, bet.1, raise.2, all_in.2 (4): "[pushes every chip forward in one even motion]" | **EXISTS**: fold, bet, all_in | A |
| `tap` | One fingertip taps the felt. | check.0 (1): "[a single tap on the table]" | **EXISTS**: tap / tap_ik (play it for this check instead of the two knocks) | A |
| `square_then_fold` | Squares his cards together, then flicks them in. | fold.1 (1): "[returns his cards to the dealer, edges squared]" | **PARTIAL**: square_ik then fold_ik | A |
| `account_book` | Takes a small book from his coat, writes two strokes, puts it away, then calls. *Phone: a pocket book is a speck: draw it big and pale, the pen as a dark stroke.* | call.1 (1): "[writes the sum in a small account book, then calls]" | **NEW** | A |
| `seated_bow` | See Everyone: a slow bow from the waist. *Phone: the faintest nod will not read; bow.* | lose.0, reraised.1, wh_gw_04b, wh_nd_07a, c1_nd_09c (5): "[inclines his head to Lincoln: one commander to another]" | **PARTIAL**: won_pot (a small nod, never cued) | A |
| `collect_column` | Draws the pot in with both hands into one column. | win.3 (1): "[gathers the pot into one neat column, and says nothing]" | **EXISTS**: collect (never cued) | B |
| `look_toward` | A long look at one seat (see Everyone). | wh_nd_06a, c1_gw_bb_03d (2): "[looks at FDR for a long moment, and says nothing at all]" | **NEW** | B |
| `ignore / look_at_you` | Does not look at you (rest, or the window glance); then, at tier 1, looks at you for the first time. | wh_p0_05, c1_p0_02, wh_p1_04 (3): "[looks at the player for the first time]" | **EXISTS**: rest / window; look_at_you | B |
| `count_stack` | Squares and counts his stack. | wh_nd_lw_01b (1): "[counts what is left, exactly]" | **EXISTS**: square | C |
| `count_portraits` | Head steps up along the wall in 3-4 jumps, a fingertip ticking, then one nod. | wh_jfk_in_05 (1): "[counts along the portraits on the wall, to thirty-five, and nods once]" | **PARTIAL**: window (glance) + won_pot (nod) | B |
| `rise_and_go` | Rises, bows, goes (he has no knocked_out). | wh_gw_out_02 (1): "[rises, bows to the table, and goes]" | **NEW**: see Everyone | B |

### FDR

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `laugh + cape` | Laughs, then settles his cape: his exit (he has no knocked_out). | wh_fdr_out_02 (1): "[laughs as though it had been his idea all along, and settles his cape]" | **EXISTS**: laugh, cape | B |

### JFK

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `arrive` | Walks in, one hand still in his jacket pocket, sits. | wh_jfk_in_01 (1): "A young man in a narrow navy suit comes in with his hands in his jacket pockets, finds the empty chair..." | **EXISTS**: arrive (cued) | B |
| `leave` | Straightens his tie, glances up at the portraits, then the fade. | wh_jfk_out_02 (1): "[straightens his tie, nods to the portraits, and goes out the way he came in]" | **EXISTS**: tie, portraits (tie is his bluffing tell: a public play of it is extra noise, which rule 2 allows) | B |

## Athens

### Socrates

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `glance_dealer` | A look toward Death, back to his cup, a sip. | at_plant_04 (1): "[glances at the dealer, then back to his cup, and lets it go]" | **PARTIAL**: sip; the glance is look_toward | A |

### Leonidas

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `turn_shoulder` | Torso turns its shoulder to the player, chin up, held. | at_p0_05 (1): "[turns his shoulder to the player]" | **NEW**: arms_folded is near | B |
| `chip_wall` | Both hands set stacks side by side into a wall (or the game redraws his tower as a row). | win.2 (1): "[builds his chips into a wall]" | **NEW** | B |
| `worthy_nod` | One curt nod. | lose.2 (1): "[nods once, as to a worthy enemy]" | **EXISTS**: won_pot (never cued) | B |
| `hold_still` | He does not move: skip the call/raise clip and his idles for ~2 s (code). | reraised.2 (1): "[does not move an inch]" | **PARTIAL**: the action clip plays over it today; check.2 "[says nothing, and checks]" is fine as is | B |
| `knocked_out` | Takes up his helmet and goes. | at_le_out_02 (1): "[takes up his helmet and goes without a word]" | **EXISTS**: knocked_out | B |

### Cyclops

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `half_rise` | Rises half out of the chair on his fists, head into the ceiling; the felt and cups jolt. | at_cy_od_01c, at_cy_od_05d (2): "[half rises; every cup on the table jumps]" | **PARTIAL**: shift (the table groans) | B |
| `lean_creak` | Leans in over the table on both fists. | reraised.1 (1): "[leans in until the whole table creaks]" | **EXISTS**: heads_up (or big_bet) | B |

### Odysseus

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `arrive` | Sits down soaking wet, apologising. | at_arr_01 (1): "The street door opens on a gust of salt air. A weathered man stands in it, dripping..." | **EXISTS**: arrive (cued); the door is a Rooms row | A |

## The Pirate Cove

### Silver

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `edge_away` | Leans/slides away from Blackbeard (see Everyone). | pc_ls_bb_02d (1): "[moves his chair a little further from Blackbeard's]" | **NEW** | B |
| `tuck_parrot` | A hand over Flint; Flint gone into the coat (a bulge); back out later. | pc_nd_04c (1): "[tucks the parrot inside his coat]" | **NEW** | C |

### Kidd

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `neck` | Rubs his neck. | pc_ls_kd_02d (1): "[rubs his neck]" | **EXISTS**: neck | B |

### Blackbeard

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `pistol_down` | Sets a pistol on the felt; picks it up a few hands later. | pc_p0_05 (1): "[sets a pistol on the table, pointed at nobody in particular]" | **EXISTS**: pistol_down, pistol_up (both never cued) | B |

### Davy Jones

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `chips_under` | FX: the pot sinks into the felt like water instead of sliding; his collect under it. | win.2 (1): "[draws the chips under, without a sound]" | **PARTIAL**: collect (never cued) | B |

## Camelot

### Lancelot

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `chair` | Looks toward the empty chair beside the king. | cm_ar_la_02c (1): "[looks toward the empty chair beside the king]" | **EXISTS**: chair | B |

## Rome

### Cerberus

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `plain actions` | Noses cards away; paw taps; nose pushes a stack; both paws shove. | fold.0, fold.1, check.0, call.1, bet.2 (5): "[noses his cards away, and loses interest]" | **EXISTS**: fold, check, bet, all_in | A |
| `whine` | Ears flat, a head turned away, a whine. | fold.2, ro_out_cerberus_02 (2): "[whines, briefly, from one of his throats]" | **EXISTS**: lost_pot | A |
| `lick_paw` | One head dips to a raised paw; a big pink tongue, twice. *Phone: a tongue is small: lift the paw high to the head.* | check.2 (1): "[licks one paw, and waits]" | **NEW** | A |
| `tail` | The serpent tail rises over the chair arm into view: a thump, a slow wag with a hiss, or a sweep across the felt. *Phone: the tail is below the rail today: it must come up high to be seen.* | check.1, win.3, ro_nd_07a, all_in.0 (4): "[thumps his serpent tail once against the chair]" | **NEW** | A |
| `paw_and_nose` | A paw slides chips, then a head noses a few more / the right head peers at the count. | call.0, call.2 (2): "[shoves chips forward with a paw, and a few more with his nose]" | **PARTIAL**: call (paw only) | A |
| `mouth_drop` | A head carries a stack in its jaws to the middle and drops it. | bet.0 (1): "[drops a stack of chips into the pot from one mouth]" | **PARTIAL**: bet (nose push) | A |
| `bark` | The middle head snaps up, jaws wide, one beat; the others nod along. | bet.1, reraised.0 (2): "[the middle head barks at the raiser; the other two agree]" | **NEW** | A |
| `bark_round` | Left, middle, right head bark in turn, 0.3 s apart. | raise.0, raise.2 (2): "[barks three times, in three keys, and pushes more in]" | **NEW** | A |
| `stand_over_pot` | Rears up, forepaws on the rail, three heads low over the middle. | raise.1, ro_nd_08a (2): "[shoves a heap of chips forward and stands over it]" | **PARTIAL**: heads_up (heads low over the table) | A |
| `bay` | All three heads thrown back, jaws open to the ceiling. | all_in.1, win.2 (2): "[throws back all three heads and howls]" | **PARTIAL**: win_big is the generic "hands raised high" | B |
| `chest_shove` | Leans his whole chest over the rail into the pile. | all_in.2 (1): "[pushes the whole pile in with his chest]" | **PARTIAL**: all_in | B |
| `bare_teeth` | All three muzzles wrinkle back, teeth bared, as the chips go in. | reraised.1 (1): "[bares all three sets of teeth, and shoves the chips forward]" | **PARTIAL**: big_bet (hackles up); NOT growl, his tell drawing | B |
| `lie_down` | All three chins flat on the rail, eyes up (variants: one head down, the others refusing; over the pot). | win.0, beat_spartacus.0, ro_nd_10b, ro_nd_12b, ro_out_cerberus_01, ro_p2_03 (6): "[lies down with all three heads at once, with enormous dignity]" | **PARTIAL**: asleep (one head) | B |
| `heads_squabble` | The side heads turn in on the middle: snapping fast (squabble, glare), slow (confer), or a sigh passed along. | win.1, lose.0, lose.1, ro_cer_03b, ro_cer_05b (5): "[the three heads squabble over which of them won it]" | **NEW**: keep it unlike growl, his tell | B |
| `sniff_at` | Two heads stretch toward one side and sniff; the third turns away (or growls). | beat_pope.0, ro_p0_03, ro_cer_02b, ro_cer_08b (4): "[sniffs at the player with two heads; the third cannot be bothered]" | **PARTIAL**: sniff (one head) | B |
| `sneeze` | One head jerks back in a sneeze, a puff. | lose.2 (1): "[sniffs the winning cards with one head, and sneezes]" | **NEW** | B |
| `six_eyes` | All three heads turn to the winner and hold. | lose.3 (1): "[gives the winner a long look from all six eyes]" | **PARTIAL**: stare (at you); aim with look_toward | B |
| `watch_player` | The middle head turns to you and stays. | ro_p1_03 (1): "[turns his middle head to watch the player, and keeps watching]" | **EXISTS**: look_at_you | B |
| `three_bow` | All three heads dip together, deep enough to read. *Phone: "very slightly" will not read; dip them a full head.* | ro_p3_04 (1): "[bows all three heads, very slightly, at the same moment]" | **NEW**: see seated_bow | B |
| `lick_chops` | Three tongues round three muzzles / three heads panting. | ro_cer_06b, ro_nd_09a (2): "[licks his chops with all three tongues]" | **PARTIAL**: pant | C |
| `chain_look` | All heads dip to the chain across his chest. | ro_cer_04b (1): "[looks down at the chain that joins his three collars]" | **NEW** | C |
| `sit_ranks` | Sits up very straight, three heads level. | ro_nd_19a (1): "[sits up very straight at Scipio, three heads in perfect ranks]" | **PARTIAL**: attention is his TELL: draw a separate one or skip | C |
| `look_then_floor` | Three heads to Scipio, then all down at the floor. | ro_cer_07b (1): "[looks at Scipio with all three heads, then down at the floor, where the river would be]" | **NEW**: look_toward + a heads-down drawing | C |
| `scratched` | Middle head tilts, eyes shut, pleased (as if scratched); a two-figure reach is out of scope. | ro_nd_20b (1): "[the middle head lets Scipio scratch it; the other two pretend not to notice]" | **NEW** | C |
| `nose_cards` | Each head noses one board card in turn. | win_three_of_a_kind.0 (1): "[each head noses one card of the three, very proudly]" | **NEW** | C |

### Pope

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `smile` | The benevolent smile. | ro_sp_pope_03d, ro_nd_03c (2): "[smiles]" | **EXISTS**: benevolent | B |
| `offer_almond` | Reaches toward his neighbour holding out a small silver dish. *Phone: an almond is invisible: a dish of them.* | ro_cer_02a (1): "[offers the nearest head a sugared almond]" | **NEW** | C |
| `knocked_out` | Rises, gathers his robes, a gracious nod. | ro_out_pope_02 (1): "[rises, gathers his robes, and congratulates the winner...]" | **EXISTS**: knocked_out | B |

### Scipio

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `elephant_offer` | Slides the ivory elephant across toward the dog. | ro_cer_08a (1): "[sets his ivory elephant down in front of the dog]" | **PARTIAL**: elephant_aside is his TELL: draw a separate push | C |
| `knocked_out` | Rises, the elephant under his arm, a last look back. | ro_out_scipio_02 (1): "[stands, tucks the ivory elephant under his arm, nods to the winner...]" | **EXISTS**: knocked_out | B |

### Spartacus

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `knocked_out` | Stands, looks at the doors, goes. | ro_out_spartacus_02 (1): "[rolls his neck, looks once at the doors, and walks out through them]" | **EXISTS**: knocked_out (neck before it) | B |

### Caesar

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `arrive` | Sits, setting the wreath on his head; the cushion piece empties. | ro_arrive_01 (1): "...takes the laurel wreath from its cushion, puts it on, and sits." | **EXISTS**: arrive (cued) + the wreath presence | A |

## Baker Street

### Javert

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `notebook_close` | Opens the notebook, looks, snaps it shut unwritten. | bs_plant_03 (1): "[closes his notebook without writing anything]" | **PARTIAL**: notebook (consults it) | A |
| `notebook_write` | Pencil writes a line, two hard underlines. *Phone: make the underlines big elbow strokes.* | bs_nm_jv_01c, bs_ch_jv_02d (2): "[writes something in his notebook, and underlines it twice]" | **PARTIAL**: notebook | B |
| `brim` | Touches the brim of the bicorne. | bs_sh_jv_05e (1): "[touches the brim of his bicorne, and does not take it off]" | **EXISTS**: bicorne | B |
| `knocked_out` | Rises, sets himself square, goes. | bs_out_javert_02 (1): "[stands, sets his hat square, and goes out without looking back]" | **EXISTS**: knocked_out (+ bicorne) | B |

### Nemo

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `knocked_out` | Rises, pockets the pearl, turns away. | bs_out_nemo_02 (1): "[rises, bows to the table, and says something in a language nobody else here speaks]" | **EXISTS**: knocked_out (no bow; seated_bow first if wanted) | B |

### Cheshire Cat

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `grin_lingers` | After his fade, his grin layer stays over the empty chair ~3 s, then goes. | bs_out_cheshire_02 (1): "[fades away, beginning with the end of his tail and ending with the grin, which stays at the table some while...]" | **PARTIAL**: fade + knocked_out exist; the stage removes the grin with him | B |

## Transylvania

### Headless Horseman

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `plain actions` | Flick, slide, push, stillness as drawn. | fold.0, call.1, bet.0, bet.1, all_in.0, check.1, lose.3 (7): "[tosses his cards to the dealer without turning]" | **EXISTS**: fold, call, bet, all_in, still | A |
| `hilt` | Sword hilt raised in a fist above the rail: rap the felt, point at the pot / off toward the churchyard, cavalry salute. | check.0, raise.1, all_in.1, win.2 (4): "[salutes the table with the hilt of his sword, cavalry fashion]" | **NEW** | A |
| `turn_away` | Whole body swivels away (the mirror of turn), held. | fold.2, tv_p0_04 (2): "[slides his cards away and faces the window, where the dawn will be]" | **NEW** | A |
| `sword_flat` | The flat of the blade pushes chips in along the felt. | call.0 (1): "[pushes chips in with the flat of his sword]" | **NEW** | A |
| `sword_on_rail` | Lays the sheathed sword across the table edge. *Phone: knees are below the rail and never seen: across the table edge instead.* | check.2 (1): "[lays his sword across his knees]" | **NEW** | A |
| `stirrups` | Half rises out of the chair, leaning forward as if in stirrups; or rises an inch and sits again. | raise.2, tv_nd_11b (2): "[half-rises in his chair, as if in the stirrups, and raises]" | **NEW** | A |
| `turn_toward` | Whole body turned to a seat (or you) and held. | reraised.1, tv_hh_03b, tv_nd_07a, tv_p1_03 (4): "[turns his whole body toward whoever raised, and holds it there]" | **PARTIAL**: turn (toward you only) | B |
| `sword_ease` | A hand's width of bright blade drawn, held, slid home; or sheathed slowly. *Phone: an inch of steel will not read: a hand's width.* | reraised.0, lose.1, tv_hh_01b (3): "[eases his sword an inch from its scabbard, and lets it slide back]" | **PARTIAL**: sword (the rattle: his drum tell's decoy) | B |
| `palm_out` | A gauntlet held out palm up while the pot slides into it. | win.0 (1): "[holds out a gauntlet, palm up, until every chip is in it]" | **PARTIAL**: show (palm up) | B |
| `pumpkin_lift` | Both gauntlets lift the pumpkin off the bare collar: weigh it; raise it to hurl, then lower it. | all_in.2, lose.0 (2): "[lifts the pumpkin as if to hurl it, then thinks better of it]" | **NEW** | B |
| `pumpkin_tip` | Lifts the pumpkin a full head's height like a hat (a bow, a salute, a finger at the empty collar). *Phone: "an inch" will not read: lift it clear.* | tv_p2_03, tv_nd_24a, tv_nd_08a, tv_hh_05b (4): "[lifts the pumpkin an inch from his collar, as a gentleman tips his hat]" | **NEW** | B |
| `pumpkin_on_felt` | Sets the pumpkin on the felt (on the pot, or turned to the Wolf Man) as a prop that stays a few seconds. | win.3, beat_wolf_man.0, tv_nd_10b (3): "[sets the pumpkin on top of the pot, as a trooper plants a flag]" | **NEW** | B |
| `look_under` | Bends forward and aside; the pumpkin drops below the rail and comes back. | lose.2 (1): "[looks under the table, as he looks under everything, every night]" | **NEW** | B |
| `exit` | Stands, stiff bow from the waist, pumpkin under one arm, strides out (he has no knocked_out). | tv_elim_hh_01 (1): "[stands, bows stiffly from the waist, tucks the pumpkin under one arm and strides out]" | **NEW** | B |
| `settle` | Settles the pumpkin on his collar, then turn_away. | tv_hh_03d (1): "[settles it more firmly on his collar, and turns away]" | **EXISTS**: settle | C |
| `offer_gauntlet` | A gauntlet slid out flat across the felt and held. | tv_hh_06b, tv_hh_07b (2): "[...then offers a gauntlet across the table]" | **PARTIAL**: call (a flat gauntlet slides forward) | C |
| `point_door` | Points a gauntlet at a seat, then off past the edge of the room. | tv_nd_25a (1): "[points one gauntlet at Hyde, then at the door]" | **NEW** | C |
| `unbuckle` | Unbuckles the sword belt and hangs it on the chair back. | tv_hh_04b (1): "[unbuckles his sword belt and hangs it on the back of his chair, very slowly]" | **NEW** | C |

### Wolf Man

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `edge_away` | Leans/slides away from Hyde (see Everyone). | tv_hy_wm_03d (1): "[edges his chair an inch further from Hyde's]" | **NEW** | B |
| `howl_sheepish` | Muzzle up, one howl (no raised fists), then ears down, sheepish: his knocked_out. | tv_elim_wm_01 (1): "[howls once, then looks embarrassed about it]" | **PARTIAL**: win_big (a howl, but fists raised: triumph) + sheepish | B |
| `growl + sheepish` | Growls, then the sheepish look. | tv_nd_12b (1): "[growls, then looks embarrassed about it]" | **EXISTS**: growl, sheepish | C |

### Dracula

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `fingernail` | A fingernail along the table edge. *Phone: a nail is tiny; the whole hand travels, which reads.* | tv_vh_dr_02d (1): "[runs a fingernail slowly along the edge of the table]" | **EXISTS**: fingernail | B |
| `pulse + turn` | Watches a throat, then up to your face. | tv_p1_04 (1): "[looks up from the player's throat to the player's face]" | **EXISTS**: pulse, turn | B |
| `arrive` | Sweeps his cape back and sits; the fireside piece empties. | tv_arrive_01 (1): "The chair beside it is empty. The empty chair at the table is not." | **EXISTS**: arrive (cued) + presence | A |

### Jekyll

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `handshake` | Reaches across and shakes the Horseman's gauntlet (two figures; or a hand-and-gauntlet FX over the felt). | tv_hh_06c (1): "[shakes it, gravely]" | **NEW** | C |

## The Station

### Grey

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `fingers` | Studies/touches its own long fingers. *Phone: one finger on a hand is too fine: hold the hand up to the face.* | st_gr_as_03b (1): "[touches the back of his hand with one long finger, the way it touches the table]" | **PARTIAL**: fingers / wood | C |
| `bow_vanish` | Stands, head tilts past 90 degrees in a bow, then a hard cut to an empty chair (no fade). | st_elim_gr_02 (1): "[stands, bows at an angle no neck should allow, and is simply no longer in the chair]" | **NEW**: it has no knocked_out | B |

### Martian

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `look_toward` | The great eyes turn to the Astronaut and hold. | st_ma_as_03d, st_ma_gr_01c (2): "[looks at the Astronaut, pointedly]" | **PARTIAL**: turn (at you) | C |

### The AI

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `arrive` | The slumped Robot sits back up; the lens opens. | st_arrive_01 (1): "It sits down again, slowly, the way a person sits. In its chest, a lens opens." | **EXISTS**: arrive (cued) | A |
| `lens_shut` | The lens irises shut, the body slumps: its knocked_out. | st_elim_ai_02 (1): "[the lens irises shut, the Robot slumps in its chair...]" | **PARTIAL**: lose_big (slumped, lamps dark) | B |
| `lens_sweep` | Head/lens sweeps across the table past you without stopping. | c2_p0_02 (1): "[the lens passes over the player without stopping]" | **PARTIAL**: turn (tracks your hands) | B |
| `robot_wakes` | Lens dark; the Robot's eye-lamps flicker on; it looks round, puzzled. | c2_ai_out_01 (1): "[the lens goes dark; a moment later the Robot's own eye-lamps flicker back on, and it looks round, puzzled...]" | **PARTIAL**: lose_big + eyes_dim + head_turn (both built, never cued) | C |

## The Pyre

### Phoenix

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `plain actions` | Wingtip flick, slide, sweep, both wings, talon tap. | fold.0, call.0, bet.1, raise.2, check.0 (5): "[turns its cards face down with one wingtip, and looks away]" | **EXISTS**: fold, call, bet, all_in, check | B |
| `sing` | Beak open, one note (twice for "two notes"). | check.2, bet.2, raise.1, all_in.1 (4): "[a clear, high note, and a stack goes in]" | **EXISTS**: sing (a fidget today) | B |
| `wing_spread` | Wings out (a little, or wide), then the push; at heads-up start, wide, with a room light pulse. | raise.0, all_in.0, py_hu_01 (3): "[spreads its wings once, wide enough to light the columns, and folds them again]" | **EXISTS**: spread (a fidget; the heads_up lean plays instead) | B |
| `head_tilt` | Bird head cocked ~40 degrees, crest swinging, held. | check.1 (1): "[tilts its head, and waits]" | **NEW** | B |
| `beak_push` | Head dips to the felt; the beak nudges/sets a stack. | call.1, bet.0 (2): "[nudges a stack in with its beak]" | **NEW** | B |
| `wings_fold` | Wings drawn in tight over its cards / its stack, then opened toward the pot. | fold.2, all_in.2 (2): "[folds its wings, and its cards with them]" | **NEW** | B |
| `arrive` | From the altar piece: comes down, takes the chair, shakes warm ash from its wings. | py_intro_04 (1): "[steps down from the altar, crosses the court, and takes the chair opposite you...]" | **NEW**: ash (idle) covers the last beat | B |
| `fly_to_altar` | Wings up, lifts out of the chair; the altar piece returns, eyes closed. | py_bust_02 (1): "[flies back up to the altar, settles into the spice, and closes its eyes]" | **NEW** | B |
| `knocked_out` | Burns down in one bright flame (leave a small ash heap piece on the chair). | py_out_01 (1): "[burns down, all at once, to a small heap of warm ash on the chair]" | **EXISTS**: knocked_out | B |
| `ash_fx` | FX: grey flakes settle on its folded cards / a heat shimmer over its chips. | fold.1, call.2 (2): "[lets the cards go; a little ash settles on them]" | **NEW** | C |
| `eye_flip` | One gold eye at you, then the head flips to show the other. | py_p2_01 (1): "[looks at you with one gold eye, then the other...]" | **PARTIAL**: eye (one side) | C |
| `crest_bow` | Head bowed low, crest still burning (not the embers tell). | py_p3_02 (1): "[lowers its crest to you, flames and all]" | **NEW** | C |

## The uninvited guest (spoilers)

### Loki

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `appear` | He is simply there (no fade-in), squaring a stack, then arrive's look round. | uv_enter_01 (1): "[Nobody saw him sit down. ... squaring up the chips as if he had always been there.]" | **PARTIAL**: arrive (looks round, amused) | B |
| `vanish` | Gone on a cut (while Death's line is up), not the 0.8 s fade. | uv_farewell_won_01 (1): "[Nobody saw the uninvited guest leave. Nobody ever does.]" | **PARTIAL**: the chair fade (code change only) | B |

### the banished player

| Clip | Motion | Used by | Status | Pri |
|---|---|---|---|---|
| `tap_six_seven` | Their own check tap looped: six, a pause, seven (code: loop any puppet's check). | uv_mimed_01, uv_mimed_02 (2): "[taps the felt six times. A pause. Then seven.]" | **PARTIAL**: check | C |

## Sound, not animation

These directions describe something heard, or offstage. They are listed so the text is not their only carrier; each wants a sound in `web/sound.ts` (synthesised, like the rest) rather than a clip.

- Headless Horseman: a horse snorts (`fold.1`), spurs chime or ring (`call.2`, `raise.0`), hooves shift on cobbles (`bet.2`), the horse whinnies (`win.1`) or stamps (`lose.3`), hooves going hard for the churchyard (`tv_elim_hh_02`).
- Cerberus: the barks, bays and the howl (`bet.1`, `raise.0`, `raise.2`, `all_in.1`, `win.2`, `reraised.0`), the serpent tail's hiss (`win.3`), the sneeze (`lose.2`).
- The Phoenix: its notes and trills (`check.2`, `bet.2`, `raise.1`, `all_in.1`).
- The Cyclops: the table groans and creaks (`at_cy_od_01c`, `reraised.1`), cups jump (`at_cy_od_05d`).
- Transylvania: the wolves going quiet (`tv_arrive_03`): the room's ambience stopping is the cue.
- The finale: rain on the windows (`fn_intro_01`).

## Built but never cued

Clips that exist in anim.json and that nothing plays today (checked against the cue sites in `web/screens/table.ts` and `web/puppet/stage.ts`), with where each could go. 134 in all.

| Clip | Puppets | Where it could be cued |
|---|---|---|
| `big_bet` | 41 puppets (every opponent that has one) | facing a bet of about the pot or more, before they act (the bet is public, so it is no leak); Cerberus `reraised.1` |
| `collect` | 27 puppets (the cast built before the generated win_small) | Washington `win.3` ("one neat column"), Davy Jones `win.2` (the pot drawn under); or a middling pot between win_small and win_big |
| `won_pot` | the same 27 | the short nods: Washington `reraised.1` / `lose.0`, Leonidas `lose.2` (his is "one curt nod") |
| `laugh` | 12: Astronaut, Dracula, Hyde, Jekyll, JFK, Lincoln, Loki, Martian, Robot, the AI, Van Helsing, Wolf Man | lines whose words laugh (FDR's exit has its own); or as fidgets |
| `nod` | Grey, Headless Horseman | seated_bow lines: the Horseman's `tv_nd_24a`; the Grey before `bow_vanish` |
| `pistol_down`, `pistol_up` | Blackbeard | `pc_p0_05` ("sets a pistol on the table"), up again a few hands later |
| `greet`, `drum` | Lincoln | `greet` as the player sits down or at the first hand; `drum` as a fidget |
| `eyes_dim`, `head_turn`, `lamp`, `steam` | the AI (the Robot's, carried over) | `c2_ai_out_01` (the Robot's eye-lamps flicker back on = eyes_dim, then head_turn); `lamp` at its arrival |
| `shuffle`, `cut`, `burn` | Death, Pravuil | each hand's start (the screen already says "Death shuffles."), the cut, a burn before each street; Pravuil's `shuffle` for `fn_bust_04` |
| `deal_you` | Death, Pravuil | your two cards (one deal clip plays a hand today, its side by turns) |
| `rake` | Death, Pravuil | the end of each street; its frame draws chips of its own (CLAUDE.md, known gap), so fix that first |
| `watch_left`, `watch_right`, `watch_deal` | Death | turning to watch whoever acts; looking down at the deal |
| `watch_that` | Death | the lessons (it was built for them) and narration about a seat |
| `set_aside` | Death | the finale, as he takes the chair across from you, or `fn_end_01` |
| `quill`, `wings` | Pravuil | already seen: his `look_up` and `weary` play the same drawings; `quill` again for `fn_end_05` |

## Summary per character

| Character | NEW | PARTIAL | EXISTS | A | B | C |
|---|---|---|---|---|---|---|
| Death (dealer) | 0 | 1 | 3 | 2 | 2 | 0 |
| Death (player, finale) | 2 | 1 | 1 | 0 | 4 | 0 |
| Pravuil | 0 | 2 | 1 | 0 | 3 | 0 |
| Rooms | 7 | 4 | 1 | 5 | 5 | 2 |
| Screens | 2 | 0 | 0 | 0 | 0 | 2 |
| Washington | 3 | 3 | 5 | 5 | 5 | 1 |
| FDR | 0 | 0 | 1 | 0 | 1 | 0 |
| JFK | 0 | 0 | 2 | 0 | 2 | 0 |
| Socrates | 0 | 1 | 0 | 1 | 0 | 0 |
| Leonidas | 2 | 1 | 2 | 0 | 5 | 0 |
| Cyclops | 0 | 1 | 1 | 0 | 2 | 0 |
| Odysseus | 0 | 0 | 1 | 1 | 0 | 0 |
| Silver | 2 | 0 | 0 | 0 | 1 | 1 |
| Kidd | 0 | 0 | 1 | 0 | 1 | 0 |
| Blackbeard | 0 | 0 | 1 | 0 | 1 | 0 |
| Davy Jones | 0 | 1 | 0 | 0 | 1 | 0 |
| Lancelot | 0 | 0 | 1 | 0 | 1 | 0 |
| Cerberus | 11 | 11 | 3 | 9 | 10 | 6 |
| Pope | 1 | 0 | 2 | 0 | 2 | 1 |
| Scipio | 0 | 1 | 1 | 0 | 1 | 1 |
| Spartacus | 0 | 0 | 1 | 0 | 1 | 0 |
| Caesar | 0 | 0 | 1 | 1 | 0 | 0 |
| Javert | 0 | 2 | 2 | 1 | 3 | 0 |
| Nemo | 0 | 0 | 1 | 0 | 1 | 0 |
| Cheshire Cat | 0 | 1 | 0 | 0 | 1 | 0 |
| Headless Horseman | 12 | 4 | 2 | 6 | 8 | 4 |
| Wolf Man | 1 | 1 | 1 | 0 | 2 | 1 |
| Dracula | 0 | 0 | 3 | 1 | 2 | 0 |
| Jekyll | 1 | 0 | 0 | 0 | 0 | 1 |
| Grey | 1 | 1 | 0 | 0 | 1 | 1 |
| Martian | 0 | 1 | 0 | 0 | 0 | 1 |
| The AI | 0 | 3 | 1 | 1 | 2 | 1 |
| Phoenix | 7 | 1 | 4 | 0 | 9 | 3 |
| Loki | 0 | 2 | 0 | 0 | 2 | 0 |
| the banished player | 0 | 1 | 0 | 0 | 0 | 1 |
| **Total** | **52** | **44** | **43** | **33** | **79** | **27** |

Characters not listed have no stage direction that describes an action of theirs: their callouts are spoken, and their tells and idles are all cued already.

## The A list, NEW and PARTIAL

- PARTIAL: **Rooms** `station_lights_fail`: Blackout ~0.3 s, a flicker, then the amber backdrop fades up.
- NEW: **Rooms** `chips_float`: FX: every stack and the pot lift 20-40 px, drift, and drop back with a clatter; a single chip now and then as a room loop.
- PARTIAL: **Rooms** `fire_sinks`: Transylvania: the hearth loop dims to embers as the presence piece goes.
- NEW: **Rooms** `table_freezes`: Every figure stops breathing, blinking and swaying for ~3 s (hold_still, whole table).
- PARTIAL: **Rooms** `rome_secretary`: A scribe piece by the door holding up a wax tablet (text too small to read: keep the narration).
- PARTIAL: **Washington** `square_then_fold`: Squares his cards together, then flicks them in.
- NEW: **Washington** `account_book`: Takes a small book from his coat, writes two strokes, puts it away, then calls.
- PARTIAL: **Washington** `seated_bow`: See Everyone: a slow bow from the waist.
- PARTIAL: **Socrates** `glance_dealer`: A look toward Death, back to his cup, a sip.
- NEW: **Cerberus** `lick_paw`: One head dips to a raised paw; a big pink tongue, twice.
- NEW: **Cerberus** `tail`: The serpent tail rises over the chair arm into view: a thump, a slow wag with a hiss, or a sweep across the felt.
- PARTIAL: **Cerberus** `paw_and_nose`: A paw slides chips, then a head noses a few more / the right head peers at the count.
- PARTIAL: **Cerberus** `mouth_drop`: A head carries a stack in its jaws to the middle and drops it.
- NEW: **Cerberus** `bark`: The middle head snaps up, jaws wide, one beat; the others nod along.
- NEW: **Cerberus** `bark_round`: Left, middle, right head bark in turn, 0.3 s apart.
- PARTIAL: **Cerberus** `stand_over_pot`: Rears up, forepaws on the rail, three heads low over the middle.
- PARTIAL: **Javert** `notebook_close`: Opens the notebook, looks, snaps it shut unwritten.
- NEW: **Headless Horseman** `hilt`: Sword hilt raised in a fist above the rail: rap the felt, point at the pot / off toward the churchyard, cavalry salute.
- NEW: **Headless Horseman** `turn_away`: Whole body swivels away (the mirror of turn), held.
- NEW: **Headless Horseman** `sword_flat`: The flat of the blade pushes chips in along the felt.
- NEW: **Headless Horseman** `sword_on_rail`: Lays the sheathed sword across the table edge.
- NEW: **Headless Horseman** `stirrups`: Half rises out of the chair, leaning forward as if in stirrups; or rises an inch and sits again.
