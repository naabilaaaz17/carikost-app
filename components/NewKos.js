import KosCard from "./KosCard";
import { kosList } from "../data/kos";

const NEW_ITEMS = kosList.filter((k) => k.isNew);

export default function NewKos() {
  return (
    <section id="kost-baru" className="scroll-mt-20 bg-brand-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Pilihan kost baru</h2>
        <p className="mt-1 text-sm text-plum-600">Baru bergabung dan masih banyak kamar kosong.</p>

        <div
          role="region"
          aria-label="Daftar kost baru, geser untuk melihat lainnya"
          tabIndex={0}
          className="mt-6 flex snap-x gap-4 overflow-x-auto pb-3"
        >
          {NEW_ITEMS.map((k) => (
            <KosCard key={k.id} kos={k} className="w-72 shrink-0 snap-start" />
          ))}
        </div>
      </div>
    </section>
  );
}