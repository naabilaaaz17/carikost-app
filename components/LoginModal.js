"use client";

import { useEffect, useRef, useState } from "react";
import { LOGIN_EVENT } from "../lib/events";
import { isValidPhone } from "../lib/validation";

const ROLES = [
  {
    id: "pencari",
    label: "Pencari Kos",
    desc: "Cari kost dan ajukan survei",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </>
    ),
  },
  {
    id: "pemilik",
    label: "Pemilik Kos",
    desc: "Pasang iklan dan kelola kost",
    icon: (
      <>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v9h14v-9" />
        <path d="M10 19v-5h4v5" />
      </>
    ),
  },
];

const INITIAL_VIEW = { step: "role", role: null, mode: "login" }; // step: role | form | done
const EMPTY = { nama: "", hp: "", email: "", password: "", konfirmasi: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(mode, v) {
  const e = {};
  if (mode === "register") {
    const nama = v.nama.trim();
    if (!nama) e.nama = "Nama wajib diisi.";
    else if (nama.length < 2) e.nama = "Nama minimal 2 karakter.";
  }
  if (!v.hp.trim()) e.hp = "Nomor HP wajib diisi.";
  else if (!isValidPhone(v.hp)) e.hp = "Gunakan nomor HP Indonesia yang valid, contoh 081234567890.";
  if (mode === "register") {
    const email = v.email.trim();
    if (!email) e.email = "Email wajib diisi.";
    else if (email.length > 254 || !EMAIL_RE.test(email)) e.email = "Format email belum benar, contoh nama@contoh.com.";
  }
  if (!v.password) e.password = "Kata sandi wajib diisi.";
  else if (mode === "register" && v.password.length < 8) e.password = "Kata sandi minimal 8 karakter.";
  if (mode === "register") {
    if (!v.konfirmasi) e.konfirmasi = "Ulangi kata sandi wajib diisi.";
    else if (v.konfirmasi !== v.password) e.konfirmasi = "Kata sandi tidak sama.";
  }
  return e;
}

const inputClass = (invalid) =>
  `block w-full rounded-lg border bg-white px-3 py-2.5 text-sm placeholder:text-plum-600/70 ${
    invalid ? "border-red-600" : "border-brand-200"
  }`;

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-plum-600">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
}

