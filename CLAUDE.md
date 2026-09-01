# CLAUDE.md — Legends Poker: Death's Invitational

Read this before touching anything. It is the short version of the decisions
that are already settled, so we don't re-litigate them every session.

## WHAT THIS IS

A single-player, character-driven Texas Hold'em "world tour". Eight themed
tables of recognizable legends, one recurring dealer (Death), who is revealed
as the final opponent. Spiritual successor to *Imagine Poker* (Candywriter,
2008). Full design rationale lives in `character-poker-design-doc.md` — read
it before proposing anything about roster, story, or tone.

**Context that governs scope:** $0 budget, solo dev, side project, not
expected to make money. Prefer the cheap, boring, working solution. Do not
add infrastructure for problems we don't have yet.

## NON-NEGOTIABLE RULES

1. **`decide()` NEVER branches on character identity.** There is exactly one
   decision function shared by every character. Personality lives entirely in
   data (dials + quirks). If you find yourself writing `if (id === 'dracula')`
   in `decide.ts`, the answer is a new dial or a quirk, not a branch. This is
   what makes 40 characters affordable.

2. **Tells are signal-plus-noise, never deterministic.** No single animation
   means anything on its own. Meaning lives only in *combinations* that pay
   off *during a live hand*. Everything else is deliberate ambient noise. A
   tell the player can learn once and be done with is a bug.

3. **Multiplayer avatar emotes must have ZERO correlation to the player's
   hand.** In single-player, tells are honest signals. In multiplayer, a tell
   tied to your real cards is an information leak that plays you against
   yourself. Cosmetic loop only, and ideally a different animation set so
   players don't try to read noise.

4. **Landscape orientation only.** Locked. Four opponents plus dealer plus
   your seat plus board plus controls does not fit portrait. Do not design,
   lay out, or prototype for portrait.

5. **Public domain only.** Every character must be verifiably out of
   copyright. Modern franchises (Star Wars, Star Trek, Alien, Doctor Who,
   Terminator, HAL 9000) are forbidden. See `ASSETS.md`.

6. **Fast-forward is PRESENTATION ONLY — never simulation.** The hand must
   resolve identically whether or not the player is fast-forwarding: same RNG
   draws, same decisions, same order. Speed scales the *presentation clock*
   (chip tweens, card timing, thinking pauses), never the game loop. Coupling
   these will produce desyncs and non-reproducible hands — this is a bug
   waiting to happen, so keep the two clocks separate from the start.
   - Voice lines are **cut** (not sped up or truncated) while fast-forwarding.
     Half-played speech sounds broken; silence reads as intentional.
   - Auto-cancels at the **showdown reveal** — NOT at pot collection. The
     reveal is where the player learns how an opponent played a hand they
     folded to, and it's the main source of reads on opponents. Also cancels
     when new cards are dealt.
   - Idle animations keep running at normal rate. Characters breathe normally
     while the chips fly.
   - Rationale: folded hands are the only pressure-free time the player has
     to study tells. A control that blanks the table would quietly gut the
     core mechanic. It's a fast-forward, not a skip.

## NOT BUILDING (do not add these back)

No chat, no quick chat, no emote button, no XP/levels/reputation score, no
reward-progress bars, no daily rewards, no energy, no currency, no IAP, no ads,
no leaderboards, no separate tutorial mode. These came from AI-generated
concept mockups importing free-to-play scaffolding from other poker apps.
Progression is **respect** (diegetic, per-table); unlocks come from beating
characters. If a UI element doesn't serve reading opponents, the tour, or the
story, it's noise on an already-busy landscape screen.

## REPO LAYOUT

```
src/
  equity.ts       hand strength: Chen-ish preflop, Monte Carlo postflop
  personality.ts  the dials + quirks + tells; characters as DATA
  decide.ts       THE shared decision function. Read this first.
  game.ts         loop over poker-ts; stats (VPIP/PFR/AF), tilt, events
  sim.ts          `npm run sim [hands]` — the balance/exit test
  play.ts         `npm run play [hands]` — watchable CLI with tells
art-tools/
  split_parts.py  cuts an AI-generated parts sheet into layers + parts.json
  build_puppet.py init/render a layout to preview puppet assembly
  dracula_parts/  41 split Dracula layers (incomplete — see gaps)
MOTION-SPEC.md    the animation parts list, tagged MECH/IDLE/BEAT/TELL
ASSETS.md         every free/CC0 source + licensing traps
```

Stack: Node 22, TypeScript, ESM, run via `tsx`. `poker-ts` v1.5.0 for rules
(exports a **named** `Table`, not default), `pokersolver` v2.1.4 for eval.

## CURRENT STATE

**Working:** the engine. Phases 1 and 2 are complete and pass their exit test
— three distinct play profiles emerge from one shared function. Representative
1000-hand run: Dracula VPIP 33.7 / AF 0.66 (tight trapper), Snowman VPIP 74.5
/ AF 0.24 (calling station), Cleopatra VPIP 62.7 / AF 3.18 (aggressive).

**Not started:** human seat, any UI, dialogue system, Rive integration,
audio, persistence.

## KNOWN GAPS AND SIMPLIFICATIONS

- **No noise-to-signal dial.** Difficulty runs on two axes: skill UP (dials)
  and legibility DOWN (tells). The second axis needs a per-character
  noise-to-signal ratio in `personality.ts`. Doesn't exist yet.
- **No position awareness.** Adding a position term to effective tightness is
  the single highest-value realism improvement available.
- Adaptivity is table-wide, not per-opponent.
- **Stacks reset to the buy-in each hand — this must go.** A table now ends
  when the player holds ALL the chips (elimination tournament), so real play
  needs a chip model with escalating blinds. Deliberate for the sim only.
- **Save/resume must capture MID-HAND state** — stacks, blind level, button,
  whose turn, pot, board, tilt values, respect tier, dialogue already used.
  Build the schema in Phase 4; retrofitting is much worse.
- Monte Carlo equity is ±6% at 60 rollouts.
- `MOTION-SPEC.md` layer 3 (per-character vocabulary) is an empty template.
  No character has an authored tell cluster yet.
- Dracula's parts are incomplete: **no chalice** (his signature prop and half
  his tell cluster), only three mouth shapes (needs a talking set and a
  losing face), one brow pair, and fixed pupils (need separate pupil layers
  for look-direction).

## GOTCHAS THAT COST TIME BEFORE

- Win rates swing wildly under a few thousand hands. **Do not tune dials on
  fewer than several thousand hands** — you will be chasing variance, not
  bugs.
- `poker-ts` exports `Table` as a named export.
- Guard seat occupancy before `standUp` on busted players.
- Track VPIP per-hand, not per-action, or it double-counts.

## NEXT MILESTONE

Phase 3: human seat + plain DOM UI, no 3D, no art.
**Exit test:** the dev voluntarily plays 20 hands and can name each
character's style without reading the code.

## HOUSE STYLE

- Small, readable, boring code. No frameworks we don't need.
- Characters, dialogue, and rosters are **data**, not code.
- If a decision contradicts the design doc, stop and flag it rather than
  silently overriding — the doc records *why*, and the why usually matters.
