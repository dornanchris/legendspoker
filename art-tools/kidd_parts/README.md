# Captain William Kidd's parts

The Pirate Cove's seat 1 (facing the viewer's right, never mirrored). Drawn
from the prompts in `POSES.md`; the sources are in `sources/`: his character
sheet, pose sheets A-C and his face sheet. **Pose sheet D is still to come**
(talking, big bet, lost and won pot, heads-up, knocked out): until then
`won_pot` and `lost_pot` are face-only (a greedy grin; aggrieved), and the
others play nothing.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Blackbeard is:
the rest pose (A1) with the master head and its face layers, and every other
pose a whole-figure frame with its own drawn head, each placed by the
bottom-left corner of its drawn felt panel.

    python3 art-tools/cut_sheet.py art-tools/kidd_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/kidd_parts/pose_rig.json
    python3 art-tools/web_half.py kidd

When sheet D arrives: save it as `sources/poses_d.png`, add D1-D6 to
`poses` (box, and a `reg` from the felt corner) and their frames, rebuild,
and add the clips.

- **Face** (`face.json`, `kidd_face/`): eyes half, closed, viewer, down,
  side, narrow; brows raised, together; mouths rest, ah, ee, oh, oo, m, f, l,
  chew, grin, aggrieved; heads 21 (glancing back) and 22 (toward the viewer).
- **Chips** drawn in call, bet, all in and collect are kept whole (`props`).

**Clips** (`web/art/kidd/anim.json`, 20, each ending at rest; preview
`web/index.html#/puppet/kidd`): check, peek, call, bet (both hands, greedy),
fold, all in, show, collect; tells `pat` (strong) beside `straighten`,
`chew` (bluffing) beside `cravat`, `glance` (weak) beside `squint`; idles
`neck`, `count`, `hat_tip`, `look_at_you`; `won_pot` and `lost_pot` face-only
for now. His tells and idles are cued by their words (`cues`).
