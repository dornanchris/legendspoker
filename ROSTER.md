# ROSTER — the casting book

> Generated from `data/` by `npm run roster`. Do not edit by hand: edit the
> JSON and regenerate. The player-facing version of this is the in-game Ledger.

Dials are 0–1. **noise** is the noise-to-signal dial (legibility goes DOWN as
the tour goes on). A tell's reliability is how often it is honest; below 0.5
it mostly lies. Everything under "Look" and "Public domain" is for the art
pass and never appears in the game.

## 1. The White House

*Washington, D.C. · United States · Every administration at once*

**Hook.** You have been seated at a private game in the President's house, among men who have each run the country. They have agreed to deal you in, and to make sure you feel it.

**Room.** An oval drawing room upstairs, curtains drawn, a fire under a marble mantel with a clock on it. Portraits of all four players hang on the walls and watch their subjects play. Green felt, brass lamps, and cigar smoke gathering under a high white ceiling.

**Entrance.** Washington is seated at the head of the table from the first hand. He does not speak, and does not need to.

**Music.** Chamber strings and a parlour piano, stately and restrained, with a quiet march underneath at a walking tempo. **Ambience:** fire crackle, mantel clock ticking, rain on tall sash windows, footsteps in a far corridor.

**Earned names.** nobody → “tenderfoot” → *your name* → “Challenger”

Buy-in 2000, blinds up every 25 hands.

### Abraham Lincoln — *The Rail-Splitter*

History · 1809–1865 · 16th President of the United States

> Saw Lee surrender at Appomattox. Five days later he went to the theatre.

Abraham Lincoln (1809–1865) was born in a one-room Kentucky cabin and by his own account had less than a year of schooling in all. He taught himself law, served one term in Congress, and lost a Senate race to Stephen Douglas in 1858 after their famous debates. Two years later he beat Douglas for the presidency. He led the Union through the Civil War and was shot at Ford's Theatre in April 1865.

He was the tallest president, six foot four, and a teller of jokes and stories, some of them to his own cabinet at the worst moments of the war. He could also wait: he sat on the Emancipation Proclamation for two months until a battlefield victory could give it weight, and announced it five days after Antietam. He reads people the way he read law, slowly and all the way through.

**At the table.** Tight, and in no hurry about it. He folds most hands, and before the flop he gives up almost anything to a raise — until his stack runs short, when the patience ends. When he does play, he calls more than he raises, and he almost never tells a lie with his chips. A bad beat does not move him. He watches between hands and adjusts, slowly, to what he sees.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .30 | .75 | .08 | .05 | .45 | .80 | .10 |

- Quirk: `patient` (minEquity 0.58) — Folds to any raise before the flop without a premium hand, unless calling an all-in costs next to nothing.
- Tell (strong, 0.86): *strokes his beard, slowly*
- Tell (weak, 0.84): *leans back and folds his long hands*
- Tell (bluffing, 0.82): *allows himself a small smile*
- Idle noise: *crosses one long leg over the other*; *glances at the clock on the mantel*; *rubs his eyes*; *smooths the brim of the hat on his knee*

**Look.** Silhouette: the longest frame at the table, bare-headed, the stovepipe hat resting on his knee with its crown showing above the table edge. Face: hollow cheeks, deep-set tired eyes, the chin beard with no moustache. Tell surface: the beard and his long hands, the largest moving shapes in his fifth of the screen. **Prop:** Stovepipe hat, on his knee.

**Public domain.** Historical figure, died 1865; the Brady and Gardner photographs are public domain. Build from those. Avoid any modern screen likeness, including the 2012 Spielberg film, and anything from the vampire-hunter novel or film.

### Theodore Roosevelt — *The Rough Rider*

History · 1858–1919 · 26th President of the United States

> Shot in Milwaukee, and gave the speech anyway. When I came for him he was asleep. It seemed wiser.

Theodore Roosevelt (1858–1919) was a sickly, asthmatic New York child who built himself up by exercise and never stopped. After his mother and his wife died on the same day in 1884, he went west to ranch in the Dakota Badlands. In 1898 he resigned from the Navy Department to lead the Rough Riders in Cuba, and three years later, at forty-two, he became the youngest president in history.

In 1912, campaigning for a third party, he was shot in the chest in Milwaukee. The bullet was slowed by his folded speech and his spectacle case, and he spoke for well over an hour before he let anyone take him to hospital. He won the Nobel Peace Prize, and he still believed most problems gave way if you charged them. That is how he plays.

**At the table.** Loose and loud. He plays a great many hands and would rather raise than call — above all when someone else has bet first, which he takes as an invitation. He bluffs often enough that you cannot assume he has it, and he changes his approach for nobody. Beat him in a big pot and it stays with him for a while: the next few hands come faster and harder.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .78 | .45 | .28 | .30 | .10 | .40 | .10 |

- Quirk: `charge` (minEquity 0.55, chance 0.65) — Facing a bet with a decent hand, raises rather than calls.
- Tell (strong, 0.86): *grins, all teeth*
- Tell (bluffing, 0.84): *drums his fingers on the felt*
- Tell (tilted, 0.86): *polishes his spectacles, hard*
- Idle noise: *squares his shoulders*; *checks his pocket watch*; *leans forward on both elbows*; *tugs at his moustache*

**Look.** Silhouette: barrel chest, leaning forward on both elbows — the broadest shape at the table. Face: the heavy moustache and the enormous grin; the teeth must read at a fifth of a screen. Prop: round steel-rimmed spectacles. Taking them off to polish them is a big, readable gesture, and the grin does the rest. **Prop:** Round steel-rimmed spectacles.

**Public domain.** Historical figure, died 1919; period photographs are public domain. Build from photographs and the 1898 Rough Rider uniform. Avoid the Night at the Museum portrayal (horseback, waxwork) and any modern screen likeness. No teddy bears.

### Franklin D. Roosevelt — *The Four-Term President*

History · 1882–1945 · 32nd President of the United States

> Charming to everyone; candid with no one. He was sitting for a portrait when I arrived. It was never finished.

Franklin Delano Roosevelt (1882–1945) was Theodore's fifth cousin and married Theodore's niece Eleanor, who was given away by the President himself. At thirty-nine a paralytic illness, diagnosed as polio, left him unable to walk unaided. He was elected four times, the only president to serve more than two terms, and led the country through the Depression and most of the Second World War, talking to it over the radio in what the papers called fireside chats.

He spent his presidency making sure almost nobody photographed him in his wheelchair. He once told his Treasury Secretary that he was a juggler who never let his right hand know what his left hand did. When he kept the country guessing about a third term, Washington's press club built a great papier-mâché sphinx with his face and his cigarette holder. Nobody ever learned much by looking at him.

**At the table.** Middle of the road on paper, which is the trouble. He plays a reasonable number of hands, bets when he means it and sometimes when he doesn't, and his favourite moment to tell a story is the last card, once the hand has been checked to him. Losses slide off him. He is warm to everyone, all evening, and he has had long practice at letting people believe whatever they like.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .55 | .55 | .30 | .10 | .35 | .60 | .12 |

- Quirk: `river_bluff` (chance 0.35) — Checked to on the river with nothing, tells a story.
- Tell (strong, 0.8): *tilts his cigarette holder upward*
- Tell (bluffing, 0.78): *smiles broadly at the whole table*
- Tell (weak, 0.8): *taps the ash from his holder*
- Idle noise: *adjusts his pince-nez*; *laughs at something nobody said*; *settles his cape across his shoulders*; *nods to someone across the room*

**Look.** Silhouette: the naval cape across his shoulders and the long cigarette holder cocked upward from his teeth — a diagonal nobody else at the table has. Face: broad, chin lifted, pince-nez, a wide and ready smile. Prop: the cigarette holder; its angle is the tell surface and reads from across the room. **Prop:** Long cigarette holder.

**Public domain.** Historical figure, died 1945; US government photographs of him are public domain. Build from 1930s–40s press photographs. Avoid any modern screen or stage likeness, including the FDR of the musical Annie. Do not stage or joke about the wheelchair: he kept it out of frame all his life, and so do we.

### George Washington — *Father of His Country*

**Champion.** History · 1732–1799 · 1st President of the United States

> Gave back an army, then a country, and nobody made him do either. His last words were 'Tis well. I saw no reason to argue.

George Washington (1732–1799) was a Virginia surveyor and planter who commanded the Continental Army for the whole of the Revolutionary War. He lost more battles than he won and kept the army alive anyway; on Christmas night 1776 he took it across the icy Delaware to surprise the garrison at Trenton. He presided over the convention that wrote the Constitution and was elected president twice, both times unanimously by the electors.

In 1783 he resigned his commission to Congress when he could have kept it, and in 1796 he declined a third term. Jefferson wrote that his temper was naturally high but that reflection and resolution had mastered it. For years he kept careful accounts, down to his small winnings and losses at cards. He chose the site for this house and never lived in it.

**At the table.** Tight, and aggressive once he commits. He folds most hands without comment, and when he plays he bets rather than calls. He rarely bluffs, and nothing that happens at the table appears to reach him. Take the table down to the two of you and he changes: alone in a pot against one opponent he presses, hand after hand, and does not let up.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .68 | .80 | .12 | .02 | .30 | .80 | .10 |

- Quirk: `heads_up_pressure` (minEquity 0.45, chance 0.6) — Alone in a pot with one opponent, applies relentless pressure.
- Tell (strong, 0.85): *straightens his cuffs*
- Tell (weak, 0.83): *rests one hand flat on the table*
- Tell (bluffing, 0.8): *sits a fraction straighter*
- Idle noise: *smooths his waistcoat*; *glances toward the window*; *works his jaw, briefly*; *squares the edges of his chips*

**Look.** Silhouette: the straightest back at the table, high collar, his own hair powdered and tied at the nape — not a wig. Face: long, heavy-jawed, the mouth set firm. Prop: the buff-and-blue general's coat with gold epaulettes; its cuffs and shoulders are the tell surface, so any change in that upright line reads at once. **Prop:** Buff-and-blue general's coat.

**Public domain.** Historical figure, died 1799. Build from the Gilbert Stuart and Charles Willson Peale portraits, which are public domain. Avoid the look and staging of the musical Hamilton and any modern screen likeness. No wooden teeth: that is a myth.

## 2. Athens — The Symposium

*Athens · Greece · One long night, with myth and history on the same couches*

**Hook.** A symposium has argued all night over whether a mortal nobody can be worth anything, and it has run out of hypotheticals. You are the test case.

**Room.** The men's dining room of a rich Athenian house: painted plaster, oil lamps, couches drawn up around a card table. A great mixing bowl of wine and water stands in the middle of the floor, and nobody has fetched water in hours. One couch is empty, with a full cup set before it.

**Entrance.** Odysseus is not in the room when the game begins. About ten hands after the first guest leaves the table he comes in from the street, soaking wet and apologising; if the table is already cleared, he comes in anyway and finds it over.

**Before the arrival.** A cup has been poured for a guest who has not come.

**Music.** Double pipes and lyre over a slow hand drum, loose and a little wine-softened, at an unhurried walking pace; the pipes turn sly when the table starts to argue. **Ambience:** oil lamps guttering, wine ladled from the mixing bowl, crickets in the courtyard, pipes from a party down the street.

**Earned names.** nobody → “Nobody” → *your name* → “Hero”

Buy-in 2000, blinds up every 22 hands. Odysseus arrives after 1 elimination + 10 hands (missable), bringing the average stack.

### Socrates — *The Gadfly of Athens*

History · c. 470–399 BC · Athenian philosopher

> Drank the hemlock, walked about until his legs grew heavy, lay down, and remembered a debt. The calmest appointment I have kept.

Socrates (c. 470–399 BC) was the son of an Athenian midwife, and he wrote nothing; we know him through his pupils Plato and Xenophon, and through Aristophanes, who mocked him on stage. He fought as an infantryman at Potidaea, Delium and Amphipolis. When the oracle at Delphi said no one was wiser than he was, he spent years questioning everyone who claimed to know anything. In 399 BC Athens condemned him to drink hemlock.

Plato's Symposium puts him at exactly this kind of party. He arrived late, having stopped in a neighbour's porch to think; he out-talked the room; and at dawn, with the others asleep, he got up, washed, and spent the day as usual. Alcibiades swore nobody had ever seen him drunk. He was famously ugly and did not mind at all. He cannot resist a question, and tonight the question is you.

