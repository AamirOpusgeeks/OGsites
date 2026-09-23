'use client';

import React from 'react';

interface OpusLogoProps {
  className?: string;
  size?: number;
  variant?: 'mark' | 'full' | 'badge';
  dark?: boolean;
  showIcon?: boolean;
  showText?: boolean;
}

export default function OpusLogo({
  className = '',
  size = 28,
  variant = 'full',
  dark = false,
  showIcon = true,
  showText = true,
}: OpusLogoProps) {
  const isOnlyMark = variant === 'mark';
  const shouldShowIcon = showIcon;
  const shouldShowText = !isOnlyMark && showText;

  // Aspect ratio of the official emblem is 57 / 69 ≈ 0.826
  const iconHeight = size;
  const iconWidth = Math.round(iconHeight * (57 / 69));

  return (
    <span className="inline-flex items-center gap-2.5 select-none transition-opacity duration-200 group-hover:opacity-85">
      {shouldShowIcon && (
        <img
          src="/logos/opusgeeks-mark.png"
          srcSet="/logos/opusgeeks-mark@2x.png 2x, /logos/opusgeeks-mark@4x.png 4x"
          alt="Opusgeeks Logo"
          width={iconWidth}
          height={iconHeight}
          className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          style={{ height: `${iconHeight}px`, width: 'auto' }}
        />
      )}
      {shouldShowText && (
        <span
          className={`font-machina text-[22px] md:text-[25px] font-extrabold tracking-[-0.03em] uppercase leading-none ${
            dark ? 'text-white' : 'text-[#181520]'
          } ${className}`}
        >
          Opusgeeks
        </span>
      )}
    </span>
  );
}
