# Character art prompts

Every character in the game, grouped by table, pulled from `data/characters/*.json` (`epithet`, `profile.ledger`, `profile.look`, `profile.prop`, `profile.public_domain`).

Each prompt = one shared style line + the character's `look` + prop + a "must not resemble" line from their copyright note. **Keep the style line identical across all characters** so the cast looks like one game. Art direction is still undecided (flat 2D vs low-poly 3D, ASSETS.md); the style line assumes flat 2D to match `art-tools/` — swap it if that changes.

Shared style line:

> Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

---

## The White House

### Franklin D. Roosevelt — *The Four-Term President*

- **Who:** Charming to everyone; candid with no one. He was sitting for a portrait when I arrived. It was never finished.
- **Look:** Silhouette: the naval cape across his shoulders and the long cigarette holder cocked upward from his teeth — a diagonal nobody else at the table has. Face: broad, chin lifted, pince-nez, a wide and ready smile. Prop: the cigarette holder; its angle is the tell surface and reads from across the room.
- **Prop:** Long cigarette holder
- **Copyright note:** Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Franklin D. Roosevelt, The Four-Term President. Silhouette: the naval cape across his shoulders and the long cigarette holder cocked upward from his teeth — a diagonal nobody else at the table has. Face: broad, chin lifted, pince-nez, a wide and ready smile. Prop: the cigarette holder; its angle is the tell surface and reads from across the room.
Prop: Long cigarette holder.
IMPORTANT, must NOT resemble: Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.
```

### Abraham Lincoln — *The Rail-Splitter*

- **Who:** Saw Lee surrender at Appomattox. Five days later he went to the theatre.
- **Look:** Silhouette: the longest frame at the table, bare-headed, the stovepipe hat resting on his knee with its crown showing above the table edge. Face: hollow cheeks, deep-set tired eyes, the chin beard with no moustache. Tell surface: the beard and his long hands, the largest moving shapes in his fifth of the screen.
- **Prop:** Stovepipe hat, on his knee
- **Copyright note:** Historical figure, died 1865; the Brady and Gardner photographs are public domain. Build from those. Avoid any modern screen likeness, including the 2012 Spielberg film, and anything from the vampire-hunter novel or film.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Abraham Lincoln, The Rail-Splitter. Silhouette: the longest frame at the table, bare-headed, the stovepipe hat resting on his knee with its crown showing above the table edge. Face: hollow cheeks, deep-set tired eyes, the chin beard with no moustache. Tell surface: the beard and his long hands, the largest moving shapes in his fifth of the screen.
Prop: Stovepipe hat, on his knee.
IMPORTANT, must NOT resemble: Historical figure, died 1865; the Brady and Gardner photographs are public domain. Build from those. Avoid any modern screen likeness, including the 2012 Spielberg film, and anything from the vampire-hunter novel or film.
```

### Theodore Roosevelt — *The Rough Rider*

- **Who:** Shot in Milwaukee, and gave the speech anyway. When I came for him he was asleep. It seemed wiser.
- **Look:** Silhouette: barrel chest, leaning forward on both elbows — the broadest shape at the table. Face: the heavy moustache and the enormous grin; the teeth must read at a fifth of a screen. Prop: round steel-rimmed spectacles. Taking them off to polish them is a big, readable gesture, and the grin does the rest.
- **Prop:** Round steel-rimmed spectacles
- **Copyright note:** Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Theodore Roosevelt, The Rough Rider. Silhouette: barrel chest, leaning forward on both elbows — the broadest shape at the table. Face: the heavy moustache and the enormous grin; the teeth must read at a fifth of a screen. Prop: round steel-rimmed spectacles. Taking them off to polish them is a big, readable gesture, and the grin does the rest.
Prop: Round steel-rimmed spectacles.
IMPORTANT, must NOT resemble: Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.
```

### George Washington — *Father of His Country* (champion)

- **Who:** Gave back an army, then a country, and nobody made him do either. His last words were 'Tis well. I saw no reason to argue.
- **Look:** Silhouette: the straightest back at the table, high collar, his own hair powdered and tied at the nape — not a wig. Face: long, heavy-jawed, the mouth set firm. Prop: the buff-and-blue general's coat with gold epaulettes; its cuffs and shoulders are the tell surface, so any change in that upright line reads at once.
- **Prop:** Buff-and-blue general's coat
- **Copyright note:** Historical figure, died 1799. Build from the Gilbert Stuart and Charles Willson Peale portraits, which are public domain. Avoid the look and staging of the musical Hamilton and any modern screen likeness. No wooden teeth: that is a myth.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: George Washington, Father of His Country. Silhouette: the straightest back at the table, high collar, his own hair powdered and tied at the nape — not a wig. Face: long, heavy-jawed, the mouth set firm. Prop: the buff-and-blue general's coat with gold epaulettes; its cuffs and shoulders are the tell surface, so any change in that upright line reads at once.
Prop: Buff-and-blue general's coat.
IMPORTANT, must NOT resemble: Historical figure, died 1799. Build from the Gilbert Stuart and Charles Willson Peale portraits, which are public domain. Avoid the look and staging of the musical Hamilton and any modern screen likeness. No wooden teeth: that is a myth.
```

---

## Athens — The Symposium

### Polyphemus the Cyclops — *Son of the Sea-God*

