import { NextResponse } from "next/server";
import { products } from "@/data/catalog";
import { ensureCatalogSeeded } from "@/lib/seed";

export async function GET() {
  await ensureCatalogSeeded();
  return NextResponse.json({ ok: true, products });
}
