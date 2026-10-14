# The Cheshire Cat's parts

Baker Street's seat 3 (drawn facing the viewer's right; the game mirrors him
to face the table's centre, so his tail is on the outside). He took Alice's
chair (the owner's call). Drawn in Cerberus's animal style: Cerberus's pose
sheet A was the style image (`poses_spec.json`: `style_ref`, `style_sheet`),
after a first sheet against Washington's came out as furry illustration.
`POSES.md` has the prompts; the sheets are in `sources/`.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`, the way Cerberus is:

    python3 art-tools/cut_sheet.py art-tools/cheshire_cat_parts/cut_face.json
    python3 art-tools/build/pose_boxes.py art-tools/cheshire_cat_parts
    python3 art-tools/build/corner_regs.py art-tools/cheshire_cat_parts
    python3 art-tools/pose_rig.py art-tools/cheshire_cat_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py cheshire_cat
    python3 art-tools/cheshire_cat_parts/clips.py
    python3 art-tools/web_half.py cheshire_cat

- **The master is the rest pose's own head** (`cheshire_cat_face/cheshire_cat_master.png`,
  rows 0-300 of A1), kept to the head by `keep_poly` so the tail is not drawn
  twice. His front legs are the "arms" (rest only); every other pose is a
  whole-figure frame with its own drawn head.
- **Face** (`face.json`): eyes half 2, closed 3, down 4, side 5, narrow 6,
  wide 7, viewer 8, wink 9 (the near eye: the sheet drew no far-eye wink);
  mouths rest 10, ah 11, ee 12, oh 13, oo 14, m 15 (also f), l 16, enormous
  17, lopsided 18. The auto-fit put half the mouths at half size: every mouth
  is fitted by hand at 0.95, placed by its nose on the master's nose
  (`cheshire_cat_rig/face/fits.json`; m sits a pixel left, or it overruns the
  master's right edge and the build fails). The eye patches are cut flat just
  under the eyes, so the eyes take a thin edge (`outline` 2, `fade` 1), or
  the master's yellow eyes show through a closed lid.
- **Vanishing** is drawn as plain white, so the frames cut it cleanly. The
  fade frame (B4) loses a stray line of the drawn rail between the floating
  chest and the paws (`except`). The grin alone (C5) was drawn centred in its
  cell and larger: it is placed by hand (`reg` [0.86, 117, 129]) exactly where
  his mouth is at rest, and cut to the grin (`poly`).
- **The rail** is a saturated orange with no blue; his nose and ears are
  orange too, but bluer: `rail_blue` 20, `rail_orange` `{"red": 150, "blue": 30}`.
  The chips are `props` boxes kept below the rail line. The twitch frame keeps
  only its largest piece (`biggest`: the next cell's tail reached in).

**Clips** (`web/art/cheshire_cat/anim.json`, 23, each ending at rest): check,
peek, call, bet, fold, all in, show, collect; tells `fade` (strong: tail and
body go, then only the grin, then he comes back grin first) beside `drift`
(his head off his shoulders), `blink` (weak: the wink, then a whole blink)
beside `wash`, `twitch` (tilted: the tail tip) beside `sway`; idles
`grin_dealer`, `knowing`, `look_at_you`; beats talk, big bet, lost pot, won
pot, heads up, knocked out (half vanished, a wave).