- **Who:** Ate six of Odysseus's men, then took offence when their captain lied about his name. He has held the grudge ever since.
- **Look:** Silhouette: enormous, head and shoulders above everyone, filling his fifth of the screen and some of his neighbours'. Face: one great eye in the middle of the brow with an old burn scar around it, a shaggy black beard, a sheepskin over the shoulders. Prop: his club of green olive wood, a fathom shorter than it used to be. Tells live on the eye and the fist.
- **Prop:** Olive-wood club, leaning on the table
- **Copyright note:** Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Polyphemus the Cyclops, Son of the Sea-God. Silhouette: enormous, head and shoulders above everyone, filling his fifth of the screen and some of his neighbours'. Face: one great eye in the middle of the brow with an old burn scar around it, a shaggy black beard, a sheepskin over the shoulders. Prop: his club of green olive wood, a fathom shorter than it used to be. Tells live on the eye and the fist.
Prop: Olive-wood club, leaning on the table.
IMPORTANT, must NOT resemble: Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.
```

### Leonidas — *King of Sparta*

- **Who:** An oracle said Sparta would fall or a king would die. He chose, and kept the appointment.
- **Look:** Silhouette: a red cloak over a bronze breastplate, long hair and full beard, fists on the felt. Face: level eyes, jaw set, a man already bored of the conversation. Prop: the bronze Corinthian helmet with its tall horsehair crest, set on the table at his elbow — the biggest shape at the table. Tells live on the fists and the lift of the chin.
- **Prop:** Crested bronze helmet, on the table
- **Copyright note:** Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Leonidas, King of Sparta. Silhouette: a red cloak over a bronze breastplate, long hair and full beard, fists on the felt. Face: level eyes, jaw set, a man already bored of the conversation. Prop: the bronze Corinthian helmet with its tall horsehair crest, set on the table at his elbow — the biggest shape at the table. Tells live on the fists and the lift of the chin.
Prop: Crested bronze helmet, on the table.
IMPORTANT, must NOT resemble: Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.
```

### Medusa — *The Gorgon*

- **Who:** The only one of three sisters who could die. Perseus managed it by looking the other way.
- **Look:** Silhouette: a head of living snakes, a moving crown nobody else at the table has, readable at any size. Face: a young woman's, pale and calm, heavy-lidded; the eyes are drawn as ordinary, which is the unsettling choice. Prop: the snakes themselves — their stillness, coiling and hissing are her whole tell surface.
- **Prop:** Her hair of snakes
- **Copyright note:** Greek myth (Hesiod, Pindar, Ovid), all public domain; classical art such as the Rondanini Medusa is fair reference. Avoid Harryhausen's Medusa from Clash of the Titans (1981: serpent body, rattle tail, bow) and its 2010 remake, and the Percy Jackson Medusa (sunglasses, garden statues). She has legs and sits in a chair.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Medusa, The Gorgon. Silhouette: a head of living snakes, a moving crown nobody else at the table has, readable at any size. Face: a young woman's, pale and calm, heavy-lidded; the eyes are drawn as ordinary, which is the unsettling choice. Prop: the snakes themselves — their stillness, coiling and hissing are her whole tell surface.
Prop: Her hair of snakes.
IMPORTANT, must NOT resemble: Greek myth (Hesiod, Pindar, Ovid), all public domain; classical art such as the Rondanini Medusa is fair reference. Avoid Harryhausen's Medusa from Clash of the Titans (1981: serpent body, rattle tail, bow) and its 2010 remake, and the Percy Jackson Medusa (sunglasses, garden statues). She has legs and sits in a chair.
```

### Socrates — *The Gadfly of Athens*

- **Who:** Drank the hemlock, walked about until his legs grew heavy, lay down, and remembered a debt. The calmest appointment I have kept.
- **Look:** Silhouette: bald dome, big untidy beard, a short thick body in one plain, shabby cloak — the only unadorned figure at the table, which is exactly why he reads. Face: snub nose, wide bulging eyes, a satyr's face with a good-humoured mouth. Prop: a shallow wine cup, drained and refilled all night. Tells live on the big shapes of the face: nose, smile, the upward glance.
- **Prop:** Shallow wine cup
- **Copyright note:** Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Socrates, The Gadfly of Athens. Silhouette: bald dome, big untidy beard, a short thick body in one plain, shabby cloak — the only unadorned figure at the table, which is exactly why he reads. Face: snub nose, wide bulging eyes, a satyr's face with a good-humoured mouth. Prop: a shallow wine cup, drained and refilled all night. Tells live on the big shapes of the face: nose, smile, the upward glance.
Prop: Shallow wine cup.
IMPORTANT, must NOT resemble: Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.
```

### Odysseus — *The Man of Many Turns* (champion)

- **Who:** Ten years at war, ten more getting home. Arrived last, alone and in disguise, and still won. He is late here too.
- **Look:** Silhouette: a head shorter than the kings around him but broader in the chest and shoulders (Homer says so), a sea-stained cloak, and the conical felt sailor's cap he wears in Greek vase painting. Face: weathered, grizzled curly beard, amused eyes that are always doing sums. Prop: a heavy gold ring — make it big enough to catch the light, because his hands are the tell surface.
- **Prop:** Heavy gold ring
- **Copyright note:** Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Odysseus, The Man of Many Turns. Silhouette: a head shorter than the kings around him but broader in the chest and shoulders (Homer says so), a sea-stained cloak, and the conical felt sailor's cap he wears in Greek vase painting. Face: weathered, grizzled curly beard, amused eyes that are always doing sums. Prop: a heavy gold ring — make it big enough to catch the light, because his hands are the tell surface.
Prop: Heavy gold ring.
IMPORTANT, must NOT resemble: Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.
```

---

## Pirate Cove

### Davy Jones — *The Fiend of the Deep*

- **Who:** Sailors named him, feared him, and never agreed on his face. We are in related lines of work.
- **Look:** Silhouette: tall and hunched in a long, waterlogged sea-coat and a broad hat whose brim sheds a thread of water, weed caught in the folds. Face: grey as a drowned man's, mostly in shadow, with a sodden grey beard — plainly hair — and two pale, round, unblinking eyes that catch the lamplight. Prop: the dripping sleeve, the one wet thing at a dry table.
- **Prop:** His dripping coat-sleeve
- **Copyright note:** Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Davy Jones, The Fiend of the Deep. Silhouette: tall and hunched in a long, waterlogged sea-coat and a broad hat whose brim sheds a thread of water, weed caught in the folds. Face: grey as a drowned man's, mostly in shadow, with a sodden grey beard — plainly hair — and two pale, round, unblinking eyes that catch the lamplight. Prop: the dripping sleeve, the one wet thing at a dry table.
Prop: His dripping coat-sleeve.
IMPORTANT, must NOT resemble: Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.
```

