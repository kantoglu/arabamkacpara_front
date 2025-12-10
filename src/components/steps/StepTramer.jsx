import { AlertTriangle, CheckCircle, HelpCircle, XCircle } from "lucide-react";

export default function StepTramer({ formData, updateField }) {
  const tramerOptions = [
    {
      value: "2",
      label: "Tramer Yok",
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
    },
    {
      value: "1",
      label: "Tramer Var",
      icon: AlertTriangle,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    },
    {
      value: "3",
      label: "Bilmiyorum",
      icon: HelpCircle,
      color: "text-white",
      bg: "bg-muted/50 border-border",
    },
    {
      value: "4",
      label: "Ağır Hasar",
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    },
  ];

  const selectedOption = tramerOptions.find((o) => o.value === formData.tramer.value);

  return (
    <div className="space-y-6 text-white">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Tramer Kaydı</h2>
        <p className="text-sm text-white/70">Aracınızın tramer (hasar) kaydı durumunu belirtin.</p>
      </div>

      {/* Tramer Seçenekleri */}
      <div className="grid grid-cols-2 gap-4">
        {tramerOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = formData.tramer.value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField("tramer.value", option.value)}
              className={`p-5 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? `${option.bg} ring-2 ring-offset-2 ring-primary/30`
                  : "border-border hover:border-primary/30"
              }`}
            >
              <Icon className={`w-8 h-8 ${option.color} mb-3`} />
              <span className={`font-semibold block ${isSelected ? option.color : "text-white"}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tramer Tutarı Girişi */}
      {formData.tramer.value === "1" && (
        <div className="mt-6 p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <label className="block text-sm font-medium text-amber-800 dark:text-amber-300 mb-3">
            Tramer Tutarı (TL)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 dark:text-amber-400 font-medium">
              ₺
            </span>
            <input
              type="number"
              placeholder="örn: 25000"
              value={formData.tramer.tutar}
              onChange={(e) => updateField("tramer.tutar", e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-card text-white outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">TRAMER sisteminden öğrenebilirsiniz.</p>
        </div>
      )}

      {/* Bilgilendirme Kutusu */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="font-medium text-white mb-2">Tramer Nedir?</h4>
        <p className="text-sm text-white/70">
          TRAMER (Trafik Sigortaları Bilgi ve Gözetim Merkezi), araçların sigorta şirketlerine bildirilen hasar
          kayıtlarını tutan sistemdir. Bu kayıtlar aracın geçmişi hakkında önemli bilgiler içerir.
        </p>
      </div>
    </div>
  );
}