"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const LoadingPage = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Context Protocol...');
  const [activeCorner, setActiveCorner] = useState(0);
  const [particles, setParticles] = useState([]); // NEW: Store particles in state
  const hasCalledComplete = useRef(false);

  // Generate particles only on client side
  useEffect(() => {
    const generatedParticles = [...Array(15)].map((_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      duration: Math.random() * 10 + 5,
    }));
    setParticles(generatedParticles);
  }, []);

  // Progress animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      }); 
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

  // Text animation sequence
  useEffect(() => {
    const textSequence = [
      'Initializing Context Protocol...',
      'Loading Nova Coders Network...',
      'Synchronizing Nodes...',
      'Calibrating Systems...',
      'Welcome to HACKGEAR 2.0'
    ];

    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % textSequence.length;
      setLoadingText(textSequence[textIndex]);
    }, 500);

    return () => clearInterval(textInterval);
  }, []);

  // Corner animation
  useEffect(() => {
    const cornerInterval = setInterval(() => {
      setActiveCorner(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(cornerInterval);
  }, []);

  // Trigger onComplete when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && !hasCalledComplete.current && onComplete) {
      hasCalledComplete.current = true;
      
      const timer = setTimeout(() => {
        onComplete();
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
      {/* Animated Corner Bars */}
      {/* Top-left corner bar */}
      <motion.div 
        className="absolute top-0 left-0 w-4 h-0.5 bg-cyan-neon"
        animate={activeCorner === 0 ? { width: ['4px', '100px', '4px'] } : { width: '4px' }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-0 left-0 w-0.5 h-4 bg-cyan-neon"
        animate={activeCorner === 0 ? { height: ['4px', '100px', '4px'] } : { height: '4px' }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Top-right corner bar */}
      <motion.div 
        className="absolute top-0 right-0 w-4 h-0.5 bg-purple-electric"
        animate={activeCorner === 1 ? { width: ['4px', '100px', '4px'] } : { width: '4px' }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-0 right-0 w-0.5 h-4 bg-purple-electric"
        animate={activeCorner === 1 ? { height: ['4px', '100px', '4px'] } : { height: '4px' }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Bottom-left corner bar */}
      <motion.div 
        className="absolute bottom-0 left-0 w-4 h-0.5 bg-matrix-green"
        animate={activeCorner === 2 ? { width: ['4px', '100px', '4px'] } : { width: '4px' }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-0.5 h-4 bg-matrix-green"
        animate={activeCorner === 2 ? { height: ['4px', '100px', '4px'] } : { height: '4px' }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Bottom-right corner bar */}
      <motion.div 
        className="absolute bottom-0 right-0 w-4 h-0.5 bg-cyan-neon"
        animate={activeCorner === 3 ? { width: ['4px', '100px', '4px'] } : { width: '4px' }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-0.5 h-4 bg-cyan-neon"
        animate={activeCorner === 3 ? { height: ['4px', '100px', '4px'] } : { height: '4px' }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Moving scanning line across corners */}
      <motion.div 
        className="absolute w-[2px] h-[100px] bg-gradient-to-b from-transparent via-cyan-neon to-transparent pointer-events-none"
        animate={{
          top: ['0%', '0%', 'calc(100% - 100px)', 'calc(100% - 100px)', '0%'],
          left: ['0%', 'calc(100% - 2px)', 'calc(100% - 2px)', '0%', '0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
      />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #00E0FF 1px, transparent 1px),
                             linear-gradient(to bottom, #00E0FF 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating particles - FIXED: Only render on client */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-[2px] h-[2px] bg-cyan-neon rounded-full"
            initial={{
              x: particle.initialX,
              y: particle.initialY,
            }}
            animate={{
              x: particle.targetX,
              y: particle.targetY,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Logo/Title Area */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-2 leading-tight heading-font whitespace-nowrap"
            animate={{ 
              textShadow: [
                '0 0 10px #00E0FF',
                '0 0 20px #00E0FF',
                '0 0 30px #00E0FF',
                '0 0 20px #00E0FF',
                '0 0 10px #00E0FF'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white block">Welcome to</span>
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-neon via-purple-electric to-matrix-green bg-[length:200%_100%] block"
              style={{
                animation: 'gradient-shift 3s linear infinite'
              }}
            >
              HACKGEAR 2.0
            </span>
          </motion.div>
          
          <motion.div 
            className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-neutral-400 font-mono sub-font"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-cyan-neon">By</span>{' '}
            <span className="text-white">NovaCoders</span>
          </motion.div>
        </motion.div>

        {/* Divider Line */}
        <motion.div 
          className="w-24 sm:w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-cyan-neon to-transparent my-4 sm:my-6 md:my-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Loading Text */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 md:mb-12 max-w-full px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="font-mono text-sm sm:text-base md:text-xl lg:text-2xl mb-3 sm:mb-4 md:mb-6 h-[30px] sm:h-[35px] md:h-[40px] flex items-center justify-center sub-font">
            <motion.span 
              key={loadingText}
              className="text-white text-center line-clamp-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loadingText}
            </motion.span>
          </div>

          {/* ASCII Art Progress Indicator */}
          <div className="font-mono text-xs md:text-sm text-neutral-500 mb-3 sm:mb-4">
            <motion.div 
              className="inline-block"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              [████████████████████]
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl px-4 mb-6 sm:mb-8 md:mb-12">
          <div className="relative h-2 sm:h-2.5 md:h-3 bg-black/50 border border-neutral-800 rounded-full overflow-hidden mb-2 sm:mb-3">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-neon via-purple-electric to-matrix-green"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            
            <motion.div 
              className="absolute inset-y-0 w-8 bg-white/20 blur-lg"
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div 
              className="absolute inset-y-0 w-[2px] bg-white"
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <motion.div 
            className="text-center font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold heading-font"
            animate={{ color: ['#00E0FF', '#4D00FF', '#00FF41', '#00E0FF'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {progress}%
          </motion.div>
        </div>

        {/* Terminal-style status indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-md sm:max-w-xl md:max-w-2xl w-full px-4">
          {[
            { label: 'SYSTEM', status: progress >= 25 ? 'ONLINE' : 'LOADING', color: progress >= 25 ? 'text-matrix-green' : 'text-yellow-400' },
            { label: 'NETWORK', status: progress >= 50 ? 'SYNCED' : 'SYNCING', color: progress >= 50 ? 'text-matrix-green' : 'text-cyan-neon' },
            { label: 'SECURITY', status: progress >= 75 ? 'ACTIVE' : 'CHECKING', color: progress >= 75 ? 'text-matrix-green' : 'text-purple-electric' },
            { label: 'PROTOCOL', status: progress >= 100 ? 'READY' : 'LOADING', color: progress >= 100 ? 'text-matrix-green' : 'text-yellow-400' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="text-center p-2 sm:p-2.5 md:p-3 border border-neutral-800 rounded-lg bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <div className="text-[9px] sm:text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mb-1 sub-font truncate">
                {item.label}
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
                <motion.div 
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${item.color.replace('text-', 'bg-')} flex-shrink-0`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                />
                <div className={`font-mono text-[10px] sm:text-xs md:text-sm font-bold ${item.color} sub-font truncate`}>
                  {item.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Corner connection lines */}
      <motion.div 
        className="absolute top-2 sm:top-4 left-2 sm:left-4 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 border-t border-l border-cyan-neon/20 pointer-events-none"
        animate={{ borderColor: ['rgba(0, 224, 255, 0.2)', 'rgba(0, 224, 255, 0.8)', 'rgba(0, 224, 255, 0.2)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-2 sm:top-4 right-2 sm:right-4 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 border-t border-r border-purple-electric/20 pointer-events-none"
        animate={{ borderColor: ['rgba(77, 0, 255, 0.2)', 'rgba(77, 0, 255, 0.8)', 'rgba(77, 0, 255, 0.2)'] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 border-b border-l border-matrix-green/20 pointer-events-none"
        animate={{ borderColor: ['rgba(0, 255, 65, 0.2)', 'rgba(0, 255, 65, 0.8)', 'rgba(0, 255, 65, 0.2)'] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      />
      <motion.div 
        className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 border-b border-r border-cyan-neon/20 pointer-events-none"
        animate={{ borderColor: ['rgba(0, 224, 255, 0.2)', 'rgba(0, 224, 255, 0.8)', 'rgba(0, 224, 255, 0.2)'] }}
        transition={{ duration: 3, repeat: Infinity, delay: 3 }}
      />

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;