import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createCarRequest = async (formData) => {
  const response = await axios.post(`${BASE_URL}/carRequest/create`, formData);

  // 👇 Burada doğru parse işlemi yapılmalı
  return response.data?.data?.offers || [];
};
