# The Martian's kit

The Station's seat 2, drawn facing right, not mirrored. Wells's Martian (The
War of the Worlds, 1898): a great head in a squat brass seat, its sixteen
tentacles in two bunches of eight lying on the felt where arms would be.
Sheets in `sources/` from `POSES.md` (`poses_spec.json`), the Astronaut's
sheets as the style images.

Built the way the Robot is, from a short `rig_spec.json`:

    python3 art-tools/cut_sheet.py art-tools/martian_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/martian_parts martian 320
    python3 art-tools/build/pose_boxes.py art-tools/martian_parts
    (then fix B1, B2 and B3 by hand in poses_found.json, see below)
    python3 art-tools/build/corner_regs.py art-tools/martian_parts
    python3 art-tools/build/rig_from_spec.py art-tools/martian_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/martian_parts/pose_rig.json   (minutes: the face fits)
    python3 art-tools/build/frames_sheet.py martian
    python3 art-tools/martian_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py martian; python3 art-tools/build/portraits.py

- Each bunch of tentacles is a forearm asset on an elbow where it leaves the
  seat's rim. No prop.
- The table line is high in these sheets (the rail's top, 244, just under the
  seat's rim) and the tentacles lie far out on the felt, so frames keep 175 px
  below it.
- `poses_found.json` by hand: B1 and B2 touched on the sheet (split at the cell
  line); B3 (the big win, tentacles raised) is drawn smaller, so it is placed
  by hand at scale 1.15 (`reg`), and its rim is kept by a `props` box (the rail
  test ate the brass).
- Face: the master is the rest pose's own head; `keep_white` (in
  `master_extra`, new) keeps the white highlights in its eyes, which the
  master's sheet-white cleanup used to cut out. Eyes 2-8 (half, closed, the
  near eye shut for the odd blink, toward you, down, narrowed, wide). The face
  sheet drew the beaks nearly front-on and the automatic fit put them on the
  cheek, so their fits are set by hand in `martian_rig/face/fits.json` (scale
  0.8 on the master's beak) and each patch is kept to the beak itself; at rest
  the master's own beak shows.
- Tells: `curl` (strong) beside `drum`; `count` (weak); `blink_odd`
  (bluffing) beside `earth`; idles `colour`, `breathe`; fidgets `turn`, `sag`.
  The sheets' motion marks (drumming, counting, thrashing) are cut as thin
  lines on the felt; the tentacles carry those beats.
