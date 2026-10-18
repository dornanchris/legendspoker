/**
 * The player's colour: the Stranger's scarf, hat band and glove cuffs (drawn
 * teal), chosen freely in Settings so the player's own figure differs a
 * little until others are unlocked. The images carry masks of where the teal
 * is (art-tools/avatar_parts/accent_masks.py); loadRig tints those pixels with
 * the canvas "color" blend, which keeps the drawing's light and shadow, and a
 * `lift` of white screened over the mask for the pale colours (the teal is
 * dark, and the color blend keeps its darkness). It never reads pixels, so it
 * works from file://.
 */
export type AccentName = 'teal' | 'crimson' | 'gold' | 'violet' | 'ivory'

export const ACCENTS: Record<AccentName, { label: string; swatch: string; color: string | null; lift: number; liftColor?: string }> = {
  teal: { label: 'Teal', swatch: '#1f6b6e', color: null, lift: 0 },
  crimson: { label: 'Crimson', swatch: '#a3243a', color: '#c0213d', lift: 0.05 },
  gold: { label: 'Gold', swatch: '#c79a2e', color: '#f0a818', lift: 0.55, liftColor: '#b07a00' },
  violet: { label: 'Violet', swatch: '#6d3aa6', color: '#7d3cc0', lift: 0.08 },
  ivory: { label: 'Ivory', swatch: '#e6dcc4', color: '#efe4c8', lift: 0.45 },
}

/** What loadRig needs to tint a rig's accent: the colour, its lift, and the images with a mask. */
export type Accent = { color: string; lift: number; liftColor?: string; masks: string[] }

export function accentFor(name: string | undefined, masks: string[] | undefined): Accent | undefined {
  const a = ACCENTS[(name ?? 'teal') as AccentName]
  return a?.color && masks?.length ? { color: a.color, lift: a.lift, liftColor: a.liftColor, masks } : undefined
}
