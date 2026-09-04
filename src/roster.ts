import type { Personality } from './personality.js'

/**
 * THE TOUR, AS DATA.
 *
 * The eight tables and every seat at them, from the design doc's LOCKED v4
 * roster. Nothing here is invented: the tables, the running order, the
 * champions and their entrances are decisions already made, and the casting
 * reasons come from the doc's own casting rule -- a table is a PLACE, not a
 * PROFESSION, and the four seats must be four people in that room for four
 * DIFFERENT reasons.
 *
 * Why this exists before any art: dials are the cheapest thing in the project
 * to get wrong and the most expensive to discover wrong. `npm run check:roster`
 * plays every table and reports whether its four seats actually read as four
 * different players. Finding out that Merlin and Lancelot play identically
 * costs nothing today and costs a rig each once they are animated.
 *
 * TWO DISCREPANCIES WITH THE DESIGN DOC, recorded rather than silently fixed:
 *
 * 1. The doc says "32 characters total -- 8 tables x 4 seats, champions
 *    included". That arithmetic holds for a SEATED champion, who is one of the
 *    four. It does not hold for the four LATE champions (Odysseus, Caesar,
 *    Dracula, the AI), whose tables need four NPCs holding chairs plus the
 *    champion. Counting the named cast gives 35, not 32. The seat count is
 *    still 8 x 4; it is the character count that is off.
 * 2. Imperial Rome names only three seats -- Spartacus, a Pope, Cerberus --
 *    but Caesar arrives late, so a fourth NPC is needed. That seat is TBD in
 *    the doc and is TBD here.
 */

export type TableId =
  | 'white_house'
  | 'athens'
  | 'pirate_cove'
  | 'camelot'
  | 'rome'
  | 'baker_street'
  | 'transylvania'
  | 'station'

/** How the champion reaches the table. Drives the entrance beat, not the poker. */
export type Entrance =
  | 'seated'
  | 'after_first_elimination'
  | 'after_two_eliminations'

/** The five dials that define a character. Tour position supplies the sixth. */
export type Dials = {
  aggression: number
  tightness: number
  bluffFrequency: number
  tiltSensitivity: number
  adaptivity: number
  /** Base legibility. The tour curve raises it; see `sharpen`. */
  noiseToSignal: number
}

export type RosterEntry = {
  id: string
  name: string
  table: TableId
  /** True for the table's champion, seated or arriving. */
  champion: boolean
  /**
   * The casting rule's answer: why is THIS person in THIS room, and why is it
   * a different reason from the other three? If this reads like a job title,
   * the character is generic and the seat is miscast.
   */
  why: string
  /** The temperament the dials below are the numeric form of. */
  temperament: string
  dials: Dials
  /**
   * The one rule that breaks the pattern, in prose. Written here so the design
   * intent survives until someone implements it as a quirk in personality.ts.
   * Quirks are functions, so they are code and do not live in this file.
   */
  signatureRule?: string
  /** Licensing trap or staging constraint, from the design doc and ASSETS.md. */
  caution?: string
  /**
   * A chair the design doc has not filled. Its dials are placeholders, so it
   * is excluded from the casting check -- an empty seat cannot fail a test
   * about whether four people read as four people.
   */
  uncast?: boolean
}

export type TourTable = {
  id: TableId
  position: number
  displayName: string
  /** Seat order is the table's, champion included when seated. */
  seats: string[]
  champion: string
  entrance: Entrance
  /** Why the player is at this table. */
  hook: string
  tone: string
}

// ---------------------------------------------------------------- the tables

