'use client';

import { useState, useRef, MouseEvent, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Shield, 
  Code, 
  Cpu, 
  Target, 
  Sparkles,
  Building2,
  HeartPulse,
  Zap,
  GraduationCap,
  Hammer,
  Radio,
  Factory,
  Flame,
  Briefcase,
  Landmark,
  Rocket,
  ShieldCheck,
  ChevronRight,
  Award,
  Layers,
  CheckCircle2,
  Globe,
  Terminal,
  Activity
} from 'lucide-react';
import OpusLogo from "@/components/OpusLogo";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from "@/components/ScrollReveal";
import { useChat } from "@/components/providers/ChatProvider";
import Industries3DCore from "@/components/Industries3DCore";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 4 Studio Operating Philosophies (Interactive Switcher)
const PHILOSOPHIES = [
  {
    number: '01',
    title: 'Senior Minds Exclusively',
    tag: 'Zero Junior Delegation',
    summary: 'Direct interface with principal architects. No intermediaries, no junior dilution.',
    desc: 'Traditional agencies bill for senior partners but assign the work to junior developers. At Opusgeeks, every system architecture, database schema, and native bridge is designed and reviewed by principal engineers who have shipped systems handling millions of users.',
    specs: ['Direct Partner Comms', 'Zero Account Managers', 'Architect-Led Sprints'],
  },
  {
    number: '02',
    title: 'Deterministic Stability',
    tag: 'Mathematical Rigor',
    summary: 'Zero-defect delivery backed by automated verification before any production deployment.',
    desc: 'We treat software architecture with mechanical engineering discipline. By combining strict TypeScript schemas, immutable state machines, and end-to-end integration test suites, our platforms achieve 99.999% fault tolerance in high-concurrency environments.',
    specs: ['Sub-8ms Ledger Sync', 'Zero Unhandled State', 'Automated Penetration Tests'],
  },
  {
    number: '03',
    title: 'Bare-Metal Velocity',
    tag: 'Direct C++ & Native',
    summary: 'Bypassing slow runtime bridges to achieve authentic 120 FPS buttery fluidity.',
    desc: 'Slow user experiences destroy trust. We bypass bloated managed layers by writing bare-metal React Native CLI with direct C++ JSI bindings, hardware-accelerated shaders, and distributed edge CDN routes that render under 300 milliseconds globally.',
    specs: ['Direct C++ JSI Bindings', 'WebGL 3D GPU Shaders', '< 40ms Edge TTFB'],
  },
  {
    number: '04',
    title: 'Spatial Ergonomics',
    tag: 'Cognitive Depth',
    summary: 'Next-gen interfaces that reduce cognitive friction through purposeful visual physics.',
    desc: 'Award-winning software is felt before it is understood. We craft interfaces using spatial depth tokens, high-contrast dark glass ergonomics, and micro-motion choreography that make intricate enterprise workflows feel effortless and authoritative.',
    specs: ['Tokenized Spatial Depth', 'Tactile Micro-Physics', 'Ergonomic Contrast Matrix'],
  },
];

// Industry Recognition & Honors
const RECOGNITIONS = [
  {
    year: '2026',
    title: 'Awwwards Site of the Day',
    category: 'Architecture & Craft',
    org: 'Awwwards Global',
  },
  {
    year: '2026',
    title: 'Developer Award of the Year',
    category: 'Technical Excellence',
    org: 'FWA International',
  },
  {
    year: '2025',
    title: 'Best Fintech Mobile UX',
    category: 'Sub-Second Native Ledger',
    org: 'Design Systems Forum',
  },
  {
    year: '2025',
    title: 'Enterprise Architecture Benchmark',
    category: 'High-Concurrency Cloud',
    org: 'Global Web3 Consortium',
  },
];

