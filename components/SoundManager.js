"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const SoundContext = createContext();
export const useSounds = () => useContext(SoundContext);

// ============================================
// MUSIC CONFIGURATION (4 tracks like ThemeToggle)
// Put these files under: /public/music/
// ============================================
const MUSIC_TRACKS = {
  cyan: {
    name: "Cyber Cyan",
    url: "/music/cyberpunk-ambient.mp3",
    color: "#00E0FF",
  },
  green: {
    name: "Dark Tech",
    url: "/music/dark_tech.mp3",
    color: "#00FF41",
  },
  red: {
    name: "OG I",
    url: "/music/vikram_another.mp3",
    color: "#FF0040",
  },
  gold: {
    name: "Pirates",
    url: "/music/jack_sparrow.mp3",
    color: "#FFD700",
  },
};

const TRACK_ORDER = ["cyan", "green", "red", "gold"];

// Background music volume (0.0 to 1.0)
const MUSIC_VOLUME = 0.15;
const MUSIC_LOOP = true;

// ============================================
// END-OF-PAGE (BOTTOM) MUSIC CONFIG
// ============================================
const SCROLL_TRACK = {
  name: "End Track",
  url: "/music/professor_phone.mp3", // <-- change to your end music file if needed
  color: "#ff0000",
};

