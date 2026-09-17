'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { 
  Apple, 
  Smartphone, 
  Glasses, 
  Watch, 
  Cpu, 
  Gamepad2, 
  Layers, 
  Zap, 
  Sparkles, 
  ArrowUpRight, 
  Award, 
  Users, 
  CheckCircle2, 
  Building2,
  ChevronRight,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import OpusLogo from '@/components/OpusLogo';
import { useScrollReveal } from '@/components/ScrollReveal';
import { useChat } from '@/components/providers/ChatProvider';

// 8 Core Mobile Pillars - Concise, punchy descriptions
const MOBILE_SERVICES = [
  {
    icon: Apple,
    title: 'iOS App Engineering',
    tag: 'Swift / SwiftUI',
    desc: 'High-precision native iOS apps engineered with Swift, SwiftUI, and fluid 120Hz ProMotion animations.',
    metrics: 'SwiftUI • Metal • ARKit'
  },
  {
    icon: Smartphone,
    title: 'Android Development',
    tag: 'Kotlin / Compose',
    desc: 'Modular Android systems powered by Jetpack Compose, Kotlin coroutines, and clean architecture.',
    metrics: 'Jetpack • Coroutines • NDK'
  },
  {
    icon: Glasses,
    title: 'Spatial & AR/VR Apps',
    tag: 'VisionOS / Unity',
    desc: 'Immersive mixed-reality viewports and spatial interfaces built with VisionOS & Unity pipelines.',
    metrics: 'Spatial Audio • RealityKit'
  },
  {
    icon: Watch,
    title: 'Wearables & IoT Sync',
    tag: 'WatchOS / WearOS',
    desc: 'Sub-second sensor telemetry and low-power background synchronization for WatchOS & WearOS.',
    metrics: 'HealthKit • Sensor APIs'
  },
  {
    icon: Cpu,
    title: 'Native TurboModules',
    tag: 'JSI / C++',
    desc: 'Raw metal execution and custom native modules with zero bridge serialization lag.',
    metrics: 'JSI Bridge • C++ Core'
  },
  {
    icon: Layers,
    title: 'Cross-Platform React Native',
    tag: 'Fabric / Hermes',
    desc: 'Flagship React Native architectures sharing 99% business logic across iOS and Android.',
    metrics: 'Fabric Engine • TurboModules'
  },
  {
    icon: Zap,
    title: 'Flutter & Dart Systems',
    tag: 'Skia / Impeller',
    desc: 'GPU-accelerated Impeller rendering and declarative multi-platform app ecosystems.',
    metrics: 'Impeller Engine • BLoC'
  },
  {
    icon: Gamepad2,
    title: 'Interactive Gaming & 3D',
    tag: 'Phaser / Three.js',
    desc: 'Canvas physics engines, WebGL shaders, and high-framerate interactive micro-apps.',
    metrics: 'WebGL • Physics Shaders'
  },
];

// Impact Metrics
const METRICS = [
  {
    value: '540+',
    label: 'Production Releases',
    sub: 'App Store & Google Play',
    icon: CheckCircle2,
  },
  {
    value: '40+',
    label: 'Enterprise Clients',
    sub: 'Global Brands & Startups',
    icon: Building2,
  },
  {
    value: '300+',
    label: 'Sprints Delivered',
    sub: 'Agile pods with zero downtime',
    icon: Users,
  },
  {
    value: '25+',
    label: 'Industry Accolades',
    sub: 'Design & Architecture Awards',
    icon: Award,
  },
];

