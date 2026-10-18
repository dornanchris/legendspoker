# Loki: every pose, and the prompts

The uninvited guest (hidden event; see CLAUDE.md, spoilers): when someone at the table says the words, Death shows them out and Loki sits in that chair behind the same chips, at any table but the finale, so in ANY chair. Drawn facing the viewer's right and MIRRORED by the game for the other side. Built the way the Pirate Cove and Camelot casts are (`art-tools/pose_rig.py`), style-locked to the presidents' cartoon (he is met mostly at the early tables).

His look, from his character file and the Eddas: lean and restless, sharp-featured and handsome, bare-headed, fair hair loose; plain Norse dress in ash-grey, rust and smoke. The mouth is his tell surface: pale old stitch-scars across both lips (Brokkr's awl), and a smile that uses only half of them. His prop: a small golden game piece from the gods' own board.

Ruled out (his character file): ANYTHING of Marvel's Loki: no green-and-gold, no curved horned helmet, no slicked-back black hair, no actor's likeness. Nor Wagner's Loge.

Tags (MOTION-SPEC.md): his three tells, each beside what hides it: touching the stitch-scars (bluffing) beside rubbing his chin with a knuckle; the half smile (strong; face sheet) beside a full, easy smile; his eyes a different colour for a moment (weak; face sheet, amber, never green-gold) beside glancing up at the ceiling. C6 is his `arrive` clip, played as he takes the chair. B3 and D4 are the big win and the crushing loss. His hands are empty of cards and chips in every pose (the game moves them); knocked out, he says his line and fades from the chair.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the golden game piece by his right hand | IDLE |
| A2 | Peek: right hand cupped low over the felt, thumb lifting | MECH |
| A3 | Check: two fingers tap the felt | MECH |
| A4 | Call: right hand pushes forward along the felt | MECH |
| A5 | Bet: leans in, right hand pushed well forward | MECH |
| A6 | Fold: a careless flick of the right hand | MECH |
| B1 | All in: both hands push forward together, a sly grin | MECH |
| B2 | Show: right hand turns palm up, as if turning cards over | MECH |
| B3 | Big win: both hands raised high, laughing (`win_big`) | BEAT |
| B4 | Fingertips touching the stitch-scars on his lips | TELL |
| B5 | Rubs his chin with a knuckle (decoy for B4) | IDLE |
| B6 | Rolls a coin-sized scale across his knuckles | IDLE |
| C1 | Counts the players with one finger | IDLE |
| C2 | Glances up at the ceiling, listening (decoy for the eyes) | IDLE |
| C3 | Hums, eyes half closed, head tilted | IDLE |
| C4 | Turns the golden game piece over in his fingers | IDLE |
| C5 | A full, easy smile (decoy for the half smile) | IDLE |
| C6 | Arrive: just taking the chair, looking round, amused | BEAT |
| D1 | Talking: one hand turning in the air | BEAT |
| D2 | Facing a big bet: chin on his hand, considering | BEAT |
| D3 | Lost a pot: a shrug, palms up | BEAT |
| D4 | Crushing loss: sits back, jaw tight, staring at the table (`lose_big`) | BEAT |
| D5 | Heads up: leaning in on both forearms, eyes level | BEAT |
| D6 | Laughing, head back a little | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach Loki's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Loki, the trickster of the old Norse myths as the Eddas tell of him. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No armour, no gauntlets, no surcoat. Take the STYLE from the SECOND attached image.

Loki: a lean, restless man who looks about thirty-five, sharp-featured and handsome, with a knowing look; bare-headed, fair hair worn loose to the jaw; clean-shaven; across BOTH lips a row of pale, old, healed stitch-scars, small and neat, like a seam that was sewn shut long ago. Plain Norse clothes: a long-sleeved wool tunic in ash-grey with a narrow rust-red woven trim at the neck and cuffs, a short smoke-grey cloak pinned at his right shoulder with a plain bronze ring brooch. His prop: a small golden game piece, a little gold peg with a rounded head, about the size of a thumb. NO helmet, NO horns, NO crown, NOTHING green or gold in his clothes, NOT slicked-back black hair: nothing of any film or comic version of him. Not a likeness of any actor.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck and the neck of the tunic, the stitch-scars on his lips in every one: neutral, mouth closed; talking, mouth open mid-word; a smile with only the left half of his mouth; a full, easy smile
- The torso in the tunic and cloak: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the grey sleeves with the rust trim at the cuff, lying on a table, pointing toward its centre, open at the elbow end
- The golden game piece on its own
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the golden game piece on the felt beside his right hand (the left of the picture): neutral; fingertips touching the scars on his lips; turning the game piece over in his fingers; glancing up at the ceiling

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Loki, exactly as on the attached character sheet (a lean, restless, sharp-featured, handsome man, bare-headed, fair hair worn loose to the jaw, a row of pale old stitch-scars across both lips, a wool tunic in ash-grey with rust-red trim, a short smoke-grey cloak pinned at his right shoulder with a plain bronze ring brooch, and a small golden game piece on the felt beside his right hand, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his hair included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The golden game piece sits on the felt beside his right hand (the left of the picture) unless the pose says otherwise. The pale stitch-scars across his lips show in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the golden game piece on the felt beside his right hand; mouth closed, a knowing look
2. Peeking at his cards: his right hand cupped low over the felt in front of him, thumb lifted a little, as if shielding something small; eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand flat, fingertips leading, pushing forward along the felt
5. Betting: leaning in, his right hand pushed well forward along the felt, a sly look
6. Folding: a careless flick of his right hand toward the middle of the table, fingers spread

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. NO helmet, NO horns, NO crown, NO green or gold clothing, no chair, nothing in his mouth.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Loki, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, loose fair hair, the stitch-scars on his lips, grey tunic, cloak and brooch, and the golden game piece.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The golden game piece sits on the felt beside his right hand (the left of the picture) unless the pose says otherwise. The pale stitch-scars across his lips show in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both hands pushing forward along the felt together, a sly grin
2. Showing: his right hand turning palm up from the felt, as if turning something over
3. A big win: both hands raised high above his head, laughing, head back
4. The fingertips of his right hand touching the stitch-scars on his lips, thoughtful; his left as at rest
5. Rubbing his chin with the knuckle of his right forefinger, thoughtful; his left as at rest
6. Rolling a small shining coin-sized fish scale across the knuckles of his right hand

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. NO helmet, NO horns, NO crown, NO green or gold clothing, no chair, nothing in his mouth.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Loki, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, loose fair hair, the stitch-scars on his lips, grey tunic, cloak and brooch, and the golden game piece.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The golden game piece sits on the felt beside his right hand (the left of the picture) unless the pose says otherwise. The pale stitch-scars across his lips show in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Counting the players round the table: his right forefinger raised, pointing from one to the next, his lips moving
2. Glancing up at the ceiling as if someone up there were listening, arms as at rest
3. Humming to himself, eyes half closed, head tilted a little, arms as at rest
4. Turning the small golden game piece over in the fingers of his right hand, studying it
5. A full, easy, charming smile at the table, arms as at rest
6. Just taking his seat at the table, his right hand on the table's edge, his cloak settling, looking round, amused

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. NO helmet, NO horns, NO crown, NO green or gold clothing, no chair, nothing in his mouth.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Loki, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face, loose fair hair, the stitch-scars on his lips, grey tunic, cloak and brooch, and the golden game piece.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The golden game piece sits on the felt beside his right hand (the left of the picture) unless the pose says otherwise. The pale stitch-scars across his lips show in every pose. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right hand turning in the air, palm up, mid-word
2. Facing a big bet: his chin resting on his right hand, considering
3. Lost a pot: a light shrug, both palms turned up a little on the felt
4. A crushing loss: sitting back, jaw tight, staring hard at the table, both hands flat on its edge
5. Down to two players: leaning in on both forearms, eyes level
6. Laughing, head back a little, one hand flat on the felt

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. NO helmet, NO horns, NO crown, NO green or gold clothing, no chair, nothing in his mouth.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Loki's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the neck and the neck of the tunic, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking up; narrowed, considering (one piece each, both eyes with the skin around them)
- His eyes for a moment a DIFFERENT colour: both irises a bright, unnatural amber, like firelight, the same eyes and lids as at rest (one piece)
- His brows raised; his brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it (he is clean-shaven), cut straight across just under the nose and again a little below the lower lip, the pale stitch-scars across both lips in EVERY one: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a smile with only the LEFT half of his mouth (the right half stays still); a full, easy smile; humming, lips closed and rounded; a laugh, mouth open
- His head turned toward the viewer, nearly front-on

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
