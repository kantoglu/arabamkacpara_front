"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck, TrendingUp } from "lucide-react";

const partners = [
  { name: "VavaCars", slogan: "Anında nakit ödeme", color: "#16a34a" },
  { name: "Arabam.com", slogan: "Türkiye’nin en büyük pazarı", color: "#2563eb" },
  { name: "Otokazanç", slogan: "Ücretsiz ekspertiz", color: "#9333ea" },
  { name: "Letgo Auto", slogan: "Güvenli araç satışı", color: "#f59e0b" },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % partners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const current = partners[active];

  return (
    <section id="home" className="relative overflow-hidden pt-20">
      {/* ✅ BG: HowItWorks dili */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* base */}
        <div className="absolute inset-0 bg-slate-950/95" />

        {/* theme glow */}
        <div className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-15 bg-[var(--primary)]" />
        <div className="absolute -bottom-48 -right-40 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-10 bg-[var(--primary)]" />

        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-black/45" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* LEFT (içerik aynen, sadece ton uyumu) */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Aracın için{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                en iyi teklifi
              </span>{" "}
              tek ekranda gör
            </h1>

            <p className="text-white/70 max-w-xl">
              Anlaşmalı ve güvenilir platformlardan teklif al, karşılaştır,
              en kârlı olanı seç.
            </p>

            <div className="flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Doğrulanmış platformlar
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                En yüksek fiyat garantisi
              </div>
            </div>

            <a
              href="/teklifal"
              className="inline-block mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:brightness-110 transition"
            >
              Hemen Teklif Al →
            </a>

            {/* chips (sende vardı, tonları HowItWorks) */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs text-white/85 border border-white/10 bg-white/5">
                Tek form
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs text-white/85 border border-white/10 bg-white/5">
                Çoklu teklif
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs text-white/85 border border-white/10 bg-white/5">
                Karşılaştırmalı seçim
              </span>
            </div>
          </div>

          {/* RIGHT – SLIDER (aynı içerik, HowItWorks kart dili) */}
          <div className="relative">
            {/* hover/glow ring */}
            <div
              className="
                absolute -inset-[1px] rounded-3xl opacity-40 blur-xl
                bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--primary)_55%,transparent),transparent_60%)]
              "
            />

            <div
              className="
                relative h-56 rounded-3xl border p-0
                overflow-hidden shadow-2xl backdrop-blur-xl
                bg-[color:color-mix(in_oklab,black_80%,var(--primary)_20%)]
                border-[color:color-mix(in_oklab,white_14%,transparent)]
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg"
                    style={{ backgroundColor: current.color }}
                  >
                    {current.name.charAt(0)}
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {current.name}
                  </h3>
                  <p className="text-white/65 mt-2">{current.slogan}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* dots */}
            <div className="flex justify-center gap-2 mt-4">
              {partners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition
                    ${i === active ? "bg-white" : "bg-white/30 hover:bg-white/50"}
                  `}
                  aria-label={`Partner ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
