import { Fuel, Settings, Palette, Car } from "lucide-react";

export default function StepSpecs({ formData, updateField }) {
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

  return (
    <div className="space-y-8 text-white">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">Teknik Özellikler</h2>
        <p className="text-sm text-white">Aracınızın teknik detaylarını belirtin.</p>
      </div>

      {/* Vites Tipi */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
          <Settings className="w-4 h-4" />
          Vites Tipi
        </label>
        <div className="grid grid-cols-3 gap-2">
          {vitesOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField("vites", option.value)}
              className={`choice-button text-sm flex flex-col items-center gap-1 px-3 py-2 rounded-md border ${
                formData.vites === option.value ? "choice-button-active" : ""
              }`}
            >
              <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                {option.icon}
              </span>
              <span className="text-sm text-white">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Yakıt Tipi */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
          <Fuel className="w-4 h-4" />
          Yakıt Tipi
        </label>
        <div className="flex flex-wrap gap-2">
          {yakitOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField("yakit", option.value)}
              className={`choice-button text-sm px-4 py-2 ${
                formData.yakit === option.value ? "choice-button-active" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kasa Tipi */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
          <Car className="w-4 h-4" />
          Kasa Tipi
        </label>
        <div className="flex flex-wrap gap-2">
          {bodyTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField("bodyType", option.value)}
              className={`choice-button text-sm px-4 py-2 ${
                formData.bodyType === option.value ? "choice-button-active" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Renk */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
          <Palette className="w-4 h-4" />
          Renk
        </label>
        <div className="flex flex-wrap gap-2">
          {renkOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField("renk", option.value)}
              className={`choice-button text-sm flex items-center gap-2 px-4 py-2 ${
                formData.renk === option.value ? "choice-button-active" : ""
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border-2 border-border"
                style={{ backgroundColor: option.color }}
              />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}