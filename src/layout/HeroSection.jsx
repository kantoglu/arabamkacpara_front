import { useState } from "react";
import CarForm from "../components/CarFormWizard";
import OfferList from "../components/OfferDisplay";

export default function HeroSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // önemli!

  const handleSuccess = (offersFromApi) => {
    setOffers(offersFromApi);
    setSubmitted(true); // form gönderildi, teklifleri göster
    setLoading(false);
  };

  const handleReset = () => {
    setOffers([]);
    setSubmitted(false);
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 text-white min-h-screen"
    >
      {/* Arka plan glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-16 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute -bottom-16 -right-10 w-96 h-96 bg-sky-500/20 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-24 md:py-28 relative">
        {!submitted ? (
          <>
            <div className="text-center space-y-4 mb-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Aracın için{" "}
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-300 bg-clip-text text-transparent">
                  en iyi fiyatı
                </span>{" "}
                birkaç saniyede karşılaştır
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
                Güvenilir alım platformlarından anlık teklifler al — hepsi tek ekranda!
              </p>
            </div>

            <div id="form" className="flex justify-center">
              <CarForm onSuccess={handleSuccess} setLoading={setLoading} />
            </div>
          </>
        ) : (
          <OfferList offers={offers} onReset={handleReset} />
        )}
      </div>
    </section>
  );
}
