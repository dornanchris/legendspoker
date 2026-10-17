# The Astronaut: every pose, and the prompts

The Station (table 8, a round lounge on a space station above the Earth), seat 4 (far right), drawn facing the viewer's right, MIRRORED by the game to face the table's centre. Built the way the Transylvania cast is (`art-tools/pose_rig.py`, a short `rig_spec.json`), in the same graphic-novel style: the Headless Horseman's approved sheet is the style image, lit by the station (a cool blue Earthlight rim light and warm lamps) instead of candles.

Her look, from her character file: the lost explorer, an archetype and not a person: a bulky, scuffed pressure suit of our own design, the round helmet off and on the felt beside her (it says astronaut at a glance), short practical hair, tired kind eyes, a grin she cannot quite hide, and an oxygen gauge on her wrist. No flags, no agency patches, no real insignia, nothing from any space film, no likeness of any real astronaut.

Tags (MOTION-SPEC.md): her tells beside idles that move the same part: grinning, then hiding it (strong) beside a yawn (a glove to the mouth both times); glancing out of the window at Earth (weak) beside touching the photograph in her sleeve (a look away, softened); checking the oxygen gauge on her wrist (bluffing) beside rubbing a scuff on her helmet (a hand busy at the suit). Floating a token off her palm is C4. B3 and D4 are the big win and the crushing loss; her hands are otherwise empty.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: gloves on the felt, apart, the helmet by her right hand | IDLE |
| A2 | Peeking at her cards (right glove) | MECH |
| A3 | Check: two gloved fingers tap the felt | MECH |
| A4 | Call: right glove pushes forward along the felt | MECH |
| A5 | Bet: leans in, right glove pushed well forward | MECH |
| A6 | Fold: a small resigned push | MECH |
| B1 | All in: both gloves push forward together | MECH |
| B2 | Show: right glove turns palm up | MECH |
| B3 | Big win: gloved fists in the air, a huge grin (`win_big`) | BEAT |
| B4 | Grins, then hides it | TELL |
| B5 | Yawns (decoy for B4) | IDLE |
| B6 | Glances out of the window at Earth | TELL |
| C1 | Touches a photograph tucked in her sleeve (decoy for B6) | IDLE |
| C2 | Checks the oxygen gauge on her wrist | TELL |
| C3 | Rubs a scuff on her helmet (decoy for C2) | IDLE |
| C4 | Floats a token an inch off her palm and catches it | IDLE |
| C5 | Turns to look at you, a kind smile | IDLE |
| C6 | Rolls her shoulders in the stiff suit (a fidget) | IDLE |
| D1 | Talking: a glove raised, palm open | BEAT |
| D2 | Facing a big bet: sitting back, eyebrows up | BEAT |
| D3 | Lost a pot: a rueful half smile | BEAT |
| D4 | Crushing loss: her forehead on her helmet (`lose_big`) | BEAT |
| D5 | Heads up: leaning in on both forearms | BEAT |
| D6 | A tired laugh | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then the Headless Horseman's approved character sheet (`art-tools/headless_horseman_parts/sources/headless_horseman_sheet.png`) for the style. From the second prompt on, attach her own character sheet, her pose sheet A once it exists, AND the Horseman's character sheet again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: the Astronaut, the lost explorer: an archetype, not a real person. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no surcoat, no long hair. Take the STYLE from the SECOND attached image.

The Astronaut: a woman in her late thirties, capable and worn out, with short, practical dark hair a little flattened from the helmet, tired kind eyes with shadows under them, a few freckles, and a grin she cannot quite hide. A bulky, scuffed pressure suit of our own design: off-white fabric, padded and creased, with faded orange panels on the shoulders and upper arms, a round metal neck ring where the helmet locks on, a few hoses and fittings at the chest, padded off-white gloves, and a small round oxygen gauge with a needle strapped to her left wrist. A small creased photograph tucked into the cuff of her right sleeve. Her helmet is off: a round helmet with a dark tinted visor, scuffed, standing on the table beside her. NO flags, NO patches, NO insignia, NO lettering or logos, nothing from any real space agency or any film; not a likeness of any real astronaut.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck and the metal neck ring: a tired, kind look; talking, mouth open mid-word; grinning; the grin half hidden behind a gloved hand
- The torso in the suit, the neck ring at the top: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the padded suit sleeves with gloves, the oxygen gauge on the left wrist, lying on a table, pointing toward its centre, open at the elbow end
- On its own: the round helmet with its dark tinted visor
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the helmet on the felt beside her right hand (the left of the picture): neutral; a grin half hidden behind her left glove; lifting her left wrist to read the oxygen gauge; glancing out of a window toward the right of the picture

