"use client";

import { useState } from "react";
import { runSearch } from "../lib/events";

// Siluet kota: garis tipis, tanpa isi warna.
const BUILDINGS = [
  { x: 8, w: 56, top: 150 },
  { x: 70, w: 48, top: 112 },
  { x: 124, w: 70, top: 64 },
  { x: 200, w: 52, top: 122 },
  { x: 258, w: 44, top: 92 },
  { x: 308, w: 44, top: 160 },
];
const GROUND = 220;

function CitySkyline() {
  return (
    <svg
      viewBox="0 0 360 240"
      className="h-auto w-full"
      fill="none"
      stroke="#c52a68"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* bulan */}
      <circle cx="42" cy="52" r="14" />
      <path d="M78 40h22M88 50h14" />

      {BUILDINGS.map((b) => {
        const cols = Math.floor((b.w - 12) / 14);
        const rows = Math.floor((GROUND - b.top - 24) / 22);
        const windows = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            windows.push(<rect key={`${r}-${c}`} x={b.x + 8 + c * 14} y={b.top + 12 + r * 22} width="7" height="10" rx="1" />);
          }
        }
        return (
          <g key={b.x}>
            <rect x={b.x} y={b.top} width={b.w} height={GROUND - b.top} rx="2" />
            {windows}
          </g>
        );
      })}

      {/* mahkota dan antena gedung tertinggi */}
      <path d="M134 64V52h50v12M159 52V30" />
      {/* atap segitiga */}
      <path d="M70 112l24-16 24 16" />
      <path d="M258 92l22-14 22 14" />

      {/* tanah */}
      <path d="M0 220h360" />
    </svg>
  );
}

export default function Hero() {
  const [q, setQ] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    runSearch({ q: q.trim(), tipe: "" });
  }

  return (
    <section id="hero" className="scroll-mt-20 bg-brand-100">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-plum-900 sm:text-5xl">Mau Cari Kost?</h1>
          <p className="mt-3 text-lg text-plum-600">Dapatkan infonya dan langsung sewa.</p>

          <form
            onSubmit={onSubmit}
            role="search"
            className="mt-8 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 ring-1 ring-brand-200 focus-within:ring-2 focus-within:ring-brand-600"
          >
            <label htmlFor="cari-q" className="sr-only">Cari nama kost, area, atau kota</label>
            <svg viewBox="0 0 24 24" className="ml-2 h-5 w-5 shrink-0 text-plum-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              id="cari-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Masukkan nama kost, area, atau kota"
              className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm outline-none placeholder:text-plum-600/70"
            />
            <button type="submit" className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
              Cari
            </button>
          </form>
        </div>

        <div className="hidden w-full max-w-md justify-self-end md:block">
          <CitySkyline />
        </div>
      </div>
    </section>
  );
}