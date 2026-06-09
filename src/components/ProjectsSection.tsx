import React, { useState, useRef } from 'react';
import { motion, useSpring } from 'motion/react';
import { Github, ExternalLink, Code2, Link, FolderGit } from 'lucide-react';
import { ThemeType } from '../types';

interface ProjectsSectionProps {
  theme: ThemeType;
}

interface ProjectDescription {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
}

const PROJECTS_DATA: ProjectDescription[] = [
  {
    id: 'arogyapulse',
    name: 'ArogyaPulse',
    description: 'A complete patient-facing health monitoring ecosystem displaying real-time heart rate, electrocardiogram wave trackers, critical biological telemetry, and smart prompt categorization.',
    techStack: ['React.js', 'Tailwind CSS', 'Java SE', 'MySQL', 'Motion'],
    imageUrl: '../assets/images/arogyapulse_mock_1781033615492.png',
    githubUrl: 'https://github.com/garimamishra4',
    demoUrl: 'https://www.linkedin.com/posts/garimamishra4_godaddy-airobuildathon-airoaibuildathon-ugcPost-7447298970739015680-FUoa/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE6tiYgBIB2Go7KFloaNqloZXuGKzEnICco',
  },
  {
    id: 'netflix-clone',
    name: 'Netflix Clone',
    description: 'A supercharged visual reproduction of the premium movie streaming platform layout featuring real-time trailer popovers, smart search filters, and fluid CSS parallax layers.',
    techStack: ['HTML5', 'Tailwind CSS', 'React.js', 'GSAP Animation', 'TMDB API'],
    imageUrl: '../assets/images/netflix_mock_1781033632121.png',
    githubUrl: 'https://github.com/garimamishra4',
    demoUrl: 'https://nfxclonee.netlify.app/',
  },
  {
    id: 'car-race-tracker',
    name: 'Car Race Tracker',
    description: 'An advanced telemetric lap logging panel for virtual sports tournaments. Generates retro wave racing telemetry, tracks driver laps, fuel states, and charts performance metrics.',
    techStack: ['Python', 'NumPy', 'Jupyter', 'Java', 'MySQL'],
    imageUrl: '../assets/images/carrace_mock_1781033646035.png',
    githubUrl: 'https://github.com/garimamishra4',
    demoUrl: 'https://cartrackrace.netlify.app/',
  },
  {
    id: 'portfolio-2025',
    name: 'Portfolio 2025',
    description: 'A beautifully structured custom personal playground and coding workspace designed using highly stylized canvas features, vector animations, and lightweight assets.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Canva Layouts'],
    imageUrl: '../assets/images/garima_dark_vr_theme_profile_1781039971487.png',
    githubUrl: 'https://github.com/garimamishra4',
    demoUrl: 'https://itsgarimaportfolio.netlify.app/',
  },
];

