# Theodore Roosevelt: parts sheets for a Rive artist

Teddy drawn ONCE, as separate parts, for an animator to rig in Rive (bones,
meshes, IK). The 24 pose drawings in `sources/poses_a-d.png` stay as the
animator's reference for how each move should look; they are no longer cut
into the game's assets. The motions are in the animation brief (the owner's
Claude Doc, "Teddy Roosevelt: Animation Brief"): the essentials only (the
owner: 40 characters, so no 2,000 animations), a rig that breathes, blinks,
glances and talks, and 15 animations:

| Group | Animations |
|---|---|
| Actions | peek, check, bet (calls and raises too), all_in, fold |
| Results | win, win_big, lose, knocked_out |
| Tells and decoys | grin / laugh, drum / tap, polish / push_specs |

The parts below cover exactly those; more animations later will need more
hands (draw them then).

Five images. Attach, in this order, to EVERY prompt:
`sources/poses_a.png` (his rest pose is top left) and
`sources/roosevelt_sheet.png`. Only his own sheets: another character's
sheet attached once put Washington's lace cuffs on FDR.

What is different from a pose sheet, and why:

- **Joint ends are rounded and run past the joint**, so a piece can turn under
  the next without a gap (the shoulder, the elbow, the wrist inside the cuff,
  the neck inside the collar).
- **Covered things are drawn complete.** The torso is drawn with no arms and
  the waistcoat and coat whole where his forearms lie; Washington's IK test
  showed a smear there that every lifted arm uncovered.
- **No shading crosses a joint, and nothing casts a shadow on another piece**
  (no arm shadow on the coat): the pieces move, and the shadows would not.
