"""Write a character's POSES.md from a compact spec (<id>_parts/poses_spec.json): python3 art-tools/prompts/poses.py SPEC OUT."""
import json, sys
s = json.load(open(sys.argv[1]))
NO = s['no']
def sheet_intro(first):
    if first:
        return (f"Character pose sheet for 2D animation reference: {s['name']}, exactly as on the attached character sheet ({s['recap']}, colours, line weight, flat cartoon style).\n\n"
                "Draw 6 poses in a grid, 3 across and 2 down, in this order. Every pose: waist up, seated behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, the same size, in the same place in its cell, with the table edge at the same height in every cell. "
                f"Leave a little white between {s['him']} and the cell's edges, {s['extremity']} included: nothing of {s['him']} is cut off. Nothing below the table edge. No chair: nothing at all behind {s['him']}, just white.\n\n"
                f"IMPORTANT for every pose: the arm that the pose does not mention stays EXACTLY as in pose 1, same position, same hand.{s.get('keep','')}")
    return (f"Character pose sheet for 2D animation reference: {s['name']}, exactly as on the attached sheets, drawn to match the attached pose sheet{'s' if first is None else ''}: same size, same angle, same place in each cell, same table edge height, same {s['same']}.\n\n"
            f"Draw 6 poses, 3 across and 2 down, in this order. Every pose: waist up, behind the curved edge of a round green poker table, three-quarter view facing the viewer's right, no chair, nothing behind {s['him']}, nothing of {s['him']} cut off by the cell's edge. Nothing below the table edge. "
            f"The arm a pose does not mention stays EXACTLY as in the at-rest pose (hands resting apart).{s.get('keep','')}")
def block(t): return "```\n" + t.strip() + "\n```\n"
out = [f"# {s['title']}: every pose, and the prompts\n", s['intro'].strip() + "\n",
       "| # | Pose | Tag |\n|---|---|---|"]
for code, pose, tag in s['table']:
    out.append(f"| {code} | {pose} | {tag} |")
out.append("\n## Prompts\n")
out.append(s['howto'].strip() + "\n")
out.append("### Character sheet\n")
out.append(block(s['character']))
for i, k in enumerate('ABCD'):
    poses = s['sheets'][k]
    intro = sheet_intro(True if i == 0 else False)
    body = "\n".join(f"{n+1}. {p}" for n, p in enumerate(poses))
    tail = ("Cards have plain dark backs. " if k != 'C' else "") + "Pure white background around each pose; poses do not touch. No text, no numbers, no labels. " + NO
    out.append(f"### Pose sheet {k}\n")
    out.append(block(intro + "\n\n" + body + "\n\n" + tail))
out.append("### Face overlay sheet\n")
out.append(block(s['face']))
open(sys.argv[2], 'w').write("\n".join(out))
