"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// ============================================
// THEME CONFIGURATION
// ============================================
const THEMES = {
  cyan: {
    name: 'Cyber Cyan',
    primary: '#00E0FF',
    rgb: '0, 224, 255',
    glow: 'rgba(0, 224, 255, 0.6)',
    icon: '💠',
  },
  green: {
    name: 'Matrix Green',
    primary: '#00FF41',
    rgb: '0, 255, 65',
    glow: 'rgba(0, 255, 65, 0.6)',
    icon: '🟢',
  },
  red: {
    name: 'Neon Red',
    primary: '#FF0040',
    rgb: '255, 0, 64',
    glow: 'rgba(255, 0, 64, 0.6)',
    icon: '🔴',
  },
  gold: {
    name: 'Cyber Gold',
    primary: '#FFD700',
    rgb: '255, 215, 0',
    glow: 'rgba(255, 215, 0, 0.6)',
    icon: '🟡',
  },
};

const THEME_ORDER = ['cyan', 'green', 'red', 'gold'];
// ============================================

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('cyan');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('hackgear-theme');
    if (saved && THEMES[saved]) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (themeName) => {
    const themeConfig = THEMES[themeName];
    if (!themeConfig) return;

    document.documentElement.setAttribute('data-theme', themeName);
    document.documentElement.style.setProperty('--primary-neon', themeConfig.primary);
    document.documentElement.style.setProperty('--primary-glow', themeConfig.glow);
    document.documentElement.style.setProperty('--primary-rgb', themeConfig.rgb);
  };

  const setThemeByName = (themeName) => {
    if (!THEMES[themeName]) return;
    setTheme(themeName);
    localStorage.setItem('hackgear-theme', themeName);
    applyTheme(themeName);
  };

  const cycleTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
    setThemeByName(THEME_ORDER[nextIndex]);
  };

  const currentTheme = THEMES[theme] || THEMES.cyan;

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme: setThemeByName, 
      cycleTheme,
      currentTheme,
      themes: THEMES,
      themeOrder: THEME_ORDER,
      isClient 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = () => {
  const context = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !context) return null;

  const { theme, setTheme, themes, themeOrder, currentTheme } = context;

  return (
    <div className="fixed bottom-4 right-30 z-50">
      {/* Theme selector popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-14 right-0 p-3 bg-black/95 border border-neutral-700 rounded-lg shadow-xl min-w-[160px]"
          >
            <p className="sub-font text-[10px] text-neutral-500 uppercase tracking-widest mb-2 px-1">
              Select Theme
            </p>
            <div className="space-y-1">
              {themeOrder.map((themeKey) => {
                const t = themes[themeKey];
                const isActive = theme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => {
                      setTheme(themeKey);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-all ${
                      isActive 
                        ? 'bg-white/10' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full transition-all"
                      style={{ 
                        backgroundColor: t.primary,
                        boxShadow: isActive ? `0 0 12px ${t.primary}` : 'none'
                      }}
                    />
                    <span className={`sub-font text-sm ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                      {t.name}
                    </span>
                    {isActive && (
                      <motion.span 
                        layoutId="activeCheck"
                        className="ml-auto text-xs"
                        style={{ color: t.primary }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-black/80 border border-neutral-700 hover:border-neutral-500 transition-all group rounded-lg"
        aria-label="Change theme"
        title={`Current: ${currentTheme.name}`}
      >
        <div className="flex items-center gap-1.5">
          {themeOrder.map((themeKey) => {
            const t = themes[themeKey];
            const isActive = theme === themeKey;
            return (
              <motion.div
                key={themeKey}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all"
                style={{ 
                  backgroundColor: isActive ? t.primary : '#404040',
                  boxShadow: isActive ? `0 0 8px ${t.primary}` : 'none'
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