- **Sleeves are drawn straight**; the rig bends them.
- **His hands are always empty.** No cards or chips are drawn or held: the
  game's own card and chip animations carry them, and his hands make the
  motion over the felt (the owner's call: simpler for the artist and for us).
- **The face is layered**: empty eye whites with separate pupils (he can look
  anywhere), lids, brows, the moustache over a separate mouth, the spectacles
  their own piece (his tilt tell takes them off).

## 1. Body

```
Rigging parts sheet for 2D cut-out animation: Theodore Roosevelt's BODY, exactly as in the FIRST attached image's top-left pose (seated at a poker table, three-quarter view facing the viewer's right, forearms along the table's edge, hands resting apart) and the SECOND attached character sheet: the same brown three-piece suit, waistcoat, gold watch chain, white shirt and maroon tie, the same barrel chest, the same colours, line weight and style. Every piece drawn at EXACTLY the size and angle it has in that top-left pose, so it can be laid back over it.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no table, no chair.

1. The torso WITHOUT ARMS and WITHOUT HEAD: jacket, waistcoat, watch chain, shirt front and tie, from the shirt collar down to well below where the table's edge would be; the waistcoat and jacket drawn complete and unbroken where his forearms and hands would lie, with no shadow of the arms on them; the shoulders end in rounded sockets where the sleeves join; the open shirt collar empty at the top, with the inside of the collar drawn (the neck will sit in it)
2. His near upper arm (the right arm, nearer the viewer): the jacket sleeve from the shoulder to just past the elbow, hanging down as at rest, both ends rounded
3. His far upper arm (the left arm), the same
4. His near upper arm RAISED straight up above the shoulder, as it looks from this angle, both ends rounded (for throwing both arms over his head)
5. His far upper arm raised straight up, the same
6. Both forearms FOLDED across his chest, as one piece: sleeves and hands, the hands tucked under the elbows, as it lies in front of the torso (for folding his arms in a scowl)

Rigging rules: every joint end is ROUNDED and runs a little past the joint, so the next piece can turn under it without a gap. Draw anything another piece covers COMPLETE, as if that piece were not there. No shading or cast shadow from one piece may be drawn onto another. Sleeves are drawn straight, not bent. Shading stays inside each piece and never crosses a joint.

Keep exactly the style of the attached images. No cigar, pipe or cigarette anywhere.
```

## 2. Right arm and hands

```
Rigging parts sheet for 2D cut-out animation: Theodore Roosevelt's RIGHT ARM (the one nearer the viewer) AND HANDS, exactly as in the FIRST attached image's top-left pose (seated at a poker table, three-quarter view facing the viewer's right, forearms along the table's edge, hands resting apart) and the SECOND attached character sheet: the same brown jacket sleeve, the same white shirt cuff and cufflink, the same skin colour, line weight and style. Every piece drawn at EXACTLY the size and angle it has in that top-left pose, so it can be laid back over it.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no body, no head, no table. The hands are EMPTY: no cards, no chips.

- The forearm: the jacket sleeve from the elbow to the wrist with the white shirt cuff showing, its elbow end ROUNDED and drawn a little longer than needed (it hides under the upper arm), its wrist end open: NO hand
- Hands, each on its own, each with a short stub of wrist that runs INTO the cuff (so it can turn inside it without a gap), each at the angle it would have at the end of that forearm:
  1. resting flat on the felt, relaxed, fingers together (exactly as in the top-left pose)
  2. a loose fist, knuckles down, rapping the table
  3. cupped low, palm down, thumb lifted a little, as if shielding something small on the table
  4. flat, palm down, fingertips leading, pushing forward along the table
  5. fingers spread, the wrist flicked outward, a dismissive flick
  6. the side of the hand down on the table, fingers curled, sweeping in toward him
  7. the fingers raised a little, ready to drum on the table
  8. the index finger tapping down, the other fingers curled
  9. a tight fist, knuckles toward the viewer, raised in triumph
  10. held out to shake hands, thumb up, fingers together
  11. the index finger pushing up the bridge of a pair of spectacles (the finger only; no spectacles)
  12. holding a crumpled white handkerchief, rubbing

Rigging rules: every joint end is ROUNDED and runs a little past the joint, so the next piece can turn under it without a gap. Draw anything another piece covers COMPLETE, as if that piece were not there. No shading or cast shadow from one piece may be drawn onto another. Sleeves are drawn straight, not bent. Shading stays inside each piece and never crosses a joint.

Keep exactly the style of the attached images.
```

## 3. Left arm, hands and props

```
Rigging parts sheet for 2D cut-out animation: Theodore Roosevelt's LEFT ARM (the one further from the viewer) AND HANDS, and his PROPS, exactly as in the FIRST attached image's top-left pose (seated at a poker table, three-quarter view facing the viewer's right, forearms along the table's edge, hands resting apart) and the SECOND attached character sheet: the same brown jacket sleeve, white shirt cuff, skin colour, line weight and style. Every piece drawn at EXACTLY the size and angle it has in that top-left pose, so it can be laid back over it.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no body, no head, no table.

- The forearm: the jacket sleeve from the elbow to the wrist with the white shirt cuff showing, its elbow end ROUNDED and drawn a little longer than needed, its wrist end open: NO hand
- Hands, each with a short stub of wrist that runs INTO the cuff, each at the angle it would have at the end of that forearm:
  1. resting flat on the felt, relaxed (exactly as in the top-left pose)
  2. holding a pair of round steel spectacles by the bridge, lifted
  3. a tight fist, knuckles toward the viewer, raised in triumph
  4. the side of the hand down on the table, fingers curled, sweeping in toward him
- Props, each on its own:
  5. his round steel spectacles alone, at the angle they sit on his face in that pose
  6. his round steel spectacles alone, folded, held flat
  7. a crumpled white handkerchief alone

Rigging rules: every joint end is ROUNDED and runs a little past the joint, so the next piece can turn under it without a gap. Draw anything another piece covers COMPLETE, as if that piece were not there. No shading or cast shadow from one piece may be drawn onto another. Sleeves are drawn straight, not bent. Shading stays inside each piece and never crosses a joint.

Keep exactly the style of the attached images.
```

## 4. Head and face

```
Rigging parts sheet for 2D cut-out animation: Theodore Roosevelt's HEAD AND FACE, exactly matching the attached images' style, colours and line weight. Every piece is drawn at EXACTLY the angle and size of his head in the FIRST attached image's top-left pose (three-quarter, facing the viewer's right), so each one can be laid over that head.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. No text, no labels.

1. The head WITHOUT spectacles, eyes, brows, moustache or mouth: the hair, ears and skin of the face, with the eye sockets, the area under the moustache and the mouth drawn as plain skin; on a LONG neck that runs well down below the collar line (so the head can turn without a gap)
2. The eyes as empty whites with no pupils (both eyes as one piece, with the skin around them); then the two dark pupils on their own
3. Upper eyelids half closed, and closed (one piece each, both eyes), drawn to lie over the empty whites
4. Brows, both brows as one piece each: at rest; raised high; drawn down hard and together (a scowl)
5. The heavy moustache alone, as at rest
6. Mouths, each the mouth and lips with a little skin around, drawn to sit UNDER the moustache: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"
7. Mouths for expressions, the same way: the enormous grin, ALL teeth, wide and square; a big open laugh; a shout, wide open, jaw dropped; a scowl, lips turned down; a satisfied closed smile
8. The whole head with face, spectacles on, two more times: thrown back, laughing; turned toward the viewer, nearly front-on

Rigging rules: every joint end is ROUNDED and runs a little past the joint, so the next piece can turn under it without a gap. Draw anything another piece covers COMPLETE, as if that piece were not there. No shading or cast shadow from one piece may be drawn onto another.

Keep exactly the style of the attached images. No cigar, pipe or cigarette.
```

## 5. New poses

Not cut up: the two moments his pose sheets do not show, for the animator.

```
Character pose sheet for 2D animation reference: Theodore Roosevelt, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same brown three-piece suit, round steel spectacles, heavy moustache and barrel chest.

Draw 2 poses side by side. Each pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the edge of the picture (raised fists included). Nothing below the table edge.

1. A huge win: both fists thrown up high above his head, chest out, head back, mouth wide open in a shout of triumph
2. Knocked out: standing up from the table, right hand held out toward the viewer to shake hands, chin up, smiling through it

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No cigar, pipe or cigarette.
```
