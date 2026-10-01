# Franklin D. Roosevelt's parts

Cut from his three-quarter expression sheet (`sources/fdr_sheet.png`), drawn
to Lincoln's layout: five finished heads facing the viewer's right and the
same five mirrored, pince-nez on a cord, the cigarette holder, torsos, arms
and hands. `fdr/` holds every piece, a numbered `_contact_sheet.png` and
`parts.json` with a label on each (and which way it faces).

    python3 art-tools/cut_sheet.py art-tools/fdr_parts/cut.json

`cut.json` holds the fixes this sheet needed: two pairs of torsos and a pair
of heads touched, so they are separated where they met; and in both head
rows the smiling head's holder reaches across into the laughing head beside
it, so the holder goes to the smiling head and the laughing head is filled
in under it (a faint smudge by the ear, invisible at table size).

A second FDR sheet came later in the same layout as the others; this one is
kept, as it has the frown and that one does not (neither has the cape).

## The puppet

Built by `art-tools/seat_puppet.py` from `seat.json`:

    python3 art-tools/seat_puppet.py art-tools/fdr_parts/seat.json

- **Heads** (slot `head`): 2, holder in his teeth, about level (rest); swaps
  1 neutral without it, 3 a broad smile with the holder cocked upward,
  4 laughing, 5 frown. Mirrors are 6-10. `"head_align": "back"` lines them
  up by the back of the head, since the holder makes some boxes wider.
- **The collar.** The heads were drawn with the shoulders of the suit under
  them, which stuck out past the torso's collar. `"head_clothes"` cuts that
  cloth off (into `fdr_rig/head_N.png`) and keeps the neck, shirt collar,
  tie knot and the pince-nez cord; the torso is then drawn again over it
  from the collar down, as before.
- **Torso** 63 (three-quarter, waistcoat), pushed low so the cuffs drawn at
  its bottom stay under the table.
- **Forearms** 73 for both, turned to lie on the felt toward the table's
  centre (the sheet drew them pointing away). They were drawn with the
  inside of the sleeve showing at the elbow, an orange oval that sat on the
  felt; `"elbow_cap"` cuts it off. Hands 82 (far, flat) and 91 (near,
  relaxed); swaps: the holder held up, tapping ash, gripped, a card, a few
  cards fanned, a whisky glass.

`preview.png` is the rest pose; `preview_faces.png` shows the five heads on
it in turn.

## Gaps

- **No naval cape.** His character file makes the cape his silhouette; this
  sheet put him in a pinstripe suit without it. The prompt to get it back is
  in `CHARACTER-ART-PROMPTS.md` (FDR, "Three-quarter expression sheet").
- **The holder is thin.** It is his tell surface ("tilts his cigarette holder
  upward"), and at table size it is a line about 25 pixels long. Drawing the
  separate holder (97) over head 1, longer and thicker, would let its angle
  move freely and read from across the table.
- Holder up and the broad smile come in one head (3), so the two tells
  share a face until the holder is its own layer.
- The cards in his hands have a red back, not Death's; the game draws the
  cards, so hide them.
- The whisky glass was not asked for; a prop if wanted.
