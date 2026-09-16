'use client';

import { useState, useRef, MouseEvent } from 'react';
import { 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  Sparkles, 
  Search,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Mobile Development',
  'Web Architecture',
  'UI/UX Trends',
  'Tech Insights',
];

const FEATURED_BLOG = {
  id: 0,
  title: 'Why React Native CLI Remains the Gold Standard for Scalable Fintech Apps in 2026',
  excerpt: 'An in-depth architectural breakdown on why high-frequency financial platforms prioritize bare React Native over managed runtimes for sub-millisecond bridge execution and custom native security modules.',
  category: 'Mobile Development',
  readTime: '6 min read',
  date: 'Sep 12, 2026',
  author: 'Opus Engineering Lead',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
  slug: 'react-native-fintech-scalability',
};

const BLOGS = [
  {
    id: 1,
    title: 'Architecting Redux Toolkit for Complex State Orchestration Without RTK Query',
    excerpt: 'How we structure custom slices, async thunks, and resilient cache invalidation pipelines across enterprise-scale multi-screen applications.',
    category: 'Mobile Development',
    readTime: '5 min read',
    date: 'Sep 08, 2026',
    author: 'Mobile Core Team',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['React Native', 'Redux', 'Architecture'],
  },
  {
    id: 2,
    title: 'Micro-Frontends & Next.js: Designing Modular Web Systems for Global Enterprises',
    excerpt: 'Breaking monolithic web platforms into decentralized, autonomous micro-frontends with zero runtime downtime and edge caching.',
    category: 'Web Architecture',
    readTime: '7 min read',
    date: 'Aug 29, 2026',
    author: 'Cloud Solutions Architect',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'Microservices', 'Cloud'],
  },
  {
    id: 3,
    title: 'The Psychology of Spatial Glassmorphism: Designing for Modern User Retention',
    excerpt: 'A practical framework on using depth, lighting physics, and tokenized glass textures to reduce cognitive load and boost conversion funnels.',
    category: 'UI/UX Trends',
    readTime: '4 min read',
    date: 'Aug 22, 2026',
    author: 'Design Systems Director',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['UI/UX', 'Spatial Design', 'Figma'],
  },
  {
    id: 4,
    title: 'Sub-Second Cold Starts: Optimizing iOS & Android Binary Size in Modern Frameworks',
    excerpt: 'Practical Hermes engine tuning, ProGuard dead code stripping, and asset tree-shaking techniques to cut bundle size by over 40%.',
    category: 'Tech Insights',
    readTime: '8 min read',
    date: 'Aug 14, 2026',
    author: 'DevOps & Tooling Team',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Performance', 'Hermes', 'Optimization'],
  },
  {
    id: 5,
    title: 'Building Real-Time Multi-Tenant Dashboards with WebSockets and Edge Workers',
    excerpt: 'Streaming live telemetries and market data ticks to thousands of concurrent users with sub-15ms regional edge replication.',
    category: 'Web Architecture',
    readTime: '6 min read',
    date: 'Aug 03, 2026',
    author: 'Backend Infrastructure Lead',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    tags: ['WebSockets', 'Edge Workers', 'SaaS'],
  },
  {
    id: 6,
    title: 'Designing Accessible High-Contrast Dark Modes: Beyond Standard Hex Inversions',
    excerpt: 'Why naive color inversion breaks accessibility guidelines and how to construct semantic WCAG AAA compliant color palettes.',
    category: 'UI/UX Trends',
    readTime: '5 min read',
    date: 'Jul 26, 2026',
    author: 'Accessibility UX Specialist',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    tags: ['Accessibility', 'Dark Mode', 'Design Tokens'],
  },
];

// Interactive 3D Spatial Tilt Card Component
function InteractiveTiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
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

