import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { RUDRAKSHA_VARIETIES } from "@/lib/rudrakshaVarieties";
import { CATEGORY_VARIETIES } from "@/lib/categoryVarieties";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, mukhiNumbersWithProducts] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
    // Only mukhi pages with real products — thin/empty pages hurt SEO more
    // than they help, so unstocked mukhis (most of 1-14) are left out.
    prisma.product.findMany({
      where: { categoryType: "RUDRAKSHA", mukhiNumber: { not: null } },
      distinct: ["mukhiNumber"],
      select: { mukhiNumber: true },
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/cart`, changeFrequency: "monthly", priority: 0.2 },
    { url: `${SITE_URL}/search`, changeFrequency: "monthly", priority: 0.2 },
  ];

  const mukhiRoutes: MetadataRoute.Sitemap = mukhiNumbersWithProducts.map((m) => ({
    url: `${SITE_URL}/shop/${m.mukhiNumber}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const rudrakshaVarietyRoutes: MetadataRoute.Sitemap = Object.values(RUDRAKSHA_VARIETIES).map((v) => ({
    url: `${SITE_URL}/shop/rudraksha/${v.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryVarietyRoutes: MetadataRoute.Sitemap = Object.entries(CATEGORY_VARIETIES).flatMap(
    ([categorySlug, group]) =>
      Object.values(group.varieties).map((v) => ({
        url: `${SITE_URL}/shop/${categorySlug}/${v.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
  );

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...mukhiRoutes,
    ...rudrakshaVarietyRoutes,
    ...categoryVarietyRoutes,
    ...productRoutes,
  ];
}
