'use client';

import React from 'react';

interface OpusLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'mark' | 'full' | 'badge';
  dark?: boolean;
}

export default function OpusLogo({
  className = '',
  dark = false,
}: OpusLogoProps) {
  return (
    <span
      className={`font-machina text-[22px] md:text-[25px] font-extrabold tracking-[-0.03em] uppercase select-none transition-opacity duration-200 group-hover:opacity-75 ${
        dark ? 'text-white' : 'text-[#181520]'
      } ${className}`}
    >
      Opusgeeks
    </span>
  );
}
