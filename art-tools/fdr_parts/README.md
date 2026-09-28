# FDR's parts

Franklin D. Roosevelt's puppet kit, cut with `split_parts.py` from AI-generated
sheets made with the prompts in `CHARACTER-ART-PROMPTS.md`. Every folder has
the pieces, a numbered `_contact_sheet.png`, and `parts.json` with each piece's
position on its source sheet and a `label` saying what it is.

| Folder | Pieces | What |
|---|---|---|
| `fdr_face` | 86 | Blank head, hair, ears, brows, 25 eyes, noses, 14 mouths, pince-nez |
| `fdr_mouths` | 6 | Frown, grimace, tight-lipped, nervous, "f/v", half-smile around the holder |
| `fdr_body` | 7 | Torso with the cape and no arms, upper arms, forearms flat and raised |
| `fdr_cape` | 2 | Cape back layer and side drape |
| `fdr_hands` | 8 | Card actions: peek, check, push chips, palm up, fold, rake, fist, turn over |
| `fdr_hands_holder` | 5 | Hands holding the cigarette holder |
| `fdr_props` | 8 | The cigarette holder at several lengths and angles, one lit with smoke |

`sources/` holds the exact sheets that were cut, so any folder can be cut again:
`python3 art-tools/split_parts.py art-tools/fdr_parts/sources/fdr_face.png -o art-tools/fdr_parts`
(that rewrites `parts.json` and clears the labels, so copy them back).

Two sources were edited before cutting:

- `fdr_mouths.png`: the lip colour was matched to the face kit's closed mouth.
  As generated, the six came out redder and glossier than the other fourteen.
- `fdr_cape.png`, `fdr_hands_holder.png` and `fdr_props.png` are the usable
  pieces of an earlier collage, put back on a clean white sheet. Its torsos had
  the arms painted on, and some pieces touched.

Known gaps, none blocking:

- The blank head has the hair painted on, so the hair can't move on its own.
- Eyes are whole pieces (white, iris and lid together): swap them, don't
  move pupils.
- No two-handed all-in shove: use two copies of the push-chips hand.
- Smoke is only on the one lit holder, and ash flakes were too small to cut:
  make both in the rig.
- The chins and the back of the head were not asked for; they are unused.
- Hands are drawn for one side; mirror them for the other.
