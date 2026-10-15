# The Headless Horseman: every pose, and the prompts

Transylvania's seat 4 (far right): drawn facing the viewer's right and MIRRORED by the game to face the table's centre. Built the way Van Helsing is (`art-tools/pose_rig.py`), style-locked to Washington's sheet.

His look, from his character file and Irving: huge, cloaked and square-shouldered, stopping abruptly at the collar; the missing head is the strongest shape at the table. A Hessian trooper's coat (blue with red facings) under a heavy riding cloak, gauntlets, a cavalry sword. On his collar sits a carved pumpkin with a plain candle inside, and its LIGHT is the tell surface: brighter, guttering. He has no face, so the face sheet is the pumpkin in its states of light.

Ruled out (his character file): Disney's 1949 cartoon and Burton's 1999 film: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle is our addition, not Irving's, and stays a plain candle. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: the candle burning brighter (strong) beside settling the pumpkin on his collar (light and pumpkin both times); the flame guttering (tilted) beside a cold smell of leaves drifting from him (a faint drift of dead leaves); drumming a gauntlet on the table (weak) beside his sword rattling in its scabbard (a hand moving at the table). 'Turns his whole body to look at you' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: gauntlets on the table's edge, apart, the pumpkin on his collar, candle steady | IDLE |
| A2 | Peeking at his cards (right gauntlet) | MECH |
| A3 | Check: a gauntleted finger taps the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: pushes a stack forward | MECH |
| A6 | Fold: flicks his cards away | MECH |
| B1 | All in: both gauntlets push his whole stack | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | The candle in his pumpkin burns brighter | TELL |
| B5 | Settles the pumpkin on his collar (decoy for B4) | IDLE |
| B6 | Drums a gauntlet on the table | TELL |
| C1 | His sword rattles in its scabbard (decoy for B6) | IDLE |
| C2 | The flame in his pumpkin gutters | TELL |
| C3 | A smell of cold leaves drifts from him (decoy for C2) | IDLE |
| C4 | Turns his whole body to look at you | IDLE |
| C5 | Draws his cloak about his shoulders | IDLE |
| C6 | Sits very still, the pumpkin tilted a little toward the pot | IDLE |
| D1 | Talking: one gauntlet raised, the pumpkin's light pulsing | BEAT |
| D2 | Facing a big bet: leaning back, gauntlets flat | BEAT |
| D3 | Lost a pot: shoulders slump, the light dims | BEAT |
| D4 | Won a pot: drawing chips in, the light bright | BEAT |
| D5 | Heads up: leaning in on both forearms | BEAT |
| D6 | Knocked out: rises, pumpkin under his arm, turns to go | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach the Horseman's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: the Headless Horseman, of Washington Irving's The Legend of Sleepy Hollow (1820): the ghost of a Hessian trooper whose head was carried away by a cannonball. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no striped surcoat, no long hair. Take the STYLE from the SECOND attached image.

