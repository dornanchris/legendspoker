# Theodore Roosevelt: parts sheets for a Rive artist

Teddy drawn ONCE, as separate parts, for an animator to rig in Rive (bones,
meshes, IK). The 24 pose drawings in `sources/poses_a-d.png` stay as the
animator's reference for how each move should look; they are no longer cut
into the game's assets. The motions the parts must cover are in the
animation brief (the owner's Claude Doc, "Teddy Roosevelt: Animation Brief").

Six images. Attach, in this order, to EVERY prompt:
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

The rules, said once in every prompt:

> Rigging rules: every joint end is ROUNDED and runs a little past the joint,
> so the next piece can turn under it without a gap. Draw anything another
> piece covers COMPLETE, as if that piece were not there. No shading or cast
> shadow from one piece may be drawn onto another. Sleeves are drawn
> straight, not bent. Shading stays inside each piece and never crosses a
> joint.

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
7. The gold watch chain alone, as it hangs across the waistcoat (it swings when he moves)

Rigging rules: every joint end is ROUNDED and runs a little past the joint, so the next piece can turn under it without a gap. Draw anything another piece covers COMPLETE, as if that piece were not there. No shading or cast shadow from one piece may be drawn onto another. Sleeves are drawn straight, not bent. Shading stays inside each piece and never crosses a joint.

Keep exactly the style of the attached images. No cigar, pipe or cigarette anywhere.
```

## 2. Right arm and hands: table moves (empty hands)

```
Rigging parts sheet for 2D cut-out animation: Theodore Roosevelt's RIGHT ARM (the one nearer the viewer) AND HANDS, exactly as in the FIRST attached image's top-left pose (seated at a poker table, three-quarter view facing the viewer's right, forearms along the table's edge, hands resting apart) and the SECOND attached character sheet: the same brown jacket sleeve, the same white shirt cuff and cufflink, the same skin colour, line weight and style. Every piece drawn at EXACTLY the size and angle it has in that top-left pose, so it can be laid back over it.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no body, no head, no table. The hands are EMPTY: no cards, no chips, nothing held.

- The forearm: the jacket sleeve from the elbow to the wrist with the white shirt cuff showing, its elbow end ROUNDED and drawn a little longer than needed (it hides under the upper arm), its wrist end open: NO hand
- Hands, each on its own, each with a short stub of wrist that runs INTO the cuff (so it can turn inside it without a gap), each at the angle it would have at the end of that forearm:
  1. resting flat on the felt, relaxed, fingers together (exactly as in the top-left pose)
  2. a loose fist, knuckles down, rapping the table
  3. cupped low, palm down, thumb lifted a little, as if shielding something small on the table
  4. flat, palm down, fingertips leading, pushing forward along the table
  5. fingers spread, the wrist flicked outward, a dismissive flick
  6. turning palm up, fingers loose, as if turning something over
  7. the side of the hand down on the table, fingers curled, sweeping in toward him
  8. the fingers raised a little, ready to drum on the table
  9. open and flat, slapping down on the table

Rigging rules: every joint end is ROUNDED and runs a little past the joint, so the next piece can turn under it without a gap. Draw anything another piece covers COMPLETE, as if that piece were not there. No shading or cast shadow from one piece may be drawn onto another. Sleeves are drawn straight, not bent. Shading stays inside each piece and never crosses a joint.

Keep exactly the style of the attached images.
```

## 3. Right hands: gestures

```
Rigging parts sheet for 2D cut-out animation: more of Theodore Roosevelt's RIGHT HANDS (the hand nearer the viewer), exactly matching the FIRST attached image's top-left pose and the SECOND attached character sheet: the same white shirt cuff and cufflink, the same skin colour, line weight and style. Every hand drawn at EXACTLY the size it has in that top-left pose.

Pure white background (#FFFFFF). Every hand separate, each with a short stub of wrist that runs into the shirt cuff (the cuff drawn on, the jacket sleeve NOT), a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no body, no head, no table.

  1. a tight fist, knuckles toward the viewer, as when he raises it to make a point or pumps it in triumph
  2. a tight fist seen from the little-finger side, as when he brings it down on the table
  3. the index finger extended straight, the other fingers curled, pointing
  4. the index finger tapping down, the other fingers curled
  5. open, palm up, fingers a little spread (explaining, or "come on, then")
  6. open, palm toward the viewer, fingers together (a wave, or "steady")
  7. held out to shake hands, thumb up, fingers together
  8. thumb and forefinger pinching the end of a moustache
  9. the index finger pushing up the bridge of a pair of spectacles (the finger only; no spectacles)
  10. holding a crumpled white handkerchief, rubbing
  11. a thumbs-up

Rigging rules: every joint end is ROUNDED and runs a little past the joint, so the next piece can turn under it without a gap. No shading or cast shadow from one piece may be drawn onto another. Shading stays inside each piece and never crosses a joint.

Keep exactly the style of the attached images.
```

## 4. Left arm, hands and props

```
Rigging parts sheet for 2D cut-out animation: Theodore Roosevelt's LEFT ARM (the one further from the viewer) AND HANDS, and his PROPS, exactly as in the FIRST attached image's top-left pose (seated at a poker table, three-quarter view facing the viewer's right, forearms along the table's edge, hands resting apart) and the SECOND attached character sheet: the same brown jacket sleeve, white shirt cuff, skin colour, line weight and style. Every piece drawn at EXACTLY the size and angle it has in that top-left pose, so it can be laid back over it.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no body, no head, no table.

- The forearm: the jacket sleeve from the elbow to the wrist with the white shirt cuff showing, its elbow end ROUNDED and drawn a little longer than needed, its wrist end open: NO hand
- Hands, each with a short stub of wrist that runs INTO the cuff, each at the angle it would have at the end of that forearm:
  1. resting flat on the felt, relaxed (exactly as in the top-left pose)
  2. holding a pair of round steel spectacles by the bridge, lifted
  3. holding an open gold pocket watch in the palm, its chain running off the edge of the piece
  4. a tight fist, knuckles toward the viewer, raised
  5. the side of the hand down on the table, fingers curled, sweeping in toward him
  6. open, palm down, flat on the felt, pressing (leaning his weight on it)
- Props, each on its own:
  7. his round steel spectacles alone, at the angle they sit on his face in that pose
  8. his round steel spectacles alone, folded, held flat
  9. a crumpled white handkerchief alone
  10. an open gold pocket watch alone, face toward the viewer, and the same watch closed

Rigging rules: every joint end is ROUNDED and runs a little past the joint, so the next piece can turn under it without a gap. Draw anything another piece covers COMPLETE, as if that piece were not there. No shading or cast shadow from one piece may be drawn onto another. Sleeves are drawn straight, not bent. Shading stays inside each piece and never crosses a joint.

Keep exactly the style of the attached images.
```

## 5. Head and face

```
Rigging parts sheet for 2D cut-out animation: Theodore Roosevelt's HEAD AND FACE, exactly matching the attached images' style, colours and line weight. Every piece is drawn at EXACTLY the angle and size of his head in the FIRST attached image's top-left pose (three-quarter, facing the viewer's right), so each one can be laid over that head.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. No text, no labels.

1. The head WITHOUT spectacles, eyes, brows, moustache or mouth: the hair, ears and skin of the face, with the eye sockets, the area under the moustache and the mouth drawn as plain skin; on a LONG neck that runs well down below the collar line (so the head can turn without a gap)
2. The eyes as empty whites with no pupils (both eyes as one piece, with the skin around them); then the two dark pupils on their own
3. Upper eyelids half closed, and closed (one piece each, both eyes), drawn to lie over the empty whites
4. Brows, both brows as one piece each: at rest; raised high; drawn down hard and together (a scowl); one raised, one down (doubtful)
5. The heavy moustache alone, as at rest
6. Mouths, each the mouth and lips with a little skin around, drawn to sit UNDER the moustache: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"
7. Mouths for expressions, the same way: the enormous grin, ALL teeth, wide and square; a big open laugh; a shout, wide open, jaw dropped; teeth gritted; a scowl, lips turned down; a satisfied closed smile
8. The whole head with face, spectacles on, three more times: turned toward the viewer, nearly front-on; thrown back, laughing; chin down, glaring over the spectacles

Rigging rules: every joint end is ROUNDED and runs a little past the joint, so the next piece can turn under it without a gap. Draw anything another piece covers COMPLETE, as if that piece were not there. No shading or cast shadow from one piece may be drawn onto another.

Keep exactly the style of the attached images. No cigar, pipe or cigarette.
```

## 6. Reference poses for the new moments

These are not cut up: they show the animator what the new animations should
look like (the brief's winning, losing and charge moments). Same layout as his
pose sheets.

```
Character pose sheet for 2D animation reference: Theodore Roosevelt, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same place in each cell, same table edge height, same brown three-piece suit, round steel spectacles, heavy moustache and barrel chest.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge (raised fists included). Nothing below the table edge.

1. A huge win: both fists thrown up high above his head, chest out, head back, mouth wide open in a shout of triumph
2. A big win: one fist punched up beside his head, the enormous grin, all teeth
3. A crushing loss: his right fist brought down hard on the felt, teeth gritted, glaring at the table
4. Knocked out: standing up from the table, right hand held out to shake hands, chin up, smiling through it
5. Charging in: leaning far forward over the table on his left forearm, his empty right hand shoved flat toward the middle of the table, jaw set
6. Waiting on a decision: arms folded across his chest, leaning back, one brow raised, impatient

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No cigar, pipe or cigarette.
```
