# Davy Jones: every pose, and the prompts

The Pirate Cove's seat 3, on the player's right: drawn facing the viewer's right and MIRRORED by the game to face the table's centre. Built the way Athens and Blackbeard were (`art-tools/pose_rig.py`).

His look, from his character file: tall and hunched in a long, waterlogged sea-coat and a broad hat whose brim sheds a thread of water, weed in the folds; a face grey as a drowned man's, mostly in shadow, a sodden grey beard (plainly hair), and two pale, round, unblinking eyes that catch the lamplight. His tell surface is the dripping sleeve, the one wet thing at a dry table. He is quiet and patient and never raises his voice.

Strictly ruled out: Disney's Davy Jones (Pirates of the Caribbean): no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice. Ours has a human face. The first prompt borrows Kidd's character sheet for LAYOUT AND STYLE ONLY.

His third tell, the lamp nearest him flickering (bluffing), is drawn on him as the light dying on his face (only the eyes still catching it); the game can also gutter the Cove's nearest lantern flame in code. Tags (MOTION-SPEC.md): each tell beside the idle it hides among: water dripping hard from his sleeve (strong) beside wringing out his beard; drumming on the table like rain on a deck (weak) beside humming a shanty, fingers still; his face going into shadow (bluffing) beside lifting his face into the light.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, a thin drip from his right sleeve | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: one finger taps the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, slow and calm | MECH |
| A6 | Fold: slides his cards away without a flicker | MECH |
| B1 | All in: both hands push his stack, unhurried | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Water drips hard from his sleeve, pooling on the felt | TELL |
| B5 | Wrings out his beard, water running (decoy for B4) | IDLE |
| B6 | Drums his fingers on the table like rain on a deck | TELL |
| C1 | Hums a shanty, eyes half closed, fingers still (decoy for B6) | IDLE |
| C2 | His face sinks into shadow, only the pale eyes catching the light | TELL |
| C3 | Lifts his face into the lamplight (decoy for C2) | IDLE |
| C4 | A small crab climbs out of his coat pocket; he watches it | IDLE |
| C5 | A green-grey haze of low tide curls up from his coat | IDLE |
| C6 | Tips water off his hat brim | IDLE |
| D1 | Talking: a quiet word, one hand turned up | BEAT |
| D2 | Facing a big bet: the pale eyes fixed, unblinking | BEAT |
| D3 | Lost a pot: no flicker at all, a slow nod | BEAT |
| D4 | Won a pot: the faintest smile, drawing the chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes fixed | BEAT |
| D6 | Knocked out: rises, water streaming from him, and turns away | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches Kidd's character sheet (`art-tools/kidd_parts/sources/kidd_sheet.png`) and nothing else, for its layout and style only. From the second prompt on, attach Davy Jones's own character sheet and, once it exists, his pose sheet A, and nothing of anyone else's.

### Character sheet

```
Character sheet for 2D animation rigging: Davy Jones, the drowned sailors' devil of 18th-century sea folklore. Copy ONLY the LAYOUT and the flat cartoon STYLE of the attached sheet (bold dark outlines, clean painted shading, warm light, the same line weight): take NOTHING of its character. No wig, no cravat, no brass-buttoned navy coat, no anxious face.

Davy Jones: tall and hunched, gaunt; a long, heavy, waterlogged sea-coat, dark green-black, with strands of seaweed caught in its folds and seams, the cuffs sodden; a broad, shapeless, sodden hat whose brim sheds a thin thread of water; a long face grey as a drowned man's, mostly in the shadow of the hat; a sodden grey beard, plainly HAIR, hanging in wet strands; two pale, round, unblinking eyes that catch the light; long grey fingers. Water drips from his right sleeve. Quiet, patient, eerie, never monstrous: a human face. NO tentacles, NO crab claw, NO pipe, NO barnacles or shell skin, NO skull. Nothing from any film.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the hat, the beard and the top of the coat: neutral, unblinking; talking, a quiet word; the face sunk in shadow, only the pale eyes lit; humming, eyes half closed
- The torso in the coat: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the sodden sleeves, lying on a table, pointing toward its centre, open at the elbow end, the right one dripping
- A small grey-green crab on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; water dripping hard from his sleeve; drumming his fingers; the face sunk in shadow
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Davy Jones, exactly as on the attached character sheet (tall and hunched, a long dark green-black waterlogged sea-coat with weed in its folds, a broad sodden hat dripping a thread of water from the brim, a grey drowned face mostly in shadow, a sodden grey beard, two pale round unblinking eyes, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the hat included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. Water keeps dripping from his right sleeve in thin drops in every pose.

1. At rest: both forearms lying along the table's edge, his long hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; a thin thread of drips from his right sleeve; pale eyes unblinking, mouth closed in the beard
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: one long finger of his right hand tapping the felt once
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right hand setting a stack of chips down forward, slow and calm
6. Folding: his right hand sliding two cards away face down, without a flicker

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No tentacles, no crab claw, no pipe, no shell or barnacle skin, no skull, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Davy Jones, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same hat, coat, beard and dripping sleeves.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Water keeps dripping from his right sleeve in thin drops in every pose.

1. All in: both hands pushing his whole stack of chips forward, unhurried
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. Water dripping hard from his right sleeve, a small puddle spreading on the felt by his hand; arms as at rest
5. Wringing out his beard with his right hand, water running down
6. Drumming the fingers of his right hand on the felt like rain on a deck

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No tentacles, no crab claw, no pipe, no shell or barnacle skin, no skull, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Davy Jones, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same hat, coat, beard and dripping sleeves.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Water keeps dripping from his right sleeve in thin drops in every pose.

1. Humming a shanty under his breath, eyes half closed, fingers still; arms as at rest
2. His face sunk into deep shadow under the hat brim, only the two pale eyes catching the light; arms as at rest
3. Lifting his face a little into the lamplight, the grey skin lit; arms as at rest
4. A small grey-green crab climbing out of his coat pocket, his eyes turned down to watch it; arms as at rest
5. A faint green-grey haze of low tide curling up from his coat around him; arms as at rest
6. Tipping water off the brim of his hat with his right hand

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No tentacles, no crab claw, no pipe, no shell or barnacle skin, no skull, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Davy Jones, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same hat, coat, beard and dripping sleeves.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Water keeps dripping from his right sleeve in thin drops in every pose.

1. Talking: a quiet word, his right hand turned up on the felt
2. Facing a big bet: the pale eyes fixed, unblinking; arms as at rest
3. Lost a pot: no flicker at all, a slow nod; arms as at rest
4. Won a pot: the faintest smile, his right hand drawing a few chips in
5. Down to two players: leaning in on both forearms, eyes fixed and pale
6. Knocked out: rising from his seat, water streaming from his coat, turning away

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No tentacles, no crab claw, no pipe, no shell or barnacle skin, no skull, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Davy Jones's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the hat, the beard and the top of the coat, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His pale round eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; wide and fixed (one piece each, both eyes with the grey skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the wet grey beard around it, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; humming, lips barely parted; the faintest smile
- His whole head, hat included, sunk in shadow, only the pale eyes lit
- His head turned toward the viewer, nearly front-on
```
