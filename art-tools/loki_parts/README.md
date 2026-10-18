# Loki's kit: the uninvited guest (spoilers)

**Built** (`#/puppet/loki`, 26 clips). Prompts: `POSES.md`, generated from `poses_spec.json` by
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

## The game's puppet

Built by `art-tools/pose_rig.py`, the way Van Helsing is:

    python3 art-tools/cut_sheet.py art-tools/loki_parts/cut_face.json
    python3 art-tools/build/own_master.py art-tools/loki_parts loki 320
    python3 art-tools/build/pose_boxes.py art-tools/loki_parts
    python3 art-tools/build/corner_regs.py art-tools/loki_parts
    python3 art-tools/build/rig_from_spec.py art-tools/loki_parts/rig_spec.json
    python3 art-tools/pose_rig.py art-tools/loki_parts/pose_rig.json
    python3 art-tools/build/frames_sheet.py loki
    python3 art-tools/loki_parts/clips.py
    python3 art-tools/build/win_small.py; python3 art-tools/build/fallback_clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py loki

- **The master is the rest pose's own head** (`loki_face/loki_master.png`,
  rows 0-320 of A1, kept to the head and collar by `keep_poly`).
- **Face** (`face.json`): eyes half 2, closed 3, viewer 4, down 5, up 6,
  narrow 7, amber 8 (the weak tell); mouths rest 11, ah 12, ee 13, oh 14,
  oo 15, m 16, half_smile 17 (the strong tell: the corner on the picture's
  left), f and l 19, hum 20, smile 21, laugh 22. The wink 9, brows 10 and
  the heads 1 and 23-26 are unused.
- **The game piece** is a props box in the near forearm's piece and in every
  frame, cut tight so the drawn rail beside it stays out; in `game_piece`
  (C4) he holds it, and the sheet drew a second one on the felt, so that
  frame keeps no props box (the felt one is dropped as rail-coloured).
- The sheets came out a little more painted than the presidents' cartoon
  (soft shading); at table size it reads with the rest.

**Clips** (`web/art/loki/anim.json`): check, peek, call, bet, fold, all in,
show (hands empty: the game moves the cards and chips); tells `scars`
(bluffing) beside `chin`, `half_smile` (strong, a mouth swap) beside
`full_smile`, `amber` (weak, an eye swap) beside `ceiling`; idles `scale`,
`count` (pointing round twice), `hum`, `game_piece`; beats talk, big bet,
lost pot, `lose_big`, `win_big` (fists raised), heads up, laugh, and
`arrive`, played as he takes the banished player's chair. Fidgets: chin,
full smile, look at you.
