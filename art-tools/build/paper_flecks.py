"""Colour over flecks of the sheet's paper white caught on a puppet's outline where
it is dark (hair between its curls, the outline itself): small, paper-white,
at (or within a few pixels of) the outside edge, and ringed mostly by dark hair or line. Highlights on
plate or silk are ringed by their own light colours, or by line and steel with
no hair, and stay; the whites of
eyes and teeth are inside the outline and stay. Each fleck takes the colour
of the nearest dark pixel, so the silhouette is unchanged. Run after pose_rig.py, before
web_half.py:

  python3 art-tools/build/paper_flecks.py lancelot [more ids] [--dry]
"""
import os, sys
import numpy as np
from PIL import Image
from scipy import ndimage as nd

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
dry = '--dry' in sys.argv
for pid in [a for a in sys.argv[1:] if not a.startswith('--')]:
    d = os.path.join(ROOT, 'web', 'art', pid)
    total = 0
    for f in sorted(os.listdir(d)):
        if not f.endswith('.png') or f.startswith(('ref_', 'ik_')):
            continue
        p = os.path.join(d, f)
        a = np.array(Image.open(p).convert('RGBA'))
        c = a[..., :3].astype(int)
        op = a[..., 3] > 128
        paper = op & (c.min(-1) > 205) & (np.ptp(c, axis=-1) < 35)
        paper |= op & (c.min(-1) > 55) & (np.ptp(c, axis=-1) < 14)      # and its grey edge, half paper
        outside = nd.binary_dilation(~op, iterations=6)       # (or just inside the outline)
        dark = op & (c.max(-1) < 120) & ~paper
        hair = dark & (c[..., 0] - c[..., 2] >= 8) & (c.max(-1) >= 20)   # warm and dark: never steel or silk
        lab, n = nd.label(paper, structure=np.ones((3, 3)))
        drop = np.zeros_like(paper)
        for i, sl in enumerate(nd.find_objects(lab)):
            piece = lab[sl] == i + 1
            if piece.sum() > 120 or not (piece & outside[sl]).any():
                continue
            y0, y1 = max(0, sl[0].start - 3), sl[0].stop + 3
            x0, x1 = max(0, sl[1].start - 3), sl[1].stop + 3
            me = lab[y0:y1, x0:x1] == i + 1
            ring = nd.binary_dilation(me, iterations=2) & ~me & op[y0:y1, x0:x1]
            if ring.sum() and (dark[y0:y1, x0:x1] & ring).sum() >= 0.6 * ring.sum() \
                    and (hair[y0:y1, x0:x1] & ring).sum() >= 0.08 * ring.sum():
                drop[y0:y1, x0:x1] |= me
        if drop.any():
            total += int(drop.sum())
            if not dry:
                drop |= nd.binary_dilation(drop, iterations=1) & paper
                _, (iy, ix) = nd.distance_transform_edt(~dark, return_indices=True)   # the nearest hair or line
                a[..., :3] = np.where(drop[..., None], a[iy, ix, :3], a[..., :3])
                Image.fromarray(a).save(p, optimize=True)
    print(pid, 'paper flecks', total, 'px', '(dry run)' if dry else '')
