import { NextResponse } from "next/server";
import { getMegaMenuPreview } from "@/lib/megaMenuPreview";

// Public, read-only. Cached for a minute in production so header/mega-menu
// rendering never depends on a live per-navigation DB round-trip — that
// was previously done in the root layout (a Server Component), which made
// EVERY page navigation site-wide re-run a full-catalog Prisma query as
// part of rendering the shared header, causing a visible flash/delay.
export const revalidate = 60;

export async function GET() {
  const preview = await getMegaMenuPreview();
  return NextResponse.json({ preview });
}
