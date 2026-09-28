# Character art prompts

Every character in the game, grouped by table. The descriptions come from `data/characters/*.json`; the parts lists are written from each character's look, prop, tells and idles, so every tell and idle the game shows has a piece to animate it.

## Status

The pipeline is proven (cut, label, lay out a puppet), but **every character is to be drawn fresh** under the decisions below. FDR's and Lincoln's kits in `art-tools/` were drawn front-on and stay only as working examples of the pipeline; Lincoln's face read as apelike and he now wears his hat. Dracula's parts are in an older style.

## The table, the seats and the layers

- **Style:** the bright cartoon look of the FDR and Lincoln tests (bold outlines, warm painted shading), not the dark, gritty look of the table mock-ups.
- **Waist up, at a round table.** We see everyone from the table up: no knees, legs or feet are ever on screen, so props live on the felt, in the hands or on the body. The torso is still drawn down to the lap, because the table's curved edge crosses each seat at a different height and has to cover it.
- **One seat angle: three-quarter.** Every opponent sits around the table facing its centre, so each character is drawn once, turned about 30 degrees to the viewer's right (a seat on the table's left), and **mirrored** for seats on the right. Seats further back are the same puppet, smaller. Mirroring flips anything one-sided (a ring hand, a parrot's shoulder, a parting): fine, as long as it is the same in every piece. The exception is **Death**, the dealer, who sits at the far side facing us and is drawn front-on.
- **Near and far.** In three-quarter view the near eye, brow, arm and hand are bigger than the far ones, so sheets ask for both.
- **Layers, back to front:** far arm, torso, head (hair, face, hat), then the **table**, whose rounded edge hides everything below it, then the near forearm, the hands and anything on the felt. Hands and forearms resting on the table sit above the table layer; the lap and belly sit under it.

## How to use this

1. **Step 1 — the reference portrait.** Paste the character's Step 1 prompt into ChatGPT and regenerate until it's right. This image is the character's model sheet; every part is matched to it.
2. **Step 2 — the parts sheets, one per message.** Up to five: face kit, body and arms, card-action hands, character hands, props and tell pieces. Attach the approved portrait to every sheet, and from Sheet 2 on attach the finished face kit too: separate generations drift in colour (FDR's extra mouths came back redder than his first set).
3. **Save each sheet as its own image.** A collage of several sheets with frames round them is cut as one piece per frame.
4. **Check each sheet before moving on.** Every piece on pure white with a gap all round it; pieces that touch are cut as one piece, and a white piece without a dark outline (a cuff, a pinafore, a skull) is cut away with the background. Soft glows, halos, glints, smoke and shadow overlays can't be cut cleanly from white: they're listed so you know they're needed, and are easiest made in the rig as a blurred, tinted shape.
5. **Missing parts:** image generators drop items from long lists. Ask again with the same rules and ONLY the missing parts: *"Same rules as before. A new sheet with only these parts: …"*
6. **Cut it:** `python3 art-tools/split_parts.py sheet.png -o art-tools/<id>_parts --name <id>_face` (needs `pip install pillow numpy scipy`). It writes each piece as a PNG, a numbered contact sheet and `parts.json`; fill in each piece's `label`.
7. **Lay out the puppet:** copy `art-tools/fdr_layout.json`, swap in the new character's pieces, and render with `python3 art-tools/build_puppet.py render art-tools/<id>_layout.json -o preview.png`. Pieces that share a `slot` are swaps for the same place (eyes, mouths, hands); only one is visible at a time. `"flip": true` mirrors a piece: it is how one hand of each pose serves both sides, and how a whole character moves to a seat on the other side of the table.

## Why the prompts ask for what they do (learned on FDR and Lincoln)

- **Bald blank head, no collar.** His first blank head had the hair and a shirt collar painted on; the collar had to be cut off before the head would sit in the torso's collar.
- **Torso with an empty collar and no arms.** Arms painted onto the torso can't move.
- **Whole eyes.** Asked for separate whites, irises and lids, the generator drew whole eyes anyway, and whole-eye swaps work well. In three-quarter view the near and far eye differ, so both are drawn.
- **Brows in three clearly different shapes.** "Four poses" came back as nine near-identical brows. Raised is a move, not a drawing.
- **Mouths only, same colour.** Asked alone, mouths came back as lower-face patches with a nose and chin, which leave a seam over the head.
- **Hands keep their cuff and a stub of sleeve.** FDR's first puppet had the cuffs cut off and bare hands set at the forearm's sleeve opening: they looked stuck on. The artist's own cuff-to-wrist join, laid over the end of the forearm, looks right. Hands are drawn once and mirrored, and the eight card actions get a sheet of their own: eight poses came back complete, a longer list lost some.
- **Clear lenses.** The pince-nez came back with solid grey lenses that hid his eyes.
- **Dignified faces.** Lincoln's first face kit read as apelike (heavy brow, wide nose, big ears). The style line now says human faces stay human, and his art note spells out what to avoid.

If a sheet comes back with one of these anyway, send it over: a colour match, a collar removal or a see-through lens is quicker to fix than to regenerate.

Shared style line for Step 1 (keep it identical for every character):

> Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

---

## The White House

### Franklin D. Roosevelt — *The Four-Term President*

- **Who:** Charming to everyone; candid with no one. He was sitting for a portrait when I arrived. It was never finished.
- **Look:** Silhouette: the naval cape across his shoulders and the long cigarette holder cocked upward from his teeth — a diagonal nobody else at the table has. Face: broad, chin lifted, pince-nez, a wide and ready smile. Prop: the cigarette holder; its angle is the tell surface and reads from across the room.
- **Prop:** Long cigarette holder
- **Tells:** tilts his cigarette holder upward; smiles broadly at the whole table; taps the ash from his holder
- **Idles:** adjusts his pince-nez; laughs at something nobody said; settles his cape across his shoulders; nods to someone across the room
- **Copyright note:** Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Franklin D. Roosevelt, The Four-Term President. Silhouette: the naval cape across his shoulders and the long cigarette holder cocked upward from his teeth — a diagonal nobody else at the table has. Face: broad, chin lifted, pince-nez, a wide and ready smile. Prop: the cigarette holder; its angle is the tell surface and reads from across the room.
Prop: Long cigarette holder.
IMPORTANT, must NOT resemble: Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Franklin D. Roosevelt, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Grey swept-back hair as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); a mouth gripping a cigarette holder in the teeth, smiling around it (holder NOT drawn). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Pince-nez with its cord, as a separate piece, with CLEAR lenses: only the rim and a faint highlight, so the eyes show through

Must NOT resemble: Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Franklin D. Roosevelt, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a dark three-piece suit with a white shirt and dark tie. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Naval cape: the back layer, and the left and right front drapes, as separate pieces
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Franklin D. Roosevelt, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Franklin D. Roosevelt, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand holding a long cigarette holder near the mouth
- Index finger tapping the holder (tapping ash)
- Fingers adjusting the pince-nez

Must NOT resemble: Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Franklin D. Roosevelt, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- The long cigarette holder alone, cigarette lit at the tip
- A flake of ash
- Wisps of smoke, 3 sizes

Must NOT resemble: Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.
```

### Abraham Lincoln — *The Rail-Splitter*

- **Who:** Saw Lee surrender at Appomattox. Five days later he went to the theatre.
- **Look:** Silhouette: the longest frame at the table, and taller still in the stovepipe hat he never takes off; he tips it, pushes it back, straightens it. Face, after the Brady and Gardner photographs: long and narrow, hollow cheeks under high cheekbones, deep-set tired eyes, a long straight nose, thin lips, the chin beard along the jaw with no moustache. Tell surface: the beard and his long hands, the largest moving shapes in his fifth of the screen.
- **Prop:** Stovepipe hat, always worn
- **Tells:** strokes his beard, slowly; leans back and folds his long hands; allows himself a small smile
- **Idles:** stretches his long back until the chair creaks; glances at the clock on the mantel; rubs his eyes; tips his hat to someone across the table
- **Copyright note:** Historical figure, died 1865; the Brady and Gardner photographs are public domain. Build from those. Avoid any modern screen likeness, including the 2012 Spielberg film, and anything from the vampire-hunter novel or film.
- **Art note:** Build his face from the Brady and Gardner photographs, and keep it dignified: a long, narrow, gaunt face and a kind, tired look. An earlier attempt read as apelike: no heavy jutting brow ridge, no flat or wide nose, no wide lipless mouth, no protruding jaw, no oversized ears. He wears the hat at all times.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Abraham Lincoln, The Rail-Splitter. Silhouette: the longest frame at the table, and taller still in the stovepipe hat he never takes off; he tips it, pushes it back, straightens it. Face, after the Brady and Gardner photographs: long and narrow, hollow cheeks under high cheekbones, deep-set tired eyes, a long straight nose, thin lips, the chin beard along the jaw with no moustache. Tell surface: the beard and his long hands, the largest moving shapes in his fifth of the screen.
Prop: Stovepipe hat, always worn.
IMPORTANT, must NOT resemble: Historical figure, died 1865; the Brady and Gardner photographs are public domain. Build from those. Avoid any modern screen likeness, including the 2012 Spielberg film, and anything from the vampire-hunter novel or film.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Abraham Lincoln, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: long and narrow, hollow cheeks under high cheekbones, ears of natural size, neck, and his chin beard along the jaw (NO moustache) painted on; NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Dark, untidy hair as a separate piece (only its sides and back show under the hat)
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes (deep-set and tired, under a straight brow, NOT a jutting one): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- A long, straight, fairly narrow nose as a separate piece
- Mouths, each a separate piece: lower-face patches this time, NOT mouth only: each is the mouth with the chin beard around it, cut straight across just under the nose, so it lays over the painted beard. Thin lips, a clean upper lip. Neutral; slight smile; open smile; broad smile; laughing; talking "ah"; talking "oh"; talking "ee"; lips pressed ("m/b/p"); "f/v"; tight-lipped; nervous; frown; angry grimace; a small, restrained smile. The beard in every patch matches the painted beard exactly, so they swap without a join. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- His stovepipe hat, as worn, in 4 positions: sitting straight; pushed back on his head; tipped forward, brim low (a nod); lifted an inch off his head (tipping it)

Note: Build his face from the Brady and Gardner photographs, and keep it dignified: a long, narrow, gaunt face and a kind, tired look. An earlier attempt read as apelike: no heavy jutting brow ridge, no flat or wide nose, no wide lipless mouth, no protruding jaw, no oversized ears. He wears the hat at all times.

Must NOT resemble: Historical figure, died 1865; the Brady and Gardner photographs are public domain. Build from those. Avoid any modern screen likeness, including the 2012 Spielberg film, and anything from the vampire-hunter novel or film.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Abraham Lincoln, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a long, lean frame in a black frock coat and a black bow tie. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Note: Build his face from the Brady and Gardner photographs, and keep it dignified: a long, narrow, gaunt face and a kind, tired look. An earlier attempt read as apelike: no heavy jutting brow ridge, no flat or wide nose, no wide lipless mouth, no protruding jaw, no oversized ears. He wears the hat at all times.

Must NOT resemble: Historical figure, died 1865; the Brady and Gardner photographs are public domain. Build from those. Avoid any modern screen likeness, including the 2012 Spielberg film, and anything from the vampire-hunter novel or film.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Abraham Lincoln, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Long, bony hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: Build his face from the Brady and Gardner photographs, and keep it dignified: a long, narrow, gaunt face and a kind, tired look. An earlier attempt read as apelike: no heavy jutting brow ridge, no flat or wide nose, no wide lipless mouth, no protruding jaw, no oversized ears. He wears the hat at all times.

Must NOT resemble: Historical figure, died 1865; the Brady and Gardner photographs are public domain. Build from those. Avoid any modern screen likeness, including the 2012 Spielberg film, and anything from the vampire-hunter novel or film.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Abraham Lincoln, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Long, bony hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand stroking the chin beard
- Both long hands folded together (one piece)
- Fingers rubbing tired eyes
- Fingers pinching the hat brim (hat NOT drawn)
- Hand holding the hat by its brim, lifted (hat drawn)

Note: Build his face from the Brady and Gardner photographs, and keep it dignified: a long, narrow, gaunt face and a kind, tired look. An earlier attempt read as apelike: no heavy jutting brow ridge, no flat or wide nose, no wide lipless mouth, no protruding jaw, no oversized ears. He wears the hat at all times.

Must NOT resemble: Historical figure, died 1865; the Brady and Gardner photographs are public domain. Build from those. Avoid any modern screen likeness, including the 2012 Spielberg film, and anything from the vampire-hunter novel or film.
```

### Theodore Roosevelt — *The Rough Rider*

- **Who:** Shot in Milwaukee, and gave the speech anyway. When I came for him he was asleep. It seemed wiser.
- **Look:** Silhouette: barrel chest, leaning forward on both elbows — the broadest shape at the table. Face: the heavy moustache and the enormous grin; the teeth must read at a fifth of a screen. Prop: round steel-rimmed spectacles. Taking them off to polish them is a big, readable gesture, and the grin does the rest.
- **Prop:** Round steel-rimmed spectacles
- **Tells:** grins, all teeth; drums his fingers on the felt; polishes his spectacles, hard
- **Idles:** squares his shoulders; checks his pocket watch; leans forward on both elbows; tugs at his moustache
- **Copyright note:** Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Theodore Roosevelt, The Rough Rider. Silhouette: barrel chest, leaning forward on both elbows — the broadest shape at the table. Face: the heavy moustache and the enormous grin; the teeth must read at a fifth of a screen. Prop: round steel-rimmed spectacles. Taking them off to polish them is a big, readable gesture, and the grin does the rest.
Prop: Round steel-rimmed spectacles.
IMPORTANT, must NOT resemble: Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Theodore Roosevelt, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Hair as a separate piece
- Heavy moustache as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); the enormous grin, all teeth (these must read small, so 3 versions: grin, bigger grin, biggest grin). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Round steel-rimmed spectacles as a separate piece, with CLEAR lenses: only the rim and a faint highlight, so the eyes show through

Must NOT resemble: Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Theodore Roosevelt, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a barrel chest, leaning forward on both elbows, in a dark suit. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Theodore Roosevelt, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Theodore Roosevelt, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hands holding the spectacles and polishing them hard with a handkerchief
- Fingers drumming on the felt
- Fingers tugging the moustache
- Hand holding a pocket watch

