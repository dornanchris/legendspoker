"""Add a reactions sheet E (rest again, the big win, the crushing loss) to a
kit built from a hand-written pose_rig.json: finds the three figures, places
them against the rest pose, and adds poses E1-E3 and the frames `win_big` (E2)
and `lose_big` (E3). Then rebuild as usual, and run reactions.py for the clips:

  python3 art-tools/build/reactions_sheet.py lincoln [--keep-wood] [--rest-props]
  python3 art-tools/pose_rig.py art-tools/lincoln_parts/pose_rig.json
  python3 art-tools/build/reactions.py lincoln   (then win_small, tell_hold, life, web_half)

The sheet is drawn at its own size. E1 (the rest pose redrawn) fixes the scale
and offset: its head and shoulders' silhouette is fitted onto the rest pose's.
E2 and E3 keep that scale and are shifted by their own table (the felt's top
and the centre of its lower edge), since each cell's table is drawn a little
differently. A hand that reaches past the gap between cells widens its own box
and lands in the next one's, so both frames keep only their biggest piece.
Raises `frame_margin` so raised hands are not cut off at the frame's top.
--keep-wood: a coat the wood's colour (Teddy's brown suit) loses bites to the
table test; this keeps everything above the rail as drawn (a props box: felt
is still cleared). --rest-props: the rest arms' props boxes (a prop on the felt
drawn in the same place, Leonidas's helmet) go into both frames. Writes the placement it found; check it with frames_sheet.py.
"""
import json, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage as nd

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(ROOT, 'art-tools'))
import pose_rig as pr

args = [a for a in sys.argv[1:] if not a.startswith('--')]
KEEP_WOOD = '--keep-wood' in sys.argv
REST_PROPS = '--rest-props' in sys.argv
pid = args[0]
kit = os.path.join(ROOT, 'art-tools', (args[1] if len(args) > 1 else pid + '_parts'))
spec_path = os.path.join(kit, 'pose_rig.json')
spec = json.load(open(spec_path))
sheet = os.path.join(kit, 'sources', 'poses_e.png')
S = np.array(Image.open(sheet).convert('RGB')).astype(int)


def felt_mask(c):
    teal = (c[..., 1] > c[..., 0] + 30) & (c[..., 2] > c[..., 0] + 30) & (c[..., 1] > c[..., 2] - 25)
    green = (c[..., 1] > c[..., 0] + 25) & (c[..., 1] > c[..., 2] + 25)
    return teal | green


# the three tables: a column of the felt's band with no felt in any row is the
# white gap between cells (a hand or a prop on the felt breaks a single row)
F = felt_mask(S)
rows = np.nonzero(F.sum(1) > S.shape[1] * 0.3)[0]
has = F[rows.min():rows.max() + 1].any(0)
runs, x0 = [], None
for x, on in enumerate(has):
    if on and x0 is None: x0 = x
    if not on and x0 is not None:
        if x - x0 > 100: runs.append([x0, x])
        x0 = None
if x0 is not None and S.shape[1] - x0 > 100: runs.append([x0, S.shape[1]])
assert len(runs) == 3, f'expected three tables on the sheet, found {runs}'

# the three figures: what is neither the sheet's white nor felt, by size
fig = (S.min(2) < 225) & ~F
lab, n = nd.label(fig)
sizes = nd.sum(fig, lab, range(1, n + 1))
boxes, strips = [], []
for x0, x1 in runs:
    inside = lab[:, x0:x1][fig[:, x0:x1]]
    ids, counts = np.unique(inside, return_counts=True)
    big = ids[np.argmax(counts)]                               # this cell's figure: most of it inside the cell
    by, bx = np.nonzero(lab == big)
    l, r = min(x0, bx.min()), max(x1, bx.max() + 1)
    t = by.min(); b = np.nonzero(F[:, x0:x1].any(1))[0].max() + 1
    boxes.append([int(l), int(t), int(r - l), int(b - t)])
    strips.append((int(x0 - l), int(x1 - l)))


