"""The rest pose's own head as the master head (Van Helsing's, Javert's way):
rows 0..ROWS of pose A1, the sheet's white made clear from the border, with
one pixel more so no pale fringe rings the hair on a dark room.

  python3 art-tools/build/own_master.py art-tools/loki_parts loki 320
writes <kit>/<id>_face/<id>_master.png (pose_rig.json's master "piece").
"""
import sys, json
import numpy as np
from PIL import Image
from scipy import ndimage
kit, id_, rows = sys.argv[1], sys.argv[2], int(sys.argv[3])
P = json.load(open(f'{kit}/poses_found.json'))['A1']
x, y, w, h = P['box']
im = np.array(Image.open(f'{kit}/sources/poses_a.png').convert('RGB').crop((x, y, x + w, y + rows)))
white = im.min(2) > 205          # the sheet's white and the light fringe round the outline
lab, n = ndimage.label(white)
edge = set(lab[0]) | set(lab[-1]) | set(lab[:, 0]) | set(lab[:, -1])
bg = np.isin(lab, [l for l in edge if l])
bg = ndimage.binary_dilation(bg, iterations=1)   # and one pixel more: no pale halo
a = np.where(bg, 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([im, a])).save(f'{kit}/{id_}_face/{id_}_master.png')
print(im.shape)
