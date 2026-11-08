"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import KosCard from "./KosCard";
import { kosList } from "../data/kos";
import { SEARCH_EVENT } from "../lib/events";

const NO_FILTER = { q: "", tipe: "" };
const LIMIT = 4;

export default function Recommendations() {
  const [filter, setFilter] = useState(NO_FILTER);

  useEffect(() => {
    const onSearch = (e) => setFilter({ ...NO_FILTER, ...e.detail });
    window.addEventListener(SEARCH_EVENT, onSearch);
    return () => window.removeEventListener(SEARCH_EVENT, onSearch);
  }, []);

  const filtered = filter.q !== "" || filter.tipe !== "";

  const visible = useMemo(() => {
    if (!filtered) {
      return [...kosList].sort((a, b) => b.rating - a.rating).slice(0, LIMIT);
    }
    const q = filter.q.toLowerCase();
    return kosList.filter((k) => {
      if (filter.tipe && k.type !== filter.tipe) return false;
      if (!q) return true;
      return [k.name, k.district, k.city].some((v) => v.toLowerCase().includes(q));
    });
  }, [filter, filtered]);

  return (
    <section id="rekomendasi" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Rekomendasi kami</h2>
          <p className="mt-1 text-sm text-plum-600">Mungkin kost ini cocok untukmu</p>
        </div>
        <Link href="/kos" className="shrink-0 text-sm font-semibold text-brand-700 underline underline-offset-2">
          Lihat semua
        </Link>
      </div>

      {filtered && (
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <p>
            Menampilkan {visible.length} kost
            {filter.q && ` untuk "${filter.q}"`}
            {filter.tipe && `, tipe ${filter.tipe}`}
          </p>
          <button type="button" onClick={() => setFilter(NO_FILTER)} className="font-semibold text-brand-700 underline underline-offset-2">
            Hapus filter
          </button>
        </div>
      )}

      <div className="mt-6" aria-live="polite">
        {visible.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((k) => (
              <KosCard key={k.id} kos={k} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center">
            <p className="font-semibold">Belum ada kost yang cocok</p>
            <p className="mt-1 text-sm text-plum-600">Coba kata kunci lain atau pilih semua tipe.</p>
            <button type="button" onClick={() => setFilter(NO_FILTER)} className="mt-4 rounded-full border border-brand-600 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
              Hapus filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}