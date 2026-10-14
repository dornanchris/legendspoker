# Caesar's parts

Rome's champion: he arrives in the first chair to come free, any side, so he
is drawn facing the viewer's right and the game mirrors him as the seat needs.
Style-locked sheets in `sources/`: his character sheet, pose sheets A-D and
his face sheet. `POSES.md` has the prompts.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`:

    python3 art-tools/cut_sheet.py art-tools/caesar_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/caesar_parts/pose_rig.json
    python3 art-tools/caesar_parts/clips.py
    python3 art-tools/web_half.py caesar

- **The master is the rest pose's own head and wreath**
  (`caesar_face/caesar_master.png`, rows 0-300 of A1, cut by `keep_poly`),
  as the Pope's is: no seam. Piece 20 is the head turned to the viewer.
- **Face** (`face.json`): eyes half 2, closed 3, viewer 4, down 5, side 6,
  narrow 7, raised 8, hard 9 (each with its brows); mouths rest 10, ah 11,
  ee 12, oh 13, oo 14, m 15, f 16, l 17, smile 18, tight 19. Fitted at one
  scale per set (eyes 0.64, mouths 0.63, aligned on the median right and
  bottom edges of the auto-fit: `caesar_rig/face/fits.json`).
- **Rail and skin are the same orange** (`rail_orange` with thresholds,
  `rail_blue` 40, as Spartacus), and the toga's purple border would pass the
  wood test below the table line (`no_wood`). All in and collect keep a
  sliver of rail beside their chips.
- **Arrive** (C6, setting the wreath on his head) is the `arrive` clip the
  table plays as he sits down; it and knocked out are cut at the table line.

**Clips** (`web/art/caesar/anim.json`, 24, each ending at rest): check, peek,
call, bet, fold, all in, show, collect; tells `wreath` (bluffing) beside
`temple`, `drum` (weak) beside `toga_border`, `votes` (strong) beside
`suspicion`; idles `dictate`, `appraise`, `look_at_you`; beats arrive, talk,
big bet, lost pot, won pot, heads up, knocked out.
