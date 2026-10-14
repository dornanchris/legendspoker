# The Pope's parts

Rome's seat 2 (drawn facing the viewer's right, as the game shows him).
Style-locked sheets in `sources/`: his character sheet, pose sheets A-D and
his face sheet. `POSES.md` has the prompts.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`:

    python3 art-tools/cut_sheet.py art-tools/pope_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/pope_parts/pose_rig.json
    python3 art-tools/pope_parts/clips.py
    python3 art-tools/web_half.py pope

- **Sheet D's poses 3 and 6 touch** (the knocked-out mitre reaches the
  lost-pot felt), so `pose_boxes.py` merged them: their boxes in
  `poses_found.json` are set by hand.
- **The master is the rest pose's own head and mitre**
  (`pope_face/pope_master.png`, rows 0-300 of A1, cut by `keep_poly`), as
  Cerberus's is: the face sheet's head has a wider mitre and fitted badly.
  So `replace_head` is off and there is no seam. Piece 10 is the head turned
  to the viewer.
- **Face** (`face.json`): eyes half 2, closed 3, viewer 4, down 5, side 6,
  narrow 7; brows raised 8, down 9 (placed by hand: the auto-fit put them
  below the eyes); mouths rest 11, ah 12, ee 13, oh 14, oo 15, m 16, f 17,
  l 18, beam 19, pained 20. The face pieces sit at scale ~0.5 on this head.
- **His embroidery is the drawn rail's gold, and his robes are red.**
  `rail_orange` takes thresholds, `rail_green` 0.3 keeps the red rail test
  off his robes and the ring's stone, `no_wood` keeps the wood test (dark
  red-brown) off his cuffs (there is no chair and no wooden rail on these
  sheets), and `rail_long` 3 takes only LONG thin strips of that gold at
  the table line for rail, so the embroidery stays (rest pose and frames).
- The upper-body frames (mitre, hands in lap, smooth robes, turn ring,
  chuckle, fingertips, heads up) and knocked out are cut at the table line
  (`poly`).

**Clips** (`web/art/pope/anim.json`, 24, each ending at rest): check, peek,
call, bet, fold, all in, show, collect; tells `turn_ring` (strong) beside
`admire_ring`, `smooth_robes` (bluffing) beside `mitre`, `hands_in_lap`
(weak) beside `latin`; idles `benevolent`, `chuckle`, `fingertips`,
`look_at_you`; beats talk, big bet, lost pot, won pot, heads up, knocked
out. Every pose but rest is a whole-figure frame with its own drawn head.
