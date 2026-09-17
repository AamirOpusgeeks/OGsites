'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import OpusLogo from '@/components/OpusLogo';
import { useScrollReveal } from '@/components/ScrollReveal';
import { useChat } from '@/components/providers/ChatProvider';

interface ServicePageProps {
  badge: string;
  title1: string;
  title2: string;
  description: string;
  capabilities: { title: string; desc: string }[];
  stack: string[];
}

export default function ServicePageTemplate({
  badge,
  title1,
  title2,
  description,
  capabilities,
  stack,
}: ServicePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat } = useChat();

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#c9d2e7] text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <img src="/backgrounds/background_min.png" alt="bg" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col space-y-16 md:space-y-20">
        {/* Top Navbar Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10 reveal-item">
          <a href="/" className="flex items-center group">
            <OpusLogo variant="full" size={26} />
          </a>
          <a
            href="/"
            className="inline-flex items-center space-x-2 font-machina text-xs uppercase tracking-wider text-[#181520] px-4 py-2 rounded-full border border-black/15 bg-white/50 hover:bg-white transition-all shadow-xs"
          >
            ← Back to Overview
          </a>
        </div>

        {/* Service Hero */}
        <div className="space-y-6 reveal-item">
          <span className="inline-block border border-black/30 rounded-full px-4 py-1 text-xs uppercase font-neue">
            {badge}
          </span>
          <h1 className="font-machina text-[8vw] md:text-[5.5vw] uppercase leading-[0.92] tracking-tight">
            <div>{title1}</div>
            <div className="text-black/60">{title2}</div>
          </h1>
          <p className="font-neue max-w-xl text-base md:text-lg leading-relaxed text-[#231b35] pt-2">
            {description}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-black/10 reveal-item">
            <span className="font-machina text-xs uppercase tracking-widest text-black/50">Core Capabilities</span>
            <span className="font-neue text-xs uppercase tracking-wider text-black/40">Engineered Deliverables</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 reveal-group">
            {capabilities.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#f0efe9]/75 backdrop-blur-md p-8 rounded-2xl border border-white/60 shadow-sm flex flex-col justify-between space-y-8 hover:translate-y-[-4px] hover:shadow-md transition-all duration-300"
              >
                <span className="font-machina text-xs text-black/40">/ 0{idx + 1}</span>
                <div>
                  <h3 className="font-machina text-xl font-bold uppercase mb-3">{item.title}</h3>
                  <p className="font-neue text-sm leading-relaxed text-[#231b35]/80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="border-t border-black/10 pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal-item">
          <span className="font-machina text-xs uppercase tracking-widest text-black/50">Production Tech Stack</span>
          <div className="flex flex-wrap gap-2.5">
            {stack.map((tech, i) => (
              <span
                key={i}
                className="bg-[#181520] text-white px-4 py-1.5 rounded-full text-xs font-neue hover:scale-105 transition-transform"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center border-t border-black/10 pt-12 reveal-item">
          <a href="/" className="font-neue text-xs uppercase tracking-wider hover:opacity-60 transition-opacity">
            ← Back to Overview
          </a>
          <button
            onClick={() => openChat(`Service Project: ${title1} ${title2}`)}
            className="bg-[#181520] text-white px-8 py-3.5 rounded-full flex items-center space-x-3 text-xs uppercase tracking-widest font-machina hover:scale-105 transition-transform shadow-lg cursor-pointer outline-none border-none"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


