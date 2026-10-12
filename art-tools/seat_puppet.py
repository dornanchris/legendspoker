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
                    or "tube" (a forearm drawn as a tube, open at the elbow,
                    white cuff at the wrist: cut straight across at both)
  elbow_cap         true if the forearms were drawn with the inside of the
                    sleeve showing at the elbow end (a coloured oval): it is
                    cut off, so it never shows on the felt
  pose              "rim": the forearms lie along the table's edge in front of
                    the body, pointing in at each other (the far one mirrored),
                    the way the sheets' seated reference figures rest; then
                    nr / fr / nhr / fhr are DIRECTIONS (degrees, 0 = right,
                    90 = up) the forearms and hands are turned to, whatever
                    angle they were drawn at. Default: both lie on the felt
                    toward the table's centre, nr... are plain rotations
  heads             ... [piece, "fit"] places a swap head by matching its face
                    to the rest head's (cached in <id>_rig/fits.json)
  master            {"file": path, "fit": [lo, hi], "cut_below": row}: the head
                    the face layers are drawn on, shown at rest in place of
                    "head", placed by matching its face to "head" (scale
                    searched in lo..hi); faded out below that row of its own
                    pixels, with its layers, so the torso's collar and tie show
  face              path to a face.json (face_rig.py): eye, brow and mouth
                    layers on the master head, hidden, in slots eyes / brows /
                    mouth
  hand_extras       {"near": [{"name", "file", "scale", "turn"}], "far": [...]}:
                    hands from other sheets, each placed with its own cuff on
                    the wrist, pointing the resting hand's way (plus turn, deg);
                    "trim_stub": true cuts its stub of sleeve off behind the cuff
  runtime           where to write the runtime rig for web/puppet/ (rig.json
                    and its images), relative to art-tools/
  tune              scales and offsets; see DEFAULTS
"""
import json, math, os, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import numpy as np
from PIL import Image, ImageDraw, ImageOps
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
    sleeve=30,                               # "pose": "rim": how far in from each elbow the sleeves reach
    wrist_back=0,                            # "cuff": "tube": end the forearm this many px short, under the hand's cuff
    elbow_fade=0,                            # "cuff": "tube": fade the forearm in over this many px from its elbow cut
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


def trim_tube(src, dst, fade=0, back=0):
    """For a forearm drawn as a plain tube, open at the elbow and with a white
    cuff at the wrist: cut it straight across, square to its length, at the
    start of the cuff and at the end of the opening, so the hand's own cuff
    and the torso's sleeve can cover the cut ends. Returns (cuff, elbow):
    the middle of each cut, in the image's pixels."""
    a = np.array(Image.open(src).convert('RGBA'))
    rgb, A = a[..., :3].astype(int), a[..., 3] > 128
    ys, xs = np.nonzero(A)
    c = np.array([xs.mean(), ys.mean()])
    w, v = np.linalg.eigh(np.cov(np.c_[xs, ys].T))
    u = v[:, np.argmax(w)]                                   # the tube's length
    gy, gx = np.mgrid[:A.shape[0], :A.shape[1]]
    t = (gx - c[0]) * u[0] + (gy - c[1]) * u[1]
    white = biggest(A & (rgb.min(-1) > 190) & (np.ptp(rgb, axis=-1) < 40))   # the cuff band
    if t[white].mean() < 0:                                  # point u at the cuff
        u, t = -u, -t
    inside = A & (rgb[..., 0] - rgb[..., 2] > 35) & (rgb[..., 0] > 70) & (t < 0)
    hi = np.percentile(t[white], 2) - 1
    lo = np.percentile(t[inside], 98) + 1 if inside.any() else t[A].min()
    keep = A & (t > lo) & (t < hi)
    out = a.copy()
    # end the tube `back` short of the cuff (the wrist point stays where the
    # cuff began): a hand's cuff then covers it even with the wrist turned
    out[..., 3] = np.where(biggest(keep) & (t < hi - back), a[..., 3], 0)
    if fade:                                                 # a soft elbow end, under the coat's sleeve
        out[..., 3] = (out[..., 3] * np.clip((t - lo) / fade, 0, 1)).astype(np.uint8)
    Image.fromarray(out, 'RGBA').save(dst)
    end = lambda e: (float(gx[keep & (abs(t - e) < 4)].mean()), float(gy[keep & (abs(t - e) < 4)].mean()))
    return end(hi), end(lo)


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


