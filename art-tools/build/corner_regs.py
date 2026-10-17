"""Place every pose by the bottom-left corner of its drawn felt panel, relative
to A1 (the rest pose): adds "reg": [1.0, dx, dy] to <kit>/poses_found.json.
Poses with no felt are printed and left for a hand-set reg.

  python3 art-tools/build/corner_regs.py art-tools/scipio_parts
Add --green for a plain green felt (the teal test misses it).
"""
import json, sys
import numpy as np
from PIL import Image
kit = sys.argv[1].rstrip('/')
GREEN = '--green' in sys.argv
p = f'{kit}/poses_found.json'
P = json.load(open(p)); ims = {}
def corner(n):
    q = P[n]; sh = q['sheet'].lower()
    if sh not in ims: ims[sh] = np.array(Image.open(f'{kit}/sources/poses_{sh}.png').convert('RGB')).astype(int)
    x, y, w, h = q['box']; c = ims[sh][y:y + h, x:x + w]
    f = (c[..., 1] > c[..., 0] + 30) & (c[..., 2] > c[..., 0] + 30) & (c[..., 1] > c[..., 2] - 25)
    if GREEN:                    # a plain green felt (the finale's avatars): green over both
        f = (c[..., 1] > c[..., 0] + 25) & (c[..., 1] > c[..., 2] + 25)
    rows = np.nonzero(f.sum(1) > w * 0.5)[0]
    if not len(rows): return None
    B = int(rows.max())
    cols = np.nonzero(f[B - 12:B - 2].any(0))[0]
    return int(cols.min()), B
aL, aB = corner('A1')
for n in P:
    if n == 'A1': continue
    r = corner(n)
    if r is None: print('no felt:', n); continue
    L, B = r; P[n]['reg'] = [1.0, aL - L, aB - B]
json.dump(P, open(p, 'w'), indent=1)
print({n: P[n].get('reg') for n in P})
