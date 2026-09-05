import { createRoot } from 'react-dom/client'
import { App } from './App.js'
import { unlock } from './audio.js'
import './style.css'

/**
 * No StrictMode. It double-invokes effects in development, and the table is
 * driven by an async engine loop rather than by React -- starting it twice
 * would deal two games into one view.
 */
createRoot(document.getElementById('root')!).render(<App />)

// Audio has to be armed by a real gesture, and the FIRST one is the only one
// guaranteed to happen before the player expects sound. Capture-phase so it
// runs before the button's own handler tries to make a noise.
addEventListener('pointerdown', unlock, { capture: true })
