import React from 'react';
import { Logo } from './Logo';
import { Heart, MapPin, Mail, Phone, ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040810] border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Decorative top border glow */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light mt-3">
              Christian Wings Ministries is dedicated to preaching the Gospel of Jesus Christ, building a loving community of disciples, and spreading compassion worldwide.
            </p>
            <div className="font-serif-elegant italic text-amber-300/80 text-sm">
              "They will soar on wings like eagles; they will run and not grow weary." — Isaiah 40:31
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-elegant font-bold uppercase tracking-widest text-white text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">Our Mission</a>
              </li>
              <li>
                <a href="#ministries" className="hover:text-amber-300 transition-colors">What We Do</a>
              </li>
              <li>
                <a href="#visit" className="hover:text-amber-300 transition-colors">Outreach Gallery</a>
              </li>
              <li>
                <a href="#scripture" className="hover:text-amber-300 transition-colors">Daily Scripture</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact & Fellowship info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-elegant font-bold uppercase tracking-widest text-white text-xs">
              Contact Information
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold text-xs mt-0.5">FB:</span>
                <a href="https://www.facebook.com/p/Christian-Wings-Ministries-61587439564269/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-300 transition-colors">
                  Christian Wings Ministries
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">cwministries01@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">(+63) 915-134-9526</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Christian Wings Ministries. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors text-slate-400 p-2"
          >
            <span>Back to top</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
