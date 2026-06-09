import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code, Cpu, ShieldAlert, BadgeCheck } from 'lucide-react';
import { ThemeType } from '../types';

interface PreloaderProps {
  onComplete: () => void;
  theme: ThemeType;
  key?: string;
}

const codeSnippets = [
  'public class GarimaMishra {',
  '  public static void main(String[] args) {',
  '    System.out.println("Hello World!");',
  '    Developer garima = new Developer();',
  '    garima.setSkills("Java", "UI/UX", "React");',
  '  }',
  '}',
  'const Portfolio = () => {',
  '  const [skills] = useState(["FullStack", "Design"]);',
  '  return <PortfolioCanvas features={skills} />',
  '}',
  '// IBM Prarambh Hackathon Winner 2025 //',
  '// CT Solution Hackathon Champion //'
];

export default function Preloader({ onComplete, theme }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [sequenceStep, setSequenceStep] = useState(0); // 0: Start, 1: Logo, 2: Code, 3: Ring & Bar

  // Colors based on theme
  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Magenta vs Neon Purple
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender vs Neo Mint
  const bgPrimary = isRose ? '#120E16' : '#0A0A12';

  // Smooth progress calculation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Code snippets cycling
  useEffect(() => {
    const codeInterval = setInterval(() => {
      setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 200);
    return () => clearInterval(codeInterval);
  }, []);

  // Sequence progression
  useEffect(() => {
    // 1. Dark screen immediately loaded
    // 2. Floating particles appear immediately
    // 3. Garima Mishra logo appears at 1.0s
    const timer1 = setTimeout(() => setSequenceStep(1), 300);
    // 4. Code snippets start appearing at 2.2s
    const timer2 = setTimeout(() => setSequenceStep(2), 1000);
    // 5. Neon circular ring + progress bar at 2.0s
    const timer3 = setTimeout(() => setSequenceStep(3), 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Generate 25 particles in background
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 4 + 4,
  }));

  return (
    <div
      id="preloader-container"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: bgPrimary }}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `linear-gradient(135deg, ${accent1}, ${accent2})`,
            }}
            animate={{
              y: ['0px', '-40px', '0px'],
              x: ['0px', '20px', '0px'],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6 text-center">
        {/* Step 1 & beyond: Garima Mishra Logo Reveal */}
        <AnimatePresence>
          {sequenceStep >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 border"
                style={{
                  borderColor: `${accent1}40`,
                  background: 'rgba(255, 255, 255, 0.02)',
                  boxShadow: `0 0 20px ${accent1}20`
                }}
              >
                <span
                  className="text-2xl font-bold font-display"
                  style={{
                    background: `linear-gradient(135deg, ${accent1}, ${accent2})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  GM
                </span>
              </div>
              <h1 className="text-3xl font-bold font-display tracking-wider text-slate-100">
                GARIMA MISHRA
              </h1>
              <p
                className="text-xs font-mono tracking-widest mt-1 uppercase"
                style={{ color: accent2 }}
              >
                Frontend Developer & Designer
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2 & beyond: Animated Code Snippet */}
        <div className="h-24 flex items-center justify-center w-full mb-8 font-mono text-xs select-none relative">
          <AnimatePresence mode="wait">
            {sequenceStep >= 2 && (
              <motion.div
                key={currentCodeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.7, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.15 }}
                className="text-slate-400 max-w-xs text-left p-3 rounded-lg border border-white/5 bg-white/[0.01]"
              >
                <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-slate-500 border-b border-white/5 pb-1 select-none">
                  <Terminal size={10} style={{ color: accent2 }} />
                  <span>terminal_core.log</span>
                </div>
                <div className="truncate whitespace-nowrap overflow-hidden pr-2">
                  {codeSnippets[currentCodeIndex]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step 3: Rotating Ring & Tagline & Progress Bar */}
        <AnimatePresence>
          {sequenceStep >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              {/* Rotating Ring */}
              <div className="relative w-14 h-14 mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full border border-dashed"
                  style={{ borderColor: `${accent2}50` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full border-2 border-t-transparent border-b-transparent"
                  style={{ borderColor: accent1 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu size={18} style={{ color: accent2 }} className="animate-pulse" />
                </div>
              </div>

              {/* Tagline */}
              <p className="text-sm font-medium tracking-wide text-slate-200 mb-6 flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: accent2 }}
                />
                Building Digital Experiences...
              </p>

              {/* Progress Slider Bar */}
              <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(to right, ${accent1}, ${accent2})`,
                    boxShadow: `0 0 10px ${accent2}80`,
                  }}
                />
              </div>

              {/* Percentage Indicator */}
              <p
                className="text-[10px] font-mono mt-2 tracking-widest"
                style={{ color: accent2 }}
              >
                {progress}% INITIALIZING
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
