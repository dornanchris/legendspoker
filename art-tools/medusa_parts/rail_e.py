# Sheet E drew her table edge as a wider arc than her other sheets, so the
# rail filter (rail_band 10-75, for her tight curve) leaves a strip of it under
# the big win and the crushing loss. Clears the rail's orange-brown (red well
# over green, almost no blue: never her skin, which has more green and blue)
# from the rows just above her table line in those two frames.
# Run after pose_rig.py, before web_half.py:
#   python3 art-tools/medusa_parts/rail_e.py
import json, os
import numpy as np
from PIL import Image
from scipy import ndimage as nd
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
spec = json.load(open(os.path.join(ROOT, 'art-tools', 'medusa_parts', 'pose_rig.json')))
FM, TY = spec['frame_margin'], spec['table_y']
for name in ('win_big', 'lose_big'):
    p = os.path.join(ROOT, 'web', 'art', 'medusa', f'frame_{name}.png')
    a = np.array(Image.open(p).convert('RGBA'))
    c = a[..., :3].astype(int)
    rail = (a[..., 3] > 0) & (c[..., 0] > 60) & (c[..., 0] > 2.2 * c[..., 1]) & (c[..., 2] < 40)
    rail |= (a[..., 3] > 0) & (c[..., 0] > 150) & (c[..., 1] < 0.62 * c[..., 0]) & (c[..., 2] < 40)   # its highlight
    band = np.zeros_like(rail); band[TY + FM - 30:TY + FM + 12] = True
    rail &= band
    rail = nd.binary_dilation(rail, iterations=1) & band & (a[..., 3] > 0)
    a[rail, 3] = 0
    keep = a[..., 3] > 0                                        # and crumbs left below the cut
    lab, n = nd.label(keep)
    if n:
        sizes = nd.sum(keep, lab, range(1, n + 1))
        a[np.isin(lab, 1 + np.nonzero(sizes < 40)[0]), 3] = 0
    Image.fromarray(a).save(p, optimize=True)
    print(name, 'rail cleared', int(rail.sum()), 'px')
