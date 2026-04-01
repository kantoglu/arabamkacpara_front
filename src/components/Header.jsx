"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Header({ theme, setTheme }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const navItems = useMemo(
    () => [
      { href: "#how-it-works", label: "Nasıl Çalışır?" },
      { href: "#why-us", label: "Neden Biz?" },
      { href: "#app-download", label: "Uygulamayı İndir" },
    ],
    []
  );

  // ESC ile menüyü kapat
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Dışarı tıklayınca menüyü kapat
  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Menü açıkken body scroll kapat
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const handleAnchorClick = (href) => (e) => {
    e.preventDefault();
    closeMenu();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 72;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", href);
  };

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Theme uyumlu sınıflar
  const bgHeader = theme === "dark" ? "bg-slate-950/95 border-slate-800" : "bg-white/95 border-slate-200";
  const textHeader = theme === "dark" ? "text-slate-50" : "text-slate-900";
  const mobileMenuBg = theme === "dark" ? "bg-slate-950/95" : "bg-white/95";
  const mobileOverlay = theme === "dark" ? "bg-black/50" : "bg-black/20";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${bgHeader} ${textHeader}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          {/* LOGO */}
          {isHome ? (
            <a href="#home" className="flex items-center gap-3 min-w-0" onClick={handleAnchorClick("#home")}>
              <Logo theme={theme} />
            </a>
          ) : (
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <Logo theme={theme} />
            </Link>
          )}

          {/* DESKTOP NAV */}
          {isHome && (
            <nav className="hidden md:flex items-center gap-8 text-[13px] transition-colors duration-500">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleAnchorClick(item.href)}
                  className={`nav-underline px-1 py-2 transition-colors duration-500
                    ${theme === "dark" ? "text-slate-200 hover:text-white" : "text-slate-900 hover:text-slate-900"}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* DESKTOP THEME SWITCH */}
            <div
              onClick={toggleTheme}
              className={`relative w-14 h-7 flex items-center rounded-full cursor-pointer transition-all duration-500
                ${theme === "dark" ? "bg-indigo-600" : "bg-slate-400/40"} hidden md:flex`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md
                  transition-all duration-500 flex items-center justify-center
                  ${theme === "dark" ? "translate-x-7" : "translate-x-0"}`}
              >
                {theme === "dark" ? <Moon className="w-4 h-4 text-gray-800" /> : <Sun className="w-4 h-4 text-yellow-500" />}
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            {isHome && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border
                  ${theme === "dark" ? "border-white/10 bg-slate-900/60" : "border-slate-300 bg-white/60"} 
                  text-slate-100 hover:bg-slate-900 transition-colors duration-500`}
                aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isHome && (
        <div className={["md:hidden fixed inset-0 z-40", open ? "pointer-events-auto" : "pointer-events-none"].join(" ")}>
          <div className={["absolute inset-0 transition-opacity duration-500", open ? `opacity-100 ${mobileOverlay}` : "opacity-0"].join(" ")} />

          <div
            ref={panelRef}
            className={[
              "absolute left-0 right-0 top-16 mx-3 rounded-2xl border transition-all duration-500 shadow-2xl",
              mobileMenuBg,
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
            ].join(" ")}
          >
            <div className="p-3 flex flex-col gap-2">

              {/* MOBILE THEME SWITCH */}
              <div
                onClick={toggleTheme}
                className={`relative w-14 h-7 flex items-center rounded-full cursor-pointer transition-all duration-500 mb-2
                  ${theme === "dark" ? "bg-indigo-600" : "bg-slate-400/40"}`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md
                    transition-all duration-500 flex items-center justify-center
                    ${theme === "dark" ? "translate-x-7" : "translate-x-0"}`}
                >
                  {theme === "dark" ? <Moon className="w-4 h-4 text-gray-800" /> : <Sun className="w-4 h-4 text-yellow-500" />}
                </div>
              </div>

              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleAnchorClick(item.href)}
                  className={`px-3 py-3 rounded-xl text-sm transition-colors duration-500 
                    ${theme === "dark" ? "text-slate-200 hover:text-white" : "text-slate-900 hover:text-slate-900"} nav-underline`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`h-px transition-colors duration-500 ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`} />
    </header>
  );
}

function Logo({ theme }) {
  return (
    <>
      <div className={`h-10 w-10 rounded-xl overflow-hidden border flex items-center justify-center transition-colors duration-500 ${theme === "dark" ? "border-white/10 bg-slate-900" : "border-slate-300 bg-white"}`}>
        <img src="/logo.jpeg" alt="Logo" className="h-full w-full object-cover" draggable={false} />
      </div>

      <div className="min-w-0 leading-tight">
        <div className={`text-[13px] font-semibold truncate transition-colors duration-500 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Araban Kaç Para?</div>
        <div className={`text-[11px] truncate transition-colors duration-500 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Kurumsal teklif karşılaştırma</div>
      </div>
    </>
  );
}