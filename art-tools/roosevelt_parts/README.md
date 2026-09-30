# Theodore Roosevelt's parts

Cut with `split_parts.py` from one sheet (`sources/roosevelt_sheet.png`), in
Lincoln's flat cartoon style: Rough Rider khaki, campaign hat and spectacles. `roosevelt/` holds every piece, a numbered
`_contact_sheet.png` and `parts.json` with a label on each.

The puppet is built by `art-tools/seat_puppet.py` from `seat.json`:
head 7 (turned right, near profile), torso 13, both forearms starting at the elbows (the torso's sides, at the table's
edge) and lying on the felt, hands toward the table's centre, facing right (flipped for the table's right).
The head is drawn in front and the torso again over it from the collar down
(`"collar"`), so the collar wraps round the neck painted on the head.
`roosevelt_rig/` holds the sleeves with their cuffs trimmed; each hand's own cuff
finishes its sleeve. `preview.png` is the rest pose.

    python3 art-tools/seat_puppet.py art-tools/roosevelt_parts/seat.json

The sleeves end in a dark band, not a white cuff, so the tool trims the band and opening ("cuff": "band").

**Gap: expressions at three-quarter.** The sheet's expression heads (and its
eyes, brows, noses and mouths) are front-on, and its turned heads are near
profile with one expression. So the puppet has one face. A Lincoln-style
sheet (the same four finished heads, three-quarter, facing both ways) would
give it a set.
