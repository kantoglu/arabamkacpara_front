import CarForm from "../components/CarFormWizard";
import OfferList from "../components/OfferDisplay";

export default function HeroSection({ onSubmit, loading, offers }) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-16 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute -bottom-16 -right-10 w-96 h-96 bg-sky-500/20 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24 md:py-28 space-y-12 relative">
        {/* Headline */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Aracın için{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-300 bg-clip-text text-transparent">
              en iyi fiyatı
            </span>{" "}
            birkaç saniyede karşılaştır 
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            Güvenilir
            alım platformlarından anlık teklifler al — hepsi tek ekranda!
          </p>

          <div className="flex justify-center mt-6">
            <a
              href="#form"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 text-slate-950 text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg hover:brightness-110 transition-all duration-300"
            >
              🚀 Teklif Almaya Başla
            </a>
          </div>
        </div>

        {/* Form + Offers */}
        <div
          id="form"
          className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start mt-10"
        >
          <CarForm onSubmit={onSubmit} loading={loading} />
          <OfferList offers={offers} loading={loading} />
        </div>
      </div>
    </section>
  );
}
