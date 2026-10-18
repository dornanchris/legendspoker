// Generates CHARACTER-ART-PROMPTS.md from data/characters and parts.mjs.
// Run: node art-tools/prompts/characters.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
// Paths below are relative to the repo root, wherever this is run from.
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..'));
import { PARTS } from './parts.mjs';
const order=['white_house','athens','pirate_cove','camelot','rome','baker_street','transylvania','station'];
const tables=Object.fromEntries(fs.readdirSync('data/tables').map(f=>[f.replace('.json',''),JSON.parse(fs.readFileSync('data/tables/'+f))]));
const chars=fs.readdirSync('data/characters').map(f=>JSON.parse(fs.readFileSync('data/characters/'+f)));
const LOOK='Bright, warm cartoon style like a modern animated adventure game: bold dark outlines, clean painted shading, slightly exaggerated but dignified features, warm table-lamp light. NOT dark, gritty or photoreal. Human characters keep human, dignified faces: caricature what the history records, never anything animal-like.';
const SEAT={three:'Waist-up, seated at a round poker table, body and head turned about 30 degrees to the viewer\'s right, as if facing the table\'s centre from a seat on its left; forearms resting on the felt; the table\'s rounded edge crosses the body at the waist.',
  front:'Waist-up, seated at the far side of a round poker table, facing the viewer; forearms resting on the felt; the table\'s rounded edge crosses the body at the waist.'};
