# The puppet player

Draws a character's cut-out puppet and animates it. Generic: nothing here
knows who Lincoln is. A character is two files in `web/art/<id>/`:

- `rig.json` and its images: **generated** by `art-tools/seat_puppet.py`
  (the spec's `"runtime"` field). Bones with pivots (torso, head, each
  forearm at its elbow, each hand at its wrist) and every part in its rest
  pose, with its bone, its slot (swap group) and whether it rests on the table.
- `anim.json`: **authored**. The face's timing (blinks, glances, sway, breath,
  lip shapes per letter) and the clips (keyframed bone channels and part swaps).

and a line in `cast.ts`.

| File | What |
|---|---|
| `rig.ts` | loads a rig, the 2D matrices |
| `clip.ts` | the clip format, easing, sampling |
| `puppet.ts` | one puppet's pose this frame, and drawing it (table rail layering) |
| `face.ts` | blinks, gaze, brows, speech, idle sway and breath |
| `player.ts` | a puppet + its face + its clips on a clock: what a screen owns |
| `cast.ts` | which puppets the build knows (explicit imports, so file:// works) |

**The pose is rebuilt from rest every frame**; the face and each playing clip
add to it. So a clip ending at zero leaves the puppet exactly at rest, and the
face (head bone, eyes / brows / mouth slots) and an arm clip (arm and hand
bones and slots) never fight.

**Shapes swap, never cross-fade.** Two mouths faded together are a ghost.
Blinks are open, half, closed, half, open; speech is one mouth at a time.

**Limbs never stretch.** A clip rotates a forearm about its elbow and may
move the elbow a little under its sleeve; `len` only foreshortens (a forearm
reaching toward the viewer looks shorter).

**The table rail**: the body is drawn, then the table over it below the table
line, then the parts that rest on the table again over it there. A forearm
runs under the rail's far edge onto the felt; a hand lifted above the line
is simply in front of the body.

**The bench**: `#/puppet/<id>` (e.g. `web/index.html#/puppet/lincoln`)
triggers, loops, slows and scrubs every clip beside its reference drawing,
and drives the eyes, brows and mouth by hand. Space replays, B blinks, S speaks.

Presentation only: the randomness is `Math.random`, never the game RNG.
