import { useState } from "react";
import Select from "react-select";

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
  tramer: {
    value: "",
    tutar: "",
  },
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

// Araç parçaları - yüzde bazlı koordinatlar (resmin boyutuna göre otomatik ayarlanır)
const carPartAreas = {
  OnTampon: { left: "41%", top: "6.5%", width: "18%", height: "7%" },
  MotorKaputu: { left: "41%", top: "15%", width: "18%", height: "19%" },
  Tavan: { left: "41%", top: "35.5%", width: "18%", height: "27%" },
  ArkaKaput: { left: "41%", top: "64%", width: "18%", height: "19%" },
  ArkaTampon: { left: "41%", top: "84%", width: "18%", height: "7%" },
  
  SolOnCamurluk: { left: "20%", top: "15%", width: "19.5%", height: "13%" },
  SolOnKapi: { left: "20%", top: "29%", width: "19.5%", height: "16%" },
  SagArkaKapi: { left: "20%", top: "46.5%", width: "19.5%", height: "16%" },
  SolArkaCamurluk: { left: "20%", top: "64%", width: "19.5%", height: "19%" },
  
  SagOnCamurluk: { left: "60.5%", top: "15%", width: "19.5%", height: "13%" },
  SagOnKapi: { left: "60.5%", top: "29%", width: "19.5%", height: "16%" },
  SagArkaKapi: { left: "60.5%", top: "46.5%", width: "19.5%", height: "16%" },
  SagArkaCamurluk: { left: "60.5%", top: "64%", width: "19.5%", height: "19%" },
};

const partLabels = {
  OnTampon: "Ön Tampon",
  MotorKaputu: "Motor Kaputu",
  Tavan: "Tavan",
  ArkaKaput: "Arka Kaput",
  ArkaTampon: "Arka Tampon",
  SolOnCamurluk: "Sol Ön Çamurluk",
  SolOnKapi: "Sol Ön Kapı",
  SagArkaKapi: "Sol Arka Kapı",
  SolArkaCamurluk: "Sol Arka Çamurluk",
  SagOnCamurluk: "Sağ Ön Çamurluk",
  SagOnKapi: "Sağ Ön Kapı",
  SagArkaKapi: "Sağ Arka Kapı",
  SagArkaCamurluk: "Sağ Arka Çamurluk",
};

