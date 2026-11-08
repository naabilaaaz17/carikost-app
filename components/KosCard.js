import Image from "next/image";
import Link from "next/link";
import OpenSurveyButton from "./OpenSurveyButton";
import KosRoomIllustration from "./KosRoomIllustration";
import { formatRating, formatRupiah, getPeriodPrice, PERIODS } from "../lib/format";

/** @param {{ kos: import("../data/kos").Kos, className?: string, period?: "bulanan" | "tahunan" }} props */
export default function KosCard({ kos, className = "", period }) {
  const { id, name, type, city, district, price, discount, facilities, rating, roomsLeft, isNew, imageUrl, periods } = kos;
  const activePeriod = period ?? (periods.includes("bulanan") ? "bulanan" : periods[0]);
  const { months, unit } = PERIODS[activePeriod];
  const topFacilities = facilities.slice(0, 3).join(" · ");

  return (
    <article className={`flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white ${className}`}>
      <Link
        href={`/kos/${id}`}
        aria-label={`Lihat detail ${name}`}
        className="relative block h-36 overflow-hidden bg-brand-100"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Foto ${name}, ${district}, ${city}`}
            fill
            sizes="288px"
            className="object-cover"
          />
        ) : (
          <KosRoomIllustration
            id={id}
            ac={facilities.includes("AC")}
            className="absolute inset-0 h-full w-full"
          />
        )}
        {isNew && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white">
            Baru
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold capitalize text-plum-900">
          {type}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1 font-medium">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-500" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
            </svg>
            <span className="sr-only">Rating </span>
            {formatRating(rating)}
          </span>
          {roomsLeft > 0 && <span className="text-xs text-plum-600">sisa {roomsLeft} kamar</span>}
        </div>

        <h3 className="font-semibold leading-snug">
          <Link href={`/kos/${id}`} className="hover:underline">
            {name}
          </Link>
        </h3>
        <p className="text-sm text-plum-600">{district}</p>
        <p className="text-sm text-plum-600">{topFacilities}</p>
        <p className="text-xs text-plum-600">
          Sewa: {periods.map((p) => PERIODS[p].label).join(" / ")}
        </p>

        <div className="mt-auto pt-3">
          {discount > 0 && (
            <p className="text-xs text-plum-600">
              <span className="line-through">{formatRupiah(price * months)}</span>
              <span className="ml-1.5 font-semibold text-brand-700">Diskon {discount}%</span>
            </p>
          )}
          <p>
            <span className="text-lg font-bold text-brand-600">{formatRupiah(getPeriodPrice(kos, activePeriod))}</span>
            <span className="text-sm text-plum-600"> /{unit}</span>
          </p>
          <OpenSurveyButton className="mt-3 w-full rounded-lg border border-brand-600 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            Ajukan survei
          </OpenSurveyButton>
        </div>
      </div>
    </article>
  );
}