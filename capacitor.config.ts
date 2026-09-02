import type { CapacitorConfig } from '@capacitor/cli'

/**
 * The phone wrapper. Web-first is the plan (BUILD-PLAN section 1, $0 budget),
 * so this exists to put the same build on a real device rather than to become
 * a separate target.
 *
 * ANDROID is the only platform ADDED so far. Capacitor's iOS target needs a
 * Mac with Xcode plus $99/yr to put a build on a device; the dev machine is
 * Windows, and Android is $25 once.
 *
 * The `ios` block below is configured anyway. It costs nothing, and it means
 * `npx cap add ios` on a borrowed Mac is one command rather than a
 * configuration exercise. Until then an iPhone runs the same build in Safari
 * over the LAN, which is what the landscape, safe-area and audio-unlock
 * checks actually need.
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
  ios: {
    backgroundColor: '#12100f',
    // Bounce-scrolling a table that does not scroll only ever looks broken.
    scrollEnabled: false,
  },
  server: {
    androidScheme: 'https',
  },
}

export default config
