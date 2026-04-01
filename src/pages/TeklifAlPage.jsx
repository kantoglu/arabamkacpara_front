"use client";

import { useTheme } from "../context/ThemeContext";
import CarForm from "../components/CarFormWizard";
import OfferList from "../components/OfferDisplay";
import FAQSection from "../components/FAQSection";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TeklifAlPage() {
  const { theme } = useTheme(); // theme artık global
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleStart = () => {
    setSubmitted(true);
    setLoading(true);
    setOffers([]);
  };

  const handleSuccess = (offersFromApi) => {
    setOffers(offersFromApi);
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setOffers([]);
    setSubmitted(false);
    setLoading(false);
  };

  return (
    <>
      <section className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
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
                  <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                    en iyi teklifi
                  </span>{" "}
                  al
                </h1>
                <p className="text-[var(--muted-foreground)]">
                  Bilgileri doldur, anlaşmalı platformlardan teklifleri anında karşılaştır.
                </p>
              </motion.div>

              <div className="flex justify-center">
                <CarForm
                  onStart={handleStart}
                  onSuccess={handleSuccess}
                  setLoading={setLoading}
                />
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <OfferList offers={offers} isLoading={loading} onReset={handleReset} />
            </motion.div>
          )}
        </div>
      </section>

      <FAQSection />
    </>
  );
}