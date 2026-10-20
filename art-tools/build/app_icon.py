"""The app's icon and launch screen.

The owner: the icon should feel jovial and fun (Death's card back was "way
too freaky" for one). So: one of the cast in his best mood, from the
puppet's own drawn frames, on the green felt, with a fan of the game's
four-colour deck behind him (spades black, hearts red, diamonds blue, clubs
green). No words: iOS writes the name under the icon.

    python3 art-tools/build/app_icon.py                 # writes the chosen design
    python3 art-tools/build/app_icon.py --preview OUT   # every design side by side

Writes, into the Capacitor iOS project:
  AppIcon.appiconset/AppIcon-512@2x.png   1024 x 1024, opaque, square corners
                                          (iOS rounds them itself)
  Splash.imageset/splash-2732x2732*.png   the launch screen: the same picture
                                          small in the middle of the felt
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
ART = ROOT / 'web/art'
ASSETS = ROOT / 'ios/App/App/Assets.xcassets'

# Each design: a drawn frame, which way he faces (flip to face into the
# cards), and how much of it to show: the box (fractions of the frame's
# opaque area) cropped to the head and shoulders.
DESIGNS = {
    'lincoln_laugh': {'frame': 'lincoln/frame_laugh.png', 'box': (0.0, 0.0, 1.0, 0.78), 'flip': True},
    'lincoln_tip': {'frame': 'lincoln/frame_hat_tip.png', 'box': (0.0, 0.0, 1.0, 0.8), 'flip': False},
    'arthur_toast': {'frame': 'arthur/frame_cup.png', 'box': (0.0, 0.0, 1.0, 0.8), 'flip': True, 'height': 0.74, 'right': 0.0},
    'arthur_cheer': {'frame': 'arthur/frame_win_big.png', 'box': (0.0, 0.0, 1.0, 0.95), 'flip': True, 'height': 0.9, 'right': -0.04},
    'lancelot_cheer': {'frame': 'lancelot/frame_win_big.png', 'box': (0.0, 0.0, 1.0, 0.95), 'flip': True, 'height': 0.88, 'right': -0.05},
    'lancelot_preen': {'frame': 'lancelot/frame_hair.png', 'box': (0.0, 0.0, 1.0, 0.75), 'flip': True},
    'teddy': {'frame': 'roosevelt/frame_win_big.png', 'box': (0.0, 0.0, 1.0, 0.9), 'flip': False, 'height': 0.88, 'right': -0.06},
}
CHOSEN = 'arthur_toast'

FELT = (47, 128, 78)
FELT_EDGE = (16, 66, 40)
GOLD = (226, 186, 72)
CARD = (250, 246, 236)
INK = {'spades': (26, 21, 18), 'hearts': (196, 40, 40), 'diamonds': (31, 95, 191), 'clubs': (29, 122, 58)}
FAN = [('A', 'spades'), ('K', 'hearts'), ('Q', 'diamonds'), ('J', 'clubs')]


def font(size: int) -> ImageFont.FreeTypeFont:
    """A bold serif for the ranks: whatever this machine has (Linux, then Windows, then Pillow's own)."""
    for name in ('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf', 'C:/Windows/Fonts/georgiab.ttf',
                 'C:/Windows/Fonts/timesbd.ttf', 'DejaVuSerif-Bold.ttf'):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return ImageFont.load_default(size)


def suit(d: ImageDraw.ImageDraw, kind: str, cx: float, cy: float, r: float, fill) -> None:
    """A suit drawn as shapes, so no font has to have the glyphs."""
    if kind == 'diamonds':
        d.polygon([(cx, cy - r), (cx + r * 0.72, cy), (cx, cy + r), (cx - r * 0.72, cy)], fill=fill)
        return
    if kind == 'clubs':
        for dx, dy in ((0, -0.45), (-0.47, 0.12), (0.47, 0.12)):
            d.ellipse([cx + (dx - 0.44) * r, cy + (dy - 0.44) * r, cx + (dx + 0.44) * r, cy + (dy + 0.44) * r], fill=fill)
    else:  # a heart, or a spade (a heart upside down)
        s = 1 if kind == 'hearts' else -1
        for dx in (-0.45, 0.45):
            d.ellipse([cx + (dx - 0.5) * r, cy - s * 0.35 * r - 0.5 * r, cx + (dx + 0.5) * r, cy - s * 0.35 * r + 0.5 * r], fill=fill)
        d.polygon([(cx - 0.94 * r, cy - s * 0.2 * r), (cx + 0.94 * r, cy - s * 0.2 * r), (cx, cy + s * 0.95 * r)], fill=fill)
        if kind == 'hearts':
            return
    # the stem of a spade or a club
    d.polygon([(cx, cy + 0.1 * r), (cx - 0.38 * r, cy + 1.0 * r), (cx + 0.38 * r, cy + 1.0 * r)], fill=fill)


def card(w: int, rank: str, kind: str) -> Image.Image:
    h = round(w * 1.4)
    im = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, w - 1, h - 1], radius=w * 0.1, fill=CARD, outline=(40, 30, 20), width=max(2, w // 60))
    ink = INK[kind]
    d.text((w * 0.1, h * 0.05), rank, font=font(round(w * 0.3)), fill=ink)
    suit(d, kind, w * 0.2, h * 0.36, w * 0.09, ink)
    suit(d, kind, w * 0.55, h * 0.6, w * 0.22, ink)
    return im


def felt(size: int) -> Image.Image:
    out = Image.new('RGB', (size, size), FELT_EDGE)
    light = Image.new('L', (size, size), 0)
    ImageDraw.Draw(light).ellipse([-size * 0.1, -size * 0.1, size * 1.1, size * 1.1], fill=255)
    light = light.filter(ImageFilter.GaussianBlur(size * 0.14))
    out.paste(Image.new('RGB', (size, size), FELT), mask=light)
    return out


def shadow_of(im: Image.Image, blur: float) -> Image.Image:
    a = im.getchannel('A').point(lambda v: v * 0.55)
    sh = Image.new('RGBA', im.size, (0, 0, 0, 0))
    sh.putalpha(a)
    return sh.filter(ImageFilter.GaussianBlur(blur))


def figure(design: dict, height: int) -> Image.Image:
    im = Image.open(ART / design['frame']).convert('RGBA')
    im = im.crop(im.getbbox())
    l, t, r, b = design['box']
    im = im.crop((round(l * im.width), round(t * im.height), round(r * im.width), round(b * im.height)))
    if design['flip']:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    return im.resize((round(im.width * height / im.height), height), Image.LANCZOS)


def compose(name: str, size: int = 1024) -> Image.Image:
    design = DESIGNS[name]
    out = felt(size).convert('RGBA')
    # the fan, behind him, upper left
    w = round(size * 0.27)
    for i, (rank, kind) in enumerate(FAN):
        c = card(w, rank, kind).rotate(38 - i * 17, resample=Image.BICUBIC, expand=True)
        x = round(size * (0.02 + i * 0.075))
        y = round(size * (0.13 + abs(i - 1.5) * 0.03))
        out.alpha_composite(shadow_of(c, size * 0.008), (x + round(size * 0.008), y + round(size * 0.012)))
        out.alpha_composite(c, (x, y))
    # a thin gold ring just inside the corners iOS will round off, behind him
    d = ImageDraw.Draw(out)
    inset = round(size * 0.035)
    d.rounded_rectangle([inset, inset, size - inset, size - inset], radius=size * 0.19, outline=GOLD + (200,), width=max(3, size // 120))
    # him, large, standing on the bottom edge, his right side (hat, hand) inside the frame
    f = figure(design, round(size * design.get('height', 0.84)))
    x = size - f.width - round(size * design.get('right', 0.03))
    y = size - f.height
    out.alpha_composite(shadow_of(f, size * 0.015), (x - round(size * 0.012), y + round(size * 0.006)))
    out.alpha_composite(f, (x, y))
    return out.convert('RGB')


def splash(name: str, size: int = 2732) -> Image.Image:
    out = felt(size)
    icon = compose(name, round(size * 0.3))
    m = Image.new('L', icon.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, icon.width - 1, icon.height - 1], radius=icon.width * 0.225, fill=255)
    out.paste(icon, ((size - icon.width) // 2, (size - icon.height) // 2), m)
    return out


def preview(path: str) -> None:
    tiles = []
    for name in DESIGNS:
        im = compose(name).resize((360, 360), Image.LANCZOS)
        m = Image.new('L', im.size, 0)
        ImageDraw.Draw(m).rounded_rectangle([0, 0, 359, 359], radius=81, fill=255)
        small = im.resize((120, 120), Image.LANCZOS)
        sm = Image.new('L', small.size, 0)
        ImageDraw.Draw(sm).rounded_rectangle([0, 0, 119, 119], radius=27, fill=255)
        tile = Image.new('RGB', (380, 520), (36, 36, 44))
        tile.paste(im, (10, 10), m)
        tile.paste(small, (130, 385), sm)
        ImageDraw.Draw(tile).text((10, 500), name, fill=(220, 220, 220))
        tiles.append(tile)
    sheet = Image.new('RGB', (380 * len(tiles), 520), (36, 36, 44))
    for i, t in enumerate(tiles):
        sheet.paste(t, (380 * i, 0))
    sheet.save(path)


def main() -> None:
    if len(sys.argv) > 2 and sys.argv[1] == '--preview':
        preview(sys.argv[2])
        return
    compose(CHOSEN).save(ASSETS / 'AppIcon.appiconset/AppIcon-512@2x.png')
    s = splash(CHOSEN)
    for name in ('splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png'):
        s.save(ASSETS / 'Splash.imageset' / name)
    print(f'{CHOSEN}: icon and launch screen written to', ASSETS.relative_to(ROOT))


if __name__ == '__main__':
    main()
