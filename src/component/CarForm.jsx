import { useState } from "react";
import Select from "react-select";

/* --- MARKA / MODEL VERİLERİ --- */
const markaModelMap = {
  AlfaRomeo: ["Giulia", "Stelvio", "Tonale"],
  Audi: ["A3", "A4", "Q5", "Q7"],
  BMW: ["3 Serisi", "5 Serisi", "X3", "X5"],
  Chery: ["Tiggo 4", "Tiggo 5", "Arizo 6"],
  Chevrolet: ["Cruze", "Aveo", "Trailblazer"],
  Citroen: ["C3", "C4", "C5 Aircross"],
  Cupra: ["Formentor", "Born", "Ateca"],
  Dacia: ["Sandero", "Logan", "Duster"],
  Daihatsu: ["Move", "Rocky"],
  Dodge: ["Charger", "Durango"],
  DS: ["DS 3", "DS 7"],
  Fiat: ["Egea Sedan", "Egea Cross", "500", "Punto"],
  Ford: ["Focus", "Puma", "Kuga"],
  Honda: ["Civic", "CR-V", "Jazz"],
  Hyundai: ["i20", "i30", "Tucson", "Kona"],
  Jaguar: ["XE", "XF", "F-PACE"],
  Jeep: ["Renegade", "Compass", "Wrangler"],
  Kia: ["Rio", "Ceed", "Sportage"],
  Lancia: ["Ypsilon"],
  LandRover: ["Range Rover Evoque", "Defender"],
  Mazda: ["3", "CX-5", "MX-30"],
  MercedesBenz: ["A-Serisi", "C-Serisi", "E-Serisi", "GLE"],
  MG: ["ZS", "HS", "EHS"],
  MINI: ["Cooper", "Countryman"],
  Mitsubishi: ["Outlander", "ASX"],
  Nissan: ["Qashqai", "X-Trail", "Micra"],
  Opel: ["Astra", "Corsa", "Grandland"],
  Peugeot: ["208", "3008", "5008"],
  Renault: ["Clio", "Megane", "Captur", "Talisman"],
  Seat: ["Leon", "Arona", "Tarraco"],
  Skoda: ["Octavia", "Fabia", "Kodiaq"],
  Ssangyong: ["Tivoli", "Korando"],
  Subaru: ["Forester", "Impreza"],
  Suzuki: ["Swift", "Vitara", "S-Cross"],
  Tesla: ["Model 3", "Model Y", "Model X"],
  TOGG: ["T10X", "T10F"],
  Toyota: ["Corolla", "C-HR", "RAV4"],
  Volkswagen: ["Golf", "Passat", "T-Roc", "Tiguan"],
  Volvo: ["XC40", "XC60", "S60"],
};

/* --- BAŞLANGIÇ FORM VERİLERİ --- */
const initialState = {
  modelYili: "",
  marka: "",
  seri: "",
  vites: "",
  yakıt: "",
  donanım: "",
  versiyon: "",
  bodyType: "",
  km: "",
  renk: "",
  expertiz: {
    SagArkaCamurluk: "1",
    ArkaKaput: "1",
    SolArkaCamurluk: "1",
    SagArkaKapi: "1",
    SagOnCamurluk: "1",
    SagOnKapi: "1",
    SolOnCamurluk: "1",
    SolOnKapi: "1",
    Tavan: "1",
    MotorKaputu: "1",
    OnTampon: "1",
    ArkaTampon: "1",
  },
  tramer: { value: "", tutar: "" },
  adSoyad: "",
  telefon: "",
  eposta: "",
  sehir: "",
  il: "",
  ilce: "",
  plaka: "",
};

const expertizOptions = [
  { value: "1", label: "Orijinal", color: "bg-green-500" },
  { value: "2", label: "Değişmiş", color: "bg-yellow-500" },
  { value: "3", label: "Boyalı", color: "bg-red-500" },
];

const tramerOptions = [
  { value: "1", label: "Var" },
  { value: "2", label: "Yok" },
  { value: "3", label: "Bilmiyorum" },
  { value: "4", label: "Ağır hasar" },
];

const steps = [
  { id: "basic", label: "Araç Bilgisi" },
  { id: "specs", label: "Teknik Bilgiler" },
  { id: "expertiz", label: "Ekspertiz" },
  { id: "tramer", label: "Tramer" },
  { id: "contact", label: "İletişim" },
  { id: "review", label: "Özet & Gönder" },
];

