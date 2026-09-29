# Room and table art prompts

The backdrop, the table, the chairs and the moving pieces for every venue, to go with `CHARACTER-ART-PROMPTS.md`. The room descriptions come from `data/tables/*.json` (`room`, `presence`, `ambience`); the art notes are written for the art (`art-tools/prompts/rooms.mjs`, which regenerates this file). Same bright cartoon style as the characters.

## How a room is built

Every room is the same stack of layers, back to front:

1. **Backdrop plate:** the room itself, wide (21:9) so it fills any phone in landscape. Big features go high and at the sides. The band behind the players' heads stays calmer, so faces read. Death deals from the far side, dead centre, so the backdrop directly behind him is the calmest part of all.
2. **Room pieces that come and go** (the "presence"): the empty couch at Athens, the laurel wreath at Rome, Dracula watching from beside the fire. They are separate so they can leave when the story says.
3. **Chairs:** one chair back per room, drawn once at three-quarter view and mirrored, like the characters. It goes behind each seated character.
4. **The characters** (see `CHARACTER-ART-PROMPTS.md`).
5. **The table:** a round top seen from the player's seat, so it's a wide ellipse. The far rim runs in front of the dealer and the far seats, and the sides curve down toward you, which is why a character in a side seat is cut lower than one at the back. The table hides every torso below its edge.
6. **Forearms, hands and props on the felt**, then the cards and chips (the game draws those).
7. **Moving pieces:** fire, lamp flames, rain, the Earth. A few frames each, looped: the room breathes, as the characters do.

**What makes each room its own:** the table (material, rim, cloth colour), the backdrop, and the light. Every table keeps a plain, even playing surface so cards and chips read on it; the character goes into the rim and the cloth colour.

**Leave out of every room:** no text, no UI, no buttons, no chips or cards, no chat or reward panels. The table mock-ups had all of these; the game draws its own few controls.

## At a glance

| Room | Table | Cloth | Light |
|---|---|---|---|
| The White House | Classic poker table: leather rim, brass studs, mahogany | green baize | Warm lamplight and firelight, gold and amber |
| Athens — The Symposium | Low marble table, Greek-key border, lion legs | terracotta red | Oil-lamp gold, warm and low, with blue night in the doorway |
| Pirate Cove | Lid of a rum tun, iron hoop, rope rim | weathered sailcloth | Lantern orange inside, cool moonlight blue through the open wall |
| Camelot | One curve of the Round Table, knights' names on the rim | dark green, on green-and-cream painted oak | Firelight gold, with cool stone shadow |
| Imperial Rome | Porphyry top, gold mosaic border | imperial purple | Brazier orange and fresco colour above, dusky violet through the window |
| Baker Street | Walnut Victorian loo table | green baize, a little worn | Gaslight yellow and firelight, fog-grey at the window |
| Transylvania | Black oak, iron-banded rim | blood red | Firelight red-orange against cold blue moonlight |
| The Station | Steel rim with a light strip, bolted down | deep blue | Cool white lamplight and blue Earthlight; after the turn, dim amber emergency light (never red) |
| The Champions' Tables (the Hall of Doors) | Black stone, a panel for each room on the rim | charcoal | Dark, lit only by what the open doors let in |
| The Last Crossing | Small, bare, worn wood, one lamp | none: bare wood | One oil lamp, warm and small, against storm-dark blue |

---

## The White House

**What makes it unique:** The only room that looks like a real place you could visit. Green baize, brass and a fire: the classic poker table, the baseline every other room departs from.

