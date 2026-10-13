# The Green Knight: every pose, and the prompts

Camelot's seat 3 (on the player's right, beside Death): drawn facing the viewer's right and MIRRORED by the game to face the table's centre. Built the way Merlin and Lancelot are (`art-tools/pose_rig.py`), and a quarter bigger, as the Cyclops is: the giant at the table.

His look, from his character file and the poem: enormous, a head taller than anyone seated and broad as a door, green from his hair to his skin, a great bush of green beard, green clothes worked with gold, and no armour (he came in peace); a green, grinning, bright-eyed face. His tell surface is the holly branch, a big dark spiky shape that rustles, and the head of his great axe, which rests on the table's edge by his right hand. Both are on the outside of the table once he is mirrored (the left of the picture), clear of Death.

He is the knight who comes back: knocked out, he retakes his chair twenty hands later (`returns` in his file), so C6 is his entrance, and D6 his exit ('until next time').

Ruled out (his character file): David Lowery's film The Green Knight (2021) and its bark-faced tree-man; Tolkien's and Simon Armitage's translations (not drawn, but not quoted either). Never show him holding his severed head: that image belongs to the Headless Horseman. Style-locked like Lancelot: Lancelot's character sheet for the LAYOUT, Washington's pose sheet A for the STYLE.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: the holly branch rustling (strong) beside moss creeping along his sleeve; laughing so the rafters shake (bluffing) beside a broad grin at nobody; running a thumb along the head of his axe (weak) beside measuring the table with a flat hand, as if for a blow. 'Somewhere outside, his horse stamps' is C4 (he glances toward the door); 'the chair creaks under his weight' is C5.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the holly behind his right shoulder, the axe head by his right hand | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: a big finger taps the felt | MECH |
| A4 | Call: slides a short stack forward, cheerful | MECH |
| A5 | Bet: shoves a stack forward with a grin | MECH |
| A6 | Fold: tosses his cards away with a shrug | MECH |
| B1 | All in: both huge hands push his whole stack | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms scooping the pot in | MECH |
| B4 | The holly branch rustles, leaves shaking, berries bouncing | TELL |
| B5 | Watches moss creep along his sleeve (decoy for B4) | IDLE |
| B6 | Laughs, head thrown back, so the rafters shake | TELL |
| C1 | A broad grin at nobody (decoy for B6) | IDLE |
| C2 | Runs a thumb along the head of his axe | TELL |
| C3 | Measures the table with a flat hand, as if for a blow (decoy for C2) | IDLE |
| C4 | Glances toward the door: his horse stamps outside | IDLE |
| C5 | Shifts his great weight; the chair creaks | IDLE |
| C6 | Arrives (his return): arms wide, holly leaves blowing in with him, laughing | BEAT |
| D1 | Talking: one big hand open, booming | BEAT |
| D2 | Facing a big bet: a delighted grin, a challenge | BEAT |
| D3 | Lost a pot: laughs and slaps the table | BEAT |
| D4 | Won a pot: beaming, scooping chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes bright | BEAT |
| D6 | Knocked out: rises, takes up his axe, a cheerful bow: until next time | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach the Green Knight's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again (the style reference), and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: the Green Knight, from the 14th-century poem Sir Gawain and the Green Knight. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No steel armour, no gauntlets, no striped surcoat, no red cape. Take the STYLE from the SECOND attached image.

