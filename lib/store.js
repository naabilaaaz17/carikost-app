import { randomUUID } from "node:crypto";

// In-memory. globalThis dipakai supaya data tidak hilang saat hot reload di dev.
// Catatan: di Vercel (serverless) data ini hanya hidup selama instance berjalan.
const store = (globalThis.__carikostSurveys ??= { byPhone: new Map() });

export function addSurvey(data) {
  const existing = store.byPhone.get(data.hp);
  if (existing) return { duplicate: true, record: existing };

  const record = { id: randomUUID(), ...data, createdAt: new Date().toISOString() };
  store.byPhone.set(data.hp, record);
  return { duplicate: false, record };
}