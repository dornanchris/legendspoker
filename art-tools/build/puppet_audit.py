"""Every built puppet held to the same list, so none falls behind the others:

    python3 art-tools/build/puppet_audit.py

For each web/art/<id>/ (Death has his own set and is checked for life only):
  * life: breath, sway and the body's weight shift at art-tools/build/life.py's values
  * the clips the table asks an opponent for (web/screens/table.ts; going out
    needs none: without knocked_out the figure fades from the chair)
  * `win` / `lose` (art-tools/build/win_small.py) naming clips that exist
  * a cue for every tell and idle line in the character's data, to a clip that exists
  * fidgets that exist; a hold on every cued and fidget clip (art-tools/build/tell_hold.py)
  * whole-figure frames that reach the table line (or the figure floats)
  * the half-size copy of every image (art-tools/web_half.py: the table loads those)
Prints one line per puppet and what is missing; exits 1 if anything is.
"""
import glob, json, os, sys
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
REQUIRED = ['check', 'call', 'bet', 'fold', 'all_in', 'peek', 'show', 'talk', 'heads_up', 'lost_pot', 'win_small']
# knocked_out is not required: without one the figure says its line and fades (web/puppet/stage.ts)
LIFE = {'breath': 0.013, 'rot': 1.1, 'x': 2.2, 'y': 1.4, 'body': 0.45}
CALM = {'death': 0.5}
FLOAT_OK = {('cheshire_cat', 'grin_only')}        # the grin alone, left hanging on purpose

bad = 0
for path in sorted(glob.glob(os.path.join(ROOT, 'web', 'art', '*', 'anim.json'))):
    art = os.path.dirname(path)
    pid = os.path.basename(art)
    anim = json.load(open(path))
    rig = json.load(open(os.path.join(art, 'rig.json')))
    clips = anim['clips']
    miss = []
    f = anim.get('face', {})
    k = CALM.get(pid, 1)
    want = {'breath': f.get('breath', {}).get('sy'), **{c: f.get('sway', {}).get(c) for c in ('rot', 'x', 'y', 'body')}}
    off = [c for c, v in want.items() if v is None or abs(v - LIFE[c] * k) > 1e-6]
    if off:
        miss.append('life ' + ','.join(off))
    if not f.get('blink') or not f.get('gaze'):
        miss.append('no blink/gaze')
    if pid != 'death':
        miss += [f'clip {c}' for c in REQUIRED if c not in clips]
        for side in ('win', 'lose'):
            v = anim.get(side)
            if not v:
                miss.append(f'no {side}')
            else:
                miss += [f'{side}.{t} -> {c}?' for t, c in v.items() if c not in clips]
        cid = anim.get('of', pid)
        cf = os.path.join(ROOT, 'data', 'characters', f'{cid}.json')
        if os.path.exists(cf):
            ch = json.load(open(cf))
            for text in [t['text'] for t in ch.get('tells', [])] + ch.get('idles', []):
                clip = anim.get('cues', {}).get(text)
                if not clip:
                    miss.append(f'no cue for "{text}"')
                elif clip not in clips:
                    miss.append(f'cue "{text}" -> {clip}?')
        else:
            miss.append(f'no data/characters/{cid}.json')
        fid = anim.get('fidgets', [])
        if not fid:
            miss.append('no fidgets')
        miss += [f'fidget {c}?' for c in fid if c not in clips]
        named = set(anim.get('cues', {}).values()) | set(fid)
        named |= {f'{n}_ik' for n in named if f'{n}_ik' in clips}
        miss += [f'no hold on {n}' for n in sorted(named) if n in clips and not clips[n].get('hold')]
    for p in rig['parts']:
        if p['name'].startswith('frame.') and (pid, p['name'][6:]) not in FLOAT_OK:
            a = np.array(Image.open(os.path.join(art, p['img'])).convert('RGBA'))[..., 3] > 128
            h = a.shape[0]
            bottom = p['cy'] - h * p.get('scale', 1) / 2 + np.nonzero(a.any(1))[0].max() * p.get('scale', 1)
            gap = rig['tableLine'] - bottom
            if gap > 4:
                # seated anyway if every clip that shows it lowers the torso far enough
                showing = [c for c in clips.values() if any(st == p['name'][6:] for _, st in c.get('swaps', {}).get('frame', []))]
                def lowered(c):
                    on = next(t for t, st in c['swaps']['frame'] if st == p['name'][6:])
                    ys = c.get('tracks', {}).get('torso', {}).get('y', [])
                    return any(on < t < on + 0.5 and v >= gap - 4 for t, v, *_ in ys)
                if not showing or not all(lowered(c) for c in showing):
                    miss.append(f'frame {p["name"][6:]} floats {gap:.0f}px')
    halves = [p['img'] for p in rig['parts'] if not os.path.exists(os.path.join(art, 'half', p['img']))]
    if halves:
        miss.append(f'{len(halves)} half-size images missing')
    print(f'{pid:22} {len(clips):3} clips  ' + ('ok' if not miss else '; '.join(miss)))
    bad += bool(miss)
print(f'\n{bad} puppet(s) with something missing')
sys.exit(1 if bad else 0)
