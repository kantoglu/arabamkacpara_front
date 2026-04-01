import React from "react";
import { Zap, Shield, Scale, BadgeCheck } from "lucide-react";

const features = [
  { icon: Zap, title: "Hızlı Araç Satışı", desc: "Tek form doldur, teklifleri hızlıca topla.", tone: "primary" },
  { icon: Shield, title: "Güvenilir Hizmet", desc: "Şeffaf ve güvenilir süreç yönetimi.", tone: "neutral" },
  { icon: Scale, title: "Doğru Fiyat", desc: "Birden fazla alıcıdan gelen teklifi tek ekranda gör.", tone: "neutral" },
  { icon: BadgeCheck, title: "Şeffaf Değerleme", desc: "Değerleme adımları net, sürpriz yok.", tone: "primary" },
];

export default function WhyUsSection({ theme }) {
  const isDark = theme === "dark";

  return (
    <section
      id="why-us"
      className={`relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6`}
    >
      {/* Glow / background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl ${
            isDark ? "bg-[var(--primary)] opacity-20" : "bg-[var(--primary)]/30 opacity-30"
          }`}
        />
        <div
          className={`absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl ${
            isDark ? "bg-[var(--primary)] opacity-15" : "bg-[var(--primary)]/20 opacity-20"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-b from-black/0 via-black/10 to-black/25"
              : "bg-gradient-to-b from-white/0 via-white/5 to-white/10"
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT SIDE ICON GRID */}
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-full h-[3px] rounded-full ${
                  isDark ? "bg-[var(--primary)]/20" : "bg-[var(--primary)]/10"
                }`}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-[3px] h-full rounded-full ${
                  isDark ? "bg-[var(--primary)]/20" : "bg-[var(--primary)]/10"
                }`}
              />
            </div>

            {features.map((f, idx) => {
              const isPrimary = f.tone === "primary";
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className={[
                    "relative z-10 rounded-2xl p-4 sm:p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
                    isPrimary
                      ? isDark
                        ? "bg-[var(--primary)] border-transparent shadow-xl"
                        : "bg-[var(--primary)]/20 border-transparent shadow-lg"
                      : isDark
                      ? "bg-[color:color-mix(in_oklab,black_78%,var(--primary)_22%)] border-[color:color-mix(in_oklab,white_14%,transparent)] shadow-lg"
                      : "bg-white border-slate-200 shadow-sm",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-center h-20 sm:h-24 w-full mx-auto rounded-2xl">
                    <Icon
                      className={[
                        "w-7 h-7 sm:w-8 sm:h-8",
                        isPrimary
                          ? isDark
                            ? "text-[var(--primary-foreground)]"
                            : "text-[var(--primary)]"
                          : isDark
                          ? "text-[color:color-mix(in_oklab,var(--primary)_85%,white_15%)]"
                          : "text-[var(--primary)]",
                      ].join(" ")}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE TEXT */}
          <div className="text-left">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Neden <span className="text-[var(--primary)]">ArabanKaçPara?</span>
            </h2>

            <p
              className={`text-lg sm:text-xl md:text-2xl mb-7 sm:mb-8 font-medium italic ${
                isDark ? "text-white/80" : "text-slate-700/90"
              }`}
            >
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
                          ? isDark
                            ? "bg-[var(--primary)]"
                            : "bg-[var(--primary)]/20"
                          : isDark
                          ? "bg-[color:color-mix(in_oklab,black_78%,var(--primary)_22%)] border border-[color:color-mix(in_oklab,white_14%,transparent)]"
                          : "bg-white border border-slate-200",
                      ].join(" ")}
                    >
                      <Icon
                        className={[
                          "w-5 h-5",
                          isPrimary
                            ? isDark
                              ? "text-[var(--primary-foreground)]"
                              : "text-[var(--primary)]"
                            : isDark
                            ? "text-[color:color-mix(in_oklab,var(--primary)_85%,white_15%)]"
                            : "text-[var(--primary)]",
                        ].join(" ")}
                      />
                    </div>

                    <div>
                      <div
                        className={`text-lg font-semibold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {f.title}
                      </div>
                      <div
                        className={`mt-1 text-sm sm:text-base ${
                          isDark ? "text-white/70" : "text-slate-700/80"
                        }`}
                      >
                        {f.desc}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div
              className={[
                "mt-10 rounded-2xl border p-5 backdrop-blur-xl shadow-sm",
                isDark
                  ? "bg-white/5 border-white/10 text-white"
                  : "bg-slate-50/50 border-slate-200 text-slate-900",
              ].join(" ")}
            >
              <div className={`text-sm sm:text-base`}>
                 Tek form •  Çoklu teklif •  Karşılaştırmalı seçim
              </div>
              <div className={`mt-1 text-sm ${isDark ? "text-white/65" : "text-slate-700/70"}`}>
                İstersen teklifleri sırala, en yüksekten seç ve süreci hızla tamamla.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}