// End track volume
const SCROLL_MUSIC_VOLUME = 0.6;
// ============================================

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [currentTrack, setCurrentTrack] = useState("cyan");
  const [musicLoaded, setMusicLoaded] = useState(false);

  // Autoplay handling (best-effort on load + invisible retry on first interaction)
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Bottom-of-page behavior
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollMusicPlaying, setScrollMusicPlaying] = useState(false);

  const audioContextRef = useRef(null);
  const bgMusicRef = useRef(null);
  const scrollMusicRef = useRef(null);

  // Fallback generated ambient music
  const generatedOscRef = useRef(null);
  const generatedGainRef = useRef(null);

  // Avoid overlapping fade timers (per audio element)
  const fadeTimersRef = useRef(new Map());

  const clearFadeTimer = useCallback((audioEl) => {
    if (!audioEl) return;
    const t = fadeTimersRef.current.get(audioEl);
    if (t) {
      clearInterval(t);
      fadeTimersRef.current.delete(audioEl);
    }
  }, []);

  const fadeTo = useCallback(
    (audioEl, targetVolume, step = 0.02, everyMs = 30, onDone) => {
      if (!audioEl) return;
      clearFadeTimer(audioEl);

      const clamp = (v) => Math.max(0, Math.min(1, v));
      const target = clamp(targetVolume);

      const timer = setInterval(() => {
        const current = clamp(audioEl.volume ?? 0);
        const next =
          current < target ? clamp(current + step) : clamp(current - step);

        audioEl.volume = next;

        if (Math.abs(next - target) <= step) {
          audioEl.volume = target;
          clearFadeTimer(audioEl);
          if (onDone) onDone();
        }
      }, everyMs);

      fadeTimersRef.current.set(audioEl, timer);
    },
    [clearFadeTimer]
  );

  const safePauseReset = useCallback(
    (audioEl, { resetTime = true } = {}) => {
      if (!audioEl) return;
      clearFadeTimer(audioEl);
      try {
        audioEl.pause();
      } catch {
        // ignore
      }
      if (resetTime) {
        try {
          audioEl.currentTime = 0;
        } catch {
          // ignore
        }
      }
    },
    [clearFadeTimer]
  );

  const getAudioContext = useCallback(() => {
    if (!isClient) return null;

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().catch(() => {});
      }
      return audioContextRef.current;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    audioContextRef.current = new AudioContextClass();
    return audioContextRef.current;
  }, [isClient]);

  const stopGeneratedAmbient = useCallback(() => {
    if (generatedGainRef.current && audioContextRef.current) {
      try {
        generatedGainRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 1
        );
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      if (generatedOscRef.current) {
        generatedOscRef.current.forEach((osc) => {
          try {
            osc.stop();
          } catch {
            // ignore
          }
        });
        generatedOscRef.current = null;
      }
    }, 1100);
  }, []);

  const startGeneratedAmbient = useCallback(() => {
    // Note: WebAudio is also usually blocked until interaction
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      if (generatedOscRef.current) {
        generatedOscRef.current.forEach((osc) => {
          try {
            osc.stop();
          } catch {
            // ignore
          }
        });
      }

      const oscillators = [];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      generatedGainRef.current = masterGain;

      const bass = ctx.createOscillator();
      bass.type = "sine";
      bass.frequency.setValueAtTime(55, ctx.currentTime);
      const bassGain = ctx.createGain();
      bassGain.gain.setValueAtTime(0.4, ctx.currentTime);
      bass.connect(bassGain);
      bassGain.connect(masterGain);
      bass.start();
      oscillators.push(bass);

      const pad = ctx.createOscillator();
      pad.type = "sine";
      pad.frequency.setValueAtTime(110, ctx.currentTime);
      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.2, ctx.currentTime);
      pad.connect(padGain);
      padGain.connect(masterGain);
      pad.start();
      oscillators.push(pad);

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(pad.frequency);
      lfo.start();
      oscillators.push(lfo);

      generatedOscRef.current = oscillators;
    } catch {
      // ignore
    }
  }, [getAudioContext]);

  const attemptPlayBackground = useCallback(async () => {
    if (!isClient) return false;
    if (isMuted) return false;
    if (!bgMusicRef.current) return false;
    if (!musicLoaded) return false;
    if (isAtBottom) return false; // don't fight end-music

    try {
      bgMusicRef.current.volume = 0;
      bgMusicRef.current.muted = false;

      const p = bgMusicRef.current.play();
      if (p && typeof p.then === "function") await p;

      setAutoplayBlocked(false);
      fadeTo(bgMusicRef.current, MUSIC_VOLUME, 0.01, 50);
      return true;
    } catch {
      setAutoplayBlocked(true);
      return false;
    }
  }, [fadeTo, isAtBottom, isClient, isMuted, musicLoaded]);

  const attemptPlayScrollMusic = useCallback(async () => {
    if (!isClient) return false;
    if (isMuted) return false;
    if (!scrollMusicRef.current) return false;
    if (!isAtBottom) return false;

    try {
      scrollMusicRef.current.volume = 0;
      scrollMusicRef.current.muted = false;

      const p = scrollMusicRef.current.play();
      if (p && typeof p.then === "function") await p;

      setAutoplayBlocked(false);
      setScrollMusicPlaying(true);
      fadeTo(scrollMusicRef.current, SCROLL_MUSIC_VOLUME, 0.02, 30);
      return true;
    } catch {
      setAutoplayBlocked(true);
      return false;
    }
  }, [fadeTo, isAtBottom, isClient, isMuted]);

  // Load saved preferences + init scroll-music element
  useEffect(() => {
    setIsClient(true);

    const savedMuted = localStorage.getItem("hackgear-sound-muted");
    if (savedMuted !== null) setIsMuted(JSON.parse(savedMuted));

    const savedTrack = localStorage.getItem("hackgear-music-track");
    if (savedTrack && MUSIC_TRACKS[savedTrack]) {
      setCurrentTrack(savedTrack);
    }

    // Init end-of-page music element
    const scrollAudio = new Audio();
    scrollAudio.src = SCROLL_TRACK.url;
    scrollAudio.loop = true;
    scrollAudio.volume = 0;
    scrollAudio.preload = "auto";
    scrollMusicRef.current = scrollAudio;

    return () => {
      if (scrollMusicRef.current) {
        safePauseReset(scrollMusicRef.current);
        try {
          scrollMusicRef.current.src = "";
        } catch {
          // ignore
        }
        scrollMusicRef.current = null;
      }
    };
  }, [safePauseReset]);

  // Scroll detection (is user at bottom)
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const thresholdPx = 80;
      const atBottom = scrollTop + clientHeight >= scrollHeight - thresholdPx;
      setIsAtBottom(atBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  // Bottom behavior: crossfade bg <-> scroll music
  useEffect(() => {
    if (!isClient) return;
    if (isMuted) return;

    if (isAtBottom) {
      // Fade out bg, then start scroll track
      if (bgMusicRef.current && !bgMusicRef.current.paused) {
        fadeTo(bgMusicRef.current, 0, 0.02, 30, () => safePauseReset(bgMusicRef.current));
      }
      attemptPlayScrollMusic();
      return;
    }

    // Not at bottom: stop scroll track and resume bg
    if (scrollMusicRef.current && scrollMusicPlaying) {
      fadeTo(scrollMusicRef.current, 0, 0.02, 30, () => {
        safePauseReset(scrollMusicRef.current);
        setScrollMusicPlaying(false);
      });
    }
    attemptPlayBackground();
  }, [
    attemptPlayBackground,
    attemptPlayScrollMusic,
    fadeTo,
    isAtBottom,
    isClient,
    isMuted,
    safePauseReset,
    scrollMusicPlaying,
  ]);

  // Initialize background music when track changes
  useEffect(() => {
    if (!isClient) return;

    const track = MUSIC_TRACKS[currentTrack] || MUSIC_TRACKS.cyan;

    // Cleanup old bg
    if (bgMusicRef.current) {
      safePauseReset(bgMusicRef.current);
      bgMusicRef.current = null;
    }
    stopGeneratedAmbient();

    const audio = new Audio();
    audio.src = track.url;
    audio.loop = MUSIC_LOOP;
    audio.volume = MUSIC_VOLUME;
    audio.preload = "auto";

    const onCanPlay = () => {
      setMusicLoaded(true);
      // Best-effort autoplay (only if not at bottom)
      attemptPlayBackground();
    };

    const onError = () => {
      setMusicLoaded(false);
      startGeneratedAmbient();
    };

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("error", onError);

    bgMusicRef.current = audio;

    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
      safePauseReset(audio);
    };
  }, [
    attemptPlayBackground,
    currentTrack,
    isClient,
    safePauseReset,
    startGeneratedAmbient,
    stopGeneratedAmbient,
  ]);

  // Invisible “first interaction” hook:
  // - resumes AudioContext (SFX)
  // - retries autoplay if it was blocked
  useEffect(() => {
    if (!isClient || hasUserInteracted) return;

    const onFirstInteraction = () => {
      setHasUserInteracted(true);

      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      // Retry whichever is relevant now
      if (autoplayBlocked) {
        if (isAtBottom) {
          attemptPlayScrollMusic().then((ok) => {
            if (!ok) attemptPlayBackground();
          });
        } else {
          attemptPlayBackground();
        }
      }
    };

    // Added wheel/scroll so “reaching bottom” can unlock audio in more cases
    const events = ["pointerdown", "keydown", "touchstart", "mousedown", "wheel", "scroll"];
    events.forEach((ev) =>
      document.addEventListener(ev, onFirstInteraction, { once: true, passive: true })
    );

    return () => {
      events.forEach((ev) => document.removeEventListener(ev, onFirstInteraction));
    };
  }, [
    attemptPlayBackground,
    attemptPlayScrollMusic,
    autoplayBlocked,
    getAudioContext,
    hasUserInteracted,
    isAtBottom,
    isClient,
  ]);

  // Start/stop music based on mute state
  useEffect(() => {
    if (!isClient) return;

    if (isMuted) {
      if (bgMusicRef.current) safePauseReset(bgMusicRef.current);
      if (scrollMusicRef.current) safePauseReset(scrollMusicRef.current);
      setScrollMusicPlaying(false);
      stopGeneratedAmbient();
      return;
    }

    // unmuted => best-effort start correct track for current position
    if (isAtBottom) {
      attemptPlayScrollMusic().then((ok) => {
        if (!ok) attemptPlayBackground();
      });
    } else {
      attemptPlayBackground();
    }
  }, [
    attemptPlayBackground,
    attemptPlayScrollMusic,
    isAtBottom,
    isClient,
    isMuted,
    safePauseReset,
    stopGeneratedAmbient,
  ]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem("hackgear-sound-muted", JSON.stringify(next));
      return next;
    });
  }, []);

  const setMusicTrack = useCallback((trackKey) => {
    if (!MUSIC_TRACKS[trackKey]) return;
    setCurrentTrack(trackKey);
    localStorage.setItem("hackgear-music-track", trackKey);
  }, []);

  const playSound = useCallback(
    (type) => {
      if (isMuted || !isClient) return;

      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        switch (type) {
          case "hover":
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(800, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);
            gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.04);
            break;
          case "click":
            oscillator.type = "square";
            oscillator.frequency.setValueAtTime(500, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
            gainNode.gain.setValueAtTime(0.07, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.08);
            break;
          case "success":
            oscillator.type = "sine";
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
      } catch {
        // ignore
      }
    },
    [getAudioContext, isClient, isMuted]
  );

  const currentTrackConfig = MUSIC_TRACKS[currentTrack] || MUSIC_TRACKS.cyan;

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playSound,
        musicLoaded,

        currentTrack,
        currentTrackConfig,
        setMusicTrack,
        tracks: MUSIC_TRACKS,
        trackOrder: TRACK_ORDER,

        autoplayBlocked,
        hasUserInteracted,

        // expose bottom-music info (optional for UI/debug)
        isAtBottom,
        scrollMusicPlaying,
        scrollTrack: SCROLL_TRACK,
      }}
    >
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
      const target = e.target.closest("button, a, [role='button']");
      if (target) playSound("click");
    };

    const handleMouseEnter = (e) => {
      const target = e.target.closest("button, a, [role='button']");
      if (target) playSound("hover");
    };

    document.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { capture: true, passive: true });

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseenter", handleMouseEnter, { capture: true });
    };
  }, [context]);

  return null;
};