// Featured Mobile Case Studies - Clean & concise
const CASE_STUDIES = [
  {
    title: 'Le Cavalier Cellars',
    category: 'Luxury Commerce & Wine Investment',
    tag: 'iOS & Android Native',
    desc: 'Luxury wine asset verification, private barrel auctioning, and instant biometric checkout.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    stats: ['+185% Transaction Volume', '0.4s Checkout Latency'],
  },
  {
    title: 'Mind Nourishment',
    category: 'Digital Health & Biofeedback',
    tag: 'React Native & HealthKit',
    desc: 'Continuous real-time HRV heart tracking and offline-first encrypted mental wellness tools.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    stats: ['4.9★ App Store Rating', '1.2M Daily Sessions'],
  },
  {
    title: 'W Events & VIP Hospitality',
    category: 'Event Tech & Ticketing',
    tag: 'Flutter & WebSocket Sync',
    desc: 'Interactive 3D venue mapping and ultra-fast NFC proximity entry for premier global events.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    stats: ['100k Peak Concurrent QPS', '0% Entry Gate Queue'],
  },
  {
    title: 'Restaurant Techs POS',
    category: 'Enterprise Edge Kitchen & POS',
    tag: 'Swift & Kotlin Multiplatform',
    desc: 'Zero-latency offline mesh ordering and cloud POS telemetry for high-volume food franchises.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    stats: ['99.999% Offline Uptime', '3.2M Orders / Month'],
  },
];

const TECH_STACK = [
  'React Native (Fabric)',
  'Swift 6 & SwiftUI',
  'Kotlin & Jetpack Compose',
  'TypeScript',
  'Flutter / Dart',
  'Apple HealthKit & WatchKit',
  'WebSockets / gRPC',
  'Redux Toolkit / Zustand',
  'Metal Shaders',
  'Offline SQLite / WatermelonDB',
  'TurboModules (JSI)'
];

