import OpenSurveyButton from "./OpenSurveyButton";

export default function InfoCards() {
  return (
    <section aria-label="Layanan carikost" className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-2">
      <article className="flex flex-col items-start rounded-2xl bg-brand-100 p-6 sm:p-8">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-brand-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M8 3v4M16 3v4M3 10h18" />
          <path d="M9 15l2 2 4-4" />
        </svg>
        <h2 className="mt-4 text-xl font-bold">Survei kost dulu, tenang kemudian</h2>
        <p className="mt-2 text-sm text-plum-600">
          Isi nama dan nomor HP, lalu tim kami menghubungimu untuk mengatur jadwal melihat kamar langsung.
        </p>
        <OpenSurveyButton className="mt-5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
          Ajukan survei
        </OpenSurveyButton>
      </article>

      <article className="flex flex-col items-start rounded-2xl bg-plum-900 p-6 text-brand-50 sm:p-8">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-brand-300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9h14v-9" />
          <path d="M9 14l2 2 4-4" />
        </svg>
        <h2 className="mt-4 text-xl font-bold">Kost yang dikelola carikost</h2>
        <p className="mt-2 text-sm text-brand-100">
          Kamar terawat, harga jelas dari awal, dan ada tim yang siap membantu selama kamu tinggal.
        </p>
        <a href="#kost-baru" className="mt-5 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-semibold text-plum-900 hover:bg-brand-300">
          Lihat kost pilihan
        </a>
      </article>
    </section>
  );
}