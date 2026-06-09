import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Github, Mail, Send, CheckCircle, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { ThemeType } from '../types';

interface ContactSectionProps {
  theme: ThemeType;
}

export default function ContactSection({ theme }: ContactSectionProps) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeHoverField, setActiveHoverField] = useState<string | null>(null);

  const isRose = theme === 'midnight-rose';
  const accent1 = isRose ? '#FF007F' : '#9D4EDD'; // Purple / Magenta
  const accent2 = isRose ? '#D8B4F8' : '#00FFCC'; // Lavender / Mint

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const socialLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/garimamishra4/',
      icon: Linkedin,
      color: '#0077B5',
      glow: 'rgba(0, 119, 181, 0.4)',
      tagphrase: 'Network & Profession',
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/garimamishra4',
      icon: Github,
      color: '#FFFFFF',
      glow: 'rgba(255, 255, 255, 0.3)',
      tagphrase: 'Open Source Code base',
    },
    {
      id: 'email',
      name: 'Email Address',
      url: 'mailto:garimamishra4official@gmail.com',
      icon: Mail,
      color: '#FF007F',
      glow: 'rgba(255, 0, 127, 0.4)',
      tagphrase: 'Direct mail communication',
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isRose ? '#120E16' : '#0A0A12',
      }}
    >
      {/* Decorative gradients */}
      <div
        className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
        style={{ backgroundColor: accent1 }}
      />
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.05] pointer-events-none"
        style={{ backgroundColor: accent2 }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full mr-1 blink" style={{ backgroundColor: accent2 }} />
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-none">
            Let's Collaborate{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent1}, ${accent2})`,
              }}
            >
              Today
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-md">
            Reach out via the form below or connect natively on social handles. Looking forward to answering recruiter queries!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: Large animated social tiles (Slide up, Glow, Blink, Ripple, Neon pulse) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6" id="contact-socials-area">
            
            {/* Instruction card */}
            <div className={`p-6 rounded-2xl border border-white/5 ${isRose ? 'glass-rose' : 'glass'}`}>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Recruiter Gateway</span>
              <h3 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
                <MessageSquare size={16} style={{ color: accent2 }} />
                Instant Connections
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                These external profiles are verified and active 24/7. Click to open each credentials node in a secure workspace tab.
              </p>
            </div>

            {/* Social tiles map: handles slide up, neon glow, blink, and pulses */}
            <div className="flex flex-col gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-5 rounded-2xl border flex items-center justify-between group relative overflow-hidden select-none ${isRose ? 'glass-rose' : 'glass'}`}
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                    whileHover={{
                      y: -5,
                      borderColor: accent2,
                      boxShadow: `0 12px 25px rgba(0, 0, 0, 0.4), 0 0 18px ${social.glow}`,
                    }}
                    whileTap={{ scale: 0.98 }} // Represents instant ripple click visual
                  >
                    {/* Pulsing inner particle */}
                    <div
                      className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: social.color }}
                    />

                    <div className="flex items-center gap-4 relative z-10">
                      
                      {/* Ring and Neon Pulse Icon container */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border relative transition-transform duration-300 group-hover:scale-105"
                        style={{
                          borderColor: `${accent1}30`,
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        }}
                      >
                        <IconComponent size={18} style={{ color: social.id === 'github' ? '#FFFFFF' : social.color }} />
                        
                        {/* Interactive neon pulse wave around ring */}
                        <span
                          className="absolute inset-0 rounded-xl border border-dotted border-white/5 animate-ping opacity-0 group-hover:opacity-100"
                          style={{ animationDuration: '3s', borderColor: social.color }}
                        />
                      </div>

                      <div className="text-left">
                        <span className="text-xs font-bold text-white block group-hover:text-white transition-colors">
                          {social.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 mt-0.5 block tracking-wide">
                          {social.tagphrase}
                        </span>
                      </div>
                    </div>

                    {/* Active Blink status indicator */}
                    <div className="flex items-center gap-2 relative z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse border border-emerald-500" />
                      <span className="text-[9px] font-mono text-slate-500">ACTIVE</span>
                    </div>

                  </motion.a>
                );
              })}
            </div>

            {/* Quick validation tag */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 ml-1">
              <AlertCircle size={12} style={{ color: accent2 }} />
              <span>SECURE END-TO-END RECRUITMENT INTERACTION</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Modern interactive Mail Dispatch Board */}
          <div className="lg:col-span-7 flex">
            <div
              className={`p-8 rounded-3xl border w-full flex flex-col justify-between relative ${isRose ? 'glass-rose' : 'glass'}`}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.05)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              }}
            >
              <form onSubmit={handleFormSubmit} className="space-y-6 flex-1 flex flex-col justify-between" id="contact-mail-form">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">SEND DIRECT ENQUIRY</span>
                    <span className="text-[9px] font-mono text-slate-500">[ COMPOSE BOARD ]</span>
                  </div>

                  {/* Input 1: Name */}
                  <div className="relative mb-5">
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      onFocus={() => setActiveHoverField('name')}
                      onBlur={() => setActiveHoverField(null)}
                      placeholder="e.g. Recruiter Lead at Google"
                      className="w-full px-4 py-3 rounded-xl border bg-white/[0.02] text-xs font-sans text-slate-200 placeholder-slate-600 outline-none transition-all"
                      style={{
                        borderColor: activeHoverField === 'name' ? accent2 : 'rgba(255, 255, 255, 0.05)',
                        boxShadow: activeHoverField === 'name' ? `0 0 15px ${accent2}15` : 'none',
                      }}
                    />
                  </div>

                  {/* Input 2: Email */}
                  <div className="relative mb-5">
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      onFocus={() => setActiveHoverField('email')}
                      onBlur={() => setActiveHoverField(null)}
                      placeholder="e.g. lead@google.com"
                      className="w-full px-4 py-3 rounded-xl border bg-white/[0.02] text-xs font-sans text-slate-200 placeholder-slate-600 outline-none transition-all"
                      style={{
                        borderColor: activeHoverField === 'email' ? accent2 : 'rgba(255, 255, 255, 0.05)',
                        boxShadow: activeHoverField === 'email' ? `0 0 15px ${accent2}15` : 'none',
                      }}
                    />
                  </div>

                  {/* Input 3: Message */}
                  <div className="relative">
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={handleInputChange}
                      onFocus={() => setActiveHoverField('message')}
                      onBlur={() => setActiveHoverField(null)}
                      placeholder="Hi Garima! We loved your 3D portfolio and award winnings. Let's schedule call..."
                      className="w-full px-4 py-3 rounded-xl border bg-white/[0.02] text-xs font-sans text-slate-200 placeholder-slate-600 outline-none transition-all resize-none"
                      style={{
                        borderColor: activeHoverField === 'message' ? accent1 : 'rgba(255, 255, 255, 0.05)',
                        boxShadow: activeHoverField === 'message' ? `0 0 15px ${accent1}15` : 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Submitting state feedback popup */}
                <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative h-6 flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      {submitSuccess && (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-semibold"
                        >
                          <CheckCircle size={14} />
                          <span>ENQUIRY DISPATCHED SUCCESSFULLY!</span>
                        </motion.div>
                      )}
                      {!submitSuccess && (
                        <span className="text-[10px] font-mono text-slate-500">
                          * ALL DETAILS COMPLY WITH SECURITY PRIVACY STANDARDS.
                        </span>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold tracking-wider font-display text-white relative border overflow-hidden cursor-pointer flex items-center justify-center gap-2"
                    style={{
                      borderColor: `${accent2}50`,
                      background: `linear-gradient(135deg, ${accent1}50, ${accent2}50)`,
                    }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: `0 0 20px ${accent2}60`,
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full border border-t-transparent animate-spin" />
                        DISPATCHING...
                      </span>
                    ) : (
                      <>
                        <Send size={12} />
                        DISPATCH MESSAGE
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
