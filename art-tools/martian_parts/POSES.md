# The Martian: every pose, and the prompts

The Station (table 8, a round lounge on a space station above the Earth), seat 2, drawn facing the viewer's right. Built the way the Transylvania cast is (`art-tools/pose_rig.py`, a short `rig_spec.json`), in the same graphic-novel style: the Headless Horseman's approved sheet is the style image, lit by the station (a cool blue Earthlight rim light and warm lamps) instead of candles.

Its look is Wells's own (The War of the Worlds, 1898, public domain): merely a head, four feet across, two huge dark eyes, a quivering V-shaped beak, sixteen whip-thin tentacles in two bunches of eight, sitting in a three-legged brass seat, a small cousin of the fighting-machines. No exposed brain, no bubble helmet, no green skin, no ray-gun: nothing from the films, the musical, Mars Attacks! or Marvin the Martian. Its tentacle bunches take the place of forearms.

Tags (MOTION-SPEC.md): its tells beside idles that move the same part: tentacles curling (strong) beside drumming three tentacles in sequence; working something out on its tentacle-tips (weak) beside the same bunch at rest, so both read as the tentacles; its eyes blinking out of time (bluffing) beside looking down at the Earth (the eyes). Its skin shifting colour and its heavy breathing are idles. B3 and D4 are the big win and the crushing loss; its tentacles hold nothing.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: both tentacle bunches on the felt, apart, eyes on the table | IDLE |
| A2 | Peeking at its cards (right bunch) | MECH |
| A3 | Check: two tentacle-tips tap the felt | MECH |
| A4 | Call: right bunch slides forward along the felt | MECH |
| A5 | Bet: head leans forward, right bunch pushed well forward | MECH |
| A6 | Fold: a flick of the right bunch | MECH |
| B1 | All in: both bunches push forward together | MECH |
| B2 | Show: tentacle-tips turn something over | MECH |
| B3 | Big win: both bunches raised and writhing, beak wide (`win_big`) | BEAT |
| B4 | Its tentacles curl | TELL |
| B5 | Drums three tentacles in sequence (decoy for B4) | IDLE |
| B6 | Works something out on its tentacle-tips | TELL |
| C1 | Its great eyes blink out of time with each other | TELL |
| C2 | Its skin shifts colour, faintly | IDLE |
| C3 | Breathes heavily in the heavy air | IDLE |
| C4 | Looks down at Earth through the window (decoy for C1) | IDLE |
| C5 | Turns to look at you | IDLE |
| C6 | Sags in its seat under Earth's gravity (a fidget) | IDLE |
| D1 | Talking: beak open, hooting, a bunch lifted | BEAT |
| D2 | Facing a big bet: head drawn back, eyes wide | BEAT |
| D3 | Lost a pot: head sagging, eyes half shut | BEAT |
| D4 | Crushing loss: tentacles thrashing, beak wide (`lose_big`) | BEAT |
| D5 | Heads up: head far forward, tentacles stretched | BEAT |
| D6 | A low hooting laugh | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches THREE images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then the Astronaut's character sheet (`art-tools/astronaut_parts/sources/astronaut_sheet.png`) and his pose sheet A (`art-tools/astronaut_parts/sources/poses_a.png`), both for the style: the Astronaut is the Station's baseline (the owner), drawn after the Grey's first sheets came out airbrushed. From the second prompt on, attach its own character sheet, its pose sheet A once it exists, AND the Astronaut's pose sheet A, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: a Martian, of H. G. Wells's The War of the Worlds (1898), drawn from Wells's own description. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no surcoat, no hair, no human face or body. Take the STYLE from the SECOND and THIRD attached images.

