# Odysseus's parts

The Athens table's champion and late arrival: he takes whichever chair is
empty, drawn facing the viewer's right and mirrored by the stage when that
chair is on the right. Drawn from the prompts in `POSES.md`; the sources are
in `sources/`: his character sheet, four pose sheets and his face sheet.
ChatGPT offered two takes of sheets B and D: the second of each is used (the
ring on his right hand in the door pose; the raised hands carry the ring);
the others are `poses_b_alt.png` and `poses_d_alt.png`.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way the rest of
Athens is: the rest pose (A1, hands apart, the ring on his right hand) with
the master head and its face layers, and every other pose a whole-figure
frame with its own drawn head, placed (`reg`) by the apex of its drawn rail.

    python3 art-tools/cut_sheet.py art-tools/odysseus_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/odysseus_parts/pose_rig.json
    python3 art-tools/web_half.py odysseus

- The stretch's fist reaches into the lean-back's cell on sheet C, and that
  cell's cloak into the stretch's: both frames keep only their largest piece
  (`biggest`).
- **Face** (`face.json`, `odysseus_face/`): eyes half, closed, viewer, down,
  side, wink; brows raised, together; mouths rest, ah, ee, oh, oo, m, f, l,
  grin (sly), rueful, smile; heads 21 (toward the door) and 22 (toward the
  viewer). The patches were drawn a little small (fits about 0.75).
- **Chips** drawn in call, bet, all in and collect are kept whole (`props`).

**Clips** (`web/art/odysseus/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/odysseus`): check, peek, call, bet, fold, all in,
show, collect; tells `twist` (bluffing) beside `admire`, `door` (weak)
beside `exits`, `lean_back` (strong) beside `stretch`; idles `wring`,
`scar`, `smile`, `look_at_you`; beats `talk`, `big_bet`, `lost_pot`
(fair enough), `won_pot` (a wink), `arrive` (soaking wet, apologising:
played as he sits down), `knocked_out` (the cap set straight for the road
home). His tells and idles are cued by their words (`cues`).