### Captain William Kidd — *Privateer, by His Own Account*

- **Who:** Sailed with the King's commission to hunt pirates, and came home one. Hanged twice on the same day; the first rope broke.
- **Look:** Silhouette: a respectable merchant captain — full-bottomed wig under a plain three-cornered hat, a good broadcloth coat buttoned high, a cravat he keeps loosening at the throat. Face: heavy, anxious, forever checking behind him. Prop: the coat itself — the broad buttoned chest, where one hand keeps patting for something that may or may not be in the inside pocket.
- **Prop:** His buttoned coat and its inside pocket
- **Copyright note:** Historical figure, hanged 1701. Build from the trial record and period portraits of New York merchant captains. Avoid Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon buried-treasure buccaneer. He should look like what he always claimed to be: an honest captain with papers.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Captain William Kidd, Privateer, by His Own Account. Silhouette: a respectable merchant captain — full-bottomed wig under a plain three-cornered hat, a good broadcloth coat buttoned high, a cravat he keeps loosening at the throat. Face: heavy, anxious, forever checking behind him. Prop: the coat itself — the broad buttoned chest, where one hand keeps patting for something that may or may not be in the inside pocket.
Prop: His buttoned coat and its inside pocket.
IMPORTANT, must NOT resemble: Historical figure, hanged 1701. Build from the trial record and period portraits of New York merchant captains. Avoid Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon buried-treasure buccaneer. He should look like what he always claimed to be: an honest captain with papers.
```

### Long John Silver — *The Sea-Cook*

- **Who:** Changed sides on one island, then changed back, and came out ahead both times. Left with a bag of coin. I am still waiting.
- **Look:** Silhouette: very tall and broad, a big pale smiling face, a cook's apron over a sailor's coat, the top of a crutch under one arm — and the parrot on his shoulder, the brightest, busiest thing at the table. Everything else distinctive about him is below the table's edge. Prop: Captain Flint, the parrot — she preens, sidles and shrieks, and she is the part of him that moves.
- **Prop:** Captain Flint, his parrot
- **Copyright note:** Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Long John Silver, The Sea-Cook. Silhouette: very tall and broad, a big pale smiling face, a cook's apron over a sailor's coat, the top of a crutch under one arm — and the parrot on his shoulder, the brightest, busiest thing at the table. Everything else distinctive about him is below the table's edge. Prop: Captain Flint, the parrot — she preens, sidles and shrieks, and she is the part of him that moves.
Prop: Captain Flint, his parrot.
IMPORTANT, must NOT resemble: Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.
```

### Blackbeard — *Captain of the Queen Anne's Revenge* (champion)

- **Who:** Put smoke in his hat so that ships would surrender without a fight. Most did. The last one did not.
- **Look:** Silhouette: a broad black hat with smoke curling from under the brim on both sides, over a huge black beard in ribbon-tied braids that covers most of his face. Heavy dark coat, a sling of pistols across the chest. Eyes that hold a stare. Prop: the braided beard — big, dark, dead centre in his fifth of the screen, and the shape his hand keeps going back to.
- **Prop:** His braided black beard
- **Copyright note:** Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Blackbeard, Captain of the Queen Anne's Revenge. Silhouette: a broad black hat with smoke curling from under the brim on both sides, over a huge black beard in ribbon-tied braids that covers most of his face. Heavy dark coat, a sling of pistols across the chest. Eyes that hold a stare. Prop: the braided beard — big, dark, dead centre in his fifth of the screen, and the shape his hand keeps going back to.
Prop: His braided black beard.
IMPORTANT, must NOT resemble: Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.
```

---

## Camelot

### The Green Knight — *Knight of the Green Chapel*

- **Who:** Rode into Camelot at New Year and offered anyone the first blow with his own axe. Someone took it. He took it well.
- **Look:** Silhouette: enormous — a head taller than anyone seated, broad as a door, with a great bush of green beard and green hair to the shoulders. Green skin, green clothes worked with gold, and no armour: the poem says he came in peace. Face: green, grinning, bright-eyed. Prop: the holly branch at his side, a big dark spiky shape that rustles; the axe leans against the table.
- **Prop:** A holly branch
- **Copyright note:** The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Green Knight, Knight of the Green Chapel. Silhouette: enormous — a head taller than anyone seated, broad as a door, with a great bush of green beard and green hair to the shoulders. Green skin, green clothes worked with gold, and no armour: the poem says he came in peace. Face: green, grinning, bright-eyed. Prop: the holly branch at his side, a big dark spiky shape that rustles; the axe leans against the table.
Prop: A holly branch.
IMPORTANT, must NOT resemble: The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.
```

### Sir Lancelot — *The Best Knight in the World*

