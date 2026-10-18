# Leonidas: every pose, and the prompts

The Athens table's seat 2, built the way Socrates and the White House cast
are (`art-tools/pose_rig.py`). Seat 2 is on the player's left, so he is
drawn facing the viewer's right and never mirrored.

His prop is the biggest shape at the table: the bronze Corinthian helmet
with its tall horsehair crest, set on the felt. It stands just outside his
RIGHT elbow (the left of the picture), so the crest rises in the gap
between him and Socrates and never across Death or the cup by the doorway,
and his right hand stays free for the poker actions.

The look, from his character file: a red cloak over a bronze breastplate,
long hair and a full beard, fists on the felt; level eyes, jaw set, a man
already bored of the conversation. ASSETS.md and his file rule out the film
300 and its graphic novel: no bare chest, no leather trunks, none of its
lines. Build from Greek vase painting and the marble warrior bust from
Sparta known as "Leonidas".

The first prompt borrows Socrates's character sheet for its LAYOUT AND STYLE
ONLY, so the two read as one table; it bans Socrates's look by name. From the
second prompt on, attach only Leonidas's own sheets.

Tags (MOTION-SPEC.md): MECH a poker action, IDLE noise, BEAT a mood, TELL
one of his three tells, each drawn beside the idle it hides among: both
fists planted on the table (strong) beside his arms folded; lifting his chin
(bluffing) beside a look of open disdain across the table; a hard breath out
through his nose (weak) beside a slow breath in.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands resting apart, the helmet by his right elbow | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: one knuckle raps the felt (right hand) | MECH |
| A4 | Call: slides a short stack forward (right hand) | MECH |
| A5 | Bet: plants a tall stack well forward | MECH |
| A6 | Fold: flicks his cards away (right hand) | MECH |
| B1 | All in: both hands shove his whole stack, jaw set | MECH |
| B2 | Show: turns his cards over (right hand) | MECH |
| B3 | Collect the pot: both forearms out, drawing it in | MECH |
| B4 | Plants both fists on the table | TELL |
| B5 | Folds his arms across his breastplate (decoy for B4) | IDLE |
| B6 | Cracks his knuckles, hands together in front | IDLE |
| C1 | Lifts his chin, looking down his nose | TELL |
| C2 | Glances across the table with open disdain (decoy for C1) | IDLE |
| C3 | Exhales hard through his nose, shoulders dropping | TELL |
| C4 | Breathes in slowly, chest rising (decoy for C3) | IDLE |
| C5 | Tugs his red cloak straight (right hand) | IDLE |
| C6 | Sets his crested helmet an inch to the left (right hand) | IDLE |
| D1 | Talking: one finger raised, a short word | BEAT |
| D2 | Facing a big bet: eyes narrowed, unimpressed | BEAT |
| D3 | Lost a pot: jaw clenched, staring at the felt | BEAT |
| D4 | Won a pot: one curt nod, no smile | BEAT |
| D5 | Heads up: leaning in on both fists, eyes level | BEAT |
| D6 | Knocked out: lifts his helmet to put it on, keeping his appointment | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches Socrates's
character sheet (`art-tools/socrates_parts/sources/socrates_sheet.png`) and
nothing else. From the second prompt on, attach Leonidas's own character
sheet and, once it exists, his pose sheet A, and nothing of anyone else's.

### Character sheet

