"use client";

import { Car, Settings, ClipboardCheck, Shield, User, Pencil } from "lucide-react";
import { useMemo } from "react";

export default function StepReview({ formData, goToStep }) {
  const expertizLabels = {
    "1": "Orijinal",
    "2": "Boyalı",
    "3": "Değişmiş",
  };

  const tramerLabels = {
    "1": "Var",
    "2": "Yok",
    "3": "Bilmiyorum",
    "4": "Ağır Hasar",
  };

  const changedParts = useMemo(() => {
    return Object.entries(formData.expertiz || {}).filter(([_, value]) => value !== "1");
  }, [formData.expertiz]);

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1 uppercase tracking-tight">Bilgileri Kontrol Edin</h2>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Gönderim öncesi bilgilerinizi gözden geçirin.</p>
      </div>

      {/* Araç Bilgileri */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
            <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Araç Bilgileri
          </div>
          <button
            type="button"
            onClick={() => goToStep(0)}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-bold flex items-center gap-1 bg-blue-50 dark:bg-blue-400/10 px-3 py-1 rounded-lg transition-colors"
          >
            <Pencil className="w-3 h-3" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Marka / Model</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {formData.marka} {formData.seri}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Yıl</span>
            <span className="font-bold text-slate-900 dark:text-white">{formData.modelYili || "-"}</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Kilometre</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {formData.km ? `${Number(formData.km).toLocaleString("tr-TR")} km` : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Teknik Özellikler */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
            <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Teknik Özellikler
          </div>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-bold flex items-center gap-1 bg-purple-50 dark:bg-purple-400/10 px-3 py-1 rounded-lg transition-colors"
          >
            <Pencil className="w-3 h-3" />
            Düzenle
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {[formData.vites, formData.yakit, formData.bodyType, formData.renk].map((item, index) => (
            item && (
              <span key={index} className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-sm">
                {item}
              </span>
            )
          ))}
        </div>
      </div>

      {/* Ekspertiz ve Tramer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ekspertiz */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-sm">
              <ClipboardCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Ekspertiz
            </div>
            <button type="button" onClick={() => goToStep(2)} className="p-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-400/10 rounded-lg transition-colors text-emerald-600 dark:text-emerald-400">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {changedParts.length === 0 ? (
              <span className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-black uppercase">Tümü Orijinal</span>
            ) : (
              <span className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-black uppercase">
                {changedParts.length} PARÇA BOYA/DEĞİŞEN
              </span>
            )}
          </div>
        </div>

        {/* Tramer */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-sm">
              <Shield className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              Tramer
            </div>
            <button type="button" onClick={() => goToStep(3)} className="p-1.5 hover:bg-orange-100 dark:hover:bg-orange-400/10 rounded-lg transition-colors text-orange-600 dark:text-orange-400">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className={`mt-2 inline-block px-3 py-1 rounded-lg text-sm font-black uppercase ${
              formData.tramer?.value === "2"
                ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : formData.tramer?.value === "4"
                ? "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                : "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400"
            }`}>
            {tramerLabels[formData.tramer?.value] || "Belirtilmedi"}
            {formData.tramer?.value === "1" && formData.tramer?.tutar && ` - ₺${Number(formData.tramer.tutar).toLocaleString("tr-TR")}`}
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            İletişim Bilgileri
          </div>
          <button
            type="button"
            onClick={() => goToStep(4)}
            className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-bold flex items-center gap-1 bg-indigo-50 dark:bg-indigo-400/10 px-3 py-1 rounded-lg transition-colors"
          >
            <Pencil className="w-3 h-3" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 block">Ad Soyad</span>
            <span className="text-slate-900 dark:text-white font-bold text-base">{formData.adSoyad || "-"}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 block">Telefon</span>
            <span className="text-slate-900 dark:text-white font-bold text-base">+90 {formData.telefon || "-"}</span>
          </div>
          {formData.eposta && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 block">E-posta</span>
              <span className="text-slate-900 dark:text-white font-bold text-base">{formData.eposta}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}