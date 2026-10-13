#!/usr/bin/env python3
"""
pose_rig.py -- build a seated puppet from the character's COMPLETE pose
illustrations (pose sheets), not from a parts sheet: the illustrations are
the source of truth for proportions, sleeve thickness, cuffs and perspective.

  python3 art-tools/pose_rig.py art-tools/lincoln_parts/pose_rig.json

From the rest pose:
  body       the whole figure with its forearms lifted out; the coat hidden
             behind them is reconstructed (diffused in from round the hole),
             since moving an arm exposes it
  upper arms the body's own pixels round each elbow, drawn again OVER the
             forearms, so the joint is always covered
  arm assets each forearm with its cuff and hand as ONE piece (no wrist joint:
             a hand never drifts off its cuff), cut along the drawn outline,
             its elbow end extended under the upper arm so rotating it never
             opens a gap
From the other poses: alternate arm assets. Each pose is first registered to
the rest pose on the torso (collar, lapels, tie), so its arms land in the
rest pose's space and hang from the same elbow points.

Nothing of the table is kept: felt and rail colours are dropped, and the
polygons follow the sleeve outlines where the rail's highlight matches skin.
The table is drawn by the game (the rig's tableLine is the rest pose's rail).

The master head (spec "master") carries the face layers. Given "face" (a
face_rig.py spec), "piece" and "cut_below", it is made here from the face
sheet; otherwise "file" and "layers" are read as another tool left them
(Lincoln's come from seat_puppet.py). "replace_head" drops the rest pose's
own head (head_box, above collar_y) from the body, for a master drawn a
different shape. "fill" lists polygons of background showing through a gap
in the drawing, painted over like the coat behind an arm.

An arm asset with "space": "rest" is cut AFTER its pose is moved onto the
rest pose, so its polygon is drawn in the rest pose's pixels and every
piece's elbow edge can share one line; "props" are polygons round chips in a
hand (their red is the rail's, so no wood filter inside them). Master "heads"
are other heads from the face sheet (turned away, toward the viewer), placed
on the master by the collar; face layers carry "with": "head.rest", so they
show only on the head they were drawn for.

"frames" are whole-figure drawings for poses that move all of him (a lean
over the table), placed by the table ("reg": scale, dx, dy from the felt's
edge), cut by a polygon, his own head cut away round where the master head
lands (found on his stock: "stock_box"). A clip shows one in slot "frame" with
body and arms hidden ("-"), and moves the head by the rig's "frames" offset.
A frame with "head": "own" keeps its drawn head (a hand at the face, a hat in
the hand): the clip hides the master head instead, and its offset is null.
"cut_head" cuts the drawn head for the master even without "replace_head".
A frame takes its pose's placement unless it gives "reg"; a pose drawn on
another sheet at another size is placed by hand with its own "reg". Room
round a frame is "frame_margin" (a hat raised high); "drop_wood" cuts the
chair's red-brown wherever it is, and "back_strip" clears anything thin in
the columns at his back (the chair's outline). "felt_lines": n drops anything
under about 2n pixels thick below the table line in frames (the drawn
rail's outline curving across the felt). "drop_rail": n drops every
rail-orange shape reaching within n rows of the table line in frames
("rail_blue": only colours with less blue than that, for a bare-armed
character whose skin is the rail's orange). "head_match": "face" places a
frame's master head on its own drawn head instead of on the stock.
Master "cloth" ([lo, hi], default [0, 90]) is the brightness of the cloth
that fills a replaced head's shoulders (a light cloak, not a dark coat).
"fill_shoulders" (with master "shoulder_y", "shoulder_close") fills the coat
between a narrower master neck and a frame's shoulders; "no_peel" keeps the
wood-peeling off frames for a character dressed in the wood's brown. An arm asset may give "auto":
{"x": [x0, x1], "top": y} in place of "poly" (with "space": "rest"): the
piece is what differs from the rest pose there (auto_piece), for poses where
only a hand moves; "drop_red" drops red chips as "drop_blue" drops card backs. "strip_thin": n drops strands
under about 2n pixels wide from arm pieces (rail lines clinging to a hand);
leave it off where fingers are that thin. An arm (or one of its assets) may
give "register_box": that asset's pose is then placed by matching that box
(its shoulder and sleeve) rather than the torso, so the seam lines up.

Master "props" are things on the head cut from the rest pose as drawn (FDR's
holder in his teeth): {"holder": {"poly": [...], "pivot": [x, y], "z": 20.4}}.
Each is its own part on its own bone (parent: head, pivot where it meets the
mouth), so a clip can tilt it; it is cut from the body and from frames' heads.

Writes the runtime rig (web/art/<id>/), a build_puppet layout
(art-tools/<id>_layout.json) and, in <id>_parts/<id>_pose/, every image plus
validate.png: the rebuilt rest pose against the illustration.
"""
import json, math, os, shutil, sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from split_parts import build_alpha
from seat_puppet import fit_head, biggest
import face_rig

HERE = os.path.dirname(os.path.abspath(__file__))
W, H, TABLE = 1100, 1040, 880


def poly_mask(shape, pts):
    m = Image.new('L', (shape[1], shape[0]), 0)
    ImageDraw.Draw(m).polygon([tuple(p) for p in pts], fill=255)
    return np.array(m) > 0


def table_colour(a, ty, with_wood=True):
    """Felt and the dark wood of the rail and chair (the rail's highlights are
    handled by polygons). Brown counts as wood only where it reaches the rail
    (row ty - 8 down) or the panel's edge: brass buttons and the shading round
    a face are the same brown, inside him."""
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    felt = (g > r + 15) & (g > b + 5) & (g > 30)       # not navy (Washington's coat has g > r too); shadowed felt too
    wood = (r - g > 40) & (g < 75) & (r < 200) & (a[..., 3] > 0)
    lab, n = ndimage.label(wood)
    edge = np.zeros_like(wood)
    edge[max(0, ty - 8):] = True
    edge[:, :2] = edge[:, -2:] = True
    outer = np.unique(lab[edge & wood])
    return (felt | np.isin(lab, outer[outer > 0])) if with_wood else felt


def load_pose(sheet, box):
    x, y, w, h = box
    im = Image.open(sheet).convert('RGB').crop((x, y, x + w, y + h))
    arr, alpha = build_alpha(im)
    arr[..., 3] = (alpha * 255).astype(np.uint8)
    # the white background caught in the outline's anti-aliasing: drop light
    # pixels on the very edge and darken the edge to its outline (cut_sheet.py)
    edge = ndimage.binary_dilation(arr[..., 3] < 128, iterations=2) & (arr[..., 3] > 0)
    arr[..., 3] = np.where(edge & (arr[..., :3].min(-1) > 150), 0, arr[..., 3])
    dark = np.stack([ndimage.minimum_filter(arr[..., c], size=3) for c in range(3)], -1)
    arr[..., :3] = np.where(edge[..., None], dark, arr[..., :3])
    return arr


