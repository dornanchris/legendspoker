# The Wolf Man's kit

Transylvania's seat 3, drawn facing right and mirrored. Gothic sheets in
`sources/` (the Horseman's sheet as the style image); his first sheets, in
Cerberus's flat animal style, are in `sources/old_style/` and were never built.

Built the way Jekyll and Hyde are, from a short `rig_spec.json`:

    python3 art-tools/cut_sheet.py art-tools/wolf_man_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/wolf_man_parts wolf_man 320
    python3 art-tools/build/pose_boxes.py art-tools/wolf_man_parts
    python3 art-tools/build/corner_regs.py art-tools/wolf_man_parts
    python3 art-tools/build/rig_from_spec.py art-tools/wolf_man_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/wolf_man_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py wolf_man
    python3 art-tools/wolf_man_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py wolf_man; python3 art-tools/build/portraits.py

- No prop: his ears and claws are the tell surface. The ear pieces on the face
  sheet (20, 21) are unused; his ears move in whole-figure frames.
- `sniff` (B4) reached into the next cell on the sheet: `biggest` keeps only
  his own drawing.
- The small win is a nod only (no smile-like muzzle among his mouths).
- Tells: `sniff` (strong) beside `growl`, `ears_flat` (weak) beside
  `scratch`, `claws` (tilted) beside `shed`; idle `window`; fidgets
  `sheepish`, `ears_back`. No `arrive`: he is seated from the first hand.
