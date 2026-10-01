# Lincoln's parts

Cut from two sheets drawn to the same layout: his three-quarter expression
sheet with the hat on (`sources/lincoln_sheet.png`, into `lincoln/`) and the
same heads without it (`sources/lincoln_bare_sheet.png`, into
`lincoln_bare/`). Each sheet has four finished heads facing the viewer's
right and four mirrored (plus one front-on, unused), and its own hair, chin
beard, face parts, torsos, arms and hands. Each folder has a numbered
`_contact_sheet.png` and a `parts.json` with a label on every piece.

    python3 art-tools/cut_sheet.py art-tools/lincoln_parts/cut.json
    python3 art-tools/cut_sheet.py art-tools/lincoln_parts/cut_bare.json

(The `cut` files separate the torsos, hair and arms that touched.)

These replace his first three-quarter kit, whose heads were turned nearly to
profile; git history keeps it.

## The puppet

Built by `art-tools/seat_puppet.py` from `seat.json`:

    python3 art-tools/seat_puppet.py art-tools/lincoln_parts/seat.json

- **Heads** (slot `head`): hat on, 1 neutral (rest), 2 a slight smile,
  3 smiling and talking, 4 laughing; then the same four without the hat,
  from `lincoln_bare/`. Each swap carries its place by the rest head's own
  pixels (`[piece, dx, dy, scale]`): the bare heads were drawn about 8%
  larger, and were matched to the hatted ones by their faces.
- **The hat tip.** `"hat": "from_head"` lifts the hat off head 1 into
  `lincoln_rig/hat.png`, a hidden part (slot `hat`) exactly where it sits. A
  tip is a bare head plus that hat, raised and tilted: `preview_faces.png`
  shows the four hatted heads, then the four bare ones mid-tip.
- **Torso** 64; **forearms** 74 for both, turned toward the table's centre,
  the inside of the sleeve cut off the elbow end; hands 83 (far, flat) and
  92 (near, relaxed). Swaps: a card, cards fanned, a glass, and from
  `lincoln_bare/` a pointing hand and a fist.

`preview.png` is the rest pose. He wears the hat at all times except the tip.

## Gaps

- The hatted sheet borrowed FDR's props (hands with a cigarette holder, two
  loose holders). Not his; leave them out. The bare sheet has his own hands.
- The loose hats on the sheet (17, 56) are drawn at another angle from the
  hat on the heads; the lifted one (`hat.png`) is used instead.
- The cards have a red back, not Death's; hide them.
