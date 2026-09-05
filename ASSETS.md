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

## The world tour chart

The map screen takes a drop-in image at `web/public/chart.png`; without one it
draws a placeholder. See `web/public/README.md` for what the art has to be.

⚠ **AI-generated art is not automatically clear to ship.** The question is not
whether the image depicts anything owned — a chart of the Atlantic does not —
it is what the GENERATOR'S terms say about commercial use of its output, and
those differ by service and by plan. Record the source and the licence here
before any chart art goes into a build:

| File | Source | Licence / terms | Commercial OK? |
|---|---|---|---|
| `web/public/chart.webp` | *(unfilled — AI-generated, generator not recorded)* | | |
