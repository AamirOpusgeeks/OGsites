'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { 
  Palette, 
  Smartphone, 
  Layers, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Eye, 
  Boxes, 
  Compass, 
  Activity, 
  Monitor, 
  ArrowLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import OpusLogo from '@/components/OpusLogo';
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from '@/components/ScrollReveal';
import { useChat } from '@/components/providers/ChatProvider';

// 8 Design Pillars - Concise, punchy descriptions
const DESIGN_SERVICES = [
  {
    icon: Monitor,
    title: 'Flagship Web Design',
    tag: 'Web & Spatial',
    desc: 'Award-winning digital storefronts and marketing interfaces engineered with fluid typography and kinetic layouts.',
    metrics: 'Spatial Layouts • Responsive Grid',
  },
  {
    icon: Smartphone,
    title: 'Mobile App UX/UI',
    tag: 'iOS & Android',
    desc: 'Native iOS and Android ergonomics built strictly adhering to Apple HIG and Google Material 3 guidelines.',
    metrics: 'iOS HIG • Material 3 • Haptics',
  },
  {
    icon: Layers,
    title: 'Enterprise Design Systems',
    tag: 'Tokens / Atomic',
    desc: 'Unified multi-platform token architectures connecting Figma component libraries directly to production codebases.',
    metrics: 'Figma Tokens • Storybook • Atomic',
  },
  {
    icon: Palette,
    title: 'Brand Identity & Motion',
    tag: 'Branding / Motion',
    desc: 'Distinctive brand identities, kinetic logos, custom typefaces, and interactive brand guidelines that leave lasting impressions.',
    metrics: 'Brand Systems • Motion Guides',
  },
  {
    icon: Boxes,
    title: '3D & WebGL Experiences',
    tag: 'Three.js / Shaders',
    desc: 'Tactile 3D viewports, particle systems, and interactive spatial shaders that elevate brand engagement.',
    metrics: 'Three.js • Spline • Realtime GL',
  },
  {
    icon: Compass,
    title: 'Conversion UX & CRO',
    tag: 'Funnels / Retention',
    desc: 'Frictionless onboarding funnels and user flow optimizations proven to maximize customer retention and checkout conversion.',
    metrics: 'User Journeys • Friction Audits',
  },
  {
    icon: Activity,
    title: 'Interactive Prototyping',
    tag: 'Framer / Micro-UX',
    desc: 'High-fidelity clickable prototypes and micro-animations designed to validate user experience before engineering sprints.',
    metrics: 'Framer • Micro-Interactions',
  },
  {
    icon: Eye,
    title: 'Accessibility & Dark Mode',
    tag: 'WCAG 2.2 AAA',
    desc: 'High-contrast ergonomic interfaces engineered for zero eye fatigue and certified WCAG 2.2 AAA accessibility.',
    metrics: 'WCAG 2.2 AAA • Dark Ergonomics',
  },
];

// Interactive Design Matrix Tabs from the live site
const DESIGN_TABS = [
  {
    id: 'website',
    name: 'Website Design',
    headline: 'Visually Stunning & Conversion-Focused',
    desc: 'We create immersive web experiences that establish instant authority. By combining cutting-edge editorial layouts with intuitive user journeys, our websites elevate digital brand presence and drive measurable outcomes.',
    stats: ['+68% Engagement Time', '< 0.3s Visual Clarity', '100% Mobile Responsive'],
    tech: ['Figma Grid Systems', 'WebGL Shaders', 'Kinetic Typography', 'Spatial Navigation'],
  },
  {
    id: 'mobile',
    name: 'Mobile Apps Design',
    headline: 'Tactile Mobile Ergonomics & Haptics',
    desc: 'From one-handed reachability to fluid gesture-driven navigation, we craft native iOS and Android interfaces that feel natural, delightful, and lightning fast.',
    stats: ['Sub-Second State Transitions', 'Native iOS & Android Flows', '4.9★ UX Usability Score'],
    tech: ['Apple HIG', 'Material You', 'Fluid Micro-Gestures', 'Design Tokens'],
  },
  {
    id: 'systems',
    name: 'Design Systems',
    headline: 'Unified Multi-Platform Component Kits',
    desc: 'Comprehensive Figma libraries and token systems that synchronize engineering and product teams, eliminating design drift and accelerating release velocity.',
    stats: ['10x Faster Feature Sprints', 'Zero Visual Drift', '100% Component Coverage'],
    tech: ['Figma Tokens', 'Storybook Sync', 'Atomic Hierarchy', 'Accessibility Audit'],
  },
  {
    id: 'branding',
    name: 'Brand & Motion',
    headline: 'Memorable Identity & Dynamic Motion',
    desc: 'We forge memorable visual identities that stand out in crowded global markets. From custom vector iconography to signature micro-interactions, we give products distinct souls.',
    stats: ['Signature Vector Sets', 'Motion Curve Specs', 'Global Multi-Format Assets'],
    tech: ['Vector Crafting', 'After Effects Lottie', 'Kinetic Motion Guides', 'Typography'],
  },
];

