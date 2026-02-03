import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
} from "lucide-react";

import StepIndicator from "./steps/StepIndicator";
import StepBasicInfo from "./steps/StepBasicInfo";
import StepSpecs from "./steps/StepSpecs";
import StepExpertiz from "./steps/StepExpertiz";
import StepTramer from "./steps/StepTramer";
import StepContact from "./steps/StepContact";
import StepReview from "./steps/StepReview";
import MarkaDropdown from "./steps/BrandDropdown";

import { createCarRequest } from "../services/carRequestApi";

/* ---------------- STEPS ---------------- */

const steps = [
  { id: "basic", label: "Araç Bilgisi" },
  { id: "specs", label: "Teknik" },
  { id: "expertiz", label: "Ekspertiz" },
  { id: "tramer", label: "Tramer" },
  { id: "contact", label: "İletişim" },
  { id: "review", label: "Özet" },
];

/* ------------- INITIAL DATA ------------- */

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
  tramer: {
    value: "",
    tutar: "",
  },
  adSoyad: "",
  telefon: "",
  eposta: "",
  plaka: "",
};

/* ============== MAIN COMPONENT ============== */

export default function CarFormWizard({ onSuccess, setLoading }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [direction, setDirection] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const markaSecildi = Boolean(formData.marka);

  /* -------- FORM UPDATE -------- */

  const updateField = (name, value) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMarkaSecti = (marka) => {
    setFormData((prev) => ({
      ...prev,
      marka,
      seri: "",
    }));
  };

  /* -------- NAVIGATION -------- */

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

  /* -------- SUBMIT -------- */

  const handleSubmit = async () => {
    setSubmitting(true);
    setLoading(true);

    try {
      const offers = await createCarRequest(formData);
      onSuccess(offers);
    } catch (err) {
      console.error(err);
      alert("Teklif alınırken hata oluştu");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  /* -------- STEP RENDER -------- */

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

  /* ========== MARKA SEÇİLMEDEN ÖNCE ========== */

  if (!markaSecildi) {
    return (
      <div className="glass-card p-10 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-white">
          Araç Markasını Seç
        </h2>
        <p className="text-slate-400 text-sm">
          Devam etmek için önce marka seçmelisin
        </p>
        <MarkaDropdown onMarkaSecti={handleMarkaSecti} />
      </div>
    );
  }

  /* ========== WIZARD ========== */

  return (
    <div className="glass-card overflow-hidden">
      {/* Progress */}
      <div className="h-1 bg-slate-800">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Steps */}
      <div className="px-6 py-4 border-b border-slate-700">
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={goToStep}
        />
      </div>

      {/* Content */}
      <div className="p-6 min-h-[420px]">
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

      {/* Footer */}
      <div className="px-6 py-4 flex justify-between items-center border-t border-slate-700">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="btn-secondary disabled:opacity-0"
        >
          <ChevronLeft className="w-5 h-5" />
          Geri
        </button>

        <span className="text-sm text-slate-400">
          {currentStep + 1} / {steps.length}
        </span>

        {currentStep < steps.length - 1 ? (
          <button onClick={nextStep} className="btn-primary">
            İleri
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Gönderiliyor
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Teklifleri Getir
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
