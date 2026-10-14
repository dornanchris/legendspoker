# The Wolf Man: every pose, and the prompts

Transylvania's seat 3 (right of the dealer): drawn facing the viewer's right and MIRRORED by the game to face the table's centre. Built the way Van Helsing is (`art-tools/pose_rig.py`): a man's body, so his forearms rest on the table as the others' do.

His look, from his character file: the folklore werewolf, a real wolf's head on a big man's shoulders, in the remains of a good shirt and waistcoat split at the seams; grey-brown fur and a man's tired eyes. The ears are the tell surface and the biggest moving shape he has: up, back, flat. Drawn in Cerberus's animal style (the owner's call for the Cheshire Cat: Cerberus's pose sheet A is the style image), his clothes as plain as anyone's.

Ruled out (his character file and ASSETS.md): everything of Universal's The Wolf Man (1941) and its lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and above all no hairy-faced human makeup: a wolf's head, not a man's face. ('The Wolf Man' as his display name is still an open question; ASSETS.md.) Layout from Lancelot's character sheet, style from Cerberus's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: sniffing at the pot (strong) beside growling at a draught (the muzzle both times); his ears flattening (weak) beside scratching behind one ear; his claws scraping the felt (tilted) beside shedding on the tablecloth (a hand on the felt both times). 'Glances at the window and the moon' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, ears up | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: one clawed finger taps the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: pushes a stack forward | MECH |
| A6 | Fold: pushes his cards away | MECH |
| B1 | All in: both hands push his whole stack | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Sniffs at the pot, muzzle stretched toward the middle | TELL |
| B5 | Growls at a draught (decoy for B4) | IDLE |
| B6 | His ears flatten | TELL |
| C1 | Scratches behind one ear (decoy for B6) | IDLE |
| C2 | His claws scrape the felt | TELL |
| C3 | Sheds on the tablecloth, brushing the fur away (decoy for C2) | IDLE |
| C4 | Glances at the window and the moon | IDLE |
| C5 | Looks at the viewer, ears pricked, a little sheepish | IDLE |
| C6 | Ears swivel back toward a sound behind him | IDLE |
| D1 | Talking: one clawed hand raised, apologetic | BEAT |
| D2 | Facing a big bet: hackles up, eyes narrowed | BEAT |
| D3 | Lost a pot: ears down, a low whine | BEAT |
| D4 | Won a pot: tongue lolling, drawing chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, teeth showing | BEAT |
| D6 | Knocked out: rises, a sheepish little wave, heading for the door | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Cerberus's pose sheet A (`art-tools/cerberus_parts/sources/poses_a.png`) for the style (the owner's animal style, as for the Cheshire Cat). From the second prompt on, attach the Wolf Man's own character sheet, his pose sheet A once it exists, AND Cerberus's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: the werewolf of European folklore (Petronius, Marie de France's Bisclavret, Gervase of Tilbury): a cursed man who turns wolf. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no gauntlets, no striped surcoat, no long hair. Take the STYLE from the SECOND attached image.

The Wolf Man: a big, broad-shouldered man with a REAL WOLF'S HEAD on his shoulders: a long muzzle, a black nose, TALL pointed ears standing straight up (his biggest shape: they must read at a tiny size), a shaggy grey-brown ruff at the neck, and tired, kindly amber eyes with whites, a man's eyes in a wolf's face. Grey-brown fur, paler on the muzzle and throat. Big furred hands with short dark claws. He wears the remains of a good white shirt and a dark brown waistcoat with brass buttons, split at the seams over his broad shoulders, the shirt sleeves torn off below the elbow so his furred forearms show. Polite, apologetic, barely holding it together. His head is a REAL WOLF'S HEAD with a long muzzle and a black nose, NOT a man's face covered in hair. Nothing from any werewolf film: no silver-headed cane, no pentagram, no torn plaid shirt, no muscle-bound monster. STYLE FOR HIS FUR: draw his wolf's head and furred hands exactly the way Cerberus is drawn on the attached sheet from Rome: a bold, even dark outline; the fur shown ONLY by a few chunky, rounded tufts on the outline at the cheeks, the ruff of the neck and the ears, with a few short soft strokes inside them, never hair by hair; soft, smooth shading in two or three tones; big simple eyes with a plain pupil and one highlight; a few simple dark claws. His clothes are drawn the same simple way: big smooth folds, no texture. NOT a realistic or detailed illustration, NOT furry art, NO fine fur texture, NOT painterly. Take NOTHING of Cerberus himself: ONE head, grey-brown, no collar, no snakes, not black.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole muzzle and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the ears, the ruff and the top of the shirt collar: neutral, ears up; talking, jaws open mid-word; ears flat back against his head; sniffing, nose up, nostrils flared
- The torso in the split waistcoat and torn shirt: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two furred forearms (the torn shirt sleeves ending just below the elbow) with big clawed hands, lying on a table, pointing toward its centre, open at the elbow end
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral, ears up; muzzle stretched toward the middle of the table, sniffing; ears flat back; the claws of his right hand scraping the felt, three short scratch marks

STYLE, the most important rule: match the SECOND attached image (Cerberus, the three-headed hound from the Rome table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth colour with soft, simple shading in two or three tones; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no cross-hatching); fur drawn as a few big smooth shapes, never hair by hair; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Wolf Man, exactly as on the attached character sheet (the werewolf of European folklore: a big man with a real wolf's head on his shoulders, a long muzzle, a black nose, TALL pointed ears standing straight up, a shaggy grey-brown ruff at the neck, tired, kindly amber eyes with whites; big furred hands with dark claws; the remains of a good white shirt and a dark brown waistcoat, split at the seams over his broad shoulders, the shirt sleeves torn off below the elbow so his furred forearms show, colours, line weight, cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the tips of his tall ears included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. His TALL pointed ears stand straight up unless the pose says otherwise: they are his biggest moving shape. His head is a REAL WOLF'S HEAD with a long muzzle and a black nose, NOT a man's face covered in hair. Nothing from any werewolf film: no silver-headed cane, no pentagram, no torn plaid shirt, no muscle-bound monster. STYLE FOR HIS FUR: draw his wolf's head and furred hands exactly the way Cerberus is drawn on the attached sheet from Rome: a bold, even dark outline; the fur shown ONLY by a few chunky, rounded tufts on the outline at the cheeks, the ruff of the neck and the ears, with a few short soft strokes inside them, never hair by hair; soft, smooth shading in two or three tones; big simple eyes with a plain pupil and one highlight; a few simple dark claws. His clothes are drawn the same simple way: big smooth folds, no texture. NOT a realistic or detailed illustration, NOT furry art, NO fine fur texture, NOT painterly. Take NOTHING of Cerberus himself: ONE head, grey-brown, no collar, no snakes, not black. Keep the simple, chunky cartoon style of the attached sheets and of Cerberus's sheet: few lines, big smooth shapes, soft simple shading, fur only as a few chunky tufts, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; ears straight up; a tired, polite look, jaws closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, one claw lifting the near corner, eyes down
3. Checking: one clawed finger of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward
5. Betting: his right hand pushing a stack of chips well forward
6. Folding: his right hand pushing two cards away face down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No silver cane, no pentagram, no moon on any clothing, no plaid shirt, no human face, no chair, no text.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Wolf Man, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same wolf's head with tall pointed ears and tired amber eyes, grey-brown fur, furred clawed hands, and the torn white shirt and dark waistcoat.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His TALL pointed ears stand straight up unless the pose says otherwise: they are his biggest moving shape. His head is a REAL WOLF'S HEAD with a long muzzle and a black nose, NOT a man's face covered in hair. Nothing from any werewolf film: no silver-headed cane, no pentagram, no torn plaid shirt, no muscle-bound monster. STYLE FOR HIS FUR: draw his wolf's head and furred hands exactly the way Cerberus is drawn on the attached sheet from Rome: a bold, even dark outline; the fur shown ONLY by a few chunky, rounded tufts on the outline at the cheeks, the ruff of the neck and the ears, with a few short soft strokes inside them, never hair by hair; soft, smooth shading in two or three tones; big simple eyes with a plain pupil and one highlight; a few simple dark claws. His clothes are drawn the same simple way: big smooth folds, no texture. NOT a realistic or detailed illustration, NOT furry art, NO fine fur texture, NOT painterly. Take NOTHING of Cerberus himself: ONE head, grey-brown, no collar, no snakes, not black. Keep the simple, chunky cartoon style of the attached sheets and of Cerberus's sheet: few lines, big smooth shapes, soft simple shading, fur only as a few chunky tufts, no fine detail or texture.

1. All in: both hands pushing his whole stack of chips forward, ears forward
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. Sniffing at the pot: his head and long muzzle stretched forward toward the middle of the table (the right of the picture), nose up and twitching, nostrils flared, eyes half closed; arms as at rest
5. Growling at a draught: head turned a little toward the left of the picture, lips curled back from his teeth, a low growl, ears up; arms as at rest
6. His ears flattened right back against his head, eyes wide, the rest of him very still; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No silver cane, no pentagram, no moon on any clothing, no plaid shirt, no human face, no chair, no text.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Wolf Man, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same wolf's head with tall pointed ears and tired amber eyes, grey-brown fur, furred clawed hands, and the torn white shirt and dark waistcoat.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His TALL pointed ears stand straight up unless the pose says otherwise: they are his biggest moving shape. His head is a REAL WOLF'S HEAD with a long muzzle and a black nose, NOT a man's face covered in hair. Nothing from any werewolf film: no silver-headed cane, no pentagram, no torn plaid shirt, no muscle-bound monster. STYLE FOR HIS FUR: draw his wolf's head and furred hands exactly the way Cerberus is drawn on the attached sheet from Rome: a bold, even dark outline; the fur shown ONLY by a few chunky, rounded tufts on the outline at the cheeks, the ruff of the neck and the ears, with a few short soft strokes inside them, never hair by hair; soft, smooth shading in two or three tones; big simple eyes with a plain pupil and one highlight; a few simple dark claws. His clothes are drawn the same simple way: big smooth folds, no texture. NOT a realistic or detailed illustration, NOT furry art, NO fine fur texture, NOT painterly. Take NOTHING of Cerberus himself: ONE head, grey-brown, no collar, no snakes, not black. Keep the simple, chunky cartoon style of the attached sheets and of Cerberus's sheet: few lines, big smooth shapes, soft simple shading, fur only as a few chunky tufts, no fine detail or texture.

1. Scratching behind his left ear with his right hand, head tipped toward it, one eye half closed
2. His claws scraping the felt: the fingers of his right hand curled, claws out, dragged across the felt, three short scratch marks behind them; left arm as at rest
3. Shedding on the tablecloth: his right hand brushing a few tufts of grey-brown fur off the felt, a little embarrassed; left arm as at rest
4. Glancing over his right shoulder at a window behind him, toward the left of the picture, ears up, eyes on the moon; arms as at rest
5. Looking straight at the viewer, ears pricked, a little sheepish; arms as at rest
6. Both ears swivelled back toward a sound behind him, eyes still on the table; arms as at rest

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No silver cane, no pentagram, no moon on any clothing, no plaid shirt, no human face, no chair, no text.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the Wolf Man, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same wolf's head with tall pointed ears and tired amber eyes, grey-brown fur, furred clawed hands, and the torn white shirt and dark waistcoat.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). His TALL pointed ears stand straight up unless the pose says otherwise: they are his biggest moving shape. His head is a REAL WOLF'S HEAD with a long muzzle and a black nose, NOT a man's face covered in hair. Nothing from any werewolf film: no silver-headed cane, no pentagram, no torn plaid shirt, no muscle-bound monster. STYLE FOR HIS FUR: draw his wolf's head and furred hands exactly the way Cerberus is drawn on the attached sheet from Rome: a bold, even dark outline; the fur shown ONLY by a few chunky, rounded tufts on the outline at the cheeks, the ruff of the neck and the ears, with a few short soft strokes inside them, never hair by hair; soft, smooth shading in two or three tones; big simple eyes with a plain pupil and one highlight; a few simple dark claws. His clothes are drawn the same simple way: big smooth folds, no texture. NOT a realistic or detailed illustration, NOT furry art, NO fine fur texture, NOT painterly. Take NOTHING of Cerberus himself: ONE head, grey-brown, no collar, no snakes, not black. Keep the simple, chunky cartoon style of the attached sheets and of Cerberus's sheet: few lines, big smooth shapes, soft simple shading, fur only as a few chunky tufts, no fine detail or texture.

1. Talking: his right hand raised a little, palm open, claws in, apologetic, jaws open mid-word
2. Facing a big bet: the fur of his neck ruff standing up, eyes narrowed, ears forward; arms as at rest
3. Lost a pot: ears drooping down, eyes sad, a small whine; arms as at rest
4. Won a pot: jaws open, tongue lolling happily, his right hand drawing a few chips toward him
5. Down to two players: leaning in on both forearms, ears forward, a few teeth showing
6. Knocked out: rising from his seat, turning away toward the left of the picture, a sheepish little wave of his right hand, ears down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No silver cane, no pentagram, no moon on any clothing, no plaid shirt, no human face, no chair, no text.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Wolf Man's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the muzzle too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the tall ears, the ruff and the top of the shirt collar, as the reference, jaws closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels. STYLE FOR HIS FUR: draw his wolf's head and furred hands exactly the way Cerberus is drawn on the attached sheet from Rome: a bold, even dark outline; the fur shown ONLY by a few chunky, rounded tufts on the outline at the cheeks, the ruff of the neck and the ears, with a few short soft strokes inside them, never hair by hair; soft, smooth shading in two or three tones; big simple eyes with a plain pupil and one highlight; a few simple dark claws. His clothes are drawn the same simple way: big smooth folds, no texture. NOT a realistic or detailed illustration, NOT furry art, NO fine fur texture, NOT painterly. Take NOTHING of Cerberus himself: ONE head, grey-brown, no collar, no snakes, not black.

- His eyes, each piece both eyes with the fur around them and the brow ridges: lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed; wide
- Muzzle patches, each the front of the muzzle with the nose, the jaws and the fur around them, cut straight across just behind the nose and again below the chin: jaws closed at rest; open "ah"; wide, teeth showing "ee"; round "oh"; pursed "oo"; lips pressed "m"; "f"; tongue showing "l"; tongue lolling, happy; lips curled back, growling
- His ears, as separate pieces: both ears up; both ears flat back
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky cartoon style of the attached sheets and of Cerberus's sheet: few lines, big smooth shapes, soft simple shading, fur only as a few chunky tufts, no fine detail or texture.
```
