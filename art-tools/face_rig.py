#!/usr/bin/env python3
"""
face_rig.py -- turn a character's face-overlay sheet into layers that sit
exactly on the master head, with no seams.

The face sheet draws a master head and, separately, patches of it: eyes in
other states, brows, mouths. Each patch is found on the master head by
matching it against the face (cached in fits.json), then baked into a layer
the size of the master head itself, so the runtime places every layer with
the master head's own transform. Baking does what a patch needs to sit on
the face invisibly:

  - the patch's drawn outline is stripped, and its edge fades in over a few
    pixels (an outline round an eyelid is a box drawn on the face);
  - its colours are matched to the head under its rim (a separate drawing
    is never quite the same skin);
  - it is clipped to the head (a patch never pokes past the silhouette);
  - each kind draws only on its own region of the face: eyes below the brow
    line, brows above it (so the two change independently), mouths round the
    mouth and chin but never over the nose (so the nose is never drawn twice).

Mouths swap instantly at runtime: two mouths faded into one another are a
ghost, so a mouth patch must cover the painted mouth under it on its own.

The spec (<id>_parts/face.json):
  {
    "master": "lincoln_parts/lincoln_face/lincoln_face_01.png",
    "regions": {"eyes": {"keep": [[x, y], ...], "except": [[[x, y], ...]]}, ...}
                                      per kind, the part of the face its layers may
                                      draw on (master-head pixels): a polygon, less
                                      any polygons under "except"; "fill" polygons
                                      are painted plain skin, blended from the
                                      head's skin round them (shading the drawing
                                      has there that the patch no longer matches)
    "clear": {"mouth": {"below": 272, "x": [165, 212]}}
                                      (a region may also give "outline" and "fade",
                                      the patch's stripped edge and its fade in
                                      pixels, and "match": false to keep the
                                      patch's own colours: black fur)
                                      a mouth patch whose upper lip (within those
                                      columns) is above that row is moved down to
                                      it: the drawings open the mouth upward, into
                                      the nose, where a jaw should drop
    "layers": {"eyes": {"half": 2, ...}, "brows": {...}, "mouth": {...}},
    "pieces": "lincoln_parts/lincoln_face/lincoln_face_%02d.png"
  }

  python3 art-tools/face_rig.py art-tools/lincoln_parts/face.json OUT_DIR
"""
import json, os, sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))


def _search(R, src, scales, xs, ys):
    best = (1e9, 0, 0, 1.0)
    Ra = R[..., 3] > 200
    for k in scales:
        p = src.resize((max(1, round(src.width * k)), max(1, round(src.height * k))), Image.LANCZOS)
        M = np.array(p).astype(float)
        m = M[..., 3] > 200
        h, w = m.shape
        for y in ys:
            for x in xs:
                if x < 0 or y < 0 or y + h > R.shape[0] or x + w > R.shape[1]:
                    continue
                r = R[y:y + h, x:x + w]
                mm = m & Ra[y:y + h, x:x + w]
                if mm.sum() < m.sum() * 0.9:
                    continue
                d = np.abs(r[..., :3] - M[..., :3])[mm].mean()
                if d < best[0]:
                    best = (d, x, y, k)
    return best


