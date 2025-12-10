import React from "react";

export default function OffersDisplay({ offers = [], onReset }) {
  if (!Array.isArray(offers)) {
    console.warn("OffersDisplay: 'offers' geçerli bir dizi değil.", offers);
    offers = [];
  }

  const averagePrice =
    offers.length > 0
      ? offers.reduce((sum, offer) => sum + (offer.price || 0), 0) / offers.length
      : 0;

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">Teklifler</h2>
      <p className="mb-4">
        Ortalama Teklif:{" "}
        <span className="font-bold text-green-400">
          {averagePrice.toLocaleString("tr-TR")} TL
        </span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="p-4 border border-slate-700 rounded bg-slate-900"
          >
            <p className="font-semibold">{offer.dealer}</p>
            <p className="text-green-400 text-lg font-bold">
              {offer.price.toLocaleString("tr-TR")} TL
            </p>
          </div>
        ))}
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded"
        >
          Yeni Değerlendirme Yap
        </button>
      )}
    </div>
  );
}
