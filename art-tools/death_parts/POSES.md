# Death: every pose, and the prompts

The dealer, built the way the White House cast is (`art-tools/pose_rig.py`):
complete pose drawings as the source of truth, each forearm with its sleeve
and bone hand one piece turning about the elbow, poses that move all of him
as whole-figure frames, a master head with face layers. His old parts sheets
(`sources/death_*.png`) stay as the character reference.

How he differs from the cast:

1. **Front-on, never mirrored.** He deals from the far side, facing you, so
   left and right are his own drawings. The prompts say "the hand on the LEFT
   OF THE PICTURE" rather than "his right hand": image models swap handedness
   on a figure facing the viewer.
2. **He deals in four directions**: to the seats on the left of the picture,
   to the seats on the right, to you (straight toward the viewer), and to
   the board in the middle. Two seats on a side are one drawing, turned a
   little further about the elbow.
3. **No tells** (rule 2's one exception: the design doc asks that he be
   unreadable). So no tell/decoy pairs: his idles are a tired man's, and
   nothing he does is tied to cards.
4. **He plays at the finale** (sheet D): sets the deck aside and takes the
   last seat's actions himself.
5. **A skull talks with its jaw.** The face sheet draws jaw positions, not
   lips, and head turns; there are no eyes to blink (no glowing eyes, ever).