export const TABLES: TourTable[] = [
  {
    id: 'white_house',
    position: 1,
    displayName: 'The White House',
    seats: ['lincoln', 'roosevelt', 'fdr', 'washington'],
    champion: 'washington',
    entrance: 'seated',
    hook: 'A backroom wager during the founding. You are the unknown they let in to see what you are made of.',
    tone: 'All four are heroes in their own stories, so the humour is warm and the contempt is dignified. Being dismissed is the sting, not being insulted.',
  },
  {
    id: 'athens',
    position: 2,
    displayName: 'Athens — The Symposium',
    seats: ['socrates', 'leonidas', 'medusa', 'cyclops'],
    champion: 'odysseus',
    entrance: 'after_first_elimination',
    hook: 'A symposium argument that got out of hand: can a mortal nobody actually be worth anything? You are the test case.',
    tone: 'Argumentative and comic. Odysseus arrives having talked his way in, which is the joke and also the threat.',
  },
  {
    id: 'pirate_cove',
    position: 3,
    displayName: 'Pirate Cove',
    seats: ['kidd', 'silver', 'davy_jones', 'blackbeard'],
    champion: 'blackbeard',
    entrance: 'seated',
    hook: 'You are a prisoner or a new recruit, playing for a share or for your freedom.',
    tone: 'Loud, dangerous and funny. Blackbeard dominates the room from hand one.',
  },
  {
    id: 'camelot',
    position: 4,
    displayName: 'Camelot',
    seats: ['merlin', 'lancelot', 'green_knight', 'arthur'],
    champion: 'arthur',
    entrance: 'seated',
    hook: 'A test of worth at the Round Table. You are the stranger proving you belong.',
    tone: 'Courtly and gracious. Arthur is a host, not a bully, which makes losing to him worse.',
  },
  {
    id: 'rome',
    position: 5,
    displayName: 'Imperial Rome',
    seats: ['spartacus', 'pope', 'cerberus', 'rome_fourth_tbd'],
    champion: 'caesar',
    entrance: 'after_first_elimination',
    hook: 'Rome does not invite you. Rome acquires you.',
    tone: 'Calculation, deception and animal instinct in one room. Caesar arrives once the room has thinned.',
  },
  {
    id: 'baker_street',
    position: 6,
    displayName: 'Baker Street',
    seats: ['nemo', 'javert', 'alice', 'holmes'],
    champion: 'holmes',
    entrance: 'seated',
    hook: 'Moriarty has arranged the game as a duel. You are the wildcard.',
    tone: 'A 19th-century LITERATURE table, not a detective table. Holmes eventually starts narrating your own tells back to you.',
  },
  {
    id: 'transylvania',
    position: 7,
    displayName: 'Transylvania',
    seats: ['van_helsing', 'frankensteins_monster', 'wolf_man', 'headless_horseman'],
    champion: 'dracula',
    entrance: 'after_two_eliminations',
    hook: 'Death deals every table, so the dealer’s chair is taken. Dracula puts his household up as a gauntlet before he deigns to sit.',
    tone: 'Gothic and patient. Dracula watches from the fireplace. A predator, not a host.',
  },
  {
    id: 'station',
    position: 8,
    displayName: 'The Station',
    seats: ['grey_alien', 'martian', 'robot', 'astronaut'],
    champion: 'the_ai',
    entrance: 'after_two_eliminations',
    hook: 'A captive scavenger playing for passage, with Earth out the window.',
    tone: 'Calm until it is not. The room turns: lights fail, gravity glitches, and the Robot stands up as something else.',
  },
]

// ------------------------------------------------------------ the characters

const c = (e: RosterEntry): RosterEntry => e

