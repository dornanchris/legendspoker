"""The AI's puppet, made from the Robot's (the owner: "The AI possesses the
Robot, so we could really just change its glow"). Every image of the built
Robot (web/art/robot/) is copied to web/art/the_ai/ with its glow taken over:

  * the chest lamp becomes the AI's lens light: a pale, cold white with a
    faint ice-blue tint (NEVER red: HAL is protected, and the character file
    says so), matching the ceiling lens in the Station's room;
  * the eye lamps go DARK, dead glass (the character file: "the eye-lamps
    stay dark");
  * the speaker grille, when it glows (speech, the laugh), glows the same
    cold white: the AI speaks through the Robot's grille.

A glow is found as a hot core (bright, yellow: red > 230, green > 175, blue
< 200, at least 25 px) and everything it reaches without crossing a dark
outline (the lamp's glass inside its rim), never further than 45 px from the
core. Brass is the same hue but never that bright, so the brass bands and the
lamp's brass rim are left alone. A core is an eye when it is small and round
and stands above the biggest core (the chest lamp) in a whole figure, or is
anywhere in a head image (master, eyes_*); a grille glow (mouth_*, and the
wide glow under the eyes in a frame) stays lit.

Two frames the Robot does not have are made from its eyes-dimmed pose (B5,
the rest pose with dimmer eyes, which with the eyes dark is the rest pose):
`narrow` (the lens narrowed to a bright point: its tell, "the lens narrows")
and `dimmed` (the lens dimmed: "the lights in the room dim a shade").

  python3 art-tools/the_ai_parts/recolour.py
then  python3 art-tools/web_half.py the_ai; python3 art-tools/build/portraits.py
"""
import json, os, shutil
import numpy as np
from PIL import Image
from scipy import ndimage as nd

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, 'web', 'art', 'robot')
OUT = os.path.join(ROOT, 'web', 'art', 'the_ai')
COLD = np.array([226.0, 238.0, 255.0])     # pale cold white, a touch of ice blue
DEAD = np.array([38.0, 44.0, 54.0])        # dark glass


