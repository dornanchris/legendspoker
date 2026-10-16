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
  - **The Wolf Man** (his sheets are in but not built: build him only once he
    is redrawn, or build the old sheets now if the table needs him first).
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
