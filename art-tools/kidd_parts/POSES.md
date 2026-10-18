# Captain William Kidd: every pose, and the prompts

The Pirate Cove's seat 1 (the player's left), so he is drawn facing the
viewer's right and is never mirrored. He is built the way Athens and
Blackbeard were (`art-tools/pose_rig.py`): a rest pose with a talking face,
and every other pose one of these drawings shown whole.

His look, from his character file: a respectable merchant captain, not a
cartoon buccaneer. A full-bottomed wig under a plain three-cornered hat, a
good broadcloth coat buttoned high, a cravat he keeps loosening at the
throat; a heavy, anxious face, forever checking behind him. His tell surface
is the coat itself: the broad buttoned chest, where one hand keeps patting
for something in the inside pocket.

Ruled out: Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon
buried-treasure pirate (no eyepatch, no parrot, no skull, no cutlass in
hand). He should look like what he always claimed to be: an honest captain
with papers. He was hanged in 1701; his "rubs his neck" idle stays an
ordinary tired gesture, never a noose.

The first prompt borrows Blackbeard's character sheet for its LAYOUT AND
STYLE ONLY, and bans his look by name: the two must read apart at a glance,
one a showman in braids and smoke, the other a nervous man in a good coat.

Tags (MOTION-SPEC.md): MECH a poker action, IDLE noise, BEAT a mood, TELL
one of his three tells, each drawn beside the idle it hides among: patting
his coat where a map might be (strong) beside straightening his coat's
front; chewing his lip (bluffing) beside loosening his cravat; glancing over
his shoulder (weak) beside squinting at the lamp.

| # | Pose | Tag |
|---|---|---|
| A1 | Rest: forearms on the table's edge, hands resting apart, coat buttoned high | IDLE |
| A2 | Peeking at his cards (right hand) | MECH |
| A3 | Check: two fingers tap the felt (right hand) | MECH |
| A4 | Call: slides a short stack forward (right hand) | MECH |
| A5 | Bet: pushes a huge stack far forward, both hands, greedy | MECH |
| A6 | Fold: pushes his cards away, aggrieved (right hand) | MECH |
| B1 | All in: both hands shove his whole stack | MECH |
| B2 | Show: turns his cards over (right hand) | MECH |
| B3 | Collect the pot: both arms round it, drawing it close | MECH |
| B4 | Pats his coat over the inside pocket (right hand) | TELL |
| B5 | Straightens the front of his coat with both hands (decoy for B4) | IDLE |
| B6 | Chews his lip, eyes on the pot | TELL |
| C1 | Loosens his cravat with two fingers (decoy for B6) | IDLE |
| C2 | Glances over his shoulder, head turned back | TELL |
| C3 | Squints up at the lamp, hand shading his eyes (decoy for C2) | IDLE |
| C4 | Rubs the back of his neck, tired (right hand) | IDLE |
| C5 | Counts coins that aren't there, fingertips on the felt | IDLE |
| C6 | Tips his hat to the room | IDLE |
| D1 | Talking: a finger raised, protesting his case | BEAT |
| D2 | Facing a big bet: a greedy, calculating look | BEAT |
| D3 | Lost a pot: aggrieved, both palms up, "this is robbery" | BEAT |
| D4 | Won a pot: a relieved, greedy grin, hands on his chips | BEAT |
| D5 | Heads up: leaning in on both forearms, anxious and fixed | BEAT |
| D6 | Knocked out: rises, holding out a folded paper, protesting | BEAT |

## Prompts

One fresh ChatGPT chat for all six. The first prompt attaches Blackbeard's
character sheet (`art-tools/blackbeard_parts/sources/blackbeard_sheet.png`)
and nothing else, for its layout and style only. From the second prompt on,
attach Kidd's own character sheet and, once it exists, his pose sheet A, and
nothing of anyone else's.

### Character sheet

