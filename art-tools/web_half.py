#!/usr/bin/env python3
"""
web_half.py -- the table screen's copy of each puppet: every image its rig
uses, at half size, in web/art/<id>/half/.

  python3 art-tools/web_half.py [id ...]        (default: every puppet)

The rigs are drawn at a size meant for the bench's close-ups. At the table a
figure is drawn at about half a rig pixel per screen pixel on a large monitor
and less on a phone, so the full images only cost memory: decoded, the five
White House puppets take about 350 MB at full size, which a phone's WebView
may not give. Half size is a quarter of that. Run it after pose_rig.py
rebuilds a puppet; web/puppet/rig.ts scales the images back up (loadRig's
`up`), so rig.json is shared.
"""
import json, os, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, 'web', 'art')
ids = sys.argv[1:] or sorted(d for d in os.listdir(ART) if os.path.exists(os.path.join(ART, d, 'rig.json')))
for pid in ids:
    d = os.path.join(ART, pid)
    rig = json.load(open(os.path.join(d, 'rig.json')))
    out = os.path.join(d, 'half')
    os.makedirs(out, exist_ok=True)
    imgs = sorted({p['img'] for p in rig['parts']})
    for f in os.listdir(out):
        if f not in imgs and not f.startswith('ik_'): os.remove(os.path.join(out, f))   # ik_*: made by ik_build.py
    for f in imgs:
        im = Image.open(os.path.join(d, f))
        im.resize((max(1, round(im.width / 2)), max(1, round(im.height / 2))), Image.LANCZOS).save(os.path.join(out, f), optimize=True)
    print(pid, len(imgs), 'images')
