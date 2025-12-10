export default function Footer() {
  return (
    <footer
      id="contact"
      className="mt-20 bg-slate-950 border-t border-slate-800 text-slate-400 text-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <p className="text-slate-300 font-medium">© {new Date().getFullYear()} Arabam Kaç Para </p>
          <p className="text-[12px] text-slate-500">
            Tüm hakları saklıdır • Fiyat verileri güvenilir alım platformlarından alınır.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>yyz.com</span>
          <span>xxx.com</span>
          <span>xzc.net</span>
          <span>+ daha fazlası</span>
        </div>
      </div>
    </footer>
  );
}
