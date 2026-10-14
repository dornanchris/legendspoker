// Generates ROOM-ART-PROMPTS.md: the backdrop and the moving and story
// pieces for every venue (the table is the same in every room). The room text comes from data/tables; the
// art notes below are written for the art.
// Run: node art-tools/prompts/rooms.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
// Paths below are relative to the repo root, wherever this is run from.
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..'));
const T = Object.fromEntries(fs.readdirSync('data/tables').map(f => [f.replace('.json', ''), JSON.parse(fs.readFileSync('data/tables/' + f))]));

const LOOK = 'Bright, warm cartoon style like a modern animated adventure game, matching the character art: bold dark outlines, clean painted shading, warm light. NOT dark, gritty or photoreal.';
const PLATE = 'A background plate for a poker game played in landscape on a phone. Wide 21:9 panorama (about 2.33 to 1). Draw the ROOM ONLY: no people, no cards, no chips, no text, no UI, no logos. Match ONLY the CAMERA of the attached White House backdrop: the same eye level, the same scale of furniture, and the line where the back wall meets the floor about two-thirds of the way down. Take NOTHING else from it: none of its curtains, windows, portraits, fireplace, lamps or furniture. The MIDDLE of the room is EMPTY floor: no table, no chairs, no furniture there, because the card table and the players go there. The card table will cover everything below the middle of the picture, so anything that matters stands at or above half height. Five figures will sit across the middle band, at about 19%, 34%, 50%, 66% and 80% of the width, heads about a quarter to a third of the way down: the wall behind each head is calm and plain, so faces read against it. The room shows in the top quarter, in the gaps between them (about 27%, 42%, 58% and 73% across) and at the far sides. Dead centre is behind the dealer, who wears a black hooded robe: keep it calm and mid-toned there, never black and never the brightest thing in the room. The brightest light (fire, lamps, windows) goes to the sides and up high. Slightly softer and less saturated than the characters will be, so they stand out.';
const PIECES = 'Loose pieces for animating the room, each a separate piece with a closed dark outline on a pure white background (#FFFFFF), laid out with wide gaps, nothing touching. Flat, even lighting, no text.';

