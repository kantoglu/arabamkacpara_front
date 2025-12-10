import { useState, useMemo } from "react";
import { Search, ChevronDown, Calendar, Gauge } from "lucide-react";

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

export default function StepBasicInfo() {
  const [formData, setFormData] = useState({
    marka: "",
    seri: "",
    modelYili: "",
    km: ""
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
    <><div className="max-w-4xl mx-auto space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Araç Bilgileri
        </h2>
        <p className="text-slate-400">
          Aracınızın marka, model ve yıl bilgilerini girin.
        </p>
      </div>

      <div className="space-y-6">
        {/* Marka */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-200">Marka</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMarkaOpen(!markaOpen)}
              className="w-full bg-slate-800/40 backdrop-blur-sm text-left px-5 py-3.5 rounded-xl border border-slate-700/50 flex justify-between items-center hover:bg-slate-700/60 hover:border-slate-600 transition-all duration-200 group"
            >
              <span className={formData.marka ? "text-white font-medium" : "text-slate-400"}>
                {formData.marka || "Marka seçin"}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 group-hover:text-slate-300 ${markaOpen ? "rotate-180" : ""}`} />
            </button>

            {markaOpen && (
              <div className="absolute z-50 mt-2 w-full bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl shadow-black/50">
                <div className="p-4 border-b border-slate-700/50">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Marka ara..."
                      value={markaSearch}
                      onChange={(e) => setMarkaSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800/60 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {filteredMarkalar.map((marka) => (
                    <button
                      key={marka}
                      type="button"
                      onClick={() => {
                        updateField("marka", marka);
                        updateField("seri", "");
                        setMarkaOpen(false);
                        setMarkaSearch("");
                      } }
                      className={`w-full px-5 py-3 text-left text-sm hover:bg-slate-700/60 transition-colors ${formData.marka === marka
                          ? "bg-blue-600/20 text-blue-400 font-semibold"
                          : "text-white"}`}
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
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-200">Model / Seri</label>
          <select
            value={formData.seri}
            onChange={(e) => updateField("seri", e.target.value)}
            disabled={!formData.marka}
            className="w-full bg-slate-800/40 backdrop-blur-sm text-white px-5 py-3.5 rounded-xl border border-slate-700/50 hover:bg-slate-700/60 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" className="bg-slate-800">Model seçin</option>
            {models.map((model) => (
              <option key={model} value={model} className="bg-slate-800">
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Model Yılı ve KM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Calendar className="w-4 h-4 text-blue-400" />
              Model Yılı
            </label>
            <select
              value={formData.modelYili}
              onChange={(e) => updateField("modelYili", e.target.value)}
              className="w-full bg-slate-800/40 backdrop-blur-sm text-white px-5 py-3.5 rounded-xl border border-slate-700/50 hover:bg-slate-700/60 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              <option value="" className="bg-slate-800">Yıl seçin</option>
              {years.map((year) => (
                <option key={year} value={year} className="bg-slate-800">
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Gauge className="w-4 h-4 text-purple-400" />
              Kilometre
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="örn: 45000"
                value={formData.km}
                onChange={(e) => updateField("km", e.target.value)}
                className="w-full bg-slate-800/40 backdrop-blur-sm text-white px-5 py-3.5 pr-14 rounded-xl border border-slate-700/50 hover:bg-slate-700/60 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 placeholder:text-slate-500" />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
                km
              </span>
            </div>
          </div>
        </div>
      </div>
    </div><style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style></>
  );
}