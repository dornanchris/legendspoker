# the Cheshire Cat's clips: writes web/art/cheshire_cat/anim.json (face timing, clips,
# tell cues, fidgets) and the reference crops beside it. Run after pose_rig.py:
#   python3 art-tools/cheshire_cat_parts/clips.py
import os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '/'
import json
from PIL import Image
R = ROOT + 'web/art/cheshire_cat/'
K = ROOT + 'art-tools/cheshire_cat_parts/'
rig = json.load(open(R + 'rig.json')); spec = json.load(open(K + 'pose_rig.json'))  # written by rig_from_spec.py from rig_spec.json
kidd = json.load(open(ROOT + 'web/art/kidd/anim.json'))
N = None
BODY = ['torso', 'torso_over', 'arm_near', 'arm_far', 'upper_near', 'upper_far']
def frame(name, dur, t_in, t_out, note, lead=1.5, seq=None, fade=None):
    """One whole-figure frame from t_in to t_out; `seq` swaps further frames in
    between ([[t, name], ...]), for a tell told in stages. With `fade`, every
    swap fades over that many seconds instead of cutting (clip.ts)."""
    f = lambda k: k + [fade] if fade else k
    sw = {s: [f([t_in, '-']), f([t_out, N])] for s in BODY}
    sw['frame'] = [f([t_in, name])] + [f(list(k)) for k in seq or []] + [f([t_out, N])]
    sw['head'] = [f([t_in, '-']), f([t_out, N])]
    for n in [name] + [f for _, f in seq or []]:
        assert rig['frames'][n] is None
    tracks = {'torso': {'y': [[0, 0], [t_in, lead, 'in'], [t_in + 0.12, 0, 'out'], [t_out, 0],
                              [t_out + 0.02, lead, 'hold'], [min(dur, t_out + 0.3), 0, 'inOut']]}}
    return {'duration': dur, 'note': note, 'tracks': tracks, 'swaps': sw}
C = {}
C['check'] = frame('check', 1.2, 0.15, 0.85, 'Pats the felt once with a paw.')
C['peek'] = frame('peek', 1.6, 0.18, 1.25, 'A paw over his cards, one claw lifting the corner.')
C['call'] = frame('call', 1.5, 0.18, 1.15, 'A paw slides forward along the felt (the chips are the game\'s).')
C['bet'] = frame('bet', 1.4, 0.15, 1.0, 'Leans in, a paw pushed well forward, the grin wider.')
C['fold'] = frame('fold', 1.3, 0.18, 0.9, 'A lazy flick of a paw toward the middle.')
C['all_in'] = frame('all_in', 2.0, 0.2, 1.6, 'Both paws push forward together, eyes bright.', lead=3)
C['show'] = frame('show', 1.8, 0.2, 1.4, 'A paw turns palm up (the game turns the cards).')
C['win_big'] = frame('win_big', 2.4, 0.2, 2.0, 'BEAT: a big pot won: both front paws thrown up, the grin bigger than ever.', lead=-2)
# the fades run back to back (0.9 s each: the owner's 0.2 s more either side of
# the first 0.5), so the half-vanished drawing is passed through, never sat in
C['fade'] = frame('fade', 4.6, 0.2, 3.5, 'TELL: fades away tail first (tail and body to mid-chest gone), '
                  'then only the grin is left, then the cat comes back, grin first (Carroll\'s order).',
                  lead=0, seq=[[1.1, 'grin_only'], [2.6, 'fade']], fade=0.9)
C['fade']['snap'] = 1   # he phases back in at his own pace: not snapped back like the other gestures
C['drift'] = frame('drift', 2.4, 0.25, 1.9, 'IDLE (decoy for the fade): his head drifts a little way off his shoulders, and back.', lead=0)
C['blink'] = frame('blink', 1.8, 0.15, 0.85, 'TELL: blinks one eye (the drawn wink), then the other: the sheets drew no '
                   'far-eye wink, so the second is a whole blink on the rest pose.', lead=0)
