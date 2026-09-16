"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { target: 23, label: "AWWWARDS", sublabel: "SOTD, SOTM & DEV AWARD" },
  { target: 12, label: "FWA RECOGNITIONS", sublabel: "FOTD & OF THE MONTH" },
  { target: 8, label: "WEBBY AWARDS", sublabel: "BEST VISUAL & EXPERIMENTAL" },
  { target: 31, label: "CSS DESIGN AWARDS", sublabel: "UI, UX & INNOVATION WINS" },
];

const RECENT_HONORS = [
  {
    year: "2026",
    accolade: "Site of the Month",
    organization: "Awwwards",
    project: "Noomo Labs 3D",
    category: "Experimental WebGL",
  },
  {
    year: "2025",
    accolade: "FWA of the Day",
    organization: "The FWA",
    project: "Coinbase Warriors Arena",
    category: "Real-time Multiplayer",
  },
  {
    year: "2025",
    accolade: "Nominee: Best Visual Design",
    organization: "The Webby Awards",
    project: "Salesforce 360 Globe",
    category: "Corporate Enterprise",
  },
  {
    year: "2025",
    accolade: "Site of the Day",
    organization: "Awwwards",
    project: "Vision by Dandy",
    category: "Luxury E-Commerce",
  },
  {
    year: "2024",
    accolade: "Developer Award",
    organization: "Awwwards",
    project: "Spatial Chrono OS",
    category: "Technical Achievement",
  },
];

export default function Awards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, idx) => {
        const el = numRefs.current[idx];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.target,
          duration: 2.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          onUpdate: () => {
            el.innerText = `${Math.floor(obj.val)}+`;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="awards"
      ref={containerRef}
      className="relative py-28 px-4 md:px-8 lg:px-12 bg-[#eae8e3] border-t border-[rgba(22,22,22,0.12)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#161616] font-mono text-xs uppercase tracking-widest">
              <Trophy className="w-4 h-4" />
              <span>INDUSTRY RECOGNITION</span>
            </div>
            <h2 className="font-['Syne'] font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#161616] tracking-[-0.04em] uppercase leading-[0.88]">
              HONORS & <span className="text-[#6a6864]">AWARDS</span>
            </h2>
          </div>
          <p className="text-[#6a6864] max-w-md text-sm md:text-base font-normal leading-relaxed">
            Relentless obsession with craft has earned our creations world-class accolades from
            the premier authorities in digital design.
          </p>
        </div>

        {/* Dynamic Metric Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="p-8 rounded-3xl bg-[#dedbd3]/75 backdrop-blur-xl border border-[rgba(22,22,22,0.12)] shadow-[0_10px_30px_rgba(22,22,22,0.03)] flex flex-col justify-between"
            >
              <span
                ref={(el) => {
                  numRefs.current[idx] = el;
                }}
                className="font-['Syne'] font-extrabold text-5xl sm:text-6xl md:text-7xl text-[#161616] tracking-[-0.04em] leading-[0.88] mb-4"
              >
                0+
              </span>
              <div>
                <h3 className="font-mono text-xs md:text-sm font-bold text-[#161616] tracking-wider uppercase mb-1">
                  {stat.label}
                </h3>
                <p className="font-mono text-[11px] text-[#6a6864]">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Honors Table */}
        <div className="rounded-3xl border border-[rgba(22,22,22,0.12)] bg-[#dedbd3]/60 backdrop-blur-xl overflow-hidden shadow-sm">
          <div className="divide-y divide-[rgba(22,22,22,0.08)]">
            {RECENT_HONORS.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:px-8 hover:bg-white/40 transition-colors duration-200 gap-4"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs text-[#6a6864] w-12">
                    {item.year}
                  </span>
                  <div>
                    <h4 className="font-['Syne'] font-bold text-lg sm:text-xl text-[#161616] tracking-[-0.02em] group-hover:opacity-80 transition-opacity">
                      {item.project}
                    </h4>
                    <p className="font-mono text-xs text-[#6a6864]">
                      {item.organization} — {item.accolade}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <span className="font-mono text-xs text-[#161616] px-3 py-1 rounded-full bg-white/60 border border-[rgba(22,22,22,0.1)]">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[rgba(22,22,22,0.12)] flex items-center justify-center text-[#161616] group-hover:bg-[#161616] group-hover:text-[#eae8e3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
