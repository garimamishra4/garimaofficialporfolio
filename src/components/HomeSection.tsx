import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, FileText, Compass, Send, ShieldCheck, HeartPulse, Brain, Award } from 'lucide-react';
import { ThemeType } from '../types';

interface HomeSectionProps {
  theme: ThemeType;
  onNavigate: (sectionId: string) => void;
  onOpenResume?: () => void;
}

// Customizable tags
const SKILL_TAGS = [
  { name: 'Java Developer', icon: Brain, color: '#9D4EDD' },
  { name: 'Frontend Engineer', icon: Sparkles, color: '#00FFCC' },
  { name: 'UI/UX Designer', icon: Compass, color: '#FF007F' },
  { name: 'React Developer', icon: ShieldCheck, color: '#D8B4F8' },
  { name: 'Prompt Engineer', icon: Brain, color: '#EAEAEA' },
];

const ACHIEVEMENT_TAGS = [
  { text: 'IBM Prarambh Winner', badge: '🏆' },
  { text: 'CT Solution Winner', badge: '✨' },
  { text: '7× Hackathon Finalist', badge: '🛡️' },
  { text: 'Startup Developer', badge: '💻' },
];

export default function HomeSection({ theme, onNavigate, onOpenResume }: HomeSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  // Mouse trail/spotlight state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInContainer, setIsMouseInContainer] = useState(false);

  // 3D Tile effect states
  const rotateX = useSpring(0, { damping: 20, stiffness: 150 });
  const rotateY = useSpring(0, { damping: 20, stiffness: 150 });

  // Responsive mobile checking state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    const card = imageCardRef.current.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Limit maximum tilt angle to 20 deg
    const maxTilt = 20;
    const limitX = (mouseY / (card.height / 2)) * -maxTilt;
    const limitY = (mouseX / (card.width / 2)) * maxTilt;

    rotateX.set(limitX);
    rotateY.set(limitY);
  };

  const handleImageMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Magenta vs Violet
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender vs Mint

  // Fallback profile images or exact generated one
  const garimaPhotoSrc = '../assets/images/garima_dark_vr_theme_profile_1781039971487.png';

  // Magnetic Button Effect helper Hook logic inside Component
  const useMagnetic = () => {
    const btnX = useSpring(0, { stiffness: 200, damping: 15 });
    const btnY = useSpring(0, { stiffness: 200, damping: 15 });

    const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btnX.set(x * 0.35);
      btnY.set(y * 0.35);
    };

    const onMouseLeave = () => {
      btnX.set(0);
      btnY.set(0);
    };

    return { btnX, btnY, onMouseMove, onMouseLeave };
  };

  const magResume = useMagnetic();
  const magProjects = useMagnetic();
  const magContact = useMagnetic();

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseEnter={() => setIsMouseInContainer(true)}
      onMouseLeave={() => setIsMouseInContainer(false)}
      className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-between overflow-hidden select-none"
      style={{
        backgroundColor: isRose ? '#120E16' : '#0A0A12',
      }}
    >
      {/* Dynamic Background Mesh */}
      <div className={`absolute inset-0 z-0 pointer-events-none ${isRose ? 'grid-bg-rose' : 'grid-bg'}`} />

      {/* Mouse Follow Glow Spot */}
      <AnimatePresence>
        {isMouseInContainer && (
          <motion.div
            className="absolute z-0 pointer-events-none w-[600px] h-[600px] rounded-full blur-[140px] opacity-35 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            style={{
              left: mousePos.x - 300,
              top: mousePos.y - 300,
              background: `radial-gradient(circle, ${accent1} 0%, ${accent2} 100%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle Background Blobs / Glow blooms matching Sleek Interface theme */}
      <div
        className="glow-blob absolute top-[-100px] left-[-100px]"
        style={{
          background: isRose 
            ? 'radial-gradient(circle, rgba(255, 0, 127, 0.15) 0%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(157, 78, 221, 0.15) 0%, transparent 70%)'
        }}
      />
      <div
        className="glow-blob absolute bottom-[-100px] right-[-100px]"
        style={{
          background: isRose 
            ? 'radial-gradient(circle, rgba(216, 180, 248, 0.1) 0%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(0, 255, 204, 0.1) 0%, transparent 70%)'
        }}
      />

      {/* Top Center: "Hey There, I'm" banner */}
      <div className="relative z-10 w-full text-center mt-3 mb-6">
        <motion.p
          id="hero-hey-reveal"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-2xl md:text-3xl font-light text-slate-300 tracking-wider flex items-center justify-center gap-2"
        >
          Hey There, <span style={{ color: accent2 }} className="font-semibold">I'm</span>
        </motion.p>
      </div>

      {/* Grid Layout: Left Column, Center, Right Column */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        
        {/* LEFT COLUMN: Garima Title / Core Details */}
        <motion.div
          id="hero-left-column"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          <div className="relative mb-2">
            <span className={isRose ? 'tag-rose uppercase tracking-widest mb-3 inline-block' : 'tag uppercase tracking-widest mb-3 inline-block'}>
              HACKATHON WINNER 🏆
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-display tracking-tight text-white leading-tight">
            I'm <br className="hidden lg:block" />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r inline-block drop-shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, #ffffff 30%, ${accent2} 100%)`,
              }}
            >
              Garima Mishra
            </span>
          </h1>

          <p className="mt-6 text-sm text-slate-400 max-w-sm leading-relaxed font-sans">
            A multitalented developer bridging elegant frontends and strong Java architectures. Championing modern tech solutions through code and design.
          </p>

          {/* Compact visual Skill Badges list for mobile view screens */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center lg:hidden max-w-sm">
            {SKILL_TAGS.map((tag) => {
              const TagIcon = tag.icon;
              return (
                <div
                  key={tag.name}
                  className="px-2.5 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-wide flex items-center gap-1.5 border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderColor: `${tag.color}25`,
                    color: '#CBD5E1',
                    boxShadow: `0 0 10px ${tag.color}10`,
                  }}
                >
                  <TagIcon size={10} style={{ color: tag.color }} />
                  <span>{tag.name}</span>
                </div>
              );
            })}
          </div>

          {/* Magnetic Buttons Container */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            
            {/* Action 1: View Resume */}
            <motion.button
              id="hero-btn-resume"
              onMouseMove={magResume.onMouseMove}
              onMouseLeave={magResume.onMouseLeave}
              onClick={onOpenResume || (() => onNavigate('about'))}
              className="px-5 py-3 rounded-xl text-xs font-semibold tracking-wider font-display text-white border transition-all duration-200 cursor-pointer flex items-center gap-2"
              style={{
                x: magResume.btnX,
                y: magResume.btnY,
                borderColor: `${accent1}70`,
                background: `linear-gradient(135deg, ${accent1}40, transparent)`,
                boxShadow: `0 0 15px ${accent1}25`,
              }}
              whileHover={{
                scale: 1.05,
                borderColor: accent1,
                boxShadow: `0 0 25px ${accent1}70, inset 0 0 8px ${accent1}30`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={14} style={{ color: accent2 }} />
              View Resume
            </motion.button>

            {/* Action 2: Explore Projects */}
            <motion.button
              id="hero-btn-projects"
              style={{ x: magProjects.btnX, y: magProjects.btnY }}
              onMouseMove={magProjects.onMouseMove}
              onMouseLeave={magProjects.onMouseLeave}
              onClick={() => onNavigate('projects')}
              className="px-5 py-3 rounded-xl text-xs font-semibold tracking-wider font-display text-white border border-white/10 background bg-white/[0.02] cursor-pointer flex items-center gap-2 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass size={14} />
              Explore Projects
            </motion.button>

            {/* Action 3: Contact */}
            <motion.button
              id="hero-btn-contact"
              style={{ x: magContact.btnX, y: magContact.btnY }}
              onMouseMove={magContact.onMouseMove}
              onMouseLeave={magContact.onMouseLeave}
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-xl text-xs font-semibold tracking-wider font-display bg-transparent text-white border border-transparent hover:border-white/10 transition-all duration-300 cursor-pointer flex items-center gap-2"
              whileHover={{ scale: 1.05, borderBottomColor: accent2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={14} style={{ color: accent2 }} />
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        {/* CENTER COLUMN: Interactive 3D Frame */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 my-4 lg:my-0">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 select-none">
            
            {/* Rotating Star Orbits On hovered */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <motion.div
                className="absolute inset-[-15px] rounded-full border border-dashed border-white/5"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[-30px] rounded-full border border-dashed border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Float Particles orbital paths - disabled on mobile view to avoid overflow horizontal scrolling */}
            <AnimatePresence>
              {isHovered && !isMobile && (
                <>
                  {/* Orbit Particle 1 */}
                  <motion.div
                    className="absolute z-20 w-3 h-3 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${accent2} 0%, transparent 80%)`,
                      boxShadow: `0 0 15px ${accent2}`,
                    }}
                    animate={{
                      x: [0, 140, 0, -140, 0],
                      y: [-140, 0, 140, 0, -140],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Orbit Particle 2 */}
                  <motion.div
                    className="absolute z-20 w-2 h-2 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${accent1} 0%, transparent 80%)`,
                      boxShadow: `0 0 15px ${accent1}`,
                    }}
                    animate={{
                      x: [0, -150, 0, 150, 0],
                      y: [150, 0, -150, 0, 150],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                  
                  {/* Skill Badge Orbital Emerge (Artistically aligned around image) */}
                  {SKILL_TAGS.map((tag, idx) => {
                    // Position tags offset dynamically
                    const angle = (idx * 2 * Math.PI) / SKILL_TAGS.length;
                    const radius = 170; // Position tags outwards
                    const xOffset = Math.cos(angle) * radius;
                    const yOffset = Math.sin(angle) * radius;
                    const TagIcon = tag.icon;

                    return (
                      <motion.div
                        key={tag.name}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{ opacity: 1, scale: 1, x: xOffset, y: yOffset }}
                        exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        transition={{ type: 'spring', damping: 15, delay: idx * 0.05 }}
                        className="absolute z-30 px-3 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-wide flex items-center gap-1.5 backdrop-blur-md shadow-2xl border"
                        style={{
                          left: '42%',
                          top: '42%',
                          background: 'rgba(10, 10, 18, 0.85)',
                          borderColor: `${tag.color}60`,
                          color: '#FFFFFF',
                          boxShadow: `0 0 15px ${tag.color}30`,
                        }}
                      >
                        <TagIcon size={10} style={{ color: tag.color }} />
                        <span>{tag.name}</span>
                      </motion.div>
                    );
                  })}

                  {/* Achievement popups */}
                  {ACHIEVEMENT_TAGS.map((ach, idx) => {
                    const angle = ((idx + 2.5) * 2 * Math.PI) / ACHIEVEMENT_TAGS.length;
                    const radius = 220; // Badges orbit slightly further
                    const xOffset = Math.cos(angle) * radius;
                    const yOffset = Math.sin(angle) * radius * 0.7; // slight oval layout

                    return (
                      <motion.div
                        key={ach.text}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{ opacity: 1, scale: 1, x: xOffset, y: yOffset }}
                        exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        transition={{ type: 'spring', damping: 12, delay: (idx + 5) * 0.04 }}
                        className="absolute z-30 px-2.5 py-1 rounded-lg text-[9px] font-semibold tracking-wide flex items-center gap-1 backdrop-blur-md shadow-sm border border-white/5 text-slate-100"
                        style={{
                          left: '42%',
                          top: '42%',
                          background: 'rgba(255, 255, 255, 0.04)',
                        }}
                      >
                        <span>{ach.badge}</span>
                        <span>{ach.text}</span>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </AnimatePresence>

            {/* 3D Glass Frame Card */}
            <motion.div
              id="hero-3d-profile"
              ref={imageCardRef}
              onMouseMove={handleImageMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleImageMouseLeave}
              className="absolute inset-0 rounded-[40px] p-2.5 cursor-pointer flex items-center justify-center overflow-visible border group"
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: 'preserve-3d',
                borderColor: isHovered ? accent2 : 'rgba(255, 255, 255, 0.08)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                boxShadow: isHovered
                  ? `0 10px 40px ${accent1}40, 0 0 35px ${accent2}40`
                  : '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'border-color 0.4s, box-shadow 0.4s',
              }}
            >
              {/* Inner frame */}
              <div
                className="w-full h-full rounded-[32px] overflow-hidden relative"
                style={{ transform: 'translateZ(20px)' }}
              >
                {/* Fallback pattern in case the image fails to load */}
                <div className="absolute inset-0 bg-[#16162A]/80 flex flex-col items-center justify-center">
                  <Award size={48} style={{ color: accent2 }} className="animate-spin" />
                  <span className="text-[10px] font-mono mt-3 text-slate-400">LOADING AVATAR</span>
                </div>

                <img
                  src={garimaPhotoSrc}
                  alt="Garima Mishra portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top relative z-10 transition-transform duration-500 group-hover:scale-105"
                  onLoad={(e) => {
                    // Hide safety loader
                    const el = e.currentTarget.previousSibling as HTMLDivElement;
                    if (el) el.style.display = 'none';
                  }}
                  onError={(e) => {
                    // Use beautiful seed image if path is wrong
                    e.currentTarget.src = `https://picsum.photos/seed/cyberport/${500}/${500}`;
                    const el = e.currentTarget.previousSibling as HTMLDivElement;
                    if (el) el.style.display = 'none';
                  }}
                />

                {/* Cyber Matrix Glow Overlay */}
                <div
                  className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t opacity-40 transition-all duration-400 group-hover:opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(to top, #0A0A12, transparent 50%)`,
                  }}
                />
              </div>

              {/* Extra Floating Details (e.g., prompt outline or mouse prompt) */}
              <div
                className="absolute bottom-4 left-0 right-0 z-20 text-center font-mono text-[9px] text-white/50 tracking-widest uppercase transition-opacity pointer-events-none"
                style={{ opacity: isHovered ? 1 : 0.4 }}
              >
                {isMobile ? '[ TAP PROFILE BOX ]' : '[ HOVER FOR DEETS ]'}
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: Splendid Header Tagline Title */}
        <motion.div
          id="hero-right-column"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-3"
        >
          <div className="relative mb-2">
            <span className={isRose ? 'tag-rose uppercase tracking-widest mb-3 inline-block' : 'tag uppercase tracking-widest mb-3 inline-block'}>
              IBM PRARAMBH WINNER 🏆
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Frontend <br className="hidden lg:block animate-pulse-slow" />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r inline-block drop-shadow-md"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent1} 20%, #ffffff 80%)`,
              }}
            >
              Dev & Designer
            </span>
          </h2>

          <p className="mt-6 text-sm text-slate-400 max-w-sm leading-relaxed font-sans">
            Crafting state-of-the-art interactive systems. Bridging custom designs, dynamic React animations, and optimized algorithms for business values.
          </p>

          {/* Achievement Tags below heading */}
          <div className="mt-8 flex flex-col gap-2.5 w-full max-w-xs self-center lg:self-start">
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all">
              <Trophy size={16} style={{ color: accent2 }} />
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-200">IBM Prarambh Winner</p>
                <p className="text-[10px] font-mono text-slate-500">First Prize Nation-Wide Challenge</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all">
              <Sparkles size={16} style={{ color: accent1 }} />
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-200">CT Solution Winner</p>
                <p className="text-[10px] font-mono text-slate-500">Top Problem Solvers Category</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all">
              <Award size={16} className="text-amber-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-200">7× Hackathon Finalist</p>
                <p className="text-[10px] font-mono text-slate-500">Unlocking creative engineering</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow marker */}
      <div className="relative z-10 w-full flex justify-center text-center mt-6">
        <motion.button
          onClick={() => onNavigate('about')}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase group-hover:text-slate-300 transition-colors">
            Scroll To About
          </span>
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accent2 }}
          />
        </motion.button>
      </div>
    </section>
  );
}
