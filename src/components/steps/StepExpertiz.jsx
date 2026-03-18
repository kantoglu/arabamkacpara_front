import { useState } from "react";
import { Info, Check } from "lucide-react";

export default function StepExpertiz({ formData, updateField }) {
  const [hoveredPart, setHoveredPart] = useState(null);

  // ✅ Sabit kutu için: en son hoverlanan parça
  const [activePart, setActivePart] = useState(null);

  const expertizOptions = [
    { value: "1", label: "Orijinal", color: "#10b981" },
    { value: "2", label: "Boyalı", color: "#f59e0b" },
    { value: "3", label: "Değişmiş", color: "#ef4444" },
  ];

  const carParts = [
    { key: "OnTampon", label: "Ön tampon", svgId: "path-item12" },
    { key: "MotorKaputu", label: "Motor kaputu", svgId: "path-item10" },
    { key: "Tavan", label: "Tavan", svgId: "path-item6" },
    { key: "ArkaKaput", label: "Arka kaput", svgId: "path-item2" },
    { key: "ArkaTampon", label: "Arka tampon", svgId: "path-item13" },
    { key: "SolOnCamurluk", label: "Sol ön çamurluk", svgId: "path-item11" },
    { key: "SolOnKapi", label: "Sol ön kapı", svgId: "path-item8" },
    { key: "SolArkaKapi", label: "Sol arka kapı", svgId: "path-item7" },
    { key: "SolArkaCamurluk", label: "Sol arka çamurluk", svgId: "path-item3" },
    { key: "SagOnCamurluk", label: "Sağ ön çamurluk", svgId: "path-item9" },
    { key: "SagOnKapi", label: "Sağ ön kapı", svgId: "path-item5" },
    { key: "SagArkaKapi", label: "Sağ arka kapı", svgId: "path-item4" },
    { key: "SagArkaCamurluk", label: "Sağ arka çamurluk", svgId: "path-item1" },
  ];

  const getPartValue = (key) => formData.expertiz?.[key] || "1";

  const getPartStatus = (key) => {
    const value = getPartValue(key);
    return expertizOptions.find((o) => o.value === value) || expertizOptions[0];
  };

  const updateExpertiz = (key, value) => {
    updateField("expertiz", { ...(formData.expertiz || {}), [key]: value });
  };

  const getPartFill = (key) => {
    const status = getPartStatus(key);
    if (status.value === "1") return "#FFFFFF";
    if (status.value === "2") return "#FDE68A";
    if (status.value === "3") return "#FCA5A5";
    return "#FFFFFF";
  };

  const getPartStroke = (key) => {
    const status = getPartStatus(key);
    if (status.value === "1") return "#D3D2D2";
    if (status.value === "2") return "#F59E0B";
    if (status.value === "3") return "#EF4444";
    return "#D3D2D2";
  };

  const cycleValue = (current) => (current === "1" ? "2" : current === "2" ? "3" : "1");

  // ✅ hover helper (kutu sabit kalsın diye activePart'ı da set ediyoruz)
  const onHoverPart = (key) => {
    setHoveredPart(key);
    setActivePart(key);
  };

  const SelectCell = ({ partKey, value }) => {
    const active = getPartValue(partKey) === value;
    const opt = expertizOptions.find((o) => o.value === value);
    return (
      <button
        type="button"
        onClick={() => updateExpertiz(partKey, value)}
        className="
  w-8 aspect-square rounded-md border
  inline-flex items-center justify-center
  transition-all
  active:scale-[0.98]
"
        style={{
          borderColor: active ? opt.color : "#334155",
          backgroundColor: active ? `${opt.color}22` : "transparent",
        }}
        aria-label={`${partKey}-${value}`}
      >
        {active ? <Check size={14} style={{ color: opt.color }} /> : null}
      </button>
    );
  };

  // ✅ Sabit kutu içeriği: hover varsa hover, yoksa "Bir parça seçin"
  const displayKey = hoveredPart || null;
  const displayLabel = displayKey ? carParts.find((p) => p.key === displayKey)?.label : null;
  const displayStatus = displayKey ? getPartStatus(displayKey) : null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Ekspertiz Durumu</h2>
        <p className="text-sm text-slate-400">Krokiden veya listeden parça durumlarını belirleyin</p>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-900 border border-slate-700">
        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-300">
          Krokide parçaya tıklayın (Orijinal → Boyalı → Değişmiş). Sağdaki tablodan da seçebilirsiniz.
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 py-2 bg-slate-800 rounded-lg">
        {expertizOptions.map((option) => (
          <div key={option.value} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: option.color }} />
            <span className="text-xs font-medium text-slate-300">{option.label}</span>
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="grid lg:grid-cols-2 gap-4 items-stretch">
        {/* Left: Kroki (AYNEN) */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <h3 className="text-sm font-semibold text-white mb-3">Araç Krokisi</h3>

         <div className="relative">
  {/* ✅ SVG için alanı baştan ayır: layout shift olmasın */}
  <div className="w-full max-w-[520px] mx-auto h-[380px] md:h-[420px] flex items-center justify-center">
    <svg
      viewBox="0 0 227 303"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-1002.000000, -232.000000)">
                  <g transform="translate(1003.000000, 233.000000)">
                    {/* Base car body */}
                    <path
                      d="M94.6557611,63.8442042 C92.939813,65.0732963 91.7141357,66.9764066 91.5098562,69.1967019 L91.0195853,74.5491997 C90.7744499,77.3245689 92.8581012,79.7431049 95.7180147,79.9809937 C98.5779282,80.2188824 101.070139,78.1968277 101.315274,75.4214586 L102.05068,67.3332398 C105.482577,68.6416281 109.118752,69.3156463 112.83664,69.3156463 L127.340487,69.3156463 C130.322968,69.3156463 132.815179,67.0160547 132.978602,64.1217411 C133.632297,50.6017284 134,36.4869936 134,21.8171851 C134,21.6982407 134,21.6189444 134,21.5 C134,6.71124703 133.632297,-7.52243211 132.978602,-21.1217411 C132.856035,-24.0160547 130.363824,-26.3156463 127.340487,-26.3156463 L112.877496,-26.3156463 C109.159608,-26.3156463 105.523432,-25.6416281 102.091536,-24.3332398 L101.35613,-32.4214586 C101.110994,-35.1968277 98.5779282,-37.2188824 95.7588706,-36.9809937 C92.8989571,-36.7431049 90.8153058,-34.2849207 91.0604412,-31.5491997 L91.5507121,-26.1967019 C91.7549917,-23.9764066 92.939813,-22.0732963 94.696617,-20.8442042 L94.696617,63.8442042 L94.6557611,63.8442042 Z"
                      stroke="#D3D2D2"
                      fill="#F0F0F0"
                      transform="translate(112.500000, 21.500000) rotate(-90.000000) translate(-112.500000, -21.500000)"
                    />

                    {/* Ön Tampon */}
                    <path
                      d="M98,60.0833333 C101.017241,61.3211806 104.195402,62 107.454023,62 L120.166667,62 C122.781609,62 124.954023,59.8038194 125.074713,57.0086806 C125.637931,43.9913194 126,30.4149306 126,16.3194444 C126,16.2395833 126,16.1197917 126,16 C126,1.78472222 125.678161,-11.9114583 125.074713,-25.0086806 C124.954023,-27.8038194 122.781609,-30 120.166667,-30 L107.454023,-30 C104.195402,-30 101.017241,-29.3611111 98,-28.0833333 L98,60.0833333 Z"
                      fill={getPartFill("OnTampon")}
                      stroke={getPartStroke("OnTampon")}
                      strokeWidth="2"
                      fillRule="nonzero"
                      transform="translate(112.000000, 16.000000) rotate(-90.000000) translate(-112.000000, -16.000000)"
                      className="cursor-pointer transition-all hover:opacity-80"
                      onClick={() => updateExpertiz("OnTampon", cycleValue(getPartValue("OnTampon")))}
                      onMouseEnter={() => onHoverPart("OnTampon")}
                      onMouseLeave={() => setHoveredPart(null)}
                    />

                    {/* Motor Kaputu */}
                    <path
                      d="M83,55 C83,55 94.8944481,86.4 83,122 L125.907825,122 C125.907825,122 142.312584,115.72 140.915585,88.88 C139.518586,62.04 125.907825,55 125.907825,55 L83,55 Z"
                      stroke={getPartStroke("MotorKaputu")}
                      strokeWidth="2"
                      fill={getPartFill("MotorKaputu")}
                      fillRule="nonzero"
                      transform="translate(112.000000, 88.500000) rotate(-90.000000) translate(-112.000000, -88.500000)"
                      className="cursor-pointer transition-all hover:opacity-80"
                      onClick={() => updateExpertiz("MotorKaputu", cycleValue(getPartValue("MotorKaputu")))}
                      onMouseEnter={() => onHoverPart("MotorKaputu")}
                      onMouseLeave={() => setHoveredPart(null)}
                    />

                    {/* Tavan */}
                    <path
                      d="M87.1085905,151 C87.1085905,151 78.5117927,172.53629 86.188933,200 L136.890047,200 C136.890047,200 143.887441,175.104839 136.890047,151 L87.1085905,151 Z"
                      stroke={getPartStroke("Tavan")}
                      strokeWidth="2"
                      fill={getPartFill("Tavan")}
                      fillRule="nonzero"
                      transform="translate(111.500000, 175.500000) rotate(-90.000000) translate(-111.500000, -175.500000)"
                      className="cursor-pointer transition-all hover:opacity-80"
                      onClick={() => updateExpertiz("Tavan", cycleValue(getPartValue("Tavan")))}
                      onMouseEnter={() => onHoverPart("Tavan")}
                      onMouseLeave={() => setHoveredPart(null)}
                    />

                    {/* Arka Kaput */}
                    <path
                      d="M126,205.023942 L106.684058,205.023942 C106.684058,205.023942 98,204.012393 98,215.139427 C98,226.26646 98,266.161932 98,266.161932 C98,266.161932 99.3797101,273 104.857971,273 C110.336232,273 126,273 126,273 C126,273 119.101449,243.665094 126,205.023942 Z"
                      stroke={getPartStroke("ArkaKaput")}
                      strokeWidth="2"
                      fill={getPartFill("ArkaKaput")}
                      fillRule="nonzero"
                      transform="translate(112.000000, 239.000000) rotate(-90.000000) translate(-112.000000, -239.000000)"
                      className="cursor-pointer transition-all hover:opacity-80"
                      onClick={() => updateExpertiz("ArkaKaput", cycleValue(getPartValue("ArkaKaput")))}
                      onMouseEnter={() => onHoverPart("ArkaKaput")}
                      onMouseLeave={() => setHoveredPart(null)}
                    />

                    {/* Arka Tampon */}
                    <path
                      d="M126,241.916667 C122.982759,240.678819 119.804598,240 116.545977,240 L103.833333,240 C101.218391,240 99.045977,242.196181 98.9252874,244.991319 C98.362069,258.008681 98,271.585069 98,285.680556 C98,285.760417 98,285.880208 98,286 C98,300.215278 98.3218391,313.911458 98.9252874,327.008681 C99.045977,329.803819 101.218391,332 103.833333,332 L116.545977,332 C119.804598,332 122.982759,331.361111 126,330.083333 L126,241.916667 Z"
                      fill={getPartFill("ArkaTampon")}
                      stroke={getPartStroke("ArkaTampon")}
                      strokeWidth="2"
                      fillRule="nonzero"
                      transform="translate(112.000000, 286.000000) rotate(-90.000000) translate(-112.000000, -286.000000)"
                      className="cursor-pointer transition-all hover:opacity-80"
                      onClick={() => updateExpertiz("ArkaTampon", cycleValue(getPartValue("ArkaTampon")))}
                      onMouseEnter={() => onHoverPart("ArkaTampon")}
                      onMouseLeave={() => setHoveredPart(null)}
                    />

                    {/* Sağ taraf parçaları */}
                    <g transform="translate(162.000000, 52.000000)" stroke="#D3D2D2">
                      <path
                        d="M13.0500284,141.698113 L13.0875754,141.773585 C14.8898297,144.792453 17.1801946,147.471698 19.8835762,149.698113 C21.2728139,150.830189 22.4743168,152.113208 23.4505379,153.471698 C24.426759,154.792453 24.9524165,155.886792 25.515621,157.018868 C26.0037316,157.962264 26.4918421,158.981132 27.2803284,160.226415 C28.0688147,161.433962 28.9323949,162.603774 29.8710691,163.698113 C31.072572,165.09434 32.6119976,165.924528 34.0763292,165.962264 C36.0287715,166 38.732153,166 42.1489269,166 C46.5794688,166 51.0851047,165.962264 53,165.962264 L53,146.113208 C53,140.45283 52.4743425,134.792453 51.4230274,129.245283 L48.9449277,116 L38.2815894,116 C29.7208812,116 21.19772,118.113208 13.6132329,122.075472 L9.93363022,124 C8.13137587,124.943396 6.81723206,126.490566 6.14138668,128.415094 C5.87855792,129.169811 5.99119881,130 6.40421544,130.716981 L13.0500284,141.698113 Z"
                        fill={getPartFill("SagArkaKapi")}
                        stroke={getPartStroke("SagArkaKapi")}
                        strokeWidth="2"
                        fillRule="nonzero"
                        transform="translate(29.500000, 141.000000) rotate(-90.000000) translate(-29.500000, -141.000000)"
                        className="cursor-pointer transition-all hover:opacity-80"
                        onClick={() => updateExpertiz("SagArkaKapi", cycleValue(getPartValue("SagArkaKapi")))}
                        onMouseEnter={() => onHoverPart("SagArkaKapi")}
                        onMouseLeave={() => setHoveredPart(null)}
                      />
                      <path
                        d="M6.98512508,98.1209373 L6.98512508,118 L52.6260859,118 C53.3028053,118 53.9043336,117.508692 54.0171202,116.82842 L54.2426933,115.505669 C55.671323,106.435374 55.0697947,97.0249433 52.5132994,88.2191988 C51.6110069,85.1579743 49.6184444,82.5502646 46.9115669,80.8873772 C34.3170679,73.2532124 19.9555794,68.8692366 5.33092222,68.1133787 L3,68 L5.40611326,80.8495843 C6.45878781,86.5185185 6.98512508,92.3386243 6.98512508,98.1209373 Z"
                        fill={getPartFill("SagOnKapi")}
                        stroke={getPartStroke("SagOnKapi")}
                        strokeWidth="2"
                        fillRule="nonzero"
                        transform="translate(29.000000, 93.000000) rotate(-90.000000) translate(-29.000000, -93.000000)"
                        className="cursor-pointer transition-all hover:opacity-80"
                        onClick={() => updateExpertiz("SagOnKapi", cycleValue(getPartValue("SagOnKapi")))}
                        onMouseEnter={() => onHoverPart("SagOnKapi")}
                        onMouseLeave={() => setHoveredPart(null)}
                      />
                      <path
                        d="M13.9131056,168.010844 C13.9131056,168.010844 19.0519095,166.400737 26.9577617,167.205791 L31.4640974,166.964275 C31.4640974,166.964275 39.2118326,160.765362 41.5835882,161.006878 C43.9553439,161.288647 48.066387,167.970592 48.066387,167.970592 L57,184.071663 C56.8814122,183.8704 44.2320487,181.253976 38.3817181,185.238991 C33.3219727,188.700721 29.4085759,194.175086 28.7365784,199.971471 L28.064581,203.996739 C28.064581,203.996739 20.2377873,204.318761 17.7079146,198.562628 C15.1780419,192.806494 12.2133473,190.753608 12.2133473,190.753608 C12.2133473,190.753608 11.4227621,181.978524 12.8853448,179.804879 C14.3083982,177.671487 13.9131056,168.010844 13.9131056,168.010844 Z"
                        fill={getPartFill("SagArkaCamurluk")}
                        stroke={getPartStroke("SagArkaCamurluk")}
                        strokeWidth="2"
                        fillRule="nonzero"
                        transform="translate(34.500000, 182.500000) rotate(-90.000000) translate(-34.500000, -182.500000)"
                        className="cursor-pointer transition-all hover:opacity-80"
                        onClick={() =>
                          updateExpertiz("SagArkaCamurluk", cycleValue(getPartValue("SagArkaCamurluk")))
                        }
                        onMouseEnter={() => onHoverPart("SagArkaCamurluk")}
                        onMouseLeave={() => setHoveredPart(null)}
                      />
                      <path
                        d="M14.5326799,52 L57.1956592,45.0528587 C57.1956592,45.0528587 69.2385483,41.6170442 70.4922245,38.3700108 C71.7459006,35.1229773 72.3917338,32.9708738 71.7459006,30.592233 C71.1000675,28.2135922 69.4664894,22.5124056 69.4664894,22.5124056 C69.4664894,22.5124056 72.1258025,17.7551241 68.972617,17.7551241 C65.8194316,17.7551241 56.1727324,17 56.1727324,17 C56.1727324,17 58.0345528,41.9848751 35.6936697,42.3173455 C15.1854438,42.6225429 15.7176067,20.2847896 15.7176067,20.2847896 L11,20.2847896 C11,20.2847896 15.5968126,38.1434736 11,52 L14.5326799,52 Z"
                        fill={getPartFill("SagOnCamurluk")}
                        stroke={getPartStroke("SagOnCamurluk")}
                        strokeWidth="2"
                        fillRule="nonzero"
                        transform="translate(41.500000, 34.500000) scale(-1, 1) rotate(-90.000000) translate(-41.500000, -34.500000)"
                        className="cursor-pointer transition-all hover:opacity-80"
                        onClick={() => updateExpertiz("SagOnCamurluk", cycleValue(getPartValue("SagOnCamurluk")))}
                        onMouseEnter={() => onHoverPart("SagOnCamurluk")}
                        onMouseLeave={() => setHoveredPart(null)}
                      />
                    </g>

                    {/* Sol taraf parçaları */}
                    <g
                      transform="translate(31.525480, 155.500000) scale(-1, 1) translate(-31.525480, -155.500000) translate(0.025480, 52.000000)"
                      stroke="#D3D2D2"
                    >
                      <path
                        d="M13.0500284,141.698113 L13.0875754,141.773585 C14.8898297,144.792453 17.1801946,147.471698 19.8835762,149.698113 C21.2728139,150.830189 22.4743168,152.113208 23.4505379,153.471698 C24.426759,154.792453 24.9524165,155.886792 25.515621,157.018868 C26.0037316,157.962264 26.4918421,158.981132 27.2803284,160.226415 C28.0688147,161.433962 28.9323949,162.603774 29.8710691,163.698113 C31.072572,165.09434 32.6119976,165.924528 34.0763292,165.962264 C36.0287715,166 38.732153,166 42.1489269,166 C46.5794688,166 51.0851047,165.962264 53,165.962264 L53,146.113208 C53,140.45283 52.4743425,134.792453 51.4230274,129.245283 L48.9449277,116 L38.2815894,116 C29.7208812,116 21.19772,118.113208 13.6132329,122.075472 L9.93363022,124 C8.13137587,124.943396 6.81723206,126.490566 6.14138668,128.415094 C5.87855792,129.169811 5.99119881,130 6.40421544,130.716981 L13.0500284,141.698113 Z"
                        fill={getPartFill("SolArkaKapi")}
                        stroke={getPartStroke("SolArkaKapi")}
                        strokeWidth="2"
                        fillRule="nonzero"
                        transform="translate(29.500000, 141.000000) rotate(-90.000000) translate(-29.500000, -141.000000)"
                        className="cursor-pointer transition-all hover:opacity-80"
                        onClick={() => updateExpertiz("SolArkaKapi", cycleValue(getPartValue("SolArkaKapi")))}
                        onMouseEnter={() => onHoverPart("SolArkaKapi")}
                        onMouseLeave={() => setHoveredPart(null)}
                      />
                      <path
                        d="M6.98512508,98.1209373 L6.98512508,118 L52.6260859,118 C53.3028053,118 53.9043336,117.508692 54.0171202,116.82842 L54.2426933,115.505669 C55.671323,106.435374 55.0697947,97.0249433 52.5132994,88.2191988 C51.6110069,85.1579743 49.6184444,82.5502646 46.9115669,80.8873772 C34.3170679,73.2532124 19.9555794,68.8692366 5.33092222,68.1133787 L3,68 L5.40611326,80.8495843 C6.45878781,86.5185185 6.98512508,92.3386243 6.98512508,98.1209373 Z"
                        fill={getPartFill("SolOnKapi")}
                        stroke={getPartStroke("SolOnKapi")}
                        strokeWidth="2"
                        fillRule="nonzero"
                        transform="translate(29.000000, 93.000000) rotate(-90.000000) translate(-29.000000, -93.000000)"
                        className="cursor-pointer transition-all hover:opacity-80"
                        onClick={() => updateExpertiz("SolOnKapi", cycleValue(getPartValue("SolOnKapi")))}
                        onMouseEnter={() => onHoverPart("SolOnKapi")}
                        onMouseLeave={() => setHoveredPart(null)}
                      />
                      <path
                        d="M13.9131056,168.010844 C13.9131056,168.010844 19.0519095,166.400737 26.9577617,167.205791 L31.4640974,166.964275 C31.4640974,166.964275 39.2118326,160.765362 41.5835882,161.006878 C43.9553439,161.288647 48.066387,167.970592 48.066387,167.970592 L57,184.071663 C56.8814122,183.8704 44.2320487,181.253976 38.3817181,185.238991 C33.3219727,188.700721 29.4085759,194.175086 28.7365784,199.971471 L28.064581,203.996739 C28.064581,203.996739 20.2377873,204.318761 17.7079146,198.562628 C15.1780419,192.806494 12.2133473,190.753608 12.2133473,190.753608 C12.2133473,190.753608 11.4227621,181.978524 12.8853448,179.804879 C14.3083982,177.671487 13.9131056,168.010844 13.9131056,168.010844 Z"
                        fill={getPartFill("SolArkaCamurluk")}
                        stroke={getPartStroke("SolArkaCamurluk")}
                        strokeWidth="2"
                        fillRule="nonzero"
                        transform="translate(34.500000, 182.500000) rotate(-90.000000) translate(-34.500000, -182.500000)"
                        className="cursor-pointer transition-all hover:opacity-80"
                        onClick={() =>
                          updateExpertiz("SolArkaCamurluk", cycleValue(getPartValue("SolArkaCamurluk")))
                        }
                        onMouseEnter={() => onHoverPart("SolArkaCamurluk")}
                        onMouseLeave={() => setHoveredPart(null)}
                      />
                      <path
                        d="M14.5326799,52 L57.1956592,45.0528587 C57.1956592,45.0528587 69.2385483,41.6170442 70.4922245,38.3700108 C71.7459006,35.1229773 72.3917338,32.9708738 71.7459006,30.592233 C71.1000675,28.2135922 69.4664894,22.5124056 69.4664894,22.5124056 C69.4664894,22.5124056 72.1258025,17.7551241 68.972617,17.7551241 C65.8194316,17.7551241 56.1727324,17 56.1727324,17 C56.1727324,17 58.0345528,41.9848751 35.6936697,42.3173455 C15.1854438,42.6225429 15.7176067,20.2847896 15.7176067,20.2847896 L11,20.2847896 C11,20.2847896 15.5968126,38.1434736 11,52 L14.5326799,52 Z"
                        fill={getPartFill("SolOnCamurluk")}
                        stroke={getPartStroke("SolOnCamurluk")}
                        strokeWidth="2"
                        fillRule="nonzero"
                        transform="translate(41.500000, 34.500000) scale(-1, 1) rotate(-90.000000) translate(-41.500000, -34.500000)"
                        className="cursor-pointer transition-all hover:opacity-80"
                        onClick={() => updateExpertiz("SolOnCamurluk", cycleValue(getPartValue("SolOnCamurluk")))}
                        onMouseEnter={() => onHoverPart("SolOnCamurluk")}
                        onMouseLeave={() => setHoveredPart(null)}
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            </div>

            {/* ✅ Sabit kutu: hep görünür, hover yoksa "Bir parça seçin" */}
            <div
              className="mt-3 p-2 bg-slate-800 rounded border text-center transition-colors"
              style={{
                borderColor: displayKey ? `${displayStatus.color}55` : "rgba(148,163,184,0.25)",
              }}
            >
              {!displayKey ? (
                <span className="text-sm text-slate-300">Bir parça seçin</span>
              ) : (
                <>
                  <span className="text-sm font-semibold text-white">{displayLabel}</span>
                  <span className="text-xs mx-2 text-slate-400">•</span>
                  <span className="text-sm font-bold" style={{ color: displayStatus.color }}>
                    {displayStatus.label}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {expertizOptions.map((option) => {
              const count = carParts.filter((part) => getPartValue(part.key) === option.value).length;
              return (
                <div key={option.value} className="text-center p-2 bg-slate-800 rounded">
                  <div className="text-2xl font-bold" style={{ color: option.color }}>
                    {count}
                  </div>
                  <div className="text-xs text-slate-400">{option.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Table like arabam.com (NO SCROLL) */}
        <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden flex flex-col">
          <div className="px-3 py-2 bg-slate-800 border-b border-slate-700">
            <div className="grid grid-cols-[1fr_40px_40px_40px] items-center gap-2">
              <div className="text-xs font-semibold text-white">Parça</div>
              <div className="text-[10px] text-slate-300 text-center">Ori</div>
              <div className="text-[10px] text-slate-300 text-center">Boy</div>
              <div className="text-[10px] text-slate-300 text-center">Değ</div>
            </div>
          </div>

          <div className="p-2 space-y-1">
            {carParts.map((part) => {
              const status = getPartStatus(part.key);

              return (
                <div
                  key={part.key}
                  className="rounded-md border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 transition-colors"
                  onMouseEnter={() => onHoverPart(part.key)}
                  onMouseLeave={() => setHoveredPart(null)}
                >
                  <div className="grid grid-cols-[1fr_40px_40px_40px] items-center gap-2 px-2 py-1.5">
                    <div className="min-w-0">
                      <div className="text-[12px] font-medium text-white truncate">{part.label}</div>
                      <div className="text-[10px]" style={{ color: status.color }}>
                        {status.label}
                      </div>
                    </div>

                    <SelectCell partKey={part.key} value="1" />
                    <SelectCell partKey={part.key} value="2" />
                    <SelectCell partKey={part.key} value="3" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-auto px-3 py-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Toplam: {carParts.length} parça</span>
            <span className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: expertizOptions[0].color }} />
                Orijinal
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: expertizOptions[1].color }} />
                Boyalı
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: expertizOptions[2].color }} />
                Değişmiş
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