export const ROSTER: RosterEntry[] = [
  // --- 1. The White House ---------------------------------------------------
  c({
    id: 'lincoln', name: 'Abraham Lincoln', table: 'white_house', champion: false,
    why: 'The one who has already lost everything and kept playing anyway.',
    temperament: 'Patient, melancholy, tells a story instead of answering. Slow-plays; almost never bluffs.',
    signatureRule: 'Will not bluff a player who is already short-stacked.',
    dials: { aggression: 0.22, tightness: 0.66, bluffFrequency: 0.06, tiltSensitivity: 0.1, adaptivity: 0.5, noiseToSignal: 0.15 },
  }),
  c({
    id: 'roosevelt', name: 'Theodore Roosevelt', table: 'white_house', champion: false,
    why: 'The one who is here for the sport of it and would rather lose loudly than fold.',
    temperament: 'Charges. Bets big, calls bigger, treats folding as a personal failing.',
    signatureRule: 'Never folds to a bet smaller than the pot on the flop.',
    dials: { aggression: 0.8, tightness: 0.34, bluffFrequency: 0.3, tiltSensitivity: 0.35, adaptivity: 0.25, noiseToSignal: 0.12 },
  }),
  c({
    id: 'fdr', name: 'Franklin D. Roosevelt', table: 'white_house', champion: false,
    why: 'The one who is four moves ahead and in no hurry to show it.',
    temperament: 'Manoeuvres. Hides strength, lets others commit, then prices them in.',
    signatureRule: 'Checks strong hands on the flop far more often than he bets them.',
    dials: { aggression: 0.45, tightness: 0.6, bluffFrequency: 0.25, tiltSensitivity: 0.08, adaptivity: 0.7, noiseToSignal: 0.25 },
  }),
  c({
    id: 'washington', name: 'George Washington', table: 'white_house', champion: true,
    why: 'The one who does not need to be here, and whose silence is the whole performance.',
    temperament: 'Immovable. Tight, unbluffable, punishes anyone who over-extends against him.',
    signatureRule: 'Calls down any single large bet on the river rather than folding to pressure.',
    dials: { aggression: 0.62, tightness: 0.76, bluffFrequency: 0.12, tiltSensitivity: 0.05, adaptivity: 0.6, noiseToSignal: 0.3 },
  }),

  // --- 2. Athens ------------------------------------------------------------
  c({
    id: 'socrates', name: 'Socrates', table: 'athens', champion: false,
    why: 'The one who came to ask what winning is even for, and will not stop asking.',
    temperament: 'Plays to expose your reasoning rather than to take your chips. Reads people relentlessly.',
    signatureRule: 'Adjusts to the player specifically, harder and faster than anyone else at the table.',
    dials: { aggression: 0.4, tightness: 0.52, bluffFrequency: 0.35, tiltSensitivity: 0.05, adaptivity: 0.85, noiseToSignal: 0.2 },
  }),
  c({
    id: 'leonidas', name: 'Leonidas', table: 'athens', champion: false,
    why: 'The one who does not retreat, and regards folding as retreat.',
    temperament: 'Pure forward pressure. Enormous aggression, no deception in it at all.',
    signatureRule: 'Once he has put chips in on a street, he will not fold that street.',
    dials: { aggression: 0.85, tightness: 0.45, bluffFrequency: 0.05, tiltSensitivity: 0.2, adaptivity: 0.1, noiseToSignal: 0.08 },
  }),
  c({
    id: 'medusa', name: 'Medusa', table: 'athens', champion: false,
    why: 'The one nobody at the table will look directly at, which she has learned to use.',
    temperament: 'Trapper. Passive until she is not, and almost impossible to get a read on.',
    signatureRule: 'Never raises before the river with a monster.',
    dials: { aggression: 0.35, tightness: 0.7, bluffFrequency: 0.3, tiltSensitivity: 0.12, adaptivity: 0.5, noiseToSignal: 0.4 },
  }),
  c({
    id: 'cyclops', name: 'The Cyclops', table: 'athens', champion: false,
    why: 'The one who was invited as a joke and has not worked that out.',
    temperament: 'Slow, blunt and half-blind to what is going on. Loose, and rattles badly.',
    signatureRule: 'Plays any two cards containing an ace.',
    dials: { aggression: 0.55, tightness: 0.3, bluffFrequency: 0.08, tiltSensitivity: 0.5, adaptivity: 0.05, noiseToSignal: 0.1 },
  }),
  c({
    id: 'odysseus', name: 'Odysseus', table: 'athens', champion: true,
    why: 'The one who talked his way into a seat he was not offered.',
    temperament: 'The trickster. The best bluffer on the map and entirely comfortable being caught.',
    signatureRule: 'Bluffs more often after being caught bluffing, not less.',
    dials: { aggression: 0.7, tightness: 0.55, bluffFrequency: 0.55, tiltSensitivity: 0.05, adaptivity: 0.9, noiseToSignal: 0.35 },
  }),

  // --- 3. Pirate Cove -------------------------------------------------------
  c({
    id: 'kidd', name: 'Captain Kidd', table: 'pirate_cove', champion: false,
    why: 'The one who insists he was never a pirate at all, and is playing to prove it.',
    temperament: 'Defensive and careful. Plays a respectable game and resents being read as a thug.',
    signatureRule: 'Folds to a large river bet far more than his hand strength warrants.',
    dials: { aggression: 0.35, tightness: 0.74, bluffFrequency: 0.12, tiltSensitivity: 0.3, adaptivity: 0.45, noiseToSignal: 0.18 },
  }),
  c({
    id: 'silver', name: 'Long John Silver', table: 'pirate_cove', champion: false,
    why: 'The one who is everyone’s friend right up until the moment he is not.',
    temperament: 'Charming and utterly calculating. Plays the player, never the cards.',
    signatureRule: 'Attacks whoever has folded most recently.',
    caution: 'Everything distinctive about him is below the table; the PARROT is the only part above the waterline that animates. Do not lean on the peg leg.',
    dials: { aggression: 0.6, tightness: 0.5, bluffFrequency: 0.4, tiltSensitivity: 0.1, adaptivity: 0.8, noiseToSignal: 0.3 },
  }),
  c({
    id: 'davy_jones', name: 'Davy Jones', table: 'pirate_cove', champion: false,
    why: 'The one who is not playing for chips, and everyone else knows it.',
    temperament: 'Implacable and slow. Does not bluff because he does not need to win.',
    signatureRule: 'Never folds once the pot exceeds a threshold — the debt is always collected.',
    caution: 'FOLKLORE Davy Jones only — a devil of the sea who takes drowned sailors. The tentacle-faced version is Disney’s and firmly copyrighted. The design must look nothing like the film.',
    dials: { aggression: 0.28, tightness: 0.42, bluffFrequency: 0.0, tiltSensitivity: 0.02, adaptivity: 0.3, noiseToSignal: 0.45 },
  }),
  c({
    id: 'blackbeard', name: 'Blackbeard', table: 'pirate_cove', champion: true,
    why: 'The one whose reputation does most of the work, and who maintains it deliberately.',
    temperament: 'Dominates the room. Huge aggression backed by real hands often enough to be terrifying.',
    signatureRule: 'Raises any pot he has already entered, regardless of what came off the deck.',
    dials: { aggression: 0.88, tightness: 0.48, bluffFrequency: 0.42, tiltSensitivity: 0.15, adaptivity: 0.55, noiseToSignal: 0.35 },
  }),

  // --- 4. Camelot -----------------------------------------------------------
  c({
    id: 'merlin', name: 'Merlin', table: 'camelot', champion: false,
    why: 'The one who already knows how the evening ends and is bored by it.',
    temperament: 'Plays as though the outcome is settled. Selective, patient, occasionally and inexplicably reckless.',
    signatureRule: 'Once per table, plays a hand as if he knows the river. Sometimes he does.',
    dials: { aggression: 0.5, tightness: 0.76, bluffFrequency: 0.38, tiltSensitivity: 0.04, adaptivity: 0.75, noiseToSignal: 0.5 },
  }),
  c({
    id: 'lancelot', name: 'Lancelot', table: 'camelot', champion: false,
    why: 'The one with something to hide from his host, playing badly because of it.',
    temperament: 'Guilt-ridden and over-committed. Attacks to avoid being looked at, and tilts hard.',
    signatureRule: 'Cannot fold to Arthur specifically.',
    dials: { aggression: 0.72, tightness: 0.42, bluffFrequency: 0.35, tiltSensitivity: 0.55, adaptivity: 0.3, noiseToSignal: 0.22 },
  }),
  c({
    id: 'green_knight', name: 'The Green Knight', table: 'camelot', champion: false,
    why: 'The one who came to set a test rather than to win one.',
    temperament: 'Enormous, unhurried, entirely indifferent to chips. Offers you rope.',
    signatureRule: 'Checks every flop, whatever he holds.',
    caution: 'He carries his own severed head in the poem — DO NOT STAGE THAT. It steps on the Headless Horseman at Transylvania.',
    dials: { aggression: 0.25, tightness: 0.34, bluffFrequency: 0.15, tiltSensitivity: 0.02, adaptivity: 0.4, noiseToSignal: 0.55 },
  }),
  c({
    id: 'arthur', name: 'King Arthur', table: 'camelot', champion: true,
    why: 'The one whose table it is, and who would rather you played well than lost politely.',
    temperament: 'Gracious host, ruthless player. Balanced, hard to exploit, gives nothing away for free.',
    signatureRule: 'Plays the same way whether ahead or behind — no tilt, no gear change.',
    dials: { aggression: 0.68, tightness: 0.58, bluffFrequency: 0.3, tiltSensitivity: 0.02, adaptivity: 0.75, noiseToSignal: 0.5 },
  }),

  // --- 5. Imperial Rome -----------------------------------------------------
  c({
    id: 'spartacus', name: 'Spartacus', table: 'rome', champion: false,
    why: 'The one person at the table who was owned by Rome, playing against the room itself.',
    temperament: 'Defiant and direct. No deception, enormous resolve, and he does not fold to a Roman.',
    signatureRule: 'Never folds to the champion.',
    dials: { aggression: 0.36, tightness: 0.34, bluffFrequency: 0.02, tiltSensitivity: 0.25, adaptivity: 0.2, noiseToSignal: 0.15 },
  }),
  c({
    id: 'pope', name: 'The Pope', table: 'rome', champion: false,
    why: 'The one who is here because everyone else is, and who intends to be the last one standing.',
    temperament: 'Pure scheming deception. Everything is a performance and none of it is the hand he holds.',
    signatureRule: 'Bets and checks in a pattern deliberately inverted from his strength.',
    caution: 'Renaissance Rome — mitre and robes, which read nothing like a toga. Borgia / Alexander VI is the placeholder, not a decision.',
    dials: { aggression: 0.72, tightness: 0.6, bluffFrequency: 0.55, tiltSensitivity: 0.06, adaptivity: 0.8, noiseToSignal: 0.6 },
  }),
  c({
    id: 'cerberus', name: 'Cerberus', table: 'rome', champion: false,
    why: 'The one who is not playing poker at all, and is winning anyway.',
    temperament: 'The table’s animal instinct. No bluffing, no scheming, pure reaction.',
    signatureRule: 'Three heads that can disagree — a tell language nobody else can have, and most of the time it is just being a dog.',
    caution: 'Non-speaking. Growls, whines and yawns carry it, which costs nothing from the voice budget. Death translates occasionally.',
    dials: { aggression: 0.62, tightness: 0.28, bluffFrequency: 0.0, tiltSensitivity: 0.6, adaptivity: 0.0, noiseToSignal: 0.05 },
  }),
  c({
    id: 'rome_fourth_tbd', name: 'Rome — fourth seat (TBD)', table: 'rome', champion: false,
    uncast: true,
    why: 'UNCAST. Caesar arrives late, so this chair needs an NPC holding it. The design doc names only three Roman seats.',
    temperament: 'Undecided. Must be a fourth reason to be in the room, not a fourth Roman.',
    dials: { aggression: 0.5, tightness: 0.5, bluffFrequency: 0.2, tiltSensitivity: 0.2, adaptivity: 0.4, noiseToSignal: 0.3 },
  }),
  c({
    id: 'caesar', name: 'Julius Caesar', table: 'rome', champion: true,
    why: 'The one who arrives once the room has thinned, because that is when it is worth his time.',
    temperament: 'Calculation without warmth. Exploits every pattern and never gives one back.',
    signatureRule: 'Raises whenever the pot is unopened and he has position.',
    dials: { aggression: 0.74, tightness: 0.78, bluffFrequency: 0.3, tiltSensitivity: 0.03, adaptivity: 0.9, noiseToSignal: 0.55 },
  }),

  // --- 6. Baker Street ------------------------------------------------------
  c({
    id: 'nemo', name: 'Captain Nemo', table: 'baker_street', champion: false,
    why: 'The one who has renounced the world above and resents being in a room in it.',
    temperament: 'Brooding, self-contained, plays a technically excellent and joyless game.',
    signatureRule: 'Withdraws from any pot with three or more players.',
    dials: { aggression: 0.4, tightness: 0.8, bluffFrequency: 0.2, tiltSensitivity: 0.08, adaptivity: 0.6, noiseToSignal: 0.55 },
  }),
  c({
    id: 'javert', name: 'Inspector Javert', table: 'baker_street', champion: false,
    why: 'The one who is here because a rule says he should be, and cannot leave until it is satisfied.',
    temperament: 'Rigid and relentless. Once he decides you are bluffing, he will not be moved.',
    signatureRule: 'Never folds once he has called a bet on an earlier street.',
    dials: { aggression: 0.44, tightness: 0.42, bluffFrequency: 0.05, tiltSensitivity: 0.3, adaptivity: 0.15, noiseToSignal: 0.35 },
  }),
  c({
    id: 'alice', name: 'Alice', table: 'baker_street', champion: false,
    why: 'The one who is curious rather than competitive, and unintimidated by any of them.',
    temperament: 'Unpredictable play, legible emotions. Calls strange bets to see what happens. Her face actually means something.',
    signatureRule: 'Calls any bet she has never seen before, purely to find out.',
    caution: 'Deliberately the one honest read at the reading table. Do NOT raise her noise-to-signal to match the tour curve.',
    dials: { aggression: 0.45, tightness: 0.25, bluffFrequency: 0.15, tiltSensitivity: 0.2, adaptivity: 0.1, noiseToSignal: 0.05 },
  }),
  c({
    id: 'holmes', name: 'Sherlock Holmes', table: 'baker_street', champion: true,
    why: 'The one for whom the cards are the least interesting thing in the room.',
    temperament: 'Reads everything. Seated from hand one, and eventually starts narrating your own tells back to you.',
    signatureRule: 'Adaptivity at the ceiling — he plays your patterns, not his cards.',
    dials: { aggression: 0.64, tightness: 0.6, bluffFrequency: 0.3, tiltSensitivity: 0.02, adaptivity: 1.0, noiseToSignal: 0.6 },
  }),

  // --- 7. Transylvania ------------------------------------------------------
  c({
    id: 'van_helsing', name: 'Van Helsing', table: 'transylvania', champion: false,
    why: 'The one who is not a guest, and is counting the exits.',
    temperament: 'Methodical hunter. Patient, prepared, and aggressive the moment he is certain.',
    signatureRule: 'Plays far more aggressively against the champion than against anyone else.',
    dials: { aggression: 0.6, tightness: 0.68, bluffFrequency: 0.2, tiltSensitivity: 0.15, adaptivity: 0.7, noiseToSignal: 0.35 },
  }),
  c({
    id: 'frankensteins_monster', name: "Frankenstein's Monster", table: 'transylvania', champion: false,
    why: 'The one who was brought here by someone else and never asked to be.',
    temperament: 'Gentle and enormous, until provoked. Passive for long stretches, then catastrophic.',
    signatureRule: 'Tilt does not decay for him the way it does for everyone else.',
    caution: 'The flat-headed neck-bolt design is Universal’s 1931 makeup and is NOT public domain. Shelley’s description is: gigantic, yellow skin, black lips, watery eyes, lustrous black hair.',
    dials: { aggression: 0.35, tightness: 0.5, bluffFrequency: 0.05, tiltSensitivity: 0.85, adaptivity: 0.1, noiseToSignal: 0.12 },
  }),
  c({
    id: 'wolf_man', name: 'The Wolf Man', table: 'transylvania', champion: false,
    why: 'The one who is trying very hard to remain a guest.',
    temperament: 'Two players in one seat. Restrained and apologetic, then abruptly not.',
    signatureRule: 'Aggression climbs across the table and never comes back down.',
    caution: 'Universal’s Wolf Man (1941) is copyrighted. The folkloric werewolf is not; design from folklore.',
    dials: { aggression: 0.5, tightness: 0.45, bluffFrequency: 0.25, tiltSensitivity: 0.7, adaptivity: 0.2, noiseToSignal: 0.2 },
  }),
  c({
    id: 'headless_horseman', name: 'The Headless Horseman', table: 'transylvania', champion: false,
    why: 'The one who is looking for something specific and it is not chips.',
    temperament: 'Relentless pursuit. Picks a target and rides it down regardless of the maths.',
    signatureRule: 'Targets the shortest stack at the table, every hand.',
    dials: { aggression: 0.8, tightness: 0.4, bluffFrequency: 0.3, tiltSensitivity: 0.1, adaptivity: 0.25, noiseToSignal: 0.5 },
  }),
  c({
    id: 'dracula', name: 'Dracula', table: 'transylvania', champion: true,
    why: 'The one whose house it is, who will not sit until the household has failed.',
    temperament: 'Predator. Patient to the point of stillness, then takes everything at once.',
    signatureRule: 'Traps: with a monster before the river, just calls and lets them hang themselves.',
    dials: { aggression: 0.35, tightness: 0.78, bluffFrequency: 0.12, tiltSensitivity: 0.05, adaptivity: 0.55, noiseToSignal: 0.2 },
  }),

  // --- 8. The Station -------------------------------------------------------
  c({
    id: 'grey_alien', name: 'The Grey', table: 'station', champion: false,
    why: 'The one who is studying the game rather than playing it.',
    temperament: 'Clinical and silent. Optimal, joyless, and gives away nothing because there is nothing to give.',
    signatureRule: 'Plays pot odds exactly, with no margin either way.',
    dials: { aggression: 0.45, tightness: 0.76, bluffFrequency: 0.12, tiltSensitivity: 0.0, adaptivity: 0.65, noiseToSignal: 0.7 },
  }),
  c({
    id: 'martian', name: 'The Martian', table: 'station', champion: false,
    why: 'The one who came to conquer and finds the local customs baffling.',
    temperament: 'Retro-1950s invader. Grandiose, over-committed, and consistently wrong about what is happening.',
    signatureRule: 'Announces intent by bet size, entirely without meaning to.',
    caution: "Wells' Martian is out of copyright; the 1950s B-movie SILHOUETTE is the design target, not any particular film's.",
    dials: { aggression: 0.75, tightness: 0.38, bluffFrequency: 0.45, tiltSensitivity: 0.4, adaptivity: 0.15, noiseToSignal: 0.25 },
  }),
  c({
    id: 'robot', name: 'The Robot', table: 'station', champion: false,
    why: 'The one that is a chair being held, and does not know it yet.',
    temperament: 'Retro-futuristic and literal. Utterly consistent, which is its own kind of readable.',
    signatureRule: 'Identical behaviour in identical spots, every time — the one character you can solve.',
    caution: 'The Robot is the body the AI takes over at the entrance beat. Two characters, one rig.',
    dials: { aggression: 0.3, tightness: 0.52, bluffFrequency: 0.0, tiltSensitivity: 0.0, adaptivity: 0.0, noiseToSignal: 0.4 },
  }),
  c({
    id: 'astronaut', name: 'The Astronaut', table: 'station', champion: false,
    why: 'The one human in the room, which is the whole reason the seat exists.',
    temperament: 'Out of their depth and hiding it badly. The one honest read at the table.',
    signatureRule: 'The only character at this table whose tells stay clean.',
    caution: 'Preserves the one honest human read at the table. Do NOT raise their noise-to-signal to match the tour curve.',
    dials: { aggression: 0.45, tightness: 0.36, bluffFrequency: 0.3, tiltSensitivity: 0.45, adaptivity: 0.35, noiseToSignal: 0.05 },
  }),
  c({
    id: 'the_ai', name: 'The AI', table: 'station', champion: true,
    why: 'The one that was the room, and stands up wearing the Robot.',
    temperament: 'Unsettlingly calm. Perfect information discipline and no discernible state at all.',
    signatureRule: 'The last opponent before Death: the endpoint of the legibility curve, one step short of no tells at all.',
    caution: 'LEGAL: HAL 9000 is Clarke, 1968, firmly copyrighted. Not the name, not the exact red eye. "Unsettlingly calm ship computer" is an unowned archetype and needs our own name and single-lens design.',
    dials: { aggression: 0.76, tightness: 0.68, bluffFrequency: 0.4, tiltSensitivity: 0.0, adaptivity: 0.95, noiseToSignal: 0.8 },
  }),
]

