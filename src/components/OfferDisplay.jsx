"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  ArrowRight,
  RefreshCcw,
  CheckCircle2
} from "lucide-react";

function OfferCard({ offer, index, isBest }) {
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
      {/* Best Offer Badge */}
      {isBest && (
        <div className="absolute top-0 right-0">
          <div className="bg-emerald-400 text-slate-900 px-4 py-1.5 text-xs font-bold rounded-bl-xl flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            En İyi Teklif
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">
            {offer.siteName}
          </h3>
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Doğrulanmış Platform
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <span className="text-sm text-slate-400">Teklif Tutarı</span>
          <div className="text-3xl font-bold text-white">
            {offer.price.toLocaleString("tr-TR")}{" "}
            <span className="text-lg font-normal text-slate-400">TL</span>
          </div>
        </div>

        {/* Message */}
        {offer.message && (
          <p className="text-sm text-slate-300 mb-6">
            {offer.message}
          </p>
        )}

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition
            ${isBest
              ? "bg-emerald-400 text-slate-900 hover:brightness-110"
              : "bg-slate-800 text-white hover:bg-slate-700"
            }
          `}
        >
          Bu Teklifle Devam Et
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function OffersDisplay({ offers = [], onReset }) {
  if (!Array.isArray(offers) || offers.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        Teklif bulunamadı
      </div>
    );
  }

  const bestOffer = offers.reduce((prev, curr) =>
    curr.price > prev.price ? curr : prev
  );

  const avgPrice =
    offers.reduce((sum, o) => sum + o.price, 0) / offers.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-10"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-400/10 mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </motion.div>

        <h2 className="text-2xl font-semibold text-white">
          {offers.length} teklif bulundu 🎉
        </h2>
        <p className="text-slate-400 mt-2">
          Ortalama değer:{" "}
          <span className="font-semibold text-white">
            {Math.round(avgPrice).toLocaleString("tr-TR")} TL
          </span>
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <OfferCard
            key={offer._id}
            offer={offer}
            index={index}
            isBest={offer._id === bestOffer._id}
          />
        ))}
      </div>

      {/* Reset */}
      {onReset && (
        <div className="flex justify-center pt-6 border-t border-slate-700">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"
          >
            <RefreshCcw className="w-4 h-4" />
            Yeni değerlendirme yap
          </button>
        </div>
      )}
    </motion.div>
  );
}
