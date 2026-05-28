import React from "react";
import { Shield, Sparkles, Sliders, MessageSquare, Volume2, Languages, UserCheck } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

function FeatureCard({ icon, title, description, badge }: FeatureCardProps) {
  return (
    <div className="group relative p-6 sm:p-8 rounded-3xl glass transition-all duration-300 hover:border-[#8ECFC9] hover:shadow-lg hover:-translate-y-1">
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8ECFC9]/5 to-[#A8C3A0]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none" />

      {/* Feature Icon Header */}
      <div className="relative mb-5 flex items-center justify-between">
        <div className="w-11 h-11 rounded-2xl bg-[#FAFAF8] dark:bg-[#252522] border border-black/[0.04] dark:border-white/[0.04] flex items-center justify-center text-[#8ECFC9] dark:text-[#A8C3A0] transition-colors duration-300 group-hover:bg-[#8ECFC9] group-hover:text-white">
          {icon}
        </div>
        {badge && (
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#A8C3A0] bg-[#A8C3A0]/10 px-2.5 py-0.5 rounded-md">
            {badge}
          </span>
        )}
      </div>

      {/* Feature Texts */}
      <h3 className="relative text-base font-bold text-[#1E1E1E] dark:text-[#FAFAFA] mb-2 group-hover:text-[#8ECFC9] transition-colors">
        {title}
      </h3>
      <p className="relative text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}

export default function WowFactor() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-[#FAFAF8] dark:bg-[#121210]">
      {/* Decorative top title */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full border border-[#8ECFC9]/25 bg-[#8ECFC9]/5 text-[#6EBBAE] uppercase text-[10px] font-bold tracking-widest">
          <Sparkles className="w-3 h-3 text-[#cbdcd9]" />
          <span>Keunggulan TolakHalus</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] dark:text-[#FAFAFA] tracking-tight leading-tight">
          Dirancang Khusus untuk Kultur Sosial Indonesia
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Dapatkan hasil penolakan yang sesuai tata krama ketimuran. Cepat, pragmatis, dan tidak melukai ego lawan bicara Anda.
        </p>
      </div>

      {/* 4 grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<MessageSquare className="w-5 h-5 stroke-[1.5]" />}
          title="Analisis Asertif"
          description="Ketikkan situasi sungkan atau ajakan sulit yang kamu hadapi, AI akan memproses analisis penolakan asertif secara instan."
          badge="Analisis"
        />

        <FeatureCard
          icon={<Languages className="w-5 h-5 stroke-[1.5]" />}
          title="Dialek Cerdas"
          description="Menyelaraskan sapaan (Loe Gua, Kamu Aku, Bapak Ibu) sesuai tingkat kedekatan hubungan lawan bicara secara natural."
          badge="Bahasa"
        />

        <FeatureCard
          icon={<Sliders className="w-5 h-5 stroke-[1.5]" />}
          title="Skala Kealasan"
          description="Atur kehalusan alasan penolakan secara fleksibel dari yang jujur realistis hingga alasan darurat keluarga."
          badge="Kealasan"
        />

        <FeatureCard
          icon={<UserCheck className="w-5 h-5 stroke-[1.5]" />}
          title="Counter-Offer AI"
          description="Dilengkapi penawaran alternatif adaptif otomatis demi menjaga peluang relasi bisnis & sosial di masa depan."
          badge="Relasi"
        />
      </div>
    </section>
  );
}
