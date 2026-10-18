# Teddy Roosevelt: Animation Brief

Rig and animate Teddy Roosevelt in Rive from the supplied parts. This first round is the essentials: a rig that breathes, blinks, glances and talks, and 13 animations. He is one of 40 characters, so the set is kept small; we will add to it once this works.

## The character

Loud, eager and proud. Barrel chest, heavy moustache, huge toothy grin, round steel spectacles, a brown three-piece suit with a gold watch chain and a maroon tie. Every move a little bigger, faster and prouder than you'd expect. Wins are joyful, losses grudging; never a clown.

- Seated at a round poker table, waist up, three-quarter view facing right. The table's edge hides everything below his forearms.
- At rest his forearms lie along the table's padded edge, hands resting apart on the felt.
- The game flips him horizontally for seats on the right.
- On a phone he is about 220 px wide and his face about 40 px tall, so motion must read as big shapes.
- **He never picks up or holds cards or chips.** The game draws and moves them. His hands make the motion over the empty felt in front of him: pushing forward, flicking, rapping.

## Deliverables

| Item | Detail |
| --- | --- |
| Rive file | One `.riv`, one artboard named `roosevelt`, every animation named exactly as below |
| Rest pose | Matches the rest drawing (top left of poses_a) |
| Face layer | Blink, glances and talking on their own layer, so they play over any body animation |
| Source | The `.rev` project file |
| Preview | A screen recording of every animation, for sign-off |

## Art supplied

Teddy drawn once as separate parts, plus drawings of each pose to animate toward. Ask for anything missing before you rig.

| File | What it holds |
| --- | --- |
| `roosevelt_sheet` | Character sheet: colours, proportions, the look to keep. `face_overlays` is his face sheet from the current game |
| `poses_a` to `poses_d` (24 poses) | Reference for the moves below at their peak. The rest pose is top left of `poses_a`. There are more poses than this round needs; ignore the cards and chips in his hands |
| `rive_6_new_poses` (6 poses) | More reference: huge win, big win, crushing loss, knocked out, charging in, arms folded. Only the huge win is needed this round |
| `rive_1_body` | Torso with no arms or head (coat drawn complete under the arms), upper arms hanging and raised, folded arms as one piece, the watch chain |
| `rive_2_right_arm_table` | Right forearm without a hand; 9 empty hands: rest, knuckle rap, cupped (peek), pushing forward, flick, turning over, sweeping in, drum, flat slap |
| `rive_3_right_hands_gestures` | 11 right hands: raised fist, slamming fist, point, tap, palm up, palm out, handshake, pinch, spectacles push, handkerchief, thumbs up |
| `rive_4_left_arm_props` | Left forearm; 6 hands (rest, holding spectacles, holding the watch, raised fist, sweeping in, pressing down); spectacles on and folded, handkerchief, pocket watch open and closed |
| `rive_5_head_face` | Bare head; empty eye whites with separate pupils; lids; brows (drawn with the eyes); moustache; 13 mouths for speech and expressions; 4 whole heads (at rest, facing the viewer, thrown back laughing, chin down glaring). The bare head came out narrower than his face: `face_overlays` shows its true shape |

The sheets hold more than these 13 animations need (the watch, the extra hands and poses); they are there for later rounds.

Joint ends are drawn rounded and running past the joint, anything another piece covers is drawn complete, and no piece carries another's shadow.

## Built into the rig

These run the whole time, under every animation. The game triggers each one; the file supplies how they look.

| Name | What he does | Length |
| --- | --- | --- |
| `breathe` | A slow breath: chest and shoulders rise and fall a few pixels | 4.4 s loop |
| `blink` | Lids half, closed, half, open | 0.16 s |
| `gaze_ahead` `gaze_down` `gaze_viewer` | Pupils, with a slight head tilt, settle on that direction and hold | 0.2 s, then hold |
| `talk` | Mouth opens and closes in an uneven rhythm, the moustache moving with it | 1 s loop |

His lines appear as speech bubbles; the game plays `talk` for as long as one is on screen. The talking mouth must not look like the grin tell: lips moving, not a wide toothy smile.

## The 13 animations

His hands are always empty: the game moves the real cards and chips at the same moment.

| Name | What he does | Length |
| --- | --- | --- |
| `check` | Two hard raps of the knuckles on the felt | 1.1 s |
| `bet` | Leans in and pushes his right hand forward along the felt, firm (used for calls and raises too) | 1.6 s |
| `all_in` | Both hands push forward together, grinning, chest out | 2 s |
| `fold` | A dismissive flick of the right hand toward the middle | 1.2 s |
| `win` | A satisfied nod and a closed smile | 1.4 s |
| `win_big` | Both fists thrown high over his head, chest out, head back, a shout of triumph, then brings them down | 3 s |
| `lose` | A scowl, arms folded, then back to rest | 2.4 s |

**Tells and decoys** need the most care. Each tell has a decoy that starts the same way: a glance sees the same thing, and only a close look catches the one detail that differs. Keep that detail clear but not obvious.

| Tell | What he does | Decoy | What the decoy does | The detail that differs |
| --- | --- | --- | --- | --- |
| `grin` (2 s) | The enormous grin, all teeth, chin up, held silently; eyes stay on the table | `laugh` (2 s) | A hearty laugh, head thrown back | The grin is silent and still, teeth together; the laugh opens the mouth and moves the head |
| `drum` (2 s) | Drums all four fingers on the felt, several rolls | `tap` (1.1 s) | One finger taps the felt once, thinking | Rolling fingers, repeated, against a single tap |
| `polish` (2.6 s) | Spectacles off in his left hand, polished **hard** with a handkerchief, put back on | `push_specs` (1.6 s) | Pushes his spectacles up his nose with one finger | Off and rubbed hard, against nudged and left on |

## Rules every animation follows

1. **Start and end exactly on the rest pose**. The game chains animations and may cut one short.
2. **Face separate from body.** Blinks, glances and talking play over any body animation without fighting it.
3. **Nothing below the table's edge is seen.** Hands may reach onto the felt and over the padded edge; lap, legs and chair never show. The table's edge in the rest drawing is the line.
4. **Limbs bend, never stretch.** An arm may foreshorten as it reaches toward the viewer; it never gets longer.
5. **Works mirrored.** No motion may read wrong flipped left to right.
6. **Readable small.** Check every animation at 220 px wide; if it doesn't read there, make it bigger.
7. **Empty hands.** No cards or chips in any animation.
