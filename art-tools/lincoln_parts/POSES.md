# Lincoln: every pose, and every piece the puppet needs

The plan: ChatGPT draws every pose Lincoln is ever in, whole, as reference.
Then parts sheets are drawn to match those poses, so the pieces fit the
poses they will be posed into. The pose sheets are the target the rig is
assembled against (as his sheet's seated reference row already is); the
parts sheets are what gets cut.

Why not cut the poses themselves: in a whole drawing, whatever is in front
hides what is behind it (an arm across the chest hides the waistcoat), so
the pieces come out with holes. Poses are for reference; parts are drawn
whole, separately.

## Which in-betweens need drawing

A cut-out puppet gets most of its motion free: the rig slides and rotates
pieces, and the animation tool fills the frames between. So a hat lifting,
a head nodding, a forearm swinging up to the beard, a body leaning back:
none of these needs a drawn in-between. Only a change of SHAPE does,
something no move or turn of a piece can make:

| Shape change | Drawn states |
|---|---|
| Blink | open (painted on the head), half closed, closed |
| Where he looks | ahead (painted), toward the player, toward his cards, up and away |
| Brows | as painted, raised, drawn together |
| Mouth, talking | 8 shapes (below) |
| Mouth, expression | small smile, tight-lipped, sigh |
| A hand changing grip | each grip is its own piece; two or three per action |
| An arm raised toward the face | a forearm drawn foreshortened, pointing back at him |
| The head turned well away | its own head piece (to the clock, over his shoulder) |

The finished heads have their eyes and mouths painted on, so blinks, looks
and talking are OVERLAYS: patches drawn at exactly the rest head's angle
and scale that lie over the painted features. That is why the face sheet
below asks for everything "on the neutral hatted head, same angle, same
size".

## The pose list

All facing the viewer's right (three-quarter, toward the table's centre;
the game mirrors him for the other side), waist up, behind the round
table's edge. Tags from `MOTION-SPEC.md`: MECH a poker action, IDLE noise,
BEAT a mood, TELL one of his three real tells.

**Sheet A: at rest and the poker actions**

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms along the table's edge, long hands folded together in front | IDLE |
| A2 | Peeking at his cards: one hand cupped over two cards on the felt, thumb lifting the near corner, eyes down | MECH |
| A3 | Check: knuckles of one hand rapping the felt | MECH |
| A4 | Call: one hand sliding a short stack of chips forward, palm behind it | MECH |
| A5 | Bet or raise: fingertips setting a taller stack down well forward, leaning in a little | MECH |
| A6 | All in: both hands pushing his whole stack forward, leaning over the table | MECH |
| A7 | Fold: the back of one hand flicking two cards away across the felt | MECH |
| A8 | Show: one hand turning two cards face up | MECH |
| A9 | Collect the pot: both forearms out on the felt, hands cupped, drawing chips in | MECH |
| A10 | Fidget: fingers resting on a short stack of chips, lifting the top one | IDLE |

**Sheet B: his tells and their decoys**

The rule (CLAUDE.md, rule 2): a tell must look like an idle on its own.
So each tell is drawn beside the idle it hides among.

| # | Pose | Tag |
|---|---|---|
| B1 | Strokes his beard, slowly: one hand drawing down the chin beard, thumb along the jaw | TELL |
| B2 | Decoy: thinking, fingertips resting on his chin, not moving | BEAT |
| B3 | Leans back and folds his long hands: sitting back from the table, fingers laced over his waistcoat | TELL |
| B4 | Decoy: stretches his long back, shoulders back, chin up, eyes shut | IDLE |
| B5 | Allows himself a small smile: closed lips, one corner up, eyes on the table | TELL |
| B6 | Decoy: amused at someone's joke, a wider open smile, looking at them | BEAT |

**Sheet C: idles, moods and moments**

