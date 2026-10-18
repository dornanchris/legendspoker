# Death as a player

The finale's right-hand chair (mirrored there), and later an online avatar
(cosmetic loops only, rule 3). Three-quarter sheets drawn from his dealer
sheet (`POSES.md`): character sheet, poses A-C (18 poses) and a face sheet.
Puppet `death_player` (`web/art/death_player/`, `#/puppet/death_player`); the
finale's room seats him wherever its table says `death` (`cast` in room.json).

    python3 art-tools/build/pose_boxes.py art-tools/death_avatar_parts
    python3 art-tools/build/corner_regs.py art-tools/death_avatar_parts --green
    python3 art-tools/build/own_master.py art-tools/death_avatar_parts death_player 205
    python3 art-tools/death_avatar_parts/jaw.py
    python3 art-tools/build/rig_from_spec.py art-tools/death_avatar_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/death_avatar_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py death_player
    python3 art-tools/death_avatar_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py death_player

- A plain green felt: `corner_regs.py --green` (the teal test misses it).
- His purple lining is the wood's red, but far bluer: `wood_blue` 0.34.
- The rail enclosed between his arms came back when holes were filled:
  `rail_holes` drops rail colour near the table line, in frames and the
  resting arms. Two small rail ends may still show at his sleeves' outer
  edges at rest.
- The face sheet's jaw patches were drawn larger and covered his nose, so
  his talking jaw is made from his own skull (`jaw.py`: the lower jaw dropped
  3 / 6 / 9 px). A skull does not blink.
- B3 (the big win) reaches into B2's cell: `show` keeps its biggest piece,
  `win_big` cuts B2's corner (`except`).
- No tells: sheet C's loops are fidgets (`hood`, `brooch`, `ash`, `shrug`,
  `flex`, `clock`); `lost_pot` is the shrug.
