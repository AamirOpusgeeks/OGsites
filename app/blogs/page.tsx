'use client';

import { useState, useRef, MouseEvent } from 'react';
import { 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  Sparkles, 
  Search,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Cpu,
  Shield,
  Cloud,
  Layers,
  Activity
} from 'lucide-react';
import OpusLogo from "@/components/OpusLogo";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from '@/components/ScrollReveal';
import { useChat } from "@/components/providers/ChatProvider";

const CATEGORIES = [
  'All Articles',
  'Artificial Intelligence',
  'Enterprise Solutions',
  'Cloud Architecture',
  'Mobile Engineering',
  'UI/UX Trends',
  'Cyber Security',
];

const FEATURED_BLOG = {
  id: 0,
  title: 'Autonomous AI Agents & Edge Ingestion: Architecting Enterprise Intelligence in 2026',
  excerpt: 'A comprehensive technical deep-dive into orchestrating decentralized LLM pipelines, real-time context windows, and sub-second edge retrieval.',
  category: 'Artificial Intelligence',
  readTime: '6 min read',
  date: 'Sep 16, 2026',
  author: 'Opus AI Systems Lead',
  image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80',
  slug: 'autonomous-ai-agents-enterprise',
};

const BLOGS = [
  {
    id: 1,
    title: 'Autonomous AI Agents & Real-Time Function Calling in Enterprise Systems',
    excerpt: 'Architecting low-latency agentic loops, semantic memory caching, and tool execution security for enterprise multi-agent swarms.',
    category: 'Artificial Intelligence',
    readTime: '6 min read',
    date: 'Sep 15, 2026',
    author: 'AI Research Team',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    tags: ['AI Agents', 'LLM Infrastructure', 'Swarm'],
  },
  {
    id: 2,
    title: 'Vector Embeddings & Semantic Search Pipelines at Billion-Scale',
    excerpt: 'How we structure high-throughput pgvector indexing, hybrid BM25 re-ranking, and sub-10ms similarity search clusters.',
    category: 'Artificial Intelligence',
    readTime: '7 min read',
    date: 'Sep 10, 2026',
    author: 'Opus Data Lab',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    tags: ['Vector DB', 'RAG', 'pgvector'],
  },
  {
    id: 3,
    title: 'Why React Native CLI Remains the Gold Standard for Scalable Fintech Apps',
    excerpt: 'How high-frequency financial platforms prioritize bare React Native over managed runtimes for sub-millisecond bridge execution.',
    category: 'Mobile Engineering',
    readTime: '5 min read',
    date: 'Sep 12, 2026',
    author: 'Mobile Core Team',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['React Native', 'Fintech', 'JSI Bridge'],
  },
  {
    id: 4,
    title: 'Micro-Frontends & Next.js 15: Designing Modular Web Platforms for Global Enterprises',
    excerpt: 'Breaking monolithic web architectures into autonomous micro-frontends with zero runtime downtime and edge caching.',
    category: 'Enterprise Solutions',
    readTime: '7 min read',
    date: 'Sep 08, 2026',
    author: 'Cloud Solutions Architect',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js 15', 'Microservices', 'Edge'],
  },
  {
    id: 5,
    title: 'Zero-Trust Security & API Gateway Hardening in High-Concurrency Cloud Systems',
    excerpt: 'Constructing robust OAuth 2.1 authorization pipelines, automated penetration shields, and state encryption at rest.',
    category: 'Cyber Security',
    readTime: '6 min read',
    date: 'Aug 30, 2026',
    author: 'Cyber Security Lead',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Zero-Trust', 'WAF', 'Encryption'],
  },
  {
    id: 6,
    title: 'The Psychology of Spatial Glassmorphism: Designing for Modern User Retention',
    excerpt: 'A practical framework on using depth, lighting physics, and tokenized glass textures to reduce cognitive load.',
    category: 'UI/UX Trends',
    readTime: '4 min read',
    date: 'Aug 22, 2026',
    author: 'Design Systems Director',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['Spatial UI', 'Ergonomics', 'Figma'],
  },
  {
    id: 7,
    title: 'Real-Time Multi-Tenant Telemetry Ingestion with ClickHouse & WebSockets',
    excerpt: 'Streaming live server telemetries and market data ticks to thousands of concurrent users with sub-15ms replication.',
    category: 'Cloud Architecture',
    readTime: '6 min read',
    date: 'Aug 14, 2026',
    author: 'Backend Infrastructure Lead',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    tags: ['ClickHouse', 'WebSockets', 'Telemetry'],
  },
  {
    id: 8,
    title: 'Sub-Second Cold Starts: Optimizing iOS & Android Native Binary Footprints',
    excerpt: 'Hermes engine tuning, ProGuard dead code elimination, and asset tree-shaking techniques to cut bundle size by over 40%.',
    category: 'Mobile Engineering',
    readTime: '5 min read',
    date: 'Aug 04, 2026',
    author: 'Performance Tooling Team',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Hermes Engine', 'Android NDK', 'Swift'],
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

export default function BlogsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat } = useChat();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = BLOGS.filter((b) => {
    const matchesCategory = activeCategory === 'All Articles' || b.category === activeCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

        {/* ================= 1. PAGE HERO ================= */}
        <div className="space-y-6 reveal-item max-w-4xl pt-2">
          <h1 className="font-machina text-[9vw] md:text-[6.2vw] uppercase leading-[0.88] tracking-tight">
            <div>INSIGHTS, PERSPECTIVES &</div>
            <div className="text-black/50">TECH ARCHITECTURE.</div>
          </h1>

          <p className="font-neue max-w-2xl text-base md:text-xl leading-relaxed text-[#231b35] pt-1">
            Deep-dives into software architecture, autonomous AI agents, mobile optimization, and enterprise cloud engineering from the Opusgeeks laboratory.
          </p>

          {/* Search & Filter Bar */}
          <div className="pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-black/10 pb-8">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs uppercase font-machina tracking-wider transition-all duration-200 cursor-pointer border ${
                    activeCategory === cat
                      ? 'bg-[#181520] text-white border-[#181520] shadow-md scale-105'
                      : 'bg-white/60 hover:bg-white text-[#181520] border-black/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <input
                type="text"
                placeholder="Search technical papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/70 backdrop-blur-md border border-black/15 rounded-full pl-11 pr-5 py-2.5 text-xs text-[#181520] placeholder:text-black/40 outline-none focus:border-black/50 transition-colors font-neue"
              />
            </div>
          </div>
        </div>

        {/* ================= 2. FEATURED SPOTLIGHT ARTICLE ================= */}
        {activeCategory === 'All Articles' && !searchQuery && (
          <div className="reveal-item">
            <InteractiveTiltCard
              onClick={() => openChat(`Technical Deep-Dive: ${FEATURED_BLOG.title}`)}
              className="bg-[#f0efe9]/80 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="font-machina text-xs uppercase tracking-widest text-black/50 block">
                      Featured Technical Paper • {FEATURED_BLOG.category}
                    </span>

                    <h2 className="font-machina text-2xl md:text-4xl font-bold uppercase leading-tight text-[#181520] group-hover:text-black transition-colors">
                      {FEATURED_BLOG.title}
                    </h2>

                    <p className="font-neue text-sm md:text-base leading-relaxed text-[#231b35]/85">
                      {FEATURED_BLOG.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center space-x-6 pt-4 text-xs font-neue text-black/60 border-t border-black/10">
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{FEATURED_BLOG.date}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{FEATURED_BLOG.readTime}</span>
                    </span>
                    <span className="hidden sm:inline-block">By {FEATURED_BLOG.author}</span>
                  </div>

                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openChat(`Technical Deep-Dive: ${FEATURED_BLOG.title}`);
                      }}
                      className="inline-flex items-center space-x-3 bg-[#181520] text-white px-7 py-3 rounded-full text-xs font-machina uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer shadow-lg active:scale-95"
                    >
                      <span>Read Full Paper</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 h-72 lg:h-96 rounded-2xl overflow-hidden shadow-inner border border-black/10">
                  <img
                    src={FEATURED_BLOG.image}
                    alt={FEATURED_BLOG.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
            </InteractiveTiltCard>
          </div>
        )}

        {/* ================= 3. REGULAR ARTICLES GRID ================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-black/10 pb-4 reveal-item">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
              Published Engineering Dispatch
            </h2>
            <span className="font-mono text-xs text-black/50">
              {filteredBlogs.length} Articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-group">
            {filteredBlogs.map((blog) => (
              <InteractiveTiltCard
                key={blog.id}
                onClick={() => openChat(`Technical Article: ${blog.title}`)}
                className="bg-[#f2f1ec]/85 hover:bg-white/95 backdrop-blur-2xl border border-black/[0.08] hover:border-black/25 rounded-3xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-400 cursor-pointer group"
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-inner mb-6 bg-slate-900">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="bg-[#181520]/80 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-machina uppercase tracking-wider shadow-sm">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center space-x-3 text-[11px] font-neue text-black/60 mb-3">
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-black/40" />
                      <span>{blog.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-black/40" />
                      <span>{blog.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-machina text-lg font-bold uppercase text-[#181520] mb-3 leading-snug line-clamp-2 group-hover:text-black transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-neue text-xs leading-relaxed text-[#231b35]/80 mb-5 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {blog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-black/[0.04] border border-black/10 text-[#181520] px-2.5 py-0.5 rounded-full text-[10px] font-neue"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className="text-[11px] font-neue text-black/50">
                    By {blog.author}
                  </span>
                  <div className="bg-[#181520] text-white px-3.5 py-1.5 rounded-full text-[11px] font-machina uppercase tracking-wider group-hover:bg-black group-hover:scale-105 transition-all flex items-center space-x-1.5 shadow-sm">
                    <span>Read</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </InteractiveTiltCard>
            ))}
          </div>
        </div>

        {/* ================= 4. STREAMLINING TECH EFFORTS MONOLITH CTA ================= */}
        <div className="bg-[#181520] text-white rounded-[32px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl mt-8 reveal-item border border-white/10">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#c9d2e7]">
              <Sparkles className="w-4 h-4 text-[#c9d2e7]" />
              <span>Opus Engineering Dispatch</span>
            </div>
            <h2 className="font-machina text-2xl md:text-4xl font-bold uppercase leading-tight">
              Ready to streamline your tech efforts?
            </h2>
            <p className="font-neue text-white/70 text-xs md:text-sm leading-relaxed">
              Discover how Opusgeeks simplifies your architecture, automates cloud infrastructure, and accelerates your release velocity.
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              openChat(newsletterEmail ? `Newsletter Subscription for ${newsletterEmail}` : 'Engineering Dispatch & Tech Streamlining');
            }} 
            className="w-full md:w-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter corporate email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-full px-6 py-3.5 text-xs font-neue text-white placeholder-white/40 outline-none focus:border-white transition-colors w-full sm:w-72"
            />
            <button
              type="submit"
              className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-8 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap shadow-md active:scale-95 cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      <GlobalFooter />
    </div>
  );
}