// 10 Industry Sectors in exact circular orbital order
const SECTORS = [
  {
    id: 1,
    shortTitle: 'Energy & Grid',
    title: 'Energy & Utilities',
    icon: Zap,
    angle: 0,
    badge: 'Smart Grid & IoT',
    desc: 'Distributed smart grid telemetry, predictive load balancing, and autonomous sensor monitoring built for critical infrastructure.',
    metric: 'Sub-10ms Stream',
  },
  {
    id: 2,
    shortTitle: 'EdTech',
    title: 'Education & EdTech',
    icon: GraduationCap,
    angle: 36,
    badge: 'Interactive LMS',
    desc: 'Low-latency interactive video streaming, automated grading pipelines, and spatial classroom tools tailored for millions of students.',
    metric: 'Zero-Lag WebRTC',
  },
  {
    id: 3,
    shortTitle: 'Fintech',
    title: 'Finance & Banking',
    icon: Landmark,
    angle: 72,
    badge: 'Fintech & Vaults',
    desc: 'Sub-second multi-currency settlement, decentralized order book routing, and zero-trust native mobile banking architectures.',
    metric: '< 8ms Ledger Sync',
  },
  {
    id: 4,
    shortTitle: 'Real Estate',
    title: 'Construction & Real Estate',
    icon: Hammer,
    angle: 108,
    badge: 'Spatial 3D & BIM',
    desc: 'Interactive 3D property viewports, on-site contractor dispatch, and automated architectural asset tracking across job sites.',
    metric: 'Real-Time 3D Shaders',
  },
  {
    id: 5,
    shortTitle: 'Industry 4.0',
    title: 'Manufacturing & Supply',
    icon: Factory,
    angle: 144,
    badge: 'Industrial IoT',
    desc: 'Real-time assembly line telemetry, predictive maintenance alerts, and industrial RFID scanners with zero cloud lag.',
    metric: 'Mesh Telemetry',
  },
  {
    id: 6,
    shortTitle: 'Resources',
    title: 'Oil & Natural Resources',
    icon: Flame,
    angle: 180,
    badge: 'Mission-Critical Ops',
    desc: 'Mission-critical remote monitoring dashboards, automated compliance logging, and real-time safety threshold triggers.',
    metric: 'Satellite Sync',
  },
  {
    id: 7,
    shortTitle: 'Healthcare',
    title: 'Healthcare & MedTech',
    icon: HeartPulse,
    angle: 216,
    badge: 'HIPAA Certified',
    desc: 'Real-time patient telemetry, continuous HRV biofeedback tracking, and HIPAA-compliant end-to-end encrypted medical databases.',
    metric: 'End-to-End HIPAA',
  },
  {
    id: 8,
    shortTitle: 'Enterprise',
    title: 'Professional Services',
    icon: Briefcase,
    angle: 252,
    badge: 'Enterprise ERP',
    desc: 'Automated billing microservices, global multi-currency invoicing engines, and real-time resource allocations.',
    metric: 'Audit-Proof Trails',
  },
  {
    id: 9,
    shortTitle: 'Telecom',
    title: 'Telecom & Media',
    icon: Radio,
    angle: 288,
    badge: '5G Core & CDN',
    desc: 'Adaptive bitrate video encoders, real-time subscriber billing engines, and global edge caching nodes.',
    metric: 'Multi-CDN Failover',
  },
  {
    id: 10,
    shortTitle: 'GovTech',
    title: 'Governmental Sector',
    icon: Building2,
    angle: 324,
    badge: 'Public Sovereignty',
    desc: 'Strictly audited accessibility portals, sovereign cloud storage, and cryptographic identity verification systems.',
    metric: 'WCAG AAA Standard',
  },
];

