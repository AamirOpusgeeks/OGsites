"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Selected Work", href: "#work" },
  { name: "Expertise", href: "#services" },
  { name: "Recognition", href: "#awards" },
  { name: "Studio", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 lg:px-12 py-4 md:py-6 ${
          scrolled
            ? "py-3 md:py-4 bg-[#eae8e3]/85 backdrop-blur-xl border-b border-[rgba(22,22,22,0.08)] shadow-[0_4px_24px_rgba(22,22,22,0.03)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Status */}
          <a
            href="#"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label="Noomo Agency"
          >
            <div className="flex items-center gap-2">
              <span className="font-['Syne'] font-extrabold text-2xl tracking-[-0.04em] text-[#161616] group-hover:opacity-80 transition-opacity">
                NOOMO
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded border border-[rgba(22,22,22,0.12)] text-[#6a6864] bg-white/40">
                LABS
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[rgba(22,22,22,0.04)] border border-[rgba(22,22,22,0.08)] text-[#161616] text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#161616] animate-ping" />
              <span className="hidden lg:inline text-[11px] text-[#6a6864]">AVAILABLE FOR Q3/Q4</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full bg-white/45 backdrop-blur-md border border-[rgba(22,22,22,0.08)] shadow-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-xs uppercase tracking-widest text-[#6a6864] hover:text-[#161616] transition-colors py-1 group font-medium"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#161616] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase font-semibold tracking-wider text-[#eae8e3] bg-[#161616] hover:bg-[#2a2a2a] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#eae8e3]" />
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#eae8e3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/40 border border-[rgba(22,22,22,0.12)] text-[#161616]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#eae8e3]/98 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-['Syne'] text-3xl font-extrabold text-[#161616] flex items-center justify-between border-b border-[rgba(22,22,22,0.1)] pb-4 tracking-[-0.04em]"
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-[#6a6864]">0{idx + 1}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 w-full text-center py-4 rounded-full bg-[#161616] text-[#eae8e3] font-semibold text-sm tracking-wider uppercase"
            >
              Start a Project
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
