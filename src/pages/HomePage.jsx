import Header from "../layout/Header";
import Footer from "../layout/Footer";
import HeroSection from "../layout/HeroSection";
import HowItWorksSection from "../layout/HowItWorksSection";
import WhyUsSection from "../layout/WhyUsSection";

export default function HomePage() {
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
