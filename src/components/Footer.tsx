import React from "react";
import { Sparkles } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAF8] dark:bg-[#121210] border-t border-black/[0.05] dark:border-white/[0.05] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Logo inside footer */}
          <Logo />

          {/* Slogan Microcopy */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left font-medium max-w-sm">
            TolakHalus.ai • Dibuat untuk membantu seluruh masyarakat Indonesia menetapkan batasan diri dengan asertif, santun, dan elegan tanpa rasa sungkan.
          </p>


        </div>

        {/* Separator */}
        <div className="my-8 border-t border-black/[0.04] dark:border-white/[0.04]" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-400 font-medium">
          <p>© 2026 TolakHalus.ai. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center space-x-1.5 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all select-none">
            <Sparkles className="w-3.5 h-3.5 text-[#8ECFC9]" />
            <span>Karya Kreatif Indonesia Berdaulat</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
