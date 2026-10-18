# The Horseman's speech: his own carved mouth glowing brighter, three steps, so
# the carving never changes shape (the face sheet's glowing mouths are carved a
# little differently). Writes master-sized pieces glow_01..03 and their fits
# (exactly on the master), for face.json. Run after own_master.py, before
# pose_rig.py:
#   python3 art-tools/headless_horseman_parts/glow.py
import os, json
import numpy as np
from PIL import Image
from scipy import ndimage
K = os.path.dirname(os.path.abspath(__file__)) + '/'
F = K + 'headless_horseman_face/'
m = np.array(Image.open(F + 'headless_horseman_master.png').convert('RGBA')).astype(float)
x0, y0, x1, y1 = 215, 72, 340, 160                       # the eyes and mouth (face.json's region)
r, g, b = m[..., 0], m[..., 1], m[..., 2]
lit = (r > 170) & (g > 80) & (r > b + 80)                 # the candlelight in the carving
box = np.zeros(lit.shape, bool); box[y0:y1, x0:x1] = True
lit &= box
w = np.clip((r + g - 250) / 200, 0, 1) * lit                # brighter inside, more
bloom = ndimage.gaussian_filter(lit.astype(float), 3) * box  # light on the rim of the cut
hot = np.array([255, 226, 120.0])
fits = {}
for i, t in enumerate([0.25, 0.45, 0.7], 1):
    o = m.copy()
    k = np.clip(w * t + bloom * t * 0.35, 0, 1)[..., None]
    o[..., :3] = o[..., :3] * (1 - k) + hot * k
    Image.fromarray(o.astype(np.uint8), 'RGBA').save(F + f'glow_{i:02d}.png')
    fits[f'glow_{i:02d}.png'] = [0, 0, 1.0]
os.makedirs(K + 'headless_horseman_rig/face', exist_ok=True)
p = K + 'headless_horseman_rig/face/fits.json'
old = json.load(open(p)) if os.path.exists(p) else {}
old.update(fits)
json.dump(old, open(p, 'w'), indent=1)
print('3 glows')
