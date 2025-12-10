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
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">Bilgileri Kontrol Edin</h2>
        <p className="text-sm text-muted-foreground">Gönderim öncesi bilgilerinizi gözden geçirin.</p>
      </div>

      {/* Araç Bilgileri */}
     <div className="p-5 rounded-xl bg-muted/50 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Car className="w-5 h-5 text-primary" />
            Araç Bilgileri
          </div>
          <button
            type="button"
            onClick={() => goToStep(0)}
            className="text-primary hover:underline text-sm flex items-center gap-1"
          >
            <Pencil className="w-3 h-3" />
            Düzenle
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-card border border-border">
            <span className="text-xs text-muted-foreground block">Marka / Model</span>
            <span className="font-medium text-foreground">
              {formData.marka} {formData.seri}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <span className="text-xs text-muted-foreground block">Yıl</span>
            <span className="font-medium text-foreground">{formData.modelYili || "-"}</span>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <span className="text-xs text-muted-foreground block">Kilometre</span>
            <span className="font-medium text-foreground">
              {formData.km ? `${Number(formData.km).toLocaleString("tr-TR")} km` : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Teknik Özellikler */}
      <div className="p-5 rounded-xl bg-muted/50 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Settings className="w-5 h-5 text-primary" />
            Teknik Özellikler
          </div>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="text-primary hover:underline text-sm flex items-center gap-1"
          >
            <Pencil className="w-3 h-3" />
            Düzenle
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.vites && (
            <span className="px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary text-sm font-medium">
              {formData.vites}
            </span>
          )}
          {formData.yakit && (
            <span className="px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary text-sm font-medium">
              {formData.yakit}
            </span>
          )}
          {formData.bodyType && (
            <span className="px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary text-sm font-medium">
              {formData.bodyType}
            </span>
          )}
          {formData.renk && (
            <span className="px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary text-sm font-medium">
              {formData.renk}
            </span>
          )}
        </div>
      </div>

      {/* Ekspertiz ve Tramer */}
      <div className="grid grid-cols-2 gap-4">
        {/* Ekspertiz */}
        <div className="p-5 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <ClipboardCheck className="w-4 h-4 text-primary" />
              Ekspertiz
            </div>
            <button type="button" onClick={() => goToStep(2)} className="text-primary text-xs">
              <Pencil className="w-3 h-3" />
            </button>
          </div>
          {changedParts.length === 0 ? (
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Tümü Orijinal</span>
          ) : (
            <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">
              {changedParts.length} parça boyalı/değişmiş
            </span>
          )}
        </div>

        {/* Tramer */}
        <div className="p-5 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Shield className="w-4 h-4 text-primary" />
              Tramer
            </div>
            <button type="button" onClick={() => goToStep(3)} className="text-primary text-xs">
              <Pencil className="w-3 h-3" />
            </button>
          </div>
          <span
            className={`text-sm font-medium ${
              formData.tramer?.value === "2"
                ? "text-emerald-600 dark:text-emerald-400"
                : formData.tramer?.value === "4"
                ? "text-red-600 dark:text-red-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
          >
            {tramerLabels[formData.tramer?.value] || "Belirtilmedi"}
            {formData.tramer?.value === "1" && formData.tramer?.tutar && ` - ₺${Number(formData.tramer.tutar).toLocaleString("tr-TR")}`}
          </span>
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <div className="p-5 rounded-xl bg-muted/50 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <User className="w-5 h-5 text-primary" />
            İletişim Bilgileri
          </div>
          <button
            type="button"
            onClick={() => goToStep(4)}
            className="text-primary hover:underline text-sm flex items-center gap-1"
          >
            <Pencil className="w-3 h-3" />
            Düzenle
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Ad Soyad:</span>{" "}
            <span className="text-white font-medium">{formData.adSoyad || "-"}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Telefon:</span>{" "}
            <span className="text-white font-medium">+90 {formData.telefon || "-"}</span>
          </p>
          {formData.eposta && (
            <p>
              <span className="text-muted-foreground">E-posta:</span>{" "}
              <span className="text-white font-medium">{formData.eposta}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}