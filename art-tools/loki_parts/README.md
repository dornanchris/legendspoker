# Loki's kit: the uninvited guest (spoilers)

Prompts only so far: `POSES.md`, generated from `poses_spec.json` by
`python3 art-tools/prompts/poses.py art-tools/loki_parts/poses_spec.json art-tools/loki_parts/POSES.md`.

- Style: the presidents' cartoon (`style_lock`), not gothic: he is met mostly
  at the early tables.
- Hands empty in every pose (`empty_hands`); the big win (B3) and the crushing
  loss (D4) are in the 24 poses, so he needs no reactions sheet.
- Tells (data/characters/loki.json): touching the stitch-scars (bluffing,
  B4, beside the chin rub B5); the half smile (strong, a face-sheet mouth,
  beside the full smile C5); his eyes amber for a moment (weak, a face-sheet
  eye piece, beside the ceiling glance C2). Never green-gold: nothing of
  Marvel's Loki (ASSETS.md).
- C6 is `arrive`, played as he takes the banished player's chair. He can sit
  in any chair, so he is drawn facing right and mirrored.

When the six sheets arrive: save them to `sources/` and build with
`art-tools/pose_rig.py` like the Pirate Cove and Camelot casts.
