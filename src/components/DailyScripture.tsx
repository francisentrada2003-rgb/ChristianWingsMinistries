import React, { useState } from 'react';
import { BookOpen, RefreshCw, Copy, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SCRIPTURES = [
  {
    verse: "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    theme: "Hope & Divine Promise"
  },
  {
    verse: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?",
    reference: "Psalm 27:1",
    theme: "Courage & Protection"
  },
  {
    verse: "Cast all your anxiety on Him because He cares for you.",
    reference: "1 Peter 5:7",
    theme: "Peace & Comfort"
  },
  {
    verse: "I can do all this through Him who gives me strength.",
    reference: "Philippians 4:13",
    theme: "Spiritual Strength"
  },
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to Him, and He will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Wisdom & Faithfulness"
  },
  {
    verse: "The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    reference: "Philippians 4:7",
    theme: "Serenity & Grace"
  }
];

export const DailyScripture: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const nextVerse = () => {
    setIndex((prev) => (prev + 1) % SCRIPTURES.length);
    setCopied(false);
  };

  const handleCopy = () => {
    const current = SCRIPTURES[index];
    navigator.clipboard.writeText(`"${current.verse}" — ${current.reference}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const curr = SCRIPTURES[index];

  return (
    <section id="scripture" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060D1A] via-[#09152b] to-[#060D1A] overflow-hidden border-t border-blue-900/30">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-200 text-xs font-serif-elegant tracking-[0.25em] uppercase mb-8 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Daily Sanctuary Word</span>
        </div>

        <div className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#112448]/90 via-[#0c1a33]/90 to-[#071120]/95 border border-amber-400/35 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{curr.theme}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>

              <p className="font-serif-elegant italic text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed max-w-2xl mx-auto">
                “{curr.verse}”
              </p>

              <div className="font-sans text-sm sm:text-base font-semibold text-amber-300 tracking-widest">
                — {curr.reference}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={nextVerse}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-200 bg-[#06101f] hover:bg-slate-800 border border-slate-700 hover:border-amber-400/40 transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
              <span>Next Scripture</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-200 hover:to-amber-300 transition-all shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-950" />
                  <span>Share Verse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
