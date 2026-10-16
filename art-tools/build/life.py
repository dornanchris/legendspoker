"""How alive the figures look at rest: breathing, sway and a weight shift.

    python3 art-tools/build/life.py

The owner: "I want this to embody living figures". The first values (breath
0.4% of the torso's height, half a degree of head sway, the body still) were
under a pixel on a phone. This sets every puppet's `face.sway` and
`face.breath` from one table, keeping each puppet's own proportions where it
had them (Death, the dealer, at about half: he barely moves). Idempotent.
"""
import glob, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LIFE = {'breath': 0.013, 'rot': 1.1, 'x': 2.2, 'y': 1.4, 'body': 0.45}   # breath: torso scale; rot/body: degrees; x/y: rig px
CALM = {'death': 0.5}                                                     # a fraction of LIFE

for path in sorted(glob.glob(os.path.join(ROOT, 'web', 'art', '*', 'anim.json'))):
    pid = os.path.basename(os.path.dirname(path))
    raw = open(path).read()
    anim = json.loads(raw)
    f = anim.get('face')
    if not f or 'sway' not in f:
        continue
    k = CALM.get(pid, 1)
    f['breath']['sy'] = round(LIFE['breath'] * k, 4)
    for ch in ('rot', 'x', 'y', 'body'):
        f['sway'][ch] = round(LIFE[ch] * k, 3)
    open(path, 'w').write(json.dumps(anim, indent=1, ensure_ascii=False) + ('\n' if raw.endswith('\n') else ''))
    print(f'{pid:22} breath {f["breath"]["sy"]} sway {f["sway"]["rot"]} deg, body {f["sway"]["body"]} deg')
