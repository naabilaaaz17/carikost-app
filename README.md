# carikost

Clone sederhana **[Mamikos](https://mamikos.com)** (situs pencari kost) untuk Frontend Engineer Technical Test: AI-Assisted Build.

- **Live:** https://carikost-app.vercel.app
- **Repo:** https://github.com/naabilaaaz17/carikost-app

## Cakupan

Halaman yang dibuat:

| Halaman | Keterangan |
|---|---|
| `/` | Beranda (halaman utama yang di-clone): pencarian, promo, rekomendasi kost |
| `/kos` | Daftar kost dengan filter dan peta |
| `/kos/[id]` | Detail kost |
| `/sewa`, `/bantuan`, `/syarat-ketentuan`, `/promosikan-iklan` | Halaman pendukung |

Tes hanya meminta beranda ditambah satu halaman opsional. Halaman lain saya tambahkan karena tampilannya memakai komponen yang sama, jadi biayanya kecil.

Tombol login memakai "Mode demo" karena auth di luar lingkup tes. Form "Promosikan iklan" hanya tampilan (tidak mengirim data ke server), supaya endpoint tetap dua sesuai batas tes.

## Stack

- Next.js 16 (App Router, Turbopack), React 19
- Tailwind CSS v4
- Leaflet (peta), dipakai langsung tanpa wrapper
- API: Route Handlers Next.js di folder yang sama dengan frontend, sehingga satu deploy di Vercel menjalankan keduanya

## Menjalankan secara lokal

```bash
npm install
npm run dev          # http://localhost:3000
```

Tes API otomatis (server harus aktif):

```bash
node scripts/test-api.mjs
# tes situs live:
BASE_URL=https://<url-live> node scripts/test-api.mjs
```

Di PowerShell: `$env:BASE_URL="https://<url-live>"; node scripts/test-api.mjs`

## API

Hanya dua endpoint. Penyimpanan POST bersifat sementara (in-memory): **data hilang saat server restart atau cold start**. Ini sesuai ketentuan tes.

### `GET /api/kos`

Dipakai section **Rekomendasi** di beranda.

Query opsional:

| Parameter | Nilai | Keterangan |
|---|---|---|
| `sort` | `new`, `rating`, `price-asc`, `price-desc` | Nilai lain dibalas 400 |
| `limit` | bilangan bulat 1 sampai 50 | Nilai lain dibalas 400 |
| `promo` | `true` | Hanya kost yang sedang diskon |
| `fail` | `1` | Simulasi error 500, untuk mendemokan error state di frontend |

Contoh:

```http
GET /api/kos?sort=rating&limit=2
```

```json
200 OK
{
  "data": [
    {
      "id": 1,
      "name": "Kost Melati Asri",
      "district": "Tebet",
      "city": "Jakarta",
      "type": "Putri",
      "price": 1850000,
      "discount": 0,
      "rating": 4.8,
      "roomsLeft": 2,
      "facilities": ["AC", "Kamar mandi dalam", "WiFi"],
      "imageUrl": "/kamar1.jpg",
      "isNew": false,
      "lat": -6.226,
      "lng": 106.853,
      "periods": ["bulanan", "tahunan"]
    }
  ]
}
```

Parameter tidak valid:

```http
GET /api/kos?sort=abc
```

```json
400 Bad Request
{ "error": "Parameter sort tidak valid. Pilihan: new, rating, price-asc, price-desc." }
```

### `POST /api/survey`

Dipakai modal **Ajukan survei** (tombol di halaman detail kost).

Body:

| Field | Aturan |
|---|---|
| `name` | wajib, minimal 2 karakter |
| `phone` | wajib, nomor HP Indonesia (`08...`, `628...`, atau `+628...`) |
| `city` | wajib |
| `email` | opsional, harus berformat email jika diisi |

Server menormalisasi nomor HP, jadi `0812...`, `62812...`, dan `+62812...` dianggap nomor yang sama.

Sukses:

```http
POST /api/survey
Content-Type: application/json

{ "name": "Budi Santoso", "phone": "081234567890", "city": "Surakarta", "email": "budi@example.com" }
```

```json
201 Created
{ "ok": true, "id": "b1f7c3a2-0d34-4c53-9a0e-6a7a1f2d9e11" }
```

Validasi gagal:

```json
400 Bad Request
{
  "error": "Data belum valid. Periksa kolom yang ditandai.",
  "fields": {
    "name": "Nama minimal 2 karakter.",
    "phone": "Nomor WhatsApp tidak valid. Contoh: 081234567890."
  }
}
```

Nomor sudah pernah mengajukan:

```json
409 Conflict
{ "error": "Nomor ini sudah pernah mengajukan survei.", "fields": { "phone": "Nomor sudah terdaftar." } }
```

JSON rusak juga dibalas `400`.

## State di frontend

**GET (Rekomendasi):** skeleton saat loading, kotak error dengan tombol "Coba lagi" saat gagal (pesan dibedakan untuk server error dan jaringan terputus), dan daftar kost saat berhasil.

**POST (Ajukan survei):** tombol "Mengirim..." saat proses, layar sukses (201), pesan per kolom dan fokus ke kolom bermasalah (400), pesan nomor sudah terdaftar (409), dan banner network error dengan isian form yang tetap tersimpan.

Cara mengamati tiap state: loading dengan Network → Slow 3G; error GET dengan `?fail=1` atau mode Offline; error POST dengan mematikan server.

## Pendekatan dan alat

- **Alat AI:** Claude [[tambahkan alat lain yang dipakai, misalnya Cursor / Claude Code]].
- **Urutan kerja:** (1) tampilan beranda dan halaman pendukung dengan data sample, (2) kontrak API (bentuk respons, status code, format error) sebelum menulis kode, (3) dua route handler, (4) hubungkan frontend lengkap dengan semua state, (5) skrip tes API.
- **Verifikasi:** `scripts/test-api.mjs` menjalankan 13 pemeriksaan (200, 400, 409, 500, 201), ditambah pengecekan manual di Network tab dan terminal server.

## Keputusan penting

- **Satu proyek untuk frontend dan API.** Route Handlers Next.js membuat live site memanggil API yang ikut di-deploy, tanpa layanan terpisah.
- **Validasi hanya di server dan `noValidate` di form survei.** Agar respons 400 dan pesan per kolom benar-benar terlihat, bukan tertutup validasi bawaan browser.
- **Pemetaan nama field.** Form memakai nama Indonesia (`nama`, `hp`, `kota`) sedangkan API memakai `name`, `phone`, `city`. Pemetaan dilakukan di satu tempat di `SurveyModal`.
- **Tepat dua endpoint.** Form "Promosikan iklan" sempat punya endpoint sendiri, lalu dihapus karena tes membatasi dua endpoint.
- **Leaflet langsung, tanpa `react-leaflet`.** Wrapper-nya memunculkan error "Map container is being reused" di React 19 dan Next 16. Membuat peta di `useEffect` dengan cleanup `map.remove()` menyelesaikannya.
- **`fail=1` di `GET /api/kos`.** Pengait khusus untuk mendemokan error state tanpa harus memutus jaringan.

## Pelajaran dari proses AI

Beberapa hal tidak langsung benar dan harus saya koreksi:

- Endpoint GET dan state loading/error sempat terhapus saat penyederhanaan, lalu saya kembalikan setelah membandingkan dengan syarat tes.
- Keluaran AI untuk form sempat berisi hook di luar komponen. Itu ketahuan dari error runtime, lalu diperbaiki.
- Skrip tes dan route sempat tidak sinkron (nama endpoint dan field berbeda). Pembacaan output tes yang gagal menunjukkan penyebabnya.
- Error hidrasi di form ternyata cache build yang basi, bukan bug kode.

## Struktur

```
app/
  api/
    kos/route.js        GET  /api/kos
    survey/route.js     POST /api/survey
  kos/                  halaman daftar dan detail
components/             komponen UI (Recommendations, SurveyModal, KosMap, ...)
data/                   data sample kost
lib/                    format harga, event antar komponen
scripts/test-api.mjs    tes API otomatis
```