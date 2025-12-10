export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="border-t border-slate-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
              Modern & geliştirici dostu tasarım
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-400 max-w-xl">
              Tailwind tabanlı, kolay özelleştirilebilir, mobil uyumlu arayüz.
              İster SPA, ister kurumsal landing page olarak kullanabilirsin.
            </p>
          </div>
          <div className="flex gap-4 text-xs text-slate-300">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-emerald-300">
                <span className="text-lg">100%</span> Uyumlu
              </span>
              <span>React + Tailwind</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sky-300">
                Plug &amp; Play
              </span>
              <span>Backend API hazır</span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3 text-xs md:text-sm">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <h3 className="font-semibold text-slate-50 mb-1">
              Kullanıcı odaklı flow
            </h3>
            <p className="text-slate-400">
              Form adımları net, yalın ve progress bar ile desteklenmiş.
              Kullanıcı ne yapacağını her adımda biliyor.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <h3 className="font-semibold text-slate-50 mb-1">
              Komponent tabanlı mimari
            </h3>
            <p className="text-slate-400">
              <code className="px-1.5 py-0.5 rounded bg-slate-800/80 text-[11px]">
                CarForm
              </code>{" "}
              ve{" "}
              <code className="px-1.5 py-0.5 rounded bg-slate-800/80 text-[11px]">
                OfferList
              </code>{" "}
              tamamen bağımsız. İstediğin sayfada tekrar kullanabilirsin.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <h3 className="font-semibold text-slate-50 mb-1">
              Backend’e hazır
            </h3>
            <p className="text-slate-400">
              Sadece{" "}
              <code className="px-1.5 py-0.5 rounded bg-slate-800/80 text-[11px]">
                API_URL
              </code>{" "}
              sabitini kendi endpoint&rsquo;lerine göre güncelle, otomatik
              oluşturduğun sahte teklif mantığını canlı sisteme taşı.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