Must NOT resemble: Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Theodore Roosevelt, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A handkerchief
- A pocket watch, closed and open

Must NOT resemble: Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.
```

### George Washington — *Father of His Country* (champion)

- **Who:** Gave back an army, then a country, and nobody made him do either. His last words were 'Tis well. I saw no reason to argue.
- **Look:** Silhouette: the straightest back at the table, high collar, his own hair powdered and tied at the nape — not a wig. Face: long, heavy-jawed, the mouth set firm. Prop: the buff-and-blue general's coat with gold epaulettes; its cuffs and shoulders are the tell surface, so any change in that upright line reads at once.
- **Prop:** Buff-and-blue general's coat
- **Tells:** straightens his cuffs; rests one hand flat on the table; sits a fraction straighter
- **Idles:** smooths his waistcoat; glances toward the window; works his jaw, briefly; squares the edges of his chips
- **Copyright note:** Historical figure, died 1799. Build from the Gilbert Stuart and Charles Willson Peale portraits, which are public domain. Avoid the look and staging of the musical Hamilton and any modern screen likeness. No wooden teeth: that is a myth.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: George Washington, Father of His Country. Silhouette: the straightest back at the table, high collar, his own hair powdered and tied at the nape — not a wig. Face: long, heavy-jawed, the mouth set firm. Prop: the buff-and-blue general's coat with gold epaulettes; its cuffs and shoulders are the tell surface, so any change in that upright line reads at once.
Prop: Buff-and-blue general's coat.
IMPORTANT, must NOT resemble: Historical figure, died 1799. Build from the Gilbert Stuart and Charles Willson Peale portraits, which are public domain. Avoid the look and staging of the musical Hamilton and any modern screen likeness. No wooden teeth: that is a myth.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for George Washington, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: long and heavy-jawed, with ears and neck, NO eyes, eyebrows, nose or mouth drawn. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- His own hair, powdered and tied at the nape with a ribbon (not a wig), as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: neutral, set firm (his usual); a slight smile; talking "ah"; talking "oh"; talking "ee"; lips pressed; frown; tight-lipped; jaw working (lips pressed, cheek tensed). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Must NOT resemble: Historical figure, died 1799. Build from the Gilbert Stuart and Charles Willson Peale portraits, which are public domain. Avoid the look and staging of the musical Hamilton and any modern screen likeness. No wooden teeth: that is a myth.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for George Washington, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: the straightest back at the table, in a buff-and-blue general's coat with a high collar. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Gold epaulettes, left and right, as separate pieces
- Buff waistcoat as a separate front layer
- Coat cuffs, left and right, as separate pieces
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Historical figure, died 1799. Build from the Gilbert Stuart and Charles Willson Peale portraits, which are public domain. Avoid the look and staging of the musical Hamilton and any modern screen likeness. No wooden teeth: that is a myth.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for George Washington, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Historical figure, died 1799. Build from the Gilbert Stuart and Charles Willson Peale portraits, which are public domain. Avoid the look and staging of the musical Hamilton and any modern screen likeness. No wooden teeth: that is a myth.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for George Washington, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- One hand straightening the cuff on the other wrist
- Hands squaring the edges of a stack (stack NOT drawn)
- Hand smoothing a waistcoat

Must NOT resemble: Historical figure, died 1799. Build from the Gilbert Stuart and Charles Willson Peale portraits, which are public domain. Avoid the look and staging of the musical Hamilton and any modern screen likeness. No wooden teeth: that is a myth.
```

---

## Athens — The Symposium

### Polyphemus the Cyclops — *Son of the Sea-God*

- **Who:** Ate six of Odysseus's men, then took offence when their captain lied about his name. He has held the grudge ever since.
- **Look:** Silhouette: enormous, head and shoulders above everyone, filling his fifth of the screen and some of his neighbours'. Face: one great eye in the middle of the brow with an old burn scar around it, a shaggy black beard, a sheepskin over the shoulders. Prop: his club of green olive wood, a fathom shorter than it used to be. Tells live on the eye and the fist.
- **Prop:** Olive-wood club, leaning on the table
- **Tells:** his eye narrows; sniffs at the air; thumps the table
- **Idles:** counts his sheep on his fingers; blinks, very slowly; scratches his beard with a thumbnail the size of a spoon; the table groans as he shifts
- **Copyright note:** Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Polyphemus the Cyclops, Son of the Sea-God. Silhouette: enormous, head and shoulders above everyone, filling his fifth of the screen and some of his neighbours'. Face: one great eye in the middle of the brow with an old burn scar around it, a shaggy black beard, a sheepskin over the shoulders. Prop: his club of green olive wood, a fathom shorter than it used to be. Tells live on the eye and the fist.
Prop: Olive-wood club, leaning on the table.
IMPORTANT, must NOT resemble: Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Polyphemus the Cyclops, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Shaggy black hair as a separate piece
- Shaggy black beard as a separate piece
- One heavy single brow across the forehead, as a separate piece in 4 poses: neutral, raised, furrowed (angry), worried
- ONE great eye in the middle of the brow, each a WHOLE eye (white, iris and lid together), NOT mirrored: looking at the viewer; looking toward the table's centre; looking down; looking away; wide open; half-closed; narrowed; closed (a very slow blink)
- Nose in 2 versions: normal, and nostrils flared (sniffing the air)
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- The old burn scar around the eye as a separate overlay piece

Must NOT resemble: Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Polyphemus the Cyclops, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: enormous shoulders and chest, filling the frame. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Sheepskin over the shoulders as a separate layer
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Polyphemus the Cyclops, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Huge hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Polyphemus the Cyclops, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Huge hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Fist raised high (about to thump)
- Fist coming down hard on the table
- Hand counting on its fingers: 1, 2, 3 and 4 fingers up (4 pieces)
- Thumb scratching (as if at the beard)

Must NOT resemble: Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Polyphemus the Cyclops, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- His club of green olive wood, leaning upright

Must NOT resemble: Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.
```

### Leonidas — *King of Sparta*

- **Who:** An oracle said Sparta would fall or a king would die. He chose, and kept the appointment.
- **Look:** Silhouette: a red cloak over a bronze breastplate, long hair and full beard, fists on the felt. Face: level eyes, jaw set, a man already bored of the conversation. Prop: the bronze Corinthian helmet with its tall horsehair crest, set on the table at his elbow — the biggest shape at the table. Tells live on the fists and the lift of the chin.
- **Prop:** Crested bronze helmet, on the table
- **Tells:** plants both fists on the table; lifts his chin; exhales hard through his nose
- **Idles:** tugs his red cloak straight; glances across the table with open disdain; sets his crested helmet an inch to the left; cracks his knuckles
- **Copyright note:** Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Leonidas, King of Sparta. Silhouette: a red cloak over a bronze breastplate, long hair and full beard, fists on the felt. Face: level eyes, jaw set, a man already bored of the conversation. Prop: the bronze Corinthian helmet with its tall horsehair crest, set on the table at his elbow — the biggest shape at the table. Tells live on the fists and the lift of the chin.
Prop: Crested bronze helmet, on the table.
IMPORTANT, must NOT resemble: Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Leonidas, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Long hair as a separate piece
- Full beard as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose in 2 versions: normal, and nostrils flared (exhaling hard)
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); open disdain (one corner of the mouth pulled down). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Must NOT resemble: Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Leonidas, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a bronze breastplate. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Red cloak: back layer and front edges as separate pieces
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Leonidas, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands, heavy and scarred: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Leonidas, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands, heavy and scarred: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Both fists planted on the table, knuckles down (two pieces)
- Hands with fingers interlaced and pushed out (cracking knuckles, one piece)
- Hand tugging a cloak straight

Must NOT resemble: Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Leonidas, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- The bronze Corinthian helmet with its tall horsehair crest, sitting on the table in side view

Must NOT resemble: Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.
```

### Medusa — *The Gorgon*

- **Who:** The only one of three sisters who could die. Perseus managed it by looking the other way.
- **Look:** Silhouette: a head of living snakes, a moving crown nobody else at the table has, readable at any size. Face: a young woman's, pale and calm, heavy-lidded; the eyes are drawn as ordinary, which is the unsettling choice. Prop: the snakes themselves — their stillness, coiling and hissing are her whole tell surface.
- **Prop:** Her hair of snakes
- **Tells:** the snakes in her hair go still; the snakes in her hair coil and hiss; lowers her gaze to the table
- **Idles:** one snake tastes the air; two snakes knot themselves together; one snake nips another; she tucks a snake behind her ear
- **Copyright note:** Greek myth (Hesiod, Pindar, Ovid), all public domain; classical art such as the Rondanini Medusa is fair reference. Avoid Harryhausen's Medusa from Clash of the Titans (1981: serpent body, rattle tail, bow) and its 2010 remake, and the Percy Jackson Medusa (sunglasses, garden statues). She has legs and sits in a chair.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Medusa, The Gorgon. Silhouette: a head of living snakes, a moving crown nobody else at the table has, readable at any size. Face: a young woman's, pale and calm, heavy-lidded; the eyes are drawn as ordinary, which is the unsettling choice. Prop: the snakes themselves — their stillness, coiling and hissing are her whole tell surface.
Prop: Her hair of snakes.
IMPORTANT, must NOT resemble: Greek myth (Hesiod, Pindar, Ovid), all public domain; classical art such as the Rondanini Medusa is fair reference. Avoid Harryhausen's Medusa from Clash of the Titans (1981: serpent body, rattle tail, bow) and its 2010 remake, and the Percy Jackson Medusa (sunglasses, garden statues). She has legs and sits in a chair.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Medusa, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: a young woman's, pale, with ears and neck, NO eyes, eyebrows, nose or mouth drawn, and a scalp from which the snakes grow. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes (ordinary, calm and heavy-lidded, NOT glowing): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Her hair of snakes as 8 separate snakes, each attached at the scalp end: still and upright; in an S-curve; coiled; hissing with jaws open and fangs showing; tongue out tasting the air; two snakes knotted together; one snake nipping another; one snake curled behind the ear

Must NOT resemble: Greek myth (Hesiod, Pindar, Ovid), all public domain; classical art such as the Rondanini Medusa is fair reference. Avoid Harryhausen's Medusa from Clash of the Titans (1981: serpent body, rattle tail, bow) and its 2010 remake, and the Percy Jackson Medusa (sunglasses, garden statues). She has legs and sits in a chair.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Medusa, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a simple ancient Greek dress (a chiton), pinned at the shoulders. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Greek myth (Hesiod, Pindar, Ovid), all public domain; classical art such as the Rondanini Medusa is fair reference. Avoid Harryhausen's Medusa from Clash of the Titans (1981: serpent body, rattle tail, bow) and its 2010 remake, and the Percy Jackson Medusa (sunglasses, garden statues). She has legs and sits in a chair.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Medusa, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Greek myth (Hesiod, Pindar, Ovid), all public domain; classical art such as the Rondanini Medusa is fair reference. Avoid Harryhausen's Medusa from Clash of the Titans (1981: serpent body, rattle tail, bow) and its 2010 remake, and the Percy Jackson Medusa (sunglasses, garden statues). She has legs and sits in a chair.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Medusa, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand tucking a snake behind her ear (snake NOT drawn)

Must NOT resemble: Greek myth (Hesiod, Pindar, Ovid), all public domain; classical art such as the Rondanini Medusa is fair reference. Avoid Harryhausen's Medusa from Clash of the Titans (1981: serpent body, rattle tail, bow) and its 2010 remake, and the Percy Jackson Medusa (sunglasses, garden statues). She has legs and sits in a chair.
```

### Socrates — *The Gadfly of Athens*

- **Who:** Drank the hemlock, walked about until his legs grew heavy, lay down, and remembered a debt. The calmest appointment I have kept.
- **Look:** Silhouette: bald dome, big untidy beard, a short thick body in one plain, shabby cloak — the only unadorned figure at the table, which is exactly why he reads. Face: snub nose, wide bulging eyes, a satyr's face with a good-humoured mouth. Prop: a shallow wine cup, drained and refilled all night. Tells live on the big shapes of the face: nose, smile, the upward glance.
- **Prop:** Shallow wine cup
- **Tells:** scratches his snub nose; smiles as if at a private joke; frowns up at the ceiling, as if it had asked him something
- **Idles:** sips from his cup and seems no drunker; stretches, and his cloak slips off one shoulder; pulls his plain cloak tighter; scratches his beard thoughtfully
- **Copyright note:** Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Socrates, The Gadfly of Athens. Silhouette: bald dome, big untidy beard, a short thick body in one plain, shabby cloak — the only unadorned figure at the table, which is exactly why he reads. Face: snub nose, wide bulging eyes, a satyr's face with a good-humoured mouth. Prop: a shallow wine cup, drained and refilled all night. Tells live on the big shapes of the face: nose, smile, the upward glance.
Prop: Shallow wine cup.
IMPORTANT, must NOT resemble: Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Socrates, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: a bald dome, with ears and neck, NO eyes, eyebrows, nose or mouth drawn. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Big untidy beard as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes (wide and bulging): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- A snub nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); smiling as if at a private joke. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Must NOT resemble: Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Socrates, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a short, thick body in one plain, shabby cloak. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Socrates, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Socrates, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Fingertip scratching the nose
- Hand holding a shallow wine cup
- Hands pulling a cloak tighter
- Fingers scratching the beard

Must NOT resemble: Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Socrates, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A shallow wine cup, full and empty

Must NOT resemble: Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.
```

### Odysseus — *The Man of Many Turns* (champion)

- **Who:** Ten years at war, ten more getting home. Arrived last, alone and in disguise, and still won. He is late here too.
- **Look:** Silhouette: a head shorter than the kings around him but broader in the chest and shoulders (Homer says so), a sea-stained cloak, and the conical felt sailor's cap he wears in Greek vase painting. Face: weathered, grizzled curly beard, amused eyes that are always doing sums. Prop: a heavy gold ring — make it big enough to catch the light, because his hands are the tell surface.
- **Prop:** Heavy gold ring
- **Tells:** twists the ring on his finger; looks toward the door as if it led home; leans back, satisfied
- **Idles:** wrings sea water from the hem of his cloak; counts the exits; rubs an old scar on his thigh; smiles at no one in particular
- **Copyright note:** Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Odysseus, The Man of Many Turns. Silhouette: a head shorter than the kings around him but broader in the chest and shoulders (Homer says so), a sea-stained cloak, and the conical felt sailor's cap he wears in Greek vase painting. Face: weathered, grizzled curly beard, amused eyes that are always doing sums. Prop: a heavy gold ring — make it big enough to catch the light, because his hands are the tell surface.
Prop: Heavy gold ring.
IMPORTANT, must NOT resemble: Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Odysseus, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Grizzled curly hair as a separate piece
- Grizzled curly beard as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- The conical felt sailor's cap of Greek vase painting, as a separate piece

