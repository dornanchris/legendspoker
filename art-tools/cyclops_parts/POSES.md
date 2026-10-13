# Polyphemus the Cyclops: every pose, and the prompts

The Athens table's seat 4, on the player's right: drawn facing the viewer's
right like everyone, and MIRRORED in the game to face the table's centre.
Built the way Socrates and Leonidas are (`art-tools/pose_rig.py`).

He is the one figure drawn too big for his chair: "head and shoulders above
everyone, filling his fifth of the screen and some of his neighbours'". The
game places every drawing by its table rail, at one scale for all, so his
size comes from the drawing itself: the prompts keep the table edge the same
as everyone's and draw him a third bigger behind it.

His club of green olive wood leans against the table's edge just outside
his RIGHT elbow (the left of the picture). Mirrored at seat 4, that puts it
at the outer edge of the screen, never across Medusa or the middle.

From his character file and ASSETS.md: one great eye in the middle of the
brow with an old burn scar round it, a shaggy black beard, a sheepskin over
his shoulders; Homer's giant is a shepherd with a beard, not a monster
costume. Nothing of Harryhausen's cyclops (no horn, no goat legs) or the
X-Men's. His tells live on the eye and the fist, the biggest shapes he has,
which is what reads at a fifth of a phone screen.

Tags (MOTION-SPEC.md): MECH a poker action, IDLE noise, BEAT a mood, TELL
one of his three tells, each drawn beside the idle it hides among: the eye
narrowing (strong) beside a very slow blink; sniffing the air (weak) beside
tilting his head to listen; thumping the table with his fist (tilted) beside
shifting his weight until the table groans.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands resting apart, the club leaning by his right elbow | IDLE |
| A2 | Peeking at his cards (right hand), the eye close to them | MECH |
| A3 | Check: one huge knuckle raps the felt (right hand) | MECH |
| A4 | Call: slides a short stack forward (right hand) | MECH |
| A5 | Bet: plants a tall stack well forward | MECH |
| A6 | Fold: sweeps his cards away (right hand) | MECH |
| B1 | All in: both hands shove his whole stack | MECH |
| B2 | Show: turns his cards over (right hand) | MECH |
| B3 | Collect the pot: both forearms out, drawing it in | MECH |
| B4 | His eye narrows | TELL |
| B5 | Blinks, very slowly (decoy for B4) | IDLE |
| B6 | Sniffs at the air, nose up | TELL |
| C1 | Tilts his head, listening (decoy for B6) | IDLE |
| C2 | Thumps the table with his right fist | TELL |
| C3 | Shifts his weight, both hands on the rim: the table groans (decoy for C2) | IDLE |
| C4 | Counts his sheep on his fingers (right hand) | IDLE |
| C5 | Scratches his beard with a thumbnail the size of a spoon (right hand) | IDLE |
| C6 | Rests his right hand on the club's head | IDLE |
| D1 | Talking: a huge finger pointing at someone across the table | BEAT |
| D2 | Facing a big bet: the eye wide, suspicious | BEAT |
| D3 | Lost a pot: a scowl and a growl, teeth bared | BEAT |
| D4 | Won a pot: a huge gap-toothed grin | BEAT |
| D5 | Heads up: leaning in on both fists, the eye fixed | BEAT |
| D6 | Knocked out: picks up his club to go | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches Leonidas's
character sheet (`art-tools/leonidas_parts/sources/leonidas_sheet.png`) and
nothing else, for its layout and style only. From the second prompt on,
attach the Cyclops's own character sheet and, once it exists, his pose
sheet A, and nothing of anyone else's.

### Character sheet

