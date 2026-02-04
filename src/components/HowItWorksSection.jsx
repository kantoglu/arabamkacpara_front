import React from "react";
import { ArrowRight, Car, Wrench, Zap } from "lucide-react";

const steps = [
  {
    no: "1",
    title: "Araç bilgilerini doldur",
    desc:
      "Marka, model, yıl, km, vites ve yakıt tipini gir. Kullanıcıyı yormayan adım adım form yapısı.",
    icon: Car,
  },
  {
    no: "2",
    title: "Ekspertiz + tramer detayları",
    desc:
      "İnteraktif krokiden parçaları seç, boyalı / değişen kısımları tek tıkla işaretle, tramer durumunu ekle.",
    icon: Wrench,
  },
  {
    no: "3",
    title: "Teklifleri karşılaştır",
    desc:
      "Formu gönderdiğinde örnek (demo) teklifler görüntülenir. Entegrasyon yapısı gösterim amaçlıdır.",
    icon: Zap,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6">
      {/* theme glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-[22rem] w-[22rem] rounded-full blur-3xl opacity-15 bg-[var(--primary)]" />
        <div className="absolute -bottom-28 -right-28 h-[22rem] w-[22rem] rounded-full blur-3xl opacity-10 bg-[var(--primary)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Nasıl <span className="text-[var(--primary)]">çalışır?</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl">
              Gelişmiş altyapımız sayesinde, gerçek teklif entegrasyonlarına hazır, hızlı ve sade bir deneyim sunuyoruz.
            </p>

            {/* underline */}
            <div className="mt-4 h-1 w-28 rounded-full bg-[var(--primary)]/70" />
          </div>

          {/* small badge */}
          <div
            className={[
              "self-start sm:self-auto",
              "rounded-2xl border px-4 py-2 text-xs sm:text-sm",
              "bg-[color:color-mix(in_oklab,black_78%,var(--primary)_22%)]",
              "border-[color:color-mix(in_oklab,white_16%,transparent)]",
              "text-white/85",
            ].join(" ")}
          >
            ✅ 3 adımda teklif topla & karşılaştır
          </div>
        </div>

        {/* Desktop progress line */}
        <div className="relative hidden md:block mb-6">
          <div className="h-[2px] w-full rounded-full bg-white/10" />
          <div className="absolute left-0 top-0 h-[2px] w-1/2 rounded-full bg-[var(--primary)]/60" />
        </div>

        {/* Steps */}
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.no} className="group relative">
                {/* glow ring on hover */}
                <div
                  className={[
                    "absolute -inset-[1px] rounded-3xl opacity-0 blur-md transition-opacity duration-500",
                    "bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--primary)_55%,transparent),transparent_60%)]",
                    "group-hover:opacity-100",
                  ].join(" ")}
                />

                <div
                  className={[
                    "relative h-full rounded-3xl border p-6",
                    "bg-[color:color-mix(in_oklab,black_80%,var(--primary)_20%)]",
                    "border-[color:color-mix(in_oklab,white_14%,transparent)]",
                    "shadow-xl",
                    "transition-all duration-300",
                    "group-hover:-translate-y-1 group-hover:shadow-2xl",
                  ].join(" ")}
                >
                  {/* top row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          "inline-flex h-10 w-10 items-center justify-center rounded-2xl border",
                          "bg-[color:color-mix(in_oklab,black_74%,var(--primary)_26%)]",
                          "border-[color:color-mix(in_oklab,white_16%,transparent)]",
                        ].join(" ")}
                      >
                        <Icon className="h-5 w-5 text-[var(--primary)]" />
                      </div>

                      <div
                        className={[
                          "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold",
                          "bg-white/10 text-white/90 border border-white/10",
                        ].join(" ")}
                      >
                        Adım {s.no}
                      </div>
                    </div>

                    {/* arrow only desktop */}
                    <div className="hidden md:block text-white/30 group-hover:text-white/60 transition">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {s.desc}
                  </p>

                  {/* bottom mini accent */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="h-1 w-10 rounded-full bg-[var(--primary)]/70" />
                    <div className="h-1 w-6 rounded-full bg-white/10" />
                    <div className="h-1 w-4 rounded-full bg-white/10" />
                  </div>
                </div>

                {/* connector dots (desktop) */}
                {idx !== steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]/60 shadow" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
