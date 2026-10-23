# The grin alone, turned to his face. The sheet drew the grin by itself front-on
# and level (C5, placed by hand onto his mouth: `reg` in rig_spec.json), but his
# face is at three-quarter: its grin runs high up the near cheek and dips toward
# the far side under the nose. Fading from his face to the grin, the two did
# not line up (the owner). This warps the drawn grin onto his face's own mouth
# line in the fade frame: its two corners onto the face's corners, its lowest
# point onto the face's, as deep as the face's grin (an affine: the near side
# wide, the far side narrow, as the face has it).
#   python3 art-tools/cheshire_cat_parts/grin.py      (after pose_rig.py, before web_half.py)
# Reads the level grin pose_rig.py made, kept as sources/grin_only_flat.png, so
# it can be run again; writes web/art/cheshire_cat/frame_grin_only.png.
import os
import numpy as np
from PIL import Image

K = os.path.dirname(os.path.abspath(__file__)) + '/'
OUT = os.path.dirname(os.path.dirname(K.rstrip('/'))) + '/web/art/cheshire_cat/frame_grin_only.png'
SRC = [[315, 205], [495, 203], [406.5, 269]]        # the level grin: left corner, right corner, lowest point
L, R, B = np.array([325, 183.]), np.array([438, 223.]), np.array([408, 240.])   # the face's, in frame_fade.png
DEPTH = 30                                           # the face's grin, chord to lip

g = Image.open(K + 'sources/grin_only_flat.png').convert('RGBA')
d = (R - L) / np.linalg.norm(R - L)
n = np.array([-d[1], d[0]])
foot = L + d * np.dot(B - L, d)
low = foot + n * DEPTH * np.sign(np.dot(B - foot, n))
X = np.hstack([np.array(SRC, float), np.ones((3, 1))])
M = np.linalg.solve(X, np.array([L, R, low])).T      # level grin -> his face
inv = np.linalg.inv(np.vstack([M, [0, 0, 1]]))
g.transform(g.size, Image.AFFINE, tuple(inv[:2].ravel()), resample=Image.BICUBIC).save(OUT)
print('wrote', OUT)
