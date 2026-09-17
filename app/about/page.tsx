'use client';

import { useState, useRef, MouseEvent } from 'react';
import { ArrowUpRight, Shield, Code, Cpu, Target, CheckCircle2 } from 'lucide-react';

const VALUES = [
  {
    icon: Code,
    index: '01',
    title: 'Architectural Integrity',
    desc: 'We reject temporary shortcuts. Every line of React Native, TypeScript, and server architecture is engineered for low latency, memory safety, and multi-year maintainability.',
  },
  {
    icon: Cpu,
    index: '02',
    title: 'Raw Native Performance',
    desc: 'We optimize down to thread synchronization, native bridges, and hardware GPU acceleration to ensure 60/120 FPS rendering on every target device.',
  },
  {
    icon: Shield,
    index: '03',
    title: 'Zero-Defect Delivery',
    desc: 'Automated CI/CD validation, end-to-end integration tests, and strict enterprise security protocols ensure production releases are resilient from day one.',
  },
  {
    icon: Target,
    index: '04',
    title: 'Commercial Impact',
    desc: 'Technology is merely a lever for growth. We design software systems that reduce operational overhead, convert users, and scale enterprise valuations.',
  },
];

const MILESTONES = [
  { year: '2023', label: 'Inception', text: 'Founded as an elite software collective specializing in bare React Native and micro-frontend architectures.' },
  { year: '2024', label: 'Enterprise Expansion', text: 'Shipped high-frequency mobile banking and logistics systems across North America and MENA regions.' },
  { year: '2025', label: 'Cloud & 3D WebGL', text: 'Integrated spatial design frameworks, real-time edge streaming, and automated deployment pipelines.' },
  { year: '2026', label: 'Global Scale', text: 'Powering mission-critical digital products for funded startups, fintech leaders, and healthcare groups.' },
];

