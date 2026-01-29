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
  const terminalRef = useRef(null);
  const scanLineRef = useRef(null);

  // Enhanced cyberpunk animation for scanning line
  useEffect(() => {
    const interval = setInterval(() => {
      if (scanLineRef.current) {
        scanLineRef.current.style.top = '0%';
        scanLineRef.current.style.transition = 'none';
        scanLineRef.current.offsetHeight; // Trigger reflow
        scanLineRef.current.style.transition = 'top 2s linear';
        scanLineRef.current.style.top = '100%';
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('protocol');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const animateNumbers = () => {
    const targets = { nodes: 50, agents: 10 , bounty: 25000 };
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
    // {
    //   val: animatedValues.nodes,
    //   suffix: '+',
    //   label: 'NODES_LIVE',
    //   color: 'text-cyan-neon',
    //   description: 'Active neural connections across global clusters',
    //   icon: '⚡',
    //   gradient: 'from-cyan-neon/20 to-blue-500/20',
    //   pulse: true
    // },
    {
      val: '8H',
      label: 'HACK_DURATION',
      color: 'text-purple-electric',
      description: 'Continuous protocol synchronization required',
      icon: '⏱️',
      gradient: 'from-purple-electric/20 to-pink-500/20',
      pulse: false
    },
    {
      val: animatedValues.agents,
      suffix: '+',
      label: 'MENTORS',
      color: 'text-matrix-green',
      description: 'Field operatives ready for deployment',
      icon: '🕶️',
      gradient: 'from-matrix-green/20 to-emerald-500/20',
      pulse: true
    },
    {
      val: animatedValues.bounty,
      prefix: '₹',
      label: 'TOTAL_BOUNTY',
      color: 'text-yellow-400',
      description: 'Total reward pool for protocol disruption',
      icon: '💰',
      gradient: 'from-yellow-400/20 to-orange-500/20',
      pulse: true
    }
  ];

  return (
    <section id="protocol" className="relative overflow-hidden py-16 md:py-28 bg-cyber-dark">
      {/* Enhanced Animated Background Grid with moving particles */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(to right, #00E0FF 1px, transparent 1px),
                             linear-gradient(to bottom, #00E0FF 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-cyan-neon rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              x: [null, Math.random() * 100 + '%'],
              y: [null, Math.random() * 100 + '%'],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}

        {/* Scanning line */}
        <div
          ref={scanLineRef}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-neon to-transparent z-0"
          style={{ top: '100%' }}
        />
      </div>

      {/* Enhanced Animated Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-neon to-transparent">
        <motion.div
          className="h-full w-20 bg-cyan-neon"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-electric to-transparent">
        <motion.div
          className="h-full w-20 bg-purple-electric"
          animate={{
            x: ['200%', '-100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
            ease: "linear"
          }}
        />
      </div>

      {/* Enhanced Corner Accents with animation */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-cyan-neon/30">
        <motion.div
          className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-neon"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-purple-electric/30">
        <motion.div
          className="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple-electric"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-matrix-green/30">
        <motion.div
          className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-matrix-green"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-cyan-neon/30">
        <motion.div
          className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-neon"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </div>

      {/* Enhanced Animated Corner SVG with multiple layers */}
      <div className="absolute top-0 right-0 p-8 md:p-12 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          className="text-cyan-neon w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="5 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="opacity-10"
          />
          <motion.path
            d="M50 10 L50 90 M10 50 L90 50"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="opacity-20"
          />
          <motion.path
            d="M20 20 L80 80 M80 20 L20 80"
            stroke="currentColor"
            strokeWidth="0.3"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="opacity-10"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HACKGEAR Description Section - New Addition */}
        <motion.div
          className="mb-16 md:mb-24 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-neon via-purple-electric to-matrix-green blur-lg opacity-30"></div>
            <h1 className="heading-font text-5xl md:text-7xl lg:text-8xl font-black relative bg-clip-text text-transparent bg-gradient-to-r from-cyan-neon via-purple-electric to-matrix-green tracking-tighter">
              HACKGEAR 2.0
            </h1>
          </div>

          <motion.div
            className="max-w-4xl mx-auto mt-8"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="p-6 md:p-8 border border-neutral-800/50 bg-black/40 backdrop-blur-sm rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon/5 via-purple-electric/5 to-matrix-green/5"></div>
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    className="w-2 h-2 bg-cyan-neon rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="sub-font text-cyan-neon font-bold uppercase tracking-widest text-sm">
                    MISSION_BRIEF
                  </span>
                  <motion.div
                    className="w-2 h-2 bg-matrix-green rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>

                <p className="sub-font text-lg md:text-xl text-neutral-300 leading-relaxed mb-4">
                  <span className="text-cyan-neon font-bold">HACKGEAR 2.0</span> is an intensive 8-hour offline hackathon designed for pioneers ready to transcend conventional boundaries. Operating beyond the standard hackathon paradigm, we provide direct access to cutting-edge tooling, high-fidelity mentorship from industry operatives, and an infrastructure built for serious innovation.
                </p>

                <p className="sub-font text-base md:text-lg text-neutral-400 leading-relaxed">
                  This is not just another coding competition. This is a <span className="text-purple-electric font-bold">protocol disruption event</span> where you'll collaborate with the brightest minds, decrypt complex challenges, and architect solutions that could redefine entire industries. The future doesn't wait for permission - it gets built by those bold enough to break the code first.
                </p>

                <div className="mt-6 pt-6 border-t border-neutral-800/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'Tech_Access', desc: 'Direct interface with systems', color: 'cyan' },
                      { title: 'FIELD_MENTORS', desc: 'Operatives from top tech organizations', color: 'purple' },
                      { title: 'REAL_WORLD_IMPACT', desc: 'Solutions with tangible industry applications', color: 'green' }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="p-4 border border-neutral-800 rounded-lg bg-black/30"
                        whileHover={{ scale: 1.02, borderColor: item.color === 'cyan' ? '#00E0FF' : item.color === 'purple' ? '#4D00FF' : '#00FF41' }}
                      >
                        <h4 className={`sub-font text-sm font-bold uppercase tracking-widest mb-2 ${item.color === 'cyan' ? 'text-cyan-neon' :
                            item.color === 'purple' ? 'text-purple-electric' :
                              'text-matrix-green'
                          }`}>
                          {item.title}
                        </h4>
                        <p className="sub-font text-xs text-neutral-400">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">
          {/* Left Column - Protocol Information */}
          <div className="relative">
            {/* Header with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 md:gap-4 mb-6 md:mb-8 group/header relative"
            >
              <motion.div
                className="h-px w-8 md:w-12 bg-gradient-to-r from-cyan-neon to-transparent"
                animate={{ width: ['2rem', '4rem', '2rem'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="sub-font text-xs md:text-sm font-bold uppercase tracking-[0.5em] text-cyan-neon neon-text-cyan">
                PROTOCOL_SPECS
              </h2>
              <motion.div
                className="h-px w-8 md:w-12 bg-gradient-to-l from-cyan-neon to-transparent"
                animate={{ width: ['2rem', '4rem', '2rem'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </motion.div>

            {/* Main Title with enhanced typography */}
            <div className="mb-8 md:mb-12">
              <motion.h3
                className="heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-[1.1] tracking-tighter"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ staggerChildren: 0.1 }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  BREAK
                </motion.span>
                <motion.span
                  className="inline-block text-cyan-neon neon-text-cyan ml-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  CODE.
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  BUILD
                </motion.span>
                <motion.span
                  className="inline-block text-purple-electric neon-text-purple ml-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  WORLDS.
                </motion.span>
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                className="sub-font text-xl md:text-2xl text-neutral-400 font-light tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The architecture of tomorrow demands today's disruption
              </motion.p>
            </div>

            {/* Enhanced Terminal Box */}
            <motion.div
              ref={terminalRef}
              className="p-6 md:p-8 border-2 border-neutral-800 bg-black/80 backdrop-blur-xl rounded-xl relative overflow-hidden group/terminal"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ borderColor: '#00E0FF', boxShadow: '0 0 40px rgba(0, 224, 255, 0.2)' }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,224,255,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(77,0,255,0.1),transparent_50%)]"></div>
              </div>

              {/* Terminal header */}
              <div className="flex items-center justify-between mb-6 md:mb-8 relative">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <motion.div
                      className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.div
                      className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-matrix-green"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                  </div>
                  <span className="sub-font text-sm md:text-base text-neutral-400 font-mono">root@hackgear:~</span>
                </div>
                <div className="sub-font text-xs md:text-sm text-neutral-600 font-mono">[v2.0.1]</div>
              </div>

              {/* Terminal content with typing animation */}
              <div className="space-y-3 md:space-y-4 relative">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-matrix-green sub-font text-base md:text-lg font-bold font-mono">$</span>
                  <motion.div
                    className="text-cyan-neon sub-font text-base md:text-lg font-bold font-mono tracking-wider overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, delay: 0.7 }}
                  >
                    <span className="inline-block whitespace-nowrap">
                      ./vit/nova_coders/hackgear/v2
                    </span>
                  </motion.div>
                </div>

                <div className="pl-4 md:pl-6 space-y-2">
                  <motion.p
                    className="sub-font text-neutral-300 text-sm md:text-base leading-relaxed font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <span className="text-matrix-green">✓</span> Access granted to global infrastructure
                  </motion.p>
                  <motion.p
                    className="sub-font text-neutral-300 text-sm md:text-base leading-relaxed font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    <span className="text-matrix-green">✓</span> High-fidelity mentors online
                  </motion.p>
                  <motion.p
                    className="sub-font text-neutral-300 text-sm md:text-base leading-relaxed font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    <span className="text-matrix-green">✓</span> Advanced tooling deployed
                  </motion.p>
                </div>

                <div className="flex items-center gap-2 md:gap-3 pl-4 md:pl-6 mt-4 pt-4 border-t border-neutral-800/50">
                  <motion.div
                    className="w-2 h-2 md:w-3 md:h-3 bg-cyan-neon rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="sub-font text-sm md:text-base text-cyan-neon font-mono font-bold">
                    [STATUS]: READY_FOR_DEPLOYMENT
                  </span>
                </div>
              </div>

              {/* Enhanced Terminal cursor */}
              <motion.div
                className="absolute bottom-6 right-6 w-3 h-5 bg-matrix-green"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>

            {/* Enhanced CTA Button */}
            <motion.button
              className="mt-8 md:mt-12 px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-cyan-neon/10 via-purple-electric/10 to-cyan-neon/10 border-2 border-cyan-neon/30 text-white sub-font font-bold uppercase tracking-widest text-sm md:text-base relative overflow-hidden group/btn"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(0, 224, 255, 0.4)',
                borderColor: '#00E0FF'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon/0 via-cyan-neon/10 to-cyan-neon/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span>INITIATE_SYNC</span>
                <motion.svg
                  className="w-5 h-5"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </span>
            </motion.button>
          </div>



          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className={`relative ${i % 2 !== 0 ? 'sm:translate-y-8 lg:translate-y-12' : ''}`}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <TiltCard
                  glowColor={
                    stat.color === 'text-cyan-neon' ? '#00E0FF' :
                      stat.color === 'text-purple-electric' ? '#4D00FF' :
                        stat.color === 'text-matrix-green' ? '#00FF41' : '#FFD700'
                  }
                  intensity={15}
                >
                  {/* Card Container */}
                  <div className={`
          p-6 md:p-8 rounded-xl border-2 backdrop-blur-xl relative overflow-hidden h-full
          ${hoveredStat === i
                      ? 'border-cyan-neon shadow-[0_0_50px_rgba(0,224,255,0.4)]'
                      : 'border-neutral-800/50 hover:border-purple-electric/50'
                    }
          bg-gradient-to-br from-black/90 to-neutral-900/40
          transition-all duration-500
          group/card
        `}>

                    {/* Animated background with particle effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredStat === i ? 0.2 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Floating particles inside card */}
                      {stat.pulse && [...Array(8)].map((_, j) => (
                        <motion.div
                          key={j}
                          className="absolute w-[2px] h-[2px] rounded-full"
                          style={{
                            background: stat.color === 'text-cyan-neon' ? '#00E0FF' :
                              stat.color === 'text-purple-electric' ? '#4D00FF' :
                                stat.color === 'text-matrix-green' ? '#00FF41' : '#FFD700'
                          }}
                          initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            opacity: 0
                          }}
                          animate={{
                            x: [null, Math.random() * 100 + '%'],
                            y: [null, Math.random() * 100 + '%'],
                            opacity: hoveredStat === i ? [0, 1, 0] : 0
                          }}
                          transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col">
                      {/* Icon with enhanced animation */}
                      <div className="mb-4 md:mb-6">
                        <motion.div
                          className="text-3xl md:text-4xl"
                          animate={hoveredStat === i ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                          } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {stat.icon}
                        </motion.div>
                      </div>

                      {/* Value with enhanced animation - FIXED LAYOUT */}
                      <div className="flex items-baseline gap-1 mb-2 md:mb-3 flex-wrap">
                        {stat.prefix && (
                          <motion.span
                            className="heading-font text-xl md:text-2xl font-black text-neutral-400"
                            animate={hoveredStat === i ? { scale: 1.1 } : {}}
                          >
                            {stat.prefix}
                          </motion.span>
                        )}
                        <motion.h4
                          className={`heading-font text-3xl sm:text-4xl md:text-5xl font-black ${stat.color} break-all`}
                          style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            maxWidth: '100%'
                          }}
                          animate={hoveredStat === i ? {
                            scale: 1.05,
                            textShadow: '0 0 20px currentColor'
                          } : {}}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {typeof stat.val === 'number' ? stat.val.toLocaleString() : stat.val}
                        </motion.h4>
                        {stat.suffix && (
                          <motion.span
                            className={`heading-font text-xl md:text-2xl font-black ${stat.color}`}
                            animate={hoveredStat === i ? { scale: 1.1 } : {}}
                          >
                            {stat.suffix}
                          </motion.span>
                        )}
                      </div>

                      {/* Label - FIXED WIDTH */}
                      <motion.p
                        className={`sub-font text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-4 md:mb-6 transition-all duration-300 break-words ${hoveredStat === i
                            ? 'text-cyan-neon tracking-[0.15em]'
                            : 'text-neutral-500'
                          }`}
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          maxWidth: '100%'
                        }}
                      >
                        {stat.label}
                      </motion.p>

                      {/* Enhanced Description */}
                      <motion.div
                        className="flex-1 flex items-end"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: hoveredStat === i ? 'auto' : 0,
                          opacity: hoveredStat === i ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="pt-4 border-t border-neutral-800/50 w-full">
                          <p className="sub-font text-xs md:text-sm text-neutral-400 leading-relaxed">
                            {stat.description}
                          </p>
                          <motion.div
                            className="mt-3 h-1 bg-gradient-to-r from-cyan-neon to-purple-electric origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: hoveredStat === i ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          />
                        </div>
                      </motion.div>

                      {/* Pulsing indicator */}
                      {stat.pulse && (
                        <div className="absolute top-4 right-4">
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: stat.color === 'text-cyan-neon' ? '#00E0FF' :
                                stat.color === 'text-purple-electric' ? '#4D00FF' :
                                  stat.color === 'text-matrix-green' ? '#00FF41' : '#FFD700'
                            }}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
          
        </div>

        {/* Enhanced Bottom Stats Bar */}
        <motion.div
          className="mt-16 md:mt-24 pt-8 border-t border-neutral-800/30"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                label: 'OPERATIONS_ACTIVE',
                value: '24/7',
                color: 'text-cyan-neon',
                icon: '🔄',
                description: 'Round-the-clock neural monitoring'
              },
              {
                label: 'SUCCESS_RATE',
                value: '98.7%',
                color: 'text-matrix-green',
                icon: '📈',
                description: 'Protocol execution efficiency'
              },
              {
                label: 'RESPONSE_TIME',
                value: '<2ms',
                color: 'text-purple-electric',
                icon: '⚡',
                description: 'Neural interface latency'
              },
              {
                label: 'UPTIME',
                value: '99.99%',
                color: 'text-yellow-400',
                icon: '🛡️',
                description: 'System reliability index'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center p-4 rounded-lg border border-neutral-800/30 bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors duration-300 group/item"
                whileHover={{ scale: 1.05, borderColor: '#00E0FF' }}
              >
                <div className="text-2xl md:text-3xl mb-2 opacity-60 group-hover/item:opacity-100 transition-opacity">
                  {item.icon}
                </div>
                <div className={`heading-font text-2xl md:text-3xl font-black ${item.color} mb-2 group-hover/item:neon-text-cyan transition-all duration-300`}>
                  {item.value}
                </div>
                <div className="sub-font text-xs text-neutral-500 uppercase tracking-widest mb-1">
                  {item.label}
                </div>
                <motion.p
                  className="sub-font text-xs text-neutral-600 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};