export default function ProjectsSection({ theme }: ProjectsSectionProps) {
  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Purple / Magenta
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender / Mint

  return (
    <section
      id="projects"
      className="relative py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isRose ? '#120E16' : '#0A0A12',
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: accent2 }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full mr-1 blink" style={{ backgroundColor: accent1 }} />
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
              Showcase Gallery
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-none">
            Selected{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent1}, ${accent2})`,
              }}
            >
              Masterpieces
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-md">
            Clicking any project opens the details page. Hover over a card to activate the parallax 3D tilt engine.
          </p>
        </div>

        {/* 3D Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.id} project={project} accent1={accent1} accent2={accent2} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* Individual Card implementing exact 3D tilt and premium glass reflections */
function ProjectCard({ project, accent1, accent2 }: { project: ProjectDescription; accent1: string; accent2: string; key?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for 3D tilt
  const limitX = useSpring(0, { stiffness: 120, damping: 15 });
  const limitY = useSpring(0, { stiffness: 120, damping: 15 });
  const sheenX = useSpring(0, { stiffness: 120, damping: 15 });
  const sheenY = useSpring(0, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Center coordinates
    const centerX = mouseX - width / 2;
    const centerY = mouseY - height / 2;

    // Calculation tilt angles (Max 12 degrees)
    const tiltX = (centerY / (height / 2)) * -12;
    const tiltY = (centerX / (width / 2)) * 12;

    limitX.set(tiltX);
    limitY.set(tiltY);

    // Sheen reflection position coordinates
    sheenX.set((mouseX / width) * 100);
    sheenY.set((mouseY / height) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    limitX.set(0);
    limitY.set(0);
  };

  const handleContainerClick = () => {
    // Only invoke full container routing click on desktop sizes (>= 768px) to allow smooth mobile exploration
    if (window.innerWidth >= 768) {
      window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
      className="relative rounded-3xl p-[1px] aspect-auto min-h-[360px] md:min-h-0 md:aspect-[4/3] w-full cursor-pointer overflow-hidden border group select-none transition-shadow duration-300"
      style={{
        rotateX: limitX,
        rotateY: limitY,
        transformStyle: 'preserve-3d',
        borderColor: isHovered ? accent2 : 'rgba(255, 255, 255, 0.05)',
        background: 'linear-gradient(135deg, rgba(235,235,235,0.04), rgba(235,235,235,0.01))',
        boxShadow: isHovered
          ? `0 15px 45px rgba(0, 0, 0, 0.4), 0 0 25px ${accent1}25`
          : '0 8px 32px rgba(0,0,0,0.2)',
      }}
    >
      {/* Specular light sheen reflection overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-30"
          style={{
            background: `radial-gradient(circle 300px at ${sheenX.get()}% ${sheenY.get()}%, #FFFFFF 0%, transparent 80%)`,
          }}
        />
      )}

      {/* Main Container */}
      <div className="absolute inset-0 rounded-[23px] overflow-hidden flex flex-col justify-end bg-[#11111E]">
        
        {/* Project Thumbnail Image */}
        <div className="absolute inset-0 z-0">
          {/* Quick Fallback render to prevent issues */}
          <div className="absolute inset-0 bg-[#0F0F1A] flex items-center justify-center">
            <FolderGit size={32} style={{ color: accent2 }} className="animate-pulse" />
          </div>

          <img
            src={project.imageUrl}
            alt={project.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03] select-none"
            onLoad={(e) => {
              const el = e.currentTarget.previousSibling as HTMLDivElement;
              if (el) el.style.display = 'none';
            }}
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/${project.id}/${640}/${480}`;
              const el = e.currentTarget.previousSibling as HTMLDivElement;
              if (el) el.style.display = 'none';
            }}
          />
          {/* Cover vignette darkness */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 z-10 transition-opacity duration-300 group-hover:opacity-95" />
        </div>

        {/* Dynamic Static state (Always shows project title) */}
        <div
          className="relative z-10 p-6 md:p-8 w-full transition-all duration-500 transform group-hover:translate-z-10"
          style={{ transform: 'translateZ(10px)' }}
        >
          <div className="flex items-center justify-between pointer-events-none">
            <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-wide">
              {project.name}
            </h3>
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono font-bold border"
              style={{
                color: accent2,
                borderColor: `${accent2}40`,
                background: `${accent2}10`,
              }}
            >
              EXPLORE
            </span>
          </div>

          {/* Always visible on mobile, transitioning on desktop hover */}
          <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500 mt-0 pointer-events-auto">
            <div className="overflow-hidden transition-all duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 mt-4 md:mt-0 md:group-hover:mt-4">
              
              <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                {project.description}
              </p>

              {/* Technologies Pill list */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[9px] font-mono text-slate-400 bg-white/5 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6">
                
                {/* Live Demo Link */}
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider font-mono flex items-center gap-1.5 text-white border transition-all duration-300"
                  style={{
                    borderColor: `${accent2}50`,
                    background: `${accent2}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = accent2;
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${accent2}10`;
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  <ExternalLink size={11} />
                  LIVE PREVIEW
                </a>

              </div>

            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
