"""A small portrait of every puppet, for the screens that are not the table
(the curtain call at the end of a table, results.ts):

    python3 art-tools/build/portraits.py

web/art/<id>/portrait.webp: the master head (its eyes and mouth at rest),
trimmed to what is drawn, set in a 192px square, top-aligned so the face sits
in the upper middle. Run again after a puppet is rebuilt.
"""
import glob, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
S = 192
for art in sorted(glob.glob(os.path.join(ROOT, 'web', 'art', '*', 'master.png'))):
    d = os.path.dirname(art)
    im = Image.open(art).convert('RGBA')
    im = im.crop(im.getbbox())
    k = min(S * 0.94 / im.width, S * 1.02 / im.height)
    im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    out = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    out.alpha_composite(im, ((S - im.width) // 2, max(0, round(S * 0.06))))
    out.save(os.path.join(d, 'portrait.webp'), quality=88)
    print(os.path.basename(d))
