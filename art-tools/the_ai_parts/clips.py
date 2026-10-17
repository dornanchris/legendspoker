# The AI's clips: writes web/art/the_ai/anim.json from the Robot's (the AI is
# the Robot taken over, recolour.py). Run after recolour.py:
#   python3 art-tools/the_ai_parts/clips.py
# then tell_hold.py and life.py (the new clips need their holds).
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '/'
R = ROOT + 'web/art/the_ai/'
a = json.load(open(ROOT + 'web/art/robot/anim.json'))
C = a['clips']


def from_clip(src, frame, note, **kw):
    """A copy of one of the Robot's frame clips showing another frame."""
    c = json.loads(json.dumps(C[src]))
    c['swaps']['frame'] = [[t, frame if v else v] for t, v in c['swaps']['frame']]
    c['note'] = note
    c.pop('hold', None)                              # tell_hold.py sets it again
    c.update(kw)
    return c


C['narrow'] = from_clip('eyes_dim', 'narrow', 'TELL: the lens in its chest narrows to a bright point.')
C['dimmed'] = from_clip('eyes_dim', 'dimmed', 'TELL: its lens dims a shade, as the room\'s lights do.')
# sitting back up in the Robot's chair: slumped as the Robot went out, then upright, the lens open
arrive = from_clip('lose_big', 'lose_big', 'BEAT: played as it takes the Robot\'s chair: the slumped body sits back up.')
arrive['duration'] = 1.6
arrive['tracks'] = {'torso': {'y': [[0, 0], [0.9, 0], [0.92, 2, 'hold'], [1.2, 0, 'inOut']]}}
arrive['swaps'] = {k: [[0, v[0][1]], [0.9, None]] for k, v in arrive['swaps'].items()}
C['arrive'] = arrive
a['clips'] = C
a['note'] = ("The AI: the Robot's clips (art-tools/the_ai_parts/clips.py), its glow taken over by recolour.py: "
             "the lens in its chest is the tell surface; its eye-lamps are dark.")
f = a['face']
f['blink'] = {'every': [3600, 3600], 'double': 0, 'frames': []}      # dark lamps do not blink
f['gaze']['idle'] = [['ahead', 1]]                                   # nor glance: the lens tracks (`turn`)
a['cues'] = {
    'the lens narrows': 'narrow',
    'the lights in the room dim a shade': 'dimmed',
    'the lens tracks your hands': 'turn',            # the lens both times: decoy for the narrowing
    'the hull creaks': 'recalibrate',                # a jerk of the head: decoy for the dimming
    'somewhere, a fan speeds up': 'whir',
    'the gravity shifts, a little': 'antennae',
}
a['fidgets'] = ['polish']
ref = a.get('reference', {})
a['reference'] = {k: v for k, v in ref.items() if os.path.exists(R + v)}
json.dump(a, open(R + 'anim.json', 'w'), indent=1)
print(len(C), 'clips')
