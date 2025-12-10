import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "./steps/StepIndicator";
import StepBasicInfo from "./steps/StepBasicInfo";
import StepSpecs from "./steps/StepSpecs";
import StepExpertiz from "./steps/StepExpertiz";
import StepTramer from "./steps/StepTramer";
import StepContact from "./steps/StepContact";
import StepReview from "./steps/StepReview";
import { ChevronLeft, ChevronRight, Send, Loader2 } from "lucide-react";

const steps = [
  { id: "basic", label: "Araç Bilgisi", icon: "car" },
  { id: "specs", label: "Teknik", icon: "settings" },
  { id: "expertiz", label: "Ekspertiz", icon: "clipboard" },
  { id: "tramer", label: "Tramer", icon: "shield" },
  { id: "contact", label: "İletişim", icon: "user" },
  { id: "review", label: "Özet", icon: "check" },
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

export default function CarFormWizard({ onSubmit, loading }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [direction, setDirection] = useState(0);

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

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (index) => {
    setDirection(index > currentStep ? 1 : -1);
    setCurrentStep(index);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

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

  return (
    <div className="glass-card overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1.5 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Step Indicators */}
      <div className="px-6 py-6 border-b border-border/60">
        <StepIndicator steps={steps} currentStep={currentStep} onStepClick={goToStep} />
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-8 min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 md:px-8 py-5 bg-muted/50 border-t border-border/60">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="btn-secondary flex items-center gap-2 disabled:invisible"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Geri</span>
          </button>

          <span className="text-sm text-muted-foreground">
            Adım {currentStep + 1} / {steps.length}
          </span>

          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={nextStep} className="btn-primary flex items-center gap-2">
              <span className="hidden sm:inline">Sonraki</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Gönderiliyor...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Teklifleri Getir</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
