# The Green Knight's parts (after his return)

The Green Knight when he comes back, twenty hands after he is knocked out:
helm gone, beaten and colder (the owner: "more menacing, it should be obvious
that he was defeated, without being graphic"). A human face (no green skin:
the owner ruled it out), a clean bandage at his neck, dented plate, a cracked
shoulder plate, a torn mantle, a thinned holly branch. No grin.

`web/puppet/cast.ts` `RETURNED` maps `green_knight` to this puppet, and the
table seats it when his arrival has `replaces === id` (`changed` in
`web/screens/table.ts`; preloaded with the room). Its anim.json says whose
figure it is (`"of": "green_knight"`), so check:data holds its cues to his
tells and idles.

    python3 art-tools/cut_sheet.py art-tools/green_knight_bare_parts/cut_face.json
    python3 art-tools/pose_rig.py art-tools/green_knight_bare_parts/pose_rig.json
    python3 art-tools/web_half.py green_knight_bare

- **His head is cut by an outline, not a box** (`master.head_poly`, and
  `keep_poly` on the master head): a box took a bite out of his shoulder
  plate and the master head's own shoulders made a seam.
- Pose sheet C drew C1 and C2 touching: split at x 505, each keeps its
  biggest piece. D6 stands with no felt: placed by hand (`reg` 0, 0).
- **Face**: eyes half, closed, viewer, down, side, narrow; brows raised,
  down; mouths rest, ah, ee, oh, oo, m, f, l, laugh (low), cold; head 20
  (toward the viewer).

**Clips** (`web/art/green_knight_bare/anim.json`, 24): as the helmed set,
colder: `cold_smile` for the grin, `arrive` (C6: looming over the table) as
he sits back down, `lost_pot` a fist on the table, `knocked_out` a curt nod.

## Reactions sheet E

`sources/poses_e.png`, placed by `art-tools/build/reactions_sheet.py green_knight_bare`; frames `win_big` (E2) and `lose_big` (E3), clips from `art-tools/build/reactions.py green_knight_bare`. The fit reads low (61-73%) only because the holly branch is drawn differently; the body lines up.

Cleaned the same way as the helmed look (see green_knight_parts/README.md);
its far rest gauntlet has its own `restore` box.
