'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Globe, Smartphone, Palette, ArrowUpRight, Sparkles } from 'lucide-react';
import { useChat } from '@/components/providers/ChatProvider';

interface ServicesDropdownProps {
  buttonClassName?: string;
  onNavigate?: () => void;
}

const SERVICES_DATA = [
  {
    title: 'Web Development',
    tag: 'NEXT.JS • CLOUD & EDGE',
    description: 'High-scale web platforms, microservices & sub-second API pipelines.',
    href: '/services/web-development',
    icon: Globe,
  },
  {
    title: 'App Development',
    tag: 'IOS • ANDROID • REACT NATIVE',
    description: 'Mission-critical mobile platforms with native performance & offline sync.',
    href: '/services/app-development',
    icon: Smartphone,
  },
  {
    title: 'UI/UX Design',
    tag: 'SYSTEMS • 3D WEBGL • ERGONOMICS',
    description: 'Design systems, 3D interactive experiences & high-conversion UI.',
    href: '/services/ui-ux-design',
    icon: Palette,
  },
];

export default function ServicesDropdown({
  buttonClassName = '',
  onNavigate,
}: ServicesDropdownProps) {
  const pathname = usePathname();
  const { openChat } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isServicesActive = pathname.startsWith('/services');

  // Handle smooth mouse enter with delay cancellation
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  // Handle mouse leave with 180ms buffer so user can effortlessly transition into menu
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    if (onNavigate) onNavigate();
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`group flex items-center space-x-1.5 cursor-pointer bg-transparent border-none outline-none transition-all duration-200 ${
          isServicesActive
            ? 'text-[#181520] font-bold'
            : 'text-[#181520]/80 hover:text-[#181520]'
        } ${buttonClassName}`}
      >
        <span className="relative py-1">
          Services
          {isServicesActive && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#181520] rounded-full" />
          )}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 opacity-70 group-hover:opacity-100 ${
            isOpen ? 'rotate-180 text-[#181520]' : ''
          }`}
        />
      </button>

      {/* Floating Luxury Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
          <div
            className="relative w-[370px] sm:w-[415px] bg-[#fafaf8]/98 backdrop-blur-2xl border border-black/[0.08] rounded-2xl p-2.5 shadow-[0_30px_70px_-15px_rgba(24,21,32,0.18),0_10px_25px_-5px_rgba(24,21,32,0.06),0_0_0_1px_rgba(255,255,255,0.9)_inset] animate-in fade-in zoom-in-95 duration-200 origin-top"
          >
            {/* Luxury hairline ambient light bar */}
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-black/15 to-transparent pointer-events-none" />

            {/* Top Micro-Header */}
            <div className="flex items-center justify-between px-3 pt-1.5 pb-2 border-b border-black/[0.05]">
              <span className="font-machina text-[9.5px] uppercase tracking-[0.16em] text-[#181520]/50 font-bold">
                CORE CAPABILITIES
              </span>
              <span className="font-machina text-[10px] text-[#181520]/40 uppercase tracking-wider">
                3 Disciplines
              </span>
            </div>

            {/* Service Items */}
            <div className="mt-1 space-y-1">
              {SERVICES_DATA.map((svc) => {
                const Icon = svc.icon;
                const isCurrent = pathname === svc.href;

                return (
                  <a
                    key={svc.href}
                    href={svc.href}
                    onClick={handleLinkClick}
                    className={`group relative flex items-start space-x-3.5 p-3 rounded-xl transition-all duration-200 text-left ${
                      isCurrent
                        ? 'bg-black/[0.06] shadow-xs'
                        : 'hover:bg-black/[0.04]'
                    }`}
                  >
                    {/* Left Icon Badge with luxury hover effect */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#181520] text-white shadow-sm'
                          : 'bg-black/[0.05] text-[#181520] group-hover:bg-[#181520] group-hover:text-white group-hover:scale-105'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Middle Info */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-machina text-xs font-bold uppercase tracking-wider text-[#181520] group-hover:text-black">
                          {svc.title}
                        </span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-machina font-bold uppercase tracking-wider bg-[#181520] text-white">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <div className="font-machina text-[9px] uppercase tracking-wider text-[#181520]/50 group-hover:text-[#181520]/75 mt-0.5">
                        {svc.tag}
                      </div>
                      <p className="font-neue text-[11px] leading-relaxed text-[#181520]/65 group-hover:text-[#181520]/90 mt-1 line-clamp-2">
                        {svc.description}
                      </p>
                    </div>

                    {/* Right Arrow Micro-Indicator */}
                    <div className="self-center pl-1">
                      <ArrowUpRight
                        className={`w-4 h-4 transition-all duration-200 ${
                          isCurrent
                            ? 'text-[#181520] opacity-100 translate-x-0.5 -translate-y-0.5'
                            : 'text-[#181520]/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#181520]'
                        }`}
                      />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Luxury Bottom Banner Ribbon */}
            <div className="mt-1.5 pt-2 px-3 pb-1 border-t border-black/[0.06] flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-[#181520]/70">
                <Sparkles className="w-3.5 h-3.5 text-[#181520]" />
                <span className="font-neue text-[11px] font-medium">Need custom architecture?</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (onNavigate) onNavigate();
                  openChat('Enterprise Services Architecture Consultation');
                }}
                className="font-machina text-[10px] font-bold uppercase tracking-wider text-[#181520] hover:text-black flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/[0.04] hover:bg-black/[0.08] transition-colors cursor-pointer"
              >
                <span>Consult Architect</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
