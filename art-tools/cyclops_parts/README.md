# Polyphemus the Cyclops's parts

The Athens table's seat 4 (drawn facing the viewer's right, mirrored at the
table). Drawn from the prompts in `POSES.md`; the sources are in `sources/`:
his character sheet, two takes of pose sheet A (`poses_a.png` is used;
`poses_a_alt.png` is the other, nearly the same), sheets B-D and his face
sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Socrates and
Leonidas are: the rest pose (A1, hands apart, the club leaning by his right
elbow) with the master head and its face layers, and every other pose a
whole-figure frame with its own drawn head, placed (`reg`) by the apex of its
drawn rail.

    python3 art-tools/cut_sheet.py art-tools/cyclops_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/cyclops_parts/pose_rig.json
    python3 art-tools/web_half.py cyclops

- **Size**: his sheets drew him the same size as everyone behind the rail,
  so he is built a quarter bigger (`scale` 1.25, `origin_x` 225 to keep him
  centred): the giant at the table, crowding his neighbours as his file asks.
- **Colours**: as Leonidas (`wood_rows_only`, `rail_band`: his brown tunic
  and skin are the rail's colours); the felt drawn in a bluer shade between
  his hands is caught (`felt_teal`) and dropped again where hole-filling
  enclosed it (`felt_holes`).
- **Face** (`face.json`, `cyclops_face/`): his one eye half, closed, viewer,
  down, up, narrow, wide; the brow raised, down; mouths rest, ah, ee, oh, oo,
  m, f, l, growl, grin (gap-toothed), sniff; heads 22 (toward the viewer) and
  23 (nose lifted, sniffing).
- **Chips** drawn in call, bet, all in and collect are kept whole (`props`).
- A little of the fleece beside his head at rest is filled in from round it
  and reads soft at close range.

**Clips** (`web/art/cyclops/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/cyclops`): check, peek, call, bet, fold, all in,
show, collect; tells `narrow` (strong) beside `blink`, `sniff` (weak) beside
`listen`, `thump` (tilted) beside `shift`; idles `count`, `beard`, `club`,
`look_at_you`; beats `talk` (pointing), `big_bet`, `lost_pot` (a growl),
`won_pot` (the grin), `heads_up`, `knocked_out` (picks up his club). His tells
and idles are cued by their words (`cues`).

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py cyclops`; frames `win_big` (E2) and `lose_big` (E3), clips from `art-tools/build/reactions.py cyclops`.
