'use client';

import React from 'react';
import { Search, PenTool, Layers, Palette, Rocket } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    tagline: 'Research & Strategy',
    desc: 'User interviews, competitive audits, and stakeholder alignment to define the design vision.',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Wireframe',
    tagline: 'Information Architecture',
    desc: 'Low-fidelity layouts and user flow mapping to structure every interaction path.',
  },
  {
    icon: Layers,
    number: '03',
    title: 'Prototype',
    tagline: 'Interactive Validation',
    desc: 'Clickable high-fidelity prototypes tested with real users before a single line of code.',
  },
  {
    icon: Palette,
    number: '04',
    title: 'Design',
    tagline: 'Visual & Motion',
    desc: 'Pixel-perfect UI, design tokens, micro-animations, and accessibility compliance.',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Handoff',
    tagline: 'Dev-Ready Assets',
    desc: 'Annotated specs, Storybook components, and design system tokens synced to production.',
  },
];

export default function DesignProcessTimeline() {
  return (
    <section className="reveal-item">
      {/* Section Header */}
      <div className="mb-10 md:mb-14">
        <div className="inline-flex items-center space-x-2 text-[10px] font-machina uppercase tracking-[0.2em] text-[#181520]/60 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#181520]" />
          <span>Our Proven Process</span>
        </div>
        <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
          From Vision To Pixel-Perfect Reality
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Horizontal Connecting Line (desktop only) */}
        <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-black/15 to-transparent z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center text-center"
              >
                {/* Step Circle */}
                <div className="relative mb-5">
                  {/* Pulsing ring on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#181520]/10 scale-100 group-hover:scale-[1.35] transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                  <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full bg-[#181520] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.2)] group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-all duration-400">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-white border-2 border-[#181520] text-[#181520] text-[10px] font-machina font-bold flex items-center justify-center shadow-sm">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-machina text-sm sm:text-base font-bold uppercase tracking-wide text-[#181520] mb-1">
                  {step.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#181520]/50 mb-3">
                  {step.tagline}
                </span>
                <p className="font-neue text-xs sm:text-[13px] leading-relaxed text-[#231b35]/70 max-w-[220px]">
                  {step.desc}
                </p>

                {/* Arrow connector for mobile/tablet between steps */}
                {idx < STEPS.length - 1 && (
                  <div className="lg:hidden mt-4 mb-1 text-black/20">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4L10 16M10 16L5 11M10 16L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