def table(arr, cols=None):
    """Felt top row and the centre of its lower edge, in box pixels (only within
    `cols`, its own strip: a widened box can take in the next cell's felt)."""
    f = felt_mask(arr[..., :3].astype(int)) & (arr[..., 3] > 0)
    if cols: f[:, :cols[0]] = False; f[:, cols[1]:] = False
    rr = np.nonzero(f.sum(1) > arr.shape[1] * 0.3)[0]
    top, bot = int(rr.min()), int(rr.max())
    cols = np.nonzero(f[bot - 6])[0]
    return top, (cols.min() + cols.max()) / 2


rest = spec['rest']
A = pr.load_pose(os.path.join(kit, spec['sheets'][spec['poses'][rest]['sheet']]), spec['poses'][rest]['box'])
E = [pr.load_pose(sheet, b) for b in boxes]
ta, _ = table(A)
t1, c1 = table(E[0], strips[0])
band = int(0.6 * ta)                                           # hat, head and shoulders
R = A[:band, :, 3] > 128


def fit(s, dx, dy, M):
    can = np.zeros_like(R)
    ys0, xs0 = max(0, dy), max(0, dx)
    sub = M[ys0 - dy:band - dy, xs0 - dx:A.shape[1] - dx]
    if sub.size == 0: return 0
    can[ys0:ys0 + sub.shape[0], xs0:xs0 + sub.shape[1]] = sub[:band - ys0, :A.shape[1] - xs0]
    return (R & can).sum() / max(1, (R | can).sum())


s0 = ta / t1                                                    # top of the figure to the felt, both
best = (0,)
for s in np.arange(s0 * 0.94, s0 * 1.06, s0 * 0.006):
    M = np.array(Image.fromarray(E[0]).resize((round(E[0].shape[1] * s), round(E[0].shape[0] * s)), Image.LANCZOS))[..., 3] > 128
    dy0 = int(round(ta - s * t1))
    cx = lambda m: np.nonzero(m.any(0))[0].mean()
    dx0 = int(round(cx(R) - cx(M[:band])))
    for dy in range(dy0 - 10, dy0 + 11, 2):
        for dx in range(dx0 - 60, dx0 + 61, 3):
            v = fit(s, dx, dy, M)
            if v > best[0]: best = (v, s, dx, dy, M)
_, s, dx, dy, M = best
for ddy in range(dy - 2, dy + 3):                               # to the pixel
    for ddx in range(dx - 3, dx + 4):
        v = fit(s, ddx, ddy, M)
        if v > best[0]: best = (v, s, ddx, ddy, M)
iou, s, dx, dy, _ = best
print(f'{pid}: E1 on {rest}: scale {s:.3f}, offset ({dx}, {dy}), overlap {iou:.0%}' + ('  <- LOW: check by eye' if iou < 0.8 else ''))

spec['sheets']['E'] = 'sources/poses_e.png'
what = ['the rest pose again, only to measure sheet E by', 'a big win (reactions sheet E)', 'a crushing loss (reactions sheet E)']
for i, (b, arr) in enumerate(zip(boxes, E)):
    t, c = table(arr, strips[i])
    reg = [round(float(s), 4), round(float(dx + s * (c1 - c)), 1), round(float(dy + s * (t1 - t)), 1)]
    spec['poses'][f'E{i + 1}'] = {'sheet': 'E', 'box': b, 'what': what[i], 'reg': reg}
    print(f'  E{i + 1} box {b} reg {reg}')
tops = [spec['poses'][f'E{i}']['reg'][2] for i in (2, 3)]   # where each frame's top lands in rest pixels
need = int(max(0, -min(tops)) + 30)
if spec.get('frame_margin', 0) < need:
    print(f'  frame_margin {spec.get("frame_margin", 0)} -> {need} (raised hands)')
    spec['frame_margin'] = need
for name, pose in (('win_big', 'E2'), ('lose_big', 'E3')):
    f = {'pose': pose, 'head': 'own', 'biggest': True}
    if REST_PROPS:                                             # a prop on the felt in the same place (Leonidas's helmet)
        f.setdefault('props', []).extend(pp for a in spec['arms'].values() for pp in a['assets'][a['rest']].get('props', []))
    if KEEP_WOOD:                                              # all of him above the rail, as drawn
        ty, w = spec['table_y'], A.shape[1]
        f.setdefault('props', []).append([[-400, -600], [w + 400, -600], [w + 400, ty - 8], [-400, ty - 8]])
    spec['frames'][name] = f
json.dump(spec, open(spec_path, 'w'), indent=1)