// Impact Metrics
const METRICS = [
  {
    value: '+68%',
    label: 'Conversion Lift',
    sub: 'Proven across enterprise client apps',
    icon: TrendingUp,
  },
  {
    value: '150+',
    label: 'Design Systems',
    sub: 'Synchronized with live production code',
    icon: Layers,
  },
  {
    value: '100%',
    label: 'WCAG 2.2 AAA',
    sub: 'Universal accessibility certified',
    icon: CheckCircle2,
  },
  {
    value: '25+',
    label: 'Design Accolades',
    sub: 'Awwwards, FWA & UX Excellence',
    icon: Sparkles,
  },
];

// Featured Design Case Studies
const CASE_STUDIES = [
  {
    title: 'Zenith Institutional Terminal',
    category: 'Fintech & Web3 Interface',
    tag: 'Design Systems & Tokens',
    desc: 'High-contrast Web3 institutional trading interface engineered for zero eye fatigue and instant order book clarity.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    stats: ['0% Cognitive Fatigue', '3.8x Interaction Speed'],
  },
  {
    title: 'Aura Luxury Commerce',
    category: 'Luxury Editorial Commerce',
    tag: 'Spatial UI & 3D Previews',
    desc: 'Tactile editorial commerce storefront featuring 3D product previews and instant 1-click spatial checkout.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    stats: ['+72% Session Duration', '99.4% Checkout Ease'],
  },
  {
    title: 'Mind Nourishment Health',
    category: 'Digital Wellness & Biofeedback',
    tag: 'Tactile Micro-Interactions',
    desc: 'Calming bio-feedback interfaces, spatial soundscapes, and intuitive mental wellness tracking.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    stats: ['4.9★ Accessibility Rating', '2.4M Happy Users'],
  },
  {
    title: 'FinEdge Global Banking',
    category: 'Enterprise Mobile Banking',
    tag: 'Zero-Friction Flows',
    desc: 'High-frequency mobile banking UX engineered with clear financial hierarchies and biometric authorization states.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    stats: ['42% Faster Onboarding', 'AAA WCAG Certified'],
  },
];

