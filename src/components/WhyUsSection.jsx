import React from "react";
import { Zap, Shield, Scale, BadgeCheck } from "lucide-react";

const features = [
  { icon: Zap, title: "Hızlı Araç Satışı", desc: "Tek form doldur, teklifleri hızlıca topla.", tone: "primary" },
  { icon: Shield, title: "Güvenilir Hizmet", desc: "Şeffaf ve güvenilir süreç yönetimi.", tone: "neutral" },
  { icon: Scale, title: "Doğru Fiyat", desc: "Birden fazla alıcıdan gelen teklifi tek ekranda gör.", tone: "neutral" },
  { icon: BadgeCheck, title: "Şeffaf Değerleme", desc: "Değerleme adımları net, sürpriz yok.", tone: "primary" },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20 bg-[var(--primary)]" />
        <div className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-15 bg-[var(--primary)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/25" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* SOL */}
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[3px] rounded-full bg-[var(--primary)] opacity-20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[3px] h-full rounded-full bg-[var(--primary)] opacity-20" />
            </div>

            {features.map((f, idx) => {
              const isPrimary = f.tone === "primary";
              const Icon = f.icon;

              return (
                <div
                  key={idx}
                  className={[
                    "relative z-10 rounded-2xl p-4 sm:p-6",
                    "border transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-2xl",
                    isPrimary
                      ? "bg-[var(--primary)] border-transparent shadow-xl"
                      : "bg-[color:color-mix(in_oklab,black_78%,var(--primary)_22%)] border-[color:color-mix(in_oklab,white_14%,transparent)] shadow-lg",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-center h-20 sm:h-24 w-full mx-auto rounded-2xl">
                    <Icon
                      className={[
                        "w-7 h-7 sm:w-8 sm:h-8",
                        isPrimary
                          ? "text-[var(--primary-foreground)]"
                          : "text-[color:color-mix(in_oklab,var(--primary)_85%,white_15%)]",
                      ].join(" ")}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* SAĞ */}
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white">
              Neden <span className="text-[var(--primary)]">ArabanKaçPara?</span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl mb-7 sm:mb-8 font-medium italic text-white/80">
              “Teklifleri tek tek gezmek yerine, hepsini tek ekranda gör — en iyi seçeneği hızlıca seç.”
            </p>

            <ul className="space-y-4">
              {features.map((f, idx) => {
                const Icon = f.icon;
                const isPrimary = f.tone === "primary";
                return (
                  <li key={idx} className="flex items-start gap-4">
                    <div
                      className={[
                        "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                        isPrimary
                          ? "bg-[var(--primary)]"
                          : "bg-[color:color-mix(in_oklab,black_78%,var(--primary)_22%)] border border-[color:color-mix(in_oklab,white_14%,transparent)]",
                      ].join(" ")}
                    >
                      <Icon
                        className={[
                          "w-5 h-5",
                          isPrimary
                            ? "text-[var(--primary-foreground)]"
                            : "text-[color:color-mix(in_oklab,var(--primary)_85%,white_15%)]",
                        ].join(" ")}
                      />
                    </div>

                    <div>
                      <div className="text-lg font-semibold text-white">{f.title}</div>
                      <div className="mt-1 text-sm sm:text-base text-white/70">{f.desc}</div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-sm">
              <div className="text-sm sm:text-base text-white">
                ✅ Tek form • ✅ Çoklu teklif • ✅ Karşılaştırmalı seçim
              </div>
              <div className="mt-1 text-sm text-white/65">
                İstersen teklifleri sırala, en yüksekten seç ve süreci hızla tamamla.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
