# George Washington's parts

Cut from his three-quarter expression sheet (`sources/washington_sheet.png`),
drawn to Lincoln's layout: four finished heads facing the viewer's right and
four mirrored (plus one front-on, unused), his own powdered hair, the blue
coat with gold braid and epaulettes, buff waistcoat and lace jabot, torsos,
arms with lace cuffs, and hands. `washington/` holds every piece, a numbered
`_contact_sheet.png` and `parts.json` with a label on each.

    python3 art-tools/cut_sheet.py art-tools/washington_parts/cut.json

(`cut.json` separates two pairs of torsos that touched.)

## The puppet

Built by `art-tools/seat_puppet.py` from `seat.json`:

    python3 art-tools/seat_puppet.py art-tools/washington_parts/seat.json

- **Heads** (slot `head`): 1 neutral, mouth set firm (rest); swaps 2 a slight
  smile, 3 smiling and talking, 4 talking, brows down. `preview_faces.png`
  shows them on the puppet.
- **The collar.** The heads were drawn with the coat's collar and braid under
  them. `"head_clothes": "piped"` cuts the blue cloth and its gold braid off
  (into `washington_rig/head_*.png`), keeping the neck and the stock; the
  head sits low (`neck` 150) so the chin rests on the torso's own stock,
  which is drawn again over it from just below the top (`"collar": 0.06`).
- **Torso** 58, **forearms** 68 for both (turned toward the table's centre,
  the inside of the sleeve cut off the elbow end), hands 77 (far, flat) and
  87 (near, relaxed); swaps: a card, a few cards fanned, a glass.

`preview.png` is the rest pose.

## Gaps

- The sheet borrowed FDR's props: hands holding a thin stick like his
  cigarette holder, a fist round a short one, and a walking cane. None is
  his; leave them out.
- A tricorn hat came with it (14, 52), drawn over a lower face. Not asked
  for; his file has him bareheaded.
- Small dark specks of the old collar can sit by the jaw on some heads.
- The cards in his hands have a red back, not Death's; hide them.
