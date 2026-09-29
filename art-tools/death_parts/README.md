# Death's parts

Death, the dealer, cut with `split_parts.py` from one AI-generated sheet
(`sources/death_sheet.png`). He is the one figure drawn front-on: he deals
from the far side of every table, facing you. Black hooded robe with a purple
lining and a gold skull brooch (the owner's call; his character file matches).

Four folders, each with its pieces, a numbered `_contact_sheet.png` and a
`parts.json` with a `label` on every piece. Their source sheets are in
`sources/`.

| Folder | Pieces | What |
|---|---|---|
| `death` | 34 | Front-on heads (neutral and talking), torsos, and whole arms reaching in every direction |
| `death_deal` | 8 | One hand each, with its sleeve: holding the deck, thumbing off the top card, pinching a card, flicking one to you, sliding one to either side, turning one over (its face blank), resting on the deck |
| `death_shuffle` | 6 | Riffle shuffle, bridge and squaring (both hands, one piece each); cutting, spreading a ribbon, sweeping in a pile |
| `death_props` | 49 | His card back (38: the game's card back), decks, a fan, a blank face; a skull and a separate jaw (2, 10) that can sit in the empty hood (3) for a moving jaw; more arms and torsos |

Card faces are always blank: the game draws them.

## The puppet

`art-tools/death_layout.json` is his rest pose: his right hand flat on the
felt, his left resting on the deck, both sleeves coming out from under the
cape. `preview.png` is that pose; `preview_dealing.png` shows the same layout
with swaps switched on (riffle shuffle, squaring, pinching a card, dealing to
you).

The layer order is what makes him work. The arms sit UNDER the torso, so the
cape's ragged hem falls over the tops of the sleeves; they are marked
`"on_table": true`, so below the layout's `table_line` they are drawn again
over the table and the forearms and hands lie on the felt. (His first layout
put the arms on top of the cape at waist height, and the sleeves bulged out
of his hips.)

The head works the same way. On top of the cape, the hood left a tall collar
showing, so the head sat above the shoulders on a stalk; behind the cape, the
hollow collar covered the face. So the hood is drawn over the cape, low enough
to swallow the collar, and the torso is listed a second time (slot
`torso_over`) with `"clip_top"` just under the chin and a short
`"clip_feather"`, so the cape's collar, clasp chain and shoulders wrap over
the bottom of the hood with no hard edge.

Slots: `arm_l` and `arm_r` hold every single-arm piece as a swap (the left
side is the right mirrored); `hands_both` holds the two-handed pieces, and
showing one means hiding both arms. The swaps are parked at the rest
position and need placing per deal: toward each seat, the board, and you.

    python3 art-tools/build_puppet.py render art-tools/death_layout.json -o preview.png

## Gaps

- The two-handed shuffle pieces are drawn a little smaller than the arms;
  scale them up when placing.
- Keep out of the game: glowing eyes, angry or surprised faces (he has no
  tells), the scythe, hourglass and book from the earlier sheets.
