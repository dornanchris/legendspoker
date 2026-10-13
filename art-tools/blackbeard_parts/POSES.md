# Blackbeard: every pose, and the prompts

The Pirate Cove's champion, seated from the first hand in seat 4, the chair
with its back to the rock wall (the player's right). He is drawn facing the
viewer's right like everyone, and the game mirrors him to face the table's
centre. He is built the way the Athens table was (`art-tools/pose_rig.py`): a
rest pose with a talking face, and every other pose one of these drawings
shown whole.

His look, from his character file: a broad black hat with smoke curling from
under the brim on both sides (the slow-matches of the 1724 General History),
over a huge black beard in ribbon-tied braids that covers most of his face; a
heavy dark coat; a sling of pistols across the chest; eyes that hold a stare.
The beard is his tell surface, big and dark, dead centre in his fifth of the
screen, and his hand keeps going back to it.

Ruled out: Disney's Blackbeard in On Stranger Tides (no magic sword, no zombie
crew), Black Sails, Our Flag Means Death. No skull-and-crossbones anywhere.
His pistols never point at anyone: one lies on the felt in an idle, that is
all.

The first prompt borrows Odysseus's character sheet for its LAYOUT AND STYLE
ONLY, and bans his look by name.

Tags (MOTION-SPEC.md): MECH a poker action, IDLE noise, BEAT a mood, TELL one
of his three tells, each drawn beside the idle it hides among: stroking his
braided beard (strong) beside twisting one braid's ribbon; going very still
(bluffing) beside staring down the nearest man; the slow-matches under his hat
smouldering brighter, more smoke (tilted) beside the matches smoking as usual.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands resting apart, thin smoke under the hat | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: a knuckle raps the felt (right hand) | MECH |
| A4 | Call: slides a short stack forward (right hand) | MECH |
| A5 | Bet: slams a tall stack down well forward | MECH |
| A6 | Fold: flings his cards away (right hand) | MECH |
| B1 | All in: both hands shove his whole stack, grinning | MECH |
| B2 | Show: turns his cards over (right hand) | MECH |
| B3 | Collect the pot: both forearms out, raking it in | MECH |
| B4 | Strokes his braided beard (right hand) | TELL |
| B5 | Twists one braid's ribbon in his fingers (decoy for B4) | IDLE |
| B6 | Goes very still: hands flat, eyes fixed, not a muscle moving | TELL |
| C1 | Stares down the nearest man, leaning a little (decoy for B6) | IDLE |
| C2 | The matches under his hat smoulder brighter, thick smoke, eyes narrowed | TELL |
| C3 | The matches smoking as usual, a thin curl (decoy for C2) | IDLE |
| C4 | Sets a pistol on the felt, hand still on it | IDLE |
| C5 | Picks the pistol up again, tucking it back in the sling | IDLE |
| C6 | Laughs too loud, head back, fist on the table | IDLE |
| D1 | Talking: one finger jabbing the air | BEAT |
| D2 | Facing a big bet: a slow, dangerous grin | BEAT |
| D3 | Lost a pot: a roar, both fists raised | BEAT |
| D4 | Won a pot: arms wide, laughing | BEAT |
| D5 | Heads up: leaning in on both fists, smoke round his face | BEAT |
| D6 | Knocked out: rises, sweeping off his hat in a bow | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches Odysseus's
character sheet (`art-tools/odysseus_parts/sources/odysseus_sheet.png`) and
nothing else, for its layout and style only. From the second prompt on,
attach Blackbeard's own character sheet and, once it exists, his pose sheet A,
and nothing of anyone else's.

### Character sheet

