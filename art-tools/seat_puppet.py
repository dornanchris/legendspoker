#!/usr/bin/env python3
"""
seat_puppet.py -- lay out a three-quarter character seated at the table.

Every opponent is built the same way (Lincoln was the first): a three-quarter
torso whose sleeves already hang down to the table, a head, and two forearms
that start at the elbows (the torso's sides, at the table's edge) and lie on
the felt, hands toward the table's centre. This
turns a small spec into the layout, so a new character is a few numbers, not
a new script.

  python3 art-tools/seat_puppet.py art-tools/roosevelt_parts/seat.json

It writes, next to the spec:
  <id>_rig/sleeve_N.png   the arm pieces with their cuffs trimmed off, and
  <id>_rig/cuffs.json     where each cuff was: a hand's own cuff goes there
  preview.png             the rest pose
and art-tools/<id>_layout.json (render it with build_puppet.py).

Why the cuffs are trimmed: the sleeves are drawn with their openings toward
the camera while the hands point at the table's centre, so a sleeve's cuff
and a hand's cuff can never line up. The hand's cuff finishes the sleeve.

The spec (all piece numbers are from the character's parts.json):
  id, pieces        "roosevelt", "roosevelt_parts/roosevelt/roosevelt_%02d.png"
  torso, head       piece numbers; "head_flip": true if the head faces left;
                    "head_behind": true draws it under the torso, so the
                    torso's collar covers a collar painted on the head;
                    "collar": 0.12 instead draws the head in front and the
                    torso again over it from that fraction of its height
                    down, so the collar wraps round a painted-on neck (the
                    way Death's cape wraps round his hood)
  heads             other head pieces, as swaps
  near, far         [forearm, hand] pairs: straight forearms, open end up
  hands             other hand pieces, as swaps
  cuff              "white" (a shirt cuff or lace marks the sleeve's end) or
                    "band" (no white: the whole band and opening are trimmed)
  tune              scales and offsets; see DEFAULTS
"""
import json, math, os, subprocess, sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
W, H, TABLE = 1100, 1040, 880
DEFAULTS = dict(
    kt=2.6, tx=520, tyb=TABLE + 60,          # torso scale, centre x, bottom edge
    kh=1.95, hdx=35, neck=70,                # head scale, offset right, sink into collar
    ka=2.1, kha=1.2,                         # forearm and hand scales
    ne=40, fe=40, ey=-6,                     # elbows: inset from the torso's left / right edge, height vs table
    nr=20, nhr=25, fr=28, fhr=32,            # near / far forearm and hand rotations (degrees)
    hsx=0, hsy=0,                            # nudge both hands along their cuffs
)


def biggest(m):
    lab, n = ndimage.label(m)
    if n == 0:
        return m
    sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
    return lab == np.argmax(sizes) + 1


def trim_sleeve(src, dst, mode):
    """Cut the cuff off a sleeve piece; return where it was (x, y)."""
    a = np.array(Image.open(src).convert('RGBA'))
    rgb, A = a[..., :3].astype(int), a[..., 3] > 250
    if mode == 'white':
        seed = biggest(A & (rgb.min(-1) > 190))
        near = ndimage.binary_dilation(seed, iterations=30)
        region = seed | (A & near & ((rgb[..., 0] - rgb[..., 2] > 18) | (rgb.min(-1) > 120)))
    else:   # band: the bright opening, and the dark band around it
        seed = biggest(A & (rgb[..., 0] > 190) & (rgb[..., 0] - rgb[..., 2] > 45))
        near = ndimage.binary_dilation(seed, iterations=22)
        region = seed | (A & near & (rgb.max(-1) < 90))
    ys, xs = np.nonzero(region)
    from scipy.spatial import ConvexHull
    pts = np.c_[xs, ys]
    hull = pts[ConvexHull(pts).vertices]
    m = Image.new('L', (A.shape[1], A.shape[0]), 0)
    ImageDraw.Draw(m).polygon([tuple(p) for p in hull], fill=255)
    cut = ndimage.binary_dilation(np.array(m) > 0, iterations=5)
    out = a.copy()
    out[..., 3] = np.where(cut, 0, a[..., 3])
    out[..., 3] = np.where(biggest(out[..., 3] > 0), out[..., 3], 0)
    Image.fromarray(out, 'RGBA').save(dst)
    sy, sx = np.nonzero(seed if mode == 'white' else region)
    return float(sx.mean()), float(sy.mean())


