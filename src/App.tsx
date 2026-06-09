import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeType } from './types';

// Import our modular sub-components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [theme, setTheme] = useState<ThemeType>('midnight-rose');
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Multi-Section scroll observer logic
  useEffect(() => {
    if (loading) return;

    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'services', 'contact'];
    
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          // Trigger when 20% or more of the item is active inside viewport
          rootMargin: '-20% 0px -40% 0px',
          threshold: 0.1,
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs?.observer && obs?.el) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, [loading]);

  // Smooth scroll scrolling target trigger
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset calculated for shrinking static navbar
      const yOffset = -70; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const isRose = theme === 'midnight-rose';
  // Standard background properties
  const bgMain = isRose ? '#120E16' : '#0A0A12';
  const textMain = isRose ? '#F5EBE6' : '#EAEAEA';

  return (
    <div
      id="app-theme-root"
      className="min-h-screen font-sans transition-colors duration-500 overflow-x-hidden"
      style={{
        backgroundColor: bgMain,
        color: textMain,
      }}
    >
      {/* 1. MANDATORY ANIME PRELOADER BLOCK */}
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader
            key="preloader"
            theme={theme}
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* 2. PORTFOLIO WEBSITE STRUCTURE */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col min-h-screen"
        >
          {/* Static Glass Header */}
          <Navbar
            currentTheme={theme}
            setTheme={setTheme}
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          {/* Primary View Elements */}
          <main className="flex-grow">
            
            {/* Section 1: Home/Hero */}
            <HomeSection 
              theme={theme} 
              onNavigate={handleNavigate} 
              onOpenResume={() => setIsResumeOpen(true)} 
            />

            {/* Section 2: About */}
            <AboutSection theme={theme} onNavigate={handleNavigate} />

            {/* Section 3: Skills */}
            <SkillsSection theme={theme} />

            {/* Section 4: Projects */}
            <ProjectsSection theme={theme} />

            {/* Section 5: Achievements */}
            <AchievementsSection theme={theme} />

            {/* Section 6: Services */}
            <ServicesSection theme={theme} />

            {/* Section 7: Contact */}
            <ContactSection theme={theme} />

          </main>

          {/* Site Footer */}
          <Footer theme={theme} onNavigate={handleNavigate} />

          {/* Interactive Digital Resume Drawer Overlay */}
          <AnimatePresence>
            {isResumeOpen && (
              <ResumeModal
                key="resume-modal"
                theme={theme}
                isOpen={isResumeOpen}
                onClose={() => setIsResumeOpen(false)}
              />
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </div>
  );
}
