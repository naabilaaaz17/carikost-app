import Link from "next/link";

const FEATURES = [
  {
    title: "Pencarian kost",
    text: "Cari kost di Jakarta, Bandung, Yogyakarta, Surabaya, Semarang, dan Malang, lalu pilih kota yang kamu mau lewat halaman Sewa Kost.",
  },
  {
    title: "Filter pencarian",
    text: "Saring hasil berdasarkan tipe Kost Putra, Kost Putri, atau Kost Campur, periode sewa bulanan atau tahunan, dan rentang harga sesuai budgetmu.",
  },
  {
    title: "Peta lokasi",
    text: "Lihat sebaran kost di peta lengkap dengan harga di tiap pin, supaya mudah memilih kost yang dekat dengan kampus atau kantormu.",
  },
  {
    title: "Detail kost lengkap",
    text: "Cek fasilitas kamar, kamar mandi, fasilitas umum, parkir, peraturan, deposit, dan biaya tambahan sebelum memutuskan.",
  },
  {
    title: "Rating penghuni",
    text: "Lihat rating tiap kost dan jumlah kamar yang masih kosong, jadi kamu tahu mana yang paling diminati dan masih tersedia.",
  },
  {
    title: "Promo ngebut",
    text: "Dapatkan harga lebih hemat dari kost yang sedang berdiskon. Promonya berganti setiap hari, jadi sering-sering cek.",
  },
  {
    title: "Kost baru",
    text: "Temukan kost yang baru bergabung dan masih punya banyak kamar kosong.",
  },
  {
    title: "Ajukan survei",
    text: "Lihat langsung kondisi kost sebelum membayar. Cukup klik Ajukan survei, isi formulir, dan pengelola akan menghubungimu.",
  },
];

export default function AboutSection() {
  return (
    <section aria-labelledby="tentang-carikost" className="border-t border-brand-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 id="tentang-carikost" className="text-xl font-bold tracking-tight sm:text-2xl">
          carikost - Aplikasi Cari Kost yang Mudah dan Nyaman
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-plum-600">
          carikost membantu kamu menemukan kost yang cocok tanpa harus keliling dari satu tempat ke tempat lain. Mulai dari
          melihat harga, membandingkan fasilitas, sampai menjadwalkan survei, semuanya ada di satu tempat. Kami berusaha
          menyajikan daftar kost dengan informasi yang jelas: harga setelah diskon, fasilitas, rating, dan sisa kamar, agar
          proses pencarianmu lebih cepat dan tenang. Kamu juga bisa memilih periode sewa yang paling pas, bulanan atau
          tahunan, sesuai ketentuan tiap kost. Pemilik kost pun bisa{" "}
          <Link href="/promosikan-iklan" className="font-semibold text-brand-700 underline underline-offset-2">
            memasang iklan
          </Link>{" "}
          untuk menjangkau lebih banyak calon penghuni.
        </p>

        <h3 className="mt-8 text-lg font-bold">Fitur yang dapat dimanfaatkan di carikost</h3>
        <ol className="mt-4 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <li key={f.title} className="text-sm leading-relaxed">
              <p className="font-semibold">
                {i + 1}. {f.title}
              </p>
              <p className="mt-1 text-plum-600">{f.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-plum-600">
          Siap mulai?{" "}
          <Link href="/sewa" className="font-semibold text-brand-700 underline underline-offset-2">
            Cari kost sekarang
          </Link>
          .
        </p>
      </div>
    </section>
  );
}