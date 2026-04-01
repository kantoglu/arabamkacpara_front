"use client";

import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import WhyUsSection from "../components/WhyUsSection";
import AppDownloadSection from "../components/AppDownloadSection";

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col transition-colors duration-500">
      <Header theme={theme} setTheme={setTheme} />
      <HeroSection theme={theme} />
      <HowItWorksSection theme={theme} />
      <WhyUsSection theme={theme} />
      <AppDownloadSection theme={theme} />
    </div>
  );
}