const TEAM = [
  {
    name: 'Engineering Collective',
    role: 'Core Architecture',
    desc: 'Specialists in React Native CLI, high-performance C++ native modules, and complex Redux Toolkit state synchronization.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Spatial Design Studio',
    role: 'UI/UX & Systems',
    desc: 'System designers obsessed with typography hierarchy, tactile micro-interactions, and high-conversion user pathways.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'DevOps & Reliability',
    role: 'Cloud Infrastructure',
    desc: 'Architects of automated Fastlane workflows, zero-downtime micro-frontends, and global edge cluster replication.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  },
];

// Monochrome 3D Spatial Tilt Card Component
function MonochromeTiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
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

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
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

import OpusLogo from "@/components/OpusLogo";
import { useScrollReveal } from "@/components/ScrollReveal";
import { useChat } from "@/components/providers/ChatProvider";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat } = useChat();


  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#c9d2e7] text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans">
      {/* Baked Studio Backdrop Image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col space-y-16 md:space-y-20">
        
        {/* Top Navbar Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10 reveal-item">
          <a href="/" className="flex items-center group">
            <OpusLogo variant="full" size={26} />
          </a>
          <a
            href="/"
            className="inline-flex items-center space-x-2 font-machina text-xs uppercase tracking-wider text-[#181520] px-4 py-2 rounded-full border border-black/15 bg-white/50 hover:bg-white transition-all shadow-xs"
          >
            ← Back to Overview
          </a>
        </div>

        {/* ================= 1. MONOCHROME HERO ================= */}
        <div className="flex flex-col space-y-6 reveal-item">
          <div className="flex items-center space-x-3">
            <span className="inline-block border border-black/30 rounded-full px-4 py-1 text-xs uppercase font-neue">
              About Opusgeeks
            </span>
            <span className="text-xs font-neue text-black/50 tracking-wider uppercase">
              • Engineering Collective
            </span>
          </div>

          <h1 className="font-machina text-4xl md:text-6xl font-bold uppercase tracking-tight text-[#181520]">
            Crafting Digital Systems That Endure
          </h1>

          <p className="font-neue max-w-2xl text-base md:text-lg leading-relaxed text-[#181520]/80">
            Opusgeeks is an independent technology and design company. We build native mobile applications, responsive web infrastructures, and custom software systems for teams that demand absolute stability and craft.
          </p>
        </div>

        {/* ================= 2. MISSION & MANIFESTO (BLACK & WHITE GLASS) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch reveal-group">
          <MonochromeTiltCard className="md:col-span-7 bg-[#f0efe9]/80 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-12 shadow-[0_15px_35px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="font-machina text-xs uppercase tracking-widest text-black/50">Our Thesis</span>
              <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520] leading-tight">
                Great products are not assembled from generic templates. They are engineered from first principles.
              </h2>
            </div>
            <p className="font-neue text-sm md:text-base leading-relaxed text-[#181520]/80">
              We bridge the divide between obsessive visual design and hardcore systems engineering. By eliminating unnecessary abstractions and focusing on clean, maintainable architecture, we help founders and enterprises build digital products that endure.
            </p>
            <div className="pt-6 border-t border-black/10 flex items-center space-x-8 text-xs font-machina uppercase tracking-wider text-black/60">
              <span>● Clean State</span>
              <span>● Native Speed</span>
              <span>● Zero Lag</span>
            </div>
          </MonochromeTiltCard>

          <MonochromeTiltCard className="md:col-span-5 bg-[#181520] text-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="font-machina text-xs uppercase tracking-widest text-white/50">Quality Guarantee</span>
              <h3 className="font-machina text-2xl font-bold uppercase">
                The Engineering Standard
              </h3>
            </div>
            <ul className="space-y-4 text-xs md:text-sm font-neue text-white/80">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Strict TypeScript typing with zero runtime escape hatches.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>60 FPS render pipelines optimized for low-end devices.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Exhaustive automated testing suites before App Store deployment.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Direct senior-engineer access with transparent communication.</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/40">
              Ref: OPUS-CORE-SPEC-2026
            </div>
          </MonochromeTiltCard>
        </div>

        {/* ================= 3. FOUR CORE VALUES ================= */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-black/10 reveal-item">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase tracking-tight">
              Operational Principles
            </h2>
            <span className="text-xs font-neue text-black/50 uppercase tracking-wider">
              / How We Work
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-group">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <MonochromeTiltCard
                  key={val.index}
                  className="bg-[#f0efe9]/75 backdrop-blur-xl border border-white/70 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-8 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#181520] text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-black/40">
                      /{val.index}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-machina text-lg font-bold uppercase mb-2 text-[#181520]">
                      {val.title}
                    </h3>
                    <p className="font-neue text-xs leading-relaxed text-[#181520]/75">
                      {val.desc}
                    </p>
                  </div>
                </MonochromeTiltCard>
              );
            })}
          </div>
        </div>

        {/* ================= 4. EVOLUTION ROADMAP ================= */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-black/10 reveal-item">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase tracking-tight">
              Trajectory & Milestones
            </h2>
            <span className="text-xs font-neue text-black/50 uppercase tracking-wider">
              2023 — Present
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 reveal-group">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className="bg-[#f0efe9]/60 backdrop-blur-md border border-white/60 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:translate-y-[-4px] transition-transform duration-300"
              >
                <div className="font-machina text-3xl font-bold text-[#181520]">
                  {m.year}
                </div>
                <div>
                  <div className="font-machina text-xs font-bold uppercase tracking-wider text-black/70 mb-1">
                    {m.label}
                  </div>
                  <p className="font-neue text-xs leading-relaxed text-black/60">
                    {m.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 5. THE COLLECTIVE (MONOCHROME PORTRAITS) ================= */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-black/10 reveal-item">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase tracking-tight">
              Engineering Disciplines
            </h2>
            <span className="text-xs font-neue text-black/50 uppercase tracking-wider">
              Specialized Units
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-group">
            {TEAM.map((member, i) => (
              <MonochromeTiltCard
                key={i}
                className="bg-[#f0efe9]/75 backdrop-blur-xl border border-white/70 rounded-3xl p-6 flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Grayscale Portrait */}
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 bg-black">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-[10px] font-neue uppercase tracking-wider backdrop-blur-md">
                      {member.role}
                    </div>
                  </div>

                  <h3 className="font-machina text-xl font-bold uppercase text-[#181520] mb-2">
                    {member.name}
                  </h3>
                  <p className="font-neue text-xs leading-relaxed text-black/70 mb-4">
                    {member.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-neue text-black/50">
                  <span>Opus Core Unit</span>
                  <span>Active Deployment</span>
                </div>
              </MonochromeTiltCard>
            ))}
          </div>
        </div>

        {/* ================= 6. MONOCHROME CTA ================= */}
        <div className="bg-[#181520] text-white rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl reveal-item">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="font-machina text-3xl md:text-4xl font-bold uppercase">
              Partner with dedicated engineers.
            </h2>
            <p className="font-neue text-white/70 max-w-lg text-sm">
              We collaborate with leadership teams to design, architect, and ship high-concurrency native applications and web ecosystems.
            </p>
          </div>

          <button
            onClick={() => openChat('Executive Direct Dialogue')}
            className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-8 py-4 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-3 whitespace-nowrap shadow-lg active:scale-95 cursor-pointer outline-none border-none"
          >
            <span>Initiate Direct Dialogue</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>



      </div>
    </div>
  );
}