/* --- ARAÇ DİYAGRAMI --- */
function CarDiagram({ expertizData, onPartClick, selectedPart }) {
  const carPartAreas = {
    OnTampon: { left: "41%", top: "6.5%", width: "18%", height: "7%" },
    MotorKaputu: { left: "41%", top: "15%", width: "18%", height: "19%" },
    Tavan: { left: "41%", top: "35.5%", width: "18%", height: "27%" },
    ArkaKaput: { left: "41%", top: "64%", width: "18%", height: "19%" },
    ArkaTampon: { left: "41%", top: "84%", width: "18%", height: "7%" },
    SolOnCamurluk: { left: "20%", top: "15%", width: "19.5%", height: "13%" },
    SolOnKapi: { left: "20%", top: "29%", width: "19.5%", height: "16%" },
    SagOnCamurluk: { left: "60.5%", top: "15%", width: "19.5%", height: "13%" },
    SagOnKapi: { left: "60.5%", top: "29%", width: "19.5%", height: "16%" },
  };
  const partLabels = {
    OnTampon: "Ön Tampon",
    MotorKaputu: "Motor Kaputu",
    Tavan: "Tavan",
    ArkaKaput: "Arka Kaput",
    ArkaTampon: "Arka Tampon",
    SolOnCamurluk: "Sol Ön Çamurluk",
    SolOnKapi: "Sol Ön Kapı",
    SagOnCamurluk: "Sağ Ön Çamurluk",
    SagOnKapi: "Sağ Ön Kapı",
  };
  const isPainted = (key) => expertizData[key] === "2" || expertizData[key] === "3";

  return (
    <div className="relative w-full max-w-md mx-auto">
      <img
        src="https://s0.shbdn.com/assets/images/vehicle_plan:0c6fff263000435d73ead7462c3c0baa.png"
        alt="Araç Diyagramı"
        className="w-full h-auto block"
        draggable="false"
      />
      {Object.entries(carPartAreas).map(([key, area]) => (
        <div
          key={key}
          onClick={() => onPartClick(key)}
          className={`absolute cursor-pointer transition-all ${
            selectedPart === key
              ? "border-2 border-indigo-500 bg-indigo-500/10"
              : "border border-transparent hover:bg-indigo-400/10"
          }`}
          style={area}
          title={partLabels[key]}
        />
      ))}
      <div className="flex justify-center gap-4 mt-4 text-xs">
        {expertizOptions.map((opt) => (
          <div key={opt.value} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded ${opt.color}`} />
            <span className="text-slate-600 dark:text-slate-300">{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- ANA FORM --- */
export default function CarForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState(initialState);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedPart, setSelectedPart] = useState(null);

  const updateField = (name, value) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const progress = (stepIndex / (steps.length - 1)) * 100;
  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const markaOptions = Object.keys(markaModelMap).map((m) => ({ value: m, label: m }));
  const seriOptions =
    formData.marka ? markaModelMap[formData.marka].map((s) => ({ value: s, label: s })) : [];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto card p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-gray-100">
            🚗 Adım Adım Araç Formu
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Adım adım ilerle — her adımda bir soru.
          </p>
        </div>
        <div className="text-xs text-slate-500">{Math.round(progress)}%</div>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 bg-gradient-to-r from-indigo-500 to-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 1️⃣ Basic */}
      {steps[stepIndex].id === "basic" && (
        <>
          <label className="text-sm text-slate-600 dark:text-slate-400 block">Marka</label>
          <Select
            options={markaOptions}
            value={formData.marka ? { value: formData.marka, label: formData.marka } : null}
            onChange={(option) => {
              updateField("marka", option.value);
              updateField("seri", "");
            }}
            placeholder="Marka seçin"
            className="text-black dark:text-white"
          />

          <label className="text-sm text-slate-600 dark:text-slate-400 block mt-4">Seri / Model</label>
          <Select
            options={seriOptions}
            value={formData.seri ? { value: formData.seri, label: formData.seri } : null}
            onChange={(option) => updateField("seri", option.value)}
            placeholder="Model seçin"
            isDisabled={!formData.marka}
            className="text-black dark:text-white"
          />

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400 block">Model Yılı</label>
              <input
                name="modelYili"
                value={formData.modelYili}
                onChange={(e) => updateField("modelYili", e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400 block">Kilometre</label>
              <input
                type="number"
                name="km"
                value={formData.km}
                onChange={(e) => updateField("km", e.target.value)}
                className="input"
              />
            </div>
          </div>
        </>
      )}

      {/* 2️⃣ Specs */}
      {steps[stepIndex].id === "specs" && (
        <div className="space-y-4">
          <label className="text-sm text-slate-600 dark:text-slate-400 block">Vites</label>
          <select
            name="vites"
            value={formData.vites}
            onChange={(e) => updateField("vites", e.target.value)}
            className="input"
          >
            <option value="">Seçin</option>
            <option>Manuel</option>
            <option>Otomatik</option>
            <option>Yarı Otomatik</option>
          </select>

          <label className="text-sm text-slate-600 dark:text-slate-400 block">Yakıt</label>
          <select
            name="yakıt"
            value={formData.yakıt}
            onChange={(e) => updateField("yakıt", e.target.value)}
            className="input"
          >
            <option value="">Seçin</option>
            <option>Benzin</option>
            <option>Dizel</option>
            <option>LPG</option>
            <option>Hybrid</option>
            <option>Elektrik</option>
          </select>
        </div>
      )}

      {/* 3️⃣ Expertiz */}
      {steps[stepIndex].id === "expertiz" && (
        <div className="space-y-4">
          <CarDiagram
            expertizData={formData.expertiz}
            onPartClick={setSelectedPart}
            selectedPart={selectedPart}
          />
        </div>
      )}

      {/* 4️⃣ Tramer */}
      {steps[stepIndex].id === "tramer" && (
        <div className="space-y-4">
          <label className="text-sm text-slate-600 dark:text-slate-400 block">Tramer Durumu</label>
          <div className="flex gap-2 flex-wrap">
            {tramerOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateField("tramer.value", opt.value)}
                className={`choice-btn ${
                  formData.tramer.value === opt.value
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : ""
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <label className="text-sm text-slate-600 dark:text-slate-400 block">
            Tramer Tutarı (TL)
          </label>
          <input
            name="tramer.tutar"
            type="number"
            value={formData.tramer.tutar}
            onChange={(e) => updateField("tramer.tutar", e.target.value)}
            className="input"
          />
        </div>
      )}

      {/* 5️⃣ Contact */}
      {steps[stepIndex].id === "contact" && (
        <div className="space-y-4">
          <input
            placeholder="Ad Soyad"
            name="adSoyad"
            value={formData.adSoyad}
            onChange={(e) => updateField("adSoyad", e.target.value)}
            className="input"
          />
          <input
            placeholder="Telefon"
            name="telefon"
            value={formData.telefon}
            onChange={(e) => updateField("telefon", e.target.value)}
            className="input"
          />
          <input
            placeholder="E-posta (isteğe bağlı)"
            name="eposta"
            type="email"
            value={formData.eposta}
            onChange={(e) => updateField("eposta", e.target.value)}
            className="input"
          />
        </div>
      )}

      {/* 6️⃣ Review */}
      {steps[stepIndex].id === "review" && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Özet</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border dark:border-slate-700">
              {formData.marka} {formData.seri}
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border dark:border-slate-700">
              Yıl: {formData.modelYili}
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border dark:border-slate-700">
              KM: {formData.km} km
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border dark:border-slate-700">
              Vites: {formData.vites}
           </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border dark:border-slate-700">
              Yakıt: {formData.yakıt}
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border dark:border-slate-700">
              Gövde: {formData.bodyType}
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border dark:border-slate-700">
              Tramer: {formData.tramer.value === "2" ? "Yok" : "Var"}
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border dark:border-slate-700">
              İsim: {formData.adSoyad}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={back}
          disabled={stepIndex === 0}
          className="btn-outline"
        >
          Geri
        </button>

        {steps[stepIndex].id !== "review" ? (
          <button type="button" onClick={next} className="btn">
            Sonraki
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn disabled:opacity-60"
          >
            {loading ? "Gönderiliyor..." : "Teklifleri Getir"}
          </button>
        )}
      </div>
    </form>
  );
}
