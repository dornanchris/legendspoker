import { useState } from 'react'
import { TABLES, type TableId } from '../src/roster.js'
import { canEnter, enter, markState, type MarkState } from './tour.js'
import { click } from './audio.js'

/**
 * THE WORLD TOUR MAP.
 *
 * A placeholder chart, and deliberately so: BUILD-PLAN 3B puts the map's ART
 * in Phase 7 ("eight illustrated destinations plus locked/unlocked states")
 * but the navigation, unlock state and persistence in Phase 4, "before there
 * is anything pretty to lose". The routing here is real. The coastline is not.
 *
 * WHY A FLAT CHART AND NOT A GLOBE. Seven of the eight destinations sit around
 * the North Atlantic and the Mediterranean, because the design doc's map is a
 * tour of WESTERN legend and says so as a rule rather than a gap. On a globe
 * that is one crowded hemisphere and a lot of empty ocean, which advertises
 * the gap. Cropped to the Atlantic, the empty edges read as the edge of the
 * known world instead — and the eighth destination, which is in orbit, can sit
 * OFF the chart entirely. The last table before Death being literally off the
 * edge of the map is escalation for free.
 */

const VIEW = { w: 1000, h: 520 }

/**
 * DROP-IN CHART ART.
 *
 * Put a file at `web/public/chart.png` and it becomes the map. Nothing else
 * changes: the destination marks float above it either way, because they are
 * buttons carrying locked/current/beaten state and cannot be part of a
 * picture. Without the file, the drawn chart below is used instead.
 *
 * WHAT THE ART HAS TO BE, and it is the same argument as the globe: framed to
 * the ATLANTIC AND MEDITERRANEAN, not the world. Seven of the eight
 * destinations sit between the American east coast and the Black Sea. On a
 * full world map they occupy about a tenth of the image, which on a phone
 * leaves a few hundred pixels to hold seven pins and their labels -- they
 * collide, and the other nine tenths is beautifully drawn content the tour
 * never visits.
 *
 * It also must NOT have a route or X marks drawn on it. Those are state, they
 * change as the player wins, and a baked-in set fights the real ones.
 *
 * ASSETS.md governs anything that ships: record where the file came from and
 * whether its licence allows commercial use before this goes anywhere public.
 */
const CHART_IMAGE = '/chart.png'

/** Chart positions, roughly geographic and adjusted for legibility. */
const MARKS: Record<TableId, { x: number; y: number; anchor: 'start' | 'end' | 'middle'; dy: number }> = {
  white_house: { x: 168, y: 236, anchor: 'start', dy: -16 },
  pirate_cove: { x: 214, y: 372, anchor: 'start', dy: 26 },
  camelot: { x: 660, y: 140, anchor: 'end', dy: 22 },
  baker_street: { x: 704, y: 92, anchor: 'start', dy: -14 },
  rome: { x: 790, y: 214, anchor: 'start', dy: 24 },
  athens: { x: 856, y: 264, anchor: 'end', dy: 26 },
  transylvania: { x: 874, y: 166, anchor: 'end', dy: -14 },
  // Inside the cartouche: this one is not on Earth.
  station: { x: 922, y: 62, anchor: 'middle', dy: 24 },
}