def diffuse_fill(rgb, hole, known, iters=300):
    """Fill `hole` from the `known` pixels round it: nearest colour, then smoothed."""
    _, (iy, ix) = ndimage.distance_transform_edt(~known, return_indices=True)
    out = rgb.astype(float).copy()
    out[hole] = rgb[iy, ix][hole]
    for _ in range(iters):
        avg = ndimage.uniform_filter(out, size=(3, 3, 1))
        out[hole] = avg[hole]
    return out


def register(ref, mov, box, scales=np.arange(0.94, 1.065, 0.01), span=24):
    """(s, dx, dy) taking `mov` pose pixels onto `ref` ones, matched on box."""
    x0, y0, x1, y1 = box
    R = ref[y0:y1, x0:x1, :3].astype(float).mean(-1)
    best = (1e9, 1, 0, 0)
    src = Image.fromarray(mov)
    for s in scales:
        M = np.array(src.resize((round(src.width * s), round(src.height * s)), Image.LANCZOS))[..., :3].astype(float).mean(-1)
        for dy in range(-span, span + 1, 2):
            for dx in range(-span, span + 1, 2):
                sx0, sy0 = x0 - dx, y0 - dy
                if sx0 < 0 or sy0 < 0 or sx0 + (x1 - x0) > M.shape[1] or sy0 + (y1 - y0) > M.shape[0]:
                    continue
                d = np.abs(M[sy0:sy0 + (y1 - y0), sx0:sx0 + (x1 - x0)] - R).mean()
                if d < best[0]:
                    best = (d, s, dx, dy)
    _, s, bx, by = best
    for dy in range(by - 2, by + 3):                       # to the pixel
        for dx in range(bx - 2, bx + 3):
            M = np.array(src.resize((round(src.width * s), round(src.height * s)), Image.LANCZOS))[..., :3].astype(float).mean(-1)
            sx0, sy0 = x0 - dx, y0 - dy
            if sx0 < 0 or sy0 < 0 or sx0 + (x1 - x0) > M.shape[1] or sy0 + (y1 - y0) > M.shape[0]:
                continue
            d = np.abs(M[sy0:sy0 + (y1 - y0), sx0:sx0 + (x1 - x0)] - R).mean()
            if d < best[0]:
                best = (d, s, dx, dy)
    return float(best[1]), int(best[2]), int(best[3]), float(best[0])


def to_rest_space(rgba, reg, shape):
    """A pose's RGBA, scaled and moved into the rest pose's pixels."""
    s, dx, dy = reg
    im = Image.fromarray(rgba)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    out = Image.new('RGBA', (shape[1], shape[0]), (0, 0, 0, 0))
    out.paste(im, (round(dx), round(dy)))
    return np.array(out)


def extend_elbow(rgba, elbow, radius, cover, below=None):
    """Grow an arm asset round its elbow point (inside `cover`, the region the
    upper arm hides), with the sleeve's own colours, so the forearm can turn
    about the elbow without its cut end ever showing."""
    A = rgba[..., 3] > 128
    yy, xx = np.mgrid[:A.shape[0], :A.shape[1]]
    disk = (xx - elbow[0]) ** 2 + (yy - elbow[1]) ** 2 <= radius ** 2
    zone = disk & cover & ~A
    if below is not None:                                  # never over the table: it would show there
        zone &= yy < below
    if not zone.any():
        return rgba
    # the sleeve colours: dark, neutral cloth only (never the outline's black,
    # the cuff, or the rail's dark red shadow)
    cc = rgba[..., :3].astype(int)
    cloth = A & (cc.max(-1) < 90) & (cc.max(-1) > 20) & (np.ptp(cc, axis=-1) < 25)
    out = rgba.copy()
    filled = diffuse_fill(rgba[..., :3], zone, cloth, iters=60)
    out[..., :3] = np.where(zone[..., None], filled, rgba[..., :3]).astype(np.uint8)
    out[..., 3] = np.where(zone, 255, rgba[..., 3])
    return out


def peel_wood(rgba, rows_below=0):
    """Eat the chair's and rail's brown off a piece's outer edge, a pixel at a
    time from outside in (skin, cuffs and brass are too bright to match)."""
    c = rgba[..., :3].astype(int)
    wood = (c[..., 0] - c[..., 1] > 22) & (c[..., 0] > 45) & (c[..., 1] < 80) & (np.arange(rgba.shape[0])[:, None] > rows_below)
    for _ in range(12):
        rim = ndimage.binary_dilation(rgba[..., 3] < 128) & (rgba[..., 3] > 0) & wood
        if not rim.any():
            break
        rgba[..., 3] = np.where(rim, 0, rgba[..., 3])
    return rgba


