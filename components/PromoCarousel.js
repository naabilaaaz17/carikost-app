"use client";

import { useEffect, useState } from "react";
import { openSurvey } from "../lib/events";

const SLIDES = [
  { id: "diskon", judul: "Diskon sewa hingga 20%", teks: "Berlaku untuk kost pilihan dan hanya sampai tengah malam ini.", cta: "Lihat promo ngebut", href: "#promo", tone: "bg-brand-600 text-white", ctaTone: "bg-white text-brand-700 hover:bg-brand-50" },
  { id: "survei", judul: "Lihat kamarnya dulu, baru putuskan", teks: "Ajukan survei gratis. Tim kami hubungi kamu untuk atur jadwal.", cta: "Ajukan survei", action: "survey", tone: "bg-plum-900 text-brand-50", ctaTone: "bg-brand-400 text-plum-900 hover:bg-brand-300" },
  { id: "putri", judul: "Kost putri dengan CCTV dan akses aman", teks: "Pilih kost yang punya pengamanan area bersama dan lingkungan tenang.", cta: "Cari kost putri", href: "#rekomendasi", tone: "bg-brand-200 text-plum-900", ctaTone: "bg-plum-900 text-white hover:bg-plum-600" },
  { id: "pemilik", judul: "Punya kost? Pasang iklan gratis", teks: "Jangkau lebih banyak pencari kost tanpa biaya pemasangan.", cta: "Pelajari caranya", href: "#bantuan", tone: "bg-brand-700 text-white", ctaTone: "bg-white text-brand-700 hover:bg-brand-50" },
];

export default function PromoCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [paused, reduced]);

  const go = (n) => setIndex((n + SLIDES.length) % SLIDES.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Banner promo"
      className="mx-auto max-w-6xl px-4 pt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live={paused || reduced ? "polite" : "off"}
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${SLIDES.length}`}
              inert={i !== index}
              className={`relative w-full shrink-0 overflow-hidden px-6 py-10 sm:px-12 sm:py-14 ${s.tone}`}
            >
              <div aria-hidden="true" className="absolute -right-12 -top-12 h-60 w-60 rounded-full border-[30px] border-current opacity-10" />
              <div aria-hidden="true" className="absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-current opacity-10" />
              <div className="relative max-w-lg">
                <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">{s.judul}</h2>
                <p className="mt-2 text-sm opacity-90 sm:text-base">{s.teks}</p>
                {s.action === "survey" ? (
                  <button type="button" onClick={openSurvey} className={`mt-5 inline-block rounded-full px-5 py-2.5 text-sm font-semibold ${s.ctaTone}`}>
                    {s.cta}
                  </button>
                ) : (
                  <a href={s.href} className={`mt-5 inline-block rounded-full px-5 py-2.5 text-sm font-semibold ${s.ctaTone}`}>
                    {s.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ke banner ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full ${i === index ? "w-7 bg-brand-600" : "w-2.5 bg-brand-200"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(index - 1)} aria-label="Banner sebelumnya" className="rounded-full border border-brand-200 bg-white p-2 text-plum-900 hover:bg-brand-50">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Banner berikutnya" className="rounded-full border border-brand-200 bg-white p-2 text-plum-900 hover:bg-brand-50">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}