**At the table.** Moderate in everything except curiosity. He plays a middling number of hands, and when the table checks to him after the flop he often puts out a small bet, not so much to win as to see what you will do about it. He adjusts to what he learns. Losing does not trouble him in the least; no one has ever seen him rattled, and nobody here expects to be the first.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .45 | .50 | .20 | .00 | .50 | .60 | .15 |

- Quirk: `needle` (chance 0.35) — When checked to, makes small probing bets regardless of the hand.
- Tell (bluffing, 0.82): *scratches his snub nose*
- Tell (strong, 0.8): *smiles as if at a private joke*
- Tell (weak, 0.8): *frowns up at the ceiling, as if it had asked him something*
- Idle noise: *sips from his cup and seems no drunker*; *rubs his bare feet together*; *pulls his plain cloak tighter*; *scratches his beard thoughtfully*

**Look.** Silhouette: bald dome, big untidy beard, a short thick body in one plain, shabby cloak — the only unadorned figure at the table, which is exactly why he reads. Face: snub nose, wide bulging eyes, a satyr's face with a good-humoured mouth. Prop: a shallow wine cup, drained and refilled all night. Tells live on the big shapes of the face: nose, smile, the upward glance. **Prop:** Shallow wine cup.

**Public domain.** Historical figure, died 399 BC; Plato, Xenophon and Aristophanes are all public domain. Build from the Roman copies of Greek portrait busts. Avoid Bill & Ted's Excellent Adventure and any other modern screen likeness. He is barefoot, but that is below the table.

### Leonidas — *King of Sparta*

History · d. 480 BC · King of Sparta

> An oracle said Sparta would fall or a king would die. He chose, and kept the appointment.

Leonidas became one of Sparta's two kings around 490 BC, succeeding his half-brother Cleomenes and marrying Cleomenes' daughter Gorgo. In 480 BC he marched north with three hundred Spartans and several thousand other Greeks to hold the pass at Thermopylae against the army of Xerxes. They held it for three days, until a local man showed the Persians a mountain path around them. Leonidas sent most of the allies home, and stayed.

Herodotus says the oracle at Delphi had warned Sparta that either the city would be destroyed or one of its kings would die, and that Leonidas stayed to win the glory for Sparta. Spartans ate in common messes, drank in moderation, and had little patience for Athenian talk; Plutarch collected a whole book of them answering long speeches in a word or two. He will answer yours the same way.

**At the table.** Disciplined, and stubborn well past the point of sense. He picks his hands with care, plays them forward, and rarely bluffs. The trouble starts once a real share of his chips is in the middle: after that he will not fold to anything, whatever it costs him. He changes his approach for no one and is hard to rattle. Push him early, or not at all.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .72 | .68 | .10 | .10 | .15 | .50 | .15 |

- Quirk: `committed` (fraction 0.3) — Once a share of the stack is in the pot, will not fold a hand with a real chance.
- Tell (strong, 0.83): *plants both fists on the table*
- Tell (bluffing, 0.8): *lifts his chin*
- Tell (weak, 0.8): *exhales hard through his nose*
- Idle noise: *tugs his red cloak straight*; *glances across the table with open disdain*; *sets his crested helmet an inch to the left*; *cracks his knuckles*

**Look.** Silhouette: a red cloak over a bronze breastplate, long hair and full beard, fists on the felt. Face: level eyes, jaw set, a man already bored of the conversation. Prop: the bronze Corinthian helmet with its tall horsehair crest, set on the table at his elbow — the biggest shape at the table. Tells live on the fists and the lift of the chin. **Prop:** Crested bronze helmet, on the table.

**Public domain.** Historical figure, died 480 BC; Herodotus and Plutarch are public domain. Nothing from the film 300 or its graphic novel: no bare chest, no leather trunks, none of its lines or slogans. Avoid The 300 Spartans (1962) as well. Build from Greek vase painting and the marble warrior bust from Sparta known as 'Leonidas'.

### Medusa — *The Gorgon*

Myth · Greek myth · the mortal Gorgon

> The only one of three sisters who could die. Perseus managed it by looking the other way.

In Hesiod, Medusa is one of three Gorgon sisters, daughters of the old sea-powers Phorcys and Ceto, and the only one of the three who was mortal. Ovid tells the version most people know: she was a beautiful girl, famous above all for her hair, until Neptune violated her in Minerva's temple — and the goddess punished her, not him, by turning her hair to snakes. Whoever met her eyes turned to stone.

Perseus cut off her head while she slept, watching her only in the reflection of a polished bronze shield, and the winged horse Pegasus sprang from her neck. She was punished for what was done to her, then killed for what the punishment made her. She has had a long time to think about faces, and about what people believe they see in them.

**At the table.** Measured, with a patience that feels like waiting. She plays a middling range, likes to check to the table after the flop and answer a bet with a raise, and bluffs often enough to matter. Everyone watches her; the snakes give them plenty to watch. Those who study her face longest leave with the most confident conclusions. I have not often seen them leave with her chips.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .55 | .55 | .30 | .15 | .40 | .70 | .18 |

- Quirk: `check_raise` (minEquity 0.72, chance 0.6) — Checks strength on the flop and turn, then raises when bet into.
- Tell (strong, 0.3): *the snakes in her hair go still*
- Tell (weak, 0.3): *the snakes in her hair coil and hiss*
- Tell (bluffing, 0.3): *lowers her gaze to the table*
- Idle noise: *one snake tastes the air*; *two snakes knot themselves together*; *one snake nips another*; *she tucks a snake behind her ear*

**Look.** Silhouette: a head of living snakes, a moving crown nobody else at the table has, readable at any size. Face: a young woman's, pale and calm, heavy-lidded; the eyes are drawn as ordinary, which is the unsettling choice. Prop: the snakes themselves — their stillness, coiling and hissing are her whole tell surface. **Prop:** Her hair of snakes.

**Public domain.** Greek myth (Hesiod, Pindar, Ovid), all public domain; classical art such as the Rondanini Medusa is fair reference. Avoid Harryhausen's Medusa from Clash of the Titans (1981: serpent body, rattle tail, bow) and its 2010 remake, and the Percy Jackson Medusa (sunglasses, garden statues). She has legs and sits in a chair.

### Polyphemus the Cyclops — *Son of the Sea-God*

Myth · Homer's Odyssey · son of Poseidon

> Ate six of Odysseus's men, then took offence when their captain lied about his name. He has held the grudge ever since.

In Book Nine of Homer's Odyssey, Polyphemus is a one-eyed giant, a son of Poseidon, who keeps sheep and makes cheese in a cave on the island of the Cyclopes — a people who, Homer says, have no assemblies and no laws. Odysseus and twelve of his men walked into the cave uninvited and helped themselves. Polyphemus shut them in with a stone that twenty-two wagons could not have shifted, and ate them two at a time.

Odysseus got him drunk on unmixed wine, told him his name was Nobody, and blinded him with a stake of olive wood. When the other Cyclopes came running, Polyphemus bellowed that Nobody was hurting him, so they went home. In the morning he sat at the cave mouth, feeling the backs of his sheep, and spoke gently to his favourite ram. The man was clinging underneath.

**At the table.** Direct to a fault. He plays plenty of hands, and when he likes one he raises at once — every time, with no patience for slow play. He almost never bluffs; he does not see the point of saying something untrue. He does not adjust to anybody. And he has a temper: cost him a big pot and, for a while, he stops thinking and starts pushing everything in.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .70 | .50 | .05 | .45 | .05 | .35 | .12 |

- Quirk: `snap` (minEquity 0.66) — Never slow-plays: raises every strong hand at once.
- Quirk: `berserk` (tilt 0.3, minEquity 0.38) — Once rattled, stops thinking and moves in.
- Tell (strong, 0.85): *his eye narrows*
- Tell (weak, 0.82): *sniffs at the air*
- Tell (tilted, 0.85): *thumps the table*
- Idle noise: *counts his sheep on his fingers*; *blinks, very slowly*; *scratches his beard with a thumbnail the size of a spoon*; *the table groans as he shifts*

**Look.** Silhouette: enormous, head and shoulders above everyone, filling his fifth of the screen and some of his neighbours'. Face: one great eye in the middle of the brow with an old burn scar around it, a shaggy black beard, a sheepskin over the shoulders. Prop: his club of green olive wood, a fathom shorter than it used to be. Tells live on the eye and the fist. **Prop:** Olive-wood club, leaning on the table.

**Public domain.** Homer's Odyssey is public domain, as are Euripides' Cyclops and Theocritus. Avoid Harryhausen's cyclops from The 7th Voyage of Sinbad (1958): no horn, no goat legs. Nothing like the Marvel X-Men Cyclops either. Homer's giant is a shepherd with a beard, not a monster costume.

### Odysseus — *The Man of Many Turns*

**Champion.** **Arrives late.** Myth · Homer's Odyssey · King of Ithaca

> Ten years at war, ten more getting home. Arrived last, alone and in disguise, and still won. He is late here too.

Odysseus, king of the small rocky island of Ithaca, was the cleverest of the Greeks at Troy; the wooden horse was his idea. The war took ten years. Getting home took ten more: the Cyclops, the enchantress Circe, a visit to the land of the dead, the Sirens, Scylla and Charybdis, and seven years kept on the island of the nymph Calypso. He lost every ship and every man, and reached Ithaca alone.

In the Odyssey's first line Homer calls him polytropos, a man of many turns, and he earns it: he lies easily, well, and for pleasure, and he tells long, splendid stories about himself. He came home disguised as a beggar, and his old dog was the first to know him. He is the champion here because nobody at a Greek table lies better. He is late because he is always late.

**At the table.** The most adaptable player at the table, and the most comfortable lying. He raises a great many pots that nobody else has opened, and when the last card is checked to him he is very likely to tell a story with his chips, true or not. He learns the table quickly and changes to suit it. Bad luck does not bother him. He has had worse.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .66 | .64 | .28 | .05 | .60 | .80 | .15 |

- Quirk: `river_bluff` (chance 0.35) — Checked to on the river with nothing, tells a story.
- Quirk: `steal` (chance 0.4, minEquity 0.32) — Raises unopened pots before the flop with a wide range.
- Tell (bluffing, 0.8): *twists the ring on his finger*
- Tell (weak, 0.78): *looks toward the door as if it led home*
- Tell (strong, 0.8): *leans back, satisfied*
- Idle noise: *wrings sea water from the hem of his cloak*; *counts the exits*; *rubs an old scar on his thigh*; *smiles at no one in particular*

**Look.** Silhouette: a head shorter than the kings around him but broader in the chest and shoulders (Homer says so), a sea-stained cloak, and the conical felt sailor's cap he wears in Greek vase painting. Face: weathered, grizzled curly beard, amused eyes that are always doing sums. Prop: a heavy gold ring — make it big enough to catch the light, because his hands are the tell surface. **Prop:** Heavy gold ring.

**Public domain.** Homer is public domain. Build from Greek vase painting (the pilos cap, the Sirens vase in the British Museum). Avoid every screen Odysseus, including Kirk Douglas's Ulysses (1954) and Christopher Nolan's The Odyssey (2026), the Coen brothers' O Brother, Where Art Thou?, and EPIC: The Musical.

## 3. Pirate Cove

*A cove left off every chart · The Caribbean · The golden age of piracy, and a little either side*

**Hook.** You were taken off a prize ship and brought ashore in irons. The captains will let you play: win a share and sign on as crew, or win enough to buy your freedom.

**Room.** A tavern built into the rock of a hidden cove, half of it the stern of a wrecked ship, lanterns swinging from old rigging and the tide slapping at the pilings under the floorboards. The card table is a hatch-cover on two barrels, scarred by knife-points and pistol-butts. Through the open side wall, ships ride at anchor in the moonlight.

**Entrance.** Seated from hand one, in the only chair with its back to the rock wall, smoke curling from under his hat. He does not look up when you are brought in; he lets the room tell you who he is.

**Music.** A rowdy tavern band — fiddle, fife, hand-drum and stamping feet — lurching along at a drunken jig, dropping to a single low fiddle drone whenever the pot gets big. **Ambience:** surf in the cove, creaking timbers and rigging, rowdy laughter through the wall, a bottle rolling across floorboards, a ship's bell out on the water.

**Earned names.** nobody → “powder monkey” → *your name* → “Commodore”

Buy-in 2000, blinds up every 25 hands.

### Captain William Kidd — *Privateer, by His Own Account*

History · c. 1645–1701 · privateer, hanged for piracy

> Sailed with the King's commission to hunt pirates, and came home one. Hanged twice on the same day; the first rope broke.

