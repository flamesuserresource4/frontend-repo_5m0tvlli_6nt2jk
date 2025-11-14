import React from 'react'
import { ArrowRight, Shield, Cpu, Waves, Sparkles, Headphones, Car, Video, Globe, CpuIcon } from 'lucide-react'
import Spline from '@splinetool/react-spline'
import Wavefield from './Wavefield'

function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[#FF6A00] to-[#FF8C32]"></div>
          <span className="text-white font-semibold tracking-tight">BDSound</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#solutions" className="text-white/70 hover:text-white transition">Solutions</a>
          <a href="#industries" className="text-white/70 hover:text-white transition">Industries</a>
          <a href="#technology" className="text-white/70 hover:text-white transition">Technology</a>
          <a href="#about" className="text-white/70 hover:text-white transition">About</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:inline-flex px-4 py-2 text-sm text-white/80 hover:text-white transition">Contact</button>
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
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#0A0A0A]">
      {/* Spline 3D background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Dynamic wavefield overlay */}
      <div className="absolute inset-0 z-[1]">
        <Wavefield />
      </div>

      {/* Top gradient glow */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_top,rgba(255,106,0,0.22),transparent_55%)]"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-28 flex flex-col items-start">
        <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 mb-4">
          <Sparkles size={14} className="text-[#FF8C32]" /> Advanced Noise Reduction Intelligence®
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.05] text-white">
          Silence engineered.
          <br />
          Clarity at global scale.
        </h1>
        <p className="mt-6 max-w-2xl text-white/80 text-lg">
          BDSound delivers state-of-the-art acoustic intelligence for vehicles and communication platforms.
          Transform chaos into crystal-clear conversations with production-ready DSP and deep learning.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-[#FF6A00] to-[#FF8C32] text-black font-semibold hover:brightness-110 transition">
            Get a Live Demo <ArrowRight size={18} />
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/20 text-white/90 hover:bg-white/5 transition">
            Explore Technology
          </button>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 opacity-80">
          {[
            'Automotive OEMs',
            'Tier-1 Suppliers',
            'UCaaS Platforms',
            'Headsets',
            'Cameras',
            'Smart Devices',
          ].map((item) => (
            <div key={item} className="text-xs text-white/60">{item}</div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
    </section>
  )
}

function Pill({ icon: Icon, title, desc }) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition shadow-[0_0_0_1px_rgba(255,106,0,0.06)_inset]">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FF6A00] to-[#FF8C32] grid place-items-center text-black">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-white font-semibold mb-1">{title}</h3>
          <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="absolute -inset-px rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition" style={{ boxShadow: '0 0 40px rgba(255,106,0,0.08) inset' }} />
    </div>
  )
}

function Features() {
  return (
    <section id="solutions" className="relative bg-[#0A0A0A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Production-grade acoustic intelligence</h2>
            <p className="mt-3 text-white/70 max-w-2xl">Deploy noise reduction that scales from silicon to cloud, tuned for real-world environments and enterprise reliability.</p>
          </div>
          <div className="text-white/60 text-sm">Trusted worldwide</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Pill icon={Waves} title="Neural Noise Suppression" desc="Deep-learning models trained on diverse acoustic datasets to isolate speech in extreme conditions." />
          <Pill icon={Shield} title="AEC + Residual Echo Control" desc="Advanced echo cancellation that preserves voice presence and removes artifacts across devices." />
          <Pill icon={Cpu} title="On-Device DSP" desc="Highly optimized pipelines for embedded targets with ultralow latency and minimal compute budgets." />
          <Pill icon={Headphones} title="Beamforming & Mic Arrays" desc="Adaptive spatial filtering and multi-mic fusion for cabin and conference scenarios." />
          <Pill icon={Video} title="Far-field & Video Conferencing" desc="Crystal clarity for meeting rooms, personal setups, and collaboration platforms." />
          <Pill icon={Globe} title="SDKs & Cloud APIs" desc="Flexible integration options with robust tooling, monitoring, and enterprise support." />
        </div>
      </div>
    </section>
  )
}

function Industries() {
  return (
    <section id="industries" className="relative bg-[#000000] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Built for demanding industries</h2>
          <div className="hidden md:block text-white/60 text-sm">Proven in market</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8">
            <div className="flex items-center gap-3 mb-3">
              <Car className="text-[#FF6A00]" />
              <h3 className="text-white font-semibold">Automotive</h3>
            </div>
            <p className="text-white/70">Reduce road, wind, and powertrain noise while ensuring flawless voice assistants and in-cabin calls. Validated with OEM requirements and automotive-grade constraints.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8">
            <div className="flex items-center gap-3 mb-3">
              <Video className="text-[#FF6A00]" />
              <h3 className="text-white font-semibold">Video Conference</h3>
            </div>
            <p className="text-white/70">Deliver studio-grade clarity for UCaaS and collaboration suites. Seamless integration with SDKs and accelerated inference on modern hardware.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8">
            <div className="flex items-center gap-3 mb-3">
              <CpuIcon className="text-[#FF6A00]" />
              <h3 className="text-white font-semibold">Embedded SDKs</h3>
            </div>
            <p className="text-white/70">Production-ready libraries for ARM, DSPs, and NPUs with deterministic latency, low memory footprint, and reference integrations.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="relative bg-[#0A0A0A] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Hear the difference in seconds</h2>
        <p className="mt-4 text-white/70">See how AI-driven acoustics outperform traditional pipelines. Evaluate on your own data, end-to-end.</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-[#FF6A00] to-[#FF8C32] text-black font-semibold hover:brightness-110 transition">
            Start Pilot <ArrowRight size={18} />
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/20 text-white/90 hover:bg-white/5 transition">
            Technical Whitepaper
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[#FF6A00] to-[#FF8C32]"></div>
            <span className="text-white font-semibold tracking-tight">BDSound</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <a className="text-white/70 hover:text-white" href="#solutions">Solutions</a>
            <a className="text-white/70 hover:text-white" href="#industries">Industries</a>
            <a className="text-white/70 hover:text-white" href="#technology">Technology</a>
            <a className="text-white/70 hover:text-white" href="#about">About</a>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between text-xs text-white/50">
          <span>© {new Date().getFullYear()} BDSound. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <NavBar />
      <Hero />
      <Features />
      <Industries />
      <CTA />
      <Footer />
    </div>
  )
}
