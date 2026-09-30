# John F. Kennedy's parts

Cut with `split_parts.py` from one sheet (`sources/jfk_sheet.png`), in
Lincoln's flat cartoon style: navy suit, sunglasses, cigarette. `jfk/` holds every piece, a numbered
`_contact_sheet.png` and `parts.json` with a label on each.

The puppet is built by `art-tools/seat_puppet.py` from `seat.json`:
head 9 (turned right; 7 and 8 are the same with sunglasses), torso 13, the near arm bent across and the far forearm behind, hands on the
felt toward the table's centre, facing right (flipped for the table's right).
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
