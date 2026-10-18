# Scipio's parts

Rome's seat 4 (drawn facing the viewer's right; the game mirrors him to face
the table's centre). Style-locked sheets in `sources/`: his character sheet,
pose sheets A-D and his face sheet. `POSES.md` has the prompts.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`, the way Arthur is:

    python3 art-tools/cut_sheet.py art-tools/scipio_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/scipio_parts/pose_rig.json
    python3 art-tools/scipio_parts/clips.py
    python3 art-tools/web_half.py scipio

- **Master head:** face piece 01, placed on the rest head at scale 0.57
  (`place`, found by `art-tools/build/fit_master.py`), its own cloak and
  collar cut away (`keep_poly`), the rest pose's head cut out inside
  `head_poly`. Piece 16 is the head turned to the viewer.
- **Face** (`face.json`): eyes half 2, closed 3, down 5, viewer 6, side 7,
  raised 8, narrow 9 (each piece carries its brows: there are no separate
  brow pieces; 4 is a second "viewer" and unused); mouths rest 10, ah 11,
  ee 12, oh 13, oo 14, m 15, f 17, l 18, smile 19, set 20.
- **The ivory elephant** stands by his right hand and is part of that
  forearm's piece in the rest pose; every other pose draws it itself.
- **The drawn rail is gold-orange, and so is his skin.** `rail_orange` takes
  thresholds here (`{"red": 120, "blue": 24}`: the rail is almost blue-free,
  skin is not), and `rail_band` is narrow ([14, 42]) so the gold bracers,
  which cross the rail, are not taken for it. Where a bracer touches the
  rail, a thin strip of rail stays (bet, elephant_aside, won_pot, heads_up):
  it lies at the table line and reads as the table's rim.
- **Knocked out** is drawn standing: placed 16 px lower than its felt says
  (`reg`) so his waist reaches the table line, and cut below it (`poly`).

**Clips** (`web/art/scipio/anim.json`, 24, each ending at rest): check,
peek, call, bet, fold, all in, show, collect; tells `elephant_aside`
(strong) beside `tap_trunk`, `look_up` (bluffing) beside `study`,
`elephant_door` (weak) beside `ranks`; idles `cloak`, `appraise`, `chin`,
`look_at_you`; beats talk, big bet, lost pot, won pot, heads up, knocked
out. Every pose but rest is a whole-figure frame with its own drawn head.

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py scipio`; frames `win_big` (E2) and `lose_big` (E3), clips from `art-tools/build/reactions.py scipio`. Then run `art-tools/scipio_parts/rail_e.py` (after pose_rig.py, before web_half.py):

- `keep_white` (pose_rig.json) keeps his teeth and the elephant's cream saddle-cloth, which the build took for white background caught inside the figure.
- The sheet's drawn table edge sits just under his table line, and whole-figure frames are drawn again over the table: the frames' `except` boxes cut it either side of the elephant, and `rail_e.py` clears it between the legs and under the belly, never inside the elephant's outline (the hull of its ivory pieces) above the belly line, so the gold-edged saddle-cloth stays.