// Interactive 3D Tilt Card Component
function InteractiveTiltCard({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative will-change-transform ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function AppDevelopmentPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat } = useChat();

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#c9d2e7] text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans">
      {/* Studio Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-20">
        
        {/* ================= TOP NAV BAR ================= */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10 reveal-item">
          <a href="/" className="flex items-center group">
            <OpusLogo variant="full" size={26} />
          </a>
          <a
            href="/"
            className="inline-flex items-center space-x-2 font-machina text-xs uppercase tracking-wider text-[#181520] px-4 py-2 rounded-full border border-black/15 bg-white/50 hover:bg-white transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Overview</span>
          </a>
        </div>

        {/* ================= 1. HERO SECTION ================= */}
        <div className="space-y-6 reveal-item max-w-4xl pt-2">
          <h1 className="font-machina text-[9vw] md:text-[6.2vw] uppercase leading-[0.88] tracking-tight">
            <div>PROGRESSIVE MOBILE</div>
            <div className="text-black/50">ENGINEERING.</div>
          </h1>

          <p className="font-neue text-base md:text-xl leading-relaxed text-[#231b35] max-w-2xl pt-1">
            We architect flagship mobile applications combining raw native performance, resilient offline data sync, and fluid 120fps micro-interactions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openChat('Mobile Application Architecture Review')}
              className="bg-[#181520] text-white px-8 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center space-x-3 shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Schedule Architecture Blueprint</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openChat('Request App Development Estimation')}
              className="bg-white/70 hover:bg-white text-[#181520] border border-black/15 px-7 py-3.5 rounded-full font-neue text-xs uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              Request Custom Estimate
            </button>
          </div>
        </div>

        {/* ================= 2. 8 CORE MOBILE SERVICES GRID ================= */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-4 gap-2 reveal-item">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
              Mobile Engineering Ecosystem
            </h2>
            <p className="font-neue text-xs text-black/60 max-w-md">
              From bare metal Swift & Kotlin execution to unified React Native engines and Spatial computing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-group">
            {MOBILE_SERVICES.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <InteractiveTiltCard
                  key={idx}
                  onClick={() => openChat(`Mobile Capability Discovery: ${svc.title}`)}
                  className="group bg-[#f0efe9]/80 hover:bg-white backdrop-blur-xl border border-white/80 hover:border-black/20 rounded-3xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-colors duration-300 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-[#181520] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-machina uppercase tracking-wider text-black/50 bg-black/[0.04] px-2.5 py-1 rounded-full border border-black/5">
                        {svc.tag}
                      </span>
                    </div>

                    <h3 className="font-machina text-base font-bold uppercase text-[#181520] mb-2 leading-snug group-hover:text-black transition-colors">
                      {svc.title}
                    </h3>
                    <p className="font-neue text-xs leading-relaxed text-[#231b35]/75 mb-5">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-black/50">
                    <span>{svc.metrics}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#181520]" />
                  </div>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>

        {/* ================= 3. LUXURY METRICS & SCALE CARD ================= */}
        <InteractiveTiltCard
          className="bg-[#181520] text-white rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden reveal-item border border-white/10"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#c9d2e7]/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#c9d2e7] mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#c9d2e7]" />
                  <span>Verified Engineering Impact</span>
                </div>
                <h3 className="font-machina text-2xl md:text-3xl font-bold uppercase">
                  Engineered For Measurable Scale
                </h3>
              </div>
              <button
                onClick={() => openChat('Direct Inquiry: Enterprise App Deployment')}
                className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-7 py-3 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 whitespace-nowrap shadow-md active:scale-95 cursor-pointer"
              >
                <span>Initiate Direct Brief</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {METRICS.map((m, idx) => {
                const MIcon = m.icon;
                return (
                  <div key={idx} className="space-y-1.5 border-l border-white/10 pl-5">
                    <div className="flex items-center space-x-2 text-[#c9d2e7]/70 text-xs font-mono">
                      <MIcon className="w-3.5 h-3.5" />
                      <span>Scale</span>
                    </div>
                    <div className="font-machina text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      {m.value}
                    </div>
                    <div className="font-machina text-xs uppercase tracking-wider text-white/90">
                      {m.label}
                    </div>
                    <div className="font-neue text-[11px] text-white/50 leading-normal">
                      {m.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </InteractiveTiltCard>

        {/* ================= 4. FEATURED CASE STUDIES ================= */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-4 gap-2 reveal-item">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
              Featured Mobile Case Studies
            </h2>
            <p className="font-neue text-xs text-black/60 max-w-md">
              Real-world systems delivering high concurrency, sub-millisecond execution, and award-winning retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-group">
            {CASE_STUDIES.map((study, idx) => (
              <InteractiveTiltCard
                key={idx}
                className="group bg-[#f0efe9]/80 backdrop-blur-xl border border-white/80 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] transition-colors duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-machina text-xl md:text-2xl font-bold uppercase tracking-wide">
                        {study.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <p className="font-neue text-xs md:text-sm leading-relaxed text-[#231b35]/80">
                      {study.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-black/5 mt-2 flex items-center justify-between">
                  <span className="text-xs font-neue text-black/50">
                    Production Architecture
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openChat(`Case Study Breakdown: ${study.title}`);
                    }}
                    className="bg-[#181520] text-white px-5 py-2 rounded-full text-xs font-machina uppercase tracking-widest hover:scale-105 transition-transform flex items-center space-x-2 cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Inspect Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </InteractiveTiltCard>
            ))}
          </div>
        </div>

        {/* ================= 5. TECH STACK PILLS ================= */}
        <div className="border-t border-black/10 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal-item">
          <span className="font-machina text-xs uppercase tracking-widest text-black/50">
            Enterprise Mobile Stack
          </span>
          <div className="flex flex-wrap gap-2.5">
            {TECH_STACK.map((tech, i) => (
              <span
                key={i}
                className="bg-[#181520] text-white px-4 py-1.5 rounded-full text-xs font-neue hover:scale-105 transition-transform shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ================= 6. FINAL CTA & BACK LINK ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-black/10 pt-10 gap-6 reveal-item">
          <a
            href="/"
            className="font-neue text-xs uppercase tracking-wider hover:opacity-60 transition-opacity"
          >
            ← Back to Overview
          </a>
          
          <button
            onClick={() => openChat('New Project: Progressive Mobile App Engineering')}
            className="bg-[#181520] text-white px-8 py-3.5 rounded-full flex items-center space-x-3 text-xs uppercase tracking-widest font-machina hover:scale-105 transition-transform shadow-xl cursor-pointer outline-none border-none active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Initiate Mobile Collaboration</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
