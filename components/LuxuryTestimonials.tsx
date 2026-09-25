'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Star, 
  Quote, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useChat } from '@/components/providers/ChatProvider';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatarText: string;
  quote: string;
  metric: string;
  metricLabel: string;
  year: string;
  category: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'aetheric',
    name: 'Alexander Vance',
    title: 'Chief Technology Officer',
    company: 'Aetheric Capital',
    location: 'Zurich & New York',
    avatarText: 'AV',
    quote:
      'Opusgeeks re-engineered our institutional clearing platform in under four months. Their WebGL terminal and distributed execution engine completely transformed how tier-1 hedge funds trade our liquidity books.',
    metric: '8.4ms',
    metricLabel: 'P99 Execution Latency',
    year: '2026',
    category: 'Fintech & Liquidity',
  },
  {
    id: 'neuropulse',
    name: 'Dr. Elena Rostova',
    title: 'VP of AI Architecture',
    company: 'NeuroPulse Biometrics',
    location: 'San Francisco, CA',
    avatarText: 'ER',
    quote:
      'When streaming real-time patient biofeedback, latency tolerance is zero. Opusgeeks engineered our clinical platform with surgical precision—it feels like having Apple and DeepMind engineers embedded on your floor.',
    metric: '2.8M+',
    metricLabel: 'Concurrent Streamed Vitals',
    year: '2025',
    category: 'Healthcare & Bio-AI',
  },
  {
    id: 'aurelia',
    name: 'Julian Sterling',
    title: 'Founder & CEO',
    company: 'Maison Aurelia Paris',
    location: 'Paris & London',
    avatarText: 'JS',
    quote:
      'They delivered an otherworldly 3D spatial flagship that loads under 600ms on mobile worldwide. Our average order volume surged 42% within forty-eight hours of launch. Pure craftsmanship.',
    metric: '+280%',
    metricLabel: 'Conversion Surge',
    year: '2026',
    category: 'Spatial 3D & WebGL',
  },
  {
    id: 'apex',
    name: 'Marcus Chen',
    title: 'Head of Distributed Systems',
    company: 'Apex Cloud Autonomous',
    location: 'Singapore',
    avatarText: 'MC',
    quote:
      'From edge micro-routing to complex canvas shaders, every single line of code was mathematically optimized. They do not cut corners; they build monuments.',
    metric: '99.999%',
    metricLabel: 'Zero-Downtime Migration',
    year: '2025',
    category: 'Cloud & Infrastructure',
  },
];

// Star Rating Component with Bright Yellow / Gold Fill
function YellowStars({ count = 5, size = 'w-3.5 h-3.5' }: { count?: number; size?: string }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className={`${size} fill-amber-400 text-amber-400 drop-shadow-[0_1px_4px_rgba(251,191,36,0.3)]`} />
      ))}
    </div>
  );
}

