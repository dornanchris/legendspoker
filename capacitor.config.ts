import type { CapacitorConfig } from '@capacitor/cli'

/**
 * The phone wrapper. Web-first is the plan (BUILD-PLAN section 1, $0 budget),
 * so this exists to put the same build on a real device rather than to become
 * a separate target.
 *
 * ANDROID ONLY, for now. Capacitor's iOS target needs a Mac with Xcode plus
 * $99/yr; the dev machine is Windows, and Android is $25 once. iOS is
 * deferred, not designed out.
 */
const config: CapacitorConfig = {
  appId: 'com.legendspoker.app',
  appName: 'Legends Poker',
  // Whatever `npm run build:web` produced. Capacitor copies it verbatim.
  webDir: 'dist',
  android: {
    // The felt is dark and the page paints its own background; a white flash
    // between splash and first paint is the one thing that reads as broken.
    backgroundColor: '#12100f',
  },
  server: {
    androidScheme: 'https',
  },
}

export default config
