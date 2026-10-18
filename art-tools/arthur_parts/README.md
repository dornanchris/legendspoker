# King Arthur's parts

Camelot's champion, seat 4 (drawn facing the viewer's right; the game
mirrors him to face the table's centre). Style-locked sheets in `sources/`:
his character sheet, pose sheets A-D and his face sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Lancelot is.

    python3 art-tools/cut_sheet.py art-tools/arthur_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/arthur_parts/pose_rig.json
    python3 art-tools/web_half.py arthur

- **His head is swapped inside an outline** (`master.head_poly`, `keep_poly`),
  clear of Excalibur's hilt at his shoulder, and **`spare_red`** leaves his red
  mantle the body's own in both (the head piece's mantle never lined up).
  Sheet white caught between his curls and by the hilt is cleared.
- **Face** (`face.json`, `arthur_face/`): eyes half, closed, viewer, down,
  side, narrow; brows raised, down; mouths rest, ah, ee, oh, oo, m, f, l,
  smile (warm), sad (small); head 15 (toward the viewer).
- `table_y` is set by hand (362): his hands cover most of the felt row.

**Clips** (`web/art/arthur/anim.json`, 24, each ending at rest): check, peek,
call, bet (at once: his `snap` quirk), fold, all in, show, collect; tells
`hilt` (strong) beside `dent`, `crown` (bluffing: it slips, unfixed) beside
`wind`, `knights` (weak: looks round at each) beside `servant`; idles
`cup`, `fond`, `listen`, `look_at_you`; beats `talk`, `big_bet`,
`lost_pot` (a gracious nod), `won_pot`, `heads_up`, `knocked_out` (takes
Excalibur and bows).

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py arthur`; frames `win_big` (E2) and `lose_big` (E3), clips from `art-tools/build/reactions.py arthur`. `sources/poses_e_alt.png` is a first draw with magenta smudges on the mail, kept unused.
