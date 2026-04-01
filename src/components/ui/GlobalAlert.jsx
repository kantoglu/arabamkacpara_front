"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext"; 

const AlertContext = createContext(null);

export function GlobalAlertProvider({ children }) {
  const { theme } = useTheme(); // Global theme

  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  const showAlert = (message) => {
    setAlert({ open: true, message });

    clearTimeout(showAlert._t);
    showAlert._t = setTimeout(() => {
      setAlert((a) => ({ ...a, open: false }));
    }, 4000);
  };

  const closeAlert = () => {
    setAlert((a) => ({ ...a, open: false }));
  };

  // Temaya göre sınıflar
  const bgClass = theme === "dark" ? "bg-slate-950/90 border-rose-500/30" : "bg-white/95 border-rose-500/40";
  const textClass = theme === "dark" ? "text-slate-200" : "text-slate-900";
  const iconBgClass = theme === "dark" ? "bg-rose-500/15 border-rose-500/30" : "bg-rose-500/10 border-rose-500/30";
  const iconColor = theme === "dark" ? "text-rose-400" : "text-rose-600";

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {/* 🔔 GLOBAL ALERT UI */}
      <AnimatePresence>
        {alert.open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 right-5 z-[9999] w-[min(420px,calc(100vw-2rem))]"
          >
            <div
              className={`
                flex gap-3 items-start
                rounded-2xl
                backdrop-blur-md
                border shadow-2xl
                px-4 py-3
                ${bgClass} ${textClass}
              `}
            >
              <div className={`mt-0.5 w-9 h-9 flex items-center justify-center rounded-xl ${iconBgClass}`}>
                <AlertTriangle className={`w-5 h-5 ${iconColor}`} />
              </div>

              <div className={`flex-1 text-sm ${textClass}`}>
                {alert.message}
              </div>

              <button
                onClick={closeAlert}
                className={`transition hover:${theme === "dark" ? "text-white" : "text-slate-700"}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
}

export const useGlobalAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("useGlobalAlert must be used inside GlobalAlertProvider");
  }
  return ctx;
};