```
Character sheet for 2D animation rigging: Blackbeard, the pirate Edward Teach (died 1718), as the 1724 General History of the Pyrates describes him. Copy ONLY the LAYOUT and the flat cartoon STYLE of the attached sheet (bold dark outlines, clean painted shading, warm light, the same line weight): take NOTHING of its character. No felt cap, no grey curly beard, no blue cloak, no ring, no tunic.

Blackbeard: a big, broad man in his late thirties; a broad black three-cornered hat; under its brim on both sides, lit slow-match cords tucked in, each with a thin curl of grey smoke; a huge black beard covering most of his face up to the eyes, worked into thick braids, each tied with a small red ribbon; fierce dark eyes under heavy brows that hold a stare; a heavy dark brown coat with wide cuffs over a dark red waistcoat; a leather sling across his chest from one shoulder holding three flintlock pistols in holsters, pointing down. Menacing but larger than life, a showman, never a zombie or a monster. No skull, no crossbones, no flag, no sword in hand. Nothing from any film or TV series.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the beard and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the hat, the smoking matches, the beard and the top of the coat: neutral, staring; talking, mouth open in the beard; a wide grin showing teeth; the matches smouldering brighter, thick smoke, eyes narrowed
- The torso in coat, waistcoat and pistol sling: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the coat's wide cuffs, lying on a table, pointing toward its centre, open at the elbow end
- One flintlock pistol on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; stroking his beard; very still, staring; laughing
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Blackbeard, exactly as on the attached character sheet (black three-cornered hat with smoking slow-matches under the brim, huge braided black beard with red ribbons, dark brown coat, dark red waistcoat, pistol sling, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, hat and smoke included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The hat, the smoking matches and the pistol sling stay as in pose 1 unless the pose says otherwise.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; thin smoke curling from under the hat; a hard stare, mouth closed in the beard
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: one knuckle of his right hand rapping the felt
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right hand slamming a tall stack of chips down well forward, leaning in
6. Folding: his right hand flinging two cards away face down across the felt

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No skull, no crossbones, no flag, no sword, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Blackbeard, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same hat, matches, beard, coat and pistols.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart).

1. All in: both hands shoving his whole stack of chips forward, leaning over the table, grinning through the beard
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, raking a pile of chips in
4. Stroking his braided beard slowly with his right hand, eyes on the table
5. Twisting the red ribbon on one braid between the finger and thumb of his right hand, idly
6. Very still: both hands flat on the felt, eyes fixed straight ahead, not a muscle moving, the smoke hanging

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No skull, no crossbones, no flag, no sword, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Blackbeard, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same hat, matches, beard, coat and pistols.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).

1. Staring down the man beside him, head turned a little, leaning in, brows down; arms as at rest
2. The slow-matches under his hat smouldering brighter, glowing orange, thick smoke rolling round the brim and his face, eyes narrowed; arms as at rest
3. The matches smoking as usual, one thin curl each side; arms as at rest
4. His right hand setting a flintlock pistol down on the felt beside him, hand still resting on it, barrel pointing at the table's edge, at nobody
5. His right hand tucking the pistol back into the sling across his chest
6. Laughing too loud: head thrown back, mouth wide in the beard, his right fist thumping the table

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No skull, no crossbones, no flag, no sword, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Blackbeard, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same hat, matches, beard, coat and pistols.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).

1. Talking: his right hand raised, one finger jabbing the air
2. Facing a big bet: a slow, dangerous grin, eyes narrowed; arms as at rest
3. Lost a pot: a roar, both fists raised to shoulder height
4. Won a pot: both arms flung wide, laughing
5. Down to two players: leaning in over the table on both fists, smoke curling round his face, eyes fixed
6. Knocked out: rising from his seat, sweeping off his hat in his right hand in a deep, mocking bow

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No skull, no crossbones, no flag, no sword, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Blackbeard's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the hat, the smoking matches, the beard and the top of the coat, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side, staring; narrowed (one piece each, both eyes with the brows and skin around them)
- His brows raised; his brows drawn down hard (one piece each, both brows)
- Lower-face patches, each the mouth inside the black beard with the beard around it, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a wide grin showing teeth; roaring wide open; a slow dangerous grin
- His whole head, hat and beard included, at the same size and angle, with the matches smouldering brighter and thick smoke round the brim
- His head turned toward the viewer, nearly front-on
```
