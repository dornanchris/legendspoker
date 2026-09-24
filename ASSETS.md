# ASSETS.md — Character Poker

**RULE: $0 budget. CC0 / public-domain ONLY.** No paid assets, no "free with
attribution" unless we deliberately accept the attribution cost. When in doubt,
CC0 (Creative Commons Zero = public domain, no attribution, commercial-safe).

Maintain this file as the single source of truth for where every asset came
from and under what license, so shipping is never blocked by a licensing
surprise.

---

## SOUND — free sources (captured from voice session)

Target license tier: **CC0** wherever possible.

- **Freesound.org** — the big library. Search terms: "poker chips", "chip
  stack", "card deal", "card flip", "riffle". IMPORTANT: it's a *mix* of
  licenses — filter by license and take CC0 so there's no attribution
  obligation. Read each file's license individually.
- **Kenney.nl** — entire game asset packs, all CC0, no exceptions. Has
  interface / casino-ish sound packs. Zero legal worry. (Already on the CC0
  art shortlist too.)
- **OpenGameArt.org** — same approach: filter to CC0.
- **Pixabay** (sound section) — free, often no attribution; read the fine print.
- **Mixkit** — free SFX with permissive terms; read the fine print.

### Best option for chip sounds: record our own
A real stack of clay chips + a phone mic gives the exact clatter, and we own it
outright (no license question at all). Same for riffling a real deck of cards.
For chip sounds specifically this may beat anything downloadable.

### Sounds we specifically need
- Chip clatter — clay-on-clay landing (the money sound; must scale/layer with
  bet size for the chip *stream*, see design doc)
- Card deal / flick (one per card)
- Card riffle
- Flop/turn/river flip (crisp, with a beat of anticipation)
- Pot-slide / pot-collect on winning
- Turn notification / "your turn" cue

---

## ART — CC0 sources (carried over from earlier planning)

- **Quaternius** — CC0 low-poly 3D models.
- **Kenney.nl** — CC0 3D + 2D + UI.
- **VRoid Studio** — free stylized character creation (check export terms).
- **Mixamo** — free rigging + animation (Adobe account; check terms for use).

Art direction still UNDECIDED (see design doc D3): flat 2D mesh-deform
(Live2D/Rive) vs. stylized low-poly 3D. Do ONE character end-to-end as a
vertical slice before committing.

---

## LICENSING NOTE — characters
Public-domain FIGURES (dead >~70 yrs: historical presidents, mythological gods,
out-of-copyright literary characters like Sherlock/Nemo/Javert/Wells' Martian)
are free to depict. Modern/copyrighted franchises (Star Wars, Star Trek, Alien,
Doctor Who, Terminator) are OFF the table. Verify each character's copyright
status before committing art time.

---

## CHARACTER COPYRIGHT TRAPS — the famous version is usually NOT the free one

The figure is public domain; the most familiar *depiction* of them often is
not. Every character's own note lives in its data file
(`data/characters/<id>.json` → `profile.public_domain`) and is collected in
`ROSTER.md` (`npm run roster`). The ones most likely to bite:

| Character | Safe source | Must not resemble |
|---|---|---|
| Frankenstein's Monster | Shelley, 1818: eight feet, yellow skin, black hair, articulate, well read | Universal's 1931 makeup — flat head, neck bolts, green skin, grunting |
| The Wolf Man | European werewolf folklore | Universal's *The Wolf Man* (1941): Larry Talbot, the silver cane, the curse poem. ⚠ Consider a different display name — see below |
| Dracula | Stoker, 1897; the 1927 stage play's cape is now PD in the US | Bela Lugosi's likeness (his estate has asserted rights); Universal's film designs |
| Davy Jones | Sailors' folklore — the devil of the deep, Davy Jones' locker | Disney's tentacle face, the organ, the heart in a chest |
| Alice | Carroll, 1865; Tenniel's illustrations | Disney's 1951 film design |
| The Headless Horseman | Irving, 1820 | Disney's 1949 short; Burton's 1999 film |
| Merlin | Geoffrey of Monmouth, Malory | T. H. White (still in copyright: "Merlyn", living backwards, the owl Archimedes); Disney |
| The Green Knight | *Sir Gawain and the Green Knight* (14th c.). NB the poem gives him **no armour** — holly and an axe. The design doc's "green armour" is a choice, not the source | The 2021 A24 film; any staging with his own severed head (that steps on the Horseman) |
| Spartacus | Plutarch, Appian | The 1960 film (its "I am Spartacus" scene) and the TV series |
| Leonidas | Herodotus, Plutarch | Frank Miller's *300* and the film — the look and "This is Sparta" |
| Sherlock Holmes | All Doyle stories are PD in the US since 2023 | Modern screen versions (BBC, Downey films); "Elementary, my dear Watson" is not Doyle |
| Javert | Hugo, 1862 | The musical (1980/85): no lyrics, no "Stars" |
| Captain Nemo | Verne, 1870/1875 | Disney's 1954 Nautilus and Nemo |
| Cerberus | Greek myth | Hagrid's "Fluffy" (Harry Potter); Disney's *Hercules* |
| The Martian | Wells, 1898 | *Mars Attacks* (brain in a fishbowl helmet); Marvin the Martian |
| The Robot | Retro-futurist archetype; the word is Čapek's (1920, PD) | Robby the Robot (MGM, 1956); Gort; the *Lost in Space* robot |
| The Astronaut | Archetype | NASA insignia (use is restricted); any real astronaut |
| The AI | Our own design: a pale white lens, amber emergency light | HAL 9000 — the name, the red eye, the lines. It still has no name: an open decision |
| Death | Folk Grim Reaper; the medieval danse macabre (Death playing chess is a c.1480 church painting) | Pratchett's Death (small caps, the horse, cats, curry); Bergman's *Seventh Seal*; Gaiman's Death |

`npm run check:data` has a tripwire list for the lines most likely to slip in
(`I am Spartacus`, `This is Sparta`, `HAL`, `Elementary, my dear`, …). Add to
it whenever a new trap is found.

**Open naming question.** "The Wolf Man" as a *name* is the title of a
Universal film, and Universal guards its monsters' trade dress. The character
is the folklore werewolf and should be safe, but "The Werewolf" as the
display name removes the question entirely. Decide before any store listing.