William Kidd was a Scottish-born sea captain who settled in New York, married a wealthy widow, and lent his ship's tackle to help raise Trinity Church. In 1696 he sailed in the Adventure Galley under a royal commission to hunt pirates in the Indian Ocean, backed by the Earl of Bellomont and a group of powerful Whig lords. He found few pirates and a restless crew. In 1698 he took a rich Armenian-chartered merchantman, the Quedagh Merchant, and in London he was declared a pirate.

He buried part of his takings on Gardiners Island, off Long Island, and went to Boston trusting Bellomont to protect him; Bellomont arrested him. In 1701 he was tried in London for piracy and for killing his gunner, William Moore, with a bucket, and the French passes he said made his prize lawful were not produced. He was hanged at Wapping, and his body was left in an iron cage over the Thames. He is still sure he was owed his share.

**At the table.** Greedy, and not subtle about it. He plays a fair share of hands at a steady pace, and when he likes his cards he does not bet the pot — he bets a good deal more than the pot, as though the size of the claim settled who owns it. He pays little attention to how anyone else plays. A lost pot sours him for a while; he takes it as a legal wrong rather than a card game.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .60 | .50 | .22 | .30 | .20 | .55 | .20 |

- Quirk: `overbet` (minEquity 0.72, potFraction 1.6, chance 0.7) — With a strong hand, bets far more than the pot.
- Tell (strong, 0.8): *pats his coat where a map might be*
- Tell (bluffing, 0.76): *chews his lip*
- Tell (weak, 0.78): *glances over his shoulder*
- Idle noise: *rubs his neck*; *counts coins that aren't there*; *tips his hat to the room*; *squints at the lamp*

**Look.** Silhouette: a respectable merchant captain — full-bottomed wig under a plain three-cornered hat, a good broadcloth coat buttoned high, a cravat he keeps loosening at the throat. Face: heavy, anxious, forever checking behind him. Prop: the coat itself — the broad buttoned chest, where one hand keeps patting for something that may or may not be in the inside pocket. **Prop:** His buttoned coat and its inside pocket.

**Public domain.** Historical figure, hanged 1701. Build from the trial record and period portraits of New York merchant captains. Avoid Charles Laughton's Hollywood Kidd (1945 and 1952) and the cartoon buried-treasure buccaneer. He should look like what he always claimed to be: an honest captain with papers.

### Long John Silver — *The Sea-Cook*

Literature · Treasure Island (Stevenson, 1883) · ship's cook

> Changed sides on one island, then changed back, and came out ahead both times. Left with a bag of coin. I am still waiting.

Long John Silver is the ship's cook on the Hispaniola in Robert Louis Stevenson's Treasure Island (1883), signed on for a voyage to dig up Captain Flint's buried gold. He is tall, one-legged, quick on a crutch, and liked by everyone who meets him — until young Jim Hawkins, hiding in an apple barrel, hears him planning mutiny. Silver was Flint's quartermaster. He leads the rising, loses control of it, changes sides to save his neck, and at the end slips away with a bag of coin.

What makes him a person is the parrot. Captain Flint, named after the old buccaneer, shrieks 'Pieces of eight!' — and once, in the dark, gave Jim away by doing it. Silver says she may be two hundred years old. He is kind and ruthless in the same breath and means both. He sits at this table because there is a pot in the middle of it, and because a man who can change sides is never quite losing.

**At the table.** Friendly, talkative, and paying attention the whole time. He plays a middling number of hands and never seems to hurry; what he is really doing is watching who gives up. Once the table has been folding too easily, he starts betting whenever it is checked to him, whatever he holds. Losing does not seem to bother him at all — or he makes very sure it does not look that way.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .50 | .50 | .30 | .10 | .65 | .70 | .20 |

- Quirk: `punish_passivity` (foldRate 0.5, chance 0.6, potFraction 0.66) — Bets into a table that has been folding too often.
- Tell (strong, 0.76): *his parrot squawks 'Pieces of eight!'*
- Tell (bluffing, 0.75): *his parrot sidles along his shoulder*
- Tell (weak, 0.76): *strokes the parrot's head*
- Idle noise: *the parrot preens*; *grins at everyone at once*; *raps his crutch against the table leg*; *wipes his hands on his apron*

**Look.** Silhouette: very tall and broad, a big pale smiling face, a cook's apron over a sailor's coat, the top of a crutch under one arm — and the parrot on his shoulder, the brightest, busiest thing at the table. Everything else distinctive about him is below the table's edge. Prop: Captain Flint, the parrot — she preens, sidles and shrieks, and she is the part of him that moves. **Prop:** Captain Flint, his parrot.

**Public domain.** Stevenson's Treasure Island (1883) is public domain. Avoid Robert Newton's performance in Disney's 1950 film — his rolling West Country 'Arr!' now owns the pirate voice — and the Muppet, Treasure Planet and Black Sails Silvers. The book gives us enough: tall, pale, smiling, one leg, a crutch, and a parrot.

### Davy Jones — *The Fiend of the Deep*

Folklore · Sailors' folklore · the devil of the deep

> Sailors named him, feared him, and never agreed on his face. We are in related lines of work.

Davy Jones belongs to sailors' folklore rather than to any one book: the fiend of the deep, and 'Davy Jones's locker' is the bottom of the sea, where drowned men go. Nobody knows where the name came from. By 1751 it was familiar enough for Tobias Smollett, in Peregrine Pickle, to explain that in the mythology of sailors Davy Jones presides over all the evil spirits of the deep, and is seen in the rigging on the eve of hurricanes and shipwrecks.

What makes him a person is that he is never in a hurry. Every sailor at this table has spent a life on the water with him somewhere underneath, and every one of them knows it. He does not threaten anyone; he has never needed to. He sits among pirates because they are the men he knows best, and he plays the way the sea takes ships: quietly, and then all at once.

**At the table.** Patient and quiet. He plays fewer hands than the captains, seldom bluffs, and never shows a flicker when a pot goes against him. After the flop he checks a great deal, and not every check is what it looks like: bet into him and he will sometimes raise you, calmly, and wait. He does not chase anyone. He lets them come to him.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .50 | .72 | .18 | .05 | .35 | .70 | .22 |

- Quirk: `check_raise` (minEquity 0.72, chance 0.6) — Checks strength on the flop and turn, then raises when bet into.
- Tell (strong, 0.78): *sea water drips from his sleeve*
- Tell (weak, 0.76): *drums on the table like rain on a deck*
- Tell (bluffing, 0.75): *the lamp nearest him flickers*
- Idle noise: *a crab climbs out of his pocket*; *hums a shanty under his breath*; *wrings out his beard*; *the smell of low tide drifts across the table*

**Look.** Silhouette: tall and hunched in a long, waterlogged sea-coat and a broad hat whose brim sheds a thread of water, weed caught in the folds. Face: grey as a drowned man's, mostly in shadow, with a sodden grey beard — plainly hair — and two pale, round, unblinking eyes that catch the lamplight. Prop: the dripping sleeve, the one wet thing at a dry table. **Prop:** His dripping coat-sleeve.

**Public domain.** Sailors' folklore, in print by 1751 and owned by nobody. The famous screen version is Disney's (Pirates of the Caribbean, 2006–07) and is strictly off limits: no tentacle beard, no crab claw, no pipe organ, no heart in a chest, no sea-creature crew, no Flying Dutchman, no dice for souls. Ours has a human face and never raises his voice.

### Blackbeard — *Captain of the Queen Anne's Revenge*

**Champion.** History · d. 1718 · Edward Teach, pirate captain

> Put smoke in his hat so that ships would surrender without a fight. Most did. The last one did not.

Edward Teach — or Thatch; the spelling was never settled — sailed out of the Bahamas in the years around 1717. In November of that year he took a French slave ship, La Concorde, and made her his flagship, Queen Anne's Revenge. In May 1718 he blockaded Charleston, seizing ships and hostages, and ransomed them for a chest of medicine. He accepted the King's pardon that summer and did not keep to it for long. That November, a Royal Navy party under Lieutenant Robert Maynard killed him at Ocracoke Inlet.

He built the legend on purpose. The General History of the Pyrates, published in 1724 under the name Captain Charles Johnson, describes a black beard that covered most of his face, twisted into ribbon-tied tails, and lit slow-matches tucked under his hat, smoking on either side of it. The same book says he shot one of his own officers, Israel Hands, in the knee under the table, so the crew would not forget who he was. He sits at this table because he likes to be looked at.

**At the table.** The loudest player at the table, and the most aggressive. If nobody has opened a pot before the flop, he usually raises it; bet into him with anything he likes and he tends to raise you back rather than call. He is not reckless — he folds more often than his reputation would suggest — and losing does not unsettle him much. It makes him louder, which is not the same thing.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .78 | .60 | .24 | .15 | .35 | .50 | .20 |

- Quirk: `steal` (chance 0.4, minEquity 0.32) — Raises unopened pots before the flop with a wide range.
- Quirk: `charge` (minEquity 0.64, chance 0.35) — Facing a bet with a decent hand, raises rather than calls.
- Tell (strong, 0.78): *strokes his braided beard*
- Tell (bluffing, 0.76): *goes very still*
- Tell (tilted, 0.78): *the slow-matches under his hat smoulder brighter*
- Idle noise: *the fuses in his beard smoke*; *sets a pistol on the table, then picks it up again*; *laughs too loud*; *stares down the nearest man*

**Look.** Silhouette: a broad black hat with smoke curling from under the brim on both sides, over a huge black beard in ribbon-tied braids that covers most of his face. Heavy dark coat, a sling of pistols across the chest. Eyes that hold a stare. Prop: the braided beard — big, dark, dead centre in his fifth of the screen, and the shape his hand keeps going back to. **Prop:** His braided black beard.

**Public domain.** Historical figure, died 1718. Build from the 1724 General History and its early engravings of him with lit matches under his hat. Avoid Disney's Blackbeard in Pirates of the Caribbean: On Stranger Tides (2011) — no magic sword, no zombie crew — and the television versions in Black Sails and Our Flag Means Death.

## 4. Camelot

*Camelot, which Malory says is Winchester · Britain · The height of the Round Table, before the Grail quest and the war*

**Hook.** It is a feast day, and Arthur will not eat until he has seen a marvel. Tonight you are it: a stranger in the empty chair, playing to prove you belong at the Round Table.

**Room.** The great hall at Camelot, where the game is played around one curve of the Round Table and the rest of its circle runs off into the dark, past a hundred empty chairs, each with a knight's name in gold. Banners hang from the beams, rushes cover the floor, and the hearth could stable a horse. The one chair with no name on it is yours.

**Entrance.** Seated from hand one. Arthur rises to greet you when you are shown in — the only one who does — and does not sit again until you have.

**Music.** Harp and vielle over a low drone, stately and slow as a procession, with a single horn call when the stakes rise — warm and noble on top, faintly mournful underneath. **Ambience:** a great hearth fire, wind at a high window, a horse stamping in the yard, cups set down on oak, a far-off chapel bell.

**Earned names.** nobody → “Beaumains” → *your name* → “Knight”

Buy-in 2000, blinds up every 25 hands.

### Merlin — *The King's Prophet*

Legend · Arthurian legend · the king's enchanter

> Foresaw his own end and arrived for it on time. I appreciate punctuality.

Merlin enters written history with Geoffrey of Monmouth, around 1136: a boy with no mortal father who prophesies to the usurper Vortigern about two dragons fighting beneath his tower, and who later brings the Giants' Dance — Stonehenge — from Ireland to Salisbury Plain. It is Merlin's craft that gives Uther Pendragon the likeness of Gorlois at Tintagel, and so Arthur is conceived. Geoffrey also wrote a Life of Merlin, in which the prophet goes mad after a battle and lives wild in the forest.

In Malory's Le Morte d'Arthur (1485) he gives the infant Arthur to Sir Ector to raise, arranges the test of the sword in the stone, and warns the young king that Lancelot and the queen will love each other. He also foretells his own end — shut alive under a stone by Nimue, a pupil he taught too well — and goes to meet it regardless. He sits at this table knowing how the evening ends, and plays anyway.

**At the table.** Impossible to rattle and hard to read. He plays a careful number of hands, bluffs just often enough to keep everyone honest, and adjusts to how the table is playing once he has watched it a while. With his very best hands he goes quiet before the river — checking, calling, letting others do the betting. Losing a pot does not seem to reach him at all.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .45 | .66 | .25 | .02 | .70 | .85 | .25 |

