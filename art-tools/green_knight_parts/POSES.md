# The Green Knight (helmed): every pose, and the prompts

Camelot's seat 3 (on the player's right, beside Death): drawn facing the viewer's right and MIRRORED by the game to face the table's centre. Built a quarter bigger, as the Cyclops is: the giant at the table.

**Two looks** (the owner's design, which is the design doc's: 'green armour, enormous'). For his first sitting he is HELMED: green plate, a closed great helm, his eyes visible through the visor slit and nothing else of his face. When he is knocked out he takes the blow: D6 shows a red nick at his neck below the helm's rim as he rises and goes. When he comes back twenty hands later (`returns` in his file) the helm is gone: the bareheaded set is `art-tools/green_knight_bare_parts/POSES.md`, his face the green, bearded, grinning one the owner's first sheet drew (`sources/bare_head_ref.png`), with a healed scar on his neck. The game swaps one puppet for the other when he returns.

The helm hides his mouth, so this set has no mouth pieces: he talks with his helm and hands (a small nod per phrase, the D1 gesture), and his face sheet is his eyes through the slit.

Ruled out: David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Never show him holding his severed head (the design doc: that image belongs to the Headless Horseman); the nick at his neck is as far as the blow goes, a cartoon nick, never gore.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: the holly branch rustling (strong) beside moss creeping along his sleeve; laughing so the rafters shake (bluffing) beside a broad grin; running a thumb along the head of his axe (weak) beside measuring the table with a flat hand, as if for a blow. 'Somewhere outside, his horse stamps' is C4 (his helm turns toward the door); 'the chair creaks under his weight' is C5.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, gauntlets apart, helm closed, eyes in the slit | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: a big finger taps the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: shoves a stack forward | MECH |
| A6 | Fold: tosses his cards away with a shrug | MECH |
| B1 | All in: both huge hands push his whole stack | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms scooping the pot in | MECH |
| B4 | The holly branch rustles, leaves shaking | TELL |
| B5 | Watches moss creep along his sleeve (decoy for B4) | IDLE |
| B6 | Laughs, helm thrown back, shoulders shaking | TELL |
| C1 | Eyes crinkled in a grin behind the slit (decoy for B6) | IDLE |
| C2 | Runs a thumb along the head of his axe | TELL |
| C3 | Measures the table with a flat hand, as if for a blow (decoy for C2) | IDLE |
| C4 | Turns his helm toward the door: his horse stamps outside | IDLE |
| C5 | Shifts his great weight; the chair creaks | IDLE |
| C6 | Leans back, arms folded, helm tilted, enjoying himself | IDLE |
| D1 | Talking: one big gauntlet open, booming | BEAT |
| D2 | Facing a big bet: eyes narrowed in the slit, a challenge | BEAT |
| D3 | Lost a pot: laughs and slaps the table | BEAT |
| D4 | Won a pot: scooping chips in, eyes bright | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes fixed | BEAT |
| D6 | Knocked out: rises, a red nick at his neck, axe on his shoulder: until next time | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach the Green Knight's own (helmed) character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: the Green Knight, from the 14th-century poem Sir Gawain and the Green Knight. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No silver armour, no striped surcoat, no red cape, no bare head. Take the STYLE from the SECOND attached image.

