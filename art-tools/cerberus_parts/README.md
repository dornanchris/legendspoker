# Cerberus's parts

Rome's seat 3 (drawn facing the viewer's right; the game mirrors him to face
the table's centre). Style-locked sheets in `sources/`: his character sheet,
pose sheets A-D and his face sheet. The owner kept the small snakes behind
his necks, as drawn.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`, a quarter bigger as
the Cyclops and the Green Knight are (`scale` 1.25, `origin_x` 225).

    python3 art-tools/cut_sheet.py art-tools/cerberus_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/cerberus_parts/pose_rig.json
    python3 art-tools/web_half.py cerberus

- **The master is the rest pose's own three heads**
  (`cerberus_face/cerberus_master.png`, rows 0-300 of pose A1, cut with
  pose_rig's `load_pose`), not the face sheet's three-head drawing, which is
  spaced differently. So `replace_head` is off: the master sits exactly on
  the heads it was cut from, and there is no seam.
- **Face** (`face.json`, layers on the MIDDLE head only): eyes half, closed,
  viewer, down, side, narrow (pieces 2-8); muzzles rest, growl, pant, whine,
  snarl (9-13). Fitted by hand at one scale per set (eyes 0.63, muzzles 0.72:
  `cerberus_rig/face/fits.json`), baked with `match: false` (black fur: the
  skin match tinted them blue) and a thin edge for the eyes (`outline`,
  `fade`: the pieces are cut tight under the eyes). The left and right heads
  (pieces 14-21) and the front-on head (22) are unused: every head change is
  a whole-figure frame.
- **His front legs are the "arms"** (rest only); every action is a frame.
- **The drawn rail is gold-orange**, which the rail test missed:
  `rail_orange` drops it from the rest pose, his legs and the frames
  (`rail_band` [45, 90]: the knocked-out frame's whole curved rail). His
  collars are that colour too, well above the rail. Bet, won pot and all in
  keep a sliver of it beside their chips.

**Clips** (`web/art/cerberus/anim.json`, 24, each ending at rest): check,
peek, call, bet (at once: his `snap` quirk), fold, all in, show, collect;
tells `attention` (strong) beside `watch`, `yawn` (weak) beside `asleep`,
`growl` (tilted) beside `scratch`; idles `sniff`, `pant`, `stare`,
`look_at_you` (the middle head's eyes); beats `talk` (a low growl),
`big_bet`, `lost_pot`, `won_pot`, `heads_up`, `knocked_out` (pads away).
He never speaks: his lines are stage directions, so his mouth only moves in
clips.
