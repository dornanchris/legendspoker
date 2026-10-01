#!/usr/bin/env python3
"""
faces_preview.py -- every head in a layout's "head" slot, in turn, on the
seated puppet: a strip for checking the expression swaps sit right. A head
labelled "no hat" is shown with the layout's hat (slot "hat") lifted off it,
mid-tip.

  python3 art-tools/faces_preview.py art-tools/fdr_layout.json art-tools/fdr_parts/preview_faces.png
"""
import copy, json, os, subprocess, sys, tempfile

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))


def main(layout_path, out):
    L = json.load(open(layout_path))
    heads = [p['file'] for p in L['parts'] if p.get('slot') == 'head']
    tiles = []
    with tempfile.TemporaryDirectory() as tmp:
        for f in heads:
            M = copy.deepcopy(L)
            bare = any(p['file'] == f and 'no hat' in p.get('label', '') for p in M['parts'])
            for p in M['parts']:
                if p.get('slot') == 'head':
                    p['visible'] = p['file'] == f
                if p.get('slot') == 'hat' and bare:   # tipped: up a little and back
                    p.update(visible=True, y=p['y'] - 40, x=p['x'] - 6, rot=8)
                p['file'] = os.path.join(HERE, p['file'])
            json.dump(M, open(os.path.join(tmp, 'l.json'), 'w'))
            subprocess.run([sys.executable, os.path.join(HERE, 'build_puppet.py'), 'render',
                            os.path.join(tmp, 'l.json'), '-o', os.path.join(tmp, 'f.png')],
                           check=True, capture_output=True)
            tiles.append(Image.open(os.path.join(tmp, 'f.png')).convert('RGB').crop((330, 260, 830, 900)))
    strip = Image.new('RGB', (500 * len(tiles), 640))
    for i, t in enumerate(tiles):
        strip.paste(t, (i * 500, 0))
    strip.resize((strip.width * 2 // 3, strip.height * 2 // 3), Image.LANCZOS).save(out)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
