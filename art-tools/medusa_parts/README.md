# Medusa's parts

The Athens table's seat 3 (drawn facing the viewer's right, mirrored at the
table). Drawn from the prompts in `POSES.md`; the sources are in `sources/`:
her character sheet, four pose sheets and her face sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way the rest of
Athens is: the rest pose (A1, hands apart) with the master head and its face
layers, and every other pose a whole-figure frame with its own drawn head.

    python3 art-tools/cut_sheet.py art-tools/medusa_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/medusa_parts/pose_rig.json
    python3 art-tools/web_half.py medusa

- **Placement**: her sheets drew the rail as a tighter curve than the others,
  so each pose is placed by matching its whole drawn felt to the rest pose's
  (the rail region), not by a rail curve of fixed shape. Her hands rest
  further down the felt, so frames keep 110 rows below the rail (`below`).
- **Colours**: her snakes are the felt's green, so the felt is only its
  bluer shade (`felt_blue`); its shaded teal near the cells' foot is caught
  (`felt_teal`, which now passes over a dark teal cloth: her himation).
  The drawn rail is dropped in its band (`rail_band` 10/75, `wood_rows_only`).
- **Face** (`face.json`, `medusa_face/`): eyes half, closed, viewer, down, up,
  level; brows raised, together; mouths rest, ah, ee, oh, oo, m, f, l, teeth,
  pressed, smile, sigh; whole heads in each snake state: `still` (22),
  `hiss` (23), `drowse` (24), and `viewer` (25). The master head runs below
  the collar so no seam shows.
- A thin piece of the drawn rail is left between her forearms in some frames,
  on the table line, where the room's own rail lies.

**Clips** (`web/art/medusa/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/medusa`): check, peek, call, bet, fold, all in,
show, collect; tells `still` (strong) beside `drowse`, `hiss` (weak) beside
`knot`, `gaze_down` (bluffing) beside `tuck`; idles `taste`, `nip`, `chin`,
`look_at_you`; beats `talk`, `big_bet`, `lost_pot`, `won_pot`, `heads_up`,
`knocked_out` (the himation drawn round her). Her tells and idles are cued by
their words (`cues`).

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py medusa`; frames `win_big` (E2) and `lose_big` (E3), clips from `art-tools/build/reactions.py medusa`. Sheet E drew her table edge as a wider arc than her other sheets: `rail_e.py` clears what the rail filter leaves (run it after pose_rig.py), and E2 is lowered 8 px so the frame meets the table. Left: a small nick in the lower bracelet of the crushing loss (its gold is the rail's colour).
