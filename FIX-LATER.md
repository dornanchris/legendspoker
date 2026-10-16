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
  - **Van Helsing** (built, Transylvania seat 1).
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

## The table screen (from the owner's screenshots)

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
