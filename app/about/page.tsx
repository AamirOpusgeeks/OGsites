'use client';

import { useState, useRef, MouseEvent, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Shield, 
  Code, 
  Cpu, 
  Target, 
  CheckCircle2, 
  ArrowLeft,
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
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import OpusLogo from "@/components/OpusLogo";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from "@/components/ScrollReveal";
import { useChat } from "@/components/providers/ChatProvider";
import Industries3DCore from "@/components/Industries3DCore";

// 3 Core Tenets (Vision, Values, Mission)
const CORE_TENETS = [
  {
    icon: Rocket,
    title: 'Our Vision',
    desc: 'To revolutionize digital software architectures by fusing raw native execution with tactile spatial design.',
  },
  {
    icon: Shield,
    title: 'Our Values',
    desc: 'Uncompromising integrity, zero-defect delivery, and transparent senior-level engineering partnerships.',
  },
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To empower forward-thinking enterprises with resilient software products that dominate global markets.',
  },
];

// 10 Industry Sectors in exact circular orbital order
const SECTORS = [
  {
    id: 1,
    title: 'Energy & Utilities',
    icon: Zap,
    angle: 0, // 0 deg (Right)
    badge: 'Smart Grid & IoT',
    headline: 'Autonomous Energy Telemetry & Edge Computing',
    desc: 'Distributed smart grid telemetry, predictive load balancing, and autonomous sensor monitoring built for critical infrastructure.',
    specs: ['Sub-10ms Sensor Streaming', 'Predictive Grid Sharding', 'SCADA & MQTT Protocols'],
  },
  {
    id: 2,
    title: 'Education & EdTech',
    icon: GraduationCap,
    angle: 36,
    badge: 'Interactive LMS',
    headline: 'High-Concurrency Collaborative Learning Systems',
    desc: 'Low-latency interactive video streaming, automated grading pipelines, and spatial classroom tools tailored for millions of students.',
    specs: ['Real-Time Canvas Collaboration', 'Zero-Lag Video WebRTC', 'Adaptive AI Curriculum'],
  },
  {
    id: 3,
    title: 'Finance & Banking',
    icon: Landmark,
    angle: 72,
    badge: 'Fintech & Vaults',
    headline: 'High-Frequency Ledgers & Biometric Authorization',
    desc: 'Sub-second multi-currency settlement, decentralized order book routing, and zero-trust native mobile banking architectures.',
    specs: ['SOC2 & PCI-DSS Certified', 'Sub-8ms Ledger Sync', 'Hardware Enclave Security'],
  },
  {
    id: 4,
    title: 'Construction & Real Estate',
    icon: Hammer,
    angle: 108,
    badge: 'Spatial 3D & BIM',
    headline: 'Spatial BIM Viewports & Automated Operations',
    desc: 'Interactive 3D property viewports, on-site contractor dispatch, and automated architectural asset tracking across job sites.',
    specs: ['Real-Time 3D Shaders', 'Offline Field Sync', 'Automated Permit Telemetry'],
  },
  {
    id: 5,
    title: 'Manufacturing & Supply',
    icon: Factory,
    angle: 144,
    badge: 'Industrial IoT',
    headline: 'Assembly Telemetry & Supply Chain Mesh',
    desc: 'Real-time assembly line telemetry, predictive maintenance alerts, and industrial RFID scanners with zero cloud lag.',
    specs: ['Hardware Mesh Telemetry', 'Predictive Failure AI', 'Zero-Downtime Pipeline'],
  },
  {
    id: 6,
    title: 'Oil & Natural Resources',
    icon: Flame,
    angle: 180, // 180 deg (Left)
    badge: 'Mission-Critical Ops',
    headline: 'Harsh Environment Telemetry & Compliance',
    desc: 'Mission-critical remote monitoring dashboards, automated compliance logging, and real-time safety threshold triggers.',
    specs: ['Satellite Sync Protocol', 'Fail-Safe Circuit Breakers', 'Encrypted Field Logging'],
  },
  {
    id: 7,
    title: 'Healthcare & MedTech',
    icon: HeartPulse,
    angle: 216,
    badge: 'HIPAA Certified',
    headline: 'Continuous HRV Telemetry & Biometrics',
    desc: 'Real-time patient telemetry, continuous HRV biofeedback tracking, and HIPAA-compliant end-to-end encrypted medical databases.',
    specs: ['HIPAA & FHIR Compliance', 'Sub-Second Vitals Stream', 'Zero-Knowledge Crypto'],
  },
  {
    id: 8,
    title: 'Professional Services',
    icon: Briefcase,
    angle: 252,
    badge: 'Enterprise SaaS',
    headline: 'Multi-Tenant Cloud & Workflow Orchestration',
    desc: 'Multi-tenant cloud architectures, cap-table modeling engines, and automated subscription billing for global firms.',
    specs: ['Modular Micro-Frontends', 'Role-Based Access Control', 'Multi-Currency Billing'],
  },
  {
    id: 9,
    title: 'Telecom & Media',
    icon: Radio,
    angle: 288,
    badge: 'Global CDN',
    headline: 'Ultra-High Throughput Media Distribution',
    desc: 'High-throughput content delivery networks, live broadcast telemetry, and customer self-service billing portals.',
    specs: ['Sub-20ms Global Edge', 'Adaptive Bitrate Engines', '10M+ Concurrent Sockets'],
  },
  {
    id: 10,
    title: 'Governmental Sector',
    icon: Building2,
    angle: 324,
    badge: 'Public Sovereignty',
    headline: 'Zero-Trust Citizen Portals & Verification',
    desc: 'Strictly audited accessibility portals, sovereign cloud storage, and cryptographic identity verification systems.',
    specs: ['WCAG 2.2 AAA Accessible', 'FedRAMP Standard SLAs', 'Tamper-Proof Audit Logs'],
  },
];

