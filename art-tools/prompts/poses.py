"""Write a character's POSES.md from a compact spec (<id>_parts/poses_spec.json): python3 art-tools/prompts/poses.py SPEC OUT."""
import json, sys
s = json.load(open(sys.argv[1]))
NO = s['no']
# The style lock (the owner, after Davy Jones and Merlin drifted toward detailed
# illustration): each new character used to borrow the LAST character's sheet,
# so the style drifted a little each time. Now every prompt names one fixed
# reference, Washington's pose sheet A, and says what the style is in words.
LOCK = bool(s.get('style_lock'))
# An animal takes its style from Cerberus's sheet instead (the owner: the Cheshire
# Cat drew as furry illustration against Washington's): `style_ref` names the
# image, `style_sheet` the sheet in every later prompt.
# The gothic style (the owner, from the Horseman on: "split the difference" between
# the bright cartoon and the dark table mock-ups; the flat cartoon read as a
# children's game): a spec's own `style` and `style_short` replace the words below.
STYLE = s.get('style') or (f"STYLE, the most important rule: match the {s.get('style_ord', 'SECOND')} attached image ({s.get('style_ref', 'Washington, from the first table')}) exactly: simple, chunky cartoon shapes; "
         "bold, even dark outlines; smooth flat colour with ONE soft shadow tone; bright, clean, saturated colour; a face with only a few lines "
         "(no fine wrinkles, no pores, no cross-hatching); hair and beard drawn as a few big smooth locks, never strand by strand; cloth and metal "
         "with a few big folds or highlights, no texture, no stitching, no grime, no scratches. Readable at thumbnail size. NOT a detailed "
         "illustration, NOT painterly, NOT gritty, NOT realistic.")
SHEET = s.get('style_sheet', "Washington's sheet")
SHORT = (' ' + s['style_short']) if s.get('style_short') else (f" Keep the simple, chunky, flat cartoon style of the attached sheets and of {SHEET}: few lines, big smooth shapes, "
         "flat colour, no fine detail or texture.")
def sheet_intro(first):
    if first:
        return (f"Character pose sheet for 2D animation reference: {s['name']}, exactly as on the attached character sheet ({s['recap']}, colours, line weight, {'style' if s.get('style') else 'flat cartoon style'}).\n\n"
                "Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. "
                f"Leave a little white between {s['him']} and the cell's edges, {s['extremity']} included: nothing of {s['him']} is cut off. Nothing below the table edge. No chair: nothing at all behind {s['him']}, just white.\n\n"
                f"IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand.{s.get('keep','')}"
                + (SHORT if LOCK else ''))
    return (f"Character pose sheet for 2D animation reference: {s['name']}, exactly as on the attached sheets, drawn to match the attached pose sheet{'s' if first is None else ''}: same size, same angle, same place in each cell, same table edge height, same {s['same']}.\n\n"
            f"Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind {s['him']}, nothing of {s['him']} cut off by the cell's edge. Nothing below the table edge. "
            f"The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).{s.get('keep','')}"
            + (SHORT if LOCK else ''))
def block(t): return "```\n" + t.strip() + "\n```\n"
out = [f"# {s['title']}: every pose, and the prompts\n", s['intro'].strip() + "\n",
       "| # | Pose | Tag |\n|---|---|---|"]
for code, pose, tag in s['table']:
    out.append(f"| {code} | {pose} | {tag} |")
out.append("\n## Prompts\n")
out.append(s['howto'].strip() + "\n")
out.append("### Character sheet\n")
out.append(block(s['character'] + ("\n\n" + STYLE if LOCK else '')))
for i, k in enumerate(k for k in 'ABCD' if k in s['sheets']):   # the avatar has only A and B
    poses = s['sheets'][k]
    intro = sheet_intro(True if i == 0 else False)
    body = "\n".join(f"{n+1}. {p}" for n, p in enumerate(poses))
    # empty hands (the owner: the game's own cards and chips do that work): no cards or chips drawn at all
    cards = "No cards and no chips anywhere: the hands are empty. " if s.get('empty_hands') else ("Cards have plain dark backs. " if k != 'C' else "")
    tail = cards + "Pure white background around each pose; poses do not touch. No text, no numbers, no labels. " + NO
    out.append(f"### Pose sheet {k}\n")
    out.append(block(intro + "\n\n" + body + "\n\n" + tail))
if s.get('face'):                                             # a faceless figure has no face sheet
    out.append("### Face overlay sheet\n")
    out.append(block(s['face'] + ('\n\n' + SHORT.strip() if LOCK else '')))
text = "\n".join(out)
for a, b in s.get('replace', []):                          # a non-human body (Cerberus): the template's arms and hands
    text = text.replace(a, b)
open(sys.argv[2], 'w').write(text)
