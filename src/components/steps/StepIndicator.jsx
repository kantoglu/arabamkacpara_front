import { Check, Car, Settings, ClipboardCheck, Shield, User } from "lucide-react";

const iconMap = {
  car: Car,
  settings: Settings,
  clipboard: ClipboardCheck,
  shield: Shield,
  user: User,
  check: Check,
};

export default function StepIndicator({ steps, currentStep, onStepClick }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const Icon = iconMap[step.icon] || Check;
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isClickable = index <= currentStep;

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <button
              type="button"
              onClick={() => isClickable && onStepClick(index)}
              disabled={!isClickable}
              className={`flex flex-col items-center gap-2 group ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <div
                className={`step-indicator ${
                  isCompleted ? "step-completed" : isActive ? "step-active" : "step-inactive"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span
                className={`text-xs font-medium hidden md:block transition-colors ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </button>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 md:mx-4">
                <div
                  className={`h-0.5 rounded-full transition-colors ${
                    index < currentStep ? "bg-emerald-500" : "bg-border"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
