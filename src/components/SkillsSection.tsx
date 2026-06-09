import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2, Terminal, Database, GitBranch, Github, Cpu, Layout, FileSpreadsheet,
  Layers, Flame, Slack, Settings, Box, DatabaseZap, Sparkles, BookOpen, Presentation
} from 'lucide-react';
import { ThemeType } from '../types';

interface SkillsSectionProps {
  theme: ThemeType;
}

interface SkillData {
  name: string;
  icon: any;
  color: string;
  glowColor: string;
}

// Group 1: Languages & Databases
const ROW_1_SKILLS: SkillData[] = [
  { name: 'Java', icon: Code2, color: '#E76F51', glowColor: 'rgba(231, 111, 81, 0.4)' },
  { name: 'JavaScript', icon: Terminal, color: '#F7DF1E', glowColor: 'rgba(247, 223, 30, 0.4)' },
  { name: 'Python', icon: Code2, color: '#3776AB', glowColor: 'rgba(55, 118, 171, 0.4)' },
  { name: 'C Language', icon: Code2, color: '#00599C', glowColor: 'rgba(0, 89, 156, 0.4)' },
  { name: 'MySQL', icon: Database, color: '#4479A1', glowColor: 'rgba(68, 121, 161, 0.4)' },
  { name: 'SQL', icon: Database, color: '#00758F', glowColor: 'rgba(0, 117, 143, 0.4)' },
];

// Group 2: Frontend
const ROW_2_SKILLS: SkillData[] = [
  { name: 'React.js', icon: Cpu, color: '#61DAFB', glowColor: 'rgba(97, 218, 251, 0.4)' },
  { name: 'Tailwind CSS', icon: Layers, color: '#38BDF8', glowColor: 'rgba(56, 189, 248, 0.4)' },
  { name: 'GSAP Animation', icon: Flame, color: '#88CE02', glowColor: 'rgba(136, 206, 2, 0.4)' },
  { name: 'Motion React', icon: Flame, color: '#EF4444', glowColor: 'rgba(239, 68, 68, 0.4)' },
  { name: 'HTML5', icon: Layout, color: '#E34F26', glowColor: 'rgba(227, 79, 38, 0.4)' },
  { name: 'CSS3', icon: Layout, color: '#1572B6', glowColor: 'rgba(21, 114, 182, 0.4)' },
];

// Group 3: Tools & Libraries
const ROW_3_SKILLS: SkillData[] = [
  { name: 'Figma', icon: Box, color: '#F24E1E', glowColor: 'rgba(242, 78, 30, 0.4)' },
  { name: 'Canva', icon: Sparkles, color: '#00C4CC', glowColor: 'rgba(0, 196, 204, 0.4)' },
  { name: 'OpenAI API', icon: Sparkles, color: '#10A37F', glowColor: 'rgba(16, 163, 127, 0.4)' },
  { name: 'Git', icon: GitBranch, color: '#F05032', glowColor: 'rgba(240, 80, 50, 0.4)' },
  { name: 'GitHub', icon: Github, color: '#FFFFFF', glowColor: 'rgba(255, 255, 255, 0.3)' },
  { name: 'Notion', icon: BookOpen, color: '#EAEAEA', glowColor: 'rgba(234, 234, 234, 0.3)' },
  { name: 'Slack', icon: Slack, color: '#4A154B', glowColor: 'rgba(74, 21, 75, 0.4)' },
  { name: 'NumPy', icon: Settings, color: '#013243', glowColor: 'rgba(1, 50, 67, 0.4)' },
  { name: 'Jupyter', icon: Settings, color: '#F37626', glowColor: 'rgba(243, 118, 38, 0.4)' },
  { name: 'Google Colab', icon: Settings, color: '#F9AB00', glowColor: 'rgba(249, 171, 0, 0.4)' },
  { name: 'PowerPoint', icon: Presentation, color: '#D24726', glowColor: 'rgba(210, 71, 38, 0.4)' },
  { name: 'Excel Specialist', icon: FileSpreadsheet, color: '#217346', glowColor: 'rgba(33, 115, 70, 0.4)' },
];

