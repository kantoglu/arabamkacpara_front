"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowRight, RefreshCcw, CheckCircle2, Search } from "lucide-react";

function LoadingState() {
  const steps = useMemo(
    () => [
      "Partner platformlara bağlanıyoruz…",
      "Araç bilgileri doğrulanıyor…",
      "Teklifler toplanıyor…",
      "Fiyatlar karşılaştırılıyor…",
      "En iyi teklif seçiliyor…",
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % steps.length);
    }, 900);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <div className="max-w-3xl mx-auto text-center py-14 space-y-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        className="mx-auto inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/60 border border-slate-700"
      >
        <Search className="w-8 h-8 text-sky-400" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Teklifler hazırlanıyor…</h2>

        <div className="h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-slate-400"
            >
              {steps[idx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-slate-500 text-sm">Lütfen sayfayı kapatma.</p>
      </div>

      {/* Skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-900 rounded-2xl border border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
                <div className="h-3 w-24 bg-slate-800 rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-8 w-40 bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
            </div>
            <div className="h-12 w-full bg-slate-800 rounded-xl mt-6 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferCard({ offer, index, isBest }) {
  // fiyat alanı local/prod farklı olabiliyor: price / offer
  const shownPrice = Number(offer?.price ?? offer?.offer ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.4 }}
      className={`
        relative bg-slate-900 rounded-2xl border-2 overflow-hidden
        ${isBest ? "border-emerald-400 shadow-lg shadow-emerald-400/20" : "border-slate-700"}
      `}
    >
      {isBest && (
        <div className="absolute top-0 right-0">
          <div className="bg-emerald-400 text-slate-900 px-4 py-1.5 text-xs font-bold rounded-bl-xl flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            En İyi Teklif
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">{offer.siteName}</h3>
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Doğrulanmış Platform
          </div>
        </div>

        <div className="mb-6">
          <span className="text-sm text-slate-400">Teklif Tutarı</span>
          <div className="text-3xl font-bold text-white">
            {shownPrice.toLocaleString("tr-TR")}{" "}
            <span className="text-lg font-normal text-slate-400">TL</span>
          </div>
        </div>

        {offer.message && <p className="text-sm text-slate-300 mb-6">{offer.message}</p>}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition
            ${isBest ? "bg-emerald-400 text-slate-900 hover:brightness-110" : "bg-slate-800 text-white hover:bg-slate-700"}
          `}
        >
          Bu Teklifle Devam Et
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function OffersDisplay({ offers = [], isLoading = false, onReset }) {
  if (isLoading) return <LoadingState />;

  if (!Array.isArray(offers) || offers.length === 0) {
    return <div className="text-center py-12 text-slate-400">Teklif bulunamadı</div>;
  }

  const avgPrice = offers.reduce((sum, o) => sum + Number(o?.price ?? o?.offer ?? 0), 0) / offers.length;

  // ✅ EKLENEN KISIM: local + canlı için güvenli "en iyi teklif" tespiti
  const bestPrice = Math.max(...offers.map((o) => Number(o?.price ?? o?.offer ?? 0)));

  const isBest = (o) => {
    if (o?.isBestOffer === true) return true;
    if (o?.isBestOffer === "true") return true;
    return Number(o?.price ?? o?.offer ?? 0) === bestPrice;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-10">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-400/10 mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </motion.div>

        <h2 className="text-2xl font-semibold text-white">{offers.length} teklif bulundu</h2>
        <p className="text-slate-400 mt-2">
          Ortalama değer:{" "}
          <span className="font-semibold text-white">{Math.round(avgPrice).toLocaleString("tr-TR")} TL</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <OfferCard
            key={offer.siteName}
            offer={offer}
            index={index}
            isBest={isBest(offer)}
          />
        ))}
      </div>

      {onReset && (
        <div className="flex justify-center pt-6 border-t border-slate-700">
          <button onClick={onReset} className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
            <RefreshCcw className="w-4 h-4" />
            Yeni değerlendirme yap
          </button>
        </div>
      )}
    </motion.div>
  );
}
