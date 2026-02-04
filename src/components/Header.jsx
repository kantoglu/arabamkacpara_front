"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
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

  // ESC ile kapat
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // dışarı tıklayınca kapat
  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // menü açıkken body scroll kapat
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  // anchor'a giderken header yüksekliği kadar yukarıdan boşluk bırakmak için
  const handleAnchorClick = (href) => (e) => {
    e.preventDefault();
    closeMenu();

    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 72; // header ~64px, biraz pay bıraktık
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    // URL hash'i de güncelle
    history.replaceState(null, "", href);
  };

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        bg-slate-950/85 backdrop-blur-xl
        border-b border-white/5
      "
      style={{ WebkitBackfaceVisibility: "hidden", transform: "translateZ(0)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* logo solda - nav sağda */}
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}
          {isHome ? (
            <a href="#home" className="flex items-center gap-3 min-w-0" onClick={handleAnchorClick("#home")}>
              <Logo />
            </a>
          ) : (
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <Logo />
            </Link>
          )}

          {/* DESKTOP NAV (sağa yakın) */}
          {isHome && (
            <nav className="hidden md:flex items-center gap-8 text-[13px] text-slate-200">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleAnchorClick(item.href)}
                  className="nav-underline px-1 py-2"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* MOBILE HAMBURGER */}
          {isHome && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="
                md:hidden inline-flex items-center justify-center
                h-10 w-10 rounded-xl
                border border-white/10 bg-slate-900/60
                text-slate-100 hover:bg-slate-900
                transition
              "
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {/* MOBILE OVERLAY + PANEL */}
      {isHome && (
        <div
          className={[
            "md:hidden",
            "fixed inset-0 z-40",
            open ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          aria-hidden={!open}
        >
          <div
            className={[
              "absolute inset-0 transition-opacity duration-200",
              open ? "opacity-100 bg-black/50" : "opacity-0 bg-black/0",
            ].join(" ")}
          />

          <div
            ref={panelRef}
            className={[
              "absolute left-0 right-0 top-16",
              "mx-3 rounded-2xl border border-white/10",
              "bg-slate-950/95 backdrop-blur-xl shadow-2xl",
              "transition-all duration-200",
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
            ].join(" ")}
          >
            <div className="p-3">
              <div className="px-2 pt-1 pb-2 text-xs text-slate-400">Menü</div>

              <div className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleAnchorClick(item.href)}
                    className="
                      px-3 py-3 rounded-xl
                      text-sm text-slate-200
                      hover:bg-white/5 hover:text-white
                      transition
                    "
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-px bg-slate-950" />
    </header>
  );
}

function Logo() {
  return (
    <>
      <div className="h-10 w-10 rounded-xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
        <img
          src="/logo.jpeg"
          alt="Logo"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <div className="min-w-0 leading-tight">
        <div className="text-[13px] font-semibold text-white truncate">
          Araban Kaç Para?
        </div>
        <div className="text-[11px] text-slate-400 truncate">
          Kurumsal teklif karşılaştırma
        </div>
      </div>
    </>
  );
}
