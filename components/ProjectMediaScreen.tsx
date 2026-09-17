'use client';

import React, { useState } from 'react';

interface ProjectMediaScreenProps {
  id: string;
  title: string;
  image: string;
  videoUrl?: string;
  isFeatured?: boolean;
}

export default function ProjectMediaScreen({
  title,
  image,
}: ProjectMediaScreenProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full overflow-hidden bg-[#0c0d14] select-none group/screen"
    >
      {/* 1. High-Resolution Editorial Showcase Image */}
      <img
        src={image}
        alt={title}
        className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-transform ${
          isHovered ? 'scale-105 contrast-[1.08] brightness-100' : 'scale-100 contrast-100 brightness-95'
        }`}
      />

      {/* 2. Natural Subtle Vignette for Contrast & Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

      {/* 3. Sleek Subtle Frame Inset Border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-black/10 group-hover/screen:border-white/20 transition-colors duration-500 shadow-inner" />
    </div>
  );
}