export default function LuxuryTestimonials() {
  const { openChat } = useChat();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // 3D Card Physics State
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardTransform, setCardTransform] = useState<string>(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [cardGlare, setCardGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const activeItem = TESTIMONIALS[activeIndex] || TESTIMONIALS[0];

  // Subtle auto-advance every 8 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  // 3D Card Mouse Tilt (Restrained, Silky Smooth)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setCardTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.005, 1.005, 1.005)`
    );
    setCardGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setCardTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setCardGlare({ x: 50, y: 50, opacity: 0 });
    setIsHovered(false);
  };

  return (
    <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-between select-none py-1 sm:py-2">
      
      {/* ================= 1. HEADER (MONOCHROME + YELLOW STARS) ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 sm:pb-4 border-b border-black/10 shrink-0">
        <div className="space-y-1.5 max-w-3xl">
          {/* Eyebrow Tag with Yellow Stars */}
          <div className="flex items-center gap-2.5">
            <YellowStars count={5} size="w-3.5 h-3.5" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#181520]/70 font-semibold">
              Verified Client Reviews • 5.0 Rating
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-machina font-black text-2xl sm:text-3xl md:text-4xl lg:text-[40px] uppercase tracking-[-0.03em] text-[#181520] leading-[1.05]">
            <span className="block sm:inline">High-Consequence Praise.</span>{' '}
            <span className="text-black/80 block sm:inline">Proven Architectural Impact.</span>
          </h2>

          <p className="font-neue text-xs sm:text-sm text-[#181520]/75 max-w-xl font-normal leading-relaxed">
            Global CTOs and founders partner with Opusgeeks to engineer ultra-low latency platforms and award-winning spatial software.
          </p>
        </div>

        {/* Minimal High-Contrast Metric Pills */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-xl border border-black/10 shadow-xs text-center min-w-[100px]">
            <div className="font-machina text-xl sm:text-2xl font-black text-[#181520]">4.98</div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-black/50">CSAT Score</div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-xl border border-black/10 shadow-xs text-center min-w-[100px]">
            <div className="font-machina text-xl sm:text-2xl font-black text-[#181520]">$480M+</div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-black/50">Value Created</div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-xl border border-black/10 shadow-xs text-center min-w-[100px]">
            <div className="font-machina text-xl sm:text-2xl font-black text-[#181520]">100%</div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-black/50">SLA Delivery</div>
          </div>
        </div>
      </div>

      {/* ================= 2. SPOTLIGHT CENTERPIECE CARD (MONOCHROME LUXURY) ================= */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: cardTransform,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        }}
        className="relative rounded-3xl bg-white/90 backdrop-blur-2xl border border-black/15 shadow-[0_16px_40px_rgba(24,21,32,0.06)] p-5 sm:p-7 md:p-8 overflow-hidden my-auto"
      >
        {/* Specular Interactive Cursor Glare */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 500px at ${cardGlare.x}% ${cardGlare.y}%, rgba(255,255,255,0.8), transparent 70%)`,
            opacity: cardGlare.opacity,
          }}
        />

        {/* Watermark Quote Icon */}
        <div className="absolute top-6 right-8 opacity-[0.04] pointer-events-none text-[#181520]">
          <Quote className="w-40 h-40" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full space-y-4 sm:space-y-5">
          {/* Top Bar: Executive Signature & Rating */}
          <div className="flex items-center justify-between border-b border-black/10 pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#181520] text-white font-machina font-black text-sm sm:text-base flex items-center justify-center shadow-md shrink-0">
                {activeItem.avatarText}
              </div>
              <div>
                <h4 className="font-machina text-base sm:text-lg font-black uppercase text-[#181520] tracking-tight">
                  {activeItem.name}
                </h4>
                <p className="font-neue text-xs sm:text-sm text-[#181520]/80">
                  {activeItem.title} • <span className="font-bold text-[#181520]">{activeItem.company}</span>
                </p>
                <p className="font-mono text-[10px] text-black/50 uppercase tracking-wider">
                  {activeItem.location} • {activeItem.year} Project
                </p>
              </div>
            </div>

            {/* Yellow Stars & Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 border border-black/10">
                <YellowStars count={5} size="w-3.5 h-3.5" />
                <span className="font-mono text-xs font-bold text-[#181520]">5.0</span>
              </div>
              <div className="font-mono text-xs text-black/50 tracking-wider">
                <span className="font-bold text-[#181520]">0{activeIndex + 1}</span> / 0{TESTIMONIALS.length}
              </div>
            </div>
          </div>

          {/* Central Cinema-Grade Quote Container with FIXED HEIGHT so card NEVER resizes */}
          <div className="h-[88px] sm:h-[98px] md:h-[108px] flex items-center">
            <blockquote className="font-machina text-base sm:text-lg md:text-xl lg:text-[22px] text-[#181520] font-normal leading-[1.35] tracking-[-0.02em] max-w-5xl">
              &ldquo;{activeItem.quote}&rdquo;
            </blockquote>
          </div>

          {/* Bottom Row: Verified Metric & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-black/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-[#181520] text-white flex items-center gap-2.5 shadow-sm">
                <div className="font-machina text-lg sm:text-xl font-black">{activeItem.metric}</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-white/70 font-semibold border-l border-white/20 pl-2.5">
                  {activeItem.metricLabel}
                </div>
              </div>

              <span className="font-mono text-[11px] text-black/50 uppercase tracking-wider hidden sm:inline-block">
                {activeItem.category}
              </span>
            </div>

            {/* Navigation Controls & Action */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Review"
                  className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#181520] text-[#181520] hover:text-white border border-black/10 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Review"
                  className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#181520] text-[#181520] hover:text-white border border-black/10 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => openChat(`Discuss Architecture inspired by ${activeItem.company}`)}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#181520] text-white font-machina text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-black transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                <span>Build With Us</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. SLEEK CURATED MINI-CARDS (QUICK SWITCH) ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 shrink-0">
        {TESTIMONIALS.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-white border-2 border-[#181520] shadow-md scale-[1.01]'
                  : 'bg-white/60 hover:bg-white/90 border border-black/10 shadow-2xs'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <YellowStars count={5} size="w-3 h-3" />
                  <span className="font-mono text-[9px] text-black/50 uppercase font-semibold">
                    {item.year}
                  </span>
                </div>

                <p className="font-neue text-[11px] sm:text-xs text-[#181520]/80 line-clamp-2 leading-snug">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                <div>
                  <h5 className="font-machina text-[11px] font-bold uppercase text-[#181520]">
                    {item.name}
                  </h5>
                  <p className="font-neue text-[10px] text-black/50">
                    {item.company}
                  </p>
                </div>

                <div className="font-mono text-[11px] font-bold text-[#181520]">
                  {item.metric}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
