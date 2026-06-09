import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Award, Search, Compass, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ThemeType } from '../types';

interface AchievementsSectionProps {
  theme: ThemeType;
}

interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  year: string;
  tech: string;
  hueShift: string;
  imageUrl?: string;
}

const CERTIFICATES: CertificateData[] = [
  { 
    id: 'prarambh-2025', 
    title: '1st Place Winner - IBM Prarambh AI Hackathon', 
    issuer: 'IBM & GL Bajaj Group of Institutions', 
    year: '2025', 
    tech: 'Generative AI, Samadhan AI, Startup Pitch & Prototyping', 
    hueShift: 'hue-rotate-0',
    imageUrl: '../assets/images/ibm_hackathon_winner_cert_1781039468247.png'
  },
  { 
    id: 'ct-tech-solutions', 
    title: '1st Prize - Online National Hackathon', 
    issuer: 'CT Tech Solutions (Approved under AICTE)', 
    year: '2025', 
    tech: 'Frontend Web Development, ReactJS, Mental Health & Wellness Dashboard', 
    hueShift: 'hue-rotate-[110deg]',
    imageUrl: '../assets/images/ct_tech_solutions_cert_1781037253336.png'
  },
  { 
    id: 'qubitx-2025', 
    title: 'Top 25 Finalists - QubitX National Hackathon', 
    issuer: 'GL Bajaj Group of Institutions', 
    year: '2025', 
    tech: 'Full-stack development, Team HackNHost, Technical Innovation', 
    hueShift: 'hue-rotate-[240deg]',
    imageUrl: '../assets/images/qubitx_cert_1781037183527.png'
  },
  { 
    id: 'hackorbit-2025', 
    title: 'HackOrbit 2025 National Hackathon', 
    issuer: 'MITS Gwalior (Sponsored by Unstop)', 
    year: '2025', 
    tech: 'National Hackathon participation, Team Samadhan', 
    hueShift: 'hue-rotate-[45deg]',
    imageUrl: '../assets/images/hackorbit_cert_1781037198911.png'
  },
  { 
    id: 'adobe-hackathon-2025', 
    title: 'Adobe India Hackathon 2025', 
    issuer: 'Adobe & Unstop', 
    year: '2025', 
    tech: 'Round 2 (Build & Connect Round), Team Alpha Coders', 
    hueShift: 'hue-rotate-[160deg]',
    imageUrl: '../assets/images/adobe_cert_1781037212645.png'
  },
  { 
    id: 'iic-regional-meet-2025', 
    title: 'Ministry of Education IIC Regional Meet', 
    issuer: 'MoE Innovation Cell & AICTE', 
    year: '2025', 
    tech: 'Attended regional innovation alignment, G L Bajaj Institute Noida', 
    hueShift: 'hue-rotate-[290deg]',
    imageUrl: '../assets/images/iic_cert_1781037223842.png'
  },
  { 
    id: 'ml-iitg', 
    title: 'Top 25% Ranker in ML & Data Analysis', 
    issuer: 'Consulting & Analytics Club, IIT Guwahati', 
    year: '2024', 
    tech: 'Machine learning algorithms, data preprocessing, and analytics frameworks', 
    hueShift: 'hue-rotate-[190deg]',
    imageUrl: '../assets/images/iitg_ml_cert_1781037604153.png'
  },
];

const CARD_INFOS = [
  { title: 'IBM Prarambh Hackathon 2025 Winner', text: 'Won first prize for designing a scalable cloud architecture combined with high-grade client side telemetry to evaluate resource utilization under extreme spikes.' },
  { title: 'CT Solution Hackathon Winner', text: 'Stood outstanding championed with custom UI/UX paradigms, presenting seamless cross-platform software to support remote medical coordination.' },
  { title: '7× Hackathon Finalist', text: 'Consistently qualified and presented technical prototypes across regional and federal innovation events, showing speed execution under time pressures.' },
  { title: 'Startup Web Developer', text: 'Engineered clean production code and high-end landing structures for tech startups, assisting teams with pitch designs and direct marketing graphics.' },
];

