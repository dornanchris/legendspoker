# Mr. Hyde: every pose, and the prompts

The other half of Transylvania's seat 2 (see `jekyll_parts/POSES.md`): each sitting deals Jekyll or Hyde, 50/50, and the other can come back. Drawn facing the viewer's right. Gothic style, from the Headless Horseman's approved sheet; Jekyll's own character sheet is attached for the coat.

His look, from Stevenson: 'pale and dwarfish, he gave an impression of deformity without any nameable malformation, he had a displeasing smile'; younger and lighter than Jekyll; his hand 'lean, corded, knuckly, of a dusky pallor and thickly shaded with a swart growth of hair'. He wears JEKYLL's clothes, enormously too large (as Lanyon sees him): the frock coat hanging off him, the sleeves turned back over and over, the collar sprawling, the cravat loose. His prop: the broken half of a heavy cane of dark, tough wood on the felt by his right hand.

Ruled out: SMALL, never the hulking brute of later versions (no League of Extraordinary Gentlemen giant, no 1931 ape-man, no fangs, no monster make-up); no actor's likeness.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: the displeasing smile, slow and wide (strong) beside sucking his teeth; drumming his hairy knuckles on the felt (bluffing) beside cracking them; hunching down into the too-big coat (weak) beside shoving the long sleeves back up. C6 is `arrive` (he can return in Jekyll's place). B3 and D4 are the big win and the crushing loss; hands empty of cards and chips in every pose; knocked out, he says his line and fades from the chair.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: hairy hands on the felt, apart, the broken cane by his right hand | IDLE |
| A2 | Peek: right hand cupped low over the felt | MECH |
| A3 | Check: a hairy knuckle raps the felt | MECH |
| A4 | Call: right hand shoves forward along the felt | MECH |
| A5 | Bet: leans in, right hand shoved well forward | MECH |
| A6 | Fold: a contemptuous flick of the hand | MECH |
| B1 | All in: both hands shove forward together, grinning | MECH |
| B2 | Show: right hand slaps palm up | MECH |
| B3 | Big win: both fists raised, a gleeful, nasty grin (`win_big`) | BEAT |
| B4 | The displeasing smile, slow and wide | TELL |
| B5 | Sucks his teeth, head cocked (decoy for B4) | IDLE |
| B6 | Drums his hairy knuckles on the felt | TELL |
| C1 | Cracks his knuckles (decoy for B6) | IDLE |
| C2 | Hunches down into the too-big coat, collar up round his ears | TELL |
| C3 | Shoves the long sleeves back up his arms (decoy for C2) | IDLE |
| C4 | Glares round the table | IDLE |
| C5 | Sniggers to himself, a hand over his mouth | IDLE |
| C6 | Arrive: scrambling up into the chair, the big coat slipping off one shoulder | BEAT |
| D1 | Talking: jabbing a finger, husky | BEAT |
| D2 | Facing a big bet: chin low, eyes narrowed, a hand on the broken cane | BEAT |
| D3 | Lost a pot: a sneer, a shove of the hand | BEAT |
| D4 | Crushing loss: both fists slammed on the felt, teeth bared (`lose_big`) | BEAT |
| D5 | Heads up: leaning in low on both forearms | BEAT |
| D6 | A cackle, head thrown back | BEAT |

## Prompts

Draw Jekyll first. One fresh ChatGPT chat for all six. The first prompt attaches TWO images, in this order: JEKYLL's character sheet (`art-tools/jekyll_parts/sources/jekyll_sheet.png`), for the layout AND the coat Hyde wears, then the Headless Horseman's approved character sheet for the style. From the second prompt on, attach Hyde's own character sheet, his pose sheet A once it exists, AND the Horseman's character sheet again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Edward Hyde, of Robert Louis Stevenson's Strange Case of Dr Jekyll and Mr Hyde (1886), as Stevenson describes him. Copy the LAYOUT of the FIRST attached sheet (Dr. Jekyll's: what goes where) and Jekyll's CLOTHES from it, but NOT his face, size or build. Take the STYLE from the SECOND attached image.

