import { useState, useEffect } from "react";
import CarForm from "./component/CarForm";

export default function App() {
  // Tema state’i (localStorage'dan çekilir)
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // HTML'e dark/light class'ını uygula
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Switch toggle
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Form gönderimi (örnek)
  const handleSubmit = (data) => {
    console.log("Form gönderildi:", data);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative transition-colors duration-500 bg-gray-100 dark:bg-slate-900">
      {/* Tema geçiş switch’i */}
      <div
        className="fixed top-5 right-5 flex items-center gap-2 select-none cursor-pointer"
        onClick={toggleTheme}
      >
        {/* Switch kutusu */}
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
            theme === "dark"
              ? "bg-indigo-600 justify-end"
              : "bg-slate-300 justify-start"
          }`}
        >
          <div className="w-4 h-4 bg-white rounded-full shadow-md" />
        </div>
        {/* İkon */}
        <span className="text-lg">
          {theme === "dark" ? "🌙" : "☀️"}
        </span>
      </div>

      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <img
            src="https://arbimg1.mncdn.com/assets2/dist/images/price-offer-landing/trink-sat-logo@2x.png"
            alt="Trink Sat"
            className="mx-auto h-16 mb-4 drop-shadow-md"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 mb-2">
            Aracını aynı gün, değerinde Trink Sat 🚗
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Paran hemen cebine gelsin! <br />
            40 şehir, 86 noktada ücretsiz hizmetinizdeyiz.
          </p>
        </section>

        {/* Form Section */}
        <div className="card p-6 md:p-10 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg">
          <CarForm onSubmit={handleSubmit} loading={false} />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10">
          © 2025 Arabam Demo | Mert Kantoğlu
        </footer>
      </div>
    </main>
  );
}
