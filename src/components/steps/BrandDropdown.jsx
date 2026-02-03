import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

/* --- MARKA LISTESİ --- */
const markaListesi = [
  "Audi",
  "BMW",
  "Mercedes",
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
        className="w-full flex items-center justify-between
                   bg-slate-800 border border-slate-700
                   rounded-xl px-4 py-3 text-white"
      >
        <span>Marka seç</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl
                        bg-slate-900 border border-slate-700 shadow-xl">
          <div className="p-2 border-b border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ara..."
                className="w-full pl-9 pr-3 py-2 rounded-lg
                           bg-slate-800 text-sm text-white
                           focus:outline-none"
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filtered.map((marka) => (
              <button
                key={marka}
                type="button"
                onClick={() => {
                  onMarkaSecti(marka);
                  setOpen(false);
                  setSearch("");
                }}
                className="w-full text-left px-4 py-2 text-sm
                           hover:bg-slate-700"
              >
                {marka}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
