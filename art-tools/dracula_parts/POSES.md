# Count Dracula: every pose, and the prompts

Transylvania's champion: he watches from the chair by the fire (a presence piece in the room) and sits down in the first chair to come free, so like Caesar he is drawn facing the viewer's right and MIRRORED by the game as the seat needs. Built the way the Wolf Man and the Horseman are (`art-tools/pose_rig.py`, a short `rig_spec.json`), in the GOTHIC style: the Horseman's approved character sheet is the style image.

His look is the owner's ("I want him similar to this": `sources/look_reference.png`, and the seated `sources/look_reference_seated.png`): young and gaunt rather than Stoker's old man with the white moustache (Stoker's Count grows younger as he feeds, and he has fed), black hair swept back from a widow's peak, pointed ears, red eyes, fangs, long black nails; a black coat, a red brocade waistcoat, a white jabot, a red cravat with a ruby brooch, a ruby ring, and a black cape lined in red with a high standing collar. The cape is the 1927 stage play's and public domain in the US (ASSETS.md); what stays out is Bela Lugosi's likeness and Universal's film designs: not his face, no medallion on a ribbon, nothing from any film. Red eyes, pointed ears and fangs keep him clear of it.

Tags (MOTION-SPEC.md): his three tells, each beside the idle it hides among: one eyebrow raised (strong) beside a smile that does not show his teeth (the face both times); sipping from his chalice (bluffing), which is ALSO one of his idles, the same drawing: the noise is the tell's own twin; steepled fingers (weak) beside a fingernail run slowly along the table (the hands both times). Watching the pulse in someone's throat is C3. The chalice is his signature prop (the design doc: his cluster is eyebrows + chalice): it stands on the felt by his right hand in every pose but the ones that lift it. B3 and D4 are the big win and the crushing loss; his hands are otherwise empty (the game moves the cards and chips). C6 is `arrive`, played as he sits down. Knocked out, he says his line and fades from the chair.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands apart, the chalice by his right hand, a thin closed smile | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: one long black nail taps the felt | MECH |
| A4 | Call: right hand pushes forward along the felt | MECH |
| A5 | Bet: leans in, right hand pushed well forward | MECH |
| A6 | Fold: a bored flick of the fingers | MECH |
| B1 | All in: both hands push forward together | MECH |
| B2 | Show: right hand turns palm up | MECH |
| B3 | Big win: both hands raised and spread, the cape opening like wings, fangs bared (`win_big`) | BEAT |
| B4 | Raises one eyebrow | TELL |
| B5 | Smiles without showing his teeth (decoy for B4) | IDLE |
| B6 | Steeples his fingers | TELL |
| C1 | Runs a fingernail along the table (decoy for B6) | IDLE |
| C2 | Sips from his chalice (a tell AND an idle: the same drawing) | TELL |
| C3 | Watches the pulse in someone's throat | IDLE |
| C4 | Turns to look at you | IDLE |
| C5 | Swirls the wine in his chalice (a fidget) | IDLE |
| C6 | Arriving: sweeps his cape back as he takes the chair (`arrive`) | BEAT |
| D1 | Talking: one long hand raised, palm open | BEAT |
| D2 | Facing a big bet: sits back, looking down his nose | BEAT |
| D3 | Lost a pot: a thin, cold smile, eyes narrowed | BEAT |
| D4 | Crushing loss: a snarl, fangs bared, nails gouging the felt (`lose_big`) | BEAT |
| D5 | Heads up: leaning in on both forearms | BEAT |
| D6 | A low laugh, head tipped back, fangs showing | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches THREE images, in this order: Lancelot's character sheet (`art-tools/lancelot_parts/sources/lancelot_sheet.png`) for the layout, the Headless Horseman's approved character sheet (`art-tools/headless_horseman_parts/sources/headless_horseman_sheet.png`) for the style, and the owner's Dracula (`art-tools/dracula_parts/sources/look_reference.png`) for his look. From the second prompt on, attach Dracula's own character sheet, his pose sheet A once it exists, AND the Horseman's character sheet again, and nothing else.

### Character sheet

```
Character sheet for 2D animation rigging: Count Dracula, of Bram Stoker's Dracula (1897). Copy ONLY the LAYOUT of the FIRST attached sheet (what goes where): take NOTHING of its character. No plate armour, no striped surcoat, no long hair. Take the STYLE from the SECOND attached image, and his LOOK from the THIRD: his face, hair, ears, eyes, clothes and colours, redrawn in the style of the SECOND.

Count Dracula, as in the THIRD attached image: a tall, thin, ageless nobleman, gaunt and very pale, with a long, hard face, high cheekbones, a thin high-bridged nose and heavy dark brows that almost meet; black hair swept straight back from a sharp widow's peak and falling to his collar; pointed ears; blood-red eyes; very red lips over two sharp white fangs; long pale fingers with long black nails. A long black coat, a dark red brocade waistcoat, a white ruffled jabot and a blood-red cravat pinned with a gold-set ruby brooch, white ruffled shirt cuffs, a gold ring with a ruby on his right hand. Over it all a black cape lined in blood red, its high stiff collar standing up behind his head in two points. His prop: a dark, heavy iron chalice, plain and old, full of red wine. Courteous, patient, amused and dangerous: a host watching his guests. Not a likeness of any actor; nothing from any film; no medallion on a ribbon.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the neck, the jabot, the cravat and the high cape collar behind: a thin closed smile; talking, mouth open mid-word, the fangs showing; one eyebrow raised; a cold, fanged snarl
- The torso in the coat, waistcoat and cape, the high collar standing up behind where the head goes: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the black coat sleeves with white ruffled cuffs and long pale hands with black nails, lying on a table, pointing toward its centre, open at the elbow end
- On its own: the dark iron chalice of red wine
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart, the chalice on the felt beside his right hand (the left of the picture): a thin closed smile; one eyebrow raised; fingers steepled in front of his chin; sipping from the chalice

STYLE, the most important rule: match the SECOND attached image (the Headless Horseman, from the same table) exactly: a GOTHIC GRAPHIC-NOVEL style for a grown-up card game, halfway between a bright cartoon and a dark painted illustration. Take NOTHING of his character: no armour, no pumpkin. Keep what the game needs: a bold dark outline round every shape, big clear readable shapes, a silhouette that reads at a tiny size. Adult, realistic proportions (never a big head, never chibi, never cute); shading in three or four tones with deep, dramatic shadows and a warm rim light from candlelight; rich but MUTED colour (black, oxblood and blood red, ivory, old gold), nothing candy-bright; cloth with real weight and heavy folds; a little texture in the shadows only. Elegant, cold and dangerous. NOT a children's cartoon, NOT cute, NOT toy-like, NOT round and bouncy, NOT photoreal, NOT muddy or murky.
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Count Dracula, exactly as on the attached character sheet (a tall, thin, ageless nobleman, gaunt and very pale, black hair swept back from a sharp widow's peak to his collar, pointed ears, heavy dark brows that almost meet, blood-red eyes, very red lips, two sharp white fangs, long black nails; a long black coat, a dark red brocade waistcoat, a white ruffled jabot and a blood-red cravat pinned with a gold-set ruby brooch, white ruffled shirt cuffs, a gold ruby ring on his right hand; over it all a black cape lined in blood red, its high stiff collar standing up behind his head like two points; a dark, heavy iron chalice of red wine on the felt beside his right hand, colours, line weight, gothic style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, the two points of his high cape collar included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand. The dark iron chalice of red wine stands on the felt beside his right hand (the left of the picture) unless the pose says otherwise. The high red-lined collar of his cape stands up behind his head in every pose. His mouth is closed, without showing his fangs, unless the pose says otherwise. Keep the gothic graphic-novel style of the attached character sheets: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; elegant and dangerous, NOT a children's cartoon, NOT cute.

1. At rest: both forearms lying along the table's edge, his long pale hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; the dark iron chalice on the felt beside his right hand; a thin closed smile, eyes on the table
2. Peeking at his cards: his right hand cupped low over the felt in front of him, thumb lifted a little, as if shielding something small; eyes down
3. Checking: one long black fingernail of his right hand tapping the felt
4. Calling: his right hand flat, fingertips leading, pushing forward along the felt
5. Betting: leaning in, his right hand pushed well forward along the felt, unhurried
6. Folding: a bored flick of the fingers of his right hand toward the middle of the table

No cards and no chips anywhere: his hands hold nothing but the chalice, and only where a pose says so. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No medallion on a ribbon, no bats, no coffin, no mirror, no chair, no cards, no chips.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Count Dracula, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same pale face, swept-back black hair and widow's peak, pointed ears, red eyes, black coat, red brocade waistcoat, white jabot, ruby brooch, red-lined high-collared cape and dark iron chalice.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The dark iron chalice of red wine stands on the felt beside his right hand (the left of the picture) unless the pose says otherwise. The high red-lined collar of his cape stands up behind his head in every pose. His mouth is closed, without showing his fangs, unless the pose says otherwise. Keep the gothic graphic-novel style of the attached character sheets: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; elegant and dangerous, NOT a children's cartoon, NOT cute.

1. All in: both hands pushing forward along the felt together, leaning in, a cold smile
2. Showing: his right hand turning palm up from the felt, as if turning something over
3. A big win: both hands raised and spread wide above his shoulders, the cape opening behind them like wings, a triumphant smile showing his fangs
4. Raising ONE eyebrow, high and sharp, the other level; a faint knowing look; the rest of him perfectly still, arms as at rest
5. A slow smile with closed lips, NOT showing his teeth; arms as at rest
6. Steepling his fingers: both elbows on the table's edge, the long fingertips pressed together in front of his chin, nails touching

No cards and no chips anywhere: his hands hold nothing but the chalice, and only where a pose says so. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No medallion on a ribbon, no bats, no coffin, no mirror, no chair, no cards, no chips.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Count Dracula, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same pale face, swept-back black hair and widow's peak, pointed ears, red eyes, black coat, red brocade waistcoat, white jabot, ruby brooch, red-lined high-collared cape and dark iron chalice.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The dark iron chalice of red wine stands on the felt beside his right hand (the left of the picture) unless the pose says otherwise. The high red-lined collar of his cape stands up behind his head in every pose. His mouth is closed, without showing his fangs, unless the pose says otherwise. Keep the gothic graphic-novel style of the attached character sheets: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; elegant and dangerous, NOT a children's cartoon, NOT cute.

1. Running one long black fingernail slowly along the felt in front of him with his right hand, watching the table; left arm as at rest
2. Sipping from the dark iron chalice, held up to his lips in his right hand, eyes over the rim on the table; left arm as at rest
3. Watching the pulse in someone's throat: his eyes fixed on someone toward the right of the picture, at the level of their neck, lips just parted over the tips of his fangs; arms as at rest
4. Turning his head and shoulders toward the viewer, looking straight at the viewer with a slight, polite smile; arms as at rest
5. Swirling the wine slowly in the dark iron chalice, held a little above the felt in his right hand, watching the wine; left arm as at rest
6. Just sitting down at the table: sweeping the cape back off his right shoulder with his right hand as he takes the chair, his left hand on the table's edge, gracious and unhurried

No cards and no chips anywhere: his hands hold nothing but the chalice, and only where a pose says so. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No medallion on a ribbon, no bats, no coffin, no mirror, no chair, no cards, no chips.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Count Dracula, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same pale face, swept-back black hair and widow's peak, pointed ears, red eyes, black coat, red brocade waistcoat, white jabot, ruby brooch, red-lined high-collared cape and dark iron chalice.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart). The dark iron chalice of red wine stands on the felt beside his right hand (the left of the picture) unless the pose says otherwise. The high red-lined collar of his cape stands up behind his head in every pose. His mouth is closed, without showing his fangs, unless the pose says otherwise. Keep the gothic graphic-novel style of the attached character sheets: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; elegant and dangerous, NOT a children's cartoon, NOT cute.

1. Talking: his right hand raised a little, palm open, the long fingers loose, mouth open mid-word, the fangs showing
2. Facing a big bet: sitting back, chin raised, looking down his nose at the table, both hands flat on the felt
3. Lost a pot: a thin, cold smile, eyes narrowed; arms as at rest
4. A crushing loss: a furious snarl, fangs bared, eyes blazing red, leaning forward, both hands clawed on the felt, the long black nails gouging it
5. Down to two players: leaning in on both forearms, eyes level, red eyes glinting
6. A low laugh, head tipped back a little, the fangs showing, his right hand resting on his chest

No cards and no chips anywhere: his hands hold nothing but the chalice, and only where a pose says so. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No medallion on a ribbon, no bats, no coffin, no mirror, no chair, no cards, no chips.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Count Dracula's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head: the eyes and the mouths too are turned three-quarter, toward the viewer's right, NOT front-on and NOT symmetrical. Draw that head once, top left, with the neck, the jabot and the high cape collar behind it, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His red eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side; narrowed; wide, blazing (one piece each, both eyes with the skin around them)
- His brows: ONE raised high (his left, the right of the picture), the other level; both drawn down in a frown (one piece each, both brows)
- Lower-face patches, each the mouth with the skin around it (he is clean-shaven), cut straight across just under the nose and again a little below the lower lip: closed at rest, a thin smile; open "ah", the fangs showing; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; a smile with closed lips; a wide smile showing the fangs; a snarl, fangs bared
- His head turned toward the viewer, nearly front-on

Keep the gothic graphic-novel style of the attached character sheets: bold dark outlines, adult proportions, deep three- or four-tone shading, a warm candlelit rim light, rich muted colour; elegant and dangerous, NOT a children's cartoon, NOT cute.
```
