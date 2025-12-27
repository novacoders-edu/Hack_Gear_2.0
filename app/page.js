"use client"
import { About } from "@/components/About";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { Hero } from "@/components/Hero";
import { Prizes } from "@/components/Prizes";
import { RulesFAQ } from "@/components/RulesFAQ";
import { Sponsors } from "@/components/Sponsors";
import { Team } from "@/components/Team";
import { Timeline } from "@/components/Timeline";
import { Tracks } from "@/components/Tracks";
import { MatrixRain } from "@/components/MatrixRain";
import { CursorEffect } from "@/components/CursorEffect";
import { SoundToggle, SoundEffects } from "@/components/SoundManager";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PastWinners } from "@/components/PastWinners";
import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingPage from "@/components/banner/LoadingPageBanner";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { RegistrationNotification } from "@/components/banner/RegistrationBanner";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const hasCompletedRef = useRef(false);

  const handleLoadingComplete = useCallback(() => {
    // Prevent multiple calls
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    
    // Small delay for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  }, []);

  // Fallback timer - only runs once on mount
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        console.log("Fallback: Forcing content display");
        hasCompletedRef.current = true;
        setShowContent(true);
      }
    }, 6000); // 6 seconds fallback (loading takes ~3.5s)

    return () => clearTimeout(fallbackTimer);
  }, []); // Empty dependency - runs only once

  return (
    <div className="min-h-screen bg-black">
      {/* Permanent black background layer - prevents white flash */}
      <div className="fixed inset-0 bg-black" style={{ zIndex: -100 }} />
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Global Effects */}
      <MatrixRain />
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {!showContent && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-50 bg-black"
          >
            <LoadingPage onComplete={handleLoadingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - pre-rendered but hidden */}
      <div 
        className={`w-full transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ 
          visibility: showContent ? 'visible' : 'hidden',
        }}
      >
        {showContent && <CursorEffect />}
        
        <div className="min-h-screen bg-black text-neutral-100 flex flex-col relative z-10">
          <Navbar />
          <main className="flex-grow">
            <RegistrationNotification />
            <Hero />
            <About />
            <Tracks />
            <Timeline />
            <Prizes />
            <Sponsors />
            <Team />
            <PastWinners />
            <RulesFAQ />
          </main>
          <Footer />
          
          {/* Floating Controls */}
          <SoundEffects />
          <BackToTop />
          <SoundToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}