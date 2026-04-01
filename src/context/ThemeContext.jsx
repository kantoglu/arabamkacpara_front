// context/ThemeContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initial state artık localStorage veya system theme kontrolü ile
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light"; // SSR güvenliği
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemDark ? "dark" : "light";
  });

  // theme değiştiğinde body class ve localStorage update
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);