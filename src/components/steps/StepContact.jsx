import { useState } from "react";
import { User, Phone, Mail, CreditCard } from "lucide-react";

export default function StepContact({ formData, updateField }) {
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length <= 8) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    updateField("telefon", formatted);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">İletişim Bilgileri</h2>
        <p className="text-sm text-slate-400">Teklifler için size ulaşabilmemiz gerekiyor.</p>
      </div>

      {/* Ad Soyad */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
          <User className="w-4 h-4" />
          Ad Soyad
        </label>
        <input
          type="text"
          placeholder="Adınız ve soyadınız"
          value={formData.adSoyad}
          onChange={(e) => updateField("adSoyad", e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 text-white rounded-md border border-slate-700"
        />
      </div>

      {/* Telefon */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
          <Phone className="w-4 h-4" />
          Telefon
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">+90</span>
          <input
            type="tel"
            placeholder="(5XX) XXX XX XX"
            value={formData.telefon}
            onChange={handlePhoneChange}
            maxLength={16}
            className="w-full pl-14 px-4 py-2 bg-slate-800 text-white rounded-md border border-slate-700"
          />
        </div>
      </div>

      {/* E-posta */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
          <Mail className="w-4 h-4" />
          E-posta
          <span className="text-slate-400 font-normal">(isteğe bağlı)</span>
        </label>
        <input
          type="email"
          placeholder="ornek@email.com"
          value={formData.eposta}
          onChange={(e) => updateField("eposta", e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 text-white rounded-md border border-slate-700"
        />
      </div>

      {/* Plaka */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
          <CreditCard className="w-4 h-4" />
          Plaka
          <span className="text-slate-400 font-normal">(isteğe bağlı)</span>
        </label>
        <input
          type="text"
          placeholder="34 ABC 123"
          value={formData.plaka}
          onChange={(e) => updateField("plaka", e.target.value.toUpperCase())}
          className="w-full px-4 py-2 bg-slate-800 text-white rounded-md border border-slate-700 uppercase"
        />
      </div>

      {/* KVKK Bilgilendirme */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
        <p className="text-sm text-slate-400">
          Bilgileriniz gizli tutulacak ve sadece teklif sürecinde kullanılacaktır. KVKK kapsamında verileriniz güvende.
        </p>
      </div>
    </div>
  );
}