```
Character sheet for 2D animation rigging: Captain William Kidd (hanged 1701), as he always claimed to be: an honest New York merchant captain with papers. Copy ONLY the LAYOUT and the flat cartoon STYLE of the attached sheet (bold dark outlines, clean painted shading, warm light, the same line weight): take NOTHING of its character. No black beard, no braids, no ribbons, no smoking matches, no pistols, no pistol sling, no worn brown coat.

Kidd: a heavy-set man in his fifties, clean-shaven, a heavy, anxious face with worried eyes, forever checking behind him; a full-bottomed powdered grey wig falling to his shoulders under a plain black three-cornered hat; a good dark blue broadcloth coat buttoned high to the chest with brass buttons, a plain white cravat at the throat, a little loose, white shirt cuffs. Respectable, prosperous, nervous; never a cartoon buccaneer: no eyepatch, no parrot, no skull, no cutlass, no gold earring. Nothing from any film.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, facing the viewer's right. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile.

Draw, all facing the viewer's right, at the same size:
- Finished heads, each with the hat, the wig and the top of the coat and cravat: neutral, anxious; talking, mouth open mid-word; chewing his lower lip; glancing back over his shoulder
- The torso in the buttoned coat: no head, cut off straight below the waist, the upper arms down to the elbows; NO forearms, NO hands
- Two forearms in the coat sleeves with white cuffs, lying on a table, pointing toward its centre, open at the elbow end
- Four seated reference poses, waist up behind the curved edge of a round green poker table, forearms resting on its edge, hands apart: neutral; patting his coat over the inside pocket; chewing his lip; glancing over his shoulder
```

### Pose sheet A

```
Character pose sheet for 2D animation reference: Captain Kidd, exactly as on the attached character sheet (full-bottomed grey wig, plain black three-cornered hat, dark blue coat buttoned high with brass buttons, white cravat, white cuffs, anxious clean-shaven face, colours, line weight, flat cartoon style).

Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. Leave a little white between him and the cell's edges, hat included: nothing of him is cut off. Nothing below the table edge. No chair: nothing at all behind him, just white.

IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand.

1. At rest: both forearms lying along the table's edge, his hands resting on the felt in front of him, a hand's width apart, relaxed and NOT touching, NOT laced, NOT overlapping; an anxious look, mouth closed
2. Peeking at his cards: his right hand cupped over two cards on the felt, thumb lifting the near corner, eyes down
3. Checking: two fingers of his right hand tapping the felt
4. Calling: his right hand sliding a short stack of chips forward, palm behind it
5. Betting: both hands pushing a huge stack of chips far forward, leaning in, greedy
6. Folding: his right hand pushing two cards away face down, aggrieved

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No eyepatch, no parrot, no skull, no cutlass, no chair.
```

### Pose sheet B

```
Character pose sheet for 2D animation reference: Captain Kidd, exactly as on the attached sheets, drawn to match the attached pose sheet: same size, same angle, same place in each cell, same table edge height, same wig, hat, coat and cravat.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the first pose of the attached sheet (hands resting apart).

1. All in: both hands shoving his whole stack of chips forward, leaning over the table
2. Showing: his right hand turning two cards face up; the card faces are BLANK white, no ranks, no suits
3. Collecting the pot: both arms round a pile of chips on the felt, drawing it close to him
4. Patting the left breast of his buttoned coat with his right hand, over the inside pocket, as if checking something is there
5. Straightening the front of his coat with both hands, tugging it smooth
6. Chewing his lower lip, eyes on the middle of the table; arms as at rest

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No eyepatch, no parrot, no skull, no cutlass, no chair.
```

### Pose sheet C

```
Character pose sheet for 2D animation reference: Captain Kidd, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same wig, hat, coat and cravat.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).

1. Loosening his cravat with two fingers of his right hand, uncomfortable
2. Glancing back over his shoulder, head turned away from the table, worried; arms as at rest
3. Squinting up at a lamp, his right hand raised to shade his eyes
4. Rubbing the back of his neck with his right hand, tired
5. Counting coins that are not there: the fingertips of his right hand tapping the empty felt one by one, lips moving
6. Tipping his hat to the room with his right hand, polite

Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No eyepatch, no parrot, no skull, no cutlass, no chair.
```

