# Holmes's parts

Baker Street's champion, seat 4, seated from the first hand (drawn facing the
viewer's right; the game mirrors him to face the table's centre). Bareheaded
at home, the owner's call; the deerstalker is a second look in
`../sherlock_deerstalker_parts/` (prompts only so far). Style-locked sheets in
`sources/`. `POSES.md` has the prompts.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`:

    python3 art-tools/cut_sheet.py art-tools/sherlock_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/sherlock_parts/pose_rig.json
    python3 art-tools/sherlock_parts/clips.py
    python3 art-tools/web_half.py sherlock

- **The master is the rest pose's own head** (`sherlock_face/sherlock_master.png`,
  rows 0-300 of A1), as Javert's is. Piece 15 is the head turned to the viewer.
- **Face** (`face.json`): eyes half 2, closed 3, viewer 4, down 5, side 6,
  narrow 7, wide 8 (each with its brows); mouths rest 9, ah 10, ee 11, oh 12,
  oo 13, m 14, f 16, l 17, irritated 18, pleased 19. Mouths fitted at one
  scale (0.49).
- **The clay pipe** lies on the felt by his right hand: part of that
  forearm's piece at rest (a `props` box: pose_rig now keeps a prop lying
  apart from the hand, which `biggest` used to drop), and a `props` box in
  every frame; the two frames where he holds it (pipe, pipe_teeth) drop the
  second pipe the sheets also drew on the felt (`except`).
- His sheets' rail is a darker gold (blue up to ~30): `rail_orange`
  `{"red": 120, "blue": 34}`. Knocked out is cut at the table line.

**Clips** (`web/art/sherlock/anim.json`, 24, each ending at rest): check,
peek, call, bet, fold, all in, show, collect; tells `fingertips` (strong)
beside `speck`, `pipe` (bluffing) beside `lens`, `pipe_teeth` (weak) beside
`your_hands`; idles `mantel`, `reading`, `bored`, `look_at_you`; beats talk,
big bet, lost pot, won pot, heads up, knocked out.
