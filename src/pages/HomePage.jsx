import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import WhyUsSection from "../components/WhyUsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
        <HeroSection />
        <HowItWorksSection />
        <WhyUsSection />
    </div>
  );
}
