# LEGENDS POKER: DEATH'S INVITATIONAL — Design Document (v3)

## [DECISION] TITLE — Legends Poker: Death's Invitational

"Death's Invitational" alone is a great name and a terrible store listing —
nobody searching for a poker game finds it. So: **Legends Poker** is the
searchable franchise brand, **Death's Invitational** is *this campaign*.

Reasoning: we are naming a **franchise slot**, not one game. Sequels/expansions
hang off it for free — *Legends Poker: Gods' Challenge*, etc. Holiday tables and
expansion packs need no renaming.

Note: do NOT chase "Texas hold 'em" as the search term — that searcher wants a
normal poker app and will bounce. The target searcher types "story poker",
"poker RPG", "poker with characters". The word that must survive truncation is
**poker**.

TODO before art carries a logo: check app stores + trademark for "Legends
Poker" (generic enough that something may already use it). "Dead Man's Hand"
was liked but is almost certainly taken — save it for a table name or
achievement.

*Status: on paper, not started. Realistic start ~October. Engine Phases 1+2
already built and working (see /character-poker). This doc is the product
vision, deliberately NOT fifty pages — just enough that nothing evaporates.*

---

## The one-line pitch

**Death's Invitational.** A single-player, character-driven Texas Hold'em
"world tour": eight themed tables across history and myth, each with a
recognizable boss, tied together by one recurring dealer — Death — who is
revealed at the very end to be the final opponent. Death is running the
gauntlet because he is auditioning a **successor**. Winning does not mean
escaping him; it means inheriting the deck.

There is also a **multiplayer mode** where the legends you defeat become
playable avatars — the single-player gauntlet is the unlock engine.

This is the spiritual successor to Candywriter's *Imagine Poker* (2008),
which had themed opponents but no connective tissue between them. The tour
structure, the recurring dealer, and the player respect-arc are what this
adds.

---

## The spine: three ideas that make it one game, not eight rooms

1. **Death is the dealer at every table.** One constant face while everything
   else rotates. He is timeless by nature, which is what justifies a tour
   that hops across all of history. He does not play, so he needs no
   personality dials or tells — he is pure presentation, and costs writing
   and art only, never engine work. Chosen over God/Jesus (needlessly
   controversial) and over Father Time / a trickster (less distinctive).
   Bonus: Death was in the original Imagine Poker roster, so it's a nod.

