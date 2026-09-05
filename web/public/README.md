# Drop-in chart art

Put the world tour map here as **`chart.png`** (or `.jpg` / `.webp`, and change
`CHART_IMAGE` in `web/Map.tsx` to match). Vite copies this directory verbatim,
so no build step and no import — if the file is missing the map falls back to
the drawn placeholder chart, which is what ships today.

## What the art has to be

- **Framed to the Atlantic and Mediterranean**, not the world. Seven of the
  eight destinations sit between the American east coast and the Black Sea. On
  a full world map they occupy about a tenth of the image, and on a phone that
  leaves a few hundred pixels to hold seven pins and their labels.
- **No route line and no X marks.** Those are game state — they change as the
  player wins — so they are drawn as real buttons over the art. A baked-in set
  fights them.
- **Any ratio.** The chart box takes its shape from the image's own dimensions
  once it loads, so the art is never stretched and the marks never drift. Wide
  landscape suits the screen best -- roughly 2:1 -- but nothing breaks if it
  is not.
- **Compressed.** This is one screen of a $0 mobile game. Aim well under 400KB
  — WebP at quality ~80 usually gets there without a visible difference.

## Leave the top-right corner alone, or tell me

The eighth destination is in orbit, so it is drawn in a cartouche rather than
as a dot on the sea, and the top-right corner is where that goes. If the art
puts a scroll or a title there, the Station needs a different home -- the
clearest options are the top-left over the Arctic, or the empty ocean west of
Africa. It is one line in `MARKS`.

## Re-registering the marks

Open the map with `?calibrate=1`, click where each destination belongs, and the
viewBox coordinates appear bottom-left and are copied to the clipboard. Paste
them into `MARKS` in `web/Map.tsx`. Eight clicks.

## Before it ships

`ASSETS.md` governs anything in the build. Record where the file came from and
whether its licence permits commercial use — including for AI-generated art,
where the generator's terms are the thing that matters.
