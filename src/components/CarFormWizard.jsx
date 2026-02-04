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
import { useGlobalAlert } from "../components/ui/GlobalAlert";

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

  // ✅ Global alert
  const { showAlert } = useGlobalAlert();

  const markaSecildi = Boolean(formData.marka);

  const BUTTON_SPINNER_MS = 900;
  const MIN_OFFERS_LOADING_MS = 4500;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const wizardTopRef = useRef(null);

  const scrollToWizardTop = () => {
    const anchor = wizardTopRef.current;

    if (anchor) {
      let p = anchor.parentElement;

      while (p && p !== document.body) {
        const style = window.getComputedStyle(p);
        const overflowY = style.overflowY;
        const isScrollable =
          (overflowY === "auto" || overflowY === "scroll") &&
          p.scrollHeight > p.clientHeight;

        if (isScrollable) {
          p.scrollTo({ top: 0, behavior: "smooth" });
          break;
        }
        p = p.parentElement;
      }

      requestAnimationFrame(() => {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60);
  };

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

  // ✅ zorunlu alan kontrol helper
  const isFilled = (v) => String(v ?? "").trim().length > 0;

  // ✅ Step validation (senin kurala göre)
  const validateStep = (stepId) => {
    if (stepId === "basic") {
      const missing = [];
      if (!isFilled(formData.marka)) missing.push("Marka");
      if (!isFilled(formData.seri)) missing.push("Model / Seri");
      if (!isFilled(formData.modelYili)) missing.push("Model Yılı");
      if (!isFilled(formData.km)) missing.push("Kilometre");

      if (missing.length) {
        showAlert(`Devam etmek için doldur: ${missing.join(", ")}`);
        return false;
      }
      return true;
    }

    if (stepId === "specs") {
      const missing = [];
      if (!isFilled(formData.vites)) missing.push("Vites");
      if (!isFilled(formData.yakit)) missing.push("Yakıt");
      if (!isFilled(formData.bodyType)) missing.push("Kasa Tipi");
      if (!isFilled(formData.renk)) missing.push("Renk");

      if (missing.length) {
        showAlert(`Devam etmek için doldur: ${missing.join(", ")}`);
        return false;
      }
      return true;
    }

    if (stepId === "expertiz") {
      const values = Object.values(formData.expertiz || {});
      const ok = values.length > 0 && values.every((v) => isFilled(v));
      if (!ok) {
        showAlert("Devam etmek için ekspertiz alanlarının tamamını seçmelisin.");
        return false;
      }
      return true;
    }

   if (stepId === "tramer") {
  // StepTramer'a göre:
  // "1" = Tramer Var → tutar zorunlu
  // "2" = Tramer Yok
  // "3" = Bilmiyorum
  // "4" = Ağır Hasar (istersen burada da tutar zorunlu yapabiliriz ama şimdilik istemedin)

  const hasTramer = String(formData.tramer?.value ?? "") === "1";

  if (hasTramer && !isFilled(formData.tramer?.tutar)) {
    showAlert("Tramer var ise tramer tutarı zorunludur");
    return false;
  }

  return true;
}



    if (stepId === "contact") {
      const missing = [];
      if (!isFilled(formData.adSoyad)) missing.push("Ad Soyad");
      if (!isFilled(formData.telefon)) missing.push("Telefon");
      if (missing.length) {
        showAlert(`Devam etmek için doldur: ${missing.join(", ")}`);
        return false;
      }
      return true;
    }

    return true;
  };

  // ✅ Submit öncesi hepsini kontrol et
  const validateAllBeforeSubmit = () => {
    const mustCheck = ["basic", "specs", "expertiz", "tramer", "contact"];
    for (const id of mustCheck) {
      if (!validateStep(id)) return false;
    }
    return true;
  };

  const nextStep = () => {
    if (submitting) return;

    const stepId = steps[currentStep]?.id;

    // ✅ mevcut step tamamlanmadan ilerleme
    if (!validateStep(stepId)) return;

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

  // ✅ StepIndicator tıklamayı tamamen kilitle (sadece gösterim)
  const goToStep = () => {
    return;
  };

  const handleSubmit = async () => {
    if (submitting) return;

    // ✅ submit öncesi full validation
    if (!validateAllBeforeSubmit()) return;

    setSubmitting(true);
    await sleep(BUTTON_SPINNER_MS);

    scrollToWizardTop();

    onStart?.();
    setLoading?.(true);

    const startedAt = Date.now();

    try {
      const offers = await createCarRequest(formData);

      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_OFFERS_LOADING_MS) {
        await sleep(MIN_OFFERS_LOADING_MS - elapsed);
      }

      onSuccess(offers);
    } catch (err) {
      console.error(err);
      showAlert("Teklif alınırken hata oluştu");
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

  const isLast = currentStep === steps.length - 1;

  if (!markaSecildi) {
    return (
     <div className="glass-card w-full md:max-w-md lg:max-w-lg mx-auto p-6 sm:p-10 flex flex-col items-center gap-6">


        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Araç Markasını Seç
        </h2>
        <p className="text-slate-400 text-sm text-center">
          Devam etmek için önce marka seçmelisin
        </p>
        <div className="w-full">
          <MarkaDropdown onMarkaSecti={handleMarkaSecti} />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card w-full max-w-4xl mx-auto">
      <div ref={wizardTopRef} />

      <div className="overflow-hidden">
        {/* Step Indicator */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700">
          <StepIndicator steps={steps} currentStep={currentStep} onStepClick={goToStep} />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 min-h-[220px] sm:min-h-[300px] pb-32 sm:pb-28">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              className="w-full"
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

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-20 border-t border-slate-700 bg-slate-950/80 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0 || submitting}
            className="
              inline-flex items-center gap-2
              rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold
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

          <span className="text-xs sm:text-sm text-slate-400 whitespace-nowrap">
            {currentStep + 1} / {steps.length}
          </span>

          {!isLast ? (
            <button
              onClick={nextStep}
              disabled={submitting}
              className="
                inline-flex items-center gap-2
                rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold
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
                rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold
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
