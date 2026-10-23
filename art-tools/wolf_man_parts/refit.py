# The Wolf Man's mouth patches, refitted by the snout. Each patch is a whole
# muzzle (nose, whisker pad, jaw), and face_rig's matcher, fitting the whole
# patch, put them at scales from 0.63 to 0.84: as he spoke his snout changed
# size, and a second nose and a second row of whisker dots showed beside his
# own. Here each is placed by its upper snout alone (the nose and the whisker
# pad, which the open mouths do not change) against the master, and the fits
# are written to wolf_man_rig/face/fits.json. Then face_rig (face.json keeps
# the mouth region off the nose) bakes them:
#   python3 art-tools/wolf_man_parts/refit.py
#   (cd art-tools && python3 face_rig.py wolf_man_parts/face.json wolf_man_parts/wolf_man_rig/face)
import os, json, sys
import numpy as np
from PIL import Image

K = os.path.dirname(os.path.abspath(__file__)) + '/'
sys.path.insert(0, os.path.dirname(K.rstrip('/')))
import face_rig

F = K + 'wolf_man_face/'
master = Image.open(F + 'wolf_man_master.png').convert('RGBA')
R = np.array(master).astype(float)
fits_path = K + 'wolf_man_rig/face/fits.json'
fits = json.load(open(fits_path))
for i in range(9, 19):
    name = f'wolf_man_face_{i:02d}.png'
    P = Image.open(F + name).convert('RGBA')
    # the upper snout: the right half, above the mouth
    cx0, cy0 = int(P.width * 0.5), 0
    crop = P.crop((cx0, cy0, P.width, int(P.height * 0.42)))
    old = fits.get(name, [300, 160, 0.7])
    _, x, y, k = face_rig._search(R, crop, np.arange(0.56, 0.86, 0.01),
                                  range(int(old[0] + cx0 * 0.4), int(old[0] + cx0 * 1.0)), range(150, 215))
    fits[name] = [int(round(x - cx0 * k)), int(round(y - cy0 * k)), round(float(k), 3)]
    print(name, 'was', old, 'now', fits[name])
json.dump(fits, open(fits_path, 'w'), indent=1)
