"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

export default function MainLayout({ children }) {
  const { theme, setTheme } = useTheme();

  // Temayı kök dizine (html) işle ki Tailwind dark: sınıfları her yerde çalışsın
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-slate-950">
      {/* Header'a theme ve setTheme geçiyoruz */}
      <Header theme={theme} setTheme={setTheme} />
      
      
      <main className="pt-4 md:pt-16 min-h-[calc(100vh-200px)]">
  {children}
</main>
      
      <Footer />
    </div>
  );
}