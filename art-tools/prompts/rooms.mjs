// Generates ROOM-ART-PROMPTS.md: the backdrop, the table, the chairs and the
// moving pieces for every venue. The room text comes from data/tables; the
// art notes below are written for the art.
// Run: node art-tools/prompts/rooms.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
// Paths below are relative to the repo root, wherever this is run from.
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..'));
const T = Object.fromEntries(fs.readdirSync('data/tables').map(f => [f.replace('.json', ''), JSON.parse(fs.readFileSync('data/tables/' + f))]));

const LOOK = 'Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal.';
const PLATE = 'A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama, eye level of someone seated at a card table. Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. The MIDDLE of the room is EMPTY floor: no desk, no table, no chairs, no furniture of any kind, because the round card table and the players go there. Keep the centre band, where the players\' heads will sit, calmer and a little darker than the edges: the brightest light (windows, fire, lamps) goes to the sides and up high, never directly behind the centre, so faces read against it. Slightly softer and less saturated than the characters will be, so they stand out.';
const TABLE = 'The WHOLE card table alone, seen from a little above, at the angle of a seated player looking across it, so the round top is a wide ellipse: the far rim runs across the picture and the sides curve down toward the viewer. Draw it whole, near rim included: the game scales it up and lets the near half fall below the screen. The playing surface is plain and even enough for cards and chips to read on it: no pattern under the middle. Pure white background (#FFFFFF), NOT a checkerboard or a fake transparent pattern. Closed dark outline. No people, no cards, no chips, no text.';
const PIECES = 'Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.';