| # | Pose | Tag |
|---|---|---|
| C1 | Tips his hat: hand pinching the brim, hat lifted an inch, slight nod | IDLE |
| C2 | Hat raised high in his hand, in greeting (sitting down, or to the player's respect) | BEAT |
| C3 | Rubs his eyes: thumb and finger pressed to the bridge of his nose, eyes shut | IDLE |
| C4 | Glances at the clock on the mantel: head turned up and away over his shoulder | IDLE |
| C5 | Looks at the player: head turned toward the viewer, steady | BEAT |
| C6 | Talking: one hand open, palm up, making a point | BEAT |
| C7 | Laughing, head back a little | BEAT |
| C8 | Facing a big bet: brows up, looking up from his cards | BEAT |
| C9 | Lost a pot: a long tired breath out, eyes half closed, a small shake of the head | BEAT |
| C10 | Won a pot: a small satisfied nod, no grin | BEAT |
| C11 | Knocked out: rising from his chair, tipping his hat goodbye | BEAT |
| C12 | Nervous (rare for him): fingers drumming on the felt | BEAT |

28 poses. "Thinking" is B2; "bluffing face" is A1's plain rest (he almost
never lies with his chips, and his face gives nothing when he does: B5 is
the leak); "tilted" barely exists for him (tilt dial 0.05), C9 covers it.

## The pieces that list adds up to

What he has already (`lincoln/parts.json`): six bare and four hatted heads,
face parts, torsos, two straight tube forearms, bent arms, resting /
pointing / curled hands, cards, a glass. The new sheets need:

**Face overlays, all on the neutral hatted head (7), at its angle and size**
- Eyelids: half closed; closed
- Eyes looking: toward the viewer; down at the table; up and away
- Brows: raised; drawn together
- Mouth and beard patches (lower face, cut straight under the nose, laid
  over the painted beard), talking: rest (closed); A / I (open); E (wide);
  O (round); U / W (pursed); M / B / P (pressed); F / V (lip on teeth);
  L / TH (tongue tip)
- Mouth and beard patches, expression: small one-corner smile; tight-lipped;
  a sigh (lips parted, soft)

**Heads**
- Turned up and away over his shoulder (C4), hat on
- Turned toward the viewer, nearly front-on (C5), hat on (head 11 on the
  current sheet may do)
- Head tilted back, eyes shut (B4, C7), hat on

**Arms**
- Forearm raised, foreshortened, from the table's edge up toward his face
  (for the beard, chin, eyes, hat)
- Forearm reaching forward along the felt, long (for chips and cards)
- Both forearms drawn back to his waistcoat, for the laced hands (B3)

**Hands** (each with its cuff and a stub of sleeve; one side only, mirrored)
- Peek: cupped, thumb lifting (A2); knuckles down (A3), and lifted
- Pushing: palm behind a stack (A4); fingertips placing a stack (A5)
- Both hands pushing (A6, one piece); both hands cupped, raking (A9, one piece)
- Back of the hand, flicking (A7); turning cards over (A8)
- Fingertips on a chip stack (A10)
- Stroking the beard: at the top of the stroke and at the bottom (B1)
- Fingertips on the chin (B2)
- Fingers laced over the waistcoat (B3, both hands, one piece)
- Pinching the hat brim (C1); holding the hat by the brim, raised (C2)
- Pressed to the bridge of the nose (C3)
- Open, palm up (C6)
- Drumming: two frames, fingers up and fingers down (C12)

**Props**: none new. The hat comes off his own head (`lincoln_rig/hat.png`).
Chips and cards are drawn by the game, so hands are drawn holding nothing
where possible, or plain-backed cards.

---

## Prompts

Use a fresh ChatGPT chat. Attach his current sheet
(`art-tools/lincoln_parts/sources/lincoln_sheet.png`) to every prompt, and
from the second prompt on, the pose sheets it made too.

### Pose sheet A

