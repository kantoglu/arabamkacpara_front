export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-slate-300 font-medium">
            © {new Date().getFullYear()} Arabam Kaç Para
          </p>
          <p className="text-xs text-slate-500">
            Tüm hakları saklıdır • Güvenilir platformlardan alınan fiyat verileri
          </p>
        </div>

        <div className="flex gap-4 text-xs">
          <span>yyz.com</span>
          <span>xxx.com</span>
          <span>xzc.net</span>
          <span>+ daha fazlası</span>
        </div>
      </div>
    </footer>
  );
}
