"""Where a face sheet's master head lies on the rest pose: searches scale and
offset matching a reference region (rx, ry, rw, rh, in the pose box's own
pixels) and prints (difference, scale, x, y): the master's "place" in pose_rig.

  python3 art-tools/build/fit_master.py SHEET x,y,w,h MASTER rx ry rw rh k0 k1
"""
import sys, numpy as np
from PIL import Image
pose, box, master, rx, ry, rw, rh, k0, k1 = sys.argv[1], [int(v) for v in sys.argv[2].split(',')], sys.argv[3], *[int(v) for v in sys.argv[4:8]], float(sys.argv[8]), float(sys.argv[9])
x, y, w, h = box
P = np.array(Image.open(pose).convert('RGB').crop((x, y, x + w, y + h))).astype(float).mean(-1)
M0 = Image.open(master).convert('RGBA')
ref = P[ry:ry + rh, rx:rx + rw]; best = (1e9,)
for k in np.arange(k0, k1, 0.01):
    M = np.array(M0.resize((round(M0.width * k), round(M0.height * k)), Image.LANCZOS)).astype(float); L = M[..., :3].mean(-1); A = M[..., 3] > 200
    for Y in range(-120, 60):
        for X in range(-60, 300):
            u0, v0 = rx - X, ry - Y
            if u0 < 0 or v0 < 0 or u0 + rw > L.shape[1] or v0 + rh > L.shape[0]: continue
            a = A[v0:v0 + rh, u0:u0 + rw]
            if a.mean() < 0.95: continue
            d = np.abs(L[v0:v0 + rh, u0:u0 + rw] - ref)[a].mean()
            if d < best[0]: best = (d, round(k, 2), X, Y)
print(best)
