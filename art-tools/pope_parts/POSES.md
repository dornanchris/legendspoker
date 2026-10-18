# The Pope (Alexander VI): every pose, and the prompts

Rome's seat 2 (between Spartacus and Death): drawn facing the viewer's right, as the game shows him. Built the way Scipio is (`art-tools/pose_rig.py`), style-locked.

His look, from his character file: the tall mitre (nothing else at this table points straight up); a heavy, genial face with a strong nose, after Pinturicchio's fresco of him; gold-embroidered vestments that swallow the chair. His prop is the papal ring, drawn oversized so that turning it throws a flash of gold. The jokes are about his politics and his family, never the faith: nothing in his poses is a religious gesture used as a tell.

Ruled out (his character file): the 2011 television series and any poison-ring cliché. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: turning the ring on his finger (strong) beside admiring his ring; smoothing his robes, unhurried (bluffing) beside adjusting his mitre; folding his hands in his lap (weak: they leave the table) beside murmuring in Latin. 'Smiles benevolently at the whole table' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the ring on his right hand | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: one finger taps the felt | MECH |
| A4 | Call: slides a short stack forward, graciously | MECH |
| A5 | Bet: sets a stack down, a magnanimous gesture | MECH |
| A6 | Fold: lays his cards down with a small sigh | MECH |
| B1 | All in: both hands push his whole stack, beaming | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms gathering the pot | MECH |
| B4 | Turns the ring on his finger | TELL |
| B5 | Admires his own ring, hand raised (decoy for B4) | IDLE |
| B6 | Smooths his robes, unhurried | TELL |
| C1 | Adjusts his mitre (decoy for B6) | IDLE |
| C2 | Folds his hands in his lap: they leave the table | TELL |
| C3 | Murmurs something in Latin, eyes half closed (decoy for C2) | IDLE |
| C4 | Smiles benevolently at the whole table | IDLE |
| C5 | A quiet chuckle, one hand on his belly | IDLE |
| C6 | Fingertips together, considering | IDLE |
| D1 | Talking: one hand open, persuasive | BEAT |
| D2 | Facing a big bet: eyebrows raised, a patient smile | BEAT |
| D3 | Lost a pot: a pained smile, hand to his chest | BEAT |
| D4 | Won a pot: beaming, gathering chips in | BEAT |
| D5 | Heads up: leaning in, fingertips together | BEAT |
| D6 | Knocked out: rises, gathers his robes, a gracious nod | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach the Pope's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Pope Alexander VI (Rodrigo Borgia, pope 1492-1503), after Pinturicchio's fresco of him in the Borgia Apartments. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No armour, no gauntlets, no surcoat, no long hair. Take the STYLE from the SECOND attached image.

The Pope: a heavy-set, genial man in his sixties; a broad, fleshy face with a strong hooked nose, a double chin, shrewd twinkling dark eyes and a warm, practised smile; clean-shaven; a tall white mitre with gold bands and embroidery; rich vestments: a red and gold embroidered cope over white robes, wide sleeves; on his right hand a big gold ring with a red stone, drawn oversized so it reads from across a room. Charming, worldly, amused. NO poison ring, nothing sinister, nothing mocking the faith. Nothing from any film or television portrayal.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the mitre, the neck and the top of the vestments: neutral, genial; talking, mouth open mid-word; a broad, beaming smile; a patient, knowing smile
- The torso in the vestments: no head, cut off straight below the waist, the upper arms in their wide sleeves down to the elbows; NO forearms, NO hands
- Two forearms in the wide embroidered sleeves, lying on a table, pointing toward its centre, open at the elbow end; the right hand with the big gold ring
- The big gold ring on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; turning the ring on his finger; smoothing his robes; hands folded in his lap, out of sight below the table's edge

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Pope Alexander VI, exactly as on the attached character sheet (a heavy-set, genial Renaissance pope in his sixties, a broad face with a strong hooked nose and a double chin, a tall white-and-gold mitre, rich red and gold embroidered vestments over white, and a big gold ring with a red stone on his right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the tip of his mitre included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The big gold ring stays on his right hand, and the mitre stays straight on his head, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the big gold ring on his right hand; a genial, knowing smile, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: one finger of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward, graciously
5. Betting: his right hand setting a stack of chips down well forward, with a magnanimous little flourish
6. Folding: his right hand laying two cards down face down, with a small sigh

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No poison ring, no skulls, no crucifix used as a prop, nothing mocking the faith, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Pope Alexander VI, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, tall mitre, gold-embroidered vestments and big gold ring.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The big gold ring stays on his right hand, and the mitre stays straight on his head, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward, beaming
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, gathering a pile of chips in
4. Turning the big gold ring on his right hand with the fingers of his left, eyes down on it
5. Admiring his own ring: his right hand raised a little, fingers spread, looking at the ring fondly
6. Smoothing the front of his robes with both hands, unhurried

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No poison ring, no skulls, no crucifix used as a prop, nothing mocking the faith, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Pope Alexander VI, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, tall mitre, gold-embroidered vestments and big gold ring.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The big gold ring stays on his right hand, and the mitre stays straight on his head, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Adjusting his mitre with both hands, setting it straight
2. Both hands withdrawn from the table and folded in his lap, out of sight below the table's edge; his forearms no longer on the felt
3. Murmuring something under his breath, eyes half closed, lips moving; arms as at rest
4. Smiling benevolently at the whole table, head tilted a little; arms as at rest
5. A quiet chuckle, one hand resting on his belly
6. His fingertips pressed together in front of him, considering

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No poison ring, no skulls, no crucifix used as a prop, nothing mocking the faith, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Pope Alexander VI, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, tall mitre, gold-embroidered vestments and big gold ring.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The big gold ring stays on his right hand, and the mitre stays straight on his head, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right hand open, persuasive
2. Facing a big bet: eyebrows raised, a patient smile; arms as at rest
3. Lost a pot: a pained smile, his right hand on his chest
4. Won a pot: beaming, his right hand gathering a few chips toward him
5. Down to two players: leaning in, fingertips together, eyes twinkling
6. Knocked out: rising from his seat, gathering his robes, a gracious nod to the table

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No poison ring, no skulls, no crucifix used as a prop, nothing mocking the faith, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Pope's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the mitre, the neck and the top of the vestments, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a broad, beaming smile; a pained smile
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of his stack plays the big win, and losing one the crushing loss. Pose 1
is his rest pose again, only to measure the sheet by. Attach
`art-tools/pope_parts/sources/poses_a.png` FIRST, then
`art-tools/pope_parts/sources/pope_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: Pope Alexander VI, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same face, tall mitre, gold-embroidered vestments and big gold ring.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind him, no chair, nothing of him cut off by the edge of the picture (raised hands included). Nothing below the table edge. In every pose the big gold ring stays on his right hand and the mitre on his head.

1. EXACTLY his at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both arms raised high above his head, palms open as if blessing the pot, a broad, greedy, delighted grin
3. A crushing loss: one hand pressed to his brow under the mitre, eyes shut, lips pursed, the ringed hand flat on the felt

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No crozier, no cross held up, no poison, no chair.
```