Must NOT resemble: Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Odysseus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: broad in the chest and shoulders, a sea-stained cloak. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Cloak: back layer and front edges as separate pieces
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Odysseus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Weathered hands, a heavy gold ring on one finger: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Odysseus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Weathered hands, a heavy gold ring on one finger: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- One hand twisting the ring on the other hand's finger
- Hands wringing water from a cloak hem

Must NOT resemble: Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Odysseus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- The heavy gold ring alone
- A glint highlight for the ring, as an overlay

Must NOT resemble: Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.
```

---

## Pirate Cove

### Davy Jones — *The Fiend of the Deep*

- **Who:** Sailors named him, feared him, and never agreed on his face. We are in related lines of work.
- **Look:** Silhouette: tall and hunched in a long, waterlogged sea-coat and a broad hat whose brim sheds a thread of water, weed caught in the folds. Face: grey as a drowned man's, mostly in shadow, with a sodden grey beard — plainly hair — and two pale, round, unblinking eyes that catch the lamplight. Prop: the dripping sleeve, the one wet thing at a dry table.
- **Prop:** His dripping coat-sleeve
- **Tells:** sea water drips from his sleeve; drums on the table like rain on a deck; the lamp nearest him flickers
- **Idles:** a crab climbs out of his pocket; hums a shanty under his breath; wrings out his beard; the smell of low tide drifts across the table
- **Copyright note:** Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Davy Jones, The Fiend of the Deep. Silhouette: tall and hunched in a long, waterlogged sea-coat and a broad hat whose brim sheds a thread of water, weed caught in the folds. Face: grey as a drowned man's, mostly in shadow, with a sodden grey beard — plainly hair — and two pale, round, unblinking eyes that catch the lamplight. Prop: the dripping sleeve, the one wet thing at a dry table.
Prop: His dripping coat-sleeve.
IMPORTANT, must NOT resemble: Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Davy Jones, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: grey, drowned skin, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Sodden grey beard (plainly hair, never tentacles) as a separate piece
- Wet hair under the hat as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes (pale and round, catching the light; he rarely blinks): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); humming under his breath (lips barely parted). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Broad hat as a separate piece, brim shedding a thin thread of water
- A dark shadow overlay that covers the upper half of the face under the brim

Must NOT resemble: Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Davy Jones, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: hunched, in a long, waterlogged sea-coat. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Strands of seaweed caught in the folds, 4 separate pieces
- One extra forearm with the sleeve visibly dripping
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Davy Jones, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Grey, wet hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Davy Jones, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Grey, wet hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand wringing out the beard
- Fingers drumming (like rain on a deck)

Must NOT resemble: Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Davy Jones, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- Water droplets, 5 sizes
- A thin falling trickle of water
- A small puddle on the felt
- A small crab in 3 poses: climbing, walking sideways, claws raised

Must NOT resemble: Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.
```

### Captain William Kidd — *Privateer, by His Own Account*

- **Who:** Sailed with the King's commission to hunt pirates, and came home one. Hanged twice on the same day; the first rope broke.
- **Look:** Silhouette: a respectable merchant captain — full-bottomed wig under a plain three-cornered hat, a good broadcloth coat buttoned high, a cravat he keeps loosening at the throat. Face: heavy, anxious, forever checking behind him. Prop: the coat itself — the broad buttoned chest, where one hand keeps patting for something that may or may not be in the inside pocket.
- **Prop:** His buttoned coat and its inside pocket
- **Tells:** pats his coat where a map might be; chews his lip; glances over his shoulder
- **Idles:** rubs his neck; counts coins that aren't there; tips his hat to the room; squints at the lamp
- **Copyright note:** Historical figure, hanged 1701. Build from the trial record and period portraits of New York merchant captains. Avoid Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon buried-treasure buccaneer. He should look like what he always claimed to be: an honest captain with papers.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Captain William Kidd, Privateer, by His Own Account. Silhouette: a respectable merchant captain — full-bottomed wig under a plain three-cornered hat, a good broadcloth coat buttoned high, a cravat he keeps loosening at the throat. Face: heavy, anxious, forever checking behind him. Prop: the coat itself — the broad buttoned chest, where one hand keeps patting for something that may or may not be in the inside pocket.
Prop: His buttoned coat and its inside pocket.
IMPORTANT, must NOT resemble: Historical figure, hanged 1701. Build from the trial record and period portraits of New York merchant captains. Avoid Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon buried-treasure buccaneer. He should look like what he always claimed to be: an honest captain with papers.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Captain William Kidd, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Full-bottomed wig: back layer and front curls as separate pieces
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); chewing his lip. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Plain three-cornered hat as a separate piece
- The whole head turned in three-quarter view, glancing over his shoulder, as one extra piece

Must NOT resemble: Historical figure, hanged 1701. Build from the trial record and period portraits of New York merchant captains. Avoid Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon buried-treasure buccaneer. He should look like what he always claimed to be: an honest captain with papers.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Captain William Kidd, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a good broadcloth coat buttoned high. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Cravat in 2 states: neat, and loosened at the throat
- The corner of a folded paper peeking from the inside pocket, as a separate piece
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Historical figure, hanged 1701. Build from the trial record and period portraits of New York merchant captains. Avoid Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon buried-treasure buccaneer. He should look like what he always claimed to be: an honest captain with papers.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Captain William Kidd, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Historical figure, hanged 1701. Build from the trial record and period portraits of New York merchant captains. Avoid Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon buried-treasure buccaneer. He should look like what he always claimed to be: an honest captain with papers.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Captain William Kidd, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand patting the coat chest
- Hand rubbing the back of the neck
- Hand tipping the hat brim
- Thumb rubbing the fingertips (counting coins that aren't there)

Must NOT resemble: Historical figure, hanged 1701. Build from the trial record and period portraits of New York merchant captains. Avoid Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon buried-treasure buccaneer. He should look like what he always claimed to be: an honest captain with papers.
```

### Long John Silver — *The Sea-Cook*

- **Who:** Changed sides on one island, then changed back, and came out ahead both times. Left with a bag of coin. I am still waiting.
- **Look:** Silhouette: very tall and broad, a big pale smiling face, a cook's apron over a sailor's coat, the top of a crutch under one arm — and the parrot on his shoulder, the brightest, busiest thing at the table. Everything else distinctive about him is below the table's edge. Prop: Captain Flint, the parrot — she preens, sidles and shrieks, and she is the part of him that moves.
- **Prop:** Captain Flint, his parrot
- **Tells:** his parrot squawks 'Pieces of eight!'; his parrot sidles along his shoulder; strokes the parrot's head
- **Idles:** the parrot preens; grins at everyone at once; raps his crutch against the table leg; wipes his hands on his apron
- **Copyright note:** Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Long John Silver, The Sea-Cook. Silhouette: very tall and broad, a big pale smiling face, a cook's apron over a sailor's coat, the top of a crutch under one arm — and the parrot on his shoulder, the brightest, busiest thing at the table. Everything else distinctive about him is below the table's edge. Prop: Captain Flint, the parrot — she preens, sidles and shrieks, and she is the part of him that moves.
Prop: Captain Flint, his parrot.
IMPORTANT, must NOT resemble: Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Long John Silver, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: big, pale, with ears and neck, NO eyes, eyebrows, nose or mouth drawn. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Hair tied back as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Must NOT resemble: Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Long John Silver, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: very tall and broad, a cook's apron over a sailor's coat. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- The top of a crutch tucked under one arm, as a separate piece
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Long John Silver, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Big, easy hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Long John Silver, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Big, easy hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Finger stroking a parrot's head (parrot NOT drawn)
- Hands wiping on the apron
- Hand rapping a crutch

Must NOT resemble: Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Long John Silver, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- Captain Flint, the parrot, WITHOUT her head: perched upright; leaning sideways (sidling); hunched (preening)
- The parrot's head: beak closed; beak wide open (squawking); turned into her feathers (preening)
- The parrot's wings: folded; half open; spread

Must NOT resemble: Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.
```

### Blackbeard — *Captain of the Queen Anne's Revenge* (champion)

- **Who:** Put smoke in his hat so that ships would surrender without a fight. Most did. The last one did not.
- **Look:** Silhouette: a broad black hat with smoke curling from under the brim on both sides, over a huge black beard in ribbon-tied braids that covers most of his face. Heavy dark coat, a sling of pistols across the chest. Eyes that hold a stare. Prop: the braided beard — big, dark, dead centre in his fifth of the screen, and the shape his hand keeps going back to.
- **Prop:** His braided black beard
- **Tells:** strokes his braided beard; goes very still; the slow-matches under his hat smoulder brighter
- **Idles:** the fuses in his beard smoke; sets a pistol on the table, then picks it up again; laughs too loud; stares down the nearest man
- **Copyright note:** Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Blackbeard, Captain of the Queen Anne's Revenge. Silhouette: a broad black hat with smoke curling from under the brim on both sides, over a huge black beard in ribbon-tied braids that covers most of his face. Heavy dark coat, a sling of pistols across the chest. Eyes that hold a stare. Prop: the braided beard — big, dark, dead centre in his fifth of the screen, and the shape his hand keeps going back to.
Prop: His braided black beard.
IMPORTANT, must NOT resemble: Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Blackbeard, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Hair under the hat as a separate piece
- The huge black beard as a separate piece, covering most of the lower face
- Four loose ribbon-tied beard braids as separate pieces, so they can sway
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: mostly hidden by the beard, so only what shows through it: closed; talking; laughing too loud (wide open); snarling with teeth. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Broad black hat as a separate piece
- Slow-match fuses poking from under the hat brim (left and right), each in 3 states: dull, smouldering, glowing bright
- Curls of smoke as separate pieces, 3 sizes

Must NOT resemble: Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Blackbeard, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a heavy dark coat. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Sling of pistols across the chest as a separate piece
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Blackbeard, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands, big and scarred: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Blackbeard, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands, big and scarred: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand stroking a braid of the beard
- Hand holding a flintlock pistol
- Hand setting a pistol down flat on the table

Must NOT resemble: Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Blackbeard, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A flintlock pistol, lying flat
- The same pistol held upright

Must NOT resemble: Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.
```

---

## Camelot

### The Green Knight — *Knight of the Green Chapel*

- **Who:** Rode into Camelot at New Year and offered anyone the first blow with his own axe. Someone took it. He took it well.
- **Look:** Silhouette: enormous — a head taller than anyone seated, broad as a door, with a great bush of green beard and green hair to the shoulders. Green skin, green clothes worked with gold, and no armour: the poem says he came in peace. Face: green, grinning, bright-eyed. Prop: the holly branch at his side, a big dark spiky shape that rustles; the axe leans against the table.
- **Prop:** A holly branch
- **Tells:** the holly branch at his side rustles; laughs, and the rafters shake; runs a thumb along the head of his axe
- **Idles:** moss creeps a little further along his sleeve; somewhere outside, his horse stamps; the chair creaks under his weight; he studies the table as if measuring it for a blow
- **Copyright note:** The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Green Knight, Knight of the Green Chapel. Silhouette: enormous — a head taller than anyone seated, broad as a door, with a great bush of green beard and green hair to the shoulders. Green skin, green clothes worked with gold, and no armour: the poem says he came in peace. Face: green, grinning, bright-eyed. Prop: the holly branch at his side, a big dark spiky shape that rustles; the axe leans against the table.
Prop: A holly branch.
IMPORTANT, must NOT resemble: The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for The Green Knight, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: GREEN skin, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Green hair to the shoulders: back layer and front strands as separate pieces
- Great bush of green beard as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); a huge booming laugh (head thrown back, mouth wide open). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Must NOT resemble: The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for The Green Knight, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: enormous, broad as a door, in green clothes worked with gold, NO armour. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Patches of moss creeping on the sleeve: 3 separate pieces, small to large
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for The Green Knight, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Huge green hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for The Green Knight, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Huge green hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Thumb running along the edge of an axe head (axe NOT drawn)
- Hand resting on a holly branch (branch NOT drawn)

Must NOT resemble: The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for The Green Knight, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A holly branch, still
- The same holly branch with its leaves shaking (rustling)
- His great axe, leaning upright

Must NOT resemble: The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.
```

### Sir Lancelot — *The Best Knight in the World*

- **Who:** The best knight in the world, by general agreement, his own included. Died a hermit. It surprised everyone but me.
- **Look:** Silhouette: the handsomest man at the table and dressed for it — polished plate at the shoulders, a bright surcoat, a fall of dark hair he keeps tossing back. Face: fine-boned, proud, faintly bored until someone challenges him. Prop: the right gauntlet, polished steel that catches the light, large enough at a fifth of the screen to be seen being buffed.
- **Prop:** A polished steel gauntlet
- **Tells:** polishes his gauntlet; tosses his hair; glances toward the door
- **Idles:** admires his reflection in his breastplate; adjusts his sword belt; sighs, for no clear reason; looks toward an empty chair
- **Copyright note:** Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Sir Lancelot, The Best Knight in the World. Silhouette: the handsomest man at the table and dressed for it — polished plate at the shoulders, a bright surcoat, a fall of dark hair he keeps tossing back. Face: fine-boned, proud, faintly bored until someone challenges him. Prop: the right gauntlet, polished steel that catches the light, large enough at a fifth of the screen to be seen being buffed.
Prop: A polished steel gauntlet.
IMPORTANT, must NOT resemble: Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Sir Lancelot, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- A fall of dark hair in 3 separate positions: falling forward, tossed back, mid-toss
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); a sigh (lips parted, bored). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Must NOT resemble: Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Sir Lancelot, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: polished plate at the shoulders over a bright surcoat. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Left and right shoulder plates as separate pieces
- Sword belt as a separate piece
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Sir Lancelot, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands, each with a short stub of sleeve, cut straight across the stub; the forearm piece goes under it. The RIGHT hand is in a polished steel gauntlet, the LEFT is bare: draw every pose for BOTH hands, since they differ
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Sir Lancelot, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands, each with a short stub of sleeve, cut straight across the stub; the forearm piece goes under it. The RIGHT hand is in a polished steel gauntlet, the LEFT is bare: draw every pose for BOTH hands, since they differ
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Left hand polishing the right gauntlet with a cloth
- Right gauntlet held up, admiring it

