# The Cheshire Cat's parts

Baker Street's seat 3 (drawn facing the viewer's right; the game mirrors him
to face the table's centre, so his tail is on the outside). He took Alice's
chair (the owner's call). **Redrawn gothic** (the owner: the flat cartoon
"looks childish ... since Cheshire"), the Wolf Man's way: the Horseman's sheet
was the style image. His first sheets, in Cerberus's style, are in
`sources/old_style/`. `POSES.md` has the prompts.

## The game's puppet

Built from a short `rig_spec.json` (the Wolf Man's way):

    python3 art-tools/cut_sheet.py art-tools/cheshire_cat_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/cheshire_cat_parts cheshire_cat 280
    python3 art-tools/build/pose_boxes.py art-tools/cheshire_cat_parts
    python3 art-tools/build/corner_regs.py art-tools/cheshire_cat_parts
    python3 art-tools/build/rig_from_spec.py art-tools/cheshire_cat_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/cheshire_cat_parts/pose_rig.json
    python3 art-tools/cheshire_cat_parts/grin.py
    python3 art-tools/build/frames_sheet.py cheshire_cat
    python3 art-tools/cheshire_cat_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py cheshire_cat; python3 art-tools/build/portraits.py

- **The master is the rest pose's own head**, kept clear of the tail
  (`keep_poly` from x 170). His front legs are the "arms" (rest only); every
  other pose is a whole-figure frame with its own drawn head.
- **Face** (`face.json`): eyes half 2, closed 3, viewer 4, down 5, side 6,
  narrow 7, wide 8, wink 9 (10 repeats it: no far-eye wink was drawn);
  mouths rest 11, ah 12, ee 13, oh 14, oo 15, m 16, f 17, l 18, enormous 19,
  lopsided 20. The skin match is OFF (`match: false`): it samples skin as
  red-dominant and on his fur took the pale rim light, washing the patches
  out. Fits 07 and 09 failed and are set by hand in
  `cheshire_cat_rig/face/fits.json` (width and bottom edge matched to the
  other eye pieces).
- **He talks through the grin**: the speech map uses only ah, ee and the
  closed grin (the round mouths would drop the grin, which is the character).
- **His stripes are the wood's colour.** `drop_wood` ate them (holes in the
  big win), so `wood_rows_only`; and the rail filters took his legs where they
  lie on the felt, so the "prop" box is the felt BELOW the drawn rail's curve
  (felt is still cleared inside it), in every frame and in both resting legs
  (their whole outline). Not a prop: his paws are empty.
- **Vanishing** is drawn as plain white, which the frames clear: the fade (B4)
  loses his belly, the drift (B5) shows a gap at the neck. The grin alone (C5)
  was drawn larger and centred: placed by hand (`reg` [0.7, 171.5, 135.6])
  onto his mouth at rest and cut to the grin (`poly`), then turned to his
  face by `grin.py` (the owner: his face is at an angle, the grin was level):
  warped onto the fade frame's own mouth line, corners and lowest point, from
  the level copy kept in `sources/grin_only_flat.png`; the big win cuts the
  drawn rail below him (`except`), and `call` the strip between his legs.
- **Left as is (FIX-LATER.md):** where a leg crosses the drawn rail, a few
  frames keep small bites in the far leg or a thin sliver of rail (rim light
  and rail are the same orange). A few pixels at table size, for about a
  second.

**Clips** (`web/art/cheshire_cat/anim.json`, 24 with `win_small`): check,
peek, call, bet, fold, all in, show; tells `fade` (strong: tail and body go,
then only the grin, then he comes back grin first) beside `drift`, `blink`
(weak: the wink, then a whole blink) beside `wash`, `twitch` (tilted: the
tail tip) beside `sway`; idles `grin_dealer`, `knowing`, `look_at_you`; beats
talk, big bet, lost pot, the big win and the crushing loss (B3, D4), heads
up, knocked out (half vanished, a wave).
