'use client';

import React, { useState, useRef, MouseEvent, useMemo } from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  Search, 
  ChevronDown, 
  Plus, 
  Minus,
  MessageSquare, 
  Bot, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ArrowRight,
  HelpCircle,
  Code2,
  Smartphone,
  Palette,
  ShieldCheck,
  CheckCircle2,
  ArrowUp
} from 'lucide-react';
import OpusLogo from "@/components/OpusLogo";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from "@/components/ScrollReveal";
import { useChat } from "@/components/providers/ChatProvider";

// 3D Tilt Card Component
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

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
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

// Complete FAQ Data extracted from Opus Geeks official specs
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'web' | 'app' | 'uiux';
  highlight?: string;
}

const FAQ_CATEGORIES = [
  { id: 'web', label: 'Website Development', icon: Code2, count: 10 },
  { id: 'app', label: 'App Development', icon: Smartphone, count: 9 },
  { id: 'uiux', label: 'UI/UX Design', icon: Palette, count: 8 },
] as const;

const FAQ_DATA: FAQItem[] = [
  // --- WEBSITE DEVELOPMENT (Matching Screenshots 2 & 3) ---
  {
    id: 'web-1',
    category: 'web',
    question: 'What types of websites do you develop?',
    answer: 'We specialize in developing various types of websites including high-conversion e-commerce platforms, enterprise business websites, high-fidelity portfolio websites, custom editorial blogs, headless CMS architectures, and scalable full-stack web applications tailored to your specific business requirements.',
    highlight: 'E-commerce, Enterprise Portals, Headless Web Apps & Custom Platforms'
  },
  {
    id: 'web-2',
    category: 'web',
    question: 'Do you offer custom website development?',
    answer: 'Yes, 100% of our enterprise web solutions are custom-engineered from the ground up. We do not use restrictive off-the-shelf templates; every page, component, API integration, and database schema is tailored precisely to your brand identity, performance benchmarks, and conversion goals.',
    highlight: 'Bespoke UI/UX, Custom Codebase & Modular Component Systems'
  },
  {
    id: 'web-3',
    category: 'web',
    question: 'What technologies do you use for website development?',
    answer: 'Our modern engineering stack incorporates Next.js 15, React 19, TypeScript, TailwindCSS, Node.js, GraphQL, PostgreSQL, Redis, AWS Cloud infrastructure, Docker, Supabase, and headless CMS engines like Sanity and Payload CMS. This guarantees sub-second page loads, 100/100 Core Web Vitals, and effortless enterprise scalability.',
    highlight: 'Next.js 15, React 19, TypeScript, GraphQL, Node.js & Cloud Edge'
  },
  {
    id: 'web-4',
    category: 'web',
    question: 'How long does it take to develop a website?',
    answer: 'Project timelines depend on the functional scope and complexity. Typically, a high-fidelity business website or portfolio takes between 2 to 4 weeks, while complex full-stack web applications, headless e-commerce platforms, or multi-tenant SaaS products range from 6 to 12 weeks with weekly sprint deliverables.',
    highlight: '2–4 weeks for standard portals, 6–12 weeks for complex SaaS & platforms'
  },
  {
    id: 'web-5',
    category: 'web',
    question: 'Do you provide website maintenance services?',
    answer: 'Yes, we provide comprehensive ongoing website maintenance and SLA support. This includes 24/7 uptime monitoring, automated zero-downtime security patches, framework updates, continuous speed optimization, database backups, and dedicated feature sprint allocations.',
    highlight: '24/7 Monitoring, Security Audits, Framework Patches & Backups'
  },
  {
    id: 'web-6',
    category: 'web',
    question: 'Can you redesign an existing website?',
    answer: 'Absolutely. We modernize legacy websites by upgrading outdated technology stacks to modern Next.js/React architectures, restructuring information hierarchy, elevating visual branding with 3D/interactive aesthetics, and boosting SEO rankings with zero downtime during the DNS cutover.',
    highlight: 'Zero-Downtime Migration, UI Modernization & SEO Preservation'
  },
  {
    id: 'web-7',
    category: 'web',
    question: 'What is your approach to website design and development?',
    answer: 'Our methodology follows a rigorous 4-phase lifecycle: 1) Strategic Discovery & Architecture Mapping, 2) High-Fidelity UI/UX Prototyping in Figma, 3) Agile Sprint Engineering with continuous CI/CD integration, and 4) Multi-device QA, security pen-testing, and automated Lighthouse audit prior to global release.',
    highlight: 'Architecture-First, Figma Prototyping, Agile Sprints & Strict QA'
  },
  {
    id: 'web-8',
    category: 'web',
    question: 'Do you provide responsive website design?',
    answer: 'Every platform we engineer is fully responsive and mobile-first by default. We rigorously test across mobile smartphones, foldable displays, tablets, laptops, desktops, and 4K ultra-wide monitors to guarantee fluid rendering, touch-friendly navigation, and adaptive performance.',
    highlight: 'Fluid Multi-Device Layouts, Touch Optimization & Retina Graphics'
  },
  {
    id: 'web-9',
    category: 'web',
    question: 'How much does website development cost?',
    answer: 'Pricing is structured transparently based on project scope, custom design requirements, third-party integrations, and technical complexity. We offer milestone-based fixed contracts for defined scopes as well as dedicated agile team retainers. Contact us or engage our AI Architect for a detailed proposal.',
    highlight: 'Transparent Milestone Pricing, Fixed Contracts & Agile Retainers'
  },
  {
    id: 'web-10',
    category: 'web',
    question: 'Do you offer ongoing support after the website is launched?',
    answer: 'Yes, every project comes with an initial 30-day comprehensive post-launch warranty period for bug fixes and stability monitoring. We also provide long-term SLA retainers covering continuous feature additions, analytics reviews, and cloud infrastructure management.',
    highlight: '30-Day Post-Launch Warranty + Long-term SLA Retainers'
  },

  // --- APP DEVELOPMENT ---
  {
    id: 'app-1',
    category: 'app',
    question: 'What mobile platforms do you build applications for?',
    answer: 'We build enterprise applications for iOS (iPhone & iPad), Android (phones & tablets), and cross-platform mobile architectures that share high-performance codebases across both major operating systems.',
    highlight: 'iOS, Android & Cross-Platform Mobile Systems'
  },
  {
    id: 'app-2',
    category: 'app',
    question: 'Do you develop native apps or cross-platform apps?',
    answer: 'We specialize in both. We develop native iOS applications with Swift & SwiftUI, native Android apps with Kotlin & Jetpack Compose, and cross-platform apps using React Native and Flutter for fast time-to-market with near-native performance.',
    highlight: 'Swift, SwiftUI, Kotlin, React Native & Flutter'
  },
  {
    id: 'app-3',
    category: 'app',
    question: 'Can you assist with publishing apps to the App Store and Google Play?',
    answer: 'Yes, we handle the entire release process including developer account configuration, signing certificates, privacy disclosures, store assets, in-app purchase setups, and managing Apple App Store and Google Play Store review approvals.',
    highlight: 'Complete App Store & Google Play Store Submission Management'
  },
  {
    id: 'app-4',
    category: 'app',
    question: 'How do you handle real-time offline sync and mobile security?',
    answer: 'We implement local encrypted databases (WatermelonDB / SQLite / Realm) with background delta synchronization, biometric authentication (FaceID / Fingerprint), and TLS certificate pinning to protect all sensitive communications.',
    highlight: 'Encrypted Offline Caching, Biometric Auth & Certificate Pinning'
  },
  {
    id: 'app-5',
    category: 'app',
    question: 'Do you develop the backend API and database for mobile apps?',
    answer: 'Yes, our engineering team constructs robust cloud backends, GraphQL/REST microservices, push notification engines (APNs / FCM), and real-time WebSockets to power your mobile application seamlessly.',
    highlight: 'Custom Microservices, Push Notifications & Cloud Backends'
  },
  {
    id: 'app-6',
    category: 'app',
    question: 'How long does mobile app development take?',
    answer: 'A minimum viable product (MVP) mobile app typically takes 6 to 10 weeks. Comprehensive enterprise mobile ecosystems with complex hardware integrations or real-time payment rails range from 12 to 20 weeks.',
    highlight: '6–10 weeks for MVP, 12–20 weeks for Enterprise Systems'
  },
  {
    id: 'app-7',
    category: 'app',
    question: 'Can you upgrade or modernize an existing mobile application?',
    answer: 'Yes, we audit legacy apps, refactor slow components, update outdated SDKs to the latest iOS/Android targets, and improve UI fluidity with 60fps/120fps hardware acceleration.',
    highlight: 'SDK Upgrades, 120fps UI Optimizations & Performance Refactoring'
  },
  {
    id: 'app-8',
    category: 'app',
    question: 'How do you test mobile applications before launch?',
    answer: 'We conduct automated unit tests, integration testing via Detox/Appium, and real-device testing across 20+ hardware models through TestFlight (iOS) and Google Play Internal Testing tracks.',
    highlight: 'Automated CI/CD Testing + Multi-Device Real Hardware Lab'
  },
  {
    id: 'app-9',
    category: 'app',
    question: 'Do you offer ongoing app maintenance and annual OS upgrades?',
    answer: 'Yes, we provide ongoing maintenance retainers ensuring your application remains compliant with annual Apple iOS and Google Android major OS updates, policy changes, and security standards.',
    highlight: 'Annual OS Version Compatibility & Continuous Retainers'
  },

  // --- UI/UX DESIGN ---
  {
    id: 'uiux-1',
    category: 'uiux',
    question: 'What is included in your UI/UX design process?',
    answer: 'Our UI/UX process encompasses competitor benchmarking, user persona definition, wireframing, high-fidelity Figma visual mockups, clickable interactive prototypes, typography/color systems, and design handoff specifications for developers.',
    highlight: 'User Research, Wireframes, Figma Prototypes & Design Systems'
  },
  {
    id: 'uiux-2',
    category: 'uiux',
    question: 'What design tools do you use for UI/UX?',
    answer: 'Our team primarily uses Figma for interface design and interactive prototyping, Adobe Creative Suite for visual branding and vector assets, Spline / Blender for 3D spatial models, and Principle / After Effects for micro-interactions.',
    highlight: 'Figma, Spline 3D, Blender, After Effects & Adobe Creative Suite'
  },
  {
    id: 'uiux-3',
    category: 'uiux',
    question: 'Do you create interactive clickable prototypes?',
    answer: 'Yes, we build detailed clickable Figma prototypes that simulate the exact user journeys, transitions, and component states so stakeholders can experience the product before a single line of code is written.',
    highlight: 'Full Interactive Flow Prototypes for User Testing & Stakeholders'
  },
  {
    id: 'uiux-4',
    category: 'uiux',
    question: 'Can you build a reusable Design System for our company?',
    answer: 'Yes, we construct scalable design systems with organized component libraries, auto-layout tokens, typography scales, dark/light theme variants, and accessibility compliance guidelines (WCAG 2.1).',
    highlight: 'Scalable Component Libraries, Design Tokens & WCAG Guidelines'
  },
  {
    id: 'uiux-5',
    category: 'uiux',
    question: 'Can you redesign our existing application or website interface?',
    answer: 'Yes, we perform UX audits on existing products to identify friction points, drop-off rates, and aesthetic shortcomings, then deliver an elevated, modern interface with improved usability metrics.',
    highlight: 'UX Friction Audit, Modern Visual Refresh & Conversion Lift'
  },
  {
    id: 'uiux-6',
    category: 'uiux',
    question: 'Do you create 3D assets, custom icons, and spatial graphics?',
    answer: 'Yes, our visual designers create bespoke 3D glassmorphic elements, custom icon sets, isometric diagrams, and lightweight WebGL/Spline scenes designed specifically for modern high-end web experiences.',
    highlight: 'Bespoke 3D Assets, Spatial Visuals & Custom Icon Systems'
  },
  {
    id: 'uiux-7',
    category: 'uiux',
    question: 'How do you ensure the design is implemented accurately by developers?',
    answer: 'We provide pixel-perfect design specifications with interactive Figma handoff files, CSS/Tailwind token mappings, and conduct design QA reviews throughout the engineering cycle to guarantee 100% fidelity.',
    highlight: 'Design Token Handoff & Collaborative Engineering Design QA'
  },
  {
    id: 'uiux-8',
    category: 'uiux',
    question: 'What is the typical timeline for a complete UI/UX design project?',
    answer: 'A standard web application or mobile app design project usually takes between 2 to 6 weeks, depending on the number of unique screens, complexity of user flows, and depth of the design system.',
    highlight: '2–6 weeks with weekly milestone prototype presentations'
  },
];

