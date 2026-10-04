import React, { useState } from 'react';
import { Quote, Heart, Users, Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<'NIV' | 'KJV' | 'ESV' | 'TL'>('NIV');

  const verses = {
    NIV: {
      text: "“...Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.”",
      reference: "Mark 11:24 (NIV)"
    },
    ESV: {
      text: "“Therefore I tell you, whatever you ask in prayer, believe that you have received it, and it will be yours.”",
      reference: "Mark 11:24 (ESV)"
    },
    KJV: {
      text: "“Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.”",
      reference: "Mark 11:24 (KJV)"
    },
    TL: {
      text: "“Kaya nga sinasabi ko sa inyo, Ang lahat ng mga bagay na inyong idinadalangin at hinihingi, ay magsisampalataya kayo na inyong tinanggap na, at inyong kakamtin.”",
      reference: "Marcos 11:24 (Ang Biblia)"
    }
  };

  const pillars = [
    {
      icon: <Users className="w-5 h-5 text-amber-300" />,
      title: "Encourage Community",
      desc: "Through prayer and practical outreach, we build meaningful relationship that uplift lives and strengthen the bonds within our neighborhoods"
    },
    {
      icon: <Heart className="w-5 h-5 text-amber-300" />,
      title: "Serve Families",
      desc: "We provide essential supplies and practical assistance to families facing difficult circumstances, ensuring they have the resources to thrive"
    },
    {
      icon: <Shield className="w-5 h-5 text-amber-300" />,
      title: "Share Hope",
      desc: "We inspire others to serve and give, creating a ripple effect of compassion that brings lasting hope and purpose to every community member."
    }
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 border-t border-blue-900/30">
      {/* Background radial highlights */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-serif-elegant font-semibold tracking-[0.3em] text-amber-400 uppercase">
            Our Purpose &amp; Calling
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mt-2 tracking-tight">
            OUR MISSION
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </div>

        {/* 2-Column Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Mission & Identity */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-slate-100 leading-relaxed text-lg sm:text-xl font-light">
              Christian Wings Ministries is a Christ-centered organization committed to sharing God’s love, serving others, and bringing hope to the community.
            </p>
            
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-light">
              Through prayer, compassion, generosity, and practical acts of service, we seek to uplift individuals and families, encourage communities, and reflect the love of Christ through action.
            </p>

            {/* Core Values / Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {pillars.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-gradient-to-b from-[#0f2347]/60 to-[#071326]/80 border border-slate-700/60 hover:border-amber-400/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                >
                  <div className="p-2.5 w-fit rounded-xl bg-amber-400/10 border border-amber-400/30 mb-3">
                    {item.icon}
                  </div>
                  <h4 className="font-serif-elegant font-bold text-base text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Scripture Card with Translation Switcher */}
          <div className="lg:col-span-6">
            <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12284d]/80 via-[#0a172c]/90 to-[#050b16]/95 border border-amber-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-4 left-4 text-amber-400/50 font-serif text-lg">✦</div>
              <div className="absolute top-4 right-4 text-amber-400/50 font-serif text-lg">✦</div>
              <div className="absolute bottom-4 left-4 text-amber-400/50 font-serif text-lg">✦</div>
              <div className="absolute bottom-4 right-4 text-amber-400/50 font-serif text-lg">✦</div>

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Quote className="w-5 h-5 text-amber-400" />
                  <span className="font-serif-elegant uppercase tracking-widest text-xs font-bold text-amber-300">
                    Sacred Scripture
                  </span>
                </div>

                {/* Translation Selector */}
                <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-700/80">
                  {(['NIV', 'ESV', 'KJV', 'TL'] as const).map((ver) => (
                    <button
                      key={ver}
                      onClick={() => setSelectedVersion(ver)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        selectedVersion === ver
                          ? 'bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-950 shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {ver}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verse Display */}
              <blockquote className="min-h-[150px] flex flex-col justify-center">
                <p className="font-serif-elegant italic text-2xl sm:text-3xl text-white leading-relaxed">
                  {verses[selectedVersion].text}
                </p>
                <footer className="mt-5 text-right">
                  <cite className="font-sans text-sm tracking-widest text-amber-300 font-semibold not-italic">
                    — {verses[selectedVersion].reference}
                  </cite>
                </footer>
              </blockquote>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Renewing strength in the Lord</span>
                <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Eternal Promise
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