The Headless Horseman: a HUGE, square-shouldered soldier with NO HEAD: his body stops abruptly at a high black stock and coat collar. A dark blue Hessian soldier's coat of 1776 with red facings and brass buttons, a buff waistcoat, a heavy black riding cloak thrown over his broad shoulders, big brown leather gauntlets; the brass hilt of a cavalry sword rises beside his left hip. On his collar, where his head should be, sits a round orange pumpkin carved with two plain round eye holes and one short, straight slit for a mouth (NOT a grin, NO teeth, NOT leering), a plain candle burning inside it, its warm light showing through the holes. The missing head is his strongest shape: the empty space above the collar must read at a tiny size. Silent, cold, patient, faintly courteous. NO flaming jack-o'-lantern, NO fire pouring out, NO leering grin, NO teeth, NO cackling, NO horse, nothing from Disney's 1949 cartoon or any film.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. The pumpkin's face and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- The pumpkin on the collar, with the stock and the top of the coat, four times: candle steady; candle burning BRIGHT, a strong warm glow round the holes; flame guttering, the light dim and flickering; candle out, the holes dark
- The headless torso in the coat, cloak and waistcoat, the stock and collar at the top with NOTHING above it: cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the coat sleeves with brown gauntlets, lying on a table, pointing toward its centre, open at the elbow end
- On their own: the carved pumpkin, candle lit; the brass sword hilt and the top of its scabbard
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, gauntlets apart: candle steady; candle burning bright; the fingers of his right gauntlet drumming on the felt; flame guttering

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Headless Horseman, exactly as on the attached character sheet (a huge, square-shouldered Hessian trooper of 1776 with NO HEAD: the body stops at a high black stock and collar; a dark blue soldier's coat with red facings and brass buttons, a buff waistcoat, a heavy black riding cloak over the shoulders, big brown leather gauntlets, the brass hilt of a cavalry sword rising beside his left hip above the table's edge; on his collar, where his head should be, sits a round orange pumpkin carved with two plain round eye holes and one short, straight slit for a mouth (NOT a grin, NO teeth, NOT leering), a plain candle burning inside it, its warm light showing through the holes., colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of the pumpkin and its stalk included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. He has NO HEAD in any pose: the pumpkin on his collar is all there is above the stock, and it stays on the collar unless the pose says otherwise. On his collar, where his head should be, sits a round orange pumpkin carved with two plain round eye holes and one short, straight slit for a mouth (NOT a grin, NO teeth, NOT leering), a plain candle burning inside it, its warm light showing through the holes. The sword hilt stays beside his left hip, just above the table's edge, in every pose. No flaming jack-o'-lantern, no fire pouring out of the pumpkin, no cackle, no teeth, no Disney or film design. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his gauntlets resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the pumpkin square on his collar, candle steady
2. Peeking at his cards: his right gauntlet cupped over two cards on the felt, thumb lifting the near corner, the pumpkin tipped down toward them
3. Checking: one finger of his right gauntlet tapping the felt
4. Calling: his right gauntlet sliding a short stack of chips forward
5. Betting: his right gauntlet pushing a stack of chips well forward
6. Folding: his right gauntlet flicking two cards away face down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No head, no grinning or flaming jack-o'-lantern, no teeth in the pumpkin, no horse, no tree, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Headless Horseman, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same headless shoulders, carved pumpkin on the collar, blue Hessian coat with red facings, black riding cloak, gauntlets and sword hilt.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). He has NO HEAD in any pose: the pumpkin on his collar is all there is above the stock, and it stays on the collar unless the pose says otherwise. On his collar, where his head should be, sits a round orange pumpkin carved with two plain round eye holes and one short, straight slit for a mouth (NOT a grin, NO teeth, NOT leering), a plain candle burning inside it, its warm light showing through the holes. The sword hilt stays beside his left hip, just above the table's edge, in every pose. No flaming jack-o'-lantern, no fire pouring out of the pumpkin, no cackle, no teeth, no Disney or film design. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both gauntlets pushing his whole stack of chips forward, the pumpkin's light bright
2. Showing: his right gauntlet turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. The candle in his pumpkin burning BRIGHTER: a strong warm glow round the eye holes and mouth slit and a soft halo of light round the whole pumpkin; the rest of him perfectly still, arms as at rest
5. Settling the pumpkin on his collar: both gauntlets lifted to the pumpkin, holding it at the sides, straightening it on his collar, candle steady
6. Drumming a gauntlet on the table: the fingers of his right gauntlet raised and drumming on the felt, two short motion lines beside them; left arm as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No head, no grinning or flaming jack-o'-lantern, no teeth in the pumpkin, no horse, no tree, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Headless Horseman, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same headless shoulders, carved pumpkin on the collar, blue Hessian coat with red facings, black riding cloak, gauntlets and sword hilt.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). He has NO HEAD in any pose: the pumpkin on his collar is all there is above the stock, and it stays on the collar unless the pose says otherwise. On his collar, where his head should be, sits a round orange pumpkin carved with two plain round eye holes and one short, straight slit for a mouth (NOT a grin, NO teeth, NOT leering), a plain candle burning inside it, its warm light showing through the holes. The sword hilt stays beside his left hip, just above the table's edge, in every pose. No flaming jack-o'-lantern, no fire pouring out of the pumpkin, no cackle, no teeth, no Disney or film design. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. His sword rattling in its scabbard: his left gauntlet resting on the brass sword hilt beside his hip, two short rattle lines beside the hilt; right arm as at rest
2. The flame in his pumpkin GUTTERING: the light inside dim and uneven, the eye holes nearly dark, a thin curl of smoke rising from the top of the pumpkin; arms as at rest
3. A smell of cold leaves drifting from him: a few brown dead leaves and a faint pale wisp drifting up and away from his cloak; arms as at rest, candle steady
4. Turning his whole body toward the viewer, shoulders squared to the viewer, the pumpkin facing the viewer; arms as at rest
5. Drawing his black cloak about his shoulders with his right gauntlet
6. Sitting very still, the pumpkin tilted a little toward the middle of the table (the right of the picture), as if listening; arms as at rest

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No head, no grinning or flaming jack-o'-lantern, no teeth in the pumpkin, no horse, no tree, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the Headless Horseman, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same headless shoulders, carved pumpkin on the collar, blue Hessian coat with red facings, black riding cloak, gauntlets and sword hilt.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). He has NO HEAD in any pose: the pumpkin on his collar is all there is above the stock, and it stays on the collar unless the pose says otherwise. On his collar, where his head should be, sits a round orange pumpkin carved with two plain round eye holes and one short, straight slit for a mouth (NOT a grin, NO teeth, NOT leering), a plain candle burning inside it, its warm light showing through the holes. The sword hilt stays beside his left hip, just above the table's edge, in every pose. No flaming jack-o'-lantern, no fire pouring out of the pumpkin, no cackle, no teeth, no Disney or film design. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right gauntlet raised a little, palm open, the pumpkin's light pulsing a little brighter at the mouth slit
2. Facing a big bet: leaning back, both gauntlets flat on the felt, the pumpkin's light low and steady
3. Lost a pot: his shoulders slumped, the pumpkin tipped forward, its light dimmed; arms as at rest
4. Won a pot: his right gauntlet drawing a few chips toward him, the pumpkin's light bright
5. Down to two players: leaning in on both forearms, the pumpkin lowered toward the viewer, its light bright
6. Knocked out: rising from his seat, the pumpkin lifted off his collar and tucked under his left arm, candle out, turning away toward the left of the picture

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No head, no grinning or flaming jack-o'-lantern, no teeth in the pumpkin, no horse, no tree, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Headless Horseman's pumpkin, exactly matching the attached sheets' style, colours and line weight. He has NO head and NO face: the pumpkin on his collar is his face, and its candlelight is how he shows anything.

Every piece is drawn at EXACTLY the angle and size of the pumpkin in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over it. Draw the pumpkin once, top left, sitting on the stock and the top of the coat collar, as the reference, candle steady. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels. The carved face is ALWAYS the same plain one: two round eye holes and a short straight slit, NEVER a grin, NEVER teeth.

- The pumpkin alone, its candle at different strengths, one piece each: steady; brighter; very bright, with a warm halo; dim; guttering, uneven light, a thin curl of smoke; out, the holes dark
- The glow at the mouth slit only, for speech, three pieces: a little brighter; brighter; brightest
- The pumpkin turned toward the viewer, nearly front-on, candle steady

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