```
Character sheet for 2D animation rigging: Polyphemus the Cyclops, the giant shepherd from Homer's Odyssey. Copy ONLY the LAYOUT and the flat cartoon STYLE of the attached sheet (bold dark outlines, clean painted shading, warm light, the same line weight): take NOTHING of its character. No armour, no bronze, no red cloak, no helmet, no long hair.

Polyphemus: a giant, a third bigger than a man in every way, broad and heavy, shoulders like a hill. ONE great eye in the middle of his brow, with an old, pale burn scar in a ring round it, and one heavy brow over it; a broad flat nose; a shaggy, tangled black beard; thick black hair, short and matted; weathered, ruddy skin. A rough undyed sheepskin worn over both shoulders like a cape, tied at the chest with a thong, over a coarse brown wool tunic; huge bare forearms; enormous hands with thick fingers and broad thumbnails. A shepherd, simple and suspicious, more grumpy than monstrous: a human giant's face, not a monster costume. No horns, no goat legs, no tusks, no visor. His prop: a club of green olive wood, a trimmed trunk with knots and stubs of branches, as long as he is tall.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. The eye, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with its neck and the top of the sheepskin: neutral, suspicious; talking, mouth open mid-word; the eye narrowed; a huge gap-toothed grin
- The torso in the sheepskin and tunic: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two bare forearms lying on a table, pointing toward its centre, open at the elbow end
- The club on its own, upright
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the club leaning against the table's edge just outside his right elbow (the left of the picture), its top rising above his shoulder: neutral; the eye narrowed; thumping the table with his fist; sniffing the air
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Polyphemus the Cyclops, exactly as on the attached character sheet (one great eye with the burn scar, shaggy black beard, sheepskin over the shoulders, brown tunic, huge bare forearms, the olive-wood club, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. The table edge runs the full width of each cell, as wide as for an ordinary player; HE is a giant behind it, a third bigger than a man: his head near the top of the cell, his shoulders nearly as wide as the cell. Leave a little white between him and the cell's edges: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The club leans against the table's edge just outside his right elbow (the left of the picture), exactly as in pose 1, unless the pose says otherwise.

1. At rest: both huge forearms lying along the table's edge, his hands resting on the felt in front of him, apart, relaxed and NOT touching, NOT laced, NOT overlapping; the club leaning against the table's edge just outside his right elbow, its top above his shoulder; the eye open, suspicious, mouth closed in the beard
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, bending down so the great eye is close to them
3. Checking: one huge knuckle of his right hand rapping the felt once
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right hand planting a tall stack of chips well forward
6. Folding: his right hand sweeping two cards away across the felt

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No sheep, no rocks, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Polyphemus the Cyclops, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height and width, same sheepskin and club.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, a giant behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart), and the club stays leaning by his right elbow.

1. All in: both hands shoving his whole stack of chips forward, leaning over the table
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. His great eye narrowed to a slit, brow pulled down over it; arms as at rest
5. A very slow blink: the great eye closed, the face calm; arms as at rest
6. Sniffing at the air: nose lifted, nostrils flared, the eye half closed; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No sheep, no rocks, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Polyphemus the Cyclops, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height and width, same sheepskin and club.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, a giant behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart), and the club stays leaning by his right elbow unless the pose says otherwise.

1. Tilting his head to one side, listening, the eye turned up; arms as at rest
2. Thumping the table: his right fist raised a little and coming down on the felt
3. Shifting his weight: both hands gripping the table's rim, shoulders hunched, the table creaking under him
4. Counting on the thick fingers of his right hand, held up in front of his chest, the eye on them
5. Scratching his beard with the broad thumbnail of his right hand
6. His right hand resting on the head of the club, fingers round it

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No sheep, no rocks, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Polyphemus the Cyclops, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height and width, same sheepskin and club.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, a giant behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart), and the club stays leaning by his right elbow unless the pose says otherwise.

1. Talking: his right hand raised, one huge finger pointing across the table at someone
2. Facing a big bet: the great eye wide open, suspicious, brow raised; arms as at rest
3. Lost a pot: a scowl, teeth bared in a growl; arms as at rest
4. Won a pot: a huge gap-toothed grin, the eye crinkled; arms as at rest
5. Down to two players: leaning in over the table on both fists, the eye fixed and huge
6. Knocked out: his right hand lifting the club off the table's edge to carry it away, turning to go

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No sheep, no rocks, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Cyclops's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with its neck and the top of the sheepskin, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His ONE great eye, with the burn scar and the skin round it: half closed; closed; looking toward the viewer; looking down at the table; looking up and away; narrowed to a slit; wide open (one piece each)
- His one heavy brow: raised; pulled down hard (one piece each)
- Lower-face patches, each the mouth with the moustache and the beard around it, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a growl, teeth bared; a huge gap-toothed grin; a sniff, nostrils flared, lips pressed
- His head with the nose lifted, sniffing the air
- His head turned toward the viewer, nearly front-on
```
