# Alice: every pose, and the prompts

Baker Street's seat 3 (right of the dealer): drawn facing the viewer's right and MIRRORED by the game to face the table's centre. Built the way Scipio is (`art-tools/pose_rig.py`), style-locked.

Her look: Tenniel's Alice in the colours he gave her himself in The Nursery "Alice" (1890): a YELLOW dress with blue trim, a plain white pinafore, long hair held back by a band (the owner's call: the first sheet, in blue with frills and big glossy eyes, came out looking like Disney's). Large, expressive eyes: by design her FACE, not a prop, is the tell surface, so her face sheet carries the tells (eyes very wide; a frown at her cards; biting her lip). Her prop is a little bottle labelled DRINK ME beside her chips.

Ruled out (her character file): the 1951 Disney film entirely (its dress, bow, design and songs) and the 2010 Burton film; the Cheshire Cat stays off this table. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): her three tells, each beside the idle it hides among: her eyes going very wide (strong) beside trying to see what the dealer is holding; frowning at her cards as if they had said something rude (weak) beside counting the pips on a card; biting her lip (bluffing) beside smoothing her pinafore. 'Fidgets in a chair far too big for her' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the DRINK ME bottle by her right hand | IDLE |
| A2 | Peeking at her cards (right hand) | MECH |
| A3 | Check: one finger taps the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down, very carefully | MECH |
| A6 | Fold: lays her cards down with a little huff | MECH |
| B1 | All in: both hands push her whole stack, determined | MECH |
| B2 | Show: turns her cards over | MECH |
| B3 | Collect: both arms gathering the pot in | MECH |
| B4 | Her eyes go very wide | TELL |
| B5 | Tries to see what the dealer is holding, craning up (decoy for B4) | IDLE |
| B6 | Frowns at her cards as if they had said something rude | TELL |
| C1 | Counts the pips on a card, one finger moving (decoy for B6) | IDLE |
| C2 | Bites her lip | TELL |
| C3 | Smooths her pinafore (decoy for C2) | IDLE |
| C4 | Fidgets in a chair far too big for her | IDLE |
| C5 | A curious, direct look at the viewer | IDLE |
| C6 | Picks up the DRINK ME bottle and studies it doubtfully | IDLE |
| D1 | Talking: one finger raised, explaining very properly | BEAT |
| D2 | Facing a big bet: chin up, trying to look brave | BEAT |
| D3 | Lost a pot: a cross little pout | BEAT |
| D4 | Won a pot: delighted, gathering the chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, very serious | BEAT |
| D6 | Knocked out: hops down, the bottle in hand, a polite curtsey | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Alice's own character sheet, her pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Alice, of Lewis Carroll's Alice's Adventures in Wonderland (1865), as John Tenniel drew her, in the colours Tenniel himself gave her in The Nursery "Alice" (1890). Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No armour, no gauntlets, no surcoat, no man's face. Take the STYLE from the SECOND attached image.

