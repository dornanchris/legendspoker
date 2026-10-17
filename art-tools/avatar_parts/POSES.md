# The Stranger (default online avatar): every pose, and the prompts

The default avatar for ONLINE play, which is not designed yet: drawn now so the art exists if online happens (the owner: "I would much rather have them and not need them"). Drawn like the cast (three-quarter, facing the viewer's right, mirrored as the seat needs) so it can sit in any chair, plus a round portrait for a nameplate, in the graphic-novel style of the later tables (the Astronaut's sheets are the style).

**It stands for any player, so nothing about it says man or woman:** a wide-brimmed hat, a long coat with the collar up, a scarf, gloves, and a smooth shadow where the face would be.

**Non-negotiable #3 governs everything it does.** In multiplayer an avatar's movements must have ZERO correlation with the player's cards, so it has NO tells. Sheet A is the poker actions and sheet B the public beats (all in, showing, a pot won or lost, heads up, talking): they show what everyone at the table already saw. Sheet C is a COSMETIC loop played at random, tagged LOOP, deliberately unlike any single-player character's tell or idle, so nobody tries to read it. Its hands are empty in every pose: the game moves the cards and chips.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, gloved hands apart | IDLE |
| A2 | Peeking at the cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: right hand pushes forward along the felt | MECH |
| A5 | Bet: leans in, right hand pushed well forward | MECH |
| A6 | Fold: a small push of the hand | MECH |
| B1 | All in: both hands push forward together | MECH |
| B2 | Show: right hand turns palm up | MECH |
| B3 | Big win: both fists raised (`win_big`) | BEAT |
| B4 | Crushing loss: hat brim pulled down, head bowed (`lose_big`) | BEAT |
| B5 | Heads up: leaning in on both forearms | BEAT |
| B6 | Talking: a hand raised, palm open | BEAT |
| C1 | Tips the brim of the hat | LOOP |
| C2 | Settles the scarf at the collar | LOOP |
| C3 | Leans back, settling in | LOOP |
| C4 | Turns the coat collar up | LOOP |
| C5 | Pulls a glove snug at the wrist | LOOP |
| C6 | Glances round the room | LOOP |

## Drawn

`sources/`: `stranger_sheet.png`, `poses_a.png`, `poses_b.png` (with
`poses_b_alt.png`, the other draw) and `poses_c.png`. The coat came out dark
brown, not charcoal: kept. The puppet is not built (online is not designed).

**Accent colours, the player's free choice** (the owner): the scarf, hat band
and glove cuffs are the one teal in the drawing (hue 175-202, clear of the
blue rim light at 210+ and the felt at 80-150), so `accent.py` swaps them by
hue and keeps the drawing's light and shadow. `accents.png` shows teal,
crimson, gold, violet, ivory and emerald.

## Prompts

One fresh ChatGPT chat for all four. The first prompt attaches THREE images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then the Astronaut's character sheet (`art-tools/astronaut_parts/sources/astronaut_sheet.png`) and his pose sheet A (`art-tools/astronaut_parts/sources/poses_a.png`) for the style. From the second prompt on, attach the Stranger's own character sheet, its pose sheet A once it exists, AND the Astronaut's pose sheet A, and nothing else. There is no face sheet: it has no face.

### Character sheet

