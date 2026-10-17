# The Astronaut's kit

The Station's seat 4, drawn facing right and mirrored. The Station's style
baseline (the owner): his sheets are the style images for the rest of the
Station. Sheets in `sources/` from `POSES.md` (`poses_spec.json`). He is a man
(the owner); his first spec said she.

Built the way Dracula is, from a short `rig_spec.json`:

    python3 art-tools/cut_sheet.py art-tools/astronaut_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/astronaut_parts astronaut 320
    python3 art-tools/build/pose_boxes.py art-tools/astronaut_parts
    python3 art-tools/build/corner_regs.py art-tools/astronaut_parts
    python3 art-tools/build/rig_from_spec.py art-tools/astronaut_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/astronaut_parts/pose_rig.json   (minutes: 17 face fits)
    python3 art-tools/build/frames_sheet.py astronaut
    python3 art-tools/astronaut_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py astronaut; python3 art-tools/build/portraits.py

`face.json` says which face piece is which: eyes 2-8 (they carry his brows,
so the separate brow bits are unused), mouths 13-22 (the grin and a rueful
smile among them).

- The helmet is a props box in the near forearm's piece and every frame but
  `lose_big` (D4), where his forehead rests on it in the middle.
- Frames are placed by the felt's corner, as for every kit. Sheets C and D
  drew his body a little further left than A1 (`gauge`, `turn`, `big_bet`,
  `laugh`), so those beats jump a little sideways while the helmet and gloves
  stay put; redraw if it shows in play.
- Tells: `grin` (strong) beside `yawn`, `window` (weak) beside `photo`,
  `gauge` (bluffing) beside `scuff`; idle `token`; fidgets `turn`, `stretch`.
  He is seated from the first hand: no `arrive`.
