"""Washington's IK arms, from the owner's rigging-parts sheet (RIG_PARTS.md):

    python3 art-tools/washington_parts/ik_build.py

The test beside Lincoln's: Lincoln's IK arm was cut from his pose drawings;
Washington's hands were DRAWN as parts (sources/rig_parts.png, cut into
washington_rigparts/ by cut_sheet.py with cut_rigparts.json).

Each arm is a two-bone chain (web/puppet/ik.ts): the upper arm and the
forearm are his own rest-pose sleeve (the rig's upper-arm patch and the navy
part of his rest arm), so the chain at rest IS his rest pose; the hands are
the sheet's, each with its own cuff and lace, laid where his rest cuff is:
  * the sheet's resting hand is fitted to the rig's rest hand (scale, turn,
    place) by the overlap of their silhouettes;
  * every other hand is fitted to that one by its cuff (the sleeve stub and
    what is drawn round it), at the same scale, so the wrists line up;
  * the navy sleeve stub each hand was drawn with is dropped (the forearm is
    the rig's own); the rest state is the rig's own cuff and hand;
  * the near arm has an `under` patch: clean coat where the resting arm lay
    (the rig's body image has only a smear there, which the lifted arm showed).
The sheet drew the left hands pointing the same way as the right ones, so
they are mirrored. Each placed image is written in rig pixels, as
ik_split.py's are, so the runtime only translates them.
"""
import json, os
import numpy as np
from PIL import Image
from scipy import ndimage
from scipy.signal import fftconvolve

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
ART = os.path.join(ROOT, 'web', 'art', 'washington')
PIECES = os.path.join(HERE, 'washington_rigparts')
rig = json.load(open(os.path.join(ART, 'rig.json')))
part = {p['name']: p for p in rig['parts']}
bone = {b['name']: b for b in rig['bones']}


def placed(name):
    p = part[name]
    im = np.array(Image.open(os.path.join(ART, p['img'])).convert('RGBA'))
    h, w = im.shape[:2]
    return im, (p['cx'] - w / 2, p['cy'] - h / 2)


def piece(i, mirror=False):
    im = Image.open(os.path.join(PIECES, f'washington_rigparts_{i:02d}.png')).convert('RGBA')
    return np.array(im.transpose(Image.FLIP_LEFT_RIGHT) if mirror else im)


navy = lambda a: (a[..., 3] > 128) & (a[..., :3].max(-1) < 110) & (a[..., 2].astype(int) > a[..., 0].astype(int) + 8)
solid = lambda a: a[..., 3] > 128


def stub(a):
    """The sleeve stub a hand was drawn with: the biggest navy shape (never a card back: those are small and patterned)."""
    m = ndimage.binary_closing(navy(a), iterations=2)
    lab, n = ndimage.label(m)
    if not n:
        return np.zeros(m.shape, bool)
    sizes = ndimage.sum(m, lab, range(1, n + 1))
    # the stub is drawn at the top (the hand reaches down out of it); cards lie at the bottom
    tops = np.array([sl[0].start for sl in ndimage.find_objects(lab)])
    sizes = np.where(tops < 0.25 * m.shape[0], sizes, 0)
    return lab == 1 + int(np.argmax(sizes))


def biggest(m):
    lab, n = ndimage.label(m)
    return lab == 1 + int(np.argmax(ndimage.sum(m, lab, range(1, n + 1)))) if n else m


def keep_big(m, px):
    lab, n = ndimage.label(m)
    return np.isin(lab, 1 + np.nonzero(ndimage.sum(m, lab, range(1, n + 1)) >= px)[0]) if n else m


def cuff_mask(a):
    """What identifies a wrist: the stub and what is drawn within reach of it (the cuff and lace)."""
    s = stub(a)
    near = ndimage.binary_dilation(s, iterations=26) & solid(a)
    return near


def warp(img, s, deg, out_shape, tx, ty, order=1):
    """img (H,W[,C]) scaled by s, turned deg (clockwise on screen) about its centre, then its centre put at (tx, ty) in out_shape."""
    h, w = img.shape[:2]
    r = np.deg2rad(deg)
    c, sn = np.cos(r), np.sin(r)
    # output (y, x) -> input (y, x): inverse of  p_out = R S (p_in - centre_in) + (tx, ty)
    A = np.array([[c, sn], [-sn, c]]) / s          # in (y, x) order: inverse rotation, inverse scale
    off = np.array([h / 2, w / 2]) - A @ np.array([ty, tx])
    if img.ndim == 2:
        return ndimage.affine_transform(img.astype(float), A, offset=off, output_shape=out_shape, order=order)
    return np.stack([ndimage.affine_transform(img[..., k].astype(float), A, offset=off, output_shape=out_shape, order=order)
                     for k in range(img.shape[2])], -1)


