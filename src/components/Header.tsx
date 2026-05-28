import React from "react";
import { Sun, Moon } from "lucide-react";
import Logo from "./Logo";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onCobaClick: () => void;
}

export default function Header({ darkMode, setDarkMode, onCobaClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 border-b border-black/[0.06] dark:border-white/[0.06] bg-[#FAFAF8]/80 dark:bg-[#121210]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand logo */}
        <div className="flex items-center space-x-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Logo />
        </div>

        {/* Right Nav */}
        <div className="flex items-center space-x-6">
          <span className="hidden md:inline-block text-xs font-medium text-[#1E1E1E]/70 dark:text-[#FAFAFA]/70 tracking-wide select-none group border-b border-transparent hover:border-[#8ECFC9] transition-all duration-300 py-1 cursor-default">
            "Seni menetapkan batasan diri dengan santun."
          </span>

          <div className="flex items-center space-x-3">
            {/* Quick action button */}
            <button
              id="header-cta-btn"
              onClick={onCobaClick}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#1E1E1E] dark:bg-[#FAFAFA] dark:text-[#1E1E1D] hover:bg-opacity-80 dark:hover:bg-opacity-90 transition-all duration-200 rounded-xl shadow-xs cursor-pointer"
            >
              Ubah Situasi
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
