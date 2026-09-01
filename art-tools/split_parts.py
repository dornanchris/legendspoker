#!/usr/bin/env python3
"""
split_parts.py -- cut a character parts-sheet into individual PNG layers.

Designed for AI-generated puppet sheets (arms sheet, face-kit sheet, etc.)
that sit on a flat white or transparent background.

WHAT IT DOES
  1. Removes the background WITHOUT eating interior whites (cuffs, cravat,
     eye-whites, fangs). It flood-fills only from the canvas border, so any
     white enclosed by a dark outline is kept.
  2. Finds every separate island of artwork (connected components).
  3. Crops each island to its own tight bounding box and saves it as its own
     transparent PNG.
  4. Records each piece's EXACT position on the source canvas in parts.json,
     so nothing is lost and the sheet can be rebuilt pixel-perfect.
  5. Renders a numbered contact sheet so you can see which index is which
     part and rename them.

USAGE
  python3 split_parts.py INPUT.png -o outdir [--name dracula_arms]
  python3 split_parts.py sheets/*.png -o outdir
"""

import argparse
import json
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage


# ----------------------------------------------------------------- background
def build_alpha(img, white_thresh=238, feather=1.0):
    """Return a float alpha mask (0..1) with the OUTER background removed.

    If the image already has a real alpha channel we trust it. Otherwise we
    treat near-white as candidate background, label it, and only delete the
    near-white regions that actually touch the canvas border. Interior whites
    (a white cuff, the cravat, the whites of the eyes) are enclosed by the
    black line art, never touch the border, and therefore survive.
    """
    rgba = img.convert("RGBA")
    arr = np.array(rgba)
    a = arr[..., 3]

    if a.min() < 250:                      # genuine alpha already present
        alpha = a.astype(np.float32) / 255.0
    else:
        rgb = arr[..., :3].astype(np.int16)
        near_white = np.all(rgb >= white_thresh, axis=-1)

        lbl, n = ndimage.label(near_white)
        if n:
            border = np.concatenate([lbl[0, :], lbl[-1, :], lbl[:, 0], lbl[:, -1]])
            outside = set(int(v) for v in np.unique(border) if v)
            bg = np.isin(lbl, list(outside)) if outside else np.zeros_like(near_white)
        else:
            bg = np.zeros_like(near_white)

        alpha = (~bg).astype(np.float32)

    if feather > 0:                        # soften the cut edge a little
        alpha = ndimage.gaussian_filter(alpha, sigma=feather)
        alpha = np.clip((alpha - 0.35) / 0.45, 0.0, 1.0)

    return arr, alpha


# ----------------------------------------------------------------- components
def find_pieces(alpha, min_area, close_px):
    """Label separate islands of artwork. `close_px` merges islands that are
    within that many pixels of each other -- raise it if one logical part is
    being split into several files."""
    solid = alpha > 0.35

    if close_px > 0:
        st = np.ones((close_px * 2 + 1, close_px * 2 + 1), bool)
        grouped = ndimage.binary_closing(solid, structure=st)
        grouped = ndimage.binary_dilation(solid, structure=st)
    else:
        grouped = solid

    lbl, n = ndimage.label(grouped)
    out = []
    for i in range(1, n + 1):
        m = lbl == i
        area = int((m & solid).sum())
        if area < min_area:
            continue
        ys, xs = np.where(m)
        out.append({
            "mask": m,
            "x": int(xs.min()), "y": int(ys.min()),
            "w": int(xs.max() - xs.min() + 1),
            "h": int(ys.max() - ys.min() + 1),
            "area": area,
        })
    return out