const ROOMS = {
  white_house: {
    done: 'Done: backdrop and table in \`art-tools/rooms/white_house/\`, with a screen mock-up. The Washington Monument sits dead centre in the window, which Death covers; fine.',
    short: 'Classic poker table: leather rim, brass studs, mahogany',
    cloth: 'green baize',
    unique: 'The only room that looks like a real place you could visit. Green baize, brass and a fire: the classic poker table, the baseline every other room departs from.',
    table: 'A classic round poker table: deep green baize, a padded rim in dark red-brown leather edged with brass studs, a polished mahogany apron',
    backdrop: 'The oval drawing room upstairs in the President\'s house: curved walls in cream and gold, tall sash windows with heavy curtains drawn and rain on the glass, a fire under a white marble mantel with a clock on it, brass lamps, cigar smoke gathering under a high white ceiling. Four gilt-framed portraits on the walls, one of each player (Washington, Lincoln, Theodore Roosevelt, FDR), painted in the game\'s own cartoon style. The windows at the back look toward the Washington Monument at night, with rain on the glass and the curtains half drawn',
    light: 'Warm lamplight and firelight, gold and amber',
    chair: 'A dark mahogany armchair upholstered in deep green, brass nails',
    moving: ['Fire in the grate: 3 flame frames', 'Rain running down a window pane: 2 frames', 'The mantel clock\'s pendulum', 'A curl of cigar smoke, 3 sizes'],
    presence: [],
    avoid: 'No presidential seal, eagle crest, presidential flag or any government insignia: US law restricts the use of the seal, and the presidential flag carries it. An American flag is fine. It is NOT the Oval Office: no Resolute desk, no desk at all. No real White House photographs copied.',
  },
  athens: {
    short: 'Low marble table, Greek-key border, lion legs',
    cloth: 'terracotta red',
    unique: 'Couches, oil lamps and wine instead of a card room: the table is low and round among dining couches, and one couch is kept for a guest who has not come.',
    table: 'A low, round Greek table: a marble top with a band of black Greek-key pattern round the rim, the playing surface a terracotta-red cloth, on three carved lion\'s legs',
    backdrop: 'The men\'s dining room of a rich Athenian house at night: walls of painted plaster in red and ochre panels, dining couches with cushions round the walls, bronze oil lamps on stands, a great painted mixing bowl for wine standing on the floor at the back, a doorway open onto a courtyard under the stars. One couch at the side is empty, with a full cup set before it',
    light: 'Oil-lamp gold, warm and low, with blue night in the doorway',
    chair: 'A backless stool with a cushion, or the end of a dining couch: low, with a folded cloth',
    moving: ['Oil lamp flames: 3 frames', 'A ladle dipping in the mixing bowl', 'Stars twinkling in the doorway'],
    presence: ['The empty couch with its full cup, as a separate piece (it stays until Odysseus arrives)'],
    avoid: 'Nothing from Disney\'s Hercules or the film 300.',
  },
  pirate_cove: {
    short: 'Lid of a rum tun, iron hoop, rope rim',
    cloth: 'weathered sailcloth',
    unique: 'The rowdiest room: a tavern half cut into the rock and half the stern of a wrecked ship, with the sea right outside. The table is the round lid of a rum tun.',
    table: 'A round table made from the lid of a huge rum tun: thick dark planks bound with an iron hoop, scarred by knife-points and burned by pipes, a coil of tarred rope round the rim. The playing surface is weathered sailcloth stretched over the planks',
    backdrop: 'A tavern built into the rock of a hidden cove at night: rough rock walls on one side, the timbered stern of a wrecked ship with its gallery windows on the other, lanterns swinging from old rigging overhead, barrels and nets. One wall is open to the moonlit cove, where two ships ride at anchor',
    light: 'Lantern orange inside, cool moonlight blue through the open wall',
    chair: 'A barrel with a plank back, or a battered captain\'s chair',
    moving: ['Lanterns swinging: 3 frames', 'Moonlight glinting on the water: 2 frames', 'A ship at anchor rocking', 'A gull on the rigging, 2 poses'],
    presence: [],
    avoid: 'Nothing from Disney\'s Pirates of the Caribbean: no Black Pearl, no tentacled crew, no Jolly Roger from the films.',
  },
  camelot: {
    short: 'One curve of the Round Table, knights\' names on the rim',
    cloth: 'dark green, on green-and-cream painted oak',
    unique: 'THE Round Table: so big that the game uses one curve of it, and the rest of its circle runs off into the dark past a hundred empty chairs.',
    table: 'One curve of an enormous round oak table: far bigger than the others, so its edge curves gently. The top is painted in green and cream segments radiating from the centre, like the medieval round table at Winchester, and before each seat a knight\'s name is painted in gold on the rim. The playing area in front of the seats is plain dark green',
    backdrop: 'The great hall at Camelot: stone walls, heavy timber roof beams hung with long heraldic banners, rushes on the floor, a hearth big enough to stable a horse, tall narrow windows with night outside. The rest of the Round Table\'s circle curves away into the darkness behind the players, lined with high-backed chairs, empty, each with a name in gold',
    light: 'Firelight gold, with cool stone shadow',
    chair: 'A tall, high-backed oak chair with a knight\'s name in gold on the top rail',
    moving: ['The great hearth fire: 3 frames', 'A banner stirring in the draught: 2 frames', 'Candle flames: 3 frames'],
    presence: [],
    avoid: 'Nothing from Disney\'s The Sword in the Stone, Monty Python, or the A24 Green Knight film.',
  },
  rome: {
    short: 'Porphyry top, gold mosaic border',
    cloth: 'imperial purple',
    unique: 'Three eras stacked in one room: ancient brick below, Renaissance frescoes above, and a chain to the dog\'s chair. The richest table: imperial purple and gold.',
    table: 'A round table with a top of dark red porphyry stone and a border of small gold mosaic tiles, the playing surface in imperial purple cloth',
    backdrop: 'A high hall inside Castel Sant\'Angelo in Rome: rough ancient Roman brick in the lower walls, bright Renaissance frescoes of clouds and allegorical figures on the vaulted ceiling above, iron braziers burning, a window onto the city at dusk. A heavy iron chain runs from a ring in the wall toward one of the seats. By the door, a laurel wreath waits on a red cushion',
    light: 'Brazier orange and fresco colour above, dusky violet through the window',
    chair: 'A folding bronze Roman chair with a cushion; for Cerberus, a massive stone bench',
    moving: ['Brazier flames: 3 frames', 'The iron chain, slack and pulled taut', 'Smoke rising from a brazier'],
    presence: ['The laurel wreath on its cushion by the door, as a separate piece (it goes when Caesar arrives)'],
    avoid: 'Nothing from the film Gladiator or the television series Rome or The Borgias.',
  },
  baker_street: {
    short: 'Walnut Victorian loo table',
    cloth: 'green baize, a little worn',
    unique: 'The most cluttered and lived-in room: a Victorian sitting room full of evidence. The table is a round walnut loo table, the card table of the period.',
    table: 'A round Victorian loo table in walnut on a single carved pedestal, the playing surface green baize, a little worn',
    backdrop: 'The first-floor sitting room at 221B Baker Street, as Watson described it: a chemistry table covered in acid-stained flasks shoved against the wall, letters stuck to the mantelpiece with a jack-knife, the letters V R picked out in bullet holes on the wallpaper, gas lamps, a coal fire, a violin case, a Persian slipper, and a bow window with yellow London fog pressing against the glass. Holmes\'s armchair by the fire',
    light: 'Gaslight yellow and firelight, fog-grey at the window',
    chair: 'A buttoned leather armchair, and plain Victorian dining chairs',
    moving: ['Coal fire: 3 frames', 'Fog drifting past the window: 2 frames', 'Gas lamp flame flicker'],
    presence: [],
    avoid: 'Nothing from the BBC Sherlock, the Guy Ritchie films or Elementary: no smiley face in bullet holes, no modern flat.',
  },
  transylvania: {
    short: 'Black oak, iron-banded rim',
    cloth: 'blood red',
    unique: 'The only room where the champion is visible before he plays: Dracula sits watching from a high-backed chair beside the fire until two chairs empty.',
    table: 'A round table of black oak with an iron band round the rim, the playing surface in deep blood-red cloth',
    backdrop: 'The great hall of Castle Dracula at night: bare grey stone, black oak beams, a hearth big enough to stand in with one high-backed chair beside it, tall arched windows onto the moonlit Carpathian mountains with far too much moon, iron candelabra, dust. No mirrors anywhere',
    light: 'Firelight red-orange against cold blue moonlight',
    chair: 'A tall, carved black-oak chair',
    moving: ['The hearth fire in 2 states: roaring (3 frames) and sunk to embers (2 frames)', 'Candle flames: 3 frames', 'Clouds crossing the moon: 2 frames', 'A bat crossing a window'],
    presence: ['The high-backed chair by the fire, empty', 'The same chair with a dark, still figure seated in it, watching (Dracula in silhouette, only his eyes catching the firelight): it goes when he sits at the table'],
    avoid: 'Nothing from Universal\'s or Hammer\'s Dracula films, no Bela Lugosi, no Castlevania.',
  },
  station: {
    short: 'Steel rim with a light strip, bolted down',
    cloth: 'deep blue',
    unique: 'The only room with no fire: cool steel, soft lamps and the whole Earth in the window. The room itself is a player, as a pale lens in the ceiling.',
    table: 'A round table bolted to the floor on a single steel column: brushed-steel rim with a soft light strip under its lip, the playing surface deep blue felt',
    backdrop: 'A round lounge on a slowly turning space station: brushed steel and white panels, soft lamps, and one enormous curved window filling the back wall with the Earth, blue and white against black space. In the ceiling above the table, a single round lens: a brass-rimmed iris of overlapping blades with a pale white light behind it',
    light: 'Cool white lamplight and blue Earthlight; after the turn, dim amber emergency light (never red)',
    chair: 'A padded swivel chair on a steel column, with a lap belt',
    moving: ['The Earth, as a separate plate that turns slowly', 'Stars', 'The ceiling lens in 3 apertures', 'A single poker chip floating an inch above the felt'],
    presence: ['An amber emergency-lighting overlay for after the turn, as a flat tint'],
    avoid: 'No NASA or agency insignia, no flags. Nothing from 2001: A Space Odyssey: no red eye, no HAL.',
  },
  champions: {
    short: 'Black stone, a panel for each room on the rim',
    cloth: 'charcoal',
    unique: 'One hall for both champions\' tables: eight tall doors round a round hall, each spilling its own room\'s light. Which four stand open changes between the two tables.',
    table: 'A round table of black stone, its rim inlaid with eight small panels, one for each room: a presidential portrait frame, a Greek key, a ship\'s wheel, a knight\'s shield, a laurel, a violin, a bat, a star. Playing surface in dark charcoal felt',
    backdrop: 'A round hall whose ceiling is lost in darkness, floored in polished black stone, with eight tall doors set round its wall. Draw every door CLOSED in this plate. Between the first and the eighth, a ninth door, small, plain and shut',
    light: 'Dark, lit only by what the open doors let in',
    chair: 'A plain, high-backed black chair',
    moving: [],
    presence: ['Each of the eight doors OPEN, as separate pieces, each spilling its own room\'s light: gold firelight (White House), oil-lamp gold (Athens), moonlit sea (Pirate Cove), great-hall firelight (Camelot), brazier orange (Rome), gaslight and fog (Baker Street), red firelight (Transylvania), blue Earthlight (the Station). The first table opens the first four; the second opens the last four'],
    avoid: '',
  },
  finale: {
    short: 'Small, bare, worn wood, one lamp',
    cloth: 'none: bare wood',
    unique: 'The smallest room: no gold, no crowd, one lamp, one small round table and two chairs. Death sits across from you, front-on, for the first time as a player.',
    table: 'A small round table of bare, worn, unpainted wood, no cloth, no felt, a single oil lamp standing on it',
    backdrop: 'A plank-walled dock house on the bank of a wide black river, at night, in a storm. Keep it lighter than his black robe so Death reads against it: warm lantern light from the dock outside the windows, and the planks lit amber, not black: rain running down the windows, a coil of rope, a boat hook on the wall, a door that never quite shuts. Through the window, far out on the water, a ferryman\'s lantern moving away from the shore with a figure aboard',
    light: 'One oil lamp, warm and small, against storm-dark blue',
    chair: 'A plain wooden chair',
    moving: ['The oil lamp flame: 3 frames, one guttering', 'Rain on the window: 2 frames', 'The ferryman\'s lantern and boat, small, drifting across the window', 'The door, shut and open a crack'],
    presence: [],
    avoid: 'Nothing from Pratchett\'s Discworld, Bergman\'s The Seventh Seal or Gaiman\'s Sandman.',
  },
};

