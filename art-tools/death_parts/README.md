# Death's parts

Death, the dealer, cut with `split_parts.py` from one AI-generated sheet
(`sources/death_sheet.png`). He is the one figure drawn front-on: he deals
from the far side of every table, facing you. Black hooded robe with a purple
lining and a gold skull brooch (the owner's call; his character file matches).

`death/` holds the 34 pieces, a numbered `_contact_sheet.png`, and `parts.json`
with a `label` on every piece.

| Pieces | What |
|---|---|
| 1-6 | Front-on heads: neutral and a talking set |
| 7-10 | Three-quarter heads (two with glowing eyes) and the hood from behind: not used |
| 11-15 | Torsos: 12 is the one used (front, no arms); 11 has an arm painted on; 13-15 are side and back views |
| 16-34 | Whole arms, sleeve to fingertips, reaching in different directions: the dealing swaps |

## The puppet

`art-tools/death_layout.json` is his rest pose: sleeves out from under the
cape, cuffs resting on the table's edge, bone hands lying apart on the felt
with room for the deck between them. `preview.png` is that pose.

The layer order is what makes him work. The arms sit UNDER the torso, so the
cape's ragged hem falls over the tops of the sleeves; they are marked
`"on_table": true`, so below the layout's `table_line` they are drawn again
over the table and the forearms and hands lie on the felt. (His first layout
put the arms on top of the cape at waist height, and the sleeves bulged out
of his hips.) Every other arm piece sits in the `arm_l` / `arm_r` slots as a
swap for dealing; the right arm is the left with `"flip": true`.

    python3 art-tools/build_puppet.py render art-tools/death_layout.json -o preview.png

## Gaps

- **No deck.** Nothing on the sheet holds cards: he needs a hand holding the
  deck, the riffle-shuffle (both hands), a card pinched ready to deal, and the
  deck itself. The game flies cards out of his hands, so these matter most.
- Arms reaching toward the far left and far right seats are few; most reach
  down and to one side.
- Keep out of the game: glowing eyes, angry or surprised faces (he has no
  tells), the scythe, hourglass and book from the earlier sheets.
