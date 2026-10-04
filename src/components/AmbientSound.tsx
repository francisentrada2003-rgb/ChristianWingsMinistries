import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AmbientSound: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<number | null>(null);

  const chords = [
    [130.81, 196.00, 261.63, 329.63, 392.00], // C major 7/9
    [146.83, 220.00, 261.63, 329.63, 440.00], // D minor 9
    [174.61, 220.00, 261.63, 349.23, 392.00], // F add9
    [196.00, 246.94, 293.66, 392.00, 493.88], // G sus4 / G
  ];

  const playChord = (frequencies: number[], ctx: AudioContext, masterGain: GainNode) => {
    // stop old oscillators
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    oscillatorsRef.current = [];

    frequencies.forEach(freq => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // soft attack and subtle vibrato
      noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2.5);
      noteGain.gain.exponentialRampToValueAtTime(0.015, ctx.currentTime + 6.0);

      osc.connect(noteGain);
      noteGain.connect(masterGain);
      osc.start();
      oscillatorsRef.current.push(osc);
    });
  };

  const toggleSound = () => {
    if (!isPlaying) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.5, ctx.currentTime);
      master.connect(ctx.destination);
      gainNodeRef.current = master;

      let chordIndex = 0;
      playChord(chords[chordIndex], ctx, master);

      intervalRef.current = window.setInterval(() => {
        chordIndex = (chordIndex + 1) % chords.length;
        playChord(chords[chordIndex], ctx, master);
      }, 7000);

      setIsPlaying(true);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      oscillatorsRef.current = [];
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute Sanctuary Ambience" : "Play Sanctuary Ambient Hymn"}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 shadow-xl backdrop-blur-md ${
        isPlaying
          ? 'bg-amber-500/20 border-amber-400/60 text-amber-200 shadow-[0_0_20px_rgba(212,175,55,0.35)]'
          : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-500'
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="text-xs font-serif tracking-widest uppercase text-amber-200">
            Ambience: On
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="text-xs font-serif tracking-widest uppercase">
            Ambience
          </span>
        </>
      )}
    </button>
  );
};
