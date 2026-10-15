# The puppet player

Draws a character's cut-out puppet and animates it. Generic: nothing here
knows who Lincoln is. A character is two files in `web/art/<id>/`:

- `rig.json` and its images: **generated** by `art-tools/pose_rig.py` from
  the pose drawings (Lincoln, Washington). Bones with pivots (torso, head,
  each forearm at its elbow) and every part in its rest pose, with its bone,
  its slot (swap group) and whether it rests on the table.
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
| `cast.ts` | which puppets and rooms the build knows (explicit imports, so file:// works) |
| `stage.ts` | a room and its figures under the table screen: layout, layering, cues |

**The pose is rebuilt from rest every frame**; the face and each playing clip
add to it. So a clip ending at zero leaves the puppet exactly at rest, and the
face (head bone, eyes / brows / mouth slots) and an arm clip (arm and hand
bones and slots) never fight.

**Swaps.** A clip's swap names a part of a slot, null puts the slot back to
rest, and "-" shows nothing there. A part with `with` shows only while that
other part shows: face layers carry `"with": "head.rest"`, so swapping in a
head drawn turned away hides the eyes and mouth drawn for the master. A
**frame** is a whole-figure drawing (a lean over the table) in slot `frame`
(and `frame_over`, its collar over the head's neck): a clip hides `torso`,
`torso_over`, both arms and both upper arms with "-", shows the frame, and
moves the head by the rig's `frames.<name>` offset, so the master head and
its face ride on the frame's neck. The change happens inside a motion, as
the arm pieces' changes do.

**Shapes swap, never cross-fade.** Two mouths faded together are a ghost.
Blinks are open, half, closed, half, open; speech is one mouth at a time.

**Limbs never stretch.** A clip rotates a forearm about its elbow and may
move the elbow a little under its sleeve; `len` only foreshortens (a forearm
reaching toward the viewer looks shorter).

**The table rail**: the body is drawn, then the table over it below the table
line, then the parts that rest on the table again over it there. A forearm
runs under the rail's far edge onto the felt; a hand lifted above the line
is simply in front of the body.

**In a room, the table covers a puppet only below the puppet's OWN table
line** (and below the rim, wherever the rim is lower). A round table's rim
curves up toward its ends, above the straight rail a seat was drawn on; if
the room's table covered everything below its rim, its top edge would cut in
between a hand and its cuff on the end seats and the arm would look to pass
through the table. `art-tools/mock_screen.py` draws it this way: the strip of
each puppet above its own line goes back over the table.

**The stage** (`stage.ts`): the table screen's canvas. A room
(`web/art/rooms/<id>/room.json`, written by `art-tools/room_web.py`) is laid
out in mock_screen.py's 1600x900 design space with its bottom on the
screen's bottom: a wide screen shows more room at the sides, a short one
loses up to `crop` px of ceiling, a tall one gets more table and then dark.
The rim is sampled from the table's alpha there, because a page opened from
disk cannot read pixels back. Back to front: backdrop, Death, the seats,
the table, each figure again above its own line, the resting parts again
below the rim. `geometry()` says where each chair, head and Death's deck are
on screen, for the DOM laid over them. `cue(seat, clip, prio)`: an idle
gives way to anything and is dropped when they are busy; anything else cuts
an idle short or waits (one at a time, the newest, dropped if 2.5 s stale)
for what is playing to end, so a tell is never cut off by the action after
it. The stage loads `half/`, the half-size images (`art-tools/web_half.py`;
rerun it after rebuilding a puppet), and scales them back up.

A room's **pieces** (`pieces` in room.json, cut by room_web.py from a sheet
per `art-tools/rooms/<room>/pieces.json`) are drawn over the backdrop and
scaled with it: the **presence** (a story piece, `before` the table's late
champion arrives and `after`; `setPresence`, from table.ts) and **loops**
(frames cycled at random intervals at each spot: lamp flames; still under
Reduce motion). `?room=<id>` on the page stages any table in that room.

`anim.json` may carry `cues` (a tell's or idle's words -> the clip that acts
it; check:data holds the words to the character file) and `fidgets` (clips
played as wordless noise: decoys and small business), and `gutter` (clips
during which the room's lamp nearest the chair, a spot of its first loop,
sinks and stutters: Davy Jones's "the lamp nearest him flickers").

**The bench**: `#/puppet/<id>` (e.g. `web/index.html#/puppet/lincoln`)
triggers, loops, slows and scrubs every clip beside its reference drawing,
and drives the eyes, brows and mouth by hand. Space replays, B blinks, S speaks.

Presentation only: the randomness is `Math.random`, never the game RNG.

## The IK prototype (Lincoln only, off by default)

`?ik=1` (or localStorage `legends-poker/ik` = 1) turns it on; without it every
puppet, Lincoln included, plays exactly as before. `ik.ts` is a two-bone IK
arm: `web/art/lincoln/ik.json` (written by `art-tools/lincoln_parts/ik_split.py`,
which cuts his EXISTING check-arm image into upper arm, forearm and hand, no
new drawing) gives the shoulder, elbow and wrist and the bend side. A clip's
`ik` tracks move the wrist (x, y offsets in rig pixels = table space, so a
mirrored seat mirrors the target) and turn the hand (`rot`); `ikSwaps` choose
the hand image; while a chain shows a hand it stands in for the slots in
`hides`, and steps aside whenever a clip empties those slots (a whole-figure
frame). A zero offset gives exactly the rest matrices, so a clip that ends at
zero ends at rest. The player plays `<name>_ik` for `<name>` when it has one
(the game still asks for `check`), and on an IK puppet a clip cut short hands
back to rest over `release` s (0.15) instead of snapping. Everything runs on
the player's clock (the stage's pace, fast-forward rules and Reduce motion
unchanged). Checks: `npx tsx web/puppet/ik-check.ts` (joints, lengths, the
finger on the felt, exact rest), `#/iktest` on the real stage, and
`art-tools/build/ik_shots.cjs` / `ik_blend.cjs` (phone-size stills of both
seats, frame cost, memory, hand-back smoothness).