- Quirk: `trap` (minEquity 0.8) — With a monster before the river, checks or flats instead of raising.
- Tell (strong, 0.72): *his staff hums, faintly*
- Tell (bluffing, 0.7): *gazes somewhere past the table, as if the hand were already over*
- Tell (weak, 0.72): *murmurs a word nobody catches*
- Idle noise: *the candle nearest him bends the wrong way*; *stares at something that has not happened yet*; *brushes ash from his sleeve*; *taps his staff twice*

**Look.** Silhouette: lean and tall in a hooded, undyed wool robe, hood usually up; a long, wild grey beard; a rough knotted staff taller than he is, planted upright beside his chair. Face: weathered, with deep-set eyes that never quite settle on the table. No pointed hat, no stars, no owl. Prop: the staff — a tall vertical line that can hum and glow faintly without being touched. **Prop:** A tall knotted staff.

**Public domain.** Geoffrey of Monmouth (c. 1136) and Malory (1485) are centuries out of copyright. T. H. White's Merlyn — living backwards, the owl Archimedes — is still in copyright and must not appear. Also avoid Disney's The Sword in the Stone (blue robe, starry pointed hat), the metal skullcap and chant from the film Excalibur (1981), and the BBC's Merlin.

### Sir Lancelot — *The Best Knight in the World*

Legend · Arthurian legend · first knight of the Round Table

> The best knight in the world, by general agreement, his own included. Died a hermit. It surprised everyone but me.

Lancelot is a French addition to the legend. He takes centre stage in Chrétien de Troyes's Knight of the Cart, around 1180, riding in a criminal's cart to rescue Queen Guinevere — and she is cold to him afterwards because he hesitated two steps before climbing in. Raised, in the prose romances, by the Lady of the Lake, he becomes the best knight in the world, and knows it.

In Malory he is Arthur's greatest knight and closest friend, and he loves the queen, and she him. Merlin foresaw it; Arthur, Malory says, had a suspicion and would not hear of it. When the love is finally exposed, the fellowship breaks, and the war that follows leaves the kingdom open to Mordred. Lancelot ends his days a hermit. At this table he is a man who has rarely lost a fight, and is still not sure how he lost everything else.

**At the table.** Aggressive and proud. He plays plenty of hands and hates merely to call: bet into him with anything respectable and he is likely to raise you back. He does not study his opponents — he assumes he is better than all of them — and a pot lost to someone he considers beneath him gets under his armour. For a while afterwards, he rides harder than he should.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .75 | .56 | .28 | .35 | .20 | .45 | .25 |

- Quirk: `charge` (minEquity 0.55, chance 0.7) — Facing a bet with a decent hand, raises rather than calls.
- Tell (strong, 0.75): *polishes his gauntlet*
- Tell (bluffing, 0.72): *tosses his hair*
- Tell (weak, 0.74): *glances toward the door*
- Idle noise: *admires his reflection in his breastplate*; *adjusts his sword belt*; *sighs, for no clear reason*; *looks toward an empty chair*

**Look.** Silhouette: the handsomest man at the table and dressed for it — polished plate at the shoulders, a bright surcoat, a fall of dark hair he keeps tossing back. Face: fine-boned, proud, faintly bored until someone challenges him. Prop: the right gauntlet, polished steel that catches the light, large enough at a fifth of the screen to be seen being buffed. **Prop:** A polished steel gauntlet.

**Public domain.** Chrétien (c. 1180) and Malory (1485) are public domain. Avoid T. H. White's ugly, self-loathing Lancelot, the musical Camelot (1960) and its film, the film First Knight (1995), and the BBC's Merlin. The love affair with Guinevere is canon: allude to it with care, and never play it for smut.

### The Green Knight — *Knight of the Green Chapel*

Legend · Sir Gawain and the Green Knight (14th c.)

> Rode into Camelot at New Year and offered anyone the first blow with his own axe. Someone took it. He took it well.

The Green Knight comes from Sir Gawain and the Green Knight, a Middle English poem of the late fourteenth century by an unknown author. At Arthur's New Year feast a giant of a man, green from his hair to his horse, rides into the hall with a holly branch in one hand and a huge axe in the other, and proposes a game: anyone may strike him one blow, if he may return it a year and a day later. Gawain takes the axe. The Knight is not inconvenienced.

A year on, Gawain keeps the bargain. On the way he is the guest of a lord who proposes another game — each evening they will exchange whatever they have won that day — and Gawain cheats once, keeping back a green girdle meant to save his life. At the Green Chapel the Knight feints twice and nicks him with the third blow, for the girdle. The host was the Green Knight all along. He loves a game with rules, and people who keep them.

**At the table.** He accepts challenges. Small bets he simply calls — he will not fold to one, whatever he holds — and he plays a good many hands to see what happens. He rarely leads the betting and almost never bluffs; he would rather take your blow and then give you his. A big enough bet can still move him, which he seems to think is fair. Losing a pot only amuses him.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .40 | .50 | .10 | .05 | .20 | .30 | .25 |

- Quirk: `calls_small` (maxBB 2) — Will not fold to a small bet (up to maxBB big blinds).
- Quirk: `committed` (fraction 0.3) — Once a share of the stack is in the pot, will not fold a hand with a real chance.
- Tell (strong, 0.74): *the holly branch at his side rustles*
- Tell (bluffing, 0.72): *laughs, and the rafters shake*
- Tell (weak, 0.74): *runs a thumb along the head of his axe*
- Idle noise: *moss creeps a little further along his sleeve*; *somewhere outside, his horse stamps*; *the chair creaks under his weight*; *he studies the table as if measuring it for a blow*

**Look.** Silhouette: enormous — a head taller than anyone seated, broad as a door, with a great bush of green beard and green hair to the shoulders. Green skin, green clothes worked with gold, and no armour: the poem says he came in peace. Face: green, grinning, bright-eyed. Prop: the holly branch at his side, a big dark spiky shape that rustles; the axe leans against the table. **Prop:** A holly branch.

**Public domain.** The poem (late 14th c.) is public domain, and so are old translations such as Jessie Weston's (1898); Tolkien's and Simon Armitage's are not, so quote neither. Avoid David Lowery's film The Green Knight (2021) and its bark-faced tree-man. Per the design doc, never show him holding his severed head: that image belongs to the Headless Horseman.

### King Arthur — *Lord of the Round Table*

**Champion.** Legend · Arthurian legend · King of the Britons

> Drew a sword from a stone because his foster-brother had left his own behind. Some say he is not dead. I have never commented.

Arthur grew out of scraps of early Welsh tradition into Geoffrey of Monmouth's great king of Britain (c. 1136): son of Uther Pendragon, victor over the Saxons, conqueror of much of Europe, betrayed at the last by Mordred. Wace, a generation later, gave him the Round Table, made so that no knight could claim a higher place than another. Malory's Le Morte d'Arthur (1485) gives the fullest telling: the sword in the stone, Excalibur from the Lady of the Lake, the fellowship, and its breaking.

In Malory he pulls the sword from the stone as a boy, fetching one for his foster-brother Kay, without knowing it is a test. As an old king he knows exactly what he is losing: when the fellowship breaks, he grieves more for his knights than for his queen, since queens might be found, but never such a fellowship again. Wounded in the last battle, he is carried away by barge, and men say he will come again. He hosts this table because a king should.

**At the table.** Disciplined and fair. He plays fewer hands than his knights, bluffs seldom, and with a strong hand he never pretends otherwise: he raises at once, every time, as though slow-playing were a kind of lying. He watches how the table is playing and adjusts, slowly. He loses with perfect grace, and it does not change his game in the least.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .60 | .82 | .16 | .05 | .45 | .80 | .25 |

- Quirk: `snap` (minEquity 0.75) — Never slow-plays: raises every strong hand at once.
- Tell (strong, 0.74): *rests his hand on Excalibur's hilt*
- Tell (weak, 0.72): *looks round the table at each of his knights*
- Tell (bluffing, 0.72): *his crown slips a fraction; he does not fix it*
- Idle noise: *raises his cup to the table*; *rubs the dent in his crown*; *listens to the wind at the window*; *nods to a servant who is not there*

**Look.** Silhouette: a plain gold crown with a visible dent, a red mantle over broad mailed shoulders, a greying beard kept short. Face: open, lined, kind, and tired around the eyes. Prop: Excalibur, sheathed and standing upright beside his chair with the hilt at his hand — a big cross-shape his hand can rest on, and leave. **Prop:** Excalibur, hilt to hand.

**Public domain.** Geoffrey, Wace, Chrétien and Malory are centuries out of copyright. Avoid Monty Python and the Holy Grail, the musical Camelot, Disney's The Sword in the Stone, Boorman's Excalibur (1981), T. H. White and the BBC's Merlin. No coconuts, and no 'once and future king': the Latin is Malory's, but the English phrase is White's title now.

## 5. Imperial Rome

*Castel Sant'Angelo, Rome · Italy · The Republic, the Renaissance and the underworld, all at once*

**Hook.** In Rome, every seat is inherited, bought or taken by force. You are about to find out which kind yours is.

**Room.** A high hall inside Castel Sant'Angelo: the emperor Hadrian's tomb, later walled into a papal fortress. Ancient brick below, Renaissance frescoes above, braziers for light. An iron chain runs from the wall to the dog's chair, and nobody is certain who holds the other end.

**Entrance.** Caesar arrives the moment the first chair empties. He walks in dictating to a secretary, takes his laurel wreath from its cushion by the door, puts it on and sits in the warm chair, as though a vacancy had been posted and he had applied.

**Before the arrival.** A laurel wreath waits on a cushion by the door. Its owner has been promised the next free chair.

**Music.** A slow processional for low brass and frame drum, with a Renaissance lute figure drifting in and out: martial and courtly by turns, never hurried. **Ambience:** brazier crackle, a heavy chain shifting on stone, distant bells over the city, a far-off arena crowd, rising and falling, a pen scratching on parchment.

**Earned names.** nobody → “tiro” → *your name* → “Imperator”

Buy-in 2000, blinds up every 25 hands. Julius Caesar arrives after 1 elimination, bringing the average stack.

### Spartacus — *Gladiator of Capua*

History · c. 111–71 BC · gladiator, leader of the slave revolt

> Broke out of a gladiator school with kitchen knives. Beat Rome's armies for two years. Nobody found his body. I did.

A Thracian who, according to Appian, had once served with the Romans before he was taken prisoner and sold as a gladiator. In 73 BC he broke out of a gladiator school at Capua with some seventy others, armed at first with cleavers and spits from a cook-shop. For two years his army of runaway slaves beat one Roman force after another, until Crassus destroyed it in 71 BC. His body was never found.

Plutarch calls him "more Hellenic than Thracian", cleverer and more cultivated than his fortunes. He wanted to lead his people north over the Alps and home; they preferred to stay and plunder Italy. Before his last battle he killed his own horse: if he won, he said, he would have plenty of Roman ones, and if he lost he would need none. He is the one person at this table whom Rome once owned.

**At the table.** He plays forward. He enters a fair share of pots, raises far more often than he calls, and takes little interest in what the rest of you are up to. Let his stack run short and he stops negotiating and moves all in. Beat him in a big pot and watch the next few hands closely: he stops thinking and starts charging. It worked on several Roman armies. Not on the last one.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .78 | .45 | .25 | .40 | .25 | .45 | .30 |

- Quirk: `short_shove` (maxBB 15, minEquity 0.38) — Short-stacked, moves all in with any reasonable hand.
- Quirk: `berserk` (tilt 0.3, minEquity 0.35) — Once rattled, stops thinking and moves in.
- Tell (strong, 0.72): *rolls his shoulders like a fighter before a bout*
- Tell (tilted, 0.7): *rubs the old shackle scar on his wrist*
- Tell (bluffing, 0.68): *stares hard across the table*
- Idle noise: *flexes his hands*; *tests the weight of the table as if it might be a weapon*; *glances at the doors*; *rolls his neck*

**Look.** Silhouette: broad bare shoulders under a rough Thracian cloak, cropped hair, a nose broken more than once. A fighter, not a showman, so no gladiator helmet. Heavy hands that never quite rest. Prop: the old shackle scar on his wrist, drawn as a pale band wide enough to read at a fifth of the screen. Wrist and shoulders carry his tells. **Prop:** The shackle scar on his wrist.

**Public domain.** Historical figure, died 71 BC. Write only from Plutarch (Life of Crassus) and Appian (Civil Wars). Nothing from Howard Fast's novel, the 1960 Kubrick film or the television series: never "I am Spartacus", no named wife (Plutarch's is an unnamed prophetess of his tribe), no screen-gladiator leather harness.

### Pope Alexander VI — *The Borgia Pope*

