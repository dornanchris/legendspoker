# JFK's eye pieces, mended. The face sheet's eye patches (2-7) are drawn at his
# three-quarter angle, but the fit found four of them (half, closed, down, up)
# too low, so face_rig clipped them away below the eye region: he never
# blinked, and his glances did nothing. And the sheet coloured the irises
# blue (half, viewer) and brown (down, up, narrow); his own are grey-green.
#
# This writes 21-26, copies of 2-7 with the irises recoloured to his, and
# their fits, each placed by its brows on the one fit that landed true
# (viewer, piece 4). face.json points at 21-26 and keeps the eye layers below
# the brows, so his own brows stay. Then:
#   python3 art-tools/jfk_parts/eyes.py
#   python3 art-tools/face_rig.py art-tools/jfk_parts/face.json art-tools/jfk_parts/jfk_rig/face
# (pose_rig.py does the second step itself), copy the eye layers to
# web/art/jfk and run web_half.py jfk.
import os, json
import numpy as np
from PIL import Image
from scipy import ndimage

K = os.path.dirname(os.path.abspath(__file__)) + '/'
F = K + 'jfk_face/'
IRIS = np.array([96, 116, 104.0])          # his own: a grey-green
ANCHOR, AT = 4, (206, 72, 0.48)            # the viewer patch's fit, which landed on his eyes
NEW = {2: 21, 3: 22, 4: 23, 5: 24, 6: 25, 7: 26}


def load(i):
    return np.array(Image.open(F + f'jfk_face_{i:02d}.png').convert('RGBA')).astype(float)


def brows(p):
    """Where the brows are: the dark brown in the patch's top half (its centroid)."""
    h = p.shape[0]
    dark = (p[..., :3].max(-1) < 90) & (p[..., 3] > 200)
    dark[h // 2:] = False
    ys, xs = np.nonzero(dark)
    return xs.mean(), ys.mean()


def recolour(p):
    """The iris, whatever colour the sheet gave it, in his grey-green: the
    coloured pixels round each eye's white, kept to their own light and shade."""
    rgb = p[..., :3]
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    solid = p[..., 3] > 200
    skin = (r > 150) & (r - b > 50)
    white = (rgb.min(-1) > 175) & (np.ptp(rgb, axis=-1) < 45) & solid
    near = ndimage.binary_dilation(white, iterations=14)
    lum = rgb.mean(-1)
    blue = (b > r + 4) & (lum < 200)
    brown = (r > g) & (g > b) & (r < 200) & (lum < 170) & (lum > 25) & ~(skin & (lum > 150))
    iris = near & solid & ~white & (blue | brown)
    iris &= np.arange(p.shape[0])[:, None] > p.shape[0] * 0.4      # never the brows
    iris = ndimage.binary_opening(iris, iterations=1)
    k = (lum / IRIS.mean())[..., None]
    out = p.copy()
    out[..., :3] = np.where(iris[..., None], np.clip(IRIS * k, 0, 255), rgb)
    return out, int(iris.sum())


ax, ay = brows(load(ANCHOR))
fits_path = K + 'jfk_rig/face/fits.json'
fits = json.load(open(fits_path))
for old, new in NEW.items():
    p = load(old)
    q, n = recolour(p)
    Image.fromarray(q.astype(np.uint8), 'RGBA').save(F + f'jfk_face_{new:02d}.png')
    bx, by = brows(p)
    x, y, k = AT
    fits[f'jfk_face_{new:02d}.png'] = [round(x + (ax - bx) * k), round(y + (ay - by) * k), k]
    print(f'{old} -> {new}: iris {n} px, fit {fits[f"jfk_face_{new:02d}.png"]}')
json.dump(fits, open(fits_path, 'w'), indent=1)
