import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, Copy, Check, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  const contactList = [
    {
      id: 'fb',
      label: 'FB PAGE',
      value: 'https://www.facebook.com/p/Christian-Wings-Ministries-61587439564269/',
      link: 'https://www.facebook.com/p/Christian-Wings-Ministries-61587439564269/',
      actionText: 'Visit Page',
      icon: (
        <svg className="w-6 h-6 fill-current text-blue-400" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      glowColor: 'from-blue-500/20 to-indigo-500/10',
      borderColor: 'hover:border-blue-400/50',
    },
    {
      id: 'email',
      label: 'Email',
      value: 'cwministries01@gmail.com',
      link: 'mailto:cwministries01@gmail.com',
      actionText: 'Send Email',
      icon: <Mail className="w-6 h-6 text-amber-400" />,
      glowColor: 'from-amber-500/20 to-yellow-500/10',
      borderColor: 'hover:border-amber-400/50',
    },
    {
      id: 'phone',
      label: 'Contact',
      value: '(+63) 915-134-9526',
      link: 'tel:+639151349526',
      actionText: 'Call Now',
      icon: <Phone className="w-6 h-6 text-emerald-400" />,
      glowColor: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'hover:border-emerald-400/50',
    },
  ];

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060D1A] via-[#09152b] to-[#040810] border-t border-blue-900/30">
      {/* Radiant Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-serif-elegant font-semibold tracking-[0.3em] text-amber-400 uppercase">
            Connect With Us
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mt-2 tracking-tight">
            CONTACT
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light">
            We would love to connect with you. Reach out through any of our official communication channels below.
          </p>
        </div>

        {/* 3 Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {contactList.map((item, idx) => {
            const isCopied = copiedKey === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-3xl p-7 bg-gradient-to-b from-[#112448]/90 via-[#0a162b]/95 to-[#060e1c]/98 border border-slate-700/80 ${item.borderColor} backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] flex flex-col justify-between group`}
              >
                <div>
                  {/* Top Icon and Label */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-[#06101f] border border-slate-700/80 group-hover:border-amber-400/40 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>

                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300/80 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-400/20">
                      {item.label}
                    </span>
                  </div>

                  {/* Label Title */}
                  <h3 className="font-serif-elegant font-bold text-xs uppercase tracking-widest text-slate-400 mb-1.5">
                    {item.label}
                  </h3>

                  {/* Main Value */}
                  <p className="font-display font-semibold text-lg sm:text-xl text-white group-hover:text-amber-200 transition-colors break-words mb-6">
                    {item.value}
                  </p>
                </div>

                {/* Bottom Interactive Actions: Copy & Direct Action */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                  <a
                    href={item.link}
                    target={item.id === 'fb' ? '_blank' : '_self'}
                    rel={item.id === 'fb' ? 'noopener noreferrer' : ''}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-slate-200 bg-[#06101f] hover:bg-amber-400/20 hover:text-amber-200 border border-slate-700 hover:border-amber-400/40 transition-all duration-200 shadow-sm"
                  >
                    <span>{item.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.value, item.id)}
                    title={`Copy ${item.label}`}
                    className={`p-2.5 rounded-xl border transition-all duration-200 ${
                      isCopied
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-[#06101f] hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-3xl p-8 bg-gradient-to-r from-[#112448]/80 via-[#0a162b]/90 to-[#112448]/80 border border-amber-400/30 text-center relative overflow-hidden backdrop-blur-xl shadow-xl"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
              Christian Wings Ministries
            </h3>
            <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
              Committed to sharing God's love, serving others, and bringing hope to individuals, families, and communities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-amber-300/90 font-medium">
              <span>📍 Idaho, USA</span>
              <span>•</span>
              <span>✉️ cwministries01@gmail.com</span>
              <span>•</span>
              <span>📞 (+63) 915-134-9526</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
