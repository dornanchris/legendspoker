#!/usr/bin/env python3
"""
build_puppet.py -- assemble split parts into a posed puppet, and preview it.

A script CANNOT know that the hand belongs at the end of the forearm, or how
far the cape sits behind the shoulders. That is authored, once, per character.
What this does is make authoring it fast: you edit numbers in a JSON file and
re-render in a second, instead of dragging layers in an art tool.

  # 1. make a starting layout listing every part you have
  python3 build_puppet.py init parts/ -o dracula_layout.json

  # 2. edit dracula_layout.json  (x, y, scale, rot, z, visible)
  # 3. render and look at it
  python3 build_puppet.py render dracula_layout.json -o preview.png

Coordinates are top-left of the part, in canvas pixels. z sorts back->front.
"flip": true mirrors a part left-right (hands are drawn for one side only).
"on_table": true marks a part that rests on the table (a forearm, a hand):
it is drawn at its own z, so its upper end can tuck under a cape or sleeve,
and drawn again over everything below the layout's "table_line", so the part
lying on the felt sits above the table. Anything not on the table is covered
by the table below that line.
"clip_top": y draws a part only from canvas line y down. Listing a piece twice,
once whole and once clipped above the head, lets a cape's collar and shoulders
wrap over the bottom of a hood without the collar covering the face.
"clip_feather": n fades it in over n pixels below that line, so no hard edge.
"clip_cols": [[x0, x1], ...] draws a part only between those canvas columns
(softened by "clip_feather" too):
a torso listed again over the forearms, kept only at its sides, puts its
sleeves over the elbows of arms that lie in front of the body.
File paths are relative to the layout file, so it renders from anywhere.
Once the numbers look right they are your rig's rest pose: import the same
parts into Rive/Live2D and type these offsets in.
"""

import argparse
import glob
import json
import os

from PIL import Image, ImageChops, ImageFilter, ImageOps


def cmd_init(args):
    """Scan a parts directory and emit a layout stub with every piece listed."""
    layout = {"canvas": {"w": 1600, "h": 1600},
              "background": [18, 18, 22, 255],
              "parts": []}
    z = 0
    for manifest in sorted(glob.glob(os.path.join(args.parts, "*", "parts.json"))):
        folder = os.path.dirname(manifest)
        data = json.load(open(manifest))
        for p in data["parts"]:
            layout["parts"].append({
                "file": os.path.join(folder, p["file"]),
                "label": p["label"] or f'{os.path.basename(folder)}_{p["index"]:02d}',
                "x": p["x"], "y": p["y"],
                "scale": 1.0, "rot": 0.0, "z": z, "visible": True,
            })
            z += 1
    with open(args.out, "w") as f:
        json.dump(layout, f, indent=2)
    print(f"{len(layout['parts'])} parts -> {args.out}")
    print("Edit x/y/scale/rot/z, set visible:false on parts not in this pose, "
          "then run: build_puppet.py render")


def cmd_render(args):
    layout = json.load(open(args.layout))
    W, H = layout["canvas"]["w"], layout["canvas"]["h"]
    bg = tuple(layout.get("background", [0, 0, 0, 0]))
    canvas = Image.new("RGBA", (W, H), bg)

    on_table = []
    for p in sorted(layout["parts"], key=lambda p: p.get("z", 0)):
        if not p.get("visible", True):
            continue
        im = load(p, args.layout)
        if im is None:
            continue
        if "clip_top" in p:
            im = clip_above(im, int(p["clip_top"]) - int(p["y"]), int(p.get("clip_feather", 0)))
        if "clip_cols" in p:
            keep = Image.new("L", im.size, 0)
            for x0, x1 in p["clip_cols"]:
                keep.paste(255, (max(0, int(x0) - int(p["x"])), 0, max(0, int(x1) - int(p["x"])), im.height))
            if p.get("clip_feather"):                  # soft sides as well as a soft top
                keep = keep.filter(ImageFilter.BoxBlur(int(p["clip_feather"]) // 2))
            im = im.copy()
            im.putalpha(ImageChops.multiply(im.getchannel("A"), keep))
        canvas.alpha_composite(im, (int(p["x"]), int(p["y"])))
        if p.get("on_table"):
            on_table.append((p, im))

    line = layout.get("table_line")
    if line is not None and on_table:
        over = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        for p, im in on_table:
            over.alpha_composite(im, (int(p["x"]), int(p["y"])))
        over.paste((0, 0, 0, 0), (0, 0, W, int(line)))
        canvas.alpha_composite(over)

    canvas.save(args.out)
    print(f"rendered -> {args.out}")


def clip_above(im, cut, feather):
    """Clear a part above local row `cut`, fading it in over `feather` rows."""
    a = im.getchannel("A")
    ramp = Image.new("L", im.size, 255)
    for y in range(min(max(cut + feather, 0), im.height)):
        v = 0 if y < cut else int(255 * (y - cut + 1) / (feather + 1))
        ramp.paste(v, (0, y, im.width, y + 1))
    im = im.copy()
    im.putalpha(ImageChops.multiply(a, ramp))
    return im


def load(p, layout_path):
    """A part's image, flipped, scaled and rotated as the layout says."""
    path = p["file"]
    if not os.path.isabs(path) and not os.path.exists(path):
        path = os.path.join(os.path.dirname(os.path.abspath(layout_path)), path)
    if not os.path.exists(path):
        print(f"  missing: {p['file']}")
        return None
    im = Image.open(path).convert("RGBA")
    if p.get("flip"):
        im = ImageOps.mirror(im)
    s = float(p.get("scale", 1.0))
    if s != 1.0:
        im = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))),
                       Image.LANCZOS)
    r = float(p.get("rot", 0.0))
    if r:
        im = im.rotate(r, resample=Image.BICUBIC, expand=True)
    return im


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    i = sub.add_parser("init");  i.add_argument("parts")
    i.add_argument("-o", "--out", default="layout.json"); i.set_defaults(f=cmd_init)

    r = sub.add_parser("render"); r.add_argument("layout")
    r.add_argument("-o", "--out", default="preview.png"); r.set_defaults(f=cmd_render)

    a = ap.parse_args()
    a.f(a)


if __name__ == "__main__":
    main()
