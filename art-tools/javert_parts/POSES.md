# Inspector Javert: every pose, and the prompts

Baker Street's seat 2 (left of the dealer): drawn facing the viewer's right, as the game shows him. Built the way Scipio is (`art-tools/pose_rig.py`), style-locked.

His look, from his character file: tall, in a long greatcoat that buttons to the chin, a black bicorne low over the eyes (the owner's call over the first sheet's top hat, which read less as Javert; the bicorne was the Paris police's hat from 1829, so it is period, and it is worn here with his greatcoat, not with any production's uniform), and, Hugo's own detail, enormous side-whiskers climbing toward a flat nose with deep nostrils. A face that almost never moves, so any movement reads. His tell surface is the greatcoat: its high collar and its row of buttons. At rest the top two buttons are open, so buttoning it to the collar is a big, readable shape.

Ruled out (his character file): the stage musical and every film of it: no lyrics, no costume from any production. Hugo's text and the nineteenth-century illustrations only. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: buttoning his coat to the collar (strong) beside straightening his stock; staring at you without blinking (weak) beside glancing at the door like a man expecting an escape; his hand shaking, very slightly (tilted) beside tapping his cane on the floor once. 'Consults a small black notebook' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, coat buttoned to mid-chest | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: one finger taps the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, exact | MECH |
| A6 | Fold: lays his cards down, square | MECH |
| B1 | All in: both hands push his whole stack, rigid | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Buttons his coat to the collar | TELL |
| B5 | Straightens his stock (decoy for B4) | IDLE |
| B6 | Stares at you without blinking | TELL |
| C1 | Glances at the door like a man expecting an escape (decoy for B6) | IDLE |
| C2 | His right hand shakes, very slightly | TELL |
| C3 | Taps his cane on the floor once (decoy for C2) | IDLE |
| C4 | Consults a small black notebook | IDLE |
| C5 | Sits bolt upright, arms rigid on the table | IDLE |
| C6 | Settles his bicorne lower on his brow | IDLE |
| D1 | Talking: one finger pointed, an accusation | BEAT |
| D2 | Facing a big bet: eyes narrowed under the brim | BEAT |
| D3 | Lost a pot: a stiff, grim nod | BEAT |
| D4 | Won a pot: no smile, drawing the chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes hard | BEAT |
| D6 | Knocked out: rises, buttons his coat, a stiff bow, leaves | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Javert's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Inspector Javert, of Victor Hugo's Les Misérables (1862), as Hugo describes him and the nineteenth-century illustrations show him. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no striped surcoat, no long hair. Take the STYLE from the SECOND attached image.

