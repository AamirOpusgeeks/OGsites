"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const brandName = "OPUSGEEKS";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const letters = textContainerRef.current?.querySelectorAll(".splash-letter");

      const tl = gsap.timeline({
        onComplete: () => {
          const exitTl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = "";
              onComplete();
              ScrollTrigger.refresh();
            },
          });

          exitTl
            .to(letters || [], {
              y: -40,
              opacity: 0,
              stagger: 0.03,
              duration: 0.45,
              ease: "power3.in",
            })
            .to(
              overlayRef.current,
              {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                duration: 0.7,
                ease: "power4.inOut",
              },
              "-=0.2"
            );
        },
      });

      // Majestic Letter-by-Letter Slide Up Reveal
      tl.fromTo(
        letters || [],
        {
          y: 60,
          opacity: 0,
          clipPath: "inset(100% 0 0 0)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.75,
          stagger: 0.05,
          ease: "power3.out",
        }
      )
      // Elegant Breath Pause
      .to({}, { duration: 0.7 });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center select-none bg-[#dee7f1]"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      {/* Pure & Clear Monumental Typography */}
      <div
        ref={textContainerRef}
        className="flex items-center overflow-hidden font-machina text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.04em] uppercase text-[#181520]"
      >
        {brandName.split("").map((char, index) => (
          <span
            key={index}
            className="splash-letter inline-block will-change-transform"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
