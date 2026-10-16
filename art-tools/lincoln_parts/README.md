# Lincoln's parts

Cut from one sheet (`sources/lincoln_sheet.png`) laid out for rigging: six
finished heads without the hat and six with it, the face parts, torsos, a
row of seated reference poses (him at the table, waist up, both facings),
straight forearms drawn as plain tubes of sleeve, and hands with their cuffs.
`lincoln/` holds every piece, a numbered `_contact_sheet.png` and
`parts.json` with a label on each.

    python3 art-tools/cut_sheet.py art-tools/lincoln_parts/cut.json

(`cut.json` separates a pair of heads, and two hands from the arms they
touched. Two forearms drawn overlapping, 74 and 85, could not be parted;
they are not used.)

This is his third kit. The first had heads turned nearly to profile; the
second (hat on and bare, on two sheets) had the angle right but the same
arms as everyone else, lying out on the felt to the sides. git history keeps
both.

## The puppet

Built by `art-tools/seat_puppet.py` from `seat.json`:

    python3 art-tools/seat_puppet.py art-tools/lincoln_parts/seat.json

- **Arms: `"pose": "rim"`.** Copied from the sheet's reference poses: both
  forearms lie along the table's edge in front of him and the hands meet in
  front, folded, the way a person rests at a table (and the way Death rests
  his on the deck). Forearm 82 for both, the far one mirrored; each is cut
  straight across at the elbow opening and the wrist cuff (`"cuff": "tube"`),
  and turned to point where `nr` / `fr` say (directions, so the angle it was
  drawn at does not matter). Hand 88 on each, its cuff and sleeve stub
  covering the forearm's cut end; the torso is drawn again over the elbows,
  at its sides only, so the sleeves run into the forearms. Swaps: cards
  (89), a glass (90), fingers curled (92).
- **Heads** (slot `head`): hat on, 7 neutral (rest), 8 a slight smile,
  9 laughing, 10 talking with brows down; without the hat, 1 neutral,
  2 a slight smile, 3 smiling and talking, 4 laughing, 5 a frown, 6 stern.
  Every swap is placed by matching its face to the rest head (`"fit"`,
  cached in `lincoln_rig/fits.json`): the bare heads were drawn about 10%
  larger.
- **The hat tip.** `"hat": "from_head"` lifts the hat off head 7 into
  `lincoln_rig/hat.png`, a hidden part exactly where it sits. A tip is a
  bare head plus that hat, raised and tilted. `preview_faces.png` shows the
  four hatted heads, then the six bare ones mid-tip.
- The whole kit is drawn about 12% smaller than the other presidents', so
  its scales are 12% larger.

`preview.png` is the rest pose.

## Animation: built from the pose drawings

**The game's puppet is built by `art-tools/pose_rig.py` from `pose_rig.json`**,
from the complete pose drawings (`sources/poses_a.png`), not from the parts
sheets: the drawings are the source of truth for his proportions, sleeves,
cuffs and perspective.

    python3 art-tools/pose_rig.py art-tools/lincoln_parts/pose_rig.json

- **Rest = pose A1** (hands laced). The body is A1 with the forearms lifted
  out; the coat hidden behind them is rebuilt from the coat round it.
- **Arms: forearm, cuff and hand are ONE piece**, cut from a drawing along
  its outline, turning about the elbow. There is no wrist joint, so a hand
  can never drift off its cuff. Each piece's elbow end is grown a little
  under the upper arm, and a copy of each upper arm (the body's own pixels
  round the elbow) is drawn over it, so turning never opens a gap.
- **Alternate pieces share the elbow.** Pose A3 (the check) and pose A2 (his
  left arm resting alone) are registered to A1 on the torso (A2 on his left
  side, where it leans) before their arms are cut, so every piece hangs on
  the same elbow point. Pieces: `arm_near.rest` (A1: his right forearm with
  the laced hands), `arm_near.check` (A3), `arm_far.rest` (A1: his left
  forearm to the knuckles), `arm_far.alone` (A2).
- The table and chair are dropped (felt and dark wood by colour, the rail's
  skin-coloured highlight by the polygons, wood peeled off the outlines).
  Brown counts as wood only where it joins the rail or the panel's edge, so a
  button's rim or the shading round his face is kept.
- **Validation**: `lincoln_pose/validate.png` is A1, the rebuilt rest pose,
  and their difference: 0.20% of the pixels above the rail differ (against
  his whole silhouette, colours the filters drop included).
- The master head (`lincoln_rig/master.png`, from the face sheet) and its
  face layers are fitted onto A1's head; `seat.json` still makes them. It
  replaces A1's own head in the body (`replace_head`), so a swapped head
  (front-on, piece 22) or a tilt never shows a second head behind it.

The **check** (`web/art/lincoln/anim.json`) turns each arm about its elbow
from rest to the A3 pose, taps twice, and comes back. The laced hands of A1
are one tangle that no drawing parts, so both arms change piece as the lift
begins and again just before the hands meet: the one moment no drawing
covers. A drawing of A1 with his right hand lifted away (his left resting
alone, as in A1) would let that change happen without the jump.

**Every other clip** (26 in all, every one ending exactly at rest; preview
`web/index.html#/puppet/lincoln`, each beside its drawing):

- Poker actions: `check`, `peek`, `call`, `bet`, `fold`, `all_in`, `show`,
  `collect`, and the idle `fidget` (lifting the top chip).
- Tells and the idles that hide them: `beard` beside `chin`; `lean_back`
  beside `stretch`; `small_smile` beside `amused`.
- Idles and beats: `hat_tip`, `greet`, `rub_eyes`, `look_at_you`, `talk`,
  `laugh`, `big_bet`, `lost_pot`, `won_pot`, `drum`, `knocked_out`.

His laced hands mean every gesture moves both arms, so apart from the check
every pose is a **whole-figure frame** (`frames` in `pose_rig.json`), as
Washington's leans are: the whole drawing, placed on the rest pose. Sheets B
and C are drawn at other sizes (about 0.86 and 1.15 of sheet A), so each pose
carries its own placement (`reg`): matched on the torso where he sits as at
rest, by the table's edge and his centre where he leans. Two kinds:

- **With the master head** (the poker actions, `lean_back`, `talk`): his
  drawn head is cut away and the master head, with its blinks, looks and
  talking, rides on the frame's neck.
- **With its own head** (a hand at his face or his hat, a laugh, standing):
  the frame keeps its drawn head, and the master head and its face layers
  are hidden while it shows.

`look_at_you` swaps in the face sheet's front-on head (piece 22); `small_smile`
and `won_pot` are face layers and small head moves. The clock glance (C4,
piece 20) is left out: there may be no clock in the room. The chair is cut
from every frame (`drop_wood`, `back_strip`: nothing thin at his back).
In `show` the drawing's cards had faces; they are cut out (the game draws the
cards), his chest from the rest pose shows behind them (`body_under`) and the
coat is filled below it (`fill`). A faint seam where that chest meets the
drawing shows only close up.

## Gaps

- The hands that hold a cigar (87, 91, 94, 97) are not his; leave them out.
- Heads 11 (nearly front-on) and 12 (facing the other way) are not used.
- The cards have a red back, not Death's; hide them.

## The IK arm (retired)

`ik_split.py` cut his check arm into upper arm, forearm and pointing hand for
the IK prototype, beside Washington's arm built from hands drawn as parts. The
owner chose Washington's way; Lincoln's cast entry no longer loads `ik.json`,
so his old clips play. The script, `ik.json` and the `ik_*` images stay as a
record (`npx tsx web/puppet/ik-check.ts lincoln` still checks them).
