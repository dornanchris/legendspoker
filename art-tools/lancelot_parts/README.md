# Sir Lancelot's parts

Camelot's seat 2 (facing the viewer's right, never mirrored). The first
character drawn under the style lock (`POSES.md`): `sources/` holds his
character sheet, pose sheets A-D and his face sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Merlin is: the
rest pose (A1) with the master head and its face layers, and every other
pose a whole-figure frame with its own drawn head, each placed by the
bottom-left corner of its drawn felt panel.

    python3 art-tools/cut_sheet.py art-tools/lancelot_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/lancelot_parts/pose_rig.json
    python3 art-tools/web_half.py lancelot

- **His head is swapped above his armour's collar** (`collar_y` 185),
  placed on his eyes, nose and mouth (`master.place`, 0.62).
- **Face** (`face.json`, `lancelot_face/`): eyes half, closed, viewer, down,
  side, narrow; brows raised, down; mouths rest, ah, ee, oh, oo, m, f, l,
  sigh, smile (dazzling), proud (thin), set (wounded); head 18 (toward the
  viewer). Piece 17 is a spare open mouth. The automatic fit lost most of the
  mouths (it chose half scale, on his chin), so `lancelot_rig/face/fits.json`
  holds them refitted at the scale of the one it got right (0.91), and the
  down eyes and raised brows likewise.
- **Chips** in call, bet, all in, collect and won pot are kept whole (`props`).

**Clips** (`web/art/lancelot/anim.json`, 24, each ending at rest; preview
`web/index.html#/puppet/lancelot`): check, peek, call, bet, fold, all in,
show, collect; tells `polish` (strong: polishes his gauntlet) beside
`reflection`, `hair` (bluffing: tosses his hair) beside `sigh`, `door`
(weak) beside `chair`; idles `sword`, `bored`, `proud`, `look_at_you`; beats
`talk`, `big_bet`, `lost_pot` (wounded pride), `won_pot` (a dazzling smile),
`heads_up`, `knocked_out` (a stiff bow, turning away). Cued by their words
(`cues`); `bored`, `proud` and `look_at_you` are wordless fidgets.

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py lancelot`; frames `win_big` (E2) and `lose_big` (E3), clips from `art-tools/build/reactions.py lancelot`.