def reading_order(pieces, row_tol=0.5):
    """Sort top-to-bottom then left-to-right, grouping into rows so the
    numbering matches how you'd read the sheet with your eyes."""
    if not pieces:
        return pieces
    heights = sorted(p["h"] for p in pieces)
    tol = max(20, int(heights[len(heights) // 2] * row_tol))

    rows, cur = [], [pieces[0]]
    for p in sorted(pieces, key=lambda p: p["y"])[1:]:
        if p["y"] - cur[-1]["y"] <= tol:
            cur.append(p)
        else:
            rows.append(cur); cur = [p]
    rows.append(cur)

    ordered = []
    for r in rows:
        ordered.extend(sorted(r, key=lambda p: p["x"]))
    return ordered


# ----------------------------------------------------------------- output
def contact_sheet(img, pieces, path):
    """Numbered preview so you can map index -> body part and rename."""
    from PIL import ImageDraw
    prev = img.convert("RGB").copy()
    d = ImageDraw.Draw(prev)
    for i, p in enumerate(pieces, 1):
        box = (p["x"], p["y"], p["x"] + p["w"], p["y"] + p["h"])
        d.rectangle(box, outline=(255, 0, 128), width=4)
        tag = str(i)
        tx, ty = p["x"] + 6, p["y"] + 6
        d.rectangle((tx - 4, ty - 4, tx + 14 * len(tag) + 6, ty + 34),
                    fill=(255, 0, 128))
        d.text((tx, ty), tag, fill=(255, 255, 255))
    prev.save(path)


def process(path, outdir, stem=None, min_area=900, close_px=0,
            white_thresh=238, feather=1.0, pad=2):
    img = Image.open(path)
    stem = stem or os.path.splitext(os.path.basename(path))[0]
    dest = os.path.join(outdir, stem)
    os.makedirs(dest, exist_ok=True)

    arr, alpha = build_alpha(img, white_thresh, feather)
    pieces = reading_order(find_pieces(alpha, min_area, close_px))

    H, W = alpha.shape
    manifest = {
        "source": os.path.basename(path),
        "canvas": {"w": int(W), "h": int(H)},
        "note": ("x/y are the piece's position on the SOURCE canvas. Draw every "
                 "piece at its x/y on a canvas of this size and the original "
                 "sheet is reproduced exactly."),
        "parts": [],
    }

    for i, p in enumerate(pieces, 1):
        x0 = max(0, p["x"] - pad); y0 = max(0, p["y"] - pad)
        x1 = min(W, p["x"] + p["w"] + pad); y1 = min(H, p["y"] + p["h"] + pad)

        sub = arr[y0:y1, x0:x1].copy()
        sub_a = alpha[y0:y1, x0:x1] * p["mask"][y0:y1, x0:x1]
        sub[..., 3] = (np.clip(sub_a, 0, 1) * 255).astype(np.uint8)

        name = f"{stem}_{i:02d}.png"
        Image.fromarray(sub, "RGBA").save(os.path.join(dest, name))

        manifest["parts"].append({
            "index": i, "file": name, "label": "",
            "x": x0, "y": y0,
            "w": int(x1 - x0), "h": int(y1 - y0),
            "pivot": [round((x1 - x0) / 2, 1), round((y1 - y0) / 2, 1)],
            "area": p["area"],
        })

    with open(os.path.join(dest, "parts.json"), "w") as f:
        json.dump(manifest, f, indent=2)

    contact_sheet(img, pieces, os.path.join(dest, "_contact_sheet.png"))
    print(f"{os.path.basename(path)}: {len(pieces)} pieces -> {dest}")
    return len(pieces)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("inputs", nargs="+")
    ap.add_argument("-o", "--outdir", default="parts")
    ap.add_argument("--name", default=None, help="stem for a single input")
    ap.add_argument("--min-area", type=int, default=900,
                    help="ignore islands smaller than this many pixels")
    ap.add_argument("--close", type=int, default=0,
                    help="merge islands within N px (use if one part splits)")
    ap.add_argument("--white", type=int, default=238,
                    help="how white counts as background (lower = more eaten)")
    ap.add_argument("--feather", type=float, default=1.0)
    a = ap.parse_args()

    os.makedirs(a.outdir, exist_ok=True)
    total = 0
    for p in a.inputs:
        total += process(p, a.outdir, a.name if len(a.inputs) == 1 else None,
                         a.min_area, a.close, a.white, a.feather)
    print(f"\ntotal: {total} pieces")


if __name__ == "__main__":
    sys.exit(main())
