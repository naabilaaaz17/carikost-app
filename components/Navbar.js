"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { openLogin } from "../lib/events";

const MENU = [
  [
    { label: "Kos", href: "/sewa" },
    { label: "Apartemen", href: "#" },
    { label: "Jual-Beli Properti", href: "#" },
  ],
  [
    { label: "Pusat Bantuan", href: "/bantuan" },
    { label: "Syarat dan Ketentuan", href: "/syarat-ketentuan" },
  ],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);

  // Tutup dropdown saat klik di luar atau tekan Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white">
      <nav aria-label="Navigasi utama" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" aria-label="carikost, kembali ke beranda">
            <Logo />
          </Link>

          <div ref={wrapRef} className="relative">
            <button
              ref={btnRef}
              type="button"
              aria-expanded={open}
              aria-controls="menu-cari"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-plum-900 hover:bg-brand-50"
            >
              Cari Apa?
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {open && (
              <div id="menu-cari" className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-brand-100 bg-white py-2 shadow-lg">
                {MENU.map((group, gi) => (
                  <ul key={gi} className={gi > 0 ? "mt-2 border-t border-brand-100 pt-2" : ""}>
                    {group.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            if (item.href === "#") e.preventDefault();
                            setOpen(false);
                          }}
                          className="block px-4 py-2 text-sm text-plum-900 hover:bg-brand-50"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={openLogin}
          className="rounded-lg border-2 border-brand-600 px-5 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-50"
        >
          Masuk
        </button>
      </nav>
    </header>
  );
}