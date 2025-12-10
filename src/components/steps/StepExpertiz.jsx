import { useState } from "react";
import { Info } from "lucide-react";

export default function StepExpertiz({ formData, updateField }) {
  const [selectedPart, setSelectedPart] = useState(null);

  const expertizOptions = [
    {
      value: "1",
      label: "Orijinal",
      color: "bg-emerald-500",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      value: "2",
      label: "Boyalı",
      color: "bg-amber-500",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      value: "3",
      label: "Değişmiş",
      color: "bg-red-500",
      textColor: "text-red-600 dark:text-red-400",
    },
  ];

  const carParts = [
    { key: "OnTampon", label: "Ön Tampon" },
    { key: "MotorKaputu", label: "Motor Kaputu" },
    { key: "Tavan", label: "Tavan" },
    { key: "ArkaKaput", label: "Arka Kaput" },
    { key: "ArkaTampon", label: "Arka Tampon" },
    { key: "SolOnCamurluk", label: "Sol Ön Çamurluk" },
    { key: "SolOnKapi", label: "Sol Ön Kapı" },
    { key: "SolArkaCamurluk", label: "Sol Arka Çamurluk" },
    { key: "SagOnCamurluk", label: "Sağ Ön Çamurluk" },
    { key: "SagOnKapi", label: "Sağ Ön Kapı" },
    { key: "SagArkaCamurluk", label: "Sağ Arka Çamurluk" },
    { key: "SagArkaKapi", label: "Sağ Arka Kapı" },
  ];

  const getPartColor = (key) => {
    const value = formData.expertiz[key];
    const option = expertizOptions.find((o) => o.value === value);
    return option?.color || "bg-emerald-500";
  };

  const updateExpertiz = (key, value) => {
    updateField("expertiz", { ...formData.expertiz, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">Ekspertiz Durumu</h2>
        <p className="text-sm text-slate-400">Her parçanın durumunu belirtin.</p>
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-700">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-300">
          <p className="font-medium mb-1">Nasıl Çalışır?</p>
          <p>Her parça için durumu seçin. Varsayılan olarak tüm parçalar "Orijinal" olarak işaretlenmiştir.</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 py-3">
        {expertizOptions.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full ${option.color}`} />
            <span className={`text-sm font-medium ${option.textColor}`}>{option.label}</span>
          </div>
        ))}
      </div>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {carParts.map((part) => {
          const currentValue = formData.expertiz[part.key];
          const currentOption = expertizOptions.find((o) => o.value === currentValue);

          return (
            <div
              key={part.key}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedPart === part.key
                  ? "border-blue-500 bg-slate-800"
                  : "border-slate-700 bg-slate-900"
              }`}
              onClick={() => setSelectedPart(part.key)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${currentOption?.color}`} />
                  <span className="font-medium text-white text-sm">{part.label}</span>
                </div>
                <span className={`text-xs font-medium ${currentOption?.textColor}`}>{currentOption?.label}</span>
              </div>

              <div className="flex gap-2">
                {expertizOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateExpertiz(part.key, option.value)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                      currentValue === option.value
                        ? `${option.color} text-white`
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
