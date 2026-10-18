"""Seat Lincoln's whole-figure frames on his chair:

    python3 art-tools/lincoln_parts/frame_seat.py

The owner: in the lean back he was "off the chair". Seven of his pose drawings
were placed by their drawn rail, but the body in them stops short of the
table line (lean back by 21 rig px, the greeting by 41), so the room showed
between him and the table. Every other puppet's frames reach it
(a scan of every rig's frames against its table line).

While a frame is showing, each clip that shows it moves the torso bone (which
carries the frame, the frame_over and the master head together, so nothing
comes apart) down onto the table. The lean back also goes a little left
(away from the table's middle) and 5% smaller: it was drawn larger than his
rest pose, so it read as leaning in. Idempotent: the offsets are written
against the clips as they were before this fix (commit d8207d9, `BASE`), so
re-running never adds them twice; a later hand edit to these clips' torso
tracks would need to go into that base instead.
"""
import json, os, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PATH = os.path.join(ROOT, 'web', 'art', 'lincoln', 'anim.json')

# rig px (and scale) the torso moves while each frame is up
FIX = {
    'lean_back': {'y': 30, 'x': -14, 'sx': -0.05, 'sy': -0.05},
    'stretch': {'y': 22},
    'hat_tip': {'y': 14},
    'greet': {'y': 46},
    'rub_eyes': {'y': 10},
    'laugh': {'y': 7},
    'drum': {'y': 5},
}


def sample(keys, t):
    import math
    ease = {'linear': lambda u: u, 'in': lambda u: u ** 3, 'out': lambda u: 1 - (1 - u) ** 3,
            'inOut': lambda u: 0.5 - math.cos(math.pi * u) / 2, 'hold': lambda u: 0 if u < 1 else 1,
            'outBack': lambda u: 1 + 2.2 * (u - 1) ** 3 + 1.2 * (u - 1) ** 2}
    if not keys:
        return 0
    if t <= keys[0][0]:
        return keys[0][1]
    for i in range(1, len(keys)):
        t1, v1 = keys[i][0], keys[i][1]
        e = keys[i][2] if len(keys[i]) > 2 else 'inOut'
        if t <= t1:
            t0, v0 = keys[i - 1][0], keys[i - 1][1]
            return v0 + (v1 - v0) * ease[e]((t - t0) / (t1 - t0) if t1 > t0 else 1)
    return keys[-1][1]


def shifted(keys, on, off, d):
    """The channel plus d while on <= t < off, stepping at both ends."""
    keys = keys or [[0, 0]]
    out = [k for k in keys if k[0] <= on]
    out.append([round(on + 0.001, 4), sample(keys, on + 0.001) + d, 'hold'])
    out += [[k[0], k[1] + d] + k[2:] for k in keys if on + 0.001 < k[0] < off]
    out.append([off, sample(keys, off) + d])
    out.append([round(off + 0.001, 4), sample(keys, off + 0.001), 'hold'])
    out += [k for k in keys if k[0] > off + 0.001]
    return out


BASE = 'd8207d9'
base = json.loads(subprocess.run(['git', 'show', f'{BASE}:web/art/lincoln/anim.json'], cwd=ROOT,
                                 capture_output=True, text=True, check=True).stdout)
raw = open(PATH).read()
anim = json.loads(raw)
for name, clip in anim['clips'].items():
    on_off = [(t, s) for t, s in clip.get('swaps', {}).get('frame', [])]
    shown = [s for _, s in on_off if s]
    if not shown or shown[0] not in FIX or name not in base['clips']:
        continue
    on = next(t for t, s in on_off if s)
    off = next((t for t, s in on_off if s is None and t > on), clip['duration'])
    tracks = json.loads(json.dumps(base['clips'][name]['tracks']))
    torso = tracks.setdefault('torso', {})
    for ch, d in FIX[shown[0]].items():
        torso[ch] = shifted(torso.get(ch), on, off, d)
    clip['tracks'] = tracks
    print(f'{name:12} frame {shown[0]:10} {on}-{off}: ' + ', '.join(f'{c} {d:+}' for c, d in FIX[shown[0]].items()))
open(PATH, 'w').write(json.dumps(anim, indent=1, ensure_ascii=False) + ('\n' if raw.endswith('\n') else ''))
