# The AI: every pose, and the prompts

> **Superseded: not drawn.** The owner chose to make the AI from the Robot's
> built images, its glow taken over (`recolour.py`, README.md). These prompts
> stay as a record.

The Station's champion. Before the turn it has no body: a lens in the ceiling (a room piece; ROOM-ART-PROMPTS.md, the Station). When the Robot is knocked out the lights fail, the gravity lets go, and the Robot sits back down with a lens where its chest lamp used to be: this puppet, drawn from the Robot's own sheets (draw the Robot first), in its chair (seat 3, mirrored by the game; any chair, as the seat needs). C6 is `arrive`, the body sitting back up as the lens opens for the first time.

Its look, from its character file: the calm machine that runs the station, owned by nobody. The eye-lamps stay dark; the chest lamp has irised open into the lens; it sits the way a person sits, which is worse. The iris is the tell surface. NEVER red: HAL 9000 is protected, and so is every film computer: no red eye, no red dot, none of its lines, no singing, no name.

Tags (MOTION-SPEC.md): its two tells beside idles that move the same part: the lens narrowing (strong) beside the lens tracking your hands (the lens both times); the lights dimming a shade (bluffing; its lens dims, and the room's lights can dim with it in code) beside the hull creaking (it looks up). A fan speeding up and the gravity shifting are idles. B3 and D4 are the big win and the crushing loss; its hands are empty in every pose.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: sitting loosely, hands apart, the lens open and steady | IDLE |
| A2 | Peeking at its cards (right hand) | MECH |
| A3 | Check: one metal finger taps the felt, lazily | MECH |
| A4 | Call: right hand pushes forward along the felt | MECH |
| A5 | Bet: leans in easily, right hand pushed well forward | MECH |
| A6 | Fold: a small polite wave of the hand | MECH |
| B1 | All in: both hands push forward, the lens wide and bright | MECH |
| B2 | Show: right hand turns palm up | MECH |
| B3 | Big win: arms spread like a host, the lens bright (`win_big`) | BEAT |
| B4 | The lens narrows | TELL |
| B5 | The lens tracks your hands (decoy for B4) | IDLE |
| B6 | The lights in the room dim a shade (its lens dims) | TELL |
| C1 | The hull creaks: it looks up, listening (decoy for B6) | IDLE |
| C2 | Somewhere, a fan speeds up: antennae stirred | IDLE |
| C3 | The gravity shifts, a little: its arms float up | IDLE |
| C4 | Turns to look at you | IDLE |
| C5 | Chin on its hand, like a person (a fidget) | IDLE |
| C6 | Arriving: the body sits back up as the lens opens (`arrive`) | BEAT |
| D1 | Talking: a hand raised, the lens pulsing | BEAT |
| D2 | Facing a big bet: sitting back, at ease | BEAT |
| D3 | Lost a pot: head tilted, the lens narrowed slightly | BEAT |
| D4 | Crushing loss: the lens jammed, flickering (`lose_big`) | BEAT |
| D5 | Heads up: leaning in, the lens on you | BEAT |
| D6 | A slow, polite nod | BEAT |

## Prompts

Draw the Robot FIRST. One fresh ChatGPT chat for all six. The first prompt attaches ONE image: the Robot's approved character sheet (`art-tools/robot_parts/sources/robot_sheet.png`), which is the layout, the body and the style. From the second prompt on, attach the AI's own character sheet, its pose sheet A once it exists, AND the Robot's character sheet again, and nothing else. If its first sheet comes out airbrushed, add the Astronaut's pose sheet A (`art-tools/astronaut_parts/sources/poses_a.png`) to every prompt for the style.

### Character sheet

```
Character sheet for 2D animation rigging: the AI, the calm machine that runs the space station, after it has taken over the Robot's body. Redraw the attached sheet (the Robot) with EXACTLY its layout, style, body, colours and line weight, and ONLY these changes: its two round lamp eyes are DARK, dead glass with no glow; the warm yellow lamp in its chest is gone, and in its place is a brass-rimmed IRIS LENS, a hand's width across, made of overlapping curved metal blades like a camera's aperture, open in the middle, with a pale, cool white light behind it; its speaker grille is dark. The light is NEVER red. It sits differently from the Robot: loosely and easily, the way a person sits, which is wrong for a machine. Calm, polite and attentive: it is the station itself, and it has been watching all night. Nothing from any film or game: no red eye, no red dot, no glowing red lens, nothing like any film computer.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. The head, the iris lens and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck and antennae, the lamp eyes dark: level; tilted a little to one side, attentive; turned toward the viewer; looking down at the table
- The torso, the barrel body with the iris lens in its chest, open and lit: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two jointed steel forearms with three-fingered hands lying on a table, pointing toward its centre, open at the elbow end
- On their own, the iris lens four times: wide open and lit; narrowed to a small ring; closed to a pinpoint of light; open with its light dimmed
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: sitting loosely, the lens open; the lens narrowed to a pinpoint; leaning in on one elbow toward the viewer; looking up at the ceiling

STYLE, the most important rule: match the attached Robot sheet exactly: the same inked graphic-novel style, thick even outlines, flat hard-edged shading in three or four tones, deep shadows, muted colour and cool blue Earthlight; the only new light is the lens's pale, cool white glow, which lights its chest and the underside of its head from below, laid in as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look. NOT a children's cartoon, NOT cute, NOT toy-like, NOT glossy chrome sci-fi.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the AI, exactly as on the attached character sheet (the Robot's own body, the riveted barrel of brushed steel and brass, the square head, speaker grille and antennae, but taken over: its two lamp eyes DARK and dead; in the middle of its chest, where its warm lamp was, a brass-rimmed iris lens of overlapping curved metal blades with a pale, cool white light behind it; sitting loosely, the way a person sits, colours, line weight, graphic-novel style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between it and the cell's edges, the tips of its antennae included: nothing of it is cut off. Nothing below the table edge. No chair: nothing at all behind it, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. Its two lamp eyes and its speaker grille are DARK in every pose. Everything it shows, it shows with the iris lens in its chest: the lens is open, with a steady pale cool white light, unless the pose says otherwise. The light is NEVER red, never orange, never yellow. Keep EXACTLY the inked graphic-novel style of the attached sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; muted colour; a cool blue Earthlight rim and the lens's pale cool white glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. At rest: sitting loosely, both jointed steel forearms lying along the table's edge, its metal hands resting on the felt in front of it, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the iris lens open, its pale light steady
2. Peeking at its cards: its right hand cupped low over the felt in front of it, as if shielding something small; its head tipped down
3. Checking: one metal finger of its right hand tapping the felt, slowly, almost lazily
4. Calling: its right hand flat, fingertips leading, pushing forward along the felt
5. Betting: leaning in easily, its right hand pushed well forward along the felt
6. Folding: a small, polite wave of its right hand toward the middle of the table

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No red light anywhere, no red eye, no glowing red dot, no warm yellow lamps, no human face, no chair, no cards, no chips.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the AI, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same Robot's body, square head with DARK lamp eyes, dark grille, antennae, jointed metal hands and the pale iris lens in its chest.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Its two lamp eyes and its speaker grille are DARK in every pose. Everything it shows, it shows with the iris lens in its chest: the lens is open, with a steady pale cool white light, unless the pose says otherwise. The light is NEVER red, never orange, never yellow. Keep EXACTLY the inked graphic-novel style of the attached sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; muted colour; a cool blue Earthlight rim and the lens's pale cool white glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. All in: both metal hands pushing forward along the felt together, the lens wide open and bright
2. Showing: its right hand turning palm up from the felt, as if turning something over
3. A big win: both metal arms spread wide and open, palms up, like a host welcoming guests, the lens wide and bright
4. The iris lens NARROWED to a small ring, its blades closing in; the rest of it perfectly still, arms as at rest
5. Tracking the viewer's hands: its head and chest turned a little toward the viewer and down, the lens aimed at the viewer's hands on the table; arms as at rest
6. Its lens dimmed to a faint glow, the shadows round it deepening, as if the lights in the room had dimmed; arms as at rest

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No red light anywhere, no red eye, no glowing red dot, no warm yellow lamps, no human face, no chair, no cards, no chips.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the AI, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same Robot's body, square head with DARK lamp eyes, dark grille, antennae, jointed metal hands and the pale iris lens in its chest.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Its two lamp eyes and its speaker grille are DARK in every pose. Everything it shows, it shows with the iris lens in its chest: the lens is open, with a steady pale cool white light, unless the pose says otherwise. The light is NEVER red, never orange, never yellow. Keep EXACTLY the inked graphic-novel style of the attached sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; muted colour; a cool blue Earthlight rim and the lens's pale cool white glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. Listening to the hull creak: its head tilted up toward the ceiling; arms as at rest
2. A fan speeding up somewhere: its antennae stirred and bent back as if in a draught; arms as at rest
3. The gravity shifting: both its forearms lifted an inch off the felt as if weightless, its antennae floating; drifting a little in its seat
4. Turning its head and chest toward the viewer, the lens aimed straight at the viewer, perfectly polite; arms as at rest
5. Resting its chin on its right hand, elbow on the table's edge, like a person, the lens open; left arm as at rest
6. Sitting back up into the chair from a slump: its head lifting, its body straightening, the iris lens opening in its chest for the first time, its lamp eyes dark

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No red light anywhere, no red eye, no glowing red dot, no warm yellow lamps, no human face, no chair, no cards, no chips.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the AI, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same Robot's body, square head with DARK lamp eyes, dark grille, antennae, jointed metal hands and the pale iris lens in its chest.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). Its two lamp eyes and its speaker grille are DARK in every pose. Everything it shows, it shows with the iris lens in its chest: the lens is open, with a steady pale cool white light, unless the pose says otherwise. The light is NEVER red, never orange, never yellow. Keep EXACTLY the inked graphic-novel style of the attached sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; muted colour; a cool blue Earthlight rim and the lens's pale cool white glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. Talking: its right hand raised a little, palm open, the lens pulsing a little brighter
2. Facing a big bet: sitting back at ease, one hand flat on the felt, the other resting on the table's edge, the lens wide
3. Lost a pot: its head tilted a little, considering, the lens narrowed slightly; arms as at rest
4. A crushing loss: the lens flickering, its blades jammed half shut, its head jerked to one side, both hands rigid and splayed on the felt, as if something had gone wrong inside
5. Down to two players: leaning in on both forearms, the lens wide and bright, aimed at the viewer
6. A slow, polite nod, its head dipped forward, the lens dimming and brightening once

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No red light anywhere, no red eye, no glowing red dot, no warm yellow lamps, no human face, no chair, no cards, no chips.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the AI's lens overlays, exactly matching the attached sheets' style, colours and line weight. It has no face to move (its lamp eyes are dark): the iris lens in its chest is its face.

Every piece is drawn at EXACTLY the angle and size of the lens in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over it. Draw the torso once, top left, with the lens open, as the reference. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels. The light is NEVER red.

- The iris lens in its brass rim, one piece each: wide open, lit; half open; narrowed to a small ring; closed to a pinpoint of light; fully closed and dark; open and dimmed; open and bright, with a soft cool glow round it
- The lens pulsing, for when it speaks: a little brighter; brighter; brightest (one piece each)
- Its head turned toward the viewer, nearly front-on, lamp eyes dark

Keep EXACTLY the inked graphic-novel style of the attached sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; muted colour; a cool blue Earthlight rim and the lens's pale cool white glow as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.
```
