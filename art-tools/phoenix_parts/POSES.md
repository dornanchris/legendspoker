# The Phoenix: every pose, and the prompts

The hidden table's one opponent (`data/tables/pyre.json`): it appears only after the player has finished SECOND at all eight story tables and then won the eighth, and it is played heads up, once. Drawn facing the viewer's right and mirrored as the seat needs. Built the way Cerberus is (`art-tools/pose_rig.py`), in the graphic-novel style of the last two tables (the owner): its wings are its arms, and its wingtips do what other characters' hands do.

Its look, from its character file: red and gold, the size of an eagle and then some, sitting up at the table like a person; a crest of small living flames; a long tail of fire-coloured plumes falling away behind the chair. Bright, warm cartoon flames, never scary. **The crest and the feathers are its tell surface:** flames flaring tall (strong), preening (bluffing), feathers dimming to embers (weak).

It does not speak: it sings and trills, and Death translates. Ruled out (its character file): Fawkes from the Harry Potter books and films, Marvel's Phoenix, any human figure or woman in flames. Build it from Herodotus (red and gold, eagle-shaped). Layout from Lancelot's character sheet, style from the Astronaut's sheets. Its wingtips are empty in every pose: the game moves the cards and chips.

Tags (MOTION-SPEC.md): its three tells, each beside the idle it hides among: the crest flaring (strong) beside a single spark drifting up; preening one wing (bluffing) beside shaking ash from its feathers; feathers dimming to embers (weak) beside turning its head toward the light.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: sitting up behind the table, wings folded forward, wingtips resting on the felt apart, crest burning steadily | IDLE |
| A2 | Peeking: the right wingtip cupped low over its cards, head bent to look | MECH |
| A3 | Check: the right wingtip taps the felt | MECH |
| A4 | Call: the right wingtip slides forward along the felt | MECH |
| A5 | Bet: leans in, the right wingtip pushed well forward | MECH |
| A6 | Fold: a flick of the right wingtip | MECH |
| B1 | All in: both wings sweep forward together, crest blazing | MECH |
| B2 | Show: the right wingtip turns over | MECH |
| B3 | Big win: wings spread high, crest blazing, a triumphant cry (`win_big`) | BEAT |
| B4 | The flames along its crest flare up, tall and bright | TELL |
| B5 | A single spark drifts up from its crest (decoy for B4) | IDLE |
| B6 | Preens one wing, unhurried | TELL |
| C1 | Shakes a little ash from its feathers (decoy for B6) | IDLE |
| C2 | Its feathers dim to embers, crest low and dark red | TELL |
| C3 | Turns its head toward the light (decoy for C2) | IDLE |
| C4 | Watches you with one gold eye, head turned side-on | IDLE |
| C5 | Spreads its wings wide, lighting the room (heads-up opener) | BEAT |
| C6 | Sings: beak open, one clear note | IDLE |
| D1 | Talking: a trill, beak a little open | BEAT |
| D2 | Facing a big bet: feathers sleeked flat, perfectly still | BEAT |
| D3 | Lost a pot: feathers ruffled, head tucked a little | BEAT |
| D4 | Crushing loss: head bowed, wings drooping, ash drifting (`lose_big`) | BEAT |
| D5 | Heads up: leaning in, both wingtips forward on the felt | BEAT |
| D6 | Knocked out: burns down, all at once, in a great bright flame | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches THREE images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then the Astronaut's character sheet (`art-tools/astronaut_parts/sources/astronaut_sheet.png`) and his pose sheet A (`art-tools/astronaut_parts/sources/poses_a.png`) for the style (the owner: the graphic-novel style of the last two tables, not the first tables' flat cartoon). From the second prompt on, attach the Phoenix's own character sheet, its pose sheet A once it exists, AND the Astronaut's pose sheet A, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: the Phoenix of classical myth, the bird that comes to the temple of the Sun once in five hundred years and rises again from its own ashes (Herodotus, Ovid, Pliny). Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No man, no armour, no hair, no human hands. Take the STYLE from the SECOND and THIRD attached images.

The Phoenix: a great bird, red and gold, shaped like an eagle and bigger than one; a proud, bright, warm face with a curved golden beak and big gold eyes; deep red feathers on the body shading to orange and gold at the wingtips; a crest of small, bright cartoon flames running along the top of its head; a long tail of fire-coloured plumes. Its wings work like arms: folded forward, the wingtips resting on a table like forearms. Majestic, calm, a little amused. NOT Fawkes from the Harry Potter books or films, NOT Marvel's Phoenix, NO human figure, NO woman in flames; never scary, never dark.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole beak and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck and the crest of flame: calm, a slight amused look; singing, beak open on one note; the crest flared up tall and bright; the crest dimmed low to dark red embers
- The body: chest and shoulders sitting upright, NO head, cut off straight below the chest; the tops of the wings down to the bend; NO wingtips
- Two folded wingtips (the outer part of each wing, with the long feathers), lying on a table, pointing toward its centre, open at the bend
- The long tail of plumes on its own
- Four seated reference poses, sitting up behind the curved edge of a round green poker table like a person at a table, both wingtips resting on its edge, apart: calm; the crest flared up tall; preening one wing; the feathers dimmed to embers

