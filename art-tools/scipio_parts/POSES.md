# Scipio Africanus: every pose, and the prompts

Rome's seat 4 (the player's right): drawn facing the viewer's right and MIRRORED by the game to face the table's centre. Built the way Arthur is (`art-tools/pose_rig.py`), style-locked.

His look, from his character file: a clean-shaven Roman general in his thirties, short dark hair, a calm, watchful face; a red general's cloak worn loose in the Greek fashion (Cato complained of it) over a plain bronze cuirass. No helmet and no laurel: the wreath is Caesar's, and it waits by the door. His tell surface is a small carved ivory elephant, a trophy from Zama, standing on the felt by his right hand (the outside of the table once he is mirrored, clear of Death): he moves it aside, turns it to face the door, or taps its trunk.

Ruled out (his character file): the 1937 Italian film Scipione l'africano and any modern portrayal; never the straight-arm 'Roman salute', a modern invention with the worst possible associations. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: moving the elephant out of the way (strong) beside tapping its trunk; looking up as though advised from above (bluffing) beside studying each player in turn; turning the elephant to face the door (weak) beside setting his chips out in ranks with lanes between them (Zama).

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the ivory elephant on the felt by his right hand | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, measured, well forward | MECH |
| A6 | Fold: lays his cards down, unhurried | MECH |
| B1 | All in: both hands push his whole stack, decisive | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Moves the ivory elephant out of the way, to the side | TELL |
| B5 | Taps the ivory elephant's trunk with one finger (decoy for B4) | IDLE |
| B6 | Looks up, as though someone above had advised him | TELL |
| C1 | Studies each player in turn, like a map: head turned, eyes narrowed (decoy for B6) | IDLE |
| C2 | Turns the ivory elephant to face the door | TELL |
| C3 | Sets his chips out in ranks, with lanes between them (decoy for C2) | IDLE |
| C4 | Straightens his cloak at the shoulder, Greek fashion | IDLE |
| C5 | A calm, appraising look straight at the viewer | IDLE |
| C6 | Chin resting on his right fist, watching | IDLE |
| D1 | Talking: an open hand, measured | BEAT |
| D2 | Facing a big bet: a steady stare, brows drawn a little | BEAT |
| D3 | Lost a pot: a short nod, a soldier's acceptance | BEAT |
| D4 | Won a pot: a small, satisfied smile, drawing the chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes level | BEAT |
| D6 | Knocked out: rises, the elephant under his arm, a nod to the table | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Scipio's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Scipio Africanus, the Roman general who beat Hannibal at Zama in 202 BC, as Polybius and Livy describe him. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no striped surcoat, no long hair. Take the STYLE from the SECOND attached image.

Scipio: a Roman general in his thirties, fit and upright; a clean-shaven, strong, calm face with a firm jaw and level, watchful dark eyes, short dark hair combed forward; a plain bronze muscled cuirass with simple leather strips at the shoulders; a deep red general's cloak worn loose and draped over his left shoulder, Greek fashion, fastened with a round bronze brooch; a plain white tunic sleeve at each upper arm. His prop: a small carved ivory elephant, creamy white with a raised trunk, standing on its own, about as tall as his hand is long. Composed, intelligent, a little dry; a soldier who reads people. NO helmet, NO laurel wreath, NO sword drawn. Nothing from any film or television portrayal.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck and the top of the cloak and cuirass: neutral, watchful; talking, mouth open mid-word; a small, dry smile; looking up, as though listening to someone above
- The torso in cuirass and cloak: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two bare forearms, lying on a table, pointing toward its centre, open at the elbow end
- The ivory elephant on its own, three ways: facing the viewer's right; facing the viewer's left; facing the viewer
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the ivory elephant standing on the felt beside his right hand (the left of the picture): neutral; moving the elephant aside; looking up; turning the elephant to face away

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Scipio Africanus, exactly as on the attached character sheet (a clean-shaven Roman general in his thirties, short dark hair, a calm, watchful face, a red general's cloak worn loose over his left shoulder in the Greek fashion over a plain bronze cuirass, and a small carved ivory elephant, about as tall as his hand is long, standing on the felt beside his right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his head included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The ivory elephant stands on the felt beside his right hand (the left of the picture), facing the middle of the table, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the ivory elephant standing on the felt beside his right hand; a calm, watchful look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand setting a stack of chips down, measured, well forward
6. Folding: his right hand laying two cards down face down, unhurried

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no laurel wreath, no sword drawn, no raised-arm salute, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Scipio Africanus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, red cloak, bronze cuirass and ivory elephant.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The ivory elephant stands on the felt beside his right hand (the left of the picture), facing the middle of the table, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward, decisive
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. Moving the ivory elephant out of the way: his right hand lifting it and setting it down further to the side, eyes on the table
5. Tapping the ivory elephant's trunk with one finger of his right hand, idly, the elephant where it stands at rest
6. Looking up, chin raised, eyes toward the ceiling, as though someone above had just advised him; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no laurel wreath, no sword drawn, no raised-arm salute, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Scipio Africanus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, red cloak, bronze cuirass and ivory elephant.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The ivory elephant stands on the felt beside his right hand (the left of the picture), facing the middle of the table, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Studying each player in turn, like a map: head turned a little to his left, eyes narrowed, measuring; arms as at rest
2. Turning the ivory elephant round with his right hand so it faces away from the table, toward a door
3. Setting his chips out in neat ranks with lanes between them, his right hand placing one stack
4. Straightening his red cloak at the shoulder with his right hand
5. A calm, appraising look straight at the viewer; arms as at rest
6. His chin resting on his right fist, elbow on the table, watching

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no laurel wreath, no sword drawn, no raised-arm salute, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Scipio Africanus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, red cloak, bronze cuirass and ivory elephant.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The ivory elephant stands on the felt beside his right hand (the left of the picture), facing the middle of the table, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right hand open, palm up, measured
2. Facing a big bet: a steady stare, brows drawn down a little; arms as at rest
3. Lost a pot: a short nod, a soldier's acceptance, mouth set; arms as at rest
4. Won a pot: a small, satisfied smile, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, eyes level, calm
6. Knocked out: rising from his seat, the ivory elephant tucked under his left arm, a short nod to the table, his right hand at his side

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no laurel wreath, no sword drawn, no raised-arm salute, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Scipio's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the neck and the top of the cloak, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking up; narrowed, measuring (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it (he is clean-shaven), cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a small, dry smile; mouth set, a soldier taking a loss
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
