import React, { useState, useEffect } from "react";
import { Testimonial } from "../types";
import { MessageSquare, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Amelia Septian",
    role: "Product Manager di Tech Startup",
    avatarText: "AS",
    quote: "Bantu banget buat nolak ajakan meeting esok hari yang mendadak tanpa bikin suasana kerja jadi awkward. Hasil bahasanya sopan tapi tetep asertif!",
    avatarColor: "bg-[#8ECFC9]"
  },
  {
    id: "test-2",
    name: "Bagas Raditya",
    role: "Creative Director",
    avatarText: "BR",
    quote: "Kayak punya asisten komunikasi pribadi! Kemarin bingung nolak tawaran pengerjaan freelance murah dari teman dekat. AI TolakHalus ngasih solusi win-win.",
    avatarColor: "bg-[#A8C3A0]"
  },
  {
    id: "test-3",
    name: "Dina Kartika",
    role: "Freelance Copywriter",
    avatarText: "DK",
    quote: "Sekarang nolak pinjemin uang ke kenalan lama yang datang tiba-tiba jadi gampang. Tersedia varian halus yang nggak bikin berantem tapi tetap tegas.",
    avatarColor: "bg-amber-100 dark:bg-amber-900/50 text-amber-600"
  },
  {
    id: "test-4",
    name: "Fadhil Muhammad",
    role: "Karyawan Korporat",
    avatarText: "FM",
    quote: "Sangat bersyukur nemu website ini. Sebagai introvert, bilang tidak ke ajakan hangout dadakan rekan kantor sekarang nggak bikin overthinking lagi.",
    avatarColor: "bg-slate-100 dark:bg-slate-800 text-slate-600"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll testimonials every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#FAFAF8] dark:bg-[#121210]">
      <div className="rounded-3xl p-8 sm:p-12 bg-[#F3F5F2] dark:bg-[#1A1A18] border border-black/[0.04] dark:border-white/[0.04] relative overflow-hidden">
        {/* Decorative Quote Icon */}
        <Quote className="absolute right-8 top-8 w-24 h-24 text-black/[0.02] dark:text-white/[0.02] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
          {/* Left testimonial details */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-black uppercase text-[#8ECFC9] tracking-wider bg-white dark:bg-[#121210] px-3 py-1.5 rounded-xl border border-black/[0.04] dark:border-white/[0.04] inline-block">
              Bukti Sosial Nyata
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] dark:text-[#FAFAFA] leading-tight tracking-tight">
              Dipercaya oleh Ratusan Introvert & Profesional
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
              Mereka yang kini berani mengutamakan prioritas diri sendiri tanpa mengorbankan hubungan sosial.
            </p>

            {/* Slider Navigation Controls */}
            <div className="flex space-x-2 pt-4">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#252522] hover:bg-gray-100 dark:hover:bg-[#1E1E1C] text-[#1E1E1E] dark:text-white transition-colors cursor-pointer"
                title="Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#252522] hover:bg-gray-100 dark:hover:bg-[#1E1E1C] text-[#1E1E1E] dark:text-white transition-colors cursor-pointer"
                title="Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right testimonial active slide */}
          <div className="md:col-span-8">
            <div className="min-h-[220px] flex flex-col justify-between glass rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300 transform scale-100">
              <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200 font-medium italic leading-relaxed">
                "{TESTIMONIALS_DATA[activeIndex].quote}"
              </p>

              <div className="mt-6 flex items-center space-x-3.5 pt-4 border-t border-black/[0.04] dark:border-white/[0.04]">
                {/* Avatar text */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-[#1e1e1d] ${TESTIMONIALS_DATA[activeIndex].avatarColor}`}>
                  {TESTIMONIALS_DATA[activeIndex].avatarText}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E1E1E] dark:text-[#FAFAFA]">
                    {TESTIMONIALS_DATA[activeIndex].name}
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {TESTIMONIALS_DATA[activeIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Dot indicator index */}
            <div className="flex space-x-1.5 justify-center mt-4">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? "w-6 bg-[#8ECFC9]" : "w-1.5 bg-gray-300 dark:bg-gray-700"
                  }`}
                  title={`Slide testimoni ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