export const SoundToggle = () => {
  const context = useSounds();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || !context) return null;

  const {
    isMuted,
    toggleMute,
    currentTrack,
    setMusicTrack,
    tracks,
    trackOrder,
    currentTrackConfig,
  } = context;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-14 right-0 p-3 bg-black/95 border border-neutral-700 rounded-lg shadow-xl min-w-[180px]"
          >
            <p className="sub-font text-[10px] text-neutral-500 uppercase tracking-widest mb-2 px-1">
              Select Music
            </p>

            <div className="space-y-1">
              {trackOrder.map((trackKey) => {
                const t = tracks[trackKey];
                const isActive = currentTrack === trackKey;

                return (
                  <button
                    key={trackKey}
                    onClick={() => {
                      setMusicTrack(trackKey);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-all ${
                      isActive ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full transition-all"
                      style={{
                        backgroundColor: t.color,
                        boxShadow: isActive ? `0 0 12px ${t.color}` : "none",
                      }}
                    />
                    <span className={`sub-font text-sm ${isActive ? "text-white" : "text-neutral-400"}`}>
                      {t.name}
                    </span>

                    {isActive && (
                      <motion.span
                        layoutId="activeMusicCheck"
                        className="ml-auto text-xs"
                        style={{ color: t.color }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-neutral-700 my-2" />

            <button
              onClick={() => {
                toggleMute();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 transition-all"
            >
              <span className="sub-font text-sm text-neutral-400">
                {isMuted ? "Enable Sound" : "Mute Sound"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="p-3 bg-black/80 border border-neutral-700 hover:border-neutral-500 transition-all group rounded-lg"
        aria-label="Sound settings"
        title={`Current: ${currentTrackConfig.name}`}
      >
        <div className="flex items-center gap-1.5">
          {trackOrder.map((trackKey) => {
            const t = tracks[trackKey];
            const isActive = currentTrack === trackKey;
            return (
              <motion.div
                key={trackKey}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all"
                style={{
                  backgroundColor: isActive ? t.color : "#404040",
                  boxShadow: isActive ? `0 0 8px ${t.color}` : "none",
                  opacity: isMuted ? 0.5 : 1,
                }}
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              />
            );
          })}
        </div>
      </button>
    </div>
  );
};