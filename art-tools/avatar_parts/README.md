# The Stranger

The player's own figure: seen once, in the finale's left-hand chair (the
camera pulls back at the last table), and later the default online avatar.
Sheets in `sources/` from `POSES.md`: character sheet, poses A-C (18 poses;
`poses_b_alt.png` is the other draw of B). No face sheet: it has no face.
Puppet `stranger` (`web/art/stranger/`, `#/puppet/stranger`,
`?accent=crimson` to see another colour).

    python3 art-tools/build/pose_boxes.py art-tools/avatar_parts
    python3 art-tools/build/own_master.py art-tools/avatar_parts stranger 200
    (poses_found.json's regs are set by hand: see below)
    python3 art-tools/build/rig_from_spec.py art-tools/avatar_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/avatar_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py stranger
    python3 art-tools/avatar_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py stranger
    python3 art-tools/avatar_parts/accent_masks.py

- **No tells (rule 3):** it acts out only what the player did (their
  actions, the win and loss beats); sheet C's loops are fidgets. `avatar`
  in anim.json: no character file, no cues (check:data and the audit know).
- **No face:** the master is the rest pose's own hat and shadow, no face
  layers; it never blinks, and it talks with a nod (the Green Knight's helm).
- **Placement:** the felt-corner regs put sheet C 25 px off, and matching
  on the torso found every pose drawn 6% bigger than the rest pose. Each pose
  is placed at scale 1.0 where the torso match put its torso; the three that
  lean (A5 bet, B1 all in, C5 the glove) by the felt instead.
- **The player's colour:** the scarf, hat band and cuffs are the drawing's
  one teal (hue 175-202). `accent_masks.py` writes a mask of it for every
  image (`accent/`, `half/accent/`); the puppet player tints those pixels
  with the canvas "color" blend at load (`web/puppet/accent.ts`, chosen in
  Settings, "Your colour"). Never reading pixels, it works from file://.
  `accent.py` is the offline preview (`accents.png`).
