"use client";

import { useEffect, useState } from "react";
import KosCard from "./KosCard";
import { kosList } from "../data/kos";

const pad = (n) => String(n).padStart(2, "0");
const DEALS = kosList.filter((k) => k.discount > 0);

// Hitung mundur sampai tengah malam waktu setempat; otomatis berulang tiap hari.
function useCountdown() {
  const [left, setLeft] = useState(null); // null sampai mount, supaya SSR dan client sama

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      setLeft(Math.max(0, Math.floor((end - now) / 1000)));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return left;
}

export default function PromoNgebut() {
  const left = useCountdown();
  const parts =
    left === null
      ? ["--", "--", "--"]
      : [Math.floor(left / 3600), Math.floor((left % 3600) / 60), left % 60].map(pad);
  const labels = ["Jam", "Menit", "Detik"];

  return (
    <section id="promo" className="scroll-mt-20 bg-brand-600 py-10 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Promo ngebut</h2>
            <p className="mt-1 text-sm text-brand-100">Harga turun sampai tengah malam. Ajukan survei sebelum waktunya habis.</p>
          </div>
          <div className="flex items-center gap-2" role="timer" aria-label="Sisa waktu promo">
            {parts.map((p, i) => (
              <div key={labels[i]} className="min-w-16 rounded-xl bg-white px-3 py-2 text-center text-plum-900">
                <div className="text-2xl font-bold tabular-nums">{p}</div>
                <div className="text-xs text-plum-600">{labels[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {DEALS.map((k) => (
            <KosCard key={k.id} kos={k} className="w-64 shrink-0 snap-start text-plum-900 lg:w-auto" />
          ))}
        </div>
      </div>
    </section>
  );
}