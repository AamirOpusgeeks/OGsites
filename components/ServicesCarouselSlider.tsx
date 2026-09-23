'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { useChat } from '@/components/providers/ChatProvider';

export interface ServiceItem {
  title: string;
  tag: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  metrics: string;
}

interface ServicesCarouselSliderProps {
  title: string;
  subtitle: string;
  tagLabel?: string;
  services: ServiceItem[];
  chatPrefix?: string;
}

export default function ServicesCarouselSlider({
  title,
  subtitle,
  tagLabel = 'CORE CAPABILITIES',
  services,
  chatPrefix = 'Capability Discovery',
}: ServicesCarouselSliderProps) {
  const { openChat } = useChat();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  // Check scroll bounds
  const checkScrollBounds = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate active index based on card width
    const cardWidth = 360 + 24; // card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), services.length - 1));
  }, [services.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScrollBounds();
    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds);
    return () => {
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [checkScrollBounds]);

  // Scroll smoothly by card width
  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const cardWidth = 380;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Drag to scroll handlers for desktop mouse users
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftPos(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header with Title & Manual Slider Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-5 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] font-machina uppercase tracking-[0.2em] text-[#181520]/60 mb-2">
            <Sparkles className="w-3 h-3 text-[#181520]" />
            <span>{tagLabel}</span>
          </div>
          <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
            {title}
          </h2>
          <p className="font-neue text-xs md:text-sm text-black/60 max-w-xl mt-1">
            {subtitle}
          </p>
        </div>

        {/* Manual Left/Right Slide Controls */}
        <div className="flex items-center space-x-3 shrink-0">
          {/* Slide Progress Counter */}
          <div className="font-machina text-xs tracking-wider text-[#181520]/70 pr-2">
            <span className="font-bold text-[#181520]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-black/30"> / </span>
            <span className="text-black/50">
              {String(services.length).padStart(2, '0')}
            </span>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous service"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
              canScrollLeft
                ? 'bg-white/80 hover:bg-[#181520] hover:text-white border-black/15 shadow-sm active:scale-95'
                : 'bg-black/[0.03] text-black/20 border-black/5 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next service"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
              canScrollRight
                ? 'bg-white/80 hover:bg-[#181520] hover:text-white border-black/15 shadow-sm active:scale-95'
                : 'bg-black/[0.03] text-black/20 border-black/5 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`flex space-x-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none cursor-grab ${
          isDragging ? 'cursor-grabbing select-none' : ''
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {services.map((svc, idx) => {
          const Icon = svc.icon;
          return (
            <div
              key={idx}
              onClick={() => openChat(`${chatPrefix}: ${svc.title}`)}
              className="snap-start shrink-0 w-[300px] sm:w-[350px] md:w-[370px] group bg-[#f2f1ec]/85 hover:bg-white/95 backdrop-blur-2xl border border-black/[0.08] hover:border-black/25 rounded-3xl p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#181520] text-[#c9d2e7] flex items-center justify-center group-hover:scale-110 group-hover:bg-black transition-all shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/60 bg-black/[0.04] border border-black/10 px-3 py-1 rounded-full">
                    {svc.tag}
                  </span>
                </div>

                <div className="text-[10px] font-machina uppercase tracking-widest text-[#181520]/40 font-bold mb-1">
                  DISCIPLINE // {String(idx + 1).padStart(2, '0')}
                </div>

                <h3 className="font-machina text-lg md:text-xl font-bold uppercase text-[#181520] mb-2.5 leading-snug group-hover:text-black transition-colors">
                  {svc.title}
                </h3>
                <p className="font-neue text-xs md:text-sm leading-relaxed text-[#231b35]/75 mb-6">
                  {svc.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-black/50">
                <span className="flex items-center space-x-1.5 font-medium text-[#181520]/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{svc.metrics}</span>
                </span>
                <div className="flex items-center space-x-1 font-machina text-[10px] uppercase tracking-wider text-[#181520] group-hover:underline">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle Bottom Instruction / Drag Hint */}
      <div className="flex items-center justify-between text-[11px] font-neue text-[#181520]/40 px-1">
        <span>← Drag horizontally or use arrow buttons to navigate →</span>
        <span className="font-mono text-[10px] uppercase">Interactive Capabilities Track</span>
      </div>
    </div>
  );
}
