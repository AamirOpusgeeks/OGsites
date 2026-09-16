"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  ArrowUp,
} from "lucide-react";

const BUDGET_OPTIONS = ["$50K — $100K", "$100K — $300K", "$300K+"];
const SERVICE_OPTIONS = [
  "3D Web Experience",
  "Brand Identity & Motion",
  "WebGL / Shaders",
  "Full Flagship Overhaul",
];

export default function ContactFooter() {
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_OPTIONS[1]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    SERVICE_OPTIONS[0],
  ]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative pt-28 pb-12 px-4 md:px-8 lg:px-12 bg-[#dedbd3]/40 border-t border-[rgba(22,22,22,0.12)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main CTA Editorial Headline */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4 text-[#161616] font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#161616]" />
            <span>START A COLLABORATION</span>
          </div>

          <h2 className="font-['Syne'] font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#161616] tracking-[-0.04em] uppercase leading-[0.88] mb-8">
            LET&apos;S CREATE <br />
            <span className="text-[#6a6864]">SOMETHING</span> <br />
            UNFORGETTABLE.
          </h2>
        </div>

        {/* Interactive Inquiry Form */}
        <div className="rounded-3xl p-8 sm:p-12 md:p-16 bg-[#dedbd3]/80 backdrop-blur-xl border border-[rgba(22,22,22,0.12)] mb-20 shadow-[0_20px_50px_rgba(22,22,22,0.04)]">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Step 1: Services Selection */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-[#6a6864] mb-4">
                01 / WHAT CAN WE CRAFT TOGETHER?
              </label>
              <div className="flex flex-wrap gap-3">
                {SERVICE_OPTIONS.map((svc) => {
                  const active = selectedServices.includes(svc);
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => toggleService(svc)}
                      className={`px-5 py-3 rounded-full text-xs sm:text-sm font-mono tracking-wider uppercase transition-all duration-300 border ${
                        active
                          ? "bg-[#161616] text-[#eae8e3] border-[#161616] shadow-md"
                          : "bg-white/50 text-[#6a6864] border-[rgba(22,22,22,0.12)] hover:border-[#161616] hover:text-[#161616]"
                      }`}
                    >
                      {svc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Budget Pills */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-[#6a6864] mb-4">
                02 / ESTIMATED PROJECT BUDGET (USD)
              </label>
              <div className="flex flex-wrap gap-3">
                {BUDGET_OPTIONS.map((budget) => {
                  const active = selectedBudget === budget;
                  return (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setSelectedBudget(budget)}
                      className={`px-6 py-3 rounded-full text-xs sm:text-sm font-mono tracking-wider uppercase transition-all duration-300 border ${
                        active
                          ? "bg-[#161616] text-[#eae8e3] font-bold border-[#161616] shadow-md"
                          : "bg-white/50 text-[#6a6864] border-[rgba(22,22,22,0.12)] hover:border-[#161616] hover:text-[#161616]"
                      }`}
                    >
                      {budget}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Direct Email & Submit */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-[#6a6864] mb-4">
                03 / YOUR WORK EMAIL
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="flex-1 bg-white/70 border border-[rgba(22,22,22,0.12)] rounded-full px-8 py-4 text-[#161616] text-base placeholder:text-[#6a6864]/60 focus:outline-none focus:border-[#161616] transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-[#161616] text-[#eae8e3] font-['Syne'] font-extrabold text-sm uppercase tracking-wider hover:bg-[#2a2a2a] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>INQUIRY SENT</span>
                    </>
                  ) : (
                    <>
                      <span>INITIATE BRIEF</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Global Hubs Timezones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-[rgba(22,22,22,0.12)] font-mono text-xs">
          <div>
            <span className="text-[#6a6864] block mb-1">SAN FRANCISCO</span>
            <span className="text-[#161616] flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#161616]" /> 02:26 AM PST
            </span>
          </div>
          <div>
            <span className="text-[#6a6864] block mb-1">NEW YORK</span>
            <span className="text-[#161616] flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#161616]" /> 05:26 AM EST
            </span>
          </div>
          <div>
            <span className="text-[#6a6864] block mb-1">LONDON</span>
            <span className="text-[#161616] flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#161616]" /> 10:26 AM GMT
            </span>
          </div>
          <div>
            <span className="text-[#6a6864] block mb-1">TOKYO</span>
            <span className="text-[#161616] flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#161616]" /> 06:26 PM JST
            </span>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs font-mono text-[#6a6864]">
            <span>© 2026 NOOMO LABS INC.</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-[#6a6864] hover:text-[#161616] transition-colors flex items-center gap-1"
            >
              <span>X / TWITTER</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://awwwards.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-[#6a6864] hover:text-[#161616] transition-colors flex items-center gap-1"
            >
              <span>AWWWARDS</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-[#6a6864] hover:text-[#161616] transition-colors flex items-center gap-1"
            >
              <span>INSTAGRAM</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              onClick={scrollToTop}
              className="ml-4 p-3 rounded-full bg-white/60 border border-[rgba(22,22,22,0.12)] text-[#161616] hover:bg-[#161616] hover:text-[#eae8e3] transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
