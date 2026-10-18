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

## The parts-sheet puppet (superseded for the game; in git history)

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

## The game's puppet: from the pose drawings

**Built by `art-tools/pose_rig.py` from `pose_rig.json`** from his four pose
sheets (`sources/poses_a.png` .. `poses_d.png`) and his face sheet
(`sources/face_overlays.png`, cut by `cut_face.json` into `death_face/`).
It now writes `art-tools/death_layout.json` (the old parts-sheet layout is in
git history).

    python3 art-tools/cut_sheet.py art-tools/death_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/death_parts/pose_rig.json

- **Rest = A1**: the hand on the left of the picture flat on the felt
  (`near`), the other on the deck (`far`; the deck is part of that piece).
  Front-on, never mirrored. Validation: 0.65% of pixels above the rail differ.
- **Every pose is a whole-figure frame** (the owner: the cut-out hands did
  not line up with his sleeves). His hands move under a robe whose folds
  change with them, so a hand cut alone never met the rest pose's sleeve.
  Each pose is now its whole drawing, placed on the rest pose by the torso
  (`way_out`, C5, by the rail), with his talking master head on it (matched
  on the brooch) and the robe filled beside its neck (`fill_shoulders`).
  The drawings' own rail is dropped (`drop_rail`, `felt_lines`); their
  cards and chips stay (the game's flights start under them).
- **Face**: the master head (piece 1) and five jaw patches (closed, parted,
  open, wide, side) as the mouth slot; a skull does not blink, so the face
  config never does. The five heads (left, right, bowed, weary, up) are
  drawn a little smaller than the master: they are scaled and placed by the
  gold brooch they all wear (`head_fit: "brooch"`), and the shoulders behind
  the master's hood are filled with robe (`fill_poly`) so a narrower head
  never shows a hole.
- `steeple` (C6) is placed by the rail and keeps its own drawn head (his
  hands hide the brooch).

**Clips** (`web/art/death/anim.json`, 26, every one ending exactly at rest;
preview `web/index.html#/puppet/death`): the deal `deal_left`, `deal_you`,
`deal_right` (the thumb drawing, then the pitch, then rest),
`burn`, `flop`, `turn`, `shuffle` (riffle twice, square), `cut`, `rake`, the
pot `push_left`, `push_you`, `push_right`; his moments `watch_that` (the
lessons), `way_out` (the uninvited guest's scene), `steeple` (heads-up, the
last card); heads `watch_left`, `watch_right`, `watch_deal`, `weary`,
`look_up`; the finale `set_aside`, `peek`, `check`, `bet`, `all_in`, `fold`.
He has no tells: nothing here is tied to cards.

Gaps: a sliver of the old hood shows at the shoulder corners behind a
swapped head (close up only); the deal clips need the game's card flight
timed to the pitch (the cards are not in the drawings).
