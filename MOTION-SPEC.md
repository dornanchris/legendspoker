# MOTION & ANIMATION SPEC — Character Poker

Purpose: the bridge between design and production. This is what we actually
prompt (for AI art / reference) and animate. Maps directly onto the ~70/30
animation budget: the universal + reskinned-emotional layers are the ~70%
(shared rig), the per-character vocabulary is the ~30% that makes them alive.

## HOW EVERY MOTION IS TAGGED
Because of the tells model (NO single motion means anything alone; meaning
lives only in COMBINATIONS during a live hand), every listed motion carries
a tag so we never lose track of what's load-bearing:

- **[MECH]**  — generic poker mechanic (bet, fold, etc.). Functional.
- **[IDLE]**  — ambient life / pure NOISE. Fires anytime, means nothing alone.
- **[BEAT]**  — an emotional state performed in-character (thinking, nervous...).
- **[TELL]**  — part of THIS character's real tell cluster. Only meaningful
                when combined with the character's other [TELL]s DURING a live
                hand. Deliberately camouflaged among [IDLE]s.

Rule: [TELL] motions must look like [IDLE] motions in isolation. The skill is
separating the coincident [TELL] cluster from ambient [IDLE] noise.

---

# LAYER 1 — UNIVERSAL SHARED SET
Every character has all of these. One rig, reskinned per character. This is
the backbone of the ~70%.

## 1a. Life / ambient  [IDLE]
- Blink (varied cadence)
- Breathe (subtle chest/shoulder rise)
- Idle weight-shift / small posture settle
- Look around the table / glance at other players
- Glance at the pot
- Glance at own hole cards
- Neutral resting face (the baseline everything departs from)

## 1b. Poker mechanics  [MECH]
- Peek at hole cards (the deal)
- Check (table tap)
- Call (push chips forward)
- Bet / Raise (push a stack forward)
- All-in (shove entire stack)
- Fold / muck (slide cards away)
- Stack/riffle own chips (fidget-with-chips — note: can double as [IDLE])
- Collect the pot (rake winnings in)
- Show cards at showdown

## 1c. Universal reactions  [BEAT]
- React to WINNING a pot
- React to LOSING a pot
- React to a big bet from someone else
- React to a bad beat (lost a strong hand)
- Sit-down / arrival (entrance beat)
- Bust-out / leave (elimination beat)

---

# LAYER 2 — SHARED EMOTIONAL BEATS (reskinned per character)  [BEAT]
Same SLOTS for everyone; each character performs them in their own voice.
These are the "acting" states the AI-generated look and the rig must support.

- Thinking / deliberating (the pre-action moment)
- Confident (likes their hand)
- Nervous / uneasy
- Bluffing-face (what they do while lying — may be a poker-face OR a leak)
- Tilted / frustrated (after a loss; ties to the engine's tilt system)
- Amused / taunting (trash talk, reacting to the player)
- Respect beat (the arc: acknowledging the player as a real threat late-game)

NOTE: "Bluffing-face" and the honest [BEAT]s are where a character's [TELL]
cluster gets authored — see Layer 3 per character.

---

# LAYER 3 — PER-CHARACTER UNIQUE VOCABULARY  [IDLE]/[TELL]
The ~30%. For each character: signature idle props/mannerisms, PLUS the 2-3
that secretly combine into their real tell cluster (tagged [TELL]), plus which
live-hand condition makes the cluster meaningful.

Template per character:
- Signature props/idles: ...
- Tell cluster (the real signal): ... [TELL] + [TELL] (+ [TELL])
- Meaningful when: <live-hand condition, e.g. "only while in the hand pre-flop">
- Decoy idles (noise that resembles the tell): ...

### Dracula  (Castle Dracula boss) — TO BE FILLED (has chalice + eyebrows)
### [remaining characters TBD, one at a time]
