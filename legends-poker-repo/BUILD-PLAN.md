# BUILD PLAN — Legends Poker: Death's Invitational

The programmatic counterpart to `character-poker-design-doc.md`. That document
says *what* the game is and why. This one says *how it gets built*, in order,
with exit tests, so work can be handed to Claude Code session by session
without re-deciding anything.

---

## 0. CORE CONCEPT (one paragraph)

A single-player, character-driven Texas Hold'em world tour. Eight themed tables
of public-domain legends, each with a champion. Death deals every table and is
revealed at the end as the final opponent, auditioning a successor. The hook is
**reading people, not cards**: every opponent plays differently and leaks
information through animation, and beating them unlocks them as playable
multiplayer avatars. Landscape only. $0 budget, solo developer.

---

## 1. ARCHITECTURE — one codebase, three stores

**Decision: TypeScript + React + Vite for the app, Capacitor for native
packaging, Rive for characters.**

```
Shared TypeScript core (already written)
        |
   React + Vite UI  ── Rive web runtime ── Howler audio
        |
   ┌────┴────────────────┐
   │                     │
  Web build          Capacitor
  (static host)    ┌──────┴──────┐
                  iOS           Android
                (WKWebView)   (WebView)
```

**Why this and not the alternatives:**

- **The engine already exists in TypeScript.** 867 lines of tested poker and
  personality logic. Unity or Godot means throwing that away and rewriting the
  hardest, most-validated part of the project. Non-starter.
- **React Native** would force `react-native-web` for the browser target, and
  canvas-heavy Rive rendering through that abstraction is a fight. Capacitor
  ships the *actual* web app, so web is the native case rather than an
  afterthought.
- **Capacitor is a WebView**, which is fine here — this is a card game with
  five animated 2D puppets, not a 3D shooter. Rive renders GPU-accelerated to
  canvas. The frame budget is not the risk.

**Known WebView gotchas to plan for, not discover:**
- iOS requires a user gesture before audio can play. Unlock the audio context
  on the first tap (the "Start" button) or the whole soundtrack silently fails
  on iPhone.
- Use an audio library (Howler) rather than raw `<audio>` elements; sprite
  sheets avoid dozens of simultaneous file handles.
- Safe-area insets matter in landscape — controls must not sit under the
  notch or the home indicator.
- Test on a real device early. The simulator lies about audio and performance.

**Cost reality check ($0 budget claim):** shipping to stores is not free.
Apple charges **$99/year** for a developer account and requires a Mac with
Xcode. Google Play is a **$25 one-time** fee. Web is genuinely free. If the
budget is truly zero, **ship web first** — it also removes review latency from
the iteration loop.

---

## 2. THE AI CHARACTERS — behavioural system

Two separate things share the word "AI": how opponents *decide*, and how their
art gets *generated*. This section is decisions; art is §5.

### 2.1 The rule that makes 32 characters affordable

**`decide()` never branches on character identity.** One shared decision
function. Personality is entirely data. If a character needs behaviour that
can't be expressed in the dials, the answer is a new *dial* or a *quirk*, never
`if (id === 'dracula')`. This is what makes adding character #33 nearly free.

### 2.2 The dials (already implemented in `personality.ts`)

| Dial | Range | Effect |
|---|---|---|
| `aggression` | 0–1 | bet/raise vs. call preference at equal equity |
| `tightness` | 0–1 | equity threshold required to enter a pot |
| `bluffFrequency` | 0–1 | rate of betting without equity |
| `tiltSensitivity` | 0–1 | how much a loss shifts behaviour, decays 15%/hand |
| `adaptivity` | 0–1 | responsiveness to observed table stats |