const STYLE=(a='three')=>`${LOOK} ${SEAT[a]} Plain dark background, no text, no logos, no watermark, no cards or chips other than any prop named.`;
const RULES=(n,i,a='three')=>`Puppet parts sheet for 2D animation rigging, for ${n}, the character in the attached image${i?'s':''}. Match ${i?'them':'it'} exactly: same face, proportions, skin, lip and hair colours, line weight and painting style. Landscape 3:2. Pure white background (#FFFFFF). Every part is a separate piece with a closed dark outline, laid out in a loose grid with wide empty gaps: nothing touches or overlaps anything else. Flat, even lighting, no cast shadows, no text or labels, no table, no cards, no chips, and no smoke or glow unless it is listed as a part. Everything in the same ${a==='front'?'front-on':'three-quarter'} view as the reference${a==='front'?'':' (turned toward the viewer\'s right)'}, at the same scale. Draw ONLY the parts listed: no extra views, no finished heads, no turnarounds. One sheet per image: no collage, no frames or borders.`;
const EXPR=(n,heads,avoid,keep,handsExtra='and one that suits him')=>`Character sheet for 2D animation rigging: ${n}. Attach two images: his own parts sheet (match it exactly: face, hair, clothes, colours, line weight and the flat cartoon style) and Lincoln's sheet (copy only its layout and its head angle).

Keep every piece of his clothing exactly as on his own sheet: the same garments, colours, collar and buttons${keep?`, and above all ${keep}`:''}. Do not simplify or swap them.

Pure white background (#FFFFFF). Every piece separate, with a closed dark outline and a wide gap all round it; nothing touches or overlaps. A prop in the mouth or hand stays inside its own piece's space: it must not reach into the next head. Draw only the props this prompt names: nothing carried over from other characters' sheets (no cigarette holders, cigars, canes or glasses unless named). No text, no labels, no frames, no cast shadows.

The angle: a gentle three-quarter view, turned about 25 degrees from front-on, the same as the heads on the Lincoln sheet. Both eyes, the whole nose, the mouth and both shoulders clearly visible. NOT profile, NOT near-profile.

Draw two matching sets, one facing the viewer's right and its mirror image facing the viewer's left, as the Lincoln sheet does. For each set:
- Finished heads, each with its neck and the top of its collar, all at the same size and angle: ${heads}
- One torso at the same angle, in all his clothes: no head, cut off straight below the waist, the upper arms hanging at the sides down to the elbows; NO forearms, NO hands
- Straight forearms, each a plain tube of sleeve at the same scale as the torso: open at the elbow end, the shirt cuff at the wrist end; NO hand in them
- Hands at the same scale, each with its cuff and a short stub of sleeve: resting on the table, fingers curled; resting flat; holding two cards (plain backs); ${handsExtra}
- A row of reference poses, NOT parts: the whole character seated at a round poker table, waist up, forearms resting along the table's edge in front of the body, hands meeting in front (hands folded; holding cards; one hand resting and one gesturing). The puppet is assembled to match these

Must NOT resemble: ${avoid}`;
const SHEETS=[['face','Sheet 1 — Face kit'],['body','Sheet 2 — Body and arms'],['card','Sheet 3 — Card-action hands'],['own','Sheet 4 — Character hands'],['props','Sheet 5 — Props and tell pieces']];
let out=`# Character art prompts

Every character in the game, grouped by table. The descriptions come from \`data/characters/*.json\`; the parts lists are written from each character's look, prop, tells and idles, so every tell and idle the game shows has a piece to animate it. Regenerate with \`node art-tools/prompts/characters.mjs\` (the parts lists live in \`art-tools/prompts/parts.mjs\`).

**The rooms, tables, chairs and backdrops are in \`ROOM-ART-PROMPTS.md\`.**

## Status

The pipeline is proven (cut, label, lay out a puppet), and **Lincoln is the model**: \`art-tools/lincoln_parts/\`, three-quarter, facing the table's centre, in the flat cartoon style with bold outlines the owner picked. Every other character is to be drawn to match him. Death (\`art-tools/death_parts/\`) is done, front-on as the dealer. **The White House table is done**: Lincoln, FDR, Roosevelt and Washington, each built by \`art-tools/seat_puppet.py\` from a \`seat.json\`. All four are built from rigging sheets in one layout (the prompt under each, below): three-quarter heads facing both ways, a row of seated reference poses, forearms drawn as plain tubes, hands with cuffs. Their arms rest along the table's edge with the hands together in front, and Lincoln can tip his hat. Use the same prompt, and Lincoln's sheet as the layout model, for every character from here on. Attach Lincoln's sheet (\`art-tools/lincoln_parts/sources/lincoln_sheet.png\`) as the layout to copy, so the next sheets draw their finished heads three-quarter, facing both ways, as his does. Dracula's parts are in an older style.

## The table, the seats and the layers

- **Style:** the bright cartoon look of the FDR and Lincoln tests (bold outlines, warm painted shading), not the dark, gritty look of the table mock-ups.
- **Waist up, at a round table.** We see everyone from the table up: no knees, legs or feet are ever on screen, so props live on the felt, in the hands or on the body. The torso is still drawn down to the lap, because the table's curved edge crosses each seat at a different height and has to cover it.
- **One seat angle: three-quarter.** Every opponent sits around the table facing its centre, so each character is drawn once, turned about 30 degrees to the viewer's right (a seat on the table's left), and **mirrored** for seats on the right. Seats further back are the same puppet, smaller. Mirroring flips anything one-sided (a ring hand, a parrot's shoulder, a parting): fine, as long as it is the same in every piece. The exception is **Death**, the dealer, who sits at the far side facing us and is drawn front-on.
- **Near and far.** In three-quarter view the near eye, brow, arm and hand are bigger than the far ones, so sheets ask for both.
- **Layers, back to front:** far arm, torso, head (hair, face, hat), then the **table**, whose rounded edge hides everything below it, then the near forearm, the hands and anything on the felt. Hands and forearms resting on the table sit above the table layer; the lap and belly sit under it.

## How to use this

1. **Step 1 — the reference portrait.** Paste the character's Step 1 prompt into ChatGPT and regenerate until it's right. This image is the character's model sheet; every part is matched to it.
2. **Step 2 — the parts sheets, one per message.** Up to five: face kit, body and arms, card-action hands, character hands, props and tell pieces. Attach the approved portrait to every sheet, and from Sheet 2 on attach the finished face kit too: separate generations drift in colour (FDR's extra mouths came back redder than his first set).
3. **Save each sheet as its own image.** A collage of several sheets with frames round them is cut as one piece per frame.
4. **Check each sheet before moving on.** Every piece on pure white with a gap all round it; pieces that touch are cut as one piece, and a white piece without a dark outline (a cuff, a pinafore, a skull) is cut away with the background. Soft glows, halos, glints, smoke and shadow overlays can't be cut cleanly from white: they're listed so you know they're needed, and are easiest made in the rig as a blurred, tinted shape.
5. **Missing parts:** image generators drop items from long lists. Ask again with the same rules and ONLY the missing parts: *"Same rules as before. A new sheet with only these parts: …"*
6. **Cut it:** \`python3 art-tools/split_parts.py sheet.png -o art-tools/<id>_parts --name <id>_face\` (needs \`pip install pillow numpy scipy\`). It writes each piece as a PNG, a numbered contact sheet and \`parts.json\`; fill in each piece's \`label\`.
7. **Lay out the puppet:** copy another character's \`seat.json\` (e.g. \`art-tools/lincoln_parts/seat.json\`) into \`art-tools/<id>_parts/\`, put in the new piece numbers (torso, head, near and far arm and hand), and run \`python3 art-tools/seat_puppet.py art-tools/<id>_parts/seat.json\`. It trims the sleeves' cuffs, writes \`art-tools/<id>_layout.json\` and a \`preview.png\`; nudge the numbers in \`tune\` until it looks right. Pieces that share a \`slot\` are swaps for the same place; \`"flip": true\` mirrors a piece, which is how a whole character moves to a seat on the other side of the table.

## Why the prompts ask for what they do (learned on FDR and Lincoln)

- **Bald blank head, no collar.** His first blank head had the hair and a shirt collar painted on; the collar had to be cut off before the head would sit in the torso's collar.
- **Torso with an empty collar and no arms.** Arms painted onto the torso can't move.
- **Whole eyes.** Asked for separate whites, irises and lids, the generator drew whole eyes anyway, and whole-eye swaps work well. In three-quarter view the near and far eye differ, so both are drawn.
- **Brows in three clearly different shapes.** "Four poses" came back as nine near-identical brows. Raised is a move, not a drawing.
- **Mouths only, same colour.** Asked alone, mouths came back as lower-face patches with a nose and chin, which leave a seam over the head.
- **Hands keep their cuff and a stub of sleeve.** FDR's first puppet had the cuffs cut off and bare hands set at the forearm's sleeve opening: they looked stuck on. The artist's own cuff-to-wrist join, laid over the end of the forearm, looks right. Hands are drawn once and mirrored, and the eight card actions get a sheet of their own: eight poses came back complete, a longer list lost some.
- **Clear lenses.** The pince-nez came back with solid grey lenses that hid his eyes.
- **Dignified faces.** Lincoln's first face kit read as apelike (heavy brow, wide nose, big ears). The style line now says human faces stay human, and his art note spells out what to avoid.

If a sheet comes back with one of these anyway, send it over: a colour match, a collar removal or a see-through lens is quicker to fix than to regenerate.

Shared style line for Step 1 (keep it identical for every character):

> ${STYLE()}

`;
const groups=[...order.map(t=>[tables[t].name,chars.filter(c=>c.table===t)]),['Hidden guest (spoiler — keep out of anything public)',chars.filter(c=>c.role==='guest')],['The dealer',chars.filter(c=>c.role==='dealer')]];
const seen=new Set();
const block=s=>'```\n'+s.trim()+'\n```\n\n';
for(const [name,list] of groups){ if(!list.length) continue;
 out+=`---\n\n## ${name}\n\n`;
 list.sort((a,b)=>(a.role==='champion')-(b.role==='champion'));
 for(const c of list){ seen.add(c.id); const p=c.profile, k=PARTS[c.id];
  if(!k) throw new Error('no parts for '+c.id);
  const avoid=(p.public_domain||'').trim();
  out+=`### ${c.name} — *${c.epithet}*${c.role==='champion'?' (champion)':''}\n\n`;
  out+=`- **Who:** ${p.ledger}\n- **Look:** ${p.look}\n- **Prop:** ${p.prop}\n- **Tells:** ${c.tells.length?c.tells.map(t=>t.text).join('; '):'none, by design'}\n- **Idles:** ${c.idles.length?c.idles.join('; '):'none'}\n- **Copyright note:** ${avoid}\n`;
  if(k.note) out+=`- **Art note:** ${k.note}\n`;
  out+='\n**Step 1 — reference portrait:**\n\n'+block(k.portrait??`${STYLE(k.angle)}\n\nCharacter: ${c.name}, ${c.epithet}. ${p.look}\nProp: ${p.prop}.\nIMPORTANT, must NOT resemble: ${avoid}`);
  if(k.expressions) out+='**Three-quarter expression sheet** (attach his parts sheet and \`art-tools/lincoln_parts/sources/lincoln_sheet.png\`):\n\n'+(k.exprNote?k.exprNote+'\n\n':'')+block(EXPR(c.name,k.expressions,avoid,k.keep,k.handsExtra));
  let sheetNo=0;
  for(let [key,title] of SHEETS){ if(key==='face'&&k.faceTitle) title=k.faceTitle; const items=(key==='card'||key==='own')?(k.hands?k.hands[key]:null):k[key]; if(!items||!items.length) continue;
   sheetNo++; title=title.replace(/Sheet \d+/,'Sheet '+sheetNo);
   out+=`**Step 2, ${title}:**\n\n`+block(`${RULES(c.name,sheetNo>1,k.angle)}\n\nThis sheet: ${title.split('— ')[1].toLowerCase()}. Parts:\n${items.map(i=>'- '+i).join('\n')}${k.note?'\n\nNote: '+k.note:''}\n\nMust NOT resemble: ${avoid}`);
  }
 }}
const missing=chars.filter(c=>!seen.has(c.id)).map(c=>c.id); if(missing.length) throw new Error('missing '+missing);
fs.writeFileSync('CHARACTER-ART-PROMPTS.md',out);
console.log(chars.length,'characters');
