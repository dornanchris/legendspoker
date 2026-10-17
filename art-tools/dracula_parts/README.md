# Count Dracula's kit

Transylvania's champion: he watches from the chair by the fire (a presence
piece in the room) and sits down in the first chair to come free, so he is
drawn facing right and mirrored as the seat needs. Gothic sheets in
`sources/` from `POSES.md` (`poses_spec.json`), in the owner's look
(`sources/look_reference.png`, `look_reference_seated.png`: young, caped,
red-eyed; the cape is the 1927 stage play's, Lugosi and Universal stay out).
The pre-gothic parts kit (the Rive-era sheets) is kept in `old_parts/`.

Built the way Jekyll is, from a short `rig_spec.json`:

    python3 art-tools/cut_sheet.py art-tools/dracula_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/dracula_parts dracula 320
    python3 art-tools/build/pose_boxes.py art-tools/dracula_parts
    python3 art-tools/build/corner_regs.py art-tools/dracula_parts
    python3 art-tools/build/rig_from_spec.py art-tools/dracula_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/dracula_parts/pose_rig.json   (minutes: 19 face fits)
    python3 art-tools/build/frames_sheet.py dracula
    python3 art-tools/dracula_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py dracula; python3 art-tools/build/portraits.py

`face.json` says which face piece is which: eyes, the raised brow and the
frown, eleven mouths (the open ones show the fangs).

- `wood_rows_only`, no `drop_wood`: his cape's lining is the wood's red.
- The chalice is a props box in the near forearm's piece and every frame but
  `sip` (C2) and `swirl` (C5), where he holds it. The sheet's C5 drew a
  second chalice on the felt as well: `except` cuts it, and a `fill` paints
  his coat into the hole above the table line.
- Tells: `eyebrow` (strong) beside `smile`, `sip` (bluffing; also an idle,
  the same clip), `steeple` (weak) beside `fingernail`; idle `pulse`;
  fidgets `turn` (C4 barely turns: redraw if it reads as rest), `swirl`;
  `arrive` (C6) sweeps his cape back as he sits.
