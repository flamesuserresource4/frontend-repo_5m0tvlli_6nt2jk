import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import AudioSpectrum from './components/AudioSpectrum'

function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[#FF6A00] to-[#FF8C32]"></div>
          <span className="text-white font-semibold tracking-tight">BDSound</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#live" className="text-white/70 hover:text-white transition">Live</a>
          <a href="#features" className="text-white/70 hover:text-white transition">Features</a>
          <a href="#contact" className="text-white/70 hover:text-white transition">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#FF6A00] to-[#FF8C32] text-black font-semibold hover:brightness-110 transition">
            Request Demo <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="live" className="relative min-h-[92vh] w-full overflow-hidden bg-[#000000]">
      {/* Ambient orange glows */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(900px_500px_at_80%_20%,rgba(255,106,0,0.12),transparent),radial-gradient(800px_400px_at_10%_85%,rgba(255,140,50,0.10),transparent)]" />
      {/* Subtle neural grid */}
      <div className="pointer-events-none absolute -inset-10 z-0 opacity-[0.06]" style={{
        backgroundImage: 'repeating-linear-gradient(120deg, rgba(255,106,0,0.08) 0px, rgba(255,106,0,0.08) 1px, transparent 1px, transparent 6px)'
      }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 mb-4">
          <Sparkles size={14} className="text-[#FF8C32]" /> Advanced Noise Reduction Intelligence®
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.05] text-white">
          Spettro Vivo. Silenzio Intelligente.
        </h1>
        <p className="mt-6 max-w-2xl text-white/80 text-lg">
          Nero profondo. Arancio vibrante. Guarda il suono accendere lo spettro in tempo reale.
        </p>

        <div className="mt-10 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 shadow-[0_0_80px_rgba(255,106,0,0.08)]">
          <AudioSpectrum height={240} barCount={112} />
        </div>
        <p className="mt-3 text-white/60 text-sm">Clicca “Attiva audio” per usare il microfono o avviare una demo sintetica.</p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-[#FF6A00] to-[#FF8C32] text-black font-semibold hover:brightness-110 transition">
            Prova la Demo <ArrowRight size={18} />
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/20 text-white/90 hover:bg-white/5 transition">
            Scopri la Tecnologia
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="relative bg-[#0A0A0A] py-20">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
        {[{
          title: 'Neural Noise Suppression', desc: 'Modelli deep-learning addestrati su scenari reali per isolare la voce.'
        },{
          title: 'AEC + Beamforming', desc: 'Cancellazione eco e filtri spaziali adattivi con latenza ultra-bassa.'
        },{
          title: 'Edge & Cloud SDK', desc: 'Librerie ottimizzate per ARM/DSP e API scalabili per piattaforme UCaaS.'
        }].map((f) => (
          <div key={f.title} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8">
            <h3 className="text-white font-semibold mb-2">{f.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[#FF6A00] to-[#FF8C32]"></div>
          <span className="text-white font-semibold tracking-tight">BDSound</span>
        </div>
        <span className="text-xs text-white/50">© {new Date().getFullYear()} BDSound. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <NavBar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