Mr. Hyde: a SMALL, pale, dwarfish young man who gives an impression of deformity without any malformation you could name: narrow shoulders, a slight stoop, a sharp, pale, too-young face, unkempt black hair, heavy black brows over small bright eyes, and a displeasing smile with small yellowed teeth. His hands are lean, corded and knuckly, of a dusky pallor and thick with dark hair. He wears JEKYLL's clothes from the first sheet, enormously too large for him: the dark frock coat hanging off his shoulders, its sleeves turned back over and over, the grey waistcoat sagging, the high collar sprawling, the black cravat loose. His prop: the broken half of a heavy cane of dark, tough wood, splintered at one end. NOT a hulking brute, NOT ape-like, NO fangs, NO claws, NO monster make-up: horribly ordinary. Not a likeness of any actor; nothing from any film.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same scale as the first sheet (so he is clearly SMALLER than Jekyll):
- Finished heads, each with the neck, the sprawling collar and the loose cravat: sullen; talking, mouth open mid-word; the displeasing smile, wide and crooked; sneering
- The torso in the too-big coat and waistcoat: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the too-long coat sleeves turned back over and over, the hairy wrists showing, lying on a table, pointing toward its centre, open at the elbow end
- On its own: the broken half of the heavy dark cane
- Four seated reference poses, waist up behind the curved edge of a round green poker table, the table's edge high on his chest, forearms resting on it, hands apart, the broken cane on the felt beside his right hand (the left of the picture): neutral; the displeasing smile; drumming his hairy knuckles on the felt; hunched down into the coat, collar up

STYLE, the most important rule: match the SECOND attached image (the Headless Horseman, from the same table) exactly: a GOTHIC GRAPHIC-NOVEL style for a grown-up card game, halfway between a bright cartoon and a dark painted illustration. Take NOTHING of his character: no armour, no pumpkin, no cloak. Keep what the game needs: a bold dark outline round every shape, big clear readable shapes, a silhouette that reads at a tiny size. Adult, realistic proportions (never a big head, never chibi, never cute); shading in three or four tones with deep, dramatic shadows and a warm rim light from candlelight; rich but MUTED colour, nothing candy-bright; cloth with real weight and heavy folds; a little texture in the shadows only. Serious and sombre. NOT a children's cartoon, NOT cute, NOT toy-like, NOT round and bouncy, NOT photoreal, NOT muddy or murky.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Mr. Hyde, exactly as on the attached character sheet (a small, pale, dwarfish young man with something wrong about him that you cannot name, unkempt black hair, heavy black brows, a sharp pale face and a displeasing smile with small yellowed teeth, lean corded hands thick with dark hair; wearing Jekyll's dark frock coat, grey waistcoat and black cravat, all far too big for him, the sleeves turned back over and over, the collar sprawling; the broken half of a heavy dark cane on the felt beside his right hand, colours, line weight, gothic style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the top of his hair included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. He is SMALL in every pose: the table's edge comes up high on his chest and his head sits well below the top of the cell. He wears Jekyll's frock coat, far too big for him. The broken half of the heavy cane lies on the felt beside his right hand (the left of the picture) unless the pose says otherwise. NOT a hulking brute, NOT ape-like, NO fangs, NO claws, NO monster make-up: a small, pale, horribly ordinary man. Keep the gothic graphic-novel style of the attached sheets and of the Headless Horseman's sheet: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; serious and sombre, NOT a children's cartoon, NOT cute.

1. At rest: both forearms lying along the table's edge, his hairy hands resting on the felt in front of him, a hand's width apart, NOT touching, NOT laced, NOT overlapping; the broken half of a heavy dark cane lying on the felt beside his right hand; a sullen, watchful look, mouth closed
2. Peeking at his cards: his right hand cupped low over the felt in front of him, thumb lifted a little, as if shielding something small; eyes down, sly
3. Checking: rapping the felt with the knuckles of his right hand
4. Calling: his right hand flat, shoving forward along the felt
5. Betting: leaning in, his right hand shoved well forward along the felt, a mean look
6. Folding: a contemptuous flick of his right hand toward the middle of the table

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No top hat, no fangs, no claws, no blood, no chair, no cards, no chips.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Mr. Hyde, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same small size, pale face, unkempt black hair, hairy hands, Jekyll's too-big frock coat and the broken cane.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). He is SMALL in every pose: the table's edge comes up high on his chest and his head sits well below the top of the cell. He wears Jekyll's frock coat, far too big for him. The broken half of the heavy cane lies on the felt beside his right hand (the left of the picture) unless the pose says otherwise. NOT a hulking brute, NOT ape-like, NO fangs, NO claws, NO monster make-up: a small, pale, horribly ordinary man. Keep the gothic graphic-novel style of the attached sheets and of the Headless Horseman's sheet: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; serious and sombre, NOT a children's cartoon, NOT cute.