C['blink']['swaps']['eyes'] = [[1.0, 'closed'], [1.25, N]]
C['wash'] = frame('wash', 2.6, 0.25, 2.2, 'IDLE (decoy for the blink): washes a paw, eyes half closed.', lead=0.5)
C['twitch'] = frame('twitch', 1.6, 0.15, 1.2, 'TELL: the tip of his tail twitches; the rest of him still.', lead=0)
C['sway'] = frame('sway', 2.6, 0.3, 2.1, 'IDLE (decoy for the twitch): his tail sways lazily out to the side.', lead=0)
C['grin_dealer'] = frame('grin_dealer', 2.4, 0.22, 2.0, 'IDLE: grins at the dealer, the grin wider than ever.', lead=0.3)
C['knowing'] = frame('knowing', 2.4, 0.22, 2.0, 'IDLE: a slow, knowing look at you, eyes half lidded.', lead=0)
C['talk'] = frame('talk', 2.0, 0.2, 1.6, 'BEAT: a paw raised, one claw making a point.')
C['big_bet'] = frame('big_bet', 2.2, 0.25, 1.8, 'BEAT: facing a big bet: eyes narrowed to slits, the grin thinner.', lead=1)
C['lost_pot'] = frame('lost_pot', 2.2, 0.2, 1.8, 'BEAT: lost a pot: ears back, a lopsided grin, a shrug.', lead=1)
C['lose_big'] = frame('lose_big', 2.6, 0.2, 2.2, 'BEAT: a crushing loss: ears flat, the grin gone for once, slumped.', lead=0)
C['heads_up'] = frame('heads_up', 2.6, 0.3, 2.2, 'BEAT: down to two: leaning in over both paws, eyes wide and bright.', lead=3)
C['knocked_out'] = frame('knocked_out', 2.8, 0.3, 2.5, 'BEAT: knocked out: half vanished, standing, a cheery wave of a paw.', lead=-2)
C['look_at_you'] = {'duration': 2.0, 'note': 'BEAT: looks straight at the player.',
                    'tracks': {'head': {'rot': [[0, 0], [0.2, -0.8, 'in'], [0.3, 0, 'out'], [1.6, 0], [1.7, -0.8, 'in'], [1.9, 0, 'out']]}},
                    'swaps': {'eyes': [[0.15, 'viewer'], [1.7, N]]}}
face = json.loads(json.dumps(kidd['face']))
face['gaze']['idle'] = [['ahead', 0.6], ['viewer', 0.15], ['down', 0.15], ['side', 0.1]]
# he talks through the grin: the round mouths (oh, oo, m, f, l) would drop it, and the grin is the character
face['speech']['map'] = {k: ('ah' if v in ('ah', 'oh', 'oo') else 'ee' if v == 'ee' else 'rest') for k, v in face['speech']['map'].items()}
a = {'note': "Hand-authored: the Cheshire Cat's face timing (gothic redraw) and his clips (poker actions, tells beside their decoys, beats). "
             "rig.json and the images beside it are generated by art-tools/pose_rig.py.",
     'face': face, 'clips': C,
     'cues': {'fades away, beginning with the end of his tail and ending with the grin': 'fade',
              'blinks one eye, then the other': 'blink', 'the tip of his tail twitches': 'twitch',
              'his tail sways lazily': 'sway', 'washes a paw': 'wash',
              'his head drifts a little way off his shoulders, and back': 'drift', 'grins at the dealer': 'grin_dealer'},
     'fidgets': ['knowing', 'look_at_you']}
ref = {'rest': 'ref_rest.png'}
pose_of = {n: f['pose'] for n, f in spec['frames'].items()}; pose_of['rest'] = 'A1'
for clip, pose in pose_of.items():
    p = spec['poses'][pose]; x, y, w, h = p['box']
    Image.open(K + spec['sheets'][p['sheet']]).convert('RGB').crop((x, y, x + w, y + h)).save(R + f'ref_{clip}.png')
    ref[clip] = f'ref_{clip}.png'
a['reference'] = ref
json.dump(a, open(R + 'anim.json', 'w'), indent=1)
print(len(C), 'clips')
