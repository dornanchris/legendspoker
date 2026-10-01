#!/usr/bin/env python3
"""
cut_sheet.py -- split_parts.py for a character's sheet, plus the fixes those
sheets keep needing, written down as data in the kit's cut.json:

  {
    "sheet": "sources/fdr_sheet.png",      the sheet, relative to cut.json
    "stem": "fdr",                         pieces go to <kit>/<stem>/<stem>_NN.png
    "split": [[400, 100], [20, 540, 8]],   an island at (x, y) that is really N
                                           pieces touching (N defaults to 2)
    "holders": [[[440, 133], [538, 120]]]  a thin prop drawn across the next
                                           piece, as a line along it: it goes to
                                           the piece at its first point, and the
                                           piece at its last is filled in under it
  }

  python3 art-tools/cut_sheet.py art-tools/fdr_parts/cut.json

Coordinates are the sheet's own pixels. Labels already in the kit's
parts.json are kept, by piece number, when it is cut again.
"""
import json, os, sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from split_parts import build_alpha, find_pieces, reading_order, contact_sheet


def split_n(m, n):
    """Erode a touching island until it falls into n parts, then give every
    pixel to the nearest one."""
    for k in range(1, 20):
        lab, c = ndimage.label(ndimage.binary_erosion(m, iterations=k))
        if c < n:
            continue
        sz = ndimage.sum(np.ones_like(lab), lab, range(1, c + 1))
        big = [i + 1 for i in np.argsort(sz)[::-1][:n] if sz[i] > 1000]
        if len(big) == n:
            _, (iy, ix) = ndimage.distance_transform_edt(~np.isin(lab, big), return_indices=True)
            near = lab[iy, ix]
            return [m & (near == b) for b in big]
    raise SystemExit(f'could not split an island into {n}')


def main(spec_path):
    spec = json.load(open(spec_path))
    kit = os.path.dirname(os.path.abspath(spec_path))
    sheet, stem = os.path.join(kit, spec['sheet']), spec['stem']
    img = Image.open(sheet)
    arr, alpha = build_alpha(img)
    solid = alpha > 0.35
    H, W = solid.shape
    pieces = find_pieces(alpha, spec.get('min_area', 300), 0)
    light = (arr[..., :3].min(-1) > 200) & (np.ptp(arr[..., :3], axis=-1) < 30)

    def box(p):
        ys, xs = np.nonzero(p['mask'])
        p.update(x=int(xs.min()), y=int(ys.min()), w=int(xs.max() - xs.min() + 1),
                 h=int(ys.max() - ys.min() + 1), area=int((p['mask'] & solid).sum()))
        return p

    def at(x, y):
        for r in range(0, 9):                     # the nearest piece within a few pixels
            for p in pieces:
                if p['mask'][max(0, y - r):y + r + 1, max(0, x - r):x + r + 1].any():
                    return p
        raise SystemExit(f'no piece at {x}, {y}')

    def unfleck(m, other):
        # near-white specks where pieces touched: not quite white enough for
        # the background, so they stuck to the outline
        lab, n = ndimage.label(m & light)
        zone = ndimage.binary_dilation(other, iterations=15)
        for i in range(1, n + 1):
            c = lab == i
            if c.sum() < 60 and (c & zone).any():
                m = m & ~c
        return m

    for s in spec.get('split', []):
        p = at(s[0], s[1])
        pieces = [q for q in pieces if q is not p]
        parts = split_n(p['mask'], s[2] if len(s) > 2 else 2)
        for i, m in enumerate(parts):
            rest = np.logical_or.reduce([q for j, q in enumerate(parts) if j != i])
            pieces.append(box({'mask': unfleck(m, rest)}))

    def band(pts, r):
        m = Image.new('L', (W, H), 0)
        ImageDraw.Draw(m).line([tuple(q) for q in pts], fill=255, width=2 * r, joint='curve')
        return np.array(m) > 0

    rgb = arr[..., :3].astype(float)
    orig = arr.copy()
    for pts in spec.get('holders', []):
        b = band(pts, 4)
        owner, under = at(*pts[0]), at(*pts[-1])
        owner['mask'] = owner['mask'] | (band(pts, 3) & solid)
        owner['orig'] = True                      # keeps the prop's own colours
        rest = under['mask'] & ~b
        shape = ndimage.binary_closing(rest, structure=np.ones((11, 11))) | rest
        shape &= under['mask'] | b
        hole = shape & b
        _, (iy, ix) = ndimage.distance_transform_edt(hole, return_indices=True)
        fill = rgb[iy, ix]
        for _ in range(40):                       # smooth the fill in from its edges
            avg = ndimage.uniform_filter(fill, size=(3, 3, 1))
            fill[hole] = avg[hole]
        rgb[hole] = fill[hole]
        alpha[hole] = 1.0
        under['mask'] = shape
        box(owner), box(under)
    arr[..., :3] = np.clip(rgb, 0, 255).astype(np.uint8)

    pieces = reading_order(pieces)
    dest = os.path.join(kit, stem)
    os.makedirs(dest, exist_ok=True)
    old = os.path.join(dest, 'parts.json')
    labels = {q['index']: q['label'] for q in json.load(open(old))['parts']} if os.path.exists(old) else {}
    if labels and len(labels) != len(pieces):
        print(f'warning: {len(labels)} labels for {len(pieces)} pieces; check them')
    man = {'source': os.path.basename(sheet), 'canvas': {'w': W, 'h': H},
           'note': "x/y are the piece's position on the SOURCE canvas. Cut by cut_sheet.py from cut.json.",
           'parts': []}
    for i, p in enumerate(pieces, 1):
        x0, y0 = max(0, p['x'] - 2), max(0, p['y'] - 2)
        x1, y1 = min(W, p['x'] + p['w'] + 2), min(H, p['y'] + p['h'] + 2)
        sub = (orig if p.get('orig') else arr)[y0:y1, x0:x1].copy()
        sub[..., 3] = (np.clip(alpha[y0:y1, x0:x1] * p['mask'][y0:y1, x0:x1], 0, 1) * 255).astype(np.uint8)
        name = f'{stem}_{i:02d}.png'
        Image.fromarray(sub, 'RGBA').save(os.path.join(dest, name))
        man['parts'].append({'index': i, 'file': name, 'label': labels.get(i, ''), 'x': x0, 'y': y0,
                             'w': x1 - x0, 'h': y1 - y0,
                             'pivot': [round((x1 - x0) / 2, 1), round((y1 - y0) / 2, 1)], 'area': p['area']})
    json.dump(man, open(old, 'w'), indent=2)
    contact_sheet(img, pieces, os.path.join(dest, '_contact_sheet.png'))
    print(f'{stem}: {len(pieces)} pieces -> {dest}')


if __name__ == '__main__':
    main(sys.argv[1])
