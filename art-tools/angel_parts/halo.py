# The rest pose keeps the sheet's white inside the halo ring (the ring is
# closed there by the head), while every frame's own head has it clear, so the
# halo flickered white and dark as he dealt. Clears it from the rest body.
# Run after pose_rig.py, before web_half.py:
#   python3 art-tools/angel_parts/halo.py
import os
import numpy as np
from PIL import Image
from scipy import ndimage as nd
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
p = os.path.join(ROOT, 'web', 'art', 'pravuil', 'body.png')
im = np.array(Image.open(p).convert('RGBA'))
white = (im[..., 3] > 0) & (im[..., :3].min(axis=2) > 225)
white[200:] = False                                   # the halo only: never the robe
lab, n = nd.label(white)
sizes = nd.sum(white, lab, range(1, n + 1))
disc = np.isin(lab, 1 + np.nonzero(sizes >= 150)[0])
disc = nd.binary_dilation(disc, iterations=1) & (im[..., :3].min(axis=2) > 200)   # and its pale edge
im[disc, 3] = 0
# then the anti-aliased crumbs left round it, inside the ring only (never the
# quill behind his ear, which is drawn pale too)
yy, xx = np.mgrid[:im.shape[0], :im.shape[1]]
ring = ((xx - 230) / 82.0) ** 2 + ((yy - 95) / 94.0) ** 2 < 1
ring &= ~((xx < 185) & (yy > 55) & (yy < 125))
for _ in range(4):
    gone = im[..., 3] == 0
    c = im[..., :3].astype(int)
    grey = (c.min(axis=2) > 100) & (c.max(axis=2) - c.min(axis=2) < 45)   # the disc's pale grey edge, never hair or gold
    edge = nd.binary_dilation(gone) & ~gone & ring & ((c.min(axis=2) > 150) | grey)
    im[edge, 3] = 0
    disc |= edge
# and the disc's own outline, left as dots: small pieces standing alone in the ring
solid = im[..., 3] > 0
lab, n = nd.label(solid, structure=np.ones((3, 3)))
sizes = nd.sum(solid, lab, range(1, n + 1))
dots = np.isin(lab, 1 + np.nonzero(sizes < 60)[0]) & ring
im[dots, 3] = 0
disc |= dots
Image.fromarray(im).save(p, optimize=True)
print('halo: cleared', int(disc.sum()), 'px')
