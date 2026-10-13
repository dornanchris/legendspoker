# Blackbeard's parts

The Pirate Cove's champion, seat 4 (drawn facing the viewer's right, mirrored
at the table, his back to the rock wall). Drawn from the prompts in
`POSES.md`; the sources are in `sources/`: his character sheet, four pose
sheets and his face sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Athens is: the
rest pose (A1) with the master head and its face layers, and every other pose
a whole-figure frame with its own drawn head.

    python3 art-tools/cut_sheet.py art-tools/blackbeard_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/blackbeard_parts/pose_rig.json
    python3 art-tools/web_half.py blackbeard

- **Placement**: his drawings fill their cells and hide most of the rail, so
  neither the rail curve nor the felt match placed them; each pose is placed
  by the bottom-left corner of its drawn felt panel (the cell's own edge).
- **Face** (`face.json`, `blackbeard_face/`): eyes half, closed, viewer, down,
  side, narrow; brows raised, down; mouths rest, ah, ee, oh, oo, m, f, l,
  grin, roar, sly (each the whole lower beard); heads 21 (the matches
  smouldering, thick smoke) and 22 (toward the viewer). The beard patches
  are too alike to fit by matching (oh, oo and roar landed on his hat), so
  every mouth is placed where the rest mouth fitted, centred
  (`blackbeard_rig/face/fits.json`, edited by hand; delete it to refit).
- His coat is the rail's brown: `wood_rows_only`, `rail_band`, `no_peel`.
  Chips and the pistol on the felt are kept whole (`props`). Big bet, won pot
  and heads-up cut away a neighbouring cell's fist (`except`).

**Clips** (`web/art/blackbeard/anim.json`, 25, each ending at rest; preview
`web/index.html#/puppet/blackbeard`): check, peek, call, bet (slammed), fold,
all in, show, collect; tells `stroke` (strong) beside `ribbon`, `still`
(bluffing) beside `stare`, `smoulder` (tilted) beside `smoke`; idles
`pistol` (set down, then taken up: `pistol_down` and `pistol_up` alone too),
`laugh`, `look_at_you`; beats `talk`, `big_bet`, `lost_pot` (a roar),
`won_pot` (arms wide), `heads_up`, `knocked_out` (a mocking bow). His tells
and idles are cued by their words (`cues`).
