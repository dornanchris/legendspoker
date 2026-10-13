# Socrates's parts

The first of the Athens table (seat 1, facing the viewer's right, never
mirrored). Drawn from the prompts in `POSES.md`; the sources are in
`sources/`: two takes of his character sheet (`socrates_sheet.png` matches
the pose sheets and is the reference; `socrates_sheet_alt.png` is the other),
four pose sheets and his face sheet.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`, the way Death was:
the rest pose (A1, hands apart, the cup by his left hand) with the master
head and its face layers, and **every other pose a whole-figure frame with
its own drawn head**, so each expression is exactly as drawn.

    python3 art-tools/cut_sheet.py art-tools/socrates_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/socrates_parts/pose_rig.json
    python3 art-tools/web_half.py socrates

- **Placement**: his drawings are one size and one table, so each pose is
  placed (`reg`) by the apex of its drawn rail, fitted with the rail's shared
  curvature (registering on the cloak landed every pose at the scale search's
  edge).
- **Face** (`face.json`, `socrates_face/`): eyes half, closed, viewer, down,
  up, wide; brows raised, frown; mouths rest, ah, ee, oh, oo, m, f, l, teeth,
  private (the small smile), smile, laugh, puzzled; heads 23 (frowning up at
  the ceiling) and 24 (toward the viewer). Each mouth patch is the whole
  beard; its region keeps only the mouth. The laugh mouth fitted small
  (scale 0.53) but sits right.
- **His cloak is light**, so the replaced head's shoulders are filled from
  cloth of that brightness (`master.cloth`), and his bare arms are the rail's
  orange: the rail is dropped only where it has less blue than skin
  (`rail_blue`).
- **Chips** drawn in call, bet, all in and collect are kept whole (`props`).
- The near (left) arm runs off the edge of every cell, so his left side ends
  in a straight cut; at the table it is at the screen's edge.

**Clips** (`web/art/socrates/anim.json`, 25, each ending at rest; preview
`web/index.html#/puppet/socrates`): check, peek, call, bet, fold, all in,
show, collect; tells `nose` (bluffing) beside `beard`, `private_smile`
(strong) beside `smile`, `ceiling` (weak) beside `thinking`; idles `sip`,
`stretch`, `cloak`, `laugh`, `look_at_you`; beats `talk`, `big_bet`,
`lost_pot`, `won_pot` (a toast), `heads_up`, `knocked_out` (the cup turned
upside down). His tells and idles are cued by their words (`cues`).
