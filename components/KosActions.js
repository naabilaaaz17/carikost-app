"use client";

import { useState } from "react";

export default function KosActions({ title }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* dibatalkan pengguna */
    }
  };

  const btn = "rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-brand-50";

  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => setSaved((v) => !v)} aria-pressed={saved} className={btn}>
        {saved ? "♥ Tersimpan" : "♡ Simpan"}
      </button>
      <button type="button" onClick={share} className={btn}>
        {copied ? "Link disalin" : "Bagikan"}
      </button>
    </div>
  );
}