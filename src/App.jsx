import { useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HeroSection from "./sections/HeroSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import WhyUsSection from "./sections/WhyUsSection";


const API_URL = "http://localhost:5000/api/car-request/create";

export default function App() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Teklif API isteği başarısız oldu");
      }

      const json = await res.json();
      setOffers(json.offers || []);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Teklifler alınırken bir hata oluştu. API bağlantısını kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOffers([]);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        <HeroSection />
        <HowItWorksSection />
        <WhyUsSection />
      </main>

      <Footer />
    </div>
  );
}
