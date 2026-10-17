# The Headless Horseman's kit

Transylvania's seat 4, drawn facing right and mirrored. Gothic sheets in
`sources/` (his own approved character sheet is the style image for the rest
of the cast); the first, flat-cartoon sheet is in `sources/rejected/`.

Built the way the Wolf Man is, from a short `rig_spec.json`:

    python3 art-tools/cut_sheet.py art-tools/headless_horseman_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/headless_horseman_parts headless_horseman 320
    python3 art-tools/build/pose_boxes.py art-tools/headless_horseman_parts
    (then split B1 and B4 by hand in poses_found.json, see below)
    python3 art-tools/build/corner_regs.py art-tools/headless_horseman_parts
    python3 art-tools/headless_horseman_parts/glow.py
    python3 art-tools/build/rig_from_spec.py art-tools/headless_horseman_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/headless_horseman_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py headless_horseman
    python3 art-tools/headless_horseman_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py headless_horseman; python3 art-tools/build/portraits.py

- No head and no face: the master is the rest pose's own pumpkin, and the
  candle's light is his face. He never blinks or glances (`turn` is his look).
  Speech brightens his OWN carving's glow, three steps (`glow.py`, from the
  master): the face sheet's glowing mouths are carved a little differently,
  so swapping them changed the teeth as he talked. The face sheet is unused.
- The bright candle's halo (B4) joins B1's cell on the sheet, so pose_boxes
  merged them: `poses_found.json` has B1 and B4 split at the cell line by
  hand. The halo itself is turned into see-through light by pose_rig's new
  frame option `halo` (the colour laid over white, feathered at its edge).
- `wood_rows_only`, no `drop_wood`: the pumpkin's brown-orange is the wood's
  colour, and whole-shape wood removal ate the pumpkins. `keep_white` on the
  pumpkin: the hottest spot of a bright eye is the paper's white.
- `show` and `win_big` reached into the next cell: `biggest`.
- `big_bet` (D2) is drawn more front-on than the rest; placed by the felt,
  his body sits a little left of the chair for that beat.
- Tells: `brighter` (strong) beside `settle`, `gutter` (bluffing) beside
  `leaves`, `drum` (weak) beside `sword`; idle `turn`; fidgets `cloak`,
  `still`. The candle is steady in every other pose, and dim only in
  `lost_pot`. No `arrive`: he is seated from the first hand.
