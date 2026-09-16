"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  { name: "SALESFORCE", tag: "ENTERPRISE 3D" },
  { name: "AMD COMPUTING", tag: "AI HARDWARE" },
  { name: "COINBASE", tag: "WEB3 PORTAL" },
  { name: "RED BULL", tag: "EXPERIENTIAL" },
  { name: "INTEL LABS", tag: "MICRO-SITE" },
  { name: "SAMSUNG", tag: "SPATIAL WEB" },
  { name: "POLESTAR", tag: "EV CONFIGURATOR" },
  { name: "NIKE INNOVATION", tag: "IMMERSIVE COMMERCE" },
];

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollVelocity = useRef(0);
  const currentOffset = useRef(0);

  useEffect(() => {
    // Dynamic velocity tracking via ScrollTrigger
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        scrollVelocity.current = self.getVelocity() / 350;
      },
    });

    const baseSpeed = 1.1;
    const tickerFunc = () => {
      scrollVelocity.current *= 0.92;
      const effectiveSpeed = baseSpeed + Math.abs(scrollVelocity.current);
      currentOffset.current -= effectiveSpeed;

      if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (Math.abs(currentOffset.current) >= halfWidth) {
          currentOffset.current = 0;
        }
        trackRef.current.style.transform = `translate3d(${currentOffset.current}px, 0, 0)`;
      }
    };

    gsap.ticker.add(tickerFunc);

    return () => {
      gsap.ticker.remove(tickerFunc);
      st.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-12 border-y border-[rgba(22,22,22,0.12)] bg-[#dedbd3]/50 backdrop-blur-md overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#6a6864]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#161616]" />
          <span>TRUSTED BY INDUSTRY TITANS & BREAKTHROUGH UNICORNS</span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-[#6a6864]">
          VELOCITY SYNC ACTIVE
        </span>
      </div>

      {/* Ribbon Track */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        <div
          ref={trackRef}
          className="flex items-center gap-12 sm:gap-16 will-change-transform"
        >
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-4 group cursor-default"
            >
              <div className="font-['Syne'] font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#6a6864] group-hover:text-[#161616] transition-colors duration-300 tracking-[-0.04em] flex items-center gap-3">
                <span>{client.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#161616]/30 group-hover:bg-[#161616] group-hover:scale-125 transition-all duration-300" />
              </div>
              <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full border border-[rgba(22,22,22,0.12)] text-[#6a6864] bg-white/40">
                {client.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
