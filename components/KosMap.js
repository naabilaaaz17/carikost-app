"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatRupiah, getFinalPrice } from "../lib/format";

// Contoh: 1850000 -> "Rp1,85jt", 950000 -> "Rp950rb"
function shortPrice(n) {
  if (n >= 1_000_000) {
    return `Rp${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, "").replace(".", ",")}jt`;
  }
  return `Rp${Math.round(n / 1000)}rb`;
}

function priceIcon(kos) {
  return L.divIcon({
    className: "",
    iconSize: [72, 28],
    iconAnchor: [36, 14],
    html: `<div style="display:flex;align-items:center;justify-content:center;height:28px;border-radius:9999px;background:#fff;border:2px solid #2563eb;color:#1d4ed8;font:600 12px system-ui,sans-serif;box-shadow:0 1px 3px rgba(0,0,0,.25);white-space:nowrap">${shortPrice(getFinalPrice(kos))}</div>`,
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function popupHtml(k) {
  return `<strong>${escapeHtml(k.name)}</strong><br>${escapeHtml(k.district)}, ${escapeHtml(k.city)}<br>${escapeHtml(formatRupiah(getFinalPrice(k)))} /bulan`;
}

// Memakai Leaflet langsung (tanpa react-leaflet) supaya peta selalu dibuat dan
// dihapus mengikuti siklus effect. Ini menghindari "Map container is being reused"
// saat Strict Mode, HMR, atau halaman dipertahankan lalu ditampilkan lagi.
export default function KosMap({ items }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  // Buat peta sekali per mount, hapus saat unmount.
  useEffect(() => {
    const map = L.map(containerRef.current).setView([-7.0, 110.4], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    mapRef.current = map;
    layerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // Sinkronkan marker dan zoom setiap daftar kost berubah.
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    items.forEach((k) => {
      L.marker([k.lat, k.lng], { icon: priceIcon(k) }).bindPopup(popupHtml(k)).addTo(layer);
    });

    if (items.length > 0) {
      map.fitBounds(items.map((k) => [k.lat, k.lng]), { padding: [40, 40], maxZoom: 14 });
    }
  }, [items]);

  return <div ref={containerRef} className="z-0 h-full w-full rounded-2xl" />;
}