def fit_head(ref, mov, lo=0.86, hi=1.15):
    """Where head `mov` goes over head `ref`, matched by the face (the band
    from below the eyes to the chin): [dx, dy, scale], its top-left in ref's
    pixels. For heads from another sheet, or the same head without a hat."""
    R = np.array(Image.open(ref).convert('RGBA')).astype(float)
    Rl, Ra = R[..., :3].mean(-1), R[..., 3] > 200
    H_, W_ = Ra.shape
    y0, y1 = int(H_ * 0.45), int(H_ * 0.8)
    src = Image.open(mov).convert('RGBA')

    def score(M, dx, dy):
        Ml, Ma = M[..., :3].mean(-1), M[..., 3] > 200
        ry0, ry1 = max(y0, dy), min(y1, dy + Ma.shape[0])
        rx0, rx1 = max(0, dx), min(W_, dx + Ma.shape[1])
        if ry1 - ry0 < (y1 - y0) * 0.8 or rx1 - rx0 < W_ * 0.5:
            return 1e9
        a, b = Ra[ry0:ry1, rx0:rx1], Ma[ry0 - dy:ry1 - dy, rx0 - dx:rx1 - dx]
        both = a & b
        if both.sum() < 1500:
            return 1e9
        d = np.abs(Rl[ry0:ry1, rx0:rx1] - Ml[ry0 - dy:ry1 - dy, rx0 - dx:rx1 - dx])[both].mean()
        return d + 100 * (b & ~a).sum() / max(1, b.sum())

    best = (1e9, 0, 0, 1.0)
    for k in np.arange(lo, hi, 0.02):
        M = np.array(src.resize((round(src.width * k), round(src.height * k)), Image.LANCZOS)).astype(float)
        for dy in range(-12, 52, 2):
            for dx in range(-24, 26, 2):
                v = score(M, dx, dy)
                if v < best[0]:
                    best = (v, dx, dy, k)
    _, bx, by, bk = best
    for k in (bk - 0.01, bk, bk + 0.01):              # and to the pixel
        M = np.array(src.resize((round(src.width * k), round(src.height * k)), Image.LANCZOS)).astype(float)
        for dy in range(by - 2, by + 3):
            for dx in range(bx - 2, bx + 3):
                v = score(M, dx, dy)
                if v < best[0]:
                    best = (v, dx, dy, k)
    return [int(best[1]), int(best[2]), round(float(best[3]), 3)]


def native_angle(path_, start, flip=False):
    """Direction, in degrees (0 = right, 90 = up), from image point `start` to
    the far end of a piece: a forearm's elbow to its cuff, a hand's cuff to its
    fingers. Mirrored if the piece is drawn flipped."""
    A = np.array(Image.open(path_).convert('RGBA'))[..., 3] > 128
    ys, xs = np.nonzero(A)
    d = np.hypot(xs - start[0], ys - start[1])
    far = d > d.max() * 0.75
    a = math.degrees(math.atan2(-(ys[far].mean() - start[1]), xs[far].mean() - start[0]))
    return 180 - a if flip else a


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


def trim_stub(src, dst, keep=0):
    """Cut a hand's stub of sleeve off behind its cuff, straight across: on a
    forearm, the stub's rounded end and buttons read as a second sleeve."""
    a = np.array(Image.open(src).convert('RGBA'))
    rgb, A = a[..., :3].astype(int), a[..., 3] > 128
    cuff = biggest(A & (rgb.min(-1) > 180) & (np.ptp(rgb, axis=-1) < 55))
    skin = A & (rgb[..., 0] > 150) & (rgb[..., 0] - rgb[..., 2] > 60)
    ys, xs = np.nonzero(cuff)
    c = np.array([xs.mean(), ys.mean()])
    sy, sx = np.nonzero(skin)
    u = c - np.array([sx.mean(), sy.mean()])
    u /= np.linalg.norm(u)                                  # from the hand toward the sleeve
    gy, gx = np.mgrid[:A.shape[0], :A.shape[1]]
    t = (gx - c[0]) * u[0] + (gy - c[1]) * u[1]
    end = np.percentile(t[cuff], 90) + keep
    out = a.copy()
    out[..., 3] = np.where(t > end, 0, a[..., 3])
    out[..., 3] = np.where(biggest(out[..., 3] > 0), out[..., 3], 0)
    Image.fromarray(out, 'RGBA').save(dst)


