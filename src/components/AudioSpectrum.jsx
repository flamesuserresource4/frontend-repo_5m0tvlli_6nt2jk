import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'

// Audio-reactive spectrum visualizer with neon orange glow
export default function AudioSpectrum({ height = 200, barCount = 96, className = '' }) {
  const canvasRef = useRef(null)
  const audioRef = useRef({ ctx: null, analyser: null, src: null, data: null, raf: 0 })
  const [active, setActive] = useState(false)
  const [permissionError, setPermissionError] = useState('')

  useEffect(() => {
    return () => stop()
  }, [])

  const start = async () => {
    setPermissionError('')
    try {
      if (!audioRef.current.ctx) {
        audioRef.current.ctx = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioRef.current.ctx

      // Try microphone first
      let stream
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { noiseSuppression: false, echoCancellation: false, autoGainControl: false } })
      } catch (e) {
        setPermissionError('Microfono non disponibile. Avvio demo audio sintetico.')
      }

      let source
      if (stream) {
        source = ctx.createMediaStreamSource(stream)
      } else {
        // Fallback demo: synthesized noise + low osc to visualize without mic
        const osc = ctx.createOscillator()
        osc.type = 'sawtooth'
        osc.frequency.value = 180
        const lfo = ctx.createOscillator()
        lfo.frequency.value = 0.7
        const lfoGain = ctx.createGain()
        lfoGain.gain.value = 140
        lfo.connect(lfoGain)
        lfoGain.connect(osc.frequency)
        const noise = ctx.createBufferSource()
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.25
        noise.buffer = buffer
        noise.loop = true

        const mix = ctx.createGain()
        mix.gain.value = 0.7
        osc.connect(mix)
        noise.connect(mix)
        source = mix
        osc.start()
        lfo.start()
        noise.start()
      }

      const analyser = ctx.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = 0.82
      const data = new Uint8Array(analyser.frequencyBinCount)

      source.connect(analyser)
      analyser.connect(ctx.destination) // quiet monitoring
      audioRef.current = { ctx, analyser, src: source, data, raf: 0 }
      setActive(true)
      draw()
    } catch (err) {
      setPermissionError('Impossibile avviare l\'audio')
      console.error(err)
    }
  }

  const stop = () => {
    setActive(false)
    const { ctx, raf } = audioRef.current
    if (raf) cancelAnimationFrame(raf)
    // We leave AudioContext alive to allow quick resume
    audioRef.current.raf = 0
  }

  const draw = () => {
    const canvas = canvasRef.current
    const { analyser, data } = audioRef.current
    if (!canvas || !analyser) return
    const ctx2d = canvas.getContext('2d')

    const render = () => {
      analyser.getByteFrequencyData(data)
      const w = canvas.width = canvas.offsetWidth * devicePixelRatio
      const h = canvas.height = height * devicePixelRatio
      ctx2d.clearRect(0, 0, w, h)

      // Background subtle vignette
      const grad = ctx2d.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, 'rgba(0,0,0,0.0)')
      grad.addColorStop(1, 'rgba(0,0,0,0.15)')
      ctx2d.fillStyle = grad
      ctx2d.fillRect(0, 0, w, h)

      const bins = barCount
      const step = Math.floor(data.length / (bins * 1.2))
      const barWidth = w / bins

      // Orange neon glow shadow
      ctx2d.shadowColor = 'rgba(255,106,0,0.35)'
      ctx2d.shadowBlur = 18 * devicePixelRatio

      for (let i = 0; i < bins; i++) {
        // Emphasize mids for speech band feel
        const idx = Math.min(data.length - 1, Math.floor(i * step * (0.9 + 0.2 * Math.random())))
        const v = data[idx] / 255
        const eased = Math.pow(v, 1.6)
        const barH = Math.max(2, eased * (h * 0.9))
        const x = i * barWidth + barWidth * 0.15
        const y = h - barH

        // Gradient fill per bar
        const g = ctx2d.createLinearGradient(0, y, 0, h)
        g.addColorStop(0, 'rgba(255,140,50,0.95)')
        g.addColorStop(1, 'rgba(255,106,0,0.75)')
        ctx2d.fillStyle = g
        // Rounded bar
        const radius = Math.min(6 * devicePixelRatio, barWidth * 0.45)
        roundRect(ctx2d, x, y, barWidth * 0.7, barH, radius)
        ctx2d.fill()

        // Peak cap
        ctx2d.fillStyle = 'rgba(255,170,120,0.9)'
        ctx2d.fillRect(x, y - 2 * devicePixelRatio, barWidth * 0.7, 2 * devicePixelRatio)
      }

      // Subtle scanline
      ctx2d.shadowBlur = 0
      ctx2d.globalCompositeOperation = 'lighter'
      ctx2d.fillStyle = 'rgba(255,106,0,0.07)'
      for (let i = 0; i < 6; i++) {
        const yLine = (performance.now() / 800 + i * 20) % h
        ctx2d.fillRect(0, yLine, w, 1)
      }
      ctx2d.globalCompositeOperation = 'source-over'

      audioRef.current.raf = requestAnimationFrame(render)
    }

    render()
  }

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_70%_20%,rgba(255,106,0,0.10),transparent),radial-gradient(800px_400px_at_10%_90%,rgba(255,140,50,0.09),transparent)]" />
      <div className="absolute -inset-2 rounded-xl border border-white/10/0" />
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {!active ? (
          <motion.button
            onClick={start}
            whileTap={{ scale: 0.98 }}
            className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-[#FF6A00] to-[#FF8C32] text-black text-sm font-semibold shadow-[0_0_40px_rgba(255,106,0,0.25)]"
            aria-label="Attiva microfono"
          >
            <Mic size={16} /> Attiva audio
          </motion.button>
        ) : (
          <motion.button
            onClick={stop}
            whileTap={{ scale: 0.98 }}
            className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 text-white text-sm"
            aria-label="Disattiva microfono"
          >
            <MicOff size={16} /> Stop
          </motion.button>
        )}
      </div>
      {permissionError && (
        <div className="pointer-events-none absolute left-2 bottom-2 text-xs text-white/60">{permissionError}</div>
      )}
    </div>
  )
}

function roundRect(ctx, x, y, w, h, r) {
  const min = Math.min(w, h) / 2
  r = Math.min(r, min)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
