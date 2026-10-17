# The Robot: every pose, and the prompts

The Station (table 8, a round lounge on a space station above the Earth), seat 3, drawn facing the viewer's right, MIRRORED by the game to face the table's centre. Built the way the Transylvania cast is (`art-tools/pose_rig.py`, a short `rig_spec.json`), in the same graphic-novel style: the Headless Horseman's approved sheet is the style image, lit by the station (a cool blue Earthlight rim light and warm lamps) instead of candles.

Its look, from its character file: the tin robot of pulp covers, world's fairs and toy shops, owned by nobody: a riveted barrel of a body, a square head, two round lamp eyes, a speaker grille, antennae for height, and a round lamp in its chest that is the tell surface AND the slot the AI's lens takes later (the AI's prompts are drawn from this robot's sheets). No Robby, no Gort, no Metropolis Maria, no Tin Man, no Lost in Space robot, no modern film droid.

Tags (MOTION-SPEC.md): its tells beside idles that move the same part: the chest lamp flickering (strong) beside the eye-lamps dimming (the lamps); whirring (weak) beside recalibrating with a click (small machine noises); rotating its head to the pot and back (bluffing) beside its antennae twitching (the head). Venting steam is C4. B3 and D4 are the big win and the crushing loss (its lamps go dark, which the AI's arrival answers). Its hands are empty in every pose.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, lamps steady | IDLE |
| A2 | Peeking at its cards (right hand) | MECH |
| A3 | Check: one metal finger taps the felt | MECH |
| A4 | Call: right hand pushes forward along the felt | MECH |
| A5 | Bet: leans forward, right hand pushed well forward | MECH |
| A6 | Fold: a neat push of the hand | MECH |
| B1 | All in: both hands push forward together | MECH |
| B2 | Show: right hand turns palm up | MECH |
| B3 | Big win: both arms straight up, antennae up, lamps bright (`win_big`) | BEAT |
| B4 | Its chest lamp flickers | TELL |
| B5 | Its eye-lamps dim and brighten (decoy for B4) | IDLE |
| B6 | Whirs, briefly | TELL |
| C1 | Recalibrates with a click (decoy for B6) | IDLE |
| C2 | Rotates its head to the pot and back | TELL |
| C3 | Its antennae twitch (decoy for C2) | IDLE |
| C4 | Vents a thin puff of steam | IDLE |
| C5 | Turns to look at you | IDLE |
| C6 | Polishes a scratch on its chest (a fidget) | IDLE |
| D1 | Talking: the grille lit, a hand raised | BEAT |
| D2 | Facing a big bet: stiffly upright | BEAT |
| D3 | Lost a pot: head bowed, lamp eyes dimmed | BEAT |
| D4 | Crushing loss: slumped, lamps dark, smoke (`lose_big`) | BEAT |
| D5 | Heads up: leaning in on both forearms | BEAT |
| D6 | Laughing: the grille glowing in short bars | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then the Headless Horseman's approved character sheet (`art-tools/headless_horseman_parts/sources/headless_horseman_sheet.png`) for the style. From the second prompt on, attach its own character sheet, its pose sheet A once it exists, AND the Horseman's character sheet again, and nothing else. Draw the Robot BEFORE the AI: the AI's prompts attach the Robot's sheets.

### Character sheet

```
Character sheet for 2D animation rigging: the Robot, the tin robot of 1930s pulp magazine covers, world's fairs and toy shops, an archetype owned by nobody. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour (it is a machine, not a knight), no surcoat, no hair. Take the STYLE from the SECOND attached image.

The Robot: a sturdy, old-fashioned machine: a riveted barrel of a body in brushed steel with brass bands, worn bright at the joints, a little dented and patched; a square head on a short neck of ribbed steel, with two round lamp eyes behind glass glowing a soft warm yellow, and a rectangular speaker grille for a mouth; two thin antennae with small round tips rising from the top of its head; a round glass lamp set in the middle of its chest, a hand's width across in a brass rim, glowing the same soft warm yellow; a small steam valve on its left shoulder; jointed steel arms and hands with three fingers and a thumb. Earnest, orderly and patient: a machine doing exactly what it was built to do. NOT cute, NOT a toy, NOT chrome-shiny, NO red lights. Nothing from any film: no domed glass head, no smooth faceless visor, no funnel hat, no modern film robot.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both lamp eyes, the grille, the chest lamp and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck and antennae: lamps bright; lamps dimmed; the lamp eyes narrowed by shutters halfway down; the grille lit as if speaking
- The torso, the barrel body with its lit chest lamp: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two jointed steel forearms with three-fingered hands lying on a table, pointing toward its centre, open at the elbow end
- On its own: the round glass chest lamp in its brass rim, lit
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; the chest lamp flickering; its head turned to look at the middle of the table; venting a thin puff of steam from the shoulder valve

STYLE, the most important rule: match the SECOND attached image (the Headless Horseman, from an earlier table) exactly: a GOTHIC GRAPHIC-NOVEL style for a grown-up card game, halfway between a bright cartoon and a dark painted illustration. Take NOTHING of his character: no armour, no pumpkin, no cloak. Keep what the game needs: a bold dark outline round every shape, big clear readable shapes, a silhouette that reads at a tiny size. Grown-up proportions, never chibi, never cute; shading in three or four tones with deep, dramatic shadows; the light of a space station: a cool blue rim light from the Earth in a great window on one side, soft warm lamplight on the other; rich but MUTED colour, nothing candy-bright; worn surfaces with soft highlights, a little texture in the shadows only. Quiet, strange and a little lonely. NOT a children's cartoon, NOT cute, NOT toy-like, NOT round and bouncy, NOT photoreal, NOT muddy or murky, NOT glossy chrome sci-fi.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Robot, exactly as on the attached character sheet (a riveted barrel of a body in brushed steel with brass bands, worn bright at the joints; a square head with two round lamp eyes glowing soft warm yellow and a speaker-grille mouth; two thin antennae with small round tips; a round glass lamp set in the middle of its chest, glowing the same soft warm yellow; jointed steel arms and hands with three fingers and a thumb, colours, line weight, graphic-novel style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between it and the cell's edges, the tips of its antennae included: nothing of it is cut off. Nothing below the table edge. No chair: nothing at all behind it, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. Its chest lamp and its two lamp eyes glow a steady soft warm yellow unless the pose says otherwise. Its face never changes shape: only its lamps and its grille. Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.

1. At rest: both jointed steel forearms lying along the table's edge, its metal hands resting on the felt in front of it, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; its head level, its lamps steady
2. Peeking at its cards: its right hand cupped low over the felt in front of it, as if shielding something small; its head tipped down
3. Checking: one metal finger of its right hand tapping the felt, precisely
4. Calling: its right hand flat, fingertips leading, pushing forward along the felt
5. Betting: leaning forward, its right hand pushed well forward along the felt, exactly
6. Folding: a neat push of its right hand toward the middle of the table, palm down

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No domed glass head, no smooth visor, no human face, no red lights, no chair, no cards, no chips.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Robot, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same riveted barrel body, square head, round lamp eyes, speaker grille, antennae, round chest lamp and jointed metal hands.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Its chest lamp and its two lamp eyes glow a steady soft warm yellow unless the pose says otherwise. Its face never changes shape: only its lamps and its grille. Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.

1. All in: both metal hands pushing forward along the felt together, leaning in
2. Showing: its right hand turning palm up from the felt, as if turning something over
3. A big win: both metal arms raised straight up, hands open, its antennae standing straight up, its lamps bright
4. Its chest lamp flickering: the glow broken and uneven, a few short flicker marks round it; the rest of it perfectly still, arms as at rest
5. Its two lamp eyes dimmed low, the chest lamp steady; arms as at rest
6. Whirring: small curved motion marks round its head and neck, as if something inside were spinning; arms as at rest

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No domed glass head, no smooth visor, no human face, no red lights, no chair, no cards, no chips.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Robot, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same riveted barrel body, square head, round lamp eyes, speaker grille, antennae, round chest lamp and jointed metal hands.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Its chest lamp and its two lamp eyes glow a steady soft warm yellow unless the pose says otherwise. Its face never changes shape: only its lamps and its grille. Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.

1. Recalibrating: its head jerked slightly to one side, as if resetting, one short tick mark beside it; arms as at rest
2. Its head rotated round on its neck to look straight at the middle of the table (the right of the picture), its body not moving; arms as at rest
3. Its antennae bent and twitching, two short motion marks beside each tip; arms as at rest
4. A thin puff of white steam venting from the valve on its left shoulder; arms as at rest
5. Turning its head and shoulders toward the viewer, both lamp eyes on the viewer; arms as at rest
6. Polishing a scratch on its chest beside the lamp with the fingers of its right hand; left arm as at rest

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No domed glass head, no smooth visor, no human face, no red lights, no chair, no cards, no chips.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the Robot, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same riveted barrel body, square head, round lamp eyes, speaker grille, antennae, round chest lamp and jointed metal hands.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Its chest lamp and its two lamp eyes glow a steady soft warm yellow unless the pose says otherwise. Its face never changes shape: only its lamps and its grille. Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.

1. Talking: its speaker grille lit with a soft yellow glow, its right hand raised a little, palm open
2. Facing a big bet: sitting back stiffly upright, its head drawn back, both hands flat on the felt
3. Lost a pot: its head bowed a little, its lamp eyes dimmed; arms as at rest
4. A crushing loss: slumped forward, head hanging, antennae drooping, its lamp eyes and its chest lamp gone DARK, a thin wisp of smoke from the shoulder valve, both hands limp on the felt
5. Down to two players: leaning forward on both forearms, its lamp eyes bright, head level
6. Laughing: its head tipped back, its speaker grille glowing in short bars, its antennae bobbing

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No domed glass head, no smooth visor, no human face, no red lights, no chair, no cards, no chips.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Robot's face overlays, exactly matching the attached sheets' style, colours and line weight. Its face is metal and never changes shape: only its lamp eyes and its speaker grille change.

Every piece is drawn at EXACTLY the angle and size of its head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: NOT front-on and NOT symmetrical. Draw that head once, top left, with the neck and antennae, as the reference, lamps steady. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- Its lamp eyes (one piece each, both lamps with the metal around them): dimmed; dark, switched off; narrowed by shutters halfway down; shutters closed; the glow shifted as if looking toward the viewer; looking down; bright, with a soft glow round them
- Its speaker grille (one piece each, the grille with the metal around it): dark; lit faintly; lit brighter; lit brightest
- Its head turned toward the viewer, nearly front-on

Keep the graphic-novel style of the attached character sheets: bold dark outlines, grown-up proportions, deep three- or four-tone shading, a cool blue Earthlight rim light and warm lamplight, rich muted colour; quiet and strange, NOT a children's cartoon, NOT cute.
```
