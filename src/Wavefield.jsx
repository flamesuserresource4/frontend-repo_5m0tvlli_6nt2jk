import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

// Dynamic layered wavefield with parallax, subtle glow and particles
export default function Wavefield({ className = '' }) {
  const containerRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), { stiffness: 80, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 80, damping: 20 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mx.set(x)
      my.set(y)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Ambient orange edge glow */}
      <div className="absolute inset-0 opacity-50 mix-blend-screen" style={{
        background: 'radial-gradient(1200px 600px at 80% 20%, rgba(255,106,0,0.10), rgba(0,0,0,0)), radial-gradient(900px 500px at 20% 80%, rgba(255,140,50,0.08), rgba(0,0,0,0))'
      }} />

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="absolute inset-0">
        {/* Neural grid texture */}
        <div className="absolute -inset-20 opacity-[0.08]" style={{
          backgroundImage: 'repeating-linear-gradient(120deg, rgba(255,106,0,0.08) 0px, rgba(255,106,0,0.08) 1px, transparent 1px, transparent 6px)',
          filter: 'blur(1px)'
        }} />

        {/* Flowing wave bands (parallax layers) */}
        <div className="absolute bottom-[10%] left-0 right-0 h-40">
          <WaveBand speed={18} amplitude={16} opacity={0.22} />
        </div>
        <div className="absolute bottom-[22%] left-0 right-0 h-44">
          <WaveBand speed={28} amplitude={24} opacity={0.16} />
        </div>
        <div className="absolute top-[18%] left-0 right-0 h-32">
          <WaveBand speed={22} amplitude={12} opacity={0.12} invert />
        </div>

        {/* Subtle particle trails / DSP micro-glitches */}
        <Particles count={28} />
      </motion.div>
    </div>
  )
}

function WaveBand({ speed = 20, amplitude = 20, opacity = 0.2, invert = false }) {
  const id = useRef(Math.random().toString(36).slice(2))
  const gradientId = `grad-${id.current}`
  const maskId = `mask-${id.current}`
  const path = createWavePath(1200, amplitude, invert)

  return (
    <div className="absolute inset-0">
      <svg className="absolute w-[200%] h-full" preserveAspectRatio="none" viewBox="0 0 1200 200" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.0" />
            <stop offset="20%" stopColor="#FF6A00" stopOpacity={opacity} />
            <stop offset="50%" stopColor="#FF8C32" stopOpacity={opacity} />
            <stop offset="80%" stopColor="#FF6A00" stopOpacity={opacity} />
            <stop offset="100%" stopColor="#FF6A00" stopOpacity="0.0" />
          </linearGradient>
          <mask id={maskId}>
            <rect width="1200" height="200" fill="url(#fadeMask)" />
          </mask>
          <linearGradient id="fadeMask" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="15%" stopColor="white" stopOpacity="1" />
            <stop offset="85%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g mask={`url(#${maskId})`}>
          <AnimatedPath d={path} gradient={gradientId} speed={speed} />
          <AnimatedPath d={path} gradient={gradientId} speed={speed} offset={1200} />
        </g>
      </svg>
    </div>
  )
}

function AnimatedPath({ d, gradient, speed, offset = 0 }) {
  return (
    <g style={{ transform: `translateX(-${offset}px)` }} className="will-change-transform">
      <path d={d} fill="none" stroke={`url(#${gradient})`} strokeWidth="2" style={{ animation: `wave-move ${speed}s linear infinite` }} />
      <path d={d} fill="none" stroke={`url(#${gradient})`} strokeWidth="6" className="opacity-20" style={{ filter: 'blur(8px)', animation: `wave-move ${speed}s linear infinite` }} />
    </g>
  )
}

function createWavePath(width, amplitude, invert) {
  const height = 200
  const mid = height / 2
  const segments = 8
  const segW = width / segments
  let d = `M 0 ${mid}`
  for (let i = 0; i < segments; i++) {
    const x1 = i * segW + segW * 0.25
    const x2 = i * segW + segW * 0.75
    const x = (i + 1) * segW
    const dir = i % 2 === 0 ? 1 : -1
    const a = (invert ? -1 : 1) * dir * amplitude
    d += ` C ${x1} ${mid + a}, ${x2} ${mid - a}, ${x} ${mid}`
  }
  return d
}

function Particles({ count = 24 }) {
  const items = Array.from({ length: count }).map((_, i) => {
    const top = Math.random() * 100
    const delay = Math.random() * 8
    const duration = 8 + Math.random() * 8
    const size = 1 + Math.random() * 2
    const opacity = 0.05 + Math.random() * 0.12
    const blur = Math.random() * 2
    return { id: i, top, delay, duration, size, opacity, blur }
  })

  return (
    <div className="absolute inset-0">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute -left-10 rounded-full bg-[#FF8C32]"
          style={{
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
            animation: `particle-move ${p.duration}s linear ${p.delay}s infinite`
          }}
        />
      ))}
    </div>
  )
}
