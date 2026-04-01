import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../context/ThemeContext";

export function SelectField({ label, icon: Icon, value, options, onChange, renderOption }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  // İlk başta pozisyonun hesaplanmadığını anlamak için null başlıyoruz
  const [position, setPosition] = useState(null);

  const updatePosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  // useLayoutEffect kullanarak DOM boyanmadan hemen önce hesaplama yapıyoruz
  useLayoutEffect(() => {
    if (open) {
      updatePosition();
    } else {
      setPosition(null); // Kapandığında pozisyonu sıfırla
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const buttonClasses = theme === "dark" 
    ? "bg-slate-800/40 hover:bg-slate-700/60 text-white border-slate-700/50" 
    : "bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-sm";

  const dropdownClasses = theme === "dark" 
    ? "bg-slate-900 text-white border-slate-700 shadow-2xl" 
    : "bg-white text-slate-900 border-slate-200 shadow-xl";

  const optionHoverClasses = theme === "dark"
    ? "hover:bg-slate-800 text-slate-200"
    : "hover:bg-blue-50 hover:text-blue-600 text-slate-700";

  return (
    <div className="relative">
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 border transition-all duration-200 ${buttonClasses}`}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className={`w-5 h-5 ${theme === "dark" ? "text-slate-400" : "text-blue-500"}`} />}
          <span className="font-medium">{value || label}</span>
        </div>
        <span className={`text-xs transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {open &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setOpen(false)} />
            
            <div
              className={`rounded-xl border z-[70] py-1 overflow-hidden transition-opacity duration-150 ${dropdownClasses} ${
                position ? "opacity-100" : "opacity-0"
              }`} // ✅ Pozisyon yoksa görünmez, varsa görünür
              style={{
                position: "fixed",
                top: position?.top || 0,
                left: position?.left || 0,
                width: position?.width || 0,
                maxHeight: "240px",
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
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${optionHoverClasses} ${
                    value === option.value 
                      ? (theme === "dark" ? "bg-slate-800/50 text-blue-400" : "bg-blue-50 text-blue-600") 
                      : ""
                  }`}
                >
                  {renderOption ? renderOption(option) : option.label}
                </button>
              ))}
            </div>
          </>,
          document.body
        )}
    </div>
  );
}