Javert: a tall, gaunt police inspector of about fifty, rigid and upright; a stern, narrow face that almost never moves; a flat nose with deep nostrils; thick dark side-whiskers climbing up his cheeks toward the nose (Hugo's detail), clean-shaven chin and lip; small, hard, deep-set eyes; a plain black BICORNE hat (a flat hat with two points, worn crosswise, one point over each shoulder, low over his eyes: the hat of the Paris police from 1829), no cockade, no trim; a long dark grey-blue greatcoat with a high turned-up collar and a single row of brass buttons, a white stock at the throat. His tell surface is the coat: show it buttoned to the middle of the chest, with the top two buttons OPEN. Grim, exact, incorruptible. NO top hat. NO police uniform, NO badge, NO sash, NO cockade. Nothing from the stage musical or any film. If an attached image shows a top hat, ignore it: the hat is the bicorne.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the bicorne, the neck and the top of the coat collar: neutral, cold and still; talking, mouth open mid-word; a thin, grim set of the mouth; staring, eyes wide and fixed
- The torso in the greatcoat, top two buttons open: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the greatcoat sleeves, lying on a table, pointing toward its centre, open at the elbow end
- A small black notebook on its own; a plain dark walking cane with a round brass knob on its own; the black bicorne on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; buttoning his coat to the collar; staring without blinking; his right hand lifted a little, shaking

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Javert, exactly as on the attached character sheet (a tall, gaunt police inspector of about fifty, a stern, almost motionless face with a flat nose and deep nostrils, thick dark side-whiskers climbing up his cheeks, a plain black bicorne hat worn crosswise, low over his eyes (the hat of the Paris police from 1829), no cockade, no trim, a long dark grey-blue greatcoat with a high collar and a single row of brass buttons, a white stock at the throat, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his hat included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. His greatcoat is buttoned to the middle of his chest, its top two buttons OPEN, unless the pose says otherwise. HIS HAT IS A BICORNE in every pose: a flat black hat with two points, worn crosswise, one point over each shoulder. It is NOT a tall round top hat; if any attached image shows a top hat, draw the bicorne instead. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; his coat buttoned to mid-chest, the top two buttons open; a cold, still look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: one finger of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand setting a stack of chips down, exact, well forward
6. Folding: his right hand laying two cards down face down, squared together

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No top hat, no police uniform, no badge, no cockade, no tricolour sash, no musical-theatre costume, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Javert, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, side-whiskers, black bicorne, long dark greatcoat and its row of buttons.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His greatcoat is buttoned to the middle of his chest, its top two buttons OPEN, unless the pose says otherwise. HIS HAT IS A BICORNE in every pose: a flat black hat with two points, worn crosswise, one point over each shoulder. It is NOT a tall round top hat; if any attached image shows a top hat, draw the bicorne instead. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward, rigid
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. Buttoning his greatcoat to the collar: his right hand at his throat doing up the top button, the coat now closed to the chin
5. Straightening the white stock at his throat with his right hand, the coat still open at the top
6. Staring straight at the viewer without blinking: eyes wide, fixed, unmoving; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No top hat, no police uniform, no badge, no cockade, no tricolour sash, no musical-theatre costume, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Javert, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, side-whiskers, black bicorne, long dark greatcoat and its row of buttons.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His greatcoat is buttoned to the middle of his chest, its top two buttons OPEN, unless the pose says otherwise. HIS HAT IS A BICORNE in every pose: a flat black hat with two points, worn crosswise, one point over each shoulder. It is NOT a tall round top hat; if any attached image shows a top hat, draw the bicorne instead. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Glancing sideways at a door behind him over his right shoulder, toward the left of the picture, like a man expecting an escape; arms as at rest
2. His right hand lifted just off the felt, fingers a little spread and tense, shaking very slightly (two short motion lines beside the fingers); eyes on his cards
3. Tapping a dark walking cane on the floor once: his right hand gripping the cane's round brass knob, just above the table's edge, the cane going down out of sight below the table
4. Consulting a small black notebook held open in his right hand in front of his chest, eyes on it
5. Sitting bolt upright, shoulders square, both arms rigid on the table
6. Settling his bicorne lower on his brow with his right hand

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No top hat, no police uniform, no badge, no cockade, no tricolour sash, no musical-theatre costume, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Javert, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, side-whiskers, black bicorne, long dark greatcoat and its row of buttons.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His greatcoat is buttoned to the middle of his chest, its top two buttons OPEN, unless the pose says otherwise. HIS HAT IS A BICORNE in every pose: a flat black hat with two points, worn crosswise, one point over each shoulder. It is NOT a tall round top hat; if any attached image shows a top hat, draw the bicorne instead. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right index finger pointed forward, an accusation
2. Facing a big bet: eyes narrowed under the bicorne; arms as at rest
3. Lost a pot: a stiff, grim nod, mouth set; arms as at rest
4. Won a pot: no smile, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, eyes hard
6. Knocked out: rising from his seat, buttoning his coat to the collar with his right hand, a stiff bow

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No top hat, no police uniform, no badge, no cockade, no tricolour sash, no musical-theatre costume, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Javert's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the mouths too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the black bicorne (NOT a top hat), the neck and the top of the coat collar, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed; wide and staring (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it and the inner edge of the side-whiskers, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a thin, grim line; lips pressed thin and turned down
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