STYLE, the most important rule: match the SECOND attached image (the Headless Horseman, from an earlier table) exactly: a GOTHIC GRAPHIC-NOVEL style for a grown-up card game, halfway between a bright cartoon and a dark painted illustration. Take NOTHING of his character: no armour, no pumpkin, no cloak. Keep what the game needs: a bold dark outline round every shape, big clear readable shapes, a silhouette that reads at a tiny size. Grown-up proportions, never chibi, never cute; shading in three or four tones with deep, dramatic shadows; the light of a space station: a cool blue rim light from the Earth in a great window on one side, soft warm lamplight on the other; rich but MUTED colour, nothing candy-bright; worn surfaces with soft highlights, a little texture in the shadows only. Quiet, strange and a little lonely. NOT a children's cartoon, NOT cute, NOT toy-like, NOT round and bouncy, NOT photoreal, NOT muddy or murky, NOT glossy chrome sci-fi.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Astronaut, exactly as on the attached character sheet (a woman in her late thirties, short practical dark hair, tired kind eyes, a few freckles; a bulky, scuffed off-white pressure suit with faded orange panels on the shoulders and upper arms, a round metal neck ring, padded off-white gloves, a small round oxygen gauge on her left wrist; her round helmet with its dark visor standing on the felt beside her right hand, colours, line weight, graphic-novel style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between her and the cell's edges, the top of her head included: nothing of her is cut off. Nothing below the table edge. No chair: nothing at all behind her, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. Her round helmet stands on the felt beside her right hand (the left of the picture) unless the pose says otherwise. The suit has NO flags, NO patches, NO insignia and NO lettering anywhere. Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.

1. At rest: both forearms lying along the table's edge, her gloved hands resting on the felt in front of her, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the round helmet on the felt beside her right hand; a tired, kind look, mouth closed
2. Peeking at her cards: her right glove cupped low over the felt in front of her, thumb lifted a little, as if shielding something small; eyes down
3. Checking: two gloved fingers of her right hand tapping the felt
4. Calling: her right glove flat, fingertips leading, pushing forward along the felt
5. Betting: leaning in, her right glove pushed well forward along the felt, hopeful
6. Folding: a small, resigned push of her right glove toward the middle of the table, palm down

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No flags, no patches, no insignia, no lettering, no logos, no chair, no cards, no chips.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Astronaut, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face and short dark hair, scuffed off-white pressure suit with faded orange panels, metal neck ring, padded gloves, wrist oxygen gauge and the round helmet on the felt.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind her, nothing of her cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Her round helmet stands on the felt beside her right hand (the left of the picture) unless the pose says otherwise. The suit has NO flags, NO patches, NO insignia and NO lettering anywhere. Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.

1. All in: both gloves pushing forward along the felt together, her jaw set
2. Showing: her right glove turning palm up from the felt, as if turning something over
3. A big win: both arms raised high, gloved fists in the air, a huge open grin, eyes shining
4. A big grin breaking out and being hidden: her left glove raised to her mouth, the grin showing at its edges; her right arm as at rest
5. Yawning: her left glove raised to her open mouth, eyes squeezed; her right arm as at rest
6. Glancing out of a window at the Earth: her head turned toward the right of the picture and up a little, a little homesick; arms as at rest

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No flags, no patches, no insignia, no lettering, no logos, no chair, no cards, no chips.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Astronaut, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face and short dark hair, scuffed off-white pressure suit with faded orange panels, metal neck ring, padded gloves, wrist oxygen gauge and the round helmet on the felt.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind her, nothing of her cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Her round helmet stands on the felt beside her right hand (the left of the picture) unless the pose says otherwise. The suit has NO flags, NO patches, NO insignia and NO lettering anywhere. Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.

1. Touching the creased photograph tucked in her right cuff with two fingers of her left glove, looking down at it, softly
2. Checking her oxygen gauge: her left wrist lifted to eye level, reading the round gauge on it, frowning slightly; her right arm as at rest
3. Rubbing a scuff on the helmet beside her with her right glove, eyes down; her left arm as at rest
4. Her right glove open, palm up, just above the felt, a single small plain round token hovering an inch above it in the low gravity, her eyes on it, about to catch it
5. Turning her head and shoulders toward the viewer with a tired, kind smile; arms as at rest
6. Rolling her shoulders inside the stiff suit, stretching a little, eyes half closed; arms as at rest

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No flags, no patches, no insignia, no lettering, no logos, no chair, no cards, no chips.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the Astronaut, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same face and short dark hair, scuffed off-white pressure suit with faded orange panels, metal neck ring, padded gloves, wrist oxygen gauge and the round helmet on the felt.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind her, nothing of her cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Her round helmet stands on the felt beside her right hand (the left of the picture) unless the pose says otherwise. The suit has NO flags, NO patches, NO insignia and NO lettering anywhere. Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.

1. Talking: her right glove raised a little, palm open, mouth open mid-word
2. Facing a big bet: sitting back, eyebrows up, both gloves flat on the felt
3. Lost a pot: a rueful half smile, eyes down; arms as at rest
4. A crushing loss: her forehead resting on the top of her helmet, both arms round it on the felt, eyes shut
5. Down to two players: leaning in on both forearms, eyes level, determined
6. A tired laugh, her head tipped back a little, her right glove flat on her chest

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No flags, no patches, no insignia, no lettering, no logos, no chair, no cards, no chips.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Astronaut's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of her head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the mouths too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the neck and the metal neck ring, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- Her eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side, toward a window; narrowed; wide (one piece each, both eyes with the skin around them)
- Her brows raised; her brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it, cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a big grin; a small rueful smile
- Her head turned toward the viewer, nearly front-on

Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.
```