export default function SkillsSection({ theme }: SkillsSectionProps) {
  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Magenta vs Purple
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender vs Mint

  // Seamless looping duplicate maps
  const doubleRow1 = [...ROW_1_SKILLS, ...ROW_1_SKILLS, ...ROW_1_SKILLS];
  const doubleRow2 = [...ROW_2_SKILLS, ...ROW_2_SKILLS, ...ROW_2_SKILLS];
  const doubleRow3 = [...ROW_3_SKILLS, ...ROW_3_SKILLS, ...ROW_3_SKILLS];

  return (
    <section
      id="skills"
      className="relative py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isRose ? '#120E16' : '#0A0A12',
      }}
    >
      {/* Self-contained styling block for highly optimized marquee loop behavior */}
      <style>{`
        @keyframes marquee-l2r {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes marquee-r2l {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .anim-marquee-left-to-right {
          animation: marquee-l2r 25s linear infinite;
        }
        .anim-marquee-right-to-left {
          animation: marquee-r2l 25s linear infinite;
        }
        .marquee-wrapper:hover .anim-marquee-left-to-right,
        .marquee-wrapper:hover .anim-marquee-right-to-left {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative gradients */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80 rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ backgroundColor: accent1 }}
      />
      <div
        className="absolute bottom-4 right-0 w-80 h-80 rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ backgroundColor: accent2 }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full mr-1 blink" style={{ backgroundColor: accent2 }} />
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
              Tech Stack &amp; Tooling
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-none">
            Technical{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent1}, ${accent2})`,
              }}
            >
              Expertise
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-md">
            Continuous moving rows detailing core proficiencies. Hover over any pill to pause movement and inspect certifications.
          </p>
        </div>

        {/* Marquee Rows Container wrapper */}
        <div className="marquee-wrapper space-y-6 md:space-y-8 select-none py-4 overflow-hidden relative">
          
          {/* Mask left and right of screen with fade gradients */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0A0A12]/90 to-transparent z-20 pointer-events-none" style={{ from: isRose ? '#120E16' : '#0A0A12' }} />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#0A0A12]/90 to-transparent z-20 pointer-events-none" style={{ from: isRose ? '#120E16' : '#0A0A12' }} />

          {/* ROW 1: Move Left -> Right (Languages & Databases) */}
          <div className="flex w-full overflow-hidden relative py-2">
            <div className="flex gap-4 md:gap-6 whitespace-nowrap anim-marquee-left-to-right">
              {doubleRow1.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={`${skill.name}-${index}`}
                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 hover:scale-105 hover:border-white/10 cursor-pointer h-14 ${isRose ? 'glass-rose' : 'glass'}`}
                    style={{
                      '--glow-color': skill.glowColor,
                    } as any}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${skill.glowColor}`;
                      e.currentTarget.style.borderColor = skill.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <IconComponent size={18} style={{ color: skill.color }} />
                    <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROW 2: Move Right -> Left (Frontend / UI Engines) */}
          <div className="flex w-full overflow-hidden relative py-2">
            <div className="flex gap-4 md:gap-6 whitespace-nowrap anim-marquee-right-to-left">
              {doubleRow2.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={`${skill.name}-${index}`}
                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 hover:scale-105 hover:border-white/10 cursor-pointer h-14 ${isRose ? 'glass-rose' : 'glass'}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${skill.glowColor}`;
                      e.currentTarget.style.borderColor = skill.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <IconComponent size={18} style={{ color: skill.color }} />
                    <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROW 3: Move Left -> Right (Tools & Product Architectures) */}
          <div className="flex w-full overflow-hidden relative py-2 font-mono">
            <div className="flex gap-4 md:gap-6 whitespace-nowrap anim-marquee-left-to-right">
              {doubleRow3.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={`${skill.name}-${index}`}
                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 hover:scale-105 hover:border-white/10 cursor-pointer h-14 ${isRose ? 'glass-rose' : 'glass'}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${skill.glowColor}`;
                      e.currentTarget.style.borderColor = skill.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <IconComponent size={16} style={{ color: skill.color }} />
                    <span className="text-white text-[11px] sm:text-xs tracking-wider">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Extra recruiter interactive helper tag */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
            <Settings size={12} className="animate-spin text-[#00FFCC]" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">
              Double-click any pill to explore technical use cases
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
