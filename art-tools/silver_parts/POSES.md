# Long John Silver: every pose, and the prompts

The Pirate Cove's seat 2 (the player's left), so he is drawn facing the viewer's right and is never mirrored. Built the way Athens and Blackbeard were (`art-tools/pose_rig.py`): a rest pose with a talking face, every other pose one of these drawings shown whole.

His look, from his character file and Stevenson: very tall and broad, a big pale smiling face, a cook's apron over a sailor's coat, the top of a crutch under one arm, and Captain Flint the parrot on his shoulder: the brightest, busiest thing at the table and his whole tell surface. Everything else about him (the one leg) is below the table's edge. The parrot sits on his RIGHT shoulder (the left of the picture), between him and Kidd, so she never crosses Death; the crutch top shows under his left arm.

Ruled out: Robert Newton's 1950 Disney Silver (and the 'Arr!' voice), the Muppet, Treasure Planet and Black Sails Silvers. The first prompt borrows Kidd's character sheet for LAYOUT AND STYLE ONLY and bans his look by name.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: the parrot squawking 'Pieces of eight!' (strong) beside the parrot preening; the parrot sidling along his shoulder (bluffing) beside the parrot flapping once and settling; stroking the parrot's head (weak) beside wiping his hands on his apron.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the parrot on his right shoulder | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a tall stack down, smiling | MECH |
| A6 | Fold: slides his cards away, cheerful | MECH |
| B1 | All in: both hands push his stack | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | The parrot squawks, beak wide, wings half open | TELL |
| B5 | The parrot preens under a wing (decoy for B4) | IDLE |
| B6 | The parrot sidles along his shoulder toward his ear | TELL |
| C1 | The parrot flaps once and settles (decoy for B6) | IDLE |
| C2 | Strokes the parrot's head with one finger | TELL |
| C3 | Wipes his hands on his apron (decoy for C2) | IDLE |
| C4 | Grins at everyone at once, head turning | IDLE |
| C5 | Raps the crutch with his knuckles | IDLE |
| C6 | Leans an elbow on the table, chin in hand, friendly | IDLE |
| D1 | Talking: one hand open, spinning a yarn | BEAT |
| D2 | Facing a big bet: eyes narrowed, still smiling | BEAT |
| D3 | Lost a pot: a broad, easy laugh, palms up | BEAT |
| D4 | Won a pot: a wink, sweeping the chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, smile gone cold | BEAT |
| D6 | Knocked out: rises on his crutch, tips two fingers to his brow | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches Kidd's character sheet (`art-tools/kidd_parts/sources/kidd_sheet.png`) and nothing else, for its layout and style only. From the second prompt on, attach Silver's own character sheet and, once it exists, his pose sheet A, and nothing of anyone else's.

### Character sheet

