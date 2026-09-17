'use client';

import { useState, useRef, MouseEvent, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import OpusLogo from "@/components/OpusLogo";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import ProjectMediaScreen from "@/components/ProjectMediaScreen";
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
  // 1. Mobile Architecture
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
    id: 'mind-nourishment',
    number: '02',
    title: 'Mind Nourishment Health',
    client: 'Mind Nourishment Inc',
    category: 'app',
    categoryLabel: 'Mobile Architecture',
    year: '2026',
    metric: '4.9★ App Store Rating',
    desc: 'Mental wellness ecosystem featuring continuous HRV biofeedback tracking, spatial soundscapes, and encrypted offline-first journaling.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=85',
    tags: ['React Native', 'HealthKit', 'Spatial Audio', 'WatermelonDB'],
    screenLabel: 'Wellness & Biofeedback App',
  },
  {
    id: 'lecavalier',
    number: '03',
    title: 'Le Cavalier Wine Vault',
    client: 'Le Cavalier Cellars',
    category: 'app',
    categoryLabel: 'Mobile Architecture',
    year: '2026',
    metric: '+185% Transaction Volume',
    desc: 'Luxury wine asset verification, private barrel auctioning, and instant biometric checkout tailored for ultra-high-net-worth collectors.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
    tags: ['SwiftUI', 'Kotlin Compose', 'Biometrics', 'Stripe Terminal'],
    screenLabel: 'Luxury Asset Vault App',
  },
  {
    id: 'wevents',
    number: '04',
    title: 'W VIP Event Hospitality',
    client: 'W Events Group',
    category: 'app',
    categoryLabel: 'Mobile Architecture',
    year: '2025',
    metric: '100k Peak Concurrent QPS',
    desc: 'Dynamic interactive 3D venue map, NFC proximity pass entry, and synchronized crowd telemetry for premier global festivals.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85',
    tags: ['Flutter', 'WebSocket Sync', 'NFC PassKit', '3D Maps'],
    screenLabel: 'VIP Hospitality & Ticketing',
  },

  // 2. Website & Cloud Systems
  {
    id: 'vstream',
    number: '05',
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
    id: 'cloud-saas',
    number: '06',
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
    id: 'kelstech',
    number: '07',
    title: 'Kelstech Home Services',
    client: 'Kelstech Group',
    category: 'web',
    categoryLabel: 'Website & Cloud',
    year: '2025',
    metric: '+92% Lead Conversion',
    desc: 'Modern on-demand home maintenance portal with instant technician dispatch, transparent quote estimation, and automated scheduling.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85',
    tags: ['Headless CMS', 'Next.js ISR', 'Dispatch Engine', 'PostgreSQL'],
    screenLabel: 'Field Services Portal',
  },
  {
    id: 'restaurant-techs',
    number: '08',
    title: 'Restaurant Techs Cloud & POS',
    client: 'Restaurant Techs Inc',
    category: 'web',
    categoryLabel: 'Website & Cloud',
    year: '2025',
    metric: '99.999% Offline Uptime',
    desc: 'Enterprise multi-location restaurant cloud management platform with real-time kitchen mesh ordering and live table telemetry.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
    tags: ['React 19', 'GraphQL Subscriptions', 'Microservices', 'Docker'],
    screenLabel: 'Kitchen Telemetry & POS',
  },
  {
    id: 'us-maxim',
    number: '09',
    title: 'US Maxim Luxury Commerce',
    client: 'US Maxim Brand',
    category: 'web',
    categoryLabel: 'Website & Cloud',
    year: '2025',
    metric: '+64% Cart Conversion',
    desc: 'Headless luxury e-commerce platform with dynamic inventory allocation, personalized recommendation algorithms, and sub-second checkout.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85',
    tags: ['Shopify Plus', 'Next.js Commerce', 'Stripe API', 'Vercel Edge'],
    screenLabel: 'Headless Luxury Storefront',
  },

  // 3. UI/UX Design Systems
  {
    id: 'crypto',
    number: '10',
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
    id: 'ecosystem',
    number: '11',
    title: 'Aura AI Design System',
    client: 'Aura Intelligence',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    year: '2025',
    metric: '45% Faster Dev Velocity',
    desc: 'Spatial interface system and component framework crafted for AI copilot tools, emphasizing tactile micro-interactions and accessible typography.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=85',
    tags: ['Token Architecture', 'Micro-Interactions', 'Spatial UI', 'Figma Tokens'],
    screenLabel: 'Unified Spatial Guidelines',
  },
  {
    id: 'smart-living',
    number: '12',
    title: 'SmartLiving IoT Interface',
    client: 'SmartLiving Labs',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    year: '2025',
    metric: 'Zero Latency Controls',
    desc: 'Minimalist spatial smart-home control dashboard built with high-fidelity tactile toggles, spatial zone layouts, and energy telemetry.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=85',
    tags: ['Spatial Dashboard', 'Tactile Toggles', 'IoT Ergonomics', 'Dark Glass'],
    screenLabel: 'Smart Home Spatial UX',
  },
  {
    id: 'voyage',
    number: '13',
    title: 'Voyage Spatial Travel UX',
    client: 'Voyage Global',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    year: '2025',
    metric: '+78% Booking Completion',
    desc: 'Frictionless travel exploration and spatial booking interface designed with immersive destination previews and interactive itinerary flows.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=85',
    tags: ['Interactive Maps', 'Frictionless Checkout', 'Motion Choreography', 'Design System'],
    screenLabel: 'Spatial Itinerary Experience',
  },
];

