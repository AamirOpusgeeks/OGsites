"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, Layers, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  award: string;
  description: string;
  tags: string[];
  metrics: string;
  previewCode: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "NOOMO LABS",
    category: "EXPERIMENTAL 3D SANDBOX",
    year: "2026",
    award: "AWWWARDS SITE OF THE MONTH",
    description:
      "A real-time procedural WebGL landscape exploring physics-based fluid simulation and spatial audio choreography.",
    tags: ["Three.js", "Custom GLSL", "WebAudio API", "React 19"],
    metrics: "+420% ENGAGEMENT DURATION",
    previewCode: "const fluid = new FluidSimulation({ viscosity: 0.012, vorticity: 1.4 });",
  },
  {
    id: "02",
    title: "COINBASE WARRIORS",
    category: "GAMIFIED DEFI ARENA",
    year: "2025",
    award: "FWA OF THE DAY & DEVELOPER AWARD",
    description:
      "Real-time multiplayer Web3 visualizer with zero-latency WebSockets and interactive 3D character avatars.",
    tags: ["WebGL", "R3F Canvas", "GSAP ScrollTrigger", "Tailwind"],
    metrics: "2.8M UNIQUE VISITS IN 48H",
    previewCode: "useFrame((state) => avatar.trackTarget(cursor.vector));",
  },
  {
    id: "03",
    title: "SALESFORCE 360",
    category: "ENTERPRISE DATA SPHERE",
    year: "2025",
    award: "THE WEBBY AWARDS NOMINEE",
    description:
      "Transforming complex multinational cloud metrics into an interactive, multi-layered holographic globe experience.",
    tags: ["WebGPU Compute", "Data Architecture", "Next.js App Router"],
    metrics: "+68% ENTERPRISE CONVERSIONS",
    previewCode: "const cluster = computeParticles(tensorData, { precision: 'highp' });",
  },
  {
    id: "04",
    title: "VISION BY DANDY",
    category: "HAUTE DIGITAL FLAGSHIP",
    year: "2024",
    award: "AWWWARDS SITE OF THE DAY",
    description:
      "A luxury e-commerce experience featuring photorealistic 3D product customizers with refraction materials.",
    tags: ["MeshPhysicalMaterial", "PBR Shading", "E-Commerce", "Spatial Audio"],
    metrics: "99.4% CSAT SATISFACTION",
    previewCode: "material.transmission = 0.98; material.roughness = 0.08;",
  },
];

export default function ProjectsStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Interactive Floating Cursor Badge
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning & stacking scale-down effect for each card
      cardRefs.current.forEach((card, index) => {
        if (!card || index === cardRefs.current.length - 1) return;

        const nextCard = cardRefs.current[index + 1];

        ScrollTrigger.create({
          trigger: nextCard,
          start: "top 80%",
          end: "top 25%",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(card, {
              scale: 1 - p * 0.06,
              filter: `brightness(${1 - p * 0.12})`,
              transformOrigin: "center top",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="work"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-28 px-4 md:px-8 lg:px-12 bg-[#eae8e3]"
    >
      {/* Floating Custom "VIEW" Cursor Badge */}
      <div
        className={`fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 hidden md:flex items-center justify-center ${
          cursorVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transition: "transform 0.08s ease-out, opacity 0.2s ease-out",
        }}
      >
        <div className="px-5 py-2.5 rounded-full bg-[#161616] text-[#eae8e3] font-['Syne'] font-extrabold text-xs uppercase tracking-widest shadow-xl flex items-center gap-1.5">
          <span>VIEW CASE</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3 text-[#161616] font-mono text-xs uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>CURATED PORTFOLIO</span>
          </div>
          <h2 className="font-['Syne'] font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#161616] tracking-[-0.04em] uppercase leading-[0.88]">
            SELECTED <span className="text-[#6a6864]">WORKS</span>
          </h2>
        </div>
        <p className="text-[#6a6864] max-w-md text-sm md:text-base font-normal leading-relaxed">
          Each project is engineered with bespoke WebGL shaders, spatial interaction, and
          high-performance animation pipelines.
        </p>
      </div>

      {/* Sticky Stacking Cards Container: #dedbd3 / rgba(255,255,255,0.45) with backdrop-blur */}
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24 relative">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
            className="sticky top-24 md:top-28 rounded-3xl p-6 sm:p-10 md:p-14 border border-[rgba(22,22,22,0.12)] bg-[#dedbd3]/75 backdrop-blur-xl will-change-transform shadow-[0_20px_50px_rgba(22,22,22,0.06)] overflow-hidden"
            style={{
              zIndex: idx + 10,
            }}
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Editorial Information */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-[#6a6864]">
                      /{project.id}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/60 border border-[rgba(22,22,22,0.1)] text-[#161616]">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-[#6a6864]">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-['Syne'] font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#161616] tracking-[-0.04em] leading-[0.88] uppercase mb-6">
                    {project.title}
                  </h3>

                  <p className="text-[#6a6864] text-sm sm:text-base font-normal leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Award Distinction */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#161616] font-semibold mb-6">
                    <Award className="w-4 h-4 text-[#161616]" />
                    <span>{project.award}</span>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg text-xs font-mono text-[#161616] bg-white/50 border border-[rgba(22,22,22,0.1)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Metric & Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-[rgba(22,22,22,0.1)]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#161616]" />
                      <span className="font-mono text-xs text-[#161616] font-bold tracking-wider">
                        {project.metrics}
                      </span>
                    </div>

                    <a
                      href="#contact"
                      className="group/btn inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#161616] font-bold hover:opacity-70 transition-opacity"
                    >
                      <span>DISCUSS CASE</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Code & Geometric Canvas Card */}
              <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[rgba(22,22,22,0.12)] bg-[#eae8e3]/80 p-6 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#161616]/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#161616]/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#161616]/40" />
                  </div>
                  <span className="text-[10px] font-mono text-[#6a6864] tracking-wider">
                    RENDER_ENGINE_V4.2
                  </span>
                </div>

                {/* Geometric Graphic */}
                <div className="relative flex items-center justify-center my-auto py-8">
                  <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-dashed border-[#161616]/25 animate-spin duration-[25s]" />
                  <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border border-[rgba(22,22,22,0.2)] bg-white/70 backdrop-blur-md rotate-45 transition-transform duration-700 hover:rotate-90 flex items-center justify-center shadow-md">
                    <span className="font-['Syne'] font-extrabold text-xl text-[#161616]">
                      3D
                    </span>
                  </div>
                </div>

                {/* Micro Code Terminal */}
                <div className="rounded-lg bg-white/60 p-3 font-mono text-[11px] text-[#161616] border border-[rgba(22,22,22,0.1)] flex items-center justify-between">
                  <span className="truncate">{project.previewCode}</span>
                  <span className="text-[#161616] text-[10px] ml-2 shrink-0 font-bold">
                    ● 60 FPS
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