Lessons from the White House sheets, written into the prompts: hands rest
**apart** at rest; the arm a pose does not mention stays **exactly** as at
rest; **no chair** and nothing behind him; card faces **blank**; attach **only
his own** sheets (FDR's sheet B came out in Washington's cuffs because
Washington's sheet was attached as the layout model).

## The poses

| # | Pose | Use |
|---|---|---|
| A1 | Rest: forearms on the table, the deck under the hand on the right of the picture, the other hand flat, hands apart | rest |
| A2 | Thumbing the top card off the deck | deal |
| A3 | Pitching a card across to the left of the picture | deal to the left seats |
| A4 | Sliding a card straight toward the viewer | deal to you |
| A5 | Pitching a card across to the right of the picture | deal to the right seats |
| A6 | Burning a card: sliding it face down beside the deck | burn |
| B1 | Laying the flop: three cards in a row in the middle, one hand sweeping them out | flop |
| B2 | Turning one card face up on the board (blank face) | turn, river, show |
| B3 | Riffle shuffle, both hands | shuffle |
| B4 | Squaring the deck, both hands | shuffle / idle |
| B5 | Cutting the deck, one hand lifting half of it | shuffle |
| B6 | Raking the bets into the middle, both forearms out | end of a street |
| C1 | Pushing the pot to the left of the picture | pot to a left seat |
| C2 | Pushing the pot toward the viewer | pot to you |
| C3 | Pushing the pot to the right of the picture | pot to a right seat |
| C4 | One open hand, palm up, toward a seat | narration, the lessons ("watch that") |
| C5 | One arm extended to the side, palm open: showing someone the way out | the uninvited guest's scene |
| C6 | Leaning in on his forearms, long fingers steepled, watching | heads-up, the last card |
| D1 | Setting the deck aside, squared, at the edge of the felt | the finale: he takes a seat |
| D2 | Peeking at his own two cards, a bone finger lifting a corner | finale |
| D3 | Checking: one bone finger taps the felt | finale |
| D4 | Betting: sliding a stack of chips forward | finale, call too |
| D5 | All in: both hands pushing all his chips forward | finale |
| D6 | Folding: sliding his two cards face down into the middle | finale |

Faces: talking (jaw), head turned to each side (watching a seat act), bowed
over the deal, looking up from under the hood at you, a slow weary tilt.

## Prompts

One fresh ChatGPT chat for all five. Attach to the first prompt his
character sheet (`art-tools/death_parts/sources/death_sheet.png`) and
NOTHING of anyone else's; from the second prompt on, attach his finished
pose sheet A as well.

### Pose sheet A: at rest and the deal

```
Character pose sheet for 2D animation reference: Death, exactly as on the attached character sheet: a tall, narrow figure in a black hooded robe with a deep purple lining, ragged at the hems, crossed with worn leather straps, a gold skull brooch on a short chain at the collarbone; a plain skull face in the hood's shadow, no glowing eyes; long skeletal bone hands. Same colours, line weight and flat cartoon style.

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: FRONT-ON, facing the viewer, waist up, seated behind the far curved edge of a round green poker table, centred in the cell, the same size, in the same place in its cell, with the table edge at the same height in every cell. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the hand that the pose does not mention stays EXACTLY as in pose 1, same position, same shape.

1. At rest: both forearms on the table, hands APART and NOT touching: the hand on the LEFT of the picture lies flat on the felt; the hand on the RIGHT of the picture rests on a squared deck of cards
2. Thumbing the top card off the deck with the hand on the right of the picture (the deck stays under it)
3. Pitching one card across the felt toward the LEFT of the picture with the hand on the left of the picture, arm reaching out to that side
4. Sliding one card straight forward toward the viewer with the hand on the left of the picture, fingertips on the card
5. Pitching one card across the felt toward the RIGHT of the picture with the hand on the left of the picture, the arm crossing in front of him
6. Burning a card: sliding one card face down onto the felt just beside the deck

Cards have plain dark backs; any card face shown is BLANK white. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No scythe, no hourglass, no book, no candles, no chair, no glowing eyes.
```

### Pose sheet B: the board, the shuffle, the rake

```
Character pose sheet for 2D animation reference: Death, exactly as on the attached sheets, drawn to match the attached pose sheet: front-on, same size, same place in each cell, same table edge height, same robe, brooch and bone hands.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: front-on, waist up, behind the far curved edge of a round green poker table, no chair, nothing behind him. Nothing below the table edge. The hand a pose does not mention stays EXACTLY as in the first pose of the attached sheet.

1. Laying the flop: three cards face down in a row in the middle of the felt, the hand on the left of the picture sweeping them out into the row
2. Turning one card face up in the middle of the felt with the hand on the left of the picture (its face BLANK white)
3. Riffle shuffling the deck, both hands together at the centre, the two halves bending and interleaving
4. Squaring the deck with both hands at the centre, fingertips tapping its edges level
5. Cutting the deck: the hand on the left of the picture lifting the top half away
6. Raking the bets into the middle: both forearms out on the felt, hands cupped, drawing a few chips toward the centre

Cards have plain dark backs; any card face shown is BLANK white. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No scythe, no hourglass, no book, no candles, no chair, no glowing eyes.
```

### Pose sheet C: the pot, and his moments

```
Character pose sheet for 2D animation reference: Death, exactly as on the attached sheets, drawn to match the attached pose sheets: front-on, same size, same place in each cell, same table edge height, same robe, brooch and bone hands.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: front-on, waist up, behind the far curved edge of a round green poker table, no chair, nothing behind him. Nothing below the table edge. The hand a pose does not mention stays EXACTLY as in the at-rest pose (one hand flat, one on the deck).

1. Pushing a pile of chips across the felt toward the LEFT of the picture with the hand on the left of the picture
2. Pushing a pile of chips straight forward toward the viewer with both hands
3. Pushing a pile of chips across the felt toward the RIGHT of the picture with the hand on the right of the picture (the deck set just beside it)
4. One bone hand open, palm up, held out a little toward the left of the picture, as if to say "watch that"; calm, unhurried
5. One arm extended out to the side, palm open, showing someone the way out; calm, polite, final
6. Leaning in, forearms on the table, long bone fingers steepled in front of him, watching the table intently

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No scythe, no hourglass, no book, no candles, no chair, no glowing eyes.
```

### Pose sheet D: the finale, when he plays

```
Character pose sheet for 2D animation reference: Death, exactly as on the attached sheets, drawn to match the attached pose sheets: front-on, same size, same place in each cell, same table edge height, same robe, brooch and bone hands.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: front-on, waist up, behind the far curved edge of a round green poker table, no chair, nothing behind him. Nothing below the table edge. The hand a pose does not mention stays EXACTLY as in the at-rest pose.

1. Setting the squared deck aside at the edge of the felt with the hand on the right of the picture, as if putting down his work
2. Peeking at his own two cards on the felt in front of him: one bone hand cupped over them, a fingertip lifting the near corner
3. Checking: one bone fingertip tapping the felt once
4. Betting: the hand on the left of the picture sliding a short stack of chips forward
5. All in: both hands pushing his whole stack of chips forward, leaning in a little
6. Folding: the hand on the left of the picture sliding his two cards face down toward the middle

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No scythe, no hourglass, no book, no candles, no chair, no glowing eyes.
```

### Face sheet: the skull and the hood

```
Character sheet for 2D animation rigging: Death's head, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (front-on, the skull in the shadow of the black hood), so each one can be laid over that head. Draw that head once, top left, with the hood, the top of the robe's collar and the brooch, as the reference, jaw closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- Lower-jaw patches, each the lower half of the skull from just under the cheekbones to the chin, cut straight across: teeth together; jaw slightly parted; jaw open; jaw wide open; jaw shifted a little to one side (a slow, weary breath out)
- The whole head and hood turned toward the left of the picture, watching that side of the table
- The whole head and hood turned toward the right of the picture
- The whole head and hood bowed, looking down at the cards in front of him
- The whole head and hood tilted slightly to one side, tired
- The whole head and hood raised a little, looking straight out at the viewer from under the hood
No glowing eyes in any piece: the eye sockets are plain dark hollows.
```
