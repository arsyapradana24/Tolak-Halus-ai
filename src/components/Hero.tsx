import React, { useState } from "react";
import { Sparkles, MessageSquare, ChevronRight, Check, X } from "lucide-react";

interface HeroProps {
  onCobaClick: () => void;
  onSelectExample: (text: string, relation: string, scale: number) => void;
}

interface SampleRefusal {
  category: string;
  relationship: string;
  originalInvitation: string;
  excuseLevel: number;
  politeRefusal: string;
}

const SAMPLE_TEMPLATES: SampleRefusal[] = [
  {
    category: "Pekerjaan Mendesak",
    relationship: "Profesional / Atasan",
    originalInvitation: "Bisa tolong selesaikan presentasi tambahan ini malam ini buat rapat besok pagi?",
    excuseLevel: 2,
    politeRefusal: "Terima kasih banyak atas kepercayaan Bapak/Ibu. Mohon maaf sekali, berhubung saat ini saya ada bentrok jadwal komitmen mendesak malam ini, saya khawatir hasilnya tidak maksimal jika diselesaikan terburu-buru. Bagaimana jika saya bantu selesaikan di prioritas pertama esok pagi jam 8?"
  },
  {
    category: "Pinjam Uang",
    relationship: "Teman / Kerabat",
    originalInvitation: "Bro, boleh pinjam 5 juta gak? Bulan depan gue ganti pas gajian, butuh banget nih buat beli gadget baru.",
    excuseLevel: 1,
    politeRefusal: "Aduh, maaf banget ya Bro belum bisa bantu untuk saat ini. Kondisi tabunganku lagi dialokasikan penuh buat rencana keluarga dekat-dekat ini, jadinya aku lagi gak megang dana longgar. Semoga cepat ketemu jalan keluarnya ya, Bro!"
  },
  {
    category: "Acara Keluarga",
    relationship: "Keluarga / Orang Tua",
    originalInvitation: "Kamu harus datang ya ke arisan keluarga besar hari Sabtu ini jam 2 siang ya, wajib!",
    excuseLevel: 3,
    politeRefusal: "Halo Tante/Om, terima kasih banyak sebelumnya sudah diberitahukan kelonggarannya. Maaf sekali kemarin saya sudah ada janji darurat/komitmen keluarga inti yang sangat mendesak dan mendadak di jam yang sama sehingga belum bisa ikut kumpul arisan kali ini. Titip salam hangat buat seluruh saudara ya, semoga acaranya lancar!"
  },
  {
    category: "Hangout Dadakan",
    relationship: "Teman / Kerabat",
    originalInvitation: "Nongkrong yuk malam ini di cafe biasa jam 9 malam, jangan telat!",
    excuseLevel: 1,
    politeRefusal: "Wah seru banget pasti nangkring malam ini! Tapi maaf banget ya, badanku rasanya lagi butuh istirahat malam ini biar besok seger kerja. Semoga seru ya nongkrongnya, next time kabari lagi agak awal biar aku bisa luangkan waktu!"
  }
];