const TECH_STACK = [
  'Figma & FigJam',
  'Design Tokens & Tokens Studio',
  'Spline 3D & Three.js',
  'GSAP Animation Suite',
  'Storybook Component Docs',
  'Framer Motion',
  'Lenis Smooth Scroll',
  'WCAG 2.2 Accessibility Tools',
  'Adobe Creative Suite',
  'Lottie Motion Animations'
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

export default function UIUXDesignPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat } = useChat();
  const [activeTabId, setActiveTabId] = useState('website');

  const selectedTab = DESIGN_TABS.find(t => t.id === activeTabId) || DESIGN_TABS[0];

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans">
      {/* Studio Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-20">
        
        {/* ================= TOP NAV BAR ================= */}
        <GlobalHeader />

        {/* ================= 1. HERO SECTION ================= */}
        <div className="space-y-6 reveal-item max-w-4xl pt-2">
          <h1 className="font-machina text-[9vw] md:text-[6.2vw] uppercase leading-[0.88] tracking-tight">
            <div>FUTURISTIC EXPERIENCE &</div>
            <div className="text-black/50">INTERFACE DESIGN.</div>
          </h1>

          <p className="font-neue text-base md:text-xl leading-relaxed text-[#231b35] max-w-2xl pt-1">
            We make the collaboration of people and interface more intensive, intuitive, and conversion-driven through cutting-edge design systems and spatial micro-interactions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openChat('UI/UX & Design Systems Architecture Review')}
              className="bg-[#181520] text-white px-8 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center space-x-3 shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Schedule Design Blueprint</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openChat('Request UI/UX Design Estimation')}
              className="bg-white/70 hover:bg-white text-[#181520] border border-black/15 px-7 py-3.5 rounded-full font-neue text-xs uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              Request Custom Estimate
            </button>
          </div>
        </div>

        {/* ================= 2. 8 CORE DESIGN SERVICES GRID WITH 3D TILT ================= */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-4 gap-2 reveal-item">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
              Design & Spatial Capabilities
            </h2>
            <p className="font-neue text-xs text-black/60 max-w-md">
              From flagship web and native mobile interfaces to design systems and 3D WebGL motion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-group">
            {DESIGN_SERVICES.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <InteractiveTiltCard
                  key={idx}
                  onClick={() => openChat(`Design Capability Discovery: ${svc.title}`)}
                  className="group bg-[#f2f1ec]/85 hover:bg-white/95 backdrop-blur-2xl border border-black/[0.08] hover:border-black/25 rounded-3xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-[#181520] text-[#c9d2e7] flex items-center justify-center group-hover:scale-110 group-hover:bg-black transition-all shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-black/60 bg-black/[0.04] border border-black/10 px-2.5 py-1 rounded-full">
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
                    <span className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                      <span>{svc.metrics}</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#181520]" />
                  </div>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>

        {/* ================= 3. INTERACTIVE DOMAIN MATRIX (INSPECTABLE TABS) ================= */}
        <div className="space-y-6 reveal-item">
          <div className="border-b border-black/10 pb-4">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
              Design Disciplines Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Tabs Selection */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              {DESIGN_TABS.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#181520] text-white border-[#181520] shadow-md scale-[1.02]'
                        : 'bg-[#f0efe9]/80 hover:bg-white text-[#181520] border-white/80'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#c9d2e7]' : 'bg-black/30'}`} />
                      <span className="font-machina text-sm uppercase tracking-wider font-semibold">
                        {tab.name}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-black/40'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Focus Panel */}
            <div className="lg:col-span-8">
              <InteractiveTiltCard
                className="h-full bg-[#181520] text-white rounded-3xl p-8 md:p-10 shadow-xl border border-white/10 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#c9d2e7]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Discipline Focus • {selectedTab.name}</span>
                  </div>

                  <h3 className="font-machina text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    {selectedTab.headline}
                  </h3>

                  <p className="font-neue text-sm leading-relaxed text-white/80">
                    {selectedTab.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    {selectedTab.stats.map((st, sIdx) => (
                      <div key={sIdx} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                        <span className="font-machina text-xs uppercase tracking-wider text-white font-semibold">
                          {st}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedTab.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 border border-white/15 px-3 py-1 rounded-full text-[11px] font-neue text-[#c9d2e7]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openChat(`Design Consultation: ${selectedTab.name}`)}
                    className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-6 py-2.5 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Inspect Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </InteractiveTiltCard>
            </div>
          </div>
        </div>

        {/* ================= 4. LUXURY METRICS & SCALE CARD ================= */}
        <InteractiveTiltCard
          className="bg-[#181520] text-white rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden reveal-item border border-white/10"
        >
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#c9d2e7]/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#c9d2e7] mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#c9d2e7]" />
                  <span>Measurable Interface Impact</span>
                </div>
                <h3 className="font-machina text-2xl md:text-3xl font-bold uppercase">
                  Engineered For Conversion & Retention
                </h3>
              </div>
              <button
                onClick={() => openChat('Direct Inquiry: UI/UX & Design Systems')}
                className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-7 py-3 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 whitespace-nowrap shadow-md active:scale-95 cursor-pointer"
              >
                <span>Initiate Design Brief</span>
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
                      <span>Impact</span>
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

        {/* ================= 5. FEATURED DESIGN CASE STUDIES ================= */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-4 gap-2 reveal-item">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
              Featured Design Case Studies
            </h2>
            <p className="font-neue text-xs text-black/60 max-w-md">
              High-contrast trading terminals, spatial commerce experiences, and multi-platform component kits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-group">
            {CASE_STUDIES.map((study, idx) => (
              <InteractiveTiltCard
                key={idx}
                className="group bg-[#f2f1ec]/85 hover:bg-white/95 backdrop-blur-2xl border border-black/[0.08] hover:border-black/25 rounded-3xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Header */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="bg-black/60 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-machina uppercase tracking-wider shadow-sm">
                        {study.category}
                      </span>
                      <span className="bg-white/90 backdrop-blur-md text-[#181520] border border-black/10 px-3 py-1 rounded-full text-[10px] font-mono font-medium shadow-sm">
                        {study.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <h3 className="font-machina text-xl md:text-2xl font-bold uppercase tracking-wide">
                        {study.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-7 space-y-4">
                    <p className="font-neue text-xs md:text-sm leading-relaxed text-[#231b35]/80">
                      {study.desc}
                    </p>

                    {/* Verified Metrics Chips */}
                    {study.stats && study.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {study.stats.map((st, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-black/[0.03] border border-black/[0.08] rounded-xl px-3 py-2 text-center flex items-center justify-center space-x-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span className="font-mono text-[11px] font-semibold text-[#181520] truncate">
                              {st}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 md:p-7 pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className="text-xs font-neue text-black/50 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                    <span>Interface & Experience Design</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openChat(`Case Study Breakdown: ${study.title}`);
                    }}
                    className="bg-[#181520] text-white px-5 py-2.5 rounded-full text-xs font-machina uppercase tracking-widest hover:bg-black hover:scale-105 transition-all flex items-center space-x-2 cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Inspect Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </InteractiveTiltCard>
            ))}
          </div>
        </div>

      </div>

      <GlobalFooter />
    </div>
  );
}
