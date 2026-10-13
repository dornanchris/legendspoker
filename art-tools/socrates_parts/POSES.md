# Socrates: every pose, and the prompts

The first of the Athens table, built the way the White House cast is
(`art-tools/pose_rig.py`): complete pose drawings are the source of truth,
each forearm with its hand one piece turning about the elbow, poses that
move all of him as whole-figure frames, and a master head with face layers.
He sits in seat 1 (the player's left), so he is drawn facing the viewer's
right and is never mirrored.

What the White House taught, written into the prompts: hands resting
**apart**; the arm a pose does not mention stays **exactly** as at rest;
**no chair** and nothing behind him (the room's couches are in the
backdrop); card faces **blank**; attach **only his own** sheets once he has
one.

Unlike the White House cast, he has no character sheet yet, so the first
prompt makes one. It borrows Roosevelt's rigging sheet for its LAYOUT AND
STYLE ONLY. That is the one place another character's sheet is attached (it
is how FDR's sheet B got Washington's cuffs), so the prompt bans everything
of Roosevelt's by name; check the result for a suit, a moustache or
spectacles before going on.

His look: bald dome, big untidy beard, snub nose, wide bulging eyes, a
satyr's good-humoured face, a short thick body in ONE plain, shabby cloak
(the only unadorned figure at the table). His prop is a shallow two-handled
wine cup (a kylix), which stands on the felt by his left hand at rest.

Tags (MOTION-SPEC.md): MECH a poker action, IDLE noise, BEAT a mood, TELL
one of his three tells, each drawn beside the idle it hides among:
scratching his snub nose (bluffing) beside scratching his beard; a private
smile (strong) beside a friendly smile at the table; frowning up at the
ceiling as if it had asked him something (weak) beside looking up, simply
thinking.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands resting apart, the cup by his left hand | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt (right hand) | MECH |
| A4 | Call: slides a short stack forward (right hand) | MECH |
| A5 | Bet: sets a taller stack down well forward | MECH |
| A6 | Fold: slides his cards away, without regret (right hand) | MECH |
| B1 | All in: both hands push his whole stack, cheerful | MECH |
| B2 | Show: turns his cards over (right hand) | MECH |
| B3 | Collect the pot: both forearms out, drawing it in | MECH |
| B4 | Scratches his snub nose with one finger (right hand) | TELL |
| B5 | Scratches his beard thoughtfully (right hand; decoy for B4) | IDLE |
| B6 | Smiles as if at a private joke, eyes down | TELL |
| C1 | A friendly open smile at the table (decoy for B6) | IDLE |
| C2 | Frowns up at the ceiling, as if it had asked him something | TELL |
| C3 | Looks up and away, calmly thinking (decoy for C2) | IDLE |
| C4 | Sips from his cup (left hand) | IDLE |
| C5 | Stretches; the cloak slips off one shoulder | IDLE |
| C6 | Pulls his cloak tighter at the chest (both hands) | IDLE |
| D1 | Talking: right hand open, palm up, asking a question | BEAT |
| D2 | Facing a big bet: brows up, delighted curiosity | BEAT |
| D3 | Lost a pot: a cheerful shrug, palms up | BEAT |
| D4 | Won a pot: raises his cup to the table (left hand) | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes bright | BEAT |
| D6 | Knocked out: turns his empty cup upside down on the felt | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches Roosevelt's
rigging sheet (`art-tools/roosevelt_parts/sources/roosevelt_sheet.png`) and
nothing else. From the second prompt on, attach Socrates's own character
sheet and, once it exists, his pose sheet A, and nothing of anyone else's.

### Character sheet

```
Character sheet for 2D animation rigging: Socrates, the Athenian philosopher. Copy ONLY the LAYOUT and the flat cartoon STYLE of the attached sheet (bold dark outlines, clean painted shading, warm light, the same line weight): take NOTHING of its character. No suit, no tie, no waistcoat, no watch chain, no moustache on its own, no spectacles, no hair on the head.

Socrates: a bald dome with a fringe of grey hair low at the back; a big, untidy grey beard; a snub nose; wide, bulging eyes; a satyr's face with a good-humoured mouth; a short, thick, barrel-shaped body in ONE plain, shabby, undyed wool cloak (a himation) wrapped over one shoulder, worn and patched, no tunic pattern, no jewellery: the plainest figure at any table. Dignified and kindly, never ugly or animal-like. His prop: a shallow, two-handled black wine cup (a kylix) with a thin red band.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with its neck and the top of the cloak: neutral; talking, mouth open mid-word; smiling as if at a private joke; frowning up at the ceiling
- The torso in the cloak: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms lying on a table, pointing toward its centre, open at the elbow end, bare below the cloak
- The wine cup on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the cup on the felt by his left hand: neutral; talking with one hand open; sipping from the cup; smiling at a private joke
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Socrates, exactly as on the attached character sheet (bald dome, big untidy grey beard, snub nose, bulging eyes, the one plain shabby cloak, the shallow two-handled wine cup, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Nothing below the table edge. No chair, no couch: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The cup stays on the felt by his left hand, exactly as in pose 1, unless the pose says otherwise.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the wine cup standing on the felt just beyond his left hand; mouth closed, a faint good-humoured look
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right fingertips setting a taller stack of chips down well forward, leaning in a little
6. Folding: his right hand sliding two cards away face down, without regret

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no wreath, no scroll, no chair, no couch.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Socrates, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same cloak and cup.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart), and the cup stays on the felt by his left hand.

1. All in: both hands pushing his whole stack of chips forward, leaning over the table, cheerful
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. Scratching the tip of his snub nose with one finger of his right hand, eyes on the table
5. Scratching his beard thoughtfully with the fingers of his right hand, eyes on the table
6. Smiling as if at a private joke, eyes down at the felt, the corners of his mouth turned up under the beard; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no wreath, no scroll, no chair, no couch.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Socrates, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same cloak and cup.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart), and the cup stays on the felt by his left hand unless the pose says otherwise.

1. A friendly, open smile at the whole table, head lifted a little; arms as at rest
2. Frowning up at the ceiling, head tilted back, brows drawn together, as if the ceiling had asked him a question; arms as at rest
3. Looking up and away, calm and thoughtful, brows relaxed; arms as at rest
4. Sipping from the wine cup, held in his left hand at his lips under the beard
5. Stretching his back, both arms raised a little, his cloak slipping off one shoulder
6. Pulling his cloak tighter across his chest with both hands

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no wreath, no scroll, no chair, no couch.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Socrates, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same cloak and cup.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart), and the cup stays on the felt by his left hand unless the pose says otherwise.

1. Talking: his right hand raised, open, palm up, asking a question, eyebrows lifted
2. Facing a big bet: brows up, eyes wide, delighted curiosity; arms as at rest
3. Lost a pot: a cheerful shrug, both palms turned up on the felt
4. Won a pot: raising the wine cup to the table in a toast with his left hand, smiling
5. Down to two players: leaning in over the table on both forearms, chin forward, eyes bright
6. Knocked out: his left hand turning the empty wine cup upside down on the felt, calm, content

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No hat, no wreath, no scroll, no chair, no couch.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Socrates's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with its neck and the top of its cloak, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking up and away; wide open with delight (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn together in a frown (one piece each, both brows)
- Lower-face patches, each the mouth with the moustache and the beard around it, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a small private smile; a broad friendly smile; laughing; a puzzled frown
- His head tilted back, frowning up at the ceiling
- His head turned toward the viewer, nearly front-on
```
