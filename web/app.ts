import * as store from './store.js'
import { titleScreen, invitationScreen } from './screens/title.js'
import { mapScreen, introScreen } from './screens/map.js'
import { tableScreen } from './screens/table.js'
import { resultsScreen } from './screens/results.js'
import { ledgerScreen } from './screens/ledger.js'
import { settingsScreen, aboutScreen } from './screens/settings.js'
import { endingScreen } from './screens/ending.js'

/**
 * The shell: one hash router over plain screens.
 *
 * Hash routes, not paths, so the game still opens straight from disk (the
 * bundle is a classic script for the same reason) and the browser's back
 * button works without a server that knows about routes. BUILD-PLAN wanted
 * navigation and persistence stood up before there is anything pretty to
 * lose; this is that, small.
 *
 *   #/                 title
 *   #/invite           the invitation (new player)
 *   #/tour             the map
 *   #/intro/:table     Death's intro, then the chair  (…/open for open tables)
 *   #/table            the table in progress
 *   #/results          after a table
 *   #/ledger/:tab/:id  the ledger
 *   #/settings  #/about  #/ending
 */

type Screen = (root: HTMLElement, params: string[]) => void | (() => void)

const ROUTES: Record<string, Screen> = {
  '': titleScreen,
  invite: invitationScreen,
  tour: mapScreen,
  intro: introScreen,
  table: tableScreen,
  results: resultsScreen,
  ledger: ledgerScreen,
  settings: settingsScreen,
  about: aboutScreen,
  ending: endingScreen,
}

let cleanup: (() => void) | void = undefined

function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent)
  const [name = '', ...params] = parts
  const screen = ROUTES[name] ?? titleScreen
  const root = document.getElementById('app')!
  if (cleanup) cleanup()
  cleanup = undefined
  root.replaceChildren()
  root.dataset.screen = name || 'title'
  window.scrollTo(0, 0)
  cleanup = screen(root, params)
}

function boot() {
  store.load()
  store.applySettings()
  window.addEventListener('hashchange', route)
  // Decisions are written as they are made; this only catches the habits
  // noted since the last hand ended.
  window.addEventListener('pagehide', () => store.flush())
  route()
}

boot()
