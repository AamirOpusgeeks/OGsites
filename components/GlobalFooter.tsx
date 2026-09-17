'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import OpusLogo from '@/components/OpusLogo';
import OG3DBackground from '@/components/OG3DBackground';
import { useChat } from '@/components/providers/ChatProvider';

interface GlobalFooterProps {
  className?: string;
}

export default function GlobalFooter({ className = '' }: GlobalFooterProps) {
  const { openChat } = useChat();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`w-full mt-24 pt-20 pb-14 border-t border-black/15 text-[#181520] relative overflow-hidden font-sans ${className}`}>
      
      {/* LARGE 3D ANIMATED OG MONOGRAM BACKGROUND (Hero Section Style) */}
      <OG3DBackground className="opacity-95" />

      <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10 space-y-20">
        
        {/* ================= EDITORIAL TYPOGRAPHY COLUMNS (Matching Noomo Reference) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 reveal-item">
          
          {/* Column 1: Navigation Links (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-machina text-xs uppercase tracking-widest text-black/40 font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-neue text-sm text-[#181520]">
              <li>
                <a href="/portfolio" className="hover:opacity-60 transition-opacity">Work</a>
              </li>
              <li>
                <a href="/about" className="hover:opacity-60 transition-opacity">Our story</a>
              </li>
              <li>
                <a href="/services/web-development" className="hover:opacity-60 transition-opacity">Services</a>
              </li>
              <li>
                <a href="/blogs" className="hover:opacity-60 transition-opacity">Insights</a>
              </li>
              <li>
                <a href="/contact-us" className="hover:opacity-60 transition-opacity">Connect</a>
              </li>
              <li>
                <a href="/faqs" className="hover:opacity-60 transition-opacity">FAQs</a>
              </li>
              <li>
                <button 
                  onClick={() => openChat('Request Privacy Policy & Terms of Service')}
                  className="hover:opacity-60 transition-opacity text-left bg-transparent border-none outline-none cursor-pointer"
                >
                  Privacy policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Social Links (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-machina text-xs uppercase tracking-widest text-black/40 font-bold mb-4">
              Socials
            </h4>
            <ul className="space-y-2.5 font-neue text-sm text-[#181520]">
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  Dribbble
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Coffee Note & Direct Contacts (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-machina text-xs uppercase tracking-widest text-black/40 font-bold mb-4">
              Direct Dispatch
            </h4>
            <p className="font-neue text-sm text-[#181520] leading-relaxed font-medium">
              Let&apos;s grab some coffee. ☕
            </p>
            <p className="font-neue text-xs text-[#231b35]/75 leading-relaxed max-w-sm">
              We are based in Florida & Karachi, but our engineering teams operate globally across all timezones.
            </p>

            <div className="pt-2 space-y-1.5 font-machina text-xs">
              <div>
                <a href="mailto:contact@opusgeeks.com" className="font-bold text-[#181520] hover:underline break-all">
                  contact@opusgeeks.com
                </a>
              </div>
              <div>
                <a href="tel:+13466904693" className="text-[#181520]/80 hover:text-black">
                  +1 (346) 690-4693
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM BRAND ROW: LOGO ON LEFT + SCROLL TO TOP ON RIGHT ================= */}
        <div className="pt-10 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6 reveal-item">
          
          {/* Left Corner: Brand Signature */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="/" className="group">
              <OpusLogo variant="full" size={28} />
            </a>
            <span className="font-neue text-[11px] text-black/50">
              &copy; {new Date().getFullYear()} Opus Geeks. Crafted with spatial engineering.
            </span>
          </div>

          {/* Right Corner: Scroll to Top */}
          <div className="flex items-center space-x-3">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[#181520] hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
