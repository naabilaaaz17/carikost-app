import Link from "next/link";
import Logo from "./Logo";
import OpenSurveyButton from "./OpenSurveyButton";

const badgeClass =
  "flex h-11 items-center gap-2.5 rounded-lg border border-[#a6a6a6] bg-black px-3 text-white hover:bg-[#1c1c1c]";

function GooglePlayBadge({ href }) {
  return (
    <a href={href} aria-label="Dapatkan di Google Play" className={badgeClass}>
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
        <path fill="#00a0ff" d="M4 2L4 22L12.5 12z" />
        <path fill="#00e676" d="M4 2L16.75 9.5L12.5 12z" />
        <path fill="#ff3d44" d="M4 22L16.75 14.5L12.5 12z" />
        <path fill="#ffc400" d="M12.5 12L16.75 9.5L21 12L16.75 14.5z" />
      </svg>
      <span className="leading-none">
        <span className="block text-[9px] font-medium uppercase tracking-wide">Dapatkan di</span>
        <span className="mt-1 block text-[17px] font-medium">Google Play</span>
      </span>
    </a>
  );
}

function AppStoreBadge({ href }) {
  return (
    <a href={href} aria-label="Download di App Store" className={badgeClass}>
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
      <span className="leading-none">
        <span className="block text-[10px]">Download di</span>
        <span className="mt-0.5 block text-[17px] font-medium">App Store</span>
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="bantuan" className="scroll-mt-20 bg-plum-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-sm">Cari kost mudah, cepat, dan nyaman. Dari lihat harga sampai jadwal survei, semua di satu tempat.</p>

          <div id="download" className="mt-5 flex flex-wrap gap-3">
            <GooglePlayBadge href="#download" />
            <AppStoreBadge href="#download" />
          </div>
        </div>

        <nav aria-label="Jelajahi">
          <h2 className="font-semibold text-white">Jelajahi</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/sewa" className="hover:underline">Sewa kost</Link></li>
            <li><Link href="/#rekomendasi" className="hover:underline">Rekomendasi kost</Link></li>
            <li><Link href="/#promo" className="hover:underline">Promo ngebut</Link></li>
            <li><Link href="/#kost-baru" className="hover:underline">Kost baru</Link></li>
          </ul>
        </nav>

        <nav aria-label="Bantuan">
          <h2 className="font-semibold text-white">Bantuan</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><OpenSurveyButton className="hover:underline">Ajukan survei kost</OpenSurveyButton></li>
            <li><Link href="/promosikan-iklan" className="hover:underline">Pasang iklan kost</Link></li>
            <li><Link href="/bantuan" className="hover:underline">Pusat bantuan</Link></li>
            <li><Link href="/syarat-ketentuan" className="hover:underline">Syarat dan ketentuan</Link></li>
            <li><Link href="/syarat-ketentuan#privasi" className="hover:underline">Kebijakan privasi</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-semibold text-white">Hubungi kami</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>halo@carikost.example</li>
            <li>Senin sampai Sabtu, 09.00 sampai 18.00 WIB</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        © 2026 carikost. Semua hak dilindungi.
      </div>
    </footer>
  );
}