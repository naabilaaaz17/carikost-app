const BASE = process.env.BASE_URL ?? "http://localhost:3000";
let failed = 0;

async function check(label, expected, path, options) {
  const res = await fetch(BASE + path, options);
  const body = await res.text();
  const pass = res.status === expected;
  if (!pass) failed++;
  console.log(`${pass ? "OK  " : "FAIL"} ${res.status} (harus ${expected})  ${label}`);
  if (!pass) console.log("     ", body.slice(0, 300));
}

const post = (obj) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(obj),
});

const phone = `08${Math.floor(1e9 + Math.random() * 9e9)}`; // unik tiap run
const phoneIntl = `+62${phone.slice(1)}`; // nomor yang sama, format beda

await check("GET daftar kos", 200, "/api/kos");
await check("GET sort=new limit=6", 200, "/api/kos?sort=new&limit=6");
await check("GET promo", 200, "/api/kos?promo=true");
await check("GET sort tidak valid", 400, "/api/kos?sort=abc");
await check("GET limit tidak valid", 400, "/api/kos?limit=0");
await check("GET simulasi gagal", 500, "/api/kos?fail=1");

await check("POST valid", 201, "/api/survey", post({ name: "Budi Santoso", phone, city: "Surakarta", email: "budi@example.com" }));
await check("POST duplikat (format sama)", 409, "/api/survey", post({ name: "Budi", phone, city: "Surakarta" }));
await check("POST duplikat (format +62)", 409, "/api/survey", post({ name: "Budi", phone: phoneIntl, city: "Surakarta" }));
await check("POST semua field salah", 400, "/api/survey", post({ name: "", phone: "123", city: "", email: "bukan-email" }));
await check("POST HP bukan angka", 400, "/api/survey", post({ name: "Sari", phone: "08abc", city: "Solo" }));
await check("POST JSON rusak", 400, "/api/survey", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{rusak" });
await check("POST tanpa email (opsional)", 201, "/api/survey", post({ name: "Sari Dewi", phone: `08${Math.floor(1e9 + Math.random() * 9e9)}`, city: "Solo" }));

console.log(failed ? `\n${failed} tes gagal` : "\nSemua tes lolos");
process.exit(failed ? 1 : 0);