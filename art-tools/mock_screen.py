#!/usr/bin/env python3
"""
mock_screen.py -- a game-first mock of the table screen, to check that the
art leaves room for the game.

The screen is laid out for 16:9, the narrowest phone we support; wider phones
see more backdrop at the sides and nothing else changes. Back to front:
backdrop, the players' bodies, the table (its far rim across their waists),
their forearms and hands on the felt, then the game: name plates, bets, pot,
board, your cards, the buttons. Death is front-on, dead centre.

  python3 art-tools/mock_screen.py [room] [-o out.png]     (room: white_house)

The seats use the FDR and Lincoln puppets, which are front-on examples; the
real cast is drawn at three-quarter, which is narrower.
"""
import argparse, copy, json, os, subprocess, tempfile
import numpy as np
from PIL import Image, ImageOps, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ap = argparse.ArgumentParser(); ap.add_argument('room', nargs='?', default='white_house'); ap.add_argument('-o', '--out', default=None)
A = ap.parse_args()
ROOM = os.path.join(HERE, 'rooms', A.room)
S = tempfile.mkdtemp()
C = {}
g = lambda k, d: C.get(k, d)
W, H = 1600, 900
def F(n, b=False):
    for f in ('DejaVuSans%s.ttf' % ('-Bold' if b else ''), 'arial%s.ttf' % ('bd' if b else '')):
        try: return ImageFont.truetype(f, n)
        except OSError: pass
    return ImageFont.load_default()