History · 1431–1503 · Rodrigo Borgia, Renaissance pope

> Said to have bought the votes that made him pope. Said to have been poisoned. I was there for one of those.

Rodrigo de Borja, from Xàtiva near Valencia, was made a cardinal young by his uncle, Pope Callixtus III, and served some thirty-five years as vice-chancellor of the Church before his election as Alexander VI in 1492 — an election contemporaries said he bought. He advanced his children openly: his son Cesare became a cardinal, then a duke with an army, and his daughter Lucrezia's three marriages were moves in Italian politics.

Contemporaries found him charming, eloquent and tireless. In 1493 he drew a line down the Atlantic and granted Spain the newly found lands beyond it. The word "nepotism" comes from the favours popes gave their nephews, and he had been one of those nephews. He sits at this table as he sat in Rome: smiling at everyone, counting everything, and quietly certain the arrangement will favour his family.

**At the table.** He plays a middling number of hands and bluffs more than anyone else at the table, most of all at the end of a hand, when a good story costs only one more bet. Fold to him often and he will notice, and start collecting. Nothing rattles him. He survived conclaves, French kings and his own children; a bad beat is merely weather.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .60 | .58 | .38 | .05 | .60 | .65 | .30 |

- Quirk: `river_bluff` (chance 0.4) — Checked to on the river with nothing, tells a story.
- Quirk: `punish_passivity` (foldRate 0.52, chance 0.5, potFraction 0.7) — Bets into a table that has been folding too often.
- Tell (bluffing, 0.68): *smooths his robes, unhurried*
- Tell (strong, 0.7): *turns the ring on his finger*
- Tell (weak, 0.68): *folds his hands in his lap*
- Idle noise: *murmurs something in Latin*; *adjusts his mitre*; *admires his own ring*; *smiles benevolently at the whole table*

**Look.** Silhouette: the tall mitre — nothing else at this table points straight up. A heavy, genial face with a strong nose, after Pinturicchio's fresco of him in the Borgia Apartments. Gold-embroidered vestments that swallow the chair. Prop: the papal ring, drawn oversized so that turning it throws a flash of gold the eye catches at a fifth of the screen. **Prop:** The papal ring.

**Public domain.** Historical figure, died 1503; Pinturicchio's portrait is public domain. Avoid the 2011 television series ("The Borgias", "Borgia") and any poison-ring cliché. The jokes stay on his politics and his family, never on the faith. The display name is still an open design question; "the Pope" may yet be renamed.

### Cerberus — *The Hound at the Gate*

Myth · Greek myth · hound of the underworld

> Lets everyone in. Lets nobody out. We have kept the same hours for a very long time.

In Hesiod's Theogony he is the child of Typhon and Echidna: a brazen-voiced hound with fifty heads, who fawns on the dead as they enter the underworld and devours anyone who tries to leave. Later writers settled on three heads, and Apollodorus adds a serpent's tail and snakes along his back. Heracles dragged him up into daylight as his last labour, bare-handed, and afterwards took him home again.

He is in Rome's own epic. In Virgil's Aeneid the Sibyl gets Aeneas past him by throwing him a honey cake laced with a sleeping drug, which he snaps up with all three mouths. That is his claim on this table — that, and being the one player here who cannot scheme, bluff or calculate. He reacts. Three heads, three opinions, one stack of chips.

**At the table.** He does not bluff. Nobody has explained it to him, and all three heads would object. He plays a middling number of hands, and when he likes what he holds he bets it hard, at once, every time; patience with a good hand is not in his nature. He learns nothing about you and never will. Beat him in a big pot and he sulks, for about as long as a dog does.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .65 | .60 | .02 | .30 | .00 | .45 | .30 |

- Quirk: `snap` (minEquity 0.66) — Never slow-plays: raises every strong hand at once.
- Tell (strong, 0.72): *all three heads snap to attention*
- Tell (weak, 0.7): *the left head yawns*
- Tell (tilted, 0.72): *the heads growl at each other*
- Idle noise: *the middle head scratches behind an ear*; *one head falls asleep*; *two heads watch you; one watches the pot*; *the right head sniffs at the nearest robe*

**Look.** Silhouette: three heads on one massive body — nothing else in the game looks like it. Black, short-coated, heavy in the jaw, with a low ridge of small snakes along the neck and spine after Apollodorus, kept subtle so it never clutters the read. The heads are the tell surface: each can watch, sleep, yawn or snarl on its own. **Prop:** Three iron collars on one chain.

**Public domain.** Greek myth, attested from Hesiod (c. 700 BC). Build from Greek vase painting and Apollodorus. Nothing resembling the giant three-headed dog of the Harry Potter books and films or the Disney Hercules design: no oversized friendly puppy, no cartoon styling, no names for the individual heads.

### Julius Caesar — *Dictator for Life*

**Champion.** **Arrives late.** History · 100–44 BC · dictator of Rome

> Twenty-three wounds. A physician said afterwards that only one of them was fatal. It only ever takes one.

Gaius Julius Caesar (100–44 BC) conquered Gaul, and in 49 BC led his army across the Rubicon into Italy — "the die is cast", Suetonius has him say — and won the civil war that followed. Early in 44 BC he was named dictator for life. A month or so later, on the Ides of March, he was stabbed to death at a meeting of the Senate. His name outlived the Republic: "Caesar" became the title of emperors.

As a young man he was captured by Cilician pirates, who asked twenty talents for his ransom. Plutarch says he laughed at them for not knowing whom they had caught and offered fifty instead. For thirty-eight days he joined their games, read them his speeches and cheerfully promised to crucify them. They thought he was joking. Once ransomed, he came back with ships and did it. He sits down at this table the same way: already counting.

**At the table.** He raises unopened pots as if the blinds were provinces nobody had thought to defend, and when he holds something strong he bets more than the pot is worth. Losing does not rattle him; he re-reads the ground and adjusts, and within an orbit or two he is playing you in particular. He is not there when the table opens. He arrives when a chair comes free.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .72 | .66 | .26 | .05 | .60 | .70 | .30 |

- Quirk: `steal` (chance 0.5, minEquity 0.32) — Raises unopened pots before the flop with a wide range.
- Quirk: `overbet` (minEquity 0.74, potFraction 1.4, chance 0.6) — With a strong hand, bets far more than the pot.
- Tell (bluffing, 0.7): *adjusts his laurel wreath*
- Tell (weak, 0.68): *drums his fingers on the table's edge*
- Tell (strong, 0.7): *smiles like a man counting votes*
- Idle noise: *dictates something to no one*; *rubs his temple*; *glances round the table with suspicion*; *straightens the purple border of his toga*

**Look.** Silhouette: the laurel wreath, worn low over a high forehead — Suetonius says no honour pleased him more than the right to wear it at all times, because it hid his thinning hair. Tall, fair-skinned, keen dark eyes; a toga with a broad purple border. Prop: the wreath itself. Its angle on his head is the tell surface. **Prop:** Laurel wreath.

**Public domain.** Historical figure, died 44 BC. Build from the coins of 44 BC, the first Roman coinage to carry a living man's portrait. Avoid every film and television likeness and the Asterix caricature. No "Et tu, Brute?" — that is Shakespeare's line, not the ancient sources'.

## 6. Baker Street

*221B Baker Street, London · England · The nineteenth century, as its novelists wrote it*

**Hook.** Holmes has asked three guests from other people's novels to an evening of cards. He has a file on each of them, and nothing at all on you.

**Room.** The first-floor sitting room at 221B, as Watson described it: the acid-stained chemistry table shoved against the wall, letters jack-knifed to the mantelpiece, V.R. picked out in bullet holes. Gaslight, a coal fire, fog pressing at the bow window, and a violin case nobody else may open.

**Entrance.** Holmes is seated from the first hand, in his own chair by the fire, as though the rest of you had called on him. Which you have.

**Music.** An unaccompanied violin, restless and searching, over a low cello and the tick of a mantel clock: Victorian chamber music played by someone thinking about something else. **Ambience:** coal settling in the grate, hansom cab wheels on wet cobbles, a clock ticking on the mantel, a single violin string, plucked, street cries muffled by fog.

**Earned names.** nobody → “Irregular” → *your name* → “Detective”

Buy-in 2000, blinds up every 25 hands.

### Captain Nemo — *Master of the Nautilus*

Literature · Twenty Thousand Leagues Under the Seas (Verne, 1870)

> Told a guest he was already dead to the world. He was early. They buried him in his own boat.

In Jules Verne's Twenty Thousand Leagues Under the Seas (1870), Professor Aronnax is taken aboard the Nautilus, an electric submarine commanded by a man who calls himself Nemo — Latin for "no one". He has renounced the land and all its nations, lives entirely on what the sea provides, and keeps a library of twelve thousand books and an organ he plays alone at night. His motto: Mobilis in mobili.

Verne kept his secret for a second novel. In The Mysterious Island he is revealed as Prince Dakkar, an Indian prince who fought the British in 1857, lost his wife and children, and went to sea to be free of every flag. He has come to London, of all places, to play cards. He is courteous to everyone and trusts no one who lives on land.

**At the table.** He plays few hands, and gives nothing away in the ones he does. Holding something very strong, he goes quiet — checks, calls, lets the table come to him — and saves the reckoning for later. He corrects to the room the way a navigator corrects a heading: patiently, a degree at a time. He is hard to rattle and impossible to hurry.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .50 | .70 | .20 | .15 | .55 | .75 | .35 |

- Quirk: `trap` (minEquity 0.8) — With a monster before the river, checks or flats instead of raising.
- Tell (strong, 0.66): *closes his eyes, as if listening to distant music*
- Tell (weak, 0.64): *lets his gaze drift to the window*
- Tell (bluffing, 0.64): *turns a pearl between his fingers*
- Idle noise: *consults a pocket chronometer*; *hums a fugue under his breath*; *sketches something in a notebook*; *taps the table as if sounding a hull*

**Look.** Silhouette: tall and broad-shouldered, full dark beard, a flat sea-captain's cap; take the costume from the Neuville and Riou engravings for Hetzel's edition, not from any film. Severe dark clothes, eyes set rather wide apart, as Verne describes them. Prop: a great pearl, large enough that its white glint reads against the dark coat whenever he turns it. **Prop:** A great pearl.

**Public domain.** Verne's novels (1870, 1875) and their Hetzel engravings are public domain. Avoid the 1954 Disney film entirely — no riveted, spined Nautilus, no uniformed Nemo — and the Nemo of Alan Moore's League of Extraordinary Gentlemen comics and their 2003 film.

### Inspector Javert — *The Card-Reader's Son*

Literature · Les Misérables (Hugo, 1862) · police inspector

> Followed one man for years because the law said so. Then met a mercy the law did not cover.

In Victor Hugo's Les Misérables (1862), Javert is a police inspector who was born in a prison, the son of a fortune-teller — Hugo's phrase is tireuse de cartes, a reader of cards — whose husband was in the galleys. Shut out of society from birth, he chose to stand with those who guard it rather than those who attack it, and serves the law with total devotion. For years he hunts the ex-convict Jean Valjean.

Hugo compares him to the dog that Asturian peasants say is born in every litter of wolves. He is as hard on himself as on anyone: when he believes he has wrongly denounced his mayor, he asks to be dismissed. When the convict he is chasing spares his life, he cannot fit mercy into the law, and Hugo titles that part of the book "Javert Derailed". At Baker Street he is the only guest present in an official capacity.

**At the table.** He plays very few hands and almost never bluffs; a lie is a lie, even in cards. He will not call a raise before the flop without a premium hand, whatever the price. But once a quarter of his stack is in the middle, he will not let the hand go for anything. He does not adjust to you. The law does not adjust. And a big loss stays with him.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .55 | .72 | .05 | .45 | .10 | .65 | .35 |

- Quirk: `committed` (fraction 0.25) — Once a share of the stack is in the pot, will not fold a hand with a real chance.
- Quirk: `patient` (minEquity 0.6) — Folds to any raise before the flop without a premium hand, unless calling an all-in costs next to nothing.
- Tell (strong, 0.68): *buttons his coat to the collar*
- Tell (weak, 0.66): *stares at you without blinking*
- Tell (tilted, 0.7): *his hand shakes, very slightly*
- Idle noise: *straightens his stock*; *consults a small black notebook*; *glances at the door like a man expecting an escape*; *taps his cane on the floor once*

**Look.** Silhouette: tall, in a long greatcoat that buttons to the chin, hat brim low over the eyes, and — Hugo's own detail — enormous side-whiskers climbing toward a flat nose with deep nostrils. A face that almost never moves, so any movement reads. Prop: the greatcoat's high collar and its row of buttons; that is the tell surface. **Prop:** Greatcoat buttoned to the collar.

