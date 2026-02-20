// app/api/payouts/route.ts
import { NextRequest } from "next/server";

const MOCK_MODE = process.env.MOCK_PAYOUTS === "true";

function generateMockPayouts(count = 50) {
  const now = new Date();
  const statuses = ["paid", "pending", "failed"];
  const currencies = ["USD", "EUR", "XAF"];

  return Array.from({ length: count }).map((_, i) => {
    const createdAt = new Date(now.getTime() - i * 2 * 60 * 60 * 1000);
    const amount = 5000 + (i % 7) * 1200;
    const fees = 120 + (i % 3) * 10;
    return {
      id: `payout_mock_${i + 1}`,
      amount: amount,
      currency: currencies[i % currencies.length],
      status: statuses[i % statuses.length],
      created_at: createdAt.toISOString(),
      business_id: "biz_mock_123",
      settlement_id: `set_mock_${1000 + i}`,
      bank_account_last4: `${(1234 + i) % 9999}`.padStart(4, "0"),
      fees: fees,
      net_amount: amount - fees,
    };
  });
}

function filterPayouts(items: any[], gte?: string, lte?: string) {
  return items.filter((p) => {
    const t = new Date(p.created_at).getTime();
    const okGte = gte ? t >= new Date(gte).getTime() : true;
    const okLte = lte ? t <= new Date(lte).getTime() : true;
    return okGte && okLte;
  });
}

function paginate(items: any[], pageSize = 10, pageNumber = 0) {
  const start = pageNumber * pageSize;
  return items.slice(start, start + pageSize);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const created_at_gte = searchParams.get("created_at_gte") || undefined;
  const created_at_lte = searchParams.get("created_at_lte") || undefined;
  const page_size = Number(searchParams.get("page_size") || 10);
  const page_number = Number(searchParams.get("page_number") || 0);

  if (!MOCK_MODE) {
    const qs = new URLSearchParams();
    if (created_at_gte) qs.set("created_at_gte", created_at_gte);
    if (created_at_lte) qs.set("created_at_lte", created_at_lte);
    qs.set("page_size", String(page_size));
    qs.set("page_number", String(page_number));

    const res = await fetch(
      `https://live.dodopayments.com/payouts?${qs.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
        },
      },
    );

    if (res.ok) return Response.json(await res.json());
    // fallback mock si échec API
  }

  const all = generateMockPayouts(120);
  const filtered = filterPayouts(all, created_at_gte, created_at_lte);
  const paged = paginate(filtered, page_size, page_number);

  return Response.json({
    items: paged,
    meta: {
      total: filtered.length,
      page_size,
      page_number,
      has_more: (page_number + 1) * page_size < filtered.length,
      mode: "mock",
    },
  });
}