export default function FAQPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat, toggleChat } = useChat();

  const [activeCategory, setActiveCategory] = useState<'web' | 'app' | 'uiux'>('web');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordionIds, setOpenAccordionIds] = useState<string[]>(['web-1']); // First one open by default

  // Toggle accordion open/close
  const toggleAccordion = (id: string) => {
    setOpenAccordionIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filtered FAQs based on active category and live search
  const filteredFAQs = useMemo(() => {
    let list = FAQ_DATA;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return list.filter(item => 
        item.question.toLowerCase().includes(q) || 
        item.answer.toLowerCase().includes(q) ||
        (item.highlight && item.highlight.toLowerCase().includes(q))
      );
    }
    return list.filter(item => item.category === activeCategory);
  }, [activeCategory, searchQuery]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#c9d2e7] text-[#181520] pt-6 md:pt-8 pb-0 px-0 overflow-hidden font-sans">
      {/* Studio Background Image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="background"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 flex flex-col space-y-16 md:space-y-20">
        
        {/* ================= TOP NAVBAR ================= */}
        <GlobalHeader />

        {/* ================= 1. HERO BANNER (Matching Screenshot 1) ================= */}
        <div className="reveal-item">
          <InteractiveTiltCard className="bg-gradient-to-br from-[#181520] via-[#201c2b] to-[#121017] text-white rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-[0_25px_60px_rgba(24,21,32,0.25)] border border-white/15 relative overflow-hidden">
            
            {/* Subtle Glow Spheres in background */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              
              {/* Left Column: Hero Text */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-machina uppercase tracking-widest text-[#c9d2e7]">
                  <HelpCircle className="w-3.5 h-3.5 text-[#c9d2e7]" />
                  <span>Knowledge Base & Support</span>
                </div>

                <h1 className="font-machina text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
                  Frequently <br />
                  <span className="text-[#c9d2e7]">Asked Questions</span>
                </h1>

                <p className="font-neue text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                  Got questions? We&apos;ve got answers! Check out our FAQ section to find quick solutions to common queries. From project inquiries to technical support, we&apos;re here to provide you with the information you need. Can&apos;t find what you&apos;re looking for? Feel free to reach out to us directly, and we&apos;ll be happy to assist you.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => openChat('Frequently Asked Questions & Project Consultation')}
                    className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-7 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest font-bold transition-all shadow-xl flex items-center space-x-3 active:scale-95 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => scrollToSection('faq-directory')}
                    className="px-6 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest font-medium border border-white/20 hover:bg-white/10 transition-all text-white/90 active:scale-95 cursor-pointer"
                  >
                    Browse Answers
                  </button>
                </div>
              </div>

              {/* Right Column: 3D Isometric Q & A Spatial Art (Matching Screenshot 1) */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="relative w-full max-w-md h-72 sm:h-80 md:h-96 rounded-3xl bg-white/5 border border-white/10 p-6 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-xl group">
                  
                  {/* Background Tech Grid & Isometric Floor */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Floating 3D "Q" Speech Card (Amber Glow) */}
                  <div className="absolute top-8 left-8 sm:left-12 z-20 transform -rotate-6 group-hover:rotate-0 group-hover:-translate-y-2 transition-all duration-500">
                    <div className="w-32 sm:w-36 h-28 sm:h-32 rounded-3xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-4 shadow-[0_20px_40px_rgba(245,158,11,0.35)] flex flex-col justify-between border border-amber-300/40 text-white">
                      <div className="flex justify-between items-center">
                        <span className="font-machina text-xs uppercase tracking-widest text-amber-100 font-bold">Query</span>
                        <div className="w-2.5 h-2.5 rounded-full bg-white/60 animate-pulse" />
                      </div>
                      <span className="font-machina text-5xl sm:text-6xl font-black self-center text-white drop-shadow-md">
                        Q
                      </span>
                      <div className="w-4 h-4 bg-[#d97706] absolute -bottom-2 left-6 rotate-45 border-r border-b border-amber-300/30" />
                    </div>
                  </div>

                  {/* Floating 3D "A" Speech Card (Periwinkle / Blue Glow) */}
                  <div className="absolute bottom-8 right-8 sm:right-12 z-20 transform rotate-6 group-hover:rotate-0 group-hover:translate-y-2 transition-all duration-500">
                    <div className="w-32 sm:w-36 h-28 sm:h-32 rounded-3xl bg-gradient-to-br from-[#6366f1] via-[#4f46e5] to-[#3730a3] p-4 shadow-[0_20px_40px_rgba(99,102,241,0.35)] flex flex-col justify-between border border-indigo-300/40 text-white">
                      <div className="flex justify-between items-center">
                        <span className="font-machina text-xs uppercase tracking-widest text-indigo-200 font-bold">Solution</span>
                        <CheckCircle2 className="w-4 h-4 text-indigo-200" />
                      </div>
                      <span className="font-machina text-5xl sm:text-6xl font-black self-center text-white drop-shadow-md">
                        A
                      </span>
                      <div className="w-4 h-4 bg-[#3730a3] absolute -bottom-2 right-6 rotate-45 border-r border-b border-indigo-300/30" />
                    </div>
                  </div>

                  {/* Center Radial Neural Node */}
                  <div className="relative z-10 w-24 h-24 rounded-full bg-white/10 border border-white/20 backdrop-blur-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="w-16 h-16 rounded-full bg-[#181520] border border-white/20 flex items-center justify-center shadow-inner">
                      <Bot className="w-7 h-7 text-[#c9d2e7] animate-pulse" />
                    </div>
                  </div>

                  {/* Connecting Arc Line */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-32 border-t-2 border-dashed border-white/20 rounded-full" />
                  </div>

                </div>
              </div>

            </div>
          </InteractiveTiltCard>
        </div>

        {/* ================= 2. GOT QUESTIONS? WE'VE GOT ANSWERS (Matching Screenshot 2 & 3) ================= */}
        <div id="faq-directory" className="space-y-10 reveal-item">
          
          {/* Centered Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-machina text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#181520]">
              Got Questions? <br />
              <span className="text-[#181520]/80">We&apos;ve Got Answers</span>
            </h2>

            <p className="font-neue text-xs sm:text-sm md:text-base leading-relaxed text-[#231b35]/80">
              At Opus Geeks, we understand that transparency is key. Whether you&apos;re curious about our services, pricing, or anything in between, we&apos;re here to provide the answers you need. Look through our frequently asked questions to find quick solutions, or simply reach out to us directly. Your inquiries are our priority, and we&apos;re committed to ensuring you have all the information necessary to make informed decisions.
            </p>
          </div>

          {/* Interactive Search & Live Filter */}
          <div className="max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-black/40 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all FAQs (e.g., pricing, timeline, Next.js, support)..."
                className="w-full bg-white/90 backdrop-blur-xl border border-black/15 rounded-full pl-11 pr-12 py-3.5 text-xs sm:text-sm font-neue text-[#181520] placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-[#181520]/30 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-machina uppercase text-black/50 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs (Website Development, App Development, UI/UX Design) */}
          {searchQuery.trim() === '' && (
            <div className="flex justify-center border-b border-black/15 pb-4 overflow-x-auto no-scrollbar">
              <div className="inline-flex items-center space-x-2 sm:space-x-8">
                {FAQ_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative pb-3 font-machina text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center space-x-2 cursor-pointer whitespace-nowrap ${
                        isActive 
                          ? 'text-[#181520] font-bold' 
                          : 'text-[#181520]/50 hover:text-[#181520]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-[#181520] text-white' : 'bg-black/10 text-black/60'
                      }`}>
                        {cat.count}
                      </span>

                      {/* Active Indicator Underline */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#181520] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search Result Counter Indicator */}
          {searchQuery.trim() !== '' && (
            <div className="text-center font-machina text-xs uppercase tracking-widest text-black/60">
              Found {filteredFAQs.length} matching questions for &ldquo;{searchQuery}&rdquo;
            </div>
          )}

          {/* ================= ACCORDION LIST (Matching Screenshot 2 & 3) ================= */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.map((faq) => {
              const isOpen = openAccordionIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  className={`bg-white/90 backdrop-blur-xl border rounded-2xl md:rounded-3xl transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                    isOpen ? 'border-[#181520]/30 shadow-md ring-1 ring-[#181520]/10' : 'border-black/10 hover:border-black/20'
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-2 h-2 rounded-full transition-all ${
                        isOpen ? 'bg-[#181520] scale-125' : 'bg-black/20'
                      }`} />
                      <h3 className="font-machina text-sm sm:text-base md:text-lg font-bold text-[#181520] tracking-tight">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      isOpen ? 'bg-[#181520] text-white rotate-180' : 'bg-black/5 text-black/60 hover:bg-black/10'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-1 text-[#231b35] border-t border-black/5 space-y-4 animate-fadeIn">
                      <p className="font-neue text-xs sm:text-sm md:text-base leading-relaxed text-[#231b35]/90">
                        {faq.answer}
                      </p>

                      {faq.highlight && (
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">
                            Key Highlights:
                          </span>
                          <span className="bg-[#181520]/5 border border-black/10 text-[#181520] px-3 py-1 rounded-full text-xs font-neue">
                            {faq.highlight}
                          </span>
                        </div>
                      )}

                      {/* Quick AI Consultation trigger for this specific question */}
                      <div className="pt-3 flex items-center justify-between border-t border-black/5">
                        <span className="text-[11px] font-mono text-black/50">
                          Need custom specs for your product?
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openChat(`FAQ In-Depth Inquiry:\nQuestion: ${faq.question}\nAnswer Summary: ${faq.answer}`);
                          }}
                          className="inline-flex items-center space-x-1.5 text-xs font-machina uppercase tracking-wider text-[#181520] hover:text-black font-bold group cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#181520] group-hover:rotate-12 transition-transform" />
                          <span>Ask AI Architect</span>
                          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFAQs.length === 0 && (
              <div className="text-center py-16 bg-white/60 rounded-3xl border border-black/10 space-y-4">
                <p className="font-machina text-base uppercase text-[#181520]">
                  No matching answers found for &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="font-neue text-xs text-black/60 max-w-md mx-auto">
                  Our Senior AI Architects can answer your question directly in real time.
                </p>
                <button
                  onClick={() => openChat(`Custom Query: ${searchQuery}`)}
                  className="bg-[#181520] text-white px-6 py-2.5 rounded-full font-machina text-xs uppercase tracking-widest hover:bg-black transition-all cursor-pointer shadow-md"
                >
                  Ask AI Directly
                </button>
              </div>
            )}
          </div>

        </div>

        {/* ================= 3. STILL HAVE QUESTIONS? CALL / AI INTAKE ================= */}
        <div className="reveal-item">
          <InteractiveTiltCard className="bg-[#181520] text-white rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl border border-white/15 relative overflow-hidden">
            
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono uppercase tracking-wider text-[#c9d2e7]">
                  <Sparkles className="w-3 h-3 text-[#c9d2e7]" />
                  <span>Direct Technical Inquiry</span>
                </div>

                <h3 className="font-machina text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
                  Can&apos;t find what you&apos;re looking for?
                </h3>

                <p className="font-neue text-xs sm:text-sm text-white/80 leading-relaxed">
                  Our engineering team and AI Architecture engines operate 24/7. Connect directly with our specialists to review your architecture requirements, timeline feasibility, and project estimates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <a
                  href="/contact-us"
                  className="w-full sm:w-auto text-center bg-white text-[#181520] hover:bg-[#c9d2e7] px-8 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest font-bold transition-all shadow-xl active:scale-95 cursor-pointer"
                >
                  Contact Us
                </a>

                <button
                  onClick={() => openChat('Request Direct Architecture Consultation')}
                  className="w-full sm:w-auto text-center px-8 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest font-bold border border-white/20 hover:bg-white/10 transition-all text-white active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Bot className="w-4 h-4 text-[#c9d2e7]" />
                  <span>Launch AI Intake</span>
                </button>
              </div>

            </div>
          </InteractiveTiltCard>
        </div>

      </div>

      {/* ================= 4. GLOBAL LUXURY FOOTER ================= */}
      <GlobalFooter />
    </div>
  );
}
