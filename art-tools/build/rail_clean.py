"""Clear the drawn table edge a reactions sheet leaves below the table line in
the big win and the crushing loss. Whole-figure frames are drawn again over
the table where they lie on it, so a sheet whose table edge sits a little
lower than the kit's other sheets shows it on the felt. Takes only the rail's
gold-orange and its dark brown edge (strong red, almost no blue: skin, a
pearl, a black pipe and cloth all have more), only below the table line, then
drops the crumbs. Run after pose_rig.py, before web_half.py:

  python3 art-tools/build/rail_clean.py nemo [fdr ...]
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as nd

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
for pid in sys.argv[1:]:
    spec = json.load(open(os.path.join(ROOT, 'art-tools', f'{pid}_parts', 'pose_rig.json')))
    FM, TY = spec.get('frame_margin', 0), spec['table_y']
    for name in ('win_big', 'lose_big'):
        p = os.path.join(ROOT, 'web', 'art', pid, f'frame_{name}.png')
        a = np.array(Image.open(p).convert('RGBA'))
        c = a[..., :3].astype(int)
        r, g, b = c[..., 0], c[..., 1], c[..., 2]
        on = a[..., 3] > 0
        rail = on & (r > 90) & (g > 0.25 * r) & (g < 0.8 * r) & (b < 0.3 * r)          # the gold-orange
        rail |= on & (r > 35) & (r <= 120) & (g < 0.62 * r) & (b < 0.45 * r)          # its dark brown edge
        rail[:TY + FM - 2] = False
        props = Image.new('L', (a.shape[1], a.shape[0]), 0)          # a prop on the felt (a pearl, a pipe) is never rail
        for poly in spec['frames'][name].get('props', []):
            ImageDraw.Draw(props).polygon([(x + FM, y + FM) for x, y in poly], fill=255)
        rail &= np.array(props) == 0
        lab, n = nd.label(rail, structure=np.ones((3, 3)))             # only long, thin pieces: the rail, never a hand
        long_ = np.zeros_like(rail)
        for i, sl in enumerate(nd.find_objects(lab)):
            w, h = sl[1].stop - sl[1].start, sl[0].stop - sl[0].start
            if w >= 40 and w >= 2.5 * h:
                long_ |= lab == i + 1
        rail = nd.binary_dilation(long_, iterations=1) & on & (b < 0.45 * np.maximum(r, 1)) & (np.array(props) == 0)
        # inside a prop box, only the rail's bright orange, in long pieces (a pipe's small gold band is not one)
        inbox = on & (np.array(props) > 0) & (r > 140) & (g > 0.35 * r) & (g < 0.8 * r) & (b < 0.3 * r)
        inbox[:TY + FM - 2] = False
        lab, n = nd.label(inbox, structure=np.ones((3, 3)))
        for i, sl in enumerate(nd.find_objects(lab)):
            w, h = sl[1].stop - sl[1].start, sl[0].stop - sl[0].start
            if w >= 25 and w >= 2 * h:
                rail |= lab == i + 1
        rail[:TY + FM - 2] = False
        a[rail, 3] = 0
        keep = a[..., 3] > 0
        lab, n = nd.label(keep)
        if n:
            sizes = nd.sum(keep, lab, range(1, n + 1))
            low = np.zeros_like(keep); low[TY + FM - 2:] = True
            crumbs = np.isin(lab, 1 + np.nonzero(sizes < 40)[0]) & low
            a[crumbs, 3] = 0
        Image.fromarray(a).save(p, optimize=True)
        print(pid, name, 'rail cleared', int(rail.sum()), 'px')
