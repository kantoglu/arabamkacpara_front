import axios from "axios";

const ENV_BASE = import.meta.env.VITE_API_BASE_URL?.trim();

// Local: http://localhost:5005/api/v1
// Cloudflare Pages: /api/v1
const BASE_URL = ENV_BASE && ENV_BASE.length > 0 ? ENV_BASE : "/api/v1";

export const createCarRequest = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/carRequest/create`,
    formData
  );

  // Express ve Cloudflare aynı yapıyı dönecek
  return response.data?.data?.offers || [];
};