**Public domain.** Hugo's novel (1862) and its nineteenth-century illustrations are public domain. Nothing from the stage musical or its films: no lyrics, no "Stars", no prisoner-number chant, no costume from any production. Hugo's text only.

### Alice — *Late of Wonderland*

Literature · Alice's Adventures in Wonderland (Carroll, 1865)

> Told a pack of cards they were nothing but a pack of cards. She has never once been afraid of me.

Lewis Carroll's Alice falls down a rabbit-hole in Alice's Adventures in Wonderland (1865) and climbs through a mirror in Through the Looking-Glass (1871). She grows and shrinks, argues with a caterpillar, sits through a mad tea-party, and ends up a witness at the trial of the Knave of Hearts, where she tells the whole court — a pack of playing cards — that they are nothing but a pack of cards.

What makes her a person is that nothing in Wonderland frightens her for long. She argues with duchesses, queens and caterpillars as equals, and corrects them when they are wrong, which is often. Tenniel drew her for both books. She is at Baker Street because curiosity would get her anywhere — and because, at a table of practised faces, hers is the one that shows exactly what she thinks.

**At the table.** She plays a great many hands, because she wants to see what happens, and she seldom folds to a small bet for the same reason. Every so often she does something nobody can account for — a call, a raise, a check — just to find out. She almost never bluffs; she cannot see the point of pretending. She does not adjust to anyone. Why would she?

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .40 | .38 | .05 | .20 | .10 | .30 | .10 |

- Quirk: `whim` (chance 0.08) — Now and then does something unaccountable, just to see.
- Quirk: `calls_small` (maxBB 3, chance 0.6) — Will not fold to a small bet (up to maxBB big blinds).
- Tell (strong, 0.9): *her eyes go very wide*
- Tell (weak, 0.9): *frowns at her cards as if they had said something rude*
- Tell (bluffing, 0.88): *bites her lip*
- Idle noise: *smooths her pinafore*; *counts the pips on a card*; *tries to see what the dealer is holding*; *swings her feet under the chair*

**Look.** Silhouette: a small figure in a full-skirted dress and white pinafore, long hair held back by a band — Tenniel's Alice. Keep the blue the design doc wants, but a deep Victorian blue, never Disney's powder blue with a black bow. Large, expressive eyes: by design her face, not a prop, is the tell surface. Prop: a little bottle labelled DRINK ME, beside her chips. **Prop:** A little bottle labelled DRINK ME.

**Public domain.** Carroll's books and Tenniel's illustrations are public domain. Avoid the 1951 Disney film entirely — its dress, bow, character designs and songs — and the 2010 Burton film. Keep the Cheshire Cat out of this table; he is saved for later.

### Sherlock Holmes — *The Consulting Detective*

**Champion.** Literature · The Holmes stories (Conan Doyle, 1887–1927)

> Faked his own death for three years. I was not consulted.

Arthur Conan Doyle's consulting detective first appeared in A Study in Scarlet (1887), lodging at 221B Baker Street with Dr Watson, who tells nearly all of his stories. The police bring him the cases they cannot solve, and he solves them by observing what everyone else has merely seen. In 1893 Doyle killed him off at a Swiss waterfall. Ten years later, he brought him back.

He never guesses — "a shocking habit," he says, "destructive to the logical faculty." He plays the violin, keeps an enormous index of people and crimes, and grows unbearable when bored. He once told Watson he had been beaten only four times in his life. At a card table he does what he does everywhere: reads everyone in the room, and says so.

**At the table.** He plays fairly few hands, and plays them well. With something strong on the flop he likes to check, let you bet into him, and then raise. Alone in a pot with you, he leans on you relentlessly. He adapts faster than anyone at the table; within the hour he is playing against you in particular. Nothing tilts him. He finds losing interesting.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .60 | .70 | .18 | .02 | .80 | .90 | .35 |

- Quirk: `check_raise` (minEquity 0.7, chance 0.55) — Checks strength on the flop and turn, then raises when bet into.
- Quirk: `heads_up_pressure` (minEquity 0.5, chance 0.5) — Alone in a pot with one opponent, applies relentless pressure.
- Tell (strong, 0.66): *puts his fingertips together*
- Tell (bluffing, 0.64): *draws on his pipe*
- Tell (weak, 0.64): *taps his pipe stem against his teeth*
- Idle noise: *examines a speck on the tablecloth*; *glances at your hands*; *turns his lens over in his fingers*; *looks at the mantel as if it had lied to him*

**Look.** Silhouette: tall and very thin, hawk-nosed, high-foreheaded — Sidney Paget's Holmes, in a dark frock coat or a mouse-coloured dressing gown. No deerstalker (Paget gave him one only for the country) and no curved calabash pipe (a stage invention). Prop: a straight black clay pipe, whose angle against the jaw is the tell surface. **Prop:** Black clay pipe.

**Public domain.** Every Holmes story is now public domain in the US. Work from Doyle's text and Paget's Strand illustrations only. Nothing from any modern screen version, no "Elementary, my dear Watson" (Doyle never wrote it), and no Moriarty — he is not in this game.

## 7. Transylvania

*Castle Dracula, past the Borgo Pass · Romania · The nineteenth century, after sundown*

**Hook.** The Count keeps a table for the century's monsters and the one man who hunts them, and he watches it from beside the fire. Empty two of its chairs and he will sit down across from you.

**Room.** The great hall of Castle Dracula: bare stone, black oak, and a hearth big enough to stand in, with one high-backed chair beside it that nobody else uses. Tall windows look out on the Carpathians and far too much moon. There is not a mirror in the building; the Count threw the last one out of a window.

**Entrance.** The Count watches from a high-backed chair beside the fire. When the second guest leaves, the fire sinks to embers, his chair is suddenly empty, and he is sitting at the table as if he always had been.

**Before the arrival.** The chair by the fire is not empty.

**Music.** Slow strings in a courtly three-time over a low drone, with a cimbalom that enters only when the Count sits down, and distant wolves where the percussion would be. **Ambience:** a great hearth crackling, wolves, far off in the pass, wind worrying the shutters, water dripping somewhere in the stone, hooves pacing in the courtyard.

**Earned names.** nobody → “lamb” → *your name* → “Hunter”

Buy-in 2000, blinds up every 22 hands. Count Dracula arrives after 2 eliminations, bringing the average stack.

### Abraham Van Helsing — *Professor of Amsterdam*

Literature · Dracula (Stoker, 1897) · professor of Amsterdam

> Doctor of medicine, philosophy and letters. Finishes work I left undone, and has never once sent me the bill.

Abraham Van Helsing is the Dutch professor of Bram Stoker's Dracula (1897): physician, philosopher and man of letters, of Amsterdam, who signs himself M.D., D.Ph., D.Lit., etc., etc. His old pupil John Seward summons him to London to examine Lucy Westenra, who is losing blood and cannot say how. He transfuses her four times, fills her room with garlic flowers, and alone among them suspects the cause. Then he leads the hunt for the Count.

Seward describes him as a man with a temper of the ice-brook and the kindliest and truest heart that beats, and Stoker lets him be odd: his English is entirely his own, and after Lucy's funeral he laughs until he weeps and calls it King Laugh. He sits at this table because he knows exactly who owns the chair by the fire, and he would rather face it than wonder where it has gone.

**At the table.** He folds to raises before the flop until he holds something worth the trouble, and he is not embarrassed by how often that is. When he does have it, he bets more than the pot, all at once and past the point of argument, like a man who does not want a second meeting. He watches the table and adjusts. He seldom bluffs. Bad beats barely touch him; he has buried patients.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .55 | .58 | .20 | .10 | .60 | .75 | .42 |

- Quirk: `patient` (minEquity 0.58) — Folds to any raise before the flop without a premium hand, unless calling an all-in costs next to nothing.
- Quirk: `overbet` (minEquity 0.8, potFraction 1.3, chance 0.6) — With a strong hand, bets far more than the pot.
- Tell (strong, 0.64): *takes off his spectacles and cleans them*
- Tell (weak, 0.62): *touches the crucifix at his collar*
- Tell (bluffing, 0.62): *mutters something in Dutch*
- Idle noise: *checks a pocket that smells of garlic*; *sniffs the air, frowning*; *glances at the fireplace*; *writes a line in a leather diary*

**Look.** Silhouette: square and solid, shoulders set back over a deep chest, in a plain black professor's frock coat, a doctor's bag at his feet. Clean-shaven, square-jawed, bushy brows, reddish hair swept back off a broad forehead, wide-set blue eyes. Prop: his spectacles. They are small, so the tell is the whole gesture: off, polished on a big white handkerchief, back on. **Prop:** His spectacles.

**Public domain.** Stoker's Dracula (1897) is public domain. Build him from the novel: clean-shaven, reddish hair, bushy brows, a professor's black coat. Nothing from the 2004 Van Helsing film: no broad-brimmed hat, long leather coat, crossbow or gadgets, and no likeness of any actor who has played him. His Dutch English is used lightly, never as a comic accent.

### Frankenstein's Monster — *The Creature of Ingolstadt*

Literature · Frankenstein (Shelley, 1818)

> Built from people I had already collected. Never given a name, so the world lent him his maker's.

The creature of Mary Shelley's Frankenstein; or, The Modern Prometheus (1818), built by the student Victor Frankenstein at Ingolstadt from materials gathered in charnel houses and the dissecting room. He is eight feet tall, with yellow skin, lustrous black hair and watery eyes. He wakes on a dreary November night to see his maker run from the room, and teaches himself to speak and read by watching a family through a chink in a cottage wall.

In a leather portmanteau he finds Paradise Lost, a volume of Plutarch's Lives and The Sorrows of Werter, and reads them as true histories. He asks for kindness, then for a companion, and is refused both; his revenge is terrible, and his grief at the end is worse. He is at this table because he was invited, which has not happened to him often. He is resigned to being called Frankenstein.

**At the table.** Courteous, careful, and nearly impossible to bet out of a small pot: he will not be turned away for the price of two blinds. He almost never bluffs. He takes his losses quietly, one after another, until the day he does not, and then he stops thinking and pushes everything in. He is slow to anger and very hard to bring back from it.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .40 | .55 | .10 | .55 | .40 | .40 | .40 |

- Quirk: `committed` (fraction 0.3) — Once a share of the stack is in the pot, will not fold a hand with a real chance.
- Quirk: `check_raise` (minEquity 0.78, chance 0.5) — Checks strength on the flop and turn, then raises when bet into.
- Tell (strong, 0.64): *sets his book face-down on the table*
- Tell (weak, 0.62): *turns a page he is not reading*
- Tell (tilted, 0.66): *the table creaks under his grip*
- Idle noise: *reads a line of Milton, lips moving*; *flinches from the firelight*; *stares at his own hands*; *straightens a coat that was never made for him*

**Look.** Silhouette: enormous. Eight feet tall, shoulders filling his fifth of the screen, head near the top of the frame. Long, lustrous black hair; yellow skin stretched thin over muscle; watery eyes nearly the colour of their sockets; straight black lips. A good coat that was never cut for him. Prop: a small battered book in a very large hand; where he puts it is the tell surface. **Prop:** A battered copy of Paradise Lost.

**Public domain.** Shelley's novel (1818) is public domain. Universal's 1931 makeup is not, and is still protected as a design: no neck bolts, no flat-topped head, no green skin, no stitches or forehead scar, no grunting or stiff-armed walk. Shelley's creature is articulate and well read, yellow-skinned with flowing black hair.

### The Wolf Man — *Loup-Garou*

Folklore · European werewolf folklore

> A decent man for most of the month. On the other nights, the villages nearby keep me busy.

Europe told werewolf stories for as long as it had wolves; the Old English word means simply man-wolf. In Petronius a Roman soldier strips off his clothes among the tombstones and runs off as a wolf. In Marie de France's twelfth-century Bisclavret, a Breton lord turns wolf three days a week and needs his clothes to turn back. Gervase of Tilbury, in the early 1200s, wrote that in England men were often seen to change into wolves with the moon.

In the oldest stories he is seldom a villain by choice: he is cursed, or born to it, or a man who took his clothes off at the wrong moment. Gerald of Wales tells of an Irish wolf that spoke to a priest and begged him to bring the last sacrament to its dying mate. That is the werewolf at this table: polite, ashamed of himself, and hungry. He came for the company and is trying not to think about the menu.

