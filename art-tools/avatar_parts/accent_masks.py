"""The Stranger's accent (scarf, hat band, glove cuffs) as masks, so the
player's colour can replace the drawn teal at load without reading pixels
(a page opened from file:// may not read its own images' pixels): for each
image of web/art/stranger/ (and half/), accent/<img> is white where the teal
is (hue 175-202, accent.py's band), fading at its edge. The puppet player
tints those pixels with the canvas "color" blend (web/puppet/rig.ts).
Writes the list into anim.json's `accent`. Run after web_half.py:
  python3 art-tools/avatar_parts/accent_masks.py
"""
import colorsys, glob, json, os
import numpy as np
from PIL import Image
from scipy import ndimage
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
R = os.path.join(ROOT, 'web', 'art', 'stranger')
LO, HI = 175 / 360, 202 / 360

def mask(path):
    a = np.array(Image.open(path).convert('RGBA')).astype(float) / 255
    r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    mx, mn = a[..., :3].max(-1), a[..., :3].min(-1)
    v, s = mx, np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    h = np.vectorize(lambda r_, g_, b_: colorsys.rgb_to_hsv(r_, g_, b_)[0])(r, g, b) if a.size < 0 else None
    # the hue, vectorised
    d = np.maximum(mx - mn, 1e-6)
    hh = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) / 6
    m = (hh >= LO) & (hh <= HI) & (s > 0.25) & (v > 0.06) & (al > 0.5)
    m = ndimage.binary_closing(m, iterations=1) & (al > 0.5)       # the fold lines inside a scarf
    soft = ndimage.gaussian_filter(m.astype(float), 0.7) * al
    out = np.zeros(a.shape, np.uint8)
    out[..., :3] = 255
    out[..., 3] = np.clip(soft * 255, 0, 255).astype(np.uint8)
    return out, int(m.sum())

names = []
for sub in ('', 'half'):
    src = os.path.join(R, sub)
    os.makedirs(os.path.join(src, 'accent'), exist_ok=True)
    for path in sorted(glob.glob(os.path.join(src, '*.png'))):
        n = os.path.basename(path)
        if n.startswith('ref_') or n == 'table_preview.png':
            continue
        out, px = mask(path)
        if px < 20:
            continue
        Image.fromarray(out).save(os.path.join(src, 'accent', n))
        if not sub:
            names.append(n)
anim = json.load(open(os.path.join(R, 'anim.json')))
anim['accent'] = {'masks': names, 'note': 'Images with teal to tint: accent/<img> (and half/accent/<img>) masks it.'}
json.dump(anim, open(os.path.join(R, 'anim.json'), 'w'), indent=1)
print(len(names), 'masks')