### Pose sheet D

```
Character pose sheet for 2D animation reference: Captain Kidd, exactly as on the attached sheets, drawn to match the attached pose sheets: same size, same angle, same place in each cell, same table edge height, same wig, hat, coat and cravat.

Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind him, nothing of him cut off by the cell's edge. Nothing below the table edge. The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).

1. Talking: his right hand raised, one finger up, protesting his case
2. Facing a big bet: a greedy, calculating look, eyes narrowed; arms as at rest
3. Lost a pot: aggrieved, both palms turned up, as if to say "this is robbery"
4. Won a pot: a relieved, greedy grin, both hands resting on a pile of chips in front of him
5. Down to two players: leaning in over the table on both forearms, anxious and fixed
6. Knocked out: rising from his seat, holding out a folded paper in his right hand, protesting

Cards have plain dark backs. Pure white background around each pose; poses do not touch. No text, no numbers, no labels. No eyepatch, no parrot, no skull, no cutlass, no chair.
```

### Face overlay sheet

```
Character sheet for 2D animation rigging: Captain Kidd's face overlays, exactly matching the attached sheets' style, colours and line weight.

Every piece is drawn at EXACTLY the angle and size of his head in the at-rest pose (three-quarter, facing the viewer's right), so each one can be laid over that head. Draw that head once, top left, with the hat, the wig, the cravat and the top of the coat, as the reference, mouth closed. Then every piece separate, with a closed dark outline and a wide gap all round it; nothing touches. Pure white background (#FFFFFF). No text, no labels.

- His eyes with the lids half closed; closed; looking toward the viewer; looking down at the table; looking to the side, worried; narrowed, greedy (one piece each, both eyes with the skin around them)
- His brows raised, worried; his brows drawn together (one piece each, both brows)
- Lower-face patches, each the mouth with the chin and jaw around it, clean-shaven, cut straight across just under the nose: closed at rest; open "ah"; wide "ee"; round "oh"; pursed "oo"; lips pressed "m"; lower lip under the teeth "f"; tongue tip behind the teeth "l"; chewing his lower lip; a greedy grin; aggrieved, mouth turned down
- His head turned back over his shoulder, worried
- His head turned toward the viewer, nearly front-on
```

### Reactions sheet (E): the big win and the crushing loss

The owner's reactions, sized by the pot: an ordinary win is a nod and a smile
the puppet already has (`win_small`, art-tools/build/win_small.py); a pot worth
most of his stack plays the big win, and losing one the crushing loss. Pose 1
is his rest pose again, only to measure the sheet by. Attach
`art-tools/kidd_parts/sources/poses_a.png` FIRST, then
`art-tools/kidd_parts/sources/kidd_sheet.png`, and nothing of anyone else's.

```
Character pose sheet for 2D animation reference: Captain Kidd, exactly as on the attached sheets, drawn to match the FIRST attached pose sheet: same size, same angle, same table edge height, same wig, hat, coat and cravat.

Draw 3 poses side by side in one row across the middle of the picture, each the same size as the poses on the attached pose sheet. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, nothing behind him, no chair, nothing of him cut off by the edge of the picture (raised hands included). Nothing below the table edge. In every pose his hat stays on his head.

1. EXACTLY his at-rest pose, the top-left pose of the attached pose sheet, copied as it is
2. A big win: both arms raised high above his head, hands open, a wide relieved grin of a man finally paid what he is owed
3. A crushing loss: his head sunk into one hand, elbow on the table, eyes shut, a bitter frown: a man the law has turned against again

No cards and no chips anywhere: his hands are empty. Pure white background around each pose; the poses do not touch. No text, no numbers, no labels. No treasure chest, no map, no sword, no noose, no chair.
```