export default function AchievementsSection({ theme }: AchievementsSectionProps) {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  
  const autoRotateRef = useRef<number | null>(null);

  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Purple / Magenta
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender / Mint

  // Auto-rotation clock
  useEffect(() => {
    if (!isHovered) {
      autoRotateRef.current = window.setInterval(() => {
        setRotation((prev) => (prev + 0.15) % 360);
      }, 16); // ~60fps smooth increment
    }
    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isHovered]);

  const certificateTemplateUrl = '../assets/images/certificate_gold_1781033663995.png';

  // Number of items in circle
  const totalItems = CERTIFICATES.length;
  // Dynamic radius based on screen size
  const [radius, setRadius] = useState(240);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(130);
      } else if (window.innerWidth < 1024) {
        setRadius(190);
      } else {
        setRadius(245);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute position helper
  const getCardTransform = (index: number) => {
    const baseAngleDegree = (index * 360) / totalItems;
    // Current accumulated polar angle of item
    const currentAngleDegree = (baseAngleDegree + rotation) % 360;
    const currentAngleRadian = (currentAngleDegree * Math.PI) / 180;

    // Calc coordinates
    const x = radius * Math.sin(currentAngleRadian);
    const z = radius * Math.cos(currentAngleRadian);

    // Deep perspective values
    const maxZ = radius;
    // Normalized Z goes from 0 (farthest) to 1 (closest)
    const normalizedZ = (z + maxZ) / (2 * maxZ);

    const scale = 0.55 + 0.45 * normalizedZ;
    const opacity = 0.25 + 0.75 * normalizedZ;
    // Stack cards based on closeness
    const zIndex = Math.round(normalizedZ * 100);

    return { x, z, scale, opacity, zIndex, currentAngleDegree };
  };

  const rotateLeft = () => {
    setRotation((prev) => prev - (360 / totalItems));
  };

  const rotateRight = () => {
    setRotation((prev) => prev + (360 / totalItems));
  };

  // Find which list card is currently closest to the front (i.e., angle closest to 0 / 360 deg)
  useEffect(() => {
    let closestIndex = 0;
    let minDiff = 360;

    for (let i = 0; i < totalItems; i++) {
      const { currentAngleDegree } = getCardTransform(i);
      // We want to find the one closest to 0 (direct center front)
      const diff = Math.min(
        Math.abs(currentAngleDegree),
        Math.abs(360 - currentAngleDegree)
      );
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    setActiveCardIndex(closestIndex);
  }, [rotation]);

  return (
    <section
      id="achievements"
      className="relative py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isRose ? '#120E16' : '#0A0A12',
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.08] pointer-events-none"
        style={{ backgroundColor: accent1 }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full blur-[140px] opacity-[0.08] pointer-events-none"
        style={{ backgroundColor: accent2 }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full mr-1 blink" style={{ backgroundColor: accent2 }} />
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
              Championships &amp; Badges
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-none">
            3D Circular{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent1}, ${accent2})`,
              }}
            >
              Credentials Wheel
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-md">
            Interactive rotating honors cylinder. Swipe horizontally on mobile or hover on desktop to read detailed seals.
          </p>
        </div>

        {/* 3D STAGE CAROUSEL AREA - Hidden on mobile, visible on desktop/tablet */}
        <div
          className="hidden sm:flex relative w-full h-[320px] sm:h-[400px] items-center justify-center select-none overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Central Orbit Axis indicator */}
          <div className="absolute w-[180px] sm:w-[280px] h-[50px] rounded-full border border-dashed border-white/5 pointer-events-none transform -rotate-12 blur-[1px] opacity-40 z-0" />

          {/* Render 7 certificates inside circular configuration */}
          {CERTIFICATES.map((cert, index) => {
            const { x, scale, opacity, zIndex } = getCardTransform(index);
            const isActive = activeCardIndex === index;

            return (
              <motion.div
                key={cert.id}
                onClick={() => setSelectedCertificate(cert)}
                className={`absolute w-36 h-48 sm:w-48 sm:h-64 rounded-2xl p-[1px] cursor-pointer origin-center transition-shadow duration-300 ${
                  isActive ? 'ring-2 border-transparent' : ''
                }`}
                style={{
                  x: x,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                  borderColor: isActive ? accent2 : 'transparent',
                  boxShadow: isActive
                    ? `0 15px 35px ${accent1}25, 0 0 20px ${accent2}30`
                    : '0 4px 20px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Visual card content wrapping generated image of certificates */}
                <div className="w-full h-full rounded-2xl overflow-hidden relative flex flex-col justify-end bg-slate-900 border border-white/5">
                  <img
                    src={cert.imageUrl || certificateTemplateUrl}
                    alt={cert.title}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 select-none ${cert.imageUrl ? (cert.id === 'prarambh-2025' ? 'object-contain p-2 bg-slate-950/40' : '') : cert.hueShift}`}
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${cert.id}/${420}/${320}`;
                    }}
                  />
                  {/* Subtle dark bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />

                  {/* Glassmorphic label display */}
                  <div className="relative z-15 p-3 sm:p-4 text-left">
                    <span className="text-[7.5px] sm:text-[9px] font-mono leading-none px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[#00FFCC]" style={{ color: isActive ? accent2 : '#00FFCC' }}>
                      {cert.year}
                    </span>
                    <h4 className="text-[10px] sm:text-xs font-bold font-display text-white mt-1.5 leading-snug tracking-wide line-clamp-2">
                       {cert.title}
                    </h4>
                    <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 mt-0.5 block truncate">
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Active highlight scanner bar */}
                  {isActive && (
                    <motion.div
                      className="absolute top-0 inset-x-0 h-[2px] z-20"
                      style={{
                        background: `linear-gradient(90deg, ${accent1}, ${accent2})`,
                        boxShadow: `0 0 10px ${accent2}`,
                      }}
                      animate={{ y: [0, 240, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipe/Scroll Row - visible only on mobile screens, prevent overflow */}
        <div className="flex sm:hidden w-full overflow-x-auto scrollbar-none snap-x snap-mandatory gap-4 px-4 pb-8 -mt-4 mb-2">
          {CERTIFICATES.map((cert) => (
            <motion.div
              key={`${cert.id}-mobile`}
              onClick={() => setSelectedCertificate(cert)}
              className="w-48 h-64 shrink-0 rounded-2xl p-[1px] cursor-pointer snap-center bg-slate-900 border border-white/10 active:scale-95 transition-transform"
              style={{
                boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4)`,
              }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative flex flex-col justify-end">
                <img
                  src={cert.imageUrl || certificateTemplateUrl}
                  alt={cert.title}
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover opacity-80 ${cert.imageUrl ? (cert.id === 'prarambh-2025' ? 'object-contain p-2 bg-slate-950/40' : '') : cert.hueShift}`}
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/${cert.id}/${420}/${320}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                
                <div className="relative z-15 p-3.5 text-left">
                  <span className="text-[8px] font-mono leading-none px-1.5 py-0.5 rounded bg-black/70 border border-white/10 text-[#00FFCC]">
                    {cert.year}
                  </span>
                  <h4 className="text-[11px] font-bold font-display text-white mt-1.5 leading-snug tracking-wide line-clamp-2">
                    {cert.title}
                  </h4>
                  <span className="text-[8.5px] font-medium text-slate-400 mt-0.5 block truncate">
                    {cert.issuer}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Swipe helper indicators for mobile */}
        <div className="flex sm:hidden items-center gap-1.5 mb-8 -mt-2 text-[10px] font-mono text-slate-500 animate-pulse">
          <Info size={10} className="text-[#00FFCC]" />
          <span>SWIPE CARDS HORIZONTALLY</span>
        </div>

        {/* Manual Cylindrical rotating buttons control - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-6 mb-20 -mt-2">
          <button
            onClick={rotateLeft}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-[10px] font-mono text-slate-500 tracking-wider">
            DRAG OR SPIN MANUALLY
          </span>

          <button
            onClick={rotateRight}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* CREDIBILITIES & DETAILS CARDS BENEATH */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARD_INFOS.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border-y border-r relative overflow-hidden group hover:border-white/10 transition-all hover:-translate-y-1 ${
                isRose ? 'achievement-card-rose bg-[#1A121E]/30' : 'achievement-card bg-[#111122]/30'
              }`}
              style={{
                borderLeftColor: isRose 
                  ? (idx % 2 === 0 ? '#FF007F' : '#D8B4F8') 
                  : (idx % 2 === 0 ? '#9D4EDD' : '#00FFCC'),
                borderTopColor: 'rgba(255, 255, 255, 0.04)',
                borderRightColor: 'rgba(255, 255, 255, 0.04)',
                borderBottomColor: 'rgba(255, 255, 255, 0.04)',
              }}
            >
              <div className="absolute top-0 right-0 p-3 select-none pointer-events-none opacity-10 group-hover:opacity-20 transition-all">
                <Trophy size={48} style={{ color: idx % 2 === 0 ? accent1 : accent2 }} />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border"
                  style={{ borderColor: `${idx % 2 === 0 ? accent1 : accent2}30`, backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  {idx % 2 === 0 ? (
                    <Trophy size={14} style={{ color: accent1 }} />
                  ) : (
                    <Award size={14} style={{ color: accent2 }} />
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500">HONOR 0{idx+1}</span>
              </div>

              <h3 className="text-sm font-bold font-display text-white tracking-wide mb-2.5 group-hover:text-amber-400 transition-colors">
                {card.title}
              </h3>
              
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* DETAILS LIGHTBOX DRILLDOWN */}
        <AnimatePresence>
          {selectedCertificate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md rounded-3xl p-6 border border-white/10 bg-slate-900 shadow-2xl relative"
              >
                {/* Banner representation */}
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative mb-6 border border-white/5 bg-black">
                  <img
                    src={selectedCertificate.imageUrl || certificateTemplateUrl}
                    alt={selectedCertificate.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-contain opacity-90 ${selectedCertificate.imageUrl ? (selectedCertificate.id === 'prarambh-2025' ? 'bg-slate-950/70 p-3' : '') : selectedCertificate.hueShift}`}
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${selectedCertificate.id}/${400}/${300}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />
                  
                  {/* Decorative stamp visual */}
                  <div className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full border-2 border-dotted border-amber-400/40 flex items-center justify-center transform rotate-12">
                     <span className="text-[8px] font-mono text-amber-300">VALID</span>
                  </div>
                </div>

                <h3 className="text-lg font-black font-display text-white mb-1">
                  {selectedCertificate.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400">
                  Issued by {selectedCertificate.issuer} — {selectedCertificate.year}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Scope & Skills Checked</span>
                    <span className="text-xs text-slate-300 font-medium">{selectedCertificate.tech}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Credibility Rating</span>
                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                      ★★★★★ verified credentials
                    </span>
                  </div>
                </div>

                {/* Close Button action */}
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold tracking-wide text-center bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                >
                  Close Seal Details
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
