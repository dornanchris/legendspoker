# Spartacus's parts

Rome's seat 1 (drawn facing the viewer's right, as the game shows him).
Style-locked sheets in `sources/`: his character sheet, pose sheets A-D and
his face sheet. `POSES.md` has the prompts.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`, the way Scipio is:

    python3 art-tools/cut_sheet.py art-tools/spartacus_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/spartacus_parts/pose_rig.json
    python3 art-tools/spartacus_parts/clips.py
    python3 art-tools/web_half.py spartacus

- **Master head:** face piece 01 at scale 0.63 (`place`, from
  `art-tools/build/fit_master.py`), cut at the beard (`keep_poly`): his own
  cloak and neck below it are the body's. Piece 20 is the head turned to the
  viewer.
- **Face** (`face.json`): eyes half 2, closed 3, viewer 4, down 5, side 6,
  narrow 7, raised 8, hard 9 (each with its brows); mouths rest 10, ah 11,
  ee 12, oh 13, oo 14, m 15, f 16, l 17, grin 18, set 19. The mouths are
  fitted by hand at one scale (0.93, right-aligned on the jaw:
  `spartacus_rig/face/fits.json`): the auto-fit shrank ee and grin.
- **Rail and skin are the same orange.** `rail_orange` takes thresholds
  (`{"red": 120, "blue": 24}`), `rail_blue` 40 keeps the red rail test off
  his shadowed skin (it ate his far hand), `rail_band` [45, 90]. All in and
  won pot keep a sliver of rail beside their chips.
- **Knocked out** is drawn standing: placed lower (`reg`) and cut at the
  table line (`poly`).

**Clips** (`web/art/spartacus/anim.json`, 24, each ending at rest): check,
peek, call, bet (hard), fold, all in, show, collect; tells `shoulders`
(strong) beside `neck`, `scar` (tilted) beside `flex`, `stare` (bluffing)
beside `doors`; idles `table_weight`, `laugh`, `arms_folded`,
`look_at_you`; beats talk, big bet, lost pot, won pot, heads up, knocked
out. Every pose but rest is a whole-figure frame with its own drawn head.

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py spartacus`; frames `win_big` (E2) and `lose_big` (E3), clips from `art-tools/build/reactions.py spartacus`.
