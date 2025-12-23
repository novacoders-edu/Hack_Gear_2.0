"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from './TiltCard';

const timelineSteps = [
  { 
    date: 'TBA', 
    title: 'Announced', 
    desc: 'Announcement of the hackathon.',
    details: 'Official announcement across all channels. Registration portal opens. Early bird benefits available.',
    status: 'Not Started Yet',
    icon: '📢'
  },
  { 
    date: 'TBA', 
    title: 'PS Submission', 
    desc: 'Problem statement submission deadline.',
    details: 'Submit your innovative problem statements. Our panel will review and select the most impactful challenges.',
    status: 'Not Started Yet',
    icon: '📝'
  },
  { 
    date: 'TBA', 
    title: 'Hackathon Day', 
    desc: '8H code marathon active.',
    details: 'The main event! 8 hours of intense coding, collaboration, and innovation. Meals and refreshments provided.',
    status: 'Not Started Yet',
    icon: '⚡'
  },
  { 
    date: 'TBA', 
    title: 'Mentoring', 
    desc: 'Mentoring sessions with experts.',
    details: 'One-on-one sessions with industry experts. Get guidance on technical challenges and project direction.',
    status: 'Not Started Yet',
    icon: '🎯'
  },
  { 
    date: 'TBA', 
    title: 'Winners', 
    desc: 'Winners announced.',
    details: 'Final presentations, judging, and award ceremony. Prizes distributed to top performers.',
    status: 'Not Started Yet',
    icon: '🏆'
  }
];

export const Timeline = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="timeline" className="py-16 md:py-28 bg-cyber-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-px h-64 bg-gradient-to-b from-transparent via-matrix-green/20 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-px h-64 bg-gradient-to-b from-transparent via-cyan-neon/20 to-transparent animate-pulse delay-1000"></div>
        <motion.div
          className="absolute top-1/3 left-1/4 w-32 h-32 bg-matrix-green/5 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-matrix-green"></span>
            <h2 className="sub-font text-sm font-bold uppercase tracking-[0.5em] text-matrix-green">THE_SEQUENCE</h2>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-matrix-green"></span>
          </div>
          <h3 className="heading-font text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            EVENT LOG_CHAIN
            <span className="text-matrix-green animate-pulse">.</span>
          </h3>
          <p className="sub-font text-base text-neutral-400 max-w-2xl mx-auto mt-4">
            Chronological execution protocol. Click on any phase to reveal more details.
          </p>
        </motion.div>

        {/* Enhanced Timeline Container */}
        <div className="relative">
          {/* Desktop Timeline Line with glow effect */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-matrix-green/30 to-transparent blur-sm"></div>
            
            {/* Animated progress line */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-matrix-green to-cyan-neon"
              initial={{ width: '0%' }}
              whileInView={{ width: '20%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
          
          {/* Mobile Vertical Line */}
          <div className="lg:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-matrix-green/20 to-transparent blur-sm"></div>
          </div>
          
          {/* Timeline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative">
            {timelineSteps.map((step, idx) => {
              const isCurrent = step.status === 'current';
              const isCompleted = step.status === 'completed';
              const isExpanded = expandedIndex === idx;
              const isHovered = hoveredIndex === idx;
              
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group timeline-item"
                  data-status={step.status}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Enhanced Timeline Dot */}
                  <motion.div 
                    className={`
                      absolute left-6 lg:left-1/2 top-8 lg:top-8 
                      -translate-x-1/2 w-5 h-5 lg:w-6 lg:h-6
                      rounded-full z-20 transition-all duration-300 cursor-pointer
                      ${isCurrent 
                        ? 'bg-matrix-green shadow-[0_0_20px_#00FF00] border-2 border-white' 
                        : isCompleted
                        ? 'bg-cyan-neon shadow-[0_0_15px_#00E0FF] border-2 border-cyan-neon'
                        : 'bg-neutral-900 border-2 border-neutral-700'
                      }
                    `}
                    whileHover={{ scale: 1.3 }}
                    onClick={() => toggleExpand(idx)}
                  >
                    <div className={`
                      absolute inset-1 rounded-full transition-all duration-300
                      ${isCurrent 
                        ? 'bg-white animate-pulse' 
                        : isCompleted
                        ? 'bg-cyan-neon'
                        : 'bg-neutral-700'
                      }
                    `}></div>
                  </motion.div>

                  {/* Content Card */}
                  <TiltCard 
                    className="ml-14 lg:ml-0 lg:mt-12"
                    glowColor={isCurrent ? '#00FF41' : '#00E0FF'}
                    intensity={10}
                  >
                    <motion.div 
                      className={`
                        p-5 lg:p-6 rounded-xl border transition-all duration-300 cursor-pointer
                        ${isCurrent
                          ? 'border-matrix-green/50 bg-matrix-green/5 shadow-[0_0_30px_rgba(0,255,0,0.1)]'
                          : isCompleted
                          ? 'border-cyan-neon/30 bg-cyan-neon/5'
                          : 'border-neutral-800 bg-neutral-900/50'
                        }
                        ${isHovered ? 'border-matrix-green/70 bg-matrix-green/10 shadow-[0_0_40px_rgba(0,255,0,0.15)]' : ''}
                      `}
                      onClick={() => toggleExpand(idx)}
                      whileHover={{ y: -5 }}
                    >
                      {/* Icon */}
                      <div className="text-2xl mb-3">{step.icon}</div>
                      
                      {/* Status Indicator */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`
                          sub-font text-xs font-bold px-3 py-1 rounded-full
                          ${isCurrent
                            ? 'bg-matrix-green/20 text-matrix-green border border-matrix-green/30'
                            : isCompleted
                            ? 'bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/30'
                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                          }
                        `}>
                          {step.status.toUpperCase().replace(' ', '_')}
                        </span>
                        
                        <span className="sub-font text-xs font-mono text-neutral-500">
                          P_{idx + 1}
                        </span>
                      </div>
                      
                      {/* Date */}
                      <div className="mb-4">
                        <div className="sub-font text-xs font-bold text-cyan-neon tracking-widest">
                          [{step.date}]
                        </div>
                      </div>

                      {/* Title and Description */}
                      <h4 className={`
                        heading-font text-xl lg:text-2xl font-black mb-3
                        ${isCurrent ? 'text-white' : 'text-neutral-300'}
                      `}>
                        {step.title}
                      </h4>
                      
                      <p className="sub-font text-sm text-neutral-400 uppercase tracking-tight leading-relaxed">
                        {step.desc}
                      </p>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-neutral-800">
                              <p className="sub-font text-sm text-neutral-300 leading-relaxed">
                                {step.details}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand indicator */}
                      <div className="mt-4 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="text-neutral-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
          
          {/* Timeline Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-neutral-800"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="sub-font text-sm text-neutral-500">
                <span className="text-matrix-green">●</span> CURRENT_PHASE
                <span className="mx-4">|</span>
                <span className="text-cyan-neon">●</span> COMPLETED
                <span className="mx-4">|</span>
                <span className="text-neutral-600">●</span> PENDING
              </div>
              
              <p className="sub-font text-xs text-neutral-600 italic">
                Click on any phase card to expand details
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
