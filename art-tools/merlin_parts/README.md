# Merlin's parts

Camelot's seat 1 (facing the viewer's right, never mirrored). The sheets in
`sources/` (his character sheet, pose sheets A-D, face sheet) were drawn from
the FIRST version of `POSES.md`, before the style lock; `POSES.md` now holds
the style-locked prompts, for a redraw if the owner wants one (the first
sheets drifted toward detailed illustration).

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way the Pirate
Cove's cast is: the rest pose (A1) with the master head and its face layers,
and every other pose a whole-figure frame with its own drawn head, each
placed by the bottom-left corner of its drawn felt panel.

    python3 art-tools/cut_sheet.py art-tools/merlin_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/merlin_parts/pose_rig.json
    python3 art-tools/web_half.py merlin

- **The staff is a prop of the rest pose** (`master.props.staff`), cut by
  colour (`redder`: red above 1.5x green; his robe is browner), on the torso
  and drawn over his head: the master head's hood is wider than the drawn
  one and would cover it. `drop_white` clears the sheet's white inside the
  knot's loops. In a frame the staff is part of the drawing.
- **His head is swapped above a line through his beard** (`collar_y` 250),
  placed by hand on his eyes, nose and mouth (`master.place`, 0.77).
- Sheets B and D drew B1 over B4 and D3 over D6 touching: split by hand.
- **Face** (`face.json`, `merlin_face/`): eyes half, closed, viewer, down,
  far (gazing far away), narrow; brows raised, down; mouths rest, ah, ee,
  oh, oo, m, f, l, murmur, smile; head 20 (toward the viewer).

**Clips** (`web/art/merlin/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/merlin`): check, peek, call, bet, fold, all in,
show, collect; tells `glow` (strong: the staff hums) beside `tap`, `gaze`
(bluffing) beside `stare`, `murmur` (weak) beside `beard`; idles `ash`,
`candle` (the candle nearest him bends the wrong way: he glances up, and the
room's nearest candle flame gutters, `gutter`), `still`, `look_at_you`;
beats `talk`, `big_bet`, `lost_pot` (a small nod), `won_pot`, `heads_up`
(hands clasped, eyes fixed), `knocked_out` (takes his staff, turns to go).
