# Sherlock Holmes, in the deerstalker: every pose, and the prompts

Holmes's SECOND look (the owner's call): the same man, the same 24 poses and the same tells as `sherlock_parts/` (bareheaded, at Baker Street), now in Paget's deerstalker, Doyle's 'ear-flapped travelling cap'. Planned: he wears it away from Baker Street (the Champions' tables, open tables), where he is travelling; at home he stays bareheaded. Built as a separate puppet, the way the Green Knight has `green_knight_bare`. The bareheaded kit is not replaced.

The cap: plain soft grey cloth (no fine check pattern: the style lock wants flat colour), a peak front and back, ear-flaps tied up on top. No cape (the Inverness cape is a later stage costume). Everything else as `sherlock_parts/POSES.md`.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the clay pipe on the felt by his right hand | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: one long finger taps the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, precise | MECH |
| A6 | Fold: lays his cards down, bored | MECH |
| B1 | All in: both hands push his whole stack, eyes alight | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Puts his fingertips together | TELL |
| B5 | Examines a speck on the tablecloth, bent close (decoy for B4) | IDLE |
| B6 | Draws on his pipe | TELL |
| C1 | Turns his lens over in his fingers (decoy for B6) | IDLE |
| C2 | Taps his pipe stem against his teeth | TELL |
| C3 | Glances at your hands (decoy for C2) | IDLE |
| C4 | Looks at the mantel as if it had lied to him | IDLE |
| C5 | A sharp, reading look straight at the viewer | IDLE |
| C6 | Leans back, eyes half closed, bored | IDLE |
| D1 | Talking: one finger raised, explaining | BEAT |
| D2 | Facing a big bet: eyes narrowed, chin on his hand | BEAT |
| D3 | Lost a pot: a thin, irritated smile | BEAT |
| D4 | Won a pot: a quick, pleased smile, drawing chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes bright | BEAT |
| D6 | Knocked out: rises, pipe in hand, a curt bow | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches THREE images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, Holmes's bareheaded pose sheet A (`art-tools/sherlock_parts/sources/poses_a.png`) for the man himself, and Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach the deerstalker character sheet, the deerstalker pose sheet A once it exists, AND Washington's pose sheet A, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Sherlock Holmes, of Arthur Conan Doyle's stories (1887-1927), as Sidney Paget drew him for The Strand, in his travelling cap. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no striped surcoat, no long hair. Draw the SAME MAN as the SECOND attached image (his face, hair, dressing gown, colours, pipe), now wearing a deerstalker. Take the STYLE from the THIRD attached image.

Holmes: a tall, very thin man of about forty; a high forehead, dark hair slicked straight back; sharp grey eyes under level brows; a thin, hawk-like nose; a narrow, clean-shaven, keen face, a little pale; long, thin fingers. On his head, a deerstalker: a soft grey cloth cap with a short peak at the front AND at the back, its ear-flaps tied up on top with a small bow, worn level on his head: plain grey, flat colour, a few big shapes, no check pattern. He wears a long mouse-coloured (soft grey-brown) dressing gown with darker lapels and a darker sash, over a white shirt with a dark cravat. His prop: a straight black clay pipe, long and slim, NOT curved. Brilliant, restless, impatient, faintly amused by everyone. NO cape, NO Inverness coat, NO curved calabash pipe. Nothing from any film or television version.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the deerstalker, the neck and the top of the dressing gown: neutral, keen and watchful; talking, mouth open mid-word; a thin, pleased smile; eyes narrowed, reading someone
- The torso in the dressing gown: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the dressing-gown sleeves with white shirt cuffs, lying on a table, pointing toward its centre, open at the elbow end
- The straight black clay pipe on its own; a round magnifying lens with a short handle on its own; the deerstalker on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the clay pipe lying on the felt beside his right hand (the left of the picture): neutral; his fingertips together in front of his chin; drawing on the pipe; tapping the pipe stem against his teeth

STYLE, the most important rule: match the THIRD attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Holmes, exactly as on the attached character sheet (a tall, very thin man of about forty, as Sidney Paget drew him: a high forehead, dark hair slicked straight back under a deerstalker: a soft grey cloth cap with a short peak at the front AND at the back, its ear-flaps tied up on top with a small bow, worn level on his head, sharp grey eyes, a thin hawk-like nose, a narrow, clean-shaven, keen face; a long mouse-coloured (soft grey-brown) dressing gown with a darker sash and lapels, over a white shirt with a dark cravat; and a straight black clay pipe lying on the felt beside his right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his deerstalker included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The straight black clay pipe lies on the felt beside his right hand (the left of the picture), unlit, unless the pose says otherwise. His mouse-coloured dressing gown is the same in every pose. He wears the grey deerstalker in EVERY pose, peaks front and back, ear-flaps tied up on top, exactly as on the attached sheets. No cape. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his long hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the clay pipe lying on the felt beside his right hand; a keen, watchful look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: one long finger of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand setting a stack of chips down, precise, well forward
6. Folding: his right hand laying two cards down face down, bored

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No cape, no Inverness coat, no curved calabash pipe, no magnifying glass unless the pose says so, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Holmes, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same lean face, hawk nose, dark hair, grey deerstalker, mouse-coloured dressing gown and the black clay pipe.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The straight black clay pipe lies on the felt beside his right hand (the left of the picture), unlit, unless the pose says otherwise. His mouse-coloured dressing gown is the same in every pose. He wears the grey deerstalker in EVERY pose, peaks front and back, ear-flaps tied up on top, exactly as on the attached sheets. No cape. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward, eyes alight
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. His fingertips together: both elbows on the table's edge, his long fingers pressed tip to tip in a steeple in front of his chin, eyes half closed
5. Examining a speck on the tablecloth: bent close over the felt, his right forefinger pointing at a tiny spot, eyes narrowed
6. Drawing on his pipe: the straight clay pipe held in his right hand, its stem between his lips, cheeks drawn in, eyes on the table

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No cape, no Inverness coat, no curved calabash pipe, no magnifying glass unless the pose says so, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Holmes, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same lean face, hawk nose, dark hair, grey deerstalker, mouse-coloured dressing gown and the black clay pipe.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The straight black clay pipe lies on the felt beside his right hand (the left of the picture), unlit, unless the pose says otherwise. His mouse-coloured dressing gown is the same in every pose. He wears the grey deerstalker in EVERY pose, peaks front and back, ear-flaps tied up on top, exactly as on the attached sheets. No cape. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Turning a round magnifying lens over in the fingers of his right hand, in front of his chest, idly
2. Tapping the stem of the clay pipe against his front teeth, the pipe held in his right hand, eyes narrowed in thought
3. Glancing at the viewer's hands: eyes cut down and sideways toward the front of the table, head still; arms as at rest
4. Looking up at a mantelpiece off to the left of the picture, over his shoulder, as if it had lied to him: brows drawn, mouth set; arms as at rest
5. A sharp, reading look straight at the viewer; arms as at rest
6. Leaning back in his seat, eyes half closed, bored, his hands loose on the table's edge

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No cape, no Inverness coat, no curved calabash pipe, no magnifying glass unless the pose says so, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Holmes, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same lean face, hawk nose, dark hair, grey deerstalker, mouse-coloured dressing gown and the black clay pipe.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The straight black clay pipe lies on the felt beside his right hand (the left of the picture), unlit, unless the pose says otherwise. His mouse-coloured dressing gown is the same in every pose. He wears the grey deerstalker in EVERY pose, peaks front and back, ear-flaps tied up on top, exactly as on the attached sheets. No cape. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right index finger raised, explaining
2. Facing a big bet: eyes narrowed, his chin resting on his right hand, elbow on the table
3. Lost a pot: a thin, irritated smile; arms as at rest
4. Won a pot: a quick, pleased smile, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, eyes bright, eager
6. Knocked out: rising from his seat, the clay pipe in his right hand, touching the front peak of his deerstalker with two fingers of his left hand, a curt little bow

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No cape, no Inverness coat, no curved calabash pipe, no magnifying glass unless the pose says so, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Holmes's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the mouths too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the grey deerstalker (peaks front and back, ear-flaps tied up), the neck and the top of the dressing gown, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed, reading someone; wide and bright (one piece each, both eyes and brows with the skin around them)
- Lower-face patches, each the mouth with the skin around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a thin, pleased smile; a thin, irritated smile
- His head turned toward the viewer, nearly front-on, in the deerstalker

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
