'use client';

import { useState, useRef, useEffect } from 'react';
import { X, ArrowUpRight, Check, ArrowRight, CornerDownLeft, Sparkles, Building2, Smartphone, Globe, Layers } from 'lucide-react';

interface Message {
  id: string;
  sender: 'concierge' | 'user';
  stepTag?: string;
  text: string;
  options?: {
    title: string;
    subtitle: string;
    icon?: string;
  }[];
  isResult?: boolean;
}

interface AIChatArchitectProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export default function AIChatArchitect({ isOpen, onClose, initialTopic }: AIChatArchitectProps) {
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [answers, setAnswers] = useState({
    productType: '',
    timeline: '',
    budget: '',
    contact: '',
  });
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'concierge',
      stepTag: '01 // SYSTEM SCOPE',
      text: initialTopic
        ? `Welcome to Opus Studio. Let’s formulate your technical blueprint for ${initialTopic}.\n\nSelect your primary architectural requirement:`
        : 'Welcome to Opus Studio. Let’s formulate your technical blueprint and velocity tier.\n\nSelect your primary architectural requirement:',
      options: [
        {
          title: 'Custom Mobile Application',
          subtitle: 'React Native • Native iOS/Android • 60 FPS Engine',
        },
        {
          title: 'Cloud SaaS & Web Platform',
          subtitle: 'Next.js App Engine • High-Throughput Edge • Microservices',
        },
        {
          title: 'Enterprise Architecture & Modernization',
          subtitle: 'Legacy Refactor • Distributed DB • Zero Trust Security',
        },
        {
          title: '3D Interactive & Spatial Web',
          subtitle: 'Three.js / WebGL • Immersive Storytelling • Shaders',
        },
      ],
    },
  ]);

  // Update initial message if initialTopic changes
  useEffect(() => {
    if (initialTopic) {
      setMessages([
        {
          id: Date.now().toString(),
          sender: 'concierge',
          stepTag: '01 // SYSTEM SCOPE',
          text: `Welcome to Opus Studio. Let’s explore your architectural requirements for "${initialTopic}".\n\nSelect your primary requirement:`,
          options: [
            {
              title: 'Custom Mobile Application',
              subtitle: 'React Native • Native iOS/Android • 60 FPS Engine',
            },
            {
              title: 'Cloud SaaS & Web Platform',
              subtitle: 'Next.js App Engine • High-Throughput Edge • Microservices',
            },
            {
              title: 'Enterprise Architecture & Modernization',
              subtitle: 'Legacy Refactor • Distributed DB • Zero Trust Security',
            },
            {
              title: '3D Interactive & Spatial Web',
              subtitle: 'Three.js / WebGL • Immersive Storytelling • Shaders',
            },
          ],
        },
      ]);
      setStep(0);
    }
  }, [initialTopic]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping, step, isOpen]);

  const handleOptionSelect = (option: { title: string; subtitle: string }) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: option.title,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (step === 0) {
        setAnswers((prev) => ({ ...prev, productType: option.title }));
        setStep(1);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'concierge',
            stepTag: '02 // PRODUCTION HORIZON',
            text: 'Target deployment timeline for Phase 1 release?',
            options: [
              {
                title: 'Rapid MVP Sprint (4–6 Weeks)',
                subtitle: 'Accelerated velocity • Core features & telemetry',
              },
              {
                title: 'Targeted Quarter (Q3 / Q4)',
                subtitle: 'Full-cycle production • Audits & load testing',
              },
              {
                title: 'Continuous Enterprise Roadmap',
                subtitle: 'Dedicated engineering pod & ongoing sprints',
              },
            ],
          },
        ]);
      } else if (step === 1) {
        setAnswers((prev) => ({ ...prev, timeline: option.title }));
        setStep(2);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'concierge',
            stepTag: '03 // CAPITAL ALLOCATION',
            text: 'Estimated investment allocation for this initiative?',
            options: [
              {
                title: '$25k – $50k Tier',
                subtitle: 'Focused single-platform MVP or targeted module',
              },
              {
                title: '$50k – $100k Tier',
                subtitle: 'Multi-platform ecosystem & cloud architecture',
              },
              {
                title: '$100k+ Enterprise Tier',
                subtitle: 'Full custom systems • Dedicated senior engineering pod',
              },
            ],
          },
        ]);
      } else if (step === 2) {
        setAnswers((prev) => ({ ...prev, budget: option.title }));
        setStep(3);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'concierge',
            stepTag: '04 // DOSSIER DELIVERY',
            text: 'Where should our Engineering Lead send your Technical Blueprint & Schedule discovery?',
          },
        ]);
      }
    }, 400);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const text = userInput.trim();
    setUserInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (step < 3) {
        setStep(3);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'concierge',
            stepTag: '04 // DOSSIER DELIVERY',
            text: `Note registered: "${text}".\n\nEnter your work email below to receive your tailored engineering brief:`,
          },
        ]);
      } else {
        setAnswers((prev) => ({ ...prev, contact: text }));
        setStep(4);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'concierge',
            stepTag: 'BRIEF CONFIRMED',
            text: `Architectural Blueprint Formulated.\n\n• Solution Architecture: ${answers.productType || 'Custom Scalable System'}\n• Production Horizon: ${answers.timeline || 'Tailored Sprint'}\n• Capital Allocation: ${answers.budget || 'Custom Plan'}\n• Engineering Pod: Lead Partner Assigned\n\nA Lead Partner will contact ${text} within 2 business hours.`,
            isResult: true,
          },
        ]);
      }
    }, 480);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto flex items-end sm:items-center justify-center sm:justify-end p-3 sm:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      {/* Luxury Floating Chat Window */}
      <div
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative w-full sm:w-[460px] h-[600px] max-h-[86vh] bg-[#fbfbfd]/98 backdrop-blur-3xl border border-black/[0.08] rounded-[28px] shadow-[0_30px_90px_rgba(0,0,0,0.25),0_0_1px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden text-[#181520] font-sans z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 pointer-events-auto select-auto"
      >
        
        {/* Luxury Minimalist Header (Fixed top) */}
        <div className="flex-shrink-0 px-5 py-4 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl select-none">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#181520] animate-pulse"></span>
              <span className="font-machina text-[11px] font-bold uppercase tracking-[0.15em] text-[#181520]">
                Studio Concierge
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="font-neue text-[11px] font-medium text-black/50">
                {step < 4 ? `Step 0${step + 1} / 04` : 'Complete'}
              </span>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#181520]/70 hover:text-[#181520] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4-Step Progress Line */}
          <div className="grid grid-cols-4 gap-1.5 w-full">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  i <= step ? 'bg-[#181520]' : 'bg-black/[0.08]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Messages Scrollable Area (flex-1 min-h-0 with generous bottom padding so last question is never cut) */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="flex-1 min-h-0 overflow-y-auto p-4 md:p-5 space-y-4 text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-black/20 pb-6 overscroll-contain"
        >

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            } animate-in fade-in duration-200`}
          >
            {/* Step Tag */}
            {msg.stepTag && (
              <span className="font-machina text-[9.5px] uppercase tracking-widest text-black/45 mb-1 pl-1">
                {msg.stepTag}
              </span>
            )}

            <div className="flex items-start space-x-2 max-w-[92%]">
              <div
                className={`p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-[#181520] text-white font-medium rounded-tr-none shadow-sm'
                    : msg.isResult
                    ? 'bg-white border border-black/10 text-[#181520] rounded-tl-none shadow-sm'
                    : 'bg-[#f4f5f8]/90 border border-black/[0.05] text-[#181520] rounded-tl-none'
                }`}
              >
                {msg.isResult && (
                  <div className="flex items-center space-x-1.5 text-emerald-700 mb-2 font-machina text-[10.5px] font-bold uppercase tracking-wider border-b border-black/[0.06] pb-1.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Dossier Dispatched</span>
                  </div>
                )}
                <p className="whitespace-pre-line font-neue text-[13px] leading-[145%]">
                  {msg.text}
                </p>
              </div>
            </div>

            {/* Interactive Option Cards */}
            {msg.options && step < 3 && (
              <div className="mt-3 flex flex-col gap-2 w-full pl-1">
                {msg.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(opt)}
                    className="bg-white hover:bg-[#181520] text-[#181520] hover:text-white border border-black/[0.08] hover:border-[#181520] p-3 rounded-xl text-left transition-all duration-200 cursor-pointer active:scale-[0.99] flex items-center justify-between group shadow-xs"
                  >
                    <div className="pr-3">
                      <div className="font-neue font-medium text-[12.5px] leading-snug group-hover:text-white">
                        {opt.title}
                      </div>
                      <div className="font-neue text-[11px] text-black/50 group-hover:text-white/70 mt-0.5 leading-snug">
                        {opt.subtitle}
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full border border-black/10 group-hover:border-white/30 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-1.5 text-[#181520]/40 text-xs pl-2 py-1">
            <div className="w-1 h-1 bg-[#181520] rounded-full animate-bounce" />
            <div className="w-1 h-1 bg-[#181520] rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-1 h-1 bg-[#181520] rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Form (Fixed Bottom) */}
      <form
        onSubmit={handleCustomSend}
        className="flex-shrink-0 p-3 bg-white/80 backdrop-blur-xl border-t border-black/[0.06] flex items-center space-x-2"
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={
            step === 3
              ? 'Enter corporate email (e.g. name@company.com)...'
              : 'Type custom architecture notes or inquiries...'
          }
          className="flex-1 bg-[#f4f5f8] border border-black/[0.06] focus:border-black/20 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#181520] placeholder:text-black/40 outline-none transition-all font-neue"
        />
        <button
          type="submit"
          disabled={!userInput.trim()}
          className="w-9 h-9 rounded-xl bg-[#181520] text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-black flex items-center justify-center transition-all cursor-pointer flex-shrink-0 active:scale-95 shadow-xs"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
      </div>
    </div>
  );
}
