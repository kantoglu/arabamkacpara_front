export const createCarRequest = async (formData) => {
  const response = await fetch("/api/car-request/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Sunucu hatası");
  }

  const json = await response.json();
  return json.offers || [];
};