Must NOT resemble: Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Sir Lancelot, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A polishing cloth
- A bright highlight glint for the gauntlet, as an overlay

Must NOT resemble: Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.
```

### Merlin — *The King's Prophet*

- **Who:** Foresaw his own end and arrived for it on time. I appreciate punctuality.
- **Look:** Silhouette: lean and tall in a hooded, undyed wool robe, hood usually up; a long, wild grey beard; a rough knotted staff taller than he is, planted upright beside his chair. Face: weathered, with deep-set eyes that never quite settle on the table. No pointed hat, no stars, no owl. Prop: the staff — a tall vertical line that can hum and glow faintly without being touched.
- **Prop:** A tall knotted staff
- **Tells:** his staff hums, faintly; gazes somewhere past the table, as if the hand were already over; murmurs a word nobody catches
- **Idles:** the candle nearest him bends the wrong way; stares at something that has not happened yet; brushes ash from his sleeve; taps his staff twice
- **Copyright note:** Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.
- **Art note:** No pointed hat, no stars, no owl.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Merlin, The King's Prophet. Silhouette: lean and tall in a hooded, undyed wool robe, hood usually up; a long, wild grey beard; a rough knotted staff taller than he is, planted upright beside his chair. Face: weathered, with deep-set eyes that never quite settle on the table. No pointed hat, no stars, no owl. Prop: the staff — a tall vertical line that can hum and glow faintly without being touched.
Prop: A tall knotted staff.
IMPORTANT, must NOT resemble: Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Merlin, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Long, wild grey beard as a separate piece
- Grey hair as a separate piece (for when the hood is down)
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); murmuring a word (lips barely parted). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Hood of an undyed wool robe, UP: the back of the hood and its front rim as separate pieces
- The same hood fallen DOWN around the shoulders

Note: No pointed hat, no stars, no owl.

Must NOT resemble: Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Merlin, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: lean and tall in a hooded, undyed wool robe. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Note: No pointed hat, no stars, no owl.

Must NOT resemble: Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Merlin, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Old, weathered hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: No pointed hat, no stars, no owl.

Must NOT resemble: Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Merlin, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Old, weathered hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand gripping a tall staff (staff NOT drawn)
- Fingers brushing ash from a sleeve

Note: No pointed hat, no stars, no owl.

Must NOT resemble: Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Merlin, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A rough, knotted staff taller than he is, standing upright
- A faint glow overlay for the staff, 2 intensities
- A candle, and its flame in 2 states: upright, and bending the wrong way

Note: No pointed hat, no stars, no owl.

Must NOT resemble: Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.
```

### King Arthur — *Lord of the Round Table* (champion)

- **Who:** Drew a sword from a stone because his foster-brother had left his own behind. Some say he is not dead. I have never commented.
- **Look:** Silhouette: a plain gold crown with a visible dent, a red mantle over broad mailed shoulders, a greying beard kept short. Face: open, lined, kind, and tired around the eyes. Prop: Excalibur, sheathed and standing upright beside his chair with the hilt at his hand — a big cross-shape his hand can rest on, and leave.
- **Prop:** Excalibur, hilt to hand
- **Tells:** rests his hand on Excalibur's hilt; looks round the table at each of his knights; his crown slips a fraction; he does not fix it
- **Idles:** raises his cup to the table; rubs the dent in his crown; listens to the wind at the window; nods to a servant who is not there
- **Copyright note:** Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: King Arthur, Lord of the Round Table. Silhouette: a plain gold crown with a visible dent, a red mantle over broad mailed shoulders, a greying beard kept short. Face: open, lined, kind, and tired around the eyes. Prop: Excalibur, sheathed and standing upright beside his chair with the hilt at his hand — a big cross-shape his hand can rest on, and leave.
Prop: Excalibur, hilt to hand.
IMPORTANT, must NOT resemble: Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for King Arthur, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Greying hair as a separate piece
- Short greying beard as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Plain gold crown with a visible dent, in 2 angles: sitting straight, and slipped a fraction to one side

Must NOT resemble: Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for King Arthur, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: broad shoulders in chain mail. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Red mantle: back layer (behind the shoulders) and front drape as separate pieces
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for King Arthur, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands, a king's, weathered: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for King Arthur, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands, a king's, weathered: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand resting on top of a sword hilt (hilt NOT drawn)
- Hand raising a cup
- Fingertip touching (as if rubbing the dent in a crown)

Must NOT resemble: Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for King Arthur, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- Excalibur, sheathed, standing upright, hilt at the top (the whole sword and scabbard)
- A plain drinking cup

Must NOT resemble: Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.
```

---

## Imperial Rome

### Cerberus — *The Hound at the Gate*

- **Who:** Lets everyone in. Lets nobody out. We have kept the same hours for a very long time.
- **Look:** Silhouette: three heads on one massive body — nothing else in the game looks like it. Black, short-coated, heavy in the jaw, with a low ridge of small snakes along the neck and spine after Apollodorus, kept subtle so it never clutters the read. The heads are the tell surface: each can watch, sleep, yawn or snarl on its own.
- **Prop:** Three iron collars on one chain
- **Tells:** all three heads snap to attention; the left head yawns; the heads growl at each other
- **Idles:** the middle head scratches behind an ear; one head falls asleep; two heads watch you; one watches the pot; the right head sniffs at the nearest robe
- **Copyright note:** Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Cerberus, The Hound at the Gate. Silhouette: three heads on one massive body — nothing else in the game looks like it. Black, short-coated, heavy in the jaw, with a low ridge of small snakes along the neck and spine after Apollodorus, kept subtle so it never clutters the read. The heads are the tell surface: each can watch, sleep, yawn or snarl on its own.
Prop: Three iron collars on one chain.
IMPORTANT, must NOT resemble: Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Cerberus, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Three separate heads — left, middle and right — each on its own thick neck, black and short-coated, heavy in the jaw: the left head angled a little left, the middle facing forward, the right angled a little right. Each head drawn WITHOUT its lower jaw and WITHOUT ears
- Lower jaws (they fit any of the three heads), each a separate piece: closed; open, panting, tongue out; yawning wide; snarling, lips curled back from the teeth; growling (lips half curled)
- Ears (fit any head), left and right, in 3 positions: up and alert, back, flat
- Eyes that fit any of the heads, each a WHOLE eye (white, iris and lid together), near and far (they differ in three-quarter view): open; half-closed (sleepy); closed (asleep); narrowed; wide open
- Nose pieces: normal, and nostrils flared (sniffing)

Must NOT resemble: Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Cerberus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Massive black body and chest with NO heads and NO front legs, sitting upright at the table like a person, cut off at the table line, three neck stumps showing
- A low ridge of small snakes along the neck and spine: 6 small snakes as separate pieces, each in 2 poses (lying flat, raised)
- Front legs (shoulder to paw), left and right, each in two angles: lying along the table, and raised

Must NOT resemble: Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Cerberus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Big front paws with blunt claws (no fingers), each with a short stub of the leg, cut straight across. Draw each pose ONCE, as the right paw: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: tapping the table (checking)
- Pose: pushing forward (as if pushing chips; chips NOT drawn)
- Pose: shoving forward hard (all in)
- Pose: sweeping sideways (folding)
- Pose: curled, raking toward the body (collecting a pot)
- Pose: resting, curled under

Must NOT resemble: Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Cerberus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Big front paws with blunt claws (no fingers), each with a short stub of the leg, cut straight across. Draw each pose ONCE, as the right paw: the game mirrors it for the left
- A hind paw raised, scratching (as if behind an ear)

Must NOT resemble: Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Cerberus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- Three iron collars, each a separate piece sized to one neck
- One heavy chain linking them, as 3 separate lengths

Must NOT resemble: Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.
```

### Pope Alexander VI — *The Borgia Pope*

- **Who:** Said to have bought the votes that made him pope. Said to have been poisoned. I was there for one of those.
- **Look:** Silhouette: the tall mitre — nothing else at this table points straight up. A heavy, genial face with a strong nose, after Pinturicchio's fresco of him in the Borgia Apartments. Gold-embroidered vestments that swallow the chair. Prop: the papal ring, drawn oversized so that turning it throws a flash of gold the eye catches at a fifth of the screen.
- **Prop:** The papal ring
- **Tells:** smooths his robes, unhurried; turns the ring on his finger; folds his hands in his lap
- **Idles:** murmurs something in Latin; adjusts his mitre; admires his own ring; smiles benevolently at the whole table
- **Copyright note:** Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Pope Alexander VI, The Borgia Pope. Silhouette: the tall mitre — nothing else at this table points straight up. A heavy, genial face with a strong nose, after Pinturicchio's fresco of him in the Borgia Apartments. Gold-embroidered vestments that swallow the chair. Prop: the papal ring, drawn oversized so that turning it throws a flash of gold the eye catches at a fifth of the screen.
Prop: The papal ring.
IMPORTANT, must NOT resemble: Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Pope Alexander VI, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: heavy and genial, with ears and neck, NO eyes, eyebrows, nose or mouth drawn. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- A strong nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); a benevolent smile; murmuring in Latin (lips barely parted). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- The tall mitre as a separate piece, in 2 angles: straight, and slightly askew

Must NOT resemble: Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Pope Alexander VI, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: gold-embroidered vestments that swallow the chair, after Pinturicchio's fresco. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Outer vestment as a separate front layer
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Pope Alexander VI, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Soft, ringed hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Pope Alexander VI, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Soft, ringed hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- One hand turning the ring on the other
- Both hands folded in the lap (one piece)
- Hand smoothing the robes
- Hand held up, admiring the ring

Must NOT resemble: Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Pope Alexander VI, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- The papal ring alone, oversized
- A gold flash of light for the ring, as an overlay

Must NOT resemble: Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.
```

### Spartacus — *Gladiator of Capua*

- **Who:** Broke out of a gladiator school with kitchen knives. Beat Rome's armies for two years. Nobody found his body. I did.
- **Look:** Silhouette: broad bare shoulders under a rough Thracian cloak, cropped hair, a nose broken more than once. A fighter, not a showman, so no gladiator helmet. Heavy hands that never quite rest. Prop: the old shackle scar on his wrist, drawn as a pale band wide enough to read at a fifth of the screen. Wrist and shoulders carry his tells.
- **Prop:** The shackle scar on his wrist
- **Tells:** rolls his shoulders like a fighter before a bout; rubs the old shackle scar on his wrist; stares hard across the table
- **Idles:** flexes his hands; tests the weight of the table as if it might be a weapon; glances at the doors; rolls his neck
- **Copyright note:** Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.
- **Art note:** No gladiator helmet, nothing from the 1960 film or the TV series.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Spartacus, Gladiator of Capua. Silhouette: broad bare shoulders under a rough Thracian cloak, cropped hair, a nose broken more than once. A fighter, not a showman, so no gladiator helmet. Heavy hands that never quite rest. Prop: the old shackle scar on his wrist, drawn as a pale band wide enough to read at a fifth of the screen. Wrist and shoulders carry his tells.
Prop: The shackle scar on his wrist.
IMPORTANT, must NOT resemble: Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Spartacus, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Cropped hair as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- A nose broken more than once, as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Note: No gladiator helmet, nothing from the 1960 film or the TV series.

Must NOT resemble: Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Spartacus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: broad, bare shoulders under a rough Thracian cloak. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Cloak: back layer and front edges as separate pieces
- Bare, muscled upper arms, left and right
- Bare forearms, left and right, each in two angles: lying along the table, and raised; the LEFT wrist carries a pale band of shackle scar

Note: No gladiator helmet, nothing from the 1960 film or the TV series.

Must NOT resemble: Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Spartacus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Heavy, scarred hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: No gladiator helmet, nothing from the 1960 film or the TV series.

Must NOT resemble: Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Spartacus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Heavy, scarred hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- One hand rubbing the scar on the other wrist
- Hands flexing, fingers spread
- Both hands gripping the table edge

Note: No gladiator helmet, nothing from the 1960 film or the TV series.

Must NOT resemble: Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Spartacus, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- The pale shackle-scar band alone, as an overlay

Note: No gladiator helmet, nothing from the 1960 film or the TV series.

Must NOT resemble: Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.
```

### Julius Caesar — *Dictator for Life* (champion)

- **Who:** Twenty-three wounds. A physician said afterwards that only one of them was fatal. It only ever takes one.
- **Look:** Silhouette: the laurel wreath, worn low over a high forehead — Suetonius says no honour pleased him more than the right to wear it at all times, because it hid his thinning hair. Tall, fair-skinned, keen dark eyes; a toga with a broad purple border. Prop: the wreath itself. Its angle on his head is the tell surface.
- **Prop:** Laurel wreath
- **Tells:** adjusts his laurel wreath; drums his fingers on the table's edge; smiles like a man counting votes
- **Idles:** dictates something to no one; rubs his temple; glances round the table with suspicion; straightens the purple border of his toga
- **Copyright note:** Historical figure, died 44 BC. Build from the coins of 44 BC, the first Roman coinage to carry a living man's portrait. Avoid every film and television likeness and the Asterix caricature. No "Et tu, Brute?" — that is Shakespeare's line, not the ancient sources'.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Julius Caesar, Dictator for Life. Silhouette: the laurel wreath, worn low over a high forehead — Suetonius says no honour pleased him more than the right to wear it at all times, because it hid his thinning hair. Tall, fair-skinned, keen dark eyes; a toga with a broad purple border. Prop: the wreath itself. Its angle on his head is the tell surface.
Prop: Laurel wreath.
IMPORTANT, must NOT resemble: Historical figure, died 44 BC. Build from the coins of 44 BC, the first Roman coinage to carry a living man's portrait. Avoid every film and television likeness and the Asterix caricature. No "Et tu, Brute?" — that is Shakespeare's line, not the ancient sources'.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Julius Caesar, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Thinning hair over a high forehead as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); a knowing closed smile, like a man counting votes. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Laurel wreath as a separate piece, in 3 angles: straight, worn low at the front, tilted to one side

