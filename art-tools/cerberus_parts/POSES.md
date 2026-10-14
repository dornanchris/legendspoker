# Cerberus: every pose, and the prompts

Rome's seat 3 (right of Death): drawn facing the viewer's right and MIRRORED by the game to face the table's centre. Built the way the other casts are (`art-tools/pose_rig.py`), a quarter bigger, as the Cyclops and the Green Knight are: he is a monster at a table of men.

His look, from his character file and the design doc: three heads on one massive body, nothing else in the game looks like it. Black, short-coated, heavy in the jaw. No snakes: Apollodorus gives him snakes along his back and a serpent's tail, but the table hides both, and a ridge of snakes on show reads as Medusa's hair at forty points (the owner's call). Each neck has a studded bronze collar (Rome's colour, and it keeps three black heads apart at 40 points). He sits up behind the table like a great dog, front paws on its edge where the others rest their forearms. **The heads are the tell surface:** each can watch, sleep, yawn or snarl on its own; most of the time they are just being dogs.

He does not speak (the design doc): growls, whines and yawns carry it, and Death translates now and then. His `talk` pose is a low growl from the middle head; his callouts are stage directions ('[noses his cards away]').

Ruled out (his character file): the three-headed dog of the Harry Potter books and films, Disney's Hercules, no oversized friendly puppy, no names for the heads. Build from Greek vase painting and Apollodorus. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: all three heads snapping to attention (strong) beside two heads watching you and one the pot; the left head yawning (weak) beside one head falling asleep; the heads growling at each other (tilted) beside the middle head scratching behind an ear with a front paw. 'The right head sniffs at the nearest robe' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: sitting up, front paws on the table's edge, three heads calm, looking about | IDLE |
| A2 | Peeking: a paw lifts the corner of his cards, all three heads peer down | MECH |
| A3 | Check: a paw taps the felt | MECH |
| A4 | Call: a paw slides a short stack forward | MECH |
| A5 | Bet: the middle head noses a stack forward | MECH |
| A6 | Fold: the middle head noses his cards away, the others lose interest | MECH |
| B1 | All in: both paws shove his whole stack, all heads leaning in | MECH |
| B2 | Show: a paw flips his cards over | MECH |
| B3 | Collect: both paws drag the pot in, heads pleased | MECH |
| B4 | All three heads snap to attention, ears up, staring at the pot | TELL |
| B5 | Two heads watch the viewer; one watches the pot (decoy for B4) | IDLE |
| B6 | The left head yawns, wide | TELL |
| C1 | One head (the right) falls asleep on the table's edge (decoy for B6) | IDLE |
| C2 | The heads growl at each other, teeth bared | TELL |
| C3 | The middle head scratches behind an ear with a front paw (decoy for C2) | IDLE |
| C4 | The right head sniffs at something beside him, nose stretched out | IDLE |
| C5 | All three heads pant, tongues out, content | IDLE |
| C6 | All three heads look straight at the viewer, still | IDLE |
| D1 | Talking: the middle head growls low, lips curled; the others listen | BEAT |
| D2 | Facing a big bet: hackles up, all three heads low and fixed | BEAT |
| D3 | Lost a pot: a whine, ears flat, the heads looking away | BEAT |
| D4 | Won a pot: tongues lolling, a paw drawing chips in | BEAT |
| D5 | Heads up: all three heads low over the table, eyes locked | BEAT |
| D6 | Knocked out: drops down from the table and pads away, one head looking back | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Cerberus's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Cerberus, the three-headed hound who guards the gate of the underworld in Greek myth (Hesiod, Apollodorus, Greek vase painting). Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No man, no armour, no hair, no human hands. Take the STYLE from the SECOND attached image.

