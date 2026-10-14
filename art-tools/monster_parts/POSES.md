# Frankenstein's Monster: every pose, and the prompts

Transylvania's seat 2 (left of the dealer): drawn facing the viewer's right, as the game shows him. Built the way the Green Knight is (`art-tools/pose_rig.py`), a quarter bigger: he is the table's giant.

His look, from his character file and Shelley: eight feet tall; long, lustrous black hair; yellow skin stretched over muscle; watery eyes nearly the colour of their sockets (drawn pale grey, so they still read); straight black lips; a good coat never cut for him. Articulate, well read, sad, gentle until he is not. His prop is a small battered copy of Paradise Lost in a very large hand, and where he puts it is the tell surface.

Ruled out (his character file): everything of Universal's 1931 design, which is still protected: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting, no stiff-armed walk. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: setting his book face-down on the table (strong) beside reading a line of Milton, lips moving (the book in both hands); turning a page he is not reading (weak) beside staring at his own hands; the table creaking under his grip (tilted) beside straightening a coat that was never made for him. 'Flinches from the firelight' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the book open in his left hand | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: one big finger taps the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, carefully | MECH |
| A6 | Fold: lays his cards down face down | MECH |
| B1 | All in: both hands push his whole stack | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Sets his book face-down on the table | TELL |
| B5 | Reads a line of Milton, lips moving (decoy for B4) | IDLE |
| B6 | Turns a page he is not reading | TELL |
| C1 | Stares at his own hands (decoy for B6) | IDLE |
| C2 | Grips the table's edge; it creaks | TELL |
| C3 | Straightens a coat never made for him (decoy for C2) | IDLE |
| C4 | Flinches from the firelight | IDLE |
| C5 | Looks at the viewer, sad and steady | IDLE |
| C6 | Pushes his long hair back from his face | IDLE |
| D1 | Talking: one big hand open, explaining | BEAT |
| D2 | Facing a big bet: brows drawn down, very still | BEAT |
| D3 | Lost a pot: head bowed, eyes closed | BEAT |
| D4 | Won a pot: a small, surprised smile, drawing chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes on you | BEAT |
| D6 | Knocked out: rises, the book under his arm, a polite bow | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach the Monster's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: the creature of Mary Shelley's Frankenstein; or, The Modern Prometheus (1818), as Shelley describes him in the novel. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no striped surcoat. Take the STYLE from the SECOND attached image.

