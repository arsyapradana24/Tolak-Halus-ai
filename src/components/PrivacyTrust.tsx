import React from "react";
import { Shield, Lock, EyeOff, ServerCrash } from "lucide-react";

export default function PrivacyTrust() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#FAFAF8] dark:bg-[#121210]">
      <div className="mx-auto max-w-3xl text-center rounded-3xl p-8 sm:p-10 border border-[#8ECFC9]/30 bg-gradient-to-b from-[#8ECFC9]/5 to-transparent relative shadow-xs">
        {/* Shield Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#8ECFC9]/25 text-[#6EBBAE] dark:text-[#A8C3A0] mb-5 shadow-xs">
          <Shield className="w-6 h-6 stroke-[1.5]" />
        </div>

        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E] dark:text-[#FAFAFA] tracking-tight mb-3">
          Privasi Kamu Aman 100%
        </h2>

        {/* Main descriptions */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-semibold max-w-xl mx-auto mb-8">
          Data chat yang dimasukkan langsung diproses sementara secara lokal (encrypted session memory) & langsung dihancurkan setelah sesi selesai. Kami berkomitmen tidak pernah menyimpan atau melacak riwayat chat penolakan Anda.
        </p>

        {/* Feature points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center justify-center space-x-2 p-3 bg-white dark:bg-[#1C1C1A] rounded-xl border border-black/[0.04] dark:border-white/[0.04]">
            <Lock className="w-4 h-4 text-[#8ECFC9]" />
            <span className="text-[11px] font-bold text-[#1E1E1E] dark:text-gray-300">
              Encrypted Session
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-3 bg-white dark:bg-[#1C1C1A] rounded-xl border border-black/[0.04] dark:border-white/[0.04]">
            <EyeOff className="w-4 h-4 text-[#8ECFC9]" />
            <span className="text-[11px] font-bold text-[#1E1E1E] dark:text-gray-300">
              Tanpa Pelacak Cookies
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-3 bg-white dark:bg-[#1C1C1A] rounded-xl border border-black/[0.04] dark:border-white/[0.04]">
            <ServerCrash className="w-4 h-4 text-[#8ECFC9]" />
            <span className="text-[11px] font-bold text-[#1E1E1E] dark:text-gray-300">
              Penghancuran Data Instan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
