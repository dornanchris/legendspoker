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

A room may have pieces (art-tools/rooms/<room>/pieces.json): cut from a
sheet on white, each the components wholly inside its box (or, with "crop",
everything inside it, cut where the box cuts; with "bright": [r, g], only
the bright fire inside it: Camelot's hearth frames drew the whole fireplace;
"flip" mirrors it; "keep_box" keeps the whole box, so a loop's frames cut
at one size line up; "feather" softens the edge by that many px), written as PNGs
beside the backdrop, with where they stand in design space. `presence` names
the piece shown until the table's late champion arrives and the one after;
`loops` cycle frames (lamp flames) at each of their spots.
"after_backdrop" names a second backdrop, the same room drawn after the champion
has come (the Station's turn: lamps off, amber emergency light), drawn in place
of the first once the presence is 'after'. "turn" is what the room does as the
champion comes, seen live (lights failing, chips floating, a loop sinking to
embers, undone when the champion goes out), and "acts" the lines the whole room
acts (a freeze): both are passed through to room.json (RoomData in cast.ts).
"""
import json, os, shutil, sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd

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
# a room for a heads-up table gives its own chairs in pieces.json ("seats":
# {"1": [[x, scale, sink]]}); the finale also names its dealer ("dealer_id",
# "dealer_name": Pravuil, while Death plays), swaps figures ("cast": Death as
# a player) and seats the player ("you": [x, scale, sink], "you_as")
_spec = json.load(open(os.path.join(SRC, 'pieces.json'))) if os.path.exists(os.path.join(SRC, 'pieces.json')) else {}
SEATS = {**SEATS, **_spec.get('seats', {})}
def cut_pieces():
    spec_file = os.path.join(SRC, 'pieces.json')
    if not os.path.exists(spec_file):
        return {}
    spec = json.load(open(spec_file))
    if not spec.get('sheet'):                              # a room with no loose pieces (only its seats)
        return {}
    sheet = np.array(Image.open(os.path.join(SRC, spec['sheet'])).convert('RGB'))
    fg = sheet.astype(int).min(axis=2) < 235
    lab, _ = nd.label(fg, structure=np.ones((3, 3)))
    boxes = nd.find_objects(lab)
    out = {}
    for name, p in spec['pieces'].items():
        x0, y0, x1, y1 = p['box']
        keep = [i + 1 for i, b in enumerate(boxes) if b and b[1].start >= x0 and b[1].stop <= x1 and b[0].start >= y0 and b[0].stop <= y1]
        # the components and what they enclose, but never the sheet's own white
        # showing through a loop (a cup's handle)
        own = np.isin(lab, keep)
        mask = nd.binary_fill_holes(own) & (own | (sheet.min(axis=2) < 240))
        inbox = np.zeros(fg.shape, bool)
        inbox[y0:y1, x0:x1] = True
        if p.get('crop'):                                  # all of it inside the box, cut where the box cuts (a
            mask = nd.binary_fill_holes(fg & inbox)        # candle's flame, without the candle under it)
        if 'bright' in p:                                  # only the fire in a drawn hearth: red and green above
            rr, gg, bb = (list(p['bright']) + [200])[:3]   # these (and blue below the third, if given: never the
            s_ = sheet.astype(int)                         # smoke over the Pyre's nest), in pieces of 200 px or more
            hot = (s_[..., 0] > rr) & (s_[..., 1] > gg) & (s_[..., 2] < bb) & inbox   # (never the sheet's white)
            hl, hn = nd.label(hot)
            sizes = nd.sum(hot, hl, range(1, hn + 1))
            hot = np.isin(hl, 1 + np.nonzero(sizes >= 200)[0])
            mask = nd.binary_dilation(nd.binary_fill_holes(hot)) & inbox
        ys, xs = np.nonzero(mask)
        t, b_, l, r = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
        if p.get('keep_box'):                              # the whole box, not trimmed to what is in it: the
            l, t, r, b_ = x0, y0, x1, y1                   # frames of a loop cut at one size line up (the Pyre's embers)
        alpha = Image.fromarray((mask[t:b_, l:r] * 255).astype('uint8'))
        if p.get('feather'):                               # a soft edge, for a glow laid over the backdrop's own
            alpha = alpha.filter(ImageFilter.GaussianBlur(p['feather']))
        rgba = np.dstack([sheet[t:b_, l:r], np.array(alpha)])
        if p.get('flip'):                                  # drawn facing the wrong way (Dracula's chair)
            rgba = rgba[:, ::-1]
        Image.fromarray(rgba, 'RGBA').save(os.path.join(OUT, name + '.png'), optimize=True)
        piece = {'img': name + '.png', 'aspect': round((r - l) / (b_ - t), 4)}
        if 'x' in p:
            piece.update(x=p['x'], bottom=p['bottom'], h=p['h'])
        out[name] = piece
    res = {'pieces': out, 'presence': spec.get('presence'), 'loops': spec.get('loops', [])}
    for key in ('turn', 'acts'):                          # what the room does as its champion comes, and lines it acts
        if spec.get(key):
            res[key] = spec[key]
    if spec.get('after_backdrop'):                         # the same room once the champion has come (the Station's turn)
        shutil.copyfile(os.path.join(SRC, spec['after_backdrop']), os.path.join(OUT, spec['after_backdrop']))
        res['backdropAfter'] = spec['after_backdrop']
    return res

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
    **{k: _spec[j] for j, k in (('dealer_id', 'dealerId'), ('dealer_name', 'dealerName'), ('cast', 'cast'),
                                ('you', 'you'), ('you_as', 'youAs')) if j in _spec},
    **cut_pieces(),
}, open(os.path.join(OUT, 'room.json'), 'w'), separators=(',', ':'))
print('wrote', OUT)