// Quality Guarantee Points
const QUALITY_POINTS = [
  'Strict TypeScript typing with zero runtime escape hatches.',
  '60/120 FPS native render pipelines on all target platforms.',
  'Exhaustive automated integration test suites prior to deployment.',
  'Direct senior-architect collaboration with transparent sprints.',
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
  useScrollReveal(containerRef);
  const { openChat } = useChat();
  const [activeSectorId, setActiveSectorId] = useState(3); // Default Finance & Banking

  const activeSector = SECTORS.find(s => s.id === activeSectorId) || SECTORS[2];
  const ActiveIcon = activeSector.icon;

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

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-20">
        
        {/* ================= TOP NAVBAR ================= */}
        <GlobalHeader />

        {/* ================= 1. HERO SECTION ================= */}
        <div className="space-y-6 reveal-item max-w-4xl pt-2">
          <h1 className="font-machina text-[9vw] md:text-[6.2vw] uppercase leading-[0.88] tracking-tight">
            <div>ENGINEERED FOR SCALE,</div>
            <div className="text-black/50">DRIVEN BY CRAFT.</div>
          </h1>

          <p className="font-neue max-w-2xl text-base md:text-xl leading-relaxed text-[#231b35] pt-1">
            Welcome to Opusgeeks. We are an elite technology and design studio crafting native mobile applications, resilient cloud systems, and spatial interfaces for teams that demand absolute stability.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openChat('Studio Collaboration Inquiry')}
              className="bg-[#181520] text-white px-8 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center space-x-3 shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Initiate Direct Dialogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openChat('Request Engineering Consultation')}
              className="bg-white/70 hover:bg-white text-[#181520] border border-black/15 px-7 py-3.5 rounded-full font-neue text-xs uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              Consult an Architect
            </button>
          </div>
        </div>

        {/* ================= 2. EXPERTISE IN THE MAKING (STUDIO SHOWCASE) ================= */}
        <div className="reveal-item">
          <InteractiveTiltCard className="bg-[#f0efe9]/80 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-3">
                  <h2 className="font-machina text-2xl md:text-4xl font-bold uppercase leading-tight text-[#181520]">
                    Expertise: Built Across Years of Engineering Excellence
                  </h2>
                  <p className="font-neue text-sm md:text-base leading-relaxed text-[#231b35]/85">
                    With a collective wealth of experience, our senior engineering collective crafts high-performance digital products that withstand intense production scale. From bare-metal mobile frameworks to distributed cloud clusters, we turn complex challenges into intuitive, reliable software.
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 flex flex-wrap items-center gap-3">
                  <span className="bg-white/80 border border-black/10 text-[#181520] px-4 py-1.5 rounded-full text-xs font-machina uppercase tracking-wider">
                    ● Native Speed
                  </span>
                  <span className="bg-white/80 border border-black/10 text-[#181520] px-4 py-1.5 rounded-full text-xs font-machina uppercase tracking-wider">
                    ● Zero-Defect Code
                  </span>
                  <span className="bg-white/80 border border-black/10 text-[#181520] px-4 py-1.5 rounded-full text-xs font-machina uppercase tracking-wider">
                    ● Sub-Second Sync
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="h-64 rounded-2xl overflow-hidden shadow-inner border border-black/10">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Engineering Studio"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="h-64 rounded-2xl overflow-hidden shadow-inner border border-black/10 mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                    alt="Architectural Skyline"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </InteractiveTiltCard>
        </div>

        {/* ================= 3. CORE TENETS (VISION, VALUES, MISSION) ================= */}
        <div className="space-y-6">
          <div className="border-b border-black/10 pb-4 reveal-item">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
              Our Core Tenets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-group">
            {CORE_TENETS.map((tenet, idx) => {
              const Icon = tenet.icon;
              return (
                <InteractiveTiltCard
                  key={idx}
                  onClick={() => openChat(`Studio Principle: ${tenet.title}`)}
                  className="bg-[#f0efe9]/80 hover:bg-white backdrop-blur-xl border border-white/80 hover:border-black/20 rounded-3xl p-7 flex flex-col justify-between space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#181520] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-machina text-xl font-bold uppercase text-[#181520] group-hover:text-black transition-colors">
                      {tenet.title}
                    </h3>

                    <p className="font-neue text-xs md:text-sm leading-relaxed text-[#231b35]/80">
                      {tenet.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-machina uppercase tracking-wider text-black/50">
                    <span>Opus Standard</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#181520]" />
                  </div>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>

        {/* ================= 4. ROYAL SOVEREIGN CIRCULAR SECTORS MATRIX ================= */}
        <div className="space-y-8 reveal-item">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full bg-black/[0.05] border border-black/10 text-xs font-machina uppercase tracking-widest text-[#181520] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#181520]" />
              <span>Industries</span>
            </div>
            <h2 className="font-machina text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#181520]">
              Opus Geeks Serves Several Sectors
            </h2>
            <p className="font-neue text-xs sm:text-sm md:text-base leading-relaxed text-[#231b35]/80">
              Opus Geeks caters to various sectors, including technology, finance, healthcare, and more. Our customized solutions are customized to meet the specific needs of each industry; ensuring businesses can succeed in the digital world. With our expertise in understanding industry challenges and trends, we&apos;re here to help you achieve success, nevertheless of your sector.
            </p>
          </div>

          {/* Royal Circular Stage Container */}
          <div className="bg-[#f0efe9]/95 backdrop-blur-3xl border-2 border-white rounded-[44px] p-6 sm:p-10 md:p-14 shadow-[0_40px_100px_rgba(24,21,32,0.08)] relative overflow-hidden">
            
            {/* Ambient Celestial Glow & Platinum Lens Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] bg-[#c9d2e7]/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/70 rounded-full blur-3xl pointer-events-none" />

            {/* Desktop & Tablet: TRUE 360° ROYAL ASTROLABE RADAR MATRIX */}
            <div className="hidden md:flex relative w-full h-[700px] lg:h-[780px] items-center justify-center">
              
              {/* Concentric Astrolabe Rings & Tick Tracks */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] lg:w-[420px] h-[340px] lg:h-[420px] rounded-full border border-black/15 bg-[#c9d2e7]/25 shadow-[0_0_90px_rgba(24,21,32,0.08)] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] lg:w-[600px] h-[500px] lg:h-[600px] rounded-full border border-dashed border-black/20 animate-[spin_200s_linear_infinite] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[660px] lg:w-[740px] h-[660px] lg:h-[740px] rounded-full border border-black/10 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] lg:w-[760px] h-[680px] lg:h-[760px] rounded-full border border-dashed border-black/[0.08] animate-[spin_260s_linear_infinite_reverse] pointer-events-none" />

              {/* Sweeping Horology Radar Beam */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] lg:w-[760px] h-[680px] lg:h-[760px] rounded-full pointer-events-none overflow-hidden animate-[spin_28s_linear_infinite]">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-[#181520]/[0.06] via-transparent to-transparent origin-bottom-right rounded-tl-full" />
              </div>

              {/* Dynamic Laser Connection Constellation Beam */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                {(() => {
                  const activeIdx = SECTORS.findIndex(s => s.id === activeSectorId);
                  const angleRad = ((activeIdx * (360 / SECTORS.length)) - 90) * (Math.PI / 180);
                  const targetX = 50 + 41 * Math.cos(angleRad);
                  const targetY = 50 + 41 * Math.sin(angleRad);
                  return (
                    <g>
                      <line
                        x1="50"
                        y1="50"
                        x2={targetX}
                        y2={targetY}
                        stroke="#181520"
                        strokeWidth="0.5"
                        strokeDasharray="2 1"
                        strokeOpacity="0.75"
                      />
                      <circle
                        cx={targetX}
                        cy={targetY}
                        r="1.2"
                        fill="#181520"
                      />
                      <circle
                        cx={targetX}
                        cy={targetY}
                        r="2.2"
                        fill="none"
                        stroke="#c9d2e7"
                        strokeWidth="0.3"
                      />
                    </g>
                  );
                })()}
              </svg>

              {/* ================= DEAD CENTER: ONLY ANIMATED OPUSGEEKS ================= */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
                <div 
                  onClick={() => openChat('Enterprise Multi-Sector Architecture Consultation')}
                  className="w-56 h-56 lg:w-68 lg:h-68 rounded-full bg-[#181520] text-white shadow-[0_25px_70px_rgba(24,21,32,0.4)] border-2 border-white/30 flex items-center justify-center relative cursor-pointer group hover:scale-105 transition-all duration-500 hover:shadow-[0_0_90px_rgba(24,21,32,0.7)] p-4 select-none backdrop-blur-2xl ring-8 ring-[#181520]/10"
                >
                  {/* Outer Bezel Astrolabe Micro-Ticks */}
                  <div className="absolute inset-2.5 rounded-full border border-dashed border-white/20 animate-[spin_100s_linear_infinite_reverse] pointer-events-none" />

                  {/* Embedded Interactive 3D WebGL Canvas */}
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-45 group-hover:opacity-80 transition-opacity duration-500">
                    <Industries3DCore
                      activeSectorAngle={activeSector.angle}
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* ONLY Prominent Animated Opusgeeks Branding */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none animate-pulse">
                    <OpusLogo dark={true} className="text-3xl lg:text-4xl font-extrabold uppercase tracking-widest text-white drop-shadow-2xl" />
                  </div>
                </div>
              </div>

              {/* ================= 10 ROYAL SIGNET SATELLITE NODES ================= */}
              {SECTORS.map((sector, index) => {
                const isSelected = sector.id === activeSectorId;
                const SIcon = sector.icon;

                // Trigonometric distribution around 360 degrees
                const angleRad = ((index * (360 / SECTORS.length)) - 90) * (Math.PI / 180);
                const rPercent = 41; // 41% radius
                const xPercent = 50 + rPercent * Math.cos(angleRad);
                const yPercent = 50 + rPercent * Math.sin(angleRad);

                return (
                  <div
                    key={sector.id}
                    style={{
                      left: `${xPercent}%`,
                      top: `${yPercent}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute z-30"
                  >
                    <button
                      onClick={() => setActiveSectorId(sector.id)}
                      onMouseEnter={() => setActiveSectorId(sector.id)}
                      className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 cursor-pointer shadow-md select-none ${
                        isSelected
                          ? 'bg-[#181520] text-white border-[#181520] scale-125 shadow-[0_20px_50px_rgba(24,21,32,0.4)] z-40 ring-4 ring-[#c9d2e7]/60'
                          : 'bg-white/95 hover:bg-[#181520] text-[#181520] hover:text-white border-black/10 hover:border-[#181520] hover:scale-105 backdrop-blur-2xl hover:shadow-xl'
                      }`}
                    >
                      {/* Royal Numeral Disc */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-machina font-extrabold text-[10px] border transition-colors ${
                        isSelected
                          ? 'bg-white text-[#181520] border-white shadow-sm'
                          : 'bg-[#181520] text-white border-black/20 group-hover:bg-white group-hover:text-[#181520]'
                      }`}>
                        {sector.id < 10 ? `0${sector.id}` : sector.id}
                      </div>

                      {/* Icon */}
                      <SIcon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                        isSelected ? 'text-[#c9d2e7]' : 'text-[#181520] group-hover:text-[#c9d2e7]'
                      }`} />

                      {/* Sector Title Label */}
                      <span className="font-machina text-xs font-bold uppercase tracking-wider whitespace-nowrap pr-1">
                        {sector.title}
                      </span>
                    </button>
                  </div>
                );
              })}

            </div>

            {/* Mobile Responsive View (< md) */}
            <div className="md:hidden space-y-4 relative z-10">
              {/* Central Opusgeeks Mobile */}
              <div className="flex justify-center mb-6">
                <div 
                  onClick={() => openChat('Enterprise Multi-Sector Architecture Consultation')}
                  className="w-44 h-44 rounded-full bg-[#181520] text-white shadow-2xl border-2 border-white/25 flex items-center justify-center p-4 relative cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="relative z-10 animate-pulse">
                    <OpusLogo dark={true} className="text-2xl font-extrabold uppercase tracking-widest text-white" />
                  </div>
                </div>
              </div>

              {/* Mobile Sector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SECTORS.map((sec) => {
                  const SIcon = sec.icon;
                  const isSelected = sec.id === activeSectorId;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectorId(sec.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 text-left cursor-pointer ${
                        isSelected
                          ? 'bg-[#181520] text-white border-[#181520] shadow-xl ring-2 ring-[#c9d2e7]/50'
                          : 'bg-white/90 hover:bg-[#181520] text-[#181520] hover:text-white border-black/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-machina font-bold text-xs ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#181520] text-white'
                        }`}>
                          {sec.id < 10 ? `0${sec.id}` : sec.id}
                        </div>
                        <span className="font-machina text-xs font-bold uppercase tracking-wider">
                          {sec.title}
                        </span>
                      </div>
                      <SIcon className={`w-4 h-4 ${isSelected ? 'text-[#c9d2e7]' : 'text-[#181520]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= ROYAL SOVEREIGN ARCHITECTURE VAULT (BOTTOM CONSOLE) ================= */}
            <div className="mt-8 pt-6 border-t border-black/10 relative z-10">
              <div className="bg-[#181520] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
                
                {/* Ambient Platinum Flare */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#c9d2e7]/15 rounded-full blur-3xl pointer-events-none" />

                {/* Domain Info */}
                <div className="space-y-3 relative z-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-white/10 text-[#c9d2e7] border border-white/20 px-4 py-1 rounded-full font-machina text-[10px] uppercase tracking-wider font-bold">
                      Protocol // {activeSector.id < 10 ? `0${activeSector.id}` : activeSector.id} • {activeSector.badge}
                    </span>
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest hidden sm:inline">
                      Audited Architecture
                    </span>
                  </div>

                  <h3 className="font-machina text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                    {activeSector.title}
                  </h3>

                  <p className="font-neue text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
                    {activeSector.desc}
                  </p>
                  
                  {/* Architecture Guarantees Checklist */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {activeSector.specs.map((sp, idx) => (
                      <span key={idx} className="inline-flex items-center space-x-1.5 text-xs font-neue text-[#c9d2e7] bg-white/[0.06] px-3.5 py-1 rounded-full border border-white/15">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c9d2e7] shrink-0" />
                        <span>{sp}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consultation Trigger Button */}
                <button
                  onClick={() => openChat(`Enterprise Architecture Blueprint Consultation for ${activeSector.title}`)}
                  className="shrink-0 bg-white text-[#181520] hover:bg-[#c9d2e7] py-4 px-8 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl active:scale-95 cursor-pointer font-bold relative z-10 group"
                >
                  <span>Commission {activeSector.title} Blueprint</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

              </div>
            </div>

          </div>
        </div>

        {/* ================= 5. QUALITY GUARANTEE (OBSIDIAN 3D TILT CARD) ================= */}
        <InteractiveTiltCard className="bg-[#181520] text-white rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden reveal-item border border-white/10">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#c9d2e7]/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#c9d2e7] mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#c9d2e7]" />
                  <span>The Opus Engineering Standard</span>
                </div>
                <h3 className="font-machina text-2xl md:text-3xl font-bold uppercase">
                  Rigorous Quality & Reliability Protocol
                </h3>
              </div>

              <button
                onClick={() => openChat('Audit Technical Requirements')}
                className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-7 py-3 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 whitespace-nowrap shadow-md active:scale-95 cursor-pointer"
              >
                <span>Audit Requirements</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUALITY_POINTS.map((pt, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <CheckCircle2 className="w-4 h-4 text-[#c9d2e7] shrink-0 mt-0.5" />
                  <span className="font-neue text-xs md:text-sm text-white/85 leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </InteractiveTiltCard>

        {/* ================= 6. BOTTOM MONOLITH CTA ================= */}
        <div className="bg-[#181520] text-white rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl reveal-item border border-white/10">
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
            className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-8 py-4 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-3 whitespace-nowrap shadow-lg active:scale-95 cursor-pointer outline-none border-none"
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