- **The room:** An oval drawing room upstairs, curtains drawn, a fire under a marble mantel with a clock on it. Portraits of all four players hang on the walls and watch their subjects play. Green felt, brass lamps, and cigar smoke gathering under a high white ceiling.
- **Sounds (for reference):** fire crackle; mantel clock ticking; rain on tall sash windows; footsteps in a far corridor
- **The table:** A classic round poker table: deep green baize, a padded rim in dark red-brown leather edged with brass studs, a polished mahogany apron.
- **Light:** Warm lamplight and firelight, gold and amber.
- **Chairs:** A dark mahogany armchair upholstered in deep green, brass nails.
- **Avoid:** No presidential seal, eagle crest, presidential flag or any government insignia: US law restricts the use of the seal, and the presidential flag carries it. An American flag is fine. It is NOT the Oval Office: no Resolute desk, no desk at all. No real White House photographs copied.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: The oval drawing room upstairs in the President's house: curved walls in cream and gold, tall sash windows with heavy curtains drawn and rain on the glass, a fire under a white marble mantel with a clock on it, brass lamps, cigar smoke gathering under a high white ceiling. Four gilt-framed portraits on the walls, one of each player (Washington, Lincoln, Theodore Roosevelt, FDR), painted in the game's own cartoon style. The windows at the back look toward the Washington Monument at night, with rain on the glass and the curtains half drawn.
Light: Warm lamplight and firelight, gold and amber.
Must NOT resemble: No presidential seal, eagle crest, presidential flag or any government insignia: US law restricts the use of the seal, and the presidential flag carries it. An American flag is fine. It is NOT the Oval Office: no Resolute desk, no desk at all. No real White House photographs copied.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: A classic round poker table: deep green baize, a padded rim in dark red-brown leather edged with brass studs, a polished mahogany apron.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A dark mahogany armchair upholstered in deep green, brass nails. Only the part above the table top matters; draw it whole anyway.
Light: Warm lamplight and firelight, gold and amber.
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: The White House. Parts:
- Fire in the grate: 3 flame frames
- Rain running down a window pane: 2 frames
- The mantel clock's pendulum
- A curl of cigar smoke, 3 sizes

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

---

## Athens — The Symposium

**What makes it unique:** Couches, oil lamps and wine instead of a card room: the table is low and round among dining couches, and one couch is kept for a guest who has not come.

- **The room:** The men's dining room of a rich Athenian house: painted plaster, oil lamps, couches drawn up around a card table. A great mixing bowl of wine and water stands in the middle of the floor, and nobody has fetched water in hours. One couch is empty, with a full cup set before it.
- **Presence:** A cup has been poured for a guest who has not come.
- **Sounds (for reference):** oil lamps guttering; wine ladled from the mixing bowl; crickets in the courtyard; pipes from a party down the street
- **The table:** A low, round Greek table: a marble top with a band of black Greek-key pattern round the rim, the playing surface a terracotta-red cloth, on three carved lion's legs.
- **Light:** Oil-lamp gold, warm and low, with blue night in the doorway.
- **Chairs:** A backless stool with a cushion, or the end of a dining couch: low, with a folded cloth.
- **Avoid:** Nothing from Disney's Hercules or the film 300.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: The men's dining room of a rich Athenian house at night: walls of painted plaster in red and ochre panels, dining couches with cushions round the walls, bronze oil lamps on stands, a great painted mixing bowl for wine standing on the floor at the back, a doorway open onto a courtyard under the stars. One couch at the side is empty, with a full cup set before it.
Light: Oil-lamp gold, warm and low, with blue night in the doorway.
Must NOT resemble: Nothing from Disney's Hercules or the film 300.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: A low, round Greek table: a marble top with a band of black Greek-key pattern round the rim, the playing surface a terracotta-red cloth, on three carved lion's legs.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A backless stool with a cushion, or the end of a dining couch: low, with a folded cloth. Only the part above the table top matters; draw it whole anyway.
Light: Oil-lamp gold, warm and low, with blue night in the doorway.
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: Athens — The Symposium. Parts:
- The empty couch with its full cup, as a separate piece (it stays until Odysseus arrives)
- Oil lamp flames: 3 frames
- A ladle dipping in the mixing bowl
- Stars twinkling in the doorway

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

---

## Pirate Cove

**What makes it unique:** The rowdiest room: a tavern half cut into the rock and half the stern of a wrecked ship, with the sea right outside. The table is the round lid of a rum tun.