import OpusLogo from "@/components/OpusLogo";

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = BLOGS.filter((b) => {
    const matchesCategory = activeCategory === 'All' || b.category === activeCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#c9d2e7] text-[#181520] pt-32 pb-24 px-6 md:px-14 overflow-hidden font-sans">
      {/* Baked Studio Backdrop Image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col space-y-20">
        
        {/* Top Navbar / Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-black/10">
          <a href="/" className="flex items-center group">
            <OpusLogo variant="full" size={28} />
          </a>
          <a
            href="/"
            className="font-neue text-xs uppercase tracking-wider text-[#181520] hover:opacity-60 transition-opacity"
          >
            ← Back to Overview
          </a>
        </div>

        {/* ================= 1. PAGE HEADER ================= */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <span className="inline-block border border-black/30 rounded-full px-4 py-1 text-xs uppercase font-neue">
              Engineering Journals
            </span>
            <span className="text-xs font-neue text-black/50 tracking-wider uppercase">
              • Technical Insights & Architecture
            </span>
          </div>

          <h1 className="font-machina text-[9vw] md:text-[6.5vw] uppercase leading-[0.88] tracking-tight">
            <div>IDEAS THAT</div>
            <div className="text-black/50">SHAPE CODE.</div>
          </h1>

          <p className="font-neue max-w-xl text-base md:text-lg leading-relaxed text-[#231b35]">
            Deep-dives into software architecture, mobile optimization, spatial interfaces, and enterprise cloud engineering from the Opusgeeks laboratory.
          </p>

          {/* Search & Filter Bar */}
          <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-black/10 pb-8">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs uppercase font-neue tracking-wider transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#181520] text-white shadow-md'
                      : 'bg-white/60 hover:bg-white text-[#181520] border border-black/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/70 backdrop-blur-md border border-black/10 rounded-full pl-11 pr-4 py-2.5 text-xs font-neue text-[#181520] placeholder-black/40 outline-none focus:border-black/40 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ================= 2. FEATURED HERO POST ================= */}
        {activeCategory === 'All' && searchQuery === '' && (
          <InteractiveTiltCard className="bg-[#f0efe9]/80 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="bg-[#181520] text-white px-3.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-neue">
                    Featured Deep-Dive
                  </span>
                  <span className="text-xs font-neue text-black/50">
                    {FEATURED_BLOG.category}
                  </span>
                </div>

                <h2 className="font-machina text-2xl md:text-4xl font-bold uppercase text-[#181520] leading-tight">
                  {FEATURED_BLOG.title}
                </h2>

                <p className="font-neue text-sm md:text-base text-[#231b35]/85 leading-relaxed">
                  {FEATURED_BLOG.excerpt}
                </p>

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
                  <a
                    href="https://opusgeeks.com/blogs"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-3 bg-[#181520] text-white px-7 py-3 rounded-full text-xs font-machina uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span>Read Full Paper</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
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
        )}

        {/* ================= 3. REGULAR BLOGS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <InteractiveTiltCard
              key={blog.id}
              className="bg-[#f0efe9]/75 backdrop-blur-xl border border-white/70 rounded-3xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div>
                {/* Image Cover */}
                <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-inner mb-6 bg-slate-900">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-white border border-white/20 px-3 py-0.5 rounded-full text-[10px] font-neue uppercase tracking-wider">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex items-center space-x-4 text-[11px] font-neue text-black/50 mb-3">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-machina text-lg font-bold uppercase text-[#181520] mb-3 leading-snug line-clamp-2">
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
                  {blog.author}
                </span>
                <a
                  href="https://opusgeeks.com/blogs"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#181520] text-white p-2.5 rounded-full hover:scale-110 transition-transform cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </InteractiveTiltCard>
          ))}
        </div>

        {/* ================= 4. NEWSLETTER / TECH DIGEST SUBSCRIPTION ================= */}
        <div className="bg-[#181520] text-white rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl mt-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-white">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Opus Engineering Dispatch</span>
            </div>
            <h2 className="font-machina text-2xl md:text-4xl font-bold uppercase">
              Stay ahead of digital architecture.
            </h2>
            <p className="font-neue text-white/70 max-w-lg text-sm">
              Get bi-weekly technical post-mortems, React Native optimizations, and modern web architectures straight to your inbox.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter corporate email..."
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
    </div>
  );
}
