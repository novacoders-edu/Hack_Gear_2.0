"use client"
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Countdown } from './Countdown';
import { GlitchText } from './GlitchText';

// Lazy load Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

// Compact Circular visual component
const CircularVisual = () => (
  <div className="relative w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[280px] xl:max-w-[320px] aspect-square mx-auto">
    {/* Ambient glow */}
    <div className="absolute inset-0 bg-gradient-radial from-cyan-neon/20 via-transparent to-transparent blur-2xl" />
    
    {/* Outer rotating ring */}
    <motion.div
      className="absolute inset-0 border border-cyan-neon/20 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-neon/60 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${i * 45}deg) translateY(-50%) translateX(-50%)`,
            transformOrigin: '0 0',
          }}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-neon rounded-full shadow-[0_0_15px_#00E0FF]" />
    </motion.div>

    {/* Secondary ring */}
    <motion.div
      className="absolute inset-3 sm:inset-4 border border-purple-electric/30 rounded-full"
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-electric rounded-full shadow-[0_0_10px_#4D00FF]" />
    </motion.div>

    {/* Third ring */}
    <motion.div
      className="absolute inset-6 sm:inset-8 border border-matrix-green/40 rounded-full overflow-hidden"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute inset-0 border-t-2 border-matrix-green/80 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>

    {/* Inner ring with scanning effect */}
    <motion.div
      className="absolute inset-10 sm:inset-14 border border-white/10 rounded-full"
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(0, 224, 255, 0.3) 10%, transparent 20%)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>

    {/* Center hexagon */}
    <div className="absolute inset-12 sm:inset-16 lg:inset-20 flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 relative z-10">
          <motion.polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="none"
            stroke="url(#hexGradient)"
            strokeWidth="1.5"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            strokeDasharray="5 5"
          />
          <polygon
            points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5"
            fill="rgba(0,0,0,0.8)"
            stroke="#4D00FF"
            strokeWidth="0.5"
          />
          <text x="50" y="46" textAnchor="middle" fill="#00E0FF" fontSize="7" fontFamily="monospace" className="font-bold uppercase">
            HACKGEAR
          </text>
          <text x="50" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="monospace" className="font-black">
            2.0
          </text>
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E0FF" />
              <stop offset="50%" stopColor="#4D00FF" />
              <stop offset="100%" stopColor="#00FF41" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>

    {/* Floating data cards - Compact */}
    <motion.div
      className="hidden sm:flex absolute -top-2 right-0 lg:right-2 flex-col gap-0.5 px-2 py-1.5 bg-black/90 border border-cyan-neon/40 rounded-md backdrop-blur-sm"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-1.5">
        <motion.div 
          className="w-1 h-1 bg-matrix-green rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <p className="sub-font text-[7px] text-neutral-500 uppercase tracking-wider">PARTICIPANTS</p>
      </div>
      <p className="heading-font text-sm text-cyan-neon font-black">500+</p>
    </motion.div>

    <motion.div
      className="hidden sm:flex absolute -bottom-2 left-0 lg:left-2 flex-col gap-0.5 px-2 py-1.5 bg-black/90 border border-purple-electric/40 rounded-md backdrop-blur-sm"
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-1.5">
        <motion.div 
          className="w-1 h-1 bg-purple-electric rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
        />
        <p className="sub-font text-[7px] text-neutral-500 uppercase tracking-wider">PRIZE_POOL</p>
      </div>
      <p className="heading-font text-sm text-purple-electric font-black">₹25K+</p>
    </motion.div>

    <motion.div
      className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-8 flex-col gap-0.5 px-2 py-1.5 bg-black/90 border border-matrix-green/40 rounded-md backdrop-blur-sm"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-1.5">
        <motion.div 
          className="w-1 h-1 bg-cyan-neon rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
        />
        <p className="sub-font text-[7px] text-neutral-500 uppercase tracking-wider">DURATION</p>
      </div>
      <p className="heading-font text-sm text-matrix-green font-black">8 HRS</p>
    </motion.div>
  </div>
);

// Spline 3D component wrapper
const Spline3DVisual = ({ onLoad, onError }) => (
  <div className="w-full h-[400px] lg:h-[440px] xl:h-[480px]">
    <Suspense fallback={null}>
      <Spline
        scene="https://prod.spline.design/kZT9hc8pv6Ztw3QJ/scene.splinecode"
        onLoad={onLoad}
        onError={onError}
      />
    </Suspense>
  </div>
);

// Compact tech badge
const TechBadge = ({ children, delay = 0 }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] sm:text-[10px] text-neutral-400 font-mono"
  >
    {children}
  </motion.span>
);

