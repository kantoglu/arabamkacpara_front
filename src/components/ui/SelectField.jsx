import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export function SelectField({ label, icon: Icon, value, options, onChange, renderOption }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  // Dropdown pozisyonu
  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl px-4 py-3 text-white hover:bg-slate-700/60 transition"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-slate-400" />}
          <span>{value || label}</span>
        </div>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open &&
        createPortal(
          <div
            className="bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700/50 z-50"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: position.width,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 transition"
              >
                {renderOption ? renderOption(option) : option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