const ROOMS = {
  white_house: {
    done: 'Done: backdrop and table in \`art-tools/rooms/white_house/\`, with a screen mock-up. The Washington Monument sits dead centre in the window, which Death covers; fine.',
    unique: 'The only room that looks like a real place you could visit: lamplight, portraits and rain on the windows, the baseline every other room departs from.',
    backdrop: 'The oval drawing room upstairs in the President\'s house: curved walls in cream and gold, tall sash windows with heavy curtains drawn and rain on the glass, a fire under a white marble mantel, brass lamps, cigar smoke gathering under a high white ceiling. Four gilt-framed portraits on the walls, one of each player (Washington, Lincoln, Theodore Roosevelt, FDR), painted in the game\'s own cartoon style. The windows at the back look toward the Washington Monument at night, with rain on the glass and the curtains half drawn',
    light: 'Warm lamplight and firelight, gold and amber',
    moving: ['Fire in the grate: 3 flame frames', 'Rain running down a window pane: 2 frames', 'A curl of cigar smoke, 3 sizes'],
    presence: [],
    avoid: 'No presidential seal, eagle crest, presidential flag or any government insignia: US law restricts the use of the seal, and the presidential flag carries it. An American flag is fine. It is NOT the Oval Office: no Resolute desk, no desk at all. No real White House photographs copied.',
  },
  athens: {
    done: 'Done: backdrop and pieces in \`art-tools/rooms/athens/\` (\`pieces.json\` places them). The empty couch and its stand came out behind seat 2, so the cup piece stands by the doorway\'s left pillar instead; the lamp flames flicker. The star and ladle frames are not used yet.',
    unique: 'Couches, oil lamps and wine instead of a card room: a dining room after the meal, and one couch kept for a guest who has not come, his cup poured.',
    backdrop: 'The men\'s dining room (the andron) of a rich Athenian house at night: walls of painted plaster in panels of red and ochre with a black band along the bottom and a Greek-key frieze up high, a beamed ceiling, tall bronze oil lamps on stands at the sides. Dining couches with striped cushions stand along the side walls, their high curved head-ends showing. Dead centre at the back, a wide doorway open onto a courtyard under the stars, its far wall pale in the moonlight, so a dark figure in front of it still reads. To the right of the doorway, a great red-figure mixing bowl for wine on a stone pedestal, its rim at about half height, a ladle in it. To the left of the doorway, against the back wall, ONE couch on a low step, empty, its cushions plumped and unused, its head-end at about half height, and beside it a slender bronze stand as tall as the couch\'s head-end, its small round top EMPTY',
    light: 'Oil-lamp gold, warm and low, with blue night in the doorway',
    moving: ['Oil lamp flames: 3 frames', 'A ladle dipping in the mixing bowl', 'Stars twinkling in the doorway'],
    presence: ['The slender bronze stand from beside the empty couch, as tall as the couch\'s head-end, with a shallow two-handled wine cup on its top, FULL to the brim (it stands there until Odysseus arrives)', 'The same stand and cup, the cup drained and set down crooked, a few drops spilled (after he has arrived)'],
    avoid: 'Nothing from Disney\'s Hercules or the film 300.',
  },
  pirate_cove: {
    done: 'Done: backdrop and pieces in \`art-tools/rooms/pirate_cove/\` (\`pieces.json\` places them): the lantern flames flicker, the moonlight glints on the water either side of Death, and a gull shifts on the rigging.',
    unique: 'The rowdiest room: a tavern half cut into the rock and half the stern of a wrecked ship, with the sea right outside.',
    backdrop: 'A smugglers\' tavern built into the rock of a hidden cove at night. Dead centre at the back, a wide, rough-edged opening in the rock onto the cove: moonlit water, a pale blue night sky with a few clouds lit silver, and two old sailing ships riding at anchor, small and far off, so a dark figure in front of it still reads; the moon itself high up and to the right of the opening, never dead centre. The LEFT side of the room is the timbered stern of a wrecked ship built into the tavern: dark planks, a row of small gallery windows glowing warm, a carved rail. The RIGHT side is rough grey-brown rock wall, damp, with a heavy wooden door in it. Old rigging and nets hang overhead across the top of the picture, with three ship\'s lanterns hanging from it: one high on the left, one high on the right, one in the top middle above the opening, each a clear glass-and-iron lantern with a bright flame. Barrels, a coil of rope and a ship\'s wheel stand against the side walls, their tops at about half height. No flags, no skulls',
    light: 'Lantern orange inside, cool moonlight blue through the opening in the rock',
    moving: ['The flame inside one ship\'s lantern, drawn alone at the size it is in the backdrop: 3 frames, each a slightly different flicker', 'A seagull perched on a rope, 2 poses (head up; head turned), drawn at the size it would be on the rigging', 'Moonlight glinting on the water: 3 small clusters of silver sparkles, each alone'],
    presence: [],
    avoid: 'Nothing from Disney\'s Pirates of the Caribbean: no Black Pearl, no tentacled crew, no Jolly Roger or any skull-and-crossbones flag.',
  },
  camelot: {
    done: 'Done: backdrop and pieces in \`art-tools/rooms/camelot/\` (\`pieces.json\` places them): the candle flames on both candle wheels and the wall sconces flicker, and the hearth fire and its sparks at the far left (shown only on screens wider than 16:9). The sheet drew each hearth frame as a whole fireplace and each flame on its candle, so the fire is cut out by brightness and the flames above the wax. The Round Table came out lower than asked, behind Death\'s table, so it barely shows; the banners carry the room.',
    unique: 'The hall of the Round Table: the great table itself stands beyond the players, its circle running off into the dark past a hundred empty chairs, while the game is played at Death\'s table set before it.',
    backdrop: 'The great hall at Camelot at night, on a feast day. Grey dressed-stone walls, heavy dark timber roof beams high overhead, and long heraldic banners hanging from them across the top of the picture: plain bold devices (a red dragon, a gold lion, a white hart, a green bough) on blue, red and gold cloth, no lettering. Across the back of the hall, far behind the players, the great Round Table, far bigger than a card table: its far edge curves across the room at about 45% of the height and runs off into darkness at both sides, lined with tall, high-backed oak chairs, all empty, each back carved with a name in gold (the names too small to read). The chair backs show in the gaps between the players (about 27%, 42%, 58% and 73% across) and fade into shadow toward the sides. Dead centre behind the dealer: plain grey stone and the empty backs of two chairs, softly lit, calm and mid-toned. On the LEFT side, a huge stone hearth, big enough to stable a horse, with a roaring fire, its mantel at about half height. On the RIGHT side, two tall, narrow arched windows with deep blue night and a few stars outside, and below them a heavy oak door. High up, two iron candle wheels hang from the beams on chains, one over the left third and one over the right third, each ringed with eight lit candles with clear bright flames. Rushes strewn on the floor',
    light: 'Firelight and candle gold, with cool grey stone and blue night in the windows',
    moving: ['The hearth fire, drawn alone at the size it is in the backdrop: 3 frames, each a slightly different flicker', 'One candle flame, drawn alone at the size the candles on the candle wheels are in the backdrop: 3 frames', 'A few sparks rising from the fire: 3 small clusters of orange sparks, each alone'],
    presence: [],
    avoid: 'Nothing from Disney\'s The Sword in the Stone, Monty Python, the A24 Green Knight film, the film Excalibur or the BBC\'s Merlin. No real coats of arms copied, no lettering on the banners.',
  },
  rome: {
    unique: 'Three eras stacked in one room: ancient brick below, Renaissance frescoes above, and a chain to the dog\'s chair. The richest room: imperial purple and gold.',
    backdrop: 'A high hall inside Castel Sant\'Angelo in Rome, at dusk: Hadrian\'s tomb, later walled into a papal fortress. The lower walls are rough ancient Roman brick, warm red-brown, with a few round arches; above them, from about a third of the way down, bright Renaissance frescoes: painted clouds, sky blue and gold, and robed allegorical figures, on a high vaulted ceiling across the top of the picture. Dead centre at the back, behind the dealer: a plain stretch of old brick and a closed bronze-studded door in a round arch, softly lit, calm and mid-toned. At the far LEFT edge, a tall arched window open onto the city at dusk: domes and rooftops, the river, a violet and orange sky. TWO tall iron braziers on three legs, burning bright, standing in the gaps BETWEEN the players: one at EXACTLY 27% across and one at EXACTLY 73% across, each so tall that its bowl and fire are at about a third of the way down the picture (head height, between two seated players), the fire reaching up to about a fifth of the way down; nothing else bright at 19% or 80% across, where the end players sit. A heavy iron ring set in the brick high on the right at about 85% across and a quarter of the way down; a thick iron chain hangs from it and runs down and across toward 66% across, ending at about half height, out of sight behind where a player will sit. Purple and gold hangings with tassels between the frescoed panels. Beside the central door, at EXACTLY 42% across, a round-topped niche in the wall, its sill at about 40% of the way down, holding a red velvet cushion, the cushion EMPTY',
    light: 'Brazier orange and fresco colour above, dusky violet through the window',
    moving: ['A brazier fire, drawn alone at the size it is in the backdrop: 3 frames, each a slightly different flicker', 'A thin curl of smoke rising from a brazier, alone: 3 frames, each a slightly different curl'],
    presence: ['A golden laurel wreath lying on a red velvet cushion, as a separate piece drawn at the size of the cushion on its pedestal in the backdrop (it stands there until Caesar arrives)'],
    avoid: 'Nothing from the film Gladiator, the television series Rome or The Borgias, Angels and Demons or Assassin\'s Creed. No modern Rome (no cars, no electric lights, no Vatican dome in modern lighting).',
  },
  baker_street: {
    unique: 'The most cluttered and lived-in room: a Victorian sitting room full of evidence.',
    backdrop: 'The first-floor sitting room at 221B Baker Street, as Watson described it: a chemistry table covered in acid-stained flasks shoved against the wall, letters stuck to the mantelpiece with a jack-knife, the letters V R picked out in bullet holes on the wallpaper, gas lamps, a coal fire, a violin case, a Persian slipper, and a bow window with yellow London fog pressing against the glass. Holmes\'s armchair by the fire',
    light: 'Gaslight yellow and firelight, fog-grey at the window',
    moving: ['Coal fire: 3 frames', 'Fog drifting past the window: 2 frames', 'Gas lamp flame flicker'],
    presence: [],
    avoid: 'Nothing from the BBC Sherlock, the Guy Ritchie films or Elementary: no smiley face in bullet holes, no modern flat.',
  },
  transylvania: {
    unique: 'The only room where the champion is visible before he plays: Dracula sits watching from a high-backed chair beside the fire until two chairs empty.',
    backdrop: 'The great hall of Castle Dracula at night: bare grey stone, black oak beams, a hearth big enough to stand in with one high-backed chair beside it, tall arched windows onto the moonlit Carpathian mountains with far too much moon, iron candelabra, dust. No mirrors anywhere',
    light: 'Firelight red-orange against cold blue moonlight',
    moving: ['The hearth fire in 2 states: roaring (3 frames) and sunk to embers (2 frames)', 'Candle flames: 3 frames', 'Clouds crossing the moon: 2 frames', 'A bat crossing a window'],
    presence: ['The high-backed chair by the fire, empty', 'The same chair with a dark, still figure seated in it, watching (Dracula in silhouette, only his eyes catching the firelight): it goes when he sits at the table'],
    avoid: 'Nothing from Universal\'s or Hammer\'s Dracula films, no Bela Lugosi, no Castlevania.',
  },
  station: {
    unique: 'The only room with no fire: cool steel, soft lamps and the whole Earth in the window. The room itself is a player, as a pale lens in the ceiling.',
    backdrop: 'A round lounge on a slowly turning space station: brushed steel and white panels, soft lamps, and one enormous curved window filling the back wall with the Earth, blue and white against black space. In the ceiling above the table, a single round lens: a brass-rimmed iris of overlapping blades with a pale white light behind it',
    light: 'Cool white lamplight and blue Earthlight; after the turn, dim amber emergency light (never red)',
    moving: ['The Earth, as a separate plate that turns slowly', 'Stars', 'The ceiling lens in 3 apertures', 'A single poker chip floating an inch above the felt'],
    presence: ['An amber emergency-lighting overlay for after the turn, as a flat tint'],
    avoid: 'No NASA or agency insignia, no flags. Nothing from 2001: A Space Odyssey: no red eye, no HAL.',
  },
  champions: {
    unique: 'One hall for both champions\' tables: eight tall doors round a round hall, each spilling its own room\'s light. Which four stand open changes between the two tables.',
    backdrop: 'A round hall whose ceiling is lost in darkness, floored in polished black stone, with eight tall doors set round its wall. Draw every door CLOSED in this plate. Between the first and the eighth, a ninth door, small, plain and shut',
    light: 'Dark, lit only by what the open doors let in',
    moving: [],
    presence: ['Each of the eight doors OPEN, as separate pieces, each spilling its own room\'s light: gold firelight (White House), oil-lamp gold (Athens), moonlit sea (Pirate Cove), great-hall firelight (Camelot), brazier orange (Rome), gaslight and fog (Baker Street), red firelight (Transylvania), blue Earthlight (the Station). The first table opens the first four; the second opens the last four'],
    avoid: '',
  },
  finale: {
    unique: 'The smallest room: no gold, no crowd, one lamp and the two of you. Death sits across from you, front-on, for the first time as a player.',
    backdrop: 'A plank-walled dock house on the bank of a wide black river, at night, in a storm. Keep it lighter than his black robe so Death reads against it: warm lantern light from the dock outside the windows, and the planks lit amber, not black: rain running down the windows, a coil of rope, a boat hook on the wall, a door that never quite shuts. Through the window, far out on the water, a ferryman\'s lantern moving away from the shore with a figure aboard',
    light: 'One oil lamp, warm and small, against storm-dark blue',
    moving: ['The oil lamp flame: 3 frames, one guttering', 'Rain on the window: 2 frames', 'The ferryman\'s lantern and boat, small, drifting across the window', 'The door, shut and open a crack'],
    presence: [],
    avoid: 'Nothing from Pratchett\'s Discworld, Bergman\'s The Seventh Seal or Gaiman\'s Sandman.',
  },
  pyre: {
    unique: 'The hidden table (the Phoenix\'s gauntlet): dawn instead of night, sandstone and spice instead of gold and wood. Ash drifts across the felt like snow. One opponent, so the room can be grand and still read: everything bright is high and at the sides.',
    backdrop: 'The inner court of an ancient Egyptian temple of the Sun, in the last hour before dawn: tall sandstone columns with papyrus capitals and faded painted bands, open to a sky going from violet at the top to gold low down between the columns. At the back, high on a stone altar, a nest of cinnamon sticks and myrrh, smouldering, with a thin column of smoke. Warm, glowing, hopeful, never dark or scary',
    light: 'Dawn gold low in the sky between the columns; the warm red glow of the nest on the altar',
    moving: ['Drifting ash flakes, 3 frames, grey and pale, to fall slowly across the scene', 'The smouldering nest: 3 frames of glowing embers and a curl of smoke', 'The dawn sky between the columns, a second, slightly brighter version, for the sun coming up as the sitting goes on'],
    presence: ['The empty nest on the altar, without the bird, for after it has stepped down to the table'],
    avoid: 'Nothing from the Harry Potter books or films, Marvel\'s Phoenix or any modern film or game. No hieroglyphs that spell words, no text.',
  },
};

