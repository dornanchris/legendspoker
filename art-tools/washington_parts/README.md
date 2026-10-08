# George Washington's parts

Cut from his rigging sheet (`sources/washington_sheet.png`), drawn to Lincoln's
layout: finished heads facing each way, torsos, straight forearms drawn as
tubes of sleeve, hands with their cuffs, and a row of seated reference poses.
`washington/` holds every piece, a numbered `_contact_sheet.png` and `parts.json`
with a label on each.

    python3 art-tools/cut_sheet.py art-tools/washington_parts/cut.json

(`cut.json` separates the pieces that touched.) Earlier sheets are in git
history.

## The puppet

Built by `art-tools/seat_puppet.py` from `seat.json`, in the rim pose
Lincoln's sheet introduced (see `art-tools/lincoln_parts/README.md`):
forearms along the table's edge, hands folded in front.

    python3 art-tools/seat_puppet.py art-tools/washington_parts/seat.json

- **Heads** (slot `head`): {'fdr': '1 the holder in his teeth, cocked up (rest); swaps 2 a grin around the holder, 3 talking (no holder), 4 neutral, glancing, 5 laughing, 6 laughing, head back', 'washington': '1 neutral, mouth set firm (rest); swaps 2 talking, 3 a slight, rare smile, 4 a frown, 5 jaw clenched', 'roosevelt': '1 neutral, a scowl (rest); swaps 2 the big grin, 3 talking, 4 a frown, 5 eyes narrowed, suspicious, 6 without his pince-nez (for polishing them)'}. Swaps are placed by matching their faces
  to the rest head (`"fit"`, cached in `washington_rig/fits.json`); mirrors face the
  other way and are not used (the puppet is flipped instead).
- {'fdr': 'His naval cape is back: the torso wears it, chained at the throat over the pinstripe suit. Hands: resting (rest), flat, two cards, the holder, tapping ash.', 'washington': '`"head_clothes": "piped"` trims the coat and braid painted under the heads, and the head sits low on the torso\'s stock (`neck` 150, `"collar": 0.06`). Hands: resting (rest), flat, two cards, pointing, a fist.', 'roosevelt': 'Brown three-piece suit, pince-nez on a cord, no cigar anywhere. Hands: resting (rest), flat, two cards, palm in, polishing the pince-nez with a handkerchief, holding the pince-nez.'}

`preview.png` is the rest pose; `preview_faces.png` shows every head on it.

## Gaps

- The cards have a red back, not Death's; hide them.
- A few dark specks of the trimmed collar can show at the jaw on some heads.
