"use client";

import { useMemo, useState } from "react";
import KosCard from "./KosCard";
import { CITY_OPTIONS, kosList } from "../data/kos";
import { getFinalPrice, getPeriodPrice, PERIODS } from "../lib/format";

const PAGE_SIZE = 20;
const SORTS = [
  { value: "rating", label: "Paling direkomendasikan" },
  { value: "cheap", label: "Harga terendah" },
  { value: "expensive", label: "Harga tertinggi" },
];
const DEFAULT_FILTER = { city: "", type: "", period: "bulanan", min: "", max: "" };

const field =
  "w-full rounded-md border border-plum-600/30 bg-white px-3 py-3 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";

export default function SewaExplorer() {
  // draft = isi form; applied = filter yang sedang dipakai (berubah saat klik "Set")
  const [draft, setDraft] = useState(DEFAULT_FILTER);
  const [applied, setApplied] = useState(DEFAULT_FILTER);
  const [sort, setSort] = useState("rating");
  const [page, setPage] = useState(1);

  const update = (key) => (e) => setDraft((d) => ({ ...d, [key]: e.target.value }));

  const apply = (e) => {
    e.preventDefault();
    setApplied(draft);
    setPage(1);
  };

  const reset = () => {
    setDraft(DEFAULT_FILTER);
    setApplied(DEFAULT_FILTER);
    setPage(1);
  };

  const results = useMemo(() => {
    const min = applied.min === "" ? 0 : Number(applied.min);
    const max = applied.max === "" ? Infinity : Number(applied.max);
    const list = kosList.filter((k) => {
      const price = getPeriodPrice(k, applied.period);
      return (
        k.periods.includes(applied.period) &&
        (!applied.city || k.city === applied.city) &&
        (!applied.type || k.type === applied.type) &&
        price >= min &&
        price <= max
      );
    });
    const by = {
      rating: (a, b) => b.rating - a.rating,
      cheap: (a, b) => getFinalPrice(a) - getFinalPrice(b),
      expensive: (a, b) => getFinalPrice(b) - getFinalPrice(a),
    }[sort];
    return list.sort(by);
  }, [applied, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const pageItems = results.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {/* Kartu filter, menimpa bagian bawah hero */}
      <form
        onSubmit={apply}
        className="relative -mt-14 grid gap-3 rounded-2xl bg-white p-5 shadow-lg sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr_auto] lg:items-center lg:p-6"
      >
        <select value={draft.city} onChange={update("city")} aria-label="Kota" className={field}>
          <option value="">Semua Kota</option>
          {CITY_OPTIONS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={draft.type} onChange={update("type")} aria-label="Tipe kost" className={field}>
          <option value="">Semua</option>
          <option>Putra</option>
          <option>Putri</option>
          <option>Campur</option>
        </select>

        <select
          value={draft.period}
          onChange={(e) => setDraft((d) => ({ ...d, period: e.target.value, min: "", max: "" }))}
          aria-label="Periode sewa"
          className={field}
        >
          {Object.entries(PERIODS).map(([value, p]) => (
            <option key={value} value={value}>
              {p.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={draft.min}
            onChange={update("min")}
            placeholder="Rp 0"
            aria-label="Harga minimum"
            className={field}
          />
          <span aria-hidden="true">–</span>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={draft.max}
            onChange={update("max")}
            placeholder={draft.period === "tahunan" ? "Rp 180.000.000" : "Rp 15.000.000"}
            aria-label="Harga maksimum"
            className={field}
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 sm:col-span-2 lg:col-span-1"
        >
          Set
        </button>
      </form>

      {/* Jumlah hasil + urutan */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold" aria-live="polite">
          {results.length > 0
            ? `${start + 1} - ${start + pageItems.length} Kos dari ${results.length} Kost Bisa Anda Booking`
            : "0 Kost ditemukan"}
        </p>
        <label className="text-sm">
          <span className="sr-only">Urutkan</span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="rounded-md border border-plum-600/30 bg-white px-4 py-2.5 text-sm"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Grid */}
      {pageItems.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pageItems.map((k) => (
            <KosCard key={k.id} kos={k} period={applied.period} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-brand-100 bg-white p-10 text-center">
          <p className="font-semibold">Belum ada kost yang cocok</p>
          <p className="mt-1 text-sm text-plum-600">Coba ubah kota, tipe, atau rentang harga.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-full border border-brand-600 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            Hapus semua filter
          </button>
        </div>
      )}

      {/* Pagination, hanya muncul kalau lebih dari satu halaman */}
      {totalPages > 1 && (
        <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Halaman">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setPage(n);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-current={n === current ? "page" : undefined}
              className={`h-10 w-10 rounded-md border text-sm font-semibold ${
                n === current ? "border-brand-600 bg-brand-600 text-white" : "border-brand-200 bg-white hover:bg-brand-50"
              }`}
            >
              {n}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}