def hand_anchor(path, mode):
    """Where a hand's own cuff is, in its image."""
    a = np.array(Image.open(path).convert('RGBA'))
    rgb, A = a[..., :3].astype(int), a[..., 3] > 200
    if mode == 'white':
        m = A & (rgb.min(-1) > 205)
    elif mode == 'cream':   # an off-white cuff: its biggest pale patch
        m = biggest(A & (rgb.min(-1) > 180) & (np.ptp(rgb, axis=-1) < 55))
    else:   # the sleeve stub: the darker cloth, not the skin
        m = biggest(ndimage.binary_opening(A & (rgb.mean(-1) < 150), iterations=2))
    ys, xs = np.nonzero(m)
    return float(xs.mean()), float(ys.mean())


def clip_baked(src, p):
    """A part's image with its clip_top / clip_cols / clip_feather applied in its
    own pixels, so the runtime draws it plainly (the clips are drawn in canvas
    pixels; such parts are unrotated)."""
    im = Image.open(src).convert('RGBA')
    if p.get('flip'):
        im = ImageOps.mirror(im)
    s, fe = p['scale'], p.get('clip_feather', 0) / p['scale']
    keep = np.ones((im.height, im.width))
    if 'clip_top' in p:
        cut = (p['clip_top'] - p['y']) / s
        rows = np.arange(im.height)[:, None]
        keep = keep * np.clip((rows - cut + 1) / (fe + 1), 0, 1)
    if 'clip_bottom' in p:
        cut = (p['clip_bottom'] - p['y']) / s
        rows = np.arange(im.height)[:, None]
        keep = keep * np.clip((cut - rows + 1) / (fe + 1), 0, 1)
    if 'clip_cols' in p:
        cols = np.zeros(im.width)
        for x0, x1 in p['clip_cols']:
            cols[max(0, int((x0 - p['x']) / s)):max(0, int((x1 - p['x']) / s))] = 1
        if fe:
            cols = ndimage.uniform_filter1d(cols, max(1, int(fe)))
        keep = keep * cols[None, :]
    a = np.array(im).astype(float)
    a[..., 3] *= keep
    out = Image.fromarray(a.astype(np.uint8), 'RGBA')
    return ImageOps.mirror(out) if p.get('flip') else out