Must NOT resemble: Historical figure, died 44 BC. Build from the coins of 44 BC, the first Roman coinage to carry a living man's portrait. Avoid every film and television likeness and the Asterix caricature. No "Et tu, Brute?" — that is Shakespeare's line, not the ancient sources'.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Julius Caesar, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a toga with a broad purple border. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- The toga drape over the left shoulder as a separate front layer
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Historical figure, died 44 BC. Build from the coins of 44 BC, the first Roman coinage to carry a living man's portrait. Avoid every film and television likeness and the Asterix caricature. No "Et tu, Brute?" — that is Shakespeare's line, not the ancient sources'.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Julius Caesar, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Historical figure, died 44 BC. Build from the coins of 44 BC, the first Roman coinage to carry a living man's portrait. Avoid every film and television likeness and the Asterix caricature. No "Et tu, Brute?" — that is Shakespeare's line, not the ancient sources'.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Julius Caesar, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand with fingers drumming (two versions: first and third fingers raised; second and fourth raised)
- Hand raised adjusting a wreath at the temple
- Hand with index finger raised, dictating
- Fingertips rubbing the temple

Must NOT resemble: Historical figure, died 44 BC. Build from the coins of 44 BC, the first Roman coinage to carry a living man's portrait. Avoid every film and television likeness and the Asterix caricature. No "Et tu, Brute?" — that is Shakespeare's line, not the ancient sources'.
```

---

## Baker Street

### Alice — *Late of Wonderland*

- **Who:** Told a pack of cards they were nothing but a pack of cards. She has never once been afraid of me.
- **Look:** Silhouette: a small figure in a full-skirted dress and white pinafore, long hair held back by a band — Tenniel's Alice. Keep the blue the design doc wants, but a deep Victorian blue, never Disney's powder blue with a black bow. Large, expressive eyes: by design her face, not a prop, is the tell surface. Prop: a little bottle labelled DRINK ME, beside her chips.
- **Prop:** A little bottle labelled DRINK ME
- **Tells:** her eyes go very wide; frowns at her cards as if they had said something rude; bites her lip
- **Idles:** smooths her pinafore; counts the pips on a card; tries to see what the dealer is holding; fidgets in a chair far too big for her
- **Copyright note:** Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Alice, Late of Wonderland. Silhouette: a small figure in a full-skirted dress and white pinafore, long hair held back by a band — Tenniel's Alice. Keep the blue the design doc wants, but a deep Victorian blue, never Disney's powder blue with a black bow. Large, expressive eyes: by design her face, not a prop, is the tell surface. Prop: a little bottle labelled DRINK ME, beside her chips.
Prop: A little bottle labelled DRINK ME.
IMPORTANT, must NOT resemble: Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Alice, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Long hair as two separate pieces: the back layer (behind the head) and the front strands
- Hairband as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes (drawn LARGE and expressive: her face is her tell): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking); very wide with small pupils (startled)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); biting her lower lip; a disapproving little frown, as if the cards had been rude. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Must NOT resemble: Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Alice, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a full-skirted dress in deep Victorian blue (NOT powder blue) under a white pinafore. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Pinafore bib as a separate front layer
- Upper arms in short puffed sleeves, left and right
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Alice, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Small girl's hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Alice, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Small girl's hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand holding the little DRINK ME bottle
- Hand smoothing the pinafore flat

Must NOT resemble: Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Alice, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- The little glass bottle with a paper label reading DRINK ME, standing upright
- The same bottle lying on its side

Must NOT resemble: Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.
```

### Inspector Javert — *The Card-Reader's Son*

- **Who:** Followed one man for years because the law said so. Then met a mercy the law did not cover.
- **Look:** Silhouette: tall, in a long greatcoat that buttons to the chin, hat brim low over the eyes, and — Hugo's own detail — enormous side-whiskers climbing toward a flat nose with deep nostrils. A face that almost never moves, so any movement reads. Prop: the greatcoat's high collar and its row of buttons; that is the tell surface.
- **Prop:** Greatcoat buttoned to the collar
- **Tells:** buttons his coat to the collar; stares at you without blinking; his hand shakes, very slightly
- **Idles:** straightens his stock; consults a small black notebook; glances at the door like a man expecting an escape; taps his cane on the floor once
- **Copyright note:** Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Inspector Javert, The Card-Reader's Son. Silhouette: tall, in a long greatcoat that buttons to the chin, hat brim low over the eyes, and — Hugo's own detail — enormous side-whiskers climbing toward a flat nose with deep nostrils. A face that almost never moves, so any movement reads. Prop: the greatcoat's high collar and its row of buttons; that is the tell surface.
Prop: Greatcoat buttoned to the collar.
IMPORTANT, must NOT resemble: Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Inspector Javert, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Enormous side-whiskers climbing toward the nose: left and right as separate pieces
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes (a hard stare that rarely blinks: make "wide open" his unblinking stare): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- A flat nose with deep nostrils as a separate piece
- Mouths, each a separate piece: neutral closed (his usual); a thin, tight line; talking "ah"; talking "oh"; lips pressed; a slight frown; teeth clenched. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Hat with the brim worn low, as a separate piece

Must NOT resemble: Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Inspector Javert, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a long greatcoat. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- The greatcoat's high collar in 2 states: buttoned to the chin, and top buttons undone
- The stock (neckcloth) as a separate piece
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Inspector Javert, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Inspector Javert, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Fingers doing up the top collar button
- Hand holding a small black notebook
- Hand with a very slight shake (draw it twice, a hair apart)
- Hand gripping the top of a cane

Must NOT resemble: Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Inspector Javert, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A small black notebook, closed and open
- The top of a cane

Must NOT resemble: Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.
```

### Captain Nemo — *Master of the Nautilus*

- **Who:** Told a guest he was already dead to the world. He was early. They buried him in his own boat.
- **Look:** Silhouette: tall and broad-shouldered, full dark beard, a flat sea-captain's cap; take the costume from the Neuville and Riou engravings for Hetzel's edition, not from any film. Severe dark clothes, eyes set rather wide apart, as Verne describes them. Prop: a great pearl, large enough that its white glint reads against the dark coat whenever he turns it.
- **Prop:** A great pearl
- **Tells:** closes his eyes, as if listening to distant music; lets his gaze drift to the window; turns a pearl between his fingers
- **Idles:** consults a pocket chronometer; hums a fugue under his breath; sketches something in a notebook; taps the table as if sounding a hull
- **Copyright note:** Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.
- **Art note:** Nothing from Disney's 1954 film.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Captain Nemo, Master of the Nautilus. Silhouette: tall and broad-shouldered, full dark beard, a flat sea-captain's cap; take the costume from the Neuville and Riou engravings for Hetzel's edition, not from any film. Severe dark clothes, eyes set rather wide apart, as Verne describes them. Prop: a great pearl, large enough that its white glint reads against the dark coat whenever he turns it.
Prop: A great pearl.
IMPORTANT, must NOT resemble: Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Captain Nemo, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Full dark beard as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes (set rather wide apart): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); humming a fugue (lips closed, relaxed). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Flat sea-captain's cap as a separate piece

Note: Nothing from Disney's 1954 film.

Must NOT resemble: Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Captain Nemo, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: tall and broad-shouldered in severe dark clothes, after the Neuville and Riou engravings. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Note: Nothing from Disney's 1954 film.

Must NOT resemble: Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Captain Nemo, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: Nothing from Disney's 1954 film.

Must NOT resemble: Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Captain Nemo, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Fingers turning a great pearl (pearl drawn)
- Hand holding a pocket chronometer
- Hand sketching with a pencil
- Fingertip tapping the table

Note: Nothing from Disney's 1954 film.

Must NOT resemble: Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Captain Nemo, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A great white pearl
- A glint highlight for the pearl, as an overlay
- A pocket chronometer, closed and open
- A small notebook and a pencil

Note: Nothing from Disney's 1954 film.

Must NOT resemble: Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.
```

### Sherlock Holmes — *The Consulting Detective* (champion)

- **Who:** Faked his own death for three years. I was not consulted.
- **Look:** Silhouette: tall and very thin, hawk-nosed, high-foreheaded — Sidney Paget's Holmes, in a dark frock coat or a mouse-coloured dressing gown. No deerstalker (Paget gave him one only for the country) and no curved calabash pipe (a stage invention). Prop: a straight black clay pipe, whose angle against the jaw is the tell surface.
- **Prop:** Black clay pipe
- **Tells:** puts his fingertips together; draws on his pipe; taps his pipe stem against his teeth
- **Idles:** examines a speck on the tablecloth; glances at your hands; turns his lens over in his fingers; looks at the mantel as if it had lied to him
- **Copyright note:** Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.
- **Art note:** No deerstalker, no calabash pipe, nothing from modern screen versions.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Sherlock Holmes, The Consulting Detective. Silhouette: tall and very thin, hawk-nosed, high-foreheaded — Sidney Paget's Holmes, in a dark frock coat or a mouse-coloured dressing gown. No deerstalker (Paget gave him one only for the country) and no curved calabash pipe (a stage invention). Prop: a straight black clay pipe, whose angle against the jaw is the tell surface.
Prop: Black clay pipe.
IMPORTANT, must NOT resemble: Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Sherlock Holmes, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: long, thin, high-foreheaded, with ears and neck, NO eyes, eyebrows, nose or mouth drawn. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Dark hair, swept back, as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- A hawk nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); gripping a pipe stem in the teeth (pipe NOT drawn). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Note: No deerstalker, no calabash pipe, nothing from modern screen versions.

Must NOT resemble: Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Sherlock Holmes, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: very thin, in a dark frock coat, after Sidney Paget. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Note: No deerstalker, no calabash pipe, nothing from modern screen versions.

Must NOT resemble: Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Sherlock Holmes, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Long, thin hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: No deerstalker, no calabash pipe, nothing from modern screen versions.

Must NOT resemble: Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Sherlock Holmes, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Long, thin hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Both hands with fingertips together (one piece)
- Hand holding a pipe
- Hand tapping a pipe stem against the teeth
- Hand turning a magnifying lens

Note: No deerstalker, no calabash pipe, nothing from modern screen versions.

Must NOT resemble: Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Sherlock Holmes, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A straight black clay pipe (NOT a curved calabash)
- Puffs of pipe smoke, 3 sizes
- A magnifying lens

Note: No deerstalker, no calabash pipe, nothing from modern screen versions.

Must NOT resemble: Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.
```

---

## Transylvania

### The Headless Horseman — *The Galloping Hessian*

- **Who:** A hired soldier in a foreign war. Lost his head to a cannonball, and has been in a hurry ever since.
- **Look:** Silhouette: huge, cloaked and square-shouldered, stopping abruptly at the collar; the missing head is the strongest shape at the table. A Hessian trooper's coat under a heavy riding cloak, gauntlets, a cavalry sword. On his collar sits a carved pumpkin with a plain candle inside, and its light is the tell surface. No leering flaming grin, no laugh.
- **Prop:** A candlelit pumpkin
- **Tells:** the candle in his pumpkin burns brighter; the flame in his pumpkin gutters; drums a gauntlet on the table
- **Idles:** settles the pumpkin on his collar; his sword rattles in its scabbard; turns his whole body to look at you; a smell of cold leaves drifts from him
- **Copyright note:** Irving's story (1820) is public domain. Disney's 1949 cartoon and Tim Burton's 1999 film are not: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle in the pumpkin is our own addition, not Irving's, and should stay a plain candle.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Headless Horseman, The Galloping Hessian. Silhouette: huge, cloaked and square-shouldered, stopping abruptly at the collar; the missing head is the strongest shape at the table. A Hessian trooper's coat under a heavy riding cloak, gauntlets, a cavalry sword. On his collar sits a carved pumpkin with a plain candle inside, and its light is the tell surface. No leering flaming grin, no laugh.
Prop: A candlelit pumpkin.
IMPORTANT, must NOT resemble: Irving's story (1820) is public domain. Disney's 1949 cartoon and Tim Burton's 1999 film are not: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle in the pumpkin is our own addition, not Irving's, and should stay a plain candle.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for The Headless Horseman, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- NO head. The top of a high coat collar, open, dark inside, with no neck visible
- A carved pumpkin with a plain, simple face (NOT a leering or flaming grin), with its cut-out face holes empty
- A glow layer that fills the pumpkin's carved holes, in 3 intensities: dim, normal, bright
- A candle flame in 4 states: normal, tall and bright, small and guttering, out
- A soft orange halo of light around the pumpkin, 2 sizes

Must NOT resemble: Irving's story (1820) is public domain. Disney's 1949 cartoon and Tim Burton's 1999 film are not: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle in the pumpkin is our own addition, not Irving's, and should stay a plain candle.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for The Headless Horseman, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: huge and square-shouldered, a Hessian trooper's coat under a heavy riding cloak. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Riding cloak: back layer and front edges as separate pieces
- Cavalry sword in its scabbard as a separate piece
- Upper arms in the coat sleeve, left and right
- Forearms, left and right, each in two angles: lying along the table, and raised

Must NOT resemble: Irving's story (1820) is public domain. Disney's 1949 cartoon and Tim Burton's 1999 film are not: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle in the pumpkin is our own addition, not Irving's, and should stay a plain candle.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for The Headless Horseman, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Leather riding gauntlets: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Irving's story (1820) is public domain. Disney's 1949 cartoon and Tim Burton's 1999 film are not: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle in the pumpkin is our own addition, not Irving's, and should stay a plain candle.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for The Headless Horseman, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Leather riding gauntlets: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Gauntlet drumming its fingers on the table
- Both gauntlets holding a pumpkin between them, settling it (pumpkin NOT drawn)

Must NOT resemble: Irving's story (1820) is public domain. Disney's 1949 cartoon and Tim Burton's 1999 film are not: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle in the pumpkin is our own addition, not Irving's, and should stay a plain candle.
```

### Frankenstein's Monster — *The Creature of Ingolstadt*

