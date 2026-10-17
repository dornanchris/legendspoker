# The Grey's kit

The Station's seat 1 (far left), drawn facing right, not mirrored. The visitor
of modern folklore, from the archetype. Sheets in `sources/` from `POSES.md`
(`poses_spec.json`), the Astronaut's sheets as the style images; the first,
airbrushed tries are kept in `sources/rejected/` and `sources/old_try/`.

Built the way the Astronaut is, from a short `rig_spec.json`:

    python3 art-tools/build/own_master.py art-tools/grey_alien_parts grey_alien 320
    python3 art-tools/build/pose_boxes.py art-tools/grey_alien_parts
    python3 art-tools/build/corner_regs.py art-tools/grey_alien_parts
    python3 art-tools/grey_alien_parts/eyes.py
    python3 art-tools/build/rig_from_spec.py art-tools/grey_alien_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/grey_alien_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py grey_alien
    python3 art-tools/grey_alien_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py grey_alien; python3 art-tools/build/portraits.py

- Its mouth never moves, and the face sheet drew twelve WHOLE heads at another
  size and angle (cut to `grey_alien_face/` by `cut_face.json`, unused). So
  `eyes.py` makes its face pieces from the master itself: the sideways
  membrane half and fully across (41, 42: its blink, kept rare, every 9-16 s,
  since the membrane is also its strong tell's shape) and a glow deep in the
  eyes in three steps (44-46: its speech). 43 (heavy-lidded) is made but
  unused. It never glances: it looks by turning its head (whole frames).
- `felt_dark_teal` is off: that test took the blue Earthlight rim along the
  left of its head and shoulders for felt. `strip_thin` 2 and tighter forearm
  polygons drop the drawn rail's outline beside the hands; `exclude` drops the
  sheet's white caught between the arms and the torso above the rail.
- `show` and `win_big` reach into the next cell: `biggest`. `hum` keeps its
  vibration lines (`marks`); its sheet also drew the membrane over the eyes,
  so the hum is a second decoy for the blink.
- Tells: `membrane` (strong) beside `stare`, `tilt` (bluffing) beside
  `breathe`, `splay` (weak) beside `wood`; idle `hum`; fidgets `turn`,
  `fingers`.
