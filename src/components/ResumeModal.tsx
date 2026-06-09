import { motion } from 'motion/react';
import { X, Mail, Phone, Linkedin, GraduationCap, Award, Briefcase, Code, FileText, BookOpen, Star, Printer } from 'lucide-react';
import { ThemeType } from '../types';

interface ResumeModalProps {
  theme: ThemeType;
  isOpen: boolean;
  onClose: () => void;
  key?: string;
}

export default function ResumeModal({ theme, isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Magenta vs Purple
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender vs Mint

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dark Blur Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`relative w-full max-w-4xl h-[90vh] md:h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 border ${
          isRose ? 'bg-[#120E16]/95 border-pink-500/20' : 'bg-[#0A0A12]/95 border-[#9D4EDD]/20'
        }`}
      >
        {/* Interactive Top Ribbon Controls */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isRose ? 'border-pink-500/10 bg-[#1A121E]' : 'border-white/5 bg-[#111122]'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-amber-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">garima_mishra_resume.pdf</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Print Friendly Button */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all text-slate-300 border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] cursor-pointer"
            >
              <Printer size={13} style={{ color: accent2 }} />
              <span className="hidden xs:inline">Print / Save PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 px-2.5 rounded-lg text-slate-400 hover:text-white border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] transition-all flex items-center gap-1 text-xs font-mono cursor-pointer"
            >
              <X size={14} />
              <span>Esc</span>
            </button>
          </div>
        </div>

        {/* Scrollable Printable resume sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-12 print-area" id="resume-printable-content">
          <div className="max-w-3xl mx-auto text-slate-300 font-sans leading-relaxed">
            
            {/* Printable Custom Banner Header */}
            <div className="text-center md:text-left border-b border-white/5 pb-6 mb-8 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                  Garima Mishra
                </h1>
                <p className="text-sm font-mono mt-1" style={{ color: accent2 }}>
                  Pre-final year undergraduate student
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Department of Computer Science & Engineering
                </p>
              </div>

              {/* Contact parameters with active icons */}
              <div className="flex flex-col gap-1.5 text-xs text-slate-400 font-mono items-center md:items-end">
                <a href="mailto:garimamishra4official@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Mail size={12} style={{ color: accent1 }} />
                  garimamishra4official@gmail.com
                </a>
                <span className="flex items-center gap-1.5">
                  <Phone size={12} style={{ color: accent1 }} />
                  (+91)9699724575
                </span>
                <a href="https://linkedin.com/in/garimamishra4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Linkedin size={12} style={{ color: accent1 }} />
                  linkedin.com/in/garimamishra4
                </a>
              </div>
            </div>

            {/* GRID OF RESUME SECTIONS */}
            <div className="space-y-8">
              
              {/* 1. ACADEMIC QUALIFICATIONS */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider font-mono text-white mb-4 flex items-center gap-2 uppercase">
                  <GraduationCap size={16} style={{ color: accent2 }} />
                  Academic Qualifications
                </h3>
                <div className="overflow-x-auto w-full">
                  <table className={`w-full text-xs text-left border-collapse ${isRose ? 'bg-[#18121f]/50' : 'bg-[#0E0E1A]/50'} rounded-xl overflow-hidden`}>
                    <thead>
                      <tr className="border-b border-white/5 text-slate-400 font-mono bg-white/[0.01]">
                        <th className="p-3">Year</th>
                        <th className="p-3">Degree / Certificate</th>
                        <th className="p-3">Institute</th>
                        <th className="p-3 text-right">CGPA / %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="p-3 font-mono text-slate-400">2027</td>
                        <td className="p-3 font-semibold text-white">B.Tech (CSE)</td>
                        <td className="p-3 text-slate-300">G.L.Bajaj Group Of Institutions, Mathura</td>
                        <td className="p-3 text-right font-bold text-emerald-400">7.73*</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-slate-400">2023</td>
                        <td className="p-3 font-semibold text-white">CBSE (XII)</td>
                        <td className="p-3 text-slate-300">KV Chero Salempur Deoria, Uttar Pradesh</td>
                        <td className="p-3 text-right font-bold" style={{ color: accent2 }}>79.8%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-slate-400">2021</td>
                        <td className="p-3 font-semibold text-white">CBSE (X)</td>
                        <td className="p-3 text-slate-300">KV RHE Kirkee, Pune, Maharashtra</td>
                        <td className="p-3 text-right font-bold" style={{ color: accent2 }}>90.8%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. ACHIEVEMENTS */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider font-mono text-white mb-3 flex items-center gap-2 uppercase">
                  <Award size={16} style={{ color: accent2 }} />
                  Achievements
                </h3>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2 text-slate-300">
                    <span className="text-amber-400 mt-0.5">🏆</span>
                    <span>
                      <strong className="text-white">Secured First Position</strong> in IBM Hackathon (<strong className="text-white">Prarambh 2025</strong>)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <span className="text-amber-400 mt-0.5">🏆</span>
                    <span>
                      <strong className="text-white">Secured First Position</strong> in CT Solution Hackathon
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <span className="text-blue-400 mt-0.5">⚡</span>
                    <span>
                      Qualified <strong className="text-white">Round 1 Yukti Innovation</strong> Regional Challenge 2025 (evaluation for next round going on)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <span className="text-blue-400 mt-0.5">⚡</span>
                    <span>
                      Qualified <strong className="text-white">Round 1 Adobe India Hackathon 2025</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <span className="text-pink-400 mt-0.5">⭐</span>
                    <span>
                      Ranked in <strong className="text-white">Top 25%</strong> in Machine Learning &amp; Data Analysis course conducted by Consulting &amp; Analytics Club, IIT Guwahati
                    </span>
                  </li>
                </ul>
              </div>

              {/* 3. WORK EXPERIENCE */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider font-mono text-white mb-3 flex items-center gap-2 uppercase">
                  <Briefcase size={16} style={{ color: accent2 }} />
                  Work Experience
                </h3>
                <div className={`p-4 rounded-xl border border-white/5 ${isRose ? 'bg-[#18121f]/30' : 'bg-[#0E0E1A]/30'}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">VisiARise</h4>
                      <p className="text-[11px] font-mono" style={{ color: accent1 }}>Intern, Web Developer</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded">Nov 24 – May 25</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 pl-1">
                    <li>Developed and designed polished interfaces prioritizing pixel-perfect UI/UX consistency, improving metrics for interactivity.</li>
                    <li>Sourced accessibility audits and responsive solutions to optimize viewport adaptability across all desktop/mobile layouts.</li>
                    <li>Collaborated tightly with core team engineers to architect clean web structures.</li>
                  </ul>
                </div>
              </div>

              {/* 4. KEY PROJECTS */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider font-mono text-white mb-3 flex items-center gap-2 uppercase">
                  <FileText size={16} style={{ color: accent2 }} />
                  Key Projects
                </h3>
                <div className="space-y-4">
                  {/* Project 1 */}
                  <div className={`p-4 rounded-xl border border-white/5 ${isRose ? 'bg-[#18121f]/30' : 'bg-[#0E0E1A]/30'}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Breast Cancer Detection Model</h4>
                        <p className="text-[10px] text-slate-400 font-mono">Mentor: Prof. Tanya Shrivastva, CSE, GL Bajaj</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded">Dec 24 – Mar 25</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 pl-1">
                      <li>Engineered highly accurate medical decision support with Machine Learning classification on clinical biomedical attributes.</li>
                      <li>Spearheaded systematic pre-processing, complex feature selection algorithms, and cross-evaluation parameters.</li>
                      <li>Configured virtual simulation loops for quadcopter control scripts with SITL ArduPilot &amp; Mission Planner platforms.</li>
                    </ul>
                  </div>

                  {/* Project 2 */}
                  <div className={`p-4 rounded-xl border border-white/5 ${isRose ? 'bg-[#18121f]/30' : 'bg-[#0E0E1A]/30'}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Netflix Clone Client</h4>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded">May 24 – Jun 24</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 pl-1">
                      <li>Refined a responsive web layout styled via Tailwind CSS, rendering dynamic assets from TMDB APIs seamlessly.</li>
                      <li>Structured custom slider mechanisms, scroll-triggered visual responses, and immersive hover card transitions.</li>
                      <li>Maintained highly reusable structural UI modules (Banners, Rows) minimizing render overheads.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 5. TECHNICAL SKILLS */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider font-mono text-white mb-3 flex items-center gap-2 uppercase">
                  <Code size={16} style={{ color: accent2 }} />
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                    <span className="font-mono text-slate-400 block mb-1 uppercase text-[10px]">Languages &amp; Core</span>
                    <p className="text-white font-semibold">C, Python, Java, JavaScript, OOP, Data Structures</p>
                  </div>
                  <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                    <span className="font-mono text-slate-400 block mb-1 uppercase text-[10px]">Frontend Tech</span>
                    <p className="text-white font-semibold">HTML5, ReactJS, GSAP, CSS3, Tailwind CSS</p>
                  </div>
                  <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                    <span className="font-mono text-slate-400 block mb-1 uppercase text-[10px]">Databases</span>
                    <p className="text-white font-semibold">MySQL, Database Management Systems (DBMS)</p>
                  </div>
                  <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                    <span className="font-mono text-slate-400 block mb-1 uppercase text-[10px]">AI/ML &amp; Tools</span>
                    <p className="text-white font-semibold">Generative AI, Prompt Engineering, NumPy, Git, Figma</p>
                  </div>
                </div>
              </div>

              {/* 6. POSITIONS OF RESPONSIBILITY */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider font-mono text-white mb-3 flex items-center gap-2 uppercase">
                  <Star size={16} style={{ color: accent2 }} />
                  Positions of Responsibility
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="pl-3 border-l-2 border-pink-500/30">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-white">Frontend Reviewer at Fest Competition</strong>
                      <span className="text-[10px] font-mono text-slate-500">Apr 24</span>
                    </div>
                    <p className="text-slate-400">Evaluated student designs, shortlisting top tech products based on layout responsive fluidity and visual consistency guidelines.</p>
                  </div>
                  <div className="pl-3 border-l-2 border-pink-500/30">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-white">Coordinator of Cultural Committee</strong>
                      <span className="text-[10px] font-mono text-slate-500">May 24 – Nov 24</span>
                    </div>
                    <p className="text-slate-400">Head coordinator hosting administrative relations, managing schedules, and facilitating expert interactive assemblies.</p>
                  </div>
                </div>
              </div>

              {/* 7. RELEVANT COURSEWORK */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider font-mono text-white mb-3 flex items-center gap-2 uppercase">
                  <BookOpen size={16} style={{ color: accent2 }} />
                  Relevant Coursework
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">• Data Structures &amp; Algorithms</div>
                  <div className="flex items-center gap-1.5">• OOP Using Java</div>
                  <div className="flex items-center gap-1.5">• Design &amp; Analysis of Algo</div>
                  <div className="flex items-center gap-1.5">• Operating Systems</div>
                  <div className="flex items-center gap-1.5">• Database Management Systems</div>
                  <div className="flex items-center gap-1.5">• Software Engineering</div>
                  <div className="flex items-center gap-1.5">• Computer Organization</div>
                  <div className="flex items-center gap-1.5">• Big Data Analytics</div>
                  <div className="flex items-center gap-1.5">• Machine Learning Concepts</div>
                </div>
              </div>

              {/* 8. EXTRA-CURRICULAR ACTIVITIES */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider font-mono text-white mb-3 flex items-center gap-2 uppercase">
                  <Star size={16} style={{ color: accent2 }} />
                  Extra-Curriculars
                </h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                  <li><strong className="text-slate-300">Fashion Show First Place winner</strong> in Annual Festival Toonav 2024.</li>
                  <li><strong className="text-slate-300">Continuous 1st Position</strong> in school-level Computer Science Tournament quizzing series.</li>
                  <li><strong className="text-slate-300">Skit Performance Champion</strong> in Annual Festival Toonav.</li>
                  <li>Represented school assemblies at District levels.</li>
                </ul>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer Ribbon */}
        <div className={`p-4 border-t text-center text-[10px] font-mono text-slate-500 flex justify-between items-center ${
          isRose ? 'border-pink-500/10 bg-[#1A121E]' : 'border-white/5 bg-[#111122]'
        }`}>
          <span>© 1/1 Page | Garima Mishra Portfolio 2026</span>
          <span className="hidden sm:inline">Optimized for Web &amp; print tracking</span>
        </div>
      </motion.div>
    </div>
  );
}
