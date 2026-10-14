# Abraham Van Helsing: every pose, and the prompts

Transylvania's seat 1 (far left): drawn facing the viewer's right, as the game shows him. Built the way Javert is (`art-tools/pose_rig.py`), style-locked.

His look, from his character file and Stoker: square and solid, shoulders set back over a deep chest, clean-shaven, square-jawed, bushy brows, reddish hair swept back off a broad forehead, wide-set blue eyes, in a plain black professor's frock coat, his doctor's bag on the felt beside him (a prop by his left elbow, the way Holmes's pipe lies by his right hand). His prop is his spectacles; they are small, so the tell is the whole gesture: off, polished on a big white handkerchief, back on. A small silver crucifix at his collar carries the weak tell.

Ruled out (his character file): the 2004 Van Helsing film entirely (no broad-brimmed hat, no long leather coat, no crossbow, no gadgets) and the likeness of any actor who has played him. His Dutch is used lightly, never as a comic accent. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: taking off his spectacles and cleaning them (strong) beside writing a line in his leather diary (both hands busy, eyes down); touching the crucifix at his collar (weak) beside checking a pocket that smells of garlic (a hand to the coat); muttering in Dutch (tilted) beside sniffing the air, frowning (the face alone). 'Glances at the fireplace' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, spectacles on, the bag by his left elbow | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, deliberate | MECH |
| A6 | Fold: lays his cards down face down | MECH |
| B1 | All in: both hands push his whole stack | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Takes off his spectacles and cleans them on a white handkerchief | TELL |
| B5 | Writes a line in a leather diary (decoy for B4) | IDLE |
| B6 | Touches the crucifix at his collar | TELL |
| C1 | Checks a pocket that smells of garlic (decoy for B6) | IDLE |
| C2 | Mutters something in Dutch, aside | TELL |
| C3 | Sniffs the air, frowning (decoy for C2) | IDLE |
| C4 | Glances at the fireplace, over his right shoulder | IDLE |
| C5 | Peers over the top of his spectacles at the viewer | IDLE |
| C6 | Settles his spectacles back on his nose with one finger | IDLE |
| D1 | Talking: one finger raised, lecturing | BEAT |
| D2 | Facing a big bet: brows drawn down, studying | BEAT |
| D3 | Lost a pot: a heavy sigh, a shake of the head | BEAT |
| D4 | Won a pot: a warm, broad smile, drawing chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes keen | BEAT |
| D6 | Knocked out: rises, takes up his bag, a courteous bow | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Van Helsing's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Professor Abraham Van Helsing, of Bram Stoker's Dracula (1897), as Stoker describes him. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no striped surcoat, no long hair. Take the STYLE from the SECOND attached image.

Van Helsing: a Dutch professor of medicine of about sixty, square and solid, shoulders set back over a deep chest; clean-shaven, square-jawed, with a firm, kindly mouth; big bushy reddish brows; reddish hair going grey, swept back off a broad, high forehead; wide-set blue eyes behind small round gold-rimmed spectacles; a plain black professor's frock coat over a dark waistcoat, a white shirt and a black cravat; a small silver crucifix on a short chain at his collar. Shrewd, warm, tireless, a little odd. His bag is a small black leather doctor's bag. NO broad-brimmed hat, NO long leather coat, NO crossbow, NO stakes, NO weapons, NO gadgets. Nothing from any film, and no likeness of any actor.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck and the top of the collar and cravat: neutral, spectacles on; talking, mouth open mid-word, spectacles on; his spectacles OFF, eyes narrowed, a little short-sighted; muttering out of the side of his mouth, eyes sideways
- The torso in the frock coat, the crucifix at the collar: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the coat sleeves, white shirt cuffs showing, lying on a table, pointing toward its centre, open at the elbow end
- On their own: the small round gold-rimmed spectacles; a big white handkerchief; a small brown leather diary with a pencil; the small black leather doctor's bag, closed; a bulb of garlic
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the doctor's bag standing on the felt by his left elbow: neutral; holding his spectacles in one hand and polishing them with the white handkerchief in the other; two fingers of his right hand touching the crucifix at his collar; muttering aside

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Van Helsing, exactly as on the attached character sheet (a square, solid Dutch professor of about sixty, shoulders set back over a deep chest, clean-shaven and square-jawed, bushy reddish brows, reddish hair going grey swept back off a broad forehead, wide-set blue eyes behind small round gold-rimmed spectacles, a plain black professor's frock coat over a dark waistcoat, a white shirt and a black cravat, a small silver crucifix on a short chain at his collar, a small black leather doctor's bag standing on the felt by his left elbow, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his head included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. His small round spectacles are ON unless the pose says otherwise. The small silver crucifix hangs at his collar in every pose. His black doctor's bag stands on the felt by his LEFT elbow, at the far left of the picture, in EXACTLY the same place in every pose: one bag, never moved, never doubled. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; spectacles on; the black doctor's bag standing on the felt by his left elbow; a calm, shrewd look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down through his spectacles
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand setting a stack of chips down well forward, deliberate
6. Folding: his right hand laying two cards down face down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No broad-brimmed hat, no long leather coat, no crossbow, no stakes, no gadgets, no weapons, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Van Helsing, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, reddish swept-back hair, bushy brows, small round spectacles, black frock coat and the small silver crucifix at his collar.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His small round spectacles are ON unless the pose says otherwise. The small silver crucifix hangs at his collar in every pose. His black doctor's bag stands on the felt by his LEFT elbow, at the far left of the picture, in EXACTLY the same place in every pose: one bag, never moved, never doubled. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. Cleaning his spectacles: the spectacles OFF, held up in front of his chest in his left hand, his right hand polishing a lens with a big white handkerchief, eyes narrowed on them
5. Writing a line in a small brown leather diary held open on the felt in front of him, a pencil in his right hand, eyes down, spectacles on
6. Touching the crucifix: two fingers of his right hand resting on the small silver crucifix at his collar, eyes lowered for a moment; left arm as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No broad-brimmed hat, no long leather coat, no crossbow, no stakes, no gadgets, no weapons, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Van Helsing, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, reddish swept-back hair, bushy brows, small round spectacles, black frock coat and the small silver crucifix at his collar.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His small round spectacles are ON unless the pose says otherwise. The small silver crucifix hangs at his collar in every pose. His black doctor's bag stands on the felt by his LEFT elbow, at the far left of the picture, in EXACTLY the same place in every pose: one bag, never moved, never doubled. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Checking a pocket: his right hand patting the front of his coat at the chest, a bulb of garlic just peeking out of the pocket, a small knowing look
2. Muttering aside: his head turned a little toward the left of the picture, mouth moving out of one corner, brows knitted; arms as at rest
3. Sniffing the air, frowning: his chin lifted, nose up, brows drawn together, eyes half closed; arms as at rest
4. Glancing at the fireplace over his right shoulder, toward the left of the picture, eyes wary; arms as at rest
5. Peering at the viewer over the top of his spectacles, head tipped down a little, brows raised; arms as at rest
6. Settling his spectacles back up his nose with one finger of his right hand

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No broad-brimmed hat, no long leather coat, no crossbow, no stakes, no gadgets, no weapons, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Van Helsing, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, reddish swept-back hair, bushy brows, small round spectacles, black frock coat and the small silver crucifix at his collar.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His small round spectacles are ON unless the pose says otherwise. The small silver crucifix hangs at his collar in every pose. His black doctor's bag stands on the felt by his LEFT elbow, at the far left of the picture, in EXACTLY the same place in every pose: one bag, never moved, never doubled. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right index finger raised, lecturing, mouth open mid-word
2. Facing a big bet: brows drawn right down, studying, mouth set; arms as at rest
3. Lost a pot: a heavy sigh, eyes closed, a small shake of the head; arms as at rest
4. Won a pot: a warm, broad smile, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, eyes keen behind the spectacles
6. Knocked out: rising from his seat, the doctor's bag in his left hand, his right hand on his chest, a courteous little bow

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No broad-brimmed hat, no long leather coat, no crossbow, no stakes, no gadgets, no weapons, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Van Helsing's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the mouths too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the neck and the top of the collar and cravat, spectacles on, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes WITH the spectacles on them, each piece both eyes, the spectacles and the skin around them: lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed; wide
- His brows raised; his brows drawn down (one piece each, both bushy brows)
- Lower-face patches, each the mouth with the skin around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a warm smile; mouth turned down
- His head turned toward the viewer, nearly front-on, spectacles on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
