import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const MAX_SUGGESTIONS = 6;

// Powers the live "type to see matching products" dropdown on SearchBar —
// a lightweight, capped lookup (not the full /search results page), so it
// stays fast enough to call on every keystroke.
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: [{ isBestseller: "desc" }, { createdAt: "desc" }],
    take: MAX_SUGGESTIONS,
  });

  const results = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    image: p.images[0]?.url ?? null,
    price: p.basePrice.toString(),
  }));

  return NextResponse.json({ results });
}