def export_runtime(spec, parts, rt, bones, face, out_dir, F, path):
    """The rig the game's puppet player draws (web/puppet/): bones with their
    pivots, and every part with its rest transform, its bone, its slot and its
    image, copied (or clip-baked) next to rig.json."""
    import shutil
    os.makedirs(out_dir, exist_ok=True)
    out_parts, used = [], set()
    for p, r in zip(parts, rt):
        if r is None or r.get('bone') is None:
            continue
        stem = r['name'].replace('.', '_') if r['name'] else os.path.splitext(os.path.basename(p['file']))[0]
        img = f"{stem}.png"
        n = 2
        while img in used:
            img, n = f"{stem}_{n}.png", n + 1
        used.add(img)
        if 'clip_top' in p or 'clip_cols' in p or 'clip_bottom' in p:
            clip_baked(path(p['file']), p).save(os.path.join(out_dir, img))
        else:
            shutil.copyfile(path(p['file']), os.path.join(out_dir, img))
        out_parts.append({'name': r['name'] or p['slot'], 'bone': r['bone'], 'img': img,
                          'cx': round(r['cx'], 2), 'cy': round(r['cy'], 2), 'rot': p['rot'], 'scale': p['scale'],
                          'flip': bool(p.get('flip')), 'z': p['z'], 'slot': p['slot'],
                          'visible': p['visible'], 'onTable': bool(p.get('on_table'))})
    shutil.copyfile(os.path.join(HERE, 'rooms', 'table_preview.png'), os.path.join(out_dir, 'table_preview.png'))
    rig = {'id': spec['id'], 'name': spec.get('name', spec['id']),
           'note': 'Generated by art-tools/seat_puppet.py: do not edit. Canvas pixels, y down; part rot is '
                   'degrees counter-clockwise (PIL), about the part centre, after flip and scale.',
           'canvas': {'w': W, 'h': H}, 'tableLine': TABLE, 'table': 'table_preview.png',
           'bones': [dict(b, pivot=[round(v, 2) for v in b['pivot']]) for b in bones],
           'face': face, 'parts': out_parts}
    json.dump(rig, open(os.path.join(out_dir, 'rig.json'), 'w'), indent=1)
    print(f"  runtime rig -> {os.path.relpath(out_dir, os.path.dirname(HERE))} ({len(out_parts)} parts)")


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

    def put(f, cx, cy, s, rot=0, z=0, label='', visible=True, flip=False, slot=None, on_table=False,
            name_=None, bone=None):
        w, h = size(f)
        w, h = w * s, h * s
        if rot:
            r = math.radians(rot)
            w, h = abs(w * math.cos(r)) + abs(h * math.sin(r)), abs(w * math.sin(r)) + abs(h * math.cos(r))
        d = {'file': F(f), 'label': label, 'x': round(cx - w / 2), 'y': round(cy - h / 2),
             'scale': round(s, 3), 'rot': rot, 'z': z, 'visible': visible, 'slot': slot}
        if flip: d['flip'] = True
        if on_table: d['on_table'] = True
        d['_rt'] = {'name': name_ or slot, 'bone': bone, 'cx': cx, 'cy': cy}   # for the runtime rig
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
        flip=spec.get('torso_flip', False), name_='torso', bone='torso')
    hw, hh = size(spec['head'])
    hx, hy = t['tx'] + t['hdx'], ty - th * t['kt'] / 2 - hh * t['kh'] / 2 + t['neck']
    hz = 8 if spec.get('head_behind') else 20
    fl = -1 if spec.get('head_flip') else 1
    fits_path = os.path.join(rig, 'fits.json')
    fits = json.load(open(fits_path)) if os.path.exists(fits_path) else {}
    for h in [spec['head']] + spec.get('heads', []):
        i, at = (h[0], h[1:]) if isinstance(h, list) else (h, None)
        if at == ['fit']:                       # matched to the rest head by its face (cached)
            key = f"{F(spec['head'])} <- {F(i)}"
            if key not in fits:
                fits[key] = fit_head(path(F(spec['head'])), path(F(i)))
            at = fits[key]
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
        rest = i == spec['head'] and 'master' not in spec
        put(f, cx, cy, k, z=hz, label=name(i, '' if i == spec['head'] else ' (swap)'),
            visible=rest, slot='head', flip=spec.get('head_flip', False),
            name_='head.rest' if rest else 'head.' + os.path.splitext(os.path.basename(F(i)))[0], bone='head')
    master = None
    if 'master' in spec:
        # the master head: the one the face layers are drawn on. It is placed by
        # matching its face to the spec's head, so the character keeps the
        # proportions and pose that head had; that head stays the frame swaps fit to
        m = spec['master']
        key = f"{F(spec['head'])} <- {m['file']}"
        if key not in fits:
            fits[key] = fit_head(path(F(spec['head'])), path(m['file']), *m.get('fit', [0.86, 1.15]))
        mx, my, mk = fits[key]
        w, h_ = size(m['file'])
        if 'cut_below' in m:                   # its own collar and tie go: the torso's are drawn
            import face_rig
            f = f"{spec['id']}_parts/{spec['id']}_rig/master.png"
            face_rig.cut_below(Image.open(path(m['file'])), m['cut_below']).save(path(f))
            m = dict(m, file=f)
        master = dict(file=m['file'], cx=hx + fl * (mx + w * mk / 2 - hw / 2) * t['kh'],
                      cy=hy + (my + h_ * mk / 2 - hh / 2) * t['kh'], k=t['kh'] * mk)
        put(m['file'], master['cx'], master['cy'], master['k'], z=hz, label=name(m['file'], ' (master)'),
            slot='head', flip=spec.get('head_flip', False), name_='head.rest', bone='head')
    if fits:
        json.dump(fits, open(fits_path, 'w'), indent=1)
    rest_head = master['file'] if master else F(spec['head'])
    rcx, rcy, rk = (master['cx'], master['cy'], master['k']) if master else (hx, hy, t['kh'])
    if spec.get('hat') == 'from_head':        # the hat on the rest head, as its own piece,
        f = f"{spec['id']}_parts/{spec['id']}_rig/hat.png"   # hidden: with a bare head, a tip
        lift_hat(path(rest_head), path(f))
        put(f, rcx, rcy, rk, z=hz + 3, label='hat, lifted off the rest head (for a tip: show a bare head)',
            visible=False, slot='hat', flip=spec.get('head_flip', False), name_='hat', bone='head')
    face = {}
    if 'face' in spec:
        # eye, brow and mouth layers, each the size of the master head (face_rig.py)
        import face_rig
        layers = face_rig.main(path(spec['face']), os.path.join(rig, 'face'), spec.get('master', {}).get('cut_below'))
        for z_, kind in ((0.1, 'eyes'), (0.2, 'brows'), (0.3, 'mouth')):
            for state, f in layers.get(kind, {}).items():
                fp = f"{spec['id']}_parts/{spec['id']}_rig/face/{f}"
                put(fp, rcx, rcy, rk, z=hz + z_, label=f'{kind}: {state} (face layer)', visible=False,
                    slot=kind, flip=spec.get('head_flip', False), name_=f'{kind}.{state}', bone='head')
                face.setdefault(kind, []).append(state)
    if 'collar' in spec:
        put(spec['torso'], t['tx'], ty, t['kt'], z=21, label='torso again: its collar over the neck',
            slot='torso_over', flip=spec.get('torso_flip', False), bone='torso')
        parts[-1]['clip_top'] = round(ty - th * t['kt'] / 2 + spec['collar'] * th * t['kt'])
        parts[-1]['clip_feather'] = t.get('feather', 14)

    # forearms: start at the elbows, at the torso's sides where the table's
    # edge crosses them, and lie on the felt; hands sit on their cuffs
    tm = np.array(Image.open(path(F(spec['torso']))).convert('RGBA'))[..., 3] > 128
    row = int(np.clip((TABLE - (ty - th * t['kt'] / 2)) / t['kt'], 0, th - 1))
    xs = np.nonzero(tm[row])[0]
    left, right = t['tx'] + (xs.min() - tw / 2) * t['kt'], t['tx'] + (xs.max() - tw / 2) * t['kt']
    cuffs = {}
    joints = {}
    aim = spec.get('pose') == 'rim'
    def arm(pair, ex, ar, hr, z, side, flip=False, dz=1):
        hand_dir = hr
        ai, hi = pair
        sl = f"{spec['id']}_parts/{spec['id']}_rig/sleeve_{ai}.png"
        mode = spec.get('cuff', 'white')
        if mode == 'tube':
            at, elbow = trim_tube(path(F(ai)), path(sl), t['elbow_fade'] / t['ka'], t['wrist_back'] / t['ka'])
        else:
            at = trim_sleeve(path(F(ai)), path(sl), mode)
            if spec.get('elbow_cap'):
                trim_elbow(path(sl), at)
            m = np.array(Image.open(path(sl)))[..., 3] > 128
            ys, xs2 = np.nonzero(m)
            d = np.hypot(xs2 - at[0], ys - at[1])
            far_end = d > d.max() * 0.85                   # the open end: the elbow
            elbow = (float(xs2[far_end].mean()), float(ys[far_end].mean()))
        cuffs[ai] = [round(v, 1) for v in at]
        anchor = hand_anchor(path(F(hi)), 'white' if mode == 'tube' else mode)
        if aim:                                # ar, hr are directions: turn the pieces to them
            ar = round(ar - native_angle(path(sl), elbow, flip), 1)
            hr = round(hr - native_angle(path(F(hi)), anchor, flip), 1)
        ox, oy = placed(sl, t['ka'], ar, 0, 0, elbow, flip)
        ax, ay = ex - ox, TABLE + t['ey'] - oy
        put(sl, ax, ay, t['ka'], rot=ar, z=z, label=f'{side} forearm (cuff trimmed off)',
            slot=f'arm_{side}', on_table=True, flip=flip, bone=f'arm_{side}')
        ux, uy = placed(sl, t['ka'], ar, ax, ay, at, flip)
        vx, vy = placed(hi, t['kha'], hr, 0, 0, anchor, flip)
        put(hi, ux - vx + (-1 if flip else 1) * t['hsx'], uy - vy + t['hsy'], t['kha'], rot=hr, z=z + dz,
            label=f'{side} hand (its cuff finishes the sleeve)', slot=f'hand_{side}', on_table=True, flip=flip,
            name_=f'hand_{side}.rest', bone=f'hand_{side}')
        joints[side] = {'elbow': (ex, TABLE + t['ey']), 'wrist': (ux, uy)}
        # other hands for this arm (other sheets): each has its own cuff placed on
        # the wrist, pointing the way the resting hand points (plus its own turn)
        for e in spec.get('hand_extras', {}).get(side, []):
            if e.get('trim_stub'):
                f = f"{spec['id']}_parts/{spec['id']}_rig/hand_{e['name']}.png"
                trim_stub(path(e['file']), path(f))
                e = dict(e, file=f)
            ea = hand_anchor(path(e['file']), 'cream')
            er = (hand_dir + e.get('turn', 0)) - native_angle(path(e['file']), ea, flip) if aim else hr
            ek = t['kha'] * e.get('scale', 1)
            px, py = placed(e['file'], ek, er, 0, 0, ea, flip)
            put(e['file'], ux - px, uy - py, ek, rot=round(er, 1), z=z + dz, label=f"{side} hand: {e['name']}",
                visible=False, slot=f'hand_{side}', on_table=True, flip=flip,
                name_=f"hand_{side}.{e['name']}", bone=f'hand_{side}')
    if spec.get('pose') == 'rim':
        # both forearms lie along the table's edge in front of the body, the far
        # one mirrored to point back in; the torso is drawn again over them only
        # at its sides, so its sleeves cover the elbows
        arm(spec['far'], right - t['fe'], t['fr'], t['fhr'], 22, 'far', flip=True, dz=0.5)
        arm(spec['near'], left + t['ne'], t['nr'], t['nhr'], 23, 'near', dz=0.5)
        put(spec['torso'], t['tx'], ty, t['kt'], z=24, label='torso again: its sleeves over the elbows',
            slot='sleeves_over', flip=spec.get('torso_flip', False), bone='torso')
        parts[-1]['clip_cols'] = [[0, round(left + t['ne'] + t['sleeve'])],
                                  [round(right - t['fe'] - t['sleeve']), W]]
        parts[-1]['clip_top'] = round(ty - th * t['kt'] / 2 + 0.3 * th * t['kt'])
        parts[-1]['clip_feather'] = t.get('feather', 14)
    else:
        arm(spec['far'], right - t['fe'], t['fr'], t['fhr'], 4, 'far')
        arm(spec['near'], left + t['ne'], t['nr'], t['nhr'], 6, 'near')
    for side in ('near', 'far'):
        base = next(q for q in parts if q['slot'] == f'hand_{side}')
        for i in spec.get('hands', []):
            if F(i) != base['file']:
                parts.append(dict(base, file=F(i), visible=False, label=name(i, ' (swap; place per pose)'),
                                  _rt=dict(base['_rt'], name=f"hand_{side}." + os.path.splitext(os.path.basename(F(i)))[0])))
    if spec.get('pose') == 'rim':
        # hands over the sleeves drawn again at the elbows: a hand lifted toward
        # the body must keep its own cuff in front of the coat, or it floats
        for q in parts:
            if q['slot'] in ('hand_far', 'hand_near'):
                q['z'] = 24.3 if q['slot'] == 'hand_far' else 24.6
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
    rt = [q.pop('_rt', None) for q in parts]
    json.dump(layout, open(out, 'w'), indent=1)
    if spec.get('runtime'):
        bones = [{'name': 'torso', 'parent': None, 'pivot': [t['tx'], TABLE]},
                 {'name': 'head', 'parent': 'torso',
                  'pivot': [hx, ty - th * t['kt'] / 2 + spec.get('collar', 0.15) * th * t['kt']]}]
        for side, j in joints.items():
            bones.append({'name': f'arm_{side}', 'parent': 'torso', 'pivot': list(j['elbow'])})
            bones.append({'name': f'hand_{side}', 'parent': f'arm_{side}', 'pivot': list(j['wrist'])})
        export_runtime(spec, parts, rt, bones, face, os.path.join(HERE, spec['runtime']), F, path)
    subprocess.run([sys.executable, os.path.join(HERE, 'build_puppet.py'), 'render', out,
                    '-o', os.path.join(pdir, 'preview.png')], check=True, capture_output=True)
    print(f"{spec['id']}: layout -> {out}")


if __name__ == '__main__':
    main(sys.argv[1])
