import React from "react";
import { Bell, Check } from "lucide-react";

export default function AppDownloadSection({
  title = "ArabanKaçPara uygulamasını indirin",
  bullets = [
    "Uygulamaya özel fırsatların kilidini açın",
    "Teklifleri tek ekranda karşılaştırın",
  ],
  qrSrc = null,
  downloads = "170K+",
  reviews = "10K+",
  googlePlayHref = "#",
  appStoreHref = "#",
  
}) {
  return (
    <section id="app-download" className="relative py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div
          className={[
            "relative overflow-hidden rounded-3xl",
            "border border-[color:color-mix(in_oklab,white_16%,transparent)]",
            "bg-[color:color-mix(in_oklab,black_72%,var(--primary)_28%)]",
            "shadow-2xl",
          ].join(" ")}
        >
          {/* glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-[22rem] w-[22rem] rounded-full blur-3xl opacity-25 bg-[var(--primary)]" />
            <div className="absolute -bottom-28 -right-28 h-[24rem] w-[24rem] rounded-full blur-3xl opacity-15 bg-[var(--primary)]" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-7 sm:p-10">
            {/* SOL */}
            <div className="lg:col-span-7">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                {title}
              </h3>

              <ul className="mt-5 space-y-3">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                      <Check className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-base sm:text-lg">{b}</span>
                  </li>
                ))}
              </ul>

              {/* alt sıra */}
              <div className="mt-7 flex flex-col sm:flex-row sm:items-end gap-6">
                {/* QR */}
                <div className="shrink-0">
                  <div className="rounded-2xl bg-white p-3 shadow-md w-[140px]">
                    {qrSrc ? (
                      <img
                        src={qrSrc}
                        alt="QR Kod"
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-square w-full grid place-items-center text-xs text-black/70">
                        QR Görseli
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats + Store */}
                <div className="flex-1">
                  <div className="flex items-center gap-6 text-white">
                    <div>
                      <div className="text-3xl font-extrabold leading-none">
                        {downloads}
                      </div>
                      <div className="text-sm text-white/80 mt-1">İndirme</div>
                    </div>

                    <div className="h-10 w-px bg-white/25" />

                    <div>
                      <div className="text-3xl font-extrabold leading-none">
                        {reviews}
                      </div>
                      <div className="text-sm text-white/80 mt-1">
                        5 yıldızlı yorum
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={googlePlayHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-white shadow-md hover:opacity-95 transition"
                    >
                      <span className="text-xs leading-tight">
                        <span className="block opacity-80">GET IT ON</span>
                        <span className="block font-semibold">Google Play</span>
                      </span>
                    </a>

                    <a
                      href={appStoreHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-white shadow-md hover:opacity-95 transition"
                    >
                      <span className="text-xs leading-tight">
                        <span className="block opacity-80">Download on the</span>
                        <span className="block font-semibold">App Store</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* SAĞ (Telefon %50 görünür) */}
            <div className="lg:col-span-5 relative overflow-visible">
              <div className="relative mx-auto w-full max-w-[380px] overflow-visible">
                {/* Pencere yüksekliği büyüdü -> telefonun yarısı görünür */}
                <div className="relative h-[340px] sm:h-[420px] overflow-hidden">
                
                  {/* Telefonu daha az aşağı kaydır -> daha çok görünür */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 translate-y-12 sm:translate-y-16">
                    <div
                      className={[
                        "w-[300px] sm:w-[340px]",
                        "rounded-[2.9rem] border-4 border-black/40",
                        "bg-white shadow-2xl overflow-hidden relative",
                      ].join(" ")}
                    >
                      {/* notch */}
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-6 w-28 rounded-b-2xl bg-black/70 z-20" />

                      {/* DEMO ekran (siteye uygun) */}
                      <div className="aspect-[9/19] w-full p-6 pt-12">
                        <div className="text-center font-extrabold text-[var(--primary)] text-xl">
                          ArabanKaçPara
                        </div>
                        <div className="mt-2 text-center text-xs text-black/55">
                          Tek form ile çoklu teklif
                        </div>

                        <div className="mt-6 rounded-2xl border border-black/10 p-4">
                          <div className="flex items-center justify-between">
                            {/* <div className="text-sm font-semibold text-black/80">
                              Teklif Paneli
                            </div>
                            <span className="text-[10px] rounded-full px-2 py-1 bg-[color:color-mix(in_oklab,var(--primary)_16%,white)] text-black/70">
                              CANLI
                            </span> */}
                          </div>

                          <div className="mt-3 space-y-2">
                            <div className="h-10 rounded-xl bg-[color:color-mix(in_oklab,var(--primary)_18%,white)]" />
                            <div className="h-10 rounded-xl bg-[color:color-mix(in_oklab,var(--primary)_12%,white)]" />
                            <div className="h-10 rounded-xl bg-[color:color-mix(in_oklab,var(--primary)_16%,white)]" />
                          </div>

                          <div className="mt-4 text-xs text-black/60">
                            Teklifleri sırala • karşılaştır • en iyiyi seç
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] p-4 font-semibold text-center">
                          En iyi teklifi seç ✅
                        </div>
                      </div>
                    </div>

                    {/* glow */}
                    <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-24 w-72 rounded-full blur-2xl opacity-25 bg-[var(--primary)]" />
                  </div>
                </div>

                {/* desktopta hafif padding */}
                <div className="hidden lg:block h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