```
Character sheet for 2D animation rigging: the Stranger, a mysterious card player who stands for ANY player at the table. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No armour, no gauntlets, no surcoat, no hair showing. Take the STYLE from the SECOND and THIRD attached images.

The Stranger: a figure of no particular age, build or gender, upright and calm; a wide-brimmed dark charcoal hat with a deep teal band; a long charcoal-grey coat with the collar turned up high; a deep teal scarf wrapped at the throat; dark grey gloves. Under the hat brim there is NO face at all: only a smooth, soft, dark shadow, with no eyes, no nose and no mouth. Mysterious but friendly, never sinister; nothing that says man or woman: no tie, no suit, no jewellery, no visible hair.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each the hat over the faceless shadow, with the turned-up collar and the scarf: level; tilted down toward the table; tilted up; turned toward the viewer
- The torso in the coat and scarf: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the coat sleeves with the gloves, lying on a table, pointing toward its centre, open at the elbow end
- The hat on its own
- A round portrait for a nameplate: the head and shoulders inside a circle, facing the viewer's right
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, gloved hands apart: level; looking down at the felt; tipping the hat brim; leaning back, settled

STYLE, the most important rule: match the SECOND and THIRD attached images (the Astronaut, a player from the game: his character sheet and his pose sheet) exactly: the same inked GRAPHIC-NOVEL style, halfway between a bright cartoon and a dark painted illustration. Take NOTHING of his character: no pressure suit, no helmet, no face. What makes that style, and this drawing must have all of it: a thick, dark, inked outline of even weight round every shape; flat cel shading in three or four HARD-EDGED tones, the shadows deep and covering a good part of each form; a little rough, dry-brush texture inside the shadows only; muted colour, never glossy. NO airbrush, NO soft gradients, NO smooth 3D rendering, NO glossy highlights. Big clear readable shapes and a silhouette that reads at a tiny size; grown-up proportions, never chibi, never cute. A neutral light that sits in any room: a soft warm key light and a cool rim light, laid in as flat bands of colour. NOT a children's cartoon, NOT toy-like, NOT photoreal, NOT a 3D render.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Stranger, exactly as on the attached character sheet (a figure of no particular age or gender in a wide-brimmed dark charcoal hat with a deep teal band and a long charcoal coat with the collar turned up, a deep teal scarf, dark grey gloves, and under the hat brim no face at all: only a smooth, soft shadow, colours, line weight, graphic-novel style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between it and the cell's edges, the crown and brim of its hat included: nothing of it is cut off. Nothing below the table edge. No chair: nothing at all behind it, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. Under the hat brim there is NO face in any pose: only a smooth, soft, dark shadow, no eyes, no nose, no mouth. Nothing about it says man or woman. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; muted colour; a soft warm key light and a cool rim light as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. At rest: both forearms lying along the table's edge, the gloved hands resting on the felt in front, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; head level
2. Peeking at the cards: the right hand cupped low over the felt in front, thumb lifted a little, as if shielding something small; head tilted down
3. Checking: two fingers of the right hand tapping the felt
4. Calling: the right hand flat, fingertips leading, pushing forward along the felt
5. Betting: leaning in, the right hand pushed well forward along the felt
6. Folding: a small push of the right hand toward the middle of the table, palm down

No cards and no chips anywhere: its gloved hands hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No face, no eyes, no hair, no tie, no jewellery, no chair, no cards, no chips.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Stranger, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same wide-brimmed dark hat over a faceless shadow, long charcoal coat with the collar up, deep teal scarf and dark gloves.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Under the hat brim there is NO face in any pose: only a smooth, soft, dark shadow, no eyes, no nose, no mouth. Nothing about it says man or woman. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; muted colour; a soft warm key light and a cool rim light as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. All in: both hands pushing forward along the felt together, leaning in
2. Showing: the right hand turning palm up from the felt, as if turning something over
3. A big win: both gloved fists raised above the shoulders, the hat tipped back a little
4. A crushing loss: the right hand pulling the hat brim down low over the shadow, head bowed, the left hand flat on the felt
5. Down to two players: leaning in on both forearms, head level, the hat brim toward the viewer
6. Talking: the right hand raised a little, palm open

No cards and no chips anywhere: its gloved hands hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No face, no eyes, no hair, no tie, no jewellery, no chair, no cards, no chips.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Stranger, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same wide-brimmed dark hat over a faceless shadow, long charcoal coat with the collar up, deep teal scarf and dark gloves.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Under the hat brim there is NO face in any pose: only a smooth, soft, dark shadow, no eyes, no nose, no mouth. Nothing about it says man or woman. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; muted colour; a soft warm key light and a cool rim light as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. Tipping the brim of the hat with two fingers of the right hand, a friendly greeting
2. Settling the scarf at the collar with the right hand
3. Leaning back a little, settling into the seat, hands sliding back to the table's edge
4. Turning the coat collar up a little higher with both hands
5. Pulling the left glove snug at the wrist with the right hand
6. Glancing round the room: head turned away toward the left of the picture; arms as at rest

No cards and no chips anywhere: its gloved hands hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No face, no eyes, no hair, no tie, no jewellery, no chair, no cards, no chips.
```