def fit_patch(master, patch):
    """Where `patch` lies on `master`: (x, y, scale) in master pixels."""
    H, P = Image.open(master).convert('RGBA'), Image.open(patch).convert('RGBA')
    # coarse, at half size, then to the pixel
    h2 = H.resize((H.width // 2, H.height // 2), Image.LANCZOS)
    R2 = np.array(h2).astype(float)
    _, x, y, k = _search(R2, P.resize((P.width // 2, P.height // 2), Image.LANCZOS),
                         np.arange(0.5, 1.21, 0.03), range(0, R2.shape[1], 2), range(0, R2.shape[0], 2))
    R = np.array(H).astype(float)
    _, x, y, k = _search(R, P, [k - 0.02, k - 0.01, k, k + 0.01, k + 0.02],
                         range(2 * x - 6, 2 * x + 7), range(2 * y - 6, 2 * y + 7))
    return [int(x), int(y), round(float(k), 3)]


def lip_drop(p, x, y, clear):
    """How far to move a mouth patch down so its upper lip clears the nose:
    the first dark or lip-red row inside the columns given, below the top."""
    x0, x1 = clear['x']
    a = p[:, max(0, x0 - x):max(0, x1 - x)]
    lum = a[..., :3].mean(-1)
    lip = (a[..., 3] > 200) & ((lum < 70) | ((a[..., 0] - a[..., 1] > 70) & (a[..., 0] < 220)))
    rows = np.nonzero(ndimage.binary_erosion(lip, iterations=1).sum(1) > 3)[0]
    rows = rows[rows > 12]                                   # below the patch's own top edge
    return max(0, clear['below'] - (y + int(rows[0]))) if len(rows) else 0


def bake(master, patch, at, region=None, clear=None, outline=5, fade=4):
    """The patch as a layer the size of the master head (see the module doc)."""
    H = np.array(Image.open(master).convert('RGBA')).astype(float)
    P = Image.open(patch).convert('RGBA')
    x, y, k = at
    # a region may set its own edge ("outline", "fade": a patch cut tight under
    # the eyes) and turn off the skin match ("match": false: black fur, where
    # the skin test finds amber eyes and brown muzzle and tints the patch blue)
    outline, fade = (region or {}).get('outline', outline), (region or {}).get('fade', fade)
    p = np.array(P.resize((round(P.width * k), round(P.height * k)), Image.LANCZOS)).astype(float)
    if clear:                                                # an open mouth drops the jaw, not the nose
        y += lip_drop(p, x, y, clear)
    L = np.zeros_like(H)
    h, w = p.shape[:2]
    L[y:y + h, x:x + w] = p
    A = L[..., 3] > 128
    core = ndimage.binary_erosion(A, iterations=outline)                 # no drawn outline...
    inner = ndimage.binary_erosion(core, iterations=2 * fade)            # ...and the fade stays off it
    alpha = np.array(Image.fromarray((inner * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(fade))).astype(float)
    alpha = np.minimum(alpha, core * 255.0)
    alpha = np.minimum(alpha, H[..., 3])                                 # never past the head

    # colour: match the patch's skin to the head's skin in a ring inside its edge
    ring = core & ~ndimage.binary_erosion(core, iterations=10)
    skin = lambda a: (a[..., 0] > 150) & (a[..., 0] - a[..., 2] > 50)
    s = ring & skin(L) & skin(H) & (H[..., 3] > 200)
    if s.sum() > 50 and (region or {}).get('match', True):
        gain = H[s][:, :3].mean(0) / np.maximum(L[s][:, :3].mean(0), 1)
        L[..., :3] = np.clip(L[..., :3] * gain, 0, 255)

    if region:                                                           # only its own part of the face
        m = Image.new('L', (H.shape[1], H.shape[0]), 0)
        ImageDraw.Draw(m).polygon([tuple(q) for q in region['keep']], fill=255)
        for poly in region.get('except', []):
            ImageDraw.Draw(m).polygon([tuple(q) for q in poly], fill=0)
        alpha = alpha * np.array(m.filter(ImageFilter.GaussianBlur(2))).astype(float) / 255
    L[..., 3] = alpha
    for poly in (region or {}).get('fill', []):                         # plain skin under it
        m = Image.new('L', (H.shape[1], H.shape[0]), 0)
        ImageDraw.Draw(m).polygon([tuple(q) for q in poly], fill=255)
        hole = np.array(m) > 0
        src = ~hole & (H[..., 3] > 200) & (H[..., 0] > 150) & (H[..., 0] - H[..., 2] > 50)
        _, (iy, ix) = ndimage.distance_transform_edt(~src, return_indices=True)
        fill = H[iy, ix, :3].copy()
        for _ in range(60):                                              # smooth it in from the edge
            avg = ndimage.uniform_filter(fill, size=(5, 5, 1))
            fill[hole] = avg[hole]
        a = np.array(m.filter(ImageFilter.GaussianBlur(2))).astype(float)
        a = np.minimum(a, H[..., 3])                                     # never past the head either
        under = np.dstack([fill, a])
        top = L.copy()                                                   # the patch over the fill
        ta, ua = top[..., 3:] / 255, under[..., 3:] / 255
        oa = ta + ua * (1 - ta)
        L[..., :3] = np.where(oa > 0, (top[..., :3] * ta + under[..., :3] * ua * (1 - ta)) / np.maximum(oa, 1e-6), 0)
        L[..., 3] = oa[..., 0] * 255
    return Image.fromarray(L.astype(np.uint8), 'RGBA')


def cut_below(im, y, fade=6):
    """Fade an image out below row y (a head's own collar, under the torso's)."""
    a = np.array(im.convert('RGBA')).astype(float)
    rows = np.arange(a.shape[0])[:, None]
    a[..., 3] *= np.clip((y - rows) / fade + 0.5, 0, 1)
    return Image.fromarray(a.astype(np.uint8), 'RGBA')


def main(spec_path, out_dir, cut=None):
    spec = json.load(open(spec_path))
    os.makedirs(out_dir, exist_ok=True)
    master = os.path.join(HERE, spec['master'])
    piece = lambda i: os.path.join(HERE, spec['pieces'] % i)
    fits_path = os.path.join(out_dir, 'fits.json')
    fits = json.load(open(fits_path)) if os.path.exists(fits_path) else {}
    out = {}
    for kind, states in spec['layers'].items():
        for state, i in states.items():
            key = os.path.basename(piece(i))
            if key not in fits:
                fits[key] = fit_patch(master, piece(i))
                print(f'  fitted {kind}.{state} ({key}): {fits[key]}')
            name = f'{kind}_{state}.png'
            layer = bake(master, piece(i), fits[key], spec.get('regions', {}).get(kind),
                         spec.get('clear', {}).get(kind))
            (cut_below(layer, cut) if cut else layer).save(os.path.join(out_dir, name))
            out.setdefault(kind, {})[state] = name
    json.dump(fits, open(fits_path, 'w'), indent=1)
    json.dump(out, open(os.path.join(out_dir, 'layers.json'), 'w'), indent=1)
    return out


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
