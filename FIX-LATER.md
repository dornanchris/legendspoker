# FIX-LATER.md — the list we come back to

The owner's way of working: "make the next characters as we need them, then
go back and fix the ones". This is where "the ones" are kept, so nothing is
lost between threads. Add to it; strike an item through (or delete it) once it
is done, and say so in the commit.

## Art: redraws

- **The gothic style, from Transylvania on** (the owner: "Gothic Style yes").
  Transylvania and the Station are drawn in it (the Headless Horseman's
  approved sheet is the style image; ART-PIPELINE.md). Already built in the
  flat cartoon, to redraw in it later:
  - **Van Helsing** (built, Transylvania seat 1). The first to do: he is
    now the one flat-cartoon figure among four gothic ones at his table.
  - ~~**The Wolf Man**~~ DONE: redrawn gothic and built.
  - **The Cheshire Cat** (built, Baker Street seat 3, in Cerberus's style).
- **Reactions for the rest of the cast** (the owner: "probably all"). The
  big win (hands raised) and the crushing loss: reactions sheet E for every
  character drawn before JFK and Loki (they have them inside sheets B and D).
  Prompts exist for the White House four (end of their POSES.md); write the
  rest as they come up. Until then the table plays the small win and the old
  lost-pot beat (`win` / `lose` in anim.json, `art-tools/build/win_small.py`).
- **More drawn poses, less rigging** (the owner: "lean into the stop motion
  stuff a bit more"). When a gesture looks stiff as a tweened arm, the fix is
  another whole-figure drawing, not another bone.
- **IK arms (rigging-parts sheets)** for everyone but Washington, as each
  character comes up for a fix. Teddy's can come from his six Rive sheets
  (`art-tools/roosevelt_parts/sources/rive_*.png`).
- **JFK's and Loki's sheets drew a little more painted** than the presidents'
  cartoon (soft shading). They read fine at the table; redraw only if they
  stand out in play.

## Online (when it is designed)

- **Death and the Stranger as online avatars** (the owner: "I would much rather
  have them and not need them"; the design doc: beating the game unlocks Death
  as a playable avatar). Prompts written: `art-tools/death_avatar_parts/POSES.md`
  (three-quarter, any chair, from his dealer sheet, no deck) and
  `art-tools/avatar_parts/POSES.md` (the Stranger, redone in the later tables'
  style, hands empty). Rule 3: an online avatar's moves have ZERO correlation
  with its cards, so sheet C of each is cosmetic loops only (LOOP), and the game
  side (which clips play online, and when) waits for online's design.
  **The Stranger's sheets are drawn** (`art-tools/avatar_parts/sources/`:
  the character sheet, poses A, B (and an alternate B) and C); its puppet is
  not built. **Its accent is the player's to choose** (the owner: free, so
  avatars differ a little until others are unlocked): the scarf, hat band
  and glove cuffs are drawn teal, hue 175-202, apart from the blue rim light
  and the felt, so `art-tools/avatar_parts/accent.py` recolours them by hue
  (teal, crimson, gold, violet, ivory, emerald; `accents.png`). At build
  time, bake a mask of those pixels per image and tint it at runtime, or
  bake one set per accent: online's design decides which.
  **Death's player sheets are drawn too** (`art-tools/death_avatar_parts/
  sources/`: character sheet, poses A, B, C and the face sheet); his puppet
  is not built either.

## Room and puppet leftovers (the last build)

- **The Phoenix:** a sliver of the drawn rail by its near wing at rest; its
  knocked-out flame is cut straight a little below the table line; its open
  beak is clipped by the head's outline (it reads as a little open).
- **The Pyre's, the Last Crossing's and the Hall's pieces are not used yet**
  (the nest, ash, dawn sky; the lamp, rain, boat, door): drawn at other sizes
  than the backdrops' (each pieces.json says why). The rooms read without them.

## The table screen (from the owner's screenshots)

- **The Station's ceiling lens is cut off at 16:9.** The backdrop drew its
  socket at the very top of the picture, so the open lens (the room watching)
  shows only on windows taller than 16:9; at 16:9 just the socket's lower rim.
  A redrawn plate with the socket lower, or the lens moved down, would fix it.
- **The Station's wall lamps** sit at 23% and 77% across (the prompt asked 27%
  and 73%), glowing just beside the end seats' heads. They read; nudge only if
  they distract.
- **The Grey's rest pose keeps two short stubs of the drawn rail's outline** by
  its near elbow and far wrist, lying on the felt, and a soft smear where the
  sheet's white was cut from between its arms and torso (just above the table
  line). Small at table size; tighten its forearm polygons if they show.
- **The Martian's tentacles lie behind its name plate** at seat 2 (it sits low:
  its sheets put the table line high). Fine in play; move the plate only if it
  hides a tell.
- **The AI's tells are the lens only**: nothing on the ceiling plays while it
  watches without a chair (its tells fire once it sits). The sheet's half and
  narrowed lens pieces are cut but unused; the "lights dim" tell dims the lens,
  not the room's lamps (the stage dims only loop pieces, and the Station has none).

- **A wide screen cuts off the player's own seat:** the plate at the left
  edge and the hole cards at the bottom (seen at the Pirate Cove).
- **A bet's chip pile lands beside or over the board** when the seat's pile
  spot is near the middle.
- **Death's dealt cards fly over his own "DEATH deals" plate** as they leave
  his hands: start the flights below the plate, or put the plate under them.
- **Tell and idle text overlaps the name plates.**
- From CLAUDE.md's staged-table gaps, still open: two speech
  bubbles can overlap; Death's clips draw their own cards and chips over the
  game's flights; a window narrower than 16:9 shows the room low; the top bar
  is phone-sized on a monitor; Reduce motion hides the older speech bubbles.

## Game and words (other threads)

- ~~**Jekyll and Hyde take Frankenstein's Monster's seat at Transylvania**~~
  DONE (ENGINE_VERSION 13; CLAUDE.md has how). Settled as proposed: ranks
  only, the hand that beat him whoever played it, and only a LATER win (the
  knockout itself never counts). Still open: Jekyll's exit line "If a small
  man in my coat should come asking for my chair..." hints at the return;
  cut it if the return should be a pure surprise. Hyde's sheets drew him
  Jekyll's size (built at 0.88). Jekyll's B5 decoy drew one hairy hand
  (it gives the tell away a little; reroll if it shows in play). The rules
  as asked:
  - **One seat, two men, 50/50 per sitting:** each sitting deals either Dr.
    Jekyll or Mr. Hyde in seat 2. Pick it from the sitting's seed so a resume
    replays the same man (never from the live game RNG after the deal starts).
  - **The return is a trigger, not a timer:** once Dracula has arrived and
    Jekyll/Hyde has been knocked out, the OTHER one comes back into an empty
    chair when the player wins a pot holding the same two ranks as the hand
    that knocked him out (knocked out by pocket aces: win again with pocket
    aces). An Arrival like JFK's `onHumanWin`. Open questions for that thread:
    ranks only or suits too (ranks: "pocket aces" is a rank pair); and what
    counts when an AI, not the player, knocked him out (proposed: the same
    ranks either way, the hand that beat him).
  - Two character files (two dial sets: Jekyll tight and apologetic, Hyde
    reckless and aggressive, the design doc's runner-up), the Monster's
    dialogue replaced, an ENGINE_VERSION bump (a table's cast), a check script
    like `check:visitor` that forces the return.
- **How the player gets called names** (the owner: "We should reevaluate the
  way we get called names here. It can wait."): the earned names by respect
  tier (`src/tour.ts`, the dialogue's tiered lines), and the one line that
  genders the player, `wh_p0_03` ("the look of a man who has read about
  poker").
- **Holmes's deerstalker as an earned skin** (the owner): once Holmes is
  unlocked, beating him heads up earns the hat look. Game work, out of the art
  thread's scope; the art (`#/puppet/sherlock_deerstalker`) is built.
- **The human edit pass on the draft dialogue** (CLAUDE.md, owed before
  Phase 5).
