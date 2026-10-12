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

## Animation (phase 1: face, and the check)

The face sheet's head (`lincoln_face/lincoln_face_01.png`) is the master
head: `seat.json` places it by matching its face to head 7, so his pose and
proportions stay, and trims its own collar and tie (the torso's show).
`face_rig.py` bakes the face sheet's patches into layers the size of that
head (`lincoln_rig/face/`), from `face.json`:

- each patch is found on the master by matching (`fits.json`), its drawn
  outline stripped, its skin matched to the head's, and its edge faded;
- each kind draws only on its own region: eyes below the brow line, brows
  above it (so they change independently), mouths below the nose; open
  mouths are moved down until the upper lip clears the nose (the drawings
  open the mouth upward, into it), over a patch of plain skin;
- eyes: half, closed, viewer, down, up. Brows: raised, together. Mouths:
  rest, ah, ee, oh, oo, m, f, l, smile, tight, sigh.

The fists for the check (`lincoln_hands/` 5 and 6) are placed on his near
wrist (`hand_extras`). `seat.json`'s `"runtime"` writes the rig to
`web/art/lincoln/`; his face timing and clips are in
`web/art/lincoln/anim.json`. Preview: `web/index.html#/puppet/lincoln`.

## Next: every pose

`POSES.md` lists every pose he is ever in (28), which in-betweens need
drawing (shape changes only: blinks, looks, mouths, hand grips), the pieces
that adds up to, and the ChatGPT prompts for the pose and parts sheets.

## Gaps

- The hands that hold a cigar (87, 91, 94, 97) are not his; leave them out.
- Heads 11 (nearly front-on) and 12 (facing the other way) are not used.
- The cards have a red back, not Death's; hide them.
