# The Robot's kit

The Station's seat 3, drawn facing right and mirrored. Sheets in `sources/`
from `POSES.md` (`poses_spec.json`), the Astronaut's sheets as the style
images. Its body is the slot the AI takes: draw the AI from these sheets.

Built the way the Astronaut is, from a short `rig_spec.json`:

    python3 art-tools/cut_sheet.py art-tools/robot_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/robot_parts robot 320
    python3 art-tools/build/pose_boxes.py art-tools/robot_parts
    python3 art-tools/build/corner_regs.py art-tools/robot_parts
    python3 art-tools/robot_parts/glow.py
    python3 art-tools/build/rig_from_spec.py art-tools/robot_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/robot_parts/pose_rig.json   (minutes: the face fits)
    python3 art-tools/build/frames_sheet.py robot
    python3 art-tools/robot_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py robot; python3 art-tools/build/portraits.py

- No prop: its chest lamp is part of its body, and every tell is a
  whole-figure frame.
- Face: the eye lamps from the face sheet (dimmed, dark, shutters half and
  closed, toward you, down, bright); it blinks its shutters now and then.
  It talks by its own grille lighting up, three steps (`glow.py`, from the
  master): the face sheet's grille strips fit the head at another size.
- `marks` (a new pose_rig frame option) keeps the motion marks drawn beside
  it, however thin: the whirr, the recalibrating tick, the antennae twitch,
  the laugh.
- `drop_red` (new) drops a red chair the sheets drew behind its left
  shoulder in `bet`, `all_in` (A5, B1); `win_big` (B3) cuts its flap by an
  `except` box. A few dark-red specks may remain at the left arm's edge in
  `bet` and `all_in`.
- `wood_rows_only`, no `drop_wood`: its brass is the wood's colour.
- Tells: `lamp` (strong) beside `eyes_dim`, `whir` (weak) beside
  `recalibrate`, `head_turn` (bluffing) beside `antennae`; idle `steam`;
  fidgets `turn`, `polish`. No `arrive`: it is seated from the first hand.
