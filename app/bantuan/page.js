import Link from "next/link";
import PageShell from "../../components/PageShell";
import PageHeader from "../../components/PageHeader";

export const metadata = { title: "Pusat Bantuan" };

const FAQ = [
  {
    id: "mencari-kost",
    title: "Mencari kost",
    items: [
      {
        q: "Bagaimana cara mencari kost?",
        a: "Buka halaman Sewa Kost, lalu pilih kota, tipe (Putra, Putri, atau Campur), periode sewa, dan rentang harga. Klik tombol Set untuk menampilkan hasilnya.",
      },
      {
        q: "Apa bedanya sewa bulanan dan tahunan?",
        a: "Tiap kost menentukan sendiri periode sewa yang diterima. Ada yang hanya bulanan, ada yang menerima bulanan dan tahunan. Pilih periode di filter, dan hanya kost yang mendukung periode itu yang ditampilkan.",
      },
      {
        q: "Apakah harga yang tampil sudah termasuk diskon?",
        a: "Ya. Harga besar adalah harga setelah diskon, dan harga yang dicoret adalah harga normal. Biaya lain seperti listrik atau tamu menginap bisa berbeda tiap kost, jadi cek bagian peraturan dan biaya tambahan di halaman detail.",
      },
    ],
  },
  {
    id: "survei",
    title: "Survei kost",
    items: [
      {
        q: "Bagaimana cara mengajukan survei?",
        a: "Klik tombol Ajukan survei di kartu kost atau di halaman detail, isi formulirnya, lalu kirim. Pengelola kost akan menghubungimu untuk mengatur jadwal.",
      },
      {
        q: "Apakah survei dikenakan biaya?",
        a: "Pengajuan survei di carikost tidak dipungut biaya. Pastikan kamu hanya membayar ke rekening resmi yang disepakati dengan pengelola kost.",
      },
      {
        q: "Bisakah saya membatalkan atau mengubah jadwal survei?",
        a: "Bisa. Hubungi pengelola kost atau tim carikost sesegera mungkin sebelum jadwal, supaya slot kunjungan bisa dipakai orang lain.",
      },
    ],
  },
  {
    id: "akun",
    title: "Akun",
    items: [
      {
        q: "Bagaimana cara masuk ke akun?",
        a: "Klik tombol Masuk di pojok kanan atas, lalu ikuti langkah pada jendela yang muncul.",
      },
      {
        q: "Saya lupa kata sandi. Apa yang harus dilakukan?",
        a: "Hubungi tim bantuan lewat kontak di bawah halaman ini dan sertakan email yang kamu pakai untuk mendaftar.",
      },
    ],
  },
  {
    id: "keamanan",
    title: "Keamanan & pembayaran",
    items: [
      {
        q: "Bagaimana agar terhindar dari penipuan?",
        a: "Lakukan survei langsung sebelum membayar, jangan transfer ke rekening pribadi yang tidak jelas, dan jangan bagikan kode verifikasi atau kata sandi kepada siapa pun.",
      },
      {
        q: "Informasi di iklan tidak sesuai kenyataan. Bagaimana melaporkannya?",
        a: "Kirim laporan lewat kontak di bawah, sertakan nama kost, foto, dan penjelasan singkat. Kami akan menindaklanjutinya.",
      },
    ],
  },
  {
    id: "pemilik-kost",
    title: "Pemilik kost",
    items: [
      {
        q: "Bagaimana cara memasang iklan kost saya?",
        a: "Hubungi tim carikost lewat kontak di bawah. Kami akan memandu proses pendaftaran dan verifikasi data kost.",
      },
    ],
  },
];

export default function BantuanPage() {
  return (
    <PageShell>
      <PageHeader title="Pusat Bantuan" subtitle="Temukan jawaban untuk pertanyaan yang sering diajukan seputar carikost." />

      <div className="mx-auto max-w-3xl px-4 py-10">
        <nav aria-label="Kategori bantuan" className="flex flex-wrap gap-2">
          {FAQ.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-brand-50"
            >
              {c.title}
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-10">
          {FAQ.map((c) => (
            <section key={c.id} id={c.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold">{c.title}</h2>
              <div className="mt-3 divide-y divide-brand-100 rounded-2xl border border-brand-100 bg-white">
                {c.items.map((item) => (
                  <details key={item.q} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-plum-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl bg-brand-50 p-6 text-center">
          <h2 className="text-lg font-bold">Masih butuh bantuan?</h2>
          <p className="mt-1 text-sm text-plum-600">Tim kami siap membantu setiap hari, pukul 08.00-20.00 WIB.</p>
          <a
            href="mailto:bantuan@carikost.id"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            bantuan@carikost.id
          </a>
          <p className="mt-4 text-xs text-plum-600">
            Baca juga{" "}
            <Link href="/syarat-ketentuan" className="font-semibold text-brand-700 underline underline-offset-2">
              Syarat dan Ketentuan
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}