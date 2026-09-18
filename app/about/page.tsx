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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
    shortTitle: 'Energy & Grid',
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
    shortTitle: 'EdTech',
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
    shortTitle: 'Fintech',
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
    shortTitle: 'Real Estate',
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
    shortTitle: 'Industry 4.0',
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
    shortTitle: 'Resources',
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
    shortTitle: 'Healthcare',
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
    shortTitle: 'Enterprise',
    title: 'Professional Services',
    icon: Briefcase,
    angle: 252,
    badge: 'Enterprise ERP',
    headline: 'High-Velocity Practice Management',
    desc: 'Automated billing microservices, global multi-currency invoicing engines, and real-time resource allocations.',
    specs: ['Real-Time Audit Trail', 'Multi-Entity Consolidated Ledger', 'Single Sign-On (SAML/Okta)'],
  },
  {
    id: 9,
    shortTitle: 'Telecom',
    title: 'Telecom & Media',
    icon: Radio,
    angle: 288,
    badge: '5G Core & CDN',
    headline: 'Ultra-Low Latency Streaming Fabrics',
    desc: 'Adaptive bitrate video encoders, real-time subscriber billing engines, and global edge caching nodes.',
    specs: ['Sub-50ms Global Latency', 'Multi-CDN Failover', 'Dynamic BGP Routing'],
  },
  {
    id: 10,
    shortTitle: 'GovTech',
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
  const orbitalSectionRef = useRef<HTMLDivElement>(null);
  const centerOrbRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useScrollReveal(containerRef);
  const { openChat } = useChat();
  const [activeSectorId, setActiveSectorId] = useState(3); // Default Finance & Banking

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

      // 2. All 10 Satellite Badges burst outward from dead center (x: 0, y: 0) to their radial orbit!
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
  const ActiveIcon = activeSector.icon;

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans">
      {/* Baked Studio Backdrop Image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-20">
        
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
                    <span>Pillar // 0{idx + 1}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>

        {/* ================= 4. ROYAL SOVEREIGN CIRCULAR SECTORS MATRIX ================= */}
        <div ref={orbitalSectionRef} className="space-y-4 reveal-item">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/[0.05] border border-black/10 text-[11px] font-machina uppercase tracking-widest text-[#181520] shadow-sm">
              <Sparkles className="w-3 h-3 text-[#181520]" />
              <span>Industries</span>
            </div>
            <h2 className="font-machina text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#181520]">
              Opus Geeks Serves Several Sectors
            </h2>
            <p className="font-neue text-xs sm:text-sm leading-relaxed text-[#231b35]/80">
              Customized digital architectures engineered for high-concurrency protocols and enterprise domains.
            </p>
          </div>

          {/* Compact Royal Circular Stage Container */}
          <div className="bg-[#f0efe9]/95 backdrop-blur-3xl border-2 border-white rounded-[36px] p-5 sm:p-7 shadow-[0_25px_70px_rgba(24,21,32,0.07)] relative overflow-hidden max-w-5xl mx-auto">
            
            {/* Ambient Celestial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[650px] h-[520px] sm:h-[650px] bg-[#c9d2e7]/40 rounded-full blur-3xl pointer-events-none" />

            {/* Desktop & Tablet: TRUE 360° ROYAL ASTROLABE RADAR MATRIX */}
            <div className="hidden md:flex relative w-full h-[500px] lg:h-[540px] items-center justify-center">
              
              {/* Concentric Astrolabe Rings & Tick Tracks */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] lg:w-[310px] h-[270px] lg:h-[310px] rounded-full border border-black/15 bg-[#c9d2e7]/20 shadow-[0_0_60px_rgba(24,21,32,0.06)] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[390px] lg:w-[440px] h-[390px] lg:h-[440px] rounded-full border border-dashed border-black/15 animate-[spin_200s_linear_infinite] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] lg:w-[540px] h-[480px] lg:h-[540px] rounded-full border border-black/10 pointer-events-none" />

              {/* Sweeping Horology Radar Beam */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] lg:w-[540px] h-[480px] lg:h-[540px] rounded-full pointer-events-none overflow-hidden animate-[spin_28s_linear_infinite]">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-[#181520]/[0.05] via-transparent to-transparent origin-bottom-right rounded-tl-full" />
              </div>

              {/* Dynamic Laser Connection Constellation Beam (Pixel-Perfect Alignment) */}
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
                  
                  // Start from outer rim of OPUSGEEKS orb
                  const startX = Math.cos(angleRad) * orbRadius;
                  const startY = Math.sin(angleRad) * orbRadius;
                  
                  // Connect directly to the badge node
                  const endX = Math.cos(angleRad) * (distance - 14);
                  const endY = Math.sin(angleRad) * (distance - 14);

                  return (
                    <g key={activeSectorId} className="transition-all duration-300">
                      {/* Ambient Glow Beam */}
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
                      {/* Laser Dashed Line */}
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
                      {/* Pulsing Target Dot at Badge Contact */}
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
                  className="w-36 h-36 lg:w-42 lg:h-42 rounded-full bg-[#181520] text-white shadow-[0_15px_50px_rgba(24,21,32,0.4)] border-2 border-white/30 flex items-center justify-center relative cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-[0_0_70px_rgba(24,21,32,0.65)] p-2.5 select-none backdrop-blur-2xl ring-4 ring-[#181520]/10"
                >
                  {/* Outer Bezel Astrolabe Micro-Ticks */}
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-white/20 animate-[spin_100s_linear_infinite_reverse] pointer-events-none" />

                  {/* Embedded Interactive 3D WebGL Canvas */}
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-45 group-hover:opacity-80 transition-opacity duration-300">
                    <Industries3DCore
                      activeSectorAngle={activeSector.angle}
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* Prominent Animated Opusgeeks Branding */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none animate-pulse">
                    <OpusLogo dark={true} className="text-xl lg:text-2xl font-extrabold uppercase tracking-widest text-white drop-shadow-2xl" />
                  </div>
                </div>
              </div>

              {/* ================= 10 ROYAL SIGNET SATELLITE NODES (GSAP Center-Burst) ================= */}
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
                          ? 'bg-[#181520] text-white border-[#181520] shadow-[0_10px_30px_rgba(24,21,32,0.4)] z-40 ring-2 ring-[#c9d2e7]/70 scale-110'
                          : 'bg-white/95 hover:bg-[#181520] text-[#181520] hover:text-white border-black/10 hover:border-[#181520] hover:scale-105 backdrop-blur-2xl hover:shadow-lg'
                      }`}
                    >
                      {/* Numeral Disc */}
                      <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center font-machina font-extrabold text-[9px] border transition-colors ${
                        isSelected
                          ? 'bg-white text-[#181520] border-white shadow-sm'
                          : 'bg-[#181520] text-white border-black/20 group-hover:bg-white group-hover:text-[#181520]'
                      }`}>
                        {sector.id < 10 ? `0${sector.id}` : sector.id}
                      </div>

                      {/* Icon */}
                      <SIcon className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${
                        isSelected ? 'text-[#c9d2e7]' : 'text-[#181520] group-hover:text-[#c9d2e7]'
                      }`} />

                      {/* Sector Title Label */}
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
              {/* Central Opusgeeks Mobile */}
              <div className="flex justify-center mb-4">
                <div 
                  onClick={() => openChat('Enterprise Multi-Sector Architecture Consultation')}
                  className="w-28 h-28 rounded-full bg-[#181520] text-white shadow-xl border-2 border-white/30 flex items-center justify-center p-2 relative cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="relative z-10 animate-pulse">
                    <OpusLogo dark={true} className="text-lg font-extrabold uppercase tracking-widest text-white" />
                  </div>
                </div>
              </div>

              {/* Mobile Sector Cards */}
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
                          ? 'bg-[#181520] text-white border-[#181520] shadow-md ring-2 ring-[#c9d2e7]/50'
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
                      <SIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#c9d2e7]' : 'text-[#181520]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= COMPACT SOVEREIGN PROTOCOL BAR ================= */}
            <div className="mt-4 pt-3.5 border-t border-black/10 relative z-10">
              <div className="bg-[#181520] text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 relative overflow-hidden">
                
                {/* Domain Info */}
                <div className="space-y-1 relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-white/10 text-[#c9d2e7] border border-white/20 px-2.5 py-0.5 rounded-full font-machina text-[9px] uppercase tracking-wider font-bold">
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

                {/* Consultation Trigger Button */}
                <button
                  onClick={() => openChat(`Enterprise Architecture Blueprint Consultation for ${activeSector.title}`)}
                  className="shrink-0 bg-white text-[#181520] hover:bg-[#c9d2e7] py-2.5 px-5 rounded-full font-machina text-[11px] uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-1.5 shadow-md active:scale-95 cursor-pointer font-bold relative z-10 group"
                >
                  <span>Commission Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
