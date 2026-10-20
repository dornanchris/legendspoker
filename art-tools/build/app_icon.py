"""The app's icon and launch screen, from Death's card back (the owner's call).

The card back is death_props_38, cut from his props sheet: the game's own
card back, his skull and scythes. It is only 103 x 156 px there, so it is
enlarged here (Lanczos, then a light unsharp mask); a redrawn back at full
size would replace it one for one.

Writes, into the Capacitor iOS project:
  AppIcon.appiconset/AppIcon-512@2x.png   1024 x 1024, opaque, square corners
                                          (iOS rounds them itself)
  Splash.imageset/splash-2732x2732*.png   the launch screen, the card small
                                          in the middle of the same dark

    python3 art-tools/build/app_icon.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
CARD = ROOT / 'art-tools/death_parts/death_props/death_props_38.png'
ASSETS = ROOT / 'ios/App/App/Assets.xcassets'

# Death's robe: near-black with its purple lining, and his brooch's gold.
EDGE = (11, 8, 13)
MIDDLE = (46, 27, 56)
GOLD = (201, 162, 39)


def backdrop(size: int) -> Image.Image:
    """A dark field, lit purple from the middle, with a faint gold glow where the card lies."""
    out = Image.new('RGB', (size, size), EDGE)
    light = Image.new('L', (size, size), 0)
    ImageDraw.Draw(light).ellipse([size * 0.08, size * 0.08, size * 0.92, size * 0.92], fill=255)
    light = light.filter(ImageFilter.GaussianBlur(size * 0.16))
    out.paste(Image.new('RGB', (size, size), MIDDLE), mask=light)
    glow = Image.new('L', (size, size), 0)
    ImageDraw.Draw(glow).ellipse([size * 0.3, size * 0.22, size * 0.7, size * 0.78], fill=70)
    glow = glow.filter(ImageFilter.GaussianBlur(size * 0.09))
    out.paste(Image.new('RGB', (size, size), GOLD), mask=glow)
    return out


def card(height: int) -> Image.Image:
    im = Image.open(CARD).convert('RGBA')
    im = im.crop(im.getbbox())
    # two steps up, then sharpen what the enlargement softened
    mid = im.resize((im.width * 3, im.height * 3), Image.LANCZOS)
    big = mid.resize((round(im.width * height / im.height), height), Image.LANCZOS)
    rgb = big.convert('RGB').filter(ImageFilter.UnsharpMask(radius=2, percent=90, threshold=2))
    rgb.putalpha(big.getchannel('A'))
    return rgb


def compose(size: int, share: float) -> Image.Image:
    """The card, `share` of the image's height, centred, with a soft shadow under it."""
    out = backdrop(size)
    c = card(round(size * share))
    x, y = (size - c.width) // 2, (size - c.height) // 2
    shadow = Image.new('L', (size, size), 0)
    shadow.paste(c.getchannel('A').point(lambda a: a * 0.75), (x + round(size * 0.012), y + round(size * 0.02)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(size * 0.018))
    out.paste(Image.new('RGB', (size, size), (0, 0, 0)), mask=shadow)
    out.paste(c, (x, y), c)
    return out


def main() -> None:
    icon = compose(1024, 0.86)
    icon.save(ASSETS / 'AppIcon.appiconset/AppIcon-512@2x.png')
    splash = compose(2732, 0.22)
    for name in ('splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png'):
        splash.save(ASSETS / 'Splash.imageset' / name)
    print('icon and launch screen written to', ASSETS.relative_to(ROOT))


if __name__ == '__main__':
    main()
