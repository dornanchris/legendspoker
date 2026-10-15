# Theodore Roosevelt's parts

Cut from his rigging sheet (`sources/roosevelt_sheet.png`), drawn to Lincoln's
layout: finished heads facing each way, torsos, straight forearms drawn as
tubes of sleeve, hands with their cuffs, and a row of seated reference poses.
`roosevelt/` holds every piece, a numbered `_contact_sheet.png` and `parts.json`
with a label on each.

    python3 art-tools/cut_sheet.py art-tools/roosevelt_parts/cut.json

(`cut.json` separates the pieces that touched.) Earlier sheets are in git
history.

## The puppet

Built by `art-tools/seat_puppet.py` from `seat.json`, in the rim pose
Lincoln's sheet introduced (see `art-tools/lincoln_parts/README.md`):
forearms along the table's edge, hands folded in front.

    python3 art-tools/seat_puppet.py art-tools/roosevelt_parts/seat.json

- **Heads** (slot `head`): {'fdr': '1 the holder in his teeth, cocked up (rest); swaps 2 a grin around the holder, 3 talking (no holder), 4 neutral, glancing, 5 laughing, 6 laughing, head back', 'washington': '1 neutral, mouth set firm (rest); swaps 2 talking, 3 a slight, rare smile, 4 a frown, 5 jaw clenched', 'roosevelt': '1 neutral, a scowl (rest); swaps 2 the big grin, 3 talking, 4 a frown, 5 eyes narrowed, suspicious, 6 without his pince-nez (for polishing them)'}. Swaps are placed by matching their faces
  to the rest head (`"fit"`, cached in `roosevelt_rig/fits.json`); mirrors face the
  other way and are not used (the puppet is flipped instead).
- {'fdr': 'His naval cape is back: the torso wears it, chained at the throat over the pinstripe suit. Hands: resting (rest), flat, two cards, the holder, tapping ash.', 'washington': '`"head_clothes": "piped"` trims the coat and braid painted under the heads, and the head sits low on the torso\'s stock (`neck` 150, `"collar": 0.06`). Hands: resting (rest), flat, two cards, pointing, a fist.', 'roosevelt': 'Brown three-piece suit, pince-nez on a cord, no cigar anywhere. Hands: resting (rest), flat, two cards, palm in, polishing the pince-nez with a handkerchief, holding the pince-nez.'}

`preview.png` is the rest pose; `preview_faces.png` shows every head on it.

## Gaps

- The cards have a red back, not Death's; hide them.

## The game's puppet: from the pose drawings

**Built by `art-tools/pose_rig.py` from `pose_rig.json`** from his four pose
sheets and his face sheet (`cut_face.json` into `roosevelt_face/`), as the
rest of the table is. `seat.json` now writes its layout to
`roosevelt_rig/parts_sheet_layout.json`.

- Rest = A1 (hands apart). The master head replaces A1's head.
- **Face**: eyes (half, closed, viewer, down, up, narrow), brows (raised,
  down), mouths (rest, ah, ee, oh, oo, m, f, l, grin, laugh, scowl); heads
  23 (laughing, thrown back) and 24 (front-on). Piece 2 (the head without
  spectacles) and 6 (the spectacles alone) are cut but unused: the polish
  tell is a whole-figure drawing.
- **Arm pieces** (right hand) traced in the rest pose's pixels: peek, check,
  call (chips kept), fold, show (cards cut out), drum, tap, talk and fist
  (raised); left: the pocket watch.
- **Frames**: bet, all in, collect, the lean, arms folded (lost pot), the
  heads-up lean, with the master head on the frame's own drawn head
  (`head_match: "face"`) and the coat filled beside its narrower neck
  (`fill_shoulders`); polish, push the spectacles up and the moustache tug
  keep their own heads. His coat is the chair's brown, so the wood peeling is
  off (`no_peel`). Sheets differ a little in size; frames are placed by the
  rail's height and his shoulders.

**Clips** (`web/art/roosevelt/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/roosevelt`): check, peek, call, bet, fold, all in,
show, collect; tells `grin` (strong) beside `laugh`, `drum` (bluffing) beside
`tap`, `polish` (tilted) beside `push_specs`; idles `square`, `watch`,
`moustache`, `lean`; beats `talk`, `look_at_you`, `big_bet`, `lost_pot`,
`won_pot`, `heads_up`.

`POSES.md` lists his 24 poses and the prompts.

## For a Rive artist

The owner may hire an animator to rig Teddy in Rive. `RIVE_PARTS.md` has the
five prompts for drawing him once as parts (body, right arm and hands, left
arm and props, head and face, and two new reference poses). The brief for the
artist is the owner's Claude Doc "Teddy Roosevelt: Animation Brief": the
essentials only, a rig that breathes, blinks, glances and talks, and 15
animations (peek, check, bet, all in, fold, win, big win, lose, knocked out,
and the three tells with their decoys). Hands are empty; the game moves the
cards and chips. Names differ from today's clips in places (`win` / `lose`
for `won_pot` / `lost_pot`; `bet` serves calls and raises): game work, once
a `.riv` exists.
