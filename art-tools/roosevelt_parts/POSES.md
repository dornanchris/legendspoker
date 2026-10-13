# Theodore Roosevelt: every pose, and the prompts

Built the way the rest of the White House table is (`art-tools/pose_rig.py`),
with every lesson from Lincoln, Washington, FDR and Death in the prompts:
hands resting **apart**; the arm a pose does not mention stays **exactly** as
at rest; **no chair**; card faces **blank**; attach **only his own** sheets
(FDR's first sheet B came out in Washington's cuffs); his pince-nez /
spectacles drawn the same in every pose; and **no cigar, pipe or cigarette**
anywhere (he did not smoke; FDR's holder is the table's one thing in a mouth).

His spectacles are his tell surface (polishing them, hard: tilted), so the
face sheet draws his head without them as well, and the spectacles alone.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands resting apart | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: knuckles rap the felt (right hand) | MECH |
| A4 | Call: slides a short stack forward (right hand) | MECH |
| A5 | Bet: plants a tall stack well forward, leaning in | MECH |
| A6 | Fold: flicks his cards away (right hand) | MECH |
| B1 | All in: both hands shove his whole stack, grinning | MECH |
| B2 | Show: turns his cards over (right hand) | MECH |
| B3 | Collect the pot: both forearms out, drawing it in | MECH |
| B4 | Grins, all teeth, chin up | TELL |
| B5 | A hearty open laugh (decoy for the grin) | IDLE |
| B6 | Drums his fingers on the felt (right hand) | TELL |
| C1 | Taps one finger on the felt, thinking (decoy for the drum) | IDLE |
| C2 | Spectacles off in his left hand, polishing them hard with a handkerchief in his right | TELL |
| C3 | Pushes his spectacles up his nose with one finger (decoy for the polish) | IDLE |
| C4 | Squares his shoulders, chest out | IDLE |
| C5 | Checks his pocket watch, held in his left hand | IDLE |
| C6 | Tugs at his moustache (right hand) | IDLE |
| D1 | Leans forward on both elbows, eager | BEAT |
| D2 | Talking: right fist raised, making a point | BEAT |
| D3 | Facing a big bet: eyes narrowed, suspicious | BEAT |
| D4 | Lost a pot: a scowl, arms folded | BEAT |
| D5 | Won a pot: a fist pumped once, delighted | BEAT |
| D6 | Heads up: leaning in on both fists, jaw set | BEAT |

## Prompts

One fresh ChatGPT chat for all five. Attach to the first prompt his rigging
sheet (`art-tools/roosevelt_parts/sources/roosevelt_sheet.png`) and NOTHING of
anyone else's; from the second prompt on, attach his finished pose sheet A.

### Pose sheet A

```
Character pose sheet for 2D animation reference: Theodore Roosevelt, exactly as on the attached character sheet (face, heavy moustache, round steel-rimmed spectacles, brown three-piece suit, watch chain, colours, line weight, flat cartoon style). Barrel-chested and broad.

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. His spectacles are on his nose in every pose, drawn the same.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; mouth closed under the moustache
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: rapping the felt with the knuckles of his right hand
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right hand planting a tall stack of chips well forward, leaning in
6. Folding: the back of his right hand flicking two cards away across the felt

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no cigar, no pipe, no cigarette, no drinks, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Theodore Roosevelt, exactly as on the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same clothes and spectacles.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart).

1. All in: both hands shoving his whole stack of chips forward, leaning over the table, grinning
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. A huge grin, all teeth showing under the moustache, chin up; arms as at rest
5. A hearty open-mouthed laugh, head back a little; arms as at rest
6. Drumming the fingers of his right hand on the felt, impatient

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no cigar, no pipe, no cigarette, no drinks, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Theodore Roosevelt, exactly as on the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same clothes.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His spectacles are on his nose unless the pose says otherwise.

1. One finger of his right hand tapping the felt once, thinking
2. His spectacles OFF, held in his left hand, his right hand polishing the lenses hard with a white handkerchief; brows down, squinting a little
3. Pushing his spectacles up his nose with one finger of his right hand
4. Squaring his shoulders, chest out, chin up; arms as at rest
5. Checking his pocket watch: the watch open in his left hand on its chain, looking down at it
6. Tugging at one end of his moustache with his right hand

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no cigar, no pipe, no cigarette, no drinks, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Theodore Roosevelt, exactly as on the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same clothes and spectacles.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).

1. Leaning forward on both elbows on the table, eager, hands loosely clasped in front
2. Talking: his right fist raised to shoulder height, making a point
3. Facing a big bet: eyes narrowed behind the spectacles, suspicious; arms as at rest
4. Lost a pot: a scowl under the moustache, arms folded across his chest
5. Won a pot: his right fist pumped once at chest height, delighted
6. Down to two players: leaning in over the table on both fists, jaw set

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no cigar, no pipe, no cigarette, no drinks, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Theodore Roosevelt's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with its neck and the top of its collar, as the reference, spectacles on, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- The same head WITHOUT spectacles (bare eyes), mouth closed
- The spectacles alone, round steel rims, at exactly their angle on the reference head
- His eyes behind the spectacles with the lids half closed; closed; looking toward the viewer; looking down at the table; looking up and away; narrowed, suspicious (one piece each, both eyes with the spectacles and the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the moustache, chin and jaw around it, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; the huge grin, all teeth; laughing wide open; a scowl
- His head thrown back, laughing
- His head turned toward the viewer, nearly front-on
```