def glows(a, loose=False):
    """Glow regions of an RGBA array, each (core, region). A core is saturated
    as well as bright: a highlight on the steel is bright but grey. `loose`
    (the grille's own speech layers, a dimmer glow) takes any warm light."""
    c = a[..., :3].astype(int)
    solid = a[..., 3] > 100
    mx, mn = c.max(-1), c.min(-1)
    sat = (mx - mn) / np.maximum(mx, 1)
    # the lamp's own saturated warm light: never the brushed steel (tan, far
    # less saturated); the dark outline round a lamp stops the fill, so never
    # the brass rim beyond it either
    warm = solid & (c[..., 0] > 150) & (sat > 0.5) & (c[..., 1] > 0.45 * c[..., 0])
    if loose:
        core = warm & (c[..., 0] > 170)
    else:
        core = solid & (c[..., 0] > 230) & (c[..., 1] > 175) & (c[..., 2] < 200) & (sat > 0.35)
    lab, n = nd.label(core, structure=np.ones((3, 3)))
    sizes = nd.sum(core, lab, range(1, n + 1))
    keep = [i + 1 for i, s_ in enumerate(sizes) if s_ >= (6 if loose else 25)]
    passable = solid & (mx >= 120)
    regions = []
    for k in keep:
        seed = lab == k
        near = nd.distance_transform_edt(~seed) <= 40
        reach, _ = nd.label(passable & near & (warm | seed))
        ids = np.unique(reach[seed])
        region = np.isin(reach, ids[ids > 0]) & near
        region = nd.binary_dilation(region, iterations=1) & (warm | seed)
        # lamp light, not a brass highlight: the brightest fifth of a lamp's
        # glass is a clear yellow (green about nine tenths of red), where the
        # brightest brass is oranger (three quarters to 0.86)
        px = c[region]
        top = px[np.argsort(px.sum(1))[-max(10, len(px) // 5):]]
        gr, g = (top[:, 1] / np.maximum(top[:, 0], 1)).mean(), top[:, 1].mean()
        regions.append((seed, region, loose or (gr >= 0.875 and g >= 215), gr >= 0.82 and g >= 185))
    strong = [(s_, r) for s_, r, ok, _ in regions if ok]
    # the far eye, small and dimmer: a weaker lamp light counts beside a lamp
    # already found (never on its own, or the brightest brass would)
    cents = [np.argwhere(r).mean(0) for _, r in strong]
    for s_, r, ok, weak in regions:
        if ok or not weak or not cents:
            continue
        ys, xs = np.nonzero(r)
        w, h = np.ptp(xs) + 1, np.ptp(ys) + 1
        cy, cx = ys.mean(), xs.mean()
        fill = r.sum() / (w * h)
        # the far eye: level with the near one and to its right (drawn facing right), solid
        if 0.3 < w / h < 1.8 and r.sum() >= 50 and fill > 0.5 and any(abs(cy - c[0]) < 25 and 25 < cx - c[1] < 90 for c in cents):
            strong.append((s_, r))
    return strong


def classify(name, regions):
    """'eye', 'grille' or 'lens' for each glow (brass is already left out)."""
    if name.startswith('mouth_'):
        return ['grille'] * len(regions)
    if name == 'master.png' or name.startswith('eyes_'):
        return ['eye'] * len(regions)                # a head alone: its lamps are its eyes
    if not regions:
        return []
    shape = []
    for seed, r in regions:
        ys, xs = np.nonzero(r)
        shape.append((r.sum(), np.ptp(xs) + 1, np.ptp(ys) + 1, ys.mean()))
    big = max(range(len(shape)), key=lambda i: shape[i][0])
    lens_y = shape[big][3]
    out = []
    for i, (a, w, h, y) in enumerate(shape):
        if i == big or y > lens_y - 25:
            out.append('lens')                       # the chest lamp, and its flare (the lamp tell)
        elif 0.45 < w / h < 1.8 and a >= 120:
            out.append('eye')
        else:
            out.append('grille')                     # a bar of the lit grille
    return out


def recolour(a, name):
    a = a.astype(float)
    regions = glows(a.astype(np.uint8), loose=name.startswith('mouth_'))
    kinds = classify(name, regions)
    c = a[..., :3]
    lum = (0.3 * c[..., 0] + 0.59 * c[..., 1] + 0.11 * c[..., 2]) / 255
    for (seed, r), kind in zip(regions, kinds):
        if kind is None:
            continue
        if kind == 'eye':
            new = DEAD[None, None] * (0.6 + 0.8 * lum[..., None])
            new[seed] = new[seed] * 0.7 + 30                 # a dull glint where the light was
        else:
            new = COLD[None, None] * np.clip(lum[..., None] ** 0.8 * 1.05, 0, 1)
        c[r] = new[r]
    a[..., :3] = c
    return np.clip(a, 0, 255).astype(np.uint8)


def lens_variant(a, how):
    """The rest pose's lens narrowed to a point, or dimmed."""
    a = a.astype(float)
    c = a[..., :3]
    lum = c.mean(-1)
    solid = a[..., 3] > 100
    hot = solid & (lum > 200) & (c[..., 2] >= c[..., 0])
    lab, n = nd.label(hot)
    if not n:
        return a.astype(np.uint8)
    sizes = nd.sum(hot, lab, range(1, n + 1))
    k = int(np.argmax(sizes)) + 1
    ys, xs = np.nonzero(lab == k)
    cy, cx = ys.mean(), xs.mean()
    rad = max(np.ptp(xs), np.ptp(ys)) / 2
    glass = nd.binary_fill_holes(lab == k)
    glass = nd.binary_dilation(glass, iterations=4) & solid & (c.max(-1) > 90) & (c[..., 2] >= c[..., 0] - 5)
    yy, xx = np.mgrid[:a.shape[0], :a.shape[1]]
    d = np.hypot(yy - cy, xx - cx) / max(rad, 1)
    if how == 'narrow':
        k_ = np.clip((d - 0.18) / 0.12, 0, 1)            # bright point in the middle, dark glass round it
        dark = DEAD[None, None] * (0.8 + 0.4 * (c / 255))
        c[glass] = (c * (1 - k_[..., None]) + dark * k_[..., None])[glass]
        pt = (d < 0.12) & glass
        c[pt] = 255
    else:
        c[glass] = (c * 0.42 + DEAD[None, None] * 0.3)[glass]
    a[..., :3] = c
    return np.clip(a, 0, 255).astype(np.uint8)


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)
    for f in sorted(os.listdir(SRC)):
        p = os.path.join(SRC, f)
        if os.path.isdir(p) or f in ('anim.json', 'portrait.webp', 'table_preview.png', 'frames_check.png'):
            continue
        if f.endswith('.png') and not f.startswith('ref_'):
            im = np.array(Image.open(p).convert('RGBA'))
            Image.fromarray(recolour(im, f)).save(os.path.join(OUT, f), optimize=True)
        else:
            shutil.copyfile(p, os.path.join(OUT, f))
    base = np.array(Image.open(os.path.join(OUT, 'frame_eyes_dim.png')).convert('RGBA'))
    for how in ('narrow', 'dimmed'):
        Image.fromarray(lens_variant(base, how)).save(os.path.join(OUT, f'frame_{how}.png'), optimize=True)
    rig = json.load(open(os.path.join(OUT, 'rig.json')))
    rig['id'], rig['name'] = 'the_ai', 'The AI'
    rig['note'] = 'The Robot\'s rig with its glow taken over (art-tools/the_ai_parts/recolour.py): ' + rig.get('note', '')
    src = next(p for p in rig['parts'] if p['name'] == 'frame.eyes_dim')
    for how in ('narrow', 'dimmed'):
        rig['parts'] = [p for p in rig['parts'] if p['name'] != f'frame.{how}']
        rig['parts'].append({**src, 'name': f'frame.{how}', 'img': f'frame_{how}.png'})
        rig['frames'][how] = None
    json.dump(rig, open(os.path.join(OUT, 'rig.json'), 'w'), indent=1)
    print('the_ai: recoloured from the Robot')


if __name__ == '__main__':
    main()