- **Who:** The best knight in the world, by general agreement, his own included. Died a hermit. It surprised everyone but me.
- **Look:** Silhouette: the handsomest man at the table and dressed for it — polished plate at the shoulders, a bright surcoat, a fall of dark hair he keeps tossing back. Face: fine-boned, proud, faintly bored until someone challenges him. Prop: the right gauntlet, polished steel that catches the light, large enough at a fifth of the screen to be seen being buffed.
- **Prop:** A polished steel gauntlet
- **Copyright note:** Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Sir Lancelot, The Best Knight in the World. Silhouette: the handsomest man at the table and dressed for it — polished plate at the shoulders, a bright surcoat, a fall of dark hair he keeps tossing back. Face: fine-boned, proud, faintly bored until someone challenges him. Prop: the right gauntlet, polished steel that catches the light, large enough at a fifth of the screen to be seen being buffed.
Prop: A polished steel gauntlet.
IMPORTANT, must NOT resemble: Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.
```

### Merlin — *The King's Prophet*

- **Who:** Foresaw his own end and arrived for it on time. I appreciate punctuality.
- **Look:** Silhouette: lean and tall in a hooded, undyed wool robe, hood usually up; a long, wild grey beard; a rough knotted staff taller than he is, planted upright beside his chair. Face: weathered, with deep-set eyes that never quite settle on the table. No pointed hat, no stars, no owl. Prop: the staff — a tall vertical line that can hum and glow faintly without being touched.
- **Prop:** A tall knotted staff
- **Copyright note:** Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Merlin, The King's Prophet. Silhouette: lean and tall in a hooded, undyed wool robe, hood usually up; a long, wild grey beard; a rough knotted staff taller than he is, planted upright beside his chair. Face: weathered, with deep-set eyes that never quite settle on the table. No pointed hat, no stars, no owl. Prop: the staff — a tall vertical line that can hum and glow faintly without being touched.
Prop: A tall knotted staff.
IMPORTANT, must NOT resemble: Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.
```

### King Arthur — *Lord of the Round Table* (champion)

- **Who:** Drew a sword from a stone because his foster-brother had left his own behind. Some say he is not dead. I have never commented.
- **Look:** Silhouette: a plain gold crown with a visible dent, a red mantle over broad mailed shoulders, a greying beard kept short. Face: open, lined, kind, and tired around the eyes. Prop: Excalibur, sheathed and standing upright beside his chair with the hilt at his hand — a big cross-shape his hand can rest on, and leave.
- **Prop:** Excalibur, hilt to hand
- **Copyright note:** Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: King Arthur, Lord of the Round Table. Silhouette: a plain gold crown with a visible dent, a red mantle over broad mailed shoulders, a greying beard kept short. Face: open, lined, kind, and tired around the eyes. Prop: Excalibur, sheathed and standing upright beside his chair with the hilt at his hand — a big cross-shape his hand can rest on, and leave.
Prop: Excalibur, hilt to hand.
IMPORTANT, must NOT resemble: Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.
```

---

## Imperial Rome

### Cerberus — *The Hound at the Gate*

- **Who:** Lets everyone in. Lets nobody out. We have kept the same hours for a very long time.
- **Look:** Silhouette: three heads on one massive body — nothing else in the game looks like it. Black, short-coated, heavy in the jaw, with a low ridge of small snakes along the neck and spine after Apollodorus, kept subtle so it never clutters the read. The heads are the tell surface: each can watch, sleep, yawn or snarl on its own.
- **Prop:** Three iron collars on one chain
- **Copyright note:** Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Cerberus, The Hound at the Gate. Silhouette: three heads on one massive body — nothing else in the game looks like it. Black, short-coated, heavy in the jaw, with a low ridge of small snakes along the neck and spine after Apollodorus, kept subtle so it never clutters the read. The heads are the tell surface: each can watch, sleep, yawn or snarl on its own.
Prop: Three iron collars on one chain.
IMPORTANT, must NOT resemble: Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.
```

### Pope Alexander VI — *The Borgia Pope*

- **Who:** Said to have bought the votes that made him pope. Said to have been poisoned. I was there for one of those.
- **Look:** Silhouette: the tall mitre — nothing else at this table points straight up. A heavy, genial face with a strong nose, after Pinturicchio's fresco of him in the Borgia Apartments. Gold-embroidered vestments that swallow the chair. Prop: the papal ring, drawn oversized so that turning it throws a flash of gold the eye catches at a fifth of the screen.
- **Prop:** The papal ring
- **Copyright note:** Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Pope Alexander VI, The Borgia Pope. Silhouette: the tall mitre — nothing else at this table points straight up. A heavy, genial face with a strong nose, after Pinturicchio's fresco of him in the Borgia Apartments. Gold-embroidered vestments that swallow the chair. Prop: the papal ring, drawn oversized so that turning it throws a flash of gold the eye catches at a fifth of the screen.
Prop: The papal ring.
IMPORTANT, must NOT resemble: Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.
```

### Spartacus — *Gladiator of Capua*

- **Who:** Broke out of a gladiator school with kitchen knives. Beat Rome's armies for two years. Nobody found his body. I did.
- **Look:** Silhouette: broad bare shoulders under a rough Thracian cloak, cropped hair, a nose broken more than once. A fighter, not a showman, so no gladiator helmet. Heavy hands that never quite rest. Prop: the old shackle scar on his wrist, drawn as a pale band wide enough to read at a fifth of the screen. Wrist and shoulders carry his tells.
- **Prop:** The shackle scar on his wrist
- **Copyright note:** Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Spartacus, Gladiator of Capua. Silhouette: broad bare shoulders under a rough Thracian cloak, cropped hair, a nose broken more than once. A fighter, not a showman, so no gladiator helmet. Heavy hands that never quite rest. Prop: the old shackle scar on his wrist, drawn as a pale band wide enough to read at a fifth of the screen. Wrist and shoulders carry his tells.
Prop: The shackle scar on his wrist.
IMPORTANT, must NOT resemble: Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.
```