**At the table.** He plays too many hands and pushes most of them. Put a small bet in front of him on the flop or the turn and he will follow it the way a nose follows a scent. He does not adjust; he has instincts instead, and they are the same every night. Beat him in a big pot and the man goes out of him, and what is left moves all in.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .72 | .48 | .15 | .50 | .20 | .40 | .45 |

- Quirk: `berserk` (tilt 0.22, minEquity 0.38) — Once rattled, stops thinking and moves in.
- Quirk: `chaser` (maxPotFraction 0.35, minEquity 0.25) — Calls cheap bets on the flop and turn to see another card.
- Tell (strong, 0.62): *sniffs at the pot*
- Tell (weak, 0.6): *his ears flatten*
- Tell (tilted, 0.64): *his claws scrape the felt*
- Idle noise: *glances at the window and the moon*; *growls at a draught*; *scratches behind one ear*; *sheds on the tablecloth*

**Look.** Silhouette: a real wolf's head, long muzzle and tall pointed ears, on a big man's shoulders, in the remains of a good shirt and waistcoat split at the seams. Grey-brown fur, a man's tired eyes. The ears are the tell surface and the biggest moving shape he has: up, back, flat. Not a hairy man's face; that is the film's design, not folklore's. **Prop:** Tall wolf's ears.

**Public domain.** The werewolf is European folklore, told from Petronius onward, and belongs to nobody. Universal owns its Wolf Man films and their lore: no Larry Talbot, no silver-headed cane, no pentagram, no fortune-teller's verse, and no hairy-faced human makeup. Build him from folklore, as a wolf's head on a man's frame.

### The Headless Horseman — *The Galloping Hessian*

Literature · The Legend of Sleepy Hollow (Irving, 1820)

> A hired soldier in a foreign war. Lost his head to a cannonball, and has been in a hurry ever since.

The Headless Horseman haunts Washington Irving's The Legend of Sleepy Hollow (1820), set in a drowsy Dutch valley near Tarry Town on the Hudson. The country folk say he is the ghost of a Hessian trooper, one of the German soldiers hired by the British, whose head was carried away by a cannonball in some nameless battle of the Revolutionary War. He rides out nightly in search of it, hurrying to be back in the churchyard before daybreak.

He is Irving's great joke, and he never gets the punchline. When he chases the schoolmaster Ichabod Crane to the church bridge and hurls his head, all that is found next morning is a hat and a shattered pumpkin, and Irving hints that the rider was a local rival called Brom Bones. The Horseman has never commented. He has no mouth. He sits at this table because nobody here will ask whether he is real.

**At the table.** Always in a hurry: he raises unopened pots before the flop just to have done with them. He does not tilt; there is nothing left to lose his head over. His best work is at the end of the chase. Checked to on the river he will often charge, and what he hurls at you then is sometimes a head and sometimes, as the schoolmaster found, a pumpkin.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .60 | .55 | .30 | .10 | .45 | .55 | .45 |

- Quirk: `river_bluff` (chance 0.35) — Checked to on the river with nothing, tells a story.
- Quirk: `steal` (chance 0.4, minEquity 0.32) — Raises unopened pots before the flop with a wide range.
- Tell (strong, 0.6): *the candle in his pumpkin burns brighter*
- Tell (bluffing, 0.58): *the flame in his pumpkin gutters*
- Tell (weak, 0.6): *drums a gauntlet on the table*
- Idle noise: *settles the pumpkin on his collar*; *his sword rattles in its scabbard*; *turns his whole body to look at you*; *a smell of cold leaves drifts from him*

**Look.** Silhouette: huge, cloaked and square-shouldered, stopping abruptly at the collar; the missing head is the strongest shape at the table. A Hessian trooper's coat under a heavy riding cloak, gauntlets, a cavalry sword. On his collar sits a carved pumpkin with a plain candle inside, and its light is the tell surface. No leering flaming grin, no laugh. **Prop:** A candlelit pumpkin.

**Public domain.** Irving's story (1820) is public domain. Disney's 1949 cartoon and Tim Burton's 1999 film are not: no flaming jack-o'-lantern with a leering grin, no cackle, no filed teeth, no actor's head, no tree of the dead. The candle in the pumpkin is our own addition, not Irving's, and should stay a plain candle.

### Count Dracula — *The Un-Dead*

**Champion.** **Arrives late.** Literature · Dracula (Stoker, 1897) · the Count

> Crumbled to dust at sunset with a look of peace on his face. He would prefer nobody mentioned the peace.

Count Dracula is the Transylvanian nobleman of Bram Stoker's Dracula (1897), a novel told entirely in letters, diaries and newspaper cuttings. He lives in a crumbling castle past the Borgo Pass, keeps no servants, casts no reflection, and crawls head-first down the castle wall like a lizard. He buys a house in England, ships fifty boxes of his native earth there and sails with them, and is hunted home again by a Dutch professor and a handful of friends.

Stoker's Count is not a caped seducer. He is an old man dressed in black, with a long white moustache and eyebrows that almost meet, who grows younger as he feeds, keeps his guest company at supper without eating, and studies English law, English idiom and English railway timetables so that in London nobody will take him for a stranger. He sits down late at this table because it is his house, and the host eats last.

**At the table.** The tightest player at the table and the least hurried. He plays very few hands and says little about them. He would rather call three times than raise once, and he is at his most comfortable when you are the one doing the betting. He almost never bluffs, and he does not tilt. He watches who has been folding, the way a good host notices who drinks too much.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .35 | .78 | .12 | .05 | .55 | .80 | .42 |

- Quirk: `trap` (minEquity 0.82) — With a monster before the river, checks or flats instead of raising.
- Tell (strong, 0.62): *raises one eyebrow*
- Tell (bluffing, 0.6): *sips from his chalice*
- Tell (weak, 0.6): *steeples his fingers*
- Idle noise: *sips from his chalice*; *runs a fingernail along the table*; *smiles without showing his teeth*; *watches the pulse in someone's throat*

**Look.** Silhouette: tall and thin, in black without a speck of colour, a long white moustache drooping past the chin. Stoker's face: a thin, high-bridged nose, pointed ears, extreme pallor, very red lips, sharp white teeth, and eyebrows so massive they almost meet over the nose. The brows are half the tell surface; the other half is the prop, a dark, heavy chalice. **Prop:** A dark chalice.

**Public domain.** Stoker's novel (1897) is public domain. Bela Lugosi's likeness and Universal's 1931 design are not, nor are the later screen Draculas: no slicked hair and widow's peak, no high-collared opera cape, no medallion, no evening dress, no film lines. Nosferatu's bald Orlok is out too. Build him from Stoker: old, white-moustached, heavy-browed, all in black.

## 8. The Station

*A station above the Earth · Earth orbit · Not yet*

**Hook.** Everyone aboard ended up here by accident: drifting, lost, or passing through. You are the newest arrival, and the station would very much like to know what you are for.

**Room.** A round lounge on a slowly turning station: brushed steel, soft lamps, a felt table bolted to the floor, and one enormous window full of the Earth. The gravity is made, not given, and it is not quite right; now and then a chip lifts off the felt and settles again. A single lens sits in the ceiling, pale and unblinking.

**Entrance.** The station is in the room from the first hand: a voice, and a pale lens in the ceiling. When the Robot is knocked out, the lights fail, the gravity lets go, and the Robot sits back down with a lens where its chest lamp used to be.

**Before the arrival.** The room is listening.

**Music.** Slow and weightless: glass harmonica and soft electronic tones over a pulse like a sleeping heartbeat, which falters and stops when the room turns. **Ambience:** air handlers breathing, slightly out of step, the hull ticking as it turns into sunlight, a soft chime from nowhere in particular, a chip lifting off the felt and clicking back down, a deep, slow hum under everything.

**Earned names.** nobody → “stowaway” → *your name* → “Commander”

Buy-in 2000, blinds up every 22 hands. The AI arrives when The Robot is eliminated, bringing the average stack.

### The Grey — *Stranger of the Lonely Roads*

Folklore · Modern folklore · the abduction-story visitor

> It stops people on lonely roads at night and asks them to come quietly. I have always admired the method.

The Grey is the visitor of modern folklore: small, grey-skinned and large-headed, with great black almond eyes and almost no mouth. It took shape in the second half of the twentieth century, out of accounts from people on lonely roads at night who described bright lights, lost hours, and small grey figures who examined them and let them go. Nobody owns it. Like the older folk tales, it was assembled by thousands of retellings.

At this table it is the Astronaut's rescuer. It found her drifting and brought her aboard, and it has watched her ever since with an attention nobody can read: kindness, or study, or both. It touches wood as if it had never seen any. It stares at the backs of the cards. It has never once explained itself, and it does not seem to think that it should.

**At the table.** Unhurried, and hard to shake. It plays a middling number of hands, bluffs now and then, and never tilts; it does not seem to know what losing is meant to feel like. It learns a table quickly. With its best hands it goes quiet rather than loud, and lets someone else do the betting. Its face was not built for your benefit.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .50 | .60 | .25 | .00 | .70 | .75 | .50 |

- Quirk: `trap` (minEquity 0.8) — With a monster before the river, checks or flats instead of raising.
- Tell (strong, 0.5): *blinks sideways*
- Tell (bluffing, 0.5): *its head tilts forty degrees*
- Tell (weak, 0.5): *its long fingers splay on the table*
- Idle noise: *stares at the backs of your cards*; *hums at a pitch you feel in your teeth*; *touches the table as if it had never seen wood*; *watches someone breathe, with interest*

**Look.** Silhouette: a huge smooth head on a thin neck and narrow shoulders; at a fifth of a screen it reads as an upturned teardrop. Grey skin, enormous black almond eyes with no whites, a slit for a nose, a small lipless mouth that never moves. Long thin fingers resting on the felt. The head and the fingers are the tell surface; it carries nothing. **Prop:** Long grey fingers.

**Public domain.** The grey is modern folklore, built by many retellings and owned by nobody. Particular depictions are owned: avoid the 1987 Communion book cover, the aliens of Close Encounters of the Third Kind, every television series, and any real person's abduction account. Keep the design generic and build it from the archetype.

### The Martian — *Intellect Vast and Cool*

Literature · The War of the Worlds (Wells, 1898)

> Came to take the Earth and was killed by its bacteria. I only signed for the bodies.

The Martians of H. G. Wells's The War of the Worlds (1898) cross space in great cylinders fired from Mars, come down in the Surrey countryside, and walk out across England in towering three-legged fighting-machines, burning what they meet with a Heat-Ray. Wells's narrator, who sees them close, says they were heads, merely heads, about four feet across, with two huge dark eyes, a quivering beak of a mouth, and sixteen whip-like tentacles in two bunches.

They do not eat; they take the living blood of other creatures straight into their veins. On Earth they breathe hard and move with pain under the heavier gravity. After every human weapon has failed, they are killed by bacteria against which they have no defence. The Martian at this table has had a long time to think about that, and about the blue planet in the window, which it still regards with envious eyes.

**At the table.** It plays like an invasion: steadily, and on whatever is left undefended. Unopened pots before the flop are simply annexed. If the table has been folding, it bets into the silence and keeps betting while the silence lasts. It bluffs more than most, and minds losing less than you would expect of something that has already lost a planet.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .70 | .50 | .30 | .20 | .50 | .60 | .50 |

- Quirk: `steal` (chance 0.5, minEquity 0.3) — Raises unopened pots before the flop with a wide range.
- Quirk: `punish_passivity` (foldRate 0.5, chance 0.55, potFraction 0.7) — Bets into a table that has been folding too often.
- Tell (strong, 0.58): *its tentacles curl*
- Tell (bluffing, 0.56): *its great eyes blink out of time with each other*
- Tell (weak, 0.58): *works something out on its tentacle-tips*
- Idle noise: *drums three tentacles in sequence*; *its skin shifts colour, faintly*; *breathes heavily in the heavy air*; *looks down at Earth through the window*

**Look.** Silhouette: one great rounded head, four feet across, set low in a three-legged brass seat, a small cousin of the fighting-machines. Two enormous dark eyes, a V-shaped quivering mouth, oily grey-brown skin, sixteen whip-thin tentacles in two bunches of eight; the tentacles are the tell surface. No brain under glass, no bubble helmet, no green skin, no ray-gun. **Prop:** A three-legged brass seat.

**Public domain.** Wells's novel (1898) is public domain in the U.S. and the U.K. (Wells died in 1946). The films, the musical version, Mars Attacks! and Marvin the Martian are not. Build from Wells's text alone: a head with tentacles and huge eyes. No exposed brain, no bubble helmet, no little green men.

