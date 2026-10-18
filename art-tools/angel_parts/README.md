# Pravuil, the Recording Angel: the finale's dealer

Death plays the Last Crossing, so someone else deals it (the owner's call):
Pravuil, the angel who keeps the books in 2 Enoch. Front-on like Death's
dealer kit, never mirrored; no tells (he is the house). His clips carry the
dealer's names (`deal_left`, `flop`, `push_right` ...), because the table
asks the dealer for those, whoever deals. Prompts: `POSES.md`. The two
ferryman sheets in `sources/rejected/` were the owner's no's ("doesn't
really scream death's partner in crime"; "unreasonably creepy").

Build:

    python3 art-tools/cut_sheet.py art-tools/angel_parts/cut_face.json
    python3 art-tools/build/pose_boxes.py art-tools/angel_parts
    python3 art-tools/build/rig_from_spec.py art-tools/angel_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/angel_parts/pose_rig.json
    python3 art-tools/angel_parts/halo.py
    python3 art-tools/build/frames_sheet.py pravuil
    python3 art-tools/angel_parts/clips.py
    python3 art-tools/build/life.py
    python3 art-tools/web_half.py pravuil

Quirks:

- The master is the rest pose's own head (`own_master`); eyes (half,
  closed, left, right, down) and two mouths (closed, open) are layers on it.
  The face sheet's heads are drawn smaller than the patches, so the fits in
  `pravuil_rig/face/fits.json` were set by hand, one scale per set (eyes
  0.32, mouths 0.365).
- Every pose but rest is a whole-figure frame with its own drawn head (the
  cards and chips drawn in his hands stay, as Death's do).
- `rail_holes` (pose_rig.py) clears the strips of drawn rail enclosed
  between his arms, which `fill_holes` would otherwise keep.
- The wings pose keeps only its `biggest` piece (the motion strokes drawn
  beside the wings are dropped).
- The dealer's idle beats: `weary` is the wings settling, `look_up` the quill
  taken from behind his ear.
- The build helpers treat him as they treat Death (no poker clips, no
  character file; life at half).

Clips (17): deal_left, deal_right, deal_you, burn, flop, turn, shuffle, cut,
rake, push_left, push_you, push_right, steeple, weary, look_up, quill, wings.

`halo.py` clears the sheet's white from inside the halo ring of the rest
body (the frames' own heads have it clear; otherwise the halo flickers white
and dark as he deals). Re-run it after every pose_rig.py.
