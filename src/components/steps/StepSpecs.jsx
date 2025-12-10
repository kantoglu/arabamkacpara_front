import { Fuel, Settings, Palette, Car } from "lucide-react";
import { useState } from "react";

export default function StepSpecs() {
  const [formData, setFormData] = useState({
    vites: "",
    yakit: "",
    bodyType: "",
    renk: ""
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const vitesOptions = [
    { value: "Manuel", label: "Manuel", icon: "M" },
    { value: "Otomatik", label: "Otomatik", icon: "A" },
    { value: "Yarı Otomatik", label: "Yarı Otomatik", icon: "Y" },
  ];

  const yakitOptions = [
    { value: "Benzin", label: "Benzin" },
    { value: "Dizel", label: "Dizel" },
    { value: "LPG", label: "LPG" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Elektrik", label: "Elektrik" },
  ];

  const bodyTypeOptions = [
    { value: "Sedan", label: "Sedan" },
    { value: "Hatchback", label: "Hatchback" },
    { value: "SUV", label: "SUV" },
    { value: "Crossover", label: "Crossover" },
    { value: "Station Wagon", label: "Station Wagon" },
    { value: "Coupe", label: "Coupe" },
    { value: "Cabrio", label: "Cabrio" },
  ];

  const renkOptions = [
    { value: "Beyaz", label: "Beyaz", color: "#ffffff" },
    { value: "Siyah", label: "Siyah", color: "#1a1a1a" },
    { value: "Gri", label: "Gri", color: "#6b7280" },
    { value: "Gümüş", label: "Gümüş", color: "#c0c0c0" },
    { value: "Mavi", label: "Mavi", color: "#3b82f6" },
    { value: "Kırmızı", label: "Kırmızı", color: "#ef4444" },
    { value: "Lacivert", label: "Lacivert", color: "#1e3a5f" },
    { value: "Kahverengi", label: "Kahverengi", color: "#8b4513" },
  ];

  const sectionStyle = "space-y-4";
  const labelStyle = "flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3";
  const gridButtonBase =
    "px-6 py-3 rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm text-white hover:bg-slate-700/60 hover:border-slate-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

  return (
    <div className="max-w-4xl mx-auto space-y-12 text-white">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Teknik Özellikler
          </h2>
          <p className="text-slate-400">Aracınızın teknik detaylarını belirtin.</p>
        </div>

        {/* Vites Tipi */}
        <div className={sectionStyle}>
          <label className={labelStyle}>
            <Settings className="w-5 h-5 text-emerald-400" />
            Vites Tipi
          </label>
          <div className="grid grid-cols-3 gap-4">
            {vitesOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateField("vites", option.value)}
                className={`${gridButtonBase} ${
                  formData.vites === option.value
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-700 border-indigo-500 shadow-lg shadow-indigo-500/20"
                    : ""
                } flex flex-col items-center gap-3 text-sm font-semibold group`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-200 ${
                  formData.vites === option.value
                    ? "bg-indigo-500"
                    : "bg-slate-700 group-hover:bg-slate-600"
                }`}>
                  {option.icon}
                </div>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Yakıt Tipi */}
        <div className={sectionStyle}>
          <label className={labelStyle}>
            <Fuel className="w-5 h-5 text-indigo-400" />
            Yakıt Tipi
          </label>
          <div className="flex flex-wrap gap-3">
            {yakitOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateField("yakit", option.value)}
                className={`${gridButtonBase} ${
                  formData.yakit === option.value
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-700 border-indigo-500 shadow-lg shadow-indigo-500/20"
                    : ""
                } text-sm font-semibold`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kasa Tipi */}
        <div className={sectionStyle}>
          <label className={labelStyle}>
            <Car className="w-5 h-5 text-pink-400" />
            Kasa Tipi
          </label>
          <div className="flex flex-wrap gap-3">
            {bodyTypeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateField("bodyType", option.value)}
                className={`${gridButtonBase} ${
                  formData.bodyType === option.value
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-700 border-pink-500 shadow-lg shadow-indigo-500/20"
                    : ""
                } text-sm font-semibold`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Renk */}
        <div className={sectionStyle}>
          <label className={labelStyle}>
            <Palette className="w-5 h-5 text-purple-400" />
            Renk
          </label>
          <div className="flex flex-wrap gap-3">
            {renkOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateField("renk", option.value)}
                className={`${gridButtonBase} flex items-center gap-2 text-sm font-semibold ${
                  formData.renk === option.value
                    ? "bg-gradient-to-br from-indigo-600 to-purple-700 border-purple-500 shadow-lg shadow-purple-500/20"
                    : ""
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border-2 border-slate-600"
                  style={{ backgroundColor: option.color }}
                />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
  )
}