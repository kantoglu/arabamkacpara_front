"use client";

import { AlertTriangle, CheckCircle, HelpCircle, XCircle } from "lucide-react";

export default function StepTramer({ formData, updateField }) {
  const tramerOptions = [
    {
      value: "2",
      label: "Tramer Yok",
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/50",
    },
    {
      value: "1",
      label: "Tramer Var",
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/50",
    },
    {
      value: "3",
      label: "Bilmiyorum",
      icon: HelpCircle,
      color: "text-slate-500 dark:text-slate-300",
      bg: "bg-slate-100 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600",
    },
    {
      value: "4",
      label: "Ağır Hasar",
      icon: XCircle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/50",
    },
  ];

  const handleTramerSelect = (selectedValue) => {
    updateField("tramer", {
      value: selectedValue,
      tutar: selectedValue === "1" ? formData.tramer.tutar : null,
    });
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      {/* Başlık */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Tramer Kaydı</h2>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Aracınızın tramer (hasar) kaydı durumunu belirtin.
        </p>
      </div>

      {/* Tramer Seçenekleri */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4">
        {tramerOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = formData.tramer.value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleTramerSelect(option.value)}
              className={`p-5 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? `${option.bg} ring-2 ring-offset-2 ring-blue-500/30`
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
            >
              <Icon className={`w-9 h-9 ${option.color} mb-3`} />
              <span className={`font-extrabold text-lg block ${isSelected ? option.color : "text-slate-800 dark:text-white"}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tramer Tutarı */}
      {formData.tramer.value === "1" && (
        <div className="max-w-3xl mx-auto p-6 rounded-xl bg-amber-50 dark:bg-amber-500/5 border-2 border-amber-200 dark:border-amber-500/40">
          <label className="block text-sm font-bold text-amber-800 dark:text-amber-400 mb-4 uppercase tracking-wider">
            Tramer Tutarı (TL)
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 dark:text-amber-400 font-black text-xl">
              ₺
            </span>

            <input
              type="number"
              placeholder="örn: 25000"
              value={formData.tramer.tutar || ""}
              onChange={(e) =>
                updateField("tramer", {
                  ...formData.tramer,
                  tutar: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="
                w-full pl-12 pr-4 py-4 rounded-xl
                border-2 border-amber-200 dark:border-slate-600
                bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                text-xl font-bold placeholder:text-slate-400 dark:placeholder:text-slate-500
                outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500
                transition-all
              "
            />
          </div>

          <p className="mt-3 text-sm text-amber-700 dark:text-amber-300 font-bold italic">
            * Sorgulama için 5664'e SMS atabilirsiniz.
          </p>
        </div>
      )}

      {/* Bilgilendirme */}
      <div className="max-w-3xl mx-auto p-5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Tramer Nedir?</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          TRAMER, araçların sigorta şirketlerine bildirilen hasar kayıtlarını tutan merkezi sistemdir. 
          Girilen tutar, aracın piyasa değerini hesaplamada temel alınır.
        </p>
      </div>
    </div>
  );
}