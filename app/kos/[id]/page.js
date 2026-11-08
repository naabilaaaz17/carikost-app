import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../../components/PageShell";
import KosActions from "../../../components/KosActions";
import KosCard from "../../../components/KosCard";
import KosRoomIllustration from "../../../components/KosRoomIllustration";
import OpenSurveyButton from "../../../components/OpenSurveyButton";
import { kosList } from "../../../data/kos";
import { getKosDetail } from "../../../data/kos-detail";
import { formatRating, formatRupiah, getFinalPrice } from "../../../lib/format";

export function generateStaticParams() {
  return kosList.map((k) => ({ id: String(k.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const kos = getKosDetail(Number(id));
  return { title: kos ? `${kos.name}, ${kos.district}, ${kos.city}` : "Kost tidak ditemukan" };
}

function Section({ title, children }) {
  return (
    <section className="border-t border-brand-100 py-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Tags({ items }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i} className="rounded-lg border border-brand-100 bg-white px-3 py-1.5 text-sm">
          {i}
        </li>
      ))}
    </ul>
  );
}

export default async function KosDetailPage({ params }) {
  const { id } = await params;
  const kos = getKosDetail(Number(id));
  if (!kos) notFound();

  const others = kosList.filter((k) => k.city === kos.city && k.id !== kos.id).slice(0, 3);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="text-sm text-plum-600" aria-label="Breadcrumb">
          <Link href="/" className="hover:underline">Beranda</Link> /{" "}
          <Link href="/kos" className="hover:underline">Cari kost</Link> / <span>{kos.name}</span>
        </nav>

        {/* Foto */}
        <div className="relative mt-4 h-64 overflow-hidden rounded-2xl bg-brand-100 sm:h-96">
          {kos.imageUrl ? (
            <Image src={kos.imageUrl} alt={`Foto ${kos.name}`} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          ) : (
            <KosRoomIllustration id={kos.id} ac={kos.facilities.includes("AC")} className="absolute inset-0 h-full w-full" />
          )}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Kolom kiri */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {kos.name} {kos.district} {kos.city}
                </h1>
                <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-plum-600">
                  <span className="rounded border border-plum-600/30 px-2 py-0.5 font-semibold text-plum-900">Kos {kos.type}</span>
                  <span>{kos.district}</span>
                  <span>·</span>
                  <span>★ {formatRating(kos.rating)}</span>
                  {kos.roomsLeft > 0 ? (
                    <span className="font-semibold text-red-600">Tersisa {kos.roomsLeft} kamar</span>
                  ) : (
                    <span className="font-semibold">Kamar penuh</span>
                  )}
                </p>
              </div>
              <KosActions title={kos.name} />
            </div>

            <p className="mt-4 text-sm">
              Kos dikelola oleh <span className="font-semibold">{kos.owner}</span>
            </p>

            <Section title="Spesifikasi tipe kamar">
              <ul className="space-y-1 text-sm">
                <li>{kos.roomSize}</li>
                <li>{kos.electricityIncluded ? "Termasuk listrik" : "Tidak termasuk listrik"}</li>
              </ul>
            </Section>

            <Section title="Fasilitas kamar">
              <Tags items={kos.roomFacilities} />
            </Section>

            <Section title="Fasilitas kamar mandi">
              <Tags items={kos.bathroomFacilities} />
            </Section>

            {kos.commonFacilities.length > 0 && (
              <Section title="Fasilitas umum">
                <Tags items={kos.commonFacilities} />
              </Section>
            )}

            {kos.parking.length > 0 && (
              <Section title="Fasilitas parkir">
                <Tags items={kos.parking} />
              </Section>
            )}

            <Section title="Peraturan di kos ini">
              <ul className="list-inside list-disc space-y-1 text-sm">
                {kos.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Section>

            <Section title="Deposit">
              <p className="text-sm text-plum-600">
                Dikembalikan di akhir periode sewa jika tidak ditemukan kerusakan pada kamar.
              </p>
              <p className="mt-1 font-bold">{formatRupiah(kos.deposit)}</p>
            </Section>

            <Section title="Cerita pemilik tentang kos ini">
              <p className="whitespace-pre-line text-sm leading-relaxed">{kos.story}</p>
              {kos.extraCosts.length > 0 && (
                <>
                  <p className="mt-4 text-sm font-semibold">Biaya tambahan:</p>
                  <ul className="mt-1 list-inside list-disc text-sm">
                    {kos.extraCosts.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </>
              )}
            </Section>
          </div>

          {/* Kolom kanan: kartu harga */}
          <aside className="lg:sticky lg:top-4 lg:self-start">
            <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
              {kos.discount > 0 && (
                <p className="text-sm">
                  <span className="font-semibold text-red-600">Diskon {kos.discount}%</span>{" "}
                  <span className="text-plum-600 line-through">{formatRupiah(kos.price)}</span>
                </p>
              )}
              <p>
                <span className="text-2xl font-bold">{formatRupiah(getFinalPrice(kos))}</span>
                <span className="text-sm text-plum-600"> /bulan</span>
              </p>
              <OpenSurveyButton className="mt-4 w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                Ajukan survei
              </OpenSurveyButton>
            </div>
          </aside>
        </div>

        {others.length > 0 && (
          <section className="mt-10 border-t border-brand-100 pt-8">
            <h2 className="text-lg font-bold">Kost lainnya di {kos.city}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((k) => (
                <KosCard key={k.id} kos={k} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}