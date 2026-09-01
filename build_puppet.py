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
Once the numbers look right they are your rig's rest pose: import the same
parts into Rive/Live2D and type these offsets in.
"""

import argparse
import glob
import json
import os

from PIL import Image


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

    for p in sorted(layout["parts"], key=lambda p: p.get("z", 0)):
        if not p.get("visible", True):
            continue
        if not os.path.exists(p["file"]):
            print(f"  missing: {p['file']}")
            continue
        im = Image.open(p["file"]).convert("RGBA")

        s = float(p.get("scale", 1.0))
        if s != 1.0:
            im = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))),
                           Image.LANCZOS)
        r = float(p.get("rot", 0.0))
        if r:
            im = im.rotate(r, resample=Image.BICUBIC, expand=True)

        canvas.alpha_composite(im, (int(p["x"]), int(p["y"])))

    canvas.save(args.out)
    print(f"rendered -> {args.out}")


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
