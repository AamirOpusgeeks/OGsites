"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 1. Configure single global Lenis smooth inertia scrolling
    const lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoRaf: false, // We drive RAF with GSAP's ticker
    });

    setLenis(lenisInstance);
    // Expose on window for easy access if needed
    (window as unknown as { lenis?: Lenis }).lenis = lenisInstance;

    // 2. Hook Lenis scroll events into GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // 3. Synchronize GSAP ticker and disable lag smoothing for lockstep animation
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Trigger initial ScrollTrigger refresh once DOM is painted
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenisInstance.destroy();
      setLenis(null);
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  // Handle route changes: scroll to top and refresh ScrollTrigger
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}

