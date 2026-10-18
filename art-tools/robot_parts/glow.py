# The Robot's speech: its own speaker grille lighting up, three steps, so the
# grille never changes shape (the face sheet's grille strips fit the head at
# another size). Writes master-sized pieces robot_face_31..33 and their fits (exactly
# on the master), for face.json. Run after own_master.py, before pose_rig.py:
#   python3 art-tools/robot_parts/glow.py
import os, json
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
K = os.path.dirname(os.path.abspath(__file__)) + '/'
F = K + 'robot_face/'
m = np.array(Image.open(F + 'robot_master.png').convert('RGBA')).astype(float)
mask = Image.new('L', (m.shape[1], m.shape[0]), 0)
ImageDraw.Draw(mask).polygon([(266, 159), (314, 159), (312, 178), (279, 178), (266, 175)], fill=255)
inside = ndimage.binary_erosion(np.array(mask) > 0, iterations=1)
lum = m[..., :3].mean(-1)
slot = inside & (lum < 28)                                  # the dark slots between the bars
w = np.clip((40 - lum) / 30, 0, 1) * slot                   # darkest glow most
bars = inside & ~slot
hot = np.array([255, 196, 92.0])
fits = {}
for i, t in enumerate([0.45, 0.7, 0.95], 1):
    o = m.copy()
    k = (w * t)[..., None]
    o[..., :3] = o[..., :3] * (1 - k) + hot * k
    tint = (bars * t * 0.25)[..., None]                     # the bars catch a little of the light
    o[..., :3] = o[..., :3] * (1 - tint) + np.array([230, 150, 70.0]) * tint
    Image.fromarray(o.astype(np.uint8), 'RGBA').save(F + f'robot_face_{30 + i:02d}.png')
    fits[f'robot_face_{30 + i:02d}.png'] = [0, 0, 1.0]
os.makedirs(K + 'robot_rig/face', exist_ok=True)
p = K + 'robot_rig/face/fits.json'
old = json.load(open(p)) if os.path.exists(p) else {}
old.update(fits)
json.dump(old, open(p, 'w'), indent=1)
print('3 glows')
