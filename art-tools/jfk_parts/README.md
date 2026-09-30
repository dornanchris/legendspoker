# John F. Kennedy's parts

Cut with `split_parts.py` from one sheet (`sources/jfk_sheet.png`), in
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

Attach this sheet (`sources/jfk_sheet.png`) and Lincoln's
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
