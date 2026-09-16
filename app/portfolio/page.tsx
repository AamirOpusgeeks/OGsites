'use client';

import { useState, useRef, MouseEvent, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import OpusLogo from "@/components/OpusLogo";
import ProjectMediaScreen from "@/components/ProjectMediaScreen";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  categoryLabel: string;
  year: string;
  metric: string;
  desc: string;
  image: string;
  tags: string[];
  screenLabel: string;
  videoUrl?: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'app', label: 'Mobile Architecture' },
  { id: 'web', label: 'Cloud Systems' },
  { id: 'uiux', label: 'Design Systems' },
];

const PROJECTS: Project[] = [
  {
    id: 'fintech',
    number: '01',
    title: 'FinEdge Banking Platform',
    client: 'FinEdge Global',
    category: 'app',
    categoryLabel: 'Mobile Architecture',
    year: '2026',
    metric: '< 8ms Sync Latency',
    desc: 'High-frequency mobile banking engine engineered with native biometrics, sub-second ledger updates, and bulletproof offline-first synchronization.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=85',
    tags: ['React Native CLI', 'Biometric Encryption', 'Zero-Trust', 'Redux Toolkit'],
    screenLabel: 'iOS & Android Native Core',
  },
  {
    id: 'cloud-saas',
    number: '02',
    title: 'Nexus Cloud Intelligence',
    client: 'Nexus Data Corp',
    category: 'web',
    categoryLabel: 'Enterprise Cloud',
    year: '2026',
    metric: '45k+ Req/Sec Ingestion',
    desc: 'Multi-tenant cloud infrastructure and telemetry dashboard delivering real-time metric streams with distributed edge caching and sub-10ms queries.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
    tags: ['Next.js 15', 'Distributed WebSockets', 'ClickHouse', 'Tailwind CSS'],
    screenLabel: 'Cloud Platform Architecture',
  },
  {
    id: 'ecosystem',
    number: '03',
    title: 'Aura AI Design System',
    client: 'Aura Intelligence',
    category: 'uiux',
    categoryLabel: 'Design Systems',
    year: '2025',
    metric: '45% Faster Dev Velocity',
    desc: 'Spatial interface system and component framework crafted for AI copilot tools, emphasizing tactile micro-interactions and accessible typography.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=85',
    tags: ['Token Architecture', 'Micro-Interactions', 'Spatial UI', 'Figma Tokens'],
    screenLabel: 'Unified Spatial Guidelines',
  },
  {
    id: 'logistics',
    number: '04',
    title: 'HyperShip Dispatch Suite',
    client: 'HyperShip Global',
    category: 'app',
    categoryLabel: 'Mobile Architecture',
    year: '2025',
    metric: 'Zero Battery Drain GPS',
    desc: 'Mission-critical native mobile app for last-mile fleet operations featuring background geolocation, instant barcode decoding, and offline route sync.',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1600&q=85',
    tags: ['Background Geolocation', 'Offline SQLite', 'Native iOS/Android', 'Fastlane'],
    screenLabel: 'Driver Dispatch UI',
  },
  {
    id: 'venture',
    number: '05',
    title: 'VenturePulse Portal',
    client: 'VenturePulse Partners',
    category: 'web',
    categoryLabel: 'Enterprise Cloud',
    year: '2025',
    metric: '$2.4B+ Assets Tracked',
    desc: 'Bespoke private equity analytics engine offering real-time cap-table modeling, live capital call feeds, and multi-signature authorization pipelines.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85',
    tags: ['TypeScript', 'GraphQL Subscriptions', 'Micro-Frontends', 'AWS Edge'],
    screenLabel: 'Cap-Table Analytics UI',
  },
  {
    id: 'crypto',
    number: '06',
    title: 'Zenith Trading Terminal',
    client: 'Zenith Protocol',
    category: 'uiux',
    categoryLabel: 'Design Systems',
    year: '2024',
    metric: '68% Conversion Boost',
    desc: 'Next-generation institutional trading interface prioritizing high-contrast order books, transaction state clarity, and ultra-dark glass ergonomics.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1600&q=85',
    tags: ['Dark Mode Ergonomics', 'Order Book UX', 'Tactile States', 'Component Library'],
    screenLabel: 'Web3 Terminal UX',
  },
];

const STUDIO_METRICS = [
  { label: 'Production Apps Deployed', value: '65+', sub: 'iOS, Android & Cloud' },
  { label: 'Global Active Endpoints', value: '500K+', sub: 'Sub-second real-time sync' },
  { label: 'Infrastructure Uptime', value: '99.99%', sub: 'Enterprise tier SLA' },
  { label: 'Capital Volume Secured', value: '$2.4B+', sub: 'Zero-trust native encryption' },
];

