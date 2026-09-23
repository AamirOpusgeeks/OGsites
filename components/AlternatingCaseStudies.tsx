'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, CheckCircle2, Globe, Lock, RotateCw, Maximize2, X, ExternalLink } from 'lucide-react';
import { useChat } from '@/components/providers/ChatProvider';

export interface CaseStudyItem {
  title: string;
  category: string;
  tag: string;
  desc: string;
  image: string;
  stats?: string[];
  client?: string;
  year?: string;
  liveUrl?: string;
  tech?: string[];
}

interface AlternatingCaseStudiesProps {
  sectionTitle: string;
  sectionSubtitle: string;
  tagLabel?: string;
  studies: CaseStudyItem[];
  chatPrefix?: string;
  variant?: 'default' | 'browser' | 'mobile';
}

export default function AlternatingCaseStudies({
  sectionTitle,
  sectionSubtitle,
  tagLabel,
  studies,
  chatPrefix = 'Case Study Breakdown',
  variant = 'default',
}: AlternatingCaseStudiesProps) {
  const { openChat } = useChat();
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudyItem | null>(null);

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-5 gap-3">
        <div>
          {tagLabel && (
            <div className="inline-flex items-center space-x-2 text-[10px] font-machina uppercase tracking-[0.2em] text-[#181520]/60 mb-2">
              <Sparkles className="w-3 h-3 text-[#181520]" />
              <span>{tagLabel}</span>
            </div>
          )}
          <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520]">
            {sectionTitle}
          </h2>
          <p className="font-neue text-xs md:text-sm text-black/60 max-w-xl mt-1">
            {sectionSubtitle}
          </p>
        </div>

        <span className="font-mono text-xs text-black/45 shrink-0">
          {studies.length} Documented Systems
        </span>
      </div>

      {/* Alternating Zigzag Cards Stream */}
      <div className="space-y-10 md:space-y-14">
        {studies.map((study, idx) => {
          const isEven = idx % 2 === 0;
          const displayUrl = study.liveUrl || `https://${study.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

          return (
            <div
              key={idx}
              className="bg-[#f2f1ec]/85 hover:bg-white/95 backdrop-blur-2xl border border-black/[0.08] hover:border-black/20 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                {/* Visual Viewport: Alternates Left vs Right on desktop */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
                  }`}
                >
                  {variant === 'browser' ? (
                    /* ================= BROWSER FRAME VARIANT ================= */
                    <div className="relative group/browser rounded-2xl overflow-hidden bg-[#16141d] border border-black/20 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                      {/* Realistic macOS Safari/Chrome Window Top Bar */}
                      <div className="bg-[#1c1926] px-4 py-3 flex items-center justify-between border-b border-white/10 select-none">
                        {/* Traffic light dots */}
                        <div className="flex items-center space-x-2 w-16">
                          <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-sm" />
                          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-sm" />
                          <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-sm" />
                        </div>

                        {/* Centered URL Address Bar */}
                        <div className="flex-1 max-w-sm mx-auto flex items-center justify-center bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-[11px] font-mono text-white/70 space-x-2">
                          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                          <span className="truncate tracking-wide">{displayUrl}</span>
                          <RotateCw className="w-2.5 h-2.5 text-white/30 ml-auto shrink-0 hidden sm:inline" />
                        </div>

                        {/* Status badge */}
                        <div className="flex items-center justify-end space-x-2 w-16">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono font-medium text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE
                          </span>
                        </div>
                      </div>

                      {/* Screen Viewport with Realistic Aspect Ratio and Interactive Hover */}
                      <div 
                        onClick={() => setActiveModalStudy(study)}
                        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 cursor-pointer group/viewport"
                      >
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/viewport:scale-105"
                        />
                        
                        {/* Interactive Click-to-Expand Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/viewport:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <div className="bg-white/95 text-[#181520] px-4 py-2 rounded-full font-machina text-xs uppercase tracking-wider font-semibold shadow-xl flex items-center gap-2 transform translate-y-2 group-hover/viewport:translate-y-0 transition-transform duration-300">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Inspect Fullscreen Website</span>
                          </div>
                        </div>

                        {/* Category badge floating on bottom-left of screen */}
                        <div className="absolute bottom-3 left-3 pointer-events-none">
                          <span className="bg-black/80 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-machina uppercase tracking-wider shadow-md">
                            {study.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : variant === 'mobile' ? (
                    /* ================= MOBILE PHONE SHOWCASE VARIANT ================= */
                    <div 
                      onClick={() => setActiveModalStudy(study)}
                      className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b1827] via-[#110f19] to-[#0a0910] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)] transition-all duration-500 cursor-pointer group/mobile flex items-center justify-center p-4 sm:p-6"
                    >
                      {/* Subtle Ambient Radial Glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none z-10">
                        <span className="bg-black/80 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-machina uppercase tracking-wider shadow-md">
                          {study.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono font-medium text-emerald-400 backdrop-blur-md shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          APP STORE VERIFIED
                        </span>
                      </div>

                      {/* Phone Image Display */}
                      <div className="relative h-full w-full flex items-center justify-center pt-6 pb-2">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="max-h-[300px] sm:max-h-[360px] md:max-h-[390px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] group-hover/mobile:scale-105 group-hover/mobile:-translate-y-1.5 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Interactive Click-to-Expand Hover Pill */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/mobile:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white/95 text-[#181520] px-4 py-2 rounded-full font-machina text-xs uppercase tracking-wider font-semibold shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover/mobile:translate-y-0 transition-transform duration-300">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Inspect Mobile Application</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ================= DEFAULT IMAGE CARD ================= */
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-black/10 shadow-lg">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                        <span className="bg-black/70 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-machina uppercase tracking-wider shadow-sm">
                          {study.category}
                        </span>
                        <span className="bg-white/90 backdrop-blur-md text-[#181520] border border-black/10 px-3 py-1 rounded-full text-[10px] font-mono font-medium shadow-sm">
                          {study.tag}
                        </span>
                      </div>

                      {/* Bottom overlay title */}
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <div className="font-mono text-[11px] text-white/60 uppercase tracking-widest mb-1">
                          CASE STUDY // {String(idx + 1).padStart(2, '0')}
                        </div>
                        <h3 className="font-machina text-xl md:text-2xl font-bold uppercase tracking-wide">
                          {study.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>

                {/* Editorial Content: Alternates Right vs Left on desktop */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between space-y-6 ${
                    isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Index and Status indicator (only for default variant) */}
                    {variant !== 'browser' && variant !== 'mobile' && (
                      <div className="flex items-center space-x-2 text-xs font-mono text-[#181520]/60 pb-3 border-b border-black/10">
                        <span className="w-2 h-2 rounded-full bg-[#181520]" />
                        <span className="uppercase tracking-widest font-semibold">
                          System // 0{idx + 1}
                        </span>
                        {study.client && (
                          <>
                            <span className="text-black/30">•</span>
                            <span>{study.client}</span>
                          </>
                        )}
                        {study.year && (
                          <>
                            <span className="text-black/30">•</span>
                            <span>{study.year}</span>
                          </>
                        )}
                      </div>
                    )}

                    <h3 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520] leading-tight group-hover:text-black transition-colors">
                      {study.title}
                    </h3>

                    <p className="font-neue text-sm md:text-base leading-relaxed text-[#231b35]/80">
                      {study.desc}
                    </p>

                    {/* Verified Technical Metrics */}
                    {study.stats && study.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {study.stats.map((st, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-black/[0.03] border border-black/[0.08] rounded-xl px-3.5 py-2.5 flex items-center space-x-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="font-mono text-xs font-semibold text-[#181520] truncate">
                              {st}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* High-End Action Buttons */}
                  <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
                    {variant === 'browser' || variant === 'mobile' ? (
                      <button
                        type="button"
                        onClick={() => setActiveModalStudy(study)}
                        className="text-xs font-machina uppercase tracking-wider text-black/70 hover:text-black flex items-center gap-1.5 cursor-pointer hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>View {variant === 'mobile' ? 'Mobile' : 'Live'} Interface</span>
                      </button>
                    ) : (
                      <span className="text-xs font-neue text-black/50">
                        Zero-Downtime Pipeline
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => openChat(`${chatPrefix}: ${study.title}`)}
                      className="bg-[#181520] text-white px-6 py-3 rounded-full text-xs font-machina uppercase tracking-widest hover:bg-black hover:scale-105 transition-all flex items-center space-x-2.5 cursor-pointer shadow-md active:scale-95"
                    >
                      <span>Inspect Blueprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= FULLSCREEN INSPECT LIGHTBOX MODAL ================= */}
      {activeModalStudy && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
          onClick={() => setActiveModalStudy(null)}
        >
          <div 
            className="bg-[#181520] border border-white/20 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#201c2b] px-4 py-3 flex items-center justify-between border-b border-white/10 select-none">
              <div className="flex items-center space-x-2">
                <span 
                  onClick={() => setActiveModalStudy(null)}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:opacity-80 transition-opacity" 
                />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
              </div>

              <div className="flex items-center bg-black/50 border border-white/10 rounded-lg px-4 py-1 text-xs font-mono text-white/80 space-x-2 max-w-md w-full justify-center">
                {variant === 'mobile' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>iOS & Android Native Production Build</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span className="truncate">{activeModalStudy.liveUrl || `https://${activeModalStudy.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}</span>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveModalStudy(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="overflow-y-auto p-3 sm:p-4 bg-[#0d0c12] flex flex-col items-center">
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-inner max-h-[75vh] flex items-center justify-center">
                <img
                  src={activeModalStudy.image}
                  alt={activeModalStudy.title}
                  className="max-h-[72vh] w-auto object-contain"
                />
              </div>

              {/* Modal Footer Info */}
              <div className="mt-4 p-4 bg-white/[0.04] rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
                <div>
                  <h4 className="font-machina text-white text-base font-bold uppercase">
                    {activeModalStudy.title}
                  </h4>
                  <p className="text-white/60 text-xs font-neue mt-0.5">
                    {activeModalStudy.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const title = activeModalStudy.title;
                    setActiveModalStudy(null);
                    openChat(`${chatPrefix}: ${title}`);
                  }}
                  className="bg-white text-[#181520] hover:bg-white/90 px-5 py-2 rounded-full text-xs font-machina uppercase tracking-wider font-semibold shrink-0 transition-all"
                >
                  Consult on this Architecture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

