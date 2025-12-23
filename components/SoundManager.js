"use client"
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const useSounds = () => useContext(SoundContext);

// ============================================
// CONFIGURATION - Change your music file here
// ============================================
// Option 1: Use a local file - place your audio file in /public folder
const BACKGROUND_MUSIC_URL = '/music/cyberpunk-ambient.mp3';

// Option 2: Use a URL (royalty-free music)
// const BACKGROUND_MUSIC_URL = 'https://example.com/your-music.mp3';

// Music volume (0.0 to 1.0) - 0.15 = 15% volume
const MUSIC_VOLUME = 0.15;

// Whether music should loop
const MUSIC_LOOP = true;
// ============================================

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [musicLoaded, setMusicLoaded] = useState(false);
  const audioContextRef = useRef(null);
  const bgMusicRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('hackgear-sound-muted');
    if (saved !== null) {
      setIsMuted(JSON.parse(saved));
    }
  }, []);

  const getAudioContext = useCallback(() => {
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      return audioContextRef.current;
    }
    
    const AudioContextClass = window.AudioContext || (window).webkitAudioContext;
    if (!AudioContextClass) return null;
    
    audioContextRef.current = new AudioContextClass();
    return audioContextRef.current;
  }, []);

  // Initialize background music audio element
  useEffect(() => {
    if (!isClient) return;

    const audio = new Audio();
    audio.src = BACKGROUND_MUSIC_URL;
    audio.loop = MUSIC_LOOP;
    audio.volume = MUSIC_VOLUME;
    audio.preload = 'auto';
    
    audio.addEventListener('canplaythrough', () => {
      setMusicLoaded(true);
      console.log('Background music loaded');
    });

    audio.addEventListener('error', (e) => {
      console.log('Music file not found. Add your audio file to /public/music/cyberpunk-ambient.mp3');
      // Fallback to generated ambient if file not found
      setMusicLoaded(false);
    });

    bgMusicRef.current = audio;

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, [isClient]);

  // Start/stop music based on mute state
  const startBackgroundMusic = useCallback(() => {
    if (bgMusicRef.current && musicLoaded) {
      bgMusicRef.current.volume = 0;
      bgMusicRef.current.play().then(() => {
        // Fade in
        let vol = 0;
        const fadeIn = setInterval(() => {
          vol += 0.01;
          if (vol >= MUSIC_VOLUME) {
            vol = MUSIC_VOLUME;
            clearInterval(fadeIn);
          }
          if (bgMusicRef.current) {
            bgMusicRef.current.volume = vol;
          }
        }, 50);
      }).catch(e => {
        console.log('Music autoplay blocked - user interaction required');
      });
    } else if (!musicLoaded) {
      // Fallback: Generate ambient tones if no music file
      startGeneratedAmbient();
    }
  }, [musicLoaded]);

  const stopBackgroundMusic = useCallback(() => {
    if (bgMusicRef.current && !bgMusicRef.current.paused) {
      // Fade out
      let vol = bgMusicRef.current.volume;
      const fadeOut = setInterval(() => {
        vol -= 0.02;
        if (vol <= 0) {
          vol = 0;
          clearInterval(fadeOut);
          if (bgMusicRef.current) {
            bgMusicRef.current.pause();
            bgMusicRef.current.currentTime = 0;
          }
        }
        if (bgMusicRef.current) {
          bgMusicRef.current.volume = vol;
        }
      }, 50);
    }
    stopGeneratedAmbient();
  }, []);

  // Fallback generated ambient music
  const generatedOscRef = useRef(null);
  const generatedGainRef = useRef(null);

  const startGeneratedAmbient = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      if (generatedOscRef.current) {
        generatedOscRef.current.forEach(osc => { try { osc.stop(); } catch(e) {} });
      }

      const oscillators = [];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      generatedGainRef.current = masterGain;

      // Deep bass drone
      const bass = ctx.createOscillator();
      bass.type = 'sine';
      bass.frequency.setValueAtTime(55, ctx.currentTime);
      const bassGain = ctx.createGain();
      bassGain.gain.setValueAtTime(0.4, ctx.currentTime);
      bass.connect(bassGain);
      bassGain.connect(masterGain);
      bass.start();
      oscillators.push(bass);

      // Pad
      const pad = ctx.createOscillator();
      pad.type = 'sine';
      pad.frequency.setValueAtTime(110, ctx.currentTime);
      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.2, ctx.currentTime);
      pad.connect(padGain);
      padGain.connect(masterGain);
      pad.start();
      oscillators.push(pad);

      // LFO
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(pad.frequency);
      lfo.start();
      oscillators.push(lfo);

      generatedOscRef.current = oscillators;
    } catch (e) {
      console.log('Generated ambient error:', e);
    }
  }, [getAudioContext]);

  const stopGeneratedAmbient = useCallback(() => {
    if (generatedGainRef.current && audioContextRef.current) {
      try {
        generatedGainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1);
      } catch(e) {}
    }
    setTimeout(() => {
      if (generatedOscRef.current) {
        generatedOscRef.current.forEach(osc => { try { osc.stop(); } catch(e) {} });
        generatedOscRef.current = null;
      }
    }, 1100);
  }, []);

  // Handle mute state changes
  useEffect(() => {
    if (!isClient) return;
    
    if (!isMuted) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [isMuted, isClient, startBackgroundMusic, stopBackgroundMusic]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newValue = !prev;
      localStorage.setItem('hackgear-sound-muted', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  const playSound = useCallback((type) => {
    if (isMuted || !isClient) return;
    
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      switch(type) {
        case 'hover':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(800, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);
          gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.04);
          break;
        case 'click':
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(500, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
          gainNode.gain.setValueAtTime(0.07, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.08);
          break;
        case 'success':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(400, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
          break;
        default:
          break;
      }
    } catch (e) {
      console.log('Sound error:', e);
    }
  }, [isMuted, isClient, getAudioContext]);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound, musicLoaded }}>
      {children}
    </SoundContext.Provider>
  );
};

// Global sound effects for buttons/links
export const SoundEffects = () => {
  const context = useSounds();
  
  useEffect(() => {
    if (!context || context.isMuted) return;

    const { playSound } = context;

    const handleClick = (e) => {
      const target = e.target.closest('button, a, [role="button"]');
      if (target) {
        playSound('click');
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.target.closest('button, a, [role="button"]');
      if (target) {
        playSound('hover');
      }
    };

    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { capture: true, passive: true });

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
    };
  }, [context]);

  return null;
};

export const SoundToggle = () => {
  const context = useSounds();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !context) return null;

  const { isMuted, toggleMute } = context;

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 p-3 bg-black/80 border border-neutral-700 hover:border-cyan-neon transition-all group rounded-lg"
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      title={isMuted ? 'Enable sounds & music' : 'Disable sounds & music'}
    >
      {isMuted ? (
        <svg className="w-5 h-5 text-neutral-500 group-hover:text-cyan-neon transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-cyan-neon animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
};
