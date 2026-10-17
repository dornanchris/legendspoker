# The Phoenix's kit

The Pyre's one opponent, heads up; drawn facing right and mirrored as the seat
needs (at the Pyre it sits at seat 3's place, right of Death). Sheets in
`sources/` from `POSES.md`, in the Station's graphic-novel style (the
Astronaut's sheets the style images).

Built the way the Station cast is, from a short `rig_spec.json`:

    python3 art-tools/cut_sheet.py art-tools/phoenix_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/phoenix_parts phoenix 320
    python3 art-tools/build/pose_boxes.py art-tools/phoenix_parts
    python3 art-tools/build/corner_regs.py art-tools/phoenix_parts
    (then C5's reg by hand, below)
    python3 art-tools/build/rig_from_spec.py art-tools/phoenix_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/phoenix_parts/pose_rig.json   (minutes: face fits)
    python3 art-tools/build/frames_sheet.py phoenix
    python3 art-tools/phoenix_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py phoenix; python3 art-tools/build/portraits.py

- Its wings are its forearms (wingtips on the felt). `no_wood`, no
  `rail_orange`: its orange and dark-red feathers are the drawn rail's and the
  wood's colours, and those tests ate the wings. `table_y` is the drawn rail's
  top (346), so the room's table covers the rail drawn under it.
- Face: the sheet's upper heads (2-7) fitted onto the master, limited to the
  eye: half, closed, wide, to the side, down, narrowed. Beaks 9-11 for speech
  (11, open wide, placed by hand in `phoenix_rig/face/fits.json`: the fit put
  it on the brow; the head's outline clips its lower half). The crest pieces
  are unused: the crest's tells are whole-figure frames.
- C5 (`spread`, wings wide) reaches into both neighbouring cells: its box was
  merged with theirs, so its reg is set by hand (dx -80) and `eye`, `sing`,
  `spread` and `win_big` keep only their largest piece (`biggest`).
- `knocked_out` (D6) burns down in a great flame, cut 45 px below the table
  line.
- Tells: `flare` (strong) beside `spark`, `preen` (bluffing) beside `ash`,
  `embers` (weak) beside `light`; idle `eye`; fidgets `sing`, `spread`.
