# Lincoln's parts

Abraham Lincoln's puppet kit, cut with `split_parts.py` from one AI-generated
sheet (`sources/lincoln_sheet.png`). He is the first character drawn to the
art direction: three-quarter view, turned to face the table's centre, in the
flat cartoon style, hat on at all times. The sheet draws him facing both ways;
the puppet uses the facing-right set and is flipped for seats on the right.

`lincoln/` holds the 100 pieces, a numbered `_contact_sheet.png`, and
`parts.json` with a `label` on every piece, saying which facing set it
belongs to.

| Pieces | What |
|---|---|
| 1, 10 | Reference portraits, facing right and facing left |
| 2-5, 6-9 | Finished heads with the hat on: neutral, glancing, tired, small smile (each way) |
| 11-48, 50 | Hair, brows, eyes, noses, mouths, for each facing set |
| 12, 49 | Blank heads: turned nearly to profile, further than the finished heads, so not used |
| 54-67 | Ears and beard mouth patches |
| 51-69 (hats) | Nine loose stovepipe hats |
| 70-77 | Torsos: nearly front-on, three-quarter each way, turned further, and from behind |
| 78-86 | Arms and forearms, bent and straight |
| 87-100 | Hands, each with its cuff: 87-93 for arms pointing right, 94-100 for arms pointing left |

## The puppet

`art-tools/lincoln_layout.json` is his rest pose, facing right: torso 71,
head 2, the near arm (83) bent across in front of him and the far forearm (80)
coming from behind, both lying on the felt with the hands toward the table's
centre. `preview.png` is that pose; `preview_expressions.png` shows the head
swaps and a pinching hand.

    python3 art-tools/build_puppet.py render art-tools/lincoln_layout.json -o preview.png

The sleeves' own shirt cuffs end in an opening drawn facing the camera, while
the hands point at the table's centre, so the two could never line up.
`lincoln_rig/` holds every sleeve with its cuff trimmed off
(`sleeve_78.png` ... `sleeve_86.png`), and `cuffs.json` records where each
cuff was: each hand's own cuff is placed exactly there, so it finishes the
sleeve. The arms sit under the torso and are `on_table`, like Death's.

## Gaps

- **No hat tip yet.** Every finished head has the hat drawn on. Tipping it
  needs the same heads without the hat (hair on top), with a loose hat over
  them; the blank heads are turned too far to use.
- The pieces were drawn at different scales (the eyes and noses about twice
  the heads' scale), so the face is used whole rather than rebuilt from parts.
- Expressions are subtle; the beard mouth patches (56, 58, 59) are the way to
  add more if they are needed.
