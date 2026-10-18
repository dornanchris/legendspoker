# The AI's kit

The Station's champion. Before the turn it has no body: the open lens in the
ceiling (a room piece, `art-tools/rooms/station/pieces.json`). When the Robot
is knocked out it sits down in the Robot's chair: the Robot taken over (the
owner: "The AI possesses the Robot, so we could really just change its glow").
Nothing is drawn for it; POSES.md is a record of prompts never used.

Built from the Robot's finished images (rebuild the Robot first):

    python3 art-tools/the_ai_parts/recolour.py
    python3 art-tools/the_ai_parts/clips.py
    python3 art-tools/build/tell_hold.py; python3 art-tools/build/life.py
    python3 art-tools/web_half.py the_ai; python3 art-tools/build/portraits.py

- `recolour.py` copies `web/art/robot/` to `web/art/the_ai/`: the chest lamp
  becomes a pale, cold white with a touch of ice blue (never red: HAL), the
  eye-lamps go dark (the character file), and the grille's speech glow turns
  the same cold white. A lamp's light is told from the brass by the colour of
  its brightest fifth (green about nine tenths of red; the brightest brass is
  oranger), then grown inside the lamp's dark outline; the far eye, small and
  dim, counts only level with and right of the near eye.
- Two frames the Robot has not got, made from its eyes-dimmed pose (B5, which
  with dark eyes is the rest pose): `narrow` (the lens shrunk to a bright
  point: "the lens narrows", strong) and `dimmed` ("the lights in the room dim
  a shade", bluffing).
- Cues: the narrowing beside "the lens tracks your hands" (`turn`: the lens
  both times), the dimming beside "the hull creaks" (`recalibrate`), the fan
  as `whir`, the gravity as `antennae`; fidget `polish`. No blink and no
  glances (dark lamps); `arrive` shows the slumped Robot (its crushing-loss
  frame) sitting back up.