1. All in: both hands shoving forward along the felt together, a wide, nasty grin
2. Showing: his right hand slapped palm up on the felt, as if slapping something over
3. A big win: both hairy fists raised high, a gleeful, nasty grin, the big coat falling back off his shoulders
4. The displeasing smile: a slow, wide, crooked smile showing small yellowed teeth, eyes on the viewer; arms as at rest
5. Sucking his teeth, head cocked to one side, eyes half shut; arms as at rest
6. Drumming the hairy knuckles of his right hand on the felt, two short motion lines beside them; left arm as at rest

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No top hat, no fangs, no claws, no blood, no chair, no cards, no chips.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Mr. Hyde, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same small size, pale face, unkempt black hair, hairy hands, Jekyll's too-big frock coat and the broken cane.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). He is SMALL in every pose: the table's edge comes up high on his chest and his head sits well below the top of the cell. He wears Jekyll's frock coat, far too big for him. The broken half of the heavy cane lies on the felt beside his right hand (the left of the picture) unless the pose says otherwise. NOT a hulking brute, NOT ape-like, NO fangs, NO claws, NO monster make-up: a small, pale, horribly ordinary man. Keep the gothic graphic-novel style of the attached sheets and of the Headless Horseman's sheet: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; serious and sombre, NOT a children's cartoon, NOT cute.

1. Cracking his knuckles, both hairy hands laced and pushed outward in front of him
2. Hunching down into the too-big frock coat, shoulders up, the collar turned up round his ears, eyes peering out; arms as at rest
3. Shoving the too-long coat sleeve back up his left forearm with his right hand
4. Glaring round the table, chin down, eyes moving; arms as at rest
5. Sniggering to himself, his right hand over his mouth, eyes creased
6. Just scrambling up into the chair, the big coat slipping off one shoulder, both hands gripping the table's edge, grinning round at the table

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No top hat, no fangs, no claws, no blood, no chair, no cards, no chips.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Mr. Hyde, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same small size, pale face, unkempt black hair, hairy hands, Jekyll's too-big frock coat and the broken cane.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). He is SMALL in every pose: the table's edge comes up high on his chest and his head sits well below the top of the cell. He wears Jekyll's frock coat, far too big for him. The broken half of the heavy cane lies on the felt beside his right hand (the left of the picture) unless the pose says otherwise. NOT a hulking brute, NOT ape-like, NO fangs, NO claws, NO monster make-up: a small, pale, horribly ordinary man. Keep the gothic graphic-novel style of the attached sheets and of the Headless Horseman's sheet: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; serious and sombre, NOT a children's cartoon, NOT cute.

1. Talking: jabbing a hairy forefinger at the table, mouth open mid-word
2. Facing a big bet: chin low, eyes narrowed, his right hand resting on the broken cane
3. Lost a pot: a sneer, his right hand shoving the air away
4. A crushing loss: both hairy fists slammed down on the felt, teeth bared, leaning forward
5. Down to two players: leaning in low on both forearms, eyes level and bright
6. A cackle, head thrown back, mouth wide, one hand slapping the felt

No cards and no chips anywhere: the hands are empty. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No top hat, no fangs, no claws, no blood, no chair, no cards, no chips.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Mr. Hyde's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the mouths too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the neck, the sprawling collar and the loose cravat, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed, mean; wide (one piece each, both eyes with the skin around them)
- His heavy brows raised; his heavy brows drawn down (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it (he is clean-shaven), cut straight across just under the nose and again a little below the lower lip: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; the displeasing smile, wide and crooked, small yellowed teeth; a sneer; sucking his teeth
- His head turned toward the viewer, nearly front-on

Keep the gothic graphic-novel style of the attached sheets and of the Headless Horseman's sheet: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; serious and sombre, NOT a children's cartoon, NOT cute.
```
