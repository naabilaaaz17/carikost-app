// Terima 08xx, +628xx, 628xx (boleh pakai spasi, strip, titik, kurung).
// Hasil: "628xxxxxxxxx" atau null kalau tidak valid. Hanya nomor seluler.
export function normalizePhone(input) {
  if (typeof input !== "string") return null;

  let digits = input.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (!/^\d+$/.test(digits)) return null;

  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  else if (!digits.startsWith("62")) return null;

  // 628 + 8..11 digit = setara 08xx dengan total 10-13 digit
  return /^628\d{8,11}$/.test(digits) ? digits : null;
}