"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import KosCard from "./KosCard";
import { SEARCH_EVENT } from "../lib/events";

const NO_FILTER = { q: "", tipe: "" };
const LIMIT = 4;

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-brand-100 bg-white">
      <div className="aspect-[4/3] bg-brand-50" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 rounded bg-brand-50" />
        <div className="h-4 w-3/4 rounded bg-brand-50" />
        <div className="h-3 w-1/2 rounded bg-brand-50" />
        <div className="h-4 w-1/3 rounded bg-brand-50" />
      </div>
    </div>
  );
}

export default function Recommendations() {
  const [filter, setFilter] = useState(NO_FILTER);
  // status: loading | ready | error
  const [state, setState] = useState({ status: "loading", items: [], message: "" });
  const [attempt, setAttempt] = useState(0); // naik 1 tiap "Coba lagi"

  useEffect(() => {
    const onSearch = (e) => setFilter({ ...NO_FILTER, ...e.detail });
    window.addEventListener(SEARCH_EVENT, onSearch);
    return () => window.removeEventListener(SEARCH_EVENT, onSearch);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch("/api/kos", { signal: controller.signal });
        if (!res.ok) {
          setState({
            status: "error",
            items: [],
            message: "Server bermasalah saat memuat daftar kost.",
          });
          return;
        }
        const json = await res.json();
        setState({
          status: "ready",
          items: Array.isArray(json.data) ? json.data : [],
          message: "",
        });
      } catch (err) {
        if (err.name === "AbortError") return; // komponen di-unmount / request diulang
        setState({
          status: "error",
          items: [],
          message: "Tidak dapat terhubung ke server. Periksa koneksi internetmu.",
        });
      }
    })();

    return () => controller.abort();
  }, [attempt]);

  const retry = () => {
    setState({ status: "loading", items: [], message: "" });
    setAttempt((n) => n + 1);
  };

  const filtered = filter.q !== "" || filter.tipe !== "";

  const visible = useMemo(() => {
    const items = state.items;
    if (!filtered) {
      return [...items].sort((a, b) => b.rating - a.rating).slice(0, LIMIT);
    }
    const q = filter.q.toLowerCase();
    return items.filter((k) => {
      if (filter.tipe && k.type !== filter.tipe) return false;
      if (!q) return true;
      return [k.name, k.district, k.city].some((v) => v.toLowerCase().includes(q));
    });
  }, [state.items, filter, filtered]);

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

      {state.status === "ready" && filtered && (
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

      <div className="mt-6" aria-live="polite" aria-busy={state.status === "loading"}>
        {state.status === "loading" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: LIMIT }, (_, i) => (
              <SkeletonCard key={i} />
            ))}
            <span className="sr-only">Memuat daftar kost...</span>
          </div>
        )}

        {state.status === "error" && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-semibold text-red-700">Daftar kost belum bisa dimuat</p>
            <p className="mt-1 text-sm text-red-700">{state.message}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-4 rounded-full border border-red-600 px-5 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              Coba lagi
            </button>
          </div>
        )}

        {state.status === "ready" &&
          (visible.length > 0 ? (
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
          ))}
      </div>
    </section>
  );
}