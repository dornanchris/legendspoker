# Leonidas's parts

The Athens table's seat 2 (facing the viewer's right, never mirrored).
Drawn from the prompts in `POSES.md`; the sources are in `sources/`: his
character sheet, four pose sheets and his face sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Socrates is:
the rest pose (A1, hands apart, the helmet standing by his right elbow) with
the master head and its face layers, and **every other pose a whole-figure
frame with its own drawn head**, each placed (`reg`) by the apex of its drawn
rail.

    python3 art-tools/cut_sheet.py art-tools/leonidas_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/leonidas_parts/pose_rig.json
    python3 art-tools/web_half.py leonidas

- **Colours**: his red cloak and the helmet's crest are the rail's wood
  colour, so wood counts only at and below the rail (`wood_rows_only`); his
  skin shading and the bronze are the rail's orange, so the drawn rail is
  dropped only where a rail-coloured shape lies wholly within the rail's band
  (`rail_band`). The helmet is a prop in every frame (its bronze is kept as
  drawn), and in the rest pose it is part of the near arm's piece, so it is
  drawn over the room's table where it stands on the felt.
- **Face** (`face.json`, `leonidas_face/`): eyes half, closed, viewer, down,
  side (disdain), narrow; brows raised, down; mouths rest, ah, ee, oh, oo, m,
  f, l, pressed (the breath out), disdain, clenched, grim; heads 22 (chin
  lifted) and 23 (toward the viewer). The mouth patches fitted at about 0.78
  of the master: drawn a little small on the sheet.
- **Chips** drawn in call, bet, all in and collect are kept whole (`props`).

**Clips** (`web/art/leonidas/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/leonidas`): check, peek, call, bet, fold, all in,
show, collect; tells `fists` (strong) beside `arms_folded`, `chin`
(bluffing) beside `disdain`, `exhale` (weak) beside `breathe_in`; idles
`knuckles`, `cloak`, `helmet`, `look_at_you`; beats `talk`, `big_bet`,
`lost_pot`, `won_pot` (a curt nod), `heads_up`, `knocked_out` (the helmet
lifted to put on). His tells and idles are cued by their words (`cues`).
