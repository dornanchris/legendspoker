"""Find every pose's box on a kit's four pose sheets (3 across, 2 down each)
and write a scaffold: <kit>/poses_found.json, {"A1": {"sheet": "A", "box":
[x, y, w, h]}, ...}. A drawing that reaches into the next cell (ears, a
mitre) is kept with the cell its middle sits in.

  python3 art-tools/build/pose_boxes.py art-tools/scipio_parts
Then:  python3 art-tools/build/corner_regs.py art-tools/scipio_parts
"""
import json, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage
kit = sys.argv[1].rstrip('/')
out = {}
for sh in 'ABCD':
    if not os.path.exists(f'{kit}/sources/poses_{sh.lower()}.png'):
        continue                 # three sheets (the finale's dealer and avatars)
    im = np.array(Image.open(f'{kit}/sources/poses_{sh.lower()}.png').convert('RGB')).astype(int)
    H, W, _ = im.shape
    fg = im.min(2) < 235
    lab, n = ndimage.label(fg)
    sizes = ndimage.sum(fg, lab, range(1, n + 1))
    boxes = {}
    for i, sl in enumerate(ndimage.find_objects(lab)):
        if sizes[i] < 30:
            continue
        ys, xs = sl
        c, r = int(((xs.start + xs.stop) / 2) // (W / 3)), int(((ys.start + ys.stop) / 2) // (H / 2))
        k = f'{sh}{r * 3 + c + 1}'
        b = [xs.start, ys.start, xs.stop, ys.stop]
        o = boxes.get(k)
        boxes[k] = b if o is None else [min(o[0], b[0]), min(o[1], b[1]), max(o[2], b[2]), max(o[3], b[3])]
    for k, b in sorted(boxes.items()):
        out[k] = {'sheet': sh, 'box': [int(b[0]), int(b[1]), int(b[2] - b[0]), int(b[3] - b[1])]}
json.dump(out, open(f'{kit}/poses_found.json', 'w'), indent=1)
print(len(out), 'poses ->', f'{kit}/poses_found.json')
