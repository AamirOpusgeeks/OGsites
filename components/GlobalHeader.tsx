'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import OpusLogo from '@/components/OpusLogo';
import { useChat } from '@/components/providers/ChatProvider';

interface GlobalHeaderProps {
  className?: string;
}

export default function GlobalHeader({ className = '' }: GlobalHeaderProps) {
  const pathname = usePathname();
  const { openChat, toggleChat } = useChat();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { 
      label: 'Services', 
      href: '/services/web-development',
      isDropdown: true,
      subItems: [
        { label: 'Web Development', href: '/services/web-development' },
        { label: 'App Development', href: '/services/app-development' },
        { label: 'UI/UX Design', href: '/services/ui-ux-design' },
      ]
    },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About', href: '/about' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'FAQs', href: '/faqs' },
  ];

  return (
    <>
      <header className={`w-full flex items-center justify-between pb-4 border-b border-black/10 reveal-item ${className}`}>
        {/* Left Corner: Brand Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center group">
            <OpusLogo variant="full" size={28} />
          </a>
        </div>

        {/* Right Corner: Navigation Menu & Action Buttons */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.isDropdown && pathname.startsWith('/services'));

              if (item.isDropdown) {
                return (
                  <div 
                    key={item.label}
                    className="relative group py-2"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <a
                      href={item.href}
                      className={`font-neue text-[13px] font-medium transition-all flex items-center space-x-1 cursor-pointer ${
                        isActive ? 'text-[#181520] font-bold border-b-2 border-[#181520] pb-0.5' : 'text-[#181520]/75 hover:text-[#181520]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                    </a>

                    {/* Dropdown Menu */}
                    {servicesDropdown && (
                      <div className="absolute top-full left-0 w-48 bg-white/95 backdrop-blur-2xl border border-black/10 rounded-2xl p-2 shadow-2xl z-50 animate-fadeIn">
                        {item.subItems?.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="block px-4 py-2.5 rounded-xl font-neue text-xs text-[#181520] hover:bg-black/5 transition-colors"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-neue text-[13px] font-medium transition-all ${
                    isActive ? 'text-[#181520] font-bold border-b-2 border-[#181520] pb-0.5' : 'text-[#181520]/75 hover:text-[#181520]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Corner Buttons */}
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="hidden sm:inline-flex items-center space-x-1.5 font-machina text-xs uppercase tracking-wider text-[#181520] px-4 py-2 rounded-full border border-black/15 bg-white/50 hover:bg-white transition-all shadow-xs"
            >
              <span>Overview</span>
            </a>

            <button
              onClick={toggleChat}
              className="bg-[#181520] text-white hover:bg-black px-5 py-2.5 rounded-full font-machina text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c9d2e7]" />
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/60 border border-black/10 text-[#181520] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#c9d2e7]/98 backdrop-blur-2xl flex flex-col justify-between p-8 lg:hidden animate-fadeIn">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <OpusLogo variant="full" size={26} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/80 border border-black/10 text-[#181520]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-5 my-auto">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-machina text-2xl font-black uppercase text-[#181520] hover:translate-x-2 transition-transform"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-black/10 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChat('Direct Consultation from Mobile Menu');
              }}
              className="w-full bg-[#181520] text-white py-3.5 rounded-full font-machina text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[#c9d2e7]" />
              <span>Launch AI Intake</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
