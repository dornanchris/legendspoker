# Javert's parts

Baker Street's seat 2 (drawn facing the viewer's right, as the game shows
him). Style-locked sheets in `sources/`, in a plain black bicorne (the owner's
call: the first character sheet's top hat read less as Javert; the bicorne was
the Paris police's hat from 1829, worn here with Hugo's greatcoat, not with
any production's uniform). `POSES.md` has the prompts.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`:

    python3 art-tools/cut_sheet.py art-tools/javert_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/javert_parts/pose_rig.json
    python3 art-tools/javert_parts/clips.py
    python3 art-tools/web_half.py javert

- **The master is the rest pose's own head and bicorne**
  (`javert_face/javert_master.png`, rows 0-320 of A1), as Nemo's is. Piece 16
  is the head turned to the viewer.
- **Face** (`face.json`): eyes down 2, half 3, viewer 4, closed 5, narrow 6,
  side 7, wide 8 (each with its brows and the hat's brim; the brow pieces 12
  and 14 are not used); mouths rest 9, ah 10, ee 11, oh 13, oo 15, m 17,
  f 18, l 19, grim 20, set 21. Fitted at one scale per set (eyes 0.66,
  mouths 0.57). He blinks less than anyone (`blink.every` 3.5-7.5 s).
- Rail and skin are the same orange (`rail_orange` with thresholds,
  `rail_blue` 40, `no_wood`), as Nemo.
- **The cane** (C3) goes down behind the table: everything below the rail
  under his hand is cut (`except`). The brass knob in his fist is the rail's
  gold and goes with it, so the pose reads as a fist set down on the edge.
- Knocked out is cut at the table line.

**Clips** (`web/art/javert/anim.json`, 24, each ending at rest): check,
peek, call, bet, fold, all in, show, collect; tells `button` (strong) beside
`stock`, `stare` (weak) beside `door`, `shake` (tilted) beside `cane`; idles
`notebook`, `upright`, `bicorne`, `look_at_you`; beats talk, big bet, lost
pot, won pot, heads up, knocked out.