/** Land, simplified to the point of honesty: this is a chart, not an atlas. */
const LAND = [
  // North America, down the eastern seaboard. The coast runs east of the
  // first destination, so Washington sits inland rather than in the surf.
  'M -40,-40 L 300,-40 C 290,30 262,80 238,116 C 220,144 210,180 206,214 C 200,254 186,286 160,310 C 130,338 84,352 30,358 L -40,362 Z',
  // Florida, hooking down toward the islands.
  'M 160,310 C 186,318 202,338 208,362 C 212,384 204,398 192,402 C 180,388 168,352 156,330 Z',
  // The Caribbean arc, which is where Pirate Cove sits.
  'M 226,366 c 12,-5 20,2 17,9 -3,7 -16,8 -20,2 z',
  'M 254,382 c 13,-6 24,2 20,10 -5,8 -20,7 -24,1 z',
  'M 282,394 c 10,-4 18,1 15,8 -3,6 -14,7 -18,2 z',
  // The northern rim of South America.
  'M 250,436 C 292,424 336,442 360,478 C 376,504 382,530 380,560 L 232,560 C 226,514 234,468 250,436 Z',
  // Europe, with the Mediterranean bitten out of its southern edge.
  'M 596,-40 L 1040,-40 L 1040,120 C 1006,124 972,132 944,144 C 916,156 892,172 872,190 C 856,204 836,210 818,206 C 800,190 786,178 768,172 C 744,164 722,150 706,130 C 690,110 660,100 630,98 C 604,96 590,60 596,10 Z',
  // Italy, so Rome is on a peninsula and not in the sea.
  'M 782,176 C 793,181 799,196 797,214 C 795,232 787,245 776,247 C 769,238 772,213 774,195 Z',
  // Greece and the Balkans, likewise for Athens.
  'M 838,202 C 857,207 873,226 873,248 C 873,269 860,283 845,283 C 833,276 830,231 838,202 Z',
  // Britain, with a south-western tail. Camelot is on the tail, Baker Street
  // on the main body -- far enough apart to be two places.
  'M 682,58 C 700,52 714,64 716,86 C 718,106 710,124 696,130 C 686,134 676,128 673,118 C 668,126 658,138 650,143 C 643,137 654,120 664,112 C 668,96 670,70 682,58 Z',
  // Ireland.
  'M 636,86 C 646,82 653,92 651,105 C 649,117 639,123 633,115 C 627,107 628,90 636,86 Z',
  // North Africa, closing the Mediterranean from below.
  'M 600,306 C 672,280 760,272 848,282 C 928,292 996,314 1040,342 L 1040,560 L 590,560 C 582,466 586,372 600,306 Z',
]

const LABEL: Record<MarkState, string> = {
  beaten: 'cleared',
  current: 'next',
  locked: 'sealed',
}

