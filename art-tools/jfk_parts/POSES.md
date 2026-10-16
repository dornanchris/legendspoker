# John F. Kennedy: every pose, and the prompts

The hidden visitor at the White House (see CLAUDE.md): he walks in when the player wins a pot holding a three and a five while a chair is empty, so he can sit in ANY of the four chairs. Drawn facing the viewer's right and MIRRORED by the game for the other side. Built the way the Pirate Cove and Camelot casts are (`art-tools/pose_rig.py`), style-locked. This replaces the earlier seat_puppet kit (`jfk/`, `jfk_rig/`), which had one face, sunglasses and a cigarette.

His look, from his character file: young and lean, a narrow navy two-button suit, a thin dark tie, thick reddish-brown hair swept to one side, a broad easy grin. No sunglasses and nothing in his mouth (FDR's holder is the table's one thing in a mouth). His prop is the PT-109 coconut shell he kept on his desk as a paperweight, on the felt by his right hand.

Ruled out (his character file): any film or television portrayal and any actor's likeness. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: rocking back in his chair (strong) beside running a hand through his hair; straightening his tie (bluffing) beside chopping the air mid-thought; a hand to the small of his back (weak) beside tapping the coconut shell. C6 is his `arrive` clip, played as he sits down. B3 and D4 are the big win and the crushing loss (no separate reactions sheet); his hands are empty in every pose (the game moves the cards and chips); knocked out, he says his line and fades from the chair, so no exit pose.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the coconut shell on the felt by his right hand | IDLE |
| A2 | Peek: right hand cupped low over the felt, thumb lifting | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: right hand pushes forward along the felt | MECH |
| A5 | Bet: leans in, right hand pushed well forward, confident | MECH |
| A6 | Fold: an easy flick of the right hand toward the middle | MECH |
| B1 | All in: both hands push forward together, a grin | MECH |
| B2 | Show: right hand turns palm up, as if turning cards over | MECH |
| B3 | Big win: both hands raised high, a broad grin (`win_big`) | BEAT |
| B4 | Rocks back in his chair, easy | TELL |
| B5 | Runs a hand through his hair (decoy for B4) | IDLE |
| B6 | Straightens his tie | TELL |
| C1 | Chops the air with one hand, mid-thought (decoy for B6) | IDLE |
| C2 | Presses a hand to the small of his back | TELL |
| C3 | Taps the coconut shell on the felt (decoy for C2) | IDLE |
| C4 | Glances up at the portraits on the wall | IDLE |
| C5 | A broad grin at the table | IDLE |
| C6 | Arrive: just sitting down, one hand still in his jacket pocket | BEAT |
| D1 | Talking: one hand chopping the air | BEAT |
| D2 | Facing a big bet: a level look, considering | BEAT |
| D3 | Lost a pot: a rueful half-smile | BEAT |
| D4 | Crushing loss: a hand over his eyes, a rueful shake of the head (`lose_big`) | BEAT |
| D5 | Heads up: leaning in on both forearms | BEAT |
| D6 | Laughing, head back a little | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Kennedy's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: John F. Kennedy, the thirty-fifth President of the United States, as he looked in office in the early 1960s. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No armour, no gauntlets, no surcoat, no long hair. Take the STYLE from the SECOND attached image.

Kennedy: a lean man in his forties, youthful; thick reddish-brown hair swept to one side with a soft quiff at the front; a broad, easy, confident grin and bright eyes; a narrow navy two-button suit with slim lapels, a crisp white shirt, a thin dark navy tie. His prop: a coconut shell paperweight, half a brown husk with a short carved message on it, set on a small wooden base, about the size of his fist. Charming, quick, relaxed. NO sunglasses, NO hat, NOTHING in his mouth. Not a likeness of any actor; nothing from any film or television portrayal.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck, the shirt collar and the knot of the tie: neutral, a slight smile; talking, mouth open mid-word; a broad grin; a rueful half-smile
- The torso in the suit: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the navy sleeves with a little white cuff, lying on a table, pointing toward its centre, open at the elbow end
- The coconut shell paperweight on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the coconut shell on the felt beside his right hand (the left of the picture): neutral; rocking back in his chair, easy; straightening his tie; a hand pressed to the small of his back

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: John F. Kennedy, exactly as on the attached character sheet (a young, lean man in his forties in a narrow navy two-button suit, a white shirt and a thin dark tie, thick reddish-brown hair swept to one side, a broad, easy grin, and a carved coconut shell paperweight on the felt beside his right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his hair included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The coconut shell sits on the felt beside his right hand (the left of the picture) unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the coconut shell on the felt beside his right hand; a slight, confident smile, mouth closed
2. Peeking at his cards: his right hand cupped low over the felt in front of him, thumb lifted a little, as if shielding something small; eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand flat, fingertips leading, pushing forward along the felt
5. Betting: leaning in, his right hand pushed well forward along the felt, confident
6. Folding: an easy flick of his right hand toward the middle of the table, fingers spread

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No sunglasses, no hat, no cigar or cigarette, nothing in his mouth, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: John F. Kennedy, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, hair, navy suit, tie and coconut shell.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The coconut shell sits on the felt beside his right hand (the left of the picture) unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing forward along the felt together, grinning
2. Showing: his right hand turning palm up from the felt, as if turning something over
3. A big win: both hands raised high above his head, a broad, delighted grin, chin up
4. Rocking back in his chair, easy and relaxed, shoulders back, his hands sliding back to the table's edge
5. Running his right hand back through his hair
6. Straightening the knot of his tie with his right hand; his left as at rest

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No sunglasses, no hat, no cigar or cigarette, nothing in his mouth, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: John F. Kennedy, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, hair, navy suit, tie and coconut shell.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The coconut shell sits on the felt beside his right hand (the left of the picture) unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Chopping the air with his right hand, flat and edge-on, mid-thought, as he did when he spoke
2. Pressing his right hand to the small of his back, wincing very slightly
3. Tapping the coconut shell on the felt with one finger of his right hand
4. Glancing up and to his left at something on the wall above, arms as at rest
5. A broad, warm grin at the table; arms as at rest
6. Just sitting down at the table, his left hand still in his jacket pocket, his right hand on the table's edge, looking round with a grin

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No sunglasses, no hat, no cigar or cigarette, nothing in his mouth, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: John F. Kennedy, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, hair, navy suit, tie and coconut shell.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The coconut shell sits on the felt beside his right hand (the left of the picture) unless the pose says otherwise. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right hand chopping the air, mid-word
2. Facing a big bet: a level, steady look, considering; arms as at rest
3. Lost a pot: a rueful half-smile, a small shrug; arms as at rest
4. A crushing loss: sitting back, one hand over his eyes, a rueful shake of the head; his other hand on the table's edge
5. Down to two players: leaning in on both forearms, eyes level
6. Laughing at the table's joke, head back a little, one hand flat on the felt

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No sunglasses, no hat, no cigar or cigarette, nothing in his mouth, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Kennedy's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the neck, the collar and the knot of the tie, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking up; narrowed, considering (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it (he is clean-shaven), cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a broad grin with teeth; a rueful half-smile
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
