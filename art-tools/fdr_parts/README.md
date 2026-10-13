# Franklin D. Roosevelt's parts

Cut from his rigging sheet (`sources/fdr_sheet.png`), drawn to Lincoln's
layout: finished heads facing each way, torsos, straight forearms drawn as
tubes of sleeve, hands with their cuffs, and a row of seated reference poses.
`fdr/` holds every piece, a numbered `_contact_sheet.png` and `parts.json`
with a label on each.

    python3 art-tools/cut_sheet.py art-tools/fdr_parts/cut.json

(`cut.json` separates the pieces that touched.) Earlier sheets are in git
history.

## The puppet

Built by `art-tools/seat_puppet.py` from `seat.json`, in the rim pose
Lincoln's sheet introduced (see `art-tools/lincoln_parts/README.md`):
forearms along the table's edge, hands folded in front.

    python3 art-tools/seat_puppet.py art-tools/fdr_parts/seat.json

- **Heads** (slot `head`): {'fdr': '1 the holder in his teeth, cocked up (rest); swaps 2 a grin around the holder, 3 talking (no holder), 4 neutral, glancing, 5 laughing, 6 laughing, head back', 'washington': '1 neutral, mouth set firm (rest); swaps 2 talking, 3 a slight, rare smile, 4 a frown, 5 jaw clenched', 'roosevelt': '1 neutral, a scowl (rest); swaps 2 the big grin, 3 talking, 4 a frown, 5 eyes narrowed, suspicious, 6 without his pince-nez (for polishing them)'}. Swaps are placed by matching their faces
  to the rest head (`"fit"`, cached in `fdr_rig/fits.json`); mirrors face the
  other way and are not used (the puppet is flipped instead).
- {'fdr': 'His naval cape is back: the torso wears it, chained at the throat over the pinstripe suit. Hands: resting (rest), flat, two cards, the holder, tapping ash.', 'washington': '`"head_clothes": "piped"` trims the coat and braid painted under the heads, and the head sits low on the torso\'s stock (`neck` 150, `"collar": 0.06`). Hands: resting (rest), flat, two cards, pointing, a fist.', 'roosevelt': 'Brown three-piece suit, pince-nez on a cord, no cigar anywhere. Hands: resting (rest), flat, two cards, palm in, polishing the pince-nez with a handkerchief, holding the pince-nez.'}

`preview.png` is the rest pose; `preview_faces.png` shows every head on it.

## Gaps

- The cards have a red back, not Death's; hide them.

## The game's puppet: from the pose drawings

**Built by `art-tools/pose_rig.py` from `pose_rig.json`**, as Lincoln and
Washington are, from the pose sheets (`sources/poses_a.png` .. `poses_d.png`)
and the face-overlay sheet (`sources/face_overlays.png`, cut by
`cut_face.json` into `fdr_face/`).

    python3 art-tools/cut_sheet.py art-tools/fdr_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/fdr_parts/pose_rig.json

- **Rest = pose A1** (hands resting apart). The master head (face sheet piece
  1, drawn without the holder) replaces A1's head (`replace_head`).
- **The holder is its own piece** (`master.props.holder`), cut from A1 as
  drawn, on its own bone turning where it meets his mouth: his strong tell
  (`holder_up`) and its decoy (`holder_low`) are rotations of it. The face
  sheet's own holder (piece 2) is drawn about half as long again relative
  to his head as in every pose, so it is not used.
- **Face**: `face.json` maps eyes (half, closed, viewer, down, up, laugh),
  brows (raised, together, narrow) and eleven mouths (rest, ah, ee, oh, oo,
  m, l, smile, grin, half_smile, wry); no "f" mouth was drawn, so f and v
  speak as "m". Heads 23 (laughing, head back), 24 (front-on) and 25 (turned
  across the room) are head swaps; each has the holder drawn in, so a clip
  showing one hides the holder piece.
- **Arms** (hands apart, so a one-arm gesture changes only that forearm, in
  the air): near `peek`, `check`, `call` (chips kept), `fold`, `greet` (D1),
  `open` (D5); far `talk` (D2, the holder in his fingers), `pince` (C5),
  `open` (D5). `strip_thin` drops rail strands clinging to his hands.
- **Frames** (the whole figure leans): `bet` (A5) and `heads_up` (D6), placed
  by the rail, the master head and holder riding on their necks.
- **Validation**: `fdr_pose/validate.png`: 0.82% of the pixels above the rail
  differ from A1 (the head, replaced, not counted).

**Clips** (`web/art/fdr/anim.json`, 23, every one ending exactly at rest;
preview `web/index.html#/puppet/fdr`): poker actions `check`, `peek`, `call`,
`bet`, `fold`, `all_in`, `show`, `collect`; tells `holder_up` (strong) and
`ash_tap` (weak) beside `holder_low`, `broad_smile` (bluffing) beside
`half_smile`; idles `holder_out`, `pince_nez`, `cape`, `nod`, `laugh`; beats
`talk`, `look_at_you`, `lost_pot`, `won_pot`, `heads_up`.

Sheet B was redrawn (the first drew Washington's lace cuffs; it is in git
history): `show` (B2, cards cut away: the game draws them) and `holder_out`
(B4) are arm pieces; `all_in`, `collect`, `cape` (B6) are frames with the
master head, `ash_tap` (B5, head bowed over the holder) a frame with its own
head. Pose C6 (the old cape, lace cuffs) stays unused.

`POSES.md` lists his 24 poses and the prompts.
