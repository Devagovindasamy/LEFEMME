import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { ensureCatalogSeeded } from "@/lib/seed";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(request: Request) {
  await ensureCatalogSeeded();
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please complete the form." },
      { status: 400 },
    );
  }

  await db.insert(contactMessages).values({
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    message: parsed.data.message,
    isDemo: true,
  });

  return NextResponse.json({ ok: true });
}
