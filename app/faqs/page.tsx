'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import { ArrowUpRight, Plus, Minus, ArrowRight } from 'lucide-react';
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from "@/components/ScrollReveal";
import { useChat } from "@/components/providers/ChatProvider";

// 5 Curated Quintessential Inquiries (Minimal Text, Pure Punch)
const QUESTIONS = [
  {
    number: '01',
    topic: 'Engineering Standard',
    question: 'Are codebases custom-built or template-based?',
    answer: '100% custom-engineered from bare metal. We never use pre-made templates or restrictive page builders. Every schema, component, and animation is tailored to your exact performance benchmarks.',
  },
  {
    number: '02',
    topic: 'Delivery Cadence',
    question: 'What is the typical timeline to launch?',
    answer: 'Bespoke web and mobile platforms ship in 3 to 6 weeks. Enterprise systems with complex integrations range from 8 to 12 weeks, deployed through weekly live staging sprints.',
  },
  {
    number: '03',
    topic: 'Team Composition',
    question: 'Who directly engineers our system?',
    answer: 'Direct collaboration with senior systems architects only. We eliminate junior delegation and account managers, ensuring principal-level craft on every commit.',
  },
  {
    number: '04',
    topic: 'Production Stability',
    question: 'What warranty and support do you guarantee?',
    answer: 'Every launch includes a 30-day comprehensive stability warranty with 24/7 telemetry monitoring, followed by dedicated long-term SLA retainers for continuous feature velocity.',
  },
  {
    number: '05',
    topic: 'Intellectual Property',
    question: 'Who retains codebase and asset ownership?',
    answer: 'You retain 100% ownership. Upon milestone completion, full source code repositories, design tokens, and infrastructure keys are transferred directly to your organization.',
  },
];

export default function FAQPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat } = useChat();

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans select-none">
      {/* Studio Background Image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="Studio Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto flex flex-col space-y-20 md:space-y-28">
        
        {/* ================= TOP NAVBAR ================= */}
        <GlobalHeader />

        {/* ================= 1. SCULPTURAL MINIMAL HERO ================= */}
        <div className="space-y-6 reveal-item pt-4">
          <h1 className="font-machina text-[9vw] md:text-[6vw] uppercase leading-[0.88] tracking-tight">
            <div>SYSTEM QUERIES,</div>
            <div className="text-black/35">DEFINITIVE ANSWERS.</div>
          </h1>

          <p className="font-neue text-base md:text-xl text-[#231b35]/75 max-w-xl leading-relaxed">
            Essential architectural clarity regarding our engineering standards, delivery cadence, and partnership terms.
          </p>
        </div>

        {/* ================= 2. ULTRA-LUXURY EDITORIAL ACCORDION (MINIMAL TEXT) ================= */}
        <div className="space-y-0 border-t border-black/15 reveal-item">
          {QUESTIONS.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={item.number}
                className="border-b border-black/10 transition-colors duration-300"
              >
                {/* Row Trigger */}
                <button
                  onClick={() => toggleQuestion(idx)}
                  className="w-full py-8 md:py-10 flex items-start sm:items-center justify-between gap-6 cursor-pointer text-left group"
                >
                  <div className="flex items-start sm:items-center gap-6 md:gap-10 min-w-0">
                    <span className="font-machina text-xs sm:text-sm font-bold text-black/30 group-hover:text-black transition-colors w-7 shrink-0 pt-0.5 sm:pt-0">
                      {item.number}
                    </span>

                    <div className="space-y-1 min-w-0">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-black/40 block">
                        {item.topic}
                      </span>
                      <h2 className="font-machina text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#181520] group-hover:text-black transition-colors tracking-tight">
                        {item.question}
                      </h2>
                    </div>
                  </div>

                  <div className={`w-10 h-10 rounded-full border border-black/15 flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[#181520] text-white border-[#181520] rotate-45' 
                      : 'bg-white/50 text-[#181520] group-hover:border-[#181520] group-hover:scale-105'
                  }`}>
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {/* Crisp 2-Sentence Answer */}
                {isOpen && (
                  <div className="pb-8 md:pb-10 pl-13 sm:pl-17 md:pl-20 pr-4 sm:pr-16 max-w-3xl space-y-4 animate-fade-in">
                    <p className="font-neue text-base sm:text-lg leading-relaxed text-[#231b35]/85">
                      {item.answer}
                    </p>

                    <button
                      onClick={() => openChat(`Inquiry on ${item.topic}: ${item.question}`)}
                      className="inline-flex items-center space-x-2 text-xs font-machina uppercase tracking-wider text-[#181520] hover:underline font-bold pt-2 cursor-pointer"
                    >
                      <span>Direct In-Depth Inquiry</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= 3. MINIMALIST LUXURY DIRECT INQUIRY STRIP ================= */}
        <div className="bg-[#181520] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl reveal-item border border-white/10">
          <div className="space-y-1">
            <h3 className="font-machina text-xl sm:text-2xl font-bold uppercase tracking-tight">
              Have an unlisted requirement?
            </h3>
            <p className="font-neue text-xs sm:text-sm text-white/60">
              Direct line to our senior systems engineers.
            </p>
          </div>

          <button
            onClick={() => openChat('Direct Technical Feasibility Consultation')}
            className="bg-white text-[#181520] hover:bg-white/90 px-8 py-3.5 rounded-full font-machina text-xs uppercase tracking-widest font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0 flex items-center space-x-2"
          >
            <span>Initiate Direct Dialogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <GlobalFooter />
    </div>
  );
}