The Monster: an ENORMOUS man, a head taller than any other man at the table and broad as a door, powerfully built; long, flowing, glossy BLACK hair falling past his ears to his collar; pale YELLOWISH skin, smooth, drawn a little thin over strong bones; a long, sombre, intelligent face; pale watery grey eyes with small dark pupils, deep-set; straight dark lips; white teeth. A good dark coat that was never cut for him: too tight across the huge shoulders, its sleeves too short so his big wrists show; a plain white shirt open at the collar. Sad, gentle, articulate, well read; dangerous only when wronged. His prop: a small, battered brown leather book (Paradise Lost), tiny in his huge hand. Nothing of Universal's 1931 film design: NO neck bolts, NO flat-topped or square head, NO green or grey skin, NO stitches, NO scars, NO heavy brow ridge, NO platform boots. Nothing from any film.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the long hair, the neck and the top of the shirt collar: neutral, sad and calm; talking, mouth open mid-word; reading, eyes lowered, lips moving; flinching, eyes narrowed, turned a little away
- The torso in the tight dark coat: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the too-short coat sleeves, big wrists showing, lying on a table, pointing toward its centre, open at the elbow end
- On their own: the small battered brown book, open; the same book closed
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the book open in his left hand on the felt: neutral; the book set face-down on the felt, both hands flat beside it; turning a page with one big finger, eyes elsewhere; both hands gripping the table's edge hard, two short creak lines beside them

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Monster, exactly as on the attached character sheet (an enormous man, a head taller than any other man at the table and broad as a door, as Mary Shelley describes him: long, flowing, glossy black hair, pale yellowish skin, a long sombre face, pale watery grey eyes with small dark pupils, straight dark lips, white teeth; a good dark coat that was never cut for him, too tight across the shoulders, its sleeves too short so his big wrists show, a plain white shirt open at the collar; a small, battered brown book (Paradise Lost) in his huge left hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his hair included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. He is ENORMOUS in every pose, filling the cell, his head near the top. His small battered brown book is held open in his LEFT hand (the right of the picture), resting on the felt, unless the pose says otherwise. NO neck bolts, NO flat-topped head, NO green skin, NO stitches, NO scars: his skin is pale yellowish and smooth, his hair long and black. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the small book held open in his left hand on the felt; a calm, sad look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: one big finger of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand setting a stack of chips down well forward, carefully
6. Folding: his right hand laying two cards down face down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No neck bolts, no flat head, no green skin, no stitches, no scars, no laboratory, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Monster, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same enormous size, long black hair, pale yellow skin, straight dark lips, ill-fitting dark coat and small battered book.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). He is ENORMOUS in every pose, filling the cell, his head near the top. His small battered brown book is held open in his LEFT hand (the right of the picture), resting on the felt, unless the pose says otherwise. NO neck bolts, NO flat-topped head, NO green skin, NO stitches, NO scars: his skin is pale yellowish and smooth, his hair long and black. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward (the book set down closed by his left elbow)
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in (the book set down closed by his left elbow)
4. Setting his book face-down on the felt: the book lying open, face DOWN, spine up, under his left hand; his eyes on the viewer
5. Reading a line of Milton: the book held up open in both hands in front of his chest, eyes on the page, lips moving
6. Turning a page he is not reading: one big finger of his right hand turning a page of the open book in his left hand, his eyes NOT on the book, looking at the table

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No neck bolts, no flat head, no green skin, no stitches, no scars, no laboratory, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Monster, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same enormous size, long black hair, pale yellow skin, straight dark lips, ill-fitting dark coat and small battered book.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). He is ENORMOUS in every pose, filling the cell, his head near the top. His small battered brown book is held open in his LEFT hand (the right of the picture), resting on the felt, unless the pose says otherwise. NO neck bolts, NO flat-topped head, NO green skin, NO stitches, NO scars: his skin is pale yellowish and smooth, his hair long and black. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Staring at his own hands: both big hands lifted a little off the felt, palms up, the book set down closed by his left elbow, eyes on his hands, puzzled and sad
2. Gripping the table: both huge hands clamped on the table's edge, knuckles white, two short creak lines beside each hand, the book set down closed by his left elbow, face very still
3. Straightening his coat: his right hand tugging the too-tight lapel straight, shoulders hunched a little; left hand as at rest with the book
4. Flinching from the firelight: head turned away toward the right of the picture, eyes narrowed, his right forearm half raised against the light
5. Looking straight at the viewer, sad and steady; arms as at rest
6. Pushing his long black hair back from his face with his right hand

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No neck bolts, no flat head, no green skin, no stitches, no scars, no laboratory, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the Monster, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same enormous size, long black hair, pale yellow skin, straight dark lips, ill-fitting dark coat and small battered book.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). He is ENORMOUS in every pose, filling the cell, his head near the top. His small battered brown book is held open in his LEFT hand (the right of the picture), resting on the felt, unless the pose says otherwise. NO neck bolts, NO flat-topped head, NO green skin, NO stitches, NO scars: his skin is pale yellowish and smooth, his hair long and black. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right hand open and raised a little, palm up, explaining, mouth open mid-word
2. Facing a big bet: brows drawn down, very still, eyes fixed; arms as at rest
3. Lost a pot: head bowed, eyes closed; arms as at rest
4. Won a pot: a small, surprised smile, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, eyes on the viewer
6. Knocked out: rising from his seat, the book under his left arm, his right hand on his chest, a polite bow

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No neck bolts, no flat head, no green skin, no stitches, no scars, no laboratory, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Monster's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the mouths too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the long black hair, the neck and the top of the shirt collar, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed; wide (one piece each, both eyes with the yellowish skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a small, surprised smile; mouth turned down, sad
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