export default function LoginModal() {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const [view, setView] = useState(INITIAL_VIEW);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    const open = () => {
      const d = dialogRef.current;
      if (d && !d.open) d.showModal();
    };
    window.addEventListener(LOGIN_EVENT, open);
    return () => window.removeEventListener(LOGIN_EVENT, open);
  }, []);

  // Fokus ke kolom pertama yang bermasalah.
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
    }
  }, [errors]);

  const close = () => dialogRef.current?.close();
  const reset = () => {
    setView(INITIAL_VIEW);
    setValues(EMPTY);
    setErrors({});
    setShowPw(false);
  };

  const roleLabel = ROLES.find((r) => r.id === view.role)?.label ?? "";
  const isRegister = view.mode === "register";
  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  function switchMode(mode) {
    setView((v) => ({ ...v, mode }));
    setErrors({});
  }

  function onSubmit(e) {
    e.preventDefault();
    const errs = validate(view.mode, values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setView((v) => ({ ...v, step: "done" }));
  }

  let title = "Masuk ke carikost";
  if (view.step === "form") title = `${isRegister ? "Daftar" : "Masuk"} sebagai ${roleLabel}`;
  if (view.step === "done") title = isRegister ? "Akun berhasil dibuat" : "Berhasil masuk";

  return (
    <dialog
      ref={dialogRef}
      onClose={reset}
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // klik area gelap
      }}
      aria-labelledby="login-judul"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-0 text-plum-900 backdrop:bg-plum-900/60"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            {view.step === "form" && (
              <button
                type="button"
                onClick={reset}
                aria-label="Kembali pilih peran"
                className="-ml-2 rounded-lg p-2 hover:bg-brand-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
            )}
            <h2 id="login-judul" className="text-xl font-bold">{title}</h2>
          </div>
          <button type="button" onClick={close} aria-label="Tutup" className="-m-2 rounded-lg p-2 hover:bg-brand-50">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {view.step === "role" && (
          <div className="mt-4">
            <p className="text-sm text-plum-600">Saya ingin masuk sebagai</p>
            <ul className="mt-3 space-y-3">
              {ROLES.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setView({ step: "form", role: r.id, mode: "login" })}
                    className="flex w-full items-center gap-4 rounded-xl border-2 border-brand-200 p-4 text-left hover:border-brand-600 hover:bg-brand-50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {r.icon}
                      </svg>
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">{r.label}</span>
                      <span className="block text-sm text-plum-600">{r.desc}</span>
                    </span>
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-plum-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {view.step === "form" && (
          <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
            {isRegister && (
              <Field id="lg-nama" label="Nama lengkap" error={errors.nama}>
                <input
                  id="lg-nama" type="text" autoComplete="name"
                  value={values.nama} onChange={set("nama")}
                  aria-invalid={Boolean(errors.nama)}
                  aria-describedby={errors.nama ? "lg-nama-error" : undefined}
                  className={inputClass(errors.nama)}
                />
              </Field>
            )}

            <Field id="lg-hp" label="Nomor handphone" error={errors.hp} hint="Contoh: 081234567890">
              <input
                id="lg-hp" type="tel" inputMode="tel" autoComplete="tel"
                value={values.hp} onChange={set("hp")}
                aria-invalid={Boolean(errors.hp)}
                aria-describedby={errors.hp ? "lg-hp-error" : "lg-hp-hint"}
                className={inputClass(errors.hp)}
              />
            </Field>

            {isRegister && (
              <Field id="lg-email" label="Email" error={errors.email}>
                <input
                  id="lg-email" type="email" autoComplete="email"
                  value={values.email} onChange={set("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "lg-email-error" : undefined}
                  className={inputClass(errors.email)}
                />
              </Field>
            )}

            <Field
              id="lg-pw"
              label="Kata sandi"
              error={errors.password}
              hint={isRegister ? "Minimal 8 karakter" : undefined}
            >
              <div className="relative">
                <input
                  id="lg-pw" type={showPw ? "text" : "password"}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  value={values.password} onChange={set("password")}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "lg-pw-error" : isRegister ? "lg-pw-hint" : undefined}
                  className={`${inputClass(errors.password)} pr-24`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-pressed={showPw}
                  className="absolute inset-y-0 right-2 my-auto h-8 rounded-md px-2 text-xs font-semibold text-brand-700 hover:bg-brand-50"
                >
                  {showPw ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
            </Field>

            {isRegister && (
              <Field id="lg-pw2" label="Ulangi kata sandi" error={errors.konfirmasi}>
                <input
                  id="lg-pw2" type={showPw ? "text" : "password"} autoComplete="new-password"
                  value={values.konfirmasi} onChange={set("konfirmasi")}
                  aria-invalid={Boolean(errors.konfirmasi)}
                  aria-describedby={errors.konfirmasi ? "lg-pw2-error" : undefined}
                  className={inputClass(errors.konfirmasi)}
                />
              </Field>
            )}

            <button type="submit" className="w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              {isRegister ? "Daftar" : "Masuk"}
            </button>

            <p className="text-center text-sm text-plum-600">
              {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
              <button
                type="button"
                onClick={() => switchMode(isRegister ? "login" : "register")}
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                {isRegister ? "Masuk" : "Daftar sekarang"}
              </button>
            </p>
          </form>
        )}

        {view.step === "done" && (
          <div className="mt-4" role="status">
            <p className="text-sm text-plum-600">
              {isRegister ? "Akun" : "Kamu masuk"} sebagai {roleLabel}.
            </p>
            <p className="mt-2 rounded-lg bg-brand-50 px-3 py-2 text-xs text-plum-600">
              Mode demo: belum terhubung ke autentikasi server.
            </p>
            <button type="button" onClick={close} className="mt-6 w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
              Tutup
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}