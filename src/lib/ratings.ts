import prisma from "@/lib/prisma";

export interface RatingSummary {
  rating: number;
  count: number;
}

/** Computes average rating + review count per product via a single aggregate query. */
export async function getRatingsMap(productIds: string[]): Promise<Record<string, RatingSummary>> {
  if (productIds.length === 0) return {};

  const grouped = await prisma.review.groupBy({
    by: ["productId"],
    where: { productId: { in: productIds } },
    _avg: { rating: true },
    _count: { rating: true },
  });

  return Object.fromEntries(
    grouped.map((g) => [g.productId, { rating: g._avg.rating ?? 0, count: g._count.rating }])
  );
}
