import Link from "next/link";
import PageShell from "../../components/PageShell";
import SewaExplorer from "../../components/SewaExplorer";

export const metadata = { title: "Sewa Kost" };

export default function SewaPage() {
  return (
    <PageShell>
      <Link
        href="/"
        aria-label="Kembali ke beranda carikost"
        className="block bg-gradient-to-br from-plum-900 via-plum-900 to-brand-700 px-4 pb-24 pt-16 text-center text-white sm:pt-20"
      >
        <h1 className="mx-auto max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Mudah cari kostnya, mudah bookingnya, mudah bayarnya.
        </h1>
      </Link>
      <SewaExplorer />
    </PageShell>
  );
}