'use client';

import { useState, useRef, MouseEvent } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from '@/components/ScrollReveal';
import { useChat } from "@/components/providers/ChatProvider";

interface Article {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  tag: string;
  takeaway: string;
  metric: string;
}

const ARTICLES: Article[] = [
  {
    id: 'ai-agents',
    number: '01',
    title: 'Autonomous AI Agents & Real-Time Orchestration at the Edge',
    subtitle: 'Decentralized Swarm Intelligence Architecture',
    excerpt: 'Engineering sub-second multi-agent loops, localized vector context caching, and zero-trust tool execution for enterprise scale.',
    readTime: '5 min read',
    date: 'Sep 2026',
    author: 'Opus AI Lab',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    tag: 'Multi-Agent Swarm',
    takeaway: 'Sub-second tool calling with in-memory semantic vector verification.',
    metric: '< 180ms Agent Loop',
  },
  {
    id: 'vector-scale',
    number: '02',
    title: 'High-Throughput Vector Search & Semantic RAG at Billion Scale',
    subtitle: 'Distributed Similarity Graph Clustering',
    excerpt: 'Structuring hybrid BM25 and pgvector indexing with sub-10ms similarity clustering across distributed database nodes.',
    readTime: '6 min read',
    date: 'Sep 2026',
    author: 'Data Infrastructure',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=85',
    tag: 'Vector Pipelines',
    takeaway: 'Hybrid sparse-dense indexation reducing semantic hallucination by 94%.',
    metric: '99.4% Precision @ 10',
  },
  {
    id: 'react-native-bridge',
    number: '03',
    title: 'Why Bare React Native CLI Outperforms Managed Runtimes in Fintech',
    subtitle: 'Direct C++ JSI Execution & Biometric Hardening',
    excerpt: 'Eliminating bridge overhead and unlocking direct C++ JSI bindings to deliver instant native biometrics and cryptographic ledger sync.',
    readTime: '5 min read',
    date: 'Aug 2026',
    author: 'Mobile Core Lead',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
    tag: 'C++ JSI Bindings',
    takeaway: 'Zero JS bridge serialization overhead for high-frequency financial ledgers.',
    metric: '0.2ms Memory Frame Time',
  },
  {
    id: 'nextjs-microfrontends',
    number: '04',
    title: 'Micro-Frontends & Edge Caching Architecture in Next.js 15',
    subtitle: 'Autonomous Zone Invalidation & Global CDN Mesh',
    excerpt: 'Decoupling multi-team enterprise apps into autonomous edge-rendered zones with zero build contention and global CDN invalidation.',
    readTime: '7 min read',
    date: 'Aug 2026',
    author: 'Cloud Architect',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85',
    tag: 'Edge Deployment',
    takeaway: 'Autonomous multi-zone Next.js micro-apps deployed under a unified domain.',
    metric: '< 40ms Global TTFB',
  },
  {
    id: 'spatial-glass',
    number: '05',
    title: 'The Ergonomics of Spatial Glassmorphism in Modern Interfaces',
    subtitle: 'Cognitive Depth Physics & Tokenized Transparency',
    excerpt: 'Balancing physical light refraction tokens, high-contrast typography, and cognitive load reduction in institutional dashboards.',
    readTime: '4 min read',
    date: 'Jul 2026',
    author: 'Design Systems Lead',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=85',
    tag: 'Ergonomic Optics',
    takeaway: 'Micro-refraction tokens that anchor user focus without visual fatigue.',
    metric: '-28% Cognitive Strain',
  },
];