**Quirks** are small named conditions layered on top (e.g. "always calls bets
under 2bb"). This is where identity-specific behaviour lives.

**Tells** are the animation vocabulary and cluster definitions (see §5.4).

### 2.3 Authoring a new character (the loop)

1. Write the dials as a guess from the design doc's temperament description.
2. Run `npm run sim 5000` with the character seated against known profiles.
3. Read VPIP / PFR / AF against the target archetype:
   - Tight-passive "rock": VPIP 15–25, AF < 1
   - Loose-passive "calling station": VPIP 60–80, AF < 0.5
   - Loose-aggressive: VPIP 50–70, AF > 2.5
   - Tight-aggressive: VPIP 20–30, AF > 2
4. Adjust dials, repeat. **Never tune on fewer than several thousand hands** —
   win rates swing wildly below that and you will be chasing variance.
5. Sanity check: does the sim's description match what the design doc says the
   character is *like*? If Cerberus is meant to be pure reaction and the sim
   shows a disciplined nit, the dials are wrong.

### 2.4 Known engine gaps to close (in priority order)

1. **Position awareness** — add a position term to effective tightness. Highest-
   value realism improvement available, and currently absent.
2. **Per-opponent adaptivity** — today adaptivity is table-wide.
3. **Stack persistence + tournament model** — stacks currently reset to buy-in
   each hand. A table now ends when the player holds ALL the chips, so real
   play needs escalating blinds and elimination. **Blocks Phase 3.**
4. **Noise-to-signal ratio** — the second difficulty axis. Skill goes up via
   the dials; legibility goes DOWN via the tells. Later opponents are quieter,
   not just better. Death having no tells is the endpoint of this curve rather
   than a special case. Needs a new per-character dial.

---

## 2B. NOT BUILDING — explicit cut list

The concept mockups were AI-generated and imported a lot of free-to-play
scaffolding from other poker apps. None of it is wanted. Recorded here so it
does not creep back in as "obviously we need X."

| Cut | Why |
|---|---|
| **Chat / quick chat** | Not wanted in any mode. Nothing about this game needs player text. |
| **Emotes button** | Multiplayer avatars run a cosmetic loop with zero correlation to your hand; a manual emote button invites players to try to signal, which is the thing the design explicitly prevents. |
| **Reputation score / XP / "Level 12"** | Replaced by respect, which is diegetic and per-table. A number on top of the game does nothing for a player whose goal is beating people. |
| **"Next reward: card back" progress bar** | Free-to-play drip mechanics. Unlocks come from beating characters. |
| **Daily rewards, energy, currency, IAP, ads** | Not that kind of game. |
| **Leaderboards** | Nothing to rank; the game is single-player-first. |
| **Tutorial mode** | The White House is the tutorial. Difficulty and dialogue carry it. |

**Rule: if a UI element does not serve reading opponents, the tour, or the
story, it is noise on a screen that is already busy** (four opponents + dealer
+ board + pot + controls, in landscape).

---

## 3. BUILD PHASES

### Ordering principle — core-out, then risk-first

Two schools exist: build the home screen and work inward, or build the core
loop and build outward. **This plan is core-out**, with one deliberate
interruption.

**Why core-out:** the game's entire value is whether one table is fun. Menus
wrapped around a loop that isn't fun are wasted work, and every screen built
before the table exists gets rebuilt once the table teaches you what it needs.
The original discipline stands: *the whole 18-table concept rests on ONE table
being fun.*

**The interruption (Phase 4) and why it's worth breaking the pattern:** the
platform shell and navigation skeleton go in *before* the expensive art and
systems work. Not to build screens — to prove the app runs on a real device,
that audio unlocks, that routing and persistence exist. Retrofitting navigation
and a save schema into a single-view app is significantly worse than stubbing
them early. So: **screen shell early, screen content late.**

**Then risk-first:** Phase 5 (rig one character) comes before Phase 6
(presentation) even though presentation is more visible, because rigging is
~90 hours of an untested skill and it is the single largest risk in the
project. The riskiest unknown gets tested as early as it can be tested, at the
cost of one character rather than thirty-two.

**Sequence in one line:** playable core → thin platform spine → prove the
hardest skill → make it feel good → make it mean something → one complete
table → scale content → ship.

Phases 1–2 are **complete**: the engine works and passes its exit test (three
distinct profiles from one shared function).

### Phase 3 — Human seat + throwaway UI · *no art, no Rive*
Make it playable at all.
- Human player seat: input-driven turns, await plumbing in the game loop
- Plain DOM table: opponent names, stacks, board, pot, your cards
- Action buttons + bet slider, validated against legal actions
- Landscape layout skeleton (respect the orientation lock now, not later)
- **Replace stack-reset with a real tournament model**: escalating blinds,
  elimination, table ends when the player holds all the chips

**Exit test:** the developer voluntarily plays 20 hands and can name each
character's style without reading the code.

### Phase 4 — Platform shell · *do this EARLY, not at the end*
- Vite + React project structure; engine imported as a module
- Capacitor init, iOS + Android projects generated
- Build and run on a **real phone**
- Audio context unlock on first tap
- Safe-area handling in landscape

**Exit test:** Phase 3's ugly DOM game runs on a physical device in landscape,
with one test sound playing on a button press.

*Rationale: discovering a WebView problem in month six is the expensive
version. Discovering it now costs an afternoon.*

### Phase 5 — Vertical slice: ONE character · *the real risk gate*
Dracula only. Everyone else stays a name in a box.
- Complete Dracula's parts (chalice, talking mouth set, brow variants,
  separate pupil layers — see §5.3)
