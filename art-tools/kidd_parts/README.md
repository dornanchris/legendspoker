# Captain William Kidd's parts

The Pirate Cove's seat 1 (facing the viewer's right, never mirrored). Drawn
from the prompts in `POSES.md`; the sources are in `sources/`: his character
sheet, pose sheets A-D and his face sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Blackbeard is:
the rest pose (A1) with the master head and its face layers, and every other
pose a whole-figure frame with its own drawn head, each placed by the
bottom-left corner of its drawn felt panel.

    python3 art-tools/cut_sheet.py art-tools/kidd_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/kidd_parts/pose_rig.json
    python3 art-tools/web_half.py kidd

Sheet D's right column was drawn touching (D3's felt runs into D6's hat),
so D3's box stops above D6 and its frame keeps only its biggest piece.

- **Face** (`face.json`, `kidd_face/`): eyes half, closed, viewer, down,
  side, narrow; brows raised, together; mouths rest, ah, ee, oh, oo, m, f, l,
  chew, grin, aggrieved; heads 21 (glancing back) and 22 (toward the viewer).
- **Chips** drawn in call, bet, all in and collect are kept whole (`props`).

**Clips** (`web/art/kidd/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/kidd`): check, peek, call, bet (both hands, greedy),
fold, all in, show, collect; tells `pat` (strong) beside `straighten`,
`chew` (bluffing) beside `cravat`, `glance` (weak) beside `squint`; idles
`neck`, `count`, `hat_tip`, `look_at_you`; beats `talk`, `big_bet`,
`lost_pot` (palms up: robbery), `won_pot`, `heads_up`, `knocked_out` (rises
holding out his papers). His tells and idles are cued by their words (`cues`).