const order = ['white_house', 'athens', 'pirate_cove', 'camelot', 'rome', 'baker_street', 'transylvania', 'station', 'champions', 'finale', 'pyre'];
const block = s => '```\n' + s.trim() + '\n```\n\n';
let out = `# Room art prompts

The backdrop and the moving and story pieces for every venue, to go with \`CHARACTER-ART-PROMPTS.md\`. The room descriptions come from \`data/tables/*.json\` (\`room\`, \`presence\`, \`ambience\`); the art notes are written for the art (\`art-tools/prompts/rooms.mjs\`, which regenerates this file). Same bright cartoon style as the characters.

## How a room is built

Every room is the same stack of layers, back to front:

1. **Backdrop plate:** the room itself, wide (21:9) so it fills any phone in landscape. Big features go high and at the sides. The band behind the players' heads stays calmer, so faces read. Death deals from the far side, dead centre, so the backdrop directly behind him is the calmest part of all.
2. **Room pieces that come and go** (the "presence"): the empty couch at Athens, the laurel wreath at Rome, Dracula watching from beside the fire. They are separate so they can leave when the story says.
3. **The characters** (see \`CHARACTER-ART-PROMPTS.md\`), drawn with nothing behind them: no chairs are ever shown.
4. **The table:** Death\'s table, the SAME in every room (the owner's call): it goes wherever he deals: \`art-tools/rooms/table.webp\`, a round green-baize table with a padded leather rim. A round top seen from the player's seat, so it's a wide ellipse. You are sitting at it: the game scales the table up so its near half falls below the bottom of the screen, the felt fills the lower part of the picture, and the far rim crosses the screen at about the middle. The far rim runs in front of the dealer and the far seats, and the sides curve down toward you, which is why a character in a side seat is cut lower than one at the back. The table hides every torso below its edge, and every floor.
5. **Forearms, hands and props on the felt**, then the cards and chips (the game draws those).
6. **Moving pieces:** fire, lamp flames, rain, the Earth. A few frames each, looped: the room breathes, as the characters do.

**What makes each room its own:** the backdrop, its story pieces and its light. The table stays the same, so every room is read at once as the same game, and only one table has to be drawn. Attach the White House backdrop (\`art-tools/rooms/white_house/backdrop.webp\`) to every backdrop prompt, for its camera only.

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

\`art-tools/mock_screen.py\` draws this screen with the current art (\`python3 art-tools/mock_screen.py white_house\`), so any new backdrop, table or character can be checked against the game before it's accepted. The first room is in \`art-tools/rooms/white_house/\` (backdrop and \`screen_mock.png\`); the table every room shares is \`art-tools/rooms/table.webp\`. \`art-tools/room_web.py <room>\` publishes a room to the game.

## At a glance

| Room | Light | Story pieces |
|---|---|---|
${order.map(id => { const r = ROOMS[id]; const name = id === 'champions' ? "The Champions' Tables (the Hall of Doors)" : T[id].name; return `| ${name} | ${r.light} | ${r.presence.length ? r.presence.length : '—'} |`; }).join('\n')}

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
  out += `- **Light:** ${r.light}.\n`;
  if (r.avoid) out += `- **Avoid:** ${r.avoid}\n`;
  out += `\n**Backdrop plate:**\n\n` + block(`${LOOK} ${PLATE}\n\nThe room: ${r.backdrop}.\nLight: ${r.light}.${r.avoid ? '\nMust NOT resemble: ' + r.avoid : ''}`);
  const pieces = [...r.presence, ...r.moving];
  if (pieces.length) out += `**Moving and story pieces:**\n\n` + block(`${LOOK} ${PIECES}\n\nFor the room: ${name}. Parts:\n${pieces.map(p => '- ' + p).join('\n')}\n\nSoft glows, smoke and light spill are listed so you know they are needed; they are easiest made in the rig as a blurred, tinted shape, so treat these as reference.`);
}
fs.writeFileSync('ROOM-ART-PROMPTS.md', out);
console.log('rooms', order.length);
