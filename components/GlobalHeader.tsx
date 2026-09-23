'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import OpusLogo from '@/components/OpusLogo';
import { useChat } from '@/components/providers/ChatProvider';
import ServicesDropdown from '@/components/ServicesDropdown';

interface GlobalHeaderProps {
  className?: string;
}

export default function GlobalHeader({ className = '' }: GlobalHeaderProps) {
  const pathname = usePathname();
  const { openChat, toggleChat } = useChat();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#c9d2e7]/75 backdrop-blur-xl border-b border-black/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3.5'
            : 'bg-[#c9d2e7]/40 backdrop-blur-md border-b border-black/[0.05] py-4 md:py-5'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-14 flex items-center justify-between">
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
              if (item.isDropdown) {
                return (
                  <ServicesDropdown
                    key={item.label}
                    buttonClassName="font-neue text-[13px] font-medium"
                  />
                );
              }

              const isActive = pathname === item.href;

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
              onClick={() => openChat('Book a Strategy Call')}
              className="bg-[#181520] text-white hover:bg-black px-5 py-2.5 rounded-full font-machina text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c9d2e7]" />
              <span>Book a Strategy Call</span>
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
      </div>
    </header>

      {/* Spacing reservation for fixed header */}
      <div className="w-full h-16 md:h-20 pointer-events-none" aria-hidden="true" />

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

          <div className="flex flex-col space-y-4 my-auto overflow-y-auto pr-1">
            {NAV_ITEMS.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.label} className="flex flex-col space-y-2 py-1">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="font-machina text-2xl font-black uppercase text-[#181520] flex items-center justify-between text-left cursor-pointer bg-transparent border-none p-0"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="flex flex-col space-y-2 pl-3 border-l-2 border-black/15 my-1">
                        {item.subItems?.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-machina text-sm font-bold uppercase tracking-wider text-[#181520]/80 hover:text-black py-1 flex items-center justify-between"
                          >
                            <span>{sub.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-machina text-2xl font-black uppercase text-[#181520] hover:translate-x-2 transition-transform"
                >
                  {item.label}
                </a>
              );
            })}
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
