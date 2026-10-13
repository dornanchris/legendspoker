# The Green Knight's parts (helmed)

Camelot's seat 3 (drawn facing the viewer's right; the game mirrors him to
face the table's centre). Two figures, the owner's design: this one, HELMED
in green plate for his first sitting, and `green_knight_bare_parts/`, beaten
and bareheaded after his return. `sources/` holds his character sheet, pose
sheets A-D and his face sheet (the eyes in his visor).

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json` the way Lancelot is,
a quarter bigger as the Cyclops is (`scale` 1.25, `origin_x` 225): the giant.

    python3 art-tools/cut_sheet.py art-tools/green_knight_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/green_knight_parts/pose_rig.json
    python3 art-tools/web_half.py green_knight

- **No mouth.** His face is the visor: eight eye pieces (half, closed,
  viewer, down, side, narrow, wide, laugh), each the whole visor plate. He
  talks with his helm: `speech.nod` in anim.json nods it on each open sound
  (`web/puppet/face.ts`).
- **The holly branch** is a prop of the rest pose on the torso, drawn over
  the master helm.
- **Felt**: `felt_blue` and `felt_teal` (this sheet's felt is the bluest
  yet; his armour is green, so the plain felt test would take it).
- **Knocked out** (D6) shows the blow as a small red nick at his neck under
  the helm, a cartoon nick, never gore.

**Clips** (`web/art/green_knight/anim.json`, 24, each ending at rest):
check, peek, call, bet, fold, all in, show, collect; tells `holly` (strong)
beside `moss`, `laugh` (bluffing) beside `grin`, `axe` (weak) beside
`measure`; idles `door`, `creak`, `lean_back`, `look_at_you`; beats `talk`,
`big_bet`, `lost_pot`, `won_pot`, `heads_up`, `knocked_out`.
