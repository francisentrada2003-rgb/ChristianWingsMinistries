import React, { useState } from 'react';
import { ChevronDown, Calendar, Send } from 'lucide-react';
import { motion } from 'motion/react';
import emblemImg from '../assets/images/christian_wings_official_logo_1791024684884.jpg';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Luminous Halos */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[600px] bg-radial from-blue-600/30 via-indigo-900/20 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-amber-400/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Sacred Heritage Crest Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900/70 border border-amber-400/35 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(212,175,55,0.2)]"
        >
          <span className="text-amber-400 font-serif text-sm">✦</span>
          <span className="font-serif-elegant tracking-[0.3em] uppercase text-xs sm:text-sm text-amber-200 font-medium">
            FAITH · UNITY · GRACE
          </span>
          <span className="text-amber-400 font-serif text-sm">✦</span>
        </motion.div>

        {/* 3D Floating Photorealistic Logo Emblem with Radiant Luxury Frame */}
        <motion.div
          className="relative my-4 cursor-pointer group"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 14}deg) rotateX(${-mousePos.y * 14}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Multi-layered Sacred Aura and Radiant Backlight */}
          <div className="relative p-3">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-amber-300/35 to-blue-500/30 blur-3xl rounded-full scale-125 opacity-90 animate-pulse-slow pointer-events-none" />
            
            {/* The Realistic Emblem Image Container */}
            <div className="relative rounded-3xl overflow-hidden border border-amber-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(147,197,253,0.25)] bg-[#071325]/80 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/10 via-transparent to-blue-400/20 pointer-events-none z-10" />
              
              <img
                src={emblemImg}
                alt="Christian Wings Ministries Glorious Emblem"
                className="w-80 sm:w-[480px] md:w-[580px] h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              
              {/* Subtle bottom gradient blending */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060D1A] to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </motion.div>

        {/* Grand Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mt-4 mb-10 leading-[1.1] drop-shadow-[0_5px_20px_rgba(0,0,0,0.8)]"
        >
          SERVING WITH LOVE <br />
          <span className="gold-gradient-text italic font-serif-elegant font-normal tracking-wide text-2xl sm:text-4xl md:text-5xl block mt-3">
            Sharing Hope. Reflecting Christ
          </span>
        </motion.h1>

        {/* Action Buttons with high-end luxury styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          <a
            href="#visit"
            className="shine-effect w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-serif-elegant text-base font-bold tracking-widest uppercase text-slate-950 bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400 hover:from-white hover:to-amber-200 shadow-[0_4px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_40px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Calendar className="w-5 h-5 text-slate-950" />
            <span>Outreach Gallery</span>
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-serif-elegant text-base font-semibold tracking-widest uppercase text-slate-100 bg-[#0c1b35]/70 hover:bg-[#12284d]/90 border border-amber-400/40 hover:border-amber-300 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>CONTACT</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-12 animate-bounce">
          <a href="#about" aria-label="Scroll down to About section" className="text-slate-400 hover:text-amber-300 transition-colors">
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};
