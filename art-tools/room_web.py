#!/usr/bin/env python3
"""
room_web.py -- publish a room's art to the web build, with the numbers the
table screen needs to stage it.

  python3 art-tools/room_web.py [room]          (room: white_house)

Writes web/art/rooms/<room>/: the backdrop, copied as it is, and room.json.
The table is the same in every room (the owner's call): art-tools/rooms/
table.webp, published once as web/art/rooms/table.webp. Everything in room.json is in the screen's DESIGN space, the
1600x900 box mock_screen.py lays out (16:9; a wider screen shows more of the
room at the sides): where the table goes, the top edge of its far rim (the
table's alpha, sampled every few pixels: the browser cannot read pixels back
from art opened from disk, so the curve is worked out here), and the chairs:
each seat's centre, scale and mirror, and how far below the rim its table
line sits. The numbers are mock_screen.py's, so the mock and the game agree.
"""
import json, os, shutil, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
room = sys.argv[1] if len(sys.argv) > 1 else 'white_house'
SRC = os.path.join(HERE, 'rooms', room)
OUT = os.path.join(ROOT, 'web', 'art', 'rooms', room)
W, H = 1600, 900
TS, FAR, FAR_ART = 1.05, 0.50, 190      # table scale; the far rim (y 190 on the table art) at half height
STEP = 8

os.makedirs(OUT, exist_ok=True)
shutil.copyfile(os.path.join(SRC, 'backdrop.webp'), os.path.join(OUT, 'backdrop.webp'))
shutil.copyfile(os.path.join(HERE, 'rooms', 'table.webp'), os.path.join(ROOT, 'web', 'art', 'rooms', 'table.webp'))

bg = Image.open(os.path.join(SRC, 'backdrop.webp'))
table = Image.open(os.path.join(HERE, 'rooms', 'table.webp')).convert('RGBA')
tw, th = table.width * TS, table.height * TS
tx, ty = (W - tw) / 2, H * FAR - FAR_ART * TS
alpha = np.array(table)[..., 3]
rim = []
x = tx
while x <= tx + tw:
    col = min(table.width - 1, int((x - tx) / TS))
    ys = np.nonzero(alpha[:, col] > 0)[0]
    rim.append(round(ty + ys.min() * TS, 1) if len(ys) else None)
    x += STEP

# [centre x, scale, sink]: mirrored when right of centre (they face the middle).
# By seat number: the player is seat 0 at the bottom; play goes clockwise, so
# seat 1 is on the player's left and the last seat on their right.
SEATS = {'4': [[150, 0.52, 2], [470, 0.52, 2], [1130, 0.52, 2], [1440, 0.52, 2]]}
json.dump({
    'id': room,
    'design': [W, H],
    # a short screen may cut this much ceiling off the top (Lincoln's hat starts near 180)
    'crop': 140,
    'backdrop': {'img': 'backdrop.webp', 'h': H, 'w': round(bg.width * H / bg.height, 1)},
    'table': {'img': '../table.webp', 'x': round(tx, 1), 'y': round(ty, 1), 'w': round(tw, 1), 'h': round(th, 1)},
    'rim': {'x0': round(tx, 1), 'step': STEP, 'y': rim},
    'seats': SEATS,
    'dealer': [W / 2, 0.5, 2],
    # the deck under Death's right hand at rest, from his table line, in design px
    'deck': [45, 32],
}, open(os.path.join(OUT, 'room.json'), 'w'), separators=(',', ':'))
print('wrote', OUT)
