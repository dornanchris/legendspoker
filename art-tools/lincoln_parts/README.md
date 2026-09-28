# Lincoln's parts

Abraham Lincoln's puppet kit, cut with `split_parts.py` from the sheets made
with `CHARACTER-ART-PROMPTS.md`, the same way as FDR's (see
`art-tools/fdr_parts/README.md`). Every folder has the pieces, a numbered
`_contact_sheet.png`, and `parts.json` with each piece's position on its
source sheet and a `label` saying what it is.

| Folder | Pieces | What |
|---|---|---|
| `lincoln_face` | 52 | Blank head (hair and beard painted on), hair, ears, 8 brows, 16 eyes, noses, 14 mouth patches |
| `lincoln_body` | 7 | Torso with no arms, upper arms, arms lying on the table, forearms raised |
| `lincoln_hands` | 12 | Card actions, each with its cuff: peek, check, push chips, all in, fold, rake, fist, turn over, and four more |
| `lincoln_hands_own` | 12 | His tells and idles: hands folded, stroking his beard, rubbing his eyes, smoothing the hat brim, and gestures |
| `lincoln_hats` | 8 | The stovepipe hat from eight angles |
| `lincoln_rig` | 16 | Pieces cleaned up for the puppet (below) |

## The puppet

`art-tools/lincoln_layout.json` is his rest pose: arms on the felt, hands
flat, the stovepipe hat standing on the table beside him. We only ever see
him from the table up, so the hat is on the felt, not on his knee.
`preview.png` is that pose; `preview_expressions.png` is the same layout with
swaps switched on.

    python3 art-tools/build_puppet.py render art-tools/lincoln_layout.json -o preview.png

Slots work as for FDR: pieces sharing a `slot` are swaps for the same place,
one visible at a time, and the right eye, brow, arm and hand are the left ones
with `"flip": true`. The hands keep their drawn cuffs and cover the end of the
arm piece.

**His mouths are lower-face patches, not mouth only.** Each is the mouth with
the chin beard around it, and it lays over the beard painted on the head. For
a bearded face that is the better piece: the beard moves with the jaw. The
patches are placed bottom-centre on the beard's point, so they swap in place.

`lincoln_rig/` holds pieces cleaned up so they fit together:

- `head.png`: the blank head with its painted shirt collar and suit removed.
- `mouth_39.png` to `mouth_52.png`: the mouth patches with the light fringe
  along their straight top edge trimmed and faded, so no line shows where a
  patch meets the face.
- `table_preview.png`: the felt for the preview.

`sources/` holds the exact sheets that were cut. `lincoln_hats.png` leaves out
two hats that were drawn behind a strip of table (made for the old
hat-on-his-knee idea).

Not used: the back of his head, six of the seven noses, the steepled hands
(not asked for). His idle "crosses one long leg over the other" happens below
the table, so it can only ever be a shift of the shoulders.
