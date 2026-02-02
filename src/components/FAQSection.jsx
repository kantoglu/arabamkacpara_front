import React, { useEffect, useRef, useState } from "react";

function FaqItem({ index, question, children, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [max, setMax] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) setMax(contentRef.current.scrollHeight);
    if (!isOpen) setMax(0);
  }, [isOpen]);

  return (
    <div className="rounded-2xl bg-slate-900/70 border border-white/10 shadow-xl backdrop-blur-md">
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="w-full text-left px-6 md:px-8 py-6 flex items-center justify-between gap-6"
      >
        <span className="text-base md:text-lg font-semibold text-white">
          {index + 1}. {question}
        </span>

        {/* plus → x */}
        <span className="relative inline-flex h-6 w-6 items-center justify-center text-slate-300">
          <span
            className={`absolute h-[2px] w-5 bg-current transition-transform duration-500 ${
              isOpen ? "rotate-45" : ""
            }`}
          />
          <span
            className={`absolute w-[2px] h-5 bg-current transition-transform duration-500 ${
              isOpen ? "-rotate-45" : ""
            }`}
          />
        </span>
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-700 ease-in-out"
        style={{ maxHeight: max }}
      >
        <div
          ref={contentRef}
          className="px-6 md:px-8 pb-6 text-slate-300 leading-relaxed text-sm md:text-base"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const faqs = [
    {
      q: "Arabam için teklif almak ücretli mi?",
      a: "Hayır. Arabam Kaç Para? tamamen ücretsizdir. Araç bilgilerini girerek anlaşmalı platformlardan fiyat tekliflerini ücretsiz alabilirsin.",
    },
    {
      q: "Teklifler ne kadar sürede geliyor?",
      a: "Çoğu teklif birkaç saniye içinde gelir. Bazı araçlar için detaylı inceleme gerekebilir.",
    },
    {
      q: "Firmalar güvenilir mi?",
      a: "Evet. Tüm firmalar lisanslı ve kurumsal iş ortaklarımızdır. Onayın olmadan hiçbir işlem yapılmaz.",
    },
    {
      q: "Ekspertiz zorunlu mu?",
      a: "Teklifi kabul ettiğinde araç ücretsiz ekspertize alınır. Süreç tamamen şeffaftır.",
    },
    {
      q: "Ödeme ne zaman yapılır?",
      a: "Ekspertiz sonrası anlaşma sağlanırsa ödeme aynı gün banka yoluyla yapılır.",
    },
  ];

  const copyRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.2,
    });
    if (copyRef.current) io.observe(copyRef.current);
    return () => io.disconnect();
  }, []);

  const [active, setActive] = useState(null);

  return (
    <section className="relative bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div ref={copyRef}>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <span
                className={`block transition-all duration-700 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                Sıkça Sorulan
              </span>
              <span
                className={`block bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-300 bg-clip-text text-transparent transition-all duration-700 delay-150 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                Sorular
              </span>
            </h2>

            <p className="mt-6 text-slate-300 max-w-xl text-base md:text-lg">
              Arabanı satmadan önce aklına takılan her şey burada.  
              Hızlı, güvenilir ve şeffaf bir teklif süreci sunuyoruz.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <FaqItem
                key={i}
                index={i}
                question={f.q}
                isOpen={active === i}
                onToggle={setActive}
              >
                {f.a}
              </FaqItem>
            ))}
          </div>
        </div>
      </div>

      {/* Glow – hero ile uyumlu */}
      <div className="pointer-events-none absolute -bottom-24 left-0 right-0 h-72 bg-gradient-to-t from-indigo-500/10 to-transparent blur-3xl" />
    </section>
  );
}
