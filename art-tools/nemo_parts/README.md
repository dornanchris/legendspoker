# Nemo's parts

Baker Street's seat 1 (drawn facing the viewer's right, as the game shows
him). Style-locked sheets in `sources/`: his character sheet, pose sheets A-D
and his face sheet. `POSES.md` has the prompts.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`:

    python3 art-tools/cut_sheet.py art-tools/nemo_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/nemo_parts/pose_rig.json
    python3 art-tools/nemo_parts/clips.py
    python3 art-tools/web_half.py nemo

- **The master is the rest pose's own head and cap**
  (`nemo_face/nemo_master.png`, rows 0-300 of A1), as the Pope's is: no seam.
  Piece 02 is the head turned to the viewer.
- **Face** (`face.json`): eyes half 3, closed 4, viewer 5, down 6, side 7,
  narrow 8 (each with its brows: the brow pieces 9 and 10 are not used);
  mouths rest 11, ah 12, ee 13, oh 14, oo 15, m 16, f 17, l 18, smile 19,
  set 20. The sheet drew the mouths front-on, so only a small region round
  the lips and moustache is laid on the three-quarter head.
- **The great pearl** lies on the felt by his right hand: part of that
  forearm's piece at rest, a `props` box in every frame (so the rail test
  leaves it), and `keep_white` there, so its white highlight is not taken
  for the sheet's white caught between his hands (a new pose_rig option).
  The `pearl` frame drops the felt pearl it also drew (`except`): he holds it.
- Rail and skin are the same orange (`rail_orange` with thresholds,
  `rail_blue` 40), as Spartacus. Knocked out is cut at the table line.

**Clips** (`web/art/nemo/anim.json`, 24, each ending at rest): check, peek,
call, bet, fold, all in, show, collect; tells `listen` (strong) beside
`fugue`, `window` (weak) beside `chronometer`, `pearl` (bluffing) beside
`hull`; idles `notebook`, `cold_look`, `arms_folded`, `look_at_you`; beats
talk, big bet, lost pot, won pot, heads up, knocked out.
