export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-t border-slate-800/60 bg-slate-950/95"
    >
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
              Nasıl çalışır?
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-400 max-w-md">
              Geliştirdiğin backend ile gerçek teklif entegrasyonuna hazır sade
              ama modern bir akış.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-xs text-sky-300">
              1
            </div>
            <h3 className="font-semibold text-slate-50 mb-1">
              Araç bilgilerini doldur
            </h3>
            <p className="text-xs text-slate-400">
              Marka, model, yıl, km, vites ve yakıt tipini gir. Kullanıcıyı
              yormayan adım adım form yapısı.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-xs text-indigo-300">
              2
            </div>
            <h3 className="font-semibold text-slate-50 mb-1">
              Ekspertiz + tramer detayları
            </h3>
            <p className="text-xs text-slate-400">
              İnteraktif krokiden parçaları seç, boyalı / değişen kısımları tek
              tıkla işaretle, tramer durumunu ekle.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-xs text-emerald-300">
              3
            </div>
            <h3 className="font-semibold text-slate-50 mb-1">
              Backend’den demo teklifler
            </h3>
            <p className="text-xs text-slate-400">
              Formu gönder, sahte teklifler demo backend&rsquo;inden gelsin.
              Gerçek alım siteleri ile entegrasyon için sadece API adresini
              güncellemen yeterli.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