2. **Death is the final boss.** After all tables are cleared, the dealer sits
   down. This lands emotionally because it was set up hours earlier — he's
   been at your table the whole game. His table "transcends everything"
   (the environment itself signals you've left normal space). Design
   question left open: Death should probably be *unreadable* — no tells,
   flawless pot odds — the one opponent you can't get a read on. His dealer
   for that game is a reskin of the dealer character (cheap two-for-one).

3. **The player respect-arc.** Opponents show you little respect at the start
   of the tour and progressively more as you win, until the finale regards you
   as a formidable threat. This is a character arc *for the player*, told
   entirely through NPC dialogue tone — costs nothing but writing.
   Implication: probably do NOT open on Colonial America; open somewhere the
   early disrespect stings, and save the reverent tables for late.

### [DECISION] Respect IS the progression system — no XP, no levels

Rejected: levels / XP bars / "Level 12" (seen in the concept mockups). A level
number is UI sitting *on top of* the game and does nothing for a player whose
actual goal is beating people. **Respect is diegetic** — the game itself
changes rather than a meter filling. And since the dialogue-tone shift was
already a committed writing cost, making it the progression system is close to
free: we're labelling something we were building anyway.

**Scope: per table.** Respect is earned and tracked at each table rather than
globally. Slightly more writing than a global "word spreads ahead of you"
model, but it's richer (Dracula may respect you while the Wolf Man still
doesn't) and it gives the unlocked rematch tables a reason to exist.

**Marker: you earn a NEW NAME as you go.** This solves the one real weakness of
respect-as-progression — a number is legible, a tone shift can pass unnoticed.
So the progress must be *announced* at least once per step: what the table
calls you changes as you climb. Nobody → some dismissive nickname → your actual
name → a title. Earn it invisibly through play; announce it explicitly when it
flips, so the player never misses that they moved.

**Achievements: keep, but frame them in-world.** Not a trophy cabinet. The
"journal"/ledger framing from the concept art is the right direction — Death's
record of who you have beaten. Fits the Invitational fiction and doubles as the
avatar-unlock tracker.

---

## Structure & progression

- **Eight story tables**, each a distinct *place* (a place does half the
  art's job before you draw a face).
- Beating a table unlocks **two** things:
  1. the **next** location on the map, and
  2. **random play** at the location you just beat — a rotating cast of
     non-boss characters for that setting (this is classic Imagine Poker,
     un-confined to a single opponent lineup). Reuses the same table + dealer
     art; new opponents only.
- After all eight: **two champion tiers** — Champions' Table for the first
  four bosses, then Champions' Table for the last four — played at Death's
  transcendent table.
- Total before the finale: 8 story + 8 random + 2 champion = **18 games**.
- **Finale:** heads-up against Death.

---

## THE EIGHT TABLES — LOCKED (v4)

Tour order matters and is part of the lock. **32 characters total** — 8 tables x
4 seats, champions included. (Down from ~40; the saving is real art time.)

| # | Destination | Seats | Champion | Entrance |
|---|---|---|---|---|
| 1 | **The White House** — USA | Lincoln, Theodore Roosevelt, FDR | **Washington** | Seated from hand one. Barely speaks. |
| 2 | **Athens — The Symposium** — Greece | Socrates, Leonidas, Medusa, the Cyclops | **Odysseus** | Arrives ~10 hands after first elimination. Comic. Skippable (see below). |
| 3 | **Pirate Cove** — Caribbean | Captain Kidd, Long John Silver, Davy Jones | **Blackbeard** | Seated from hand one. Dominates the room. |
| 4 | **Camelot** — Britain | Merlin, Lancelot, the Green Knight | **King Arthur** | Seated from hand one. Gracious host. |
| 5 | **Imperial Rome** — Italy | Spartacus, a Pope (TBD), Cerberus | **Julius Caesar** | Arrives after the first elimination. |
| 6 | **Baker Street** — London | Captain Nemo, Inspector Javert, Alice | **Sherlock Holmes** | Seated from hand one. Reveal = narrating YOUR tells. |
| 7 | **Transylvania** — Romania | Van Helsing, Frankenstein's Monster, Wolf Man, Headless Horseman | **Dracula** | Watches from the fireplace, joins after two eliminations. **Predator.** |
| 8 | **The Station** — sci-fi | Grey Alien, Martian, Robot, Astronaut | **The AI** | The room turns: lights fail, gravity glitches, the Robot stands up as something else. |

**A seated champion IS one of the four seats.** Only late-arriving champions
(Odysseus, Caesar, Dracula, the AI) need a fourth NPC holding the chair.

### Order rationale
- Rome and Athens are deliberately **separated** — back-to-back classical
  tables would blur.
- The two **grand** entrances land at 7 and 8 (Dracula, then the AI), so
  spectacle escalates into the finale.
- White House opens: dignified statesmen dismissing an unknown amateur is
  exactly the disrespect that needs to sting early.

### [DECISION] The two dramatic entrances

Zeus's thunderclap left with Olympus, so the base game needed replacement
spectacle. Two, not more — four mid-game arrivals was already flagged as over
budget, and three of them were the same "watch, then join" move.

- **Dracula (7)** — predator. Unchanged.
- **The AI (8)** — upgraded from a body-swap to a full entrance. Previously
  "takes over the robot," which is a swap, not an arrival. Now: **the room
  turns against you.** Lights fail, emergency lighting, artificial gravity
  glitches, the ship itself wakes up — and the Robot stands up as something
  else. This is the Zeus-scale spectacle, placed at the last table before
  Death so escalation peaks correctly.
- **Caesar (5)** and **Odysseus (2)** arrive, but comically/procedurally rather
  than grandly. Caesar's trigger is the **first elimination** (it was Marcus
  Aurelius's elimination, but he was cut).

### [DECISION] v4 roster changes and why

- **FDR stays; the White House is Lincoln / Teddy / FDR / Washington.** Four.
- **Pirate Cove:** Calico Jack CUT (fails recognizability). Anne Bonny CUT.
  **Davy Jones** added — but ⚠ **the tentacle-faced version is Disney's and
  firmly copyrighted.** Only the *folklore* Davy Jones (a devil of the sea who
  takes drowned sailors) is public domain, and the design must look nothing
  like the film. Long John Silver survives on the **parrot**, not the peg leg —
  everything distinctive about him is below the table, and the parrot is the
  only part above the waterline that animates.
- **Camelot:** Robin Hood CUT (wrong legend, wrong century). Morgan le Fay
  passed over — King/wizard/knight/sorceress was too obviously stacked.
  **The Green Knight** added: green armour, enormous, Arthurian canon, and the
  only non-human silhouette at a table of men in armour and robes.
  ⚠ He carries his own severed head in the poem — **do not stage that**, it
  steps on the Headless Horseman.
- **Imperial Rome:** Hannibal, Marcus Aurelius, Cleopatra and Nero all cut.
  Nero was considered and dropped — "a Roman emperor" is what most players
  read, and Caesar already owns that slot. **Cleopatra is Egyptian** (Greek-
  Macedonian by descent, ruler of Egypt, never Roman) and moves to the sequel.
  Table is now **Spartacus** (the one person at the table who was *owned* by
  Rome), a **Pope** (Renaissance Rome; mitre and robes read nothing like a
  toga; pure scheming deception — Borgia/Alexander VI is the placeholder), and
  **Cerberus**.
- **The Station:** Reptilian CUT, **Astronaut** IN — preserves the one honest
  human read at the table.

### [DECISION] Cerberus — the non-speaking seat

Three heads is a **tell language nobody else can have.** The heads can
disagree: two watching the player, one watching the pot; all three snapping to
attention at once; one asleep while another snarls. That is a readable state
machine built into the character design, and it is signal-and-noise by nature
— most of the time the heads are just being dogs.

He does not speak. Growls, whines and yawns carry it, which costs **nothing**
from the voice budget. Death translates occasionally (the same gag drafted for
the holiday Turkey). Temperament: the table's animal instinct — no bluffing, no
scheming, pure reaction — against Caesar's calculation and the Pope's
deception. That's the fourth reason to be in the room.

### [DECISION] Secondary casts = DLC, not launch

The roster is **closed at 32**. Everything cut but liked goes into a pool for
the *existing* unlocked-rematch system (beating a table already unlocks
random-play there with a rotating cast) — so a secondary-cast DLC is stocking a
feature that already exists rather than building a new one.

Pool: Guinevere, Anne Bonny, Morgan le Fay, Benjamin Franklin, Calico Jack,
Hannibal, Marcus Aurelius, Nero, Robin Hood, Arsène Lupin, Jekyll/Hyde,
Phileas Fogg, Dorian Gray, plus the wider unlockable lists.

### [DECISION] Philadelphia → The White House
Founders' Hall failed the casting rule **visually**: Washington/Franklin/
Hamilton/Jefferson/Adams are four different temperaments wearing the same
powdered wig, and this is a face-reading game. Presidents *across eras* give
four instantly-readable silhouettes AND cast themselves:
- Washington — disciplined, controlled, tight (champion)
- Lincoln — patient, thoughtful, a reader
- Teddy Roosevelt — aggressive as hell
- FDR — socially deceptive, hard to read
Franklin is not lost; he becomes an unlockable / holiday champion.

### [DECISION] Tombstone CUT from the base eight → expansion
Not because it's bad — it's great. But Pirate Cove already covers "rowdy human
table" and the White House covers "grounded human." Tombstone becomes an
**Outlaws & Lawmen** expansion where Doc Holliday keeps his hidden-in-plain-
sight champion gimmick (Earp, Oakley, Billy the Kid, Buffalo Bill, + Jesse
James / Butch Cassidy / Sundance / Ned Kelly as unlockables).

### [DECISION] Mount Olympus REPLACED by Athens — the gods are saved for the sequel

Olympus was cast and passing (Athena / Hermes / Hades / Dionysus, Zeus arriving
on a thunderclap). It is cut anyway, for one reason: **the planned sequel is
built on pantheons** (*Legends Poker: Gods' Challenge* — the gods dispute that a
mortal belongs among legends). Spending the single most recognizable pantheon
in the base game guts the sequel before it starts. Olympus, Zeus, Athena,
Hermes, Hades, Dionysus and Loki are all **reserved**.

**Replacement: Athens — The Symposium.** A symposium was literally a drinking
party where Greeks argued philosophy, so the room has a real in-fiction reason
to exist, and guests came from across the Greek world — which is what licenses
a Spartan, a monster and a giant sharing a table.

⚠ **The trap this table must dodge:** four Greeks in robes is Founders' Hall
again. Every seat is picked for **silhouette** first.

| Seat | Silhouette | Temperament |
|---|---|---|
| **Socrates** | Bald, snub-nosed, famously ugly, plain robe — distinctive *because* he isn't an idealized Greek | Patient, needling, unbothered. Questions everything. **Must NOT narrate the player's tells — that's Sherlock's gimmick.** |
| **Leonidas** | Crested helmet, red cloak. The most unmistakable silhouette available | Disciplined, fearless, never backs down once committed. A Spartan at an Athenian table is built-in friction |
| **Medusa** | Snakes. Instantly readable | **Mechanically the most interesting seat on the map: the one opponent you must NOT look at.** Inverts the entire tells system for one character |
| **The Cyclops** | Single eye, enormous | Brutish, direct. Carries a canonical grudge against Odysseus that pays off when the champion finally shows |

Two non-human silhouettes against two human ones — no other table has that mix.

**Champion: Odysseus, arriving LATE.** This recovers Doc Holliday's
hidden-in-plain-sight/late-entry slot, freed when Tombstone moved to the
expansion — and Odysseus has canonical justification for it. He took ten years
to get home; of course he's late. He arrives roughly 10 hands after the first
NPC elimination, taking the empty seat.

### [DECISION] The Odysseus skip — an optional fork with a real cost

If the player eliminates the entire field before Odysseus arrives, **they beat
the table and advance, but never face him — so he is NOT unlocked.** Athens
shows as complete with Odysseus greyed out in the journal. To collect him the
player must replay the table.

Why this shape (rather than forcing the encounter or blocking progression):
it turns a scheduling edge case into a **choice**. Speedrunners get an
achievement, completionists replay, neither is punished. It also gives the
unlocked rematch tables a concrete reason to exist beyond reusing art.

Requirements:
- **The cost must be visible**, or it reads as a bug. Journal shows him greyed
  out; he gets an exit line as the player leaves — he arrived to find the table
  already cleared and is *mildly put out*, not angry. Funnier that way.
- **One-off.** This is not a pattern for other tables. It works precisely
  because it is specific to the man famous for being late.

**Consequence to note:** with Zeus gone, **Dracula is the only dramatic
mid-game entrance left in the base game.** Odysseus's is comic, not grand.

### [DECISION] Baker Street — a 19th-century LITERATURE table, not a detective table
Four detectives blur. The table is now: Sherlock (analytical), Captain Nemo
(mysterious intellectual), Inspector Javert (rigid, relentless) + one open
seat. **The fourth must NOT be another stern man** — Nemo and Javert are both
brooding intense types and it needs lightness/trickery.
- **[DECISION] The fourth seat is ALICE.** Recognizable instantly, changes the
  whole visual composition (three men in dark Victorian coats + a girl in a
  blue dress reads at a glance), and plays curious/unpredictable — calls
  strange bets to see what happens, unintimidated by Javert or Nemo.
  Her dial-set is genuinely unique in the game: **unpredictable play but
  legible emotions** — high VPIP, low deception. She's the one person at the
  reading table whose face actually means something.
- **Cheshire Cat rejected.** Non-human is NOT the objection (Transylvania seats
  a wolf and a pumpkin-headed rider). The problem is he's *unreadable by
  design* at the game's reading table — no face to read, no body language to
  leak. He doesn't contrast with the table, he opts out of its central
  mechanic. Save him for the Wonderland/Easter table where unreadability is
  the joke. Same objection killed the Invisible Man.
- **Jekyll/Hyde was the strongest runner-up** — one seat, two personalities,
  switching mid-session (tight and apologetic → reckless and aggressive) is a
  dial-set nobody else has and a real tells puzzle. **Cut on animation cost:**
  two full character rigs for one seat. Revisit only if the budget ever
  changes.
- Other candidates considered and passed over: Phileas Fogg (thematically the
  most poker-native character available — literally bet on going round the
  world — but same coat-and-mustache silhouette as Javert), Dorian Gray (weak
  silhouette), Long John Silver (already cast at Pirate Cove).
- Lupin was CUT purely on recognizability: if the designer can't picture him,
  the player can't either. (This is the working filter for every character.)
- Sherlock is **seated from hand one** (not a late arrival — we already have
  Dracula and Zeus doing that). His reveal is that he starts narrating YOUR
  tells back to you.

### [DECISION] The Station — Area 51 cast, but NOT the bunker
The *cast* from the Area 51 concept wins: Grey Alien, Reptilian, retro-1950s
Martian, retro-futuristic Robot — recognizable archetypes nobody owns, which
fixes the "an alien / a smuggler" generic problem.
The *bunker* loses: underground concrete is the least visually distinctive room
on a map containing a gothic castle and Camelot, and the setting is the thing
we actually love. Keep a view — Earth out the window, saucers, stars, glitching
artificial gravity.

**Champion = The AI** (the HAL-style beat survives). "The Visitor" is CUT: an
invented original character is the one champion on the map who isn't a
recognizable legend, and he collided with the AI for the same slot.
Structure: four seats, the station's intelligence is the *room* (voice only) →
beat the table → **it takes over the Robot's body and sits down.** That's the
entrance beat, the two-for-one on art, and it rhymes with Death standing up at
the finale.
⚠ LEGAL: HAL 9000 is Clarke, 1968, firmly copyrighted. Cannot use the name or
the exact red eye. "Unsettlingly calm ship computer" is an unowned archetype —
needs our own name and our own single-lens design. Called "the AI" for now.

### [DECISION] The map is a tour of WESTERN legend — and that's the rule, not a gap
Current map: USA, Britain ×2, Romania, Italy, Greece, Caribbean, + the Station.
One token Eastern table is **worse than none** — it reads as a checkbox and
it'd be the one table written without confidence, which shows immediately in a
game that's 90% dialogue. Recognizability has been the filter all along and it
can't be applied honestly to unfamiliar material.
So: Death invites legends **the player already recognizes on sight.** Note the
cast is already less Euro than the locations (Cleopatra = Egypt, Hannibal =
North Africa). Geographic range is an **expansion** problem — a *Legends of the
East* pack (Feudal Japan / Journey to the West / Ancient Egypt) done properly
with someone who knows the material, not one lonely outpost at launch.

**Tonal-range note:** the set leans gothic/grand (Transylvania, Rome,
Camelot, Death). Pirate Cove is the rowdy human table that breaks the
solemnity. The Station widens range in the other direction (future vs. past).

**Historical + fictional mix is a feature, not a problem** — Death dealing at
every table already tells the player this world plays fast and loose with
reality, so Washington and Sherlock coexisting is fine.

**Holiday/seasonal tables: BACK BURNER.** A full holiday draft exists
(Halloween, Christmas, Valentine's, July 4th, Thanksgiving, St. Patrick's,
Easter, New Year's, Friday the 13th) as limited-time World Tour destinations
that permanently unlock once beaten. Year-two retention content, NOT launch.
Two flags recorded for whenever it's picked up again:
- ⚠ **Friday the 13th spends the ending.** Death leaving the dealer's chair
  and the "Death as multiplayer avatar" reward ARE the campaign finale and the
  successor payoff. Cannot be handed out by a calendar quirk. Give that slot
  someone else.
- ⚠ Headless Horseman appears in both Transylvania and Halloween. He stays in
  Transylvania.
- Better holiday drafts to revisit: **Halloween = the Masquerade** (every seat
  masked, identities revealed only on elimination — cheap: a mask layer over
  existing characters); **Día de Muertos** (the one night Death is celebrated,
  he hosts warmly without sitting down, La Catrina as champion);
  **Christmas = Santa reads you** (seated from hand one, sees you when you're
  sleeping = a tells gag built into the fiction; Krampus stays as a player).

---

## [DECISION] THE FINALE SETTING — The Last Crossing (boat house)

**A dock house on a river at night.** Storm outside, one lamp, rain on the
windows, a ferryman visible out on the black water taking someone else across.

Why this one:
- **It reads instantly.** Anyone who's heard of the ferryman gets "river,
  crossing, this is the end of the line" with no dialogue. (The rejected
  "Death's office" — he's staff, not management — was a better *character*
  joke but required the joke to land; players who ignore story would just ask
  "why are we playing here?")
- **Rejected: the void/blackness.** After eight painted rooms the unpainted one
  reads as "ran out of budget."
- **Rejected: Hell / Heaven.** Death here isn't a devil or a judge — he's the
  dealer, neutral, tired, looking for a replacement. Hell miscasts him.
- **Rejected: the Styx by name, and hourglass/clock iconography.** Never name
  the river — named-Greek underworld imagery collides with Athens, and
  collides. Hourglasses belong to Father Time (drafted as a holiday champion),
  so Death dealing in a hall of hourglasses makes him a guest in someone
  else's house.
- **Escalation by contrast, not more gold.** Every other room was an ornate
  *destination* full of people. This is empty, functional, weather-beaten.
- Death is lit like a *person* — lantern light, arms on the table, waiting.
  After eight theatrical bosses, the last one being calm is the scariest
  option.
- Death still gets a dry one-liner about the location rather than an
  explanation ("What, did you think I lived in Hell?"). Tone: tired,
  unimpressed by his own mythology.

**Player avatar note:** the hat-and-coat silhouette used in the concept art is
a consistent player character across the whole tour that never shows a face,
and costs nothing. Keep it. (Standing rule still holds: you do NOT see your own
avatar in single-player. "The Faceless" — the blank default multiplayer avatar
replaced by legends you unlock — is a good idea but belongs in multiplayer.)

**Steal for later:** the "Echoes of Your Journey" badge column (a rail of the
eight locations you've beaten) is a good artifact — just not on the final
table, which needs negative space.

### [DECISION] LANDSCAPE ORIENTATION ONLY

Locked. Four opponents + Death dealing + your seat + board + pot + bet
controls does not fit a portrait phone screen. Every UI and layout decision
assumes landscape. This also sets the budget for character legibility: each
opponent gets roughly a fifth of screen width, which is why tells must live on
**large silhouette elements** (hat angle, mask plates, head tilt against a
collar) rather than small props. One signature prop per character maximum —
the screen is already busy.

### [DECISION] NO permadeath — you get more chances at Death

Concept art implied "no second chance", but poker's short-run variance is
brutal and losing eight tables of progress to a cooler would be miserable in a
game where variance is the entire point. Instead: **make the finale a longer
match** so skill actually expresses itself.

**This is an ASSET, not a concession — rematch voice lines.** Death is the one
opponent who would *remember*. A rematch ladder is nearly free content and it's
exactly his register: dry, faintly bored, treating his own mythology as a tired
joke.
- e.g. *"Everyone knows you can't cheat death. Or should I say — you can't
  cheat me."*
- Escalate across rematches: less amused each time, OR (better, given the
  successor story) progressively more *interested*. Losing repeatedly and
  having him start to take you seriously is the respect-arc paying off even
  in failure.

---

## [DECISION] DIFFICULTY CURVE — two independent axes

Difficulty is **not** one slider. Two things move in opposite directions as the
tour progresses:

1. **Skill goes UP** — crank the dials. Later opponents are tighter, better
   tuned, less exploitable, and adapt faster.
2. **Legibility goes DOWN** — crank the tells *down*. Later opponents are
   harder to READ, not just harder to beat.

Late tables aren't only better players, they're **quieter** ones. This makes
**Death having no tells at all the endpoint of a curve** rather than a one-off
gimmick, which is far stronger than treating him as a special case.

⚠ **This needs a knob that does not exist yet:** a per-character
**noise-to-signal ratio**. Early opponents fire clean, well-separated tell
clusters; late opponents bury the same clusters in ambient movement. Add to
`personality.ts` alongside the existing dials.

## [DECISION] TABLE WIN CONDITION — elimination tournament

**A table ends when the player holds all the chips.** Every table is a proper
4-handed (5 with a late champion) elimination tournament.

Consequences, all load-bearing:
- **The engine's stack-reset-per-hand must go.** Correct for the sim
  (measures decision quality, not survivorship); wrong for real play.
- Needs a real chip/blind model with escalating blinds, or tables never end.
- **Session length is long** — a 4-handed tournament can run ~45 minutes, which
  is a lot on mobile. This makes save-and-resume mandatory, not optional.

## [DECISION] SAVE AND RESUME MID-TABLE

The player can leave and return to exactly where they were. Non-negotiable on
mobile — people get interrupted, and sessions are long.

**The save must capture mid-hand state**, not just "which table you're on":
stacks, blind level, button position, whose turn it is, current pot and board,
per-character tilt values, respect tier, dialogue lines already used. Build
this schema in **Phase 4**; retrofitting it later is significantly worse.

## [DECISION] MUSIC — per room

Each of the eight rooms gets its own mood. Score was scoped out of the audio
plan (which covered SFX and voice only) and needs adding. After lighting, it is
the cheapest atmosphere per hour in the project.

## [DECISION] ACCESSIBILITY — the log is the fallback, tells stay visual

The game log doubles as the non-visual channel: it is screen-reader-friendly
and carries every action.

**Explicit scope call: tells remain visual-only.** A game built on reading
faces has an inherent barrier for low-vision players, and a full non-visual
tell system is out of scope for a solo $0 project. This is a decision, not an
oversight — recorded so it isn't rediscovered as a surprise.

## Multiplayer — SECONDARY, unscoped

Remains in the design as the avatar payoff and the reason the unlock system
exists, but there is **no netcode plan, no server, no cost estimate**. Not a
beta problem; it is a "how does this ship" problem. Phase 10 at the earliest.

---

## SEQUEL SLOT — reserved material (do not spend in game one)

The title is a **franchise slot**: *Legends Poker: [Campaign]*. Nothing below is
locked, but this material is deliberately kept OUT of the base game.

- **Gods' Challenge** *(leading candidate)* — the pantheons dispute that a
  mortal belongs among legends, so they run their own tour: Olympus, Asgard,
  Egypt, Mesoamerica. The premise is already written into this doc as a
  rejected motive for Death's Invitational. **Reserves: Zeus, Athena, Hermes,
  Hades, Dionysus, Loki, Odin, Thor, Ra, Anubis.** Casting warning: a pantheon
  table is the Tombstone trap at continent scale — needs four different *kinds*
  of god per table, not four gods.
- **Fictional/mythic legends** — Santa, Mother Nature, Jack Frost, the Sandman,
  the Tooth Fairy. Warmer register, and it overlaps heavily with the parked
  holiday-tables material.
- **Legends of the East** — Feudal Japan, Journey to the West, Egypt, Persia.
  Fixes the map's Western-only limitation, needs a collaborator who knows the
  material.
- **Outlaws & Lawmen** — Tombstone recovered (Doc Holliday keeps the
  hidden-champion gimmick), plus riverboat, speakeasy, a train. Smallest scope
  of any of these, so the best *first expansion* rather than a sequel.
- **The Successor's Tour** — the true sequel. You won, you're Death now, and
  you *deal*. You audition your own replacement; the roles invert. Most
  interesting, hardest to make work (needs a reason the player still plays
  hands).

---

## NARRATIVE DELIVERY — foreshadow, never explain

The story is not *told*, it's planted. Death deals every table, so he's
present from hour one in plain sight. The misdirection isn't hiding him — it's
getting the player to file him under *atmosphere* rather than *opponent*.

**The red herring: make the grandest room look like the destination.** The
obvious final boss of a legends tour. If the framing implies the tour climbs
tour climbs toward something and one room is clearly the grandest, the assumption
fills the gap. The finale then surprises without a single lie having been told.

**The mechanism: Death's asides are always TRUE and always sound like flavor.**
He never lies, so nothing feels cheap in retrospect — the player simply didn't
listen. Everything he says about himself is technically about his job.
Example (Athens intro, over a still): the philosophers have decided to settle
what a mortal is worth → *"They asked for the best dealer. I was available."* →
*"They always think this is the last table."* First read: fatalism about
mortals. Second read: he's telling you exactly what he is.

**Ties directly into the respect-arc.** Opponents' contempt IS the
foreshadowing. Dracula calling you *"the dealer's little project"* is an insult
on first read and a plot point on second.

### [DECISION] Inter-opponent banter (not just lines aimed at the player)

Opponents talk to *each other*. This is more alive than everyone addressing the
camera and it sells the "why are these people in a room together" charm the
original had. Cheap: text over existing puppets plus a reaction beat.

Model exchange — Van Helsing asks why Dracula invited an amateur to the big
leagues; Dracula retorts that **even he abides by Death's wishes.** That single
exchange insults the player, establishes that Dracula defers to someone, and
plants the finale — all as table banter.

**Guardrails:**
- **The player never gets an answer.** If anyone explains why Death invited
  you, the mystery is spent. The answer is always a shrug — nobody questions
  the dealer.
- **Ration it: one "the dealer arranged it" per table, maximum.** A plant that
  recurs every hand stops being heard.
- **Write banter for PAIRS WITH A RELATIONSHIP, not generic chatter.** Generic
  "nice hand" goes stale in twenty minutes; Van Helsing needling Dracula
  doesn't, because it only fires when those two are heads-up. Pairing
  self-limits frequency because the trigger is rare.
- **Banter must never leak hand information.** No commenting on strength while
  cards are live.

Dialogue data therefore needs a distinct category: **inter-opponent banter,
triggered by table state.** Different shape from player-directed lines, and far
easier to design in now than to retrofit.

### Cutscenes and intros — what they actually cost

- **Boss entrances need almost no new art.** Room plate + existing puppet +
  camera move + lighting. Dracula walking in is the puppet translating across
  the plate with the room dimming. What sells it is **staging, not animation**:
  light change, sound, other characters reacting, camera push-in. Reactions
  from existing puppets are free.
  - The one real cost: a **standing pose or two**, since puppets are chest-up
    seated. Often dodgeable by keeping the entrance in shadow or shooting from
    behind.
- **Intros are stills with text, not cutscenes.** One painted frame, slow
  push-in, a line or two of Death's narration. The key art we already generate
  (e.g. the Van Helsing character sheets) *is* the cutscene art. Two or three
  stills per table.

---

## TONE — gothic, but funny in the right places

The game is dark and gothic with **deliberate bright spots.** Comic relief is a
feature, not a leak — it's what keeps 18 tables of skulls and candlelight from
becoming monotonous, and it's what made the original charming.

The register: **characters being wry about their own mythology.** Dracula
asking what your blood type is. Death being unimpressed by Hell. The joke comes
from a legend treating their own legend as ordinary — which makes them feel
like *people* rather than costumes.

**Rule: no anachronistic winks.** Jokes come from the character, never from
outside the world. A modern brand name, a meme, or a real-world 2026 reference
punctures the immersion the whole game depends on and ages instantly.
(Explicitly considered and rejected: naming the Station AI after a real present-
day AI assistant. Reads as a product joke, kills the menace, and the AI must
feel older than the player. If the *shape* of that joke is wanted — a machine
with a reverent lineage — an invented predecessor works and is genuinely
unsettling: *"My predecessor spoke well of you."*)

---

## Boss interaction principle

**Every table gets unique voice and staging; only signature tables get
unique mechanics.**

- Cheap + high value: different *dialogue and presentation* per boss
  (Washington formal, Dracula toying, Wyatt Earp terse). This is writing.
- Expensive: different *mechanics* per table. A new system per table is how
  an 18-table game becomes an 80-table workload. Reserve genuine mechanical
  difference for **two or three** signature tables only.

### The "table isn't what it seemed" move — rationed across exactly 3 tables

Used more than ~3 times, it becomes wallpaper. Each of the three does it a
mechanically different way, and they escalate:

- **Transylvania = ARRIVAL.** Dracula watches you beat his household
  (e.g. Igor + a bride — a one-off warm-up sub-fight, justified *only*
  because it's singular and memorable; NOT a template) then sits down.
  The classic "you thought you were halfway done" beat. Crucially timed so
  it is NOT an unearned "surprise heads-up at the end."
- **Space Station = TRANSFORMATION.** No new character arrives; a presence
  already there takes a body (see below).
- **Finale = REVELATION.** The dealer, the one constant all game, sits down
  as Death. The constant was the opponent all along.

Everyone else (Washington, Arthur, Sherlock, Blackbeard) is
honestly at the table from turn one — which is what makes the three special
ones special.

---

## The Station — earlier working notes (SUPERSEDED IN PART by v3 decisions)

> Cast is now Grey/Reptilian/Martian/Robot and the champion is the AI; the
> setting is no longer a bunker. The *reveal mechanics* below still stand.


**Why it's table eight:** it's the only table that faces *forward*. Every
other location is the past. A space station reframes the whole thing as an
"everywhen" tour rather than a history tour, which quietly justifies Death
being everywhere even better.

**The story, told entirely through who's at the table (no cutscene needed):**
a lost astronaut was saved by an alien; they built/settled the ship to live
on; a scavenger was caught and must play for his freedom (he loses at the
start — that's the game's opening hand, the player's arrival).

**The four seats (table is full and honest from turn one):**
1. **Android** — flawless, cold, zero tells. (Its own entity at this point,
   NOT yet the ship.)
2. **Alien** — unreadable; has tells but they're uninterpretable because its
   face isn't human (false-read mechanic).
3. **Lost Astronaut** — warm, human, the one honest read at the table.
4. **Scavenger / a 4th crew member** — rough, greedy, bluffs constantly; the
   rowdy human that breaks the cool sci-fi tone (same job Tombstone does for
   the whole map). (Original captive-scavenger loses on arrival, so the 4th
   fighting seat may be a second crew member — engineer/medic — TBD.)

**The AI is NOT a seat.** It's the room — a voice/presence from turn one,
which costs almost nothing to present (no animation).

**The reveal (TRANSFORMATION beat + a two-for-one on art):**
When the Android is defeated — which the player must do to continue — the
ship's AI takes control of that same body: "Fine. I'll do it myself,"
spawns itself chips, and you now play the *same skin with different
stats/quirks*. You animate the body **once** and get two opponents from it.

- **Why it's better than a new character walking up:** it's creepier. The
  thing you just beat stands back up with someone else driving it — a horror
  beat, same register as Death sitting down.
- **Must sell the hand-off through STAGING or players just read it as "the
  boss got more chips":** lights change, voice drops, posture shifts,
  nameplate rewrites from the Android's name to the ship's name. Stat change
  = mechanics; staging = the *moment*. Need both.
- **They must play differently, not just harder:** Android plays flawless and
  cold; the ship plays flawless *and* starts messing with you (it's personal
  now). A dial change plus maybe a quirk — exactly what the engine is built
  for.

**The rhyme (fell out of solving a practical problem, worth preserving):**
the station's boss is a machine that takes a body to face you; the game's
final boss is Death doing essentially the same thing. The station is a small
rehearsal for the ending.

---

## Why this is buildable by one person

Almost every "different table" need resolves to **new artwork + adjusted
personality dials + new voice/dialogue** — all of which sit in the top
presentation layer and the data-only personality layer. None of it touches
the poker engine (already built) or the shared decision function. The
expensive exceptions are deliberately rationed: the ~3 "table isn't what it
seemed" beats, and the one-off Transylvania warm-up sub-fight.

---

## THE OVERARCHING STORY — Death's Invitational

**Frame:** "Invitational" implies you were *chosen*, which directly feeds the
respect-arc — every opponent wonders why *you* are here.

**Chosen answer: Death is looking for a successor.** He has dealt every game
in history and he is tired. The Invitational is an audition for someone
worthy to take his place. The bosses are legends he already owns; you are the
unknown quantity nobody thinks belongs.

**Why this one won:** it is *load-bearing* rather than decorative. It makes
the ending, the respect-arc, and the multiplayer avatar unlock all the same
event. You win the final hand and Death simply hands you the deck — and Death
becomes playable. The story literally promises the reward the game gives you.

**Alternatives considered and rejected (kept in case of a change of heart):**
- *Wager for your life* — cleanest and oldest, but the most familiar
  (Bergman chess-with-Death). Reliable, not surprising.
- *Settling an argument* — gods claim no mortal earned a place among legends;
  Death runs the tour as the test case. Best justification for the real +
  mythic mix and for the champion tiers as a ranking.
- *A choice at a crossroads* — the whole tour happens in a heartbeat during a
  coma/decision; each table is a life you could have lived. Most emotionally
  resonant, most writing.

---

## CASTING RULE (the most important rule in this document)

**A table is a PLACE, not a PROFESSION.**

The Tombstone problem: Wyatt Earp + Doc Holliday + Ike Clanton are all
gunslingers, so they blur into "generic cowboy." That is not a Tombstone
problem, it is a *casting* problem, and it will bite any table cast that way.

The fix: the four seats should be four people who would plausibly be in that
room **for four different reasons**. Different reasons produce different
temperaments, and different temperaments are exactly what the personality
dials turn into distinct play.

**Specificity comes from archetype-with-a-name, not from an exotic setting.**
Doc Holliday is not a generic cowboy because he is *the consumptive gambler
who plays like he has nothing to lose* — that is a person. "A spy in a
tuxedo" is generic because it is a job title. Give a character a specific
*why* and a temperament and they stop being generic.

**Test for every table:** who are four people who would share this room for
four different reasons, and does each map to a different dial-set? If a table
cannot answer that, cut *that* table.

---

## PRESSURE TEST — HISTORICAL RECORD (the roster it tested is superseded)

> Kept because the *reasoning* is still how we judge any new table. Colonial
> America and Tombstone below were both resolved in v3 (recast → White House,
> and cut → expansion, respectively).


Each table needs (a) four seats cast by temperament, not job title, and
(b) an in-fiction answer for why *you* are playing there.

| Table | Casting | Verdict |
|---|---|---|
| **Olympus** *(CUT — reserved for sequel)* | Zeus (domineering), Hades (cold, patient), Dionysus (reckless), Athena (sharp) | Passed, but spent the sequel's premise |
| **Colonial America** | ⚠ Washington/Franklin/Jefferson/Adams are all *statesmen* — the Tombstone trap. Recast by temperament: Washington (disciplined, tight), Franklin (playful bluffer), Sam Adams (firebrand, reckless), a cold financier/gambler | **On watch** — fixable, but flag it |
| **Tombstone** | Doc Holliday (cold, precise, dying, fearless), Wyatt Earp (disciplined, tight, patient), an outlaw (reckless, dominating bluffer), the saloon owner / card-sharp (the house, pure adaptivity) | **Passes after recast** |
| **Transylvania** | Igor (nervous servant, overbets), the brides (seductive, manipulative, false tells), Dracula as boss | **Passes** |
| **Camelot** | Arthur (noble, disciplined), Lancelot (arrogant, aggressive), Merlin (unreadable), Mordred/a jester (treacherous bluffer) | **Passes** |
| **Baker Street** | ⚠ Hardest table. Do NOT cast detectives. Watson (honest, steady read), Moriarty (cold, aggressive genius), Irene Adler (out-reads even Sherlock, pure deception), Sherlock as boss | **On watch** — needs the most design care |
| **Pirate Tavern** | Blackbeard (intimidating aggressor), sly quartermaster, superstitious reckless deckhand, merchant captain playing for his life | **Passes** |
| **Space Station** | Android, Alien, Lost Astronaut, Scavenger/crew | **Passes** — the model the others should imitate |

**Two tables on watch — Colonial America and Baker Street — for the same
reason: both are built around a single profession.** Salvageable only by
casting for temperament instead of job title.

**Sherlock-specific problem:** he is a reading machine, so he should be nearly
impossible to bluff — which is hard to make *fun*. Proposed gimmick: Sherlock
**tells you your own tell.**

### Story hooks — why are you at each table?

- **Athens** — a symposium argument that got out of hand: can a mortal
  nobody actually be worth anything? You were brought in as the test case.
  *(Replaces the cut Olympus hook: the gods gambling over your fate — which
  now belongs to the sequel.)*
- **Colonial America** — a backroom wager during the founding; you are the
  unknown they let in to see what you are made of. *Pairs perfectly with the
  disrespect-arc if this is an early table.*
- **Tombstone** — TBD (saloon stakes / a debt / buying into the house game).
- **Transylvania** — **Answers "why is Igor playing instead of dealing?":
  Death deals every table, so that seat is taken.** Dracula therefore puts
  his household up as a gauntlet — Igor, then the brides — before he deigns
  to sit. This answers the *why* AND delivers the arrival beat.
- **Camelot** — a test of worth at the Round Table; you are the stranger
  proving you belong.
- **Baker Street** — Moriarty has arranged the game as a duel; you are the
  wildcard.
- **Pirate Tavern** — you are a prisoner or a new recruit playing for a share,
  or for your freedom. (Mirrors the Space Station's captive-scavenger.)
- **Space Station** — already written; see its section.

### Tombstone swap candidates (RESOLVED — Tombstone moved to expansion; Feudal Japan explicitly deferred to a Legends of the East pack)

Kept because the *casting* fix may not be enough. Whatever replaces it must
keep Tombstone's job: a **grounded, rowdy, human** table breaking up the
gothic-and-grand. Nothing mythic or solemn.

- **Feudal Japan** (samurai, ronin, warlord/Musashi as boss) — top pick,
  because it also fixes the map's biggest weakness: *every current table is
  Western.*
- **1920s speakeasy** (Prohibition, gangsters, Capone) — closest match to
  Tombstone's actual feel; cleanest one-for-one swap.
- **Mississippi riverboat** (card sharp boss) — thematically the most *poker*
  table on the map.

---

## THE TELLS MODEL — signal plus noise (supersedes all earlier versions)

**The problem with deterministic tells:** if Dracula raising his eyebrows
*always* means bluff, the player learns it once and the game is over.

**The model:** each character has a *vocabulary* of small animations —
eyebrows, slouching, sipping from the chalice. **Any one of them in isolation
means nothing.** The chalice sip while he is folded is pure noise. Meaning
lives in **combinations that only pay off during a live hand** — e.g.
eyebrows *plus* a chalice sip *while actually in the hand*.

The player's job is not to memorize a gesture. It is to **separate the
meaningful cluster from the ambient fidgeting.**

**Why this is the right model:**
1. It makes reading a *skill* rather than a fact — pattern-matching under
   noise, which is the actual pleasure of reading a player. Stays interesting
   on the hundredth hand.
2. It makes unique animations **load-bearing without being fragile.** No
   single gesture ever carries the signal, so flavorful idles are safe by
   default — noise until the system deliberately pairs them.
3. Characters read *differently* without a new tell-language per table. Same
   underlying grammar ("a cluster of coincident signals during a live hand
   means something"); Dracula's cluster is eyebrows + chalice, Blackbeard's
   is beard-stroke + going still. **Shared grammar, unique vocabulary.**

> **PRINCIPLE: No animation means anything alone. Meaning lives in
> combinations that only pay off during a live hand. Everything else is
> deliberate noise.**

### Animation budget: roughly 70/30

- **~70% shared** — the poker mechanics: sitting, betting, folding, calling.
  One rig, reskinned across the whole roster.
- **~30% unique** — idles and signature mannerisms. Sherlock's pipe,
  Blackbeard's beard-stroke, Dracula's chalice. **This is the single biggest
  bang-for-buck in the entire art budget** — it is what made the original
  Imagine Poker characters feel alive.

Also note (from engine README, still true): tells should be **idle variants,
not triggered one-shots.** A tell that fires on cue cannot be missed; one
woven into how a character sits while thinking has to be learned.

---

## MULTIPLAYER

- You **never see your own avatar** in single-player. In multiplayer you
  **choose** an avatar — e.g. play as Blackbeard.
- **Avatars are unlocked by beating them in the single-player tour.** The
  gauntlet is the unlock engine; the two modes feed each other rather than
  being bolted together.
- **Beating the game unlocks Death as a playable avatar** — which *is* the
  successor storyline's payoff. Story reward and mechanical reward are the
  same event.

### Multiplayer tells rule (important)

In single-player, tells are honest-ish signals the player learns to read —
that is the whole game. In multiplayer, a tell tied to your actual hand is an
**information leak that plays you against yourself**: the animation would be
narrating your cards to your opponent.

Therefore in multiplayer, avatars emote on a **cosmetic loop with zero
correlation to your hand.** Blackbeard scowls and laughs on his own rhythm
regardless of what you hold.

**Decide now so it does not bite later:** the multiplayer cosmetic emotes
should **not** be the same animation set as the single-player tells, or
players will try to read them and feel cheated when they turn out to be
noise. Different loop, ideally different animations, clearly flavor rather
than signal. **Keep the honest tells sacred to single-player.**

The signature idles pay off in *both* modes: in single-player they are the
raw vocabulary the real signals are built from; in multiplayer they are pure
theater.

---

## Open questions / decisions still to make

- Which table opens the tour? (Not Colonial America — needs to be somewhere
  the early *disrespect* stings.)
- **Name the AI.** Cannot be HAL. Needs its own name and single-lens design.
- **Name the Pope** (Borgia / Alexander VI is a placeholder).
- **Davy Jones design** — folklore version only, must not resemble the film.
- **Permadeath at the finale, yes or no?**
- Exactly which combinations form each character's real tell cluster.
- Trademark/app-store check on "Legends Poker".
- Where the Station sits visually (station with Earth outside vs. crashed
  saucer vs. desert facility with sky) — the cast is locked, the room isn't.
- Exact 4th Space Station seat (scavenger vs. second crew member).
- Death's finale playstyle (leaning: unreadable, no tells, flawless).
- Art direction still unresolved from engine phase: flat 2D mesh-deform
  (Live2D/Rive) vs. stylized low-poly 3D. Do ONE character end-to-end as a
  vertical slice before committing.
- Champion-tier exact format.

## Hard reminder to self

This is the *endgame of a game whose beginning doesn't exist yet.* The whole
18-table cathedral rests on ONE table being fun. Build Colonial America (or
whichever opens), 3–4 opponents, Death dealing — and prove the core loop is
fun before building anything above it. If that loop is good, the rest is
repetition of a thing that works. If it isn't, you've saved yourself
seventeen tables of art.