Alice: a girl of about seven, as Tenniel drew her; long, fairly straight fair hair combed back off a high forehead and falling down her back, held by a plain black hairband; a small, serious, rather grave face with a firm little chin, a small nose and SMALL, plain, dot-like dark eyes (NOT big round glossy eyes, NOT long lashes); a YELLOW dress with short sleeves, blue trim at the sleeves and hem and a blue sash; over it a PLAIN white pinafore, cut square, with NO frills and NO ruffles, and NO white collar at her neck. Her prop: a little glass bottle with a cork, a paper label tied round its neck reading DRINK ME in plain capital letters. Earnest, curious, polite, easily indignant. She must NOT look like the Disney Alice: NO blue dress, NO frilled pinafore, NO Peter Pan collar, NO big glossy eyes. Nothing from any film. She is a small child sitting at a grown-up's table, so she sits lower: her shoulders a little below where a grown man's would be.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows, except the words DRINK ME on the bottle.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the hair, the neck and the top of the dress: neutral, attentive; talking, mouth open mid-word; eyes very wide, delighted; frowning, cross
- The torso in the yellow dress and plain pinafore: no head, cut off straight below the waist, the upper arms (short yellow sleeves with blue trim) down to the elbows; NO forearms, NO hands
- Two bare child's forearms, lying on a table, pointing toward its centre, open at the elbow end
- The DRINK ME bottle on its own, standing upright
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the DRINK ME bottle standing on the felt beside her right hand (the left of the picture): neutral; eyes very wide; frowning at her cards; biting her lip

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Alice, exactly as on the attached character sheet (a girl of about seven, as Tenniel drew her: long, fairly straight fair hair combed back off a high forehead under a plain black hairband, a small, serious face with a firm little chin and SMALL, plain dot-like eyes; a YELLOW dress with blue trim at the cuffs and hem and a blue sash, under a PLAIN white pinafore with no frills; and a little glass bottle with a paper label reading DRINK ME standing on the felt beside her right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between her and the cell's edges, the top of her head included: nothing of her is cut off. Nothing below the table edge. No chair: nothing at all behind her, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The little DRINK ME bottle stands on the felt beside her right hand (the left of the picture) unless the pose says otherwise. She is a small child at a grown-up table: her shoulders come lower than a grown man's would, and her forearms rest along the table's edge. She is TENNIEL'S Alice, NOT Disney's: her dress is YELLOW, her pinafore plain with no frills and no white collar, her eyes small and plain, never big and glossy. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, her hands resting on the felt in front of her, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the DRINK ME bottle standing on the felt beside her right hand; an attentive look, mouth closed
2. Peeking at her cards: her right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: one finger of her right hand tapping the felt
4. Calling: her right hand sliding a short stack of chips forward
5. Betting: her right hand setting a stack of chips down very carefully, well forward
6. Folding: her right hand laying two cards down face down, with a little huff

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. The only words anywhere are DRINK ME on the bottle's label. No blue dress, no white collar, no frills, no big glossy eyes, no Disney look, no Cheshire Cat, no White Rabbit, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Alice, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, long straight fair hair and black hairband, yellow dress with blue trim, plain white pinafore and the little DRINK ME bottle.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind her, nothing of her cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The little DRINK ME bottle stands on the felt beside her right hand (the left of the picture) unless the pose says otherwise. She is a small child at a grown-up table: her shoulders come lower than a grown man's would, and her forearms rest along the table's edge. She is TENNIEL'S Alice, NOT Disney's: her dress is YELLOW, her pinafore plain with no frills and no white collar, her eyes small and plain, never big and glossy. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing her whole stack of chips forward, determined
2. Showing: her right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, gathering a pile of chips in
4. Her eyes going VERY wide, eyebrows up, mouth a small round 'o'; arms as at rest
5. Craning up and to the side, trying to see over toward the middle of the table, as if peeking at what the dealer is holding; arms as at rest
6. Frowning hard at her cards as if they had said something rude: brows drawn down, lips pushed out; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. The only words anywhere are DRINK ME on the bottle's label. No blue dress, no white collar, no frills, no big glossy eyes, no Disney look, no Cheshire Cat, no White Rabbit, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Alice, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, long straight fair hair and black hairband, yellow dress with blue trim, plain white pinafore and the little DRINK ME bottle.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind her, nothing of her cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The little DRINK ME bottle stands on the felt beside her right hand (the left of the picture) unless the pose says otherwise. She is a small child at a grown-up table: her shoulders come lower than a grown man's would, and her forearms rest along the table's edge. She is TENNIEL'S Alice, NOT Disney's: her dress is YELLOW, her pinafore plain with no frills and no white collar, her eyes small and plain, never big and glossy. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Counting the pips on a card: a card held up in her left hand, one finger of her right hand touching the pips, lips moving
2. Biting her lower lip, eyes sliding sideways; arms as at rest
3. Smoothing the front of her pinafore with her right hand, eyes down
4. Fidgeting in a chair far too big for her: shifting sideways, shoulders hunched, hands gripping the table's edge
5. A curious, direct look straight at the viewer, head tilted; arms as at rest
6. Holding up the DRINK ME bottle in her right hand, studying its label doubtfully

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. The only words anywhere are DRINK ME on the bottle's label. No blue dress, no white collar, no frills, no big glossy eyes, no Disney look, no Cheshire Cat, no White Rabbit, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Alice, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, long straight fair hair and black hairband, yellow dress with blue trim, plain white pinafore and the little DRINK ME bottle.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind her, nothing of her cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The little DRINK ME bottle stands on the felt beside her right hand (the left of the picture) unless the pose says otherwise. She is a small child at a grown-up table: her shoulders come lower than a grown man's would, and her forearms rest along the table's edge. She is TENNIEL'S Alice, NOT Disney's: her dress is YELLOW, her pinafore plain with no frills and no white collar, her eyes small and plain, never big and glossy. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: one finger of her right hand raised, explaining very properly
2. Facing a big bet: chin up, lips pressed, trying to look brave; arms as at rest
3. Lost a pot: a cross little pout, arms as at rest
4. Won a pot: delighted, her right hand drawing a few chips toward her
5. Down to two players: leaning in on both forearms, very serious
6. Knocked out: getting down from her seat, the DRINK ME bottle in her right hand, a polite little curtsey

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. The only words anywhere are DRINK ME on the bottle's label. No blue dress, no white collar, no frills, no big glossy eyes, no Disney look, no Cheshire Cat, no White Rabbit, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Alice's face overlays, exactly matching the attached sheets' style, colours and line weight. Her face is her tell surface, so these must be clear and big.

Every piece is drawn at EXACTLY the angle and size of her head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the mouths too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the hair, the hairband, the neck and the top of the yellow dress (Tenniel's Alice: small plain eyes, a firm little chin, NOT the Disney Alice), as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- Her eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; VERY WIDE with the brows high; frowning, brows drawn down hard (one piece each, both eyes and brows with the skin around them)
- Lower-face patches, each the mouth with the skin around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a delighted smile; a cross pout; biting her lower lip
- Her head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
