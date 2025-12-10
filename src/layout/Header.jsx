export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-slate-950/80 border-b border-slate-800/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
            🚗
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm leading-tight">
              Arabam Kaç Para ?
            </h1>
            <p className="text-[11px] text-slate-400 leading-none">
              En iyi araç teklifi platformu
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] text-slate-300">
          <a href="#home" className="hover:text-white transition-colors">
            Ana Sayfa
          </a>
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
          className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 text-slate-900 text-xs font-semibold shadow-md hover:brightness-110 hover:shadow-lg transition-all duration-300"
        >
          Hemen Teklif Al
        </a>
      </div>
    </header>
  );
}
