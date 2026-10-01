# Theodore Roosevelt's parts

Cut from his three-quarter expression sheet (`sources/roosevelt_sheet.png`),
drawn to Lincoln's layout: four finished heads facing the viewer's right and
four mirrored (plus one front-on, unused), pince-nez on a cord, the heavy
moustache, a brown three-piece suit with a watch chain, torsos, arms and
hands. `roosevelt/` holds every piece, a numbered `_contact_sheet.png` and
`parts.json` with a label on each.

    python3 art-tools/cut_sheet.py art-tools/roosevelt_parts/cut.json

(`cut.json` separates the torso row, which came out as one piece of eight,
and the pince-nez from the hat they touched.)

This sheet changed his clothes: the first one had him in Rough Rider khaki,
this one in a brown suit, which is what his parts list asks for.

## The puppet

Built by `art-tools/seat_puppet.py` from `seat.json`:

    python3 art-tools/seat_puppet.py art-tools/roosevelt_parts/seat.json

- **Heads** (slot `head`): 1 neutral, a scowl (rest); swap 4, the big grin,
  laughing. `preview_faces.png` shows them on the puppet.
- **The collar.** `"head_clothes": "dark"` cuts the brown suit painted under
  the heads; the torso's collar is drawn again over the neck.
- **Torso** 58, **forearms** 68, hands 77 (far) and 87 (near), as for
  Washington and FDR (the same layout).

`preview.png` is the rest pose.

## Gaps

- **The cigar.** Heads 2 and 3 (and 6-8) have a cigar in his teeth. Roosevelt
  did not smoke, and a thing jutting from the mouth is FDR's silhouette at
  this table, so the puppet leaves them out. That leaves him two faces; the
  grin is the one that matters (it must read small).
- Not drawn: a frown, the suspicious squint, the head with the spectacles
  off (for polishing them). Ask for those three, three-quarter, no cigar.
- FDR's props came along here too: hands with a thin stick, a fist round a
  short one, a cane. Leave them out.
- The campaign hat (15, 52) is drawn over a lower face; not asked for.
- The cards have a red back, not Death's; hide them.
