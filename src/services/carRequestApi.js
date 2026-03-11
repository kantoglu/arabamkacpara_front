import axios from "axios";

const ENV_BASE = import.meta.env.VITE_API_BASE_URL?.trim();
const BASE_URL = ENV_BASE && ENV_BASE.length > 0 ? ENV_BASE : "/api/v1";

/**
 * Backend ile uyumlu payload oluşturur ve POST eder
 */
export const createCarRequest = async (form) => {
  // Backend DTO ile birebir eşleşen payload
  const payload = {
  modelYili: String(form.modelYili),     // ✅ "2025"
  marka: form.marka?.trim() || "",
  seri: form.seri?.trim() || "",
  vites: form.vites || "",
  yakit: form.yakit || "",
  donanim: form.donanim || "",
  versiyon: form.versiyon || "",
  bodyType: form.bodyType || "",
  km: form.km ? String(form.km) : "",
  renk: form.renk || "",
  expertiz: form.expertiz || {},
  tramer: {
  value: form.tramer?.value ? String(form.tramer.value) : "2",  // ✅ fallback "2" = Yok
  tutar: form.tramer?.tutar ? String(form.tramer.tutar) : "",
},
  adSoyad: form.adSoyad || "",
  telefon: form.telefon || "",
  eposta: form.eposta || "",
  sehir: form.sehir || "",
  il: form.il || "",
  ilce: form.ilce || "",
  plaka: form.plaka || "",
};

  try {
    const response = await axios.post(
      `${BASE_URL}/carRequest/create`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data?.data?.offers || [];
  } catch (err) {
    console.error("Car request error:", err.response?.data || err.message);
    throw err;
  }
};