```
Character sheet for 2D animation rigging: Leonidas, King of Sparta. Copy ONLY the LAYOUT and the flat cartoon STYLE of the attached sheet (bold dark outlines, clean painted shading, warm light, the same line weight): take NOTHING of its character. No bald head, no grey beard, no shabby undyed cloak, no patches, no wine cup.

Leonidas: a lean, hard soldier-king in his fifties; long dark hair falling to his shoulders, a full dark beard with grey at the chin, a straight nose, level eyes, jaw set: a man already bored of the conversation. He wears a polished bronze breastplate (a plain bell cuirass with a curved rim at the neck and arms, NOT a sculpted bare chest) over a short red tunic whose sleeves show at the shoulders, bare forearms, and a deep red wool cloak pinned at both shoulders and falling behind. His prop: a bronze Corinthian helmet with a tall red-and-black horsehair crest running front to back, nose guard and cheek pieces, eye holes dark. Dignified, stern, never brutal. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, no abs.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with its neck and the top of the breastplate and cloak: neutral, bored; talking, a short word; chin lifted, looking down his nose; a hard breath out through the nose, nostrils flared
- The torso in breastplate and cloak: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two bare forearms lying on a table, pointing toward its centre, open at the elbow end
- The helmet on its own, standing as it would on a table, crest up
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the helmet standing on the felt just outside his right elbow (the left of the picture): neutral; both fists planted on the table; chin lifted; arms folded
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Leonidas, exactly as on the attached character sheet (long dark hair, full beard, bronze breastplate, red tunic sleeves, red cloak, bare forearms, the crested Corinthian helmet, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Nothing below the table edge. No chair, no couch: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The helmet stands on the felt just outside his right elbow (the left of the picture), exactly as in pose 1, unless the pose says otherwise.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the helmet standing on the felt just outside his right elbow, crest up; jaw set, eyes level, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: one knuckle of his right hand rapping the felt once
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right hand planting a tall stack of chips well forward, leaning in a little
6. Folding: the back of his right hand flicking two cards away across the felt

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No shield, no spear, no sword, no chair, no couch.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Leonidas, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same armour, cloak and helmet.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart), and the helmet stays on the felt just outside his right elbow.

1. All in: both hands shoving his whole stack of chips forward, leaning over the table, jaw set
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. Both fists planted on the table in front of him, knuckles down, arms braced, eyes level
5. Arms folded across his breastplate, sitting back a little, unimpressed
6. Cracking his knuckles: his hands together in front of his chest, fingers laced and pushed outward

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No shield, no spear, no sword, no chair, no couch.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Leonidas, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same armour, cloak and helmet.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart), and the helmet stays on the felt just outside his right elbow unless the pose says otherwise.

1. Lifting his chin, looking down his nose across the table; arms as at rest
2. A glance across the table with open disdain: eyes to the side, one corner of the mouth pulled down; arms as at rest
3. A hard breath out through his nose: nostrils flared, lips pressed, shoulders dropping a little; arms as at rest
4. A slow breath in: chest rising under the breastplate, eyes half closed; arms as at rest
5. Tugging his red cloak straight at the shoulder with his right hand
6. His right hand on the helmet's crest, setting the helmet an inch to the left on the felt

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No shield, no spear, no sword, no chair, no couch.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Leonidas, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same armour, cloak and helmet.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart), and the helmet stays on the felt just outside his right elbow unless the pose says otherwise.

1. Talking: his right hand raised, one finger up, saying a single short word
2. Facing a big bet: eyes narrowed, unimpressed, jaw set; arms as at rest
3. Lost a pot: jaw clenched, staring down at the felt; arms as at rest
4. Won a pot: one curt nod, chin down, no smile; arms as at rest
5. Down to two players: leaning in over the table on both fists, eyes level and hard
6. Knocked out: both hands lifting the crested helmet up toward his head, about to put it on, calm and resolved

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No shield, no spear, no sword, no chair, no couch.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Leonidas's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with its neck and the top of the breastplate and cloak, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side with disdain; narrowed (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down hard (one piece each, both brows)
- Lower-face patches, each the mouth with the moustache and the beard around it, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; lips pressed hard, a breath out through the nose; one corner pulled down in disdain; jaw clenched; a very small, grim smile
- His head with the chin lifted, looking down his nose
- His head turned toward the viewer, nearly front-on
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of his stack plays the big win, and losing one the crushing loss. Pose 1
is his rest pose again, only to measure the sheet by. Attach
`art-tools/leonidas_parts/sources/poses_a.png` FIRST, then
`art-tools/leonidas_parts/sources/leonidas_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: Leonidas, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same armour, cloak and helmet.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind him, no chair, nothing of him cut off by the edge of the picture (raised hands included). Nothing below the table edge. In every pose the helmet stays on the felt just outside his right elbow.

1. EXACTLY his at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both fists thrust high above his head, roaring a battle cry, mouth wide open, chest out
3. A crushing loss: both hands gripping the table's edge, head bowed, jaw clenched, eyes shut: a soldier taking the blow

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No spear, no shield, no helmet on his head, no chair.
```