export function WorldMap() {
  // Absent by default, so the drawn chart is what you get until a file is
  // dropped in. A 404 is the signal, which is why this is a public/ asset and
  // not an import -- an import of a missing file fails the build.
  const [art, setArt] = useState(true)
  /**
   * The chart box takes its ratio FROM THE IMAGE once it loads. The marks are
   * positioned in percentages, so they only land correctly if the box and the
   * art have the same shape -- and making that automatic removes a whole class
   * of "did you update the ratio too?" mistake when swapping art in and out.
   */
  const [ratio, setRatio] = useState(VIEW.w / VIEW.h)
  const params = new URLSearchParams(location.search)
  /**
   * ?calibrate=1 prints the viewBox coordinates of wherever you click, so
   * re-registering the eight marks against a new piece of art is a click each
   * rather than an afternoon of guessing.
   */
  const calibrate = params.get('calibrate') === '1'
  const [probe, setProbe] = useState<string>('')

  return (
    <main id="map" aria-label="World tour">
      <div
        className="chart"
        style={{ aspectRatio: String(ratio), ['--chart-ratio' as string]: String(ratio) }}
        onClick={
          calibrate
            ? (e) => {
                const r = e.currentTarget.getBoundingClientRect()
                const x = Math.round(((e.clientX - r.left) / r.width) * VIEW.w)
                const y = Math.round(((e.clientY - r.top) / r.height) * VIEW.h)
                setProbe(`{ x: ${x}, y: ${y} }`)
                void navigator.clipboard?.writeText(`{ x: ${x}, y: ${y} }`).catch(() => {})
              }
            : undefined
        }
      >
      {art && (
        <img
          className="art"
          src={CHART_IMAGE}
          alt=""
          onError={() => setArt(false)}
          onLoad={(e) => {
            const img = e.currentTarget
            if (img.naturalWidth && img.naturalHeight) {
              setRatio(img.naturalWidth / img.naturalHeight)
            }
          }}
        />
      )}
      {calibrate && probe && <output className="probe">{probe}</output>}
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        role="presentation"
        style={art ? { display: 'none' } : undefined}
      >
        <defs>
          <radialGradient id="vignette" cx="50%" cy="45%" r="74%">
            <stop offset="55%" stopColor="#6b4a1e" stopOpacity="0" />
            <stop offset="100%" stopColor="#4a3210" stopOpacity="0.6" />
          </radialGradient>
          {/* Tooth, without an asset and without a filter: a filter over a
              full-screen rect is the kind of thing that is free on a desktop
              and expensive on a phone. */}
          <pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.6" fill="#5b4522" opacity="0.16" />
            <circle cx="5" cy="4.5" r="0.5" fill="#5b4522" opacity="0.11" />
          </pattern>
        </defs>

        <rect x="0" y="0" width={VIEW.w} height={VIEW.h} className="sea" />

        {/* Rhumb lines: the chart's own grid, radiating from the compass. */}
        <g className="rhumb">
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i * Math.PI) / 8
            return (
              <line
                key={i}
                x1={460} y1={300}
                x2={460 + Math.cos(a) * 900} y2={300 + Math.sin(a) * 900}
              />
            )
          })}
        </g>

        <g className="land">
          {LAND.map((d, i) => <path key={i} d={d} />)}
        </g>

        {/* The route, in tour order. It zig-zags because the tour does. */}
        <polyline
          className="route"
          points={TABLES.map((t) => `${MARKS[t.id].x},${MARKS[t.id].y}`).join(' ')}
        />

        {/* A cartouche in the corner, as a chart of this vintage would have.
            It is where the eighth destination goes, because the eighth
            destination is in orbit and cannot be a dot on the sea. */}
        <g className="cartouche">
          <rect x="852" y="16" width="140" height="96" rx="4" />
          <rect x="857" y="21" width="130" height="86" rx="3" className="inner" />
          <text x="922" y="38" textAnchor="middle">BEYOND THE MAP</text>
        </g>

        <g className="compass" transform="translate(460 300)">
          <circle r="46" />
          <circle r="30" />
          <path d="M 0,-52 L 9,0 L 0,52 L -9,0 Z" />
          <path d="M -52,0 L 0,-9 L 52,0 L 0,9 Z" />
          <text y="-58" textAnchor="middle">N</text>
        </g>

        <rect x="0" y="0" width={VIEW.w} height={VIEW.h} fill="url(#grain)" />
        <rect x="0" y="0" width={VIEW.w} height={VIEW.h} fill="url(#vignette)" />

        {/* A double rule inset from the edge. More than anything else here,
            this is what makes it read as a chart rather than a picture. */}
        <g className="frame">
          <rect x="10" y="10" width={VIEW.w - 20} height={VIEW.h - 20} />
          <rect x="16" y="16" width={VIEW.w - 32} height={VIEW.h - 32} className="thin" />
        </g>
      </svg>

      {/* Marks are buttons over the chart, not SVG shapes, so they are real
          focusable controls with real hit areas on a phone. */}
      <div className="marks">
        {TABLES.map((t) => {
          const m = MARKS[t.id]
          const state = markState(t.id)
          return (
            <button
              key={t.id}
              type="button"
              className={`mark ${state}`}
              style={{ left: `${(m.x / VIEW.w) * 100}%`, top: `${(m.y / VIEW.h) * 100}%` }}
              disabled={!canEnter(t.id)}
              aria-label={`${t.position}. ${t.displayName} — ${LABEL[state]}`}
              onClick={() => { click(); enter(t.id) }}
            >
              <span className="pin" aria-hidden="true">{state === 'beaten' ? '✕' : t.position}</span>
              <span className={`label ${m.anchor}`} style={{ transform: `translateY(${m.dy}px)` }}>
                {t.displayName}
              </span>
            </button>
          )
        })}
      </div>
      </div>
    </main>
  )
}
