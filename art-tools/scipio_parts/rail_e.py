# Sheet E's drawn table edge runs behind the ivory elephant in the big win and
# the crushing loss. The frames' `except` boxes cut it either side of him; this
# clears the rail's gold-orange from the elephant's own box below the table
# line, never inside the elephant's outline (its saddle-cloth is gold).
# Run after pose_rig.py, before web_half.py:
#   python3 art-tools/scipio_parts/rail_e.py
import json, os
import numpy as np
from PIL import Image, ImageDraw
from scipy.spatial import ConvexHull
from scipy import ndimage as nd
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
spec = json.load(open(os.path.join(ROOT, 'art-tools', 'scipio_parts', 'pose_rig.json')))
FM, TY = spec['frame_margin'], spec['table_y']
for name in ('win_big', 'lose_big'):
    p = os.path.join(ROOT, 'web', 'art', 'scipio', f'frame_{name}.png')
    a = np.array(Image.open(p).convert('RGBA'))
    c = a[..., :3].astype(int)
    r, g, b = c[..., 0], c[..., 1], c[..., 2]
    rail = (a[..., 3] > 0) & (b < 0.35 * np.maximum(r, 1)) & (r > 60)
    box = np.zeros_like(rail); box[TY + FM - 2:, :FM + 190] = True
    whole = np.zeros_like(box); whole[TY + FM - 140:, :FM + 190] = True   # all of the elephant, not only below the line
    ivory = (a[..., 3] > 0) & (c.min(axis=2) > 170) & whole   # the elephant, and its outline's hull (its gold saddle-cloth)
    lab, n = nd.label(ivory)
    body = np.zeros_like(ivory)
    if n:
        sizes = nd.sum(ivory, lab, range(1, n + 1))            # its pieces, split by its own outlines
        ys, xs = np.nonzero(np.isin(lab, 1 + np.nonzero(sizes >= 100)[0]))
        hull = ConvexHull(np.c_[xs, ys])
        m = Image.new('L', (a.shape[1], a.shape[0]), 0)
        ImageDraw.Draw(m).polygon([(float(xs[i]), float(ys[i])) for i in hull.vertices], fill=255)
        body = np.array(m) > 0
        body[TY + FM + 34:] = False                           # under the belly, between the legs: rail, never cloth
    rail = nd.binary_dilation(rail & box, iterations=1) & box & (a[..., 3] > 0) & (b < 0.5 * np.maximum(r, 1)) & ~body
    a[rail, 3] = 0
    Image.fromarray(a).save(p, optimize=True)
    print(name, 'rail cleared', int(rail.sum()), 'px')
