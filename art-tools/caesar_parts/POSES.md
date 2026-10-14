# Julius Caesar: every pose, and the prompts

Rome's champion. He arrives the moment the first chair comes free, so he can sit in ANY of the four seats: drawn facing the viewer's right and mirrored by the game as the chair needs. Built the way Scipio is (`art-tools/pose_rig.py`), style-locked.

His look, from his character file: the laurel wreath worn low over a high forehead (Suetonius: he valued the right to wear it at all times because it hid his thinning hair); tall, lean, keen dark eyes; a white toga with a broad purple border. The wreath is gold, like the one waiting on its cushion in Rome's room, and its angle on his head is his tell surface.

Ruled out (his character file): every film and television likeness and the Asterix caricature; build from the coins of 44 BC. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: adjusting his laurel wreath (bluffing) beside rubbing his temple; drumming his fingers on the table's edge (weak) beside straightening the purple border of his toga; smiling like a man counting votes (strong) beside glancing round the table with suspicion. 'Dictates something to no one' is C4; C6 is his ARRIVE pose, setting the wreath on his head as he sits down.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the wreath low on his brow | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, decisive | MECH |
| A6 | Fold: lays his cards down, dismissive | MECH |
| B1 | All in: both hands push his whole stack, the die is cast | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Adjusts his laurel wreath | TELL |
| B5 | Rubs his temple (decoy for B4) | IDLE |
| B6 | Drums his fingers on the table's edge | TELL |
| C1 | Straightens the purple border of his toga (decoy for B6) | IDLE |
| C2 | Smiles like a man counting votes | TELL |
| C3 | Glances round the table with suspicion (decoy for C2) | IDLE |
| C4 | Dictates something to no one, one finger raised | IDLE |
| C5 | A cool, appraising look at the viewer | IDLE |
| C6 | Arrive: setting the wreath on his head as he sits down | BEAT |
| D1 | Talking: one finger raised, as if dictating | BEAT |
| D2 | Facing a big bet: chin up, eyes narrowed | BEAT |
| D3 | Lost a pot: a thin, tight smile | BEAT |
| D4 | Won a pot: a satisfied smile, drawing chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes level | BEAT |
| D6 | Knocked out: rises, wraps his toga round him, a last look back | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Caesar's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Julius Caesar, as the coins of 44 BC and Suetonius show him. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no surcoat, no long hair. Take the STYLE from the SECOND attached image.

Caesar: a tall, lean Roman in his fifties; a high forehead with thinning, short, combed-forward dark hair; a long, lined, clever face with a strong nose and keen dark eyes; clean-shaven; a GOLD laurel wreath worn low over his forehead; a white toga with a broad purple border, draped over his left shoulder, over a plain white tunic. Composed, calculating, faintly amused, used to command. NO armour, NO helmet, NO red cape, NO sword. Not the Asterix caricature; nothing from any film or television portrayal.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the wreath, the neck and the top of the toga: neutral, calculating; talking, mouth open mid-word; a thin, satisfied smile; a suspicious sidelong look
- The torso in the toga: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms, the toga's fold over the left, lying on a table, pointing toward its centre, open at the elbow end
- The gold laurel wreath on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; adjusting his wreath; drumming his fingers on the table's edge; smiling like a man counting votes

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Julius Caesar, exactly as on the attached character sheet (a lean, tall Roman in his fifties, a high forehead with thinning hair, a long face with a strong nose and keen dark eyes, a gold laurel wreath worn low over his forehead, a white toga with a broad purple border, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his head and the wreath included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The gold laurel wreath stays on his head, low over his forehead, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the gold wreath low on his brow; a calculating look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand setting a stack of chips down well forward, decisive
6. Folding: his right hand laying two cards down face down, dismissive

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No armour, no helmet, no red cape, no sword, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Julius Caesar, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, gold laurel wreath, white toga with its purple border.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The gold laurel wreath stays on his head, low over his forehead, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward, resolute
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. Adjusting his gold laurel wreath with his right hand, setting it lower
5. Rubbing his temple with two fingers of his right hand, eyes half closed
6. The fingers of his right hand drumming on the table's edge, impatient

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No armour, no helmet, no red cape, no sword, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Julius Caesar, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, gold laurel wreath, white toga with its purple border.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The gold laurel wreath stays on his head, low over his forehead, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Straightening the purple border of his toga at his chest with his right hand
2. A slow, private smile, like a man counting votes; arms as at rest
3. Glancing round the table with suspicion, eyes sliding sideways; arms as at rest
4. Dictating something to no one: one finger raised, mouth open mid-word
5. A cool, appraising look straight at the viewer; arms as at rest
6. Arriving: just sitting down, setting the gold laurel wreath on his head with both hands

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No armour, no helmet, no red cape, no sword, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Julius Caesar, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, gold laurel wreath, white toga with its purple border.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The gold laurel wreath stays on his head, low over his forehead, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right index finger raised, as if dictating
2. Facing a big bet: chin up, eyes narrowed; arms as at rest
3. Lost a pot: a thin, tight smile; arms as at rest
4. Won a pot: a satisfied smile, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, eyes level
6. Knocked out: rising from his seat, wrapping his toga round him, one last look back

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No armour, no helmet, no red cape, no sword, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Caesar's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the wreath, the neck and the top of the toga, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a thin, satisfied smile; a tight, thin-lipped smile
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
