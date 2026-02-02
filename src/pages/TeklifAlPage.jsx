"use client";

import { useState } from "react";
import CarForm from "../components/CarFormWizard";
import OfferList from "../components/OfferDisplay";
import FAQSection from "../components/FAQSection";
import { motion } from "framer-motion";

export default function TeklifAlPage() {
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
    <>
      <section className="relative min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
        {/* glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-indigo-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-sky-500/15 blur-3xl rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          {!submitted ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto text-center space-y-4 mb-10"
              >
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  Aracın için{" "}
                  <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                    en iyi teklifi
                  </span>{" "}
                  al
                </h1>

                <p className="text-slate-300">
                  Bilgileri doldur, anlaşmalı platformlardan teklifleri
                  anında karşılaştır.
                </p>
              </motion.div>

              <div className="flex justify-center">
                <CarForm onSuccess={handleSuccess} setLoading={setLoading} />
              </div>

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-slate-400 mt-4"
                >
                  Teklifler hazırlanıyor…
                </motion.div>
              )}
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <OfferList offers={offers} onReset={handleReset} />
            </motion.div>
          )}
        </div>
      </section>

      
      <FAQSection />
    </>
  );
}
