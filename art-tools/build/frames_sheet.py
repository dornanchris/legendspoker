"""A contact sheet of a built puppet's frames over its rest outline (magenta)
and table line (cyan), to check placement and leftovers of the drawn table.

  python3 art-tools/build/frames_sheet.py cerberus [scale] [frame ...]
Writes art-tools/<id>_parts/<id>_pose/frames_check.png.
"""
import json, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
cid = sys.argv[1]; sc = float(sys.argv[2]) if len(sys.argv) > 2 else 0.5
K = f'art-tools/{cid}_parts/'; D = K + f'{cid}_pose/'
spec = json.load(open(K + 'pose_rig.json'))
FM = spec.get('frame_margin', 60); ty = spec['table_y']
body = Image.open(D + 'body.png')
rest = Image.new('RGBA', (body.width + 2 * FM, body.height + 2 * FM), (0, 0, 0, 0))
for f in ['body.png', 'arm_near_rest.png', 'arm_far_rest.png', 'upper_near.png', 'upper_far.png']:
    try: rest.alpha_composite(Image.open(D + f), (FM, FM))
    except FileNotFoundError: pass
ra = np.array(rest)[..., 3] > 128
edge = ra ^ (np.array(Image.fromarray(ra.astype(np.uint8) * 255).filter(ImageFilter.MinFilter(3))) > 0)
names = sys.argv[3:] or list(spec['frames'])
W, H = rest.size; cols = min(6, len(names))
sheet = Image.new('RGB', (int(W * cols * sc), int(H * ((len(names) + cols - 1) // cols) * sc)), (30, 30, 40))
for i, n in enumerate(names):
    t = Image.new('RGBA', (W, H), (40, 40, 52, 255)); t.alpha_composite(Image.open(D + f'frame_{n}.png'))
    a = np.array(t); a[edge] = [255, 0, 255, 255]; t = Image.fromarray(a)
    d = ImageDraw.Draw(t); d.line([(0, ty + FM), (W, ty + FM)], fill=(0, 255, 255)); d.text((8, 8), n, fill=(255, 255, 0))
    sheet.paste(t.convert('RGB').resize((int(W * sc), int(H * sc))), (int((i % cols) * W * sc), int((i // cols) * H * sc)))
sheet.save(D + 'frames_check.png'); print(D + 'frames_check.png')
