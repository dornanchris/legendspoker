# John F. Kennedy's parts

**The redraw is built** (`#/puppet/jfk`, 25 clips): `POSES.md` (from
`poses_spec.json`), the six sheets in `sources/` (`jfk_sheet.png` the new
character sheet), built by `art-tools/pose_rig.py` the way Van Helsing is:

    python3 art-tools/cut_sheet.py art-tools/jfk_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/jfk_parts jfk 320
    python3 art-tools/build/pose_boxes.py art-tools/jfk_parts
    python3 art-tools/build/corner_regs.py art-tools/jfk_parts
    python3 art-tools/build/rig_from_spec.py art-tools/jfk_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/jfk_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py jfk
    python3 art-tools/jfk_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py jfk

- **The master is the rest pose's own head** (`jfk_face/jfk_master.png`).
- **Face** (`face.json`): eyes half 2, closed 3, viewer 4, down 5, up 6,
  narrow 7; mouths rest 10, ah 11, ee 12, oh 13, oo 14, m 15, f 16, l 18,
  grin 19 (his small win), half_smile 20. Brows 8-9, head 1 and the front
  head 17 are unused.
- **The coconut shell** is a props box in the near forearm's piece and every
  frame, cut tight (the drawn rail beside it stays out). In `tap_shell` (C3)
  the sheet drew it further right, under his finger, so that frame has its
  own box and the shell moves for the length of the tap.
- `back_strip` 6 clears a hairline left at the cells' left edge.
- He shrinks a little in `rock_back` (B4 was drawn smaller): it reads as
  leaning back, so it is kept.

**Clips** (`web/art/jfk/anim.json`): check, peek, call, bet, fold, all in,
show, hands empty; tells `rock_back` (strong) beside `hair`, `tie` (bluffing)
beside `chop`, `back` (weak) beside `tap_shell`; idle `portraits`; beats
talk, big bet, lost pot, `lose_big` (a hand over his eyes), `win_big` (fists
raised), heads up, laugh, `grin`, and `arrive` (one hand still in his
jacket pocket), played as he walks in. Fidgets: grin, look at you.

Everything below is the OLD one-face seat_puppet kit (`jfk/`,
`jfk_rig/cuffs.json`, `sources/jfk_sheet_old.png`), kept as a record; the
game no longer uses it, and `art-tools/jfk_layout.json` is now pose_rig's.

Cut with `split_parts.py` from one sheet (`sources/jfk_sheet_old.png`), in
Lincoln's flat cartoon style: navy suit, sunglasses, cigarette. `jfk/` holds every piece, a numbered
`_contact_sheet.png` and `parts.json` with a label on each.

The puppet is built by `art-tools/seat_puppet.py` from `seat.json`:
head 9 (turned right; 7 and 8 are the same with sunglasses), torso 13, both forearms starting at the elbows (the torso's sides, at the table's
edge) and lying on the felt, hands toward the table's centre, facing right (flipped for the table's right).
The head is drawn in front and the torso again over it from the collar down
(`"collar"`), so the collar wraps round the neck painted on the head.
`jfk_rig/` holds the sleeves with their cuffs trimmed; each hand's own cuff
finishes its sleeve. `preview.png` is the rest pose.

    python3 art-tools/seat_puppet.py art-tools/jfk_parts/seat.json

**Not at any table.** Built for a possible hidden event (the owner's idea); see CLAUDE.md. Historically he smoked small cigars, not cigarettes.

**Gap: expressions at three-quarter.** The sheet's expression heads (and its
eyes, brows, noses and mouths) are front-on, and its turned heads are near
profile with one expression. So the puppet has one face. A Lincoln-style
sheet (the same four finished heads, three-quarter, facing both ways) would
give it a set.

## Three-quarter expression sheet

Attach this sheet (`sources/jfk_sheet_old.png`) and Lincoln's
(`art-tools/lincoln_parts/sources/lincoln_sheet.png`):

```
Character sheet for 2D animation rigging: John F. Kennedy. Attach two images: his own parts sheet (match it exactly: face, hair, clothes, colours, line weight and the flat cartoon style) and Lincoln's sheet (copy only its layout and its head angle).

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, the same as the heads on the Lincoln sheet. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile, NOT near-profile.

Draw two matching sets, one facing the viewer's right and its mirror image facing the viewer's left, as the Lincoln sheet does. For each set:
- Finished heads, each with its neck and the top of its collar, all at the same size and angle: neutral; talking, mouth open mid-word; a broad grin; a frown; the neutral head wearing his sunglasses; a small cigar in the corner of his mouth (a cigar, not a cigarette)
- One torso at the same angle: no head, cut off straight below the waist, the upper arms hanging at the sides down to the elbows; NO forearms, NO hands
- Two forearms lying on a table, pointing toward its centre (down, and away to the side the heads face), open at the elbow end, each with its cuff
```