bg = Image.open(os.path.join(ROOM, 'backdrop.webp')).convert('RGBA')
s = H / bg.height; bg = bg.resize((int(bg.width * s), H), Image.LANCZOS)
bg = bg.crop(((bg.width - W) // 2, 0, (bg.width - W) // 2 + W, H))

table = Image.open(os.path.join(ROOM, 'table.webp')).convert('RGBA')
TS = g('ts', 1.05); FAR = g('far', 0.50)   # table scale; far rim (y 190 on the table art) at half height
tw, th = int(table.width * TS), int(table.height * TS); table = table.resize((tw, th), Image.LANCZOS)
tl = Image.new('RGBA', (W, H), (0, 0, 0, 0)); tl.alpha_composite(table, ((W - tw) // 2, int(H * FAR) - int(190 * TS)))
ta = np.array(tl)[..., 3]
def rim(x):
    ys = np.nonzero(ta[:, max(0, min(W - 1, int(x)))] > 0)[0]; return int(ys.min()) if len(ys) else H

def passes(layout):
    L = json.load(open(os.path.join(HERE, layout))); L['background'] = [0, 0, 0, 0]
    u, o = copy.deepcopy(L), copy.deepcopy(L)
    for a, b in zip(u['parts'], o['parts']):
        sl = a.get('slot') or ''; arm = sl.startswith(('forearm', 'arm_', 'hand'))
        a['file'] = b['file'] = os.path.join(HERE, a['file'])
        if sl in ('table', 'hat'): a['visible'] = b['visible'] = False
        elif arm: a['visible'] = False
        else: b['visible'] = False
    out = []
    for k, v in (('u', u), ('o', o)):
        json.dump(v, open(f'{S}/sm_{k}.json', 'w'))
        subprocess.run(['python3', os.path.join(HERE, 'build_puppet.py'), 'render', f'{S}/sm_{k}.json', '-o', f'{S}/sm_{k}.png'], check=True, capture_output=True)
        out.append(Image.open(f'{S}/sm_{k}.png').convert('RGBA'))
    return out
LINE = {'fdr_layout.json': 810, 'lincoln_layout.json': 880, 'death_layout.json': 810}   # each layout's table line
cache = {l: passes(l) for l in LINE}

under = Image.new('RGBA', (W, H), (0, 0, 0, 0)); over = Image.new('RGBA', (W, H), (0, 0, 0, 0))
def seat(lay, cx, sc, flip, sink=10):
    y = rim(cx) + sink
    for layer, im in zip((under, over), cache[lay]):
        im = ImageOps.mirror(im) if flip else im
        im = im.resize((int(im.width * sc), int(im.height * sc)), Image.LANCZOS)
        layer.alpha_composite(im, (int(cx - im.width / 2), int(y - LINE[lay] * sc)))
    return y

# Death deals from the far side, front-on and dead centre
def death(cx, sc):
    return seat('death_layout.json', cx, sc, False, 4)

SEATS = g('seats', [['fdr_layout.json', 150, 0.36, False], ['lincoln_layout.json', 470, 0.30, False],
                    ['fdr_layout.json', 1130, 0.30, True], ['lincoln_layout.json', 1450, 0.36, True]])
ys = [seat(*s_) for s_ in SEATS]
dy = death(W // 2, g('death', 0.34))

c = bg.copy(); c.alpha_composite(under); c.alpha_composite(tl); c.alpha_composite(over)
d = ImageDraw.Draw(c)
def plate(x, y, t1, t2, w=150, hot=False):
    d.rounded_rectangle((x - w // 2, y, x + w // 2, y + 44), 10, fill=(18, 16, 20, 215), outline=(214, 170, 90, 255) if hot else (90, 80, 70, 255), width=2)
    d.text((x, y + 13), t1, font=F(15, True), fill=(240, 230, 210), anchor='mm'); d.text((x, y + 31), t2, font=F(14), fill=(214, 190, 120), anchor='mm')
def card(x, y, r, suit, w=70, red=False, back=False):
    h = int(w * 1.4)
    if back:
        d.rounded_rectangle((x, y, x + w, y + h), 7, fill=(120, 30, 34), outline=(240, 230, 210), width=3); return
    d.rounded_rectangle((x, y, x + w, y + h), 7, fill=(250, 247, 240), outline=(40, 40, 40), width=2)
    col = (190, 30, 40) if red else (25, 25, 25)
    d.text((x + 8, y + 4), r, font=F(int(w * 0.36), True), fill=col); d.text((x + w // 2, y + h * 0.62), suit, font=F(int(w * 0.5)), fill=col, anchor='mm')
def chips(x, y, amt):
    for k in range(3): d.ellipse((x - 14, y - 6 - k * 5, x + 14, y + 6 - k * 5), fill=(160, 30, 36), outline=(250, 240, 220), width=2)
    d.text((x + 22, y - 12), amt, font=F(14, True), fill=(250, 240, 220))

names = [('F. D. Roosevelt', '2,140', '10'), ('Lincoln', '1,860', ''), ('Roosevelt', '2,300', '20'), ('Washington', '1,700', '')]
for (lay, cx, sc, fl), y, (n, st, bet) in zip(SEATS, ys, names):
    plate(cx, y + 18, n, st, hot=(n == 'Lincoln'))
    if bet: chips(cx + (60 if cx < W / 2 else -60), y + 96, bet)
# dealer plate, pot and board
plate(W // 2, dy + 44, 'Death', 'the dealer', w=130)   # below his hands
d.text((W // 2, 600), 'POT  60', font=F(20, True), fill=(250, 240, 220), anchor='mm')
x0 = W // 2 - (5 * 78 - 8) // 2
for i, (r, su, red) in enumerate([('A', '♠', False), ('J', '♥', True), ('7', '♣', False), ('Q', '♦', True)]):
    card(x0 + i * 78, 620, r, su)
d.rounded_rectangle((x0 + 4 * 78, 620, x0 + 4 * 78 + 70, 718), 7, outline=(250, 240, 220, 120), width=2)
# a callout bubble, and the table bar
d.rounded_rectangle((330, 150, 560, 196), 12, fill=(250, 247, 240), outline=(30, 30, 30), width=2)
d.text((445, 173), '"I\'ll see that."', font=F(16), fill=(30, 30, 30), anchor='mm')
d.rounded_rectangle((12, 10, 420, 46), 10, fill=(18, 16, 20, 200))
d.text((24, 28), 'The White House  ·  Blinds 10/20  ·  Hand 7', font=F(16), fill=(240, 230, 210), anchor='lm')
d.rounded_rectangle((W - 118, 10, W - 12, 46), 10, fill=(18, 16, 20, 200)); d.text((W - 65, 28), 'Log  ☰', font=F(16), fill=(240, 230, 210), anchor='mm')
# you: cards at the bottom centre, name and stack to their left
card(W // 2 - 88, 760, 'K', '♠', w=84); card(W // 2 + 4, 760, 'K', '♥', w=84, red=True)
plate(W // 2 - 190, 800, 'You', '2,000', w=130)
# controls, bottom right
for i, (t, col) in enumerate([('Fold', (120, 40, 40)), ('Call 20', (60, 90, 60)), ('Raise', (150, 110, 40))]):
    x = W - 470 + i * 152
    d.rounded_rectangle((x, 810, x + 140, 874), 12, fill=col + (235,), outline=(240, 220, 170), width=2)
    d.text((x + 70, 842), t, font=F(20, True), fill=(250, 245, 235), anchor='mm')
d.rounded_rectangle((20, 834, 80, 874), 10, fill=(18, 16, 20, 200)); d.text((50, 854), '▶▶', font=F(16), fill=(240, 230, 210), anchor='mm')
out = A.out or os.path.join(ROOM, 'screen_mock.png')
c.convert('RGB').save(out)
print('mock ->', out)