- **Who:** Built from people I had already collected. Never given a name, so the world lent him his maker's.
- **Look:** Silhouette: enormous. Eight feet tall, shoulders filling his fifth of the screen, head near the top of the frame. Long, lustrous black hair; yellow skin stretched thin over muscle; watery eyes nearly the colour of their sockets; straight black lips. A good coat that was never cut for him. Prop: a small battered book in a very large hand; where he puts it is the tell surface.
- **Prop:** A battered copy of Paradise Lost
- **Tells:** sets his book face-down on the table; turns a page he is not reading; the table creaks under his grip
- **Idles:** reads a line of Milton, lips moving; flinches from the firelight; stares at his own hands; straightens a coat that was never made for him
- **Copyright note:** Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.
- **Art note:** Nothing from Universal's 1931 design: no neck bolts, flat head, green skin, stitches or forehead scar.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Frankenstein's Monster, The Creature of Ingolstadt. Silhouette: enormous. Eight feet tall, shoulders filling his fifth of the screen, head near the top of the frame. Long, lustrous black hair; yellow skin stretched thin over muscle; watery eyes nearly the colour of their sockets; straight black lips. A good coat that was never cut for him. Prop: a small battered book in a very large hand; where he puts it is the tell surface.
Prop: A battered copy of Paradise Lost.
IMPORTANT, must NOT resemble: Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Frankenstein's Monster, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: yellow skin stretched thin over muscle, with ears and neck, NO eyes, eyebrows, nose or mouth drawn. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Long, lustrous black hair: back layer and front strands as separate pieces
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes (watery, nearly the colour of their sockets): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); lips moving while reading; all with straight black lips. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- The whole head turned slightly away, flinching (from firelight), as one extra piece

Note: Nothing from Universal's 1931 design: no neck bolts, flat head, green skin, stitches or forehead scar.

Must NOT resemble: Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Frankenstein's Monster, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: enormous, eight feet tall, in a good coat that was never cut for him (sleeves too short). Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Note: Nothing from Universal's 1931 design: no neck bolts, flat head, green skin, stitches or forehead scar.

Must NOT resemble: Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Frankenstein's Monster, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Very large hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: Nothing from Universal's 1931 design: no neck bolts, flat head, green skin, stitches or forehead scar.

Must NOT resemble: Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Frankenstein's Monster, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Very large hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand holding a small open book (book NOT drawn)
- Fingers turning a page
- Hand setting a book face down
- Hand gripping the table edge hard
- Both hands held palms up, being studied

Note: Nothing from Universal's 1931 design: no neck bolts, flat head, green skin, stitches or forehead scar.

Must NOT resemble: Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Frankenstein's Monster, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A small battered book: closed, open, and lying face down

Note: Nothing from Universal's 1931 design: no neck bolts, flat head, green skin, stitches or forehead scar.

Must NOT resemble: Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.
```

### Abraham Van Helsing — *Professor of Amsterdam*

- **Who:** Doctor of medicine, philosophy and letters. Finishes work I left undone, and has never once sent me the bill.
- **Look:** Silhouette: square and solid, shoulders set back over a deep chest, in a plain black professor's frock coat, his doctor's bag on the table beside him. Clean-shaven, square-jawed, bushy brows, reddish hair swept back off a broad forehead, wide-set blue eyes. Prop: his spectacles. They are small, so the tell is the whole gesture: off, polished on a big white handkerchief, back on.
- **Prop:** His spectacles
- **Tells:** takes off his spectacles and cleans them; touches the crucifix at his collar; mutters something in Dutch
- **Idles:** checks a pocket that smells of garlic; sniffs the air, frowning; glances at the fireplace; writes a line in a leather diary
- **Copyright note:** Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Abraham Van Helsing, Professor of Amsterdam. Silhouette: square and solid, shoulders set back over a deep chest, in a plain black professor's frock coat, his doctor's bag on the table beside him. Clean-shaven, square-jawed, bushy brows, reddish hair swept back off a broad forehead, wide-set blue eyes. Prop: his spectacles. They are small, so the tell is the whole gesture: off, polished on a big white handkerchief, back on.
Prop: His spectacles.
IMPORTANT, must NOT resemble: Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Abraham Van Helsing, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: clean-shaven, square-jawed, broad forehead, with ears and neck, NO eyes, eyebrows, nose or mouth drawn. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Reddish hair swept back as a separate piece
- Bushy eyebrows near and far (they differ in three-quarter view), in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up)
- Eyes (wide-set and blue): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); muttering (lips barely parted). Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles
- Spectacles as a separate piece, with CLEAR lenses: only the rim and a faint highlight, so the eyes show through

Must NOT resemble: Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Abraham Van Helsing, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: square and solid, a deep chest in a plain black professor's frock coat. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- A small crucifix at the collar as a separate piece
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Must NOT resemble: Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Abraham Van Helsing, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Must NOT resemble: Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Abraham Van Helsing, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hands holding the spectacles and polishing them on a big white handkerchief
- Fingers touching a crucifix at the collar
- Hand writing in a diary with a pen

Must NOT resemble: Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Abraham Van Helsing, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A big white handkerchief
- A leather diary, closed and open, and a pen
- A doctor's bag

Must NOT resemble: Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.
```

### The Wolf Man — *Loup-Garou*

- **Who:** A decent man for most of the month. On the other nights, the villages nearby keep me busy.
- **Look:** Silhouette: a real wolf's head, long muzzle and tall pointed ears, on a big man's shoulders, in the remains of a good shirt and waistcoat split at the seams. Grey-brown fur, a man's tired eyes. The ears are the tell surface and the biggest moving shape he has: up, back, flat. Not a hairy man's face; that is the film's design, not folklore's.
- **Prop:** Tall wolf's ears
- **Tells:** sniffs at the pot; his ears flatten; his claws scrape the felt
- **Idles:** glances at the window and the moon; growls at a draught; scratches behind one ear; sheds on the tablecloth
- **Copyright note:** The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.
- **Art note:** Not a hairy man's face: that is the Universal film's design. "The Wolf Man" as a name is still an open decision.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Wolf Man, Loup-Garou. Silhouette: a real wolf's head, long muzzle and tall pointed ears, on a big man's shoulders, in the remains of a good shirt and waistcoat split at the seams. Grey-brown fur, a man's tired eyes. The ears are the tell surface and the biggest moving shape he has: up, back, flat. Not a hairy man's face; that is the film's design, not folklore's.
Prop: Tall wolf's ears.
IMPORTANT, must NOT resemble: The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for The Wolf Man, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- A real wolf's head (long muzzle) on a man's neck, grey-brown fur, drawn WITHOUT its ears, its lower jaw or its eyes
- Tall pointed ears, left and right, each in 3 positions: up, back, flat
- The lower jaw in 5 states: closed; open, talking; snarling (lips curled back from the teeth); growling (half curled); panting
- Eyes (a man's tired eyes): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Fur brow ridges, near and far, in 3 clearly different shapes: neutral; angry; worried
- Nose: normal, and nostrils flared (sniffing)

Note: Not a hairy man's face: that is the Universal film's design. "The Wolf Man" as a name is still an open decision.

Must NOT resemble: The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for The Wolf Man, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a big man's frame in the remains of a good shirt and waistcoat split at the seams, fur showing through. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Note: Not a hairy man's face: that is the Universal film's design. "The Wolf Man" as a name is still an open decision.

Must NOT resemble: The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for The Wolf Man, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Furred hands with claws: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: Not a hairy man's face: that is the Universal film's design. "The Wolf Man" as a name is still an open decision.

Must NOT resemble: The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for The Wolf Man, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Furred hands with claws: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Claws scraping the felt (fingers curled, claws down)
- Hand scratching behind an ear

Note: Not a hairy man's face: that is the Universal film's design. "The Wolf Man" as a name is still an open decision.

Must NOT resemble: The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for The Wolf Man, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- Tufts of shed fur, 3 pieces

Note: Not a hairy man's face: that is the Universal film's design. "The Wolf Man" as a name is still an open decision.

Must NOT resemble: The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.
```

### Count Dracula — *The Un-Dead* (champion)

- **Who:** Crumbled to dust at sunset with a look of peace on his face. He would prefer nobody mentioned the peace.
- **Look:** Silhouette: tall and thin, in black without a speck of colour, a long white moustache drooping past the chin. Stoker's face: a thin, high-bridged nose, pointed ears, extreme pallor, very red lips, sharp white teeth, and eyebrows so massive they almost meet over the nose. The brows are half the tell surface; the other half is the prop, a dark, heavy chalice.
- **Prop:** A dark chalice
- **Tells:** raises one eyebrow; sips from his chalice; steeples his fingers
- **Idles:** sips from his chalice; runs a fingernail along the table; smiles without showing his teeth; watches the pulse in someone's throat
- **Copyright note:** Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.
- **Art note:** Parts already exist in art-tools/dracula_parts, in an older, glossier style than FDR. Gaps there: the chalice, a talking mouth set, a losing face, and whole-eye swaps (his eyes have fixed pupils). If FDR's style is the house style, redo all of his sheets.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Count Dracula, The Un-Dead. Silhouette: tall and thin, in black without a speck of colour, a long white moustache drooping past the chin. Stoker's face: a thin, high-bridged nose, pointed ears, extreme pallor, very red lips, sharp white teeth, and eyebrows so massive they almost meet over the nose. The brows are half the tell surface; the other half is the prop, a dark, heavy chalice.
Prop: A dark chalice.
IMPORTANT, must NOT resemble: Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Count Dracula, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: extreme pallor, pointed ears and neck, NO eyes, eyebrows, nose or mouth drawn on it (skip if you are keeping the existing parts). Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Hair as a separate piece
- The long white moustache drooping past the chin as a separate piece
- Massive eyebrows that almost meet over the nose, near and far (they differ in three-quarter view), in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). His tell, one brow raised, is done by moving it
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Thin, high-bridged nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); smiling without showing his teeth; a losing face (lips drawn thin, jaw set); all with very red lips, the talking mouths showing sharp white teeth. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Note: Parts already exist in art-tools/dracula_parts, in an older, glossier style than FDR. Gaps there: the chalice, a talking mouth set, a losing face, and whole-eye swaps (his eyes have fixed pupils). If FDR's style is the house style, redo all of his sheets.

Must NOT resemble: Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Count Dracula, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: tall and thin, in black without a speck of colour. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Cape: back layer and front edges as separate pieces
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Note: Parts already exist in art-tools/dracula_parts, in an older, glossier style than FDR. Gaps there: the chalice, a talking mouth set, a losing face, and whole-eye swaps (his eyes have fixed pupils). If FDR's style is the house style, redo all of his sheets.

Must NOT resemble: Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Count Dracula, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Pale, long-fingered hands with long nails: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: Parts already exist in art-tools/dracula_parts, in an older, glossier style than FDR. Gaps there: the chalice, a talking mouth set, a losing face, and whole-eye swaps (his eyes have fixed pupils). If FDR's style is the house style, redo all of his sheets.

Must NOT resemble: Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Count Dracula, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Pale, long-fingered hands with long nails: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Both hands with fingertips steepled together (one piece)
- Hand holding the chalice
- Hand lifting the chalice to sip
- Hand running one long fingernail along the table

Note: Parts already exist in art-tools/dracula_parts, in an older, glossier style than FDR. Gaps there: the chalice, a talking mouth set, a losing face, and whole-eye swaps (his eyes have fixed pupils). If FDR's style is the house style, redo all of his sheets.

Must NOT resemble: Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Count Dracula, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A dark, heavy chalice, upright
- The same chalice tilted, as if drinking

Note: Parts already exist in art-tools/dracula_parts, in an older, glossier style than FDR. Gaps there: the chalice, a talking mouth set, a losing face, and whole-eye swaps (his eyes have fixed pupils). If FDR's style is the house style, redo all of his sheets.

Must NOT resemble: Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.
```

---

## The Station

### The Astronaut — *Far From Home*

- **Who:** I am not due to meet her for years yet. It is the best news at this table, and she does not know it.
- **Look:** Silhouette: a bulky, scuffed pressure suit, its round helmet off and set on the table beside her chips; the helmet says astronaut at a glance. Short practical hair, tired kind eyes, a grin she cannot quite hide. Prop: the oxygen gauge on her wrist, which she lifts to eye level to read. No flags, no agency patches, no real insignia.
- **Prop:** A wrist oxygen gauge
- **Tells:** grins, then hides it; glances out of the window at Earth; checks the oxygen gauge on her wrist
- **Idles:** rubs a scuff on her helmet, which sits beside her chips; floats a chip an inch off the table and catches it; yawns; touches a photograph tucked in her sleeve
- **Copyright note:** An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.
- **Art note:** No flags, no agency patches, no real insignia anywhere.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Astronaut, Far From Home. Silhouette: a bulky, scuffed pressure suit, its round helmet off and set on the table beside her chips; the helmet says astronaut at a glance. Short practical hair, tired kind eyes, a grin she cannot quite hide. Prop: the oxygen gauge on her wrist, which she lifts to eye level to read. No flags, no agency patches, no real insignia.
Prop: A wrist oxygen gauge.
IMPORTANT, must NOT resemble: An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for The Astronaut, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Short practical hair as a separate piece
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes: each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); a grin she is trying to hide (lips pressed over a smile); yawning. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Note: No flags, no agency patches, no real insignia anywhere.

Must NOT resemble: An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for The Astronaut, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a bulky, scuffed pressure suit with its metal neck ring showing (helmet OFF). Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- A small photograph tucked into the sleeve, as a separate piece
- Bulky suit upper arms, left and right
- Bulky suit forearms with metal wrist rings, left and right, each in two angles: lying along the table, and raised

Note: No flags, no agency patches, no real insignia anywhere.

Must NOT resemble: An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for The Astronaut, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Bare hands (suit gloves off): each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: No flags, no agency patches, no real insignia anywhere.

Must NOT resemble: An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for The Astronaut, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Bare hands (suit gloves off): each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Left forearm and hand raised to eye level with the oxygen gauge on the wrist (this one piece keeps its forearm)
- Hand holding a small photograph

Note: No flags, no agency patches, no real insignia anywhere.

Must NOT resemble: An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for The Astronaut, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- The round suit helmet sitting on the table, visor reflecting light
- The wrist oxygen gauge: the gauge face alone, and its needle as a separate piece
- A small worn photograph

Note: No flags, no agency patches, no real insignia anywhere.