// Interactive 3D Spatial Tilt Card Component
function InteractiveTiltCard({ 
  children, 
  className = '',
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.12 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: 'preserve-3d', transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)' }}
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

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitalSectionRef = useRef<HTMLDivElement>(null);
  const centerOrbRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useScrollReveal(containerRef);
  const { openChat } = useChat();

  const [activeSectorId, setActiveSectorId] = useState(3); // Default Finance & Banking
  const [activePhilosophyIndex, setActivePhilosophyIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Center OPUSGEEKS Core Reveal
      if (centerOrbRef.current) {
        gsap.fromTo(
          centerOrbRef.current,
          { scale: 0.3, opacity: 0, filter: 'blur(10px)' },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: orbitalSectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. All 10 Satellite Badges burst outward from dead center
      const nodes = nodesRef.current;
      if (nodes && nodes.length > 0) {
        nodes.forEach((node, index) => {
          if (!node) return;
          const angleRad = ((index * (360 / SECTORS.length)) - 90) * (Math.PI / 180);
          const isLg = window.innerWidth >= 1024;
          const distance = isLg ? 230 : 185;
          const targetX = Math.cos(angleRad) * distance;
          const targetY = Math.sin(angleRad) * distance;

          gsap.fromTo(
            node,
            {
              x: 0,
              y: 0,
              xPercent: -50,
              yPercent: -50,
              scale: 0.05,
              opacity: 0,
            },
            {
              x: targetX,
              y: targetY,
              xPercent: -50,
              yPercent: -50,
              scale: 1,
              opacity: 1,
              duration: 1.0,
              delay: 0.1 + index * 0.045,
              ease: 'back.out(1.8)',
              scrollTrigger: {
                trigger: orbitalSectionRef.current,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, orbitalSectionRef);

    return () => ctx.revert();
  }, []);

  const activeSector = SECTORS.find(s => s.id === activeSectorId) || SECTORS[2];
  const activePhil = PHILOSOPHIES[activePhilosophyIndex];

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans select-none">

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-24">
        
        {/* ================= TOP NAVBAR ================= */}
        <GlobalHeader />

        {/* ================= 1. SCULPTURAL EDITORIAL HERO ================= */}
        <div className="space-y-6 reveal-item max-w-5xl pt-2">

          <h1 className="font-machina text-[9vw] md:text-[5.8vw] uppercase leading-[0.88] tracking-tight">
            <div>CRAFTED FOR SCALE,</div>
            <div className="text-black/40">GOVERNED BY EXCELLENCE.</div>
          </h1>

          <p className="font-neue max-w-3xl text-base md:text-xl leading-relaxed text-[#231b35]/85 pt-1">
            We are an independent software engineering collective. We partner with ambitious global enterprises to build native mobile systems, resilient cloud infrastructures, and high-frequency digital experiences that redefine industry standards.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openChat('Studio Collaboration Inquiry')}
              className="bg-[#181520] text-white px-8 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center space-x-3 shadow-lg active:scale-95 cursor-pointer hover:scale-105"
            >
              <span>Initiate Direct Dialogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openChat('Request Engineering Consultation')}
              className="bg-white/80 hover:bg-white text-[#181520] border border-black/15 px-7 py-3.5 rounded-full font-machina text-xs uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              Consult Principal Architect
            </button>
          </div>

          {/* Industry Metric Counter Matrix */}
          <div className="pt-8 border-t border-black/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <span className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">45+</span>
              <span className="font-neue text-xs text-black/50 block mt-0.5">Enterprise Deployments</span>
            </div>
            <div>
              <span className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">99.999%</span>
              <span className="font-neue text-xs text-black/50 block mt-0.5">Fault Tolerance SLA</span>
            </div>
            <div>
              <span className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">&lt; 8ms</span>
              <span className="font-neue text-xs text-black/50 block mt-0.5">Sub-Second Ledger Sync</span>
            </div>
            <div>
              <span className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">100%</span>
              <span className="font-neue text-xs text-black/50 block mt-0.5">Senior-Level Hands</span>
            </div>
          </div>
        </div>

        {/* ================= 2. THE OPUS OPERATING MATRIX (INTERACTIVE SPLIT PHILOSOPHY) ================= */}
        <div className="reveal-item">
          <div className="border-b border-black/10 pb-4 mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520] tracking-tight">
                Operating Philosophy
              </h2>
              <p className="font-neue text-xs text-black/50 mt-1">
                The four engineering principles that differentiate Opusgeeks from generic agencies
              </p>
            </div>
            <span className="font-mono text-xs text-black/40">Studio Ethos</span>
          </div>

          {/* Interactive Split Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column (5 Cols): The 4 Principle Selectors */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              {PHILOSOPHIES.map((item, idx) => {
                const isSelected = activePhilosophyIndex === idx;
                return (
                  <div
                    key={item.number}
                    onClick={() => setActivePhilosophyIndex(idx)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group ${
                      isSelected
                        ? 'bg-[#181520] text-white border-[#181520] shadow-xl scale-[1.02]'
                        : 'bg-[#f0efe9]/80 hover:bg-white text-[#181520] border-black/[0.08] hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`font-machina text-xs font-bold w-6 shrink-0 transition-colors ${
                        isSelected ? 'text-white/40' : 'text-black/30'
                      }`}>
                        {item.number}
                      </span>
                      <div className="min-w-0">
                        <span className={`font-mono text-[10px] uppercase tracking-wider block mb-0.5 ${
                          isSelected ? 'text-white/60' : 'text-black/50'
                        }`}>
                          {item.tag}
                        </span>
                        <h3 className={`font-machina text-sm font-bold uppercase truncate transition-colors ${
                          isSelected ? 'text-white' : 'text-[#181520]'
                        }`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'rotate-90 text-white' : 'text-black/30 group-hover:translate-x-1'
                    }`} />
                  </div>
                );
              })}
            </div>

            {/* Right Column (7 Cols): Deep Dive Viewport */}
            <div className="lg:col-span-7 bg-[#f0efe9]/90 backdrop-blur-2xl border border-black/[0.08] rounded-[32px] p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <span className="font-machina text-xs font-bold uppercase tracking-widest text-black/40">
                    Principle // {activePhil.number}
                  </span>
                  <span className="font-mono text-xs uppercase text-[#181520] bg-black/[0.04] px-3 py-1 rounded-full border border-black/[0.08]">
                    {activePhil.tag}
                  </span>
                </div>

                <h3 className="font-machina text-2xl sm:text-3xl font-bold uppercase text-[#181520] leading-tight">
                  {activePhil.title}
                </h3>

                <p className="font-neue text-sm sm:text-base leading-relaxed text-[#231b35]/85">
                  {activePhil.desc}
                </p>

                {/* Key Execution Specs */}
                <div className="pt-4 border-t border-black/10">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-black/40 block mb-3">
                    Architectural Specifications
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activePhil.specs.map((spec) => (
                      <span key={spec} className="bg-white/80 border border-black/10 text-[#181520] px-3.5 py-1.5 rounded-full text-xs font-neue">
                        ● {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-black/10 flex items-center justify-between">
                <span className="font-neue text-xs text-black/50">
                  {activePhil.summary}
                </span>
                <button
                  onClick={() => openChat(`Consultation on ${activePhil.title}`)}
                  className="bg-[#181520] text-white px-6 py-2.5 rounded-full font-machina text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center space-x-2 shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>Explore Standard</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ================= 3. ROYAL ASTROLABE RADAR (SECTORS OF DOMINANCE) ================= */}
        <div ref={orbitalSectionRef} className="space-y-4 reveal-item">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-machina text-xs font-bold uppercase tracking-widest text-black/40">
              Sector Mastery
            </span>
            <h2 className="font-machina text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#181520]">
              Industries Under Our Command
            </h2>
            <p className="font-neue text-xs sm:text-sm leading-relaxed text-[#231b35]/80">
              Bespoke digital engines engineered for high-concurrency protocols and enterprise domains.
            </p>
          </div>

          {/* Compact Royal Circular Stage Container */}
          <div className="bg-[#f0efe9]/95 backdrop-blur-3xl border border-black/10 rounded-[36px] p-5 sm:p-7 shadow-[0_25px_70px_rgba(24,21,32,0.06)] relative overflow-hidden max-w-5xl mx-auto">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[650px] h-[520px] sm:h-[650px] bg-black/[0.03] rounded-full blur-3xl pointer-events-none" />

            {/* Desktop & Tablet: TRUE 360° ROYAL ASTROLABE RADAR MATRIX */}
            <div className="hidden md:flex relative w-full h-[500px] lg:h-[540px] items-center justify-center">
              
              {/* Concentric Astrolabe Rings & Tick Tracks */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] lg:w-[310px] h-[270px] lg:h-[310px] rounded-full border border-black/15 bg-black/[0.02] shadow-[0_0_60px_rgba(24,21,32,0.04)] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[390px] lg:w-[440px] h-[390px] lg:h-[440px] rounded-full border border-dashed border-black/15 animate-[spin_200s_linear_infinite] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] lg:w-[540px] h-[480px] lg:h-[540px] rounded-full border border-black/10 pointer-events-none" />

              {/* Sweeping Horology Radar Beam */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] lg:w-[540px] h-[480px] lg:h-[540px] rounded-full pointer-events-none overflow-hidden animate-[spin_28s_linear_infinite]">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-[#181520]/[0.04] via-transparent to-transparent origin-bottom-right rounded-tl-full" />
              </div>

              {/* Dynamic Laser Connection Constellation Beam */}
              <svg 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-[600px] h-[600px]" 
                viewBox="-300 -300 600 600"
              >
                {(() => {
                  const activeIdx = SECTORS.findIndex(s => s.id === activeSectorId);
                  const angleRad = ((activeIdx * (360 / SECTORS.length)) - 90) * (Math.PI / 180);
                  const isLg = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
                  const distance = isLg ? 230 : 185;
                  const orbRadius = isLg ? 82 : 70;
                  
                  const startX = Math.cos(angleRad) * orbRadius;
                  const startY = Math.sin(angleRad) * orbRadius;
                  
                  const endX = Math.cos(angleRad) * (distance - 14);
                  const endY = Math.sin(angleRad) * (distance - 14);

                  return (
                    <g key={activeSectorId} className="transition-all duration-300">
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="#181520"
                        strokeWidth="3"
                        strokeOpacity="0.08"
                        strokeLinecap="round"
                      />
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="#181520"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        strokeOpacity="0.75"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <circle
                        cx={endX}
                        cy={endY}
                        r="2.5"
                        fill="#181520"
                      />
                      <circle
                        cx={endX}
                        cy={endY}
                        r="5.5"
                        fill="none"
                        stroke="#181520"
                        strokeWidth="0.8"
                        strokeOpacity="0.3"
                      />
                    </g>
                  );
                })()}
              </svg>

              {/* ================= DEAD CENTER: ANIMATED OPUSGEEKS CORE ================= */}
              <div 
                ref={centerOrbRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center"
              >
                <div 
                  onClick={() => openChat('Enterprise Multi-Sector Architecture Consultation')}
                  className="w-[140px] h-[140px] lg:w-[164px] lg:h-[164px] rounded-full bg-[#181520] text-white shadow-[0_15px_50px_rgba(24,21,32,0.4)] border-2 border-white/30 flex items-center justify-center relative cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-[0_0_70px_rgba(24,21,32,0.65)] p-2.5 select-none backdrop-blur-2xl ring-4 ring-[#181520]/10"
                >
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-white/20 animate-[spin_100s_linear_infinite_reverse] pointer-events-none" />

                  {/* Embedded Interactive 3D WebGL Canvas */}
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-45 group-hover:opacity-80 transition-opacity duration-300">
                    <Industries3DCore
                      activeSectorAngle={activeSector.angle}
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* Prominent Opusgeeks Branding */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">
                    <OpusLogo 
                      layout="col"
                      size={32}
                      dark={true}
                      textClassName="text-[11px] lg:text-[12px] font-machina font-black uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                    />
                  </div>
                </div>
              </div>

              {/* ================= 10 SATELLITE NODES ================= */}
              {SECTORS.map((sector, index) => {
                const isSelected = sector.id === activeSectorId;
                const SIcon = sector.icon;

                return (
                  <div
                    key={sector.id}
                    ref={(el) => { nodesRef.current[index] = el; }}
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    className="absolute z-30 will-change-transform"
                  >
                    <button
                      onClick={() => setActiveSectorId(sector.id)}
                      onMouseEnter={() => setActiveSectorId(sector.id)}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer shadow-md select-none ${
                        isSelected
                          ? 'bg-[#181520] text-white border-[#181520] shadow-[0_10px_30px_rgba(24,21,32,0.4)] z-40 scale-110'
                          : 'bg-white/95 hover:bg-[#181520] text-[#181520] hover:text-white border-black/10 hover:border-[#181520] hover:scale-105 backdrop-blur-2xl hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center font-machina font-extrabold text-[9px] border transition-colors ${
                        isSelected
                          ? 'bg-white text-[#181520] border-white shadow-sm'
                          : 'bg-[#181520] text-white border-black/20 group-hover:bg-white group-hover:text-[#181520]'
                      }`}>
                        {sector.id < 10 ? `0${sector.id}` : sector.id}
                      </div>

                      <SIcon className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${
                        isSelected ? 'text-white' : 'text-[#181520] group-hover:text-white'
                      }`} />

                      <span className="font-machina text-[11px] font-bold uppercase tracking-wider whitespace-nowrap pr-0.5">
                        {sector.shortTitle}
                      </span>
                    </button>
                  </div>
                );
              })}

            </div>

            {/* Mobile Responsive View (< md) */}
            <div className="md:hidden space-y-3 relative z-10">
              <div className="flex justify-center mb-4">
                <div 
                  onClick={() => openChat('Enterprise Multi-Sector Architecture Consultation')}
                  className="w-28 h-28 rounded-full bg-[#181520] text-white shadow-xl border-2 border-white/30 flex items-center justify-center p-3 relative cursor-pointer active:scale-95 transition-transform overflow-hidden ring-4 ring-[#181520]/10"
                >
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-white/20 animate-[spin_100s_linear_infinite_reverse] pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">
                    <OpusLogo 
                      layout="col"
                      size={24}
                      dark={true}
                      textClassName="text-[9px] font-machina font-extrabold uppercase tracking-[0.18em] text-white drop-shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SECTORS.map((sec) => {
                  const SIcon = sec.icon;
                  const isSelected = sec.id === activeSectorId;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectorId(sec.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'bg-[#181520] text-white border-[#181520] shadow-md'
                          : 'bg-white/90 hover:bg-[#181520] text-[#181520] hover:text-white border-black/10'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-machina font-bold text-[9px] ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#181520] text-white'
                        }`}>
                          {sec.id < 10 ? `0${sec.id}` : sec.id}
                        </div>
                        <span className="font-machina text-[11px] font-bold uppercase tracking-wider">
                          {sec.title}
                        </span>
                      </div>
                      <SIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#181520]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= PROTOCOL BAR ================= */}
            <div className="mt-4 pt-3.5 border-t border-black/10 relative z-10">
              <div className="bg-[#181520] text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 relative overflow-hidden">
                <div className="space-y-1 relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-white/10 text-white border border-white/20 px-2.5 py-0.5 rounded-full font-machina text-[9px] uppercase tracking-wider font-bold">
                      Protocol // 0{activeSector.id} • {activeSector.badge}
                    </span>
                    <span className="font-machina text-sm sm:text-base font-bold uppercase text-white tracking-tight">
                      {activeSector.title}
                    </span>
                  </div>

                  <p className="font-neue text-xs text-white/75 max-w-xl line-clamp-1 leading-normal">
                    {activeSector.desc}
                  </p>
                </div>

                <button
                  onClick={() => openChat(`Enterprise Architecture Blueprint Consultation for ${activeSector.title}`)}
                  className="shrink-0 bg-white text-[#181520] hover:bg-white/90 py-2.5 px-5 rounded-full font-machina text-[11px] uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-1.5 shadow-md active:scale-95 cursor-pointer font-bold relative z-10 group"
                >
                  <span>Commission Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ================= 4. INDUSTRY RECOGNITIONS & CRAFT HONORS ================= */}
        <div className="space-y-6">
          <div className="border-b border-black/10 pb-4 flex items-center justify-between reveal-item">
            <div>
              <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520] tracking-tight">
                Craft Honors & Benchmark Accreditations
              </h2>
              <p className="font-neue text-xs text-black/50 mt-1">
                Peer-reviewed engineering recognition across international design & architecture juries
              </p>
            </div>
            <span className="font-mono text-xs text-black/40">Verified Registry</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECOGNITIONS.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white/40 hover:bg-white/90 backdrop-blur-md border border-black/[0.08] hover:border-black/20 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-black/40">
                    <span>{rec.year}</span>
                    <Award className="w-3.5 h-3.5 text-black/30 group-hover:text-black transition-colors" />
                  </div>
                  <h4 className="font-machina text-base font-bold uppercase text-[#181520] leading-snug">
                    {rec.title}
                  </h4>
                  <p className="font-neue text-xs text-black/60">
                    {rec.category}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 text-[10px] font-mono uppercase tracking-wider text-black/40">
                  {rec.org}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 5. THE OBSIDIAN QUALITY STANDARD ================= */}
        <div className="bg-[#181520] text-white rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden reveal-item border border-white/10">
          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1 block">
                  The Opus Standard
                </span>
                <h3 className="font-machina text-2xl md:text-3xl font-bold uppercase tracking-tight">
                  Rigorous Quality & Reliability Protocol
                </h3>
              </div>

              <button
                onClick={() => openChat('Audit Technical Requirements')}
                className="bg-white text-[#181520] hover:bg-white/90 px-7 py-3 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 whitespace-nowrap shadow-md active:scale-95 cursor-pointer"
              >
                <span>Audit Requirements</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 space-y-1.5 hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <h4 className="font-machina text-sm font-bold uppercase tracking-wider text-white">
                    Direct Principal Access
                  </h4>
                </div>
                <p className="font-neue text-xs text-white/70 leading-relaxed pl-3.5">
                  No account managers or intermediary layers. You collaborate directly with senior systems architects.
                </p>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 space-y-1.5 hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <h4 className="font-machina text-sm font-bold uppercase tracking-wider text-white">
                    Deterministic Stability
                  </h4>
                </div>
                <p className="font-neue text-xs text-white/70 leading-relaxed pl-3.5">
                  Rigorous end-to-end integration test suites ensuring 99.999% fault-tolerant production deployments.
                </p>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 space-y-1.5 hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <h4 className="font-machina text-sm font-bold uppercase tracking-wider text-white">
                    Sub-Millisecond Native Pipelines
                  </h4>
                </div>
                <p className="font-neue text-xs text-white/70 leading-relaxed pl-3.5">
                  Hardware-level graphics and bare-metal native code engineered for 120 FPS buttery interactions.
                </p>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 space-y-1.5 hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <h4 className="font-machina text-sm font-bold uppercase tracking-wider text-white">
                    Transparent Sprint Cadence
                  </h4>
                </div>
                <p className="font-neue text-xs text-white/70 leading-relaxed pl-3.5">
                  Continuous CI/CD pipeline transparency, documented architecture RFCs, and daily codebase visibility.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 6. EXECUTIVE INVITATION (BOTTOM MONOLITH) ================= */}
        <div className="bg-[#181520] text-white rounded-[32px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl reveal-item border border-white/10">
          <div className="space-y-3 text-center md:text-left max-w-lg">
            <h2 className="font-machina text-2xl md:text-4xl font-bold uppercase leading-tight">
              Partner with dedicated engineers.
            </h2>
            <p className="font-neue text-white/70 text-xs md:text-sm leading-relaxed">
              We collaborate with leadership teams to design, architect, and ship high-concurrency native applications and web ecosystems.
            </p>
          </div>

          <button
            onClick={() => openChat('Executive Direct Dialogue')}
            className="bg-white text-[#181520] hover:bg-white/90 px-8 py-4 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-3 whitespace-nowrap shadow-lg active:scale-95 cursor-pointer outline-none border-none hover:scale-105"
          >
            <span>Initiate Direct Dialogue</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      <GlobalFooter />
    </div>
  );
}