Cerberus: a huge hound, bigger than a man, with THREE heads on three strong necks rising from one massive body: a left head, a middle head and a right head, all the same breed, each clearly separate. A short, glossy BLACK coat with a warm sheen; heavy jaws, pointed upright ears, big glowing amber eyes; each neck wears a broad bronze collar with round studs. NO snakes anywhere: not on the heads, necks or back. Big front paws with dark claws. Menacing but alive and doglike, every head with its own mood. NOT a cartoon puppy, not cute, not oversized and friendly; no names; nothing from the Harry Potter books or films or Disney's Hercules.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. All three heads, all six eyes and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- The three heads together on their necks, with the collars and the top of the chest, four times: all calm, alert; the middle head growling, lips curled; the left head yawning wide; all three panting, tongues out
- One single head on its own neck with its collar, large, calm (the reference for the face sheet)
- The body: chest and shoulders sitting upright, the three necks cut off just above the collars, NO heads, cut off straight below the chest; NO front legs
- Two front legs and paws, lying on a table, pointing toward its centre, open at the shoulder end
- Four seated reference poses, sitting up behind the curved edge of a round green poker table like a great dog at a table, both front paws resting on its edge, apart: all calm; all three heads snapped to attention; the left head yawning; the heads growling at each other

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; faces with only a few lines (no fine wrinkles, no cross-hatching); fur drawn as a few big smooth shapes, never hair by hair; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Cerberus, exactly as on the attached character sheet (a huge black three-headed hound, short glossy black coat, heavy jaws, pointed ears, glowing amber eyes, each neck in a studded bronze collar, no snakes anywhere, his two front paws resting on the table's edge, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the tops of all three heads and their ears included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the paw that the pose does not mention stays EXACTLY as in pose 1, same position. All three heads are always drawn, each on its own neck, the left one (nearest the viewer's left), the middle one and the right one, never overlapping so much that one is hidden. His front paws rest on the table's edge as at rest unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: sitting up behind the table, both front paws resting on the felt in front of him, apart, relaxed; all three heads calm, the left one looking about, the middle one ahead, the right one at the table; mouths closed
2. Peeking at his cards: his right paw lifting the near corner of two cards on the felt, all three heads peering down at them
3. Checking: his right paw tapping the felt once
4. Calling: his right paw sliding a short stack of chips forward
5. Betting: the middle head lowered, nosing a stack of chips well forward; the other two heads watching
6. Folding: the middle head nosing two face-down cards away; the left and right heads already looking elsewhere, bored

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human hands, no human body, no clothes, no chair, no names, no text.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Cerberus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same three heads, black coat, bronze collars and paws.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The paw a pose does not mention stays EXACTLY as in the at-rest pose (front paws resting apart). All three heads are always drawn, each on its own neck, the left one (nearest the viewer's left), the middle one and the right one, never overlapping so much that one is hidden. His front paws rest on the table's edge as at rest unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both front paws shoving his whole stack of chips forward, all three heads leaning in, eager
2. Showing: his right paw flipping two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both front paws dragging a pile of chips in toward his chest, the heads pleased
4. All three heads snapping to attention at once: ears up, eyes wide, all staring at the middle of the table; paws as at rest
5. Two heads (the left and the middle) watching the viewer; the right head watching the middle of the table; paws as at rest
6. The left head yawning wide, eyes squeezed shut, tongue curled; the other two heads calm; paws as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human hands, no human body, no clothes, no chair, no names, no text.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Cerberus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same three heads, black coat, bronze collars and paws.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The paw a pose does not mention stays EXACTLY as in the at-rest pose (front paws resting apart). All three heads are always drawn, each on its own neck, the left one (nearest the viewer's left), the middle one and the right one, never overlapping so much that one is hidden. His front paws rest on the table's edge as at rest unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. The right head asleep, resting its chin on the table's edge, eyes closed; the other two awake and calm; paws as at rest
2. The heads growling at each other: the left and middle heads snarling at one another, teeth bared, the right head growling too; paws as at rest
3. The middle head scratching behind its ear with his right front paw raised, eyes half closed with pleasure
4. The right head stretched out to the side, nose sniffing at something just beside him, curious; paws as at rest
5. All three heads panting, tongues out, content; paws as at rest
6. All three heads turned to look straight at the viewer, perfectly still; paws as at rest

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human hands, no human body, no clothes, no chair, no names, no text.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Cerberus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same three heads, black coat, bronze collars and paws.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The paw a pose does not mention stays EXACTLY as in the at-rest pose (front paws resting apart). All three heads are always drawn, each on its own neck, the left one (nearest the viewer's left), the middle one and the right one, never overlapping so much that one is hidden. His front paws rest on the table's edge as at rest unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: the middle head growling low, lips curled, the other two heads listening; paws as at rest
2. Facing a big bet: hackles up along the necks, all three heads low and fixed on the middle of the table; paws as at rest
3. Lost a pot: a whine, all three heads with ears flat, looking away; paws as at rest
4. Won a pot: tongues lolling happily, his right paw drawing a few chips toward him
5. Down to two players: all three heads low over the table, eyes locked straight ahead; both paws forward on the felt
6. Knocked out: dropping down from the table, turning away to pad off, one head looking back over his shoulder

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human hands, no human body, no clothes, no chair, no names, no text.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Cerberus's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his MIDDLE head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw the three heads together once, top left, as in the at-rest pose, as the reference, mouths closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- The middle head's eyes, each piece both eyes with the black fur around them: lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed, wary
- The middle head's muzzle and jaw, each a separate piece cut across just below the eyes: closed; a low growl, lips curled; open, panting, tongue out; a whine, mouth slightly open; a snarl, teeth bared
- The LEFT head on its own neck and collar, at its size and angle in the at-rest pose, four times: calm; eyes closed, asleep; yawning wide; snarling
- The RIGHT head on its own neck and collar, at its size and angle in the at-rest pose, four times: calm; eyes closed, asleep; sniffing, nose out; snarling
- The middle head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
