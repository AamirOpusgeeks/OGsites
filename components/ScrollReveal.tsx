"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  stagger?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 35,
  duration = 0.85,
}: ScrollRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    if (direction === "up") y = distance;
    if (direction === "down") y = -distance;
    if (direction === "left") x = distance;
    if (direction === "right") x = -distance;

    gsap.set(el, {
      opacity: 0,
      x,
      y,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          clearProps: "transform",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, direction, distance, duration]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Hook to automatically animate all child elements with .reveal-stagger or .reveal-item
 */
export function useScrollReveal(scopeRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Single reveal items
      const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // 2. Staggered groups
      const groups = gsap.utils.toArray<HTMLElement>(".reveal-group");
      groups.forEach((group) => {
        const children = group.children;
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, y: 35, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef]);
}
