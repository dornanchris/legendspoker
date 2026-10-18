# Spartacus: every pose, and the prompts

Rome's seat 1 (the player's left): drawn facing the viewer's right, as the game shows him. Built the way Scipio is (`art-tools/pose_rig.py`), style-locked.

His look, from his character file: broad bare shoulders under a rough Thracian cloak, cropped hair, a nose broken more than once; a fighter, not a showman, so no gladiator helmet. Heavy hands that never quite rest. His prop is the pale band of old shackle scar round his wrist; his wrist and shoulders carry his tells.

Ruled out (his character file): Howard Fast's novel, the 1960 film and the television series: no screen-gladiator harness, no 'I am Spartacus'. Build from Plutarch and Appian. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: rolling his shoulders like a fighter before a bout (strong) beside rolling his neck; rubbing the scar on his wrist (tilted) beside flexing his hands; staring hard across the table (bluffing) beside glancing at the doors. 'Tests the weight of the table' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the wrist scar showing | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: knuckles rap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: shoves a stack forward, hard | MECH |
| A6 | Fold: flicks his cards away | MECH |
| B1 | All in: both hands drive his whole stack forward | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drag the pot in | MECH |
| B4 | Rolls his shoulders like a fighter before a bout | TELL |
| B5 | Rolls his neck (decoy for B4) | IDLE |
| B6 | Rubs the old shackle scar on his left wrist | TELL |
| C1 | Flexes his hands, fingers spread (decoy for B6) | IDLE |
| C2 | Stares hard across the table | TELL |
| C3 | Glances at the doors (decoy for C2) | IDLE |
| C4 | Grips the table's edge as if testing its weight | IDLE |
| C5 | A short, hard laugh | IDLE |
| C6 | Arms folded on the table, watching | IDLE |
| D1 | Talking: one fist on the table, blunt | BEAT |
| D2 | Facing a big bet: jaw set, leaning in | BEAT |
| D3 | Lost a pot: a hard exhale, head tilted back | BEAT |
| D4 | Won a pot: a fierce grin, dragging chips in | BEAT |
| D5 | Heads up: leaning over the table on both fists | BEAT |
| D6 | Knocked out: stands, looks once at the doors, goes | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Spartacus's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Spartacus, the Thracian gladiator who led the great slave revolt against Rome in 73-71 BC, as Plutarch and Appian describe him. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no surcoat, no long hair. Take the STYLE from the SECOND attached image.

Spartacus: a powerful man in his thirties, broad-shouldered and heavy-handed; cropped dark hair and a short dark beard; a strong, weathered face with a nose broken more than once and steady, wary dark eyes; bare muscled shoulders and arms; a rough, plain brown wool cloak pinned at his right shoulder with a simple iron pin, hanging over a plain sleeveless tunic. Round his LEFT wrist, a wide pale band of old scar where a shackle was, clearly visible. A fighter, not a showman. NO gladiator helmet, NO leather harness or armour, NO sword, NO chains. Nothing from any film or television portrayal.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck and the top of the cloak: neutral, wary; talking, mouth open mid-word; a fierce grin; a hard stare
- The torso in the cloak and tunic: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two bare forearms, lying on a table, pointing toward its centre, open at the elbow end, the LEFT one with the pale scar band at the wrist
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; rolling his shoulders; rubbing the scar on his wrist; staring hard across the table

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Spartacus, exactly as on the attached character sheet (a broad-shouldered Thracian fighter in his thirties, cropped dark hair, a short dark beard, a nose broken more than once, bare muscled shoulders and arms under a rough brown wool cloak pinned at one shoulder, a pale band of old shackle scar round his LEFT wrist, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his head included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The pale shackle scar shows round his left wrist in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the pale scar band round his left wrist showing; a wary, steady look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: the knuckles of his right hand rapping the felt once
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand shoving a stack of chips well forward, hard
6. Folding: his right hand flicking two cards away face down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No gladiator helmet, no leather harness, no sword, no chains, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Spartacus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, cropped hair, broken nose, bare shoulders, rough cloak and wrist scar.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The pale shackle scar shows round his left wrist in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands driving his whole stack of chips forward
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, dragging a pile of chips in
4. Rolling his shoulders like a fighter before a bout, shoulders up and back, chin down; hands as at rest
5. Rolling his neck, head tilted to one side, eyes half closed; arms as at rest
6. Rubbing the pale scar on his left wrist with the fingers of his right hand

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No gladiator helmet, no leather harness, no sword, no chains, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Spartacus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, cropped hair, broken nose, bare shoulders, rough cloak and wrist scar.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The pale shackle scar shows round his left wrist in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Flexing both hands on the felt, fingers spread wide
2. Staring hard across the table, head forward, eyes narrowed; arms as at rest
3. Glancing sideways at the doors, head turned to his left; arms as at rest
4. Gripping the table's edge with both hands as if testing its weight, shoulders tense
5. A short, hard laugh, head back a little; arms as at rest
6. His arms folded on the table in front of him, watching

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No gladiator helmet, no leather harness, no sword, no chains, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Spartacus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, cropped hair, broken nose, bare shoulders, rough cloak and wrist scar.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The pale shackle scar shows round his left wrist in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right fist resting on the table, blunt
2. Facing a big bet: jaw set, leaning in a little; arms as at rest
3. Lost a pot: a hard exhale, head tilted back; arms as at rest
4. Won a pot: a fierce grin, his right hand dragging a few chips toward him
5. Down to two players: leaning over the table on both fists, eyes level
6. Knocked out: rising from his seat, looking once over his shoulder toward the doors

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No gladiator helmet, no leather harness, no sword, no chains, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Spartacus's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the neck and the top of the cloak, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a fierce grin; a hard-set mouth
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of his stack plays the big win, and losing one the crushing loss. Pose 1
is his rest pose again, only to measure the sheet by. Attach
`art-tools/spartacus_parts/sources/poses_a.png` FIRST, then
`art-tools/spartacus_parts/sources/spartacus_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: Spartacus, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same face, cropped hair, broken nose, bare shoulders, rough cloak and wrist scar.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind him, no chair, nothing of him cut off by the edge of the picture (raised hands included). Nothing below the table edge. In every pose the pale shackle scar shows round his left wrist.

1. EXACTLY his at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both fists thrust high above his head, roaring in triumph, the shackle scar showing on his left wrist
3. A crushing loss: both fists pressed to the table's edge, head hung low, jaw clenched, eyes shut

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No sword, no shield, no chains, no helmet, no chair.
```
