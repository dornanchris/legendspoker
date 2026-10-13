# FDR: every pose, and the prompts

Built the way Lincoln's and Washington's game puppets are
(`art-tools/pose_rig.py`): the complete pose drawings are the source of
truth, each forearm with its cuff and hand is cut from them as one piece
turning about the elbow, and alternate poses hang on the rest pose's elbows.
Washington's sheets taught four more things, written into the prompts:

1. **No chair.** Washington's chair showed behind him in every pose and had
   to be cut away by hand. FDR is drawn with nothing behind him at all. (His
   chair is never shown; the profile asks that it never be staged.)
2. **Card faces stay blank.** Washington's "show" pose drew an ace and a
   king. The game draws its own cards, so shown cards are blank white.
3. **The holder is its own piece.** It is his tell surface (tilted up is
   strong), so it must turn on its own about the corner of his mouth: the
   face sheet draws it alone, and the mouths and master head without it.
   He talks round it, as he did; it leaves his mouth only when a hand takes it.
4. **The cape covers the shoulders**, so his elbow joints hide under it:
   say so, and keep his upper arms under it in every pose.

Tags (MOTION-SPEC.md): MECH a poker action, IDLE noise, BEAT a mood, TELL
one of his three tells (holder up: strong; a broad smile at the whole table:
bluffing; tapping the ash: weak), each drawn beside the idle it hides among.

| # | Pose | Tag |
|---|---|---|
| 1 | Rest: forearms along the table's edge, hands resting apart, holder cocked up in his teeth | IDLE |
| 2 | Peeking at his cards (right hand) | MECH |
| 3 | Check: two fingers tap the felt (right hand) | MECH |
| 4 | Call: slides a short stack forward (right hand) | MECH |
| 5 | Bet: sets a taller stack down forward (right hand) | MECH |
| 6 | Fold: tosses his cards in with a little flourish (right hand) | MECH |
| 7 | All in: both hands push his stack, beaming | MECH |
| 8 | Show: turns his cards over (right hand) | MECH |
| 9 | Collect the pot: both hands draw it in | MECH |
| 10 | Takes the holder from his mouth between two fingers (right hand) | IDLE |
| 11 | Taps the ash from the holder, held out over the rail | TELL |
| 12 | Turns the holder in his fingers, looking at it (decoy for 11) | IDLE |
| 13 | Holder tilted up high, chin lifted | TELL |
| 14 | Holder dipped low and loose, relaxed (decoy for 13) | IDLE |
| 15 | A broad smile at the whole table, head turning across it | TELL |
| 16 | A polite, easy half-smile (decoy for 15) | IDLE |
| 17 | Adjusts his pince-nez, thumb and finger (right hand) | IDLE |
| 18 | Settles his cape across his shoulders (both hands) | IDLE |
| 19 | Nods to someone across the room, a small lift of the right hand | IDLE |
| 20 | Talking: holder in his right hand, gesturing with it | BEAT |
| 21 | Laughs at something nobody said, head back | IDLE |
| 22 | Lost a pot: a wry grin, a small shrug | BEAT |
| 23 | Won a pot: beams, both palms opening | BEAT |
| 24 | Heads up: leaning in on both forearms, chin forward, holder up | BEAT |

## Prompts

One fresh ChatGPT chat for all five. Attach to every prompt his rigging sheet
(`art-tools/fdr_parts/sources/fdr_sheet.png`) and Washington's pose sheet A
(`art-tools/washington_parts/sources/poses_a.png`) as the layout model; from
the second prompt on, attach the FDR pose sheets already made.

### Pose sheet A

