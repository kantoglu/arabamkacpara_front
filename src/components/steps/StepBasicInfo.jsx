import { useState, useMemo } from "react";
import Select from "react-select";
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

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      borderColor: "#475569",
      color: "#fff",
      borderRadius: "0.75rem",
      padding: "2px 4px",
      boxShadow: "none",
      "&:hover": { borderColor: "#6366f1" },
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgb(15, 23, 42)",
      borderRadius: "0.75rem",
      border: "1px solid #334155",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "rgb(99, 102, 241)"
        : isFocused
        ? "rgba(99, 102, 241, 0.1)"
        : "transparent",
      color: isSelected ? "white" : "#e2e8f0",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94a3b8",
    }),
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Araç Bilgileri
        </h2>
        <p className="text-slate-400">Aracınızın marka, model ve yıl bilgilerini girin.</p>
      </div>

      <div className="space-y-6">
        {/* Marka */}
        <div className="space-y-3 relative z-40">
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
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 group-hover:text-slate-300 ${
                  markaOpen ? "rotate-180" : ""
                }`}
              />
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800/60 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
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
                      }}
                      className={`w-full px-5 py-3 text-left text-sm hover:bg-slate-700/60 transition-colors ${
                        formData.marka === marka
                          ? "bg-blue-600/20 text-blue-400 font-semibold"
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
        <div className="space-y-3 relative z-30">
          <label className="block text-sm font-semibold text-slate-200">Model / Seri</label>
          <Select
            value={formData.seri ? { label: formData.seri, value: formData.seri } : null}
            onChange={(selected) => updateField("seri", selected?.value || "")}
            options={models.map((m) => ({ label: m, value: m }))}
            placeholder="Model seçin"
            isDisabled={!formData.marka}
            styles={customSelectStyles}
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>

        {/* Model Yılı ve KM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Calendar className="w-4 h-4 text-blue-400" /> Model Yılı
            </label>
            <Select
              value={
                formData.modelYili
                  ? { label: formData.modelYili, value: formData.modelYili }
                  : null
              }
              onChange={(selected) => updateField("modelYili", selected?.value || "")}
              options={years.map((y) => ({ label: y, value: y }))}
              placeholder="Yıl seçin"
              styles={customSelectStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Gauge className="w-4 h-4 text-purple-400" /> Kilometre
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="örn: 45000"
                value={formData.km}
                onChange={(e) => updateField("km", e.target.value)}
                className="input pr-14"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
                km
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