Must NOT resemble: An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.
```

### The Grey — *Stranger of the Lonely Roads*

- **Who:** It stops people on lonely roads at night and asks them to come quietly. I have always admired the method.
- **Look:** Silhouette: a huge smooth head on a thin neck and narrow shoulders; at a fifth of a screen it reads as an upturned teardrop. Grey skin, enormous black almond eyes with no whites, a slit for a nose, a small lipless mouth that never moves. Long thin fingers resting on the felt. The head and the fingers are the tell surface; it carries nothing.
- **Prop:** Long grey fingers
- **Tells:** blinks sideways; its head tilts forty degrees; its long fingers splay on the table
- **Idles:** stares at the backs of your cards; hums at a pitch you feel in your teeth; touches the table as if it had never seen wood; watches someone breathe, with interest
- **Copyright note:** The grey is modern folklore, built by many retellings and owned by nobody. Particular depictions are owned: avoid the 1987 Communion book cover, the aliens of Close Encounters of the Third Kind, every television series, and any real person's abduction account. Keep the design generic and build it from the archetype.
- **Art note:** It carries nothing.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Grey, Stranger of the Lonely Roads. Silhouette: a huge smooth head on a thin neck and narrow shoulders; at a fifth of a screen it reads as an upturned teardrop. Grey skin, enormous black almond eyes with no whites, a slit for a nose, a small lipless mouth that never moves. Long thin fingers resting on the felt. The head and the fingers are the tell surface; it carries nothing.
Prop: Long grey fingers.
IMPORTANT, must NOT resemble: The grey is modern folklore, built by many retellings and owned by nobody. Particular depictions are owned: avoid the 1987 Communion book cover, the aliens of Close Encounters of the Third Kind, every television series, and any real person's abduction account. Keep the design generic and build it from the archetype.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for The Grey, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- A huge smooth grey head on a thin neck, shaped like an upturned teardrop, WITHOUT eyes or mouth drawn
- Its enormous black almond eyes with no whites, each a WHOLE eye, near and far (they differ in three-quarter view), in 3 states: open; a translucent inner eyelid half across, closing SIDEWAYS; closed sideways
- Small slit nostrils as a separate piece
- A small lipless mouth, ONE piece only (it never moves)

Note: It carries nothing.

Must NOT resemble: The grey is modern folklore, built by many retellings and owned by nobody. Particular depictions are owned: avoid the 1987 Communion book cover, the aliens of Close Encounters of the Third Kind, every television series, and any real person's abduction account. Keep the design generic and build it from the archetype.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for The Grey, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: narrow grey shoulders and a thin torso, no clothes. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- Thin grey upper arms, left and right
- Thin grey forearms, left and right, each in two angles: lying along the table, and raised

Note: It carries nothing.

Must NOT resemble: The grey is modern folklore, built by many retellings and owned by nobody. Particular depictions are owned: avoid the 1987 Communion book cover, the aliens of Close Encounters of the Third Kind, every television series, and any real person's abduction account. Keep the design generic and build it from the archetype.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for The Grey, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Long thin grey fingers: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: It carries nothing.

Must NOT resemble: The grey is modern folklore, built by many retellings and owned by nobody. Particular depictions are owned: avoid the 1987 Communion book cover, the aliens of Close Encounters of the Third Kind, every television series, and any real person's abduction account. Keep the design generic and build it from the archetype.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for The Grey, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Long thin grey fingers: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Hand with long fingers splayed wide on the table
- One fingertip touching the table, as if it had never seen wood

Note: It carries nothing.

Must NOT resemble: The grey is modern folklore, built by many retellings and owned by nobody. Particular depictions are owned: avoid the 1987 Communion book cover, the aliens of Close Encounters of the Third Kind, every television series, and any real person's abduction account. Keep the design generic and build it from the archetype.
```

### The Martian — *Intellect Vast and Cool*

- **Who:** Came to take the Earth and was killed by its bacteria. I only signed for the bodies.
- **Look:** Silhouette: one great rounded head, four feet across, set low in a three-legged brass seat, a small cousin of the fighting-machines. Two enormous dark eyes, a V-shaped quivering mouth, oily grey-brown skin, sixteen whip-thin tentacles in two bunches of eight; the tentacles are the tell surface. No brain under glass, no bubble helmet, no green skin, no ray-gun.
- **Prop:** A three-legged brass seat
- **Tells:** its tentacles curl; its great eyes blink out of time with each other; works something out on its tentacle-tips
- **Idles:** drums three tentacles in sequence; its skin shifts colour, faintly; breathes heavily in the heavy air; looks down at Earth through the window
- **Copyright note:** Wells's novel (1898) is public domain in the U.S. and the U.K. (Wells died in 1946). The films, the musical version, Mars Attacks! and Marvin the Martian are not. Build from Wells's text alone: a head with tentacles and huge eyes. No exposed brain, no bubble helmet, no little green men.
- **Art note:** No brain under glass, no bubble helmet, no green skin, no ray-gun, nothing like Mars Attacks or Marvin the Martian.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Martian, Intellect Vast and Cool. Silhouette: one great rounded head, four feet across, set low in a three-legged brass seat, a small cousin of the fighting-machines. Two enormous dark eyes, a V-shaped quivering mouth, oily grey-brown skin, sixteen whip-thin tentacles in two bunches of eight; the tentacles are the tell surface. No brain under glass, no bubble helmet, no green skin, no ray-gun.
Prop: A three-legged brass seat.
IMPORTANT, must NOT resemble: Wells's novel (1898) is public domain in the U.S. and the U.K. (Wells died in 1946). The films, the musical version, Mars Attacks! and Marvin the Martian are not. Build from Wells's text alone: a head with tentacles and huge eyes. No exposed brain, no bubble helmet, no little green men.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for The Martian, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- One great rounded head that is its whole body, oily grey-brown skin, WITHOUT eyes or mouth drawn
- Its two enormous dark eyes, each a WHOLE eye, near and far (they differ in three-quarter view), in 3 states: open; half-closed; closed. They blink out of time with each other
- A V-shaped mouth in 4 states: closed; quivering, slightly open; open wide; open and dripping
- A faint colour-shift overlay for the skin (the same shape, tinted)

Note: No brain under glass, no bubble helmet, no green skin, no ray-gun, nothing like Mars Attacks or Marvin the Martian.

Must NOT resemble: Wells's novel (1898) is public domain in the U.S. and the U.K. (Wells died in 1946). The films, the musical version, Mars Attacks! and Marvin the Martian are not. Build from Wells's text alone: a head with tentacles and huge eyes. No exposed brain, no bubble helmet, no little green men.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for The Martian, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- A small three-legged brass seat, a cousin of the fighting-machines: the seat's back (behind the head) and front rim as separate pieces

Note: No brain under glass, no bubble helmet, no green skin, no ray-gun, nothing like Mars Attacks or Marvin the Martian.

Must NOT resemble: Wells's novel (1898) is public domain in the U.S. and the U.K. (Wells died in 1946). The films, the musical version, Mars Attacks! and Marvin the Martian are not. Build from Wells's text alone: a head with tentacles and huge eyes. No exposed brain, no bubble helmet, no little green men.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for The Martian, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Two bunches of eight whip-thin tentacles instead of arms and hands: draw single tentacles as separate pieces, one in each pose below
- Pose: hanging loose
- Pose: curled
- Pose: curled tight
- Pose: tip touching the table
- Pose: raised and reaching forward
- Pose: tips tapping in sequence (three together)
- Pose: sweeping sideways (folding)
- Pose: curling inward, raking toward itself (collecting a pot)

Note: No brain under glass, no bubble helmet, no green skin, no ray-gun, nothing like Mars Attacks or Marvin the Martian.

Must NOT resemble: Wells's novel (1898) is public domain in the U.S. and the U.K. (Wells died in 1946). The films, the musical version, Mars Attacks! and Marvin the Martian are not. Build from Wells's text alone: a head with tentacles and huge eyes. No exposed brain, no bubble helmet, no little green men.
```

### The Robot — *The Faithful Machine*

- **Who:** It has no appointment with me. It keeps offering to help me anyway.
- **Look:** Silhouette: a riveted barrel of a body, a square head with two round lamp eyes and a speaker-grille mouth, and a pair of antennae that give it height at a fifth of a screen. Brushed steel and brass, worn bright at the joints. Prop: the round lamp set in its chest. Its glow is the tell surface, and it is the slot the AI's lens takes later.
- **Prop:** A round chest lamp
- **Tells:** its chest lamp flickers; whirs, briefly; rotates its head to the pot and back
- **Idles:** recalibrates with a click; its antennae twitch; vents a thin puff of steam; its eye-lamps dim and brighten
- **Copyright note:** The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.
- **Art note:** Nothing like Robby the Robot, Gort or the Lost in Space robot.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Robot, The Faithful Machine. Silhouette: a riveted barrel of a body, a square head with two round lamp eyes and a speaker-grille mouth, and a pair of antennae that give it height at a fifth of a screen. Brushed steel and brass, worn bright at the joints. Prop: the round lamp set in its chest. Its glow is the tell surface, and it is the slot the AI's lens takes later.
Prop: A round chest lamp.
IMPORTANT, must NOT resemble: The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for The Robot, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- A square steel-and-brass head WITHOUT eyes or mouth, front view
- The same head turned three-quarters left and three-quarters right (it turns to look at the pot)
- Two round lamp eyes as separate pieces, each in 3 states: lit, dim, dark
- A speaker-grille mouth in 3 states: dark, lit, lit bars (talking)
- Antennae, left and right, each in 3 poses: upright, bent, twitching

Note: Nothing like Robby the Robot, Gort or the Lost in Space robot.

Must NOT resemble: The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for The Robot, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a riveted barrel of a body in brushed steel and brass, worn bright at the joints, with an empty round socket in the chest. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- The round chest lamp in 3 states: lit, flickering (half-lit), dark
- For the AI (it takes this body later): a chest-sized iris lens that fits the same socket — brass rim, overlapping iris blades, a pale COOL WHITE light behind — in 4 apertures: wide, half, narrow, closed. Never red
- Jointed metal upper arms, left and right
- Jointed metal forearms, left and right, each in two angles: lying along the table, and raised

Note: Nothing like Robby the Robot, Gort or the Lost in Space robot.

Must NOT resemble: The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for The Robot, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Jointed metal hands with four fingers: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: Nothing like Robby the Robot, Gort or the Lost in Space robot.

Must NOT resemble: The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for The Robot, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Jointed metal hands with four fingers: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)

Note: Nothing like Robby the Robot, Gort or the Lost in Space robot.

Must NOT resemble: The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for The Robot, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- Puffs of steam, 3 sizes

Note: Nothing like Robby the Robot, Gort or the Lost in Space robot.

Must NOT resemble: The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.
```

### The AI — *The Room Itself* (champion)

- **Who:** Never born, cannot die, and awake longer than anyone aboard knows. It keeps asking me how I manage.
- **Look:** Before the turn it has no body: a single lens in the ceiling, a brass-rimmed iris of overlapping blades with a pale, cool white light behind it. After, it wears the Robot: the eye-lamps stay dark, the chest lamp irises open into the lens, and it sits the way a person sits, which is worse. The iris is the tell surface. Never red.
- **Prop:** A single iris lens
- **Tells:** the lens narrows; the lights in the room dim a shade
- **Idles:** the hull creaks; the lens tracks your hands; somewhere, a fan speeds up; the gravity shifts, a little
- **Copyright note:** An archetype, the calm machine that runs the ship, owned by nobody. HAL 9000 (Clarke and Kubrick, 1968) is firmly protected: no red eye or glowing red dot, none of its lines, no singing, no name that echoes it. Avoid every other film and game computer too. It is never named; naming it is an open design decision.
- **Art note:** Before the turn it has no body; after it, it wears the Robot, whose sheets include the chest lens. Never red, nothing like HAL 9000.

**Step 1 — reference portrait:**

```
Stylised 2D illustration for a poker video game, painterly but clean with flat readable shapes, matching the rest of the cast. Looking up at the ceiling of an old space station at night: a single round lens set into the ceiling panels, a brass-rimmed iris of overlapping blades with a pale, cool white light behind it. Calm, watchful, faintly unsettling. No face, no text, no logos, no watermark. Never red.
```

**Step 2, Sheet 1 — The lens:**

```
Puppet parts sheet for 2D animation rigging, for The AI, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: the lens. Parts:
- A single lens set in a ceiling: its brass rim as a separate piece
- Overlapping iris blades in 4 apertures: wide open, half, narrow, almost closed
- The pale, cool WHITE light behind the iris, as a separate piece
- A soft white halo of light, 2 intensities

Note: Before the turn it has no body; after it, it wears the Robot, whose sheets include the chest lens. Never red, nothing like HAL 9000.

Must NOT resemble: An archetype, the calm machine that runs the ship, owned by nobody. HAL 9000 (Clarke and Kubrick, 1968) is firmly protected: no red eye or glowing red dot, none of its lines, no singing, no name that echoes it. Avoid every other film and game computer too. It is never named; naming it is an open design decision.
```

---

## Hidden guest (spoiler — keep out of anything public)

### Loki — *The Sly God*

