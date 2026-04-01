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

export default function StepIndicator({ steps, currentStep }) {
  const total = Math.max(steps.length - 1, 1);
  const percent = Math.round((currentStep / total) * 100);

  return (
    <div className="space-y-3">
      {/* ✅ MOBİL: sadece ikonlar */}
      <div className="sm:hidden flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const Icon = STEP_ICONS[step.id] || ClipboardList;

          return (
            <button
              key={step.id}
              type="button"
              disabled
              className="flex-1 flex items-center justify-center py-2 rounded-xl pointer-events-none cursor-default"
            >
              <span
                className={`
                  relative inline-flex items-center justify-center
                  w-9 h-9 rounded-full border transition
                  ${
                    isCompleted
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : isActive
                      ? "bg-blue-600/10 border-blue-600/35 shadow-[0_0_0_6px_rgba(59,130,246,0.08)]"
                      /* Light: bg-slate-100, Dark: bg-white/5 */
                      : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10"
                  }
                `}
              >
                <Icon
                  className={`
                    w-4.5 h-4.5 transition
                    ${
                      isCompleted
                        ? "text-emerald-500 dark:text-emerald-400"
                        : isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-400"
                    }
                  `}
                />

                {isCompleted && (
                  <span className="absolute -right-1 -bottom-1 w-4.5 h-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* ✅ DESKTOP: ikon + label */}
      <div className="hidden sm:flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const Icon = STEP_ICONS[step.id] || ClipboardList;

          return (
            <button
              key={step.id}
              type="button"
              disabled
              className="group flex items-center gap-2.5 px-3 py-2 rounded-xl whitespace-nowrap pointer-events-none cursor-default"
            >
              <span
                className={`
                  relative inline-flex items-center justify-center
                  w-9 h-9 rounded-full border transition
                  ${
                    isCompleted
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : isActive
                      ? "bg-blue-600/10 border-blue-600/35 shadow-[0_0_0_6px_rgba(59,130,246,0.08)]"
                      : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10"
                  }
                `}
              >
                <Icon
                  className={`
                    w-4.5 h-4.5 transition
                    ${
                      isCompleted
                        ? "text-emerald-500 dark:text-emerald-400"
                        : isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-400"
                    }
                  `}
                />

                {isCompleted && (
                  <span className="absolute -right-1 -bottom-1 w-4.5 h-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </span>

              <span
                className={`
                  text-sm font-semibold transition
                  ${
                    isCompleted
                      /* Light: emerald-600, Dark: emerald-300 */
                      ? "text-emerald-600 dark:text-emerald-300"
                      : isActive
                      /* Light: slate-900, Dark: white */
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400"
                  }
                `}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ✅ Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}