The Green Knight: a jolly giant, enormous and broad as a door, a head taller than any other man at the table; his skin a bright, clear GREEN; a great bushy green beard to his chest and thick green hair to his shoulders, drawn as a few big smooth locks; a broad, green, grinning face with big bright eyes and a big laugh in it; a green tunic and mantle worked with gold trim, and NO armour at all (he came in peace). Props: a big branch of holly, dark glossy spiky leaves and bright red berries, as tall as his head and shoulders; and a great axe with a huge broad blade, green and gold, its haft wound with green. Hearty, booming, good-natured, a little alarming. NOT a tree-man: no bark, no wood skin, no leaves growing from him. Never holding his own head. Nothing from the film The Green Knight (2021).

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with its neck, the beard and the top of the tunic: neutral, a big grin; talking, mouth open mid-word; laughing, head back; eyes narrowed, delighted
- The torso in tunic and mantle: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two big green forearms with the gold-trimmed sleeves, lying on a table, pointing toward its centre, open at the elbow end
- The holly branch on its own, upright
- The axe head on its own, lying flat, with the top of its haft
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the holly branch tucked behind his right shoulder (the left of the picture) standing up above his head, and the head of the axe resting on the table's edge by his right hand, its haft going down out of sight: neutral, grinning; the holly rustling; laughing; running his thumb along the axe head

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Green Knight, exactly as on the attached character sheet (a huge, broad, jolly giant, bright green skin, a great bushy green beard and green hair to the shoulders, green clothes worked with gold, no armour, a big holly branch tucked behind his right shoulder, the head of a great axe resting on the table's edge by his right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of the holly branch included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The holly branch stays tucked behind his right shoulder (the left of the picture), standing up above his head, and the axe head stays on the table's edge by his right hand, its haft going down out of sight, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his big hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the holly branch behind his right shoulder; the axe head on the table's edge by his right hand; a big friendly grin, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: one big finger of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward, cheerful
5. Betting: his right hand shoving a stack of chips well forward, grinning
6. Folding: his right hand tossing two cards away face down, with a shrug

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no armour, no horse, no severed head, no bark or tree skin, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Green Knight, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same green skin, beard, gold-worked clothes, holly branch and axe.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The holly branch stays tucked behind his right shoulder (the left of the picture), standing up above his head, and the axe head stays on the table's edge by his right hand, its haft going down out of sight, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both huge hands pushing his whole stack of chips forward, leaning in, laughing
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, scooping a pile of chips in
4. The holly branch behind his shoulder rustling: leaves shaking, berries bouncing, a few motion lines; he does not touch it; arms as at rest
5. Looking down at his left sleeve, where a little green moss is creeping along it, amused; arms as at rest
6. Laughing a huge laugh, head thrown back, mouth wide; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no armour, no horse, no severed head, no bark or tree skin, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Green Knight, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same green skin, beard, gold-worked clothes, holly branch and axe.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The holly branch stays tucked behind his right shoulder (the left of the picture), standing up above his head, and the axe head stays on the table's edge by his right hand, its haft going down out of sight, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. A broad grin at nobody in particular; arms as at rest
2. Running the thumb of his right hand along the edge of the axe head on the table, slowly
3. His right hand held flat above the table, measuring it, as if for a blow, one eye narrowed
4. Glancing toward a door over his left shoulder, as if hearing his horse stamp outside; arms as at rest
5. Shifting his great weight in his seat, one shoulder dipped, a sheepish grin; arms as at rest
6. Just arrived back: both arms thrown wide above the table, laughing, a gust of holly leaves blowing round him, the holly branch behind his shoulder

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no armour, no horse, no severed head, no bark or tree skin, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the Green Knight, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same green skin, beard, gold-worked clothes, holly branch and axe.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The holly branch stays tucked behind his right shoulder (the left of the picture), standing up above his head, and the axe head stays on the table's edge by his right hand, its haft going down out of sight, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right hand open, booming
2. Facing a big bet: a delighted grin, eyes narrowed, a challenge accepted; arms as at rest
3. Lost a pot: laughing, his right hand slapping the table
4. Won a pot: beaming, his right hand scooping a few chips toward him
5. Down to two players: leaning in on both forearms, eyes bright and eager
6. Knocked out: rising from his seat, the axe in his right hand resting on his shoulder, a cheerful bow: until next time

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no armour, no horse, no severed head, no bark or tree skin, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Green Knight's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with its neck, the green hair, the beard and the top of the tunic, as the reference, mouth closed, WITHOUT the holly. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side, toward a door; narrowed, delighted (one piece each, both eyes with the green skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the moustache and only the TOP of the beard around it, cut straight across just under the nose and again a little below the lower lip: closed in a grin; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a huge laugh, mouth wide; a broad toothy grin
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
