"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Play, Award, Globe2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLHeadingElement>(null);
  const textLine2Ref = useRef<HTMLHeadingElement>(null);
  const textLine3Ref = useRef<HTMLHeadingElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrubbing opposing horizontal translation and depth scale
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      tl.to(
        textLine1Ref.current,
        {
          x: -120,
          ease: "none",
        },
        0
      )
        .to(
          textLine2Ref.current,
          {
            x: 140,
            ease: "none",
          },
          0
        )
        .to(
          textLine3Ref.current,
          {
            x: -90,
            ease: "none",
          },
          0
        )
        .to(
          [textLine1Ref.current, textLine2Ref.current, textLine3Ref.current],
          {
            scale: 0.94,
            opacity: 0.4,
            ease: "none",
          },
          0
        )
        .to(
          subContentRef.current,
          {
            y: 50,
            opacity: 0.3,
            ease: "none",
          },
          0
        );

      // Entrance staggered reveal
      gsap.fromTo(
        [textLine1Ref.current, textLine2Ref.current, textLine3Ref.current],
        {
          y: 90,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.14,
          ease: "power4.out",
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-32 md:pt-40 lg:pt-44 pb-16 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      {/* Top Editorial Meta & Philosophy Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 md:mb-12">
        <div className="lg:col-span-5 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#161616]" />
          <p className="text-xs uppercase tracking-[0.25em] font-mono text-[#6a6864]">
            CREATIVE TECHNOLOGY & 3D STUDIO
          </p>
        </div>

        {/* Top-Right Agency Philosophy */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6 justify-between lg:pl-12">
          <p className="text-sm md:text-base text-[#161616] font-normal leading-relaxed max-w-md">
            We fuse sculptural WebGL dimensions with bold editorial storytelling to craft
            high-converting digital flagships for the world’s most ambitious brands.
          </p>
          <div className="flex flex-col gap-1 text-xs font-mono text-[#6a6864] border-l border-[rgba(22,22,22,0.12)] pl-4 shrink-0">
            <span className="text-[#161616] font-semibold flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#161616]" /> GLOBAL CLIENTELE
            </span>
            <span>SAN FRANCISCO — TOKYO</span>
            <span>EST. 2020</span>
          </div>
        </div>
      </div>

      {/* Massive Editorial Typography: Syne, uppercase, -0.04em letter-spacing, 0.88 line-height */}
      <div className="max-w-[95vw] mx-auto w-full flex flex-col justify-center select-none my-auto py-4">
        <div className="overflow-hidden">
          <h1
            ref={textLine1Ref}
            className="font-['Syne'] font-extrabold text-[12vw] md:text-[11vw] leading-[0.88] tracking-[-0.04em] uppercase text-[#161616] whitespace-nowrap will-change-transform"
          >
            DESIGN THAT
          </h1>
        </div>

        <div className="overflow-hidden flex items-center justify-start md:justify-center">
          <h1
            ref={textLine2Ref}
            className="font-['Syne'] font-extrabold text-[12vw] md:text-[11vw] leading-[0.88] tracking-[-0.04em] uppercase whitespace-nowrap text-[#6a6864] will-change-transform italic"
          >
            ELEVATES YOUR
          </h1>
        </div>

        <div className="overflow-hidden flex justify-start md:justify-end">
          <h1
            ref={textLine3Ref}
            className="font-['Syne'] font-extrabold text-[12vw] md:text-[11vw] leading-[0.88] tracking-[-0.04em] uppercase text-[#161616] whitespace-nowrap will-change-transform"
          >
            DIGITAL PRESENCE
          </h1>
        </div>
      </div>

      {/* Dual Sub-Content & Awards Grid */}
      <div
        ref={subContentRef}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 pt-10 md:pt-14 border-t border-[rgba(22,22,22,0.12)] items-end"
      >
        {/* Left: Reel Video Trigger */}
        <div className="md:col-span-4 flex items-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById("work");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-md border border-[rgba(22,22,22,0.12)] text-xs uppercase font-mono tracking-wider text-[#161616] hover:bg-[#161616] hover:text-[#eae8e3] transition-all duration-300 shadow-sm"
          >
            <div className="w-6 h-6 rounded-full bg-[rgba(22,22,22,0.08)] flex items-center justify-center group-hover:bg-white group-hover:text-[#161616] transition-colors">
              <Play className="w-2.5 h-2.5 text-current fill-current ml-0.5" />
            </div>
            <span>WATCH SHOWREEL &apos;26</span>
          </button>
        </div>

        {/* Center: Scroll Down Indicator */}
        <div className="md:col-span-4 flex items-center justify-start md:justify-center gap-2 text-[#6a6864] text-xs font-mono">
          <span className="animate-bounce">
            <ArrowDownRight className="w-4 h-4 text-[#161616]" />
          </span>
          <span className="tracking-widest uppercase">SCROLL TO DISCOVER</span>
        </div>

        {/* Right: Awards Badge */}
        <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-3">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/45 backdrop-blur-md border border-[rgba(22,22,22,0.12)] shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[rgba(22,22,22,0.06)] flex items-center justify-center text-[#161616]">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#161616] tracking-wider uppercase font-mono">
                AWWWARDS SOTD & SOTM
              </span>
              <span className="text-[10px] text-[#6a6864] font-mono">
                48 INTERNATIONAL HONORS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
