# Washington: every pose, and the prompts

Built the way Lincoln's game puppet is (`art-tools/pose_rig.py`): the complete
pose drawings are the source of truth, each forearm with its cuff and hand is
cut from them as one piece turning about the elbow, and alternate poses hang
on the rest pose's elbows. Three lessons from Lincoln are written into the
prompts:

1. **His resting hands lie apart, not laced.** Lincoln's laced fingers could
   not be parted, so his arms had to change piece mid-motion. Apart, each arm
   leaves and returns on its own.
2. **The arm that is not acting stays exactly as at rest**, in every pose.
   Then only the moving arm is a new piece, and the poses register cleanly.
3. **Six poses a sheet, not ten**: Lincoln's figures came out ~300px wide;
   six a sheet gives about twice the detail.

No hands sheet: the hands come from the poses.

Tags (MOTION-SPEC.md): MECH a poker action, IDLE noise, BEAT a mood, TELL
one of his three tells, each drawn beside the idle it hides among.

| # | Pose | Tag |
|---|---|---|
| 1 | Rest: forearms along the table's edge, hands resting apart | IDLE |
| 2 | Peeking at his cards (right hand) | MECH |
| 3 | Check: knuckles rap the felt (right hand) | MECH |
| 4 | Call: slides a short stack forward (right hand) | MECH |
| 5 | Bet: sets a taller stack down forward (right hand) | MECH |
| 6 | Fold: flicks his cards away (right hand) | MECH |
| 7 | All in: both hands push his stack | MECH |
| 8 | Show: turns his cards over (right hand) | MECH |
| 9 | Collect the pot: both hands draw it in | MECH |
| 10 | Squares the edges of his chips (right hand) | IDLE |
| 11 | Straightens his cuffs | TELL |
| 12 | Smooths his waistcoat (decoy for 11) | IDLE |
| 13 | Rests one hand flat on the table, pressed | TELL |
| 14 | One fingertip taps the felt once (decoy for 13) | IDLE |
| 15 | Sits a fraction straighter | TELL |
| 16 | Works his jaw (decoy for 15) | IDLE |
| 17 | Glances toward the window | IDLE |
| 18 | Looks straight at the viewer | BEAT |
| 19 | Talking: right hand open, palm up | BEAT |
| 20 | A slight, rare smile | BEAT |
| 21 | Facing a big bet: brows down, looking up from his cards | BEAT |
| 22 | Lost a pot: a short breath out, eyes closed a moment | BEAT |
| 23 | Won a pot: a small nod | BEAT |
| 24 | Heads up: leaning in on both forearms, pressing | BEAT |

## Prompts

One fresh ChatGPT chat for all five. Attach to every prompt his rigging sheet
(`art-tools/washington_parts/sources/washington_sheet.png`) and Lincoln's
pose sheet (`art-tools/lincoln_parts/sources/poses_a.png`) as the layout
model; from the second prompt on, attach the pose sheets already made.

### Pose sheet A

```
Character pose sheet for 2D animation reference: George Washington, exactly as on the attached character sheet (face, powdered hair tied with a black ribbon, the blue general's coat with buff facings, gold braid and epaulettes, the lace jabot and lace cuffs, colours, line weight, flat cartoon style). Copy the layout and framing of the attached Lincoln pose sheet, not its character.

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Bareheaded. Nothing below the table edge.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: rapping the felt with the knuckles of his right hand
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right fingertips setting a taller stack of chips down well forward, leaning in a little
6. Folding: the back of his right hand flicking two cards away across the felt

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no cane, no cigars, no pipes, no glasses of drink.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: George Washington, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, bareheaded. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart).

1. All in: both hands pushing his whole stack of chips forward, leaning over the table
2. Showing: his right hand turning two cards face up
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. Squaring the edges of a short stack of chips with the fingertips of his right hand
5. Straightening his left cuff: his right hand tugging the lace at his left wrist, both forearms still near the table edge
6. Smoothing his waistcoat: his right hand flat on the buff waistcoat, drawing down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no cane, no cigars, no pipes, no glasses of drink.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: George Washington, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, bareheaded. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).

1. His right hand pressed flat on the felt, fingers spread, quite still
2. One fingertip of his right hand tapping the felt once
3. Sitting a fraction straighter: back straight, chin up, shoulders square; arms as at rest
4. Working his jaw: jaw clenched, a muscle standing at the cheek; arms as at rest
5. Glancing toward a window: head turned away over his shoulder; arms as at rest
6. Looking straight at the viewer, steady; arms as at rest

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no cane, no cigars, no pipes, no glasses of drink.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: George Washington, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, bareheaded. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).

1. Talking: his right hand open, palm up, making a point
2. A slight, rare smile, lips closed; arms as at rest
3. Facing a big bet: brows drawn down, looking up from his cards; arms as at rest
4. Lost a pot: a short breath out through the nose, eyes closed a moment; arms as at rest
5. Won a pot: a small, contained nod; arms as at rest
6. Down to two players: leaning in over the table on both forearms, pressing, eyes fixed ahead

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no cane, no cigars, no pipes, no glasses of drink.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: George Washington's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right, bareheaded), so each one can be laid over that head's painted face. Draw that head once, top left, with its neck and the top of its collar, as the reference; then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed (both eyes as one piece, with the skin around them)
- His eyes closed (one piece, as above)
- His eyes looking toward the viewer; looking down at the table; looking up and away to the side (one piece each)
- His brows raised; his brows drawn together (one piece each, both brows)
- Lower-face patches, each the mouth with the chin and jaw around it, cut straight across just under the nose: closed at rest, mouth set firm; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a slight closed smile; jaw clenched; a short breath out, lips parted
- His head turned away over his shoulder, toward a window
- His head turned toward the viewer, nearly front-on
- His head with the chin raised, sitting straighter
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of his stack plays the big win, and losing one the crushing loss. Pose 1
is his rest pose again, only to measure the sheet by. Attach
`art-tools/washington_parts/sources/poses_a.png` FIRST, then
`art-tools/washington_parts/sources/washington_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: George Washington, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same blue and buff Continental Army coat, white powdered hair, bareheaded.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind him, no chair, nothing of him cut off by the edge of the picture (raised hands included). Nothing below the table edge.

1. EXACTLY his at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both hands raised high above his head, palms open, chest out, chin up, a rare broad smile
3. A crushing loss: sitting very straight, eyes closed, jaw clenched, both hands pressed flat on the table's edge

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No hat, no cane, no cigars, no pipes, no glasses of drink.
```
