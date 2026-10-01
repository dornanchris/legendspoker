# Cut FDR's three-quarter sheet: split_parts.py, plus separating the islands
# that touch (two torso pairs, two head pairs), and the two cigarette holders
# that cross into the laughing head beside them: each holder goes to the
# smiling head it belongs to, and the laughing head is filled in under it.
#
#   python3 art-tools/fdr_parts/cut.py art-tools/fdr_parts/sources/fdr_sheet.png art-tools/fdr_parts
#
# The coordinates below are this sheet's own; another sheet needs its own.
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from split_parts import build_alpha, find_pieces, reading_order, contact_sheet
from PIL import Image, ImageDraw
import numpy as np
from scipy import ndimage

SHEET, DEST, STEM = sys.argv[1], sys.argv[2], 'fdr'
img = Image.open(SHEET)
arr, alpha = build_alpha(img)
solid = alpha > 0.35
H, W = solid.shape
pieces = find_pieces(alpha, 300, 0)

def box(p):
    ys, xs = np.nonzero(p['mask'])
    p.update(x=int(xs.min()), y=int(ys.min()), w=int(xs.max() - xs.min() + 1), h=int(ys.max() - ys.min() + 1),
             area=int((p['mask'] & solid).sum()))
    return p

def at(x, y):
    return next(p for p in pieces if p['mask'][y, x])

def split_two(m):
    for k in range(1, 15):
        lab, n = ndimage.label(ndimage.binary_erosion(m, iterations=k))
        if n < 2: continue
        sz = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
        big = [i + 1 for i in np.argsort(sz)[::-1][:2] if sz[i] > 2000]
        if len(big) == 2:
            _, (iy, ix) = ndimage.distance_transform_edt(~np.isin(lab, big), return_indices=True)
            near = lab[iy, ix]
            return [m & (near == b) for b in big]
    raise SystemExit('no split')

light = (arr[..., :3].min(-1) > 200) & (np.ptp(arr[..., :3], axis=-1) < 30)
def unfleck(m, other):
    # near-white specks where the two touched: not quite white enough for
    # the background, so they stuck to the outline
    lab, n = ndimage.label(m & light)
    zone = ndimage.binary_dilation(other, iterations=15)
    for i in range(1, n + 1):
        c = lab == i
        if c.sum() < 60 and (c & zone).any():
            m = m & ~c
    return m

for x, y in [(400, 100), (1000, 100), (1300, 100), (100, 540), (1050, 540)]:
    p = at(x, y); pieces = [q for q in pieces if q is not p]
    a, b = split_two(p['mask'])
    pieces += [box({'mask': unfleck(a, b)}), box({'mask': unfleck(b, a)})]

def band(pts, r=4):
    m = Image.new('L', (W, H), 0)
    ImageDraw.Draw(m).line(pts, fill=255, width=2 * r, joint='curve')
    return np.array(m) > 0

rgb = arr[..., :3].astype(float)
orig = arr.copy()
for pts in ([(440, 133), (484, 135), (494, 132), (538, 120)], [(1100, 135), (1058, 135), (1040, 133), (996, 121)]):
    b = band(pts)
    smile, laugh = at(*map(int, pts[0])), at(*map(int, pts[-1]))
    smile['mask'] = smile['mask'] | (band(pts, 3) & solid)
    smile['orig'] = True
    rest = laugh['mask'] & ~b
    shape = ndimage.binary_closing(rest, structure=np.ones((11, 11)), iterations=1) | rest
    shape &= laugh['mask'] | b
    hole = shape & b
    _, (iy, ix) = ndimage.distance_transform_edt(hole, return_indices=True)
    fill = rgb[iy, ix]
    for _ in range(40):                            # smooth the fill from its edges in
        avg = ndimage.uniform_filter(fill, size=(3, 3, 1))
        fill[hole] = avg[hole]
    rgb[hole] = fill[hole]
    alpha[hole] = 1.0
    laugh['mask'] = shape
    box(smile); box(laugh)

arr[..., :3] = np.clip(rgb, 0, 255).astype(np.uint8)
pieces = reading_order(pieces)
dest = os.path.join(DEST, STEM); os.makedirs(dest, exist_ok=True)
man = {'source': os.path.basename(SHEET), 'canvas': {'w': W, 'h': H},
       'note': "x/y are the piece's position on the SOURCE canvas. Cut by split_parts.py; touching pieces "
               "separated where they met, and the two holders that cross the laughing heads given to the "
               "smiling heads (the laughing heads filled in under them).", 'parts': []}
for i, p in enumerate(pieces, 1):
    x0, y0 = max(0, p['x'] - 2), max(0, p['y'] - 2)
    x1, y1 = min(W, p['x'] + p['w'] + 2), min(H, p['y'] + p['h'] + 2)
    sub = (orig if p.get('orig') else arr)[y0:y1, x0:x1].copy()
    sub[..., 3] = (np.clip(alpha[y0:y1, x0:x1] * p['mask'][y0:y1, x0:x1], 0, 1) * 255).astype(np.uint8)
    name = f'{STEM}_{i:02d}.png'
    Image.fromarray(sub, 'RGBA').save(os.path.join(dest, name))
    man['parts'].append({'index': i, 'file': name, 'label': '', 'x': x0, 'y': y0, 'w': x1 - x0, 'h': y1 - y0,
                         'pivot': [round((x1 - x0) / 2, 1), round((y1 - y0) / 2, 1)], 'area': p['area']})
json.dump(man, open(os.path.join(dest, 'parts.json'), 'w'), indent=2)
contact_sheet(img, pieces, os.path.join(dest, '_contact_sheet.png'))
print(len(pieces), 'pieces')