export default function BlogsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat } = useChat();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Filtered pool based on search query
  const filteredArticles = ARTICLES.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Ensure selectedIndex is always within range
  const activeArticle = filteredArticles[selectedIndex] || filteredArticles[0] || ARTICLES[0];

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans select-none">

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-20">
        
        {/* ================= TOP NAVBAR ================= */}
        <GlobalHeader />

        {/* ================= 1. EDITORIAL HEADER ================= */}
        <div className="space-y-6 max-w-5xl pt-2">
          <h1 className="font-machina text-[9vw] md:text-[5.5vw] uppercase leading-[0.9] tracking-tight">
            <div>ARCHITECTURAL DOSSIER &</div>
            <div className="text-black/40">ENGINEERING ESSAYS.</div>
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2 border-b border-black/10 pb-8">
            <p className="font-neue text-base md:text-lg text-[#231b35]/80 max-w-2xl leading-relaxed">
              Synthesized research papers covering autonomous multi-agent loops, sub-millisecond mobile runtimes, and distributed cloud performance.
            </p>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/40" />
              <input
                type="text"
                placeholder="Search papers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-white/70 backdrop-blur-md border border-black/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#181520] placeholder:text-black/40 outline-none focus:border-black/50 transition-colors font-neue"
              />
            </div>
          </div>
        </div>

        {/* ================= 2. UNIQUE INTERACTIVE DOSSIER READER ================= */}
        {activeArticle && (
          <div className="scroll-reveal-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* LEFT COLUMN (7 Cols): The Live Architectural Viewport */}
              <div className="lg:col-span-7 bg-[#f0efe9]/90 backdrop-blur-2xl border border-black/[0.08] rounded-[32px] p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-500 relative overflow-hidden group">
                
                {/* Visual Backdrop Overlay */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#0c0d14] mb-8 border border-black/10 shadow-xl">
                  <img
                    key={activeArticle.id}
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover animate-fade-in transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Floating Overlay Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-[#181520] font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold shadow-sm">
                      Dossier {activeArticle.number}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-end text-white text-xs font-mono">
                    <span className="text-white/70">
                      By {activeArticle.author}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="space-y-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-black/40 block">
                    {activeArticle.subtitle} • {activeArticle.date}
                  </span>

                  <h2 className="font-machina text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-[#181520] leading-tight tracking-tight">
                    {activeArticle.title}
                  </h2>

                  <p className="font-neue text-sm md:text-base leading-relaxed text-[#231b35]/85">
                    {activeArticle.excerpt}
                  </p>

                  {/* Key Takeaway Callout Box */}
                  <div className="bg-black/[0.03] border border-black/10 rounded-2xl p-4 flex items-start space-x-3.5 mt-4">
                    <div className="w-7 h-7 rounded-full bg-[#181520] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-black/50 block">Core Architecture Takeaway</span>
                      <p className="font-neue text-xs sm:text-sm text-[#181520] font-medium leading-normal mt-0.5">
                        {activeArticle.takeaway}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-6 mt-6 border-t border-black/10 flex items-center justify-end">
                  <button
                    onClick={() => openChat(`Research Brief: ${activeArticle.title}`)}
                    className="bg-[#181520] text-white px-7 py-3 rounded-full font-machina text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center space-x-2.5 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>Examine Full Paper</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN (5 Cols): The Interactive Dossier Deck */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                <div className="border-b border-black/10 pb-3 mb-1 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-black/50">
                    Select Dossier
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#181520]">
                    {String(selectedIndex + 1).padStart(2, '0')} / {String(filteredArticles.length).padStart(2, '0')}
                  </span>
                </div>

                {/* The 5 Interactive Switcher Items */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  {filteredArticles.map((article, idx) => {
                    const isSelected = activeArticle.id === article.id;
                    return (
                      <div
                        key={article.id}
                        onClick={() => setSelectedIndex(idx)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group ${
                          isSelected
                            ? 'bg-[#181520] text-white border-[#181520] shadow-xl scale-[1.02]'
                            : 'bg-[#f2f1ec]/80 hover:bg-white text-[#181520] border-black/[0.08] hover:border-black/20'
                        }`}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Number pill */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-machina text-xs font-bold shrink-0 transition-colors ${
                            isSelected 
                              ? 'bg-white/20 text-white' 
                              : 'bg-black/5 text-black/40 group-hover:text-black'
                          }`}>
                            {article.number}
                          </div>

                          <div className="min-w-0">
                            <h3 className={`font-machina text-sm font-bold uppercase truncate transition-colors ${
                              isSelected ? 'text-white' : 'text-[#181520]'
                            }`}>
                              {article.title}
                            </h3>
                          </div>
                        </div>

                        {/* Right Selection Indicator */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isSelected 
                            ? 'bg-white text-[#181520] rotate-45' 
                            : 'text-black/30 group-hover:text-black group-hover:translate-x-1'
                        }`}>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Direct Chat Prompt Pill */}
                <div className="bg-white/50 backdrop-blur-md border border-black/10 rounded-2xl p-4 flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-neue text-xs text-black/70">
                      Need custom architectural consultation?
                    </span>
                  </div>
                  <button
                    onClick={() => openChat('Architectural Consultation from Blogs')}
                    className="font-machina text-[11px] uppercase tracking-wider text-[#181520] hover:underline font-bold cursor-pointer"
                  >
                    Consult Engineers →
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= 3. EXECUTIVE SYNTHESIS ================= */}
        <div className="scroll-reveal-card">
          <div className="border-b border-black/10 pb-4 mb-6 flex items-center justify-between">
            <h2 className="font-machina text-xl md:text-2xl font-bold uppercase text-[#181520]">
              2026 Core Pillars
            </h2>
            <span className="font-mono text-xs text-black/40">Architectural Thesis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/40 backdrop-blur-md border border-black/[0.08] rounded-2xl p-6 space-y-2">
              <div className="flex items-center space-x-2 text-black/40 font-mono text-xs">
                <Cpu className="w-4 h-4 text-[#181520]" />
                <span>Pillar 01</span>
              </div>
              <h3 className="font-machina text-base font-bold uppercase text-[#181520]">
                Autonomous Edge Loops
              </h3>
              <p className="font-neue text-xs leading-relaxed text-black/65">
                Transitioning from centralized LLM endpoints to distributed in-memory agent swarms executing real-time database transactions.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-black/[0.08] rounded-2xl p-6 space-y-2">
              <div className="flex items-center space-x-2 text-black/40 font-mono text-xs">
                <Layers className="w-4 h-4 text-[#181520]" />
                <span>Pillar 02</span>
              </div>
              <h3 className="font-machina text-base font-bold uppercase text-[#181520]">
                Zero-Bridge Native Runtimes
              </h3>
              <p className="font-neue text-xs leading-relaxed text-black/65">
                Bypassing standard mobile serialization layers with C++ JSI direct bindings to achieve sub-millisecond ledger telemetry.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-black/[0.08] rounded-2xl p-6 space-y-2">
              <div className="flex items-center space-x-2 text-black/40 font-mono text-xs">
                <ShieldCheck className="w-4 h-4 text-[#181520]" />
                <span>Pillar 03</span>
              </div>
              <h3 className="font-machina text-base font-bold uppercase text-[#181520]">
                Autonomous Edge Invalidation
              </h3>
              <p className="font-neue text-xs leading-relaxed text-black/65">
                Splitting monolithic web clouds into autonomous Next.js micro-zones with sub-40ms global edge cache delivery.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 4. STREAMLINED MONOCHROME NEWSLETTER ================= */}
        <div className="bg-[#181520] text-white rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl scroll-reveal-card border border-white/10">
          <div className="space-y-2 text-center md:text-left max-w-lg">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-mono uppercase tracking-widest text-[#c9d2e7]">
              <Sparkles className="w-3.5 h-3.5 text-[#c9d2e7]" />
              <span>Opus Engineering Dispatch</span>
            </div>
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase leading-tight">
              Direct to your technical inbox.
            </h2>
            <p className="font-neue text-white/70 text-xs md:text-sm leading-relaxed">
              No marketing noise. Only architectural briefs, production post-mortems, and high-frequency software insights.
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (newsletterEmail) {
                setSubscribed(true);
                openChat(`Engineering Dispatch Subscription: ${newsletterEmail}`);
              }
            }} 
            className="w-full md:w-auto flex flex-col sm:flex-row gap-3"
          >
            {subscribed ? (
              <div className="flex items-center space-x-2 bg-white/15 border border-white/25 text-white px-6 py-3 rounded-full text-xs font-machina uppercase tracking-wider">
                <span>Subscription Confirmed</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter corporate email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-xs font-neue text-white placeholder-white/40 outline-none focus:border-white transition-colors w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-7 py-3 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>

      </div>

      <GlobalFooter />
    </div>
  );
}
