import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Sparkles, Laptop, Hexagon } from 'lucide-react';
import { ThemeType } from '../types';

interface NavbarProps {
  currentTheme: ThemeType;
  setTheme: (t: ThemeType) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume?: () => void;
}

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ currentTheme, setTheme, activeSection, onNavigate, onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor Scroll for shrinking navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRose = currentTheme === 'midnight-rose';
  // Styling variables based on active theme
  const accentColor = isRose ? '#FF007F' : '#00FFCC'; // magenta vs mint green
  const purpleAccent = isRose ? '#D8B4F8' : '#9D4EDD'; // lavender vs neon purple
  const textPrimary = isRose ? 'text-[#F5EBE6]' : 'text-[#EAEAEA]';

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? `py-3 ${isRose ? 'glass-rose' : 'glass'} shadow-2xl`
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <motion.button
            id="nav-logo"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300"
              style={{
                borderColor: `${purpleAccent}30`,
                background: 'rgba(255, 255, 255, 0.02)',
                boxShadow: isScrolled ? `0 0 15px ${purpleAccent}15` : 'none',
              }}
            >
              <Hexagon
                size={18}
                className="transition-transform duration-500 group-hover:rotate-180"
                style={{ color: accentColor }}
              />
              <span
                className="absolute text-xs font-bold font-display"
                style={{ color: purpleAccent }}
              >
                G
              </span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className={`text-sm font-bold font-display tracking-widest ${textPrimary}`}>
                GARIMA MISHRA
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 mt-0.5">
                ENGINEER & DESIGNER
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive ? textPrimary : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white/[0.04] border border-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{
                        boxShadow: `0 0 12px ${purpleAccent}20`,
                      }}
                    >
                      <span
                        className="absolute bottom-0 left-1/3 right-1/3 h-[2px] rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${purpleAccent}, ${accentColor})`,
                        }}
                      />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: theme + resume action */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Theme switcher */}
            <div
              className="p-1 rounded-full flex items-center relative border border-white/5 bg-white/[0.02] select-none"
              style={{ borderColor: `${purpleAccent}15` }}
            >
              <motion.button
                id="theme-switch-cyber"
                onClick={() => setTheme('cyber-amethyst')}
                className={`relative px-2.5 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-1 transition-colors ${
                  !isRose ? 'text-slate-100 font-semibold' : 'text-slate-500 hover:text-slate-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {!isRose && (
                  <motion.div
                    layoutId="themeBg"
                    className="absolute inset-0 rounded-full bg-white/5 border border-white/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <Moon size={11} className={!isRose ? 'text-[#00FFCC]' : ''} />
                <span className="relative z-15">Cyber</span>
              </motion.button>

              <motion.button
                id="theme-switch-rose"
                onClick={() => setTheme('midnight-rose')}
                className={`relative px-2.5 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-1 transition-colors ${
                  isRose ? 'text-slate-100 font-semibold' : 'text-slate-500 hover:text-slate-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isRose && (
                  <motion.div
                    layoutId="themeBg"
                    className="absolute inset-0 rounded-full bg-white/5 border border-white/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <Sparkles size={11} className={isRose ? 'text-[#FF007F]' : ''} />
                <span className="relative z-15">Rose</span>
              </motion.button>
            </div>

            {/* Quick action button for Resume */}
            {onOpenResume && (
              <motion.button
                id="nav-quick-resume"
                onClick={onOpenResume}
                className="px-4 py-1.5 bg-gradient-to-r hover:opacity-90 text-white text-xs font-semibold rounded-full tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${accentColor}, ${purpleAccent})`,
                  boxShadow: `0 0 15px ${accentColor}30`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 20px ${accentColor}50`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Laptop size={12} />
                My Resume
              </motion.button>
            )}

            {/* Quick action button for Recruiter */}
            <motion.button
              id="nav-quick-contact"
              onClick={() => onNavigate('contact')}
              className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold rounded-full tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              style={{
                boxShadow: `0 0 15px ${purpleAccent}05`,
              }}
              whileHover={{
                scale: 1.05,
                borderColor: `${purpleAccent}50`,
                boxShadow: `0 0 15px ${purpleAccent}15`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>
          </div>

          {/* Core Mobile Trigger Block */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick theme toggler for mobile since control bar is hidden */}
            <button
              onClick={() => setTheme(isRose ? 'cyber-amethyst' : 'midnight-rose')}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 border border-white/5 bg-white/[0.02] mr-1"
              id="mobile-quick-theme-toggle"
            >
              {isRose ? (
                <Sparkles size={16} className="text-[#FF007F]" />
              ) : (
                <Moon size={16} className="text-[#00FFCC]" />
              )}
            </button>

            {/* Mobile menu Button */}
            <motion.button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl border border-white/10 whitespace-nowrap overflow-hidden pr-2 flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                color: isRose ? '#F5EBE6' : '#EAEAEA',
              }}
              whileTap={{ scale: 0.92 }}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-30 p-6 backdrop-blur-xl border-b border-white/10 shadow-2xl flex flex-col gap-6 lg:hidden"
            style={{
              backgroundColor: isRose ? 'rgba(24, 20, 29, 0.96)' : 'rgba(14, 14, 24, 0.96)',
            }}
          >
            {/* Menu options */}
            <div className="flex flex-col gap-3">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate(link.id);
                    }}
                    className={`text-left py-2 px-3 rounded-lg text-sm font-medium tracking-wide transition-all ${
                      isActive
                        ? isRose
                          ? 'bg-[#FF007F]/10 text-[#FF007F]'
                          : 'bg-[#9D4EDD]/10 text-[#00FFCC]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Actions (mobile) */}
            <div
              className="flex items-center justify-between border-t border-white/5 pt-4"
              id="mobile-menu-footer"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase">ACTIVE THEME</span>
                <span
                  className="text-xs font-semibold mt-0.5"
                  style={{ color: isRose ? '#FF007F' : '#00FFCC' }}
                >
                  {isRose ? 'Midnight Rose' : 'Cyber Amethyst'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenResume();
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide flex items-center gap-1.5 transition-all cursor-pointer"
                    style={{
                      color: isRose ? '#FF007F' : '#00FFCC',
                      borderColor: isRose ? 'rgba(255, 0, 127, 0.2)' : 'rgba(0, 255, 204, 0.2)',
                      borderWidth: '1px',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    My Resume
                  </button>
                )}

                <button
                  onClick={() => {
                    setTheme(isRose ? 'cyber-amethyst' : 'midnight-rose');
                  }}
                  className="px-4 py-1.5 border border-white/10 rounded-full text-xs font-mono font-medium tracking-wide flex items-center gap-1.5 cursor-pointer"
                  style={{
                    color: isRose ? '#D8B4F8' : '#00FFCC',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  Switch Vibe
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