export default function Hero({ onCobaClick, onSelectExample }: HeroProps) {
  const [showModal, setShowModal] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyExample = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleLoadExample = (sample: SampleRefusal) => {
    onSelectExample(sample.originalInvitation, sample.relationship, sample.excuseLevel);
    setShowModal(false);
    onCobaClick();
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 bg-[#FAFAF8] dark:bg-[#121210]">
      {/* Premium Floating Soft Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#8ECFC9]/15 to-[#A8C3A0]/10 blur-[90px] pointer-events-none select-none" />
      <div className="absolute top-1/3 left-10 w-[200px] h-[200px] rounded-full bg-[#8ECFC9]/5 blur-[70px] pointer-events-none select-none" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] rounded-full bg-[#A8C3A0]/5 blur-[60px] pointer-events-none select-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sparkle micro badge */}
        <div className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full border border-black/[0.05] dark:border-white/[0.05] bg-[#F3F5F2] dark:bg-[#1E1E1C]/80 shadow-xs mb-6 select-none">
          <Sparkles className="w-3.5 h-3.5 text-[#8ECFC9]" />
          <span className="text-[11px] font-medium tracking-wide text-[#1E1E1E]/80 dark:text-[#FAFAFA]/80 uppercase">
            Seni Berkata "Tidak" dengan Sempurna
          </span>
        </div>

        {/* Big Display Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1E1E1E] dark:text-[#FAFAFA] leading-[1.1] mb-6">
          Menolak tanpa <br className="sm:hidden" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#A8C3A0] via-[#8ECFC9] to-[#6EBBAE] dark:from-[#B9D3B2] dark:via-[#9FE0DA] dark:to-[#83CFC1]">
            merasa bersalah.
          </span>
        </h1>

        {/* Subtitle description */}
        <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 font-normal leading-relaxed mb-9 px-2">
          AI cerdas yang membantu kamu menyusun balasan penolakan yang santun, tegas, dan tetap menjaga hubungan baik tetap hangat. Sesuai etika sosial Indonesia.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-cta-main"
            onClick={onCobaClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6.5 py-3.5 text-sm font-semibold text-[#1E1E1E] bg-[#A8C3A0] hover:bg-[#97B28F] dark:from-[#A8C3A0] dark:to-[#8ECFC9] dark:bg-white dark:hover:bg-gray-100 transition-all duration-300 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            Coba Sekarang
            <ChevronRight className="w-4 h-4 ml-1.5" />
          </button>

          <button
            id="hero-cta-secondary"
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6.5 py-3.5 text-sm font-semibold text-[#1E1E1E]/80 dark:text-[#FAFAFA]/80 border border-black/[0.08] dark:border-white/[0.08] bg-transparent hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors duration-200 rounded-2xl cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Lihat Contoh Balasan
          </button>
        </div>
      </div>

      {/* Examples Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#FAFAF8] dark:bg-[#1C1C1A] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-6 sm:p-8 animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Modal Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl border border-black/[0.05] dark:border-white/[0.05] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            <div className="mb-6 flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-[#8ECFC9]/20 text-[#8ECFC9]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-[#FAFAFA]" id="modal-title">
                Contoh Balasan Penolakan Sopan
              </h2>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Berikut beberapa skenario sosial umum yang diracik elegan oleh AI kami. Pilih salah satu untuk dicoba langsung di workspace workspace, atau salin hasilnya!
            </p>

            {/* Examples List */}
            <div className="space-y-4">
              {SAMPLE_TEMPLATES.map((sample, idx) => (
                <div
                  key={idx}
                  className="group relative p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-[#F3F5F2] dark:bg-[#252522] hover:border-[#8ECFC9] dark:hover:border-[#A8C3A0]/50 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8ECFC9] dark:text-[#A8C3A0] bg-white dark:bg-[#1E1E1C] px-2.5 py-1 rounded-md border border-black/[0.04] dark:border-white/[0.04]">
                        {sample.category}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">
                        • {sample.relationship}
                      </span>
                    </div>

                    <button
                      onClick={() => handleLoadExample(sample)}
                      className="text-[11px] font-bold text-[#8ECFC9] hover:text-[#6EBBAE] flex items-center cursor-pointer transition-colors"
                    >
                      Coba Edit Ini <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>

                  {/* Invitation Block */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 italic mb-3 bg-black/[0.02] dark:bg-white/[0.02] p-2.5 rounded-xl border-l-[3px] border-amber-400 select-none">
                    "{sample.originalInvitation}"
                  </div>

                  {/* Refusal Text Box */}
                  <div className="text-xs text-[#1E1E1E] dark:text-[#E2E2E2] font-medium leading-relaxed bg-white dark:bg-[#1E1E1D] p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.04] relative">
                    {sample.politeRefusal}

                    {/* Quick copy overlay inside sample box */}
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => handleCopyExample(sample.politeRefusal, idx)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1 text-[10px] font-semibold text-gray-600 dark:text-gray-400 hover:text-[#1E1E1E] dark:hover:text-white bg-gray-50 dark:bg-black/20 hover:bg-gray-100 dark:hover:bg-black/40 border border-black/[0.06] dark:border-white/[0.06] rounded-md transition-all duration-200 cursor-pointer"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Underline note */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowModal(false)}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
