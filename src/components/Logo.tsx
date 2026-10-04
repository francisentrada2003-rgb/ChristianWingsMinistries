import React, { useState } from 'react';
import emblemImg from '../assets/images/christian_wings_official_logo_1791024684884.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-7',
    md: 'w-14 h-9',
    lg: 'w-24 h-16',
    hero: 'w-full max-w-2xl h-auto'
  };

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      <div className={`relative flex items-center justify-center ${size === 'hero' ? 'max-w-2xl w-full' : ''}`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full scale-110 pointer-events-none" />
        
        {!imgError ? (
          <div className="relative rounded-lg overflow-hidden border border-amber-400/40 shadow-[0_2px_12px_rgba(0,0,0,0.5)] bg-[#071325]">
            <img
              src={emblemImg}
              alt="Christian Wings Ministries Emblem"
              onError={() => setImgError(true)}
              className={`${sizeClasses[size]} object-cover select-none`}
              loading="eager"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center p-1.5 rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/60 shadow-inner">
            <svg
              viewBox="0 0 100 70"
              className={`${size === 'hero' ? 'w-48 h-36' : 'w-10 h-7'} text-slate-200 fill-current`}
              aria-label="Christian Wings Emblem"
            >
              <path d="M50 8 L54 8 L54 22 L66 22 L66 26 L54 26 L54 58 L50 58 L50 26 L38 26 L38 22 L50 22 Z" fill="#DCE6F5" />
              <path d="M46 15 C36 10 18 12 4 28 C16 28 26 24 35 22 C24 30 14 36 2 46 C16 43 28 36 38 31 C26 42 16 52 8 62 C22 55 36 44 46 36 Z" fill="url(#wingGradientL)" opacity="0.9" />
              <path d="M54 15 C64 10 82 12 96 28 C84 28 74 24 65 22 C76 30 86 36 98 46 C84 43 72 36 62 31 C74 42 84 52 92 62 C78 55 64 44 54 36 Z" fill="url(#wingGradientR)" opacity="0.9" />
              <defs>
                <linearGradient id="wingGradientL" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#9FB7DB" />
                  <stop offset="100%" stopColor="#4A658E" />
                </linearGradient>
                <linearGradient id="wingGradientR" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#9FB7DB" />
                  <stop offset="100%" stopColor="#4A658E" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>

      {showText && size !== 'hero' && (
        <div className="flex flex-col text-left">
          <span className="font-display font-bold text-base sm:text-lg tracking-wider text-white uppercase leading-none">
            Christian Wings
          </span>
          <span className="font-serif-elegant text-[11px] tracking-[0.25em] text-amber-300 uppercase font-semibold mt-1">
            Ministries
          </span>
        </div>
      )}
    </div>
  );
};
