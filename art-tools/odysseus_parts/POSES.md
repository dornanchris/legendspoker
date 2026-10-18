# Odysseus: every pose, and the prompts

The Athens table's champion, and its late arrival: about ten hands after the
first player leaves, he comes in from the street, soaking wet and
apologising, and takes the empty chair. That chair can be any of the four,
so he is drawn facing the viewer's right like everyone, and the game mirrors
him when the chair is on the right. Built the way the rest of Athens is
(`art-tools/pose_rig.py`).

The look, from his character file: a head shorter than the kings round him
but broader in the chest and shoulders (Homer says so); a sea-stained cloak;
the conical felt sailor's cap (the pilos) of Greek vase painting; a
weathered face, a grizzled curly beard, amused eyes always doing sums. His
tell surface is his hands, so the heavy gold ring on his right hand is drawn
big enough to catch the light. He is drawn dry, the sea stains on the cloak
being old ones; the arrival pose (D5) is the one where he drips.

Ruled out: every screen Odysseus (Kirk Douglas's Ulysses, Nolan's The
Odyssey, O Brother, Where Art Thou?, EPIC: The Musical). Build from Greek
vase painting (the pilos, the Sirens vase).

The first prompt borrows the Cyclops's character sheet for its LAYOUT AND
STYLE ONLY. Keep the two apart: the prompts ban the Cyclops's look by name,
and nothing of their story is drawn (no eye, no sheep, no club).

Tags (MOTION-SPEC.md): MECH a poker action, IDLE noise, BEAT a mood, TELL
one of his three tells, each drawn beside the idle it hides among: twisting
the ring on his finger (bluffing) beside rubbing his thumb over the ring's
face, admiring it; looking toward the door as if it led home (weak) beside
counting the exits, eyes going round the room; leaning back, satisfied
(strong) beside stretching his back.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands resting apart, the ring on his right hand | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt (right hand) | MECH |
| A4 | Call: slides a short stack forward (right hand) | MECH |
| A5 | Bet: sets a taller stack down well forward | MECH |
| A6 | Fold: slides his cards away (right hand) | MECH |
| B1 | All in: both hands push his whole stack | MECH |
| B2 | Show: turns his cards over (right hand) | MECH |
| B3 | Collect the pot: both forearms out, drawing it in | MECH |
| B4 | Twists the ring on his right hand with his left | TELL |
| B5 | Rubs his thumb over the ring's face, admiring it (decoy for B4) | IDLE |
| B6 | Looks toward the door, as if it led home | TELL |
| C1 | Counts the exits, eyes going round the room (decoy for B6) | IDLE |
| C2 | Leans back, satisfied, hands laced on his chest | TELL |
| C3 | Stretches his back, arms up a little (decoy for C2) | IDLE |
| C4 | Wrings sea water from the hem of his cloak | IDLE |
| C5 | Rubs an old scar on his thigh, below the table (shoulder dipped) | IDLE |
| C6 | Smiles at no one in particular | IDLE |
| D1 | Talking: one hand open, spinning a story | BEAT |
| D2 | Facing a big bet: brows up, doing sums | BEAT |
| D3 | Lost a pot: a rueful smile, one hand raised: "fair" | BEAT |
| D4 | Won a pot: a sly grin, a wink | BEAT |
| D5 | Arrival: soaking wet, dripping, one hand raised in apology | BEAT |
| D6 | Knocked out: rises, setting his cap straight, ready for the road home | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches the Cyclops's
character sheet (`art-tools/cyclops_parts/sources/cyclops_sheet.png`) and
nothing else, for its layout and style only. From the second prompt on,
attach Odysseus's own character sheet and, once it exists, his pose sheet A,
and nothing of anyone else's.

### Character sheet

