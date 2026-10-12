import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/adminAuth";

const MAX_BYTES = 8 * 1024 * 1024;

// Backs the file picker on the admin product form. Requires Vercel Blob
// storage to be enabled on this project (Vercel dashboard -> Storage ->
// Create Database -> Blob) — that one-time step auto-provisions
// BLOB_READ_WRITE_TOKEN for all deployments. Pasting an already-hosted
// image URL into the form still works without this, as it always did.
export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Image upload isn't set up yet — enable Vercel Blob storage for this project, or paste an image URL instead.",
      },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 8MB or smaller" }, { status: 400 });
  }

  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const pathname = `products/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`;

  const blob = await put(pathname, file, { access: "public", contentType: file.type });

  return NextResponse.json({ url: blob.url });
}
