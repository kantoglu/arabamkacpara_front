import { useState } from "react";
import CarForm from "../components/CarFormWizard";
import OfferList from "../components/OfferDisplay";

export default function HeroSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSuccess = (offersFromApi) => {
    setOffers(offersFromApi);
    setSubmitted(true);
    setLoading(false);
  };

  const handleReset = () => {
    setOffers([]);
    setSubmitted(false);
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900"
    >
      {/* glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] bg-indigo-500/15 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-16 w-[28rem] h-[28rem] bg-sky-500/15 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        {!submitted ? (
          <>
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-7">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Aracın için{" "}
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-300 bg-clip-text text-transparent">
                  en iyi fiyatı
                </span>{" "}
                karşılaştır
              </h1>
              <p className="text-slate-300 text-sm md:text-base">
                Güvenilir alım platformlarından teklifler al — hepsi tek ekranda.
              </p>
            </div>

            <div id="form" className="flex justify-center">
              <CarForm onSuccess={handleSuccess} setLoading={setLoading} />
            </div>

            {loading && (
              <div className="text-center text-xs text-slate-400 mt-3">
                Teklifler hazırlanıyor…
              </div>
            )}
          </>
        ) : (
          <div id="offers">
            <OfferList offers={offers} onReset={handleReset} />
          </div>
        )}
      </div>
    </section>
  );
}
