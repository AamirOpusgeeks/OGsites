'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { 
  Globe, 
  ShoppingCart, 
  Server, 
  Database, 
  ShieldCheck, 
  Activity, 
  Cloud, 
  Cpu, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Building2, 
  Layers, 
  TrendingUp, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import OpusLogo from '@/components/OpusLogo';
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from '@/components/ScrollReveal';
import { useChat } from '@/components/providers/ChatProvider';
import ServicesCarouselSlider from '@/components/ServicesCarouselSlider';
import AlternatingCaseStudies from '@/components/AlternatingCaseStudies';
import AgencyMetricsShowcase from '@/components/AgencyMetricsShowcase';

// 8 Web Engineering Pillars - Concise, punchy descriptions
const WEB_SERVICES = [
  {
    icon: ShoppingCart,
    title: 'Headless E-Commerce',
    tag: 'Shopify / Next.js',
    desc: 'Ultra-fast headless commerce storefronts with instant edge checkout and global multi-currency billing.',
    metrics: 'Next Commerce • Stripe • Edge',
  },
  {
    icon: Globe,
    title: 'Custom SaaS Platforms',
    tag: 'Next.js / TypeScript',
    desc: 'Scalable multi-tenant web applications engineered with server components and streaming SSR architectures.',
    metrics: 'React 19 • Server Actions • Tailwind',
  },
  {
    icon: Server,
    title: 'High-Throughput APIs',
    tag: 'GraphQL / Node.js',
    desc: 'Resilient REST and GraphQL microservices delivering sub-20ms response latencies at scale.',
    metrics: 'gRPC • NestJS • Edge Functions',
  },
  {
    icon: Layers,
    title: 'Headless CMS & Portals',
    tag: 'Sanity / WordPress',
    desc: 'Decoupled content engines with real-time editorial previews, ISR revalidation, and fluid authoring.',
    metrics: 'Payload CMS • Sanity • Next ISR',
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud Edge',
    tag: 'AWS / Docker',
    desc: 'Automated CI/CD pipelines, containerized clusters, and global CDN deployments with zero-downtime rollouts.',
    metrics: 'Docker • Kubernetes • Vercel Edge',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trust Web Security',
    tag: 'WAF / OAuth2',
    desc: 'End-to-end encryption, automated vulnerability auditing, and robust SSO authorization flows.',
    metrics: 'OWASP • Auth0 • TLS 1.3',
  },
  {
    icon: Activity,
    title: 'Telemetry & Analytics',
    tag: 'PostHog / OpenTelemetry',
    desc: 'Real-time clickstream ingestion, custom conversion funnels, and enterprise performance tracking.',
    metrics: 'PostHog • Grafana • Core Vitals',
  },
  {
    icon: Database,
    title: 'Distributed Databases',
    tag: 'Postgres / Redis',
    desc: 'Optimized relational and in-memory architectures with read-replicas and distributed cache invalidation.',
    metrics: 'PostgreSQL • Redis • Prisma',
  },
];

// Interactive Service Matrix Tabs from the live site screenshot
const MATRIX_TABS = [
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    headline: 'High-Conversion Headless Storefronts',
    desc: 'We engineer ultra-responsive e-commerce ecosystems combining headless Shopify backends with custom Next.js storefronts, dynamic cart orchestration, and instant 1-click checkout.',
    stats: ['99.99% Checkout Uptime', '< 0.3s Page Transitions', '+42% Mobile Conversion'],
    tech: ['Shopify Plus', 'Next.js App Router', 'Stripe API', 'Vercel Edge'],
  },
  {
    id: 'shopify',
    name: 'Shopify & CMS',
    headline: 'Enterprise Content & Commerce Sync',
    desc: 'Bespoke custom themes, liquid extensions, and headless CMS integrations allowing marketing teams to launch pages in minutes while developers maintain type-safe architecture.',
    stats: ['Instant Live Previews', 'Zero Code Regression', 'Global Multi-Region CDN'],
    tech: ['Sanity.io', 'Payload CMS', 'Liquid Engine', 'GraphQL Storefront API'],
  },
  {
    id: 'apis',
    name: 'API & Microservices',
    headline: 'Sub-Millisecond Distributed Pipelines',
    desc: 'Microservices architectures with automated load balancing, rate limiting, and event-driven Kafka/Redis queues engineered for thousands of concurrent requests.',
    stats: ['< 18ms Edge Latency', 'Auto-scaling Pods', '100% Type-Safe Contracts'],
    tech: ['Node.js', 'Go Core', 'GraphQL Subscriptions', 'Redis Pub/Sub'],
  },
  {
    id: 'devops',
    name: 'DevOps & Edge Hosting',
    headline: 'Autonomous Cloud Infrastructure',
    desc: 'Zero-configuration edge hosting, Terraform-managed cloud clusters, and automated preview branch deployments that ensure seamless team collaboration.',
    stats: ['Zero-Downtime Deploys', 'Automated Canary Testing', 'Automated Daily Backups'],
    tech: ['AWS Cloud', 'Docker Containerization', 'Cloudflare Workers', 'Terraform'],
  },
  {
    id: 'security',
    name: 'Web Security & Data',
    headline: 'Zero-Trust Enterprise Compliance',
    desc: 'Strict Content Security Policies, rate-limiting DDOS mitigation, and PCI-DSS compliant payment handoffs protecting customer data and enterprise assets.',
    stats: ['SOC2 Readiness', 'Automated Pen-Testing', 'Encrypted State at Rest'],
    tech: ['OAuth 2.1', 'JWT Key-Rotation', 'Cloudflare WAF', 'PostgreSQL RLS'],
  },
];

