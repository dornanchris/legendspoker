# Mr. Hyde's kit

Transylvania's seat 2, one half of a two-man chair (Jekyll or Hyde, 50/50 a
sitting; the rules are in CLAUDE.md). Gothic sheets in `sources/` from
`POSES.md` (`poses_spec.json`, the Horseman's sheet as the style image).

Built the way JFK and Loki are, from a short `rig_spec.json`:

    python3 art-tools/cut_sheet.py art-tools/hyde_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/hyde_parts hyde 320
    python3 art-tools/build/pose_boxes.py art-tools/hyde_parts
    python3 art-tools/build/corner_regs.py art-tools/hyde_parts
    python3 art-tools/build/rig_from_spec.py art-tools/hyde_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/hyde_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py hyde
    python3 art-tools/hyde_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py hyde

`face.json` says which face piece is which. `drop_wood` cuts the drawn
table's dark red-brown edge out of the frames.

- **Built at 0.88 scale** (`scale` in rig_spec.json): the sheets drew him
  Jekyll's size, hunched; Stevenson's Hyde is small.
- His sheets drew the round table's far edge arcing up between his arms:
  `fill_rail` (pose_rig.py) repaints long, shallow red-brown strips in a band
  above the table line from his coat. A few specks survive in bet and all in.
- Tells: `smile` (strong) beside `suck_teeth`, `drum` (bluffing) beside
  `crack`, `hunch` (weak) beside `sleeves`; idles `glare`, `snigger`.
