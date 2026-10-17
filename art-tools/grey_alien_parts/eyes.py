# The Grey's face pieces, made from its own master head so they sit exactly on
# it (the face sheet drew twelve whole heads at another size and angle). Its
# mouth never moves, so everything is the eyes:
#   41 membrane half across (the blink's half), 42 membrane fully across
#   43 heavy-lidded (narrow)
#   44-46 a glow deep in the eyes, faint / brighter / brightest (speech)
# Writes master-sized pieces grey_alien_face_41..46 and their fits (exactly on
# the master) for face.json. Run after own_master.py, before pose_rig.py:
#   python3 art-tools/grey_alien_parts/eyes.py
import os, json
import numpy as np
from PIL import Image
from scipy import ndimage
K = os.path.dirname(os.path.abspath(__file__)) + '/'
F = K + 'grey_alien_face/'
m = np.array(Image.open(F + 'grey_alien_master.png').convert('RGBA')).astype(float)
H, W = m.shape[:2]
yy, xx = np.mgrid[0:H, 0:W]
r, g, b = m[..., 0], m[..., 1], m[..., 2]

def eye(box):
    """The black of one eye: the darkest blob in its box, holes (highlights) filled."""
    x0, y0, x1, y1 = box
    inb = (xx >= x0) & (xx < x1) & (yy >= y0) & (yy < y1)
    e = inb & (m[..., :3].max(-1) < 70) & (b < r + 25)
    lab, n = ndimage.label(e)
    big = 1 + np.argmax(ndimage.sum(e, lab, range(1, n + 1)))
    e = ndimage.binary_fill_holes(lab == big)
    e = ndimage.binary_opening(e, iterations=3)               # thin leaks (a crease, the outline) go
    lab, n = ndimage.label(e)
    e = lab == 1 + np.argmax(ndimage.sum(e, lab, range(1, n + 1)))
    return ndimage.binary_erosion(ndimage.gaussian_filter(e.astype(float), 4) > 0.55, iterations=1)  # rounded, inside the rim

# (box, the outer corner's side: the membrane slides in from it)
EYES = [(eye((205, 126, 318, 200)), 'left'), (eye((330, 128, 386, 198)), 'right')]
out = {}

def membrane(frac):
    o = m.copy()
    for e, side in EYES:
        xs = np.nonzero(e.any(0))[0]
        x0, x1 = xs.min(), xs.max()
        ys = np.nonzero(e.any(1))[0]
        cy, hy = (ys.min() + ys.max()) / 2, (ys.max() - ys.min()) / 2
        bow = 0.18 * (x1 - x0) * (1 - ((yy - cy) / hy) ** 2)    # the leading edge curves, like a lid
        edge = (x0 + frac * (x1 - x0) + bow) if side == 'left' else (x1 - frac * (x1 - x0) - bow)
        if frac > 0.99:
            edge = np.full(xx.shape, 1e9 if side == 'left' else -1e9)
        cover = e & ((xx <= edge) if side == 'left' else (xx >= edge))
        a = 0.78
        tone = np.array([168, 162, 190.0])                      # a pale, half-clear lavender grey
        o[cover, :3] = o[cover, :3] * (1 - a) + tone * a
        band = cover & (np.abs(yy - (np.nonzero(e.any(1))[0].mean() - 4)) < 2)  # a sheen across it
        o[band, :3] = o[band, :3] * 0.5 + 235 * 0.5
        if frac < 0.99:                                          # its leading edge, a thin line
            lead = e & (np.abs(xx - edge) < 1.6)
            o[lead, :3] = o[lead, :3] * 0.3 + np.array([90, 85, 110.0]) * 0.7
    return o

def lidded(frac):
    o = m.copy()
    skin = np.median(m[(yy > 108) & (yy < 120) & (xx > 230) & (xx < 300)][:, :3], axis=0)
    for e, side in EYES:
        ys = np.nonzero(e.any(1))[0]
        cut = ys.min() + frac * (ys.max() - ys.min())
        lid = e & (yy < cut)
        o[lid, :3] = skin * 0.92
        cut = cut + 0 * xx
        lid = e & (yy < cut)
        o[lid, :3] = skin * 0.92
        line = e & (np.abs(yy - cut) < 1.6)
        o[line, :3] = np.array([30, 26, 28.0])
    return o

def glow(t):
    o = m.copy()
    for (e, side), (cx, cy) in zip(EYES, [(262, 165), (362, 165)]):
        ys, xs = np.nonzero(e)
        rad = 0.5 * (xs.max() - xs.min())
        d = np.hypot(xx - cx, (yy - cy) * 1.3)
        k = (np.clip(1 - d / rad, 0, 1) ** 0.8 * min(1, t * 1.05) * e)[..., None]
        hot = np.array([255, 128, 24.0])                             # a deep amber, laid over the black
        o[..., :3] = o[..., :3] * (1 - k) + hot * k
        core = e & (d < rad * 0.28)
        o[core, :3] = o[core, :3] * (1 - t * 0.6) + np.array([255, 236, 170.0]) * t * 0.6
    return o

pieces = {41: membrane(0.55), 42: membrane(1.0), 43: lidded(0.45),
          44: glow(0.45), 45: glow(0.7), 46: glow(0.95)}
fits = {}
for i, a in pieces.items():
    Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), 'RGBA').save(F + f'grey_alien_face_{i}.png')
    fits[f'grey_alien_face_{i}.png'] = [0, 0, 1.0]
os.makedirs(K + 'grey_alien_rig/face', exist_ok=True)
p = K + 'grey_alien_rig/face/fits.json'
old = json.load(open(p)) if os.path.exists(p) else {}
old.update(fits)
json.dump(old, open(p, 'w'), indent=1)
print(len(pieces), 'eye pieces')