### Julius Caesar — *Dictator for Life* (champion)

- **Who:** Twenty-three wounds. A physician said afterwards that only one of them was fatal. It only ever takes one.
- **Look:** Silhouette: the laurel wreath, worn low over a high forehead — Suetonius says no honour pleased him more than the right to wear it at all times, because it hid his thinning hair. Tall, fair-skinned, keen dark eyes; a toga with a broad purple border. Prop: the wreath itself. Its angle on his head is the tell surface.
- **Prop:** Laurel wreath
- **Copyright note:** Historical figure, died 44 BC. Build from the coins of 44 BC, the first Roman coinage to carry a living man's portrait. Avoid every film and television likeness and the Asterix caricature. No "Et tu, Brute?" — that is Shakespeare's line, not the ancient sources'.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Julius Caesar, Dictator for Life. Silhouette: the laurel wreath, worn low over a high forehead — Suetonius says no honour pleased him more than the right to wear it at all times, because it hid his thinning hair. Tall, fair-skinned, keen dark eyes; a toga with a broad purple border. Prop: the wreath itself. Its angle on his head is the tell surface.
Prop: Laurel wreath.
IMPORTANT, must NOT resemble: Historical figure, died 44 BC. Build from the coins of 44 BC, the first Roman coinage to carry a living man's portrait. Avoid every film and television likeness and the Asterix caricature. No "Et tu, Brute?" — that is Shakespeare's line, not the ancient sources'.
```

---

## Baker Street

### Alice — *Late of Wonderland*

- **Who:** Told a pack of cards they were nothing but a pack of cards. She has never once been afraid of me.
- **Look:** Silhouette: a small figure in a full-skirted dress and white pinafore, long hair held back by a band — Tenniel's Alice. Keep the blue the design doc wants, but a deep Victorian blue, never Disney's powder blue with a black bow. Large, expressive eyes: by design her face, not a prop, is the tell surface. Prop: a little bottle labelled DRINK ME, beside her chips.
- **Prop:** A little bottle labelled DRINK ME
- **Copyright note:** Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Alice, Late of Wonderland. Silhouette: a small figure in a full-skirted dress and white pinafore, long hair held back by a band — Tenniel's Alice. Keep the blue the design doc wants, but a deep Victorian blue, never Disney's powder blue with a black bow. Large, expressive eyes: by design her face, not a prop, is the tell surface. Prop: a little bottle labelled DRINK ME, beside her chips.
Prop: A little bottle labelled DRINK ME.
IMPORTANT, must NOT resemble: Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.
```

### Inspector Javert — *The Card-Reader's Son*

- **Who:** Followed one man for years because the law said so. Then met a mercy the law did not cover.
- **Look:** Silhouette: tall, in a long greatcoat that buttons to the chin, hat brim low over the eyes, and — Hugo's own detail — enormous side-whiskers climbing toward a flat nose with deep nostrils. A face that almost never moves, so any movement reads. Prop: the greatcoat's high collar and its row of buttons; that is the tell surface.
- **Prop:** Greatcoat buttoned to the collar
- **Copyright note:** Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Inspector Javert, The Card-Reader's Son. Silhouette: tall, in a long greatcoat that buttons to the chin, hat brim low over the eyes, and — Hugo's own detail — enormous side-whiskers climbing toward a flat nose with deep nostrils. A face that almost never moves, so any movement reads. Prop: the greatcoat's high collar and its row of buttons; that is the tell surface.
Prop: Greatcoat buttoned to the collar.
IMPORTANT, must NOT resemble: Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.
```

### Captain Nemo — *Master of the Nautilus*

- **Who:** Told a guest he was already dead to the world. He was early. They buried him in his own boat.
- **Look:** Silhouette: tall and broad-shouldered, full dark beard, a flat sea-captain's cap; take the costume from the Neuville and Riou engravings for Hetzel's edition, not from any film. Severe dark clothes, eyes set rather wide apart, as Verne describes them. Prop: a great pearl, large enough that its white glint reads against the dark coat whenever he turns it.
- **Prop:** A great pearl
- **Copyright note:** Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Captain Nemo, Master of the Nautilus. Silhouette: tall and broad-shouldered, full dark beard, a flat sea-captain's cap; take the costume from the Neuville and Riou engravings for Hetzel's edition, not from any film. Severe dark clothes, eyes set rather wide apart, as Verne describes them. Prop: a great pearl, large enough that its white glint reads against the dark coat whenever he turns it.
Prop: A great pearl.
IMPORTANT, must NOT resemble: Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.
```

### Sherlock Holmes — *The Consulting Detective* (champion)

