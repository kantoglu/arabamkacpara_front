import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";

const markaModelMap = {
  AlfaRomeo: ["Giulia", "Stelvio", "Tonale"],
  Audi: ["A3", "A4", "Q5", "Q7", "A6", "Q8", "e-tron"],
  BMW: ["3 Serisi", "5 Serisi", "X3", "X5", "X1", "7 Serisi"],
  Citroen: ["C3", "C4", "C5 Aircross", "Berlingo"],
  Cupra: ["Formentor", "Born", "Ateca", "Leon"],
  Dacia: ["Sandero", "Logan", "Duster", "Jogger"],
  Fiat: ["Egea Sedan", "Egea Cross", "500", "Punto", "Doblo"],
  Ford: ["Focus", "Puma", "Kuga", "Fiesta", "Ranger"],
  Honda: ["Civic", "CR-V", "Jazz", "HR-V", "Accord"],
  Hyundai: ["i20", "i30", "Tucson", "Kona", "Santa Fe", "Elantra"],
  Kia: ["Rio", "Ceed", "Sportage", "Sorento", "Niro"],
  MercedesBenz: ["A-Serisi", "C-Serisi", "E-Serisi", "GLE", "GLC", "S-Serisi"],
  Nissan: ["Qashqai", "X-Trail", "Micra", "Juke", "Leaf"],
  Opel: ["Astra", "Corsa", "Grandland", "Mokka", "Insignia"],
  Peugeot: ["208", "3008", "5008", "308", "2008"],
  Renault: ["Clio", "Megane", "Captur", "Talisman", "Kadjar"],
  Seat: ["Leon", "Arona", "Tarraco", "Ibiza", "Ateca"],
  Skoda: ["Octavia", "Fabia", "Kodiaq", "Karoq", "Superb"],
  Tesla: ["Model 3", "Model Y", "Model X", "Model S"],
  TOGG: ["T10X", "T10F"],
  Toyota: ["Corolla", "C-HR", "RAV4", "Yaris", "Camry"],
  Volkswagen: ["Golf", "Passat", "T-Roc", "Tiguan", "Polo", "Arteon"],
  Volvo: ["XC40", "XC60", "S60", "V60", "XC90"],
};

export default function StepBasicInfo({ formData, updateField }) {
  const [markaSearch, setMarkaSearch] = useState("");
  const [markaOpen, setMarkaOpen] = useState(false);

  const filteredMarkalar = useMemo(() => {
    const all = Object.keys(markaModelMap);
    if (!markaSearch) return all;
    return all.filter((m) =>
      m.toLowerCase().includes(markaSearch.toLowerCase())
    );
  }, [markaSearch]);

  const models = formData.marka ? markaModelMap[formData.marka] || [] : [];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">Araç Bilgileri</h2>
        <p className="text-sm text-slate-400">
          Aracınızın marka, model ve yıl bilgilerini girin.
        </p>
      </div>

      {/* Marka */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Marka</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMarkaOpen(!markaOpen)}
            className="w-full bg-slate-800 text-left px-4 py-2 rounded-md border border-slate-700 flex justify-between items-center"
          >
            <span className={formData.marka ? "text-white" : "text-slate-400"}>
              {formData.marka || "Marka seçin"}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform ${
                markaOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {markaOpen && (
            <div className="absolute z-50 mt-2 w-full bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
              <div className="p-3 border-b border-slate-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Marka ara..."
                    value={markaSearch}
                    onChange={(e) => setMarkaSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-slate-800 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredMarkalar.map((marka) => (
                  <button
                    key={marka}
                    type="button"
                    onClick={() => {
                      updateField("marka", marka);
                      updateField("seri", "");
                      setMarkaOpen(false);
                      setMarkaSearch("");
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 ${
                      formData.marka === marka
                        ? "bg-slate-800 text-primary font-semibold"
                        : "text-white"
                    }`}
                  >
                    {marka}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Model */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Model / Seri</label>
        <select
          value={formData.seri}
          onChange={(e) => updateField("seri", e.target.value)}
          disabled={!formData.marka}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-md border border-slate-700"
        >
          <option value="">Model seçin</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {/* Model Yılı ve KM */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Model Yılı</label>
          <select
            value={formData.modelYili}
            onChange={(e) => updateField("modelYili", e.target.value)}
            className="w-full bg-slate-800 text-white px-4 py-2 rounded-md border border-slate-700"
          >
            <option value="">Yıl seçin</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Kilometre</label>
          <div className="relative">
            <input
              type="number"
              placeholder="örn: 45000"
              value={formData.km}
              onChange={(e) => updateField("km", e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-2 pr-12 rounded-md border border-slate-700"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              km
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
