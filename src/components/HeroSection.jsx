"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck, TrendingUp } from "lucide-react";

const partners = [
  { name: "HızlıOtoTeklif", slogan: "Anında nakit ödeme" },
  { name: "AnındaSat.com", slogan: "Türkiye’nin en büyük pazarı" },
  { name: "OtoExpres", slogan: "Ücretsiz ekspertiz" },
  { name: "ArabaDeğerleme.net", slogan: "Güvenli araç satışı" },
  { name: "SatışGarantili", slogan: "Güvenli araç satışı" },
];

export default function HeroSection({ theme }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % partners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const current = partners[active];
  const isDark = theme === "dark";

  return (
    <section
      id="home"
      className={`relative overflow-hidden pt-20 transition-colors duration-500 ${
        isDark ? "bg-slate-950" : "bg-white"
      }`}
    >
      {/* BG & Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-slate-950" : "bg-white"}`} />

        <div
          className={`absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full blur-3xl transition-opacity duration-500 ${
            isDark ? "bg-indigo-800/30" : "bg-sky-300/30"
          }`}
        />
        <div
          className={`absolute -bottom-48 -right-40 h-[34rem] w-[34rem] rounded-full blur-3xl transition-opacity duration-500 ${
            isDark ? "bg-indigo-900/20" : "bg-emerald-300/30"
          }`}
        />

        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isDark
              ? "bg-gradient-to-b from-transparent via-black/15 to-black/45"
              : "bg-gradient-to-b from-transparent via-black/10 to-black/40"
          }`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="space-y-6">
            <h1
              className={`text-4xl md:text-5xl font-bold leading-tight transition-colors duration-500 ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Aracın için{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                en iyi teklifi
              </span>{" "}
              tek ekranda gör
            </h1>

            <p className={`max-w-xl transition-colors duration-500 ${isDark ? "text-white/70" : "text-slate-700"}`}>
              Anlaşmalı ve güvenilir platformlardan teklif al, karşılaştır, en kârlı olanı seç.
            </p>

            <div className={`flex items-center gap-6 text-sm transition-colors duration-500 ${isDark ? "text-white/60" : "text-slate-600"}`}>
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

            <div className="mt-4 flex flex-wrap gap-2">
              {["Tek form", "Çoklu teklif", "Karşılaştırmalı seçim"].map((chip, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors duration-500 ${
                    isDark ? "text-white/85 border-white/10 bg-white/5" : "text-slate-950/85 border-slate-950/10 bg-slate-100/5"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT - Slider */}
          <div className="relative">
            <div
              className={`absolute -inset-[1px] rounded-3xl opacity-40 blur-xl transition-colors duration-500 ${
                isDark ? "bg-indigo-900/40" : "bg-emerald-400/40"
              }`}
            />

            <div
              className={`relative h-56 rounded-3xl border p-0 overflow-hidden shadow-2xl backdrop-blur-xl transition-colors duration-500 ${
                isDark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200/10"
              }`}
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
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg bg-indigo-500">
                    {current.name.charAt(0)}
                  </div>

                  <h3 className={`text-xl font-semibold transition-colors duration-500 ${isDark ? "text-white" : "text-slate-950"}`}>
                    {current.name}
                  </h3>
                  <p className={`mt-2 transition-colors duration-500 ${isDark ? "text-white/65" : "text-slate-700"}`}>
                    {current.slogan}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {partners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                    i === active
                      ? isDark
                        ? "bg-white"
                        : "bg-slate-950"
                      : isDark
                      ? "bg-white/30 hover:bg-white/50"
                      : "bg-slate-950/30 hover:bg-slate-950/50"
                  }`}
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