- Rig in Rive: blink, breathe, idle, chalice sip, card peek, bet, fold
- Define and implement the **state machine input contract** (§4)
- Wire engine state → Rive inputs

**Exit test:** Dracula sits at the table and reacts to real game events. The
developer can watch him for two minutes without it feeling dead.

**This is the gate for the whole project.** Rigging + animation is ~90 hours of
a skill not yet tested. If Phase 5 is miserable, that is worth knowing at the
cost of one character rather than thirty-two.

### Phase 6 — Table presentation
- Chip particle stream (spline path, emitter, density scaled to bet size)
- Card deal / flip timing, flop as a distinct three-card beat
- Sound layer with randomised variants and pitch jitter (§6)
- Fast-forward: presentation clock only, cuts voice, auto-cancels at showdown
- Pot with visible physical weight

**Exit test:** a hand plays out with no dialogue and still feels good.

### Phase 7 — Dialogue, tells, respect
- Dialogue system reading the JSON schema (§7), with ID → optional voice lookup
- Inter-opponent banter triggered by table state
- Tell clusters: ambient idle scheduler + live-hand cluster logic
- Per-table respect tiers and the earned-name escalation
- Save/persistence

**Exit test:** a full Transylvania table start to finish, with banter,
foreshadowing, and Dracula's entrance.

### Phase 8 — BETA · one table, complete
Transylvania fully playable and polished. Six puppets (four seats + Dracula +
Death). This is the beta scope from the workload breakdown: **~145h code,
~195h non-code.**

### Phase 9 — Content scale-out
Remaining seven tables. Mostly art, dialogue and dial-tuning — very little new
code if Phases 5–7 were built as data-driven systems. **If Phase 9 requires new
code per table, something was built wrong.**

### Phase 10 — Ship
- Champion gauntlets, Death finale, multiplayer avatars
- Store assets, privacy policy, age rating
- Web first (free), then stores if the money makes sense

---

## 3B. SCREEN INVENTORY

The game is not one view. These are all the screens, what they own, and when
they land. Most are cheap code but need a frame/art pass, and several are the
*only* surface where a designed system becomes visible to the player.