// Impact Metrics
const METRICS = [
  {
    value: '99.99%',
    label: 'Platform Uptime',
    sub: 'Multi-Region Edge SLA',
    icon: CheckCircle2,
  },
  {
    value: '< 35ms',
    label: 'Global TTFB',
    sub: 'Sub-second edge compute',
    icon: Cloud,
  },
  {
    value: '12M+',
    label: 'Daily API Ingest',
    sub: 'Auto-scaling cluster capacity',
    icon: Server,
  },
  {
    value: '100/100',
    label: 'Core Web Vitals',
    sub: 'Lighthouse Performance score',
    icon: Activity,
  },
];

// Featured Web Case Studies
const CASE_STUDIES = [
  {
    title: 'Nexus Cloud Intelligence',
    category: 'Enterprise Cloud SaaS',
    tag: 'Next.js 15 & GraphQL',
    desc: 'Distributed multi-tenant dashboard with live server telemetry, interactive node topologies, and custom billing.',
    image: '/services/web-cases/nexus-cloud.jpg',
    stats: ['120k Concurrent Users', '< 15ms Query Response'],
    liveUrl: 'https://nexuscloud.io',
  },
  {
    title: 'Aura Flagship Commerce',
    category: 'Luxury Headless Storefront',
    tag: 'Shopify & Next.js ISR',
    desc: 'Editorial luxury commerce platform featuring 3D product previews, instant checkout, and personalized curation.',
    image: '/services/web-cases/aura-commerce.jpg',
    stats: ['+64% Conversion Lift', '0.28s First Paint'],
    liveUrl: 'https://auracollections.com',
  },
];

const TECH_STACK = [
  'Next.js 15 (App Router)',
  'React 19 & Server Actions',
  'TypeScript',
  'Tailwind CSS',
  'Node.js & NestJS',
  'GraphQL & gRPC',
  'PostgreSQL & Prisma',
  'Redis Cache Layer',
  'Docker & AWS ECS',
  'Cloudflare Edge & Workers',
  'Headless Shopify Plus',
  'Sanity & Payload CMS'
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

export default function WebDevelopmentPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat } = useChat();
  const [activeTabId, setActiveTabId] = useState('ecommerce');

  const selectedTab = MATRIX_TABS.find(t => t.id === activeTabId) || MATRIX_TABS[0];

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans">

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-20">
        
        {/* ================= TOP NAV BAR ================= */}
        <GlobalHeader />

        {/* ================= 1. HERO SECTION ================= */}
        <div className="space-y-6 reveal-item max-w-4xl pt-2">
          <h1 className="font-machina text-[9vw] md:text-[6.2vw] uppercase leading-[0.88] tracking-tight">
            <div>SCALABLE WEB &</div>
            <div className="text-black/50">ENTERPRISE CLOUD.</div>
          </h1>

          <p className="font-neue text-base md:text-xl leading-relaxed text-[#231b35] max-w-2xl pt-1">
            We engineer high-performance web platforms and cloud systems combining modern Next.js architectures, edge compute, and sub-second API pipelines.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openChat('Web & Cloud Systems Architecture Review')}
              className="bg-[#181520] text-white px-8 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center space-x-3 shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Schedule Architecture Blueprint</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openChat('Request Web Development Estimation')}
              className="bg-white/70 hover:bg-white text-[#181520] border border-black/15 px-7 py-3.5 rounded-full font-neue text-xs uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              Request Custom Estimate
            </button>
          </div>
        </div>

        {/* ================= 2. 8 CORE WEB SERVICES SLIDER ================= */}
        <div className="reveal-item">
          <ServicesCarouselSlider
            title="Web Development & Cloud Software"
            subtitle="From headless commerce and scalable SaaS to zero-trust security and real-time data pipelines."
            tagLabel="8 CORE DISCIPLINES"
            services={WEB_SERVICES}
            chatPrefix="Web Capability Discovery"
          />
        </div>

        {/* ================= 3. INTERACTIVE DOMAIN MATRIX (INSPECTABLE TABS) ================= */}
        <div className="space-y-6 reveal-item">
          <div className="border-b border-black/10 pb-4">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
              Domain Architecture Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Tabs Selection */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              {MATRIX_TABS.map((tab) => {
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
                    <span>Domain Focus • {selectedTab.name}</span>
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
                    onClick={() => openChat(`Domain Consultation: ${selectedTab.name}`)}
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
                  <span>Enterprise Cloud Telemetry</span>
                </div>
                <h3 className="font-machina text-2xl md:text-3xl font-bold uppercase">
                  Engineered For Unbroken Uptime
                </h3>
              </div>
              <button
                onClick={() => openChat('Direct Inquiry: Enterprise Web Infrastructure')}
                className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-7 py-3 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 whitespace-nowrap shadow-md active:scale-95 cursor-pointer"
              >
                <span>Initiate Cloud Brief</span>
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
                      <span>Scale</span>
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

        {/* ================= 5. FEATURED WEB CASE STUDIES (ALTERNATING ZIGZAG) ================= */}
        <div className="reveal-item">
          <AlternatingCaseStudies
            sectionTitle="Featured Web Case Studies"
            sectionSubtitle="High-concurrency SaaS portals, headless commerce architectures, and financial data pipelines."
            studies={CASE_STUDIES}
            chatPrefix="Web Case Study"
            variant="browser"
          />
        </div>

        {/* ================= 6. AGENCY TRACK RECORD & METRICS ================= */}
        <AgencyMetricsShowcase type="web" />

      </div>

      <GlobalFooter />
    </div>
  );
}
