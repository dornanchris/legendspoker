# Medusa: every pose, and the prompts

The Athens table's seat 3, on the player's right: drawn facing the viewer's
right like everyone, and MIRRORED in the game to face the table's centre.
Built the way Socrates, Leonidas and the Cyclops are (`art-tools/pose_rig.py`).

Her tell surface is her hair: a head of living snakes, the one moving crown
at the table, readable at any size. Two of her three tells are the snakes
(still: strong; coiling and hissing: weak), so the face sheet draws the
WHOLE HEAD in each snake state, and the pose sheets draw them too; the third
is her gaze lowered to the table (bluffing). Her eyes are drawn as ordinary
eyes: calm, heavy-lidded, a young woman's face. No glow, no stone, no
glare: that is the unsettling choice her character file makes.

She is written with sympathy (punished for what was done to her): calm,
patient, dignified, never a monster and never glamorised. A plain Greek
dress (a sea-green chiton with a darker himation over one shoulder); her
arms bare from the elbow. No prop on the table: her hands are free.

Ruled out (her file, ASSETS.md): Harryhausen's Medusa from Clash of the
Titans (serpent body, rattle tail, bow) and its remake, and Percy Jackson's
(sunglasses, garden statues). She has legs and sits like everyone else.

Tags (MOTION-SPEC.md): MECH a poker action, IDLE noise, BEAT a mood, TELL
one of her three tells, each drawn beside the idle it hides among: the
snakes all still (strong) beside the snakes drowsing, heads drooped; the
snakes coiling and hissing (weak) beside two snakes knotting themselves
together; her gaze lowered to the table (bluffing) beside tucking a snake
behind her ear, eyes down.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands resting apart, the snakes gently astir | IDLE |
| A2 | Peeking at her cards (right hand) | MECH |
| A3 | Check: two fingertips tap the felt (right hand) | MECH |
| A4 | Call: slides a short stack forward (right hand) | MECH |
| A5 | Bet: sets a taller stack down well forward | MECH |
| A6 | Fold: slides her cards away (right hand) | MECH |
| B1 | All in: both hands push her whole stack | MECH |
| B2 | Show: turns her cards over (right hand) | MECH |
| B3 | Collect the pot: both forearms out, drawing it in | MECH |
| B4 | Every snake still, heads raised, all looking the same way | TELL |
| B5 | The snakes drowsing, heads drooped on her shoulders (decoy for B4) | IDLE |
| B6 | The snakes coiling and hissing, mouths open | TELL |
| C1 | Two snakes knotting themselves together (decoy for B6) | IDLE |
| C2 | Lowers her gaze to the table, lids heavy | TELL |
| C3 | Tucks a snake behind her ear, eyes down (decoy for C2) | IDLE |
| C4 | One snake tastes the air, tongue out, near her cheek | IDLE |
| C5 | One snake nips another; she glances up at them | IDLE |
| C6 | Rests her chin on one hand, watching the table | IDLE |
| D1 | Talking: one hand turned up, a quiet point | BEAT |
| D2 | Facing a big bet: a slow, level look, the snakes rising | BEAT |
| D3 | Lost a pot: a small tired breath, the snakes sagging | BEAT |
| D4 | Won a pot: a faint smile, the snakes swaying | BEAT |
| D5 | Heads up: leaning in on both forearms, the snakes all forward | BEAT |
| D6 | Knocked out: rises a little, drawing her himation round her, the snakes settling | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches the Cyclops's
character sheet (`art-tools/cyclops_parts/sources/cyclops_sheet.png`) and
nothing else, for its layout and style only. From the second prompt on,
attach Medusa's own character sheet and, once it exists, her pose sheet A,
and nothing of anyone else's.

### Character sheet

