'use client';

import { useState, useRef, MouseEvent, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import ProjectMediaScreen from "@/components/ProjectMediaScreen";
import AgencyMetricsShowcase from '@/components/AgencyMetricsShowcase';
import TrustMarqueeStrip from '@/components/TrustMarqueeStrip';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/components/providers/SmoothScroll';
import { useChat } from '@/components/providers/ChatProvider';

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
  { id: 'web', label: 'Website & Cloud' },
  { id: 'uiux', label: 'UI/UX Design' },
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
    id: 'vstream',
    number: '02',
    title: 'V-Stream Aviation Charter',
    client: 'V-Stream Private Jet',
    category: 'web',
    categoryLabel: 'Website & Cloud',
    year: '2026',
    metric: '< 0.3s First Paint',
    desc: 'Next-generation private jet charter platform offering real-time fleet availability, empty-leg flight matching, and custom bespoke itineraries.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85',
    tags: ['Next.js 15', 'Tailwind CSS', 'Flight API', 'Edge Cache'],
    screenLabel: 'Private Aviation Platform',
  },
  {
    id: 'crypto',
    number: '03',
    title: 'Zenith Trading Terminal',
    client: 'Zenith Protocol',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    year: '2026',
    metric: '68% Conversion Boost',
    desc: 'Next-generation institutional trading interface prioritizing high-contrast order books, transaction state clarity, and ultra-dark glass ergonomics.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1600&q=85',
    tags: ['Dark Mode Ergonomics', 'Order Book UX', 'Tactile States', 'Component Library'],
    screenLabel: 'Web3 Terminal UX',
  },
  {
    id: 'cloud-saas',
    number: '04',
    title: 'Nexus Cloud Intelligence',
    client: 'Nexus Data Corp',
    category: 'web',
    categoryLabel: 'Website & Cloud',
    year: '2026',
    metric: '45k+ Req/Sec Ingestion',
    desc: 'Multi-tenant cloud infrastructure and telemetry dashboard delivering real-time metric streams with distributed edge caching and sub-10ms queries.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
    tags: ['Next.js 15', 'Distributed WebSockets', 'ClickHouse', 'Tailwind CSS'],
    screenLabel: 'Cloud Platform Architecture',
  },
  {
    id: 'lecavalier',
    number: '05',
    title: 'Le Cavalier Wine Vault',
    client: 'Le Cavalier Cellars',
    category: 'app',
    categoryLabel: 'Mobile Architecture',
    year: '2026',
    metric: '+185% Volume Growth',
    desc: 'Luxury wine asset verification, private barrel auctioning, and instant biometric checkout tailored for ultra-high-net-worth collectors.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
    tags: ['SwiftUI', 'Kotlin Compose', 'Biometrics', 'Stripe Terminal'],
    screenLabel: 'Luxury Asset Vault App',
  },
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
  const [transform, setTransform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
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
    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.012, 1.012, 1.012)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.14 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
    if (onHoverState) onHoverState(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHoverState?.(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: 'preserve-3d', transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)' }}
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
  const [heroSlide, setHeroSlide] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();
  const { openChat } = useChat();

  // Hero slider projects (all 5 curated projects)
  const heroProjects = PROJECTS;

  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % heroProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroProjects.length]);

  // Filter logic
  const filteredProjects = activeFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === activeFilter);

  // Scroll animations
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.scroll-reveal-card').forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lenis, activeFilter]);

  const currentHeroProject = heroProjects[heroSlide];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans select-none"
    >
      {/* Baked Studio Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="Studio Background"
          className="w-full h-full object-cover"
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

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-20">
        
        {/* ================= TOP NAVIGATION ================= */}
        <GlobalHeader />

        {/* ================= 1. CINEMATIC HERO SLIDER ================= */}
        <div className="scroll-reveal-card -mx-6 md:-mx-14">
          <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] overflow-hidden rounded-none sm:rounded-[32px] sm:mx-6 md:mx-14 bg-[#0c0d14]">
            {/* Background Image with crossfade */}
            {heroProjects.map((project, idx) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === heroSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            ))}

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-16 z-10">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                    {currentHeroProject.categoryLabel} • {currentHeroProject.year}
                  </span>
                </div>
                <h2 className="font-machina text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white leading-[0.95] tracking-tight mb-4 transition-all duration-500">
                  {currentHeroProject.title}
                </h2>
                <p className="font-neue text-sm sm:text-base text-white/75 leading-relaxed max-w-lg mb-6 hidden sm:block">
                  {currentHeroProject.desc}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openChat(`Architecture Exploration: ${currentHeroProject.title}`)}
                    className="bg-white text-[#181520] px-7 py-3 rounded-full font-machina text-xs uppercase tracking-widest hover:bg-white/90 transition-all flex items-center space-x-2.5 shadow-lg active:scale-95 cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="bg-white/15 backdrop-blur-md text-white border border-white/20 px-4 py-2.5 rounded-full text-[11px] font-mono hidden sm:inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {currentHeroProject.metric}
                  </span>
                </div>
              </div>

              {/* Slide Navigation */}
              <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex items-center gap-3">
                <button
                  onClick={() => setHeroSlide(prev => (prev - 1 + heroProjects.length) % heroProjects.length)}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  {heroProjects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === heroSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setHeroSlide(prev => (prev + 1) % heroProjects.length)}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. EDITORIAL FILTER STRIP ================= */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-machina text-3xl md:text-4xl font-bold uppercase text-[#181520] tracking-tight">
                Selected Works
              </h2>
              <p className="font-neue text-sm text-black/60 mt-1">
                {filteredProjects.length} projects across mobile, cloud & design systems
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-black/10">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? PROJECTS.length 
                : PROJECTS.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-machina uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 cursor-pointer border ${
                    activeFilter === cat.id
                      ? 'bg-[#181520] text-white border-[#181520] shadow-md scale-105'
                      : 'bg-white/50 hover:bg-white text-[#181520] border-black/10 hover:border-black/30'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeFilter === cat.id ? 'bg-white/20 text-white' : 'bg-black/5 text-black/60'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 3. SINGLE FEATURED SHOWCASE ================= */}
        {filteredProjects.length > 0 && (
          <InteractiveCard
            onHoverState={setIsHoveringCard}
            className="scroll-reveal-card bg-[#f2f1ec]/85 hover:bg-white/95 backdrop-blur-2xl border border-black/[0.08] hover:border-black/20 rounded-[32px] p-6 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0c0d14] border border-black/10 shadow-2xl">
                  <ProjectMediaScreen
                    id={filteredProjects[0].id}
                    title={filteredProjects[0].title}
                    image={filteredProjects[0].image}
                    videoUrl={filteredProjects[0].videoUrl}
                    isFeatured={true}
                  />
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-black/50 block mb-2">
                    Featured • {filteredProjects[0].categoryLabel}
                  </span>
                  <h2 className="font-machina text-3xl md:text-4xl font-bold uppercase text-[#181520] tracking-tight mb-4 leading-tight">
                    {filteredProjects[0].title}
                  </h2>
                  <p className="font-neue text-base leading-relaxed text-[#231b35]/85 mb-5">
                    {filteredProjects[0].desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {filteredProjects[0].tags.map((tag) => (
                      <span key={tag} className="border border-black/15 bg-black/[0.03] text-[#181520] px-3 py-1 rounded-full text-xs font-neue">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-5 border-t border-black/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-xs font-semibold text-[#181520]">{filteredProjects[0].metric}</span>
                  </div>
                  <button
                    onClick={() => openChat(`Case Study: ${filteredProjects[0].title}`)}
                    className="bg-[#181520] text-white px-7 py-3 rounded-full flex items-center space-x-3 text-xs uppercase tracking-widest font-machina hover:bg-black transition-all shadow-md cursor-pointer"
                  >
                    <span>Explore Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </InteractiveCard>
        )}

        {/* ================= 4. INTERACTIVE PROJECT LIST (AWWWARDS-STYLE) ================= */}
        {filteredProjects.length > 1 && (
          <div className="scroll-reveal-card">
            <div className="border-b border-black/10 pb-4 mb-0">
              <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
                All Projects
              </h2>
            </div>

            {/* Interactive Hover-Reveal List */}
            <div className="relative">
              {/* Floating Image Preview (appears on hover, follows cursor Y) */}
              {hoveredProject && (
                <div 
                  className="hidden lg:block fixed z-40 pointer-events-none"
                  style={{
                    left: '62%',
                    top: `${cursorPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="w-[380px] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] border border-black/10 bg-[#0c0d14]">
                    <img
                      src={hoveredProject.image}
                      alt={hoveredProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {filteredProjects.slice(1).map((project, idx) => (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => openChat(`Case Study: ${project.title}`)}
                  className="border-b border-black/[0.07] py-6 md:py-7 flex items-center justify-between gap-4 cursor-pointer group/row hover:pl-4 transition-all duration-300"
                >
                  {/* Left: Number + Title + Category */}
                  <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                    <span className="font-machina text-sm md:text-base text-black/25 font-bold w-8 shrink-0 group-hover/row:text-black/60 transition-colors">
                      {String(idx + 2).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-machina text-lg md:text-2xl font-bold uppercase text-[#181520] tracking-tight group-hover/row:text-black transition-colors truncate">
                        {project.title}
                      </h3>
                      <span className="font-neue text-xs text-black/50 md:hidden">
                        {project.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Center: Category + Year (desktop) */}
                  <div className="hidden md:flex items-center gap-6 shrink-0">
                    <span className="font-neue text-xs uppercase tracking-wider text-black/50 w-32">
                      {project.categoryLabel}
                    </span>
                    <span className="font-mono text-xs text-black/40 w-12">
                      {project.year}
                    </span>
                  </div>

                  {/* Right: Metric + Arrow */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-[#181520]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {project.metric}
                    </span>
                    <div className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center group-hover/row:bg-[#181520] group-hover/row:text-white group-hover/row:border-[#181520] transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 4. AGENCY METRICS SHOWCASE ================= */}
        <AgencyMetricsShowcase type="web" />

        {/* ================= 5. TRUST MARQUEE STRIP ================= */}
        <TrustMarqueeStrip />

        {/* ================= 6. MONOLITH BOTTOM CTA ================= */}
        <div className="scroll-reveal-card relative bg-[#181520] text-white rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
          
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
            <button
              onClick={() => openChat('Architecture Review Request')}
              className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-8 py-4 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-3 shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Schedule Architecture Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <GlobalFooter />
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