- **The room:** A tavern built into the rock of a hidden cove, half of it the stern of a wrecked ship, lanterns swinging from old rigging and the tide slapping at the pilings under the floorboards. The card table is the round lid of a great rum tun, scarred by knife-points and pistol-butts. Through the open side wall, ships ride at anchor in the moonlight.
- **Sounds (for reference):** surf in the cove; creaking timbers and rigging; rowdy laughter through the wall; a bottle rolling across floorboards; a ship's bell out on the water
- **The table:** A round table made from the lid of a huge rum tun: thick dark planks bound with an iron hoop, scarred by knife-points and burned by pipes, a coil of tarred rope round the rim. The playing surface is weathered sailcloth stretched over the planks.
- **Light:** Lantern orange inside, cool moonlight blue through the open wall.
- **Chairs:** A barrel with a plank back, or a battered captain's chair.
- **Avoid:** Nothing from Disney's Pirates of the Caribbean: no Black Pearl, no tentacled crew, no Jolly Roger from the films.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: A tavern built into the rock of a hidden cove at night: rough rock walls on one side, the timbered stern of a wrecked ship with its gallery windows on the other, lanterns swinging from old rigging overhead, barrels and nets. One wall is open to the moonlit cove, where two ships ride at anchor.
Light: Lantern orange inside, cool moonlight blue through the open wall.
Must NOT resemble: Nothing from Disney's Pirates of the Caribbean: no Black Pearl, no tentacled crew, no Jolly Roger from the films.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: A round table made from the lid of a huge rum tun: thick dark planks bound with an iron hoop, scarred by knife-points and burned by pipes, a coil of tarred rope round the rim. The playing surface is weathered sailcloth stretched over the planks.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A barrel with a plank back, or a battered captain's chair. Only the part above the table top matters; draw it whole anyway.
Light: Lantern orange inside, cool moonlight blue through the open wall.
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: Pirate Cove. Parts:
- Lanterns swinging: 3 frames
- Moonlight glinting on the water: 2 frames
- A ship at anchor rocking
- A gull on the rigging, 2 poses

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

---

## Camelot

**What makes it unique:** THE Round Table: so big that the game uses one curve of it, and the rest of its circle runs off into the dark past a hundred empty chairs.

- **The room:** The great hall at Camelot, where the game is played around one curve of the Round Table and the rest of its circle runs off into the dark, past a hundred empty chairs, each with a knight's name in gold. Banners hang from the beams, rushes cover the floor, and the hearth could stable a horse. The one chair with no name on it is yours.
- **Sounds (for reference):** a great hearth fire; wind at a high window; a horse stamping in the yard; cups set down on oak; a far-off chapel bell
- **The table:** One curve of an enormous round oak table: far bigger than the others, so its edge curves gently. The top is painted in green and cream segments radiating from the centre, like the medieval round table at Winchester, and before each seat a knight's name is painted in gold on the rim. The playing area in front of the seats is plain dark green.
- **Light:** Firelight gold, with cool stone shadow.
- **Chairs:** A tall, high-backed oak chair with a knight's name in gold on the top rail.
- **Avoid:** Nothing from Disney's The Sword in the Stone, Monty Python, or the A24 Green Knight film.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: The great hall at Camelot: stone walls, heavy timber roof beams hung with long heraldic banners, rushes on the floor, a hearth big enough to stable a horse, tall narrow windows with night outside. The rest of the Round Table's circle curves away into the darkness behind the players, lined with high-backed chairs, empty, each with a name in gold.
Light: Firelight gold, with cool stone shadow.
Must NOT resemble: Nothing from Disney's The Sword in the Stone, Monty Python, or the A24 Green Knight film.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: One curve of an enormous round oak table: far bigger than the others, so its edge curves gently. The top is painted in green and cream segments radiating from the centre, like the medieval round table at Winchester, and before each seat a knight's name is painted in gold on the rim. The playing area in front of the seats is plain dark green.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A tall, high-backed oak chair with a knight's name in gold on the top rail. Only the part above the table top matters; draw it whole anyway.
Light: Firelight gold, with cool stone shadow.
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: Camelot. Parts:
- The great hearth fire: 3 frames
- A banner stirring in the draught: 2 frames
- Candle flames: 3 frames

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

---

## Imperial Rome

**What makes it unique:** Three eras stacked in one room: ancient brick below, Renaissance frescoes above, and a chain to the dog's chair. The richest table: imperial purple and gold.

