import { motion } from 'motion/react';
import { Palette, Code2, Terminal, PenTool, Sparkles, Wand2 } from 'lucide-react';
import { ThemeType } from '../types';

interface ServicesSectionProps {
  theme: ThemeType;
}

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  glow: string;
}

const SERVICES_LIST: ServiceData[] = [
  {
    id: 'ui-designer',
    title: 'UI Designer',
    description: 'I am proficient in UI/UX design principles and skilled at using Canva and Figma to create visually appealing and user-centered interfaces. I am a highly motivated and results-oriented individual with a strong work ethic.',
    icon: Palette,
    color: '#00FFCC', // Mint
    glow: 'rgba(0, 255, 204, 0.3)',
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    description: 'I leverage my expertise in HTML, CSS, JavaScript, React.js, and Tailwind CSS to build responsive, dynamic, and visually appealing websites. I am dedicated to delivering high-quality, pixel-perfect solutions that meet business objectives.',
    icon: Code2,
    color: '#9D4EDD', // Purple
    glow: 'rgba(157, 78, 221, 0.3)',
  },
  {
    id: 'prompt-eng',
    title: 'Prompt Engineer',
    description: 'I specialize in crafting high-quality prompts for text generation, image creation, and more. My services include prompt development, refinement, and optimization to achieve the best possible results for specific needs.',
    icon: Sparkles,
    color: '#FF007F', // Magenta
    glow: 'rgba(255, 0, 127, 0.3)',
  },
  {
    id: 'graphic-des',
    title: 'Graphic Designer',
    description: 'I am a passionate graphic designer specializing in creating visually compelling and impactful designs. I offer services including logo design, branding, social media graphics, web design, and print materials.',
    icon: PenTool,
    color: '#D8B4F8', // Lavender
    glow: 'rgba(216, 180, 248, 0.3)',
  },
];

export default function ServicesSection({ theme }: ServicesSectionProps) {
  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Magenta vs Violet
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender vs Mint

  // Animations configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="services"
      className="relative py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isRose ? '#120E16' : '#0A0A12',
      }}
    >
      {/* Decorative gradient canvas lights */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
        style={{ backgroundColor: accent1 }}
      />
      <div
        className="absolute top-1/3 right-12 w-80 h-80 rounded-full blur-[140px] opacity-[0.06] pointer-events-none animate-pulse-slow"
        style={{ backgroundColor: accent2 }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full mr-1 blink" style={{ backgroundColor: accent2 }} />
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
              Active Service Offerings
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-none">
            Services I{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent1}, ${accent2})`,
              }}
            >
              Offer
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-md">
            Providing high-end engineering, prompt optimization, branding assets and interfaces tailored for robust product value.
          </p>
        </div>

        {/* Responsive layout list: 
            Desktop: 4 columns in one row
            Tablet: 2x2 layout
            Mobile: Single column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none"
        >
          {SERVICES_LIST.map((service, index) => {
            const IconComponent = service.icon;

            // Generate specific colors for boundaries
            const selectedAccent = isRose 
              ? (index % 2 === 0 ? '#FF007F' : '#D8B4F8') 
              : (index % 2 === 0 ? '#00FFCC' : '#9D4EDD');

            const selectedGlow = isRose
              ? (index % 2 === 0 ? 'rgba(255, 0, 127, 0.25)' : 'rgba(216, 180, 248, 0.25)')
              : (index % 2 === 0 ? 'rgba(0, 255, 204, 0.25)' : 'rgba(157, 78, 221, 0.25)');

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  borderColor: selectedAccent,
                  boxShadow: `0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px ${selectedGlow}`,
                }}
                className={`rounded-2xl p-6 border relative overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col justify-between ${isRose ? 'glass-rose' : 'glass'}`}
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                }}
              >
                {/* Decorative neon backdrop pulse effect */}
                <div
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: selectedAccent }}
                />

                {/* Card Top: Floating dynamic icon */}
                <div>
                  <div className="relative mb-6">
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                      }}
                      transition={{
                        duration: 3.5 + index * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 relative"
                      style={{
                        borderColor: `${selectedAccent}40`,
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        boxShadow: `0 0 10px ${selectedGlow}`,
                      }}
                    >
                      <IconComponent size={20} style={{ color: selectedAccent }} className="transition-transform group-hover:scale-110" />
                      
                      {/* Internal absolute spinner */}
                      <span className="absolute inset-0 rounded-xl border border-dotted border-white/5 group-hover:animate-spin" style={{ animationDuration: '6s' }} />
                    </motion.div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg font-bold font-display text-white tracking-wide mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
                    {service.description}
                  </p>
                </div>

                {/* Card bottom: indicator bar */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>CAPABILITY 0{index + 1}</span>
                  <Wand2
                    size={11}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: selectedAccent }}
                  />
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