def hand_anchor(path, mode):
    """Where a hand's own cuff is, in its image."""
    a = np.array(Image.open(path).convert('RGBA'))
    rgb, A = a[..., :3].astype(int), a[..., 3] > 200
    if mode == 'white':
        m = A & (rgb.min(-1) > 205)
    else:   # the sleeve stub: the darker cloth, not the skin
        m = biggest(ndimage.binary_opening(A & (rgb.mean(-1) < 150), iterations=2))
    ys, xs = np.nonzero(m)
    return float(xs.mean()), float(ys.mean())


def main(spec_path):
    spec = json.load(open(spec_path))
    t = dict(DEFAULTS, **spec.get('tune', {}))
    pdir = os.path.dirname(os.path.abspath(spec_path))
    rig = os.path.join(pdir, f"{spec['id']}_rig")
    os.makedirs(rig, exist_ok=True)
    P = spec['pieces']
    F = lambda i: i if isinstance(i, str) else P % i
    path = lambda f: os.path.join(HERE, f)
    size = lambda f: Image.open(path(F(f))).size
    parts = []
    names = {q['file']: q['label'] for q in json.load(open(path(os.path.join(os.path.dirname(P), 'parts.json'))))['parts']}
    name = lambda f, extra='': (names.get(os.path.basename(F(f))) or '') + extra

    def put(f, cx, cy, s, rot=0, z=0, label='', visible=True, flip=False, slot=None, on_table=False):
        w, h = size(f)
        w, h = w * s, h * s
        if rot:
            r = math.radians(rot)
            w, h = abs(w * math.cos(r)) + abs(h * math.sin(r)), abs(w * math.sin(r)) + abs(h * math.cos(r))
        d = {'file': F(f), 'label': label, 'x': round(cx - w / 2), 'y': round(cy - h / 2),
             'scale': round(s, 3), 'rot': rot, 'z': z, 'visible': visible, 'slot': slot}
        if flip: d['flip'] = True
        if on_table: d['on_table'] = True
        parts.append(d)

    def placed(f, s, rot, cx, cy, at, flip=False):
        """Canvas position of image point `at` of a part placed as given."""
        w, h = size(f)
        ax = w - at[0] if flip else at[0]
        dx, dy = (ax - w / 2) * s, (at[1] - h / 2) * s
        r = math.radians(rot)
        return cx + dx * math.cos(r) + dy * math.sin(r), cy - dx * math.sin(r) + dy * math.cos(r)

    # torso, then the head on it
    tw, th = size(spec['torso'])
    ty = t['tyb'] - th * t['kt'] / 2
    put(spec['torso'], t['tx'], ty, t['kt'], z=10, label='torso, three-quarter', slot='torso',
        flip=spec.get('torso_flip', False))
    hw, hh = size(spec['head'])
    hx, hy = t['tx'] + t['hdx'], ty - th * t['kt'] / 2 - hh * t['kh'] / 2 + t['neck']
    hz = 8 if spec.get('head_behind') else 20
    for i in [spec['head']] + spec.get('heads', []):
        put(i, hx, hy, t['kh'], z=hz, label=name(i, '' if i == spec['head'] else ' (swap)'),
            visible=i == spec['head'], slot='head', flip=spec.get('head_flip', False))
    if 'collar' in spec:
        put(spec['torso'], t['tx'], ty, t['kt'], z=21, label='torso again: its collar over the neck',
            slot='torso_over', flip=spec.get('torso_flip', False))
        parts[-1]['clip_top'] = round(ty - th * t['kt'] / 2 + spec['collar'] * th * t['kt'])
        parts[-1]['clip_feather'] = t.get('feather', 14)

    # forearms: start at the elbows, at the torso's sides where the table's
    # edge crosses them, and lie on the felt; hands sit on their cuffs
    tm = np.array(Image.open(path(F(spec['torso']))).convert('RGBA'))[..., 3] > 128
    row = int(np.clip((TABLE - (ty - th * t['kt'] / 2)) / t['kt'], 0, th - 1))
    xs = np.nonzero(tm[row])[0]
    left, right = t['tx'] + (xs.min() - tw / 2) * t['kt'], t['tx'] + (xs.max() - tw / 2) * t['kt']
    cuffs = {}
    def arm(pair, ex, ar, hr, z, side):
        ai, hi = pair
        sl = f"{spec['id']}_parts/{spec['id']}_rig/sleeve_{ai}.png"
        at = trim_sleeve(path(F(ai)), path(sl), spec.get('cuff', 'white'))
        cuffs[ai] = [round(v, 1) for v in at]
        m = np.array(Image.open(path(sl)))[..., 3] > 128
        ys, xs2 = np.nonzero(m)
        d = np.hypot(xs2 - at[0], ys - at[1])
        far_end = d > d.max() * 0.85                       # the open end: the elbow
        elbow = (float(xs2[far_end].mean()), float(ys[far_end].mean()))
        ox, oy = placed(sl, t['ka'], ar, 0, 0, elbow)
        ax, ay = ex - ox, TABLE + t['ey'] - oy
        put(sl, ax, ay, t['ka'], rot=ar, z=z, label=f'{side} forearm (cuff trimmed off)',
            slot=f'arm_{side}', on_table=True)
        ux, uy = placed(sl, t['ka'], ar, ax, ay, at)
        vx, vy = placed(hi, t['kha'], hr, 0, 0, hand_anchor(path(F(hi)), spec.get('cuff', 'white')))
        put(hi, ux - vx + t['hsx'], uy - vy + t['hsy'], t['kha'], rot=hr, z=z + 1,
            label=f'{side} hand (its cuff finishes the sleeve)', slot=f'hand_{side}', on_table=True)
    arm(spec['far'], right - t['fe'], t['fr'], t['fhr'], 4, 'far')
    arm(spec['near'], left + t['ne'], t['nr'], t['nhr'], 6, 'near')
    for side in ('near', 'far'):
        base = next(q for q in parts if q['slot'] == f'hand_{side}')
        for i in spec.get('hands', []):
            if F(i) != base['file']:
                parts.append(dict(base, file=F(i), visible=False, label=name(i, ' (swap; place per pose)')))
    json.dump({'note': "Where each sleeve's cuff was, in the sleeve image's own pixels: a hand's cuff goes here.",
               'cuffs': cuffs}, open(os.path.join(rig, 'cuffs.json'), 'w'), indent=1)

    parts.append({'file': 'rooms/table_preview.png', 'label': 'table (preview only, not a part)', 'x': 0,
                  'y': TABLE, 'scale': 1.0, 'rot': 0, 'z': 25, 'visible': True, 'slot': 'table'})
    layout = {'canvas': {'w': W, 'h': H}, 'background': [18, 18, 22, 255], 'table_line': TABLE,
              'note': f"{spec.get('name', spec['id'])}, three-quarter facing right (a seat on the table's "
                      f"left; flip for the right). Built by seat_puppet.py from {os.path.relpath(spec_path, HERE)}. "
                      "Parts sharing a slot are swaps (one visible).",
              'parts': parts}
    out = os.path.join(HERE, f"{spec['id']}_layout.json")
    json.dump(layout, open(out, 'w'), indent=1)
    subprocess.run([sys.executable, os.path.join(HERE, 'build_puppet.py'), 'render', out,
                    '-o', os.path.join(pdir, 'preview.png')], check=True, capture_output=True)
    print(f"{spec['id']}: layout -> {out}")


if __name__ == '__main__':
    main(sys.argv[1])
