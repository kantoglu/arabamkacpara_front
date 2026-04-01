"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

export default function MainLayout({ children }) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <main>{children}</main>
      <Footer />
    </>
  );
}