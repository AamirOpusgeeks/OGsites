"use client";

import React from "react";
import {
  Boxes,
  Cpu,
  Zap,
  Gauge,
  Workflow,
  Compass,
} from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "3D WEBSITES & WEBGL",
    colSpan: "lg:col-span-8",
    description:
      "Sculpting real-time Three.js / React Three Fiber digital flagships with custom GLSL shaders, dynamic refraction physics, and 60 FPS mobile optimization.",
    icon: Boxes,
    tags: ["Custom Shaders", "R3F & Three.js", "PBR Materials", "Post-Processing"],
    stats: "60 FPS GPU LOCKED",
    badge: "CORE DISCIPLINE",
  },
  {
    id: "02",
    title: "SPATIAL STORYTELLING",
    colSpan: "lg:col-span-4",
    description:
      "Harmonizing editorial typography, sound design, and momentum-driven scroll triggers to immerse audiences in brand mythologies.",
    icon: Compass,
    tags: ["Art Direction", "Scroll Choreography", "Sound Architecture"],
    stats: "AWWWARDS SOTD CALIBER",
    badge: "CREATIVE DIRECTION",
  },
  {
    id: "03",
    title: "GENERATIVE AI & SPATIAL UX",
    colSpan: "lg:col-span-4",
    description:
      "Integrating procedural geometry generation, real-time audio reactivity, and adaptive user flows powered by neural models.",
    icon: Cpu,
    tags: ["Neural Canvas", "Procedural Meshes", "Adaptive Personalization"],
    stats: "< 40MS LATENCY",
    badge: "EMERGING TECH",
  },
  {
    id: "04",
    title: "ENTERPRISE SCALABILITY & NEXT.JS",
    colSpan: "lg:col-span-8",
    description:
      "Architecting zero-hydration mismatch, sub-1.2s LCP, zero CLS, and headless integrations for high-volume international flagships.",
    icon: Zap,
    tags: ["Next.js App Router", "Edge CDN", "Headless CMS", "Core Web Vitals"],
    stats: "99+ LIGHTHOUSE SCORE",
    badge: "FULL-STACK RIGOR",
  },
];

export default function ServicesBento() {
  return (
    <section
      id="services"
      className="relative py-28 px-4 md:px-8 lg:px-12 bg-[#eae8e3] border-t border-[rgba(22,22,22,0.12)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#161616] font-mono text-xs uppercase tracking-widest">
              <Workflow className="w-4 h-4" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="font-['Syne'] font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#161616] tracking-[-0.04em] uppercase leading-[0.88]">
              BEYOND THE <span className="text-[#6a6864]">FLAT SCREEN</span>
            </h2>
          </div>
          <p className="text-[#6a6864] max-w-md text-sm md:text-base font-normal leading-relaxed">
            We bridge the chasm between high-art visual design and high-performance WebGL engineering.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`${service.colSpan} group relative rounded-3xl p-8 sm:p-10 md:p-12 bg-[#dedbd3]/75 backdrop-blur-xl border border-[rgba(22,22,22,0.12)] shadow-[0_15px_35px_rgba(22,22,22,0.04)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#161616]/30`}
              >
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/60 border border-[rgba(22,22,22,0.1)] flex items-center justify-center text-[#161616] group-hover:scale-105 transition-transform duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-white/50 border border-[rgba(22,22,22,0.1)] text-[#161616]">
                          {service.badge}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#6a6864]">
                        /{service.id}
                      </span>
                    </div>

                    <h3 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#161616] uppercase tracking-[-0.04em] leading-[0.88] mb-4">
                      {service.title}
                    </h3>

                    <p className="text-[#6a6864] text-sm sm:text-base font-normal leading-relaxed mb-8">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg text-xs font-mono text-[#161616] bg-white/50 border border-[rgba(22,22,22,0.1)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-6 border-t border-[rgba(22,22,22,0.1)]">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-[#161616]" />
                        <span className="font-mono text-xs font-semibold text-[#161616]">
                          {service.stats}
                        </span>
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#161616] font-bold group-hover:underline">
                        EXPLORE SPECS →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