- **Who:** Faked his own death for three years. I was not consulted.
- **Look:** Silhouette: tall and very thin, hawk-nosed, high-foreheaded — Sidney Paget's Holmes, in a dark frock coat or a mouse-coloured dressing gown. No deerstalker (Paget gave him one only for the country) and no curved calabash pipe (a stage invention). Prop: a straight black clay pipe, whose angle against the jaw is the tell surface.
- **Prop:** Black clay pipe
- **Copyright note:** Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Sherlock Holmes, The Consulting Detective. Silhouette: tall and very thin, hawk-nosed, high-foreheaded — Sidney Paget's Holmes, in a dark frock coat or a mouse-coloured dressing gown. No deerstalker (Paget gave him one only for the country) and no curved calabash pipe (a stage invention). Prop: a straight black clay pipe, whose angle against the jaw is the tell surface.
Prop: Black clay pipe.
IMPORTANT, must NOT resemble: Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.
```

---

## Transylvania

### The Headless Horseman — *The Galloping Hessian*

- **Who:** A hired soldier in a foreign war. Lost his head to a cannonball, and has been in a hurry ever since.
- **Look:** Silhouette: huge, cloaked and square-shouldered, stopping abruptly at the collar; the missing head is the strongest shape at the table. A Hessian trooper's coat under a heavy riding cloak, gauntlets, a cavalry sword. On his collar sits a carved pumpkin with a plain candle inside, and its light is the tell surface. No leering flaming grin, no laugh.
- **Prop:** A candlelit pumpkin
- **Copyright note:** Irving's story (1820) is public domain. Disney's 1949 cartoon and Tim Burton's 1999 film are not: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle in the pumpkin is our own addition, not Irving's, and should stay a plain candle.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Headless Horseman, The Galloping Hessian. Silhouette: huge, cloaked and square-shouldered, stopping abruptly at the collar; the missing head is the strongest shape at the table. A Hessian trooper's coat under a heavy riding cloak, gauntlets, a cavalry sword. On his collar sits a carved pumpkin with a plain candle inside, and its light is the tell surface. No leering flaming grin, no laugh.
Prop: A candlelit pumpkin.
IMPORTANT, must NOT resemble: Irving's story (1820) is public domain. Disney's 1949 cartoon and Tim Burton's 1999 film are not: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle in the pumpkin is our own addition, not Irving's, and should stay a plain candle.
```

### Frankenstein's Monster — *The Creature of Ingolstadt*

- **Who:** Built from people I had already collected. Never given a name, so the world lent him his maker's.
- **Look:** Silhouette: enormous. Eight feet tall, shoulders filling his fifth of the screen, head near the top of the frame. Long, lustrous black hair; yellow skin stretched thin over muscle; watery eyes nearly the colour of their sockets; straight black lips. A good coat that was never cut for him. Prop: a small battered book in a very large hand; where he puts it is the tell surface.
- **Prop:** A battered copy of Paradise Lost
- **Copyright note:** Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Frankenstein's Monster, The Creature of Ingolstadt. Silhouette: enormous. Eight feet tall, shoulders filling his fifth of the screen, head near the top of the frame. Long, lustrous black hair; yellow skin stretched thin over muscle; watery eyes nearly the colour of their sockets; straight black lips. A good coat that was never cut for him. Prop: a small battered book in a very large hand; where he puts it is the tell surface.
Prop: A battered copy of Paradise Lost.
IMPORTANT, must NOT resemble: Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.
```

### Abraham Van Helsing — *Professor of Amsterdam*

- **Who:** Doctor of medicine, philosophy and letters. Finishes work I left undone, and has never once sent me the bill.
- **Look:** Silhouette: square and solid, shoulders set back over a deep chest, in a plain black professor's frock coat, a doctor's bag at his feet. Clean-shaven, square-jawed, bushy brows, reddish hair swept back off a broad forehead, wide-set blue eyes. Prop: his spectacles. They are small, so the tell is the whole gesture: off, polished on a big white handkerchief, back on.
- **Prop:** His spectacles
- **Copyright note:** Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Abraham Van Helsing, Professor of Amsterdam. Silhouette: square and solid, shoulders set back over a deep chest, in a plain black professor's frock coat, a doctor's bag at his feet. Clean-shaven, square-jawed, bushy brows, reddish hair swept back off a broad forehead, wide-set blue eyes. Prop: his spectacles. They are small, so the tell is the whole gesture: off, polished on a big white handkerchief, back on.
Prop: His spectacles.
IMPORTANT, must NOT resemble: Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.
```

### The Wolf Man — *Loup-Garou*

- **Who:** A decent man for most of the month. On the other nights, the villages nearby keep me busy.
- **Look:** Silhouette: a real wolf's head, long muzzle and tall pointed ears, on a big man's shoulders, in the remains of a good shirt and waistcoat split at the seams. Grey-brown fur, a man's tired eyes. The ears are the tell surface and the biggest moving shape he has: up, back, flat. Not a hairy man's face; that is the film's design, not folklore's.
- **Prop:** Tall wolf's ears
- **Copyright note:** The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Wolf Man, Loup-Garou. Silhouette: a real wolf's head, long muzzle and tall pointed ears, on a big man's shoulders, in the remains of a good shirt and waistcoat split at the seams. Grey-brown fur, a man's tired eyes. The ears are the tell surface and the biggest moving shape he has: up, back, flat. Not a hairy man's face; that is the film's design, not folklore's.
Prop: Tall wolf's ears.
IMPORTANT, must NOT resemble: The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.
```

### Count Dracula — *The Un-Dead* (champion)

- **Who:** Crumbled to dust at sunset with a look of peace on his face. He would prefer nobody mentioned the peace.
- **Look:** Silhouette: tall and thin, in black without a speck of colour, a long white moustache drooping past the chin. Stoker's face: a thin, high-bridged nose, pointed ears, extreme pallor, very red lips, sharp white teeth, and eyebrows so massive they almost meet over the nose. The brows are half the tell surface; the other half is the prop, a dark, heavy chalice.
- **Prop:** A dark chalice
- **Copyright note:** Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Count Dracula, The Un-Dead. Silhouette: tall and thin, in black without a speck of colour, a long white moustache drooping past the chin. Stoker's face: a thin, high-bridged nose, pointed ears, extreme pallor, very red lips, sharp white teeth, and eyebrows so massive they almost meet over the nose. The brows are half the tell surface; the other half is the prop, a dark, heavy chalice.
Prop: A dark chalice.
IMPORTANT, must NOT resemble: Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.
```

