export async function onRequestPost(context) {
  let body = {};
  try {
    body = await context.request.json();
  } catch {
    return Response.json(
      {
        success: false,
        error: true,
        message: "Geçersiz JSON body",
        code: 400,
      },
      { status: 400 }
    );
  }

  const {
    modelYili,
    marka,
    seri,
    vites,
    yakit,
    donanim,
    versiyon,
    bodyType,
    km,
    renk,
    expertiz,
    tramer,
    adSoyad,
    telefon,
    eposta,
    sehir,
    il,
    ilce,
    plaka,
  } = body || {};

  if (!marka || !seri || !modelYili) {
    return Response.json(
      {
        success: false,
        error: true,
        message: "Marka, seri ve model yılı zorunludur.",
        code: 400,
      },
      { status: 400 }
    );
  }

  if (!adSoyad || !telefon) {
    return Response.json(
      {
        success: false,
        error: true,
        message: "Ad soyad ve telefon zorunludur.",
        code: 400,
      },
      { status: 400 }
    );
  }

  // --- RANDOM FİYAT OLUŞTURMA ---
  function getRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomDays(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const siteNames = [
    "HızlıOtoTeklif",
    "AnındaSat.com",
    "OtoExpres",
    "ArabaDeğerleme.net",
    "SatışGarantili"
  ];

  // Base fiyat (örnek: 800k ile 900k arası)
  const basePrice = 850000;
  
  const offers = siteNames.map(siteName => {
    // Her site için ±%10 farkla random fiyat
    const variance = basePrice * 0.10; // %10
    const price = getRandomPrice(
      basePrice - variance,
      basePrice + variance
    );
    
    const daysValid = getRandomDays(2, 5);
    
    return {
      siteName,
      price,
      validUntil: new Date(Date.now() + daysValid * 86400000).toISOString(),
      message: `${siteName} olarak yaklaşık ${price.toLocaleString('tr-TR')} TL teklif verebiliyoruz.`
    };
  });

  // EN YÜKSEK FİYATI BUL VE İŞARETLE
  const maxPrice = Math.max(...offers.map(o => o.price));
  offers.forEach(offer => {
    offer.isBestOffer = offer.price === maxPrice;
  });

  const carRequest = {
    _id: crypto.randomUUID(),
    modelYili,
    marka,
    seri,
    vites,
    yakit,
    donanim,
    versiyon,
    bodyType,
    km: km ? String(km) : undefined,
    renk,
    expertiz,
    tramer,
    adSoyad,
    telefon,
    eposta,
    sehir,
    il,
    ilce,
    plaka,
    offers,
    createdAt: new Date().toISOString(),
  };

  return Response.json(
    {
      success: true,
      error: false,
      data: carRequest,
      message: "Araç talebi başarıyla oluşturuldu ve 5 demo teklif üretildi",
      code: 201,
    },
    { status: 201 }
  );
}