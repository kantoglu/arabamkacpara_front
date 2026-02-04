"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, Loader2 } from "lucide-react";

import StepIndicator from "./steps/StepIndicator";
import StepBasicInfo from "./steps/StepBasicInfo";
import StepSpecs from "./steps/StepSpecs";
import StepExpertiz from "./steps/StepExpertiz";
import StepTramer from "./steps/StepTramer";
import StepContact from "./steps/StepContact";
import StepReview from "./steps/StepReview";
import MarkaDropdown from "./steps/BrandDropdown";

import { createCarRequest } from "../services/carRequestApi";

const steps = [
  { id: "basic", label: "Araç Bilgisi" },
  { id: "specs", label: "Teknik" },
  { id: "expertiz", label: "Ekspertiz" },
  { id: "tramer", label: "Tramer" },
  { id: "contact", label: "İletişim" },
  { id: "review", label: "Özet" },
];

const initialFormData = {
  modelYili: "",
  marka: "",
  seri: "",
  vites: "",
  yakit: "",
  donanim: "",
  bodyType: "",
  km: "",
  renk: "",
  expertiz: {
    SagArkaCamurluk: "1",
    ArkaKaput: "1",
    SolArkaCamurluk: "1",
    SagArkaKapi: "1",
    SagOnCamurluk: "1",
    SagOnKapi: "1",
    SolOnCamurluk: "1",
    SolOnKapi: "1",
    Tavan: "1",
    MotorKaputu: "1",
    OnTampon: "1",
    ArkaTampon: "1",
  },
  tramer: { value: "", tutar: "" },
  adSoyad: "",
  telefon: "",
  eposta: "",
  plaka: "",
};

export default function CarFormWizard({ onSuccess, setLoading, onStart }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [direction, setDirection] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const markaSecildi = Boolean(formData.marka);

  // ✅ İSTEDİĞİN UX
  const BUTTON_SPINNER_MS = 900; // butonda biraz spinner
  const MIN_OFFERS_LOADING_MS = 4500; // büyüteç ekranı min 4-5 sn
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // ✅ Wizard üst anchor
  const wizardTopRef = useRef(null);

  // ✅ En sağlam scroll: window değil container scroll ise onu yakala ve en üste taşı
  const scrollToWizardTop = () => {
    const anchor = wizardTopRef.current;

    // 1) Önce varsa scroll container bul
    if (anchor) {
      let p = anchor.parentElement;

      while (p && p !== document.body) {
        const style = window.getComputedStyle(p);
        const overflowY = style.overflowY;
        const isScrollable =
          (overflowY === "auto" || overflowY === "scroll") && p.scrollHeight > p.clientHeight;

        if (isScrollable) {
          p.scrollTo({ top: 0, behavior: "smooth" });
          break;
        }
        p = p.parentElement;
      }

      // 2) Anchor'ı da ayrıca hedefleyelim (bazı layoutlarda daha iyi)
      requestAnimationFrame(() => {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    // 3) Yine de window'a da bas (bazı sayfalarda asıl scroll budur)
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 4) Bazı durumlarda (Framer/DOM paint) ilk frame yetmiyor → küçük gecikme ile garanti
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60);
  };

  // ✅ Step değişince kesin en üste al
  useEffect(() => {
    scrollToWizardTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const updateField = (name, value) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMarkaSecti = (marka) => {
    setFormData((prev) => ({ ...prev, marka, seri: "" }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const goToStep = (index) => {
    setDirection(index > currentStep ? 1 : -1);
    setCurrentStep(index);
  };

 const handleSubmit = async () => {
  if (submitting) return;

  // 1️⃣ Buton spinner başlasın
  setSubmitting(true);

  // ⏳ Spinner süresi
  await sleep(BUTTON_SPINNER_MS);

  // ✅ SPINNER BİTTİKTEN SONRA SAYFAYI EN ÜSTE AL
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 2️⃣ Artık teklif loading ekranına geç
  onStart?.();
  setLoading?.(true);

  const startedAt = Date.now();

  try {
    const offers = await createCarRequest(formData);

    // 3️⃣ Loading minimum süresini garanti et
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_OFFERS_LOADING_MS) {
      await sleep(MIN_OFFERS_LOADING_MS - elapsed);
    }

    // (istersen burada tekrar scroll da kalabilir ama şart değil)
    // window.scrollTo({ top: 0, behavior: "smooth" });

    // 4️⃣ Teklifleri bas
    onSuccess(offers);
  } catch (err) {
    console.error(err);
    alert("Teklif alınırken hata oluştu");
  } finally {
    setSubmitting(false);
    setLoading?.(false);
  }
};


  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "basic":
        return <StepBasicInfo formData={formData} updateField={updateField} />;
      case "specs":
        return <StepSpecs formData={formData} updateField={updateField} />;
      case "expertiz":
        return <StepExpertiz formData={formData} updateField={updateField} />;
      case "tramer":
        return <StepTramer formData={formData} updateField={updateField} />;
      case "contact":
        return <StepContact formData={formData} updateField={updateField} />;
      case "review":
        return <StepReview formData={formData} goToStep={goToStep} />;
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLast = currentStep === steps.length - 1;

  if (!markaSecildi) {
    return (
      <div className="glass-card p-10 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-white">Araç Markasını Seç</h2>
        <p className="text-slate-400 text-sm">Devam etmek için önce marka seçmelisin</p>
        <MarkaDropdown onMarkaSecti={handleMarkaSecti} />
      </div>
    );
  }

  return (
    // ✅ ÖNEMLİ: overflow-hidden sticky'yi bozabiliyor → kaldırdık
    <div className="glass-card">
      {/* ✅ anchor */}
      <div ref={wizardTopRef} />

      {/* ✅ Köşe kırpma gerekiyorsa: overflow'u sadece içerik bloğuna taşı */}
      <div className="overflow-hidden">
        {/* Step Indicator */}
        <div className="px-6 py-4 border-b border-slate-700">
          <StepIndicator steps={steps} currentStep={currentStep} onStepClick={goToStep} />
        </div>

        {/* Content */}
        <div className="p-6 min-h-[300px] pb-28">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.25 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ✅ Sticky Footer (artık Expertiz’de de sabit görünecek) */}
      <div className="sticky bottom-0 z-20 border-t border-slate-700 bg-slate-950/80 backdrop-blur-md">
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          {/* Back */}
          <button
            onClick={prevStep}
            disabled={currentStep === 0 || submitting}
            className="
              inline-flex items-center gap-2
              rounded-xl px-4 py-2.5 text-sm font-semibold
              bg-slate-800 text-slate-200
              border border-white/10
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              hover:bg-slate-700
              active:translate-y-[1px]
              active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]
              transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <ChevronLeft className="w-4 h-4" />
            Geri
          </button>

          {/* Step info */}
          <span className="text-sm text-slate-400 whitespace-nowrap">
            {currentStep + 1} / {steps.length}
          </span>

          {/* Next / Submit */}
          {!isLast ? (
            <button
              onClick={nextStep}
              disabled={submitting}
              className="
                inline-flex items-center gap-2
                rounded-xl px-5 py-2.5 text-sm font-semibold
                bg-emerald-500 text-emerald-950
                shadow-md
                hover:bg-emerald-400
                active:translate-y-[1px]
                active:shadow-sm
                transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              İleri
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="
                inline-flex items-center gap-2
                rounded-xl px-5 py-2.5 text-sm font-semibold
                bg-emerald-500 text-emerald-950
                shadow-md
                hover:bg-emerald-400
                active:translate-y-[1px]
                active:shadow-sm
                transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Teklifler hazırlanıyor…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Teklifleri Getir
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
