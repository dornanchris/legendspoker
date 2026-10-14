# The Cheshire Cat: every pose, and the prompts

Baker Street's seat 3 (right of the dealer): drawn facing the viewer's right and MIRRORED by the game to face the table's centre, so his tail (on the left of the picture) ends up on the outside of the table. Built the way Cerberus is (`art-tools/pose_rig.py`, a non-human body).

He took Alice's chair (the owner's call: two Alice sheets came out looking like Disney's). His look, from his character file: Tenniel's Cheshire Cat, a large, solid tabby with an enormous grin, warm grey-brown with darker stripes; never the Disney cat's pink and purple, never the Burton film's. His BODY is the tell surface, so every tell is a big shape: the tail, the eyes, and parts of him vanishing, tail first and the grin last (Carroll's own order). Vanished parts are simply not drawn (plain white), so the puppet can cut them cleanly.

Ruled out (his character file): the 1951 Disney film entirely and the 2010 Burton design. Layout from Lancelot's character sheet, style from Washington's pose sheet A.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: fading away tail first, grin last (strong; B4 then C5) beside his head drifting a little way off his shoulders; blinking one eye, then the other (weak) beside washing a paw; the tip of his tail twitching (bluffing) beside his tail swaying lazily. 'Grins at the dealer' is C4.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: sitting up, front paws on the table's edge, tail curled up beside him, the grin | IDLE |
| A2 | Peeking at his cards (right paw) | MECH |
| A3 | Check: pats the felt with one paw | MECH |
| A4 | Call: slides a short stack forward with a paw | MECH |
| A5 | Bet: pushes a stack forward, grinning wider | MECH |
| A6 | Fold: flicks his cards away with a paw | MECH |
| B1 | All in: both paws push his whole stack | MECH |
| B2 | Show: flips his cards over with a paw | MECH |
| B3 | Collect: both paws gathering the pot in | MECH |
| B4 | Fading away, beginning with the end of his tail: tail and hindquarters gone | TELL |
| B5 | His head drifts a little way off his shoulders (decoy for B4) | IDLE |
| B6 | Blinks one eye, then the other: one eye shut | TELL |
| C1 | Washes a paw (decoy for B6) | IDLE |
| C2 | The tip of his tail twitches | TELL |
| C3 | His tail sways lazily to the other side (decoy for C2) | IDLE |
| C4 | Grins at the dealer | IDLE |
| C5 | Only the grin left, floating where his mouth was (the end of B4) | TELL |
| C6 | A slow, knowing look at the viewer | IDLE |
| D1 | Talking: one paw raised, explaining | BEAT |
| D2 | Facing a big bet: eyes narrowed to slits, the grin thinner | BEAT |
| D3 | Lost a pot: ears back, a lopsided grin, a shrug | BEAT |
| D4 | Won a pot: the grin enormous, drawing chips in | BEAT |
| D5 | Heads up: leaning in on both paws, eyes wide and bright | BEAT |
| D6 | Knocked out: half vanished, a cheery wave of one paw | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, then Washington's pose sheet A (`art-tools/washington_parts/sources/poses_a.png`) for the style. From the second prompt on, attach the Cat's own character sheet, his pose sheet A once it exists, AND Washington's pose sheet A again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: the Cheshire Cat, of Lewis Carroll's Alice's Adventures in Wonderland (1865), as John Tenniel drew him. Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No man, no armour, no hair, no human hands. Take the STYLE from the SECOND attached image.

The Cheshire Cat: a LARGE, solid, round-faced tabby cat, as big as a man sitting at a table; a warm grey-brown coat with darker brown tabby stripes, a cream chin and chest; round yellow-green eyes, pointed ears, long white whiskers; and an ENORMOUS grin stretching from ear to ear, full of neat white teeth: the grin is the most important thing about him and must read at a tiny size. A long, thick striped tail. He sits up at the table like a person, on his haunches, his two front paws resting on the table's edge. Lazy, amused, mischievous, completely unbothered. NOT the Disney cat: NO pink, NO purple, NO bright stripes. Nothing from any film.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole grin and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the ears, whiskers, neck and the top of the chest: grinning, calm; talking, mouth open mid-word inside the grin; one eye shut, the other open; eyes narrowed to slits, the grin thinner
- The grin on its own, floating, with nothing else: just the lips, the teeth and the dark mouth line, as it looks when the rest of the cat has vanished
- The body: chest and shoulders sitting upright, NO head (cut off just below the chin), cut off straight below the chest; NO front legs
- Two front legs and paws, lying on a table, pointing toward its centre, open at the shoulder end
- The long striped tail on its own, curled up in a loose S
- Four seated reference poses, sitting up behind the curved edge of a round green poker table, both front paws resting on its edge, apart, his tail curled up beside him on the left of the picture: grinning, calm; his tail and back half vanished (simply not drawn, plain white), only his front half left; one eye shut; the tip of his tail twitching

STYLE, the most important rule: match the SECOND attached image (Washington, from the first table) exactly: simple, chunky cartoon shapes; bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines (no fine wrinkles, no cross-hatching); fur and stripes drawn as a few big smooth shapes, never hair by hair; cloth and metal with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed illustration, NOT painterly, NOT gritty, NOT realistic.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: the Cheshire Cat, exactly as on the attached character sheet (a large, solid, round-faced tabby cat as Tenniel drew him, a warm grey-brown coat with darker brown tabby stripes, a cream chin and chest, round yellow-green eyes, pointed ears, white whiskers, and an ENORMOUS grin from ear to ear full of neat white teeth; sitting up at the table like a person, his two front paws resting on its edge, his long striped tail curling up beside him on the left of the picture, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the tips of his ears and his tail included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the paw that the pose does not mention stays EXACTLY as in pose 1, same position. He is grinning his enormous toothy grin in every pose unless the pose says otherwise. His long striped tail curls up beside him on the left of the picture (behind his back), its tip about level with his shoulder, ABOVE the table edge, unless the pose says otherwise. Where a pose says part of him has vanished, that part is simply NOT DRAWN: plain white, no ghost, no outline, no transparency. Draw NOTHING like the Disney cat: no pink, no purple, no stripes in bright colours. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. At rest: sitting up, both front paws resting on the table's edge, a paw's width apart, NOT touching; his tail curled up beside him on the left of the picture, its tip at shoulder height; the enormous grin; eyes calm
2. Peeking at his cards: his right front paw resting over two cards on the felt, one claw lifting the near corner, eyes down
3. Checking: patting the felt once with his right front paw
4. Calling: his right front paw sliding a short stack of chips forward
5. Betting: his right front paw pushing a stack of chips well forward, the grin wider
6. Folding: his right front paw flicking two cards away face down

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human hands, no human body, no clothes, no hat, no bow tie, no chair, no Alice, no pink or purple, no text.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: the Cheshire Cat, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same round face, enormous toothy grin, grey-brown tabby coat and long striped tail.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The paw a pose does not mention stays EXACTLY as in the at-rest pose (front paws resting apart). He is grinning his enormous toothy grin in every pose unless the pose says otherwise. His long striped tail curls up beside him on the left of the picture (behind his back), its tip about level with his shoulder, ABOVE the table edge, unless the pose says otherwise. Where a pose says part of him has vanished, that part is simply NOT DRAWN: plain white, no ghost, no outline, no transparency. Draw NOTHING like the Disney cat: no pink, no purple, no stripes in bright colours. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. All in: both front paws pushing his whole stack of chips forward, eyes bright
2. Showing: his right front paw flipping two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both front paws out on the felt, gathering a pile of chips in
4. Fading away, beginning with the end of his tail: his tail and his whole back half are GONE (simply not drawn, plain white, no outline), only his head, chest and front paws left, grinning
5. His head drifting a little way up off his shoulders, a clear gap of white between head and neck, grinning; body, paws and tail as at rest
6. Blinking one eye: the eye nearer the viewer shut, the other open, the grin unchanged; paws and tail as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human hands, no human body, no clothes, no hat, no bow tie, no chair, no Alice, no pink or purple, no text.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: the Cheshire Cat, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same round face, enormous toothy grin, grey-brown tabby coat and long striped tail.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The paw a pose does not mention stays EXACTLY as in the at-rest pose (front paws resting apart). He is grinning his enormous toothy grin in every pose unless the pose says otherwise. His long striped tail curls up beside him on the left of the picture (behind his back), its tip about level with his shoulder, ABOVE the table edge, unless the pose says otherwise. Where a pose says part of him has vanished, that part is simply NOT DRAWN: plain white, no ghost, no outline, no transparency. Draw NOTHING like the Disney cat: no pink, no purple, no stripes in bright colours. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Washing a paw: his right front paw raised to his mouth, tongue out, eyes half closed
2. The tip of his tail twitching: the tail as at rest but its tip kinked sharply, two short motion lines beside the tip; the rest of him still
3. His tail swaying lazily: the tail swung out in a wide, slow curve to the far left; the rest of him as at rest
4. Grinning at the dealer: head turned a little toward the middle of the table (the right of the picture), the grin wider than ever, eyes half closed
5. Only the grin left: the whole cat GONE (simply not drawn), nothing but the enormous grin floating in the air exactly where his mouth was at rest, with the table edge below it
6. A slow, knowing look straight at the viewer, eyes half lidded, the grin

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human hands, no human body, no clothes, no hat, no bow tie, no chair, no Alice, no pink or purple, no text.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: the Cheshire Cat, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same round face, enormous toothy grin, grey-brown tabby coat and long striped tail.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: chest up, sitting up behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The paw a pose does not mention stays EXACTLY as in the at-rest pose (front paws resting apart). He is grinning his enormous toothy grin in every pose unless the pose says otherwise. His long striped tail curls up beside him on the left of the picture (behind his back), its tip about level with his shoulder, ABOVE the table edge, unless the pose says otherwise. Where a pose says part of him has vanished, that part is simply NOT DRAWN: plain white, no ghost, no outline, no transparency. Draw NOTHING like the Disney cat: no pink, no purple, no stripes in bright colours. Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.

1. Talking: his right front paw raised, one claw lifted as if making a point, mouth open mid-word inside the grin
2. Facing a big bet: eyes narrowed to slits, the grin thinner; paws as at rest
3. Lost a pot: ears back, a lopsided grin, a little shrug of the shoulders; paws as at rest
4. Won a pot: the grin enormous, his right front paw drawing a few chips toward him
5. Down to two players: leaning in over both front paws, eyes wide and bright
6. Knocked out: half vanished from the tail end (his back half simply not drawn), standing up on his hind legs behind the table, giving a cheery little wave of his right front paw

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No human hands, no human body, no clothes, no hat, no bow tie, no chair, no Alice, no pink or purple, no text.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: the Cheshire Cat's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the grin too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the ears, whiskers and the top of the chest, as the reference, the grin closed (teeth together). Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes, each piece both eyes with the striped fur around them: lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed to slits; very wide; the eye nearer the viewer shut and the other open; the far eye shut and the near one open
- Muzzle patches, each the whole grin with the fur and whiskers around it, cut straight across just under the nose and again below the chin: the grin closed, teeth together (at rest); open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; "f"; "l"; the grin ENORMOUS; a thin, lopsided grin
- His head turned toward the viewer, nearly front-on, grinning

Keep the simple, chunky, flat cartoon style of the attached sheets and of Washington's sheet: few lines, big smooth shapes, flat colour, no fine detail or texture.
```