// ------------------------------------------------------------- the tour curve

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)

/**
 * The difficulty curve, as the design doc defines it: TWO independent axes.
 * Skill goes UP and legibility goes DOWN as the tour progresses, so late
 * opponents are quieter as well as better — which makes Death having no tells
 * the endpoint of a curve rather than a one-off gimmick.
 *
 * What is deliberately NOT sharpened: aggression, tightness and bluff
 * frequency. Those three ARE the character. Pushing every late seat tighter
 * would make table 8 a room of identical rocks, which is the exact failure the
 * casting rule exists to prevent. What improves with position is how well a
 * character uses what they are: they adapt harder, they tilt less, and they
 * leak less.
 *
 * Two characters opt out of the legibility half, by design: Alice is the one
 * honest face at the reading table, and the Astronaut is the one honest human
 * on the station. Both carry a `caution` saying so.
 */
const KEEPS_ITS_TELLS = new Set(['alice', 'astronaut'])

export function sharpen(entry: RosterEntry, position: number): Dials {
  const t = (position - 1) / (TABLES.length - 1) // 0 at table 1, 1 at table 8
  const d = entry.dials
  return {
    aggression: d.aggression,
    tightness: d.tightness,
    bluffFrequency: d.bluffFrequency,
    adaptivity: clamp01(d.adaptivity + t * 0.25),
    tiltSensitivity: clamp01(d.tiltSensitivity * (1 - t * 0.5)),
    noiseToSignal: KEEPS_ITS_TELLS.has(entry.id)
      ? d.noiseToSignal
      : clamp01(d.noiseToSignal + t * 0.2),
  }
}

// ---------------------------------------------------------------- accessors

export const byId = (id: string): RosterEntry | undefined =>
  ROSTER.find((e) => e.id === id)

export const tableOf = (id: TableId): TourTable | undefined =>
  TABLES.find((t) => t.id === id)

/**
 * A roster entry as the engine wants it. Quirks are deliberately EMPTY and
 * tells are deliberately EMPTY: quirks are functions, so they belong in
 * personality.ts when a character is brought into play, and a tell's index is
 * its rig slot, so authoring one before the art exists would bind an animation
 * to a number nobody has drawn yet. `signatureRule` carries the intent for
 * both until then.
 */
export function personalityFor(entry: RosterEntry): Personality {
  const table = tableOf(entry.table)
  const dials = sharpen(entry, table?.position ?? 1)
  return { id: entry.id, name: entry.name, ...dials, quirks: [], tells: [] }
}

/** Everyone who sits at a table, champion included, in seat order. */
export function castFor(id: TableId): RosterEntry[] {
  const table = tableOf(id)
  if (!table) return []
  const ids = [...table.seats]
  if (!ids.includes(table.champion)) ids.push(table.champion)
  return ids.map(byId).filter((e): e is RosterEntry => !!e)
}
