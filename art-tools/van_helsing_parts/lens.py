# His far lens reaches past his face, and the sheet's white shows through the
# glass there (a white patch beside his head on a dark room). Clears small pale
# patches that touch the clear background, in every image of the built puppet;
# the eye whites (inside the face's outline) and the collar and handkerchief
# (too big) are kept. Run after pose_rig.py, before web_half.py:
#   python3 art-tools/van_helsing_parts/lens.py
import glob, os
import numpy as np
from PIL import Image
from scipy import ndimage as nd
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MAX = 400                                             # px: a lens, never a collar or a handkerchief
total = 0
for p in sorted(glob.glob(os.path.join(ROOT, 'web', 'art', 'van_helsing', '*.png'))):
    im = np.array(Image.open(p).convert('RGBA'))
    if im.shape[0] < 20:
        continue
    c = im[..., :3].astype(int)
    clear = im[..., 3] < 20
    pale = ~clear & (c.min(axis=2) > 185) & (c.max(axis=2) - c.min(axis=2) < 70)
    lab, n = nd.label(pale)
    if not n:
        continue
    sizes = nd.sum(pale, lab, range(1, n + 1))
    touch = nd.binary_dilation(clear)
    hit = np.unique(lab[touch & pale])
    gone = np.isin(lab, [l for l in hit if l and sizes[l - 1] < MAX])
    if gone.any():
        im[gone, 3] = 0
        Image.fromarray(im).save(p, optimize=True)
        total += int(gone.sum())
print('lens: cleared', total, 'px')