```
Character sheet for 2D animation rigging: Odysseus, king of Ithaca, from Homer's Odyssey. Copy ONLY the LAYOUT and the flat cartoon STYLE of the attached sheet (bold dark outlines, clean painted shading, warm light, the same line weight): take NOTHING of its character. No single eye, no sheepskin, no club, no giant's build, no gap teeth.

Odysseus: a man in his fifties, shorter than a king should be but broad in the chest and shoulders, sturdy as a mast; a weathered, sun-browned face, a short grizzled curly beard and curly grey-brown hair under a conical felt sailor's cap (a pilos, plain brown felt, rounded point); amused, clever eyes that are always doing sums; a slight knowing smile. A plain off-white wool tunic and a deep blue-grey sailor's cloak pinned at one shoulder, its hem stained pale with old salt; bare, strong forearms. On the middle finger of his RIGHT hand a heavy gold ring with a broad flat face, drawn big enough to catch the light. Weathered and wry, never a film hero. Nothing from any film, TV series or musical.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with its neck, the cap and the top of the cloak: neutral, amused; talking, mouth open mid-word; a sly grin; looking away toward a door, wistful
- The torso in tunic and cloak: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two bare forearms lying on a table, pointing toward its centre, open at the elbow end, the ring on the right hand
- The ring on its own, large
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; twisting the ring; leaning back, satisfied; looking toward a door
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Odysseus, exactly as on the attached character sheet (grizzled curly beard, the conical felt cap, the off-white tunic, the blue-grey cloak with salt stains, the heavy gold ring on his right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, cap included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The cap stays on his head and the ring on his right hand in every pose.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the gold ring clear on his right hand; a faint amused look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right fingertips setting a taller stack of chips down well forward, leaning in a little
6. Folding: his right hand sliding two cards away face down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No bow, no sword, no ship, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Odysseus, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same cap, cloak and ring.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart).

1. All in: both hands pushing his whole stack of chips forward, leaning over the table, a calm half-smile
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, hands cupped, drawing a pile of chips in
4. Twisting the gold ring on his right hand with the fingers of his left, hands together in front of him on the table, eyes on the table
5. Rubbing his thumb over the face of the ring, his right hand raised a little, admiring it
6. Looking away toward a door, wistful, as if it led home; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No bow, no sword, no ship, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Odysseus, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same cap, cloak and ring.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).

1. Counting the exits: eyes sliding round the room, head turned a little, face calm; arms as at rest
2. Leaning back from the table, satisfied, his hands laced on his chest
3. Stretching his back, both arms raised a little, eyes half closed
4. Wringing sea water from the hem of his cloak with both hands, held up above the table edge, a few drops falling
5. One shoulder dipped, his right hand down below the table edge, rubbing an old scar on his thigh (the hand itself hidden below the edge)
6. Smiling at no one in particular, a small private smile; arms as at rest

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No bow, no sword, no ship, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Odysseus, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same cap, cloak and ring.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).

1. Talking: his right hand raised and open, spinning a story, eyebrows lifted
2. Facing a big bet: brows up, eyes narrowed a little, doing sums; arms as at rest
3. Lost a pot: a rueful smile, his right hand raised, palm out: "fair enough"
4. Won a pot: a sly grin and a wink; arms as at rest
5. Just arrived: soaking wet, hair and beard dripping, the cloak dark with water, one hand raised in apology, a sheepish smile
6. Knocked out: rising from his seat, setting his cap straight with his right hand, ready for the road home

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No bow, no sword, no ship, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Odysseus's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with its neck, the cap and the top of the cloak, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking away to the side; winking (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn together (one piece each, both brows)
- Lower-face patches, each the mouth with the moustache and the beard around it, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a sly grin; a rueful smile; a small private smile
- His head turned away toward a door, wistful
- His head turned toward the viewer, nearly front-on
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of his stack plays the big win, and losing one the crushing loss. Pose 1
is his rest pose again, only to measure the sheet by. Attach
`art-tools/odysseus_parts/sources/poses_a.png` FIRST, then
`art-tools/odysseus_parts/sources/odysseus_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: Odysseus, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same cap, cloak and ring.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind him, no chair, nothing of him cut off by the edge of the picture (raised hands included). Nothing below the table edge. In every pose the ring stays on his right hand.

1. EXACTLY his at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both arms spread wide, palms up, chin raised, a broad triumphant grin: the hero home at last
3. A crushing loss: his head in both hands, elbows on the table, fingers in his hair, eyes shut

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No bow, no ship, no horse, no chair.
```
