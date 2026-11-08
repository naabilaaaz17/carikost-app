import { NextResponse } from "next/server";
import { kosList } from "../../../data/kos";

// GET /api/kos
// Query opsional:
//   sort  = new | rating | price-asc | price-desc
//   limit = bilangan bulat 1..50
//   promo = true  (hanya kost yang sedang diskon)
//   fail  = 1     (simulasi error 500, untuk demo error state di frontend)
const SORTS = {
  new: (a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id,
  rating: (a, b) => b.rating - a.rating,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};
const MAX_LIMIT = 50;

export async function GET(request) {
  const params = new URL(request.url).searchParams;

  if (params.get("fail") === "1") {
    return NextResponse.json({ error: "Simulasi kegagalan server." }, { status: 500 });
  }

  const sort = params.get("sort");
  if (sort !== null && !Object.hasOwn(SORTS, sort)) {
    return NextResponse.json(
      { error: `Parameter sort tidak valid. Pilihan: ${Object.keys(SORTS).join(", ")}.` },
      { status: 400 }
    );
  }

  let limit = null;
  const limitRaw = params.get("limit");
  if (limitRaw !== null) {
    const n = Number(limitRaw);
    if (!Number.isInteger(n) || n < 1 || n > MAX_LIMIT) {
      return NextResponse.json(
        { error: `Parameter limit harus bilangan bulat 1 sampai ${MAX_LIMIT}.` },
        { status: 400 }
      );
    }
    limit = n;
  }

  let items = [...kosList];
  if (params.get("promo") === "true") items = items.filter((k) => k.discount > 0);
  if (sort) items.sort(SORTS[sort]);
  if (limit) items = items.slice(0, limit);

  return NextResponse.json({ data: items });
}