"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import KosCard from "./KosCard";

function Arrow({ dir, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Kost sebelumnya" : "Kost berikutnya"}
      className="rounded-full border border-brand-200 bg-white p-2 text-plum-900 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

export default function KosCarousel({ judul, items, id }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, items]);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step * 2, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id={id} aria-label={judul} className="mx-auto max-w-6xl px-4 pt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{judul}</h2>
        <div className="hidden gap-2 md:flex">
          <Arrow dir="prev" disabled={!canPrev} onClick={() => scrollByCards(-1)} />
          <Arrow dir="next" disabled={!canNext} onClick={() => scrollByCards(1)} />
        </div>
      </div>

      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 motion-reduce:scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((kos) => (
          <KosCard key={kos.id} kos={kos} className="w-72 shrink-0 snap-start" />
        ))}
      </div>
    </section>
  );
}