```
Character sheet for 2D animation rigging: Medusa, from Greek myth. Copy ONLY the LAYOUT and the flat cartoon STYLE of the attached sheet (bold dark outlines, clean painted shading, warm light, the same line weight): take NOTHING of its character. No beard, no sheepskin, no club, no giant's build, no single eye.

Medusa: a young woman of ordinary size, slim, calm and dignified, a pale olive complexion, a heavy-lidded, patient face; her eyes drawn as perfectly ordinary eyes, dark and calm, NO glow, NO glare. Instead of hair, a full head of living snakes, about a dozen, slim and green with paler bellies and a few darker bands, each a separate snake with its own small head, rising from her scalp and falling to her shoulders: a moving crown, clearly shaped against the background. A plain Greek dress: a sea-green chiton pinned at both shoulders, arms bare, a darker blue-green himation over one shoulder, a thin gold band at her brow among the snakes. Calm and sympathetic, never a monster, never glamorised. NO serpent body, NO tail, NO bow, NO sunglasses, NO statues.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with its neck and the top of the dress: neutral, the snakes gently astir; talking, mouth open mid-word; every snake still and raised, all looking the same way; the snakes coiling and hissing, mouths open
- The torso in the dress: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two bare forearms lying on a table, pointing toward its centre, open at the elbow end
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; the snakes still; the snakes hissing; her gaze lowered to the table
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Medusa, exactly as on the attached character sheet (calm young woman's face with ordinary dark eyes, the head of living green snakes, the sea-green chiton, the blue-green himation over one shoulder, the gold band at her brow, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between her and the cell's edges, snakes included: nothing of her is cut off. Nothing below the table edge. No chair: nothing at all behind her, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The snakes keep the same shape as in pose 1 unless the pose says otherwise.

1. At rest: both forearms lying along the table's edge, her hands resting on the felt in front of her, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the snakes gently astir; a calm face, mouth closed
2. Peeking at her cards: her right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingertips of her right hand tapping the felt
4. Calling: her right hand sliding a short stack of chips forward, palm behind it
5. Betting: her right fingertips setting a taller stack of chips down well forward, leaning in a little
6. Folding: her right hand sliding two cards away face down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No serpent body, no tail, no bow, no sunglasses, no statues, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Medusa, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same dress and snakes.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind her, nothing of her cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart).

1. All in: both hands pushing her whole stack of chips forward, leaning over the table, calm
2. Showing: her right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. Every snake perfectly still, heads raised, all looking the same way, toward the middle of the table; her face calm; arms as at rest
5. The snakes drowsing: heads drooped and resting on her shoulders, eyes closed; her face calm; arms as at rest
6. The snakes coiling and hissing: bodies coiled tight, mouths open, tongues out; her face calm; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No serpent body, no tail, no bow, no sunglasses, no statues, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Medusa, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same dress and snakes.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind her, nothing of her cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart), and the snakes keep their at-rest shape unless the pose says otherwise.

1. Two snakes knotting themselves together beside her face, playful; her face calm; arms as at rest
2. Lowering her gaze to the table, lids heavy, face still; arms as at rest
3. Tucking one snake behind her ear with her right hand, eyes down
4. One snake beside her cheek tasting the air, its forked tongue out; her face calm; arms as at rest
5. One snake nipping another; her eyes turned up toward them, unimpressed; arms as at rest
6. Resting her chin on her right hand, elbow on the table, watching the table

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No serpent body, no tail, no bow, no sunglasses, no statues, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Medusa, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same dress and snakes.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind her, nothing of her cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart), and the snakes keep their at-rest shape unless the pose says otherwise.

1. Talking: her right hand turned up, palm open, making a quiet point
2. Facing a big bet: a slow, level look across the table, the snakes rising a little; arms as at rest
3. Lost a pot: a small tired breath out, eyes half closed, the snakes sagging; arms as at rest
4. Won a pot: a faint smile, the snakes swaying; arms as at rest
5. Down to two players: leaning in over the table on both forearms, the snakes all leaning forward with her
6. Knocked out: rising a little from her seat, drawing her himation round her shoulders with both hands, the snakes settling

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No serpent body, no tail, no bow, no sunglasses, no statues, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Medusa's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of her head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with its neck, the top of the dress and the snakes at rest, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- Her eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking up and away; level and steady (one piece each, both eyes with the skin around them, ordinary dark eyes, no glow)
- Her brows raised; her brows drawn together (one piece each, both brows)
- Lower-face patches, each the mouth with the chin and jaw around it, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a faint smile; a small tired breath out
- Her whole head, snakes included, at the same size and angle, in three snake states: every snake still and raised, all looking the same way; the snakes coiling and hissing; the snakes drowsing, heads drooped
- Her head turned toward the viewer, nearly front-on, the snakes at rest
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of her stack plays the big win, and losing one the crushing loss. Pose 1
is her rest pose again, only to measure the sheet by. Attach
`art-tools/medusa_parts/sources/poses_a.png` FIRST, then
`art-tools/medusa_parts/sources/medusa_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: Medusa, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same dress and snakes.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind her, no chair, nothing of her cut off by the edge of the picture (raised hands included). Nothing below the table edge. In every pose her snakes are drawn as on the attached sheets, the same number and colours.

1. EXACTLY her at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both arms raised, palms open, head thrown back laughing, every snake rearing up and hissing in delight
3. A crushing loss: one hand pressed over her eyes, the snakes drooping limp around her face and shoulders, the other hand flat on the felt

No cards and no chips anywhere: her hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No stone statues, no mirror, no shield, no chair.
```