The Martian, as Wells's narrator saw it close: a creature that is merely a head: one great rounded head about four feet across, with oily, glistening grey-brown skin like wet leather, two enormous round dark eyes set close together at the front, and below them a small V-shaped beak of a mouth with a quivering lipless rim. It has no neck, no body and no arms. From beneath the head grow sixteen long, whip-thin tentacles in two bunches of eight, one bunch on each side, which it uses as hands. It sits in a squat brass seat on three jointed metal legs, a small cousin of its great fighting-machines, the round brass rim of the seat cradling the bottom of the head. Heavy-breathing and slow in Earth's gravity, patient, and quietly hungry for whatever is left undefended. NOT cute, NOT a cartoon alien, NO exposed brain, NO glass bubble helmet, NO green skin, NO ray-gun. Nothing from any film, the musical or any cartoon.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the beak and both bunches of tentacles clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each in the top of the brass seat's rim: neutral; the beak open mid-sound; one eye blinked shut, the other open; both eyes narrowed, intent
- The head in its brass seat with NO tentacles, cut off straight just below the seat's rim
- Two bunches of eight thin tentacles, each lying on a table, pointing toward its centre, open at the end where they leave the head
- On its own: the empty brass seat on its three jointed legs
- Four seated reference poses, the head in its seat behind the curved edge of a round green poker table, the seat's rim just above the table's edge, both bunches of tentacles lying on the felt, apart: neutral; its tentacles curled up tight; its eyes blinking out of time with each other; touching its tentacle-tips together one after another, as if counting

