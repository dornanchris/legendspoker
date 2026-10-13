# Merlin: every pose, and the prompts

Camelot's seat 1 (the player's left), so he is drawn facing the viewer's right and is never mirrored. Built the way the Athens and Pirate Cove casts were (`art-tools/pose_rig.py`): a rest pose with a talking face, every other pose one of these drawings shown whole.

His look, from his character file: lean and tall in a hooded robe of undyed wool, the hood up (pushed back enough that his face is lit and his eyes read at 40 points), a long wild grey beard, deep-set eyes that never quite settle on the table, and a rough knotted staff taller than he is, standing upright beside him. The staff is his tell surface: a tall vertical line that can hum and glow faintly without being touched. It leans against his RIGHT shoulder (the left of the picture), on the outside of the table, so it never crosses Lancelot or Death.

Ruled out (his character file): T. H. White's Merlyn (living backwards, Archimedes the owl: still in copyright), Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap of the film Excalibur (1981) and the BBC's Merlin. Build from Geoffrey of Monmouth and Malory: a wild prophet of the woods, not a wizard in a costume. The first prompt borrows Silver's character sheet for LAYOUT AND STYLE ONLY and bans his look by name.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: the staff humming with a faint light (strong) beside tapping his staff twice; gazing past the table, as if the hand were already over (bluffing) beside staring at something that has not happened yet; murmuring a word nobody catches (weak) beside stroking his beard. His idle 'the candle nearest him bends the wrong way' is acted in the room (C5 is him glancing at it, one finger lifted); 'brushes ash from his sleeve' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the staff leaning on his right shoulder | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, slow and deliberate | MECH |
| A6 | Fold: slides his cards away without looking at them | MECH |
| B1 | All in: both hands push his stack, calm | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in, unhurried | MECH |
| B4 | The staff glows faintly along its length; he does not touch it | TELL |
| B5 | Taps his staff twice with two fingers (decoy for B4) | IDLE |
| B6 | Gazes somewhere past the table, as if the hand were already over | TELL |
| C1 | Stares wide-eyed at something that has not happened yet (decoy for B6) | IDLE |
| C2 | Murmurs a word nobody catches, head bowed, lips moving | TELL |
| C3 | Strokes his long beard (decoy for C2) | IDLE |
| C4 | Brushes ash from his left sleeve | IDLE |
| C5 | Glances up at a candle, one finger lifted lazily from the felt | IDLE |
| C6 | Hands folded on the table, eyes closed, perfectly still | IDLE |
| D1 | Talking: his right hand raised, palm out, a quiet prophecy | BEAT |
| D2 | Facing a big bet: eyes narrowed, unmoved | BEAT |
| D3 | Lost a pot: a small nod, as if he expected it | BEAT |
| D4 | Won a pot: a faint knowing smile, drawing the chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, the deep eyes fixed | BEAT |
| D6 | Knocked out: rises, takes up his staff, turns to go, unhurried | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Silver's character sheet (`art-tools/silver_parts/sources/silver_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Merlin's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again (the style reference), and nothing else.

**These are the style-locked prompts (the redraw).** The sheets in `sources/` came from the first version (without the lock: see git history); they drifted toward detailed illustration, and the game's Merlin is built from them until a redraw replaces them.

### Character sheet

```
Character sheet for 2D animation rigging: Merlin, the prophet of Arthurian legend, as Geoffrey of Monmouth (c. 1136) and Malory (1485) tell him: a wild prophet of the woods. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. Take the STYLE from the SECOND attached image. No apron, no parrot, no crutch, no striped shirt, no sailor's coat, no clean-shaven face.

Merlin: an old man, lean and tall; a long face with deep-set, far-seeing eyes under big bushy grey brows; a long grey beard reaching to his chest, drawn as a few big wavy locks; a hooded robe of plain undyed grey-brown wool, the hood UP but pushed back so his whole face is lit and clearly visible; long sleeves; thin, knotted hands. A rough knotted wooden staff, taller than he is, its top a gnarled knot. Calm, ancient, faintly amused. NOT a costume wizard: no pointed hat, no stars or moons, no blue robe, no owl, no wand, no crystal ball, no metal skullcap. Nothing from Disney's The Sword in the Stone, the film Excalibur, the BBC's Merlin or T. H. White.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the hood, the beard and the top of the robe: neutral, faintly amused; talking, mouth open mid-word; murmuring, eyes half closed; gazing far away past the viewer
- The torso in the hooded robe: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the long wool sleeves, lying on a table, pointing toward its centre, open at the elbow end
- The staff on its own, upright, twice: plain; and glowing faintly along its length with a soft blue-white light
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the staff upright and leaning against his right shoulder (the left of the picture), its top above his head: neutral; the staff glowing faintly; gazing past the table; murmuring

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Merlin, exactly as on the attached character sheet (lean and tall, a hooded robe of undyed grey-brown wool with the hood up but pushed back so his whole face is lit, a long grey beard in a few big wavy locks, deep-set eyes under bushy brows, a rough knotted wooden staff taller than he is leaning upright against his right shoulder, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his staff included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The staff stays upright, leaning against his right shoulder (the left of the picture), its knotted top above his head, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the staff leaning upright against his right shoulder; a calm, faintly amused look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right hand setting a stack of chips down well forward, slow and deliberate
6. Folding: his right hand sliding two cards away face down, without looking at them

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No pointed hat, no stars or moons, no owl, no wand, no crystal ball, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Merlin, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same hooded robe, beard and staff.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The staff stays upright, leaning against his right shoulder (the left of the picture), its knotted top above his head, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward, calm, leaning over the table a little
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in, unhurried
4. The staff glowing faintly along its whole length with a soft blue-white light, a few faint motes around it; he does not touch it or look at it; arms as at rest
5. Tapping the staff twice with two fingers of his right hand, raised from the table to the staff
6. Gazing somewhere past the table into the distance, as if the hand were already over, eyes unfocused; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No pointed hat, no stars or moons, no owl, no wand, no crystal ball, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Merlin, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same hooded robe, beard and staff.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The staff stays upright, leaning against his right shoulder (the left of the picture), its knotted top above his head, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Staring wide-eyed at something that has not happened yet, brows raised, head tilted a little; arms as at rest
2. Murmuring a word nobody catches: head bowed a little, eyes half closed, lips moving; arms as at rest
3. Stroking his long beard with his right hand, thoughtful
4. Brushing ash from his left sleeve with the fingers of his right hand
5. Glancing up at a candle above him, a faint smile, one finger of his right hand lifted lazily from the felt
6. His hands folded together on the table, eyes closed, perfectly still

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No pointed hat, no stars or moons, no owl, no wand, no crystal ball, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Merlin, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same hooded robe, beard and staff.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The staff stays upright, leaning against his right shoulder (the left of the picture), its knotted top above his head, unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right hand raised, palm out, a quiet prophecy
2. Facing a big bet: eyes narrowed, unmoved; arms as at rest
3. Lost a pot: a small nod, as if he expected it, eyes lowered; arms as at rest
4. Won a pot: a faint knowing smile, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, the deep-set eyes fixed
6. Knocked out: rising from his seat, taking up his staff in his right hand, turning to go, unhurried, at peace

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No pointed hat, no stars or moons, no owl, no wand, no crystal ball, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Merlin's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the hood, the beard and the top of the robe, as the reference, mouth closed, WITHOUT the staff. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; gazing far away, unfocused; narrowed (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the moustache and only the TOP of the beard around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; murmuring, lips barely parted; a faint knowing smile
- His head turned toward the viewer, nearly front-on, with the hood

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
