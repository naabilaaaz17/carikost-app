import Image from "next/image";
import Link from "next/link";
import OpenSurveyButton from "./OpenSurveyButton";
import KosRoomIllustration from "./KosRoomIllustration";
import { formatRating, formatRupiah, getFinalPrice } from "../lib/format";

export default function KosListItem({ kos }) {
  const { id, name, type, city, district, price, discount, facilities, rating, roomsLeft, isNew, imageUrl } = kos;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white sm:flex-row">
      <Link
        href={`/kos/${id}`}
        aria-label={`Lihat detail ${name}`}
        className="relative block h-48 shrink-0 bg-brand-100 sm:h-auto sm:w-72"
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={`Foto ${name}, ${district}, ${city}`} fill sizes="288px" className="object-cover" />
        ) : (
          <KosRoomIllustration id={id} ac={facilities.includes("AC")} className="absolute inset-0 h-full w-full" />
        )}
        {isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white">Baru</span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:flex-row sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded border border-plum-600/30 px-2 py-0.5 font-semibold">{type}</span>
            {roomsLeft > 0 ? (
              <span className="italic text-red-600">Sisa {roomsLeft} kamar</span>
            ) : (
              <span className="italic text-plum-600">Kamar penuh</span>
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold leading-snug">
            <Link href={`/kos/${id}`} className="hover:underline">
              {name}
            </Link>
          </h3>
          <p className="text-sm font-semibold text-plum-600">
            {district}, {city}
          </p>
          <p className="mt-2 text-sm text-plum-600">{facilities.join(" · ")}</p>
          <p className="mt-2 flex items-center gap-1 text-sm font-medium">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-500" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
            </svg>
            <span className="sr-only">Rating </span>
            {formatRating(rating)}
          </p>
        </div>

        <div className="flex flex-col sm:items-end sm:justify-end sm:text-right">
          {discount > 0 && (
            <p className="text-sm">
              <span className="font-semibold text-red-600">Diskon {discount}%</span>{" "}
              <span className="text-plum-600 line-through">{formatRupiah(price)}</span>
            </p>
          )}
          <p>
            <span className="text-xl font-bold">{formatRupiah(getFinalPrice(kos))}</span>
            <span className="text-sm text-plum-600"> /bulan</span>
          </p>
          <OpenSurveyButton className="mt-3 rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            Ajukan survei
          </OpenSurveyButton>
        </div>
      </div>
    </article>
  );
}