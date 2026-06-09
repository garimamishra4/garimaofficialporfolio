import { motion } from 'motion/react';
import { ThemeType } from '../types';

interface FooterProps {
  theme: ThemeType;
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ theme, onNavigate }: FooterProps) {
  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Purple / Magenta
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender / Mint

  return (
    <footer
      id="footer-section"
      className="relative py-12 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isRose ? '#120E16' : '#0A0A12',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* SMALL GLOWING DIVIDER LINE ABOVE FOOTER */}
        <div className="relative w-full h-[1px] mb-8 overflow-visible">
          <div
            className="absolute inset-0 z-0 h-full w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent1} 30%, ${accent2} 70%, transparent)`,
            }}
          />
          {/* Neon Glow shadow overlay */}
          <div
            className="absolute inset-x-1/4 -top-1 blur-[3px] h-[3px] z-0 opacity-50"
            style={{
              background: `linear-gradient(90deg, ${accent1}, ${accent2})`,
            }}
          />
        </div>

        {/* Core Footer elements & Mandatory text disclosures */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full text-slate-500 font-mono text-[10px] sm:text-xs gap-4 select-none">
          
          <div className="flex items-center gap-1.5 order-2 md:order-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent2 }} />
            <span>Garima Mishra © 2026</span>
          </div>

          {/* Quick scroll back to top button */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer order-1 md:order-2 text-[10px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            [ BACK TO TOP UNIT ]
          </motion.button>

          <p className="order-3 leading-loose hover:text-slate-300 transition-colors">
            Designed &amp; Developed with ❤️ by Garima Mishra
          </p>

        </div>

      </div>
    </footer>
  );
}