// Compact stat item
const StatItem = ({ label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="relative group text-center"
  >
    <p className="sub-font text-[7px] sm:text-[8px] uppercase tracking-[0.15em] text-neutral-500 mb-0.5">{label}</p>
    <p className={`heading-font text-xs sm:text-sm font-bold ${color}`}>{value}</p>
  </motion.div>
);

export const Hero = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [showSpline, setShowSpline] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const splineTimer = setTimeout(() => setShowSpline(true), 3000);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(splineTimer);
    };
  }, []);

  const hackathonDate = '2025-02-15T09:00:00';

  return (
    <section id='register' className="relative h-screen flex items-center overflow-hidden bg-cyber-black">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,224,255,0.08)_0%,transparent_50%)]"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(77,0,255,0.08)_0%,transparent_50%)]"
          style={{ transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)` }}
        />
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <div className="h-full w-full bg-[linear-gradient(90deg,rgba(0,224,255,0.03)_1px,transparent_1px),linear-gradient(rgba(0,224,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </div>

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-cyan-neon/5 rounded-full blur-[60px] md:blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-purple-electric/5 rounded-full blur-[60px] md:blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-neon/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Status badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-2.5 py-1 border border-cyan-neon/30 bg-gradient-to-r from-cyan-neon/10 to-transparent rounded-full mb-2 sm:mb-3 backdrop-blur-sm"
            >
              <motion.div 
                className="w-1.5 h-1.5 bg-matrix-green rounded-full shadow-[0_0_8px_#00FF41]"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="sub-font text-cyan-neon text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em]">
                REGISTRATION_OPEN
              </span>
            </motion.div> */}

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-2 sm:mb-3"
            >
              <div className="relative inline-block">
                <GlitchText text="HACK" className="glitch" intensity="medium" />
                <motion.div
                  className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-cyan-neon to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon via-purple-electric to-matrix-green">
                <GlitchText text="GEAR 2.0" intensity="high" />
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-3 sm:mb-4"
            >
              <p className="sub-font text-sm sm:text-base md:text-lg text-neutral-400 mb-2 font-medium leading-snug">
                A HIGH-OCTANE <span className="text-cyan-neon">8-HOUR SPRINT</span> FOR THE NEXT GENERATION OF{' '}
                <span className="text-white">ARCHITECTS</span>
              </p>
              
              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                <TechBadge delay={0.3}><span className="text-cyan-neon">●</span> AI/ML</TechBadge>
                <TechBadge delay={0.35}><span className="text-purple-electric">●</span> WEB3</TechBadge>
                <TechBadge delay={0.4}><span className="text-matrix-green">●</span> CLOUD</TechBadge>
                <TechBadge delay={0.45}><span className="text-yellow-400">●</span> IOT</TechBadge>
              </div>
            </motion.div>

            {/* Countdown Timer - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-3 sm:mb-4 p-3 sm:p-4 border border-neutral-800/50 bg-black/40 backdrop-blur-sm rounded-lg relative overflow-hidden"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-neon/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-electric/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-matrix-green/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-neon/50" />
              
              <div className="flex items-center gap-1.5 mb-2">
                <motion.div
                  className="w-1.5 h-1.5 bg-cyan-neon rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <p className="sub-font text-[8px] sm:text-[9px] text-cyan-neon uppercase tracking-[0.2em] font-bold">
                  COUNTDOWN_TO_LAUNCH
                </p>
              </div>
              <Countdown targetDate={hackathonDate} compact />
            </motion.div>

            {/* Info Grid - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 mb-3 sm:mb-4 p-2.5 border-l-2 border-cyan-neon bg-gradient-to-r from-cyan-neon/5 to-transparent rounded-r-md"
            >
              <StatItem label="DATE" value="TBA" color="text-cyan-neon" delay={0.45} />
              <StatItem label="VENUE" value="TBA" color="text-purple-electric" delay={0.5} />
              <StatItem label="SLOTS" value="TBA" color="text-matrix-green" delay={0.55} />
            </motion.div>

            {/* CTA Buttons - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,224,255,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-neon to-cyan-neon/80 text-black heading-font text-xs sm:text-sm font-black uppercase tracking-wider overflow-hidden rounded"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>JOIN NETWORK</span>
                  <motion.svg 
                    className="w-3.5 h-3.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, borderColor: '#4D00FF', boxShadow: '0 0 20px rgba(77,0,255,0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto px-6 py-3 border border-purple-electric/50 text-white heading-font text-xs sm:text-sm font-bold uppercase tracking-wider overflow-hidden rounded bg-purple-electric/5 backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>VIEW DETAILS</span>
                </span>
              </motion.button>
            </motion.div>

            {/* Social proof - Compact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-3 sm:mt-4 flex items-center gap-3 text-neutral-500"
            >
              <div className="flex -space-x-1.5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-black bg-gradient-to-br from-cyan-neon/20 to-purple-electric/20 flex items-center justify-center"
                  >
                    <span className="text-[8px] text-white/60">👤</span>
                  </div>
                ))}
              </div>
              <div className="sub-font text-[10px] sm:text-xs">
                <span className="text-cyan-neon font-bold">00</span> already registered
              </div>
            </motion.div>
          </div>

          {/* Right Side - Visual */}
          <motion.div
            className="order-1 lg:order-2 flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)` }}
          >
            {isMobile && <CircularVisual />}

            {!isMobile && (
              <>
                {(!splineLoaded || splineError) && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: splineLoaded && !splineError ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-center justify-center w-full ${splineLoaded && !splineError ? 'absolute inset-0 pointer-events-none' : ''}`}
                  >
                    <CircularVisual />
                  </motion.div>
                )}

                {showSpline && !splineError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: splineLoaded ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`w-full ${!splineLoaded ? 'absolute opacity-0' : ''}`}
                  >
                    <Spline3DVisual
                      onLoad={() => setSplineLoaded(true)}
                      onError={() => setSplineError(true)}
                    />
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Compact */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-4 h-6 border border-neutral-700 rounded-full flex justify-center pt-1">
            <motion.div
              className="w-0.5 h-1.5 bg-cyan-neon rounded-full"
              animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-electric/30 to-transparent" />
    </section>
  );
};