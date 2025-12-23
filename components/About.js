"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from './TiltCard';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({
    nodes: 0,
    agents: 0,
    bounty: 0
  });
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('protocol');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const animateNumbers = () => {
    const targets = { nodes: 1, agents: 10, bounty: 0 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const target = targets[key];
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepDuration);
    });
  };

  const stats = [
    { 
      val: animatedValues.nodes, 
      suffix: '+', 
      label: 'NODES_LIVE', 
      color: 'text-cyan-neon',
      description: 'Active neural connections across global clusters',
      icon: '⚡',
      gradient: 'from-cyan-neon/20 to-blue-500/20'
    },
    { 
      val: '8H', 
      label: 'LONG', 
      color: 'text-purple-electric',
      description: 'Continuous protocol synchronization required',
      icon: '⏱️',
      gradient: 'from-purple-electric/20 to-pink-500/20'
    },
    { 
      val: animatedValues.agents, 
      label: 'Mentors', 
      color: 'text-matrix-green',
      description: 'Field operatives ready for deployment',
      icon: '🕶️',
      gradient: 'from-matrix-green/20 to-emerald-500/20'
    },
    { 
      val: 'TBA', 
      prefix: '₹', 
      label: 'DATA_BOUNTY', 
      color: 'text-white',
      description: 'Total reward pool for protocol disruption',
      icon: '💰',
      gradient: 'from-white/10 to-neutral-500/10'
    }
  ];

  return (
    <section id="protocol" className="relative overflow-hidden py-16 md:py-28 bg-cyber-dark">
      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, #00E0FF 1px, transparent 1px),
                           linear-gradient(to bottom, #00E0FF 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Animated Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-neon to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-electric to-transparent animate-pulse delay-1000"></div>
      
      {/* Corner Accents */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-cyan-neon/30"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-purple-electric/30"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-matrix-green/30"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-cyan-neon/30"></div>

      {/* Animated Corner SVG */}
      <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 pointer-events-none">
        <svg 
          viewBox="0 0 100 100" 
          className="text-cyan-neon w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] animate-spin-slow"
        >
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeDasharray="5 5"
            className="animate-pulse"
          />
          <path 
            d="M50 10 L50 90 M10 50 L90 50" 
            stroke="currentColor" 
            strokeWidth="0.5"
          />
          <path
            d="M20 20 L80 80 M80 20 L20 80"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeOpacity="0.5"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column - Content */}
          <div className="relative">
            {/* Header with animated lines */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 md:gap-4 mb-6 md:mb-8 group/header"
            >
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-cyan-neon to-transparent group-hover/header:w-16 transition-all duration-500"></div>
              <h2 className="sub-font text-xs md:text-sm font-bold uppercase tracking-[0.5em] text-cyan-neon neon-text-cyan">
                PROTOCOL_INFO
              </h2>
              <div className="h-px w-8 md:w-12 bg-gradient-to-l from-cyan-neon to-transparent group-hover/header:w-16 transition-all duration-500"></div>
            </motion.div>

            {/* Main Title */}
            <div className="mb-8 md:mb-12">
              <motion.h3 
                className="heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-[1.1] tracking-tighter"
              >
                <motion.span 
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  BREAK CODE.
                </motion.span>
                <br />
                <motion.span 
                  className="inline-block text-purple-electric neon-text-purple"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  BUILD WORLDS.
                </motion.span>
              </motion.h3>
            </div>

            {/* Description */}
            <div className="space-y-6 mb-10 md:mb-12">
              <motion.p 
                className="sub-font text-lg md:text-xl text-neutral-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                HACKGEAR 2.0 is an 8-hour offline hackathon designed for beginners and innovators ready to push boundaries.
              </motion.p>
              
              <motion.p 
                className="sub-font text-base md:text-lg text-neutral-500 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Join the next generation of architects and decrypt the future with cutting-edge technology and expert mentorship.
              </motion.p>
            </div>

            {/* Terminal Box */}
            <motion.div 
              className="p-5 md:p-7 border border-neutral-800 bg-black/60 backdrop-blur-sm rounded-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-matrix-green"></div>
                </div>
                <div className="sub-font text-xs md:text-sm text-neutral-500 font-mono">terminal://hackgear-v2</div>
              </div>
              
              {/* Terminal content */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-matrix-green sub-font text-sm md:text-base font-bold font-mono">&gt;</span>
                  <motion.p 
                    className="text-matrix-green sub-font text-base md:text-lg font-bold font-mono tracking-wider"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    BOOTING VIRTUAL_ENVIRONMENT...
                  </motion.p>
                </div>
                <p className="sub-font text-neutral-400 text-sm md:text-base leading-relaxed font-mono pl-4 md:pl-6">
                  Access granted to global infrastructure, high-fidelity mentors, and the most advanced neural tooling available to civilians.
                </p>
                <div className="flex items-center gap-2 md:gap-3 pl-4 md:pl-6 mt-4">
                  <motion.div 
                    className="w-2 h-2 md:w-3 md:h-3 bg-cyan-neon rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="sub-font text-xs md:text-sm text-cyan-neon font-mono">[STATUS]: SYSTEMS_NOMINAL</span>
                </div>
              </div>
              
              {/* Terminal cursor */}
              <div className="absolute bottom-4 right-4 w-2 h-4 md:h-5 bg-matrix-green animate-blink"></div>
            </motion.div>

            {/* CTA Button */}
            <motion.button 
              className="mt-8 md:mt-12 px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-cyan-neon/20 to-purple-electric/20 border border-cyan-neon/40 text-white sub-font font-bold uppercase tracking-widest text-sm md:text-base hover:shadow-[0_0_30px_rgba(0,224,255,0.3)] hover:border-cyan-neon transition-all duration-500 group/btn relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">INITIATE_SYNC</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-neon/10 via-transparent to-cyan-neon/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.7 }}
              />
            </motion.button>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className={`relative ${i % 2 !== 0 ? 'sm:translate-y-8 lg:translate-y-12' : ''}`}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <TiltCard glowColor={stat.color === 'text-cyan-neon' ? '#00E0FF' : stat.color === 'text-purple-electric' ? '#4D00FF' : '#00FF41'} intensity={10}>
                  {/* Card Container */}
                  <div className={`
                    p-6 md:p-8 rounded-xl border-2 backdrop-blur-sm relative overflow-hidden
                    ${hoveredStat === i 
                      ? 'border-cyan-neon shadow-[0_0_40px_rgba(0,224,255,0.3)]' 
                      : 'border-neutral-800 hover:border-purple-electric/50'
                    }
                    bg-gradient-to-br from-black/80 to-neutral-900/30
                    transition-all duration-300
                  `}>
                    
                    {/* Animated background */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredStat === i ? 1 : 0 }}
                    />

                    {/* Content */}
                    <div className="relative">
                      {/* Icon */}
                      <motion.div 
                        className="text-2xl md:text-3xl mb-3 md:mb-4"
                        animate={hoveredStat === i ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {stat.icon}
                      </motion.div>
                      
                      {/* Value with animation */}
                      <div className="flex items-baseline gap-1 mb-1 md:mb-2">
                        {stat.prefix && (
                          <span className="heading-font text-lg md:text-xl font-black text-neutral-400">
                            {stat.prefix}
                          </span>
                        )}
                        <motion.h4 
                          className={`heading-font text-3xl md:text-4xl lg:text-5xl font-black ${stat.color}`}
                          animate={hoveredStat === i ? { scale: 1.05 } : { scale: 1 }}
                        >
                          {typeof stat.val === 'number' ? stat.val.toLocaleString() : stat.val}
                        </motion.h4>
                        {stat.suffix && (
                          <span className={`heading-font text-lg md:text-xl font-black ${stat.color}`}>
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                      
                      {/* Label */}
                      <p className={`sub-font text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3 md:mb-4 transition-colors ${hoveredStat === i ? 'text-cyan-neon' : 'text-neutral-500'}`}>
                        {stat.label}
                      </p>
                      
                      {/* Description (appears on hover) */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: hoveredStat === i ? 'auto' : 0,
                          opacity: hoveredStat === i ? 1 : 0
                        }}
                        className="overflow-hidden"
                      >
                        <p className="sub-font text-xs text-neutral-400 pt-3 border-t border-neutral-800/50">
                          {stat.description}
                        </p>
                      </motion.div>
                      
                      {/* Progress line */}
                      <motion.div 
                        className="mt-4 h-0.5 bg-gradient-to-r from-cyan-neon to-purple-electric origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredStat === i ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div 
          className="mt-16 md:mt-24 pt-8 border-t border-neutral-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'OPERATIONS_ACTIVE', value: '24/7', color: 'text-cyan-neon' },
              { label: 'SUCCESS_RATE', value: '98.7%', color: 'text-matrix-green' },
              { label: 'RESPONSE_TIME', value: '<2ms', color: 'text-purple-electric' },
              { label: 'UPTIME', value: '99.99%', color: 'text-white' }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className={`heading-font text-xl md:text-2xl font-black ${item.color} mb-1 md:mb-2`}>
                  {item.value}
                </div>
                <div className="sub-font text-xs text-neutral-500 uppercase tracking-widest">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
