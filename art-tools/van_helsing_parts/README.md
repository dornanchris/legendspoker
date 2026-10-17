# Van Helsing's kit

Transylvania's seat 1, drawn facing right. **Redrawn gothic** (the
Horseman's sheet as the style image; prompts in `POSES.md`); his first,
flat-cartoon sheets are in `sources/old_style/` (that puppet was replaced).
`sources/poses_b_alt.png` is a second draw of sheet B, kept unused.

Built the way Dracula is, from a short `rig_spec.json` (a prop on the felt):

    python3 art-tools/cut_sheet.py art-tools/van_helsing_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/van_helsing_parts van_helsing 240
    python3 art-tools/build/pose_boxes.py art-tools/van_helsing_parts
    python3 art-tools/build/corner_regs.py art-tools/van_helsing_parts
    python3 art-tools/build/rig_from_spec.py art-tools/van_helsing_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/van_helsing_parts/pose_rig.json
    python3 art-tools/van_helsing_parts/lens.py
    python3 art-tools/build/frames_sheet.py van_helsing
    python3 art-tools/van_helsing_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py van_helsing; python3 art-tools/build/portraits.py

- The master is the rest pose's own head, spectacles on. The face sheet drew
  two eye pieces WITHOUT spectacles (6, 7): unused, so there are no narrowed
  or wide eyes; and no brow pieces. Eyes: half, closed, viewer, side; ten
  mouths, a smile among them (the small win smiles).
- The doctor's bag is a props box in the near forearm's piece and every
  frame (it is drawn in all 24 poses, in the same place).
- `lens.py`: his far lens reaches past his face, and the sheet's white showed
  through it; it clears small pale patches touching the clear background in
  every built image. Re-run it after every pose_rig.py.
- Tells: `spectacles` (strong) beside `diary`, `crucifix` (weak) beside
  `pocket` (the garlic), `mutter` (tilted) beside `sniff`; idle `fireplace`;
  fidgets `over_specs`, `settle_specs`, `look_at_you`. B3 and D4 are the big
  win and the crushing loss. No `knocked_out`: he says his line and fades.
