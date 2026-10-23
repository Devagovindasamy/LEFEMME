import { NextResponse } from "next/server";
import { z } from "zod";
import { db, isDatabaseConfigured } from "@/db";
import { demoOrders } from "@/db/schema";
import { products } from "@/data/catalog";
import { ensureCatalogSeeded } from "@/lib/seed";

const itemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  name: z.string(),
  category: z.enum(["handbag", "charm"]),
  imageSrc: z.string(),
  colorName: z.string(),
  colorSlug: z.string(),
  unitPriceCents: z.number().int().positive(),
  priceIsDemo: z.literal(true),
  quantity: z.number().int().min(1).max(12),
});

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  items: z.array(itemSchema).min(1),
});

export async function POST(request: Request) {
  await ensureCatalogSeeded();
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the demo checkout details." },
      { status: 400 },
    );
  }

  for (const item of parsed.data.items) {
    const product = products.find((row) => row.id === item.productId);
    if (!product) {
      return NextResponse.json(
        { ok: false, message: "A bag in this demo order is no longer listed." },
        { status: 400 },
      );
    }
    const color = product.colors.find((row) => row.slug === item.colorSlug);
    if (!color?.available) {
      return NextResponse.json(
        { ok: false, message: `${product.name} is not available in that colour.` },
        { status: 400 },
      );
    }
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Order placement is unavailable because no database is configured for this demo." },
      { status: 503 },
    );
  }

  const subtotalCents = parsed.data.items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0,
  );
  const orderId = `demo-${Date.now().toString(36)}`;

  try {
    await db.insert(demoOrders).values({
      id: orderId,
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      items: parsed.data.items,
      subtotalCents,
      status: "demo_placed",
      note: "Demonstration order only. No payment collected.",
    });

    return NextResponse.json({ ok: true, orderId });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not record this demo order." },
      { status: 500 },
    );
  }
}
