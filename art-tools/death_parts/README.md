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

`art-tools/death_layout.json` is his rest pose: forearms on the felt, bone
hands meeting in the middle. `preview.png` is that pose. Every arm piece sits
in the `arm_l` / `arm_r` slots as a swap; the right arm is the left with
`"flip": true`. The arm swaps are parked at the rest position and need placing
per deal (toward each seat, the board, and you).

    python3 art-tools/build_puppet.py render art-tools/death_layout.json -o preview.png

## Gaps

- **No deck.** Nothing on the sheet holds cards: he needs a hand holding the
  deck, the riffle-shuffle (both hands), a card pinched ready to deal, and the
  deck itself. The game flies cards out of his hands, so these matter most.
- Arms reaching toward the far left and far right seats are few; most reach
  down and to one side.
- Keep out of the game: glowing eyes, angry or surprised faces (he has no
  tells), the scythe, hourglass and book from the earlier sheets.
