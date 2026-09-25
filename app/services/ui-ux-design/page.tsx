'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { 
  Palette, 
  Smartphone, 
  Layers, 
  Sparkles, 
  ArrowUpRight, 
  Eye, 
  Boxes, 
  Compass, 
  Activity, 
  Monitor, 
  ChevronRight
} from 'lucide-react';
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from '@/components/ScrollReveal';
import { useChat } from '@/components/providers/ChatProvider';
import ServicesCarouselSlider from '@/components/ServicesCarouselSlider';
import DesignProcessTimeline from '@/components/DesignProcessTimeline';
import BeforeAfterShowcase from '@/components/BeforeAfterShowcase';
import AgencyMetricsShowcase from '@/components/AgencyMetricsShowcase';
import TrustMarqueeStrip from '@/components/TrustMarqueeStrip';

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

        {/* ================= 2. 8 CORE DESIGN SERVICES INTERACTIVE SLIDER ================= */}
        <ServicesCarouselSlider
          title="Design & Spatial Capabilities"
          subtitle="From flagship web and native mobile interfaces to design systems and 3D WebGL motion."
          tagLabel="8 DESIGN DISCIPLINES"
          services={DESIGN_SERVICES}
          chatPrefix="Design Capability Discovery"
        />

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

        {/* ================= 4. DESIGN PROCESS TIMELINE ================= */}
        <DesignProcessTimeline />

        {/* ================= 5. BEFORE & AFTER TRANSFORMATION SHOWCASE ================= */}
        <BeforeAfterShowcase />

        {/* ================= 6. AGENCY METRICS SHOWCASE ================= */}
        <AgencyMetricsShowcase type="web" />

        {/* ================= 7. TRUST MARQUEE STRIP ================= */}
        <TrustMarqueeStrip />

      </div>

      <GlobalFooter />
    </div>
  );
}