def best_place(src_mask, dst_mask, scales, degs, down=2):
    """The scale, turn and centre that lay src_mask over dst_mask best (by overlap), searched coarse at 1/down."""
    D = dst_mask[::down, ::down].astype(float)
    best = (-1, None)
    H, W = D.shape
    for s in scales:
        for d in degs:
            src = warp(src_mask.astype(float), s / down, d, (H, W), W / 2, H / 2) > 0.5
            if not src.any():
                continue
            corr = fftconvolve(D, src[::-1, ::-1].astype(float), mode='same')
            iy, ix = np.unravel_index(np.argmax(corr), corr.shape)
            ov = corr[iy, ix]
            iou = ov / (D.sum() + src.sum() - ov)
            if iou > best[0]:
                # 'same' mode: the source centred at (W/2, H/2) is best moved by (ix - W/2, iy - H/2)
                best = (iou, (s, d, (W / 2 + ix - W // 2) * down, (H / 2 + iy - H // 2) * down))
    return best


def put(name, rgba_rig, z, on_table):
    """Write a rig-sized RGBA layer as a cropped image and its place in the rig."""
    yy, xx = np.nonzero(rgba_rig[..., 3] > 8)
    t, b, l, r = yy.min(), yy.max() + 1, xx.min(), xx.max() + 1
    crop = Image.fromarray(np.clip(rgba_rig[t:b, l:r], 0, 255).astype(np.uint8))
    crop.save(os.path.join(ART, f'ik_{name}.png'), optimize=True)
    crop.resize((max(1, crop.width // 2), max(1, crop.height // 2)), Image.LANCZOS).save(os.path.join(ART, 'half', f'ik_{name}.png'), optimize=True)
    return {'img': f'ik_{name}.png', 'x': float(l), 'y': float(t), 'z': z, 'onTable': on_table}


W_, H_ = rig['canvas']['w'], rig['canvas']['h']


def to_rig(arr, origin):
    """An image in its own pixels, at origin (rig px), as a rig-sized layer."""
    out = np.zeros((H_, W_, 4), float)
    ox, oy = int(round(origin[0])), int(round(origin[1]))
    h, w = arr.shape[:2]
    out[oy:oy + h, ox:ox + w] = arr
    return out


def under_patch(side, covered):
    """The coat the resting arm covered: the rig's body image has only a smear there
    (pose_rig's fill), which shows once the arm lifts. Filled by carrying each
    column of coat down from just above it, softened, inside the body's own outline,
    down to the table line."""
    body, (bx, by) = placed('torso')
    body_r = to_rig(body, (bx, by))
    hole = ndimage.binary_dilation(covered, iterations=6) & (body_r[..., 3] > 0)
    # and the smear's pale blots just past it (the lace that was cut away, blurred)
    rgb = body_r[..., :3].astype(int)
    pale = (rgb.max(-1) > 90) & (rgb.max(-1) - rgb.min(-1) < 50)
    hole |= ndimage.binary_dilation(ndimage.binary_dilation(covered, iterations=20) & pale & (body_r[..., 3] > 0), iterations=3) & (body_r[..., 3] > 0)
    hole[int(rig['tableLine']) + 14:] = False
    # each column carries on down what is drawn just above the hole (the coat, the
    # waistcoat's edge): the drawing's rail and the table's light smeared in below
    fill = body_r.astype(float).copy()
    for x in np.nonzero(hole.any(0))[0]:
        ys = np.nonzero(hole[:, x])[0]
        y0 = max(0, ys.min() - 8)
        fill[ys, x] = body_r[y0, x]
    soft = np.stack([ndimage.gaussian_filter(fill[..., k], (2, 5)) for k in range(3)], -1)
    out = np.zeros_like(body_r)
    out[..., :3] = soft
    out[..., 3] = np.where(hole, body_r[..., 3], 0)
    # over torso_over (z 21: pose_rig draws the body again over the neck, smear and all)
    return put(f'under_{side}', out, 21.5, False)


def chain(side, hand_pieces, mirror, shoulder, wrist_at, scale, z, turns={}, under=False):
    arm, (ax, ay) = placed(f'arm_{side}.rest')
    upper, (ux, uy) = placed(f'upper_{side}')
    arm_r, upper_r = to_rig(arm, (ax, ay)), to_rig(upper, (ux, uy))
    sleeve = navy(arm_r)
    # the forearm: the rest arm's sleeve and its own outline, up to the cuff (one piece)
    fore_m = biggest(solid(arm_r) & ndimage.binary_dilation(sleeve, iterations=3))
    rest_cuffhand = keep_big(solid(arm_r) & ~fore_m, 120)
    fore = arm_r.copy()
    fore[..., 3] = np.where(fore_m, arm_r[..., 3], 0)
    hand_rest = arm_r.copy()
    hand_rest[..., 3] = np.where(rest_cuffhand, arm_r[..., 3], 0)
    # the elbow is the rig's own; the wrist is where the cuff meets the sleeve
    elbow = bone[f'arm_{side}']['pivot']
    # the wrist: where the rest sleeve meets the gold cuff (found on a grid over his rest pose;
    # the navy shadow under his hand makes a colour test wander)
    wrist = list(wrist_at)

    # every sheet hand is laid on the end of the forearm by its WRIST: where its
    # sleeve stub meets its cuff goes to where the rest sleeve meets the rest cuff,
    # and the stub's direction along the forearm (elbow -> wrist), at one scale per
    # arm (measured from the hands: the far arm is further away and drawn smaller)
    ar = np.degrees(np.arctan2(wrist[1] - elbow[1], wrist[0] - elbow[0]))
    hands = {'rest': put(f'hand_{side}_rest', hand_rest, z['hand'], True)}
    for state, i in hand_pieces.items():
        src = piece(i, mirror)
        st = stub(src)
        dark = src[..., :3].max(-1) < 90
        junction = ndimage.binary_dilation(st, iterations=3) & ~st & solid(src) & ~dark
        jy, jx = np.nonzero(junction)
        sy, sx = np.nonzero(st)
        J = np.array([jx.mean(), jy.mean()])
        a_s = np.degrees(np.arctan2(J[1] - sy.mean(), J[0] - sx.mean()))
        deg = a_s - ar + turns.get(state, 0)
        c, sn = np.cos(np.radians(deg)), np.sin(np.radians(deg))
        h_, w_ = src.shape[:2]
        v = (J - [w_ / 2, h_ / 2]) * scale
        t = np.array(wrist) - [c * v[0] + sn * v[1], -sn * v[0] + c * v[1]]
        img = src.copy()
        drop = ndimage.binary_dilation(st, iterations=1) | (ndimage.binary_dilation(st, iterations=5) & dark)
        img[..., 3] = np.where(keep_big(solid(img) & ~drop, 150), img[..., 3], 0)
        layer = warp(img, scale, deg, (H_, W_), t[0], t[1])
        hands[state] = put(f'hand_{side}_{state}', layer, z['hand'], True)
        print(f'  {side} {state} (piece {i}): stub at {a_s:.0f} deg, turned {deg:.0f}')
    return {
        'chain': f'arm_{side}', 'bone': 'torso',
        'shoulder': shoulder, 'elbow': [float(elbow[0]), float(elbow[1])], 'wrist': wrist,
        'hides': [f'arm_{side}', f'upper_{side}'],
        'parts': {'upper': put(f'upper_{side}', upper_r, z['upper'], False),
                  'fore': put(f'fore_{side}', fore, z['fore'], True),
                  'hands': hands,
                  **({'under': under_patch(side, fore_m | rest_cuffhand)} if under else {})},
    }


near = chain('near', {'sheet_rest': 5, 'point': 6, 'peek': 7, 'chips': 8, 'fold': 9, 'square': 10, 'show': 11, 'talk': 12, 'pinch': 13},
             False, [380.0, 772.0], [403.0, 884.0], 0.68, {'upper': 24, 'fore': 23, 'hand': 22.9}, under=True)
far = chain('far', {'sheet_rest': 14, 'lift': 15, 'drum': 16}, True, [745.0, 790.0], [752.0, 885.0], 0.55, {'upper': 24, 'fore': 22, 'hand': 21.9})
json.dump({'note': 'GENERATED by art-tools/washington_parts/ik_build.py: IK arms from the drawn rigging parts. Rig pixels.',
           'chains': [near, far]}, open(os.path.join(ART, 'ik.json'), 'w'), indent=1)
print('wrote', os.path.join(ART, 'ik.json'))
