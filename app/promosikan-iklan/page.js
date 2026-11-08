import Link from "next/link";
import PageShell from "../../components/PageShell";
import PageHeader from "../../components/PageHeader";
import PromoteForm from "../../components/PromoteForm";

export const metadata = { title: "Promosikan Iklan Anda" };

const BENEFITS = [
  {
    title: "Mudah ditemukan",
    text: "Kostmu tampil di pencarian berdasarkan kota, tipe, harga, dan periode sewa, lengkap dengan lokasi di peta.",
  },
  {
    title: "Calon penghuni langsung survei",
    text: "Pencari kost bisa mengajukan survei langsung dari kartu iklan dan halaman detail kostmu.",
  },
  {
    title: "Atur harga sesuai kebutuhan",
    text: "Tentukan harga, diskon, dan periode sewa bulanan atau tahunan untuk tiap kost.",
  },
  {
    title: "Dibantu tim kami",
    text: "Tim carikost membantu verifikasi data dan memastikan iklanmu tampil rapi dan lengkap.",
  },
];

const STEPS = [
  { title: "Isi formulir", text: "Lengkapi data pemilik dan kost di bawah. Cukup beberapa menit." },
  { title: "Verifikasi data", text: "Tim kami menghubungimu lewat WhatsApp untuk mengonfirmasi data dan meminta foto kost." },
  { title: "Iklan tayang", text: "Setelah data lengkap, kostmu muncul di hasil pencarian dan siap menerima pengajuan survei." },
];

export default function PromosikanIklanPage() {
  return (
    <PageShell>
      <PageHeader
        title="Promosikan iklan kost Anda"
        subtitle="Jangkau lebih banyak calon penghuni dan isi kamar kosong lebih cepat."
      />

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center">
          <a
            href="#daftar"
            className="inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Daftarkan kost sekarang
          </a>
        </div>

        <section className="mt-12" aria-labelledby="manfaat">
          <h2 id="manfaat" className="text-2xl font-bold tracking-tight">
            Kenapa pasang iklan di carikost?
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-brand-100 bg-white p-5">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-plum-600">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="langkah">
          <h2 id="langkah" className="text-2xl font-bold tracking-tight">
            Cara memasang iklan
          </h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-brand-50 p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-plum-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="daftar" className="mx-auto mt-12 max-w-2xl scroll-mt-24" aria-labelledby="form-judul">
          <h2 id="form-judul" className="text-2xl font-bold tracking-tight">
            Daftarkan kost kamu
          </h2>
          <p className="mt-1 mb-5 text-sm text-plum-600">Semua kolom wajib diisi kecuali yang ditandai opsional.</p>
          <PromoteForm />
        </section>

        <p className="mt-10 text-center text-sm text-plum-600">
          Ada pertanyaan? Lihat{" "}
          <Link href="/bantuan#pemilik-kost" className="font-semibold text-brand-700 underline underline-offset-2">
            Pusat Bantuan untuk pemilik kost
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}