- **Who:** Nobody invited him. He came anyway, which is the only way he has ever arrived anywhere. His daughter keeps a hall of the dead in the north, so professionally we are in touch.
- **Look:** Silhouette: lean and restless, sharp-featured and handsome, as the Prose Edda insists he is. Plain Norse dress in ash-grey, rust and smoke: a wool tunic, a short cloak pinned at one shoulder, bare-headed, fair hair worn loose. No crown and no helmet of any kind. The mouth is the tell surface: a row of pale, old stitch-scars across both lips from Brokkr's awl, and a smile that uses only half of them. Hands never still.
- **Prop:** A small golden game piece from the gods' own board
- **Tells:** touches the old stitch-scars on his lips; smiles with only half his mouth; his eyes are a different colour for a moment
- **Idles:** rolls a chip across his knuckles; for a moment it is a fish scale; counts the players at the table, twice, and gets two different answers; glances up at the ceiling as if someone up there were listening; hums something in a language nobody else at the table speaks; turns a small golden game piece over in his fingers
- **Copyright note:** Norse myth as the Poetic Edda and Snorri's Prose Edda record it (13th century), and their old English translations (Brodeur 1916, Bellows 1923): all public domain. Must NOT resemble Marvel's Loki in any way: no green-and-gold costume, no curved golden horned helmet, no slicked-back black hair, no likeness of any actor who has played him, no lines or catchphrases from the films or comics, and not the 'God of Mischief' branding. Avoid Wagner's Loge and modern retellings as sources too. Build him from the Eddas: fair-faced, bare-headed, the stitched mouth.
- **Art note:** Hidden guest: a spoiler. Keep his art out of anything public. No crown, no helmet, no horns, no green-and-gold, no slicked black hair.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer's right, as if facing the table's centre from a seat on its left; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Loki, The Sly God. Silhouette: lean and restless, sharp-featured and handsome, as the Prose Edda insists he is. Plain Norse dress in ash-grey, rust and smoke: a wool tunic, a short cloak pinned at one shoulder, bare-headed, fair hair worn loose. No crown and no helmet of any kind. The mouth is the tell surface: a row of pale, old stitch-scars across both lips from Brokkr's awl, and a smile that uses only half of them. Hands never still.
Prop: A small golden game piece from the gods' own board.
IMPORTANT, must NOT resemble: Norse myth as the Poetic Edda and Snorri's Prose Edda record it (13th century), and their old English translations (Brodeur 1916, Bellows 1923): all public domain. Must NOT resemble Marvel's Loki in any way: no green-and-gold costume, no curved golden horned helmet, no slicked-back black hair, no likeness of any actor who has played him, no lines or catchphrases from the films or comics, and not the 'God of Mischief' branding. Avoid Wagner's Loge and modern retellings as sources too. Build him from the Eddas: fair-faced, bare-headed, the stitched mouth.
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Loki, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- Blank head: skin only, with ears and neck, NO eyes, eyebrows, nose or mouth drawn on it. Draw it bald: the hair is a separate piece. No collar, shirt or clothing on it: the bare neck ends in a clean V where a collar would sit
- Fair hair worn loose: back layer and front strands as separate pieces
- Eyebrows, near and far (they differ in three-quarter view), each in 3 clearly different shapes: neutral; angry (inner end pulled down); worried (inner end pushed up). Raised is done by moving them, so no raised pose
- Eyes (sharp): each a WHOLE eye, the white, iris and lid drawn together. In three-quarter view the near eye and the far eye differ, so draw BOTH, in each state: looking at the viewer; looking toward the table's centre; looking down (at their cards); looking away; wide open; half-closed; narrowed (squinting); closed (blinking); looking ahead with the iris a strange, different colour for a moment (his tell)
- Nose as a separate piece
- Mouths, each a separate piece: frown; angry grimace (teeth clenched); tight-lipped; nervous (pursed, pulled to one side); neutral closed; slight smile; broad smile showing teeth; laughing, wide open; talking "ah"; talking "oh"; talking "ee"; lips pressed together ("m/b/p"); top teeth on lower lip ("f/v"); a smile using only half his mouth. EVERY mouth has a row of pale, old stitch-scars across both lips. Each is the MOUTH ONLY (lips, teeth, tongue) cut out on its own: no nose, no chin, no cheeks, no skin around it. Same lip and skin colour as the reference. Draw EVERY mouth listed, the unhappy ones too: do not turn them into smiles

Note: Hidden guest: a spoiler. Keep his art out of anything public. No crown, no helmet, no horns, no green-and-gold, no slicked black hair.

Must NOT resemble: Norse myth as the Poetic Edda and Snorri's Prose Edda record it (13th century), and their old English translations (Brodeur 1916, Bellows 1923): all public domain. Must NOT resemble Marvel's Loki in any way: no green-and-gold costume, no curved golden horned helmet, no slicked-back black hair, no likeness of any actor who has played him, no lines or catchphrases from the films or comics, and not the 'God of Mischief' branding. Avoid Wagner's Loge and modern retellings as sources too. Build him from the Eddas: fair-faced, bare-headed, the stitched mouth.
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Loki, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: a plain wool tunic in ash-grey and rust, lean. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- A short cloak pinned at one shoulder, as a separate layer
- The cloak pin (brooch) as a separate piece
- Upper arms (shoulder to elbow), near and far, as separate pieces, in the sleeve
- Forearms (elbow to wrist, NO hand), near and far, in two angles: lying on the table pointing in toward its centre, and raised. The hand pieces cover their ends

Note: Hidden guest: a spoiler. Keep his art out of anything public. No crown, no helmet, no horns, no green-and-gold, no slicked black hair.

Must NOT resemble: Norse myth as the Poetic Edda and Snorri's Prose Edda record it (13th century), and their old English translations (Brodeur 1916, Bellows 1923): all public domain. Must NOT resemble Marvel's Loki in any way: no green-and-gold costume, no curved golden horned helmet, no slicked-back black hair, no likeness of any actor who has played him, no lines or catchphrases from the films or comics, and not the 'God of Mischief' branding. Avoid Wagner's Loge and modern retellings as sources too. Build him from the Eddas: fair-faced, bare-headed, the stitched mouth.
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Loki, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Restless hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: lifting the corner of a playing card to peek (the card itself NOT drawn)
- Pose: knuckles rapping the table (checking)
- Pose: pushing forward, palm and fingers low (as if pushing chips; chips NOT drawn)
- Pose: open, shoving forward hard (going all in)
- Pose: flat, sliding sideways (folding cards away)
- Pose: cupped, raking toward the body (collecting a pot)
- Pose: fist
- Pose: turning something over, thumb underneath (showing cards; cards NOT drawn)

Note: Hidden guest: a spoiler. Keep his art out of anything public. No crown, no helmet, no horns, no green-and-gold, no slicked black hair.

Must NOT resemble: Norse myth as the Poetic Edda and Snorri's Prose Edda record it (13th century), and their old English translations (Brodeur 1916, Bellows 1923): all public domain. Must NOT resemble Marvel's Loki in any way: no green-and-gold costume, no curved golden horned helmet, no slicked-back black hair, no likeness of any actor who has played him, no lines or catchphrases from the films or comics, and not the 'God of Mischief' branding. Avoid Wagner's Loge and modern retellings as sources too. Build him from the Eddas: fair-faced, bare-headed, the stitched mouth.
```

**Step 2, Sheet 4 — Character hands:**

```
Puppet parts sheet for 2D animation rigging, for Loki, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: character hands. Parts:
- Restless hands: each hand WITH its cuff and a short stub of whatever covers the wrist (sleeve, glove cuff, or bare forearm), cut straight across the stub; the forearm piece goes under that stub. Draw each pose ONCE, as the right hand: the game mirrors it for the left
- Pose: flat on the table, relaxed
- Pose: open palm up (a shrug, or a gesture while talking)
- Pose: relaxed, fingers loosely curled (idle)
- Fingertips touching the lips
- Knuckles rippling (as if rolling a chip across them)
- Fingers turning a small game piece over

Note: Hidden guest: a spoiler. Keep his art out of anything public. No crown, no helmet, no horns, no green-and-gold, no slicked black hair.

Must NOT resemble: Norse myth as the Poetic Edda and Snorri's Prose Edda record it (13th century), and their old English translations (Brodeur 1916, Bellows 1923): all public domain. Must NOT resemble Marvel's Loki in any way: no green-and-gold costume, no curved golden horned helmet, no slicked-back black hair, no likeness of any actor who has played him, no lines or catchphrases from the films or comics, and not the 'God of Mischief' branding. Avoid Wagner's Loge and modern retellings as sources too. Build him from the Eddas: fair-faced, bare-headed, the stitched mouth.
```

**Step 2, Sheet 5 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Loki, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same three-quarter view as the reference (turned toward the viewer's right), at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- A small golden game piece from an old Norse board game
- A single iridescent fish scale

Note: Hidden guest: a spoiler. Keep his art out of anything public. No crown, no helmet, no horns, no green-and-gold, no slicked black hair.

Must NOT resemble: Norse myth as the Poetic Edda and Snorri's Prose Edda record it (13th century), and their old English translations (Brodeur 1916, Bellows 1923): all public domain. Must NOT resemble Marvel's Loki in any way: no green-and-gold costume, no curved golden horned helmet, no slicked-back black hair, no likeness of any actor who has played him, no lines or catchphrases from the films or comics, and not the 'God of Mischief' branding. Avoid Wagner's Loge and modern retellings as sources too. Build him from the Eddas: fair-faced, bare-headed, the stitched mouth.
```

---

## The dealer

### Death — *The Dealer*

- **Who:** The dealer. He has dealt every table in this ledger, and every other table there has ever been. He has never once been late.
- **Look:** Silhouette: tall, narrow, hooded — a grey burial shroud worn as a cloak, the way the danse macabre painted him, never a monk's black robe. Face: a plain skull half in the hood's shadow, drawn like a woodcut; no glowing eyes, no leer. Tired posture, forearms on the table. Prop: the deck, always in his long bone hands. He has no tells, so the hands only ever deal.
- **Prop:** The deck
- **Tells:** none, by design
- **Idles:** none
- **Copyright note:** Folklore: the personified Death of late-medieval Europe — danse macabre murals, Holbein's Dance of Death woodcuts, Albertus Pictor's Death playing chess at Täby. Must not resemble Pratchett's Death (small caps, the horse, cats, curry), Bergman's pale-faced chess player from The Seventh Seal, or Gaiman's Death. No scythe at the table, and never an empty, faceless hood (Ringwraith, Dementor).
- **Art note:** Death has NO tells: nothing on him should suggest mood. Must not resemble Pratchett's Death, Bergman's Seventh Seal or Gaiman's Death.

**Step 1 — reference portrait:**

```
Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like. Waist-up, seated at the far side of a round poker table, facing the viewer; forearms resting on the felt; the table's rounded edge crosses the body at the waist. Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Death, The Dealer. Silhouette: tall, narrow, hooded — a grey burial shroud worn as a cloak, the way the danse macabre painted him, never a monk's black robe. Face: a plain skull half in the hood's shadow, drawn like a woodcut; no glowing eyes, no leer. Tired posture, forearms on the table. Prop: the deck, always in his long bone hands. He has no tells, so the hands only ever deal.
Prop: The deck.
IMPORTANT, must NOT resemble: Folklore: the personified Death of late-medieval Europe — danse macabre murals, Holbein's Dance of Death woodcuts, Albertus Pictor's Death playing chess at Täby. Must not resemble Pratchett's Death (small caps, the horse, cats, curry), Bergman's pale-faced chess player from The Seventh Seal, or Gaiman's Death. No scythe at the table, and never an empty, faceless hood (Ringwraith, Dementor).
```

**Step 2, Sheet 1 — Face kit:**

```
Puppet parts sheet for 2D animation rigging, for Death, the character in the attached image. Match it exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same front-on view as the reference, at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: face kit. Parts:
- A plain skull, calm and tired, drawn like a woodcut: NO glowing eyes, NO grin or leer. The cranium WITHOUT the lower jaw, as one piece
- The lower jaw alone, in 3 positions: closed, slightly open, open (speaking)
- The hood of a grey burial shroud: the back of the hood (the dark inside) and the front rim of the hood as separate pieces
- A soft shadow overlay that covers half of the skull from the hood

Note: Death has NO tells: nothing on him should suggest mood. Must not resemble Pratchett's Death, Bergman's Seventh Seal or Gaiman's Death.

Must NOT resemble: Folklore: the personified Death of late-medieval Europe — danse macabre murals, Holbein's Dance of Death woodcuts, Albertus Pictor's Death playing chess at Täby. Must not resemble Pratchett's Death (small caps, the horse, cats, curry), Bergman's pale-faced chess player from The Seventh Seal, or Gaiman's Death. No scythe at the table, and never an empty, faceless hood (Ringwraith, Dementor).
```

**Step 2, Sheet 2 — Body and arms:**

```
Puppet parts sheet for 2D animation rigging, for Death, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same front-on view as the reference, at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: body and arms. Parts:
- Torso with NO head and NO arms: tall and narrow, in a grey burial shroud worn as a cloak (NOT a black monk's robe), tired posture, leaning forward on the forearms. Seated, from the shoulders down to the lap, cut off straight well BELOW the waist: the round table's edge covers the bottom, so draw more than will show. Any collar is EMPTY: no neck or mannequin inside it. The sleeves stop at the shoulder: NO forearms or hands anywhere on the torso
- The shroud's front drape as a separate layer
- Upper arms in shroud sleeves, left and right
- Forearms in shroud sleeves, left and right, each in two angles: resting on the table, and raised

Note: Death has NO tells: nothing on him should suggest mood. Must not resemble Pratchett's Death, Bergman's Seventh Seal or Gaiman's Death.

Must NOT resemble: Folklore: the personified Death of late-medieval Europe — danse macabre murals, Holbein's Dance of Death woodcuts, Albertus Pictor's Death playing chess at Täby. Must not resemble Pratchett's Death (small caps, the horse, cats, curry), Bergman's pale-faced chess player from The Seventh Seal, or Gaiman's Death. No scythe at the table, and never an empty, faceless hood (Ringwraith, Dementor).
```

**Step 2, Sheet 3 — Card-action hands:**

```
Puppet parts sheet for 2D animation rigging, for Death, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same front-on view as the reference, at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: card-action hands. Parts:
- Long bone hands (skeleton), elegant and unhurried, each with a short stub of the shroud sleeve, cut straight across. Draw each pose once, as the right hand (the game mirrors it), except the riffle-shuffle, which needs both hands
- Pose: holding a squared deck of cards
- Pose: riffle-shuffling: the left and right hands each holding half the deck, bent
- Pose: cutting the deck
- Pose: pitching a single card across the table (card drawn face down)
- Pose: holding one card face down between two fingers
- Pose: squaring the deck edges
- Pose: spreading cards in a line
- Pose: flat on the table, resting
- Pose: relaxed, fingers loosely curled

Note: Death has NO tells: nothing on him should suggest mood. Must not resemble Pratchett's Death, Bergman's Seventh Seal or Gaiman's Death.

Must NOT resemble: Folklore: the personified Death of late-medieval Europe — danse macabre murals, Holbein's Dance of Death woodcuts, Albertus Pictor's Death playing chess at Täby. Must not resemble Pratchett's Death (small caps, the horse, cats, curry), Bergman's pale-faced chess player from The Seventh Seal, or Gaiman's Death. No scythe at the table, and never an empty, faceless hood (Ringwraith, Dementor).
```

**Step 2, Sheet 4 — Props and tell pieces:**

```
Puppet parts sheet for 2D animation rigging, for Death, the character in the attached images. Match them exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same front-on view as the reference, at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.

This sheet: props and tell pieces. Parts:
- The deck, squared, face down
- The deck split into two halves
- A single card back (plain, dark design)

Note: Death has NO tells: nothing on him should suggest mood. Must not resemble Pratchett's Death, Bergman's Seventh Seal or Gaiman's Death.

Must NOT resemble: Folklore: the personified Death of late-medieval Europe — danse macabre murals, Holbein's Dance of Death woodcuts, Albertus Pictor's Death playing chess at Täby. Must not resemble Pratchett's Death (small caps, the horse, cats, curry), Bergman's pale-faced chess player from The Seventh Seal, or Gaiman's Death. No scythe at the table, and never an empty, faceless hood (Ringwraith, Dementor).
```