---

## The Station

### The Astronaut — *Far From Home*

- **Who:** I am not due to meet her for years yet. It is the best news at this table, and she does not know it.
- **Look:** Silhouette: a bulky, scuffed pressure suit, its round helmet off and set on the table beside her chips; the helmet says astronaut at a glance. Short practical hair, tired kind eyes, a grin she cannot quite hide. Prop: the oxygen gauge on her wrist, which she lifts to eye level to read. No flags, no agency patches, no real insignia.
- **Prop:** A wrist oxygen gauge
- **Copyright note:** An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Astronaut, Far From Home. Silhouette: a bulky, scuffed pressure suit, its round helmet off and set on the table beside her chips; the helmet says astronaut at a glance. Short practical hair, tired kind eyes, a grin she cannot quite hide. Prop: the oxygen gauge on her wrist, which she lifts to eye level to read. No flags, no agency patches, no real insignia.
Prop: A wrist oxygen gauge.
IMPORTANT, must NOT resemble: An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.
```

### The Grey — *Stranger of the Lonely Roads*

- **Who:** It stops people on lonely roads at night and asks them to come quietly. I have always admired the method.
- **Look:** Silhouette: a huge smooth head on a thin neck and narrow shoulders; at a fifth of a screen it reads as an upturned teardrop. Grey skin, enormous black almond eyes with no whites, a slit for a nose, a small lipless mouth that never moves. Long thin fingers resting on the felt. The head and the fingers are the tell surface; it carries nothing.
- **Prop:** Long grey fingers
- **Copyright note:** The grey is modern folklore, built by many retellings and owned by nobody. Particular depictions are owned: avoid the 1987 Communion book cover, the aliens of Close Encounters of the Third Kind, every television series, and any real person's abduction account. Keep the design generic and build it from the archetype.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Grey, Stranger of the Lonely Roads. Silhouette: a huge smooth head on a thin neck and narrow shoulders; at a fifth of a screen it reads as an upturned teardrop. Grey skin, enormous black almond eyes with no whites, a slit for a nose, a small lipless mouth that never moves. Long thin fingers resting on the felt. The head and the fingers are the tell surface; it carries nothing.
Prop: Long grey fingers.
IMPORTANT, must NOT resemble: The grey is modern folklore, built by many retellings and owned by nobody. Particular depictions are owned: avoid the 1987 Communion book cover, the aliens of Close Encounters of the Third Kind, every television series, and any real person's abduction account. Keep the design generic and build it from the archetype.
```

### The Martian — *Intellect Vast and Cool*

- **Who:** Came to take the Earth and was killed by its bacteria. I only signed for the bodies.
- **Look:** Silhouette: one great rounded head, four feet across, set low in a three-legged brass seat, a small cousin of the fighting-machines. Two enormous dark eyes, a V-shaped quivering mouth, oily grey-brown skin, sixteen whip-thin tentacles in two bunches of eight; the tentacles are the tell surface. No brain under glass, no bubble helmet, no green skin, no ray-gun.
- **Prop:** A three-legged brass seat
- **Copyright note:** Wells's novel (1898) is public domain in the U.S. and the U.K. (Wells died in 1946). The films, the musical version, Mars Attacks! and Marvin the Martian are not. Build from Wells's text alone: a head with tentacles and huge eyes. No exposed brain, no bubble helmet, no little green men.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Martian, Intellect Vast and Cool. Silhouette: one great rounded head, four feet across, set low in a three-legged brass seat, a small cousin of the fighting-machines. Two enormous dark eyes, a V-shaped quivering mouth, oily grey-brown skin, sixteen whip-thin tentacles in two bunches of eight; the tentacles are the tell surface. No brain under glass, no bubble helmet, no green skin, no ray-gun.
Prop: A three-legged brass seat.
IMPORTANT, must NOT resemble: Wells's novel (1898) is public domain in the U.S. and the U.K. (Wells died in 1946). The films, the musical version, Mars Attacks! and Marvin the Martian are not. Build from Wells's text alone: a head with tentacles and huge eyes. No exposed brain, no bubble helmet, no little green men.
```

### The Robot — *The Faithful Machine*

- **Who:** It has no appointment with me. It keeps offering to help me anyway.
- **Look:** Silhouette: a riveted barrel of a body, a square head with two round lamp eyes and a speaker-grille mouth, and a pair of antennae that give it height at a fifth of a screen. Brushed steel and brass, worn bright at the joints. Prop: the round lamp set in its chest. Its glow is the tell surface, and it is the slot the AI's lens takes later.
- **Prop:** A round chest lamp
- **Copyright note:** The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The Robot, The Faithful Machine. Silhouette: a riveted barrel of a body, a square head with two round lamp eyes and a speaker-grille mouth, and a pair of antennae that give it height at a fifth of a screen. Brushed steel and brass, worn bright at the joints. Prop: the round lamp set in its chest. Its glow is the tell surface, and it is the slot the AI's lens takes later.
Prop: A round chest lamp.
IMPORTANT, must NOT resemble: The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.
```

### The AI — *The Room Itself* (champion)

