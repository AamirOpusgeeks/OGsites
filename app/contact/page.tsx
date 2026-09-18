'use client';

import { useState, useRef, MouseEvent } from 'react';
import { 
  ArrowUpRight, 
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Bot,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  ChevronRight
} from 'lucide-react';
import OpusLogo from "@/components/OpusLogo";
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

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
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

const PROJECT_TYPES = [
  'Mobile Systems Engineering',
  'Cloud & Web Platforms',
  'AI & Neural Integrations',
  'Spatial 3D & UI/UX',
  'Enterprise Infrastructure'
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
    service: PROJECT_TYPES[0],
    description: '',
    acceptTerms: true,
  });

  const [aiMode, setAiMode] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleAILaunch = () => {
    const promptText = `Project Intake Consultation:\n- Client: ${formData.name || 'Enterprise Client'}\n- Email: ${formData.email || 'Direct'}\n- Focus: ${formData.service}\n- Description: ${formData.description || 'Full-cycle engineering & architecture consultation'}`;
    openChat(promptText);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#181520] pt-6 md:pt-8 pb-24 px-6 md:px-14 overflow-hidden font-sans">
      {/* Studio Background Image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/backgrounds/background_min.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-20">
        
        {/* ================= TOP NAVBAR ================= */}
        <GlobalHeader />

        {/* ================= 1. HERO BANNER: GET IN TOUCH WITH US ================= */}
        <InteractiveTiltCard className="bg-[#181520] text-white rounded-[36px] p-8 sm:p-12 md:p-16 shadow-[0_30px_80px_rgba(24,21,32,0.35)] relative overflow-hidden reveal-item border border-white/15">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9d2e7]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-machina uppercase tracking-widest text-[#c9d2e7]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Dialogue</span>
              </div>

              <h1 className="font-machina text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]">
                Get in <span className="text-[#c9d2e7]">Touch</span> With Us
              </h1>

              <p className="font-neue text-sm sm:text-base md:text-lg leading-relaxed text-white/80 max-w-xl">
                Ready to take your project to the next level? We&apos;re here to help! Whether you have questions, want to discuss ideas, or are ready to get started, we&apos;d love to hear from you. Reach out to us today to begin your journey with Opus Geeks.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openChat('Direct Project Onboarding & Architecture Session')}
                  className="bg-white text-[#181520] hover:bg-[#c9d2e7] px-8 py-4 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-3 shadow-xl active:scale-95 cursor-pointer font-bold group"
                >
                  <span>Get Started</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md h-72 sm:h-80 md:h-96 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Client Success Director"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181520] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#181520]/80 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <h4 className="font-machina text-sm font-bold uppercase text-white">Direct Advisory</h4>
                    <p className="font-neue text-xs text-white/70">1-on-1 Senior Engineering Briefings</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#c9d2e7]">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </InteractiveTiltCard>

        {/* ================= 2. BOOK A FREE CONSULTATION (WITH AI INTAKE ENGINE) ================= */}
        <div className="space-y-6 reveal-item">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Spatial Visual Card */}
            <div className="lg:col-span-5 flex flex-col">
              <InteractiveTiltCard className="bg-[#f0efe9]/90 backdrop-blur-2xl border border-white/80 rounded-[36px] p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                <div className="space-y-4">
                  <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-black/10 shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
                      alt="Consultation in progress"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2 text-xs font-machina uppercase tracking-widest text-[#181520]/60">
                      <Clock className="w-3.5 h-3.5 text-[#181520]" />
                      <span>Rapid Turnaround Protocol</span>
                    </div>
                    <h3 className="font-machina text-2xl font-bold uppercase text-[#181520]">
                      Tailored Architecture Sprints
                    </h3>
                    <p className="font-neue text-xs sm:text-sm text-[#231b35]/80 leading-relaxed">
                      Every inquiry is directly audited by a principal software architect. We provide clear technical specifications, risk assessments, and zero-defect deployment roadmaps.
                    </p>
                  </div>
                </div>

                {/* Feature Chips */}
                <div className="pt-4 border-t border-black/10 grid grid-cols-2 gap-3 text-xs font-neue text-[#181520]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#181520] shrink-0" />
                    <span>Direct NDA Standard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#181520] shrink-0" />
                    <span>Fixed Scope Guarantees</span>
                  </div>
                </div>
              </InteractiveTiltCard>
            </div>

            {/* Right Interactive AI Intake & Consultation Form */}
            <div className="lg:col-span-7">
              <InteractiveTiltCard className="bg-[#181520] text-white rounded-[36px] p-8 sm:p-10 md:p-12 shadow-2xl border border-white/15 relative overflow-hidden flex flex-col justify-between h-full">
                
                {/* Ambient Top Glow */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#c9d2e7]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  
                  {/* Form Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <h2 className="font-machina text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                        Book a <span className="text-[#c9d2e7]">Free</span> Consultation
                      </h2>
                      <p className="font-neue text-xs text-white/70 mt-1">
                        Connect with our engineering principals via instant AI intake or manual submission.
                      </p>
                    </div>

                    {/* Mode Toggle Switch */}
                    <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/15 shrink-0">
                      <button
                        type="button"
                        onClick={() => setAiMode(true)}
                        className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-machina text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          aiMode ? 'bg-white text-[#181520] font-bold shadow-md' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        <Bot className="w-3 h-3" />
                        <span>AI Intake</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAiMode(false)}
                        className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-machina text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          !aiMode ? 'bg-white text-[#181520] font-bold shadow-md' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        <Layers className="w-3 h-3" />
                        <span>Manual</span>
                      </button>
                    </div>
                  </div>

                  {/* AI Mode Banner */}
                  {aiMode && (
                    <div className="bg-white/5 border border-white/15 rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#c9d2e7] shrink-0">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-machina text-xs font-bold uppercase text-white">Intelligent Scope Engine</h4>
                          <p className="font-neue text-[11px] text-white/70">Pre-fills your architecture brief and opens live AI consultation session.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleAILaunch}
                        className="bg-[#c9d2e7] text-[#181520] hover:bg-white px-4 py-2 rounded-full font-machina text-[10px] uppercase tracking-widest font-bold transition-colors shrink-0 cursor-pointer"
                      >
                        Launch AI
                      </button>
                    </div>
                  )}

                  {/* Quick Domain Scope Chips */}
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/60 block">
                      Target Domain Architecture
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((type, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: type })}
                          className={`px-3 py-1.5 rounded-full font-machina text-[11px] uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                            formData.service === type
                              ? 'bg-white text-[#181520] border-white font-bold shadow-md'
                              : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-neue"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <input
                          type="email"
                          required
                          placeholder="Work Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-neue"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <input
                        type="tel"
                        placeholder="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-neue"
                      />
                    </div>

                    {/* Project Description */}
                    <div className="space-y-1">
                      <textarea
                        rows={3}
                        required
                        placeholder="Briefly describe your product goals, timeline, and architecture needs..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-neue resize-none"
                      />
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-center space-x-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#181520] focus:ring-0 cursor-pointer accent-white"
                      />
                      <label htmlFor="terms" className="text-[11px] font-neue text-white/70 cursor-pointer select-none">
                        Accept our terms & confidentiality agreements
                      </label>
                    </div>

                    {/* Submit / AI Consultation Trigger Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      {aiMode ? (
                        <button
                          type="button"
                          onClick={handleAILaunch}
                          className="w-full bg-white text-[#181520] hover:bg-[#c9d2e7] py-4 px-8 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl active:scale-95 cursor-pointer font-bold group"
                        >
                          <span>Initiate AI Architecture Session</span>
                          <Sparkles className="w-4 h-4 text-[#181520] group-hover:rotate-12 transition-transform" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full bg-white text-[#181520] hover:bg-[#c9d2e7] py-4 px-8 rounded-full font-machina text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl active:scale-95 cursor-pointer font-bold"
                        >
                          {isSubmitted ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Inquiry Transmitted Successfully</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Consultation Request</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </form>

                </div>

              </InteractiveTiltCard>
            </div>

          </div>
        </div>

        {/* ================= 3. WHY CHOOSE US & DIRECT CONTACT CHANNELS ================= */}
        <div className="space-y-8 reveal-item">
          
          {/* Section Heading */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-xs font-machina uppercase tracking-widest text-[#181520]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#181520]" />
              <span>Opus Geeks</span>
            </div>
            <h2 className="font-machina text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#181520]">
              Why Choose Us
            </h2>
            <p className="font-neue text-xs sm:text-sm md:text-base leading-relaxed text-[#231b35]/80">
              When it comes to your digital needs, why settle for anything less than exceptional? At Opus Geeks, we&apos;re dedicated to delivering top-notch solutions tailored to your unique desires. With our expertise, dedication to excellence, and client-centric approach, we ensure that every project surpasses expectations. Choose Opus Geeks for unmatched service and results that speak for themselves.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Direct Communication Cards (Left 6 Cols) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Phone Card */}
              <InteractiveTiltCard 
                onClick={() => window.open('tel:+13466904693')}
                className="bg-white/95 backdrop-blur-2xl border border-black/10 rounded-3xl p-7 flex flex-col justify-between space-y-6 shadow-[0_15px_40px_rgba(24,21,32,0.05)] hover:shadow-[0_20px_50px_rgba(24,21,32,0.1)] transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#181520] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Phone className="w-6 h-6 text-[#c9d2e7]" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-machina text-xs uppercase tracking-widest text-black/50 font-bold">
                    Call Now:
                  </h4>
                  <p className="font-machina text-lg sm:text-xl font-black uppercase text-[#181520] tracking-tight group-hover:text-black">
                    +1 (346) 690-4693
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-black/50">
                  <span>Direct Telephony Line</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#181520]" />
                </div>
              </InteractiveTiltCard>

              {/* Email Card */}
              <InteractiveTiltCard 
                onClick={() => window.open('mailto:contact@opusgeeks.com')}
                className="bg-white/95 backdrop-blur-2xl border border-black/10 rounded-3xl p-7 flex flex-col justify-between space-y-6 shadow-[0_15px_40px_rgba(24,21,32,0.05)] hover:shadow-[0_20px_50px_rgba(24,21,32,0.1)] transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#181520] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Mail className="w-6 h-6 text-[#c9d2e7]" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-machina text-xs uppercase tracking-widest text-black/50 font-bold">
                    Email Now:
                  </h4>
                  <p className="font-machina text-base sm:text-lg font-black uppercase text-[#181520] tracking-tight group-hover:text-black break-all">
                    contact@opusgeeks.com
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-black/50">
                  <span>Encrypted Mailbox</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#181520]" />
                </div>
              </InteractiveTiltCard>

            </div>

            {/* Right Neural Network / Constellation Visual Card (Right 6 Cols) */}
            <div className="lg:col-span-6">
              <InteractiveTiltCard className="bg-[#181520] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/15 relative overflow-hidden h-full flex flex-col justify-between space-y-6">
                
                {/* Visual Image Backdrop */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                    alt="Neural Constellation"
                    className="w-full h-full object-cover opacity-35 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181520] via-[#181520]/60 to-transparent" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono uppercase tracking-wider text-[#c9d2e7]">
                    <Globe className="w-3 h-3" />
                    <span>Global Engineering Presence</span>
                  </div>

                  <h3 className="font-machina text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    Engineering Stability. Delivered Without Compromise.
                  </h3>

                  <p className="font-neue text-xs sm:text-sm text-white/80 leading-relaxed max-w-lg">
                    Whether you are architecting a distributed web ecosystem or deploying high-frequency native mobile code, our teams operate as your direct technical co-founders.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#c9d2e7]">Direct Dispatch: Sub-4h Response</span>
                </div>

              </InteractiveTiltCard>
            </div>

          </div>
        </div>

      </div>

      <GlobalFooter />
    </div>
  );
}
