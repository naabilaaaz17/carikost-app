"use client";

import { useState } from "react";
import { CITY_OPTIONS } from "../data/kos";
const INITIAL = {
  owner: "",
  phone: "",
  email: "",
  kosName: "",
  type: "",
  city: "",
  district: "",
  rooms: "",
  price: "",
  periods: ["bulanan"],
  note: "",
};

const field =
  "w-full rounded-md border border-plum-600/30 bg-white px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";

function Label({ text, children }) {
  return (
    <label className="block text-sm font-semibold">
      {text}
      <div className="mt-1 font-normal">{children}</div>
    </label>
  );
}

export default function PromoteForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const togglePeriod = (p) =>
    setForm((f) => ({
      ...f,
      periods: f.periods.includes(p) ? f.periods.filter((x) => x !== p) : [...f.periods, p],
    }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.periods.length === 0) return;
    setStatus("sending");
    try {
      // TODO: ganti dengan kirim ke backend, mis.
      // await fetch("/api/promosi", { method: "POST", body: JSON.stringify(form) });
      await new Promise((r) => setTimeout(r, 600));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <p className="text-lg font-bold">Terima kasih, data kostmu sudah kami terima</p>
        <p className="mt-2 text-sm text-plum-600">
          Tim carikost akan menghubungi {form.owner || "kamu"} lewat WhatsApp untuk verifikasi data dan foto kost.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(INITIAL);
            setStatus("idle");
          }}
          className="mt-5 rounded-full border border-brand-600 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          Daftarkan kost lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
      <fieldset className="space-y-4">
        <legend className="text-base font-bold">Data pemilik</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Label text="Nama lengkap">
            <input required value={form.owner} onChange={update("owner")} autoComplete="name" className={field} />
          </Label>
          <Label text="Nomor WhatsApp">
            <input
              required
              type="tel"
              inputMode="tel"
              pattern="^(\+62|62|0)8[0-9]{8,12}$"
              title="Contoh: 081234567890"
              placeholder="081234567890"
              value={form.phone}
              onChange={update("phone")}
              autoComplete="tel"
              className={field}
            />
          </Label>
        </div>
        <Label text="Email (opsional)">
          <input type="email" value={form.email} onChange={update("email")} autoComplete="email" className={field} />
        </Label>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-base font-bold">Data kost</legend>
        <Label text="Nama kost">
          <input required value={form.kosName} onChange={update("kosName")} className={field} />
        </Label>

        <div className="grid gap-4 sm:grid-cols-3">
          <Label text="Tipe penghuni">
            <select required value={form.type} onChange={update("type")} className={field}>
              <option value="">Pilih tipe</option>
              <option>Putra</option>
              <option>Putri</option>
              <option>Campur</option>
            </select>
          </Label>
          <Label text="Kota">
            <select required value={form.city} onChange={update("city")} className={field}>
              <option value="">Pilih kota</option>
              {CITY_OPTIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
              <option>Lainnya</option>
            </select>
          </Label>
          <Label text="Kecamatan / area">
            <input required value={form.district} onChange={update("district")} className={field} />
          </Label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Label text="Jumlah kamar">
            <input required type="number" min="1" inputMode="numeric" value={form.rooms} onChange={update("rooms")} className={field} />
          </Label>
          <Label text="Harga mulai dari (Rp / bulan)">
            <input required type="number" min="0" inputMode="numeric" placeholder="1000000" value={form.price} onChange={update("price")} className={field} />
          </Label>
        </div>

        <div>
          <p className="text-sm font-semibold">Periode sewa yang diterima</p>
          <div className="mt-2 flex gap-4 text-sm">
            {[
              ["bulanan", "Bulanan"],
              ["tahunan", "Tahunan"],
            ].map(([value, label]) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.periods.includes(value)}
                  onChange={() => togglePeriod(value)}
                  className="h-4 w-4 accent-brand-600"
                />
                {label}
              </label>
            ))}
          </div>
          {form.periods.length === 0 && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              Pilih minimal satu periode.
            </p>
          )}
        </div>

        <Label text="Catatan tambahan (opsional)">
          <textarea
            rows={3}
            value={form.note}
            onChange={update("note")}
            placeholder="Fasilitas utama, aturan kost, atau hal lain yang perlu kami tahu"
            className={field}
          />
        </Label>
      </fieldset>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Data belum terkirim. Coba lagi sebentar lagi.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? "Mengirim..." : "Kirim data kost"}
      </button>
      <p className="text-center text-xs text-plum-600">
        Dengan mengirim formulir ini, kamu menyetujui Syarat dan Ketentuan carikost.
      </p>
    </form>
  );
}