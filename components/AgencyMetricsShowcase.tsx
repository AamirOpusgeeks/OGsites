'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useChat } from '@/components/providers/ChatProvider';

interface AgencyMetricsShowcaseProps {
  type?: 'web' | 'app';
}

export default function AgencyMetricsShowcase({ type = 'web' }: AgencyMetricsShowcaseProps) {
  const { openChat } = useChat();

  const serviceWord = type === 'web' ? 'website' : 'app';

  return (
    <section className="reveal-item my-12 sm:my-16 lg:my-20">
      <div className="bg-[#f2f1ec]/85 hover:bg-white/95 backdrop-blur-2xl border border-black/[0.08] hover:border-black/20 rounded-[36px] p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Team Studio Photo + Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            {/* Cinematic Agency Studio Photo */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md border border-black/10 group">
              <img
                src="/backgrounds/agency-collaboration.jpg"
                alt="Opus Geeks Development Team Collaborating"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center space-x-2 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/90">
                  Opus Geeks Engineering Studio
                </span>
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="space-y-4">
              <p className="font-neue text-sm sm:text-base leading-relaxed text-[#231b35]/85">
                At Opus Geeks, we understand the importance of metrics and strive to excel in each aspect of our development process. From user engagement to performance optimization, we focus on key indicators that drive tangible results and elevate your {serviceWord} to new heights of success.
              </p>

              {/* Get A Quote CTA Button */}
              <div>
                <button
                  type="button"
                  onClick={() => openChat(`Get A Quote: ${type === 'web' ? 'Web Development' : 'Mobile App Development'} Metrics Consultation`)}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#111111] hover:from-black hover:to-[#1f1f1f] text-white px-7 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
                >
                  <span>Get A Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Black Branded Stats Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-white p-8 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/10 transition-all duration-500 hover:shadow-[0_35px_80px_rgba(0,0,0,0.5)] group">
              
              {/* Ambient Specular Sheen */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

              {/* Stats 2x2 Grid */}
              <div className="grid grid-cols-2 gap-y-10 gap-x-8 sm:gap-y-12 sm:gap-x-10 relative z-10">
                {/* Stat 1 */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="font-machina text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
                    40+
                  </div>
                  <div className="font-neue text-xs sm:text-sm md:text-base font-medium text-white/90 tracking-wide">
                    Happy Clients
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="font-machina text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
                    540+
                  </div>
                  <div className="font-neue text-xs sm:text-sm md:text-base font-medium text-white/90 tracking-wide">
                    Projects Completed
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="font-machina text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
                    300+
                  </div>
                  <div className="font-neue text-xs sm:text-sm md:text-base font-medium text-white/90 tracking-wide">
                    Dedicated Members
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="font-machina text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
                    25+
                  </div>
                  <div className="font-neue text-xs sm:text-sm md:text-base font-medium text-white/90 tracking-wide">
                    Awards Won
                  </div>
                </div>
              </div>

              {/* Opus Geeks Logo Monogram Watermark at Bottom Right */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-md"
                >
                  <circle cx="32" cy="32" r="28" fill="rgba(255,255,255,0.12)" />
                  <rect
                    x="9"
                    y="9"
                    width="46"
                    height="46"
                    rx="15"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 20.5C38.3513 20.5 43.5 25.6487 43.5 32C43.5 38.3513 38.3513 43.5 32 43.5C25.6487 43.5 20.5 38.3513 20.5 32C20.5 27.8 22.8 24.1 26.2 22.2"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M31.5 32H43.5"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M43.5 32V38.5"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle cx="32" cy="32" r="2.5" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
