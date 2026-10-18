"""Write <kit>/pose_rig.json from poses_found.json and a short spec, for a kit
whose every pose but rest is a whole-figure frame with its own head and one
prop on the felt (JFK, Loki): <kit>/rig_spec.json holds what differs (the
poses' words, the frames, the prop's box, the arms, the head's keep polygon).

  python3 art-tools/build/rig_from_spec.py art-tools/loki_parts/rig_spec.json
Edit rig_spec.json, not pose_rig.json: this overwrites it.
"""
import json, os, sys
spec = json.load(open(sys.argv[1]))
kit = spec['kit']; id_ = spec['id']
found = json.load(open(f'art-tools/{kit}/poses_found.json'))
poses = {}
for k, v in found.items():
    p = dict(sheet=v['sheet'], box=v['box'])
    if 'reg' in v: p['reg'] = v['reg']
    p['what'] = spec['what'][k]
    poses[k] = p
prop = spec['prop']
frames = {}
for name, pose in spec['frames'].items():
    f = {'pose': pose, 'head': 'own', 'below': 110}
    if prop and pose not in spec.get('no_prop', []): f['props'] = [prop]
    f.update(spec.get('frame_extra', {}).get(name, {}))
    frames[name] = f
rig = {
    'id': id_, 'name': spec['name'], 'note': spec['note'],
    'sheets': {s: f'sources/poses_{s.lower()}.png' for s in 'ABCD' if os.path.exists(f'art-tools/{kit}/sources/poses_{s.lower()}.png')},
    'poses': poses, 'rest': 'A1',
    **spec['common'],
    'master': {
        'piece': f'{kit}/{id_}_face/{id_}_master.png', 'cut_below': spec['cut_below'],
        'face': f'{kit}/face.json', 'file': f'{kit}/{id_}_rig/master.png',
        'layers': f'{kit}/{id_}_rig/face', 'head_box': [0, 0, 495, 320], 'place': [0, 0, 1.0],
        'replace_head': False, 'keep_poly': spec['keep_poly'], 'shoulder_y': spec['shoulder_y'],
        **spec.get('master_extra', {}),
    },
    'arms': spec['arms'], 'frames': frames, 'runtime': f'../web/art/{id_}',
    **spec['filters'],
}
json.dump(rig, open(f'art-tools/{kit}/pose_rig.json', 'w'), indent=1)
print('wrote', kit)
