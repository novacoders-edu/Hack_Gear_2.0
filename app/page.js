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
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Global Effects */}
      <MatrixRain />
      <CursorEffect />
      
      <div className="min-h-screen bg-black text-neutral-100 flex flex-col relative z-10">
        <Navbar />
        <main className="flex-grow">
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
    </>
  );
}
