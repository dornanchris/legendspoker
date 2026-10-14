# The Stranger (default online avatar): every pose, and the prompts

The default avatar for ONLINE play, which is not built or designed yet: this is only its look, so the art exists when it is. Drawn like the cast (three-quarter, facing the viewer's right, mirrored as the seat needs) so it can sit in any chair, plus a round portrait for a nameplate. The two concept mock-ups (a faceless figure in a hat) are the reference for the idea, not the style: it is drawn in the presidents' flat cartoon style like everyone else.

**It stands for any player, so nothing about it says man or woman:** a wide-brimmed hat, a long coat with the collar up, a scarf, gloves, and a smooth shadow where the face would be (the mock-ups' suit and tie are left out on purpose).

**Non-negotiable #3 governs everything it does.** In multiplayer an avatar's movements must have ZERO correlation with the player's cards, so it has no tells: sheet A is the poker actions (they show what the player did, which everyone saw anyway), and sheet B's last three poses are a COSMETIC loop played at random, tagged LOOP rather than IDLE or TELL, deliberately unlike any character's tell so nobody tries to read them. No face sheet: there is no face.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, gloved hands apart | IDLE |
| A2 | Peeking at the cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: sets a stack down | MECH |
| A6 | Fold: lays the cards down | MECH |
| B1 | All in: both hands push the whole stack | MECH |
| B2 | Show: turns the cards over | MECH |
| B3 | Collect: both arms drawing the pot in | MECH |
| B4 | Tips the brim of the hat (cosmetic) | LOOP |
| B5 | Settles the scarf at the collar (cosmetic) | LOOP |
| B6 | Leans back, settling into the chair (cosmetic) | LOOP |

## Prompts

One fresh ChatGPT chat for all three. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach the Stranger's own character sheet, its pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: the Stranger, a mysterious card player who stands for ANY player at the table. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No armour, no gauntlets, no surcoat, no hair showing. Take the STYLE from the SECOND attached image.

The Stranger: a figure of no particular age, build or gender, upright and calm; a wide-brimmed dark charcoal hat with a deep teal band; a long charcoal-grey coat with the collar turned up high; a deep teal scarf wrapped at the throat; dark grey gloves. Under the hat brim there is NO face at all: only a smooth, soft, dark shadow, with no eyes, no nose and no mouth. Mysterious but friendly, never sinister; nothing that says man or woman: no tie, no suit, no jewellery, no visible hair.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each the hat over the faceless shadow, with the turned-up collar and the scarf: level; tilted down toward the table; tilted up; one hand's fingers at the hat brim, tipping it
- The torso in the coat and scarf: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the coat sleeves with the gloves, lying on a table, pointing toward its centre, open at the elbow end
- The hat on its own
- A round portrait for a nameplate: the head and shoulders inside a circle, facing the viewer's right
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, gloved hands apart: level; looking down at two cards; tipping the hat brim; leaning back, settled

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: The Stranger, exactly as on the attached character sheet (a figure of no particular age or gender in a wide-brimmed dark hat and a long charcoal coat with the collar turned up, a deep teal scarf, dark gloves, and under the hat brim no face at all: only a smooth, soft shadow, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between them and the cell's edges, the crown of the hat included: nothing of them is cut off. Nothing below the table edge. No chair: nothing at all behind them, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The face is always a smooth shadow under the hat brim: no eyes, no nose, no mouth, in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, the gloved hands resting on the felt in front, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; head level
2. Peeking at the cards: the right hand cupped over two cards on the felt, thumb lifting the near corner, head tilted down
3. Checking: two fingers of the right hand tapping the felt
4. Calling: the right hand sliding a short stack of chips forward
5. Betting: the right hand setting a stack of chips down well forward
6. Folding: the right hand laying two cards down face down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No face, no eyes, no tie, no suit, nothing that says man or woman, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: The Stranger, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same hat, faceless shadow, coat, scarf and gloves.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind them, nothing of them cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The face is always a smooth shadow under the hat brim: no eyes, no nose, no mouth, in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing the whole stack of chips forward
2. Showing: the right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, drawing a pile of chips in
4. Tipping the brim of the hat with two fingers of the right hand, a friendly greeting
5. Settling the scarf at the collar with the right hand
6. Leaning back a little, settling into the seat, hands sliding back to the table's edge

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No face, no eyes, no tie, no suit, nothing that says man or woman, no chair.
```
