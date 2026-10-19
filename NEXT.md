# NEXT — what is left, in one place

The short list after the art build. Details live where each item points;
this file only gathers them. Strike an item through when it is done.

## Words

1. ~~**Showdown puns for the rest of the tour.**~~ DONE (draft, like the
   rest): every speaking character has `win` / `lose`, `reraised`, hand
   lines where one fits, and `beat_` lines for their tablemates and the
   champions they meet again. For the edit pass: the Lancelot/Guinevere
   hints, Hyde's cane, the Pope's "Lucrezia ... goes through husbands",
   Dracula's "That makes twenty-four, Caesar".
2. **The human edit pass on the draft dialogue** (owed before Phase 5;
   CLAUDE.md "All content is draft", with the facts flagged to spot-check).
3. **How the player gets called names** (FIX-LATER.md, "Game and words"):
   the earned names by tier, and `wh_p0_03`, the one line that genders the
   player.
4. **The finale's open questions** (FIX-LATER.md, "The finale's new format"):
   Pravuil never speaks (the dealer's bubble is unused there); the ending
   keeps "the ledger on the bench by the door" as Death's own. The owner's
   call on both.
5. **Jekyll's exit line** hints at the other half's return; cut it if the
   return should be a pure surprise (FIX-LATER.md).

## Game

6. **Holmes's deerstalker as an earned look**: once Holmes is unlocked,
   beating him heads up earns the hat. The puppet is built
   (`#/puppet/sherlock_deerstalker`); nothing seats it yet.
7. ~~**The staged table's gaps**~~ DONE: overlapping bubbles, the deal clip,
   the top bar, tells over the plates, bets on the board, the narrow
   window's dark band. Left: "a wide screen cuts off the player's seat" was
   not reproduced (FIX-LATER.md says what was tried).
8. ~~**"Reduce motion" hides the older speech bubbles**~~ DONE: every bubble
   is up on a timer as well as its animation.

## Art

9. **Unwanted colours, cast-wide** (FIX-LATER.md): the Green Knight and
   Lancelot are cleaned; run `art-tools/build/paper_flecks.py <id> --dry`
   puppet by puppet, look, then apply. Small leftovers per puppet are listed
   there (holly paper, rail stubs, the Phoenix's rail sliver, Pravuil's halo
   edge, the Grey's rail stubs).
10. **The unused room pieces** of the Pyre, the Last Crossing and the Hall
    (drawn at other sizes than their backdrops).
11. **IK arms** for anyone past Washington, each from a rigging-parts sheet,
    only where a drawn pose will not do (the owner: more drawn poses, less
    rigging).

## Online (when it is designed)

12. **Death and the Stranger as online avatars**: both puppets are built for
    the finale; online decides which clips play (rule 3: cosmetic loops only,
    zero correlation with the cards).

## Platform: Phase 4

13. **Capacitor + a real device** (Android first: the dev machine is
    Windows). Decide whether Vite/React still earn their place. The exit test
    is the owner's: the game on a phone in landscape with one sound on a
    button press, the safe areas and the audio unlock checked on hardware.