- **The room:** A high hall inside Castel Sant'Angelo: the emperor Hadrian's tomb, later walled into a papal fortress. Ancient brick below, Renaissance frescoes above, braziers for light. An iron chain runs from the wall to the dog's chair, and nobody is certain who holds the other end.
- **Presence:** A laurel wreath waits on a cushion by the door. Its owner has been promised the next free chair.
- **Sounds (for reference):** brazier crackle; a heavy chain shifting on stone; distant bells over the city; a far-off arena crowd, rising and falling; a pen scratching on parchment
- **The table:** A round table with a top of dark red porphyry stone and a border of small gold mosaic tiles, the playing surface in imperial purple cloth.
- **Light:** Brazier orange and fresco colour above, dusky violet through the window.
- **Chairs:** A folding bronze Roman chair with a cushion; for Cerberus, a massive stone bench.
- **Avoid:** Nothing from the film Gladiator or the television series Rome or The Borgias.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: A high hall inside Castel Sant'Angelo in Rome: rough ancient Roman brick in the lower walls, bright Renaissance frescoes of clouds and allegorical figures on the vaulted ceiling above, iron braziers burning, a window onto the city at dusk. A heavy iron chain runs from a ring in the wall toward one of the seats. By the door, a laurel wreath waits on a red cushion.
Light: Brazier orange and fresco colour above, dusky violet through the window.
Must NOT resemble: Nothing from the film Gladiator or the television series Rome or The Borgias.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: A round table with a top of dark red porphyry stone and a border of small gold mosaic tiles, the playing surface in imperial purple cloth.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A folding bronze Roman chair with a cushion; for Cerberus, a massive stone bench. Only the part above the table top matters; draw it whole anyway.
Light: Brazier orange and fresco colour above, dusky violet through the window.
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: Imperial Rome. Parts:
- The laurel wreath on its cushion by the door, as a separate piece (it goes when Caesar arrives)
- Brazier flames: 3 frames
- The iron chain, slack and pulled taut
- Smoke rising from a brazier

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

---

## Baker Street

**What makes it unique:** The most cluttered and lived-in room: a Victorian sitting room full of evidence. The table is a round walnut loo table, the card table of the period.

- **The room:** The first-floor sitting room at 221B, as Watson described it: the acid-stained chemistry table shoved against the wall, letters jack-knifed to the mantelpiece, V.R. picked out in bullet holes. Gaslight, a coal fire, fog pressing at the bow window, and a violin case nobody else may open.
- **Sounds (for reference):** coal settling in the grate; hansom cab wheels on wet cobbles; a clock ticking on the mantel; a single violin string, plucked; street cries muffled by fog
- **The table:** A round Victorian loo table in walnut on a single carved pedestal, the playing surface green baize, a little worn.
- **Light:** Gaslight yellow and firelight, fog-grey at the window.
- **Chairs:** A buttoned leather armchair, and plain Victorian dining chairs.
- **Avoid:** Nothing from the BBC Sherlock, the Guy Ritchie films or Elementary: no smiley face in bullet holes, no modern flat.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: The first-floor sitting room at 221B Baker Street, as Watson described it: a chemistry table covered in acid-stained flasks shoved against the wall, letters stuck to the mantelpiece with a jack-knife, the letters V R picked out in bullet holes on the wallpaper, gas lamps, a coal fire, a violin case, a Persian slipper, and a bow window with yellow London fog pressing against the glass. Holmes's armchair by the fire.
Light: Gaslight yellow and firelight, fog-grey at the window.
Must NOT resemble: Nothing from the BBC Sherlock, the Guy Ritchie films or Elementary: no smiley face in bullet holes, no modern flat.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: A round Victorian loo table in walnut on a single carved pedestal, the playing surface green baize, a little worn.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A buttoned leather armchair, and plain Victorian dining chairs. Only the part above the table top matters; draw it whole anyway.
Light: Gaslight yellow and firelight, fog-grey at the window.
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: Baker Street. Parts:
- Coal fire: 3 frames
- Fog drifting past the window: 2 frames
- Gas lamp flame flicker

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

---

## Transylvania

**What makes it unique:** The only room where the champion is visible before he plays: Dracula sits watching from a high-backed chair beside the fire until two chairs empty.

