# Dr. Jekyll's kit

Transylvania's seat 2, one half of a two-man chair (Jekyll or Hyde, 50/50 a
sitting; the rules are in CLAUDE.md). Gothic sheets in `sources/` from
`POSES.md` (`poses_spec.json`, the Horseman's sheet as the style image).

Built the way JFK and Loki are, from a short `rig_spec.json`:

    python3 art-tools/cut_sheet.py art-tools/jekyll_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/jekyll_parts jekyll 320
    python3 art-tools/build/pose_boxes.py art-tools/jekyll_parts
    python3 art-tools/build/corner_regs.py art-tools/jekyll_parts
    python3 art-tools/build/rig_from_spec.py art-tools/jekyll_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/jekyll_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py jekyll
    python3 art-tools/jekyll_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py jekyll

`face.json` says which face piece is which. `drop_wood` cuts the drawn
table's dark red-brown edge out of the frames.

- The phial is a props box in the near forearm's piece and every frame but
  `phial` (B6), where he holds it up.
- Tells: `hyde_hand` (tilted, his hand for a moment Hyde's) beside
  `rub_hands`, `phial` (strong) beside `tap_phial`, `brow` (weak) beside
  `watch`; idle `door`; fidget `kind_smile`.
- The first pose sheet D drifted into Hyde (hairy hands, his face); it is
  kept in `sources/rejected/`. The redraw is `sources/poses_d.png`.
