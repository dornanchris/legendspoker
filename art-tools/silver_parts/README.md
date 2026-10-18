# Long John Silver's parts

The Pirate Cove's seat 2 (facing the viewer's right, never mirrored). Drawn
from the prompts in `POSES.md`; the sources are in `sources/`: his character
sheet, pose sheets A-D and his face sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Kidd is: the
rest pose (A1) with the master head and its face layers, and every other pose
a whole-figure frame with its own drawn head, each placed by the bottom-left
corner of its drawn felt panel.

    python3 art-tools/cut_sheet.py art-tools/silver_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/silver_parts/pose_rig.json
    python3 art-tools/web_half.py silver

- **Captain Flint** (the parrot) is a prop of the rest pose (`master.props`),
  cut by her colours (`saturated`, plus her beak and feet as `also`), on the
  torso and drawn over his head: his master head carries his ponytail, which
  would otherwise cover her. In a frame she is part of the drawing, and the
  clips hide the prop with the body.
- **The master head is placed by hand** (`master.place`): the fit, finding
  the parrot in the head's box, pulled it far off. Fitted on his eyes, nose
  and mouth at 0.68.
- **The felt is only its bluer shades** (`felt_blue`): the parrot is the
  felt's green.
- Sheets B and D were drawn touching (B4 and B5; D3's felt under D6's
  parrot), so those boxes are split by hand and their frames keep only their
  biggest piece.
- **Face** (`face.json`, `silver_face/`): eyes half, closed, viewer, down,
  side, narrow; brows raised, down; mouths rest, ah, ee, oh, oo, m (also f:
  the sheet has no f), l, grin, laugh, cold; head 24 (toward the viewer).
  The laugh's fit was set by hand in `silver_rig/face/fits.json`. The face
  sheet's four parrots (20-23) are not used yet: her tells are the frames.
- **Chips** drawn in call, bet, all in, collect and won pot are kept whole
  (`props`).

**Clips** (`web/art/silver/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/silver`): check, peek, call, bet, fold, all in, show,
collect; tells `squawk` (strong) beside `preen`, `sidle` (bluffing) beside
`flap`, `stroke` (weak) beside `apron`; idles `grin_round`, `crutch`, `chin`,
`look_at_you`; beats `talk`, `big_bet`, `lost_pot` (an easy laugh, palms up),
`won_pot` (a wink), `heads_up` (the smile gone cold), `knocked_out` (two
fingers to his brow). His tells and idles are cued by their words (`cues`);
`flap`, `chin` and `look_at_you` are wordless fidgets.

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py silver`; frames `win_big` (E2) and `lose_big` (E3), clips from `art-tools/build/reactions.py silver`. (His rest pose reports ~15 0ifferent from its drawing: the parrot is a separate piece. It always has; not a fault.)
