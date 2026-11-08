"use client";

import { useMemo, useState } from "react";
import KosListItem from "./KosListItem";
import { CITY_OPTIONS, kosList } from "../data/kos";
import { getFinalPrice } from "../lib/format";
import dynamic from "next/dynamic";


const KosMap = dynamic(() => import("./KosMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-brand-50" />,
});

const TYPES = ["Semua", "Putra", "Putri", "Campur"];
const PRICE_OPTIONS = [
  { label: "Semua harga", max: Infinity },
  { label: "Maks Rp1 juta", max: 1_000_000 },
  { label: "Maks Rp1,5 juta", max: 1_500_000 },
  { label: "Maks Rp2 juta", max: 2_000_000 },
];
const SORTS = [
  { value: "rating", label: "Paling direkomendasikan" },
  { value: "cheap", label: "Harga terendah" },
  { value: "expensive", label: "Harga tertinggi" },
];
const ALL_FACILITIES = [...new Set(kosList.flatMap((k) => k.facilities))].sort();

const chip = (active) =>
  `rounded-full border px-4 py-2 text-sm transition-colors ${
    active ? "border-plum-900 bg-plum-900 text-white" : "border-brand-200 bg-white hover:bg-brand-50"
  }`;

export default function KosExplorer() {
  const [type, setType] = useState("Semua");
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [facilities, setFacilities] = useState([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [sort, setSort] = useState("rating");

  const toggleFacility = (f) =>
    setFacilities((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  const reset = () => {
    setType("Semua");
    setCity("");
    setMaxPrice(Infinity);
    setFacilities([]);
    setOnlyAvailable(false);
    setOnlyPromo(false);
    setOnlyNew(false);
  };

  const visible = useMemo(() => {
    const list = kosList.filter(
      (k) =>
        (type === "Semua" || k.type === type) &&
        (!city || k.city === city) &&
        getFinalPrice(k) <= maxPrice &&
        facilities.every((f) => k.facilities.includes(f)) &&
        (!onlyAvailable || k.roomsLeft > 0) &&
        (!onlyPromo || k.discount > 0) &&
        (!onlyNew || k.isNew)
    );
    const by = {
      rating: (a, b) => b.rating - a.rating,
      cheap: (a, b) => getFinalPrice(a) - getFinalPrice(b),
      expensive: (a, b) => getFinalPrice(b) - getFinalPrice(a),
    }[sort];
    return list.sort(by);
  }, [type, city, maxPrice, facilities, onlyAvailable, onlyPromo, onlyNew, sort]);

  return (
    <div>
      {/* Baris filter utama */}
      <div className="border-b border-brand-100 bg-white">
        <div className="mx-auto max-w-[1400px] space-y-4 px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {TYPES.map((t) => (
              <button key={t} type="button" onClick={() => setType(t)} className={chip(type === t)} aria-pressed={type === t}>
                {t === "Semua" ? "Semua tipe kos" : t}
              </button>
            ))}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="Kota"
              className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm"
            >
              <option value="">Semua kota</option>
              {CITY_OPTIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Harga"
              className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm"
            >
              {PRICE_OPTIONS.map((p) => (
                <option key={p.label} value={p.max}>
                  {p.label}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setOnlyAvailable((v) => !v)} className={chip(onlyAvailable)} aria-pressed={onlyAvailable}>
              Kamar tersedia
            </button>
          </div>

          {/* Fasilitas */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">Fasilitas:</span>
            {ALL_FACILITIES.map((f) => (
              <button key={f} type="button" onClick={() => toggleFacility(f)} className={`${chip(facilities.includes(f))} !px-3 !py-1.5`} aria-pressed={facilities.includes(f)}>
                {f}
              </button>
            ))}
          </div>

          {/* Baris chip kedua */}
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setOnlyPromo((v) => !v)} className={`${chip(onlyPromo)} !px-3 !py-1.5`} aria-pressed={onlyPromo}>
              ⚡ Promo ngebut
            </button>
            <button type="button" onClick={() => setOnlyNew((v) => !v)} className={`${chip(onlyNew)} !px-3 !py-1.5`} aria-pressed={onlyNew}>
              Kost baru
            </button>
            <label className="ml-auto flex items-center gap-2 text-sm">
              <span className="sr-only">Urutkan</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-plum-900 bg-white px-4 py-1.5 text-sm"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Daftar + peta */}
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_480px]">
        <div>
          <p className="mb-4 text-sm text-plum-600" aria-live="polite">
            Ditemukan {visible.length} kos-kosan
          </p>

          {visible.length > 0 ? (
            <div className="space-y-4">
              {visible.map((k) => (
                <KosListItem key={k.id} kos={k} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center">
              <p className="font-semibold">Belum ada kost yang cocok</p>
              <p className="mt-1 text-sm text-plum-600">Coba ubah atau hapus sebagian filter.</p>
              <button type="button" onClick={reset} className="mt-4 rounded-full border border-brand-600 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                Hapus semua filter
              </button>
            </div>
          )}
        </div>

        {/* Panel peta (placeholder, hanya tampil di layar besar) */}
<aside className="hidden lg:block" aria-label="Peta lokasi kost">
  <div className="sticky top-4 h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border border-brand-100">
    <KosMap items={visible} />
  </div>
</aside>
      </div>
    </div>
  );
}