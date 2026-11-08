import { NextResponse } from "next/server";

// POST /api/survey  { name, phone, city, email? }
// Penyimpanan sementara (in-memory). Data reset saat server restart / cold start.
const requests = new Map(); // key: nomor HP yang sudah dinormalisasi

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^08[0-9]{8,12}$/;

// 08123..., 628123..., +628123... dianggap nomor yang sama.
function normalizePhone(raw) {
  const p = raw.replace(/[\s-]/g, "");
  if (p.startsWith("+62")) return "0" + p.slice(3);
  if (p.startsWith("62")) return "0" + p.slice(2);
  return p;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body request harus berupa JSON yang valid." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Body request harus berupa objek JSON." }, { status: 400 });
  }

  const str = (v) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const city = str(body.city);
  const email = str(body.email);
  const phone = normalizePhone(str(body.phone));

  const fields = {};
  if (name.length < 2) fields.name = "Nama minimal 2 karakter.";
  if (!PHONE_RE.test(phone)) fields.phone = "Nomor WhatsApp tidak valid. Contoh: 081234567890.";
  if (!city) fields.city = "Kota wajib diisi.";
  if (email && !EMAIL_RE.test(email)) fields.email = "Format email tidak valid.";

  if (Object.keys(fields).length > 0) {
    return NextResponse.json(
      { error: "Data belum valid. Periksa kolom yang ditandai.", fields },
      { status: 400 }
    );
  }

  if (requests.has(phone)) {
    return NextResponse.json(
      { error: "Nomor ini sudah pernah mengajukan survei.", fields: { phone: "Nomor sudah terdaftar." } },
      { status: 409 }
    );
  }

  const record = { id: crypto.randomUUID(), name, phone, city, email, createdAt: new Date().toISOString() };
  requests.set(phone, record);

  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}