const STUDIO_METRICS = [
  { label: 'Production Releases', value: '540+', sub: 'iOS, Android & Cloud' },
  { label: 'Global Active Endpoints', value: '12M+', sub: 'Sub-second real-time sync' },
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

  const handleMouseEnter = () => {
    if (onHoverState) onHoverState(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
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
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();
  const { openChat } = useChat();

  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Filter logic
  const filteredProjects = activeFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === activeFilter);

  const featuredProject = requestedProject 
    ? PROJECTS.find(p => p.id === requestedProject) || filteredProjects[0] 
    : filteredProjects[0];

  const gridProjects = filteredProjects.filter(p => p.id !== featuredProject?.id);

  // Scroll animations
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Reveal cards smoothly on scroll
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

      // Kinetic Marquee velocity
      if (marqueeRef.current && lenis) {
        lenis.on('scroll', (e: { velocity: number }) => {
          const vel = Math.abs(e.velocity || 0);
          gsap.to(marqueeRef.current, {
            x: `-=${1.2 + vel * 0.4}`,
            ease: 'none',
            modifiers: {
              x: gsap.utils.unitize((x) => parseFloat(x) % 800),
            },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lenis, activeFilter]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#c9d2e7] text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans select-none"
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

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
        
        {/* ================= TOP NAVIGATION ================= */}
        <GlobalHeader />

        {/* ================= 1. MONUMENTAL EDITORIAL HEADER ================= */}
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

        {/* ================= 2. MASTER SHOWPIECE CARD ================= */}
        {featuredProject && (
          <div className="mt-12 mb-10 scroll-reveal-card">
            <InteractiveCard
              onHoverState={setIsHoveringCard}
              className="bg-[#f2f1ec]/85 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.06)] group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                
                {/* Visual Showcase Viewport */}
                <div className="lg:col-span-7">
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0c0d14] border border-black/10 shadow-2xl">
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
                    <span className="font-mono text-xs uppercase tracking-wider text-black/50 block mb-2">
                      Featured • {featuredProject.categoryLabel}
                    </span>
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
                    <button
                      onClick={() => openChat(`Architecture Exploration: ${featuredProject.title}`)}
                      className="bg-[#181520] text-white px-7 py-3 rounded-full flex items-center space-x-3 text-xs uppercase tracking-widest font-machina hover:bg-black transition-all shadow-md group-hover:scale-105 cursor-pointer outline-none border-none"
                    >
                      <span>Explore Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </InteractiveCard>
          </div>
        )}

        {/* ================= 3. KINETIC VELOCITY SCROLL MARQUEE ================= */}
        <div className="relative w-screen -ml-6 md:-ml-14 my-10 md:my-14 py-4 overflow-hidden border-y border-black/10 bg-white/20 backdrop-blur-xs select-none">
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

        {/* ================= 4. EDITORIAL GRID (WORLD CLASS 3D TILT CARDS) ================= */}
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
                    <button
                      onClick={() => openChat(`Case Study: ${project.title}`)}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-machina text-[#181520] hover:text-black transition-colors group/link cursor-pointer bg-transparent border-none outline-none"
                    >
                      <span>Case Study</span>
                      <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover/link:bg-[#181520] group-hover/link:text-white transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
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

        {/* ================= 6. MONOLITH BOTTOM CTA ================= */}
        <div className="scroll-reveal-card my-10 relative bg-[#181520] text-white rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden">
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
            <button
              onClick={() => openChat('Architecture Review Request')}
              className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-8 py-4 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-3 shadow-lg active:scale-95 cursor-pointer whitespace-nowrap outline-none border-none"
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
