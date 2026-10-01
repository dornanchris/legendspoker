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
  heads             other head pieces, as swaps; [piece, dx, dy, scale] places
                    one by the rest head's own pixels (its top-left at dx, dy,
                    drawn at that scale), for a head from another sheet
  head_align        "back" lines the swaps up by the back of the head rather
                    than centring their boxes (for heads with a prop sticking
                    out in front, like FDR's holder)
  hat               "from_head": a black hat drawn on the rest head is lifted
                    off it into <id>_rig/hat.png, a hidden part in slot "hat"
                    exactly where it sits, so a bare head plus the hat can tip it
  head_clothes      true if the heads were drawn with shoulders of the suit
                    under them: the dark cloth reaching a head piece's edge
                    below its chin is cut off (into <id>_rig/head_N.png), and
                    the torso's own collar and lapels take its place. true
                    takes bluish or grey cloth; "dark" any dull dark colour;
                    "piped" bluish cloth and the gold braid along it
  near, far         [forearm, hand] pairs: straight forearms, open end up
  hands             other hand pieces, as swaps
  cuff              "white" (a shirt cuff or lace marks the sleeve's end) or
                    "band" (no white: the whole band and opening are trimmed)
  elbow_cap         true if the forearms were drawn with the inside of the
                    sleeve showing at the elbow end (a coloured oval): it is
                    cut off, so it never shows on the felt
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


def trim_elbow(path_, cuff):
    """Cut the coloured inside of the sleeve off its elbow end."""
    a = np.array(Image.open(path_).convert('RGBA'))
    rgb, A = a[..., :3].astype(int), a[..., 3] > 128
    ys, xs = np.nonzero(A)
    d = np.hypot(np.arange(A.shape[1])[None, :] - cuff[0], np.arange(A.shape[0])[:, None] - cuff[1])
    cap = biggest(A & (d > d[A].max() * 0.5) & (rgb[..., 0] - rgb[..., 2] > 35) & (rgb[..., 0] > 90))
    from scipy.spatial import ConvexHull
    pts = np.c_[np.nonzero(cap)[1], np.nonzero(cap)[0]]
    m = Image.new('L', (A.shape[1], A.shape[0]), 0)
    ImageDraw.Draw(m).polygon([tuple(q) for q in pts[ConvexHull(pts).vertices]], fill=255)
    out = a.copy()
    out[..., 3] = np.where(ndimage.binary_dilation(np.array(m) > 0, iterations=2), 0, a[..., 3])
    out[..., 3] = np.where(biggest(out[..., 3] > 0), out[..., 3], 0)
    Image.fromarray(out, 'RGBA').save(path_)


def lift_hat(src, dst):
    """Lift a black hat drawn on a head into its own piece: in each column,
    from the top down through the near-black, colourless crown and brim (and
    a band between them) to where the hair or face begins."""
    a = np.array(Image.open(src).convert('RGBA'))
    rgb, A = a[..., :3].astype(int), a[..., 3] > 160
    neutral = A & (np.ptp(rgb, axis=-1) <= 10) & (rgb.mean(-1) < 120)
    hat = np.zeros_like(A)
    for x in range(A.shape[1]):
        rows = np.nonzero(A[:, x])[0]
        if not len(rows) or not neutral[rows[0]:rows[0] + 4, x].any():
            continue
        col = neutral[:, x]
        end, band = rows[0], True
        while end + 1 < len(col):
            nxt = np.nonzero(col[end + 1:])[0]
            if not len(nxt):
                break
            gap, r = nxt[0], end + 1 + nxt[0]
            run = np.argmin(col[r:]) if not col[r:].all() else len(col) - r
            if gap <= 3 or (band and gap <= 24 and run >= 4):
                band = band and gap <= 3  # one wide break only: the band, then the brim
                end = r + run - 1
            else:
                break
        hat[rows[0]:end + 1, x] = True
    hat = biggest(ndimage.binary_opening(hat, iterations=1))
    # the brim: near-black pixels joined to the crown, no further down than a brim is thick
    bottom = np.nonzero(hat.any(1))[0].max()
    window = np.zeros_like(A)
    window[:bottom + A.shape[0] // 20] = True
    black = A & (np.ptp(rgb, axis=-1) <= 12) & (rgb.mean(-1) < 60) & window
    lab, n = ndimage.label(black | hat)
    hat = lab == lab[hat][0]
    out = a.copy()
    out[..., 3] = np.where(ndimage.binary_dilation(hat, iterations=1), a[..., 3], 0)
    Image.fromarray(out, 'RGBA').save(dst)


def trim_clothes(src, dst, mode=True, below=0.6):
    """Cut the suit off the bottom of a head piece: dark cloth that reaches
    the piece's edge low down -- bluish or grey cloth; with mode "dark" any
    dull dark colour (a brown suit); with "piped" bluish cloth and the gold
    braid along its edges. Never a red tie, and the neck, shirt collar and
    tie stay."""
    a = np.array(Image.open(src).convert('RGBA'))
    rgb, A = a[..., :3].astype(int), a[..., 3] > 0
    h = A.shape[0]
    cloth = (np.ptp(rgb, axis=-1) < 50) if mode == 'dark' else (rgb[..., 2] - rgb[..., 0] > -15)
    low = np.zeros_like(A)
    low[int(h * below):] = True
    edge = ndimage.binary_dilation(~A, iterations=2)
    edge[-3:] = edge[:, :3] = edge[:, -3:] = True
    if mode == 'dark':          # only the piece's bottom: a mouth by a cigar touches its edge too
        edge[:int(h * 0.8)] = False
    lab, n = ndimage.label(A & low & cloth & (rgb.mean(-1) < 105))
    suit = np.isin(lab, [v for v in np.unique(lab[edge]) if v])
    suit = ndimage.binary_dilation(suit, iterations=1) & low & A & cloth & (rgb.mean(-1) < 160)
    if mode == 'piped':         # the braid: gold lines touching the cloth
        r, b = rgb[..., 0], rgb[..., 2]
        lab, n = ndimage.label(A & low & (b < 75) & (r - b > 60) & (r > 100))
        near = ndimage.binary_dilation(suit, iterations=3)
        suit |= np.isin(lab, [v for v in np.unique(lab[near]) if v])
        suit |= ndimage.binary_dilation(suit, iterations=1) & low & A & (rgb.mean(-1) < 70)
    out = a.copy()
    out[..., 3] = np.where(suit, 0, a[..., 3])
    lab, n = ndimage.label(out[..., 3] > 0)                 # and the crumbs it leaves
    sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
    out[..., 3] = np.where(np.isin(lab, [k + 1 for k in range(n) if sizes[k] >= 40]), out[..., 3], 0)
    Image.fromarray(out, 'RGBA').save(dst)


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
    def name(f, extra=''):
        pj = os.path.join(os.path.dirname(path(F(f))), 'parts.json')
        labels = {q['file']: q['label'] for q in json.load(open(pj))['parts']} if os.path.exists(pj) else {}
        return (labels.get(os.path.basename(F(f))) or '') + extra

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
    fl = -1 if spec.get('head_flip') else 1
    for h in [spec['head']] + spec.get('heads', []):
        i, at = (h[0], h[1:]) if isinstance(h, list) else (h, None)
        f = i
        if spec.get('head_clothes'):
            f = f"{spec['id']}_parts/{spec['id']}_rig/head_{os.path.basename(F(i))}"
            trim_clothes(path(F(i)), path(f), spec['head_clothes'])
        cx, cy, k = hx, hy, t['kh']
        if at:                                  # [piece, dx, dy, scale]: its top-left at (dx, dy)
            w, h_ = size(i)                     # of the rest head's own pixels, at that scale
            s_ = at[2] if len(at) > 2 else 1
            cx = hx + fl * (at[0] + w * s_ / 2 - hw / 2) * t['kh']
            cy = hy + (at[1] + h_ * s_ / 2 - hh / 2) * t['kh']
            k = t['kh'] * s_
        elif spec.get('head_align') == 'back':  # line swaps up by the back of the head, not
            cx = hx + fl * (size(i)[0] - hw) * t['kh'] / 2  # their box (a holder widens it)
        put(f, cx, cy, k, z=hz, label=name(i, '' if i == spec['head'] else ' (swap)'),
            visible=i == spec['head'], slot='head', flip=spec.get('head_flip', False))
    if spec.get('hat') == 'from_head':        # the hat on the rest head, as its own piece,
        f = f"{spec['id']}_parts/{spec['id']}_rig/hat.png"   # hidden: with a bare head, a tip
        lift_hat(path(F(spec['head'])), path(f))
        put(f, hx, hy, t['kh'], z=hz + 3, label='hat, lifted off the rest head (for a tip: show a bare head)',
            visible=False, slot='hat', flip=spec.get('head_flip', False))
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
        if spec.get('elbow_cap'):
            trim_elbow(path(sl), at)
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
