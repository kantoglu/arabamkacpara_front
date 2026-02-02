"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck, TrendingUp } from "lucide-react";

const partners = [
  {
    name: "VavaCars",
    slogan: "Anında nakit ödeme",
    color: "#16a34a",
  },
  {
    name: "Arabam.com",
    slogan: "Türkiye’nin en büyük pazarı",
    color: "#2563eb",
  },
  {
    name: "Otokazanç",
    slogan: "Ücretsiz ekspertiz",
    color: "#9333ea",
  },
  {
    name: "Letgo Auto",
    slogan: "Güvenli araç satışı",
    color: "#f59e0b",
  },
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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-[32rem] h-[32rem] bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-24 w-[32rem] h-[32rem] bg-emerald-500/20 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Aracın için{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                en iyi teklifi
              </span>{" "}
              tek ekranda gör
            </h1>

            <p className="text-slate-300 max-w-xl">
              Anlaşmalı ve güvenilir platformlardan teklif al, karşılaştır,
              en kârlı olanı seç.
            </p>

            <div className="flex items-center gap-6 text-sm text-slate-400">
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
          </div>

          {/* RIGHT – SLIDER */}
          <div className="relative">
            <div className="relative h-56 rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                >
                  {/* Fake logo */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4"
                    style={{ backgroundColor: current.color }}
                  >
                    {current.name.charAt(0)}
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {current.name}
                  </h3>
                  <p className="text-slate-400 mt-2">
                    {current.slogan}
                  </p>
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
                    ${i === active ? "bg-white" : "bg-slate-600"}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
