import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Award, Code2, Users, Cpu, ExternalLink, GraduationCap, Calendar, Network, Zap } from 'lucide-react';
import { ThemeType } from '../types';

interface AboutSectionProps {
  theme: ThemeType;
  onNavigate: (sectionId: string) => void;
}

export default function AboutSection({ theme, onNavigate }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Background parallax scrolling effect helper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);

  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Magenta or Violet
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender or Mint

  const titleWords = "Hi, I'm Garima Mishra 👋".split(" ");
  const bioText = "Winner of IBM Prarambh Hackathon 2025 and CT Solution Hackathon, with experience designing and developing real-world products for startups.";

  // Quick Stats cards
  const stats = [
    { value: 'Java', label: 'DSA & OOP Paradigms', icon: Code2, color: accent2 },
    { value: '2', label: 'Hackathons Won (1st Place)', icon: Award, color: '#FCD34D' },
    { value: '4', label: 'Key Resumé Projects', icon: Cpu, color: accent1 },
    { value: '1', label: 'Startup Collab / Internship', icon: Users, color: '#38BDF8' },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isRose ? '#120E16' : '#0A0A12',
      }}
    >
      {/* Background Image/Parallax Panel with Dark Overlay */}
      <motion.div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          y: backgroundY,
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.04) 0%, transparent 80%)',
        }}
      />

      {/* Floating vector particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-24 left-[10%] w-2 h-2 rounded-full"
          style={{ backgroundColor: `${accent1}50` }}
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-24 right-[15%] w-3 h-3 rounded-full blur-[2px]"
          style={{ backgroundColor: `${accent2}50` }}
        />
        {/* Animated Light Streak lines */}
        <motion.div
          className="absolute left-0 top-[40%] h-[1px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent1}25, ${accent2}25, transparent)`,
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          
          {/* Bio Information (Full width, elegant styling) */}
          <div className="flex flex-col justify-center">
            
            {/* Subsection header */}
            <div className="flex items-center gap-2 mb-4 self-center lg:self-start">
              <span className="w-8 h-[1px]" style={{ backgroundColor: accent1 }} />
              <span className="text-xs font-mono tracking-widest uppercase font-medium" style={{ color: accent1 }}>
                DEVELOPER OVERVIEW
              </span>
            </div>

            {/* Title Line Word Reveal */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight mb-8 text-center lg:text-left flex flex-wrap gap-x-3 gap-y-2 justify-center lg:justify-start">
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={word.includes('Garima') ? 'text-transparent bg-clip-text' : ''}
                  style={word.includes('Garima') ? {
                    backgroundImage: `linear-gradient(to right, ${accent1}, ${accent2})`,
                  } : {}}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Flowing Bio Block */}
            <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed text-center lg:text-left font-sans">
              
              {/* Highlight Phrase */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg font-light tracking-wide text-slate-200 border-l border-white/5 lg:pl-4"
              >
                Java Developer, Frontend Engineer &amp; UI/UX Designer
              </motion.p>

              {/* Exact bio text mandated by layout prompt */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                Building innovative digital experiences through code, creativity, and problem-solving.
                Winner of IBM Prarambh Hackathon 2025 and CT Solution Hackathon, with experience designing and developing real-world products for startups.
              </motion.p>

              {/* Mission/Philosophy Accent */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-slate-400 text-xs sm:text-sm"
              >
                I thrive on translating complex industrial challenges into high-efficiency web architectures. By combining scalable backend paradigms (Java) with delightful frontend capabilities, I construct polished, future-ready systems for users globally.
              </motion.p>
            </div>

            {/* High-fidelity Stats Grid - Elegant Underneath */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full">
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`p-5 rounded-2xl border border-white/5 transition-all hover:bg-white/[0.03] group flex flex-col justify-between h-32 ${isRose ? 'glass-rose' : 'glass'}`}
                    style={{
                      borderTopColor: 'rgba(255, 255, 255, 0.08)',
                      borderRightColor: 'rgba(255, 255, 255, 0.04)',
                      borderBottomColor: 'rgba(255, 255, 255, 0.04)',
                      borderLeftColor: idx % 2 === 0 ? accent1 : accent2,
                      borderLeftWidth: '3px',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <StatIcon size={18} style={{ color: stat.color }} />
                      <span className="text-[10px] text-slate-500 font-mono">0{idx+1}</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold font-display text-white tracking-tight">{stat.value}</p>
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick action button for scrolling */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex justify-center lg:justify-start"
            >
              <button
                onClick={() => onNavigate('skills')}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase font-mono cursor-pointer"
                style={{ color: accent2 }}
              >
                Check Skillset
                <ExternalLink
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