STYLE, the most important rule: match the SECOND and THIRD attached images (the Astronaut, a player at this same table: his character sheet and his pose sheet) exactly: the same inked GRAPHIC-NOVEL style, halfway between a bright cartoon and a dark painted illustration. Take NOTHING of his character: no pressure suit, no helmet, no human face. What makes that style, and this drawing must have all of it: a thick, dark, inked outline of even weight round every shape; flat cel shading in three or four HARD-EDGED tones, the shadows deep and dark and covering a good part of each form; a little rough, dry-brush texture inside the shadows only; muted, slightly dirty colour, never clean or glossy. NO airbrush, NO soft gradients, NO smooth 3D rendering, NO glossy plastic or wet-looking highlights, NO fine anatomical detail. Big clear readable shapes and a silhouette that reads at a tiny size; grown-up proportions, never chibi, never cute. The light is the space station's: a cool blue rim light from the Earth in a great window on one side, soft warm lamplight on the other, both laid in as flat bands of colour. Quiet, strange and a little lonely. NOT a children's cartoon, NOT toy-like, NOT photoreal, NOT a 3D render, NOT glossy chrome sci-fi.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Martian, exactly as on the attached character sheet (one great rounded head, about four feet across, set low in a squat brass seat whose round rim shows just above the table's edge; oily grey-brown skin, two enormous round dark eyes, a small V-shaped beak of a mouth below them, no body, no neck; sixteen whip-thin tentacles growing from beneath the head in two bunches of eight, one bunch each side, lying on the felt like arms, colours, line weight, graphic-novel style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between it and the cell's edges, the top of its head included: nothing of it is cut off. Nothing below the table edge. No chair: nothing at all behind it, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position. It has NO body and NO arms: the two bunches of eight thin tentacles are its arms, one bunch each side, lying on the felt like forearms. The brass seat's round rim stays just above the table's edge in every pose. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; muted colour; a cool blue Earthlight rim and warm lamplight as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. At rest: both bunches of thin tentacles lying over the table's edge and out onto the felt in front of it, the two bunches a hand's width apart, relaxed and NOT touching, NOT tangled together; its eyes on the table, beak closed
2. Peeking at its cards: the tips of its right bunch of tentacles (the left of the picture) curled low over the felt in front of it, as if shielding something small; its eyes down
3. Checking: two tentacle-tips of its right bunch tapping the felt
4. Calling: its right bunch of tentacles sliding forward along the felt, tips leading
5. Betting: its great head leaning forward in its seat, its right bunch of tentacles pushed well forward along the felt
6. Folding: a dismissive flick of its right bunch of tentacles toward the middle of the table

No cards and no chips anywhere: its tentacles hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No exposed brain, no glass bubble helmet, no green skin, no ray-gun, no fighting-machine, no chair, no cards, no chips.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Martian, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same great rounded grey-brown head, two huge dark eyes, V-shaped beak, brass seat rim and two bunches of thin tentacles.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (the two bunches of tentacles resting apart). It has NO body and NO arms: the two bunches of eight thin tentacles are its arms, one bunch each side, lying on the felt like forearms. The brass seat's round rim stays just above the table's edge in every pose. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; muted colour; a cool blue Earthlight rim and warm lamplight as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. All in: both bunches of tentacles pushing forward along the felt together, its head leaning in
2. Showing: the tips of its right bunch lifting from the felt and turning over, as if turning something over
3. A big win: both bunches of tentacles raised high and spread wide above its head, writhing, its beak wide open
4. The tentacles of both bunches curled up tight into coils on the felt; the rest of it perfectly still
5. Drumming three tentacles of its right bunch on the felt one after another, two short motion marks beside them; the left bunch as at rest
6. Working something out on its tentacle-tips: the tips of its right bunch touching together one after another, as if counting, its eyes on them; the left bunch as at rest

No cards and no chips anywhere: its tentacles hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No exposed brain, no glass bubble helmet, no green skin, no ray-gun, no fighting-machine, no chair, no cards, no chips.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Martian, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same great rounded grey-brown head, two huge dark eyes, V-shaped beak, brass seat rim and two bunches of thin tentacles.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (the two bunches of tentacles resting apart). It has NO body and NO arms: the two bunches of eight thin tentacles are its arms, one bunch each side, lying on the felt like forearms. The brass seat's round rim stays just above the table's edge in every pose. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; muted colour; a cool blue Earthlight rim and warm lamplight as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. Its two great eyes blinking out of time with each other: the left eye shut, the right eye open; tentacles as at rest
2. Its skin shifting colour, faintly: a soft wave of pale blue-grey passing across its head; tentacles as at rest
3. Breathing heavily in the heavy air: its great head swelled a little, the beak open, the skin round it pulsing; tentacles as at rest
4. Looking down at the Earth through a window: its great eyes turned down and toward the right of the picture; tentacles as at rest
5. Turning its head toward the viewer, both great eyes on the viewer; tentacles as at rest
6. Sagging in its seat under Earth's heavy gravity: its head sunk a little lower in the brass rim, tentacles lying limp

No cards and no chips anywhere: its tentacles hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No exposed brain, no glass bubble helmet, no green skin, no ray-gun, no fighting-machine, no chair, no cards, no chips.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the Martian, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same great rounded grey-brown head, two huge dark eyes, V-shaped beak, brass seat rim and two bunches of thin tentacles.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind it, nothing of it cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (the two bunches of tentacles resting apart). It has NO body and NO arms: the two bunches of eight thin tentacles are its arms, one bunch each side, lying on the felt like forearms. The brass seat's round rim stays just above the table's edge in every pose. Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; muted colour; a cool blue Earthlight rim and warm lamplight as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.

1. Talking: its beak open, hooting, its right bunch of tentacles lifted a little and loose
2. Facing a big bet: its head drawn back in its seat, its eyes wide, both bunches of tentacles flat on the felt
3. Lost a pot: its head sagging in its seat, eyes half shut; tentacles as at rest
4. A crushing loss: both bunches of tentacles thrashing and slapping the felt, beak wide open in a howl, eyes squeezed shut
5. Down to two players: its great head leaning far forward over the felt, both bunches of tentacles stretched forward, eyes on the viewer
6. A low, hooting laugh: its beak open, its head bobbing back, its tentacles rippling

No cards and no chips anywhere: its tentacles hold nothing. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No exposed brain, no glass bubble helmet, no green skin, no ray-gun, no fighting-machine, no chair, no cards, no chips.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Martian's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of its head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the beaks too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, in the brass seat's rim, as the reference, beak closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- Its eyes (one piece each, both eyes with the skin around them): half closed; closed; the LEFT eye shut and the right open; the RIGHT eye shut and the left open; looking toward the viewer; looking down; narrowed; wide
- Its beak (one piece each, the beak with the skin around it): closed at rest; open a little; open wide; round, as if hooting; pinched small; the rim quivering; the corners lifted, pleased
- Its head turned toward the viewer, nearly front-on

Keep EXACTLY the inked graphic-novel style of the attached sheets and of the Astronaut's sheets: thick, even, dark outlines; flat, hard-edged cel shading in three or four tones with deep shadows; a little dry-brush texture in the shadows only; muted colour; a cool blue Earthlight rim and warm lamplight as flat bands. NO airbrush, NO soft gradients, NO glossy 3D look; NOT a children's cartoon, NOT cute.
```
