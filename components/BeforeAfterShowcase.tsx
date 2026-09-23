'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const TRANSFORMATIONS = [
  {
    label: 'E-Commerce Platform',
    beforeTitle: 'Cluttered Legacy Store',
    afterTitle: 'Premium Spatial Commerce',
    beforePoints: ['Confusing navigation', 'Low contrast text', 'No visual hierarchy', 'Generic stock imagery'],
    afterPoints: ['Intuitive product discovery', 'AAA accessibility', 'Clear conversion paths', 'Custom editorial photography'],
    metric: '+142% Conversion Rate',
    metricSub: 'Post-redesign lift measured over 90 days',
  },
  {
    label: 'SaaS Dashboard',
    beforeTitle: 'Data Overload Interface',
    afterTitle: 'Clarity-First Analytics',
    beforePoints: ['Wall of numbers', 'No data visualization', 'Slow load times', 'Desktop-only layout'],
    afterPoints: ['Smart data cards', 'Interactive charts', 'Sub-second rendering', 'Fully responsive'],
    metric: '+89% User Retention',
    metricSub: 'Users spending 3x more time on platform',
  },
  {
    label: 'Mobile Banking',
    beforeTitle: 'Friction-Heavy Flows',
    afterTitle: 'Zero-Friction Finance',
    beforePoints: ['7-step onboarding', 'No biometric auth', 'Confusing transfers', 'Dated visual design'],
    afterPoints: ['2-step onboarding', 'Face ID & Touch ID', 'One-tap transfers', 'Modern dark mode'],
    metric: '+67% Faster Onboarding',
    metricSub: 'Reduced drop-off by 74% in first week',
  },
];

export default function BeforeAfterShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = TRANSFORMATIONS[activeIdx];

  return (
    <section className="reveal-item">
      {/* Section Header */}
      <div className="mb-8 md:mb-10">
        <div className="inline-flex items-center space-x-2 text-[10px] font-machina uppercase tracking-[0.2em] text-[#181520]/60 mb-2">
          <Sparkles className="w-3 h-3 text-[#181520]" />
          <span>Transformation Impact</span>
        </div>
        <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
          The Opus Geeks Difference
        </h2>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TRANSFORMATIONS.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`px-5 py-2.5 rounded-full text-xs font-machina uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              idx === activeIdx
                ? 'bg-[#181520] text-white shadow-md scale-105'
                : 'bg-[#f0efe9]/80 hover:bg-white text-[#181520] border border-black/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Before/After Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0 rounded-[28px] overflow-hidden border border-black/[0.08] shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
        
        {/* BEFORE Side */}
        <div className="bg-gradient-to-br from-[#f5f0ea] to-[#ebe5db] p-7 sm:p-9 md:p-10 relative overflow-hidden">
          {/* Strikethrough pattern overlay for "old/broken" feel */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 14px, #000 14px, #000 15px)',
          }} />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500/80 font-semibold">
                Before
              </span>
            </div>

            <h3 className="font-machina text-xl sm:text-2xl font-bold uppercase text-[#181520]/70 mb-5 line-through decoration-red-400/40 decoration-2">
              {active.beforeTitle}
            </h3>

            <div className="space-y-3">
              {active.beforePoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 bg-white/50 border border-black/[0.06] rounded-xl px-4 py-3"
                >
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xs font-bold shrink-0">✕</span>
                  <span className="font-neue text-sm text-[#181520]/65">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AFTER Side */}
        <div className="bg-[#181520] p-7 sm:p-9 md:p-10 relative overflow-hidden text-white">
          {/* Subtle radial glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                After — Opus Geeks
              </span>
            </div>

            <h3 className="font-machina text-xl sm:text-2xl font-bold uppercase text-white mb-5">
              {active.afterTitle}
            </h3>

            <div className="space-y-3">
              {active.afterPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  <span className="font-neue text-sm text-white/85">{point}</span>
                </div>
              ))}
            </div>

            {/* Result Metric */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="font-machina text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {active.metric}
                </div>
                <div className="font-neue text-xs text-white/50 mt-0.5">
                  {active.metricSub}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
