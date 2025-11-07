import CarForm from "./component/CarForm";

export default function App() {
  const handleSubmit = (data) => {
    console.log("Form gönderildi:", data);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <img
            src="https://arbimg1.mncdn.com/assets2/dist/images/price-offer-landing/trink-sat-logo@2x.png"
            alt="Trink Sat"
            className="mx-auto h-16 mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Aracını aynı gün, değerinde Trink Sat 🚗
          </h1>
          <p className="text-slate-500 text-sm">
            Paran hemen cebine gelsin! <br />
            40 şehir, 86 noktada ücretsiz hizmetinizdeyiz.
          </p>
        </section>

        {/* Form Section */}
        <div className="card">
          <CarForm
            onSubmit={handleSubmit}
            loading={false}
          />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400 mt-10">
          © 2025 Arabam Demo | Mert Kantoğlu
        </footer>
      </div>
    </main>
  );
}
