import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import WowFactor from "./components/WowFactor";
import Testimonials from "./components/Testimonials";
import PrivacyTrust from "./components/PrivacyTrust";
import Footer from "./components/Footer";
import FaqFloating from "./components/FaqFloating";
import Logo from "./components/Logo";
import { RelationType } from "./types";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  
  // Preloader related states
  const [preloading, setPreloading] = useState(true);
  const [preloaderProgress, setPreloaderProgress] = useState(0);
  const [preloaderFadeActive, setPreloaderFadeActive] = useState(false);

  React.useEffect(() => {
    document.documentElement.classList.add("dark");
    
    // Simple elegant progress interval simulation
    const interval = setInterval(() => {
      setPreloaderProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPreloaderFadeActive(true);
            setTimeout(() => {
              setPreloading(false);
            }, 600); // Wait for transition-all fade duration
          }, 400); // Short delay at 100% for user satisfaction
          return 100;
        }
        // Random fluid progress increment
        const increment = Math.floor(Math.random() * 12) + 6;
        return Math.min(oldProgress + increment, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);
  
  // Shared state to transfer sample triggers to Dashboard workspace
  const [selectedExample, setSelectedExample] = useState({
    text: "",
    relation: "Teman / Kerabat" as RelationType,
    scale: 1
  });

  const scrollToWorkspace = () => {
    const section = document.getElementById("core-workspace-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadExampleToWorkspace = (text: string, relation: string, scale: number) => {
    setSelectedExample({
      text,
      relation: relation as RelationType,
      scale
    });
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-[#FAFAF8] dark:bg-[#121210] selection:bg-[#8ECFC9]/30 selection:text-[#6EBBAE]">
      {/* Absolute Beautiful Preloader Overlay */}
      {preloading && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-500 ease-out bg-[#121210] ${
            preloaderFadeActive ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          {/* Subtle elegant glowing backdrop blob */}
          <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full bg-[#8ECFC9]/5 dark:bg-[#A8C3A0]/5 blur-3xl animate-[pulse_3s_infinite]" />

          <div className="relative flex flex-col items-center space-y-6 px-6 text-center select-none">
            {/* Logo scaling & mild pulsing vibration */}
            <div className="animate-[pulse_2s_infinite_ease-in-out]">
              <Logo className="scale-125 sm:scale-150 transform transition-transform" showText={true} />
            </div>

            {/* Custom Indonesia-centric supportive tagline */}
            <p className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#A8C3A0]/80 uppercase animate-pulse">
              Asisten Penolakan Asertif, Santun & Elegan 🇮🇩
            </p>

            {/* Linear slick loading bar indicator */}
            <div className="w-52 sm:w-64 space-y-2 pt-4">
              <div className="h-1.5 w-full bg-[#1E1E1C] rounded-full overflow-hidden border border-white/[0.04]">
                <div
                  className="h-full bg-gradient-to-r from-[#A8C3A0] to-[#8ECFC9] rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${preloaderProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                <span>Mengunduh Skenario</span>
                <span className="text-[#8ECFC9]">{preloaderProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header logo, text alignment & dark-mode toggler */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onCobaClick={scrollToWorkspace}
      />

      {/* Hero Header Presentation */}
      <Hero
        onCobaClick={scrollToWorkspace}
        onSelectExample={loadExampleToWorkspace}
      />

      {/* Main Core Workspace (Dashboard component mapping) */}
      <Dashboard
        initialText={selectedExample.text}
        initialRelation={selectedExample.relation}
        initialScale={selectedExample.scale}
      />

      {/* Features Showcase ("Wow Factor") */}
      <WowFactor />

      {/* Horizontal Carousel Testimonials */}
      <Testimonials />

      {/* Privacy Guarantee Block */}
      <PrivacyTrust />

      {/* Footers */}
      <Footer />

      {/* Sticky Bottom-Right FAQ Widget */}
      <FaqFloating />
    </div>
  );
}
