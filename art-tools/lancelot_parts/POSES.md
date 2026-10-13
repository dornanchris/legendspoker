# Sir Lancelot: every pose, and the prompts

Camelot's seat 2 (on the player's left, beside Death), so he is drawn facing the viewer's right and is never mirrored. Built the way the Pirate Cove's cast and Merlin were (`art-tools/pose_rig.py`): a rest pose with a talking face, every other pose one of these drawings shown whole.

His look, from his character file: the handsomest man at the table and dressed for it: polished plate at the shoulders, a bright surcoat (white with three red bends, his arms in the romances), a fall of dark hair he keeps tossing back; a fine-boned, proud face, faintly bored until someone challenges him. His tell surface is his RIGHT gauntlet, polished steel big enough at a fifth of the screen to be seen being buffed with a cloth.

**The style lock.** From Lancelot on, every first prompt attaches two images: Silver's character sheet for the LAYOUT, and Washington's pose sheet A for the STYLE, with a paragraph saying what that style is. Each character used to borrow the last one's sheet, and the style drifted toward detailed illustration (Davy Jones, Merlin). Every pose sheet and the face sheet repeat the style in a line.

Ruled out (his character file): T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, First Knight (1995) and the BBC's Merlin. Guinevere is never drawn; his glance toward the door and the empty chair are as far as the art goes.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: polishing his right gauntlet with a cloth (strong) beside admiring his reflection in his breastplate; tossing his hair back (bluffing) beside sighing, for no clear reason; glancing toward the door (weak) beside looking toward an empty chair. 'Adjusts his sword belt' is C4, the hilt at his side showing above the table's edge.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, gauntleted hands apart | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: slides a short stack forward | MECH |
| A5 | Bet: pushes a tall stack forward with a flourish | MECH |
| A6 | Fold: flicks his cards away, disdainful | MECH |
| B1 | All in: both hands drive his stack forward, a charge | MECH |
| B2 | Show: turns his cards over | MECH |
| B3 | Collect: both arms sweeping the pot in | MECH |
| B4 | Polishes his right gauntlet with a cloth | TELL |
| B5 | Admires his reflection in his breastplate (decoy for B4) | IDLE |
| B6 | Tosses his hair back with a flick of the head | TELL |
| C1 | Sighs, for no clear reason, eyes to the ceiling (decoy for B6) | IDLE |
| C2 | Glances toward the door, over his shoulder | TELL |
| C3 | Looks toward an empty chair across the hall (decoy for C2) | IDLE |
| C4 | Adjusts the sword hilt at his side | IDLE |
| C5 | Leans back, arms folded, faintly bored | IDLE |
| C6 | A small proud smile, chin raised | IDLE |
| D1 | Talking: one gauntleted hand raised, declaiming | BEAT |
| D2 | Facing a big bet: eyes narrowed, a challenge accepted | BEAT |
| D3 | Lost a pot: wounded pride, jaw set, looking away | BEAT |
| D4 | Won a pot: a dazzling smile, sweeping the chips in | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes blazing | BEAT |
| D6 | Knocked out: rises, a stiff bow, and turns away | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Silver's character sheet (`art-tools/silver_parts/sources/silver_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Lancelot's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again (the style reference), and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Sir Lancelot du Lac, the best knight of the Round Table, from Chrétien de Troyes (c. 1180) and Malory (1485). Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No apron, no parrot, no crutch, no sailor's coat. Take the STYLE from the SECOND attached image.

Lancelot: a young knight, tall and very handsome; a fine-boned, clean-shaven face, proud and faintly bored, with a strong jaw and bright eyes; a fall of thick, dark wavy hair to his jaw; polished steel plate armour at the shoulders and chest (pauldrons and a breastplate, bright and simple); over it a white surcoat with three bold red diagonal stripes; polished steel gauntlets on both hands, big and shiny. No helmet. Gallant, vain, splendid; never a film knight. Nothing from the musical Camelot, the film First Knight, the BBC's Merlin or T. H. White.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with its neck and the top of the armour and surcoat: neutral, faintly bored; talking, mouth open mid-word; a dazzling smile; tossing his hair back
- The torso in armour and surcoat: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in steel with the gauntlets, lying on a table, pointing toward its centre, open at the elbow end
- The right gauntlet on its own, large, with a small polishing cloth
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, gauntleted hands apart: neutral; polishing his right gauntlet with a cloth; tossing his hair back; glancing toward a door over his shoulder

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Sir Lancelot, exactly as on the attached character sheet (young, tall and very handsome, a fine-boned clean-shaven face, a fall of dark wavy hair to his jaw, polished steel plate at the shoulders, a white surcoat with three red diagonal stripes, polished steel gauntlets, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, his hair included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. Both steel gauntlets stay on his hands in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his gauntleted hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; proud, faintly bored, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: his right hand pushing a tall stack of chips well forward with a flourish
6. Folding: his right hand flicking two cards away face down, disdainful

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no lance, no sword drawn, no horse, no crown, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Sir Lancelot, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same armour, surcoat, gauntlets and hair.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Both steel gauntlets stay on his hands in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands driving his whole stack of chips forward, leaning in like a charge
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both forearms out on the felt, sweeping a pile of chips in
4. Polishing the back of his right gauntlet with a small cloth held in his left hand, both hands raised a little above the table, admiring the shine
5. Admiring his reflection in his breastplate, chin tucked, looking down at his chest, pleased; arms as at rest
6. Tossing his hair back with a flick of the head, eyes half closed; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no lance, no sword drawn, no horse, no crown, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Sir Lancelot, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same armour, surcoat, gauntlets and hair.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Both steel gauntlets stay on his hands in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Sighing, for no clear reason, eyes rolled up to the ceiling, shoulders lifted a little; arms as at rest
2. Glancing toward a door over his left shoulder, head turned away from the table; arms as at rest
3. Looking across the hall toward an empty chair, a little wistful; arms as at rest
4. Adjusting the hilt of his sword at his left side with his right hand, the pommel just showing above the table edge
5. Leaning back from the table, arms folded across his breastplate, faintly bored
6. A small proud smile, chin raised; arms as at rest

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no lance, no sword drawn, no horse, no crown, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Sir Lancelot, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same armour, surcoat, gauntlets and hair.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Both steel gauntlets stay on his hands in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right gauntleted hand raised, declaiming
2. Facing a big bet: eyes narrowed, a challenge accepted, a thin smile; arms as at rest
3. Lost a pot: wounded pride, jaw set, looking away; arms as at rest
4. Won a pot: a dazzling smile, his right hand sweeping a few chips toward him
5. Down to two players: leaning in on both forearms, eyes blazing
6. Knocked out: rising from his seat, a stiff, proud bow of the head, turning away

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No helmet, no lance, no sword drawn, no horse, no crown, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Sir Lancelot's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with its neck, the hair and the top of the armour, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side, toward a door; narrowed (one piece each, both eyes with the skin around them)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the chin and jaw around it, clean-shaven, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a sigh, lips parted; a dazzling smile; a thin proud smile; jaw set, wounded
- His head turned toward the viewer, nearly front-on Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
