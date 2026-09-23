'use client';

import { useState, useRef, MouseEvent } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  MessageSquare 
} from 'lucide-react';
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { useScrollReveal } from "@/components/ScrollReveal";
import { useChat } from "@/components/providers/ChatProvider";

// Interactive 3D Spatial Tilt Card Component
function InteractiveTiltCard({ 
  children, 
  className = '',
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.1,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: 'preserve-3d', transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)' }}
      className={`relative will-change-transform ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

const DOMAIN_TYPES = [
  'Mobile Systems (iOS / Android Native)',
  'Cloud & Web Infrastructure',
  'AI Swarms & Edge RAG',
  'Spatial 3D & UI/UX Design',
  'Enterprise Architecture Audit'
];

const BUDGET_TIERS = [
  '< $25k Sprint',
  '$25k – $50k Architecture',
  '$50k – $150k Enterprise',
  'Bespoke Retainer'
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);
  const { openChat } = useChat();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: DOMAIN_TYPES[0],
    budget: BUDGET_TIERS[1],
    description: '',
    acceptTerms: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Fire and forget to Edge API for logging & lead ingestion
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          domain: formData.domain,
          budget: formData.budget,
          message: formData.description,
        }),
      }).catch(() => {});
    } catch {}

    const summary = `Executive Commission Brief:\n- Partner: ${formData.name}\n- Work Email: ${formData.email}\n- Direct Line: ${formData.phone || 'Direct'}\n- Architecture Domain: ${formData.domain}\n- Projected Scope: ${formData.budget}\n- Technical Intent: ${formData.description}`;
    openChat(summary);
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

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-24">
        
        {/* ================= TOP NAVBAR ================= */}
        <GlobalHeader />

        {/* ================= 1. SCULPTURAL EDITORIAL HEADER ================= */}
        <div className="space-y-6 reveal-item max-w-5xl pt-2">
          <h1 className="font-machina text-[9vw] md:text-[5.8vw] uppercase leading-[0.88] tracking-tight">
            <div>COMMISSION AN ENGINE,</div>
            <div className="text-black/40">DIRECT ARCHITECT ACCESS.</div>
          </h1>

          <div className="pt-2 border-b border-black/10 pb-8">
            <p className="font-neue text-base md:text-xl text-[#231b35]/85 max-w-2xl leading-relaxed">
              We eliminate sales intermediaries. Every project inquiry connects directly with senior software architects for immediate technical scoping and feasibility audits.
            </p>
          </div>
        </div>

        {/* ================= 2. THE MASTER COMMISSION CONSOLE (AWARD-WINNING MONOLITH) ================= */}
        <div className="reveal-item">
          <InteractiveTiltCard className="bg-[#181520] text-white rounded-[36px] p-8 sm:p-12 md:p-16 shadow-[0_30px_90px_rgba(24,21,32,0.3)] border border-white/15 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-10">
              
              {/* Header inside console */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1 block">
                    Architecture Intake Protocol
                  </span>
                  <h2 className="font-machina text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                    Project Commission Brief
                  </h2>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-white/60">
                  <ShieldCheck className="w-4 h-4 text-white/80" />
                  <span>Encrypted Principal Channel</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Step 1: Target Domain Architecture */}
                <div className="space-y-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-white/60 block">
                    01 // Select Architecture Domain
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {DOMAIN_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, domain: type })}
                        className={`px-4 py-2 rounded-full font-machina text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                          formData.domain === type
                            ? 'bg-white text-[#181520] border-white font-bold shadow-lg scale-105'
                            : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Projected Scope & Budget */}
                <div className="space-y-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-white/60 block">
                    02 // Projected Scale & Investment
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {BUDGET_TIERS.map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: tier })}
                        className={`px-4 py-2 rounded-full font-machina text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                          formData.budget === tier
                            ? 'bg-white text-[#181520] border-white font-bold shadow-lg scale-105'
                            : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Client Identification Inputs */}
                <div className="space-y-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-white/60 block">
                    03 // Partner Identification
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name / Entity"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-neue"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-neue"
                    />
                    <input
                      type="tel"
                      placeholder="Direct Phone (Optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-neue"
                    />
                  </div>
                </div>

                {/* Step 4: Technical Intent */}
                <div className="space-y-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-white/60 block">
                    04 // Architectural Scope & Objectives
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Outline your product thesis, target performance requirements, timeline, and current infrastructure bottlenecks..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-neue resize-none"
                  />
                </div>

                {/* Confidentiality & Submission */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10">
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#181520] focus:ring-0 cursor-pointer accent-white"
                    />
                    <label htmlFor="terms" className="text-xs font-neue text-white/70 cursor-pointer select-none">
                      Covered by mutual non-disclosure & strict enterprise confidentiality.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="bg-white text-[#181520] hover:bg-white/90 py-4 px-9 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-xl active:scale-95 cursor-pointer font-bold shrink-0 hover:scale-105"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Brief Transmitted to Principals</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Architecture Brief</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </InteractiveTiltCard>
        </div>

        {/* ================= 3. DIRECT EXECUTIVE CHANNELS (MONOCHROME LUXURY TRIO) ================= */}
        <div className="space-y-6 reveal-item">
          <div className="border-b border-black/10 pb-4 flex items-center justify-between">
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase text-[#181520] tracking-tight">
              Direct Communication Lines
            </h2>
            <span className="font-mono text-xs text-black/40">Verified Coordinates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Telephony Line */}
            <div 
              onClick={() => window.open('tel:+13466904693')}
              className="bg-white/50 hover:bg-white backdrop-blur-md border border-black/[0.08] hover:border-black/20 rounded-3xl p-7 flex flex-col justify-between space-y-6 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#181520] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="font-mono text-xs uppercase text-black/40 block">
                  Direct Line // Audio Briefing
                </span>
                <p className="font-machina text-lg sm:text-xl font-bold uppercase text-[#181520] tracking-tight">
                  +1 (346) 690-4693
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono text-black/50">
                <span>Direct Telephony</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#181520]" />
              </div>
            </div>

            {/* Encrypted Mailbox */}
            <div 
              onClick={() => window.open('mailto:contact@opusgeeks.com')}
              className="bg-white/50 hover:bg-white backdrop-blur-md border border-black/[0.08] hover:border-black/20 rounded-3xl p-7 flex flex-col justify-between space-y-6 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#181520] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-mono text-xs uppercase text-black/40 block">
                  Encrypted Dispatch // Briefs
                </span>
                <p className="font-machina text-base sm:text-lg font-bold uppercase text-[#181520] tracking-tight break-all">
                  contact@opusgeeks.com
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono text-black/50">
                <span>Encrypted Mailbox</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#181520]" />
              </div>
            </div>

            {/* Global Studio Coordinates */}
            <div 
              onClick={() => openChat('Consultation regarding Houston studio & global coordination')}
              className="bg-white/50 hover:bg-white backdrop-blur-md border border-black/[0.08] hover:border-black/20 rounded-3xl p-7 flex flex-col justify-between space-y-6 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#181520] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-mono text-xs uppercase text-black/40 block">
                  Studio Headquarters // Hub
                </span>
                <p className="font-machina text-base sm:text-lg font-bold uppercase text-[#181520] tracking-tight">
                  Houston, TX • Global Mesh
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono text-black/50">
                <span>Distributed Engineering</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#181520]" />
              </div>
            </div>

          </div>
        </div>

        {/* ================= 4. INSTANT CHAT ADVISORY BAR ================= */}
        <div className="bg-[#181520] text-white rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl reveal-item border border-white/10">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-mono uppercase tracking-widest text-white/60">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Real-Time Principal Consultation</span>
            </div>
            <h2 className="font-machina text-2xl md:text-3xl font-bold uppercase leading-tight">
              Prefer an immediate live architecture session?
            </h2>
            <p className="font-neue text-white/70 text-xs md:text-sm leading-relaxed">
              Launch our live technical intake engine to explore scope, feasibility, and deployment timelines right now.
            </p>
          </div>

          <button
            onClick={() => openChat('Direct Project Onboarding & Architecture Session')}
            className="bg-white text-[#181520] hover:bg-white/90 px-8 py-4 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-2.5 whitespace-nowrap shadow-lg active:scale-95 cursor-pointer font-bold hover:scale-105 shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-[#181520]" />
            <span>Launch Live Session</span>
          </button>
        </div>

      </div>

      <GlobalFooter />
    </div>
  );
}
