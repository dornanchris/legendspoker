# George Washington's parts

Cut from his rigging sheet (`sources/washington_sheet.png`), drawn to Lincoln's
layout: finished heads facing each way, torsos, straight forearms drawn as
tubes of sleeve, hands with their cuffs, and a row of seated reference poses.
`washington/` holds every piece, a numbered `_contact_sheet.png` and `parts.json`
with a label on each.

    python3 art-tools/cut_sheet.py art-tools/washington_parts/cut.json

(`cut.json` separates the pieces that touched.) Earlier sheets are in git
history.

## The game's puppet: from the pose drawings

**Built by `art-tools/pose_rig.py` from `pose_rig.json`**, as Lincoln is, from
the complete pose drawings (`sources/poses_a.png` .. `poses_d.png`, the sheets
`POSES.md` asked for) and the face-overlay sheet (`sources/face_overlays.png`).

    python3 art-tools/cut_sheet.py art-tools/washington_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/washington_parts/pose_rig.json

- **Rest = pose A1** (hands resting apart on the felt). His hands never touch,
  so each arm is its own piece and the other arm never has to move: the
  check changes only his right forearm, and only while it is in the air.
- Pieces: `arm_near.rest` (A1: right forearm, cuff, lace, flat hand),
  `arm_near.check` (A3, registered to A1 on the torso: the fist that knocks
  at the rail), `arm_far.rest` (A1: left cuff, lace and hand).
- **Face**: the face sheet cut into `washington_face/` (1 the master head,
  2-6 eyes half/closed/viewer/down/up, 7-8 brows raised/together, 9-20
  mouths, 21 the breath puff of the sigh mouth, cut away on its own and
  unused, 22-24 heads turned to the window, front-on, chin up: not used yet).
  `face.json` maps them; `pose_rig.py` makes the master head
  (`washington_rig/master.png`) and bakes the layers (`washington_rig/face/`).
  Mouth 17 (open, tongue showing) is spare. The eye patches carry the brows
  too; each kind draws only on its own band of the face.
- **The master head replaces A1's head** (`"replace_head"`): it is a separate
  drawing a little narrower than the head in the poses, and A1's own cheek and
  wig showed round it as a second outline. The body keeps nothing of A1's
  head above the collar.
- `"fill"`: a sliver of white background between his left lace and his
  waistcoat in A1, painted over with the coat.
- **Validation**: `washington_pose/validate.png`: 0.67% of the pixels above
  the rail differ from A1 (the head, replaced, not counted).

The **check** (`web/art/washington/anim.json`): the right hand lifts flat,
turns to a fist in the air, knocks twice on the rail and lifts again to lay
the hand flat. Preview: `web/index.html#/puppet/washington`.

Not used yet: sheets B-D (all in, show, collect, the tells, talking, the big
bet, the lean). Pose B2 draws real card faces (A spade, K heart); the game
draws its own cards, so that pose needs its cards cut out.

## The parts-sheet puppet (superseded for the game)

Built by `art-tools/seat_puppet.py` from `seat.json`, in the rim pose
Lincoln's sheet introduced (see `art-tools/lincoln_parts/README.md`):
forearms along the table's edge, hands folded in front.

    python3 art-tools/seat_puppet.py art-tools/washington_parts/seat.json

- **Heads** (slot `head`): {'fdr': '1 the holder in his teeth, cocked up (rest); swaps 2 a grin around the holder, 3 talking (no holder), 4 neutral, glancing, 5 laughing, 6 laughing, head back', 'washington': '1 neutral, mouth set firm (rest); swaps 2 talking, 3 a slight, rare smile, 4 a frown, 5 jaw clenched', 'roosevelt': '1 neutral, a scowl (rest); swaps 2 the big grin, 3 talking, 4 a frown, 5 eyes narrowed, suspicious, 6 without his pince-nez (for polishing them)'}. Swaps are placed by matching their faces
  to the rest head (`"fit"`, cached in `washington_rig/fits.json`); mirrors face the
  other way and are not used (the puppet is flipped instead).
- {'fdr': 'His naval cape is back: the torso wears it, chained at the throat over the pinstripe suit. Hands: resting (rest), flat, two cards, the holder, tapping ash.', 'washington': '`"head_clothes": "piped"` trims the coat and braid painted under the heads, and the head sits low on the torso\'s stock (`neck` 150, `"collar": 0.06`). Hands: resting (rest), flat, two cards, pointing, a fist.', 'roosevelt': 'Brown three-piece suit, pince-nez on a cord, no cigar anywhere. Hands: resting (rest), flat, two cards, palm in, polishing the pince-nez with a handkerchief, holding the pince-nez.'}

`preview.png` is the rest pose; `preview_faces.png` shows every head on it.

## Gaps

- The cards have a red back, not Death's; hide them.
- A few dark specks of the trimmed collar can show at the jaw on some heads.

`seat.json` now writes its layout to `washington_rig/parts_sheet_layout.json`,
so running it never overwrites the game's puppet.

`POSES.md` lists his 24 poses and the prompts for the four pose sheets and
the face-overlay sheet.