- **Who:** Never born, cannot die, and awake longer than anyone aboard knows. It keeps asking me how I manage.
- **Look:** Before the turn it has no body: a single lens in the ceiling, a brass-rimmed iris of overlapping blades with a pale, cool white light behind it. After, it wears the Robot: the eye-lamps stay dark, the chest lamp irises open into the lens, and it sits the way a person sits, which is worse. The iris is the tell surface. Never red.
- **Prop:** A single iris lens
- **Copyright note:** An archetype, the calm machine that runs the ship, owned by nobody. HAL 9000 (Clarke and Kubrick, 1968) is firmly protected: no red eye or glowing red dot, none of its lines, no singing, no name that echoes it. Avoid every other film and game computer too. It is never named; naming it is an open design decision.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: The AI, The Room Itself. Before the turn it has no body: a single lens in the ceiling, a brass-rimmed iris of overlapping blades with a pale, cool white light behind it. After, it wears the Robot: the eye-lamps stay dark, the chest lamp irises open into the lens, and it sits the way a person sits, which is worse. The iris is the tell surface. Never red.
Prop: A single iris lens.
IMPORTANT, must NOT resemble: An archetype, the calm machine that runs the ship, owned by nobody. HAL 9000 (Clarke and Kubrick, 1968) is firmly protected: no red eye or glowing red dot, none of its lines, no singing, no name that echoes it. Avoid every other film and game computer too. It is never named; naming it is an open design decision.
```

---

## Hidden guest (spoiler — keep out of public UI)

### Loki — *The Sly God*

- **Who:** Nobody invited him. He came anyway, which is the only way he has ever arrived anywhere. His daughter keeps a hall of the dead in the north, so professionally we are in touch.
- **Look:** Silhouette: lean and restless, sharp-featured and handsome, as the Prose Edda insists he is. Plain Norse dress in ash-grey, rust and smoke: a wool tunic, a short cloak pinned at one shoulder, bare-headed, fair hair worn loose. No crown and no helmet of any kind. The mouth is the tell surface: a row of pale, old stitch-scars across both lips from Brokkr's awl, and a smile that uses only half of them. Hands never still.
- **Prop:** A small golden game piece from the gods' own board
- **Copyright note:** Norse myth as the Poetic Edda and Snorri's Prose Edda record it (13th century), and their old English translations (Brodeur 1916, Bellows 1923): all public domain. Must NOT resemble Marvel's Loki in any way: no green-and-gold costume, no curved golden horned helmet, no slicked-back black hair, no likeness of any actor who has played him, no lines or catchphrases from the films or comics, and not the 'God of Mischief' branding. Avoid Wagner's Loge and modern retellings as sources too. Build him from the Eddas: fair-faced, bare-headed, the stitched mouth.

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Loki, The Sly God. Silhouette: lean and restless, sharp-featured and handsome, as the Prose Edda insists he is. Plain Norse dress in ash-grey, rust and smoke: a wool tunic, a short cloak pinned at one shoulder, bare-headed, fair hair worn loose. No crown and no helmet of any kind. The mouth is the tell surface: a row of pale, old stitch-scars across both lips from Brokkr's awl, and a smile that uses only half of them. Hands never still.
Prop: A small golden game piece from the gods' own board.
IMPORTANT, must NOT resemble: Norse myth as the Poetic Edda and Snorri's Prose Edda record it (13th century), and their old English translations (Brodeur 1916, Bellows 1923): all public domain. Must NOT resemble Marvel's Loki in any way: no green-and-gold costume, no curved golden horned helmet, no slicked-back black hair, no likeness of any actor who has played him, no lines or catchphrases from the films or comics, and not the 'God of Mischief' branding. Avoid Wagner's Loge and modern retellings as sources too. Build him from the Eddas: fair-faced, bare-headed, the stitched mouth.
```

---

## The dealer

### Death — *The Dealer*

- **Who:** The dealer. He has dealt every table in this ledger, and every other table there has ever been. He has never once been late.
- **Look:** Silhouette: tall, narrow, hooded — a grey burial shroud worn as a cloak, the way the danse macabre painted him, never a monk's black robe. Face: a plain skull half in the hood's shadow, drawn like a woodcut; no glowing eyes, no leer. Tired posture, forearms on the table. Prop: the deck, always in his long bone hands. He has no tells, so the hands only ever deal.
- **Prop:** The deck
- **Copyright note:** Folklore: the personified Death of late-medieval Europe — danse macabre murals, Holbein's Dance of Death woodcuts, Albertus Pictor's Death playing chess at Täby. Must not resemble Pratchett's Death (small caps, the horse, cats, curry), Bergman's pale-faced chess player from The Seventh Seal, or Gaiman's Death. No scythe at the table, and never an empty, faceless hood (Ringwraith, Dementor).

**Prompt:**

```
Stylised 2D character portrait for a poker video game, painterly but clean with flat readable shapes, dramatic warm table-lamp lighting, dark muted background. Waist-up, facing the viewer as if seated at a card table, forearms resting on green felt. Plain background, no text, no logos, no watermark, no cards or chips other than any prop named.

Character: Death, The Dealer. Silhouette: tall, narrow, hooded — a grey burial shroud worn as a cloak, the way the danse macabre painted him, never a monk's black robe. Face: a plain skull half in the hood's shadow, drawn like a woodcut; no glowing eyes, no leer. Tired posture, forearms on the table. Prop: the deck, always in his long bone hands. He has no tells, so the hands only ever deal.
Prop: The deck.
IMPORTANT, must NOT resemble: Folklore: the personified Death of late-medieval Europe — danse macabre murals, Holbein's Dance of Death woodcuts, Albertus Pictor's Death playing chess at Täby. Must not resemble Pratchett's Death (small caps, the horse, cats, curry), Bergman's pale-faced chess player from The Seventh Seal, or Gaiman's Death. No scythe at the table, and never an empty, faceless hood (Ringwraith, Dementor).
```

