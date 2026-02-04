"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

const AlertContext = createContext(null);

export function GlobalAlertProvider({ children }) {
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
              className="
                flex gap-3 items-start
                rounded-2xl
                bg-slate-950/90 backdrop-blur-md
                border border-rose-500/30
                shadow-2xl
                px-4 py-3
              "
            >
              <div className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/30">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>

              <div className="flex-1 text-sm text-slate-200">
                {alert.message}
              </div>

              <button
                onClick={closeAlert}
                className="text-slate-400 hover:text-white transition"
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
