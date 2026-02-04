import {
  Car,
  Settings2,
  ShieldCheck,
  BadgeAlert,
  PhoneCall,
  ClipboardList,
  Check,
} from "lucide-react";

const STEP_ICONS = {
  basic: Car,
  specs: Settings2,
  expertiz: ShieldCheck,
  tramer: BadgeAlert,
  contact: PhoneCall,
  review: ClipboardList,
};

export default function StepIndicator({ steps, currentStep, onStepClick }) {
  const total = Math.max(steps.length - 1, 1);
  const percent = Math.round((currentStep / total) * 100);

  return (
    <div className="space-y-3">
      {/* ✅ Steps row */}
      <div className="flex items-center gap-5 overflow-x-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const Icon = STEP_ICONS[step.id] || ClipboardList;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(index)}
              className={`
                group flex items-center gap-2.5 px-3 py-2 rounded-xl
                whitespace-nowrap transition
                hover:bg-white/5
                ${isActive ? "cursor-default" : "cursor-pointer"}
              `}
            >
              {/* Icon bubble */}
              <span
                className={`
                  relative inline-flex items-center justify-center
                  w-9 h-9 rounded-full border
                  transition
                  ${
                    isCompleted
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : isActive
                      ? "bg-primary/12 border-primary/35 shadow-[0_0_0_6px_rgba(59,130,246,0.08)]"
                      : "bg-white/5 border-white/10"
                  }
                `}
              >
                <Icon
                  className={`
                    w-4.5 h-4.5 transition
                    ${
                      isCompleted
                        ? "text-emerald-400"
                        : isActive
                        ? "text-primary"
                        : "text-slate-400 group-hover:text-slate-300"
                    }
                  `}
                />

                {/* ✅ completed badge */}
                {isCompleted && (
                  <span className="absolute -right-1 -bottom-1 w-4.5 h-4.5 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center shadow">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </span>

              {/* Label */}
              <span
                className={`
                  text-sm font-semibold transition
                  ${
                    isCompleted
                      ? "text-emerald-300"
                      : isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-slate-300"
                  }
                `}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ✅ Progress bar (ALTTA) */}
      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-sky-400 to-emerald-400 transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
