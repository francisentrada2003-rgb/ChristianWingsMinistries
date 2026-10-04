import React from 'react';
import { HeartHandshake, Users, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface MinistryItem {
  id: string;
  title: string;
  shortDesc: string;
  scripture: string;
  icon: React.ReactNode;
  accent: string;
}

export const MinistriesSection: React.FC = () => {
  const ministries: MinistryItem[] = [
    {
      id: 'community-outreach',
      title: 'COMMUNITY OUTREACH',
      shortDesc: 'We reach communities through kindness, generosity, and practical acts of service, bringing hope to those in need.',
      scripture: 'Matthew 25:40 — "Whatever you did for one of the least of these brothers and sisters of mine, you did for me."',
      icon: <HeartHandshake className="w-6 h-6 text-amber-300" />,
      accent: 'from-amber-400/20 via-yellow-500/10 to-transparent',
    },
    {
      id: 'helping-families',
      title: 'HELPING FAMILIES IN NEED',
      shortDesc: 'We provide practical support and assistance to individuals and families facing difficult circumstances.',
      scripture: 'Galatians 6:2 — "Carry each other’s burdens, and in this way you will fulfill the law of Christ."',
      icon: <Users className="w-6 h-6 text-blue-300" />,
      accent: 'from-blue-500/20 via-indigo-600/10 to-transparent',
    },
    {
      id: 'giving-generosity',
      title: 'GIVING & GENEROSITY',
      shortDesc: 'We use the generosity of our supporters to help meet needs and extend kindness to others.',
      scripture: '2 Corinthians 9:7 — "Each of you should give what you have decided in your heart to give, for God loves a cheerful giver."',
      icon: <Sparkles className="w-6 h-6 text-cyan-300" />,
      accent: 'from-cyan-500/20 via-blue-600/10 to-transparent',
    },
    {
      id: 'serving-others',
      title: 'SERVING OTHERS',
      shortDesc: 'We believe small acts of kindness can make a meaningful difference in someone’s life.',
      scripture: '1 Peter 4:10 — "Each of you should use whatever gift you have received to serve others, as faithful stewards."',
      icon: <Heart className="w-6 h-6 text-emerald-300" />,
      accent: 'from-emerald-500/20 via-teal-600/10 to-transparent',
    },
  ];

  return (
    <section id="ministries" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060D1A] via-[#08152c] to-[#060D1A] border-t border-blue-900/30">
      {/* Background accents */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-amber-400/10 blur-[130px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-serif-elegant font-semibold tracking-[0.3em] text-amber-400 uppercase">
            Service &amp; Vocation
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mt-2 tracking-tight">
            WHAT WE DO
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light">
            Serving with faith, compassion, generosity, and action
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ministries.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-2xl p-7 bg-gradient-to-b from-[#112448]/80 to-[#09152b]/95 border border-slate-700/80 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:-translate-y-2"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.accent} border border-amber-400/30 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    {item.icon}
                  </div>
                </div>
                
                <h3 className="font-display text-lg font-bold text-white mb-2.5 group-hover:text-amber-200 transition-colors uppercase tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed font-light mb-4">
                  {item.shortDesc}
                </p>
              </div>

              <div>
                <p className="text-xs italic font-serif-elegant text-amber-300/80 border-t border-white/10 pt-4">
                  {item.scripture}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