| # | Screen | Owns | Phase |
|---|---|---|---|
| 1 | **Boot / splash** | Asset preload; **the audio-unlock tap gesture** (iOS silently fails without it) | 4 |
| 2 | **Title / home** | Continue, New Tour, Multiplayer, Journal, Settings | 4 (stub) → 6 |
| 3 | **World Tour map** | The progression spine. 8 destinations, locked/unlocked/beaten state, current position, replay entry to beaten tables, holiday-event slot | 7 |
| 4 | **Table intro** | Still + slow push-in + Death's narration. The foreshadowing delivery surface | 7 |
| 5 | **The table** | The game itself | 3 → 6 |
| 6 | **Hand history / log** | Reviewing what just happened; supports learning to read opponents | 6 |
| 7 | **Journal** | Death's ledger. Characters defeated, **per-table respect tier**, earned names, story fragments collected. Odysseus greyed out if skipped | 7 |
| 8 | **Collection** | Unlocked avatars, card backs, chip sets, table ornaments | 9 |
| 9 | **Post-table results** | Win/loss summary, unlock celebration, respect-tier change, next destination | 7 |
| 10 | **Settings** | Audio/music/SFX levels, haptics, text speed, fast-forward behaviour, accessibility | 4 (stub) → 6 |
| 11 | **Multiplayer lobby + avatar select** | Choosing an unlocked legend to play as | 10 |
| 12 | **Achievements** | In-world framing only — part of the Journal, not a trophy cabinet | 9 |

### Notes that affect the build

- **The map is the game's spine, not decoration.** It carries unlock state,
  replay entry, the holiday-event slot, and the sense of a *tour*. It is also a
  real art asset — eight illustrated destinations plus locked/unlocked states.
- **The Journal is where three designed systems become visible**: the respect
  tier (otherwise a tone shift the player may not notice), the earned-name
  escalation, and the avatar-unlock tracker. Without it, the Odysseus skip
  reads as a bug rather than a choice. Design-doc rule: framed in-world as
  Death's record, never as a trophy cabinet.
- **Rejected from the concept mockups:** XP/levels ("Level 12"), a chat panel.
  Levels are replaced by respect; chat is not wanted.
- **Screen shell early, content late.** Stand up navigation and a stubbed
  title/settings in Phase 4 so routing, back-navigation and persistence are
  solved before there is anything pretty to lose. Filling them in is cheap;
  retrofitting navigation into a single-view app is not.
- **State that must persist — including MID-HAND.** Tables are elimination
  tournaments that can run ~45 minutes, so save-and-resume is mandatory on
  mobile, not a nicety. The schema must capture: tour position, per-table
  respect tier, characters defeated, unlocks, settings, AND mid-table state —
  stacks, blind level, button position, whose turn, pot, board, per-character
  tilt values, dialogue lines already used. Establish this in Phase 4;
  retrofitting it is significantly worse than over-specifying it early.
- **Accessibility:** the game log is the screen-reader-friendly non-visual
  channel for actions. **Tells remain visual-only** — an explicit scope call
  for a solo $0 project, recorded so it isn't rediscovered as a surprise.

---

## 4. THE STATE MACHINE INPUT CONTRACT · *define before art or code*

This is the single most important interface in the project, because it lets
rigging and programming proceed **in parallel** instead of blocking each other.
Agree it once; both sides build to it.

Every character's Rive state machine exposes the same inputs:

```ts
interface CharacterInputs {
  // continuous
  mood:        number;  // 0-1  losing → winning
  tilt:        number;  // 0-1  from the engine's tilt system
  attention:   number;  // 0-1  how much they're watching the player

  // booleans
  isInHand:    boolean; // gates whether tell clusters can fire
  isThinking:  boolean;
  isTurn:      boolean;

  // triggers (one-shot)
  fireBet: void; fireFold: void; fireCall: void; fireCheck: void;
  fireWin: void; fireLose: void; fireReact: void;

  // tell system
  tellA: void; tellB: void; tellC: void;  // the character's vocabulary
}
```

**Rules:**
- Character-specific meaning is mapped *inside* the Rive file, never in code.
  `tellA` is Dracula's eyebrow raise and Van Helsing's brim tilt; the game just
  fires `tellA`.
- This mirrors the `decide()` rule: shared interface, per-character data.
- Adding a character means producing a `.riv` conforming to this contract. No
  code changes.

---

## 5. ART PIPELINE

### 5.1 When art is actually needed

| Phase | Art required |
|---|---|
| 3 | None |
| 4 | None |
| 5 | One character (Dracula), complete |
| 6 | Table plate, chips, cards, UI frame |
| 7 | None new |
| 8 | Five more Transylvania puppets + room plate |
| 9 | 26 remaining characters + 7 room plates + key art |