// İnteraktif Araç Diyagramı Bileşeni
function CarDiagram({ expertizData, onPartClick, selectedPart }) {
  // Hangi parçaların boyalı/değişmiş olduğunu kontrol et
  const isPainted = (partKey) => {
    const value = expertizData[partKey];
    return value === "2" || value === "3"; // Değişmiş veya Boyalı
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative select-none">
        {/* Ana araç resmi */}
        <img 
          src="https://s0.shbdn.com/assets/images/vehicle_plan:0c6fff263000435d73ead7462c3c0baa.png" 
          alt="Araç Diyagramı"
          className="w-full h-auto block"
          draggable="false"
        />
        
        {/* Boyalı overlay resmi - sadece boyalı/değişmiş parçalar için */}
        {Object.entries(carPartAreas).map(([key, area]) => (
          isPainted(key) && (
            <div
              key={`painted-${key}`}
              className="absolute pointer-events-none"
              style={{
                left: area.left,
                top: area.top,
                width: area.width,
                height: area.height,
                backgroundImage: 'url(https://s0.shbdn.com/assets/images/vehicle_painted:4843262a3bb9d929d0036be297a77827.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.85,
              }}
            />
          )
        ))}
        
        {/* Tıklanabilir alanlar */}
        {Object.entries(carPartAreas).map(([key, area]) => (
          <div
            key={key}
            onClick={() => onPartClick(key)}
            className="absolute cursor-pointer transition-all hover:bg-blue-400 hover:bg-opacity-20"
            style={{
              left: area.left,
              top: area.top,
              width: area.width,
              height: area.height,
              border: selectedPart === key ? "3px solid #4f46e5" : "2px solid transparent",
              borderRadius: "4px",
            }}
            title={partLabels[key]}
          />
        ))}
      </div>
      
      {/* Renk Açıklamaları */}
      <div className="flex justify-center gap-4 mt-4 text-xs">
        {expertizOptions.map((opt) => (
          <div key={opt.value} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded ${opt.color}`} />
            <span className="text-slate-600">{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CarForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState(initialState);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedPart, setSelectedPart] = useState(null);

  const updateField = (name, value) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePartClick = (partKey) => {
    setSelectedPart(partKey);
  };

  const handleExpertizSelect = (value) => {
    if (selectedPart) {
      updateField(`expertiz.${selectedPart}`, value);
    }
  };

  const next = () => {
    if (steps[stepIndex].id === "contact") {
      if (!formData.adSoyad?.trim()) {
        alert("Lütfen ad soyad girin.");
        return;
      }
      if (!formData.telefon?.trim()) {
        alert("Lütfen telefon girin.");
        return;
      }
    }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const back = () => {
    setStepIndex((i) => Math.max(i - 1, 0));
    setSelectedPart(null);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  const progress = (stepIndex / (steps.length - 1)) * 100;
  const inputClass = "w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100";

  const markaOptions = Object.keys(markaModelMap).map((m) => ({ value: m, label: m }));
  const seriOptions = (formData.marka ? markaModelMap[formData.marka] : []).map((s) => ({ value: s, label: s }));

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6 border border-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">🚗 Adım Adım Araç Formu</h2>
          <p className="text-xs text-slate-500">Adım adım ilerle — her adımda bir soru.</p>
        </div>
        <div className="text-right text-xs text-slate-500">{Math.round(progress)}%</div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Step content */}
      <div className="min-h-[400px] flex flex-col justify-center space-y-4">
        {steps[stepIndex].id === "basic" && (
          <>
            <label className="text-sm text-slate-600 block">Marka</label>
            <Select
              options={markaOptions}
              value={formData.marka ? { value: formData.marka, label: formData.marka } : null}
              onChange={(option) => {
                updateField("marka", option.value);
                updateField("seri", "");
              }}
              placeholder="Marka seçin"
            />

            <label className="text-sm text-slate-600 block mt-4">Seri / Model</label>
            <Select
              options={seriOptions}
              value={formData.seri ? { value: formData.seri, label: formData.seri } : null}
              onChange={(option) => updateField("seri", option.value)}
              placeholder="Model seçin"
              isDisabled={!formData.marka}
            />

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="text-sm text-slate-600 block">Model Yılı</label>
                <input name="modelYili" value={formData.modelYili} onChange={(e) => updateField("modelYili", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="text-sm text-slate-600 block">Kilometre</label>
                <input type="number" name="km" value={formData.km} onChange={(e) => updateField("km", e.target.value)} className={inputClass} />
              </div>
            </div>
          </>
        )}

        {/* Specs */}
        {steps[stepIndex].id === "specs" && (
          <div className="space-y-4">
            <label className="text-sm text-slate-600 block">Vites</label>
            <select name="vites" value={formData.vites} onChange={(e) => updateField("vites", e.target.value)} className={inputClass}>
              <option value="">Seçin</option>
              <option>Manuel</option>
              <option>Otomatik</option>
              <option>Yarı Otomatik</option>
            </select>

            <label className="text-sm text-slate-600 block">Yakıt</label>
            <select name="yakıt" value={formData.yakıt} onChange={(e) => updateField("yakıt", e.target.value)} className={inputClass}>
              <option value="">Seçin</option>
              <option>Benzin</option>
              <option>Dizel</option>
              <option>LPG</option>
              <option>Hybrid</option>
              <option>Elektrik</option>
            </select>

            <label className="text-sm text-slate-600 block">Gövde Tipi</label>
            <select name="bodyType" value={formData.bodyType} onChange={(e) => updateField("bodyType", e.target.value)} className={inputClass}>
              <option value="">Seçin</option>
              <option>SUV</option>
              <option>Hatchback</option>
              <option>Sedan</option>
              <option>Station Wagon</option>
            </select>
          </div>
        )}

        {/* Expertiz - Interactive Car Diagram */}
        {steps[stepIndex].id === "expertiz" && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">Araç Ekspertiz Durumu</h3>
              <p className="text-xs text-slate-500">Araç üzerindeki parçalara tıklayarak durumlarını belirtin</p>
            </div>

            <CarDiagram 
              expertizData={formData.expertiz}
              onPartClick={handlePartClick}
              selectedPart={selectedPart}
            />

            {selectedPart && (
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
                <p className="text-sm font-medium text-slate-700 mb-3">
                  {partLabels[selectedPart]} - Durumu seçin:
                </p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {expertizOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => handleExpertizSelect(opt.value)}
                      className={`px-4 py-2 rounded-full border transition ${
                        formData.expertiz[selectedPart] === opt.value
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-slate-700 border-slate-200 hover:shadow-sm"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tramer */}
        {steps[stepIndex].id === "tramer" && (
          <div className="space-y-4">
            <label className="text-sm text-slate-600 block">Tramer Durumu</label>
            <div className="flex gap-2 flex-wrap">
              {tramerOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField("tramer.value", opt.value)}
                  className={`px-3 py-2 rounded-md border transition ${
                    formData.tramer.value === opt.value
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-700 border-slate-200 hover:shadow-sm"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <label className="text-sm text-slate-600 block">Tramer Tutarı (TL)</label>
            <input name="tramer.tutar" type="number" value={formData.tramer.tutar} onChange={(e) => updateField("tramer.tutar", e.target.value)} className={inputClass} />
          </div>
        )}

        {/* Contact */}
        {steps[stepIndex].id === "contact" && (
          <div className="space-y-4">
            <label className="text-sm text-slate-600 block">Ad Soyad</label>
            <input name="adSoyad" value={formData.adSoyad} onChange={(e) => updateField("adSoyad", e.target.value)} className={inputClass} />

            <label className="text-sm text-slate-600 block">Telefon</label>
            <input name="telefon" value={formData.telefon} onChange={(e) => updateField("telefon", e.target.value)} className={inputClass} />

            <label className="text-sm text-slate-600 block">E-posta (isteğe bağlı)</label>
            <input name="eposta" type="email" value={formData.eposta} onChange={(e) => updateField("eposta", e.target.value)} className={inputClass} />
          </div>
        )}

        {/* Review */}
        {steps[stepIndex].id === "review" && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">Özet</h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-md border">{formData.marka} {formData.seri}</div>
              <div className="p-3 bg-slate-50 rounded-md border">Yıl: {formData.modelYili}</div>
              <div className="p-3 bg-slate-50 rounded-md border">KM: {formData.km} km</div>
              <div className="p-3 bg-slate-50 rounded-md border">Vites: {formData.vites}</div>
              <div className="p-3 bg-slate-50 rounded-md border">Yakıt: {formData.yakıt}</div>
              <div className="p-3 bg-slate-50 rounded-md border">Gövde: {formData.bodyType}</div>
              <div className="p-3 bg-slate-50 rounded-md border">Tramer: {formData.tramer.value === "2" ? "Yok" : "Var"}</div>
              <div className="p-3 bg-slate-50 rounded-md border">İsim: {formData.adSoyad}</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button type="button" onClick={back} disabled={stepIndex === 0} className="px-4 py-2 rounded-md border text-sm bg-white hover:shadow-sm disabled:opacity-50">
          Geri
        </button>

        {steps[stepIndex].id !== "review" ? (
          <button type="button" onClick={next} className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:opacity-90">
            Sonraki
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm hover:opacity-90 disabled:opacity-60">
            {loading ? "Gönderiliyor..." : "Teklifleri Getir"}
          </button>
        )}
      </div>
    </div>
  );
}