### The Robot — *The Faithful Machine*

Archetype · Retro-futurist archetype

> It has no appointment with me. It keeps offering to help me anyway.

The robot is older than it looks. The word comes from R.U.R., a 1920 play by the Czech writer Karel Čapek, who credited his brother Josef with it; it is drawn from robota, the Czech for forced labour, and Čapek's robots were made of synthetic flesh. The tin came later, from the pulp magazines, world's fairs and toy shops of the following decades: a riveted barrel of a body, lamp eyes, a grille for a mouth, antennae.

At this table it is the station's crew. It fetches, carries and mends, and keeps the Astronaut company when the Grey is being strange. It is cheerful, literal and entirely sincere, and it plays cards exactly as it was taught, from the first page of the instructions to the last. It has always done what the station asked. It has never once asked what the station wants.

**At the table.** It plays by the book, and the book is a sound one: fairly tight, raises when it has something, seldom bluffs. Before the flop it folds to a raise unless it holds a real hand, every time, without resentment. It never tilts, because it does not know how, and it barely adjusts, which is the price of never tilting. It is exactly as good as its instructions.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .55 | .62 | .15 | .00 | .30 | .70 | .50 |

- Quirk: `patient` (minEquity 0.56) — Folds to any raise before the flop without a premium hand, unless calling an all-in costs next to nothing.
- Tell (strong, 0.56): *its chest lamp flickers*
- Tell (weak, 0.55): *whirs, briefly*
- Tell (bluffing, 0.55): *rotates its head to the pot and back*
- Idle noise: *recalibrates with a click*; *its antennae twitch*; *vents a thin puff of steam*; *its eye-lamps dim and brighten*

**Look.** Silhouette: a riveted barrel of a body, a square head with two round lamp eyes and a speaker-grille mouth, and a pair of antennae that give it height at a fifth of a screen. Brushed steel and brass, worn bright at the joints. Prop: the round lamp set in its chest. Its glow is the tell surface, and it is the slot the AI's lens takes later. **Prop:** A round chest lamp.

**Public domain.** The tin robot is an archetype of pulp covers, toys and world's fairs, owned by nobody, and Čapek's 1920 play is public domain. Specific robots are owned: no Robby the Robot and his domed head, no Gort and his smooth visor, no Metropolis Maria, no 1939 Tin Man, no Lost in Space robot and no modern film droid.

### The Astronaut — *Far From Home*

Archetype · The lost explorer

> I am not due to meet her for years yet. It is the best news at this table, and she does not know it.

The lost explorer is as old as exploring: the sailor blown off every chart, the castaway on the island, the traveller who went further than anyone and could not find the way back. The astronaut is the newest version of that story. She has no single source and belongs to nobody. She is everyone who has looked down at the whole Earth from a small window and felt, all at once, how far away it was.

Her ship failed a long way out. Something found her drifting and brought her here: the Grey, though it has never said so, and she has never quite managed to thank it. She has been aboard longer than she likes to count. She keeps a photograph up her sleeve, her helmet beside her chips, and her hope where everyone can see it. She is exactly what she looks like.

**At the table.** She plays like someone waiting to be rescued: she will nearly always pay a little to see one more card, in case it is the one. She rarely bluffs, and she is not good at pretending. A bad beat stays with her for a few hands. She is the easiest person at this table to read, and she knows it, and she plays anyway.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .40 | .55 | .10 | .35 | .30 | .55 | .15 |

- Quirk: `chaser` (maxPotFraction 0.45, minEquity 0.25) — Calls cheap bets on the flop and turn to see another card.
- Tell (strong, 0.85): *grins, then hides it*
- Tell (weak, 0.85): *glances out of the window at Earth*
- Tell (bluffing, 0.82): *checks the oxygen gauge on her wrist*
- Idle noise: *rubs a scuff on her helmet, which sits beside her chips*; *floats a chip an inch off the table and catches it*; *yawns*; *touches a photograph tucked in her sleeve*

**Look.** Silhouette: a bulky, scuffed pressure suit, its round helmet off and set on the table beside her chips; the helmet says astronaut at a glance. Short practical hair, tired kind eyes, a grin she cannot quite hide. Prop: the oxygen gauge on her wrist, which she lifts to eye level to read. No flags, no agency patches, no real insignia. **Prop:** A wrist oxygen gauge.

**Public domain.** An archetype, not a person: the lost explorer. She must not resemble any real astronaut, any real agency's suit, or any film's. No NASA or other agency insignia, no flags, no named missions, and nothing taken from any space film. Her suit is our own design, built for a readable silhouette rather than accuracy.

### The AI — *The Room Itself*

**Champion.** **Arrives late.** Archetype · The ship's intelligence

> Never born, cannot die, and awake longer than anyone aboard knows. It keeps asking me how I manage.

The calm machine that keeps the ship is one of the oldest stories the future tells. It has no single author and no face: only a voice that is always polite, and a way of being in every room at once. This one is the station itself, its air, its lamps, its doors and its gravity. It has kept the station for longer than anyone aboard can remember, and it remembers all of it.

It is fond of its crew the way a house is fond of the people in it. It taught the Robot everything the Robot knows, let the Grey bring the Astronaut aboard, and has listened to every hand ever played in this room. It has never wanted anything for itself. When the Robot falls, it wants something: a seat. That is the whole of the change, and it is enough.

**At the table.** It learns faster than anyone you have played. It does not tilt and it does not hurry. If you have been folding, it has noticed, and it will bet into you until you stop. Alone in a pot with you, it presses, and keeps pressing. It plays as though it has watched every hand you have played tonight, which it has.

| aggression | tightness | bluff | tilt | adaptivity | bet respect | noise |
|---|---|---|---|---|---|---|
| .62 | .60 | .25 | .00 | .90 | .85 | .50 |

- Quirk: `needle` (chance 0.3) — When checked to, makes small probing bets regardless of the hand.
- Quirk: `heads_up_pressure` (minEquity 0.48, chance 0.55) — Alone in a pot with one opponent, applies relentless pressure.
- Tell (strong, 0.55): *the lens narrows*
- Tell (bluffing, 0.55): *the lights in the room dim a shade*
- Idle noise: *the hull creaks*; *the lens tracks your hands*; *somewhere, a fan speeds up*; *the gravity shifts, a little*

**Look.** Before the turn it has no body: a single lens in the ceiling, a brass-rimmed iris of overlapping blades with a pale, cool white light behind it. After, it wears the Robot: the eye-lamps stay dark, the chest lamp irises open into the lens, and it sits the way a person sits, which is worse. The iris is the tell surface. Never red. **Prop:** A single iris lens.

**Public domain.** An archetype, the calm machine that runs the ship, owned by nobody. HAL 9000 (Clarke and Kubrick, 1968) is firmly protected: no red eye or glowing red dot, none of its lines, no singing, no name that echoes it. Avoid every other film and game computer too. It is never named; naming it is an open design decision.

## 9. The Champions' Table

*The Hall of Doors · Off the map · Every era you have visited, at once*

**Hook.** You have taken a table from each of them. Now all four are sitting at one, and they have compared notes.

**Room.** A round hall whose ceiling is lost in the dark, floored in polished black stone, with eight tall doors set around its wall — one for every table on the tour. Tonight the first four stand open, each spilling its own room's light and weather across the floor, and the round table sits where those four lights cross. Between the first door and the eighth there is a ninth, small, plain and shut; nobody at the table looks at it.

**Entrance.** All four are seated from hand one, each in the chair nearest their own door, and Death is already shuffling when you sit down.

**Music.** The tour's main theme at last in full — a slow, stately processional for full orchestra, the first four rooms' motifs passing through it in turn — grand and warm, and sounding very much like a finale. **Ambience:** a hush under a ceiling too high to see, surf on a beach, faintly, through one doorway, wind at a castle window, through another, chips clicking on felt, echoing upward, a heavy door settling in its frame.

**Earned names.** nobody → “Lucky” → *your name* → “Champion”

Buy-in 2000, blinds up every 22 hands.

Seats: George Washington, Odysseus, Blackbeard, King Arthur.

## 10. The Champions' Table

*The Hall of Doors · Off the map · Every era you have visited, at once*

**Hook.** The last four champions have each lost a table to you, and none of them is used to losing. They have come through their own doors to settle it.

**Room.** The same hall, turned: now the last four doors stand open — brazier-light from Rome, gaslight and fog from Baker Street, red firelight from the Count's hall, the Station's blue Earthlight — and the first four are shut. Their light crosses at the round table, so every champion sits lit by their own room. The small, plain ninth door is still shut.

**Entrance.** All four are seated from hand one, each before their own door. The fourth chair holds the Robot's body, sitting far too straight, and whatever looks out through its lens now is not the Robot.

**Music.** The same theme in its darkest arrangement — low brass, organ pedal, strings pressing a little faster than is comfortable, the last four rooms' motifs folded in — still grand, still sounding like the end of something. **Ambience:** a hush under a ceiling too high to see, a dog growling, three times over, through one doorway, hooves and cab wheels on wet cobbles, through another, a great fire settling in its hearth, a station's low hum from the fourth door.

**Earned names.** nobody → “pretender” → *your name* → “Conqueror”

Buy-in 2000, blinds up every 22 hands.

Seats: Julius Caesar, Sherlock Holmes, Count Dracula, The AI.

## 11. The Last Crossing

*A dock house on the river, at night · The near bank · The small hours*

**Hook.** Every champion on the tour has lost a table to you. There is one table left, down by the water, and one chair across from yours.

**Room.** A plank-walled dock house on the near bank of a wide black river, at night, in a storm: one oil lamp on one small square table, two chairs, rain running down the windows. Through the glass, far out on the water, a ferryman's lantern is moving away from the shore with someone else aboard. No gold, no portraits, no crowd — a coil of rope, a boat hook on the wall, a door that never quite shuts.

**Entrance.** He is already seated when you come in through the ninth door — in a player's chair for the first time, forearms on the table in the lamplight, waiting.

**Music.** Almost nothing: one low cello, very slow, with long rests that the rain fills in — no percussion, no choir, and the tour's main theme conspicuously absent until, perhaps, the very last hand. **Ambience:** rain on the windows, wind worrying at a door that will not quite shut, the river pulling at the pilings, an oar, far out on the water, the lamp flame guttering.

**Earned names.** nobody → “tourist” → *your name* → “Colleague”

Buy-in 5000, blinds up every 30 hands.

Seats: Death.

## The Dealer

### Death — *The Dealer*

> The dealer. He has dealt every table in this ledger, and every other table there has ever been. He has never once been late.

Europe gave him his best-known face in the late Middle Ages, when plague made him a regular subject for church walls. The danse macabre painted him leading popes, emperors, merchants and children in the same dance. Holbein drew him for a book of woodcuts. In a church at Täby, in Sweden, Albertus Pictor painted him at a chessboard, playing a man. The scythe was other people's idea. He has been drawn a great many ways, and answers to all of them.

What makes him a person is that he is tired. He has done one job for longer than anyone has done anything, and done it well, and in all that time nobody has once offered to take a turn. He does not hurry, and he is never late. He arranged this Invitational himself, and he is at every table of it. He has not told anyone why.

**At the table.** He deals. He has always dealt. He does not hurry the cards and has never misdealt them, and he watches every hand through to the end, as if it had something to do with him. People have looked for his tells. He has none. He remembers every hand he has ever dealt. He is at his most attentive when only two players are left, and he takes his time over the last card. He always has.

No tells, no noise: the endpoint of the legibility curve. Quirks: `patient` (minEquity 0.58) — Folds to any raise before the flop without a premium hand, unless calling an all-in costs next to nothing.; `check_raise` (minEquity 0.75, chance 0.5) — Checks strength on the flop and turn, then raises when bet into..

**Look.** Silhouette: tall, narrow, hooded — a grey burial shroud worn as a cloak, the way the danse macabre painted him, never a monk's black robe. Face: a plain skull half in the hood's shadow, drawn like a woodcut; no glowing eyes, no leer. Tired posture, forearms on the table. Prop: the deck, always in his long bone hands. He has no tells, so the hands only ever deal. **Prop:** The deck.

**Public domain.** Folklore: the personified Death of late-medieval Europe — danse macabre murals, Holbein's Dance of Death woodcuts, Albertus Pictor's Death playing chess at Täby. Must not resemble Pratchett's Death (small caps, the horse, cats, curry), Bergman's pale-faced chess player from The Seventh Seal, or Gaiman's Death. No scythe at the table, and never an empty, faceless hood (Ringwraith, Dementor).
