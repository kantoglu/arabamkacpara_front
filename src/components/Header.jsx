"use client";

import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        bg-slate-950/85 backdrop-blur-xl
        border-b border-white/5
      "
      style={{
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          
          {/* LOGO */}
          {isHome ? (
            <a href="#home" className="flex items-center gap-3 min-w-0">
              <Logo />
            </a>
          ) : (
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <Logo />
            </Link>
          )}

          {/* NAV */}
          {isHome && (
            <nav className="hidden md:flex items-center gap-6 text-[13px] text-slate-300">
              <a href="#how-it-works" className="hover:text-white transition-colors">
                Nasıl Çalışır
              </a>
              {/* <a href="#offers" className="hover:text-white transition-colors">
                Teklifler
              </a> */}
              <a href="#contact" className="hover:text-white transition-colors">
                İletişim
              </a>
            </nav>
          )}

        </div>
      </div>

      <div className="h-px bg-slate-950" />
    </header>
  );
}

/* Logo component (aynen senin kodun) */
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
          Arabam Kaç Para?
        </div>
        <div className="text-[11px] text-slate-400 truncate">
          Kurumsal teklif karşılaştırma
        </div>
      </div>
    </>
  );
}
