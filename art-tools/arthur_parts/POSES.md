# King Arthur: every pose, and the prompts

Camelot's champion and seat 4 (the player's right): drawn facing the viewer's right and MIRRORED by the game to face the table's centre. Built the way Lancelot is (`art-tools/pose_rig.py`), style-locked.

His look, from his character file: a plain gold crown with a visible dent, a red mantle over broad mailed shoulders, a greying beard kept short; an open, lined, kind face, tired round the eyes. His tell surface is Excalibur, sheathed and standing upright beside his chair with the hilt at his hand: a big cross shape his hand can rest on, and leave. It stands at his RIGHT shoulder, which is the outside of the table once he is mirrored, clear of Death.

Ruled out (his character file): Monty Python and the Holy Grail (no coconuts), the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White, the BBC's Merlin. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: resting his hand on Excalibur's hilt (strong) beside rubbing the dent in his crown; his crown slipping a fraction, unfixed (bluffing) beside listening to the wind at the window; looking round the table at each of his knights (weak) beside nodding to a servant who is not there. 'Raises his cup to the table' is C5.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, Excalibur upright at his right shoulder | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down firmly, at once | MECH |
| A6 | Fold: lays his cards down gracefully | MECH |
| B1 | All in: both hands push his whole stack, resolute | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Rests his right hand on Excalibur's hilt | TELL |
| B5 | Rubs the dent in his crown (decoy for B4) | IDLE |
| B6 | His crown slipped a fraction, askew; he does not fix it | TELL |
| C1 | Listens to the wind at the window, head turned (decoy for B6) | IDLE |
| C2 | Looks round the table at each of his knights | TELL |
| C3 | Nods to a servant who is not there (decoy for C2) | IDLE |
| C4 | A tired, fond smile at the table | IDLE |
| C5 | Raises a cup to the table | IDLE |
| C6 | Hands folded on the table, a king listening | IDLE |
| D1 | Talking: an open hand, gracious | BEAT |
| D2 | Facing a big bet: a steady look, considering | BEAT |
| D3 | Lost a pot: a gracious nod, a small sad smile | BEAT |
| D4 | Won a pot: a warm smile, drawing the chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, steady | BEAT |
| D6 | Knocked out: rises, takes Excalibur, bows to the table | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Arthur's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: King Arthur, as Geoffrey of Monmouth (c. 1136) and Malory (1485) tell him. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no striped surcoat, no long dark hair. Take the STYLE from the SECOND attached image.

Arthur: a king in his fifties, broad-shouldered and solid; an open, kind face, a little tired round the eyes, a short, neat, greying brown beard and greying hair to his collar; a plain gold crown, a simple band with low points, with ONE clear dent in its front; a deep red mantle fastened at the shoulder with a gold brooch, over a coat of mail and a plain blue tunic. His sword Excalibur in its scabbard: a simple, beautiful sword with a big plain gold cross-hilt and a round pommel, its scabbard deep blue with gold fittings. Gracious, steady, kingly, warm; never a cartoon king. Nothing from Monty Python, the musical Camelot, Disney's The Sword in the Stone or the film Excalibur.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the crown, the neck and the top of the mantle: neutral, kind; talking, mouth open mid-word; a warm smile; the crown slipped a fraction askew
- The torso in mantle and mail: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the mail sleeves, lying on a table, pointing toward its centre, open at the elbow end
- Excalibur in its scabbard on its own, upright
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the sheathed sword standing upright beside his right shoulder (the left of the picture), its hilt at about chin height: neutral; his right hand resting on the hilt; looking round the table; the crown slipped askew

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: King Arthur, exactly as on the attached character sheet (a king in his fifties, broad-shouldered, a short greying beard, an open, kind, tired face, a plain gold crown with one visible dent, a red mantle over shoulders in mail, the sheathed sword Excalibur standing upright beside his right shoulder with its cross-shaped hilt at about chin height, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, his crown and the sword's hilt included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The crown stays on his head, and the sheathed sword stands upright beside his right shoulder (the left of the picture), its hilt at chin height, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; Excalibur upright at his right shoulder; a kind, steady look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand setting a stack of chips down firmly, well forward
6. Folding: his right hand laying two cards down face down, gracefully

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No coconuts, no Holy Grail, no round table drawn, no throne, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: King Arthur, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same crown, red mantle, mail, beard and sword.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The crown stays on his head, and the sheathed sword stands upright beside his right shoulder (the left of the picture), its hilt at chin height, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward, resolute
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. Resting his right hand on Excalibur's hilt beside his shoulder, calm
5. Rubbing the dent in the front of his crown with two fingers of his right hand, thoughtful
6. His crown slipped a fraction, askew on his head; he does not fix it; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No coconuts, no Holy Grail, no round table drawn, no throne, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: King Arthur, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same crown, red mantle, mail, beard and sword.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The crown stays on his head, and the sheathed sword stands upright beside his right shoulder (the left of the picture), its hilt at chin height, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Listening to the wind at a window, head turned a little to his left, eyes far away; arms as at rest
2. Looking round the table at each of his knights, head turned, fond and a little sad; arms as at rest
3. A small nod to a servant who is not there, his right hand lifted an inch from the felt
4. A tired, fond smile at the table; arms as at rest
5. Raising a plain silver cup to the table in his right hand, a toast
6. His hands folded together on the table, a king listening

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No coconuts, no Holy Grail, no round table drawn, no throne, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: King Arthur, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same crown, red mantle, mail, beard and sword.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The crown stays on his head, and the sheathed sword stands upright beside his right shoulder (the left of the picture), its hilt at chin height, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right hand open, gracious
2. Facing a big bet: a steady look, considering, brows a little raised; arms as at rest
3. Lost a pot: a gracious nod, a small sad smile; arms as at rest
4. Won a pot: a warm smile, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, steady and calm
6. Knocked out: rising from his seat, Excalibur in his right hand, bowing his head to the table

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No coconuts, no Holy Grail, no round table drawn, no throne, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: King Arthur's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the crown, the neck and the top of the mantle, as the reference, mouth closed, WITHOUT the sword. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side, far away; narrowed, considering (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the moustache and only the TOP of the beard around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a warm smile; a small sad smile
- His head turned toward the viewer, nearly front-on, with the crown

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of his stack plays the big win, and losing one the crushing loss. Pose 1
is his rest pose again, only to measure the sheet by. Attach
`art-tools/arthur_parts/sources/poses_a.png` FIRST, then
`art-tools/arthur_parts/sources/arthur_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: King Arthur, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same crown, red mantle, mail, beard and sword.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind him, no chair, nothing of him cut off by the edge of the picture (raised hands included). Nothing below the table edge. In every pose the crown stays on his head, and the sheathed sword stands upright beside his right shoulder (the left of the picture), its hilt at chin height.

1. EXACTLY his at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both arms raised high above his head, hands open, a broad royal laugh, the crown still on his head
3. A crushing loss: one hand over his eyes, shoulders slumped, the crown slightly askew, the other hand flat on the felt

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No sword drawn, no Excalibur held up, no Grail, no chair.
```
