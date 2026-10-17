"""Add the big win and the crushing loss to puppets whose rig has the frames
(`win_big`, `lose_big`: a reactions sheet E, or poses drawn inside a newer kit's
24) but whose anim.json was written before them (Lincoln's kit has no clips
script). Idempotent; a clip already authored is left alone. Then re-run
win_small.py (which points `win.big` / `lose.big` at them), tell_hold.py and
life.py.

  python3 art-tools/build/reactions.py lincoln [washington ...]
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BODY = ['torso', 'torso_over', 'arm_near', 'arm_far', 'upper_near', 'upper_far', 'head']


def frame(name, dur, t_in, t_out, note, lead):
    sw = {s: [[t_in, '-'], [t_out, None]] for s in BODY}
    sw['frame'] = [[t_in, name], [t_out, None]]
    tracks = {'torso': {'y': [[0, 0], [t_in, lead, 'in'], [t_in + 0.12, 0, 'out'], [t_out, 0],
                              [t_out + 0.02, lead, 'hold'], [min(dur, t_out + 0.3), 0, 'inOut']]}}
    return {'duration': dur, 'note': note, 'tracks': tracks, 'swaps': sw}


CLIPS = {
    'win_big': lambda: frame('win_big', 2.4, 0.2, 2.0, 'BEAT: a big pot won (most of the stack): hands raised high.', -2),
    'lose_big': lambda: frame('lose_big', 2.6, 0.2, 2.2, 'BEAT: a crushing loss: a hand over the eyes.', 0),
}

for pid in sys.argv[1:]:
    art = os.path.join(ROOT, 'web', 'art', pid)
    rig = json.load(open(os.path.join(art, 'rig.json')))
    path = os.path.join(art, 'anim.json')
    anim = json.load(open(path))
    added = []
    for name, make in CLIPS.items():
        if name in rig.get('frames', {}) and name not in anim['clips']:
            anim['clips'][name] = make()
            added.append(name)
    json.dump(anim, open(path, 'w'), indent=1)
    print(pid, 'added', added or 'nothing')