Art is **not** on the critical path until Phase 5. Do not generate 32
characters before the rig is proven.

### 5.2 Generation workflow (ChatGPT / image generators)

1. **Lock the style first.** Current sheets do not match each other — the
   Dracula pieces are flat and bold-lined; the AI and Van Helsing sheets are
   rendered and painterly. Pick one lane and write it into a reusable prompt
   preamble. *The flat, bold-lined style is the correct choice*: it reads at
   phone size, survives mesh deformation, and is reproducible 32 times.
2. **One fixed prompt template**, reused verbatim per character, varying only
   the character description. Framing must be identical — chest-up, same head
   height, same eyeline, same camera angle — or they won't sit at one table.
3. Generate **parts sheets**, not composed scenes. A beautiful assembled
   character is a style reference and a useless production asset.
4. Generate on a **flat white or transparent background**.
5. Keep rejected generations **out of the repo** (see §8).

### 5.3 Required parts list (per character)

From `MOTION-SPEC.md`, plus what the Dracula pass revealed was missing:

- Head base (no face), hair as separate layer
- Brows: neutral + raised + angry (Dracula currently has one pair)
- Eyes: whites, **separate pupil layers** for look-direction, lids upper/lower
- Mouths: neutral, talking set (3–4 shapes), smile, grimace/loss
- Torso, upper arms ×2, forearms ×2
- Hands: rest, card-hold, chip-push, gesture, fist
- **The signature prop** — one per character, and it must be the tell surface
  (Dracula's chalice, currently missing entirely)

### 5.4 Splitting and rigging

```bash
python3 art-tools/split_parts.py sheets/*.png -o parts
python3 art-tools/build_puppet.py init parts/ -o layout.json
# edit x/y/scale/rot/z, then:
python3 art-tools/build_puppet.py render layout.json -o preview.png
```

The splitter removes background without eating interior whites (cuffs, cravat,
eye-whites, fangs) by flood-filling only from the canvas border. `parts.json`
records exact source positions. **Alignment is authored, not automated** — the
layout numbers you settle on become the rig's rest pose in Rive.

Then: import parts into Rive → parent hand → forearm → upper arm → torso →
build the state machine to the §4 contract → export `.riv`.

### 5.5 Size budget

Ship at **1024px, compressed** (WebP or platform texture formats), not 2048px
PNG — roughly a 10× saving. Pack each character's layers into a texture atlas.
Target: 80–150 MB for the full roster plus backgrounds. Author at 2048 for
headroom; never ship it.

---

## 6. AUDIO PIPELINE

### 6.1 Sources (all free — see `ASSETS.md` for the full list and traps)

- **Kenney.nl** — CC0, no exceptions. Casino pack: 54 card/dice/chip effects.
- **OpenGameArt** — CC0 filter. Playing-card assets include vector sources.
- **BigSoundBank** — CC0 poker chip recordings.
- **Pixabay** — royalty-free, no attribution.
- ⚠ **Freesound is a mix** — CC0 / CC BY / **CC BY-NC**. NC forbids commercial
  use. Filter hard and check every file.
- ⚠ **Zapsplat free tier requires attribution.**
- **Record your own** for chips and cards. A real stack of clay chips and a
  phone mic beats most downloads and you own it outright.

### 6.2 What's needed (~60–70 files, mostly variants)

- Chips: single land, small stack, large pour, riffle, rake, all-in shove —
  **4–5 randomised variants each with pitch jitter**, or repetition becomes
  maddening within ten minutes. This is where cheap audio gives itself away.
- Cards: deal flick ×5, peek, flop reveal, single flip, muck, shuffle
- UI: button, slider tick, your-turn, timer warning, win/lose stings
- Room ambience per table: one loop plus a few one-shots (Castle Dracula: fire
  crackle, storm, thunder). Cheapest immersion in the project.
- **Music: one track per room, eight moods.** Previously scoped out; it's in.
  After lighting, the cheapest atmosphere per hour available.

### 6.3 Voice

**Hybrid: AI-generated voice for the 8 champions + Death; wordless
vocalizations for the 24 supporting seats.** Cuts generation load ~75% while
keeping voice where players actually remember it. Cerberus needs no voice at
all by design.

- AI voice generation runs roughly **$20–50/month** — the only recurring cost
  in the project.
- ⚠ **Verify two things before committing:** that the licence permits
  commercial use in a shipped product, and that the voices are synthetic or
  properly licensed rather than cloned from real actors.
- **Architecture:** dialogue lives in data with an ID per line; voice is a
  separate lookup keyed on that ID. Text ships first, audio drops in later
  without touching code.

---

## 7. DATA SCHEMAS

Everything content-shaped is data, never code.

```
data/
  characters/     one file per character: dials, quirks, tell clusters, riv path
  tables/         seats, champion, entrance trigger, room plate, ambience
  dialogue/       one file per table (see dialogue/table-01-white-house.json)
  audio/          id → file mapping, including voice lookup
```

The dialogue schema is already established and working — see
`dialogue/table-01-white-house.json`. It carries: table intro, the single
rationed dealer plant, banter organised by *relationship pair*, player-directed
lines by respect tier, Death's asides, champion heads-up, and champion defeat.
Foreshadowing lines carry a `foreshadow` field explaining the double meaning so
the intent survives.

---

## 8. REPO AND VERSION CONTROL

```
/                 CLAUDE.md, BUILD-PLAN.md, design doc
src/              engine (existing) + app
data/             characters, tables, dialogue, audio maps
art/sheets/       SOURCE parts sheets only (committed)
art/parts/        GITIGNORED — regenerable via split_parts.py
art-tools/        split_parts.py, build_puppet.py
rive/             .riv files
public/audio/     shipped audio
ios/ android/     Capacitor-generated
```

**Git rules that matter:**
- **Do not commit derived files.** Split parts and contact sheets regenerate
  from sheets. This alone roughly halves the repo.
- **Do not commit rejected generations.** Only the chosen sheet.
- **Commit at ship resolution**, not author resolution.
- 32 characters at ~25 MB each would blow past GitHub's free 1 GB LFS quota
  around character fifteen, and LFS bandwidth is a *separate* 1 GB/month that
  a single fresh clone can consume entirely. **Cleanest option for a solo dev:
  git for code and docs, cloud drive for art.**

---

## 9. WORKING WITH CLAUDE CODE

- `CLAUDE.md` is read automatically every session. It carries the
  non-negotiable rules, the repo layout, current state, known gaps, and the
  gotchas that already cost time once. **Keep it updated as state changes** —
  a stale CLAUDE.md is worse than none.
- **One phase per session, one exit test.** Phases are scoped so a session can
  finish something testable.
- **Point at the design doc for any "why" question.** It records reasoning, not
  just decisions, specifically so settled arguments stay settled.
- If a request contradicts the design doc, **stop and flag it** rather than
  silently overriding.
- Ask for the *exit test* to be run, not just the code to be written.

---

## 10. RISK REGISTER

| Risk | Severity | Mitigation |
|---|---|---|
| Rigging/animation skill untested (~90h) | **Highest** | Phase 5 gate: one character before thirty-two |
| Art style not locked; sheets don't match | High | Lock before Phase 5; flat bold-lined is the answer |
| Scope: 32 characters, 8 tables, solo, side project | High | Beta is ONE table. Ship web first |
| WebView audio/perf surprises | Medium | Phase 4 puts it on a real device early |
| AI voice licensing (commercial use, cloned voices) | Medium | Verify before generating anything |
| Repo size / LFS quota | Medium | Art in cloud drive, not git |
| Store fees vs. "$0 budget" | Low | Web first; $99/yr + $25 only if it earns it |
| Copyright (Davy Jones, HAL, Green Knight staging) | Low | Flagged in the design doc; verify per character |
