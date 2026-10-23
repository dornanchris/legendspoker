"""Every gesture the table plays as something to READ holds its pose longer:

    python3 art-tools/build/tell_hold.py [secs]      (default 2.5)

The owner: the tells and decoys were too quick to see among everything else
moving. Each puppet's cued clips (`cues`: its tells AND its idles, the clips
the table plays for the words it shows), its `fidgets` (the decoys and the
small business) and their `_ik` versions get `hold: [at, secs]`: the clip
stops at `at` and keeps that pose for `secs` (web/puppet/player.ts).
All alike, never the tells alone: a tell that lasted longer than its decoy
would be read by its length (rule 2).

`at` is where the clip is most still while its pose is fully showing: inside
the span its swapped pieces are on (or the middle 70% without any), the moment
the bones and arms move least, nearest the middle on a tie, and never while a
swap is fading in (a third number on the swap: the Cheshire Cat's). Sampling
follows web/puppet/clip.ts.
"""
import glob, json, math, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SECS = float(sys.argv[1]) if len(sys.argv) > 1 else 2.5
EASE = {
    'linear': lambda u: u, 'in': lambda u: u ** 3, 'out': lambda u: 1 - (1 - u) ** 3,
    'inOut': lambda u: 0.5 - math.cos(math.pi * u) / 2,
    'outBack': lambda u: 1 + 2.2 * (u - 1) ** 3 + 1.2 * (u - 1) ** 2,
    'hold': lambda u: 0 if u < 1 else 1,
}


def sample(keys, t):
    if not keys:
        return 0
    if t <= keys[0][0]:
        return keys[0][1]
    for i in range(1, len(keys)):
        t1, v1 = keys[i][0], keys[i][1]
        e = keys[i][2] if len(keys[i]) > 2 else 'inOut'
        if t <= t1:
            t0, v0 = keys[i - 1][0], keys[i - 1][1]
            u = (t - t0) / (t1 - t0) if t1 > t0 else 1
            return v0 + (v1 - v0) * EASE[e](u)
    return keys[-1][1]


def hold_at(c):
    d = c['duration']
    swaps = list(c.get('swaps', {}).values()) + list(c.get('ikSwaps', {}).values())
    ons = [k[0] for s in swaps for k in s if k[1] is not None]
    offs = [k[0] for s in swaps for k in s if k[1] is None]
    # a change, and how long it takes: a cut is instant, a fading swap takes its seconds
    changes = [(k[0], k[2] if len(k) > 2 else 0) for s in swaps for k in s]
    lo = min(ons) if ons else 0.15 * d
    hi = max(offs) if offs else 0.85 * d
    chans = [k for group in list(c.get('tracks', {}).values()) + list(c.get('ik', {}).values()) for k in group.values()]

    def showing(t):
        n = 0
        for s in swaps:
            cur = None
            for k in s:
                if k[0] <= t:
                    cur = k[1]
            n += cur is not None
        return n

    most = max([showing(lo + (hi - lo) * i / 49) for i in range(50)] + [0])
    best, score = (lo + hi) / 2, math.inf
    t = lo + 0.06
    while t <= hi - 0.06:
        if not any(t0 - 0.08 < t < t0 + f + 0.08 for t0, f in changes) and showing(t) >= most:
            move = sum(abs(sample(k, t + 0.04) - sample(k, t - 0.04)) for k in chans)
            s = move + 0.002 * abs(t - (lo + hi) / 2)
            if s < score:
                best, score = t, s
        t += 0.01
    return round(best, 2)


for path in sorted(glob.glob(os.path.join(ROOT, 'web', 'art', '*', 'anim.json'))):
    pid = os.path.basename(os.path.dirname(path))
    if pid in ('death', 'pravuil'):
        continue
    raw = open(path).read()
    anim = json.loads(raw)
    names = list(dict.fromkeys(list(anim.get('cues', {}).values()) + anim.get('fidgets', [])))
    names += [f'{n}_ik' for n in names if f'{n}_ik' in anim['clips']]
    done = []
    for n in names:
        c = anim['clips'].get(n)
        if c:
            c['hold'] = [hold_at(c), SECS]
            done.append(f"{n}@{c['hold'][0]}")
    open(path, 'w').write(json.dumps(anim, indent=1, ensure_ascii=False) + ('\n' if raw.endswith('\n') else ''))
    print(f'{pid:22}', ' '.join(done))
