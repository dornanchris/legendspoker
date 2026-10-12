import { h, go } from '../dom.js'
import { CHARACTERS } from '../../src/content.js'
import { PUPPETS } from '../puppet/cast.js'
import { PuppetPlayer } from '../puppet/player.js'
import { type Mat, mul, translate, scale } from '../puppet/rig.js'

/**
 * #/puppet/<id>: the puppet bench. Not part of the game; a place to trigger,
 * loop, slow down and scrub every animation a puppet has, beside the
 * illustration it was built to match.
 *
 *   Space  replay the selected clip      B  blink      S  speak the line
 */
export function puppetScreen(root: HTMLElement, params: string[]): () => void {
  const id = params[0] ?? 'lincoln'
  const entry = PUPPETS[id]
  if (!entry) {
    root.append(h('div', { class: 'bench' }, h('p', null, `No puppet "${id}". Known: ${Object.keys(PUPPETS).join(', ')}.`)))
    return () => {}
  }
  const canvas = h('canvas', { class: 'bench-canvas' }) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')!
  const status = h('p', { class: 'bench-status' }, 'Loading…')
  const refImg = h('img', { class: 'bench-ref', alt: '' }) as HTMLImageElement
  const panel = h('div', { class: 'bench-panel' })
  root.append(h('div', { class: 'bench' },
    h('div', { class: 'bench-stage' }, canvas, h('figure', { class: 'bench-ref-wrap' }, refImg, h('figcaption', null, 'reference'))),
    h('div', { class: 'bench-side' },
      h('h2', null, `${entry.rig.name}: puppet bench`), status, panel,
      h('p', { class: 'bench-help' }, 'Space replays the clip, B blinks, S speaks. ', h('a', { href: '#/' }, 'Back to the game')))))

  let player: PuppetPlayer | null = null
  let raf = 0
  let last = performance.now()
  let selected = ''
  const opts = { table: true, mirror: false, zoom: 'body' as 'body' | 'face', pivots: false, loop: false }

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (player) {
      player.update(dt)
      draw(player)
      const t = player.timeOf(selected)
      if (scrub && !player.hold) scrub.value = String(t < 0 ? 0 : t)
    }
    raf = requestAnimationFrame(frame)
  }

  function draw(p: PuppetPlayer) {
    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth, hgt = canvas.clientHeight
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(hgt * dpr)) {
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(hgt * dpr)
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = '#16141a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // what of the rig's canvas to show: the whole seat, or the face close up
    // the head where it is this frame (a clip can carry it: a lean over the table)
    const hp = p.puppet.pivots().find((b) => b.name === 'head')!
    const head = [hp.x, hp.y]
    const box = opts.zoom === 'face'
      ? [head[0] - 150, head[1] - 300, 300, 330]
      : [150, 300, 800, 700]
    const k = Math.min(canvas.width / box[2], canvas.height / box[3])
    let view: Mat = translate((canvas.width - box[2] * k) / 2, (canvas.height - box[3] * k) / 2)
    view = mul(view, scale(k, k))
    view = mul(view, translate(-box[0], -box[1]))
    if (opts.mirror) view = mul(mul(view, translate(box[0] * 2 + box[2], 0)), scale(-1, 1))
    ctx.imageSmoothingQuality = 'high'
    p.puppet.draw(ctx, view, { table: opts.table })
    if (opts.pivots) {
      ctx.setTransform(view[0], view[1], view[2], view[3], view[4], view[5])
      ctx.fillStyle = '#ff3d8b'
      ctx.font = '12px sans-serif'
      for (const q of p.puppet.pivots()) {
        ctx.beginPath(); ctx.arc(q.x, q.y, 4, 0, Math.PI * 2); ctx.fill()
        ctx.fillText(q.name, q.x + 6, q.y - 6)
      }
    }
  }

  let scrub: HTMLInputElement | null = null
  let speakNow = () => {}

  PuppetPlayer.load(entry).then((p) => {
    player = p
    ;(window as any).__puppet = p
    ;(window as any).__bench = opts
    status.textContent = ''
    buildPanel(p)
    raf = requestAnimationFrame(frame)
  }).catch((e) => { status.textContent = String(e) })

  function buildPanel(p: PuppetPlayer) {
    const group = (title: string, ...kids: (Node | Node[])[]) =>
      h('section', { class: 'bench-group' }, h('h3', null, title), ...kids.flat())
    const btn = (label: string, fn: () => void, cls = '') => h('button', { type: 'button', class: cls, onclick: fn }, label)
    const check = (label: string, on: boolean, fn: (v: boolean) => void) => {
      const i = h('input', { type: 'checkbox', checked: on }) as HTMLInputElement
      i.addEventListener('change', () => fn(i.checked))
      return h('label', { class: 'bench-check' }, i, label)
    }
    const radio = (choices: string[], current: string, fn: (v: string) => void) => {
      const box = h('div', { class: 'segmented' })
      for (const c of choices) {
        const b = h('button', { type: 'button', class: c === current ? 'on' : '' }, c)
        b.addEventListener('click', () => {
          for (const o of box.children) o.classList.remove('on')
          b.classList.add('on')
          fn(c)
        })
        box.append(b)
      }
      return box
    }

    // clips
    selected = p.clipNames[0] ?? ''
    const ref = (name: string) => {
      const f = p.entry.anim.reference?.[name]
      refImg.src = f ? p.entry.base + f : ''
      refImg.parentElement!.style.display = f ? '' : 'none'
    }
    ref(selected)
    scrub = h('input', { type: 'range', min: 0, max: p.entry.anim.clips[selected]?.duration ?? 1, step: 0.01, value: 0 }) as HTMLInputElement
    scrub.addEventListener('input', () => p.seek(selected, Number(scrub!.value)))
    const speed = radio(['0.25', '0.5', '1'], '1', (v) => { p.speed = Number(v) })
    const replay = () => { p.hold = false; p.play(selected, opts.loop) }
    const clipButtons = p.clipNames.map((n) => btn(n, () => {
      selected = n
      ref(n)
      scrub!.max = String(p.entry.anim.clips[n].duration)
      replay()
    }, 'bench-play'))

    // face
    const faces = p.entry.rig.face
    const mouths = faces.mouth ?? []
    const callouts = Object.values(CHARACTERS[id]?.callouts ?? {}).flat()
    const line = h('select', { class: 'bench-line' }, callouts.map((c) => h('option', null, c))) as HTMLSelectElement
    const own = h('input', { type: 'text', placeholder: 'or type a line', class: 'bench-text' }) as HTMLInputElement
    let loopSpeech = false
    const speak = () => p.face.say(own.value.trim() || line.value)
    speakNow = speak
    p.face.onSpeechEnd = () => { if (loopSpeech) setTimeout(speak, 600) }

    panel.append(
      group('Clips', clipButtons,
        h('div', { class: 'bench-row' }, btn('Replay', replay), btn('Stop', () => { p.stop(); p.hold = false }),
          check('Loop', opts.loop, (v) => { opts.loop = v; p.setLoop(selected, v); if (v && p.timeOf(selected) < 0) replay() })),
        h('div', { class: 'bench-row' }, h('span', null, 'Speed'), speed),
        h('div', { class: 'bench-row' }, h('span', null, 'Scrub'), scrub)),
      group('Eyes',
        h('div', { class: 'bench-row' }, btn('Blink', () => p.face.blink()), btn('Double blink', () => p.face.blink(true)),
          check('Blink on its own', true, (v) => { p.face.autoBlink = v })),
        radio(['ahead', ...(faces.eyes ?? []).filter((e) => !['half', 'closed'].includes(e))], 'ahead', (v) => { p.face.gaze = v }),
        h('div', { class: 'bench-row' }, h('span', null, 'Hold'),
          radio(['open', 'half', 'closed'], 'open', (v) => { p.face.gaze = v === 'open' ? 'ahead' : v }))),
      group('Brows', radio(['neutral', ...(faces.brows ?? [])], 'neutral', (v) => { p.face.brows = v })),
      group('Mouth',
        h('div', { class: 'bench-row' }, line),
        h('div', { class: 'bench-row' }, own, btn('Speak', speak), check('Loop', false, (v) => { loopSpeech = v; if (v && !p.face.speaking) speak() })),
        radio(['none', ...mouths], 'none', (v) => { p.face.mouth = v === 'none' ? null : v })),
      group('Life', check('Idle motion (sway, breath, glances, blinks)', true, (v) => { p.face.idle = v })),
      group('View',
        radio(['body', 'face'], 'body', (v) => { opts.zoom = v as 'body' | 'face' }),
        h('div', { class: 'bench-row' },
          check('Table', true, (v) => { opts.table = v }),
          check('Mirror (a seat on the right)', false, (v) => { opts.mirror = v }),
          check('Pivots', false, (v) => { opts.pivots = v }))),
    )
  }

  const onKey = (e: KeyboardEvent) => {
    if (!player || (e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'SELECT') return
    if (e.key === ' ') { e.preventDefault(); player.hold = false; player.play(selected, opts.loop) }
    else if (e.key === 'b') player.face.blink()
    else if (e.key === 's') speakNow()
    else if (e.key === 'Escape') go('#/')
  }
  window.addEventListener('keydown', onKey)
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('keydown', onKey)
    delete (window as any).__puppet
  }
}
