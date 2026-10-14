# Van Helsing's parts

Transylvania's seat 1, drawn facing the viewer's right as the game shows him.
Style-locked sheets (Washington's pose sheet A) in `sources/`; `POSES.md` has
the prompts. Stoker's professor: clean-shaven, reddish hair going grey,
bushy brows, small round spectacles, a black frock coat, a silver crucifix at
his collar and his doctor's bag on the felt by his left elbow. Nothing of the
2004 film.

## The game's puppet

Built by `art-tools/pose_rig.py` from `pose_rig.json`, the way Javert is:

    python3 art-tools/cut_sheet.py art-tools/van_helsing_parts/cut_face.json
    python3 art-tools/build/pose_boxes.py art-tools/van_helsing_parts
    python3 art-tools/build/corner_regs.py art-tools/van_helsing_parts
    python3 art-tools/pose_rig.py art-tools/van_helsing_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py van_helsing
    python3 art-tools/van_helsing_parts/clips.py
    python3 art-tools/web_half.py van_helsing

- **The master is the rest pose's own head** (`van_helsing_face/van_helsing_master.png`,
  rows 0-320 of A1, kept to the head and collar by `keep_poly`).
- **Face** (`face.json`): the eye pieces carry the spectacles and the brows:
  half 2, closed 3, viewer 4, down 5, side 6, narrow 7, wide 8; mouths rest
  13, ah 14, ee 15, oh 16, oo 17, m 18, f 21, l 22, smile 23, down 24. The
  separate brows (9-12, one brow a piece) and mouth 19 are unused. Auto-fits
  were good.
- **The doctor's bag** is part of the far forearm's piece at rest (a `props`
  box, so the rail tests spare its gold clasp) and a `props` box in every
  frame but the knocked-out one, where he picks it up. The sheet drew it
  touching the cell's right edge, so its right end is cut straight; the
  forearm polygon stops 4 pixels short of the edge (the sheet's white).
- **The waist** between his hands kept the drawn rail's dark red underside:
  `fill` repaints that strip from the coat. pose_rig's body fill now smooths
  from the coat only (it used to average in the felt past the hole's edge,
  which left a blue glow); the rest pose validates at ~2% (the repainted
  strip).
- **Chips** are `props` boxes; bet keeps a sliver of rail beside its stack,
  cut by hand (`except`). The diary is a `props` box (its brown cover read as
  rail shadow).
- His spectacles' lenses are see-through: the sheet drew them white, which
  reads as background.

**Clips** (`web/art/van_helsing/anim.json`, 24, each ending at rest): check,
peek, call, bet, fold, all in, show, collect; tells `spectacles` (strong:
off, polished on a white handkerchief) beside `diary`, `crucifix` (weak)
beside `garlic`, `mutter` (tilted, in Dutch) beside `sniff`; idles
`fireplace`, `over_spectacles`, `settle`, `look_at_you`; beats talk, big bet,
lost pot, won pot, heads up, knocked out (takes up his bag, a bow).