```
Character sheet for 2D animation rigging: Long John Silver, from Stevenson's Treasure Island (1883). Copy ONLY the LAYOUT and the flat cartoon STYLE of the attached sheet (bold dark outlines, clean painted shading, warm light, the same line weight): take NOTHING of its character. No wig, no three-cornered hat, no cravat, no brass-buttoned navy coat, no anxious face.

Silver: very tall and broad, in his forties; a big, pale, clean-shaven face with a wide friendly smile and sharp, watchful eyes; dark hair tied back in a short queue, no hat; a faded blue sailor's coat with the sleeves turned back, over a striped shirt, and a stained white cook's apron tied over it all; big capable hands. The top of a plain wooden crutch, padded with cloth, tucked under his left arm. On his right shoulder Captain Flint, a green parrot with a yellow head and red at the wings, bright and busy. Charming, never a cartoon pirate: no eyepatch, no hook, no skull, no gold teeth. Nothing from any film or TV series.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with its neck and the top of the coat and apron, WITHOUT the parrot: neutral, smiling; talking, mouth open mid-word; a wide grin at everyone; eyes narrowed, still smiling
- The torso in coat and apron: no head, cut off straight below the waist, the upper arms down to the elbows, the crutch top under the left arm; NO forearms, NO hands
- Two forearms with the turned-back sleeves, lying on a table, pointing toward its centre, open at the elbow end
- The parrot on her own, perched, in four poses: sitting; squawking, beak wide; preening under a wing; sidling, one foot lifted
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the parrot on his right shoulder: neutral; the parrot squawking; stroking the parrot's head; grinning
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Long John Silver, exactly as on the attached character sheet (very tall and broad, big pale smiling clean-shaven face, tied-back hair, a blue sailor's coat with a cook's apron over it, the top of a wooden crutch under his left arm, Captain Flint the green parrot on his right shoulder, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the parrot included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The parrot stays on his right shoulder (the left of the picture) and the crutch top under his left arm, as at rest, unless the pose says otherwise.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the parrot sitting on his right shoulder; a friendly smile, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right hand setting a tall stack of chips down well forward, smiling
6. Folding: his right hand sliding two cards away face down, cheerful

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hook, no peg leg showing, no eyepatch, no skull, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Long John Silver, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same apron, coat, crutch and parrot.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The parrot stays on his right shoulder (the left of the picture) and the crutch top under his left arm, as at rest, unless the pose says otherwise.

1. All in: both hands pushing his whole stack of chips forward, leaning over the table, the parrot gripping his shoulder
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. The parrot squawking: beak wide open, wings half spread, on his shoulder; Silver unbothered; arms as at rest
5. The parrot preening under one wing on his shoulder; arms as at rest
6. The parrot sidling along his shoulder toward his ear, one foot lifted; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hook, no peg leg showing, no eyepatch, no skull, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Long John Silver, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same apron, coat, crutch and parrot.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The parrot stays on his right shoulder (the left of the picture) and the crutch top under his left arm, as at rest, unless the pose says otherwise.

1. The parrot flapping once, wings up, about to settle; arms as at rest
2. Stroking the parrot's head with one finger of his right hand
3. Wiping his hands on his apron, both hands at his chest
4. Grinning broadly at everyone at once, head turning across the table; arms as at rest
5. Rapping the top of the crutch under his left arm with the knuckles of his right hand
6. Leaning his right elbow on the table, chin in his hand, friendly and attentive

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hook, no peg leg showing, no eyepatch, no skull, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Long John Silver, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same apron, coat, crutch and parrot.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The parrot stays on his right shoulder (the left of the picture) and the crutch top under his left arm, as at rest, unless the pose says otherwise.

1. Talking: his right hand open, spinning a yarn
2. Facing a big bet: eyes narrowed, still smiling; arms as at rest
3. Lost a pot: a broad, easy laugh, both palms up
4. Won a pot: a wink, his right hand sweeping a few chips toward him
5. Down to two players: leaning in on both forearms, the smile gone cold
6. Knocked out: rising on his crutch, touching two fingers to his brow in a cheerful farewell

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hook, no peg leg showing, no eyepatch, no skull, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Long John Silver's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with its neck and the top of the coat and apron, as the reference, WITHOUT the parrot, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the chin and jaw around it, clean-shaven, cut straight across just under the nose: closed in a smile; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a broad grin; laughing; a cold thin smile
- The parrot on her own, at exactly her size and place on his shoulder, in four poses: sitting; squawking; preening; sidling
- His head turned toward the viewer, nearly front-on
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of his stack plays the big win, and losing one the crushing loss. Pose 1
is his rest pose again, only to measure the sheet by. Attach
`art-tools/silver_parts/sources/poses_a.png` FIRST, then
`art-tools/silver_parts/sources/silver_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: Long John Silver, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same apron, coat, crutch and parrot.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind him, no chair, nothing of him cut off by the edge of the picture (raised hands included). Nothing below the table edge. In every pose the parrot stays on his right shoulder (the left of the picture) and the crutch top under his left arm.

1. EXACTLY his at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both arms raised high above his head, hands open, a huge beaming grin, the parrot flapping its wings on his shoulder
3. A crushing loss: one hand pressed over his eyes, his other hand flat on the felt, the parrot hunched and ruffled on his shoulder

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No sword, no pistol, no treasure, no map, no chair.
```
