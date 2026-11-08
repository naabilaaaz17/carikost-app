// Mengubah +62 / 62 / spasi / tanda hubung menjadi format lokal 08xxxxxxxxxx.
export function normalizePhone(raw) {
  const s = String(raw ?? "").replace(/[\s().-]/g, "");
  if (s.startsWith("+62")) return "0" + s.slice(3);
  if (s.startsWith("62")) return "0" + s.slice(2);
  return s;
}

const PHONE_RE = /^08[1-9][0-9]{7,10}$/; // 10-13 digit, diawali 08
export function isValidPhone(raw) {
  return PHONE_RE.test(normalizePhone(raw));
}
const NAME_RE = /^\p{L}[\p{L}\s.'-]*$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSurvey(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, message: "Body harus berupa objek JSON.", errors: {} };
  }

  const errors = {};
  const clean = (v) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ") : null);

  const nama = clean(input.nama);
  if (nama === null || nama === "") errors.nama = "Nama wajib diisi.";
  else if (nama.length < 2 || nama.length > 80) errors.nama = "Nama harus 2 sampai 80 karakter.";
  else if (!NAME_RE.test(nama)) errors.nama = "Nama hanya boleh berisi huruf, spasi, titik, apostrof, dan tanda hubung.";

  let hp = null;
  if (typeof input.hp !== "string" || input.hp.trim() === "") errors.hp = "Nomor HP wajib diisi.";
  else {
    hp = normalizePhone(input.hp);
    if (!PHONE_RE.test(hp)) errors.hp = "Gunakan nomor HP Indonesia yang valid, contoh 081234567890 atau +6281234567890.";
  }

  const kota = clean(input.kota);
  if (kota === null || kota === "") errors.kota = "Kota wajib dipilih.";
  else if (kota.length < 2 || kota.length > 60 || !NAME_RE.test(kota)) errors.kota = "Nama kota tidak valid.";

  let email = "";
  if (input.email !== undefined && input.email !== null && input.email !== "") {
    const e = clean(input.email);
    if (e === null) errors.email = "Email harus berupa teks.";
    else if (e !== "" && (e.length > 254 || !EMAIL_RE.test(e))) errors.email = "Format email belum benar, contoh nama@contoh.com.";
    else email = e.toLowerCase();
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Data belum valid. Periksa kolom yang ditandai.", errors };
  }
  return { ok: true, data: { nama, hp, kota, email: email || null } };
}