- **The room:** The great hall of Castle Dracula: bare stone, black oak, and a hearth big enough to stand in, with one high-backed chair beside it that nobody else uses. Tall windows look out on the Carpathians and far too much moon. There is not a mirror in the building; the Count threw the last one out of a window.
- **Presence:** The chair by the fire is not empty.
- **Sounds (for reference):** a great hearth crackling; wolves, far off in the pass; wind worrying the shutters; water dripping somewhere in the stone; hooves pacing in the courtyard
- **The table:** A round table of black oak with an iron band round the rim, the playing surface in deep blood-red cloth.
- **Light:** Firelight red-orange against cold blue moonlight.
- **Chairs:** A tall, carved black-oak chair.
- **Avoid:** Nothing from Universal's or Hammer's Dracula films, no Bela Lugosi, no Castlevania.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: The great hall of Castle Dracula at night: bare grey stone, black oak beams, a hearth big enough to stand in with one high-backed chair beside it, tall arched windows onto the moonlit Carpathian mountains with far too much moon, iron candelabra, dust. No mirrors anywhere.
Light: Firelight red-orange against cold blue moonlight.
Must NOT resemble: Nothing from Universal's or Hammer's Dracula films, no Bela Lugosi, no Castlevania.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: A round table of black oak with an iron band round the rim, the playing surface in deep blood-red cloth.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A tall, carved black-oak chair. Only the part above the table top matters; draw it whole anyway.
Light: Firelight red-orange against cold blue moonlight.
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: Transylvania. Parts:
- The high-backed chair by the fire, empty
- The same chair with a dark, still figure seated in it, watching (Dracula in silhouette, only his eyes catching the firelight): it goes when he sits at the table
- The hearth fire in 2 states: roaring (3 frames) and sunk to embers (2 frames)
- Candle flames: 3 frames
- Clouds crossing the moon: 2 frames
- A bat crossing a window

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

---

## The Station

**What makes it unique:** The only room with no fire: cool steel, soft lamps and the whole Earth in the window. The room itself is a player, as a pale lens in the ceiling.

- **The room:** A round lounge on a slowly turning station: brushed steel, soft lamps, a felt table bolted to the floor, and one enormous window full of the Earth. The gravity is made, not given, and it is not quite right; now and then a chip lifts off the felt and settles again. A single lens sits in the ceiling, pale and unblinking.
- **Presence:** The room is listening.
- **Sounds (for reference):** air handlers breathing, slightly out of step; the hull ticking as it turns into sunlight; a soft chime from nowhere in particular; a chip lifting off the felt and clicking back down; a deep, slow hum under everything
- **The table:** A round table bolted to the floor on a single steel column: brushed-steel rim with a soft light strip under its lip, the playing surface deep blue felt.
- **Light:** Cool white lamplight and blue Earthlight; after the turn, dim amber emergency light (never red).
- **Chairs:** A padded swivel chair on a steel column, with a lap belt.
- **Avoid:** No NASA or agency insignia, no flags. Nothing from 2001: A Space Odyssey: no red eye, no HAL.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: A round lounge on a slowly turning space station: brushed steel and white panels, soft lamps, and one enormous curved window filling the back wall with the Earth, blue and white against black space. In the ceiling above the table, a single round lens: a brass-rimmed iris of overlapping blades with a pale white light behind it.
Light: Cool white lamplight and blue Earthlight; after the turn, dim amber emergency light (never red).
Must NOT resemble: No NASA or agency insignia, no flags. Nothing from 2001: A Space Odyssey: no red eye, no HAL.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: A round table bolted to the floor on a single steel column: brushed-steel rim with a soft light strip under its lip, the playing surface deep blue felt.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A padded swivel chair on a steel column, with a lap belt. Only the part above the table top matters; draw it whole anyway.
Light: Cool white lamplight and blue Earthlight; after the turn, dim amber emergency light (never red).
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: The Station. Parts:
- An amber emergency-lighting overlay for after the turn, as a flat tint
- The Earth, as a separate plate that turns slowly
- Stars
- The ceiling lens in 3 apertures
- A single poker chip floating an inch above the felt

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

---

## The Champions' Tables — the Hall of Doors

**What makes it unique:** One hall for both champions' tables: eight tall doors round a round hall, each spilling its own room's light. Which four stand open changes between the two tables.

