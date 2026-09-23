'use client';

import React from 'react';

const TRUST_ITEMS = [
  'Figma Partner',
  'Awwwards SOTD',
  'Google Cloud Partner',
  'Shopify Plus',
  'Vercel Partner',
  'ISO 27001',
  'WCAG 2.2 AAA',
  'Apple Developer',
  'AWS Select Partner',
  'FWA Nominee',
  'Stripe Verified',
  'Meta Business Partner',
];

export default function TrustMarqueeStrip() {
  return (
    <section className="reveal-item">
      <div className="text-center mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#181520]/45">
          Trusted By Industry Leaders • Certified & Partnered
        </span>
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden rounded-2xl bg-[#181520] border border-white/10 py-5">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#181520] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#181520] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track — duplicated for seamless loop */}
        <div className="flex animate-marquee">
          {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center shrink-0 mx-4 sm:mx-6"
            >
              <span className="w-2 h-2 rounded-full bg-white/20 mr-3" />
              <span className="font-machina text-xs sm:text-sm uppercase tracking-widest text-white/70 whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
