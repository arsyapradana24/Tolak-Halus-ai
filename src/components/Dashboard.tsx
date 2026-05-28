import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  MessageSquare,
  Shield,
  Volume2,
  Sliders,
  Copy,
  Check,
  Edit2,
  RefreshCw,
  Loader,
  AlertCircle,
  Clock,
  Send,
  Keyboard,
} from "lucide-react";
import { RelationType, RejectionVariant, ExcuseLevel } from "../types";

interface DashboardProps {
  initialText?: string;
  initialRelation?: RelationType;
  initialScale?: number;
}

const EXCUSE_LEVELS: ExcuseLevel[] = [
  {
    level: 1,
    label: "Jujur Tapi Sopan",
    shortDesc: "Alasan realistis & apa adanya",
    detailDesc: "Pilihan terbaik untuk menjaga integritas jangka panjang. Mengedepankan batasan pribadi apa adanya namun disampaikan dengan empati tinggi dan apresiasi mendalam."
  },
  {
    level: 2,
    label: "Alasan Logistik",
    shortDesc: "Kendala teknis / jadwal",
    detailDesc: "Sangat berguna jika Anda ingin menyalahkan keadaan eksternal tanpa terkesan mengarang. Menjelaskan bentrok jadwal, kesibukan mendesak, atau kendala fisik/jarak."
  },
  {
    level: 3,
    label: "Skenario Darurat Halus",
    shortDesc: "Urgensi aman & sulit dibantah",
    detailDesc: "Digunakan pada situasi ekstrim ketika penolakan langsung dirasa melukai lawan bicara. Menggunakan alasan urusan keluarga mendesak atau komitmen pribadi yang darurat."
  }
];

