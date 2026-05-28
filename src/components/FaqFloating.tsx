import React, { useState } from "react";
import { HelpCircle, X, ChevronDown, ChevronUp, ShieldCheck, Sparkles } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "Apakah pesan saya disimpan?",
    answer: "Sama sekali tidak. Kami menggunakan sesi terenkripsi sementara di memori server. Begitu Anda menutup tab atau memuat ulang halaman, semua data Anda langsung terhapus secara permanen."
  },
  {
    question: "Bagaimana cara menentukan skala kealasan?",
    answer: "Gunakan Level 1 jika ingin jujur mengutamakan batasan pribadi. Level 2 memindahkan fokus masalah ke kendala jadwal/sarana eksternal. Level 3 menggunakan skenario urgen yang ramah sosial dan sulit dibantah."
  },
  {
    question: "Mengapa sapaan AI berbeda tiap relasi?",
    answer: "AI mendeteksi relasi secara otomatis. Untuk 'Atasan', digunakan tata krama formal & takzim. Untuk 'Teman', gaya bicara casual dengan Loe-Gue/Aku-Kamu, dan untuk 'Keluarga' bernada takzim ramah santun."
  },
  {
    question: "Apakah saya bisa mengubah hasil dari AI?",
    answer: "Tentu! Setiap opsi dilengkapi tombol 'Edit Manual'. Anda bisa menyesuaikan pilihan kata langsung di dalam box hasil sebelum menyalinnya."
  }
];

export default function FaqFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* FAQ Window Panel */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 max-h-[480px] overflow-y-auto rounded-3xl glass p-5 sm:p-6 shadow-2xl border border-white/5 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#A8C3A0]/20 flex items-center justify-center text-[#A8C3A0]">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                Pertanyaan Populer (FAQ)
              </span>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-white/2 dark:bg-[#252522]/30 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full p-3.5 text-left flex justify-between items-center text-xs font-bold text-gray-200 hover:text-[#8ECFC9] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 text-[11px] text-gray-400 leading-relaxed font-medium border-t border-white/5 pt-2 animate-in fade-in duration-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Inline Badge */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-semibold">
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#A8C3A0]" /> 100% Secure Session
            </span>
            <span className="flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#8ECFC9]" /> TolakHalus Engine
            </span>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#A8C3A0] hover:bg-[#97b28f] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10"
        title="Tanya Jawab (FAQ)"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <HelpCircle className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
