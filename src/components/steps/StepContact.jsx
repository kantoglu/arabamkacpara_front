"use client";

import { useState } from "react";
import { User, Phone, Mail, CreditCard, ShieldCheck } from "lucide-react";

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
    <div className="space-y-6 text-slate-900 dark:text-white">
      {/* Başlık */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">İletişim Bilgileri</h2>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Teklifler için size ulaşabilmemiz gerekiyor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ad Soyad */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <User className="w-4 h-4 text-blue-500" />
            Ad Soyad
          </label>
          <input
            type="text"
            placeholder="Adınız ve soyadınız"
            value={formData.adSoyad}
            onChange={(e) => updateField("adSoyad", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          />
        </div>

        {/* Telefon */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <Phone className="w-4 h-4 text-emerald-500" />
            Telefon
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-bold border-r border-slate-300 dark:border-slate-600 pr-2">
              +90
            </span>
            <input
              type="tel"
              placeholder="(5XX) XXX XX XX"
              value={formData.telefon}
              onChange={handlePhoneChange}
              maxLength={16}
              className="w-full pl-16 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* E-posta */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <Mail className="w-4 h-4 text-amber-500" />
            E-posta
            <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">(İsteğe bağlı)</span>
          </label>
          <input
            type="email"
            placeholder="ornek@email.com"
            value={formData.eposta}
            onChange={(e) => updateField("eposta", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          />
        </div>

        {/* Plaka */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <CreditCard className="w-4 h-4 text-purple-500" />
            Plaka
            <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">(İsteğe bağlı)</span>
          </label>
          <input
            type="text"
            placeholder="34 ABC 123"
            value={formData.plaka}
            onChange={(e) => updateField("plaka", e.target.value.toUpperCase())}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all uppercase tracking-widest"
          />
        </div>
      </div>

      {/* KVKK Bilgilendirme */}
      <div className="mt-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 flex gap-4 items-start shadow-sm">
        <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Veri Güvenliği ve KVKK</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Bilgileriniz uçtan uca şifrelenir, kesinlikle üçüncü şahıslarla paylaşılmaz ve sadece size en uygun teklifi iletmek amacıyla kullanılır.
          </p>
        </div>
      </div>
    </div>
  );
}