```
Character pose sheet for 2D animation reference: Abraham Lincoln, exactly as on the attached sheet (face, hair, stovepipe hat, black frock coat, bow tie, colours, line weight, flat cartoon style).

Draw 10 poses in a grid, 5 across and 2 down, in this order (left to right, top row first). Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size and the same distance from the viewer, hat on. Nothing below the table edge.

1. At rest: forearms lying along the table's edge, long hands folded together in front of him
2. Peeking at his cards: one hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: rapping the felt with the knuckles of one hand
4. Calling: one hand sliding a short stack of chips forward, palm behind it
5. Betting: fingertips setting a taller stack of chips down well forward, leaning in a little
6. All in: both hands pushing his whole stack of chips forward, leaning over the table
7. Folding: the back of one hand flicking two cards away across the felt
8. Showing: one hand turning two cards face up
9. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
10. Fidgeting: fingertips on a short stack of chips, lifting the top one

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No cigars, no cigarette holders, no glasses of drink.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Abraham Lincoln, exactly as on the attached sheets (face, hair, stovepipe hat, clothes, colours, line weight, flat cartoon style), drawn to match the attached pose sheet: same size, same angle, same table edge.

Draw 6 poses in a row of 3 and a row of 3, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, hat on. Nothing below the table edge.

1. Slowly stroking his chin beard: one hand drawing down the beard, thumb along the jaw
2. Thinking: fingertips resting still on his chin
3. Sitting back from the table, long fingers laced together over his waistcoat
4. Stretching his long back: shoulders back, chin up, eyes shut
5. A small, private smile: lips closed, one corner up, eyes on the table
6. Amused at a joke: a wider open smile, looking across the table

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No cigars, no cigarette holders, no glasses of drink.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Abraham Lincoln, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same table edge.

Draw 12 poses in a grid, 4 across and 3 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, hat on unless the pose says otherwise. Nothing below the table edge.

1. Tipping his hat: fingers pinching the brim, hat lifted an inch, a slight nod
2. Raising his hat high in one hand in greeting, his hair showing
3. Rubbing his tired eyes: thumb and finger pressed to the bridge of his nose, eyes shut
4. Glancing at a clock: head turned up and away over his shoulder
5. Looking straight at the viewer, steady
6. Talking: one hand open, palm up, making a point
7. Laughing, head tipped back a little
8. Surprised by a big bet: brows up, looking up from his cards
9. Lost a pot: a long tired breath out, eyes half closed, a small shake of the head
10. Won a pot: a small satisfied nod, no grin
11. Leaving the table: half risen from his chair, tipping his hat goodbye
12. Restless: fingers drumming on the felt

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No cigars, no cigarette holders, no glasses of drink.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Abraham Lincoln's face overlays, exactly matching the attached sheet's style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his neutral head with the hat on (the first hatted head on the attached sheet: three-quarter, facing the viewer's right), so each one can be laid over that head's painted face. Draw that neutral hatted head once, top left, as the reference; then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed (both eyes as one piece, with the skin around them)
- His eyes closed (one piece, as above)
- His eyes looking toward the viewer; looking down at the table; looking up and away to the side (one piece each)
- His brows raised; his brows drawn together (one piece each, both brows)
- Lower-face patches, each the mouth with the chin beard around it, cut straight across just under the nose, to lie over the painted beard: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a small one-corner smile; tight-lipped; a soft sigh, lips parted
- His head with the hat on, turned up and away over his shoulder
- His head with the hat on, tipped back, eyes shut
- His head with the hat on, turned toward the viewer, nearly front-on
```

### Hands and arms sheet

```
Character sheet for 2D animation rigging: Abraham Lincoln's arms and hands, exactly matching the attached sheets' style, colours, sleeve, cuff and scale, and fitting the hands in the attached pose sheets.

Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels. Each hand has its white shirt cuff and a short stub of black sleeve. Draw each hand once, as his RIGHT hand seen from his three-quarter view facing the viewer's right. Hands hold nothing unless named; cards have plain dark backs; no chips.

Arms:
- A straight forearm, a plain tube of black sleeve, open at the elbow, cuff at the wrist, raised and foreshortened, pointing back up toward his face
- The same, long, reaching forward flat along a table
- Both forearms drawn back toward his waistcoat (one piece), for hands laced in front of him

Hands:
- Cupped, thumb lifted, as if lifting the corner of a card
- A loose fist, knuckles down, rapping a table; the same, lifted
- Flat, palm forward, pushing something along a table
- Fingertips together, setting something down
- The back of the hand, fingers flicking outward
- Palm up, turning something over
- Fingertips resting on top of a small round stack
- Stroking a beard: fingers and thumb spread at the top of the stroke; the same, closed at the bottom
- Fingertips resting on a chin
- Fingers pinching a hat brim (hat not drawn)
- Holding his stovepipe hat by the brim, raised (hat drawn)
- Thumb and finger pressed together as if to the bridge of a nose
- Open, palm up, making a point
- Fingers drumming: fingers raised; fingers down
- Both hands together (one piece each): fingers laced; both hands pushing forward; both hands cupped, drawing something in

No cigars, no cigarette holders, no glasses of drink.
```
