import Link from "next/link";
import PageShell from "../../components/PageShell";
import PageHeader from "../../components/PageHeader";

export const metadata = { title: "Syarat dan Ketentuan" };

const SECTIONS = [
  {
    id: "pengantar",
    title: "1. Pengantar",
    body: [
      "Dengan mengakses atau memakai carikost, kamu menyetujui Syarat dan Ketentuan ini. Jika tidak setuju, mohon hentikan penggunaan layanan.",
      "carikost adalah platform yang mempertemukan pencari kost dengan pemilik atau pengelola kost. carikost bukan pemilik kost yang ditampilkan, kecuali dinyatakan lain.",
    ],
  },
  {
    id: "penggunaan",
    title: "2. Penggunaan layanan",
    body: [
      "Kamu setuju memakai layanan ini hanya untuk tujuan yang sah dan sesuai hukum yang berlaku di Indonesia.",
      "Kamu dilarang menyalahgunakan layanan, termasuk memberikan data palsu, mengganggu sistem, mengambil data secara otomatis tanpa izin, atau menyebarkan konten yang melanggar hukum.",
    ],
  },
  {
    id: "akun",
    title: "3. Akun",
    body: [
      "Kamu bertanggung jawab menjaga kerahasiaan akun dan seluruh aktivitas yang terjadi di dalamnya.",
      "Informasi yang kamu berikan saat mendaftar atau mengajukan survei harus benar dan terbaru.",
    ],
  },
  {
    id: "informasi-kost",
    title: "4. Informasi kost dan harga",
    body: [
      "Informasi kost, termasuk harga, diskon, fasilitas, foto, dan ketersediaan kamar, disediakan oleh pemilik atau pengelola kost. Kami berupaya menjaga keakuratannya, tetapi data dapat berubah sewaktu-waktu.",
      "Harga sewa tahunan dan biaya tambahan (misalnya listrik atau tamu menginap) mengikuti ketentuan masing-masing kost. Pastikan semuanya dikonfirmasi sebelum membayar.",
    ],
  },
  {
    id: "survei",
    title: "5. Pengajuan survei dan sewa",
    body: [
      "Pengajuan survei hanyalah permintaan untuk berkunjung dan tidak menjamin ketersediaan kamar.",
      "Perjanjian sewa terjadi antara kamu dan pemilik atau pengelola kost. Ketentuan pembayaran, deposit, dan pembatalan mengikuti kesepakatan tersebut.",
    ],
  },
  {
    id: "pembayaran",
    title: "6. Pembayaran dan pengembalian dana",
    body: [
      "Lakukan pembayaran hanya melalui kanal yang disepakati dan diverifikasi. carikost tidak bertanggung jawab atas pembayaran yang dikirim ke pihak lain di luar kanal resmi.",
      "Pengembalian deposit atau biaya lain mengikuti ketentuan pemilik atau pengelola kost serta kebijakan yang berlaku.",
    ],
  },
  {
    id: "konten",
    title: "7. Konten pemilik kost",
    body: [
      "Pemilik atau pengelola kost menjamin bahwa konten yang diunggah (teks, foto, dan data lain) benar dan dimiliki atau berhak dipakainya.",
      "carikost berhak menurunkan atau mengubah konten yang menyesatkan, melanggar hukum, atau melanggar ketentuan ini.",
    ],
  },
  {
    id: "tanggung-jawab",
    title: "8. Batasan tanggung jawab",
    body: [
      "Sejauh diizinkan hukum, carikost tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan layanan, perselisihan antara penyewa dan pemilik kost, atau ketidakakuratan informasi dari pihak ketiga.",
    ],
  },
  {
    id: "privasi",
    title: "9. Data pribadi",
    body: [
      "Kami memakai data pribadi yang kamu berikan untuk menjalankan layanan, seperti memproses pengajuan survei dan menghubungimu. Data dapat dibagikan kepada pemilik atau pengelola kost yang relevan dengan pengajuanmu.",
      "Kami menjaga data dengan upaya yang wajar dan tidak menjualnya kepada pihak lain.",
    ],
  },
  {
    id: "perubahan",
    title: "10. Perubahan ketentuan",
    body: [
      "Kami dapat memperbarui Syarat dan Ketentuan ini sewaktu-waktu. Versi terbaru berlaku sejak dipublikasikan di halaman ini. Dengan tetap memakai layanan, kamu dianggap menyetujui perubahan tersebut.",
    ],
  },
  {
    id: "kontak",
    title: "11. Kontak",
    body: ["Pertanyaan tentang ketentuan ini dapat dikirim ke bantuan@carikost.id."],
  },
];

export default function SyaratKetentuanPage() {
  return (
    <PageShell>
      <PageHeader title="Syarat dan Ketentuan" subtitle="Terakhir diperbarui: 1 November 2026" />

      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Daftar isi" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-bold">Daftar isi</p>
          <ul className="mt-3 space-y-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-plum-600 hover:text-brand-700 hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold">{s.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-plum-900">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <p className="border-t border-brand-100 pt-6 text-sm text-plum-600">
            Ada pertanyaan? Kunjungi{" "}
            <Link href="/bantuan" className="font-semibold text-brand-700 underline underline-offset-2">
              Pusat Bantuan
            </Link>
            .
          </p>
        </article>
      </div>
    </PageShell>
  );
}