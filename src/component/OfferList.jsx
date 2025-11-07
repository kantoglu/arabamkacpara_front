// src/components/OfferList.jsx

function OfferList({ offers, loading }) {
  return (
    <div className="h-full">
      <div className="bg-white shadow-sm rounded-xl p-4 md:p-5 h-full flex flex-col">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Demo Teklifler
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Burada gösterilen teklifler sistem tarafından otomatik üretilmiştir.
          Gerçek alım siteleri ile entegrasyon henüz yapılmamıştır.
        </p>

        {loading && (
          <p className="text-sm text-slate-600">Teklifler hesaplanıyor...</p>
        )}

        {!loading && offers.length === 0 && (
          <p className="text-sm text-slate-500">
            Henüz teklif yok. Soldaki formu doldurup gönderdiğinde burada
            örnek teklifler gözükecek.
          </p>
        )}

        <div className="mt-2 space-y-3 overflow-auto">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="border border-slate-100 rounded-lg p-3 bg-slate-50"
            >
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-sm font-semibold text-slate-800">
                  {offer.siteName}
                </h3>
                <span className="text-xs font-semibold text-emerald-700">
                  ~ {offer.price.toLocaleString("tr-TR")} TL
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-1">
                {offer.message}
              </p>
              {offer.validUntil && (
                <p className="text-[11px] text-slate-500">
                  Geçerlilik:{" "}
                  {new Date(offer.validUntil).toLocaleDateString("tr-TR")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OfferList;