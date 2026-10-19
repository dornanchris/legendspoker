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

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py green_knight`; frames `win_big` (E2) and `lose_big` (E3), clips from `art-tools/build/reactions.py green_knight`. The fit reads low (61-73%) only because the holly branch is drawn differently; the body lines up.

**Cleanup pass (both looks).** The felt test counts dark armour as felt unless
`felt_bg` 0.7 (felt's blue is most of its green, his plate's is not; the
felt's navy shadow under the rail counts as felt too); the rail tests take
only long thin pieces (`rail_min_w` 60), so gold wrist bands crossing the rail
stay, and `seam_fill` puts back a short run cut across an arm. The far rest
gauntlet has a `restore` box where the rail runs into its gold band;
`lost_pot` has an `inpaint` box over the white shock strokes on his chest;
`rail_clean_w` 200 keeps rail_clean off his gauntlet bands in the reactions.

**The helm and his shoulders.** The master helm comes from the face sheet,
which drew his shoulders a little differently, so its lower edge made a seam
through both roundels. The master keeps only the helm (`keep_poly`), and the
body loses only the rest pose's own helm (`head_poly`, not the head box), so
the shoulder plates are the body's own and whole. The holly drops the sheet's
white and grey between its twigs (`drop_white`: 12, pieces that size or more,
so a berry's highlight stays).
