import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

/* --- MARKA LISTESİ --- */
const markaListesi = [
  "Audi",
  "BMW",
  "MercedesBenz",
  "Volkswagen",
  "Toyota",
  "Renault",
  "Fiat",
  "Hyundai",
  "Honda",
  "Ford",
  "Opel",
  "Peugeot",
  "Skoda",
  "Volvo",
  "Tesla",
  "TOGG",
];

export default function MarkaDropdown({ onMarkaSecti }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = markaListesi.filter((m) =>
    m.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full sm:max-w-sm mx-auto">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          w-full
          input
          flex items-center justify-between
          h-12
          px-4
          rounded-2xl
          /* Light mode: Belirgin gri border ve beyaz arka plan | Dark mode: Şeffaf beyaz */
          border border-slate-200 dark:border-white/10
          bg-white dark:bg-white/5
          shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
          hover:bg-slate-50 dark:hover:bg-white/7
          transition
          /* Yazı renkleri adaptif hale getirildi */
          text-slate-900 dark:text-white
        "
      >
        <span className="font-semibold truncate">Marka seç</span>

        <ChevronDown
          className={`w-4 h-4 text-slate-500 dark:text-slate-300 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full rounded-2xl
            /* Light mode: Saf beyaz | Dark mode: Koyu lacivert/siyah */
            bg-white dark:bg-slate-900/95 backdrop-blur-md
            border border-slate-200 dark:border-slate-700/80
            shadow-xl dark:shadow-2xl overflow-hidden
          "
        >
          <div className="p-2 border-b border-slate-100 dark:border-slate-700/80">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ara..."
                className="
                  w-full pl-9 pr-3 py-2.5 rounded-xl text-sm
                  /* Input arka planı light modda daha hafif gri */
                  bg-slate-50 dark:bg-slate-800/70
                  text-slate-900 dark:text-white
                  placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/70
                  border border-transparent focus:border-indigo-500/20
                "
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-300">
                Sonuç bulunamadı
              </div>
            ) : (
              filtered.map((marka) => (
                <button
                  key={marka}
                  type="button"
                  onClick={() => {
                    onMarkaSecti(marka);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="
                    w-full text-left px-4 py-3 text-sm
                    /* Light modda yazı rengi koyulaştırıldı, hover efekti eklendi */
                    text-slate-700 dark:text-white
                    hover:bg-indigo-50 dark:hover:bg-indigo-500/20
                    hover:text-indigo-600 dark:hover:text-white
                    transition
                  "
                >
                  {marka}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}