- **The room (table I):** A round hall whose ceiling is lost in the dark, floored in polished black stone, with eight tall doors set around its wall — one for every table on the tour. Tonight the first four stand open, each spilling its own room's light and weather across the floor, and the round table sits where those four lights cross. Between the first door and the eighth there is a ninth, small, plain and shut; nobody at the table looks at it.
- **The room (table II):** The same hall, turned: now the last four doors stand open — brazier-light from Rome, gaslight and fog from Baker Street, red firelight from the Count's hall, the Station's blue Earthlight — and the first four are shut. Their light crosses at the round table, so every champion sits lit by their own room. The small, plain ninth door is still shut.
- **Sounds (for reference):** a hush under a ceiling too high to see; surf on a beach, faintly, through one doorway; wind at a castle window, through another; chips clicking on felt, echoing upward; a heavy door settling in its frame; a dog growling, three times over, through one doorway; hooves and cab wheels on wet cobbles, through another; a great fire settling in its hearth; a station's low hum from the fourth door
- **The table:** A round table of black stone, its rim inlaid with eight small panels, one for each room: a presidential portrait frame, a Greek key, a ship's wheel, a knight's shield, a laurel, a violin, a bat, a star. Playing surface in dark charcoal felt.
- **Light:** Dark, lit only by what the open doors let in.
- **Chairs:** A plain, high-backed black chair.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: A round hall whose ceiling is lost in darkness, floored in polished black stone, with eight tall doors set round its wall. Draw every door CLOSED in this plate. Between the first and the eighth, a ninth door, small, plain and shut.
Light: Dark, lit only by what the open doors let in.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: A round table of black stone, its rim inlaid with eight small panels, one for each room: a presidential portrait frame, a Greek key, a ship's wheel, a knight's shield, a laurel, a violin, a bat, a star. Playing surface in dark charcoal felt.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A plain, high-backed black chair. Only the part above the table top matters; draw it whole anyway.
Light: Dark, lit only by what the open doors let in.
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: The Champions' Tables — the Hall of Doors. Parts:
- Each of the eight doors OPEN, as separate pieces, each spilling its own room's light: gold firelight (White House), oil-lamp gold (Athens), moonlit sea (Pirate Cove), great-hall firelight (Camelot), brazier orange (Rome), gaslight and fog (Baker Street), red firelight (Transylvania), blue Earthlight (the Station). The first table opens the first four; the second opens the last four

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

---

## The Last Crossing

**What makes it unique:** The smallest room: no gold, no crowd, one lamp, one small round table and two chairs. Death sits across from you, front-on, for the first time as a player.

- **The room:** A plank-walled dock house on the near bank of a wide black river, at night, in a storm: one oil lamp on one small round table, two chairs, rain running down the windows. Through the glass, far out on the water, a ferryman's lantern is moving away from the shore with someone else aboard. No gold, no portraits, no crowd — a coil of rope, a boat hook on the wall, a door that never quite shuts.
- **Sounds (for reference):** rain on the windows; wind worrying at a door that will not quite shut; the river pulling at the pilings; an oar, far out on the water; the lamp flame guttering
- **The table:** A small round table of bare, worn, unpainted wood, no cloth, no felt, a single oil lamp standing on it.
- **Light:** One oil lamp, warm and small, against storm-dark blue.
- **Chairs:** A plain wooden chair.
- **Avoid:** Nothing from Pratchett's Discworld, Bergman's The Seventh Seal or Gaiman's Sandman.

**Backdrop plate:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.

The room: A plank-walled dock house on the bank of a wide black river, at night, in a storm: rain running down the windows, a coil of rope, a boat hook on the wall, a door that never quite shuts. Through the window, far out on the water, a ferryman's lantern moving away from the shore with a figure aboard.
Light: One oil lamp, warm and small, against storm-dark blue.
Must NOT resemble: Nothing from Pratchett's Discworld, Bergman's The Seventh Seal or Gaiman's Sandman.
```

**Table and chair:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. The card table alone, seen from a player's seat on its near side, looking across it, so the round top is a wide ellipse: the far rim runs across the picture, the sides curve down toward the viewer, and the near rim is cut off by the bottom of the frame. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), closed dark outline. No people, no cards, no chips, no text.

The table: A small round table of bare, worn, unpainted wood, no cloth, no felt, a single oil lamp standing on it.
Also, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: A plain wooden chair. Only the part above the table top matters; draw it whole anyway.
Light: One oil lamp, warm and small, against storm-dark blue.
```

**Moving and story pieces:**

```
Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal. Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.

For the room: The Last Crossing. Parts:
- The oil lamp flame: 3 frames, one guttering
- Rain on the window: 2 frames
- The ferryman's lantern and boat, small, drifting across the window
- The door, shut and open a crack

Soft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.
```