def fit_by_brooch(master, piece):
    """(scale, dx, dy) placing a head on the master by the gold brooch both
    wear at the collar: its size gives the scale, its centre the place."""
    def gold(f):
        a = np.array(Image.open(f).convert('RGBA')).astype(int)
        g = (a[..., 3] > 128) & (a[..., 0] > 170) & (a[..., 1] > 110) & (a[..., 2] < 100) & (a[..., 0] - a[..., 2] > 100)
        g[: a.shape[0] // 2] = False                       # the brooch is low on the piece
        lab, n = ndimage.label(g)
        g = lab == (1 + np.argmax(ndimage.sum(g, lab, range(1, n + 1))))   # the skull, not the chain
        ys, xs = np.nonzero(g)
        return xs.mean(), ys.mean(), np.sqrt(g.sum())
    mx_, my_, ms = gold(master)
    px, py, ps = gold(piece)
    s = ms / ps
    return s, round(mx_ - px * s), round(my_ - py * s)


def fit_by_collar(master, piece, span=90):
    """(dx, dy) placing a head drawn at another angle on the master head, both
    from the face sheet (same scale): matched on the stock and collar under
    the chin, the part of a turned head that does not turn."""
    M = np.array(Image.open(master).convert('RGBA')).astype(float)
    P = np.array(Image.open(piece).convert('RGBA')).astype(float)
    ph = P.shape[0]
    band = P[int(ph * 0.68):]
    by = int(ph * 0.68)
    best = (1e9, 0, 0)
    for dy in range(-span, span + 1, 2):
        for dx in range(-span, span + 1, 2):
            y0, x0 = by + dy, dx
            ys, xs = max(0, y0), max(0, x0)
            ye, xe = min(M.shape[0], y0 + band.shape[0]), min(M.shape[1], x0 + band.shape[1])
            if ye - ys < 20 or xe - xs < 40:
                continue
            a = band[ys - y0:ye - y0, xs - x0:xe - x0]
            b = M[ys:ye, xs:xe]
            m = (a[..., 3] > 200) & (b[..., 3] > 200)
            if m.sum() < 0.4 * (band[..., 3] > 200).sum():
                continue
            d = np.abs(a[..., :3] - b[..., :3])[m].mean()
            if d < best[0]:
                best = (d, dx, dy)
    return best[1], best[2]


def auto_piece(R, P, au):
    """Where pose P (already in the rest pose's pixels) differs from the rest
    pose R, within columns au["x"] and below row au["top"]: the arm that moved,
    with whatever of the body it uncovered (which is P's body, so it matches).
    Thin slivers from a slightly-off registration are opened away."""
    x0, x1 = au['x']
    d = np.abs(P[..., :3].astype(int) - R[..., :3].astype(int)).sum(-1) > au.get('thresh', 90)
    d |= (P[..., 3] > 128) != (R[..., 3] > 128)
    zone = np.zeros(d.shape, bool)
    zone[au.get('top', 250):au.get('bottom', d.shape[0]), x0:x1] = True
    d &= zone
    d = ndimage.binary_opening(d, iterations=au.get('open', 3))
    lab, n = ndimage.label(d)
    if n:
        sz = ndimage.sum(d, lab, range(1, n + 1))
        d = np.isin(lab, 1 + np.nonzero(sz >= au.get('min', 400))[0])
    d = ndimage.binary_fill_holes(ndimage.binary_dilation(d, iterations=au.get('grow', 5)))
    return d & zone


def upscale(rgba, k):
    """Premultiplied resize, so no dark or light fringe appears at the edges."""
    a = rgba.astype(float)
    al = a[..., 3:] / 255
    pm = np.dstack([a[..., :3] * al, a[..., 3:]])
    big = np.dstack([np.array(Image.fromarray(pm[..., c].astype(np.float32), 'F')
                              .resize((round(rgba.shape[1] * k), round(rgba.shape[0] * k)), Image.LANCZOS))
                     for c in range(4)])
    al2 = np.clip(big[..., 3:], 0, 255) / 255
    rgb = np.where(al2 > 0.004, big[..., :3] / np.maximum(al2, 0.004), 0)
    return np.dstack([np.clip(rgb, 0, 255), np.clip(big[..., 3:], 0, 255)]).astype(np.uint8)


def main(spec_path):
    spec = json.load(open(spec_path))
    kit = os.path.dirname(os.path.abspath(spec_path))
    out_dir = os.path.join(kit, f"{spec['id']}_pose")
    os.makedirs(out_dir, exist_ok=True)
    sheet = lambda name: os.path.join(kit, spec['sheets'][name])
    poses = {n: load_pose(sheet(p['sheet']), p['box']) for n, p in spec['poses'].items()}
    rest = spec['rest']
    R = poses[rest]
    shape = R.shape[:2]
    ty = spec['table_y']
    k = spec['scale']

    # register every other pose to the rest pose on the torso
    regs = {rest: (1.0, 0, 0)}
    for n in poses:
        if n != rest and 'reg' in spec['poses'][n]:        # placed by hand (another sheet, another size)
            regs[n] = tuple(spec['poses'][n]['reg'])
        elif n != rest:
            box = spec['poses'][n].get('register_box', spec['register_box'])  # a pose drawn leaning
            s, dx, dy, err = register(R, poses[n], box, span=spec.get('register_span', 24))    # registers where its arm hangs
            regs[n] = (s, dx, dy)
            print(f'  {n} -> {rest}: scale {s:.2f}, shift {dx}, {dy} (error {err:.1f})')
    # the poses in the rest pose's space

    char = lambda a: (a[..., 3] > 128) & ~table_colour(a, ty)
    chair = poly_mask(shape, spec['exclude'][rest]) if rest in spec.get('exclude', {}) else np.zeros(shape, bool)

    # ---------------------------------------------------------------- arms
    assets = {}
    rest_arm = np.zeros(shape, bool)
    for side, arm in spec['arms'].items():
        for state, a in arm['assets'].items():
            # cut in the source pose's own pixels (the polygons are drawn there),
            # then moved into the rest pose's space; or, with "space": "rest",
            # cut after the move, so every piece's elbow edge is the same line
            in_rest = a.get('space') == 'rest'
            reg_a = regs[a['pose']]
            if 'reg' in a:                                 # placed by hand
                reg_a = tuple(a['reg'])
            elif 'register_box' in a or 'register_box' in arm:
                # matched where the piece meets the body (this side's shoulder and
                # sleeve), not on the torso: the drawings differ a little in size and
                # place, and the seam is where a few pixels show
                rb = a.get('register_box', arm.get('register_box'))
                s_, dx_, dy_, err_ = register(R, poses[a['pose']], rb, scales=np.arange(0.88, 1.2, 0.01), span=60)
                reg_a = (s_, dx_, dy_)
                print(f'  arm_{side}.{state} ({a["pose"]}) on its shoulder: scale {s_:.2f}, shift {dx_}, {dy_} (error {err_:.1f})')
            src = to_rest_space(poses[a['pose']], reg_a, shape) if in_rest else poses[a['pose']]
            # "props": polygons round chips in the hand; their red is the rail's, so
            # inside them no wood filter (the outline keeps the rail out)
            props = np.zeros(src.shape[:2], bool)
            for pp in a.get('props', []):
                props |= poly_mask(src.shape[:2], pp)
            m = np.where(props, (src[..., 3] > 128) & ~table_colour(src, ty, with_wood=False), char(src))
            if 'auto' in a:                                # the piece is what differs from rest, on its side
                m &= auto_piece(R, src, a['auto'])
                # robe hem hanging lower in that drawing lands on the felt: dark cloth
                # below the rail goes (a hand's outline is too thin to be opened away)
                c = src[..., :3].astype(int)
                cloth = (c.max(-1) < 95) & (src[..., 3] > 128)
                cloth = ndimage.binary_opening(cloth, iterations=2)
                cloth[:ty + a['auto'].get('hem', 6)] = False
                m &= ~ndimage.binary_dilation(cloth, iterations=1)
            else:
                m &= poly_mask(src.shape[:2], a['poly'])
            for ex in a.get('except', []):
                m &= ~poly_mask(src.shape[:2], ex)
            if a.get('drop_red'):                          # chips: the game draws its own
                c = src[..., :3].astype(int)
                coloured = ((c[..., 0] > 110) & (c[..., 1] < 70) & (c[..., 2] < 80)) | \
                           ((c[..., 2] - c[..., 0] > 18) & (c[..., 2] > 45))
                chips = ndimage.binary_fill_holes(ndimage.binary_closing(
                    ndimage.binary_dilation(coloured, iterations=2), iterations=4))
                chips = ndimage.binary_dilation(chips, iterations=3)
                bone = (c[..., 0] > 170) & (c[..., 0] - c[..., 2] > 35)          # never a finger
                m &= ~(chips & ~bone)
                m &= ndimage.binary_dilation(ndimage.binary_opening(m, iterations=2), iterations=2)  # no confetti
            if a.get('drop_blue'):                         # cards: their backs, and the light border round them
                c = src[..., :3].astype(int)
                blue = (c[..., 2] - c[..., 0] > 18) & (c[..., 2] > 45)
                near = ndimage.binary_dilation(blue, iterations=4)
                m &= ~ndimage.binary_dilation(blue, iterations=1) & ~(near & (c.min(-1) > 170) & (np.ptp(c, axis=-1) < 45))
            c = src[..., :3].astype(int)                   # the sheet's white caught between a hand and him
            white = (c.min(-1) > 236) & (np.ptp(c, axis=-1) < 12) & (src[..., 3] > 128)
            lab, n = ndimage.label(white)
            if n:
                sz = ndimage.sum(white, lab, range(1, n + 1))
                m &= ~ndimage.binary_dilation(np.isin(lab, 1 + np.nonzero(sz >= 20)[0]), iterations=1)
            if spec.get('strip_thin'):                     # rail strands clinging to a hand: nothing that thin
                t = spec['strip_thin']
                pr_ = np.zeros(m.shape, bool)
                for pp in a.get('props', []):
                    pr_ |= poly_mask(src.shape[:2], pp)
                m &= ndimage.binary_dilation(ndimage.binary_opening(m, iterations=t), iterations=t) | pr_
            m = biggest(m)
            m = ndimage.binary_fill_holes(m) & (src[..., 3] > 128) & ~(white & ~m)
            rgba = src.copy()
            rgba[..., 3] = np.where(m, src[..., 3], 0)
            if not a.get('props'):                         # (peeling would eat the chips' red)
                rgba = peel_wood(rgba)
            if not in_rest:
                rgba = to_rest_space(rgba, reg_a, shape)
            if a['pose'] == rest and state == arm['rest']:
                rest_arm |= rgba[..., 3] > 128
            assets[(side, state)] = rgba
    # the upper arms: the rest pose's visible body round each elbow
    body_vis = char(R) & ~rest_arm & ~chair
    for poly in spec.get('fill', []):                      # background showing through a gap in the drawing
        body_vis &= ~poly_mask(shape, poly)
    upper = {}
    for side, arm in spec['arms'].items():
        upper[side] = um = body_vis & poly_mask(shape, arm['upper'])
        for state in arm['assets']:                        # grown only where the upper arm hides it
            assets[(side, state)] = extend_elbow(assets[(side, state)], arm['elbow'], arm.get('extend', 16), um, ty)

    # ---------------------------------------------------------------- body
    # his own silhouette (never the chair or the table round him), arms included
    sil = biggest(ndimage.binary_fill_holes(((char(R) & ~chair) | rest_arm) & (np.arange(shape[0])[:, None] < ty + 30)))
    hole = sil & ~body_vis & (np.arange(shape[0])[:, None] < ty + 30)
    body = R.copy()
    # filled from the coat above the rail only (the rail's highlight is skin-coloured)
    # and never from rail-hued pixels (red far above green: wood, its highlight)
    railish = R[..., 0].astype(int) > 1.8 * R[..., 1].astype(int) + 10
    body[..., :3] = diffuse_fill(R[..., :3], hole, body_vis & ~railish & (np.arange(shape[0])[:, None] < ty - 3)).astype(np.uint8)
    body[..., 3] = np.where(body_vis | hole, 255, 0)
    body[..., 3] = np.where(np.arange(shape[0])[:, None] < ty + 30, body[..., 3], 0)
    body[..., 3] = np.minimum(body[..., 3], np.where(body_vis, R[..., 3], 255))
    # the chair's wood mixed into his outline: brown on the body's outer edge goes
    # (no skin there: the head and hands are their own pieces)
    peel_wood(body, rows_below=240)
    for _ in range(3):                                     # paper white and grey left on his outline
        c = body[..., :3].astype(int)
        out_ = np.pad(body[..., 3] < 128, 1, constant_values=True)          # past the panel's edge is outside
        rim = ndimage.binary_dilation(out_, iterations=2)[1:-1, 1:-1] & (body[..., 3] > 0)
        pale = rim & (((c.min(-1) > 185) & (np.ptp(c, axis=-1) < 28)) | ((c.min(-1) > 100) & (np.ptp(c, axis=-1) < 16)))
        pale[:spec['collar_y']] = False                    # (hair is grey)
        if not pale.any():
            break
        body[..., 3] = np.where(pale, 0, body[..., 3])
    if spec['master'].get('replace_head'):
        # the master head is a separate drawing, not quite this head's shape:
        # the pose's own head goes (head_box, above the collar), or its outline
        # shows round the master's as a second one
        hb = spec['master']['head_box']
        cut = np.zeros(shape, bool)
        cut[hb[1]:min(hb[3], spec['collar_y']), hb[0]:hb[2]] = True
        fb = spec['master'].get('fill_below')
        fp = spec['master'].get('fill_poly')
        if fb is not None or fp:
            # below this row the hole is shoulders, not air: filled with the robe
            # round it, so a narrower swapped head never shows a hole behind it
            if fp and isinstance(fp[0][0], (int, float)):  # one polygon, or a list of them
                fp = [fp]
            fpm = np.zeros(shape, bool)
            for q in fp or []:
                fpm |= poly_mask(shape, q)
            hole = cut & sil & (fpm if fp else (np.arange(shape[0])[:, None] >= fb))
            lo, hi = spec['master'].get('cloth', [0, 90])  # the cloth's brightness (a dark coat; a light cloak)
            mx_ = body[..., :3].astype(int).max(-1)
            cloth = (body[..., 3] > 200) & ~cut & (mx_ >= lo) & (mx_ < hi)
            body[..., :3] = np.where(hole[..., None], diffuse_fill(body[..., :3], hole, cloth, iters=120), body[..., :3]).astype(np.uint8)
            body[..., 3] = np.where(hole, 255, body[..., 3])
            cut &= ~hole
        body[..., 3] = np.where(cut, 0, body[..., 3])
    # props on the head, cut from the rest pose as drawn (a holder in the teeth):
    # each its own piece on its own bone, so it can tilt; gone from the body
    head_props = {}
    for pname, pr in spec['master'].get('props', {}).items():
        src = poses[pr.get('pose', rest)]
        pm_ = poly_mask(shape, pr['poly']) & (src[..., 3] > 128)
        c = src[..., :3].astype(int)
        skin = (c[..., 0] > 160) & (c[..., 0] - c[..., 2] > 60) & (c[..., 1] > 90) & (c[..., 1] < 175)
        pm_ &= ~skin
        pm_ = biggest(pm_)
        prgba = src.copy()
        prgba[..., 3] = np.where(pm_, src[..., 3], 0)
        head_props[pname] = (prgba, ndimage.binary_dilation(pm_, iterations=2))
        body[..., 3] = np.where(head_props[pname][1], 0, body[..., 3])

    for side, um in list(upper.items()):                   # the upper arms, cut from the clean body
        u = body.copy()
        u[..., 3] = np.where(um, body[..., 3], 0)
        upper[side] = u

    # the master head (face layers drawn on it), fitted on the rest pose's head
    m = spec['master']
    if 'face' in m:
        # made here from the face sheet: the master head (its collar faded off
        # below cut_below) and the eye, brow and mouth layers baked onto it
        face_rig.cut_below(Image.open(os.path.join(HERE, m['piece'])), m['cut_below']).save(os.path.join(HERE, m['file']))
        face_rig.main(os.path.join(HERE, m['face']), os.path.join(HERE, m['layers']), m['cut_below'])
    ref = os.path.join(out_dir, '_rest_head.png')
    hb = m['head_box']
    Image.fromarray(upscale(R[hb[1]:hb[3], hb[0]:hb[2]], k)).save(ref)
    mx, my, mk = fit_head(ref, os.path.join(HERE, m['file']), *m.get('fit', [0.5, 1.2]))
    mw, mh = Image.open(os.path.join(HERE, m['file'])).size
    print(f'  master head on the rest head: {mx}, {my}, scale {mk}')
    # the master head's silhouette in the rest pose's pixels (for cutting a frame's own head)
    mhead = np.zeros(shape, bool)
    ma = np.array(Image.open(os.path.join(HERE, m['file'])).convert('RGBA'))[..., 3] > 60
    ma = np.array(Image.fromarray(ma.astype(np.uint8) * 255).resize(
        (max(1, round(ma.shape[1] * mk / k)), max(1, round(ma.shape[0] * mk / k))), Image.NEAREST)) > 0
    ox, oy = round(hb[0] + mx / k), round(hb[1] + my / k)
    ys, xs = slice(max(0, oy), min(shape[0], oy + ma.shape[0])), slice(max(0, ox), min(shape[1], ox + ma.shape[1]))
    mhead[ys, xs] = ma[ys.start - oy:ys.stop - oy, xs.start - ox:xs.stop - ox]
    mhead_core = ndimage.binary_erosion(mhead, iterations=2)
    for _, pmask in head_props.values():                   # a frame's own holder goes with its head
        mhead |= ndimage.binary_dilation(pmask, iterations=3)

    # ---------------------------------------------------------------- frames
    # whole-figure drawings for the poses that move all of him (a lean over the
    # table): placed by the table (the felt's edge), not the torso, so his body
    # drops into the lean as drawn. A clip shows one in place of the body and
    # both arms, and moves the master head onto its neck ("head": where the
    # frame's head is, from the rest pose's).
    frames = {}
    X = lambda x: spec['origin_x'] + k * x                 # rest-pose pixels -> canvas
    Y = lambda y: TABLE + k * (y - ty)
    FM = spec.get('frame_margin', 0)                       # room round a frame: a hat raised high, standing up
    fshape = (shape[0] + 2 * FM, shape[1] + 2 * FM)
    pm = lambda pts: poly_mask(fshape, [[x + FM, y + FM] for x, y in pts])
    pad = lambda a: np.pad(a, ((FM, FM), (FM, FM)) + ((0, 0),) * (a.ndim - 2))
    for name, fr in spec.get('frames', {}).items():
        src = load_pose(sheet(spec['poses'][fr['pose']]['sheet']), spec['poses'][fr['pose']]['box'])
        s_, dx_, dy_ = fr.get('reg') or regs[fr['pose']]     # by default where its pose was placed
        F = to_rest_space(src, (s_, dx_ + FM, dy_ + FM), fshape)
        props = np.zeros(fshape, bool)
        for pp in fr.get('props', []):
            props |= pm(pp)
        fm = np.where(props, (F[..., 3] > 128) & ~table_colour(F, ty + FM, with_wood=False),
                      (F[..., 3] > 128) & ~table_colour(F, ty + FM))
        fm &= pm(fr['poly']) if 'poly' in fr else (np.arange(fshape[0])[:, None] < ty + FM + fr.get('below', 60))
        for ex in fr.get('except', []):
            fm &= ~pm(ex)
        if spec.get('drop_wood'):                          # the chair behind him, wherever it is
            c = F[..., :3].astype(int)
            wood = (c[..., 0] - c[..., 1] > 35) & (c[..., 1] < 45) & (c[..., 2] < 35) & (c[..., 0] > 55) & ~props
            wood |= (c[..., 0] - c[..., 1] > 18) & (c[..., 1] < 20) & (c[..., 2] < 22) & (c[..., 0] > 28) & ~props  # in shadow
            lab, n = ndimage.label(wood)
            if n:
                sz = ndimage.sum(wood, lab, range(1, n + 1))
                fm &= ~ndimage.binary_dilation(np.isin(lab, 1 + np.nonzero(sz >= 40)[0]), iterations=1)
        c = F[..., :3].astype(int)                         # the sheet's white caught between an arm and him
        white = (c.min(-1) > 236) & (np.ptp(c, axis=-1) < 12) & (F[..., 3] > 128)
        lab, n = ndimage.label(white)
        trapped = np.zeros(fshape, bool)
        if n:
            sz = ndimage.sum(white, lab, range(1, n + 1))
            trapped = ndimage.binary_dilation(np.isin(lab, 1 + np.nonzero(sz >= 30)[0]), iterations=1)
        fm &= ~trapped
        # thin lines (the rail's highlight, the chair's outline) go: a figure's own
        # outline is part of a shape, and comes back with the dilation
        fm &= ndimage.binary_dilation(ndimage.binary_opening(fm, iterations=2), iterations=2) | props
        if spec.get('drop_rail'):                          # the drawn rail's orange and its highlight, wherever it sits
            c = F[..., :3].astype(int)
            rail = (c[..., 0] > 1.6 * c[..., 1] + 10) & (c[..., 0] > 60) & ~props
            rail &= c[..., 2] < spec.get('rail_blue', 256)   # bare skin is that orange too, but bluer
            lab, n = ndimage.label(rail)
            if n:
                low = np.unique(lab[ty + FM - spec['drop_rail']:][rail[ty + FM - spec['drop_rail']:]])
                fm &= ~ndimage.binary_dilation(np.isin(lab, low[low > 0]), iterations=1)
        if spec.get('felt_lines'):                         # the drawn rail's outline lying on the felt
            t = spec['felt_lines']
            below = np.zeros(fshape, bool)
            below[ty + FM - 2:] = True
            thick = ndimage.binary_dilation(ndimage.binary_opening(fm, iterations=t), iterations=t + 1)
            fm &= ~below | thick | props
        if 'back_strip' in spec:                           # the chair's outline at his back: nothing thin there
            strip = np.zeros(fshape, bool)
            strip[:, :spec['back_strip'] + FM] = True
            fm &= ~strip | ndimage.binary_dilation(ndimage.binary_opening(fm, iterations=5), iterations=5)
        lab, n = ndimage.label(fm)                          # crumbs of rail and felt go
        if n:
            sz = ndimage.sum(fm, lab, range(1, n + 1))
            fm = np.isin(lab, 1 + np.nonzero(sz >= 150)[0])
        fm = ndimage.binary_fill_holes(fm) & (F[..., 3] > 128) & ~trapped
        for ex in fr.get('except', []):                    # again: filling holes refills one he encloses
            fm &= ~pm(ex)
        own = fr.get('head') == 'own'
        fm_before = fm.copy()                      # its own head kept: a hand at the face, the hat moving
        if own:
            hx = hy = None
        elif isinstance(fr.get('head'), list):
            hx, hy = fr['head']
        elif fr.get('head_match') == 'face' or spec.get('head_match') == 'face':
            # the rest pose's head moved onto the frame's own drawn head
            hb_ = spec['master']['head_box']
            _, hx, hy, err = register(F, pad(R), [hb_[0] + FM, hb_[1] + FM, hb_[2] + FM, min(hb_[3], spec['collar_y']) + FM],
                                      scales=[1.0], span=60)
        else:                                              # where its stock and collar are: the head sits on them
            # the rest pose moved onto the frame: its stock lands on the frame's
            sb = spec.get('stock_box', [200, 140, 310, 230])
            _, hx, hy, err = register(F, pad(R), [v + FM for v in sb], scales=[1.0], span=40)
        if not own and (spec['master'].get('replace_head') or fr.get('cut_head')):
            # its own head goes, as the rest pose's did: under the master head
            # (moved onto this neck) and a margin round it, above the collar, so
            # never the coat or epaulettes beside it
            cut = ndimage.shift(pad(mhead), (hy, hx), order=0, cval=False)
            cut = ndimage.binary_dilation(cut, iterations=fr.get('head_margin', 16))
            # and, round the head, its colours: the wig's white, skin, and the
            # dark outline along them (the wig is bigger in a lean, and curls on
            # past the master's outline); the coat's colours stay
            hb = spec['master']['head_box']
            box = np.zeros(fshape, bool)
            box[max(0, hb[1] + hy + FM):, max(0, hb[0] + hx - 30 + FM):min(fshape[1], hb[2] + hx + 40 + FM)] = True
            c = F[..., :3].astype(int)
            wig = (c.min(-1) > 85) & (np.ptp(c, axis=-1) < 50)               # its shading too
            skin = (c[..., 0] > 170) & (c[..., 0] - c[..., 2] > 60) & (c[..., 1] > 100) & (c[..., 1] < 175) & (c[..., 2] > 80) & (c[..., 2] < 140)
            dark = (c.max(-1) < 60) & ~(c[..., 2] > c[..., 0] + 15)          # outline and ribbon, not navy
            head = ndimage.binary_dilation(wig | skin, iterations=2)
            head |= dark & ndimage.binary_dilation(wig, iterations=6)
            head &= ~((c[..., 2] > c[..., 0] + 15) & (c.max(-1) > 50))      # never the coat
            cut |= box & head
            line = max(0, spec['collar_y'] + hy + FM)
            cut[line:] = False
            fm_before = fm.copy()
            fm &= ~cut
            # the head's crumbs left past the cut: above the collar line, keep only
            # what is solidly joined to the body below it (thin bridges broken)
            above = fm.copy()
            above[line:] = False
            solid = ndimage.binary_opening(above, iterations=2)
            solid[line:] = fm[line:]
            lab, n = ndimage.label(solid)
            keep = np.isin(lab, np.unique(lab[line:][fm[line:]]))
            fm = fm & ((np.arange(fshape[0])[:, None] >= line) | ndimage.binary_dilation(keep & (lab > 0), iterations=2))
        rgba = F.copy()
        rgba[..., 3] = np.where(fm, F[..., 3], 0)
        if not spec.get('no_peel'):                        # (a brown coat is the wood's colour: it would be eaten)
            rgba = np.where(props[..., None], rgba, peel_wood(rgba.copy()))
        if not own and (spec.get('fill_shoulders') or fr.get('fill_shoulders')) and (spec['master'].get('replace_head') or fr.get('cut_head')):
            # the master head's neck is narrower than the frame's head: what the cut
            # took beside it, below the master's chin line, is shoulder, filled with
            # the coat round it so no hole shows between head and coat
            core = ndimage.shift(pad(mhead_core), (hy, hx), order=0, cval=False)
            # the gap between the master's neck and the frame's coat: inside their
            # joined outline (closed over a few pixels), or where the frame had its head
            joined = ndimage.binary_fill_holes(ndimage.binary_closing(fm | core, iterations=spec.get('shoulder_close', 14)))
            hole = (joined | ndimage.binary_fill_holes(fm_before)) & ~fm & ~core
            hole &= np.arange(fshape[0])[:, None] < spec['collar_y'] + hy + FM + 20
            print(f'  frame {name}: {int(hole.sum())} pixels of shoulder filled beside the master neck')
            hole &= np.arange(fshape[0])[:, None] > spec['master']['shoulder_y'] + hy + FM
            c = rgba[..., :3].astype(int)
            coat = fm & (c.max(-1) < 110) & (c.max(-1) > 25) & (np.ptp(c, axis=-1) < 60)
            if hole.any() and coat.any():
                _, (iy, ix) = ndimage.distance_transform_edt(~coat, return_indices=True)
                field = ndimage.uniform_filter(rgba[iy, ix, :3].astype(float), size=(7, 7, 1))
                rgba[..., :3] = np.where(hole[..., None], field, rgba[..., :3]).astype(np.uint8)
                rgba[..., 3] = np.where(hole, 255, rgba[..., 3])
        # pale flecks on the outline (the sheet's white, kept by the resize):
        # off, a pixel at a time from outside in; cuffs and collars are cream,
        # warmer than the paper
        for _ in range(3):
            c = rgba[..., :3].astype(int)
            rim = ndimage.binary_dilation(rgba[..., 3] < 128, iterations=2) & (rgba[..., 3] > 0)
            pale = rim & (((c.min(-1) > 185) & (np.ptp(c, axis=-1) < 28)) |      # the paper
                          ((c.min(-1) > 100) & (np.ptp(c, axis=-1) < 16))) & ~props  # and grey, half paper
            if not pale.any():
                break
            rgba[..., 3] = np.where(pale, 0, rgba[..., 3])
        lab, n = ndimage.label(rgba[..., 3] > 0)           # the outline's dots the flecks stood between
        if n:
            sz = ndimage.sum(rgba[..., 3] > 0, lab, range(1, n + 1))
            rgba[..., 3] = np.where(np.isin(lab, 1 + np.nonzero(sz < 80)[0]) & ~props, 0, rgba[..., 3])
        # "body_under": where a prop the game draws itself was cut out (cards
        # held up), his body from the rest pose shows instead of a hole
        for poly in fr.get('body_under', []):
            under = pm(poly) & (pad(body)[..., 3] > 0)
            pb = pad(body)
            rgba[..., :3] = np.where(under[..., None], pb[..., :3], rgba[..., :3])
            rgba[..., 3] = np.where(under, pb[..., 3], rgba[..., 3])
        for poly in fr.get('fill', []):                    # coat filled in from round it
            hole = pm(poly)
            cc = rgba[..., :3].astype(int)                 # the coat's own tone: not outline, not skin
            known = (rgba[..., 3] > 200) & (cc.max(-1) > 14) & (cc.max(-1) < 42) & (np.ptp(cc, axis=-1) < 12) & ~hole
            # smoothed over the nearest coat everywhere, so a hand beside the
            # hole never bleeds into it
            _, (iy, ix) = ndimage.distance_transform_edt(~known, return_indices=True)
            field = ndimage.uniform_filter(rgba[iy, ix, :3].astype(float), size=(9, 9, 1))
            rgba[..., :3] = np.where(hole[..., None], field, rgba[..., :3]).astype(np.uint8)
            rgba[..., 3] = np.where(hole, 255, rgba[..., 3])
        # every cut edge darkened to its outline, as load_pose does: an edge cut
        # through the paper's anti-aliasing is grey, a dotted line on a dark room
        edge = ndimage.binary_dilation(rgba[..., 3] < 128, iterations=2) & (rgba[..., 3] > 0) & ~props
        dark = np.stack([ndimage.minimum_filter(rgba[..., ch], size=3) for ch in range(3)], -1)
        rgba[..., :3] = np.where(edge[..., None], dark, rgba[..., :3])
        frames[name] = (rgba, hx, hy)

    # ---------------------------------------------------------------- write
    files = {}
    def save(name, rgba):
        f = os.path.join(out_dir, f'{name}.png')
        Image.fromarray(upscale(rgba, k)).save(f)
        files[name] = f
    save('body', body)
    for side in upper:
        save(f'upper_{side}', upper[side])
    for (side, state), rgba in assets.items():
        save(f'arm_{side}_{state}', rgba)
    Image.fromarray(R).save(os.path.join(out_dir, 'source_rest.png'))

    head_cx, head_cy = X(hb[0]) + mx + mw * mk / 2, Y(hb[1]) + my + mh * mk / 2
    face = json.load(open(os.path.join(HERE, m['layers'], 'layers.json')))

    parts = []
    def part(name, img, cx, cy, z, bone, slot, scale=1.0, visible=True, on_table=False, clip=None, with_=None):
        p = {'name': name, 'img': img, 'cx': round(cx, 2), 'cy': round(cy, 2), 'rot': 0, 'scale': scale,
             'flip': False, 'z': z, 'slot': slot, 'visible': visible, 'onTable': on_table, 'bone': bone}
        if clip:
            p['clip'] = clip
        if with_:
            p['with'] = with_                              # shown only while that part is
        parts.append(p)
    bw, bh = round(shape[1] * k), round(shape[0] * k)
    cx0, cy0 = X(0) + bw / 2, Y(0) + bh / 2
    part('torso', 'body.png', cx0, cy0, 10, 'torso', 'torso')
    part('head.rest', 'master.png', head_cx, head_cy, 20, 'head', 'head', scale=mk)
    for z_, kind in ((0.1, 'eyes'), (0.2, 'brows'), (0.3, 'mouth')):
        for state, f in face.get(kind, {}).items():
            part(f'{kind}.{state}', f, head_cx, head_cy, 20 + z_, 'head', kind, scale=mk, visible=False, with_='head.rest')
    # other heads (turned away, toward the viewer...): drawn on the face sheet at
    # the master's scale, placed by the collar; the face layers fit only the master
    head_files = {}
    for state, piece in m.get('heads', {}).items():
        piece = os.path.join(HERE, piece)
        if m.get('head_fit') == 'brooch':                  # drawn at another size: scale and place by the brooch
            hs, dx, dy = fit_by_brooch(os.path.join(HERE, m['piece']), piece)
        else:
            hs, (dx, dy) = 1.0, fit_by_collar(os.path.join(HERE, m['piece']), piece)
        dx, dy = dx + m.get('head_nudge', {}).get(state, [0, 0])[0], dy + m.get('head_nudge', {}).get(state, [0, 0])[1]
        f = f'head_{state}.png'
        face_rig.cut_below(Image.open(piece), (m['cut_below'] - dy) / hs).save(os.path.join(HERE, m['layers'], f))
        head_files[f] = os.path.join(HERE, m['layers'], f)
        pw, ph = Image.open(piece).size
        x0, y0 = X(hb[0]) + mx, Y(hb[1]) + my
        print(f'  head {state}: at {dx}, {dy}, scale {hs:.3f} on the master')
        part(f'head.{state}', f, x0 + (dx + pw * hs / 2) * mk, y0 + (dy + ph * hs / 2) * mk, 20, 'head', 'head', scale=round(mk * hs, 4), visible=False)
    part('torso_over', 'torso_over.png', cx0, cy0, 21, 'torso', 'torso_over')
    for pname, (prgba, _) in head_props.items():
        save(f'prop_{pname}', prgba)
        part(f'{pname}.rest', f'prop_{pname}.png', cx0, cy0, spec['master']['props'][pname].get('z', 20.4), pname, pname)
    fcx, fcy = X(-FM) + fshape[1] * k / 2, Y(-FM) + fshape[0] * k / 2
    for name, (rgba, hx, hy) in frames.items():
        save(f'frame_{name}', rgba)
        part(f'frame.{name}', f'frame_{name}.png', fcx, fcy, 10, 'torso', 'frame', visible=False, on_table=True)
        if hx is None:
            print(f'  frame {name}: its own head')
            continue
        fo = upscale(rgba, k).astype(float)
        rows_ = np.arange(fo.shape[0])[:, None] / k - FM
        fo[..., 3] *= np.clip((rows_ - spec['collar_y'] - hy) / 3, 0, 1)
        Image.fromarray(fo.astype(np.uint8)).save(os.path.join(out_dir, f'frame_over_{name}.png'))
        part(f'frame_over.{name}', f'frame_over_{name}.png', fcx, fcy, 21, 'torso', 'frame_over', visible=False)
        print(f'  frame {name}: head at {hx}, {hy} from rest')
    zs = {'far': 22, 'near': 23}
    for (side, state), _ in assets.items():
        arm = spec['arms'][side]
        over = arm['assets'][state].get('over')            # an arm drawn out over the robe's edge
        part(f'arm_{side}.{state}', f'arm_{side}_{state}.png', cx0, cy0, 24.5 if over else zs[side], f'arm_{side}', f'arm_{side}',
             visible=state == arm['rest'], on_table=True)
    for side in upper:
        part(f'upper_{side}', f'upper_{side}.png', cx0, cy0, 24, 'torso', f'upper_{side}')

    # torso again over the master head's neck, from the collar down
    nb = upscale(body, k).astype(float)
    rows = np.arange(nb.shape[0])[:, None] / k
    nb[..., 3] *= np.clip((rows - spec['collar_y']) / 3, 0, 1)
    Image.fromarray(nb.astype(np.uint8)).save(os.path.join(out_dir, 'torso_over.png'))

    neck = (X(spec['neck'][0]), Y(spec['neck'][1]))
    bones = [{'name': 'torso', 'parent': None, 'pivot': [X(150), TABLE]},
             {'name': 'head', 'parent': 'torso', 'pivot': [round(neck[0], 2), round(neck[1], 2)]}]
    for pname, pr in spec['master'].get('props', {}).items():
        bones.append({'name': pname, 'parent': 'head', 'pivot': [round(X(pr['pivot'][0]), 2), round(Y(pr['pivot'][1]), 2)]})
    for side, arm in spec['arms'].items():
        bones.append({'name': f'arm_{side}', 'parent': 'torso',
                      'pivot': [round(X(arm['elbow'][0]), 2), round(Y(arm['elbow'][1]), 2)]})

    # runtime
    rt = os.path.join(HERE, spec['runtime'])
    if os.path.isdir(rt):
        for f in os.listdir(rt):
            if f.endswith('.png') and not f.startswith('ref_'):
                os.remove(os.path.join(rt, f))
    os.makedirs(rt, exist_ok=True)
    for f in os.listdir(out_dir):
        if f.endswith('.png') and not f.startswith(('_', 'source', 'validate')):
            shutil.copyfile(os.path.join(out_dir, f), os.path.join(rt, f))
    shutil.copyfile(os.path.join(HERE, m['file']), os.path.join(rt, 'master.png'))
    for kind, states in face.items():
        for f in states.values():
            shutil.copyfile(os.path.join(HERE, m['layers'], f), os.path.join(rt, f))
    for f, src_ in head_files.items():
        shutil.copyfile(src_, os.path.join(rt, f))
    shutil.copyfile(os.path.join(HERE, 'rooms', 'table_preview.png'), os.path.join(rt, 'table_preview.png'))
    rig = {'id': spec['id'], 'name': spec['name'],
           'note': 'Generated by art-tools/pose_rig.py from the pose illustrations: do not edit.',
           'canvas': {'w': W, 'h': H}, 'tableLine': TABLE, 'table': 'table_preview.png',
           'bones': bones, 'face': {k_: list(v) for k_, v in face.items()}, 'parts': parts,
           'source': {'rest': spec['rest'], 'registered': {n: list(r) for n, r in regs.items()}}}
    if frames:                                             # where each frame moves the head (canvas pixels)
        rig['frames'] = {n: None if hx is None else [round(hx * k, 2), round(hy * k, 2)] for n, (_, hx, hy) in frames.items()}
    json.dump(rig, open(os.path.join(rt, 'rig.json'), 'w'), indent=1)

    # a build_puppet layout, for mock_screen and previews
    lay = []
    for p in parts:
        im = Image.open(os.path.join(rt, p['img']))
        w, h = im.width * p['scale'], im.height * p['scale']
        lay.append({'file': os.path.relpath(os.path.join(rt, p['img']), HERE), 'label': p['name'],
                    'x': round(p['cx'] - w / 2), 'y': round(p['cy'] - h / 2), 'scale': p['scale'], 'rot': 0,
                    'z': p['z'], 'visible': p['visible'], 'slot': p['slot'], **({'on_table': True} if p['onTable'] else {})})
    lay.append({'file': 'rooms/table_preview.png', 'label': 'table (preview only)', 'x': 0, 'y': TABLE,
                'scale': 1.0, 'rot': 0, 'z': 25, 'visible': True, 'slot': 'table'})
    json.dump({'canvas': {'w': W, 'h': H}, 'background': [18, 18, 22, 255], 'table_line': TABLE,
               'note': f"{spec['name']}, rebuilt from the pose illustrations by pose_rig.py.", 'parts': lay},
              open(os.path.join(HERE, f"{spec['id']}_layout.json"), 'w'), indent=1)

    # validation: the rest pose rebuilt (body, arms, upper arms; the illustration's
    # own head, not the master) against the illustration, and their difference
    rebuilt = Image.new('RGBA', (shape[1], shape[0]), (0, 0, 0, 0))
    for layer in [body] + [assets[(s, a['rest'])] for s, a in spec['arms'].items()] + list(upper.values()):
        rebuilt.alpha_composite(Image.fromarray(layer))
    orig = R.copy()
    orig[..., 3] = np.where(sil, R[..., 3], 0)            # all of him: what the colour filters dropped too
    diff = np.abs(np.array(rebuilt).astype(int) - orig.astype(int))[..., :3].sum(-1)
    seen = (orig[..., 3] > 128) & (np.arange(shape[0])[:, None] < ty)
    if m.get('replace_head'):                              # the master head stands in there
        hb = m['head_box']
        seen[hb[1]:min(hb[3], spec['collar_y']), hb[0]:hb[2]] = False
    print(f'  rest pose vs illustration, above the rail: {100 * (diff[seen] > 40).mean():.2f}% of pixels differ, '
          f'mean difference {diff[seen].mean():.1f}')
    bg = lambda im: Image.alpha_composite(Image.new('RGBA', im.size, (90, 180, 90, 255)), im).convert('RGB')
    v = Image.new('RGB', (shape[1] * 3, shape[0]))
    v.paste(bg(Image.fromarray(orig)), (0, 0))
    v.paste(bg(rebuilt), (shape[1], 0))
    dm = np.clip(diff * 2, 0, 255).astype(np.uint8)
    v.paste(Image.fromarray(np.dstack([dm, dm, dm])), (shape[1] * 2, 0))
    v.resize((v.width * 2, v.height * 2), Image.NEAREST).save(os.path.join(out_dir, 'validate.png'))
    print(f"{spec['id']}: rig -> {os.path.relpath(rt, os.path.dirname(HERE))}")


if __name__ == '__main__':
    main(sys.argv[1])
