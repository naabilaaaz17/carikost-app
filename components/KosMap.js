"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
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

// Zoom otomatis supaya semua pin hasil filter terlihat.
function FitBounds({ items }) {
  const map = useMap();
  useEffect(() => {
    if (items.length === 0) return;
    map.fitBounds(items.map((k) => [k.lat, k.lng]), { padding: [40, 40], maxZoom: 14 });
  }, [items, map]);
  return null;
}

export default function KosMap({ items }) {
  return (
    <MapContainer center={[-7.0, 110.4]} zoom={6} className="z-0 h-full w-full rounded-2xl">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds items={items} />
      {items.map((k) => (
        <Marker key={k.id} position={[k.lat, k.lng]} icon={priceIcon(k)}>
          <Popup>
            <strong>{k.name}</strong>
            <br />
            {k.district}, {k.city}
            <br />
            {formatRupiah(getFinalPrice(k))} /bulan
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}