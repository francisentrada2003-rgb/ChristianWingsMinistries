import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MinistriesSection } from './components/MinistriesSection';
import { GatheringsSection } from './components/GatheringsSection';
import { DailyScripture } from './components/DailyScripture';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { AmbientSound } from './components/AmbientSound';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050B14] text-[#D1DCEB] relative overflow-hidden flex flex-col justify-between">
      {/* Dynamic Star/Light Particle System */}
      <ParticleBackground />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow z-10">
        <Hero />
        <AboutSection />
        <MinistriesSection />
        <GatheringsSection />
        <DailyScripture />
        <ContactSection />
      </main>

      {/* Ambient Sound / Sanctuary Audio Toggle */}
      <AmbientSound />

      {/* Footer */}
      <Footer />
    </div>
  );
}