export default function Dashboard({ initialText = "", initialRelation = "Teman / Kerabat", initialScale = 1 }: DashboardProps) {
  // Input form state
  const [inputContext, setInputContext] = useState(initialText);
  const [relation, setRelation] = useState<RelationType>(initialRelation);
  const [excuseLevel, setExcuseLevel] = useState<number>(initialScale);

  // Output response state
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<RejectionVariant[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Interactive manual edits state
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Listen to outer props shifts
  useEffect(() => {
    if (initialText) setInputContext(initialText);
    if (initialRelation) setRelation(initialRelation);
    if (initialScale) setExcuseLevel(initialScale);
  }, [initialText, initialRelation, initialScale]);

  // Toast triggering function
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Full reset function for resetting user message inputs and outputs
  const handleResetAll = () => {
    setInputContext("");
    setRelation("Teman / Kerabat");
    setExcuseLevel(1);
    setVariants([]);
    setError(null);
    triggerToast("Workspace berhasil disegarkan ke setelan awal 🔄");
  };

  // Call backend Express server to generate responses using real Gemini API!
  const generatePoliteRefusal = async () => {
    if (!inputContext || !inputContext.trim()) {
      triggerToast("Harap isi cerita situasi atau ajakan yang ingin ditolak.");
      return;
    }

    setLoading(true);
    setError(null);
    setVariants([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputContext: inputContext,
          relation: relation,
          excuseLevel: excuseLevel,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperoleh respons dari server AI.");
      }

      const data = await response.json();
      if (data && data.variants) {
        // Map variants with client side IDs
        const formatted = data.variants.map((v: any, index: number) => ({
          id: `var-${index}-${Date.now()}`,
          variantName: v.variantName || `Varian ${String.fromCharCode(65 + index)}`,
          toneBadge: v.toneBadge || "Sopan",
          generatedText: v.generatedText,
          counterOffer: v.counterOffer || "Mungkin lain kali ya."
        }));
        setVariants(formatted);
        triggerToast("Analisis AI Selesai! 🚀 Diperoleh 3 draf penolakan elegan!");
        // Scroll automatically on mobile to the output zone
        const outputEl = document.getElementById("output-zone-anchor");
        if (outputEl) {
          outputEl.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        throw new Error("Format respons kecerdasan buatan menyimpang.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal membuat variasi jawaban. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  };

  // Watch for Ctrl+Enter keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        generatePoliteRefusal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputContext, relation, excuseLevel]);

  // Copy to Clipboard feature
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast("Tersalin. Kirim saat kamu siap ✨");
  };

  // Turn Manual Edit mode ON
  const enableManualEdit = (variantId: string, text: string) => {
    setEditingVariantId(variantId);
    setEditedText(text);
  };

  const saveManualEdit = (variantId: string) => {
    setVariants(prev =>
      prev.map(v => v.id === variantId ? { ...v, generatedText: editedText } : v)
    );
    setEditingVariantId(null);
    triggerToast("Pesan berhasil dimodifikasi secara manual! 📝");
  };

  const getSliderLevelObj = () => {
    return EXCUSE_LEVELS.find((l) => l.level === excuseLevel) || EXCUSE_LEVELS[0];
  };

  // Render original preview placeholder if variants is empty
  const hasVariantsOutput = variants.length > 0;

  return (
    <div id="core-workspace-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 bg-[#FAFAF8] dark:bg-[#121210]">
      {/* Toast Notification Pop-up */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT PANEL: INPUT ZONE */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl p-6 sm:p-8 glass shadow-sm">
            {/* Header of zone */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#A8C3A0]/20 flex items-center justify-center text-[#A8C3A0]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#1E1E1E] dark:text-[#FAFAFA]" id="input-zone-header">
                  Ceritakan Situasimu
                </h3>
              </div>

              {/* Action buttons (Reset & Shortcut Info) */}
              <div className="flex items-center space-x-2.5">
                <button
                  id="reset-inputs-btn"
                  onClick={handleResetAll}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#5D8E8A] dark:text-[#A8C3A0] hover:text-[#FAFAFA] dark:hover:text-[#FAFAFA] bg-[#8ECFC9]/10 dark:bg-[#A8C3A0]/10 hover:bg-[#8ECFC9] dark:hover:bg-[#A8C3A0] transition-all cursor-pointer border border-[#8ECFC9]/20"
                  title="Bersihkan pesan & mengulang"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Segarkan</span>
                </button>

                <div className="hidden sm:flex items-center space-x-1.5 text-[10px] font-mono text-gray-400">
                  <Keyboard className="w-3.5 h-3.5 text-gray-400" />
                  <span>Ctrl + Enter untuk Buat</span>
                </div>
              </div>
            </div>

            {/* Render Context based on Mode */}
            <div className="space-y-3">
              <textarea
                id="chat-textarea-input"
                rows={5}
                value={inputContext}
                onChange={(e) => setInputContext(e.target.value)}
                placeholder="Contoh: 'Besok Sabtu bisa tolong lembur ke kantor buat rapihin arsip?' atau ceritakan misal ditawarin pinjem uang oleh mantan teman lama..."
                className="w-full text-xs sm:text-sm p-4 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-[#FAFAF8] dark:bg-[#121210] text-[#1E1E1E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8ECFC9] focus:border-[#8ECFC9] resize-none leading-relaxed transition-all"
              />
            </div>

            {/* Hubungan Context Chip Selector */}
            <div className="mt-6">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Hubungan dengan Lawan Bicara
              </label>

              <div className="flex flex-wrap gap-2">
                {(["Profesional / Atasan", "Teman / Kerabat", "Keluarga / Orang Tua"] as RelationType[]).map((r) => {
                  const isSelected = relation === r;
                  return (
                    <button
                      key={r}
                      id={`chip-${r.replace(/\s+/g, "-")}`}
                      onClick={() => setRelation(r)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#8ECFC9] bg-[#8ECFC9]/15 text-[#5D8E8A] dark:text-[#A8C3A0]"
                          : "border-black/5 dark:border-white/5 bg-white dark:bg-[#252522] text-gray-500 dark:text-gray-300 hover:bg-[#F3F5F2]"
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Custom Excuse Slider */}
            <div className="mt-6 border-t border-black/[0.06] dark:border-white/[0.06] pt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                  Skala Kealasan
                </label>
                <span className="text-xs font-bold text-[#A8C3A0]">
                  Level {excuseLevel} — {getSliderLevelObj().label}
                </span>
              </div>

              {/* Slider Input with background track nodes */}
              <div className="relative w-full py-4 px-1">
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={excuseLevel}
                  onChange={(e) => setExcuseLevel(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#1e1e1e]/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#A8C3A0] relative z-10"
                />
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-1.5 pointer-events-none z-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/30" />
                </div>
              </div>

              <p className="text-[10px] italic text-gray-500 mt-1 mb-3">
                "{getSliderLevelObj().shortDesc}"
              </p>

              {/* Slide Detail Card */}
              <div className="p-4 rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-[#F3F5F2] dark:bg-[#252522] transition-all duration-300">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                  {getSliderLevelObj().detailDesc}
                </p>
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="mt-8">
              <button
                id="generate-button-main"
                onClick={generatePoliteRefusal}
                disabled={loading}
                className={`w-full py-4 rounded-2xl text-xs sm:text-sm font-bold tracking-wide text-white bg-[#1E1E1E] dark:bg-[#FAFAFA] dark:text-[#1E1E1E] hover:bg-opacity-80 dark:hover:bg-opacity-90 active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  loading ? "cursor-not-allowed opacity-80" : "shadow-md hover:shadow-lg"
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>AI sedang menyusun balasan penolakan elegan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Buat Penolakan Halus</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: OUTPUT ZONE */}
        <div id="output-zone-anchor" className="lg:col-span-5 space-y-6">
          <div className="relative rounded-3xl p-6 sm:p-8 glass shadow-sm min-h-[480px] flex flex-col justify-between">
            {/* Top header state */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.05] dark:border-white/[0.05] mb-5">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Hasil Rekomendasi AI
                </span>
                
                {hasVariantsOutput && (
                  <button
                    onClick={generatePoliteRefusal}
                    disabled={loading}
                    className="p-1.5 text-xs text-gray-400 hover:text-[#1E1E1E] dark:hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    <span className="hidden sm:inline font-bold">Acak Ulang</span>
                  </button>
                )}
              </div>

              {/* No output placeholder */}
              {!hasVariantsOutput && !loading && !error && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-zinc-800/50 flex items-center justify-center text-gray-400 border border-black/[0.03] dark:border-white/[0.03] shadow-inner">
                    <Shield className="w-8 h-8 stroke-[1]" />
                  </div>
                  <div className="max-w-xs space-y-1">
                    <p className="text-sm font-bold text-[#1E1E1E] dark:text-gray-200">
                      Balasan eleganmu akan muncul di sini.
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                      Masukkan situasi sosial di panel sebelah kiri lalu tekan tombol buat untuk melihat keajaiban kalimat santun.
                    </p>
                  </div>
                </div>
              )}

              {/* Skeleton loading animation */}
              {loading && (
                <div className="space-y-6 py-2">
                  {[1, 2, 3].map((v) => (
                    <div
                      key={v}
                      className="p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-[#FAFAF8] dark:bg-[#1E1E1C]/40 animate-pulse space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-16 h-4 bg-gray-200 dark:bg-zinc-800 rounded-md" />
                        <div className="w-20 h-4 bg-gray-200 dark:bg-zinc-800 rounded-md" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-gray-200 dark:bg-zinc-800 rounded-md" />
                        <div className="h-3 w-5/6 bg-gray-200 dark:bg-zinc-800 rounded-md" />
                        <div className="h-3 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded-md" />
                      </div>
                      <hr className="border-black/[0.03] dark:border-white/[0.03]" />
                      <div className="w-40 h-3 bg-gray-200 dark:bg-zinc-800 rounded-md" />
                    </div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-3 bg-red-500/5 rounded-2xl border border-red-500/15 p-6">
                  <AlertCircle className="w-8 h-8 text-red-500 stroke-[1.5]" />
                  <p className="text-xs font-bold text-red-600 dark:text-red-400">
                    Ada Kendala Integrasi
                  </p>
                  <p className="text-[11px] text-gray-400 max-w-xs">
                    {error}
                  </p>
                  <button
                    onClick={generatePoliteRefusal}
                    className="mt-2 text-xs font-semibold text-slate-800 dark:text-gray-200 border border-black/[0.08] dark:border-white/[0.08] px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#1C1C1A] hover:bg-[#F3F5F2] cursor-pointer"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}

              {/* Live Render Output Cards */}
              {hasVariantsOutput && !loading && (
                <div className="space-y-4">
                  {variants.map((variant) => {
                    const isEditing = editingVariantId === variant.id;

                    return (
                      <div
                        key={variant.id}
                        className={`relative p-5 rounded-2xl border-y border-r border-black/[0.05] dark:border-white/[0.05] bg-white dark:bg-[#252522]/40 hover:shadow-md transition-all duration-300 ${
                          variant.variantName.includes("A") || variant.variantName.includes("1")
                            ? "border-l-4 border-[#A8C3A0]" 
                            : variant.variantName.includes("B") || variant.variantName.includes("2")
                            ? "border-l-4 border-[#8ECFC9]"
                            : "border-l-4 border-gray-300 dark:border-zinc-700"
                        }`}
                      >
                        {/* Card Header badges */}
                        <div className="flex items-center justify-between mb-3.5">
                          <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                            {variant.variantName}
                          </span>
                          
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                            variant.toneBadge.includes("Formal")
                              ? "bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-400 border-slate-100"
                              : variant.toneBadge.includes("Hangat")
                              ? "bg-[#A8C3A0]/10 text-[#6EBBAE] dark:text-[#A8C3A0] border-[#A8C3A0]/20"
                              : "bg-[#8ECFC9]/10 text-[#6EBBAE] border-[#8ECFC9]/20"
                          }`}>
                            {variant.toneBadge}
                          </span>
                        </div>

                        {/* Editable Rejection text block */}
                        {isEditing ? (
                          <div className="space-y-2 mb-3">
                            <textarea
                              rows={4}
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                              className="w-full text-xs p-3 border border-[#8ECFC9] bg-white dark:bg-[#121210] text-[#1E1E1E] dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8ECFC9] focus:border-[#8ECFC9] resize-none leading-relaxed"
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setEditingVariantId(null)}
                                className="px-2.5 py-1 text-[10px] text-gray-400 font-semibold hover:text-[#1E1E1E] cursor-pointer"
                              >
                                Batal
                              </button>
                              <button
                                onClick={() => saveManualEdit(variant.id)}
                                className="px-3 py-1 text-[10px] bg-[#8ECFC9] text-white font-semibold rounded-lg hover:bg-[#6EBBAE] cursor-pointer"
                              >
                                Simpan
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-700 dark:text-gray-200 font-medium leading-relaxed mb-4 select-text">
                            {variant.generatedText}
                          </p>
                        )}

                        {/* Separator and AI Solution Counter Offer */}
                        {variant.counterOffer && (
                          <div className="pt-3 border-t border-black/[0.03] dark:border-white/[0.03]">
                            <div className="flex items-center space-x-1 mb-1 text-[10px] text-amber-500 font-bold uppercase tracking-wide">
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Tawaran Balik AI</span>
                            </div>
                            <p className="text-[11px] text-gray-400 font-medium italic">
                              "{variant.counterOffer}"
                            </p>
                          </div>
                        )}

                        {/* Actions button for variant */}
                        {!isEditing && (
                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              id={`edit-manual-${variant.id}`}
                              onClick={() => enableManualEdit(variant.id, variant.generatedText)}
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-[10px] font-semibold text-gray-500 hover:text-gray-900 border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-black/20 hover:bg-[#F3F5F2] dark:text-gray-400 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Edit Teks"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit Manual</span>
                            </button>
                            <button
                              id={`copy-text-${variant.id}`}
                              onClick={() => handleCopyToClipboard(variant.generatedText)}
                              className="inline-flex items-center space-x-1 px-3 py-1.5 text-[10px] font-bold text-[#1E1E1E] bg-[#8ECFC9] hover:bg-[#6EBBAE] text-white rounded-lg cursor-pointer"
                              title="Salin Kalimat"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Salin Teks</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Privacy small helper footnote */}
            <div className="mt-6 border-t border-black/[0.04] dark:border-white/[0.04] pt-4 flex items-center justify-between text-[10px] text-gray-400 font-medium">
              <span className="flex items-center">
                <Shield className="w-3 h-3 mr-1 text-[#8ECFC9]" /> Safe & Encrypted Session
              </span>
              <span className="text-right">TolakHalus.ai v1.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
