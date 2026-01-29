export default function Header() {
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
          {/* Logo + Brand */}
          <a href="#home" className="flex items-center gap-3 min-w-0">
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
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] text-slate-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              Nasıl Çalışır
            </a>
            <a href="#offers" className="hover:text-white transition-colors">
              Teklifler
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              İletişim
            </a>
          </nav>

          {/* CTA */}
          <a
            href="#form"
            className="
              h-9 px-4 inline-flex items-center justify-center
              rounded-full text-xs font-semibold
              bg-white text-slate-900
              hover:bg-slate-100 transition-colors
              border border-white/10
            "
          >
            Hemen Teklif Al
          </a>
        </div>
      </div>

      {/* extra çizgi/glitch olmasın diye (bazen fixed+blur birleşiminde 1px beyazlık çıkıyor) */}
      <div className="h-px bg-slate-950" />
    </header>
  );
}