function InteractiveCard({ 
  children, 
  className = '',
  onHoverState 
}: { 
  children: React.ReactNode; 
  className?: string;
  onHoverState?: (hovered: boolean) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg)');
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

    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1.008)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.12 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
    if (onHoverState) onHoverState(false);
  };

  const handleMouseEnter = () => {
    if (onHoverState) onHoverState(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: 'preserve-3d', transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      className={`relative will-change-transform ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

function PortfolioContent() {
  const searchParams = useSearchParams();
  const requestedProject = searchParams.get('project');
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Mouse tracking for custom magnetic cursor
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Butter-Smooth Lenis & GSAP ScrollTrigger Integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e: { progress: number }) => {
      ScrollTrigger.update();
      setScrollProgress(Math.round(e.progress * 100));
    });

    const rafHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    // 1. Kinetic Parallax Image Windows on Scroll
    const parallaxImages = document.querySelectorAll('.parallax-img-target');
    const triggers: ScrollTrigger[] = [];

    parallaxImages.forEach((img) => {
      const parent = img.parentElement;
      if (!parent) return;

      const st = ScrollTrigger.create({
        trigger: parent,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          const yOffset = (self.progress - 0.5) * 48;
          gsap.set(img, { y: yOffset, scale: 1.08 });
        },
      });
      triggers.push(st);
    });

    // 2. Velocity-Driven Kinetic Marquee
    if (marqueeRef.current) {
      let currentX = 0;
      const marqueeInner = marqueeRef.current;
      
      const marqueeST = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const velocity = self.getVelocity() / 300;
          currentX -= 1.2 + Math.min(Math.max(velocity, -15), 15);
          gsap.set(marqueeInner, { x: currentX % (marqueeInner.scrollWidth / 2) });
        }
      });
      triggers.push(marqueeST);
    }

    // 3. Staggered Entrance Animations
    const animatedCards = document.querySelectorAll('.scroll-reveal-card');
    animatedCards.forEach((card) => {
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 36, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.ticker.remove(rafHandler);
      lenis.destroy();
    };
  }, [activeFilter]);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  // If a project is targeted via query param, reorder to put it first if in 'all' view
  const displayProjects = [...filteredProjects];
  if (requestedProject && activeFilter === 'all') {
    const targetIdx = displayProjects.findIndex((p) => p.id === requestedProject);
    if (targetIdx > 0) {
      const [targetItem] = displayProjects.splice(targetIdx, 1);
      displayProjects.unshift(targetItem);
    }
  }

  const featuredProject = displayProjects[0];
  const gridProjects = displayProjects.slice(1);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#c9d2e7] text-[#181520] pt-6 md:pt-8 pb-28 px-6 md:px-14 overflow-hidden font-sans selection:bg-[#181520] selection:text-[#c9d2e7]"
    >
      {/* Baked Lighting Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="background"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Floating Magnetic Luxury Cursor Badge */}
      <div
        className={`fixed pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:flex items-center justify-center ${
          isHoveringCard ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.25s ease, transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="bg-[#181520]/90 text-white backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-2xl flex items-center space-x-2 font-machina text-[11px] uppercase tracking-widest">
          <span>Explore</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Dynamic Glassmorphic Floating Scroll HUD Pill */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 pointer-events-auto ${
          scrollProgress > 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="bg-[#181520]/80 backdrop-blur-xl text-white px-5 py-2.5 rounded-full border border-white/20 shadow-2xl flex items-center space-x-5 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-widest text-white/90">Opusgeeks</span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <div className="text-white/70 tracking-wider">
            {scrollProgress}%
          </div>
          <div className="h-3 w-px bg-white/20" />
          <button 
            onClick={() => {
              if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1 });
            }}
            className="text-white hover:text-white/70 uppercase tracking-widest cursor-pointer transition-colors"
          >
            ↑ Top
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
        
        {/* ================= TOP NAVIGATION (CLEAN, MINIMAL GAP) ================= */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <a href="/" className="flex items-center group">
            <OpusLogo variant="full" size={26} />
          </a>
          <a
            href="/"
            className="inline-flex items-center space-x-2 font-machina text-xs uppercase tracking-wider text-[#181520] px-4 py-2 rounded-full border border-black/15 bg-white/50 hover:bg-white transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </a>
        </div>

        {/* ================= 1. MONUMENTAL EDITORIAL HEADER (TIGHT GAP UNDER LOGO) ================= */}
        <div className="mt-6 md:mt-8 flex flex-col space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-machina text-[10vw] md:text-[6.8vw] uppercase leading-[0.88] tracking-tight">
                <div>CRAFTED FOR</div>
                <div className="text-black/40">PERFORMANCE.</div>
              </h1>
            </div>
            <div className="lg:col-span-4 pb-2">
              <p className="font-neue text-base md:text-lg leading-relaxed text-[#231b35]/90">
                A curated selection of high-frequency native mobile architectures, distributed cloud applications, and conversion-first design systems engineered for global scale.
              </p>
            </div>
          </div>

          {/* Clean Editorial Filter Strip */}
          <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-black/10">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? PROJECTS.length 
                : PROJECTS.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs uppercase font-neue tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
                    activeFilter === cat.id
                      ? 'bg-[#181520] text-white shadow-md'
                      : 'bg-white/50 hover:bg-white text-[#181520]/80 border border-black/10'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    activeFilter === cat.id ? 'bg-white/20 text-white' : 'bg-black/5 text-black/60'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 2. FEATURED SHOWCASE CARD ================= */}
        {featuredProject && (
          <div className="mt-10 md:mt-14 scroll-reveal-card">
            <InteractiveCard 
              onHoverState={setIsHoveringCard}
              className="bg-[#f2f1ec]/85 backdrop-blur-xl border border-white/70 rounded-[28px] p-6 md:p-10 shadow-[0_20px_45px_rgba(0,0,0,0.06)] group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                
                {/* Visual Showcase Screen with Parallax Window */}
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#121118] border border-black/10 shadow-inner">
                  <div className="parallax-img-target absolute inset-0 w-full h-[115%] -top-[7%]">
                    <ProjectMediaScreen
                      id={featuredProject.id}
                      title={featuredProject.title}
                      image={featuredProject.image}
                      videoUrl={featuredProject.videoUrl}
                      isFeatured={true}
                    />
                  </div>
                </div>

                {/* Editorial Details */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <h2 className="font-machina text-3xl md:text-4xl font-bold uppercase text-[#181520] tracking-tight mb-4 leading-tight">
                      {featuredProject.title}
                    </h2>
                    <p className="font-neue text-base leading-relaxed text-[#231b35]/85 mb-6">
                      {featuredProject.desc}
                    </p>

                    {/* Clean Tech Spec Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-black/15 bg-black/[0.03] text-[#181520] px-3 py-1 rounded-full text-xs font-neue"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* High-End Action Row */}
                  <div className="pt-6 border-t border-black/10 flex items-center justify-end">
                    <a
                      href="https://opusgeeks.com/contact"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#181520] text-white px-7 py-3 rounded-full flex items-center space-x-3 text-xs uppercase tracking-widest font-machina hover:bg-black transition-all shadow-md group-hover:scale-105 cursor-pointer"
                    >
                      <span>Explore Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>
            </InteractiveCard>
          </div>
        )}

        {/* ================= 3. KINETIC VELOCITY SCROLL MARQUEE ================= */}
        <div className="relative w-screen -ml-6 md:-ml-14 my-14 md:my-20 py-4 overflow-hidden border-y border-black/10 bg-white/20 backdrop-blur-xs select-none">
          <div 
            ref={marqueeRef}
            className="flex whitespace-nowrap text-xs font-mono uppercase tracking-[0.25em] text-[#181520]/75 will-change-transform"
          >
            <span className="mx-6">• HIGH-FREQUENCY ARCHITECTURE</span>
            <span className="mx-6">• SUB-SECOND STATE SYNCHRONIZATION</span>
            <span className="mx-6">• ZERO-TRUST NATIVE ENCRYPTION</span>
            <span className="mx-6">• DISTRIBUTED EDGE INGESTION</span>
            <span className="mx-6">• CONVERSION-ENGINEERED SPATIAL UI</span>
            <span className="mx-6">• HIGH-FREQUENCY ARCHITECTURE</span>
            <span className="mx-6">• SUB-SECOND STATE SYNCHRONIZATION</span>
            <span className="mx-6">• ZERO-TRUST NATIVE ENCRYPTION</span>
            <span className="mx-6">• DISTRIBUTED EDGE INGESTION</span>
            <span className="mx-6">• CONVERSION-ENGINEERED SPATIAL UI</span>
          </div>
        </div>

        {/* ================= 4. EDITORIAL GRID (WORLD CLASS CARDS) ================= */}
        {gridProjects.length > 0 && (
          <div className="mb-20 md:mb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {gridProjects.map((project) => (
                <InteractiveCard
                  key={project.id}
                  onHoverState={setIsHoveringCard}
                  className="scroll-reveal-card bg-[#f2f1ec]/80 backdrop-blur-xl border border-white/70 rounded-[28px] p-6 md:p-8 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.05)] group"
                >
                  <div>
                    {/* Minimalist Top Category Dot */}
                    <div className="flex items-center space-x-2 pb-4 border-b border-black/10">
                      <span className="w-2 h-2 rounded-full bg-[#181520]/70" />
                      <span className="font-mono text-xs uppercase tracking-wider text-black/70">
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Image Showcase Frame with Parallax Shift */}
                    <div className="relative mt-5 mb-6 w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#121118] border border-black/10 shadow-inner">
                      <div className="parallax-img-target absolute inset-0 w-full h-[115%] -top-[7%]">
                        <ProjectMediaScreen
                          id={project.id}
                          title={project.title}
                          image={project.image}
                          videoUrl={project.videoUrl}
                          isFeatured={false}
                        />
                      </div>
                    </div>

                    {/* Typography & Concise Architectural Narrative */}
                    <h3 className="font-machina text-2xl font-bold uppercase text-[#181520] mb-2.5 tracking-tight group-hover:text-black transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-neue text-sm leading-relaxed text-[#231b35]/80 mb-5">
                      {project.desc}
                    </p>

                    {/* Clean Tech Spec Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-black/15 bg-black/[0.03] text-[#181520] px-3 py-0.5 rounded-full text-xs font-neue"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Clean Bottom Action Bar */}
                  <div className="pt-4 border-t border-black/10 flex items-center justify-end">
                    <a
                      href="https://opusgeeks.com/contact"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-machina text-[#181520] hover:text-black transition-colors group/link cursor-pointer"
                    >
                      <span>Case Study</span>
                      <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover/link:bg-[#181520] group-hover/link:text-white transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </a>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        )}

        {/* ================= 5. STUDIO ENGINEERING BENCHMARK BAR ================= */}
        <div className="border-y border-black/10 py-10 md:py-14 my-10 scroll-reveal-card">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-black/10">
            {STUDIO_METRICS.map((metric, idx) => (
              <div key={idx} className={`pt-4 md:pt-0 ${idx !== 0 ? 'md:pl-10' : ''}`}>
                <div className="font-machina text-4xl md:text-5xl font-bold uppercase text-[#181520] tracking-tight">
                  {metric.value}
                </div>
                <div className="font-neue text-sm font-medium uppercase tracking-wider text-[#181520]/80 mt-2">
                  {metric.label}
                </div>
                <div className="font-mono text-xs text-black/40 mt-1">
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 6. EDITORIAL LEADERSHIP RETROSPECTIVE ================= */}
        <div className="scroll-reveal-card my-10 bg-[#ebe8e1]/60 border border-black/10 rounded-[28px] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <blockquote className="font-machina text-xl md:text-2xl uppercase tracking-tight text-[#181520] leading-snug">
              “Opusgeeks re-engineered our native mobile architecture from the ground up. Order execution speeds improved by 68%, and transaction fail rates dropped to near zero.”
            </blockquote>
            <div className="font-neue text-xs uppercase tracking-wider text-black/60 pt-1">
              Marcus Vance — VP of Engineering, FinEdge Global
            </div>
          </div>
          <div className="hidden md:block w-px h-24 bg-black/10" />
          <div className="space-y-1">
            <div className="font-machina text-lg uppercase text-[#181520]">
              SOC2 & ISO Compliant
            </div>
            <div className="font-neue text-xs text-black/60">
              Enterprise security audited native builds
            </div>
          </div>
        </div>

        {/* ================= 7. MONOLITH BOTTOM CTA ================= */}
        <div className="scroll-reveal-card my-10 relative bg-[#181520] text-white rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 text-center md:text-left max-w-xl">
            <div className="inline-block border border-white/20 rounded-full px-3.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white/70">
              Collaborate With Opusgeeks
            </div>
            <h2 className="font-machina text-3xl md:text-5xl font-bold uppercase leading-tight">
              Ready to architect your next breakthrough?
            </h2>
            <p className="font-neue text-white/70 text-sm md:text-base leading-relaxed">
              We translate high-stakes requirements into native mobile speed, distributed cloud resilience, and conversion-first UI design.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://opusgeeks.com/contact"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-8 py-4 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-3 shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Schedule Architecture Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#c9d2e7] flex items-center justify-center font-machina text-sm uppercase tracking-widest">
        Loading Opusgeeks Archive...
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  );
}