const order = ['white_house', 'athens', 'pirate_cove', 'camelot', 'rome', 'baker_street', 'transylvania', 'station', 'champions', 'finale'];
const block = s => '```\n' + s.trim() + '\n```\n\n';
let out = `# Room and table art prompts

The backdrop, the table, the chairs and the moving pieces for every venue, to go with \`CHARACTER-ART-PROMPTS.md\`. The room descriptions come from \`data/tables/*.json\` (\`room\`, \`presence\`, \`ambience\`); the art notes are written for the art (\`art-tools/prompts/rooms.mjs\`, which regenerates this file). Same bright cartoon style as the characters.

## How a room is built

Every room is the same stack of layers, back to front:

1. **Backdrop plate:** the room itself, wide (21:9) so it fills any phone in landscape. Big features go high and at the sides. The band behind the players' heads stays calmer, so faces read. Death deals from the far side, dead centre, so the backdrop directly behind him is the calmest part of all.
2. **Room pieces that come and go** (the "presence"): the empty couch at Athens, the laurel wreath at Rome, Dracula watching from beside the fire. They are separate so they can leave when the story says.
3. **Chairs:** one chair back per room, drawn once at three-quarter view and mirrored, like the characters. It goes behind each seated character.
4. **The characters** (see \`CHARACTER-ART-PROMPTS.md\`).
5. **The table:** a round top seen from the player's seat, so it's a wide ellipse. You are sitting at it: the game scales the table up so its near half falls below the bottom of the screen, the felt fills the lower part of the picture, and the far rim crosses the screen a little below the middle. The far rim runs in front of the dealer and the far seats, and the sides curve down toward you, which is why a character in a side seat is cut lower than one at the back. The table hides every torso below its edge.
6. **Forearms, hands and props on the felt**, then the cards and chips (the game draws those).
7. **Moving pieces:** fire, lamp flames, rain, the Earth. A few frames each, looped: the room breathes, as the characters do.

**What makes each room its own:** the table (material, rim, cloth colour), the backdrop, and the light. Every table keeps a plain, even playing surface so cards and chips read on it; the character goes into the rim and the cloth colour.

**Leave out of every room:** no text, no UI, no buttons, no chips or cards, no chat or reward panels. The table mock-ups had all of these; the game draws its own few controls.

## The screen: game first

The table screen has to hold four opponents, Death dealing between them, and the whole game, on a phone. The game comes first; the backdrop is what's left over.

- **Laid out for 16:9**, the narrowest phone we support. Wider phones show more backdrop at the sides and nothing else changes, so every room plate is drawn wide (21:9) with nothing important at the far edges.
- **Top half: five figures.** Death is dead centre, front-on and furthest away. The two back seats flank him, and the two side seats sit nearer and lower, where the rim curves toward you. Each figure gets about a fifth of the screen's width, so a face is about a tenth of its height: roughly 40 points on a small phone. **Tells have to read at that size:** props, hands, the head and the hat, the big shapes the character notes already ask for. Fine facial detail is a bonus, never the tell.
- **Bottom half: the felt, which carries the game.** The far rim runs at about half height. Below it:
  - each seat's name plate, on the rim just below them, with their bet in front of it;
  - the pot and the board in the middle;
  - your cards at the bottom centre, with your name and stack beside them;
  - the buttons at the bottom right (the raise slider opens above them), fast-forward at the bottom left;
  - the table bar at the top left, the log at the top right.
- **What shows of the backdrop** is the band above the players' heads and the strips at the sides; the rest is behind five players and the table. Put the room's character there: portraits, windows, the fire.

\`art-tools/mock_screen.py\` draws this screen with the current art (\`python3 art-tools/mock_screen.py white_house\`), so any new backdrop, table or character can be checked against the game before it's accepted. The first room is in \`art-tools/rooms/white_house/\`: backdrop, table, and \`screen_mock.png\`.

## At a glance

| Room | Table | Cloth | Light |
|---|---|---|---|
${order.map(id => { const r = ROOMS[id]; const name = id === 'champions' ? "The Champions' Tables (the Hall of Doors)" : T[id].name; return `| ${name} | ${r.short} | ${r.cloth} | ${r.light} |`; }).join('\n')}

`;
for (const id of order) {
  const r = ROOMS[id];
  const t = id === 'champions' ? T.champions_1 : T[id];
  const name = id === 'champions' ? "The Champions' Tables — the Hall of Doors" : t.name;
  out += `---\n\n## ${name}\n\n`;
  out += `**What makes it unique:** ${r.unique}\n\n`;
  if (r.done) out += `**Status:** ${r.done}\n\n`;
  if (id === 'champions') out += `- **The room (table I):** ${T.champions_1.room}\n- **The room (table II):** ${T.champions_2.room}\n`;
  else out += `- **The room:** ${t.room}\n`;
  if (t.presence) out += `- **Presence:** ${t.presence}\n`;
  const amb = id === 'champions' ? [...new Set([...T.champions_1.ambience, ...T.champions_2.ambience])] : t.ambience;
  if (amb?.length) out += `- **Sounds (for reference):** ${amb.join('; ')}\n`;
  out += `- **The table:** ${r.table}.\n- **Light:** ${r.light}.\n- **Chairs:** ${r.chair}.\n`;
  if (r.avoid) out += `- **Avoid:** ${r.avoid}\n`;
  out += `\n**Backdrop plate:**\n\n` + block(`${LOOK} ${PLATE}\n\nThe room: ${r.backdrop}.\nLight: ${r.light}.${r.avoid ? '\nMust NOT resemble: ' + r.avoid : ''}`);
  out += `**Table and chair:**\n\n` + block(`${LOOK} ${TABLE}\n\nThe table: ${r.table}.\nAlso, as a separate piece with a wide gap round it: one chair, empty, three-quarter view turned toward the viewer's right, seen from the same eye level: ${r.chair}. Only the part above the table top matters; draw it whole anyway.\nLight: ${r.light}.`);
  const pieces = [...r.presence, ...r.moving];
  if (pieces.length) out += `**Moving and story pieces:**\n\n` + block(`${LOOK} ${PIECES}\n\nFor the room: ${name}. Parts:\n${pieces.map(p => '- ' + p).join('\n')}\n\nSoft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.`);
}
fs.writeFileSync('ROOM-ART-PROMPTS.md', out);
console.log('rooms', order.length);
