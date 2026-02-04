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
    <div className="relative w-full max-w-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          input flex items-center justify-between
          text-slate-900 dark:text-white
        "
      >
        <span className="font-medium">Marka seç</span>
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
            bg-white/90 dark:bg-slate-900/80 backdrop-blur-md
            border border-slate-200 dark:border-slate-700
            shadow-xl overflow-hidden
          "
        >
          <div className="p-2 border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ara..."
                className="
                  w-full pl-9 pr-3 py-2 rounded-lg text-sm
                  bg-white/80 dark:bg-slate-800/70
                  text-slate-900 dark:text-white
                  placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
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
                    w-full text-left px-4 py-2.5 text-sm
                    text-slate-900 dark:text-white
                    hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20
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
