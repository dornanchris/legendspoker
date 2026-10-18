# Death's talking jaw as a player, made from his own master head so it sits
# exactly on it (the face sheet's jaw patches were drawn larger and covered the
# nose): the lower jaw, below the upper teeth, dropped 3 / 6 / 9 px, the gap
# behind it the dark of an open mouth.
#   41 parted, 42 open, 43 wide
# Writes master-sized pieces death_player_face_41..43 and their fits (exactly on
# the master) for face.json. Run after own_master.py, before pose_rig.py:
#   python3 art-tools/death_avatar_parts/jaw.py
import os, json
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
K = os.path.dirname(os.path.abspath(__file__)) + '/'
F = K + 'death_player_face/'
m = Image.open(F + 'death_player_master.png').convert('RGBA')
JAW = [(226, 141), (302, 141), (302, 172), (268, 177), (244, 171), (228, 157)]
mask = Image.new('L', m.size, 0)
ImageDraw.Draw(mask).polygon(JAW, fill=255)
a = np.array(m).astype(int)
bright = (a[..., :3].mean(-1) > 110) & (a[..., 3] > 200)
skull = ndimage.binary_fill_holes(ndimage.binary_closing(bright, iterations=4))   # bone, its teeth gaps and shading inside
BONE = (np.array(mask) > 0) & skull                              # the jaw, not the hood beside it
jm = Image.fromarray((BONE * 255).astype(np.uint8))
jaw = Image.new('RGBA', m.size, (0, 0, 0, 0))
jaw.paste(m, (0, 0), jm)
fits = {}
for n, drop in ((41, 3), (42, 6), (43, 9)):
    o = m.copy()
    gap = np.zeros((m.height, m.width, 4), np.uint8)              # the mouth's dark, where the jaw's bone was
    gap[BONE] = (34, 22, 26, 255)
    o.alpha_composite(Image.fromarray(gap))
    o.alpha_composite(jaw, (0, drop))
    o.save(F + f'death_player_face_{n}.png')
    fits[f'death_player_face_{n}.png'] = [0, 0, 1.0]
os.makedirs(K + 'death_player_rig/face', exist_ok=True)
json.dump(fits, open(K + 'death_player_rig/face/fits.json', 'w'), indent=1)
print('jaw 41-43')
