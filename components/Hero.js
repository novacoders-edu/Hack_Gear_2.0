// filepath: f:\projects\hg2\hackgear\hackgear\components\Hero.js
"use client"
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Countdown } from './Countdown';
import { GlitchText } from './GlitchText';

// Lazy load Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

// Circular visual component (fallback)
const CircularVisual = () => (
  <div className="relative w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] aspect-square mx-auto">
    {/* Outer rotating ring */}
    <motion.div
      className="absolute inset-0 border-2 border-cyan-neon/30 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-neon rounded-full shadow-[0_0_20px_#00E0FF]"></div>
    </motion.div>

    {/* Middle rotating ring */}
    <motion.div
      className="absolute inset-6 sm:inset-8 border border-purple-electric/40 rounded-full"
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-purple-electric rounded-full shadow-[0_0_15px_#4D00FF]"></div>
    </motion.div>

    {/* Inner rotating ring */}
    <motion.div
      className="absolute inset-12 sm:inset-16 border border-matrix-green/50 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-matrix-green rounded-full shadow-[0_0_10px_#00FF41]"></div>
    </motion.div>

    {/* Center hexagon */}
    <div className="absolute inset-16 sm:inset-20 lg:inset-24 flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="none"
            stroke="#00E0FF"
            strokeWidth="1"
            className="drop-shadow-[0_0_10px_#00E0FF]"
          />
          <polygon
            points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5"
            fill="rgba(0,224,255,0.1)"
            stroke="#4D00FF"
            strokeWidth="0.5"
          />
          <text x="50" y="55" textAnchor="middle" fill="#00E0FF" fontSize="12" fontFamily="monospace" className="font-bold">
            HG 2.0
          </text>
        </svg>
      </motion.div>
    </div>

    {/* Stats floating around - Hidden on mobile, visible on tablet+ */}
    <motion.div
      className="hidden sm:block absolute -top-2 right-0 px-2 py-1 sm:px-3 sm:py-2 bg-black/80 border border-cyan-neon/30 rounded"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <p className="sub-font text-[8px] sm:text-[10px] text-neutral-500">PARTICIPANTS</p>
      <p className="heading-font text-sm sm:text-lg text-cyan-neon">500+</p>
    </motion.div>

    <motion.div
      className="hidden sm:block absolute -bottom-2 left-0 px-2 py-1 sm:px-3 sm:py-2 bg-black/80 border border-purple-electric/30 rounded"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
    >
      <p className="sub-font text-[8px] sm:text-[10px] text-neutral-500">PRIZE_POOL</p>
      <p className="heading-font text-sm sm:text-lg text-purple-electric">₹TBA</p>
    </motion.div>

    <motion.div
      className="hidden sm:block absolute top-1/2 -right-4 sm:-right-6 px-2 py-1 sm:px-3 sm:py-2 bg-black/80 border border-matrix-green/30 rounded"
      animate={{ x: [0, 10, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
    >
      <p className="sub-font text-[8px] sm:text-[10px] text-neutral-500">DURATION</p>
      <p className="heading-font text-sm sm:text-lg text-matrix-green">8 HRS</p>
    </motion.div>
  </div>
);

// Spline 3D component wrapper
const Spline3DVisual = ({ onLoad, onError }) => {
  return (
    <div className="w-full h-[400px] lg:h-[500px] xl:h-[550px]">
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/kZT9hc8pv6Ztw3QJ/scene.splinecode"
          onLoad={onLoad}
          onError={onError}
        />
      </Suspense>
    </div>
  );
};

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [showSpline, setShowSpline] = useState(false); // Controls when to start loading Spline

  useEffect(() => {
    setIsLoaded(true);

    // Check if device is mobile/small screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Delay Spline loading by 3 seconds to see the circular visual first
    const splineTimer = setTimeout(() => {
      setShowSpline(true);
    }, 3000); // 3 second delay before starting to load Spline

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(splineTimer);
    };
  }, []);

  const handleSplineLoad = () => {
    console.log('Spline loaded successfully!');
    setSplineLoaded(true);
  };

  const handleSplineError = () => {
    console.log('Spline failed to load');
    setSplineError(true);
  };

  // Set your hackathon date here
  const hackathonDate = '2025-02-15T09:00:00';

  return (
    <section id='register' className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden bg-cyber-black max-w-full">
      {/* Dynamic Grid / Matrix Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 md:opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-[120%] h-full bg-[radial-gradient(circle_at_center,rgba(77,0,255,0.15)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full bg-[linear-gradient(90deg,rgba(0,224,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,224,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]"></div>
        </div>
      </div>

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-cyan-neon/10 rounded-full blur-[60px] md:blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-purple-electric/10 rounded-full blur-[60px] md:blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1 border border-cyan-neon/30 bg-cyan-neon/5 mb-4 sm:mb-6"
            >
              <div className="w-2 h-2 bg-matrix-green animate-pulse rounded-full shadow-[0_0_8px_#00FF41]"></div>
              <span className="sub-font text-cyan-neon text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em]">SYSTEM_STATUS: ACTIVE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-4 sm:mb-6"
            >
              <GlitchText text="HACK" className="glitch" intensity="medium" /> <br />
              <span className="gradient-text-animated">
                <GlitchText text="GEAR 2.0" intensity="high" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sub-font text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-400 mb-6 sm:mb-8 font-medium leading-tight"
            >
              DECRYPT THE FUTURE. A HIGH-OCTANE 8H SPRINT FOR THE NEXT GENERATION OF <span className="text-white border-b border-matrix-green">ARCHITECTS</span>.
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <p className="sub-font text-[10px] sm:text-xs text-neutral-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                COUNTDOWN TO LAUNCH
              </p>
              <Countdown targetDate={hackathonDate} />
            </motion.div>

            {/* Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8 border-l-2 border-cyan-neon pl-3 sm:pl-6"
            >
              <div>
                <p className="sub-font text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-neutral-500 mb-1">TIMESTAMP</p>
                <p className="heading-font text-sm sm:text-base md:text-lg font-bold neon-text-cyan">TBA</p>
              </div>
              <div>
                <p className="sub-font text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-neutral-500 mb-1">LOCATION</p>
                <p className="heading-font text-sm sm:text-base md:text-lg font-bold neon-text-purple">TBA</p>
              </div>
              <div>
                <p className="sub-font text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-neutral-500 mb-1">SLOTS</p>
                <p className="heading-font text-sm sm:text-base md:text-lg font-bold neon-text-green">TBA</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              id="register"
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-cyan-neon text-black heading-font text-sm sm:text-base font-black uppercase tracking-widest transition-all hover:shadow-[0_0_40px_rgba(0,224,255,0.6)] relative overflow-hidden"
              >
                <span className="relative z-10">JOIN NETWORK</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 border border-purple-electric text-white heading-font text-sm sm:text-base font-bold uppercase tracking-widest transition-all hover:bg-purple-electric/10 hover:shadow-[0_0_30px_rgba(77,0,255,0.3)]"
              >
                DATA_STREAM
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side - Cyberpunk Visual / Spline 3D */}
          <motion.div
            className="order-1 lg:order-2 flex items-center justify-center relative min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Mobile: Always show circular visual */}
            {isMobile && <CircularVisual />}

            {/* Desktop: Show circular until Spline loads, then show Spline */}
            {!isMobile && (
              <>
                {/* Circular visual - show while loading or on error */}
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

                {/* Spline 3D - load in background, show when ready */}
                {showSpline && !splineError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: splineLoaded ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`w-full ${!splineLoaded ? 'absolute opacity-0' : ''}`}
                  >
                    <Spline3DVisual
                      onLoad={handleSplineLoad}
                      onError={handleSplineError}
                    />
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="sub-font text-xs text-neutral-500 tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-cyan-neon to-transparent"></div>
      </motion.div>
    </section>
  );
};