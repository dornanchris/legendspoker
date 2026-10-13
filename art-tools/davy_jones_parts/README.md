# Davy Jones's parts

The Pirate Cove's seat 3 (drawn facing the viewer's right; the game mirrors
him to face the table's centre). Drawn from the prompts in `POSES.md`; the
sources are in `sources/`: his character sheet, pose sheets A-D and his face
sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Kidd and Silver
are: the rest pose (A1) with the master head and its face layers, and every
other pose a whole-figure frame with its own drawn head, each placed by the
bottom-left corner of its drawn felt panel.

    python3 art-tools/cut_sheet.py art-tools/davy_jones_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/davy_jones_parts/pose_rig.json
    python3 art-tools/web_half.py davy_jones

- **His head is swapped above a line through his beard** (`collar_y` 215),
  as Blackbeard's is; the beard below it is the body's. The master head is
  placed by hand (`master.place`, fitted on his eyes, nose and beard at 0.77).
- **`drop_white`** clears the sheet's white caught between the weed strands
  on the master head's hat.
- **The felt**: only its bluer shades (`felt_blue`: his coat is dark green)
  plus its dark teal (`felt_dark_teal`: the shadows inside the drawn ripples
  under his drips).
- His sheet's felt is bluer than the others'; the corner placement read it
  with a looser test (green above blue minus 25).
- Sheet D's D4 and D5 were drawn touching: split by hand, each frame keeps
  its biggest piece.
- **Face** (`face.json`, `davy_jones_face/`): eyes half, closed, viewer,
  down, side, wide; brows raised, down; mouths rest, ah, ee, oh, oo, m, f,
  hum, l, smile (the sheet drew l after hum); heads 20 (in shadow, eyes lit)
  and 21 (toward the viewer). He blinks rarely (every 8-16 s): pale,
  unblinking eyes.
- **Chips** in call, bet, all in, collect and won pot are kept whole
  (`props`, fitted to each stack so the drawn rail beside them goes).
- Drips falling clear of him (off the hat brim) are separate specks and are
  dropped with the crumbs; the drips on his sleeve stay.

**Clips** (`web/art/davy_jones/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/davy_jones`): check, peek, call, bet, fold, all in,
show, collect; tells `drip` (strong) beside `wring`, `drum` (weak) beside
`hum`, `shadow` (bluffing: "the lamp nearest him flickers") beside `light`;
idles `crab`, `haze`, `hat_water`, `look_at_you`; beats `talk`, `big_bet`,
`lost_pot` (a slow nod), `won_pot` (the faintest smile), `heads_up`,
`knocked_out` (rises streaming and turns away). Cued by their words
(`cues`); `light`, `hat_water` and `look_at_you` are wordless fidgets.
`shadow` also gutters the Cove's lantern nearest him (`gutter`).