The Green Knight: an enormous knight, a head taller than any other man at the table and broad as a door; bright GREEN plate armour edged with gold, big rounded shoulder plates, green gauntlets; a closed green great helm, rounded on top, with ONE narrow horizontal visor slit, and his two bright eyes clearly visible through the slit, with whites, so they can look about and blink; nothing else of his face shows. Props: a big branch of holly, dark glossy spiky leaves and bright red berries, as tall as his head and shoulders; and a great axe with a huge broad blade, green and gold, its haft wound with green. Hearty and booming, a little alarming. NOT a tree-man: no bark, no leaves growing from him. Never holding his own head. Nothing from the film The Green Knight (2021).

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes in the slit and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- The helmed head four times, each with the top of the armour: neutral, eyes bright; eyes narrowed, delighted; helm tilted back, laughing (eyes crinkled shut); helm turned toward the viewer
- The torso in armour: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in green plate with the gauntlets, lying on a table, pointing toward its centre, open at the elbow end
- The holly branch on its own, upright
- The axe head on its own, lying flat, with the top of its haft
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, gauntlets apart, the holly branch tucked behind his right shoulder (the left of the picture) standing up above his helm, and the head of the axe resting on the table's edge by his right hand, its haft going down out of sight: neutral; the holly rustling; laughing, helm back; running his thumb along the axe head

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Green Knight, exactly as on the attached character sheet (an enormous knight in bright green plate armour edged with gold, a closed green great helm with a narrow visor slit and his two bright eyes clearly visible through it, a big holly branch tucked behind his right shoulder, the head of a great green-and-gold axe resting on the table's edge by his right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of the holly branch included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The helm stays closed in every pose, his eyes showing through the visor slit. The holly branch stays tucked behind his right shoulder (the left of the picture), standing up above his helm, and the axe head stays on the table's edge by his right hand, its haft going down out of sight, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his gauntlets resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the holly branch behind his right shoulder; the axe head on the table's edge by his right hand; helm closed, eyes bright in the slit
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes looking down
3. Checking: one big finger of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand shoving a stack of chips well forward
6. Folding: his right hand tossing two cards away face down, with a shrug

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No horse, no severed head, no gore, no bark or tree skin, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Green Knight, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same green armour, helm, holly branch and axe.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The helm stays closed in every pose, his eyes showing through the visor slit. The holly branch stays tucked behind his right shoulder (the left of the picture), standing up above his helm, and the axe head stays on the table's edge by his right hand, its haft going down out of sight, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both huge hands pushing his whole stack of chips forward, leaning in
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, scooping a pile of chips in
4. The holly branch behind his shoulder rustling: leaves shaking, berries bouncing, a few motion lines; he does not touch it; arms as at rest
5. Looking down at his left forearm, where a little green moss is creeping along the plate, amused; arms as at rest
6. Laughing a huge laugh: helm thrown back, shoulders shaking, eyes crinkled shut in the slit; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No horse, no severed head, no gore, no bark or tree skin, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Green Knight, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same green armour, helm, holly branch and axe.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The helm stays closed in every pose, his eyes showing through the visor slit. The holly branch stays tucked behind his right shoulder (the left of the picture), standing up above his helm, and the axe head stays on the table's edge by his right hand, its haft going down out of sight, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. A broad grin you can see only in his eyes, crinkled in the slit; arms as at rest
2. Running the thumb of his right gauntlet along the edge of the axe head on the table, slowly
3. His right hand held flat above the table, measuring it, as if for a blow, one eye narrowed in the slit
4. His helm turned toward a door over his left shoulder, as if hearing his horse stamp outside; arms as at rest
5. Shifting his great weight in his seat, one shoulder dipped; arms as at rest
6. Leaning back from the table, arms folded across his breastplate, helm tilted, enjoying himself

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No horse, no severed head, no gore, no bark or tree skin, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the Green Knight, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same green armour, helm, holly branch and axe.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The helm stays closed in every pose, his eyes showing through the visor slit. The holly branch stays tucked behind his right shoulder (the left of the picture), standing up above his helm, and the axe head stays on the table's edge by his right hand, its haft going down out of sight, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right gauntlet open, booming
2. Facing a big bet: eyes narrowed in the slit, a challenge accepted; arms as at rest
3. Lost a pot: laughing, his right hand slapping the table
4. Won a pot: his right hand scooping a few chips toward him, eyes bright
5. Down to two players: leaning in on both forearms, eyes fixed
6. Knocked out: rising from his seat, a small red nick showing at his neck just below the helm's rim with a few drops (a cartoon nick, no gore), the axe in his right hand resting on his shoulder, a cheerful salute: until next time

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No horse, no severed head, no gore, no bark or tree skin, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Green Knight's eyes, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his helmed head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that helm. Draw that helmed head once, top left, with the top of the armour, as the reference. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- The visor slit with the green metal around it and his eyes inside, one piece each: lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side, toward a door; narrowed, delighted; wide open; crinkled shut, laughing
- His helmed head turned toward the viewer, nearly front-on, eyes in the slit

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