```
Character pose sheet for 2D animation reference: Franklin D. Roosevelt, exactly as on the attached character sheet (face, pince-nez, the long cigarette holder, the dark naval cape over his shoulders fastened at the throat with a chain, the pinstripe suit, shirt and tie, colours, line weight, flat cartoon style). Copy the layout and framing of the attached Washington pose sheet, not its character.

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. The cape always covers his shoulders and upper arms; his forearms come out from under it. No chair: nothing at all behind him, just white. Nothing below the table edge.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The cigarette holder stays in his teeth at the same angle as in pose 1 unless the pose says otherwise.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the holder in his teeth, cocked upward
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right fingertips setting a taller stack of chips down well forward, leaning in a little
6. Folding: his right hand tossing two cards in, face down, with a small flourish

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no drinks, no ashtray, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Franklin D. Roosevelt, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the cape over his shoulders and upper arms, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart). The holder stays in his teeth at its usual angle unless the pose says otherwise.

1. All in: both hands pushing his whole stack of chips forward, leaning over the table, beaming
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. Taking the cigarette holder from his mouth between the first two fingers of his right hand
5. Tapping the ash from the holder: his right hand holding it out over the table edge, index finger tapping it, a little ash falling
6. Turning the holder in the fingers of his right hand, looking at it

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no drinks, no ashtray, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Franklin D. Roosevelt, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the cape over his shoulders and upper arms, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The holder stays in his teeth unless the pose says otherwise.

1. The holder tilted up high in his teeth, chin lifted, pleased with himself; arms as at rest
2. The holder dipped low and loose, relaxed; arms as at rest
3. A broad smile at the whole table, head turning across it; arms as at rest
4. A polite, easy half-smile; arms as at rest
5. Adjusting his pince-nez with the thumb and finger of his right hand
6. Settling his cape across his shoulders: both hands drawing its edges forward, then resting

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no drinks, no ashtray, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Franklin D. Roosevelt, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the cape over his shoulders and upper arms, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The holder stays in his teeth unless the pose says otherwise.

1. Nodding to someone across the room, his right hand lifting a little from the table in greeting
2. Talking: the holder in his right hand, gesturing with it, making a point
3. Laughing at something nobody said, head tilted back; arms as at rest
4. Lost a pot: a wry grin and a small shrug; arms as at rest
5. Won a pot: beaming, both hands opening, palms up on the felt
6. Down to two players: leaning in over the table on both forearms, chin forward, holder cocked up

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no drinks, no ashtray, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Franklin D. Roosevelt's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head's painted face. Draw that head once, top left, with its neck and the top of its collar and cape, as the reference, WITHOUT the cigarette holder (his mouth closed at rest). Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- The cigarette holder on its own, with its lit cigarette, at exactly its angle in the at-rest pose, as one piece
- His eyes with the lids half closed (both eyes as one piece, with the skin around them, pince-nez included)
- His eyes closed (one piece, as above)
- His eyes looking toward the viewer; looking down at the table; looking up and away to the side; crinkled shut with laughing (one piece each)
- His brows raised; his brows drawn together (one piece each, both brows)
- Lower-face patches WITHOUT the holder, each the mouth with the chin and jaw around it, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a broad smile showing teeth; a polite half-smile; laughing wide open; a wry grin
- His head tilted back, laughing (with the holder in his teeth)
- His head turned toward the viewer, nearly front-on (with the holder)
- His head turned away across the room, nodding (with the holder)
```

## Redraw: sheet B and the cape (the cuffs came out as Washington's)

The first sheet B and pose C6 drew buff turned-back cuffs with lace frills:
Washington's, from the Washington sheet attached as the layout model. Redraw
them with **FDR's own sheets attached instead** (his rigging sheet and his
pose sheet A), and nothing of Washington's:

```
Character pose sheet for 2D animation reference: Franklin D. Roosevelt, exactly as on the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same clothes.

His cuffs are plain WHITE SHIRT CUFFS with small gold cufflinks, showing just below the dark pinstripe sleeves, exactly as in the attached pose sheet. NO turned-back coloured cuffs, NO lace, NO frills.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the cape over his shoulders and upper arms, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart). The holder stays in his teeth at its usual angle unless the pose says otherwise.

1. All in: both hands pushing his whole stack of chips forward, leaning over the table, beaming
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. Taking the cigarette holder from his mouth between the first two fingers of his right hand
5. Tapping the ash from the holder: his right hand holding it out over the table edge, index finger tapping it, a little ash falling
6. Settling his cape across his shoulders: both hands drawing its edges forward

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no drinks, no ashtray, no chair.
```

(Turning the holder in his fingers, the old B6, is dropped: the cape takes
its cell, and the ash tap's decoy can be `holder_low`.)
