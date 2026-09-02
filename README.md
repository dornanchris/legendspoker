# Character Poker — Phase 1 + 2

Headless Texas Hold'em engine plus the personality layer, per the project
plan. No graphics, deliberately. This exists to answer one question:

> **Do three characters built from the same decision function, differing only
> in their dials, actually feel like different players?**

If the answer is no, no amount of art fixes it. If yes, everything else is
expansion at linear cost.

## Run it

```bash
npm install
npm run sim          # 2000 hands bot-vs-bot, prints the stats table
npm run sim 10000    # more hands, tighter numbers (~3 min)
npm run play         # watch 3 hands with tells and reasoning
npm run play 10
```

## What you should see

```
Character                VPIP    PFR     AF   Fold%    bb/100
-------------------------------------------------------------
Dracula                  33.7   10.0   0.66    52.7     87.26
Abominable Snowman       74.5    3.3   0.24    10.1    -66.00
Cleopatra                62.7   39.1   3.18    28.1    -21.26
```

Three genuinely different profiles: a tight passive trapper, a loose
calling station, an aggressive raiser. **Read the spread, not the absolute
numbers.** Profits sum to ~zero, which is also your check that the pot
accounting is correct.

## Layout

```
src/
  equity.ts       hand strength — Chen-ish heuristic preflop,
                  Monte Carlo postflop. Cached per street.
  personality.ts  the dials + the three characters. Data only.
  decide.ts       ONE decision function shared by everyone,
                  plus tell emission.
  game.ts         loop wrapping poker-ts; stats, tilt, events.
  sim.ts          the Phase 2 exit test.
  play.ts         watchable CLI.
```

**The rule that keeps this portable:** nothing in `decide.ts` or
`personality.ts` branches on character identity. If you find yourself
writing `if (personality.id === 'dracula')`, that logic belongs in a quirk.
This is also why the personality layer survives a change of mind about 2D
vs 3D — it has no rendering dependency at all.

## Dials

| Dial | Effect |
|---|---|
| `aggression` | bet/raise frequency when ahead |
| `tightness` | equity margin required to enter a pot |
| `bluffFrequency` | how often they fire with nothing |
| `tiltSensitivity` | degradation after a big loss, decays 15%/hand |
| `adaptivity` | how much they exploit an opponent who folds too much |
| `quirks` | 1-2 signature rules that break the pattern |

**Quirks matter more than they look.** Dials alone converge on same-y bots.
The current three:

- Dracula — *trap*: flats monsters before the river instead of raising
- Snowman — *never folds small*: calls any bet up to 2bb, always
- Cleopatra — *punish passivity*: attacks opponents who fold too often

## Tells

Derived from the same state that drove the decision, never authored
separately. Each has a `reliability` below 1.0, so some fire honestly and
some mislead — which is what makes them learnable rather than a readout.

In the real build these should be **idle variants**, not triggered
one-shots. A tell that fires on cue can't be missed; one woven into how a
character sits while thinking has to be learned.

## Tuning loop

1. `npm run sim 5000`
2. Look for: anyone at an extreme bb/100, anyone whose VPIP/AF collapses
   toward the others, quirks that never trigger
3. Adjust the numbers in `personality.ts` only
4. Repeat

The first pass here found the Snowman at −307 bb/100 — losing three
buy-ins per 100 hands, a caricature rather than a character. Raising his
`tightness` from 0.18 to 0.38 and tightening the quirk threshold from 3bb
to 2bb brought him to a realistic −66.

## Known simplifications

- Stacks reset to the buy-in every hand, so this measures decision quality
  rather than tournament survivorship. Clean comparable win rates; no ICM.
- Monte Carlo at 60 rollouts has roughly ±6% error. Fine for a bot
  decision, and it's the difference between 50 hands/sec and 15.
- `adaptivity` currently models the table as a whole rather than tracking
  each opponent individually. Per-opponent modelling is the obvious next
  step and is where Cleopatra gets genuinely interesting.
- No position awareness. Real players open far wider on the button. Adding
  a position term to `tightness` is probably the single highest-value
  improvement to realism.

## Playing it

```bash
npm run web          # Vite dev server at localhost:5173 (and on the LAN)
npm run build:web    # production build into dist/
npm run android:sync # build, then copy into the Capacitor Android project
npm run android:open # open android/ in Android Studio
```

You are seat 0 against the three characters, in an elimination tournament:
stacks persist, blinds climb every 25 hands, and the table ends when someone
holds all 8000 chips. Landscape only.

The dev server listens on the LAN, so a phone on the same network can open it
by IP — the cheapest way to see the game on a real device before there is an
APK, and the only way to try it on an **iPhone**: a native iOS build needs a
Mac with Xcode plus $99/yr, but Safari over Wi-Fi runs the same code and
covers landscape, the safe-area insets, touch targets and the audio unlock.

(If the sound does not play on an iPhone, check the ring/silent switch. iOS
mutes Web Audio when it is on.)

Query parameters, all for testing:

| | |
|---|---|
| `?pace=0.2` | speeds the presentation up. It scales the display clock and nothing else, so the hand resolves exactly the same either way. |
| `?seed=123` | a specific deal. Every game is seeded whether you ask or not; this pins it. |
| `?new` | ignore any save and start a fresh table. |

**Save** writes the game to localStorage, mid-hand included — reload and it
picks up at exactly the decision you were looking at. `npm run check:save` is
the proof: save mid-hand, restore, play the table out, and every event has to
match the run that was never interrupted.

## Next

The exit test for this phase is subjective and yours to run: play twenty
hands voluntarily and see whether you can name each character's style without
reading the code. Then Phase 4, the platform shell.