STYLE, the most important rule: match the SECOND and THIRD attached images (the Astronaut, from another table: his character sheet and his pose sheet) exactly: the same inked GRAPHIC-NOVEL style, halfway between a bright cartoon and a dark painted illustration. Take NOTHING of his character: no man, no pressure suit, no helmet. What makes that style, and this drawing must have all of it: a thick, dark, inked outline of even weight round every shape; flat cel shading in three or four HARD-EDGED tones, the shadows deep and covering a good part of each form; a little rough, dry-brush texture inside the shadows only; rich colour, a little muted, never glossy. NO airbrush, NO soft gradients, NO smooth 3D rendering, NO glossy or wet-looking highlights, NO fine detail: feathers as a few big shapes, never one by one; flames as a few simple, bright, rounded tongues. Big clear readable shapes and a silhouette that reads at a tiny size. The light is the warm light of a temple at dawn: a gold rim light from the low sun on one side, the soft red glow of embers on the other, laid in as flat bands of colour. Warm, proud and a little amused: wonder, never menace. NOT a children's cartoon, NOT cute, NOT toy-like, NOT photoreal, NOT a 3D render.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: The Phoenix, exactly as on the attached character sheet (a great red-and-gold bird the size of a large eagle, sitting up behind the table like a person, a crest of small bright cartoon flames along the top of its head, a golden beak, big gold eyes, its wings folded forward with the wingtips resting on the felt like forearms, a long tail of fire-coloured plumes falling away behind it, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between it and the cell's edges, the tips of its crest of flame included: nothing of it is cut off. Nothing below the table edge. No chair: nothing at all behind it, just white.

IMPORTANT for every pose: the wing that the pose does not mention stays EXACTLY as in pose 1, same position. Its crest of flame burns steadily and its wings rest folded forward with the wingtips on the table's edge, unless the pose says otherwise. It is always a bird: no hands, no human body. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; feathers as a few big shapes; a gold dawn rim light and red ember glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. At rest: sitting up behind the table, both wings folded forward, the wingtips resting on the felt in front of it, apart, relaxed and NOT touching; the crest burning steadily; head up, calm and a little amused, beak closed
2. Peeking at its cards: its right wingtip cupped low over the felt in front of it, as if shielding something small, head bent to look
3. Checking: its right wingtip tapping the felt once
4. Calling: its right wingtip sliding forward along the felt
5. Betting: leaning in, head lowered, its right wingtip pushed well forward along the felt
6. Folding: a small, dismissive flick of its right wingtip toward the middle of the table

No cards and no chips anywhere: its wingtips hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human figure, no woman, no person in flames, no hands, no chair, no text, no cards, no chips.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: The Phoenix, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same bird, red-and-gold feathers, crest of flame and long tail.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The wing a pose does not mention stays EXACTLY as in the at-rest pose (wingtips resting apart on the felt). Its crest of flame burns steadily and its wings rest folded forward with the wingtips on the table's edge, unless the pose says otherwise. It is always a bird: no hands, no human body. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; feathers as a few big shapes; a gold dawn rim light and red ember glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. All in: both wings sweeping forward along the felt together, the crest blazing up
2. Showing: its right wingtip turning over from the felt, as if turning something over
3. A big win: both wings spread high and wide, the crest blazing tall, head thrown back in a triumphant cry
4. The flames along its crest flaring up tall and bright; wings as at rest
5. A single spark drifting up from its crest; it is otherwise calm; wings as at rest
6. Preening its right wing with its beak, unhurried

No cards and no chips anywhere: its wingtips hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human figure, no woman, no person in flames, no hands, no chair, no text, no cards, no chips.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: The Phoenix, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same bird, red-and-gold feathers, crest of flame and long tail.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The wing a pose does not mention stays EXACTLY as in the at-rest pose (wingtips resting apart on the felt). Its crest of flame burns steadily and its wings rest folded forward with the wingtips on the table's edge, unless the pose says otherwise. It is always a bird: no hands, no human body. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; feathers as a few big shapes; a gold dawn rim light and red ember glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. Shaking a little grey ash from its feathers, a small puff of ash in the air
2. Its feathers dimmed to dark red embers, the crest low and small; wings as at rest
3. Turning its head toward a light off to its left; wings as at rest
4. Watching the viewer with one gold eye, head turned side-on; wings as at rest
5. Spreading both wings wide, the feathers glowing, lighting everything around it
6. Singing: head up, beak open on one clear note; wings as at rest

No cards and no chips anywhere: its wingtips hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human figure, no woman, no person in flames, no hands, no chair, no text, no cards, no chips.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: The Phoenix, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same bird, red-and-gold feathers, crest of flame and long tail.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The wing a pose does not mention stays EXACTLY as in the at-rest pose (wingtips resting apart on the felt). Its crest of flame burns steadily and its wings rest folded forward with the wingtips on the table's edge, unless the pose says otherwise. It is always a bird: no hands, no human body. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; feathers as a few big shapes; a gold dawn rim light and red ember glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. Talking: a trill, beak a little open, head tilted; wings as at rest
2. Facing a big bet: feathers sleeked flat, perfectly still, eyes on the middle of the table
3. Lost a pot: feathers ruffled, head tucked down a little; wings as at rest
4. A crushing loss: head bowed low over the table, both wings drooping over the table's edge, the crest flickering small, a little grey ash drifting down from its feathers
5. Down to two players: leaning in, both wingtips forward on the felt, eyes level
6. Knocked out: burning down all at once in a great, bright, friendly cartoon flame, only its outline still visible in the fire

No cards and no chips anywhere: its wingtips hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human figure, no woman, no person in flames, no hands, no chair, no text, no cards, no chips.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Phoenix's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of its head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the neck and the crest of flame, as the reference, beak closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- Its eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed (one piece each, both eyes with the feathers around them)
- Its beak: closed; open a little (a trill); open wide (singing)
- Its crest of flame on its own: burning steadily; flared up tall and bright; dimmed low to dark red embers
- Its head turned toward the viewer, nearly front-on, with the crest

Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; feathers as a few big shapes; a gold dawn rim light and red ember glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.
```
