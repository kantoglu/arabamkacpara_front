"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowRight, RefreshCcw, CheckCircle2, Search } from "lucide-react";

function SupportModal({ open, onClose, onProceed }) {
  const [isMobile, setIsMobile] = useState(true); // default mobile
  const [evadeCount, setEvadeCount] = useState(0);
  const [canClick, setCanClick] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // ✅ En garanti tespit:
  // Mouse hareketi/hover algılarsak desktop'a geç
  useEffect(() => {
    if (!open) return;

    const markDesktop = () => setIsMobile(false);
    const markTouch = () => setIsMobile(true);

    // pointer: mouse gelirse desktop
    const onPointerMove = (e) => {
      if (e.pointerType === "mouse") markDesktop();
    };
    const onMouseMove = () => markDesktop();

    // touch gelirse mobile
    const onTouchStart = () => markTouch();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setEvadeCount(0);
      setCanClick(false);
      setOffset({ x: 0, y: 0 });
    }
  }, [open]);

  const tryEvade = (forceDesktop = false) => {
  // ✅ mouse ile geldiysek desktop kabul et
  if (forceDesktop) setIsMobile(false);

  // ✅ state setIsMobile async olduğu için anlık kontrol:
  if (isMobile && !forceDesktop) return;
  if (canClick) return;

  if (evadeCount < 3) {
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    setOffset({ x: rand(-110, 110), y: rand(-55, 55) });
    setEvadeCount((c) => c + 1);
    return;
  }

  setOffset({ x: 0, y: 0 });
  setCanClick(true);
};

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="support-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        // ❌ ARTIK DIŞARI TIKLAYINCA KAPANMA YOK
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950/90 shadow-2xl"
        >
          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">Minik bir ara ☕</h3>
                <p className="text-slate-300 mt-2 text-sm leading-relaxed">
                  Eğer developer’ımızı daha da istekli çalıştırmak (ve projeyi ayakta tutmak) istersen,
                  aşağıdaki IBAN’a dilediğin kadar “kahve parası” bırakabilirsin.
                </p>
              </div>

              {/* ❌ X ile kapatma istemiyorsun diye kaldırdım.
                  İstersen kalsın ama kapatmasın diye boş bırakırız. */}
            </div>

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <div className="text-xs text-slate-400">IBAN</div>
              <div className="mt-1 font-mono text-sm sm:text-base text-white break-all">
                TR87 0001 0021 9965 6721 5350 06
              </div>
            </div>

            <div className="mt-6">
              {/* ✅ Kaçma tetikleyicisini butondan alıp wrapper’a taşıyoruz (EN GARANTİ) */}
              <div
  className="relative flex justify-center"
  onMouseEnter={() => tryEvade(true)}
  onMouseMove={() => tryEvade(true)}
  onPointerEnter={(e) => {
    if (e.pointerType === "mouse") tryEvade(true);
  }}
  onPointerMove={(e) => {
    if (e.pointerType === "mouse") tryEvade(true);
  }}
>
                <motion.button
                  type="button"
                  onClick={() => {
                    // ✅ SADECE BUTONLA KAPANACAK
                    // mobil: direkt
                    if (isMobile) return onProceed?.();
                    // desktop: kaçma bitmeden tıklanmasın
                    if (!canClick) return;
                    onProceed?.();
                  }}
                  animate={{ x: offset.x, y: offset.y }}
                  transition={{ type: "spring", stiffness: 520, damping: 22 }}
                  style={{ willChange: "transform" }}
                  className={`
                    inline-flex items-center justify-center gap-2
                    rounded-xl px-5 py-2.5 text-sm font-semibold
                    shadow-md transition
                    ${
                      isMobile || canClick
                        ? "bg-emerald-400 text-slate-950 hover:brightness-110"
                        : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                    }
                  `}
                >
                  Teklifleri Gör {isMobile ? "" : canClick ? "✅" : "(yakala!)"}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {!isMobile && !canClick && (
                <p className="mt-3 text-center text-xs text-slate-400">
                  İpucu: Butona yaklaş… ama o da sana yaklaşsın 😄
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


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
  const [showSupport, setShowSupport] = useState(false);
  const [allowShowOffers, setAllowShowOffers] = useState(false);

  // Yeni istek başladığında kapıyı sıfırla (reset / yeni değerlendirme senaryosu)
  useEffect(() => {
    if (isLoading || !Array.isArray(offers) || offers.length === 0) {
      setShowSupport(false);
      setAllowShowOffers(false);
    }
  }, [isLoading, offers]);

  // Spinner bittikten SONRA (offers geldiyse) araya modal girsin
  useEffect(() => {
    if (!isLoading && Array.isArray(offers) && offers.length > 0 && !allowShowOffers) {
      setShowSupport(true);
    }
  }, [isLoading, offers, allowShowOffers]);

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
    <>
      <SupportModal
  open={showSupport && !allowShowOffers}
  onClose={() => {}}
  onProceed={() => {
    setShowSupport(false);
    setAllowShowOffers(true);
  }}
/>

      {allowShowOffers && (
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

            <h2 className="text-2xl font-semibold text-white">{offers.length} Teklif getirildi</h2>
            <p className="text-slate-400 mt-2">
              Ortalama değer:{" "}
              <span className="font-semibold text-white">{Math.round(avgPrice).toLocaleString("tr-TR")} TL</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <OfferCard key={offer.siteName} offer={offer} index={index} isBest={isBest(offer)} />
            ))}
          </div>

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
      )}
    </>
  );
}
