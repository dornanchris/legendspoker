# Holmes in the deerstalker

Holmes's second look (the owner: "an unlockable skin"): Paget's ear-flapped
travelling cap, flaps tied up, no cape. Same poses, same tells, same pipe as
the bareheaded kit (`../sherlock_parts/`): a look, never a different read.
Its anim.json says `"of": "sherlock"`, so check:data holds its cues to
Holmes's character file, the way `green_knight_bare` is held to the Green
Knight's. Proposed rule (the switch is game work, for another thread):
bareheaded at Baker Street, his own sitting room; in the cap everywhere else.
Style-locked sheets in `sources/`. `POSES.md` has the prompts.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`, which started as a
copy of the bareheaded one:

    python3 art-tools/cut_sheet.py art-tools/sherlock_deerstalker_parts/cut_face.json
    python3 art-tools/build/pose_boxes.py art-tools/sherlock_deerstalker_parts
    python3 art-tools/build/corner_regs.py art-tools/sherlock_deerstalker_parts
    python3 art-tools/pose_rig.py art-tools/sherlock_deerstalker_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py sherlock_deerstalker
    python3 art-tools/sherlock_deerstalker_parts/clips.py
    python3 art-tools/web_half.py sherlock_deerstalker

- **The master is the rest pose's own head**, cap and all, cut below the
  collar at 225 (`cut_below`), with a `keep_poly` round the cap. These
  sheets sit about 10 pixels lower than the bareheaded ones, so arms, props
  and `except` boxes were moved down 10 (`table_y` 378, `collar_y` 210).
- **Face** (`face.json`): the same piece numbers as the bareheaded kit (the
  face sheet was drawn to the same list).
- **The pipe** lies on the felt by his right hand, part of that forearm's
  piece (a tight `props` box, [20-185] x [425-482]: a bigger one kept a
  sliver of rail). Its gold band is the rail's colour, so `rail_gold` now
  spares anything inside an arm's `props`.
- **The rail** on these sheets is darker and greener than the bareheaded
  ones: `rail_orange` `{"red": 120, "blue": 34, "green": 50}` (pose_rig's
  new `green` option, default 70). A small orange tip of drawn rail is left
  at the left edge in a few frames (call, all in, collect, talk); it sits
  under the room's table on the real screen.

**Clips** (`web/art/sherlock_deerstalker/anim.json`, 24, the bareheaded
kit's list): check, peek, call, bet, fold, all in, show, collect; tells
`fingertips` (strong) beside `speck`, `pipe` (bluffing) beside `lens`,
`pipe_teeth` (weak) beside `your_hands`; idles `mantel`, `reading`, `bored`,
`look_at_you`; beats talk, big bet, lost pot, won pot, heads up, knocked out.
Preview at `#/puppet/sherlock_deerstalker`.

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py sherlock_deerstalker`; frames `win_big` (E2) and `lose_big` (E3), then `art-tools/build/rail_clean.py sherlock_deerstalker` (after pose_rig.py) clears the sheet's table edge below the table line; clips from `art-tools/build/reactions.py sherlock_deerstalker`. Placed with `--rest-props` (the pipe), plus a wider pipe box: sheet E laid the pipe further out.
