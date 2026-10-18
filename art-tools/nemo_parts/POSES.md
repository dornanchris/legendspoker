# Captain Nemo: every pose, and the prompts

Baker Street's seat 1 (the player's left): drawn facing the viewer's right, as the game shows him. Built the way Scipio is (`art-tools/pose_rig.py`), style-locked.

His look, from his character file: tall and broad-shouldered, a full dark beard, a flat sea-captain's cap, severe dark clothes, eyes set rather wide apart, as Verne describes them; the costume from the Neuville and Riou engravings for Hetzel's edition, not from any film. His prop is a great pearl, big enough that its white glint reads against the dark coat whenever he turns it.

Ruled out (his character file): the 1954 Disney film entirely (no uniformed Nemo, no riveted, spined Nautilus) and the League of Extraordinary Gentlemen comics and film. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: closing his eyes as if listening to distant music (strong) beside humming a fugue under his breath; letting his gaze drift to the window (weak) beside consulting a pocket chronometer; turning the pearl between his fingers (bluffing) beside tapping the table as if sounding a hull. 'Sketches something in a notebook' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the great pearl on the felt by his right hand | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two knuckles rap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, precise | MECH |
| A6 | Fold: lays his cards down, disdainful | MECH |
| B1 | All in: both hands push his whole stack, grim | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Closes his eyes, as if listening to distant music | TELL |
| B5 | Hums a fugue under his breath, eyes half closed (decoy for B4) | IDLE |
| B6 | Lets his gaze drift to the window | TELL |
| C1 | Consults a pocket chronometer (decoy for B6) | IDLE |
| C2 | Turns the great pearl between his fingers | TELL |
| C3 | Taps the table as if sounding a hull (decoy for C2) | IDLE |
| C4 | Sketches something in a small notebook | IDLE |
| C5 | A cold, level look straight at the viewer | IDLE |
| C6 | Arms folded on the table, brooding | IDLE |
| D1 | Talking: one hand raised, flat and final | BEAT |
| D2 | Facing a big bet: brows drawn, a long cold stare | BEAT |
| D3 | Lost a pot: jaw set, eyes lowered | BEAT |
| D4 | Won a pot: a grave half-smile, drawing chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes hard | BEAT |
| D6 | Knocked out: rises, pockets the pearl, turns away without a word | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Nemo's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Captain Nemo, of Jules Verne's Twenty Thousand Leagues Under the Seas (1870), as the Neuville and Riou engravings for Hetzel's edition show him. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no striped surcoat, no long hair. Take the STYLE from the SECOND attached image.

Nemo: a tall, broad-shouldered man of about fifty, upright and severe; a full, dark, well-kept beard; a high forehead and dark eyes set rather wide apart under heavy brows, a proud, cold, melancholy look; a flat dark sea-captain's cap with a short peak; a severe dark navy double-breasted coat with a high collar, over a dark waistcoat and a white shirt. His prop: a great white pearl, the size of a quail's egg, with a soft shine. Grave, brilliant, bitter, utterly self-possessed. NO naval uniform with insignia, NO medals, NO epaulettes, NO diving helmet. Nothing from the 1954 Disney film or any other film or comic.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the cap, the neck and the top of the coat: neutral, cold and watchful; talking, mouth open mid-word in the beard; a grave half-smile; eyes closed, as if listening to distant music
- The torso in the coat: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the dark coat sleeves with white shirt cuffs, lying on a table, pointing toward its centre, open at the elbow end
- The great pearl on its own; a brass pocket chronometer on its own, lid open; a small dark notebook on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the pearl on the felt beside his right hand (the left of the picture): neutral; eyes closed, listening; looking away over his shoulder toward a window; turning the pearl between his fingers

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Captain Nemo, exactly as on the attached character sheet (a tall, broad-shouldered sea captain of about fifty, a full dark beard, dark eyes set rather wide apart under heavy brows, a flat dark sea-captain's cap with a short peak, a severe dark navy double-breasted coat with a high collar over a dark waistcoat and white shirt, and a great white pearl, the size of a quail's egg, lying on the felt beside his right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his cap included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The great white pearl lies on the felt beside his right hand (the left of the picture) unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the great pearl lying on the felt beside his right hand; a cold, watchful look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two knuckles of his right hand rapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand setting a stack of chips down, precise, well forward
6. Folding: his right hand laying two cards down face down, disdainful

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No naval uniform with insignia or medals, no epaulettes, no diving helmet, no submarine, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Captain Nemo, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, full dark beard, flat captain's cap, dark coat and the great pearl.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The great white pearl lies on the felt beside his right hand (the left of the picture) unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward, grim
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. Eyes closed, head tilted back a little, as if listening to distant music; arms as at rest
5. Humming a fugue under his breath: eyes half closed, lips slightly parted, the fingers of his right hand lifted a little as if keeping time; otherwise as at rest
6. His gaze drifting away to a window: head turned over his right shoulder toward the left of the picture, eyes far away; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No naval uniform with insignia or medals, no epaulettes, no diving helmet, no submarine, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Captain Nemo, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, full dark beard, flat captain's cap, dark coat and the great pearl.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The great white pearl lies on the felt beside his right hand (the left of the picture) unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Consulting a brass pocket chronometer, lid open, held in his right hand in front of his chest, eyes on it
2. Turning the great pearl between the thumb and fingers of his right hand, held up in front of his dark coat so its white shows, eyes on the table
3. Tapping the table's edge with one knuckle of his right hand, head cocked, as if sounding a ship's hull
4. Sketching something in a small dark notebook open on the felt, a pencil in his right hand
5. A cold, level look straight at the viewer; arms as at rest
6. Arms folded on the table, brooding, chin lowered

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No naval uniform with insignia or medals, no epaulettes, no diving helmet, no submarine, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Captain Nemo, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, full dark beard, flat captain's cap, dark coat and the great pearl.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The great white pearl lies on the felt beside his right hand (the left of the picture) unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right hand raised, palm flat and down, final
2. Facing a big bet: brows drawn, a long cold stare; arms as at rest
3. Lost a pot: jaw set, eyes lowered; arms as at rest
4. Won a pot: a grave half-smile, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, eyes hard
6. Knocked out: rising from his seat, slipping the pearl into his coat pocket with his right hand, turning away

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No naval uniform with insignia or medals, no epaulettes, no diving helmet, no submarine, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Nemo's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the cap, the neck and the top of the coat, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth inside his full dark beard with the beard around it, cut straight across just under the nose and again across the beard a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a grave half-smile; jaw set, lips pressed thin
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of his stack plays the big win, and losing one the crushing loss. Pose 1
is his rest pose again, only to measure the sheet by. Attach
`art-tools/nemo_parts/sources/poses_a.png` FIRST, then
`art-tools/nemo_parts/sources/nemo_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: Captain Nemo, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same face, full dark beard, flat captain's cap, dark coat and the great pearl.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind him, no chair, nothing of him cut off by the edge of the picture (raised hands included). Nothing below the table edge. In every pose the great white pearl lies on the felt beside his right hand (the left of the picture).

1. EXACTLY his at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both arms raised high above his head, hands open, head back, a rare, fierce laugh
3. A crushing loss: one hand pressed over his eyes, his shoulders hunched, the other hand flat on the felt beside the pearl

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No submarine, no diving helmet, no sword, no chair.
```
