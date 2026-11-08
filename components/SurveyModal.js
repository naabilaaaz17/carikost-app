"use client";

import { useEffect, useRef, useState } from "react";
import { SURVEY_EVENT } from "../lib/events";
import { CITY_OPTIONS } from "../data/kos";

const EMPTY = { nama: "", hp: "", kota: "", email: "" };

const inputClass = (invalid) =>
  `mt-1 block w-full rounded-lg border bg-white px-3 py-2.5 text-sm placeholder:text-plum-600/70 ${
    invalid ? "border-red-600" : "border-brand-200"
  }`;

function Field({ id, label, optional, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-plum-600"> (opsional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-plum-600">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
}

export default function SurveyModal() {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [fieldErrors, setFieldErrors] = useState({});
  const [banner, setBanner] = useState("");
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    const open = () => {
      const d = dialogRef.current;
      if (d && !d.open) d.showModal();
    };
    window.addEventListener(SURVEY_EVENT, open);
    return () => window.removeEventListener(SURVEY_EVENT, open);
  }, []);

  // Fokus ke kolom pertama yang bermasalah setelah server menolak data.
  useEffect(() => {
    if (Object.keys(fieldErrors).length > 0) {
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
    }
  }, [fieldErrors]);

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setFieldErrors({});
    setBanner("");

    let res;
    try {
      res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {
      setStatus("idle");
      setBanner("Tidak dapat terhubung ke server. Periksa koneksi internetmu lalu kirim lagi. Isian kamu masih tersimpan di form.");
      return;
    }

    let json = null;
    try {
      json = await res.json();
    } catch {
      /* body kosong atau bukan JSON */
    }

    if (res.status === 201) {
      setSaved(json?.data ?? null);
      setValues(EMPTY);
      setStatus("success");
      return;
    }

    setStatus("idle");
    if (res.status === 400) {
      setFieldErrors(json?.fields ?? {});
      setBanner(json?.error ?? "Data belum valid.");
    } else if (res.status === 409) {
      setFieldErrors({ hp: json?.error ?? "Nomor HP ini sudah mengajukan survei." });
      setBanner("");
    } else {
      setBanner(`Server sedang bermasalah (kode ${res.status}). Coba lagi beberapa saat lagi.`);
    }
  }

  function onClose() {
    if (status === "success") {
      setStatus("idle");
      setSaved(null);
    }
    setFieldErrors({});
    setBanner("");
  }

  const close = () => dialogRef.current?.close();
  const submitting = status === "submitting";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // klik area gelap
      }}
      aria-labelledby="survei-judul"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-0 text-plum-900 backdrop:bg-plum-900/60"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="survei-judul" className="text-xl font-bold">
            {status === "success" ? "Pengajuan survei terkirim" : "Ajukan survei kost"}
          </h2>
          <button type="button" onClick={close} aria-label="Tutup" className="-m-2 rounded-lg p-2 hover:bg-brand-50">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-4">
            <p className="text-sm text-plum-600">
              Terima kasih{saved?.nama ? `, ${saved.nama}` : ""}. Tim carikost akan menghubungi {saved?.hp ?? "nomor HP kamu"} untuk mengatur jadwal survei{saved?.kota ? ` di ${saved.kota}` : ""}.
            </p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={close} className="flex-1 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
                Tutup
              </button>
              <button type="button" onClick={() => { setStatus("idle"); setSaved(null); }} className="flex-1 rounded-lg border border-brand-600 px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                Ajukan lagi
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-4 space-y-4">
            {banner && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
                {banner}
              </p>
            )}

            <Field id="sv-nama" label="Nama lengkap" error={fieldErrors.nama}>
              <input
                id="sv-nama" name="nama" type="text" autoComplete="name"
                value={values.nama} onChange={set("nama")}
                aria-invalid={Boolean(fieldErrors.nama)}
                aria-describedby={fieldErrors.nama ? "sv-nama-error" : undefined}
                className={inputClass(fieldErrors.nama)}
              />
            </Field>

            <Field id="sv-hp" label="Nomor HP" error={fieldErrors.hp} hint="Contoh: 081234567890 atau +6281234567890">
              <input
                id="sv-hp" name="hp" type="tel" inputMode="tel" autoComplete="tel"
                value={values.hp} onChange={set("hp")}
                aria-invalid={Boolean(fieldErrors.hp)}
                aria-describedby={fieldErrors.hp ? "sv-hp-error" : "sv-hp-hint"}
                className={inputClass(fieldErrors.hp)}
              />
            </Field>

            <Field id="sv-kota" label="Kota" error={fieldErrors.kota}>
              <select
                id="sv-kota" name="kota"
                value={values.kota} onChange={set("kota")}
                aria-invalid={Boolean(fieldErrors.kota)}
                aria-describedby={fieldErrors.kota ? "sv-kota-error" : undefined}
                className={inputClass(fieldErrors.kota)}
              >
                <option value="">Pilih kota</option>
                {CITY_OPTIONS.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </Field>

            <Field id="sv-email" label="Email" optional error={fieldErrors.email}>
              <input
                id="sv-email" name="email" type="email" autoComplete="email"
                value={values.email} onChange={set("email")}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "sv-email-error" : undefined}
                className={inputClass(fieldErrors.email)}
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Mengirim..." : "Kirim pengajuan"}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}