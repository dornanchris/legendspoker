# The Ferryman: every pose, and the prompts

The dealer at the Last Crossing (the owner's call). Death plays the finale, so
he does not deal it: the Ferryman, whose lantern is out on the river in every
other telling of the room, has tied up his boat and come in to deal the last
table. The finale is laid out once, differently: the Stranger (the player) in
the left chair, Death in the right, the Ferryman between them at the back,
front-on, where Death deals everywhere else.

**Never named Charon, never Greek** (the design doc: no named underworld
imagery at the finale; the gods are the sequel's). He is a boatman: old,
weathered, quiet. He must look nothing like Death or the Stranger: no hood, no
black, no fedora. A faded ochre oilskin coat and a sou'wester rain hat, a long
grey beard, big rope-worn hands, one old coin on a cord at his throat (the
fare). He deals in silence: Death does the talking.

Built like Death's dealer kit (`art-tools/death_parts/POSES.md`): front-on,
never mirrored, so the prompts say "the hand on the LEFT OF THE PICTURE";
complete pose drawings, a master head with face layers. **No tells**: he is
the house. Heads up, he deals to two chairs: the left of the picture (the
Stranger) and the right (Death).

## The poses

| # | Pose | Use |
|---|---|---|
| A1 | Rest: forearms on the table, the deck under the hand on the right of the picture, the other hand flat, hands apart | rest |
| A2 | Thumbing the top card off the deck | deal |
| A3 | Pitching a card across to the left of the picture | deal to the Stranger |
| A4 | Sliding a card straight toward the viewer | deal (spare) |
| A5 | Pitching a card across to the right of the picture | deal to Death |
| A6 | Burning a card beside the deck | burn |
| B1 | Laying the flop | flop |
| B2 | Turning one card face up on the board | turn, river |
| B3 | Riffle shuffle | shuffle |
| B4 | Squaring the deck | shuffle / idle |
| B5 | Cutting the deck | shuffle |
| B6 | Raking the bets into the middle | end of a street |
| C1 | Pushing the pot to the left of the picture | pot to the Stranger |
| C2 | Pushing the pot toward the viewer | pot (spare) |
| C3 | Pushing the pot to the right of the picture | pot to Death |
| C4 | Touching the brim of his sou'wester, a quiet nod | greeting, idle |
| C5 | Turning the old coin at his throat between finger and thumb | idle |
| C6 | Leaning in on his forearms, hands clasped, watching | the last card |

Faces: blink, looking to each side (watching a chair act), looking down at
the deal, a small tired nod, the faintest smile, the mouth a little open (a
rare word).

## Prompts

One fresh ChatGPT chat for all five. The first prompt attaches TWO images, in
this order: Death's dealer character sheet
(`art-tools/death_parts/sources/death_sheet.png`) for the layout and the
style, then Death's dealer pose sheet A
(`art-tools/death_parts/sources/poses_a.png`) for how a front-on dealer sits.
From the second prompt on, attach the Ferryman's own character sheet and,
once it exists, his pose sheet A, and NOTHING of Death's (the White House
lesson: an attached sheet leaks its character).

### Character sheet

```
Character sheet for 2D animation rigging: the Ferryman, an old boatman who has tied up his boat and come in out of the rain to deal cards at the last table. Copy ONLY the LAYOUT and the STYLE of the FIRST attached sheet (what goes where, and how it is drawn): take NOTHING of its character. No hood, no skull, no black robe, no bone hands, no brooch. The SECOND attached image shows how a dealer sits front-on behind the table: copy that posture only.

The Ferryman: a lean, weathered old man, tall and a little stooped, patient and kind, very tired; a long grey beard and grey eyebrows, deep-set calm eyes, a face lined by wind and river; a faded ochre-yellow oilskin coat, worn and creased, glistening with rain, buttoned to the throat, over a dark grey wool jumper; a matching ochre oilskin sou'wester rain hat with its long brim at the back; big knotted, rope-worn hands; one old, worn coin on a leather cord at his throat. Quiet and gentle, never sinister: a man who has rowed a great many people across and has never once been in a hurry.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: FRONT-ON, facing the viewer, like the dealer in the SECOND attached image: he deals from the far side of the table, facing the player.

Draw, all front-on, at the same size:
- Finished heads with the sou'wester, the beard and the coat's collar: level, eyes open; eyes closed (a blink); looking to the left of the picture; looking to the right of the picture; looking down at the table
- The torso in the oilskin coat with the coin on its cord: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the oilskin sleeves with his big weathered hands, lying on a table, open at the elbow end
- The sou'wester on its own
- A round portrait for a nameplate: his head and shoulders inside a circle, facing the viewer
- Four seated reference poses, waist up behind the far curved edge of a round green poker table, front-on: at rest, forearms on the table, hands apart, one hand resting on a squared deck of cards; dealing a card; shuffling the deck; touching the brim of his hat

Cards have plain dark backs; any card face shown is BLANK white.

STYLE, the most important rule: match the FIRST attached image (the game's dealer sheet) exactly: the same colours of light, outlines, line weight and painted cartoon shading, so this figure sits beside that one in the same room. Big clear readable shapes and a silhouette that reads at a tiny size; grown-up proportions, never chibi, never cute. NOT photoreal, NOT a 3D render. No scythe, no hourglass, no oar, no boat, no lantern, no chair.
```

### Pose sheet A: at rest and the deal

```
Character pose sheet for 2D animation reference: the Ferryman, exactly as on the attached character sheet: a lean, weathered old boatman with a long grey beard, a faded ochre-yellow oilskin coat and sou'wester rain hat, a dark grey jumper, big rope-worn hands, an old coin on a leather cord at his throat. Same colours, line weight and painted cartoon style.

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: FRONT-ON, facing the viewer, waist up, seated behind the far curved edge of a round green poker table, centred in the cell, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his hat included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the hand that the pose does not mention stays EXACTLY as in pose 1, same position, same shape.

1. At rest: both forearms on the table, hands APART and NOT touching: the hand on the LEFT of the picture lies flat on the felt; the hand on the RIGHT of the picture rests on a squared deck of cards
2. Thumbing the top card off the deck with the hand on the right of the picture (the deck stays under it)
3. Pitching one card across the felt toward the LEFT of the picture with the hand on the left of the picture, arm reaching out to that side
4. Sliding one card straight forward toward the viewer with the hand on the left of the picture, fingertips on the card
5. Pitching one card across the felt toward the RIGHT of the picture with the hand on the left of the picture, the arm crossing in front of him
6. Burning a card: sliding one card face down onto the felt just beside the deck

Cards have plain dark backs; any card face shown is BLANK white. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hood, no skull, no oar, no boat, no lantern, no chair.
```

### Pose sheet B: the board, the shuffle, the rake

```
Character pose sheet for 2D animation reference: the Ferryman, exactly as on the attached sheets, drawn to match the attached pose sheet: front-on, same size, same place in each cell, same table edge height, same ochre oilskin coat and sou'wester, grey beard, coin on its cord and big weathered hands.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: front-on, waist up, behind the far curved edge of a round green poker table, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The hand a pose does not mention stays EXACTLY as in the first pose of the attached sheet.

1. Laying the flop: three cards face down in a row in the middle of the felt, the hand on the left of the picture sweeping them out into the row
2. Turning one card face up in the middle of the felt with the hand on the left of the picture (its face BLANK white)
3. Riffle shuffling the deck, both hands together at the centre, the two halves bending and interleaving
4. Squaring the deck with both hands at the centre, fingertips tapping its edges level
5. Cutting the deck: the hand on the left of the picture lifting the top half away
6. Raking the bets into the middle: both forearms out on the felt, hands cupped, drawing a few chips toward the centre

Cards have plain dark backs; any card face shown is BLANK white. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hood, no skull, no oar, no boat, no lantern, no chair.
```

### Pose sheet C: the pot, and his quiet moments

```
Character pose sheet for 2D animation reference: the Ferryman, exactly as on the attached sheets, drawn to match the attached pose sheets: front-on, same size, same place in each cell, same table edge height, same ochre oilskin coat and sou'wester, grey beard, coin on its cord and big weathered hands.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: front-on, waist up, behind the far curved edge of a round green poker table, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The hand a pose does not mention stays EXACTLY as in the at-rest pose (one hand flat, one on the deck).

1. Pushing a pile of chips across the felt toward the LEFT of the picture with the hand on the left of the picture
2. Pushing a pile of chips straight forward toward the viewer with both hands
3. Pushing a pile of chips across the felt toward the RIGHT of the picture with the hand on the right of the picture (the deck set just beside it)
4. Touching the brim of his sou'wester with two fingers of the hand on the left of the picture, a small polite nod
5. Turning the old coin at his throat between finger and thumb of the hand on the left of the picture, thoughtful
6. Leaning in, forearms on the table, his big hands clasped loosely in front of him, watching the table quietly

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hood, no skull, no oar, no boat, no lantern, no chair.
```

### Face sheet

```
Character sheet for 2D animation rigging: the Ferryman's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (front-on, under the sou'wester), so each one can be laid over that head. Draw that head once, top left, with the hat, the beard and the coat's collar, as the reference, eyes open, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- Eye patches, each both eyes with the brows and the skin around them, cut as one band: open (rest); half closed; closed (a blink); looking to the left of the picture; looking to the right of the picture; looking down
- Mouth patches, each the mouth in the beard with the moustache over it: closed (rest); a little open (a quiet word); the faintest tired smile
- The whole head turned a little toward the left of the picture, watching that side of the table
- The whole head turned a little toward the right of the picture
- The whole head bowed, looking down at the cards in front of him
```
