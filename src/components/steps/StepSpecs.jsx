import { Fuel, Settings, Palette, Car } from "lucide-react";
import { SelectField } from "../ui/SelectField.jsx";

export default function StepSpecs({ formData, updateField }) {
  const vitesOptions = [
    { value: "Manuel", label: "Manuel" },
    { value: "Otomatik", label: "Otomatik" },
    { value: "Yarı Otomatik", label: "Yarı Otomatik" },
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

  return (
    <div className="max-w-3xl mx-auto space-y-10 text-white overflow-visible">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Teknik Özellikler
        </h2>
        <p className="text-slate-400 mt-1">
          Aracınızın teknik detaylarını seçiniz.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-visible">
        <SelectField
          label="Vites Tipi"
          icon={Settings}
          value={formData.vites}
          options={vitesOptions}
          onChange={(v) => updateField("vites", v)}
        />

        <SelectField
          label="Yakıt Tipi"
          icon={Fuel}
          value={formData.yakit}
          options={yakitOptions}
          onChange={(v) => updateField("yakit", v)}
        />

        <SelectField
          label="Kasa Tipi"
          icon={Car}
          value={formData.bodyType}
          options={bodyTypeOptions}
          onChange={(v) => updateField("bodyType", v)}
        />

        {/* Renk → TAM GENİŞLİK */}
          <SelectField
            label="Renk"
            icon={Palette}
            value={formData.renk}
            options={renkOptions}
            onChange={(v) => updateField("renk", v)}
            renderOption={(option) => (
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full border border-slate-600"
                  style={{ backgroundColor: option.color }}
                />
                {option.label}
              </div>
            )}
          />
        </div>
      </div>
  );
}
