import React from "react";
import { BadgeCheck, RefreshCcw } from "lucide-react";

export default function OffersDisplay({ offers = [], onReset }) {
  if (!Array.isArray(offers)) {
    console.warn("OffersDisplay: 'offers' geçerli bir dizi değil.", offers);
    offers = [];
  }

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const formattedValidUntil = tomorrow.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const bestOffer = offers.reduce((prev, curr) =>
    (curr.price || 0) > (prev.price || 0) ? curr : prev,
    { price: 0 }
  );

  return (
    <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl text-white max-w-5xl mx-auto border border-slate-700">
      {/* Başlık */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">
          🎯 En Yüksek Teklif
        </h2>
      </div>

      {/* En iyi teklif */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500 text-slate-900 p-6 rounded-xl shadow-lg mb-10">
        <div className="flex flex-col items-center text-center">
          <BadgeCheck className="w-10 h-10 mb-2" />
          <h3 className="text-xl font-bold">{bestOffer.siteName}</h3>
          <p className="text-4xl font-extrabold mt-1">
            {bestOffer.price?.toLocaleString("tr-TR")} TL
          </p>
          <p className="text-sm mt-2">Geçerlilik: {formattedValidUntil}</p>
          <p className="text-sm mt-3 text-slate-800">{bestOffer.message}</p>
        </div>
      </div>

      {/* Diğer teklifler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers
          .filter((o) => o._id !== bestOffer._id)
          .map((offer) => (
            <div
              key={offer._id}
              className="bg-slate-800 p-5 rounded-lg border border-slate-700 hover:border-emerald-400 hover:shadow-lg transition-all"
            >
              <h4 className="text-lg font-semibold text-indigo-400">
                {offer.siteName}
              </h4>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {offer.price.toLocaleString("tr-TR")} TL
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Geçerlilik: {formattedValidUntil}
              </p>
              <p className="text-sm text-slate-300 mt-2">{offer.message}</p>
            </div>
          ))}
      </div>

      {/* Buton */}
      {onReset && (
        <div className="flex justify-center mt-12">
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:brightness-110 transition text-white font-semibold flex items-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Yeni Değerlendirme Yap
          </button>
        </div>
      )}
    </div>
  );
}
