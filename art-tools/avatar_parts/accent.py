"""Recolour the Stranger's accent (scarf and hat band) by hue alone.

The accent is drawn teal, hue 175-202 degrees: clear of the blue rim light
(210+) and the green felt (80-150), so a hue mask finds it without a
hand-made one. Each accent keeps the drawing's own light and shadow: the hue
is replaced, saturation and value are scaled.

    python3 art-tools/avatar_parts/accent.py IN OUT [name ...]
"""
import colorsys
import sys

from PIL import Image

LO, HI = 175, 202
# name: (hue degrees, saturation scale, value scale)
ACCENTS = {
    'teal': None,
    'crimson': (352, 1.0, 1.05),
    'gold': (44, 1.0, 1.35),
    'violet': (275, 0.9, 1.15),
    'ivory': (40, 0.15, 1.9),
    'emerald': (145, 1.0, 1.05),
}


def recolour(im: Image.Image, accent: str) -> Image.Image:
    spec = ACCENTS[accent]
    if spec is None:
        return im.copy()
    hue, ks, kv = spec
    out = im.convert('RGBA').copy()
    px = out.load()
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if a and s > 0.25 and v > 0.06 and LO <= h * 360 <= HI:
                r2, g2, b2 = colorsys.hsv_to_rgb(hue / 360, min(1, s * ks), min(1, v * kv))
                px[x, y] = (round(r2 * 255), round(g2 * 255), round(b2 * 255), a)
    return out


if __name__ == '__main__':
    src, dst, *names = sys.argv[1:]
    im = Image.open(src).convert('RGBA')
    names = names or list(ACCENTS)
    tiles = [recolour(im, n) for n in names]
    strip = Image.new('RGBA', (im.width * len(tiles), im.height), (255, 255, 255, 255))
    for i, t in enumerate(tiles):
        strip.paste(t, (i * im.width, 0))
    strip.save(dst)
